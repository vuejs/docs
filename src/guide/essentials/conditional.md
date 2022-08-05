# Умовний рендеринг

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/conditional-rendering-in-vue-3" title="Безкоштовний урок по умовному рендеринг у Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue" title="Безкоштовний урок по умовному рендеринг у Vue.js"/>
</div>

<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

## `v-if`

Директива `v-if` використовується для умовного рендерингу блоку. Блок буде згенеровано лише якщо вираз у директиві повертає правдиве значення.

```vue-html
<h1 v-if="awesome">Vue — це круто!</h1>
```

## `v-else`

Ви можете використовувати директиву `v-else` для вказування "блоку інакше" для `v-if`:

```vue-html
<button @click="awesome = !awesome">Перемкнути</button>

<h1 v-if="awesome">Vue — це круто!</h1>
<h1 v-else>Ой, ні 😢</h1>
```

<div class="demo">
  <button @click="awesome = !awesome">Перемкнути</button>
  <h1 v-if="awesome">Vue — це круто!</h1>
  <h1 v-else>Ой, ні 😢</h1>
</div>

<div class="composition-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kE9KAzEUxq/ymk0VOhO6LWnRS7jKph3f2KnNH5JMuygDRcETiLiy4B0KWtQzZK7gCTyCSWewotDde1++70fetyLnWqeLEsmAMJuZQjuw6Eo94rIQWhkHKzCYQwW5UQK6wdrlkstMSetgvESrBMIwek6cKfGUS0YbUECExaHQ87HDsAGwSemcknCWzYvsesjJAdBpR05GfuO39dpv/Zvf+ff6tr7xL4w20T2UOzbtwyIp8gMi5C5KhM/1PdR3fgt+V6/30Y8Oo9N+zLUpnFsc+Sf/2oNAf4CvzeNza2H057ukR5oCEjHW6cwqGSpaxSN4+2A5GcBeiVooJu6cTJ3TdkCpzbNY7MymylzRMKWmlK4QmKIVycSopUUTwJz0fjFoEBdoEoPyEg2aY8w/1n/ciK24rEj1DYqhuiY=)

</div>
<div class="options-api">

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9kVFKAzEQhq8y5kmhu6Gvy7boJXzKy3Y7tVt3syGZtEIpFAVPIOKTBe9Q0KKeIXsFT+ARTLpLFQVDCPNn5v8If5bsTKl4bpElLDW5LhQNhcQrVWuCMU4yWxIshQQYZ5Qdn7S1II1ktQxKEPiVLdDUFSZA2mI7sgo9f/id8gPaC8JKlRmhVwDpyBLVEk7zssgvB4J1JBjAUVcKNnQbt23Wbute3c69NTfNtXtOeWvdQwWl0z7Mo2LyjfC+c4vwsb6D5tZtwe2a9d76fpTyaT/4OheWBofu0b30wNPv4XPz8NSNpPzwXNZjRRWCiapMxTNTSx9am0fXMIIlbULhzqcatGBTImUSzs0kD1HPTFzrC+6rWFtJRYUxmioa6XphUHuwYL0fDO4v56gjjXKMGvV/zF+jf7gBG76Erb4AVmLAPQ==)

</div>

А елемент `v-else` повинен йти безпосередньо за `v-if` або елементом `v-else-if` — в іншому випадку їх не буде розпізнано.

## `v-else-if`

`v-else-if`, як і підказує його назва, слугує в якості "блоку інакше якщо" для `v-if`. Може бути також і ланцюжок таких елементів:

```vue-html
<div v-if="type === 'A'">
  А
</div>
<div v-else-if="type === 'B'">
  Б
</div>
<div v-else-if="type === 'C'">
  А
</div>
<div v-else>
  Не А/Б/В
</div>
```

Подібно до `v-else`, елемент `v-else-if` повинен йти безпосередньо за `v-if` або `v-else-if` елементами.

## `v-if` в `<template>`

Оскільки `v-if` є директивою, вона має бути додана до одиночного елементу. Але робити у випадку, коли ми хочемо перемикати більше, ніж один елемент? У такому разі ми можемо використовувати `v-if` в елементі `<template>`, який слугує невидимою обгорткою. Фінальний результат рендеру не міститиме елемент `<template>`.

```vue-html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

`v-else` and `v-else-if` can also be used on `<template>`.

## `v-show`

Another option for conditionally displaying an element is the `v-show` directive. The usage is largely the same:

```vue-html
<h1 v-show="ok">Hello!</h1>
```

The difference is that an element with `v-show` will always be rendered and remain in the DOM; `v-show` only toggles the `display` CSS property of the element.

`v-show` doesn't support the `<template>` element, nor does it work with `v-else`.

## `v-if` vs `v-show`

`v-if` is "real" conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.

`v-if` is also **lazy**: if the condition is false on initial render, it will not do anything - the conditional block won't be rendered until the condition becomes true for the first time.

In comparison, `v-show` is much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling.

Generally speaking, `v-if` has higher toggle costs while `v-show` has higher initial render costs. So prefer `v-show` if you need to toggle something very often, and prefer `v-if` if the condition is unlikely to change at runtime.

## `v-if` with `v-for`

::: warning Note
It's **not** recommended to use `v-if` and `v-for` on the same element due to implicit precedence. Refer to [style guide](/style-guide/rules-essential.html#avoid-v-if-with-v-for) for details.
:::

When `v-if` and `v-for` are both used on the same element, `v-if` will be evaluated first. See the [list rendering guide](list.html#v-for-with-v-if) for details.
