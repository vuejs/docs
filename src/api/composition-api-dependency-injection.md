# Композиційний АРІ: <br>Ін'єкція залежностей {#composition-api-dependency-injection}

## provide() {#provide}

Надає значення, яке може бути вставлено компонентами-нащадками.

- **Тип**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **Подробиці**

  `provide()` приймає два аргументи: ключ, який може бути рядком або символом, і значення, яке потрібно ввести.

  Під час використання TypeScript ключ може бути символом, приведеним утилітою типу `InjectionKey` наданою Vue, яка розширює `Symbol`, який можна використовувати для синхронізації типу значення між `provide()` та `inject()`.

  Подібно до API реєстрації хуків життєвого циклу, `provide()` має викликатися синхронно під час фази `setup()` компонента.

- **Приклад**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // надати статичне значення
  provide('foo', 'bar')

  // надати реактивне значення
  const count = ref(0)
  provide('count', count)

  // надати з символьними ключами
  provide(fooSymbol, count)
  </script>
  ```

- **Також до вашої уваги**:
  - [Гід - Provide / Inject](/guide/components/provide-inject.html)
  - [Гід - Типізація Provide/InjectProvide / Inject](/guide/typescript/composition-api.html#typing-provide-inject) <sup class="vt-badge ts" />

## inject() {#inject}

Введення значення, надане батьківським компонентом або застосунком (через `app.provide()`).

- **Тип**

  ```ts
  // без значення за замовчуванням
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // зі значенням за замовчуванням
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // з фабричною функцією
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **Подробиці**

  Перший аргумент - ключ ін'єкції. Vue пройде по батьківському ланцюжку, щоб знайти надане значення з відповідним ключем. Якщо кілька компонентів у батьківському ланцюжку надають той самий ключ, той, що є найближчим до компонента, що вводить, «затьмарюватиме» компоненти, що знаходяться вище в ланцюжку. Якщо значення з відповідним ключем не знайдено, `inject()` повертає `undefined`, якщо не вказано значення за замовчуванням.

  Другий аргумент є необов'язковим і є значенням за замовчуванням, яке використовується, якщо відповідне значення не знайдено. Це також може бути фабрична функція для повернення значень, створення яких є дорогим. Якщо значенням за замовчуванням є функція, тоді третім аргументом потрібно передати `false`, щоб вказати, що функція має використовуватися як значення замість фабрики.

  Подібно до API реєстрації хуків життєвого циклу, `inject()` має викликатися синхронно під час фази `setup()` компонента.

  Під час використання TypeScript ключ може бути символом, приведеним утилітою типу `InjectionKey` наданою Vue, яка розширює `Symbol`, який можна використовувати для синхронізації типу значення між `provide()` та `inject()`.

- **Приклад**

  Припустимо, що батьківський компонент надав значення, як показано в попередньому `provide()` Приклад:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // ввести статичне значення за замовчуванням
  const foo = inject('foo')

  // ввести реактивне значення
  const count = inject('count')

  // ввести зз символьними ключами
  const foo2 = inject(fooSymbol)

  // ввести зі значенням за замовчуванням
  const bar = inject('foo', 'default value')

  // ввести зі значенням за замовчуванням фабричну функцію
  const baz = inject('foo', () => new Map())

  // ввести зі значенням за замовчуванням функцію, передаючи 3-й аргумент
  const fn = inject('function', () => {}, false)
  </script>
  ```

- **Також до вашої уваги**:
  - [Гід - Provide / Inject](/guide/components/provide-inject.html)
  - [Гід - Типізація Provide / Inject](/guide/typescript/composition-api.html#typing-provide-inject) <sup class="vt-badge ts" />
