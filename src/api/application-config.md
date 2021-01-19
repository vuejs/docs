# Application Config

Chaque application Vue expose un objet `config` qui contient les paramètres de configuration de cette application:

```js
const app = Vue.createApp({})

console.log(app.config)
```

Vous pouvez modifier ses propriétés, répertoriées ci-dessous, avant de monter votre application.

## errorHandler

- **Type:** `Function`

- **Default:** `undefined`

- **Usage:**

```js
app.config.errorHandler = (err, vm, info) => {
  // Traitement des erreurs
  // `info` contient les informations sur les erreurs spécifiques à Vue, 
  // par ex dans quel lifecycle hook l'erreur a été trouvée
}
```

Attribuez un handler pour les erreurs non captées durant le rendu des composants par les fonctions et les "watchers". Le handler est appelé avec l'erreur et l'instance de l'application.

> Service de traque des erreurs [Sentry](https://sentry.io/for/vue/) et [Bugsnag](https://docs.bugsnag.com/platforms/browsers/vue/) fournissent des intégrations officielles en utilisant cette option.

## warnHandler

- **Type:** `Function`

- **Default:** `undefined`

- **Usage:**

```js
app.config.warnHandler = function(msg, vm, trace) {
  // `trace` est la trace de la hierarchie du composant
}
```

Attribuer un gestionnaire personnalisé pour les avertissements durant l'exécution de Vue. Notez que cela ne fonctionne que pendant le développement et est ignoré en production.

## globalProperties

- **Type:** `[key: string]: any`

- **Default:** `undefined`

- **Usage:**

```js
app.config.globalProperties.foo = 'bar'

app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})
```

Ajoute une propriété globale accessible dans n'importe quelle instance de composant à l'intérieur de l'application. La propriété du composant sera prioritaire en cas de conflit de clés.

Ceci peut remplacer `Vue.prototype` de Vue 2.x  étendant:

```js
// Avant
Vue.prototype.$http = () => {}

// Après
const app = Vue.createApp({})
app.config.globalProperties.$http = () => {}
```

## isCustomElement

- **Type:** `(tag: string) => boolean`

- **Default:** `undefined`

- **Usage:**

```js
// tout élément commençant par 'ion-' sera reconnu comme un custom élément
app.config.isCustomElement = tag => tag.startsWith('ion-')
```
Spécifie une méthode pour reconnaître les custom éléments définis en dehors de Vue (par exemple, à l'aide des API des composants Web). Si le composant remplit cette condition, il n'aura pas besoin d'un enregistrement local ou global et Vue ne lancera pas d'avertissement du type `Unknown custom element`.

> Notez que toutes les balises HTML et SVG natives n'ont pas besoin d'être définies dans cette fonction - Le parser de Vue effectue cette vérification automatiquement.


::: tip Important
Cette option de configuration n'est respectée que lors de l'utilisation du compilateur d'exécution. Si vous utilisez la version exécutable uniquement, `isCustomElement` doit être passé à` @vue/compiler-dom` dans la configuration de build - par exemple, via l'option [`compilerOptions` dans vue-loader](https://vue-loader.vuejs.org/options.html#compileroptions).
:::

## optionMergeStrategies

- **Type:** `{ [key: string]: Function }`

- **Default:** `{}`

- **Usage:**

```js
const app = Vue.createApp({
  mounted() {
    console.log(this.$options.hello)
  }
})

app.config.optionMergeStrategies.hello = (parent, child, vm) => {
  return `Hello, ${child}`
}

app.mixin({
  hello: 'Vue'
})

// 'Hello, Vue'
```

Définir des stratégies de fusion pour les options personnalisées.

La stratégie de fusion reçoit la valeur de cette option définie sur les instances parent et enfant comme premier et deuxième arguments, respectivement. Le contexte de l'instance de l'application est transmise comme troisième argument.


- **Voir aussi:** [Custom Option Merging Strategies](../guide/mixins.html#custom-option-merge-strategies)

## performance

- **Type:** `boolean`

- **Default:** `false`

- **Usage**:

Definir à `true` pour activer le traçage des performances d'initialisation, de compilation, de rendu et de patch des composants dans le panneau performance/timeline du devtool du navigateur. Fonctionne uniquement en mode développement et dans les navigateurs prenant en charge l'API [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark).
