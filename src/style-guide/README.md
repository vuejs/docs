---
sidebar: auto
---

# Guide De Style

Ceci est le guide de style officiel pour du code spécifique à Vue. Si vous utilisez Vue dans un projet, c'est une excellente référence pour éviter les erreurs, les anti-patterns et les comportements inattendus. Cependant, nous ne pensons pas qu'un guide de style soit idéal pour toutes les équipes ou tous les projets. Par conséquent, libre à vous de faire différemment en fonction de votre expérience, de votre stack technologique et de vos valeurs personnelles.

La plupart du temps, nous évitons également les suggestions sur JavaScript ou HTML en général. Peu importe que vous utilisiez des points-virgules ou des virgules de fin. Votre HTML peut utiliser des guillemets simples ou doubles pour les valeurs d'attribut. Certaines exceptions existeront cependant, où nous avons constaté qu'un modèle particulier est utile dans le contexte de Vue.

Pour en finir donc, nous avons séparé les règles en quatre catégories:

## Catégories de Règles

### Priorité A: Essentielle

Ces règles aident à éviter les erreurs, alors apprenez-les et respectez-les à tout prix. Des exceptions peuvent exister, mais devraient être très rares et être réservées à des personnes ayant une connaissance approfondie de JavaScript et de Vue.

### Priorité B: Fortement Récommandée

Ces règles améliorent la lisibilité et/ou l'expérience des développeurs dans la plupart des projets. Votre code fonctionnera toujours si vous les enfreignez, mais les violations doivent être rares et bien justifiées.

### Priorité C: Récommandée

Lorsqu'il existe plusieurs options tout aussi bonnes les unes que les autres, un choix arbitraire peut être fait pour assurer une certaine cohérence. Dans ces règles, nous décrivons chaque option acceptable et suggérons un choix par défaut. Cela signifie que vous pouvez vous sentir libre de faire un choix différent dans votre propre code base, tant que vous êtes cohérent et que vous avez une bonne raison. Veuillez cependant avoir une bonne raison! En vous adaptant au standard de la communauté, vous allez:

1. entraîner votre cerveau à analyser plus facilement la plupart des codes d'autres développeurs que vous rencontrez
2. être capable de copier et coller la plupart des exemples de code d'autres développeurs sans modification
3. trouver souvent que les nouveaux collegues sont déjà habitués à votre style de code préféré, du moins en ce qui concerne Vue

### Priorité D: Utiliser Avec Précaution

Certaines fonctionnalités de Vue existent pour prendre en charge des cas marginaux rares ou des migrations plus fluides à partir d'une code base héritée. Cependant, lorsqu'ils sont surutilisés, ils peuvent rendre votre code plus difficile à maintenir ou même devenir une source de bugs. Ces règles mettent en lumière les caractéristiques potentiellement risquées, décrivant quand et pourquoi elles doivent être évitées.

## Règles de Priorité A : Essentielle <span class="hide-from-sidebar">(Prevention d'Erreur)</span>

### Noms des composants en mots-composés<sup data-p="a">essentielle</sup>

**Les noms des Composants doivent toujours être des mots-composés, sauf pour le composant racine `App`, et les composants intégrés qui viennent avec Vue, tels que `<transition>` ou `<component>`.**

Ceci afin d' [éviter des conflits](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name) avec des élements HTML existants ou futures, puisque tous les éléments HTML sont des mots simples.

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```js
app.component('todo', {
  // ...
})
```

```js
export default {
  name: 'Todo',
  // ...
}
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```js
app.component('todo-item', {
  // ...
})
```

```js
export default {
  name: 'TodoItem',
  // ...
}
```

</div>

### Définition des props <sup data-p="a">essentielle</sup>

**La definition des props doit être détaillée autant que possible.**

Dans un code commité, la definition des props doit toujours être détaillé autant que possible, en spécifiant au moins le(s) type(s).

::: details Explications détaillés
Detailler les [definitions des props](/guide/component-props.html#prop-validation) a deux avantages:

- Elles documentent l'API du composant, de sorte qu'il soit facile de voir comment le composant est censé être utilisé.
- En développement, Vue vous enverra un avertissement si des props aux formats incorrect sont fournis à un composant, vous aidant ainsi à détecter les potentielles sources d'erreurs.
  :::

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```js
// Ceci est OK seulement en prototyping
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```js
props: {
  status: String
}
```

