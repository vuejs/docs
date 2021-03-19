# Événements personnalisés

> Cette page suppose que vous avez déjà lu les [Principes de base des composants](component-basics.md). Lisez-le d'abord si vous n'êtes pas familier avec les composants.

## Noms d'événements

Comme les composants et les props, les noms d'événements fournissent une transformation automatique de la casse. Si vous émettez un événement à partir du composant enfant en camelCase, vous pourrez ajouter un écouteur en kebab-case dans le parent:

```js
this.$emit('myEvent')
```

```html
<my-component @my-event="doSomething"></my-component>
```

Comme pour la [casse des props](/guide/component-props.html#casse-des-noms-de-prop-camelcase-vs-kebab-case), nous vous recommandons d'utiliser des écouteurs d'événement en kebab-case lorsque vous utilisez des templates dans le DOM. Si vous utilisez des string templates, cette limitation ne s'applique pas.

## Définir des événements personalisés

<VideoLesson href="https://vueschool.io/lessons/defining-custom-events-emits?friend=vuejs" title="Learn how to define which events a component can emit with Vue School">Regardez une vidéo gratuite sur la façon de définir des événements personnalisés sur Vue School (EN)</VideoLesson>

Les événements émis peuvent être définis sur le composant via l'option `emits`.

```js
app.component('custom-form', {
  emits: ['inFocus', 'submit']
})
```

Lorsqu'un événement natif (par exemple, `click`) est défini dans l'option`emits`, l'événement du composant sera utilisé **à la place** d'un écouteur d'événements natif.

::: tip
Il est recommandé de définir tous les événements émis afin de mieux documenter le fonctionnement d'un composant.
:::

### Valider les événements émis

Semblable à la validation du type des props, un événement émis peut être validé s'il est défini avec la syntaxe Object au lieu de la syntaxe tableau.

Pour ajouter une validation, l'événement reçoit une fonction qui reçoit les arguments passés à l'appel `$emit` et retourne un booléen pour indiquer si l'événement est valide ou non.

```js
app.component('custom-form', {
  emits: {
    // Pas de validation
    click: null,

    // Valider l'événement de soumission
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', { email, password })
    }
  }
})
```

## Arguments de `v-model

Par défaut, `v-model` sur un composant utilise`modelValue` comme prop et `update:modelValue` comme événement. Nous pouvons modifier ces noms en passant un argument à `v-model`:

```html
<my-component v-model:title="bookTitle"></my-component>
```

Dans ce cas, le composant enfant attendra un accessoire `title` et émettra l'événement `update:title` à synchroniser:

```js
app.component('my-component', {
  props: {
    title: String
  },
  emits: ['update:title'],
  template: `
    <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)">
  `
})
```

```html
<my-component v-model:title="bookTitle"></my-component>
```

## Liaisons multiples de `v-model`

En tirant parti de la possibilité de cibler une prop et un événement particulier comme nous l'avons appris auparavant avec les [arguments de `v-model`](#arguments-de-v-model), nous pouvons maintenant créer plusieurs liaisons v-model sur une seule instance de composant.

Chaque v-model sera synchronisé avec une prop différente, sans avoir besoin d'options supplémentaires dans le composant:

```html
<user-name
  v-model:first-name="firstName"
  v-model:last-name="lastName"
></user-name>
```

```js
app.component('user-name', {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName'],
  template: `
    <input
      type="text"
      :value="firstName"
      @input="$emit('update:firstName', $event.target.value)">

    <input
      type="text"
      :value="lastName"
      @input="$emit('update:lastName', $event.target.value)">
  `
})
```

<common-codepen-snippet title="Multiple v-models" slug="GRoPPrM" tab="html,result" />

## Gestion des modificateurs de `v-model`

Lorsque nous avons appris les liaisons d'entrée de formulaire, nous avons vu que `v-model` avait des [modificateurs intégrés](/guide/forms.html#modificateurs) - `.trim`, `.number` et `.lazy`. Dans certains cas, cependant, vous pouvez également ajouter vos propres modificateurs personnalisés.

Créons un exemple de modificateur personnalisé, `capitalize`, qui met en majuscule la première lettre de la chaîne de caractère fournie par la liaison `v-model`.

Les modificateurs ajoutés à un composant `v-model` seront fournis au composant via la prop `modelModifiers`. Dans l'exemple ci-dessous, nous avons créé un composant qui contient un accessoire `modelModifiers` qui par défaut est un objet vide.

Notez que lorsque le hook de cycle de vie `created` du composant se déclenche, la prop `modelModifiers` contient `capitalize` et sa valeur est `true` - car il est défini sur la liaison `v-model` `v-model.capitalize="myText"`.

```html
<my-component v-model.capitalize="myText"></my-component>
```

```js
app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  template: `
    <input type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
  `,
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
})
```

Maintenant que nous avons configuré notre prop, nous pouvons vérifier les clés d'objet `modelModifiers` et écrire un gestionnaire pour changer la valeur émise. Dans le code ci-dessous, nous mettrons en majuscule la chaîne chaque fois que l'élément `<input/>` déclenche un événement `input`.

```html
<div id="app">
  <my-component v-model.capitalize="myText"></my-component>
  {{ myText }}
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      myText: ''
    }
  }
})

app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  },
  template: `<input
    type="text"
    :value="modelValue"
    @input="emitValue">`
})

app.mount('#app')
```

Pour les liaisons `v-model` avec arguments, le nom de prop généré sera`arg + "Modifiers"`:

```html
<my-component v-model:description.capitalize="myText"></my-component>
```

```js
app.component('my-component', {
  props: ['description', 'descriptionModifiers'],
  emits: ['update:description'],
  template: `
    <input type="text"
      :value="description"
      @input="$emit('update:description', $event.target.value)">
  `,
  created() {
    console.log(this.descriptionModifiers) // { capitalize: true }
  }
})
```
