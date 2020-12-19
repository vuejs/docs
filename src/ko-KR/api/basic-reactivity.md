# 기본 반응형 API

> 이 섹션에서는 코드 예제에 [싱글파일 컴포넌트(SFC)](../guide/single-file-component.html) 구문을 사용합니다.

## `reactive`

객체의 반응형 복사본을 반환합니다.

```js
const obj = reactive({ count: 0 })
```

반응형 변화는 깊게(deep) 적용됩니다. 모든 중첩된 속성의 변화를 감지합니다. [ES2015 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 기반 구현에서는, 반환된 프록시와 원본 객체는 **동일하지 않습니다.** 반응형 프록시로만 작업하고 원본 객체에 의존하지 않는 것이 좋습니다.

**작성법:**

```ts
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

## `readonly`

객체(반응형 또는 일반객체) 또는 [ref](./refs-api.html#ref) 를 가져와서 원본에 대한 읽기전용 프록시를 반환합니다. 읽기전용 프록시는 깊게(deep) 적용되어 모든 중첩된 속성도 읽기전용으로 접근하게 됩니다.

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 반응성 추적을 위해 작성
  console.log(copy.count)
})

// 원본을 변경하면 복사본에 의존하는 감시자가 트리거됩니다.
original.count++

// 복사본은 변경이 되지 않고, 경고가 발생합니다
copy.count++ // 경고!
```

## `isProxy`

객체가 [`반응형(reactive)`](#reactive) 또는 [`읽기전용(readonly)`](#readonly) 으로 생성된 프록시인지 확인합니다.

## `isReactive`

객체가 [`반응형(reactive)`](#reactive) 으로 생성된 프록시인지 확인합니다.

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

프록시가 [`읽기전용(readonly)`](#readonly) 로 생성되었지만, [`반응형(reactive)`](#reactive) 으로 생성된 다른 프록시를 감싸는 경우에도 `true` 를 반환합니다.<br><br>아래 예제코드에서 state 객체를 이용하여 name 속성을 조작하면, stateCopy 객체에 값도 조작이 되어집니다. stateCopy 객체로 name 속성 조작은 불가능 합니다.

```js{7-15}
import { reactive, isReactive, readonly } from 'vue'
export default {
  setup() {
    const state = reactive({
      name: 'John'
    })
    // 일반 객체에서 생성된 읽기전용 프록시
    const plain = readonly({
      name: 'Mary'
    })
    console.log(isReactive(plain)) // -> false

    // 반응형 프록시에서 생성된 읽기전용 프록시
    const stateCopy = readonly(state)
    console.log(isReactive(stateCopy)) // -> true
  }
}
```

## `isReadonly`

객체가 [`읽기전용(readonly)`](#readonly) 으로 생성된 프록시인지 확인합니다.

## `toRaw`

[`반응형(reactive)`](#reactive) 또는 [`읽기전용(readonly)`](#readonly) 프록시의 원시(raw) 원본 객체를 반환합니다. 프록시 접근/추적 오버헤드 없이 일시적으로 읽거나, 변경을 트리거하지 않고 쓸 수 있는 도피 수단(escape hatch)입니다. 원래 객체에 대한 영구 참조를 유지하는 것은 **권장되지 않습니다.** 주의해서 사용하십시오.

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

## `markRaw`

객체가 프록시로 변환되지 않도록 객체를 표시한다. 객체 자체를 반환합니다.

```js
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 다른 반응형 객체 안에 중첩될 때도 작동합니다
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

::: warning 
`markRaw` 및 아래의 shallowXXX API를 사용하면 기본 깊은 반응성/읽기전용 변환을 선택적으로 해제할 수 있으며, 상태 그래프에 프록시되지 않은 원시(raw) 객체를 선택적으로 포함 할 수 있습니다. 다양한 이유로 사용할 수 있습니다


- 복잡한 제3자(서드파티) 클래스 인스턴스나 Vue 컴포넌트 객체와 같이 일부 값은 단순히 반응성으로 만들어서는 안됩니다.

- 프록시 변환을 건너뛰면 변경 불가능한(immutable) 데이터 소스로 큰 목록을 렌더링 할 때 성능이 향상될 수 있습니다.

원시 선택적 해제(raw opt-out)는 최상위 수준에만 있기 때문에, 고급으로 간주됩니다. 따라서 중첩되고 표시되지 않은(nested, non-marked) 원시 객체를 반응성 객체로 설정한 다음에 다시 접근하면 프록시된 버전을 다시 가져옵니다. 이것은 **오용 위험(identity hazards)**을 초래할 수 있습니다. 즉, 객체 ID에 의존하지만 동일한 객체의 원시(raw) 버전과 프록시 버전을 모두 사용하는 작업을 수행합니다.

```js
const foo = markRaw({
  nested: {}
})

const bar = reactive({
  // `foo`는 raw로 표시되지만, foo.nested는 그렇지 않습니다.
  nested: foo.nested
})

console.log(foo.nested === bar.nested) // false
```

오용 위험은 일반적으로 드뭅니다. 그러나 오용 위험을 안전하게 피하면서 이러한 API를 적절하게 활용하려면 반응형 시스템의 작동 방식에 대한 확실한 이해가 필요합니다. 
:::

## `shallowReactive`

고유한 속성의 반응성을 추적하지만 중첩된 객체의 깊은 반응 변환을 수행하지 않는 반응 프록시를 생성합니다 (원시 값(raw values) 노출).

```js
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 변경 상태의 자체적인 속성은 반응적입니다
state.foo++
// 하지만 중첩된 객체는 변환하지 않습니다.
isReactive(state.nested) // false
state.nested.bar++ // 무반응
```

## `shallowReadonly`

고유한 속성을 읽기 전용으로 만들지만 중첩된 객체의 깊은 읽기전용 변환을 수행하지 않는 프록시를 생성합니다 (원시 값(raw values) 노출).

```js
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 변경 상태의 자체적인 속성 변경이 안됩니다
state.foo++
// 하지만 중첩된 객체에서 작동합니다
isReadonly(state.nested) // false
state.nested.bar++ // 반응
```
