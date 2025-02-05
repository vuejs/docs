# Application API {#application-api}

## createApp() {#createapp}

Tworzy instancję aplikacji.

- **Typ**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **Szczegóły**

  Pierwszym argumentem jest komponent główny. Drugi opcjonalny argument to props, które zostaną przekazane do głównego komponentu.

- **Przykład**

  Użycie komponentu głównego w formie inline:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* opcje komponentu głównego */
  })
  ```

  Użycie zaimportowanego komponentu głównego:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **Zobacz również** [Przewodnik - Tworzenie aplikacji Vue](/guide/essentials/application)

## createSSRApp() {#createssrapp}

Tworzy instancję aplikacji w trybie [SSR Hydration](/guide/scaling-up/ssr#client-hydration). Użycie jest dokładnie takie samo jak `createApp()`.

## app.mount() {#app-mount}

Montuje instancję aplikacji w elemencie kontenera.

- **Typ**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **Szczegóły**

  Argumentem może być rzeczywisty element DOM lub selektor CSS (użyty zostanie pierwszy dopasowany element). Zwraca główną instancję komponentu.

  Jeśli komponent ma zdefiniowany szablon lub funkcję renderowania, zastąpi wszystkie istniejące węzły DOM wewnątrz kontenera. W przeciwnym razie, jeśli kompilator runtime jest dostępny, `innerHTML` kontenera zostanie użyty jako szablon.

  W trybie SSR hydration, zostanie wykonana operacja hydrate dla istniejących węzłów DOM wewnątrz kontenera. Jeśli występują [niedopasowania](/guide/scaling-up/ssr#hydration-mismatch), istniejące węzły DOM zostaną przekształcone w celu dopasowania do oczekiwanego wyniku.

  Dla każdej instancji aplikacji, funkcja `mount()` może być wywołana tylko raz.

- **Przykład**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  Może również zostać zamontowany do rzeczywistego elementu DOM:

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount() {#app-unmount}

Odmontowuje zamontowaną instancję aplikacji, wyzwalając haki cyklu życia odmontowania dla wszystkich komponentów w drzewie komponentów aplikacji.

- **Typ**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.component() {#app-component}

Rejestruje komponent globalny, jeśli przekazano zarówno nazwę, jak i definicję komponentu, lub pobiera już zarejestrowany, jeśli przekazano tylko nazwę.

- **Typ**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **Przykład**

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // rejestracja obiekt opcji
  app.component('my-component', {
    /* ... */
  })

  // użycie zarejestrowanego komponentu
  const MyComponent = app.component('my-component')
  ```

- **Zobacz również** [Rejestracja komponentów](/guide/components/registration)

## app.directive() {#app-directive}

Rejestruje globalną dyrektywę , jeśli przekazano zarówno nazwę, jak i definicję dyrektywy, lub pobiera już zarejestrowaną, jeśli przekazano tylko nazwę.

