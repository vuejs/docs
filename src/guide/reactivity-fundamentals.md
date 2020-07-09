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

## Creating Standalone Reactive Values as `refs`

Imagine the case where we have a standalone primitive value (for example, a string) and we want to make it reactive. Of course, we could make am object with a single property equal to our string, and pass it to `reactive`. Vue has a method that will do the same for us - it's a `ref`:

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

When a ref is returned as a property on the render context (the object returned from [setup()](composition-api-setup.html)) and accessed in the template, it automatically unwraps to the inner value. There is no need to append `.value` in the template:

```vue-html
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="count ++">Increment count</button>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const count = ref(0)
      return {
        count
      }
    }
  }
</script>
```

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

## Prevent Mutating Reactive Objects with `readonly`
