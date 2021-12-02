# Component Instance

> Properties and methods exposed on the component instance, i.e. `this`.

## $data

- **Type:** `Object`

- **Details:**

  The data object that the component instance is observing. The component instance proxies access to the properties on its data object.

- **See also:** [Options / Data - data](./options-state.html#data-2)

## $props

- **Type:** `Object`

- **Details:**

  An object representing the current props a component has received. The component instance proxies access to the properties on its props object.

## $el

- **Type:** `any`

- **Read only**

- **Details:**

  The root DOM element that the component instance is managing.

  For components with multiple root nodes, `$el` will be the placeholder DOM node that Vue uses to keep track of the component's position in the DOM. It is recommended to use [template refs](/guide/essentials/template-refs.html) for direct access to DOM elements instead of relying on `$el`.

## $options

- **Type:** `Object`

- **Read only**

- **Details:**

  The instantiation options used for the current component instance. This is useful when you want to include custom properties in the options:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

## $parent

- **Type:** `Component instance`

- **Read only**

- **Details:**

  The parent instance, if the current instance has one.

## $root

- **Type:** `Component instance`

- **Read only**

- **Details:**

  The root component instance of the current component tree. If the current instance has no parents this value will be itself.

## $slots

- **Type:** `{ [name: string]: (...args: any[]) => Array<VNode> | undefined }`

- **Read only**

- **Details:**

  Used to programmatically access content [distributed by slots](/guide/essentials/component-basics.html#content-distribution-with-slots). Each [named slot](/guide/components/slots.html#named-slots) has its own corresponding property (e.g. the contents of `v-slot:foo` will be found at `this.$slots.foo()`). The `default` property contains either nodes not included in a named slot or contents of `v-slot:default`.

  Accessing `this.$slots` is most useful when writing a component with a [render function](/guide/advanced/render-function.html).

- **Example:**

  ```vue-html
  <blog-post>
    <template v-slot:header>
      <h1>About Me</h1>
    </template>

    <template v-slot:default>
      <p>
        Here's some page content, which will be included in $slots.default.
      </p>
    </template>

    <template v-slot:footer>
      <p>Copyright 2020 Evan You</p>
    </template>
  </blog-post>
  ```

  ```js
  const { createApp, h } = Vue
  const app = createApp({})

  app.component('blog-post', {
    render() {
      return h('div', [
        h('header', this.$slots.header()),
        h('main', this.$slots.default()),
        h('footer', this.$slots.footer())
      ])
    }
  })
  ```

- **See also:**
  - [`<slot>` Component](built-in-components.html#slot)
  - [Content Distribution with Slots](/guide/essentials/component-basics.html#content-distribution-with-slots)
  - [Render Functions - Slots](/guide/advanced/render-function.html#slots)

## $refs

- **Type:** `Object`

- **Read only**

- **Details:**

An object of DOM elements and component instances, registered with [`ref` attributes](/guide/essentials/template-refs.html).

- **See also:**
  - [Template refs](/guide/essentials/template-refs.html)
  - [Special Attributes - ref](./built-in-special-attributes.md#ref)

## $attrs

- **Type:** `Object`

- **Read only**

- **Details:**

Contains parent-scope attribute bindings and events that are not recognized (and extracted) as component [props](./options-state.html#props) or [custom events](./options-state.html#emits). When a component doesn't have any declared props or custom events, this essentially contains all parent-scope bindings, and can be passed down to an inner component via `v-bind="$attrs"` - useful when creating higher-order components.

- **See also:**
  - [Fallthrough Attributes](/guide/components/attrs.html)
  - [Options / Misc - inheritAttrs](./options-misc.html#inheritattrs)

## $watch()

- **Arguments:**

  - `{string | Function} source`
  - `{Function | Object} callback`
  - `{Object} options (optional)`
    - `{boolean} deep`
    - `{boolean} immediate`
    - `{string} flush`

- **Returns:** `{Function} unwatch`

- **Usage:**

  Watch a reactive property or a computed function on the component instance for changes. The callback gets called with the new value and the old value for the given property. We can only pass top-level `data`, `props`, or `computed` property name as a string. For more complex expressions or nested properties, use a function instead.

- **Example:**

  ```js
  const app = createApp({
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: 4
        }
      }
    },
    created() {
      // top-level property name
      this.$watch('a', (newVal, oldVal) => {
        // do something
      })

      // function for watching a single nested property
      this.$watch(
        () => this.c.d,
        (newVal, oldVal) => {
          // do something
        }
      )

      // function for watching a complex expression
      this.$watch(
        // every time the expression `this.a + this.b` yields a different result,
        // the handler will be called. It's as if we were watching a computed
        // property without defining the computed property itself
        () => this.a + this.b,
        (newVal, oldVal) => {
          // do something
        }
      )
    }
  })
  ```

  When watched value is an object or array, any changes to its properties or elements won't trigger the watcher because they reference the same object/array:

  ```js
  const app = createApp({
    data() {
      return {
        article: {
          text: 'Vue is awesome!'
        },
        comments: ['Indeed!', 'I agree']
      }
    },
    created() {
      this.$watch('article', () => {
        console.log('Article changed!')
      })

      this.$watch('comments', () => {
        console.log('Comments changed!')
      })
    },
    methods: {
      // These methods won't trigger a watcher because we changed only a property of object/array,
      // not the object/array itself
      changeArticleText() {
        this.article.text = 'Vue 3 is awesome'
      },
      addComment() {
        this.comments.push('New comment')
      },

      // These methods will trigger a watcher because we replaced object/array completely
      changeWholeArticle() {
        this.article = { text: 'Vue 3 is awesome' }
      },
      clearComments() {
        this.comments = []
      }
    }
  })
  ```

  `$watch` returns an unwatch function that stops firing the callback:

  ```js
  const app = createApp({
    data() {
      return {
        a: 1
      }
    }
  })

  const vm = app.mount('#app')

  const unwatch = vm.$watch('a', cb)
  // later, teardown the watcher
  unwatch()
  ```

- **Option: deep**

  To also detect nested value changes inside Objects, you need to pass in `deep: true` in the options argument. This option also can be used to watch array mutations.

  > Note: when mutating (rather than replacing) an Object or an Array and watch with deep option, the old value will be the same as new value because they reference the same Object/Array. Vue doesn't keep a copy of the pre-mutate value.

  ```js
  vm.$watch('someObject', callback, {
    deep: true
  })
  vm.someObject.nestedValue = 123
  // callback is fired
  ```

- **Option: immediate**

  Passing in `immediate: true` in the option will trigger the callback immediately with the current value of the expression:

  ```js
  vm.$watch('a', callback, {
    immediate: true
  })
  // `callback` is fired immediately with current value of `a`
  ```

  Note that with `immediate` option you won't be able to unwatch the given property on the first callback call.

  ```js
  // This will cause an error
  const unwatch = vm.$watch(
    'value',
    function () {
      doSomething()
      unwatch()
    },
    { immediate: true }
  )
  ```

  If you still want to call an unwatch function inside the callback, you should check its availability first:

  ```js
  let unwatch = null

  unwatch = vm.$watch(
    'value',
    function () {
      doSomething()
      if (unwatch) {
        unwatch()
      }
    },
    { immediate: true }
  )
  ```

- **Option: flush**

  The `flush` option allows for greater control over the timing of the callback. It can be set to `'pre'`, `'post'` or `'sync'`.

  The default value is `'pre'`, which specifies that the callback should be invoked before rendering. This allows the callback to update other values before the template runs.

  The value `'post'` can be used to defer the callback until after rendering. This should be used if the callback needs access to the updated DOM or child components via `$refs`.

  If `flush` is set to `'sync'`, the callback will be called synchronously, as soon as the value changes.

  For both `'pre'` and `'post'`, the callback is buffered using a queue. The callback will only be added to the queue once, even if the watched value changes multiple times. The interim values will be skipped and won't be passed to the callback.

  Buffering the callback not only improves performance but also helps to ensure data consistency. The watchers won't be triggered until the code performing the data updates has finished.

  `'sync'` watchers should be used sparingly, as they don't have these benefits.

  For more information about `flush` see [Effect Flush Timing](/guide/essentials/watchers.html#effect-flush-timing).

- **See also:** [Watchers](/guide/essentials/watchers.html)

## $emit()

- **Arguments:**

  - `{string} eventName`
  - `...args (optional)`

  Trigger an event on the current instance. Any additional arguments will be passed into the listener's callback function.

- **Examples:**

  Using `$emit` with only an event name:

  ```vue-html
  <div id="emit-example-simple">
    <welcome-button v-on:welcome="sayHi"></welcome-button>
  </div>
  ```

  ```js
  const app = createApp({
    methods: {
      sayHi() {
        console.log('Hi!')
      }
    }
  })

  app.component('welcome-button', {
    emits: ['welcome'],
    template: `
      <button v-on:click="$emit('welcome')">
        Click me to be welcomed
      </button>
    `
  })

  app.mount('#emit-example-simple')
  ```

  Using `$emit` with additional arguments:

  ```vue-html
  <div id="emit-example-argument">
    <advice-component v-on:advise="showAdvice"></advice-component>
  </div>
  ```

  ```js
  const app = createApp({
    methods: {
      showAdvice(advice) {
        alert(advice)
      }
    }
  })

  app.component('advice-component', {
    emits: ['advise'],
    data() {
      return {
        adviceText: 'Some advice'
      }
    },
    template: `
      <div>
        <input type="text" v-model="adviceText">
        <button v-on:click="$emit('advise', adviceText)">
          Click me for sending advice
        </button>
      </div>
    `
  })

  app.mount('#emit-example-argument')
  ```

- **See also:**
  - [`emits` option](./options-state.html#emits)
  - [Emitting a Value With an Event](/guide/essentials/component-basics.html#emitting-a-value-with-an-event)

## $forceUpdate()

- **Usage:**

  Force the component instance to re-render. Note it does not affect all child components, only the instance itself and child components with inserted slot content.

## $nextTick()

- **Arguments:**

  - `{Function} callback (optional)`

- **Usage:**

  Defer the callback to be executed after the next DOM update cycle. Use it immediately after you've changed some data to wait for the DOM update. This is the same as the global `nextTick`, except that the callback's `this` context is automatically bound to the instance calling this method.

- **Example:**

  ```js
  createApp({
    // ...
    methods: {
      // ...
      example() {
        // modify data
        this.message = 'changed'
        // DOM is not updated yet
        this.$nextTick(function () {
          // DOM is now updated
          // `this` is bound to the current instance
          this.doSomethingElse()
        })
      }
    }
  })
  ```

- **See also:** [nextTick](general.html#nexttick)
