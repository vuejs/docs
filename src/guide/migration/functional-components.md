# Functional Components

## Overview

In terms of what has changed, at a high level:

- Performance gains from v2 for functional components are now negligible in v3, so we recommend just using stateful components
- `functional` attribute on single-file component `<template>` is deprecated
- Functional components can only be created using a plain function that receives `props` and `context` (i.e., `slots`, `attrs`, `emit`)

For a more in-depth explanation, read on!

## Introduction

In Vue 2, functional components had primary use cases:

- as a performance optimization, because they initialized much faster than stateful components
- to return multiple root nodes

However, in Vue 3, the performance of stateful components has improved to the point that the difference is negligible. In addition, stateful components now also include the ability to return multiple root nodes.

As a result, the only remaining use case for functional components is simple components, such as a component to create a dynamic heading. Otherwise, it is recommended to use stateful components as you normally would.

## Previous Syntax

Using the `<dynamic-heading>` component, which is responsible for rendering out the appropriate heading (i.e., `h1`, `h2`, `h3`, etc.), this could have been written as a single-file component in v2 as:

```js
// Vue 2 Functional Component Example
export default {
  functional: true,
  props: ['level'],
  render(h, { props, data, children }) {
    return h(`h${props.level}`, data, children)
  }
}
```

Or, for those who preferred the `<template>` in a single-file component:

```js
// Vue 2 Functional Component Example with <template>
<template functional>
  <component
    v-bind:is="`h${props.level}`"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>

```

## Current Syntax

Now in Vue 3, the only way to create a functional component is with a plain function that receives `props` and a `context` object that contains `attrs`, `slots`, and `emit` options:

```js
import { h } from 'vue'

const DynamicHeading = (props, context) => {
  return h(`h${level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default GreetingMessage
```

For more information on the usage of the new functional components and the changes to render functions in general, see:

- [Migration: Render Functions](TODO)
- [Guide: Render Functions](/guide/render-function.html)
