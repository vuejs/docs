# Propriétés d'Instance

## $data

- **Type:** `Object`

- **Détails:**

  Objet de données que l'instance de composant observe. Les proxys de l'instance du composant accèdent aux propriétés qui sont dans l'objet data.

- **Voir aussi:** [Options / Data - data](./options-data.html#data-2)

## $props

- **Type:** `Object`

- **Détails:**

  Un objet représentant les propriétés actuelles qu'un composant a reçues.Les proxys de l'instance du composant accèdent aux propriétés qui sont dans l'objet props. 

## $el

- **Type:** `any`

- **Lecture seulement**

- **Détails:**

  L'élément racine du DOM  que l'instance de composant gère.

  Pour les composants utilisant [fragments](../guide/migration/fragments), `$el` sera l'espace réservé dans le nœud du DOM que Vue utilise pour garder une trace de la position du composant dans le DOM. Il est recommandé d'utiliser [template refs](../guide/component-template-refs.html) pour un accès direct aux éléments du DOM au lieu de s'appuyer sur `$el`.

## $options

- **Type:** `Object`

- **Lecture seulement**

- **Détails:**

  Les options d'instanciation utilisées pour l'instance de composant actuelle. Ceci est utile lorsque vous souhaitez inclure des propriétés personnalisées dans les options:

  ```js
  const app = Vue.createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

## $parent

- **Type:** `Instance de Composant`

- **Lecture seulement**

- **Détails:**

  L'instance parente, si l'instance actuelle en a une.

## $root

- **Type:** `Instance de Composant`

- **Lecture seulement**

- **Détails:**

  Instance du composant racine de l'arborescence du composant actuel. Si l'instance actuelle n'a pas de parents, cette valeur sera elle-même.

## $slots

- **Type:** `{ [name: string]: (...args: any[]) => Array<VNode> | undefined }`

- **Lecture seulement**

- **Détails:**

  Utilisé pour accéder automatiquement au contenu [distribué par slots](../guide/component-basics.html#content-distribution-with-slots). Chaque [slot nommé](../guide/component-slots.html#named-slots) a sa propre propriété correspondante (par exemple, le contenu de `v-slot:foo` sera trouvé à `this.$slots.foo()`). La propriété `default` contient soit des nœuds non inclus dans un slot nommé soit le contenu de `v-slot:default`.

  L'accès à `this.$Slots` est plus utile lors de l'écriture d'un composant avec une [fonction render](../guide/render-function.html).

- **Exemple:**

  ```html
  <blog-post>
    <template v-slot:header>
      <h1>À Propos de moi</h1>
    </template>

    <template v-slot:default>
      <p>
        Voici un contenu de page, qui sera inclus dans $slots.default.
      </p>
    </template>

    <template v-slot:footer>
      <p>Copyright 2020 Evan You</p>
    </template>
  </blog-post>
  ```

  ```js
  const app = Vue.createApp({})

  app.component('blog-post', {
    render() {
      return Vue.h('div', [
        Vue.h('header', this.$slots.header()),
        Vue.h('main', this.$slots.default()),
        Vue.h('footer', this.$slots.footer())
      ])
    }
  })
  ```

- **Voir aussi:**
  - [Composant `<slot>`](built-in-components.html#slot)
  - [Content Distribution with Slots](../guide/component-basics.html#content-distribution-with-slots)
  - [Render Functions - Slots](../guide/render-function.html#slots)

## $refs

- **Type:** `Object`

- **Lecture seulement**

- **Détails:**

Un objet d'éléments du DOM et d'instances de composants, enregistré avec l'[attributs `ref`](../guide/component-template-refs.html).

- **Voir aussi:**
  - [Template refs](../guide/component-template-refs.html)
  - [Attributs spéciaux - ref](./special-attributes.md#ref)

## $attrs

- **Type:** `Object`

- **Lecture seulement**

- **Détails:**

Contient des liaisons d'attributs et des événements du scope parent qui ne sont pas reconnus (et extraits) en tant que [props](./options-data.html#props) du composant ou un [custom events](./options-data.html#emits). Lorsqu'un composant n'a aucune props ou custom events déclarés, il contient essentiellement toute les liaisons du scope parent, et peut être transmis à un composant interne via `v-bind="$attrs"` - utile lors de la création de Composants d'ordre supérieur.

- **Voir aussi:**
  - [Non-Prop Attributes](../guide/component-attrs.html)
  - [Options / Misc - inheritAttrs](./options-misc.html#inheritattrs)
