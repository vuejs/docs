# Provide / Inject {#provide-inject}

> Si assume che tu abbia già letto le [Basi dei componenti](/guide/essentials/component-basics). Leggi prima quello se sei nuovo al concetto di componente.

## Prop drilling {#prop-drilling}

Solitamente, quando abbiamo bisogno di passare dati dal genitore a un componente figlio, utilizziamo [props](/guide/components/props). Tuttavia, immagina il caso in cui abbiamo un albero di componenti ampio e un componente profondamente nidificato ha bisogno di qualcosa da un componente antenato distante. Con solo le props, dovremmo passare la stessa prop lungo l'intera catena genitore:

![diagramma prop drilling](./images/prop-drilling.png)

<!-- https://www.figma.com/file/yNDTtReM2xVgjcGVRzChss/prop-drilling -->

Nota che anche se il componente `<Footer>` potrebbe non essere interessato a queste props, deve comunque dichiararle e passarle in avanti affinché `<DeepChild>` possa accedervi. Se c'è una catena genitore più lunga, più componenti sarebbero influenzati lungo il percorso. Questo viene chiamato "props drilling" e sicuramente non è divertente da gestire.

Possiamo risolvere il problema del props drilling con `provide` e `inject`. Un componente genitore può fungere da **'fornitore di dipendenze'** per tutti i suoi discendenti. Qualsiasi componente nell'albero dei discendenti, indipendentemente da quanto sia profondo, può **iniettare** dipendenze fornite dai componenti nella sua catena genitore.

![Schema Provide/inject](./images/provide-inject.png)

<!-- https://www.figma.com/file/PbTJ9oXis5KUawEOWdy2cE/provide-inject -->

## Provide {#provide}

<div class="composition-api">

Per fornire dati ai discendenti di un componente, utilizza la funzione [`provide()`](/api/composition-api-dependency-injection#provide):

```vue
<script setup>
import { provide } from 'vue'

provide(/* chiave */ 'messaggio', /* valore */ 'ciao!')
</script>
```

Se non stai utilizzando `<script setup>`, assicurati che `provide()` venga chiamato in modo sincrono all'interno di `setup()`:

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* chiave */ 'messaggio', /* valore */ 'ciao!')
  }
}
```

La funzione `provide()` accetta due argomenti. Il primo argomento è chiamato **chiave di iniezione**, che può essere una stringa o un `Symbol`. La chiave di iniezione è utilizzata dai componenti discendenti per cercare il valore desiderato da iniettare. Un singolo componente può chiamare `provide()` più volte con diverse chiavi di iniezione per fornire valori diversi.

Il secondo argomento è il valore fornito. Il valore può essere di qualsiasi tipo, inclusi stati reattivi come i ref:

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

Fornire valori reattivi consente ai componenti discendenti che utilizzano il valore fornito di stabilire una connessione reattiva con il componente fornitore.

</div>

<div class="options-api">

Per fornire dati ai discendenti di un componente, utilizza l'opzione [`provide`](/api/options-composition#provide):

```js
export default {
  provide: {
    message: 'ciao!'
  }
}
```

Per ogni proprietà nell'oggetto `provide` la chiave è utilizzata dai componenti figlio per individuare il valore corretto da iniettare, mentre il valore è ciò che viene effettivamente iniettato.

Se abbiamo bisogno di fornire uno stato specifico per l'istanza, ad esempio dati dichiarati tramite `data()`, allora `provide` deve utilizzare un valore di tipo funzione:

```js{7-12}
export default {
  data() {
    return {
      message: 'ciao!'
    }
  },
  provide() {
    // utilizza la sintassi della funzione in modo che possiamo accedere a `this`
    return {
      message: this.message
    }
  }
}
```

Tuttavia, tieni presente che ciò **non** rende l'iniezione reattiva. Discuteremo [come rendere reattive le iniezioni](#working-with-reactivity) di seguito.

</div>

## Provide a livello app {#app-level-provide}

Oltre a fornire dati in un componente, possiamo anche fornirli a livello di app:

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* chiave */ 'messaggio', /* valore */ 'ciao!')
```

Le forniture a livello di app sono disponibili per tutti i componenti renderizzati nell'app. Questo è particolarmente utile quando si scrivono [plugins](/guide/reusability/plugins), poiché i plugin di solito non possono fornire valori utilizzando componenti.

## Inject {#inject}

<div class="composition-api">

