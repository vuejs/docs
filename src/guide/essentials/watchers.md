# Спостерігачі {#watchers}

## Базовий приклад {#basic-example}

Обчислювані властивості дозволяють нам декларативно обчислювати похідні значення. Однак є випадки, коли нам потрібно створити «побічні ефекти» у відповідь на зміни стану - наприклад, змінити DOM або змінити іншу частину стану на основі результату асинхронної операції.

<div class="options-api">

За допомогою Опційного API ми можемо використовувати параметр [`watch`](/api/options-state.html#watch), щоб запускати функцію щоразу, коли змінюється реактивна властивість:

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Запитання зазвичай містять знак питання. ;-)'
    }
  },
  watch: {
    // ця функція запускатиметься щоразу, коли питання зміниться 
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
        this.answer = 'Помилка! Неможливо досягнути до API. ' + error
      }
    }
  }
}
```

```vue-html
<p>
  Поставте запитання «так»/«ні»:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9VM1u00AQfpXBFzsiWYtrSIt65ATcfTHJpnEVr83uOm4URaINAiEhekHhhHiAXqpCaMhfpTzB7hsx6z+SFCEl8c7szHzj75vJyDqJYzJIqNW0WqLNg1gee4yexxGX0KFdP+lLGHkMoONL36nlZwBOZcJZaQG8SaiQQcSaYNv10ukzkVKOLvVV3ah7NdeX+Fyrtb4CdYfHO3WLzg94+g1qpaf6Ql/qK/x+Mvdr9C9gP4/A00bNzgHG5jHO0FJftnvNsh3XBf0eMfQ7PcG0BRrTEvJeT/SFWqgbrDlXKzUzaIiL0R/VRr81XelJHTBko5ZqfoBvimCjaKAzT8wxSwIcRtNXxbkOUb9TGhV1AEEXdsNIwDr0/EXXsZ/ZNTiGxpOdWADZCwQ5pfIkY9OplTfZ6++xEFLZizqi4sEXQ9aGndS/ZbOiuT5whAJ9QaZWSMpnQkhBLwbx4W4j7YgJicoLzPBTP5DQpUi7Y/ekjEXTdYdUsIiksuv6cWBXjR6iOXkyFiJnAhmr1Yq76s2gbfQEh3Ie8Ydk7PT9HVVaoZBLI+kjUN/UDO2N+mW0w+nagPqJsqJM6gfqNzGqZy44efmcgA2PIQP5J6kew0/LrdYCDUnDuO9LihZAK84eAKYNM7s4Jbf4OytGbW9wtteZsdgu3e01eqbbZTPPbgUsTiQMGmHUof0jzypnybPAzYHcHAkBR6NirWA8zt0tt2rKqltBaFa3EfpxRi6udcaeV1wIz6rGw7Nw743tWaWCots2fwZngkT81MUT4QmTQUgJFWHjNY9SQTkW9qxiybMaLjoHlDc4xUHmqON/ah6EPqhbEm+N/wC/wui2)

Параметр `watch` також підтримує шлях, розділений крапками як ключ:

