# Instance Methods

## \$watch

- **Arguments:**

  - `{string | Function} source`
  - `{Function | Object} callback`
  - `{Object} options (optional)`
    - `{boolean} deep`
    - `{boolean} immediate`

- **Returns:** `{Function} unwatch`

- **Usage:**

  Watch a reactive property or a computed function on the component instance for changes. The callback gets called with the new value and the old value for the given property. We can only pass top-level `data`, `prop`, or `computed` property name as a string. For more complex expressions or nested properties, use a function instead.

- **Example:**

  ```js
  const app = Vue.createApp({
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

  When watched value is an Object or Array, any changes to its properties or elements won't trigger the watcher because they reference the same Object/Array:

  ```js
  const app = Vue.createApp({
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
      // These methods won't trigger a watcher because we changed only a property of Object/Array,
      // not the Object/Array itself
      changeArticleText() {
        this.article.text = 'Vue 3 is awesome'
      },
      addComment() {
        this.comments.push('New comment')
      },

      // These methods will trigger a watcher because we replaced Object/Array completely
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
  const app = Vue.createApp({
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

  To also detect nested value changes inside Objects, you need to pass in `deep: true` in the options argument. Note that you don't need to do so to listen for Array mutations.

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
    function() {
      doSomething()
      unwatch()
    },
    { immediate: true }
  )
  ```

  If you still want to call an unwatch function inside the callback, you should check its availability first:

  ```js
  const unwatch = vm.$watch(
    'value',
    function() {
      doSomething()
      if (unwatch) {
        unwatch()
      }
    },
    { immediate: true }
  )
  ```

- **See also:** [Watchers](../guide/computed.html#watchers)

## \$emit

- **Arguments:**

  - `{string} eventName`
  - `...args (optional)`

  Trigger an event on the current instance. Any additional arguments will be passed into the listener's callback function.

- **Examples:**

  Using `$emit` with only an event name:

  ```html
  <div id="emit-example-simple">
    <welcome-button v-on:welcome="sayHi"></welcome-button>
  </div>
  ```

  ```js
  const app = Vue.createApp({
    methods: {
      sayHi() {
        console.log('Hi!')
      }
    }
  })

  app.component('welcome-button', {
    template: `
      <button v-on:click="$emit('welcome')">
        Click me to be welcomed
      </button>
    `
  })

  app.mount('#emit-example-simple')
  ```

  Using `$emit` with additional arguments:

  ```html
  <div id="emit-example-argument">
    <advice-component v-on:give-advice="showAdvice"></advice-component>
  </div>
  ```

  ```js
  const app = Vue.createApp({
    methods: {
      showAdvice(advice) {
        alert(advice)
      }
    }
  })

  app.component('advice-component', {
    data() {
      return {
        adviceText: 'Some advice'
      }
    },
    template: `
      <div>
        <input type="text" v-model="adviceText">
        <button v-on:click="$emit('give-advice', adviceText)">
          Click me for sending advice
        </button>
      </div>
    `
  })
  ```

- **See also:**
  - [`emits` option](./options-data.html#emits)
  - [Emitting a Value With an Event](../guide/component-basics.html#emitting-a-value-with-an-event)

## \$forceUpdate

- **Usage:**

  Force the component instance to re-render. Note it does not affect all child components, only the instance itself and child components with inserted slot content.

## \$nextTick

- **Arguments:**

  - `{Function} callback (optional)`

- **Usage:**

  Defer the callback to be executed after the next DOM update cycle. Use it immediately after you've changed some data to wait for the DOM update. This is the same as the global `nextTick`, except that the callback's `this` context is automatically bound to the instance calling this method.

- **Example:**

  ```js
  Vue.createApp({
    // ...
    methods: {
      // ...
      example() {
        // modify data
        this.message = 'changed'
        // DOM is not updated yet
        this.$nextTick(function() {
          // DOM is now updated
          // `this` is bound to the current instance
          this.doSomethingElse()
        })
      }
    }
  })
  ```

- **See also:** [nextTick](global-api.html#nexttick)
