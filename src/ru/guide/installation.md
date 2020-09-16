# Установка

## История изменений

Последняя бета-версия: 3.0.0-rc.11

Подробная информация об изменениях в каждой версии доступна на [GitHub](https://github.com/vuejs/vue-next/releases).

## Инструменты разработчика

> В настоящий момент в бета-тестировании

> Vue Devtools для Vue 3 требуется как минимум `vue@^3.0.0-rc.1`

При использовании Vue рекомендуем также установить [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) для браузера, которое позволит легче проверять и отлаживать приложения на Vue в удобном интерфейсе.

[Расширение для Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

[Расширение для Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

[Автономное Electron-приложение](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

## CDN

Для прототипирования и изучения можно использовать последнюю версию с CDN:

```html
<script src="https://unpkg.com/vue@next"></script>
```

Для production рекомендуем указывать конкретную версию и сборку, чтобы избежать неожиданных поломок при выходе новых версий:

## NPM

NPM — рекомендованный способ установки при создании больших приложений на Vue. Он прекрасно сочетается с системами сборки, такими как [Webpack](https://webpack.js.org/) или [Browserify](http://browserify.org/). Vue также предоставляет сопутствующие инструменты для создания [однофайловых компонентов](../guide/single-file-component.md).

```bash
# установка последней стабильной сборки
$ npm install vue@next
```

## CLI

Vue предоставляет [официальный CLI](https://github.com/vuejs/vue-cli) для быстрого создания каркаса одностраничных приложений. Предлагаемые шаблоны содержат всё необходимое для организации современной фронтенд-разработки. За несколько минут можно получить работающую конфигурацию с горячей перезагрузкой модулей, линтингом кода при сохранении и настроенной конфигурацией production-сборки. Подробнее в [документации Vue CLI](https://cli.vuejs.org/ru/).

:::tip Совет
Использование CLI предполагает наличие знаний о Node.js и связанных с ней инструментов сборки. Если вы новичок во Vue или в инструментах для сборки фронтенда, то настоятельно рекомендуем сначала изучить <a href="./">руководство</a> без применения каких-либо системы сборки, прежде чем начинать использовать CLI.
:::

Для Vue 3 требуется использовать Vue CLI v4.5, доступная в `npm` через `@vue/cli@next`. Для обновления необходимо переустановить последнюю версию `@vue/cli` глобально:

```bash
yarn global add @vue/cli@next
# ИЛИ
npm install -g @vue/cli@next
```

После установки обновлённой версии в проекте Vue необходимо выполнить

```bash
vue upgrade --next
```

## Vite

[Vite](https://github.com/vitejs/vite) — это инструмент для создания сборок веб-приложений, предоставляющий исключительно быструю обработку кода, благодаря применяемому подходу по использованию нативных импортов ES-модулей.

Развернуть проект на Vue используя Vite можно с помощью следующих команд.

Используя NPM:

```bash
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

или используя Yarn:

```bash
$ yarn create vite-app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

## Объяснение различий сборок

В [папке `dist/` NPM-пакета](https://cdn.jsdelivr.net/npm/vue@3.0.0-rc.11/dist/) можно обнаружить несколько различных сборок Vue.js. Ниже краткое объяснение какой файл из `dist` и для каких случаев должен использоваться.

### Из CDN или без систем сборки

#### `vue(.runtime).global(.prod).js`:

- For direct use via `<script src="...">` in the browser, exposes the Vue global.
- In-browser template compilation:
  - `vue.global.js` is the "full" build that includes both the compiler and the runtime so it supports compiling templates on the fly.
  - `vue.runtime.global.js` contains only the runtime and requires templates to be pre-compiled during a build step.
- Inlines all Vue core internal packages - i.e. it's a single file with no dependencies on other files. This means you must import everything from this file and this file only to ensure you are getting the same instance of code.
- Contains hard-coded prod/dev branches, and the prod build is pre-minified. Use the `*.prod.js` files for production.

:::tip Примечание
Global builds are not [UMD](https://github.com/umdjs/umd) builds. They are built as [IIFEs](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) and are only meant for direct use via `<script src="...">`.
:::

#### vue(.runtime).esm-browser(.prod).js:

- For usage via native ES modules imports (in browser via `<script type="module">`.
- Shares the same runtime compilation, dependency inlining and hard-coded prod/dev behavior with the global build.

### С системой сборки

#### vue(.runtime).esm-bundler.js:

- For use with bundlers like `webpack`, `rollup` and `parcel`.
- Leaves prod/dev branches with `process.env.NODE_ENV guards` (must be replaced by bundler)
- Does not ship minified builds (to be done together with the rest of the code after bundling)
- Imports dependencies (e.g. `@vue/runtime-core`, `@vue/runtime-compiler`)
  - Imported dependencies are also esm-bundler builds and will in turn import their dependencies (e.g. @vue/runtime-core imports @vue/reactivity)
  - This means you **can** install/import these deps individually without ending up with different instances of these dependencies, but you must make sure they all resolve to the same version.
- In-browser template compilation:
  - `vue.runtime.esm-bundler.js` **(default)** is runtime only, and requires all templates to be pre-compiled. This is the default entry for bundlers (via module field in `package.json`) because when using a bundler templates are typically pre-compiled (e.g. in `*.vue` files).
  - `vue.esm-bundler.js`: includes the runtime compiler. Use this if you are using a bundler but still want runtime template compilation (e.g. in-DOM templates or templates via inline JavaScript strings). You will need to configure your bundler to alias vue to this file.

### Для рендеринга на стороне сервера (SSR)

#### `vue.cjs(.prod).js`:

- For use in Node.js server-side rendering via `require()`.
- If you bundle your app with webpack with `target: 'node'` and properly externalize `vue`, this is the build that will be loaded.
- The dev/prod files are pre-built, but the appropriate file is automatically required based on `process.env.NODE_ENV`.

## Runtime + Компилятор vs. Runtime-only

Если необходимо компилировать шаблоны на клиенте (например, передаёте строку в опцию `template` или монтируете к элементу DOM, используя его HTML в качестве шаблона), то потребуется компилятор шаблонов, а с ним и подключение полной сборки:

```js
// для такого требуется компилятор шаблонов
Vue.createApp({
  template: '<div>{{ hi }}</div>'
})

// для такого можно обойтись без него
Vue.createApp({
  render() {
    return Vue.h('div', {}, this.hi)
  }
})
```

При использовании `vue-loader` шаблоны внутри файлов `*.vue` будут скомпилированы в JavaScript на этапе сборки. Поэтому необходимости в компиляторе шаблонов в итоговой сборке уже не будет и можно использовать более лёгкую runtime-only сборку.
