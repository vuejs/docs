# Installazione

## Note di Rilascio

Ultima versione: ![npm](https://img.shields.io/npm/v/vue/next.svg)

Note di rilascio dettagliate per ogni versione sono disponibili su [GitHub](https://github.com/vuejs/vue-next/blob/master/CHANGELOG.md).

## Vue Devtools

> Attualmente in Beta - Vuex e integrazioni del router sono in fase WIP

Quando si utilizza Vue, raccomandiamo l'installazione di [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) nel tuo browser, per poter ispezionare e fare il debug della tua applicazione Vue in un'interfaccia più user-friendly.

[Installa l'estensione di Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

[Installa l'addon di Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)


[Installa l'app Electron separata](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

## CDN

Per prototipazione o per imparare, puoi ottenere l'ultima versione con:

```html
<script src="https://unpkg.com/vue@next"></script>
```

In production, raccomanidiamo di puntare a un numero specifico di versione e build per evitare malfunzionamenti inaspettati causati da nuove versioni. 

## NPM

NPM è il metodo di installazione raccomandato per quando si sta sviluppando un'applicazione di larga scala con Vue. Si accoppia bene con bundlers di moduli come  [Webpack](https://webpack.js.org/) o [Rollup](https://rollupjs.org/). Vue inoltre fornisce strumenti aggiuntivi per la creazione di [Single File Components](../guide/single-file-component.html).

```bash
# latest stable
$ npm install vue@next
```

## CLI

Vue fornisce una [CLI ufficiale](https://github.com/vuejs/vue-cli) per lo scaffolding rapido di Single Page Applications ambiziose. Fornisce un setup di sviluppo completo per un workflow di sviluppo frontend moderno. È necessario solo qualche minuto per essere pronti e produttivi con l'hot-reload, il linting al salvataggio, e builds pronte per la produzione. Leggi la [docs della Vue CLI](https://cli.vuejs.org) per sapere di più.

::: tip
The CLI assumes prior knowledge of Node.js and the associated build tools. If you are new to Vue or front-end build tools, we strongly suggest going through <a href="./">the guide</a> without any build tools before using the CLI.
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

[Vite](https://github.com/vitejs/vite) is a web development build tool that allows for lighting fast serving of code due its native ES Module import approach.

Vue projects can quickly be set up with Vite by running the following commands in your terminal.

With NPM:

```bash
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

Or with Yarn:

```bash
$ yarn create vite-app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

## Explanation of Different Builds

In the [`dist/` directory of the NPM package](https://cdn.jsdelivr.net/npm/vue@3.0.0-rc.1/dist/) you will find many different builds of Vue.js. Here is an overview of which `dist` file should be used depending on the use-case.

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

#### vue(.runtime).esm-browser(.prod).js:

- For usage via native ES modules imports (in browser via `<script type="module">`.
- Shares the same runtime compilation, dependency inlining and hard-coded prod/dev behavior with the global build.

### With a Bundler

#### vue(.runtime).esm-bundler.js:

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