- **Typ**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **Przykład**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // rejestracja (obiekt dyrektywy)
  app.directive('my-directive', {
    /* custom directive hooks */
  })

  // rejestracja (funkcja dyrektywy)
  app.directive('my-directive', () => {
    /* ... */
  })

  // użycie zarejestrowanej dyrektywy
  const myDirective = app.directive('my-directive')
  ```

- **Zobacz również** [niestandardowe dyrektywy](/guide/reusability/custom-directives)

## app.use() {#app-use}

Instaluje [plugin](/guide/reusability/plugins).

- **typ**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **Szczegóły**

  Oczekuje wtyczki jako pierwszego argumentu i opcjonalnych opcji wtyczki jako drugiego argumentu.

  Wtyczka może być albo obiektem z metodą `install()`, albo po prostu funkcją, która zostanie użyta jako metoda `install()`. Opcje (drugi argument `app.use()`) zostaną przekazane do metody `install()` wtyczki.

  Gdy `app.use()` jest wywoływany na tej samej wtyczce wiele razy, wtyczka zostanie zainstalowana tylko raz.

- **Przykład**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **Zobacz również** [Wtyczki](/guide/reusability/plugins)

## app.mixin() {#app-mixin}

Stosuje globalny mixin (zakres do aplikacji). Globalny mixin stosuje zawarte w nim opcje do każdej instancji komponentu w aplikacji.

:::warning  Niezalecane
Mixiny są obsługiwane w Vue 3 głównie dla kompatybilności wstecznej, ze względu na ich szerokie zastosowanie w bibliotekach ekosystemu. Należy unikać używania mixinów, zwłaszcza globalnych, w kodzie aplikacji.

W przypadku ponownego użycia logiki, zamiast tego należy wybrać [Composables](/guide/reusability/composables).
:::

- **Typ**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.provide() {#app-provide}

Zapewnia wartość, która może zostać wstrzyknięta do wszystkich komponentów potomnych w aplikacji.

- **Typ**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **Szczegóły**

  Oczekuje klucza iniekcji jako pierwszego argumentu i podanej wartości jako drugiego. Zwraca samą instancję aplikacji.

- **Przykład**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'hello')
  ```

  Wewnątrz komponentu w aplikacji:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'hello'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'hello'
    }
  }
  ```

  </div>

- **Zobacz również**
  - [Provide / Inject](/guide/components/provide-inject)
  - [App-level Provide](/guide/components/provide-inject#app-level-provide)
  - [app.runWithContext()](#app-runwithcontext)

## app.runWithContext()<sup class="vt-badge" data-text="3.3+" /> {#app-runwithcontext}

Wykonanie wywołania zwrotnego z bieżącą aplikacją jako kontekstem wstrzyknięcia.

- **Typ**

  ```ts
  interface App {
    runWithContext<T>(fn: () => T): T
  }
  ```

- **Szczegóły**

  Oczekuje funkcji zwrotnej i uruchamia ją natychmiast. Podczas synchronicznego wywołania zwrotnego, wywołania `inject()` są w stanie wyszukać iniekcje z wartości dostarczonych przez bieżącą aplikację, nawet jeśli nie ma bieżącej aktywnej instancji komponentu. Zwrócona zostanie również wartość zwrotna wywołania zwrotnego.

- **Przykład**

  ```js
  import { inject } from 'vue'

  app.provide('id', 1)

  const injected = app.runWithContext(() => {
    return inject('id')
  })

  console.log(injected) // 1
  ```

## app.version {#app-version}

Podaje wersję Vue, w której aplikacja została utworzona. Jest to przydatne wewnątrz [wtyczek](/guide/reusability/plugins), gdzie może być potrzebna logika warunkowa oparta na różnych wersjach Vue.

- **Typ**

  ```ts
  interface App {
    version: string
  }
  ```

- **Przykład**

  Sprawdzanie wersji wewnątrz wtyczki:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('Ta wtyczka wymaga Vue 3')
      }
    }
  }
  ```

