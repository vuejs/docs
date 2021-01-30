# Introduction

## Pourquoi le Composition API ?

::: tip Note
Pour en arriver là dans la documentation, vous devriez déjà être familiarisé avec [les bases de Vue](introduction.md) et [la création de composants](component-basics.md).
:::

<VideoLesson href="https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api" title="Learn how Composition API works in depth with Vue Mastery">Regardez une vidéo gratuite sur le composition API de Vue Mastery (EN)</VideoLesson>

La création de composants Vue nous permet d'extraire des parties répétables de l'interface couplées à sa fonctionnalité dans des morceaux de code réutilisables. Cela seul peut amener notre application assez loin en termes de maintenabilité et de flexibilité. Cependant, notre expérience collective a prouvé que cela à lui seul pourrait ne pas suffire, en particulier lorsque votre application devient vraiment grosse - pensez à plusieurs centaines de composants. Lorsqu'il s'agit d'applications aussi volumineuses, le partage et la réutilisation du code deviennent particulièrement importants.

Imaginons que dans notre application, nous ayons une vue pour afficher une liste de référentiels d'un certain utilisateur. En plus de cela, nous voulons appliquer des capacités de recherche et de filtrage. Notre composant gérant cette vue pourrait ressembler à ceci:

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      repositories: [], // 1
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      // utiliser `this.user` pour récupérer les référentiels d'utilisateurs
    }, // 1
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

Ce composant a plusieurs responsabilités:

1. Obtenir des référentiels à partir d'une API supposée externe pour ce nom d'utilisateur et l'actualiser chaque fois que l'utilisateur change
   2.Recherche de référentiels à l'aide d'une chaîne de caractère `searchQuery`
2. Filtrage des référentiels à l'aide d'un objet `filters`

L'organisation des logiques avec les options des composants (`data`, `computed`, `methods`, `watch`) fonctionne dans la plupart des cas. Cependant, lorsque nos composants s'agrandissent, la liste des ** préoccupations logiques ** s'allonge également. Cela peut conduire à des composants difficiles à lire et à comprendre, en particulier pour les personnes qui ne les ont pas écrits en premier lieu.

![Vue Option API: Code grouped by option type](https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png)

Exemple présentant un gros composant où ses **préoccupations logiques** sont regroupées par couleurs.

Une telle fragmentation est ce qui rend difficile la compréhension et la maintenance d'un composant complexe. La séparation des options masque les préoccupations logiques sous-jacentes. De plus, lorsque nous travaillons sur une seule préoccupation logique, nous devons constamment «sauter» autour des blocs d'options pour le code pertinent.

Ce serait beaucoup plus agréable si nous pouvions colocaliser du code lié à la même préoccupation logique. Et c'est exactement ce que le Composition API nous permet de faire.

## Les concepts de base du Composition API

Maintenant que nous savons le **pourquoi**, nous pouvons arriver au **comment**. Pour commencer à travailler avec le Composition API, nous avons d'abord besoin d'un endroit où nous pouvons réellement l'utiliser. Dans un composant Vue, nous appelons cet endroit le `setup`.

### Option de composant `setup`

<VideoLesson href="https://www.vuemastery.com/courses/vue-3-essentials/setup-and-reactive-references" title="Learn how setup works with Vue Mastery">Regardez une vidéo gratuite sur setup sur Vue Mastery (EN)</VideoLesson>

La nouvelle option de composant `setup` est exécutée **avant** que le composant ne soit créé, une fois que les `props` ont été résolus, et sert de point d'entrée pour le composition API.

::: warning
Comme l'instance de composant n'est pas encore créée lorsque `setup` est exécuté, il n'y a pas de `this` dans une option `setup`. Cela signifie qu'à l'exception de `props`, vous ne pourrez accéder à aucune propriété déclarée dans le composant - **état local**, **propriétés computed** ou **methods**.
:::
L'option `setup` devrait être une fonction qui accepte `props` et `context` dont nous parlerons [plus tard](composition-api-setup.html#arguments). De plus, tout ce que nous retournons de `setup` sera exposé au reste de notre composant (propriétés computed, methods, hooks de cycle de vie, etc.) ainsi qu'au modèle du composant.

Ajoutons `setup` à notre composant:

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props) // { user: '' }

    return {} // tout ce qui est retourné ici sera disponible pour le reste du composant
  }
  // le "reste" du composant
}
```

Commençons maintenant par extraire la première préoccupation logique (marquée comme "1" dans le snippet d'origine).

> 1. Obtenir des référentiels à partir d'une API supposée externe pour ce nom d'utilisateur et l'actualiser chaque fois que l'utilisateur change

Nous commencerons par les parties les plus évidentes:

- La liste des référentiels
- La fonction pour mettre à jour la liste des référentiels
- Retourner à la fois la liste et la fonction afin qu'elles soient accessibles par d'autres options de composant

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'

// dans notre composant
setup (props) {
  let repositories = []
  const getUserRepositories = async () => {
    repositories = await fetchUserRepositories(props.user)
  }

  return {
    repositories,
    getUserRepositories // les fonctions rétournées ont le comportement que methods
  }
}
```

