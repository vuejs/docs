# Entrées et Sorties des transitions

Vue fournit une variété de façons d'appliquer des effets de transition lorsque des éléments sont insérés, mis à jour ou supprimés du DOM. Cela comprend des outils pour:

- appliquer automatiquement des classes pour les transitions et animations CSS
- intégrer des librairies d'animation CSS tierces, telles que [Animate.css](https://animate.style/)
- utiliser JavaScript pour manipuler directement le DOM pendant les hooks de transition
- intégrer des bibliothèques d'animation JavaScript tierces

Sur cette page, nous ne couvrirons que l'entrée et la sortie, mais vous pouvez voir les sections suivantes pour [les transitions de liste](transitions-list.html) et la[gestion des transitions d'état](transitions-state.html).

## Transition d'éléments/composants uniques

Vue fournit un composant wrapper `transition`, vous permettant d'ajouter des transitions d'entrée/sortie pour tout élément ou composant dans les contextes suivants:

- Rendu conditionnel (utilisant `v-if`)
- Affichage conditionnel (utilisant `v-show`)
- Composant dynamique
- noeuds racine du composant

Voici à quoi ressemble un exemple en action:

```html
<div id="demo">
  <button @click="show = !show">
    Toggle
  </button>

  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: true
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

<common-codepen-snippet title="Simple Transition Component" slug="3466d06fb252a53c5bc0a0edb0f1588a" tab="html,result" :editable="false" />

Lorsqu'un élément entourré d'un composant `transition` est inséré ou supprimé, voici ce qui se passe:

1. Vue détectera automatiquement si l'élément cible a des transitions CSS ou des animations appliquées. Si c'est le cas, les classes de transition CSS seront ajoutées/supprimées aux moments appropriés.

2. Si le composant de transition a fourni des [hooks JavaScript](#hooks-javascript), ces hooks seront appelés au moment approprié.

3. Si aucune transitions/animations CSS n'est détectée et aucun hook JavaScript n'est fourni, les opérations DOM pour l'insertion et / ou la suppression seront exécutées immédiatement sur l'image suivante (Remarque: il s'agit d'un cadre d'animation de navigateur, différent du concept de Vue de `nextTick`) .

### Classes de transition

Il y a six classes appliquées pour les transitions d'entrée / sortie.

1. `v-enter-from`: État de départ pour entrer. Ajouté avant l'insertion de l'élément, supprimé une frame après l'insertion de l'élément.

2. `v-enter-active`: État actif pour entrer. Appliqué pendant toute la phase d'entrée. Ajouté avant l'insertion de l'élément, supprimé lorsque la transition/animation se termine. Cette classe peut être utilisée pour définir la durée, le délai et la courbe d'accélération de la transition entrante.

3. `v-enter-to`: État de fin pour entrer. Ajouté une frame après l'insertion de l'élément (en même temps que `v-enter-from` est supprimé), supprimé lorsque la transition/animation se termine.

4. `v-leave-from`: État de départ pour la sortie. Ajouté immédiatement lorsqu'une transition de sortie est déclenchée, supprimé après une frame.

5. `v-leave-active`: État actif pour la sortie. Appliqué pendant toute la phase de sortie. Ajouté immédiatement lorsqu'une transition de sortie est déclenchée, supprimé lorsque la transition/animation se termine. Cette classe peut être utilisée pour définir la durée, le délai et la courbe d'accélération de la transition de sortie
   .

6. `v-leave-to`: État de fin de sortie. Ajouté une frame après le déclenchement d'une transition de sortie (en même temps que `v-leave-from` est supprimé), supprimé lorsque la transition/animation se termine.

![Transition Diagram](/images/transitions.svg)

Chacune de ces classes sera précédée du nom de la transition. Ici, le préfixe `v-` est la valeur par défaut lorsque vous utilisez un élément `<transition>` sans nom. Si vous utilisez par exemple `<transition name="my-transition">` alors la classe `v-enter-from` sera à la place `my-transition-enter-from`.

`v-enter-active` et `v-leave-active` vous donnent la possibilité de spécifier différentes courbes d'accélération pour les transitions entrée/sortie, dont vous verrez un exemple dans la section suivante.

### Transitions CSS

L'un des types de transition les plus courants utilise des transitions CSS. Voici un exemple:

```html
<div id="demo">
  <button @click="show = !show">
    Toggle render
  </button>

  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: true
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

```css
/* Les animations d'entrée et de sortie peuvent utiliser */
/* différentes durées et fonctions de timing.            */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

<common-codepen-snippet title="Different Enter and Leave Transitions" slug="0dfa7869450ef43d6f7bd99022bc53e2" tab="css,result" :editable="false" />

### Animations CSS

Les animations CSS sont appliquées de la même manière que les transitions CSS, la différence étant que «v-enter-from» n'est pas supprimé immédiatement après l'insertion de l'élément, mais sur un événement `animationend`

Voici un exemple, en omettant les règles CSS préfixées par souci de concision:

```html
<div id="demo">
  <button @click="show = !show">Toggle show</button>
  <transition name="bounce">
    <p v-if="show">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis
      enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi
      tristique senectus et netus.
    </p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: true
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

