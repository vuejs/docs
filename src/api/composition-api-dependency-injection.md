# Composition API: <br>Dependency Injection {#composition-api-dependency-injection}

## provide() {#provide}

Dostarcza wartość, która może zostać wstrzyknięta przez komponenty potomne.

- **Typ**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **Szczegóły**

  `provide()` przyjmuje dwa argumenty: klucz, który może być ciągiem znaków lub symbolem, oraz wartość, która ma zostać wstrzyknięta.

  Podczas korzystania z TypeScript klucz może być symbolem rzutowanym jako `InjectionKey` - typ narzędzia dostarczony przez Vue, który rozszerza `Symbol`, który może być używany do synchronizacji typu wartości między `provide()` i `inject()`.

  Podobnie jak w przypadku interfejsów API rejestracji funkcji cyklu życia, `provide()` musi być wywoływane synchronicznie podczas fazy `setup()` komponentu.

- **Przykład**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // dostarcza statyczną wartość
  provide('path', '/project/')

  // dostarcza wartość reaktywną
  const count = ref(0)
  provide('count', count)

  // provide z kluczem typu Symbol
  provide(countSymbol, count)
  </script>
  ```

- **Zobacz również**
  - [Poradnik - Provide / Inject](/guide/components/provide-inject)
  - [Poradnik - Provide / Inject z TypeScript](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## inject() {#inject}

Wstrzykuje wartość dostarczoną przez komponent nadrzędny lub aplikację (za pomocą `app.provide()`).

- **Typ**

  ```ts
  // bez domyślnej wartości
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // z domyślną wartością
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // z fabryką
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **Szczegóły**

  Pierwszy argument to klucz wstrzykiwania. Vue przejdzie w górę łańcucha nadrzędnego, aby zlokalizować podaną wartość z pasującym kluczem. Jeśli wiele komponentów w łańcuchu nadrzędnym dostarcza ten sam klucz, ten najbliższy komponentowi wstrzykiwania „przyćmi" te wyżej w łańcuchu. Jeśli nie znaleziono wartości z pasującym kluczem, `inject()` zwraca `undefined`, chyba że podano wartość domyślną.

  Drugi argument jest opcjonalny i jest wartością domyślną, która ma być używana, gdy nie znaleziono pasującej wartości.

  Drugi argument może być również funkcją fabryczną, która zwraca wartości, których utworzenie jest kosztowne. W takim przypadku `true` musi zostać przekazane jako trzeci argument, aby wskazać, że funkcja powinna być używana jako fabryka, a nie sama wartość.

  Podobnie jak w przypadku interfejsów API rejestracji funkcji cyklu życia, `inject()` musi być wywoływane synchronicznie podczas fazy `setup()` komponentu.

  W przypadku języka TypeScript klucz może być typu `InjectionKey` — typu narzędzia dostarczonego przez Vue, który rozszerza `Symbol` i może służyć do synchronizacji typu wartości pomiędzy `provide()` i `inject()`.

- **Przykład**

  Zakładając, że komponent nadrzędny dostarczył wartości, jak pokazano w poprzednim przykładzie `provide()`:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // wstrzykuje wartość statyczną bez wartości domyślnej
  const path = inject('path')

  // wstrzykuje wartość rekatywną
  const count = inject('count')

  // inject z kluczem typu Symbol
  const count2 = inject(countSymbol)

  // inject z wartością domyślną
  const bar = inject('path', '/default-path')

  // inject z funkcją zwracającą wartość domyślną
  const fn = inject('function', () => {})

  // inject z wartiością domyślną fabryki
  const baz = inject('factory', () => new ExpensiveObject(), true)
  </script>
  ```
  
- **Zobacz również**
  - [Poradnik - Provide / Inject](/guide/components/provide-inject)
  - [Poradnik - Provide / Inject z TypeScipt](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## hasInjectionContext() <sup class="vt-badge" data-text="3.3+" /> {#has-injection-context}

Zwraca wartość true, jeśli [inject()](#inject) może zostać użyte bez ostrzeżenia o wywołaniu w niewłaściwym miejscu (np. poza `setup()`). Ta metoda jest przeznaczona do użytku przez biblioteki, które chcą używać `inject()` wewnętrznie bez wywoływania ostrzeżenia u użytkownika końcowego.

- **Typ**

  ```ts
  function hasInjectionContext(): boolean
  ```
