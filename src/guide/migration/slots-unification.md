# Slots Unification

## Overview

This change unifies normal and scoped slots in v3.

Here is a quick summary of what has changed:

- `this.$slots` now exposes slots as functions
- **BREAKING**: `this.$scopedSlots` is removed

For more information, read on!

## Previous Syntax

When using the render function, i.e., `h`, v2 used to define the `slot` data property on the content nodes.

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

## Current Syntax

In v3, render functions will have a `slots` option where they can be defined instead.

```js
// 3.x Syntax
h(LayoutComponent, {
  slots: {
    header: () => h('div', this.header),
    content: () => h('div', this.content)
  }
})
```

And when you need to reference scoped slots programmatically, they are now unified into the `$slots` option.

```js
// 2.x Syntax
this.$scopedSlots.header

// 3.x Syntax
this.$slots.header
```

## Migration Strategy

A majority of the change has already been shipped in 2.6. As a result, the migration can happen in one step:

1. Replace all `this.$scopedSlots` occurrences with `this.$slots` in v3.
