---
outline: deep
---

# Le basi della Reattività {#reactivity-fundamentals}

:::tip Preferenza dull'API
Questa pagina e molti altri capitoli più avanti nella guida contengono contenuti diversi per l'Options API e la Composition API. La tua preferenza attuale è <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. Puoi alternare tra gli stili delle API utilizzando gli interruttori "Preferenza API" nella parte superiore della barra laterale sinistra.
:::

<div class="options-api">

## Dichiarare lo Stato Reattivo \* {#declaring-reactive-state}

Con l'Options API, utilizziamo l'opzione `data` per dichiarare lo stato reattivo di un componente. Il valore dell'opzione dovrebbe essere una funzione che restituisce un oggetto. Vue chiamerà la funzione quando creerà una nuova istanza del componente e includerà l'oggetto restituito nel suo sistema di reattività. Qualsiasi proprietà di primo livello di questo oggetto viene eseguita tramite proxy sull'istanza del componente (`this` nei metodi e negli hook del ciclo di vita):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

   // `mounted` è un hook del ciclo di vita che spiegheremo più avanti
  mounted() {
    // `this` si riferisce all'istanza del componente.
    console.log(this.count) // => 1

    // i dati possono anche essere modificati
    this.count = 2
  }
}
```

[Prova nel Playground](https://play.vuejs.org/#eNpFUNFqhDAQ/JXBpzsoHu2j3B2U/oYPpnGtoetGkrW2iP/eRFsPApthd2Zndilex7H8mqioimu0wY16r4W+Rx8ULXVmYsVSC9AaNafz/gcC6RTkHwHWT6IVnne85rI+1ZLr5YJmyG1qG7gIA3Yd2R/LhN77T8y9sz1mwuyYkXazcQI2SiHz/7iP3VlQexeb5KKjEKEe2lPyMIxeSBROohqxVO4E6yV6ppL9xykTy83tOQvd7tnzoZtDwhrBO2GYNFloYWLyxrzPPOi44WWLWUt618txvASUhhRCKSHgbZt2scKy7HfCujGOqWL9BVfOgyI=)

Queste proprietà dell'istanza vengono aggiunte solo quando l'istanza viene creata per la prima volta, quindi è necessario assicurarsi che siano tutte presenti nell'oggetto restituito dalla funzione `data`. Se necessario utilizza `null`, `undefined` o qualche altro valore segnaposto per le proprietà in cui il valore desiderato non è ancora disponibile.

È possibile aggiungere una nuova proprietà direttamente a `this` senza includerla in `data`. Tuttavia, le proprietà aggiunte in questo modo non saranno in grado di innescare aggiornamenti reattivi.

Vue utilizza un prefisso `$` quando espone le proprie API native tramite l'istanza del componente. Riserva anche il prefisso `_` per le proprietà interne. Dovresti evitare di utilizzare nomi per le proprietà di primo livello in `data` che iniziano con uno di questi caratteri.

### Reactive Proxy vs. Original \* {#reactive-proxy-vs-original}

In Vue 3, data is made reactive by leveraging [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Users coming from Vue 2 should be aware of the following edge case:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

Quando accedi a `this.someObject` dopo averlo assegnato, il valore è un proxy reattivo del `newObject` originale. **A differenza di Vue 2, il `newObject` originale rimane intatto e non viene reso reattivo: assicurati di accedere sempre allo stato reattivo come proprietà di `this`.**

</div>

<div class="composition-api">

## Dichiarare lo Stato Reattivo \*\* {#declaring-reactive-state-1}

### `ref()` \*\* {#ref}

Nella Composition API, il modo consigliato per dichiarare lo stato reattivo è utilizzare la funzione  [`ref()`](/api/reactivity-core#ref):

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` prende l'argomento e lo restituisce racchiuso in un oggetto ref con una proprietà `.value`:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

