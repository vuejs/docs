# Le Direttive Personalizzate {#custom-directives}

<script setup>
const vFocus = {
  mounted: el => {
    el.focus()
  }
}
</script>

## Introduzione {#introduction}

Oltre all'insieme di direttive predefinite incluse nel core (come `v-model` o `v-show`), Vue ti permette anche di registrare le tue direttive personalizzate.

Abbiamo introdotto due forme di riutilizzo del codice in Vue: i [componenti](/guide/essentials/component-basics) e i [composables](./composables). I componenti sono i principali mattoni di costruzione, mentre i composables sono incentrati sul riutilizzo della logica con stato. Le direttive personalizzate, invece, sono principalmente destinate al riutilizzo della logica che coinvolge l'accesso al DOM di basso livello su elementi semplici.

Una direttiva personalizzata è definita come un oggetto contenente degli hook del ciclo di vita simili a quelli di un componente. Gli hook ricevono l'elemento a cui è legata la direttiva. Ecco un esempio di una direttiva che mette a fuoco un input quando l'elemento viene inserito nel DOM da Vue:

<div class="composition-api">

```vue
<script setup>
// abilita v-focus nei template
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

</div>

<div class="options-api">

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // abilita v-focus nei template
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

<div class="demo">
  <input v-focus placeholder="Questo dovrebbe essere a fuoco" />
</div>

Supponendo che tu non abbia cliccato altrove sulla pagina, l'input qui sopra dovrebbe essere messo a fuoco automaticamente. Questa direttiva è più utile dell'attributo `autofocus` perché funziona non solo al caricamento della pagina - funziona anche quando l'elemento viene inserito dinamicamente da Vue.

<div class="composition-api">

In `<script setup>`, qualsiasi variabile camelCase che inizia con il prefisso `v` può essere utilizzata come direttiva personalizzata. Nell'esempio sopra, `vFocus` può essere utilizzata nel template come `v-focus`.

Se non si utilizza `<script setup>`, le direttive personalizzate possono essere registrate utilizzando l'opzione `directives`:

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // abilita v-focus nei template
    focus: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

Come per i componenti, le direttive personalizzate devono essere registrate affinché possano essere utilizzate nei template. Nell'esempio sopra, stiamo utilizzando la registrazione locale tramite l'opzione `directives`.

</div>

È una pratica comune registrare globalmente le direttive personalizzate a livello di app:

```js
const app = createApp({})

// rendi v-focus utilizzabile in tutti i componenti
app.directive('focus', {
  /* ... */
})
```

:::tip
Le direttive personalizzate dovrebbero essere utilizzate solo quando la funzionalità desiderata può essere ottenuta solo attraverso la manipolazione diretta del DOM. Cerca di utilizzare, quando possibile, l'utilizzo di template dichiarativi con direttive native come `v-bind`, poiché sono più efficienti e compatibili con il rendering lato server.
:::

## Directive Hooks {#directive-hooks}

Un oggetto che definisce la direttiva può fornire diverse funzioni hook (tutte opzionali):

```js
const myDirective = {
  // Chiamato prima dell'applicazione degli attributi o 
  // dei listener di eventi all'elemento a cui è legato
  created(el, binding, vnode, prevVnode) {
    // vedi sotto per i dettagli sugli argomenti
  },
  // chiamato subito prima che l'elemento venga inserito nel DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // chiamato quando il componente genitore dell'elemento a cui è legato
  // e tutti i suoi figli sono montati.
  mounted(el, binding, vnode, prevVnode) {},
  // chiamato prima che il componente genitore venga aggiornato
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // chiamato dopo che il componente genitore e
  // tutti i suoi figli sono stati aggiornati
  updated(el, binding, vnode, prevVnode) {},
  // chiamato prima che il componente genitore venga smontato
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // chiamato quando il componente genitore viene smontato
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### Argomenti degli Hook {#hook-arguments}

Gli hook delle direttive ricevono questi argomenti:

- `el`: l'elemento al quale la direttiva è legata. Questo può essere utilizzato per manipolare direttamente il DOM.

- `binding`: un oggetto contenente le seguenti proprietà.

  - `value`: Il valore passato alla direttiva. Ad esempio in `v-my-directive="1 + 1"`, il valore sarebbe `2`.
  - `oldValue`: : Il valore precedente, disponibile solo in `beforeUpdate` e `updated`. È disponibile indipendentemente dal fatto che il valore sia cambiato o meno.
  - `arg`: L'argomento passato alla direttiva, se presente. Ad esempio in `v-my-directive:foo`, l'arg sarebbe `"foo"`.
  - `modifiers`: Un oggetto contenente i modificatori, se presenti. Ad esempio in `v-my-directive.foo.bar`, l'oggetto dei modificatori sarebbe `{ foo: true, bar: true }`.
  - `instance`: L'istanza del componente dove viene utilizzata la direttiva.
  - `dir`: l'oggetto di definizione della direttiva.

- `vnode`: il VNode sottostante che rappresenta l'elemento a cui è legato.
- `prevNode`:  il VNode che rappresenta l'elemento a cui è legato dal render precedente. Disponibile solo negli hook `beforeUpdate` e `updated`.

Come esempio, considera il seguente uso della direttiva:

```vue-html
<div v-example:foo.bar="baz">
```

L'argomento `binding`  sarebbe un oggetto nella forma di:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* valore di `baz` */,
  oldValue: /* valore di `baz` dall'aggiornamento precedente */
}
```

In modo simile alle direttive native, gli argomenti delle direttive personalizzate possono essere dinamici. Ad esempio:

```vue-html
<div v-example:[arg]="value"></div>
```

Qui l'argomento della direttiva verrà aggiornato in maniera reattiva in base alla proprietà arg nello stato del nostro componente.

:::tip Nota
A parte `el`, dovresti trattare questi argomenti come di sola lettura e non modificarli mai. Se hai bisogno di condividere informazioni attraverso gli hook, è consigliato farlo tramite il [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) dell'elemento.
:::

## Funzione Shorthand {#function-shorthand}

È comune che una direttiva personalizzata abbia lo stesso comportamento per `mounted` e `updated`, senza bisogno degli altri hook. In tali casi possiamo definire la direttiva come una funzione:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // Questo verrà chiamato sia per `mounted` che per `updated`
  el.style.color = binding.value
})
```

## Oggetti Literal {#object-literals}

Se la tua direttiva ha bisogno di valori multipli, puoi passare anche un oggetto literal JavaScript. Ricorda che le direttive possono accettare qualsiasi espressione JavaScript valida.

```vue-html
<div v-demo="{ color: 'white', text: 'ciao!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "ciao!"
})
```

## Utilizzo con i Componenti {#usage-on-components}

Quando utilizzate con i componenti, le direttive personalizzate verranno sempre applicate al nodo radice del componente, in modo simile agli [Attributi Trasferibili (Fallthrough)](/guide/components/attrs).

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- template di MyComponent -->

<div> <!-- la direttiva `v-demo` verrà applicata qui -->
  <span>Contenuto di My component</span>
</div>
```

Nota che i componenti, potenzialmente, possono avere più di un nodo radice. Quando applicata a un componente multi-radice, la direttiva personalizzata verrà ignorata e verrà generato un avviso. A differenza degli attributi, le direttive non possono essere passate a un elemento diverso con `v-bind="$attrs"`. In generale, **non** è consigliato utilizzare direttive personalizzate sui componenti.
