# Reactivity Fundamentals

## Declaring Reactive State

To create a reactive state from a JavaScript object, we can use a `reactive` method:

```js
import { reactive } from 'vue'

// reactive state
const state = reactive({
  count: 0
})
```

`reactive` is the equivalent of the `Vue.observable()` API in Vue 2.x, renamed to avoid confusion with RxJS observables. Here, the returned state is a reactive object. The reactive conversion is "deep" - it affects all nested properties of the passed object.

The essential use case for reactive state in Vue is that we can use it during render. Thanks to dependency tracking, the view automatically updates when reactive state changes.

This is the very essence of Vue's reactivity system. When you return an object from `data()` in a component, it is internally made reactive by `reactive()`. The template is compiled into a [render function](render-function.html) that makes use of these reactive properties.

You can learn more about `reactive` in the [Basic Reactivity API's](../api/basic-reactivity.html) section

## Creating Standalone Reactive Values as `refs`

Imagine the case where we have a standalone primitive value (for example, a string) and we want to make it reactive. Of course, we could make an object with a single property equal to our string, and pass it to `reactive`. Vue has a method that will do the same for us - it's a `ref`:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref` will return a reactive and mutable object that serves as a reactive **ref**erence to the internal value it is holding - that's where the name comes from. This object contains the only one property named `value`:

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

### Ref Unwrapping

When a ref is returned as a property on the render context (the object returned from [setup()](composition-api-setup.html)) and accessed in the template, it automatically shallow unwraps the inner value. Only the nested ref will require `.value` in the template:

```vue-html
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="count ++">Increment count</button>
    <button @click="nested.count.value ++">Nested Increment count</button>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const count = ref(0)
      return {
        count,

        nested: {
          count
        }
      }
    }
  }
</script>
```

:::tip
If you don't need to access the actual object instance, you can wrap it in a `reactive`:

```js
nested: reactive({
  count
})
```
:::

### Access in Reactive Objects

When a `ref` is accessed or mutated as a property of a reactive object, it automatically unwraps to the inner value so it behaves like a normal property:

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
console.log(count.value) // 1
```

Ref unwrapping only happens when nested inside a reactive `Object`. There is no unwrapping performed when the ref is accessed from an `Array` or a native collection type like [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map):

```js
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```

## Destructuring Reactive State

When we want to use a few properties of the large reactive object, it could be tempting to use [ES6 destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to get properties we want:

```js
import { reactive } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free'
})

let { author, title } = book
```

Unfortunately, with such a destructuring the reactivity for both properties would be lost. For such a case, we need to convert our reactive object to a set of refs. These refs will retain the reactive connection to the source object:

```js
import { reactive, toRefs } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free'
})

let { author, title } = toRefs(book)

title.value = 'Vue 3 Detailed Guide' // we need to use .value as title is a ref now
console.log(book.title) // 'Vue 3 Detailed Guide'
```

You can learn more about `refs` in the [Refs API](../api/refs-api.html#ref) section

## Prevent Mutating Reactive Objects with `readonly`

Sometimes we want to track changes of the reactive object (`ref` or `reactive`) but we also want prevent changing it from a certain place of the application. For example, when we have a [provided](component-provide-inject.html) reactive object, we want to prevent mutating it where it's injected. To do so, we can create a readonly proxy to the original object:

```js
import { reactive, readonly } from 'vue'

const original = reactive({ count: 0 })

const copy = readonly(original)

// mutating original will trigger watchers relying on the copy
original.count++

// mutating the copy will fail and result in a warning
copy.count++ // warning: "Set operation on key 'count' failed: target is readonly."
```
