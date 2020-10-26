---
title: v-bind 병합 동작
badges:
- breaking
---

# {{ $frontmatter.title }} <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

- **BREAKING**: v-bind의 바인딩 순서는 렌더링 결과에 영향을 미칩니다.

## 서론

엘리먼트 속성을 동적으로 바인딩하는 일반적인 사례로, 동일한 엘리먼트에 `v-bind="object"` 구문과 함께 개별 속성을 사용하는 경우가 있습니다. 그러나, 이는 병합 우선순위에 관한 의문을 불러일으킵니다.

## 2.x 구문

2.x에서는 엘리먼트에 `v-bind="object"`, 그리고 이와 동일한 개별 속성이 모두 정의된 경우, 개별 속성이 항상 `object`의 바인딩을 덮어쓰게 됩니다.

```html
<!-- template -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- result -->
<div id="red"></div>
```

## 3.x 구문

3.x에서는 엘리먼트에 `v-bind="object"`, 그리고 이와 동일한 개별 속성이 모두 정의된 경우, 바인딩 선언 순서에 따라 병합 방법이 결정됩니다. 다시 말해, 개발자 여러분이 항상 `object`에 정의된 것을 덮어쓰기 위해 개별 속성을 사용하던 상황 대신, 이제 여러분이 원하는 대로 병합 동작을 제어할 수 있게 되었음을 의미합니다.

```html
<!-- template -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- result -->
<div id="blue"></div>

<!-- template -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- result -->
<div id="red"></div>
```

## 마이그레이션 방법

`v-bind` 내용을 덮어쓰려는 경우, `v-bind` 속성을 개별 속성보다 먼저 선언했는지 확인해 보세요.
