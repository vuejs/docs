# Tooling

## Try It Online

You don't need to install anything on your machine to try out Vue SFCs - there are online playgrounds that allow you to do so right in the browser:

- [Vue SFC Playground](https://sfc.vuejs.org)
  - Always deployed from latest commit
  - Designed for inspecting component compilation results
- [Vue + Vite on StackBlitz](https://vite.new/vue)
  - IDE-like environment running actual Vite dev server in the browser
  - Closest to local setup

It is also recommended to use these online playgrounds to provide reproductions when reporting bugs.

## Project Scaffolding

### Vite

[Vite](https://vitejs.dev/) is a lightweight and fast build tool with first-class Vue SFC support. It is created by Evan You, who is also the author of Vue!

To get started with Vite + Vue, simply run:

```sh
npm init vue@latest
```

This command will install and execute [create-vue](https://github.com/vuejs/create-vue), the official Vue project scaffolding tool.

- To learn more about Vite, check out the [Vite docs](https://vitejs.dev]().
- To configure Vue-specific behavior in a Vite project, for example passing options to the Vue compiler, check out the docs for [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#readme).

Both online playgrounds mentioned above also support downloading files as a Vite project.

### Vue CLI

[Vue CLI](https://cli.vuejs.org/) is the official webpack-based toolchain for Vue. It is now in maintenance mode and we recommend starting new prjects with Vite unless you rely on specific webpack-only features. Vite will provide superior developer experience in most cases.

## IDE Support

The recommended IDE setup is [VSCode](https://code.visualstudio.com/) + the [Volar](https://github.com/johnsoncodehk/volar) extension. Volar provides syntax highlighting and advanced IntelliSense for template expressions, component props and even slots validation. We strongly recommend this setup if you want to get the best possible experience with Vue SFCs, especially if you are also using TypeScript.

[WebStorm](https://www.jetbrains.com/webstorm/) also provides decent support for Vue SFCs. However, do note as of now its support for `<script setup>` is still [in progress](https://youtrack.jetbrains.com/issue/WEB-49000).

Most other editors have community-created syntax highlighting support for Vue, but lack the same level of code IntelliSense. In the long run, we do hope we can extend the range of editor support by leveraging the [Language Service Protocol](https://microsoft.github.io/language-server-protocol/) as Volar's core logic is implemented as a standard language server.

## Browser Devtools

The Vue browser devtools extension allows you to explore a Vue app's component tree, inspect the state of individual components, track state management events, and profile performance.

![devtools screenshot](https://raw.githubusercontent.com/vuejs/devtools/main/media/screenshot-shadow.png)

// TODO update links after swapping versions

- [Documentation](https://devtools.vuejs.org/)
- [Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)
- [Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Standalone Electron app](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

## TypeScript

// TODO links and recommendations

- `vue-tsc`: Type check Vue SFCs
- `vue-dts-gen`: Generate type declarations from Vue SFCs

See also: [Using Vue with TypeScript](/guide/scaling-up/typescript).

## Testing

- If using Vite, we recommend [Cypress](https://www.cypress.io/) as the test runner for both unit and e2e tests. Unit tests for Vue SFCs can be done with the [Cypress Component Test Runner](https://www.cypress.io/blog/2021/04/06/introducing-the-cypress-component-test-runner/).

- Vue CLI comes with [Jest](https://jestjs.io/) and [Mocha](https://mochajs.org/) integrations.

- If you are manually configuring Jest to work with Vue SFCs, check out [vue-jest](https://github.com/vuejs/vue-jest) which is the official Jest transform for Vue SFCs.

See also: [Testing Guide](/guide/scaling-up/testing).

## Linting

The Vue team maintains [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue), an [ESLint](https://eslint.org/) plugin that supports SFC-specific linting rules.

Users previously using Vue CLI may be used to having linters configured via webpack loaders. However when using a Vite-based build setup, our general recommendation is:

1. Setup ESLint via IDE extensions during development so you get linter feedback right in your editor. This also avoids unnecessary linting cost when starting the dev server.

2. Run linting as part of the production build command.

3. Setup tools like [lint-staged](https://github.com/okonet/lint-staged) to automatically lint modified files on git commit.

## Formatting

[Prettier](https://prettier.io/) provides built-in Vue SFC formatting support.

## Backend Framework Integrations

// TODO

## SFC Custom Block Integrations

Custom blocks are compiled into imports to the same Vue file with different request queries. It is up to the underlying build tool to handle these import requests.

- If using Vite, a custom Vite plugin should be used to transform matched custom blocks into executable JavaScript. [Example](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- If using Vue CLI or plain webpack, a webpack loader should be configured to transform the matched blocks. [Example](https://vue-loader.vuejs.org/custom-blocks.html#custom-blocks)

## Lower-Level Packages

### `@vue/compiler-sfc`

- [Docs](https://github.com/vuejs/vue-next/tree/master/packages/compiler-sfc)

This package is part of the Vue core monorepo and is always published with the same version as the main `vue` package. Typically, it will be listed as a peer dependency of `vue` in a project. To ensure correct behavior, its version should always be kept in-sync with `vue` - i.e. whenever you upgrade the version of `vue`, you should also upgrade `@vue/compiler-sfc` to match it.

The package itself provides lower-level utilities for processing Vue SFCs and is only meant for tooling authors that need to support Vue SFCs in custom tools.

### `@vitejs/plugin-vue`

- [Docs](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)

Official plugin that provides Vue SFC support in Vite.

### `vue-loader`

- [Docs](https://vue-loader.vuejs.org/)

The official loader that provides Vue SFC support in webpack. If you are using Vue CLI, also see [docs on modifying `vue-loader` options in Vue CLI](https://cli.vuejs.org](webpack.html#modifying-options-of-a-loader).

## Other Online Playgrounds

- [VueUse Playground](https://play.vueuse.org)
- [Vue + Vite on Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue on CodeSandbox](https://codesandbox.io/s/vue-3)
- [Vue on Codepen](https://codepen.io/pen/editor/vue)
