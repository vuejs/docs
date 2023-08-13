---
outline: deep
---

# Server-Side Rendering (SSR) {#server-side-rendering-ssr}

## Panoramica {#overview}

### Cos'è il SSR? {#what-is-ssr}

Vue.js è un framework per la costruzione di applicazioni lato client. Per impostazione predefinita, i componenti Vue producono e manipolano il DOM nel browser come output. Tuttavia, è anche possibile renderizzare gli stessi componenti in stringhe HTML lato server, inviarle direttamente al browser e infine "idratare" il markup statico in un'app completamente interattiva lato client.

Un'app Vue.js renderizzata lato server può essere considerata anche "isomorfica" o "universale", nel senso che la maggior parte del codice dell'app viene eseguita sia sul server **che** sul client.

### Perché il SSR? {#why-ssr}

Rispetto a un'applicazione lato client Single-Page Application (SPA), il vantaggio del SSR risiede principalmente in:

- **Tempo più rapido per il contenuto**: ciò è più evidente su una connessione Internet lenta o su dispositivi lenti. Il markup renderizzato lato server non deve aspettare che tutto il JavaScript venga scaricato ed eseguito per essere visualizzato, quindi l'utente vedrà una pagina completamente renderizzata prima. Inoltre, il recupero dei dati viene eseguito lato server durante la visita iniziale, il che probabilmente ha una connessione più veloce al database rispetto al client. Questo generalmente porta a un miglioramento delle metriche delle [Core Web Vitals](https://web.dev/vitals/), a una migliore esperienza utente e può essere fondamentale per le applicazioni in cui il tempo per il contenuto è direttamente associato al tasso di conversione.

- **Modello mentale unificato**: puoi utilizzare lo stesso linguaggio e lo stesso modello mentale dichiarativo orientato ai componenti per sviluppare l'intera app, invece di passare avanti e indietro tra un sistema di templating lato server e un framework lato client.

- **Migliore SEO**: i crawler dei motori di ricerca vedranno direttamente la pagina completamente renderizzata.

  :::tip
  Al momento, Google e Bing possono indicizzare applicazioni JavaScript sincrone senza problemi. Sincrona è la parola chiave qui. Se la tua app inizia con uno spinner di caricamento e poi recupera i contenuti tramite Ajax, il crawler non aspetterà che tu finisca. Ciò significa che se hai contenuti recuperati in modo asincrono su pagine in cui l'ottimizzazione per i motori di ricerca è importante, il SSR potrebbe essere necessario.
  :::

Ci sono anche alcuni compromessi da considerare quando si utilizza il SSR:

- Vincoli di sviluppo. Il codice specifico del browser può essere utilizzato solo all'interno di determinati hook del ciclo di vita; alcune librerie esterne potrebbero richiedere un trattamento speciale per poter essere eseguite in un'app renderizzata lato server.

- Configurazione di build e requisiti di distribuzione più complessi. A differenza di una SPA completamente statica che può essere distribuita su qualsiasi server di file statici, un'app renderizzata lato server richiede un ambiente in cui possa essere eseguito un server Node.js.

- Maggior carico lato server. Renderizzare un'app completa in Node.js sarà più intensivo in termini di CPU rispetto a servire solo file statici, quindi se prevedi un alto traffico, preparati per un corrispondente carico sul server e utilizza strategie di caching in modo saggio.

Prima di utilizzare il SSR per la tua app, la prima domanda che dovresti fare è se ne hai effettivamente bisogno. Dipende principalmente da quanto è importante il tempo per il contenuto per la tua app. Ad esempio, se stai costruendo una dashboard interna in cui qualche centinaio di millisecondi in più al caricamento iniziale non conta così tanto, il SSR sarebbe eccessivo. Tuttavia, nei casi in cui il tempo per il contenuto è assolutamente critico, il SSR può aiutarti a ottenere le migliori prestazioni possibili per il caricamento iniziale.

