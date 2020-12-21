---
badges:
- breaking
---

# `key` 속성 <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

- **NEW:** Vue가 고유한 `key`를 자동으로 생성하기 때문에 `v-if`/`v-else`/`v-else-if`에서 더이상 `key`가 필요하지 않습니다.
    - **BREAKING:** 수동으로 `key`를 정할 경우, 각 분기는 반드시 고유한 `key`를 사용해야 합니다. 더이상 의도적으로 동일한 `key`를 사용하여 분기를 강제로 재사용할 수 없습니다.
- **BREAKING:** `<template v-for>`의 `key`는 자식이 아닌 `<template>` 태그에 있어야 합니다.

## 배경

특수한 속성인 `key`는 주로 Vue의 가상 DOM 알고리즘이 노드의 ID를 식별하기 위한 힌트로 사용됩니다. 이를 통해 Vue는 어느 시점에 기존 노드를 가져오고 재사용할 수 있는지, 또 재정렬과 재생성이 필요한 때가 언제인지 파악합니다. 자세한 내용은 다음 섹션을 참고하세요.

- [리스트 렌더링: 상태 유지](/ko-KR/guide/list.html#maintaining-state)
- [API Reference: 특별한 속성들 - `key`](/ko-KR/api/special-attributes.html#key)

## 조건부 분기에서의 key

Vue 2.x에서는 `v-if`/`v-else`/`v-else-if` 분기에 `key`를 사용하도록 권장했습니다.

```html
<!-- Vue 2.x -->
<div v-if="condition" key="yes">Yes</div>
<div v-else key="no">No</div>
```

위의 예제는 Vue 3.x에서도 여전히 유효합니다. 그러나, `v-if`/`v-else`/`v-else-if` 분기에 `key` 속성을 사용하지 않는 것이 좋습니다. 이제 `key`를 정하지 않으면 조건부 분기에 고유한 `key`가 자동으로 생성되기 때문입니다.

```html
<!-- Vue 3.x -->
<div v-if="condition">Yes</div>
<div v-else>No</div>
```

가장 큰 변화는 수동으로 `key`를 정할 때, 각 분기가 반드시 고유한 `key`를 사용해야 한다는 점입니다. 대부분의 경우, 아래와 같이 `key`를 제거할 수 있습니다.

```html
<!-- Vue 2.x -->
<div v-if="condition" key="a">Yes</div>
<div v-else key="a">No</div>

<!-- Vue 3.x (권장 솔루션: key를 제거하세요.) -->
<div v-if="condition">Yes</div>
<div v-else>No</div>

<!-- Vue 3.x (대체 솔루션: key가 항상 고유한지 확인하세요.) -->
<div v-if="condition" key="a">Yes</div>
<div v-else key="b">No</div>
```

## `<template v-for>`와 함께 쓰기

Vue 2.x에서는 `<template>` 태그가 `key`를 가질 수 없었습니다. 대신 각 자식 항목에 `key`를 배치할 수 있었습니다.

```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div :key="item.id">...</div>
  <span :key="item.id">...</span>
</template>
```

Vue 3.x에서는 `key`가 `<template>` 태그에 있어야 합니다.

```html
<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

이와 마찬가지로, `<template v-for>`가 `v-if`를 사용하는 자식과 함께 있을 때, `key`를 `<template>` 태그까지 끌어 올려야 합니다.

```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div v-if="item.isVisible" :key="item.id">...</div>
  <span v-else :key="item.id">...</span>
</template>

<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div v-if="item.isVisible">...</div>
  <span v-else>...</span>
</template>
```
