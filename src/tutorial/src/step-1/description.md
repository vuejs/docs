# Getting Started {#getting-started}

Welcome to the Vue tutorial!

The goal of this tutorial is to quickly give you an experience of what it feels like to work with Vue, right in the browser. It does not aim to be comprehensive, and you don't need to understand everything before moving on. However, after you complete it, make sure to also read the <a target="_blank" href="/guide/introduction.html">Guide</a> which covers each topic in more detail.

## Prerequisites {#prerequisites}

The tutorial assumes basic familiarity with HTML, CSS and JavaScript. If you are totally new to front-end development, it might not be the best idea to jump right into a framework as your first step - grasp the basics then come back! Prior experience with other frameworks helps, but is not required.

## How to Use This Tutorial {#how-to-use-this-tutorial}

You can edit the code <span class="wide">on the right</span><span class="narrow">below</span> and see the result update instantly. Each step will introduce a core feature of Vue, and you will be expected to complete the code to get the demo working. If you get stuck, you will have a "Show me!" button that reveals the working code for you. Try not to rely on it too much - you'll learn faster by figuring things out on your own.

If you are an experienced developer coming from Vue 2 or other frameworks, there are a few settings you can tweak to make the best use of this tutorial. If you are a beginner, it's recommended to go with the defaults.

<details>
<summary>Tutorial Setting Details</summary>

- Vue offers two API styles: Options API and Composition API. This tutorial is designed to work for both - you can choose your preferred style using the **API Preference** switches at the top. <a target="_blank" href="/guide/introduction.html#api-styles">Learn more about API styles</a>.

- You can also switch between SFC-mode or HTML-mode. The former will show code examples in <a target="_blank" href="/guide/introduction.html#single-file-components">Single-File Component</a> (SFC) format, which is what most developers use when they use Vue with a build step. HTML-mode shows usage without a build step.

<div class="html">

:::tip
If you're about to use HTML-mode without a build step in your own applications, make sure you either change imports to:

```js
import { ... } from 'vue/dist/vue.esm-bundler.js'
```

inside your scripts or configure your build tool to resolve `vue` accordingly. Sample config for [Vite](https://vitejs.dev/):

```js
// vite.config.js
export default {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
}
```

See the respective [section in Tooling guide](/guide/scaling-up/tooling.html#note-on-in-browser-template-compilation) for more information.
:::

</div>

</details>

Ready? Click "Next" to get started.
