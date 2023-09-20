# Плагіни {#plugins}

## Вступ {#introduction}

Плагіни — це самодостатній код, який зазвичай додає функціональність до Vue на рівні app. Ось як ми встановлюємо плагін:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* додаткові опції */
})
```

Плагін визначається або як об'єкт, який надає метод `install()`, або просто як функція, яка діє як сама функція встановлення. Функція встановлення отримує [екземпляр app](/api/application) разом із додатковими опціями, яки передаються до `app.use()`, якщо такі є:

```js
const myPlugin = {
  install(app, options) {
    // налаштування app
  }
}
```

Немає чітко визначеної сфери застосування для плагіна, але найбільш поширені сценарії, коли плагіни корисні, включають:

1. Реєстрація одного або кількох глобальних компонентів або користувацьках директив у [`app.component()`](/api/application#app-component) та [`app.directive()`](/api/application#app-directive).

2. Зробити ресурс [injectable](/guide/components/provide-inject) у всьому додатку через виклик [`app.provide()`](/api/application#app-provide).

3. Додавання деяких властивостей або методів глобального екземпляра, приєднавши їх до [`app.config.globalProperties`](/api/application#app-config-globalproperties).

4. Бібліотека, яка повинна виконати певну комбінацію вищезазначеного (наприклад, [vue-router](https://github.com/vuejs/vue-router-next)).

## Написання плагіну {#writing-a-plugin}

Щоб краще зрозуміти, як створювати власні плагіни Vue.js, ми створимо дуже спрощену версію плагіна, який відображає рядки `i18n` (скорочено від [Інтернаціоналізація](https://en.wikipedia.org/wiki/Internationalization_and_localization)).

Почнемо з налаштування об'єкта плагіна. Рекомендується створити його в окремому файлі та експортувати, як показано нижче, щоб тримати логіку окремо.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // Тут міститься код плагіна
  }
}
```

Ми хочемо створити функцію перекладу. Ця функція отримає розділений крапками рядок `key`, який ми будемо використовувати для пошуку перекладу рядка в опціях, наданих користувачем. Це передбачає використання в шаблонах:

```vue-html
<h1>{{ $translate('greetings.hello') }}</h1>
```

Оскільки ця функція має бути глобально доступною в усіх шаблонах, ми зробимо її такою, приєднавши до `app.config.globalProperties` нашого плагіна:

```js{4-11}
// plugins/i18n.js
export default {
  install: (app, options) => {
    // введення глобально доступного методу $translate()
    app.config.globalProperties.$translate = (key) => {
      // отримати вкладену властивість у `options`,
      // використовуючи `key` як шлях
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

Наша функція `$translate` візьме рядок, наприклад, `greetings.hello`, загляне в надану користувачем конфігурацію та поверне перекладене значення.

Об'єкт, що містить перекладені ключі, слід передати плагіну під час інсталяції за допомогою додаткових параметрів до `app.use()`:

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

Тепер наш початковий вираз `$translate('greetings.hello')` буде замінено на `Bonjour!` під час виконання.

Дивіться також: [Розширення глобальних властивостей](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

:::tip
Використовуйте глобальні властивості рідко, оскільки це може швидко заплутати, якщо в застосунку використовується занадто багато глобальних властивостей, введених різними плагінами.
:::

### Provide / Inject з плагінами {#provide-inject-with-plugins}

Плагіни також дозволяють нам використовувати `inject`, щоб надати функцію або атрибут користувачам плагіна. Наприклад, ми можемо дозволити застосунку мати доступ до параметра `options`, щоб мати можливість використовувати об'єкт з перекладами.

```js{10}
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.provide('i18n', options)
  }
}
```

Користувачі плагіну тепер зможуть додавати його параметри у свої компоненти за допомогою ключа `i18n`:

<div class="composition-api">

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

</div>
<div class="options-api">

```js
export default {
  inject: ['i18n'],
  created() {
    console.log(this.i18n.greetings.hello)
  }
}
```

</div>
