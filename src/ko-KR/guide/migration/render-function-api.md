---
badges:
- breaking
---

# 렌더 함수(Render Function) API <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

이 변경사항은 `<template>` 사용자에게 영향을 주지 않습니다.

변경된 사항에 대한 간략한 요약은 다음과 같습니다:

- `h`는 이제 렌더 함수에 전달인자로 전달되는 대신에 전역 import로 가져옵니다.
- 상태저장 컴포넌트(stateful components)와 함수형 컴포넌트(functional components) 사이를 더 일관성있도록 렌더 함수 매개변수(render function arguments)가 변경되었습니다.
- VNodes는 이제 평평한(flat) props 구조를 가집니다.

더 많은 정보를 알고 싶다면, 읽으십시오!

## 렌더 함수 전달인자

### 2.x 문법

2.x에서 `render` 함수는 `h` 함수(`createElement`의 일반적인 별칭)를 자동적으로 전달인자로 받습니다.

```js
// Vue 2 렌더 함수 예시
export default {
  render(h) {
    return h('div')
  }
}
```

### 3.x 문법

3.x에서 `h`는 자동으로 전달인자로 받는 대신에 전역 import로 가져옵니다.

```js
// Vue 3 렌더 함수 예시
import { h } from 'vue'

export default {
  render() {
    return h('div')
  }
}
```

## 렌더 함수 기호(signature) 변경

### 2.x 문법

2.x에서 `render`함수는 `h`와 같은 전달인자를 자동으로 받습니다.

```js
// Vue 2 렌더 함수 예제
export default {
  render(h) {
    return h('div')
  }
}
```

### 3.x 문법

3.x에서는 `render`함수가 더이상 전달인자로 받지 않기 때문에, `setup()`함수 내에서 사용됩니다. 이는 `setup()`에 전달된 전달인자 뿐만아니라 범위 내 선언된 반응형 상태(reactive state) 및 함수에 대한 접근 권한을 얻는 추가적인 이점을 가지고 있습니다.

```js
import { h, reactive } from 'vue'

export default {
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      count: 0
    })

    function increment() {
      state.count++
    }

    // render function를 반환
    return () =>
      h(
        'div',
        {
          onClick: increment
        },
        state.count
      )
  }
}
```

`setup()` 작동 방식에 대한 자세한 내용은 [Composition API 가이드](/ko-KR/guide/composition-api-introduction.html)를 참조하세요.

## VNode Props 형태

### 2.x 문법

2.x에서 `domProps`는 VNode props 내 중첩된 리스트를 포함했습니다:

```js
// 2.x
{
  staticClass: 'button',
  class: {'is-outlined': isOutlined },
  staticStyle: { color: '#34495E' },
  style: { backgroundColor: buttonColor },
  attrs: { id: 'submit' },
  domProps: { innerHTML: '' },
  on: { click: submitForm },
  key: 'submit-button'
}
```

### 3.x 문법

3.x에서는 전체 VNode props 구조가 평평해졌습니다(역주: depth가 1단계가 되었음). 예시로는 다음과 같습니다:

```js
// 3.x 문법
{
  class: ['button', { 'is-outlined': isOutlined }],
  style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

## 등록된 컴포넌트

### 2.x 문법

2.x에서 컴포넌트가 등록되면 컴포넌트의 이름(name)을 첫번째 전달인자에 문자열로 전달할 때, render 함수가 잘 작동합니다:

```js
// 2.x
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  }
  template: `
    <button @click="count++">
      Clicked {{ count }} times.
    </button>
  `
})

export default {
  render(h) {
    return h('button-counter')
  }
}
```

### 3.x 문법

3.x에서는 VNode가 컨텍스트 자유(context-free)라서 더이상 문자열 ID를 사용하여 등록된 컴포넌트를 암시적으로 조회할 수 없습니다. 대신 import된 `resolveComponent` 메소드를 사용해야 합니다:

```js
// 3.x
import { h, resolveComponent } from 'vue'

export default {
  setup() {
    const ButtonCounter = resolveComponent('button-counter')
    return () => h(ButtonCounter)
  }
}
```

자세한 내용은 [The Render Function Api Change RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0008-render-function-api-change.md#context-free-vnodes)를 참조하세요.

## 마이그레이션 방법

### 라이브러리 작성자(Library Authors)

`h`가 전역적으로 import 된다는 것은 Vue 컴포넌트를 포함하는 모든 라이브러리는 어딘가에 `import { h } from 'vue'`를 포함한다는 것을 의미합니다. 결과적으로 라이브러리 작성자가 빌드 설정에서 Vue의 외부화를 올바르게 구성해야 하기 때문에 약간의 오버헤드가 발생합니다:

- Vue는 라이브러리에 번들로 제공되지 않아야 합니다.
- 모듈빌드의 경우, import는 그대로 두고 최종 사용자 번들러에서 처리해야합니다.
- UMD / browser 빌드의 경우 먼저 전역 Vue.h를 시도하고 호출을 요청하도록 대체해야합니다.

## 다음 단계

자세한 문서는 [Render Function Guide](/ko-KR/guide/render-function)를 참조하세요!
