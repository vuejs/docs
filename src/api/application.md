# Application API

## createApp()

<!--
  TODO rework this
  TODO document that you can pass props to the root component
-->

In Vue 3, APIs that globally mutate Vue's behavior are now moved to application instances created by the new `createApp` method. In addition, their effects are now scoped to that specific application's instance:

```js
import { createApp } from 'vue'

const app = createApp({})
```

Calling `createApp` returns an application instance. This instance provides an application context. The entire component tree mounted by the application instance share the same context, which provides the configurations that were previously "global" in Vue 2.x.

In addition, since the `createApp` method returns the application instance itself, you can chain other methods after it which can be found in the following sections.

## createSSRApp()

<!-- TODO -->

## app.mount()

- **Arguments:**

  - `{Element | string} rootContainer`
  - `{boolean} isHydrate (optional)`

- **Returns:**

  - The root component instance

- **Usage:**

  The `innerHTML` of the provided DOM element will be replaced with the rendered template of the application root component.

- **Example:**

```vue-html
<body>
  <div id="my-app"></div>
</body>
```

```js
import { createApp } from 'vue'

const app = createApp({})
// do some necessary preparations
app.mount('#my-app')
```

- **See also:**
  - [Lifecycle Diagram](/)

## app.unmount()

- **Usage:**

  Unmounts a root component of the application instance.

- **Example:**

```vue-html
<body>
  <div id="my-app"></div>
</body>
```

```js
import { createApp } from 'vue'

const app = createApp({})
// do some necessary preparations
app.mount('#my-app')

// Application will be unmounted 5 seconds after mount
setTimeout(() => app.unmount(), 5000)
```

## app.provide()

- **Arguments:**

  - `{string | Symbol} key`
  - `value`

- **Returns:**

  - The application instance

- **Usage:**

  Sets a value that can be injected into all components within the application. Components should use `inject` to receive the provided values.

  From a `provide`/`inject` perspective, the application can be thought of as the root-level ancestor, with the root component as its only child.

  This method should not be confused with the [provide component option](/) or the [provide function](/) in the composition API. While those are also part of the same `provide`/`inject` mechanism, they are used to configure values provided by a component rather than an application.

  Providing values via the application is especially useful when writing plugins, as plugins typically wouldn't be able to provide values using components. It is an alternative to using [globalProperties](/).

  :::tip Note
  The `provide` and `inject` bindings are NOT reactive. This is intentional. However, if you pass down an observed object, properties on that object do remain reactive.
  :::

- **Example:**

  Injecting a property into the root component, with a value provided by the application:

```js
import { createApp } from 'vue'

const app = createApp({
  inject: ['user'],
  template: `
    <div>
      {{ user }}
    </div>
  `
})

app.provide('user', 'administrator')
```

- **See also:**
  - [Provide / Inject](/)

## app.component()

- **Arguments:**

  - `{string} name`
  - `{Function | Object} definition (optional)`

- **Returns:**

  - The application instance if a `definition` argument was passed
  - The component definition if a `definition` argument was not passed

- **Usage:**

  Register or retrieve a global component. Registration also automatically sets the component's `name` with the given `name` parameter.

- **Example:**

```js
import { createApp } from 'vue'

const app = createApp({})

// register an options object
app.component('my-component', {
  /* ... */
})

// retrieve a registered component
const MyComponent = app.component('my-component')
```

- **See also:** [Components](/)

## app.directive()

- **Arguments:**

  - `{string} name`
  - `{Function | Object} definition (optional)`

- **Returns:**

  - The application instance if a `definition` argument was passed
  - The directive definition if a `definition` argument was not passed

- **Usage:**

  Register or retrieve a global directive.

- **Example:**

```js
import { createApp } from 'vue'
const app = createApp({})

// register
app.directive('my-directive', {
  // Directive has a set of lifecycle hooks:
  // called before bound element's attributes or event listeners are applied
  created() {},
  // called before bound element's parent component is mounted
  beforeMount() {},
  // called when bound element's parent component is mounted
  mounted() {},
  // called before the containing component's VNode is updated
  beforeUpdate() {},
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated() {},
  // called before the bound element's parent component is unmounted
  beforeUnmount() {},
  // called when the bound element's parent component is unmounted
  unmounted() {}
})

// register (function directive)
app.directive('my-directive', () => {
  // this will be called as `mounted` and `updated`
})

// getter, return the directive definition if registered
const myDirective = app.directive('my-directive')
```

Directive hooks are passed these arguments:

#### el

The element the directive is bound to. This can be used to directly manipulate the DOM.

#### binding

