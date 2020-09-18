---
title: v-if vs. v-for Precedence
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

The precedence of `v-if` and `v-for` have been flipped when using both on the same element. In Vue 3, `v-if` will always have the higher precedence.

It is recommended to avoid using both on the same element due to the syntax ambiguity. Use separate `<template v-if|for>` containers when both are needed at the same time:

```html
<template v-for="item in items" :key="item.id">
  <div v-if="item.visible">{{ item.text }}</div>
</template>
```
