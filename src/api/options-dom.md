# DOM

## template

- **Type:** `string`

- **Détails:**

  Un template de chaîne de caractères (string template) à utiliser comme balisage pour l'instance de composant. Le template **remplacera** l'élément monté. Tout balisage existant à l'intérieur de l'élément monté sera ignoré, sauf si des slots de "distribution de contenu" sont présents dans le template.

  Si la chaîne de caractère commence par `#`, elle sera utilisée comme `querySelector` et utilisera le innerHTML de l'élément sélectionné comme string template. Cela permet d'utiliser l'astuce courante `<script type="x-template">` pour inclure des templates.

  :::tip Note
  D'un point de vue de sécurité, vous ne devez utiliser que des templates Vue auxquels vous pouvez faire confiance. N'utilisez jamais de contenu généré par l'utilisateur comme template.
  :::

  :::tip Note
  Si la fonction de rendu est présente dans l'option Vue, le template sera ignoré.
  :::

- **Voir aussi:**
  - [Diagramme de cycle de vie](../guide/instance.html#lifecycle-diagram)
  - [Distribution de Contenu avec Slots](../guide/component-basics.html#content-distribution-with-slots)

## render

- **Type:** `Function`

- **Détails:**

  Une alternative aux string templates qui vous permet d'exploiter toute la puissance programmatique de JavaScript.

- **Usage:**

  ```html
  <div id="app" class="demo">
    <my-title blog-title="Une Vue Parfaite"></my-title>
  </div>
  ```

  ```js
  const app = Vue.createApp({})

  app.component('my-title', {
    render() {
      return Vue.h(
        'h1', // nom du tag,
        this.blogTitle // contenu du tag
      )
    },
    props: {
      blogTitle: {
        type: String,
        required: true
      }
    }
  })

  app.mount('#app')
  ```

  :::tip Note
    La fonction `render` a la priorité sur la fonction render compilée à partir de l'option `template` ou du template HTML dans le DOM de l'élément monté.
  :::

- **Voir aussi:** [Render Functions](../guide/render-function.html)
