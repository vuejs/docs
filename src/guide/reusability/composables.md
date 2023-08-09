# I Composables {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip
Questa sezione presume una conoscenza di base della Composition API. Se hai imparato Vue solo con la Options API, puoi impostare la Preferenza API su Composition API (utilizzando l'interruttore nella parte superiore della barra laterale sinistra) e rileggere i capitoli sulle [Basi della Reattività](/guide/essentials/reactivity-fundamentals) e gli [Hook del Ciclo di Vita](/guide/essentials/lifecycle).
:::

## Cos'è un "Composable"? {#what-is-a-composable}

Nel contesto delle applicazioni Vue un "composable" è una funzione che sfrutta la Composition API di Vue per incapsulare e riutilizzare la **logica stateful** (con stato).

Nella costruzione delle applicazioni frontend, spesso abbiamo bisogno di riutilizzare la logica per compiti più comuni. Ad esempio, potremmo avere bisogno di formattare le date in molti posti, quindi possiamo estrarre una funzione riutilizzabile per questo. Questa funzione di formattazione incapsula la **logica stateless** (senza stato): prende degli input e restituisce immediatamente l'output atteso. Ci sono molte librerie per riutilizzare la logica stateless - ad esempio [lodash](https://lodash.com/) e [date-fns](https://date-fns.org/), delle quali potresti aver sentito parlare.

Al contrario, la logica stateful comporta la gestione dello stato che cambia nel tempo. Un esempio semplice potrebbe essere il tracciamento della posizione attuale del mouse su una pagina. In scenari reali, potrebbe anche essere una logica più complessa come i gesti touch o lo stato della connessione a un database.

## Esempio del Tracciamento del Mouse {#mouse-tracker-example}

Se dovessimo implementare la funzionalità di tracciamento del mouse utilizzando direttamente la Composition API all'interno di un componente, apparirebbe così:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>La posizione del mouse è: {{ x }}, {{ y }}</template>
```

Ma cosa succederebbe se volessimo riutilizzare la stessa logica in più componenti? Possiamo estrarre la logica in un file esterno, come una funzione composable:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// per convenzione, i nomi delle funzioni composable iniziano con "use"
export function useMouse() {
  // stato incapsulato e gestito dal composable
  const x = ref(0)
  const y = ref(0)

  // un composable può aggiornare il suo stato gestito nel tempo.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // un composable può anche collegarsi all'hook del ciclo di vita del suo componente
  // per configurare ed eliminare gli effetti collaterali.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // espone lo stato gestito con un `return`
  return { x, y }
}
```

Ed ecco come può essere utilizzato nei componenti:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>La posizione del mouse è: {{ x }}, {{ y }}</template>
```

<div class="demo">
  La posizione del mouse è: {{ x }}, {{ y }}
</div>

[Prova nel Playground](https://play.vuejs.org/#eNqNkj1rwzAQhv/KocUOGKVzSAIdurVjoQUvJj4XlfgkJNmxMfrvPcmJkkKHLrbu69H7SlrEszFyHFDsxN6drDIeHPrBHGtSvdHWwwKDwzfNHwjQWd1DIbd9jOW3K2qq6aTJxb6pgpl7Dnmg3NS0365YBnLgsTfnxiNHACvUaKe80gTKQeN3sDAIQqjignEhIvKYqMRta1acFVrsKtDEQPLYxuU7cV8Msmg2mdTilIa6gU5p27tYWKKq1c3ENphaPrGFW25+yMXsHWFaFlfiiOSvFIBJjs15QJ5JeWmaL/xYS/Mfpc9YYrPxl52ULOpwhIuiVl9k07Yvsf9VOY+EtizSWfR6xKK6itgkvQ/+fyNs6v4XJXIsPwVL+WprCiL8AEUxw5s=)

Come possiamo vedere, la logica centrale rimane identica - tutto ciò che abbiamo dovuto fare è stata spostarla in una funzione esterna e restituire lo stato che dovrebbe essere esposto. Proprio come all'interno di un componente, puoi utilizzare tutta la gamma di [funzioni della Composition API](/api/#composition-api) nei composables. La stessa funzionalità `useMouse()` può ora essere utilizzata in qualsiasi componente.

La parte più interessante dei composables, però, è che puoi anche annidarli: una funzione composable può chiamare una o più altre funzioni composable. Ciò ci consente di comporre una logica complessa utilizzando unità piccole e isolate, in maniera simile a come componiamo un'intera applicazione utilizzando i componenti. Infatti, è per questo motivo che abbiamo deciso di chiamare la raccolta di API che rendono possibile questo pattern Composition API.

Ad esempio, possiamo estrarre la logica di aggiunta e rimozione di un listener di eventi DOM nel proprio composable:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // se vuoi, puoi anche fare in modo che questo
  // supporti le stringhe selettore come target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

E ora il nostro composable `useMouse()` può essere semplificato in:

```js{3,9-12}
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip
Ogni istanza di un componente che chiama `useMouse()` creerà le proprie copie dello stato x e y, quindi non interferiranno l'una con l'altra. Se vuoi gestire lo stato condiviso tra i componenti, leggi il capitolo sulla [Gestione dello Stato](/guide/scaling-up/state-management).
:::

## Esempio di Stato Asincrono {#async-state-example}

La composable `useMouse()` non accetta nessun argomento, quindi diamo un'occhiata a un altro esempio che ne fa uso. Quando effettuiamo il recupero di dati asincroni (fetch), spesso dobbiamo gestire diversi stati: caricamento, successo ed errore:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Ho riscontrato un Errore: {{ error.message }}</div>
  <div v-else-if="data">
    Dati caricati:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Caricamento...</div>
</template>
```

Sarebbe tedioso dover ripetere questo schema in ogni componente che ha bisogno di recuperare dati. Estraiamolo in una composable:

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

Ora nel nostro componente possiamo scrivere semplicemente:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

### Accettare lo Stato Reattivo {#accepting-reactive-state}

`useFetch()` accetta una stringa URL statica come input - quindi esegue il fetch solo una volta e poi si ferma. E se volessimo che effettui un nuovo fetch ogni volta che l'URL cambia? Per raggiungere questo obiettivo, dobbiamo passare lo stato reattivo nella funzione composable, e lasciare che la composable crei dei "watcher" che eseguano azioni usando lo stato ricevuto.

Ad esempio, `useFetch()` dovrebbe essere in grado di accettare un ref:

```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// questo dovrebbe innescare un nuovo fetch
url.value = '/new-url'
```

Or, accept a getter function:

```js
// fa un nuovo fetch quando cambia props.id
const { data, error } = useFetch(() => `/posts/${props.id}`)
```

Possiamo riscrivere la nostra composable esistente con le API [`watchEffect()`](/api/reactivity-core.html#watcheffect) e [`toValue()`](/api/reactivity-utilities.html#tovalue):

```js{8,13}
// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  watchEffect(() => {
    // reimposta lo stato prima del fetching..
    data.value = null
    error.value = null
    // toValue() esegue l'estrazione di potenziali ref o getter
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  })

  return { data, error }
}
```

`toValue()` è un'API aggiunta nella versione 3.3. È progettata per normalizzare ref o getter in valori. Se l'argomento è un ref, restituisce il valore del ref; se l'argomento è una funzione, chiama la funzione e restituisce il suo valore. Altrimenti, restituisce l'argomento così com'è. Funziona in modo simile a [`unref()`](/api/reactivity-utilities.html#unref), ma con un trattamento speciale per le funzioni.

Notare che `toValue(url)` viene chiamata all'**interno** della callback `watchEffect`. Questo garantisce che eventuali dipendenze reattive a cui si ha accesso durante la normalizzazione di `toValue()` vengano tracciate dal watcher.

Questa versione di `useFetch()` ora accetta stringhe URL statiche, ref e getter, rendendola molto più flessibile. L'azione del watch verrà eseguita immediatamente e traccerà eventuali dipendenze a cui ha avuto accesso durante `toValue(url)`. Se non vengono tracciate dipendenze (ad esempio, l'url è già una stringa), l'effetto viene eseguito solo una volta; altrimenti, verrà eseguito ogni volta che cambia una dipendenza tracciata.

Ecco [la versione aggiornata di `useFetch()`](https://play.vuejs.org/#eNptVMFu2zAM/RXOFztYZncodgmSYAPWnTZsKLadfFFsulHrSIZEJwuC/PtIyXaTtkALxxT5yPf45FPypevyfY/JIln6yumOwCP13bo0etdZR3ACh80cKrvresIaztA4u4OUi9KLpN7jN6RqO53nxRjKHz1nlqayxhNslMc/roUVpFuizi+K4tFb07Wqwq1ta3Q5HTtd2RpzblqQra0vGCCW65oreaIs/ZjOxmAf8MYRs2wGq/XU6D3X5HvV9sj5Y8UJakVqDuicdXMGJHfk0VcTj4wxOX9ZRFVYD34h3PGchPwG8N2qGjobZlpIYLnpiayB/YfGulWZaNAGPpUJfK5aXT1JRIbXZbI+nUDD+bwsYklAL2lZ6z1X64ZTw2CcKcAM3a1/2s6/gzsJAzKL3hA6rBfAWCE536H36gEDriwwFA4zTSMEpox7L8+L/pxacPv4K86Brcc4jGjFNV/5AS3TlrbLzqHwkLPYkt/fxFiLUto85Hk+ni+LScpknlwYhX147buD4oO7psGK5kD2r+zxhQdLg/9CSdObijSzvVoinGSeuPYwbPSP6VtZ8HgSJHx5JP8XA2TKH00F0V4BFaAouISvDHhiNrBB3j1CI90D5ZglfaMHuYXAx3Dc2+v4JbRt9wi0xWDymCpTbJ01tvftEbwFTakHcqp64guqPKgJoMYOTc1+OcLmeMUlEBzZM3ZUdjVqPPj/eRq5IAPngKwc6UZXWrXcpFVH4GmVqXkt0boiHwGog9IEpHdo+6GphBmgN6L1DA66beUC9s4EnhwdeOomMlMSkwsytLac5g7aR11ibkDZSLUABRk+aD8QoMiS1WSCcaKwISEZ2MqXIaBfLSpmchUb05pRsTNUIiNkOFjr9SZxyJTHOXx1YGR49eGRDP4rzRt6lmay86Re7DcgGTzAL74GrEOWDUaRL9kjb/fSoWzO3wPAlXNB9M1+KNrmcXF8uoab/PaCljQLwCN5oS93+jpFWmYyT/g8Zel9NEJ4S2fPpYMsc7i9uQlREeecnP8DWEwr0Q==), con un finto ritardo e un errore casuale a scopo dimostrativo.

## Convenzioni e Best Practices {#conventions-and-best-practices}

### Naming {#naming}

Per convenzione, chiamare le funzioni composable con nomi in camelCase che iniziano con "use".

### Argomenti in Ingresso {#input-arguments}

Un composable può accettare argomenti di tipo ref o getter anche se non li usa per la reattività. Se stai scrivendo un composable che potrebbe essere utilizzato da altri sviluppatori, è una buona idea gestire il caso in cui gli argomenti in ingresso siano ref o getter invece che valori grezzi. L'utility function [`toValue()`](/api/reactivity-utilities#tovalue) sarà utile a questo scopo:

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // Se maybeRefOrGetter è un ref o un getter,
  // verrà restituito il suo valore normalizzato.
  // Altrimenti, viene restituito così com'è.
  const value = toValue(maybeRefOrGetter)
}
```

