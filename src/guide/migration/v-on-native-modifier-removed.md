---
title: v-on.native modifier removed
badges:
  - breaking
---

# `v-on.native` modifier removed <MigrationBadges :badges="$frontmatter.badges" />

## Overview

The `.native` modifier for `v-on` has been removed.

## 2.x Syntax

Event listeners passed to a component with `v-on` are by default only triggered by emitting an event with `this.$emit`. To add a native DOM listener to the child component's root element instead, the `.native` modifier can be used:

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click.native="handleNativeClickEvent"
/>
```

## 3.x Syntax

The `.native` modifier for `v-on` has been removed. At the same time, the [new `emits` option](./emits-option.md) allows the child to define which events it does indeed emit.

Consequently, Vue will now add all event listeners that are _not_ defined as component-emitted events in the child as native event listeners to the child's root element (unless `inheritAttrs: false` has been set in the child's options).

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

## Migration Strategy

- remove all instances of the `.native` modifier.
- ensure that all your components document their events with the `emits` option.

## See also

- [Relevant RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md#v-on-listener-fallthrough)
- [Migration guide - New Emits Option](./emits-option.md)
- [Migration guide - `$listeners` removed](./listeners-removed.md)
- [Migration guide - Changes in the Render Functions API](./render-function-api.md)
