# Attributs non-props

> Cette page suppose que vous avez déjà lu les [Principes de base des composants](component-basics.md). Lisez-le d'abord si vous n'êtes pas familier avec les composants.

Un attribut non-prop de composant est un attribut ou un écouteur d’événement qui est passé à un composant, mais qui n’a pas de propriété correspondante définie dans [props](component-props) ou [emits](component-custom-events.html#defining-custom-events). Des exemples courants de ceci incluent les attributs `class`, `style`, et `id`. Vous pouvez accéder à ces attributs via la propriété `$attrs`

## Héritage d'attributs

Lorsqu'un composant renvoie un seul nœud racine, les attributs non prop seront automatiquement ajoutés aux attributs du nœud racine. Par exemple, dans l'instance d'un composant de sélecteur de date:

```js
app.component('date-picker', {
  template: `
    <div class="date-picker">
      <input type="datetime" />
    </div>
  `
})
```

Dans le cas où nous aurions besoin de définir le statut du composant date-picker via une propriété `data-status`, il sera appliqué au nœud racine (c'est-à-dire`div.date-picker`).

```html
<!-- composant date-picker avec un attribut non-prop -->
<date-picker data-status="activated"></date-picker>

<!-- Composant date-picker généré -->
<div class="date-picker" data-status="activated">
  <input type="datetime" />
</div>
```

La même règle s'applique aux écouteurs d'événements:

```html
<date-picker @change="submitChange"></date-picker>
```

```js
app.component('date-picker', {
  created() {
    console.log(this.$attrs) // { onChange: () => {}  }
  }
})
```

Cela peut être utile lorsque nous avons un élément HTML avec l'événement `change` comme élément racine de `date-picker`

```js
app.component('date-picker', {
  template: `
    <select>
      <option value="1">Yesterday</option>
      <option value="2">Today</option>
      <option value="3">Tomorrow</option>
    </select>
  `
})
```

Dans ce cas, l'écouteur d'événement `change` est passé du composant parent à l'enfant et il sera déclenché sur l'événement ` <select> ``change ` natif. Nous n'aurons pas besoin d'émettre explicitement un événement du `date-picker`:

```html
<div id="date-picker" class="demo">
  <date-picker @change="showChange"></date-picker>
</div>
```

```js
const app = Vue.createApp({
  methods: {
    showChange(event) {
      console.log(event.target.value) // Logue une valeur de l'option sélectionnée
    }
  }
})
```

## Désactiver l'héritage d'attributs

Si vous ne voulez **pas** qu'un composant hérite automatiquement des attributs, vous pouvez définir `inheritAttrs: false` dans les options du composant. Le scénario courant de désactivation d'un héritage d'attribut est celui où les attributs doivent être appliqués à d'autres éléments en plus du nœud racine.

En définissant l'option `inheritAttrs` sur`false`, vous pouvez contrôler d'appliquer à d'autres éléments les attributs pour utiliser la propriété `$attrs` du composant, qui inclut tous les attributs non inclus dans les propriétés `props` et `emits` du composant (par exemple, `class`, `style`, écouteurs `v-on`, etc.).

En utilisant notre exemple de composant de sélection de date de la [section précédente](#heritage-d-attributs), dans le cas où nous aurions besoin d'appliquer tous les attributs non-prop à l'élément `input` plutôt qu'à l'élément racine `div`, cela peut être accompli en utilisant le raccourci `v-bind`.

```js{5}
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime" v-bind="$attrs" />
    </div>
  `
})
```

Avec cette nouvelle configuration, notre attribut `data-status` sera appliqué à notre élément `input`!

```html
<!-- Composant date-picker avec un attribut non-prop -->
<date-picker data-status="activated"></date-picker>

<!-- Généré avec un attribut non-prop-->
<div class="date-picker">
  <input type="datetime" data-status="activated" />
</div>
```

## Héritage d'attribut sur plusieurs nœuds racines

Contrairement aux composants de nœud racine unique, les composants avec plusieurs nœuds racine n'ont pas de comportement de basculement d'attribut automatique. Si `$attrs` n'est pas lié explicitement, un avertissement d'exécution sera émis.

```html
<custom-layout id="custom-layout" @click="changeValue"></custom-layout>
```

```js
// Ceci déclenche un avertissement
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  `
})

// Aucun avertissement, les $attrs sont passés à l'élément <main>
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main v-bind="$attrs">...</main>
    <footer>...</footer>
  `
})
```
