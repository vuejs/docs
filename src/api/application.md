# Application API {#application-api}

## createApp() {#createapp}

Creates an application instance.

- **Type**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **Details**

  The first argument is the root component. The second optional argument is the props to be passed to the root component.

- **Example**

  With inline root component:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* root component options */
  })
  ```

  With imported component:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **See also** [Guide - Creating a Vue Application](/guide/essentials/application)

## createSSRApp() {#createssrapp}

Creates an application instance in [SSR Hydration](/guide/scaling-up/ssr#client-hydration) mode. Usage is exactly the same as `createApp()`.

## app.mount() {#app-mount}

Mounts the application instance in a container element.

- **Type**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **Details**

  The argument can either be an actual DOM element or a CSS selector (the first matched element will be used). Returns the root component instance.

  If the component has a template or a render function defined, it will replace any existing DOM nodes inside the container. Otherwise, if the runtime compiler is available, the `innerHTML` of the container will be used as the template.

  In SSR hydration mode, it will hydrate the existing DOM nodes inside the container. If there are [mismatches](/guide/scaling-up/ssr#hydration-mismatch), the existing DOM nodes will be morphed to match the expected output.

  For each app instance, `mount()` can only be called once.

- **Example**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  Can also mount to an actual DOM element:

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount() {#app-unmount}

Unmounts a mounted application instance, triggering the unmount lifecycle hooks for all components in the application's component tree.

- **Type**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.component() {#app-component}

Registers a global component if passing both a name string and a component definition, or retrieves an already registered one if only the name is passed.

- **Type**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **Example**

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

- **See also** [Component Registration](/guide/components/registration)

## app.directive() {#app-directive}

Registers a global custom directive if passing both a name string and a directive definition, or retrieves an already registered one if only the name is passed.

- **Type**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **Example**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // register (object directive)
  app.directive('my-directive', {
    /* custom directive hooks */
  })

  // register (function directive shorthand)
  app.directive('my-directive', () => {
    /* ... */
  })

  // retrieve a registered directive
  const myDirective = app.directive('my-directive')
  ```

- **See also** [Custom Directives](/guide/reusability/custom-directives)

## app.use() {#app-use}

Installs a [plugin](/guide/reusability/plugins).

- **Type**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **Details**

  Expects the plugin as the first argument, and optional plugin options as the second argument.

  The plugin can either be an object with an `install()` method, or just a function that will be used as the `install()` method. The options (second argument of `app.use()`) will be passed along to the plugin's `install()` method.

  When `app.use()` is called on the same plugin multiple times, the plugin will be installed only once.

- **Example**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **See also** [Plugins](/guide/reusability/plugins)

## app.mixin() {#app-mixin}

Applies a global mixin (scoped to the application). A global mixin applies its included options to every component instance in the application.

:::warning Not Recommended
Mixins are supported in Vue 3 mainly for backwards compatibility, due to their widespread use in ecosystem libraries. Use of mixins, especially global mixins, should be avoided in application code.

For logic reuse, prefer [Composables](/guide/reusability/composables) instead.
:::

- **Type**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.provide() {#app-provide}

Provide a value that can be injected in all descendant components within the application.

- **Type**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **Details**

  Expects the injection key as the first argument, and the provided value as the second. Returns the application instance itself.

- **Example**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'hello')
  ```

  Inside a component in the application:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'hello'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'hello'
    }
  }
  ```

  </div>

- **See also**
  - [Provide / Inject](/guide/components/provide-inject)
  - [App-level Provide](/guide/components/provide-inject#app-level-provide)
  - [app.runWithContext()](#app-runwithcontext)

## app.runWithContext()<sup class="vt-badge" data-text="3.3+" /> {#app-runwithcontext}

Execute a callback with the current app as injection context.

- **Type**

  ```ts
  interface App {
    runWithContext<T>(fn: () => T): T
  }
  ```

- **Details**

  Expects a callback function and runs the callback immediately. During the synchronous call of the callback, `inject()` calls are able to look up injections from the values provided by the current app, even when there is no current active component instance. The return value of the callback will also be returned.

- **Example**

  ```js
  import { inject } from 'vue'

  app.provide('id', 1)

  const injected = app.runWithContext(() => {
    return inject('id')
  })

  console.log(injected) // 1
  ```

## app.version {#app-version}

Provides the version of Vue that the application was created with. This is useful inside [plugins](/guide/reusability/plugins), where you might need conditional logic based on different Vue versions.

- **Type**

  ```ts
  interface App {
    version: string
  }
  ```

- **Example**

  Performing a version check inside a plugin:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('This plugin requires Vue 3')
      }
    }
  }
  ```

- **See also** [Global API - version](/api/general#version)

## app.config {#app-config}

Every application instance exposes a `config` object that contains the configuration settings for that application. You can modify its properties (documented below) before mounting your application.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler {#app-config-errorhandler}

Assign a global handler for uncaught errors propagating from within the application.

- **Type**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` is a Vue-specific error info,
      // e.g. which lifecycle hook the error was thrown in
      info: string
    ) => void
  }
  ```

- **Details**

  The error handler receives three arguments: the error, the component instance that triggered the error, and an information string specifying the error source type.

  It can capture errors from the following sources:

  - Component renders
  - Event handlers
  - Lifecycle hooks
  - `setup()` function
  - Watchers
  - Custom directive hooks
  - Transition hooks

  :::tip
  In production, the 3rd argument (`info`) will be a shortened code instead of the full information string. You can find the code to string mapping in the [Production Error Code Reference](/error-reference/#runtime-errors).
  :::

- **Example**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // handle error, e.g. report to a service
  }
  ```

