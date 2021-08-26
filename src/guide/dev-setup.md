# Development Setup

## No Build Tool

All you need is an HTML file with the following:

```html
<script type="module">
  import { createApp } from 'https://unpkg.com/vue/dist/vue.esm-browser.js'

  createApp({
    // component logic
  }).mount('#app')
</script>

<div id="app">
  <!-- component template -->
</div>
```

## With Build Tool

To leverage Vue [Single File Components](/guide/single-file-component) (SFCs), a build setup is required. The official Vue build setup is based on [Vite](https://vitejs.dev), a modern build tool that is lightweight and extremely fast.

### Online

You can try Vue SFCs online on [StackBlitz](https://vite.new/vue). StackBlitz runs the Vite-based build setup directly in the browser, so it is almost identical to the local setup but doesn't require installing anything on your machine.

### Local

:::tip Pre-requisites
- Familiarity with the command line
- Install [Node.js](https://nodejs.org/)
:::

```sh
npm init vue@latest
```

This command will download and run [create-vue](https://github.com/vuejs/create-vue). It will walk you through a few questions to scaffold a production-ready Vue project. For more details on Vue-related tooling, check out the [SFC Tooling](/api/sfc-tooling.html) section.

## IDE Setup

- Recommended: [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- Also viable: [JetBrains WebStorm](https://www.jetbrains.com/webstorm/)

While almost all editors can support syntax highlighting for Vue components, most of them lack the level of Intellisense / refactoring support the above solutions provide (especially with TypeScript).

## Browser Devtools Extension

// TODO screenshot

// TODO explain what devtool does

- [Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)
- [Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Standalone Electron app](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

## Next Steps

// TODO link to guide / tutorial / playground