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
const asyncPage = () => import('./CartFlyout.vue')
```

Or, for the more advanced component syntax with options:

```js
const asyncPage = {
  component: () => import('./CartFlyout.vue'),
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
const asyncPage = defineAsyncComponent(() => import('./CartFlyout.vue'))

// Async component with options
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./CartFlyout.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

::: tip NOTE
When using the official Vue Router and you want to asynchronously load (lazy load) router components, you should not use `defineAsyncComponent`. You can read more about this in the (Lazy Loading Routes)[https://next.router.vuejs.org/guide/advanced/lazy-loading.html#lazy-loading-routes] section of the Vue Router documentation.
:::

Another change that has been made from 2.x is that the `component` option is now renamed to `loader` in order to accurately communicate that a component definition cannot be provided directly.

```js{4}
import { defineAsyncComponent } from 'vue'

const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./CartFlyout.vue'),
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
