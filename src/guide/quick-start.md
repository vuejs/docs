---
footer: false
---

# Szybki start

## Try Vue Online

- To quickly get a taste of Vue, you can try it directly in our [Playground](https://sfc.vuejs.org/#eNo9j01qAzEMha+iapMWOjbdDm6gu96gG2/cjJJM8B+2nBaGuXvlpBMwtj4/JL234EfO6toIRzT1UObMexvpN6fCMNHRNc+w2AgwOXbPL/caoBC3EjcCCPU0wu6TvE/wlYqfnnZ3ae2PXHKMfiwQYArZOyYhAHN+2y9LnwLrarTQ7XeOuTFch5Am8u8WRbcoktGPbnzFOXS3Q3BZXWqKkuRmy/4L1eK4GbUoUTtbPDPnOmpdj4ee/1JVKictlSot8hxIUQ3Dd0k/lYoMtrglwfUPkXdoJg==).

- If you prefer a plain HTML setup without any build steps, you can use this [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) as your starting point.

- If you are already familiar with Node.js and the concept of build tools, you can also try a complete build setup right within your browser on [StackBlitz](https://vite.new/vue).

## Creating a Vue Application

:::tip Prerequisites

- Familiarity with the command line
- Install [Node.js](https://nodejs.org/) version 16.0 or higher
  :::

In this section we will introduce how to scaffold a Vue [Single Page Application](/guide/extras/ways-of-using-vue.html#single-page-application-spa) on your local machine. The created project will be using a build setup based on [Vite](https://vitejs.dev), and allow us to use Vue [Single-File Components](/guide/scaling-up/sfc) (SFCs).

Make sure you have an up-to-date version of [Node.js](https://nodejs.org/) installed, then run the following command in your command line (without the `>` sign):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

To polecenie zainstaluje i uruchomi [create-vue](https://github.com/vuejs/create-vue), oficjalne narzędzie do tworzenia rusztowań dla projektów Vue. Zostaną wyświetlone podpowiedzi dotyczące wielu opcjonalnych funkcji, takich jak TypeScript i obsługa testów:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">nazwa-twojego-projektu</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">nazwa-twojego-projektu</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Jeśli nie jesteś pewien jakiejś opcji, po prostu wybierz `Nie`, naciskając na razie klawisz Enter. Po utworzeniu projektu postępuj zgodnie z instrukcjami, aby zainstalować zależności i uruchomić serwer dev:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">nazwa-twojego-projektu</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

You should now have your first Vue project running! Note that the example components in the generated project are written using the [Composition API](/guide/introduction.html#composition-api) and `<script setup>`, rather than the [Options API](/guide/introduction.html#options-api). Here are some additional tips:

- The recommended IDE setup is [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar). If you use other editors, check out the [IDE support section](/guide/scaling-up/tooling.html#ide-support).
- More tooling details, including integration with backend frameworks, are discussed in the [Tooling Guide](/guide/scaling-up/tooling.html).
- To learn more about the underlying build tool Vite, check out the [Vite docs](https://vitejs.dev).
- If you chose to use TypeScript, check out the [TypeScript Usage Guide](typescript/overview.html).

Gdy aplikacja będzie gotowa do wysłania na produkcję, wykonaj następujące polecenie:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

Spowoduje to utworzenie gotowej do produkcji kompilacji Twojej aplikacji w katalogu projektu `./dist`. Przeczytaj [Przewodnik wdrożenia produkcyjnego](/guide/best-practices/production-deployment.html), aby dowiedzieć się więcej o wysyłaniu aplikacji do produkcji.

[Kolejne kroki >](#kolejne-kroki)

## Using Vue from CDN

You can use Vue directly from a CDN via a script tag:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Here we are using [unpkg](https://unpkg.com/), but you can also use any CDN that serves npm packages, for example [jsdelivr](https://www.jsdelivr.com/package/npm/vue) or [cdnjs](https://cdnjs.com/libraries/vue). Of course, you can also download this file and serve it yourself.

When using Vue from a CDN, there is no "build step" involved. This makes the setup a lot simpler, and is suitable for enhancing static HTML or integrating with a backend framework. However, you won't be able to use the Single-File Component (SFC) syntax.

### Using the Global Build

The above link is loading the _global build_ of Vue, where all top-level APIs are exposed as properties on the global `Vue` object. Here is a full example using the global build:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[JSFiddle demo](https://jsfiddle.net/yyx990803/nw1xg8Lj/)

### Using the ES Module Build

Throughout the rest of the documentation, we will be primarily using [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) syntax. Most modern browsers now support ES modules natively, so we can use Vue from a CDN via native ES modules like this:

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

Notice that we are using `<script type="module">`, and the imported CDN URL is pointing to the **ES modules build** of Vue instead.

[JSFiddle demo](https://jsfiddle.net/yyx990803/vo23c470/)

### Enabling Import maps

In the above example we are importing from the full CDN URL, but in the rest of the documentation you will see code like this:

```js
import { createApp } from 'vue'
```

We can teach the browser where to locate the `vue` import by using [Import Maps](https://caniuse.com/import-maps):

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
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[JSFiddle demo](https://jsfiddle.net/yyx990803/2ke1ab0z/)

You can also add entries for other dependencies to the import map - but make sure they point to the ES modules version of the library you intend to use.

:::tip Import Map a wsparcie przeglądarek
Import map domyśle jest wspierany w przeglądarkach opartych na Chromium, dlatego podczas nauki zalecamy korzystanie z Chrome lub Edge.

Jeśli używasz Firefoksa, jest ona obsługiwana tylko w wersji 102+ i obecnie musi być włączona poprzez opcję `dom.importMaps.enabled` w `about:config`.

Jeśli preferowana przeglądarka nie obsługuje jeszcze map importu, można ją uzupełnić za pomocą [es-module-shims](https://github.com/guybedford/es-module-shims).
:::

:::warning Notes on Production Use
The examples so far are using the development build of Vue - if you intend to use Vue from a CDN in production, make sure to check out the [Production Deployment Guide](/guide/best-practices/production-deployment.html#without-build-tools).
:::

### Splitting Up the Modules

Gdy zagłębimy się w przewodnik, może się okazać, że będziemy musieli podzielić nasz kod na osobne pliki JavaScript, aby łatwiej było nimi zarządzać. Na przykład:

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
  template: `<div>count is {{ count }}</div>`
}
```

If you directly open the above `index.html` in your browser, you will find that it throws an error because ES modules cannot work over the `file://` protocol. In order for this to work, you need to serve your `index.html` over the `http://` protocol, with a local HTTP server.

To start a local HTTP server, first install [Node.js](https://nodejs.org/en/), and then run `npx serve` from the command line in the same directory where your HTML file is. You can also use any other HTTP server that can serve static files with correct MIME types.

Być może zauważyłeś, że szablon importowanego komponentu jest wklejony jako łańcuch JavaScript. Jeśli używasz VSCode, możesz zainstalować rozszerzenie [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) i poprzedzać łańcuchy komentarzem `/*html*/`, aby uzyskać dla nich kolorowanie składni.

### Using Composition API without a Build Step

Many of the examples for Composition API will be using the `<script setup>` syntax. If you intend to use Composition API without a build step, consult the usage of the [`setup()` option](/api/composition-api-setup.html).

## Kolejne kroki

Jeśli pominąłeś [Wprowadzenie](/guide/introduction), zdecydowanie zalecamy przeczytanie go przed przejściem do reszty dokumentacji.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Kontynuuj Przewodnik</p>
    <p class="next-steps-caption">W przewodniku szczegółowo omówiono każdy aspekt frameworku.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Spróbuj samouczka</p>
    <p class="next-steps-caption">Dla tych, którzy wolą uczyć się w praktyce.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Sprawdź przykłady</p>
    <p class="next-steps-caption">Zapoznaj się z przykładami podstawowych funkcji i typowych zadań UI.</p>
  </a>
</div>
