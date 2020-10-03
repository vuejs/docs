# Обработка событий

## Подписка на события

Для подписки на события DOM и выполнения JavaScript-кода по их наступлении используйте директиву `v-on`, которую обычно можно сократить до символа `@`.

Например:

```html
<div id="basic-event">
  <button @click="counter += 1">+1</button>
  <p>Кнопка выше была нажата {{ counter }} раз</p>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      counter: 1
    }
  }
}).mount('#basic-event')
```

Результат:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="xxGadPZ" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Event handling: basic">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/xxGadPZ">
  Event handling: basic</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Обработчики событий

Логика обработчика события может быть довольно сложной, поэтому оставлять JavaScript-код в значении атрибута `v-on` не всегда возможно. В этом случае `v-on` может принять и название метода, который необходимо вызвать.

Например:

```html
<div id="event-with-method">
  <!-- `greet` — это название метода, определённого ниже -->
  <button @click="greet">Поприветствовать</button>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    greet(event) {
      // `this` внутри методов указывает на текущий активный экземпляр
      alert('Привет, ' + this.name + '!')
      // `event` — нативное событие DOM
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}).mount('#event-with-method')
```

Результат:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="jOPvmaX" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Event handling: with a method">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/jOPvmaX">
  Event handling: with a method</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Методы и inline-обработчики

Кроме указания имени метода, можно использовать и JavaScript-выражения:

```html
<div id="inline-handler">
  <button @click="say('hi')">Скажи hi</button>
  <button @click="say('what')">Скажи what</button>
</div>
```

```js
Vue.createApp({
  methods: {
    say(message) {
      alert(message)
    }
  }
}).mount('#inline-handler')
```

Результат:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="WNvgjda" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Event handling: with an inline handler">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/WNvgjda">
  Event handling: with an inline handler</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Иногда в inline-обработчиках необходим доступ к оригинальному событию DOM. Его можно передать в метод, используя специальную переменную `$event`:

```html
<button @click="warn('Форма не может быть отправлена.', $event)">
  Отправить
</button>
```

```js
// ...
methods: {
  warn(message, event) {
    // теперь у нас есть доступ к нативному событию
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

## Несколько обработчиков события

В обработчике событий можно задать несколько методов, разделив их оператором запятой:

```html
<!-- оба метода one() и two() будут вызваны при клике на кнопке -->
<button @click="one($event), two($event)">
  Отправить
</button>
```

```js
// ...
methods: {
  one(event) {
    // логика первого обработчика события...
  },
  two(event) {
    // логика второго обработчика события...
  }
}
```

## Модификаторы событий

Очень часто возникает необходимость вызывать `event.preventDefault()` или `event.stopPropagation()` в обработчике события. Несмотря на то, что это легко сделать внутри метода, лучше сохранять чистоту логики и абстрагироваться от деталей реализации событий DOM.

Для решения этой задачи Vue предоставляет **модификаторы событий** для `v-on`, которые указываются как постфиксы и отделяются точкой:

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- событие click не будет всплывать дальше -->
<a @click.stop="doThis"></a>

<!-- событие submit больше не будет перезагружать страницу -->
<form @submit.prevent="onSubmit"></form>

<!-- модификаторы можно объединять в цепочки -->
<a @click.stop.prevent="doThat"></a>

<!-- и использовать без указания метода-обработчика -->
<form @submit.prevent></form>

<!-- можно отслеживать события в режиме capture, т.е. событие, нацеленное -->
<!-- на внутренний элемент, обрабатывается здесь до обработки этим элементом -->
<div @click.capture="doThis">...</div>

<!-- вызов обработчика только в случае наступления события непосредственно -->
<!-- на данном элементе (то есть не на дочернем компоненте) -->
<div @click.self="doThat">...</div>
```

:::tip Совет
При использовании модификаторов порядок имеет значение, потому что код генерируется в том же порядке. Поэтому `@click.prevent.self` будет предотвращать **все клики**, в то время как `@click.self.prevent` будет предотвращать клики только на самом элементе.
:::

```html
<!-- Событие click сработает только 1 раз -->
<a @click.once="doThis"></a>
```

В отличие от остальных модификаторов, которые поддерживают только нативные события DOM, модификатор `.once` может использоваться и в [пользовательских событиях компонентов](component-custom-events.md). Если вы ещё не читали о компонентах, не беспокойтесь об этом сейчас.

