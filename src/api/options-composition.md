# Composition

## mixins

- **Type:** `Array<Object>`

- **Details:**

  The `mixins` option accepts an array of mixin objects. These mixin objects can contain instance options like normal instance objects, and they will be merged against the eventual options using the certain option merging logic. For example, if your mixin contains a `created` hook and the component itself also has one, both functions will be called.

  Mixin hooks are called in the order they are provided, and called before the component's own hooks.

- **Example:**

  ```js
  const mixin = {
    created: function() {
      console.log(1)
    }
  }

  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

- **See also:** [Mixins](../guide/mixins.html)

## extends

- **Type:** `Object | Function`

- **Details:**

  Allows declaratively extending another component (could be either a plain options object or a constructor). This is primarily intended to make it easier to extend between single file components.

  This is similar to `mixins`.

- **Example:**

  ```js
  const CompA = { ... }

  // extend CompA without having to call `Vue.extend` on either
  const CompB = {
    extends: CompA,
    ...
  }
  ```

## provide / inject

- **Type:**

  - **provide:** `Object | () => Object`
  - **inject:** `Array<string> | { [key: string]: string | Symbol | Object }`

- **Details:**

  This pair of options are used together to allow an ancestor component to serve as a dependency injector for all its descendants, regardless of how deep the component hierarchy is, as long as they are in the same parent chain. If you are familiar with React, this is very similar to React's `context` feature.

  The `provide` option should be an object or a function that returns an object. This object contains the properties that are available for injection into its descendants. You can use ES2015 Symbols as keys in this object, but only in environments that natively support `Symbol` and `Reflect.ownKeys`.

  The `inject` option should be either:

  - an array of strings, or
  - an object where the keys are the local binding name and the value is either:
    - the key (string or Symbol) to search for in available injections, or
    - an object where:
      - the `from` property is the key (string or Symbol) to search for in available injections, and
      - the `default` property is used as fallback value

  > Note: the `provide` and `inject` bindings are NOT reactive. This is intentional. However, if you pass down a reactive object, properties on that object do remain reactive.

- **Example:**

  ```js
  // parent component providing 'foo'
  const Provider = {
    provide: {
      foo: 'bar'
    }
    // ...
  }

  // child component injecting 'foo'
  const Child = {
    inject: ['foo'],
    created() {
      console.log(this.foo) // => "bar"
    }
    // ...
  }
  ```

  With ES2015 Symbols, function `provide` and object `inject`:

  ```js
  const s = Symbol()

  const Provider = {
    provide() {
      return {
        [s]: 'foo'
      }
    }
  }

  const Child = {
    inject: { s }
    // ...
  }
  ```

  Using an injected value as the default for a prop:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  Using an injected value as data entry:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  Injections can be optional with default value:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  If it needs to be injected from a property with a different name, use `from` to denote the source property:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  Similar to prop defaults, you need to use a factory function for non-primitive values:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **See also:** [Provide / Inject](../guide/component-provide-inject.html)

## setup

- **Type:** `Function`

The `setup` function is a new component option. It serves as the entry point for using the Composition API inside components.

- **Invocation Timing**

  `setup` is called right after the initial props resolution when a component instance is created. Lifecycle-wise, it is called before the [beforeCreate](./options-lifecycle-hooks.html#beforecreate) hook.

- **Usage with Templates**

  If `setup` returns an object, the properties on the object will be merged on to the render context for the component's template:

  ```html
  <template>
    <div>{{ count }} {{ object.foo }}</div>
  </template>

  <script>
    import { ref, reactive } from 'vue'

    export default {
      setup() {
        const count = ref(0)
        const object = reactive({ foo: 'bar' })

        // expose to template
        return {
          count,
          object
        }
      }
    }
  </script>
  ```

  Note that [refs](refs-api.html#ref) returned from `setup` are automatically unwrapped when accessed in the template so there's no need for `.value` in templates.

- **Usage with Render Functions / JSX**

  `setup` can also return a render function, which can directly make use of reactive state declared in the same scope:

  ```js
  import { h, ref, reactive } from 'vue'

  export default {
    setup() {
      const count = ref(0)
      const object = reactive({ foo: 'bar' })

      return () => h('div', [count.value, object.foo])
    }
  }
  ```

- **Arguments**

  The function receives the resolved props as its first argument:

  ```js
  export default {
    props: {
      name: String
    },
    setup(props) {
      console.log(props.name)
    }
  }
  ```

  Note this `props` object is reactive - i.e. it is updated when new props are passed in, and can be observed and reacted upon using `watchEffect` or `watch`:

  ```js
  export default {
    props: {
      name: String
    },
    setup(props) {
      watchEffect(() => {
        console.log(`name is: ` + props.name)
      })
    }
  }
  ```

  However, do NOT destructure the `props` object, as it will lose reactivity:

  ```js
  export default {
    props: {
      name: String
    },
    setup({ name }) {
      watchEffect(() => {
        console.log(`name is: ` + name) // Will not be reactive!
      })
    }
  }
  ```

  The `props` object is immutable for userland code during development (will emit warning if user code attempts to mutate it).

  The second argument provides a context object which exposes a selective list of properties that were previously exposed on `this`:

  ```js
  const MyComponent = {
    setup(props, context) {
      context.attrs
      context.slots
      context.emit
    }
  }
  ```

  `attrs` and `slots` are proxies to the corresponding values on the internal component instance. This ensures they always expose the latest values even after updates so that we can destructure them without worrying about accessing a stale reference:

  ```js
  const MyComponent = {
    setup(props, { attrs }) {
      // a function that may get called at a later stage
      function onClick() {
        console.log(attrs.foo) // guaranteed to be the latest reference
      }
    }
  }
  ```

  There are a number of reasons for placing `props` as a separate first argument instead of including it in the context:

  - It's much more common for a component to use `props` than the other properties, and very often a component uses only `props`.

  - Having `props` as a separate argument makes it easier to type it individually without messing up the types of other properties on the context. It also makes it possible to keep a consistent signature across `setup`, `render` and plain functional components with TSX support.

- **See also:** [Composition API](composition-api.html)