An object containing the following properties.

- `instance`: The instance of the component where directive is used.
- `value`: The value passed to the directive. For example in `v-my-directive="1 + 1"`, the value would be `2`.
- `oldValue`: The previous value, only available in `beforeUpdate` and `updated`. It is available whether or not the value has changed.
- `arg`: The argument passed to the directive, if any. For example in `v-my-directive:foo`, the arg would be `"foo"`.
- `modifiers`: An object containing modifiers, if any. For example in `v-my-directive.foo.bar`, the modifiers object would be `{ foo: true, bar: true }`.
- `dir`: an object, passed as a parameter when directive is registered. For example, in the directive

```js
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

`dir` would be the following object:

```js
{
  mounted(el) {
    el.focus()
  }
}
```

#### vnode

A blueprint of the real DOM element received as el argument above.

#### prevNode

The previous virtual node, only available in the `beforeUpdate` and `updated` hooks.

:::tip Note
Apart from `el`, you should treat these arguments as read-only and never modify them. If you need to share information across hooks, it is recommended to do so through element's [dataset](/).
:::

- **See also:** [Custom Directives](/)

## app.use()

- **Arguments:**

  - `{Object | Function} plugin`
  - `...options (optional)`

- **Returns:**

  - The application instance

- **Usage:**

  Install a Vue.js plugin. If the plugin is an Object, it must expose an `install` method. If it is a function itself, it will be treated as the install method.

  The install method will be called with the application as its first argument. Any `options` passed to `use` will be passed on in subsequent arguments.

  When this method is called on the same plugin multiple times, the plugin will be installed only once.

- **Example:**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({})

  app.use(MyPlugin)
  app.mount('#app')
  ```

- **See also:** [Plugins](/)

## app.mixin()

- **Arguments:**

  - `{Object} mixin`

- **Returns:**

  - The application instance

- **Usage:**

  Apply a mixin in the whole application scope. Once registered they can be used in the template of any component within the current application. This can be used by plugin authors to inject custom behavior into components. **Not recommended in application code**.

- **See also:** [Global Mixin](/)

## app.version

- **Usage:**

  Provides the installed version of Vue as a string. This is especially useful for community [plugins](/), where you might use different strategies for different versions.

- **Example:**

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])

      if (version < 3) {
        console.warn('This plugin requires Vue 3')
      }

      // ...
    }
  }
  ```

- **See also**: [Global API - version](/)

## app.config

Every Vue application exposes a `config` object that contains the configuration settings for that application:

```js
const app = createApp({})

console.log(app.config)
```

You can modify its properties, listed below, before mounting your application.

## app.config.errorHandler

- **Type:** `Function`

- **Default:** `undefined`

- **Usage:**

```js
app.config.errorHandler = (err, instance, info) => {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in
}
```

Assign a handler for uncaught errors during component render function and watchers. The handler gets called with the error and the application instance.

> Error tracking services [Sentry](/) and [Bugsnag](/) provide official integrations using this option.

## app.config.warnHandler

- **Type:** `Function`

- **Default:** `undefined`

- **Usage:**

```js
app.config.warnHandler = function (msg, instance, trace) {
  // `trace` is the component hierarchy trace
}
```

Assign a custom handler for runtime Vue warnings. Note this only works during development and is ignored in production.

## app.config.globalProperties

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

## app.config.optionMergeStrategies

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

- **See also:** [Custom Option Merging Strategies](/)

## app.config.performance

- **Type:** `boolean`

- **Default:** `false`

- **Usage**:

  Set this to `true` to enable component init, compile, render and patch performance tracing in the browser devtool performance/timeline panel. Only works in development mode and in browsers that support the [performance.mark](/) API.

## app.config.compilerOptions

- **Type:** `Object`

Configure runtime compiler options. Values set on this object will be passed to the in-browser template compiler and affect every component in the configured app. Note you can also override these options on a per-component basis using the [`compilerOptions` option](/).

::: warning Important
This config option is only respected when using the full build (i.e. the standalone `vue.js` that can compile templates in the browser). If you are using the runtime-only build with a build setup, compiler options must be passed to `@vue/compiler-dom` via build tool configurations instead.

- For `vue-loader`: [pass via the `compilerOptions` loader option](/). Also see [how to configure it in `vue-cli`](/).

- For `vite`: [pass via `@vitejs/plugin-vue` options](/).
  :::

### compilerOptions.isCustomElement

- **Type:** `(tag: string) => boolean`

- **Default:** `undefined`

- **Usage:**

```js
// any element starting with 'ion-' will be recognized as a custom one
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ion-')
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
