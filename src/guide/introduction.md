# Introduction

::: tip NOTE
Vous connaissez déjà Vue 2 et vous voulez simplement en savoir plus sur les nouveautés de Vue 3? Consulter le [Guide de Migration](/guide/migration/introduction.html)!
:::

## Vue.js, qu’est-ce que c’est ?

Vue (prononcé /vjuː/, comme le terme anglais **view**) est un **framework évolutif** pour construire des interfaces utilisateur. À la différence des autres frameworks monolithiques, Vue a été conçu et pensé pour pouvoir être adopté de manière incrémentale. Le cœur de la bibliothèque se concentre uniquement sur la partie vue, et il est vraiment simple de l’intégrer avec d’autres bibliothèques ou projets existants. D’un autre côté, Vue est tout à fait capable de faire tourner des applications web monopages quand il est couplé avec des [outils modernes](../guide/single-file-component.html) et des [bibliothèques complémentaires](https://github.com/vuejs/awesome-vue#components--libraries).

Si vous souhaitez en savoir plus à propos de Vue avant d’entrer dans le détail, nous <a id="modal-player" class="vuemastery-trigger"  href="#"> avons créé une vidéo</a> pour présenter ses principes fondamentaux avec un projet exemple.

<VideoLesson href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3" title="Watch a free video course on Vue Mastery">Regardez une vidéo de cours gratuite sur Vue Mastery (EN)</VideoLesson>

<common-vuemastery-video-modal/>

## Pour commencer

<p>
  <ActionLink class="primary" url="installation.html">
    Installation
  </ActionLink>
</p>

::: tip
Ce guide officiel présuppose que vous ayez un niveau intermédiaire de connaissance en HTML, CSS et JavaScript. Si vous êtes complètement nouveau dans le développement frontend, ce n’est peut-être pas la solution la plus judicieuse de vous lancer dans un framework pour vos premiers pas — Nous vous recommendons de compléter vos bases avant de revenir ! Bien qu’une première expérience avec d’autres frameworks puisse être utile, cela n’est pas obligatoire.
:::

La manière la plus simple d’essayer Vue.js est d’utiliser [l’exemple Hello World](https://codepen.io/team/Vue/pen/KKpRVpx). N'hésitez pas à l'ouvrir dans un autre onglet afin de suivre pendant que nous parcourons des exemples de base.

La page [Installation](installation.md) fournit plus d'options d'installation de Vue. 
Remarque: Nous **déconseillons** que les débutants commencent par `vue-cli`, surtout si vous n'êtes pas encore familiarisé avec les outils de construction basés sur Node.js.

## Rendu Déclarative

Au cœur de Vue.js se trouve un système qui nous permet de faire le rendu des données de manière déclarative dans le DOM en utilisant cette syntaxe de template:

```html
<div id="counter">
  Compteur: {{ compteur }}
</div>
```

```js
const Compteur = {
  data() {
    return {
      compteur: 0
    }
  }
}

Vue.createApp(Compteur).mount('#counter')
```

Nous venons tout juste de créer notre première application Vue ! Ça ressemble à un simple rendu de template en chaine de caractères, mais sous le capot, Vue effectue un réel travail. Les données et le DOM sont maintenant couplés, et tout est à présent **réactif**. Comment le savons nous? Jetez un œil à l'exemple ci-dessous où la propriété `compteur` s'incrémente toutes les secondes et vous verrez comment le DOM change:

```js{8-10}
const CounterApp = {
  data() {
    return {
      compteur: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.compteur++
    }, 1000)
  }
}
```

<FirstExample />

En plus de l'interpolation de texte, nous pouvons également lier des attributs d'élément comme ceci:

```html
<div id="bind-attribute">
  <span v-bind:title="message">
    Passez la souris sur moi pendant quelques secondes pour voir ma liaison dynamique
    title!
  </span>
</div>
```

```js
const AttributeBinding = {
  data() {
    return {
      message: 'Vous avez chargez cette page le ' + new Date().toLocaleString()
    }
  }
}

Vue.createApp(AttributeBinding).mount('#bind-attribute')
```

<common-codepen-snippet title="Attribute dynamic binding" slug="KKpRVvJ" />

Ici nous venons de rencontrer quelque chose de nouveau. L’attribut `v-bind` que vous voyez est appelé une **directive**. Les directives sont préfixées par `v-` pour indiquer qu'il s'agit d'attributs spéciaux fournis par Vue, et comme vous l'avez peut-être deviné, elles appliquent un comportement réactif spécial au DOM rendu. Ici, nous disons essentiellement "_maintenez l'attribut `title` de cet élément à jour avec la propriété `message` sur l'instance active actuelle._"

## Gestion des Entrées Utilisateur

Afin de permettre aux utilisateurs d’interagir avec votre application, nous pouvons utiliser la directive `v-on` pour attacher des écouteurs d’évènements qui invoquent des méthodes sur nos instances:

```html
<div id="event-handling">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Inverser le message</button>
</div>
```

```js
const EventHandling = {
  data() {
    return {
      message: 'Hello Vue.js!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message
        .split('')
        .reverse()
        .join('')
    }
  }
}

Vue.createApp(EventHandling).mount('#event-handling')
```

<common-codepen-snippet title="Event handling" slug="dyoeGjW" />

Notez que dans cette méthode, nous mettons à jour l'état de notre application sans toucher au DOM - toutes les manipulations du DOM sont gérées par Vue, et le code que vous écrivez est concentré sur la logique sous-jacente.

Vue fournit également la directive `v-model` qui simplifie la liaison bidirectionnelle entre l'entrée de formulaire et l'état de l'application:

```html
<div id="two-way-binding">
  <p>{{ message }}</p>
  <input v-model="message" />
</div>
```

```js
const TwoWayBinding = {
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}

Vue.createApp(TwoWayBinding).mount('#two-way-binding')
```

<common-codepen-snippet title="Two-way binding" slug="poJVgZm" />

## Conditions et boucles

Il est assez simple de permuter la présence d’un élément :

```html
<div id="conditional-rendering">
  <span v-if="seen">Là vous me voyez</span>
</div>
```

```js
const ConditionalRendering = {
  data() {
    return {
      seen: true
    }
  }
}

Vue.createApp(ConditionalRendering).mount('#conditional-rendering')
```

Cet exemple démontre que nous pouvons lier des données non seulement aux textes et attributs, mais également à la **structure** du DOM. Moreover,  De plus, Vue fournit un puissant système d’effets de transition qui peut automatiquement appliquer des [effets de transition](transitions-enterleave.md) quand des éléments sont insérés/mis-à-jour/enlevés par Vue.

Vous pouvez changer  `seen` de `true` à `false` dans le sandbox ci-dessous pour vérifier l'effet:

<common-codepen-snippet title="Conditional rendering" slug="oNXdbpB" tab="js,result" />

Il existe de nombreuses autres directives, chacune avec sa propre fonctionnalité spéciale. Par exemple, la directive `v-for` peut être utilisée pour afficher une liste d'éléments en utilisant les données provenant d'un tableau:

```html
<div id="list-rendering">
  <ol>
    <li v-for="todo in todos" v-bind:key="todo.text">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
const ListRendering = {
  data() {
    return {
      todos: [
        { text: 'Apprendre JavaScript' },
        { text: 'Apprendre Vue' },
        { text: 'Créer quelque chose de génial' }
      ]
    }
  }
}

Vue.createApp(ListRendering).mount('#list-rendering')
```

<common-codepen-snippet title="List rendering" slug="mdJLVXq" />

## Découpage en composants

Le système de composant est un autre concept important de Vue, car c’est une abstraction qui nous permet de construire de grosses applications découpées en plus petits composants réutilisables et autonomes. Quand on y pense, presque tous les types d’interfaces applicatives peuvent être abstraits en un arbre de composants.

![Component Tree](/images/components.png)

Dans Vue, un composant est essentiellement une instance avec des options prédéfinies. L'enregistrement d'un composant dans Vue est simple: nous créons un objet component comme nous l'avons fait avec les objets `App` et nous le définissons dans l'option `components` du parent:

```js
// Créer une application Vue
const app = Vue.createApp(...)

// Définir un nouveau composant appelé todo-item
app.component('todo-item', {
  template: `<li>Ceci est un todo</li>`
})

// Monter l'application Vue
app.mount(...)
```

Maintenant nous pouvons l’insérer dans le template d’un autre composant :

```html
<ol>
  <!-- Crée une instance du composant todo-item -->
  <todo-item></todo-item>
</ol>
```

Mais cela rendrait le même texte pour chaque todo, ce qui n'est pas super intéressant. Nous devrions pouvoir transmettre les données de la portée parente aux composants enfants. Modifions la définition du composant pour lui faire accepter une [prop](component-basics.html#passing-data-to-child-components-with-props):

```js
app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})
```

Maintenant nous pouvons passer la liste dans chaque composant répété en utilisant `v-bind` :

```html
<div id="todo-list-app">
  <ol>
    <!--
      Maintenant nous fournissons à chaque todo-item l'objet todo qu'il représente
      de manière à ce que son contenu puisse être dynamique. Nous avons également 
      besoin de fournir à chaque composant une « clé », mais nous expliquerons cela plus tard.
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
const TodoList = {
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Légumes' },
        { id: 1, text: 'Fromage' },
        { id: 2, text: 'Tout ce que les humains sont censés manger' }
      ]
    }
  }
}

const app = Vue.createApp(TodoList)

app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})

app.mount('#todo-list-app')
```

<common-codepen-snippet title="Intro-Components-1" slug="VwLxeEz" />

Ceci n’est qu’un exemple grossier, nous avons réussi à séparer notre application en deux plus petites unités, et chaque enfant est raisonnablement bien découplé de son parent via l’utilisation des props. Nous pouvons maintenant améliorer notre `<todo-item>` avec un template et une logique plus complexes sans affecter l’application parente.

Pour une grosse application, il est nécessaire de la diviser entièrement en composants afin de rendre le développement plus abordable. Nous parlerons des composants plus en détail [ plus tard dans le guide](component-basics.md), mais en attendant voici un exemple (imaginaire) de ce à quoi un template d’application pourrait ressembler avec des composants :

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

### Parallèles avec les Custom Elements

Vous avez peut-être remarqué que les composants Vue sont très similaires aux **Custom Elements**, qui sont une partie de la [spécification des Composants Web](https://www.w3.org/wiki/WebComponents/). C’est parce que la syntaxe de Vue est vaguement inspirée de cette spécification. Par exemple, les composants de Vue implémentent [l'API Slot](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md) et l’attribut spécial `is`. Cependant, il y a quelques différences essentielles: 

1. La spécification des Composants Web est finalisée mais n’est pas implémentée nativement dans tous les navigateurs. Safari 10.1+, Chrome 54+ et Firefox 63+ supportent nativement les Web Components. En comparaison, les composants de Vue n’ont besoin d’aucun polyfill et fonctionnent de la même manière dans tous les navigateurs supportés (les versions compatibles IE11 et +). Quand cela est nécessaire, les composants de Vue peuvent également être implémentés à l’intérieur d’un élément personnalisé natif.

[//]: # 'TODO: link to compatibility build'

2. Les composants Vue fournissent des fonctionnalités importantes qui ne sont pas disponibles dans les Custom Elements simples, notamment le flux de données inter-composants, la communication d'événements personnalisée et les intégrations d'outils de build.

Bien que Vue n’utilise pas d’éléments personnalisés en interne, il a une [grande interopérabilité](https://custom-elements-everywhere.com/#vue) quand il est utilisé ou distribué en tant qu’élément personnalisé. Vue CLI supporte également la construction de composants Vue qui s’enregistrent eux-mêmes en tant que Custom Element natifs.

## Prêt pour la suite ?

Nous venons juste d’introduire brièvement les fonctionnalités les plus basiques du cœur de Vue.js. Le reste de ce guide va les traiter ainsi que d’autres fonctionnalités avancées plus en détail. Assurez-vous donc de le lire jusqu’au bout !
