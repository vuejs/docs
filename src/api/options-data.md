# Data

## data

- **Type:** `Function`

- **Details:**

  The function that returns a data object for the component instance. In `data`, we don't recommend to observe objects with their own stateful behavior like browser API objects and prototype properties. A good idea would be to have here just a plain object that represents component data.

  Once observed, you can no longer add reactive properties to the root data object. It is therefore recommended to declare all root-level reactive properties upfront, before creating the instance.

  After the instance is created, the original data object can be accessed as `vm.$data`. The component instance also proxies all the properties found on the data object, so `vm.a` will be equivalent to `vm.$data.a`.

  Properties that start with `_` or `$` will **not** be proxied on the component instance because they may conflict with Vue's internal properties and API methods. You will have to access them as `vm.$data._property`.

- **Example:**

  ```js
  // direct instance creation
  const data = { a: 1 }

  // The object is added to a component instance
  const vm = Vue.createApp({
    data() {
      return data
    }
  }).mount('#app')

  console.log(vm.a) // => 1
  ```

  Note that if you use an arrow function with the `data` property, `this` won't be the component's instance, but you can still access the instance as the function's first argument:

  ```js
  data: vm => ({ a: vm.myProp })
  ```

- **See also:** [Reactivity in Depth](../guide/reactivity.html)

## props

- **Type:** `Array<string> | Object`

- **Details:**

  A list/hash of attributes that are exposed to accept data from the parent component. It has an Array-based simple syntax and an alternative Object-based syntax that allows advanced configurations such as type checking, custom validation and default values.

  With Object-based syntax, you can use following options:

  - `type`: can be one of the following native constructors: `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`, any custom constructor function or an array of those. Will check if a prop has a given type, and will throw a warning if it doesn't. [More information](../guide/component-props.html#prop-types) on prop types.
  - `default`: `any`
    Specifies a default value for the prop. If the prop is not passed, this value will be used instead. Object or array defaults must be returned from a factory function.
  - `required`: `Boolean`
    Defines if the prop is required. In a non-production environment, a console warning will be thrown if this value is truthy and the prop is not passed.
  - `validator`: `Function`
    Custom validator function that takes the prop value as the sole argument. In a non-production environment, a console warning will be thrown if this function returns a falsy value (i.e. the validation fails). You can read more about prop validation [here](../guide/component-props.html#prop-validation).

- **Example:**

  ```js
  const app = Vue.createApp({})

  // simple syntax
  app.component('props-demo-simple', {
    props: ['size', 'myMessage']
  })

  // object syntax with validation
  app.component('props-demo-advanced', {
    props: {
      // type check
      height: Number,
      // type check plus other validations
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: value => {
          return value >= 0
        }
      }
    }
  })
  ```

- **See also:** [Props](../guide/component-props.html)

## computed

- **Type:** `{ [key: string]: Function | { get: Function, set: Function } }`

- **Details:**

  Computed properties to be mixed into the component instance. All getters and setters have their `this` context automatically bound to the component instance.

  Note that if you use an arrow function with a computed property, `this` won't be the component's instance, but you can still access the instance as the function's first argument:

  ```js
  computed: {
    aDouble: vm => vm.a * 2
  }
  ```

  Computed properties are cached, and only re-computed on reactive dependency changes. Note that if a certain dependency is out of the instance's scope (i.e. not reactive), the computed property will **not** be updated.

- **Example:**

  ```js
  const app = Vue.createApp({
    data() {
      return { a: 1 }
    },
    computed: {
      // get only
      aDouble() {
        return this.a * 2
      },
      // both get and set
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    }
  })

  const vm = app.mount('#app')
  console.log(vm.aPlus) // => 2
  vm.aPlus = 3
  console.log(vm.a) // => 2
  console.log(vm.aDouble) // => 4
  ```

- **See also:** [Computed Properties](../guide/computed.html)

## methods

- **Type:** `{ [key: string]: Function }`

- **Details:**

  Methods to be mixed into the component instance. You can access these methods directly on the VM instance, or use them in directive expressions. All methods will have their `this` context automatically bound to the component instance.

  :::tip Note
  Note that **you should not use an arrow function to define a method** (e.g. `plus: () => this.a++`). The reason is arrow functions bind the parent context, so `this` will not be the component instance as you expect and `this.a` will be undefined.
  :::

- **Example:**

  ```js
  const app = Vue.createApp({
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    }
  })

  const vm = app.mount('#app')

  vm.plus()
  console.log(vm.a) // => 2
  ```

- **See also:** [Event Handling](../guide/events.html)

## watch

- **Type:** `{ [key: string]: string | Function | Object | Array}`

- **Details:**

  An object where keys are expressions to watch and values are the corresponding callbacks. The value can also be a string of a method name, or an Object that contains additional options. The component instance will call `$watch()` for each entry in the object at instantiation. See [$watch](instance-methods.html#watch) for more information about the `deep`, `immediate` and `flush` options.

- **Example:**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 'test',
        f: 5
      }
    },
    watch: {
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // string method name
      b: 'someMethod',
      // the callback will be called whenever any of the watched object properties change regardless of their nested depth
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // the callback will be called immediately after the start of the observation
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // you can pass array of callbacks, they will be called one-by-one
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    }
  })

  const vm = app.mount('#app')

  vm.a = 3 // => new: 3, old: 1
  ```

  ::: tip Note
  Note that _you should not use an arrow function to define a watcher_ (e.g. `searchQuery: newValue => this.updateAutocomplete(newValue)`). The reason is arrow functions bind the parent context, so `this` will not be the component instance as you expect and `this.updateAutocomplete` will be undefined.
  :::

- **See also:** [Watchers](../guide/computed.html#watchers)

## emits

- **Type:** `Array<string> | Object`

- **Details:**

  A list/hash of custom events that can be emitted from the component. It has an Array-based simple syntax and an alternative Object-based syntax that allows to configure an event validation.

  In Object-based syntax, the value of each property can either be `null` or a validator function. The validation function will receive the additional arguments passed to the `$emit` call. For example, if `this.$emit('foo', 1)` is called, the corresponding validator for `foo` will receive the argument `1`. The validator function should return a boolean to indicate whether the event arguments are valid.

- **Usage:**

  ```js
  const app = Vue.createApp({})

  // Array syntax
  app.component('todo-item', {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  })

  // Object syntax
  app.component('reply-form', {
    emits: {
      // no validation
      click: null,

      // with validation
      submit: payload => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  })
  ```

  ::: tip Note
  Events listed in the `emits` option **will not** be inherited by the root element of the component and also will be excluded from the `$attrs` property.
  :::

* **See also:** [Attribute Inheritance](../guide/component-attrs.html#attribute-inheritance)
