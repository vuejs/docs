# Application API

Dans Vue 3, les API qui modifient globalement le comportement de Vue sont maintenant déplacées vers des instances d'application créées par la nouvelle méthode `createApp`. De plus, leurs effets sont désormais limités (scoped) à l'instance de cette application spécifique:

```js
import { createApp } from 'vue'

const app = createApp({})
```

La methode `createApp` rétourne une instance d'application. Cette instance fournit un contexte d'application. L'ensemble de l'arborescence des composants montée par l'instance d'application partage le même contexte, qui fournit les configurations qui étaient auparavant "globales" dans Vue 2.x.


De plus, puisque la méthode `createApp` renvoie l'instance d'application elle-même, vous pouvez enchaîner d'autres méthodes après elle, qui peuvent être trouvées dans les sections suivantes.
## component

- **Arguments:**

  - `{string} name`
  - `{Function | Object} definition (optionelle)`

- **Retourne:**

  - L'instance de l'application si un argument `definition` a été passé
  - La définition du composant si un argument `definition` n'a pas été passé

- **Usage:**

  Enregistrez ou récupérez un composant global. L'enregistrement définit également automatiquement le `nom` du composant avec le paramètre`name` donné.

- **Example:**

```js
import { createApp } from 'vue'

const app = createApp({})

// enregistrer un objet d'options
app.component('my-component', {
  /* ... */
})

// récupérer un composant enregistré
const MyComponent = app.component('my-component')
```

- **Voir aussi:** [Components](../guide/component-basics.html)

## config

- **Usage:**

Un objet contenant les configurations d'application.

- **Exemple:**

```js
import { createApp } from 'vue'
const app = createApp({})

app.config = {...}
```

- **Voir aussi:** [Application Config](./application-config.html)

## directive

- **Arguments:**

  - `{string} name`
  - `{Function | Object} definition (optionelle)`

- **Retourne:**

  - L'instance d'application si un argument `definition` a été passé
  - La définition de la directive si un argument `definition` n'a pas été passé

- **Usage:**

Enregistrer ou récupérer une directive globale.

- **Exemple:**

```js
import { createApp } from 'vue'
const app = createApp({})

// enregistrer
app.directive('my-directive', {
  // Une directive a un ensemble de lifecycle hooks:
  // appelé avant que les attributs de l'élément lié ou les écouteurs d'événements 
  // ne soient appliqués
  created() {},
  // appelé avant que le composant parent de l'élément lié ne soit monté
  beforeMount() {},
  // appelé lorsque le composant parent de l'élément lié est monté
  mounted() {},
  // appelé avant que le VNode du composant conteneur ne soit mis à jour
  beforeUpdate() {},
  // appelé après que le VNode du composant conteneur et les VNodes de ses enfants 
  // aient été mis à jour
  updated() {},
  // appelé avant que le composant parent de l'élément lié ne soit démonté
  beforeUnmount() {},
  // appelé lorsque le composant parent de l'élément lié est démonté
  unmounted() {}
})

// enregistrer (function directive)
app.directive('my-directive', () => {
  // ceci sera appelé comme «mounted» et «updated»
})

// getter, retourne la définition de la directive si elle a donnée
const myDirective = app.directive('my-directive')
```

Les hooks de directive reçoivent ces arguments:

#### el

L'élément auquel la directive est liée. Cela peut être utilisé pour manipuler directement le DOM.

#### binding

Un objet contenant les propriétés suivantes.

- `instance`: L'instance du composant où la directive est utilisée.
- `value`: La valeur transmise à la directive. Par exemple dans `v-my-directive="1 + 1"`, la valeur sera `2`.
- `oldValue`: La valeur précédente, disponible uniquement dans `beforeUpdate` et `updated`. Elle est disponible que la valeur ait changé ou non.
- `arg`: L'argument transmis à la directive, si fourni. Par exemple dans `v-my-directive:foo`, arg vaudra `"foo"`.
- `modifiers`: Un objet contenant des modificateurs, si fourni. Par exemple dans `v-my-directive.foo.bar`, l'objet de modifiers serait `{ foo: true, bar: true }`.
- `dir`: L'objet passé en paramètre lors de l'enregistrement de la directive. Par exemple, dans la directive

