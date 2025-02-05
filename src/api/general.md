# Global API: General {#global-api-general}

## version {#version}

Ujawnia aktualną wersję Vue.

- **Typ:** `string`

- **Przykład**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

Narzędzie do oczekiwania na kolejną aktualizację DOM.

- **Typ**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **Szczegóły**

  Podczas mutowania stanu reaktywnego w Vue, wynikające z tego aktualizacje DOM nie są stosowane synchronicznie. Zamiast tego, Vue buforuje je do „następnego tiku”, aby zapewnić, że każdy komponent zaktualizuje się tylko raz, bez względu na liczbę wprowadzonych zmian stanu.

  Funkcja `nextTick()` może być użyta natychmiast po zmianie stanu, aby poczekać na zakończenie aktualizacji DOM. Jako argument można przekazać wywołanie zwrotne lub oczekiwać na zwrócony Promise.

- **Przykład**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // DOM nie został jeszcze zaktualizowany
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    //DOM został zaktualizowany
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

        // DOM nie został jeszcze zaktualizowany
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // DOM został zaktualizowany
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

- **Zobacz również** [`this.$nextTick()`](/api/component-instance#nexttick)

## defineComponent() {#definecomponent}

Metody ułatwiająca użycie typów podczas definiowania komponentu.

- **Typ**

  ```ts
  // składnia opcji
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // składnia funkcji (wymaga wersji 3.3+)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > Typ jest uproszczony w celu zwiększenia czytelności.

- **Szczegóły**

  Pierwszy argument oczekuje obiektu opcji komponentu. Wartością zwracaną będzie ten sam obiekt opcji, ponieważ funkcja jest zasadniczo runtime no-op tylko dla celów wnioskowania o typie.

  Zwróć uwagę, że typ zwracany jest nieco specjalny: będzie to typ konstruktora, którego typ instancji jest typem instancji komponentu wywnioskowanym na podstawie opcji. Jest to używane do wnioskowania o typie, gdy zwracany typ jest używany jako znacznik w TSX.

  Możesz wyodrębnić typ instancji komponentu (równoważny typowi `this` w jego opcjach) z typu zwracanego przez `defineComponent()` w następujący sposób:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### Function Signature <sup class="vt-badge" data-text="3.3+" /> {#function-signature}

 Funkcja `defineComponent()` ma również alternatywną sygnaturę, która jest przeznaczona do użycia z Composition API i [funkcje render lub JSX](/guide/extras/render-function.html).

Zamiast przekazywania obiektu opcji, oczekiwana jest funkcja. Ta funkcja działa tak samo, jak funkcja Composition API [`setup()`](/api/composition-api-setup.html#composition-api-setup): odbiera props i kontekst konfiguracji. Wartością zwrotną powinna być funkcja renderująca - obsługiwane są zarówno `h()`, jak i JSX:

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // użyj interfejsu API kompozycji tutaj, jak w <script setup>
      const count = ref(0)

      return () => {
        // funkcja renderowania lub JSX
        return h('div', count.value)
      }
    },
    // dodatkowe opcje, np. deklaracja propów i emit
    {
      props: {
        /* ... */
      }
    }
  )
  ```

  Głównym przypadkiem użycia tego podpisu jest TypeScript (a w szczególności TSX), ponieważ obsługuje on generics:

  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // użyj interfejsu API kompozycji tutaj, jak w <script setup>
      const count = ref(0)

      return () => {
        // funkcja renderowania lub JSX
        return <div>{count.value}</div>
      }
    },
    // ręczna deklaracja propsów w czasie wykonywania jest obecnie nadal wymagana.
    {
      props: ['msg', 'list']
    }
  )
  ```

  W przyszłości planujemy udostępnić wtyczkę Babel, która automatycznie infekuje i wstrzykuje rekwizyty środowiska runtime (podobnie jak w przypadku `defineProps` w SFC), dzięki czemu deklaracja propsów środowiska runtime może zostać pominięta.

  ### Uwaga dotycząca webpack Treeshaking {#note-on-webpack-treeshaking}

  Ponieważ `defineComponent()` jest wywołaniem funkcji, może się wydawać, że spowoduje to efekty uboczne dla niektórych narzędzi kompilacji, np. webpack. Zapobiegnie to wywołaniu tree-shaking komponentu, nawet jeśli komponent nie jest nigdy używany.

  Aby powiedzieć webpackowi, że wywołanie tej funkcji jest bezpieczne dla tree-shaking, można dodać notację komentarza `/*#__PURE__*/` przed wywołaniem funkcji:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  Zauważ, że nie jest to konieczne, jeśli używasz Vite, ponieważ Rollup (bazowy bundler produkcyjny używany przez Vite) jest wystarczająco inteligentny, aby określić, że `defineComponent()` jest w rzeczywistości wolny od efektów ubocznych bez potrzeby ręcznych adnotacji.

- **Zobacz również** [Poradnik - Użycie Vue z TypeScript](/guide/typescript/overview#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

Definiuje asynchroniczny komponent, który jest ładowany przy pomocy lazy loading tylko wtedy, gdy jest renderowany. Argumentem może być funkcja ładująca lub obiekt opcji dla bardziej zaawansowanej kontroli zachowania ładowania.

- **Typ**

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

- **Zobacz również** [Poradnik - Komponenty asynchroniczne](/guide/components/async)

## defineCustomElement() {#definecustomelement}

Ta metoda przyjmuje ten sam argument co [`defineComponent`](#definecomponent), ale zamiast tego zwraca natywny konstruktor klasy [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

- **Typ**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & { styles?: string[] })
      | ComponentOptions['setup']
  ): {
    new (props?: object): HTMLElement
  }
  ```

  > Typ jest uproszczony w celu zwiększenia czytelności.

- **Sczegóły**

  Poza zwykłymi opcjami komponentu, `defineCustomElement()` obsługuje również specjalną opcję `styles`, która powinna być tablicą wbudowanych ciągów CSS, w celu dostarczenia CSS, który powinien zostać wstrzyknięty do elementu shadow root.

  Wartością zwrotną jest niestandardowy konstruktor elementu, który można zarejestrować za pomocą [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define).

- **Przykład**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* opcje komponentu */
  })

  // Rejestracja elementu niestandardowego.
  customElements.define('my-vue-element', MyVueElement)
  ```

- **Zobacz również**

  - [Poradnik - Budowanie elementów niestandardowych z Vue](/guide/extras/web-components#building-custom-elements-with-vue)

  - Należy również pamiętać, że funkcja `defineCustomElement()` wymaga [specjalnej konfiguracji](/guide/extras/web-components#sfc-as-custom-element), gdy jest używana z komponentami jednoplikowymi.
