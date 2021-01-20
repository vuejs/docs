# Misc

## name

- **Type:** `string`

- **Détails:**

  Autorise le composant à s’appeler de manière récursive dans son template. Notez que lorsqu'un composant est enregistré globalement avec `Vue.createApp({}).component({})`, l'ID global est automatiquement défini comme son nom.

  Un autre avantage de spécifier une option `name` est le débogage. Les composants nommés génèrent des messages d'avertissement plus utiles. De plus, lors de l'inspection d'une application dans [vue-devtools](https://github.com/vuejs/vue-devtools),  les composants sans nom apparaîtront sous la forme  `<AnonymousComponent>`, ce qui n'est pas très informatif. En fournissant l'option `name`, vous obtiendrez une arborescence de composants beaucoup plus informative.

## delimiters

- **Type:** `Array<string>`

- **Default:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}` 

- **Restrictions:** Cette option n'est disponible que dans le build complet, avec la compilation des templates dans le navigateur.

- **Détails:**

  Définit les délimiteurs utilisés pour l'interpolation de texte dans le modèle.

  En règle générale, cela est utilisé pour éviter les conflits avec les frameworks côté serveur qui utilisent également la syntaxe moustache.

- **Exemple:**

  ```js
  Vue.createApp({
    // Délimiteurs modifiés en style de template string ES6
    delimiters: ['${', '}']
  })
  ```

## inheritAttrs

- **Type:** `boolean`

- **Default:** `true`

- **Détails:**

  Par défaut, les liaisons d'attributs dans le scope parent qui ne sont pas reconnues comme des props seront "échouées". Cela signifie que lorsque nous avons un composant racine unique, ces liaisons seront appliquées à l'élément racine du composant enfant en tant qu'attributs HTML normaux. Lors de la création d'un composant qui encapsule un élément cible ou un autre composant, cela peut ne pas toujours être le comportement souhaité. En définissant `inheritAttrs` sur `false`, ce comportement par défaut peut être désactivé. Les attributs sont disponibles via la propriété d'instance `$attrs` et peuvent être explicitement liés à un élément non racine en utilisant `v-bind`.

- **Usage:**

  ```js
  app.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input'],
    template: `
      <label>
        {{ label }}
        <input
          v-bind="$attrs"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
        >
      </label>
    `
  })
  ```

- **Voir aussi:** [Disabling Attribute Inheritance](../guide/component-attrs.html#disabling-attribute-inheritance)
