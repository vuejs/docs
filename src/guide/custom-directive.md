# Directives personnalisées

## Intro

En plus de l'ensemble de directives par défaut fourni dans le noyau (comme `v-model` ou `v-show`), Vue vous permet également d'enregistrer vos propres directives personnalisées. Notez que dans Vue, la principale forme de réutilisation et d'abstraction du code est les composants - cependant, il peut y avoir des cas où vous avez besoin d'un accès DOM de bas niveau sur des éléments simples, et c'est là que les directives personnalisées seraient toujours utiles. Un exemple serait de se concentrer sur un élément d'entrée de formulaire, comme celui-ci:

<common-codepen-snippet title="Custom directives: basic example" slug="JjdxaJW" :preview="false" />

Lorsque la page se charge, cet élément reçcoit le focus (note: `autofocus` ne fonctionne pas sur Safari mobile). En fait, si vous n'avez cliqué sur rien d'autre depuis la visite de cette page, le input ci-dessus devrait avoir le focus. En outre, vous pouvez cliquer sur le bouton `Rerun` et le input sera focalisée.

Maintenant, construisons la directive qui accomplit ceci:

```js
const app = Vue.createApp({})
// Enregistrez une directive personnalisée globale appelée `v-focus`
app.directive('focus', {
  //Lorsque l'élément lié est monté dans le DOM ...
  mounted(el) {
    // Focus sur  l'élément
    el.focus()
  }
})
```

Si vous souhaitez plutôt enregistrer une directive localement, les composants acceptent également une option `directives`:

```js
directives: {
  focus: {
    // définition de la directive
    mounted(el) {
      el.focus()
    }
  }
}
```

Ensuite, dans un template, vous pouvez utiliser le nouvel attribut `v-focus` sur n'importe quel élément, comme ceci:

```html
<input v-focus />
```

## Fonctions de hook

Un objet de définition de directive peut fournir plusieurs fonctions de hook (toutes facultatives):

- `created`: appelée avant que les attributs de l'élément lié ou les écouteurs d'événements ne soient appliqués. Ceci est utile dans les cas où la directive doit attacher des écouteurs d'événements qui doivent être appelés avant les écouteurs d'événement `v-on` normaux.

- `beforeMount`: appelée lorsque la directive est liée pour la première fois à l'élément et avant le montage du composant parent.

- `mounted`: appelée lorsque le composant parent de l'élément lié est monté

- `beforeUpdate`: appelée avant la mise à jour du VNode du composant conteneur

:::tip Note
Nous aborderons les VNodes plus en détail [plus tard](render-function.html#the-virtual-dom-tree), lorsque nous discuterons des fonctions de rendu.
:::

- `updated`: appelée après la mise à jour du VNode **du composant conteneur et des VNodes de ses enfants**.

- `beforeUnmount`: appelée avant que le composant parent de l'élément lié ne soit démonté

- `unmounted`: appelée une seule fois, lorsque la directive est indépendante de l'élément et que le composant parent est démonté.

Vous pouvez vérifier les arguments passés dans ces hooks (c-à-d `el`, `binding`, `vnode`, et `prevVnode`) dans l'[API Custom Directive](../api/application-api.html#directive)

### Arguments de directives dynamiques

Les arguments directive peuvent être dynamiques. Par exemple, dans `v-mydirective: [argument] ="value"`, l'`argument` peut être mis à jour en fonction des propriétés des données dans notre instance de composant! Cela rend nos directives personnalisées flexibles pour une utilisation dans toute notre application.

Supposons que vous souhaitiez créer une directive personnalisée qui vous permette d'épingler des éléments sur votre page en utilisant un positionnement fixe. Nous pourrions créer une directive personnalisée où la valeur met à jour le positionnement vertical en pixels, comme ceci:

```vue-html
<div id="dynamic-arguments-example" class="demo">
  <p>Scroll down the page</p>
  <p v-pin="200">Stick me 200px from the top of the page</p>
</div>
```

```js
const app = Vue.createApp({})

app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    // binding.value est la valeur que nous transmettons à la directive - dans ce cas, c'est 200
    el.style.top = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
```

Cela épinglerait l'élément à 200px du haut de la page. Mais que se passe-t-il si nous nous heurtons à un scénario lorsque nous devons épingler l'élément par la gauche, au lieu du haut? Voici où un argument dynamique qui peut être mis à jour par instance de composant est très pratique:

```vue-html
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      direction: 'right'
    }
  }
})

app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    // binding.arg est un argument que nous passons à la directive
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
```

Résultat:

<common-codepen-snippet title="Custom directives: dynamic arguments" slug="YzXgGmv" :preview="false" />
Notre directive personnalisée est maintenant suffisamment flexible pour prendre en charge quelques cas d'utilisation différents. Pour le rendre encore plus dynamique, nous pouvons également permettre de modifier une valeur liée. Créons une propriété supplémentaire `pinPadding` et lions-la à `<input type="range">`

```vue-html{4}
<div id="dynamicexample">
  <h2>Scroll down the page</h2>
  <input type="range" min="0" max="500" v-model="pinPadding">
  <p v-pin:[direction]="pinPadding">Stick me {{ pinPadding + 'px' }} from the {{ direction }} of the page</p>
</div>
```

```js{5}
const app = Vue.createApp({
  data() {
    return {
      direction: 'right',
      pinPadding: 200
    }
  }
})
```

Étendons maintenant la logique de notre directive pour recalculer la distance à épingler lors de la mise à jour du composant:

```js{7-10}
app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  },
  updated(el, binding) {
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})
```

Résultat:

<common-codepen-snippet title="Custom directives: dynamic arguments + dynamic binding" slug="rNOaZpj" :preview="false" />

## Raccourci de fonction

Dans l'exemple précédent, vous voudrez peut-être le même comportement sur `mounted` et `updated`, mais ne vous souciez pas des autres hooks. Vous pouvez le faire en passant le callback à la directive:

```js
app.directive('pin', (el, binding) => {
  el.style.position = 'fixed'
  const s = binding.arg || 'top'
  el.style[s] = binding.value + 'px'
})
```

## Littéraux d'objet

Si votre directive a besoin de plusieurs valeurs, vous pouvez également transmettre un littéral d'objet JavaScript. N'oubliez pas que les directives peuvent prendre n'importe quelle expression JavaScript valide.

```vue-html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## Utilisation sur les composants

Lorsqu'elle est utilisée sur les composants, la directive personnalisée s'appliquera toujours au nœud racine du composant, de la même manière que les [attributs non prop](component-attrs.html).

```vue-html
<my-component v-demo="test"></my-component>
```

```js
app.component('my-component', {
  template: `
    <div> // la directive v-demo sera appliquée ici
      <span>Le contenu de mon composant</span>
    </div>
  `
})
```

Contrairement aux attributs, les directives ne peuvent pas être passées à un élément différent avec `v-bind="$attrs"`.

Avec la prise en charge de [fragments](/guide/migration/fragments.html#overview) les composants peuvent potentiellement avoir plus d'un nœud racine. Lorsqu'elle est appliquée à un composant multi-racine, la directive sera ignorée et un avertissement sera renvoyé.
