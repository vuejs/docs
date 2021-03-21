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
La CLI assume conoscenza pregressa di Node.js e degli strumenti di build ad esso associati. Se Vue o gli strumenti di build per il frontend ti sono nuovi, ti suggeriamo fortemente di leggere <a href="./">la guida</a> senza nessuno strumento di build prima di usare la CLI.
:::

Per Vue 3, dovresti usare la Vue CLI v4.5 disponibile su `npm` come `@vue/cli`. Per aggiornare, devi reinstallare l'ultima versione di `@vue/cli` globalmente:

```bash
yarn global add @vue/cli
# Oppure
npm install -g @vue/cli
```

Poi in un progetto Vue, esegui

```bash
vue upgrade --next
```

## Vite

[Vite](https://github.com/vitejs/vite) è uno strumento di build per la programmazione web che permette una compilazione estremamente veloce grazie al suo approccio di import basato sui moduli ES nativi.

I progetti Vue possono essere impostati velocemente con Vite eseguendo i seguenti comandi nel tuo terminale.

Con NPM:

```bash
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

Oppure con Yarn:

```bash
$ yarn create vite-app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

## Spiegazione delle Diverse Build

Nella [cartella `dist/` del package NPM](https://cdn.jsdelivr.net/npm/vue@3.0.0-rc.1/dist/) troverai diverse build di Vue.js. Qui puoi leggere una panoramica di quale file `dist` dovrebbe essere usato a seconda del caso d'uso.

### Da CDN o senza un Bundler

#### `vue(.runtime).global(.prod).js`:

- Per utilizzo diretto nel browser tramite `<script src="...">`, espone il Vue globale.
- Compilazione del template In-browser:
  - `vue.global.js` è la build "completa" che include sia il compilatore che il runtime quindi supporta la compilazione on the fly.
  - `vue.runtime.global.js` contiene solo il runtime e richiede che il template sia pre-compilato durante una fase di build.
- Pacchetti interni del core di Vue tutti inline - es. è un singolo file senza dipendenze su altri file. Questo vuol dire dovrai importare tutto da questo e solo questo file per assicurarti che stai ottenendo la stessa istanza di codice. 
- Contiene branch prod/dev hard-coded, e la build per production è pre-minimizzata. Usa il file `*.prod.js` per la production.

:::tip Note
Le build globali non sono build [UMD](https://github.com/umdjs/umd). Sono sviluppate come [IIFEs](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) e sono pensate solo per l'utilizzo diretto tramite `<script src="...">`.
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
