---
footer: false
---

# Avvio rapido {#quick-start}

## Prova Vue Online {#try-vue-online}

- Per avere un rapido assaggio di Vue, puoi provarlo direttamente nel nostro [Playground](https://play.vuejs.org/#eNo9jcEKwjAMhl/lt5fpQYfXUQfefAMvvRQbddC1pUuHUPrudg4HIcmXjyRZXEM4zYlEJ+T0iEPgXjn6BB8Zhp46WUZWDjCa9f6w9kAkTtH9CRinV4fmRtZ63H20Ztesqiylphqy3R5UYBqD1UyVAPk+9zkvV1CKbCv9poMLiTEfR2/IXpSoXomqZLtti/IFwVtA9A==).

- Se preferisci un'installazione HTML semplice senza dover effettuare prima una build, puoi utilizzare questo [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) come punto di partenza.

- Se hai già familiarità con Node.js e conosci gli strumenti di build (building tools), puoi anche provare una configurazione completa direttamente nel tuo browser su [StackBlitz](https://vite.new/vue).

## Creare un'applicazione Vue {#creating-a-vue-application}

:::tip Prerequisiti

- Familiarità con la linea di comando / terminale
- Avere installato [Node.js](https://nodejs.org/) versione 16.0 o superiore
  :::

In questa sezione vedremo come creare una Vue [Single Page Application](/guide/extras/ways-of-using-vue#single-page-application-spa) in locale, sulla tua macchina. Il progetto creato utilizzerà una configurazione di build basata su [Vite](https://vitejs.dev) e ci permetterà di usare i [Single-File Components](/guide/scaling-up/sfc) (SFCs, componenti a Singolo File) di Vue.

Assicurati di avere installato una versione aggiornata di [Node.js](https://nodejs.org/) e che la tua cartella di lavoro corrente sia quella in cui intendi creare un progetto. Esegui il seguente comando nella tua linea di comando (senza il simbolo `>`):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm create vue@latest</span></span></code></pre></div>

Questo comando installerà ed eseguirà [create-vue](https://github.com/vuejs/create-vue), lo strumento ufficiale per la creazione di un progetto Vue (Scaffolding). Ti verranno presentate delle richieste per diverse funzionalità opzionali come il supporto a TypeScript e ai test:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">il-nome-del-tuo-progetto</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add an End-to-End Testing Solution? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Cypress / Playwright</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">il-nome-del-tuo-progetto</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Se non sei sicuro di un'opzione, per ora scegli semplicemente `No` premendo invio. Una volta creato il progetto, segui le istruzioni per installare le dipendenze e avviare il server di sviluppo:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">il-nome-del-tuo-progetto</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

Adesso dovresti avere il tuo primo progetto Vue in esecuzione! Nota che i componenti di esempio nel progetto generato sono scritti utilizzando la [Composition API](/guide/introduction#composition-api) e `<script setup>`, al posto della [Options API](/guide/introduction#options-api). Ecco alcuni consigli aggiuntivi:

- La configurazione IDE consigliata è [Visual Studio Code](https://code.visualstudio.com/) + [estensione Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Se utilizzi altri editor consulta la sezione [supporto IDE](/guide/scaling-up/tooling#ide-support).
- Altri dettagli sugli strumenti, compresa l'integrazione con i framework di backend, sono discussi nella [Guida agli strumenti](/guide/scaling-up/tooling).
- Per saperne di più su Vite, lo strumento di build, consulta la [documentazione di Vite](https://vitejs.dev).
- Se scegli di usare TypeScript consulta la [Guida all'uso di TypeScript](typescript/overview).

Quando sei pronto per rilasciare la tua app in produzione, esegui il seguente comando:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

Questo creerà una versione dell'app pronta per la produzione nella cartella `./dist` del progetto. Consulta la [Guida al Rilascio in Produzione](/guide/best-practices/production-deployment) per saperne di più su come rilasciare la tua app in produzione.

[Prossimi Passi >](#next-steps)

## Utilizzo di Vue da CDN {#using-vue-from-cdn}

Puoi utilizzare Vue direttamente da una CDN tramite un tag script:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Qui stiamo utilizzando [unpkg](https://unpkg.com/), ma puoi utilizzare qualsiasi CDN che serve pacchetti npm, per esempio [jsdelivr](https://www.jsdelivr.com/package/npm/vue) o [cdnjs](https://cdnjs.com/libraries/vue). E naturalmente, puoi anche scaricare questo file e "servirlo" tu stesso.

Quando si utilizza Vue da una CDN, non c'è un "passaggio di build". Questo rende tutto più semplice ed è un buon modo per migliorare l'HTML statico o l'integrazione con un framework di backend. Tuttavia, non sarai in grado di utilizzare la sintassi dei Single-File Component (SFC).

### Utilizzo della Build Globale {#using-the-global-build}

Il link sopra carica la _global build_ di Vue, dove tutte le API di livello superiore sono esposte come proprietà sull'oggetto `Vue` globale. Ecco un esempio completo che utilizza la build globale:

<div class="options-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Demo Codepen](https://codepen.io/vuejs-examples/pen/QWJwJLp)

</div>

<div class="composition-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[Demo Codepen](https://codepen.io/vuejs-examples/pen/eYQpQEG)

:::tip
In tutta la guida molti degli esempi per la Composition API utilizzeranno la sintassi `<script setup>`, che richiede degli strumenti di build. Se intendi utilizzare la Composition API senza un preventivo passaggio di build consulta l'uso dell'[opzione `setup()`](/api/composition-api-setup).
:::

</div>

### Utilizzo di Build ES Module {#using-the-es-module-build}

Nel resto della documentazione utilizzeremo principalmente la sintassi dei [moduli ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). La maggior parte dei moderni browser ora supporta nativamente i moduli ES, così possiamo utilizzare Vue tramite moduli ES nativi serviti da una CDN, in questo modo:

<div class="options-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

</div>

<div class="composition-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

</div>

Nota che stiamo utilizzando `<script type="module">` e l'URL della CDN punta alla **build del modulo ES** di Vue.

<div class="options-api">

[Demo Codepen](https://codepen.io/vuejs-examples/pen/VwVYVZO)

</div>
<div class="composition-api">

[Demo Codepen](https://codepen.io/vuejs-examples/pen/MWzazEv)

</div>

### Abilitare le Import maps {#enabling-import-maps}

Nell'esempio sopra importiamo dall'intera URL della CDN, ma nel resto della documentazione vedrai codice come questo:

```js
import { createApp } from 'vue'
```

Possiamo indicare al browser dove trovare l'import di `vue` usando le [Import Maps](https://caniuse.com/import-maps):

<div class="options-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Demo Codepen](https://codepen.io/vuejs-examples/pen/wvQKQyM)

</div>

<div class="composition-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[Demo Codepen](https://codepen.io/vuejs-examples/pen/YzRyRYM)

</div>

Puoi aggiungere alla import map anche voci per altre dipendenze, ma assicurati che puntino alla versione dei moduli ES della libreria che intendi utilizzare.

:::tip Supporto dei Browser per le Import Maps
Le Import Maps sono una funzionalità relativamente nuova del browser. Assicurati di utilizzare un browser che possa supportare le [Import Maps](https://caniuse.com/import-maps). Al momento è supportata solo da Safari 16.4+.
:::

:::warning Note sull'uso in produzione
Gli esempi visti finora usano la build di sviluppo di Vue - se intendi utilizzare Vue da una CDN in produzione, assicurati di consultare la [Guida al Rilascio in Produzione](/guide/best-practices/production-deployment#without-build-tools).
:::

### Suddividere i moduli {#splitting-up-the-modules}

Man mano che procediamo nella guida, potrebbe essere necessario dividere il nostro codice in file JavaScript separati per renderne la gestione più semplice. Ad esempio:

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

<div class="options-api">

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}
```

</div>
<div class="composition-api">

```js
// my-component.js
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>count is {{ count }}</div>`
}
```

</div>

Se apri direttamente nel tuo browser il file `index.html` indicato qui sopra, noterai che restituisce un errore perché i moduli ES non possono funzionare sul protocollo `file://`, che è il protocollo che il browser utilizza quando chiedi di aprire un file locale.

Per motivi di sicurezza i moduli ES possono funzionare solo sul protocollo `http://`, che è quello che i browser utilizzano quando aprono pagine web. Affinché i moduli ES funzionino sul nostro computer locale, dobbiamo servire la `index.html` sul protocollo `http://` tramite un server HTTP locale.

Per avviare un server HTTP locale, assicurati di avere installato [Node.js](https://nodejs.org/en/), poi, nella stessa cartella dove si trova il tuo file HTML,  esegui `npx serve` dalla linea di comando. Puoi usare anche qualsiasi altro server HTTP in grado di servire i file statico con i tipi MIME corretti.

Potresti aver notato che il template del componente importato è inserito come stringa JavaScript. Se stai utilizzando VSCode puoi installare l'estensione [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) e, in questo caso, usare come prefisso per la stringa il commento `/*html*/` per evidenziare la sintassi.

## Prossimi passi {#next-steps}

Se hai saltato l'[Introduzione](/guide/introduction), ti consigliamo vivamente di leggerla prima di passare al resto della documentazione.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Continua con la guida</p>
    <p class="next-steps-caption">La guida ti mostrerà in dettaglio ogni aspetto del framework.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Prova il Tutorial</p>
    <p class="next-steps-caption">Per coloro che preferiscono apprendere sporcandosi le mani.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Guarda gli Esempi</p>
    <p class="next-steps-caption">Esplora gli esempi di funzionalità base e casi d'uso comuni.</p>
  </a>
</div>
