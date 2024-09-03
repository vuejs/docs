# Options: Lifecycle {#options-lifecycle}

:::info Zobacz także
Informacje na temat wspólnego korzystania z haków cyklu życia można znaleźć w [Guide - Lifecycle Hooks](/guide/essentials/lifecycle).
:::

## beforeCreate {#beforecreate}

Wywoływana podczas inicjalizacji instancji.

- **Typ**

  ```ts
  interface ComponentOptions {
    beforeCreate?(this: ComponentPublicInstance): void
  }
  ```

- **Szczegóły**

  Wywoływana natychmiast po zainicjowaniu instancji i rozwiązaniu propsów.

  Następnie propsy zostaną zdefiniowane jako właściwości reaktywne, a stan taki jak `data()` lub `computed` zostanie skonfigurowany.

  Należy pamiętać, że hook `setup()` Composition API jest wywoływany przed jakimikolwiek hookami Options API, nawet przed `beforeCreate()`.

## created {#created}

Wywoływana po zakończeniu przetwarzania przez instancję wszystkich opcji związanych ze stanem.

- **Typ**

  ```ts
  interface ComponentOptions {
    created?(this: ComponentPublicInstance): void
  }
  ```

- **Szczegóły**

  Gdy ten hook jest wywoływany, skonfigurowane zostały następujące elementy: dane reaktywne, obliczone właściwości, metody i watchery. Jednak faza montowania nie została jeszcze rozpoczęta, a właściwość `$el` nie będzie jeszcze dostępna.

## beforeMount {#beforemount}

Wywoływana tuż przed zamontowaniem komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    beforeMount?(this: ComponentPublicInstance): void
  }
  ```

- **Szczegóły**

  Gdy ta metoda jest wywoływana, komponent zakończył ustawianie swojego stanu reaktywnego, ale żadne węzły DOM nie zostały jeszcze utworzone. Ma on zamiar wykonać swój efekt renderowania DOM po raz pierwszy.

  **Ta metoda nie jest wywoływana podczas renderowania po stronie serwera.**

## mounted {#mounted}

Wywoływana po zamontowaniu komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    mounted?(this: ComponentPublicInstance): void
  }
  ```

- **Szczegóły**

  Komponent jest uważany za zamontowany, gdy

  - Wszystkie jego synchroniczne komponenty podrzędne zostały zamontowane (nie obejmuje komponentów asynchronicznych lub komponentów wewnątrz drzew `<Suspense>`).

  - Jego własne drzewo DOM zostało utworzone i wstawione do kontenera nadrzędnego. Uwaga: gwarantuje to, że drzewo DOM komponentu jest w dokumencie tylko wtedy, gdy główny kontener aplikacji jest również w dokumencie.

  Ta metoda jest zwykle używana do wykonywania efektów ubocznych, które wymagają dostępu do renderowanego DOM komponentu lub do ograniczania kodu związanego z DOM do klienta w [aplikacji renderowanej na serwerze](/guide/scaling-up/ssr).

  **Ta metoda nie jest wywoływana podczas renderowania po stronie serwera.**

## beforeUpdate {#beforeupdate}

Wywoływana tuż przed tym, jak komponent ma zaktualizować swoje drzewo DOM z powodu reaktywnej zmiany stanu.

- **Typ**

  ```ts
  interface ComponentOptions {
    beforeUpdate?(this: ComponentPublicInstance): void
  }
  ```

- **Szczegóły**

  Ta metoda może być użyta do uzyskania dostępu do stanu DOM, zanim Vue zaktualizuje DOM. Bezpieczne jest również modyfikowanie stanu komponentu wewnątrz tej metody.

  **Ta metoda nie jest wywoływana podczas renderowania po stronie serwera.**

## updated {#updated}

Wywoływana po tym, jak komponent zaktualizuje swoje drzewo DOM z powodu reaktywnej zmiany stanu.

