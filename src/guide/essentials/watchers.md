# Наблюдатели {#watchers}

## Простой пример {#basic-example}

Вычисляемые свойства позволяют нам декларативно вычислять производные значения. Однако бывают случаи, когда нам необходимо выполнить "побочные эффекты" в ответ на изменение состояния. Например, мутировать DOM или изменить другой фрагмент состояния на основе результата асинхронной операции.

<div class="options-api">

С помощью Options API мы можем использовать [`watch` опцию](/api/options-state.html#watch) для запуска функции при каждом изменении реактивного свойства:

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Вопросы обычно заканчиваются вопросительным знаком. ;-)'
    }
  },
  watch: {
    // при каждом изменении `question` эта функция будет запускаться
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Думаю...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Ошибка! Нет доступа к API. ' + error
      }
    }
  }
}
```

```vue-html
<p>
  Задайте вопрос, на который можно ответить «да» или «нет»:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb246ICcnLFxuICAgICAgYW5zd2VyOiAnUXVlc3Rpb25zIHVzdWFsbHkgY29udGFpbiBhIHF1ZXN0aW9uIG1hcmsuIDstKSdcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgLy8gd2hlbmV2ZXIgcXVlc3Rpb24gY2hhbmdlcywgdGhpcyBmdW5jdGlvbiB3aWxsIHJ1blxuICAgIHF1ZXN0aW9uKG5ld1F1ZXN0aW9uLCBvbGRRdWVzdGlvbikge1xuICAgICAgaWYgKG5ld1F1ZXN0aW9uLmluZGV4T2YoJz8nKSA+IC0xKSB7XG4gICAgICAgIHRoaXMuZ2V0QW5zd2VyKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBhc3luYyBnZXRBbnN3ZXIoKSB7XG4gICAgICB0aGlzLmFuc3dlciA9ICdUaGlua2luZy4uLidcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL3llc25vLnd0Zi9hcGknKVxuICAgICAgICB0aGlzLmFuc3dlciA9IChhd2FpdCByZXMuanNvbigpKS5hbnN3ZXJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMuYW5zd2VyID0gJ0Vycm9yISBDb3VsZCBub3QgcmVhY2ggdGhlIEFQSS4gJyArIGVycm9yXG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBBc2sgYSB5ZXMvbm8gcXVlc3Rpb246XG4gICAgPGlucHV0IHYtbW9kZWw9XCJxdWVzdGlvblwiIC8+XG4gIDwvcD5cbiAgPHA+e3sgYW5zd2VyIH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Опция `watch` также поддерживает путь, разделенный точками, в качестве ключа:

```js
export default {
  watch: {
    // Примечание: только простые пути. Выражения не поддерживаются.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

С Composition API мы можем использовать [функцию](/api/reactivity-core.html#watch) `watch` для запуска обратного вызова всякий раз, когда изменяется часть реактивного состояния:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Вопросы обычно заканчиваются вопросительным знаком. ;-)')

// watch работает прямо в ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Думаю...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Ошибка! Нет доступа к API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnXG5cbmNvbnN0IHF1ZXN0aW9uID0gcmVmKCcnKVxuY29uc3QgYW5zd2VyID0gcmVmKCdRdWVzdGlvbnMgdXN1YWxseSBjb250YWluIGEgcXVlc3Rpb24gbWFyay4gOy0pJylcblxud2F0Y2gocXVlc3Rpb24sIGFzeW5jIChuZXdRdWVzdGlvbikgPT4ge1xuICBpZiAobmV3UXVlc3Rpb24uaW5kZXhPZignPycpID4gLTEpIHtcbiAgICBhbnN3ZXIudmFsdWUgPSAnVGhpbmtpbmcuLi4nXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL3llc25vLnd0Zi9hcGknKVxuICAgICAgYW5zd2VyLnZhbHVlID0gKGF3YWl0IHJlcy5qc29uKCkpLmFuc3dlclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhbnN3ZXIudmFsdWUgPSAnRXJyb3IhIENvdWxkIG5vdCByZWFjaCB0aGUgQVBJLiAnICsgZXJyb3JcbiAgICB9XG4gIH1cbn0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBBc2sgYSB5ZXMvbm8gcXVlc3Rpb246XG4gICAgPGlucHV0IHYtbW9kZWw9XCJxdWVzdGlvblwiIC8+XG4gIDwvcD5cbiAgPHA+e3sgYW5zd2VyIH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

### Типы источников watch {#watch-source-types}

Первым аргументом `watch` могут быть различные типы реактивных "источников": это может быть ref (включая вычисляемые refs), реактивный объект, геттер-функция или массив из нескольких источников:

```js
const x = ref(0)
const y = ref(0)

