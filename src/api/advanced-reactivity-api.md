# Advanced Reactivity APIs

## `customRef`

Creates a customized ref with explicit control over its dependency tracking and updates triggering. It expects a factory function, which receives `track` and `trigger` functions as arguments and should return an object with `get` and `set`.

- Example using a custom ref to implement debounce with `v-model`:

  ```html
  <input v-model="text" />
  ```

  ```js
  function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }

  export default {
    setup() {
      return {
        text: useDebouncedRef('hello')
      }
    }
  }
  ```

- **Typing**

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  type CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

## `markRaw`

Marks an object so that it will never be converted to a proxy. Returns the object itself.

```js
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// also works when nested inside other reactive objects
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

::: warning
`markRaw` and the shallowXXX APIs below allow you to selectively opt-out of the default deep reactive/readonly conversion and embed raw, non-proxied objects in your state graph. They can be used for various reasons:

- Some values simply should not be made reactive, for example a complex 3rd party class instance, or a Vue component object.

- Skipping proxy conversion can provide performance improvements when rendering large lists with immutable data sources.

They are considered advanced because the raw opt-out is only at the root level, so if you set a nested, non-marked raw object into a reactive object and then access it again, you get the proxied version back. This can lead to **identity hazards** - i.e. performing an operation that relies on object identity but using both the raw and the proxied version of the same object:

```js
const foo = markRaw({
  nested: {}
})

const bar = reactive({
  // although `foo` is marked as raw, foo.nested is not.
  nested: foo.nested
})

console.log(foo.nested === bar.nested) // false
```

Identity hazards are in general rare. However, to properly utilize these APIs while safely avoiding identity hazards requires a solid understanding of how the reactivity system works.
:::

## `shallowReactive`

Creates a reactive proxy that tracks reactivity of its own properties but does not perform deep reactive conversion of nested objects (exposes raw values).

```js
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// mutating state's own properties is reactive
state.foo++
// ...but does not convert nested objects
isReactive(state.nested) // false
state.nested.bar++ // non-reactive
```

## `shallowReadonly`

Creates a proxy that makes its own properties readonly, but does not perform deep readonly conversion of nested objects (exposes raw values).

```js
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// mutating state's own properties will fail
state.foo++
// ...but works on nested objects
isReadonly(state.nested) // false
state.nested.bar++ // works
```

## `shallowRef`

Creates a ref that tracks its own `.value` mutation but doesn't make its value reactive.

```js
const foo = shallowRef({})
// mutating the ref's value is reactive
foo.value = {}
// but the value will not be converted.
isReactive(foo.value) // false
```

## `toRaw`

Returns the raw, original object of a `reactive` or `readonly` proxy. This is an escape hatch that can be used to temporarily read without incurring proxy access/tracking overhead or write without triggering changes. It is **not** recommended to hold a persistent reference to the original object. Use with caution.

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```
