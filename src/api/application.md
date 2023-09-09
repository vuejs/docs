# API dell'Applicazione {#application-api}

## createApp() {#createapp}

Crea un'istanza dell'applicazione.

- **Tipo**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **Dettagli**

  Il primo argomento è il componente root. Il secondo argomento opzionale sono le props da passare al componente root.

- **Esempio**

  Con componente root inline:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* opzioni del componente root */
  })
  ```

  Con componente importato:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **Guarda anche** [Guida - Creare un'Applicazione Vue](/guide/essentials/application)

## createSSRApp() {#createssrapp}

Crea un'istanza dell'applicazione in modalità [SSR Hydration](/guide/scaling-up/ssr#client-hydration). L'uso è esattamente lo stesso di `createApp()`.

## app.mount() {#app-mount}

Monta l'istanza dell'applicazione in un elemento contenitore.

- **Tipo**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **Dettagli**

  L'argomento può essere sia un vero elemento DOM sia un selettore CSS (verrà utilizzato il primo elemento corrispondente trovato). Restituisce l'istanza del componente radice.

  Se il componente presenta un template o una render function, sostituirà eventuali nodi DOM esistenti all'interno dell'elemento contenitore. Altrimenti, se il compilatore a runtime è disponibile, l'`innerHTML` dell'elemento contenitore verrà utilizzato come template.

  In modalità SSR hydration, farà un hydrate dei nodi DOM esistenti all'interno dell'elemento contenitore. Se ci sono delle [incongruenze](/guide/scaling-up/ssr#hydration-mismatch), i nodi DOM esistenti verranno modificati per farli coincidere con l'output previsto.

  Per ogni istanza dell'app, `mount()` può essere chiamato solo una volta.

- **Esempio**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  Può anche essere montato su un vero elemento DOM:

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount() {#app-unmount}

Smonta un'istanza di un'applicazione montata, attivando gli hook del ciclo di vita di unmount per tutti i componenti presenti nell'albero dei componenti dell'applicazione.

- **Tipo**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.component() {#app-component}

Registra un componente globale se viene fornito sia un nome sotto forma di stringa che una definizione di componente, o ne recupera uno già registrato se viene passato solo il nome.

- **Tipo**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **Esempio**

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // registra un oggetto con le option
  app.component('my-component', {
    /* ... */
  })

  // recupera un componente registrato
  const MyComponent = app.component('my-component')
  ```

- **Guarda anche** [Registrare un componente](/guide/components/registration)

## app.directive() {#app-directive}

Registra una direttiva personalizzata globale se viene fornito sia un nome sotto forma di stringa che una definizione di direttiva, o ne recupera una già registrata se viene passato solo il nome.

- **Tipo**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **Esempio**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // registra la direttiva tramite un oggetto
  app.directive('my-directive', {
    /* hook della direttiva personalizzata */
  })

  // registra la direttiva tramite una arrow function
  app.directive('my-directive', () => {
    /* ... */
  })

  // recupera una direttiva registrata
  const myDirective = app.directive('my-directive')
  ```

- **Guarda anche** [Le Direttive Personalizzate](/guide/reusability/custom-directives)

## app.use() {#app-use}

Installa un [plugin](/guide/reusability/plugins).

- **Tipo**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **Dettagli**

  Si aspetta il plugin come primo argomento e, se presenti, le opzioni del plugin come secondo argomento.

  Il plugin può essere un oggetto con un metodo `install()`, oppure una semplice funzione che sarà utilizzata come metodo `install()`. Le opzioni (secondo argomento di `app.use()`) verranno passate al metodo `install()` del plugin.

  Quando `app.use()` viene chiamato sullo stesso plugin più volte, il plugin verrà installato solo una volta.

- **Esempio**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **Guarda anche** [I Plugin](/guide/reusability/plugins)

## app.mixin() {#app-mixin}

Applica un mixin globale (limitato all'applicazione). Un mixin globale applica le options che contiene a ogni istanza di componente nell'applicazione.

:::warning Non raccomandato
I mixin sono supportati in Vue 3 principalmente per retro-compatibilità, a causa del loro uso diffuso nelle librerie dell'ecosistema. L'uso dei mixin, specialmente dei mixin globali, dovrebbe essere evitato nel codice dell'applicazione.

Per il riutilizzo della logica, al loro posto usare [I Composables](/guide/reusability/composables).
:::

- **Tipo**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.provide() {#app-provide}

Fornisce un valore che può essere iniettato in tutti i componenti discendenti all'interno dell'applicazione.

- **Tipo**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **Dettagli**

  Si aspetta una chiave per l'injection come primo argomento e il valore fornito come secondo. Restituisce l'istanza dell'applicazione stessa.

- **Esempio**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'ciao')
  ```

  All'interno di un componente nell'applicazione:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'ciao'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'ciao'
    }
  }
  ```

  </div>

- **Guarda anche**
  - [Provide / Inject](/guide/components/provide-inject)
  - [Provide a livello app](/guide/components/provide-inject#app-level-provide)
  - [app.runWithContext()](#app-runwithcontext)

## app.runWithContext()<sup class="vt-badge" data-text="3.3+" /> {#app-runwithcontext}

Esegue una callback con l'attuale app come context di injection.

- **Tipo**

  ```ts
  interface App {
    runWithContext<T>(fn: () => T): T
  }
  ```

- **Dettagli**

  Si aspetta una funzione di callback e la esegue immediatamente. Durante la chiamata sincrona della callback, le chiamate a `inject()` sono in grado di cercare injection dai valori forniti dall'app attuale, anche quando non c'è un'istanza di componente attiva. Verrà restituito anche il valore proveniente dalla callback.

- **Esempio**

  ```js
  import { inject } from 'vue'

  app.provide('id', 1)

  const injected = app.runWithContext(() => {
    return inject('id')
  })

  console.log(injected) // 1
  ```

## app.version {#app-version}

Fornisce la versione di Vue con cui è stata creata l'applicazione. Questo è utile all'interno dei [plugin](/guide/reusability/plugins), dove potresti aver bisogno di logica condizionale basata su diverse versioni di Vue.

- **Tipo**

  ```ts
  interface App {
    version: string
  }
  ```

- **Esempio**

  Esecuzione di un controllo sulla versione all'interno di un plugin:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('Questo plugin richiede Vue 3')
      }
    }
  }
  ```

