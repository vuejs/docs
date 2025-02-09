# Reactivity API: Utilities {#reactivity-api-utilities}

## isRef() {#isref}

Sprawdza, czy wartość jest obiektem ref.

- **Typ**

  ```ts
  function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
  ```

  Zwróć uwagę, że typ zwracany jest [predykatem typu](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates), co oznacza, że `isRef` może być użyte jako strażnik typu:

  ```ts
  let foo: unknown
  if (isRef(foo)) {
    // typ foo jest zawężony do Ref<nieznany>
    foo.value
  }
  ```

## unref() {#unref}

Zwraca wewnętrzną wartość, jeśli argument jest ref, w przeciwnym razie zwraca sam argument. Jest to funkcja uproszczona dla `val = isRef(val) ? val.value : val`.

- **Typ**

  ```ts
  function unref<T>(ref: T | Ref<T>): T
  ```

- **Przykład**

  ```ts
  function useFoo(x: number | Ref<number>) {
    const unwrapped = unref(x)
    // rozpakowany jest teraz gwarantowanym numerem
  }
  ```

## toRef() {#toref}

Może być używany do normalizowania wartości / referencji / getterów do referencji (3.3+).

Może być również używany do tworzenia referencji dla właściwości w źródłowym obiekcie reaktywnym. Utworzona referencja jest zsynchronizowana z jej właściwością źródłową: mutacja właściwości źródłowej zaktualizuje referencję i odwrotnie.

- **Typ**

  ```ts
  // sygnatura normalizacji (3.3+)
  function toRef<T>(
    value: T
  ): T extends () => infer R
    ? Readonly<Ref<R>>
    : T extends Ref
    ? T
    : Ref<UnwrapRef<T>>

  // sygnatura właściwości obiektu
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```

