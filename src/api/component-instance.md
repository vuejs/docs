# Component Instance {#component-instance}

:::info
Ta strona dokumentuje wbudowane właściwości i metody wystawione na publiczną instancję komponentu, czyli `this`.

Wszystkie właściwości wymienione na tej stronie są tylko do odczytu (z wyjątkiem właściwości zagnieżdżonych w `$data`).
:::

## $data {#data}

Obiekt zwrócony z opcji [`data`](./options-state#data), jest tworzony jako reaktywny przez komponent. Instancja komponentu pośredniczy w dostępie do właściwości swojego obiektu danych.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props {#props}

Obiekt reprezentujący bieżące, rozwiązane rekwizyty komponentu.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **Szczegóły**

  Tylko zadeklarowane propsy za pomocą opcji [`props`](./options-state#props) zostaną uwzględnione. Instancja komponentu pośredniczy w dostępie do właściwości na swoim obiekcie props.

## $el {#el}

Główny węzeł DOM, którym zarządza instancja komponentu.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $el: any
  }
  ```

- **Szczegóły**

  `$el` będzie `undefined` dopóki komponent nie zostanie [zamontowany](./options-lifecycle#mounted).

  - Dla komponentów z pojedynczym elementem głównym, `$el` będzie wskazywał na ten element.
  - Dla komponentów z korzeniem tekstowym, `$el` będzie wskazywał na węzeł tekstowy.
  - W przypadku komponentów z wieloma węzłami głównymi, `$el` będzie zastępczym węzłem DOM, którego Vue używa do śledzenia pozycji komponentu w DOM (węzeł tekstowy lub węzeł komentarza w trybie SSR hydration).

  :::tip
  Dla zachowania spójności zaleca się używanie [template refs](/guide/essentials/template-refs) do bezpośredniego dostępu do elementów zamiast polegania na `$el`.
  :::

## $options {#options}

Rozwiązane opcje komponentu użyte do utworzenia instancji bieżącego komponentu.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **Szczegóły**

  Obiekt `$options` eksponuje rozwiązane opcje dla bieżącego komponentu i jest wynikiem połączenia tych możliwych źródeł:

  - Globalne mixiny
  - Komponent `rozszerza` bazę
  - Mieszanki komponentów

  Jest zwykle używany do obsługi niestandardowych opcji komponentów:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **Zobacz również** [`app.config.optionMergeStrategies`](/api/application#app-config-optionmergestrategies)

## $parent {#parent}

Instancja nadrzędna, jeśli bieżąca instancja ją posiada. Będzie to `null` dla samej głównej instancji.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root {#root}

Główna instancja komponentu bieżącego drzewa komponentów. Jeśli bieżąca instancja nie ma rodziców, wartością tą będzie ona sama.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots {#slots}

Obiekt reprezentujący [sloty](/guide/components/slots) przekazane przez komponent nadrzędny.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **Szczegóły**

  Zwykle używane podczas ręcznego tworzenia [funkcji renderowania](/guide/extras/render-function), ale może być również używane do wykrywania obecności slotu.

  Każdy slot jest udostępniany w `this.$slots` jako funkcja, która zwraca tablicę vnode pod kluczem odpowiadającym nazwie tego slotu. Domyślny slot jest udostępniany jako `this.$slots.default`.

  Jeśli slot jest [slotem o zakresie](/guide/components/slots#scoped-slots), argumenty przekazywane do funkcji slotu są dostępne dla slotu jako jego właściwości slotu.

- **Zobacz również** [Render Functions - Rendering Slots](/guide/extras/render-function#rendering-slots)

## $refs {#refs}

Obiekt elementów DOM i wystąpień komponentów, zarejestrowany za pomocą [odniesień do szablonów](/guide/essentials/template-refs).

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **Zobacz również**

  - [Template refs](/guide/essentials/template-refs)
  - [Special Attributes - ref](./built-in-special-attributes.md#ref)

## $attrs {#attrs}

Obiekt zawierający atrybuty przejścia komponentu.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **Szczegóły**

  [Fallthrough Attributes](/guide/components/attrs) to atrybuty i procedury obsługi zdarzeń przekazywane przez komponent nadrzędny, ale niezadeklarowane jako rekwizyt lub zdarzenie emitowane przez komponent podrzędny.

  Domyślnie wszystko w `$attrs` zostanie automatycznie odziedziczone w elemencie głównym komponentu, jeśli istnieje tylko jeden element główny. To zachowanie jest wyłączone, jeśli komponent ma wiele węzłów głównych i można je jawnie wyłączyć za pomocą opcji [`inheritAttrs`](./options-misc#inheritattrs).

- **Zobacz również**

  - [Fallthrough Attributes](/guide/components/attrs)

## $watch() {#watch}

Imperative API do tworzenia watchers.

- **Type**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Szczegóły**

  Pierwszy argument to źródło obserwowane. Może to być ciąg nazwy właściwości komponentu, prosty ciąg ścieżki rozdzielony kropkami lub [funkcja gettera](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description).

  Drugi argument to funkcja wywołania zwrotnego. Wywołanie zwrotne otrzymuje nową wartość i starą wartość obserwowanego źródła.

  - **`immediate`**: natychmiastowe wywołanie zwrotne po utworzeniu obserwatora. Stara wartość będzie `undefined` przy pierwszym wywołaniu.
  - **`deep`**: wymusza głębokie przejście źródła, jeśli jest obiektem, tak aby wywołanie zwrotne było uruchamiane przy głębokich mutacjach. Zobacz [Deep Watchers](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: dostosowanie czasu opróżniania wywołania zwrotnego. Zobacz [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) i [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: debugowanie zależności obserwatora. Zobacz [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging).

- **Przykład**

  Obserwuje nazwę wartości:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  Obserwuje ścieżkę rozdzieloną kropkami:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  Użycie gettera do bardziej złożonych wyrażeń:

  ```js
  this.$watch(
    // every time the expression `this.a + this.b` yields
    // a different result, the handler will be called.
    // It's as if we were watching a computed property
    // without defining the computed property itself.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  Zatrzymanie obserwatora:

  ```js
  const unwatch = this.$watch('a', cb)

  // later...
  unwatch()
  ```

- **Zobacz również**
  - [Options - `watch`](/api/options-state#watch)
  - [Guide - Watchers](/guide/essentials/watchers)

## $emit() {#emit}

Wywoła niestandardowe zdarzenie na bieżącej instancji. Wszelkie dodatkowe argumenty zostaną przekazane do funkcji wywołania zwrotnego słuchacza.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **Przykład**

  ```js
  export default {
    created() {
      // tylko wydarzenie
      this.$emit('foo')
      // z dodatkowymi argumentami
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **Zobacz również**

  - [Component - Events](/guide/components/events)
  - [`emits` option](./options-state#emits)

## $forceUpdate() {#forceupdate}

Wymusi ponowne renderowanie instancji komponentu.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **Szczegóły**

  Powinno to być rzadko potrzebne, biorąc pod uwagę w pełni automatyczny system reaktywności Vue. Jedynymi przypadkami, w których może być potrzebne, jest jawne utworzenie niereaktywnego stanu komponentu przy użyciu zaawansowanych interfejsów API reaktywności.

## $nextTick() {#nexttick}

Wersja globalna [`nextTick()`](./general#nexttick) powiązana z instancją.

- **Typ**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **Szczegóły**

  Jedyną różnicą w stosunku do globalnej wersji `nextTick()` jest to, że wywołanie zwrotne przekazane do `this.$nextTick()` będzie miało swój kontekst `this` powiązany z bieżącą instancją komponentu.

- **Zobacz również** [`nextTick()`](./general#nexttick)
