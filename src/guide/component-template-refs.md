# Refs de template

> Cette page suppose que vous avez déjà lu les [Principes de base des composants](component-basics.md). Lisez-le d'abord si vous n'êtes pas familier avec les composants.

Malgré l'existence des props et événements, , il se peut que vous deviez parfois accéder directement à un composant enfant en JavaScript. Pour ce faire, vous pouvez attribuer un ID de référence au composant enfant ou à l'élément HTML à l'aide de l'attribut `ref`. Par exemple:

```html
<input ref="input" />
```

Cela peut être utile lorsque vous souhaitez, par exemple, metre le focus de façon programmatique sur l'élément input au montage du composant:

```js
const app = Vue.createApp({})

app.component('base-input', {
  template: `
    <input ref="input" />
  `,
  methods: {
    focusInput() {
      this.$refs.input.focus()
    }
  },
  mounted() {
    this.focusInput()
  }
})
```

De plus, vous pouvez ajouter un autre `ref` au composant lui-même et l'utiliser pour déclencher l'événement `focusInput` à partir du composant parent:

```html
<base-input ref="usernameInput"></base-input>
```

```js
this.$refs.usernameInput.focusInput()
```

::: warning
Les `$refs` ne sont recupérés qu'après le rendu du composant. Il est uniquement conçu comme un moyen détourné pour la manipulation directe des enfants - vous devez éviter d'accéder à `$refs` à partir de templates ou de propriétés computed.
:::

**Voir aussi**: [Utilisation des refs de template dans le Composition API](/guide/composition-api-template-refs.html#template-refs)
