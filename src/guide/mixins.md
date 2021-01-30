# Mixins

## Les bases

Les mixins distribuent des fonctionnalités réutilisables pour les composants Vue. Un objet mixin peut contenir toutes les options de composant. Lorsqu'un composant utilise un mixin, toutes les options du mixin seront "mélangées" dans les propres options du composant.

Example:

```js
// definir un objet mixin
const myMixin = {
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log('hello from mixin!')
    }
  }
}

// definir une application qui l'utilise
const app = Vue.createApp({
  mixins: [myMixin]
})

app.mount('#mixins-basic') // => "hello from mixin!"
```

## Fusion d'options

Lorsqu'un mixin et le composant lui-même contiennent des options qui se chevauchent, ils seront "fusionnés" en utilisant des stratégies appropriées.

Par exemple, les objets de données subissent une fusion récursive, les données du composant ayant la priorité en cas de conflits

```js
const myMixin = {
  data() {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  data() {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created() {
    console.log(this.$data) // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

Les fonctions hook avec le même nom sont fusionnées dans un tableau afin qu'elles soient toutes appelées. Les hooks de Mixin seront appelés **avant** les hooks du composant.

```js
const myMixin = {
  created() {
    console.log('hook de mixin appelé')
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  created() {
    console.log('hook du composant appelé')
  }
})

// => "hook de mixin appelé"
// => "hook du composant appelé"
```

Les options qui attendent des valeurs d'objet, par exemple `methods`, `components` et `directives`, seront fusionnées dans le même objet. Les options du composant seront prioritaires en cas de conflit de clés dans ces objets:

```js
const myMixin = {
  methods: {
    foo() {
      console.log('foo')
    },
    conflicting() {
      console.log('from mixin')
    }
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  methods: {
    bar() {
      console.log('bar')
    },
    conflicting() {
      console.log('from self')
    }
  }
})

const vm = app.mount('#mixins-basic')

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

## Mixin Global

Vous pouvez également appliquer un mixin globalement pour une application Vue:

```js
const app = Vue.createApp({
  myOption: 'hello!'
})

// injecte un gestionnaire pour l'option personnalisée myOption
app.mixin({
  created() {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

app.mount('#mixins-global') // => "hello!"
```

Utiliser avec précaution! Une fois que vous avez appliqué un mixin globalement, cela affectera **chaque** instance de composant créée par la suite dans l'application donnée (par exemple, les composants enfants):

```js
const app = Vue.createApp({
  myOption: 'hello!'
})

// injecte un gestionnaire pour l'option personnalisée myOption
app.mixin({
  created() {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

// ajoute myOption également au composant enfant
app.component('test-component', {
  myOption: 'hello from component!'
})

app.mount('#mixins-global')

// => "hello!"
// => "hello from component!"
```

Dans la plupart des cas, vous ne devez l'utiliser que pour la gestion des options personnalisées, comme illustré dans l'exemple ci-dessus. C'est aussi une bonne idée de les expédier en tant que [Plugins](plugins.html) pour éviter la duplication d'application.

## Stratégies de fusion d'options personnalisées

Lorsque les options personnalisées sont fusionnées, elles utilisent la stratégie par défaut qui écrase la valeur existante. Si vous voulez qu'une option personnalisée soit fusionnée à l'aide d'une logique personnalisée, vous devez attacher une fonction à `app.config.optionMergeStrategies`:

```js
const app = Vue.createApp({})

app.config.optionMergeStrategies.customOption = (toVal, fromVal) => {
  // return mergedVal
}
```

La stratégie de fusion reçoit la valeur de cette option définie sur les instances parent et enfant comme premier et deuxième arguments, respectivement. Essayons de vérifier ce que nous avons dans ces paramètres lorsque nous utilisons un mixin:

```js
const app = Vue.createApp({
  custom: 'hello!'
})

app.config.optionMergeStrategies.custom = (toVal, fromVal) => {
  console.log(fromVal, toVal)
  // => "goodbye!", undefined
  // => "hello", "goodbye!"
  return fromVal || toVal
}

app.mixin({
  custom: 'goodbye!',
  created() {
    console.log(this.$options.custom) // => "hello!"
  }
})
```

Comme vous pouvez le voir, dans la console, nous avons `toVal` et`fromVal` imprimés d'abord à partir du mixin, puis de `l'application`. Nous retournons toujours `fromVal` s'il existe, c'est pourquoi `this.$options.custom` est réglé sur `hello!` À la fin. Essayons de changer une stratégie pour _toujours renvoyer une valeur de l'instance enfant_ :

```js
const app = Vue.createApp({
  custom: 'hello!'
})

app.config.optionMergeStrategies.custom = (toVal, fromVal) => toVal || fromVal

app.mixin({
  custom: 'goodbye!',
  created() {
    console.log(this.$options.custom) // => "goodbye!"
  }
})
```

## Précautions

Dans Vue 2, les mixins étaient le principal outil pour résumer des parties de la logique des composants en blocs réutilisables. Cependant, ils ont quelques problèmes:

- Les mixins sont sujets aux conflits: puisque les propriétés de chaque fonctionnalité sont fusionnées dans le même composant, vous devez toujours connaître toutes les autres fonctionnalités pour éviter les conflits de nom de propriété et pour le débogage.

- La réutilisabilité est limitée: on ne peut pas passer de paramètres au mixin pour changer sa logique ce qui réduit leur flexibilité en termes de logique abstraite

Pour résoudre ces problèmes, nous avons ajouté une nouvelle façon d'organiser le code par souci logique: le [Composition API](composition-api-introduction.html).
