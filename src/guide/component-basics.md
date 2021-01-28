# Les Bases des Composants

## Exemple de base

Ceci est un exemple de composant Vue:

```js
// Créer une application Vue
const app = Vue.createApp({})

// Définir un nouveau composant global appelé button-counter
app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
})
```

::: info
Nous vous montrons un exemple simple ici, mais dans une application Vue typique, on utilise des composants à fichier unique au lieu d'un template de string. Vous pouvez trouver plus d'informations à leur sujet [dans cette section](single-file-component.html).
:::

Les composants sont des instances réutilisables avec un nom: dans ce cas, `<button-counter>`. Nous pouvons utiliser ce composant comme élément personnalisé dans une instance racine:

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
app.mount('#components-demo')
```

<common-codepen-snippet title="Component basics" slug="abORVEJ" tab="js,result" :preview="false" />

Les composants étant des instances réutilisables, ils acceptent les mêmes options qu'une instance racine, telles que `data`, `computed`, `watch`, `methods`, et les lifecycles hooks.

## Réutilisation des composants

Les composants peuvent être réutilisés autant de fois que vous le souhaitez:

```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

<common-codepen-snippet title="Component basics: reusing components" slug="rNVqYvM" tab="html,result" :preview="false" />

Notez que lorsque vous cliquez sur les boutons, chacun maintient son propre `count` séparé. En effet, chaque fois que vous utilisez un composant, une nouvelle **instance** de celui-ci est créée.

## Organiser les composants

Il est courant qu'une application soit organisée en une arborescence de composants imbriqués:

![Component Tree](/images/components.png)

Par exemple, vous pouvez avoir des composants pour un header, une sidebar, et une zone de contenu, chacun contenant généralement d'autres composants pour les liens de navigation, les articles de blog, etc.

Pour utiliser ces composants dans des templates, ils doivent être enregistrés afin que Vue les reconnaisse. Il existe deux types d'enregistrement de composants: **global** et **local**. Jusqu'à présent, nous n'avons enregistré que les composants globalement, en utilisant la méthode `component` de notre application:

```js
const app = Vue.createApp({})

app.component('my-component-name', {
  // ... options ...
})
```

Les composants enregistrés globalement peuvent être utilisés dans le template de n'importe quel composant de l'application.

C'est tout ce que vous devez savoir sur l'enregistrement pour le moment, mais une fois que vous avez fini de lire cette page et que vous vous sentez à l'aise avec son contenu, nous vous recommandons de revenir plus tard pour lire le guide complet sur l'[Enregistrement des composants](component-registration.md).

## Transmission de données aux composants enfants avec des props

Plus tôt, nous avons mentionné la création d'un composant pour les articles de blog. Le problème est que ce composant ne sera utile que si vous pouvez lui transmettre des données, telles que le titre et le contenu de l'article spécifique que nous voulons afficher. C'est là que les props entrent en jeu.

Les props sont des attributs personnalisés que vous pouvez enrégistrer sur un composant. Pour passer un titre à notre composant d'article de blog, nous pouvons l'inclure dans la liste des props que ce composant accepte, en utilisant l'option `props`:

```js
const app = Vue.createApp({})

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-post-demo')
```

Lorsqu'une valeur est transmise à un attribut prop, elle devient une propriété sur cette instance de composant. La valeur de cette propriété est accessible dans le template, comme toute autre propriété de composant.

Un composant peut avoir autant de props que vous le voulez et par default, toute valeur peut être passée à n'importe quel prop.

Une fois qu'un prop est enrégistré, vous pouvez lui transmettre des données en tant qu'attribut personnalisé, comm ceci:

```html
<div id="blog-post-demo" class="demo">
  <blog-post title="My journey with Vue"></blog-post>
  <blog-post title="Blogging with Vue"></blog-post>
  <blog-post title="Why Vue is so fun"></blog-post>
</div>
```

<common-codepen-snippet title="Component basics: passing props" slug="PoqyOaX" tab="html,result" :preview="false" />

Dans une application typique, cependant, vous aurez probablement un tableau d'articles (posts) dans `data`:

```js
const App = {
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  }
}

const app = Vue.createApp(App)

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-posts-demo')
```

Vous voulez ensuite génerer un composant pour chacun d'eux:

```html
<div id="blog-posts-demo">
  <blog-post
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
  ></blog-post>
</div>
```

Ci-dessus, vous verrez que nous pouvons utiliser `v-bind` pour passer dynamiquement des props. Ceci est particulièrement utile lorsque vous ne connaissez pas le contenu exact que vous allez afficher à l'avance.

C'est tout ce que vous devez savoir sur les props pour le moment, mais une fois que vous avez fini de lire cette page et que vous vous sentez à l'aise avec son contenu, nous vous recommandons de revenir plus tard pour lire le guide complet sur les [Props](component-props.html).

## Écoute des événements sur les composants enfants

