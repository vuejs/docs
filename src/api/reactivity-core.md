# Reactivity API: Core {#reactivity-api-core}

:::info Zobacz także
Aby lepiej zrozumieć interfejsy API Reactivity, zaleca się przeczytanie następujących rozdziałów przewodnika:

- [Fundamenty reaktywności](/guide/essentials/reactivity-fundamentals) (z preferencją API ustawioną na Composition API)
- [Reaktywność w głębi](/guide/extras/reactivity-in-depth)
  :::

## ref() {#ref}

Przyjmuje wartość wewnętrzną i zwraca reaktywny i mutowalny obiekt ref, który posiada pojedynczą właściwość `.value`, która wskazuje na wartość wewnętrzną.

- **Typ**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **Szczegóły**

  Obiekt ref jest mutowalny - tzn. można przypisywać nowe wartości do `.value`. Jest również reaktywny - tzn. wszelkie operacje odczytu do `.value` są śledzone, a operacje zapisu wywołają powiązane efekty.

  Jeśli obiekt jest przypisany jako wartość ref, obiekt staje się głęboko reaktywny za pomocą [reactive()](#reactive). Oznacza to również, że jeśli obiekt zawiera zagnieżdżone referencje, zostaną one głęboko rozpakowane.

  Aby uniknąć głębokiej konwersji, należy użyć [`shallowRef()`](./reactivity-advanced#shallowref).

- **Przykład**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value = 1
  console.log(count.value) // 1
  ```

- **Zobacz również**
  - [Poradnik - Podstawy reaktywności z `ref()`](/guide/essentials/reactivity-fundamentals#ref)
  - [Poradnik - Wpisywanie `ref()`](/guide/typescript/composition-api#typing-ref) <sup class=„vt-badge ts” />

## computed() {#computed}

Używa funkcji [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) i zwraca reaktywny obiekt [ref](#ref) tylko do odczytu dla wartości zwróconej z funkcji getter. Może również przyjąć obiekt z funkcjami `get` i `set`, aby utworzyć zapisywalny obiekt ref.

- **Type**

  ```ts
  // tylko do odczytu
  function computed<T>(
    getter: (oldValue: T | undefined) => T,
    // Zobacz link „Computed Debugging" poniżej
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // użycie również do zapisu
  function computed<T>(
    options: {
      get: (oldValue: T | undefined) => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **Przykład**

  Tworzenie wyliczanego wskaźnika tylko do odczytu:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // error
  ```

  Tworzenie zapisywalnego obliczonego ref:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  Debugowanie:

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **Zobacz również**
  - [Przewodnik - Właściwości obliczane](/guide/essentials/computed)
  - [Przewodnik - Debugowanie obliczeniowe](/guide/extras/reactivity-in-depth#computed-debugging)
  - [Przewodnik - Wpisywanie `computed()`](/guide/typescript/composition-api#typing-computed) <sup class=„vt-badge ts” />
  - [Przewodnik - Wydajność - Stabilność obliczeniowa](/guide/best-practices/performance#computed-stability) <sup class=„vt-badge” data-text="3.4+” />

## reactive() {#reactive}

Zwraca reaktywne proxy obiektu.

- **Typ**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **Szczegóły**

  Konwersja reaktywna jest „głęboka”: wpływa na wszystkie zagnieżdżone właściwości. Obiekt reaktywny również głęboko rozpakowuje wszelkie właściwości, które są [refs](#ref), zachowując reaktywność.

  Należy również zauważyć, że nie jest wykonywane rozpakowywanie ref, gdy ref jest dostępny jako element reaktywnej tablicy lub natywnego typu kolekcji, takiego jak `Map`.

  Aby uniknąć głębokiej konwersji i zachować reaktywność tylko na poziomie korzenia, należy zamiast tego użyć [shallowReactive()](./reactivity-advanced#shallowreactive).

  Zwrócony obiekt i jego zagnieżdżone obiekty są opakowane w [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) i **nie** są równe oryginalnym obiektom. Zaleca się pracę wyłącznie z reaktywnym proxy i unikanie polegania na oryginalnym obiekcie.

- **Przykład**

  Tworzenie obiektu reaktywnego:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  Rozpakowywanie ref:

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // ref zostanie rozpakowany
  console.log(obj.count === count.value) // true

  // to zaktualizuje `obj.count`
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // zaktualizuje również `count` ref
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  Należy pamiętać, że referencje **nie są** rozpakowywane, gdy są dostępne jako elementy tablicy lub kolekcji:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // .value jest tutaj potrzebne
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // .value jest tutaj potrzebne
  console.log(map.get('count').value)
  ```

  Podczas przypisywania [ref](#ref) do właściwości `reactive`, ten ref również zostanie automatycznie rozpakowany:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **Zobacz również**
  - [Poradnik - Podstawy reaktywności](/guide/essentials/reactivity-fundamentals)
  - [Poradnik - Wpisywanie `reactive()`](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

## readonly() {#readonly}

Pobiera obiekt (reaktywny lub zwykły) lub [ref](#ref) i zwraca tylko do odczytu proxy do oryginału.

- **Typ**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **Szczegóły**

  Proxy tylko do odczytu jest głębokie: każda zagnieżdżona właściwość, do której uzyskano dostęp, będzie również tylko do odczytu. Ma również takie samo zachowanie ref-unwrapping jak `reactive()`, z wyjątkiem tego, że rozpakowane wartości będą również tylko do odczytu.

  Aby uniknąć głębokiej konwersji, należy użyć [shallowReadonly()](./reactivity-advanced#shallowreadonly).

- **Przykład**

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // działa do śledzenia reaktywności
    console.log(copy.count)
  })

  // zmutowanie oryginału spowoduje uruchomienie obserwatorów polegających na kopii
  original.count++

  // zmutowanie kopii nie powiedzie się i spowoduje wyświetlenie ostrzeżenia
  copy.count++ // ostrzeżenie!
  ```

## watchEffect() {#watcheffect}

Natychmiast uruchamia funkcję, jednocześnie reaktywnie śledząc jej zależności i uruchamia ją ponownie, gdy zależności ulegną zmianie.

- **Typ**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): StopHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Sczegóły**

  Pierwszym argumentem jest funkcja efektu, która ma zostać uruchomiona. Funkcja efektu otrzymuje funkcję, która może być użyta do zarejestrowania wywołania zwrotnego czyszczenia. Wywołanie zwrotne czyszczenia zostanie wywołane tuż przed następnym ponownym uruchomieniem efektu i może zostać użyte do wyczyszczenia unieważnionych efektów ubocznych, np. oczekującego żądania asynchronicznego (patrz przykład poniżej).

  Drugim argumentem jest opcjonalny obiekt opcji, który może być użyty do dostosowania czasu spłukiwania efektu lub do debugowania zależności efektu.

  Domyślnie obserwatorzy będą uruchamiani tuż przed renderowaniem komponentu. Ustawienie `flush: 'post'` spowoduje odroczenie obserwatora do czasu po renderowaniu komponentu. Więcej informacji można znaleźć w [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing). W rzadkich przypadkach może być konieczne natychmiastowe uruchomienie obserwatora, gdy zmieni się zależność reaktywna, np. w celu unieważnienia pamięci podręcznej. Można to osiągnąć używając `flush: 'sync'`. Ustawienie to powinno być jednak używane ostrożnie, ponieważ może prowadzić do problemów z wydajnością i spójnością danych, jeśli wiele właściwości jest aktualizowanych w tym samym czasie.

  Wartością zwrotną jest funkcja uchwytu, którą można wywołać w celu zatrzymania ponownego działania efektu.

- **Przykład**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> logs 0

  count.value++
  // -> logs 1
  ```

  Usuwanie skutków ubocznych:

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value)
    // `cancel` zostanie wywołane jeśli `id` ulegnie zmianie
    // poprzednie oczekujące żądanie zostanie anulowane
    // jeśli nie zostało jeszcze zakończone
    onCleanup(cancel)
    data.value = await response
  })
  ```

  Zatrzymanie obserwatora:

  ```js
  const stop = watchEffect(() => {})

  // gdy obserwator nie jest już potrzebny:
  stop()
  ```

  Opcje:

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **Zobacz również**
  - [Poradnik - Watchers](/guide/essentials/watchers#watcheffect)
  - [Poradnik - Debugowanie Watchera](/guide/extras/reactivity-in-depth#watcher-debugging)

## watchPostEffect() {#watchposteffect}

Alias [`watchEffect()`](#watcheffect) z opcją `flush: 'post'`.

## watchSyncEffect() {#watchsynceffect}

Alias [`watchEffect()`](#watcheffect) z opcją `flush: 'sync'`.

## watch() {#watch}

Obserwuje jedno lub więcej reaktywnych źródeł danych i wywołuje funkcję zwrotną, gdy źródła te ulegną zmianie.

- **Typ**

  ```ts
  // obserwowanie pojedynczego źródła
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): StopHandle

  // obserwowanie wielu źródeł
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): StopHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // ref
    | (() => T) // getter
    | T extends object
    ? T
    : never // reactive object

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
    once?: boolean // default: false (3.4+)
  }
  ```

  > Typy są uproszczone dla czytelności.

- **Szczegóły**

  Funkcja `watch()` jest domyślnie lazy - tzn. wywołanie zwrotne jest wywoływane tylko wtedy, gdy obserwowane źródło uległo zmianie.

  Pierwszym argumentem jest **źródło** obserwatora. Źródło może być jednym z poniższych:

  - Funkcja getter zwracająca wartość
  - Ref
  - Obiekt reaktywny
  - ...lub tablicą powyższych.

  Drugim argumentem jest wywołanie zwrotne, które zostanie wywołane po zmianie źródła. Wywołanie zwrotne otrzymuje trzy argumenty: nową wartość, starą wartość i funkcję rejestrującą wywołanie zwrotne czyszczenia efektu ubocznego. Wywołanie zwrotne czyszczenia zostanie wywołane tuż przed następnym ponownym uruchomieniem efektu i może być użyte do wyczyszczenia unieważnionych efektów ubocznych, np. oczekującego żądania asynchronicznego.

  Podczas oglądania wielu źródeł, wywołanie zwrotne otrzymuje dwie tablice zawierające nowe / stare wartości odpowiadające tablicy źródłowej.

  Trzecim opcjonalnym argumentem jest obiekt opcji, który obsługuje następujące opcje:

  - **`immediate`**: wywołanie zwrotne natychmiast po utworzeniu obserwatora. Stara wartość będzie „niezdefiniowana” przy pierwszym wywołaniu.
  - **`deep`**: wymusza głębokie przeszukiwanie źródła, jeśli jest ono obiektem, tak aby wywołanie zwrotne było uruchamiane przy głębokich mutacjach. Zobacz [Deep Watchers](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: dostosowuje czas spłukiwania wywołania zwrotnego. Zobacz [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) i [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: debugowanie zależności watchera. Zobacz [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging).
  - **`once`**: uruchamia wywołanie zwrotne tylko raz. Obserwator jest automatycznie zatrzymywany po pierwszym uruchomieniu wywołania zwrotnego. <sup class=„vt-badge” data-text="3.4+” />

  W porównaniu do [`watchEffect()`](#watcheffect), `watch()` pozwala nam na:

  - Leniwe wykonywanie efektu ubocznego;
  - Bardziej szczegółowe określenie, jaki stan powinien wyzwalać ponowne uruchomienie obserwatora;
  - Dostęp zarówno do poprzedniej, jak i bieżącej wartości obserwowanego stanu.

- **Przykład**

  Obserwowanie gettera:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  Obserwowanie ref:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  Podczas obserwowania wielu źródeł, wywołanie zwrotne otrzymuje tablice zawierające nowe/stare wartości odpowiadające tablicy źródłowej:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  Podczas korzystania ze źródła gettera, watcher uruchamia się tylko wtedy, gdy wartość zwracana gettera uległa zmianie. Jeśli chcesz, aby wywołanie zwrotne było uruchamiane nawet w przypadku głębokich mutacji, musisz jawnie wymusić przejście obserwatora w tryb głęboki za pomocą `{ deep: true }`. W trybie głębokim nowa i stara wartość będą tym samym obiektem, jeśli wywołanie zwrotne zostało wywołane przez głęboką mutację:
  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  Podczas bezpośredniego obserwowania obiektu reaktywnego, obserwator jest automatycznie w trybie głębokim:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* triggers on deep mutation to state */
  })
  ```

  `watch()` dzieli ten sam czas spłukiwania i opcje debugowania z [`watchEffect()`](#watcheffect):

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

  Zatrzymanie obserwatora:

  ```js
  const stop = watch(source, callback)

  // gdy obserwator nie jest już potrzebny:
  stop()
  ```

  Usuwanie skutków ubocznych:

  ```js
  watch(id, async (newId, oldId, onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel` zostanie wywołane, jeśli `id` ulegnie zmianie, anulując
    // poprzednie żądanie, jeśli nie zostało jeszcze zakończone
    onCleanup(cancel)
    data.value = await response
  })
  ```

- **Zobacz również**

  - [Poradnik - Watchers](/guide/essentials/watchers)
  - [Poradnik - Watchers debugowanie](/guide/extras/reactivity-in-depth#watcher-debugging)
