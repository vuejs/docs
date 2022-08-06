# Рендеринг списків

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/list-rendering-in-vue-3" title="Безкоштовний урок по рендерингу списків у Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-list-rendering-in-vue" title="Безкоштовний урок по рендерингу списків у Vue.js"/>
</div>

## `v-for`

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

## `v-for` with an Object

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

## `v-for` з діапазонами

Директива `v-for` також може приймати число. У такому випадку вона буде повторювати шаблон відповідно до діапазону `1...n` кількість разів.

```vue-html
<span v-for="n in 10">{{ n }}</span>
```

Зауважте, що `n` починається з `1`, а не з `0`.

## `v-for` в `<template>`

Схоже до `v-if`, ви можете також використовувати елемент `<template>` з `v-for` для рендерингу блоку з множинними елементами. Для прикладу:

```vue-html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` з `v-if`

:::warning Примітка
**Не** рекомендується використовувати `v-if` та `v-for` на тому ж самому елементі у зв'язку з їх неявними пріоритетами. Зверніться до [Гіда по стилях](/style-guide/rules-essential.html#уникайте-v-if-з-v-for) для деталей.
:::

When they exist on the same node, `v-if` has a higher priority than `v-for`. That means the `v-if` condition will not have access to variables from the scope of the `v-for`:

```vue-html
<!--
This will throw an error because property "todo"
is not defined on instance.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

This can be fixed by moving `v-for` to a wrapping `<template>` tag (which is also more explicit):

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## Maintaining State with `key`

When Vue is updating a list of elements rendered with `v-for`, by default it uses an "in-place patch" strategy. If the order of the data items has changed, instead of moving the DOM elements to match the order of the items, Vue will patch each element in-place and make sure it reflects what should be rendered at that particular index.

This default mode is efficient, but **only suitable when your list render output does not rely on child component state or temporary DOM state (e.g. form input values)**.

To give Vue a hint so that it can track each node's identity, and thus reuse and reorder existing elements, you need to provide a unique `key` attribute for each item:

```vue-html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

When using `<template v-for>`, the `key` should be placed on the `<template>` container:

```vue-html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

:::tip Note
`key` here is a special attribute being bound with `v-bind`. It should not be confused with the property key variable when [using `v-for` with an object](#v-for-with-an-object).
:::

[It is recommended](/style-guide/rules-essential.html#use-keyed-v-for) to provide a `key` attribute with `v-for` whenever possible, unless the iterated DOM content is simple (i.e. contains no components or stateful DOM elements), or you are intentionally relying on the default behavior for performance gains.

The `key` binding expects primitive values - i.e. strings and numbers. Do not use objects as `v-for` keys. For detailed usage of the `key` attribute, please see the [`key` API documentation](/api/built-in-special-attributes.html#key).

## `v-for` with a Component

> This section assumes knowledge of [Components](/guide/essentials/component-basics). Feel free to skip it and come back later.

You can directly use `v-for` on a component, like any normal element (don't forget to provide a `key`):

```vue-html
<MyComponent v-for="item in items" :key="item.id" />
```

However, this won't automatically pass any data to the component, because components have isolated scopes of their own. In order to pass the iterated data into the component, we should also use props:

```vue-html
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

The reason for not automatically injecting `item` into the component is because that makes the component tightly coupled to how `v-for` works. Being explicit about where its data comes from makes the component reusable in other situations.

<div class="composition-api">

Check out [this example of a simple todo list](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5jb25zdCBuZXdUb2RvVGV4dCA9IHJlZignJylcbmNvbnN0IHRvZG9zID0gcmVmKFtcbiAge1xuICAgIGlkOiAxLFxuICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gIH1cbl0pXG5cbmxldCBuZXh0VG9kb0lkID0gNFxuXG5mdW5jdGlvbiBhZGROZXdUb2RvKCkge1xuICB0b2Rvcy52YWx1ZS5wdXNoKHtcbiAgICBpZDogbmV4dFRvZG9JZCsrLFxuICAgIHRpdGxlOiBuZXdUb2RvVGV4dC52YWx1ZVxuICB9KVxuICBuZXdUb2RvVGV4dC52YWx1ZSA9ICcnXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8Zm9ybSB2LW9uOnN1Ym1pdC5wcmV2ZW50PVwiYWRkTmV3VG9kb1wiPlxuICAgIDxsYWJlbCBmb3I9XCJuZXctdG9kb1wiPkFkZCBhIHRvZG88L2xhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgdi1tb2RlbD1cIm5ld1RvZG9UZXh0XCJcbiAgICAgIGlkPVwibmV3LXRvZG9cIlxuICAgICAgcGxhY2Vob2xkZXI9XCJFLmcuIEZlZWQgdGhlIGNhdFwiXG4gICAgLz5cbiAgICA8YnV0dG9uPkFkZDwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIDx1bD5cbiAgICA8dG9kby1pdGVtXG4gICAgICB2LWZvcj1cIih0b2RvLCBpbmRleCkgaW4gdG9kb3NcIlxuICAgICAgOmtleT1cInRvZG8uaWRcIlxuICAgICAgOnRpdGxlPVwidG9kby50aXRsZVwiXG4gICAgICBAcmVtb3ZlPVwidG9kb3Muc3BsaWNlKGluZGV4LCAxKVwiXG4gICAgPjwvdG9kby1pdGVtPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiVG9kb0l0ZW0udnVlIjoiPHNjcmlwdCBzZXR1cD5cbmRlZmluZVByb3BzKFsndGl0bGUnXSlcbmRlZmluZUVtaXRzKFsncmVtb3ZlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8bGk+XG4gICAge3sgdGl0bGUgfX1cbiAgICA8YnV0dG9uIEBjbGljaz1cIiRlbWl0KCdyZW1vdmUnKVwiPlJlbW92ZTwvYnV0dG9uPlxuICA8L2xpPlxuPC90ZW1wbGF0ZT4ifQ==) to see how to render a list of components using `v-for`, passing different data to each instance.