C'est notre point de départ, sauf que cela ne fonctionne pas encore car notre variable `repositories` n'est pas réactive. Cela signifie que du point de vue de l'utilisateur, la liste des référentiels resterait vide. Corrigeons ça!

### Variables réactives avec `ref`

Dans Vue 3.0, nous pouvons rendre toute variable réactive n'importe où avec une nouvelle fonction `ref`, comme ceci:

```js
import { ref } from 'vue'

const counter = ref(0)
```

`ref` prend l'argument et le renvoie enveloppé dans un objet avec une propriété `value`, qui peut ensuite être utilisée pour accéder ou muter la valeur de la variable réactive:

```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

Envellopper les valeurs dans un objet peut sembler inutile, mais il est nécessaire pour maintenir le comportement unifié entre différents types de données dans JavaScript. En effet, dans JavaScript, les types primitifs tels que "Number" ou "String" sont passés par valeur et non par référence:

![Pass by reference vs pass by value](https://blog.penjee.com/wp-content/uploads/2015/02/pass-by-reference-vs-pass-by-value-animation.gif)

Avoir un objet wrapper autour de n'importe quelle valeur nous permet de le transmettre en toute sécurité à l'ensemble de notre application sans craindre de perdre sa réactivité quelque part en cours de route.

::: tip Note
En d'autres termes, `ref` crée une **Référence réactive** à notre valeur. Le concept de travail avec des **références** sera souvent utilisé dans toute l'API de composition.
:::

De retour à notre exemple, créons une variable réactive `repositories`:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

// dans notre composant
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  return {
    repositories,
    getUserRepositories
  }
}
```

Terminé! Désormais, chaque fois que nous appelons `getUserRepositories`, `repositories` sera muté et la vue sera mise à jour pour refléter le changement. Notre composant devrait maintenant ressembler à ceci:

```js
// src/components/UserRepositories.vue
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const repositories = ref([])
    const getUserRepositories = async () => {
      repositories.value = await fetchUserRepositories(props.user)
    }

    return {
      repositories,
      getUserRepositories
    }
  },
  data () {
    return {
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

Nous avons déplacé plusieurs parties de notre première préoccupation logique dans la méthode `setup`, joliment rapprochées les unes des autres. Il ne reste plus qu'à appeler `getUserRepositories` dans le hook `mounted` et à configurer un observateur pour le faire chaque fois que le prop `user` change.

Nous commencerons avec les hooks de cycles de vie

### Hook de cycle de vie déclaré dans `setup`

Pour rendre le composition API complète par rapport à l'API Options, nous avons également besoin d'un moyen d'enregistrer les hooks de cycle de vie dans `setup`. Ceci est possible grâce à plusieurs nouvelles fonctions exportées depuis Vue. Les hooks de cycle de vie sur le composition API ont le même nom que pour l'API Options mais sont préfixés avec `on`: par exemple `mounted` ressemblerait à `onMounted`.

Ces fonctions acceptent un callback qui sera exécuté lorsque le hook est appelé par le composant.

Ajoutons-le à notre fonction `setup`:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted } from 'vue'

// dans notre composant
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  onMounted(getUserRepositories) // appelle `getUserRepositories` à `mounted`

  return {
    repositories,
    getUserRepositories
  }
}
```

Nous devons maintenant réagir aux changements apportés à la prop `user`. Pour cela, nous utiliserons la fonction autonome `watch`.

### Reaction au changements avec `watch`

Tout comme nous avons configuré un observateur sur la propriété `user` à l'intérieur de notre composant en utilisant l'option `watch`, nous pouvons faire de même en utilisant la fonction `watch` importée de Vue. Il accepte 3 arguments:

- Une **Référence réactive** ou une fonction getter que nous voulons regarder
- Un callback
- Des options de configuration faculatatives

**Voici un aperçu de son fonctionnement.**

```js
import { ref, watch } from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
  console.log('The new counter value is: ' + counter.value)
})
```

Chaque fois que `counter` est modifié, par exemple`counter.value = 5`, la fonction watch déclenchera et exécutera le callback (deuxième argument) qui, dans ce cas affichera dans la console `'The new counter value is: ' 5`.

**Voici l'équivalent avec l'API Options:**

