# Основы компонентов

## Базовый пример

Вот пример компонента Vue:

```js
// Создаём приложение Vue
const app = Vue.createApp({})

// Определяем новый глобальный компонент, названный button-counter
app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      Счётчик кликов — {{ count }}
    </button>`
})
```

:::info Информация
Здесь показывается простой пример, но в типичном приложении Vue обычно используют однофайловые компоненты, вместо строковых шаблонов. Подробнее о них можно изучить [в этом разделе](single-file-component.md).
:::

Компоненты — это переиспользуемые экземпляры со своим именем. В примере выше это `<button-counter>`. Его можно использовать как пользовательский тег внутри корневого экземпляра:

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
app.mount('#components-demo')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="abORVEJ" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/abORVEJ">
  Component basics</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Так как компоненты это переиспользуемые экземпляры, то они принимают те же опции что и корневой экземпляр, такие как `data`, `computed`, `watch`, `methods`, хуки жизненного цикла. Единственными исключениями будут несколько специфичных для корневого экземпляра опций, например `el`.

## Переиспользование компонентов

Компоненты можно переиспользовать столько раз, сколько захотите:

```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="rNVqYvM" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: reusing components">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/rNVqYvM">
  Component basics: reusing components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Обратите внимание, при нажатиях на кнопки, каждая изменяет свой собственный, отдельный `count`. Это потому, что каждый раз когда вы используете компонент будет создан его новый **экземпляр**.

## Организация компонентов

Обычно приложение организуется в виде дерева вложенных компонентов:

![Component Tree](/images/components.png)

Например, у вас могут быть компоненты для заголовка, боковой панели, зоны контента, каждый из которых может содержать другие компоненты для навигационных ссылок, постов блога и т.д.

Чтобы использовать эти компоненты в шаблонах, они должны быть зарегистрированы, чтобы Vue узнал о них. Есть два типа регистрации компонентов: **глобальная** и **локальная**. До сих пор мы регистрировали компоненты только глобально, используя метод `component` созданного приложения:

```js
const app = Vue.createApp({})

app.component('my-component-name', {
  // ... опции ...
})
```

Компоненты, зарегистрированные глобально, могут использоваться в шаблоне экземпляра `app` созданного впоследствии — и даже внутри всех компонентов, расположенных в дереве компонентов этого корневого экземпляра.

На данный момент это всё, что вам нужно знать о регистрации компонентов. Но когда вы закончите изучение этой страницы и разберётесь со всей информацией представленной здесь — мы рекомендуем вернуться позднее и прочитать полное руководство по [регистрации компонентов](component-registration.md).

## Передача данных в дочерние компоненты через входные параметры

Ранее мы создавали компонент для записи блога. Проблема в том, что этот компонент бесполезен, если не будет возможности передавать ему данные, такие как заголовок и содержимое записи блога, которую мы хотим показать. Вот для чего нужны входные параметры.

Входные параметры — это пользовательские атрибуты, которые вы можете установить на компоненте. Когда значение передаётся в атрибут входного параметра, оно становится свойством экземпляра компонента. Чтобы передать заголовок в компонент нашей записи блога, мы можем включить его в список входных параметров, которые принимает компонент, с помощью опции `props`:

```js
const app = Vue.createApp({})
  
app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-post-demo')
```

Компонент может принимать столько входных параметров, сколько захотите, и по умолчанию любое значение может быть передано в любой входной параметр. В шаблоне выше вы увидите, что мы можем получить доступ к этому значению в экземпляре компонента, как и к любому свойству `data`.

После объявления входного параметра вы можете передавать данные в него через пользовательский атрибут, например:

```html
<div id="blog-post-demo" class="demo">
  <blog-post title="My journey with Vue"></blog-post>
  <blog-post title="Blogging with Vue"></blog-post>
  <blog-post title="Why Vue is so fun"></blog-post>
</div>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="PoqyOaX" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: passing props">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/PoqyOaX">
  Component basics: passing props</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Однако, в типичном приложении у вас наверняка будет массив записей в `data`:

```js
const App = {
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  }
}

const app = Vue.createApp(App)

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-posts-demo')
```

Теперь нужно отрисовать компонент для каждого из них:

```html
<div id="blog-posts-demo">
  <blog-post
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
  ></blog-post>
</div>
```

Как увидите выше, можно использовать `v-bind` для динамической передачи входных параметров. Это полезно, когда не знаете точного содержимого, который будете отрисовывать заранее.

На данный момент это всё, что вам нужно знать о входных параметрах. Но когда вы закончите изучение этой страницы и разберётесь со всей информацией представленной здесь — мы рекомендуем вернуться позднее и прочитать полное руководство по [входным параметрам](components-props.md).

## Прослушивание событий из дочерних компонентов в родительских компонентах

По мере разработки нашего компонента `<blog-post>` для некоторых возможностей может потребоваться передавать данные обратно в родительский компонент. Например, мы можем решить включить функцию для доступности, чтобы увеличивать размер текста в записях блога, оставив остальную часть страницы с размером текста по умолчанию.

В родительском компоненте мы можем добавить свойство `postFontSize` для этой возможности:

```js
const App = {
  data() {
    return {
      posts: [
        /* ... */
      ],
      postFontSize: 1
    }
  }
}
```

Которое будет использоваться в шаблоне для управления размером шрифта для всех записей блога:

```html
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post v-for="post in posts" :key="post.id" :title="title"></blog-post>
  </div>
