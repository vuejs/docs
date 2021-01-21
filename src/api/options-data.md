# Data

## data

- **Type:** `Function`

- **Détails:**

  Fonction qui renvoie un objet de données pour l'instance de composant. Dans `data`, nous ne recommandons pas d'observer des objets avec leur état comportemental propre comme les objets API du navigateur et les propriétés de prototype. Une bonne idée serait d'avoir ici juste un objet simple qui représente les données des composants.

  Une fois observé, vous ne pouvez plus ajouter de propriétés réactives à l'objet de données racine. Il est donc recommandé de déclarer toutes les propriétés réactives au niveau racine à l'avance, avant de créer l'instance.

  Une fois l'instance créée, l'objet de données d'origine est accessible en tant que `vm.$data`. L'instance de composant fournit également un proxy pour toutes les propriétés trouvées sur l'objet de données, donc `vm.a` sera équivalent à `vm.$data.a`.

  Les propriétés qui commencent par `_` ou `$` n'auront **pas** de proxy sur l'instance de composant car elles peuvent entrer en conflit avec les propriétés internes de Vue et les méthodes des API. Vous devrez y accéder en tant que `vm.$data._property`.

- **Exemple:**

  ```js
  // création d'instance directe
  const data = { a: 1 }

  // L'objet est ajouté à une instance de composant
  const vm = Vue.createApp({
    data() {
      return data
    }
  }).mount('#app')

  console.log(vm.a) // => 1
  ```

  Notez que si vous utilisez une fonction fléchée avec la propriété `data`, `this` ne sera pas l'instance du composant, mais vous pouvez toujours accéder à l'instance comme premier argument de la fonction:

  ```js
  data: vm => ({ a: vm.myProp })
  ```

- **Voir aussi:** [Reactivity in Depth](../guide/reactivity.html)

## props

- **Type:** `Array<string> | Object`

