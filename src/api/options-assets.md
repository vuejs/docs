# Assets

## directives

- **Type:** `Object`

- **Details:**

  A hash of directives to be made available to the component instance.

- **Usage:**

  ```js
  const app = createApp({})

  app.component('focused-input', {
    directives: {
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    },
    template: `<input v-focus>`
  })
  ```

- **See also:** [Custom Directives](../guide/custom-directive.html)

## components

- **Type:** `Object`

- **Details:**

  A hash of components to be made available to the component instance.

- **Usage:**

  ```js
  const Foo = {
    template: `<div>Foo</div>`
  }

  const app = createApp({
    components: {
      Foo
    },
    template: `<Foo />`
  })
  ```

- **See also:** [Components](../guide/component-basics.html)
