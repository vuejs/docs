# Application API {#application-api}

## createApp() {#createapp}

Создает экземпляр приложения.

- **Тип:**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **Подробности:**

  Первым аргументом является корневой компонент. Вторым необязательным аргументом являются входные параметры, которые должны быть переданы корневому компоненту.

- **Пример:**

  Со встроенным корневым компонентом:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* параметры корневого компонента */
  })
  ```

  С импортируемым компонентом:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **См. также:** [Guide - Creating a Vue Application](/guide/essentials/application.html)

## createSSRApp() {#createssrapp}

Создает экземпляр приложения в режиме [SSR Hydration](/guide/scaling-up/ssr.html#client-hydration). Используется точно так же, как `createApp()`.

## app.mount() {#app-mount}

Монтирует экземпляр приложения в элемент контейнера.

- **Тип:**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **Подробности:**

  Аргумент может быть либо фактическим элементом DOM, либо селектором CSS (будет использоваться первый соответствующий элемент). Аргумент вернет корневой экземпляр компонента.

 Если для компонента определен шаблон или функция рендеринга, он заменит все существующие узлы DOM внутри контейнера. В противном случае, если доступен runtime компилятор, в качестве шаблона будет использоваться `innerHTML`.

  В режиме гидратации SSR гидратирует существующие узлы DOM внутри контейнера. Если имеются [несоответствия](/guide/scaling-up/ssr.html#hydration-mismatch), существующие узлы DOM будут изменены, чтобы соответствовать ожидаемому результату.

  Следует отметить, что для каждого экземпляра приложения `mount()` может быть вызван только один раз.

- **Пример:**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  Может также монтироваться к фактическому DOM элементу:

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount() {#app-unmount}

 Размонтирует смонтированный экземпляр приложения, запуская хуки жизненного цикла размонтирования для всех компонентов в дереве компонентов приложения.

- **Тип:**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.provide() {#app-provide}

 Предоставляет значение, которое может быть внедрено во все дочерние компоненты в приложении.

- **Тип:**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **Подробности:**

  Ожидает ключ инъекции в качестве первого аргумента, а предоставленное значение - в качестве второго. В итоге возвращает непосредственно сам экземпляр приложения.

- **Пример:**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'привет')
  ```

  Внутри компонента в приложении:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'привет'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'привет'
    }
  }
  ```

  </div>

- **См. также:**
  - [Provide / Inject](/guide/components/provide-inject.html)
  - [App-level Provide](/guide/components/provide-inject.html#app-level-provide)

## app.component() {#app-component}

Registers a global component if passing both a name string and a component definition, or retrieves an already registered one if only the name is passed.

- **Тип:**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **Пример:**

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

- **См. также:** [Component Registration](/guide/components/registration.html)

## app.directive() {#app-directive}

Registers a global custom directive if passing both a name string and a directive definition, or retrieves an already registered one if only the name is passed.

- **Тип:**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **Пример:**

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

- **См. также:** [Custom Directives](/guide/reusability/custom-directives.html)

## app.use() {#app-use}

Installs a [plugin](/guide/reusability/plugins.html).

- **Тип:**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **Подробности:**

  Expects the plugin as the first argument, and optional plugin options as the second argument.

  The plugin can either be an object with an `install()` method, or just a function that will be used as the `install()` method. The options (second argument of `app.use()`) will be passed along to the plugin's `install()` method.

  When `app.use()` is called on the same plugin multiple times, the plugin will be installed only once.

- **Пример:**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **См. также:** [Plugins](/guide/reusability/plugins.html)

## app.mixin() {#app-mixin}

Applies a global mixin (scoped to the application). A global mixin applies its included options to every component instance in the application.

:::warning Не рекомендуется
Mixins are supported in Vue 3 mainly for backwards compatibility, due to their widespread use in ecosystem libraries. Use of mixins, especially global mixins, should be avoided in application code.

For logic reuse, prefer [Composables](/guide/reusability/composables.html) instead.
:::

- **Тип:**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.version {#app-version}

Provides the version of Vue that the application was created with. This is useful inside [plugins](/guide/reusability/plugins.html), where you might need conditional logic based on different Vue versions.

- **Тип:**

  ```ts
  interface App {
    version: string
  }
  ```

- **Пример:**

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

- **См. также:** [Global API - version](/api/general.html#version)

## app.config {#app-config}

Every application instance exposes a `config` object that contains the configuration settings for that application. You can modify its properties (documented below) before mounting your application.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler {#app-config-errorhandler}

Assign a global handler for uncaught errors propagating from within the application.

- **Тип:**

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

- **Подробности:**

  The error handler receives three arguments: the error, the component instance that triggered the error, and an information string specifying the error source type.

  It can capture errors from the following sources:

  - Component renders
  - Event handlers
  - Lifecycle hooks
  - `setup()` function
  - Watchers
  - Custom directive hooks
  - Transition hooks

- **Пример:**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // handle error, e.g. report to a service
  }
  ```

