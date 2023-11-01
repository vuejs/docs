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
      answer: 'Questions usually contain a question mark. ;-)'
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
      this.$refs.input.disabled = true
      this.answer = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      } finally {
        this.$refs.input.disabled = false
        this.$refs.input.focus()
      }
    }
  }
}
```

```vue-html
<p>
  Ask a yes/no question:
  <input ref="input" v-model="question" />
</p>
<p>{{ answer }}</p>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9VE2Pm0AM/SvuqBJEzcJhb2m2VbrKYXtot+0euUzBhNkMM3Q+QqIo/71mCJD9lJBg7GeP37PNka2aJtl5ZAu2tLkRjfuSKdw32jgosOReOjhmCqDgjsez/hvAoPNGDSeAfx6tE1otIIrmg5Er26Ih06+z14K3nkt5gFwrx4UCPkZCzc02gc9Xs6iPP3WvU0jWcpdXi+G2NIW2QoU7NFN0XnG1QTsHVwkLpVd5MLdCSjBe9ZEDOlbYDjXNQctiOIz8AEQJl7BEqFz6Am0cfY1mFzgINyYbdKtAN54NnkDgCY8aXaULOzLh9qByuAid0oakHw2Wlm5uvEsKYflfiQXcgDMen+B6ockTPVRCbYXaJElylpEg5nBZLklvHTXQEp63XDgokeSNo8q5xi7S9IBW6aR1ZcobEY10nt8V98GUKHm0pOlsdvaN/CHv+gYxGqPNS8mmqtcd4APcai8LULpLyinQVQir+7sEIvgEIcmUuhQqDNLzpG9IVnJpR81egZY69/aN1mWKnmU6bgcdHNaN5A7pBLBswgtgZbc00CRfqvS0Eb1vGe4hYuVNxsJ3xmB3VesCJVkGNBnTPmnaZ6Xkx+N5k+B06s3LdCyAzZmz1NJSbEIbaI+DJBnLdd0IieZnE1YvY+PYZYyk0+33YOuG6byxFFNhvn3F/mj3nS1j99RuNDvM2Ohz3NAE9+71nx+4p+/RSfy8JPQ7zt9otfQ9+Q72zauCyr7AhWrv6u6fRKP9YNd7h8oOpIZt6FcsY/Qzu32H+lTudXI99Jed/gMs855C)

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
const inputRef = ref()

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    inputRef.value.disabled = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      inputRef.value.disabled = false
      inputRef.value.focus()
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input ref="inputRef" v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9VE1z0zAQ/SuLLraH1D70FtIypdNDOUApPeoi7HWixpGMPuJkMv7vrKzIBQq92Nbu26fdp2ed2E3fl3uPbMlWtjayd2DR+f6aK7nrtXFwAoPtAgbh6g2M0Bq9g4wqMq64qrWyDqTqvXvEFq4CNi9S/KdH66RW53iWzRmh7IAmxb+dcRa89aLrjkAoJ6QC8cKxE2ZbwoeLIrBwVVXnlgZtthYaabB2VElIEVi5mtJ5ql+AsEdVQ65wSPstQHdNWhRwdQ0nrgBk+weqlKrufIM2zz5mRRExhDoPXe5F57FspBU/OmxoJmc8RkwcMyIokT1tpNpKtS7LkuQLCGeOiRDC1KSNQUtYMQjpoMUwQ7ZxrrfLqjqiVbocXFuJXgYdYt1f2+SxlnjKZ6tVXhRlRET8CPUkXI7GaDPP87rbu5B/B7fadw0oHRgF1bkNws3DfQkZvIeJI/G2Uk2nNzP+X6NWdPYs0itYq2tvg4sm1vCix0jrVRUtSuakhcNd3wmHtAJYBccG/I3dkgFIqErp2TzLmFtNGwV3XHGWNuUM9hc73WBHwVRAwSryVpGY+E+nZNtxjOFVNffAFsxZOr9WrifR6X+aVOCs1rtedmi+9pPFOVsmfTgjtfTweYoF0yxSvN5gvf1H/NkeQoyzBzpcNHvkbM45YdboYvru+xc80PecpPl8R+g3ko9odefj8AH2yauG2v4NN3V7P90K5OEne3dwqGwaKrl+nPCc0RVx+8boL+1elpfpjNn4C24chFc=)

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
watch(source, (newValue, oldValue) => {
  // executed immediately, then again when `source` changes
}, { immediate: true })
```

</div>

<div class="composition-api">

## `watchEffect()` \*\* {#watcheffect}

It is common for the watcher callback to use exactly the same reactive state as the source. For example, consider the following code, which uses a watcher to load a remote resource whenever the `todoId` ref changes:

```js
const todoId = ref(1)
const data = ref(null)

watch(todoId, async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
}, { immediate: true })
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

By default, user-created watcher callbacks are called **before** Vue component updates. This means if you attempt to access the DOM inside a watcher callback, the DOM will be in the state before Vue has applied any updates.

If you want to access the DOM in a watcher callback **after** Vue has updated it, you need to specify the `flush: 'post'` option:

<div class="options-api">

```js
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

```js
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
