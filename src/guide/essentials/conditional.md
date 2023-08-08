# Rendering Condizionale {#conditional-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/conditional-rendering-in-vue-3" title="Lezione Gratuita su Vue.js per il Rendering Condizionale"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue" title="Lezione Gratuita su Vue.js per il Rendering Condizionale"/>
</div>

<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

## `v-if` {#v-if}

La direttiva `v-if` viene utilizzata per renderizzare in maniera condizionale un blocco di codice. Il blocco verrà renderizzato solo se l'espressione della direttiva restituisce un valore truthy.

```vue-html
<h1 v-if="awesome">Vue è fantastico!</h1>
```

## `v-else` {#v-else}

Puoi utilizzare la direttiva `v-else` per indicare un "blocco alternativo" a `v-if`:

```vue-html
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue è fantastico!</h1>
<h1 v-else>Oh no 😢</h1>
```

<div class="demo">
  <button @click="awesome = !awesome">Toggle</button>
  <h1 v-if="awesome">Vue è fantastico!</h1>
  <h1 v-else>Oh no 😢</h1>
</div>

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNpFjkEOgjAQRa8ydIMulLA1hegJ3LnqBskAjdA27RQXhHu4M/GEHsEiKLv5mfdf/sBOxux7j+zAuCutNAQOyZtcKNkZbQkGsFjBCJXVHcQBjYUSqtTKERR3dLpDyCZmQ9bjViiezKKgCIGwM21BGBIAv3oireBYtrK8ZYKtgmg5BctJ13WLPJnhr0YQb1Lod7JaS4G8eATpfjMinjTphC8wtg7zcwNKw/v5eC1fnvwnsfEDwaha7w==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNpFjj0OwjAMha9iMsEAFWuVVnACNqYsoXV/RJpEqVOQqt6DDYkTcgRSWoplWX7y56fXs6O1u84jixlvM1dbSoXGuzWOIMdCekXQCw2QS5LrzbQLckje6VEJglDyhq1pMAZyHidkGG9hhObRYh0EYWOVJAwKgF88kdFwyFSdXRPBZidIYDWvgqVkylIhjyb4ayOIV3votnXxfwrk2SPU7S/PikfVfsRnGFWL6akCbeD9fLzmK4+WSGz4AA5dYQY=)

</div>

Un elemento `v-else` deve seguire immediatamente un elemento `v-if` o un elemento `v-else-if`, altrimenti non verrà riconosciuto.

## `v-else-if` {#v-else-if}

The `v-else-if`, come suggerisce il nome, funge da "blocco else if" per `v-if`. Può anche essere concatenato più volte:

```vue-html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Non è A/B/C
</div>
```

Simile a `v-else`, un elemento `v-else-if` deve seguire immediatamente un elemento `v-if` o un elemento `v-else-if`.

## `v-if` con `<template>` {#v-if-on-template}

Dato che `v-if` è una direttiva, deve essere collegato a un singolo elemento. Ma cosa succede se vogliamo mostrare o nascondere più di un elemento? In questo caso possiamo utilizzare `v-if` su un elemento `<template>`, che funge da contenitore invisibile. Il risultato finale renderizzato non includerà l'elemento `<template>`.

```vue-html
<template v-if="ok">
  <h1>Titolo</h1>
  <p>Paragrafo 1</p>
  <p>Paragrafo 2</p>
</template>
```

anche `v-else` e `v-else-if` possono essere usati con il tag `<template>`.

## `v-show` {#v-show}

Un'altra opzione per visualizzare in maniera condizionale un elemento è la direttiva `v-show.` L'utilizzo è in gran parte lo stesso:

```vue-html
<h1 v-show="ok">Ciao!</h1>
```

La differenza è che un elemento con `v-show` sarà sempre renderizzato e rimarrà nel DOM; `v-show` alterna solamente la proprietà CSS `display` dell'elemento.

`v-show` non supporta l'elemento `<template>`, né funziona con `v-else`.

## `v-if` vs. `v-show` {#v-if-vs-v-show}

`v-if` è a tutti gli effetti un rendering condizionale "reale" in quanto garantisce che i listener di eventi e i componenti discendenti (child components) all'interno del blocco condizionale vengano correttamente distrutti e ricreati durante gli switch.

`v-if` è anche **lazy**: se, al rendering iniziale, la condizione è falsa, non farà nulla: il blocco condizionale non verrà renderizzato finché la condizione non diventa vera per la prima volta.

`v-show`, in confronto, è molto più semplice: l'elemento viene sempre renderizzato indipendentemente dalla condizione iniziale, con un'alternanza basata su CSS.

In generale, `v-if` ha costi di attivazione più elevati, mentre `v-show` ha costi di rendering iniziali più elevati. Quindi scegli `v-show` se hai bisogno di mostrare/nascondere qualcosa molto spesso, e scegli `v-if` se è improbabile che la condizione cambi durante l'esecuzione.

## `v-if` con `v-for` {#v-if-with-v-for}

::: warning Nota
**Non** è consigliato utilizzare `v-if` e `v-for` sullo stesso elemento a causa della precedenza implicita. Per i dettagli fare riferimento alla [guida di stile](/style-guide/rules-essential#avoid-v-if-with-v-for).
:::

Quando `v-if` e `v-for` vengono utilizzati sullo stesso elemento, `v-if` verrà valutato per primo. Consulta la [guida al Rendering delle Liste](list#v-for-with-v-if) per i dettagli.
