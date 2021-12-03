# Creating a Vue Application

## The App Instance

Every Vue application starts by creating a new **application instance** with the [`createApp`](/api/application#createapp) function:

```js
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

## The Root Component

The object we are passing into `createApp` is in fact a component. Every app requires a "root component" that can contain other components as its children.

If you are using Single-File Components, we typically import the root component from another file:

```js
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```

While many examples in this guide only need a single component, most real applications are organized into a tree of nested, reusable components. For example, a Todo application's component tree might look like this:

```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ DeleteTodoButton
│     └─ EditTodoButton
└─ TodoListFooter
   ├─ ClearTodosButton
   └─ TodoListStatistics
```

We will discuss how to define and compose multiple components together in later sections of the guide. Before that, we will focus on what happens inside a single component.

## App Configurations

The app instance exposes a `.config` object that allows us to configure a few app-level options, for example defining an app-level error handler that captures errors from all descendent components:

```js
app.config.errorHandler = (err) => {
  /* handle error */
}
```

You can browse the full list of `app.config` options in the [API reference](/api/application#app-config).

## Global Assets

The app instance is used to register "global assets" that can then be used by components within that app. We'll discuss them in detail later in the guide but here is a quick example:

```js
const app = createApp({})

// register a global component
app.component('SearchInput', SearchInputComponent)

// register a global custom directive
app.directive('focus', FocusDirective)

// app-wide dependency injection
app.provide('store', myStore)

// register a plugin
app.use(LocalePlugin)
```

Most of the methods exposed by the application instance return that same instance, so we can also use the chaining syntax:

```js
const app = createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .provide('store', myStore)
  .use(LocalePlugin)
```

You can browse the full list of app instance methods in the [API reference](/api/application).

## Mounting the App

An app instance won't render anything until its `.mount()` method is called.
It expects a "container" argument, which can either be an actual DOM element or a selector string:

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

The content of the app's root component will be rendered inside the container element. The container element itself is not considered part of the app.

The `.mount()` method should always be called after all app configurations and asset registrations are done. Also note that its return value, unlike the asset registration methods, is the root component instance instead of the app instance.

### In-DOM Root Component Template

When using Vue without a build step, we can write our root component's template directly inside the mount container:

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

Vue will automatically use the container's `innerHTML` as the template if the root component does not already have a `template` option.

## Multiple App Instances

You are not limited to a single app instance on the same page. The `createApp` API allows multiple Vue applications to co-exist on the same page, each with its own scope for configuration and global assets:

```js
const app1 = createApp({ /* ... */ })
app1.mount('#container-1')

const app2 = createApp({ /* ... */ })
app2.mount('#container-2')
```

If you are using Vue to enhance server-rendered HTML and only need Vue to control specific parts of a large page, avoid mounting a singe Vue app instance on the entire page. Instead, create multiple small app instances and mount them on the elements they are responsible for.
