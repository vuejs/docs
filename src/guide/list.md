# Rendu de liste

## Mappage d'un tableau sur des éléments avec `v-for`

Nous pouvons utiliser la directive `v-for` pour rendre une liste d'éléments basée sur un tableau. La directive `v-for` nécessite une syntaxe spéciale sous la forme de `item in items`, où `items` est le tableau de données source et `item` est un **alias** pour l'élément du tableau en cours d'itération:

```html
<ul id="array-rendering">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-rendering')
```

Résultat:

<common-codepen-snippet title="v-for with Array" slug="VwLGbwa" tab="js,result" :preview="false" />

Dans les blocs `v-for`, nous avons un accès complet aux propriétés de la portée parente. `v-for` accepte également un deuxième argument facultatif pour l'index de l'élément courant.

```html
<ul id="array-with-index">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      parentMessage: 'Parent',
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-with-index')
```

Résultat:

<common-codepen-snippet title="v-for with Array and index" slug="wvaEdBP" tab="js,result" :preview="false" />

Vous pouvez également utiliser `of` comme délimiteur au lieu de `in`, afin qu'il soit plus proche de la syntaxe de JavaScript pour les itérateurs:

```html
<div v-for="item of items"></div>
```

## `v-for` avec un Objet

Vous pouvez également utiliser `v-for` pour parcourir les propriétés d'un objet.

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      myObject: {
        title: 'Comment faire des listes dans Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  }
}).mount('#v-for-object')
```

Résultat:

<common-codepen-snippet title="v-for with Object" slug="NWqLjqy" tab="js,result" :preview="false" />

Vous pouvez également fournir un deuxième argument pour le nom de la propriété (a.k.a. key):

```html
<li v-for="(value, name) in myObject">
  {{ name }}: {{ value }}
</li>
```

<common-codepen-snippet title="v-for with Object and key" slug="poJOPjx" tab="js,result" :preview="false" />

Et un autre pour l'index

```html
<li v-for="(value, name, index) in myObject">
  {{ index }}. {{ name }}: {{ value }}
</li>
```

<common-codepen-snippet title="v-for with Object key and index" slug="abOaWdo" tab="js,result" :preview="false" />

:::tip Note
Lors de l'itération sur un objet, l'ordre est basé sur l'ordre d'énumération de `Object.keys()`, qui n'est pas garanti d'être cohérent entre les différentes implémentations du moteur JavaScript.
:::

## Maintien de l'état

Lorsque Vue met à jour une liste d'éléments rendus avec `v-for`, il utilise par défaut une stratégie dite de "in-place patch". Si l'ordre des éléments de données a changé, au lieu de déplacer les éléments DOM pour correspondre à l'ordre des éléments, Vue corrigera chaque élément sur place et s'assurera qu'il reflète ce qui doit être rendu à cet index particulier.

Ce mode par défaut est efficace, mais **ne convient que lorsque la sortie de rendu de votre liste ne repose pas sur l'état du composant enfant ou l'état temporaire du DOM (par exemple, les valeurs d'entrée de formulaire)**.

Pour donner à Vue un indice afin qu'il puisse suivre l'identité de chaque nœud, et ainsi réutiliser et réorganiser les éléments existants, vous devez fournir un attribut `key` unique pour chaque élément:

```html
<div v-for="item in items" :key="item.id">
  <!-- contenu -->
