# Méthodes d'Instance

## $watch

- **Arguments:**

  - `{string | Function} source`
  - `{Function | Object} callback`
  - `{Object} options (optional)`
    - `{boolean} deep`
    - `{boolean} immediate`
    - `{string} flush`

- **Retourne:** `{Function} unwatch`

- **Usage:**

  Observe une propriété réactive ou une fonction "computed" sur l'instance du composant pour les modifications. Le callback est appelé avec la nouvelle et l'ancienne valeur pour une propriété donnée. On ne peut transmettre que le nom d'une propriété de top-niveau comme `data`, `prop`, ou `computed` sous forme de chaîne de caractères. Pour des expressions plus complexes ou des propriétés imbriquées, utilisez plutôt une fonction.

- **Exemple:**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: 4
        }
      }
    },
    created() {
      // propriété de top-niveau 
      this.$watch('a', (newVal, oldVal) => {
        // fait quelque chose
      })

      // fonction pour observer une seule propriété imbriquée
      this.$watch(
        () => this.c.d,
        (newVal, oldVal) => {
          // fait quelque chose
        }
      )

      // fonction pour observer une expression complexe
      this.$watch(
        // chaque fois que l'expression `this.a + this.b` donne un résultat différent,
        // the handler will sera appelé. C'est comme si nous observions une propriété computed
        // property sans définir la propriété computed elle-même
        () => this.a + this.b,
        (newVal, oldVal) => {
          // fait quelque chose
        }
      )
    }
  })
  ```

  Lorsque la valeur surveillée est un objet ou un tableau, toute modification de ses propriétés ou éléments ne déclenchera pas l'observateur car elle fait référence au même objet / tableau:

  ```js
  const app = Vue.createApp({
    data() {
      return {
        article: {
          text: 'Vue est magnifique!'
        },
        comments: ['En effet!', 'Je confirme']
      }
    },
    created() {
      this.$watch('article', () => {
        console.log('Article changé!')
      })

      this.$watch('comments', () => {
        console.log('Commentaires changé!')
      })
    },
    methods: {
      // Ces méthodes ne déclencheront pas d'observateur car nous n'avons modifié qu'une propriété d'un objet/tableau,
      // pas l'objet/tableau lui-même
      changeArticleText() {
        this.article.text = 'Vue 3 est magnifique'
      },
      addComment() {
        this.comments.push('Nouveau commentaire')
      },

      // Ces méthodes déclencheront un observateur car nous avons complètement remplacé l'objet/tableau
      changeWholeArticle() {
        this.article = { text: 'Vue 3 is awesome' }
      },
      clearComments() {
        this.comments = []
      }
    }
  })
  ```

  `$watch` retourne une fonction "unwatch" qui arrête de déclencher le callback:

  ```js
  const app = Vue.createApp({
    data() {
      return {
        a: 1
      }
    }
  })

  const vm = app.mount('#app')

  const unwatch = vm.$watch('a', cb)
  // plus tard, arrêter l'observation
  unwatch()
  ```

- **Option: deep**

  Pour détecter également les changements de valeur imbriqués dans les objets, vous devez passer `deep: true` dans l'argument options. Notez que vous n'avez pas besoin de le faire pour écouter les mutations de tableau

  ```js
  vm.$watch('someObject', callback, {
    deep: true
  })
  vm.someObject.nestedValue = 123
  // le callback est invoqué
  ```

- **Option: immediate**

  Passer `immediate: true` dans l'option déclenchera immédiatement le callback avec la valeur actuelle de l'expression:

  ```js
  vm.$watch('a', callback, {
    immediate: true
  })
  // le `callback` est invoqué immédiatement avec la valeur actuelle de `a`
  ```

  Notez qu'avec l'option `immédiate`, vous ne pourrez pas unwatch la propriété donnée lors du premier appel du callback.

  ```js
  // Ceci provoquera une erreur
  const unwatch = vm.$watch(
    'value',
    function() {
      doSomething()
      unwatch()
    },
    { immediate: true }
  )
  ```

  Si vous souhaitez toujours appeler une fonction de retrait (unwatch) à l'intérieur du callback, vous devez d'abord vérifier sa disponibilité:

  ```js
  let unwatch = null

  unwatch = vm.$watch(
    'value',
    function() {
      doSomething()
      if (unwatch) {
        unwatch()
      }
    },
    { immediate: true }
  )
  ```

- **Option: flush**

  L'option `flush` permet un meilleur contrôle sur le timing du callback. Il peut être réglé sur `'pre'`, `'post'` ou `'sync'`.

  La valeur par défaut est  `'pre'`, qui spécifie que le callback doit être appelé avant le rendu. Cela permet au callback de mettre à jour d'autres valeurs avant l'exécution du template.

  La valeur `'post'` peut être utilisée pour différer le callback jusqu'à la fin du rendu. Cela devrait être utilisé si le callback a besoin d'accéder au DOM mis à jour ou aux composants enfants via `$refs`.

  Si `flush` est réglé sur `'sync'`, le callback sera appelé de manière synchrone, dès que la valeur change.

  Pour `'pre'` et `'post'`, le callback est mis en mémoire tampon (Buffer) en utilisant une file d'attente. Le callback ne sera ajouté à la file d'attente qu'une seule fois, même si la valeur surveillée change plusieurs fois. Les valeurs intermédiaires seront ignorées et ne seront pas transmises au callback.

  La mise en mémoire tampon du callback améliore non seulement les performances, mais contribue également à garantir la cohérence des données. Les observateurs ne seront pas déclenchés tant que le code effectuant les mises à jour des données ne sera pas terminé.

  Les observateurs `'sync'` doivent être utilisés avec parcimonie, car ils n'ont pas ces avantages.
  
  Pour plus d'informations sur `flush` voir [Effect Flush Timing](../guide/reactivity-computed-watchers.html#effect-flush-timing).

- **Voir aussi:** [Watchers](../guide/computed.html#watchers)

## $emit

- **Arguments:**

  - `{string} eventName`
  - `...args (optionnel)`

  Déclenche un événement sur l'instance courante. Tous les arguments supplémentaires seront transmis à la fonction de callback de l'écouteur d'événements.

- **Exemples:**

  En utilisant `$emit` avec seulement un nom d'événement:

  ```html
  <div id="emit-Exemple-simple">
    <welcome-button v-on:welcome="sayHi"></welcome-button>
  </div>
  ```

  ```js
  const app = Vue.createApp({
    methods: {
      sayHi() {
        console.log('Hi!')
      }
    }
  })

  app.component('welcome-button', {
    emits: ['welcome'],
    template: `
      <button v-on:click="$emit('welcome')">
        Cliquez sur moi pour être accueilli
      </button>
    `
  })

  app.mount('#emit-Exemple-simple')
  ```

  Utilisation de `$emit` avec des arguments supplémentaires:

  ```html
  <div id="emit-Exemple-argument">
    <advice-component v-on:advise="showAdvice"></advice-component>
  </div>
  ```

  ```js
  const app = Vue.createApp({
    methods: {
      showAdvice(advice) {
        alert(advice)
      }
    }
  })

  app.component('advice-component', {
    emits: ['advise'],
    data() {
      return {
        adviceText: 'Un conseil'
      }
    },
    template: `
      <div>
        <input type="text" v-model="adviceText">
        <button v-on:click="$emit('advise', adviceText)">
          Cliquez sur moi pour envoyer des conseils
        </button>
      </div>
    `
  })

  app.mount('#emit-Exemple-argument')
  ```

- **Voir aussi:**
  - [`emits` option](./options-data.html#emits)
  - [Emitting a Value With an Event](../guide/component-basics.html#emitting-a-value-with-an-event)

## $forceUpdate

- **Usage:**

  Forcer le re-rendu de l'instance du composant. Notez qu'il n'affecte pas tous les composants enfants, uniquement l'instance elle-même et les composants enfants avec le contenu de slots insérées.

## $nextTick

- **Arguments:**

  - `{Function} callback (optionelle)`

- **Usage:**

  Reportez le callback à exécuter après le prochain cycle de mise à jour du DOM. Utilisez-le immédiatement après avoir modifié certaines données pour attendre la mise à jour du DOM. C'est la même chose que le global `nextTick`, sauf que le contexte` this` du callback est automatiquement lié à l'instance appelant cette méthode.

- **Exemple:**

  ```js
  Vue.createApp({
    // ...
    methods: {
      // ...
      Exemple() {
        // modifier des données
        this.message = 'changed'
        // DOM pas mis à jour encore
        this.$nextTick(function() {
          // DOM mis à jour maintenant
          // `this` est lié à l'instance courante
          this.doSomethingElse()
        })
      }
    }
  })
  ```

- **Voir aussi:** [nextTick](global-api.html#nexttick)
