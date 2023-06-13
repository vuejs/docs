# Global API: General {#global-api-general}

## version {#version}

Exposes the current version of Vue.

- **Type:** `string`

- **Example**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

A utility for waiting for the next DOM update flush.

- **Type**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **Details**

  When you mutate reactive state in Vue, the resulting DOM updates are not applied synchronously. Instead, Vue buffers them until the "next tick" to ensure that each component updates only once no matter how many state changes you have made.

  `nextTick()` can be used immediately after a state change to wait for the DOM updates to complete. You can either pass a callback as an argument, or await the returned Promise.

- **Example**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // DOM not yet updated
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // DOM is now updated
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // DOM not yet updated
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // DOM is now updated
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **See also** [`this.$nextTick()`](/api/component-instance#nexttick)

## defineComponent() {#definecomponent}

A type helper for defining a Vue component with type inference.

- **Type**

  ```ts
  // options syntax
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // function syntax (requires 3.3+)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > Type is simplified for readability.

- **Details**

  The first argument expects a component options object. The return value will be the same options object, since the function is essentially a runtime no-op for type inference purposes only.

  Note that the return type is a bit special: it will be a constructor type whose instance type is the inferred component instance type based on the options. This is used for type inference when the returned type is used as a tag in TSX.

  You can extract the instance type of a component (equivalent to the type of `this` in its options) from the return type of `defineComponent()` like this:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### Function Signature <sup class="vt-badge" data-text="3.3+" /> {#function-signature}

  `defineComponent()` also has an alternative signature that is meant to be used with Composition API and [render functions or JSX](/guide/extras/render-function.html).

  Instead of passing in an options object, a function is expected instead. This function works the same as the Composition API [`setup()`](/api/composition-api-setup.html#composition-api-setup) function: it receives the props and the setup context. The return value should be a render function - both `h()` and JSX are supported:

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // use Composition API here like in <script setup>
      const count = ref(0)

      return () => {
        // render function or JSX
        return h('div', count.value)
      }
    },
    // extra options, e.g. declare props and emits
    {
      props: {
        /* ... */
      }
    }
  )
  ```

  The main use case for this signature is with TypeScript (and in particular with TSX), as it supports generics:

  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // use Composition API here like in <script setup>
      const count = ref(0)

      return () => {
        // render function or JSX
        return <div>{count.value}</div>
      }
    },
    // manual runtime props declaration is currently still needed.
    {
      props: ['msg', 'list']
    }
  )
  ```

  In the future, we plan to provide a Babel plugin that automatically infers and injects the runtime props (like for `defineProps` in SFCs) so that the runtime props declaration can be omitted.

  ### Note on webpack Treeshaking {#note-on-webpack-treeshaking}

  Because `defineComponent()` is a function call, it could look like that it would produce side-effects to some build tools, e.g. webpack. This will prevent the component from being tree-shaken even when the component is never used.

  To tell webpack that this function call is safe to be tree-shaken, you can add a `/*#__PURE__*/` comment notation before the function call:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  Note this is not necessary if you are using Vite, because Rollup (the underlying production bundler used by Vite) is smart enough to determine that `defineComponent()` is in fact side-effect-free without the need for manual annotations.

- **See also** [Guide - Using Vue with TypeScript](/guide/typescript/overview#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

Define an async component which is lazy loaded only when it is rendered. The argument can either be a loader function, or an options object for more advanced control of the loading behavior.

- **Type**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **See also** [Guide - Async Components](/guide/components/async)

## defineCustomElement() {#definecustomelement}

This method accepts the same argument as [`defineComponent`](#definecomponent), but instead returns a native [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) class constructor.

- **Type**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & { styles?: string[] })
      | ComponentOptions['setup']
  ): {
    new (props?: object): HTMLElement
  }
  ```

  > Type is simplified for readability.

- **Details**

  In addition to normal component options, `defineCustomElement()` also supports a special option `styles`, which should be an array of inlined CSS strings, for providing CSS that should be injected into the element's shadow root.

  The return value is a custom element constructor that can be registered using [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define).

- **Example**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* component options */
  })

  // Register the custom element.
  customElements.define('my-vue-element', MyVueElement)
  ```

- **See also**

  - [Guide - Building Custom Elements with Vue](/guide/extras/web-components#building-custom-elements-with-vue)

  - Also note that `defineCustomElement()` requires [special config](/guide/extras/web-components#sfc-as-custom-element) when used with Single-File Components.
