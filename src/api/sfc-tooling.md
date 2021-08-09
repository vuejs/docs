# SFC Tooling

## Online Playgrounds

You don't need to install anything on your machine to try out Vue SFCs - there are many online playgrounds that allow you to do so right in the browser:

- [Vue SFC Playground](https://sfc.vuejs.org) (official, deployed from latest commit)
- [VueUse Playground](https://play.vueuse.org)
- [Vue on CodeSandbox](https://codesandbox.io/s/vue-3)
- [Vue on Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue on Codepen](https://codepen.io/pen/editor/vue)
- [Vue on StackBlitz](https://stackblitz.com/fork/vue)

It is also recommended to use these online playgrounds to provide reproductions when reporting bugs.

## Project Scaffolding

### Vite

[Vite](https://vitejs.dev/) is a lightweight and fast build tool with first-class Vue SFC support. It is created by Evan You, who is also the author of Vue itself! To get started with Vite + Vue, simply run:

```sh
npm init vite@latest
```

Then select the Vue template and follow the instructions.

- To learn more about Vite, check out the [Vite docs](https://vitejs.dev/guide/).
- To configure Vue-specific behavior in a Vite project, for example passing options to the Vue compiler, check out the docs for [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#readme).

The [SFC Playground](https://sfc.vuejs.org/) also supports downloading the files as a Vite project.

### Vue CLI

[Vue CLI](https://cli.vuejs.org/) is the official webpack-based build tool for Vue projects. To get started with Vue CLI:

```sh
npm install -g @vue/cli
vue create hello-vue
```

- To learn more about Vue CLI, check out [Vue CLI docs](https://cli.vuejs.org/guide/installation.html).

### Vite or Vue CLI?

We recommend starting new projects with Vite as it offers significantly better development experience in terms of dev server startup and HMR update performance ([details](https://vitejs.dev/guide/why.html)). Only go with Vue CLI if you rely on specific webpack features (e.g. Module Federation).

If you are a [Rollup](https://rollupjs.org/) user, you can safely adopt Vite as it uses Rollup for production builds and supports a Rollup-compatible plugin system. [Even Rollup's maintainer recommends Vite as THE web development wrapper for Rollup](https://twitter.com/lukastaegert/status/1412119729431584774).

## IDE Support

The recommended IDE setup is [VSCode](https://code.visualstudio.com/) + the [Volar](https://github.com/johnsoncodehk/volar) extension. Volar provides syntax highlighting and advanced IntelliSense for template expressions, component props and even slots validation. We strongly recommend this setup if you want to get the best possible experience with Vue SFCs, especially if you are also using TypeScript.

[WebStorm](https://www.jetbrains.com/webstorm/) also provides decent support for Vue SFCs. However, do note as of now its support for `<script setup>` is still [in progress](https://youtrack.jetbrains.com/issue/WEB-49000).

Most other editors have community-created syntax highlighting support for Vue, but lack the same level of code IntelliSense. In the long run, we do hope we can extend the range of editor support by leveraging the [Language Service Protocol](https://microsoft.github.io/language-server-protocol/) as Volar's core logic is implemented as a standard language server.

## Testing Support

- If using Vite, we recommend [Cypress](https://www.cypress.io/) as the test runner for both unit and e2e tests. Unit tests for Vue SFCs can be done with the [Cypress Component Test Runner](https://www.cypress.io/blog/2021/04/06/introducing-the-cypress-component-test-runner/).

- Vue CLI comes with [Jest](https://jestjs.io/) and [Mocha](https://mochajs.org/) integrations.

- If you are manually configuring Jest to work with Vue SFCs, check out [vue-jest](https://github.com/vuejs/vue-jest) which is the official Jest transform for Vue SFCs.

## Custom Blocks Integration

Custom blocks are compiled into imports to the same Vue file with different request queries. It is up to the underlying build tool to handle these import requests.

- If using Vite, a custom Vite plugin should be used to transform matched custom blocks into executable JavaScript. [[Example](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)]

- If using Vue CLI or plain webpack, a webpack loader should be configured to transform the matched blocks. [[Example](https://vue-loader.vuejs.org/guide/custom-blocks.html#custom-blocks)]

## Lower-Level Tools

### `@vue/compiler-sfc`

- [Docs](https://github.com/vuejs/vue-next/tree/master/packages/compiler-sfc)

This package is part of the Vue core monorepo and is always published with the same version as the main `vue` package. Typically, it will be listed as a peer dependency of `vue` in a project. To ensure correct behavior, its version should always be kept in-sync with `vue` - i.e. whenever you upgrade the version of `vue`, you should also upgrade `@vue/compiler-sfc` to match it.

The package itself provides lower-level utilities for processing Vue SFCs and is only meant for tooling authors that need to support Vue SFCs in custom tools.

### `@vitejs/plugin-vue`

- [Docs](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)

Official plugin that provides Vue SFC support in Vite.

### `vue-loader`

- [Docs](https://vue-loader.vuejs.org/)

The official loader that provides Vue SFC support in webpack. If you are using Vue CLI, also see [docs on modifying `vue-loader` options in Vue CLI](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).
