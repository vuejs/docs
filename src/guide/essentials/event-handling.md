# Обработка событий {#event-handling}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Бесплатный урок по обработке событий во Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Бесплатный урок по обработке событий во Vue.js"/>
</div>

## Прослушивание событий {#listening-to-events}

Можно использовать директиву `v-on`, которую обычно сокращают до символа `@`, чтобы прослушивать события DOM и запускать какой-нибудь JavaScript-код по их наступлению. Используется как `v-on:click="methodName"` или в сокращённом виде `@click="methodName"`.

Значение обработчика может быть одним из следующих:

1. **Обработчик события в виде инлайн-кода:** Встроенный код JavaScript будет выполняться при срабатывании события (аналогично нативному атрибуту `onclick`).

2. **Обработчик события в виде метода:** Имя свойства или путь, указывающий на метод, определённый в компоненте.

## Обработчик события в виде инлайн-кода {#inline-handlers}

Подобный подход обычно используют в очень простых случаях, например:

<div class="composition-api">

```js
const count = ref(0)
```

</div>
<div class="options-api">

```js
data() {
  return {
    count: 0
  }
}
```

</div>

```vue-html
<button @click="count++">Добавить 1</button>
<p>Счётчик: {{ count }}</p>
```

<div class="composition-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnRlciA9IHJlZigwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcblx0ICByZXR1cm4ge1xuICAgIFx0Y291bnRlcjogMFxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## Обработчик события в виде метода {#method-handlers}

Логика многих обработчиков событий будет довольно сложной, поэтому оставлять JavaScript-код в значении атрибута `v-on` бессмысленно. Вот почему `v-on` также принимает имя метода, который потребуется вызвать.

Например:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Привет, ${name.value}!`)
  // `event` — нативное событие DOM
  if (event) {
    alert(event.target.tagName)
  }
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // `this` в методе указывает на текущий активный экземпляр
    alert(`Привет, ${this.name}!`)
    // `event` — нативное событие DOM
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet` — это название метода, объявленного выше -->
<button @click="greet">Поприветствовать</button>
```

<div class="composition-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbmFtZSA9IHJlZignVnVlLmpzJylcblxuZnVuY3Rpb24gZ3JlZXQoZXZlbnQpIHtcbiAgYWxlcnQoYEhlbGxvICR7bmFtZS52YWx1ZX0hYClcbiAgLy8gYGV2ZW50YCBpcyB0aGUgbmF0aXZlIERPTSBldmVudFxuICBpZiAoZXZlbnQpIHtcbiAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJncmVldFwiPkdyZWV0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Z1ZS5qcydcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBncmVldChldmVudCkge1xuICAgICAgLy8gYHRoaXNgIGluc2lkZSBtZXRob2RzIHBvaW50cyB0byB0aGUgY3VycmVudCBhY3RpdmUgaW5zdGFuY2VcbiAgICAgIGFsZXJ0KGBIZWxsbyAke3RoaXMubmFtZX0hYClcbiAgICAgIC8vIGBldmVudGAgaXMgdGhlIG5hdGl2ZSBET00gZXZlbnRcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxidXR0b24gQGNsaWNrPVwiZ3JlZXRcIj5HcmVldDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Метод обработчика автоматически получает нативное событие DOM, которое его вызвало — в примере выше можно получить доступ к элементу, отправившему событие, через `event.target.tagName`.

<div class="composition-api">

См. также: [Аннотация событий](/guide/typescript/composition-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

См. также: [Аннотация событий](/guide/typescript/options-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### Определение метод vs. инлайн {#method-vs-inline-detection}

Компилятор шаблонов определяет методы обработчиков, проверяя является ли строка значения `v-on` допустимым идентификатором JavaScript или путём для обращения к свойству. Например, `foo`, `foo.bar` и `foo['bar']` будут рассматриваться как обработчики методов, а `foo()` и `count++` — как инлайн-обработчики.

## Вызов методов в инлайн-обработчиках {#calling-methods-in-inline-handlers}

Вместо привязки непосредственно к имени метода, также можно вызывать методы в инлайн-обработчике. Это позволяет передавать в метод пользовательские аргументы вместо нативного события:

<div class="composition-api">

```js
function say(message) {
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  say(message) {
    alert(message)
  }
}
```

</div>

```vue-html
<button @click="say('привет')">Скажи привет</button>
<button @click="say('пока')">Скажи пока</button>
```

<div class="composition-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eNp9kN1uwjAMhV8l8g1Dos191aHtGXabm7QzUNb8yHaYKtR3X0KnCoHEnY/j88XHV/iMsb4khAZa7mmIohglxb3xh+R7GYJXbKc3h8z2iFt1NV4pOyLJ2jN+Nr7Viz0bsxB0cbSCRUnbJZHM+ejHof95N1CAmxOOY9hsDey/7KRuqtXL5AtXN+HqyfWdo9Xrp7CDwcVAUjkb6zMHn+PdFjf/D2ygWaKUXs5ftIGTSORGaz705ShnrgMdda5qSl4GhzWyqzoKv4yUwQZ2dwydmxekitB/IyG9Yj6MPnELNl91hvkPugmTrw==)

</div>
<div class="options-api">

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuXHQgIHNheShtZXNzYWdlKSB7XG4gICAgXHRhbGVydChtZXNzYWdlKVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ2hpJylcIj5TYXkgaGk8L2J1dHRvbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ3doYXQnKVwiPlNheSB3aGF0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## Доступ к аргументу события в инлайн-обработчиках {#accessing-event-argument-in-inline-handlers}

Иногда может потребоваться получить доступ к оригинальному событию DOM в инлайн-обработчике. Его можно передать в метод с помощью специальной переменной `$event` или использовать стрелочную функцию инлайн:

```vue-html
<!-- использование специальной переменной $event -->
<button @click="warn('Форму пока ещё нельзя отправить.', $event)">
  Отправить
