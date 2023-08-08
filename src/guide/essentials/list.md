# Rendering delle Liste {#list-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/list-rendering-in-vue-3" title="Lezione Gratuita sul Rendering di Liste con Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-list-rendering-in-vue" title="Lezione Gratuita sul Rendering di Liste con Vue.js"/>
</div>

## `v-for` {#v-for}

Per mostrare una lista di elementi basati su un array possiamo utilizzare la direttiva `v-for`. La direttiva `v-for` richiede una sintassi speciale nella forma di `item in items`, dove `items` è l'array di dati sorgente e `item` è un **alias** per l'elemento dell'array su cui si sta iterando:

<div class="composition-api">

```js
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>

<div class="options-api">

```js
data() {
  return {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="item in items">
  {{ item.message }}
</li>
```

All'interno dello scope di `v-for`, le espressioni del template hanno accesso a tutte le proprietà dello scope del genitore. Inoltre, `v-for` supporta anche un secondo alias opzionale per l'indice dell'elemento corrente:

<div class="composition-api">

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>
<div class="options-api">

```js
data() {
  return {
    parentMessage: 'Parent',
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

<script setup>
const parentMessage = 'Parent'
const items = [{ message: 'Foo' }, { message: 'Bar' }]
</script>
<div class="demo">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</div>

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNpdTsuqwjAQ/ZVDNlFQu5d64bpwJ7g3LopOJdAmIRlFCPl3p60PcDWcM+eV1X8Iq/uN1FrV6RxtYCTiW/gzzvbBR0ZGpBYFbfQ9tEi1ccadvUuM0ERyvKeUmithMyhn+jCSev4WWaY+vZ7HjH5Sr6F33muUhTR8uW0ThTuJua6mPbJEgGSErmEaENedxX3Z+rgxajbEL2DdhR5zOVOdUSIEDOf8M7IULCHsaPgiMa1eK4QcS6rOSkhdfapVeQLQEWnH)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNpVTssKwjAQ/JUllyr0cS9V0IM3wbvxEOxWAm0a0m0phPy7m1aqhpDsDLMz48XJ2nwaUZSiGp5OWzpKg7PtHUGNjRpbAi8NQK1I7fbrLMkhjc5EJAn4WOXQ0BWHQb2whOS24CSN6qjXhN1Qwt1Dt2kufZ9ASOGXOyvH3GMNCdGdH75VsZVjwGa2VYQRUdVqmLKmdwcpdjEnBW1qnPf8wZIrBQujoff/RSEEyIDZZeGLeCn/dGJyCSlazSZVsUWL8AYme21i)

</div>

Il contesto delle variabili in `v-for` è simile al seguente JavaScript:

```js
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // ha accesso allo scope/contesto esterno per `parentMessage`
  // ma `item` e `index` sono disponibili solo qui
  console.log(parentMessage, item.message, index)
})
```

Nota come il valore `v-for` corrisponda alla dichiarazione della funzione nella callback di `forEach`. Puoi utilizzare, infatti, il destructuring sull'alias dell'elemento `v-for` in modo simile al destructuring degli argomenti della funzione:

```vue-html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- con un alias per index -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

Per `v-for` annidati, anche lo scope funziona in modo simile alle funzioni annidate. Ogni scope di `v-for` ha accesso agli scope dei genitori:

```vue-html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

È possibile utilizzare anche `of` come delimitatore al posto di `in`, così da avvicinarsi maggiormente alla sintassi di JavaScript per gli iteratori:

```vue-html
<div v-for="item of items"></div>
```

## `v-for` con un Oggetto {#v-for-with-an-object}

Puoi anche utilizzare `v-for` per iterare attraverso le proprietà di un oggetto. L'ordine dell'iterazione sarà basato sul risultato dell'invocazione di `Object.keys()` sull'oggetto:

<div class="composition-api">

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    myObject: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
}
```

</div>

```vue-html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

Puoi anche fornire un secondo alias per il nome della proprietà (anche noto come `key`):

```vue-html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

E un altro per l'indice (`index`):

```vue-html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNo9jjFvgzAQhf/KE0sSCQKpqg7IqRSpQ9WlWycvBC6KW2NbcKaNEP+9B7Tx4nt33917Y3IKYT9ESspE9XVnAqMnjuFZO9MG3zFGdFTVbAbChEvnW2yE32inXe1dz2hv7+dPqhnHO7kdtQPYsKUSm1f/DfZoPKzpuYdx+JAL6cxUka++E+itcoQX/9cO8SzslZoTy+yhODxlxWN2KMR22mmn8jWrpBTB1AZbMc2KVbTyQ56yBkN28d1RJ9uhspFSfNEtFf+GfnZzjP/oOll2NQPjuM4xTftZyIaU5VwuN0SsqMqtWZxUvliq/J4jmX4BTCp08A==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNo9T8FqwzAM/RWRS1pImnSMHYI3KOwwdtltJ1/cRqXe3Ng4ctYS8u+TbVJjLD3rPelpLg7O7aaARVeI8eS1ozc54M1ZT9DjWQVDMMsBoFekNtucS/JIwQ8RSQI+1/vX8QdP1K2E+EmaDHZQftg/IAu9BaNHGkEP8B2wrFYxgAp0sZ6pn2pAeLepmEuSXDiy7oL9gduXT+3+pW6f631bZoqkJY/kkB6+onnswoDw6owijIhEMByjUBgNU322/lUWm0mZgBX84r1ifz3ettHmupYskjbanedch2XZRcAKTnnvGVIPBpkqGqPTJNGkkaJ5+CiWf4KkfBs=)

