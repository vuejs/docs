# TypeScript з опційним API {#typescript-with-options-api}

> Ця сторінка передбачає, що ви вже ознайомились із [Використання Vue з TypeScript](./overview).

:::tip
Хоча Vue підтримує використання TypeScript з Опційним API, все ж рекомендується використовувати TypeScript з Композиційним API, оскільки він пропонує простіший, ефективніший та надійніший спосіб визначення типу.
:::

## Типізація властивостей компонента {#typing-component-props}

Визначення типу реквізитів з Опційним API, вимагає обгорнення компонента за допомогою `defineComponent()`. При цьому Vue може визначити типи реквізитів на основі параметрів `props`, враховуючи додаткові параметри, такі як `required: true` і `default`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // визначення типу ввімкнено
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // тип: string | undefined
    this.id // тип: number | string | undefined
    this.msg // тип: string
    this.metadata // тип: any
  }
})
```

Однак параметри `props` під час виконання, підтримують лише використання конструктора функцій, в якості типу реквізиту - немає способу вказати складні типи, такі як об'єкти з вкладеними властивостями або сигнатури виклику функції.

Щоб анотувати складні типи реквізитів, ми можемо використовувати утиліту типу `PropType`:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      // надання більш конкретного типу для `Object`
      type: Object as PropType<Book>,
      required: true
    },
    // також можна анотувати функції
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // string
    this.book.year // number

    // TS Помилка: аргумент типу "string" не можна
    // призначити параметру типу 'number'
    this.callback?.('123')
  }
})
```

### Застереження {#caveats}

Якщо ваша версія TypeScript нижча за `4.7`, ви повинні бути обережними, використовуючи функції для опцій реквізиту `validator` і `default` - обов'язково використовуйте стрілочні функції:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // Обов’язково використовуйте стрілочні функції, якщо ваша версія TypeScript нижча за 4.7
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

Це запобігає TypeScript від необхідності визначати тип `this` у цих функціях, що, на жаль, може призвести до помилки визначення типу. Це [обмеження](https://github.com/microsoft/TypeScript/issues/38845) було в попередній версії, і тепер покращено в [TypeScript 4.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#improved-function-inference-in-objects-and-methods).

## Типізація випромінювань компонента {#typing-component-emits}

Ми можемо оголосити очікуваний тип корисного навантаження для випромінювача події, використовуючи об’єкт синтаксису опції `emits`. Крім того, усі неоголошені випромінювачі подій викликатимуть типову помилку:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // виконати перевірку під час виконання
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // Помилка типу!
      })

      this.$emit('non-declared-event') // Типова помилка!
    }
  }
})
```

## Типізація обчислюваних властивостей {#typing-computed-properties}

Обчислювана властивість визначає свій тип на основі свого значення при поверненні:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // тип: string
  }
})
```

У деяких випадках ви можете явно анотувати тип обчислюваної властивості, щоб переконатися, в правильності реалізації:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // явно анотувати тип повернення
    greeting(): string {
      return this.message + '!'
    },

    // анотування доступної для запису обчисленої властивості
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

Явні анотації також можуть знадобитися в деяких граничних випадках, коли TypeScript не може визначити тип обчисленої властивості через циклічні визначення.

## Типізація обробників подій {#typing-event-handlers}

При роботі з нативними подіями DOM може бути корисним правильно типізувати аргумент, який ми передаємо обробнику. Розгляньмо це на прикладі:

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // `event` неявно має тип "any".
      console.log(event.target.value)
    }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

Без анотації типу аргумент `event` неявно матиме тип `any`. Це також призведе до помилки TS, якщо `"strict": true` або `"noImplicitAny": true` використовуються в `tsconfig.json`. Тому рекомендується явно анотувати аргументи обробників подій. Крім того, вам може знадобитися явно надати властивості для `event`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event: Event) {
      console.log((event.target as HTMLInputElement).value)
    }
  }
})
```

## Доповнення глобальних властивостей {#augmenting-global-properties}

Деякі плагіни інсталюють глобально доступні властивості для всіх екземплярів компонента за допомогою [`app.config.globalProperties`](/api/application.html#app-config-globalproperties). Наприклад, ми можемо інсталювати `this.$http` для отримання даних, або `this.$translate` для інтернаціоналізації. Щоб це добре працювало з TypeScript, Vue надає інтерфейс `ComponentCustomProperties`, призначений для доповнення за допомогою [доповнення модуля TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation):

```ts
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

Також до вашої уваги:

- [TypeScript модульні тести для доповнення типів компонентів](https://github.com/vuejs/core/blob/main/packages/dts-test/componentTypeExtensions.test-d.tsx)

### Розміщення доповнень типу {#type-augmentation-placement}

Ми можемо розмістити це доповнення типу у файлі `.ts` або у файлі `*.d.ts` для всього проєкту. У будь-якому випадку переконайтеся, що його включено в `tsconfig.json`. Для авторів бібліотек/плагінів цей файл слід вказати у властивості `types` у `package.json`.

Щоб скористатися перевагами доповнення модуля, вам потрібно буде переконатися, що доповнення розміщено в [модулі TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html). Тобто файл має містити принаймні один `import` або `export` верхнього рівня, навіть якщо це просто `export {}`. Якщо доповнення розміщено за межами модуля, воно перезапише вихідні типи, а не доповнить їх!

```ts
// Не працює, перезаписує вихідні типи.
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

```ts
// Працює правильно
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

## Доповнення користувацьких параметрів {#augmenting-custom-options}

Деякі плагіни, наприклад `vue-router`, забезпечують підтримку користувацьких параметрів компонента, таких як `beforeRouteEnter`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // ...
  }
})
```

Без належного доповнення типу, аргументи цього хука неявно матимуть тип `any`. Ми можемо доповнити інтерфейс `ComponentCustomOptions`, щоб підтримувати ці користувацькі параметри:

```ts
import { Route } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomOptions {
    beforeRouteEnter?(to: Route, from: Route, next: () => void): void
  }
}
```

Тепер параметр `beforeRouteEnter` буде правильного типу. Зауважте, що це лише приклад - добре типізовані бібліотеки, такі як `vue-router`, повинні автоматично виконувати ці доповнення у власних визначеннях типів.

Розміщення цього доповнення підпадає під [ті самі обмеження](#type-augmentation-placement), що й глобальні доповнення властивостей.

Також до вашої уваги:

- [TypeScript TypeScript модульні тести для доповнення типів компонентів](https://github.com/vuejs/core/blob/main/packages/dts-test/componentTypeExtensions.test-d.tsx)
