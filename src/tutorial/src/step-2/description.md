# Rendering Dichiarativo {#declarative-rendering}

<div class="sfc">

Quello che si vede nell'editor è un Componente Single-File (SFC) di Vue. Un SFC è un blocco di codice autonomo e riutilizzabile che incapsula HTML, CSS e Javascript tutto in un unico file `.vue`.

</div>

La caratteristica principale di Vue è il **rendering dichiarativo**. Utilizzando una sintassi di template che estende l'HTML, possiamo descrivere come dovrebbe apparire l'HTML in base allo stato di Javascript. Quando lo stato cambia, l'HTML si aggiorna automaticamente.

<div class="composition-api">

Uno stato che può attivare aggiornamenti quando viene modificato è considerato **reattivo**. Possiamo dichiarare uno stato reattivo usando l'API `reactive()` di Vue. Gli oggetti creati da `reactive()` sono [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) Javascript che funzionano come oggetti normali:

```js
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```

`reactive()` funziona solo sugli oggetti (compresi gli array e i tipi nativi come `Map` e `Set`). `Ref`, invece, può prendere qualsiasi tipo di valore e creare un oggetto che espone il suo valore interno sotto la proprietà `.value`.

```js
import { ref } from 'vue'

const message = ref('Ciao Mondo!')

console.log(message.value) // "Ciao Mondo!"
message.value = 'Modificato'
```

Dettagli su `reactive()` e `ref()` sono discussi in <a target="_blank" href="/guide/essentials/reactivity-fundamentals.html">Guida - Le basi della Reattività</a>.

<div class="sfc">

Lo stato reattivo dichiarato nel blocco `<script setup>` del componente può essere usato direttamente nel template. Ecco come possiamo rendere un testo dinamico basato sul valore dell'oggetto `counter` e del ref `message`, usando la sintassi mustache:

</div>

<div class="html">

L'oggetto passato a `createApp()` è un componente Vue. Lo stato di un componente deve essere dichiarato all'interno della sua funzione `setup()` ed essere restituito come un oggetto.

```js{2,5}
setup() {
  const counter = reactive({ count: 0 })
  const message = ref('Ciao Mondo!')
  return {
    counter,
    message
  }
}
```

Le proprietà restituite dall'oggetto saranno rese disponibili nel template. Ecco come possiamo rendere dinamico un testo basato sul valore di `message`, usando la sintassi mustache: 

</div>

```vue-html
<h1>{{ message }}</h1>
<p>conteggio: {{ counter.count }}</p>
```

Si noti come non sia necessario usare `.value` quando si accede al ref `message` nei templates: viene automaticamente estratto per un uso più sintetico.

</div>

<div class="options-api">

Uno stato che può attivare degli aggiornamenti quando modificato è considerato **reattivo**. In Vue, uno stato reattivo è contenuto nei componenti. <span class="html">Nel codice di esempio, l'oggetto passato a `createApp()` è un componente.</span>

Possiamo dichiarare uno stato reattivo usando l'opzione `data` del componente, che deve essere una funzione che restituisce un oggetto:

<div class="sfc">

```js{3-5}
export default {
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
```

</div>
<div class="html">

```js{3-5}
createApp({
  data() {
    return {
      message: 'Ciao Mondo!'
    }
  }
})
```

</div>

La proprietà `message` sarà resa disponibile nel template. Ecco come possiamo rendere il testo dinamico in base al valore di `message`, usando la sintassi mustache:

```vue-html
<h1>{{ message }}</h1>
```

</div>

Il contenuto all'interno delle parentesi graffe (sintassi mustache) non è limitato a identificatori o paths - possiamo usare qualsiasi espressione Javascript valida:

```vue-html
<h1>{{ message.split('').reverse().join('') }}</h1>
```

<div class="composition-api">

Ora, prova a creare tu uno stato reattivo e a usarlo per rendere dinamico il contenuto testuale di `<h1>` nel template.

</div>

<div class="options-api">

Ora, prova a creare tu una proprietà (all'interno di data) reattiva e utilizzala come contenuto testuale per `<h1>` nel template.

</div>