</div>
```

Теперь давайте добавим кнопку для увеличения текста прямо перед содержимым каждой записи блога:

```js
app.component('blog-post', {
  props: ['title'],
  template: `
    <div class="blog-post">
      <h4>{{ title }}</h4>
      <button>
        Увеличить размер текста
      </button>
    </div>
  `
})
```

Проблема в том, что эта кнопка ничего не делает:

```html
<button>
  Увеличить размер текста
</button>
```

Когда мы нажимаем на кнопку, нужно сообщить родительскому компоненту, что ему необходимо увеличить размер текста для всех записей блога. К счастью, экземпляры компонента предоставляют собственную систему событий для решения этой проблемы. Родительский компонент может прослушивать любые события на экземпляре дочернего компонента с помощью `v-on` или `@`, как мы это делаем с нативными событиями DOM:

```html
<blog-post ... @enlarge-text="postFontSize += 0.1"></blog-post>
```

Затем дочерний компонент может сгенерировать событие с помощью встроенного [метода **`$emit`**](../api/instance-methods.md#emit), передавая ему имя события:

```html
<button @click="$emit('enlarge-text')">
  Увеличить размер текста
</button>
```

Благодаря прослушиванию события `@enlarge-text="postFontSize += 0.1"`, родительский компонент отследит событие и обновит значение `postFontSize`.

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="KKpGyrp" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: emitting events">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/KKpGyrp">
  Component basics: emitting events</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Можно перечислить все генерируемые компонентом события в опции `emits`.

```js
app.component('blog-post', {
  props: ['title'],
  emits: ['enlarge-text']
})
```

Это позволит проверять все генерируемые компонентом события и опционально [валидировать их](component-custom-events.md#validate-emitted-events).

### Передача данных вместе с событием

Иногда бывает полезно отправить определённые данные вместе с событием. Например, если захотим, чтобы компонент `<blog-post>` отвечал за то, насколько нужно увеличивать текст. В таком случае, мы можем использовать второй параметр `$emit` для предоставления этого значения:

```html
<button @click="$emit('enlarge-text', 0.1)">
  Увеличить размер текста