Vue также предоставляет модификатор `.passive`, соответствующий опции [`passive` в `addEventListener`](https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener#Syntax).

```html
<!-- по умолчанию событие scroll (при прокрутке) произойдёт -->
<!-- незамедлительно, вместо ожидания окончания `onScroll`  -->
<!-- на случай, если там будет `event.preventDefault()`     -->
<div @scroll.passive="onScroll">...</div>
```

Модификатор `.passive` особенно полезен для повышения производительности на мобильных устройствах.

:::tip Совет
Не используйте вместе `.passive` и `.prevent`, потому что `.prevent` будет проигнорирован и браузер возможно покажет предупреждение. Помните, что `.passive` сообщает браузеру, что вы _не хотите_ предотвращать поведение по умолчанию для события.
:::

## Модификаторы клавиш

При обработке событий клавиатуры нас часто интересуют конкретные клавиши. Vue позволяет использовать модификаторы клавиш при использовании `v-on` или `@` для отслеживания событий от клавиатуры:

```html
<!-- вызвать `vm.submit()` только если `key` будет `Enter` -->
<input @keyup.enter="submit" />
```

Можно также использовать любые допустимые имена клавиш, предоставляемые через [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) в качестве модификаторов, именуя их в kebab-case.

```html
<input @keyup.page-down="onPageDown" />
```

В примере выше обработчик будет вызываться только если `$event.key` будет `'PageDown'`.

### Псевдонимы клавиш

Vue предоставляет псевдонимы для наиболее часто используемых клавиш:

- `.enter`
- `.tab`
- `.delete` (ловит как «Delete», так и «Backspace»)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

## Системные модификаторы клавиш

Можно использовать следующие модификаторы для отслеживания событий мыши или клавиатуры с зажатой клавишей-модификатором:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

:::tip Примечание
На клавиатурах Apple клавиша meta отмечена знаком ⌘. На клавиатурах Windows клавиша meta отмечена знаком ⊞. На клавиатурах Sun Microsystems клавиша meta отмечена символом ромба ◆. На некоторых клавиатурах, особенно MIT и Lisp machine и их преемников, таких как Knight или space-cadet клавиатуры, клавиша meta отмечена словом «META». На клавиатурах Symbolics, клавиша meta отмечена словом «META» или «Meta».
:::

Например:

```html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Сделать что-нибудь</div>
```

:::tip Совет
Обратите внимание, клавиши-модификаторы отличаются от обычных клавиш и при отслеживании событий `keyup` они должны быть нажаты, когда событие генерируется. Другими словами, `keyup.ctrl` сработает только тогда, когда вы отпустите клавишу, удерживая нажатой `ctrl`. Это не сработает, если вы отпустите только клавишу `ctrl`.
:::

### Модификатор `.exact`

Модификатор `.exact` позволяет контролировать точную комбинацию системных модификаторов, необходимых для запуска события.

```html
<!-- сработает, даже если Alt или Shift также нажаты -->
<button @click.ctrl="onClick">A</button>

<!-- сработает, только когда нажат Ctrl и не нажаты никакие другие клавиши -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- сработает, только когда не нажаты никакие системные модификаторы -->
<button @click.exact="onClick">A</button>
```

### Модификаторы клавиш мыши

- `.left`
- `.right`
- `.middle`

Эти модификаторы ограничивают обработчик события только вызовами определённой кнопкой мыши.

## Почему подписчики указываются в HTML?

Может показаться, что такой подход к отслеживанию событий нарушает старое доброе правило «разделения мух и котлет». Не беспокойтесь — поскольку все обработчики во Vue связываются с ответственным за текущее представление экземпляром vm, трудностей в поддержке не возникает. На практике есть даже несколько преимуществ при использовании `v-on` или `@`:

1. Легче получить представление об имеющихся обработчиках, просто пробежав глазами по HTML-коду шаблона.

2. Поскольку нет необходимости вручную привязывать обработчики событий в JS, код vm остаётся независимым от DOM и содержит только необходимую логику. Это облегчает тестирование.

3. Когда vm уничтожается, все слушатели событий автоматически удаляются. Нет необходимости волноваться, что придётся прибираться за собой.
