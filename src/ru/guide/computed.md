# Вычисляемые свойства и наблюдатели

## Вычисляемые свойства

Выражения внутри шаблона очень удобны, но предназначены для простых операций. Большое количество логики в шаблоне сделает его раздутым и сложным в поддержке. Например, если есть объект с вложенным массивом:

```js
Vue.createApp({
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
})
```

И требуется отображать различные сообщения в зависимости от того, есть ли у `author` какие-то книги или нет:

```html
<div id="computed-basics">
  <p>Есть опубликованные книги:</p>
  <span>{{ author.books.length > 0 ? 'Да' : 'Нет' }}</span>
</div>
```

В этом случае шаблон уже не является ни простым, ни декларативным. Потребуется взглянуть на него, прежде чем понять, что он выполняет вычисления в зависимости от `author.books`. Проблема усугубится, когда потребуется использовать подобное вычисление в шаблоне не один раз.

Поэтому для сложной логики, включающей реактивные данные, следует использовать **вычисляемые свойства**.

### Простой пример

```html
<div id="computed-basics">
  <p>Есть опубликованные книги:</p>
  <span>{{ publishedBooksMessage }}</span>
</div>
```

```js
Vue.createApp({
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
      // `this` указывает на экземпляр vm
      return this.author.books.length > 0 ? 'Да' : 'Нет'
    }
  }
}).mount('#computed-basics')
```

Результат:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="NWqzrjr" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Computed basic example">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/NWqzrjr">
  Computed basic example</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Здесь мы объявили вычисляемое свойство `publishedBooksMessage`.

Попробуйте изменить количество книг в массиве `books` в `data` приложения и увидите, как меняется значение `publishedBooksMessage`.

К вычисляемым свойствам в шаблоне можно обращаться так же, как и к обычным свойствам. Vue знает, что `vm.publishedBooksMessage` зависит от значения `vm.author.books`, поэтому он будет обновлять все привязки, которые зависят от `vm.publishedBooksMessage` при изменениях `vm.author.books`. И самая лучшая часть, что мы создали эту зависимость декларативно: геттер-функция вычисляемого свойства не имеет побочных эффектов, что облегчает понимание и тестирование.

### Кэширование вычисляемых свойств vs Методы

Можно заметить, что того же результата легко достичь с помощью метода в выражении:

```html
<p>{{ calculateBooksMessage() }}</p>
```

```js
// в компоненте
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Да' : 'Нет'
  }
}
```

Вместо вычисляемого свойства можно определить ту же функцию в качестве метода. Для достижения результата эти два подхода действительно одинаковы. Но разница заключается в том, что **вычисляемые свойства кэшируются на основе своих реактивных зависимостей.** Вычисляемое свойство будет пересчитываться только при изменении одной из зависимостей. Это значит, что до тех пор пока не изменится `author.books` для любого числа обращений к вычисляемому свойству `publishedBooksMessage` будет немедленно возвращать ранее вычисленный результат, без необходимости повторного запуска функции.

Это также означает, что следующее вычисляемое свойство никогда не будет обновляться, потому что `Date.now()` не является реактивной зависимостью:

```js
computed: {
  now() {
    return Date.now()
  }
}
```

Для сравнения, вызов метода будет **всегда запускать** функцию каждый раз, когда происходит перерендер.

Зачем нужно кэширование? Представьте, что есть затратное вычисляемое свойство `list`, которому требуется проходить по большому массиву и выполнять различные вычисления. Далее, могут быть другие вычисляемые свойства, которые зависят от значения `list`. Без кэширования потребуется выполнять геттер `list` во много раз больше, чем это нужно! В случаях, когда необходимо обойтись без кэширования стоит воспользоваться `method`.

### Сеттер вычисляемого свойства

Вычисляемые свойства по умолчанию считаются только для чтения, потому что указываем только геттер. Но при необходимости также можно определить сеттер:

```js
// ...
computed: {
  fullName: {
    // геттер (для получения значения)
    get() {
      return this.firstName + ' ' + this.lastName
    },
    // сеттер (при присвоении нового значения)
    set(newValue) {
      const names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

Теперь, при выполнении `vm.fullName = 'John Doe'` вызовется сеттер вычисляемого свойства и значения `vm.firstName` и `vm.lastName` будут обновлены соответственно.

## Методы-наблюдатели

Вычисляемые свойства обычно подходят в большинстве случаев, но иногда необходимо отслеживать сам факт изменений. Вот почему Vue предоставляет ещё один способ реагировать на изменения данных с помощью опции `watch`. Это полезно, когда необходимо выполнять асинхронные или затратные операции в ответ на изменение данных.

Например:

```html
<div id="watch-example">
  <p>
    Задайте вопрос, на который можно ответить «да» или «нет»:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</div>
```

```html
<!-- Поскольку уже существует обширная экосистема ajax-библиотек -->
<!-- и библиотек функций общего назначения, ядро Vue может       -->
<!-- оставаться маленьким и не изобретать их заново. Кроме того, -->
<!-- это позволяет вам использовать только знакомые инструменты. -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script>
  const watchExampleVM = Vue.createApp({
    data() {
      return {
        question: '',
        answer: 'Вопросы обычно заканчиваются вопросительным знаком. ;-)'
      }
    },
    watch: {
      // при каждом изменении `question` эта функция будет запускаться
      question(newQuestion, oldQuestion) {
        if (newQuestion.indexOf('?') > -1) {
          this.getAnswer()
        }
      }
    },
    methods: {
      getAnswer() {
        this.answer = 'Думаю...'
        axios
          .get('https://yesno.wtf/api')
          .then(response => {
            this.answer = response.data.answer
          })
          .catch(error => {
            this.answer = 'Ошибка! Не могу связаться с API. ' + error
          })
      }
    }
  }).mount('#watch-example')
</script>
```

Результат:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="GRJGqXp" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Watch basic example">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/GRJGqXp">
  Watch basic example</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

В этом случае, использовании опции `watch` позволяет выполнить асинхронную операцию (обращение к API) и устанавливает условие выполнения этой операции. Ничего из этого нельзя добиться с помощью вычисляемых свойств.

В дополнение к опции `watch`, можно использовать императивную запись с помощью [vm.\$watch API](../api/instance-methods.md#watch).

### Вычисляемые свойства vs Методы-наблюдатели

Vue предоставляет способ для наблюдения и реагирования на изменения данных в текущем активном экземпляре: **свойства watch**. Когда есть некоторые данные, которые необходимо изменять на основе других данных, кажется удобным реализовать всё через `watch` — особенно, если работали ранее с AngularJS. Однако, чаще всего лучше использовать вычисляемые свойства, чем вызовы методов-наблюдателей `watch`. Рассмотрим пример:

```html
<div id="demo">{{ fullName }}</div>
```

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    }
  },
  watch: {
    firstName(val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName(val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
}).mount('#demo')
```

Код выше является императивным и повторяющимся. Сравним с вычисляемым свойством:

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar'
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}).mount('#demo')
```

Гораздо лучше, не правда ли?