```js
export default {
  watch: {
    // Примітка: тільки прості шляхи. Вирази не підтримуються.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

За допомогою композиційного API ми можемо використовувати функцію [`watch`](/api/reactivity-core.html#watch), щоб ініціювати зворотний виклик щоразу, коли частина реактивного стану змінюється:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Запитання зазвичай містять знак питання. ;-)')

// watch працює безпосередньо на референції
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Думаю...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Помилка! Неможливо досягнути до API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Поставте запитання «так»/«ні»:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[Спробуйте в пісочниці](https://sfc.vuejs.org/#eNp9U8Fu00AQ/ZXBF9siXotrSIN65ATc92LcNXUUr83uOiaKfKA9cEHkgsoJ8QG9RIXSkDRByhes/4hZb1yRgnqIvfP2zczzm8nMOS4KMimZ03cGMhZpoUAyVRZDytOsyIWCGQiW9KCKVHwKNSQiz8DFDJdyyuOcSwVvSyZVmnM4MlzPdf3uJuKyYqLD9Re90L/1sjnD90ZvmjnoGzze6CsEP+DpF+jb5qJ535w1c/x9NPcbxFdwmEfgaeCbNpS3wrxOQg8iOeUxeJxVr/aYD0dDmFEOkCYHFyTlJ+zdC1T2zPVhCMET3/JgL5xMonHJUL6rPzfn+lYvmk+EEPx0w1Fi2tEB7PcKJpEdVVGqIGFGmHuqVCH7YThlkuekUkkYFamRbvPuNfJsLtYhI5lzz/eJZVh+DXE7B48JkYs7tf/R+01vUe9Sr/VKLx6B/qqvMd7qn4gs0e8t6B96i07P9Xd09By9XbYQHL98TsCFx9D22Pc1L3zUqHsQ2kXBFcFAsawYR4phBDAwe2P4pr2ZIs7rCp/Xds6Ho99dtsFqtw53l4hc7NZ9mz1IeVEqmARZfsLGR9TppksdCG2j0HbChrNZt2V1beFBeCfK6Tl2jYMsKlpHcdFb0+j+QlKn39lIHdxrE1Onm5pMYvP3GEmSizchnogouUozRpjMgtciryTaPsIqvb9qhAhOmAgEwwUTOLwHat6j/lO3c96p/wARy4B1)

### Вихідні типи спостерігачів {#watch-source-types}

Першим аргументом `watch` можуть бути різні типи реактивних "джерел": це може бути референція (включаючи обчислювані референції), реактивний об’єкт, функція отримання або масив із кількох джерел:

```js
const x = ref(0)
const y = ref(0)

// одиночна референція
watch(x, (newX) => {
  console.log(`x — це ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`сума x + y: ${sum}`)
  }
)

// масив із кількох джерел
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x це ${newX}, y це ${newY}`)
})
```

Зверніть увагу, що ви не можете спостерігати властивість реактивного об'єкта, як тут:

```js
const obj = reactive({ count: 0 })

// це не спрацює, тому що ми передаємо число в watch()
watch(obj.count, (count) => {
  console.log(`кількість: ${count}`)
})
```

Краще використовувати getter:

```js
// краще використовувати getter:
watch(
  () => obj.count,
  (count) => {
    console.log(`кількість: ${count}`)
  }
)
```

</div>

## Глибинні спостерігачі {#deep-watchers}

<div class="options-api">

`watch` за промовчанням є поверхневим: зворотний виклик запускатиметься лише тоді, коли спостережуваним властивостям було призначено нове значення, але він не запускатиметься під час зміни вкладених властивостей. Якщо ви хочете, щоб зворотний виклик запускався при всіх вкладених змінах, вам потрібно використовувати глибинний спостерігач:

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Примітка: Тут, `newValue` дорівнюватиме `oldValue`
        // при вкладених змінах при умові,
        // що сам об’єкт не було замінено.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

Коли ви викликаєте `watch()` безпосередньо для реактивного об'єкта, це неявно створить глибинний спостерігач - зворотний виклик буде запущено для всіх вкладених змін:

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // спрацьовує при зміні вкладених властивостей
  // Примітка: тут `newValue` дорівнюватиме `oldValue`
  // тому що вони обидва вказують на один і той же об'єкт!
})

obj.count++
```

Це слід відрізняти від того, як працює getter, що повертає реактивний об'єкт – в останньому випадку зворотний виклик запускатиметься, лише якщо геттер повертає інший об’єкт:

```js
watch(
  () => state.someObject,
  () => {
    // спрацьовує лише тоді, коли state.someObject замінено
  }
)
```

