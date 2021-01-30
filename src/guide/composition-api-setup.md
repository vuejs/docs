# Setup

> Cette section utilise la syntaxe des [composants à fichier unique](single-file-component.html) pour les exemples de code

> Ce guide suppose que vous avez déjà lu l '[introduction du Composition API](composition-api-introduction.html) et les [Fondamentaux de la réactivité](reactivity-fundamentals.html). Lisez cela d'abord si vous êtes nouveau dans le composition API.

## Arguments

Lorsque vous utilisez la fonction `setup`, elle prendra deux arguments:

1. `props`
2. `context`

Explorons plus en détail comment chaque argument peut être utilisé.

### Props

Le premier argument de la fonction `setup` est l'argument `props`. Comme vous vous en doutez dans un composant standard, les `props` à l'intérieur d'une fonction`setup` sont réactives et seront mis à jour lorsque de nouvelles props seront passées.

```js
// MyBook.vue

export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

:::warning
Cependant, comme les `accessoires` sont réactifs, vous **ne pouvez pas utiliser la déstructuration ES6** car cela supprimera la réactivité des props.
:::

Si vous avez besoin de déstructurer vos props, vous pouvez le faire en utilisant [toRefs](reactivity-fundamentals.html#destructuring-reactive-state) à l'intérieur de la fonction `setup`:

```js
// MyBook.vue

import { toRefs } from 'vue'

setup(props) {
	const { title } = toRefs(props)

	console.log(title.value)
}
```

Si `title` est une prop optionnelle, il peut être absent de `props`. Dans ce cas, `toRefs` ne créera pas de référence pour `title`. Au lieu de cela, vous devez utiliser `toRef`:

```js
// MyBook.vue

import { toRef } from 'vue'

setup(props) {
	const title = toRef(props, 'title')

	console.log(title.value)
}
```

### Context

Le deuxième argument passé à la fonction `setup` est le `context`. Le `context` est un objet JavaScript normal qui expose trois propriétés de composant:

```js
// MyBook.vue

export default {
  setup(props, context) {
    // Attributs (objet Non-réactif)
    console.log(context.attrs)

    // Slots (objet Non-réactif)
    console.log(context.slots)

    // Événements émis (Method)
    console.log(context.emit)
  }
}
```

L'objet `context` est un objet JavaScript normal, c'est-à-dire qu'il n'est pas réactif, cela signifie que vous pouvez utiliser en toute sécurité la déstructuration ES6 sur `context`.

```js
// MyBook.vue
export default {
  setup(props, { attrs, slots, emit }) {
    ...
  }
}
```

`attrs` et`slots` sont des objets à état, qui sont toujours mis à jour lorsque le composant lui-même est mis à jour. Cela signifie que vous devez éviter de les déstructurer et toujours référencer les propriétés comme `attrs.x` ou `slots.x`. Notez également que contrairement aux `props`, `attrs` et `slots` ne sont **pas** réactifs. Si vous avez l'intention d'appliquer des effets secondaires basés sur les changements de `attrs` ou `slots`, vous devez le faire dans un hook de cycle de vie `onUpdated`.

## Accès aux propriétés des composants

Lorsque `setup` est exécuté, l'instance de composant n'a pas encore été créée. En conséquence, vous ne pourrez accéder qu'aux propriétés suivantes:

- `props`
- `attrs`
- `slots`
- `emit`

En d'autres termes, vous **n'aurez pas accès** aux options de composants suivantes:

- `data`
- `computed`
- `methods`

## Usage avec les templates

Si `setup` retourne un objet, les propriétés de l'objet sont accessibles dans le template du composant, ainsi que les propriétés des `props` passées dans `setup`:

```vue-html
<!-- MyBook.vue -->
<template>
  <div>{{ collectionName }}: {{ readersNumber }} {{ book.title }}</div>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    props: {
      collectionName: String
    },
    setup(props) {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })

      // expose to template
      return {
        readersNumber,
        book
      }
    }
  }
</script>
```

Notez que les [refs](../api/refs-api.html#ref) renvoyés par `setup` sont [automatiquement déballés](/guide/reactivity-fundamentals.html#ref-unwrapping) lors de l'accès dans le template, vous ne devrez donc pas utiliser `.value` dans les templates.

## Usage avec une fonction de rendu

`setup` peut également retourner une fonction de rendu qui peut directement utiliser l'état réactif déclaré dans la même scope:

```js
// MyBook.vue

import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // Veuillez noter que nous devons exposer explicitement la valeur de référence ici

    return () => h('div', [readersNumber.value, book.title])
  }
}
```

## Utilisation de `this`

**À l'intérieur de `setup ()`, `this` ne sera pas une référence à l'instance active courante** Puisque `setup ()`est appelé avant que les autres options du composant soient résolues, `this` à l'interieur de `setup ()` sse comportera assez différemment de `this` dans les autres options. Cela peut causer des confusions lors de l'utilisation de `setup ()` avec d'autres API d'options.