</div>

## `v-for` con un Intervallo {#v-for-with-a-range}

`v-for` può accettare anche un numero intero. In questo caso, ripeterà il template quel numero di volte, basandosi su un intervallo da `1 a n`.

```vue-html
<span v-for="n in 10">{{ n }}</span>
```

Nota che `n` con un valore iniziale di `1` al posto di `0`.

## `v-for` su `<template>` {#v-for-on-template}

Come con `v-if`, nel template puoi usare un tag `<template>` anche con `v-for` per renderizzare un blocco di elementi multipli. Ad esempio:

```vue-html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` con `v-if` {#v-for-with-v-if}

:::warning Nota
**Non** è consigliato utilizzare `v-if` e `v-for` sullo stesso elemento a causa della precedenza implicita. Fare riferimento alla [guida di stile](/style-guide/rules-essential#avoid-v-if-with-v-for) per i dettagli.
:::

Quando esistono sullo stesso nodo, `v-if` ha una priorità maggiore rispetto a `v-for`. Ciò significa che la condizione `v-if` non avrà accesso alle variabili dallo scope di `v-for`:

```vue-html
<!--
Questo genererà un errore perché la proprietà "todo"
non è definita sull'istanza.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

Questo problema può essere risolto spostando `v-for` in un tag `<template>` contenitore (che è anche più esplicito):

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## Mantenere lo Stato con `key` {#maintaining-state-with-key}

Quando Vue aggiorna un elenco di elementi resi con `v-for`, di default utilizza una strategia di "correzione in loco" (in-place patch). Se l'ordine degli elementi dei dati viene modificato, invece di spostare gli elementi DOM per far corrispondere l'ordine degli elementi, Vue correggerà in-place ogni elemento e si assicurerà che rifletta ciò che dovrebbe essere reso in quel particolare indice.

Questa modalità predefinita è efficiente, ma **è adatta solo quando l'output della visualizzazione del tuo elenco non dipende dallo stato del componente figlio o dallo stato temporaneo del DOM (ad es. valori di input del modulo)**.

Per permettere a Vue di identificare ogni nodo cosi da poter riutilizzare e riordinare gli elementi esistenti, è necessario fornire un attributo `key` unico per ogni elemento:

```vue-html
<div v-for="item in items" :key="item.id">
  <!-- contenuto -->
</div>
```

Quando si utilizza `<template v-for>`, la `key` deve essere posizionata sul contenitore `<template>`:

```vue-html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

:::tip Nota
L'attributo `key` qui è uno speciale attributo legato a `v-bind`, e non va confuso con la "chiave" della proprietà di un oggetto, come quando si [utilizza v-for con un oggetto](#v-for-with-an-object).
:::

[Si raccomanda](/style-guide/rules-essential#use-keyed-v-for) di fornire un attributo `key` con `v-for` ogni volta che è possibile, a meno che il contenuto DOM iterato non sia semplice (cioè non contenga componenti o elementi DOM con stato), o si stia volutamente facendo affidamento sul comportamento predefinito per aumentare le prestazioni.

Il binding della `key` si aspetta valori primitivi, cioè stringhe e numeri. Non utilizzare oggetti come chiavi per `v-for`. Per un utilizzo dettagliato dell'attributo `key`, si prega di consultare la documentazione dell'[API `key`](/api/built-in-special-attributes#key).

## `v-for` con un Componente {#v-for-with-a-component}

> Questa sezione presuppone la conoscenza dei [Componenti](/guide/essentials/component-basics). Sentiti libero di saltarla e tornare in seguito.

Puoi utilizzare direttamente `v-for` su un componente, come su un qualsiasi elemento, ma non dimenticare di fornire una `key`:

```vue-html
<MyComponent v-for="item in items" :key="item.id" />
```

Tuttavia, questo non passerà alcun dato al componente in modo automatico, poiché i componenti hanno i propri scope isolati. Per passare i dati iterati al componente, dovremmo utilizzare anche le props:

```vue-html
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

La ragione per non iniettare `item` nel componente automaticamente è che ciò renderebbe il componente strettamente accoppiato al funzionamento di `v-for`. Essere chiari sull'origine dei dati rende il componente adattabile a diverse situazioni.

<div class="composition-api">

Guarda [questo esempio di una semplice lista di todo](https://play.vuejs.org/#eNp1U8Fu2zAM/RXCGGAHTWx02ylwgxZYB+ywYRhyq3dwLGYRYkuCJTsZjPz7KMmK3ay9JBQfH/meKA/Rk1Jp32G0jnJdtVwZ0Gg6tSkEb5RsDQzQ4h4usG9lAzGVxldoK5n8ZrAZsTQLCduRygAKUUmhDQg8WWyLZwMPtmESx4sAGkL0mH6xrMH+AHC2hvuljw03Na4h/iLBHBAY1wfUbsTFVcwoH28o2/KIIDuaQ0TTlvrwNu/TDe+7PDlKXZ6EZxTiN4kuRI3W0dk4u4yUf7bZfScqw6WAkrEf3m+y8AOcw7Qv6w5T1elDMhs7Nbq7e61gdmme60SQAvgfIhExiSSJeeb3SBukAy1D1aVBezL5XrYN9Csp1rrbNdykqsUehXkookl0EVGxlZHX5Q5rIBLhNHFlbRD6xBiUzlOeuZJQz4XqjI+BxjSSYe2pQWwRBZizV01DmsRWeJA1Qzv0Of2TwldE5hZRlVd+FkbuOmOksJLybIwtkmfWqg+7qz47asXpSiaN3lxikSVwwfC8oD+/sEnV+oh/qcxmU85mebepgLjDBD622Mg+oDrVquYVJm7IEu4XoXKTZ1dho3gnmdJhedEymn9ab3ysDPdc4M9WKp28xE5JbB+rzz/Trm3eK3LAu8/E7p2PNzYM/i3ChR7W7L7hsSIvR7L2Aal1EhqTp80vF95sw3WcG7r8A0XaeME=) per vedere come rendere un elenco di componenti utilizzando `v-for`, passando dati diversi a ogni istanza.

</div>
<div class="options-api">

Guarda [questo esempio di una semplice lista di todo](https://play.vuejs.org/#eNqNVE2PmzAQ/SsjVIlEm4C27Qmx0a7UVuqhPVS5lT04eFKsgG2BSVJF+e8d2xhIu10tihR75s2bNx9wiZ60To49RlmUd2UrtNkUUjRatQa2iquvBhvYt6qBOEmDwQbEhQQoJJ4dlOOe9bWBi7WWiuIlStNlcJlYrivr5MywxdIDAVo0fSvDDUDiyeK3eDYZxLGLsI8hI7H9DHeYQuwjeAb3I9gFCFMjUXxSYCoELroKO6fZP17Mf6jev0i1ZQcE1RtHaFrWVW/l+/Ai3zd1clQ1O8k5Uzg+j1HUZePaSFwfvdGhfNIGTaW47bV3Mc6/+zZOfaaslegS18ZE9121mIm0Ep17ynN3N5M8CB4g44AC4Lq8yTFDwAPNcK63kPTL03HR6EKboWtm0N5MvldtA8e1klnX7xphEt3ikTbpoYimsoqIwJY0r9kOa6Ag8lPeta2PvE+cA3M7k6cOEvBC6n7UfVw3imPtQ8eiouAW/IY0mElsiZWqOdqkn5NfCXxB5G6SJRvj05By1xujpJWUp8PZevLUluqP/ajPploLasmk0Re3sJ4VCMnxvKQ//0JMqrID/iaYtSaCz+xudsHjLpPzscVGHYO3SzpdixIXLskK7pcBucnTUdgg3kkmcxhetIrmH4ebr8m/n4jC6FZp+z7HTlLsVx1p4M7odcXPr6+Lnb8YOne5+C2F6/D6DH2Hx5JqOlCJ7yz7IlBTbZsf7vjXVBzjvLDrH5T0lgo=) per vedere come rendere un elenco di componenti utilizzando `v-for`, passando dati diversi a ogni istanza.

</div>

## Rilevare le modifiche all'Array {#array-change-detection}

### Metodi di mutazione {#mutation-methods}

Vue è in grado di rilevare quando vengono chiamati i metodi di mutazione di un array reattivo e di attivare gli aggiornamenti necessari. Questi metodi di mutazione sono:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

### Sostituire un Array {#replacing-an-array}

I metodi di mutazione (Mutation methods), come suggerisce il nome, modificano l'array originale su cui vengono chiamati. Esistono anche metodi non mutanti, come `filter()`, `concat()` e `slice()`, che non modificano l'array originale ma **restituiscono sempre un nuovo array**. Quando si lavora con metodi non mutanti, si dovrebbe sostituire il vecchio array con uno nuovo:

<div class="composition-api">

```js
// `items` è un ref con valore di array
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

</div>
<div class="options-api">

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

</div>

Potresti pensare che ciò costringerà Vue a scartare il DOM esistente e a ri-renderizzare l'intero elenco - fortunatamente, non è così. Vue implementa alcune euristiche intelligenti per massimizzare il riutilizzo degli elementi del DOM, quindi sostituire un array con un altro array contenente oggetti che si sovrappongono è un'operazione molto efficiente.

## Visualizzare Risultati Filtrati/Ordinati {#displaying-filtered-sorted-results}

A volte vogliamo visualizzare una versione filtrata o ordinata di un array senza effettivamente modificare o reimpostare i dati originali. In questo caso puoi creare una proprietà calcolata (computed property) che restituisce l'array filtrato o ordinato.

Ad esempio:

<div class="composition-api">

```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    numbers: [1, 2, 3, 4, 5]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(n => n % 2 === 0)
  }
}
```

</div>

```vue-html
<li v-for="n in evenNumbers">{{ n }}</li>
```

Nelle situazioni in cui le computed properties non sono utilizzabili (ad es. all'interno di cicli `v-for` annidati), è possibile utilizzare un metodo:

<div class="composition-api">

```js
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

</div>

```vue-html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

Fai attenzione con `reverse()` e `sort()` in una computed property! Questi due metodi modificheranno l'array originale, il che dovrebbe essere evitato nei getter delle computed property. Crea una copia dell'array originale prima di chiamare questi metodi:

```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```
