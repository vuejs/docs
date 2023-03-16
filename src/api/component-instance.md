# Екземпляр компонента {#component-instance}

:::info Примітка
Ця сторінка документує вбудовані властивості та методи, доступні для загальнодоступного екземпляра компонента, тобто `this`.

Усі властивості, перелічені на цій сторінці, доступні лише для читання (крім вкладених властивостей у `$data`).
:::

## $data {#data}

Об’єкт, повернутий параметром [`data`](./options-state#data), зроблений реактивним компонентом. Екземпляр компонента проксує доступ до властивостей об'єкта даних.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props {#props}

Об’єкт, що представляє поточні дозволені реквізити компонента.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **Подробиці**

  Будуть включені лише реквізити, оголошені за допомогою параметра [`props`](./options-state#props). Екземпляр компонента проксує доступ до властивостей об'єкта реквізитів.

## $el {#el}

Кореневий вузол DOM, яким керує екземпляр компонента.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $el: Node | undefined
  }
  ```

- **Подробиці**

  `$el` буде `undefined`, доки компонент не буде [змонтовано](./options-lifecycle#mounted).

  - Для компонентів з одним кореневим елементом `$el` вказуватиме на цей елемент.
  - Для компонентів із текстовим коренем `$el` вказуватиме на текстовий вузол.
  - Для компонентів із кількома кореневими вузлами `$el` буде підмінним елементом DOM вузла, який Vue використовує для відстеження позиції компонента в DOM (текстовий вузол або вузол коментаря в режимі SSR гідратації).

  :::tip Порада:
  Для узгодженості рекомендується використовувати [посилання шаблону](/guide/essentials/template-refs) для прямого доступу до елементів замість того, щоб покладатися на `$el`.
  :::

## $options {#options}

Вирішені параметри компонента, які використовуються для створення екземпляра поточного компонента.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **Подробиці**

  Об’єкт `$options` відкриває дозволені параметри для поточного компонента та є результатом злиття цих можливих джерел:

  - Глобальні міксини
  - Компонент з `extends`
  - Компонентні міксини

  Зазвичай він використовується для підтримки користувацьких параметрів компонента:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **Також до вашої уваги:** [`app.config.optionMergeStrategies`](/api/application#app-config-optionmergestrategies)

## $parent {#parent}

Батьківський екземпляр, якщо його має поточний екземпляр. Він буде `null` для самого кореневого екземпляра.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root {#root}

Екземпляр кореневого компонента поточного дерева компонентів. Якщо поточний екземпляр не має батьків, то значенням буде він сам.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots {#slots}

Об’єкт, що представляє [слоти](/guide/components/slots), передані батьківським компонентом.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **Подробиці**

  Зазвичай використовується під час ручного створення [функцій рендерингу](/guide/extras/render-function), але також може використовуватися для виявлення наявності слота.

  Кожен слот представлений у `this.$slots` як функція, яка повертає масив vnodes під ключем, що відповідає назві цього слота. Слот за промовчанням представлено як `this.$slots.default`.

  Якщо слот є [слотом з областю дії](/guide/components/slots#scoped-slots), аргументи, передані функціям слота, доступні для слота як його атрибути.

- **Також до вашої уваги:** [Функції рендерингу - рендеринг слотів](/guide/extras/render-function#rendering-slots)

## $refs {#refs}

Об’єкт елементів DOM і екземплярів компонентів, зареєстрованих через [посилання шаблону](/guide/essentials/template-refs).

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **Також до вашої уваги:**

  - [Посилання шаблону](/guide/essentials/template-refs)
  - [Спеціальні атрибути - референція](./built-in-special-attributes#ref)

## $attrs {#attrs}

Об’єкт, який містить прохідні атрибути компонента.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **Подробиці**

  [Прохідні атрибути](/guide/components/attrs) — це атрибути та обробники подій, які передаються батьківським компонентом, але не оголошуються дочірнім компонентом як реквізит або випромінювач події.

  За промовчанням усе в `$attrs` буде автоматично успадковано кореневим елементом компонента, якщо є лише один кореневий елемент. Ця поведінка вимкнена, якщо компонент має кілька кореневих вузлів, і її можна явно вимкнути за допомогою параметра [`inheritAttrs`](./options-misc#inheritattrs).

- **Також до вашої уваги:**

  - [Прохідні атрибути](/guide/components/attrs)

## $watch() {#watch}

Імперативний API для створення спостерігачів.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // за промовчанням: false
    deep?: boolean // за промовчанням: false
    flush?: 'pre' | 'post' | 'sync' // за промовчанням: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Подробиці**

  Перший аргумент - це джерело спостереження. Це може бути рядок імені властивості компонента, простий рядок шляху, розділеного крапками, або getter функція.

  Другим аргументом є функція зворотного виклику. Зворотний виклик отримує нове значення та старе значення джерела, за яким ведеться спостереження.

  - **`immediate`**: активувати зворотний виклик негайно після створення спостерігача. Під час першого виклику старе значення буде `undefined`.
  - **`deep`**: примусовий глибокий обхід джерела, якщо це об’єкт, так що зворотний виклик запускає глибокі зміни. Див. [Глибинні спостерігачі](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: регулює час спрацювання зворотного виклику. Див. [Час спрацювання](/guide/essentials/watchers#callback-flush-timing) і [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: налагодити залежності спостерігача. Див. [Налагодження спостерігача](/guide/extras/reactivity-in-depth#watcher-debugging).

- **Приклад**

  Спостереження за назвою властивості:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  Спостереження за шляхом, який розділений крапками:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  Використання getter для більш складних виразів:

  ```js
  this.$watch(
    // кожного разу, коли вираз `this.a + this.b` повертає різний
    // результат, буде викликаний обробник.
    // Це ніби ми спостерігаємо за обчислюваною властивістю
    // без визначення самої обчислюваної властивості.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  Зупинка спостерігача:

  ```js
  const unwatch = this.$watch('a', cb)

  // пізніше...
  unwatch()
  ```

- **Також до вашої уваги:**
  - [Опції - `watch`](/api/options-state#watch)
  - [Гід - Спостерігачі](/guide/essentials/watchers)

## $emit() {#emit}

Ініціювати спеціальну подію в поточному екземплярі. Будь-які додаткові аргументи будуть передані у функцію зворотного виклику слухача.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **Приклад**

  ```js
  export default {
    created() {
      // тільки подія
      this.$emit('foo')
      // з додатковими аргументами
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **Також до вашої уваги:**

  - [Події компонентів](/guide/components/events)
  - [`emits` опція](./options-state#emits)

## $forceUpdate() {#forceupdate}

Викликає примусовий рендеринг екземпляра компонента.

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **Подробиці**

  Це рідко потрібно, враховуючи повністю автоматичну систему реактивності Vue. Єдині випадки, коли вам це може знадобитися, це коли ви явно створили нереактивний стан компонента за допомогою розширеного API реактивності.

## $nextTick() {#nexttick}

Екземпляр прив'язаний до глобальної версії [`nextTick()`](./general#nexttick).

- **Тип**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **Подробиці**

  Єдина відмінність від глобальної версії `nextTick()` полягає в тому, що зворотний виклик, переданий `this.$nextTick()`, матиме контекст `this`, прив'язаний до поточного екземпляра компонента.

- **Також до вашої уваги:** [`nextTick()`](./general#nexttick)
