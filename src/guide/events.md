# Gestion des Événements

## Écouter des événements

Nous pouvons utiliser la directive `v-on`, que nous raccourcissons généralement au symbole `@`, pour écouter les événements DOM et exécuter du JavaScript lorsqu'ils sont déclenchés. L'utilisation serait `v-on:click="methodName"` ou avec le raccourci, `@click ="methodName"`

Par exemple:

```html
<div id="basic-event">
  <button @click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      counter: 0
    }
  }
}).mount('#basic-event')
```

Résultat:

<common-codepen-snippet title="Event handling: basic" slug="xxGadPZ" tab="html,result" :preview="false" />

## Méthodes des gestionnaires d’évènements

La logique de nombreux gestionnaires d'événements sera plus complexe, il n'est pas possible de conserver votre JavaScript dans la valeur de l'attribut `v-on`. C'est pourquoi `v-on` peut également accepter le nom d'une méthode que vous souhaitez appeler.

Par exemple:

```html
<div id="event-with-method">
  <!-- `greet` est le nom d'une méthode définit plus bas -->
  <button @click="greet">Greet</button>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    greet(event) {
      // `this` à l'intérieur de methods pointe vers l'instance active courante
      alert('Hello ' + this.name + '!')
      // `event` est l'événement natif DOM
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}).mount('#event-with-method')
```

Résultat:

<common-codepen-snippet title="Event handling: with a method" slug="jOPvmaX" tab="js,result" :preview="false" />

## Gestionnaires de Méthodes en Inline

Au lieu de lier directement un nom de méthode, nous pouvons également utiliser des méthodes dans une instruction JavaScript inligne:

```html
<div id="inline-handler">
  <button @click="say('hi')">Say hi</button>
  <button @click="say('what')">Say what</button>
</div>
```

```js
Vue.createApp({
  methods: {
    say(message) {
      alert(message)
    }
  }
}).mount('#inline-handler')
```

Résultat:

<common-codepen-snippet title="Event handling: with an inline handler" slug="WNvgjda" tab="html,result" :preview="false" />

Parfois, nous devons également accéder à l'événement DOM d'origine dans un gestionnaire d'instructions en inligne. Vous pouvez le passer dans une méthode en utilisant la variable spéciale `$event`:

```html
<button @click="warn('Form cannot be submitted yet.', $event)">
  Soumettre
</button>
```

```js
// ...
methods: {
  warn(message, event) {
    // maintenant nous avons accès à l'événement natif
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

## Gestionnaires d'Événement multiple

Vous pouvez avoir plusieurs méthodes dans un gestionnaire d'événements séparées par une virgule comme ci-dessous:

```html
<!-- one() et two() s'exécuteront en cliquant sur le bouton -->
<button @click="one($event), two($event)">
  Soumettre
</button>
```

```js
// ...
methods: {
  one(event) {
    // logique du premier gestionnaire...
  },
  two(event) {
    // logique du deuxième gestionnaire..
  }
}
```

## Modificateurs d'Événements

Il est très courant d'appeler `event.preventDefault()` ou `event.stopPropagation()` à l'intérieur des gestionnaires d'événements. Bien que nous puissions le faire facilement à l'intérieur des méthodes, il serait préférable que les méthodes ne concernent que la logique des données plutôt que d'avoir à gérer les détails des événements DOM.

Pour résoudre ce problème, Vue fournit des **modificateurs d'événements** pour `v-on`. Rappelez-vous que les modificateurs sont des suffixes de directive désignés par un point.

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- la propagation de l'événement de clic sera arrêtée -->
<a @click.stop="doThis"></a>

<!-- l'événement submit ne rechargera plus la page -->
<form @submit.prevent="onSubmit"></form>

<!-- les modificateurs peuvent être enchaînés -->
<a @click.stop.prevent="doThat"></a>

<!-- juste le modificateur -->
<form @submit.prevent></form>

<!-- utiliser le mode capture lors de l'ajout de l'écouteur d'événements -->
<!-- c-à-d un événement ciblant un élément interne est traité ici avant d'être géré par cet élément -->
<div @click.capture="doThis">...</div>

<!-- ne déclenche le gestionnaire que si event.target est l'élément lui-même -->
<!-- c-à-d ne provenant pas d'un élément enfant -->
<div @click.self="doThat">...</div>
```

::: tip
L'ordre est important lors de l'utilisation des modificateurs, car le code pertinent est généré dans le même ordre. Par conséquent, l'utilisation de `@click.prevent.self` empêchera **tous les clics** tandis que`@click.self.prevent` n'empêchera que les clics sur l'élément lui-même.
:::

```html
<!-- l'événement clic sera déclenché au plus une fois -->
<a @click.once="doThis"></a>
```

