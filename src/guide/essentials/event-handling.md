# Обробка подій {#event-handling}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Безкоштовний урок по обробці подій у Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Безкоштовний урок по обробці подій у Vue.js"/>
</div>

## Прослуховування подій {#listening-to-events}

Ми можемо використовувати директиву `v-on`, яку ми зазвичай скорочуємо до символу `@`, щоб слухати події DOM і запускати потрібний JavaScript, коли дані події виконуються. Це виглядатиме як `v-on:click="handler"` або скорочено `@click="handler"`.

Значення обробника може бути одним із наступних:

1. **Вбудовані обробники:** вбудований JavaScript буде виконано, коли ініціюється певна подія (подібно до рідного атрибута `onclick`).

2. **Обробники методів:** ім’я властивості або шлях, що вказує на метод, визначений у компоненті.

## Вбудовані обробники {#inline-handlers}

Вбудовані обробники зазвичай використовуються в простих випадках, наприклад:

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
<button @click="count++">Додати 1</button>
<p>Рахунок: {{ count }}</p>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNo9j8FqAjEQhl9lyMUWwW2vJS7te+TShghL3SRkZ3tZFtp66r300KdQURRFfYU/b2TWFW8z/N83/NOIF+9HH7URT0JWOhSeqTJc+1zZovQuMDUUzIRamgRX0iChA2WV1c5WTNrVlk2gccfcPdwrK7P+SvLTwqb001c23cbyrWZ2lp71tNDvYyWu9nCoRI5fHLHCPH5jS48y69ne8zn+cUj5Cbs4IyyxjT9YExZxhj2OlMKLGL/StO5Qappbubal+Ik5NvEPy5HMut9kdqsm2jOXrHW1)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNo9Ts1qAjEQfpWPnFoEt71KurTvkct2TUG6zYZ0UgrLQltPvYsHn0JFURT1FSZvZOKKMAzfN98P04gXa/tfXouBkJ+lG1nKldHftnaEoX4rfEVolAGGBRV39wkrApwm70ynAIrK2hvSboCHdFHUJltccWR2642E9IetCtKJkXz1RLXBc1mNyvcnJa41vZ4SOU/4yCuehz/e4lFmnbfL2ZxnfIj6iXdhDF7yNvzzGrwIY97zEVG8BMNvROtkRdPgWo+2RfjhOW/ClJd9mdnYKrPba6I9A/zwe8w=)

</div>

## Обробники методів {#method-handlers}

Логіка для багатьох обробників подій буде складнішою, і, ймовірно, неможлива з вбудованими обробниками. Ось чому `v-on` також може прийняти назву або шлях методу компонента, який ви хочете викликати.

Наприклад:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Привіт, ${name.value}!`)
  // `event` є рідною подією DOM
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
    // `this` всередині методів вказуює на поточний активний екземпляр
    alert(`Привіт, ${this.name}!`)
    // `event` є рідною подією DOM
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet` — назва методу, визначеного вище -->
<button @click="greet">Привітати</button>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpVT81KxDAQfpUxCN0Fae/SXRS8qjdPObSWaam2aUgnvZTC4gN4WvbqK4jsYS+ur5C8kZMuikJC+DLfz3yjuNY6HiyKS5H2hak1QY9k9VqqutWdIRjBYAkTlKZrIWJqJJVURad6ApW3CKtAWEQPFuOnPlqGaWlVQXWnoDKItMABFS1hlAogb9DQInNvfuMO7sPv/MsFnI/BKR7yxuJ0lrEHQJJANgsz8FvwG79ze/fpjv4V3Jc7uj1Ltwxu7m8DvS7hX85P0vwXU24qDE91x0Gz/yQVnzQ5tea+DAhb3eSEAVH6aIm4w1XR1MXzSoq5jBTrv7u7d76HNDlxWZcmvyZi+gaPYo6H)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNplUcFOwkAQ/ZWxMQESoHdSiSZe1ZunHlphgWopTbslJqRJhYPxghfC1V8gSENFqL8w+wt+ibOtrSQmzW7n7Zt5b99OlAvXbY4DprQUze94lsvbusMe3ZHHoct6ZmBzmOgOQNfkZrWW/wN4jAeeU1QAjjlkLajcBqx571dyNJRbWJfrkPHBqOu3ioa+xxivsjFzeDkSQFXB4APLNwDX4gljEWGMG0zwIJaAewKmmOJGLHFNDNzhCrdiJuZiAXjAFeAXppIinqlM8AOIsCMgIfIvEFPXltY9cT/Fq4gKbdNmHq8a+EaixBdLMa3D6UTaacrLhSdG7dhn5t0AkhYRGdqQQCrmmQXpUCyouLy5KlqsHvy7biGa4U1uen0mt/41yZVaWYhFlrpDn6aW70QFZ0PXNjmjCkA7aTTAyMI14DvKY6H7rmU4f/nN6jK+hA7omMKKpXl8xzSDxQvG0GjI8Vy7CzgfOXDesa3Ow5muZLN1pX2cE82gjDU151KfppaulPAHi3AWcQ==)