// одиночный ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// геттер
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`сумма x + y равна: ${sum}`)
  }
)

// массив из нескольких источников
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x равен ${newX} и y равен ${newY}`)
})
```

Обратите внимание, что вы не можете наблюдать за свойством реактивного объекта таким образом:

```js
const obj = reactive({ count: 0 })

// это не сработает, потому что мы передаем число в watch()
watch(obj.count, (count) => {
  console.log(`count равен: ${count}`)
})
```

Вместо этого используйте геттер:

```js
// вместо этого используйте геттер:
watch(
  () => obj.count,
  (count) => {
    console.log(`count равен: ${count}`)
  }
)
```

</div>

## Глубокие наблюдатели {#deep-watchers}

<div class="options-api">

`watch` по умолчанию неглубокий. Обратный вызов сработает только тогда, когда отслеживаемому свойству будет присвоено новое значение. Он не сработает при изменении вложенного свойства. Если вы хотите, чтобы обратный вызов срабатывал на все вложенные мутации, вам нужно использовать глубокий наблюдатель:

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Примечание: `newValue` будет равно `oldValue` здесь
        // при вложенных мутациях до тех пор, пока сам объект
        // не будет заменен.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

Когда вы вызываете `watch()` непосредственно на реактивном объекте, он неявно создает глубокий наблюдатель - обратный вызов будет срабатывать на все вложенные мутации:

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // срабатывает при мутациях вложенного свойства
  // Примечание: `newValue` будет равно `oldValue`
  // потому что они оба указывают на один и тот же объект!
})

obj.count++
```

Это следует отличать от геттера, который возвращает реактивный объект — в последующих случаях обратный вызов сработает только в том случае, если геттер вернет другой объект:

```js
watch(
  () => state.someObject,
  () => {
    // сработает только при замене state.someObject
  }
)
```

Однако вы можете принудительно перевести второй случай в глубокий наблюдатель, явно используя опцию `deep`:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Примечание: `newValue` здесь будет равно `oldValue`
    // *если* state.someObject не был заменен
  },
  { deep: true }
)
```

</div>

:::warning Используйте с осторожностью
Глубокий наблюдатель требует обхода всех вложенных свойств в просматриваемом объекте и может быть дорогостоящим при использовании на больших структурах данных. Используйте его только в случае необходимости и помните о последствиях для производительности.
:::

<div class="options-api">

## Нетерпеливые наблюдатели \* {#eager-watchers}

`watch` по умолчанию ленив. Обратный вызов не будет вызываться до тех пор, пока наблюдаемый источник не изменится. Но в некоторых случаях мы можем захотеть, чтобы та же логика обратного вызова выполнялась немедленно. Например, мы можем захотеть запросить некоторые начальные данные, а затем повторно запрашивать их при каждом изменении состояния.

Мы можем заставить обратный вызов наблюдателя выполниться немедленно, объявив его с помощью объекта с функцией `handler` и параметром `immediate: true`:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // будет запущено сразу при создания компонента
      },
      // принудительное выполнение немедленного обратного вызова
      immediate: true
    }
  }
  // ...
}
```

Начальное выполнение функции-обработчика произойдет непосредственно перед `created` хуком. Vue уже обработает параметры `data`, `computed`, и `methods`, поэтому эти свойства будут доступны при первом вызове.
</div>

<div class="composition-api">

## `watchEffect()` \*\* {#watcheffect}

`watch()` является ленивым: обратный вызов не будет вызван до тех пор, пока наблюдаемый источник не изменится. Но в некоторых случаях мы можем захотеть, чтобы та же логика обратного вызова выполнялась немедленно. Например, мы можем захотеть получить некоторые начальные данные, а затем повторно получить их при каждом изменении состояния. Мы можем столкнуться с такой задачей:

```js
const url = ref('https://...')
const data = ref(null)

async function fetchData() {
  const response = await fetch(url.value)
  data.value = await response.json()
}

// запросить немедленно
fetchData()
// ...затем следим за изменением url
watch(url, fetchData)
```

Это можно упростить с помощью функции [`watchEffect()`](/api/reactivity-core.html#watcheffect). `watchEffect()` позволяет нам немедленно выполнить побочный эффект, автоматически отслеживая реактивные зависимости. Приведенный выше пример можно переписать следующим образом:

```js
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

Здесь обратный вызов будет выполнен немедленно. Во время его выполнения он также будет автоматически отслеживать `url.value` как зависимость (аналогично вычисляемым свойствам). Когда `url.value` изменится, обратный вызов будет запущен снова.

