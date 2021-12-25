---
aside: deep
---

# Using Vue with TypeScript

A type system like TypeScript can detect many common errors via static analysis at build time. This reduces the chance of runtime errors in production, and also allows us to more confidently refactor code in large scale applications. TypeScript also improves developer ergonomics via type-based auto-completion in IDEs.

Vue is written in TypeScript itself and provides first-class TypeScript support. All official Vue packages come with bundled type declarations that should work out-of-the-box.

## Project Setup

[`create-vue`](https://github.com/vuejs/create-vue), the official project scaffolding tool, offers the options to scaffold a [Vite](https://vitejs.dev/)-powered, TypeScript-ready Vue project.

### Overview

With a Vite-based setup, the dev server and the bundler are transpilation-only and do not perform any type-checking. This ensures the Vite dev server stays blazing fast even when using TypeScript.

- During development, we recommend relying on a good [IDE setup](#ide-support) for instant feedback on type errors.

- If using SFCs, use the [`vue-tsc`](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) utility for command line type checking and type declaration generation. `vue-tsc` is a wrapper around `tsc`, TypeScript's own command line interface. It works largely the same as `tsc` except that it supports Vue SFCs in addition to TypeScript files.

- `vue-tsc` currently does not support watch mode, but it is on the roadmap. In the meanwhile, if you prefer having type checking as part of your dev command, check out [vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker).

- Vue CLI also provides TypeScript support, but is no longer recommended. See [notes below](#note-on-vue-cli-and-ts-loader).

### IDE Support

- [Visual Studio Code](https://code.visualstudio.com/) (VSCode) is strongly recommended for its great out-of-the-box support for TypeScript.

- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) is the official VSCode extension that provides TypeScript support inside Vue SFCs, along with many other great features.

  :::tip
  Volar replaces [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), our previous official VSCode extension for Vue 2. If you have Vetur currently installed, make sure to disable it in Vue 3 projects.
  :::

- [WebStorm](https://www.jetbrains.com/webstorm/) also provides out-of-the-box support for both TypeScript and Vue.

### Configuring `tsconfig.json`

Projects scaffolded via `create-vue` include [pre-configured `tsconfig.json`](https://github.com/vuejs/create-vue/blob/main/template/config/typescript/tsconfig.json). Some notable options include:

- [`compilerOptions.isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) is set to `true` because Vite uses [esbuild](https://esbuild.github.io/) for transpiling TypeScript and is subject to single-file transpile limitations.

- If using Options API, it is required to set [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) to `true` (or at least enable [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis) which is a part of the `strict` flag) to leverage type checking of `this` in component options. Otherwise `this` will be treated as `any`.

- If you have configured resolver alias in your build tool, for example the `@/*` alias configured by default in a `create-vue` project, you need to also configure it for TypeScript via [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths).

See also:

- [Official TypeScript compiler options docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [esbuild TypeScript compilation caveats](https://esbuild.github.io/content-types/#typescript-caveats)

### Takeover Mode

> This section only applies for VSCode + Volar.

To get Vue SFCs and TypeScript working together, Volar creates a separate TypeScript language service instance patched with Vue-specific support, and uses it in Vue SFCs. This default behavior works, but has two drawbacks:

1. For each project we are running two TS language service instances, which is not the most efficient.

2. Plain TypeScript files still use the built-in TS language service, which has no knowledge of Vue SFCs. This is why we have to shim `*.vue` modules with the following:

   ```ts
   // in a d.ts file
   declare module '*.vue' {
     import { DefineComponent } from 'vue'
     const component: DefineComponent<{}, {}, any>
     export default component
   }
   ```

Volar provides a feature called "Takeover Mode" that addresses these problems. In takeover mode, Volar provides support for both Vue and TS files using a single TS language service instance, so we can remove the shim above.

To enable Takeover Mode, you need to disable VSCode's built-in TypeScript language service in your project's workspace. Check out these [instructions](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) for more details.

### Note on Vue CLI and `ts-loader`

In webpack-based setups such as Vue CLI, it is common to perform type checking as part of the module transform pipeline, for example with `ts-loader`. This, however, isn't a clean solution because the type system needs knowledge of the entire module graph to perform type checks. Individual module's transform step simply is not the right place for the task. It leads to the following problems:

- `ts-loader` can only type check post-transform code. This doesn't align with the errors we see in IDEs or from `vue-tsc`, which maps directly back to the source code.

- Type checking can be slow. When it is performed in the same thread / process with code transformations, it significantly affects the build speed of the entire application.

- We already have type checking running right in our IDE in a separate process, so the cost of dev experience slow down simply isn't a good trade-off.

If you are currently using Vue 3 + TypeScript via Vue CLI, we strongly recommend migrating over to Vite. We are also working on CLI options to enable transpile-only TS support, so that you can switch to `vue-tsc` for type checking.

## General Usage Notes

### `defineComponent()`

To let TypeScript properly infer types inside component options, we need to define components with [`defineComponent()`](/api/general.html#definecomponent) global API:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    message: String
  },
  data() {
    return {
      n: 1
    }
  },
  mounted() {
    this.message // <-- type: string
    this.n // <-- type: number
  }
})
```

`defineComponent()` also supports inferring the props passed to `setup()` when using Composition API without `<script setup>`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- type: string
  }
})
```

:::tip
`defineComponent()` also enables type inference for components defined in plain JavaScript.
:::

### Usage in Single-File Components

To use TypeScript in SFCs, add the `lang="ts"` attribute to `<script>` tags. When `lang="ts"` is present, all template expressions also enjoy stricter type checking.

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      n: 1
    }
  }
})
</script>

<template>
  <!-- type checking and auto-completion enabled -->
  {{ n.toFixed(2) }}
</template>
```

`lang="ts"` can also be used with `<script setup>`:

```vue
<script setup lang="ts">
// TypeScript enabled
import { ref } from 'vue'

const n = ref(1)
</script>

<template>
  <!-- type checking and auto-completion enabled -->
  {{ n.toFixed(2) }}
</template>
```

### TypeScript in Templates

The `<template>` also supports TypeScript in binding expressions when `<script lang="ts">` or `<script setup lang="ts">` is used. This is useful in cases where you need to perform type casting in template expressions.

Here's a contrived example:

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- error because x could be a string -->
  {{ x.toFixed(2) }}
</template>
```

This can be worked around with an inline type cast:

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip
If using Vue CLI or webpack-based setup, TypeScript in template expressions requires `vue-loader@^16.8.0`.
:::

## API-Specific Recipes

- [TS with Composition API](./composition-api)
- [TS with Options API](./options-api)