### SSR vs. SSG {#ssr-vs-ssg}

**Static Site Generation (SSG)**, noto anche come prerendering, è un'altra tecnica popolare per la creazione di siti web veloci. Se i dati necessari per il server-rendering di una pagina sono gli stessi per ogni utente, anziché renderizzare la pagina ogni volta che arriva una richiesta, possiamo renderizzarla solo una volta, in anticipo, durante il processo di build. Le pagine pre-renderizzate vengono generate e servite come file HTML statici.

SSG conserva le stesse caratteristiche di prestazioni delle app SSR: offre ottime prestazioni per il tempo di caricamento del contenuto. Allo stesso tempo, è meno costoso e più semplice da distribuire rispetto alle app SSR perché l'output è costituito da file HTML e risorse statiche. La parola chiave qui è **static**: SSG può essere applicato solo a pagine che consumano dati statici, ovvero dati noti al momento della build e che non cambiano tra le distribuzioni. Ogni volta che i dati cambiano, è necessaria una nuova distribuzione.

Se stai esaminando l'SSR solo per migliorare l'ottimizzazione per i motori di ricerca di alcune pagine di marketing (ad esempio `/`, `/about`, `/contact`, ecc.), probabilmente vuoi l'SSG al posto dell'SSR. L'SSG è anche ottimo per siti basati su contenuti come siti di documentazione o blog. Infatti, il sito web che stai leggendo in questo momento è staticamente generato utilizzando [VitePress](https://vitepress.dev/), un generatore di siti statici alimentato da Vue.

## Tutorial base {#basic-tutorial}

### Renderizzare un'App {#rendering-an-app}

Diamo un'occhiata all'esempio più essenziale di Vue SSR in azione.

1. Crea una nuova directory e spostati al suo interno con `cd`
2. Esegui `npm init -y`
3. Aggiungi `"type": "module"` in `package.json` in modo che Node.js venga eseguito in modalità [ES modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules).
4. Esegui `npm install vue`
5. Crea un file `example.js`:

```js
// Questo viene eseguito in Node.js sul server.
import { createSSRApp } from 'vue'
// L'API di rendering lato server di Vue è esposta sotto `vue/server-renderer`.
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp({
  data: () => ({ count: 1 }),
  template: `<button @click="count++">{{ count }}</button>`
})

renderToString(app).then((html) => {
  console.log(html)
})
```

Poi esegui:

```sh
> node example.js
```

Dovrebbe stampare quanto segue sulla riga di comando:

```
<button>1</button>
```

