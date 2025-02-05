---
pageClass: api
---

# Built-in Components {#built-in-components}

:::info Rejestracja i użycie
Wbudowane komponenty mogą być używane bezpośrednio w szablonach bez konieczności ich rejestrowania. Są one również tree-shakeable: są dołączane do kompilacji tylko wtedy, gdy są używane.

Podczas korzystania z nich w [render functions](/guide/extras/render-function), muszą one zostać wyraźnie zaimportowane. Na przykład:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

## `<Transition>` {#transition}

Zapewnia animowane efekty przejścia dla **pojedynczego** elementu lub komponentu.

- **Props**

  ```ts
  interface TransitionProps {
    /**
     * Służy do automatycznego generowania nazw klas CSS przejścia.
     * np. `name: 'fade'` automatycznie rozszerzy się do `.fade-enter`,
     * `.fade-enter-active`, itd.
     */
    name?: string
    /**
     * Czy stosować klasy przejścia CSS.
     * Domyślnie: true
     */
    css?: boolean
    /**
     * Określa typ zdarzeń przejścia, na które należy czekać, aby
     * określić czas zakończenia przejścia.
     * Domyślnym zachowaniem jest automatyczne wykrywanie typu, który ma
     * dłuższy czas trwania.
     */
    type?: 'transition' | 'animation'
    /**
     * Określa jawny czas trwania przejścia.
     * Domyślnym zachowaniem jest oczekiwanie na pierwsze zdarzenie `transitionend`
     * lub `animationend` na głównym elemencie przejścia.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * Kontroluje sekwencję czasową opuszczania/wchodzenia przejść.
     * Domyślnym zachowaniem jest jednoczesne.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * Czy zastosować przejście przy początkowym renderowaniu.
     * Domyślnie: false
     */
    appear?: boolean

    /**
     * Rekwizyty do dostosowywania klas przejścia.
     * Używanie kebab-case w szablonach, np. enter-from-class=„xxx”.
     */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **Zdarzenia**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (`v-show` only)
  - `@appear-cancelled`

- **Przykład**

  Prosty element:

  ```vue-html
  <Transition>
    <div v-if="ok">toggled content</div>
  </Transition>
  ```

  Wymuszenie przejścia poprzez zmianę atrybutu `key`:

  ```vue-html
  <Transition>
    <div :key="text">{{ text }}</div>
  </Transition>
  ```

  Komponent dynamiczny, z trybem przejścia + animacja po pojawieniu się:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  Słuchanie wydarzeń przejściowych:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">toggled content</div>
  </Transition>
  ```

- **Zobacz również** [Guide - Transition](/guide/built-ins/transition)

## `<TransitionGroup>` {#transitiongroup}

Zapewnia efekty przejścia dla **wielu** elementów lub komponentów na liście.

