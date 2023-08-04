# TypeScript con il Composition API {#typescript-with-composition-api}

> Si presume che tu abbia già letto [Usare Vue con TypeScript](./overview).

## Tipizzare le props dei componenti {#typing-component-props}

### Usando `<script setup>` {#using-script-setup}

Quando usiamo `<script setup>`, il `defineProps()`  permette di ottenere i tipi delle props basandosi sul suo argomento:

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // stringa
props.bar // numero | undefined
</script>
```


Questo viene chiamato "dichiarazione runtime", perché l'argomento passato a `defineProps()` verrà utilizzato come elemento `props` al runtime.

Tuttavia, è generalmente più semplice definire le props con tipi puri tramite un argomento di tipo generico:

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

Questa è chiamata "dichiarazione basata sui tipi". Il compilatore farà del suo meglio per ottenere le opzioni di runtime equivalenti in base all'argomento di tipo. In questo caso, il nostro secondo esempio compila nelle stesse opzioni di runtime esatte del primo.

Puoi utilizzare sia la dichiarazione basata sui tipi che la dichiarazione al runtime, ma non puoi usarle entrambe contemporaneamente.

Possiamo anche spostare i tipi delle props in un'interfaccia separata:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

#### Limiti della sintassi {#syntax-limitations}

Nella versione 3.2 e precedenti, il parametro di tipo generico per `defineProps()` era limitato a un tipo letterale o a un riferimento a un'interfaccia locale.

Questo limite è stato risolto nella versione 3.3. L'ultima versione di Vue supporta il riferimento a tipi importati e un insieme limitato di tipi complessi. Tuttavia, poiché la conversione del tipo in runtime è ancora basata sull'AST (Abstract Syntax Tree), alcuni tipi complessi che richiedono un'effettiva analisi dei tipi, come i tipi condizionali, non sono supportati. Puoi utilizzarli per il tipo di una singola prop, non per l'oggetto props.

### Valori default delle props {#props-default-values}

Quando si utilizza la dichiarazione basata sui tipi, perdiamo la possibilità di dichiarare valori di default per le props. Questo può essere risolto utilizzando la macro del compilatore `withDefaults`:

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

Questo verrà compilato con opzioni di runtime `default` equivalenti per le props. Inoltre, l'helper `withDefaults` fornisce controlli di tipo per i valori di default e garantisce che il tipo restituito di `props` abbia i flag opzionali rimossi per le proprietà che hanno valori di default dichiarati.

### Senza `<script setup>` {#without-script-setup}

Se non stai usando `<script setup>`, è necessario che usi `defineComponent()` per permettere l'iniezione del tipo nelle props.  Il tipo dell'oggetto props passato a `setup()` viene iniettato dall'opzione `props`.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- type: stringa
  }
})
```

### Tipi complessi per le props {#complex-prop-types}

Con la dichiarazione basata sui tipi, una prop può utilizzare anche un tipo complesso:

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
}>()
</script>
```

Per la dichiarazione al runtime, possiamo utilizzare il tipo `PropType`:

```ts
import type { PropType } from 'vue'

const props = defineProps({
  book: Object as PropType<Book>
})
```

Funziona allo stesso modo come se specificassimo le `props` direttamente:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    book: Object as PropType<Book>
  }
})
```