## app.config.warnHandler {#app-config-warnhandler}

Assign a custom handler for runtime warnings from Vue.

- **Тип:**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **Подробности:**

  The warning handler receives the warning message as the first argument, the source component instance as the second argument, and a component trace string as the third.

  It can be used to filter out specific warnings to reduce console verbosity. All Vue warnings should be addressed during development, so this is only recommended during debug sessions to focus on specific warnings among many, and should be removed once the debugging is done.

  :::tip Совет
  Warnings only work during development, so this config is ignored in production mode.
  :::

- **Пример:**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` is the component hierarchy trace
  }
  ```

## app.config.performance {#app-config-performance}

Set this to `true` to enable component init, compile, render and patch performance tracing in the browser devtool performance/timeline panel. Only works in development mode and in browsers that support the [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API.

- **Тип:** `boolean`

- **См. также:** [Guide - Performance](/guide/best-practices/performance.html)

## app.config.compilerOptions {#app-config-compileroptions}

Configure runtime compiler options. Values set on this object will be passed to the in-browser template compiler and affect every component in the configured app. Note you can also override these options on a per-component basis using the [`compilerOptions` option](/api/options-rendering.html#compileroptions).

:::warning Важно
This config option is only respected when using the full build (i.e. the standalone `vue.js` that can compile templates in the browser). If you are using the runtime-only build with a build setup, compiler options must be passed to `@vue/compiler-dom` via build tool configurations instead.

- For `vue-loader`: [pass via the `compilerOptions` loader option](https://vue-loader.vuejs.org/options.html#compileroptions). Also see [how to configure it in `vue-cli`](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

- For `vite`: [pass via `@vitejs/plugin-vue` options](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options).
:::

### app.config.compilerOptions.isCustomElement {#app-config-compileroptions-iscustomelement}

Specifies a check method to recognize native custom elements.

- **Тип:** `(tag: string) => boolean`

- **Подробности:**

  Should return `true` if the tag should be treated as a native custom element. For a matched tag, Vue will render it as a native element instead of attempting to resolve it as a Vue component.

  Native HTML and SVG tags don't need to be matched in this function - Vue's parser recognizes them automatically.

- **Пример:**

  ```js
  // treat all tags starting with 'ion-' as custom elements
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **См. также:** [Vue and Web Components](/guide/extras/web-components.html)

### app.config.compilerOptions.whitespace {#app-config-compileroptions-whitespace}

Adjusts template whitespace handling behavior.

- **Тип:** `'condense' | 'preserve'`

- **По умолчанию:** `'condense'`

- **Подробности:**

  Vue removes / condenses whitespace characters in templates to produce more efficient compiled output. The default strategy is "condense", with the following behavior:

  1. Leading / ending whitespace characters inside an element are condensed into a single space.
  2. Whitespace characters between elements that contain newlines are removed.
  3. Consecutive whitespace characters in text nodes are condensed into a single space.

  Setting this option to `'preserve'` will disable (2) and (3).

- **Пример:**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters {#app-config-compileroptions-delimiters}

Adjusts the delimiters used for text interpolation within the template.

- **Тип:** `[string, string]`

- **По умолчанию:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **Подробности:**

  This is typically used to avoid conflicting with server-side frameworks that also use mustache syntax.

- **Пример:**

  ```js
  // Delimiters changed to ES6 template string style
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments {#app-config-compileroptions-comments}

Adjusts treatment of HTML comments in templates.

- **Тип:** `boolean`

- **По умолчанию:** `false`

- **Подробности:**

  By default, Vue will remove the comments in production. Setting this option to `true` will force Vue to preserve comments even in production. Comments are always preserved during development. This option is typically used when Vue is used with other libraries that rely on HTML comments.

- **Пример:**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties {#app-config-globalproperties}

An object that can be used to register global properties that can be accessed on any component instance inside the application.

- **Тип:**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **Подробности:**

  This is a replacement of Vue 2's `Vue.prototype` which is no longer present in Vue 3. As with anything global, this should be used sparingly.

  If a global property conflicts with a component’s own property, the component's own property will have higher priority.

- **Использование:**

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
  
- **See also:** [Guide - Augmenting Global Properties](/guide/typescript/options-api.html#augmenting-global-properties) <sup class="vt-badge ts" />

## app.config.optionMergeStrategies {#app-config-optionmergestrategies}

An object for defining merging strategies for custom component options.

- **Тип:**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **Подробности:**

  Some plugins / libraries add support for custom component options (by injecting global mixins). These options may require special merging logic when the same option needs to be "merged" from multiple sources (e.g. mixins or component inheritance).

  A merge strategy function can be registered for a custom option by assigning it on the `app.config.optionMergeStrategies` object using the option's name as the key.

  The merge strategy function receives the value of that option defined on the parent and child instances as the first and second arguments, respectively.

- **Пример:**

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

- **См. также:** [Component Instance - `$options`](/api/component-instance.html#options)
