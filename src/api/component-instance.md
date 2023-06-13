# Component Instance {#component-instance}

:::info
This page documents the built-in properties and methods exposed on the component public instance, i.e. `this`.

All properties listed on this page are readonly (except nested properties in `$data`).
:::

## $data {#data}

The object returned from the [`data`](./options-state#data) option, made reactive by the component. The component instance proxies access to the properties on its data object.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props {#props}

An object representing the component's current, resolved props.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **Details**

  Only props declared via the [`props`](./options-state#props) option will be included. The component instance proxies access to the properties on its props object.

## $el {#el}

The root DOM node that the component instance is managing.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $el: Node | undefined
  }
  ```

- **Details**

  `$el` will be `undefined` until the component is [mounted](./options-lifecycle#mounted).

  - For components with a single root element, `$el` will point to that element.
  - For components with text root, `$el` will point to the text node.
  - For components with multiple root nodes, `$el` will be the placeholder DOM node that Vue uses to keep track of the component's position in the DOM (a text node, or a comment node in SSR hydration mode).

  :::tip
  For consistency, it is recommended to use [template refs](/guide/essentials/template-refs) for direct access to elements instead of relying on `$el`.
  :::

## $options {#options}

The resolved component options used for instantiating the current component instance.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **Details**

  The `$options` object exposes the resolved options for the current component and is the merge result of these possible sources:

  - Global mixins
  - Component `extends` base
  - Component mixins

  It is typically used to support custom component options:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **See also** [`app.config.optionMergeStrategies`](/api/application#app-config-optionmergestrategies)

## $parent {#parent}

The parent instance, if the current instance has one. It will be `null` for the root instance itself.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root {#root}

The root component instance of the current component tree. If the current instance has no parents this value will be itself.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots {#slots}

An object representing the [slots](/guide/components/slots) passed by the parent component.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **Details**

  Typically used when manually authoring [render functions](/guide/extras/render-function), but can also be used to detect whether a slot is present.

  Each slot is exposed on `this.$slots` as a function that returns an array of vnodes under the key corresponding to that slot's name. The default slot is exposed as `this.$slots.default`.

  If a slot is a [scoped slot](/guide/components/slots#scoped-slots), arguments passed to the slot functions are available to the slot as its slot props.

- **See also** [Render Functions - Rendering Slots](/guide/extras/render-function#rendering-slots)

## $refs {#refs}

An object of DOM elements and component instances, registered via [template refs](/guide/essentials/template-refs).

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **See also**

  - [Template refs](/guide/essentials/template-refs)
  - [Special Attributes - ref](./built-in-special-attributes.md#ref)

## $attrs {#attrs}

An object that contains the component's fallthrough attributes.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **Details**

  [Fallthrough Attributes](/guide/components/attrs) are attributes and event handlers passed by the parent component, but not declared as a prop or an emitted event by the child.

  By default, everything in `$attrs` will be automatically inherited on the component's root element if there is only a single root element. This behavior is disabled if the component has multiple root nodes, and can be explicitly disabled with the [`inheritAttrs`](./options-misc#inheritattrs) option.

- **See also**

  - [Fallthrough Attributes](/guide/components/attrs)

## $watch() {#watch}

Imperative API for creating watchers.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Details**

  The first argument is the watch source. It can be a component property name string, a simple dot-delimited path string, or a getter function.

  The second argument is the callback function. The callback receives the new value and the old value of the watched source.

  - **`immediate`**: trigger the callback immediately on watcher creation. Old value will be `undefined` on the first call.
  - **`deep`**: force deep traversal of the source if it is an object, so that the callback fires on deep mutations. See [Deep Watchers](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: adjust the callback's flush timing. See [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) and [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: debug the watcher's dependencies. See [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging).

- **Example**

  Watch a property name:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  Watch a dot-delimited path:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  Using getter for more complex expressions:

  ```js
  this.$watch(
    // every time the expression `this.a + this.b` yields
    // a different result, the handler will be called.
    // It's as if we were watching a computed property
    // without defining the computed property itself.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  Stopping the watcher:

  ```js
  const unwatch = this.$watch('a', cb)

  // later...
  unwatch()
  ```

- **See also**
  - [Options - `watch`](/api/options-state#watch)
  - [Guide - Watchers](/guide/essentials/watchers)

## $emit() {#emit}

Trigger a custom event on the current instance. Any additional arguments will be passed into the listener's callback function.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **Example**

  ```js
  export default {
    created() {
      // only event
      this.$emit('foo')
      // with additional arguments
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **See also**

  - [Component - Events](/guide/components/events)
  - [`emits` option](./options-state#emits)

## $forceUpdate() {#forceupdate}

Force the component instance to re-render.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **Details**

  This should be rarely needed given Vue's fully automatic reactivity system. The only cases where you may need it is when you have explicitly created non-reactive component state using advanced reactivity APIs.

## $nextTick() {#nexttick}

Instance-bound version of the global [`nextTick()`](./general#nexttick).

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **Details**

  The only difference from the global version of `nextTick()` is that the callback passed to `this.$nextTick()` will have its `this` context bound to the current component instance.

- **See also** [`nextTick()`](./general#nexttick)
