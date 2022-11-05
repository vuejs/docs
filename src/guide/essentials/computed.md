# Вычисляемые свойства {#computed-properties}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Бесплатный урок по вычисляемым свойствам Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Бесплатный урок по вычисляемым свойствам Vue.js"/>
</div>

## Простой пример {#basic-example}

Выражения внутри шаблона удобны, но предназначены для простых операций. Большое количество логики в шаблоне сделает его раздутым и сложным для поддержки. Например, если есть объект с вложенным массивом:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
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
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

И потребуется отображать разные сообщения, в зависимости от того, есть ли у `author` какие-то книги или нет:

```vue-html
<p>Есть опубликованные книги:</p>
<span>{{ author.books.length > 0 ? 'Да' : 'Нет' }}</span>
```

В таком случае шаблон уже не будет простым и декларативным. Потребуется взглянуть на него, прежде чем понять, что он выполняет вычисления в зависимости от `author.books`. Проблема усугубится, если подобные вычисления в шаблоне потребуются не один раз.

Поэтому для сложной логики, включающей реактивные данные, следует использовать **вычисляемые свойства**.

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // геттер вычисляемого свойства
    publishedBooksMessage() {
      // `this` указывает на экземпляр компонента
      return this.author.books.length > 0 ? 'Да' : 'Нет'
    }
  }
}
```

```vue-html
<p>Есть опубликованные книги:</p>
<span>{{ publishedBooksMessage }}</span>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIG5hbWU6ICdKb2huIERvZScsXG4gICAgICAgIGJvb2tzOiBbXG4gICAgICAgICAgJ1Z1ZSAyIC0gQWR2YW5jZWQgR3VpZGUnLFxuICAgICAgICAgICdWdWUgMyAtIEJhc2ljIEd1aWRlJyxcbiAgICAgICAgICAnVnVlIDQgLSBUaGUgTXlzdGVyeSdcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBwdWJsaXNoZWRCb29rc01lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+SGFzIHB1Ymxpc2hlZCBib29rczo8L3A+XG4gIDxzcGFuPnt7IGF1dGhvci5ib29rcy5sZW5ndGggPiAwID8gJ1llcycgOiAnTm8nIH19PC9zcGFuPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

В этом примере объявляем новое вычисляемое свойство `publishedBooksMessage`.

Попробуйте изменить в массиве `books` количество книг в `data` приложения и увидите, как обновится и значение `publishedBooksMessage`.

В шаблоне к вычисляемым свойствам можно обращаться как и к обычным свойствам. Vue знает, что `this.publishedBooksMessage` зависит от значения `this.author.books`, поэтому будет обновлять все привязки, которые зависят от `this.publishedBooksMessage`, при изменениях `this.author.books`.

См. также: [Типизация вычисляемых свойств](/guide/typescript/options-api.html#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// ref вычисляемого свойства
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Да' : 'Нет'
})
</script>

<template>
  <p>Есть опубликованные книги:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXV0aG9yID0gcmVhY3RpdmUoe1xuICBuYW1lOiAnSm9obiBEb2UnLFxuICBib29rczogW1xuICAgICdWdWUgMiAtIEFkdmFuY2VkIEd1aWRlJyxcbiAgICAnVnVlIDMgLSBCYXNpYyBHdWlkZScsXG4gICAgJ1Z1ZSA0IC0gVGhlIE15c3RlcnknXG4gIF1cbn0pXG5cbi8vIGEgY29tcHV0ZWQgcmVmXG5jb25zdCBwdWJsaXNoZWRCb29rc01lc3NhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBhdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPkhhcyBwdWJsaXNoZWQgYm9va3M6PC9wPlxuICA8c3Bhbj57eyBwdWJsaXNoZWRCb29rc01lc3NhZ2UgfX08L3NwYW4+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

В этом примере объявляем новое вычисляемое свойство `publishedBooksMessage`. Функция `computed()` ожидает передачи функции-геттера и возвращает значение в виде **ref вычисляемого свойства**. Подобно обычным ref-ссылкам, можно получить доступ к вычисленному результату через `publishedBooksMessage.value`. Вычисляемые свойства в виде ref-ссылок также автоматически разворачиваются в шаблонах, поэтому можно ссылаться на них без `.value` в выражениях шаблонов.

