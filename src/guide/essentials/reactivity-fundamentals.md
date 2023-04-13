---
outline: deep
---

# Основи реактивності {#reactivity-fundamentals}

:::tip Вподобання API
Ця сторінка та багато інших розділів гіду містять різний контент для опційного АРІ і композиційного АРІ. Вашим поточним налаштуванням є <span class="options-api">Опційний АРІ</span><span class="composition-api">Композиційний АРІ</span>. Ви можете перемикатися між стилями API за допомогою перемикача «Вподобання API» у верхній частині лівої бічної панелі.
:::

## Оголошення реактивного стану {#declaring-reactive-state}

<div class="options-api">

У Options API ми використовуємо опцію `data`, щоб оголосити реактивний стан компонента. Значення параметра має бути функцією, яка повертає об’єкт. Vue викличе функцію під час створення нового екземпляра компонента та обгорне повернутий об’єкт у свою систему реактивності. Будь-які властивості верхнього рівня цього об’єкта проксуються на рівні екземпляру компонента (`this` у методах і хуках життєвого циклу):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` - це хук життєвого циклу, який ми пояснимо пізніше
  mounted() {
    // `this` вказує на екземпляр компонента
    console.log(this.count) // => 1

    // реактивні властивості також можуть бути змінені
    this.count = 2
  }
}
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpFUEFKxEAQ/EqR0y5IFj2G3QX/kUPGSccMTnpCpmOUkJP4D5/gWdA3ZH/kTKJZGOgpuqu6qsfkvm3T556SLDl63ZlWzjnTS+s6QUmV6q1gzBkolajdfv0DHUnf8T8CtOtZMtyueIplusk51sMBRRPbVBYwHgrWVKRftSXUzj1hqI2uMRAGYy3CbqsMwyqhLvL/uNfdUVBq44vgoqLOQxykpuChaR0TCwx7UawpXQnasXeWUused5GYLm73Ueh0jp433RgSWjEeCE0vwUIJ5YM3a9eZKx0n3C0xcw7veNiOF4BQE0IIBQTMH/Pn5f3yNn/PP/NXhnFcr4Vp4W2zyfQLJPmKXA==)

Ці властивості екземпляра додаються лише під час першого створення екземпляра, тому вам потрібно переконатися, що всі вони присутні в об’єкті, що повертається функцією `data`. За потреби використовуйте `null`, `undefined` або будь-яке інше підмінне значення для властивостей, де значення властивості ще не доступне.

Можна додати нову властивість безпосередньо до `this`, не включаючи її в `data`. Однак властивості, додані таким чином, не зможуть ініціювати реактивні оновлення.

Vue використовує префікс `$`, коли розкриває власні вбудовані API через екземпляр компонента. Він також резервує префікс `_` для внутрішніх властивостей. Слід уникати використання імен для властивостей `data` верхнього рівня, які починаються з будь-якого з цих символів.

### Реактивний проксі та вихідне значення \* {#reactive-proxy-vs-original}

У Vue 3 дані стають реактивними завдяки використанню [JavaScript проксі](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Користувачі, які знайомі з Vue 2, повинні пам’ятати про таке виключення:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

Коли ви використовуєте `this.someObject` після його ініціації, значення є реактивним проксі оригінального `newObject`. **На відміну від Vue 2, оригінальний `newObject` залишається недоторканим і не буде зроблений реактивним: переконайтеся, що завжди отримуєте доступ до реактивного стану як властивості `this`.**

</div>

<div class="composition-api">

Ми можемо створити реактивний об’єкт або масив за допомогою функції [`reactive()`](/api/reactivity-core#reactive):

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

Реактивні об’єкти є [JavaScript проксі](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) і поводяться так само, як звичайні об’єкти. Різниця полягає в тому, що Vue може відстежувати доступ до властивостей та мутацій реактивного об’єкта. Якщо вас цікавлять подробиці, ми пояснюємо, як працює реактивна система Vue в розділі [Реактивність поглиблено](/guide/extras/reactivity-in-depth), але ми рекомендуємо прочитати його після того, як ви закінчите вивченя основних розділів гіду.

Також до вашої уваги: [Типізована `reactive()`](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

Щоб використовувати реактивний стан у шаблоні компонента, оголосіть та поверніть їх із функції `setup()` компонента:

```js{5,9-11}
import { reactive } from 'vue'

