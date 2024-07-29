---
outline: deep
---

# Reactivity Fundamentals {#reactivity-fundamentals}

:::tip API Preference
This page and many other chapters later in the guide contain different content for the Options API and the Composition API. Your current preference is <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. You can toggle between the API styles using the "API Preference" switches at the top of the left sidebar.
:::

<div class="options-api">

## Declaring Reactive State \* {#declaring-reactive-state}

With the Options API, we use the `data` option to declare reactive state of a component. The option value should be a function that returns an object. Vue will call the function when creating a new component instance, and wrap the returned object in its reactivity system. Any top-level properties of this object are proxied on the component instance (`this` in methods and lifecycle hooks):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` is a lifecycle hook which we will explain later
  mounted() {
    // `this` refers to the component instance.
    console.log(this.count) // => 1

    // data can be mutated as well
    this.count = 2
  }
}
```

[Try it in the Playground](https://play.vuejs.org/#eNpFUNFqhDAQ/JXBpzsoHu2j3B2U/oYPpnGtoetGkrW2iP/eRFsPApthd2Zndilex7H8mqioimu0wY16r4W+Rx8ULXVmYsVSC9AaNafz/gcC6RTkHwHWT6IVnne85rI+1ZLr5YJmyG1qG7gIA3Yd2R/LhN77T8y9sz1mwuyYkXazcQI2SiHz/7iP3VlQexeb5KKjEKEe2lPyMIxeSBROohqxVO4E6yV6ppL9xykTy83tOQvd7tnzoZtDwhrBO2GYNFloYWLyxrzPPOi44WWLWUt618txvASUhhRCKSHgbZt2scKy7HfCujGOqWL9BVfOgyI=)

These instance properties are only added when the instance is first created, so you need to ensure they are all present in the object returned by the `data` function. Where necessary, use `null`, `undefined` or some other placeholder value for properties where the desired value isn't yet available.

It is possible to add a new property directly to `this` without including it in `data`. However, properties added this way will not be able to trigger reactive updates.

Vue uses a `$` prefix when exposing its own built-in APIs via the component instance. It also reserves the prefix `_` for internal properties. You should avoid using names for top-level `data` properties that start with either of these characters.

### Reactive Proxy vs. Original \* {#reactive-proxy-vs-original}

In Vue 3, data is made reactive by leveraging [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Users coming from Vue 2 should be aware of the following edge case:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

When you access `this.someObject` after assigning it, the value is a reactive proxy of the original `newObject`. **Unlike in Vue 2, the original `newObject` is left intact and will not be made reactive: make sure to always access reactive state as a property of `this`.**

</div>

<div class="composition-api">

## Declaring Reactive State \*\* {#declaring-reactive-state-1}

### `ref()` \*\* {#ref}

In Composition API, the recommended way to declare reactive state is using the [`ref()`](/api/reactivity-core#ref) function:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` takes the argument and returns it wrapped within a ref object with a `.value` property:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

> See also: [Typing Refs](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

To access refs in a component's template, declare and return them from a component's `setup()` function:

```js{5,9-11}
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for the Composition API.
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

Notice that we did **not** need to append `.value` when using the ref in the template. For convenience, refs are automatically unwrapped when used inside templates (with a few [caveats](#caveat-when-unwrapping-in-templates)).

You can also mutate a ref directly in event handlers:

```vue-html{1}
<button @click="count++">
  {{ count }}
</button>
```

For more complex logic, we can declare functions that mutate refs in the same scope and expose them as methods alongside the state:

```js{7-10,15}
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // .value is needed in JavaScript
      count.value++
    }

    // don't forget to expose the function as well.
    return {
      count,
      increment
    }
  }
}
```

Exposed methods can then be used as event handlers:

```vue-html{1}
<button @click="increment">
  {{ count }}
</button>
```

Here's the example live on [Codepen](https://codepen.io/vuejs-examples/pen/WNYbaqo), without using any build tools.

### `<script setup>` \*\* {#script-setup}

Manually exposing state and methods via `setup()` can be verbose. Luckily, it can be avoided when using [Single-File Components (SFCs)](/guide/scaling-up/sfc). We can simplify the usage with `<script setup>`:

```vue{1}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNo9jUEKgzAQRa8yZKMiaNcllvYe2dgwQqiZhDhxE3L3jrW4/DPvv1/UK8Zhz6juSm82uciwIef4MOR8DImhQMIFKiwpeGgEbQwZsoE2BhsyMUwH0d66475ksuwCgSOb0CNx20ExBCc77POase8NVUN6PBdlSwKjj+vMKAlAvzOzWJ52dfYzGXXpjPoBAKX856uopDGeFfnq8XKp+gWq4FAi)

Top-level imports, variables and functions declared in `<script setup>` are automatically usable in the template of the same component. Think of the template as a JavaScript function declared in the same scope - it naturally has access to everything declared alongside it.

:::tip
For the rest of the guide, we will be primarily using SFC + `<script setup>` syntax for the Composition API code examples, as that is the most common usage for Vue developers.