```js
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

`dir` sera l'objet suivant:

```js
{
  mounted(el) {
    el.focus()
  }
}
```

#### vnode

Un plan de l'élément réel du DOM  reçu comme argument el ci-dessus.

#### prevNode

Le nœud virtuel précédent, disponible uniquement dans les hooks `beforeUpdate` et` updated`.

:::tip Note
En dehors de `el`, vous devez traiter ces arguments en lecture seule et ne jamais les modifier. Si vous avez besoin de partager des informations entre les hooks, il est recommandé de le faire via l'élément [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
:::

- **Voir aussi:** [Custom Directives](../guide/custom-directive.html)

## mixin

- **Arguments:**

  - `{Object} mixin`

- **Retourne:**

  - L'instance de l'application

- **Usage:**

  Appliquez un mixin dans tout le scope de l'application. Une fois enregistré, il peut être utilisé dans le tempate de n'importe quel composant de l'application. Cela peut être utilisé par les auteurs de plugins pour injecter un comportement personnalisé dans les composants. **Non recommandé dans le code de l'application**.

- **Voir aussi:** [Global Mixin](../guide/mixins.html#global-mixin)

## mount

- **Arguments:**

  - `{Element | string} rootContainer`
  - `{boolean} isHydrate (optionelle)`

- **Retourne:**

  - La racine de l'instance du composant

- **Usage:**

  Monte un composant racine de l'instance de l'application sur l'élément du DOM fourni.

- **Exemple:**

```html
<body>
  <div id="my-app"></div>
</body>
```

```js
import { createApp } from 'vue'

const app = createApp({})
// fais quelques preparatifs necessaires
app.mount('#my-app')
```

- **Voir aussi:**
  - [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## provide

- **Arguments:**

  - `{string | Symbol} key`
  - `value`

- **Retourne:**

  - L'instance de l'application

- **Usage:**
  
  Définit une valeur qui peut être injectée dans tous les composants de l'application. Les composants doivent utiliser `inject` pour recevoir les valeurs fournies.

  Du point de vue `provide`/`inject`, l'application peut être considérée comme l'ancêtre au niveau de la racine, avec le composant racine comme seul enfant.

  Cette methode ne doit pâs être confondue avec [provide component option](options-composition.html#provide-inject) ou [provide function](composition-api.html#provide-inject) dans le composition API. Bien que ceux-ci fassent également partie du même mécanisme `provide`/`inject`,  ils sont utilisés pour configurer les valeurs fournies par un composant plutôt que par une application.

  Fournir des valeurs via l'application est particulièrement utile lors de l'écriture de plugins, car les plugins ne seraient généralement pas en mesure de fournir des valeurs à l'aide de composants. C'est une alternative à l'utilisation de [globalProperties](application-config.html#globalproperties).

  :::tip Note
  Les liaisons `provide` et `inject` ne sont PAS réactives. C'est intentionnel. Cependant, si vous transmettez un objet observé, les propriétés de cet objet restent réactives.
  :::

- **Exemple:**

  Injecter une propriété dans le composant racine, avec une valeur fournie par l'application:

```js
import { createApp } from 'vue'

const app = createApp({
  inject: ['user'],
  template: `
    <div>
      {{ user }}
    </div>
  `
})

app.provide('user', 'administrator')
```

- **Voir aussi:**
  - [Provide / Inject](../guide/component-provide-inject.md)

## unmount

- **Usage:**

  Démonte un composant racine de l'instance d'application.

- **Exemple:**

```html
<body>
  <div id="my-app"></div>
</body>
```

```js
import { createApp } from 'vue'

const app = createApp({})
// faire les préparatifs nécessaires
app.mount('#my-app')

//L'application sera démontée 5 secondes après être montée
setTimeout(() => app.unmount(), 5000)
```

## use

- **Arguments:**

  - `{Object | Function} plugin`
  - `...options (optional)`

- **Retourne:**

  - L'instance de l'application

- **Usage:**

  Installe un plugin Vue.js. Si le plugin est un objet, il doit exposer une méthode `install`. S'il s'agit d'une fonction, celle -ci sera traitée comme la méthode install.

  Lorsque cette méthode est appelée plusieurs fois sur le même plugin, le plugin ne sera installé qu'une seule fois.

- **Exemple:**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({})

  app.use(MyPlugin)
  app.mount('#app')
  ```

- **Voir aussi:** [Plugins](../guide/plugins.html)
