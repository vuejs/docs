---
title: $listeners removed
badges:
  - breaking
---

# `$listeners` removed <MigrationBadges :badges="$frontmatter.badges" />

## Overview

the `$listeners` object has been removed in Vue 3. Event Listeners are now part of `$attrs`.

```javascript
{

  text: 'this is a prop',
  onClose: () => console.log('close Event triggered')
}
```

## 2.x Syntax

In Vue 2, you can access attributes passed to your components with `this.$attrs`, and event listeners with `this.$listeners`.

These are usually Used in components that receive the attributes and listeners from its parents passed them on to and distinct element, usually in combination with `inheritAttrs: false`:

```html
<template>
  <label>
    <input type="text" v-bind="$attrs" v-bind="$listeners" />
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

```html
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
- [Migration guide - Changes in the Render Functions API](./render-functions.md)
- [Migration guide - New Emits Option](/.emits-option.md)
- [Migration guide - `.native` modifier removed](./native-modifier-removed.md)
