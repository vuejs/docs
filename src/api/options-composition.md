# Options: Composition {#options-composition}

## provide {#provide}

Zapewnia wartości, które mogą być wstrzykiwane przez komponenty potomne.

- **Typ**

  ```ts
  interface ComponentOptions {
    provide?: object | ((this: ComponentPublicInstance) => object)
  }
  ```

- **Szczegóły**

  `provide` i [`inject`](#inject) są używane razem, aby umożliwić komponentowi przodkowi służyć jako wstrzykiwacz zależności dla wszystkich jego komponentów potomnych, niezależnie od tego, jak głęboka jest hierarchia komponentów, o ile znajdują się one w tym samym łańcuchu nadrzędnym.

  Opcja `provide` powinna być obiektem lub funkcją zwracającą obiekt. Obiekt ten zawiera właściwości, które są dostępne do wstrzyknięcia do jego elementów potomnych. Można używać symboli jako kluczy w tym obiekcie.

- **Przykład**

  Podstawowe użycie:

  ```js
  const s = Symbol()

  export default {
    provide: {
      foo: 'foo',
      [s]: 'bar'
    }
  }
  ```

  Używanie funkcji do zapewnienia stanu poszczególnych komponentów:

  ```js
  export default {
    data() {
      return {
        msg: 'foo'
      }
    }
    provide() {
      return {
        msg: this.msg
      }
    }
  }
  ```

  W powyższym przykładzie dostarczony `msg` NIE będzie reaktywny. Zobacz [Working with Reactivity](/guide/components/provide-inject#working-with-reactivity) po więcej szczegółów.

- **Zobacz także** [Provide / Inject](/guide/components/provide-inject)

## inject {#inject}

Deklaruje właściwości do wstrzyknięcia do bieżącego komponentu poprzez zlokalizowanie ich od dostawców nadrzędnych.

- **Typ**

  ```ts
  interface ComponentOptions {
    inject?: ArrayInjectOptions | ObjectInjectOptions
  }

  type ArrayInjectOptions = string[]

  type ObjectInjectOptions = {
    [key: string | symbol]:
      | string
      | symbol
      | { from?: string | symbol; default?: any }
  }
  ```

- **Szczegóły**

  Opcja `inject` powinna być albo:

  - Tablica ciągów znaków, lub
  - Obiektem, w którym kluczami są lokalne nazwy wiązań, a wartością jest albo:
    - Klucz (ciąg lub symbol) do wyszukania w dostępnych wstrzyknięciach, lub
    - Obiekt, w którym:
      - właściwość `from` jest kluczem (ciąg lub Symbol) do wyszukania w dostępnych zastrzykach, oraz
      - właściwość `default` jest używana jako wartość awaryjna. Podobnie jak w przypadku wartości domyślnych rekwizytów, funkcja fabryki jest potrzebna dla typów obiektów, aby uniknąć współdzielenia wartości między wieloma instancjami komponentów.

  Wstrzyknięta właściwość będzie „niezdefiniowana”, jeśli nie podano ani pasującej właściwości, ani wartości domyślnej.

  Należy pamiętać, że wstrzyknięte wiązania NIE są reaktywne. Jest to zamierzone. Jeśli jednak wstrzyknięta wartość jest obiektem reaktywnym, właściwości tego obiektu pozostają reaktywne. Więcej szczegółów można znaleźć w [Working with Reactivity](/guide/components/provide-inject#working-with-reactivity).

- **Przykład**

  Podstawowe użycie: 

  ```js
  export default {
    inject: ['foo'],
    created() {
      console.log(this.foo)
    }
  }
  ```

  Używanie wstrzykniętej wartości jako domyślnej dla właściwości:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  Używanie wstrzykniętej wartości do wprowadzania danych:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  Wartości podane w inject mogą być opcjonalne z wartością domyślną:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  Jeśli musi zostać wstrzyknięty z właściwości o innej nazwie, należy użyć `from`, aby wskazać właściwość źródłową:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  Podobnie jak w przypadku wartości domyślnych propsów, należy użyć funkcji fabrycznej dla wartości nieprymitywnych:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **Zobacz także** [Provide / Inject](/guide/components/provide-inject)

## mixins {#mixins}

Tablica obiektów opcji, które mają zostać dodane do bieżącego komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    mixins?: ComponentOptions[]
  }
  ```

- **Szczegóły**

  Opcja `mixins` akceptuje tablicę obiektów mixin. Te obiekty mixin mogą zawierać opcje instancji, tak jak normalne obiekty instancji, i zostaną one połączone z ewentualnymi opcjami przy użyciu określonej logiki łączenia opcji. Na przykład, jeśli twój mixin zawiera hook `created`, a sam komponent również go posiada, obie funkcje zostaną wywołane.

  Haki mixin są wywoływane w kolejności, w jakiej zostały dostarczone i przed własnymi hakami komponentu.

  :::warning nie jest już zalecane
  W Vue 2, mixiny były podstawowym mechanizmem tworzenia fragmentów logiki komponentu wielokrotnego użytku. Podczas gdy mixiny są nadal obsługiwane w Vue 3, [Composable functions using Composition API](/guide/reusability/composables) jest obecnie preferowanym podejściem do ponownego użycia kodu między komponentami.
  :::

- **Przykład**

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }

  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

## extends {#extends}

Komponent „klasy bazowej” do rozszerzenia.

- **Typ**

  ```ts
  interface ComponentOptions {
    extends?: ComponentOptions
  }
  ```

- **Szczegóły**

  Pozwala jednemu komponentowi rozszerzyć inny, dziedzicząc jego opcje.

  Z perspektywy implementacji, `extends` jest prawie identyczne jak `mixins`. Komponent określony przez `extends` będzie traktowany tak, jakby był pierwszym mixinem.

  Jednakże, `extends` i `mixins` wyrażają różne intencje. Opcja `mixins` jest głównie używana do komponowania fragmentów funkcjonalności, podczas gdy `extends` dotyczy głównie dziedziczenia.

  Podobnie jak w przypadku `mixins`, wszystkie opcje (z wyjątkiem `setup()`) zostaną połączone przy użyciu odpowiedniej strategii łączenia.

- **Przykład**

  ```js
  const CompA = { ... }

  const CompB = {
    extends: CompA,
    ...
  }
  ```

  :::warning Nie zalecane dla Composition API
  `extends` jest zaprojektowany dla Options API i nie obsługuje łączenia metod `setup()`.

  W Composition API preferowanym modelem mentalnym dla ponownego użycia logiki jest „kompozycja”, a nie „dziedziczenie”. Jeśli masz logikę z komponentu, która musi być ponownie użyta w innym, rozważ wyodrębnienie odpowiedniej logiki do [Composable](/guide/reusability/composables#composables).

  Jeśli nadal zamierzasz „rozszerzyć” komponent za pomocą Composition API, możesz wywołać `setup()` komponentu bazowego w `setup()` komponentu rozszerzającego:

  ```js
  import Base from './Base.js'
  export default {
    extends: Base,
    setup(props, ctx) {
      return {
        ...Base.setup(props, ctx),
        // powiązania lokalne
      }
    }
  }
  ```
  :::
