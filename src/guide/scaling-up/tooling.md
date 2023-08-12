# Tooling {#tooling}

## Provalo online {#try-it-online}

Non è necessario installare nulla sul tuo computer per provare i SFC di Vue: ci sono dei playground online che ti permettono di farlo direttamente nel browser:

- [Vue SFC Playground](https://play.vuejs.org)
  - Sempre basato sull'ultimo commit
  - Progettato per ispezionare i risultati della compilazione dei componenti
- [Vue + Vite su StackBlitz](https://vite.new/vue)
  - Ambiente simile a un IDE che esegue il vero server di sviluppo Vite nel browser
  - Più simile all'ambiente di sviluppo locale

È anche consigliabile utilizzare questi playground online per fornire riproduzioni quando segnali bug.

## Creazione di un nuovo progetto{#project-scaffolding}

### Utilizzo di Vite {#vite}

[Vite](https://vitejs.dev/) è uno strumento di build leggero e veloce con un supporto di prima classe per gli SFC (Single-File Components) di Vue. Vite è creato da Evan You, l'autore di Vue!

Per iniziare con Vite + Vue, esegui semplicemente:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">$</span> <span style="color:#A6ACCD;">npm create vue@latest</span></span></code></pre></div>

Questo comando installerà ed eseguirà [create-vue](https://github.com/vuejs/create-vue), lo strumento ufficiale di creazione di progetti Vue.

- Per saperne di più su Vite, consulta la [documentazione di Vite](https://vitejs.dev).
- Per configurare il comportamento specifico di Vue in un progetto Vite, ad esempio passare opzioni al compilatore Vue, consulta la documentazione di  [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme).

Entrambi i playground online menzionati sopra supportano anche il download dei file come progetto Vite.

### Vue CLI {#vue-cli}

[Vue CLI](https://cli.vuejs.org/) è la catena di strumenti ufficiale basata su webpack per Vue. Attualmente è in modalità di manutenzione e raccomandiamo di iniziare nuovi progetti con Vite, a meno che tu non faccia affidamento su funzionalità specifiche solo di webpack. Vite fornirà un'esperienza di sviluppo superiore nella maggior parte dei casi.

Per informazioni sulla migrazione da Vue CLI a Vite:

- [Guida alla migrazione da Vue CLI a Vite di VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Strumenti / Plugin che aiutano con la migrazione automatica](https://github.com/vitejs/awesome-vite#vue-cli)

### Nota sulla compilazione dei template nel browser {#note-on-in-browser-template-compilation}

Quando si utilizza Vue senza una fase di build, i template dei componenti vengono scritti direttamente nell'HTML della pagina o come stringhe JavaScript incorporate. In tali casi, Vue deve fornire il compilatore dei template al browser per eseguire la compilazione on-the-fly. D'altro canto, il compilatore sarebbe inutile se precompiliamo i template con una fase di build. Per ridurre la dimensione del bundle client, Vue fornisce [diverse "build"](https://unpkg.com/browse/vue@3/dist/) ottimizzate per diversi casi d'uso.

- I file di build che iniziano con `vue.runtime.*` sono **build solo runtime**: non includono il compilatore. Quando si utilizzano queste build, tutti i template devono essere precompilati tramite una fase di build.

- I file di build che non includono `.runtime` sono **build complete**: includono il compilatore e supportano la compilazione dei template direttamente nel browser. Tuttavia, aumenteranno il payload di circa 14 KB.

Le nostre impostazioni di tooling predefinite utilizzano la build solo runtime poiché tutti i template negli SFC (Single-File Components) vengono precompilati. Se, per qualche motivo, hai bisogno della compilazione dei template nel browser anche con una fase di build, puoi farlo configurando lo strumento di build per fare un alias di `vue` a `vue/dist/vue.esm-bundler.js` invece.

Se stai cercando un'alternativa più leggera per l'uso senza fase di build, dai un'occhiata a [petite-vue](https://github.com/vuejs/petite-vue).

## Supporto IDE {#ide-support}

- La configurazione IDE consigliata è [VSCode](https://code.visualstudio.com/) + l'estensione [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar). L'estensione fornisce evidenziazione della sintassi, supporto TypeScript e intellisense per le espressioni dei template e le props dei componenti.

  :::tip
  Volar sostituisce [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), la nostra precedente estensione ufficiale di VSCode per Vue 2. Se hai Vetur attualmente installato, assicurati di disabilitarlo nei progetti Vue 3.
  :::

- [WebStorm](https://www.jetbrains.com/webstorm/) fornisce anche un ottimo supporto integrato per i Vue SFC.

- Altri IDE che supportano il [Language Service Protocol](https://microsoft.github.io/language-server-protocol/) (LSP) possono sfruttare le funzionalità principali di Volar tramite LSP:

  - Supporto di Sublime Text tramite [LSP-Volar](https://github.com/sublimelsp/LSP-volar).

  - Supporto di vim / Neovim tramite [coc-volar](https://github.com/yaegassy/coc-volar).

  - Supporto di emacs tramite [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/)

## I Devtools {#browser-devtools}

<VueSchoolLink href="https://vueschool.io/lessons/using-vue-dev-tools-with-vuejs-3" title="Lezione gratuita sui Vue.js Devtools"/>

L'estensione dei devtools per il browser di Vue ti consente di esplorare l'albero dei componenti di un'app Vue, ispezionare lo stato dei singoli componenti, monitorare gli eventi di gestione dello stato e profilare le prestazioni.

![devtools screenshot](https://raw.githubusercontent.com/vuejs/devtools/main/media/screenshot-shadow.png)

- [Documentazione](https://devtools.vuejs.org/)
- [Estensione Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Addon Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Estensione Edge](https://microsoftedge.microsoft.com/addons/detail/vuejs-devtools/olofadcdnkkjdfgjcmjaadnlehnnihnl)
- [App Electron Standalone](https://devtools.vuejs.org/guide/installation.html#standalone)

## TypeScript {#typescript}

Articolo principale: [Using Vue with TypeScript](/guide/typescript/overview).

- [Volar](https://github.com/johnsoncodehk/volar) fornisce il controllo dei tipi per gli SFC utilizzando blocchi `<script lang="ts">`, comprese le espressioni dei template e la validazione delle props tra i componenti.

- Usa [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/vue-tsc) per eseguire lo stesso controllo dei tipi da riga di comando, o per generare file `d.ts` per gli SFC.

## Testing {#testing}

Articolo principale: [Guida al testing](/guide/scaling-up/testing).

- [Cypress](https://www.cypress.io/) è consigliato per i test end-to-end. Può anche essere utilizzato per i test dei componenti per gli SFC di Vue tramite il [Cypress Component Test Runner](https://docs.cypress.io/guides/component-testing/introduction).

- [Vitest](https://vitest.dev/) è un runner di test creato dai membri del team Vue / Vite che si concentra sulla velocità. È progettato specificamente per le applicazioni basate su Vite per fornire lo stesso ciclo di feedback istantaneo per il testing unitario / dei componenti.

- [Jest](https://jestjs.io/)  può essere utilizzato con Vite tramite [vite-jest](https://github.com/sodatea/vite-jest). Tuttavia, questa opzione è consigliata solo se hai suite di test esistenti basate su Jest che devi migrare a una configurazione basata su Vite, poiché Vitest fornisce funzionalità simili con un'integrazione molto più efficiente.

## Linting {#linting}

Il team Vue mantiene [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue), un plugin [ESLint](https://eslint.org/) che supporta regole di linting specifiche per gli SFC.

Gli utenti che in passato hanno utilizzato Vue CLI potrebbero essere abituati a configurare i linters tramite i loader di webpack. Tuttavia, quando si utilizza una configurazione di build basata su Vite, la nostra raccomandazione generale è la seguente:

1. `npm install -D eslint eslint-plugin-vue`, poi segui la [guida alla configurazione](https://eslint.vuejs.org/user-guide/#usage) di `eslint-plugin-vue`.

2. Configura le estensioni IDE di ESLint, ad esempio [ESLint per VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), in modo da ottenere feedback dal linter direttamente nel tuo editor durante lo sviluppo. Questo evita anche un costo di linting non necessario durante l'avvio del server di sviluppo.

3. Esegui ESLint come parte del comando di build di produzione, in modo da ottenere un feedback completo dal linter prima della distribuzione in produzione.

4. (Opzionale) Configura strumenti come [lint-staged](https://github.com/okonet/lint-staged) per eseguire automaticamente il linting dei file modificati al momento del commit su git.

## Formattazione {#formatting}

- L'estensione [Volar](https://github.com/johnsoncodehk/volar) per VSCode fornisce la formattazione per gli SFC di Vue direttamente.

- In alternativa, [Prettier](https://prettier.io/) fornisce il supporto integrato per la formattazione degli SFC di Vue.

## Integrazioni con blocchi personalizzati nei SFC {#sfc-custom-block-integrations}

I blocchi personalizzati vengono compilati in importazioni nello stesso file Vue con diversi query di richiesta. Spetta al tool di build sottostante gestire queste richieste di importazione.

- Se si utilizza Vite, dovrebbe essere utilizzato un plugin Vite personalizzato per trasformare i blocchi personalizzati corrispondenti in JavaScript eseguibile. [Esempio](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- Se si utilizza Vue CLI o webpack "puro", dovrebbe essere configurato un loader webpack per trasformare i blocchi corrispondenti. [Esempio](https://vue-loader.vuejs.org/guide/custom-blocks.html)

## Pacchetti a basso livello {#lower-level-packages}

### `@vue/compiler-sfc` {#vue-compiler-sfc}

- [Documentazione](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

Questo pacchetto fa parte del monorepo del core di Vue ed è sempre pubblicato con la stessa versione del pacchetto principale `vue`. È incluso come dipendenza del pacchetto principale `vue` e reso disponibile tramite un proxy come `vue/compiler-sfc`, quindi non è necessario installarlo singolarmente.

Il pacchetto stesso fornisce utility a livello inferiore per elaborare gli SFC di Vue ed è destinato solo agli autori di strumenti che devono supportare gli SFC di Vue in strumenti personalizzati.

:::tip
Si preferisce sempre utilizzare questo pacchetto tramite l'importazione profonda `vue/compiler-sfc`, poiché ciò garantisce che la sua versione sia sincronizzata con il runtime di Vue.
:::

### `@vitejs/plugin-vue` {#vitejs-plugin-vue}

- [Documentazione](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)

Plugin ufficiale che fornisce il supporto per gli SFC di Vue in Vite.

### `vue-loader` {#vue-loader}

- [Documentazione](https://vue-loader.vuejs.org/)

Il loader ufficiale che fornisce il supporto per gli SFC di Vue in webpack. Se stai utilizzando Vue CLI, consulta anche la [documentazione sulla modifica delle opzioni di `vue-loader` in Vue CLI](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

## Altri playground online {#other-online-playgrounds}

- [VueUse Playground](https://play.vueuse.org)
- [Vue + Vite su Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue su CodeSandbox](https://codesandbox.io/s/vue-3)
- [Vue su Codepen](https://codepen.io/pen/editor/vue)
- [Vue su Components.studio](https://components.studio/create/vue3)
- [Vue su WebComponents.dev](https://webcomponents.dev/create/cevue)

<!-- TODO ## Backend Framework Integrations -->
