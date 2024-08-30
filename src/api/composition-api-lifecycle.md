# Composition API: Lifecycle Hooks {#composition-api-lifecycle-hooks}

:::info Uwaga dotycząca użycia
Wszystkie API wymienione na tej stronie muszą być wywoływane synchronicznie podczas fazy `setup()` komponentu. Więcej szczegółów można znaleźć w [Poradnik - Funckje cyklu życia](/guide/essentials/lifecycle).
:::

## onMounted() {#onmounted}

Rejestruje wywołanie zwrotne, które zostanie wywołane po zamontowaniu komponentu.

- **Typ**

  ```ts
  function onMounted(callback: () => void): void
  ```

- **Szczegóły**

  Komponent jest uważany za zamontowany, gdy:

  - Wszystkie jego synchroniczne komponenty podrzędne zostały zamontowane (nie obejmuje komponentów asynchronicznych lub komponentów wewnątrz drzew `<Suspense>`).

  - Jego własne drzewo DOM zostało utworzone i wstawione do kontenera nadrzędnego. Uwaga: gwarantuje to, że drzewo DOM komponentu jest w dokumencie tylko wtedy, gdy główny kontener aplikacji jest również w dokumencie.

  Ta funkcja jest zwykle używana do wykonywania efektów ubocznych, które wymagają dostępu do renderowanego DOM komponentu lub do ograniczania kodu związanego z DOM do klienta w [aplikacji renderowanej na serwerze](/guide/scaling-up/ssr).

  **Ta funkcja nie jest wywoływana podczas renderowania po stronie serwera.**

