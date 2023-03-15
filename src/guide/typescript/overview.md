---
outline: deep
---

# Використання Vue з TypeScript {#using-vue-with-typescript}

Система типів, така як TypeScript, може виявляти багато помилок за допомогою статичного аналізу під час збірки. Це зменшує ймовірність появи помилок під час виконання у production, а також дозволяє більш впевнено рефакторювати код у великомасштабних проєктах. TypeScript також покращує ергономіку розробника завдяки автоматичному заповненню типів у IDE.

Vue написаний на TypeScript, тому забезпечує першокласну підтримку TypeScript. Усі офіційні пакети Vue постачаються в комплекті з деклараціями типів, які працюють з коробки.

## Налаштування проєкту {#project-setup}

[`create-vue`](https://github.com/vuejs/create-vue), офіційний інструмент створення проєктів Vue, який базується на [Vite](https://vitejs.dev/), пропонує опції створення проєктів Vue з TypeScript.

### Огляд {#overview}

З базовими налаштуваннями Vite, сервер розробки й комплектувальник використовуються лише для транспіляції, та не виконують жодної перевірки типів. Це забезпечує блискавичну роботу сервера розробників Vite навіть при використанні TypeScript.

- Під час розробки рекомендуємо покладатися на хорошу [IDE підтримку](#ide-support) для миттєвого зворотного зв'язку при помилках типу.

- Якщо ви використовуєте одно-файлові компоненти, використовуйте [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/vue-tsc) утиліту для перевірки типу командного рядка та створення декларації типу. `vue-tsc` це обгортка навколо `tsc`, власного інтерфейсу командного рядка TypeScript. Він працює майже так само, як `tsc`, за винятком того, що він підтримує одно-файлові компоненти на додаток до файлів TypeScript. Ви можете запустити `vue-tsc` у режимі перегляду, паралельно із сервером розробки Vite або використати плагін для Vite, наприклад [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) який запускає перевірку в окремому робочому потоці.

- Vue CLI також забезпечує підтримку TypeScript, але більше не рекомендується. Дивіться [примітки нижче](#note-on-vue-cli-and-ts-loader).

### Підтримка IDE {#ide-support}

- [Visual Studio Code](https://code.visualstudio.com/) (VSCode) настійно рекомендується через чудову готову підтримку TypeScript.

  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) є офіційним розширенням VSCode, яке забезпечує підтримку TypeScript в одно-файлових компонентах, а також багато інших чудових функцій.

    :::tip
    Volar замінює [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), наше попереднє офіційне розширення VSCode для Vue 2. Якщо у вас наразі встановлено Vetur, обов'язково вимкніть його в проєктах Vue 3.
    :::

  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) також необхідний для підтримки імпорту `*.vue` у файли TS.

- [WebStorm](https://www.jetbrains.com/webstorm/) також забезпечує готову підтримку для TypeScript і Vue. Інші IDE JetBrains також підтримують їх, або з коробки, або через [вільні плагіни](https://plugins.jetbrains.com/plugin/9442-vue-js).

### Конфігурація `tsconfig.json` {#configuring-tsconfig-json}

Проєкти, створені за допомогою `create-vue`, містять попередньо налаштований `tsconfig.json`. Базова конфігурація абстрагується у [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) пакеті. Всередині проєкту ми використовуємо [посилання на проєкти](https://www.typescriptlang.org/docs/handbook/project-references.html), щоб забезпечити правильні типи для коду, що виконується в різних середовищах (наприклад, код програми та код тесту повинні мати різні глобальні змінні).

Під час ручної конфігурації `tsconfig.json` зверніть увагу на важливі опції:

- [`compilerOptions.isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) має значення `true`, оскільки Vite використовує [esbuild](https://esbuild.github.io/) для транспіляції TypeScript і має обмеження на транспілювання одного файлу.

- Якщо ви використовуєте опційний АРІ, вам потрібно встановити [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) на `true` (або принаймні увімкнути [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis), який є частиною `strict`), щоб використовувати перевірку типів `this` в опціях компонента. Інакше `this` розглядатиметься як `any`.

- Якщо ви налаштували псевдоніми розпізнавателя в інструменті збірки, наприклад, псевдонім `@/*`, що налаштований за замовчуванням у проєкті `create-vue`, вам також потрібно налаштувати його для TypeScript через [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths).

Також до вашої уваги:

- [Офіційні документи опцій компілятора TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [Застереження щодо компіляції esbuild TypeScript](https://esbuild.github.io/content-types/#typescript-caveats)

### Режим Takeover в Volar {#volar-takeover-mode}

> Цей розділ стосується лише VSCode + Volar.

Щоб забезпечити спільну роботу одно-файлових компонентів і TypeScript, Volar створює окремий екземпляр мовної служби TS із підтримкою Vue і використовує його в одно-файлових компонентах. Водночас звичайні файли TS все ще обробляються вбудованою мовною службою VSCode, тому нам потрібен [Плагін TypeScript для Vue](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) для підтримки імпорту одно-файлових компонентів у файли TS. Це налаштування працює за замовчуванням, але для кожного проєкту ми запускаємо два екземпляри мовної служби TS: одну від Volar і одну від вбудованої служби VSCode. Це трохи неефективно та може призвести до проблем із продуктивністю у великих проєктах.

Для покращення продуктивності, Volar надає функцію під назвою «Режим Takeover». Цей режим забезпечує підтримку як файлів Vue, так і файлів TS, за допомогою єдиного екземпляра мовної служби TS.

Щоб увімкнути режим Takeover, вам потрібно вимкнути вбудовану службу мови TS VSCode **лише у робочій області вашого проєкту**, виконавши такі дії:

1. У робочій області проєкту відкрийте панель команд за допомогою `Ctrl + Shift + P` (macOS: `Cmd + Shift + P`).
2. Введіть `built` і виберіть "Extensions: Show Built-in Extensions".
3. Введіть `typescript` у вікні пошуку розширення (не видаляйте префікс `@builtin`).
4. Натисніть маленьку піктограму шестірні «TypeScript and JavaScript Language Features» і виберіть «Disable (Workspace)».
5. Перезавантажте робочу область. Режим Takeover буде ввімкнено, коли ви відкриєте файл Vue або TS.

<img src="./images/takeover-mode.png" width="590" height="426" style="margin:0px auto;border-radius:8px">

### Примітка щодо Vue CLI та `ts-loader` {#note-on-vue-cli-and-ts-loader}

В інструментах збірки на основі webpack, таких як Vue CLI, зазвичай виконується перевірка типів як частина конвеєра трансформації модуля, наприклад, за допомогою `ts-loader`. Однак це не є чистим рішенням, оскільки система типів потребує знання всього графа модуля, щоб виконати перевірку типу. Простий крок трансформації окремого модуля не підходить для виконання завдання. Це призводить до наступних проблем:

- `ts-loader` може перевірити тип лише після трансформації коду. Це не узгоджується з помилками, які ми бачимо в IDE або з `vue-tsc`, які безпосередньо пов'язані з вихідним кодом.

- Перевірка типу може бути повільною. Коли він виконується в одному потоці/процесі з трансформації коду, це значно впливає на швидкість збірки всієї програми.

- У нас уже є перевірка типу, яка виконується безпосередньо в нашій IDE в окремому процесі, тому вартість уповільнення роботи розробника не є добрим компромісом.

Якщо ви зараз використовуєте Vue 3 + TypeScript через Vue CLI, ми наполегливо рекомендуємо перейти на Vite. Ми також працюємо над опціями CLI, щоб увімкнути підтримку TS лише для транспіляції, щоб ви могли перейти на `vue-tsc` для перевірки типу.

## Загальні вказівки щодо використання {#general-usage-notes}

### `defineComponent()` {#definecomponent}

Щоб дозволити TypeScript правильно визначати типи всередині опцій компонента, нам потрібно визначити компоненти за допомогою [`defineComponent()`](/api/general.html#definecomponent):

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // увімкнено визначення типу
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // тип: string | undefined
    this.msg // тип: string
    this.count // тип: number
  }
})
```

`defineComponent()` також підтримує визначення типів реквізитів, переданих у `setup()` під час використання Composition API без `<script setup>`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // увімкнено визначення типу
  props: {
    message: String
  },
  setup(props) {
    props.message // тип: string | undefined
  }
})
```

Також до вашої уваги:

- [Примітка щодо webpack Treeshaking](/api/general.html#note-on-webpack-treeshaking)
- [Типові тести для `defineComponent`](https://github.com/vuejs/core/blob/main/packages/dts-test/defineComponent.test-d.tsx)

:::tip
`defineComponent()` також дає змогу визначати типи для компонентів, визначених у звичайному JavaScript.
:::

### Використання в однофайлових компонентах {#usage-in-single-file-components}

Щоб використовувати TypeScript в одно-файлових компонентах, додайте атрибут `lang="ts"` до тегів `<script>`. Якщо присутній `lang="ts"`, всі вирази шаблону також підлягають більш суворій перевірці типу.

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 1
    }
  }
})
</script>

<template>
  <!-- увімкнено перевірку типу та автодоповнення -->
  {{ count.toFixed(2) }}
</template>
```

`lang="ts"` також можна використовувати з `<script setup>`:

```vue
<script setup lang="ts">
// TypeScript увімкнено
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <!-- увімкнено перевірку типу та автодоповнення -->
  {{ count.toFixed(2) }}
</template>
```

### TypeScript у шаблонах {#typescript-in-templates}

`<template>` також підтримує TypeScript у виразах прив'язування, коли використовується `<script lang="ts">` або `<script setup lang="ts">`. Це корисно в тих випадках, коли вам потрібно виконати приведення типів у виразах шаблону.

Ось надуманий приклад:

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- помилка, оскільки x може бути string -->
  {{ x.toFixed(2) }}
</template>
```

Це можна вирішити за допомогою вбудованого приведення типу:

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip
У разі використання Vue CLI, або інструмент збірки на основі webpack, TypeScript вимагає у виразах шаблону `vue-loader@^16.8.0`.
:::

## API-специфічні рецепти {#api-specific-recipes}

- [TS з композиційним API](./composition-api)
- [TS з опційним API](./options-api)
