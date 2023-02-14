---
footer: false
---

# Швидкий старт {#quick-start}

## Спробуйте Vue онлайн {#try-vue-online}

- Щоб швидко відчути смак Vue, спробуйте його безпосередньо в нашій [пісочниці](https://sfc.vuejs.org/#eNp9UFFqwzAMvYqmn26QxOw3ZIXdwz9Zo7YpsWNkJxuEwLZD7Hd3GAx2jORGU5qljBYKxtbTk5+e1OGjc0nbEKaY+Q2XLqy1pRdXc4CCtnlTBei0BSjykN/ezTEAU2jYLgjA+F0Kq+FzfB1+hq/xY3yPYHybo+H7ZjXX9dMjl5xMnboJCGRclQcSBJDt79ddN0lC32dK0DFbWtcEaGNTF1Q9aBReo1CZOv3GCEszWY9N7pKDr62MdfSo/wivMV1ca5S5J6xxH4LzqVJ+u5mWcfBJzTslUcKNDaWhhLyJn7h+9sQirDH6p6Ek2RLHTLYgJr6meVZ6obtsCPtf0fmTIA==).

- Якщо ви віддаєте перевагу звичайному HTML без етапу збірки, ви можете використовувати цей [JSFiddle](https://jsfiddle.net/z6d9k84y/), як відправну точку.

- Якщо ви вже знайомі з Node.js і концепціями інструментів збірки, також можете спробувати повноцінну відправну збірку, прямо у вашому браузері на [StackBlitz](https://vite.new/vue).

## Створення застосунку Vue {#creating-a-vue-application}

:::tip Передумови

- Знайомство з командним рядком
- Встановіть [Node.js](https://nodejs.org/uk/) версії 16.0 або новішу
  :::

У цій секції ми розповімо, як створити Vue [одно-сторінковий додаток](/guide/extras/ways-of-using-vue.html#одно-сторінковий-додаток-spa) на вашому локальному комп'ютері. Створений проєкт буде використовувати збірку, яка заснована на [Vite](https://vitejs.dev), і дозволяє використовувати [одно-файлові компоненти](/guide/scaling-up/sfc) Vue (SFC).

Переконайтеся, що у вас встановлена актуальна версія [Node.js](https://nodejs.org/uk/), і виконайте наступну команду в командному рядку (без знаку `>`):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

Ця команда встановить і виконає [create-vue](https://github.com/vuejs/create-vue), офіційний інструмент створення проєктів Vue. Вам буде надано підказки щодо ряду додаткових функцій, таких як TypeScript з підтримкою тестування:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">назва-вашого-проекту-без-пробілів</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи використовувати TypeScript)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи використовувати JSX стиль)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте додати Vue Router для розробки односторінкових додатків - SPA)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте додати Pinia для керування станом додатку)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте використовувати Vitest для модульних тестів)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте використовувати Cypress для наскрізного тестування)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте використовувати Eslint для перевірки на правильність написання коду)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте додати Prettier для автоматичного форматування коду)</span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">назва-вашого-проекту-без-пробілів</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Якщо ви не впевнені щодо варіанту, просто виберіть «No» (Ні), натиснувши Enter. Після створення проєкту дотримуйтесь інструкцій для встановлення залежностей та запуску сервера в режимі розробки:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">назва-вашого-проекту-без-пробілів</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

Вітаємо, тепер у вас має бути запущений перший проєкт на Vue! Зауважте, що приклади компонентів у створеному проєкті написані за допомогою [Композиційного API](/guide/introduction.html#composition-api) і `<script setup>`, а не [Опційним API](/guide/introduction.html#options-api). Ось кілька додаткових порад:

- Рекомендовано використовувати [Visual Studio Code](https://code.visualstudio.com/) в якості вашої IDE ї [розширенням Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Якщо ви користуєтесь іншими редакторами, перевірте [можливості щодо їхньої підтримки](/guide/scaling-up/tooling.html#ide-support).
- Стосовно інших інструментів, зокрема інтеграції з бекенд фреймворками, перегляньте наш [Гід по інструментах](/guide/scaling-up/tooling.html).
- Для поглибленого вивчення інструментів, на яких оснований Vite, перегляньте [документацію по Vite](https://vitejs.dev).
- Якщо ви користуєтесь TypeScript, пропонуємо до вашої уваги [Гід по використанню TypeScript](typescript/overview.html).

Коли ви будете готові до запуску свого додатку у продакшн, виконайте наступне:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

Виконання цієї команди створить в директорії `./dist` збірку вашого додатка, готового до продакшну. Прочитайте [Гід з підготовки до продакшну](/guide/best-practices/production-deployment.html) для отримання деталей.

[Наступні кроки >](#наступні-кроки)

## Використання Vue з CDN {#using-vue-from-cdn}

Ви можете використовувати Vue безпосередньо з CDN за допомогою тегу `script`:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Тут ми використовуємо [unpkg](https://unpkg.com/), але ви можете також використовувати будь-які CDN, які подають npm пакети, наприклад [jsdelivr](https://www.jsdelivr.com/package/npm/vue) або [cdnjs](https://cdnjs.com/libraries/vue). Звичайно, ви можете також завантажити цей файл і подавати його локально.

Під час використання Vue із CDN відсутній «етап збірки». Це значно спрощує налаштування та підходить для вдосконалення статичного HTML або інтеграції з базовою структурою. Однак, ви не зможете використовувати синтаксис одно-файлового компонента (SFC).

### Використання глобальної збірки {#using-the-global-build}

Наведене вище посилання завантажує *глобальну збірку* Vue, де всі API верхнього рівня представлені як властивості глобального об’єкта `Vue`. Ось повний приклад використання глобальної збірки:

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

### Використання збірки модулів ES {#using-the-es-module-build}

У решті документації ми будемо в основному використовувати синтаксис [модулів ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Більшість сучасних браузерів зараз підтримують модулі ES, тому ми можемо використовувати Vue із CDN через нативні модулі ES, як тут:

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

Зверніть увагу, що ми використовуємо `<script type="module">`, а імпортована URL-адреса CDN натомість вказує на **збірку модулів ES** Vue.

[Демонстрація JSFiddle](https://jsfiddle.net/4nbeyd2g/)

### Увімкнення карт імпорту {#enabling-import-maps}

У наведеному вище прикладі ми імпортуємо з повної URL-адреси CDN, але в решті документації ви побачите такий код:

```js
import { createApp } from 'vue'
```

Ми можемо навчити браузер, де знаходити імпорт `vue` за допомогою [карт імпорту](https://caniuse.com/import-maps):

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

Ви також можете додавати записи для інших залежностей до карти імпорту — але переконайтесь, що вони вказують на саме ES модуль бібліотеки, яку ви збираєтесь використовувати.

:::tip Підтримка Карт імпорту браузерами
Карти імпорту підтримуються за замовчуванням браузерами сімейства Chromium, тому ми радимо використовувати Chrome чи Edge під час навчального процесу.

Якщо ви використовуєте Firefox, вони доступні за замовчуванням у версії 108+ або через параметр `dom.importMaps.enabled` в `about:config` для версій 102+.

Якщо ж ваш улюблений браузер ще не підтримує карти імпорту, ви можете забезпечити таку підтримку за допомогою [es-module-shims](https://github.com/guybedford/es-module-shims).
:::

:::warning Не для продакшну
Конфігурацію через карти імпорту є зміст використовувати лише в навчальних цілях, але якщо ви збираєтесь використовувати Vue без інструментів збірки в продакшні, обов'язково перегляньте [Гід по підготовці до продакшну](/guide/best-practices/production-deployment.html#without-build-tools).
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

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>лічильник {{ count }}</div>`
}
```

Якщо ви відкриєте `index.html` безпосередньо в браузері, то виявиться, що нічого не працює, тому що ES модулі не можуть працювати за межами протоколу `file://`. В цьому випадку вам потрібно подавати файл `index.html` через протокол `http://`, через локальний HTTP сервер.

Для запуску локального HTTP-сервера, встановіть спочатку [Node.js](https://nodejs.org/uk/), а потім виконайте `npx serve` в командному рядку у директорії з вашим HTML файлом. Ви також можете використовувати будь-який інший HTTP сервер, що має можливість віддавати статичні файли з коректними MIME-типами.

Можливо, ви помітили, що імпортовані шаблони компонентів вказані у вигляді JavasScript рядка. Якщо ви використовуєте VSCode, ви можете встановити розширення [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) та додавати коментар `/*html*/` перед такими рядками, щоб VSCode підсвічував для них синтаксис.

### Використання Композиційного API без засобів збірки {#using-composition-api-without-a-build-step}

Багато прикладів для Композиційного API використовують синтаксис `<script setup>`. Якщо ви бажаєте використовувати Композиційний API без засобів збірки, ознайомтесь з використанням [функції `setup()`](/api/composition-api-setup.html).

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