- **Przykład**

  Sygnatura normalizacji (3.3+):

  ```js
  // zwraca istniejące referencje bez zmian
  toRef(existingRef)

  // tworzy referencję tylko do odczytu, która wywołuje getter przy dostępie do .value
  toRef(() => props.foo)

  // tworzy normalne referencje z wartości niefunkcyjnych
  // odpowiednik ref(1)
  toRef(1)
  ```

  Sygnatura właściwości obiektu:

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // dwukierunkowy ref, który synchronizuje się z oryginalną właściwością
  const fooRef = toRef(state, 'foo')

  // mutacja ref aktualizuje oryginał
  fooRef.value++
  console.log(state.foo) // 2

  // mutacja oryginału również aktualizuje ref
  state.foo++
  console.log(fooRef.value) // 3
  ```

  Należy zauważyć, że różni się to od:

  ```js
  const fooRef = ref(state.foo)
  ```

  Powyższy ref **nie jest** zsynchronizowany z `state.foo`, ponieważ `ref()` otrzymuje zwykłą wartość liczbową.

  Funkcja `toRef()` jest przydatna, gdy chcesz przekazać ref właściwości do funkcji composable:

  ```vue
  <script setup>
  import { toRef } from 'vue'

  const props = defineProps(/* ... */)

  // przekonwertować `props.foo` na ref, a następnie przekazać do
  // composable
  useSomeFeature(toRef(props, 'foo'))

  // składnia gettera - zalecana w wersji 3.3+
  useSomeFeature(toRef(() => props.foo))
  </script>
  ```

  Gdy `toRef` jest używane z props komponentów, zwykłe ograniczenia dotyczące mutowania rekwizytów nadal mają zastosowanie. Próba przypisania nowej wartości do ref jest równoznaczna z próbą bezpośredniej modyfikacji props i nie jest dozwolona. W takim scenariuszu możesz rozważyć użycie [`computed`](./reactivity-core#computed) z `get` i `set` zamiast tego. Więcej informacji można znaleźć w poradniku do [używania `v-model` z komponentami](/guide/components/v-model).

  Podczas używania sygnatury właściwości obiektu, `toRef()` zwróci użyteczny ref, nawet jeśli właściwość źródłowa aktualnie nie istnieje. Umożliwia to pracę z opcjonalnymi właściwościami, które nie zostałyby wychwycone przez [`toRefs`](#torefs).

## toValue() <sup class="vt-badge" data-text="3.3+" /> {#tovalue}

Normalizuje wartości / referencje / gettery do wartości. Jest to podobne do [unref()](#unref), z wyjątkiem tego, że normalizuje również gettery. Jeśli argument jest getterem, zostanie on wywołany i zwrócona zostanie jego wartość.

Można tego użyć w [Composables](/guide/reusability/composables.html) do normalizacji argumentu, który może być wartością, ref lub getterem.

- **Typ**

  ```ts
  function toValue<T>(source: T | Ref<T> | (() => T)): T
  ```

- **Przykład**

  ```js
  toValue(1) //       --> 1
  toValue(ref(1)) //  --> 1
  toValue(() => 1) // --> 1
  ```

  Normalizacja argumentów w composables:

  ```ts
  import type { MaybeRefOrGetter } from 'vue'

  function useFeature(id: MaybeRefOrGetter<number>) {
    watch(() => toValue(id), id => {
      // reaguje na zmiany id
    })
  }

  // ten composable obsługuje dowolną z poniższych funkcji:
  useFeature(1)
  useFeature(ref(1))
  useFeature(() => 1)
  ```

## toRefs() {#torefs}

Konwertuje obiekt reaktywny na zwykły obiekt, w którym każda właściwość obiektu wynikowego jest refem wskazującym na odpowiednią właściwość oryginalnego obiektu. Każdy indywidualny ref jest tworzony przy użyciu [`toRef()`](#toref).

- **Typ**

  ```ts
  function toRefs<T extends object>(
    object: T
  ): {
    [K in keyof T]: ToRef<T[K]>
  }

  type ToRef = T extends Ref ? T : Ref<T>
  ```

- **Przykład**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const stateAsRefs = toRefs(state)
  /*
  Typ stateAsRefs: {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */

  // Ref i oryginalna właściwość są „połączone”
  state.foo++
  console.log(stateAsRefs.foo.value) // 2

  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

  Funkcja `toRefs` jest przydatna podczas zwracania reaktywnego obiektu z funkcji composable, dzięki czemu komponent który używa wspomnianej funkcji może zniszczyć/rozłożyć zwrócony obiekt bez utraty reaktywności:

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    // ...logika operująca na stanie

    // konwersja na refs po powrocie
    return toRefs(state)
  }

  // może ulec destrukcji bez utraty reaktywności
  const { foo, bar } = useFeatureX()
  ```

  `toRefs` wygeneruje referencje tylko dla właściwości, które są wyliczalne na obiekcie źródłowym w czasie wywołania. Aby utworzyć ref dla właściwości, która może jeszcze nie istnieć, należy użyć [`toRef`](#toref).

## isProxy() {#isproxy}

Sprawdza, czy obiekt jest proxy utworzonym przez [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](./reactivity-advanced#shallowreactive) lub [`shallowReadonly()`](./reactivity-advanced#shallowreadonly).

- **Typ**

  ```ts
  function isProxy(value: any): boolean
  ```

## isReactive() {#isreactive}

Sprawdza, czy obiekt jest proxy utworzonym przez [`reactive()`](./reactivity-core#reactive) lub [`shallowReactive()`](./reactivity-advanced#shallowreactive).

- **Typ**

  ```ts
  function isReactive(value: unknown): boolean
  ```

## isReadonly() {#isreadonly}

Sprawdza, czy przekazana wartość jest obiektem tylko do odczytu. Właściwości obiektu readonly mogą się zmieniać, ale nie mogą być przypisywane bezpośrednio przez przekazany obiekt.

Proxy utworzone przez [`readonly()`](./reactivity-core#readonly) i [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) są uważane za readonly, podobnie jak [`computed()`](./reactivity-core#computed) bez funkcji `set`.

- **Typ**

  ```ts
  function isReadonly(value: unknown): boolean
  ```
