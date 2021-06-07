# Application Config

Every Vue application exposes a `config` object that contains the configuration settings for that application:

```js
const app = createApp({})

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
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

## optionMergeStrategies

- **Type:** `{ [key: string]: Function }`

- **Default:** `{}`

- **Usage:**

```js
const app = createApp({
  mounted() {
    console.log(this.$options.hello)
  }
})

app.config.optionMergeStrategies.hello = (parent, child) => {
  return `Hello, ${child}`
}

app.mixin({
  hello: 'Vue'
})

// 'Hello, Vue'
```

Define merging strategies for custom options.

The merge strategy receives the value of that option defined on the parent and child instances as the first and second arguments, respectively.

- **See also:** [Custom Option Merging Strategies](../guide/mixins.html#custom-option-merge-strategies)

## performance

- **Type:** `boolean`

- **Default:** `false`

- **Usage**:

Set this to `true` to enable component init, compile, render and patch performance tracing in the browser devtool performance/timeline panel. Only works in development mode and in browsers that support the [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API.

## compilerOptions <Badge text="3.1+" />

- **Type:** `Object`

Configure runtime compiler options. Values set on this object will be passed to the in-browser template compiler and affect every component in the configured app. Note you can also override these options on a per-component basis using the [`compilerOptions` option](/api/options-misc.html#compileroptions).

::: tip Important
This config option is only respected when using the full build (i.e. the standalone `vue.js` that can compile templates in the browser). If you are using the runtime-only build with a build setup, compiler options must be passed to `@vue/compiler-dom` via build tool configurations instead.

- For `vue-loader`: [pass via the `compilerOptions` loader option](https://vue-loader.vuejs.org/options.html#compileroptions). Also see [how to configure it in `vue-cli`](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

- For `vite`: [pass via `@vitejs/plugin-vue` options](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom).
:::

### compilerOptions.isCustomElement

- **Type:** `(tag: string) => boolean`

- **Default:** `undefined`

- **Usage:**

```js
// any element starting with 'ion-' will be recognized as a custom one
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
```

Specifies a method to recognize custom elements defined outside of Vue (e.g., using the Web Components APIs). If component matches this condition, it won't need local or global registration and Vue won't throw a warning about an `Unknown custom element`.

> Note that all native HTML and SVG tags don't need to be matched in this function - Vue parser performs this check automatically.

### compilerOptions.whitespace

- **Type:** `'condense' | 'preserve'`

- **Default:** `'condense'`

- **Usage:**

```js
app.config.compilerOptions.whitespace = 'preserve'
```

By default, Vue removes/condenses whitespaces between template elements to produce more efficient compiled output:

1. Leading / ending whitespaces inside an element are condensed into a single space
2. Whitespaces between elements that contain newlines are removed
3. Consecutive whitespaces in text nodes are condensed into a single space

Setting the value to `'preserve'` will disable (2) and (3).

### compilerOptions.delimiters

- **Type:** `Array<string>`

- **Default:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **Usage:**

```js
// Delimiters changed to ES6 template string style
app.config.compilerOptions.delimiters = ['${', '}']    
```

Sets the delimiters used for text interpolation within the template.

Typically this is used to avoid conflicting with server-side frameworks that also use mustache syntax.

### compilerOptions.comments

- **Type:** `boolean`

- **Default:** `false`

- **Usage:**

```js
app.config.compilerOptions.comments = true
```

By default, Vue will remove HTML comments inside templates in production. Setting this option to `true` will force Vue to preserve comments even in production. Comments are always preserved during development.

This option is typically used when Vue is used with other libraries that rely on HTML comments.

## isCustomElement <Badge text="deprecated" type="warning"/>

Deprecated in 3.1.0. Use [`compilerOptions.isCustomElement`](#compileroptions-iscustomelement) instead.