- **Typ**

  ```ts
  interface ComponentOptions {
    updated?(this: ComponentPublicInstance): void
  }
  ```

- **Szczegóły**

  Metoda updated komponentu nadrzędnego jest wywoływany po metodach jego komponentów podrzędnych.

  Ta metoda jest wywoływana po każdej aktualizacji DOM komponentu, która może być spowodowana różnymi zmianami stanu. Jeśli chcesz uzyskać dostęp do zaktualizowanego DOM po określonej zmianie stanu, użyj zamiast tego [nextTick()](/api/general#nexttick).

  **Ta metoda nie jest wywoływana podczas renderowania po stronie serwera.**

  :::warning
  Nie zmieniaj stanu komponentu w zaktualizowanym haku - prawdopodobnie doprowadzi to do nieskończonej pętli aktualizacji!
  :::

## beforeUnmount {#beforeunmount}

Wywoływana tuż przed odmontowaniem instancji komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    beforeUnmount?(this: ComponentPublicInstance): void
  }
  ```

- **Szczegóły**

  Po wywołaniu tej metody instancja komponentu jest nadal w pełni funkcjonalna.

  **Ta metoda nie jest wywoływana podczas renderowania po stronie serwera.**

## unmounted {#unmounted}

Wywoływana po odmontowaniu komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    unmounted?(this: ComponentPublicInstance): void
  }
  ```

- **Szczegóły**

  Komponent jest uważany za odmontowany, gdy

  - Wszystkie jego komponenty podrzędne zostały odmontowane.

  - Wszystkie powiązane z nim efekty reaktywne (efekt renderowania i computed / watchery utworzone podczas `setup()`) zostały zatrzymane.

  Użyj tej metody, aby wyczyścić ręcznie utworzone efekty uboczne, takie jak timery, detektory zdarzeń DOM lub połączenia z serwerem.

  **Ta metoda nie jest wywoływana podczas renderowania po stronie serwera.**

## errorCaptured {#errorcaptured}

Wywoływana po przechwyceniu błędu propagującego się z komponentu potomnego.

- **Typ**

  ```ts
  interface ComponentOptions {
    errorCaptured?(
      this: ComponentPublicInstance,
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ): boolean | void
  }
  ```

