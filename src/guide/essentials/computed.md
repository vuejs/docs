# Computed Properties {#computed-properties}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Free Vue.js Computed Properties Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Free Vue.js Computed Properties Lesson"/>
</div>

## Basic Example {#basic-example}

Le espressioni all'interno dei template sono molto comode, ma sono pensate per operazioni semplici. Inserire troppa logica nei tuoi template può renderli inutilmente lunghi e difficili da mantenere. Ad esempio, se abbiamo un oggetto con un array annidato:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

E se vogliamo mostrare messaggi diversi a seconda che `author` abbia o meno alcuni libri:

```vue-html
<p>Ha pubblicato dei libri:</p>
<span>{{ author.books.length > 0 ? 'Si' : 'No' }}</span>
```

A questo punto il template sta diventando un po' disordinato. Dobbiamo guardarlo per un attimo prima di renderci conto che esegue una valutazione riguardo a `author.books`. In oltre, probabilmente non vogliamo ripeterci se abbiamo bisogno di includere questa valutazione nel template più di una volta.

Ecco perché, per la logica complessa che include dati reattivi, si consiglia di utilizzare una **computed property** (proprietà calcolata). Ecco lo stesso esempio, riscritto:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // un computed getter
    publishedBooksMessage() {
      // `this` si riferisce all'istanza del componente
      return this.author.books.length > 0 ? 'Si' : 'No'
    }
  }
}
```

```vue-html
<p>Ha pubblicato dei libri:</p>
<span>{{ publishedBooksMessage }}</span>
```

[Prova nel Playground](https://play.vuejs.org/#eNqFkN1KxDAQhV/l0JsqaFfUq1IquwiKsF6JINaLbDNui20S8rO4lL676c82eCFCIDOZMzkzXxetlUoOjqI0ykypa2XzQtC3ktqC0ydzjUVXCIAzy87OpxjQZJ0WpwxgzlZSp+EBEKylFPGTrATuJcUXobST8sukeA8vQPzqCNe4xJofmCiJ48HV/FfbLLrxog0zdfmn4tYrXirC9mgs6WMcBB+nsJ+C8erHH0rZKmeJL0sot2tqUxHfDONuyRi2p4BggWCr2iQTgGTcLGlI7G2FHFe4Q/xGJoYn8SznQSbTQviTrRboPrHUqoZZ8hmQqfyRmTDFTC1bqalsFBN5183o/3NG33uvoWUwXYyi/gdTEpwK)

Qui abbiamo dichiarato una computed property `publishedBooksMessage`.

Prova a cambiare il valore dell'array `books` nei dati dell'applicazione e vedrai come `publishedBooksMessage` cambia di conseguenza.

Puoi usare i dati delle computed properties nei template proprio come una proprietà normale. Vue è consapevole che `this.publishedBooksMessage` dipende da `this.author.books`, quindi aggiornerà qualsiasi binding che dipende da `this.publishedBooksMessage` quando `this.author.books` cambia.

Vedi anche: [Tipizzazione delle Computed Properties](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Si' : 'No'
})
</script>

<template>
  <p>Ha pubblicato dei libri:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[Prova nel Playground](https://play.vuejs.org/#eNp1kE9Lw0AQxb/KI5dtoTainkoaaREUoZ5EEONhm0ybYLO77J9CCfnuzta0vdjbzr6Zeb95XbIwZroPlMySzJW2MR6OfDB5oZrWaOvRwZIsfbOnCUrdmuCpQo+N1S0ET4pCFarUynnI4GttMT9PjLpCAUq2NIN41bXCkyYxiZ9rrX/cDF/xDYiPQLjDDRbVXqqSHZ5DUw2tg3zP8lK6pvxHe2DtvSasDs6TPTAT8F2ofhzh0hTygm5pc+I1Yb1rXE3VMsKsyDm5JcY/9Y5GY8xzHI+wnIpVw4nTI/10R2rra+S4xSPEJzkBvvNNs310ztK/RDlLLjy1Zic9cQVkJn+R7gIwxJGlMXiWnZEq77orhH3Pq2NH9DjvTfpfSBSbmA==)

Qui abbiamo dichiarato una computed property `publishedBooksMessage`. La funzione `computed()` si aspetta di ricevere una funzione getter, e il valore restituito è un **computed ref**. Similmente ai normali ref, puoi accedere al risultato calcolato con `publishedBooksMessage.value`. I computed ref vengono anche estratti automaticamente nei template, quindi puoi utilizzarli senza `.value` nelle espressioni del template.

Una computed property tiene traccia automaticamente delle sue dipendenze reattive. Vue è consapevole che il calcolo di `publishedBooksMessage` dipende da `author.books`, quindi aggiornerà qualsiasi binding che dipende da `publishedBooksMessage` quando `author.books` cambia.

Vedi anche: [Tipizzazione delle Computed Properties](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />

</div>

## Computed Caching vs. Metodi {#computed-caching-vs-methods}

Potresti aver notato che possiamo ottenere lo stesso risultato invocando un metodo nell'espressione:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// in component
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
}
```