export default {
  // `setup` — це спеціальний хук, призначений для композиційного API.
  setup() {
    const state = reactive({ count: 0 })

    // виділення стану до шаблону
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```

Подібним чином ми можемо оголосити функції, які змінюють реактивний стан у тій самій області видимості та виділити їх як метод таким самим чином:

```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // не забудьте виділити функцію так само.
    return {
      state,
      increment
    }
  }
}
```

Виділені методи зазвичай використовуються як слухачі подій:

```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### `<script setup>` \*\* {#script-setup}

Виділення стану та методів вручну за допомогою `setup()` може бути надлишковим. На щастя, це необхідно лише тоді, коли не використовується крок збірки. При використанні однофайлових компонентів (SFC) ми можемо значно спростити використання за допомогою `<script setup>`:

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpNjkEKgzAURK8yZFNF0K5FS3uPbGyIEKo/If64Cbl7fxWky2HePCarVwjtnqzq1bCZ6AJjs5zCQ5Nbg4+MjGgnw263KJijX3ET/qZJk/G0Cc8TW4wXVmUYn4h73FHqHzcnksYTHJloV0tc1ciacG7bA28aTUXT0J035IAEtmtYBJEEDO/ELJanWZz5jFpdOq0OAMj5X4kiQtl151CYobuMqnwBBoFaVA==)

Імпорти верхнього рівня та змінні, оголошені в `<script setup>`, автоматично доступні для використання в шаблоні того самого компонента.

> У решті гіду ми будемо в основному використовувати синтаксис SFC + `<script setup>` для прикладів коду композиційного API, оскільки це найпоширеніше використання для розробників Vue.

</div>

<div class="options-api">

## Оголошення методів \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Free Vue.js Methods Lesson"/>

Щоб додати методи до екземпляра компонента, ми використовуємо опцію `methods`. Це має бути об’єкт, що містить потрібні методи:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // методи можна викликати в хуках життєвого циклу або інших методах!
    this.increment()
  }
}
```

Vue автоматично прив’язує значення `this` для `methods`, щоб воно завжди вказувало на екземпляр компонента. Це гарантує, що метод зберігає правильне значення this, якщо він використовується як слухач подій або функція зворотнього виклику. Вам слід уникати використання стрілочних функцій під час визначення `methods`, оскільки це заважає Vue зв’язати відповідне значення `this`:

```js
export default {
  methods: {
    increment: () => {
      // ПОГАНО: немає доступу до `this`!
    }
  }
}
```

Подібно до всіх інших властивостей екземпляра компонента, `methods` доступні у шаблоні компонента. Усередині шаблону вони найчастіше використовуються як слухачі подій:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNplj9EKwyAMRX8l+LSx0e65uLL9hy+dZlTWqtg4BuK/z1baDgZicsPJgUR2d656B2QN45P02lErDH6c9QQKn10YCKIwAKqj7nAsPYBHCt6sCUDaYKiBS8lpLuk8/yNSb9XUrKg20uOIhnYXAPV6qhbF6fRvmOeodn6hfzwLKkx+vN5OyIFwdENHmBMAfwQia+AmBy1fV8E2gWBtjOUASInXBcxLvN4MLH0BCe1i4Q==)

У наведеному вище прикладі метод `increment` буде викликаний, коли буде натиснуто `<button>`.

</div>

### Час оновлення DOM {#dom-update-timing}

Коли ви змінюєте реактивний стан, DOM оновлюється автоматично. Однак слід зазначити, що оновлення DOM не відбувається синхронно. Натомість Vue буферизує їх до «наступного тіку» в циклі оновлення, щоб гарантувати, що кожен компонент буде оновлено лише один раз, незалежно від того, скільки змін стану ви зробили.

Щоб дочекатися завершення оновлення DOM після зміни стану, ви можете скористатися [nextTick()](/api/general#nexttick) з глобального API:

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // доступ до оновленої DOM
  })
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // доступ до оновленої DOM
      })
    }
  }
}
```

</div>

### Глибока Реактивність {#deep-reactivity}

У Vue за замовчуванням стан є глибоко реактивним. Це означає, що ви можете очікувати, що зміни будуть виявлені, навіть коли ви змінюєте вкладені об’єкти або масиви:

<div class="options-api">

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // це працюватиме, як очікується
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

```js
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // це працюватиме, як очікується
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

Також можна явно створити [неглибокі реактивні об’єкти](/api/reactivity-advanced#shallowreactive), де реактивність існує лише на кореневому рівні, однак вони зазвичай потрібні лише в особливих випадках.

<div class="composition-api">

### Реактивний проксі та оригінальний \*\* {#reactive-proxy-vs-original-1}

Важливо зауважити, що значення, яке повертає `reactive()`, є [проксі](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) оригінального об'єкту, який не є вихідним об'єктом:

```js
const raw = {}
const proxy = reactive(raw)

// проксі не є вихідним об'єктом.
console.log(proxy === raw) // false
```

Реактивним є лише проксі – зміна вихідного об’єкта не призведе до оновлення. Тому найкраща практика під час роботи з реактивною системою Vue — **використовувати виключно проксі-версії вашого стану**.

Щоб забезпечити послідовний доступ до проксі, виклик `reactive()` для того самого об’єкта завжди повертає той самий проксі, а виклик `reactive()` для існуючого проксі також повертає той самий проксі:

```js
// виклик reactive() для того самого об’єкта повертає той самий проксі
console.log(reactive(raw) === proxy) // true

// виклик reactive() для проксі повертає сам себе
console.log(reactive(proxy) === proxy) // true
```

Це правило також стосується вкладених об’єктів. Через глибоку реактивність вкладені об’єкти всередині реактивного об’єкта також є проксі:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Обмеження `reactive()` \*\* {#limitations-of-reactive}

`reactive()` API має два обмеження:

1. Він працює лише для типів об’єктів (об’єктів, масивів і [типів колекцій](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections), таких як `Map` і ` Set`). Він не може містити [примітивні типи](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), такі як `string`, `number` або `boolean`.

2. Оскільки відстеження реактивності у Vue працює через доступ до властивостей, ми повинні завжди зберігати те саме посилання на реактивний об’єкт. Це означає, що ми не можемо просто «замінити» реактивний об’єкт, оскільки реактивний звязок також буде втрачено:

   ```js
   let state = reactive({ count: 0 })

   // наведене вище посилання ({ count: 0 })
   // більше не відстежується (реактивне з’єднання втрачено!)
   state = reactive({ count: 1 })
   ```

Це також означає, що коли ми призначаємо або деструктуруємо властивість реактивного об’єкта в локальні змінні, або коли ми передаємо цю властивість у функцію, ми втратимо реактивний зв’язок:

```js
const state = reactive({ count: 0 })

// n — локальна змінна, яка не зʼєднана
// зі state.count.
let n = state.count
// не впливає на вихідний стан
n++

// count також від’єднано від state.count.
let { count } = state
// не впливає на вихідний стан
count++

// функція отримує просте число і
// не зможе відстежувати зміни в state.count
callSomeFunction(state.count)
```

## Реактивні змінні використовуючи `ref()` \*\* {#reactive-variables-with-ref}

Щоб усунути обмеження `reactive()`, Vue також надає функцію [`ref()`](/api/reactivity-core#ref), яка дозволяє нам створювати реактивні **"обʼєкти-референції"**, які можуть зберігати будь-який тип значень:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` приймає аргумент і повертає його загорнутим в об’єкт-рефернцію із властивістю `.value`:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