Per iniettare i dati forniti da un componente antenato, utilizza la funzione [`inject()`](/api/composition-api-dependency-injection#inject):

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

Se il valore fornito è un ref, verrà iniettato così com'è e **non** verrà srotolato automaticamente. Questo consente al componente iniettore di mantenere la connessione reattiva con il componente fornitore.

[Esempio completo di provide + inject con reattività](https://play.vuejs.org/#eNqFUUFugzAQ/MrKF1IpxfeIVKp66Kk/8MWFDXYFtmUbpArx967BhURRU9/WOzO7MzuxV+fKcUB2YlWovXYRAsbBvQije2d9hAk8Xo7gvB11gzDDxdseCuIUG+ZN6a7JjZIvVRIlgDCcw+d3pmvTglz1okJ499I0C3qB1dJQT9YRooVaSdNiACWdQ5OICj2WwtTWhAg9hiBbhHNSOxQKu84WT8LkNQ9FBhTHXyg1K75aJHNUROxdJyNSBVBp44YI43NvG+zOgmWWYGt7dcipqPhGZEe2ef07wN3lltD+lWN6tNkV/37+rdKjK2rzhRTt7f3u41xhe37/xJZGAL2PLECXa9NKdD/a6QTTtGnP88LgiXJtYv4BaLHhvg==)

Ancora una volta, se non stai usando `<script setup>`, `inject()` dovrebbe essere chiamato in modo sincrono all'interno di `setup()`:

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

</div>

<div class="options-api">

Per iniettare i dati forniti da un componente antenato, utilizza l'opzione [`inject`](/api/options-composition#inject):

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // valore iniettato
  }
}
```

Le iniezioni vengono risolte **prima** dello stato del componente stesso, quindi puoi accedere alle proprietà iniettate in `data()`:

```js
export default {
  inject: ['message'],
  data() {
    return {
      // dati iniziali basati sul valore iniettato
      fullMessage: this.message
    }
  }
}
```

[Esempio completo di provide + inject](https://play.vuejs.org/#eNqNkcFqwzAQRH9l0EUthOhuRKH00FO/oO7B2JtERZaEvA4F43+vZCdOTAIJCImRdpi32kG8h7A99iQKobs6msBvpTNt8JHxcTC2wS76FnKrJpVLZelKR39TSUO7qreMoXRA7ZPPkeOuwHByj5v8EqI/moZeXudCIBL30Z0V0FLXVXsqIA9krU8R+XbMR9rS0mqhS4KpDbZiSgrQc5JKQqvlRWzEQnyvuc9YuWbd4eXq+TZn0IvzOeKr8FvsNcaK/R6Ocb9Uc4FvefpE+fMwP0wH8DU7wB77nIo6x6a2hvNEME5D0CpbrjnHf+8excI=)

### Alias di Injection \* {#injection-aliasing}

Quando si utilizza la sintassi dell'array per `inject`, le proprietà iniettate vengono esposte nell'istanza del componente utilizzando la stessa chiave. Nell'esempio sopra, la proprietà è stata fornita con la chiave `"message"`, e iniettata come `this.message`. La chiave locale è la stessa della chiave di iniezione.

Se desideriamo iniettare la proprietà utilizzando una chiave locale diversa, è necessario utilizzare la sintassi dell'oggetto per l'opzione `inject`:

```js
export default {
  inject: {
    /* chiave locale */ localMessage: {
      from: /* chiave di iniezione */ 'message'
    }
  }
}
```

Qui, il componente troverà una proprietà fornita con la chiave `"message"`, e quindi la esporrà come `this.localMessage`.

</div>

### Valori predefiniti di Inject {#injection-default-values}

Per impostazione predefinita `inject` assume che la chiave di iniezione sia fornita da qualche parte nella catena di genitori. Nel caso in cui la chiave non sia fornita, verrà emesso un avviso durante l'esecuzione.

Se vogliamo rendere una proprietà iniettata funzionante con fornitori opzionali, dobbiamo dichiarare un valore predefinito, simile alle props:

<div class="composition-api">

```js
// `value` sarà "default value"
// se nessun dato corrispondente a "message" è stato fornito
const value = inject('message', 'default value')
```

In alcuni casi, il valore predefinito potrebbe dover essere creato chiamando una funzione o istanziando una nuova classe. Per evitare calcoli o effetti collaterali non necessari nel caso in cui il valore opzionale non venga utilizzato, possiamo utilizzare una funzione factory per creare il valore predefinito:

```js
const value = inject('key', () => new ExpensiveClass(), true)
```

Il terzo parametro indica che il valore predefinito dovrebbe essere trattato come una funzione factory.

</div>

<div class="options-api">

```js
export default {
  // la sintassi dell'oggetto è obbligatoria
  // quando si dichiarano valori predefiniti per le iniezioni
  inject: {
    message: {
      from: 'message', // questo è facoltativo se si utilizza la stessa chiave per l'iniezione
      default: 'default value'
    },
    user: {
      // utilizzare una funzione factory per i valori non primitivi che sono costosi
      // da creare, o quelli che dovrebbero essere unici per l'istanza del componente.
      default: () => ({ name: 'John' })
    }
  }
}
```

</div>

## Lavorare con la reattività {#working-with-reactivity}

<div class="composition-api">

Quando si utilizzano valori di provide / inject reattivi, **è consigliabile mantenere qualsiasi mutazione allo stato reattivo all'interno del provider quando possibile**. Ciò garantisce che lo stato fornito e le sue eventuali mutazioni siano collocate nello stesso componente, facilitandone la manutenzione in futuro.

Ci possono essere momenti in cui è necessario aggiornare i dati da un componente injector. In tali casi, raccomandiamo di fornire una funzione responsabile per la mutazione dello stato:

```vue{7-9,13}
<!-- all'interno del componente provider -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue{5}
<!-- all'interno del componente injector -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