## app.config.warnHandler {#app-config-warnhandler}

Assign a custom handler for runtime warnings from Vue.

- **Type**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **Details**

  The warning handler receives the warning message as the first argument, the source component instance as the second argument, and a component trace string as the third.

  It can be used to filter out specific warnings to reduce console verbosity. All Vue warnings should be addressed during development, so this is only recommended during debug sessions to focus on specific warnings among many, and should be removed once the debugging is done.

  :::tip
  Warnings only work during development, so this config is ignored in production mode.
  :::

- **Example**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` is the component hierarchy trace
  }
  ```

## app.config.performance {#app-config-performance}

Set this to `true` to enable component init, compile, render and patch performance tracing in the browser devtool performance/timeline panel. Only works in development mode and in browsers that support the [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API.

- **Type:** `boolean`

- **See also** [Guide - Performance](/guide/best-practices/performance)

## app.config.compilerOptions {#app-config-compileroptions}

Configure runtime compiler options. Values set on this object will be passed to the in-browser template compiler and affect every component in the configured app. Note you can also override these options on a per-component basis using the [`compilerOptions` option](/api/options-rendering#compileroptions).

::: warning Important
This config option is only respected when using the full build (i.e. the standalone `vue.js` that can compile templates in the browser). If you are using the runtime-only build with a build setup, compiler options must be passed to `@vue/compiler-dom` via build tool configurations instead.

- For `vue-loader`: [pass via the `compilerOptions` loader option](https://vue-loader.vuejs.org/options.html#compileroptions). Also see [how to configure it in `vue-cli`](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

- For `vite`: [pass via `@vitejs/plugin-vue` options](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options).
  :::

### app.config.compilerOptions.isCustomElement {#app-config-compileroptions-iscustomelement}

Specifies a check method to recognize native custom elements.

- **Type:** `(tag: string) => boolean`

- **Details**

  Should return `true` if the tag should be treated as a native custom element. For a matched tag, Vue will render it as a native element instead of attempting to resolve it as a Vue component.

  Native HTML and SVG tags don't need to be matched in this function - Vue's parser recognizes them automatically.

- **Example**

  ```js
  // treat all tags starting with 'ion-' as custom elements
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **See also** [Vue and Web Components](/guide/extras/web-components)

### app.config.compilerOptions.whitespace {#app-config-compileroptions-whitespace}

Adjusts template whitespace handling behavior.

- **Type:** `'condense' | 'preserve'`

- **Default:** `'condense'`

- **Details**

  Vue removes / condenses whitespace characters in templates to produce more efficient compiled output. The default strategy is "condense", with the following behavior:

  1. Leading / ending whitespace characters inside an element are condensed into a single space.
  2. Whitespace characters between elements that contain newlines are removed.
  3. Consecutive whitespace characters in text nodes are condensed into a single space.

  Setting this option to `'preserve'` will disable (2) and (3).

- **Example**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters {#app-config-compileroptions-delimiters}

Adjusts the delimiters used for text interpolation within the template.

- **Type:** `[string, string]`

- **Default:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **Details**

  This is typically used to avoid conflicting with server-side frameworks that also use mustache syntax.

- **Example**

  ```js
  // Delimiters changed to ES6 template string style
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments {#app-config-compileroptions-comments}

Adjusts treatment of HTML comments in templates.

- **Type:** `boolean`

- **Default:** `false`

- **Details**

  By default, Vue will remove the comments in production. Setting this option to `true` will force Vue to preserve comments even in production. Comments are always preserved during development. This option is typically used when Vue is used with other libraries that rely on HTML comments.

- **Example**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties {#app-config-globalproperties}

An object that can be used to register global properties that can be accessed on any component instance inside the application.

- **Type**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **Details**

  This is a replacement of Vue 2's `Vue.prototype` which is no longer present in Vue 3. As with anything global, this should be used sparingly.

  If a global property conflicts with a component’s own property, the component's own property will have higher priority.

- **Usage**

  ```js
  app.config.globalProperties.msg = 'hello'
  ```

  This makes `msg` available inside any component template in the application, and also on `this` of any component instance:

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'hello'
    }
  }
  ```

- **See also** [Guide - Augmenting Global Properties](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

## app.config.optionMergeStrategies {#app-config-optionmergestrategies}

An object for defining merging strategies for custom component options.

- **Type**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **Details**

  Some plugins / libraries add support for custom component options (by injecting global mixins). These options may require special merging logic when the same option needs to be "merged" from multiple sources (e.g. mixins or component inheritance).

  A merge strategy function can be registered for a custom option by assigning it on the `app.config.optionMergeStrategies` object using the option's name as the key.

  The merge strategy function receives the value of that option defined on the parent and child instances as the first and second arguments, respectively.

- **Example**

  ```js
  const app = createApp({
    // option from self
    msg: 'Vue',
    // option from a mixin
    mixins: [
      {
        msg: 'Hello '
      }
    ],
    mounted() {
      // merged options exposed on this.$options
      console.log(this.$options.msg)
    }
  })

  // define a custom merge strategy for `msg`
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // logs 'Hello Vue'
  ```

- **See also** [Component Instance - `$options`](/api/component-instance#options)
