# Передача обычных атрибутов

> Подразумевается, что вы уже изучили и разобрались с разделом [Основы компонентов](component-basics.md). Если нет — прочитайте его сначала.

Обычный атрибут для компонента — атрибут или слушатель события, который передаётся в компонент, но не имеет соответствующего свойства в [props](component-props.md) или [emits](component-custom-events.md#defining-custom-events). Частыми примерами подобного являются атрибуты `class`, `style` и `id`. Получить доступ к этим атрибутам можно через свойство `$attrs`.

## Наследование атрибутов

Обычные атрибуты будут добавлены к атрибутам корневого элемента автоматически, когда компонент возвращает один корневой элемент. Например, для компонента выбора даты:

```js
app.component('date-picker', {
  template: `
    <div class="date-picker">
      <input type="datetime" />
    </div>
  `
})
```

В случае когда требуется устанавливать статус компонента выбора даты через свойство `data-status`, значение будет добавлено к корневой ноде (т.е., `div.date-picker`).

```html
<!-- Компонент выбора даты с передачей обычного атрибута -->
<date-picker data-status="activated"></date-picker>

<!-- Отрисованный компонент выбора даты -->
<div class="date-picker" data-status="activated">
  <input type="datetime" />
</div>
```

Это же правило применяется и для прослушивания событий:

```html
<date-picker @change="submitChange"></date-picker>
```

```js
app.component('date-picker', {
  created() {
    console.log(this.$attrs) // { onChange: () => {}  }
  }
})
```

Подобное удобно, когда в качестве корневого элемента компонента `date-picker` будет HTML-элемент, генерирующий событие `change` .

```js
app.component('date-picker', {
  template: `
    <select>
      <option value="1">Вчера</option>
      <option value="2">Сегодня</option>
      <option value="3">Завтра</option>
    </select>
  `
})
```

Обработчик события `change` будет передан из родительского компонента в дочерний и станет вызываться при нативном событии `change` на корневом элементе `<select>`. В таком случае не потребуется явно генерировать событие из `date-picker`:

```html
<div id="date-picker" class="demo">
  <date-picker @change="showChange"></date-picker>
</div>
```

```js
const app = Vue.createApp({
  methods: {
    showChange(event) {
      console.log(event.target.value) // отобразит значение выбранного варианта
    }
  }
})
```

## Отключение наследования атрибутов

Если **необходимо отключить** автоматическое наследование атрибутов компонентом, то это можно сделав с помощью опции `inheritAttrs: false`.

Популярный сценарий, когда требуется отключать наследование атрибутов — необходимо добавлять атрибуты на другие элементы вместо корневого узла.

Устанавливая опцию `inheritAttrs` в значение `false`, можно контролировать добавление атрибутов к другим элементам компонента через свойство `$attrs`, которое включает в себя все атрибуты, не входящие в состав свойств `props` и `emits` (например, `class`, `style`, обработчики `v-on`, и т.д.).

Используя пример компонента для выбора дат из [предыдущей главы](#наследование-атрибутов), сделаем добавление обычных атрибутов на элемент `input`, вместо корневого элемента `div`. Воспользуемся для этого сокращённой записью `v-bind`:

```js{5}
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime" v-bind="$attrs" />
    </div>
  `
})
```

С такими настройками атрибут `data-status` будет добавляться на элемент `input`!

```html
<!-- Компонент выбора даты с передачей обычного атрибута -->
<date-picker data-status="activated"></date-picker>

<!-- Отрисованный компонент выбора даты -->
<div class="date-picker">
  <input type="datetime" data-status="activated" />
</div>
```

## Наследование атрибутов при нескольких корневых элементах

В отличие от компонентов с одним корневым элементом, компоненты с несколькими корневыми элементами не имеют автоматического наследования атрибутов. Если `$attrs` не были привязаны явно — будет выдано предупреждение во время выполнения кода.

```html
<custom-layout id="custom-layout" @click="changeValue"></custom-layout>
```

```js
// Это вызовет предупреждение
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  `
})

// Всё ок, $attrs передаются на элемент <main>
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main v-bind="$attrs">...</main>
    <footer>...</footer>
  `
})
```
