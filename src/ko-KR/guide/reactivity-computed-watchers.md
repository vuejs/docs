# Computed 와 Watch

> 이 섹션에서는 예제에서 [싱글 파일 컴포넌트](single-file-component.html) 문법을 사용합니다. 

## 계산된 값

가끔 다른 상태가 바뀌면 어떤 상태가 따라 바뀌었으면 할 때가 있습니다. Vue에서는 이 기능이 컴포넌트의 [계산된 속성(computed properties)](computed.html#computed-properties) 로 다룰수 있습니다. 

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // error
```

또는`get` 및 `set` 함수가 있는 객체를 사용하여 쓰기 가능한 참조 객체를 만들 수 있습니다.

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

## `watchEffect`

반응형 상태에 따라 사이드 이펙트을 적용하고 _자동으로 다시 적용_ 하려면 `watchEffect` 메서드를 사용할 수 있습니다. 즉시 함수를 실행 한 후에 반응적으로 종속성을 추적하며  종속성이 변경 될 때마다 다시 실행합니다.

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

### Stopping the Watcher


컴포넌트의 [setup()](composition-api-setup.html) 함수 또는 [lifecycle hooks](composition-api-lifecycle-hooks.html) 안에서 `watchEffect`가 호출되면 감시자(watcher)가 컴포넌트의 생명주기(Lifecycle)에 연결되어, 컴포넌트가 언마운트 되면 자동으로 중지됩니다.

In other cases, it returns a stop handle which can be called to explicitly stop the watcher:
이외의 경우에는, 감시자(Watcher)를 명시적으로 중지하기 위해 호출 할 수있는 중지 핸들(Stop handle)을 반환합니다.

```js
const stop = watchEffect(() => {
  /* ... */
})

// later
stop()
```

### 사이드 이펙트 무효화 

때때로 감시된 이펙트 함수에서 비동기적으로 수행된 사이드 이펙트는, 이펙트 함수가 무효화 될때 정리작업이 필요할수 있습니다.(다시말해, 비동기로 수행된 이펙트가 완료되기 전에 상태가 변경될수 있습니다.).이펙트 함수는 무효화 콜백을 등록하는 데 사용할 수있는 `onInvalidate` 함수를 받습니다. 이 무효화 콜백은 다음과 같은 경우에 호출됩니다

- 이펙트를 다시 실행하려고 할때 
- 감시자(watcher)가 멈출때 (i.e. `watchEffect`가 `setup()` 또는 라이프 사이클 후크 내에서 사용된후, 컴포넌트가 언마운트 될때)

```js
watchEffect(onInvalidate => {
  const token = performAsyncOperation(id.value)
  onInvalidate(() => {
    // id has changed or watcher is stopped.
    // invalidate previously pending async operation
    token.cancel()
  })
})
```

We are registering the invalidation callback via a passed-in function instead of returning it from the callback because the return value is important for async error handling. It is very common for the effect function to be an async function when performing data fetching:

여기에서 우리는 무효화 콜백 함수를 반환하지 않고, 넘겨진 주어진 `onInvalidate` 함수를 호출하며 인자로 주어 처리하게 하고 있는데, 이 이유는 반환값이 비동기 에러 처리에 매우 중요하기 때문입니다. 데이터를 가져오는 이펙트 함수가 비동기 함수로 만들어지는 것은 매우 흔한 일입니다. 

```js
const data = ref(null)
watchEffect(async (onInvalidate) => {
  onInvalidate(() => { /* ... */ }) // we register cleanup function before Promise resolves
  data.value = await fetchData(props.id)
})
```


비동기 함수는 암시 적으로 Promise를 반환하지만 Promise가 해소(resolve) 되기 전에 정리 함수를 등록해야합니다. 또한 Vue는 반환 된 Promise를 사용하여 Promise 체인의 잠재적 오류를 자동으로 처리합니다.


### 이펙트 플러시 타이밍 

Vue의 반응성 시스템은 무효화 된 이펙트를 버퍼링하고 동일한 "틱(tick)"에서 많은 상태 변이가 발생하는 경우 불필요한 중복 호출을 방지하기 위해 이를 비동기적으로 플러시합니다. 내부적으로 컴포넌트의 `update` 함수도 감시된 이펙트입니다.  사용자 이펙트가  대기열에 있을 때 기본적으로 모든 컴포넌트 `update` 이펙트 보다 **앞서서**  호출됩니다.



```html
<template>
  <div>{{ count }}</div>
</template>

<script>
  export default {
    setup() {
      const count = ref(0)

      watchEffect(() => {
        console.log(count.value)
      })

      return {
        count
      }
    }
  }
</script>
```

이 예제에서:

- 카운트는 초기 실행시 동기적으로 기록됩니다.
- `count`가 변경되면 컴포넌트가 업데이트되기 **전에** 콜백이 호출됩니다.

감시된 이펙트를 컴포넌트 업데이트 **이후에** 다시 실행해야하는 경우,  `flush` 옵션을 가진 `options` 객체를 추가로 전달할수 있습니다. (기본값은 `'pre'`).

```js
// 컴포넌트가 업데이트 된 이후에 호출 되기 때문에 변경된 DOM에 접근할수 있음 
// Note: 최초 이펙트 실행이 컴포넌트의 최초 렌더링 이후로 지연됨 
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'post'
  }
)
```

`flush` 옵션은`'sync'`도 허용하는데, 이펙트가 항상 동기적으로 트리거 되도록 합니다. 그러나 이것은 비효율적이며 거의 필요하지 않습니다.

### 감시자(Watcher) 디버깅

`onTrack`및 `onTrigger`옵션을 사용하여 감시자의 동작을 디버깅 할 수 있습니다.

- `onTrack`은 반응성 프로퍼티  또는 ref 가 의존성으로 추적 될 때 호출됩니다.
- `onTrigger`는 의존성이 변경되어 감시자 콜백이 트리거 될 때 호출됩니다.


두 콜백 모두 문제의 종속성에 대한 정보가 포함 된 디버거 이벤트를 수신합니다. 의존성을 대화형으로 검사하려면 이러한 콜백에 `debugger` 문을 배치하는 것이 좋습니다.

```js
watchEffect(
  () => {
    /* side effect */
  },
  {
    onTrigger(e) {
      debugger
    }
  }
)
```

`onTrack` 과  `onTrigger` 은 개발 모드에서만 작동합니다. 

## `watch`

`watch` API는 컴포넌트  [watch](computed.html#watchers) 프로퍼티와 정확히 동일합니다.  `watch`는 특정 데이터 소스를 관찰하며  별도의 콜백 함수에서 사이드 이펙트를 적용합니다. 또한 기본적으로 지연되어 실행됩니다.  즉, 감시대상  소스가 변경된 경우에만 콜백이 호출됩니다.

-  [watchEffect](#watcheffect)와 비교하면 , `watch`는 다음을 허용합니다:

  - 사이드 이펙트를 지연 실행할수 있습니다. ;
  - 감시자가 다시 실행해야 하는 트리거가 될 상태에 대해 더 구체적으로 지정할수 있습니다;
  - 변경전 값과, 변경후 값에 모두 접근할수 있습니다

### 단일 소스 감시하기

감시자 데이터 소스는 값을 반환하는 getter 함수이거나,  `ref` 일 수 있습니다.

```js
// getter 감시
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// dref를 직접 감시
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

### 다수의 소스 감시하기 

감시자는 배열을 통해 복수의 소스를 동시에 감시할수 있습니다:

```js
const firstName = ref('');
const lastName= ref('');

watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues);
})

firstName.value = "John"; // logs: ["John",""] ["", ""]
lastName.value = "Smith"; // logs: ["John", "Smith"] ["John", ""]
```

### `watchEffect` 와 공요하는 동작

`watch`는 [`watchEffect`](#watcheffect) 와 다음의 동작을 공유합니다. 
- [감시자 종료](#stopping-the-watcher), 
- [사이드 이펙트 무효화](#side-effect-invalidation) (세번째 인자로 `onInvalidate`가 전달됨),
- [플러시 타이밍](#effect-flush-timing),
- [debugging](#watcher-debugging)
