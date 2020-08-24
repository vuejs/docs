# 반응형(Reactivity) 기초

## 반응형 상태 선언하기

JavaScript 객체에서 반응형 상태를 생성하기 위해, `reactive` 메서드를 사용할 수 있습니다.

```js
import { reactive } from 'vue'

// 반응형 상태
const state = reactive({
  count: 0
})
```

`reactive` 는 Vue 2.x 에서의 `Vue.observable()` API과 동일한 것으로, RxJS의 observables 과 혼동을 피하기 위해 이름을 바꿨습니다. 여기서 반환된 상태는 반응형 객체입니다. 반응형 변환은 "깊습니다" - 전달된 객체의 모든 중첩된 속성(property) 에 영향을 미친다는 의미입니다.

Vue 에서 반응형 상태를 위한 필수 사용 사례는 렌더링 중에 사용할 수 있다는 것입니다. 종속성 추적(dependency tracking) 덕분에, 반응형 상태가 변경될 때 화면은 자동적으로 업데이트될 것 입니다.

이것이 바로 Vue 의 반응형 시스템의 본질입니다. 컴포넌트의 `data()` 에서 객체를 반환할 때, 이것은 내부적으로 `reactive()` 에 의해 반응형으로 만들어집니다. 템플릿은 이러한 반응형 속성을 사용하는 [렌더 함수](render-function.html) 로 컴파일됩니다.

`reactive`에 대한 자세한 내용은 [기본 반응형 API 들](../api/basic-reactivity.html) 섹션을 참고하십시오.

## `refs`로 독립적인 반응형 값 생성하기

독립적인 원시 값(예를 들어, 문자열 하나) 를 가지고 있고, 이것을 반응형으로 만들고자 하는 경우를 상상해봅시다. 물론 하나의 문자열을 속성으로 가지는 객체를 만들어서, 그것을 `reactive`로 던질 수도 있을 것 입니다. Vue는 동일하게 동작하는 메서드를 갖고 있습니다. 그것이 바로 `ref` 입니다.

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref` 는 반응형이면서 변이가능한(mutable) 객체를 반환합니다. 현재 갖고 있는 내부의 값에 대한 반응형 참조(**ref**erence)의 역할을 하며, 여기서 이름이 유래되었습니다. 이 객체는 오직 `value` 이라는 하나의 속성만 포함합니다.

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

### Ref 포장 벗겨내기(Unwrapping)

ref 가 렌더 컨텍스트 ([setup()](composition-api-setup.html) 에서 반환된 객체) 에서 속성으로 반환되고 템플릿에서 접근되면, 자동적으로 내부 값을 풀어냅니다. 즉, 템플릿에서 `.value` 를 추가할 필요가 없다는 것입니다.

```vue-html
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="count ++">카운트 증가</button>
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

### 반응형 객체에서의 접근

`ref`가 반응형 객체의 속성으로 접근하거나 변이될 때, 자동적으로 내부 값으로 벗겨내서, 일반적인 속성과 마찬가지로 동작합니다.

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

만약 새로운 ref 가 기존에 있던 ref 에 연결된 속성에 할당되면, 기존 ref 를 대체하게 됩니다.

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
console.log(count.value) // 1
```

ref 포장 풀기는 반응형 `Object` 내부에서 중첩된 경우에만 발생합니다. ref 가 `Array` 나 [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) 과 같이 표준 내장 컬렉션 타입에서 접근된 경우에는 포장 벗겨내기(Unwrapping)가 동작하지 않습니다.

```js
const books = reactive([ref('Vue 3 Guide')])
// 여기에는 .value 가 필요합니다.
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 여기에는 .value 가 필요합니다.
console.log(map.get('count').value)
```

## 반응형 상태 구조 분해하기(Destructuring)

큰 반응형 객체의 몇몇 속성을 사용하길 원할 때, 원하는 속성을 얻기 위해 [ES6 구조 분해 할당](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 을 사용하는 것이 유혹적일 수 있습니다.

```js
import { reactive } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: '당신은 이 책을 지금 바로 읽습니다 ;)',
  price: '무료'
})

let { author, title } = book
```

안타깝게도, 그러한 구조 분해로 두 속성은 반응형을 잃게 될 것 입니다. 그런 경우, 반응형 객체를 일련의 ref 들로 변환해야 합니다. 이러한 ref 들은 소스 객체에 대한 반응형 연결을 유지합니다.

```js
import { reactive, toRefs } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: '당신은 지금 바로 이 책을 읽습니다  ;)',
  price: '무료'
})

let { author, title } = toRefs(book)

title.value = 'Vue 3 상세 Guide' // title 이 ref 이므로 .value 를 사용해야 합니다.
console.log(book.title) // 'Vue 3 Detailed Guide'
```

`refs` 에 대한 자세한 내용은  [Refs API](../api/refs-api.html#ref) 섹션을 참고하십시오.

## `readonly` 를 이용하여 반응형 객체의 변이 방지하기

때때로 반응형 객체(`ref` 나 <code>reactive</code>)의 변화를 추적하기 윈하지만, 또한 특정 부분에서는 변화를 막기를 원하기도 합니다. 예를 들어, [제공된](component-provide-inject.html) 반응형 객체를 갖고 있을 때, 우리는 그것이 주입된 곳에서는 해당 객체가 변이되는 걸 막고자 할 것입니다. 이렇게 하려면 원래 객체에 대한 읽기 전용 프록시를 생성하십시오.

```js
import { reactive, readonly } from 'vue'

const original = reactive({ count: 0 })

const copy = readonly(original)

// 원본이 변이되면 복사본에 의존하는 watch 도 트리거될 것 입니다.
original.count++

// 복사본을 변이하려고 하면 경고와 함께 실패할 것 입니다.
copy.count++ // warning: "Set operation on key 'count' failed: target is readonly."
```