Se il tuo composable crea effetti reattivi quando l'input è un ref o un getter, assicurati di osservare esplicitamente il ref/getter con `watch()`, o di chiamare `toValue()` all'interno di un `watchEffect()` in modo che venga tracciato correttamente.

L'[implementazione di `useFetch()` discussa in precedenza](#accepting-reactive-state) fornisce un esempio concreto di un composable che accetta ref, getter e valori semplici come argomento in ingresso.

### Valori di Ritorno {#return-values}

Probabilmente avrai notato che abbiamo utilizzato esclusivamente `ref()` invece di `reactive()` nei composables. Per convenzione si raccomanda di usare composables che restituiscano sempre un oggetto semplice, non reattivo, contenente diversi ref. Ciò permette di essere destrutturato nei componenti mantenendo la reattività:

```js
// x e y sono refs
const { x, y } = useMouse()
```

Restituire un oggetto reattivo tramite un composable farà perdere la connessione di reattività allo stato all'interno del composable, mentre i ref manterranno tale connessione.

Se preferisci utilizzare lo stato restituito dai composables come un oggetto, puoi racchiudere l'oggetto restituito con `reactive()` in modo che i ref vengano estratti. Ad esempio:

```js
const mouse = reactive(useMouse())
// mouse.x è collegato al ref originale
console.log(mouse.x)
```

