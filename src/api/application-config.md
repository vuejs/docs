# Application Config

Every Vue application exposes a `config` object that contains the configuration settings for that application:

```js
const app = Vue.createApp({})

console.log(app.config)
```

You can modify its properties, listed below, before mounting your application.

## errorHandler

- **Type:** `Function`

- **Default:** `undefined`

- **Usage:**

```js
app.config.errorHandler = (err, vm, info) => {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in
}
```

Assign a handler for uncaught errors during component render function and watchers. The handler gets called with the error and the application instance.

> Error tracking services [Sentry](https://sentry.io/for/vue/) and [Bugsnag](https://docs.bugsnag.com/platforms/browsers/vue/) provide official integrations using this option.

## warnHandler

- **Type:** `Function`

- **Default:** `undefined`

- **Usage:**

```js
app.config.warnHandler = function(msg, vm, trace) {
  // `trace` is the component hierarchy trace
}
```

Assign a custom handler for runtime Vue warnings. Note this only works during development and is ignored in production.

## globalProperties

- **Type:** `[key: string]: any`

- **Default:** `undefined`

- **Usage:**

```js
app.config.globalProperties.foo = 'bar'

app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})
```

Adds a global property that can be accessed in any component instance inside the application. The component’s property will take priority when there are conflicting keys.

This can replace Vue 2.x `Vue.prototype` extending:

```js
// Before
Vue.prototype.$http = () => {}

// After
const app = Vue.createApp({})
app.config.globalProperties.$http = () => {}
```

## isCustomElement

- **Type:** `(tag: string) => boolean`

- **Default:** `undefined`

- **Usage:**

```js
// any element starting with 'ion-' will be recognized as a custom one
app.config.isCustomElement = tag => tag.startsWith('ion-')
```

Specifies a method to recognize custom elements defined outside of Vue (e.g., using the Web Components APIs). If component matches this condition, it won't need local or global registration and Vue won't throw a warning about an `Unknown custom element`.

> Note that all native HTML and SVG tags don't need to be matched in this function - Vue parser performs this check automatically

::: tip Important
This config option is only respected when using the runtime compiler. If you are using the runtime-only build, `isCustomElement` must be passed to `@vue/compiler-dom` in the build setup instead - for example, via the [`compilerOptions` option in vue-loader](https://vue-loader.vuejs.org/options.html#compileroptions).
:::

## optionMergeStrategies

- **Type:** `{ [key: string]: Function }`

- **Default:** `{}`

- **Usage:**

```js
const app = Vue.createApp({
  mounted() {
    console.log(this.$options.hello)
  }
})

app.config.optionMergeStrategies.hello = (parent, child, vm) => {
  return `Hello, ${child}`
}

app.mixin({
  hello: 'Vue'
})

// 'Hello, Vue'
```

Define merging strategies for custom options.

The merge strategy receives the value of that option defined on the parent and child instances as the first and second arguments, respectively. The context application instance is passed as the third argument.

- **See also:** [Custom Option Merging Strategies](../guide/mixins.html#custom-option-merge-strategies)

## performance

- **Type:** `boolean`

- **Default:** `false`

- **Usage**:

Set this to `true` to enable component init, compile, render and patch performance tracing in the browser devtool performance/timeline panel. Only works in development mode and in browsers that support the [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API.
