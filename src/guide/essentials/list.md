# Рендеринг списків {#list-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/list-rendering-in-vue-3" title="Безкоштовний урок по рендерингу списків у Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-list-rendering-in-vue" title="Безкоштовний урок по рендерингу списків у Vue.js"/>
</div>

## `v-for` {#v-for}

Ми можемо використовувати директиву `v-for` для рендерингу списку елементів, основаних на масиві. Директив `v-for` вимагає спеціального синтаксису у формі `item in items`, де `items` — вихідний масив і `item` є **псевдонімом** ітерованого елемента масиву:

<div class="composition-api">

```js
const items = ref([{ message: 'Леся' }, { message: 'Тарас' }])
```

</div>

<div class="options-api">

```js
data() {
  return {
    items: [{ message: 'Леся' }, { message: 'Тарас' }]
  }
}
```

</div>

```vue-html
<li v-for="item in items">
  {{ item.message }}
</li>
```

Всередині області `v-for`, вирази шаблону мають доступ до всіх батьківських властивостей. Крім цього, `v-for` також підтримує необов'язковий другий псевдонім для індексу поточного елемента масиву:

<div class="composition-api">

```js
const parentMessage = ref('Батько')
const items = ref([{ message: 'Леся' }, { message: 'Тарас' }])
```

</div>
<div class="options-api">

```js
data() {
  return {
    parentMessage: 'Батько',
    items: [{ message: 'Леся' }, { message: 'Тарас' }]
  }
}
```

</div>

```vue-html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

<script setup>
const parentMessage = 'Батько'
const items = [{ message: 'Леся' }, { message: 'Тарас' }]
</script>
<div class="demo">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</div>

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UEtOwzAQvcrIm7RSEu+jFIkDcALMIrST4qr+yHYLUhSJskZCrNlxAjZsWHCG5EaMkwBVkVhY9rx58974Nezc2ny/Q1aw0i+dtAE8hp09E1oqa1yABhzW0ELtjIKEqInQQi+N9gFs5VCHC/S+WiMsInOWdM/dW//QP3Yf3Wcy/6bKgMpPlMsG1DhTQNK9dO/9oX9KoE3J7KjxSjr3dA7UuiKhko8b0m5UkJ7dVgFjFcqthH1WG7cQbBatUpB6hXdzukZrwYgIIELTnKzdtpABocPAb0VD+bQMgYMJ30oSKfmPNUvZmFKmKptvvNGUYzP4TA3yLWBAIkbpxVqwmxCsLzj39TKmv/G5cWtOr9ztdJAKc/Qqu3bm1qMjYcHSIw1O4B5dRr9YoUP3n+YJ9Y9ulKXftaz9AgXXwOk=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UUtOwzAQvcrIm7ZSPvsoIHEAToBZmGZaXCWOZTulUhSJskZCrNlxAjZsWHCG5EbMNKVVQWqUxH7zeW/83Iora5N1gyITuZ87bcOlNLixtQtQ4EI1ZYBWGoBCBTWdjXsZHIbGGUYyAD1WOTThGr1XS8xg0r/2H8PT8Nx/9d+TiHu4SwesfAY3LVTHyrf+c9gOLxPoIjhJvBPFI31bSt2Osh3r0Y/ePD2MS4CIbakCMgp5qWEdL2p3IcWUNSPQpsDNjBbYzSAFFTJh256ODl0HMVB013BE1JTsR6PgTiQtNZHk6UFaREJXbFxcKZusfG3I1NGvfYJ0s9FBjpHrjKW4D8H6LE39Ys5XsfJJ7ZYp7RLXmKArTNBX8Z2rHzw6Ipbi11HmSCm4RhfTKQp06M5x/in9x8u0bK/ofgDvWcSE)

</div>

Область видимості `v-for` схожа до наступного JavaScript:

```js
const parentMessage = 'Батько'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // має доступ до зовнішнього `parentMessage`
  // але `item` та `index` доступні лише тут
  console.log(parentMessage, item.message, index)
})
```

Зверніть увагу на те, як значення для `v-for` співпадає з сигнатурою колбек-функції для `forEach`. Насправді ви можете використовувати деструктуризацію псевдоніму елементу в `v-for`, аналогічно до деструктуризації аргументів функції:

```vue-html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- з індексним псевдонімом  -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

