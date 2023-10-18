# Frequently Asked Questions {#frequently-asked-questions}

## Who maintains Vue? {#who-maintains-vue}

Vue is an independent, community-driven project. It was created by [Evan You](https://twitter.com/youyuxi) in 2014 as a personal side project. Today, Vue is actively maintained by [a team of both full-time and volunteer members from all around the world](/about/team), where Evan serves as the project lead. You can learn more about the story of Vue in this [documentary](https://www.youtube.com/watch?v=OrxmtDw4pVI).

Vue's development is primarily funded through sponsorships and we have been financially sustainable since 2016. If you or your business benefit from Vue, consider [sponsoring us](/sponsor/) to support Vue's development!

## What's the difference between Vue 2 and Vue 3? {#what-s-the-difference-between-vue-2-and-vue-3}

Vue 3 is the current, latest major version of Vue. It contains new features that are not present in Vue 2, such as Teleport, Suspense, and multiple root elements per template. It also contains breaking changes that make it incompatible with Vue 2. Full details are documented in the [Vue 3 Migration Guide](https://v3-migration.vuejs.org/).

Despite the differences, the majority of Vue APIs are shared between the two major versions, so most of your Vue 2 knowledge will continue to work in Vue 3. Notably, Composition API was originally a Vue-3-only feature, but has now been backported to Vue 2 and is available in [Vue 2.7](https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01).

In general, Vue 3 provides smaller bundle sizes, better performance, better scalability, and better TypeScript / IDE support. If you are starting a new project today, Vue 3 is the recommended choice. There are only a few reasons for you to consider Vue 2 as of now:

- You need to support IE11. Vue 3 leverages modern JavaScript features and does not support IE11.

If you intend to migrate an existing Vue 2 app to Vue 3, consult the [migration guide](https://v3-migration.vuejs.org/).

## Is Vue 2 Still Supported? {#is-vue-2-still-supported}

Vue 2.7, which was shipped in July 2022, is the final minor release of the Vue 2 version range. Vue 2 has now entered maintenance mode: it will no longer ship new features, but will continue to receive critical bug fixes and security updates for 18 months starting from the 2.7 release date. This means **Vue 2 will reach End of Life on December 31st, 2023**.

We believe this should provide plenty of time for most of the ecosystem to migrate over to Vue 3. However, we also understand that there could be teams or projects that cannot upgrade by this timeline while still needing to fulfill security and compliance requirements. We are partnering with industry experts to provide extended support for Vue 2 for teams with such needs - if your team expects to be using Vue 2 beyond the end of 2023, make sure to plan ahead and learn more about [Vue 2 Extended LTS](https://v2.vuejs.org/lts/).

## What license does Vue use? {#what-license-does-vue-use}

Vue is a free and open source project released under the [MIT License](https://opensource.org/licenses/MIT).

## What browsers does Vue support? {#what-browsers-does-vue-support}

The latest version of Vue (3.x) only supports [browsers with native ES2015 support](https://caniuse.com/es6). This excludes IE11. Vue 3.x uses ES2015 features that cannot be polyfilled in legacy browsers, so if you need to support legacy browsers, you will need to use Vue 2.x instead.

## Is Vue reliable? {#is-vue-reliable}

Vue is a mature and battle-tested framework. It is one of the most widely used JavaScript frameworks in production today, with over 1.5 million users worldwide, and is downloaded close to 10 million times a month on npm.

Vue is used in production by renowned organizations in varying capacities all around the world, including Wikimedia Foundation, NASA, Apple, Google, Microsoft, GitLab, Zoom, Tencent, Weibo, Bilibili, Kuaishou, and many more.

## Is Vue fast? {#is-vue-fast}

Vue 3 is one of the most performant mainstream frontend frameworks, and handles most web application use cases with ease, without the need for manual optimizations.

In stress-testing scenarios, Vue outperforms React and Angular by a decent margin in the [js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/current.html). It also goes neck-and-neck against some of the fastest production-level non-Virtual-DOM frameworks in the benchmark.

Do note that synthetic benchmarks like the above focus on raw rendering performance with dedicated optimizations and may not be fully representative of real-world performance results. If you care more about page load performance, you are welcome to audit this very website using [WebPageTest](https://www.webpagetest.org/lighthouse) or [PageSpeed Insights](https://pagespeed.web.dev/). This website is powered by Vue itself, with SSG pre-rendering, full page hydration and SPA client-side navigation. It scores 100 in performance on an emulated Moto G4 with 4x CPU throttling over slow 4G networks.

You can learn more about how Vue automatically optimizes runtime performance in the [Rendering Mechanism](/guide/extras/rendering-mechanism) section, and how to optimize a Vue app in particularly demanding cases in the [Performance Optimization Guide](/guide/best-practices/performance).

## Is Vue lightweight? {#is-vue-lightweight}

When you use a build tool, many of Vue's APIs are ["tree-shakable"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). For example, if you don't use the built-in `<Transition>` component, it won't be included in the final production bundle.

A hello world Vue app that only uses the absolutely minimal APIs has a baseline size of only around **16kb**, with minification and brotli compression. The actual size of the application will depend on how many optional features you use from the framework. In the unlikely case where an app uses every single feature that Vue provides, the total runtime size is around **27kb**.

When using Vue without a build tool, we not only lose tree-shaking, but also have to ship the template compiler to the browser. This bloats up the size to around **41kb**. Therefore, if you are using Vue primarily for progressive enhancement without a build step, consider using [petite-vue](https://github.com/vuejs/petite-vue) (only **6kb**) instead.

Some frameworks, such as Svelte, use a compilation strategy that produces extremely lightweight output in single-component scenarios. However, [our research](https://github.com/yyx990803/vue-svelte-size-analysis) shows that the size difference heavily depends on the number of components in the application. While Vue has a heavier baseline size, it generates less code per component. In real-world scenarios, a Vue app may very well end up being lighter.

## Does Vue scale? {#does-vue-scale}

Yes. Despite a common misconception that Vue is only suitable for simple use cases, Vue is perfectly capable of handling large scale applications:

- [Single-File Components](/guide/scaling-up/sfc) provide a modularized development model that allows different parts of an application to be developed in isolation.

- [Composition API](/guide/reusability/composables) provides first-class TypeScript integration and enables clean patterns for organizing, extracting and reusing complex logic.

- [Comprehensive tooling support](/guide/scaling-up/tooling) ensures a smooth development experience as the application grows.

- Lower barrier to entry and excellent documentation translate to lower onboarding and training costs for new developers.

## How do I contribute to Vue? {#how-do-i-contribute-to-vue}

We appreciate your interest! Please check out our [Community Guide](/about/community-guide).

## Should I use Options API or Composition API? {#should-i-use-options-api-or-composition-api}

If you are new to Vue, we provide a high-level comparison between the two styles [here](/guide/introduction#which-to-choose).

If you have previously used Options API and are currently evaluating Composition API, check out [this FAQ](/guide/extras/composition-api-faq).

## Should I use JavaScript or TypeScript with Vue? {#should-i-use-javascript-or-typescript-with-vue}

While Vue itself is implemented in TypeScript and provides first-class TypeScript support, it does not enforce an opinion on whether you should use TypeScript as a user.

TypeScript support is an important consideration when new features are added to Vue. APIs that are designed with TypeScript in mind are typically easier for IDEs and linters to understand, even if you aren't using TypeScript yourself. Everybody wins. Vue APIs are also designed to work the same way in both JavaScript and TypeScript as much as possible.

Adopting TypeScript involves a trade-off between onboarding complexity and long-term maintainability gains. Whether such a trade-off can be justified can vary depending on your team's background and project scale, but Vue isn't really an influencing factor in making that decision.

## How does Vue compare to Web Components? {#how-does-vue-compare-to-web-components}

Vue was created before Web Components were natively available, and some aspects of Vue's design (e.g. slots) were inspired by the Web Components model.

The Web Components specs are relatively low-level, as they are centered around defining custom elements. As a framework, Vue addresses additional higher-level concerns such as efficient DOM rendering, reactive state management, tooling, client-side routing, and server-side rendering.

Vue also fully supports consuming or exporting to native custom elements - check out the [Vue and Web Components Guide](/guide/extras/web-components) for more details.

<!-- ## TODO How does Vue compare to React? -->

<!-- ## TODO How does Vue compare to Angular? -->
