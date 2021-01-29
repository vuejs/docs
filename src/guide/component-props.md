# Props

> Cette page suppose que vous avez déjà lu les [Principes de base des composants](component-basics.md). Lisez-le d'abord si vous n'êtes pas familier avec les composants.

## Types des props

Jusqu'à présent, nous n'avons vu que les props listés sous forme de tableau de chaîne de caractéres.

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

Cependant, vous souhaiterez généralement que chaque prop soit d'un type spécifique. Dans ces cas, vous pouvez lister les props en tant qu'objet, où les noms et valeurs des propriétés contiennent respectivement les noms et types de prop respectivement:

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // ou tout autre constructeur
}
```

Cela documente non seulement votre composant, mais avertira également les utilisateurs dans la console JavaScript du navigateur s'ils passent le mauvais type. Vous en apprendrez beaucoup plus sur les [vérifications de type et autres validations de props](#validation-des-props) plus bas sur cette page.

## Passer des props statiques ou dynamiques

Jusqu'à présent, vous avez vu des props passer une valeur statique, comme dans:

```html
<blog-post title="My journey with Vue"></blog-post>
```

Vous avez également vu des props affectés dynamiquement avec `v-bind` ou son raccourci, le caractère `:`, comme dans:

```html
<!-- Attribuer dynamiquement la valeur d'une variable -->
<blog-post :title="post.title"></blog-post>

<!-- Attribuer dynamiquement la valeur d'une expression complexe -->
<blog-post :title="post.title + ' by ' + post.author.name"></blog-post>
```

Dans les deux exemples ci-dessus, nous passons des valeurs de chaîne de caractères, mais _tout type_ de valeur peut en fait être passé à un prop.

### Passer un nombre

```html
<!-- Même si `42` est statique, nous avons besoin de v-bind pour dire à Vue que -->
<!-- c'est une expression JavaScript plutôt qu'une chaîne de caractère. -->
<blog-post :likes="42"></blog-post>

<!-- Attribuer dynamiquement à la valeur d'une variable. -->
<blog-post :likes="post.likes"></blog-post>
```

### Passer un booléen

```html
<!-- Inclure la prop sans valeur impliquera `true`. -->
<blog-post is-published></blog-post>

<!-- Même si `false` est statique, nous avons besoin de v-bind pour dire à Vue que -->
<!-- c'est une expression JavaScript plutôt qu'une chaîne de caractère. -->
<blog-post :is-published="false"></blog-post>

<!-- Attribuer dynamiquement à la valeur d'une variable. -->
<blog-post :is-published="post.isPublished"></blog-post>
```

### Passer un tableau

```html
<!-- Même si le tableau est statique, nous avons besoin de v-bind pour dire à Vue que -->
<!-- c'est une expression JavaScript plutôt qu'une chaîne de caractère.  -->
<blog-post :comment-ids="[234, 266, 273]"></blog-post>

