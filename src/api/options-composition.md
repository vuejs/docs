# Composition

## mixins

- **Type:** `Array<Object>`

- **Détails:**

  L'option `mixins` accepte un tableau d'objets mixin. Ces objets mixin peuvent contenir des options d'instance comme des objets d'instance normaux, et ils seront fusionnés avec les options éventuelles en utilisant la logique de fusion de certaines options. Par exemple, si votre mixin contient un hook `created` et que le composant lui-même en a également un, les deux fonctions seront appelées.

  Les hooks de mixin sont appelés dans l'ordre dans lequel ils sont fournis, et appelés avant les hooks du composant.

- **Exemple:**

  ```js
  const mixin = {
    created: function() {
      console.log(1)
    }
  }

  Vue.createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

- **Voir aussi:** [Mixins](../guide/mixins.html)

## extends

- **Type:** `Object | Function`

- **Détails:**

  Permet d'étendre de manière déclarative un autre composant (peut être un objet d'options simple ou un constructeur). Ceci est principalement destiné à faciliter l'extension entre les composants de fichier unique.

  Il est similaire aux `mixins`.

- **Exemple:**

  ```js
  const CompA = { ... }

  // étend CompA sans avoir à appeler `Vue.extend` sur l'un ou l'autre
  const CompB = {
    extends: CompA,
    ...
  }
  ```

## provide / inject

- **Type:**

  - **provide:** `Object | () => Object`
  - **inject:** `Array<string> | { [key: string]: string | Symbol | Object }`

- **Détails:**

  Cette paire d'options est utilisée ensemble pour permettre à un composant parent de servir d'injecteur de dépendances pour tous ses descendants, quelle que soit la profondeur de la hiérarchie des composants, tant qu'ils sont dans la même arborescence. Si vous êtes familier avec React, cela est très similaire à la fonctionnalité `context` de React.

  L'option `inject` doit être soit:

  - un tableau de chaînes de caractères ou
  - un objet où les clés sont les noms de la liaison locale et la valeur est soit:
    - la clé (string ou Symbol) pour rechercher dans les injections disponibles ou
    - un objet où:
      - la propriété `from` est la clé (string ou Symbol) à rechercher dans les injections disponibles et
      - la propriété `default` est utilisée comme valeur de secours

  > Note: les liaisons `provide` et `inject` ne sont PAS réactives. C'est intentionnel. Cependant, si vous transmettez un objet réactif, les propriétés de cet objet restent réactives.

- **Exemple:**

  ```js
  // composant parent fournissant 'foo'
  const Provider = {
    provide: {
      foo: 'bar'
    }
    // ...
  }

  // composant enfant injectant 'foo'
  const Child = {
    inject: ['foo'],
    created() {
      console.log(this.foo) // => "bar"
    }
    // ...
  }
  ```

  Avec les Symbols ES2015, la fonction `provide` et l'objet `inject`:

  ```js
  const s = Symbol()

  const Provider = {
    provide() {
      return {
        [s]: 'foo'
      }
    }
  }

  const Child = {
    inject: { s }
    // ...
  }
  ```

  En utilisant une valeur injectée comme valeur par défaut pour une prop:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  En utilisant une valeur injectée comme entrée de données:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  Les injections peuvent être facultatives avec une valeur par défaut:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  S'il doit être injecté à partir d'une propriété avec un nom différent, utilisez `from` pour désigner la propriété source:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  Semblable aux valeurs par défaut de prop, vous devez utiliser une "factory function" pour les valeurs non primitives:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **Voir aussi:** [Provide / Inject](../guide/component-provide-inject.html)

## setup

- **Type:** `Function`

La fonction `setup` est une nouvelle option de composant. Elle sert de point d'entrée pour l'utilisation du Composition API à l'intérieur des composants.

- **Moment d'Invocation**

  `setup` est appelée juste après la résolution initiale des props lors de la création d'une instance de composant. Au niveau du lifecycle, il est appelé avant le hook [beforeCreate](./options-lifecycle-hooks.html#beforecreate).
  

- **Usage avec les Templates**

  Si `setup` retourne un objet, les propriétés de l'objet seront fusionnées avec le contexte de rendu du template du composant:

  ```html
  <template>
    <div>{{ count }} {{ object.foo }}</div>
  </template>

  <script>
    import { ref, reactive } from 'vue'

    export default {
      setup() {
        const count = ref(0)
        const object = reactive({ foo: 'bar' })

        // exposer au template
        return {
          count,
          object
        }
      }
    }
  </script>
  ```

  Notez que les [refs](refs-api.html#ref) renvoyés par `setup` sont automatiquement déballés lors de l'accès dans le template, donc il n'y a pas besoin de `.value` dans les templates.

- **Usage avec les Fonctions de Rendu / JSX**

  `setup` peut également renvoyer une fonction de rendu, qui peut directement utiliser l'état réactif déclaré dans la même scope:

  ```js
  import { h, ref, reactive } from 'vue'

  export default {
    setup() {
      const count = ref(0)
      const object = reactive({ foo: 'bar' })

      return () => h('div', [count.value, object.foo])
    }
  }
  ```

- **Arguments**

  La fonction reçoit les props résolus comme premier argument:

  ```js
  export default {
    props: {
      name: String
    },
    setup(props) {
      console.log(props.name)
    }
  }
  ```

  Notez que cet objet `props` est réactif - c'est-à-dire qu'il est mis à jour lorsque de nouveaux props sont passés, et peut être observé et réagir en utilisant `watchEffect` ou `watch`:

  ```js
  export default {
    props: {
      name: String
    },
    setup(props) {
      watchEffect(() => {
        console.log(`name is: ` + props.name)
      })
    }
  }
  ```

  Cependant, ne déstructurez PAS l'objet `props`, car il perdra sa réactivité:

  ```js
  export default {
    props: {
      name: String
    },
    setup({ name }) {
      watchEffect(() => {
        console.log(`name is: ` + name) // Ne sera pas réactif!
      })
    }
  }
  ```

  L'objet `props` est immuable pour le code utilisateur pendant le développement (émettra un avertissement si le code utilisateur tente de le muter).

  Le deuxième argument fournit un objet de contexte qui expose une liste sélective de propriétés précédemment exposées sur `this`:

  ```js
  const MyComponent = {
    setup(props, context) {
      context.attrs
      context.slots
      context.emit
    }
  }
  ```

  `attrs` et `slots` sont des proxys des valeurs correspondantes sur l'instance de composant interne. Cela garantit qu'ils exposent toujours les dernières valeurs même après les mises à jour afin que nous puissions les déstructurer sans nous soucier d'accéder à une référence périmée:

  ```js
  const MyComponent = {
    setup(props, { attrs }) {
      // une fonction qui pourrait être appelée ultérieurement
      function onClick() {
        console.log(attrs.foo) // garantie d'être la dernière référence
      }
    }
  }
  ```

  Il y a un certain nombre de raisons pour placer `props` comme premier argument séparé au lieu de l'inclure dans le contexte:

  - Il est beaucoup plus courant pour un composant d'utiliser des `props` que les autres propriétés, et très souvent un composant n'utilise que des `props`.

  - Avoir `props` comme argument séparé facilite la saisie individuelle sans gâcher les types des autres propriétés présent dans le contexte. Il permet également de conserver une signature cohérente entre  `setup`, `render` et les composants fonctionnels simples avec le support de TSX.

- **Voir aussi:** [Composition API](composition-api.html)