Contrairement aux autres modificateurs, qui sont exclusifs aux événements DOM natifs, le modificateur `.once` peut également être utilisé sur les [événements de composant](component-custom-events.html). Si vous n'avez pas encore lu sur les composants, ne vous inquiétez pas pour le moment.

Vue propose également le modificateur `.passive`, correspondant à l'option `passive` de [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters).

```html
<!-- le comportement par défaut de l'événement scroll (défilement) se produira -->
<!-- immédiatement, au lieu d'attendre que `onScroll` se termine -->
<!-- au cas où il contiendrait `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>
```

Le modificateur `.passive` est particulièrement utile pour améliorer les performances sur les appareils mobiles.

::: tip
N'utilisez pas `.passive` et` .prevent` ensemble, car `.prevent` sera ignoré et votre navigateur vous montrera probablement un avertissement. Souvenez-vous que `.passive` indique au navigateur que vous ne souhaitez _pas_ empêcher le comportement par défaut de l'événement.
:::

## Modificateurs des touches clavier 

Lors de l'écoute d'événements de clavier, nous devons souvent vérifier des touches spécifiques. Vue permet d'ajouter des modificateurs de clé de touche pour `v-on` ou `@` lors de l'écoute des événements du clavier:

```html
<!-- appele `vm.submit()` seulement lorsque la `touche` appuyée est `Entrée` -->
<input @keyup.enter="submit" />
```

Vous pouvez utiliser directement tous les noms de touches valides exposés via [`KeyboardEvent.key`]

Vous pouvez utiliser directement tous les noms de touches valides exposés via [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) comme modificateurs en les convertissant en kebab-case.

```html
<input @keyup.page-down="onPageDown" />
```

Dans l'exemple ci-dessus, le gestionnaire ne sera appelé que si `$event.key` est égal à `'PageDown'`.

### Alias des touches du clavier

Vue fournit des alias pour les touches les plus couramment utilisées:

- `.enter`
- `.tab`
- `.delete` (capture à la fois les touches "Delete" et "Backspace")
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

## Touches de modification système

Vous pouvez utiliser les modificateurs suivants pour déclencher les écouteurs d'événements de la souris ou du clavier uniquement lorsque la touche de modification correspondante est enfoncée:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Note
Sur les claviers Macintosh, meta est la touche de commande (⌘). Sur les claviers Windows, meta est la touche Windows (⊞). Sur les claviers Sun Microsystems, meta est marqué comme un losange plein (◆). Sur certains claviers, en particulier les claviers et successeurs de machines MIT et Lisp, tels que le clavier Knight, le clavier Space-Cadet, meta est étiqueté «META». Sur les claviers Symbolics, meta est étiqueté «META» ou «Meta».
:::

Par exemple:

```html
<!-- Alt + Entrée -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Fais quelque chose</div>
```

::: tip
Notez que les touches de modification sont différentes des touches normales et lorsqu'elles sont utilisées avec des événements `keyup`, elles doivent être pressées lorsque l'événement est émis. En d'autres termes, `keyup.ctrl` ne se déclenchera que si vous relâchez une touche tout en maintenant `ctrl`. Il ne se déclenchera pas si vous relâchez la touche `ctrl` seule
:::

### Modificateur `.exact` 

Le modificateur `.exact` permet de contrôler la combinaison exacte de modificateurs système nécessaires pour déclencher un événement.

```html
<!-- ceci se déclenchera même si Alt ou Shift est également enfoncé -->
<button @click.ctrl="onClick">A</button>

<!-- ceci ne se déclenchera que lorsque Ctrl et aucune autre touche ne sera enfoncée -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- ceci ne se déclenchera que si aucun modificateur système n'est pressé -->
<button @click.exact="onClick">A</button>
```

### Modificateurs des bouton de souris

- `.left`
- `.right`
- `.middle`

Ces modificateurs limitent le gestionnaire aux événements déclenchés par un bouton de souris spécifique.

## Pourquoi les écouteurs en HTML?

Vous craignez peut-être que toute cette approche d’écoute d’événements enfreigne les bonnes vieilles règles sur la «séparation des préoccupations». Soyez assuré - puisque toutes les fonctions et expressions du gestionnaire Vue sont strictement liées au ViewModel qui gère la vue actuelle, cela ne causera aucune difficulté de maintenance. En fait, il y a plusieurs avantages à utiliser `v-on` ou `@`:

1. Il est plus facile de localiser les implémentations de fonction de gestionnaire dans votre code JS en survolant le template HTML.

2. Puisque vous n'avez pas à attacher manuellement des écouteurs d'événements dans JS, votre code ViewModel peut être purement logique et sans DOM. Cela facilite le test.

3. Lorsqu'un ViewModel est détruit, tous les écouteurs d'événements sont automatiquement supprimés. Vous n'avez pas à vous soucier de le nettoyer vous-même.
