# Options: Lifecycle {#options-lifecycle}

:::info See also
For shared usage of lifecycle hooks, see [Guide - Lifecycle Hooks](/guide/essentials/lifecycle)
:::

## beforeCreate {#beforecreate}

Called when the instance is initialized.

- **Type**

  ```ts
  interface ComponentOptions {
    beforeCreate?(this: ComponentPublicInstance): void
  }
  ```

- **Details**

  Called immediately when the instance is initialized, after props resolution, before processing other options such as `data()` or `computed`.

  Note that the `setup()` hook of Composition API is called before any Options API hooks, even `beforeCreate()`.

## created {#created}

Called after the instance has finished processing all state-related options.

- **Type**

  ```ts
  interface ComponentOptions {
    created?(this: ComponentPublicInstance): void
  }
  ```

- **Details**

  When this hook is called, the following have been set up: reactive data, computed properties, methods, and watchers. However, the mounting phase has not been started, and the `$el` property will not be available yet.

## beforeMount {#beforemount}

Called right before the component is to be mounted.

- **Type**

  ```ts
  interface ComponentOptions {
    beforeMount?(this: ComponentPublicInstance): void
  }
  ```

- **Details**

  When this hook is called, the component has finished setting up its reactive state, but no DOM nodes have been created yet. It is about to execute its DOM render effect for the first time.

  **This hook is not called during server-side rendering.**

## mounted {#mounted}

Called after the component has been mounted.

- **Type**

  ```ts
  interface ComponentOptions {
    mounted?(this: ComponentPublicInstance): void
  }
  ```

- **Details**

  A component is considered mounted after:

  - All of its synchronous child components have been mounted (does not include async components or components inside `<Suspense>` trees).

  - Its own DOM tree has been created and inserted into the parent container. Note it only guarantees that the component's DOM tree is in-document if the application's root container is also in-document.

  This hook is typically used for performing side effects that need access to the component's rendered DOM, or for limiting DOM-related code to the client in a [server-rendered application](/guide/scaling-up/ssr).

  **This hook is not called during server-side rendering.**

## beforeUpdate {#beforeupdate}

Called right before the component is about to update its DOM tree due to a reactive state change.

- **Type**

  ```ts
  interface ComponentOptions {
    beforeUpdate?(this: ComponentPublicInstance): void
  }
  ```

- **Details**

  This hook can be used to access the DOM state before Vue updates the DOM. It is also safe to modify component state inside this hook.

  **This hook is not called during server-side rendering.**

## updated {#updated}

Called after the component has updated its DOM tree due to a reactive state change.

- **Type**

  ```ts
  interface ComponentOptions {
    updated?(this: ComponentPublicInstance): void
  }
  ```

