# Watchers {#watchers}

## Basic Example {#basic-example}

Computed properties allow us to declaratively compute derived values. However, there are cases where we need to perform "side effects" in reaction to state changes - for example, mutating the DOM, or changing another piece of state based on the result of an async operation.

<div class="options-api">

With the Options API, we can use the [`watch` option](/api/options-state#watch) to trigger a function whenever a reactive property changes:

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)',
      loading: false
    }
  },
  watch: {
    // whenever question changes, this function will run
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.loading = true
      this.answer = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      } finally {
        this.loading = false
      }
    }
  }
}
```

```vue-html
<p>
  Ask a yes/no question:
  <input v-model="question" :disabled="loading" />
</p>
<p>{{ answer }}</p>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9VE1v2zAM/SucLnaw1D70lqUbsiKH7rB1W4++aDYdq5ElTx9xgiD/fbT8lXZFAQO2+Mgn8pH0mW2aJjl4ZCu2trkRjfucKTw22jgosOReOjhnCqDgjseL/hvAoPNGjSeAvx6tE1qtIIqWo5Er26Ih088BteCt51KeINfKcaGAT5FQc7NP4NPNYiaQmhdC7VZQcmlxMF+61yUcWu7yajVmkabQVqjwgGZmzSuudmiX4CphofQqD+ZWSAnGqz5y9I4VtmOuS9CyGA9T3QCihGu3RKhc+gJtHH2JFld+EG5Mdug2QYZ4MSKhgBd11OgqXdipEm5PKoer0Jk2kA66wB044/EF1GtOSPRUCbUnryRJosnFnK4zpC5YR7205M9bLhyUSIrGUeVcY1dpekKrdNK6MuWNiKYKXt8V98FElDxbknGxGLCpZMi7VkGMxmjzv0pz1tvO4QPcay8LULoj5RToKoTN40MCEXyEQDJTl0KFmXpNOqsUxudN+TNFzzqdJp8ODutGcod0Alg34QWwsXsaVtIjVXqe9h5bC9V4B4ebWhco7zI24hmDVSEs/yOxIPOQEFnTnjzt2emS83nYFrhcevM6nRJhS+Ys9aoUu6Av7WqoNWO5rhsh0fxownplbBqhjJEmuv0WbN2UDNtDMRXm+zfsz/bY2TL2SH1Ec8CMTZjjhqaxh7e/v+ORvieQqvaSvN8Bf6HV0veSdG5fvSoo7Su/kO1D3f13SKInuz06VHYsahzzfl0yRj+s+3dKn9O9TW7HPrPLP624lFU=)

The `watch` option also supports a dot-delimited path as the key:

```js
export default {
  watch: {
    // Note: only simple paths. Expressions are not supported.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

With Composition API, we can use the [`watch` function](/api/reactivity-core#watch) to trigger a callback whenever a piece of reactive state changes:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9U8Fy0zAQ/ZVFF9tDah96C2mZ0umhHKBAj7oIe52oUSQjyXEyGf87KytyoDC9JPa+p+e3b1cndtd15b5HtmQrV1vZeXDo++6Wa7nrjPVwAovtAgbh6w2M0Fqzg4xOZFxzXRvtPPzq0XlpNNwEbp5lRUKEdgPaVP925jnoXS+UOgKxvJAaxEVjJ+y2hA9XxUVFGdFIvT7LtEI5JIzrqjrbGozdOmikxdqTKqmIQOV6gvOkvQDhjrqGXOOQvCzAqCa9FHBzCyeuAWT7F6uUulZ9gy7PPmZFETmQjJV7oXoke972GJHY+Axkzxupt4FalhRcYHh7TDIQcqA+LTriikFIDy0G59nG+84tq+qITpty8G0lOhmSiedefSaPZ0mnfHFG50VRRkbkj1BPceVorbFzF/+6fQj4O7g3vWpAm6Ao6JzfINw9PZaQwXuYNJJuK/U0z1nxdTLT0M7s8Ec/I3WxquLS0brRi8ddp4RHegNYhR0M/Du3pXFSAJU285osI7aSuus97K92pkF1w1nCOYNlI534qbCh8tkOVasoXkV1+sjplLZ0HGN5Vc1G2IJ5R8Np5XpKlK7J1CJntdl1UqH92k0bzdkyNc8ZRWGGz1MtbMQi1esN1tv/1F/cIdQ4e6LJod0jZzPmhV2jj/DDjy94oOcZpK57Rew3wO/ojOpjJIH2qdcN2f6DN7l9nC47RfTsHg4etUtNpZUeJz5ndPPv32j9Yve6vE6DZuNvu1R2Tg==)

### Watch Source Types {#watch-source-types}

`watch`'s first argument can be different types of reactive "sources": it can be a ref (including computed refs), a reactive object, a getter function, or an array of multiple sources:

```js
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

