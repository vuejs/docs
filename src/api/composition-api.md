# Composition API

> This section uses [single-file component](../guide/single-file-component.html) syntax for code examples

## `setup`

A component option that is executed **before** the component is created, once the `props` are resolved. It serves as the entry point for composition APIs.

- **Arguments:**

  - `{Data} props`
  - `{SetupContext} context`

  Similar to `this.$props` when using Options API, the `props` object will only contain explicitly declared props. Also, all declared prop keys will be present on the `props` object, regardless of whether it was passed by the parent component or not. Absent optional props will have a value of `undefined`.

  If you need to check the absence of an optional prop, you can give it a Symbol as its default value:

  ```js
  const isAbsent = Symbol()

  export default {
    props: {
      foo: { default: isAbsent }
    },
    setup(props) {
      if (props.foo === isAbsent) {
        // foo was not provided.
      }
    }
  }
  ```

- **Typing**:

  ```ts
  interface Data {
    [key: string]: unknown
  }

  interface SetupContext {
    attrs: Data
    slots: Slots
    emit: (event: string, ...args: unknown[]) => void
    expose: (exposed?: Record<string, any>) => void
  }

  function setup(props: Data, context: SetupContext): Data
  ```

  ::: tip
  To get type inference for the arguments passed to `setup()`, the use of [defineComponent](global-api.html#definecomponent) is needed.
  :::

- **Example**

  With the template:

  ```vue-html
  <!-- MyBook.vue -->
  <template>
    <div>{{ readersNumber }} {{ book.title }}</div>
  </template>

  <script>
    import { ref, reactive } from 'vue'

    export default {
      setup() {
        const readersNumber = ref(0)
        const book = reactive({ title: 'Vue 3 Guide' })

        // expose to template
        return {
          readersNumber,
          book
        }
      }
    }
  </script>
  ```

  With render function:

  ```js
  // MyBook.vue

  import { h, ref, reactive } from 'vue'

  export default {
    setup() {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })
      // Please note that we need to explicitly use ref value here
      return () => h('div', [readersNumber.value, book.title])
    }
  }
  ```

  If you return a render function then you can't return any other properties. If you need to expose properties so that they can be accessed externally, e.g. via a `ref` in the parent, you can use `expose`:

  ```js
  // MyBook.vue

  import { h } from 'vue'

  export default {
    setup(props, { expose }) {
      const reset = () => {
        // Some reset logic
      }

      // If you need to expose multiple properties they must all
      // be included in the object passed to expose. expose can
      // only be called once.
      expose({
        reset
      })

      return () => h('div')
    }
  }
  ```

- **See also**: [Composition API `setup`](../guide/composition-api-setup.html)

## Lifecycle Hooks

Lifecycle hooks can be registered with directly-imported `onX` functions:

```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  }
}
```

These lifecycle hook registration functions can only be used synchronously during [`setup()`](#setup), since they rely on internal global state to locate the current active instance (the component instance whose `setup()` is being called right now). Calling them without a current active instance will result in an error.

The component instance context is also set during the synchronous execution of lifecycle hooks. As a result, watchers and computed properties created synchronously inside of lifecycle hooks are also automatically tore down when the component unmounts.

- **Mapping between Options API Lifecycle Options and Composition API**

  - ~~`beforeCreate`~~ -> use `setup()`
  - ~~`created`~~ -> use `setup()`
  - `beforeMount` -> `onBeforeMount`
  - `mounted` -> `onMounted`
  - `beforeUpdate` -> `onBeforeUpdate`
  - `updated` -> `onUpdated`
  - `beforeUnmount` -> `onBeforeUnmount`
  - `unmounted` -> `onUnmounted`
  - `errorCaptured` -> `onErrorCaptured`
  - `renderTracked` -> `onRenderTracked`
  - `renderTriggered` -> `onRenderTriggered`
  - `activated` -> `onActivated`
  - `deactivated` -> `onDeactivated`


- **See also**: [Composition API lifecycle hooks](../guide/composition-api-lifecycle-hooks.html)

## Provide / Inject

`provide` and `inject` enables dependency injection. Both can only be called during [`setup()`](#setup) with a current active instance.

- **Typing**:

  ```ts
  interface InjectionKey<T> extends Symbol {}

  function provide<T>(key: InjectionKey<T> | string, value: T): void

  // without default value
  function inject<T>(key: InjectionKey<T> | string): T | undefined
  // with default value
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T
  // with factory
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

  Vue provides an `InjectionKey` interface which is a generic type that extends `Symbol`. It can be used to sync the type of the injected value between the provider and the consumer:

  ```ts
  import { InjectionKey, provide, inject } from 'vue'

  const key: InjectionKey<string> = Symbol()

  provide(key, 'foo') // providing non-string value will result in error

  const foo = inject(key) // type of foo: string | undefined
  ```

  If using string keys or non-typed symbols, the type of the injected value will need to be explicitly declared:

  ```ts
  const foo = inject<string>('foo') // string | undefined
  ```

- **See also**:
  - [Provide / Inject](../guide/component-provide-inject.html)
  - [Composition API Provide / Inject](../guide/composition-api-provide-inject.html)

## `getCurrentInstance`

`getCurrentInstance` enables access to an internal component instance.

:::warning
`getCurrentInstance` is only exposed for advanced use cases, typically in libraries. Usage of `getCurrentInstance` is strongly discouraged in application code. Do **NOT** use it as an escape hatch to get the equivalent of `this` in Composition API.
:::

```ts
import { getCurrentInstance } from 'vue'

const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance()

    internalInstance.appContext.config.globalProperties // access to globalProperties
  }
}
```

`getCurrentInstance` **only** works during [setup](#setup) or [Lifecycle Hooks](#lifecycle-hooks)

> When using outside of [setup](#setup) or [Lifecycle Hooks](#lifecycle-hooks), please call `getCurrentInstance()` on `setup` and use the instance instead.

```ts
const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance() // works

    const id = useComponentId() // works

    const handleClick = () => {
      getCurrentInstance() // doesn't work
      useComponentId() // doesn't work

      internalInstance // works
    }

    onMounted(() => {
      getCurrentInstance() // works
    })

    return () =>
      h(
        'button',
        {
          onClick: handleClick
        },
        `uid: ${id}`
      )
  }
}

// also works if called on a composable
function useComponentId() {
  return getCurrentInstance().uid
}
```
