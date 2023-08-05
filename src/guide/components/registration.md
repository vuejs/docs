# Registrare un componente {#component-registration}

> Si assume che tu abbia già letto le [Basi dei componenti](/guide/essentials/component-basics). Leggi prima quello se sei nuovo al concetto di componente.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="Free Vue.js Component Registration Lesson"/>

Un componente Vue deve essere "registrato" affinché Vue sappia dove trovare la sua implementazione quando viene incontrato in un template. Ci sono due modi per registrare i componenti: globale e locale.

## Registrazione Globale {#registrazione-globale}

Possiamo rendere i componenti disponibili globalmente nell'attuale applicazione Vue utilizzando il metodo app.component():

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // il nome registrato
  'MyComponent',
  // l'implementazione
  {
    /* ... */
  }
)
```

Se si utilizzano i file SFC, si registreranno i file `.vue` importati:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

Il metodo `app.component()` può essere concatenato:

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

I componenti registrati globalmente possono essere utilizzati nel template di qualsiasi componente all'interno di questa applicazione:

```vue-html
<!-- questo funzionerà con qualsiasi componente registrato -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

Questo si applica anche a tutti i sotto-componenti, il che significa che tutti e tre questi componenti saranno disponibili _all'interno l'uno dell'altro_.

## Registrazione locale {#local-registration}

Sebbene sia conveniente, la registrazione globale ha alcuni svantaggi:

1. La registrazione globale impedisce ai compilatori di eliminare componenti non utilizzati. Se registri un componente a livello globale ma poi non lo utilizzi in nessuna parte della tua applicazione, esso verrà comunque incluso nel bundle finale.

2. La registrazione globale rende le relazioni di dipendenza meno esplicite nelle applicazioni di grandi dimensioni. Diventa difficile individuare l'implementazione di un componente figlio a partire da un componente genitore che lo utilizza. Questo può influire sulla manutenibilità a lungo termine, simile all'utilizzo eccessivo di variabili globali.

La registrazione locale delimita la disponibilità dei componenti registrati solo al componente corrente. Ciò rende la relazione di dipendenza più esplicita ed è più amichevole per il tree-shaking.

<div class="composition-api">

Quando si utilizzano i SFC con `<script setup>`, i componenti importati possono essere utilizzati localmente senza registrazione:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

Senza lo `<script setup>`, dovresti usare la sezione `components`:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

La registrazione locale viene effettuata nella sezione `components`:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

Per ogni proprietà nell'oggetto `components`, la chiave sarà il nome registrato del componente, mentre il valore conterrà l'implementazione del componente. L'esempio sopra sta utilizzando la scorciatoia della proprietà ES2015 ed è equivalente a:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

Nota che **i componenti registrati localmente _non sono disponibili_ anche nei componenti discendenti**. In questo caso, `ComponentA` sarà disponibile solo per il componente corrente, non per nessuno dei suoi componenti figli o discendenti.

## Maiuscole e minuscole nel nome del componente {#component-name-casing}

In tutta la guida, stiamo utilizzando nomi in PascalCase durante la registrazione dei componenti. Ciò è dovuto al seguente motivo:

1. I nomi in PascalCase sono identificatori JavaScript validi. Ciò semplifica l'importazione e la registrazione dei componenti in JavaScript. Inoltre, aiuta gli IDE con la funzionalità di auto-completamento.

2. L'utilizzo di `<PascalCase />` rende più evidente che si tratta di un componente Vue e non di un elemento HTML nativo nei template. Inoltre, differenzia i componenti Vue dagli elementi personalizzati (web components).

Questo è lo stile raccomandato quando si lavora con SFC o stringhe di template. Tuttavia, come discusso in [DOM Template Parsing Caveats](/guide/essentials/component-basics#dom-template-parsing-caveats), i tag PascalCase non sono utilizzabili nei DOM templates.

Fortunatamente, Vue supporta la risoluzione dei tag in kebab-case per i componenti registrati utilizzando PascalCase. Ciò significa che un componente registrato come `MyComponent` può essere referenziato nel template sia tramite `<MyComponent>` che `<my-component>`. Ciò ci consente di utilizzare lo stesso codice di registrazione del componente JavaScript indipendentemente dalla fonte del template.
