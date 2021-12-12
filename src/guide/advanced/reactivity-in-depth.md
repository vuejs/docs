---
aside: deep
---

# Reactivity in Depth

// TODO explain proxies
// TODO explain refs
// TODO explain shallow

Now it’s time to take a deep dive! One of Vue’s most distinct features is the unobtrusive reactivity system. Models are proxied JavaScript objects. When you modify them, the view updates. It makes state management simple and intuitive, but it’s also important to understand how it works to avoid some common gotchas. In this section, we are going to dig into some of the lower-level details of Vue’s reactivity system.

## What is Reactivity?

This term comes up in programming quite a bit these days, but what do people mean when they say it? Reactivity is a programming paradigm that allows us to adjust to changes in a declarative manner. The canonical example that people usually show, because it’s a great one, is an Excel spreadsheet.

<video width="550" height="400" controls>
  <source src="/images/reactivity-spreadsheet.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

If you put the number 2 in the first cell, and the number 3 in the second and asked for the SUM, the spreadsheet would give it to you. No surprises there. But if you update that first number, the SUM automagically updates too.

JavaScript doesn’t usually work like this. If we were to write something comparable in JavaScript:

```js
let val1 = 2
let val2 = 3
let sum = val1 + val2

console.log(sum) // 5

val1 = 3

console.log(sum) // Still 5
```

If we update the first value, the sum is not adjusted.

So how would we do this in JavaScript?

As a high-level overview, there are a few things we need to be able to do:

1. **Track when a value is read.** e.g. `val1 + val2` reads both `val1` and `val2`.
2. **Detect when a value changes.** e.g. When we assign `val1 = 3`.
3. **Re-run the code that read the value originally.** e.g. Run `sum = val1 + val2` again to update the value of `sum`.

We can't do this directly using the code from the previous example but we'll come back to this example later to see how to adapt it to be compatible with Vue's reactivity system.

First, let's dig a bit deeper into how Vue implements the core reactivity requirements outlined above.

## How Vue Knows What Code Is Running

To be able to run our sum whenever the values change, the first thing we need to do is wrap it in a function:

```js
const updateSum = () => {
  sum = val1 + val2
}
```

But how do we tell Vue about this function?

Vue keeps track of which function is currently running by using an _effect_. An effect is a wrapper around the function that initiates tracking just before the function is called. Vue knows which effect is running at any given point and can run it again when required.

To understand that better, let's try to implement something similar ourselves, without Vue, to see how it might work.

What we need is something that can wrap our sum, like this:

```js
createEffect(() => {
  sum = val1 + val2
})
```

We need `createEffect` to keep track of when the sum is running. We might implement it something like this:

```js
// Maintain a stack of running effects
const runningEffects = []

const createEffect = (fn) => {
  // Wrap the passed fn in an effect function
  const effect = () => {
    runningEffects.push(effect)
    fn()
    runningEffects.pop()
  }

  // Automatically run the effect immediately
  effect()
}
```

When our effect is called it pushes itself onto the `runningEffects` array, before calling `fn`. Anything that needs to know which effect is currently running can check that array.

Effects act as the starting point for many key features. For example, both component rendering and computed properties use effects internally. Any time something magically responds to data changes you can be pretty sure it has been wrapped in an effect.

While Vue's public API doesn't include any way to create an effect directly, it does expose a function called `watchEffect` that behaves a lot like the `createEffect` function from our example.

But knowing what code is running is just one part of the puzzle. How does Vue know what values the effect uses and how does it know when they change?

## How Vue Tracks These Changes

We can't track reassignments of local variables like those in our earlier examples, there's just no mechanism for doing that in JavaScript. What we can track are changes to object properties.

When we return a plain JavaScript object from a component's `data` function, Vue will wrap that object in a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) with handlers for `get` and `set`. Proxies were introduced in ES6 and allow Vue 3 to avoid some of the reactivity caveats that existed in earlier versions of Vue.

<div class="reactivecontent">
  <!-- <common-codepen-snippet title="Proxies and Vue's Reactivity Explained Visually" slug="VwmxZXJ" tab="result" theme="light" :height="500" :editable="false" :preview="false" /> -->
</div>

