---
types:
  - breaking
  - removal
---

# Inline Template Attribute

## Overview

Support for the [inline-template feature](https://vuejs.org/v2/guide/components-edge-cases.html#Inline-Templates) has been removed.

## 2.x Syntax

In 2.x, Vue provided the `inline-template` attribute on child components to use its inner content as its template instead of treating it as distributed content.

```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

## 3.x Syntax

This feature will no longer be supported.

## Migration Strategy

Most of the use cases for `inline-template` assumes a no-build-tool setup, where all templates are written directly inside the HTML page.

### Option #1: Use `<script>` tag

The most straightforward workaround in such cases is using `<script>` with an alternative type:

```js
<script type="text/html" id="my-comp-template">
  <div>{{ hello }}</div>
</script>
```

And in the component, target the template using a selector:

```js
const MyComp = {
  template: '#my-comp-template'
  // ...
}
```

This doesn't require any build setup, works in all browsers, is not subject to any in-DOM HTML parsing caveats (e.g. you can use camelCase prop names), and provides proper syntax highlighting in most IDEs. In traditional server-side frameworks, these templates can be split out into server template partials (included into the main HTML template) for better maintainability.

### Option #2: Default Slot

A component previously using `inline-template` can also be refactored using the default slot - which makes the data scoping more explicit while preserving the convenience of writing child content inline:

```html
<!-- 2.x Syntax -->
<my-comp inline-template :msg="parentMsg">
  {{ msg }} {{ childState }}
</my-comp>

<!-- Default Slot Version -->
<my-comp v-slot="{ childState }">
  {{ parentMsg }} {{ childState }}
</my-comp>
```

The child, instead of providing no template, should now render the default slot*:

```html
<!--
  in child template, render default slot while passing
  in necessary private state of child.
-->
<template>
  <slot :childState="childState" />
</template>
```

> * Note: In 3.x, slots can be rendered as the root with native [fragments](/guide/migration/fragments) support!