Do note that you can't watch a property of a reactive object like this:

```js
const obj = reactive({ count: 0 })

// this won't work because we are passing a number to watch()
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

Instead, use a getter:

```js
// instead, use a getter:
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

</div>

## Deep Watchers {#deep-watchers}

<div class="options-api">

`watch` is shallow by default: the callback will only trigger when the watched property has been assigned a new value - it won't trigger on nested property changes. If you want the callback to fire on all nested mutations, you need to use a deep watcher:

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

When you call `watch()` directly on a reactive object, it will implicitly create a deep watcher - the callback will be triggered on all nested mutations:

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // fires on nested property mutations
  // Note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object!
})

obj.count++
```

This should be differentiated with a getter that returns a reactive object - in the latter case, the callback will only fire if the getter returns a different object:

```js
watch(
  () => state.someObject,
  () => {
    // fires only when state.someObject is replaced
  }
)
```

You can, however, force the second case into a deep watcher by explicitly using the `deep` option:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Note: `newValue` will be equal to `oldValue` here
    // *unless* state.someObject has been replaced
  },
  { deep: true }
)
```

</div>

:::warning Use with Caution
Deep watch requires traversing all nested properties in the watched object, and can be expensive when used on large data structures. Use it only when necessary and beware of the performance implications.
:::

## Eager Watchers {#eager-watchers}

`watch` is lazy by default: the callback won't be called until the watched source has changed. But in some cases we may want the same callback logic to be run eagerly - for example, we may want to fetch some initial data, and then re-fetch the data whenever relevant state changes.

<div class="options-api">

We can force a watcher's callback to be executed immediately by declaring it using an object with a `handler` function and the `immediate: true` option:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // this will be run immediately on component creation.
      },
      // force eager callback execution
      immediate: true
    }
  }
  // ...
}
```

The initial execution of the handler function will happen just before the `created` hook. Vue will have already processed the `data`, `computed`, and `methods` options, so those properties will be available on the first invocation.

</div>

<div class="composition-api">

We can force a watcher's callback to be executed immediately by passing the `immediate: true` option:

```js
watch(
  source,
  (newValue, oldValue) => {
    // executed immediately, then again when `source` changes
  },
  { immediate: true }
)
```

</div>

<div class="composition-api">

## `watchEffect()` \*\* {#watcheffect}

It is common for the watcher callback to use exactly the same reactive state as the source. For example, consider the following code, which uses a watcher to load a remote resource whenever the `todoId` ref changes:

```js
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
```

In particular, notice how the watcher uses `todoId` twice, once as the source and then again inside the callback.

This can be simplified with [`watchEffect()`](/api/reactivity-core#watcheffect). `watchEffect()` allows us to track the callback's reactive dependencies automatically. The watcher above can be rewritten as:

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

Here, the callback will run immediately, there's no need to specify `immediate: true`. During its execution, it will automatically track `todoId.value` as a dependency (similar to computed properties). Whenever `todoId.value` changes, the callback will be run again. With `watchEffect()`, we no longer need to pass `todoId` explicitly as the source value.

You can check out [this example](/examples/#fetching-data) of `watchEffect()` and reactive data-fetching in action.

For examples like these, with only one dependency, the benefit of `watchEffect()` is relatively small. But for watchers that have multiple dependencies, using `watchEffect()` removes the burden of having to maintain the list of dependencies manually. In addition, if you need to watch several properties in a nested data structure, `watchEffect()` may prove more efficient than a deep watcher, as it will only track the properties that are used in the callback, rather than recursively tracking all of them.

:::tip
`watchEffect` only tracks dependencies during its **synchronous** execution. When using it with an async callback, only properties accessed before the first `await` tick will be tracked.
:::

### `watch` vs. `watchEffect` {#watch-vs-watcheffect}

`watch` and `watchEffect` both allow us to reactively perform side effects. Their main difference is the way they track their reactive dependencies:

- `watch` only tracks the explicitly watched source. It won't track anything accessed inside the callback. In addition, the callback only triggers when the source has actually changed. `watch` separates dependency tracking from the side effect, giving us more precise control over when the callback should fire.

- `watchEffect`, on the other hand, combines dependency tracking and side effect into one phase. It automatically tracks every reactive property accessed during its synchronous execution. This is more convenient and typically results in terser code, but makes its reactive dependencies less explicit.

</div>

## Callback Flush Timing {#callback-flush-timing}

When you mutate reactive state, it may trigger both Vue component updates and watcher callbacks created by you.

Similar to component updates, user-created watcher callbacks are batched to avoid duplicate invocations. For example, we probably don't want a watcher to fire a thousand times if we synchronously push a thousand items into an array being watched.

By default, a watcher's callback is called **after** parent component updates (if any), and **before** the owner component's DOM updates. This means if you attempt to access the owner component's own DOM inside a watcher callback, the DOM will be in a pre-update state.

### Post Watchers {#post-watchers}

If you want to access the owner component's DOM in a watcher callback **after** Vue has updated it, you need to specify the `flush: 'post'` option:

<div class="options-api">

```js{6}
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

