# Обробка подій

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Безкоштовний урок по обробці подій у Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Безкоштовний урок по обробці подій у Vue.js"/>
</div>

## Прослуховування подій

Ми можемо використовувати директиву `v-on`, яку ми зазвичай скорочуємо до символу `@`, щоб слухати події DOM і запускати потрібний JavaScript, коли дані події виконуються. Це виглядатиме як `v-on:click="handler"` або скорочено `@click="handler"`.

Значення обробника може бути одним із наступних:

1. **Вбудовані обробники:** вбудований JavaScript буде виконано, коли ініціюється певна подія (подібно до рідного атрибута `onclick`).

2. **Обробники методів:** ім’я властивості або шлях, що вказує на метод, визначений у компоненті.

## Вбудовані обробники

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

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UM1OAjEQfpVJL2iArV7JQvQ9eoG1q4ts20y7eNhsonLybjz4FEgkEo34CtM3smUJMZp4m5nvZ2a+mp0bk8wryQYstRkWxoGVrjIjoYrSaHRQA8ocGshRl9AJ1I5QQmVaWQeZrpSTCMPIOTo5FirlrUvQh8bJ0szGTsbOpZPKOa3gLJsV2fVQsL262xVsRI+0pVda+nvawGnKW26rMyN6ps+Af9G7XwCtaOMfaA304hf0QVsI4E7o70K1jlSo68NxTQP+lpb05p9olaQ8/pbyw2msx9pP++XYJFOrVciiFgpA7AEr2AB2kzgLCcResCvnjB1wbvMsJji1icZLHqoEw+KilIm0ZX+C+sZKDMaC9X548DCcS+yjVBcSJf7n+Yv6xzfaNkI1rPkGTqC8Gg==)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kM9KAzEQxl9lyElpu9HrshZ9j1y226lu7e6GZLYKy4Lak3fx4FPUYrEo1leYvJFJW4ooFEKYP9/8kvkacaF1NK1RxCKxmck19VWJt7oyBEMcpfWEoFElwDCl9Og4xIoADFJtym0HQFFW1SWhieEkVBS1QeYvfxK55/qEsNCTlDBklAxqoqqE82ySZ9dnSuwwnY4SfX7iNb/x3D3wCk4TudVu53SfX/jL97/5w82AF7xyj7wEfnUz/uQ1+OZm0N37aBmk0DSww0PbgrvjOb+7Z15EidSemsj910RX5EVwoFekOhrbqvTubFZVu4ZVIt4vL7x9IVfiikjbWEo7yoKnYxtV5lL6KDL+4bzACG3RG5jqxqLxYCW6vxjSF6doegbLIRo0h5h/pP+4ARvsF+0PiGzCMQ==)

</div>

## Обробники методів

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

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UbFOwzAQ/ZXDQmqR2niv0gokVmBj8tA0XEpK4kT2JQxRpIoPYKq68gsIdehC+QXnj7ikFBWQkGzZ53v37t5zJS7y3CsLFCPh29DEOYFFKvKJ0nGaZ4agAoMR1BCZLIUeQ3tKKx1m2hLoIEUYt4B+77ZAb2F7Z202KnRIcaZhbhCpjyVqOoNKaYAgQUP9qXtplm7r3pp18zSA06pl8sogKbA+mTIHgJQw7Qqn0KygWTZrt3Hvbtc8g/twO7fh0hUHlzdXLTyO4EefQ6fuzaPAzLE95tfcqOOvlebly71q1ssBYZonAWEbkT8riFjDeZjE4cNYiU6MEpPj2d0r760v91iu8+U3iRiIvYfDNMjZm0yzy91w6ithlRgdxlWCvW1jJe6JcjuS0kZh+zcL62VmLvnmmUJTzE6hTYczkz1aNEysxOCIQ/JjiWZoUN+hQfMf5y/oH96DUaL+BPX51Ow=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UsFu00AQ/ZXpCqmpFNv3yFQgcQVunPZgN5kkLvHa2l0HpChSaA+IS7lUufILVUjUUNrwC7O/wJcw68SmohKStbsz++bN2+eZiZdlGU4rFD0Rm77OSnsqFX4sC21hgMO0mliYSQUwSG3aOdmfATTaSqsmAlBpjj04fldheG6O99m53+Zdv+Zox8XA9JqCkUa0HZyisi0lQBRBYseZSYBW7hNt3II2tKYtPbgl0D0nLmhHa7ekFSPojm7o1l26K3cN9EA3QL9o5yHuM4db+gEMuOPElsGHxIarbnm9Z+xP99Utmt7pBLXtJPSNmzLeLd1FF57NvJzQP25+lJw81llrT4BbuwULWnODnbuqJXiF7pqDV29fNyXZEJ48t2la50Ob6hH6bfSG27W9ahMbL6XiL47a/8SBxbycpBY5AoiPggCS2twEfi/2tvB7V96cv/5ddr19W77gazZr48XTd9rVafeFNhAEnt7GZ5W1hYIX/UnWf/9cippbitPHPjEHexxHeyzXxVGrSnRFlvthCvK05NEoFA9a7YA8XBgp2rGQgifRx1KMrS1NL4rMsO/H89yEhR5FfAp1pWyWY4gmD8508cGgZmIp6kE7cEScnKIONKoBatT/4/wH+oS3cV7M/wCzBFzW)

