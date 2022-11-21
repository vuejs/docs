# Обчислювані властивості {#computed-properties}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Безкоштовний урок по обчислюваних властивостях Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Безкоштовний урок по обчислюваних властивостях Vue.js"/>
</div>

## Простий приклад {#basic-example}

Вирази, вбудовані в шаблон є досить зручними, але їх слід використовувати лише для простих дій. Винесеня великої кількості логічних операцій до шаблонів може їх "роздути" та ускладнити подальше обслуговування. Наприклад, у нас є об'єкт з вкладеним масивом:

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

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9UsFu00AQ/ZWRLwGpsVsJJLCiILjzBRipTjyNXeL1anddkCJLaXvgguCCgoTg0hPHEFQlSkj4hd1f4EuYXScxaqtK9npm/PbNzJsZec85989K9EKvI/si46obMXzHC6EgwZO4HCoYRQwgiVX84GFtAwhUpWA7DyAuVVqIsAkAsDjHEFr6Sk/NmN5z0D/0tZ6Z93Su9VJvWgcNulcUb2QIr5oIQOvoyaND+Dv+DPqr3uifem6p/r/lMI+PaswVYf7QuzKfbmOe1pgveuowMzMxF60G9HpnVrXhPpVj6Rc5LxUm++aCAGw11MfCnFO2j3pGrGs9BTJWtlNzoRcuBVnmA7RhgEqhqK/zsjfMZIrJC9vyS5QyHmCjrOM/Vmkmjy3fkqjn5tJQ7S7DNUXmdP6mNqhRMwarpHM3hCBlbfId1XZMls2vR+Q7of0hsoFKoQuH8KyekV62wI7ru5lsdak1iBg9nWC/G+QozPkwVkgeQId39Tdqmgok+c0ljWllJq4oJ4uZ2ArXJMgvvQg7Aa9vSR6z7mh0txpQVZTRImzqfTrvwMtyu5ntPOb+qSwYba2TLdr+kJG3H1Pk0VpbP/JSpbgMg0Ce9O2un0q/EIOALF+UTGU5+ijzdk8UbyUKIo687f44joCCZyjaAlmCgsZ4D+cN6C3enaRe9Q+SbXBW)

Тут ми оголосили обчислювану властивість  `publishedBooksMessage`.

Спробуйте змінити значення масиву `books`, що знаходиться у `data` в додатку, і ви побачите, що `publishedBooksMessage` теж змінюється відповідно до ваших змін.

Ви можете прив'язувати дані до обчислюваних властивостей в шаблонах як звичайну властивість. Vue в курсі, що `this.publishedBooksMessage` залежить від `this.author.books`, тому він автоматично оновить всі зв'язки, що залежать від `this.publishedBooksMessage`, коли змінюється `this.author.books`.

Також до вашої уваги: [Типізація обчислюваних властивостей](/guide/typescript/options-api.html#типізація-обчисnюваних-вnастивостей) <sup class="vt-badge ts" />

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

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9Us1u00AQfpXRXpxKid1KIIGVGsGdJ2A5OM4kcYl3V7vrcLAsFThw5IKChODSE8cShKhapbzC7ivwJMzaaUGt2oOtnf3m5/u+2YY9VSpe1chSNjaFLpUFg7ZWGRdlpaS20IDGvLDlCodQyErVFqfQwkzLCiKqjLjgopDCWMhru5AaDq8rBg0XACKvMIXInbhTf0zfG3Df3E+38e/pv3Xn7jIahryJlK9MCi/CGSA6ePRgH/4cfwT32V267+5XKO8zO/ThQY+eEPqbvgv/4X/0cY9+cqcduvFr/5a4Arzkot0LpJME8n+SNM6udKh6sizNAqfPAqPnaEw+R5J1lTsY7MFhBp04TW5psZMedxLiJYq5XUAG+/Ck1+3OIwgWfPVr4hDGj5PebjKaAouVWuYWKQIYq8x9IbHEnpT5d6T9wq+DT25DrbZ+DRRs3Zn74c7ScRKWRVVG5SJrmjvYty1NDBlh9PU4NmT9mkdVruIjIwU9hE4X3wGGs7RXGu5o3yHmbGGtMmmSmFkRns+RiaWeJ3SKdS1sWWGMphpNtHxtUFNjznar6XokdLlCPdIopqhR39fzRuqtvqFtS56y9i/UuSDc)

Тут ми оголосили обчислювану властивість `publishedBooksMessage`. Функція `computed()` очікує в якості аргументу функцію, яка повертає якесь значення. Результат виконання функції `computed()` є **обчислювана референція**. Як і звичайні референції, ви можете отримати до їхнього обчисленого результату через `publishedBooksMessage.value`. Обчислювані референції є також такими, що автоматично розпаковуються в шаблонах, щоб ви могли їх використовувати без `.value` у шаблонних виразах.

Обчислювана властивість автоматично відстежує свої реактивні залежності. Vue знає, що обчислення `publishedBooksMessage` залежить від `author.books`, тому він оновить усі зв'язки `publishedBooksMessage`, у разі якщо `author.books` зміниться.

Також перегляньте: [Типізовані обчислювані вирази](/guide/typescript/composition-api.html#typing-computed) <sup class="vt-badge ts" />

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

Важливо пам'ятати, що обчислювані функції повинні виконувати лише чисті (pure functions) обчислення та не мати побічних ефектів. Наприклад, **не робіть асинхронні запити та не змінюйте DOM в обчислюваному геттері!** Подумайте про обчислювану властивість як про декларативний опис того, як отримати значення на основі інших значень – її єдиною відповідальністю має бути обчислення та повернення цього значення. Далі в Гіді ми обговоримо, як ми можемо виконувати побічні ефекти у відповідь на зміни стану за допомогою [спостерігачів](.watchers).

### Уникайте змін обчисленого значення {#avoid-mutating-computed-value}

Значення, що повертається з обчислюваної властивості, є похідним станом. Подумайте про це як про тимчасовий знімок – кожного разу, коли вихідний стан змінюється, створюється новий знімок. Немає сенсу змінювати знімок, тому обчислене значення, що повертається, слід розглядати як лише для читання та ніколи не змінювати – натомість оновіть вихідний стан, від якого воно залежить, щоб ініціювати нові обчислення.
