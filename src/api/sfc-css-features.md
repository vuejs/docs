# SFC CSS Features {#sfc-css-features}

## Scoped CSS {#scoped-css}

When a `<style>` tag has the `scoped` attribute, its CSS will apply to elements of the current component only. This is similar to the style encapsulation found in Shadow DOM. It comes with some caveats, but doesn't require any polyfills. It is achieved by using PostCSS to transform the following:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

Into the following:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### Child Component Root Elements {#child-component-root-elements}

With `scoped`, the parent component's styles will not leak into child components. However, a child component's root node will be affected by both the parent's scoped CSS and the child's scoped CSS. This is by design so that the parent can style the child root element for layout purposes.

### Deep Selectors {#deep-selectors}

If you want a selector in `scoped` styles to be "deep", i.e. affecting child components, you can use the `:deep()` pseudo-class:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

The above will be compiled into:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
DOM content created with `v-html` are not affected by scoped styles, but you can still style them using deep selectors.
:::

### Slotted Selectors {#slotted-selectors}

By default, scoped styles do not affect contents rendered by `<slot/>`, as they are considered to be owned by the parent component passing them in. To explicitly target slot content, use the `:slotted` pseudo-class:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### Global Selectors {#global-selectors}

If you want just one rule to apply globally, you can use the `:global` pseudo-class rather than creating another `<style>` (see below):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### Mixing Local and Global Styles {#mixing-local-and-global-styles}

You can also include both scoped and non-scoped styles in the same component:

```vue
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>
```

### Scoped Style Tips {#scoped-style-tips}

- **Scoped styles do not eliminate the need for classes**. Due to the way browsers render various CSS selectors, `p { color: red }` will be many times slower when scoped (i.e. when combined with an attribute selector). If you use classes or ids instead, such as in `.example { color: red }`, then you virtually eliminate that performance hit.

- **Be careful with descendant selectors in recursive components!** For a CSS rule with the selector `.a .b`, if the element that matches `.a` contains a recursive child component, then all `.b` in that child component will be matched by the rule.

## CSS Modules {#css-modules}

A `<style module>` tag is compiled as [CSS Modules](https://github.com/css-modules/css-modules) and exposes the resulting CSS classes to the component as an object under the key of `$style`:

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

The resulting classes are hashed to avoid collision, achieving the same effect of scoping the CSS to the current component only.

Refer to the [CSS Modules spec](https://github.com/css-modules/css-modules) for more details such as [global exceptions](https://github.com/css-modules/css-modules#exceptions) and [composition](https://github.com/css-modules/css-modules#composition).

### Custom Inject Name {#custom-inject-name}

You can customize the property key of the injected classes object by giving the `module` attribute a value:

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### Usage with Composition API {#usage-with-composition-api}

The injected classes can be accessed in `setup()` and `<script setup>` via the `useCssModule` API. For `<style module>` blocks with custom injection names, `useCssModule` accepts the matching `module` attribute value as the first argument:

```js
import { useCssModule } from 'vue'

// inside setup() scope...
// default, returns classes for <style module>
useCssModule()

// named, returns classes for <style module="classes">
useCssModule('classes')
```

## `v-bind()` in CSS {#v-bind-in-css}

SFC `<style>` tags support linking CSS values to dynamic component state using the `v-bind` CSS function:

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

The syntax works with [`<script setup>`](./sfc-script-setup), and supports JavaScript expressions (must be wrapped in quotes):

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

The actual value will be compiled into a hashed CSS custom property, so the CSS is still static. The custom property will be applied to the component's root element via inline styles and reactively updated if the source value changes.
