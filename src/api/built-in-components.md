---
pageClass: api
---

# Вбудовані компоненти {#built-in-components}

:::info Реєстрація та використання
Вбудовані компоненти можна використовувати безпосередньо в шаблонах без необхідності реєстрації. Вони також підтримують струшування дерева: вони включаються в збірку лише тоді, коли використовуються.

При їх використанні в [функціях рендерингу](/guide/extras/render-function.html), їх потрібно імпортувати явно. Наприклад:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* реквізити */
})
```

:::

## `<Transition>` {#transition}

Забезпечує анімовані ефекти переходу для **окремого** елемента або компонента.

- **Реквізити**

  ```ts
  interface TransitionProps {
    /**
     * Використовується для автоматичної генерації назв класів переходу CSS.
     * напр. `name: 'fade'` буде автоматично розширено до `.fade-enter`,
     * `.fade-enter-active`, тощо.
     */
    name?: string
    /**
     * Чи застосовувати класи переходу CSS.
     * За промовчанням: true
     */
    css?: boolean
    /**
     * Визначає тип подій переходу, на які потрібно чекати щоб
     * визначити час закінчення переходу.
     * Тип за промовчанням автоматично визначає тип, який має
     * більшу тривалість.
     */
    type?: 'transition' | 'animation'
    /**
     * Визначає явну тривалість переходу.
     * За промовчанням чекає першої `transitionend`
     * або `animationend` події на кореневому елементі переходу.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * Контролює послідовність синхронізації переходів виходу/входу.
     * Поведінка за промовчанням - одночасна.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * Чи застосовувати перехід під час початкового рендерингу.
     * За промовчанням: false
     */
    appear?: boolean

    /**
     * Реквізити для налаштування перехідних класів.
     * Використовуйте kebab-case в шаблонах, напр. enter-from-class="xxx"
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

- **Події**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (тільки для `v-show`)
  - `@appear-cancelled`

- **Приклад**

  Простий елемент:

  ```vue-html
  <Transition>
    <div v-if="ok">вміст, що перемикається</div>
  </Transition>
  ```

  Динамічний компонент з увімкненим режимом переходу + анімацією:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  Прослуховування перехідних подій:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">вміст, що перемикається</div>
  </Transition>
  ```

- **Також до вашої уваги:** [Гід `<Transition>`](/guide/built-ins/transition.html)

## `<TransitionGroup>` {#transitiongroup}

Забезпечує ефекти переходу для **декількох** елементів або компонентів у списку.

- **Реквізити**

  `<TransitionGroup>` приймає ті самі властивості, що і `<Transition>`, за винятком `mode`, а також дві додаткові властивості:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * Якщо не визначено, відрендериться як фрагмент.
     */
    tag?: string
    /**
     * Для налаштування класу CSS, застосованого під час переходів переміщення.
     * Використовуйте kebab-case в шаблонах, напр. move-class="xxx"
     */
    moveClass?: string
  }
  ```

- **Події**

  `<TransitionGroup>` випромінює ті самі події, що `<Transition>`.

- **Подробиці**

  За промовчанням `<TransitionGroup>` не рендерить DOM-елемент обгортки, але його можна визначити за допомогою властивості `tag`.

  Зауважте, що кожен дочірній елемент у `<transition-group>` повинен мати [**унікальний ключ**](/guide/essentials/list.html#maintaining-state-with-key), щоб анімації працювали належним чином.

  `<TransitionGroup>` підтримує переходи з переміщеннями за допомогою CSS transform. Якщо позиція дочірнього елемента на екрані змінилася після оновлення, до нього буде застосовано CSS-клас переміщення (автоматично створений з атрибута `name` або налаштований за допомогою реквізиту `move-class`). Якщо при застосуванні CSS `transform` властивості можливе переміщення, елемент буде плавно анімовано до місця призначення за допомогою [технології FLIP](https://aerotwist.com/blog/flip-your-animations/).

- **Приклад**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **Також до вашої уваги:** [Гід - TransitionGroup](/guide/built-ins/transition-group.html)

## `<KeepAlive>` {#keepalive}

Кешування динамічно перемикаємих компонент, загорнутих всередину.

- **Реквізити**

  ```ts
  interface KeepAliveProps {
    /**
     * Тільки компоненти з іменами, що збігаються, з
     * `include` будуть кешовані.
     */
    include?: MatchPattern
    /**
     * Будь-який компонент з відповідним ім'ям з `exclude`
     * не буде кешовано.
     */
    exclude?: MatchPattern
    /**
     * Максимальна кількість екземплярів компонентів для кешування.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **Подробиці**

  При обгортанні навколо динамічного компонента `<KeepAlive>` кешуватиме неактивні екземпляри компонентів, не знищуючи їх

  У будь-який час може бути лише один активний екземпляр компонента як прямий дочірній елемент `<KeepAlive>`.

  Коли компонент перемикається всередині `<KeepAlive>`, його хуки життєвого циклу `activated` та `deactivated` будуть викликані відповідно, надаючи альтернативу `mounted` і `unmounted`, які не викликаються. Це стосується прямого дочірнього елемента `<KeepAlive>`, а також усіх його нащадків.

- **Приклад**

  Базове використання:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  Якщо використовується з гілками `v-if` / `v-else`, одночасно повинен відтворюватися лише один компонент:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  Використовується разом з `<Transition>`:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  Використання `include` / `exclude`:

  ```vue-html
  <!-- рядок, розділений комами -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- regex (використання `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- Array (використання `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  Використання з `max`:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **Також до вашої уваги:** [Гід - KeepAlive](/guide/built-ins/keep-alive.html)

## `<Teleport>` {#teleport}

Рендеринг вмісту свого слота в іншій частині DOM.

- **Реквізити**

  ```ts
  interface TeleportProps {
    /**
     * Обов'язковий вхідний реквізит. Визначиний цільовий контейнер.
     * Може бути селектором або фактичним елементом.
     */
    to: string | HTMLElement
    /**
     * Якщо `true`, вміст залишиться в оригінальному вигляді
     * розташування замість переміщення в цільовий контейнер.
     * Можна динамічно змінювати.
     */
    disabled?: boolean
  }
  ```

- **Приклад**

  Визначення цільового контейнера:

  ```vue-html
  <teleport to="#some-id" />
  <teleport to=".some-class" />
  <teleport to="[data-teleport]" />
  ```

  Умовне відключення:

  ```vue-html
  <teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </teleport>
  ```

- **Також до вашої уваги:** [Гід - Teleport](/guide/built-ins/teleport.html)

## `<Suspense>` <sup class="vt-badge experimental" /> {#suspense}

Використовується для управління вкладених асинхронних залежностей у дереві компонентів.

- **Реквізити**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
  }
  ```

- **Події**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **Подробиці**

  `<Suspense>` приймає два слоти: `#default` слот і `#fallback` слот. Він показуватиме вміст `#fallback` слота під час рендерингу слота за промовчанням у пам’яті.

  Якщо він зустрічає асинхронні залежності ([Асинхронні компоненти](/guide/components/async.html) й компоненти з [`async setup()`](/guide/built-ins/suspense.html#async-setup)) під час рендерингу слота за промовчанням, він чекатиме, доки всі вони будуть вирішені, перш ніж показати слот за промовчанням.

- **Також до вашої уваги:** [Гід - Suspense](/guide/built-ins/suspense.html)
