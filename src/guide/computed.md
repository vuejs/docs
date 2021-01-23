# Propriétés computed et les Observateurs

## Propriété computed

Les expressions dans le template sont très pratiques, mais elles sont destinées à des opérations simples. Mettre trop de logique dans vos templates peut les rendre gonflés et difficiles à maintenir. Par exemple, si nous avons un objet avec un tableau imbriqué:

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Guide Avancé',
          'Vue 3 - Guide Basique',
          'Vue 4 - Le Mystère'
        ]
      }
    }
  }
})
```

Et nous voulons afficher différents messages selon que `author` a déjà des livres ou non

```html
<div id="computed-basics">
  <p>A publié des livres:</p>
  <span>{{ author.books.length > 0 ? 'Oui' : 'Non' }}</span>
</div>
```

À ce stade, le template n'est plus simple et déclaratif. Il faut le regarder une seconde avant de se rendre compte qu'il effectue un calcul en fonction de `author.books`. Le problème est aggravé lorsque vous souhaitez inclure ce calcul dans votre template plus d'une fois.

C'est pourquoi pour une logique complexe qui inclut des données réactives, vous devez utiliser une **propriété computed**.

### Exemple Basique

```html
<div id="computed-basics">
  <p>A publié des livres:</p>
  <span>{{ publishedBooksMessage }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Guide Avancé',
          'Vue 3 - Guide Basique',
          'Vue 4 - Le Mystère'
        ]
      }
    }
  },
  computed: {
    // un getter calculé avec computed
    publishedBooksMessage() {
      // `this` pointe vers l'instance vm 
      return this.author.books.length > 0 ? 'Oui' : 'Non'
    }
  }
}).mount('#computed-basics')
```

Résultat:

<common-codepen-snippet title="Computed basic example" slug="NWqzrjr" tab="js,result" :preview="false" />

Ici nous avons déclaré une propriété computed `publishedBooksMessage`.

Essayez de changer la valeur du tableau `books` dans le `data` de l'application et vous verrez comment `publishedBooksMessage` change en conséquence.

Vous pouvez lier des données à des propriétés computed dans des templates comme une propriété normale. Vue est conscient que `vm.publishedBooksMessage` dépend de `vm.author.books`, donc il mettra à jour toutes les liaisons qui dépendent de `vm.publishedBooksMessage` lorsque `vm.author.books` change. Et la meilleure partie est que nous avons créé cette relation de dépendance de manière déclarative: la fonction getter calculée n'a pas d'effets secondaires, ce qui la rend plus facile à tester et à comprendre.

### Mise en cache computed vs methods

Vous avez peut-être remarqué que nous pouvons obtenir le même résultat en appelant une méthode dans l'expression:

```html
<p>{{ calculateBooksMessage() }}</p>
```

```js
// dans le composant
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Oui' : 'Non'
  }
}
```

Au lieu d'une propriété computed, nous pouvons définir la même fonction qu'une méthode. Pour le résultat final, les deux approches sont en effet exactement les mêmes. Cependant, la différence est que **les propriétés computed sont mises en cache en fonction de leurs dépendances réactives.** Une propriété computed ne réévaluera que lorsque certaines de ses dépendances réactives auront changé. Cela signifie que tant que `author.books` n'a pas changé, l'accès multiple à la propriété computed `publishedBooksMessage` renverra immédiatement le résultat calculé précédemment sans avoir à exécuter à nouveau la fonction.

Cela signifie également que la propriété computed suivante ne sera jamais mise à jour, car `Date.now ()` n'est pas une dépendance réactive:

```js
computed: {
  now() {
    return Date.now()
  }
}
```

En comparaison, un appel de `method` exécutera **toujours** la fonction chaque fois qu'un nouveau rendu se produit.

Pourquoi avons-nous besoin de la mise en cache? Imaginez que nous ayons une propriété computed coûteuse en ressource `list`, qui nécessite de parcourir un énorme tableau et de faire beaucoup de calculs. Ensuite, nous pouvons avoir d'autres propriétés computed qui dépendent à leur tour de `list`. Sans la mise en cache, nous exécuterions le getter de `list` beaucoup plus de fois que nécessaire! Dans les cas où vous ne voulez pas de mise en cache, utilisez plutôt `method`.

### Setter des propriétés computed

Les propriétés computed sont par défaut uniquement en lecture, mais vous pouvez également fournir un setter lorsque vous en avez besoin:

```js
// ...
computed: {
  fullName: {
    // getter
    get() {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set(newValue) {
      const names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

Maintenant, lorsque vous exécutez `vm.fullName = 'John Doe'`, le setter sera appelé et `vm.firstName` et `vm.lastName` seront mis à jour en conséquence.

## Observateurs

Bien que les propriétés computed soient plus appropriées dans la plupart des cas, il arrive parfois qu'un observateur personnalisé soit nécessaire. C'est pourquoi Vue fournit un moyen plus générique de réagir aux changements de données via l'option `watch`. Ceci est particulièrement utile lorsque vous souhaitez effectuer des opérations asynchrones ou coûteuses en réponse à la modification des données.

Par exemple:

```html
<div id="watch-example">
  <p>
    Poser une question qui se repond par oui/non:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</div>
```

```html
<!-- Puisqu'il existe déjà un riche écosystème de bibliothèques ajax  -->
<!-- et des collections de méthodes utilitaires générales, Vue core  -->
<!-- est capable de rester petit en ne les réinventant pas. Ceci aussi   -->
<!-- vous donne la liberté d'utiliser ce que vous connaissez.      -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script>
  const watchExampleVM = Vue.createApp({
    data() {
      return {
        question: '',
        answer: 'Les questions contiennent généralement un point d'interrogation. ;-)'
      }
    },
    watch: {
      // chaque fois que question change, cette fonction s'exécute
      question(newQuestion, oldQuestion) {
        if (newQuestion.indexOf('?') > -1) {
          this.getAnswer()
        }
      }
    },
    methods: {
      getAnswer() {
        this.answer = 'Je réfléchis...'
        axios
          .get('https://yesno.wtf/api')
          .then(response => {
            this.answer = response.data.answer
          })
          .catch(error => {
            this.answer = 'Erreur pas de reponse de l\'API ' + error
          })
      }
    }
  }).mount('#watch-example')
</script>
```

Résultat:

<common-codepen-snippet title="Watch basic example" slug="GRJGqXp" tab="result" :preview="false" />


Dans ce cas, l'utilisation de l'option `watch` nous permet d'effectuer une opération asynchrone (accès à une API) et définit une condition pour effectuer cette opération. Rien de tout cela ne serait possible avec une propriété computed.

En plus de l'option `watch`, vous pouvez également utiliser l'API impérative [vm.$watch](../api/instance-methods.html#watch).

### Computed vs Watch

Vue fournit un moyen plus générique d'observer et de réagir aux changements de données sur une instance active courante: **les propriétés watch**. Lorsque vous avez des données qui doivent changer en fonction d'autres données, il est tentant de surutiliser `watch` - surtout si vous venez d'un arrière-plan AngularJS. Cependant, il est souvent préférable d'utiliser une propriété computed plutôt qu'un callback impératif `watch`. Prenons cet exemple:

```html
<div id="demo">{{ fullName }}</div>
```

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    }
  },
  watch: {
    firstName(val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName(val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
}).mount('#demo')
```

Le code ci-dessus est impératif et répétitif. Comparez-le avec une version de propriété computed:

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar'
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}).mount('#demo')
```

Beaucoup mieux, non?
