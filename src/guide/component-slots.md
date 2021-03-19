# Slots

> Cette page suppose que vous avez déjà lu les [Principes de base des composants](component-basics.md). Lisez-le d'abord si vous n'êtes pas familier avec les composants.

## Contenu de Slot

Vue implémente une API de distribution de contenu inspirée du [projet de spécification des composants Web](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md), en utilisant l'élément `<slot>` pour servir de points de distribution pour le contenu.

Cela vous permet de composer des composants comme celui-ci:

```html
<todo-button>
  Ajouter todo
</todo-button>
```

Ensuite, dans le template pour `<todo-button>`, vous pourriez avoir:

```html
<!-- template du composant `todo-button` -->
<button class="btn-primary">
  <slot></slot>
</button>
```

Lors du rendu du composant, «<slot> </slot>» sera remplacé par «Ajouter todo».

```html
<!-- HTML généré -->
<button class="btn-primary">
  Ajouter todo
</button>
```

Les chaînes de caractères ne sont que le début! Les emplacements peuvent également contenir n'importe quel code de template, y compris du HTML:

```html
<todo-button>
  <!-- Ajouter une icône Font Awesome -->
  <i class="fas fa-plus"></i>
  Ajouter todo
</todo-button>
```

Ou même un autre composant

```html
<todo-button>
  <!-- Utiliser un composant pour ajouter une icône -->
  <font-awesome-icon name="plus"></font-awesome-icon>
  Ajouter todo
</todo-button>
```

Si le template de `<todo-button>` ne contenait **pas** d'élément `<slot>`, tout contenu fourni entre sa balise d'ouverture et de fermeture serait ignoré.

```html
<!-- template de composant todo-button -->

<button class="btn-primary">
  Créer un nouvel item
</button>
```

```html
<todo-button>
  <!-- Le texte suivant sera ignoré -->
  Ajouter todo
</todo-button>
```

## Scope de rendu

Lorsque vous souhaitez utiliser des données à l'intérieur d'un slot, comme dans:

```html
<todo-button>
  Supprimer un {{ item.name }}
</todo-button>
```

Cet slot a accès aux mêmes propriétés d'instance (c'est-à-dire à la même «scope») que le reste du template.

<img src="/images/slot.png" width="447" height="auto" style="display: block; margin: 0 auto; max-width: 100%" loading="lazy" alt="Slot explanation diagram">

Le slot n'a **pas** accès à la scope de `<todo-button>`. Par exemple, essayer d'accéder à `action` ne fonctionnerait pas:

```html
<todo-button action="effacer">
  Cliquer ici pour {{ action }} un élément
  <!--
  L'`action` ne sera pas définie, car ce contenu est passé
  _à_ <todo-button>, plutôt que défini _à l'intérieur_ du
  Composant <todo-button>.
  -->
</todo-button>
```

En règle générale, rappelez-vous que:

> Tout dans le template parent est compilé dans la scope parent; tout dans le template enfant est compilé dans la scope enfant.

## Contenu de secours

