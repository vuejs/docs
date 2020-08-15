---
badges:
  - new
---

# Fragments <MigrationBadges :badges="$frontmatter.badges" />

## Overview

In Vue 3, components now have official support for multi-root node components, i.e., fragments!

## 2.x Syntax

In 2.x, multi-root components were not supported and would emit a warning when a user accidentally created one. As a result, many components are wrapped in a single `<div>` in order to fix this error.

```html
<!-- Layout.vue -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

## 3.x Syntax

In 3.x, components now can have multiple root nodes! However, this does require developers to explicitly define where attributes should be distributed.

```html
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

For more information on how attribute inheritance works, see [Non-Prop Attributes](/guide/component-attrs.html).
