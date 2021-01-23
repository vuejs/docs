# Application & Instances de Composant

## Créer une Instance d'Application

Chaque application Vue commence par créer ue nouvelle **instance d'application** avec la fonction `createApp` :

```js
const app = Vue.createApp({
  /* options */
})
```

L'instance d'application est utilisée pour enregistrer des « globaux » qui peuvent ensuite être utilisés par les composants de cette application. Nous en discuterons en détail plus tard dans le guide, mais à titre d'exemple rapide:

```js
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```

La plupart des méthodes exposées par l'instance d'application retournent cette même instance, permettant donc le chaînage:

```js
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
```


Vous pouvez parcourir l'API complète de l'_application API_ dans la [reference API](../api/application-api.html).

## Le Composant Racine

Les options passées à `createApp` sont utilisées pour configurer le **composant racine**. Ce composant est utilisé comme point de départ pour effecteuer le rendu lorsque nous **montons** l'application.

Une application doit être montée dans un élément du DOM. Par exemple, si nous voulons monter une application Vue dans `<div id="app"> </div>`, nous devons passer `#app`:

```js
const RootComponent = {
  /* options */
}
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```

Contrairement à la plupart des méthodes d'application, `mount` ne renvoie pas l'application. Au lieu de cela, il renvoie l'instance du composant racine.

Bien que n'étant pas strictement associé au [pattern MVVM](https://en.wikipedia.org/wiki/Model_View_ViewModel), la conception de Vue s'en est en partie inspirée. Par convention, nous utilisons souvent la variable `vm` (abréviation de ViewModel) pour faire référence à une instance de composant.

Bien que tous les exemples de cette page ne nécessitent qu'un seul composant, la plupart des applications réelles sont organisées dans une arborescence de composants imbriqués et réutilisables. Par exemple, l'arborescence des composants d'une application Todo pourrait ressembler à ceci:

```
Root Component
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

Chaque composant aura sa propre instance de composant, `vm`. Pour certains composants, tels que `TodoItem`, il y aura probablement plusieurs instances rendues à la fois. Toutes les instances de composant de cette application partageront la même instance d'application.


Nous parlerons plus en détail du [système de composants](component-basics.html). Pour l'instant, sachez que le composant racine n'est pas vraiment différent des autres composants. Les options de configuration sont les mêmes, tout comme le comportement de l'instance de composant correspondante.

## Propriétés d'Instance de Composant

Plus tôt dans le guide, nous avons rencontré les propriétés de `data`. Les propriétés définies dans `data` sont exposées via l'instance de composant:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4
```

Il existe diverses autres options de composant qui ajoutent des propriétés définies par l'utilisateur à l'instance de composant, telles que `methods`, `props`, `computed`, `inject` et `setup`. Nous aborderons chacun de ces éléments en profondeur plus tard dans le guide. Toutes les propriétés de l'instance de composant, quelle que soit la manière dont elles sont définies, seront accessibles dans le template du composant.

Vue expose également certaines propriétés intégrées via l'instance de composant, telles que `$attrs` et `$emit`. Ces propriétés ont toutes un préfixe `$` pour éviter tout conflit avec les noms de propriétés définis par l'utilisateur.

## Lifecycle Hooks (Ancres du cycle de vie)

Chaque instance de vue traverse une série d’étapes d’initialisation au moment de sa création - par exemple, elle doit mettre en place l’observation des données, compiler le template, monter l’instance sur le DOM et mettre à jour le DOM quand les données changent. En cours de route, elle va aussi invoquer des "ancres de cycle de vie" ou en anglais **lifecycle hooks**, donnant aux developpeurs la possibilité d'ajouter leur propre code à des étapes spécifiques.

Par exemple  le hook [created](../api/options-lifecycle-hooks.html#created) peut être utilisé pour exécuter du code après la création d'une instance:

```js
Vue.createApp({
  data() {
    return { count: 1 }
  },
  created() {
    // `this` pointe vers l'instance vm
    console.log('count vaut: ' + this.count) // => "count vaut: 1"
  }
})
```

Il existe également d'autres hooks qui seront appelés à différentes étapes du cycle de vie de l'instance, tels que [mounted](../api/options-lifecycle-hooks.html#mounted), [updated](../api/options-lifecycle-hooks.html#updated), et [unmounted](../api/options-lifecycle-hooks.html#unmounted). Tous les hooks de cycle de vie sont appelés avec leur contexte `this` pointant vers l'instance active courante qui l'invoque.

::: tip
N'utilisez pas les [fonctions fléchées](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) sur une propriété d'options ou un callback, tels que `created: () => console.log(this.a)` ou `vm.$watch('a', newValue => this.myMethod())`. Puisqu'une fonction fléchée n'a pas de `this`, `this` sera donc traité comme n'importe quelle autre variable et sera recherché lexicalement dans la scope du parent jusqu'à ce qu'il soit trouvé, Ce qui conduit souvent à des erreurs comme `Uncaught TypeError: Cannot read property of undefined` ou `Uncaught TypeError: this.myMethod is not a function`.
:::

## Diagramme de Cycle de vie

Vous trouverez ci-dessous un diagramme du cycle de vie de l'instance. Vous n'avez pas besoin de bien comprendre tout ce qui se passe actuellement, mais au fur et à mesure que vous apprenez et construisez plus, ce sera une référence utile.

<img src="/images/lifecycle.svg" width="840" height="auto" style="margin: 0px auto; display: block; max-width: 100%;" loading="lazy" alt="Instance lifecycle hooks">
