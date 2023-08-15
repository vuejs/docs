# Gestire lo stato {#state-management}

## Cosa vuol dire gestire lo stato? {#what-is-state-management}

Tecnicamente, ogni istanza di componente Vue gestisce già il proprio stato reattivo. Prendiamo ad esempio un semplice componente contatore:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

// stato
const count = ref(0)

// actions
function increment() {
  count.value++
}
</script>

<!-- vista -->
<template>{{ count }}</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  // stato
  data() {
    return {
      count: 0
    }
  },
  // actions
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- vista -->
<template>{{ count }}</template>
```

</div>

Si tratta di un'unità autocontenuta con le seguenti parti:

- Lo **stato**, la fonte della verità che guida la nostra app;
- La **vista**, una mappatura dichiarativa dello **stato**;
- Le **actions**, i possibili modi in cui lo stato potrebbe cambiare in reazione agli input dell'utente provenienti dalla **vista**.

Questa è una semplice rappresentazione del concetto di "flusso di dati unidirezionale":

<p style="text-align: center">
  <img alt="state flow diagram" src="./images/state-flow.png" width="252px" style="margin: 40px auto">
</p>

Tuttavia, la semplicità inizia a sfaldarsi quando abbiamo **diversi componenti che condividono uno stato comune**:

1. Diverse viste possono dipendere dalla stessa parte di stato.
2. Le azioni da diverse viste possono dover mutare la stessa parte di stato.

Per il primo caso, una possibile soluzione è "elevare" lo stato condiviso fino a un componente genitore comune e quindi passarlo come props. Tuttavia, questo diventa rapidamente noioso in alberi di componenti con gerarchie profonde, portando a un altro problema noto come [Prop Drilling](/guide/components/provide-inject#prop-drilling).

Per il secondo caso, spesso ci troviamo a cercare soluzioni come raggiungere istanze genitore / figlio dirette tramite riferimenti nel template o cercare di mutare e sincronizzare più copie dello stato tramite eventi emessi. Entrambi questi modelli sono fragili e portano rapidamente a codice non manutenibile.

Una soluzione più semplice e diretta è estrarre lo stato condiviso dai componenti e gestirlo in un singleton globale. Con questo approccio, il nostro albero di componenti diventa una grande "vista" e qualsiasi componente può accedere allo stato o attivare azioni, indipendentemente da dove si trovino nell'albero!

## Gestione semplice dello stato con il Reactivity API {#simple-state-management-with-reactivity-api}

<div class="options-api">

Nell'Options API, i dati reattivi vengono dichiarati utilizzando l'opzione `data()`. Internamente, l'oggetto restituito da `data()` viene reso reattivo tramite la funzione [`reactive()`](/api/reactivity-core#reactive), che è anche disponibile come API pubblica.

</div>

Se hai una porzione di stato che deve essere condivisa da diverse istanze, puoi utilizzare [`reactive()`](/api/reactivity-core#reactive) per creare un oggetto reattivo e quindi importarlo in più componenti:

```js
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})
```

<div class="composition-api">

```vue
<!-- ComponentA.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From B: {{ store.count }}</template>
```

</div>
<div class="options-api">

```vue
<!-- ComponentA.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From B: {{ store.count }}</template>
```

</div>

Ora, ogni volta che l'oggetto `store` viene modificato, sia `<ComponentA>` che `<ComponentB>` aggiorneranno automaticamente le loro viste: abbiamo ora una singola fonte di verità.

Tuttavia, questo significa anche che qualsiasi componente che importa `store` può modificarlo a suo piacimento:

```vue-html{2}
<template>
  <button @click="store.count++">
    Da B: {{ store.count }}
  </button>