> Vedi anche: [Typing Refs](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

Per accedere alle ref nel template di un componente, bisogna dichiararle e restituirle tramite la funzione `setup()` del componente stesso:

```js{5,9-11}
import { ref } from 'vue'

export default {
  // `setup` è un hook speciale dedicato alla Composition API.
  setup() {
    const count = ref(0)

    // espone la ref per il template
    return {
      count
    }
  }
}
```

```vue-html
<div>{{ count }}</div>
```

Da notare che **non** abbiamo avuto bisogno di aggiungere `.value` quando abbiamo utilizzato la ref nel template. Per comodità, le ref vengono automaticamente estratte quando utilizzate all'interno dei template (con alcune [limitazioni](#caveat-when-unwrapping-in-templates)).

Puoi anche modificare direttamente una ref nei gestori di eventi (event handlers):

```vue-html{1}
<button @click="count++">
  {{ count }}
</button>
```

Per una logica più complessa, possiamo dichiarare funzioni che modificano le ref nello stesso scope ed esporle come metodi insieme allo stato:

```js{7-10,15}
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // .value è necessario in JavaScript
      count.value++
    }

    // non dimenticare di esporre anche la funzione.
    return {
      count,
      increment
    }
  }
}
```

I metodi esposti possono quindi essere utilizzati come gestori di eventi (event handlers):

```vue-html{1}
<button @click="increment">
  {{ count }}
</button>
```

Ecco l'esempio dal vivo su [Codepen](https://codepen.io/vuejs-examples/pen/WNYbaqo), senza utilizzare alcuno strumento di compilazione.

### `<script setup>` \*\* {#script-setup}

Esporre manualmente lo stato e i metodi tramite `setup()` può essere verboso. Fortunatamente, ciò può essere evitato quando si utilizzano Componenti Single-File (SFC). In questo caso possiamo semplificarne l'uso con `<script setup>`:

```vue{1}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

[Prova nel Playground](https://play.vuejs.org/#eNo9jUEKgzAQRa8yZKMiaNcllvYe2dgwQqiZhDhxE3L3jrW4/DPvv1/UK8Zhz6juSm82uciwIef4MOR8DImhQMIFKiwpeGgEbQwZsoE2BhsyMUwH0d66475ksuwCgSOb0CNx20ExBCc77POase8NVUN6PBdlSwKjj+vMKAlAvzOzWJ52dfYzGXXpjPoBAKX856uopDGeFfnq8XKp+gWq4FAi)

Gli import, le variabili e le funzioni di primo livello dichiarate in `<script setup>` sono automaticamente utilizzabili nel template dello stesso componente. Pensa al template come a una funzione JavaScript dichiarata nello stesso scope: ha automaticamente accesso a tutto ciò che in esso è dichiarato.

:::tip
Per il resto della guida utilizzeremo principalmente la sintassi SFC + `<script setup>` per gli esempi di codice della Composition API, dato che è l'uso più comune per gli sviluppatori Vue.

Se non stai utilizzando SFC, puoi comunque utilizzare la Composition API con l'opzione [`setup()`](/api/composition-api-setup).
:::

### Perché le Ref? \*\* {#why-refs}

Potresti chiederti perché abbiamo bisogno delle ref con la proprietà `.value` invece di semplici variabili. Per spiegarlo dovremo analizzare brevemente il funzionamento del sistema di reattività di Vue.

Quando utilizzi una ref in un template e ne cambi il valore successivamente, Vue rileva automaticamente la modifica e aggiorna il DOM di conseguenza. Ciò è reso possibile da un sistema di reattività basato sul tracciamento delle dipendenze. Quando un componente viene renderizzato per la prima volta, Vue **traccia** ogni ref che è stata utilizzata durante il rendering. Successivamente, quando una ref viene modificata, essa **innescherà** un nuovo rendering per i componenti che la stanno tracciando.

Nel JavaScript standard non c'è modo di rilevare l'accesso o la modifica di semplici variabili. Tuttavia, possiamo intercettare le operazioni di get e set delle proprietà di un oggetto utilizzando i metodi getter e setter.

La proprietà `.value` dà a Vue la possibilità di rilevare  quando si accede a una ref o quando viene modificata. Dietro le quinte Vue esegue il tracciamento nel suo getter e innesca l'aggiornamento nel suo setter. Concettualmente, puoi pensare a una ref come a un oggetto che assomiglia a questo:

```js
// pseudo codice, non è una implementazione reale
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

Un altro aspetto interessante delle refs è che, a differenza delle semplici variabili, puoi passare le refs nelle funzioni mantenendo sia l'accesso all'ultimo valore che la loro natura reattiva. Questo si rivela particolarmente utile quando devi trasformare una parte di codice complessa in una struttura riutilizzabile.

Il sistema di reattività è discusso più in dettaglio nella sezione [La Reattività in dettaglio](/guide/extras/reactivity-in-depth).
</div>

<div class="options-api">

## Dichiarare i Metodi  \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Lezione Gratuita sui Metodi in Vue.js"/>

Per aggiungere metodi a un'istanza di componente, utilizziamo l'opzione `methods`. Questa dovrebbe essere un oggetto contenente i metodi desiderati:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // i metodi possono essere chiamati negli hook del ciclo di vita o in altri metodi!
    this.increment()
  }
}
```

Vue collega automaticamente il valore `this` per i `methods` in modo che si riferisca sempre all'istanza del componente. Ciò garantisce che un metodo mantenga il valore corretto di `this` se viene utilizzato per ascoltare eventi (listener) o come callback. Dovresti evitare di utilizzare le funzioni arrow quando definisci i `methods`, poiché ciò impedisce a Vue di collegare il valore appropriato di this:

```js
export default {
  methods: {
    increment: () => {
      //  ERRATO: nessun hai accesso a `this` qui!
    }
  }
}
```

Come tutte le altre proprietà dell'istanza del componente i `methods` sono accessibili all'interno del template del componente. All'interno di un template sono utilizzati comunemente per ascoltare gli eventi:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Prova nel Playground](https://play.vuejs.org/#eNplj9EKwyAMRX8l+LSx0e65uLL9hy+dZlTWqtg4BuK/z1baDgZicsPJgUR2d656B2QN45P02lErDH6c9QQKn10YCKIwAKqj7nAsPYBHCt6sCUDaYKiBS8lpLuk8/yNSb9XUrKg20uOIhnYXAPV6qhbF6fRvmOeodn6hfzwLKkx+vN5OyIFwdENHmBMAfwQia+AmBy1fV8E2gWBtjOUASInXBcxLvN4MLH0BCe1i4Q==)

Nell'esempio sopra, il metodo `increment` verrà chiamato quando il `<button>` sarà cliccato.

</div>

### La Reattività Avanzata {#deep-reactivity}

<div class="options-api">

In Vue, di base, lo stato è profondamente reattivo. Ciò significa che i cambiamenti saranno rilevati anche quando modifichi oggetti annidati o array:

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // questi funzioneranno come previsto.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

Le refs possono contenere qualsiasi tipo di valore, inclusi oggetti profondamente annidati, array o altre strutture dati native di JavaScript come le `Map`.

Una ref farà si che il suo valore sarà profondamente reattivo. Ciò significa che i cambiamenti saranno rilevati anche quando modifichi oggetti annidati o array:

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // questi funzioneranno come previsto.
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

I valori non primitivi vengono trasformati in proxy reattivi tramite [`reactive()`](#reactive), che sarà spiegato di seguito.

È anche possibile scegliere di non utilizzare la reattività avanzata con le [shallow refs](/api/reactivity-advanced#shallowref). Per quanto riguarda le refs shallow (superficiali), per la reattività viene viene monitorato solo l'accesso al `.value`. Le refs shallow possono essere utilizzate per ottimizzare le prestazioni, evitando il costo dell'osservazione di grandi oggetti, o nei casi in cui lo stato interno è gestito da una libreria esterna.

Letture aggiuntive:

- [Ridurre il Sovraccarico della Reattività per le Grandi Strutture Immutabili](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
- [Integrazione con Sistemi di Stato Esterni](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

</div>

### DOM e tempi di Aggiornamento {#dom-update-timing}

Quando modifichi lo stato reattivo il DOM viene aggiornato automaticamente. Tuttavia, è importante notare che gli aggiornamenti del DOM non vengono applicati in modo sincrono. Vue li mette, invece, in un buffer fino al "next tick" del ciclo di aggiornamento, così da garantire che ogni componente venga aggiornato solo una volta, indipendentemente dal numero di modifiche allo stato che hai effettuato.

Per aspettare che l'aggiornamento del DOM sia completato, dopo una modifica dello stato, puoi utilizzare l'API globale [nextTick()](/api/general#nexttick):

<div class="composition-api">

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // Ora il DOM è aggiornato
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    async increment() {
      this.count++
      await nextTick()
      // Ora il DOM è aggiornato
    }
  }
}
```