```vue-html
La posizione del mouse è: {{ mouse.x }}, {{ mouse.y }}
```

### Effetti Collaterali {#side-effects}

È accettabile usare effetti collaterali (ad esempio, aggiungendo listener di eventi DOM o recuperando dati) nei composables, ma presta attenzione alle seguenti regole:

- Se stai lavorando su un'applicazione che utilizza il [Server-Side Rendering](/guide/scaling-up/ssr) (SSR), assicurati di eseguire effetti collaterali specifici del DOM, solo negli hook del ciclo di vita dopo il mount, ad es. `onMounted()`. Questi hook vengono chiamati solo nel browser, quindi puoi essere certo che il codice al loro interno abbia accesso al DOM.

- Ricorda di pulire gli effetti collaterali in `onUnmounted()`. Ad esempio, se un composable configura un listener di eventi DOM, dovrebbe rimuovere quel listener in `onUnmounted()`, come abbiamo visto nell'esempio `useMouse()`. Può essere una buona idea utilizzare un composable che lo fa automaticamente per te, come l'esempio `useEventListener()`.

### Restrizioni per l'Uso {#usage-restrictions}

I composables dovrebbero essere chiamati solo in `<script setup>` o nel `setup()` hook. Dovrebbero anche essere chiamati **in modo sincrono** in questi contesti. In alcuni casi, puoi anche chiamarli negli hook del ciclo di vita come `onMounted()`.