- **Szczegóły**

  Błędy mogą być przechwytywane z następujących źródeł:

  - Renderowanie komponentów
  - Programy obsługi zdarzeń
  - Metody cyklu życia
  - Funkcja `setup()`
  - Watchery
  - Niestandardowe metody dyrektyw
  - Metody przejściowe

  Metoda otrzymuje trzy argumenty: błąd, instancję komponentu, która wywołała błąd oraz ciąg informacyjny określający typ źródła błędu.

  :::tip
  W produkcji trzeci argument (`info`) będzie skróconym kodem zamiast pełnego ciągu informacyjnego. Mapowanie kodu na ciąg znaków można znaleźć w [Production Error Code Reference](/error-reference/#runtime-errors).
  :::

  Możesz zmodyfikować stan komponentu w `errorCaptured()`, aby wyświetlić stan błędu użytkownikowi. Ważne jest jednak, aby stan błędu nie renderował oryginalnej zawartości, która spowodowała błąd; w przeciwnym razie komponent zostanie wrzucony w nieskończoną pętlę renderowania.

  Metoda może zwrócić wartość `false`, aby zatrzymać dalszą propagację błędu. Zobacz szczegóły propagacji błędów poniżej.

  **Reguły propagacji błędów**

  - Domyślnie wszystkie błędy są nadal wysyłane do [`app.config.errorHandler`] na poziomie aplikacji (/api/application#app-config-errorhandler), jeśli jest on zdefiniowany, dzięki czemu błędy te mogą być nadal zgłaszane do usługi analitycznej w jednym miejscu.

  - Jeśli w łańcuchu dziedziczenia lub łańcuchu nadrzędnym komponentu istnieje wiele metod `errorCaptured`, wszystkie z nich zostaną wywołane w przypadku tego samego błędu, w kolejności od dołu do góry. Jest to podobne do mechanizmu bubbling natywnych zdarzeń DOM.

  - Jeśli metoda `errorCaptured` sama rzuci błąd, zarówno ten błąd, jak i oryginalny przechwycony błąd są wysyłane do `app.config.errorHandler`.

  - Metoda `errorCaptured` może zwrócić `false`, aby zapobiec dalszemu rozprzestrzenianiu się błędu. Jest to zasadniczo powiedzenie „ten błąd został obsłużony i powinien zostać zignorowany”. Zapobiegnie to wywołaniu dodatkowych metod `errorCaptured` lub `app.config.errorHandler` dla tego błędu.

## renderTracked <sup class="vt-badge dev-only" /> {#rendertracked}

Wywoływana, gdy zależność reaktywna została namierzona przez efekt renderowania komponentu.

**Ta metoda jest dostępna tylko w trybie deweloperskim i nie jest wywoływana podczas renderowania po stronie serwera.**

- **Typ**

  ```ts
  interface ComponentOptions {
    renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **Zobacz również** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## renderTriggered <sup class="vt-badge dev-only" /> {#rendertriggered}

Wywoływana, gdy zależność reaktywna wyzwala ponowne uruchomienie efektu renderowania komponentu.

**Ta metoda jest dostępna tylko w trybie deweloperskim i nie jest wywoływana podczas renderowania po stronie serwera.**

- **Typ**

  ```ts
  interface ComponentOptions {
    renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

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

- **Zobacz również** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## activated {#activated}

Wywoływana po wstawieniu instancji komponentu do DOM jako część drzewa buforowanego przez [`<KeepAlive>`] (/api/built-in-components#keepalive).

**Ta metoda nie jest wywoływana podczas renderowania po stronie serwera.**

- **Typ**

  ```ts
  interface ComponentOptions {
    activated?(this: ComponentPublicInstance): void
  }
  ```

- **Zobacz również** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## deactivated {#deactivated}

Wywoływana po usunięciu instancji komponentu z DOM jako części drzewa buforowanego przez [`<KeepAlive>`](/api/built-in-components#keepalive).

**Ta metoda nie jest wywoływana podczas renderowania po stronie serwera.**

- **Type**

  ```ts
  interface ComponentOptions {
    deactivated?(this: ComponentPublicInstance): void
  }
  ```

- **Zobacz również** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## serverPrefetch <sup class="vt-badge" data-text="SSR only" /> {#serverprefetch}

Funkcja asynchroniczna, która ma zostać rozwiązana przed wyrenderowaniem instancji komponentu na serwerze.

- **Typ**

  ```ts
  interface ComponentOptions {
    serverPrefetch?(this: ComponentPublicInstance): Promise<any>
  }
  ```

- **Szczegóły**

  Jeśli hak zwróci obietnicę, renderer serwera poczeka, aż obietnica zostanie rozwiązana przed wyrenderowaniem komponentu.

  Ten hak jest wywoływany tylko podczas renderowania po stronie serwera i może być używany do pobierania danych tylko z serwera.

- **Przykład**

  ```js
  export default {
    data() {
      return {
        data: null
      }
    },
    async serverPrefetch() {
      // komponent jest renderowany jako część początkowego żądania
      // wstępne pobieranie danych na serwerze, ponieważ jest to szybsze niż na kliencie
      this.data = await fetchOnServer(/* ... */)
    },
    async mounted() {
      if (!this.data) {
        // jeśli dane mają wartość null podczas montowania, oznacza to, że komponent
        // jest dynamicznie renderowany na kliencie. Zamiast tego należy wykonać
        // pobieranie po stronie klienta.
        this.data = await fetchOnClient(/* ... */)
      }
    }
  }
  ```

- **Zobacz również** [Server-Side Rendering](/guide/scaling-up/ssr)
