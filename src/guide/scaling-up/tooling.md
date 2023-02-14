# Інструменти {#tooling}

## Спробуйте онлайн {#try-it-online}

Вам не потрібно нічого встановлювати на свій комп’ютер, щоб випробувати однофайлові компоненти Vue – існують онлайн пісочниці, які дозволяють робити це прямо у браузері:

- [Пісочниця Vue SFC](https://sfc.vuejs.org)
  - Завжди розгортається з останнього коміту
  - Призначена для перевірки результатів компіляції компонентів
- [Vue + Vite на StackBlitz](https://vite.new/vue)
  - Середовище, схоже на IDE, що запускає фактичний сервер розробки Vite у браузері
  - Найближче до локального налаштування

Також рекомендується використовувати ці онлайн пісочниці, для надання репродукцій при повідомленні про помилки.

## Створення проекту {#project-scaffolding}

### Vite {#vite}

[Vite](https://vitejs.dev/) — це легкий і швидкий інструмент для розробки з першокласною підтримкою Vue SFC. Його створив Еван Ю, який також є автором Vue!

Щоб розпочати роботу з Vite + Vue, просто запустіть:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">$</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

Ця команда встановить та виконає [create-vue](https://github.com/vuejs/create-vue), офіційний інструмент створення проектів Vue.

- Щоб дізнатися більше про Vite, перегляньте [документацію Vite](https://vitejs.dev).
- Щоб налаштувати спеціальну поведінку Vue у проекті Vite, наприклад, передати параметри компілятору Vue, перегляньте документацію для [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme).

Обидві онлайн-пісочниці, згадані вище, також підтримують завантаження файлів як проект Vite.

### Vue CLI {#vue-cli}

[Vue CLI](https://cli.vuejs.org/) — це офіційний інструментарій для Vue на основі Webpack. Зараз він у режимі обслуговування, і ми рекомендуємо починати нові проекти з Vite, якщо ви не покладаєтеся на певні функції лише для Webpack. У більшості випадків Vite забезпечить чудовий досвід розробки.

Щоб отримати інформацію щодо переходу з Vue CLI на Vite:

- [Vue CLI -> Керівництво з міграції Vite від VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Інструменти/плагіни, які допомагають з автоматичною міграцією](https://github.com/vitejs/awesome-vite#vue-cli)

### Примітка щодо компіляції шаблонів у браузері {#note-on-in-browser-template-compilation}

У разі використання Vue без етапу збірки, шаблони компонентів записуються або безпосередньо в HTML сторінки, або як вбудовані рядки JavaScript. У таких випадках Vue потрібно надіслати компілятор шаблону в браузер, щоб виконати компіляцію шаблону на льоту. З іншого боку, компілятор буде непотрібним, якщо ми попередньо скомпілюємо шаблони з етапом збірки. Щоб зменшити розмір пакета клієнта, Vue надає [різні "збірки"](https://unpkg.com/browse/vue@3/dist/), оптимізовані для різних випадків використання.

- Файли збірки, які починаються з `vue.runtime.*` є **збірками лише для виконання**: вони не включають компілятор. Під час використання цих збірок усі шаблони мають бути попередньо скомпільовані на етапі збірки.

- Файли збірки, які не містять `.runtime`, є **повними збірками**: вони включають компілятор і підтримують компіляцію шаблонів безпосередньо в браузері. Однак вони збільшать навантаження на ~14 Кб.

Наші налаштування інструментів за промовчанням використовують збірку лише для виконання, оскільки всі шаблони в SFC попередньо скомпільовані. Якщо з якоїсь причини вам потрібна компіляція шаблону в браузері навіть із етапом збірки, ви можете зробити це, налаштувавши інструмент збірки на псевдонім `vue` на `vue/dist/vue.esm-bundler.js`.

Якщо ви шукаєте легшу альтернативу для використання без етапів збірки, перегляньте [petite-vue](https://github.com/vuejs/petite-vue).

## Підтримка IDE {#ide-support}

- Рекомендоване налаштування IDE: [VSCode](https://code.visualstudio.com/) + розширення [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Це розширення забезпечує підсвітку синтаксису, підтримку TypeScript та інтелектуальну функцію для шаблонних виразів і атрибутів компонентів.

  :::tip
  Volar замінює [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), наше попереднє офіційне розширення VSCode для Vue 2. Якщо у вас наразі встановлено Vetur, обов’язково вимкніть його в проектах Vue 3 .
  :::

- [WebStorm](https://www.jetbrains.com/webstorm/) також забезпечує чудову вбудовану підтримку для Vue SFC.

- Інші IDE, які підтримують [протокол обслуговування мови](https://microsoft.github.io/language-server-protocol/) (LSP), також можуть використовувати основні функції Volar через LSP:

  - Підтримка Sublime Text через [LSP-Volar](https://github.com/sublimelsp/LSP-volar).

  - Підтримка vim / Neovim через [coc-volar](https://github.com/yaegassy/coc-volar).

  - Підтримка emacs через [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/)

## Інструменти розробки браузера {#browser-devtools}

<VueSchoolLink href="https://vueschool.io/lessons/using-vue-dev-tools-with-vuejs-3" title="Безкоштовний урок про інструменти розробки браузера Vue.js"/>

Розширення браузера Vue devtools дозволяє досліджувати дерево компонентів додатку Vue, перевіряти стан окремих компонентів, відстежувати події керування станом та продуктивність.

![знімок екрана інструментів розробки браузера](https://raw.githubusercontent.com/vuejs/devtools/main/media/screenshot-shadow.png)

- [Документація](https://devtools.vuejs.org/)
- [Розширення Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Автономний додаток Electron](https://devtools.vuejs.org/guide/installation.html#standalone)

## TypeScript {#typescript}

Основна стаття: [використання Vue з TypeScript](/guide/typescript/overview).

- [Volar](https://github.com/johnsoncodehk/volar) забезпечує перевірку типів для SFC за допомогою блоків `<script lang="ts">`, включаючи шаблонні вирази та перевірку реквізитів між компонентами.

- Використовуйте [`vue-tsc`](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc) для виконання перевірки типів з командного рядка або для створення файлів `d.ts` для SFC.

## Тестування {#testing}

Основна стаття: [посібник з тестування](/guide/scaling-up/testing).

- [Cypress](https://www.cypress.io/) рекомендовано для E2E тестів. Його також можна використовувати для тестування одно-файлових компонентів Vue за допомогою програми [Cypress Component Test Runner](https://Документація.cypress.io/guides/component-testing/introduction).

- [Vitest](https://vitest.dev/) – це програма для тестування, створена членами команди Vue / Vite, яка зосереджена на швидкості. Вона спеціально розроблена для додатків на основі Vite, щоб забезпечити миттєвий зворотний зв'язок для тестування частини/компонента.

- [Jest](https://jestjs.io/) можна змусити працювати з Vite через [vite-jest](https://github.com/sodatea/vite-jest). Однак це рекомендується, лише якщо у вас є існуючі набори тестів на основі Jest, які потрібно перенести на налаштування на основі Vite, оскільки Vitest надає подібні функції з набагато ефективнішою інтеграцією.

## Статичний аналіз {#linting}

Команда Vue підтримує [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue), плагін [ESLint](https://eslint.org/), який підтримує статичний аналіз спеціально для одно-файлових компонентів.

Користувачі, які раніше використовували Vue CLI, можуть звикнути до конфігурації статичного аналізатора за допомогою Webpack. Однак, якщо використовується налаштування збірки на основі Vite, наша загальна рекомендація:

1. `npm install -D eslint eslint-plugin-vue`, потім дотримуйтеся [посібника з налаштування `eslint-plugin-vue`](https://eslint.vuejs.org/user-guide/#usage).

2. Налаштуйте розширення IDE ESLint, наприклад [ESLint для VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), щоб ви отримували повідомлення від статичного аналізатора прямо у своєму редакторі під час розробки. Це також дозволяє уникнути зайвих витрат на перевірку під час запуску сервер розробки.

3. Запустіть ESLint як частину команди виробничої збірки, щоб отримати повний звіт від статичного аналізатора перед публікацією.

4. (Необов’язково) Налаштуйте такі інструменти, як [lint-staged](https://github.com/okonet/lint-staged), щоб автоматично змінювати статично проаналізовані файли під час git коміту.

## Форматування {#formatting}

- Розширення VSCode [Volar](https://github.com/johnsoncodehk/volar) одразу забезпечує форматування для однофайлових компонентів Vue.

- Крім того, [Prettier](https://prettier.io/) забезпечує вбудовану підтримку форматування однофайлових компонентів Vue.

## Інтеграції з користувацькими блоками SFC {#sfc-custom-block-integrations}

Користувацькі блоки компілюються в імпорт до того самого файлу Vue з різними запитами. Обробка цих імпортів залежить від основного інструменту збірки.

- Якщо використовується Vite, для перетворення відповідних користувальницьких блоків у виконуваний JavaScript слід використовувати спеціальний плагін Vite. [Приклад](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- Якщо використовується Vue CLI або звичайний Webpack, то Webpack має бути налаштований на перетворення відповідних блоків. [Приклад](https://vue-loader.vuejs.org/guide/custom-blocks.html)

## Пакети нижнього рівня {#lower-level-packages}

### `@vue/compiler-sfc` {#vue-compiler-sfc}

- [Документація](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

Цей пакет є частиною основного моно репозиторію Vue і завжди публікується з тією ж версією, що й основний пакет `vue`. Він включений як залежний від основного пакета `vue` і проксі сервер у `vue/compiler-sfc`, тому вам не потрібно встановлювати його окремо.

Сам пакет надає утиліти нижчого рівня для обробки однофайлових компонентів Vue і призначений лише для авторів інструментів, яким потрібно підтримувати однофайлові компоненти Vue у користувацьких інструментах.

:::tip
Завжди віддавайте перевагу використанню цього пакета через глибокий імпорт `vue/compiler-sfc`, оскільки це гарантує, що його версія синхронізується з середовищем виконання Vue.
:::

### `@vitejs/plugin-vue` {#vitejs-plugin-vue}

- [Документація](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)

Офіційний плагін, який забезпечує підтримку однофайлових компонентів Vue у Vite.

### `vue-loader` {#vue-loader}

- [Документація](https://vue-loader.vuejs.org/)

Офіційний завантажувач, який забезпечує підтримку однофайлових компонентів Vue з Webpack. Якщо ви використовуєте Vue CLI, також перегляньте [документацію про зміну параметрів `vue-loader` у Vue CLI](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader) .

## Інші онлайн пісочниці {#other-online-playgrounds}

- [Пісочниця VueUse](https://play.vueuse.org)
- [Vue + Vite на Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue на CodeSandbox](https://codesandbox.io/s/vue-3)
- [Vue на Codepen](https://codepen.io/pen/editor/vue)
- [Vue на Components.studio](https://components.studio/create/vue3)
- [Vue на WebComponents.dev](https://webcomponents.dev/create/cevue)

<!-- TODO ## Backend Framework Integrations -->