</div>

Обробник методу автоматично отримує власний об’єкт події DOM, який ініціює його – у наведеному вище прикладі ми можемо отримати доступ до елемента, який відправляє подію через `event.target.tagName`.

<div class="composition-api">

Дивіться також: [Типізація обробників подій](/guide/typescript/composition-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Дивіться також: [Типізація обробників подій](/guide/typescript/options-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### Метод проти вбудованого виявлення {#method-vs-inline-detection}

Компілятор шаблону виявляє обробники методів, перевіряючи, чи є рядок значення `v-on` дійсним ідентифікатором JavaScript або шляхом доступу до властивості. Наприклад, `foo`, `foo.bar` і `foo['bar']` розглядаються як обробники методів, тоді як `foo()` і `count++` розглядаються як вбудовані обробники.

## Виклик методів у вбудованих обробниках {#calling-methods-in-inline-handlers}

Замість прив'язки безпосередньо до імені методу ми також можемо викликати методи у вбудованому обробнику. Це дозволяє нам передавати спеціальні аргументи методу замість рідної події:

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
<button @click="say('Слава')">Скажи Слава</button>
<button @click="say('Україні')">Скажи Україні</button>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp1jkEKwjAQRa8yZKPd2L3EovfIJoYoxTaGZiJIKXgKXYsXKC5EKt5heiNTClURl28+7zElW1g72XnNpow7VaQWwWn0NhFm5Y3CdGvAyf04187JtY6gFAZAZrrA4SZMJQyPez2IAVDnNpOoO0K+9IihM1dZqjYzwbrgiM70oJquVI8iwZKATcAb3eG98LhXQwbgT+ZCTXuguj3Rsz3+pL7WjxyPhxdZ9QILUXYa)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp1jk0KwkAMha8SZqNu7F5G0XvMZqzxB/szdFJRpOApdC1eoLgQqXiH9EbOUKiKCCHwJXnvZS8mxvQ3OYqBkDbMVoZGKsGtSTOCGc51HhHsVQIQIy3TmR14UgRg9a4bo7V6gb3mAkCRjjCjdu6nigovcM2VDNoMB4SxiTShJ5LTnChNYBxGq3A9VMIHdPjMDy75ymWnp8TIYeXwxnd4b2TQSJ0NwB+bC1f1gcv6xM/6+GP1tf2wk0H7oihe+aKCsA==)

</div>

## Доступ до аргументу події у вбудованих обробниках {#accessing-event-argument-in-inline-handlers}

Іноді нам також потрібно отримати доступ до оригінальної події DOM у вбудованому обробнику. Ви можете передати його в метод за допомогою спеціальної змінної `$event` або використати вбудовану стрілочну функцію:

```vue-html
<!-- using $event special variable -->
<button @click="warn('Форму ще не можна надіслати.', $event)">
  Надіслати
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Форму ще не можна надіслати.', event)">
  Надіслати
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // тепер ми маємо доступ до рідної події
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
    // тепер ми маємо доступ до рідної події
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## Модифікатори подій {#event-modifiers}

Дуже часто потрібно викликати `event.preventDefault()` або `event.stopPropagation()` всередині обробників подій. Хоча ми можемо це легко зробити всередині методів, було б краще, якби методи стосувалися виключно логіки даних, а не мали справу з деталями подій DOM.

Щоб розв'язати цю проблему, Vue надає **модифікатори подій** для `v-on`. Нагадаємо, що модифікатори — це директивні постфікси, які позначаються крапкою.

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- розповсюдження події click буде зупинено -->
<a @click.stop="doThis"></a>

<!-- подія надсилання більше не перезавантажуватиме сторінку -->
<form @submit.prevent="onSubmit"></form>

<!-- модифікатори можуть бути виражені у вигляді ланцюжка -->
<a @click.stop.prevent="doThat"></a>

<!-- лише модифікатор -->
<form @submit.prevent></form>

<!-- лише обробник тригера, якщо event.target є самим елементом -->
<!-- тобто, не з дочірнього елемента -->
<div @click.self="doThat">...</div>
```

