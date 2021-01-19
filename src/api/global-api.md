---
sidebarDepth: 1
---

# Global API

## createApp

Retourne une instance d'application qui fournit un contexte d'application. L'ensemble de l'arborescence des composants montée par l'instance d'application partage le même contexte.

```js
const app = Vue.createApp({})
```

Vous pouvez enchaîner d'autres méthodes après `createApp`, elles peuvent être trouvées dans  [Application API](./application-api.html)

### Arguments

La fonction reçoit comme premier argument un objet avec les options du composant racine:

```js
const app = Vue.createApp({
  data() {
    return {
      ...
    }
  },
  methods: {...},
  computed: {...}
  ...
})
```

Avec le deuxième paramètre, nous pouvons passer des props à l'application:

```js
const app = Vue.createApp(
  {
    props: ['username']
  },
  { username: 'Evan' }
)
```

```html
<div id="app">
  <!-- Affichera 'Evan' -->
  {{ username }}
</div>
```

### Typing

```ts
interface Data {
  [key: string]: unknown
}

export type CreateAppFunction<HostElement> = (
  rootComponent: PublicAPIComponent,
  rootProps?: Data | null
) => App<HostElement>
```

## h

Renvoie un "nœud virtuel", généralement abrégé en **VNode**: un objet qui contient des informations décrivant à Vue quel type de nœud il doit afficher sur la page, y compris des descriptions de tous les nœuds enfants. Il est destiné aux [fonctions render](../guide/render-function.md) écrites manuellement:

```js
render() {
  return Vue.h('h1', {}, 'Some title')
}
```

### Arguments

Accepte trois arguments: `type`, `props` et `children`

#### type

- **Type:** `String | Object | Function`

- **Détails:**

  Une balise HTML, un composant ou un composant asynchrone. L'utilisation de la fonction retournant null rendrait un commentaire. Cet argument est obligatoire

#### props

- **Type:** `Object`

- **Details:**

  Un objet correspondant aux props, attributs et événements que nous utiliserions dans un modèle. Optionnel

#### children

- **Type:** `String | Array | Object`

- **Details:**

  Des VNodes enfants, construit en utilisant `h()`, ou en utilisant des chaînes de caractères pour avoir des "textes VNodes" ou un objet avec des slots. Optionnel

  ```js
  h('div', {}, [
    'Some text comes first.',
    h('h1', 'A headline'),
    h(MyComponent, {
      someProp: 'foobar'
    })
  ])
  ```

## defineComponent

En ce qui concerne l'implémentation, `defineComponent` ne fait rien d'autre que renvoyer l'objet qui lui est passé. Cependant, en termes de typage, la valeur renvoyée a un type synthétique de constructeur pour la fonction de rendu manuel, TSX et la prise en charge des outils des IDE.

### Arguments

Un objet avec les options du composant

```js
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  data() {
    return { count: 1 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
```

Ou une fonction `setup`, le nom de la fonction sera utilisé comme le nom du composant

```js
import { defineComponent, ref } from 'vue'

const HelloWorld = defineComponent(function HelloWorld() {
  const count = ref(0)
  return { count }
})
```

## defineAsyncComponent

Crée un composant asynchrone qui sera chargé uniquement lorsque cela est nécessaire.

### Arguments

Pour une utilisation basique, `defineAsyncComponent` peut accepter une "factory function" qui retourne une `Promise`. Le callback du `resolve` de la Promise doit être appelé lorsque vous avez récupéré la définition de votre composant sur le serveur. Vous pouvez également appeler `reject(raison)` pour indiquer que la chargement a échoué.

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)
```

Lorsque vous utilisez [enregistrement local](../guide/component-registration.html#local-registration), vous pouvez également fournir directement une fonction qui renvoie une `Promise`:

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
```

Pour une utilisation avancée, `defineAsyncComponent` peut accepter un objet:

La méthode `defineAsyncComponent` peut également renvoyer un objet au format suivant:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent({
  // La factory function
  loader: () => import('./Foo.vue')
  // Un composant à utiliser pendant le chargement du composant asynchrone
  loadingComponent: LoadingComponent,
  // Un composant à utiliser si le chargement échoue
  errorComponent: ErrorComponent,
  // Délai avant d'afficher le composant de chargement. Par défaut: 200 ms.
  delay: 200,
  // Le composant d'erreur sera affiché si un timeout est
  // fourni et dépassé. Par défaut: Infinity.
  timeout: 3000,
  // Définir si le composant est suspensible. Par défaut: vrai.
  suspensible: false,
  /**
   *
   * @param {*} error Objet de message d'erreur
   * @param {*} retry Une fonction qui indique si le composant asynchrone doit réessayer lorsque la promesse du loader est rejetée
   * @param {*} fail Fin de l'échec
   * @param {*} attempts Nombre max de tentatives autorisées
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // réessayer en cas d'erreurs de récupération, 
      // 3 tentatives max
      retry()
    } else {
      // Notez que retry/fail sont comme resolve/reject d'une promesse:
      // l'un d'eux doit être appelé pour que la gestion des erreurs se poursuive.
      fail()
    }
  },
})
```

**Voir aussi**: [Dynamic and Async components](../guide/component-dynamic-async.html)

## resolveComponent

:::warning
`resolveComponent` ne peut être utilisé que dans les fonctions `render` ou` setup`.
:::

Permet de résoudre un `composant` par son nom, s'il est disponible dans l'instance d'application courante.

Renvoie un `Composant`ou `undefined` lorsqu'il est introuvable.

```js
const app = Vue.createApp({})
app.component('MyComponent', {
  /* ... */
})
```

```js
import { resolveComponent } from 'vue'
render() {
  const MyComponent = resolveComponent('MyComponent')
}
```

### Arguments

Accepte un argument: `name`

#### name

- **Type:** `String`

- **Details:**

  Le nom du composant chargé.

## resolveDynamicComponent

:::warning
`resolveDynamicComponent` ne peut être utilisé que dans les fonctions `render` ou` setup`
:::

Permet de résoudre un `composant` par le même mécanisme que `<component: is="">` utilise.

Retourne le `composant` résolu ou un` VNode` nouvellement créé avec le nom du composant comme balise de nœud. Déclenche un avertissement si le `composant` n'a pas été trouvé.

```js
import { resolveDynamicComponent } from 'vue'
render () {
  const MyComponent = resolveDynamicComponent('MyComponent')
}
```

### Arguments

Accepte un argument: `component`

#### component

- **Type:** `String | Object (objet d'options du composant)`

- **Détails:**

  Pour plus de détails, reportez-vous à la documentation sur [Dynamic Components](../guide/component-dynamic-async.html).

## resolveDirective

:::warning
`resolveDirective` ne peut être utilisé que dans les fonctions `render` ou `setup`
:::

Permet de résoudre une `directive` par son nom, si elle est disponible dans l'instance d'application actuelle.

Retourne une `Directive` ou `undefined` si introuvable.

```js
const app = Vue.createApp({})
app.directive('highlight', {})
```

```js
import { resolveDirective } from 'vue'
render () {
  const highlightDirective = resolveDirective('highlight')
}
```

### Arguments

Accepte un argument: `name`

#### name

- **Type:** `String`

- **Détails:**

  Le nom de la directive chargée.

## withDirectives

:::warning
`withDirectives` ne peut être utilisé que dans les fonctions `render` ou `setup`
:::

Permet d'appliquer des directives à un **VNode**. Retourne un VNode avec les directives appliquées.

```js
import { withDirectives, resolveDirective } from 'vue'
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h('div'), [
  [foo, this.x],
  [bar, this.y]
])
```

### Arguments

Accepte deux arguments: `vnode` et `directives`.

#### vnode

- **Type:** `vnode`

- **Détails:**

  Un nœud virtuel, généralement créé avec `h()`.

#### directives

- **Type:** `Array`

- **Details:**

  Un tableau de directives.

  Chacune des directives est un tableau, ce qui permet de définir jusqu'à 4 index comme indiqué dans les exemples suivants.

  - `[directive]` - La directive en elle-même. Obligatoire.

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [[MyDirective]])
  ```

  - `[directive, value]` - Ce qui précède, plus une valeur de type `any` à affecter à la directive

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [[MyDirective, 100]])
  ```

  - `[directive, value, arg]` -  Ce qui précède, plus un argument de type `String`, par exemple `click` dans `v-on:click`

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [
    [MyDirective, 100, 'click']
  ])
  ```

  - `[directive, value, arg, modifiers]` - Ce qui précède, plus un objet pair `key: value` de type `Object` définissant tous les modificateurs.

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [
    [MyDirective, 100, 'click', { prevent: true }]
  ])
  ```

## createRenderer

La fonction createRenderer accepte deux arguments génériques:
`HostNode` et `HostElement`, correspondant aux types de nœud et d'élément dans l'environnement hôte.

Par exemple, pour le runtime-dom, HostNode serait l'interface `Node` du DOM  et HostElement seraient l'interface `Element` du DOM.

Les fonctions de rendu personnalisées peuvent transmettre des types spécifiques à la plate-forme comme celle-ci:

```ts
import { createRenderer } from 'vue'
const { render, createApp } = createRenderer<Node, Element>({
  patchProp,
  ...nodeOps
})
```

### Arguments

Accepte deux arguments: `HostNode` et `HostElement`

#### HostNode

- **Type:** `Node`

- **Détails:**

  Le nœud dans l'environnement hôte.

#### HostElement

- **Type:** `Element`

- **Détails:**

  L'élément dans l'environnement hôte

## nextTick

Reporter le callback à exécuter après le prochain cycle de mise à jour du DOM. Utilisez-le immédiatement après avoir modifié certaines données pour attendre la mise à jour du DOM.

```js
import { createApp, nextTick } from 'vue'

const app = createApp({
  setup() {
    const message = ref('Hello!')
    const changeMessage = async newMessage => {
      message.value = newMessage
      await nextTick()
      console.log('Le DOM est mis à jour maintenant!')
    }
  }
})
```

**Voir aussi**: [`$nextTick` instance method](instance-methods.html#nexttick)
