# Propriétés data et methods


## data

L'option `data` d'un composant est une fonction. Vue appelle cette fonction dans le cadre de la création d'une nouvelle instance de composant. Il doit retourner un objet, que Vue encapsulera ensuite dans son système de réactivité et le stockera sur l'instance du composant en tant que `$data`. Pour plus de commodité, toutes les propriétés de niveau supérieur de cet objet sont également exposées directement via l'instance de composant:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.$data.count) // => 4
console.log(vm.count)       // => 4

// Attribuer une valeur à vm.count mettra également à jour $data.count
vm.count = 5
console.log(vm.$data.count) // => 5

// ... et vice-versa
vm.$data.count = 6
console.log(vm.count) // => 6
```

Ces propriétés d'instance ne sont ajoutées que lorsque l'instance est créée pour la première fois, vous devez donc vous assurer qu'elles sont toutes présentes dans l'objet retourné par la fonction `data`. Si nécessaire, utilisez `null`, `undefined` ou un placeholder pour les propriétés où la valeur souhaitée n'est pas encore disponible.

Il est possible d'ajouter une nouvelle propriété directement à l'instance du composant sans l'inclure dans `data`. Cependant, comme cette propriété n'est pas sauvegardée par l'objet réactif `$data`, elle ne sera pas automatiquement suivie par [le système de réactivité de Vue](reactivity.html).

Vue utilise un préfixe `$` lors de l'exposition de ses propres API intégrées via l'instance de composant. Il réserve également le préfixe `_` pour les propriétés internes. Vous devez éviter d'utiliser des noms pour les propriétés `data` de niveau supérieur commençant par l'un de ces caractères.

## methods

Pour ajouter des méthodes à une instance de composant, nous utilisons l'option `methods`. Cela doit être un objet contenant les méthodes souhaitées:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  },
  methods: {
    increment() {
      // `this` fera référence à l'instance de composant
      this.count++
    }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4

vm.increment()

console.log(vm.count) // => 5
```

Vue lie automatiquement la valeur `this` pour les `methods` afin qu'elles fassent toujours référence à l'instance du composant. Cela garantit qu'une méthode conserve la valeur correcte `this` si elle est utilisée comme écouteur d'événement ou callback. Vous devriez éviter d'utiliser les fonctions fléchées lors de la définition des `methods`, car cela empêche Vue de lier la valeur `this` appropriée.

Tout comme toutes les autres propriétés de l'instance de composant, les `methods` sont accessibles depuis le template du composant. Dans un template, ils sont le plus souvent utilisés comme écouteurs d'événements:

```html
<button @click="increment">Up vote</button>
```

Dans l'exemple ci-dessus, la méthode `increment` sera invoqué lorsque le `<button> `sera cliqué.

Il est également possible d'appeler une méthode directement à partir d'un template. Comme nous le verrons bientôt, il est généralement préférable d'utiliser une [propriété _computed_](computed.html). Cependant, l'utilisation d'une méthode peut être utile dans les scénarios où les propriétés _computed_ ne sont pas une option viable. Vous pouvez appeler une méthode partout où un template prend en charge les expressions JavaScript:

```html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

Si les méthodes `toTitleDate` ou `formatDate` accèdent à des données réactives, elles seront suivies en tant que dépendance de rendu, comme si elles avaient été utilisées directement dans le template.

Les méthodes appelées à partir d'un modèle ne doivent pas avoir d'effets secondaires, tels que la modification des données ou le déclenchement de processus asynchrones. Si vous êtes tenté de faire cela, vous devriez probablement utiliser un [hook de cycle de vie](instance.html#lifecycle-hooks).

### Debouncing et Throttling

Vue n'inclut pas de support intégré pour le _debouncing_(anti-rebondissement) ou le _throttling_ (limitation), mais ils peuvent être implémenté à l'aide de librairies telles que [Lodash](https://lodash.com/).

Dans les cas où un composant n'est utilisé qu'une seule fois, le _debouncing_ peut être appliqué directement dans les `methods`:

```html
<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"></script>
<script>
  Vue.createApp({
    methods: {
      // Debouncing avec Lodash
      click: _.debounce(function() {
        // ... repond au click ...
      }, 500)
    }
  }).mount('#app')
</script>
```

Cependant, cette approche est potentiellement problématique pour les composants qui sont réutilisés car ils partageront tous la même fonction anti-rebond. Pour que les instances de composants restent indépendantes les unes des autres, nous pouvons ajouter la fonction debounce dans le hook de cycle de vie `created`:

```js
app.component('save-button', {
  created() {
    // Debouncing avec Lodash
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // Annule le timer lorsque le composant est retiré
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... repond au click ...
    }
  },
  template: `
    <button @click="debouncedClick">
      Save
    </button>
  `
})
```