</div>

<div class="composition-api">

```js
// in component
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

</div>

Al posto di una computed property possiamo definire la stessa funzione come un metodo. I due approcci sono effettivamente gli stessi e producono esattamente lo stesso risultato finale. Tuttavia, la differenza è che **le computed properties vengono memorizzate nella cache in base alle loro dipendenze reattive**. Una computed property verrà riesaminata solo quando almeno una delle sue dipendenze reattive viene modificata. Ciò significa che finché `author.books` non verrà modificato, gli accessi successivi a `publishedBooksMessage` restituiranno sempre e immediatamente il risultato calcolato in precedenza, senza dover eseguire nuovamente la funzione getter.

Ciò significa anche che la seguente computed property non verrà mai aggiornata, perché `Date.now()` non è una dipendenza reattiva:

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

Al contrario, l'invocazione di un metodo eseguirà **sempre** la funzione, ogni volta che si verifica una renderizzazione.

Perché abbiamo bisogno della cache? Immagina di avere una computed property `list` complicata, che richiede di scorrere un enorme array e di effettuare molti calcoli. E potremmo avere altre computed properties che dipendono a loro volta  da `list`. Senza la cache, eseguiremmo il getter di `list` molte più volte del necessario! Nei casi in cui non si desidera la cache, si può invece utilizzare un metodo.

## Computed Modificabili {#writable-computed}

Le computed properties sono usate di default solo come getter. Se provi ad assegnare un nuovo valore a una computed property riceverai un avviso di runtime. Nei rari casi in cui hai bisogno di una computed property "scrivibile", puoi crearne una fornendo sia un getter che un setter:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // Nota: qui stiamo utilizzando la sintassi di assegnazione tramite destrutturazione.
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

Ora, quando esegui `this.fullName = 'John Doe'`, il setter verrà invocato e `this.firstName` e `this.lastName` saranno aggiornati di conseguenza.

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Nota: qui stiamo utilizzando la sintassi di assegnazione tramite destrutturazione.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

Ora, quando esegui `fullName.value = 'John Doe'`, il setter verrà invocato e `firstName` e `lastName` saranno aggiornati di conseguenza.

</div>

## Best Practices {#best-practices}

### I Getter dovrebbero essere privi di effetti collaterali {#getters-should-be-side-effect-free}

È importante ricordare che le funzioni getter delle computed dovrebbero eseguire solo calcoli puri ed essere privi di effetti collaterali. Ad esempio, **non effettuare richieste asincrone o modificare il DOM all'interno di un getter di una computed!** Pensa a una computed property come a una descrizione dichiarativa di come ottenere un valore basandosi su altri valori - la sua unica responsabilità dovrebbe essere calcolare e restituire quel valore. Più avanti nella guida discuteremo di come possiamo ottenere consapevolmente degli effetti collaterali in risposta ai cambiamenti di stato con i [watchers](./watchers).

### Evita di modificare il valore computed {#avoid-mutating-computed-value}

Il valore restituito da una computed property è derivato dallo stato. Pensalo come a uno snapshot temporaneo - ogni volta che lo stato sorgente cambia, viene creato un nuovo snapshot. Non ha senso modificare uno snapshot, quindi, un valore restituito da una computed dovrebbe essere trattato come un valore di sola lettura e non dovrebbe essere mai modificato - aggiorna, invece, lo stato sorgente da cui dipende, per provocare nuovi calcoli.
