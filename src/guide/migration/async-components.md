---
badges:
  - new
---

# Async Components <MigrationBadges :badges="$frontmatter.badges" />

## Overview

Here is a high level overview of what has changed:

- New `defineAsyncComponent` helper method that explicitly defines async components
- `component` option renamed to `loader`
- Loader function does not inherently receive `resolve` and `reject` arguments and must return a Promise

For a more in-depth explanation, read on!

## Introduction

Previously, async components were created by simply defining a component as a function that returned a promise, such as:

```js
const asyncModal = () => import('./Modal.vue')
```

Or, for the more advanced component syntax with options:

```js
const asyncModal = {
  component: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}
```

## 3.x Syntax

Now, in Vue 3, since functional components are defined as pure functions, async components definitions need to be explicitly defined by wrapping it in a new `defineAsyncComponent` helper:

```js
import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// Async component without options
const asyncModal = defineAsyncComponent(() => import('./Modal.vue'))

// Async component with options
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

::: tip NOTE
Vue Router supports a similar mechanism for asynchronously loading route components, known as *lazy loading*. Despite the similarities, this feature is distinct from Vue's support for async components. You should **not** use `defineAsyncComponent` when configuring route components with Vue Router. You can read more about this in the [Lazy Loading Routes](https://next.router.vuejs.org/guide/advanced/lazy-loading.html) section of the Vue Router documentation.
:::

Another change that has been made from 2.x is that the `component` option is now renamed to `loader` in order to accurately communicate that a component definition cannot be provided directly.

```js{4}
import { defineAsyncComponent } from 'vue'

const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

In addition, unlike 2.x, the loader function no longer receives the `resolve` and `reject` arguments and must always return a Promise.

```js
// 2.x version
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
}

// 3.x version
const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)
```

For more information on the usage of async components, see:

- [Guide: Dynamic & Async Components](/guide/component-dynamic-async.html#dynamic-components-with-keep-alive)
- [Migration build flag: `COMPONENT_ASYNC`](migration-build.html#compat-configuration)
