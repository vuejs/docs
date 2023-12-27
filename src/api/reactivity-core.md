# Reactivity API: Core {#reactivity-api-core}

:::info See also
To better understand the Reactivity APIs, it is recommended to read the following chapters in the guide:

- [Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals) (with the API preference set to Composition API)
- [Reactivity in Depth](/guide/extras/reactivity-in-depth)
  :::

## ref() {#ref}

Takes an inner value and returns a reactive and mutable ref object, which has a single property `.value` that points to the inner value.

- **Type**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **Details**

  The ref object is mutable - i.e. you can assign new values to `.value`. It is also reactive - i.e. any read operations to `.value` are tracked, and write operations will trigger associated effects.

  If an object is assigned as a ref's value, the object is made deeply reactive with [reactive()](#reactive). This also means if the object contains nested refs, they will be deeply unwrapped.

  To avoid the deep conversion, use [`shallowRef()`](./reactivity-advanced#shallowref) instead.

- **Example**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value = 1
  console.log(count.value) // 1
  ```

- **See also**
  - [Guide - Reactivity Fundamentals with `ref()`](/guide/essentials/reactivity-fundamentals#ref)
  - [Guide - Typing `ref()`](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

## computed() {#computed}

Takes a getter function and returns a readonly reactive [ref](#ref) object for the returned value from the getter. It can also take an object with `get` and `set` functions to create a writable ref object.

- **Type**

  ```ts
  // read-only
  function computed<T>(
    getter: (oldValue: T | undefined) => T,
    // see "Computed Debugging" link below
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // writable
  function computed<T>(
    options: {
      get: (oldValue: T | undefined) => T
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

- **See also**
  - [Guide - Computed Properties](/guide/essentials/computed)
  - [Guide - Computed Debugging](/guide/extras/reactivity-in-depth#computed-debugging)
  - [Guide - Typing `computed()`](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />
  - [Guide - Performance - Computed Stability](/guide/best-practices/performance#computed-stability) <sup class="vt-badge" data-text="3.4+" />

## reactive() {#reactive}

Returns a reactive proxy of the object.

- **Type**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **Details**

  The reactive conversion is "deep": it affects all nested properties. A reactive object also deeply unwraps any properties that are [refs](#ref) while maintaining reactivity.

  It should also be noted that there is no ref unwrapping performed when the ref is accessed as an element of a reactive array or a native collection type like `Map`.

  To avoid the deep conversion and only retain reactivity at the root level, use [shallowReactive()](./reactivity-advanced#shallowreactive) instead.

  The returned object and its nested objects are wrapped with [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and **not** equal to the original objects. It is recommended to work exclusively with the reactive proxy and avoid relying on the original object.

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

  Note that refs are **not** unwrapped when accessed as array or collection elements:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // need .value here
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // need .value here
  console.log(map.get('count').value)
  ```

  When assigning a [ref](#ref) to a `reactive` property, that ref will also be automatically unwrapped:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **See also**
  - [Guide - Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals)
  - [Guide - Typing `reactive()`](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

## readonly() {#readonly}

Takes an object (reactive or plain) or a [ref](#ref) and returns a readonly proxy to the original.

- **Type**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **Details**

  A readonly proxy is deep: any nested property accessed will be readonly as well. It also has the same ref-unwrapping behavior as `reactive()`, except the unwrapped values will also be made readonly.

  To avoid the deep conversion, use [shallowReadonly()](./reactivity-advanced#shallowreadonly) instead.

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

## watchEffect() {#watcheffect}

Runs a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies are changed.

- **Type**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): StopHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Details**

  The first argument is the effect function to be run. The effect function receives a function that can be used to register a cleanup callback. The cleanup callback will be called right before the next time the effect is re-run, and can be used to clean up invalidated side effects, e.g. a pending async request (see example below).

  The second argument is an optional options object that can be used to adjust the effect's flush timing or to debug the effect's dependencies.

  By default, watchers will run just prior to component rendering. Setting `flush: 'post'` will defer the watcher until after component rendering. See [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) for more information. In rare cases, it might be necessary to trigger a watcher immediately when a reactive dependency changes, e.g. to invalidate a cache. This can be achieved using `flush: 'sync'`. However, this setting should be used with caution, as it can lead to problems with performance and data consistency if multiple properties are being updated at the same time.

  The return value is a handle function that can be called to stop the effect from running again.

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

- **See also**
  - [Guide - Watchers](/guide/essentials/watchers#watcheffect)
  - [Guide - Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging)

## watchPostEffect() {#watchposteffect}

Alias of [`watchEffect()`](#watcheffect) with `flush: 'post'` option.

## watchSyncEffect() {#watchsynceffect}

Alias of [`watchEffect()`](#watcheffect) with `flush: 'sync'` option.

## watch() {#watch}

Watches one or more reactive data sources and invokes a callback function when the sources change.

- **Type**

  ```ts
  // watching single source
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): StopHandle

  // watching multiple sources
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): StopHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // ref
    | (() => T) // getter
    | T extends object
    ? T
    : never // reactive object

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
    once?: boolean // default: false (3.4+)
  }
  ```

  > Types are simplified for readability.

- **Details**

  `watch()` is lazy by default - i.e. the callback is only called when the watched source has changed.

  The first argument is the watcher's **source**. The source can be one of the following:

  - A getter function that returns a value
  - A ref
  - A reactive object
  - ...or an array of the above.

  The second argument is the callback that will be called when the source changes. The callback receives three arguments: the new value, the old value, and a function for registering a side effect cleanup callback. The cleanup callback will be called right before the next time the effect is re-run, and can be used to clean up invalidated side effects, e.g. a pending async request.

  When watching multiple sources, the callback receives two arrays containing new / old values corresponding to the source array.

  The third optional argument is an options object that supports the following options:

  - **`immediate`**: trigger the callback immediately on watcher creation. Old value will be `undefined` on the first call.
  - **`deep`**: force deep traversal of the source if it is an object, so that the callback fires on deep mutations. See [Deep Watchers](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: adjust the callback's flush timing. See [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) and [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: debug the watcher's dependencies. See [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging).
  - **`once`**: run the callback only once. The watcher is automatically stopped after the first callback run. <sup class="vt-badge" data-text="3.4+" />

  Compared to [`watchEffect()`](#watcheffect), `watch()` allows us to:

  - Perform the side effect lazily;
  - Be more specific about what state should trigger the watcher to re-run;
  - Access both the previous and current value of the watched state.

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

  When using a getter source, the watcher only fires if the getter's return value has changed. If you want the callback to fire even on deep mutations, you need to explicitly force the watcher into deep mode with `{ deep: true }`. Note in deep mode, the new value and the old will be the same object if the callback was triggered by a deep mutation:

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

  When directly watching a reactive object, the watcher is automatically in deep mode:

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
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

  Stopping the watcher:

  ```js
  const stop = watch(source, callback)

  // when the watcher is no longer needed:
  stop()
  ```

  Side effect cleanup:

  ```js
  watch(id, async (newId, oldId, onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel` will be called if `id` changes, cancelling
    // the previous request if it hasn't completed yet
    onCleanup(cancel)
    data.value = await response
  })
  ```

- **See also**

  - [Guide - Watchers](/guide/essentials/watchers)
  - [Guide - Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging)