Queste restrizioni sono importanti perché questi sono i contesti in cui Vue è in grado di determinare l'istanza del componente attivo corrente. L'accesso a un'istanza di componente attiva è necessario affinché:

1. Gli hook del ciclo di vita possano essere correttamente registrati al componente stesso.

2. Le Computed properties e i watchers possono essere collegati al componente, in modo che possano essere rimossi quando l'istanza viene smontata per prevenire perdite di memoria.

:::tip
`<script setup>` è l'unico posto in cui puoi chiamare i composables **dopo** aver utilizzato `await`. Il compilatore ripristina automaticamente per te il contesto dell'istanza attiva dopo l'operazione asincrona.
:::

## Estrazione dei Composables per l'Organizzazione del Codice {#extracting-composables-for-code-organization}

I composables possono essere estratti non solo per il riutilizzo, ma anche per l'organizzazione del codice. Man mano che la complessità dei tuoi componenti aumenta, potresti finire con componenti troppo grandi per essere letti e compresi. La Composition API ti offre la piena flessibilità per organizzare il codice del tuo componente in funzioni più piccole basate su aspetti logici:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

In qualche misura, puoi pensare a questi composable estratti come dei servizi legati al componente che possono comunicare tra loro.

## Utilizzo dei Composables nella Options API {#using-composables-in-options-api}

