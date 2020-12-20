---
title: $listeners 제거됨
badges:
  - breaking
---

# `$listeners` 제거됨 <MigrationBadges :badges="$frontmatter.badges" />

## 개요

Vue 3에서 `$listeners` 객체가 제거되었습니다. 모든 리스너는 이제 `$attrs`의 일부가 되었습니다:

```javascript
{
  text: 'this is an attribute',
  onClose: () => console.log('close Event triggered')
}
```

## 2.x 문법

Vue 2에서는 `this.$attrs`를 사용하여 컴포넌트에 전달된 속성과 `this.$listeners`를 사용하여 이벤트 리스너에 접근할 수 있습니다.
`inheritAttrs: false`와 함께 사용하면 개발자가 이러한 속성 및 리스너를 루트 엘리먼트 대신에 다른 엘리먼트에 적용할 수 있습니다:

```html
<template>
  <label>
    <input type="text" v-bind="$attrs" v-on="$listeners" />
  </label>
</template>
<script>
  export default {
    inheritAttrs: false
  }
</script>
```

## 3.x 문법

Vue 3의 가상 DOM에서 이벤트 리스너는 이제 `on` 접두사가 붙은 속성이며, `attrs` 객체의 일부이므로 $listeners는 제거되었습니다.

```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

이 컴포넌트가 `id` 속성과 `v-on:close` 리스너를 수신하는 경우에는 `$attrs` 객체는 다음과 같습니다:

```javascript
{
  id: 'my-input',
  onClose: () => console.log('close Event triggered')
}
```

## 마이그레이션 방법

모든 `$listeners`를 지웁니다.

## 참고

- [관련 RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [마이그레이션 가이드 - `class`와 `style`이 포함된 `$attrs` ](./attrs-includes-class-style.md)
- [Migration guide - Render Functions API의 변경사항](./render-function-api.md)
- [Migration guide - 새로운 Emits 옵션](./emits-option.md)
- [Migration guide - `.native` 수식어 제거](./v-on-native-modifier-removed.md)
