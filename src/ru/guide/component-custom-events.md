# Пользовательские события

> Подразумевается, что вы уже изучили и разобрались с разделом [Основы компонентов](component-basics.md). Если нет — прочитайте его сначала.

## Стиль именования событий

В отличие от компонентов и входных параметров, имена событий не предоставляют никакой автоматической трансформации стиля именования события. Вместо этого, имя генерируемого события должно точно соответствовать имени, используемому при прослушивании события. К примеру, если генерируем событие с именем в camelCase:

```js
this.$emit('myEvent')
```

Прослушивание kebab-cased версии этого имени не будет иметь никакого эффекта:

```html
<!-- НЕ БУДЕТ РАБОТАТЬ -->
<my-component @my-event="doSomething"></my-component>
```

Поскольку имена событий никогда не будут использоваться в качестве имён переменных или имён свойств в JavaScript, нет причин использовать camelCase или PascalCase. Кроме того, директивы прослушивания событий `v-on` внутри DOM-шаблонов автоматически преобразуются в нижний регистр (из-за нечувствительности HTML к регистру), поэтому `@myEvent` станет `@myevent` — что делает прослушивание события `myEvent` невозможным.

По этим причинам мы рекомендуем **всегда использовать kebab-case для имён событий**.

## Определение пользовательских событий

<VideoLesson href="https://vueschool.io/lessons/defining-custom-events-emits?friend=vuejs" title="Learn how to define which events a component can emit with Vue School">Watch a free video about Defining Custom Events on Vue School</VideoLesson>

Генерируемые компонентом события можно определить с помощью опции `emits`.

```js
app.component('custom-form', {
  emits: ['in-focus', 'submit']
})
```

Если в опции `emits` указано нативное событие (например, `click`), то событие компонента будет использовано __вместо__ отслеживания нативного события.

:::tip Совет
Рекомендуется указывать все генерируемые компонентом события для лучшей документированности того, как компонент должен работать.
:::

### Валидация сгенерированных событий

Аналогично валидации входных параметров, генерируемые события также могут быть валидированы, если это определено с помощью объектного синтаксиса или синтаксиса массива.

Для добавления валидации событию необходимо указать функцию, которая получает аргументы, с которыми вызывался `$emit` и возвращает булево, определяющее является ли событие корректным или нет.

```js
app.component('custom-form', {
  emits: {
    // Без валидации
    click: null,

    // Валидация события submit
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Некорректные данные для генерации события submit!')
        return false
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', { email, password })
    }
  }
})
```

## Аргументы `v-model`

По умолчанию, `v-model` на компоненте использует входной параметр `modelValue` и событие `update:modelValue`. Их можно изменить с помощью аргумента `v-model`:

```html
<my-component v-model:title="bookTitle"></my-component>
```

В таком случае, ожидается что дочерний компонент будет использовать входной параметр `title` и генерировать событие `update:title` для синхронизации значения:

```js
const app = Vue.createApp({})

app.component('my-component', {
  props: {
    title: String
  },
  template: `
    <input 
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)">
  `
})
```

```html
<my-component v-model:title="bookTitle"></my-component>
```

## Использование нескольких `v-model`

Развивая потенциал возможности определять конкретный входной параметр и событие, как мы изучили ранее с помощью [аргумента `v-model`](#v-model-arguments), теперь стало возможным создавать несколько привязок v-model на одном экземпляре компонента.

Каждая v-model синхронизирует свой входной параметр, без необходимости дополнительных опций в компоненте:

```html
<user-name
  v-model:first-name="firstName"
  v-model:last-name="lastName"
></user-name>
```

```js
const app = Vue.createApp({})

app.component('user-name', {
  props: {
    firstName: String,
    lastName: String
  },
  template: `
    <input 
      type="text"
      :value="firstName"
      @input="$emit('update:firstName', $event.target.value)">

    <input
      type="text"
      :value="lastName"
      @input="$emit('update:lastName', $event.target.value)">
  `
})
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="GRoPPrM" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Multiple v-models">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/GRoPPrM">
  Multiple v-models</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Обработка модификаторов `v-model`

Изучая как работать с формами, мы столкнулись с тем, что `v-model` имеет [встроенные модификаторы](forms.md#modifiers) — `.trim`, `.number` и `.lazy`. В некоторых случах может пригодиться создавать собственные модификаторы.

Создадим для примера пользовательский модификатор `capitalize`, который будет делать заглавной первую букву строки, привязанной с помощью `v-model`.

Модификаторы, которые будут использоваться в `v-model` компонента, должны указываться через входной параметр `modelModifiers`. В примере ниже, компонент содержит входной параметр `modelModifiers`, который по умолчанию будет пустым объектом.

Обратите внимание, в хуке жизненного цикла `created` входной параметр `modelModifiers` содержит `capitalize` со значением `true` — потому что он указан на привязке `v-model` компонента `v-model.capitalize="bar"`.

```html
<my-component v-model.capitalize="bar"></my-component>
```

```js
app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  template: `
    <input type="text" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
  `,
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
})
```

Теперь, после настройки входного параметра, можно проверять ключи `modelModifiers` и создать обработчик для изменения значения. Например, будем запускать этот обработчик каждый раз, когда элемент `<input />` генерирует событие `input`.

```html
<div id="app">
  <my-component v-model.capitalize="myText"></my-component>
  {{ myText }}
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      myText: ''
    }
  }
})

app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  },
  template: `<input
    type="text"
    :value="modelValue"
    @input="emitValue">`
})

app.mount('#app')
```

При использовании привязки `v-model` с аргументом, имя входного параметра будет генерироваться как `arg + "Modifiers"`:

```html
<my-component v-model:foo.capitalize="bar"></my-component>
```

```js
app.component('my-component', {
  props: ['foo', 'fooModifiers'],
  template: `
    <input type="text" 
      :value="foo"
      @input="$emit('update:foo', $event.target.value)">
  `,
  created() {
    console.log(this.fooModifiers) // { capitalize: true }
  }
})
```