- **Props**

  `<TransitionGroup>` akceptuje te same rekwizyty co `<Transition>` z wyjątkiem `mode`, plus dwa dodatkowe rekwizyty:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * Jeśli nie zostanie zdefiniowana, będzie renderowana jako fragment.
     */
    tag?: string
    /**
     * Aby dostosować klasę CSS stosowaną podczas przejść.
     * Użyj kebab-case w szablonach, np. move-class=„xxx”.
     */
    moveClass?: string
  }
  ```

- **Zdarzenia**

  `<TransitionGroup>` emituje te same zdarzenia co `<Transition>`.

- **Szczegóły**

  Domyślnie, `<TransitionGroup>` nie renderuje elementu DOM, ale można go zdefiniować za pomocą właściwości `tag`.

  Zauważ, że każde dziecko w `<transition-group>` musi posiadać [**unikalny klucz**](/guide/essentials/list#maintaining-state-with-key) by animacje działały poprawnie.

  `<TransitionGroup>` wspiera przenoszenie przejść poprzez transformację CSS. Gdy pozycja dziecka na ekranie zmieni się po aktualizacji, zostanie do niego zastosowana ruchoma klasa CSS (automatycznie wygenerowana z atrybutu `name` lub skonfigurowana za pomocą właściwości `move-class`). Jeśli właściwość CSS `transform` jest „transition-able”, gdy zastosowana jest ruchoma klasa, element zostanie płynnie animowany do miejsca docelowego przy użyciu techniki [FLIP](https://aerotwist.com/blog/flip-your-animations/).

- **Przykład**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **Zobacz również** [Guide - TransitionGroup](/guide/built-ins/transition-group)

## `<KeepAlive>` {#keepalive}

Buforuje dynamicznie przełączane komponenty zawinięte wewnątrz.

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * Jeśli określono, tylko komponenty o nazwach dopasowanych przez
     * `include` będą buforowane.
     */
    include?: MatchPattern
    /**
     * Każdy komponent z nazwą dopasowaną przez `exclude` będzie
     * nie będzie buforowany.
     */
    exclude?: MatchPattern
    /**
     * Maksymalna liczba instancji komponentów do buforowania.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **Szczegóły**

  Po owinięciu wokół dynamicznego komponentu, `<KeepAlive>` buforuje nieaktywne instancje komponentu bez ich niszczenia.

  W dowolnym momencie może istnieć tylko jedna aktywna instancja komponentu jako bezpośrednie dziecko `<KeepAlive>`.

  Gdy komponent jest przełączany wewnątrz `<KeepAlive>`, jego haki `activated` i `deactivated` cyklu życia zostaną odpowiednio wywołane, zapewniając alternatywę dla `mounted` i `unmounted`, które nie są wywoływane. Dotyczy to bezpośredniego dziecka `<KeepAlive>`, jak również wszystkich jego potomków.

- **Przykład**

  Podstawowe użycie:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  W przypadku użycia z gałęziami `v-if` / `v-else`, w danym momencie może być renderowany tylko jeden komponent:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  Używane razem z `<Transition>`:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  Używanie `include` / `exclude`:

  ```vue-html
  <!-- comma-delimited string -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- regex (use `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- Array (use `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  Użycie z `max`:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **Zobacz również** [Guide - KeepAlive](/guide/built-ins/keep-alive)

## `<Teleport>` {#teleport}

Renderuje zawartość slotu do innej części DOM.

- **Props**

  ```ts
  interface TeleportProps {
    /**
     * Wymagane. Określa kontener docelowy.
     * Może być selektorem lub rzeczywistym elementem.
     */
    to: string | HTMLElement
    /**
     * Gdy `true`, zawartość pozostanie w oryginalnej
     * lokalizacji, a nie przeniesiona do kontenera docelowego.
     * Może być zmieniana dynamicznie.
     */
    disabled?: boolean
  }
  ```

- **Przykład**

  Określenie kontenera docelowego:

  ```vue-html
  <Teleport to="#some-id" />
  <Teleport to=".some-class" />
  <Teleport to="[data-teleport]" />
  ```

  Warunkowe wyłączenie:

  ```vue-html
  <Teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </Teleport>
  ```

- **Zobacz również** [Guide - Teleport](/guide/built-ins/teleport)

## `<Suspense>` <sup class="vt-badge experimental" /> {#suspense}

Służy do orkiestracji zagnieżdżonych zależności asynchronicznych w drzewie komponentów.

- **Props**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
    suspensible?: boolean
  }
  ```

- **Zdarzenia**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **Szczegóły**

  `<Suspense>` akceptuje dwa sloty: slot `#default` i slot `#fallback`. Wyświetli on zawartość slotu rezerwowego podczas renderowania domyślnego slotu w pamięci.

  Jeśli napotka zależności asynchroniczne ([Async Components](/guide/components/async) i komponenty z [`async setup()`](/guide/built-ins/suspense#async-setup)) podczas renderowania domyślnego slotu, poczeka aż wszystkie z nich zostaną rozwiązane przed wyświetleniem domyślnego slotu.

  Ustawiając Suspense jako `suspensible`, cała obsługa zależności asynchronicznych będzie obsługiwana przez nadrzędne Suspense. Zobacz [szczegóły implementacji](https://github.com/vuejs/core/pull/6736)

- **Zobacz również** [Guide - Suspense](/guide/built-ins/suspense)