Se stai utilizzando l'Options API, i composables devono essere chiamati all'interno di `setup()`, e i binding che si ricevono devono essere restituiti da `setup()` in modo che siano esposte a `this` e al template:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // Le proprietà esposte dalla funzione setup() sono accessibili attraverso `this`
    console.log(this.x)
  }
  // ...altre opzioni
}
```

## Confronti con Altre Tecniche {#comparisons-with-other-techniques}

### vs. Mixins {#vs-mixins}

Gli utenti che provengono da Vue 2 potrebbero essere familiari con l'opzione [mixins](/api/options-composition#mixins), anch'essi consentono di estrarre la logica dei componenti in unità riutilizzabili. Ci sono tre svantaggi principali dei mixins:

1. **Origine poco chiara delle proprietà**: quando si utilizzano molti mixins, diventa poco chiaro quale proprietà dell'istanza venga iniettata da quale mixin, rendendo difficile rintracciare l'implementazione e comprendere il comportamento del componente. Questo è anche il motivo per cui raccomandiamo l'utilizzo del pattern refs + destructure per i composables: rende chiara l'origine delle proprietà nei componenti che li utilizzano.

2. **Conflitti nei namespace**: più mixins di autori diversi possono potenzialmente registrare gli stessi nomi di proprietà, causando conflitti nei namespace. Con i composables, puoi rinominare le variabili destrutturate se ci sono nomi in conflitto provenienti da altri composables.

3. **Comunicazione cross-mixin implicita**:  più mixins che hanno bisogno di interagire tra di loro devono fare affidamento su nomi di proprietà condivise, rendendoli accoppiati in modo implicito. Con i composables, i valori restituiti da un composable possono essere passati in un altro come argomenti, proprio come le normali funzioni.

Per le ragioni sopra descritte, non raccomandiamo più l'utilizzo dei mixins in Vue 3. La funzione è mantenuta solo per ragioni di migrazione e familiarità.

### vs. Componenti Renderless {#vs-renderless-components}

Nel capitolo dedicato agli slot dei componenti, abbiamo trattato il pattern dei [Componenti Renderless](/guide/components/slots#renderless-components) (senza rendering) basato sugli scoped slots. Abbiamo addirittura implementato la stessa demo per il tracciamento del mouse utilizzando i Componenti Renderless.

Il vantaggio principale dei composables rispetto ai componenti renderless è che i composables non comportano l'overhead aggiuntivo dell'istanza del componente. Quando vengono utilizzati in tutta un'applicazione, il numero di istanze extra create dal pattern dei componenti renderless può diventare un carico significativo sulle prestazioni.

La raccomandazione è di utilizzare i composables quando si desidera riutilizzare esclusivamente la logica, e di utilizzare i componenti quando si intende riutilizzare sia la logica che il layout visuale.

### vs. React Hooks {#vs-react-hooks}

Se hai esperienza con React, potresti notare che questo concetto somiglia molto agli hook personalizzati di React. La Composition API è stata in parte ispirata dagli hook di React, e i composables di Vue sono effettivamente simili agli hook di React per quanto riguarda le capacità di composizione della logica. Tuttavia, i composables di Vue si basano sul sistema di reattività granulare di Vue, che è fondamentalmente diverso dal modello di esecuzione degli hook di React. Questo argomento è discusso più in dettaglio nella sezione delle [FAQ della Composition API](/guide/extras/composition-api-faq#comparison-with-react-hooks).

## Letture Aggiuntive {#further-reading}

- [La Reattività in dettaglio](/guide/extras/reactivity-in-depth): per una comprensione approfondita del funzionamento del sistema di reattività di Vue.
- [La Gestione dello Stato](/guide/scaling-up/state-management): per i modelli di gestione dello stato condiviso tra vari componenti.
- [Testare i Composables](/guide/scaling-up/testing#testing-composables): consigli su unit testing  dei composables.
- [VueUse](https://vueuse.org/): una collezione sempre in crescita di composables di Vue. Anche il codice sorgente può essere una risorsa preziosa per l'apprendimento.
