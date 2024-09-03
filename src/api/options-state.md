# Options: State {#options-state}

## data {#data}

Funkcja zwracająca początkowy stan reaktywny instancji komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  ```

- **Szczegóły**

  Oczekuje się, że funkcja zwróci zwykły obiekt JavaScript, który zostanie uczyniony reaktywnym przez Vue. Po utworzeniu instancji, do reaktywnego obiektu danych można uzyskać dostęp jako `this.$data`. Instancja komponentu również przekazuje wszystkie właściwości znalezione w obiekcie danych, więc `this.a` będzie równoważne z `this.$data.a`.

  Wszystkie właściwości danych najwyższego poziomu muszą być zawarte w zwróconym obiekcie danych. Dodawanie nowych właściwości do `this.$data` jest możliwe, ale **nie** jest zalecane. Jeśli pożądana wartość właściwości nie jest jeszcze dostępna, należy uwzględnić pustą wartość, taką jak `undefined` lub `null`, jako symbol zastępczy, aby Vue wiedziało, że właściwość istnieje.

  Właściwości, które zaczynają się od `_` lub `$` **NIE** będą przekazywane jako proxy w instancji komponentu, ponieważ mogą kolidować z wewnętrznymi właściwościami i metodami API Vue. Będziesz musiał uzyskać do nich dostęp jako `this.$data._property`.

  **Nie** zaleca się zwracania obiektów z własnym zachowaniem stanowym, takich jak obiekty API przeglądarki i właściwości prototypu. Zwrócony obiekt powinien idealnie być zwykłym obiektem, który reprezentuje tylko stan komponentu.

- **Przykład**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    created() {
      console.log(this.a) // 1
      console.log(this.$data) // { a: 1 }
    }
  }
  ```

  Zauważ, że jeśli użyjesz funkcji strzełkowej z właściwością `data`, `this` nie będzie instancją komponentu, ale nadal możesz uzyskać dostęp do instancji jako pierwszego argumentu funkcji:

  ```js
  data: (vm) => ({ a: vm.myProp })
  ```

- **Zobacz także** [Reaktywność w głębi](/guide/extras/reactivity-in-depth)

## props {#props}

Deklaruje właściwości komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    props?: ArrayPropsOptions | ObjectPropsOptions
  }

  type ArrayPropsOptions = string[]

  type ObjectPropsOptions = { [key: string]: Prop }

  type Prop<T = any> = PropOptions<T> | PropType<T> | null

  interface PropOptions<T> {
    type?: PropType<T>
    required?: boolean
    default?: T | ((rawProps: object) => T)
    validator?: (value: unknown, rawProps: object) => boolean
  }

  type PropType<T> = { new (): T } | { new (): T }[]
  ```

  > Types are simplified for readability.

- **Szczegóły**

  W Vue wszystkie rekwizyty komponentów muszą być jawnie zadeklarowane. Rekwizyty komponentów mogą być deklarowane w dwóch formach:

  - Prosta forma wykorzystująca tablicę ciągów znaków
  - Pełna forma przy użyciu obiektu, w którym każdy klucz właściwości jest nazwą właściwości, a wartością jest typ właściwości (funkcja konstruktora) lub opcje zaawansowane.

  W przypadku składni obiektowej, każda właściwość może dodatkowo definiować następujące opcje:

  - **`type`**: Może być jednym z następujących natywnych konstruktorów: `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`, dowolna niestandardowa funkcja konstruktora lub ich tablica. W trybie deweloperskim Vue sprawdzi, czy wartość właściwości jest zgodna z zadeklarowanym typem i wyświetli ostrzeżenie, jeśli tak nie jest. Więcej szczegółów można znaleźć w [Prop Validation](/guide/components/props#prop-validation).

    Należy również pamiętać, że właściwość z typem `Boolean` wpływa na zachowanie rzutowania wartości zarówno w fazie rozwoju, jak i produkcji. Zobacz [Boolean Casting](/guide/components/props#boolean-casting) po więcej szczegółów.


  - **`default`**: Określa domyślną wartość dla właściwości, gdy nie została ona przekazana przez rodzica lub ma wartość `undefined`. Domyślne wartości obiektu lub tablicy muszą zostać zwrócone przy użyciu funkcji fabryki. Funkcja fabryki otrzymuje również nieprzetworzony obiekt props jako argument.

  - **`required`**: Określa, czy rekwizyt jest wymagany. W środowisku nieprodukcyjnym zostanie wyświetlone ostrzeżenie konsoli, jeśli ta wartość jest prawdziwa, a właściwość nie zostanie przekazana.

  - **`validator`**: Niestandardowa funkcja walidatora, która przyjmuje wartość właściwości jako jedyny argument. W trybie deweloperskim zostanie wyświetlone ostrzeżenie konsoli, jeśli ta funkcja zwróci fałszywą wartość (tj. walidacja nie powiedzie się).

- **Przykład**

  Prosta deklaracja:

  ```js
  export default {
    props: ['size', 'myMessage']
  }
  ```

  Deklaracja obiektu z walidacją:

  ```js
  export default {
    props: {
      // kontrola typu
      height: Number,
      // kontrola typu z walidacją
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
          return value >= 0
        }
      }
    }
  }
  ```

- **Zobacz również**
  - [Poradnik - Props](/guide/components/props)
  - [Poradnik - Typing Component Props](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

## computed {#computed}

Deklaruje obliczone właściwości, które mają być dostępne w instancji komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    computed?: {
      [key: string]: ComputedGetter<any> | WritableComputedOptions<any>
    }
  }

  type ComputedGetter<T> = (
    this: ComponentPublicInstance,
    vm: ComponentPublicInstance
  ) => T

  type ComputedSetter<T> = (
    this: ComponentPublicInstance,
    value: T
  ) => void

  type WritableComputedOptions<T> = {
    get: ComputedGetter<T>
    set: ComputedSetter<T>
  }
  ```

