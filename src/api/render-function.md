# API функції рендерингу {#render-function-apis}

## h() {#h}

Створює віртуальні вузли DOM (vnodes).

- **Тип**

  ```ts
  // повна сигнатура
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // без реквізитів
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > Типи спрощено для зручності читання.

- **Подробиці**

  Перший аргумент може бути або рядком (для рідних елементів), або визначенням компонента Vue. Другим аргументом є атрибути, які потрібно передати, а третім аргументом є дочірні елементи.

  Під час створення vnode компонента дочірні елементи повинні бути передані як функції слотів. Можна передати єдину функцію слота, якщо компонент очікує лише слот за замовчуванням. В іншому випадку слоти повинні бути передані як об'єкт функцій слота.

  Для зручності аргумент реквізитів можна опустити, якщо дочірні елементи не є об'єктами слотів.

- **Приклад**

  Створення рідних елементів:

  ```js
  import { h } from 'vue'

  // усі аргументи, крім типу, необов'язкові
  h('div')
  h('div', { id: 'foo' })

  // як атрибути, так і властивості можна використовувати
  // в реквізитах
  // Vue автоматично вибирає правильний спосіб їх призначення
  h('div', { class: 'bar', innerHTML: 'hello' })

  // class і style мають ту саму підтримку значень
  // object / array, як і в шаблонах
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // слухачі подій мають бути передані як onXxx
  h('div', { onClick: () => {} })

  // дочірні елементи можуть бути строковими
  h('div', { id: 'foo' }, 'hello')

  // реквізити можуть бути не вказані, якщо їх немає
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // масив дочірніх елементів може містити змішані vnodes і strings
  h('div', ['hello', h('span', 'hello')])
  ```

  Створення компонентів:

  ```js
  import Foo from './Foo.vue'

  // передавання реквізитів
  h(Foo, {
    // еквівалент some-prop="hello"
    someProp: 'hello',
    // еквівалент @update="() => {}"
    onUpdate: () => {}
  })

  // передавання єдиного слоту за замовчуванням
  h(Foo, () => 'default slot')

  // передавання іменованих слотів
  // зауважте, що `null` потрібен, щоб об'єкт
  // слотів не розглядався як атрибути
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **Дивіться також:** [Посібник – Функції рендерингу – Створення віртуальних вузлів](/guide/extras/render-function#creating-vnodes)

## mergeProps() {#mergeprops}

Об'єднує кілька об'єктів реквізитів із спеціальною обробкою для певних реквізитів.

- **Тип**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **Подробиці**

  `mergeProps()` підтримує об'єднання кількох об'єктів реквізитів із спеціальною обробкою для наступних реквізитів:

  - `class`
  - `style`
  - `onXxx` слухачі подій - кілька слухачів з однаковою назвою будуть об'єднані в масив.

  Якщо вам не потрібне злиття і ви бажаєте здійснити простий перезапис, замість цього можна використовувати власне поширення об'єктів.

- **Приклад**

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## cloneVNode() {#clonevnode}

Клонує vnode.

- **Тип**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **Подробиці**

  Повертає клонований vnode з необов'язковими додатковими атрибутами для об'єднання з оригіналом.

  Vnode слід вважати незмінними після створення, і ви не повинні змінювати властивості існуючого vnode. Натомість клонуйте його за допомогою інших / додаткових реквізитів.

  Vnodes мають особливі внутрішні властивості, тому їх клонування не таке просте, як поширення об'єктів. `cloneVNode()` обробляє більшість внутрішньої логіки.

- **Приклад**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode() {#isvnode}

Перевіряє чи значення є vnode.

- **Тип**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## resolveComponent() {#resolvecomponent}

Для ручної резолюції зареєстрованого компонента за назвою.

- **Тип**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **Подробиці**

  **Примітка: вам це не потрібно, якщо ви можете імпортувати компонент безпосередньо.**

  `resolveComponent()` має бути викликано в<span class="composition-api"> `setup()` чи</span> функції рендерингу для резолюції з правильного контексту компонента.

  Якщо компонент не знайдено, буде видано попередження під час виконання та повернено рядок з ім'ям.

- **Приклад**

  <div class="composition-api">

  ```js
  const { h, resolveComponent } = Vue

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  const { h, resolveComponent } = Vue

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

  </div>

- **Дивіться також:** [Посібник – Функції рендерингу – Компоненти](/guide/extras/render-function#components)

## resolveDirective() {#resolvedirective}

Для ручної резолюції зареєстрованої директиви за назвою.

- **Тип**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **Подробиці**

  **Примітка: вам це не потрібно, якщо ви можете імпортувати компонент безпосередньо.**

  `resolveDirective()` має бути викликано в<span class="composition-api"> `setup()` чи</span> функції рендерингу для резолюції з правильного контексту компонента.

  Якщо директиву не знайдено, буде видане попередження під час виконання, і функція поверне `undefined`.

- **Дивіться також:** [Посібник - Функції рендерингу - Користувацькі директиви](/guide/extras/render-function#custom-directives)

## withDirectives() {#withdirectives}

Для додавання користувацьких директив до vnodes.

- **Тип**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **Подробиці**

  Огортає існуючий vnode користувацькими директивами. Другим аргументом є масив користувацьких директив. Кожна користувацька директива також представлена як масив у формі `[Directive, value, argument, modifiers]`. Кінцеві елементи масиву можна опустити, якщо вони не потрібні.

- **Приклад**

  ```js
  import { h, withDirectives } from 'vue'

  // користувацька директива
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **Дивіться також:** [Посібник - Функції рендерингу - Спеціальні директиви](/guide/extras/render-function#custom-directives)

## withModifiers() {#withmodifiers}

Для додавання вбудованих [`v-on` модифікаторів](/guide/essentials/event-handling#event-modifiers) до функції обробника подій.

- **Тип**

  ```ts
  function withModifiers(fn: Function, modifiers: string[]): Function
  ```

- **Приклад**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // еквівалент v-on.click.stop.prevent
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **Дивіться також:** [Посібник – Функції рендерингу – Модифікатори подій](/guide/extras/render-function#event-modifiers)