</div>

Обробник методу автоматично отримує власний об’єкт події DOM, який ініціює його – у наведеному вище прикладі ми можемо отримати доступ до елемента, який відправляє подію через `event.target.tagName`.

<div class="composition-api">

Дивіться також: [Типізація обробників подій](/guide/typescript/composition-api.html#типізація-обробників-подій) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Дивіться також: [Типізація обробників подій](/guide/typescript/options-api.html#типізація-обробників-подій) <sup class="vt-badge ts" />

</div>

### Метод проти вбудованого виявлення

Компілятор шаблону виявляє обробники методів, перевіряючи, чи є рядок значення `v-on` дійсним ідентифікатором JavaScript або шляхом доступу до властивості. Наприклад, `foo`, `foo.bar` і `foo['bar']` розглядаються як обробники методів, тоді як `foo()` і `count++` розглядаються як вбудовані обробники.

## Виклик методів у вбудованих обробниках

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

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kUFOwzAQRa9ieVMqNfE+ChXcw5s0TEtK7FieSRGqInEKWCMuELFAqIg7ODdiTFApVHTnP9//yfO9lZfOpZsWZCZzLH3lSCBQ6+baLltbUtVYgcXdmQHEYgVTsdVWiKIGT/uZtp22uRrjHGRBYFxdEERF+aIlYs5FWVflzbmWETgJT+E99OEl9JOplnOWO5av4U38OLkao4wR4h/Mc9gN96EfHsPH8HCE+uUe4HK1f6Kcycq4xlNiCpeusbFcxtea+ttALbNx8TjjtqLW8prIYaYULstY4RrTxq8Un1LfWqoMpIAmWfjmFsEzWMvZAUPxcAM+8WCvwIM/xfxz9YgbsfwHnew+ARJcvH8=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kUtOwzAQhq9ieVMqtfE+ChXcw5s0mbYp8UOeSQFVlTgFrBEXiFggVMQdnBthpygUKipZlv95fGP/3vJra5NNAzzlGRausjSTGu6sccRKWORNTWwrNWMKaGVKTKOSxBjm9xcKEPMljA8VjEnKa3A0xGNU0i42hC2sTAwzgiBQts4JoqJs3hAZza6KuipuLiWPA0b+2X/41r/6djSWfBbkPsg3/85+Mpk4tAYMY/9gXvy+e/Bt9+Q/u8cT1K/sES4TwxX5hFcqujJVuU3WaHRwrH+2/E6g5L05vRE8WBq15Csii6kQuCiiz2tMjFuKcEpco6lSkACq6dyZWwQXwJJPjhgiBDfgpg50CQ7cOeaf0hNuxMZv4Lsv/DXJFQ==)

</div>

## Accessing Event Argument in Inline Handlers
## Доступ до аргументу події у вбудованих обробниках

Іноді нам також потрібно отримати доступ до оригінальної події DOM у вбудованому обробнику. Ви можете передати його в метод за допомогою спеціальної змінної `$event` або використати вбудовану стрілкову функцію:

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

## Модифікатори подій

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

Модифікатор `.passive` зазвичай використовується зі слухачами подій touch (дотику) для [підвищення продуктивності на мобільних пристроях](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners).

::: tip
Не використовуйте `.passive` і `.prevent` разом, оскільки `.passive` вже вказує браузеру, що ви _не_ маєте намір запобігти поведінці події за замовчуванням, і, ймовірно, ви побачите попередження від браузера, якщо ви це зробите.
:::

## Ключові модифікатори

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

### Key Aliases
### Ключові псевдоніми

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

### Клавіші-модифікатори системи

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

### Модифікатор `.exact`

Модифікатор `.exact` дозволяє керувати точною комбінацією системних модифікаторів, необхідних для ініціювання події.

```vue-html
<!-- це спрацює, навіть якщо також натиснути Alt або Shift -->
<button @click.ctrl="onClick">A</button>

<!-- це спрацює лише тоді, коли не натиснуто Ctrl і жодних інших клавіш -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- це запускатиметься лише тоді, коли не буде натиснуто системних модифікаторів -->
<button @click.exact="onClick">A</button>
```

## Модифікатори кнопок миші

- `.left`
- `.right`
- `.middle`

Ці модифікатори обмежують обробник подіями, викликаними певною кнопкою миші.
