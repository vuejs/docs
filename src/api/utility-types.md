# Типи утиліт {#utility-types}

:::info
На цій сторінці наведено лише кілька типів утиліт, які зазвичай використовуються, і, можливо, потребуватимуть пояснення щодо їх використання. Щоб отримати повний список експортованих типів, зверніться до [початкового коду](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131).
:::

## PropType\<T> {#proptype-t}

Використовується для анотації реквізиту з більш розширеними типами під час використання декларацій реквізитів під час виконання.

- **Приклад**

  ```ts
  import type { PropType } from 'vue'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // надайте більш конкретний тип для `Object`
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **Дивіться також:** [Посібник - Типізація реквізитів компонентів](/guide/typescript/options-api#typing-component-props)

## MaybeRef\<T> {#mayberef}

Псевдонім для `T | Ref<T>`. Корисно для анотування аргументів [Композиційних функцій](/guide/reusability/composables.html).

- Підтримується лише в 3.3+.

## MaybeRefOrGetter\<T> {#maybereforgetter}

Псевдонім для `T | Ref<T> | (() => T)`. Корисно для анотування аргументів [Композиційних функцій](/guide/reusability/composables.html).

- Підтримується лише в 3.3+.

## ExtractPropTypes\<T> {#extractproptypes}

Витягти типи реквізитів з об'єкту параметрів реквізитів під час виконання. Витягнуті типи є внутрішніми, тобто вирішеними реквізитами, отриманими компонентом. Це означає, що булеві реквізити та реквізити зі значеннями за замовчуванням завжди визначені, навіть якщо вони не потрібні.

Щоб витягти загальнодоступні реквізити, тобто реквізити, які дозволено передати батьківському, використовуйте [`ExtractPublicPropTypes`](#extractpublicproptypes).

- **Приклад**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar: boolean,
  //   baz: number,
  //   qux: number
  // }
  ```

## ExtractPublicPropTypes\<T> {#extractpublicproptypes}

Витягти типи реквізитів з об'єкта параметрів реквізиту під час виконання. Витягнуті типи є загальнодоступними, тобто реквізитами, які дозволено передати батьківському.

- **Приклад**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPublicPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar?: boolean,
  //   baz: number,
  //   qux?: number
  // }
  ```

## MaybeRef\<T> {#mayberef}

Псевдонім для `T | Ref<T>`. Корисно для анотування аргументів [Композиційних функцій](/guide/reusability/composables.html).

- Підтримується лише в 3.3+.

## MaybeRefOrGetter\<T> {#maybereforgetter}

Псевдонім для `T | Ref<T> | (() => T)`. Корисно для анотування аргументів [Композиційних функцій](/guide/reusability/composables.html).

- Підтримується лише в 3.3+.

## ExtractPropTypes\<T> {#extractproptypes}

Витягти типи реквізитів з об'єкту параметрів реквізитів під час виконання. Витягнуті типи є внутрішніми, тобто вирішеними реквізитами, отриманими компонентом. Це означає, що булеві реквізити та реквізити зі значеннями за замовчуванням завжди визначені, навіть якщо вони не потрібні.

Щоб витягти загальнодоступні реквізити, тобто реквізити, які дозволено передати батьківському, використовуйте [`ExtractPublicPropTypes`](#extractpublicproptypes).

- **Приклад**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar: boolean,
  //   baz: number,
  //   qux: number
  // }
  ```

## ExtractPublicPropTypes\<T> {#extractpublicproptypes}

Витягти типи реквізитів з об'єкта параметрів реквізитів під час виконання. Витягнуті типи є загальнодоступними, тобто реквізитами, які дозволено передати батьківському.

- **Приклад**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPublicPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar?: boolean,
  //   baz: number,
  //   qux?: number
  // }
  ```

## ComponentCustomProperties {#componentcustomproperties}

Використовується для розширення типу екземпляра компонента для підтримки користувацьких глобальних властивостей.

- **Приклад**

  ```ts
  import axios from 'axios'

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip
  Доповнення мають бути розміщені у файлі модуля `.ts` або `.d.ts`. Додаткову інформацію дивіться у розділі [Розміщення доповнення типу](/guide/typescript/options-api#augmenting-global-properties).
  :::

- **Дивіться також:** [Посібник - Доповнення глобальних властивостей](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

Використовується для доповнення типу опцій компонента для підтримки опцій з налаштуванням.

- **Приклад**

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip
  Доповнення мають бути розміщені у файлі модуля `.ts` або `.d.ts`. Додаткову інформацію дивіться у розділі [Розміщення доповнення типу](/guide/typescript/options-api#augmenting-global-properties).
  :::

- **Дивіться також:** [Посібник - Доповнення опцій з налаштуванням](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

Використовується для розширення дозволених реквізитів TSX, щоб використовувати неоголошені реквізити для елементів TSX.

- **Приклад**

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // тепер працює, навіть якщо hello не є оголошеним реквізитом
  <MyComponent hello="world" />
  ```

  :::tip
  Доповнення мають бути розміщені у файлі модуля `.ts` або `.d.ts`. Додаткову інформацію дивіться у розділі [Розміщення доповнення типу](/guide/typescript/options-api#augmenting-global-properties).
  :::

## CSSProperties {#cssproperties}

Використовується для збільшення дозволених значень у прив'язках властивостей стилю.

- **Приклад**

  Дозволити будь-які користувацькі властивості CSS

  ```ts
  declare module 'vue' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```

  ```html
  <div :style="{ '--bg-color': 'blue' }"></div>
  ```

:::tip
Доповнення мають бути розміщені у файлі модуля `.ts` або `.d.ts`. Додаткову інформацію дивіться у розділі [Розміщення доповнення типу](/guide/typescript/options-api#augmenting-global-properties).
:::

:::info Дивіться також
Теги SFC `<style>` підтримують зв'язування значень CSS із станом динамічного компонента за допомогою функції CSS `v-bind`. Це дозволяє використовувати спеціальні властивості без доповнення типу.

- [v-bind() у CSS](/api/sfc-css-features#v-bind-in-css)
  :::
