# Экземпляр компонента {#component-instance}

:::info Информация
На этой странице описаны встроенные свойства и методы, доступные в общедоступном экземпляре компонента, т.е. `this`.

Все свойства, перечисленные на этой странице, доступны только для чтения (за исключением вложенных свойств в `$data`).
:::

## $data {#data}

Объект, возвращенный из параметра [`data`](./options-state.html#data), который компонент сделал реактивным. Экземпляр компонента проксирует доступ к свойствам объекта данных.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props {#props}

Объект, содержащий текущие входные параметры, которые получил компонент.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **Подробности:**

  Будут включены только параметры, объявленные с помощью опции [`props`](./options-state.html#props). Экземпляр компонента предоставляет прокси-доступ к свойствам своего объекта props.

## $el {#el}

Корневой узел DOM, которым управляет экземпляр компонента.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $el: Node | undefined
  }
  ```

- **Подробности:**

  `$el` будет `undefined`, пока компонент не будет [смонтирован](./options-lifecycle#mounted).

  - Для компонентов с одним корневым элементом, `$el` будет указывать на этот элемент.
  - Для компонентов с текстовым корнем `$el` будет указывать на текстовый узел.
  - Для компонентов с несколькими корневыми узлами `$el` будет узлом-заполнителем DOM, который Vue использует для отслеживания позиции компонента в DOM (текстовый узел или узел комментария в режиме гидратации SSR).

  :::tip Совет
  Для обеспечения согласованности рекомендуется использовать [ссылки на шаблон](/guide/essentials/template-refs.html) для прямого доступа к элементам вместо того, чтобы полагаться на `$el`.
  :::

## $options {#options}

Разрешенные параметры компонента, используемые для создания экземпляра текущего компонента.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **Подробности:**

  Объект `$options` раскрывает разрешенные опции для текущего компонента и является результатом слияния этих возможных источников:

  - Глобальные миксины
  - Компонент `расширяемый` базовый
  - Компонентные миксины

  Обычно он используется для поддержки пользовательских параметров компонента:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **См. также:** [`app.config.optionMergeStrategies`](/api/application.html#app-config-optionmergestrategies)

## $parent {#parent}

Родительский экземпляр, если у текущего экземпляра он есть. Для самого корневого экземпляра это будет `null`.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root {#root}

Экземпляр корневого компонента текущего дерева компонентов. Если у текущего экземпляра нет родителя, то значением будет он сам.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots {#slots}

Объект, представляющий [слоты](/guide/components/slots.html ), передаваемый родительским компонентом.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **Подробности:**

  Обычно используется при ручном создании [функций рендеринга](/guide/extras/render-function.html ), но также может использоваться для определения наличия слота.

  Каждый слот отображается в `this.$slots` как функция, которая возвращает массив узлов под ключом, соответствующим имени этого слота. Слот по умолчанию отображается как `this.$slots.default`.

  Если слот является [слотом с ограниченной областью действия](/guide/components/slots.html#scoped-slots), аргументы, переданные функциям слота, доступны слоту в качестве реквизита слота.

- **См. также:** [Функции рендеринга - слоты рендеринга](/guide/extras/render-function.html#rendering-slots)

## $refs {#refs}

Объект элементов DOM и экземпляров компонентов, зарегистрированный через [атрибутов](/guide/essentials/template-refs.html).

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **См. также:**

  - [Ссылки на элементы шаблона](/guide/essentials/template-refs.html)
  - [Специальные атрибуты — ref](./built-in-special-attributes.md#ref)

## $attrs {#attrs}

Объект, содержащий атрибуты Fallthrough компонента.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **Подробности:**

  [Атрибуты Fallthrough](/guide/components/attrs.html) это атрибуты и обработчики событий, передаваемые родительским компонентом, но не объявленные дочерним компонентом как prop или событие, передаваемое дочерним компонентом.

  По умолчанию все, что содержится в `$attrs`, будет автоматически унаследовано в корневом элементе компонента, если существует только один корневой элемент. Это поведение отключено, если компонент имеет несколько корневых узлов, и может быть явно отключено с помощью опции [`inheritAttrs`](./options-разное.html#inheritattrs).

- **См. также:**

  - [Атрибуты Fallthrough](/guide/components/attrs.html)

## $watch() {#watch}

Императивный API для создания наблюдателей.

- **Тип:**

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
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Подробности:**

  Первый аргумент - это источник наблюдения. Это может быть строка имени свойства компонента, простая строка пути, разделенная точкой, или функция получения.

  Второй аргумент - это функция обратного вызова. Обратный вызов получает новое значение и старое значение наблюдаемого источника.

  - **`immediate`**: обратный вызов запускается сразу после создания наблюдателя. Старое значение будет `undefined` при первом вызове.
  - **`deep`**: принудительный глубокий обход источника, если это объект, так что обратный вызов срабатывает при глубоких мутациях. Смотрите [Глубокие наблюдатели](/guide/essentials/watchers.html#deep-watchers).
  - **`flush`**: настройте время очистки коллбэка. См. раздел [Тайминг очистки коллбэка](/guide/essentials/watchers.html#callback-flush-timing) и [`watchEffect()`](/api/reactivity-core.html#watcheffect).
  - **`onTrack / onTrigger`**: Для отладки зависимостей наблюдателя. См. [Отладка наблюдателя](/guide/extras/reactivity-in-depth.html#watcher-debugging).

- **Пример:**

  Наблюдение за именем свойства:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  Наблюдение за путём, разделенный точками:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  Использование getter для более сложных выражений:

  ```js
  this.$watch(
    // каждый раз, когда выражение `this.a + this.b` дает
    // другой результат, будет вызываться обработчик.
    // Это как если бы наблюдали за вычисляемым свойством.
    // не определяя само вычисляемое свойство.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  Остановка наблюдателя:

  ```js
  const unwatch = this.$watch('a', cb)

  // later...
  unwatch()
  ```

- **См. также:**
  - [Параметры - `watch`](/api/options-state.html#watch)
  - [Руководство - Наблюдатели](/guide/essentials/watchers.html)

## $emit() {#emit}

Запуск пользовательского события на текущем экземпляре. Любые дополнительные аргументы будут переданы в функцию коллбэка слушателя.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **Пример:**

  ```js
  export default {
    created() {
      // только определяя имя события:
      this.$emit('foo')
      // с передачей дополнительных аргументов:
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **См. также:**

  - [Компонент - События](/guide/components/events.html)
  - [`emits` опции](./options-state.html#emits)

## $forceUpdate() {#forceupdate}

Вызывает принудительную перерисовку экземпляра компонента.

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **Подробности:**

  Ввиду полностью автоматической системы реактивности в Vue это требуется крайне редко. Единственный случай, когда она может понадобиться, это когда вы явно создали нереактивное состояние компонента, используя расширенные API реактивности.

## $nextTick() {#nexttick}

Откладывает вызов коллбэка до следующего цикла обновления DOM. Используйте его сразу после изменения данных, чтобы дождаться обновления DOM.  [`nextTick()`](./general.html#nexttick).

- **Тип:**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **Подробности:**

  Единственное отличие от глобальной версии `nextTick()` заключается в том, что коллбэк, переданный `this.$next Trick()`, будет иметь контекст `this`, привязанный к текущему экземпляру компонента.

- **См. также:** [`nextTick()`](./general.html#nexttick)