- **Zobacz również** [Globalne API - version](/api/general#version)

## app.config {#app-config}

Każda instancja aplikacji udostępnia obiekt `config`, który zawiera ustawienia konfiguracyjne dla tej aplikacji. Możesz zmodyfikować jego właściwości (udokumentowane poniżej) przed zamontowaniem aplikacji.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler {#app-config-errorhandler}

Przypisanie globalnej metody obsługującej niewyłapane błędy propagujące się z aplikacji.

- **Typ**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` jest informacją o błędzie specyficzną dla Vue,
      //  np. w którym haku cyklu życia został zgłoszony błąd
      info: string
    ) => void
  }
  ```

- **Szczegóły**

  Program obsługi błędów otrzymuje trzy argumenty: błąd, instancję komponentu, która wywołała błąd oraz ciąg informacyjny określający typ źródła błędu.

  Może przechwytywać błędy z następujących źródeł:

  - Renderowanie komponentów
  - Obsługa zdarzeń
  - Haki cyklu życia
  - funckja `setup()`
  - Watchers
  - Niestandardowe haki dyrektyw
  - Haki Transition 

  :::tip
  W produkcji trzeci argument (`info`) będzie skróconym kodem zamiast pełnego ciągu informacji. Mapowanie kodu na ciąg znaków można znaleźć w sekcji [Odniesienie do kodu błędu produkcji](/error-reference/#runtime-errors).
  :::

- **Przykład**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // obsłuż bład, np. zgłoś do usługi
  }
  ```

## app.config.warnHandler {#app-config-warnhandler}

Przypisanie niestandardowej obsługi ostrzeżeń runtime z Vue.

- **Typ**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **Szczegóły**

  Funkcja obsługi ostrzeżeń otrzymuje komunikat ostrzegawczy jako pierwszy argument, źródłową instancję komponentu jako drugi argument i ciąg śledzenia komponentu jako trzeci.

  Można go użyć do odfiltrowania określonych ostrzeżeń w celu zmniejszenia częstości wystąpień ostrzeżeń w konsoli. Wszystkie ostrzeżenia Vue powinny być rozwiązywane podczas programowania, więc jest to zalecane tylko podczas sesji debugowania, aby skupić się na określonych ostrzeżeniach spośród wielu, i powinno zostać usunięte po zakończeniu debugowania.

  :::tip
  Ostrzeżenia działają tylko podczas procesu tworzenia oprogoramowania (development), więc ta konfiguracja jest ignorowana w trybie produkcyjnym.
  :::

- **Przykład**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` o ślad hierarchii komponnetu
  }
  ```

## app.config.performance {#app-config-performance}

Ustaw wartość `true`, aby włączyć śledzenie inicjowania, kompilowania, renderowania i poprawiania wydajności komponentów w panelu wydajności/osi czasu narzędzia deweloperskiego przeglądarki. Działa tylko w trybie deweloperskim i w przeglądarkach obsługujących [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API.

- **Typ:** `boolean`

- **Zobacz również** [Guide - Performance](/guide/best-practices/performance)

## app.config.compilerOptions {#app-config-compileroptions}

Konfiguruje opcje kompilatora runtime. Wartości ustawione na tym obiekcie zostaną przekazane do kompilatora szablonów w przeglądarce i wpłyną na każdy komponent w skonfigurowanej aplikacji. Uwaga: można również zastąpić te opcje dla poszczególnych komponentów za pomocą opcji  [`compilerOptions`](/api/options-rendering#compileroptions).

::: warning Ważne
Ta opcja konfiguracji jest respektowana tylko podczas korzystania z pełnej kompilacji (tj. samodzielnego `vue.js`, który może kompilować szablony w przeglądarce). Jeśli używasz kompilacji runtime-only z konfiguracją kompilacji, opcje kompilatora muszą zostać przekazane do `@vue/compiler-dom` poprzez konfiguracje narzędzia kompilacji.

- Dla `vue-loader`: [przekaż `compilerOptions` poprze opcje loader](https://vue-loader.vuejs.org/options.html#compileroptions). Zobacz również [jak skonfigurować go w `vue-cli`](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

- Dla `vite`: [przekaż `@vitejs/plugin-vue` poprze opcje](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options).
  :::

### app.config.compilerOptions.isCustomElement {#app-config-compileroptions-iscustomelement}

Określa metodę sprawdzania w celu rozpoznania natywnych elementów niestandardowych.

- **Typ:** `(tag: string) => boolean`

- **Szczegóły**

  Powinien zwrócić `true`, jeśli tag powinien być traktowany jako natywny element niestandardowy. W przypadku dopasowanego tagu, Vue wyrenderuje go jako element natywny, zamiast próbować rozwiązać go jako komponent Vue.

  Natywne znaczniki HTML i SVG nie muszą być dopasowywane w tej funkcji - parser Vue rozpoznaje je automatycznie.

- **Przykład**

  ```js
  // traktuje wszystkie znaczniki zaczynające się od 'ion-' jako elementy niestandardowe
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **Zobacz również** [komponenty Vue i Web](/guide/extras/web-components)

### app.config.compilerOptions.whitespace {#app-config-compileroptions-whitespace}

Dostosowuje sposób obsługi białych znaków w szablonie.

- **Typ:** `'condense' | 'preserve'`

- **Domyślnie:** `'condense'`

- **Szczegóły**

  Vue usuwa / kondensuje białe znaki w szablonach, aby uzyskać bardziej wydajne skompilowane dane wyjściowe. Domyślną strategią jest „condense”, z następującym zachowaniem:

  1. Wiodące / końcowe białe znaki wewnątrz elementu są skondensowane w pojedynczą spację.
  2. Białe znaki między elementami zawierającymi nowe linie są usuwane.
  3. Kolejne białe znaki w węzłach tekstowych są skracane do pojedynczej spacji.

  Ustawienie tej opcji na `'preserve'` wyłączy (2) i (3).

- **Przykład**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters {#app-config-compileroptions-delimiters}

Dostosowuje ograniczniki używane do interpolacji tekstu w szablonie.

- **Typ:** `[string, string]`

- **Domyślnie:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **Szczegóły**

  Jest to zwykle używane w celu uniknięcia konfliktu z frameworkami po stronie serwera, które również używają składni mustache.

- **Przykład**

  ```js
  // Ograniczniki zostały zmienione 'template string styl' ES6
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments {#app-config-compileroptions-comments}

Dostosowuje traktowanie komentarzy HTML w szablonach.

- **Typ:** `boolean`

- **Domyślnie:** `false`

- **Szczegóły**

  Domyślnie Vue usuwa komentarze w środowisku produkcyjnym. Ustawienie tej opcji na `true` zmusi Vue do zachowania komentarzy nawet w produkcji. Komentarze są zawsze zachowywane podczas rozwoju. Ta opcja jest zwykle używana, gdy Vue jest używane z innymi bibliotekami, które polegają na komentarzach HTML.

- **Przykład**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties {#app-config-globalproperties}

Obiekt, który może być używany do rejestrowania globalnych właściwości, do których można uzyskać dostęp w dowolnej instancji komponentu wewnątrz aplikacji.

- **Typ**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **Szczegóły**

  Jest to zamiennik `Vue.prototype` z Vue 2, który nie jest już obecny w Vue 3. Podobnie jak w przypadku wszystkiego, co globalne, powinna być używana oszczędnie.

  Jeśli właściwość globalna koliduje z właściwością własną komponentu, właściwość własna komponentu będzie miała wyższy priorytet.

- **Użycie**

  ```js
  app.config.globalProperties.msg = 'hello'
  ```

  To sprawia, że `msg` jest dostępny wewnątrz każdego szablonu komponentu w aplikacji, a także na `this` każdej instancji komponentu:

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'hello'
    }
  }
  ```

- **Zobacz również** [Przewodnik - Rozszerzanie właściwości globalnych](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

## app.config.optionMergeStrategies {#app-config-optionmergestrategies}

Obiekt służący do definiowania strategii scalania dla niestandardowych opcji komponentów.

- **Typ**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **Szczegóły**

  Niektóre wtyczki / biblioteki dodają obsługę niestandardowych opcji komponentów (poprzez wstrzykiwanie globalnych mixinów). Opcje te mogą wymagać specjalnej logiki scalania, gdy ta sama opcja musi zostać „scalona” z wielu źródeł (np. mixinów lub dziedziczenia komponentów).

  Funkcję strategii scalania można zarejestrować dla niestandardowej opcji, przypisując ją do obiektu `app.config.optionMergeStrategies`, używając nazwy opcji jako klucza.

  Funkcja strategii scalania otrzymuje wartość tej opcji zdefiniowanej w instancjach nadrzędnej i podrzędnej jako odpowiednio pierwszy i drugi argument.

- **Przykład**

  ```js
  const app = createApp({
    // option z komponentu
    msg: 'Vue',
    // opcja z mixin
    mixins: [
      {
        msg: 'Hello '
      }
    ],
    mounted() {
      // połączone opcje wystawione na this.$options
      console.log(this.$options.msg)
    }
  })

  // definiuje niestandardową strategię scalania dla `msg`
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // log 'Hello Vue'
  ```

- **Zobacz również** [Instancja komponentu - `$options`](/api/component-instance#options)
