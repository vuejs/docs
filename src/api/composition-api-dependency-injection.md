# Composition API: <br>Dependency Injection {#composition-api-dependency-injection}

## provide() {#provide}

Provides a value that can be injected by descendant components.

- **Type**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **Details**

  `provide()` takes two arguments: the key, which can be a string or a symbol, and the value to be injected.

  When using TypeScript, the key can be a symbol casted as `InjectionKey` - a Vue provided utility type that extends `Symbol`, which can be used to sync the value type between `provide()` and `inject()`.

  Similar to lifecycle hook registration APIs, `provide()` must be called synchronously during a component's `setup()` phase.

- **Example**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // provide static value
  provide('path', '/project/')

  // provide reactive value
  const count = ref(0)
  provide('count', count)

  // provide with Symbol keys
  provide(countSymbol, count)
  </script>
  ```

- **See also**
  - [Guide - Provide / Inject](/guide/components/provide-inject)
  - [Guide - Typing Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## inject() {#inject}

Injects a value provided by an ancestor component or the application (via `app.provide()`).

- **Type**

  ```ts
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

- **Details**

  The first argument is the injection key. Vue will walk up the parent chain to locate a provided value with a matching key. If multiple components in the parent chain provides the same key, the one closest to the injecting component will "shadow" those higher up the chain. If no value with matching key was found, `inject()` returns `undefined` unless a default value is provided.

  The second argument is optional and is the default value to be used when no matching value was found.

  The second argument can also be a factory function that returns values that are expensive to create. In this case, `true` must be passed as the third argument to indicate that the function should be used as a factory instead of the value itself.

  Similar to lifecycle hook registration APIs, `inject()` must be called synchronously during a component's `setup()` phase.

  When using TypeScript, the key can be of type of `InjectionKey` - a Vue-provided utility type that extends `Symbol`, which can be used to sync the value type between `provide()` and `inject()`.

- **Example**

  Assuming a parent component has provided values as shown in the previous `provide()` example:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // inject static value without default
  const path = inject('path')

  // inject reactive value
  const count = inject('count')

  // inject with Symbol keys
  const count2 = inject(countSymbol)

  // inject with default value
  const bar = inject('path', '/default-path')

  // inject with function default value
  const fn = inject('function', () => {})

  // inject with default value factory
  const baz = inject('factory', () => new ExpensiveObject(), true)
  </script>
  ```

## hasInjectionContext() <sup class="vt-badge" data-text="3.3+" /> {#has-injection-context}

Returns true if [inject()](#inject) can be used without warning about being called in the wrong place (e.g. outside of `setup()`). This method is designed to be used by libraries that want to use `inject()` internally without triggering a warning to the end user.

- **Type**

  ```ts
  function hasInjectionContext(): boolean
  ```

* **See also**
  - [Guide - Provide / Inject](/guide/components/provide-inject)
  - [Guide - Typing Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />
