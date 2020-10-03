# Отрисовка списков

## Отображение массива элементов с помощью `v-for`

Используйте директиву `v-for` для отрисовки списка элементов на основе массива данных. У директивы `v-for` особый синтаксис записи: `item in items`, где `items` — исходный массив, а `item` — **ссылка** на текущий элемент массива:

```html
<ul id="array-rendering">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-rendering')
```

Результат:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="VwLGbwa" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Array">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/VwLGbwa">
  v-for with Array</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Внутри блока `v-for` нам доступны свойства из области видимости родителя. У `v-for` также есть второй опциональный параметр с индексом текущего элемента.

```html
<ul id="array-with-index">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      parentMessage: 'Родитель',
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    }
  }
}).mount('#array-with-index')
```

Результат:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="wvaEdBP" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Array and index">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/wvaEdBP">
  v-for with Array and index</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Вместо `in` разделителем можно использовать `of`, как в итераторах JavaScript:

```html
<div v-for="item of items"></div>
```

### `v-for` для объекта

`v-for` можно также использовать для итерирования по свойствам объекта:

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      myObject: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  }
}).mount('#v-for-object')
```

Результат:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="NWqLjqy" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Object">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/NWqLjqy">
  v-for with Object</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Можно использовать второй аргумент для получения имени свойства (ключа объекта):

```html
<li v-for="(value, name) in myObject">
  {{ name }}: {{ value }}
</li>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="poJOPjx" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Object and key">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/poJOPjx">
  v-for with Object and key</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

И третий — для индексов:

```html
<li v-for="(value, name, index) in myObject">
  {{ index }}. {{ name }}: {{ value }}
</li>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="abOaWdo" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Object key and index">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/abOaWdo">
  v-for with Object key and index</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

:::tip Примечание
При итерировании по объекту порядок обхода такой же как и в `Object.keys()`. Его консистентность **не гарантируется** при использовании различных реализаций движков JavaScript.
:::

## Сохранение состояния

При обновлении Vue списка элементов, отображаемого директивой `v-for`, по умолчанию используется стратегия обновления «на месте». Если порядок элементов массива или объекта изменился, Vue не станет перемещать элементы DOM, а просто обновит каждый элемент «на месте», чтобы он отображал новые данные по соответствующему индексу.

Режим по умолчанию эффективен, но **применим только в случаях, когда результат отрисовки вашего списка не полагается на состояние дочерних компонентов или временные состояния DOM (например, значения полей форм)**.

Чтобы подсказать Vue, как отслеживать идентичность каждого элемента, что позволит переиспользовать и перемещать существующие элементы, укажите уникальный атрибут `key` для каждого элемента:

```html
<div v-for="item in items" :key="item.id">
  <!-- содержимое -->
</div>
```

Рекомендуем всегда указывать атрибут `key` с `v-for`, кроме случаев когда итерируемый контент DOM прост, или вы сознательно используете стратегию обновления по умолчанию для улучшения производительности.

Поскольку этот механизм является общим для идентификации элементов во Vue, имеются и другие варианты применения `key`, не связанные явно с `v-for`, как мы увидим далее в руководстве.

:::tip Совет
Не указывайте в качестве ключей `v-for` непримитивные значения. Вместо этого используйте строковые или числовые значения.
:::

Подробнее про использование атрибута `key` можно прочитать в [документации API](../api/special-attributes.md#key).

## Отслеживание изменений в массивах

### Методы внесения изменений

Vue оборачивает у наблюдаемого массива методы внесения изменений, чтобы они вызывали обновления представления. Оборачиваются следующие методы:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

Можете открыть консоль и поиграть с массивом `items` из предыдущего примера, вызывая его методы внесения изменений, например: `example1.items.push({ message: 'Baz' })`.

### Замены в массиве

Методы внесения изменений, как следует из их названия, изменяют оригинальный массив, на котором они вызываются. Существуют и неизменяющие методы, такие как `filter()`, `concat()` и `slice()`, они не вносят изменений в изначальный массив, а **всегда возвращают новый массив**. При работе с неизменяющими методами можно просто заменять старый массив на новый:

```js
example1.items = example1.items.filter(item => item.message.match(/Foo/))
```

Можно предположить, что Vue придётся выбросить существующий DOM и заново отрисовать список целиком, но, к счастью, это не так. Во Vue есть умные эвристики для максимизации переиспользования элементов DOM, поэтому замена одного массива другим, в случае совпадения части элементов этих массивов, будет очень эффективной операцией.

## Отображение отфильтрованных/отсортированных результатов

Иногда хочется отобразить отфильтрованную или отсортированную версию массива, не изменяя оригинальные данные. В таком случае создайте вычисляемое свойство, возвращающее отфильтрованный или отсортированный массив.

Например:

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```

```js
data() {
  return {
    numbers: [ 1, 2, 3, 4, 5 ]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(number => number % 2 === 0)
  }
}
```

В ситуациях, когда вычисляемые свойства невозможно использовать (например, внутри вложенных циклов `v-for`), просто используйте метод:

```html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

### `v-for` и диапазоны

В `v-for` можно передать целое число. В этом случае шаблон будет повторён указанное число раз.

```html
<div id="range" class="demo">
  <span v-for="n in 10">{{ n }} </span>
</div>
```

Результат:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="NWqLjNY" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with a range">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/NWqLjNY">
  v-for with a range</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### `v-for` и тег `template`

Подобно использованию с `v-if`, также можно использовать тег `<template>` с директивой `v-for` для отображения блока из нескольких элементов. Например:

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

### `v-for` и `v-if`

:::tip Совет
Обратите внимание, что **не рекомендуется** использовать вместе `v-if` и `v-for`. Подробнее в разделе [рекомендаций](../style-guide/#Избегайте-использования-v-if-с-v-for-важно).
:::

Когда присутствуют вместе на одном элементе, `v-if` имеет больший приоритет, чем `v-for`. Это означает, что условие `v-if` не будет иметь доступа к переменным из области видимости `v-for`:

```html
<!-- Это приведёт к ошибке, так как свойство "todo" не определено в экземпляре. -->

<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

Это можно исправить, переместив `v-for` на тег-обёртку `<template>`:

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo }}
  </li>
</template>
```

### Компоненты и `v-for`

> Эта секция подразумевает, что вы уже знакомы с [компонентами](component-basics.md). Не стесняйтесь пропустить её сейчас и вернуться потом.

Можно использовать `v-for` на компонентах, как и на обычных элементах:

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

Однако, в компонент никакие данные не передаются автоматически, поскольку у компонентов изолированные области видимости. Для передачи итерируемых данных в компонент необходимо явно использовать входные параметры:

```html
<my-component
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
></my-component>
```

Причина, почему `item` не передаётся в компонент автоматически, в том, что это сделает компонент жёстко связанным с логикой работы `v-for`. Но если указывать источник данных явно, компонент можно будет использовать и в других ситуациях.

Ниже приведён полный пример простого списка задач:

```html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Добавить задачу</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="Например, покормить кота"
    />
    <button>Добавить</button>
  </form>
  <ul>
    <todo-item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :title="todo.title"
      @remove="todos.splice(index, 1)"
    ></todo-item>
  </ul>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      newTodoText: '',
      todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTodoId: 4
    }
  },
  methods: {
    addNewTodo() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})

app.component('todo-item', {
  template: `
    <li>
      {{ title }}
      <button @click="$emit('remove')">Удалить</button>
    </li>
  `,
  props: ['title']
})

app.mount('#todo-list-example')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="abOaWpz" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with components">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/abOaWpz">
  v-for with components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