<common-codepen-snippet title="CSS Animation Transition Example" slug="8627c50c5514752acd73d19f5e33a781" tab="html,result" :editable="false" />

### Classes de transition personnalisées

Vous pouvez également spécifier des classes de transition personnalisées en fournissant les attributs suivants:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

Ceux-ci remplaceront les noms de classe conventionnels. Ceci est particulièrement utile lorsque vous souhaitez combiner le système de transition de Vue avec une bibliothèque d'animation CSS existante, telle que [Animate.css](https://daneden.github.io/animate.css/).

Voici un exemple:

```html
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.0/animate.min.css"
  rel="stylesheet"
  type="text/css"
/>

<div id="demo">
  <button @click="show = !show">
    Toggle render
  </button>

  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: true
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

### Utilisation conjointe des transitions et des animations

Vue doit attacher des écouteurs d'événements afin de savoir quand une transition est terminée. Il peut s'agir de`transitionend` ou `animationend`, selon le type de règles CSS appliquées. Si vous n'utilisez que l'un ou l'autre, Vue peut détecter automatiquement le type correct.

Cependant, dans certains cas, vous voudrez peut-être avoir les deux sur le même élément, par exemple en ayant une animation CSS déclenchée par Vue, ainsi qu'un effet de transition CSS au survol. Dans ces cas, vous devrez déclarer explicitement le type dont vous voulez que Vue se soucie dans un attribut `type`, avec une valeur de `animation` ou `transition`.

### Durées de transition explicites

<!-- TODO: validate and provide an example -->

Dans la plupart des cas, Vue peut déterminer automatiquement quand la transition est terminée. Par défaut, Vue attend le premier événement `transitionend` ou `animationend` sur l'élément de transition racine. Cependant, cela peut ne pas toujours être souhaité - par exemple, nous pouvons avoir une séquence de transition chorégraphiée où certains éléments internes imbriqués ont une transition retardée ou une durée de transition plus longue que l'élément de transition racine.

Dans de tels cas, vous pouvez spécifier une durée de transition explicite (en millisecondes) en utilisant la prop `duration` sur le composant `<transition>`:

```html
<transition :duration="1000">...</transition>
```

Vous pouvez également spécifier des valeurs distinctes pour les durées d'entrée et de sortie:

```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### Hooks JavaScript

Vous pouvez également définir des hooks JavaScript dans les attributs:

```html
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"
  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
  :css="false"
>
  <!-- ... -->
</transition>
```

```js
// ...
methods: {
  // --------
  // ENTRÉE
  // --------

  beforeEnter(el) {
    // ...
  },
  // le callback "done" est facultatif lorsque
  // utilisé en combinaison avec CSS
  enter(el, done) {
    // ...
    done()
  },
  afterEnter(el) {
    // ...
  },
  enterCancelled(el) {
    // ...
  },

  // --------
  // SORTIE
  // --------

  beforeLeave(el) {
    // ...
  },
  // le callback "done" est facultatif lorsque
  // utilisé en combinaison avec CSS
  leave(el, done) {
    // ...
    done()
  },
  afterLeave(el) {
    // ...
  },
  // leaveCancelled disponible uniquement avec v-show
  leaveCancelled(el) {
    // ...
  }
}
```

Ces hooks peuvent être utilisés en combinaison avec des transitions/animations CSS ou seuls.

Lorsque vous utilisez des transitions JavaScript uniquement, **les callbacks `done` sont requis pour les hooks `enter` et `leave`**. Sinon, les hooks seront appelés de manière synchrone et la transition se terminera immédiatement. L'ajout de `: css =" false "` permettra également à Vue d'ignorer la détection CSS. En plus d'être légèrement plus performant, cela empêche également les règles CSS d'interférer accidentellement avec la transition.

Passons maintenant à un exemple. Voici une transition JavaScript utilisant [GreenSock](https://greensock.com/):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.4/gsap.min.js"></script>

<div id="demo">
  <button @click="show = !show">
    Toggle
  </button>

  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    :css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      show: false
    }
  },
  methods: {
    beforeEnter(el) {
      gsap.set(el, {
        scaleX: 0.8,
        scaleY: 1.2
      })
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 1,
        scaleX: 1.5,
        scaleY: 0.7,
        opacity: 1,
        x: 150,
        ease: 'elastic.inOut(2.5, 1)',
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.7,
        scaleX: 1,
        scaleY: 1,
        x: 300,
        ease: 'elastic.inOut(2.5, 1)'
      })
      gsap.to(el, {
        duration: 0.2,
        delay: 0.5,
        opacity: 0,
        onComplete: done
      })
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

