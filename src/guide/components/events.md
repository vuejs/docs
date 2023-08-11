<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

// La documentazione per v-model faceva parte di questa pagina in passato. Si sta cercando di reindirizzare i link obsoleti.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>
# Eventi dei componenti {#component-events}

> Si assume che tu abbia già letto le [Basi dei componenti](/guide/essentials/component-basics). Leggi prima quello se sei nuovo al concetto di componente.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="Lezione gratuita su Vue.js sulla definizione di eventi personalizzati"/>
</div>

## Emettere ed ascoltare eventi {#emitting-and-listening-to-events}

Un componente può emettere eventi personalizzati direttamente nelle espressioni del template (ad esempio, in un listener `v-on`) utilizzando il metodo integrato `$emit`:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">cliccami</button>
```

<div class="options-api">

Il metodo `$emit()` è disponibile anche sull'istanza del componente come `this.$emit()`:

```js
export default {
  methods: {
    submit() {
      this.$emit('nomeEvento')
    }
  }
}
```

</div>

Il genitore può poi ascoltarlo utilizzando `v-on`:

```vue-html
<MyComponent @nome-evento="callback" />
```

Anche il modificatore `.once` è supportato sui listener degli eventi del componente:

```vue-html
<MyComponent @nome-evento.once="callback" />
```

Come i componenti e le props, i nomi degli eventi forniscono una trasformazione automatica delle maiuscole e minuscole. Nota che abbiamo emesso un evento in stile camelCase, ma possiamo ascoltarlo usando un listener in stile kebab-case nel genitore. Come per [la gestione delle maiuscole delle props](/guide/components/props#prop-name-casing), consigliamo di utilizzare listener degli eventi in stile kebab-case nei template.

:::tip
A differenza degli eventi nativi del DOM, gli eventi emessi dai componenti **non** si propagano. Puoi ascoltare solo gli eventi emessi da un componente figlio diretto. Se c'è la necessità di comunicare tra componenti fratelli o profondamente nidificati, utilizza un event bus esterno o una [soluzione di gestione dello stato globale](/guide/scaling-up/state-management).
:::

## Argomenti degli Eventi {#event-arguments}

A volte è utile emettere un valore specifico con un evento. Ad esempio, potremmo voler far sì che il componente `<BlogPost>` sia responsabile di quanto ingrandire il testo. In questi casi, possiamo passare argomenti aggiuntivi a `$emit` per fornire questo valore:

```vue-html
<button @click="$emit('increaseBy', 1)">
  Aumenta di 1
</button>
```

Quindi, quando ascoltiamo l'evento nel genitore, possiamo utilizzare una arrow function come listener, che ci consente di accedere all'argomento dell'evento:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

Oppure, se l'handler dell'evento è un metodo:

```vue-html
<MyButton @increase-by="increaseCount" />
```

Allora il valore sarà passato come primo parametro di quel metodo:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip
Tutti gli argomenti aggiuntivi passati a `$emit()` dopo il nome dell'evento verranno inoltrati al listener. Ad esempio, con `$emit('foo', 1, 2, 3)` la funzione del listener riceverà tre argomenti.
:::

## Dichiarare eventi emessi  {#declaring-emitted-events}

Un componente può dichiarare esplicitamente gli eventi che emetterà utilizzando la <span class="composition-api">macro[`defineEmits()`](/api/sfc-script-setup#defineprops-defineemits) </span> <span class="options-api">opzione [`emits`](/api/options-state#emits)</span>:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

Il metodo `$emit` che abbiamo utilizzato nel `<template>` non è accessibile nella sezione `<script setup>` di un componente, ma `defineEmits()` restituisce una funzione equivalente che possiamo utilizzare al suo posto:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

La macro `defineEmits()` **non può** essere utilizzata all'interno di una funzione, ma deve essere inserita direttamente all'interno di `<script setup>`, come nell'esempio sopra.

Se stai utilizzando la funzione `setup` esplicita invece di `<script setup>`, gli eventi dovrebbero essere dichiarati utilizzando l'opzione [`emits`](/api/options-state#emits), e la funzione `emit` è esposta nel contesto `setup()`:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

Come con altre proprietà del contesto `setup()`, `emit` può essere tranquillamente destrutturato:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

L'opzione `emits` supporta anche una sintassi ad oggetto, che ci consente di eseguire la convalida a runtime del payload degli eventi emessi:

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  submit(payload) {
    // restituisci `true` o `false` per indicare
    // il superamento / fallimento della convalida
  }
})
</script>
```

Se stai utilizzando TypeScript con `<script setup>`, è anche possibile dichiarare eventi emessi utilizzando solo annotazioni di tipo:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

Più dettagli: [Tipizzare gli emits dei componenti](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload) {
      // restituisci `true` o `false` per indicare
      // il superamento / fallimento della convalida
    }
  }
}
```

Guarda anche: [Tipizzare gli emits dei componenti](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

</div>

Anche se opzionali, è consigliabile definire tutti gli eventi emessi per documentare meglio come dovrebbe funzionare un componente. Inoltre, consente a Vue di escludere gli ascoltatori noti dagli [attributi fallthrough](/guide/components/attrs#v-on-listener-inheritance), evitando casi limite causati dagli eventi del DOM inviati manualmente da codice di terze parti.

:::tip
Se un evento nativo (ad esempio, `click`) è definito nell'opzione `emits` l'ascoltatore ascolterà solo gli eventi `click` emessi dal componente e non risponderà più agli eventi `click` nativi.
:::

## Convalida degli eventi {#events-validation}

Analogamente alla convalida del tipo di prop, un evento emesso può essere convalidato se è definito con la sintassi dell'oggetto anziché con la sintassi dell'array.

Per aggiungere la convalida, all'evento viene assegnata una funzione che riceve gli argomenti passati alla chiamata di <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> e restituisce un valore booleano per indicare se l'evento è valido o meno.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // Nessuna validazione
  click: null,

  // Validazione sull'evento submit
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // Nessuna validazione
    click: null,

    // Validazione sull'evento submit
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>