If you are not using SFC, you can still use Composition API with the [`setup()`](/api/composition-api-setup) option.
:::

### Why Refs? \*\* {#why-refs}

You might be wondering why we need refs with the `.value` instead of plain variables. To explain that, we will need to briefly discuss how Vue's reactivity system works.

When you use a ref in a template, and change the ref's value later, Vue automatically detects the change and updates the DOM accordingly. This is made possible with a dependency-tracking based reactivity system. When a component is rendered for the first time, Vue **tracks** every ref that was used during the render. Later on, when a ref is mutated, it will **trigger** a re-render for components that are tracking it.

In standard JavaScript, there is no way to detect the access or mutation of plain variables. However, we can intercept the get and set operations of an object's properties using getter and setter methods.

The `.value` property gives Vue the opportunity to detect when a ref has been accessed or mutated. Under the hood, Vue performs the tracking in its getter, and performs triggering in its setter. Conceptually, you can think of a ref as an object that looks like this:

```js
// pseudo code, not actual implementation
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

Another nice trait of refs is that unlike plain variables, you can pass refs into functions while retaining access to the latest value and the reactivity connection. This is particularly useful when refactoring complex logic into reusable code.

The reactivity system is discussed in more details in the [Reactivity in Depth](/guide/extras/reactivity-in-depth) section.
</div>

<div class="options-api">

## Declaring Methods \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Free Vue.js Methods Lesson"/>

To add methods to a component instance we use the `methods` option. This should be an object containing the desired methods:

```js{7-11}
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

Vue automatically binds the `this` value for `methods` so that it always refers to the component instance. This ensures that a method retains the correct `this` value if it's used as an event listener or callback. You should avoid using arrow functions when defining `methods`, as that prevents Vue from binding the appropriate `this` value:

```js
export default {
  methods: {
    increment: () => {
      // BAD: no `this` access here!
    }
  }
}
```

Just like all other properties of the component instance, the `methods` are accessible from within the component's template. Inside a template they are most commonly used as event listeners:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Try it in the Playground](https://play.vuejs.org/#eNplj9EKwyAMRX8l+LSx0e65uLL9hy+dZlTWqtg4BuK/z1baDgZicsPJgUR2d656B2QN45P02lErDH6c9QQKn10YCKIwAKqj7nAsPYBHCt6sCUDaYKiBS8lpLuk8/yNSb9XUrKg20uOIhnYXAPV6qhbF6fRvmOeodn6hfzwLKkx+vN5OyIFwdENHmBMAfwQia+AmBy1fV8E2gWBtjOUASInXBcxLvN4MLH0BCe1i4Q==)

In the example above, the method `increment` will be called when the `<button>` is clicked.

</div>

### Deep Reactivity {#deep-reactivity}

<div class="options-api">

In Vue, state is deeply reactive by default. This means you can expect changes to be detected even when you mutate nested objects or arrays:

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

Refs can hold any value type, including deeply nested objects, arrays, or JavaScript built-in data structures like `Map`.

A ref will make its value deeply reactive. This means you can expect changes to be detected even when you mutate nested objects or arrays:

```js
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
```

