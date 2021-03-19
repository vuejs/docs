# Fonctions de rendu

Vue recommande d'utiliser des templates pour créer des applications dans la grande majorité des cas. Cependant, dans certaines situations, nous avons besoin de toute la puissance programmatique de JavaScript. C'est là que nous pouvons utiliser la** fonction _render_**.

Plongeons dans un exemple où une fonction `render()` serait pratique. Disons que nous voulons générer des en-têtes ancrés:

```html
<h1>
  <a name="hello-world" href="#hello-world">
    Hello world!
  </a>
</h1>
```

Les en-têtes ancrés sont utilisés très fréquemment, nous créons un composant:

```vue-html
<anchored-heading :level="1">Hello world!</anchored-heading>
```

Le composant doit générer un en-tête basé sur la prop `level`, et nous arrivons rapidement à ceci:

```js
const { createApp } = Vue

const app = createApp({})

app.component('anchored-heading', {
  template: `
    <h1 v-if="level === 1">
      <slot></slot>
    </h1>
    <h2 v-else-if="level === 2">
      <slot></slot>
    </h2>
    <h3 v-else-if="level === 3">
      <slot></slot>
    </h3>
    <h4 v-else-if="level === 4">
      <slot></slot>
    </h4>
    <h5 v-else-if="level === 5">
      <slot></slot>
    </h5>
    <h6 v-else-if="level === 6">
      <slot></slot>
    </h6>
  `,
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

Ce template ne se sent pas bien. Non seulement ce n'est pas détaillé, mais nous dupliquons `<slot></slot>` pour chaque niveau de titre. Et lorsque nous ajoutons l'élément d'ancrage, nous devons à nouveau le dupliquer dans chaque branche `v-if / v-else-if`.

Bien que les templates fonctionnent très bien pour la plupart des composants, il est clair que ce n'est pas l'un d'entre eux. Essayons donc de le réécrire avec une fonction `render()`:

```js
const { createApp, h } = Vue

const app = createApp({})