Il y a des cas où il est utile de spécifier le contenu de secours (c'est-à-dire par défaut) pour un slot, à restituer uniquement lorsqu'aucun contenu n'est fourni. Par exemple, dans un composant `<submit-button>`:

```html
<button type="submit">
  <slot></slot>
</button>
```

Nous pourrions vouloir que le texte "Envoyer" soit affiché dans le `<button>` la plupart du temps. Pour faire de "Envoyer" le contenu de secours, nous pouvons le placer entre les balises `<slot>`:

```html
<button type="submit">
  <slot>Envoyer</slot>
</button>
```

Maintenant quand nous utilisons `<submit-button>` dans un composant parent, ne fournissant aucun contenu pour le slot:

```html
<submit-button></submit-button>
```

génèrera le contenu de remplacement, "Envoyer":

```html
<button type="submit">
  Envoyer
</button>
```

Mais si nous fournissons du contenu:

```html
<submit-button>
  Sauvegarder
</submit-button>
```

Alors le contenu fourni sera affiicher à la place:

```html
<button type="submit">
  Sauvegarder
</button>
```

## Slots nommés

Il y a des moments où il est utile d'avoir plusieurs slots. Par exemple, dans un composant `<base-layout>` avec le template suivant:

```html
<div class="container">
  <header>
    <!-- Nous voulons le contenu de l'en-tête ici -->
  </header>
  <main>
    <!-- Nous voulons le contenu principal ici -->
  </main>
  <footer>
    <!-- Nous voulons le contenu du pied de page ici -->
  </footer>
</div>
```

Dans ces cas, l'élément `<slot>` a un attribut spécial, `name`, qui peut être utilisé pour attribuer un ID unique à différents emplacements afin que vous puissiez déterminer où le contenu doit être généré:

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

Une `<slot>` sans `name` a implicitement le nom "default".

Pour fournir du contenu aux slots nommés, nous devons utiliser la directive `v-slot` sur un élément`<template>`, en fournissant le nom du slot comme argument de `v-slot`:

```html
<base-layout>
  <template v-slot:header>
    <h1>Voici un titre de page</h1>
  </template>

  <template v-slot:default>
    <p>Un paragraphe pour le contenu principal.</p>
    <p>Et un autre.</p>
  </template>

  <template v-slot:footer>
    <p>Voici quelques infos de contacts</p>
  </template>
</base-layout>
```

Maintenant, tout ce qui se trouve à l'intérieur des éléments `<template>` sera passé aux emplacements correspondants.

Le HTML rendu sera:

```html
<div class="container">
  <header>
    <h1>Voici un titre de page</h1>
  </header>
  <main>
    <p>Un paragraphe pour le contenu principal.</p>
    <p>Et un autre.</p>
  </main>
  <footer>
    <p>Voici quelques infos de contacts</p>
  </footer>
</div>
```

Notez que **`v-slot` ne peut être ajouté qu'à un `<template>`** (avec [une exception](#syntaxe-abregee-pour-les-slots-par-defaut-isoles))

## Slots scopés

Parfois, il est utile que le contenu du slot ait accès aux données disponibles uniquement dans le composant enfant. C'est un cas courant lorsqu'un composant est utilisé pour afficher un tableau d'items, et nous voulons pouvoir personnaliser la façon dont chaque item est généré.

Par exemple, nous avons un composant, contenant une liste de todo-items.

```js
app.component('todo-list', {
  data() {
    return {
      items: ['Feed a cat', 'Buy milk']
    }
  },
  template: `
    <ul>
      <li v-for="(item, index) in items">
        {{ item }}
      </li>
    </ul>
  `
})
```

Nous pourrions vouloir remplacer le <span v-pre> `{{ item }}` </span> par un `<slot>` pour le personnaliser sur le composant parent:

```html
<todo-list>
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

Cela ne fonctionnera pas cependant, car seul le composant `<todo-list>` a accès à `item` et nous fournissons le contenu du slot à partir de son parent.

Pour rendre `item` disponible au contenu du slot fourni par le parent, nous pouvons ajouter un élément `<slot>` et le lier en tant qu'attribut:

```html
<ul>
  <li v-for="( item, index ) in items">
    <slot :item="item"></slot>
  </li>
</ul>
```

Vous pouvez lier autant d'attributs au `slot` que nécessaire:

```html
<ul>
  <li v-for="( item, index ) in items">
    <slot
      :item="item"
      :index="index"
      :another-attribute="anotherAttribute"
    ></slot>
  </li>
</ul>
```

Les attributs liés à un élément `<slot>` sont appelés **props de slot**. Maintenant, dans la scope parent, nous pouvons utiliser `v-slot` avec une valeur pour définir un nom pour les props de slot qui nous ont été fournis:

```html
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}</span>
  </template>
