# Plugins

Les plugins sont du code autonome qui ajoute généralement des fonctionnalités de niveau global à Vue. C'est soit un `objet` qui expose une méthode `install()`, soit une `fonction`.

Il n'y a pas de scope strictement définie pour un plugin, mais les scénarios courants où les plugins sont utiles incluent:

1. Ajoutez des méthodes ou propriétés globales, par exemple [vue-custom-element](https://github.com/karol-f/vue-custom-element).

2. Ajoutez un ou plusieurs assets globaux: directives/filtres/transitions etc. (par exemple [vue-touch](https://github.com/vuejs/vue-touch)).

3. Ajoutez quelques options de composant par mixin global (par exemple [vue-router](https://github.com/vuejs/vue-router)).

4. Ajoutez quelques méthodes d'instance globale en les attachant à `config.globalProperties`.

5. Une bibliothèque qui fournit sa propre API, tout en injectant une combinaison des éléments ci-dessus (par exemple [vue-router](https://github.com/vuejs/vue-router)).

## Écrire un Plugin

Afin de mieux comprendre comment créer vos propres plugins Vue.js, nous allons créer une version très simplifiée d'un plugin qui affiche les chaînes de caractères prêtes pour `i18n`.

Chaque fois que ce plugin est ajouté à une application, la méthode `install` sera appelée s'il s'agit d'un objet. S'il s'agit d'une `fonction`, la fonction elle-même sera appelée. Dans les deux cas, il recevra deux paramètres - l'objet `app` résultant de `createApp` de Vue, et les options forunies par l'utilisateur.

Commençons par configurer l'objet plugin. Il est recommandé de le créer dans un fichier séparé et de l'exporter, comme indiqué ci-dessous pour conserver la logique contenue et séparée.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    //  le code du plugin va ici
  }
}
```

Nous voulons créer une fonction de traduction des clés disponible pour toute l'application, nous allons donc l'exposer en utilisant `app.config.globalProperties`.

Cette fonction recevra une chaîne de caractère `key`, que nous utiliserons pour rechercher la chaîne de caractère traduite dans les options fournies par l'utilisateur.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

Nous supposerons que nos utilisateurs passeront un objet contenant les clés traduites dans le paramètre `options` lorsqu'ils utiliseront le plugin. Notre fonction `$translate` prendra une chaîne de caractère telle que `greetings.hello`, regardera à l'intérieur de la configuration fournie par l'utilisateur et retournera la valeur traduite - dans ce cas, `Bonjour!`

Ex:

```js
greetings: {
  hello: 'Bonjour!',
}
```

Les plugins nous permettent également d'utiliser `inject` pour fournir une fonction ou un attribut aux utilisateurs du plugin. Par exemple, nous pouvons permettre à l'application d'avoir accès au paramètre `options` pour pouvoir utiliser l'objet de traductions.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    app.provide('i18n', options)
  }
}
```

Les utilisateurs de plugins pourront désormais écrire `inject['i18n']` dans leurs composants et accéder à l'objet.

De plus, puisque nous avons accès à l'objet `app`, toutes les autres fonctionnalités comme l'utilisation de `mixin` et de `directive` sont disponibles pour le plugin. Pour en savoir plus sur `createApp` et l'instance d'application, consultez la [Documentation de l'API de l'application](/api/application-api.html).

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.')
        .reduce((o, i) => { if (o) return o[i] }, options)
    }

    app.provide('i18n', options)

    app.directive('my-directive', {
      mounted (el, binding, vnode, oldVnode) {
        // quelque logique ...
      }
      ...
    })

    app.mixin({
      created() {
        // quelque logique ...
      }
      ...
    })
  }
}
```

## Utiliser un Plugin

Une fois qu'une application Vue a été initialisée avec `createApp()`, vous pouvez ajouter un plugin à votre application en appelant la méthode `use()`.

Nous utiliserons le `i18nPlugin` que nous avons créé dans la section [Écrire un Plugin](#ecrire-un-plugin) à des fins de démonstration.

La méthode `use ()` prend deux paramètres. Le premier est le plugin à installer, dans ce cas `i18nPlugin`.

Il vous empêche également automatiquement d'utiliser le même plugin plus d'une fois, donc l'appeler plusieurs fois sur le même plugin installera le plugin une seule fois.

Le deuxième paramètre est facultatif et dépend de chaque plugin. Dans le cas de la démo `i18nPlugin`, c'est un objet avec les chaînes traduites.

:::info
Si vous utilisez des plugins tiers tels que `Vuex` ou`Vue Router`, consultez toujours la documentation pour savoir ce que ce plugin particulier s'attend à recevoir en tant que deuxième paramètre.
:::

```js
import { createApp } from 'vue'
import Root from './App.vue'
import i18nPlugin from './plugins/i18n'

const app = createApp(Root)
const i18nStrings = {
  greetings: {
    hi: 'Hallo!'
  }
}

app.use(i18nPlugin, i18nStrings)
app.mount('#app')
```

Jetez un coup d'oeil à [awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) pour une énorme collection de plugins et de bibliothèques fournis par la communauté..
