# Lifecycle hooks

:::tip Note
Tous les lifecycle hooks ont automatiquement leur contexte `this` lié à l'instance, afin que vous puissiez accéder aux data, aux propriétés computed et aux méthodes. Cela signifie que **vous ne devez pas utiliser une fonction fléchée pour définir un lifecycle hook** (c-à-d. `created: () => this.fetchTodos()`). La raison est que les fonctions fléchées lient le contexte parent, donc `this` ne sera pas l'instance de composant comme prévu et `this.fetchTodos` sera "undefined".
:::

## beforeCreate

- **Type:** `Function`

- **Détails:**

Appelé de manière synchrone immédiatement après l'initialisation de l'instance, avant l'observation des datas et la configuration des événements/observateurs.

- **Voir aussi:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## created

- **Type:** `Function`

- **Détails:**

  Appelé de manière synchrone après la création de l'instance. À ce stade, l'instance a terminé le traitement des options, ce qui signifie que les éléments suivants ont été configurés: observation des datas, propriétés computed, méthodes, callbacks des observateurs/événements. Cependant, la phase de montage n'a pas été lancée et la propriété `$el` ne sera pas encore disponible.

- **Voir aussi:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## beforeMount

- **Type:** `Function`

- **Détails:**

  Appelée juste avant le début du montage: la fonction `render` est sur le point d'être appelée pour la première fois.

  **Ce hook n'est pas appelé lors du rendu côté serveur (SSR).**

- **Voir aussi:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## mounted

- **Type:** `Function`

