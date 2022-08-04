---
footer: false
---

# Швидкий старт

Виходячи з ваших потреб та уподобань, ви можете використовувати Vue із засобами збірки або без них.

## Використання за домогою засобів збірки

Налаштування збірки дозволяє нам використовувати [однофайлові компоненти Vue](/guide/scaling-up/sfc) (SFC). Офіційна збірка Vue базована на [Vite](https://vitejs.dev) — сучасному, легкому та надзвичайно швидкому інструменті для проведення робіт на фронтенді.

### Онлайн

Ви можете спробувати Vue із SFC онлайн на [StackBlitz](https://vite.new/vue). StackBlitz запускає збірку на основі Vite безпосередньо в браузері, тому вона майже ідентична локальній конфігурації, але не вимагає встановлення будь-чого на вашій машині.

### Локально

:::tip Передумови

- Знайомство з командним рядком
- Встановіть [Node.js](https://nodejs.org/) версії 15.0 або новішу
  :::

Щоб створити проект Vue із підтримкою збірки на вашому комп’ютері, виконайте наступну команду в командному рядку (без знаку `>`):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

Ця команда встановить і виконає [create-vue](https://github.com/vuejs/create-vue), офіційний інструмент створення проектів Vue. Вам буде надано підказки щодо ряду додаткових функцій, таких як TypeScript з підтримкою тестування:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">назва-вашого-проекту-без-пробілів</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи використовувати TypeScript)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи використовувати JSX стиль)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте додати Vue Router для розробки односторінкових додатків - SPA)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте додати Pinia для керування станом додатку)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте використовувати Vitest для юніт-тестів)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте використовувати Cypress для наскрізного тестування)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте використовувати Eslint для перевірки на правильність написання коду)</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span> (Чи бажаєте додати Prettier для автоматичного форматування коду)</span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">назва-вашого-проекту-без-пробілів</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Якщо ви не впевнені щодо варіанту, просто виберіть «No» (Ні), натиснувши Enter. Після створення проекту дотримуйтесь інструкцій для вставнолення залежностей та запуску сервера в режимі розробки:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">назва-вашого-проекту-без-пробілів</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

Вітаємо, тепер у вас має бути запущений перший проект на Vue! Зауважте, що приклади компонентів у створеному проекті написані за допомогою [Композиційного API](/guide/introduction.html#composition-api) і `<script setup>`, а не [Параметричного API](/guide/introduction.html#options-api). Ось кілька додаткових порад:

- Рекомендовано використовувати [Visual Studio Code](https://code.visualstudio.com/) в якості вашої IDE ї [розширенням Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Якщо ви користуєтесь іншими редакторами, перевірте [можливості щодо їхньої підтримки](/guide/scaling-up/tooling.html#ide-support).
- Стосовно інших інструментів, зокрема інтеграції з бекенд фреймворками, перегляньте наш [Гід по інструментах](/guide/scaling-up/tooling.html).
- Для поглибленого вивчення інструментів, на яких оснований Vite, перегляньте [документацію по Vite](https://vitejs.dev).
- Якщо ви користуєтесь TypeScript, пропонуємо до вашої уваги [Гід по використанню TypeScript](typescript/overview.html).

Коли ви будете готові до запуску свого додатку у продакшн, виконайте наступне:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

Виконання цієї команди створить в директорії `./dist` збірку вашого додатку, готового до продакшну. Прочитайте [Гід по підготовці до продакшну](/guide/best-practices/production-deployment.html) для отримання деталей.

[Наступні кроки >](#наступні-кроки)

## Без засобів збірки

Щоб розпочати розробку на Vue без збірки, просто скопіюйте наступний код в файл HTML та відкрийте його у браузері:

```html
<script src="https://unpkg.com/vue@3"></script>

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

Цей приклад використовує глобальну збірку Vue, яка робить доступним весь API через глобальну змінну `Vue`. Наприклад, для того, щоб скористатись `ref` потрібно виконати наступне:

```js
const { createApp, ref } = Vue
```

Хоч глобальна збірка працює без проблем, для загальної узгодженості в документації ми надалі будемо використовувати [ES модулі](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Для того, щоб користуватись Vue через ES модулі, пропонується наступний HTML:

```html
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

Зверніть увагу, що ми можемо виконувати імпорт безпосередньо з `'vue'` в нашому коді завдяки блоку `<script type="importmap">`, покладаючись на базову підтримку браузером [Карт імпорту](https://caniuse.com/import-maps).

Ви можете додавати записи для інших залежностей до карти імпорту — просто переконайтесь, що вони вказують на саме ES модуль бібліотеки, яку ви збираєтесь використовувати. 

:::tip Підтримка Карт імпорту браузерами
Карти імпорту підтримуються по замовчуванню браузерами сімейства Chromium, тому ми радимо використовувати Chrome чи Edge під час навчального процесу.

Якщо ви використовуєте Firefox, лише версії 102+ підтримують карти імпорту, та ця можливість повинна бути увімкнена через параметр `dom.importMaps.enabled` в `about:config`.

Якщо ж ваш улюблений браузер ще не підтримує карти імпорту, ви можете забезпечити таку підтримку за допомогою [es-module-shims](https://github.com/guybedford/es-module-shims).
:::

:::warning Не для продакшну
Конфігурацію через карти імпорту є зміст використовувати лише в навчальних цілях, але якщо ви збираєтесь використовувати Vue без інструментів збірки в продакшні, обов'язково перегляньте [Гід по підготовці до продакшну](/guide/best-practices/production-deployment.html#without-build-tools).
:::

### Подача через HTTP

По заглибленні в гід, надалі нам треба буде розбити наш код на окремі файли Javascript, щоб, таким чином, було легще обслуговувати додаток. Наприклад:

```html
<!-- index.html -->
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

Щоб це запрацювало, вам потрібно буде віддавати ваш HTML через протокол `http://` замість протоколу `file://`. Для запуску локального HTTP-серверу, встановіть спочатку [Node.js](https://nodejs.org/en/), а потім виконайте `npx serve` в командному рядку у директорії з вашим HTML файлом. Ви також можете використовувати будь-який інший HTTP сервер, що має можливість віддавати статичні файли з коректними MIME-типами.

Можливо, ви помітили, що імпортовані шаблони компонентів вказані у вигляді JavasScript рядка. Якщо ви використовуєте VSCode, ви можете встановити розширення [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) та додавати коментар `/*html*/` перед такими рядками, щоб VSCode підсвічував для них синтаксис.

## Наступні кроки

Якщо ви пропустили [Вступ](/guide/introduction), ми наполегливо радимо його прочитати перед тим, як рухатись далі цією документацією.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Продовжити з Гідом</p>
    <p class="next-steps-caption">The guide walks you through every aspect of the framework in full detail.</p>
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
