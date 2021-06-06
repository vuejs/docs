---
badges:
  - breaking
---

# Transition as Root <MigrationBadges :badges="$frontmatter.badges" />

## Overview

Using a `<transition>` as a component's root will no longer trigger transitions when the component is toggled from the outside.

## 2.x Behavior

In Vue 2, it was possible to trigger a transition from outside a component by using a `<transition>` as the component's root:

```html
<!-- modal component -->
<template>
  <transition>
    <div class="modal"><slot/></div>
  </transition>
</template>
```

```html
<!-- usage -->
<modal v-if="showModal">hello</modal>
```

Toggling the value of `showModal` would trigger a transition inside the modal component.

This worked by accident, not by design. A `<transition>` is supposed to be triggered by changes to its children, not by toggling the `<transition>` itself.

This quirk has now been removed.

## Migration Strategy

A similar effect can be achieved by passing a prop to the component instead:

```vue
<template>
  <transition>
    <div v-if="show" class="modal"><slot/></div>
  </transition>
</template>
<script>
export default {
  props: ['show']
}
</script>
```

```html
<!-- usage -->
<modal :show="showModal">hello</modal>
```

## See also

- [Some transition classes got a rename](/guide/migration/transition.html)
- [`<TransitionGroup>` now renders no wrapper element by default](/guide/migration/transition-group.html)