</template>
```

Anche se questo funziona nei casi semplici, uno stato globale che può essere arbitrariamente modificato da qualsiasi componente non sarà molto mantenibile a lungo termine. Per garantire che la logica di modifica dello stato sia centralizzata come lo stesso stato, è consigliabile definire metodi nello store con nomi che esprimano l'intenzione delle azioni:

```js{6-8}
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```vue-html{2}
<template>
  <button @click="store.increment()">
    From B: {{ store.count }}
  </button>
</template>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNrNkk1uwyAQha8yYpNEiUzXllPVrtRTeJNSqtLGgGBsVbK4ewdwnT9FWWSTFczwmPc+xMhqa4uhl6xklRdOWQQvsbfPrVadNQ7h1dCqpcYaPp3pYFHwQyteXVxKm0tpM0krnm3IgAqUnd3vUFIFUB1Z8bNOkzoVny+wDTuNcZ1gBI/GSQhzqlQX3/5Gng81pA1t33tEo+FF7JX42bYsT1BaONlRguWqZZMU4C261CWMk3EhTK8RQphm8Twse/BscoUsvdqDkTX3kP3nI6aZwcmdQDUcMPJPabX8TQphtCf0RLqd1csxuqQAJTxtYnEUGtIpAH4pn1Ou17FDScOKhT+QNAVM)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNrdU8FqhDAU/JVHLruyi+lZ3FIt9Cu82JilaTWR5CkF8d8bE5O1u1so9FYQzAyTvJnRTKTo+3QcOMlIbpgWPT5WUnS90gjPyr4ll1jAWasOdim9UMum3a20vJWWqxSgkvzTyRt+rocWYVpYFoQm8wRsJh+viHLBcyXtk9No2ALkXd/WyC0CyDfW6RVTOiancQM5ku+x7nUxgUGlOcwxn8Ppu7HJ7udqaqz3SYikOQ5aBgT+OA9slt9kasToFnb5OiAqCU+sFezjVBHvRUimeWdT7JOKrFKAl8VvYatdI6RMDRJhdlPtWdQf5mdQP+SHdtyX/IftlH9pJyS1vcQ2NK8ZivFSiL8BsQmmpMG1s1NU79frYA1k8OD+/I3pUA6+CeNdHg6hmoTMX9pPSnk=)

</div>

:::tip
Nota che l'handler del clic utilizza `store.increment()` con le parentesi - questo è necessario per chiamare il metodo con il contesto `this` corretto poiché non è un metodo del componente.
:::

Anche se qui stiamo utilizzando un oggetto reattivo singolo come store, puoi condividere uno stato reattivo creato utilizzando altre [Reactivity API](/api/reactivity-core) come `ref()` o `computed()`, o persino restituire uno stato globale da un[Composable](/guide/reusability/composables):

```js
import { ref } from 'vue'

// stato globale, creato nello scope del modulo
const globalCount = ref(1)

export function useCount() {
  // stato locale, creato per componente
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

Il fatto che il sistema di reattività di Vue sia disaccoppiato dal modello del componente lo rende estremamente flessibile.

## SSR Considerations {#ssr-considerations}

Se stai costruendo un'applicazione che sfrutta il [Server-Side Rendering (SSR)](./ssr), il pattern sopra può portare a problemi dovuti all'uso di uno store condiviso tra più richieste. Questo viene discusso in [dettaglio](./ssr#cross-request-state-pollution) nella guida SSR.

## Pinia {#pinia}

Sebbene la soluzione di gestione dello stato fatta in casa sia sufficiente in scenari semplici, ci sono molte altre cose da considerare nelle applicazioni di produzione su larga scala:

- Convenzioni più solide per la collaborazione in team
- Hot Module Replacement (HMR)
- Integrazione con gli Strumenti di Sviluppo di Vue, inclusa la timeline, l'ispezione all'interno del componente e il debugging con il time-travel
- Supporto per Server-Side Rendering

[Pinia](https://pinia.vuejs.org) è una libreria per la gestione dello stato che implementa tutto quanto sopra. È mantenuta dal team di sviluppo di Vue, e funziona sia con Vue 2 che con Vue 3.

Gli utenti già esistenti potrebbero essere familiari con [Vuex](https://vuex.vuejs.org/), la precedente libreria ufficiale per la gestione dello stato in Vue. Con Pinia che svolge lo stesso ruolo nell'ecosistema, Vuex è ora in modalità di manutenzione. Funziona ancora, ma non riceverà più nuove funzionalità. Si consiglia di utilizzare Pinia per le nuove applicazioni.

Pinia è nata come un'esplorazione di come potrebbe apparire la prossima iterazione di Vuex, incorporando molte idee dalle discussioni del team di sviluppo per Vuex 5. Alla fine, ci siamo resi conto che Pinia già implementava la maggior parte di ciò che volevamo in Vuex 5, e abbiamo deciso di farla diventare la nuova raccomandazione al suo posto.

Rispetto a Vuex, Pinia fornisce un'API più semplice con meno cerimonia, offre API simili a Composition API e, cosa più importante, ha un solido supporto per l'inferenza dei tipi quando usato con TypeScript.
