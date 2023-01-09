---
footer: false
---

# Быстрый старт {#quick-start}

## Поиграться с Vue онлайн {#try-vue-online}

- Чтобы быстро попробовать Vue, можно воспользоваться [Песочницей](https://sfc.vuejs.org/#eNo9j01qAzEMha+iapMWOjbdDm6gu96gG2/cjJJM8B+2nBaGuXvlpBMwtj4/JL234EfO6toIRzT1UObMexvpN6fCMNHRNc+w2AgwOXbPL/caoBC3EjcCCPU0wu6TvE/wlYqfnnZ3ae2PXHKMfiwQYArZOyYhAHN+2y9LnwLrarTQ7XeOuTFch5Am8u8WRbcoktGPbnzFOXS3Q3BZXWqKkuRmy/4L1eK4GbUoUTtbPDPnOmpdj4ee/1JVKictlSot8hxIUQ3Dd0k/lYoMtrglwfUPkXdoJg==).

- Если предпочитаете простое HTML-окружение без каких-либо шагов сборки, то можно начать с [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/).

- Если уже знакомы с Node.js и концепцией инструментов сборки, то можно попробовать полноценное окружение с шагом сборки прямо в браузере на [StackBlitz](https://vite.new/vue).

## Создание приложения Vue {#creating-a-vue-application}

:::tip Предварительные условия

- Знакомство с командной строкой
- Установленная [Node.js](https://nodejs.org/) 16.0 версии или выше
:::

В этом разделе разберёмся как развернуть на локальной машине [одностраничное приложение](/guide/extras/ways-of-using-vue.html#single-page-application-spa) Vue. Созданный проект будет использовать шаг сборки с помощью [Vite](https://vitejs.dev), и позволит использовать во Vue [однофайловые компоненты](/guide/scaling-up/sfc) (SFCs).

Убедитесь, что установлена актуальная версия [Node.js](https://nodejs.org/), после чего выполните следующую команду в командной строке (символ `>` вводить не нужно):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

Команда установит и запустит [create-vue](https://github.com/vuejs/create-vue) — официальный инструмент для развёртывания проектов Vue. Также после запуска будут выводиться подсказки для возможности выбора ряда дополнительных функций, таких как TypeScript или поддержка тестирования:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Если не уверены в каком-либо варианте, просто выбирайте `No`, нажав клавишу Enter. После создания проекта следуйте инструкциям по установке зависимостей и запуске сервера разработки:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

Теперь уже должен быть запущен первый проект! Обратите внимание, что примеры компонентов в сгенерированном проекте написаны с использованием [Composition API](/guide/introduction.html#composition-api) и `<script setup>`, а не [Options API](/guide/introduction.html#options-api). Вот несколько дополнительных советов:

- Рекомендуемая конфигурация IDE — [Visual Studio Code](https://code.visualstudio.com/) + [расширение Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Если используете другие редакторы, ознакомьтесь с разделом [поддержка IDE](/guide/scaling-up/tooling.html#ide-support).
- Больше информации об инструментарии, включая интеграцию с бэкенд-фреймворками, обсуждается в разделе [Инструментарий](/guide/scaling-up/tooling.html).
- Чтобы узнать больше об используемом инструменте сборки Vite, ознакомьтесь с [документацией Vite](https://vitejs.dev).
- Если решили использовать TypeScript, ознакомьтесь с инструкцией по [использованию TypeScript](typescript/overview.html).

Когда будете готовы опубликовать приложение в production, выполните команду:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

Она создаст сборку приложения для production в каталоге `./dist`. Ознакомьтесь с руководством по [развёртыванию в production](/guide/best-practices/production-deployment.html), чтобы узнать больше о публикации приложения в production.

[Следующие шаги >](#next-steps)

## Использование Vue с помощью CDN {#using-vue-from-cdn}

Можно подключать Vue напрямую из CDN через тег script:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Здесь использовали [unpkg](https://unpkg.com/), но также можно использовать любой другой CDN, который публикует npm-пакеты, например [jsdelivr](https://www.jsdelivr.com/package/npm/vue) или [cdnjs](https://cdnjs.com/libraries/vue). И конечно же, всегда можно скачать этот файл и заниматься его хостингом его самостоятельно.

При использовании Vue из CDN нет никакого «шага сборки». Это значительно упрощает конфигурацию и подходит для улучшения статического HTML или для интеграции с бэкенд-фреймворком. Но в таком случае не получится использовать синтаксис однофайловых компонентов (SFC).

### Использование глобальной сборки {#using-the-global-build}

Указанная выше ссылка загружает *глобальную сборку* Vue, где все API верхнего уровня доступны как свойства глобального объекта `Vue`. Вот полный пример с использованием глобальной сборки:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Привет Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Демо в JSFiddle](https://jsfiddle.net/yyx990803/nw1xg8Lj/)

### Использование сборки в виде ES-модуля {#using-the-es-module-build}

В остальной части документации в основном используется синтаксис [ES-модулей](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Большинство современных браузеров теперь поддерживают ES-модули нативно, поэтому можно подключать Vue из CDN как нативный ES-модуль таким образом:

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'Привет Vue!'
      }
    }
  }).mount('#app')
</script>
```

Обратите внимание, что используется `<script type="module">`, а импортированный CDN URL указывает на **сборку в виде ES-модуля**.

[Демо в JSFiddle](https://jsfiddle.net/yyx990803/vo23c470/)

### Использование Import maps {#enabling-import-maps}

В примере выше импортируем по полному CDN URL, но дальше в документации увидим код, подобный этому:

```js
import { createApp } from 'vue'
```

Чтобы импортировать в таком лаконичном формате нужно указать браузеру местоположение импорта `vue` с помощью [Import Maps (карту импорта)](https://caniuse.com/import-maps):

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
        message: 'Привет Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Демо в JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/)

Также можно добавлять записи и для других зависимостей в import map — но убедитесь, что они указывают на версию ES-модуля библиотеки, которую собираетесь использовать.

:::tip Поддержка Import Maps в браузере
Import maps поддерживается по умолчанию в браузерах на базе Chromium, поэтому рекомендуем использовать Chrome или Edge в процессе обучения.

Если используете Firefox, то он поддерживает только с версии 102+ и в настоящее время поддержка должна быть включена вручную через опцию `dom.importMaps.enabled` в `about:config`.

Если предпочитаете браузер, который пока не поддерживает import maps, можно воспользоваться полифилом [es-module-shims](https://github.com/guybedford/es-module-shims).
:::

:::warning Примечание при использовании в production
До сих пор в примерах использовалась сборка Vue для разработки — если собираетесь подключать Vue из CDN в production, обязательно ознакомьтесь с руководством [по публикации в production](/guide/best-practices/production-deployment.html#without-build-tools).
:::

### Разделение на модули {#splitting-up-the-modules}

По мере углубления в руководство может понадобиться разделить код на отдельные файлы JavaScript, чтобы ими было легче управлять. Например:

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
  template: `<div>Счётчик: {{ count }}</div>`
}
```

Если напрямую открыть `index.html` в браузере, то обнаружите, что он выдаёт ошибку, потому что ES-модули не могут работать по протоколу `file://`. Чтобы исправить эту ситуацию, необходимо раздавать `index.html` по протоколу `http://` с помощью локального HTTP-сервера.

Для запуска локального HTTP-сервера для начала нужно установить [Node.js](https://nodejs.org/en/), а затем запустить команду `npx serve` в том же каталоге, где находится HTML-файл. Можно использовать и любой другой HTTP-сервер, который умеет хостить статические файлы с правильными MIME-типами.

Как можно заметить, шаблон импортируемого компонента указан как строка JavaScript. При использовании VSCode можно установить расширение [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) и добавить к этой строке префикс комментарием `/*html*/` чтобы получить подсветку синтаксиса в них.

### Использование Composition API без шага сборки {#using-composition-api-without-a-build-step}

Во многих примерах с Composition API используется синтаксис `<script setup>`. Если собираетесь использовать Composition API без шага сборки, ознакомьтесь сначала с документацией по [опции `setup()`](/api/composition-api-setup.html).

## Следующие шаги {#next-steps}

Если пропустили [Введение](/guide/introduction), настоятельно рекомендуем прочитать его, прежде чем переходить к остальной части документации.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Руководство</p>
    <p class="next-steps-caption">В руководстве каждый аспект фреймворка разбирается подробно.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Самоучитель</p>
    <p class="next-steps-caption">Для тех, кто предпочитает учиться на практике.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Примеры</p>
    <p class="next-steps-caption">Изучите примеры основных функций и общих задач при разработке UI.</p>
  </a>
</div>
