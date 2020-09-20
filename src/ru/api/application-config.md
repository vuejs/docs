# Конфигурация приложения

`config` это объект, содержащий глобальные параметры Vue. Можно изменять эти свойства, описанные ниже, перед загрузкой приложения:

```js
const app = Vue.createApp({})

app.config = {...}
```

## devtools

- **Тип:** `boolean`

- **По умолчанию:** `true` (`false` в production-сборках)

- **Использование:**

```js
app.config.devtools = true
```

Конфигурация доступа vue-devtools для инспекций приложения. Определяет, должен ли Vue разрешать [vue-devtools](https://github.com/vuejs/vue-devtools) проводить проверку. Значение по умолчанию для разработки `true` и `false` для production. Установите `true` чтобы работало и в production.

## errorHandler

- **Тип:** `Function`

- **По умолчанию:** `undefined`

- **Использование:**

```js
app.config.errorHandler = (err, vm, info) => {
  // Обработка ошибки
  // `info` это Vue-специфичная ошибка
  // например в каком хуке жизненного цикла была найдена ошибка
}
```

Добавление обработчика для отловленных ошибок во время функции рендеринга компонентов и наблюдателя. Обработчик получает аргументами ошибку и экземпляр приложения.

> Сервисы отслеживания ошибок [Sentry](https://sentry.io/for/vue/) и [Bugsnag](https://docs.bugsnag.com/platforms/browsers/vue/) предлагают официальную интеграцию с использованием этого свойства.

## warnHandler

- **Тип:** `Function`

- **По умолчанию:** `undefined`

- **Использование:**

```js
app.config.warnHandler = function(msg, vm, trace) {
  // `trace` это трассировка иерархии компонентов
}
```

Определение пользовательского обработчика для предупреждений Vue во время выполнения. Работает в режиме разработки и игнорируется в production.

## globalProperties

- **Тип:** `[key: string]: any`

- **По умолчанию:** `undefined`

- **Использование:**

```js
app.config.globalProperties.foo = 'bar'

app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})
```

Добавляет глобальное свойство, к которому можно обратиться из любого компонента в приложении. Свойства компонента имеют приоритет, в случае совпадения имен.

Этот подход заменяет расширение `Vue.prototype` во Vue 2.x:

```js
// Раньше
Vue.prototype.$http = () => {}

// Сейчас
const app = Vue.createApp({})
app.config.globalProperties.$http = () => {}
```

## isCustomElement

- **Тип:** `(tag: string) => boolean`

- **По умолчанию:** `undefined`

- **Использование:**

```js
// любой элемент, начинающийся с 'ion-' будет распознаваться как пользовательский
app.config.isCustomElement = tag => tag.startsWith('ion-')
```

Указывает метод распознавания пользовательских элементов, определенных извне Vue (например, использование Web Components API). Если компонент совпадает с условием, то его не нужно регистрировать и Vue не выдаст предупреждения `Unknown custom element`.

> Обратите внимание, нет необходимости указывать HTML и SVG тэги - парсер Vue проверяет их автоматически

## optionMergeStrategies

- **Тип:** `{ [key: string]: Function }`

- **По умолчанию:** `{}`

- **Использование:**

```js
const app = Vue.createApp({
  mounted() {
    console.log(this.$options.hello)
  }
})

app.config.optionMergeStrategies.hello = (parent, child, vm) => {
  return `Hello, ${child}`
}

app.mixin({
  hello: 'Vue'
})

// 'Hello, Vue
```

Определение пользовательской функции слияния опций.

Функция слияния получает первым аргументом значения опций родительского элемента, вторым дочернего элемента
и третьим контекст действующего экземпляра Vue.

- **См. также:** [Пользовательские функции слияния](../guide/mixins.md#custom-option-merge-strategies)

## performance

- **Тип:** `boolean`

- **По умолчанию:** `false`

- **Использование**:

Установите значение `true`, чтобы включить отслеживание производительности во время инициализации, компиляции, отрисовки и обновления компонента в инструментах разработчика браузера. Работает только в режиме разработки в браузерах, которые поддерживают [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API.