Для вкладених `v-for`, область видимості працює подібно до вкладених функцій. Кожна область `v-for` має доступ до батьківських областей видимості:

```vue-html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

Ви також можете використовувати `of` як роздільник замість `in`, наближено до синтаксису ітераторів JavaScript:

```vue-html
<div v-for="item of items"></div>
```

## `v-for` з об'єктами {#v-for-with-an-object}

Ви також можете використовувати `v-for` для ітерування властивостей об'єкту. Порядок ітерації оснований на результаті виклику `Object.keys()` на об'єкті:

<div class="composition-api">

```js
const myObject = reactive({
  title: 'Як створювати списки на Vue',
  author: 'Іван Іваненко',
  publishedAt: '2022-08-06'
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    myObject: {
      title: 'Як створювати списки на Vue',
      author: 'Іван Іваненко',
      publishedAt: '2022-08-06'
    }
  }
}
```

</div>

```vue-html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

Ви також можете використовувати другий псевдонімо для назви властивості (що також називають ключем):

```vue-html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

І ще один для індексу:

```vue-html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UcFKw0AQ/ZVhL1VoktKDSImCX+DN017SOLVbk82yO4lKCKgHj/6KIghSsP7C9o+cTWoPCgayM2/3zdt5s604MyZuahQzkbrcKkPgkGpzKrUqTWUJWrCY5aQahA4WtiphxPyR1FLnlXYE5d35fIU5wcmeedBKDUCKCpzByL/4NWwfto/+zW+299tnjq+MPnjTf/kPXtcM/Kd/hQuWHofirKZlZUP1U6D7T/hJ/Dv/a78ZeKaeF8ot8fKMmDydTKfR5DiaHHGD3aHUaTK4Yj8MCEtTZIQBUVoXHIG/tFDQRIvKnkhx0GRFjWO4xrsxKH2Jt4cc9ial6GslAbTtcA5dFwfAFZzOQtprMBioaVKo/qY06a9Mk30fYiyGMUdlZuKVqzQ/RD88uTtwUrDk0KcUPPmApVgSGTdLErfIw/OtXFzZq4Sz2NaaVIkxujKa2+rGoWVhKfpp7TQS3mzQRhbZgEX7n+Yv6h/dIMtGO9F9A4sl4dQ=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UUtqwzAQvYrQJgn4E7IoxbiFnKC7rrRx4knj1D+kkZtgDG0XXfYqDYVCCCS9gnyjjuwkixZqLM280czT6E3Np2XpVRp4wEM1l0mJtyKHdVlIZDEsIp0iq0XOWBxhNBz1vkAJqGVukUBGX7a5m61gjsE5wQYxwRQCNjAfZs/al/bVfJpj+9y+k90S2lHQfJsd7XsC5mC27F7DwDmzMhZpXBbScrzZInNgZ8d80dqbo83ucwWWepYmagnxlBoZTMaTiTu+dsdXgz5FYNM3R6bb6A/9y6sJIGRlGiFYhKFOydrCME1Y5S4KeSP4sIpSDQ57hI3DkjyG9YjMRQDBu1rbf13356xpPAuoglxSqGYdB4E+NfTTpLsp9LsrQ//SB3d4ktlhuFlUeitV5DSoXuLTgRL8JLqN0SQtFnyJWKrA99Vibse7Ul4hH3zyPKlzTDLwQGXuTBZPCiQRC37SsePwKViBdCXQAyTI/zh/pf7htbRWa978AJm46P8=)

</div>

## `v-for` з діапазонами {#v-for-with-a-range}

