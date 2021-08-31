# Creating a Vue Application

## The App Instance

Every Vue application starts by creating a new **application instance** with the `createApp` function:

```js
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

## The Root Component

## Mounting the App

## App-Scoped Assets

The application instance is used to register 'globals' that can then be used by components within that application. We'll discuss that in detail later in the guide but as a quick example:

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

### Chaining

Most of the methods exposed by the application instance return that same instance, allowing for chaining:

```js
const app = createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .provide('store', myStore)
  .use(LocalePlugin)
```

You can browse the full application API in the [API reference](/api/application.html).

## Multiple App Instances
