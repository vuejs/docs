---
footer: false
---

# Швидкий старт {#quick-start}

## Спробуйте Vue онлайн {#try-vue-online}

- Щоб швидко відчути смак Vue, спробуйте його безпосередньо в нашій [пісочниці](https://play.vuejs.org/#eNo9jU0KwjAQha8yZqOCWtyWWPAe2QQbtdCmIZ0UIQTUQ7j1DoLgMZIbObVYGGbeN29+PNsbs+mdYjnj3cFWBguh1cW0FqFUR+lqBC80QClRLpajBrAKndV/Ami6Uw7z+EzX+Imv9Ej3FaTbqOJ7Nh/nwlAoUfBs+kaAqjG1REUEwM/bwvvhJITAM6Jft9LGIfTrpi1VvROMfMHI4tm0zcIXmzJMuw==).

- Якщо ви віддаєте перевагу звичайному HTML без етапу збірки, ви можете використовувати цей [JSFiddle](https://jsfiddle.net/z6d9k84y/), як відправну точку.

- Якщо ви вже знайомі з Node.js і концепціями інструментів збірки, також можете спробувати повноцінну відправну збірку, прямо у вашому браузері на [StackBlitz](https://vite.new/vue).

## Створення застосунку Vue {#creating-a-vue-application}

:::tip Передумови

- Знайомство з командним рядком
- Встановіть [Node.js](https://nodejs.org/uk/) версії 16.0 або новішу
  :::

У цій секції ми розповімо, як створити Vue [одно-сторінковий додаток](/guide/extras/ways-of-using-vue#single-page-application-spa) на вашому локальному комп'ютері. Створений проєкт буде використовувати збірку, яка заснована на [Vite](https://vitejs.dev), і дозволяє використовувати [одно-файлові компоненти](/guide/scaling-up/sfc) Vue (SFC).

Переконайтеся, що у вас встановлено найновішу версію [Node.js](https://nodejs.org/uk/), і ваш поточний робочий каталог є тим, у якому ви збираєтеся створити проект. Виконайте наступну команду в командному рядку (без знаку `>`):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm create vue@latest</span></span></code></pre></div>

Ця команда встановить і виконає [create-vue](https://github.com/vuejs/create-vue), офіційний інструмент створення проєктів Vue. Вам буде надано підказки щодо ряду додаткових функцій, таких як TypeScript з підтримкою тестування:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">назва-вашого-проєкту-без-пробілів</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи використовувати TypeScript)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи використовувати JSX стиль)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте додати Vue Router для розробки односторінкових додатків - SPA)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте додати Pinia для керування станом додатку)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте використовувати Vitest для модульних тестів)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add an End-to-End Testing Solution? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Cypress / Playwright</span> (Чи бажаєте використовувати рішення для наскрізного тестування)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте використовувати Eslint для перевірки на правильність написання коду)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте додати Prettier для автоматичного форматування коду)</span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">назва-вашого-проєкту-без-пробілів</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Якщо ви не впевнені щодо варіанту, просто виберіть «No» (Ні), натиснувши Enter. Після створення проєкту дотримуйтесь інструкцій для встановлення залежностей та запуску сервера в режимі розробки:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">назва-вашого-проєкту-без-пробілів</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

Вітаємо, тепер у вас має бути запущений перший проєкт на Vue! Зауважте, що приклади компонентів у створеному проєкті написані за допомогою [Композиційного API](/guide/introduction#composition-api) і `<script setup>`, а не [Опційним API](/guide/introduction#options-api). Ось кілька додаткових порад:

- Рекомендовано використовувати [Visual Studio Code](https://code.visualstudio.com/) в якості вашої IDE ї [розширенням Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Якщо ви користуєтесь іншими редакторами, перевірте [можливості щодо їхньої підтримки](/guide/scaling-up/tooling#ide-support).
- Стосовно інших інструментів, зокрема інтеграції з бекенд фреймворками, перегляньте наш [Гід по інструментах](/guide/scaling-up/tooling).
- Для поглибленого вивчення інструментів, на яких оснований Vite, перегляньте [документацію по Vite](https://vitejs.dev).
- Якщо ви користуєтесь TypeScript, пропонуємо до вашої уваги [Гід по використанню TypeScript](typescript/overview).

Коли ви будете готові до запуску свого додатку у продакшн, виконайте наступне:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

Виконання цієї команди створить в директорії `./dist` збірку вашого додатка, готового до продакшну. Прочитайте [Гід з підготовки до продакшну](/guide/best-practices/production-deployment) для отримання деталей.

[Наступні кроки >](#next-steps)

## Використання Vue з CDN {#using-vue-from-cdn}

Ви можете використовувати Vue безпосередньо з CDN за допомогою тегу `script`:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Тут ми використовуємо [unpkg](https://unpkg.com/), але ви можете також використовувати будь-які CDN, які подають npm пакети, наприклад [jsdelivr](https://www.jsdelivr.com/package/npm/vue) або [cdnjs](https://cdnjs.com/libraries/vue). Звичайно, ви можете також завантажити цей файл і подавати його локально.

Під час використання Vue із CDN відсутній «етап збірки». Це значно спрощує налаштування та підходить для вдосконалення статичного HTML або інтеграції з базовою структурою. Однак, ви не зможете використовувати синтаксис одно-файлового компонента (SFC).

### Використання глобальної збірки {#using-the-global-build}

Наведене вище посилання завантажує _глобальну збірку_ Vue, де всі API верхнього рівня представлені як властивості глобального об'єкта `Vue`. Ось повний приклад використання глобальної збірки:

<div class="options-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Привіт, Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Демонстрація JSFiddle](https://jsfiddle.net/to2dk19q/)

</div>

<div class="composition-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Привіт, Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[Codepen demo](https://codepen.io/vuejs-examples/pen/eYQpQEG)

:::tip
У багатьох прикладах Композиційний API у посібнику використовуватиметься синтаксис `<script setup>`, для якого потрібні інструменти для збірки. Якщо ви збираєтеся використовувати Композиційний API без кроку збірки, ознайомтеся з використанням [параметра `setup()`](/api/composition-api-setup).
:::

</div>

### Використання збірки модулів ES {#using-the-es-module-build}

У решті документації ми будемо в основному використовувати синтаксис [модулів ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Більшість сучасних браузерів зараз підтримують модулі ES, тому ми можемо використовувати Vue із CDN через нативні модулі ES, як тут:

<div class="options-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'Привіт, Vue!'
      }
    }
  }).mount('#app')
</script>
```

</div>

<div class="composition-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Привіт, Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

</div>

Зверніть увагу, що ми використовуємо `<script type="module">`, а імпортована URL-адреса CDN натомість вказує на **збірку модулів ES** Vue.

<div class="options-api">

[JSFiddle demo](https://jsfiddle.net/yyx990803/vo23c470/)

</div>
<div class="composition-api">

[Codepen demo](https://codepen.io/vuejs-examples/pen/MWzazEv)

</div>

### Увімкнення карт імпорту {#enabling-import-maps}

У наведеному вище прикладі ми імпортуємо з повної URL-адреси CDN, але в решті документації ви побачите такий код:

```js
import { createApp } from 'vue'
```

Ми можемо навчити браузер, де знаходити імпорт `vue` за допомогою [карт імпорту](https://caniuse.com/import-maps):

<div class="options-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Привіт, Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Демонстрація JSFiddle](https://jsfiddle.net/bLu9e3kj/)

</div>

<div class="composition-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[Codepen demo](https://codepen.io/vuejs-examples/pen/YzRyRYM)

</div>

Ви також можете додавати записи для інших залежностей до карти імпорту — але переконайтесь, що вони вказують на саме ES модуль бібліотеки, яку ви збираєтесь використовувати.

:::tip Підтримка карт імпорту браузерами
Імпорт карт — відносно нова функція браузера. Обов'язково використовуйте веб-переглядач у [діапазоні підтримки](https://caniuse.com/import-maps). Зокрема, він підтримується лише в Safari 16.4+.
:::

:::warning Примітки щодо виробничого використання
У наведених прикладах наразі використовується збірка Vue для розробки. Якщо ви збираєтеся використовувати Vue із CDN у виробництві, обов’язково перегляньте [Посібник із розгортання виробництва](/guide/best-practices/production-deployment#without-build). -інструменти).
:::

### Розділення модулів {#splitting-up-the-modules}

В процесі проходження гіда, нам може бути корисно розбивати наш код на окремі файли JavaScript, щоб, таким чином, було легше обслуговувати додаток. Наприклад:

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

<div class="options-api">

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>лічильник {{ count }}</div>`
}
```
</div>
<div class="composition-api">

```js
// my-component.js
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>лічильник: {{ count }}</div>`
}
```

</div>

Якщо ви відкриєте `index.html` безпосередньо в браузері, то виявиться, що нічого не працює, тому що ES модулі не можуть працювати за межами протоколу `file://`, який використовується браузером при відкритті локальних файлів.

З міркувань безпеки модулі ES можуть працювати лише через протокол `http://`, який використовують браузери, коли відкривають сторінки в Інтернеті. Щоб модулі ES працювали на нашій локальній машині, нам потрібно обслуговувати `index.html` через протокол `http://` з локальним сервером HTTP. 

Для запуску локального HTTP-сервера, встановіть спочатку [Node.js](https://nodejs.org/uk/), а потім виконайте `npx serve` в командному рядку у директорії з вашим HTML файлом. Ви також можете використовувати будь-який інший HTTP сервер, що має можливість віддавати статичні файли з коректними MIME-типами.

Можливо, ви помітили, що імпортовані шаблони компонентів вказані у вигляді JavasScript рядка. Якщо ви використовуєте VSCode, ви можете встановити розширення [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) та додавати коментар `/*html*/` перед такими рядками, щоб VSCode підсвічував для них синтаксис.

## Наступні кроки {#next-steps}

Якщо ви пропустили [Вступ](/guide/introduction), ми наполегливо радимо його прочитати перед тим, як рухатись далі цією документацією.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Продовжити з Гідом</p>
    <p class="next-steps-caption">Гід допоможе вам розглянути кожен аспект фреймворку якомога детальніше.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Спробувати Посібник</p>
    <p class="next-steps-caption">Для тих, хто полюбляє навчатись через практику.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Переглянути Приклади</p>
    <p class="next-steps-caption">Перегляньте приклади базових можливостей і поширених проблем під час розробки користувацьких інтерфейсів.</p>
  </a>
</div>
