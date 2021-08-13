---
badges:
  - breaking
---

# `key` attribute <MigrationBadges :badges="$frontmatter.badges" />

## Overview

- **NEW:** `key`s are no longer necessary on `v-if`/`v-else`/`v-else-if` branches, since Vue now automatically generates unique `key`s.
  - **BREAKING:** If you manually provide `key`s, then each branch must use a unique `key`. You can no longer intentionally use the same `key` to force branch reuse.
- **BREAKING:** `<template v-for>` `key` should be placed on the `<template>` tag (rather than on its children).

## Background

The `key` special attribute is used as a hint for Vue's virtual DOM algorithm to keep track of a node's identity. That way, Vue knows when it can reuse and patch existing nodes and when it needs to reorder or recreate them. For more information, see the following sections:

- [List Rendering: Maintaining State](/guide/list.html#maintaining-state)
- [API Reference: `key` Special Attribute](/api/special-attributes.html#key)

## On conditional branches

In Vue 2.x, it was recommended to use `key`s on `v-if`/`v-else`/`v-else-if` branches.

```vue-html
<!-- Vue 2.x -->
<div v-if="condition" key="yes">Yes</div>
<div v-else key="no">No</div>
```

The example above still works in Vue 3.x. However, we no longer recommend using the `key` attribute on `v-if`/`v-else`/`v-else-if` branches, since unique `key`s are now automatically generated on conditional branches if you don't provide them.

```vue-html
<!-- Vue 3.x -->
<div v-if="condition">Yes</div>
<div v-else>No</div>
```

The breaking change is that if you manually provide `key`s, each branch must use a unique `key`. In most cases, you can remove these `key`s.

```vue-html
<!-- Vue 2.x -->
<div v-if="condition" key="a">Yes</div>
<div v-else key="a">No</div>

<!-- Vue 3.x (recommended solution: remove keys) -->
<div v-if="condition">Yes</div>
<div v-else>No</div>

<!-- Vue 3.x (alternate solution: make sure the keys are always unique) -->
<div v-if="condition" key="a">Yes</div>
<div v-else key="b">No</div>
```

## With `<template v-for>`

In Vue 2.x, a `<template>` tag could not have a `key`. Instead, you could place the `key`s on each of its children.

```vue-html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div :key="'heading-' + item.id">...</div>
  <span :key="'content-' + item.id">...</span>
</template>
```

In Vue 3.x, the `key` should be placed on the `<template>` tag instead.

```vue-html
<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

Similarly, when using `<template v-for>` with a child that uses `v-if`, the `key` should be moved up to the `<template>` tag.

```vue-html
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
