---
outline: deep
---

# Функції рендерингу та JSX {#render-functions-jsx}

Vue рекомендує використовувати шаблони для створення застосунків у переважній більшості випадків. Однак є ситуації, коли нам потрібна повна програмна потужність JavaScript. Саме тут ми можемо використати **функцію рендерингу**.

> Якщо ви ще не знайомі з концепцією віртуальної DOM і функціями рендерингу, обов'язково прочитайте спочатку розділ [Механізм рендерингу](/guide/extras/rendering-mechanism).

## Основне використання {#basic-usage}

### Створення Vnodes {#creating-vnodes}

Vue надає функцію `h()` для створення vnodes:

```js
import { h } from 'vue'

const vnode = h(
  'div', // тип
  { id: 'foo', class: 'bar' }, // реквізити
  [
    /* дочірні елементи */
  ]
)
```

`h()` — це скорочення від **hyperscript**, що означає "JavaScript, який створює HTML (мова розмітки гіпертексту)". Це ім'я успадковано від угод, спільних для багатьох реалізацій віртуальної DOM. Більш точною назвою може бути `createVnode()`, але коротша назва допомагає, коли вам доводиться викликати цю функцію багато разів у функції рендерингу.

Функція `h()` розроблена як дуже гнучка:

```js
// усі аргументи, крім типу, необов'язкові
h('div')
h('div', { id: 'foo' })

// як атрибути, так і властивості можна використовувати в реквізитах
// Vue автоматично вибирає правильний спосіб призначення
h('div', { class: 'bar', innerHTML: 'hello' })

// можна додати модифікатори реквізитів, такі як `.prop` і `.attr`
// з префіксами `.` та `^` відповідно
h('div', { '.name': 'some-name', '^width': '100' })

// class і style мають ту саму підтримку значень
// об'єкта / масиву, що і у шаблонах
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// слухачі подій повинні передаватися як onXxx
h('div', { onClick: () => {} })

// дочірні елементи можуть бути рядком
h('div', { id: 'foo' }, 'hello')

// реквізити можна пропустити, якщо вони не вказуються
h('div', 'hello')
h('div', [h('span', 'hello')])

// масив дочірніх елементів може містити змішані вузли та рядки
h('div', ['hello', h('span', 'hello')])
```

Отриманий vnode має таку форму:

```js
const vnode = h('div', { id: 'foo' }, [])

vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```

:::warning Примітка
Повний інтерфейс `VNode` містить багато інших внутрішніх властивостей, але настійно рекомендується уникати використання будь-яких властивостей, окрім тих, що перелічені тут. Це дозволяє уникнути ненавмисної поломки в разі зміни внутрішніх властивостей.
:::

### Оголошення функцій рендерингу {#declaring-render-functions}

<div class="composition-api">

Під час використання шаблонів із Композиційного API, значення, що повертається хуком `setup()`, використовується для надання даних шаблону. Проте коли ми використовуємо функції рендерингу, ми можемо повернути функцію рендерингу натомість:

```js
import { ref, h } from 'vue'

export default {
  props: {
    /* ... */
  },
  setup(props) {
    const count = ref(1)

    // повернути рендер функцію
    return () => h('div', props.msg + count.value)
  }
}
```

Функція рендерингу оголошена всередині `setup()`, тому вона природним чином має доступ до реквізитів і будь-якого реактивного стану, який оголошено в тій же області.

Окрім повернення одного vnode, ви також можете повертати рядки або масиви:

```js
export default {
  setup() {
    return () => 'привіт мир!'
  }
}
```

```js
import { h } from 'vue'

export default {
  setup() {
    // використати масив для повернення кількох кореневих вузлів
    return () => [h('div'), h('div'), h('div')]
  }
}
```

:::tip
Обов'язково переконайтеся, що повертайте функцію, а не безпосередньо значення! Функція `setup()` викликається лише один раз для кожного компонента, у той час як повернута функція рендерингу буде викликана кілька разів.
:::

</div>
<div class="options-api">

Ми можемо оголосити функції рендерингу за допомогою опції `render`:

```js
import { h } from 'vue'

export default {
  data() {
    return {
      msg: 'привіт'
    }
  },
  render() {
    return h('div', this.msg)
  }
}
```

Функція `render()` має доступ до екземпляра компонента через `this`.

Окрім повернення одного vnode, ви також можете повертати рядки або масиви:

```js
export default {
  render() {
    return 'привіт мир!'
  }
}
```

