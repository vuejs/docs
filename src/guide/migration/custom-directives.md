---
badges:
  - breaking
---

# Custom Directives <MigrationBadges :badges="$frontmatter.badges" />

## Overview

The hook functions for directives have been renamed to better align with the component lifecycle.

## 2.x Syntax

In Vue 2, custom directives were created by using the hooks listed below to target an element’s lifecycle, all of which are optional:

- **bind** - Occurs once the directive is bound to the element. Occurs only once.
- **inserted** - Occurs once the element is inserted into the parent DOM.
- **update** - This hook is called when the element updates, but children haven't been updated yet.
- **componentUpdated** - This hook is called once the component and the children have been updated.
- **unbind** - This hook is called once the directive is removed. Also called only once.

Here’s an example of this:

```html
<p v-highlight="'yellow'">Highlight this text bright yellow</p>
```

```js
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

Here, in the initial setup for this element, the directive binds a style by passing in a value, that can be updated to different values through the application.

## 3.x Syntax

In Vue 3, however, we’ve created a more cohesive API for custom directives. As you can see, they differ greatly from our component lifecycle methods even though we’re hooking into similar events. We’ve now unified them like so:

- **created** - new! This is called before the element's attributes or event listeners are applied.
- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**: new! This is called before the element itself is updated, much like the component lifecycle hooks.
- update → removed! There were too many similarities to updated, so this is redundant. Please use updated instead.
- componentUpdated → **updated**
- **beforeUnmount**: new! Similar to component lifecycle hooks, this will be called right before an element is unmounted.
- unbind -> **unmounted**

The final API is as follows:

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {}, // new
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
```

The resulting API could be used like this, mirroring the example from earlier:

```html
<p v-highlight="'yellow'">Highlight this text bright yellow</p>
```

```js
const app = Vue.createApp({})

app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

Now that the custom directive lifecycle hooks mirror those of the components themselves, they become easier to reason about and remember!

### Edge Case: Accessing the component instance

It's generally recommended to keep directives independent of the component instance they are used in. Accessing the instance from within a custom directive is often a sign that the directive should rather be a component itself. However, there are situations where this actually makes sense.

In Vue 2, the component instance had to be accessed through the `vnode` argument:

```javascript
bind(el, binding, vnode) {
  const vm = vnode.context
}
```

In Vue 3, the instance is now part of the `binding`:

```javascript
mounted(el, binding, vnode) {
  const vm = binding.instance
}
```

:::warning
With [fragments](/guide/migration/fragments.html#overview) support, components can potentially have more than one root node. When applied to a multi-root component, a directive will be ignored and a warning will be logged.
:::
