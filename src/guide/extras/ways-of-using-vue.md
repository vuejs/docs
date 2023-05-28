# Ways of Using Vue {#ways-of-using-vue}

We believe there is no "one size fits all" story for the web. This is why Vue is designed to be flexible and incrementally adoptable. Depending on your use case, Vue can be used in different ways to strike the optimal balance between stack complexity, developer experience and end performance.

## Standalone Script {#standalone-script}

Vue can be used as a standalone script file - no build step required! If you have a backend framework already rendering most of the HTML, or your frontend logic isn't complex enough to justify a build step, this is the easiest way to integrate Vue into your stack. You can think of Vue as a more declarative replacement of jQuery in such cases.

Vue also provides an alternative distribution called [petite-vue](https://github.com/vuejs/petite-vue) that is specifically optimized for progressively enhancing existing HTML. It has a smaller feature set, but is extremely lightweight and uses an implementation that is more efficient in no-build-step scenarios.

## Embedded Web Components {#embedded-web-components}

You can use Vue to [build standard Web Components](/guide/extras/web-components) that can be embedded in any HTML page, regardless of how they are rendered. This option allows you to leverage Vue in a completely consumer-agnostic fashion: the resulting web components can be embedded in legacy applications, static HTML, or even applications built with other frameworks.

## Single-Page Application (SPA) {#single-page-application-spa}

Some applications require rich interactivity, deep session depth, and non-trivial stateful logic on the frontend. The best way to build such applications is to use an architecture where Vue not only controls the entire page, but also handles data updates and navigation without having to reload the page. This type of application is typically referred to as a Single-Page Application (SPA).

Vue provides core libraries and [comprehensive tooling support](/guide/scaling-up/tooling) with amazing developer experience for building modern SPAs, including:

- Client-side router
- Blazing fast build tool chain
- IDE support
- Browser devtools
- TypeScript integrations
- Testing utilities

SPAs typically require the backend to expose API endpoints - but you can also pair Vue with solutions like [Inertia.js](https://inertiajs.com) to get the SPA benefits while retaining a server-centric development model.

## Fullstack / SSR {#fullstack-ssr}

Pure client-side SPAs are problematic when the app is sensitive to SEO and time-to-content. This is because the browser will receive a largely empty HTML page, and has to wait until the JavaScript is loaded before rendering anything.

Vue provides first-class APIs to "render" a Vue app into HTML strings on the server. This allows the server to send back already-rendered HTML, allowing end users to see the content immediately while the JavaScript is being downloaded. Vue will then "hydrate" the application on the client side to make it interactive. This is called [Server-Side Rendering (SSR)](/guide/scaling-up/ssr) and it greatly improves Core Web Vital metrics such as [Largest Contentful Paint (LCP)](https://web.dev/lcp/).

There are higher-level Vue-based frameworks built on top of this paradigm, such as [Nuxt](https://nuxt.com/), which allow you to develop a fullstack application using Vue and JavaScript.

## JAMStack / SSG {#jamstack-ssg}

Server-side rendering can be done ahead of time if the required data is static. This means we can pre-render an entire application into HTML and serve them as static files. This improves site performance and makes deployment a lot simpler since we no longer need to dynamically render pages on each request. Vue can still hydrate such applications to provide rich interactivity on the client. This technique is commonly referred to as Static-Site Generation (SSG), also known as [JAMStack](https://jamstack.org/what-is-jamstack/).

There are two flavors of SSG: single-page and multi-page. Both flavors pre-render the site into static HTML, the difference is that:

- After the initial page load, a single-page SSG "hydrates" the page into an SPA. This requires more upfront JS payload and hydration cost, but subsequent navigations will be faster, since it only needs to partially update the page content instead of reloading the entire page.

- A multi-page SSG loads a new page on every navigation. The upside is that it can ship minimal JS - or no JS at all if the page requires no interaction! Some multi-page SSG frameworks such as [Astro](https://astro.build/) also support "partial hydration" - which allows you to use Vue components to create interactive "islands" inside static HTML.

Single-page SSGs are better suited if you expect non-trivial interactivity, deep session lengths, or persisted elements / state across navigations. Otherwise, multi-page SSG would be the better choice.

The Vue team also maintains a static-site generator called [VitePress](https://vitepress.vuejs.org/), which powers this website you are reading right now! VitePress supports both flavors of SSG. [Nuxt](https://nuxt.com/) also supports SSG. You can even mix SSR and SSG for different routes in the same Nuxt app.

## Beyond the Web {#beyond-the-web}

Although Vue is primarily designed for building web applications, it is by no means limited to just the browser. You can:

- Build desktop apps with [Electron](https://www.electronjs.org/) or [Tauri](https://tauri.studio/en/)
- Build mobile apps with [Ionic Vue](https://ionicframework.com/docs/vue/overview)
- Build desktop and mobile apps from the same codebase with [Quasar](https://quasar.dev/)
- Use Vue's [Custom Renderer API](/api/custom-renderer) to build custom renderers targeting [WebGL](https://troisjs.github.io/) or even [the terminal](https://github.com/vue-terminal/vue-termui)!
