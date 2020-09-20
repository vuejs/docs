# Data Properties and Methods

## Data Properties

The `data` function for a component is called as part of creating a new component instance. It should return an object, which Vue wraps in its reactivity system and stores on the instance as `$data`. For convenience, any top-level properties of that object are also exposed directly via the component instance:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.$data.count) // => 4
console.log(vm.count)       // => 4

// Assigning a value to vm.count will also update $data.count
vm.count = 5
console.log(vm.$data.count) // => 5

// ... and vice-versa
vm.$data.count = 6
console.log(vm.count) // => 6
```

These instance properties are only added when the instance is first created, so you need to ensure they are all present in the object returned by the `data` function. Where necessary, use `null`, `undefined` or some other placeholder value for properties where the desired value isn't yet available.

It is possible to add a new property directly to the component instance without including it in `data`. However, because this property isn't backed by the reactive `$data` object it won't automatically be tracked by [Vue's reactivity system](reactivity.html).

Vue uses a `$` prefix when exposing its own built-in APIs via the component instance, e.g. `$emit`. It also reserves the prefix `_` for internal properties. You should avoid using names for top-level `data` properties that start with either of these characters.

## Methods

You might be tempted to put functions in your `data` so that you can use them as methods:

```js
const app = Vue.createApp({
  data() {
    return {
      count: 4,

      // Don't do this
      increment() {
        this.count++
      }
    }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4

vm.increment()

console.log(vm.count) // => 5
```

This does work but there are a few problems with it:

1. Methods typically aren't reassigned after creation, so there's no need for Vue's reactivity system to track them.
2. If a function becomes detached from its object it will lose its `this` binding. This frequently happens when methods are used as event listeners.
3. For components with several methods they will quickly clutter up the `data` function.

To solve these problems, Vue has a separate configuration option especially for `methods`:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4

// Detach the function from `vm`
const inc = vm.increment

// Vue automatically binds the functions in `methods`,
// so the `this` value inside the function will still
// refer to the correct component instance
inc()

console.log(vm.count) // => 5
```

Just like all other properties of the component instance, the `methods` are accessible from within the component's template. If a method is called by a component's template, any reactive data it uses will be tracked and added as a rendering dependency.

### Debouncing and Throttling

Vue doesn't include built-in support for debouncing or throttling but it can be implemented using libraries such as lodash.

In cases where a component is only used once, the debouncing can be applied directly within `methods`:

```js
const app = Vue.createApp({
  methods: {
    click: _.debounce(function() {
      // ... respond to click ...
    }, 500)
  }
})
```

However, this won't work for components that are reused because they'll all share the same debounced function. Instead it can be implemented like this:

```js
const app = Vue.createApp({
  created() {
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // Cancel the timer when the component is removed
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... respond to click ...
    }
  }
})
```

This is using the `created` lifecycle hook to create a debounced method on the current component instance. As all instance properties are accessible in the component's template, `debouncedClick` can be used as an event listener:

```html
<button v-on:click="debouncedClick">Save</button>
```
