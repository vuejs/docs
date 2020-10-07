---
title: \`emits\` option
badges:
  - new
---

# `emits` Option <MigrationBadges :badges="$frontmatter.badges" />

## Overview

Vue 3 now offers an `emits` option similar to the existing `props` option. This option can be used to define the events that a component can emit to its parent.

## 2.x Syntax

In Vue 2, you can define the props that a component received, but you can't define which ebents it can emit:

```javascript
<template>
  <p>{{ text }}</p>
  <button v-on:click="$emit('accepted')">OK</button>
</template>
<script>
  export default {
    props: ['text'],
  }
</script>
```

## 3.x Syntax

Similar to props, the events that the component emit can now be defined with the `emits` option.

```javascript
<template>
  <p>{{ text }}</p>
  <button v-on:click="$emit('accepted')">OK</button>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted']
  }
</script>
```

The option also excepts an object notation, which allows to define validators for the arguments that have passed with the emitted event, similar to validators in props definitions.

For more Information on this, please read the [API documentation for this feature](../api/options-data.md#emits).

## Migration Strategy

Even though this is the new optional feature, it is highly recommended that you document all of the emitted events of your components this way because of the [removal of the `.native` modifier](./native-modifier-removed.md).

All events not defined with `emits` are now added as DOM event listeners to the components root node (unless `inheritAttrs: false` has been set).

## See also

- [Relevant RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0030-emits-option.md)
- [Migration guide - `$listeners` removed](/.listeners-removed.md)
- [Migration guide - `.native` modifier removed](./native-modifier-removed.md)
- [Migration guide - Changes in the Render Functions API](./render-functions.md)
