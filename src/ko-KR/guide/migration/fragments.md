---
badges:
- new
---

# Fragments <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

Vue 3에서 컴포넌트는 다중 루트 노드(multi-root nodes) 컴포넌트인 fragments를 공식 지원합니다!

## 2.x 구문

2.x에서는 다중 루트 컴포넌트가 지원되지 않았고, 사용자가 실수로 만들었을 경우 경고 메세지를 내보냈습니다. 결과적으로 이 오류를 해결하기 위해 많은 컴포넌트가 단일 `<div>`로 감싸게 됐습니다.

```html
<!-- Layout.vue -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

## 3.x 구문

3.x 에서 컴포넌트는 다중 루트 노드(multiple root node)를 가질 수 있습니다! 하지만, 개발자가 속성을 배포(상속)해야 하는 위치를 명시적으로 정의해야 합니다.

```html
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

속성 상속이 어떻게 작동하는지 더 알고 싶다면, [Non-Prop Attributes](/ko-KR/guide/component-attrs.html)을 확인하세요.
