# Reactivity in Depth

Now it’s time to take a deep dive! One of Vue’s most distinct features is the unobtrusive reactivity system. Models are proxied JavaScript objects. When you modify them, the view updates. It makes state management simple and intuitive, but it’s also important to understand how it works to avoid some common gotchas. In this section, we are going to dig into some of the lower-level details of Vue’s reactivity system.

## What is Reactivity?

This term comes up in programming quite a bit these days, but what do people mean when they say it? Reactivity is a programming paradigm that allows us to adjust to changes in a declarative manner. The canonical example that people usually show, because it’s a great one, is an excel spreadsheet.

<video width="550" height="400" controls>
  <source src="/images/reactivity-spreadsheet.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

If you put the number two in the first cell, and the number 3 in the second and asked for the SUM, the spreadsheet would give it to you. No surprises there. But if you update that first number, the SUM automagically updates too.

JavaScript doesn’t usually work like this -- If we were to write something comparable in JavaScript:

```js
var val1 = 2
var val2 = 3
var sum = val1 + val2

// sum
// 5

val1 = 3

// sum
// 5
```

If we update the first value, the sum is not adjusted.

So how would we do this in JavaScript?

- Detect when there’s a change in one of the values
- Track the function that changes it
- Trigger the function so it can update the final value

## How Vue Tracks These Changes

When you pass a plain JavaScript object to a Vue instance as its `data` option, Vue will walk through all of its properties and convert them to [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) using a handler with getters and setters. This is an ES6-only feature, but we offer a version of Vue 3 that uses the older `Object.defineProperty` to support IE browsers. Both have the same surface API, but the Proxy version is slimmer and offers improved performance.

<iframe height="500" style="width: 100%;" scrolling="no" title="Proxies and Vue's Reactivity Explained Visually" src="https://codepen.io/sdras/embed/zYYzjBg?height=500&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sdras/pen/zYYzjBg'>Proxies and Vue's Reactivity Explained Visually</a> by Sarah Drasner
  (<a href='https://codepen.io/sdras'>@sdras</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

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

Ok, so far, we’re just wrapping that object and returning it. Cool, but not that useful yet. But watch this, we can also intercept this object while we wrap it in the Proxy. This interception is called a trap.

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

- <strike>Detect when there’s a change in one of the values</strike>: we no longer have to do this, as Proxies allow us to intercept it
- **Track the function that changes it**: We do this in a getter within the proxy, called `effect`
- **Trigger the function so it can update the final value**: We do in a setter within the proxy, called `trigger`

The proxied object is invisible to the user, but under the hood they enable Vue to perform dependency-tracking and change-notification when properties are accessed or modified. As of Vue 3, our reactivity is now available in a [separate package](https://github.com/vuejs/vue-next/tree/master/packages/reactivity). One caveat is that browser consoles format differently when converted data objects are logged, so you may want to install [vue-devtools](https://github.com/vuejs/vue-devtools) for a more inspection-friendly interface.

### Proxied Objects

Vue internally tracks all objects that have been made reactive, so it always returns the same proxy for the same object.

When a nested object is accessed from a reactive proxy, that object is _also_ converted into a proxy before being returned:

```js
const handler = {
  get(target, prop, receiver) {
    track(target, key)
    const value = Reflect.get(...arguments)
    if (isObject(value)) {
      return reactive(value)
    } else {
      return value
    }
  }
  // ...
}
```

### Proxy vs. original identity

The use of Proxy does introduce a new caveat to be aware with: the proxied object is not equal to the original object in terms of identity comparison (`===`). For example:

```js
const obj = {}
const wrapped = new Proxy(obj, handlers)

console.log(obj === wrapped) // false
```

The original and the wrapped version will behave the same in most cases, but be aware that they will fail
operations that rely on strong identity comparisons, such as `.filter()` or `.map()`. This caveat is unlikely to come up when using the options API, because all reactive state is accessed from `this` and guaranteed to already be proxies.

However, when using the composition API to explicitly create reactive objects, the best practice is to never hold a reference to the original raw object and only work with the reactive version:

```js
const obj = reactive({
  count: 0
}) // no reference to original
```

## Watchers

Every component instance has a corresponding watcher instance, which records any properties "touched" during the component’s render as dependencies. Later on when a dependency’s setter is triggered, it notifies the watcher, which in turn causes the component to re-render.

<iframe height="500" style="width: 100%;" scrolling="no" title="Second Reactivity with Proxies in Vue 3 Explainer" src="https://codepen.io/sdras/embed/GRJZddR?height=500&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sdras/pen/GRJZddR'>Second Reactivity with Proxies in Vue 3 Explainer</a> by Sarah Drasner
  (<a href='https://codepen.io/sdras'>@sdras</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

When you pass an object to a Vue instance as data, Vue converts it to a proxy. This proxy enables Vue to perform dependency-tracking and change-notification when properties are accessed or modified. Each property is considered a dependency.

After the first render, a component would have tracked a list of dependencies &mdash; the properties it accessed during the render. Conversely, the component becomes a subscriber to each of these properties. When a proxy intercepts a set operation, the property will notify all of its subscribed components to re-render.

[//]: # 'TODO: Insert diagram?'

> If you are using Vue 2.x and below, you may be interested in some of the change detection caveats that exist for those versions, [explored in more detail here](change-detection.md).