```js
// Encore mieux!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>

### `v-for` avec key <sup data-p="a">essentielle</sup>

**Toujours utiliser `key` avec `v-for`.**

`key` avec `v-for` est _toujours_ requis sur les composants, dans le but de maintenir l'état des composants internes sous la hiérarchie. Même pour les éléments HTML, il est recommandé de conserver un comportement prévisible, tel que la [constance des objets](https://bost.ocks.org/mike/constancy/) dans les animations.

::: details Explication Détaillée
Disons que vous avez une liste de todos:

```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: 'Apprendre à utiliser v-for'
      },
      {
        id: 2,
        text: 'Apprendre à utiliser key'
      }
    ]
  }
}
```

Ensuite, vous les trier par ordre alphabétique. Lorsque le DOM est mis à jour, Vue optimisera le rendu en effectuant les mutations nécéssitant le moins de ressources. Cela peut vouloir dire supprimer le premier élément todo pour ensuite le rajouter è la fin de la liste.

Le problème est qu'ils existent des cas où il est important de ne pas supprimer des éléments qui resteront dans le DOM. Par example, Vous voudriez peut-être utiliser `<transition-group>` pour animer la liste, ou garder le focus sur un élément `<input>`. Dans ces cas, ajouter une clé (key) unique à chaque item (e.g. `:key="todo.id"`) fera comprendre à Vue comment se comporter de façon plus prédictible.

Dans notre exemple, il est _toujours_ préférable d'ajouter une clé (key) unique, de sorte que vous et votre équipe n'aurez jamais à vous soucier de ces cas rares. Cependant, dans les rares scénarios critiques pour les performances où la constance des objets n'est pas nécessaire, vous pouvez faire une exception en connaissance de cause.
:::

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```html
<ul>
  <li v-for="todo in todos">{{ todo.text }}</li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

</div>

### Eviter `v-if` avec `v-for` <sup data-p="a">essentielle</sup>

**N'utilisez jamais `v-if` sur le même élément que `v-for`.**

Il existe deux cas courants où cela pourrait être tentant:

- Filtrer des items dans une liste (e.g. `v-for="user in users" v-if="user.isActive"`). Dans ce cas, remplacez `users` avec une nouvelle propriété computed qui retourne la liste des items filtrés (e.g. `activeUsers`).

- Pour eviter d'afficher une liste alors qu'elle devrait être masquée (e.g. `v-for="user in users" v-if="shouldShowUsers"`). Dans ce cas, déplacez le `v-if` dans un élément container (e.g. `ul`, `ol`).

::: details Explication détaillée
Lorsque Vue exécute les directives, `v-if` a une priorité plus haute que `v-for`, ainsi ce template:

```html
<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

Retournera une erreur, car la directive `v-if` sera évaluée en premier alors que la variable d'itération `user` n'existe pas encore.

On pourrait corriger cela en itérant sur une propriété computed comme ceci:

```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

```html
<ul>
  <li v-for="user in activeUsers" :key="user.id">{{ user.name }}</li>
</ul>
```

Alternativement, on pourrait utiliser un tag `<template>` avec `v-for` pour englober les éléments `<li>`:

```html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">{{ user.name }}</li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```html
<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```html
<ul>
  <li v-for="user in activeUsers" :key="user.id">{{ user.name }}</li>
</ul>
```

```html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">{{ user.name }}</li>
  </template>
</ul>
```

</div>

### Scoper les styles des composants <sup data-p="a">essentielle</sup>

**Pour les applications, les styles dans un composant App de niveau supérieur et dans les composants de mise en page (layout) peuvent être globaux, mais tous les autres composants doivent toujours être scopés.**

