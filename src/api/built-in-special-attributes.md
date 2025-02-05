# Built-in Special Attributes {#built-in-special-attributes}

## key {#key}

Specjalny atrybut `key` jest używany przede wszystkim jako wskazówka dla algorytmu wirtualnego DOM języka Vue w celu zidentyfikowania vnode'ów podczas porównywania nowej listy węzłów ze starą listą.

- **Oczekuje:** `number | string | symbol`

- **Szczegóły**

  Bez kluczy Vue używa algorytmu, który minimalizuje ruch elementów i próbuje łatać/ponownie używać elementów tego samego typu na miejscu, tak bardzo jak to możliwe. Z kluczami zmieni kolejność elementów na podstawie zmiany kolejności kluczy, a elementy z kluczami, których już nie ma, będą zawsze usuwane/niszczone.

  Dzieci tego samego wspólnego rodzica muszą mieć **unikalne klucze**. Duplikaty kluczy spowodują błędy renderowania.

  Najczęstszym przypadkiem użycia jest połączenie z `v-for`:

  ```vue-html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  Można go również użyć do wymuszenia zastąpienia elementu/komponentu zamiast ponownego użycia. Może to być przydatne, gdy chcesz:

  - Prawidłowo wyzwalaj haki cyklu życia komponentu
  - Wyzwalaj przejścia

  Na przykład:

  ```vue-html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  Gdy `text` ulega zmianie, `<span>` zawsze zostanie zastąpiony zamiast załatany, więc nastąpi przejście.

- **Zobacz również** [Guide - List Rendering - Maintaining State with `key`](/guide/essentials/list#maintaining-state-with-key)

## ref {#ref}

Oznacza [template ref](/guide/essentials/template-refs).

- **Oczekuje:** `string | Function`

- **Szczegóły**

  `ref` służy do rejestrowania odniesienia do elementu lub komponentu podrzędnego.

  W API opcji, odniesienie zostanie zarejestrowane w obiekcie `this.$refs` komponentu:

  ```vue-html
  <!-- przechowywany jako this.$refs.p -->
  <p ref="p">hello</p>
  ```

  W interfejsie API kompozycji odniesienie zostanie zapisane w odniesieniu o pasującej nazwie:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const p = ref()
  </script>

  <template>
    <p ref="p">hello</p>
  </template>
  ```

  Jeśli zostanie użyte na zwykłym elemencie DOM, odniesienie będzie tym elementem; jeśli zostanie użyte na komponencie potomnym, odniesienie będzie instancją komponentu potomnego.

  Alternatywnie `ref` może przyjąć wartość funkcji, która zapewnia pełną kontrolę nad tym, gdzie przechowywać odniesienie:

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```

  Ważna uwaga dotycząca czasu rejestracji ref: ponieważ same ref są tworzone w wyniku funkcji renderowania, musisz poczekać, aż komponent zostanie zamontowany, zanim uzyskasz do nich dostęp.

  `this.$refs` jest również niereaktywny, dlatego nie powinieneś próbować używać go w szablonach do wiązania danych.

- **Zobacz również**
  - [Guide - Template Refs](/guide/essentials/template-refs)
  - [Guide - Typing Template Refs](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [Guide - Typing Component Template Refs](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## is {#is}

Stosowany do wiązania [dynamic components](/guide/essentials/component-basics#dynamic-components).

- **Oczekuje:** `string | Component`

- **Użycie na elementach natywnych** <sup class="vt-badge">3.1+</sup>

  Gdy atrybut `is` jest używany w natywnym elemencie HTML, zostanie zinterpretowany jako [Dostosowany wbudowany element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example), który jest natywną funkcją platformy internetowej.

  Istnieje jednak przypadek użycia, w którym możesz potrzebować Vue, aby zastąpić natywny element komponentem Vue, jak wyjaśniono w [In-DOM Template Parsing Caveats](/guide/essentials/component-basics#in-dom-template-parsing-caveats). Możesz dodać prefiks `is` do wartości atrybutu `vue:`, aby Vue renderował element jako komponent Vue:

  ```vue-html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **Zobacz również**

  - [Built-in Special Element - `<component>`](/api/built-in-special-elements#component)
  - [Dynamic Components](/guide/essentials/component-basics#dynamic-components)
