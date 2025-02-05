# Built-in Special Elements {#built-in-special-elements}

:::info Nie komponenty
`<component>`, `<slot>` i `<template>` są funkcjami podobnymi do komponentów i częścią składni szablonów. Nie są one prawdziwymi komponentami i są kompilowane podczas kompilacji szablonu. Jako takie, są one konwencjonalnie pisane małymi literami w szablonach.
:::

## `<component>` {#component}

„Meta komponent” do renderowania dynamicznych komponentów lub elementów.

- **Props**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **Szczegóły**

  Rzeczywisty komponent do renderowania jest określany przez właściwość `is`.

  - Gdy `is` jest ciągiem znaków, może to być nazwa znacznika HTML lub zarejestrowana nazwa komponentu.

  - Alternatywnie, `is` może być również bezpośrednio powiązane z definicją komponentu.

- **Przykład**

  Renderowanie komponentów według zarejestrowanej nazwy (Options API):

  ```vue
  <script>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: { Foo, Bar },
    data() {
      return {
        view: 'Foo'
      }
    }
  }
  </script>

  <template>
    <component :is="view" />
  </template>
  ```

  Renderowanie komponentów poprzez definicje (Composition API z `<script setup>`):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  Renderowanie elementów HTML:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  Wszystkie [wbudowane komponenty](./built-in-components) mogą być przekazywane do `is`, ale musisz je zarejestrować, jeśli chcesz przekazać je przez nazwę. Na przykład:

  ```vue
  <script>
  import { Transition, TransitionGroup } from 'vue'

  export default {
    components: {
      Transition,
      TransitionGroup
    }
  }
  </script>

  <template>
    <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
      ...
    </component>
  </template>
  ```

  Rejestracja nie jest wymagana, jeśli przekażesz sam komponent do `is` zamiast jego nazwy, np. w `<script setup>`.

  Jeśli `v-model` zostanie użyte w znaczniku `<component>`, kompilator szablonu rozszerzy go do właściwości `modelValue` i nasłuchiwacza zdarzeń `update:modelValue`, podobnie jak w przypadku każdego innego komponentu. Nie będzie to jednak zgodne z natywnymi elementami HTML, takimi jak `<input>` lub `<select>`. W rezultacie użycie `v-model` z dynamicznie utworzonym natywnym elementem nie zadziała.

  ```vue
  <script setup>
  import { ref } from 'vue'

  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- To nie zadziała, ponieważ „input” jest natywnym elementem HTML -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  W praktyce ten skrajny przypadek nie jest powszechny, ponieważ pola formularza natywnego są zazwyczaj opakowane w komponenty w rzeczywistych aplikacjach. Jeśli musisz użyć elementu natywnego bezpośrednio, możesz ręcznie podzielić `v-model` na atrybut i zdarzenie.

- **Zobacz również** [Dynamic Components](/guide/essentials/component-basics#dynamic-components)

## `<slot>` {#slot}

Oznacza miejsca umieszczania treści w szablonach.

- **Props**

  ```ts
  interface SlotProps {
    /**
     * Wszelkie rekwizyty przekazane do <slot> w celu przekazania jako argumenty
     * dla zakresowych slotów
     */
    [key: string]: any
    /**
     * Zarezerwowane do określenia nazwy slotu.
     */
    name?: string
  }
  ```

- **Szczegóły**

  Element `<slot>` może używać atrybutu `name` do określania nazwy slotu. Jeśli nie określono `name`, zostanie wyświetlony domyślny slot. Dodatkowe atrybuty przekazane do elementu slot zostaną przekazane jako właściwości slotu do zakresu slotu zdefiniowanego w elemencie nadrzędnym.

  Sam element zostanie zastąpiony dopasowaną zawartością slotu.

Elementy `<slot>` w szablonach Vue są kompilowane do JavaScript, więc nie należy ich mylić z [native `<slot>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).

- **Zobacz również** [Component - Slots](/guide/components/slots)

## `<template>` {#template}

Znacznik `<template>` jest używany jako symbol zastępczy, gdy chcemy użyć wbudowanej dyrektywy bez renderowania elementu w DOM.

- **Szczegóły**

  Specjalne traktowanie szablonu `<template>` jest wyzwalane tylko wtedy, gdy jest on używany z jedną z poniższych dyrektyw:

  - `v-if`, `v-else-if`, lub `v-else`
  - `v-for`
  - `v-slot`

  Jeśli żadna z tych dyrektyw nie jest obecna, wówczas zostanie ona wyrenderowana jako [native `<template>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).

  `<template>` z `v-for` może mieć również atrybut [`key`](/api/built-in-special-attributes#key). Wszystkie inne atrybuty i dyrektywy zostaną odrzucone, ponieważ nie mają znaczenia bez odpowiadającego im elementu.

  Komponenty jednoplikowe używają [znacznika najwyższego poziomu `<template>`](/api/sfc-spec#language-blocks) do opakowania całego szablonu. To użycie jest oddzielne od użycia `<template>` opisanego powyżej. Ten znacznik najwyższego poziomu nie jest częścią samego szablonu i nie obsługuje składni szablonu, takiej jak dyrektywy.

- **Zobacz również**
  - [Guide - `v-if` on `<template>`](/guide/essentials/conditional#v-if-on-template)
  - [Guide - `v-for` on `<template>`](/guide/essentials/list#v-for-on-template)
  - [Guide - Named slots](/guide/components/slots#named-slots)