- **Details**

  A parent component's updated hook is called after that of its child components.

  This hook is called after any DOM update of the component, which can be caused by different state changes. If you need to access the updated DOM after a specific state change, use [nextTick()](/api/general#nexttick) instead.

  **This hook is not called during server-side rendering.**

  :::warning
  Do not mutate component state in the updated hook - this will likely lead to an infinite update loop!
  :::

## beforeUnmount {#beforeunmount}

Called right before a component instance is to be unmounted.

- **Type**

  ```ts
  interface ComponentOptions {
    beforeUnmount?(this: ComponentPublicInstance): void
  }
  ```

- **Details**

  When this hook is called, the component instance is still fully functional.

  **This hook is not called during server-side rendering.**

## unmounted {#unmounted}

Called after the component has been unmounted.

- **Type**

  ```ts
  interface ComponentOptions {
    unmounted?(this: ComponentPublicInstance): void
  }
  ```

- **Details**

  A component is considered unmounted after:

  - All of its child components have been unmounted.

  - All of its associated reactive effects (render effect and computed / watchers created during `setup()`) have been stopped.

  Use this hook to clean up manually created side effects such as timers, DOM event listeners or server connections.

  **This hook is not called during server-side rendering.**

## errorCaptured {#errorcaptured}

Called when an error propagating from a descendant component has been captured.

- **Type**

  ```ts
  interface ComponentOptions {
    errorCaptured?(
      this: ComponentPublicInstance,
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ): boolean | void
  }
  ```

- **Details**

  Errors can be captured from the following sources:

  - Component renders
  - Event handlers
  - Lifecycle hooks
  - `setup()` function
  - Watchers
  - Custom directive hooks
  - Transition hooks

  The hook receives three arguments: the error, the component instance that triggered the error, and an information string specifying the error source type.

  :::tip
  In production, the 3rd argument (`info`) will be a shortened code instead of the full information string. You can find the code to string mapping in the [Production Error Code Reference](/error-reference/#runtime-errors).
  :::

  You can modify component state in `errorCaptured()` to display an error state to the user. However, it is important that the error state should not render the original content that caused the error; otherwise the component will be thrown into an infinite render loop.

  The hook can return `false` to stop the error from propagating further. See error propagation details below.

  **Error Propagation Rules**

  - By default, all errors are still sent to the application-level [`app.config.errorHandler`](/api/application#app-config-errorhandler) if it is defined, so that these errors can still be reported to an analytics service in a single place.

  - If multiple `errorCaptured` hooks exist on a component's inheritance chain or parent chain, all of them will be invoked on the same error, in the order of bottom to top. This is similar to the bubbling mechanism of native DOM events.

  - If the `errorCaptured` hook itself throws an error, both this error and the original captured error are sent to `app.config.errorHandler`.

  - An `errorCaptured` hook can return `false` to prevent the error from propagating further. This is essentially saying "this error has been handled and should be ignored." It will prevent any additional `errorCaptured` hooks or `app.config.errorHandler` from being invoked for this error.

## renderTracked <sup class="vt-badge dev-only" /> {#rendertracked}

Called when a reactive dependency has been tracked by the component's render effect.

**This hook is development-mode-only and not called during server-side rendering.**

- **Type**

  ```ts
  interface ComponentOptions {
    renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **See also** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## renderTriggered <sup class="vt-badge dev-only" /> {#rendertriggered}

Called when a reactive dependency triggers the component's render effect to be re-run.

**This hook is development-mode-only and not called during server-side rendering.**

- **Type**

  ```ts
  interface ComponentOptions {
    renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **See also** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## activated {#activated}

Called after the component instance is inserted into the DOM as part of a tree cached by [`<KeepAlive>`](/api/built-in-components#keepalive).

**This hook is not called during server-side rendering.**

- **Type**

  ```ts
  interface ComponentOptions {
    activated?(this: ComponentPublicInstance): void
  }
  ```

- **See also** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## deactivated {#deactivated}

Called after the component instance is removed from the DOM as part of a tree cached by [`<KeepAlive>`](/api/built-in-components#keepalive).

**This hook is not called during server-side rendering.**

- **Type**

  ```ts
  interface ComponentOptions {
    deactivated?(this: ComponentPublicInstance): void
  }
  ```

- **See also** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## serverPrefetch <sup class="vt-badge" data-text="SSR only" /> {#serverprefetch}

Async function to be resolved before the component instance is to be rendered on the server.

- **Type**

  ```ts
  interface ComponentOptions {
    serverPrefetch?(this: ComponentPublicInstance): Promise<any>
  }
  ```

- **Details**

  If the hook returns a Promise, the server renderer will wait until the Promise is resolved before rendering the component.

  This hook is only called during server-side rendering can be used to perform server-only data fetching.

- **Example**

  ```js
  export default {
    data() {
      return {
        data: null
      }
    },
    async serverPrefetch() {
      // component is rendered as part of the initial request
      // pre-fetch data on server as it is faster than on the client
      this.data = await fetchOnServer(/* ... */)
    },
    async mounted() {
      if (!this.data) {
        // if data is null on mount, it means the component
        // is dynamically rendered on the client. Perform a
        // client-side fetch instead.
        this.data = await fetchOnClient(/* ... */)
      }
    }
  }
  ```

- **See also** [Server-Side Rendering](/guide/scaling-up/ssr)
