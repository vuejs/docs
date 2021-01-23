# Liaisons de classe et de style

Un besoin courant de liaison de données consiste à manipuler la liste de classes d'un élément et ses styles inligne. Comme ce sont tous les deux des attributs, nous pouvons utiliser `v-bind` pour les gérer: nous n'avons besoin que de calculer une chaîne caractère finale avec nos expressions. Cependant, mêler de la concaténation de chaînes caractères est ennuyeux et sujet aux erreurs. Pour cette raison, Vue fournit des améliorations spéciales lorsque `v-bind` est utilisé avec `class` et `style`. En plus des chaînes de caractère, les expressions peuvent également s'évaluer en objets ou en tableaux.

## Liaison de classe HTML

### Syntaxe d'Objet

Nous pouvons passer un objet à `:class` (abréviation de `v-bind:class`) pour basculer dynamiquement entre les classes:

```html
<div :class="{ active: isActive }"></div>
```

La syntaxe ci-dessus signifie que la présence de la classe «active» sera déterminée par la [véracité](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) de la propriété `isActive`.

Vous pouvez faire basculer plusieurs classes en ayant plus de champs dans l'objet. De plus, la directive `:class` peut également coexister avec l'attribut `class`. Donc, étant donné le template suivant:

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Et les données suivantes:

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

Le rendu sera:

```html
<div class="static active"></div>
```

Lorsque `isActive` ou `hasError` change, la liste des classes sera mise à jour en conséquence. Par exemple, si `hasError` devient `true`, la liste de classes deviendra `"static active text-danger"`.

L'objet lié n'a pas besoin d'être inline:

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

Cela rendra le même résultat. On peut également se lier à une [propriété computed](computed.md) qui renvoie un objet. C'est un pattern commun et puissant:

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### Syntaxe de tableau []

Nous pouvons passer un tableau à `:class` pour appliquer une liste de classes:

```html
<div :class="[activeClass, errorClass]"></div>
```

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

Le rendu sera:

```html
<div class="active text-danger"></div>
```

Si vous souhaitez également basculer (toggle) conditionnellement une classe dans la liste, vous pouvez le faire avec une expression ternaire:

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

Cela s'appliquera toujours à `errorClass`, mais n'appliquera à `activeClass` que lorsque `isActive` est vrai.

Cependant, cela peut être un peu détaillé si vous avez plusieurs classes conditionnelles. C'est pourquoi il est également possible d'utiliser la syntaxe d'objet dans la syntaxe de tableau:

```html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### Avec les composants

> Cette section considère que vous connaissez déjà les [composants Vue](component-basics.md). N'hésitez pas à l'ignorer et à revenir plus tard.

Lorsque vous utilisez l'attribut `class` sur un composant personnalisé avec un seul élément racine, ces classes seront ajoutées à cet élément. Les classes existantes sur cet élément ne seront pas écrasées.

Par exemple, si vous déclarez ce composant:

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `<p class="foo bar">Hi!</p>`
})
```

Ensuite, ajoutez quelques classes lors de son utilisation:

```html
<div id="app">
  <my-component class="baz boo"></my-component>
</div>
```

Le rendu HTML sera:

```html
<p class="foo bar baz boo">Hi</p>
```

Pareil pour les liaisons de classe:

```html
<my-component :class="{ active: isActive }"></my-component>
```

Lorsque `isActive` est vrai, le HTML rendu sera:

```html
<p class="foo bar active">Hi</p>
```

Si votre composant a plusieurs éléments racine, vous devez définir quel composant recevra cette classe. Vous pouvez le faire en utilisant la propriété du composant `$attrs`:

```html
<div id="app">
  <my-component class="baz"></my-component>
</div>
```

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p>
    <span>Ceci est un composant enfant</span>
  `
})
```

Vous pouvez en savoir plus sur l'héritage des attributs des composants dans la section [Attributs non-prop](component-attrs.html).

## Liaisons de styles inline 

### Syntaxe d'Object 

La syntaxe d'objet pour `:style` est assez simple - elle ressemble presque au CSS, sauf que c'est un objet JavaScript. Vous pouvez utiliser camelCase ou kebab-case (utilisez des guillemets avec kebab-case) pour les noms de propriété CSS:

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

Il est souvent judicieux de lier directement à un objet de style pour que le template soit plus propre:

```html
<div :style="styleObject"></div>
```

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

Là encore, la syntaxe d'objet est souvent utilisée conjointement avec des propriétés _computed_ qui renvoient des objets.

### Syntaxe de Tableau

La syntaxe de tableau pour `: style` vous permet d'appliquer plusieurs objets de style au même élément:

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Auto-prefixage


Lorsque vous utilisez une propriété CSS qui requiert les [préfixes du fournisseur](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) dans `:style`, par exemple `transform`, Vue détectera et ajoutera automatiquement les préfixes appropriés aux styles appliqués.

### Valeurs Multiples

Vous pouvez fournir un tableau de plusieurs valeurs (préfixées) à une propriété de style, par exemple:

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Cela ne rendra que la dernière valeur du tableau que le navigateur prend en charge. Dans cet exemple, il affichera `display: flex` pour les navigateurs qui prennent en charge la version sans préfixe de flexbox.