<!-- Attribuer dynamiquement à la valeur d'une variable. -->
<blog-post :comment-ids="post.commentIds"></blog-post>
```

### Passer un objet

```html
<!-- Même si le tableau est statique, nous avons besoin de v-bind pour dire à Vue que -->
<!-- c'est une expression JavaScript plutôt qu'une chaîne de caractère.  -->
<blog-post
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- Attribuer dynamiquement à la valeur d'une variable. -->
<blog-post :author="post.author"></blog-post>
```

### Passer les propriétés d'un objet

Si vous voulez passer toutes les propriétés d'un objet comme accessoires, vous pouvez utiliser `v-bind` sans argument (`v-bind` au lieu de `:prop-name`). Par exemple, étant donné un objet `post`:

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

Le template suivant:

```html
<blog-post v-bind="post"></blog-post>
```

Sera équivalent à:

```html
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
```

## Flux de données unidirectionnel

Toutes les props forment une **liaison unidirectionnelle** entre la propriété enfant et la propriété parent: lorsque la propriété parent est mise à jour, elle descendra jusqu'à l'enfant, mais pas l'inverse. Cela empêche les composants enfants de modifier accidentellement l'état du parent, ce qui peut rendre le flux de données de votre application plus difficile à comprendre.

De plus, chaque fois que le composant parent est mis à jour, toutes les props du composant enfant seront actualisées avec la dernière valeur. Cela signifie que vous ne devez **pas** tenter de muter une prop dans un composant enfant. Si vous le faites, Vue vous en avertira dans la console.

Il y a généralement deux cas où il est tentant de muter une prop:

1. **La prop est utilisée pour passer une valeur initiale; le composant enfant veut ensuite l'utiliser comme propriété de données locales.** Dans ce cas, il est préférable de définir une propriété de data locale qui utilise la prop comme valeur initiale:

```js
props: ['initialCounter'],
data() {
  return {
    counter: this.initialCounter
  }
}
```

2. **La prop est passée en tant que valeur brute qui doit être transformée.** Dans ce cas, il est préférable de définir une propriété computed en utilisant la valeur du prop:

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

::: tip Note
Notez que les objets et les tableaux en JavaScript sont passés par référence, donc si le prop est un tableau ou un objet, la mutation de l'objet ou du tableau lui-même à l'intérieur du composant enfant **affectera** l'état du parent.
:::

## Validation des props

Les composants peuvent spécifier des exigences pour leurs props, tels que les types que vous avez déjà vus. Si une exigence n'est pas remplie, Vue vous avertira dans la console JavaScript du navigateur. Ceci est particulièrement utile lors du développement d'un composant destiné à être utilisé par d'autres.

Pour spécifier des validations de prop, vous pouvez fournir un objet avec des exigences de validation à la valeur de `props`, au lieu d'un tableau de chaînes. Par exemple:

```js
app.component('my-component', {
  props: {
    // Vérification de type de base (les valeurs `null` et `undefined` passeront toute validation de type)
    propA: Number,
    // Plusieurs types possibles
    propB: [String, Number],
    // chaîne de caractère et réquis
    propC: {
      type: String,
      required: true
    },
    // Nombre avec une valeur par defaut
    propD: {
      type: Number,
      default: 100
    },
    // Objet avec une valeur par default
    propE: {
      type: Object,
      // Les valeurs par défaut des objets ou des tableaux
      // doivent être renvoyées à partir d'une factory function
      default: function() {
        return { message: 'hello' }
      }
    },
    // Fonction de validation personnalisée
    propF: {
      validator: function(value) {
        // La valeur doit correspondre à l'une de ces chaînes
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    // Fonction avec une valeur par défaut
    propG: {
      type: Function,
      // Contrairement à un objet ou un tableau par défaut, il ne s'agit pas d'une factory function -
      // il s'agit d'une fonction servant de valeur par défaut
      default: function() {
        return 'Default function'
      }
    }
  }
})
```

Lorsque la validation des prop échoue, Vue produira un avertissement de console (si vous utilisez la version de développement).

::: tip Note
Notez que les props sont validées **avant** qu'une instance de composant soit créée, donc les propriétés d'instance (par exemple, `data`, `computed`, etc.) ne seront pas disponibles dans les fonctions `default` ou `validator`.
:::

### Vérification des types

Le `type` peut être l'un des constructeurs natifs suivants:

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

De plus, `type` peut également être une fonction de constructeur personnalisée et l'assertion sera faite avec une vérification `instanceof`. Par exemple, étant donné que la fonction constructeur suivante existe:

```js
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

Vous pourrez utiliser:

```js
app.component('blog-post', {
  props: {
    author: Person
  }
})
```

pour valider que la valeur du prop `author` a été créée avec `new Person`.

## Casse des noms de prop (camelCase vs kebab-case)

Les noms d'attributs HTML sont insensibles à la casse, donc les navigateurs interpréteront tous les caractères majuscules comme des minuscules. Cela signifie que lorsque vous utilisez des templates dans le DOM, les noms de prop avec camelCase doivent utiliser leurs équivalents kebab-case (délimités par un trait d'union):

```js
const app = Vue.createApp({})

app.component('blog-post', {
  // camelCase en JavaScript
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- kebab-case en HTML -->
<blog-post post-title="hello!"></blog-post>
```

Encore une fois, si vous utilisez des string templates, cette limitation ne s'applique pas.
