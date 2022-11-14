---
footer: false
---

# Schnellstart {#quick-start}

## Vue Online ausprobieren {#try-vue-online}

- Um schnell einen Überblick über Vue zu bekommen, können Sie es direkt in unserer [Playground](https://sfc.vuejs.org/#eNo9j01qAzEMha+iapMWOjbdDm6gu96gG2/cjJJM8B+2nBaGuXvlpBMwtj4/JL234EfO6toIRzT1UObMexvpN6fCMNHRNc+w2AgwOXbPL/caoBC3EjcCCPU0wu6TvE/wlYqfnnZ3ae2PXHKMfiwQYArZOyYhAHN+2y9LnwLrarTQ7XeOuTFch5Am8u8WRbcoktGPbnzFOXS3Q3BZXWqKkuRmy/4L1eK4GbUoUTtbPDPnOmpdj4ee/1JVKictlSot8hxIUQ3Dd0k/lYoMtrglwfUPkXdoJg==) ausprobieren.

- Wenn Sie ein einfaches HTML-Setup ohne Build-Schritte bevorzugen, können Sie dies verwenden [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) as your starting point.

- Wenn Sie bereits mit Node.js und dem Konzept von Build-Tools vertraut sind, können Sie auch ein komplettes Build-Setup direkt in Ihrem Browser auf [StackBlitz](https://vite.new/vue).

## Vue-Anwendung erstellen {#creating-a-vue-application}

:::tip Voraussetzungen

- Vertrautheit mit der Kommandozeile
- Installieren Sie [Node.js](https://nodejs.org/) Version 16.0 oder höher
  :::

In diesem Abschnitt werden wir Ihnen zeigen, wie Sie ein Vue [Single Page Application](/guide/extras/ways-of-using-vue.html#single-page-application-spa) auf Ihrem lokalen Rechner erstellen können. Das erstellte Projekt wird ein Build-Setup verwenden, das auf [Vite](https://vitejs.dev) basiert und uns erlaubt, Vue [Single-File Components](/guide/scaling-up/sfc) (SFCs) zu verwenden.

Stellen Sie sicher, dass Sie eine aktuelle Version von  [Node.js](https://nodejs.org/) installiert haben, und führen Sie dann den folgenden Befehl in Ihrer Befehlszeile aus (ohne das `>` Zeichen):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

Mit diesem Befehl wird [create-vue](https://github.com/vuejs/create-vue), Vue-Projektgerüstwerkzeug, installiert und ausgeführt. Sie werden aufgefordert, mehrere optionale Funktionen wie TypeScript und Testunterstützung zu aktivieren:

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

Wenn Sie sich bei einer Option unsicher sind, wählen Sie einfach `No` indem Sie die Eingabetaste drücken. Sobald das Projekt erstellt ist, folgen Sie den Anweisungen zur Installation der Abhängigkeiten und zum Starten des Entwicklungsservers:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

Sie sollten nun Ihr erstes Vue-Projekt zum Laufen gebracht haben! Beachten Sie, dass die Beispielkomponenten in dem generierten Projekt mit der [Composition API](/guide/introduction.html#composition-api) und `<script setup>` geschrieben wurden, und nicht mit der [Options API](/guide/introduction.html#options-api). Hier sind einige zusätzliche Tipps:

- The recommended IDE setup is [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar). If you use other editors, check out the [IDE support section](/guide/scaling-up/tooling.html#ide-support).
- More tooling details, including integration with backend frameworks, are discussed in the [Tooling Guide](/guide/scaling-up/tooling.html).
- To learn more about the underlying build tool Vite, check out the [Vite docs](https://vitejs.dev).
- If you choose to use TypeScript, check out the [TypeScript Usage Guide](typescript/overview.html).

When you are ready to ship your app to production, run the following:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

This will create a production-ready build of your app in the project's `./dist` directory. Check out the [Production Deployment Guide](/guide/best-practices/production-deployment.html) to learn more about shipping your app to production.

[Next Steps >](#next-steps)

## Using Vue from CDN {#using-vue-from-cdn}

You can use Vue directly from a CDN via a script tag:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Here we are using [unpkg](https://unpkg.com/), but you can also use any CDN that serves npm packages, for example [jsdelivr](https://www.jsdelivr.com/package/npm/vue) or [cdnjs](https://cdnjs.com/libraries/vue). Of course, you can also download this file and serve it yourself.

When using Vue from a CDN, there is no "build step" involved. This makes the setup a lot simpler, and is suitable for enhancing static HTML or integrating with a backend framework. However, you won't be able to use the Single-File Component (SFC) syntax.

### Using the Global Build {#using-the-global-build}

The above link loads the *global build* of Vue, where all top-level APIs are exposed as properties on the global `Vue` object. Here is a full example using the global build:

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

### Using the ES Module Build {#using-the-es-module-build}

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

### Enabling Import maps {#enabling-import-maps}

In the above example, we are importing from the full CDN URL, but in the rest of the documentation you will see code like this:

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

:::tip Import Maps Browser Support
Import maps are supported by default in Chromium-based browsers, so we recommend using Chrome or Edge during the learning process.

If using Firefox, it is only supported in version 102+ and currently needs to be enabled via the `dom.importMaps.enabled` option in `about:config`.

If your preferred browser does not support import maps yet, you can polyfill it with [es-module-shims](https://github.com/guybedford/es-module-shims).
:::

:::warning Notes on Production Use
The examples so far are using the development build of Vue - if you intend to use Vue from a CDN in production, make sure to check out the [Production Deployment Guide](/guide/best-practices/production-deployment.html#without-build-tools).
:::

### Splitting Up the Modules {#splitting-up-the-modules}

As we dive deeper into the guide, we may need to split our code into separate JavaScript files so that they are easier to manage. For example:

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

To start a local HTTP server, first install [Node.js](https://nodejs.org/en/) and then run `npx serve` from the command line in the same directory where your HTML file is. You can also use any other HTTP server that can serve static files with the correct MIME types.

You may have noticed that the imported component's template is inlined as a JavaScript string. If you are using VSCode, you can install the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) extension and prefix the strings with a `/*html*/` comment to get syntax highlighting for them.

### Using Composition API without a Build Step {#using-composition-api-without-a-build-step}

Many of the examples for Composition API will be using the `<script setup>` syntax. If you intend to use Composition API without a build step, consult the usage of the [`setup()` option](/api/composition-api-setup.html).

## Next Steps {#next-steps}

If you skipped the [Introduction](/guide/introduction), we strongly recommend reading it before moving on to the rest of the documentation.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Continue with the Guide</p>
    <p class="next-steps-caption">The guide walks you through every aspect of the framework in full detail.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Try the Tutorial</p>
    <p class="next-steps-caption">For those who prefer learning things hands-on.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Check out the Examples</p>
    <p class="next-steps-caption">Explore examples of core features and common UI tasks.</p>
  </a>
</div>
