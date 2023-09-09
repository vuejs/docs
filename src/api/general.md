# API Globali: Generale {#global-api-general}

## version {#version}

Espone la versione corrente di Vue.

- **Type:** `string`

- **Esempio**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

Una utility per attendere il successivo aggiornamento del DOM.

- **Tipo**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **Dettagli**

  Quando modifichi uno stato reattivo in Vue, gli aggiornamenti del DOM che ne risultano non vengono applicati istantaneamente. Vue, invece, li mette in un buffer fino al "next tick" per garantire che ogni componente venga aggiornato solo una volta, indipendentemente da quante modifiche allo stato hai effettuato.

  `nextTick()` può essere utilizzato immediatamente dopo una modifica dello stato per attendere che gli aggiornamenti del DOM siano completati. Puoi sia passare una callback come argomento, sia utilizzare await sulla Promise restituita.

- **Esempio**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // il DOM non è ancora aggiornato
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // il DOM ora è aggiornato
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // il DOM non è ancora aggiornato
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // il DOM ora è aggiornato
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **Guarda anche** [`this.$nextTick()`](/api/component-instance#nexttick)

## defineComponent() {#definecomponent}

Un helper per definire un componente Vue con inferenza del Type.

- **Tipo**

  ```ts
  // sintassi con le options
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // sintassi con una funzione (richiede la 3.3+)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > Il Type è semplificato per migliorarne la leggibilità.

- **Dettagli**

  Il primo argomento si aspetta un oggetto delle options del componente. Il valore di ritorno sarà lo stesso oggetto delle opzioni, poiché la funzione è essenzialmente una no-op a runtime solo per scopi di inferenza del Type.

  Nota che il type restituito è un po' speciale: sarà un type di costruttore il cui type di istanza è il type dell'istanza del componente ricavato dalle options. Il type restituito viene poi utilizzato per l'inferenza del type quando è usato come un tag in TSX.

  Puoi estrarre l'instance type di un componente (equivalente al type di `this` nelle sue options) dal return type di `defineComponent()` in questo modo:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### Function Signature <sup class="vt-badge" data-text="3.3+" /> {#function-signature}

  `defineComponent()` ha anche una firma (signature) alternativa che è pensata per essere utilizzata con la Composition API e le [render functions o JSX](/guide/extras/render-function.html).

  Invece di accettare un oggetto di options, si aspetta una funzione. Questa funzione lavora nello stesso modo della funzione [`setup()`](/api/composition-api-setup.html#composition-api-setup) della Composition API: riceve le props e il context di setup. Il valore di ritorno dovrebbe essere una render function - sono supportati sia `h()` sia JSX:

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // qui usa la Composition API come in <script setup>
      const count = ref(0)

      return () => {
        // render function o JSX
        return h('div', count.value)
      }
    },
    // option aggiuntive, ad es. dichiara props ed emits
    {
      props: {
        /* ... */
      }
    }
  )
  ```

  L'uso principale per questa firma è con TypeScript (e in particolare con TSX), poiché supporta i generics:

  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // qui usa la Composition API come in <script setup>
      const count = ref(0)

      return () => {
        // render function o JSX
        return <div>{count.value}</div>
      }
    },
    // la dichiarazione manuale delle props a runtime allo stato attuale è ancora necessaria.
    {
      props: ['msg', 'list']
    }
  )
  ```

  In futuro, pianifichiamo di fornire un plugin Babel che inferisca e inietti automaticamente le props a runtime (come per `defineProps` in SFC) in modo che la dichiarazione manuale delle props a runtime possa essere omessa.

  ### Nota sul Treeshaking di webpack {#note-on-webpack-treeshaking}

  Poiché `defineComponent()` è una chiamata di funzione, sembra che possa causare effetti collaterali ad alcuni strumenti di build, ad es. webpack. Ciò potrebbe impedire al componente di essere eliminato (tree-shaked) anche quando non è mai utilizzato.

  Per indicare a webpack che questa chiamata di funzione è sicura per il tree-shaking, puoi aggiungere una nota di commento `/*#__PURE__*/` prima della chiamata della funzione:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  Nota che ciò non è necessario se stai utilizzando Vite, perché Rollup (il bundler di produzione usato da Vite) riconosce che `defineComponent()` è effettivamente privo di effetti collaterali senza la necessità di annotazioni manuali.

- **Guarda anche** [Guida - Utilizzo di Vue con TypeScript](/guide/typescript/overview#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

Definisce un componente asincrono che viene caricato in modo lazy solo quando viene renderizzato. L'argomento può essere una funzione di loader o un oggetto di options per un maggiore controllo del comportamento di caricamento.

- **Tipo**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **Guarda anche** [Guida - I Componenti asincroni](/guide/components/async)

## defineCustomElement() {#definecustomelement}

Questo metodo accetta lo stesso argomento di [`defineComponent`](#definecomponent), ma restituisce un costruttore di classe nativo per [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

- **Tipo**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & { styles?: string[] })
      | ComponentOptions['setup']
  ): {
    new (props?: object): HTMLElement
  }
  ```

  > Il Type è semplificato per migliorarne la leggibilità.

- **Dettagli**

  Oltre alle normali options del componente, `defineCustomElement()` supporta anche un'opzione speciale `styles`, che dovrebbe essere un array di stringhe CSS inline, per fornire CSS che da iniettare nella shadow root dell'elemento.

  Il valore restituito è un costruttore di elementi personalizzato che può essere registrato utilizzando [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define).

- **Esempio**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* options del componente */
  })

  // Registra l'elemento personalizzato.
  customElements.define('my-vue-element', MyVueElement)
  ```

- **Guarda anche**

  - [Guida - Creazione di Custom Elements con Vue](/guide/extras/web-components#building-custom-elements-with-vue)

  - Da notare anche che `defineCustomElement()` richiede una [configurazione speciale](/guide/extras/web-components#sfc-as-custom-element) quando utilizzato con Componenti Single-File (SFC).
