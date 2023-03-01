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

- Die empfohlene IDE-Konfiguration ist [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Wenn Sie andere Editoren verwenden, sehen Sie sich den [IDE support section](/guide/scaling-up/tooling.html#ide-support).
- Weitere Details zum Tooling, einschließlich der Integration mit Backend-Frameworks, werden im [Tooling Guide](/guide/scaling-up/tooling.html) behandelt.
- Um mehr über das grundlegende Entwicklungstool Vite zu erfahren, lesen Sie die [Vite docs](https://vitejs.dev).
- Wenn Sie TypeScript verwenden möchten, lesen Sie den [TypeScript Usage Guide](typescript/overview.html).

Wenn Sie bereit sind, Ihre Anwendung in Produktion zu geben, führen Sie Folgendes aus:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

Dadurch wird ein produktionsfähiger Build Ihrer Anwendung im Verzeichnis `./dist` des Projekts erstellt. Lesen Sie den [Production Deployment Guide](/guide/best-practices/production-deployment.html) um mehr über den Einsatz Ihrer Anwendung in der Produktion zu erfahren.

[Nächste Schritte >](#next-steps)

## Vue über CDN nutzen {#using-vue-from-cdn}

Sie können Vue direkt von CDNs über ein Script-Tag verwenden:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

In diesem Beispiel nutzen wir [unpkg](https://unpkg.com/), aber Sie können jedes CDN nutzen, das npm-Pakete zur Verfügung stellt, zum Beispiel [jsdelivr](https://www.jsdelivr.com/package/npm/vue) oder [cdnjs](https://cdnjs.com/libraries/vue). Natürlich können Sie diese Datei auch herunterladen und sich selbst zur Verfügung stellen.

Bei der Verwendung von Vue aus einem CDN gibt es keinen "Build-Schritt". Das macht die Einrichtung viel einfacher und eignet sich für die Verbesserung von statischem HTML oder die Integration mit einem Backend-Framework. Allerdings können Sie nicht die Single-File Component (SFC) Syntax verwenden.

### Verwenden des globalen Builds {#using-the-global-build}

Der obige Link lädt den *globalen Build* von Vue, in dem alle Top-Level-APIs als Eigenschaften des globalen `Vue`-Objekts dargestellt werden. Hier ist ein vollständiges Beispiel, das den globalen Build verwendet:

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

### Verwenden des ES Module Builds {#using-the-es-module-build}

Im weiteren Verlauf der Dokumentation werden wir hauptsächlich die [ES-Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)-Syntax verwenden. Die meisten modernen Browser unterstützen jetzt ES-Module nativ, so dass wir Vue von einem CDN über native ES-Module wie dieses verwenden können:

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

Beachten Sie, dass wir `<script type="module">` verwenden und die importierte CDN URL stattdessen auf den **ES modules build** von Vue verweist.

[JSFiddle demo](https://jsfiddle.net/yyx990803/vo23c470/)

### Import maps aktivieren {#enabling-import-maps}

Im obigen Beispiel importieren wir von der vollständigen CDN-URL, aber in der restlichen Dokumentation werden Sie Code wie diesen sehen:

```js
import { createApp } from 'vue'
```

Wir können dem Browser beibringen, wo der `vue`-Import zu finden ist, indem wir [Import Maps](https://caniuse.com/import-maps) verwenden:

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

Sie können der Import-Map auch Einträge für andere Abhängigkeiten hinzufügen - stellen Sie jedoch sicher, dass diese auf die ES-Modulversion der Bibliothek verweisen, die Sie verwenden möchten.

:::tip Import Maps Browser Support
Import maps werden standardmäßig in Chromium-basierten Browsern unterstützt. Wir empfehlen daher, während des Lernprozesses Chrome oder Edge zu verwenden.

Wenn Sie Firefox verwenden, wird dies nur in Version 102+ unterstützt und muss derzeit über die Option `dom.importMaps.enabled` in `about:config` aktiviert werden.

If your preferred browser does not support import maps yet, you can polyfill it with [es-module-shims](https://github.com/guybedford/es-module-shims).
Wenn Ihr bevorzugter Browser noch keine Import Maps unterstützt, können Sie dies mittels [es-module-shims](https://github.com/guybedford/es-module-shims)-polyfill lösen.
:::

:::warning Hinweise zur Verwendung in der Produktiv-Umgebung
Die bisherigen Beispiele verwenden den Entwicklungs-Build von Vue - wenn Sie beabsichtigen, Vue von einem CDN in der Produktion zu verwenden, sollten Sie sich den [Production Deployment Guide](/guide/best-practices/production-deployment.html#without-build-tools) ansehen.
:::

### Aufteilung der Module {#splitting-up-the-modules}

Wenn wir tiefer in den Leitfaden eintauchen, müssen wir unseren Code möglicherweise in separate JavaScript-Dateien aufteilen, damit sie leichter zu verwalten sind. Zum Beispiel:

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

Wenn Sie die obige `index.html` direkt in Ihrem Browser öffnen, werden Sie feststellen, dass sie einen Fehler auslöst, weil ES-Module nicht über das Protokoll `file://` arbeiten können. Damit dies funktioniert, müssen Sie Ihre `index.html` über das Protokoll `http://` mit einem lokalen HTTP-Server bereitstellen.

Um einen lokalen HTTP-Server zu starten, installieren Sie zunächst [Node.js](https://nodejs.org/en/) und führen dann `npx serve` von der Kommandozeile aus in demselben Verzeichnis aus, in dem sich Ihre HTML-Datei befindet. Sie können auch jeden anderen HTTP-Server verwenden, der statische Dateien mit den richtigen MIME-Typen verarbeiten kann.

You may have noticed that the imported component's template is inlined as a JavaScript string. If you are using VSCode, you can install the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) extension and prefix the strings with a `/*html*/` comment to get syntax highlighting for them.

Sie haben vielleicht bemerkt, dass das importierte Komponenten-Template als JavaScript-String eingefügt ist. Wenn Sie VSCode verwenden, können Sie die Erweiterung [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) installieren und den Strings einen `/*html*/`-Kommentar voranstellen, um eine Syntaxhervorhebung für sie zu erhalten.

### Verwenden der Composition API ohne einen Build-Schritt {#using-composition-api-without-a-build-step}

Viele der Beispiele für Composition API werden die Syntax `<script setup>` verwenden. Wenn Sie beabsichtigen, Composition API ohne einen Build-Schritt zu verwenden, lesen Sie die Verwendung der [Option `setup()`](/api/composition-api-setup.html).

## Nächste Schritte {#next-steps}

Wenn Sie die [Einführung](/guide/introduction) übersprungen haben, empfehlen wir Ihnen dringend, diese zu lesen, bevor Sie mit dem Rest der Dokumentation fortfahren.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Weiter mit dem Leitfaden</p>
    <p class="next-steps-caption">Der Leitfaden führt Sie detailliert durch jeden Aspekt des Rahmens.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Versuchen Sie das Tutorial</p>
    <p class="next-steps-caption">Für diejenigen, die es vorziehen, Dinge praktisch zu lernen.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Sehen Sie sich die Beispiele an</p>
    <p class="next-steps-caption">Erkunden Sie Beispiele für Kernfunktionen und gängige Aufgaben der Benutzeroberfläche.</p>
  </a>
</div>
