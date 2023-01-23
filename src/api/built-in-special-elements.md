# Вбудовані спеціальні елементи {#built-in-special-elements}

:::info Не компоненти
`<component>`, `<slot>` і `<template>` є компонентними функціями та частиною синтаксису шаблону. Вони не є справжніми компонентами та компілюються під час компіляції шаблону. Тому в шаблонах вони зазвичай пишуться з малої літери.
:::

## `<component>` {#component}

"Метакомпонент" для рендерингу динамічних компонентів або елементів.

- **Реквізити**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **Подробиці**

  Фактичний компонент для рендерингу визначається реквізитом `is`.

  - Коли `is` є рядком, то це може бути ім'я тегу HTML або зареєстроване ім'я компонента.

  - Крім того, `is` також може бути безпосередньо пов’язаний з визначенням компонента.

- **Приклад**

  Рендеринг компонентів за зареєстрованим іменем (опційний АРІ):

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

  Рендеринг компонентів за визначенням (композиційний АРІ з `<script setup>`):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  Рендеринг HTML елементів:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  Усі [вбудовані компоненти](./built-in-components.html) можна передати в `is`, але ви повинні зареєструвати їх, якщо хочете передати їх за іменем. Наприклад:

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

  Реєстрація не потрібна, якщо ви передаєте сам компонент у `is`, а не його назву, наприклад. у  `<script setup>`.

  Якщо `v-model` використовується в тегу `<component>`, компілятор шаблону розширить його до реквізиту `modelValue` і слухача подій `update:modelValue`, так само як і для будь-якого іншого компонента. Однак це не буде сумісним із рідними елементами HTML, такими як `<input>` або `<select>`. Як результат, використання `v-model` з динамічно створеним рідним елементом не працюватиме:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- Це не працюватиме, оскільки 'input' є рідним HTML елементом -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  На практиці цей крайовий випадок не є поширеним, оскільки рідні поля форми зазвичай загорнуті в компоненти у реальних застосунках. Якщо вам потрібно використовувати рідний елемент безпосередньо, ви можете вручну розділити `v-model` на атрибут і подію.

- **Також до вашої уваги:** [Динамічні компоненти](/guide/essentials/component-basics.html#dynamic-components)

## `<slot>` {#slot}

Служить як точка поширення контенту в шаблонах.

- **Реквізити**

  ```ts
  interface SlotProps {
    /**
     * Будь-які реквізити, передані в <slot> передаються як аргументи
     * для обмежених слотів
     */
    [key: string]: any
    /**
     * Зарезервовано для вказівки назви слота.
     */
    name?: string
  }
  ```

- **Подробиці**

  Елемент `<slot>` може використовувати атрибут `name` для визначення імені слота. Якщо `name` не вказано, він відрендерить слот за промовчанням. Додаткові атрибути, передані до елемента слота, будуть передані як реквізити слота до слота з областю дії, визначеного в батьківському.

  Сам елемент буде замінено відповідним вмістом слота.

  Елементи `<slot>` у шаблонах Vue скомпільовані в JavaScript, тому їх не слід плутати з [рідними `<slot>` елементами](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).

- **Також до вашої уваги:** [Компонент -слоти](/guide/components/slots.html)

## `<template>` {#template}

Тег `<template>` використовується як підмінний елемент, коли ми хочемо використовувати вбудовану директиву без рендерингу елемента в DOM.

- **Подробиці:**

  Спеціальна обробка для `<template>` ініціюється, лише якщо він використовується з однією з цих директив:

  - `v-if`, `v-else-if`, або `v-else`
  - `v-for`
  - `v-slot`

  Якщо жодна з цих директив не присутня, натомість він буде відрендериний як [рідний `<template>` елемент](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).

  `<template>` із `v-for` також може мати [атрибут `key`](/api/built-in-special-attributes.html#key). Усі інші атрибути та директиви буде відкинуто, оскільки вони не мають сенсу без відповідного елемента.

  Одно-файлові компоненти використовують [тег верхнього рівня `<template>`](/api/sfc-spec.html#language-blocks), щоб охопити весь шаблон. Це використання окремо від використання `<template>`, описаного вище. Цей тег верхнього рівня не є частиною самого шаблону та не підтримує синтаксис шаблону, наприклад директиви.

- **Також до вашої уваги:**
  - [Гід - `v-if` в `<template>`](/guide/essentials/conditional.html#v-if-on-template)
  - [Гід - `v-for` в `<template>`](/guide/essentials/list.html#v-for-on-template)
  - [Гід - Іменовані слоти](/guide/components/slots.html#named-slots)