Однак, ви можете примусово перевести другий випадок у глибинний спостерігач, явно використовуючи опцію `deep`:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Примітка: тут `newValue` дорівнюватиме `oldValue`
    // якщо state.someObject **не було** замінено
  },
  { deep: true }
)
```

</div>

:::warning Використовувати з обережністю
Глибоке спостереження вимагає обходу всіх вкладених властивостей у спостережуваному об'єкті та може бути дорогим при використанні на великих структурах даних. Використовуйте його лише за необхідності та остерігайтеся наслідків щодо продуктивності.
:::

## Негайні спостерігачі {#eager-watchers}

`watch` за промовчанням є лінивим: зворотний виклик не буде викликано, доки не зміниться спостережуване джерело. Але в деяких випадках ми можемо захотіти, щоб та сама логіка зворотного виклику запускалася невідкладно - наприклад, ми можемо захотіти отримати деякі початкові дані, а потім повторно отримати дані щоразу, коли відповідний стан змінюється.

<div class="options-api">

Ми можемо змусити зворотний виклик спостерігача виконуватися негайно, оголосивши його за допомогою об'єкта з функцією `handler` та параметром `immediate: true`:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // це буде запущено відразу після створення компонента.
      },
      // негайне виконання зворотного виклику
      immediate: true
    }
  }
  // ...
}
```

Початкове виконання функції обробки відбудеться безпосередньо перед `created` хуком. Vue вже обробить параметри `data`, `computed` і `methods`, тому ці властивості будуть доступні під час першого виклику.
  
</div>

<div class="composition-api">

Ми можемо змусити зворотний виклик спостерігача виконуватися негайно, передавши опцію `immediate: true`:

```js
watch(source, (newValue, oldValue) => {
  // виконується негайно, а потім знову, коли `source` змінюється
}, { immediate: true })
```

</div>

<div class="composition-api">

## `watchEffect()` \*\* {#watcheffect}

Зворотний виклик спостерігача зазвичай використовує той самий реактивний стан, що й джерело. Наприклад, розглянемо наступний код, який використовує спостерігач для завантаження віддаленого ресурсу щоразу, коли змінюється посилання `todoId`:

```js
const todoId = ref(1)
const data = ref(null)

watch(todoId, async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
}, { immediate: true })
```

Зокрема, зверніть увагу, як спостерігач використовує `todoId` двічі, один раз як джерело, а потім знову в зворотному виклику.