Infine, puoi avvolgere il valore fornito con [`readonly()`](/api/reactivity-core#readonly) se desideri garantire che i dati passati attraverso `provide` non possano essere modificati dal componente iniettore.

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

</div>

<div class="options-api">

Per rendere le iniezioni legate in modo reattivo al provider, è necessario fornire una proprietà calcolata utilizzando la funzione [computed()](/api/reactivity-core#computed):

```js{10}
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'ciao!'
    }
  },
  provide() {
    return {
      // fornisci esplicitamente una computed property
      message: computed(() => this.message)
    }
  }
}
```

[Esempio completo di provide + inject con reattività](https://play.vuejs.org/#eNqNUctqwzAQ/JVFFyeQxnfjBEoPPfULqh6EtYlV9EKWTcH43ytZtmPTQA0CsdqZ2dlRT16tPXctkoKUTeWE9VeqhbLGeXirheRwc0ZBds7HKkKzBdBDZZRtPXIYJlzqU40/I4LjjbUyIKmGEWw0at8UgZrUh1PscObZ4ZhQAA596/RcAShsGnbHArIapTRBP74O8Up060wnOO5QmP0eAvZyBV+L5jw1j2tZqsMp8yWRUHhUVjKPoQIohQ460L0ow1FeKJlEKEnttFweijJfiORElhCf5f3umObb0B9PU/I7kk17PJj7FloN/2t7a2Pj/Zkdob+x8gV8ZlMs2de/8+14AXwkBngD9zgVqjg2rNXPvwjD+EdlHilrn8MvtvD1+Q==)

Il metodo `computed()` viene tipicamente utilizzato nelle componenti della Composition API, ma può anche essere utilizzato per complementare determinati casi d'uso nell'Options API. Puoi apprendere ulteriori dettagli sulla sua utilizzo leggendo le sezioni [Fondamenti della reattività](/guide/essentials/reactivity-fundamentals) e [Computed Properties](/guide/essentials/computed) con le preferenze dell'API impostate sulla Composition API.

:::warning Configurazione Temporanea Richiesta
L'utilizzo sopra descritto richiede di impostare `app.config.unwrapInjectedRef = true` per far sì che le iniezioni siano automaticamente srotolate dalle computed refs. Questo comportamento diventerà predefinito in Vue 3.3 e questa configurazione è stata introdotta temporaneamente per evitare rotture. Non sarà più necessaria dopo la versione 3.3.
:::

</div>

## Lavorare con symbol keys {#working-with-symbol-keys}

Finora, abbiamo utilizzato chiavi di iniezione di tipo stringa negli esempi. Se stai lavorando in un'applicazione di grandi dimensioni con molti fornitori di dipendenze o stai creando componenti destinate ad essere utilizzate da altri sviluppatori, è meglio utilizzare chiavi di iniezione di tipo Symbol per evitare potenziali collisioni.

Si consiglia di esportare i Symbols in un file dedicato:

```js
// keys.js
export const myInjectionKey = Symbol()
```

<div class="composition-api">

```js
// nel componente provider
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* dati da fornire */
})
```

```js
// nel componente iniettore
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

Guarda anche: [Tipizzare Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

</div>

<div class="options-api">

```js
// nel componente provider
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* dati da fornire */
      }
    }
  }
}
```

```js
// nel componente iniettore
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```

</div>
