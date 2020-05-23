# Reactivity APIs

## `reactive`

Takes an object and returns a reactive proxy of the original.

```js
const obj = reactive({ count: 0 })
```

The reactive conversion is "deep"—it affects all nested properties. In the [ES2015 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) based implementation, the returned proxy is **not** equal to the original object. It is recommended to work exclusively with the reactive proxy and avoid relying on the original object.

### Typing

```ts
function reactive<T extends object>(raw: T): T
```

## `ref`

Takes an inner value and returns a reactive and mutable ref object. The ref object has a single property `.value` that points to the inner value.

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

If an object is assigned as a ref's value, the object is made deeply reactive by the `reactive` method.

### Access in Templates

When a ref is returned as a property on the render context (the object returned from `setup()`) and accessed in the template, it automatically unwraps to the inner value. There is no need to append `.value` in the template:

```html
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

However, if we decide to change the inline event handler on button click to the component method declared in `setup`, we need to remember that `ref` is not unwrapped there:

```html
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="increment">Increment count</button>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const count = ref(0)
      function increment() {
        count.value++ // ref is not unwrapped outside the template
      }
      return {
        count,
        increment
      }
    }
  }
</script>
```

### Access in Reactive Objects

When a ref is accessed or mutated as a property of a reactive object, it automatically unwraps to the inner value so it behaves like a normal property:

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

Ref unwrapping only happens when nested inside a reactive `Object`. There is no unwrapping performed when the ref is accessed from an `Array` or a native collection type like `Map`:

```js
const arr = reactive([ref(0)])
// need .value here
console.log(arr[0].value)

const map = reactive(new Map([['foo', ref(0)]]))
// need .value here
console.log(map.get('foo').value)
```

### Typing

```ts
interface Ref<T> {
  value: T
}

function ref<T>(value: T): Ref<T>
```

Sometimes we may need to specify complex types for a ref's inner value. We can do that succinctly by passing a generics argument when calling `ref` to override the default inference:

```ts
const foo = ref<string | number>('foo') // foo's type: Ref<string | number>

foo.value = 123 // ok!
```

## `computed`

Takes a getter function and returns an immutable reactive ref object for the returned value from the getter.

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // error
```

Alternatively, it can take an object with `get` and `set` functions to create a writable ref object.

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

### Typing

```ts
// read-only
function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>

// writable
function computed<T>(options: { get: () => T; set: (value: T) => void }): Ref<T>
```

## `readonly`

Takes an object (reactive or plain) or a ref and returns a readonly proxy to the original. A readonly proxy is deep: any nested property accessed will be readonly as well.

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // works for reactivity tracking
  console.log(copy.count)
})

// mutating original will trigger watchers relying on the copy
original.count++

// mutating the copy will fail and result in a warning
copy.count++ // warning!
```

## `watchEffect`

Runs a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies are changed.

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

### Stopping the Watcher

When `watchEffect` is called during a component's `setup()` function or lifecycle hooks, the watcher is linked to the component's lifecycle and will be automatically stopped when the component is unmounted.

In other cases, it returns a stop handle which can be called to explicitly stop the watcher:

```js
const stop = watchEffect(() => {
  /* ... */
})

