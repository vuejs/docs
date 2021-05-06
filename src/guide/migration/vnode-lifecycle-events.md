---
badges:
  - breaking
---

# VNode 생명주기(life cycle) 이벤트 <MigrationBadges :badges="$frontmatter.badges" />

## 개요

Vue 2 에서는 이벤트를 사용하여 컴포넌트 생명주기의 주요 단계를 수신 할 수 있었습니다. 이 이벤트들은 `hook:` 이라는 접두사로 시작하고, 뒤에는 생명주기 훅 이름을 사용했습니다.

Vue 3 에서는 접두사가 `vnode-` 로 시작하며, 컴포넌트뿐만 아니라 HTML 요소에도 사용이 가능합니다.

## 2.x 구문

Vue 2 에서, 이벤트명은 `hook:` 접두사가 붙은 생명주기 훅과 같습니다.

```html
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

## 3.x 구문

Vue 3 에서, 이벤트명은 `vnode-` 접두사로 시작합니다.

```html
<template>
  <child-component @vnode-updated="onUpdated">
</template>
```

또는 `vnode` 카멜케이스(camelCase) 사용도 가능합니다 :

```html
<template>
  <child-component @vnodeUpdated="onUpdated">
</template>
```

## 마이그레이션 전략

대부분의 경우 접두사만 변경하면 됩니다. 생명주기 훅 `beforeDestroy` 와 `destroyed` 는 `beforeUnmount` 와 `unmounted` 로 변경되었으므로 해당 이벤트 이름도 변경을 해줘야 합니다.

## 참고

- [Migration guide - Events API](/guide/migration/events-api.html)
