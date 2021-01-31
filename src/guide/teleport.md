# Teleport

<VideoLesson href="https://vueschool.io/lessons/vue-3-teleport?friend=vuejs" title="Learn how to use teleport with Vue School">Apprenez à utiliser teleport avec une leçon gratuite sur Vue School (EN)</VideoLesson>

Vue nous encourage à créer nos interfaces utilisateur (UI) en encapsulant l'UI et le comportement associé dans des composants. Nous pouvons les imbriquer les uns dans les autres pour créer une arborescence qui constitue une UI d'application.

Cependant, parfois une partie du template d'un composant appartient logiquement à ce composant, alors que d'un point de vue technique, il serait préférable de déplacer cette partie du template ailleurs dans le DOM, en dehors de l'application Vue.

Un scénario courant pour cela consiste à créer un composant qui inclut une fénètre modale plein écran. Dans la plupart des cas, vous voudriez que la logique du modal vive dans le composant, mais le positionnement du modal devient rapidement difficile à résoudre via CSS, ou nécessite un changement dans la composition du composant.

Considérez la structure HTML suivante.

```html
<body>
  <div style="position: relative;">
    <h3>Info-bulles avec la téléportation Vue 3</h3>
    <div>
      <modal-button></modal-button>
    </div>
  </div>
</body>
```

Le composant aura un élément `button` pour déclencher l'ouverture du modal, et un élément `div` avec une classe de `.modal`, qui contiendra le contenu du modal et un bouton pour se fermer automatiquement.

```js
const app = Vue.createApp({})

app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
      Ouvrir la fénètre modale plein écran!
    </button>

    <div v-if="modalOpen" class="modal">
      <div>
        Je suis une fénètre modale! 
        <button @click="modalOpen = false">
          Fermer
        </button>
      </div>
    </div>
  `,
  data() {
    return {
      modalOpen: false
    }
  }
})
```

Lorsque vous utilisez ce composant dans la structure HTML initiale, nous pouvons voir un problème - le modal est rendu à l'intérieur du `div` profondément imbriqué et le `position: absolute` du modal prend le parent `div` relativement positionné comme référence.

Teleport fournit un moyen propre de nous permettre de contrôler sous quel parent dans notre DOM nous voulons qu'un morceau de HTML soit rendu, sans avoir à recourir à l'état global ou à le diviser en deux composants.

Modifions notre `bouton-modal` pour utiliser `<teleport>`et disons à Vue "**téléporte** ce HTML **dans** la balise "**body**" ".

```js
app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
       Ouvrir la fénètre modale plein écran!
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          Je suis une fénètre modale téléportée! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Fermer
          </button>
        </div>
      </div>
    </teleport>
  `,
  data() {
    return {
      modalOpen: false
    }
  }
})
```

En conséquence, une fois que nous cliquons sur le bouton pour ouvrir le modal, Vue rendra correctement le contenu du modal en tant qu'enfant de la balise `body`.

<common-codepen-snippet title="Vue 3 Teleport" slug="gOPNvjR" tab="js,result" />

## Utilisation avec les composants Vue

Si `<teleport>` contient un composant Vue, il restera un composant enfant logique du parent de `<teleport>` :

```js
const app = Vue.createApp({
  template: `
    <h1>Root instance</h1>
    <parent-component />
  `
})

app.component('parent-component', {
  template: `
    <h2>Ceci est un composant parent</h2>
    <teleport to="#endofbody">
      <child-component name="John" />
    </teleport>
  `
})

app.component('child-component', {
  props: ['name'],
  template: `
    <div>Hello, {{ name }}</div>
  `
})
```

Dans ce cas, même lorsque `child-component` est rendu à un endroit différent, il restera un enfant de `parent-component` et recevra un accessoire `name` de celui-ci.

Cela signifie également que les injections d'un composant parent fonctionnent comme prévu et que le composant enfant sera imbriqué sous le composant parent dans Vue Devtools, au lieu d'être placé là où le contenu réel a été déplacé.

## Utilisation de plusieurs téléports sur la même cible

Un scénario d'utilisation courant serait un composant `<Modal>` réutilisable dont il pourrait y avoir plusieurs instances actives en même temps. Pour ce type de scénario, plusieurs composants `<teleport>` peuvent monter leur contenu sur le même élément cible. L'ordre sera un simple ajout - les montages ultérieurs seront situés après les précédents dans l'élément cible.

```html
<teleport to="#modals">
  <div>A</div>
</teleport>
<teleport to="#modals">
  <div>B</div>
</teleport>

<!-- résultat-->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

Vous pouvez vérifier les options du composant `<teleport>` dans la [Référence API](../api/built-in-components.html#teleport).