- **Détails:**

  Appelé après le montage de l'instance, où l'élément passé à `Vue.createApp({}).mount()` est remplacé par le nouvellement créé `vm.$el`. Si l'instance racine est montée sur un élément dans le document, `vm.$el` sera également dans le document lorsque `mounted` est appelé.

  Notez que `mounted` ne garantit **pas** que tous les composants enfants ont également été montés. Si vous voulez attendre que la vue entière soit rendue, vous pouvez utiliser [vm.$nextTick](../api/instance-methods.html#nexttick) à l'intérieur de `mounted`:

  ```js
  mounted() {
    this.$nextTick(function () {
      // Code qui ne fonctionnera qu'après que
      // la vue entière ait été rendue
    })
  }
  ```

  **Ce hook n'est pas appelé lors du rendu côté serveur (SSR).**

- **Voir aussi:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## beforeUpdate

- **Type:** `Function`

- **Détails:**

  Appelé lorsque les datas changent, avant que le DOM ne soit patché. C'est un bon endroit pour accéder au DOM existant avant une mise à jour, par exemple pour supprimer les écouteurs d'événements ajoutés manuellement.

  **Ce hook n'est pas appelé lors du rendu côté serveur (SSR), car seul le rendu initial est effectué côté serveur.**

- **Voir aussi:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## updated

- **Type:** `Function`

- **Détails:**

  Appelé après une modification de données, le DOM virtuel est à nouveau rendu et corrigé.

  Le DOM du composant aura été mis à jour lorsque ce hook sera appelé, vous pouvez donc effectuer des opérations dépendant du DOM ici. Cependant, dans la plupart des cas, vous devez éviter de changer d'état à l'intérieur du hook. Pour réagir aux changements d'état, il est généralement préférable d'utiliser une propriété [computed](./options-data.html#computed) ou un [watcher](./options-data.html#watch).

  Notez que `updated` ne garantit **pas** que tous les composants enfants ont également été rendus. Si vous voulez attendre que la vue entière soit de nouveau rendue, vous pouvez utiliser [vm.$nextTick](../api/instance-methods.html#nexttick) à l'intérieur de de `updated`:

  ```js
  updated() {
    this.$nextTick(function () {
      // Code qui ne fonctionnera qu'après que
      // la vue entière ait été rendue
    })
  }
  ```

  **Ce hook n'est pas appelé lors du rendu côté serveur (SSR).**

- **Voir aussi:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## activated

- **Type:** `Function`

- **Détails:**

  Appelé lorsqu'un composant "keep-alive" est activé.

  **Ce hook n'est pas appelé lors du rendu côté serveur (SSR).**

- **Voir aussi:**
  - [Dynamic Components - keep-alive](../guide/component-dynamic-async.html#dynamic-components-with-keep-alive)

## deactivated

- **Type:** `Function`

- **Détails:**

  Appelé lorsqu'un composant "keep-alive" est désactivé.

  **Ce hook n'est pas appelé lors du rendu côté serveur (SSR).**

- **Voir aussi:**
  - [Dynamic Components - keep-alive](../guide/component-dynamic-async.html#dynamic-components-with-keep-alive)

## beforeUnmount

- **Type:** `Function`

- **Détails:**

  Appelé juste avant qu'une instance de composant ne soit démontée. À ce stade, l'instance est toujours pleinement fonctionnelle.

  **Ce hook n'est pas appelé lors du rendu côté serveur (SSR).**

- **Voir aussi:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## unmounted

- **Type:** `Function`

- **Détails:**

  Appelé après qu'une instance de composant a été démontée. Lorsque ce hook est appelé, toutes les directives de l'instance de composant ont été dissociées, tous les écouteurs d'événements ont été supprimés et toutes les instances de composant enfant ont également été démontées.

  **Ce hook n'est pas appelé lors du rendu côté serveur (SSR).**

- **Voir aussi:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## errorCaptured

- **Type:** `(err: Error, instance: Component, info: string) => ?boolean`

- **Détails:**

  Appelé lorsqu'une erreur venant d'un composant descendant est capturée. Le hook reçoit trois arguments: l'erreur, l'instance de composant qui a déclenché l'erreur et un "string" contenant des informations sur l'endroit où l'erreur a été capturée. Le hook peut retourner `false` pour empêcher l'erreur de se propager davantage.

  :::tip
  Vous pouvez modifier l'état du composant dans ce hook. Cependant, il est important d'avoir des conditions dans votre template ou votre fonction de rendu qui court-circuitent les autres contenus lorsqu'une erreur a été capturée; sinon le composant sera projeté dans une boucle de rendu infinie.
  :::

  **Règles de propagation des erreurs**

  - Par défaut, toutes les erreurs sont toujours envoyées au`config.errorHandler` global s'il est défini, afin que ces erreurs puissent toujours être signalées à un service d'analyse centralisé.

  - Si plusieurs hooks `errorCaptured` existent sur l'arborescence d'un composant parent, ils seront tousinvoqués sur la même erreur.

  - Si le hook `errorCaptured` génère lui-même une erreur, cette erreur et l'erreur capturée d'origine sont envoyées au fichier global` config.errorHandler`.

  - Un hook `errorCaptured` peut retourner` false` pour empêcher l'erreur de se propager davantage. Cela signifie essentiellement que "cette erreur a été gérée et doit être ignorée". Cela empêchera tout hooks `errorCaptured` supplémentaire ou le `config.errorHandler` global d'être invoqué pour cette erreur.

## renderTracked

- **Type:** `(e: DebuggerEvent) => void`

- **Détails:**

  Appelé lorsque le rendu du DOM virtuel est traqué. Le hook reçoit un `événement de débogage` comme argument. Cet événement vous indique quelle opération le composant a traqué, l'objet cible et la clé de cette opération.

- **Usage:**

  ```html
  <div id="app">
    <button v-on:click="addToCart">Ajouter au panier</button>
    <p>Panier({{ cart }})</p>
  </div>
  ```

  ```js
  const app = Vue.createApp({
    data() {
      return {
        cart: 0
      }
    },
    renderTracked({ key, target, type }) {
      console.log({ key, target, type })
      /* La console affiche ceci lorsque le composant est rendu pour la première:
      {
        key: "cart",
        target: {
          cart: 0
        },
        type: "get"
      }
      */
    },
    methods: {
      addToCart() {
        this.cart += 1
      }
    }
  })

  app.mount('#app')
  ```

## renderTriggered

- **Type:** `(e: DebuggerEvent) => void`

- **Détails:**

  Appelé lorsque le rendu du DOM virtuel est déclenché.Similaire à [`renderTracked`](#rendertracked), reçoit un` événement de débogage` comme argument. Cet événement vous indique quelle opération a déclenché le nouveau rendu, l'objet cible et la clé de cette opération.

- **Usage:**

  ```html
  <div id="app">
    <button v-on:click="addToCart">Ajouter au panier</button>
    <p>Panier({{ cart }})</p>
  </div>
  ```

  ```js
  const app = Vue.createApp({
    data() {
      return {
        cart: 0
      }
    },
    renderTriggered({ key, target, type }) {
      console.log({ key, target, type })
    },
    methods: {
      addToCart() {
        this.cart += 1
        /* Ceci provoquera l'invocation de renderTriggered
          {
            key: "cart",
            target: {
              cart: 1
            },
            type: "set"
          }
        */
      }
    }
  })

  app.mount('#app')
  ```