- **Szczegóły**

  Opcja akceptuje obiekt, gdzie kluczem jest nazwa obliczanej właściwości, a wartością jest albo obliczany getter, albo obiekt z metodami `get` i `set` (dla zapisywalnych obliczanych właściwości).

  Wszystkie gettery i settery mają swój kontekst `this` automatycznie powiązany z instancją komponentu.

  Zauważ, że jeśli użyjesz funkcji strzałkowej z obliczoną właściwością, `this` nie będzie wskazywać na instancję komponentu, ale nadal możesz uzyskać dostęp do instancji jako pierwszego argumentu funkcji:

  ```js
  export default {
    computed: {
      aDouble: (vm) => vm.a * 2
    }
  }
  ```

- **Przykład**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    computed: {
      // tylko do odczytu
      aDouble() {
        return this.a * 2
      },
      // z możliwością nadpisania
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    },
    created() {
      console.log(this.aDouble) // => 2
      console.log(this.aPlus) // => 2

      this.aPlus = 3
      console.log(this.a) // => 2
      console.log(this.aDouble) // => 4
    }
  }
  ```

- **Zobacz również**
  - [Poradnik - Computed Properties](/guide/essentials/computed)
  - [Poradnik - Typing Computed Properties](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

## methods {#methods}

Deklaruje metody, które mają być mieszane z instancją komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  ```

- **Szczegóły**

  Zadeklarowane metody mogą być bezpośrednio dostępne w instancji komponentu lub użyte w wyrażeniach szablonu. Wszystkie metody mają swój kontekst `this` automatycznie powiązany z instancją komponentu, nawet gdy jest on przekazywany.

  Unikaj używania funkcji strzałkowych podczas deklarowania metod, ponieważ nie będą one miały dostępu do instancji komponentu poprzez `this`.

