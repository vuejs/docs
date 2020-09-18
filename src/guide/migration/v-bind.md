---
title: v-bind Merge Behavior
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

In Vue 2, individual bindings always overwrites `v-bind="object"` bindings when used on the same element. In Vue 3, the order of the bindings will affect the rendering result:

```html
<!-- template -->
<div id="foo" v-bind="{ id: 'bar' }"></div>
<!-- result -->
<div id="bar"></div>

<!-- template -->
<div v-bind="{ id: 'bar' }" id="foo"></div>
<!-- result -->
<div id="foo"></div>
```

This is a minor breaking change, but gives the user more control over the desired merging behavior.