- **Détails:**

  Une liste/hachage d'attributs qui sont exposés pour accepter les données du composant parent. Il possède une syntaxe simple basée sur un tableau et une syntaxe alternative basée sur un objet qui permet des configurations avancées telles que la vérification du type, la validation personnalisée et les valeurs par défaut.

  Avec la syntaxe basée sur les objets, vous pouvez utiliser les options suivantes:

  - `type`: peut être l'un des constructeurs natifs suivants: `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`, toute fonction de constructeur personnalisée ou un tableau. Vérifiera si un prop a un type donné, et lancera un avertissement si ce n'est pas le cas. [Plus d'informations](../guide/component-props.html#prop-types) sur les types des props.
  - `default`: `any`
    Spécifie une valeur par défaut pour la prop. Si la prop n'est pas passé, cette valeur sera utilisée à la place. Les valeurs par défaut des objets ou des tableaux doivent être renvoyées à partir d'une "factory function".
  - `required`: `Boolean`
    Définit si la prop est requise. Dans un environnement hors production, un avertissement sera émis dans la console si cette valeur est à true que la prop n'est pas passé.
  - `validator`: `Function`
    Fonction de validation personnalisée qui prend la valeur de la prop comme seul argument. Dans un environnement hors production, un avertissement sera émis dans la console si cette fonction retourne false (i.e. la validation a échouée). Vous pouvez en savoir plus sur la validation des props [ici](../guide/component-props.html#prop-validation).

- **Exemple:**

  ```js
  const app = Vue.createApp({})

  // syntaxe simple 
  app.component('props-demo-simple', {
    props: ['size', 'myMessage']
  })

  // syntaxe d'objet avec validation
  app.component('props-demo-advanced', {
    props: {
      // verifier le type
      height: Number,
      // verifier le type et autres validations
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: value => {
          return value >= 0
        }
      }
    }
  })
  ```

- **Voir aussi:** [Props](../guide/component-props.html)

## computed

- **Type:** `{ [key: string]: Function | { get: Function, set: Function } }`

- **Détails:**

  Propriétés calculées à mixer dans l'instance de composant. Tous les getters et setters ont leur contexte `this` automatiquement lié à l'instance de composant.

  Notez que si vous utilisez une fonction fléchée avec une propriété computed, `this` ne sera pas l'instance du composant, mais vous pouvez toujours accéder à l'instance en tant que premier argument de la fonction:

  ```js
  computed: {
    aDouble: vm => vm.a * 2
  }
  ```

  Les propriétés computed sont mises en cache et recalculées uniquement sur les modifications de dépendance réactives. Notez que si une certaine dépendance est hors de la scope de l'instance (c'est-à-dire qu'elle n'est pas réactive), la propriété computed ne sera **pas** mise à jour.

- **Exemple:**

  ```js
  const app = Vue.createApp({
    data() {
      return { a: 1 }
    },
    computed: {
      // get seulement
      aDouble() {
        return this.a * 2
      },
      // get et set
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    }
  })

  const vm = app.mount('#app')
  console.log(vm.aPlus) // => 2
  vm.aPlus = 3
  console.log(vm.a) // => 2
  console.log(vm.aDouble) // => 4
  ```

- **Voir aussi:** [Computed Properties](../guide/computed.html)

## methods

- **Type:** `{ [key: string]: Function }`

- **Détails:**

  Méthodes à mixer dans l'instance de composant. Vous pouvez accéder à ces méthodes directement sur l'instance de VM ou les utiliser dans des expressions de directive. Toutes les méthodes auront leur contexte `this` automatiquement lié à l'instance de composant.

  :::tip Note
  Notez que **vous ne devez pas utiliser une fonction fléchée pour définir une méthode** (par exemple `plus: () => this.a++`). La raison en est que les fonctions fléchées lient le contexte parent, donc `this` ne sera pas l'instance de composant comme prévu et `this.a` sera undefined.
  :::

- **Exemple:**

  ```js
  const app = Vue.createApp({
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    }
  })

  const vm = app.mount('#app')

  vm.plus()
  console.log(vm.a) // => 2
  ```

- **Voir aussi:** [Event Handling](../guide/events.html)

## watch

- **Type:** `{ [key: string]: string | Function | Object | Array}`

- **Détails:**

  Un objet où les clés sont des expressions à observer et les valeurs sont les callbacks correspondants. La valeur peut également être un nom de méthode écrit en "string" ou un objet contenant des options supplémentaires. L'instance de composant appellera `$watch()` pour chaque entrée de l'objet lors de l'instanciation. Voir [$watch](instance-methods.html#watch) pour plus d'informations sur les options `deep`, `immediate` et `flush`.

- **Exemple:**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 'test',
        f: 5
      }
    },
    watch: {
      a(val, oldVal) {
        console.log(`nouveau: ${val}, ancien: ${oldVal}`)
      },
      // nom de méthode écrit en "string"
      b: 'someMethod',
      // le callback sera appelé chaque fois que l'une des propriétés de l'objet surveillé change quelle que soit sa profondeur imbriquée
      c: {
        handler(val, oldVal) {
          console.log('c a changé')
        },
        deep: true
      },
      // le callback sera appelé immédiatement après le début de l'observation
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // vous pouvez passer un tableau de callbacks, ils seront appelés un par un
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 déclenché')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 déclenché')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b a changé')
      },
      handle1() {
        console.log('handle 1 déclenché')
      }
    }
  })

  const vm = app.mount('#app')

  vm.a = 3 // => nouveau: 3, ancien: 1
  ```

  ::: tip Note
  Notez que _vous ne devez pas utiliser de fonction fléchée pour définir un watcher_ (par exemple `searchQuery: newValue => this.updateAutocomplete(newValue)`). La raison est que les fonctions fléchées lient le contexte parent, donc `this` ne sera pas l'instance de composant comme prévu et` this.updateAutocomplete` sera undefined.
  :::

- **Voir aussi:** [Watchers](../guide/computed.html#watchers)

## emits

- **Type:** `Array<string> | Object`

- **Détails:**

  Une liste/hachage d'événements personnalisés pouvant être émis à partir du composant. Ça a une syntaxe simple basée sur un tableau et une syntaxe alternative basée sur un objet qui permet de configurer une validation d'événement.

  Dans la syntaxe basée sur les objets, la valeur de chaque propriété peut être `null` ou une fonction de validation. La fonction de validation reçoit les arguments supplémentaires passés à `$emit`. Par exemple, si `this.$emit('foo', 1)` est appelé, le validateur correspondant pour `foo` recevra l'argument `1`. La fonction de validation doit retourner un booléen pour indiquer si les arguments récçus sont valides ou pas.

- **Usage:**

  ```js
  const app = Vue.createApp({})

  // Syntaxe Array 
  app.component('todo-item', {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  })

  // Syntaxe Object 
  app.component('reply-form', {
    emits: {
      // sans validation
      click: null,

      // avec validation
      submit: payload => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  })
  ```

  ::: tip Note
  Les événements listés dans l'option `emits` **ne seront pas** hérités par l'élément racine du composant et seront également exclus de la propriété `$attrs`.
  :::

* **Voir aussi:** [Attribute Inheritance](../guide/component-attrs.html#attribute-inheritance)
