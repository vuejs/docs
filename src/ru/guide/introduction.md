# Введение

:::tip Примечание
Уже изучили Vue 2 и хотите узнать что нового во Vue 3? Посмотрите [руководство по миграции](migration/introduction.md)!
:::

## Что такое Vue.js?

Vue (произносится /vjuː/, примерно как **view**) — **прогрессивный фреймворк** для создания пользовательских интерфейсов. В отличие от фреймворков-монолитов, Vue создавался пригодным для постепенного внедрения. Его ядро в первую очередь решает задачи уровня представления (view), упрощая интеграцию с другими библиотеками и существующими проектами. С другой стороны, Vue полностью подходит и для создания сложных одностраничных приложений (SPA, Single-Page Applications), если использовать его совместно с [современными инструментами](single-file-component.md) и [дополнительными библиотеками](https://github.com/vuejs/awesome-vue#components--libraries).

Если хотите узнать больше о Vue перед тем как начать, мы <a id="modal-player" class="vuemastery-trigger" href="#">сделали видео</a> с рассказом об основных принципах работы на примере проекта.

<VideoLesson href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3" title="Бесплатный курс по Vue.js (на английском)">Посмотрите бесплатный видео-курс на Vue Mastery</VideoLesson>

<common-vuemastery-video-modal/>

## Начало работы

<p>
  <ActionLink class="primary" url="installation.html">
    Установка
  </ActionLink>
</p>

:::tip Совет
В руководстве предполагается, что вы знакомы с HTML, CSS и JavaScript на базовом уровне. Если же вы во фронтенд-разработке совсем новичок, то начинать изучение сразу с фреймворка может быть не лучшей идеей — возвращайтесь, разобравшись с основами! Наличие опыта работы с другими фреймворками может помочь, но не является обязательным.
:::

Проще всего попробовать Vue.js, начав с [примера Hello World](https://codepen.io/team/Vue/pen/KKpRVpx). Открывайте его в соседней вкладке, и практикуйтесь изменяя по ходу чтения руководства.

На странице [установки](installation.md) представлены варианты как можно устанавливать Vue. Примечание: мы **не рекомендуем** начинающим пользователям стартовать с `vue-cli`. Особенно если вы ещё не знакомы с инструментами сборки на основе Node.js.

## Декларативная отрисовка

В ядре Vue.js находится система, которая позволяет декларативно отображать данные в DOM с помощью простых шаблонов:

```html
<div id="counter">
  Счётчик: {{ counter }}
</div>
```

```js
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')
```

Вот и наше первое Vue-приложение! Хоть выглядит как простая отрисовка шаблона, но «под капотом» Vue выполнил немало работы. Данные и DOM теперь **реактивно** связаны. Как в этом убедиться? Посмотрите на пример ниже, где свойство `counter` каждую секунду увеличивается и эти изменения отражаются на отрисованном DOM:

```js{8-10}
const CounterApp = {
  data() {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
```

<FirstExample />

Кроме интерполяции текста, можно также связывать данные с атрибутами элементов:

```html
<div id="bind-attribute">
  <span v-bind:title="message">
    Наведи на меня курсор на пару секунд,
    чтобы увидеть динамически связанное значение title!
  </span>
</div>
```

```js
const AttributeBinding = {
  data() {
    return {
      message: 'Вы загрузили эту страницу ' + new Date().toLocaleString()
    }
  }
}

Vue.createApp(AttributeBinding).mount('#bind-attribute')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="KKpRVvJ" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Attribute dynamic binding">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/KKpRVvJ">
  Attribute dynamic binding</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Здесь мы встречаемся с чем-то новым. Атрибут `v-bind` называется **директивой**. Все директивы имеют префикс `v-` для обозначения того, что это специальные атрибуты Vue. Как вы уже могли догадаться, они добавляет отрисованному DOM особое реактивное поведение. В данном примере директива говорит «сохраняй значение `title` этого элемента актуальным при изменении свойства `message` в текущем активном экземпляре».

## Работа с пользовательским вводом

Чтобы позволить пользователям взаимодействовать с приложением, можно использовать директиву `v-on` для обработчиков событий, которые будут вызывать методы экземпляра:

```html
<div id="event-handling">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Перевернуть сообщение</button>
</div>
```

```js
const EventHandling = {
  data() {
    return {
      message: 'Привет, Vue.js!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message
        .split('')
        .reverse()
        .join('')
    }
  }
}

Vue.createApp(EventHandling).mount('#event-handling')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="dyoeGjW" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Event handling">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/dyoeGjW">
  Event handling</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Обратите внимание, в методе мы обновляем состояние приложения и не трогаем DOM — всеми манипуляциями с DOM занимается Vue, а наш код фокусируется на логике работы приложения.

Vue также предоставляет директиву `v-model`, которая обеспечивает двустороннюю привязку между элементом формы и состоянием приложения:

```html
<div id="two-way-binding">
  <p>{{ message }}</p>
  <input v-model="message" />
</div>
```

```js
const TwoWayBinding = {
  data() {
    return {
      message: 'Привет, Vue!'
    }
  }
}

Vue.createApp(TwoWayBinding).mount('#two-way-binding')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="poJVgZm" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Two-way binding">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/poJVgZm">
  Two-way binding</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Условия и циклы

Управлять присутствием элемента в DOM тоже довольно просто:

```html
<div id="conditional-rendering">
  <span v-if="seen">Сейчас меня видно</span>
</div>
```

```js
const ConditionalRendering = {
  data() {
    return {
      seen: true
    }
  }
}

Vue.createApp(ConditionalRendering).mount('#conditional-rendering')
```

Этот пример демонстрирует возможность связывания данных не только с текстом и атрибутами, но и со **структурой** DOM. Более того, Vue имеет мощную систему анимаций, которая автоматически применяет [эффекты переходов](transitions-enterleave.md), когда элементы добавляются/обновляются/удаляются.

Попробуйте изменить `seen` с значения `true` на `false` в песочнице ниже чтобы увидеть:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="oNXdbpB" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Conditional rendering">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/oNXdbpB">
  Conditional rendering</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Существует некоторое количество других директив, каждая из которых обладает своей особой функциональностью. Например, директива `v-for` может использоваться для отображения списка элементов, используя данные из массива:

```html
<div id="list-rendering">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
const ListRendering = {
  data() {
    return {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ]
    }
  }
}

Vue.createApp(ListRendering).mount('#list-rendering')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="mdJLVXq" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="List rendering">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/mdJLVXq">
  List rendering</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Составление приложения из компонентов

Важной концепцией Vue являются компоненты. Эта абстракция позволяет собирать большие приложения из маленьких «кусочков». Они представляют собой пригодные к повторному использованию объекты. Если подумать, почти любой интерфейс можно представить как дерево компонентов:

![Дерево компонентов](/images/components.png)

Компонент во Vue, по сути является экземпляром с предустановленными опциями. Зарегистрировать компонент во Vue тоже просто: создаём объект компонента, как это делали с объектами `App` и указываем его в родительской опции `components`:

```js
// Создаём приложение Vue
const app = Vue.createApp(...)

// Определяем новый компонент под именем todo-item
app.component('todo-item', {
  template: `<li>Это одна из задача</li>`
})

// Монтируем приложение Vue
app.mount(...)
```

Теперь можно использовать его в шаблоне другого компонента:

```html
<ol>
  <!-- Создание экземпляра компонента todo-item -->
  <todo-item></todo-item>
</ol>
```

Пока что получается так, что во всех элементах списка будет один и тот же текст — это не очень-то интересно. Хотелось бы иметь возможность передать данные из родительского компонента в дочерние. Доработаем компонент, чтобы он принимал [входной параметр](component-basics.md#passing-data-to-child-components-with-props):

```js
app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})
```

Теперь можно передать свой текст в каждый компонент с помощью `v-bind`:

```html
<div id="todo-list-app">
  <ol>
    <!--
      Теперь мы можем передать каждому компоненту todo-item объект
      с информацией о задаче, который будет динамически меняться.
      Мы также определяем для каждого компонента "key",
      значение которого мы разберём далее в руководстве.
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
const TodoList = {
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}

const app = Vue.createApp(TodoList)

app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})

app.mount('#todo-list-app')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="VwLxeEz" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Intro-Components-1">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/VwLxeEz">
  Intro-Components-1</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Конечно, этот пример слегка надуман, но посмотрите — мы разделили наше приложение на два меньших объекта. Дочерний, в разумной мере, отделён от родительского с помощью интерфейса входных параметров. Теперь можно улучшать компонент `<todo-item>`, усложнять его шаблон и логику и не влиять на работу родительского приложения.

В крупных приложениях разделение на компоненты становится обязательным условием для сохранения управляемости процесса разработки. Разговор о компонентах ещё не окончен и мы вернёмся к ним [позднее в руководстве](component-basics.md), но и сейчас можно взглянуть на (вымышленный) пример того, как может выглядеть шаблон приложения, использующего компоненты:

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

### Отношение к пользовательским элементам Web Components

Можно заметить, что компоненты Vue довольно похожи на **пользовательские элементы**, являющиеся частью [спецификации W3C Web Components](https://www.w3.org/wiki/WebComponents/). Синтаксис компонентов Vue и правда намеренно следует этой спецификации. В частности, компоненты Vue реализуют [API слотов](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md) и специальный атрибут `is`. Но есть и несколько ключевых различий:

1. Спецификация Web Components завершена, но ещё не реализована во всех браузерах. Safari 10.1+, Chrome 54+ и Firefox 63+ уже поддерживают веб-компоненты. Компоненты Vue, напротив, не требуют никаких полифилов и работают во всех поддерживаемых браузерах (IE11 с совместимой сборкой и выше). При необходимости компоненты Vue могут быть «обёрнуты» в нативные пользовательские элементы.

[//]: # 'TODO: link to compatibility build'

2. Компоненты Vue предоставляют возможности, недоступные в простых пользовательских элементах. Самые важные из них: кросс-компонентная передача данных, коммуникация с использованием пользовательских событий и интеграция с инструментами сборок.

Хоть Vue и не использует пользовательские элементы внутри себя, они имеют [отличную интероперабельность](https://custom-elements-everywhere.com/#vue) когда речь заходит об использовании или распространении в качестве пользовательских элементов. Vue CLI для таких случаев поддерживает сборку компонентов Vue, которые регистрируют себя как нативные пользовательские элементы.

## Готовы к большему?

Пока мы лишь кратко представили самые основные возможности ядра Vue.js — продолжение руководства посвящёно более детальному изучению этих и других возможностей, поэтому советуем прочитать его целиком!
