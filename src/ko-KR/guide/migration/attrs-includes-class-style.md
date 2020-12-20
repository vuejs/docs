---
title: class와 style이 포함된 $attrs
badges:
  - breaking
---

# `class`와 `style`이 포함된 `$attrs` <MigrationBadges :badges="$frontmatter.badges" />

## 개요

`$attrs`는 이제 `class`와 `style`를 포함하여, 컴포넌트에 전달되는 _모든_ 속성을 포함합니다.

## 2.x 동작

`class`와 `style` 속성은 Vue 2 가상 DOM 구현에서 특별한 몇몇 핸들링을 가집니다. 따라서 위 속성들은 `$attrs`에 포함되지 않지만, 다른 _모든_ 속성들은 포함됩니다.

`inheritAttrs: false`를 사용할 때, 이 참조의 사이드이펙트는 다음과 같습니다:

- `$attrs`의 속성은 더이상 루트 엘리먼트에 자동으로 추가되지 않으므로, 개발자가 추가할 위치를 결정할 수 있습니다..
- 그러나 `$attrs`의 일부가 아닌 `class`와 `style`은 컴포넌트의 루트 엘리먼트에 계속 적용됩니다:

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

이렇게 사용하면:

```html
<my-component id="my-id" class="my-class"></my-component>
```

...이러한 HTML을 생성합니다:

```html
<label class="my-class">
  <input type="text" id="my-id" />
</label>
```

## 3.x 동작

`$attrs`는 _모든_ 속성이 포함되어있어, 모든 속성을 다른 엘리먼트에 더 쉽게 적용할 수 있습니다. 위의 예는 다음 HTML을 생성합니다:

```html
<label>
  <input type="text" id="my-id" class="my-class" />
</label>
```

## 마이그레이션 방법

`inheritAttrs: false`을 사용하는 컴포넌트에서, 스타일이 의도한대로 계속 작동하는지 확인하세요. 이전에 `class`와 `style`이 특수한 동작에 의존했다면, 이러한 속성이 이제 다른 엘리먼트에 적용될 수 있으므로, 눈에 보이는 부분의 일부가 손상될 수 있습니다.

## See also

- [Relevant RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [Migration guide - `$listeners` removed](./listeners-removed.md)
- [Migration guide - New Emits Option](./emits-option.md)
- [Migration guide - `.native` modifier removed](./v-on-native-modifier-removed.md)
- [Migration guide - Changes in the Render Functions API](./render-function-api.md)
