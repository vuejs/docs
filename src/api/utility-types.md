# Types delle Utility.{#utility-types}

:::info
Questa pagina elenca solo alcuni tipi di utilità comunemente utilizzati che potrebbero necessitare di spiegazioni per il loro utilizzo. Per una lista completa dei tipi esportati, consulta il [codice sorgente](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131).
:::

## PropType\<T> {#proptype-t}

Viene utilizzato per annotare una prop con tipi più avanzati quando si utilizzano dichiarazioni di prop runtime.

- **Esempio**

  ```ts
  import type { PropType } from 'vue'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // fornisce un type più specifico rispetto a `Object`
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **Guarda anche** [Guida - Tipizzare le Props dei Componenti](/guide/typescript/options-api#typing-component-props)

## MaybeRef\<T> {#mayberef}

Alias per `T | Ref<T>`. Utile per annotare gli argomenti dei [Composables](/guide/reusability/composables.html).

- Supportato solo dalla versione 3.3+.

## MaybeRefOrGetter\<T> {#maybereforgetter}

Alias per `T | Ref<T> | (() => T)`. Utile per annotare gli argomenti dei [Composables](/guide/reusability/composables.html).

- Supportato solo dalla versione 3.3+.

## ExtractPropTypes\<T> {#extractproptypes}

Estrae i type delle prop dall'oggetto delle opzioni delle prop a runtime. I tipi estratti sono interni - ovvero le props risolte ricevute dal componente. Ciò significa che le props booleane e le props con valori predefiniti sono sempre definite, anche se non sono richieste.

Per estrarre le props esterne, ovvero le props che il componente genitore è autorizzato a passare, utilizza [`ExtractPublicPropTypes`](#extractpublicproptypes).

- **Esempio**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar: boolean,
  //   baz: number,
  //   qux: number
  // }
  ```

## ExtractPublicPropTypes\<T> {#extractpublicproptypes}

Estrae i type delle prop dall'oggetto delle opzioni delle prop a runtime. I tipi estratti sono rivolti all'esterno - ovvero le props che il componente genitore è autorizzato a passare.

- **Esempio**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPublicPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar?: boolean,
  //   baz: number,
  //   qux?: number
  // }
  ```

## ComponentCustomProperties {#componentcustomproperties}

Viene utilizzato per estendere il type dell'istanza del componente al fine di supportare proprietà globali personalizzate.

- **Esempio**

  ```ts
  import axios from 'axios'

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip
  Le estensioni devono essere inserite in un file di modulo `.ts` o `.d.ts`. Per ulteriori dettagli, consulta [Posizionamento delle Estensioni dei Type](/guide/typescript/options-api#augmenting-global-properties).
  :::

- **Guarda anche** [Guide - Augmenting Global Properties](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

Viene utilizzata per estendere il type delle opzioni del componente al fine di supportare opzioni personalizzate.

- **Esempio**

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip
  Le estensioni devono essere inserite in un file di modulo `.ts` o `.d.ts`. Per ulteriori dettagli, consulta [Posizionamento delle Estensioni dei Type](/guide/typescript/options-api#augmenting-global-properties).
  :::

- **Guarda anche** [Guide - Augmenting Custom Options](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

Viene utilizzata per estendere le proprietà consentite TSX al fine di utilizzare proprietà non dichiarate negli elementi TSX.

- **Esempio**

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // ora funziona anche se hello è una prop NON dichiarata
  <MyComponent hello="world" />
  ```

  :::tip
  Le estensioni devono essere inserite in un file di modulo `.ts` o `.d.ts`. Per ulteriori dettagli, consulta [Posizionamento delle Estensioni dei Type](/guide/typescript/options-api#augmenting-global-properties).
  :::

## CSSProperties {#cssproperties}

Viene utilizzata per estendere i valori consentiti nei binding delle proprietà di stile.

- **Esempio**

  Permette qualsiasi proprietà CSS personalizzata.

  ```ts
  declare module 'vue' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```

  ```html
  <div :style="{ '--bg-color': 'blue' }"></div>
  ```

:::tip
  Le estensioni devono essere inserite in un file di modulo `.ts` o `.d.ts`. Per ulteriori dettagli, consulta [Posizionamento delle Estensioni dei Type](/guide/typescript/options-api#augmenting-global-properties).
  :::

:::info Vedi anche
I tag `<style>` dei SFC supportano il collegamento dei valori CSS allo stato dinamico del componente utilizzando la funzione CSS `v-bind`. Questo consente di utilizzare proprietà personalizzate senza estendere i type.

- [v-bind() in CSS](/api/sfc-css-features#v-bind-in-css)
  :::
