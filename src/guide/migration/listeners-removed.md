---
title: $listeners removed
badges:
  - breaking
---

# `$listeners` removed <MigrationBadges :badges="$frontmatter.badges" />

## Overview

The `$listeners` object has been removed in Vue 3. Event listeners are now part of `$attrs`:

```javascript
{
  text: 'this is an attribute',
  onClose: () => console.log('close Event triggered')
}
```

## 2.x Syntax

In Vue 2, you can access attributes passed to your components with `this.$attrs`, and event listeners with `this.$listeners`.
In combination with `inheritAttrs: false`, they allow the developer to apply these attributes and listeners to some other element instead of the root element:

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

## 3.x Syntax

In Vue 3's virtual DOM, event listeners are now just attributes, prefixed with `on`, and as such are part of the `$attrs` object, so `$listeners` has been removed.

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

If this component received an `id` attribute and a `v-on:close` listener, the `$attrs` object will now look like this:

```javascript
{
  id: 'my-input',
  onClose: () => console.log('close Event triggered')
}
```

## Migration Strategy

Remove all usages of `$listeners`.

## See also

- [Relevant RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [Migration guide - `$attrs`includes `class` & `style` ](./attrs-includes-class-style.md)
- [Migration guide - Changes in the Render Functions API](./render-function-api.md)
- [Migration guide - New Emits Option](./emits-option.md)
- [Migration guide - `.native` modifier removed](./v-on-native-modifier-removed.md)
