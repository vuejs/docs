---
pageClass: api
---

# Встроенные компоненты {#built-in-components}

:::info Регистрация и использование
Встроенные компоненты можно использовать в шаблонах без их регистрации. Так же они являются "tree-shakeable": они включаются в сборку только тогда, когда они используются.

При использовании в [render-функции](/guide/extras/render-function.html), они должны быть импортированы в явном виде. Например:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```
:::

## `<Transition>`

Обеспечивает эффекты анимированного перехода **одного** элемента или компонента.

- **Входные параметры:**

  ```ts
  interface TransitionProps {
    /**
     * Используется для автоматической генерации CSS-классов перехода.
     * Например, `name: 'fade'` автоматически раскроется в `.fade-enter`,
     * `.fade-enter-active` и т.д.
     */
    name?: string
    /**
     * Применять ли СSS-классы переходов.
     * По умолчанию: true
     */
    css?: boolean
    /**
     * Указывает тип событий перехода, которые необходимо ждать 
     * для определения момента окончания перехода.
     * По умолчанию автоматически выбирается тип с большей длительностью.
     */
    type?: 'transition' | 'animation'
    /**
     * Определяет длительность перехода.
     * По умолчанию Vue ждёт первого события `transitionend`
     * или `animationend` на корневом элементе.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * Управляет последовательностью переходов исчезновения/появления.
     * По умолчанию — одновременно.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * Применять ли переход при первоначальном рендере.
     * По умолчанию: false
     */
    appear?: boolean

    /**
     * Параметры для настройки классов перехода.
     * Используйте kebab-case в шаблонах, например enter-from-class="xxx"
     */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **События:**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (только для `v-show`)
  - `@appear-cancelled`

- **Пример:**

  Простой элемент:

  ```vue-html
  <Transition>
    <div v-if="ok">переключаемое содержимое</div>
  </Transition>
  ```

  Динамический компонент, используются параметры mode и appear:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  Прослушивание событий перехода:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">переключаемое содержимое</div>
  </Transition>
  ```

- **См. также:** [Руководство - Transition](/guide/built-ins/transition.html)

## `<TransitionGroup>`

Обеспечивает эффекты перехода для **нескольких** элементов или компонентов в списке.

- **Входные параметры:**

  `<TransitionGroup>` принимает те же параметры, что и `<Transition>`, за исключением `mode`, плюс два дополнительных параметра:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /*
     * Если не определен, то рендерится как fragment.
     */
    tag?: string
    /**
     * Для переопределения CSS-класса, применяемого во время анимаций перемещения.
     * Используйте kebab-case в шаблонах, например move-class="xxx"
     */
    moveClass?: string
  }
  ```

- **События:**

  `<TransitionGroup>` генерирует те же события, что и `<Transition>`.

- **Подробности:**

  По умолчанию `<TransitionGroup>` не создаёт DOM-элемент, но его можно задать с помощью параметра `tag`.

  Обратите внимание, что у каждого потомка `<transition-group>` должен быть [**уникальный ключ**](/guide/essentials/list.html#maintaining-state-with-key) для правильной работы анимаций.

  `<TransitionGroup>` поддерживает анимации перемещения с помощью CSS трансформаций. Если положение потомка на экране изменится после обновления, ему будет добавлен CSS-класс (автоматически сгенерированный из атрибута `name` или заданный параметром `move-class`). Если после применения этого класса CSS-свойство `transform` возможно анимировать, элемент будет плавно перемещён в новое положение с помощью [техники FLIP](https://aerotwist.com/blog/flip-your-animations/).

- **Пример:**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **См. также:** [Руководство - TransitionGroup](/guide/built-ins/transition-group.html)

## `<KeepAlive>`

Кэширует содержащиеся внутри динамически переключаемые компоненты.

- **Входные параметры:**

  ```ts
  interface KeepAliveProps {
    /**
     * Если определено, то только компоненты с подходящими под
     * `include` именами будут кэшированы.
     */
    include?: MatchPattern
    /**
     * Любой компонент с именем подходящим под `exclude`
     * не будет кэшироваться.
     */
    exclude?: MatchPattern
    /**
     * Максимальное количество кэшируемых экземпляров компонентов.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **Подробности:**

  При оборачивании вокруг динамического компонента, `<KeepAlive>` кэширует неактивные экземпляры компонентов, не уничтожая их.

  В любой момент времени в качестве прямого потомка `<KeepAlive>` может быть только один активный экземпляр компонента.

  При переключении компонента внутри `<KeepAlive>` будут вызываться его хуки жизненного цикла `activated` и `deactivated` соответственно, предоставляя альтернативу хукам `mounted` и `unmounted`, которые не вызываются. Это относится как к непосредственному потомку `<KeepAlive>`, так и ко всем прочим его потомкам.

- **Пример:**

  Базовое использование:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  Когда используется с `v-if` / `v-else` ветвями, одновременно должен рендериться только один компонент:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  Использование вместе с `<Transition>`:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  Использование `include` / `exclude`:

  ```vue-html
  <!-- строка, с перечислением через запятую -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- регулярное выражение (используется `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- массив (используется `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  Использование с `max`:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **См. также:** [Руководство - KeepAlive](/guide/built-ins/keep-alive.html)

## `<Teleport>`

Перемещает содержимое своего слота в другую часть DOM.

- **Входные параметры:**

  ```ts
  interface TeleportProps {
    /**
     * Обязательный. Задаёт целевой контейнер.
     * Может быть селектором или непосредственно элементом.
     */
    to: string | HTMLElement
    /**
     * Если `true`, содержимое останется на своем первоначальном
     * месте, вместо перемещения в целевой контейнер.
     * Может изменяться динамически.
     */
    disabled?: boolean
  }
  ```

- **Пример:**

  Указание целевого контейнера:

  ```vue-html
  <teleport to="#some-id" />
  <teleport to=".some-class" />
  <teleport to="[data-teleport]" />
  ```

  Перемещение по условию:

  ```vue-html
  <teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </teleport>
  ```

- **См. также:** [Руководство - Teleport](/guide/built-ins/teleport.html)

## `<Suspense>` <sup class="vt-badge experimental" />

Используется для оркестровки вложенных асинхронных зависимостей в дереве компонентов.

- **Входные параметры:**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
  }
  ```

- **События:**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **Подробности:**

  `<Suspense>` принимает два слота: `#default` и `#fallback`. Он будет отображать содержимое `#fallback` слота во время рендеринга `#default` слота в памяти.

  Если он встречает асинхронные зависимости ([Асинхронные компоненты](/guide/components/async.html) и компоненты с [`async setup()`](/guide/built-ins/suspense.html#async-setup)) во время рендеринга `#default` слота, он будет ждать, пока все они не будут разрешены, прежде чем отобразить `#default` слот.

- **См. также:** [Руководство - Suspense](/guide/built-ins/suspense.html)