Це можна спростити за допомогою [`watchEffect()`](/api/reactivity-core.html#watcheffect). `watchEffect()` дозволяє нам негайно виконати побічний ефект, автоматично відстежуючи реактивні залежності ефекту. Наведений вище приклад можна переписати так:

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

Тут зворотний виклик запуститься негайно, немає потреби вказувати `immediate: true`. Під час виконання `todoId.value` буде автоматично відстежуватись як залежність (подібно до обчислюваних властивостей). Щоразу, коли `todoId.value` змінюється, зворотній виклик буде виконуватись. З `watchEffect()` нам більше не потрібно явно вказувати `todoId`, як вихідне значення.

Ви можете переглянути [цей приклад](/examples/#fetching-data) з `watchEffect` і реактивним отримання даних на практиці.

Для подібних прикладів із лише однією залежністю перевага `watchEffect()` відносно невелика. Але для спостерігачів, які мають кілька залежностей, використання `watchEffect()` знімає тягар необхідності підтримувати список залежностей вручну. Крім того, якщо вам потрібно спостерігати за кількома властивостями у вкладеній структурі даних, `watchEffect()` може виявитися ефективнішим, ніж глибокий спостерігач, оскільки він відстежуватиме лише властивості, які використовуються у зворотному виклику, а не рекурсивно відстежуватиме їх всіх.

:::tip
`watchEffect` відстежує лише залежності під час свого **синхронного** виконання. У разі використання з асинхронним зворотним викликом відстежуватимуться лише властивості, доступ до яких було отримано до першої позначки `await`.
:::

### `watch` та `watchEffect` {#watch-vs-watcheffect}

`watch` і `watchEffect` дозволяють нам реактивно виконувати побічні ефекти. Їх головна відмінність полягає в тому, яким чином вони відстежують свої реактивні залежності:

- `watch` відстежує лише явне спостережуване джерело. Він не відстежуватиме нічого, до чого звертаються всередині зворотного виклику. Крім того, зворотний виклик запускається лише тоді, коли джерело дійсно змінилося. `watch` відокремлює відстеження залежностей від побічного ефекту, що дає нам точніший контроль над тим, коли зворотний виклик повинен запускатися.
  
- `watchEffect`, з іншого боку, поєднує відстеження залежностей і побічний ефект в одну фазу. Він автоматично відстежує кожну реактивну властивість, до якої звертаються під час його синхронного виконання. Це зручніше і зазвичай призводить до терсерного коду, але робить його реактивні залежності менш явними.

</div>

## Час спрацювання {#callback-flush-timing}

Коли ви змінюєте реактивний стан, це може запускати як оновлення компонентів Vue, так і зворотні виклики спостерігача, створені вами.

За замовчуванням користувацькі зворотні виклики спостерігача, викликаються **перед** оновленням компонента Vue. Це означає, що якщо ви спробуєте отримати доступ до DOM у зворотному виклику спостерігача, DOM буде в стані до того, як Vue застосовує будь-які оновлення.

Якщо ви хочете отримати доступ до DOM у зворотному виклику спостерігача **після** оновлення Vue, вам потрібно вказати опцію `flush: 'post'`:

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

Постспрацювання `watchEffect()` також має зручний псевдонім, `watchPostEffect()`:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* виконується після оновлення Vue */
})
```

</div>

<div class="options-api">

## `this.$watch()` \* {#this-watch}

Також можливе імперативне створення спостерігачів за допомогою [`watch()` методу екземпляра](/api/component-instance.html#watch):

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

Це корисно, коли вам потрібно умовно налаштувати спостерігач або спостерігати щось лише у відповідь на взаємодію користувача. Це також дозволяє раніше зупинити спостерігача.

</div>

## Зупинення спостерігача {#stopping-a-watcher}

<div class="options-api">

Спостерігачі, оголошені за допомогою параметра `watch` або методу екземпляра `$watch()`, автоматично зупиняються, коли компонент-власник демонтується, тому в більшості випадків вам не потрібно самостійно турбуватися про зупинку спостерігача.

У рідкісних випадках, коли вам потрібно зупинити спостерігач до того, як компонент-власник демонтується, API `$watch()` повертає для цього функцію:

```js
const unwatch = this.$watch('foo', callback)

// ...коли спостерігач більше не потрібен:
unwatch()
```

</div>

<div class="composition-api">

Спостерігачі, оголошені синхронно всередині `setup()` або `<script setup>`, прив'язані до екземпляра компонента-власника та будуть автоматично зупинені, коли компонент-власник буде демонтовано. У більшості випадків вам не потрібно турбуватися про те, щоб зупинити спостерігача самостійно.

Ключовим тут є те, що спостерігач має бути створений **синхронно**: якщо спостерігач створюється в асинхронному зворотному виклику, він не буде прив'язаний до компонента-власника та має бути зупинений вручну, щоб уникнути витоку пам’яті. Ось приклад:

```vue
<script setup>
import { watchEffect } from 'vue'

// цей буде автоматично зупинено
watchEffect(() => {})

// ...а цей — ні!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

Щоб вручну зупинити спостерігач, скористайтеся повернутою функцією вручну. Це працює як для `watch`, так і для `watchEffect`:

```js
const unwatch = watchEffect(() => {})

// ...пізніше, коли більше не потрібно
unwatch()
```

Зауважте, що існує дуже мало випадків, коли вам потрібно створити спостерігачі асинхронно, і коли це можливо, слід віддавати перевагу синхронному створенню. Якщо вам потрібно дочекатися деяких асинхронних даних, ви можете натомість зробити логіку свого спостерігача умовною:

```js
// дані, які завантажуються асинхронно
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // щось зробити, коли дані завантажились
  }
})
```

</div>