</button>

<!-- использование стрелочной функции инлайн -->
<button @click="(event) => warn('Форму пока ещё нельзя отправить.', event)">
  Отправить
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // теперь есть доступ к нативному событию
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  warn(message, event) {
    // теперь есть доступ к нативному событию
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## Модификаторы событий {#event-modifiers}

Часто может потребоваться вызвать `event.preventDefault()` или `event.stopPropagation()` внутри обработчиков события. Хоть это и легко можно сделать внутри методов, лучше если методы будут содержать в себе только логику и не имеют дела с деталями события DOM.

Для решения этой задачи Vue предоставляет **модификаторы событий** для `v-on`. Вспомните, что модификаторы — это постфиксы директивы, отделяемые точкой:

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- всплытие события click будет остановлено -->
<a @click.stop="doThis"></a>

<!-- событие submit перестанет перезагружать страницу -->
<form @submit.prevent="onSubmit"></form>

<!-- модификаторы можно объединять в цепочки -->
<a @click.stop.prevent="doThat"></a>

<!-- можно использовать без обработчиков -->
<form @submit.prevent></form>

<!-- вызов обработчика только в случае наступления события непосредственно -->
<!-- на данном элементе (то есть не на дочернем компоненте) -->
<div @click.self="doThat">...</div>
```

:::tip Совет
При использовании модификаторов имеет значение их порядок, потому что в той же очерёдности генерируется соответствующий код. Поэтому `@click.prevent.self` предотвратит **действие клика по умолчанию на самом элементе и на его дочерних элементах**, в то время как `@click.self.prevent` предотвратит действие клика по умолчанию только на самом элементе.
:::

Модификаторы `.capture`, `.once` и `.passive` аналогичны [опциям нативного метода `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options):

```vue-html
<!-- можно отслеживать события в режиме capture, т.е. событие, нацеленное -->
<!-- на внутренний элемент, обрабатывается здесь до обработки этим элементом -->
<div @click.capture="doThis">...</div>

<!-- обработчик click будет вызван максимум 1 раз -->
<a @click.once="doThis"></a>

<!-- по умолчанию событие scroll (при прокрутке) произойдёт -->
<!-- незамедлительно, вместо ожидания окончания `onScroll`  -->
<!-- на случай, если там будет `event.preventDefault()`     -->
<div @scroll.passive="onScroll">...</div>
```

Модификатор `.passive` особенно полезен для [улучшения производительности на мобильных устройствах](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners).

:::tip Совет
Не используйте `.passive` и `.prevent` вместе — `.prevent` будет проигнорирован и браузер скорее всего покажет предупреждение. Запомните, что `.passive` сообщает браузеру, что для события _не будет предотвращаться поведение по умолчанию_.
:::

## Модификаторы клавиш {#key-modifiers}

При прослушивании событий клавиатуры часто нужно отслеживать конкретные клавиши. Vue позволяет использовать модификаторы клавиш при использовании `v-on` или `@` при прослушивании событий клавиш:

```vue-html
<!-- вызвать `vm.submit()` только если `key` будет `Enter` -->
<input @keyup.enter="submit" />
```

Можно напрямую использовать любые допустимые имена клавиш, предоставляемые через [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) в качестве модификаторов, указывая их имена в kebab-case формате.

```vue-html
<input @keyup.page-down="onPageDown" />
```

В примере выше обработчик будет вызван только когда `$event.key` будет `'PageDown'`.

### Псевдонимы клавиш {#key-aliases}

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

### Системные модификаторы клавиш {#system-modifier-keys}

Можно использовать следующие модификаторы для прослушивания событий мыши или клавиатуры только при зажатой клавиши-модификатора:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

:::tip Примечание
На клавиатурах Apple клавиша meta отмечена знаком ⌘. На клавиатурах Windows клавиша meta отмечена знаком ⊞. На клавиатурах Sun Microsystems клавиша meta отмечена символом ромба ◆. На некоторых клавиатурах, особенно MIT и Lisp machine и их преемников, таких как Knight или space-cadet клавиатуры, клавиша meta отмечена словом «META». На клавиатурах Symbolics, клавиша meta отмечена словом «META» или «Meta».
:::

Например:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Сделать что-нибудь</div>
```

:::tip Совет
Обратите внимание, клавиши-модификаторы отличаются от обычных клавиш и при отслеживании событий `keyup` должны быть нажаты, когда событие происходит. Другими словами, `keyup.ctrl` будет срабатывать только если отпустить клавишу, удерживая нажатой `ctrl`. Это не сработает, если отпустить только клавишу `ctrl`.
:::

### Модификатор `.exact` {#exact-modifier}

Модификатор `.exact` позволяет контролировать точную комбинацию системных модификаторов, необходимых для запуска события.

```vue-html
<!-- сработает, даже если также нажаты Alt или Shift -->
<button @click.ctrl="onClick">A</button>

<!-- сработает, только когда нажат Ctrl и не нажаты никакие другие клавиши -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- сработает, только когда не нажаты никакие системные модификаторы -->
<button @click.exact="onClick">A</button>
```

## Модификаторы клавиш мыши {#mouse-button-modifiers}

- `.left`
- `.right`
- `.middle`

Эти модификаторы ограничивают обработчик события только вызовами определённой кнопкой мыши.
