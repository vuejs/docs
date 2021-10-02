# State and Reactivity

:::tip
This section contains different content for Options API and Composition API. You can toggle between the API styles using the "API Preference" switches at the top of the left sidebar.
:::

## Declaring Reactive State

<div class="options-api">

We use the `data` option to declare reactive state of a component. The option value should be a function that returns an object. Vue will call the function when creating a new component instance, and wrap the returned object in its reactivity system. The wrapped object is stored on the component instance as `$data`. For convenience, any top-level properties of that object are also exposed directly on the component instance (`this` in methods and lifecycle hooks):

```js
export default {
  data() {
    return {
      count: 1
    }
  },

  mounted() {
    console.log(this.$data.count) // => 1
    console.log(this.count) // => 1

    // Assigning a value to this.count will also update $data.count
    this.count = 2
    console.log(this.$data.count) // => 2

    // ... and vice-versa
    this.$data.count = 3
    console.log(this.count) // => 3
  }
}
```

These instance properties are only added when the instance is first created, so you need to ensure they are all present in the object returned by the `data` function. Where necessary, use `null`, `undefined` or some other placeholder value for properties where the desired value isn't yet available.

It is possible to add a new property directly to the component instance without including it in `data`. However, because this property isn't backed by the reactive `$data` object, it won't automatically be tracked by [Vue's reactivity system](/guide/advanced/reactivity-in-depth.html).

Vue uses a `$` prefix when exposing its own built-in APIs via the component instance. It also reserves the prefix `_` for internal properties. You should avoid using names for top-level `data` properties that start with either of these characters.

</div>

<div class="composition-api">



</div>

## Methods

To add methods to a component instance we use the `methods` option. This should be an object containing the desired methods:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  },
  methods: {
    increment() {
      // `this` will refer to the component instance
      this.count++
    }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4

vm.increment()

console.log(vm.count) // => 5
```

Vue automatically binds the `this` value for `methods` so that it always refers to the component instance. This ensures that a method retains the correct `this` value if it's used as an event listener or callback. You should avoid using arrow functions when defining `methods`, as that prevents Vue from binding the appropriate `this` value.

Just like all other properties of the component instance, the `methods` are accessible from within the component's template. Inside a template they are most commonly used as event listeners:

```vue-html
<button @click="increment">Up vote</button>
```

In the example above, the method `increment` will be called when the `<button>` is clicked.

It is also possible to call a method directly from a template. As we'll see shortly, it's usually better to use a [computed property](computed.html) instead. However, using a method can be useful in scenarios where computed properties aren't a viable option. You can call a method anywhere that a template supports JavaScript expressions:

```vue-html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

If the methods `toTitleDate` or `formatDate` access any reactive data then it will be tracked as a rendering dependency, just as if it had been used in the template directly.

Methods called from a template should not have any side effects, such as changing data or triggering asynchronous processes. If you find yourself tempted to do that you should probably use a [lifecycle hook](/guide/components/lifecycle.html) instead.

### Debouncing and Throttling

Vue doesn't include built-in support for debouncing or throttling but it can be implemented using libraries such as [Lodash](https://lodash.com/).

In cases where a component is only used once, the debouncing can be applied directly within `methods`:

```js
import { debounce } from 'lodash-es'

createApp({
  methods: {
    // Debouncing with Lodash
    click: debounce(function () {
      // ... respond to click ...
    }, 500)
  }
}).mount('#app')
```

However, this approach is potentially problematic for components that are reused because they'll all share the same debounced function. To keep the component instances independent from each other, we can add the debounced function in the `created` lifecycle hook:

```js
app.component('save-button', {
  created() {
    // Debouncing with Lodash
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
  },
  template: `
    <button @click="debouncedClick">
      Save
    </button>
  `
})
```