Non-primitive values are turned into reactive proxies via [`reactive()`](#reactive), which is discussed below.

It is also possible to opt-out of deep reactivity with [shallow refs](/api/reactivity-advanced#shallowref). For shallow refs, only `.value` access is tracked for reactivity. Shallow refs can be used for optimizing performance by avoiding the observation cost of large objects, or in cases where the inner state is managed by an external library.

Further reading:

- [Reduce Reactivity Overhead for Large Immutable Structures](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
- [Integration with External State Systems](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

</div>

### DOM Update Timing {#dom-update-timing}

When you mutate reactive state, the DOM is updated automatically. However, it should be noted that the DOM updates are not applied synchronously. Instead, Vue buffers them until the "next tick" in the update cycle to ensure that each component updates only once no matter how many state changes you have made.

To wait for the DOM update to complete after a state change, you can use the [nextTick()](/api/general#nexttick) global API:

<div class="composition-api">

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // Now the DOM is updated
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    async increment() {
      this.count++
      await nextTick()
      // Now the DOM is updated
    }
  }
}
```

</div>

<div class="composition-api">

## `reactive()` \*\* {#reactive}

There is another way to declare reactive state, with the `reactive()` API. Unlike a ref which wraps the inner value in a special object, `reactive()` makes an object itself reactive:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

> See also: [Typing Reactive](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

Usage in template:

```vue-html
<button @click="state.count++">
  {{ state.count }}
</button>
```

Reactive objects are [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and behave just like normal objects. The difference is that Vue is able to intercept the access and mutation of all properties of a reactive object for reactivity tracking and triggering.

`reactive()` converts the object deeply: nested objects are also wrapped with `reactive()` when accessed. It is also called by `ref()` internally when the ref value is an object. Similar to shallow refs, there is also the [`shallowReactive()`](/api/reactivity-advanced#shallowreactive) API for opting-out of deep reactivity.

### Reactive Proxy vs. Original \*\* {#reactive-proxy-vs-original-1}

It is important to note that the returned value from `reactive()` is a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) of the original object, which is not equal to the original object:

```js
const raw = {}
const proxy = reactive(raw)

// proxy is NOT equal to the original.
console.log(proxy === raw) // false
```

Only the proxy is reactive - mutating the original object will not trigger updates. Therefore, the best practice when working with Vue's reactivity system is to **exclusively use the proxied versions of your state**.

To ensure consistent access to the proxy, calling `reactive()` on the same object always returns the same proxy, and calling `reactive()` on an existing proxy also returns that same proxy:

```js
// calling reactive() on the same object returns the same proxy
console.log(reactive(raw) === proxy) // true

// calling reactive() on a proxy returns itself
console.log(reactive(proxy) === proxy) // true
```

This rule applies to nested objects as well. Due to deep reactivity, nested objects inside a reactive object are also proxies:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Limitations of `reactive()` \*\* {#limitations-of-reactive}

The `reactive()` API has a few limitations:

1. **Limited value types:** it only works for object types (objects, arrays, and [collection types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) such as `Map` and `Set`). It cannot hold [primitive types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) such as `string`, `number` or `boolean`.

2. **Cannot replace entire object:** since Vue's reactivity tracking works over property access, we must always keep the same reference to the reactive object. This means we can't easily "replace" a reactive object because the reactivity connection to the first reference is lost:

   ```js
   let state = reactive({ count: 0 })

   // the above reference ({ count: 0 }) is no longer being tracked
   // (reactivity connection is lost!)
   state = reactive({ count: 1 })
   ```

3. **Not destructure-friendly:** when we destructure a reactive object's primitive type property into local variables, or when we pass that property into a function, we will lose the reactivity connection:

   ```js
   const state = reactive({ count: 0 })

   // count is disconnected from state.count when destructured.
   let { count } = state
   // does not affect original state
   count++

   // the function receives a plain number and
   // won't be able to track changes to state.count
   // we have to pass the entire object in to retain reactivity
   callSomeFunction(state.count)
   ```

Due to these limitations, we recommend using `ref()` as the primary API for declaring reactive state.

## Additional Ref Unwrapping Details \*\* {#additional-ref-unwrapping-details}

### As Reactive Object Property \*\* {#ref-unwrapping-as-reactive-object-property}

A ref is automatically unwrapped when accessed or mutated as a property of a reactive object. In other words, it behaves like a normal property :

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

If a new ref is assigned to a property linked to an existing ref, it will replace the old ref:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref is now disconnected from state.count
console.log(count.value) // 1
```

Ref unwrapping only happens when nested inside a deep reactive object. It does not apply when it is accessed as a property of a [shallow reactive object](/api/reactivity-advanced#shallowreactive).

### Caveat in Arrays and Collections \*\* {#caveat-in-arrays-and-collections}

Unlike reactive objects, there is **no** unwrapping performed when the ref is accessed as an element of a reactive array or a native collection type like `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```

### Caveat when Unwrapping in Templates \*\* {#caveat-when-unwrapping-in-templates}

Ref unwrapping in templates only applies if the ref is a top-level property in the template render context.

In the example below, `count` and `object` are top-level properties, but `object.id` is not:

```js
const count = ref(0)
const object = { id: ref(1) }
```

Therefore, this expression works as expected:

```vue-html
{{ count + 1 }}
```

...while this one does **NOT**:

```vue-html
{{ object.id + 1 }}
```

The rendered result will be `[object Object]1` because `object.id` is not unwrapped when evaluating the expression and remains a ref object. To fix this, we can destructure `id` into a top-level property:

```js
const { id } = object
```

```vue-html
{{ id + 1 }}
```

Now the render result will be `2`.

Another thing to note is that a ref does get unwrapped if it is the final evaluated value of a text interpolation (i.e. a <code v-pre>{{ }}</code> tag), so the following will render `1`:

```vue-html
{{ object.id }}
```

This is just a convenience feature of text interpolation and is equivalent to <code v-pre>{{ object.id.value }}</code>.

</div>

<div class="options-api">

### Stateful Methods \* {#stateful-methods}

In some cases, we may need to dynamically create a method function, for example creating a debounced event handler:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Debouncing with Lodash
    click: debounce(function () {
      // ... respond to click ...
    }, 500)
  }
}
```

However, this approach is problematic for components that are reused because a debounced function is **stateful**: it maintains some internal state on the elapsed time. If multiple component instances share the same debounced function, they will interfere with one another.

To keep each component instance's debounced function independent of the others, we can create the debounced version in the `created` lifecycle hook:

```js
export default {
  created() {
    // each instance now has its own copy of debounced handler
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // also a good idea to cancel the timer
    // when the component is removed
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... respond to click ...
    }
  }
}
```

</div>
