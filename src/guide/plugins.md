# Plugins

Plugins are self-contained code that usually add global-level functionality to Vue. It is either an `object` that exposes an `install()` method, or a `function`.

There is no strictly defined scope for a plugin, but common scenarios where plugins are useful include:

1. Add some global methods or properties, e.g. [vue-custom-element](https://github.com/karol-f/vue-custom-element).

2. Add one or more global assets: directives/filters/transitions etc. (e.g. [vue-touch](https://github.com/vuejs/vue-touch)).

3. Add some component options by global mixin (e.g. [vue-router](https://github.com/vuejs/vue-router)).

4. Add some global instance methods by attaching them to `config.globalProperties`.

5. A library that provides an API of its own, while at the same time injecting some combination of the above (e.g. [vue-router](https://github.com/vuejs/vue-router)).

## Writing a Plugin

In order to better understand how to create your own Vue.js plugins, we will create a very simplified version of a plugin that displays `i18n` ready strings.

Whenever this plugin is added to an application, the `install` method will be called if it is an object. If it is a `function`, the function itself will be called. In both cases, it will receive two parameters - the `app` object resulting from Vue's `createApp`, and the options passed in by the user.

Let's begin by setting up the plugin object. It is recommended to create it in a separate file and export it, as shown below to keep the logic contained and separate.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // Plugin code goes here
  }
}
```

We want to make a function to translate keys available to the whole application, so we will expose it using `app.config.globalProperties`.

This function will receive a `key` string, which we will use to look up the translated string in the user-provided options.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

We will assume that our users will pass in an object containing the translated keys in the `options` parameter when they use the plugin. Our `$translate` function will take a string such as `greetings.hello`, look inside the user provided configuration and return the translated value - in this case, `Bonjour!`

Ex:

```js
greetings: {
  hello: 'Bonjour!',
}
```

Plugins also allow us to use `inject` to provide a function or attribute to the plugin's users. For example, we can allow the application to have access to the `options` parameter to be able to use the translations object.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    app.provide('i18n', options)
  }
}
```

Plugin users will now be able to `inject['i18n']` into their components and access the object.

Additionally, since we have access to the `app` object, all other capabilities like using `mixin` and `directive` are available to the plugin. To learn more about `createApp` and the application instance, check out the [Application API documentation](/api/application.html).

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.')
        .reduce((o, i) => { if (o) return o[i] }, options)
    }

    app.provide('i18n', options)

    app.directive('my-directive', {
      mounted (el, binding, vnode, oldVnode) {
        // some logic ...
      }
      ...
    })

    app.mixin({
      created() {
        // some logic ...
      }
      ...
    })
  }
}
```

## Using a Plugin

After a Vue app has been initialized with `createApp()`, you can add a plugin to your application by calling the `use()` method.

We will use the `i18nPlugin` we created in the [Writing a Plugin](#writing-a-plugin) section for demo purposes.

The `use()` method takes two parameters. The first one is the plugin to be installed, in this case `i18nPlugin`.

It also automatically prevents you from using the same plugin more than once, so calling it multiple times on the same plugin will install the plugin only once.

The second parameter is optional, and depends on each particular plugin. In the case of the demo `i18nPlugin`, it is an object with the translated strings.

:::info
If you are using third party plugins such as `Vuex` or `Vue Router`, always check the documentation to know what that particular plugin expects to receive as a second parameter.
:::

```js
import { createApp } from 'vue'
import Root from './App.vue'
import i18nPlugin from './plugins/i18n'

const app = createApp(Root)
const i18nStrings = {
  greetings: {
    hi: 'Hallo!'
  }
}

app.use(i18nPlugin, i18nStrings)
app.mount('#app')
```

Checkout [awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) for a huge collection of community-contributed plugins and libraries.
