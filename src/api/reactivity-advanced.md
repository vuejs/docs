# Reactivity API: Advanced {#reactivity-api-advanced}

## shallowRef() {#shallowref}

Płytka wersja [`ref()`](./reactivity-core#ref).

- **Typ**

  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```

- **Szczegóły**

  W przeciwieństwie do `ref()`, wewnętrzna wartość płytkiego ref jest przechowywana i eksponowana tak jak jest, i nie będzie głęboko reaktywna. Tylko dostęp do `.value` jest reaktywny.

  Funkcja `shallowRef()` jest zwykle używana do optymalizacji wydajności dużych struktur danych lub integracji z zewnętrznymi systemami zarządzania stanem.

- **Przykład**

  ```js
  const state = shallowRef({ count: 1 })

  // NIE powoduje zmiany
  state.value.count = 2

  // powoduje zmiany
  state.value = { count: 2 }
  ```

- **Zobacz również**
  - [Poradnik - Redukcja narzutu reaktywności dla dużych, niezmiennych struktur](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
  - [Poradnik - Integracja z zewnętrznymi systemami do zarządzania stanem](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

## triggerRef() {#triggerref}

Wymusza wyzwalanie efektów zależnych od [shallow ref](#shallowref). Jest to zwykle używane po dokonaniu głębokich mutacji do wewnętrznej wartości płytkiej referencji.

- **Typ**

  ```ts
  function triggerRef(ref: ShallowRef): void
  ```

- **Przykład**

  ```js
  const shallow = shallowRef({
    greet: 'Hello, world'
  })

  // wyświetla „Hello, world” raz przy pierwszym uruchomieniu
  watchEffect(() => {
    console.log(shallow.value.greet)
  })

  // Nie wywoła to efektu, ponieważ ref jest płytki
  shallow.value.greet = 'Hello, universe'

  // wyświetla „Witaj, wszechświecie”
  triggerRef(shallow)
  ```

## customRef() {#customref}

Tworzy niestandardowy ref z wyraźną kontrolą nad śledzeniem zależności i wyzwalaniem aktualizacji.

- **Typ**

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  type CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

- **Szczegóły**

  Funkcja `customRef()` oczekuje funkcji fabryki, która otrzymuje funkcje `track` i `trigger` jako argumenty i powinna zwrócić obiekt z metodami `get` i `set`.

  Ogólnie rzecz biorąc, `track()` powinien być wywoływany wewnątrz `get()`, a `trigger()` powinien być wywoływany wewnątrz `set()`. Jednakże, masz pełną kontrolę nad tym, kiedy powinny być one wywoływane lub czy w ogóle powinny być wywoływane.

- **Przykład**

  Tworzenie debounced ref, który aktualizuje wartość dopiero po upływie określonego czasu od ostatniego wywołania set:

  ```js
  import { customRef } from 'vue'

  export function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  ```

  Użycie w komponencie:

  ```vue
  <script setup>
  import { useDebouncedRef } from './debouncedRef'
  const text = useDebouncedRef('hello')
  </script>

  <template>
    <input v-model="text" />
  </template>
  ```

  [Wypróbuj na placu zabaw](https://play.vuejs.org/#eNplUkFugzAQ/MqKC1SiIekxIpEq9QVV1BMXCguhBdsyaxqE/PcuGAhNfYGd3Z0ZDwzeq1K7zqB39OI205UiaJGMOieiapTUBAOYFt/wUxqRYf6OBVgotGzA30X5Bt59tX4iMilaAsIbwelxMfCvWNfSD+Gw3++fEhFHTpLFuCBsVJ0ScgUQjw6Az+VatY5PiroHo3IeaeHANlkrh7Qg1NBL43cILUmlMAfqVSXK40QUOSYmHAZHZO0KVkIZgu65kTnWp8Qb+4kHEXfjaDXkhd7DTTmuNZ7MsGyzDYbz5CgSgbdppOBFqqT4l0eX1gZDYOm057heOBQYRl81coZVg9LQWGr+IlrchYKAdJp9h0C6KkvUT3A6u8V1dq4ASqRgZnVnWg04/QWYNyYzC2rD5Y3/hkDgz8fY/cOT1ZjqizMZzGY3rDPC12KGZYyd3J26M8ny1KKx7c3X25q1c1wrZN3L9LCMWs/+AmeG6xI=)

  :::warning Używaj z rozwagą
  Używając customRef, powinniśmy zachować ostrożność co do wartości zwracanej przez jego getter, szczególnie podczas generowania nowych typów danych obiektów za każdym razem, gdy getter jest uruchamiany. Ma to wpływ na relację między komponentami nadrzędnymi i podrzędnymi, gdzie taki customRef został przekazany jako właściwość.

  Funkcja renderowania komponentu nadrzędnego może zostać wywołana przez zmiany w innym stanie reaktywnym. Podczas ponownego renderowania wartość naszego customRef jest ponownie oceniana, zwracając nowy typ danych obiektu jako właściwość do komponentu podrzędnego. Ta właściwość jest porównywana z jej ostatnią wartością w komponencie potomnym, a ponieważ są one różne, zależności reaktywne customRef są uruchamiane w komponencie potomnym. W międzyczasie zależności reaktywne w komponencie nadrzędnym nie są uruchamiane, ponieważ setter customRef nie został wywołany, a jego zależności nie zostały w rezultacie uruchomione.

  [Zobacz na placu zabaw](https://play.vuejs.org/#eNqFVEtP3DAQ/itTS9Vm1ZCt1J6WBZUiDvTQIsoNcwiOkzU4tmU7+9Aq/71jO1mCWuhlN/PyfPP45kAujCk2HSdLsnLMCuPBcd+Zc6pEa7T1cADWOa/bW17nYMPPtvRsDT3UVrcww+DZ0flStybpKSkWQQqPU0IVVUwr58FYvdvDWXgpu6ek1pqSHL0fS0vJw/z0xbN1jUPHY/Ys87Zkzzl4K5qG2zmcnUN2oAqg4T6bQ/wENKNXNk+CxWKsSlmLTSk7XlhedYxnWclYDiK+MkQCoK4wnVtnIiBJuuEJNA2qPof7hzkEoc8DXgg9yzYTBBFgNr4xyY4FbaK2p6qfI0iqFgtgulOe27HyQRy69Dk1JXY9C03JIeQ6wg4xWvJCqFpnlNytOcyC2wzYulQNr0Ao+Mhw0KnTTEttl/CIaIJiMz8NGBHFtYetVrPwa58/IL48Zag4N0ssquNYLYBoW16J0vOkC3VQtVqk7cG9QcHz1kj0QAlgVYkNMFk6d0bJ1pbGYKUkmtD42HmvFfi94WhOEiXwjUnBnlEz9OLTJwy5qCo44D4O7en71SIFjI/F9VuG4jEy/GHQKq5hQrJAKOc4uNVighBF5/cygS0GgOMoK+HQb7+EWvLdMM7weVIJy5kXWi0Rj+xaNRhLKRp1IvB9hxYegA6WJ1xkUe9PcF4e9a+suA3YwYiC5MQ79KlFUzw5rZCZEUtoRWuE5PaXCXmxtuWIkpJSSr39EXXHQcWYNWfP/9A/uV3QUXJjueN2E1ZhtPnSIqGS+er3T77D76Ox1VUn0fsd4y3HfewCxuT2vVMVwp74RbTX8WQI1dy5qx12xI1Fpa1K5AreeEHCCN8q/QXul+LrSC3s4nh93jltkVPDIYt5KJkcIKStCReo4rVQ/CZI6dyEzToCCJu7hAtry/1QH/qXncQB400KJwqPxZHxEyona0xS/E3rt1m9Ld1rZl+uhaxecRtP3EjtgddCyimtXyj9H/Ii3eId7uOGTkyk/wOEbQ9h)

  :::

## shallowReactive() {#shallowreactive}

Płytka wersja [`reactive()`](./reactivity-core#reactive).

- **Typ**

  ```ts
  function shallowReactive<T extends object>(target: T): T
  ```

- **Szczegóły**

  W przeciwieństwie do `reactive()`, nie ma głębokiej konwersji: tylko właściwości na poziomie głównym są reaktywne dla płytkiego obiektu reaktywnego. Wartości właściwości są przechowywane i eksponowane tak jak są - oznacza to również, że właściwości z wartościami ref **nie będą** automatycznie rozpakowywane.

  :::warning Używaj z rozwagą
  Płytkie struktury danych powinny być używane tylko dla stanu głównego komponentu. Unikaj zagnieżdżania ich wewnątrz głębokiego obiektu reaktywnego, ponieważ tworzy to drzewo z niespójnym zachowaniem reaktywności, które może być trudne do zrozumienia i debugowania.
  :::

- **Przykład**

  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // mutowanie własnych właściwości stanu jest reaktywne
  state.foo++

  // ...ale nie konwertuje zagnieżdżonego obiektu
  isReactive(state.nested) // false

  // NIE reaktywny
  state.nested.bar++
  ```

## shallowReadonly() {#shallowreadonly}

Płytka wersja [`readonly()`](./reactivity-core#readonly).

- **Typ**

  ```ts
  function shallowReadonly<T extends object>(target: T): Readonly<T>
  ```

- **Szczegóły**

  W przeciwieństwie do `readonly()`, nie ma głębokiej konwersji: tylko właściwości na poziomie głównym są tylko do odczytu. Wartości właściwości są przechowywane i eksponowane tak jak są - oznacza to również, że właściwości z wartościami ref **nie będą** automatycznie rozpakowywane.

  :::warning Używaj z rozwagą
  Płytkie struktury danych powinny być używane tylko dla stanu głównego komponentu. Unikaj zagnieżdżania ich wewnątrz głębokiego obiektu reaktywnego, ponieważ tworzy to drzewo z niespójnym zachowaniem reaktywności, które może być trudne do zrozumienia i debugowania.
  :::

- **Przykład**

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // mutowanie własnych właściwości stanu nie powiedzie się
  state.foo++

  // ...ale działa na obiektach zagnieżdżonych
  isReadonly(state.nested) // false

  // zadziała
  state.nested.bar++
  ```

## toRaw() {#toraw}

Zwraca nieprzetworzony, oryginalny obiekt proxy utworzony przez Vue.

- **Typ**

  ```ts
  function toRaw<T>(proxy: T): T
  ```

- **Szczegóły**

  Funkcja `toRaw()` może zwrócić oryginalny obiekt z proxy utworzony przez [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](#shallowreactive) lub [`shallowReadonly()`](#shallowreadonly).

  Jest to wyjście, które można użyć do tymczasowego odczytu bez ponoszenia kosztów dostępu / śledzenia proxy lub zapisu bez wywoływania zmian. **Nie zaleca się** utrzymywania trwałego odniesienia do oryginalnego obiektu. Należy zachować ostrożność.

- **Przykład**

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo) // true
  ```

## markRaw() {#markraw}

Zaznacza obiekt, aby nigdy nie został przekonwertowany na proxy. Zwraca sam obiekt.

- **Typ**

  ```ts
  function markRaw<T extends object>(value: T): T
  ```

- **Przykład**

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false

  // działa również po zagnieżdżeniu wewnątrz innych obiektów reaktywnych
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

  :::warning Używaj z ostrożnością
  `markRaw()` i płytkie API takie jak `shallowReactive()` pozwalają na selektywną rezygnację z domyślnej głębokiej konwersji reactive/readonly i osadzenie surowych, nieproxowanych obiektów w grafie stanu. Mogą one być używane z różnych powodów:

  - Niektóre wartości po prostu nie powinny być reaktywne, na przykład złożona instancja klasy zewnętrznej bibloteki lub obiekt komponentu Vue.

  - Pominięcie konwersji proxy może zapewnić poprawę wydajności podczas renderowania dużych list z niezmiennymi źródłami danych.

  Są one uważane za zaawansowane, ponieważ surowa rezygnacja jest tylko na poziomie głównym, więc jeśli ustawisz zagnieżdżony, nieoznaczony obiekt surowy w obiekcie reaktywnym, a następnie ponownie uzyskasz do niego dostęp, otrzymasz z powrotem wersję proxy. Może to prowadzić do **zagrożeń tożsamości** - tj. wykonywania operacji, która opiera się na tożsamości obiektu, ale przy użyciu zarówno nieprzetworzonej, jak i proxy wersji tego samego obiektu:

  ```js
  const foo = markRaw({
    nested: {}
  })

  const bar = reactive({
    // chociaż `foo` jest oznaczone jako surowe, foo.nested nie jest.
    nested: foo.nested
  })

  console.log(foo.nested === bar.nested) // false
  ```

  Zagrożenia związane z tożsamością są generalnie rzadkie. Jednak prawidłowe wykorzystanie tych interfejsów API przy jednoczesnym bezpiecznym unikaniu zagrożeń związanych z tożsamością wymaga solidnego zrozumienia sposobu działania systemu reaktywności.

  :::

## effectScope() {#effectscope}

Tworzy obiekt zakresu efektu, który może przechwytywać efekty reaktywne (tj. obliczone i obserwujące) utworzone w nim, dzięki czemu efekty te mogą być usuwane razem. Szczegółowe przypadki użycia tego interfejsu API można znaleźć w odpowiednim dokumencie [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md).

- **Typ**

  ```ts
  function effectScope(detached?: boolean): EffectScope

  interface EffectScope {
    run<T>(fn: () => T): T | undefined // undefined jeśli zakres jest nieaktywny
    stop(): void
  }
  ```

- **Przykład**

  ```js
  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)

    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))
  })

  // aby usunąć wszystkie efekty w zakresie
  scope.stop()
  ```

## getCurrentScope() {#getcurrentscope}

Zwraca bieżący aktywny [zakres efektów](#effectscope), jeśli taki istnieje.

- **Typ**

  ```ts
  function getCurrentScope(): EffectScope | undefined
  ```

## onScopeDispose() {#onscopedispose}

Rejestruje wywołanie zwrotne usuwania dla bieżącego aktywnego [zakresu efektów] (#effectscope). Wywołanie zwrotne zostanie wywołane, gdy powiązany zakres efektów zostanie zatrzymany.

Metoda ta może być używana jako niepowiązana z komponentem zamiana `onUnmounted` w funkcjach composable wielokrotnego użytku, ponieważ funkcja `setup()` każdego komponentu Vue jest również wywoływana w zakresie efektu.

- **Typ**

  ```ts
  function onScopeDispose(fn: () => void): void
  ```