// later
stop()
```

### Side Effect Invalidation

Sometimes the watched effect function will perform asynchronous side effects that need to be cleaned up when it is invalidated (i.e state changed before the effects can be completed). The effect function receives an `onInvalidate` function that can be used to register an invalidation callback. This invalidation callback is called when:

- the effect is about to re-run
- the watcher is stopped (i.e. when the component is unmounted if `watchEffect` is used inside `setup()` or lifecycle hooks)

```js
watchEffect(onInvalidate => {
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
watchEffect(async () => {
  data.value = await fetchData(props.id)
})
```

An async function implicitly returns a Promise, but the cleanup function needs to be registered immediately before the Promise resolves. In addition, Vue relies on the returned Promise to automatically handle potential errors in the Promise chain.

### Effect Flush Timing

Vue's reactivity system buffers invalidated effects and flushes them asynchronously to avoid unnecessary duplicate invocation when there are many state mutations happening in the same "tick". Internally, a component's `update` function is also a watched effect. When a user effect is queued, it is always invoked after all component `update` effects:

```html
<template>
  <div>{{ count }}</div>
</template>

<script>
  export default {
    setup() {
      const count = ref(0)

      watchEffect(() => {
        console.log(count.value)
      })

      return {
        count
      }
    }
  }
</script>
```

In this example:

- The count will be logged synchronously on initial run.
- When `count` is mutated, the callback will be called **after** the component has updated.

Note the first run is executed before the component is mounted. So if you wish to access the DOM (or template refs) in a watched effect, do it in the mounted hook:

```js
onMounted(() => {
  watchEffect(() => {
    // access the DOM or template refs
  })
})
```

In cases where a watcher effect needs to be re-run synchronously or before component updates, we can pass an additional `options` object with the `flush` option (default is `'post'`):

```js
// fire synchronously
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'sync'
  }
)

// fire before component updates
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'pre'
  }
)
```

### Watcher Debugging

The `onTrack` and `onTrigger` options can be used to debug a watcher's behavior.

- `onTrack` will be called when a reactive property or ref is tracked as a dependency
- `onTrigger` will be called when the watcher callback is triggered by the mutation of a dependency

Both callbacks will receive a debugger event which contains information on the dependency in question. It is recommended to place a `debugger` statement in these callbacks to interactively inspect the dependency:

```js
watchEffect(
  () => {
    /* side effect */
  },
  {
    onTrigger(e) {
      debugger
    }
  }
)
```

`onTrack` and `onTrigger` only work in development mode.

### Typing

```ts
function watchEffect(
  effect: (onInvalidate: InvalidateCbRegistrator) => void,
  options?: WatchEffectOptions
): StopHandle

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

interface DebuggerEvent {
  effect: ReactiveEffect
  target: any
  type: OperationTypes
  key: string | symbol | undefined
}

type InvalidateCbRegistrator = (invalidate: () => void) => void

type StopHandle = () => void
```

## `watch`

The `watch` API is the exact equivalent of the Options API [`this.$watch`](./instance-methods.html#watch) (and the corresponding `watch` option). `watch` requires watching a specific data source and applies side effects in a separate callback function. It also is lazy by default - i.e. the callback is only called when the watched source has changed.

- Compared to `watchEffect`, `watch` allows us to:

  - Perform the side effect lazily;
  - Be more specific about what state should trigger the watcher to re-run;
  - Access both the previous and current value of the watched state.

### Watching a Single Source

A watcher data source can either be a getter function that returns a value, or directly a ref:

```js
// watching a getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// directly watching a ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

### Watching Multiple Sources

A watcher can also watch multiple sources at the same time using an array:

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

### Shared Behavior with `watchEffect`

`watch` shares behavior with `watchEffect` in terms of [manual stoppage](#stopping-the-watcher), [side effect invalidation](#side-effect-invalidation) (with `onInvalidate` passed to the callback as the 3rd argument instead), [flush timing](#effect-flush-timing) and [debugging](#watcher-debugging).

### Typing

```ts
// wacthing single source
function watch<T>(
  source: WatcherSource<T>,
  callback: (
    value: T,
    oldValue: T,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options?: WatchOptions
): StopHandle

// watching multiple sources
function watch<T extends WatcherSource<unknown>[]>(
  sources: T
  callback: (
    values: MapSources<T>,
    oldValues: MapSources<T>,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options? : WatchOptions
): StopHandle

type WatcherSource<T> = Ref<T> | (() => T)

type MapSources<T> = {
  [K in keyof T]: T[K] extends WatcherSource<infer V> ? V : never
}

// see `watchEffect` typing for shared options
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // default: false
  deep?: boolean
}
```
