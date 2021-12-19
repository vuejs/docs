# Server-Side Rendering

## The Complete SSR Guide

We have created a standalone guide for creating server-rendered Vue applications. This is a very in-depth guide for those who are already familiar with client-side Vue development, server-side Node.js development and webpack. Check it out [here](/guide/extras/ssr/introduction.html).

## Nuxt.js

Properly configuring all the discussed aspects of a production-ready server-rendered app can be a daunting task. Luckily, there is an excellent community project that aims to make all of this easier: [Nuxt.js](https://v3.nuxtjs.org/). Nuxt.js is a higher-level framework built on top of the Vue ecosystem which provides an extremely streamlined development experience for writing universal Vue applications. Better yet, you can even use it as a static site generator (with pages authored as single-file Vue components)! We highly recommend giving it a try.

## Quasar Framework SSR + PWA

[Quasar Framework](https://quasar.dev) will generate an SSR app (with optional PWA handoff) that leverages its best-in-class build system, sensible configuration and developer extensibility to make designing and building your idea a breeze. With over one hundred specific "Material Design 2.0"-compliant components, you can decide which ones to execute on the server, which are available in the browser, and even manage the `<meta>` tags of your site. Quasar is a node.js and webpack based development environment that supercharges and streamlines rapid development of SPA, PWA, SSR, Electron, Capacitor and Cordova apps—all from one codebase.

## Vite SSR

[Vite](https://vitejs.dev/) is a new breed of frontend build tool that significantly improves the frontend development experience. It consists of two major parts:

- A dev server that serves your source files over native ES modules, with rich built-in features and astonishingly fast Hot Module Replacement (HMR).

- A build command that bundles your code with [Rollup](https://rollupjs.org/), pre-configured to output highly optimized static assets for production.

Vite also provides built-in [support for server-side rendering](https://vitejs.d](/guide/extras/ssr.html). You can find an example project with Vue [here](https://github.com/vitejs/vite/tree/main/packages/playground/ssr-vue)