</div>

<div class="composition-api">

```js{2,6}
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

Post-flush `watchEffect()` also has a convenience alias, `watchPostEffect()`:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* executed after Vue updates */
})
```

</div>

### Sync Watchers {#sync-watchers}

It's also possible to create a watcher that fires synchronously, before any Vue-managed updates:

<div class="options-api">

```js{6}
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'sync'
    }
  }
}
```

</div>

<div class="composition-api">

```js{2,6}
watch(source, callback, {
  flush: 'sync'
})

watchEffect(callback, {
  flush: 'sync'
})
```

Sync `watchEffect()` also has a convenience alias, `watchSyncEffect()`:

```js
import { watchSyncEffect } from 'vue'

watchSyncEffect(() => {
  /* executed synchronously upon reactive data change */
})
```

</div>

:::warning Use with Caution
Sync watchers do not have batching and triggers every time a reactive mutation is detected. It's ok to use them to watch simple boolean values, but avoid using them on data sources that might be synchronously mutated many times, e.g. arrays.
:::

<div class="options-api">

## `this.$watch()` \* {#this-watch}

It's also possible to imperatively create watchers using the [`$watch()` instance method](/api/component-instance#watch):

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

This is useful when you need to conditionally set up a watcher, or only watch something in response to user interaction. It also allows you to stop the watcher early.

</div>

## Stopping a Watcher {#stopping-a-watcher}

<div class="options-api">

Watchers declared using the `watch` option or the `$watch()` instance method are automatically stopped when the owner component is unmounted, so in most cases you don't need to worry about stopping the watcher yourself.

In the rare case where you need to stop a watcher before the owner component unmounts, the `$watch()` API returns a function for that:

```js
const unwatch = this.$watch('foo', callback)

// ...when the watcher is no longer needed:
unwatch()
```

</div>

<div class="composition-api">

Watchers declared synchronously inside `setup()` or `<script setup>` are bound to the owner component instance, and will be automatically stopped when the owner component is unmounted. In most cases, you don't need to worry about stopping the watcher yourself.

The key here is that the watcher must be created **synchronously**: if the watcher is created in an async callback, it won't be bound to the owner component and must be stopped manually to avoid memory leaks. Here's an example:

```vue
<script setup>
import { watchEffect } from 'vue'

// this one will be automatically stopped
watchEffect(() => {})

// ...this one will not!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

To manually stop a watcher, use the returned handle function. This works for both `watch` and `watchEffect`:

```js
const unwatch = watchEffect(() => {})

// ...later, when no longer needed
unwatch()
```

Note that there should be very few cases where you need to create watchers asynchronously, and synchronous creation should be preferred whenever possible. If you need to wait for some async data, you can make your watch logic conditional instead:

```js
// data to be loaded asynchronously
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // do something when data is loaded
  }
})
```

</div>