Вычисляемое свойство автоматически отслеживает свои реактивные зависимости. Vue знает, что `publishedBooksMessage` зависит от значения `author.books`, поэтому будет обновлять все привязки, которые зависят от `publishedBooksMessage`, при изменениях `author.books`.

См. также: [Типизация вычисляемых свойств](/guide/typescript/composition-api.html#typing-computed) <sup class="vt-badge ts" />

</div>

## Кэширование вычисляемых свойств vs. Методы {#computed-caching-vs-methods}

Можно заметить, что того же результата можно достичь с помощью метода в выражении:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// в компоненте
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Да' : 'Нет'
  }
}
```

</div>

<div class="composition-api">

```js
// в компоненте
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Да' : 'Нет'
}
```

</div>

Вместо вычисляемого свойства можно объявить эту же функцию в качестве метода. Для отображаемого результата эти два подхода действительно одинаковы. Однако разница заключается в том, что **вычисляемые свойства кэшируются на основе своих реактивных зависимостей**. Вычисляемое свойство будет пересчитываться только при изменении одной из своих зависимостей. А значит, пока не изменится `author.books`, любое число обращений к вычисляемому свойству `publishedBooksMessage` будет немедленно возвращать ранее вычисленный результат, без необходимости повторного запуска функции-геттера.

Это также означает, что следующее вычисляемое свойство никогда не будет обновляться, потому что `Date.now()` не является реактивной зависимостью:

<div class="options-api">

```js
computed: {
  // НЕ БУДЕТ РАБОТАТЬ
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
// НЕ БУДЕТ РАБОТАТЬ
const now = computed(() => Date.now())
```

</div>

Для сравнения, вызов метода **будет всегда запускать** функцию, когда происходит перерисовка.

Зачем нужно кэширование? Представьте, что есть затратное вычисляемое свойство `list`, которому требуется проходить по большому массиву и выполнять различные вычисления. Далее, могут быть другие вычисляемые свойства, которые зависят от значения `list`. Без кэширования выполнять геттер `list` потребуется во много раз больше, чем это нужно! Когда же необходимо обойтись без кэширования — стоит использовать метод.

## Вычисляемое свойство с возможностью записи {#writable-computed}

Вычисляемые свойства по умолчанию состоят только из геттера. При попытке присвоить ему новое значение будет выброшено предупреждение во время выполнения. В редких случаях, когда требуется вычисляемое свойство «с возможностью записи», можно создать такое, указав и геттер и сеттер:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // геттер (для получения значения)
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // сеттер (при присвоении нового значения)
      set(newValue) {
        // Примечание: это синтаксис деструктурирующего присваивания
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

Теперь при выполнении `this.fullName = 'John Doe'` вызовется сеттер вычисляемого свойства и значения `this.firstName` и `this.lastName` будут соответственно обновлены.

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // геттер (для получения значения)
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // сеттер (при присвоении нового значения)
  set(newValue) {
    // Примечание: это синтаксис деструктурирующего присваивания
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

Теперь, при выполнении `fullName.value = 'John Doe'` вызовется сеттер вычисляемого свойства и значения `firstName` и `lastName` будут соответственно обновлены.

</div>

## Лучшие практики {#best-practices}

### Геттеры должны быть без побочных эффектов {#getters-should-be-side-effect-free}

Важно помнить, что вычисляемые функции геттера должны быть чистыми функциями и не иметь побочных эффектов. Например, **не делайте асинхронных запросов и не изменяйте DOM внутри геттера вычисляемого свойства!** Думайте о вычисляемом свойстве как о декларативном описании того, как получить значение на основе других значений — его единственной обязанностью должно быть вычисление и возвращение этого значения. Далее в руководстве обсудим, как можно выполнять побочные эффекты в ответ на изменения состояния с помощью [методов-наблюдателей watchers](./watchers).

### Избегайте мутации вычисляемого значения {#avoid-mutating-computed-value}

Возвращаемое значение вычисляемого свойства это производное состояние. Считайте его временным снимком — при каждом изменении состояния источника создаётся новый снимок. Не имеет смысла изменять снимок, поэтому вычисляемое возвращаемое значение следует рассматривать как доступное только для чтения и никогда не изменять — вместо этого следует обновить состояние источника, от которого оно зависит, чтобы вызвать вычисление нового значения.