- **Przykład**

  Dostęp do elementu poprzez odniesienie do szablonu:

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const el = ref()

  onMounted(() => {
    el.value // <div>
  })
  </script>

  <template>
    <div ref="el"></div>
  </template>
  ```

## onUpdated() {#onupdated}

Rejestruje wywołanie zwrotne, które ma zostać wykonane po zaktualizowaniu drzewa DOM przez komponent w wyniku reaktywnej zmiany stanu.

- **Typ**

  ```ts
  function onUpdated(callback: () => void): void
  ```

- **Szczegóły**

Ta funckja komponentu nadrzędnego jest wywoływana po funkcjach komponentów podrzędnych.

Ta funkcja jest wywoływany po każdej aktualizacji DOM komponentu, która może być spowodowana różnymi zmianami stanu, ponieważ wiele zmian stanu może być grupowanych w jednym cyklu renderowania ze względu na wydajność. Jeśli potrzebujesz dostępu do zaktualizowanego DOM po określonej zmianie stanu, użyj zamiast tego [nextTick()](/api/general#nexttick).

 **Ta funkcja nie jest wywoływana podczas renderowania po stronie serwera.**

:::warning
Nie zmieniaj stanu komponentu w aktualizowanym haku - prawdopodobnie doprowadzi to do nieskończonej pętli aktualizacji!
:::

- **Przykład**

  Dostęp do zaktualizowanego DOM:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // zawartość tekstowa powinna być taka sama jak bieżąca `count.value`
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## onUnmounted() {#onunmounted}

Rejestruje wywołanie zwrotne, które ma zostać wykonane po odmontowaniu komponentu.

- **Typ**

  ```ts
  function onUnmounted(callback: () => void): void
  ```

- **Szczegóły**

  Komponent jest uważany za odmontowany po:

  - Odmontowaniu wszystkich jego komponentów podrzędnych.

  - Zatrzymaniu wszystkich powiązanych efektów reaktywnych (efektów renderowania i computed/watchers utworzonych podczas `setup()`).

  Użyj tej funkcji, aby wyczyścić ręcznie utworzone efekty uboczne, takie jak timery, nasłuchiwacze zdarzeń DOM lub połączenia z serwerem.

  **Ten hak nie jest wywoływany podczas renderowania po stronie serwera.**

- **Przykład**

  ```vue
  <script setup>
  import { onMounted, onUnmounted } from 'vue'

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    })
  })

  onUnmounted(() => clearInterval(intervalId))
  </script>
  ```

## onBeforeMount() {#onbeforemount}

Rejestruje funkcje, która ma zostać wywołana tuż przed zamontowaniem komponentu.

- **Typ**

  ```ts
  function onBeforeMount(callback: () => void): void
  ```

- **Szczegóły**

  Gdy ta funkcja jest wywoływana, komponent zakończył ustawianie swojego stanu reaktywnego, ale nie utworzono jeszcze żadnych węzłów DOM. Zamierza wykonać swój efekt renderowania DOM po raz pierwszy.

  **Ta funkcja nie jest wywoływana podczas renderowania po stronie serwera.**

## onBeforeUpdate() {#onbeforeupdate}

Rejestruje funkcje, która ma zostać wywołana tuż przed tym, jak komponent będzie aktualizował swoje drzewo DOM ze względu na reaktywną zmianę stanu.

- **Typ**

  ```ts
  function onBeforeUpdate(callback: () => void): void
  ```

- **Szczegóły**

  Ta funkcja może być użyta aby uzsykać dostęp do stanu DOM zanim Vue zaktualizuje DOM. Można również bezpiecznie modyfikować stan komponentu wewnątrz tej funkcji.

  **Ta funkcja nie jest wywoływana podczas renderowania po stronie serwera.**

## onBeforeUnmount() {#onbeforeunmount}

Rejestruje funkcję, która ma zostać wywołana tuż przed odmontowaniem instancji komponentu.

- **Typ**

  ```ts
  function onBeforeUnmount(callback: () => void): void
  ```

- **Szczegóły**

  Po wywołaniu tej funkcji instancja komponentu pozostaje w pełni funkcjonalna.

  **Ta funkcja nie jest wywoływana podczas renderowania po stronie serwera.**

## onErrorCaptured() {#onerrorcaptured}

Rejestruje funkcje, która ma zostać wywołana, gdy zostanie przechwycony błąd propagowany z komponentu potomnego.

- **Typ**

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **Szczegóły**

  Błędy mogą być przechwytywane z następujących źródeł:

  - Renderowanie komponentów
  - Obsługujące zdarzenia
  - Funkcje cyklu życia
  - Funkcja `setup()`
  - Watchers
  - Funkcje dyrektyw niestandardowych
  - Funkcje przejścia

  Funkcja otrzymuje trzy argumenty: błąd, wystąpienie komponentu, które wywołało błąd, oraz ciąg informacyjny określający typ źródła błędu.

  :::tip
  W produkcji, 3. argument (`info`) będzie skróconym kodem zamiast pełnego ciągu informacyjnego. Mapowanie kodu do ciągu można znaleźć w [Odniesienie do kodu błędu produkcyjnego](/error-reference/#runtime-errors).
  :::

  Możesz zmodyfikować stan komponentu w `errorCaptured()`, aby wyświetlić użytkownikowi stan błędu. Ważne jest jednak, aby stan błędu nie renderował oryginalnej zawartości, która spowodowała błąd; w przeciwnym razie komponent zostanie wrzucony do nieskończonej pętli renderowania.

  Funkcja może zwrócić `false`, aby zatrzymać dalsze rozprzestrzenianie się błędu. Zobacz szczegóły propagacji błędu poniżej.

  **Zasady propagacji błędów**

  - Domyślnie wszystkie błędy są nadal wysyłane do [`app.config.errorHandler`](/api/application#app-config-errorhandler) na poziomie aplikacji, jeśli jest zdefiniowany, dzięki czemu błędy te nadal mogą być zgłaszane do usługi analitycznej w jednym miejscu.

  - Jeśli w łańcuchu dziedziczenia komponentu lub łańcuchu nadrzędnym istnieje wiele funkcji `errorCaptured`, wszystkie zostaną wywołane dla tego samego błędu, w kolejności od dołu do góry. Jest to podobne do mechanizmu bąbelkowania natywnych zdarzeń DOM.

  - Jeśli sama funkcja `errorCaptured` zgłasza błąd, zarówno ten błąd, jak i oryginalny przechwycony błąd są wysyłane do `app.config.errorHandler`.

  - Funkcja `errorCaptured` może zwrócić `false`, aby zapobiec dalszemu rozprzestrzenianiu się błędu. To w zasadzie mówi „ten błąd został obsłużony i powinien zostać zignorowany”. Zapobiegnie to wywoływaniu dodatkowych funkcji `errorCaptured` lub `app.config.errorHandler` w przypadku tego błędu.

## onRenderTracked() <sup class="vt-badge dev-only" /> {#onrendertracked}

Rejestruje funkcje debugowania, która ma zostać wywołana, gdy reaktywna zależność została wyśledzona przez efekt renderowania komponentu.

**Ta funckja jest dostępna tylko w trybie deweloperskim i nie jest wywoływany podczas renderowania po stronie serwera.**

- **Typ**

  ```ts
  function onRenderTracked(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **Zobacz również** [Reaktywność w głębi](/guide/extras/reactivity-in-depth)

## onRenderTriggered() <sup class="vt-badge dev-only" /> {#onrendertriggered}

Rejestruje funkcje debugowania, która ma zostać wywołana, gdy zależność reaktywna powoduje ponowne uruchomienie efektu renderowania komponentu.

**Ta funkcja jest dostępna wyłącznie w trybie deweloperskim i nie jest wywoływana podczas renderowania po stronie serwera.**

- **Typ**

  ```ts
  function onRenderTriggered(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **Zobacz również** [Reaktywność w głębi](/guide/extras/reactivity-in-depth)

## onActivated() {#onactivated}

Rejestruje wywołanie zwrotne, które ma zostać wykonane po wstawieniu instancji komponentu do DOM jako części drzewa buforowanego przez [`<KeepAlive>`](/api/built-in-components#keepalive).

**Ta funkcja nie jest wywoływana podczas renderowania po stronie serwera.**

- **Typ**

  ```ts
  function onActivated(callback: () => void): void
  ```

- **Zobacz także** [Poradnik - Cykl życia instancji buforowanej](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## onDeactivated() {#ondeactivated}

Rejestruje wywołanie zwrotne, które ma zostać wykonane po usunięciu instancji komponentu z DOM jako części drzewa buforowanego przez [`<KeepAlive>`](/api/built-in-components#keepalive).

**Ta funkcja nie jest wywoływana podczas renderowania po stronie serwera.**

- **Typ**

  ```ts
  function onDeactivated(callback: () => void): void
  ```

- **Zobacz także** [Poradnik - Cykl życia instancji buforowanej](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## onServerPrefetch() <sup class="vt-badge" data-text="SSR only" /> {#onserverprefetch}

Rejestruje funkcję asynchroniczną, która ma zostać rozwiązana przed renderowaniem instancji komponentu na serwerze.

- **Typ**

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **Szczegóły**

  Jeśli wywołanie zwrotne zwróci Promise, renderer serwera będzie czekał, aż Promise zostanie rozwiązany, zanim wyrenderuje komponent.

  Ten hak jest wywoływany tylko podczas renderowania po stronie serwera i może być używany do wykonywania pobierania danych tylko z serwera.

- **Przykład**

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // component is rendered as part of the initial request
    // pre-fetch data on server as it is faster than on the client
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // if data is null on mount, it means the component
      // is dynamically rendered on the client. Perform a
      // client-side fetch instead.
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **Zobacz także** [Renderowanie po stronie serwera](/guide/scaling-up/ssr)