- **Przykład**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    },
    created() {
      this.plus()
      console.log(this.a) // => 2
    }
  }
  ```

- **Zobacz również** [Event Handling](/guide/essentials/event-handling)

## watch {#watch}

Deklaruje wywołania zwrotne zegarka, które będą wywoływane przy zmianie danych.

- **Typ**

  ```ts
  interface ComponentOptions {
    watch?: {
      [key: string]: WatchOptionItem | WatchOptionItem[]
    }
  }

  type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type ObjectWatchOptionItem = {
    handler: WatchCallback | string
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > Types are simplified for readability.

- **Szczegóły**

  Opcja `watch` oczekuje obiektu, w którym klucze są właściwościami instancji komponentu reaktywnego do obserwowania (np. właściwości zadeklarowane przez `data` lub `computed`) - a wartości są odpowiednimi wywołaniami zwrotnymi. Wywołanie zwrotne otrzymuje nową wartość i starą wartość obserwowanego źródła.

  Oprócz właściwości na poziomie korzenia, kluczem może być również prosta ścieżka rozdzielana kropkami, np. `a.b.c`. Zauważ, że to użycie **nie** obsługuje złożonych wyrażeń - obsługiwane są tylko ścieżki rozdzielane kropkami. Jeśli potrzebujesz obserwować złożone źródła danych, użyj zamiast tego imperatywnego API [`$watch()`](/api/component-instance#watch).

  Wartość może być również ciągiem nazwy metody (zadeklarowanym przez `methods`) lub obiektem zawierającym dodatkowe opcje. Gdy używana jest składnia obiektowa, wywołanie zwrotne powinno być zadeklarowane w polu `handler`. Dodatkowe opcje obejmują:

  - **`immediate`**: wyzwala wywołanie zwrotne natychmiast po utworzeniu obserwatora. Stara wartość będzie `undefined` przy pierwszym wywołaniu.
  - **`deep`**: wymusza głębokie przeszukiwanie źródła, jeśli jest to obiekt lub tablica, tak aby wywołanie zwrotne było uruchamiane przy głębokich mutacjach. Zobacz [Deep Watchers](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: dostosowanie czasu spłukiwania wywołania zwrotnego. Zobacz [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) i [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: debugowanie zależności watchera. Zobacz [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging).

  Unikaj używania funkcji strzałek podczas deklarowania wywołań zwrotnych watch, ponieważ nie będą one miały dostępu do instancji komponentu za pośrednictwem `this`.

- **Przykład**

  ```js
  export default {
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 5,
        f: 6
      }
    },
    watch: {
      // obserwowanie właściwości najwyższego poziomu
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // nazwa metody
      b: 'someMethod',
      // wywołanie zwrotne będzie wywoływane za każdym razem, gdy którakolwiek z właściwości obserwowanego obiektu ulegnie zmianie, niezależnie od głębokości zagnieżdżenia.
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // obserwowanie pojedyńczą zagnieżdżoną właściwość:
      'c.d': function (val, oldVal) {
        // kod który będzie wywołany
      },
      // wywołanie zwrotne zostanie wywołane natychmiast po rozpoczęciu obserwacji
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // możesz przekazać tablicę wywołań zwrotnych, będą one wywoływane jeden po drugim
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    },
    created() {
      this.a = 3 // => new: 3, old: 1
    }
  }
  ```

- **Zobacz również** [Watchers](/guide/essentials/watchers)

## emits {#emits}

Deklaruje niestandardowe zdarzenia emitowane przez komponent.

- **Typ**

  ```ts
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  ```

- **Szczegóły**

  Emitowane zdarzenia mogą być deklarowane w dwóch formach:

  - Prosta forma wykorzystująca tablicę ciągów znaków
  - Pełna forma przy użyciu obiektu, gdzie każdy klucz właściwości jest nazwą zdarzenia, a wartością jest `null` lub funkcja walidatora.

  Funkcja walidacji otrzyma dodatkowe argumenty przekazane do wywołania `$emit` komponentu. Na przykład, jeśli wywoływane jest `this.$emit('foo', 1)`, odpowiedni walidator dla `foo` otrzyma argument `1`. Funkcja walidatora powinna zwracać wartość logiczną, aby wskazać, czy argumenty zdarzenia są prawidłowe.

  Zauważ, że opcja `emits` wpływa na to, które detektory zdarzeń są uważane za detektory zdarzeń komponentu, a nie natywne detektory zdarzeń DOM. Nasłuchiwacze zadeklarowanych zdarzeń zostaną usunięte z obiektu `$attrs` komponentu, więc nie zostaną przekazane do głównego elementu komponentu. Zobacz [Fallthrough Attributes](/guide/components/attrs) po więcej szczegółów.

- **Przykład**

  Składnia tablicy:

  ```js
  export default {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  }
  ```

  Składnia obiektu:

  ```js
  export default {
    emits: {
      // bez walidacji
      click: null,

      // z walidacją
      submit: (payload) => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  }
  ```

- **Zobacz również**
  - [Poradnik - Fallthrough Attributes](/guide/components/attrs)
  - [Poradnik - Typing Component Emits](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

## expose {#expose}

Deklaruje ujawnione właściwości publiczne, gdy instancja komponentu jest dostępna dla rodzica za pośrednictwem odwołań szablonu.

- **Typ**

  ```ts
  interface ComponentOptions {
    expose?: string[]
  }
  ```

- **Szczegóły**

  Domyślnie instancja komponentu udostępnia wszystkie właściwości instancji rodzicowi, gdy dostęp do nich uzyskuje się za pośrednictwem `$parent`, `$root` lub referencji szablonu. Może to być niepożądane, ponieważ komponent najprawdopodobniej ma wewnętrzny stan lub metody, które powinny pozostać prywatne, aby uniknąć ścisłego sprzężenia.

  Opcja `expose` oczekuje listy łańcuchów nazw właściwości. Gdy używana jest opcja `expose`, tylko właściwości wyraźnie wymienione na liście zostaną ujawnione w publicznej instancji komponentu.

  Opcja `expose` wpływa tylko na właściwości zdefiniowane przez użytkownika - nie odfiltrowuje wbudowanych właściwości instancji komponentu.

- **Przykład**

  ```js
  export default {
    // tylko `publicMethod` będzie dostępna w instancji publicznej
    expose: ['publicMethod'],
    methods: {
      publicMethod() {
        // ...
      },
      privateMethod() {
        // ...
      }
    }
  }
  ```
