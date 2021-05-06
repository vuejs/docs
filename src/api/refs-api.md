# Refs

> This section uses [single-file component](../guide/single-file-component.html) syntax for code examples

## `ref`

Takes an inner value and returns a reactive and mutable ref object. The ref object has a single property `.value` that points to the inner value.

**Example:**

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

If an object is assigned as a ref's value, the object is made deeply reactive by the [reactive](./basic-reactivity.html#reactive) method.

**Typing:**

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

```ts
function useState<State extends string>(initial: State) {
  const state = ref(initial) as Ref<State> // state.value -> State extends string
  return state
}
```

## `unref`

Returns the inner value if the argument is a [`ref`](#ref), otherwise return the argument itself. This is a sugar function for `val = isRef(val) ? val.value : val`.

```ts
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

`toRef` will return a usable ref even if the source property doesn't currently exist. This makes it especially useful when working with optional props, which wouldn't be picked up by [`toRefs`](#torefs).

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
console.log(stateAsRefs.foo.value) // 2

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

`toRefs` will only generate refs for properties that are included in the source object. To create a ref for a specific property use [`toRef`](#toref) instead.

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

**Typing:**

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

**See also**: [Creating Standalone Reactive Values as `refs`](../guide/reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs)

## `triggerRef`

Execute any effects tied to a [`shallowRef`](#shallowref) manually.

```js
const shallow = shallowRef({
  greet: 'Hello, world'
})

// Logs "Hello, world" once for the first run-through
watchEffect(() => {
  console.log(shallow.value.greet)
})

// This won't trigger the effect because the ref is shallow
shallow.value.greet = 'Hello, universe'

// Logs "Hello, universe"
triggerRef(shallow)
```

**See also:** [Computed and Watch - watchEffect](./computed-watch-api.html#watcheffect)
