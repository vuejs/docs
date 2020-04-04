# Reactivity in Depth

Now it’s time to take a deep dive! One of Vue’s most distinct features is the unobtrusive reactivity system. Models are proxied JavaScript objects. When you modify them, the view updates. It makes state management simple and intuitive, but it’s also important to understand how it works to avoid some common gotchas. In this section, we are going to dig into some of the lower-level details of Vue’s reactivity system.

## What is Reactivity?

This term comes up in programming quite a bit these days! But what do people mean when they say it? Well, reactivity is a programming paradigm that allows us to adjust to changes in a declarative manner. The canonical example that people usually show, because it’s a great one, is an excel spreadsheet.

[//]: # 'TODO: add in sheets example'

If you put the number two in the first cel, and the number 3 in the second and asked for the SUM, the spreadsheet would give it to you. No surprises there. But if you update that first number, the SUM automagically updates too!

JavaScript doesn’t usually work like this-- If we were to write something comparable in JavaScript:

```js
var val1 = 2
var val2 = 3
var sum = val1 + val2

//sum
// 5

val1 = 3

//sum
//5
```

If we update the first value, the sum is not adjusted.

So how would we do this in JavaScript?

- Detect when there’s a change in one of the values
- Track the function that changes it
- Trigger the function so it can update the final value

## How Vue Tracks These Changes

When you pass a plain JavaScript object to a Vue instance as its `data` option, Vue will walk through all of its properties and convert them to Proxies using a handler with getters and setters. This is an ES6-only feature, but we offer a version of Vue 3 that uses the older `Object.defineProperty` to support IE browsers. Both have the same surface API, but the Proxy version is slimmer and offers improved performance.

[//]: # 'TODO: add in codepen example'

https://codepen.io/sdras/full/zYYzjBg

That was rather quick and requires some knowledge of [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to understand! So let’s dive in a bit. There’s a lot of literature on Proxies, but what you really need to know is that a **Proxy is an object that encases another object or function and allows you to intercept it.**

We use it like this: `new Proxy(target, handler)`

```js
const dinner = {
  meal: ‘tacos’
}

const handler = {
  get(target, prop) {
    return target[prop]
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

Ok, so far, we’re just wrapping that object and returning it. Cool, but not that useful yet. But watch this, we can also intercept this object while we wrap it in the Proxy. This interception is called a trap

```js
const dinner = {
  meal: ‘tacos’
}

const handler = {
  get(target, prop) {
    console.log(‘intercepted!’)
    return target[prop]
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepted!
// tacos
```

No one wants their dinner intercepted. That’s why it’s called a trap 😅.

Beyond a console log, we could do anything here we wish. We could even _not_ return the real value if we wanted to. This is what makes Proxies so powerful for creating APIs.

Furthermore, there’s another feature Proxies offer us. Rather than just returning the value like this: `target[prop]`, we could take this a step further and use a feature called `Reflect`, which allows us to do proper `this` binding. It looks like this:

[//]: # 'TODO: line highlighting?'

```js
const dinner = {
  meal: ‘tacos’
}

const handler = {
  get(target, prop, receiver) {
    return Reflect.get(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepted!
// tacos
```

We mentioned before that in order to have an API that updates a final value when something changes, we’re going to have to set new values when something changes. We do this in the handler, in a function called `track`, where pass in the `target` and `key`.

```js
const dinner = {
  meal: ‘tacos’
}

const handler = {
  get(target, prop, receiver) {
    track(target, key)
    return Reflect.get(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepted!
// tacos
```

Finally, we also set new values when something changes. For this, we’re going to set the changes on our new proxy, by triggering those changes:

```js
const dinner = {
  meal: ‘tacos’
}

const handler = {
  get(target, prop, receiver) {
    track(target, key)
    return Reflect.get(...arguments)
  },
  set(target, key, value, receiver) {
    trigger(target, key)
    return Reflect.set(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepted!
// tacos
```

Remember this list from a few paragraphs ago? Now we have some answers to how Vue handles these changes:

- ~Detect when there’s a change in one of the values~: we no longer have to do this, as Proxies allow us to intercept it
- **Track the function that changes it**: We do this in a getter within the proxy, called `effect`
- **Trigger the function so it can update the final value**: We do in a setter within the proxy, called `trigger`

The proxied object is invisible to the user, but under the hood they enable Vue to perform dependency-tracking and change-notification when properties are accessed or modified. As of Vue 3, our reactivity is now available in a [separate package](https://github.com/vuejs/vue-next/tree/master/packages/reactivity). One caveat is that browser consoles format differently when converted data objects are logged, so you may want to install [vue-devtools](https://github.com/vuejs/vue-devtools) for a more inspection-friendly interface.

## Watchers

Every component instance has a corresponding watcher instance, which records any properties “touched” during the component’s render as dependencies. Later on when a dependency’s setter is triggered, it notifies the watcher, which in turn causes the component to re-render.

[//]: # 'TODO: add in codepen'

https://codepen.io/sdras/full/GRJZddR

When you pass an object to a Vue instance as data, Vue converts it to a proxy. This proxy enables Vue to perform dependency-tracking and change-notification when properties are accessed or modified. Each property is considered a dependency.

After the first render, a component would have tracked a list of dependencies &mdash; the properties it accessed during the render. Conversely, the component becomes a subscriber to each of these properties. When a proxy intercepts a set operation, the property will notify all of its subscribed components to re-render.

Insert diagram?

## Virtual DOM

Now that we know how watchers are updating the components, you might ask how those changes eventually make it to the DOM! Perhaps you’ve heard of the Virtual DOM before, many frameworks including Vue use this paradigm to make sure our interfaces reflect the changes we’re updating in JavaScript effectively

[//]: # 'TODO: add in codepen'

https://codepen.io/sdras/pen/RwwQapa

We make a copy of the DOM in JavaScript called the Virtual DOM, we do this because touching the DOM with JavaScript is computationally expensive. While performing updates in JavaScript is cheap, finding the required DOM nodes and updating them with JS is expensive. So we batch calls, and change the DOM all at once.

The Virtual DOM in is a lightweight JavaScript object, created by a render function. It takes three arguments: the element, an object with data, props, attrs and more, and an array. The array is where we pass in the children, which have all these arguments too, and then they can have children and so on, until we build a full tree of elements.

If we need to update the list items, we do so in JavaScript, using the reactivity we mentioned earlier. We then make all the changes to the JavaScript copy, the virtual DOM, and perform a diff between this and the actual DOM. Only then do we make our updates to just what has changed. The Virtual DOM allows us to make performant updates to our UIs!

## Change Detection Caveats

Due to limitations in JavaScript, there are types of changes that Vue **cannot detect**. However, there are ways to circumvent them to preserve reactivity.

### For Objects

Vue cannot detect property addition or deletion. Since Vue performs the getter/setter conversion process during instance initialization, a property must be present in the `data` object in order for Vue to convert it and make it reactive. For example:

```js
var vm = new Vue({
  data: {
    a: 1,
  },
})
// `vm.a` is now reactive

vm.b = 2
// `vm.b` is NOT reactive
```

Vue does not allow dynamically adding new root-level reactive properties to an already created instance. However, it's possible to add reactive properties to a nested object using the `Vue.set(object, propertyName, value)` method:

```js
Vue.set(vm.someObject, 'b', 2)
```

You can also use the `vm.$set` instance method, which is an alias to the global `Vue.set`:

```js
this.$set(this.someObject, 'b', 2)
```

Sometimes you may want to assign a number of properties to an existing object, for example using `Object.assign()` or `_.extend()`. However, new properties added to the object will not trigger changes. In such cases, create a fresh object with properties from both the original object and the mixin object:

```js
// instead of `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

### For Arrays

Vue cannot detect the following changes to an array:

1. When you directly set an item with the index, e.g. `vm.items[indexOfItem] = newValue`
2. When you modify the length of the array, e.g. `vm.items.length = newLength`

For example:

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c'],
  },
})
vm.items[1] = 'x' // is NOT reactive
vm.items.length = 2 // is NOT reactive
```

To overcome caveat 1, both of the following will accomplish the same as `vm.items[indexOfItem] = newValue`, but will also trigger state updates in the reactivity system:

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
```

```js
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

You can also use the [`vm.$set`](https://vuejs.org/v2/api/#vm-set) instance method, which is an alias for the global `Vue.set`:

```js
vm.$set(vm.items, indexOfItem, newValue)
```

To deal with caveat 2, you can use `splice`:

```js
vm.items.splice(newLength)
```

## Declaring Reactive Properties

Since Vue doesn't allow dynamically adding root-level reactive properties, you have to initialize Vue instances by declaring all root-level reactive data properties upfront, even with an empty value:

```js
var vm = new Vue({
  data: {
    // declare message with an empty value
    message: '',
  },
  template: '<div>{{ message }}</div>',
})
// set `message` later
vm.message = 'Hello!'
```

If you don't declare `message` in the data option, Vue will warn you that the render function is trying to access a property that doesn't exist.

There are technical reasons behind this restriction - it eliminates a class of edge cases in the dependency tracking system, and also makes Vue instances play nicer with type checking systems. But there is also an important consideration in terms of code maintainability: the `data` object is like the schema for your component's state. Declaring all reactive properties upfront makes the component code easier to understand when revisited later or read by another developer.

## Async Update Queue

In case you haven't noticed yet, Vue performs DOM updates **asynchronously**. Whenever a data change is observed, it will open a queue and buffer all the data changes that happen in the same event loop. If the same watcher is triggered multiple times, it will be pushed into the queue only once. This buffered de-duplication is important in avoiding unnecessary calculations and DOM manipulations. Then, in the next event loop "tick", Vue flushes the queue and performs the actual (already de-duped) work. Internally Vue tries native `Promise.then`, `MutationObserver`, and `setImmediate` for the asynchronous queuing and falls back to `setTimeout(fn, 0)`.

For example, when you set `vm.someData = 'new value'`, the component will not re-render immediately. It will update in the next "tick", when the queue is flushed. Most of the time we don't need to care about this, but it can be tricky when you want to do something that depends on the post-update DOM state. Although Vue.js generally encourages developers to think in a "data-driven" fashion and avoid touching the DOM directly, sometimes it might be necessary to get your hands dirty. In order to wait until Vue.js has finished updating the DOM after a data change, you can use `Vue.nextTick(callback)` immediately after the data is changed. The callback will be called after the DOM has been updated. For example:

```html
<div id="example">{{ message }}</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: '123',
  },
})
vm.message = 'new message' // change data
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

There is also the `vm.$nextTick()` instance method, which is especially handy inside components, because it doesn't need global `Vue` and its callback's `this` context will be automatically bound to the current Vue instance:

```js
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'not updated',
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => 'not updated'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => 'updated'
      })
    },
  },
})
```

Since `$nextTick()` returns a promise, you can achieve the same as the above using the new [ES2017 async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) syntax:

```js
  methods: {
    updateMessage: async function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => 'not updated'
      await this.$nextTick()
      console.log(this.$el.textContent) // => 'updated'
    }
  }
```
