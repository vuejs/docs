# Installazione

Vue.js è stato progettato fin dall'inizio per essere adottabile incrementalmente. Questo vuol dire che può essere integrato in un progetto in diversi modi a seconda dei requisiti.

Ci sono quattro modi principali per aggiungere Vue.js a un progetto:

1. Importalo come un [CDN package](#cdn) nella pagina
2. Scarica i file JavaScript e [caricali sul tuo sito](#download-and-self-host)
3. Installalo usando [npm](#npm)
4. Usa la [CLI](#CLI) ufficiale per impostare un progetto, che include un pacchetto completo di strumenti di build per un workflow di sviluppo frontend moderno (es. hot-reload, linting al salvataggio e molto altro).

## Note della Release

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

In production, raccomandiamo di usare un numero specifico di versione e build per evitare malfunzionamenti inaspettati causati da nuove versioni.

## Download and Self Host

Se vuoi evitare di utilizzare dei build tool ma non puoi usare una CDN in production, allora puoi scaricare i file `.js` rilevanti e caricarli sul tuo web server. Puoi successivamente includerli con uno `<script>` tag, così come nell'approccio con la CDN.

I file possono essere consultati e scaricati da una CDN come [unpkg](https://unpkg.com/browse/vue@next/dist/) o [jsDelivr](https://cdn.jsdelivr.net/npm/vue@next/dist/). I vari file sono [spiegati successivamente](#spiegazione-delle-diverse-build) ma tipicamente avrai bisogno sia di una build per lo sviluppo che di una build per la production.

## npm

npm è il metodo di installazione raccomandato per quando si sta sviluppando un'applicazione di larga scala con Vue. Si accoppia bene con bundlers di moduli come [Webpack](https://webpack.js.org/) o [Rollup](https://rollupjs.org/). Vue inoltre fornisce strumenti aggiuntivi per la creazione di [Single File Components](../guide/single-file-component.html).

```bash
# latest stable
$ npm install vue@next
```

## CLI

Vue fornisce una [CLI ufficiale](https://github.com/vuejs/vue-cli) per lo scaffolding rapido di Single Page Applications ambiziose. Fornisce un setup completo per un workflow di sviluppo frontend moderno. È necessario solo qualche minuto per essere pronti e produttivi con l'hot-reload, il linting al salvataggio, e build pronte per la production. Leggi la [docs della Vue CLI](https://cli.vuejs.org) per sapere di più.

:::tip Note
La CLI assume conoscenza pregressa di Node.js e degli strumenti di build ad esso associati. Se Vue o gli strumenti di build per il frontend ti sono nuovi, ti suggeriamo caldamente di leggere <a href="./">la guida</a> senza nessuno strumento di build prima di usare la CLI.
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
$ npm init @vitejs/app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

Oppure con Yarn:

```bash
$ yarn create @vitejs/app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

Può accadere, che nel caso in cui il tuo username abbia uno spazio al suo interno come in 'Mike Baker', Vite fallisca. Prova con:

```bash
$ create-vite-app <project-name>
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

#### `vue(.runtime).esm-browser(.prod).js`:

- Per l'utilizzo tramite gli import di moduli ES nativi (nel browser tramite `<script type="module">`).
- Condivide la stessa compilazione di runtime, integrazione delle dipendenze e comportamento prod/dev hard-coded con la build globale.

### Con un Bundler

#### `vue(.runtime).esm-bundler.js`:

- Per l'uso con bundlers come `webpack`, `rollup` e `parcel`.
- Lascia i branch prod/dev con `process.env.NODE_ENV guards` (deve essere rimpiazzato dal bundler)
- Non produce builds minimizzate (da fare con il resto del codice dopo il bundling)
- Importa le dipendenze (es. `@vue/runtime-core`, `@vue/runtime-compiler`)
  - Le dipendenze importate sono anch'esse build prodotte da un esm-bundler e importeranno a loro volta le loro dipendenze (es. @vue/runtime-core importa @vue/reactivity)
  - Questo significa che **puoi** installare/importare queste dipendenze individualmente senza avere istanze multiple della stessa dipendenza, devi però assicurarti che usino tutte la stessa versione.
- Compilazione del template In-browser:
  - `vue.runtime.esm-bundler.js` **(default)** è solo la runtime, e richiede che tutti i template siano precompilati. Questo è il punto d'ingresso di default per i bundler (tramite il campo module in `package.json`) perchè tipicamente quando si usa un bundler i template sono già precompilati (es. in file `*.vue`).
  - `vue.esm-bundler.js`: include il compilatore di runtime. Usa questo se stai già usando un bundler ma vuoi comunque una compilazione a runtime dei template (es. template in-DOM or templates tramite stringhe inline JavaScript). Avrai bisogno di configurare il tuo bundler per creare un alias vue a questo file.

### Per il Server-Side Rendering

#### `vue.cjs(.prod).js`:

- Per l'uso nel server-side rendering Node.js tramite `require()`.
- Se vuoi creare un bundle della tua app con webpack con `target: 'node'` ed esternalizzare correttamente `vue`, questa è la build che sarà caricata.
- I file dev/prod sono pre-built, ma il file più appropriato è richiesto automaticamente a seconda di `process.env.NODE_ENV`.

## Scegliere tra Runtime + Compiler e Runtime-only

Se hai bisogno di compilare i template nel client (es. passare una stringa all'option template, o agganciarsi ad un elemento usando il suo HTML in-DOM come template), avrai bisogno del compilatore e quindi della build completa:

```js
// Questo richiede il compilatore
Vue.createApp({
  template: '<div>{{ hi }}</div>'
})

// questo no
Vue.createApp({
  render() {
    return Vue.h('div', {}, this.hi)
  }
})
```

Quando usi `vue-loader`, i template dentro i file `*.vue` sono precompilati in JavaScript durante la fase di build. Non hai bisogno del compilatore nel bundle finale, e puoi quindi usare la build runtime-only.
