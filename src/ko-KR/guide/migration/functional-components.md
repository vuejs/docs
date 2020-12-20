---
badges:
- breaking
---

# 함수형 컴포넌트(Functional Components) <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

고수준에서의 변경내용:

- 2.x의 함수형 컴포넌트의 성능 향상은 이제 3.x에서는 무시할 수 있을 정도이므로, 상태 저장 컴포넌트를 사용하는 것이 좋습니다.
- 함수형 컴포넌트는 `props`와 `context` (즉, `slots`, `attrs`, `emit`)을 받는 일반 함수를 사용해서만 만들 수 있습니다.
- **BREAKING:** 싱글 파일 컴포넌트의 `<template>`의 `함수형(functional)` 속성이 삭제되었습니다.
- **BREAKING:** 함수에 의해 만들어진 컴포넌트에서 `{ functional: true }` 옵션이 삭제되었습니다.

더 자세한 설명이 필요하다면 계속 읽어주세요!

## 소개

Vue 2에서 함수형 컴포넌트는 두가지 주 사용 사례가 있습니다.

- 상태 저장 컴포넌트(stateful components)보다 훨씬 빠르게 초기화되었기 때문에 성능 개선의 측면에서 사용하였습니다.
- 다중 루트 노드(multiple root nodes)를 반환하기 위해서 사용하였습니다.

그러나 Vue3에서는 상태 저장 컴포넌트의 성능은 함수형 컴포넌트 성능과 차이가 무의미할 정도로 향상되었습니다. 게다가 상태 저장 컴포넌트도 이제 다중 루트 노드를 반환할 수 있습니다.

결과적으로 함수형 컴포넌트를 쓰는 사용 사례는 동적인 heading을 만드는 컴포넌트 같이 간단한 컴포넌트를 만드는 것밖에 없습니다. 그렇지 않다면 평소와 같이 상태저장 컴포넌트를 사용하는 것을 권장합니다.

## 2.x 구문

적절한 heading(즉, `h1`, `h2`, `h3` 등)을 렌더링하는 `<dynamic-heading>` 컴포넌트를 만들 때, 2.x에서는 단일 파일 컴포넌트로 함수형 컴포넌트를 만들 수 있습니다.

```js
// Vue 2 함수형 컴포넌트 예시
export default {
  functional: true,
  props: ['level'],
  render(h, { props, data, children }) {
    return h(`h${props.level}`, data, children)
  }
}
```

또는 단일 파일 컴포넌트에서의 `<template>`을 사용해서 함수형 컴포넌트를 만들 수 있습니다.

```js
// <template>을 사용한 Vue 2 함수형 컴포넌트
<template functional>
  <component
    :is="`h${props.level}`"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

## 3.x 구문

### 함수로 만든 컴포넌트

이제 Vue 3에서 모든 함수형 컴포넌트는 일반 함수로만 만들 수 있습니다. 즉, 이제 `{ functional: true }` 컴포넌트 옵션을 정의할 필요가 없습니다.

함수형 컴포넌트는 `props`와 `context` 전달인자를 전달받습니다. `context` 인자는 컴포넌트의 `attrs`, `slots`,  `emit` 속성을 포함한 객체입니다.

또한 `render`함수에서 `h`함수를 암시적으로 제공하는 대신 전역에서 import하여 `h`를 사용합니다.

이전에 언급한 `<dynamic-heading>` 컴포넌트가 Vue 3에서는 다음과 같이 바뀌었습니다.

```js
import { h } from 'vue'

const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default DynamicHeading
```

### 싱글 파일 컴포넌트 (SFCs)

3.x에서는 상태 저장 컴포넌트와 함수형 컴포넌트간의 성능 차이가 대폭 감소하였으며, 대부분의 사용 사례에서 그다지 중요하지 않습니다. 결과적으로 싱글 파일 컴포넌트에서 `functional`을 사용하는 개발자의 마이그레이션 방법은 해당 속성을 제거하고, `props`를 `$props`로, `attrs`를 `$attrs`로 모든 참조명을 바꾸는 것입니다.

위에서 만든 template을 사용한 `<dynamic-heading>` 예시가 Vue 3에서는 다음과 같이 바뀌었습니다.

```js{1}
<template>
  <component
    v-bind:is="`h${$props.level}`"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

크게 바뀐 점은 다음과 같습니다.

1. `<template>`에서 `functional` 속성이 삭제되었습니다.
2. `listeners`가 이제 `$attrs`의 프로퍼티로 전달되고 제거할 수 있습니다.

## 다음 단계

새로운 함수형 컴포넌트의 사용 방법과 일반적인 렌더 함수의 바뀐 점에 대한 정보를 더 알고 싶다면 다음 문서를 보세요.

- [Migration: Render Functions](/ko-KR/guide/migration/render-function-api.html)
- [Guide: Render Functions](/ko-KR/guide/render-function.html)
