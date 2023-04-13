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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpdTs1qAjEQfpUhlyioe5e10AfoEzQ9LHa2BHazIRmlEAK150Lx7M0n8OLFg8+QfSNnXf/wMAzfzPcXxKu1k+UCxVTkfu60JfBIC/uijK5t4wgCOCwhQumaGiRTpTLKzBvjCWzh0NAbel98Icw65kCmddq1v+1fOqSjHF6pmrD2F8p7gLrXTEGmTdq3q/ZfQhxx2MNjyz4/PCt+fbBRnvUNuRsD9rNVQdghyisNy3HZuJkSgy5qBNp84veQVx+tBBMBFIXwVDtGGANfz4I7YtHkUoaP55Cs0mySZ7doEU9+gnqE)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNpVTs2KwjAQfpUhlypUey/dhX2AfYLNHsJ2XAI1hnQqQgisexbEszefwIsXDz5D+kZOqiiG/H0z8/148WHtdNmhKEXV/jht6V0aXNmFI6hxprqGwEsDUCtSo/HtL8khdc4kJAl4WeXQ0Ce2rfrFErK4i8f+v9/Ec7xkeeIkliactyV8eZg/J/fx1K/7bQYhh5fGgSX++Ky59X2zDcmPL95V8YjLgIVtowgToqrRsJzMFu5NilHyzEGbGldjfmDIIAUPJkHvX6NDCDABrg6EJ2LS9B6Ni4NJ0WgWqYqHtQhXi/1+Hw==)

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

