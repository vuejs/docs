# Computed 와 watch

> 이 섹션에서는 코드 예제에 [싱글파일 컴포넌트(SFC)](../guide/single-file-component.html) 구문을 사용합니다.

## `computed`

getter함수를 가져와 getter에서 반환된 값에 대해 변경 불가능한 반응 [ref](./refs-api.html#ref) 객체를 반환합니다.

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 에러
```

또는, `get` 및 `set` 함수를 가진 객체를 사용하여 쓰기 가능한 참조(ref) 객체를 생성도 가능합니다.

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

**작성법:**

```ts
// 읽기전용
function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>

// 쓰기가능
function computed<T>(options: { get: () => T; set: (value: T) => void }): Ref<T>
```

## `watchEffect`

반응적으로 종속성을 추적하는 동안에 함수를 즉시 실행하고 종속성이 변경 될 때마다 다시 실행합니다.

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 콘솔로그값 : 0

setTimeout(() => {
  count.value++
  // -> 콘솔로그값 : 1
}, 100)
```

**작성법:**

```ts
function watchEffect(
  effect: (onInvalidate: InvalidateCbRegistrator) => void,
  options?: WatchEffectOptions
): StopHandle

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // 'pre'가 기본값
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

interface DebuggerEvent {
  effect: ReactiveEffect
  target: any
  type: OperationTypes
  key: string | symbol | undefined
}

type InvalidateCbRegistrator = (invalidate: () => void) => void

type StopHandle = () => void
```

**참고**: [`watchEffect` guide](../guide/reactivity-computed-watchers.html#watcheffect)

## `watch`

`watch` API는 옵션 API [this.$watch](./instance-methods.html#watch)(및 해당 [watch](./options-data.html#watch) 옵션)와 완전히 동일합니다. `watch`는 특정 데이터 소스를 감시해야 하며 별도의 콜백 함수에서 부작용(부수적인 작동, side effect)을 적용합니다. 또한 기본적으로 동작이 느립니다(lazy). 즉, 감시된 소스가 변경되었을 때만 콜백이 호출됩니다.

- [watchEffect](#watcheffect) 와 비교하여 `watch` 를 사용하면 다음이 가능합니다.

    - 사이드 이펙트를 게으르게(lazily) 수행합니다.
    - watch가 재실행하도록 트리거해야하는 상태에 대해 더 구체적으로 지정하십시오.
    - 감시된 상태의 이전 값과 현재 값 모두에 접근합니다.

### 단일 소스 감시하기

감시자의 데이터 소스는 값을 반환하는 getter 함수이거나 [ref](./refs-api.html#ref) 일 수 있습니다.

```js
// getter 감시하기
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 직접적으로 ref 감시하기
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

### 여러 소스 감시하기

또한 감시자는 배열을 사용하여, 여러 소스를 동시에 감시할 수 있습니다.

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

### `watchEffect` 와 공유된 동작

`watch` 와 [`watchEffect`](#watcheffect) 는 [수동 중지(manual stoppage)](#stopping-the-watcher), [사이드 이펙트 무효화(side effect invalidation)](#side-effect-invalidation) (`onInvalidate` 가 세번째 인자로 콜백에 전달됨), [플러시 타이밍(flush timing)](#effect-flush-timing) 및 [디버깅(debugging)](#watcher-debugging) 동작을 공유합니다.

**작성법:**

```ts
// 단일 소스 감시하기
function watch(
  source: WatcherSource,
  callback: (
    value: T,
    oldValue: T,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options?: WatchOptions
): StopHandle

// 다중 소스 감시하기
function watch[]>(
  sources: T
  callback: (
    values: MapSources,
    oldValues: MapSources,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options? : WatchOptions
): StopHandle

type WatcherSource = Ref | (() => T)

type MapSources = {
  [K in keyof T]: T[K] extends WatcherSource ? V : never
}

// 공유 옵션은 `watchEffect` 입력 참조
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // default: false
  deep?: boolean
}
```

**참고**: [`watch` guide](../guide/reactivity-computed-watchers.html#watch)