</button>
```

Затем, когда мы прослушиваем событие в родителе, мы можем получить доступ к данным, переданным с событием, через `$event`:

```html
<blog-post ... @enlarge-text="postFontSize += $event"></blog-post>
```

Или, если обработчик события будет методом:

```html
<blog-post ... @enlarge-text="onEnlargeText"></blog-post>
```

Тогда значение будет передано первым аргументом:

```js
methods: {
  onEnlargeText(enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### Использование `v-model` на компонентах

Пользовательские события также могут использоваться для создания нестандартных элементов ввода, которые работают через `v-model`. Не забывайте, что:

```html
<input v-model="searchText" />
```

делает то же самое, что и:

```html
<input :value="searchText" @input="searchText = $event.target.value" />
```

При использовании на компоненте, `v-model` вместо этого делает следующее:

```html
<custom-input
  :model-value="searchText"
  @update:model-value="searchText = $event"
></custom-input>
```

:::warning ПРЕДУПРЕЖДЕНИЕ
Обратите внимание, что `model-value` указывается в kebab-case, потому что работаем с DOM-шаблоном. Подробное объяснение об использовании kebab-case vs camelCase атрибутов в разделе [Особенности парсинга DOM-шаблона](#dom-template-parsing-caveats)
:::

Чтобы это действительно работало, элемент `<input>` внутри компонента должен:

- Привязывать значение атрибута `value` к входному параметру `modelValue`
- По событию `input` генерировать событие `update:modelValue` с новым значением

Вот это в действии:

```js
app.component('custom-input', {
  props: ['modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  `
})
```

Теперь `v-model` будет прекрасно работать с этим компонентом:

```html
<custom-input v-model="searchText"></custom-input>
```

Другим способом создания `v-model` в рамках пользовательского компонента — использование возможности вычисляемых свойств по определению геттера и сеттера.

В следующем примере, переработаем компонент `custom-input` с помощью вычисляемого свойства.

Имейте ввиду, что метод `get` должен возвращать свойство `modelValue`, или любое другое свойство, используемое для привязки, и метод `set` должен генерировать соответствующий `$emit` для этого свойства.

```js
app.component('custom-input', {
  props: ['modelValue'],
  template: `
    <input v-model="value">
  `,
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})
```

На данный момент это всё, что вам нужно знать о пользовательских событиях. Но когда вы закончите изучение этой страницы и разберётесь со всей информацией представленной здесь — мы рекомендуем вернуться позднее и прочитать полное руководство по [пользовательским событиям](components-custom-events.md).

## Распределение контента слотами

Как и с обычными HTML-элементами, часто бывает полезным передать компоненту содержимое, например:

```html
<alert-box>
  Произошло что-то плохое.
</alert-box>
```

Что может выглядеть примерно так:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="jOPeaob" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: slots">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/jOPeaob">
  Component basics: slots</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

К счастью, эта задача легко решается с помощью пользовательского элемента `<slot>` у Vue:

```js
app.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Ошибка!</strong>
      <slot></slot>
    </div>
  `
})
```

Как вы видите выше, мы просто добавляем слот там, куда хотим подставлять контент — и это всё. Готово!

На данный момент это всё, что вам нужно знать о слотах. Но когда вы закончите изучение этой страницы и разберётесь со всей информацией представленной здесь — мы рекомендуем вернуться позднее и прочитать полное руководство по [слотам](components-slots.md).

## Динамическое переключение компонентов

Иногда бывает полезно динамически переключаться между компонентами, например в интерфейсе с вкладками:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="oNXaoKy" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: dynamic components">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/oNXaoKy">
  Component basics: dynamic components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Показанное выше стало возможным с помощью элемента Vue `<component>` со специальным атрибутом `is`:

```html
<!-- Компонент меняется при изменении currentTabComponent -->
<component :is="currentTabComponent"></component>
```

В примере выше `currentTabComponent` может содержать:

- имя зарегистрированного компонента, или
- объект с настройками компонента

Посмотрите [этот sandbox](https://codepen.io/team/Vue/pen/oNXaoKy) чтобы поэкспериментировать с полным кодом, или [эту версию](https://codepen.io/team/Vue/pen/oNXapXM) для примера привязки к объекту с настройками компонента вместо указания его имени.

Обратите внимание, атрибут может использоваться и с обычными HTML-элементами, однако они будут рассматриваться как компоненты, а это значит, что все атрибуты **будут привязываться как DOM-атрибуты**. Для того чтобы некоторые свойства, такие как `value` работали так, как вы ожидаете, следует привязывать их с использованием [модификатора `.prop`](../api/directives.md#v-bind).

На данный момент это всё, что вам нужно знать о динамических компонентах. Но когда вы закончите изучение этой страницы и разберётесь со всей информацией представленной здесь — мы рекомендуем вернуться позднее и прочитать полное руководство по [динамическим и асинхронным компонентам](components-dynamic-async.md).

## Особенности парсинга DOM-шаблона

Некоторые HTML-элементы, такие как `<ul>`, `<ol>`, `<table>` и `<select>` имеют ограничения на то, какие элементы могут отображаться внутри них, или например элементы, такие как `<li>`, `<tr>` и `<option>` могут появляться только внутри других определённых элементов.

Это приведёт к проблемам при использовании компонентов с элементами, которые имеют такие ограничения. Например:

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

Пользовательский компонент `<blog-post-row>` будет поднят выше, так как считается недопустимым содержимым, вызывая ошибки в итоговой отрисовке. К счастью, можно использовать специальную директиву `v-is` для решения этой проблемы:

```html
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

:::warning ВНИМАНИЕ
Значение `v-is` должно быть строковым литералом JavaScript:

```html
<!-- Неправильно, ничего не будет отрисовано -->
<tr v-is="blog-post-row"></tr>

<!-- Правильно -->
<tr v-is="'blog-post-row'"></tr>
```
:::

Кроме того, имена атрибутов HTML не чувствительны к регистру, поэтому браузеры будут интерпретировать любые заглавные символы как строчные. Это означает, что при использовании DOM шаблонов, имена входных параметров в camelCase и обработчики событий необходимо указывать в kebab-case (разделённые дефисом) эквиваленте:

```js
// camelCase в JavaScript
app.component('blog-post', {
  props: ['postTitle'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
})
```

```html
<!-- kebab-case в HTML -->
<blog-post post-title="hello!"></blog-post>
```

Следует отметить, что **этих ограничений _не будет_ при использовании строковых шаблонов из одного из следующих источников**:

- Строковые шаблоны (например, `template: '...'`)
- [Однофайловые (`.vue`) компоненты](single-file-component.md)
- `<script type="text/x-template">`

На данный момент это всё, что вам нужно знать об особенностях парсинга DOM-шаблонов — и на самом деле это окончание раздела _Основы_ документации Vue. Наши поздравления! Ещё есть чему поучиться, но мы рекомендуем сначала отвлечься и попробовать поиграть с Vue, самостоятельно построить что-нибудь интересное.

Но когда вы закончите изучение этой страницы и разберётесь со всей информацией представленной здесь — мы рекомендуем вернуться позднее и прочитать полное руководство по [динамическим и асинхронным компонентам](components-dynamic-async.md), а также другим страницам из раздела продвинутых компонентов в боковой панели.
