# Introduction

::: tip New to Vue.js?
Check out our [Essentials Guide](/guide/introduction.html) to get started.
:::

This guide is primarily for users with prior Vue 2 experience who want to learn about the new features and changes in Vue 3. **This is not something you have to read from top to bottom before trying out Vue 3.** While it looks like a lot has changed, a lot of what you know and love about Vue is still the same; but we wanted to be as thorough as possible and provide detailed explanations and examples for every documented change.

- [Quickstart](#quickstart)
- [Migration Build](#migration-build)
- [Notable New Features](#notable-new-features)
- [Breaking Changes](#breaking-changes)
- [Supporting Libraries](#supporting-libraries)

## Overview

<div class="video">
  <iframe class="video-content" src="https://player.vimeo.com/video/440868720" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

Start learning Vue 3 at [Vue Mastery](https://www.vuemastery.com/courses-path/vue3).

## Quickstart

If you want to quickly try out Vue 3 in a new project:

- Via CDN: `<script src="https://unpkg.com/vue@next"></script>`
- In-browser playground on [Codepen](https://codepen.io/yyx990803/pen/OJNoaZL)
- In-browser Sandbox on [CodeSandbox](https://v3.vue.new)
- Scaffold via [Vite](https://github.com/vitejs/vite):

  ```bash
  npm init vite hello-vue3 -- --template vue # OR yarn create vite hello-vue3 --template vue
  ```

- Scaffold via [vue-cli](https://cli.vuejs.org/):

  ```bash
  npm install -g @vue/cli # OR yarn global add @vue/cli
  vue create hello-vue3
  # select vue 3 preset
  ```

## Migration Build

If you have an existing Vue 2 project or library that you intend to upgrade to Vue 3, we provide a build of Vue 3 that offers Vue 2 compatible APIs. Check out the [Migration Build](./migration-build.html) page for more details.

## Notable New Features

Some of the new features to keep an eye on in Vue 3 include:

- [Composition API](/guide/composition-api-introduction.html)
- [Teleport](/guide/teleport.html)
- [Fragments](/guide/migration/fragments.html)
- [Emits Component Option](/guide/component-custom-events.html)
- [`createRenderer` API from `@vue/runtime-core`](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core) to create custom renderers
- [SFC Composition API Syntax Sugar (`<script setup>`)](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md) <Badge text="experimental" type="warning" />
- [SFC State-driven CSS Variables (`v-bind` in `<style>`)](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0043-sfc-style-variables.md) <Badge text="experimental" type="warning" />
- [SFC `<style scoped>` can now include global rules or rules that target only slotted content](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](/guide/migration/suspense.html) <Badge text="experimental" type="warning" />

## Breaking Changes

The following consists a list of breaking changes from 2.x:

### Global API

- [Global Vue API is changed to use an application instance](/guide/migration/global-api.html)
- [Global and internal APIs have been restructured to be tree-shakable](/guide/migration/global-api-treeshaking.html)

### Template Directives

- [`v-model` usage on components has been reworked, replacing `v-bind.sync`](/guide/migration/v-model.html)
- [`key` usage on `<template v-for>` and non-`v-for` nodes has changed](/guide/migration/key-attribute.html)
- [`v-if` and `v-for` precedence when used on the same element has changed](/guide/migration/v-if-v-for.html)
- [`v-bind="object"` is now order-sensitive](/guide/migration/v-bind.html)
- [`v-on:event.native` modifier has been removed](./v-on-native-modifier-removed.md)
- [`ref` inside `v-for` no longer register an array of refs](/guide/migration/array-refs.html)

### Components

- [Functional components can only be created using a plain function](/guide/migration/functional-components.html)
- [`functional` attribute on single-file component (SFC) `<template>` and `functional` component option are deprecated](/guide/migration/functional-components.html)
- [Async components now require `defineAsyncComponent` method to be created](/guide/migration/async-components.html)
- [Component events should now be declared with the `emits` option](./emits-option.md)

### Render Function

- [Render function API changed](/guide/migration/render-function-api.html)
- [`$scopedSlots` property is removed and all slots are exposed via `$slots` as functions](/guide/migration/slots-unification.html)
- [`$listeners` has been removed / merged into `$attrs`](./listeners-removed)
- [`$attrs` now includes `class` and `style` attributes](./attrs-includes-class-style.md)

### Custom Elements

- [Custom element checks are now performed during template compilation](/guide/migration/custom-elements-interop.html)
- [Special `is` prop usage is restricted to the reserved `<component>` tag only](/guide/migration/custom-elements-interop.html#customized-built-in-elements)

### Other Minor Changes

- The `destroyed` lifecycle option has been renamed to `unmounted`
- The `beforeDestroy` lifecycle option has been renamed to `beforeUnmount`
- [Props `default` factory function no longer has access to `this` context](/guide/migration/props-default-this.html)
- [Custom directive API changed to align with component lifecycle and `binding.expression` removed](/guide/migration/custom-directives.html)
- [The `data` option should always be declared as a function](/guide/migration/data-option.html)
- [The `data` option from mixins is now merged shallowly](/guide/migration/data-option.html#mixin-merge-behavior-change)
- [Attributes coercion strategy changed](/guide/migration/attribute-coercion.html)
- [Some transition classes got a rename](/guide/migration/transition.html)
- [`<TransitionGroup>` now renders no wrapper element by default](/guide/migration/transition-group.html)
- [When watching an array, the callback will only trigger when the array is replaced. If you need to trigger on mutation, the `deep` option must be specified.](/guide/migration/watch.html)
- `<template>` tags with no special directives (`v-if/else-if/else`, `v-for`, or `v-slot`) are now treated as plain elements and will result in a native `<template>` element instead of rendering its inner content.
- [Mounted application does not replace the element it's mounted to](/guide/migration/mount-changes.html)
- [Lifecycle `hook:` events prefix changed to `vnode-`](/guide/migration/vnode-lifecycle-events.html)

### Removed APIs

- [`keyCode` support as `v-on` modifiers](/guide/migration/keycode-modifiers.html)
- [$on, $off and \$once instance methods](/guide/migration/events-api.html)
- [Filters](/guide/migration/filters.html)
- [Inline templates attributes](/guide/migration/inline-template-attribute.html)
- [`$children` instance property](/guide/migration/children.html)
- [`propsData` option](/guide/migration/props-data.html)
- `$destroy` instance method. Users should no longer manually manage the lifecycle of individual Vue components.
- Global functions `set` and `delete`, and the instance methods `$set` and `$delete`. They are no longer required with proxy-based change detection.

## Supporting Libraries

All of our official libraries and tools now support Vue 3, but some of them are still in beta or release candidate status. You'll find details for the individual libraries below. Most are currently distributed using the `next` dist tag on npm. We intend to switch to `latest` once all the official libraries have compatible, stable versions.

### Vue CLI

<a href="https://www.npmjs.com/package/@vue/cli" target="_blank" noopener noreferrer><img src="https://img.shields.io/npm/v/@vue/cli"></a>

As of v4.5.0, `vue-cli` now provides the built-in option to choose Vue 3 when creating a new project. You can upgrade `vue-cli` and run `vue create` to create a Vue 3 project today.

- [Documentation](https://cli.vuejs.org/)
- [GitHub](https://github.com/vuejs/vue-cli)

### Vue Router

<a href="https://www.npmjs.com/package/vue-router/v/next" target="_blank" noopener noreferrer><img src="https://img.shields.io/npm/v/vue-router/next.svg"></a>

Vue Router 4.0 provides Vue 3 support and has a number of breaking changes of its own. Check out its [migration guide](https://next.router.vuejs.org/guide/migration/) for full details.

- [Documentation](https://next.router.vuejs.org/)
- [GitHub](https://github.com/vuejs/vue-router-next)
- [RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

### Vuex

<a href="https://www.npmjs.com/package/vuex/v/next" target="_blank" noopener noreferrer><img src="https://img.shields.io/npm/v/vuex/next.svg"></a>

Vuex 4.0 provides Vue 3 support with largely the same API as 3.x. The only breaking change is [how the plugin is installed](https://next.vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#breaking-changes).

- [Documentation](https://next.vuex.vuejs.org/)
- [GitHub](https://github.com/vuejs/vuex/tree/4.0)

### Devtools Extension

We are working on a new version of the Devtools with a new UI and refactored internals to support multiple Vue versions. The new version is currently in beta and only supports Vue 3 (for now). Vuex and Router integration is also work in progress.

- For Chrome: [Install from Chrome web store](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en)

  - Note: the beta channel may conflict with the stable version of devtools so you may need to temporarily disable the stable version for the beta channel to work properly.

- For Firefox: [Download the signed extension](https://github.com/vuejs/vue-devtools/releases/tag/v6.0.0-beta.2) (`.xpi` file under Assets)

### IDE Support

It is recommended to use [VSCode](https://code.visualstudio.com/) with our official extension [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), which provides comprehensive IDE support for Vue 3.

### Other Projects

| Project               | npm                           | Repo                 |
| --------------------- | ----------------------------- | -------------------- |
| @vue/babel-plugin-jsx | [![rc][jsx-badge]][jsx-npm]   | [[GitHub][jsx-code]] |
| eslint-plugin-vue     | [![ga][epv-badge]][epv-npm]   | [[GitHub][epv-code]] |
| @vue/test-utils       | [![beta][vtu-badge]][vtu-npm] | [[GitHub][vtu-code]] |
| vue-class-component   | [![beta][vcc-badge]][vcc-npm] | [[GitHub][vcc-code]] |
| vue-loader            | [![rc][vl-badge]][vl-npm]     | [[GitHub][vl-code]]  |
| rollup-plugin-vue     | [![beta][rpv-badge]][rpv-npm] | [[GitHub][rpv-code]] |

[jsx-badge]: https://img.shields.io/npm/v/@vue/babel-plugin-jsx.svg
[jsx-npm]: https://www.npmjs.com/package/@vue/babel-plugin-jsx
[jsx-code]: https://github.com/vuejs/jsx-next
[vd-badge]: https://img.shields.io/npm/v/@vue/devtools/beta.svg
[vd-npm]: https://www.npmjs.com/package/@vue/devtools/v/beta
[vd-code]: https://github.com/vuejs/vue-devtools/tree/next
[epv-badge]: https://img.shields.io/npm/v/eslint-plugin-vue.svg
[epv-npm]: https://www.npmjs.com/package/eslint-plugin-vue
[epv-code]: https://github.com/vuejs/eslint-plugin-vue
[vtu-badge]: https://img.shields.io/npm/v/@vue/test-utils/next.svg
[vtu-npm]: https://www.npmjs.com/package/@vue/test-utils/v/next
[vtu-code]: https://github.com/vuejs/vue-test-utils-next
[jsx-badge]: https://img.shields.io/npm/v/@ant-design-vue/babel-plugin-jsx.svg
[jsx-npm]: https://www.npmjs.com/package/@ant-design-vue/babel-plugin-jsx
[jsx-code]: https://github.com/vueComponent/jsx
[vcc-badge]: https://img.shields.io/npm/v/vue-class-component/next.svg
[vcc-npm]: https://www.npmjs.com/package/vue-class-component/v/next
[vcc-code]: https://github.com/vuejs/vue-class-component/tree/next
[vl-badge]: https://img.shields.io/npm/v/vue-loader/next.svg
[vl-npm]: https://www.npmjs.com/package/vue-loader/v/next
[vl-code]: https://github.com/vuejs/vue-loader/tree/next
[rpv-badge]: https://img.shields.io/npm/v/rollup-plugin-vue/next.svg
[rpv-npm]: https://www.npmjs.com/package/rollup-plugin-vue/v/next
[rpv-code]: https://github.com/vuejs/rollup-plugin-vue/tree/next

::: info
For additional information on Vue 3 compatibility with libraries and plugins, be sure to check out [this issue in awesome-vue](https://github.com/vuejs/awesome-vue/issues/3544).
:::
