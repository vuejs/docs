# Refs

> 이 섹션에서는 [싱글 파일 컴포넌트](../guide/single-file-component.html) 문법을 사용해 예제를 설명하겠습니다. 

## `ref`

Takes an inner value and returns a reactive and mutable ref object. The ref object has a single property `.value` that points to the inner value.

내부에 값을 가지면서 반응적이고 변경 가능한 ref 객체를 반환합니다. ref 객체는 단 하나의 프로퍼티를 가지는데, 내부 값을 가리키는 `.value` 입니다. 

**예제:**

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

객체가 ref의 값으로 할당되면  [reactive](./basic-reactivity.html#reactive)메소드를 통해 해당 객체에 대한 깊은 반응성(Deep reactive)을 가지게 됩니다.

**타입:**

```ts
interface Ref<T> {
  value: T
}

function ref<T>(value: T): Ref<T>
```

때로는 우리는 ref의 내부 값에 복잡한 타입을 지정해야 할 수도 있습니다. 기본 타입 추론을 오버라이드 하기 위해 `ref`를 호출 할 때 제네릭 인수를 전달하여 이를 달성할수 있습니다. 

```ts
const foo = ref<string | number>('foo') // foo's type: Ref<string | number>

foo.value = 123 // ok!
```


만약 제레닉의 타입을 모른다면, `ref`를 `Ref<T>`로 타입 캐스팅 하는 것을 추천합니다:

```js
function useState<State extends string>(initial: State) {
  const state = ref(initial) as Ref<State> // state.value -> State extends string
  return state
}
```

## `unref`

주어진 인자가 [`ref`](#ref)라면 내부 값을 반환하고, 아니라면 주어진 인자를 반환합니다. 이 함수는 `val = isRef(val) ? val.value : val`를 수행하는 편의 함수 입니다. 

```js
function useFoo(x: number | Ref<number>) {
  const unwrapped = unref(x) // unwrapped is guaranteed to be number now
}
```

## `toRef`

소스가되는 리액티트 객체의 속성을 가져와 [`ref`](#ref) 를 만들수 있습니다.  이 ref는 여기저기 인자로 전달할수 있으면서,  소스 객체에 대해 리액티브 연결을 유지할수 있습니다. 

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

`toRef`는 prop의 ref를 컴포지션 함수에 전달 할 때 유용합니다:

```js
export default {
  setup(props) {
    useSomeFeature(toRef(props, 'foo'))
  }
}
```

`toRef`는 소스객체에 해당 프로퍼티가 지금 당장 존재하지 않더라도 사용 가능한 참조를 반환합니다. 이것은 [`toRefs`](#torefs)를 통해 추출되지 않는 옵션 props을 사용하고자 할때 유용합니다. 

## `toRefs`

리액티브 객체를 일반 객체로 변환하여 반환하지만, 반환되는 객체의 각 프로퍼티들이 [`ref`](#ref)로 원래의 리액티브 객체 프로퍼티로 연결됩니다. 


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


`toRefs`는 사용하는 곳에서 반응성(reactivity)를 읽지 않고 반환된 값을 destructure/spread  할수 있기 때문에, 컴포지션 함수등에서 유용하게 사용할수 있습니다. 

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

`toRefs`는 소스 객체에 포함 된 속성에 대한 ref만 생성합니다. 특정 속성에 대한 참조를 만들려면 대신 [`toRef`](#toref)를 사용하세요.

## `isRef`

주어진 값이 ref 객체인지 확인합니다. 

## `customRef`

종속성 추적 및 업데이트 트리거를 명시적으로 커스터마이징 할수 있는 ref를 만듭니다. `track`및 `trigger`함수를 인수로 받고 `get`및 `set`을 가진 객체를 반환하는 팩토리 함수를 인자로 넘겨야 합니다. 


- 커스텀 ref를 이용해 `v-model`에 대해 debounce를 구현하는 예제:

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

**타입:**

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


자신의 `.value`가 변경되는것은 추적하지만, value 값 자체를 반응적으로 만들지 않는 ref를 만듭니다.

```js
const foo = shallowRef({})
// ref의 .value가 변경되는것은 반응하지만 
foo.value = {}
// 값 자체는 반응형이 아님
isReactive(foo.value) // false
```

**더 찾아보기**: [ 독립적인 리액티브 값들을 `refs`로 만들기 ](../guide/reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs)

## `triggerRef`


[`shallowRef`](#shallowref)에 연결된 모든 이펙트를 수동으로 실행합니다.


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

**더 찾아보기:** [Computed and Watch - watchEffect](./computed-watch-api.html#watcheffect)