Директива `v-for` також може приймати число. У такому випадку вона буде повторювати шаблон відповідно до діапазону `1...n` кількість разів.

```vue-html
<span v-for="n in 10">{{ n }}</span>
```

Зауважте, що `n` починається з `1`, а не з `0`.

## `v-for` в `<template>` {#v-for-on-template}

Схоже до `v-if`, ви можете також використовувати елемент `<template>` з `v-for` для рендерингу блоку з множинними елементами. Для прикладу:

```vue-html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` з `v-if` {#v-for-with-v-if}

:::warning Примітка
**Не** рекомендується використовувати `v-if` та `v-for` на тому ж самому елементі у зв'язку з їх неявними пріоритетами. Зверніться до [гіда по стилях](/style-guide/rules-essential.html#уникайте-v-if-з-v-for) для деталей.
:::

Якщо вони співіснують на одному й тому ж вузлі, `v-if` має вищий пріоритет, аніж `v-for`. Це означає, що умова `v-if` не матиме доступу до змінних з області видимості `v-for`: 

```vue-html
<!--
Це видасть помилку, оскільки властивість "todo"
не існує в екземплярі компонента.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

Це можна виправити, перемістивши `v-for` в обгортаючий тег `<template>` (що також є більш очевидним):

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## Підтримка стану за допомогою `key` {#maintaining-state-with-key}

Коли Vue оновлює список елементів при рендері за допомогою `v-for`, за замовчуванням використовується стратегія "заміна на місці". Якщо порядок елементів змінився, замість того, щоб переставляти елементи DOM відповідно до нового порядку елементів, Vue замінить кожен елемент на місці, переконавшись, що показується те, що має бути показано за тим чи іншим конкретним індексом.

Цей режим по замовчуванню є дієвим, але **він лише підходить для ситуацій, коли вихідний результат рендеру списку не залежить від стану дочірнього компонента чи тимчасового стану DOM (як-от значення елементів форми)**. 

Щоб підказати Vue, щоб він міг відстежувати ідентичність кожного вузла і таким чином повторно використовувати та змінювати порядок наявних елементів, вам потрібно надати унікальний `key` атрибут для кожного елементу списку:   

```vue-html
<div v-for="item in items" :key="item.id">
  <!-- вміст -->
</div>
```

Якщо використовується `<template v-for>`, тоді `key` слід розмістити в контейнері `<template>`:

```vue-html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

:::tip Примітка
Атрибут `key` тут є спеціальним атрибутом, пов'язаним з `v-bind`. Його не слід плутати зі змінним ключем властивості при [використанні `v-for` з об'єктами](#v-for-з-об'єктами).
:::

[Рекомендовано](/style-guide/rules-essential.html#use-keyed-v-for) вказувати атрибут `key` разом з `v-for` коли це можливо, якщо ітерований вміст DOM не простий (тобто не містить компонентів або елементів DOM зі збереженням стану), або ви навмисно покладаєтеся на поведінку за замовчуванням для підвищення продуктивності.

Прив'язування атрибута `key` передбачає примітивні значення, наприклад, рядкові або числові величини. Не використовуйте об'єкти у якості ключів для `v-for`. Докладніше про використання атрибута `key` дивіться [АРІ документацію для `key`](/api/built-in-special-attributes.html#key).

## `v-for` з компонентом {#v-for-with-a-component}

> Цей розділ передбачає знання [компонентів](/guide/essentials/component-basics). Ви можете його пропустити та повернутися пізніше.

Ви можете безпосередньо використовувати `v-for` для компонента, як і будь-який звичайний елемент (не забудьте вказати `key`):

```vue-html
<MyComponent v-for="item in items" :key="item.id" />
```

Однак це не призведе до автоматичної передачі даних компоненту, оскільки компоненти мають власні ізольовані області. Щоб передати ітеровані дані в компонент, ми також повинні використовувати властивості:

```vue-html
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

Причина автоматичного введення `item` у компонент полягає в тому, що це робить компонент тісно пов'язаним із тим, як працює `v-for`. Якщо чітко вказати, звідки надходять дані, цей компонент можна повторно використовувати в інших ситуаціях.

<div class="composition-api">

Перегляньте [цей приклад простого списку завдань](https://sfc.vuejs.org/#eNp9VE1P2zAY/itWNCmtaBPYxyUExA6Ttsu0AzeyQ9u41JDYke2UoqoSGpfdkKZpt21/oQIkUPnYX3D+0V7bMQ3Q7ZLY7/P68fN+eeq9LYpgXGIv8mIx4KSQSGBZFtsJJXnBuERTxPEQzdCQsxz54Oo/QLssZR8kzmssCJ1BM4IbQgkdMCokovhIY7t4ItGWJmz5ftuBEhBRm/f0qan+IETSCG107FoSmeEI+eqXuqzO1IW6q06rL+oaVV/VXP1Ri+rUXDgz/g2Cl08Jfqt7dauu7eGT6lQtYKGukDaqGw2uJnq1iuhSXalz+N/VhEAyV7fVD0uR0M8QZEIzrDMwkSY9KUT6WluHJR1IwijqpelHm59W295oMhKMe1mJg6IUo1ZDx5Jobe2xpEaS7VkjAhSg5xCI8EEkSIxDW3eoOGygeEXWk1jvZDxkPEfjLqORKPs5kUHB8RhTuZV4S9GJB85aRpz1+jhDcAhwuLGrwwBUfTeZmtsMXUGGzvUWknZXncWhOeUoCC1KadcIbs5ZijPL5vQnnoNJ+ugeZxbyOMOAHJFUjqAB1teLySbKe3yf0Ai9KSZLVwh1gEcsS7GWrH7qVqpOoA8W0AlzdRmh9/C70PKhUc5dCAt1D4u54wmd+H4pJaOP4o3D2qhd4lAn1C7Lh5C1+i6BxC/DtilsaaSDCE3xpA0/2xZL9dEhPgY3bQ1I2rCbfnCI2SzBHY5zNnaoCESRkQFumUs6aKPtPLfj8EFYLd5IBrNrEa/j2Yegm/eK4EAwCq+I6dSkBkBs5GYo8eBR0PvEG0lZiCgMxXCgX4oDETC+H8Iq4CWVJMcBFnm3z9mRwByIE69udMMRgnGMeZdj0Mwx/x/nE9dnvPWYziCU5tu14jVM8ZBQ/ImzQrT2fJNUX0+3tb+D4dB2m1wD/HOu9KCQuvjTqR1eNAMVjR5COwMoyyFU6QUG6pYjhvJsq2/QoHp+buyj86TFDHejSuZ6MxPGISOuII2J2KzzAJqNozf7C+BpTUw=), щоб побачити, як показувати список компонентів за допомогою `v-for`, передаючи різні дані до кожного екземпляру.

</div>
<div class="options-api">

Перегляньте [цей приклад простого списку завдань](https://sfc.vuejs.org/#eNqNVM1O20AQfpWVVSlBTWzoz8UYRG/tpSdumIMTb8iCvWut1yEoioTKpTekquqt7StEgAQKP32F9Rt1dtdrO1BQo0jenZn95pvfmfMhy9xJgR3fCfIhJ5nYDilJM8YF2mUx+yRwikacpajjelagHnRCilBI8VSbxngUFYlAMyUdMnhPMRW5j2YNyrynlHEkou6aMUSIY1Fwam8IUXys7HfxVPio09Ev1E+AEND27B01T9SPxD7aqI31AyISDBDyl7wqz+WlvC/Pyi/yBpVf5UL+kcvyTEdgfobaM8Bv/g38Wz7IO3ljQE/LM7mEg7xGSihvlfJ/Hbx93sGVvJYX8L2vHAH4Qt6VP9rQ9rhfw0BVhE47gL8zQm1lWKRYjFmsamNUURx/Nmlv6gI0xiR3ddrdrMjH3RZrxVmrGz+vX7diqCKoTOqCWoP52oqPlgXagpq3+YYU/oFXNyZcoJOyJBJY3UQwYjxFkz6jfl4MUiLcjOMJdN5W6DRhhQ4YK9AgiQY4QfAI9OC3r+IDrfyuU70wKb6GFF+oK2T9vjwPPP3KQhCaFXUok37KYpwYtDpOx6pJvOLHinNxkmDQHJNYjKG/1tez6SZKI35AqI/eZ9PGFEId4jFLYqwoy5+qd8tTaLAltNhCXvnoI3wuFX3owAsbwlI+wGFhcTxLflAIwehKvIFXCZVJ4KmEmmNRh6zY9wkkvgnbpLCrND1EaIyna/AxY9qw94/wCZgpqUvillx3iNXoS6Pc4ThlE6vN3TxLyBB3tZMe2lizltuBVxOryGvKILYt4vQcs8r6aZS5hzmjsOZ0I4eVAsjWcxA6sNbUPXTGQmS573n5aKh23WHuMn7gwcnlBRUkxS7O0/6As+MccwAOnar9NYYHwgnmfY6BM8f8JcxHpk9w7RhAKO3tu7Kun+7gUGScgTe019HZ7ZjdgGFCtNCkuLP/8nypgSFVE8xmZqzRvNo3VS+hnSGU5wiq9Uqhdy00lGlbfoNGVXN0a7bXo1bT2K1qafd6NrRBQmxhWpOxWeUDOGtDZ/4X0U9qlQ==), щоб побачити, як показувати список компонентів за допомогою `v-for`, передаючи різні дані до кожного екземпляру.

</div>

## Виявлення зміни масиву {#array-change-detection}

### Методи мутації {#mutation-methods}

Vue здатний виявляти, коли викликаються методи мутації реактивного масиву, і запускати необхідні оновлення. Цими методами мутації є:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

### Заміна масиву {#replacing-an-array}

Методи мутації, як випливає з назви, змінюють вихідний масив, який вони викликають. Для порівняння існують також не мутуючі методи, як-от, `filter()`, `concat()` і `slice()`, які не змінюють вихідний масив, але **завжди повертають новий масив**. При роботі з не мутуючими методами ми повинні замінити старий масив на новий:

<div class="composition-api">

```js
// `items` є референцією на значення масиву
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

</div>
<div class="options-api">

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

</div>

Ви можете подумати, що це змусить Vue викинути наявний DOM і повторно відрендерити весь список - на щастя, це не так. Vue реалізує деякі розумні евристики для максимального повторного використання елементів DOM, тому заміна масиву іншим масивом, який містить об'єкти, що збігаються, є дуже ефективною операцією.

## Показ відфільтрованих/відсортованих результатів {#displaying-filtered-sorted-results}

Іноді ми хочемо відобразити відфільтровану або відсортовану версію масиву без фактичної зміни або скидання вихідних даних. У цьому випадку ви можете створити обчислювану властивість, яка повертає відфільтрований або відсортований масив.

Для прикладу:

<div class="composition-api">

```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    numbers: [1, 2, 3, 4, 5]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(n => n % 2 === 0)
  }
}
```

</div>

```vue-html
<li v-for="n in evenNumbers">{{ n }}</li>
```

У ситуаціях, коли обчислювані властивості не підходять (наприклад, усередині вкладених циклів `v-for`), ви можете використати метод:

<div class="composition-api">

```js
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}
```

</div>
<div class="options-api">

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

</div>

```vue-html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

Будьте обережні з `reverse()` і `sort()` в обчислюваній властивості! Ці два методи видозмінять вихідний масив, чого слід уникати в обчислюваних гетерах. Створіть копію оригінального масиву перед викликом цих методів:

```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```