app.component('anchored-heading', {
  render() {
    return h(
      'h' + this.level, // nom du tag
      {}, // props/attributs
      this.$slots.default() // tableau de ses enfants
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

L'implémentation de la fonction `render()` est beaucoup plus simple, mais nécessite également une plus grande familiarité avec les propriétés des instances de composants. Dans ce cas, vous devez savoir que lorsque vous passez des enfants sans directive `v-slot` dans un composant, comme le`Hello world!`À l'intérieur de `anchored-header`, ces enfants sont stockés sur l'instance du composant à `$ slots.default ()`. Si vous ne l'avez pas déjà fait, **il est recommandé de lire l '[API des propriétés d'instance](../api/instance-properties.html) avant de plonger dans les fonctions de rendu.**

## L'arborescence du DOM

Avant de plonger dans les fonctions de rendu, il est important de connaître un peu le fonctionnement des navigateurs. Prenez ce HTML par exemple:

```html
<div>
  <h1>My title</h1>
  Some text content
  <!-- TODO: Add tagline -->
</div>
```

Lorsqu'un navigateur lit ce code, il construit une [arborescence de "nœuds du DOM"](https://javascript.info/dom-nodes) pour l'aider à garder une trace de tout.

L'arbre des nœuds du DOM pour le HTML ci-dessus ressemble à ceci:

![DOM Tree Visualization](/images/dom-tree.png)

Chaque élément est un nœud. Chaque morceau de texte est un nœud. Même les commentaires sont des nœuds! Chaque nœud peut avoir des enfants (c'est-à-dire que chaque nœud peut contenir d'autres nœuds).

La mise à jour efficace de tous ces nœuds peut être difficile, mais heureusement, nous n'avons jamais à le faire manuellement. Au lieu de cela, nous disons à Vue quel HTML nous voulons sur la page, dans un template:

```html
<h1>{{ blogTitle }}</h1>
```

Ou dans une fonction de rendu:

```js
render() {
  return h('h1', {}, this.blogTitle)
}
```

Et dans les deux cas, Vue maintient automatiquement la page à jour, même lorsque `blogTitle` change.

## L'arborescence du DOM virtuel

Vue maintient la page à jour en créant un **DOM virtuel** pour suivre les changements qu'il doit apporter au DOM réel. En regardant de plus près cette ligne:

```js
return h('h1', {}, this.blogTitle)
```

Que retourne la fonction `h()`? Ce n'est pas _exactement_ un véritable élément DOM. Il renvoie un objet simple qui contient des informations décrivant à Vue le type de nœud qu'il doit afficher sur la page, y compris des descriptions de tous les nœuds enfants. Nous appelons cette description de nœud un "nœud virtuel", généralement abrégé en **VNode**. Le DOM Virtuel est ce que nous appelons l'arborescence entière des VNodes, construit par une arborescence de composants Vue.

## `h()` Arguments

La fonction `h()` est un utilitaire pour créer des VNodes. Il pourrait peut-être plus précisément être nommé `createVNode()`, mais il s'appelle `h()` en raison d'une utilisation fréquente et par souci de concision. Il accepte trois arguments:

```js
// @returns {VNode}
h(
  // {String | Object | Function } tag
  // Un nom de balise HTML, un composant ou un composant asynchrone.
  // L'utilisation de la fonction retournant null générerais un commentaire.
  //
  // Requis.
  'div',

  // {Object} props
  // Un objet correspondant aux attributs, props et événements
  // qui seront utilisés dans le template
  //
  // Optionnel.
  {},

  // {String | Array | Object} children
  // VNodes enfants, construits avec `h()`,
  // ou en utilisant des chaînes pour obtenir des 'text VNodes' ou
  // un objet avec des slots.
  //
  // Optionnel.
  [
    'Some text comes first.',
    h('h1', 'A headline'),
    h(MyComponent, {
      someProp: 'foobar'
    })
  ]
)
```

S'il n'y a pas de props, les enfants peuvent généralement être passés comme deuxième argument. Dans les cas où cela serait ambigu, `null` peut être passé comme deuxième argument pour conserver les enfants comme troisième argument.

## Exemple complet

Avec ces connaissances, nous pouvons maintenant terminer le composant que nous avons commencé:

```js
const { createApp, h } = Vue

const app = createApp({})

/** Récupérer récursivement le texte des nœuds enfants */
function getChildrenTextContent(children) {
  return children
    .map(node => {
      return typeof node.children === 'string'
        ? node.children
        : Array.isArray(node.children)
        ? getChildrenTextContent(node.children)
        : ''
    })
    .join('')
}

app.component('anchored-heading', {
  render() {
    // créer un id kebab-case à partir du contenu textuel des enfants
    const headingId = getChildrenTextContent(this.$slots.default())
      .toLowerCase()
      .replace(/\W+/g, '-') // remplacer les "non-mots" par un tiret
      .replace(/(^-|-$)/g, '') // supprimer les tirets de début et de fin

    return h('h' + this.level, [
      h(
        'a',
        {
          name: headingId,
          href: '#' + headingId
        },
        this.$slots.default()
      )
    ])
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

## Contraintes

### Les VNodes doivent être uniques

Tous les VNodes de l'arborescence des composants doivent être uniques. Cela signifie que la fonction de rendu suivante n'est pas valide:

```js
render() {
  const myParagraphVNode = h('p', 'hi')
  return h('div', [
    // Oups - VNodes dupliqués!
    myParagraphVNode, myParagraphVNode
  ])
}
```

Si vous voulez vraiment dupliquer le même élément / composant plusieurs fois, vous pouvez le faire avec une factory function. Par exemple, la fonction render suivante est un moyen parfaitement valide de généré 20 paragraphes identiques:

```js
render() {
  return h('div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'hi')
    })
  )
}
```

## Création de composant VNodes

Pour créer un VNode pour un composant, le premier argument passé à `h` doit être le composant lui-même:

```js
render() {
  return h(ButtonCounter)
}
```

Si nous avons besoin de rétrouver un composant par son nom, nous pouvons appeler `resolveComponent`:

```js
const { h, resolveComponent } = Vue

// ...

render() {
  const ButtonCounter = resolveComponent('ButtonCounter')
  return h(ButtonCounter)
}
```

`resolveComponent` est la même fonction que les templates utilisent en interne pour résoudre les composants par nom.

Une fonction `render` n'aura normalement besoin d'utiliser `resolveComponent` que pour les composants qui sont [enregistrés globalement](/guide/component-registration.html#enregistrement-global). L'[Enregistrement de composant local](/guide/component-registration.html#enregistrement-local) peut généralement être complètement ignoré. Prenons l'exemple suivant:

```js
// On peut simplifier ceci
components: {
  ButtonCounter
},
render() {
  return h(resolveComponent('ButtonCounter'))
}
```

Plutôt que d'enregistrer un composant par son nom et de le rechercher, nous pouvons l'utiliser directement à la place:

```js
render() {
  return h(ButtonCounter)
}
```

## Remplacer des fonctionnalités du template par du pur JS

### `v-if` et `v-for`

Partout où quelque chose peut être facilement accompli en JavaScript brut, les fonctions de rendu Vue ne fournissent pas d'alternative propriétaire. Par exemple, dans un template utilisant `v-if` et `v-for`:

```html
<ul v-if="items.length">
  <li v-for="item in items">{{ item.name }}</li>
</ul>
<p v-else>No items found.</p>
```

Cela pourrait être réécrit avec `if`/`else` et `map()` de JavaScript dans une fonction render:

```js
props: ['items'],
render() {
  if (this.items.length) {
    return h('ul', this.items.map((item) => {
      return h('li', item.name)
    }))
  } else {
    return h('p', 'No items found.')
  }
}
```

Dans un template, il peut être utile d'utiliser une balise `<template>` pour contenir une directive `v-if` ou `v-for`. Lors de la migration vers une fonction `render`, la balise `<template>` n'est plus nécessaire et peut être supprimée.

### `v-model`

La directive `v-model` est étendue aux props `modelValue` et `onUpdate:modelValue` lors de la compilation du template - nous devrons fournir ces props nous-mêmes:

```js
props: ['modelValue'],
emits: ['update:modelValue'],
render() {
  return h(SomeComponent, {
    modelValue: this.modelValue,
    'onUpdate:modelValue': value => this.$emit('update:modelValue', value)
  })
}
```

### `v-on`

Nous devons fournir un nom prop correct pour le gestionnaire d'événements, par exemple, pour gérer les événements `click`, le nom prop serait `onClick`.

```js
render() {
  return h('div', {
    onClick: $event => console.log('clicked', $event.target)
  })
}
```

#### Modificateurs d'événement

Pour les modificateurs d'événement `.passive`, `.capture`, et `.once` ils peuvent être concaténés après le nom de l'événement en utilisant la casse camel.

Par exemple:

```javascript
render() {
  return h('input', {
    onClickCapture: this.doThisInCapturingMode,
    onKeyupOnce: this.doThisOnce,
    onMouseoverOnceCapture: this.doThisOnceInCapturingMode
  })
}
```

Pour tous les autres modificateurs d'événement et de clé, aucune API spéciale n'est nécessaire, car nous pouvons utiliser des méthodes d'événement dans le gestionnaire:

| Modificateur(s)                                             | Équivalent dans le gestionnaire                                                                             |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.stop`                                                     | `event.stopPropagation()`                                                                                   |
| `.prevent`                                                  | `event.preventDefault()`                                                                                    |
| `.self`                                                     | `if (event.target !== event.currentTarget) return`                                                          |
| Clés:<br>e.g. `.enter`                                      | `if (event.key !== 'Enter') return`<br><br>Changer `'Enter'` pour la [clé](http://keycode.info/) appropriée |
| Clés de modificateur:<br>`.ctrl`, `.alt`, `.shift`, `.meta` | `if (!event.ctrlKey) return`<br><br>Pareil pour `altKey`, `shiftKey`, et `metaKey`                          |

Voici un exemple avec tous ces modificateurs utilisés ensemble:

```js
render() {
  return h('input', {
    onKeyUp: event => {
      // Annuler si l'élément émettant l'événement n'est pas
      // l'élément auquel l'événement est lié
      if (event.target !== event.currentTarget) return
      // Annuler si la touche lévée n'est pas la touche Entrée
      // et la touche Maj n'a pas été maintenue enfoncée
      // en même temps
      if (!event.shiftKey || event.key !== 'Enter') return
      // Arrêter la propagation des événements
      event.stopPropagation()
      // Empêcher le gestionnaire de saisie par défaut pour cet élément

      event.preventDefault()
      // ...
    }
  })
}
```

### Slots

Nous pouvons accéder au contenu des slots en tant que tableaux de VNodes à partir de [`this.$slots`](../api/instance-properties.html#slots):

```js
render() {
  // `<div><slot></slot></div>`
  return h('div', this.$slots.default())
}
```

```js
props: ['message'],
render() {
  // `<div><slot :text="message"></slot></div>`
  return h('div', this.$slots.default({
    text: this.message
  }))
}
```

Pour les VNodes de composant, nous devons passer les enfants à `h` en tant qu'objet plutôt qu'en tableau. Chaque propriété est utilisée pour remplir la slot du même nom:

```js
render() {
  // `<div><child v-slot="props"><span>{{ props.text }}</span></child></div>`
  return h('div', [
    h(
      resolveComponent('child'),
      null,
      // passer `slots` comme l'objet enfants
      // sous la forme { name: props => VNode | Array<VNode> }
      {
        default: (props) => h('span', props.text)
      }
    )
  ])
}
```

Les slots sont passés en tant que fonctions, permettant au composant enfant de contrôler la création du contenu de chaque slot. Toutes les données réactives doivent être accessibles dans la fonction slot pour s'assurer qu'elles sont enregistrées en tant que dépendance du composant enfant et non du parent. Inversement, les appels à `resolveComponent` doivent être effectués en dehors de la fonction slot, sinon ils seront résolus par rapport au mauvais composant:

```js
// `<MyButton><MyIcon :name="icon" />{{ text }}</MyButton>`
render() {
  // Appels à `resolveComponent` doit être en dehors de la fonction de slot
  const Button = resolveComponent('MyButton')
  const Icon = resolveComponent('MyIcon')

  return h(
    Button,
    null,
    {
      // Utilisez une fonction fléchée pour conserver la valeur `this`
      default: (props) => {
        // Les propriétés réactives doivent être lues dans la fonction slot
        // afin qu'ils deviennent des dépendances pour le rendu du composant enfant
        return [
          h(Icon, { name: this.icon }),
          this.text
        ]
      }
    }
  )
}
```

Si un composant reçoit des slots de son parent, ils peuvent être transmis directement à un composant enfant:

```js
render() {
  return h(Panel, null, this.$slots)
}
```

Ils peuvent également être passés individuellement ou emballés selon le cas:

```js
render() {
  return h(
    Panel,
    null,
    {
      // Si nous voulons transmettre une fonction slot, nous pouvons
      header: this.$slots.header,

      // Si nous devons manipuler le slot d'une manière ou d'une autre
      // alors nous devons l'envelopper dans une nouvelle fonction
      default: (props) => {
        const children = this.$slots.default ? this.$slots.default(props) : []

        return children.concat(h('div', 'Extra child'))
      }
    }
  )
}
```

### `<component>` et `is`

Dans les coulisses, les templates utilisent `resolveDynamicComponent` pour implémenter l'attribut `is`. Nous pouvons utiliser la même fonction si nous avons besoin de toute la flexibilité fournie par `is` dans notre fonction `render`:

```js
const { h, resolveDynamicComponent } = Vue

// ...

// `<component :is="name"></component>`
render() {
  const Component = resolveDynamicComponent(this.name)
  return h(Component)
}
```

Tout comme `is`, `resolveDynamicComponent` prend en charge la transmission d'un nom de composant, d'un nom d'élément HTML ou d'un objet d'options de composant.

Cependant, ce niveau de flexibilité n'est généralement pas nécessaire. Il est souvent possible de remplacer `resolveDynamicComponent` par une alternative plus directe.

Par exemple, si nous avons seulement besoin de prendre en charge les noms de composants, alors `resolveComponent` peut être utilisé à la place.

Si le VNode est toujours un élément HTML, nous pouvons passer son nom directement à `h`:

```js
// `<component :is="bold ? 'strong' : 'em'"></component>`
render() {
  return h(this.bold ? 'strong' : 'em')
}
```

De même, si la valeur passée à `is` est un objet d'options de composant alors il n'y a pas besoin de résoudre quoi que ce soit, elle peut être passée directement comme premier argument de`h`.

Tout comme une balise `<template>`, une balise `<component>` n'est requise que dans les templates comme espace syntaxique réservé et doit être supprimée lors de la migration vers une fonction `render`.

## JSX

Si nous écrivons beaucoup de fonctions `render`, cela peut être pénible d'écrire quelque chose comme ceci:

```js
h(
  resolveComponent('anchored-heading'),
  {
    level: 1
  },
  {
    default: () => [h('span', 'Hello'), ' world!']
  }
)
```

Surtout lorsque la version du template est si concise en comparaison:

```vue-html
<anchored-heading :level="1"> <span>Hello</span> world! </anchored-heading>
```

C'est pourquoi il existe un [plugin Babel](https://github.com/vuejs/jsx-next) pour utiliser JSX avec Vue, nous ramenant à une syntaxe plus proche des templates:

```jsx
import AnchoredHeading from './AnchoredHeading.vue'

const app = createApp({
  render() {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})

app.mount('#demo')
```

Pour plus d'informations sur la correspondance entre JSX et JavaScript, consultez la [doc sur l'utilisation](https://github.com/vuejs/jsx-next#installation).

## Compilation de template

Vous serez peut-être intéressé de savoir que les templates de Vue se compilent réellement pour rendre les fonctions. Il s'agit d'un détail d'implémentation que vous n'avez généralement pas besoin de connaître, mais si vous souhaitez voir comment les fonctionnalités spécifiques du template sont compilées, vous pouvez le trouver intéressant. Voici une petite démonstration utilisant `Vue.compile` pour compiler en direct une chaîne de template:

<iframe src="https://vue-next-template-explorer.netlify.app/" width="100%" height="420"></iframe>