Вы можете посмотреть [этот пример](/examples/#fetching-data) с `watchEffect` и реактивной загрузкой данных в action.

:::tip Совет
`watchEffect` отслеживает зависимости только во время **синхронного** выполнения. При использовании его с асинхронным обратным вызовом будут отслеживаться только свойства, доступные до первого тика `await`.
:::

### `watch` vs. `watchEffect` {#watch-vs-watcheffect}

`watch` и `watchEffect` оба позволяют нам реактивно выполнять побочные эффекты. Их основное различие заключается в том, как они отслеживают свои реактивные зависимости:

- `watch` отслеживает только явно просматриваемый источник. Он не будет отслеживать ничего, к чему обращаются внутри обратного вызова. Кроме того, обратный вызов срабатывает только тогда, когда источник действительно изменился. `watch` отделяет отслеживание зависимости от побочного эффекта, давая нам более точный контроль над тем, когда должен сработать обратный вызов.

- `watchEffect`, с другой стороны, объединяет отслеживание зависимостей и побочный эффект в одну фазу. Он автоматически отслеживает каждое реактивное свойство, доступ к которому осуществляется во время его синхронного выполнения. Это более удобно и обычно приводит к более лаконичному коду, но делает его реактивные зависимости менее явными.

</div>

## Время обратного вызова {#callback-flush-timing}

Когда вы изменяете реактивное состояние, это может вызвать как обновления компонентов Vue, так и обратные вызовы наблюдателя, созданные вами.

По умолчанию созданные пользователем наблюдатели обратных вызовов вызываются **до** обновления компонентов Vue. Это означает, что если вы попытаетесь получить доступ к DOM внутри обратного вызова наблюдателя, DOM будет находиться в состоянии до того, как Vue применит какие-либо обновления.

Если вы хотите получить доступ к DOM в обратном вызове наблюдателя **после того**, как Vue обновит его,  вам нужно указать опцию `flush: 'post'`:

<div class="options-api">

```js
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

</div>

<div class="composition-api">

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

Post-flush `watchEffect()` также имеет удобный псевдоним, `watchPostEffect()`:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* выполняется после обновлений Vue */
})
```

</div>

<div class="options-api">

## `this.$watch()` \* {#this-watch}

Также можно императивно создавать наблюдатели, используя [`$watch()` метод экземпляра](/api/component-instance.html#watch):

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

Это полезно, когда вам нужно условно вызвать наблюдателя или наблюдать за чем-то только в ответ на взаимодействие пользователя. Это также позволяет остановить наблюдателя раньше времени.

</div>

## Остановка наблюдателя {#stopping-a-watcher}

<div class="options-api">

Наблюдатели, объявленные с помощью опции `watch` или экземпляра `$watch()`, автоматически останавливаются при размонтировании компонента. Поэтому в большинстве случаев вам не нужно беспокоиться о том, чтобы остановить наблюдателя самостоятельно.

В редких случаях, когда вам нужно остановить наблюдателя до того, как компонент размонтируется, API `$watch()` предоставляет функцию для этого:

```js
const unwatch = this.$watch('foo', callback)

// ...когда наблюдатель больше не нужен:
unwatch()
```

</div>

<div class="composition-api">

Наблюдатели, объявленные синхронно внутри `setup()` или `<script setup>`, привязываются к экземпляру компонента-владельца и автоматически останавливаются, когда компонент-владелец размонтируется. В большинстве случаев вам не нужно беспокоиться о том, чтобы остановить наблюдателя самостоятельно.

Ключевым моментом здесь является то, что наблюдатель должен быть создан **синхронно**. Если наблюдатель будет создан в асинхронном обратном вызове, он не будет привязан к компоненту-владельцу и должен быть остановлен вручную, чтобы избежать утечки памяти. Вот пример:

```vue
<script setup>
import { watchEffect } from 'vue'

// будет автоматически остановлено
watchEffect(() => {})

// ...это - нет!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

Чтобы вручную остановить watcher, используйте функцию возврата. Это работает как для `watch`, так и для `watchEffect`:

```js
const unwatch = watchEffect(() => {})

// ...позже, когда уже не нужно
unwatch()
```

Обратите внимание, что случаев, когда вам нужно создавать наблюдатели асинхронно, должно быть очень мало, и по возможности лучше предпочесть синхронное создание. Если вам нужно дождаться асинхронных данных, вы можете сделать логику работы наблюдателя условной:

```js
// данные, загружаемые асинхронно
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // делать что-то при загрузке данных
  }
})
```

</div>