L'alternativa `props` è usata più frequentemente con l'Options API, per tanto troverai esempi più dettagliati nella guida a  [TypeScript con l'Options API](/guide/typescript/options-api#typing-component-props). Le techniche mostrate in quell'esempio funzionano anche si applicano anche alle dichiarazioni runtime utilizzando `defineProps()`.

## Tipizzare gli emits dei componenti {#typing-component-emits}

Con lo `<script setup>`, la funzione `emit`  può essere tipizzata usando la dichiarazione runtime O la dichiarazione del tipo:

```vue
<script setup lang="ts">
// runtime
const emit = defineEmits(['change', 'update'])

// dichiarazione del tipo
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternativa, sintassi più succinta
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

Il tipo dell'argomento può essere:

1. Un tipo di funzione invocabile, ma scritto come un tipo letterale con [Call Signatures](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures). Verrà utilizzato come tipo della funzione `emit` restituita.
2. Un letterale di tipo in cui le chiavi sono i nomi degli eventi e i valori sono tipi di array / tuple che rappresentano i parametri aggiuntivi accettati per l'evento. L'esempio sopra utilizza tuple nominati in modo che ogni argomento possa avere un nome esplicito.

Come possiamo vedere, la dichiarazione del tipo ci offre un controllo molto più dettagliato sulle restrizioni di tipo degli eventi emessi.

Quando non usiamo `<script setup>`, `defineComponent()`  è in grado di ottenere gli eventi consentiti per la funzione `emit` esposta nel contesto di setup:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- type check / auto-completion
  }
})
```

## Tipizzare `ref()` {#typing-ref}

Le refs iniettano il tipo dal valore iniziale:

```ts
import { ref } from 'vue'

// tipo ottenuto: Ref<number>
const year = ref(2020)

// => Errore TS: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

A volte potremmo aver bisogno di specificare tipi complessi per il valore interno di un ref. Possiamo farlo utilizzando il tipo `Ref`:

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

Oppure, passando un argomento generico quando chiami `ref()`:

```ts
// risultato : Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

Se specifici un argomento di tipo generico ma ometti il valore iniziale, il tipo risultante sarà un tipo unione che include `undefined`:

```ts
// tipo ottenuto: Ref<number | undefined>
const n = ref<number>()
```

## Tipizzare `reactive()` {#typing-reactive}

`reactive()` anche ottiene implicitamente il tipo dal suo argomento:

```ts
import { reactive } from 'vue'

// tipo ottenuto: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

Per dichiarare esplicitamente una proprietà `reactive`, usiamo le interfacce:

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

:::tip
Non è consigliabile utilizzare l'argomento generico di `reactive()` perché il tipo restituito, che gestisce il rilevamento dei ref nidificati, è diverso dal tipo dell'argomento generico.
:::

## Tipizzare le `computed()` {#typing-computed}

`computed()` ottiene  il suo tipo basandosi sul valore di ritorno del getter.:

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// tipo ottenuto: ComputedRef<number>
const double = computed(() => count.value * 2)

// => Errore TS: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

Puoi anche specificare un tipo esplicito tramite un argomento generico:

```ts
const double = computed<number>(() => {
  // Errore di tipizzazione in caso non ritorni un numero
})
```

## Tipizzare gli Event Handlers {#typing-event-handlers}

Quando si gestiscono eventi DOM nativi, potrebbe essere utile tipizzare correttamente l'argomento che passiamo all'handler. Dai un'occhiata a questo esempio:

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` ha il tipo `any` implicito
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

Senza annotazione di tipo, l'argomento `event` avrà implicitamente un tipo `any`. Questo causerà un errore di tipo in TypeScript se `"strict": true` o `"noImplicitAny": true` sono impostati nel file `tsconfig.json`. È quindi consigliabile annotare esplicitamente l'argomento degli handler degli eventi. Inoltre, potresti dover utilizzare le type assertions quando accedi alle proprietà di `event`:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## Tipizzare Provide / Inject {#typing-provide-inject}

Provide e inject vengono generalmente utilizzati in componenti separati. Per tipizzare correttamente i valori iniettati, Vue fornisce un'interfaccia  `InjectionKey`, che è un tipo generico che estende `Symbol`. Può essere utilizzato per sincronizzare il tipo del valore iniettato tra il provider e il consumer:

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // usare un valore non-string farà cadere in errore

const foo = inject(key) // tipo di foo: string | undefined
```

È consigliabile inserire l'injection key in un file separato in modo che possa essere importato in più componenti.

Quando si utilizzano injection keys di tipo stringa, il tipo del valore iniettato sarà  `unknown`, e dovrà essere dichiarato esplicitamente mediante un argomento di tipo generico:

```ts
const foo = inject<string>('foo') // tipo: string | undefined
```

Nota che il valore iniettato può ancora essere `undefined`,  perché non c'è alcuna garanzia che un provider fornirà questo valore durante l'esecuzione.

Il tipo `undefined` può essere rimosso fornendo un valore predefinito:

```ts
const foo = inject<string>('foo', 'bar') // tipo: string
```

Se sei sicuro che il valore venga sempre fornito, puoi anche forzare il cast del valore:

```ts
const foo = inject('foo') as string
```

## Tipizzare i Template Refs {#typing-template-refs}

I template refs dovrebbero essere creati con un argomento di tipo generico esplicito e un valore iniziale d `null`:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

Nota che per garantire una sicurezza di tipo rigorosa, è necessario utilizzare l'optional chaining o i type guards quando si accede a `el.value`. Questo perché il valore iniziale del riferimento è `null` fino a quando il componente non viene montato, e può anche essere impostato a `null` se l'elemento referenziato viene smontato da un `v-if`.

## Tipizzare i Template Refs dei componenti {#typing-component-template-refs}

A volte potresti dover annotare un riferimento al template per un componente figlio al fine di chiamare il suo metodo. Qui, abbiamo un componente figlio `MyModal` con un metodo che apre il modal:

```vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
```

Per ottenere il tipo dell'istanza di `MyModal`, è necessario prima ottenere il suo tipo tramite `typeof`, e quindi utilizzare `InstanceType` per estrarre il suo tipo di istanza:

```vue{5}
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```

Nota che se vuoi utilizzare questa tecnica nei file TypeScript invece che nei file Vue SFC, devi abilitare la modalità di Volar [Takeover](./overview#volar-takeover-mode).

Nei casi in cui il tipo esatto del componente non è disponibile o non è importante, è possibile utilizzare `ComponentPublicInstance`. Questo includerà solo le proprietà condivise da tutti i componenti, come ad esempio `$el`:

```ts
import { ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const child = ref<ComponentPublicInstance | null>(null)
```