</div>
<div class="options-api">

Check out [this example of a simple todo list](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgVG9kb0l0ZW0gfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmV3VG9kb1RleHQ6ICcnLFxuICAgICAgdG9kb3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBuZXh0VG9kb0lkOiA0XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYWRkTmV3VG9kbygpIHtcbiAgICAgIHRoaXMudG9kb3MucHVzaCh7XG4gICAgICAgIGlkOiB0aGlzLm5leHRUb2RvSWQrKyxcbiAgICAgICAgdGl0bGU6IHRoaXMubmV3VG9kb1RleHRcbiAgICAgIH0pXG4gICAgICB0aGlzLm5ld1RvZG9UZXh0ID0gJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XCJhZGROZXdUb2RvXCI+XG4gICAgPGxhYmVsIGZvcj1cIm5ldy10b2RvXCI+QWRkIGEgdG9kbzwvbGFiZWw+XG4gICAgPGlucHV0XG4gICAgICB2LW1vZGVsPVwibmV3VG9kb1RleHRcIlxuICAgICAgaWQ9XCJuZXctdG9kb1wiXG4gICAgICBwbGFjZWhvbGRlcj1cIkUuZy4gRmVlZCB0aGUgY2F0XCJcbiAgICAvPlxuICAgIDxidXR0b24+QWRkPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgPHVsPlxuICAgIDx0b2RvLWl0ZW1cbiAgICAgIHYtZm9yPVwiKHRvZG8sIGluZGV4KSBpbiB0b2Rvc1wiXG4gICAgICA6a2V5PVwidG9kby5pZFwiXG4gICAgICA6dGl0bGU9XCJ0b2RvLnRpdGxlXCJcbiAgICAgIEByZW1vdmU9XCJ0b2Rvcy5zcGxpY2UoaW5kZXgsIDEpXCJcbiAgICA+PC90b2RvLWl0ZW0+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJUb2RvSXRlbS52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXHRwcm9wczogWyd0aXRsZSddLFxuICBlbWl0czogWydyZW1vdmUnXVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGxpPlxuICAgIHt7IHRpdGxlIH19XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCIkZW1pdCgncmVtb3ZlJylcIj5SZW1vdmU8L2J1dHRvbj5cbiAgPC9saT5cbjwvdGVtcGxhdGU+In0=) to see how to render a list of components using `v-for`, passing different data to each instance.

</div>

## Array Change Detection

### Mutation Methods

Vue is able to detect when a reactive array's mutation methods are called and trigger necessary updates. These mutation methods are:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

### Replacing an Array

Mutation methods, as the name suggests, mutate the original array they are called on. In comparison, there are also non-mutating methods, e.g. `filter()`, `concat()` and `slice()`, which do not mutate the original array but **always return a new array**. When working with non-mutating methods, we should replace the old array with the new one:

<div class="composition-api">

```js
// `items` is a ref with array value
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

</div>
<div class="options-api">

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

</div>

You might think this will cause Vue to throw away the existing DOM and re-render the entire list - luckily, that is not the case. Vue implements some smart heuristics to maximize DOM element reuse, so replacing an array with another array containing overlapping objects is a very efficient operation.

## Displaying Filtered/Sorted Results

Sometimes we want to display a filtered or sorted version of an array without actually mutating or resetting the original data. In this case, you can create a computed property that returns the filtered or sorted array.

For example:

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

In situations where computed properties are not feasible (e.g. inside nested `v-for` loops), you can use a method:

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

Be careful with `reverse()` and `sort()` in a computed property! These two methods will mutate the original array, which should be avoided in computed getters. Create a copy of the original array before calling these methods:

```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```
