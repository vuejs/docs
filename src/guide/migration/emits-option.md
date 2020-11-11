---
title: emits Option
badges:
  - new
---

# `emits` Option <MigrationBadges :badges="$frontmatter.badges" />

## Overview

Vue 3 now offers an `emits` option, similar to the existing `props` option. This option can be used to define the events that a component can emit to its parent.

## 2.x Behavior

In Vue 2, you can define the props that a component receives, but you can't declare which events it can emit:

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

## 3.x Behavior

Similar to props, the events that the component emits can now be defined with the `emits` option:

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

The option also accepts an object, which allows the developer to define validators for the arguments that are passed with the emitted event, similar to validators in `props` definitions.

For more information on this, please read the [API documentation for this feature](../../api/options-data.md#emits).

## Migration Strategy

It is highly recommended that you document all of the events emitted by each of your components using `emits`.

This is especially important because of [the removal of the `.native` modifier](./v-on-native-modifier-removed.md). Any listeners for events that aren't declared with `emits` will now be included in the component's `$attrs`, which by default will be bound to the component's root node.

### Example

For components that re-emit native events to their parent, this would now lead to two events being fired:

```vue
<template>
  <button v-on:click="$emit('click', $event)">OK</button>
</template>
<script>
export default {
  emits: [] // without declared event
}
</script>
```

When a parent listens for the `click` event on the component:

```html
<my-button v-on:click="handleClick"></my-button>
```

it would now be triggered _twice_:

- Once from `$emit()`.
- Once from a native event listener applied to the root element.

Here you have two options:

1. Properly declare the `click` event. This is useful if you actually do add some logic to that event handler in `<my-button>`.
2. Remove the re-emitting of the event, since the parent can now listen for the native event easily, without adding `.native`. Suitable when you really only re-emit the event anyway.

## See also

- [Relevant RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0030-emits-option.md)
- [Migration guide - `.native` modifier removed](./v-on-native-modifier-removed.md)
- [Migration guide - `$listeners` removed](./listeners-removed.md)
- [Migration guide - `$attrs` includes `class` & `style`](./attrs-includes-class-style.md)
- [Migration guide - Changes in the Render Functions API](./render-function-api.md)