::: tip
Порядок має значення при використанні модифікаторів, оскільки відповідний код генерується в тому самому порядку. Таким чином, використання `@click.prevent.self` запобігатиме **події click за замовчуванням для самого елемента та його дочірніх елементів**, тоді як `@click.self.prevent` запобігатиме лише дії клацання за замовчуванням для самого елемента.
:::

Модифікатори `.capture`, `.once` і `.passive` вказують на [параметри власного методу `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options):

```vue-html
<!-- використовувати режим захоплення під час додавання прослуховувача подій -->
<!-- тобто подія, спрямована на внутрішній елемент, обробляється тут, перш ніж оброблятися цим елементом -->
<div @click.capture="doThis">...</div>

<!-- подія клацання буде ініційована щонайбільше один раз -->
<a @click.once="doThis"></a>

<!-- типова поведінка події прокручування відбудеться -->
<!-- негайно, замість того, щоб чекати завершення `onScroll` -->
<!-- якщо він містить `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

Модифікатор `.passive` зазвичай використовується зі слухачами подій touch (дотику) для [підвищення продуктивності на мобільних пристроях](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scroll_performance_using_passive_listeners).

::: tip
Не використовуйте `.passive` і `.prevent` разом, оскільки `.passive` вже вказує браузеру, що ви _не_ маєте намір запобігти поведінці події за замовчуванням, і, ймовірно, ви побачите попередження від браузера, якщо ви це зробите.
:::

## Ключові модифікатори {#key-modifiers}

Під час прослуховування подій клавіатури нам часто потрібно перевіряти певні клавіші. Vue дозволяє додавати ключові модифікатори для `v-on` або `@` під час прослуховування ключових подій:

```vue-html
<!-- викликати `submit` лише тоді, коли `key` є клавішею `Enter` -->
<input @keyup.enter="submit" />
```

Ви можете безпосередньо використовувати будь-які дійсні назви ключів, надані через [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) як модифікатори, перетворивши їх на kebab-case.

```vue-html
<input @keyup.page-down="onPageDown" />
```

У наведеному вище прикладі обробник буде викликано, лише якщо `event.key` дорівнює `'PageDown'`.

### Ключові псевдоніми {#key-aliases}

Vue надає псевдоніми для найбільш часто використовуваних ключів:

- `.enter`
- `.tab`
- `.delete` (стосується клавіш «Delete» і «Backspace».)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### Клавіші-модифікатори системи {#system-modifier-keys}

Ви можете використовувати такі модифікатори, щоб запускати слухачів подій миші або клавіатури, лише коли натиснуто відповідну клавішу-модифікатор:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Примітка
На клавіатурах Macintosh meta — це командна клавіша (⌘). На клавіатурах Windows meta — це клавіша Windows (⊞). На клавіатурах Sun Microsystems meta позначено суцільним ромбом (◆). На деяких клавіатурах, зокрема машинних клавіатурах MIT та Lisp, а також клавіатурах Knight, Space-cadet, meta позначається як «META». На клавіатурах Symbolics meta позначається як «META» або «Meta».
:::

Наприклад:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Зробити щось</div>
```

::: tip
Зауважте, що клавіші-модифікатори відрізняються від звичайних клавіш, і коли вони використовуються з подіями `keyup`, їх потрібно натискати під час випромінювання події. Іншими словами, `keyup.ctrl` спрацює, лише якщо ви відпустите клавішу, утримуючи `ctrl`. Він не запуститься, якщо ви відпустите лише клавішу `ctrl`.
:::

### Модифікатор `.exact` {#exact-modifier}

Модифікатор `.exact` дозволяє керувати точною комбінацією системних модифікаторів, необхідних для ініціювання події.

```vue-html
<!-- це спрацює, навіть якщо також натиснути Alt або Shift -->
<button @click.ctrl="onClick">A</button>

<!-- це спрацює лише тоді, коли не натиснуто Ctrl і жодних інших клавіш -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- це запускатиметься лише тоді, коли не буде натиснуто системних модифікаторів -->
<button @click.exact="onClick">A</button>
```

## Модифікатори кнопок миші {#mouse-button-modifiers}

- `.left`
- `.right`
- `.middle`

Ці модифікатори обмежують обробник подіями, викликаними певною кнопкою миші.
