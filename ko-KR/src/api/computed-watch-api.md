# Computed 와 watch

> 이 섹션에서는 코드 예제에 [싱글파일 컴포넌트(SFC)](../guide/single-file-component.html) 구문을 사용합니다.

## `computed`

getter 함수를 얻고 getter 에서 반환된 값에 대해 변경 불가능한 반응성 [ref](./refs-api.html#ref) 객체를 반환합니다.

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // error
```

또는, `get` 및 `set` 함수를 가진 객체를 사용하여 쓰기 가능한 ref 객체를 생성도 가능합니다.

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

// 쓰기
function computed<T>(options: { get: () => T; set: (value: T) => void }): Ref<T>
```

## `watchEffect`

반응적으로 종속성을 추적하면서 함수를 즉시 실행하고 종속성이 변경 될 때마다 다시 실행합니다.

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

**작성법:**

```ts
function watchEffect(
  effect: (onInvalidate: InvalidateCbRegistrator) => void,
  options?: WatchEffectOptions
): StopHandle

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // default: 'pre'
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

`watch` API는 옵션 API [this.$watch](./instance-methods.html#watch)(및 해당 [watch](./options-data.html#watch) 옵션) 와 완전히 동일합니다. `watch` 는 특정 데이터 소스를 감시해야 하며 별도의 콜백 함수에 부작용(side effect)을 적용합니다. 또한 기본적으로 게으르다(default lazy). 즉, 콜백은 감시된 소스가 변경되었을 때만 호출됩니다.

- [watchEffect](#watcheffect) 와 비교하여 `watch` 를 사용하면 다음이 가능합니다.

    - 게으른 부작용(side effect) 실행;
    - watch 가 재실행하도록 트리거해야하는 상태에 대해 더 구체적으로 지정;
    - 감시 상태의 이전 및 현재값 모두 접근이 가능.

### 단일 소스 Watching

watch 데이터 소스는 값을 반환하는 getter 함수이거나 [ref](./refs-api.html#ref) 일 수 있습니다.

```js
// watching a getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// directly watching a ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

### 여러 소스 Watching

watch 는 배열을 사용하여 동시에 여러 소스를 감시 할 수도 있습니다.

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

### `watchEffect` 와 공유된 동작

`watch` 와 [`watchEffect`](#watcheffect) 는 [수동 중지(manual stoppage)](#stopping-the-watcher), [부작용 무효화(side effect invalidation)](#side-effect-invalidation)(대신에 `onInvalidate` 가 세번째 인자로 콜백에 전달됨), [플러시 타이밍(flush timing)](#effect-flush-timing) 및 [디버깅(debugging)](#watcher-debugging) 동작을 공유합니다.

**작성법:**

```ts
// watching 단일 소스
function watch(
  source: WatcherSource,
  callback: (
    value: T,
    oldValue: T,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options?: WatchOptions
): StopHandle

// watching 다중 소스
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

**참고**: [`watchEffect` guide](../guide/reactivity-computed-watchers.html#watch)