```js
export default {
  data() {
    return {
      counter: 0
    }
  },
  watch: {
    counter(newValue, oldValue) {
      console.log('The new counter value is: ' + this.counter)
    }
  }
}
```

Pour plus de détails sur `watch`, reportez-vous à notre [guide détaillé](reactivity-computed-watchers.html#watch).

**Appliquons-le maintenant à notre exemple:**

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs } from 'vue'

// dans notre composant
setup (props) {
  // utilisation de `toRefs` pour créer une référence réactive à la propriété` user` de props
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // mettre à jour `props.user` en `user.value` pour accéder à la valeur de référence
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // définir un observateur sur la référence réactive pour la prop user
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

Vous avez probablement remarqué l'utilisation de `toRefs` en haut de notre `setup`. Ceci afin de garantir que notre observateur réagira aux modifications apportées à la prop `user`.

Avec ces changements en place, nous venons de déplacer l'ensemble de la première préoccupation logique en un seul endroit. Nous pouvons maintenant faire la même chose avec la deuxième préoccupation - le filtrage basé sur `searchQuery`, cette fois avec une propriété computed.

### Propriétés computed autonomes

Semblable à `ref` et `watch`, les propriétés computeds peuvent également être créées en dehors d'un composant Vue avec la fonction `computed` importée de Vue. Revenons à notre exemple:

```js
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```

Ici, la fonction `computed` retourne une **Réference Réactive** en _lecture seule_ à la sortie du callback de type getter passé comme premier argument à `computed`. Pour accéder à la **value** de la variable computed nouvellement créée, nous devons utiliser la propriété `.value` comme avec `ref`.

Déplaçons notre fonctionnalité de recherche dans `setup`:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs, computed } from 'vue'

// dans notre composant
setup (props) {
  // utilisation de `toRefs` pour créer une référence réactive à la propriété` user` de props
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // mettre à jour `props.user` en `user.value` pour accéder à la valeur de référence
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  //définir un observateur sur la référence réactive pour la prop user
  watch(user, getUserRepositories)

  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(
      repository => repository.name.includes(searchQuery.value)
    )
  })

  return {
    repositories,
    getUserRepositories,
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
```

Nous pourrions faire de même pour d’autres **préoccupations logiques**, mais vous vous posez peut-être déjà la question - _N'est-ce pas simplement déplacer le code vers l'option `setup` et le rendre extrêmement gros?_ Eh bien, c'est vrai. C'est pourquoi avant de passer aux autres responsabilités, nous allons d'abord extraire le code ci-dessus dans une **fonction de composition** autonome. Commençons par créer `useUserRepositories`:

```js
// src/composables/useUserRepositories.js

import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch } from 'vue'

export default function useUserRepositories(user) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

Et puis la fonctionnalité de recherche:

```js
// src/composables/useRepositoryNameSearch.js

import { ref, computed } from 'vue'

export default function useRepositoryNameSearch(repositories) {
  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(repository => {
      return repository.name.includes(searchQuery.value)
    })
  })

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
```

**Ayant maintenant ces deux fonctionnalités dans des fichiers séparés, nous pouvons commencer à les utiliser dans notre composant. Voici comment cela peut être fait:**

```js
// src/components/UserRepositories.vue
import useUserRepositories from '@/composables/useUserRepositories'
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'
import { toRefs } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    return {
      // Puisque nous ne nous soucions pas vraiment des repertoires non filtrés
      // nous pouvons exposer les résultats filtrés sous le nom `repositories`
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories,
      searchQuery,
    }
  },
  data () {
    return {
      filters: { ... }, // 3
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
  },
  methods: {
    updateFilters () { ... }, // 3
  }
}
```

À ce stade, vous connaissez probablement déjà la suite. Passons donc à la fin et migrons la fonctionnalité de filtrage restante. Nous n'avons pas vraiment besoin d'entrer dans les détails de la mise en œuvre, car ce n'est pas le but de ce guide

```js
// src/components/UserRepositories.vue
import { toRefs } from 'vue'
import useUserRepositories from '@/composables/useUserRepositories'
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'
import useRepositoryFilters from '@/composables/useRepositoryFilters'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    const {
      filters,
      updateFilters,
      filteredRepositories
    } = useRepositoryFilters(repositoriesMatchingSearchQuery)

    return {
      // Puisque nous ne nous soucions pas vraiment des repertoires non filtrés
      // nous pouvons exposer les résultats filtrés sous le nom `repositories`
      repositories: filteredRepositories,
      getUserRepositories,
      searchQuery,
      filters,
      updateFilters
    }
  }
}
```

Et nous avons terminé!

Gardez à l'esprit que nous n'avons fait qu'effleurer la surface du composition API et ce qu'elle nous permet de faire. Pour en savoir plus, consultez le guide plus en détail.
