# Global API

Vue 2.x has a number of global APIs and configurations that globally mutate Vue’s behavior. For instance, to create a global component, you would use the `Vue.component` API like this:

```js
Vue.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})
```

Similarly, this is how a global directive is declared:

```js
Vue.directive('focus', {
  inserted: el => el.focus()
})
```

While this approach is convenient, it leads to a couple of problems. Technically, Vue 2 doesn't have a concept of an "app". What we define as an app is simply a root Vue instance created via `new Vue()`. Every root instance created from the same Vue constructor **shares the same global configuration**. As a result:

- Global configuration makes it easy to accidentally pollute other test cases during testing. Users need to carefully store original global configuration and restore it after each test (e.g. resetting `Vue.config.errorHandler`). Some APIs like `Vue.use` and `Vue.mixin` don't even have a way to revert their effects. This makes tests involving plugins particularly tricky. In fact, vue-test-utils has to implement a special API `createLocalVue` to deal with this:

  ```js
  import { createLocalVue, mount } from '@vue/test-utils'

  // create an extended `Vue` constructor
  const localVue = createLocalVue()

  // install a plugin “globally” on the “local” Vue constructor
  localVue.use(MyPlugin)

  // pass the `localVue` to the mount options
  mount(Component, { localVue })
  ```

- Global configuration makes it difficult to share the same copy of Vue between multiple "apps" on the same page, but with different global configurations.

  ```js
  // this affects both root instances
  Vue.mixin({
    /* ... */
  })

  const app1 = new Vue({ el: '#app-1' })
  const app2 = new Vue({ el: '#app-2' })
  ```

To avoid these problems, in Vue 3 we introduce…

## A New Global API: `createApp`

Calling `createApp` returns an _app instance_, a new concept in Vue 3.

```js
import { createApp } from 'vue'

const app = createApp()
```

An app instance exposes a subset of the current global APIs. The rule of thumb is _any APIs that globally mutate Vue's behavior are now moved to the app instance_. Here is a table of the current global APIs and their corresponding instance APIs:

| 2.x Global API             | 3.x Instance API (`app`)                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| Vue.config                 | app.config                                                                                      |
| Vue.config.productionTip   | _removed_ ([see below](config-productiontip-removed))                                           |
| Vue.config.ignoredElements | app.config.isCustomElement ([see below](#config-ignoredelements-is-now-config-iscustomelement)) |
| Vue.component              | app.component                                                                                   |
| Vue.directive              | app.directive                                                                                   |
| Vue.mixin                  | app.mixin                                                                                       |
| Vue.use                    | app.use ([see below](#a-note-for-plugin-authors))                                               |

All other global APIs that do not globally mutate behavior are now named exports, as documented in [Global API Treeshaking](./global-api-treeshaking.html).

### `config.productionTip` Removed

In Vue 3.x, the "use production build" tip will only show up when using the "dev + full build" (the build that includes the runtime compiler and has warnings).

For ES modules builds, since they are used with bundlers, and in most cases a CLI or boilerplate would have configured the production env properly, this tip will no longer show up.

### `config.ignoredElements` Is Now `config.isCustomElement`

This config option was introduced with the intention to support native custom elements, so the renaming better conveys what it does. The new option also expects a function which provides more flexibility than the old string / RegExp approach:

```js
// before
Vue.config.ignoredElements = ['my-el', /^ion-/]

// after
const app = Vue.createApp()
app.config.isCustomElement = tag => tag.startsWith('ion-')
```

::: tip Important

In 3.0, the check of whether an element is a component or not has been moved to the template compilation phase, therefore this config option is only respected when using the runtime compiler. If you are using the runtime-only build, `isCustomElement` must be passed to `@vue/compiler-dom` in the build setup instead - for example, via the [`compilerOptions` option in vue-loader](https://vue-loader.vuejs.org/options.html#compileroptions).

- If `config.isCustomElement` is assigned to when using a runtime-only build, a warning will be emitted instructing the user to pass the option in the build setup instead;
- This will be a new top-level option in the Vue CLI config.
  :::

### A Note for Plugin Authors

It is a common practice for plugin authors to install the plugins automatically in their UMD builds using `Vue.use`. For instance, this is how the official `vue-router` plugin installs itself in a browser environment:

```js
var inBrowser = typeof window !== 'undefined'
/* … */
if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}
```

As the `use` global API is no longer available in Vue 3, this method will cease to work and calling `Vue.use()` will now trigger a warning. Instead, the end-user will now have to explicitly specify using the plugin on the app instance:

```js
const app = createApp(MyApp)
app.use(VueRouter)
```

## Mounting App Instance

After being initialized with `createApp(VueInstance)`, the app instance `app` can be used to mount a Vue root instance with `app.mount(domTarget)`:

```js
import { createApp } from 'vue'
import MyApp from './MyApp.vue'

const app = createApp(MyApp)
app.mount('#app')
```

With all these changes, the component and directive we have at the beginning of the guide will be rewritten into something like this:

```js
const app = createApp(MyApp)

app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

app.directive('focus', {
  inserted: el => el.focus()
})

// now every Vue instance mounted with app.mount(), along with its
// component tree, will have the same “button-counter” component
// and “focus” directive without polluting the global environment
app.mount('#app')
```

## Provide / Inject

Similar to using the `provide` option in a 2.x root instance, a Vue 3 app instance can also provide dependencies that can be injected by any component inside the app:

```js
// in the entry
app.provide({
  [ThemeSymbol]: theme
})

// in a child component
export default {
  inject: {
    theme: {
      from: ThemeSymbol
    }
  },
  template: `<div :style="{ color: theme.textColor }" />`
}
```

## Share Configurations Among Apps

One way to share configurations e.g. components or directives among apps is to create a factory function, like this:

```js
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const createMyApp = (VueInstance) => {
  const app = createApp(VueInstance)
  app.directive('focus' /* ... */)

  return app
}

createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

Now the `focus` directive will be available in both Foo and Bar instances and their descendants.