- **Guarda anche** [API Globali - version](/api/general#version)

## app.config {#app-config}

Ogni istanza dell'applicazione espone un oggetto `config` che contiene le impostazioni di configurazione per quell'applicazione. Puoi modificare le sue proprietà (documentate di seguito) prima di montare la tua applicazione.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler {#app-config-errorhandler}

Assegna un handler globale per gli errori non intercettati che si propagano dall'interno dell'applicazione.

- **Tipo**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` è una specifica informazione di errore di Vue,
      // ad esempio, in quale hook del ciclo di vita è stato generato l'errore
      info: string
    ) => void
  }
  ```

- **Dettagli**

  Il gestore (handler) degli errori riceve tre argomenti: l'errore, l'istanza del componente che ha generato l'errore e una stringa di informazione che specifica il type della fonte dell'errore.

  Può catturare errori dalle seguenti fonti:

  - Rendering dei componenti
  - Gestori di eventi (Event handlers)
  - Hook del ciclo di vita
  - Funzione `setup()`
  - Watchers
  - Hook delle direttive personalizzate
  - Hook delle transizioni

- **Esempio**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // gestisci l'errore, ad es. segnalalo a un servizio
  }
  ```

## app.config.warnHandler {#app-config-warnhandler}

Assegna un handler personalizzato per gli avvisi a runtime di Vue.

- **Tipo**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **Dettagli**

  Il gestore (handler) degli avvisi riceve il messaggio di avviso come primo argomento, l'istanza del componente di origine come secondo argomento e una stringa di trace del componente come terzo.

  Può essere utilizzato per filtrare avvisi specifici per ridurre la verbosità della console. Tutti gli avvisi di Vue dovrebbero essere gestiti durante lo sviluppo, l'uso è consigliato solo durante le sessioni di debug per concentrarsi su avvisi specifici tra i tanti e dovrebbe essere rimosso una volta terminato il debug.

  :::tip
  Gli avvisi funzionano solo durante lo sviluppo, questa configurazione, quindi, viene ignorata in modalità produzione.
  :::

- **Esempio**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` è la traccia della gerarchia dei componenti
  }
  ```

## app.config.performance {#app-config-performance}

Imposta questo valore su `true` per abilitare il tracing delle prestazioni di init, compile, rendering e patch del componente nel pannello performance/timeline degli strumenti per sviluppatori del browser. Funziona solo in modalità di sviluppo e nei browser che supportano l'API [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark).

- **Type:** `boolean`

- **Guarda anche** [Guida - Performance](/guide/best-practices/performance)

## app.config.compilerOptions {#app-config-compileroptions}

Configura le opzioni del compilatore a runtime. I valori impostati su questo oggetto saranno passati al compilatore di template nel browser e influenzeranno ogni componente nell'app configurata. Nota che puoi anche sovrascrivere queste opzioni su base componente utilizzando l'[opzione `compilerOptions`](/api/options-rendering#compileroptions).

::: warning Importante
Questa opzione di configurazione viene rispettata solo quando si utilizza la build completa (cioè la `vue.js` standalone che può compilare i template nel browser). Se, invece, stai usando la build solo per il runtime con un setup di build, le opzioni del compilatore devono essere passate a `@vue/compiler-dom` tramite le configurazioni degli strumenti di build.

- Per `vue-loader`: [passa dalle opzioni del loader `compilerOptions`](https://vue-loader.vuejs.org/options.html#compileroptions). Vedi anche [come configurarlo in `vue-cli`](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

- Per `vite`: [passa dalle opzioni di `@vitejs/plugin-vue`](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options).
  :::

### app.config.compilerOptions.isCustomElement {#app-config-compileroptions-iscustomelement}

Specifica un metodo di controllo per riconoscere gli elementi personalizzati nativi (native custom elements).

- **Type:** `(tag: string) => boolean`

- **Dettagli**

  Dovrebbe restituire `true` se il tag deve essere trattato come un elemento personalizzato nativo. Se trova un tag corrispondente, Vue lo renderizzerà come un elemento nativo invece di tentare di risolverlo come un componente Vue.

  Non c'è bisogno di verificare i tag nativi HTML e SVG tramite questa funzione - il parser di Vue li riconosce automaticamente.

- **Esempio**

  ```js
  // tratta tutti i tag che iniziano con 'ion-' come elementi personalizzati
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **Guarda anche** [Vue e i Web Components](/guide/extras/web-components)

