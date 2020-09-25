---
badges:
  - breaking
---

# Slots Unification <MigrationBadges :badges="$frontmatter.badges" />

## Overview

This change unifies normal and scoped slots in 3.x.

Here is a quick summary of what has changed:

- `this.$slots` now exposes slots as functions
- **BREAKING**: `this.$scopedSlots` is removed

For more information, read on!

## 2.x Syntax

When using the render function, i.e., `h`, 2.x used to define the `slot` data property on the content nodes.

```js
// 2.x Syntax
h(LayoutComponent, [
  h('div', { slot: 'header' }, this.header),
  h('div', { slot: 'content' }, this.content)
])
```

In addition, when referencing scoped slots, they could be referenced using the following syntax:

```js
// 2.x Syntax
this.$scopedSlots.header
```

## 3.x Syntax

In 3.x, slots are defined as children of the current node as an object:

```js
// 3.x Syntax
h(LayoutComponent, {}, {
  header: () => h('div', this.header),
  content: () => h('div', this.content)
})
```

And when you need to reference scoped slots programmatically, they are now unified into the `$slots` option.

```js
// 2.x Syntax
this.$scopedSlots.header

// 3.x Syntax
this.$slots.header()
```

## Migration Strategy

A majority of the change has already been shipped in 2.6. As a result, the migration can happen in one step:

1. Replace all `this.$scopedSlots` occurrences with `this.$slots` in 3.x.
2. Replace all occurrences of `this.$slots.mySlot` with `this.$slots.mySlot()`
