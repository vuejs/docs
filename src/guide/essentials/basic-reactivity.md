# Basic Reactivity

:::tip API Preference
This section contains different content for Options API and Composition API. Your current preference is <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. You can toggle between the API styles using the "API Preference" switches at the top of the left sidebar.
:::

## Declaring State

<div class="options-api">

With Options API, we use the `data` option to declare reactive state of a component. The option value should be a function that returns an object. Vue will call the function when creating a new component instance, and wrap the returned object in its reactivity system. The wrapped object is stored on the component instance as `$data`. For convenience, any top-level properties of that object are also exposed directly on the component instance (`this` in methods and lifecycle hooks):

```js
export default {
  data() {
    return {
      count: 0
    }
  },

  // `mounted` is a lifecycle hook which we will explain later
  mounted() {
    // `this` refers to the component instance.
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

### Reactive Variables with `ref`

The primary API for declaring reactive state when using Composition API is the `ref` method:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref` takes the argument and returns it wrapped within an object with a `value` property, which can then be used to access or mutate the value of the reactive variable:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

There are two reasons why we need to wrap the value in an object:

- **Reactivity tracking**: Vue's reactivity system needs a way to track what state is being used or changed. When you access or mutate a ref via its `.value` property, it triggers the underlying getter/setter functions that notify Vue about what is going on. We discuss more details on how Vue's reactivity system works in [Reactivity in Depth](/guide/advanced/reactivity-in-depth.html).

- **Passing references instead of values**: in JavaScript, primitive types such as strings, numbers and booleans are _passed by value_. This means when you assign a variable to another variable, or pass it to a function, you are passing a copy of the value that is completely disconnected from the original variable:

  ```js
  let count = 0

  function log(count) {
    setInterval(() => {
      // This will always log 0, which is the initial
      // value of `count` when log() was called.
      console.log(count)
    }, 1000)
  }

  log(count)
  count++ // this won't affect the log output.
  ```

  However, objects are always _passed by reference_. So with a ref, we can pass it around while retaining the connection to the original ref:

  ```js
  const count = ref(0)

  function log(count) {
    setInterval(() => {
      // This will always log the latest value.
      console.log(count.value)
    }, 1000)
  }

  log(count)
  count.value++ // this will affect the log output.
  ```

  This capability is quite important as it unlocks powerful patterns that allow us to compose reactive logic encapsulated in decoupled functions, which we will discuss later in the guide.

### Exposing State to Template

To use refs in a component's template, declare and return them from a component's `setup()` function:

```js
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for composition API usage.
  setup() {
    const count = ref(0)

    // expose the ref to the template
    return {
      count
    }
  }
}
```

```vue-html
<div>{{ count }}</div>
```

Notice that we don't need `.value` when accessing refs in the template: refs are automatically "unwrapped" when exposed on the template render context.

Manually exposing refs via `setup()` can be verbose. Luckily, it is only necessary when not using a build step. When using Single File Components (SFCs), we can greatly simplify the usage with `<script setup>`:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  {{ count }}
</template>
```

Top-level imports and variables declared in `<script setup>` are automatically usable in the template of the same component.

> For the rest of the guide, we will be primarily using SFC + `<script setup>` syntax for Composition API code examples, as that is the most common usage for Vue developers.

</div>

## Declaring Methods

<div class="options-api">

To add methods to a component instance we use the `methods` option. This should be an object containing the desired methods:

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // methods can be called in lifecycle hooks, or other methods!
    this.increment()
  }
}
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Vue automatically binds the `this` value for `methods` so that it always refers to the component instance. This ensures that a method retains the correct `this` value if it's used as an event listener or callback. You should avoid using arrow functions when defining `methods`, as that prevents Vue from binding the appropriate `this` value.

Just like all other properties of the component instance, the `methods` are accessible from within the component's template. Inside a template they are most commonly used as event listeners:

```vue-html
<button @click="increment">{{ count }}</button>
```

In the example above, the method `increment` will be called when the `<button>` is clicked.

</div>

<div class="composition-api">

To declare methods when using Composition API, simply declare functions in the same scope with the reactive state:

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      count.value++
    }

    // when using manual setup(),
    // don't forget to expose the function as well.
    return {
      count,
      increment
    }
  }
}
```

Methods are typically used as event listeners:

```vue-html
<button @click="increment">{{ count }}</button>
```

Again, the same example is much simpler in an SFC with `<script setup>`, as functions are auto-exposes as well:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

It is also possible to call a method inside a binding expression. As we'll see shortly, it's usually better to use a [computed property](computed.html) instead. However, using a method can be useful in scenarios where computed properties aren't a viable option. You can call a method anywhere that a template supports JavaScript expressions:

```vue-html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

If the methods `toTitleDate` or `formatDate` access any reactive data then it will be tracked as a rendering dependency, just as if it had been used in the template directly.

Methods called inside binding expressions should **not** have any side effects, such as changing data or triggering asynchronous operations. If you find yourself tempted to do that you should probably use a [lifecycle hook](/guide/components/lifecycle.html) instead.

### Deep Reactivity

In Vue, state is deeply reactive by default. This means you can expect changes to be detected even when you mutate nested objects or arrays:

<div class="options-api">

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // these will work as expected.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // these will work as expected.
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
</script>
```

</div>

It is also possible to explicitly create ["shallow" reactive objects](/guide/advanced/reactivity-in-depth.html#deep-vs-shallow-reactivity) where the reactivity is only tracked for root-level properties, however they are typically only needed in advanced use cases.

<div class="options-api">

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

:::tip
If you are using the [no-build setup](/guide/quick-start.html#without-build-tools), add the following to your import map: `"lodash-es": "https://cdn.jsdelivr.net/npm/lodash-es/+esm"`
:::

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

</div>

<div class="composition-api">

### Ref Transform

The necessity of using `.value` wit refs roots from the language constraints of JavaScript. However, with compile-time transforms we can improve the ergonomics by automatically appending `.value` in appropriate locations. The [ref transform](https://github.com/vuejs/vue-next/tree/master/packages/ref-transform) allows us to write the above example like this:

```vue
<script setup>
let count = $ref(0)

function increment() {
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

:::warning Experimental
Ref transform is currently an experimental feature. It is disabled by default and requires explicit opt-in. It may also change before being finalized. More details can be found in its [proposal and discussion on GitHub](https://github.com/vuejs/rfcs/discussions/369).
:::

</div>
