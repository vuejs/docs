# Enregistrement des composants

> Cette page suppose que vous avez déjà lu les [Principes de base des composants](component-basics.md). Lisez-le d'abord si vous n'êtes pas familier avec les composants.

## Noms des composants

Lors de l'enregistrement d'un composant, il recevra toujours un nom. Par exemple, dans l'enregistrement global que nous avons vu jusqu'à présent:

```js
const app = Vue.createApp({...})

app.component('my-component-name', {
  /* ... */
})
```

Le nom du composant est le premier argument de `app.component`. Dans l'exemple ci-dessus, le nom du composant est "my-component-name".

Le nom que vous donnez à un composant peut dépendre de l'endroit où vous avez l'intention de l'utiliser. Lors de l'utilisation d'un composant directement dans le DOM (par opposition à un string template ou un [composant à fichier unique](../guide/single-file-component.html)), nous vous recommandons vivement de suivre les [règles du W3C](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) pour les noms de balises personnalisées:

1. Tout en minuscules
2. Contient un trait d'union (c'est-à-dire, connectés plusieurs mots avec le symbole du trait d'union)

Ce faisant, cela vous aidera à éviter les conflits avec les éléments HTML actuels et futurs.

Vous pouvez voir d’autres recommandations pour les noms de composants dans le [Guide de style](../style-guide/#base-component-names-strongly-recommended).

### Casse des noms

Lors de la définition de composants dans un string template un composant à fichier unique, vous avez deux options lors de la définition des noms de composant:

#### Avec kebab-case

```js
app.component('my-component-name', {
  /* ... */
})
```

Lors de la définition d'un composant avec kebab-case, vous devez également utiliser kebab-case lors du référencement de son élément personnalisé, comme dans `<my-component-name>`.

#### Avec PascalCase

```js
app.component('MyComponentName', {
  /* ... */
})
```

Lors de la définition d'un composant avec PascalCase, vous pouvez utiliser les deux cas lors du référencement de son élément personnalisé. Cela signifie que `<my-component-name>` et `<MyComponentName>` sont acceptables. Notez, cependant, que seuls les noms de kebab-case sont valides directement dans le DOM (c-à-d, pas dans les string templates).

## Enregistrement global

Jusqu'à présent, nous avons uniquement créé des composants en utilisant `app.component`:

```js
Vue.createApp({...}).component('my-component-name', {
  // ... options ...
})
```

Ces composants sont **enregistrés globalement** pour l'application. Cela signifie qu'ils peuvent être utilisés dans le template de n'importe quelle instance de composant dans cette application:

```js
const app = Vue.createApp({})

app.component('component-a', {
  /* ... */
})
app.component('component-b', {
  /* ... */
})
app.component('component-c', {
  /* ... */
})

app.mount('#app')
```

```html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```

Cela s'applique même à tous les sous-composants, ce qui signifie que tous les trois composants seront également disponibles _les uns dans les autres_.

## Enregistrement local

L'enregistrement global n'est souvent pas idéal. Par exemple, si vous utilisez un système de build comme Webpack, l'enregistrement global de tous les composants signifie que même si vous arrêtez d'utiliser un composant, il peut toujours être inclus dans votre version finale. Cela augmente inutilement la quantité de JavaScript que vos utilisateurs doivent télécharger.

Dans ces cas, vous pouvez définir vos composants comme des objets JavaScript simples:

```js
const ComponentA = {
  /* ... */
}
const ComponentB = {
  /* ... */
}
const ComponentC = {
  /* ... */
}
```

Définissez ensuite les composants que vous souhaitez utiliser dans une option `components`:

```js
const app = Vue.createApp({
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

Pour chaque propriété de l'objet `components`, la clé sera le nom de l'élément personnalisé, tandis que la valeur contiendra l'objet d'options pour le composant.

Notez que ** les composants enregistrés localement ne sont _pas_ également disponibles dans les sous-composants **. Par exemple, si vous vouliez que `ComponentA` soit disponible dans `ComponentB`, vous devrez utiliser:

```js
const ComponentA = {
  /* ... */
}

const ComponentB = {
  components: {
    'component-a': ComponentA
  }
  // ...
}
```

Ou si vous utilisez des modules ES2015, tels que Babel et Webpack, cela pourrait ressembler davantage à:

```js
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
  // ...
}
```

Notez que dans ES2015 +, placer un nom de variable comme `ComponentA` à l'intérieur d'un objet est un raccourci pour`ComponentA: ComponentA`, ce qui signifie que le nom de la variable est à la fois:

- le nom de l'élément personnalisé à utiliser dans le template, et
- le nom de la variable contenant les options du composant

## Systèmes de modules

Si vous n'utilisez pas un système de modules avec `import`/`require`, vous pouvez probablement sauter cette section pour le moment. Si tel est le cas, nous avons des instructions et des conseils spéciaux pour vous.

### Enregistrement local dans un système de modules

Si vous êtes toujours là, il est probable que vous utilisiez un système de modules, comme avec Babel et Webpack. Dans ces cas, nous vous recommandons de créer un répertoire `components`, avec chaque composant dans son propre fichier.

Ensuite, vous devrez importer chaque composant que vous souhaitez utiliser, avant de l'enregistrer localement. Par exemple, dans un fichier hypothétique `ComponentB.js` ou`ComponentB.vue`:

```js
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  }
  // ...
}
```

Maintenant, à la fois `ComponentA` et `ComponentC` peuvent être utilisés dans le template de `ComponentB`
