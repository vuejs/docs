# Provide / inject

> Cette page suppose que vous avez déjà lu les [Principes de base des composants](component-basics.md). Lisez-le d'abord si vous n'êtes pas familier avec les composants.

Habituellement, lorsque nous devons passer des données du composant parent au composant enfant, nous utilisons les [props](component-props.md). Imaginez la structure dans laquelle vous avez des composants profondément imbriqués et vous n'avez besoin que de quelque chose du composant parent dans l'enfant profondément imbriqué. Dans ce cas, vous devez toujours faire passer la prop le long de la chaîne de composants, ce qui peut être gênant.

Pour de tels cas, nous pouvons utiliser la paire `provide` et `inject`. Les composants parents peuvent servir de fournisseur de dépendances pour tous ses enfants, quelle que soit la profondeur de la hiérarchie des composants. Cette fonctionnalité fonctionne en deux parties: le composant parent a une option `provide` pour fournir des données et le composant enfant a une option`inject` pour commencer à utiliser ces données.

![Provide/inject scheme](/images/components_provide.png)

Par exemple, si nous avons une hiérarchie comme celle-ci:

```
Root
└─ TodoList
   ├─ TodoItem
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

Si nous voulons passer la longueur des todo-items directement à `TodoListStatistics`, nous passerons la prop dans la hiérarchie: `TodoList` -> `TodoListFooter` -> `TodoListStatistics`. Avec l'approche provide/inject, nous pouvons le faire directement:

```js
const app = Vue.createApp({})

app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide: {
    user: 'John Doe'
  },
  template: `
    <div>
      {{ todos.length }}
      <!-- rest of the template -->
    </div>
  `
})

app.component('todo-list-statistics', {
  inject: ['user'],
  created() {
    console.log(`Injected property: ${this.user}`) // > Propriété injectée: John Doe
  }
})
```

Cependant, cela ne fonctionnera pas si nous essayons de fournir une propriété d'instance de composant ici:

```js
app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide: {
    todoLength: this.todos.length // cela entraînera l'erreur `Cannot read property 'length' of undefined`
  },
  template: `
    ...
  `
})
```

Pour accéder aux propriétés des instances de composants, nous devons convertir `provide` en une fonction renvoyant un objet

```js
app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide() {
    return {
      todoLength: this.todos.length
    }
  },
  template: `
    ...
  `
})
```

Cela nous permet de continuer à développer ce composant de manière plus sûre, sans craindre de changer/supprimer quelque chose sur lequel un composant enfant s'appuie. L'interface entre ces composants reste clairement définie, tout comme avec les props.

En fait, vous pouvez considérer l'injection de dépendances comme une sorte «de props à longue portée», excepté que:

- les composants parents n'ont pas besoin de savoir quels descendants utilisent les propriétés qu'ils fournissent
- les composants enfants n'ont pas besoin de savoir d'où proviennent les propriétés injectées

## Travailler avec la réactivité

Dans l'exemple ci-dessus, si nous modifions la liste de `todos`, ce changement ne sera pas reflété dans la propriété`todoLength` injectée. Ceci est dû au fait que les liaisons `provide/inject` ne sont _pas_ réactives par défaut. Nous pouvons changer ce comportement en passant une propriété `ref` ou un objet `reactive` à `provide`. Dans notre cas, si nous voulions réagir aux changements dans le composant ancêtre, nous aurions besoin d'attribuer une propriété `computed` du Composition API à notre `todoLength` fournie:

```js
app.component('todo-list', {
  // ...
  provide() {
    return {
      todoLength: Vue.computed(() => this.todos.length)
    }
  }
})

app.component('todo-list-statistics', {
  inject: ['todoLength'],
  created() {
    console.log(`Propriété injéctée: ${this.todoLength.value}`) // > Propriété injéctée: 5
  }
})
```

Dans ce cas, tout changement de `todos.length` sera correctement reflété dans les composants, où `todoLength` est injecté. En savoir plus sur `computed` dans la [section Computed et Watch](reactivity-computed-watchers.html#valeur-computed) et `reactive` provide/inject dans la [section du Composition API](composition-api-provide-inject.html#reactivite).
