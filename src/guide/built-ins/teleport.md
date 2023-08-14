# Teleport {#teleport}

 <VueSchoolLink href="https://vueschool.io/lessons/vue-3-teleport" title="Lezione gratuita sul Teleport in Vue.js"/>

`<Teleport>` è un componente nativo che ci permette di "teletrasportare" una parte del template di un componente in un nodo DOM che esiste al di fuori della gerarchia DOM di quel componente.

## Utilizzo Base {#basic-usage}

A volte possiamo imbatterci nel seguente scenario: una parte del template di un componente appartiene logicamente ad esso, ma, da un punto di vista visuale, dovrebbe essere visualizzata altrove nel DOM, anche al di fuori dell'applicazione Vue.

L'esempio più comune di ciò si verifica quando si costruisce una modale a schermo intero. Idealmente vogliamo che il pulsante della modale e la modale stessa risiedano all'interno dello stesso componente, poiché sono entrambi correlati allo stato di apertura/chiusura della modale. Ma ciò significa che la modale verrà resa allo stesso livello del pulsante, profondamente annidata nella gerarchia del DOM dell'applicazione. Questo può creare alcuni problemi / complicazioni quando si va a stilizzare la modale tramite CSS.

Considera la seguente struttura HTML.

```vue-html
<div class="outer">
  <h3>Esempio di Vue Teleport</h3>
  <div>
    <MyModal />
  </div>
</div>
```

E qui c'è l'implementazione di `<MyModal>`:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Apri modale</button>

  <div v-if="open" class="modal">
    <p>Ciao dalla Modale!</p>
    <button @click="open = false">Chiudi</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<template>
  <button @click="open = true">Apri modale</button>

  <div v-if="open" class="modal">
    <p>Ciao dalla Modale!</p>
    <button @click="open = false">Chiudi</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>

Il componente contiene un `<button>` per attivare l'apertura della modale, un `<div>` con una classe `.modal`, che conterrà il contenuto della modale, e un pulsante per chiuderla autonomamente.

Quando si utilizza questo componente all'interno della struttura HTML iniziale, ci sono una serie di problemi potenziali:

- `position: fixed` posiziona l'elemento rispetto al viewport solo quando nessun elemento antenato ha le proprietà `transform`, `perspective` o `filter` impostate. Se, ad esempio, intendiamo animare l'antenato `<div class="outer">` con una CSS transform, ciò romperebbe il layout della modale!

- Lo `z-index` della modale è limitato dai suoi elementi contenitori. Se c'è un altro elemento che si sovrappone a `<div class="outer">` e ha un `z-index` maggiore, andrebbe a coprire la nostra modale.

`<Teleport>` fornisce un modo pulito per aggirare questi problemi, permettendoci di uscire dalla struttura DOM annidata. Modifichiamo `<MyModal>` per utilizzare `<Teleport>`:

```vue-html{3,8}
<button @click="open = true">Apri modale</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Ciao dalla Modale!</p>
    <button @click="open = false">Chiudi</button>
  </div>
</Teleport>
```

Il target `to` di `<Teleport>` si aspetta una stringa di selettori CSS o un nodo DOM già presente. Qui, stiamo sostanzialmente dicendo a Vue di "**teletrasportare** questo frammento di template **al** tag **`body`**".

Puoi fare clic sul pulsante qui sotto e ispezionare il tag `<body>` tramite i devtools del tuo browser:

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo">
  <button @click="open = true">Apri modale</button>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="open" class="demo modal-demo">
        <p style="margin-bottom:20px">Ciao dalla Modale!</p>
        <button @click="open = false">Chiudi</button>
      </div>
    </Teleport>
  </ClientOnly>
</div>

<style>
.modal-demo {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: var(--vt-c-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>

Puoi combinare `<Teleport>` con [`<Transition>`](./transition) per creare modali animate - vedi [Esempio qui](/examples/#modal).

:::tip
Il target `to` di teleport deve essere già presente nel DOM quando il componente `<Teleport>` viene montato. Idealmente, questo dovrebbe essere un elemento al di fuori dell'intera applicazione Vue. Se stai puntando a un altro elemento renderizzato da Vue, devi assicurarti che quell'elemento sia montato prima del `<Teleport>`.
:::

## Utilizzo con Componenti  {#using-with-components}

`<Teleport>` modifica solo la struttura DOM renderizzata - non influisce sulla gerarchia logica dei componenti. Vale a dire, se `<Teleport>` contiene un componente, quel componente rimarrà un figlio logico del componente genitore che contiene il `<Teleport>`. Il passaggio delle props e l'emissione degli eventi continueranno a funzionare allo stesso modo.

Questo significa anche che le "injections" da un componente genitore funzionano come previsto, e che il componente figlio sarà annidato sotto il componente genitore negli strumenti di sviluppo Vue, invece di essere collocato dove il contenuto effettivo è stato spostato.

## Disabilitare Teleport {#disabling-teleport}

In alcuni casi potremmo voler disabilitare `<Teleport>` in maniera condizionale. Ad esempio, potremmo voler renderizzare un componente come un overlay per il desktop, ma in linea sul mobile. `<Teleport>` supporta la prop `disabled`, che può essere attivata dinamicamente:

```vue-html
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

Dove lo stato `isMobile` può essere aggiornato dinamicamente rilevando le modifiche delle media query.

## Teleport Multipli sullo Stesso Target {#multiple-teleports-on-the-same-target}

Un caso d'uso comune potrebbe essere un componente `<Modal>` riutilizzabile, con la possibilità che più istanze siano attive contemporaneamente. Per questo tipo di scenario, più componenti `<Teleport>` possono montare il loro contenuto sullo stesso elemento target. L'ordine sarà quello di un semplice append - le aggiunte successive saranno posizionate dopo quelle precedenti all'interno dell'elemento target.

Dato il seguente utilizzo:

```vue-html
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

Il risultato renderizzato sarebbe:

```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

---

**Correlati**

- [Referenza API  `<Teleport>`](/api/built-in-components#teleport)
- [Gestire i Teleport in SSR](/guide/scaling-up/ssr#teleports)
