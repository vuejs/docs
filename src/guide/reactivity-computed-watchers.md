# Computed et Watch

> Cette section utilise la syntaxe de [composant à fichier unique](single-file-component.html) pour les exemples de code

## Valeur computed

Parfois, nous avons besoin d'un état qui dépend d'un autre état - dans Vue, cela est géré avec les [propriétés computed](computed.html#computed-properties). Pour créer directement une valeur computed, nous pouvons utiliser la méthode `computed`: elle prend une fonction getter et renvoie un objet réactif immuable [ref](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs) pour la valeur renvoyée par le getter.

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // error
```

Alternativement, il peut prendre un objet avec les fonctions `get` et `set` pour créer un objet ref accessible en écriture.

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

## `watchEffect`

Pour appliquer et _automatiquement réappliquer_ un effet secondaire basé sur l'état réactif, nous pouvons utiliser la méthode `watchEffect`. Il exécute une fonction immédiatement tout en suivant de manière réactive ses dépendances et la réexécute chaque fois que les dépendances sont modifiées.

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

### Stopper l'observateur

Lorsque `watchEffect` est appelé pendant la fonction [setup()](composition-api-setup.html) d'un composant ou pendant un [lifecycle hook](composition-api-lifecycle-hooks.html), l'observateur est lié au cycle de vie du composant et sera automatiquement arrêté lorsque le composant sera démonté.

Dans d'autres cas, il retourne une fonction d'arrèt qui peut être appelée pour arrêter explicitement l'observateur:

```js
const stop = watchEffect(() => {
  /* ... */
})

// plus tard
stop()
```

### Invalidation des effets secondaires

Parfois, la fonction d'effet de l'observateur effectuera des effets secondaires asynchrones qui doivent être assainis lorsqu'elle est invalidée (c'est-à-dire que l'état a changé avant que les effets puissent être terminés). La fonction d'effet reçoit une fonction `onInvalidate` qui peut être utilisée pour enregistrer un callback d'invalidation. Ce callback d'invalidation est appelé lorsque:

- l'effet est sur le point de se répéter
- l'observateur est arrêté (c'est-à-dire lorsque le composant est démonté si `watchEffect` est utilisé dans `setup()` ou les hooks de cycle de vie)

```js
watchEffect(onInvalidate => {
  const token = performAsyncOperation(id.value)
  onInvalidate(() => {
    // id a changé ou l'observateur est arrêté.
    // invalider l'opération asynchrone précédemment en attente
    token.cancel()
  })
})
```

Nous enregistrons le callback d'invalidation via une fonction transmise au lieu de le renvoyer à partir du calback car la valeur de retour est importante pour la gestion des erreurs asynchrones. Il est très courant que la fonction d'effet soit une fonction asynchrone lors de la récupération de données:

```js
const data = ref(null)
watchEffect(async onInvalidate => {
  onInvalidate(() => {
    /* ... */
  }) // nous enregistrons la fonction de nettoyage avant que la Promise soit resolue
  data.value = await fetchData(props.id)
})
```

Une fonction asynchrone retourne implicitement une Promise, mais la fonction de nettoyage doit être enregistrée immédiatement avant la résolution de la Promise. De plus, Vue s'appuie sur la promesse retournée pour gérer automatiquement les erreurs potentielles dans la chaîne Promise.

### Timing des effets

Le système de réactivité de Vue met en mémoire tampon les effets invalides et les vide de manière asynchrone pour éviter les invocations inutiles en double lorsqu'il y a de nombreuses mutations d'état qui se produisent dans le même "tick". En interne, la fonction `update` d'un composant est également un effet observé. Lorsqu'un effet utilisateur est mis en file d'attente, il est par défaut appelé **avant** tous les effets du composant `update`:

```html
<template>
  <div>{{ count }}</div>
</template>

<script>
  export default {
    setup() {
      const count = ref(0)

      watchEffect(() => {
        console.log(count.value)
      })

      return {
        count
      }
    }
  }
</script>
```

Dans cet exemple:

- Le décompte sera enregistré de manière synchrone lors de l'exécution initiale.
- Lorsque `count` est muté, le rappel sera appelé **avant que** le composant ne soit mis à jour.

Dans les cas où un effet d'un observateur doit être réexécuté **après** les mises à jour du composant, nous pouvons passer un objet `options` supplémentaire avec l'option `flush` (par défaut c'est `'pre'`):

```js
// se déclenche après les mises à jour des composants afin que vous puissiez
// accéder au DOM mis à jour
// Note: cela retardera également l'exécution initiale de l'effet jusqu'à ce que
// le premier rendu du composant soit terminé.
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'post'
  }
)
```

L'option `flush` accepte également``sync '', ce qui force l'effet à se déclencher toujours de manière synchrone. Ceci est cependant inefficace et devrait être rarement nécessaire.

### Débogage des observateurs

Les options `onTrack` et `onTrigger` peuvent être utilisées pour déboguer le comportement d'un observateur.

- `onTrack` sera appelé lorsqu'une propriété réactive ou une ref est suivie en tant que dépendance.
- `onTrigger` sera appelé lorsque le callback de l'observateur est déclenché par la mutation d'une dépendance.

Les deux rappels recevront un événement de débogage qui contient des informations sur la dépendance en question. Il est recommandé de placer une instruction `debugger` dans ces rappels pour inspecter interactivement la dépendance:

```js
watchEffect(
  () => {
    /* effet sécondaire */
  },
  {
    onTrigger(e) {
      debugger
    }
  }
)
```

`onTrack` et `onTrigger` ne fonctionne qu'en mode développement.

## `watch`

L'API `watch` est l'équivalent exact de la propriété de composant [watch](computed.html#watchers). `watch` nécessite d'observer une source de données spécifique et applique les effets secondaires dans une fonction de callback distincte. Il est également paresseux (lazy) par défaut - c'est-à-dire que le callback n'est appelé que lorsque la source surveillée a changé.

- Comparé à [watchEffect](#watcheffect), `watch` nous permet de:

  - Effectuer l'effet secondaire paresseusement;
  - Être plus précis sur l'état qui doit déclencher la réexécution de l'observateur;
  - Accédez à la fois à la valeur précédente et actuelle de l'état surveillé.

### Observer une seule source

Une source de données watcher peut être soit une fonction getter qui renvoie une valeur, soit directement un `ref`:

```js
//observer un getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// observer directement une ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