<common-codepen-snippet title="JavaScript Hooks Transition" slug="68ce1b8c41d0a6e71ff58df80fd85ae5" tab="js,result" :editable="false" />

## Transitions sur le rendu initial

Si vous souhaitez également appliquer une transition sur le rendu initial d'un nœud, vous pouvez ajouter l'attribut `appear`:

```html
<transition appear>
  <!-- ... -->
</transition>
```

## Transition entre les éléments

Nous discuterons de la [transition entre les composants](#transitioning-between-components) plus tard, mais vous pouvez également effectuer la transition entre les éléments bruts en utilisant `v-if`/`v-else`. L'une des transitions à deux éléments les plus courantes se situe entre un conteneur de liste et un message décrivant une liste vide:

```html
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>Sorry, no items found.</p>
</transition>
```

Il est en fait possible de faire la transition entre n'importe quel nombre d'éléments, soit en utilisant `v-if`/`v-else-if`/`v-else` soit en liant un seul élément à une propriété dynamique. Par exemple:

<!-- TODO: rewrite example and put in codepen example -->

```html
<transition>
  <button v-if="docState === 'saved'" key="saved">
    Edit
  </button>
  <button v-else-if="docState === 'edited'" key="edited">
    Save
  </button>
  <button v-else-if="docState === 'editing'" key="editing">
    Cancel
  </button>
</transition>
```

qui pourrait aussi être comme-ceci:

```html
<transition>
  <button :key="docState">
    {{ buttonMessage }}
  </button>
</transition>
```

```js
// ...
computed: {
  buttonMessage() {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```

### Modes de transition

Il reste cependant un problème. Essayez de cliquer sur le bouton ci-dessous:

<common-codepen-snippet title="Transition Modes Button Problem" slug="Rwrqzpr" :editable="false" />

Lors de la transition entre le bouton "on" et le bouton "off", les deux boutons sont rendus - l'un sortant tandis que l'autre entrant. C'est le comportement par défaut de `<transition>` - l'entrée et la sortie se produisent simultanément.

Parfois, cela fonctionne très bien, comme lorsque les éléments de transition sont absolument positionnés les uns sur les autres:

<common-codepen-snippet title="Transition Modes Button Problem- positioning" slug="abdQgLr" :editable="false" />

Parfois, ce n'est pas une option, cependant, ou nous avons affaire à des mouvements plus complexes où les états d'entrée et de sortie doivent être coordonnés, donc Vue offre un utilitaire extrêmement utile appelé **transition modes**:

- `in-out`: Le nouvel élément entre en premier, puis une fois terminé, l'élément courant sort.
- `out-in`: L'élément courant sort en premier, puis une fois terminé, le nouvel élément entre.

::: tip
Vous constaterez très vite que `out-in` est l'état que vous voudrez la plupart du temps :)
:::

Maintenant, mettons à jour la transition pour nos boutons on/off avec `out-in`:

```html
<transition name="fade" mode="out-in">
  <!-- ... les boutons ... -->
</transition>
```

<common-codepen-snippet title="Transition Modes Button Problem- solved" slug="ZEQmdvq" :editable="false" />

Avec l'ajout d'un attribut, nous avons corrigé cette transition d'origine sans avoir à ajouter de style spécial.

Nous pouvons l'utiliser pour coordonner des mouvements plus expressifs, comme une carte pliante, comme illustré ci-dessous. Ce sont en fait deux éléments qui font la transition entre eux, mais puisque les états de début et de fin sont mis à l'échelle de la même manière: horizontalement à 0, cela ressemble à un mouvement fluide. Ce type de tour de passe-passe peut être très utile pour les micro-interactions réalistes avec l'interface utilisateur:

<common-codepen-snippet title="Transition Modes Flip Cards" slug="76e344bf057bd58b5936bba260b787a8" :editable="false" />

## Transition entre les composants

La transition entre les composants est encore plus simple - nous n'avons même pas besoin de l'attribut `key`. Au lieu de cela, nous enveloppons un [composant dynamique](component-basics.html#dynamic-components):

```html
<div id="demo">
  <input v-model="view" type="radio" value="v-a" id="a" /><label for="a"
    >A</label
  >
  <input v-model="view" type="radio" value="v-b" id="b" /><label for="b"
    >B</label
  >
  <transition name="component-fade" mode="out-in">
    <component :is="view"></component>
  </transition>
</div>
```

```js
const Demo = {
  data() {
    return {
      view: 'v-a'
    }
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

```css
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
```

<common-codepen-snippet title="Transitioning between components" slug="WNwVxZw" tab="html,result" theme="39028" />