Au fur et à mesure que nous développons notre composant `<blog-post>`, certaines fonctionnalités peuvent nécessiter une communication de retour avec le composant parent. Par exemple, nous pouvons décider d'inclure une fonctionnalité d'accessibilité pour agrandir le texte des articles de blog, tout en laissant le reste de la page à sa taille par défaut.

Dans le parent, nous pouvons prendre en charge cette fonctionnalité en ajoutant une propriété de données `postFontSize`:

```js
const App = {
  data() {
    return {
      posts: [
        /* ... */
      ],
      postFontSize: 1
    }
  }
}
```

Qui peut être utilisé dans le template pour contrôler la taille de la police de tous les articles de blog:

```html
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
    ></blog-post>
  </div>
</div>
```

Ajoutons maintenant un bouton pour agrandir le texte juste avant le contenu de chaque article:

```js
app.component('blog-post', {
  props: ['title'],
  template: `
    <div class="blog-post">
      <h4>{{ title }}</h4>
      <button>
        Agrandir le texte
      </button>
    </div>
  `
})
```

Le problème est que ce bouton ne fait rien:

```html
<button>
  Agrandir le texte
</button>
```

Lorsque nous cliquons sur le bouton, nous devons communiquer au parent qu'il doit agrandir le texte de tous les messages. Pour résoudre ce problème, les instances de composant fournissent un système d'événements personnalisé. Le parent peut choisir d'écouter n'importe quel événement sur l'instance de composant enfant avec `v-on` ou`@`, comme nous le ferions avec un événement DOM natif:

```html
<blog-post ... @enlarge-text="postFontSize += 0.1"></blog-post>
```

Ensuite, le composant enfant peut émettre un événement sur lui-même en appelant la méthode intégrée [**`$emit`**](../api/instance-methods.html#emit), en passant le nom de l'événement:

```html
<button @click="$emit('enlargeText')">
  Agrandir le texte
</button>
```

Grâce à l'écouteur`@enlarge-text="postFontSize += 0.1"`, le parent recevra l'événement et mettra à jour la valeur de `postFontSize`.

<common-codepen-snippet title="Component basics: emitting events" slug="KKpGyrp" tab="html,result" :preview="false" />

Nous pouvons lister les événements émis dans l'option `emits` du composant:

```js
app.component('blog-post', {
  props: ['title'],
  emits: ['enlargeText']
})
```

Cela vous permettra de vérifier tous les événements qu'un composant émet et éventuellement de [les valider](component-custom-events.html#validate-emitted-events).

### Emission d'une valeur avec un événement

Il est parfois utile d'émettre une valeur spécifique avec un événement. Par exemple, nous pouvons souhaiter que le composant `<blog-post>` soit en charge de l'agrandissement du texte. Dans ces cas, nous pouvons passer un deuxième paramètre à `$emit` pour fournir cette valeur:

```html
<button @click="$emit('enlargeText', 0.1)">
  Enlarge text
</button>
```

Ensuite, lorsque nous écoutons l'événement dans le parent, nous pouvons accéder à la valeur de l'événement émis avec `$event`:

```html
<blog-post ... @enlarge-text="postFontSize += $event"></blog-post>
```

Ou si le handler est une méthode:

```html
<blog-post ... @enlarge-text="onEnlargeText"></blog-post>
```

Ensuite, la valeur sera transmise comme premier paramètre de cette méthode:

```js
methods: {
  onEnlargeText(enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### Utilisation de `v-model` sur les composants

Les événements personnalisés peuvent également être utilisés pour créer des "input" personnalisées qui fonctionnent avec `v-model`. Souvenez-vous que:

```html
<input v-model="searchText" />
```

fait la même chose que:

```html
<input :value="searchText" @input="searchText = $event.target.value" />
```

Lorsqu'il est utilisé sur un composant, `v-model`, fait plutôt ceci:

```html
<custom-input
  :model-value="searchText"
  @update:model-value="searchText = $event"
></custom-input>
```

::: warning
Veuillez noter que nous avons utilisé `model-value` avec kebab-case ici car nous travaillons avec des templates in-DOM. Vous pouvez trouver une explication détaillée sur les attributs kebab-case vs camelCase dans la section des [Mises en garde sur l'analyse des templates DOM](#mises-en-garde-concernant-le-parsing-des-templates-dom)
:::

Pour que cela fonctionne réellement, le `<input>` à l'intérieur du composant doit:

- Lier l'attribut `value` au prop `modelValue`
- Sur `input`, émettre un événement`update: modelValue` avec la nouvelle valeur

Voici ça en action:

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `
})
```

Maintenant, `v-model` devrait fonctionner parfaitement avec ce composant:

```html
<custom-input v-model="searchText"></custom-input>
```

Une autre façon d'implémenter `v-model` dans ce composant est d'utiliser la capacité des propriétés `computed` pour définir un getter et un setter. La méthode `get` doit renvoyer la propriété `modelValue` et la méthode `set` doit émettre l'événement correspondant:

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input v-model="value">
  `,
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})
```

C'est tout ce que vous devez savoir sur les événements de composants personnalisés pour le moment, mais une fois que vous avez fini de lire cette page et que vous vous sentez à l'aise avec son contenu, nous vous recommandons de revenir plus tard pour lire le guide complet sur [Événements personnalisés](component-custom-events.md).

## Distribution de contenu avec des slots

Tout comme avec les éléments HTML, il est souvent utile de pouvoir transmettre du contenu à un composant, comme ceci:

```html
<alert-box>
  Something bad happened.
