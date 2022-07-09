# Встановлення

Vue.js розроблено так, щоб його можна було поступово адаптувати. Це означає, що його можна інтегрувати в проект різними способами залежно від вимог.

Існує чотири основні способи додавання Vue.js до проекту:

1. Імпортуйте його як [пакет CDN](#cdn) на сторінці
2. Завантажте файли JavaScript і [розмістіть їх самостійно](#download-and-self-host)
3. Встановіть його за допомогою [npm](#npm)
4. Скористайтесь офіційним [CLI](#cli) для створення проекту, який допоможе налаштувати збірку з усім необхідним для сучасного робочого процесу інтерфейсу (наприклад, гаряче перезавантаження, перевірка помилок при збереженні та багато іншого)

## Примітки до випуску

Остання версія: ![npm](https://img.shields.io/npm/v/vue/next.svg)

Детальні примітки до випуску для кожної версії доступні на [GitHub](https://github.com/vuejs/vue-next/blob/master/CHANGELOG.md).

## Vue Devtools

> Зараз у бета-версії – інтеграція Vuex і Router все ще WIP

<VideoLesson href="https://vueschool.io/lessons/using-vue-dev-tools-with-vuejs-3?friend=vuejs" title="Дізнайтеся, як установити Vue Devtools у Vue School">Дізнайтеся, як встановити та використовувати Vue Devtools на безкоштовному уроці Vue School</VideoLesson>

Під час використання Vue ми також рекомендуємо встановити [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) у вашому браузері, щоб ви могли перевіряти та налагоджувати свої програми Vue у більш зручній для користувача системі. дружній інтерфейс.

[Отримати розширення Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

[Отримати доповнення Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

[Отримайте окрему програму Electron](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

## CDN

Для прототипування або навчання ви можете використовувати останню версію з:

```html
<script src="https://unpkg.com/vue@next"></script>
```

Для робочої версії ми рекомендуємо прив'язуватись до певного номеру версії та збірки, щоб уникнути неочікуваних поломок у новіших версіях.

## Завантажити та самостійно розмістити

Якщо ви хочете уникнути використання інструментів збірки, але не можете використовувати CDN у виробництві, ви можете завантажити відповідний файл `.js` і розмістити його на своєму власному веб-сервері. Потім ви можете включити його за допомогою тегу `<script>`, як у випадку з CDN.

Файли можна переглядати та завантажувати з CDN, наприклад [unpkg](https://unpkg.com/browse/vue@next/dist/) або [jsDelivr](https://cdn.jsdelivr.net/npm/vue@next/dist/). Роль різних файлів [пояснено пізніше](#explanation-of-different-builds), але зазвичай вам потрібна версія як для розробки, так і для виробництва.

## npm

npm є рекомендованим методом встановлення під час створення великомасштабних програм за допомогою Vue. Він чудово поєднується з комплектувальниками модулів, такими як [webpack](https://webpack.js.org/) або [Rollup](https://rollupjs.org/).

```bash
# остання стабільна версія
$ npm install vue@next
```

Vue також надає супутні інструменти для створення [однофайлових компонентів](../guide/single-file-component.html) (SFC). Якщо ви хочете використовувати SFC, вам також потрібно буде встановити `@vue/compiler-sfc`:

```bash
$ npm install -D @vue/compiler-sfc
```

Якщо ви працювали з Vue 2, зауважте, що `@vuecompiler-sfc` змінено на `vue-template-compiler`.

Окрім `@vuecompiler-sfc`, вам також знадобиться відповідний SFC-завантажувач або плагін для вибраного комплектувальника. Додаткову інформацію див. у [документації SFC](../guide/single-file-component.html).

У більшості випадків найкращим способом створення збірки webpack з мінімальною конфігурацією є використання Vue CLI.

## CLI

Vue пропонує [офіційний CLI](https://cli.vuejs.org/) для швидкого створення амбітних односторінкових програм. Він забезпечує налаштування збірки для сучасного робочого процесу інтерфейсу з усім необхідним. Потрібно всього кілька хвилин, щоб почати роботу з готовими до виробництва збірками з гарячим перезавантаженням та перевіркою на помилки при збереженні.

::: tip
CLI передбачає попереднє знання Node.js і пов’язаних інструментів збірки. Якщо ви новачок у Vue або зовнішніх інструментах збірки, ми наполегливо радимо ознайомитися з [посібником](./introduction.html) без жодних інструментів збирання перед використанням CLI.
:::

Для Vue 3 вам слід використовувати Vue CLI v4.5, що доступний на `npm` як `@vue/cli`. Щоб оновити, вам потрібно перевстановити останню версію `@vue/cli` глобально:

```bash
yarn global add @vue/cli
# АБО
npm install -g @vue/cli
```

Потім у вашому Vue-проекті запустіть

```bash
vue upgrade --next
```

## Vite

[Vite](https://vitejs.dev/) — це інструмент для створення веб-розробок, який забезпечує блискавичне обслуговування коду завдяки рідному підходу до імпорту модулів ES.

Проекти Vue можна швидко налаштувати за допомогою Vite, виконавши наступні команди у вашому терміналі.

З npm:

```bash
# npm 6.x
$ npm init vite@latest <project-name> --template vue

# npm 7+, потрібне додаткове подвійне тире:
$ npm init vite@latest <project-name> -- --template vue

$ cd <project-name>
$ npm install
$ npm run dev
```

Або з Yarn:

```bash
$ yarn create vite <project-name> --template vue
$ cd <project-name>
$ yarn
$ yarn dev
```

Або за допомогою pnpm:

```bash
$ pnpm create vite <project-name> -- --template vue
$ cd <project-name>
$ pnpm install
$ pnpm dev
```

## Пояснення різних збірок

У каталозі [`dist/` пакета npm](https://cdn.jsdelivr.net/npm/vue@3.0.2/dist/) ви знайдете багато різних збірок Vue.js. Ось огляд того, який файл `dist` слід використовувати залежно від варіанту використання.

### З CDN або якщо ви не використовуєте комплектувальник модулів

#### `vue(.runtime).global(.prod).js`:

- Для прямого використання через `<script src="...">` у браузері доступний глобальний Vue.
- Компіляція шаблону в браузері:
  - `vue.global.js` це «повна» збірка, яка включає як компілятор, так і середовище виконання, тому підтримує компіляцію шаблонів на льоту.
  - `vue.runtime.global.js` містить лише середовище виконання та вимагає попередньої компіляції шаблонів на етапі збірки.
- Inlines all Vue core internal packages - i.e. it's a single file with no dependencies on other files. This means you must import everything from this file and this file only to ensure you are getting the same instance of code.
- Містить жорстко закодовані гілки prod/dev, а збірка prod попередньо мінімізована. Використовуйте файли `.prod.js` для виробництва.
- 
:::tip Примітка
Глобальні збірки не є збірками [UMD](https://github.com/umdjs/umd). Вони побудовані як [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) і призначені лише для прямого використання через `<script src="...">`.
:::

#### `vue(.runtime).esm-browser(.prod).js`:

- Для використання через власний імпорт модулів ES (у браузері через `<script type="module">`).
- Використовує так само компіляцію під час виконання, вбудовування залежностей і жорстко закодовану поведінка prod/dev, як і глобальна збірка.

### З комплектувальником модулів

#### `vue(.runtime).esm-bundler.js`:

- Для використання з комплектувальниками модулів, такими як `webpack`, `rollup` і `parcel`.
- Залишає гілки prod/dev із `process.env.NODE_ENV guards` (має бути замінено комплектувальником)
- Не постачає мінімізовані збірки (це потрібно робити разом з рештою коду після комплектування)
- Імпортує залежності (наприклад, `@vue/runtime-core`, `@vue/runtime-compiler`)
  - Імпортовані залежності також є збірками ESM і, своєю чергою, імпортують свої залежності (наприклад, @vue/runtime-core імпортує @vue/reactivity)
  - Це означає, що ви **можете** встановити імпорт цих залежностей окремо, уникаючи різних їхніх копій, разом з тим переконайтеся, що всі вони використовують ту ж саму версію.
- Компіляція шаблону в браузері:
  - `vue.runtime.esm-bundler.js` **(за замовчуванням)** є лише середовищем виконання та вимагає попередньої компіляції всіх шаблонів. Це стандартний файл для комплектувальників (через поле модуля в `package.json`), оскільки під час використання комплектувальника шаблони зазвичай попередньо скомпільовані (наприклад, у файлах `.vue`).
  - `vue.esm-bundler.js`: включає компілятор часу виконання. Використовуйте це, якщо ви використовуєте комплектувальник, але все одно хочете компілювати шаблони під час виконання (наприклад, шаблони в DOM або динамічні рядкові шаблони JavaScript). Вам потрібно буде налаштувати свій комплектувальник на псевдонім цього файлу.

### Для візуалізації на стороні сервера

#### `vue.cjs(.prod).js`:

- For use in Node.js server-side rendering via `require()`.
- Для використання у серверній візуалізації Node.js через `require()`.
- Якщо ви комплектуєте свою програму з webpack із `target: 'node'` і налаштуєте модуль `vue` як зовнішній, це й буде збірка для завантаження.
- Файли dev/prod є попередньо зібраними, відповідний файл визначається автоматично на основі `process.env.NODE_ENV`.

## Середовище виконання + Компілятор ПРОТИ лише середовища виконання

Якщо вам потрібно скомпілювати шаблони на клієнті (наприклад, передати рядковий параметр до шаблону або підключити до елемента, використовуючи його HTML-код у DOM як шаблон), вам знадобиться компілятор і, отже, повна збірка:

```js
// для цього потрібен компілятор
Vue.createApp({
  template: '<div>{{ hi }}</div>'
})

// а для цього — ні
Vue.createApp({
  render() {
    return Vue.h('div', {}, this.hi)
  }
})
```

При використанні `vue-loader` шаблони у файлах `.vue` попередньо скомпільовані в JavaScript під час створення. Вам насправді не потрібен компілятор у фінальній збірці, тому ви можете використовувати збірку лише для виконання.