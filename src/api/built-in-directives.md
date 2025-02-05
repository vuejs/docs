# Built-in Directives {#built-in-directives}

## v-text {#v-text}

Aktualizuje zawartość tekstową elementu.

- **Oczekuje:** `string`

- **Szczegóły**

`v-text` działa poprzez ustawienie właściwości [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) elementu, więc nadpisze każdą istniejącą zawartość wewnątrz elementu. Jeśli potrzebujesz zaktualizować część `textContent`, powinieneś zamiast tego użyć [interpolacji wąsów](/guide/essentials/template-syntax#text-interpolation).

- **Przykład**

  ```vue-html
  <span v-text="msg"></span>
  <!-- same as -->
  <span>{{msg}}</span>
  ```

- **Zobacz również** [Template Syntax - Text Interpolation](/guide/essentials/template-syntax#text-interpolation)

## v-html {#v-html}

Aktualizuje [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) elementu.

- **Oczekuje:** `string`

- **Szczegóły**

  Zawartość `v-html` jest wstawiana jako zwykły HTML - składnia szablonu Vue nie będzie przetwarzana. Jeśli próbujesz komponować szablony przy użyciu `v-html`, spróbuj ponownie przemyśleć rozwiązanie, używając zamiast tego komponentów.

  :::warning Uwaga dotycząca bezpieczeństwa
  Dynamiczne renderowanie dowolnego kodu HTML na stronie internetowej może być bardzo niebezpieczne, ponieważ może łatwo prowadzić do [ataków XSS](https://en.wikipedia.org/wiki/Cross-site_scripting). Używaj `v-html` tylko na zaufanych treściach i **nigdy** na treściach dostarczonych przez użytkownika.
  :::

  W [Single-File Components](/guide/scaling-up/sfc), style `scoped` nie będą miały zastosowania do zawartości wewnątrz `v-html`, ponieważ ten HTML nie jest przetwarzany przez kompilator szablonów Vue. Jeśli chcesz targetować zawartość `v-html` ze scoped CSS, możesz zamiast tego użyć [CSS modules](./sfc-css-features#css-modules) lub dodatkowego, globalnego elementu `<style>` z ręczną strategią scopingu, taką jak BEM.

- **Przykład**

  ```vue-html
  <div v-html="html"></div>
  ```

- **Zobacz również** [Template Syntax - Raw HTML](/guide/essentials/template-syntax#raw-html)

## v-show {#v-show}

Przełącza widoczność elementu na podstawie prawdziwości wartości wyrażenia.

- **Oczekuje:** `any`

- **Szczegóły**

  `v-show` działa poprzez ustawienie właściwości CSS `display` za pomocą stylów inline i spróbuje przestrzegać początkowej wartości `display`, gdy element jest widoczny. Uruchamia również przejścia, gdy zmienia się jego stan.

- **Zobacz również** [Conditional Rendering - v-show](/guide/essentials/conditional#v-show)

## v-if {#v-if}

Warunkowo renderuje element lub fragment szablonu na podstawie prawdziwości wartości wyrażenia.

- **Oczekuje:** `any`

- **Szczegóły**

  Gdy element `v-if` jest przełączany, element i zawarte w nim dyrektywy / komponenty są niszczone i rekonstruowane. Jeśli początkowy warunek jest fałszywy, to wewnętrzna zawartość nie będzie w ogóle renderowana.

  Może być używana w `<template>` do oznaczenia bloku warunkowego zawierającego tylko tekst lub wiele elementów.

  Dyrektywa ta wyzwala przejścia, gdy zmienia się jej warunek.

  Używane razem, `v-if` ma wyższy priorytet niż `v-for`. Nie zalecamy używania tych dwóch dyrektyw razem na jednym elemencie - aby otrzymać więcej informacji zobacz [przewodnik renderowania list](/guide/essentials/list#v-for-with-v-if).

- **Zobacz również** [Conditional Rendering - v-if](/guide/essentials/conditional#v-if)

## v-else {#v-else}

Oznacza blok "else” dla `v-if` lub łańcucha `v-if` / `v-else-if`.

- **Nie oczekuje ekspresji**

- **Szczegóły**

  - Ograniczenie: poprzedni element rodzeństwa musi mieć `v-if` lub `v-else-if`.

  - Może być użyty w `<template>` do oznaczenia bloku warunkowego zawierającego tylko tekst lub wiele elementów.

- **Przykład**

  ```vue-html
  <div v-if="Math.random() > 0.5">
    Now you see me
  </div>
  <div v-else>
    Now you don't
  </div>
  ```

- **Zobacz również** [Conditional Rendering - v-else](/guide/essentials/conditional#v-else)

## v-else-if {#v-else-if}

Oznacza  blok "else if” dla `v-if`. Może być połączony łańcuchowo.

- **Oczekuje:** `any`

- **Szczegóły**

  - Ograniczenie: poprzedni element rodzeństwa musi mieć `v-if` lub `v-else-if`.

  - Może być użyty w `<template>` do oznaczenia bloku warunkowego zawierającego tylko tekst lub wiele elementów.

- **Przykład**

  ```vue-html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

- **Zobacz również** [Conditional Rendering - v-else-if](/guide/essentials/conditional#v-else-if)

## v-for {#v-for}

Wielokrotne renderowanie elementu lub bloku szablonu na podstawie danych źródłowych.

- **Oczekuje:** `Array | Object | number | string | Iterable`

- **Szczegóły**

  Wartość dyrektywy musi używać specjalnej składni `alias in expression`, aby zapewnić alias dla bieżącego elementu, który jest iterowany:

  ```vue-html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  Alternatywnie, można również określić alias dla indeksu (lub klucza, jeśli jest używany na obiekcie):

  ```vue-html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```

  Domyślne zachowanie `v-for` będzie próbowało łatać elementy w miejscu bez przenoszenia ich. Aby wymusić zmianę kolejności elementów, należy podać wskazówkę dotyczącą kolejności za pomocą specjalnego atrybutu `key`:

  ```vue-html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

  `v-for` może również działać na wartościach, które implementują [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol), włączając w to natywne `Map` i `Set`.

- **Zobacz również**
  - [Renderowanie list](/guide/essentials/list)

## v-on {#v-on}

Dołączenie detektora zdarzeń do elementu.

- **Skrót:** `@`

- **Oczekuje:** `Function | Inline Statement | Object (without argument)`

- **Argument:** `event` (opcjonalne, jeśli używana jest składnia Object)

- **Modyfikatory**

  - `.stop` - wywołuje `event.stopPropagation()`.
  - `.prevent` - wywołanie `event.preventDefault()`.
  - `.capture` - nasłuchuje zdarzenia w trybie przechwytywania.
  - `.self` - uruchamia obsługę tylko jeśli zdarzenie zostało wysłane z tego elementu.
  - `.{keyAlias}` - uruchamia obsługę tylko dla określonych kluczy.
  - `.once` - wywołuje program obsługi co najwyżej raz.
  - `.left` - wywołuje tylko obsługę zdarzeń lewego przycisku myszy.
  - `.right` - obsługa tylko prawego przycisku myszy.
  - `.middle` - obsługa tylko zdarzeń środkowego przycisku myszy.
  - `.passive` - dołącza zdarzenie DOM z `{ passive: true }`.

- **Szczegóły**

  Typ zdarzenia jest określany przez argument. Wyrażenie może być nazwą metody, instrukcją inline lub pominięte, jeśli obecne są modyfikatory.

  W przypadku użycia na normalnym elemencie, nasłuchuje tylko [**natywnych zdarzeń DOM**](https://developer.mozilla.org/en-US/docs/Web/Events). W przypadku użycia na niestandardowym elemencie składowym, nasłuchuje **zdarzeń niestandardowych** emitowanych na tym elemencie podrzędnym.

  Podczas nasłuchiwania natywnych zdarzeń DOM, metoda otrzymuje natywne zdarzenie jako jedyny argument. W przypadku użycia instrukcji inline, instrukcja ma dostęp do specjalnej właściwości `$event`: `v-on:click=„handle(»ok«, $event)”`.

  `v-on` obsługuje również wiązanie z obiektem par zdarzeń / listenerów bez argumentu. Zauważ, że gdy używana jest składnia obiektu, nie obsługuje ona żadnych modyfikatorów.

- **Przykład**

  ```vue-html
  <!-- obsługa metody -->
  <button v-on:click="doThis"></button>

  <!-- zdarzenie dynamiczne -->
  <button v-on:[event]="doThis"></button>

  <!-- deklaracja inline -->
  <button v-on:click="doThat('hello', $event)"></button>

  <!-- skrót -->
  <button @click="doThis"></button>

  <!-- skrót zdarzenia dynamicznego -->
  <button @[event]="doThis"></button>

  <!-- zatrzymanie propagacji -->
  <button @click.stop="doThis"></button>

  <!-- zapobieganie domyślnym ustawieniom -->
  <button @click.prevent="doThis"></button>

  <!-- zapobieganie domyślnym ustawieniom bez wyrażenia -->
  <form @submit.prevent></form>

  <!-- modyfikatory łańcuhowe -->
  <button @click.stop.prevent="doThis"></button>

  <!-- modyfikator klawisza przy użyciu keyAlias -->
  <input @keyup.enter="onEnter" />

  <!-- zdarzenie kliknięcia zostanie wywołane co najwyżej raz -->
  <button v-on:click.once="doThis"></button>

  <!-- składnia obiektu -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  Nasłuchiwanie niestandardowych zdarzeń na komponencie podrzędnym (program obsługi jest wywoływany, gdy na komponencie podrzędnym zostanie wyemitowane zdarzenie „my-event”):

  ```vue-html
  <MyComponent @my-event="handleThis" />

  <!-- deklaracja inline -->
  <MyComponent @my-event="handleThis(123, $event)" />
  ```

- **Zobacz również**
  - [Event Handling](/guide/essentials/event-handling)
  - [Components - Custom Events](/guide/essentials/component-basics#listening-to-events)

## v-bind {#v-bind}

Dynamicznie powiąż jeden lub więcej atrybutów lub właściwość komponentu z wyrażeniem.

- **Skrót:**
  - `:` or `.` (when using `.prop` modifier)
  - Omitting value (when attribute and bound value has the same name) <sup class="vt-badge">3.4+</sup>

- **Oczekuje:** `any (with argument) | Object (without argument)`

- **Argument:** `attrOrProp (optional)`

- **Modifiers**

  - `.camel` - przekształca nazwę atrybutu kebab-case w camelCase.
  - `.prop` - wymusza ustawienie powiązania jako właściwości DOM. <sup class=„vt-badge”>3.2+</sup>
  - `.attr` - wymusza ustawienie powiązania jako atrybutu DOM. <sup class=„vt-badge”>3.2+</sup>

- **Użycie**

  W przypadku użycia do powiązania atrybutu `class` lub `style`, `v-bind` obsługuje dodatkowe typy wartości, takie jak Array lub Objects. Więcej szczegółów można znaleźć w sekcji przewodnika poniżej.

  Podczas ustawiania powiązania na elemencie, Vue domyślnie sprawdza, czy element ma klucz zdefiniowany jako właściwość przy użyciu sprawdzenia operatora `in`. Jeśli właściwość jest zdefiniowana, Vue ustawi wartość jako właściwość DOM zamiast atrybutu. Powinno to działać w większości przypadków, ale można nadpisać to zachowanie poprzez jawne użycie modyfikatorów `.prop` lub `.attr`. Jest to czasami konieczne, zwłaszcza podczas [pracy z elementami niestandardowymi](/guide/extras/web-components#passing-dom-properties).

  W przypadku użycia do wiązania właściwości komponentu, właściwość musi być poprawnie zadeklarowana w komponencie potomnym.

  W przypadku użycia bez argumentu, może być użyty do powiązania obiektu zawierającego pary nazwa-wartość atrybutu.

- **Przykład**

  ```vue-html
  <!-- powiązanie atrybutu -->
  <img v-bind:src="imageSrc" />

  <!-- dynamiczna nazwa atrybutu -->
  <button v-bind:[key]="value"></button>

  <!-- skrót -->
  <img :src="imageSrc" />

  <!-- skrót o tej samej nazwie (3.4+), równoznaczne do :src="src” -->
  <img :src />

  <!-- skrócona nazwa atrybutu dynamicznego -->
  <button :[key]="value"></button>

  <!-- z wbudowaną konkatenacją ciągów znaków -->
  <img :src="'/path/to/images/' + fileName" />

  <!-- wiązanie klas -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>

  <!-- wiązanie stylów -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>

  <!-- wiązanie obiektu atrybutów -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

  <!-- prop binding. „prop” musi być zadeklarowany w komponencie podrzędnym. -->
  <MyComponent :prop="someThing" />

  <!-- przekazywanie rekwizytów nadrzędnych wspólnych z komponentem podrzędnym -->
  <MyComponent v-bind="$props" />

  <!-- XLink -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

  Modyfikator `.prop` posiada również dedykowany skrót, `.`:

  ```vue-html
  <div :someProperty.prop="someObject"></div>

  <!-- odpowiednik -->
  <div .someProperty="someObject"></div>
  ```

  Modyfikator `.camel` pozwala na zmianę pisowni nazwy atrybutu `v-bind` podczas używania szablonów w DOM, np. atrybutu SVG `viewBox`:

  ```vue-html
  <svg :view-box.camel="viewBox"></svg>
  ```

  `.camel` nie jest potrzebny, jeśli używasz szablonów łańcuchowych lub wstępnie kompilujesz szablon w kroku kompilacji.

- **Zobacz również**
  - [Class and Style Bindings](/guide/essentials/class-and-style)
  - [Components - Prop Passing Details](/guide/components/props#prop-passing-details)

## v-model {#v-model}

Tworzenie dwukierunkowego powiązania z elementem wejściowym formularza lub komponentem.

- **Oczekuje:** zmienia się w zależności od wartości elementu wejściowego formularza lub wyjścia komponentów

- **Ograniczone do:**

  - `<input>`
  - `<select>`
  - `<textarea>`
  - components

- **Modyfikatory**

  - [`.lazy`](/guide/essentials/forms#lazy) - nasłuchuje zdarzeń `change` zamiast `input`
  - [`.number`](/guide/essentials/forms#number) - rzutuje prawidłowy ciąg wejściowy na liczby
  - [`.trim`](/guide/essentials/forms#trim) - przycinia wprowadzone wartości

- **Zobacz również**

  - [Form Input Bindings](/guide/essentials/forms)
  - [Component Events - Usage with `v-model`](/guide/components/v-model)

## v-slot {#v-slot}

Oznaczają nazwane sloty lub sloty o określonym zakresie, które oczekują otrzymywania rekwizytów.

- **Skrót:** `#`

- **Oczekuje:** Wyrażenie JavaScript, które jest prawidłowe w pozycji argumentu funkcji, w tym obsługa destrukturyzacji. Opcjonalne - potrzebne tylko wtedy, gdy oczekuje się przekazania rekwizytów do slotu.

- **Argument:** nazwa slotu (opcjonalna, domyślnie `default`)

- **Ograniczone do:**

  - `<template>`
  - [components](/guide/components/slots#scoped-slots) (dla pojedynczego domyślnego slotu z rekwizytami)

- **Przykład**

  ```vue-html
  <!-- Named slots -->
  <BaseLayout>
    <template v-slot:header>
      Header content
    </template>

    <template v-slot:default>
      Default slot content
    </template>

    <template v-slot:footer>
      Footer content
    </template>
  </BaseLayout>

  <!-- Nazwany slot odbierający rekwizyty -->
  <InfiniteScroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </InfiniteScroll>

  <!-- Domyślny slot odbierający rekwizyty, z destrukcją -->
  <Mouse v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </Mouse>
  ```

- **Zobacz również**
  - [Components - Slots](/guide/components/slots)

## v-pre {#v-pre}

Pomija kompilację tego elementu i wszystkich jego elementów podrzędnych.

- **Nie oczekuje ekspresji**

- **Szczegóły**

  Wewnątrz elementu z `v-pre`, cała składnia szablonu Vue zostanie zachowana i wyrenderowana tak, jak jest. Najczęstszym przypadkiem użycia jest wyświetlanie surowych tagów mustache.

- **Przykład**

  ```vue-html
  <span v-pre>{{ this will not be compiled }}</span>
  ```

## v-once {#v-once}

Renderuj element i komponent tylko raz i pomiń przyszłe aktualizacje.

- **Nie oczekuje ekspresji**

- **Szczegóły**

  Przy kolejnych ponownych renderowaniach element/komponent i wszystkie jego elementy podrzędne będą traktowane jako zawartość statyczna i pomijane. Może to być wykorzystane do optymalizacji wydajności aktualizacji.

  ```vue-html
  <!-- single element -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- the element have children -->
  <div v-once>
    <h1>Comment</h1>
    <p>{{msg}}</p>
  </div>
  <!-- component -->
  <MyComponent v-once :comment="msg"></MyComponent>
  <!-- `v-for` directive -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

  Od wersji 3.2, można również zapamiętać część szablonu z warunkami unieważnienia używając [`v-memo`](#v-memo).

- **Zobacz również**
  - [Data Binding Syntax - interpolations](/guide/essentials/template-syntax#text-interpolation)
  - [v-memo](#v-memo)

## v-memo <sup class="vt-badge" data-text="3.2+" /> {#v-memo}

- **Oczekuje:** `any[]`

- **Szczegóły**

  Zapamiętuje poddrzewo szablonu. Może być używana zarówno na elementach, jak i komponentach. Dyrektywa Oczekuje tablicę o stałej długości wartości zależności do porównania dla memoizacji. Jeśli każda wartość w tablicy była taka sama jak podczas ostatniego renderowania, aktualizacje dla całego poddrzewa zostaną pominięte. Na przykład:

  ```vue-html
  <div v-memo="[valueA, valueB]">
    ...
  </div>
  ```

  Po ponownym renderowaniu komponentu, jeśli zarówno `valueA` jak i `valueB` pozostaną takie same, wszystkie aktualizacje dla tego `<div>` i jego dzieci zostaną pominięte. W rzeczywistości, nawet tworzenie Virtual DOM VNode również zostanie pominięte, ponieważ zapamiętana kopia poddrzewa może być ponownie użyta.

  Ważne jest, aby poprawnie określić tablicę memoizacji, w przeciwnym razie możemy pominąć aktualizacje, które faktycznie powinny zostać zastosowane. `v-memo` z pustą tablicą zależności (`v-memo=„[]”`) byłoby funkcjonalnie równoważne `v-once`.

  **Użcycie z `v-for`**

  `v-memo` jest dostarczane wyłącznie dla mikrooptymalizacji w scenariuszach krytycznych dla wydajności i powinno być rzadko potrzebne. Najczęstszym przypadkiem, w którym może się to okazać pomocne, jest renderowanie dużych list `v-for` (gdzie `length > 1000`):

  ```vue-html
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
    <p>...more child nodes</p>
  </div>
  ```

  Gdy zmieni się stan `wybranego` komponentu, zostanie utworzona duża ilość VNodes, nawet jeśli większość elementów pozostanie dokładnie taka sama. Użycie `v-memo` tutaj zasadniczo mówi „aktualizuj ten element tylko wtedy, gdy przeszedł z niewybranego do wybranego lub na odwrót”. Pozwala to każdemu nienaruszonemu elementowi na ponowne użycie poprzedniego VNode i całkowite pominięcie różnicowania. Zauważ, że nie musimy tutaj uwzględniać `item.id` w tablicy zależności memo, ponieważ Vue automatycznie pobiera go z `:key` elementu.

  :::warning
  Używając `v-memo` z `v-for`, upewnij się, że są one używane na tym samym elemencie. **`v-memo` nie działa wewnątrz `v-for`.
  :::

  Funkcja `v-memo` może być również używana na komponentach, aby ręcznie zapobiegać niechcianym aktualizacjom w niektórych skrajnych przypadkach, w których sprawdzanie aktualizacji komponentów potomnych zostało zoptymalizowane. Ponownie jednak, obowiązkiem dewelopera jest określenie poprawnych tablic zależności, aby uniknąć pominięcia niezbędnych aktualizacji.

- **Zobacz również**
  - [v-once](#v-once)

## v-cloak {#v-cloak}

Służy do ukrywania nieskompilowanego szablonu, dopóki nie będzie gotowy.

- **Nie oczekuje ekspresji**

- **Szczegóły**

  **Ta dyrektywa jest potrzebna tylko w konfiguracjach bez budowania kroków.**

  Podczas korzystania z szablonów w DOM może wystąpić „błysk nieskompilowanych szablonów”: użytkownik może zobaczyć surowe tagi wąsów, dopóki zamontowany komponent nie zastąpi ich renderowaną zawartością.

  `v-cloak` pozostanie na elemencie dopóki powiązana instancja komponentu nie zostanie zamontowana. W połączeniu z regułami CSS, takimi jak `[v-cloak] { display: none }`, może być użyty do ukrycia surowych szablonów, dopóki komponent nie będzie gotowy.

- **Przykład**

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```vue-html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  `<div>` nie będzie widoczny do czasu zakończenia kompilacji.