Ceci n'est pertinent que pour les [composants à un seul fichier](../guide/single-file-component.html). Il n'est pas requis d'utiliser [l'attribut `scoped`](https://vue-loader.vuejs.org/en/features/scoped-css.html). Vous pourrez scoper votre style via les [modules CSS](https://vue-loader.vuejs.org/en/features/css-modules.html), une stratégie basée sur les noms des classes, comme [BEM](http://getbem.com/), ou tout autre librairie/convention.

**Les librairies de composants devraient cependant, préférer une stratégie basée sur les classes plutôt que d'utiliser l'attribut `scoped`.**

Cela facilite le remplacement des styles internes, avec des noms de classe lisibles et qui n'ont pas une spécificité trop élevée, mais qui sont toujours très peu susceptibles de provoquer un conflit.

::: details Explication Détaillée
Si vous dévéloppez un gros projet, et que vous travaillez avec d'autres dévéloppeurs, ou utilisez des fichiers HTML/CSS tiers
(e.g. à partir de Auth0), une portée cohérente (scoping) garantira que vos styles ne s'appliquent qu'aux composants auxquels ils sont destinés.

Au-delà de l'attribut `scoped`, l'utilisation de noms de classe uniques peut aider à garantir que le CSS tiers ne s'applique pas à votre propre HTML. Par exemple, de nombreux projets utilisent les noms de classe «button», «btn» ou «icon», donc même si vous n'utilisez pas une stratégie telle que BEM, ajouter un préfixe spécifique à l'application et/ou au composant (e.g. `ButtonClose-icon`) peut fournir une certaine protection.
:::

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
  .btn-close {
    background-color: red;
  }
</style>
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```html
<template>
  <button class="button button-close">×</button>
</template>

<!-- Avec l'attribut `scoped` -->
<style scoped>
  .button {
    border: none;
    border-radius: 2px;
  }

  .button-close {
    background-color: red;
  }
</style>
```

```html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- Avec les CSS modules -->
<style module>
  .button {
    border: none;
    border-radius: 2px;
  }

  .buttonClose {
    background-color: red;
  }
</style>
```

```html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- Avec la convention BEM -->
<style>
  .c-Button {
    border: none;
    border-radius: 2px;
  }

  .c-Button--close {
    background-color: red;
  }
</style>
```

</div>

### Noms de propriété privées <sup data-p="a">essentielle</sup>

**Utilisez la portée des modules (scope) pour garder les fonctions privées inaccessibles de l'extérieur. Si ce n'est pas possible, utilisez toujours le préfixe `$_` pour les propriétés privées personnalisées dans un plugin, mixin, etc. qui ne devraient pas être considérés comme une API publique. Ensuite, pour éviter les conflits avec le code d'autres developpeurs, incluez également une portée nommée (par exemple `$_yourPluginName`).**

::: details Explication Détaillée
Vue utilise le préfixe `_` pour définir ses propres propriétés privées, Alors utiliser le même préfixe (e.g. `_update`) risque d'interférer avec une propriété d'instance. Même si vous vérifiez que Vue n'utilise pas un nom de propriété en particulier, il n' y a aucune garantie qu'un conflit ne surviendrait pas dans une version futur.

En ce qui concerne le préfixe `$`, Il est utilisé dans l'écosystème de Vue pour des propriétés d'instance spéciales qui sont exposées à l'utilisateur, donc l'utiliser pour des propriétés _privées_ ne serait pas appropriée.

Au lieu de cela, nous vous recommandons de combiner les deux préfixes `$_`, comme convention pour les propriétés privées définies par l'utilisateur qui garantissent l'absence de conflit avec Vue.
:::

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```js
const myGreatMixin = {
  // ...
  methods: {
    update() {
      // ...
    },
  },
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    _update() {
      // ...
    },
  },
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    $update() {
      // ...
    },
  },
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    $_update() {
      // ...
    },
  },
}
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```js
const myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update() {
      // ...
    },
  },
}
```

```js
// Encore Mieux!
const myGreatMixin = {
  // ...
  methods: {
    publicMethod() {
      // ...
      myPrivateFunction()
    },
  },
}

function myPrivateFunction() {
  // ...
}

export default myGreatMixin
```

</div>

## Priorité B: Fortement Récommandée <span class="hide-from-sidebar">(Améliorer la lisibilité)</span>

### Fichiers de composants <sup data-p="b">Fortement Récommandée</sup>

**Chaque fois qu'un système de build est disponible pour concaténer des fichiers, chaque composant doit être dans son propre fichier.**

Cela vous aide à trouver plus rapidement un composant lorsque vous devez le modifier ou vérifier comment l'utiliser.

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```js
app.component('TodoList', {
  // ...
})

