# TypeScript con Options API {#typescript-with-options-api}

> Si presume che tu abbia già letto [Usare Vue con TypeScript](./overview).

:::tip
Anche se Vue supporta l'uso di TypeScript con Options API, è consigliato utilizzare Vue con TypeScript tramite Composition API poiché offre un'inferenza dei tipi più semplice, efficiente e robusta.
:::

## Tipizzare le props dei componenti {#typing-component-props}

Ottenere dei tipi per le props nell'Options API richiede di avvolgere il componente con `defineComponent()`. In questo modo, Vue è in grado di ottenere i tipi per le props in base all'opzione  `props`, tenendo conto di altre opzioni come `required: true` e `default`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference abilitato
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // tipo: string | undefined
    this.id // tipo: number | string | undefined
    this.msg // tipo: string
    this.metadata // tipo: any
  }
})
```

Tuttavia, le opzioni di `props` al runtime supportano solo l'uso di funzioni costruttori come tipo di prop - non c'è modo di specificare tipi complessi come oggetti con proprietà nidificate o chiamate di funzione.

Per annotare tipi di prop complessi, possiamo utilizzare il tipo di utilità `PropType`:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      // fornia,o un tipo più specifico per l'oggetto
      type: Object as PropType<Book>,
      required: true
    },
    // funzioni
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // stringa
    this.book.year // numero

    // TS Error: argument of type 'string' is not
    // assignable to parameter of type 'number'
    this.callback?.('123')
  }
})
```

### Caveats {#caveats}

Se la versione di TypeScript è inferiore a `4.7`, bisogna fare attenzione quando si utilizzano funzioni per le opzioni `validator` e `default` delle props - assicurarsi di utilizzare le arrow functions:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // Assicurati di utilizzare le arrow functions se TypeScript  ha una versione minore della 4.7
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

Questa pratica impedisce a TypeScript di dover inferire il tipo `this` all'interno di queste funzioni, che, sfortunatamente, può causare un fallimento nell'inferenza del tipo. Era un [limite di design](https://github.com/microsoft/TypeScript/issues/38845), ed è stato migliorato in [TypeScript 4.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#improved-function-inference-in-objects-and-methods).

## Tipizzare gli emits dei componenti{#typing-component-emits}

Possiamo dichiarare il tipo di payload previsto per un evento emesso utilizzando la sintassi oggetto dell'opzione `emits`. Inoltre, tutti gli eventi emessi non dichiarati genereranno un errore di tipo quando vengono chiamati.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // esegue la runtime validation
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // Type error!
      })

      this.$emit('non-declared-event') // Type error!
    }
  }
})
```

## Tipizzare le Computed Properties {#typing-computed-properties}

Una computed property ottiene il suo tipo basandosi sul suo valore di ritorno:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // type: string
  }
})
```

In alcuni casi, potresti voler annotare esplicitamente il tipo di una computed property per garantire che la sua implementazione sia corretta:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // mostra esplicitamente il tipo di return
    greeting(): string {
      return this.message + '!'
    },

    // annotating a writable computed property
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

Le annotazioni esplicite possono essere necessarie in alcuni casi limite in cui TypeScript non riesce a inferire il tipo di una proprietà calcolata a causa di cicli di inferenza circolare.

## Tipizzazione degli Event Handlers {#typing-event-handlers}

Quando si gestiscono eventi nativi del DOM, può essere utile specificare correttamente il tipo dell'argomento passato all'handler. Vediamo un esempio:

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // `event` ha in modo implicito il tipo `any`
      console.log(event.target.value)
    }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

Senza annotazione di tipo, l'argomento `event` avrà implicitamente un tipo `any`. Ciò causerà anche un errore di TS se `"strict": true` o `"noImplicitAny": true` sono impostati nel file `tsconfig.json`. È quindi consigliabile annotare esplicitamente l'argomento degli event handlers. Inoltre, potrebbe essere necessario utilizzare le asserzioni di tipo quando si accedono alle proprietà di `event`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event: Event) {
      console.log((event.target as HTMLInputElement).value)
    }
  }
})
```

## Augmenting Global Properties {#augmenting-global-properties}

Alcuni plugin installano proprietà disponibili globalmente su tutte le istanze del componente tramite [`app.config.globalProperties`](/api/application#app-config-globalproperties). Ad esempio, potremmo installare `this.$http` per il recupero dei dati o `this.$translate` per l'internazionalizzazione. Per rendere ciò compatibile con TypeScript, Vue espone un'interfaccia `ComponentCustomProperties` progettata per essere estesa tramite [TypeScript module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation):

```ts
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

Guarda anche:

- [TypeScript unit tests for component type extensions](https://github.com/vuejs/core/blob/main/packages/dts-test/componentTypeExtensions.test-d.tsx)

### Posizione dell'aumento di tipo {#type-augmentation-placement}

È possibile inserire questa estensione di tipo in un file `.ts`, o in un file `*.d.ts` a livello di progetto. In entrambi i casi, assicurarsi che sia incluso in `tsconfig.json`. Per gli autori di librerie / plugin, questo file dovrebbe essere specificato nella proprietà `types` in `package.json`.

Per poter sfruttare l'estensione di modulo, è necessario assicurarsi che l'aumento sia posizionato in un [modulo TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html). Questo per dire, il file deve contenere almeno un'istruzione `import` o `export` al livello superiore, anche se è solo `export {}`. Se l'aumento è posizionato al di fuori di un modulo, sovrascriverà i tipi originali invece di estenderli!

```ts
// Non funge, sovrascrive i tipi originali
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

```ts
// Funziona correttamente
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

## Augmenting Custom Options {#augmenting-custom-options}

Alcuni plugin, come `vue-router`, forniscono il supporto per opzioni personalizzate per i componenti, come ad esempio `beforeRouteEnter`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // ...
  }
})
```


Senza un'estensione di tipo adeguata, gli argomenti di questo hook avranno implicitamente il tipo `any`. Possiamo estendere l'interfaccia `ComponentCustomOptions` per supportare queste opzioni personalizzate:

```ts
import { Route } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomOptions {
    beforeRouteEnter?(to: Route, from: Route, next: () => void): void
  }
}
```

Ora l'opzione `beforeRouteEnter` avrà il tipo corretto. Nota che questo è solo un esempio: librerie ben tipizzate come `vue-router` dovrebbero automaticamente eseguire queste estensioni nelle proprie definizioni di tipo.

La posizione di questa estensione è soggetta alle [stesse restrizioni](#type-augmentation-placement) delle estensioni di proprietà globali.

Guarda anche:

- [TypeScript unit tests for component type extensions](https://github.com/vuejs/core/blob/main/packages/dts-test/componentTypeExtensions.test-d.tsx)
