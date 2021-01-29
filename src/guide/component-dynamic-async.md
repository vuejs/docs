# Composants dynamiques et asynchrones

> Cette page suppose que vous avez déjà lu les [Principes de base des composants](component-basics.md). Lisez-le d'abord si vous n'êtes pas familier avec les composants.

## Composants dynamiques avec `keep-alive`

Auparavant, nous avons utilisé l'attribut `is` pour basculer entre les composants dans une interface à onglets:

```vue-html
<component :is="currentTabComponent"></component>
```

Cependant, lors du basculement entre ces composants, vous voudrez parfois conserver leur état ou éviter le re-rendu pour des raisons de performances. Par exemple, lorsqu'on développe un peu notre interface à onglets:

<common-codepen-snippet title="Dynamic components: without keep-alive" slug="jOPjZOe" tab="html,result" :preview="false" />

Vous remarquerez que si vous sélectionnez un message, passez à l'onglet _Archive_, puis revenez à _Posts_, il n'affiche plus le message que vous avez sélectionné. C'est parce que chaque fois que vous passez à un nouvel onglet, Vue crée une nouvelle instance de `currentTabComponent`.

Recréer des composants dynamiques est normalement un comportement utile, mais dans ce cas, nous aimerions vraiment que ces instances de composant d'onglet soient mises en cache une fois qu'elles sont créées pour la première fois. Pour résoudre ce problème, nous pouvons envelopper notre composant dynamique avec un élément `<keep-alive>`:

```vue-html
<!-- Les composants inactifs seront mis en cache! -->
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

Découvrez le résultat ci-dessous:

<common-codepen-snippet title="Dynamic components: with keep-alive" slug="VwLJQvP" tab="html,result" :preview="false" />

Maintenant, l'onglet _Posts_ conserve son état (le post sélectionné) même s'il n'est pas affiché.

Consultez plus de détails sur `<keep-alive>` dans la [Référence API](../api/built-in-components.html#keep-alive).

## Composants asynchrones

Dans les très larges applications, nous pouvons avoir besoin de diviser l'application en petits morceaux et de ne charger un composant du serveur que lorsque cela est nécessaire. Pour rendre cela possible, Vue a une méthode `defineAsyncComponent`:

```js
const { createApp, defineAsyncComponent } = Vue

const app = createApp({})

const AsyncComp = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: '<div>I am async!</div>'
      })
    })
)

app.component('async-example', AsyncComp)
```

Comme vous pouvez le voir, cette méthode accepte une factory function retournant une `Promise`. Le callback `resolve` de la Promise doit être appelé lorsque vous avez récupéré la définition de votre composant sur le serveur. Vous pouvez également appeler `reject(reason)` pour indiquer que la charge a échoué.

Vous pouvez également renvoyer une `Promise` dans la factory function, donc avec Webpack 2 ou version ultérieure et la syntaxe ES2015, vous pouvez faire:

````js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)```

Vous pouvez également utiliser `defineAsyncComponent` lors de [l'enregistrement d'un composant local](component-registration.html#local-registration):

```js
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
````

### Usage avec Suspense

Les composants asynchrones sont _suspensibles_ par défaut. Cela signifie que s'il a un `<Suspense>` dans la chaîne parente, il sera traité comme une dépendance asynchrone de ce `<Suspense>`. Dans ce cas, l'état de chargement sera contrôlé par le `<Suspense>` , et les options de chargement, d'erreur, de retard et de délai d'expiration du composant seront ignorées.

Le composant async peut désactiver le contrôle par `Suspense` et laisser le composant contrôler toujours son propre état de chargement en spécifiant `suspensible: false` dans ses options.

Vous pouvez consulter la liste des options disponibles dans la [Référence API](../api/global-api.html#arguments-4)