</alert-box>
```

Ce qui devrait génerer quelque chose comme ceci:

<common-codepen-snippet title="Component basics: slots" slug="jOPeaob" :preview="false" />

Ceci peut être réalisé en utilisant l'élément personnalisé `<slot>` de Vue:

```js
app.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

Comme vous le verrez ci-dessus, nous utilisons le `<slot>` comme espace réservé où nous voulons que le contenu aille - et c'est tout. Nous avons fini!

C'est tout ce que vous devez savoir sur les slots pour le moment, mais une fois que vous avez fini de lire cette page et que vous vous sentez à l'aise avec son contenu, nous vous recommandons de revenir plus tard pour lire le guide complet sur les [slots](component-slots.md).

## Composants Dynamiques

Parfois, il est utile de basculer dynamiquement entre les composants, comme dans une interface à onglets:

<common-codepen-snippet title="Component basics: dynamic components" slug="oNXaoKy" :preview="false" />

Ce qui précède est rendu possible par l'élément `<component>` de Vue avec l'attribut spécial `is`:

```html
<!-- Le composant change lorsque currentTabComponent change -->
<component :is="currentTabComponent"></component>
```

Dans l'exemple ci-dessus, `currentTabComponent` peut contenir soit:

- le nom d'un composant enregistré, ou
- un objet d'options d'un composant

Voir ce [sandbox](https://codepen.io/team/Vue/pen/oNXaoKy) pour expérimenter avec le code complet, ou [cette version](https://codepen.io/team/Vue/pen/oNXapXM) pour un exemple de liaison à l'objet d'options d'un composant, au lieu de son nom enregistré.

Vous pouvez également utiliser l'attribut `is` pour créer des éléments HTML normaux

C'est tout ce que vous devez savoir sur les composants dynamiques pour le moment, mais une fois que vous avez fini de lire cette page et que vous vous sentez à l'aise avec son contenu, nous vous recommandons de revenir plus tard pour lire le guide complet sur les [Composants dynamiques et asynchrones](./component-dynamic-async.html).

## Mises en garde concernant le parsing des templates DOM

Certains éléments HTML, tels que `<ul>`, `<ol>`, `<table>` et `<select>` ont des restrictions sur les éléments pouvant apparaître à l'intérieur, et certains éléments tels que `<li>`, `<tr>` et `<option>` ne peuvent apparaître qu'à l'intérieur de certains autres éléments.

Cela entraînera des problèmes lors de l'utilisation de composants avec des éléments qui ont de telles restrictions. Par exemple:

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

Le composant personnalisé `<blog-post-row>` sera hissé comme contenu non valide, provoquant des erreurs dans la sortie de rendu finale. Nous pouvons utiliser la directive spéciale `v-is` comme solution de contournement:

```html
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

:::warning
La valeur `v-is` est traitée comme une expression JavaScript, nous devons donc mettre le nom du composant entre guillemets:

```html
<!-- Incorrect, rien ne sera rendu -->
<tr v-is="blog-post-row"></tr>

<!-- Correct -->
<tr v-is="'blog-post-row'"></tr>
```

:::

De plus, les noms d'attributs HTML ne sont pas sensibles à la casse, de sorte que les navigateurs interpréteront tous les caractères majuscules comme des minuscules. Cela signifie que lorsque vous utilisez des templates dans le DOM, les noms de prop en camelCase et les paramètres du gestionnaire d'événements doivent utiliser leurs équivalents en kebab-case(délimités par des tirets):

```js
// camelCase en JavaScript

app.component('blog-post', {
  props: ['postTitle'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
})
```

```html
<!-- kebab-case en HTML -->

<blog-post post-title="hello!"></blog-post>
```

Il faut noter que **ces limitations ne s'appliquent _pas_ si vous utilisez des string templates provenant de l'une des sources suivantes**:

- String templates (e.g. `template: '...'`)
- [Composant à fichier unique (`.vue`)](single-file-component.html)
- `<script type="text/x-template">`

C'est tout ce que vous devez savoir sur les mises en garde de parsing des templates DOM pour le moment - et en fait, la fin des _Essentielles_ de Vue. Toutes nos félicitations! Il y a encore plus à apprendre, mais d'abord, nous vous recommandons de faire une pause pour jouer vous-même avec Vue et créer quelque chose d'amusant.

Une fois que vous vous sentez à l'aise avec les connaissances que vous venez de digérer, nous vous recommandons de revenir pour lire le guide complet sur les [Composants dynamiques et asynchrones](component-dynamic-async.html), ainsi que les autres pages de la section Composants en profondeur de la barre latérale.
