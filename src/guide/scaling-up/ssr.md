# Server-Side Rendering <Badge text="WIP" />

## Cross-Request State Pollution

In the State Management chapter, we introduced a [simple state management pattern using Reactivity APIs](state-management.html#simple-state-management-with-reactivity-api). In an SSR context, this pattern requires some additional adjustments.

The pattern declares shared state as **singletons**. This means there is only once instance of the reactive object throughout the entire lifecycle of our application. This works as expected in a pure client-side Vue application, since the our application code is initialized fresh for each browser page visit.

However, in an SSR context, the application code is typically initialized only once on the server, when the server boots up. In such case, singletons in our application will be shared across multiple requests handled by the server! If we mutate the shared singleton store with data specific to one user, it can be accidentally leaked to a request from another user. We call this **cross-request state pollution.**

// TODO finish

## Higher Level Solutions

### Nuxt.js

Properly configuring all the discussed aspects of a production-ready server-rendered app can be a daunting task. Luckily, there is an excellent community project that aims to make all of this easier: [Nuxt.js](https://v3.nuxtjs.org/). Nuxt.js is a higher-level framework built on top of the Vue ecosystem which provides an extremely streamlined development experience for writing universal Vue applications. Better yet, you can even use it as a static site generator (with pages authored as single-file Vue components)! We highly recommend giving it a try.

### Quasar Framework SSR + PWA

[Quasar Framework](https://quasar.dev) will generate an SSR app (with optional PWA handoff) that leverages its best-in-class build system, sensible configuration and developer extensibility to make designing and building your idea a breeze. With over one hundred specific "Material Design 2.0"-compliant components, you can decide which ones to execute on the server, which are available in the browser, and even manage the `<meta>` tags of your site. Quasar is a node.js and webpack based development environment that supercharges and streamlines rapid development of SPA, PWA, SSR, Electron, Capacitor and Cordova apps—all from one codebase.

### Vite SSR

[Vite](https://vitejs.dev/) is a new breed of frontend build tool that significantly improves the frontend development experience. It consists of two major parts:

- A dev server that serves your source files over native ES modules, with rich built-in features and astonishingly fast Hot Module Replacement (HMR).

- A build command that bundles your code with [Rollup](https://rollupjs.org/), pre-configured to output highly optimized static assets for production.

Vite also provides built-in [support for server-side rendering](https://vitejs.d](/guide/extras/ssr.html). You can find an example project with Vue [here](https://github.com/vitejs/vite/tree/main/packages/playground/ssr-vue)