### Observer plusieurs sources

Un observateur peut également regarder plusieurs sources en même temps à l'aide d'un tableau:

```js
const firstName = ref('')
const lastName = ref('')

watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues)
})

firstName.value = 'John' // logs: ["John",""] ["", ""]
lastName.value = 'Smith' // logs: ["John", "Smith"] ["John", ""]
```

### Observer des objets réactifs

L'utilisation d'un observateur pour comparer les valeurs d'un tableau ou d'un objet qui sont réactifs nécessite qu'il y ait une copie faite uniquement des valeurs.

```js
const numbers = reactive([1, 2, 3, 4])

watch(
  () => [...numbers],
  (numbers, prevNumbers) => {
    console.log(numbers, prevNumbers)
  }
)

numbers.push(5) // logs: [1,2,3,4,5] [1,2,3,4]
```

Tenter de vérifier les changements de propriétés dans un objet ou un tableau profondément imbriqué nécessitera toujours que l'option `deep` soit vraie:

```js
const state = reactive({
  id: 1,
  attributes: {
    name: ''
  }
})

watch(
  () => state,
  (state, prevState) => {
    console.log('not deep ', state.attributes.name, prevState.attributes.name)
  }
)

watch(
  () => state,
  (state, prevState) => {
    console.log('deep ', state.attributes.name, prevState.attributes.name)
  },
  { deep: true }
)

state.attributes.name = 'Alex' // Logs: "deep " "Alex" "Alex"
```

Cependant, l'observation d'un objet ou d'un tableau réactif renverra toujours une référence à la valeur courante de cet objet pour la valeur courante et précédente de l'état. Pour surveiller entièrement les objets et les tableaux profondément imbriqués, une copie complète des valeurs peut être nécessaire. Cela peut être réalisé avec un utilitaire tel que [lodash.cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep)

```js
import _ from 'lodash'

const state = reactive({
  id: 1,
  attributes: {
    name: ''
  }
})

watch(
  () => _.cloneDeep(state),
  (state, prevState) => {
    console.log(state.attributes.name, prevState.attributes.name)
  }
)

state.attributes.name = 'Alex' // Logs: "Alex" ""
```

### Comportement partagé avec `watchEffect`

`watch` partage même le comportement avec [`watchEffect`](#watcheffect) en termes de [stoppage manuel](#stopper-l-observateur), d'[invalidation d'effet secondaire](#invalidation-des-effets-secondaires) (avec `onInvalidate` passé à la fonction de callback comme troisième argument à la place), du [timing des effets](#timing-des-effets) et du [debogage](#debogage-des-observateurs).
