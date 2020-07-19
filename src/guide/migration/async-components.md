# Async Components

## Overview

Here is a high level overview of what has changed:

- New `defineAsyncComponent` helper method that explicitly defines async components
- `component` option renamed to `loader`
- Loader function does not inherently receive `resolve` and `reject` arguments and must return a Promise

For a more in-depth explanation, read on!

## Introduction

Previously, async components were created by simply defining a component as a function that returned a promise, such as:

```js
const asyncPage = () => import('./NextPage.vue')
```

Or, for the more advanced component syntax with options:

```js
const asyncPage = {
  component: () => import('./NextPage.vue'),
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
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))

// Async component with options
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

Another change that has been made from 2.x is that the `component` option is now renamed to `loader` in order to accurately communicate that a component definition cannot be provided directly.

```js{4}
import { defineAsyncComponent } from 'vue'

const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
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
