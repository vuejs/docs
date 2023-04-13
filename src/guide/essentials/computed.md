# Обчислювані властивості {#computed-properties}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Безкоштовний урок по обчислюваних властивостях Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Безкоштовний урок по обчислюваних властивостях Vue.js"/>
</div>

## Простий приклад {#basic-example}

Вирази, вбудовані в шаблон є досить зручними, але їх слід використовувати лише для простих дій. Винесення великої кількості логічних операцій до шаблонів може їх "роздути" та ускладнити подальше обслуговування. Наприклад, у нас є об'єкт з вкладеним масивом:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'Тарас Шевченко',
        books: [
          '1840 — Кобзар',
          '1851 — Тополя',
          '1859 — Заповіт'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'Тарас Шевченко',
  books: [
    '1840 — Кобзар',
    '1851 — Тополя',
    '1859 — Заповіт'
  ]
})
```

</div>

І ми хочемо вивести різні повідомлення, виходячи з того, чи `author` має якісь книги, чи ні:

```vue-html
<p>Має опубліковані книги:</p>
<span>{{ author.books.length > 0 ? 'Так' : 'Ні' }}</span>
```

Як бачите, шаблон стає дещо захаращеним. Якщо на секунду поглянути на нього, то буде зрозуміло, що він виконує певне обчислення, яке залежить від `author.books`. Ба більше, ми напевне не хочемо повторювати самих себе, якби нам потрібно було скористатись цим обчисленням в шаблоні більше, ніж один раз.

Ось чому наша складна логіка, яка містить в собі реактивні дані, рекомендована для використання в **обчислюваній властивості**. Ось той самий приклад, але відрефакторений:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'Тарас Шевченко',
        books: [
          '1840 — Кобзар',
          '1851 — Тополя',
          '1859 — Заповіт'
        ]
      }
    }
  },
  computed: {
    // обчислювана властивість - getter
    publishedBooksMessage() {
      // `this` вказує на екземпляр компонента
      return this.author.books.length > 0 ? 'Так' : 'Ні'
    }
  }
}
```

```vue-html
<p>Має опубліковані книги:</p>
<span>{{ publishedBooksMessage }}</span>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNptUs1Kw0AQfpWhlyhoa0FBQ6no3SewQtN2bYttsiQbEUKgPwcvoheJIHrpyWOtlJbW1leYfQWfxNndthEUspuZ5dtv5vtmo8wJ59nrkGXsTCGo+k0uiiWX3XDPF1Bjl07YEhCVXICaI5ytbRMD+EyEvrvOAJxQNDzfTg8AXKfNbLBwgEPZodUFfMMxjuQt7Quc4dLaSdEVz7sKbDhPTwCs/OH+Hnx3HgGfcYnvOFFUv29pzEHeYAaE+aI1lw9/MUcG84RDjRnJRPasFHSxDmMT6F+sWapem4eC1TbicjlQ3ZCOqexStXscEesCh0DBXCmVPZzqEhTJO9iFOhOC+eY6DyutZtBgtVMl+YwFgVNnqbOavywazaCs+GZEPZF9Sb3rCmM6mdD+STJIqOyAclKnS0KQs6r4mmo1JsWWNSPKaqOzLebWRQOKsAfHZkY4s0CN61UmK1+MByWXvkJu8zYoEazNW45glAEUeBFfSDQ1SPbLPo1pLhPdlLZFJqrDBRnygVO7kOPmVsAdtxhF/7sBcUwVFUKV3pTLxD/zaSnx)

Тут ми оголосили обчислювану властивість  `publishedBooksMessage`.

Спробуйте змінити значення масиву `books`, що знаходиться у `data` в додатку, і ви побачите, що `publishedBooksMessage` теж змінюється відповідно до ваших змін.

Ви можете прив'язувати дані до обчислюваних властивостей в шаблонах як звичайну властивість. Vue в курсі, що `this.publishedBooksMessage` залежить від `this.author.books`, тому він автоматично оновить всі зв'язки, що залежать від `this.publishedBooksMessage`, коли змінюється `this.author.books`.

Також до вашої уваги: [Типізація обчислюваних властивостей](/guide/typescript/options-api.html#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'Тарас Шевченко',
  books: [
    '1840 — Кобзар',
    '1851 — Тополя',
    '1859 — Заповіт'
  ]
})

// обчислювана властивість - ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Так' : 'Ні'
})
</script>

<template>
  <p>Має опубліковані книги:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[Спробуйте в пісочниці](https://play.vuejs.org/#eNp1kcFOwkAQhl9lwqWYEAqJJtqUGr37BNZDKQs00u2m3XJpmqAePHoxNTF64eQRMUYCAV9h9hV8EmdbQS8etunkn9n5v3+z2okQzXHKalbNTvw4EBISJlPhuDwIRRRLyCBmni+DMWuAH4UilawHOfTjKASDJg2Xu9yPeCLBS+UwiqGzm6hnLgfgXsgsMHCKMzWhcwX4gu84V7f0XeMSN0ZD93Wj6DKx4Fz/Axjtw/0WfE3uAR9xg6/4ocerzlI9aFfqlNRPOit191c9qtQHnJXqXBXqmrwCXLg839OmTRO8X6SY9bccIu2OgmTIeqfa0RlLEm/ACGvbW6/vQceBEi6mtGL+g94sEZojxgdyCA604LjixqUBOoJnVZAHvd42q7gpaCokC8XIk4wqAFs4+ESw5J7I1A2xr1Shc8I5XbVWBVCxxgW+4cKyTf1YNJUIjztZ9o/7PKeNukOv3q2r5d8/M9po)

Тут ми оголосили обчислювану властивість `publishedBooksMessage`. Функція `computed()` очікує в якості аргументу функцію, яка повертає якесь значення. Результат виконання функції `computed()` є **обчислювана референція**. Як і звичайні референції, ви можете отримати до їхнього обчисленого результату через `publishedBooksMessage.value`. Обчислювані референції є також такими, що автоматично розпаковуються в шаблонах, щоб ви могли їх використовувати без `.value` у шаблонних виразах.

Обчислювана властивість автоматично відстежує свої реактивні залежності. Vue знає, що обчислення `publishedBooksMessage` залежить від `author.books`, тому він оновить усі зв'язки `publishedBooksMessage`, у разі якщо `author.books` зміниться.

Також перегляньте: [Типізовані обчислювані вирази](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />

</div>

## Кешування обчислюваних виразів та методи {#computed-caching-vs-methods}

Ви могли помітити, що ми можемо досягнути такий ж самий результат просто виконавши метод, представлений у вигляді виразу:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// в компоненті
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Так' : 'Ні'
  }
}
```