```js
import { h } from 'vue'

export default {
  render() {
    // використати масив для повернення кількох кореневих вузлів
    return [h('div'), h('div'), h('div')]
  }
}
```

</div>

Якщо компоненту функції рендерингу не потрібен стан екземпляра, його також можна оголосити безпосередньо як функцію для стислості:

```js
function Hello() {
  return 'привіт мир!'
}
```

Правильно, це дійсний компонент Vue! Дивіться [Функціональні компоненти](#functional-components), щоб дізнатися більше про цей синтаксис.

### Vnodes мають бути унікальними {#vnodes-must-be-unique}

Усі vnodes у дереві компонентів мають бути унікальними. Це означає, що така функція відтворення недійсна:

```js
function render() {
  const p = h('p', 'hi')
  return h('div', [
    // Йой - дубльовані vnodes!
    p,
    p
  ])
}
```

Якщо ви дійсно хочете продублювати той самий елемент/компонент багато разів, ви можете зробити це за допомогою фабричної функції. Наприклад, наступна функція є ідеальним способом рендерингу 20 ідентичних абзаців:

```js
function render() {
  return h(
    'div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'hi')
    })
  )
}
```

## JSX / TSX {#jsx-tsx}

[JSX](https://facebook.github.io/jsx/) - це XML-подібне розширення для JavaScript, яке дозволяє нам писати такий код:

```jsx
const vnode = <div>привіт</div>
```

Використовуйте фігурні дужки у виразах JSX, щоб вбудовувати динамічні значення:

```jsx
const vnode = <div id={dynamicId}>привіт, {userName}</div>
```

`create-vue` та Vue CLI мають варіанти для проєктів скаффолдингу з попередньо налаштованою підтримкою JSX. Якщо ви налаштовуєте JSX вручну, зверніться до документації [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next), щоб дізнатися більше.

Хоча JSX був вперше представлений React, насправді він не має визначеної семантики під час виконання та може бути скомпільований у різні виводи. Якщо ви раніше працювали з JSX, зверніть увагу, що **перетворення JSX Vue відрізняється від перетворення JSX React**, тому ви не можете використовувати перетворення JSX React у застосунках Vue. Деякі помітні відмінності від React JSX включають наступне:

- Ви можете використовувати такі атрибути HTML, як `class` і `for` як реквізити - не потрібно використовувати `className` або `htmlFor`.
- Передача дочірніх компонентів (тобто слоти) [працює інакше](#passing-slots).

Визначення типів Vue також забезпечує визначення типів для використання TSX. Використовуючи TSX, обов'язково вкажіть `"jsx": "preserve"` у `tsconfig.json`, щоб TypeScript залишав синтаксис JSX недоторканим для обробки Vue JSX-перетворення.

## Вказівки функцій рендерингу {#render-function-recipes}

Нижче ми надамо деякі загальні вказівки для реалізації функціоналу шаблонів як їх еквівалентних функцій рендерингу / JSX.

### `v-if` {#v-if}

Шаблон:

```vue-html
<div>
  <div v-if="ok">так</div>
  <span v-else>ні</span>
</div>
```

Еквівалентна функція рендерингу / JSX:

<div class="composition-api">

```js
h('div', [ok.value ? h('div', 'так') : h('span', 'ні')])
```

```jsx
<div>{ok.value ? <div>так</div> : <span>ні</span>}</div>
```

</div>
<div class="options-api">

```js
h('div', [this.ok ? h('div', 'так') : h('span', 'ні')])
```

```jsx
<div>{this.ok ? <div>так</div> : <span>ні</span>}</div>
```

</div>

### `v-for` {#v-for}

Шаблон:

```vue-html
<ul>
  <li v-for="{ id, text } in items" :key="id">
    {{ text }}
  </li>
</ul>
```

Еквівалентна функція рендерингу / JSX:

<div class="composition-api">

```js
h(
  'ul',
  // припускаючи, що `items` є референцією зі значенням масиву
  items.value.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {items.value.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>
<div class="options-api">

```js
h(
  'ul',
  this.items.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {this.items.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>

### `v-on` {#v-on}

Реквізити з іменами, що починаються з `on`, за якою йде велика літера, розглядаються як слухачі подій. Наприклад, `onClick` є еквівалентом `@click` у шаблонах.

```js
h(
  'button',
  {
    onClick(event) {
      /* ... */
    }
  },
  'натисніть тут'
)
```

```jsx
<button
  onClick={(event) => {
    /* ... */
  }}
>
  натисніть тут
</button>
```

#### Модифікатори подій {#event-modifiers}

Модифікатори подій `.passive`, `.capture` і `.once` можуть бути об'єднані після назви події з camelCase.

Наприклад:

```js
h('input', {
  onClickCapture() {
    /* слухач у режимі захоплення */
  },
  onKeyupOnce() {
    /* спрацьовує лише один раз */
  },
  onMouseoverOnceCapture() {
    /* один раз + захоплення */
  }
})
```

```jsx
<input
  onClickCapture={() => {}}
  onKeyupOnce={() => {}}
  onMouseoverOnceCapture={() => {}}
/>
```

Для інших модифікаторів подій і ключів можна використовувати помічник [`withModifiers`](/api/render-function#withmodifiers):

```js
import { withModifiers } from 'vue'

h('div', {
  onClick: withModifiers(() => {}, ['self'])
})
```

```jsx
<div onClick={withModifiers(() => {}, ['self'])} />
```

### Компоненти {#components}

Щоб створити vnode для компонента, першим аргументом, який передається у `h()`, має бути визначення компонента. Це означає, що під час використання функцій рендерингу немає необхідності реєструвати компоненти - ви можете просто використовувати імпортовані компоненти безпосередньо:

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return h('div', [h(Foo), h(Bar)])
}
```

```jsx
function render() {
  return (
    <div>
      <Foo />
      <Bar />
    </div>
  )
}
```

Як ми бачимо, `h` може працювати з компонентами, імпортованими з будь-якого формату файлів, за умови, що це дійсний компонент Vue.

Динамічні компоненти стають простішими з функціями рендерингу:

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return ok.value ? h(Foo) : h(Bar)
}
```

```jsx
function render() {
  return ok.value ? <Foo /> : <Bar />
}
```

Якщо компонент зареєстровано за ім'ям і не може бути імпортований безпосередньо (наприклад, бібліотекою, яка зареєстрована глобально), це можна вирішити програмно за допомогою помічника [`resolveComponent()`](/api/render-function#resolvecomponent).

### Слоти рендеринга {#rendering-slots}

<div class="composition-api">

У функціях рендерингу доступ до слотів можна отримати з контексту `setup()`. Кожен слот в об'єкті `slots` є **функцією, яка повертає масив vnodes**:

```js
export default {
  props: ['message'],
  setup(props, { slots }) {
    return () => [
      // слот за замовчуванням:
      // <div><slot /></div>
      h('div', slots.default()),

      // іменований слот:
      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        slots.footer({
          text: props.message
        })
      )
    ]
  }
}
```

Еквівалент JSX:

```jsx
// за замовчуванням
<div>{slots.default()}</div>

// іменований
<div>{slots.footer({ text: props.message })}</div>
```

</div>
<div class="options-api">

У функціях рендерингу можна отримати доступ до слотів [`this.$slots`](/api/component-instance#slots):

```js
export default {
  props: ['message'],
  render() {
    return [
      // <div><slot /></div>
      h('div', this.$slots.default()),

      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        this.$slots.footer({
          text: this.message
        })
      )
    ]
  }
}
```

Еквівалент JSX:

```jsx
// <div><slot /></div>
<div>{this.$slots.default()}</div>

// <div><slot name="footer" :text="message" /></div>
<div>{this.$slots.footer({ text: this.message })}</div>
```

</div>

### Передача слотів {#passing-slots}

Передача дочірніх компонентів до компонентів працює дещо інакше, ніж передача дочірніх елементів до їх батьківського елементу. Замість масиву нам потрібно передати або слот-функцію, або об'єкт слот-функцій. Функції слотів можуть повертати будь-що, що може повертати звичайна функція рендерингу - що завжди буде нормалізовано до масивів vnodes при доступі до дочірнього компонента.

```js
// єдиний слот за замовчуванням
h(MyComponent, () => 'привіт')

// іменовані слоти
// зауважте, що значення null потрібне,
// щоб об’єкти слотів не розглядалися як властивості
h(MyComponent, null, {
  default: () => 'слот за замовчуванням',
  foo: () => h('div', 'foo'),
  bar: () => [h('span', 'one'), h('span', 'two')]
})
```

Еквівалент JSX:

```jsx
// за замовчуванням
<MyComponent>{() => 'привіт'}</MyComponent>

// іменований
<MyComponent>{{
  default: () => 'слот за замовчуванням',
  foo: () => <div>foo</div>,
  bar: () => [<span>один</span>, <span>два</span>]
}}</MyComponent>
```

Передача слотів як функцій дозволяє дочірньому компоненту ліниво викликати їх. Це призводить до того, що залежності слота відстежуються дочірнім, а не батьківським, що призводить до більш точних і ефективних оновлень.

### Вбудовані компоненти {#built-in-components}

[Вбудовані компоненти](/api/built-in-components), такі як `<KeepAlive>`, `<Transition>`, `<TransitionGroup>`, `<Teleport>` і `<Suspense>`, мають бути імпортовані для використання у функціях рендерингу:

<div class="composition-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  setup() {
    return () => h(Transition, { mode: 'out-in' } /* ... */)
  }
}
```

</div>
<div class="options-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  render() {
    return h(Transition, { mode: 'out-in' } /* ... */)
  }
}
```

</div>

### `v-model` {#v-model}

Директива `v-model` розширена до реквізитів `modelValue` і `onUpdate:modelValue` під час компіляції шаблону — нам доведеться надати ці реквізити самостійно:

<div class="composition-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h(SomeComponent, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value)
      })
  }
}
```

</div>
<div class="options-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  render() {
    return h(SomeComponent, {
      modelValue: this.modelValue,
      'onUpdate:modelValue': (value) =>
        this.$emit('update:modelValue', value)
    })
  }
}
```