[`renderToString()`](/api/ssr#rendertostring) prende un'istanza dell'app Vue e restituisce una Promise che si risolve nell'HTML renderizzato dell'app. È anche possibile effettuare il rendering in streaming utilizzando la [Node.js Stream API](https://nodejs.org/api/stream.html) o la [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). Consulta il [SSR API Reference](/api/ssr) per maggiori dettagli.

Possiamo quindi spostare il codice Vue SSR in un gestore di richieste del server, che avvolge il markup dell'applicazione con l'HTML della pagina completa. Utilizzeremo [`express`](https://expressjs.com/) per i prossimi passaggi:

- Esegui `npm install express`
- Crea il file `server.js` seguente:

```js
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})
```

Infine, esegui `node server.js` e visita `http://localhost:3000`. Dovresti vedere la pagina funzionante, con il bottone.

[Provalo su StackBlitz](https://stackblitz.com/fork/vue-ssr-example-basic?file=index.js)

### Client Hydration {#client-hydration}

Se fai clic sul pulsante, noterai che il numero non cambia. L'HTML è completamente statico sul client poiché non stiamo caricando Vue nel browser.

Per rendere l'app lato client interattiva, Vue deve eseguire la fase di **hydration**. Durante l'hydration, crea la stessa applicazione Vue che è stata eseguita sul server, abbinando ciascun componente ai nodi DOM che dovrebbe controllare e allegando gli ascoltatori degli eventi DOM.

Per montare un'app in modalità hydration, dobbiamo utilizzare [`createSSRApp()`](/api/application#createssrapp) invece di `createApp()`:

```js{2}
// questo viene eseguito nel browser.
import { createSSRApp } from 'vue'

const app = createSSRApp({
  // ...stessa app del server
})

// montare un'app SSR sul client presuppone
// che l'HTML sia stato pre-renderizzato e che verrà eseguita
// l'hydration invece di montare nuovi nodi DOM.
app.mount('#app')
```

### Struttura del codice {#code-structure}

Nota come dobbiamo riutilizzare la stessa implementazione dell'applicazione come sul server. Qui è necessario iniziare a pensare alla struttura del codice in un'app SSR: come condividere lo stesso codice dell'applicazione tra il server e il client?

Qui mostreremo la configurazione più semplice possibile. Innanzitutto, dividiamo la logica di creazione dell'app in un file dedicato, `app.js`:

```js
// app.js (condiviso tra server e client)
import { createSSRApp } from 'vue'

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}
```

Questo file e le sue dipendenze sono condivisi tra il server e il client - li chiamiamo **codice universale**. Ci sono diverse cose a cui devi prestare attenzione quando scrivi codice universale, come [discuteremo di seguito](#writing-ssr-friendly-code).

Il nostro punto di ingresso client importa il codice universale, crea l'applicazione e la monta:

```js
// client.js
import { createApp } from './app.js'

createApp().mount('#app')
```

E il server utilizza la stessa logica di creazione dell'app nell'handler della richiesta:

```js{2,5}
// server.js (codice irrilevante omesso)
import { createApp } from './app.js'

server.get('/', (req, res) => {
  const app = createApp()
  renderToString(app).then(html => {
    // ...
  })
})
```

Inoltre, per caricare i file del client nel browser, dobbiamo anche:

1. Servire i file del client aggiungendo `server.use(express.static('.'))` in `server.js`.
2. Caricare l'entry point del client aggiungendo `<script type="module" src="/client.js"></script>` al guscio HTML.
3. Supportare l'uso di `import * from 'vue'` nel browser aggiungendo una [Import Map](https://github.com/WICG/import-maps) al guscio HTML.

[Prova l'esempio completato su StackBlitz](https://stackblitz.com/fork/vue-ssr-example?file=index.js). Il pulsante ora è interattivo!

## Higher Level Solutions {#higher-level-solutions}

Passare dall'esempio a un'app SSR pronta per la produzione comporta molto di più. Dovremo:

- Supportare gli SFC di Vue e altri requisiti di compilazione. In effetti, dovremo coordinare due compilazioni per la stessa app: una per il client e una per il server.

  :::tip
  I componenti Vue vengono compilati in modo diverso quando vengono utilizzati per SSR: i template vengono compilati in concatenazioni di stringhe invece di funzioni di rendering del Virtual DOM per ottenere una maggiore efficienza nella resa.
  :::

- Nell'handler della richiesta del server, renderizzare l'HTML con i collegamenti ai asset lato client corretti e gli hint di risorse ottimali. Potremmo anche dover passare tra la modalità SSR e la modalità SSG, o persino mescolarle entrambe nella stessa app.

- Gestire il routing, il recupero dei dati e gli store di gestione dello stato in modo universale.

Un'implementazione completa sarebbe piuttosto complessa e dipenderebbe dalla catena degli strumenti di compilazione che hai scelto di utilizzare. Pertanto, consigliamo vivamente di optare per una soluzione di livello superiore e basata su opinioni che astrae la complessità per te. Di seguito introdurremo alcune soluzioni SSR consigliate nell'ecosistema di Vue.

### Nuxt {#nuxt}

[Nuxt](https://nuxt.com/) è un framework di livello superiore costruito sulla cima dell'ecosistema di Vue che offre un'esperienza di sviluppo semplificata per scrivere applicazioni Vue universali. Ancora meglio, puoi usarlo anche come generatore di siti statici! Consigliamo vivamente di provarlo.

### Quasar {#quasar}

[Quasar](https://quasar.dev) è una soluzione completa basata su Vue che ti consente di indirizzare SPA, SSR, PWA, app mobili, app desktop ed estensioni del browser, il tutto utilizzando un unico codice sorgente. Non si occupa solo della configurazione della compilazione, ma fornisce anche una collezione completa di componenti UI conformi al design di Material Design.

### Vite SSR {#vite-ssr}

Vite offre il supporto integrato [per il rendering lato server di Vue](https://vitejs.dev/guide/ssr.html), ma è intenzionalmente di basso livello. Se desideri utilizzare direttamente Vite, dai un'occhiata a [vite-plugin-ssr](https://vite-plugin-ssr.com/), un plugin della comunità che astrae molti dettagli complessi per te.

Puoi trovare anche un esempio di progetto Vue + Vite SSR usando una configurazione manuale [qui](https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue), che può servire come base su cui costruire. Nota che questa opzione è consigliata solo se hai esperienza con SSR / strumenti di compilazione e desideri avere un controllo completo sull'architettura di livello superiore.

## SCrivere codice compatibile con il SSR {#writing-ssr-friendly-code}

Indipendentemente dalla tua configurazione di compilazione o dalla scelta di un framework di livello superiore, ci sono alcuni principi che si applicano a tutte le applicazioni Vue SSR.

### Reactivity sul server {#reactivity-on-the-server}

Durante l'SSR, ogni URL di richiesta viene mappato su uno stato desiderato della nostra applicazione. Non ci sono interazioni dell'utente e nessun aggiornamento del DOM, quindi la reattività non è necessaria sul server. Per impostazione predefinita, la reattività è disabilitata durante l'SSR per una migliore performance.

### Hook del ciclo di vita dei componenti {#component-lifecycle-hooks}

Poiché non ci sono aggiornamenti dinamici, i hook del ciclo di vita come <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> o <span class="options-api">`updated`</span><span class="composition-api">`onUpdated`</span> **NON** verranno chiamati durante l'SSR e verranno eseguiti solo sul client.<span class="options-api"> Gli unici hook che vengono chiamati durante l'SSR sono `beforeCreate` e `created`</span>

Dovresti evitare il codice che produce effetti collaterali che richiedono un'eliminazione in <span class="options-api">`beforeCreate` e `created`</span><span class="composition-api">`setup()` o nello scope radice di `<script setup>`</span>. Un esempio di tali effetti collaterali è l'impostazione di timer con `setInterval`. Nel codice specifico solo per il lato client possiamo impostare un timer e poi smantellarlo in <span class="options-api">`beforeUnmount`</span><span class="composition-api">`onBeforeUnmount`</span> o <span class="options-api">`unmounted`</span><span class="composition-api">`onUnmounted`</span>. Tuttavia, poiché gli hook di smontaggio non verranno mai chiamati durante l'SSR, i timer rimarranno attivi per sempre. Per evitare ciò, sposta il tuo codice degli effetti collaterali in <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> al suo posto.

### Accesso alle API specifiche della piattaforma {#access-to-platform-specific-apis}

Il codice universale non può assumere l'accesso alle API specifiche della piattaforma, quindi se il tuo codice utilizza direttamente le variabili globali specifiche del browser come `window` o `document`, queste causeranno errori quando eseguite in Node.js e viceversa.

Per compiti condivisi tra il server e il client ma con API di piattaforma diverse, è consigliabile incapsulare le implementazioni specifiche della piattaforma all'interno di un'API universale, o utilizzare librerie che fanno ciò per te. Ad esempio, puoi utilizzare [`node-fetch`](https://github.com/node-fetch/node-fetch) per utilizzare la stessa API fetch sia sul server che sul client.

Per le API specifiche del browser, l'approccio comune è accedervi in modo lazy all'interno degli hook del ciclo di vita specifici solo per il lato client, come <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span>.

Nota che se una libreria di terze parti non è stata progettata per l'uso universale, potrebbe essere complicato integrarla in un'app con rendering lato server. _Potresti_ riuscire a farla funzionare simulando alcune delle variabili globali, ma sarebbe un approccio poco elegante e potrebbe interferire con il codice di rilevamento dell'ambiente di altre librerie.

### Inquinamento del dato tra richieste {#cross-request-state-pollution}

Nel capitolo sulla Gestione dello Stato, abbiamo introdotto un [semplice pattern di gestione dello stato utilizzando le API di reattività](state-management#simple-state-management-with-reactivity-api).  In un contesto SSR, questo pattern richiede alcuni aggiustamenti aggiuntivi.

Il pattern dichiara uno stato condiviso nello scope radice di un modulo JavaScript. Questo li rende **singleton** - cioè c'è solo un'istanza dell'oggetto reattivo per l'intero ciclo di vita della nostra applicazione. Questo funziona come previsto in un'applicazione Vue puramente lato client, poiché i moduli nella nostra applicazione vengono inizializzati da zero per ogni visita alla pagina del browser.

Tuttavia, in un contesto SSR, i moduli dell'applicazione sono tipicamente inizializzati solo una volta sul server, quando il server si avvia. Le stesse istanze dei moduli saranno riutilizzate in diverse richieste al server e lo stesso accadrà per i nostri oggetti di stato singleton. Se mutiamo lo stato condiviso singleton con dati specifici di un utente, potrebbero accidentalmente essere rilevati da una richiesta di un altro utente. Questo fenomeno è noto come **inquinamento del dato tra richieste.**

Tecnicamente, potremmo reinizializzare tutti i moduli JavaScript ad ogni richiesta, proprio come facciamo nei browser. Tuttavia, l'inizializzazione dei moduli JavaScript può essere costosa, quindi ciò avrebbe un impatto significativo sulle prestazioni del server.

La soluzione consigliata è quella di creare una nuova istanza dell'intera applicazione, compreso il router e gli store globali, per ogni richiesta. Quindi, anziché importare direttamente l'applicazione nei nostri componenti, forniamo lo stato condiviso utilizzando il [provide a livello di app](/guide/components/provide-inject#app-level-provide) e lo iniettiamo nei componenti che ne hanno bisogno:

```js
// app.js (condiviso tra server e client)
import { createSSRApp } from 'vue'
import { createStore } from './store.js'

// chiamate per ogni richiesta
export function createApp() {
  const app = createSSRApp(/* ... */)
  // creare una nuova istanza dello store per ogni richiesta
  const store = createStore(/* ... */)
  // fornire lo store a livello di app
  app.provide('store', store)
  // esporre anche lo store per scopi di idratazione
  return { app, store }
}
```

Le librerie di gestione dello stato come Pinia sono progettate tenendo conto di ciò. Consulta [la guida SSR di Pinia](https://pinia.vuejs.org/ssr/) per ulteriori dettagli.

### Discrepanza nella Hydration {#hydration-mismatch}

Se la struttura del DOM dell'HTML pre-renderizzato non corrisponde all'output atteso dell'app lato client, si verificherà un errore di discrepanza nella hydration. La discrepanza nella hydration è più comunemente causata dalle seguenti ragioni:

1. Il template contiene una struttura di annidamento HTML non valida e l'HTML renderizzato è stato "corretto" dal comportamento di analisi HTML nativa del browser. Ad esempio, un'insidia comune è che [`<div>` non può essere inserito all'interno di un `<p>`](https://stackoverflow.com/questions/8397852/why-cant-the-p-tag-contain-a-div-tag-inside-it):

   ```html
   <p><div>ciao</div></p>
   ```

   Se produciamo questo nell'HTML generato dal server, il browser terminerà il primo `<p>` quando incontrerà `<div>` e lo analizzerà nella seguente struttura del DOM:

   ```html
   <p></p>
   <div>ciao</div>
   <p></p>
   ```

2. I dati utilizzati durante il rendering contengono valori generati casualmente. Poiché la stessa applicazione verrà eseguita due volte - una volta sul server e una volta sul client - i valori casuali non sono garantiti essere gli stessi tra le due esecuzioni. Ci sono due modi per evitare discrepanze indotte dai valori casuali:

   1. Utilizza  `v-if` + `onMounted` per renderizzare la parte che dipende dai valori casuali solo sul client. Il tuo framework potrebbe anche avere funzionalità integrate per semplificare questo processo, ad esempio il componente `<ClientOnly>` in VitePress.

   2. Utilizza una libreria di generatori di numeri casuali che supporta la generazione con seed e garantisce che l'esecuzione sul server e l'esecuzione sul client utilizzino lo stesso seed (ad esempio includendo il seed nello stato serializzato e recuperandolo sul client).

3. Il server e il client si trovano in fusi orari diversi. A volte, potremmo voler convertire un timestamp nell'orario locale dell'utente. Tuttavia, il fuso orario durante l'esecuzione sul server e il fuso orario durante l'esecuzione sul client non sono sempre gli stessi, e potremmo non conoscere in modo affidabile il fuso orario dell'utente durante l'esecuzione sul server. In questi casi, la conversione dell'orario locale dovrebbe essere eseguita anche come operazione esclusiva del client.

Quando Vue incontra una discrepanza nella hydration, cercherà di recuperare automaticamente e regolare il DOM pre-renderizzato in modo da corrispondere allo stato lato client. Questo comporterà una perdita di prestazioni di rendering a causa del rifiuto di nodi non corretti e del montaggio di nuovi nodi, ma nella maggior parte dei casi, l'app dovrebbe continuare a funzionare come previsto. Detto ciò, è comunque meglio eliminare le discrepanze nella hydration durante lo sviluppo.

### Direttive personalizzate {#custom-directives}

Poiché la maggior parte delle direttive personalizzate coinvolge la manipolazione diretta del DOM, vengono ignorate durante la SSR. Tuttavia, se vuoi specificare come una direttiva personalizzata dovrebbe essere resa (ossia quali attributi dovrebbe aggiungere all'elemento renderizzato), puoi utilizzare l'hook della direttiva `getSSRProps`:

```js
const myDirective = {
  mounted(el, binding) {
    // Implementazione lato client:
    // aggiornare direttamente il DOM
    el.id = binding.value
  },
  getSSRProps(binding) {
    // Implementazione lato server:
    // restituire le props da renderizzare.
    // getSSRProps riceve solo il binding della direttiva.
    return {
      id: binding.value
    }
  }
}
```

### Teleport {#teleports}

I Teleport richiedono una gestione speciale durante la SSR. Se l'app renderizzata contiene dei Teleport, il contenuto teletrasportato non farà parte della stringa renderizzata. Una soluzione più semplice è renderizzare condizionalmente il Teleport all'atto del montaggio.

Se hai bisogno di idratare il contenuto teletrasportato, essi sono esposti nella proprietà `teleports` dell'oggetto di contesto SSR:

```js
const ctx = {}
const html = await renderToString(app, ctx)

console.log(ctx.teleports) // { '#teleported': 'contenuto teletrasportato' }
```

Devi iniettare il markup del Teleport nella posizione corretta nella tua pagina HTML finale, in modo simile a come devi iniettare il markup principale dell'app.

:::tip
Evita di prendere come target `body` quando utilizzi Teleports e SSR insieme: di solito `<body>` conterrà altri contenuti resi dal server, il che rende impossibile per i Teleports determinare la posizione corretta per l'idratazione.

Preferisci invece un contenitore dedicato, ad esempio `<div id="teleported"></div>` che conterrà solo il contenuto teletrasportato.
:::