</div>

<div class="composition-api">

```js
// в компоненті
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Так' : 'Ні'
}
```

</div>

Замість обчислюваної властивості ми можемо оголосити таку ж функцію у якості метода. В кінцевому результаті, два цих підходи точнісінько такі ж самі. Але різниця між ними полягає в тому, що **обчислювані властивості кешуються на основі їхніх реактивних залежностей.** Тобто, обчислювана властивість перерахується лише в тому випадку, коли її хоч якась реактивна залежність змінюється. Це означає, що скільки б разів ми б не звертались до `publishedBooksMessage`, вона не буде обчислюватись повторно, а буде повертатись результат, обчислений перед цим, аж поки `author.books` не зміниться.

Це також означає, що наступна обчислювана властивість ніколи не оновиться, оскільки `Date.now()` не є реактивною залежністю:

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

Для порівняння, виклик метода **завжди** виконуватиме цю функцію, аж поки не відбудеться повторний рендерінг.

Навіщо нам кешування? Уявіть, що у нас є "дорога" обчислювана властивість `list`, яка вимагає циклічного перегляду величезного масиву та виконання великої кількості обчислень. Тоді ми можемо мати інші обчислені властивості, які, своєю чергою, залежать від `list`. Без кешування ми б виконували геттер для `list` набагато більше разів, ніж потрібно! Отже, у випадках, коли ви не бажаєте кешування, замість цього використовуйте виклик методу.

## Обчислювана властивість з можливістю запису {#writable-computed}

Обчислювані властивості за замовчуванням призначені лише для читання. Якщо ви спробуєте призначити нове значення обчислюваній властивості, ви отримаєте попередження під час виконання. У рідкісних випадках, коли вам потрібна «записувана» обчислювана властивість, ви можете створити її, надавши як getter, так і setter:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'Тарас',
      lastName: 'Шевченко'
    }
  },
  computed: {
    fullName: {
      // геттер
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // сеттер
      set(newValue) {
        // Примітка: ми використовуємо так званий деструктуризаційний синтаксис при присвоєнні.
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

Тепер, коли ви запускаєте `this.fullName = 'Тарас Шевченко'`, буде викликано setter, і `this.firstName` та `this.lastName` будуть відповідно оновлені.

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Примітка: ми використовуємо так званий деструктуризований синтаксис при присвоєнні.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

Тепер, коли ви запускаєте `fullName.value = 'Тарас Шевченко'`, буде викликано setter і `firstName` та `lastName` будуть відповідно оновлені.

</div>

## Рекомендації {#best-practices}

### Геттери не мають мати побічних ефектів {#getters-should-be-side-effect-free}

Важливо пам'ятати, що обчислювані функції повинні виконувати лише чисті (pure functions) обчислення та не мати побічних ефектів. Наприклад, **не робіть асинхронні запити та не змінюйте DOM в обчислюваному геттері!** Подумайте про обчислювану властивість як про декларативний опис того, як отримати значення на основі інших значень – її єдиною відповідальністю має бути обчислення та повернення цього значення. Далі в Гіді ми обговоримо, як ми можемо виконувати побічні ефекти у відповідь на зміни стану за допомогою [спостерігачів](watchers).

### Уникайте змін обчисленого значення {#avoid-mutating-computed-value}

Значення, що повертається з обчислюваної властивості, є похідним станом. Подумайте про це як про тимчасовий знімок – кожного разу, коли вихідний стан змінюється, створюється новий знімок. Немає сенсу змінювати знімок, тому обчислене значення, що повертається, слід розглядати як лише для читання та ніколи не змінювати – натомість оновіть вихідний стан, від якого воно залежить, щоб ініціювати нові обчислення.
