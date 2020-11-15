---
badges:
- breaking
---

# 인라인 템플릿 속성(Inline Template Attribute) <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

[인라인 템플릿 기능(inline-template feature)](https://vuejs.org/v2/guide/components-edge-cases.html#Inline-Templates)에 대한 지원이 제거되었습니다.

## 2.x 문법

2.x에서 Vue는 하위 컴포넌트에 `인라인 템플릿(inline-template)` 속성을 제공하여, 내부 컨텐츠를 분산된 컨텐츠로 취급하는 대신 템플릿으로 사용하였습니다.

```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

## 3.x 문법

이 기능은 더이상 지원되지 않습니다.

## 마이그레이션 방법

`인라인 템플릿(inline-template)`에 대한 대부분의 사용 사례는 모든 템플릿이 HTML 페이지 내부에 직접 작성되는 빌드 도구가 없다고 가정합니다.

### 옵션 #1: `<script>` 태그 사용

이러한 경우에 가장 간단한 해결 방법은 `<script>`를 대체 타입과 함께 사용하는 것입니다:

```js
<script type="text/html" id="my-comp-template">
  <div>{{ hello }}</div>
</script>
```

컴포넌트에서 선택자를 사용하여 템플릿을 대상으로 지정합니다:

```js
const MyComp = {
  template: '#my-comp-template'
  // ...
}
```

이는 빌드설정이 필요하지 않고 모든 브라우저에서 작동하며 DOM 내 HTML 파싱 경고(예: camelCase prop명 사용가능)가 적용되지 않으며 대부분의 IDE에서 적절한 구문 하이라이팅을 제공합니다. 전통적인 서버측 프레임워크에서 이러한 템플릿은 더 나은 유지관리를 위해 서버 템플릿 부분(server template partials, 기본 HTML 템플릿 포함됨)으로 분할 될 수 있습니다.

### 옵션 #2: 기본 슬롯(Default Slot)

이전에 `inline-template`을 사용했던 컴포넌트는 기본 슬롯을 사용하여 리펙토링할수도 있습니다. 따라서 하위 컨텐츠를 인라인으로 작성하는 편의성을 유지하면서 데이터의 범위를 보다 명확하게 지정할 수 있습니다:

```html
<!-- 2.x 문법 -->
<my-comp inline-template :msg="parentMsg">
  {{ msg }} {{ childState }}
</my-comp>

<!-- 기본 슬롯 버전 -->
<my-comp v-slot="{ childState }">
  {{ parentMsg }} {{ childState }}
</my-comp>
```

이제 자식은 템플릿을 제공하지 않는 대신 기본 슬롯(default slot*)을 렌더링해야 합니다:

```html
<!--
  자식 템플릿에서 자식의 필요한 개인 상태를 전달하면서 기본 슬롯을 렌더링합니다.
-->
<template>
  <slot :childState="childState" />
</template>
```

> - 참고: 3.x에서는 기본 [fragments](/guide/migration/fragments) 지원을 통해 슬롯을 루트로 렌더링할 수 있습니다!
