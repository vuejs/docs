---
title: v-on.native 수정자가 제거 되었습니다. 
badges:
  - breaking
---

# `v-on.native` 수정자가 제거되었습니다. <MigrationBadges :badges="$frontmatter.badges" />

## 개요

`v-on`에서 사용하던  `.native` 수정자(modifier)가 제거 되었습니다.

## 2.x 문법

Event listeners passed to a component with `v-on` are by default only triggered by emitting an event with `this.$emit`. To add a native DOM listener to the child component's root element instead, the `.native` modifier can be used:


`v-on`을 사용하여 컴포넌트에 전달 된 이벤트 리스너는 기본적으로 `this.$emit`을 사용하여 이벤트를 생성해야만 트리거됩니다. 대신 네이티브 DOM 리스너를 하위 컴포넌트의 루트 요소에 추가하려면 `.native` 수정자를 사용할 수 있습니다:

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click.native="handleNativeClickEvent"
/>
```

## 3.x 문법

`v-on`에서 사용하던  `.native` 수정자(modifier)가 제거 되었습니다. 동시에 [새로운 `emits` 옵션](./emits-option.md)이 하위 컴포넌트가 실제로 어떤 이벤트를 발송할지를 정의할수 있습니다. 

Consequently, Vue will now add all event listeners that are _not_ defined as component-emitted events in the child as native event listeners to the child's root element (unless `inheritAttrs: false` has been set in the child's options).


결과적으로 Vue는 하위 컴포넌트의 루트 엘리먼트에 모든 이벤트 리스너를 추가 할수 있습니다. 이 이벤트 리스너는 하위 컴포넌트에서 컴포넌트-발신 이벤트로 정의되지 않은 모든 이벤트를 네이티트 이벤트 처럼 수신할수 있게해줍니다.(자식의 옵션에`inheritAttrs : false '가 설정되지 않은 경우).

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```

`MyComponent.vue`

```html
<script>
  export default {
    emits: ['close']
  }
</script>
```

## 이전 전략

- 모든 인스턴스의  `.native` 수정자를 제거
- 모든 컴포넌트가 발신하는 이벤트를 `emits` 옵션에 기술할것


## 더 찾아볼것

- [관련된  RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md#v-on-listener-fallthrough)
- [이전 가이드 - 새로운 emit 옵션](./emits-option.md)
- [이전 가이드 - `$listeners` 제거됨](./listeners-removed.md)
- [이전 가이드 - render 함수 API의 변경 사항](./render-function-api.md)
