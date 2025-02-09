# Typy narzędzi {#utility-types}

:::info
Ta strona zawiera tylko kilka powszechnie używanych typów narzędzi, których użycie może wymagać wyjaśnienia. Aby uzyskać pełną listę eksportowanych typów, zapoznaj się z [kodem źródłowym](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131).
:::

## PropType\<T> {#proptype-t}

Służy do adnotacji właściwości przy użyciu bardziej zaawansowanych typów podczas korzystania z deklaracji właściwości w czasie wykonywania.

- **Przykład**

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
        // podaj bardziej szczegółowy typ dla `Obiektu`
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **Zobacz także** [Przewodnik - Typing Component Props](/guide/typescript/options-api#typing-component-props)

## MaybeRef\<T> {#mayberef}

Alias ​​dla `T | Ref<T>`. Przydatny do adnotowania argumentów [Composables](/guide/reusability/composables.html).

- Obsługiwane tylko w wersji 3.3+.

## MaybeRefOrGetter\<T> {#maybereforgetter}

Alias ​​dla `T | Ref<T> | (() => T)`. Przydatny do adnotowania argumentów [Composables](/guide/reusability/composables.html).

- Obsługiwane tylko w wersji 3.3+.

## ExtractPropTypes\<T> {#extractproptypes}

Wyodrębnij typy rekwizytów z obiektu opcji rekwizytów środowiska wykonawczego. Wyodrębnione typy są skierowane do wewnątrz — tj. rozwiązane rekwizyty otrzymane przez komponent. Oznacza to, że rekwizyty typu boolowskiego i rekwizyty z wartościami domyślnymi są zawsze zdefiniowane, nawet jeśli nie są wymagane.

Aby wyodrębnić rekwizyty skierowane do publiczności, tj. rekwizyty, które rodzic może przekazać, użyj [`ExtractPublicPropTypes`](#extractpublicproptypes).

- **Przykład**

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

Wyodrębnij typy rekwizytów z obiektu opcji rekwizytów środowiska wykonawczego. Wyodrębnione typy są publiczne - tj. rekwizyty, które rodzic może przekazać.

- Obsługiwane tylko w wersji 3.3+.

- **Przykład**

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

Służy do rozszerzenia typu instancji komponentu o obsługę niestandardowych właściwości globalnych.

- **Przykład**

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
  Augmentacje muszą być umieszczone w pliku modułu `.ts` lub `.d.ts`. Więcej szczegółów można znaleźć w [Umieszczanie rozszerzeń typu](/guide/typescript/options-api#augmenting-global-properties).
  :::

- **Zobacz także** [Przewodnik - Rozszerzanie właściwości globalnych](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

Służy do rozszerzenia typu opcji komponentu o obsługę opcji niestandardowych.

- **Przykład**

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip
  Augmentacje muszą być umieszczone w pliku modułu `.ts` lub `.d.ts`. Więcej szczegółów można znaleźć w [Umieszczanie rozszerzeń typu](/guide/typescript/options-api#augmenting-global-properties).
  :::

- **Zobacz także** [Przewodnik - Rozszerzanie opcji niestandardowych](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

Służy do rozszerzenia dozwolonych rekwizytów TSX w celu użycia niezadeklarowanych rekwizytów w elementach TSX.

- **Przykład**

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // teraz działa nawet jeśli hello nie jest zadeklarowaną właściwością
  <MyComponent hello="world" />
  ```

  :::tip
  Augmentacje muszą być umieszczone w pliku modułu `.ts` lub `.d.ts`. Więcej szczegółów można znaleźć w [Umieszczanie rozszerzeń typu](/guide/typescript/options-api#augmenting-global-properties).
  :::

## CSSProperties {#cssproperties}

Służy do rozszerzania dozwolonych wartości w powiązaniach właściwości stylu.

- **Przykład**

  Zezwalaj na dowolną niestandardową właściwość CSS

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
Augmentacje muszą być umieszczone w pliku modułu `.ts` lub `.d.ts`. Więcej szczegółów można znaleźć w [Umieszczanie rozszerzeń typu](/guide/typescript/options-api#augmenting-global-properties).
:::

:::info Zobacz także
Tagi SFC `<style>` obsługują łączenie wartości CSS z dynamicznym stanem komponentu za pomocą funkcji CSS `v-bind`. Umożliwia to niestandardowe właściwości bez rozszerzania typu.

- [v-bind() w CSS](/api/sfc-css-features#v-bind-in-css)
  :::
