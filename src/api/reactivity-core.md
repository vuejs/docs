# Reactivity API: Core

:::tip
To better understand the Reactivity APIs, it is recommended to read the following chapters in the guide:

- [Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals.html) with the API preference set to Composition API
- [Reactivity in Depth](/guide/extras/reactivity-in-depth.html)
  :::

## ref()

Takes an inner value and returns a reactive and mutable ref object. The ref object has a single property `.value` that points to the inner value.

If an object is assigned as a ref's value, the object is made deeply reactive with [reactive()](#reactive). To avoid the deep conversion, use [`shallowRef()`](./reactivity-advanced.html#shallowref) instead.

- **Type**

  ```ts
  function ref<T>(value: T): Ref<T>

  interface Ref<T> {
    value: T
  }
  ```

- **Example**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value++
  console.log(count.value) // 1
  ```

- **See also:**
  - [Guide - Reactive Variables with `ref()`](/guide/essentials/reactivity-fundamentals.html#reactive-variables-with-ref)
  - [Guide - Typing `ref()`](/guide/typescript/composition-api.html#typing-ref)

## computed()

Takes a getter function and returns a readonly reactive [ref](#ref) object for the returned value from the getter. It can also take an object with `get` and `set` functions to create a writable ref object.

- **Type**

  ```ts
  // read-only
  function computed<T>(
    getter: () => T,
    // see "Computed Debugging" link below
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // writable
  function computed<T>(
    options: {
      get: () => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **Example**

  Creating a readonly computed ref:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // error
  ```

  Creating a writable computed ref:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  Debugging:

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **See also:**
  - [Guide - Computed Properties](/guide/essentials/computed.html)
  - [Guide - Computed Debugging](/guide/extras/reactivity-in-depth.html#computed-debugging)
  - [Guide - Typing `computed()`](/guide/typescript/composition-api.html#typing-computed)

## reactive()

Returns a reactive proxy of the object.

The reactive conversion is "deep": it affects all nested properties. It also deeply unwraps any properties that are [refs](#ref) while maintaining reactivity.

To avoid the deep conversion and only retain reactivity at the root level, use [shallowReactive()](./reactivity-advanced.html#shallowreactive) instead.

The returned object and its nested objects are wrapped with [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and **not** equal to the original objects. It is recommended to work exclusively with the reactive proxy and avoid relying on the original object.

- **Type**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **Example**

  Creating a reactive object:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  Ref unwrapping:

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // ref will be unwrapped
  console.log(obj.count === count.value) // true

  // it will update `obj.count`
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // it will also update `count` ref
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  When assigning a [ref](#ref) to a `reactive` property, that ref will also be automatically unwrapped:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **See also:**
  - [Guide - Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals.html)
  - [Guide - Typing `reactive()`](/guide/typescript/composition-api.html#typing-reactive)

## readonly()

Takes an object (reactive or plain) or a [ref](#ref) and returns a readonly proxy to the original.

A readonly proxy is deep: any nested property accessed will be readonly as well. It also has the same ref-unwrapping behavior as `reactive()`, except the unwrapped values will also be made readonly. To avoid the deep conversion, use [shallowReadonly()](./reactivity-advanced.html#shallowreadonly) instead.

- **Type**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **Example**

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

## watchEffect()

Runs a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies are changed.

The first argument is the effect function to be run. The effect function receives a function that can be used to register a cleanup callback. The cleanup callback will be called right before the next time the effect is re-run, and can be used to clean up invalidated side effects, e.g. a pending async request.

The second argument is an optional options object that can be used to adjust the effect's flush timing or to debug the effect's dependencies.

The return value is a handle function that can be called to stop the effect from running again.

- **Type**

  ```ts
  function watchEffect(
    effect: (onCleanup: InvalidateCbRegistrator) => void,
    options?: WatchEffectOptions
  ): StopHandle

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type InvalidateCbRegistrator = (invalidate: () => void) => void

  type StopHandle = () => void
  ```

- **Example**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> logs 0

  count.value++
  // -> logs 1
  ```

  Side effect cleanup:

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value)
    // `cancel` will be called if `id` changes
    // so that previous pending request will be cancelled
    // if not yet completed
    onCleanup(cancel)
    data.value = await response
  })
  ```

  Stopping the watcher:

  ```js
  const stop = watchEffect(() => {})

  // when the watcher is no longer needed:
  stop()
  ```

  Options:

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **See also**:
  - [Guide - Watchers](/guide/essentials/watchers.html#watcheffect)
  - [Guide - Watcher Debugging](/guide/extras/reactivity-in-depth.html#watcher-debugging)

## watchPostEffect()

Alias of [`watchEffect()`](#watcheffect) with `flush: 'post'` option.

## watchSyncEffect()

Alias of [`watchEffect()`](#watcheffect) with `flush: 'sync'` option.

## watch()

`watch()` tracks changes of a reactive data source and invokes a callback function when the source changes. It is lazy by default - i.e. the callback is only called when the watched source has changed.

Compared to [watchEffect](#watcheffect), `watch` allows us to:

- Perform the side effect lazily;
- Be more specific about what state should trigger the watcher to re-run;
- Access both the previous and current value of the watched state.

The first argument is the watcher's **source**. The source can be one of the following:

- A getter function that returns a value
- A ref
- A reactive object
- ...or an array of the above.

The second argument is the callback that will be called when the source changes. The callback receives three arguments: the new value, the old value, and a function for registering a side effect cleanup callback. The cleanup callback will be called right before the next time the effect is re-run, and can be used to clean up invalidated side effects, e.g. a pending async request.

- **Type**

  ```ts
  // watching single source
  function watch<T>(
    source: WatcherSource<T>,
    callback: (
      value: T,
      oldValue: T,
      onCleanup: InvalidateCbRegistrator
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

- **Example**

  Watching a getter:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  Watching a ref:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  When watching multiple sources, the callback receives arrays containing new / old values corresponding to the source array:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  Deep mode will track every nested property in the source object. Note in this mode, the new value and the old will be the same object if the callback was triggered by a deep mutation:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  When watching a reactive object, the watcher is implicitly in deep mode:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* triggers on deep mutation to state */
  })
  ```

  `watch()` shares the same flush timing and debugging options with [`watchEffect()`](#watcheffect):

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    }
  })
  ```

- **See also**:

  - [Guide - Watchers](/guide/essentials/watchers.html)
  - [Guide - Watcher Debugging](/guide/extras/reactivity-in-depth.html#watcher-debugging)
