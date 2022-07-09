# Basic Reactivity APIs

> This section uses [single-file component](../guide/single-file-component.html) syntax for code examples

## `reactive`

Returns a reactive copy of the object.

```js
const obj = reactive({ count: 0 })
```

The reactive conversion is "deep"—it affects all nested properties. In the [ES2015 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) based implementation, the returned proxy is **not** equal to the original object. It is recommended to work exclusively with the reactive proxy and avoid relying on the original object.

**Typing:**

```ts
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

::: tip Note
`reactive` will unwrap all the deep [refs](./refs-api.html#ref), while maintaining the ref reactivity

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

:::

::: warning Important
When assigning a [ref](./refs-api.html#ref) to a `reactive` property, that ref will be automatically unwrapped.

```ts
const count = ref(1)
const obj = reactive({})

obj.count = count

console.log(obj.count) // 1
console.log(obj.count === count.value) // true
```

:::

## `readonly`

Takes an object (reactive or plain) or a [ref](./refs-api.html#ref) and returns a readonly proxy to the original. A readonly proxy is deep: any nested property accessed will be readonly as well.

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

As with [`reactive`](#reactive), if any property uses a `ref` it will be automatically unwrapped when it is accessed via the proxy:

```js
const raw = {
  count: ref(123)
}

const copy = readonly(raw)

console.log(raw.count.value) // 123
console.log(copy.count) // 123
```

## `isProxy`

Checks if an object is a proxy created by [`reactive`](#reactive) or [`readonly`](#readonly).

## `isReactive`

Checks if an object is a reactive proxy created by [`reactive`](#reactive).

```js
import { reactive, isReactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      name: 'John'
    })
    console.log(isReactive(state)) // -> true
  }
}
```

It also returns `true` if the proxy is created by [`readonly`](#readonly), but is wrapping another proxy created by [`reactive`](#reactive).

```js{7-15}
import { reactive, isReactive, readonly } from 'vue'
export default {
  setup() {
    const state = reactive({
      name: 'John'
    })
    // readonly proxy created from plain object
    const plain = readonly({
      name: 'Mary'
    })
    console.log(isReactive(plain)) // -> false

    // readonly proxy created from reactive proxy
    const stateCopy = readonly(state)
    console.log(isReactive(stateCopy)) // -> true
  }
}
```

## `isReadonly`

Checks if an object is a readonly proxy created by [`readonly`](#readonly).

## `toRaw`

Returns the raw, original object of a [`reactive`](#reactive) or [`readonly`](#readonly) proxy. This is an escape hatch that can be used to temporarily read without incurring proxy access/tracking overhead or write without triggering changes. It is **not** recommended to hold a persistent reference to the original object. Use with caution.

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
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

Unlike [`reactive`](#reactive), any property that uses a [`ref`](/api/refs-api.html#ref) will **not** be automatically unwrapped by the proxy.

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

Unlike [`readonly`](#readonly), any property that uses a [`ref`](/api/refs-api.html#ref) will **not** be automatically unwrapped by the proxy.
