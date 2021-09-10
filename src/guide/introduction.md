---
aside: deep
footer: false
---

# Introduction

## What is Vue?

Vue (pronounced /vjuː/, like **view**) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.

Here is a minimal Vue counter example:

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

```vue-html
<div id="app">
  <button @click="count++">
    Clicked {{ count }} time{{ count === 1 ? '' : 's' }}.
  </button>
  <button @click="count = 0">Reset</button>
</div>
```

**Result**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<p class="demo">
  <button @click="count++">
    Clicked {{ count }} time{{ count === 1 ? '' : 's' }}.
  </button>
  <button @click="count = 0">Reset</button>
</p>

You may already have questions - don't worry! We will cover every little detail in the rest of the documentation. For now, please read along so you can have a high-level understanding of what Vue is all about.

## Ways of Using Vue

Vue is a framework. This means that as a whole, it provides a comprehensive feature set that covers most of the common needs in frontend web development. But the web is extremely diverse - the things we build on the web may vary drastically in form and scale. With that in mind, Vue is designed to be incrementally adoptable. Depending on your use case, Vue can be leveraged in different ways:

### Progressive Enhancement

Vue can be used as a more declarative JQuery replacement to "sprinkle" reactivity on to static or backend-rendered HTML pages. The core can be used as a standalone script by simply loading it from a CDN - no build step required!

Vue also provides an alternative distribution called [petite-vue](https://github.com/vuejs/petite-vue) that is specifically optimized for progressive enhancement. It has a smaller feature set, but is extremely lightweight and uses an implementation that is more efficient in no-build-setup scenarios.

### Single-Page Application (SPA)

You can build rich, large scale applications where Vue not only controls the entire page, but also handles data updates and navigations without having to reload the page. This type of applications are typically referred to as Single-Page Applications (SPAs).

Vue provides core libraries and [comprehensive tooling support](/guide/scaling-up/tooling) with amazing developer experience for building modern SPAs, including:

- Client-side router
- Blazing fast build tool chain
- IDE support
- Browser devtools
- TypeScript integrations
- Testing utilities

If you are a beginner and find these concepts intimidating, don't worry! The main guide only requires basic HTML and JavaScript knowledge, and you can follow along without being an expert at any of the above.

### Fullstack / SSR

Vue provides first-class APIs to render a Vue application into HTML on the server side so that the end user can see the content as soon as possible, without having to wait for the JavaScript to load and execute. Vue will then "hydrate" the application on the client side to make it interactive. This is called [Server-Side Rendering (SSR)](/guide/advanced/server-side-rendering) and is a necessary feature in cases where SEO and time-to-content are critical.

There are higher-level Vue-based frameworks built on top of this paradigm, such as [NuxtJS](https://nuxtjs.org/), which allow you to develop a fullstack application using Vue and JavaScript.

### JAMStack / SSG

Server-side rendering can be done ahead of time if the data is static. This means we can pre-render an entire application into HTML and serve them as static pages, greatly improving server performance and reducing deployment complexity. Vue can still hydrate such applications to provide rich interactivity on the client. This technique is commonly referred to as Static-Site Generation (SSG), also known as [JAMStack](https://jamstack.org/what-is-jamstack/).

The Vue team maintains a static-site generator called [VitePress](https://vitepress.vuejs.org/), which powers this very website! In addition, [NuxtJS](https://nuxtjs.org/) also supports SSG.

### Beyond the Web

Although Vue is primarily designed for building web applications, it is by no means limited to just the browser. You can:

- Build desktop apps with [Electron](https://www.electronjs.org/) or [Tauri](https://tauri.studio/en/)
- Build mobile apps with [Ionic Vue](https://ionicframework.com/docs/vue/overview)
- Build desktop and mobile apps from the same codebase with [Quasar](https://quasar.dev/)
- Use Vue's [Custom Renderer API](/api/custom-renderer) to build custom renderers targeting [WebGL](https://troisjs.github.io/) or even [the terminal](https://github.com/ycmjason/vuminal)!

## Single-File Components

In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called **Single-File Component** (also known as `*.vue` files, abbreviated as **SFC**). A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file:

```vue
<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

SFC is a defining feature of Vue, and is the recommended way to author Vue components **if** your use case warrants a build setup. You can learn more about the [how and why of SFC](/guide/scaling-up/sfc) in its dedicated section - but for now, just know that Vue provides tools that can help you scaffold SFC-ready projects in minutes.

## API Styles

Vue components can be authored in two different API styles: **Options API** and **Composition API**.

### Options API

With Options API, we define a component's logic using an object of options such as `data`, `methods`, and `mounted`. Properties defined by options are exposed on `this` inside functions, which points to the component instance:

```vue
<script>
export default {
  // reactive state
  data() {
    return {
      count: 0
    }
  },

  // functions that mutate state and trigger updates
  methods: {
    increment() {
      this.count++
    }
  },

  // lifecycle hooks
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">count is: {{ count }}</button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPmNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

### Composition API

With Composition API, we define a component's logic using imported API functions. In SFCs, Composition API is typically used with [`<script setup>`](/api/sfc-script-setup), which exposes all imports and declared variables directly to the template. Here's the same component, with the exact same template, but using Composition API and `<script setup>` instead:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">count is: {{ count }}</button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Y291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

### Which to Choose?

First of all, it is important to note that both API styles are fully capable of covering common use cases. They are different interfaces powered by the exact same underlying system. In fact, the Options API is implemented on top of the Composition API! The fundamental concepts and knowledge about Vue are shared across the two styles.

The Options API is centered around the concept of a "component instance" (`this` as seen in the example), which typically aligns better with a class-based mental model for users coming from OOP language backgrounds. It is also more beginner-friendly by abstracting away the reactivity details and enforcing code organization via option groups.

The Composition API is centered around declaring reactive state variables directly in a function scope, and composing state from multiple functions together to handle complexity. It is more free-form, and requires understanding how reactivity works in Vue to be used effectively. In return, its flexibility enables more powerful patterns for organizing and reusing logic.

You can learn more about the comparison between the two styles and the potential benefits of Composition API in the [Composition API FAQ](/guide/advanced/composition-api-faq).

If you are new to Vue, here's our general recommendation:

- For learning purposes, go with the style that looks easier to understand to you. Again, most of the core concepts are shared between the two styles. Once you are familiar with one of them, the other one can be easily picked up.

- For production use:

  - Go with Options API if you are not using build tools, or plan to use Vue primarily in low-complexity scenarios, e.g. progressive enhancement.

  - Go with Composition API + Single File Components if you plan to build full applications with Vue.

You don't have to commit to only one style during the learning phase. The rest of the documentation will provide code samples in both styles where applicable, and you can toggle between them at any time using the switches at the top of the left sidebar.

## Still Got Questions?

Check out our [FAQ](/about/faq).

## Pick Your Learning Path

Different developers have different learning styles. Feel free to pick a learning path that suites your preference - although we do recommend going over all content if possible!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Follow the Tutorial</p>
    <p class="next-steps-caption">For those who prefer learning things hands-on. Let's build something real!</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Continue the Guide</p>
    <p class="next-steps-caption">An in-depth guide that walks through the core concepts with small details.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Check out the Examples</p>
    <p class="next-steps-caption">Take a quick tour of core features and examples of common UI tasks.</p>
  </a>
</div>
