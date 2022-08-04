# Обчислювані властивості

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Безкоштовний урок по обчислюваних властивостях Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Безкоштовний урок по обчислюваних властивостях Vue.js"/>
</div>

## Простий приклад

In-template expressions are very convenient, but they are meant for simple operations. Putting too much logic in your templates can make them bloated and hard to maintain. For example, if we have an object with a nested array:
Вирази, вбудовані в шаблон є досить зручними, але їх є зміст використовувати для простих дій. Додавання дуже багато логіки до шаблонів може роздути їх та ускладнити подальше обслуговування. Наприклад, у нас є об'єкт з вкладеним масивом:

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

Як бачите, шаблон стає дещо захаращеним. Давайте поглянемо на нього на секунду перед тим, як зрозуміти, що він виконує обчислення, залежне від `author.books`. Більше того, ми напевне не хочемо повторювати самих себе, якщо б нам потрібно було скористатись цим обчисленням в шаблоні більше, ніж один раз.

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
      // `this` вказує на екземпляр компоненти
      return this.author.books.length > 0 ? 'Так' : 'Ні'
    }
  }
}
```

```vue-html
<p>Має опубліковані книги:</p>
<span>{{ publishedBooksMessage }}</span>
```

[Спробуйте відтворити це в Пісочниці](https://sfc.vuejs.org/#eNp9UsFu00AQ/ZWRLwGpsVsJJLCiILjzBRipTjyNXeL1anddkCJLaXvgguCCgoTg0hPHEFQlSkj4hd1f4EuYXScxaqtK9npm/PbNzJsZec85989K9EKvI/si46obMXzHC6EgwZO4HCoYRQwgiVX84GFtAwhUpWA7DyAuVVqIsAkAsDjHEFr6Sk/NmN5z0D/0tZ6Z93Su9VJvWgcNulcUb2QIr5oIQOvoyaND+Dv+DPqr3uifem6p/r/lMI+PaswVYf7QuzKfbmOe1pgveuowMzMxF60G9HpnVrXhPpVj6Rc5LxUm++aCAGw11MfCnFO2j3pGrGs9BTJWtlNzoRcuBVnmA7RhgEqhqK/zsjfMZIrJC9vyS5QyHmCjrOM/Vmkmjy3fkqjn5tJQ7S7DNUXmdP6mNqhRMwarpHM3hCBlbfId1XZMls2vR+Q7of0hsoFKoQuH8KyekV62wI7ru5lsdak1iBg9nWC/G+QozPkwVkgeQId39Tdqmgok+c0ljWllJq4oJ4uZ2ArXJMgvvQg7Aa9vSR6z7mh0txpQVZTRImzqfTrvwMtyu5ntPOb+qSwYba2TLdr+kJG3H1Pk0VpbP/JSpbgMg0Ce9O2un0q/EIOALF+UTGU5+ijzdk8UbyUKIo687f44joCCZyjaAlmCgsZ4D+cN6C3enaRe9Q+SbXBW)

Тут ми оголосили обчислювану властивість  `publishedBooksMessage`.

Спробуйте змінити значення масиву `books`, що знаходиться у `data` в додатку, і ви побачите, що `publishedBooksMessage` теж змінюється відповідно до ваших змін.

Ви можете прив'язувати дані до обчислюваних компонентів в шаблонах як звичайну властивість. Vue в курсі, що `this.publishedBooksMessage` залежить від `this.author.books`, тому він автоматично оновить всі зв'язки, що залежать від `this.publishedBooksMessage`, коли змінюється `this.author.books`.

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

[Спробуйте відтворити це в Пісочниці](https://sfc.vuejs.org/#eNp9Us1u00AQfpXRXpxKid1KIIGVGsGdJ2A5OM4kcYl3V7vrcLAsFThw5IKChODSE8cShKhapbzC7ivwJMzaaUGt2oOtnf3m5/u+2YY9VSpe1chSNjaFLpUFg7ZWGRdlpaS20IDGvLDlCodQyErVFqfQwkzLCiKqjLjgopDCWMhru5AaDq8rBg0XACKvMIXInbhTf0zfG3Df3E+38e/pv3Xn7jIahryJlK9MCi/CGSA6ePRgH/4cfwT32V267+5XKO8zO/ThQY+eEPqbvgv/4X/0cY9+cqcduvFr/5a4Arzkot0LpJME8n+SNM6udKh6sizNAqfPAqPnaEw+R5J1lTsY7MFhBp04TW5psZMedxLiJYq5XUAG+/Ck1+3OIwgWfPVr4hDGj5PebjKaAouVWuYWKQIYq8x9IbHEnpT5d6T9wq+DT25DrbZ+DRRs3Zn74c7ScRKWRVVG5SJrmjvYty1NDBlh9PU4NmT9mkdVruIjIwU9hE4X3wGGs7RXGu5o3yHmbGGtMmmSmFkRns+RiaWeJ3SKdS1sWWGMphpNtHxtUFNjznar6XokdLlCPdIopqhR39fzRuqtvqFtS56y9i/UuSDc)

Тут ми оголосили обчислювану властивість `publishedBooksMessage`. Функція `computed()` очікує в якості аргументу функцію, яка повертає якесь значення. Результат виконання функції `computed()` є **обчислювана референція**. Як і звичайні референції, ви можете отримати до їхнього обчисленого результату через `publishedBooksMessage.value`. Обчислювані референції є також такими, що автоматично розпаковуються в шаблонах, щоб ви могли їх використовувати без `.value` у шаблонних виразах.

Обчислювана властивість автоматично відслідковує свої реактивні залежності. Vue знає, що обчислення `publishedBooksMessage` залежить від `author.books`, тому він оновить будь-які прив'язки `publishedBooksMessage`, у разі якщо `author.books` зміниться.

Також перегляньте: [Типізрвані обчислювані вирази](/guide/typescript/composition-api.html#typing-computed) <sup class="vt-badge ts" />

</div>

## Кешування обчислюваних виразів та методи

Ви могли помітити, що ви можемо досягнути такий ж самий результат просто виконавши метод, представлений у вигляді виразу:

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

Замість обчислюваної властивості ми можемо оголосити таку ж функцію у якості метода. В кінцевому результаті, два цих підходи точнісінько такі ж самі. Але різниця між ними полягає в тому, що **обчислювані властивості кешуються на основі їхнії рективних залежностей.** Тобто, обчислювана властивість перерахується лише в тому випадку, коли її хоч якась реактивна залежність змінюється. Це означає, що скільки б разів ми б не звертались до `publishedBooksMessage`, вона не буде обчислюватись повторно, а буде повертатись результат, обчислений перед цим, аж поки `author.books` не зміниться.

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

Для порівняння, виклик метода **завжди** виконуватиме цю функцію, аж поки не відбудется повтореий ререндерінг.

Why do we need caching? Imagine we have an expensive computed property `list`, which requires looping through a huge array and doing a lot of computations. Then we may have other computed properties that in turn depend on `list`. Without caching, we would be executing `list`’s getter many more times than necessary! In cases where you do not want caching, use a method call instead.

## Writable Computed

Computed properties are by default getter-only. If you attempt to assign a new value to a computed property, you will receive a runtime warning. In the rare cases where you need a "writable" computed property, you can create one by providing both a getter and a setter:

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

Now when you run `this.fullName = 'Тарас Шевченко'`, the setter will be invoked and `this.firstName` and `this.lastName` will be updated accordingly.

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
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

Now when you run `fullName.value = 'John Doe'`, the setter will be invoked and `firstName` and `lastName` will be updated accordingly.

</div>

## Best Practices

### Getters should be side-effect free

It is important to remember that computed getter functions should only perform pure computation and be free of side effects. For example, **don't make async requests or mutate the DOM inside a computed getter!** Think of a computed property as declaratively describing how to derive a value based on other values - its only responsibility should be computing and returning that value. Later in the guide we will discuss how we can perform side effects in reaction to state changes with [watchers](./watchers).

### Avoid mutating computed value

The returned value from a computed property is derived state. Think of it as a temporary snapshot - every time the source state changes, a new snapshot is created. It does not make sense to mutate a snapshot, so a computed return value should be treated as read-only and never be mutated - instead, update the source state it depends on to trigger new computations.