### app.config.compilerOptions.whitespace {#app-config-compileroptions-whitespace}

Adegua il comportamento della gestione degli spazi bianchi nel template.

- **Type:** `'condense' | 'preserve'`

- **Default:** `'condense'`

- **Dettagli**

  Vue rimuove/condensa i caratteri degli spazi bianchi nei template per produrre un output compilato più efficiente. La strategia predefinita è "condense", con il seguente comportamento:

  1. I caratteri di spazio bianco iniziali/finali all'interno di un elemento sono condensati in un singolo spazio.
  2. I caratteri di spazio bianco tra gli elementi che contengono nuove righe vengono rimossi.
  3. I caratteri di spazio bianco consecutivi nei nodi di testo sono condensati in un singolo spazio.

  Impostare questa opzione su `'preserve'` disabiliterà (2) e (3).

- **Esempio**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters {#app-config-compileroptions-delimiters}

Modifica i delimitatori utilizzati per l'interpolazione del testo all'interno del template.

- **Type:** `[string, string]`

- **Default:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **Dettagli**

  Tipicamente viene utilizzato per evitare conflitti con framework server side che utilizzano anche essi la sintassi mustache.

- **Esempio**

  ```js
  // Delimitatori modificati nello stile delle template string di ES6
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments {#app-config-compileroptions-comments}

Modifica il trattamento dei commenti HTML nei template.

- **Type:** `boolean`

- **Default:** `false`

- **Dettagli**

  Di default, Vue rimuoverà i commenti in produzione. Impostare questa opzione su `true`, costringerà Vue a conservare i commenti anche in produzione. I commenti sono sempre conservati durante lo sviluppo. Questa opzione viene utilizzata tipicamente quando Vue viene usato con altre librerie che si basano sui commenti HTML. 

- **Esempio**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties {#app-config-globalproperties}

Un oggetto che può essere utilizzato per registrare proprietà globali accessibili su qualsiasi istanza di componente all'interno dell'applicazione.

- **Tipo**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **Dettagli**

  Questo sostituisce il `Vue.prototype` di Vue 2, che non è più presente in Vue 3. Come per qualsiasi cosa globale, dovrebbe essere utilizzato con parsimonia.

  Se una proprietà globale entra in conflitto con una proprietà di un componente, la proprietà del componente avrà la priorità.

- **Usage**

  ```js
  app.config.globalProperties.msg = 'ciao'
  ```

  Ciò rende `msg` disponibile all'interno di qualsiasi template di componente nell'applicazione, e anche su `this` di qualsiasi istanza di componente:

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'ciao'
    }
  }
  ```

- **Guarda anche** [Guida - Augmenting Global Properties](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

## app.config.optionMergeStrategies {#app-config-optionmergestrategies}

Un oggetto per definire strategie di merging delle opzioni dei componenti personalizzati.

- **Tipo**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **Dettagli**

  Alcuni plugin / librerie aggiungono il supporto per le opzioni dei componenti personalizzati (iniettando dei mixin globali). Queste opzioni potrebbero richiedere una speciale logica di merging quando la stessa opzione deve essere "unita" usando molteplici fonti (ad es. mixin o ereditarietà del componente).

  Una funzione per una strategia di merge può essere registrata per una custom option assegnandola all'oggetto `app.config.optionMergeStrategies` utilizzando il nome dell'opzione come chiave.

  La funzione per il merge riceve il valore di quell'opzione definito sulle istanze padre e figlio come primo e secondo argomento, rispettivamente.

- **Esempio**

  ```js
  const app = createApp({
    // opzione del componente (from self)
    msg: 'Vue',
    // opzione da un mixin
    mixins: [
      {
        msg: 'Ciao '
      }
    ],
    mounted() {
      // opzioni unite ed esposte su this.$options
      console.log(this.$options.msg)
    }
  })

  // definisce una strategia di merge personalizzata per `msg`
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // logga 'Ciao Vue'
  ```

- **Guarda anche** [Istanza del Componente - `$options`](/api/component-instance#options)