</div>

<div class="composition-api">

## `reactive()` \*\* {#reactive}

C'è un altro modo per indicare la reattività dello stato ed è tramite l'API `reactive()`. A differenza di una ref, che racchiude il valore interno in un oggetto speciale, `reactive()` rende l'oggetto stesso reattivo:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

> Vedi anche: [Tipizzazione Reattiva](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

Utilizzo nel template:

```vue-html
<button @click="state.count++">
  {{ state.count }}
</button>
```

Gli oggetti reattivi sono [Proxy JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) e si comportano esattamente come dei normali oggetti. La differenza è che Vue è in grado di intercettare l'accesso e la modifica di tutte le proprietà di un oggetto reattivo, per il tracciamento della reattività e l'attivazione.

`reactive()` converte profondamente l'oggetto: anche gli oggetti annidati vengono avvolti con `reactive()` quando vi si accede. `reactive()` viene invocato internamente da `ref()` quando il valore contenuto nella ref è un oggetto. Similmente alle refs shallow, c'è anche l'API [`shallowReactive()`](/api/reactivity-advanced#shallowreactive) per scegliere di non utilizzare la reattività profonda.

`reactive()` converts the object deeply: nested objects are also wrapped with `reactive()` when accessed. It is also called by `ref()` internally when the ref value is an object. Similar to shallow refs, there is also the [`shallowReactive()`](/api/reactivity-advanced#shallowreactive) API for opting-out of deep reactivity.

### Proxy Reattiva vs. Originale \*\* {#reactive-proxy-vs-original-1}

È importante notare che il valore restituito da `reactive()` è un [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) dell'oggetto originale, che non è uguale all'oggetto originale:

```js
const raw = {}
const proxy = reactive(raw)

// il proxy NON è uguale all'originale.
console.log(proxy === raw) // false
```

Solo il proxy è reattivo - modificare l'oggetto originale non attiverà gli aggiornamenti. Quindi, quando si lavora con il sistema di reattività di Vue il modo migliore è di utilizzare **esclusivamente le versioni proxy del tuo stato**.

Per garantire un accesso coerente al proxy, chiamare `reactive()` sullo stesso oggetto restituirà sempre lo stesso proxy, e chiamare `reactive()` su un proxy esistente restituirà lo stesso proxy:

```js
// chiamare reactive() sullo stesso oggetto restituisce lo stesso proxy
console.log(reactive(raw) === proxy) // true

// chiamare reactive() su un proxy restituisce se stesso
console.log(reactive(proxy) === proxy) // true
```

Questa regola si applica anche agli oggetti annidati. A causa della reattività profonda, gli oggetti annidati all'interno di un oggetto reattivo sono anch'essi dei proxy:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Limitazioni di `reactive()` \*\* {#limitations-of-reactive}

L'API `reactive()` presenta alcune limitazioni:

1. **Valori di tipizzazione limitati**: funziona solo per i type `oggetto` (oggetti, array e [type collezioni](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) come `Map` e `Set`). Non può contenere [type primitivi](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) come `string`, `number` o `boolean`.

2. **Impossibilità di sostituire l'intero oggetto**: poiché il tracciamento della reattività di Vue funziona attraverso l'accesso alle proprietà, dobbiamo sempre mantenere lo stesso riferimento all'oggetto reattivo. Ciò significa che non possiamo "sostituire" facilmente un oggetto reattivo perché la connessione della reattività al primo riferimento sarà persa:

   ```js
   let state = reactive({ count: 0 })

   // il riferimento sopra ({ count: 0 }) non viene più tracciato
   // (la connessione della reattività è persa!)
   state = reactive({ count: 1 })
   ```

3. **Non compatibile con la destrutturazione**: quando destrutturiamo una proprietà di tipo primitivo di un oggetto reattivo in variabili locali, o quando passiamo quella proprietà a una funzione, perderemo la connessione della reattività:

   ```js
   const state = reactive({ count: 0 })

   // count è disconnesso da state.count quando viene destrutturato.
   let { count } = state
   // non influisce sullo stato originale
   count++

   // la funzione riceve un numero normale e
   // non sarà in grado di tracciare le modifiche a state.count
   // dobbiamo passare l'intero oggetto per mantenere la reattività
   callSomeFunction(state.count)
   ```

A causa di queste limitazioni, raccomandiamo di utilizzare `ref()` come API principale per dichiarare lo stato reattivo.

## Dettagli sull'Estrazione delle Ref \*\* {#additional-ref-unwrapping-details}

### Come Proprietà di un Oggetto Reattivo \*\* {#ref-unwrapping-as-reactive-object-property}

Una ref viene automaticamente estratta (unwrapped) quando vi si accede o la si modifica come proprietà di un oggetto reattivo. In altre parole, si comporta come una normale proprietà:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

Se viene assegnata una nuova ref a una proprietà collegata a una ref esistente, questa sostituirà la vecchia ref:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// la ref originale è ora disconnessa da state.count
console.log(count.value) // 1
```

L'estrazione (unwrapping) delle ref avviene solo quando sono annidate all'interno di un oggetto reattivo profondo. Non si applica quando vi si accede come proprietà di un [oggetto reattivo shallow](/api/reactivity-advanced#shallowreactive).

### Eccezione con Array e Collezioni \*\* {#caveat-in-arrays-and-collections}

A differenza degli oggetti reattivi, **non** viene eseguita alcuna estrazione quando la ref viene letta come elemento di un array reattivo o di un tipo di collezione nativo come `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// è necessario .value qui
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// è necessario .value qui
console.log(map.get('count').value)
```

### Eccezione con i Template \*\* {#caveat-when-unwrapping-in-templates}

L'estrazione (unwrapping) delle ref nei template si applica solo se la ref è una proprietà di livello superiore nel contesto di rendering del template.

Nell'esempio qui sotto, `count` e `object` sono proprietà di livello superiore, ma `object.id` non lo è:

```js
const count = ref(0)
const object = { id: ref(0) }
```

Pertanto, questa espressione funziona come previsto:

```vue-html
{{ count + 1 }}
```

...mentre questa **NO**:

```vue-html
{{ object.id + 1 }}
```

Il risultato renderizzato sarà `[object Object]1` perché `object.id` non viene estratto durante la valutazione dell'espressione e rimane un oggetto ref. Per correggere questo comportamento, possiamo destrutturare `id` in una proprietà di livello superiore:

```js
const { id } = object
```

```vue-html
{{ id + 1 }}
```

Ora il risultato del rendering sarà `2`.

Un'altra cosa da notare è che una ref viene estratta se è il valore finale valutato di un'interpolazione di testo (cioè un tag <code v-pre>{{ }}</code>), quindi il seguente codice renderizzerà `1`:

```vue-html
{{ object.id }}
```

Questa funzionalità ha solo un carattere di praticità per per favorire l'interpolazione di testo ed è equivalente a <code v-pre>{{ object.id.value }}</code>.

</div>

<div class="options-api">

### I Metodi Stateful \* {#stateful-methods}

In alcuni casi potremmo aver bisogno di creare dinamicamente un metodo, ad esempio per un gestore di eventi "debounced" (ritardato):

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Debouncing con Lodash
    click: debounce(function () {
      // ... rispondi al click ...
    }, 500)
  }
}
```

Questo approccio, tuttavia, è problematico quando i componenti vengono riutilizzati, perché una funzione "debounced" è un **metodo di stato** (**stateful**): mantiene uno stato interno del tempo trascorso. Se più istanze del componente condividono la stessa funzione "debounced", interferiranno l'una con l'altra.

Per mantenere indipendente dalle altre la funzione "debounced" di ciascuna istanza del componente, possiamo creare la versione "debounced" nel ciclo di vita `created`:

```js
export default {
  created() {
    //  ogni istanza ha ora la sua copia del gestore debounced
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // ed è anche una buona idea annullare il timer
    // quando il componente viene rimosso
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... rispondi al click ...
    }
  }
}
```

</div>
