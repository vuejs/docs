---
title: emits 옵션
badges:
  - new
---

# `emits` 옵션 <MigrationBadges :badges="$frontmatter.badges" />

## 개요

Vue 3은 이제 기존 `props`옵션과 유사한 `emits`옵션을 제공합니다. 이 옵션은 컴포넌트가 부모에게 emit할 수 있는 이벤트를 정의하는데 사용할 수 있습니다.

## 2.x 동작

Vue 2에서는 컴포넌트가 받는 props를 정의할 수 있지만, 어떤 이벤트를 emit할 수 있는지 선언할 수 없습니다:

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text']
  }
</script>
```

## 3.x 동작

props와 유사하게 컴포넌트가 생성하는 이벤트는 이제 `emits` 옵션으로 정의할 수 있습니다.:

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted']
  }
</script>
```

이 옵션은 또한 `props`에 정의된 validator와 유사하게, emit된 이벤트와 함께 전달되는 인자에 대한 validator를 개발자가 정의할 수 있도록 객체를 허용합니다.

이에 대한 자세한 내용은 [API documentation for this feature](../../api/options-data.md#emits) 문서를 읽어주세요.

## 마이그레이션 방법

`emits`를 사용하며 각 컴포넌트에서 내보낸 모든 이벤트를 문서화하는 것이 좋습니다.

이는 [`.native` 지시어가 제거](./v-on-native-modifier-removed.md)되었기 때문에 특히 중요합니다. 이제 `emits`로 선언되지 않은 이벤트의 모든 리스너는 컴포넌트의 `$attrs`에 포함되며, 기본적으로 컴포넌트의 루트 노드에 바인딩됩니다.

### 예시

네이티브 이벤트를 부모에게 다시 내보내는 컴포넌트의 경우 이제 2가지 이벤트가 발생합니다:

```vue
<template>
  <button v-on:click="$emit('click', $event)">OK</button>
</template>
<script>
export default {
  emits: [] // 선언된 event 없이
}
</script>
```

부모가 컴포넌트에서 `click` 이벤트를 받는 경우:

```html
<my-button v-on:click="handleClick"></my-button>
```

이제 _두 번_ 트리거됩니다:

- `$emit()`에서 한번.
- 루트 엘리먼트에 적용된 네이티브 이벤트 리스너에서 한 번.

여기 2가지 옵션이 있습니다:

1. `click` 이벤트를 올바르게 선언하세요. 이는 실제로 `<my-button>`에서 해당 이벤트 핸들러에 로직을 추가하는 경우에 유용합니다.
2. 이제 부모가 `.native`를 추가하지 않고도 네이티브 이벤트를 쉽게 수신할 수 있으므로, 이벤트의 재방출(re-emit)을 제거합니다. 어쨌든 이벤트를 실제로 다시 내보낼 때 적합합니다.

## 참고

- [관련 RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0030-emits-option.md)
- [마이그레이션 가이드 - `.native` 수식어 제거](./v-on-native-modifier-removed.md)
- [마이그레이션 가이드 - `$listeners` 제거](./listeners-removed.md)
- [마이그레이션 가이드 - `class`와 `style`이 포함된 `$attrs`](./attrs-includes-class-style.md)
- [마이그레이션 가이드 - Render Functions API 변경사항](./render-function-api.md)