</div>
```

Il est recommandé de fournir un attribut `key` avec `v-for` chaque fois que possible, à moins que le contenu du DOM itéré ne soit simple, ou que vous vous fiez intentionnellement au comportement par défaut pour des gains de performances.

Puisqu'il s'agit d'un mécanisme générique permettant à Vue d'identifier les nœuds, la `key` a également d'autres utilisations qui ne sont pas spécifiquement liées à `v-for`, comme nous le verrons plus loin dans le guide.

:::tip Note
N'utilisez pas de valeurs non primitives telles que des objets et des tableaux comme clés pour `v-for`. Utilisez plutôt des chaînes de caractères ou des valeurs numériques.
:::

Pour une utilisation détaillée de l'attribut `key`, veuillez consulter la [documentation de l'API `key`](../api/special-attributes.html#key).

## Détection de changement d'un Array

### Méthodes de mutation

Vue encapsule les méthodes de mutation d'un tableau observé afin qu'elles déclenchent également des mises à jour de vue. Les méthodes encapsulées sont:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

Vous pouvez ouvrir la console et jouer avec le tableau `items` des exemples précédents en appelant leurs méthodes de mutation. Par exemple: `example1.items.push({ message: 'Baz' })`.

### Remplacement d'un Array

Les méthodes de mutation, comme leur nom l'indique, mutent le tableau d'origine sur lequel elles sont appelées. En comparaison, il existe également des méthodes non mutantes, par ex. `filter()`, `concat()` et `slice()`, qui ne mutent pas le tableau d'origine mais **renvoient toujours un nouveau tableau**. Lorsque vous travaillez avec des méthodes sans mutation, vous pouvez remplacer l'ancien tableau par le nouveau:

```js
example1.items = example1.items.filter(item => item.message.match(/Foo/))
```

Vous pourriez penser que cela amènera Vue à jeter le DOM existant et à restituer la liste entière - heureusement, ce n'est pas le cas. Vue implémente des heuristiques intelligentes pour maximiser la réutilisation des éléments DOM, donc le remplacement d'un tableau par un autre tableau contenant des objets qui se chevauchent est une opération très efficace.

## Affichage des résultats filtrés / triés

Parfois, nous voulons afficher une version filtrée ou triée d'un tableau sans réellement muter ou réinitialiser les données d'origine. Dans ce cas, vous pouvez créer une propriété _computed_ qui renvoie le tableau filtré ou trié.

Par exemple

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```

```js
data() {
  return {
    numbers: [ 1, 2, 3, 4, 5 ]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(number => number % 2 === 0)
  }
}
```

Dans les situations où les propriétés calculées ne sont pas réalisables (par exemple à l'intérieur de boucles `v-for` imbriquées), vous pouvez utiliser une méthode:

```html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

## `v-for` avec un Intervalle

`v-for` peut également prendre un nombre entier. Dans ce cas, il répétera le modèle ce tant de fois.

```html
<div id="range" class="demo">
  <span v-for="n in 10">{{ n }} </span>
</div>
```

Résultat:

<common-codepen-snippet title="v-for with a range" slug="NWqLjNY" tab="html,result" :preview="false" />

## `v-for` sur un `<template>`

Similaire au template `v-if`, vous pouvez également utiliser une balise `<template> `  avec `v-for` pour rendre un bloc de plusieurs éléments. Par exemple:

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` avec `v-if`

:::tip
Notez qu'il n'est **pas** recommandé d'utiliser `v-if` et` v-for` ensemble. Reportez-vous au [guide de style](../style-guide/#eviter-v-if-avec-v-for-essentielle) pour plus de détails.
:::

When they exist on the same node, `v-if` has a higher priority than `v-for`. That means the `v-if` condition will not have access to variables from the scope of the `v-for`:

```html
<!-- Ceci déclenchera une erreur car la propriété "todo" n'est pas définie sur l'instance. -->

<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

Cela peut être corrigé en déplaçant `v-for` vers une balise d'encapsulation `<template>`:

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo }}
  </li>
</template>
```

## `v-for` avec un Composant

> Cette section suppose la connaissance des [Composants](component-basics.md). N'hésitez pas à l'ignorer et à revenir plus tard.

Vous pouvez utiliser directement `v-for` sur un composant personnalisé, comme n'importe quel élément normal:

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

Cependant, cela ne transmettra automatiquement aucune donnée au composant, car les composants ont leurs propres scopes isolées. Afin de passer les données itérées dans le composant, nous devons également utiliser des props:

```html
<my-component
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
></my-component>
```

La raison pour laquelle `item`" n'est pas automatiquement injecté dans le composant est que cela rend le composant étroitement lié au fonctionnement de `v-for`. Le fait d'être explicite sur l'origine de ses données rend le composant réutilisable dans d'autres situations.

Voici un exemple complet d'une simple liste de tâches:

```html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    />
    <button>Add</button>
  </form>
  <ul>
    <todo-item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :title="todo.title"
      @remove="todos.splice(index, 1)"
    ></todo-item>
  </ul>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      newTodoText: '',
      todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTodoId: 4
    }
  },
  methods: {
    addNewTodo() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})

app.component('todo-item', {
  template: `
    <li>
      {{ title }}
      <button @click="$emit('remove')">Remove</button>
    </li>
  `,
  props: ['title'],
  emits: ['remove']
})

app.mount('#todo-list-example')
```

<common-codepen-snippet title="v-for with components" slug="abOaWpz" tab="js,result" :preview="false" />