That was rather quick and requires some knowledge of [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to understand! So let’s dive in a bit. There’s a lot of literature on Proxies, but what you really need to know is that a **Proxy is an object that encases another object and allows you to intercept any interactions with that object.**

We use it like this: `new Proxy(target, handler)`

```js
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, property) {
    console.log('intercepted!')
    return target[property]
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// intercepted!
// tacos
```

Here we've intercepted attempts to read properties of the target object. A handler function like this is also known as a _trap_. There are many different types of trap available, each handling a different type of interaction.

Beyond a console log, we could do anything here we wish. We could even _not_ return the real value if we wanted to. This is what makes Proxies so powerful for creating APIs.

One challenge with using a Proxy is the `this` binding. We'd like any methods to be bound to the Proxy, rather than the target object, so that we can intercept them too. Thankfully, ES6 introduced another new feature, called `Reflect`, that allows us to make this problem disappear with minimal effort:

```js{7}
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, property, receiver) {
    return Reflect.get(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

The first step towards implementing reactivity with a Proxy is to track when a property is read. We do this in the handler, in a function called `track`, where we pass in the `target` and `property`:

```js{7}
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, property, receiver) {
    track(target, property)
    return Reflect.get(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

The implementation of `track` isn't shown here. It will check which _effect_ is currently running and record that alongside the `target` and `property`. This is how Vue knows that the property is a dependency of the effect.

Finally, we need to re-run the effect when the property value changes. For this we're going to need a `set` handler on our proxy:

```js
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, property, receiver) {
    track(target, property)
    return Reflect.get(...arguments)
  },
  set(target, property, value, receiver) {
    trigger(target, property)
    return Reflect.set(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

Remember this list from earlier? Now we have some answers to how Vue implements these key steps:

1. **Track when a value is read**: the `track` function in the proxy's `get` handler records the property and the current effect.
2. **Detect when that value changes**: the `set` handler is called on the proxy.
3. **Re-run the code that read the value originally:** the `trigger` function looks up which effects depend on the property and runs them.

The proxied object is invisible to the user, but under the hood it enables Vue to perform dependency-tracking and change-notification when properties are accessed or modified. One caveat is that console logging will format proxied objects differently, so you may want to install [vue-devtools](https://github.com/vuejs/vue-devtools) for a more inspection-friendly interface.

If we were to rewrite our original example using a component we might do it something like this:

```js
const vm = createApp({
  data() {
    return {
      val1: 2,
      val2: 3
    }
  },
  computed: {
    sum() {
      return this.val1 + this.val2
    }
  }
}).mount('#app')

console.log(vm.sum) // 5

vm.val1 = 3

console.log(vm.sum) // 6
```

The object returned by `data` will be wrapped in a reactive proxy and stored as `this.$data`. The properties `this.val1` and `this.val2` are aliases for `this.$data.val1` and `this.$data.val2` respectively, so they go through the same proxy.

Vue will wrap the function for `sum` in an effect. When we try to access `this.sum`, it will run that effect to calculate the value. The reactive proxy around `$data` will track that the properties `val1` and `val2` were read while that effect is running.

As of Vue 3, our reactivity is now available in a [separate package](https://github.com/vuejs/vue-next/tree/master/packages/reactivity). The function that wraps `$data` in a proxy is called [`reactive`](/api/reactivity-core.html#reactive). We can call this directly ourselves, allowing us to wrap an object in a reactive proxy without needing to use a component:

```js
const proxy = reactive({
  val1: 2,
  val2: 3
})
```

We'll explore the functionality exposed by the reactivity package over the course of the next few pages of this guide. That includes functions like `reactive` and `watchEffect` that we've already met, as well as ways to use other reactivity features, such as `computed` and `watch`, without needing to create a component.

### Proxied Objects

Vue internally tracks all objects that have been made reactive, so it always returns the same proxy for the same object.

When a nested object is accessed from a reactive proxy, that object is _also_ converted into a proxy before being returned:

```js{6-7}
const handler = {
  get(target, property, receiver) {
    track(target, property)
    const value = Reflect.get(...arguments)
    if (isObject(value)) {
      // Wrap the nested object in its own reactive proxy
      return reactive(value)
    } else {
      return value
    }
  }
  // ...
}
```

### Proxy vs. original identity

The use of Proxy does introduce a new caveat to be aware of: the proxied object is not equal to the original object in terms of identity comparison (`===`). For example:

```js
const obj = {}
const wrapped = new Proxy(obj, handlers)

console.log(obj === wrapped) // false
```

Other operations that rely on strict equality comparisons can also be impacted, such as `.includes()` or `.indexOf()`.

The best practice here is to never hold a reference to the original raw object and only work with the reactive version:

```js
const obj = reactive({
  count: 0
}) // no reference to original
```

This ensures that both equality comparisons and reactivity behave as expected.

Note that Vue does not wrap primitive values such as numbers or strings in a Proxy, so you can still use `===` directly with those values:

```js
const obj = reactive({
  count: 0
})

console.log(obj.count === 0) // true
```

## How Rendering Reacts to Changes

The template for a component is compiled down into a [`render`](/guide/advanced/render-function.html) function. The `render` function creates the [VNodes](/guide/advanced/render-function.html#the-virtual-dom-tree) that describe how the component should be rendered. It is wrapped in an effect, allowing Vue to track the properties that are 'touched' while it is running.

A `render` function is conceptually very similar to a `computed` property. Vue doesn't track exactly how dependencies are used, it only knows that they were used at some point while the function was running. If any of those properties subsequently changes, it will trigger the effect to run again, re-running the `render` function to generate new VNodes. These are then used to make the necessary changes to the DOM.

<div class="reactivecontent">
  <!-- <common-codepen-snippet title="Second Reactivity with Proxies in Vue 3 Explainer" slug="wvgqyJK" tab="result" theme="light" :height="500" :editable="false" :preview="false" /> -->
</div>

## Reactivity Debugging

It's great that Vue's reactivity system automatically tracks dependencies, but in some cases we may want to figure out exactly what is being tracked, or what is causing a component to re-render.

### Component Debugging Hooks

// TODO `renderTracked` and `renderTriggered`

<div class="composition-api">

### Computed Debugging \*\*

We can debug computed properties by passing `computed()` a second options object with `onTrack` and `onTrigger` callbacks:

- `onTrack` will be called when a reactive property or ref is tracked as a dependency.
- `onTrigger` will be called when the watcher callback is triggered by the mutation of a dependency.

Both callbacks will receive a debugger event which contains information on the dependency in question. It is recommended to place a `debugger` statement in these callbacks to interactively inspect the dependency:

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // triggered when count.value is tracked as a dependency
    debugger
  },
  onTrigger(e) {
    // triggered when count.value is mutated
    debugger
  }
})

// access plusOne, should trigger onTrack
console.log(plusOne.value)

// mutate count.value, should trigger onTrigger
count.value++
```

:::tip
`onTrack` and `onTrigger` computed options only work in development mode.
:::

### Watcher Debugging \*\*

Similar to `computed()`, watchers also support the `onTrack` and `onTrigger` options:

```js
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

:::tip
`onTrack` and `onTrigger` watcher options only work in development mode.
:::

## Watcher Side Effect Invalidation \*\*

Sometimes the watched effect function will perform asynchronous side effects that need to be cleaned up when it is invalidated (i.e. state changed before the effects can be completed). The effect function receives an `onInvalidate` function that can be used to register an invalidation callback. This invalidation callback is called when:

- the effect is about to re-run
- the watcher is stopped (i.e. when the component is unmounted if `watchEffect` is used inside `setup()` or lifecycle hooks)

```js
watchEffect((onInvalidate) => {
  const token = performAsyncOperation(id.value)
  onInvalidate(() => {
    // id has changed or watcher is stopped.
    // invalidate previously pending async operation
    token.cancel()
  })
})
```

We are registering the invalidation callback via a passed-in function instead of returning it from the callback because the return value is important for async error handling. It is very common for the effect function to be an async function when performing data fetching:

```js
const data = ref(null)
watchEffect(async (onInvalidate) => {
  onInvalidate(() => {
    /* ... */
  }) // we register cleanup function before Promise resolves
  data.value = await fetchData(props.id)
})
```

An async function implicitly returns a Promise, but the cleanup function needs to be registered immediately before the Promise resolves. In addition, Vue relies on the returned Promise to automatically handle potential errors in the Promise chain.

</div>