[Спробуйте в пісочниці](https://play.vuejs.org/#eNo9T8Fqg0AQ/ZXBiwloFA+lyKaQL+itp70YsyHbruuiozSI0PbQY3+loVAIQtJfWP+ooxIXdmfeznsz8xpnY8yqroQTO6xMC2kQSoGVeeBaZiYvEBooRJKirAW0sC/yDFziu1xznea6RMiOj9tnkSKsZ+ai4RoAJSoRg2u/bQf9e/9hf+y1f+u/KJ4InenT/tkzvR0Be7EneKLW3iBOKjzkxaD+HOj2ArfE/tLt7HXimWqrZHkQuw0SOQqjyA/v/fCOFmyXXLNgckV+CKDIjEpQDAhZpSgCHaYk1P4+L9bcWdSJqoQHL+LogdQ78bqkMJvkzqjlCNA0Ux3adjUAUlAaD+nYg8BEZYGS4yQWjCNZMO/htP/n8Ztv)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://play.vuejs.org/#eNo9UMFqwzAM/RWRS1pompDDGMEb9At228mXtFFpNjcJqRxaQmDbYcf9yspgUALtfsH5o8kJibEtPflJelbtrIpiWWl0IkccNmVa0KPM8FjkJUGC21grglpmAElM8Ww++JJKJF1mFkkCXvvT0/oFNxSNBBuklBRG4Jpv00L33n2YH3Pr3rovtmdGFw6aP3Phu2VgruYMzxrdxVgVINa0y0tb49MmmSuMjvnl05qbZQ9cSYVeq/Sww2TFQtwwCEMvuPeCO3egSGoGcWz6i7fwp18zINwXKia0iIRWbG2iUClU3jYvH6Qzq2KlcQGveFpAmiV4nLOZBiCdPtfqr+vhHZpmaQFnsMsTqqGvwWCgCl+lfSfh9y2FP+lwmn9HIKKa)

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
**Не** рекомендується використовувати `v-if` та `v-for` на тому ж самому елементі у зв'язку з їх неявними пріоритетами. Зверніться до [гіда по стилях](/style-guide/rules-essential#avoid-v-if-with-v-for) для деталей.
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
Атрибут `key` тут є спеціальним атрибутом, пов'язаним з `v-bind`. Його не слід плутати зі змінним ключем властивості при [використанні `v-for` з об'єктами](#v-for-with-an-object).
:::

[Рекомендовано](/style-guide/rules-essential#use-keyed-v-for) вказувати атрибут `key` разом з `v-for` коли це можливо, якщо ітерований вміст DOM не простий (тобто не містить компонентів або елементів DOM зі збереженням стану), або ви навмисно покладаєтеся на поведінку за замовчуванням для підвищення продуктивності.

Прив'язування атрибута `key` передбачає примітивні значення, наприклад, рядкові або числові величини. Не використовуйте об'єкти у якості ключів для `v-for`. Докладніше про використання атрибута `key` дивіться [АРІ документацію для `key`](/api/built-in-special-attributes#key).

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

Перегляньте [цей приклад простого списку завдань](https://play.vuejs.org/#eNp1VM1O3DAQfpVRVClZsSTQn0sIiB4qtZeqB26kh2XjLRaJbSXOsmi1EiqX3pCqqre2r7ACJNDy01dw3qhjO2YDhcvGnm/8zTfjzzv13goRjmvixV5SDUsqJFRE1mIrZbQQvJQwhZKMYAajkhfgY6p/D+3wjH+QpGixMHIBzYhpACkbclZJYORQYztkImFTEwa+33OgRKRqw7v61FT/ANAshvW+XUsqcxKDr36ri+ZUnavb5qT5qq6g+abm6q9aNCem4MzkdwhePib4o+7Ujbqyh4+bE7XAhboEHVTXGnya6NVTRBfqUp3h97YlRJK5uml+WoqUfcYmU5YTPYGJNOPJsNPXOjqq2VBSzmCQZR/tfIKerWgmEo4HeU1CUVf7QUfHkmhl5aGkzpDtWSMCFcD/EIrwUSRKTCJ773jjuMHLE/lAEr2TyYiXBYxXOYureq+gMhQlGRMmN1NvKTr1MFnLSPLBHskBDyGOFVd1G4iqH2ZSczuhS5zQmd7i0G6b0yQypxwFZaKWdg1YueAZyS2b0596DqbZgzouXMmjnCBySDO5jwZYWxOTDSgG5RfKYngjJstUbHVI9nmeES1Z/dJWao7RBwt0wlxdxPAeP+daPhrlzLWwUHe4mDueyInfq6Xk7EG/SdQGdUoS6YHaZX3fsla/SnHwy7btCAON9IGyjEx6+LG2WKqPD8gRpuloSLNO3PjBIWazBLdLUvCxQ6uwEjkdksAU6cN6z2VuJdG9sFa8kYxhZxGv73Uf/BN/IRkZUUY+lVxUwa5vlPj6Sdj4O3SUjltFBnjWjNpdtJ3YdGodDzO0b2fwsD3EXg6wtRcEqQNHjD1tqe94q9p01/alProXw91pzZQ3RjIJOXX/BB0bbbRvHDWbRG/2DxEQBuc=), щоб побачити, як показувати список компонентів за допомогою `v-for`, передаючи різні дані до кожного екземпляру.

</div>
<div class="options-api">

Перегляньте [цей приклад простого списку завдань](https://play.vuejs.org/#eNqNVM1O3DAQfhUrqpRdsZtAfy4hIHprLz1xaziEjelaJLaVOMui1UqoXHpDqqre2r7CCpAWLSx9BeeNOrbjJNuWqlGkxDPjb76Z+eyZ85pzb1JiJ3DCYpQTLvYjSjLOcoEOWcLeCpyhk5xlyPV8a1Ab3IgiFFE81aEJPonLVKCZso4Y7KeYiiJAsxZlPlDOJBZxr28CEcqxKHNqVwhRfKbiD/FUBMh19Q71CDAC2nu7Ru0W9ZAkQDtNsN5ARIoBQn6Xt9WVvJHr6rL6KO9Q9Uku5E+5qi51BeYx1J4Afv534B/yUT7IOwN6UV3KFfzIJVJGea+c/5vgxdMJbuVSXsN3XScC8IV8qL52oe3vUQMDUxG67QD+0hh1lGGRYTFmiZqNccVJ8s60vZ0L0BiTwtNt93hZjHsd1oqzdrd5trY6NdQV1CHNQG3AvL+RoxOB9mDmXb4RhTf0G2HCApTE01hgtRLhCcszNBkyGhTlcUaEx3M8AeXtRU5bVuRAsAIN0/gYpwg2gR/yDlV94JVfdKsXpsVLaPG1WkLX19VV6OtdFoJQXjalTIYZS3Bq0Jo6HesmyUYeay7EeYrBc0YSMQZ9bW/z6S7K4vwDoQF6xadtKJQ6wmOWJlhRlt+UdqsLENgKJLaQtwF6A58bRR8UeG1LWMlH+FlYHN+SPy6FYHSj3tCvjSok9FVDzW/ZlKzYDwk0vi3btLCnPANEaIKnffiYY9qyD07xOYQpq0eSjl0rxHr0onUe5DhjE+stvIKnZIR7OskA7fRt5H7oN8Rq8poymK1EnIHTvbI27rg/L65I8Jxxdcu4mpJrDhQGWWmj4eUe/VuUSmWk7txsZs4CmteHtB4AOhhBTadQ4jOF3rPQUNu+/AzTVeK7N0f+t/lo7E6JOr0WlA5IiT3BHTnt1mcJOOtAZ/4LvgEkMA==), щоб побачити, як показувати список компонентів за допомогою `v-for`, передаючи різні дані до кожного екземпляру.

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
