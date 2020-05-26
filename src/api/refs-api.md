# Refs

> This section uses [single-file component](TODO: SFC) syntax for code examples

## `ref`

Takes an inner value and returns a reactive and mutable ref object. The ref object has a single property `.value` that points to the inner value.

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

If an object is assigned as a ref's value, the object is made deeply reactive by the [reactive](./proxy-api.html#reactive) method.

### Access in Templates

When a ref is returned as a property on the render context (the object returned from [setup()](./composition-api.html#setup)) and accessed in the template, it automatically unwraps to the inner value. There is no need to append `.value` in the template:

```html
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="count ++">Increment count</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return {
      count
    }
  }
}
</script>
```

However, if we decide to change the inline event handler on button click to the component method declared in `setup`, we need to remember that `ref` is not unwrapped there:

```html
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="increment">Increment count</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    function increment() {
      count.value++ // ref is not unwrapped outside the template
    }
    return {
      count,
      increment
    }
  }
}
</script>
```

### Access in Reactive Objects

When a ref is accessed or mutated as a property of a reactive object, it automatically unwraps to the inner value so it behaves like a normal property:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

If a new ref is assigned to a property linked to an existing ref, it will replace the old ref:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
console.log(count.value) // 1
```

Ref unwrapping only happens when nested inside a reactive `Object`. There is no unwrapping performed when the ref is accessed from an `Array` or a native collection type like [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map):

```js
const arr = reactive([ref(0)])
// need .value here
console.log(arr[0].value)

const map = reactive(new Map([['foo', ref(0)]]))
// need .value here
console.log(map.get('foo').value)
```

### Typing

```ts
interface Ref<T> {
  value: T
}

function ref<T>(value: T): Ref<T>
```

Sometimes we may need to specify complex types for a ref's inner value. We can do that succinctly by passing a generics argument when calling `ref` to override the default inference:

```ts
const foo = ref<string | number>('foo') // foo's type: Ref<string | number>

foo.value = 123 // ok!
```

If the type of the generic is unknown, it's recommended to cast `ref` to `Ref<T>`:

```js
function useState<State extends string>(initial: State) {
  const state = ref(initial) as Ref<State> // state.value -> State extends string
  return state
}
```

## `unref`

Returns the inner value if the argument is a [`ref`](#ref), otherwise return the argument itself. This is a sugar function for `val = isRef(val) ? val.value : val`.

```js
function useFoo(x: number | Ref<number>) {
  const unwrapped = unref(x) // unwrapped is guaranteed to be number now
}
```

## `toRef`

Can be used to create a [`ref`](#ref) for a property on a source reactive object. The ref can then be passed around, retaining the reactive connection to its source property.

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

`toRef` is useful when you want to pass the ref of a prop to a composition function:

```js
export default {
  setup(props) {
    useSomeFeature(toRef(props, 'foo'))
  }
}
```

## `toRefs`

Converts a reactive object to a plain object where each property of the resulting object is a [`ref`](#ref) pointing to the corresponding property of the original object.

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
Type of stateAsRefs:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// The ref and the original property is "linked"
state.foo++
console.log(stateAsRefs.foo) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```

`toRefs` is useful when returning a reactive object from a composition function so that the consuming component can destructure/spread the returned object without losing reactivity:

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // logic operating on state

  // convert to refs when returning
  return toRefs(state)
}

export default {
  setup() {
    // can destructure without losing reactivity
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```

## `isRef`

Checks if a value is a ref object.

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

### Typing

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

## `shallowRef`

Creates a ref that tracks its own `.value` mutation but doesn't make its value reactive.

```js
const foo = shallowRef({})
// mutating the ref's value is reactive
foo.value = {}
// but the value will not be converted.
isReactive(foo.value) // false
```
