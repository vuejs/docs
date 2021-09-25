# Quick Start

## Without Build Tools

Vue can be used without a build step in progressive enhancement or relatively simple use cases. Simply copy the following code into an HTML file and open it in your browser:

```html
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

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

<div id="app">
  <!-- template -->
  {{ message }}
</div>
```

The above example uses a browser feature called [Import Maps](https://caniuse.com/import-maps) so that we can use the short `'vue'` import specifier across all code samples in the documentation. Import Maps is currently only available in Chromium-based browsers - if your preferred browser does not support it yet, you can polyfill it with [es-module-shims](https://github.com/guybedford/es-module-shims).

:::tip For learning only
The import-maps-based setup is meant for learning only - if you intend to use Vue without build tools in in production, make sure to check out the [Production Deployment Guide](/guide/best-practices/production-deployment.html#without-build-tools).
:::

## With Build Tools

A build setup allows us to use Vue [Single File Components](/guide/scaling-up/sfc) (SFCs). The official Vue build setup is based on [Vite](https://vitejs.dev), a frontend build tool that is modern, lightweight and extremely fast.

### Online

You can try Vue with SFCs online on [StackBlitz](https://vite.new/vue). StackBlitz runs the Vite-based build setup directly in the browser, so it is almost identical to the local setup but doesn't require installing anything on your machine.

### Local

:::tip Pre-requisites

- Familiarity with the command line
- Install [Node.js](https://nodejs.org/)
  :::

To create a built-tool-enabled Vue project on your machine, run the following command in your command line (without the `$` sign):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">$</span> <span style="color:#ddd;">npm init vue@latest</span></span></code></pre></div>

This command will install and execute [create-vue](https://github.com/vuejs/create-vue), the official Vue project scaffolding tool. You will be presented with prompts for a number of optional features such as TypeScript and testing support:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#ddd;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#ddd;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#ddd;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#ddd;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#ddd;">Add Vuex for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#ddd;">Add Cypress for testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#ddd;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#ddd;">Done.</span></code></pre></div>

If you are unsure about an option, simply choose `No` by hitting enter for now. Once the project is created, follow the instructions to install dependencies and start the dev server:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">$ </span><span style="color:#ddd;">cd</span><span style="color:#ddd;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">$ </span><span style="color:#ddd;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">$ </span><span style="color:#ddd;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

You should now have your first Vue project running!

- More tooling details are discussed in the [Tooling Guide](/guide/scaling-up/tooling.html).
- To learn more about the underlying build tool Vite, check out the [Vite docs](https://vitejs.dev).
- If you chose to use TypeScript, check out [Using Vue with TypeScript](scaling-up/typescript.html).

## IDE Setup

If you are not using build tools, you can use any editor or IDE as long as it supports syntax highlighting for HTML, CSS and JavaScript.

If you are using build tools, it is recommended to use the following IDE setup for get syntax highlighting, type inference and auto-completion support for Vue Single File Components:

- Recommended: [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- Also viable: [JetBrains WebStorm](https://www.jetbrains.com/webstorm/)

## Next Steps

If you skipped the [Introduction](/guide/introduction), we strongly recommend reading it before moving on to the rest of the documentation.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Follow the Tutorial</p>
    <p class="next-steps-caption">For those who prefer learning things hands-on. Let's build something real!</p>
  </a>
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Continue the Guide</p>
    <p class="next-steps-caption">An in-depth guide that walks through the core concepts with small details.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Check out the Examples</p>
    <p class="next-steps-caption">Take a quick tour of core features and examples of common UI tasks.</p>
  </a>
</div>
