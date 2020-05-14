# Plugins

Plugins usually add global-level functionality to Vue. There is no strictly defined scope for a plugin, but common scenarios where plugins are useful include:

1. Add some global methods or properties, e.g. [vue-custom-element](https://github.com/karol-f/vue-custom-element).

2. Add one or more global assets: directives/filters/transitions etc. (e.g. [vue-touch](https://github.com/vuejs/vue-touch)).

3. Add some component options by global mixin (e.g. [vue-router](https://github.com/vuejs/vue-router)).

4. Add some Vue instance methods by attaching them to `config.globalProperties`.

5. A library that provides an API of its own, while at the same time injecting some combination of the above (e.g. [vue-router](https://github.com/vuejs/vue-router)).

## Using a Plugin

After a Vue app has been initialized with `createApp()`, you can add a plugin to your application by calling the `use()` method:

```js
// calls `MyPlugin.install(Vue)`
const app = Vue.createApp({})
app.use(MyPlugin)
```

If you need to define configuration for a plugin, you can pass a config object as the second argument:

```js
app.use(MyPlugin, { someOption: true })
```

`app.use()` automatically prevents you from using the same plugin more than once, so calling it multiple times on the same plugin will install the plugin only once.

Checkout [awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) for a huge collection of community-contributed plugins and libraries.

## Writing a Plugin

A Vue.js plugin should expose an `install()` method. The method will be called with the application instance as the first argument, along with possible options:

```js
MyPlugin.install = (app, options) => {
  // 1. add a global provided function/attribute (this would require using an 'inject' in components where we want to access 'myProvidedAttribute')
  app.provide('myProvidedAttribute', 'foo')

  // 2. add an instance method (this will be available in every component)
  app.config.globalProperties.$myMethod = (methodOptions) => {
    // some logic ...
  }

  // 3. add a global asset
  app.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // some logic ...
    }
    ...
  })

  // 4. inject some component options
  app.mixin({
    created() {
      // some logic ...
    }
    ...
  })
}
```
