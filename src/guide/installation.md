# Installation

Vue.js is built by design to be incrementally adoptable. This means that it can be integrated into a project multiple ways depending on the requirements.

There are four primary ways of adding Vue.js to a project:

1. Import it as a [CDN package](#cdn) on the page
2. Download the JavaScript files and [host them yourself](#download-and-self-host)
3. Install it using [npm](#npm)
4. Use the official [CLI](#cli) to scaffold a project, which provides batteries-included build setups for a modern frontend workflow (e.g., hot-reload, lint-on-save, and much more)

## Release Notes

Latest version: ![npm](https://img.shields.io/npm/v/vue/next.svg)

Detailed release notes for each version are available on [GitHub](https://github.com/vuejs/vue-next/blob/master/CHANGELOG.md).

## Vue Devtools

> Currently in Beta - Vuex and Router integration is still WIP
 
<VideoLesson href="https://vueschool.io/lessons/using-vue-dev-tools-with-vuejs-3?friend=vuejs" title="Learn how to install Vue Devtools on Vue School">Learn how to install and use Vue Devtools in a free Vue School lesson</VideoLesson>

When using Vue, we recommend also installing the [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) in your browser, allowing you to inspect and debug your Vue applications in a more user-friendly interface.

[Get the Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

[Get the Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

[Get the standalone Electron app](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

## CDN

For prototyping or learning purposes, you can use the latest version with:

```vue-html
<script src="https://unpkg.com/vue@next"></script>
```

For production, we recommend linking to a specific version number and build to avoid unexpected breakage from newer versions.

## Download and Self Host

If you want to avoid using build tools but can't use a CDN in production then you can download the relevant `.js` file and host it using your own web server. You can then include it using a `<script>` tag, just like with the CDN approach.

The files can be browsed and downloaded from a CDN such as [unpkg](https://unpkg.com/browse/vue@next/dist/) or [jsDelivr](https://cdn.jsdelivr.net/npm/vue@next/dist/). The various different files are [explained later](#explanation-of-different-builds) but you would typically want to download both a development build and a production build.

## npm

npm is the recommended installation method when building large scale applications with Vue. It pairs nicely with module bundlers such as [webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/).

```bash
# latest stable
$ npm install vue@next
```

Vue also provides accompanying tools for authoring [Single File Components](../guide/single-file-component.html) (SFCs). If you want to use SFCs then you'll also need to install `@vue/compiler-sfc`:

```bash
$ npm install -D @vue/compiler-sfc
```

If you're coming from Vue 2 then note that `@vue/compiler-sfc` replaces `vue-template-compiler`.

In addition to `@vue/compiler-sfc`, you'll also need a suitable SFC loader or plugin for your chosen bundler. See the [SFC documentation](../guide/single-file-component.html) for more information.

In most cases, the preferred way to create a webpack build with minimal configuration is to use Vue CLI.

## CLI

Vue provides an [official CLI](https://github.com/vuejs/vue-cli) for quickly scaffolding ambitious Single Page Applications. It provides batteries-included build setups for a modern frontend workflow. It takes only a few minutes to get up and running with hot-reload, lint-on-save, and production-ready builds. See [the Vue CLI docs](https://cli.vuejs.org) for more details.

::: tip
The CLI assumes prior knowledge of Node.js and the associated build tools. If you are new to Vue or front-end build tools, we strongly suggest going through [the guide](./introduction.html) without any build tools before using the CLI.
:::

For Vue 3, you should use Vue CLI v4.5 available on `npm` as `@vue/cli`. To upgrade, you need to reinstall the latest version of `@vue/cli` globally:

```bash
yarn global add @vue/cli
# OR
npm install -g @vue/cli
```

Then in the Vue projects, run

```bash
vue upgrade --next
```

## Vite

[Vite](https://github.com/vitejs/vite) is a web development build tool that allows for lightning fast serving of code due to its native ES Module import approach.

Vue projects can quickly be set up with Vite by running the following commands in your terminal.

With npm:

```bash
$ npm init vite <project-name> -- --template vue
$ cd <project-name>
$ npm install
$ npm run dev
```

Or with Yarn:

```bash
$ yarn create vite <project-name> --template vue
$ cd <project-name>
$ yarn
$ yarn dev
```

## Explanation of Different Builds

In the [`dist/` directory of the npm package](https://cdn.jsdelivr.net/npm/vue@3.0.2/dist/) you will find many different builds of Vue.js. Here is an overview of which `dist` file should be used depending on the use-case.

### From CDN or without a Bundler

#### `vue(.runtime).global(.prod).js`:

- For direct use via `<script src="...">` in the browser, exposes the Vue global.
- In-browser template compilation:
  - `vue.global.js` is the "full" build that includes both the compiler and the runtime so it supports compiling templates on the fly.
  - `vue.runtime.global.js` contains only the runtime and requires templates to be pre-compiled during a build step.
- Inlines all Vue core internal packages - i.e. it's a single file with no dependencies on other files. This means you must import everything from this file and this file only to ensure you are getting the same instance of code.
- Contains hard-coded prod/dev branches, and the prod build is pre-minified. Use the `*.prod.js` files for production.

:::tip Note
Global builds are not [UMD](https://github.com/umdjs/umd) builds. They are built as [IIFEs](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) and are only meant for direct use via `<script src="...">`.
:::

#### `vue(.runtime).esm-browser(.prod).js`:

- For usage via native ES modules imports (in browser via `<script type="module">`.
- Shares the same runtime compilation, dependency inlining and hard-coded prod/dev behavior with the global build.

### With a Bundler

#### `vue(.runtime).esm-bundler.js`:

- For use with bundlers like `webpack`, `rollup` and `parcel`.
- Leaves prod/dev branches with `process.env.NODE_ENV guards` (must be replaced by bundler)
- Does not ship minified builds (to be done together with the rest of the code after bundling)
- Imports dependencies (e.g. `@vue/runtime-core`, `@vue/runtime-compiler`)
  - Imported dependencies are also esm-bundler builds and will in turn import their dependencies (e.g. @vue/runtime-core imports @vue/reactivity)
  - This means you **can** install/import these deps individually without ending up with different instances of these dependencies, but you must make sure they all resolve to the same version.
- In-browser template compilation:
  - `vue.runtime.esm-bundler.js` **(default)** is runtime only, and requires all templates to be pre-compiled. This is the default entry for bundlers (via module field in `package.json`) because when using a bundler templates are typically pre-compiled (e.g. in `*.vue` files).
  - `vue.esm-bundler.js`: includes the runtime compiler. Use this if you are using a bundler but still want runtime template compilation (e.g. in-DOM templates or templates via inline JavaScript strings). You will need to configure your bundler to alias vue to this file.

### For Server-Side Rendering

#### `vue.cjs(.prod).js`:

- For use in Node.js server-side rendering via `require()`.
- If you bundle your app with webpack with `target: 'node'` and properly externalize `vue`, this is the build that will be loaded.
- The dev/prod files are pre-built, but the appropriate file is automatically required based on `process.env.NODE_ENV`.

## Runtime + Compiler vs. Runtime-only

If you need to compile templates on the client (e.g. passing a string to the template option, or mounting to an element using its in-DOM HTML as the template), you will need the compiler and thus the full build:

```js
// this requires the compiler
Vue.createApp({
  template: '<div>{{ hi }}</div>'
})

// this does not
Vue.createApp({
  render() {
    return Vue.h('div', {}, this.hi)
  }
})
```

When using `vue-loader`, templates inside `*.vue` files are pre-compiled into JavaScript at build time. You don’t really need the compiler in the final bundle, and can therefore use the runtime-only build.
