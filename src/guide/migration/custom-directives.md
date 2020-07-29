---
badges:
  - breaking
---

# Custom Directives <MigrationBadges :badges="$frontmatter.badges" />

## Overview

Here is a quick summary of what has changed:

- API has been renamed to better align with component lifecycle
- Custom directives will be controlled by child component via `v-bind="$attrs"`

For more information, read on!

## 2.x Syntax

In Vue 2, custom directives were created by using the hooks listed below to target an element’s lifecycle, all of which are optional:

- **bind** - Occurs once the directive is bound to the element. Occurs only once.
- **inserted** - Occurs once the element is inserted into the parent DOM.
- **update** - This hook is called when the element updates, but children haven't been updated yet.
- **componentUpdated** - This hook is called once the component and the children have been updated.
- **unbind** - This hook is called once the directive is removed. Also called only once.

Here’s an example of this:

```html
<p v-highlight="yellow">Highlight this text bright yellow</p>
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

- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**: new! this is called before the element itself is updated, much like the component lifecycle hooks.
- update → removed! There were too many similarities to updated, so this is redundant. Please use updated instead.
- componentUpdated → **updated**
- **beforeUnmount** new! similar to component lifecycle hooks, this will be called right before an element is unmounted.
- unbind -> **unmounted**

The final API is as follows:

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
```

The resulting API could be used like this, mirroring the example from earlier:

```html
<p v-highlight="yellow">Highlight this text bright yellow</p>
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

## Implementation Details

In Vue 3, we're now supporting fragments, which allow us to return more than one DOM node per component. You can imagine how handy that is for something like a component with multiple lis or the children elements of a table:

```html
<template>
  <li>Hello</li>
  <li>Vue</li>
  <li>Devs!</li>
</template>
```

As wonderfully flexible as this is, we can potentially encounter a problem with a custom directive that could have multiple root nodes.

As a result, custom directives are now included as part of a virtual DOM node’s data. When a custom directive is used on a component, hooks are passed down to the component as extraneous props and end up in `this.$attrs`.

This also means it's possible to directly hook into an element's lifecycle like this in the template, which can be handy when a custom directive is too involved:

```html
<div @vnodeMounted="myHook" />
```

This is consistent with the attribute fallthrough behavior, so when a child component uses `v-bind="$attrs"` on an inner element, it will apply any custom directives used on it as well.
