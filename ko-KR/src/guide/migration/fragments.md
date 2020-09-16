---
badges:
- 추가됨
---

# Fragments <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

Vue 3에서, 컴포넌트가 이제 다중 루트(*multi-root nodes) 컴포넌트, 다시 말해 fragments를 공식 지원합니다!

## 2.x 구문

Vue 2.x에서는, 다중 루트 컴포넌트는 지원되지 않고 사용자가 실수로 만들었을 경우 경고 메세지를 emit했습니다.  그 결과 이 오류를 해결하기 위해 많은 컴포넌트가 하나의 `<div>`로 감싸게 됐습니다.

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

이제 3.x 에서는 컴포넌트가 다중 루트 노드(*multiple root node)를 가질 수 있습니다! 하지만, 개발자가 속성을 분배해야 하는 위치를 명시적으로 정의해야 합니다.

```html
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

속성 상속이 어떻게 작동하는지 더 알고 싶다면 [Non-Prop Attributes](/guide/component-attrs.html)을 확인하세요.
