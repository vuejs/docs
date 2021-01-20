# Assets

## directives

- **Type:** `Object`

- **Détails:**

  Un hachage de directives à mettre à la disposition de l'instance de composant.
  
- **Usage:**
  ```js
  const app = Vue.createApp({})
  
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

- **Voir aussi:** [Custom Directives](../guide/custom-directive.html)

## components

- **Type:** `Object`

- **Détails:**

  Un hachage de composants à mettre à disposition de l'instance de composant.

- **Usage:**
  ```js
  const Foo = {
    template: `<div>Foo</div>`
  }
  
  const app = Vue.createApp({
    components: {
      Foo
    },
    template: `<Foo />`
  })
  ```

- **Voir aussi:** [Components](../guide/component-basics.html)
