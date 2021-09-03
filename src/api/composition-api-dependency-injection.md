# Composition API:<br>Dependency Injection

## provide()

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

## inject()