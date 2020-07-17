# Introduction

> There's so much here! Does that mean 3.0 is completely different, I'll have to learn the basics all over again, and migrating will be practically impossible?

We're glad you asked! The answer is no. We've gone to great lengths to ensure most of the API is the same and the core concepts haven't changed. It's long because we like to offer very detailed explanations and include a lot of examples. Rest assured, **this is not something you have to read from top to bottom!**

Possibly the biggest change is our new [Composition API](/guide/composition-api-introduction.html), which is entirely additive- the previous Options API will continue to be supported, as the Composition API is an advanced feature.

## Overview

### New Features

Some of the new features to keep an eye on in Vue 3 include:

- [Composition API](/guide/composition-api-introduction.html)
- [Teleport](/guide/teleport.html)
- [Fragments](/guide/migration/fragments.html)
- [Emits Component Option](/guide/component-custom-events.html)
- `createRenderer` API from `@vue/runtime-core` to create custom renderers

### Breaking

The following consists a list of breaking changes from 2.x:

- [Global Vue API is changed to use an application instance](/guide/migration/global-api.html)
- [Global and internal APIs have been restructured to be tree-shakable](/src/guide/migration/global-api-treeshaking.html)
- [`model` component option and `v-bind`'s `sync` modifier are removed in favor of `v-model` arguments](/guide/migration/v-model.html)
- [Functional components can only be created using a plain function](/guide/migration/functional-components.html)
- [Async components now require `defineAsyncComponent` method to be created](/guide/migration/async-components.html)
- [Component data option should always be declared as a function](/guide/migration/data-option.html)
- [Custom elements whitelisting is now performed during template compilation](/guide/migration/custom-elements-interop.html)
- [Special `is` prop usage is restricted to the reserved `<component>` tag only](/guide/migration/custom-elements-interop.html)

### Removed

- [`keyCode` support as `v-on` modifiers](/guide/migration/keycode-modifiers.html)
- [$on, $off and \$once instance methods](/guide/migration/events-api.html)
- [Filters](/guide/migration/filters.html)

## FAQ

### Where should I start in a migration?

> Migration helper is still under development

1. Start by running the [migration helper](https://github.com/vuejs/vue-migration-helper) on a current project. We've carefully minified and compressed a senior Vue dev into a simple command line interface. Whenever they recognize an obsolete feature, they'll let you know, offer suggestions, and provide links to more info.

2. After that, browse through the table of contents for this page in the sidebar. If you see a topic you may be affected by, but the migration helper didn't catch, check it out.

3. If you have any tests, run them and see what still fails. If you don't have tests, just open the app in your browser and keep an eye out for warnings or errors as you navigate around.

4. By now, your app should be fully migrated. If you're still hungry for more though, you can read the rest of this page - or dive in to the new and improved guide from [the beginning](index.html). Many parts will be skimmable, since you're already familiar with the core concepts.

### How long will it take to migrate a Vue 2.x app to 3.0?

It depends on a few factors:

- The size of your app (small to medium-sized apps will probably be less than a day)

- How many times you get distracted and start playing with a cool new feature. 😉 &nbsp;Not judging, it also happened to us while building 3.0!

- Which obsolete features you're using. Most can be upgraded with find-and-replace, but others might take a few minutes. If you're not currently following best practices according to [our styleguide](/style-guide/README.html), Vue 3.0 will also try harder to force you to. This is a good thing in the long run, but could also mean a significant (though possibly overdue) refactor.

### If I upgrade to Vue 3, will I also have to upgrade Vuex and Vue Router?

Yes, currently both [Vuex](https://github.com/vuejs/vuex/tree/4.0#vuex-4) and [Vue Router](https://github.com/vuejs/vue-router-next) are in beta
