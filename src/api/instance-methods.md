# Instance Methods

## \$watch

- **Arguments:**

  - `{string | Function} source`
  - `{Function | Object} callback`
  - `{Object} [options]`
    - `{boolean} deep`
    - `{boolean} immediate`

- **Returns:** `{Function} unwatch`

- **Usage:**

  Watch an expression or a computed function on the Vue instance for changes. The callback gets called with the new value and the old value. The expression only accepts dot-delimited paths. For more complex expressions, use a function instead.

  :::tip Note
  When mutating (rather than replacing) an Object or an Array, the old value will be the same as new value because they reference the same Object/Array. Vue doesn't keep a copy of the pre-mutate value.
  :::

- **Example:**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        a: 1,
        b: 2
      }
    },
    created() {
      // keypath
      this.$watch('a', (newVal, oldVal) => {
        // do something
      })

      // function
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
  var unwatch = vm.$watch(
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