Також до вашої уваги: [Типізована ref()](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

Подібно до властивостей реактивного об’єкта, властивість `.value` є реактивною. Крім того, коли у ній зберігаються значення з типом об’єкта, обʼєкт-рефернція автоматично перетворює `.value` за допомогою `reactive()`.

Обʼєкт-рефернція, що містить значення об’єкта, може реактивно замінити весь об’єкт:

```js
const objectRef = ref({ count: 0 })

// це працює реактивно
objectRef.value = { count: 1 }
```

Обʼєкт-рефернцію також можна передати у функції або деструктурувати з простих об’єктів без втрати реактивності:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// функція отримує обʼєкт-рефернцію
// їй потрібно отримати доступ до значення через .value, але це
// збереже зв'язок реактивності
callSomeFunction(obj.foo)

// все ще реактивний
const { foo, bar } = obj
```

Іншими словами, `ref()` дозволяє нам створити "референцію" на будь-яке значення та передавати його без втрати реактивності. Ця можливість є досить важливою, оскільки вона часто використовується під час виділення логіки в [Композиційні Функції](/guide/reusability/composables).

### "Розгортання" обєктів-референцій у шаблонах \*\* {#ref-unwrapping-in-templates}

Коли обєкти-референції доступні як властивості верхнього рівня в шаблоні, вони автоматично "розгортаються", тому немає необхідності використовувати `.value`. Ось попередній приклад лічильника, в якому використовується `ref()`:

```vue{13}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- .value не потрібна -->
  </button>
</template>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNo9jUEKgzAQRa8yZKMiaNclSnuP2dgwQqiZhDhxE3L3Riwu//DmvazeIQxHIvVUejfRBoGdJIUZ2brgo0CGSCsUWKN30FS0QUY2nncB4xMLTCfRPrrzviY2Yj2DZRPJEUvbQUaGix2OZUvU98gFWY9XsbbqEHJhW4TqAtCfJFItL7NZ851Q3TpUc87/cCl6vMD6pMfboMoPvd1Nzg==)

Зауважте, що розгортання застосовується, лише якщо обєкт-референція є властивістю верхнього рівня в контексті візуалізації шаблону. Наприклад, `object` є властивістю верхнього рівня, а `object.foo` - ні.

Наприклад, в нас є такий обʼєкт:

```js
const object = { foo: ref(1) }
```

Наступний вираз **НЕ** працюватиме належним чином:

```vue-html
{{ object.foo + 1 }}
```

Відображеним результатом буде `[object Object]1`, тому що `object.foo` є об'єктом-референцією. Ми можемо виправити це, зробивши `foo` властивістю верхнього рівня:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

Тепер результат буде «2».

Одна річ, яку слід зазначити, полягає в тому, що обʼєкт-референцію також буде розгорнуто, якщо це остаточне обчислене значення текстової інтерполяції (наприклад тег <code v-pre>{{ }}</code>), тому наступне буде відображати `1 `:

```vue-html
{{ object.foo }}
```

Це лише зручна функція інтерполяції тексту яка еквівалентна <code v-pre>{{ object.foo.value }}</code>.

### "Розгортання" обєктів-референцій у реактивних обʼєктах \*\* {#ref-unwrapping-in-reactive-objects}

Коли `ref` використовується або змінюється як властивість реактивного об’єкта, він також автоматично розгортається, тому поводиться як звичайна властивість:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

Якщо новий обʼєкт-референція призначається властивості існуючого обʼєкта-референції, то, він замінить старий обʼєкт-рефренцію:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// вихідний обʼєкт-референцію тепер відʼєднано від state.count
console.log(count.value) // 1
```

Розгортання обєктів-референцій відбувається лише тоді, коли вони вкладені в глибоко реактивний об’єкт. Це не відбувається, коли до них звертаються як до властивості [неглибоко реактивного обʼєкту](/api/reactivity-advanced#shallowreactive).

#### "Розгортання" обєктів-референцій у масивах та колекціях {#ref-unwrapping-in-arrays-and-collections}

На відміну від реактивних об’єктів, розгортання не виконується, коли обєкта-референція використовується як елемент реактивного масиву або нативного типу колекції, наприклад значення з типом `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// потрібно використовувати .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// потрібно використовувати .value
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Методи з використанням стану \* {#stateful-methods}

У деяких випадках нам може знадобитися динамічно створювати метод, наприклад, створюючи відкладений обробник подій:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Відкладений за допомогою Lodash
    click: debounce(function () {
      // ... реакція на клік ...
    }, 500)
  }
}
```

Однак цей підхід є проблематичним для компонентів, які повторно використовуються, тому що відкладена функція має **стан**: вона підтримує деякий внутрішній стан протягом часу. Якщо кілька екземплярів компонентів використовують одну й ту саму відкладену функцію, вони заважатимуть один одному.

Щоб підтримувати незалежність відкладених функцій кожного екземпляра компонента, ми можемо створити відкладену функцію в хуку `created` життєвого циклу компонента:

```js
export default {
  created() {
    // кожен екземпляр тепер має свою власну копію відкладеного обробника
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // також гарна ідея скасувати таймер
    // коли компонент буде демонтовано
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... реакція на клік ...
    }
  }
}
```

</div>