</div>

### Користувацькі директиви {#custom-directives}

Користувацькі директиви можуть бути застосовані до vnode за допомогою [`withDirectives`](/api/render-function#withdirectives):

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

Якщо директива зареєстрована за назвою та не може бути імпортована напряму, це можна вирішити за допомогою помічника [`resolveDirective`](/api/render-function#resolvedirective).

### Референції шаблону {#template-tefs}

<div class="composition-api">

За допомогою Композиційного API референції шаблону створюються шляхом передачі використання `ref()` в якості реквізита до vnode:

```js
import { h, ref } from 'vue'

export default {
  setup() {
    const divEl = ref()

    // <div ref="divEl">
    return () => h('div', { ref: divEl })
  }
}
```

</div>
<div class="options-api">

За допомогою Опційного API референції шаблону створюються шляхом передачі імені посилання як рядка в атрибутах vnode:

```js
export default {
  render() {
    // <div ref="divEl">
    return h('div', { ref: 'divEl' })
  }
}
```

</div>

## Функціональні компоненти {#functional-components}

Функціональні компоненти – це альтернативна форма компонента, яка не має власного стану. Вони діють як чисті функції: реквізити на вході, vnodes на виході. Вони рендеряться без створення екземпляра компонента (тобто без `this`) і без звичайних хуків життєвого циклу компонента.

Щоб створити функціональний компонент, ми використовуємо звичайну функцію, а не об'єкт опцій. Функція фактично є функцією `render` для компонента.

<div class="composition-api">

Сигнатура функціонального компонента така сама, як і хук `setup()`:

```js
function MyComponent(props, { slots, emit, attrs }) {
  // ...
}
```

</div>
<div class="options-api">

Оскільки посилання на `this` для функціонального компонента не існує, Vue передасть `props` як перший аргумент:

```js
function MyComponent(props, context) {
  // ...
}
```

Другий аргумент, `context`, містить три властивості: `attrs`, `emit` і `slots`. Вони еквівалентні властивостям екземпляра [`$attrs`](/api/component-instance#attrs), [`$emit`](/api/component-instance#emit), та [`$slots`](/api/component-instance#slots) відповідно.

</div>

Більшість звичайних параметрів конфігурації компонентів недоступні для функціональних компонентів. Однак можна визначити [`props`](/api/options-state#props) та [`emits`](/api/options-state#emits), додавши їх як властивості:

```js
MyComponent.props = ['value']
MyComponent.emits = ['click']
```

Якщо параметр `props` не вказано, то об’єкт `props`, переданий у функцію, міститиме всі атрибути, такі самі, як `attrs`. Назви властивостей не будуть нормалізовані у CamelCase, якщо не вказано параметр `props`.

Для функціональних компонентів із явними `props` [передача атрибутів](/guide/components/attrs) працює майже так само, як і зі звичайними компонентами. Однак для функціональних компонентів, які явно не вказують свої `props`, лише `class`, `style` і `onXxx` слухачі подій будуть успадковані від `attrs` за замовчуванням. У будь-якому випадку для `inheritAttrs` можна встановити значення `false`, щоб вимкнути успадкування атрибутів:

```js
MyComponent.inheritAttrs = false
```

Функціональні компоненти можна реєструвати та використовувати так само, як і звичайні компоненти. Якщо ви передаєте функцію як перший аргумент у `h()`, вона розглядатиметься як функціональний компонент.