</todo-list>
```

<img src="/images/scoped-slot.png" width="611" height="auto" style="display: block; margin: 0 auto; max-width: 100%;" loading="lazy" alt="Scoped slot diagram">

Dans cet exemple, nous avons choisi de nommer l'objet contenant tous nos props de slot `slotProps`, mais vous pouvez utiliser le nom de votre choix.

### Syntaxe abrégée pour les slots par défaut isolés

Dans les cas comme ci-dessus, lorsque seul le slot par défaut est fourni en contenu, les balises du composant peuvent être utilisées comme template du slot. Cela nous permet d'utiliser `v-slot` directement sur le composant:

```html
<todo-list v-slot:default="slotProps">
  <i class="fas fa-check"></i>
  <span class="green">{{ slotProps.item }}</span>
</todo-list>
```

Cela peut être raccourci encore plus. Tout comme le contenu non spécifié est supposé être pour le slot par défaut, `v-slot` sans argument est supposé faire référence au slot par défaut:

```html
<todo-list v-slot="slotProps">
  <i class="fas fa-check"></i>
  <span class="green">{{ slotProps.item }}</span>
</todo-list>
```

Notez que la syntaxe abrégée de la slot par défaut **ne peut pas** être mélangée avec des slots nommés, car cela entraînerait une ambiguïté de scope:

```html
<!-- INVALIDE, il en résultera un avertissement-->
<todo-list v-slot="slotProps">
  <i class="fas fa-check"></i>
  <span class="green">{{ slotProps.item }}</span>

  <template v-slot:other="otherSlotProps">
    slotProps n'est PAS disponible ici
  </template>
</todo-list>
```

Chaque fois qu'il y a plusieurs slots, utilisez la syntaxe complète basée sur `<template>` pour _tous_ les slots:

```html
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}</span>
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</todo-list>
```

### Destructuring des slots props

En interne, les slots scopés fonctionnent en enveloppant le contenu de votre slot dans une fonction avec un seul argument:

```js
function (slotProps) {
  // ... contenu du slot ...
}
```

Cela signifie que la valeur de `v-slot` peut en fait accepter toute expression JavaScript valide qui peut apparaître à la position d'argument d'une définition de fonction. Ainsi, vous pouvez également utiliser le [destructuring de ES2015](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) pour extraire des props de slot spécifiques, comme ceci:

```html
<todo-list v-slot="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

Cela peut rendre le template beaucoup plus propre, en particulier lorsque le slot fournit de nombreux props. Cela ouvre également d'autres possibilités, telles que le changement de nom des props, par ex. `item` à `todo`:

```html
<todo-list v-slot="{ item: todo }">
  <i class="fas fa-check"></i>
  <span class="green">{{ todo }}</span>
</todo-list>
```

Vous pouvez même définir des solutions de secours, à utiliser dans le cas où un prop de slot n'est pas défini:

```html
<todo-list v-slot="{ item = 'Placeholder' }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

## Noms de slot dynamiques

Les [Arguments de directive dynamique](template-syntax.md#arguments-dynamiques) fonctionnent également sur `v-slot`, permettant la définition de noms de slots dynamiques:

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## Abréviation des slots nommés

Semblable à `v-on` et`v-bind`, `v-slot` a également un raccourci, remplaçant tout avant l'argument (`v-slot:`) par le symbole spécial `#`.Par exemple, `v-slot:header` peut être réécrit `#header`:

```html
<base-layout>
  <template #header>
    <h1>Voici un titre de page</h1>
  </template>

  <template #default>
    <p>Un paragraphe pour le contenu princip.</p>
    <p>Et un autre.</p>
  </template>

  <template #footer>
    <p>Voici quelques infos de contacts</p>
  </template>
</base-layout>
```

Cependant, tout comme pour les autres directives, le raccourci n'est disponible que lorsqu'un argument est fourni. Cela signifie que la syntaxe suivante n'est pas valide:

```html
<!-- Ceci déclenchera un avertissement -->

<todo-list #="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

Au lieu de cela, vous devez toujours spécifier le nom du slot si vous souhaitez utiliser le raccourci:

```html
<todo-list #default="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```