app.component('TodoItem', {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```
components/
|- TodoList.js
|- TodoItem.js
```

```
components/
|- TodoList.vue
|- TodoItem.vue
```

</div>

### Typographie des Noms de composants <sup data-p="b">Fortement Récommandée</sup>

**Les noms des [single-components](../guide/single-file-component.html) doivent toujours être soit en PascalCase ou kebab-case.**

Le PascalCase fonctionne mieux avec l'autocomplétion dans les éditeurs de code, car il est cohérent avec la façon dont nous référençons les composants dans JS(X) et les modèles. Cependant, les noms de fichiers avec des lettres mixtes peuvent parfois créer des problèmes sur les systèmes de fichiers insensibles à la casse, c'est pourquoi kebab-case est également parfaitement acceptable.

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```
components/
|- MyComponent.vue
```

```
components/
|- my-component.vue
```

</div>

### Nom des composants de base <sup data-p="b">extremement récommandée</sup>

**Les composants de base (a.k.a. présentation, muet, ou composant pure) qui appliquent un style et des conventions spécifiques à l'application doivent tous commencer par un préfixe spécifique, tel que `Base`, `App`, or `V`.**

::: details Explication Détaillée
Ces composants jettent les bases d'un style et d'un comportement cohérents dans votre application. Ils peuvent **seulement** contenir:

- Des éléments HTML,
- D'autres composants de base, et
- Un composant UI tiers.

Mais il ne contiendront **jamais** des états globaux (e.g. provenant de Vuex).

Leurs noms incluent souvent le nom d'un élément qu'ils encapsulent (par exemple, `BaseButton`, `BaseTable`), à moins qu'aucun élément n'existe pour leur usage spécifique (par exemple «BaseIcon»). Si vous créer des composants similaires pour un contexte plus spécifique, ils utiliseront presque toujours ces composants (par exemple, `BaseButton` peut être utilisé dans` ButtonSubmit`).

Quelques avantages de cette convention:

- Lorsqu'ils sont classés par ordre alphabétique dans les éditeurs, les composants de base de votre application sont tous répertoriés ensemble, ce qui facilite leur identification.

- Puisque les noms des composants doivent toujours être des mots-composés, Cette convention vous fait eviter d'avoir à choisir des préfixes arbitraires pour des composants simples (e.g. `MyButton`, `VueButton`).

- Étant donné que ces composants sont fréquemment utilisés, vous pouvez simplement les rendre globaux au lieu de les importer partout. Un préfixe rend cela possible avec Webpack:

  ```js
  const requireComponent = require.context(
    './src',
    true,
    /Base[A-Z]\w+\.(vue|js)$/
  )
  requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig = baseComponentConfig.default || baseComponentConfig
    const baseComponentName =
      baseComponentConfig.name ||
      fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    app.component(baseComponentName, baseComponentConfig)
  })
  ```

  :::

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

```
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```

```
components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

</div>

### Noms des composants à instance unique <sup data-p="b">fortement récommandée</sup>

**Les composants qui ne devraient avoir qu'une seule instance active doivent commencer par le préfixe `The`, pour indiquer qu'il ne peut y en avoir qu'une seule.**

Cela ne signifie pas que le composant n'est utilisé que dans une seule page, mais il ne sera utilisé qu'une seule fois _par page_. Ces composants n'acceptent aucun accessoire, car ils sont spécifiques à votre application, pas à leur contexte dans votre application. Si vous trouvez le besoin d'ajouter des accessoires, c'est une bonne indication qu'il s'agit en fait d'un composant réutilisable qui n'est utilisé qu'une fois par page _pour l'instant_.

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```
components/
|- Heading.vue
|- MySidebar.vue
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

</div>

### Noms des composants étroitement liés <sup data-p="b">fortement recommandée</sup>

**Les composants enfants étroitement couplés à leur parent doivent inclure le nom du composant parent comme préfixe.**

Si un composant n'a de sens que dans le contexte d'un seul composant parent, cette relation doit être évidente dans son nom. Étant donné que les éditeurs organisent généralement les fichiers par ordre alphabétique, cela permet également de conserver ces fichiers associés les uns à côté des autres.

::: details Explication Détaillée
Vous pourriez être tenté de résoudre ce problème en imbriquant les composants enfants dans des répertoires nommés d'après leur parent. Par exemple:

```
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```

ou:

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```

Ceci n'est pas récommandé, car pourrait entrainer:

- De nombreux fichiers avec des noms similaires, ce qui rend le changement rapide de fichier dans les éditeurs de code plus difficile.
- De nombreux sous-répertoires imbriqués, ce qui augmente le temps nécessaire pour parcourir les composants dans la barre latérale d'un éditeur.
  :::

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

</div>

### Ordre des mots dans les noms des composants <sup data-p="b">fortement recommandée</sup>

**Les noms des composants doivent commencer par les mots de plus haut niveau (souvent les plus généraux) et se terminer par des mots de modification descriptifs.**

::: details Explication Détaillée
Vous vous démandez peut-être:

> "Pourquoi forcerions-nous les noms de composants à utiliser un langage moins naturel?"

En anglais naturel, les adjectifs et autres descripteurs apparaissent généralement avant les noms, tandis que les exceptions nécessitent des mots connecteurs. Par exemple:

- Coffee _with_ milk
- Soup _of the_ day
- Visitor _to the_ museum

Vous pouvez certainement inclure ces connecteurs dans les noms de composants si vous le souhaitez, mais l'ordre est toujours important.

Notez également que **ce qui est considéré comme "de plus haut niveau" sera contextuel à votre application**. Par exemple, imaginez une application avec un formulaire de recherche. Il peut inclure des composants comme celui-ci:

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

Comme vous le remarquerez peut-être, il est assez difficile de voir quels composants sont spécifiques à la recherche. Renommons maintenant les composants selon la règle:

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

Étant donné que les éditeurs organisent généralement les fichiers par ordre alphabétique, toutes les relations importantes entre les composants sont désormais évidentes en un coup d'œil.

Vous pourriez être tenté de résoudre ce problème différemment, en imbriquant tous les composants de recherche dans un répertoire "recherche", puis tous les composants de paramètres dans un répertoire "paramètres". Nous vous recommandons de ne considérer cette approche que dans les très grandes applications (par exemple, plus de 100 composants), pour les raisons suivantes:

- Il faut généralement plus de temps pour naviguer dans les sous-répertoires imbriqués que pour parcourir un seul répertoire `components`.

- Les conflits de nom (par exemple, plusieurs composants `ButtonDelete.vue`) rendent plus difficile la navigation rapide vers un composant spécifique dans un éditeur de code.
- Le refactoring devient plus difficile, car la recherche et le remplacement ne sont souvent pas suffisants pour mettre à jour les références relatives à un composant déplacé.
  :::

<div class="style-example style-example-bad">
<h4>Mauvais</h4>

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

</div>

<div class="style-example style-example-good">
<h4>Bon</h4>

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

</div>

### Self-closing components <sup data-p="b">fortement recommandée</sup>

**Components with no content should be self-closing in [single-file components](../guide/single-file-component.html), string templates, and [JSX](../guide/render-function.html#jsx) - but never in DOM templates.**

Components that self-close communicate that they not only have no content, but are **meant** to have no content. It's the difference between a blank page in a book and one labeled "This page intentionally left blank." Your code is also cleaner without the unnecessary closing tag.

Unfortunately, HTML doesn't allow custom elements to be self-closing - only [official "void" elements](https://www.w3.org/TR/html/syntax.html#void-elements). That's why the strategy is only possible when Vue's template compiler can reach the template before the DOM, then serve the DOM spec-compliant HTML.

<div class="style-example style-example-bad">
<h4>Bad</h4>

```html
<!-- In single-file components, string templates, and JSX -->
<MyComponent></MyComponent>
```

```html
<!-- In DOM templates -->
<my-component />
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```html
<!-- In single-file components, string templates, and JSX -->
<MyComponent />
```

```html
<!-- In DOM templates -->
<my-component></my-component>
```

</div>

### Component name casing in templates <sup data-p="b">fortement recommandée</sup>

**In most projects, component names should always be PascalCase in [single-file components](../guide/single-file-component.html) and string templates - but kebab-case in DOM templates.**

PascalCase has a few advantages over kebab-case:

- Editors can autocomplete component names in templates, because PascalCase is also used in JavaScript.
- `<MyComponent>` is more visually distinct from a single-word HTML element than `<my-component>`, because there are two character differences (the two capitals), rather than just one (a hyphen).
- If you use any non-Vue custom elements in your templates, such as a web component, PascalCase ensures that your Vue components remain distinctly visible.

Unfortunately, due to HTML's case insensitivity, DOM templates must still use kebab-case.

Also note that if you've already invested heavily in kebab-case, consistency with HTML conventions and being able to use the same casing across all your projects may be more important than the advantages listed above. In those cases, **using kebab-case everywhere is also acceptable.**

<div class="style-example style-example-bad">
<h4>Bad</h4>

```html
<!-- In single-file components and string templates -->
<mycomponent />
```

```html
<!-- In single-file components and string templates -->
<myComponent />
```

```html
<!-- In DOM templates -->
<MyComponent></MyComponent>
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```html
<!-- In single-file components and string templates -->
<MyComponent />
```

```html
<!-- In DOM templates -->
<my-component></my-component>
```

OR

```html
<!-- Everywhere -->
<my-component></my-component>
```

</div>

### Component name casing in JS/JSX <sup data-p="b">fortement recommandée</sup>

**Component names in JS/[JSX](../guide/render-function.html#jsx) should always be PascalCase, though they may be kebab-case inside strings for simpler applications that only use global component registration through `app.component`.**

::: details Explication Détaillée
In JavaScript, PascalCase is the convention for classes and prototype constructors - essentially, anything that can have distinct instances. Vue components also have instances, so it makes sense to also use PascalCase. As an added benefit, using PascalCase within JSX (and templates) allows readers of the code to more easily distinguish between components and HTML elements.

However, for applications that use **only** global component definitions via `app.component`, we recommend kebab-case instead. The reasons are:

- It's rare that global components are ever referenced in JavaScript, so following a convention for JavaScript makes less sense.
- These applications always include many in-DOM templates, where [kebab-case **must** be used](#component-name-casing-in-templates-strongly-recommended).
  :::

<div class="style-example style-example-bad">
<h4>Bad</h4>

```js
app.component('myComponent', {
  // ...
})
```

```js
import myComponent from './MyComponent.vue'
```

```js
export default {
  name: 'myComponent',
  // ...
}
```

```js
export default {
  name: 'my-component',
  // ...
}
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```js
app.component('MyComponent', {
  // ...
})
```

```js
app.component('my-component', {
  // ...
})
```

```js
import MyComponent from './MyComponent.vue'
```

```js
export default {
  name: 'MyComponent',
  // ...
}
```

</div>

### Full-word component names <sup data-p="b">fortement recommandée</sup>

**Component names should prefer full words over abbreviations.**

The autocompletion in editors make the cost of writing longer names very low, while the clarity they provide is invaluable. Uncommon abbreviations, in particular, should always be avoided.

<div class="style-example style-example-bad">
<h4>Bad</h4>

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

</div>

### Prop name casing <sup data-p="b">fortement recommandée</sup>

**Prop names should always use camelCase during declaration, but kebab-case in templates and [JSX](../guide/render-function.html#jsx).**

We're simply following the conventions of each language. Within JavaScript, camelCase is more natural. Within HTML, kebab-case is.

<div class="style-example style-example-bad">
<h4>Bad</h4>

```js
props: {
  'greeting-text': String
}
```

```html
<WelcomeMessage greetingText="hi" />
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```js
props: {
  greetingText: String
}
```

```html
<WelcomeMessage greeting-text="hi" />
```

</div>

### Multi-attribute elements <sup data-p="b">fortement recommandée</sup>

**Elements with multiple attributes should span multiple lines, with one attribute per line.**

In JavaScript, splitting objects with multiple properties over multiple lines is widely considered a good convention, because it's much easier to read. Our templates and [JSX](../guide/render-function.html#jsx) deserve the same consideration.

<div class="style-example style-example-bad">
<h4>Bad</h4>

```html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" />
```

```html
<MyComponent foo="a" bar="b" baz="c" />
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" />
```

```html
<MyComponent foo="a" bar="b" baz="c" />
```

</div>

### Simple expressions in templates <sup data-p="b">fortement recommandée</sup>

**Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods.**

Complex expressions in your templates make them less declarative. We should strive to describe _what_ should appear, not _how_ we're computing that value. Computed properties and methods also allow the code to be reused.

<div class="style-example style-example-bad">
<h4>Bad</h4>

```html
{{ fullName.split(' ').map((word) => { return word[0].toUpperCase() +
word.slice(1) }).join(' ') }}
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```html
<!-- In a template -->
{{ normalizedFullName }}
```

```js
// The complex expression has been moved to a computed property
computed: {
  normalizedFullName() {
    return this.fullName.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }
}
```

</div>

### Simple computed properties <sup data-p="b">fortement recommandée</sup>

**Complex computed properties should be split into as many simpler properties as possible.**

::: details Explication Détaillée
Simpler, well-named computed properties are:

- **Easier to test**

  When each computed property contains only a very simple expression, with very few dependencies, it's much easier to write tests confirming that it works correctly.

- **Easier to read**

  Simplifying computed properties forces you to give each value a descriptive name, even if it's not reused. This makes it much easier for other developers (and future you) to focus in on the code they care about and figure out what's going on.

- **More adaptable to changing requirements**

  Any value that can be named might be useful to the view. For example, we might decide to display a message telling the user how much money they saved. We might also decide to calculate sales tax, but perhaps display it separately, rather than as part of the final price.

  Small, focused computed properties make fewer assumptions about how information will be used, so require less refactoring as requirements change.
  :::

<div class="style-example style-example-bad">
<h4>Bad</h4>

```js
computed: {
  price() {
    const basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```js
computed: {
  basePrice() {
    return this.manufactureCost / (1 - this.profitMargin)
  },

  discount() {
    return this.basePrice * (this.discountPercent || 0)
  },

  finalPrice() {
    return this.basePrice - this.discount
  }
}
```

</div>

### Quoted attribute values <sup data-p="b">fortement recommandée</sup>

**Non-empty HTML attribute values should always be inside quotes (single or double, whichever is not used in JS).**

While attribute values without any spaces are not required to have quotes in HTML, this practice often leads to _avoiding_ spaces, making attribute values less readable.

<div class="style-example style-example-bad">
<h4>Bad</h4>

```html
<input type="text" />
```

```html
<AppSidebar :style={width:sidebarWidth+'px'}>
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```html
<input type="text" />
```

```html
<AppSidebar :style="{ width: sidebarWidth + 'px' }"></AppSidebar>
```

</div>

### Directive shorthands <sup data-p="b">fortement recommandée</sup>

**Directive shorthands (`:` for `v-bind:`, `@` for `v-on:` and `#` for `v-slot`) should be used always or never.**

<div class="style-example style-example-bad">
<h4>Bad</h4>

```html
<input v-bind:value="newTodoText" :placeholder="newTodoInstructions" />
```

```html
<input v-on:input="onInput" @focus="onFocus" />
```

```html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```html
<input :value="newTodoText" :placeholder="newTodoInstructions" />
```

```html
<input v-bind:value="newTodoText" v-bind:placeholder="newTodoInstructions" />
```

```html
<input @input="onInput" @focus="onFocus" />
```

```html
<input v-on:input="onInput" v-on:focus="onFocus" />
```

```html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
  <p>Here's some contact info</p>
</template>
```

```html
<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>

## Priority C Rules: Recommended <span class="hide-from-sidebar">(Minimizing Arbitrary Choices and Cognitive Overhead)</span>

### Component/instance options order <sup data-p="c">recommended</sup>

**Component/instance options should be ordered consistently.**

This is the default order we recommend for component options. They're split into categories, so you'll know where to add new properties from plugins.

1. **Global Awareness** (requires knowledge beyond the component)

   - `name`

2. **Template Modifiers** (changes the way templates are compiled)

   - `delimiters`

3. **Template Dependencies** (assets used in the template)

   - `components`
   - `directives`

4. **Composition** (merges properties into the options)

   - `extends`
   - `mixins`
   - `provide`/`inject`

5. **Interface** (the interface to the component)

   - `inheritAttrs`
   - `props`
   - `emits`

6. **Composition API** (the entry point for using the Composition API)

   - `setup`

7. **Local State** (local reactive properties)

   - `data`
   - `computed`

8. **Events** (callbacks triggered by reactive events)

   - `watch`
   - Lifecycle Events (in the order they are called)
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `activated`
     - `deactivated`
     - `beforeUnmount`
     - `unmounted`
     - `errorCaptured`
     - `renderTracked`
     - `renderTriggered`

9. **Non-Reactive Properties** (instance properties independent of the reactivity system)

   - `methods`

10. **Rendering** (the declarative description of the component output)
    - `template`/`render`

### Element attribute order <sup data-p="c">recommended</sup>

**The attributes of elements (including components) should be ordered consistently.**

This is the default order we recommend for component options. They're split into categories, so you'll know where to add custom attributes and directives.

1. **Definition** (provides the component options)

   - `is`

2. **List Rendering** (creates multiple variations of the same element)

   - `v-for`

3. **Conditionals** (whether the element is rendered/shown)

   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

4. **Render Modifiers** (changes the way the element renders)

   - `v-pre`
   - `v-once`

5. **Global Awareness** (requires knowledge beyond the component)

   - `id`

6. **Unique Attributes** (attributes that require unique values)

   - `ref`
   - `key`

7. **Two-Way Binding** (combining binding and events)

   - `v-model`

8. **Other Attributes** (all unspecified bound & unbound attributes)

9. **Events** (component event listeners)

   - `v-on`

10. **Content** (overrides the content of the element)
    - `v-html`
    - `v-text`

### Empty lines in component/instance options <sup data-p="c">recommended</sup>

**You may want to add one empty line between multi-line properties, particularly if the options can no longer fit on your screen without scrolling.**

When components begin to feel cramped or difficult to read, adding spaces between multi-line properties can make them easier to skim again. In some editors, such as Vim, formatting options like this can also make them easier to navigate with the keyboard.

<div class="style-example style-example-good">
<h4>Good</h4>

```js
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue() {
    // ...
  },

  inputClasses() {
    // ...
  }
}
```

```js
// No spaces are also fine, as long as the component
// is still easy to read and navigate.
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue() {
    // ...
  },
  inputClasses() {
    // ...
  }
}
```

</div>

### Single-file component top-level element order <sup data-p="c">recommended</sup>

**[Single-file components](../guide/single-file-component.html) should always order `<script>`, `<template>`, and `<style>` tags consistently, with `<style>` last, because at least one of the other two is always necessary.**

<div class="style-example style-example-bad">
<h4>Bad</h4>

```html
<style>
  /* ... */
</style>
<script>
  /* ... */
</script>
<template>...</template>
```

```html
<!-- ComponentA.vue -->
<script>
  /* ... */
</script>
<template>...</template>
<style>
  /* ... */
</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>
  /* ... */
</script>
<style>
  /* ... */
</style>
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```html
<!-- ComponentA.vue -->
<script>
  /* ... */
</script>
<template>...</template>
<style>
  /* ... */
</style>

<!-- ComponentB.vue -->
<script>
  /* ... */
</script>
<template>...</template>
<style>
  /* ... */
</style>
```

```html
<!-- ComponentA.vue -->
<template>...</template>
<script>
  /* ... */
</script>
<style>
  /* ... */
</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>
  /* ... */
</script>
<style>
  /* ... */
</style>
```

</div>

## Priority D Rules: Use with Caution <span class="hide-from-sidebar">(Potentially Dangerous Patterns)</span>

### Element selectors with `scoped` <sup data-p="d">use with caution</sup>

**Element selectors should be avoided with `scoped`.**

Prefer class selectors over element selectors in `scoped` styles, because large numbers of element selectors are slow.

::: details Explication Détaillée
To scope styles, Vue adds a unique attribute to component elements, such as `data-v-f3f3eg9`. Then selectors are modified so that only matching elements with this attribute are selected (e.g. `button[data-v-f3f3eg9]`).

The problem is that large numbers of [element-attribute selectors](http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&sel=a%5Bhref%5D&body=background%3A+%23CFD&ne=1000) (e.g. `button[data-v-f3f3eg9]`) will be considerably slower than [class-attribute selectors](http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&sel=.class%5Bhref%5D&body=background%3A+%23CFD&ne=1000) (e.g. `.btn-close[data-v-f3f3eg9]`), so class selectors should be preferred whenever possible.
:::

<div class="style-example style-example-bad">
<h4>Bad</h4>

```html
<template>
  <button>×</button>
</template>

<style scoped>
  button {
    background-color: red;
  }
</style>
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```html
<template>
  <button class="btn btn-close">×</button>
</template>

<style scoped>
  .btn-close {
    background-color: red;
  }
</style>
```

</div>

### Implicit parent-child communication <sup data-p="d">use with caution</sup>

**Props and events should be preferred for parent-child component communication, instead of `this.$parent` or mutating props.**

An ideal Vue application is props down, events up. Sticking to this convention makes your components much easier to understand. However, there are edge cases where prop mutation or `this.$parent` can simplify two components that are already deeply coupled.

The problem is, there are also many _simple_ cases where these patterns may offer convenience. Beware: do not be seduced into trading simplicity (being able to understand the flow of your state) for short-term convenience (writing less code).

<div class="style-example style-example-bad">
<h4>Bad</h4>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  template: '<input v-model="todo.text">',
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  methods: {
    removeTodo() {
      this.$parent.todos = this.$parent.todos.filter(
        (todo) => todo.id !== vm.todo.id
      )
    },
  },

  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        ×
      </button>
    </span>
  `,
})
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `,
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        ×
      </button>
    </span>
  `,
})
```

</div>

### Non-flux state management <sup data-p="d">use with caution</sup>

**[Vuex](https://next.vuex.vuejs.org/) should be preferred for global state management, instead of `this.$root` or a global event bus.**

Managing state on `this.$root` and/or using a global event bus can be convenient for very simple cases, but it is not appropriate for most applications.

Vuex is the [official flux-like implementation](/guide/state-management.html#official-flux-like-implementation) for Vue, and offers not only a central place to manage state, but also tools for organizing, tracking, and debugging state changes. It integrates well in the Vue ecosystem (including full [Vue DevTools](/guide/installation.html#vue-devtools) support).

<div class="style-example style-example-bad">
<h4>Bad</h4>

```js
// main.js
import { createApp } from 'vue'
import mitt from 'mitt'
const app = createApp({
  data() {
    return {
      todos: [],
      emitter: mitt(),
    }
  },

  created() {
    this.emitter.on('remove-todo', this.removeTodo)
  },

  methods: {
    removeTodo(todo) {
      const todoIdToRemove = todo.id
      this.todos = this.todos.filter((todo) => todo.id !== todoIdToRemove)
    },
  },
})
```

</div>

<div class="style-example style-example-good">
<h4>Good</h4>

```js
// store/modules/todos.js
export default {
  state: {
    list: [],
  },

  mutations: {
    REMOVE_TODO(state, todoId) {
      state.list = state.list.filter((todo) => todo.id !== todoId)
    },
  },

  actions: {
    removeTodo({ commit, state }, todo) {
      commit('REMOVE_TODO', todo.id)
    },
  },
}
```

```html
<!-- TodoItem.vue -->
<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo(todo)">X</button>
  </span>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      todo: {
        type: Object,
        required: true,
      },
    },

    methods: mapActions(['removeTodo']),
  }
</script>
```

</div>

<style lang="scss" scoped>
$color-bgr-good: #d7efd7;
$color-bgr-bad: #f7e8e8;
$color-priority-a: #6b2a2a;
$color-priority-b: #8c480a;
$color-priority-c: #2b5a99;
$color-priority-d: #3f536d;

.style-example {
  border-radius: 7px;
  margin: 1.6em 0;
  padding: 1.6em 1.6em 1em;
  position: relative;
  border: 1px solid transparent;
  border-top-width: 5px;

  h4 {
    margin-top: 0;

    &::before {
      font-family: 'FontAwesome';
      margin-right: .4em;
    }
  }

  &-bad {
    background: $color-bgr-bad;
    border-color: darken($color-bgr-bad, 20%);
    
    h4 {
      color: darken($color-bgr-bad, 50%);
    }

    h4::before {
      content: '\f057';
    }
  }

  &-good {
    background: $color-bgr-good;
    border-color: darken($color-bgr-good, 20%);
    
    h4 {
      color: darken($color-bgr-good, 50%);
    }

    h4::before {
      content: '\f058';
    }
  }
}

.details summary {
  font-weight: bold !important;
}

h3 {
  a.header-anchor {
    // as we have too many h3 elements on this page, set the anchor to be always visible
    // to make them stand out more from paragraph texts.
    opacity: 1; 
  }

  sup {
    text-transform: uppercase;
    font-size: 0.5em;
    padding: 2px 4px;
    border-radius: 3px;
    margin-left: 0.5em;

    &[data-p=a] {
      color: $color-priority-a;
      border: 1px solid $color-priority-a;
    }

    &[data-p=b] {
      color: $color-priority-b;
      border: 1px solid $color-priority-b;
    }

    &[data-p=c] {
      color: $color-priority-c;
      border: 1px solid $color-priority-c;
    }

    &[data-p=d] {
      color: $color-priority-d;
      border: 1px solid $color-priority-d;
    }
  }
}
</style>
