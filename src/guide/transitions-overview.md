# Vue d'ensemble

Vue propose des abstractions qui peuvent aider à travailler avec des transitions et des animations, en particulier en réponse à quelque chose qui change. Certaines de ces abstractions incluent:

- Hooks pour les composants entrant et sortant du DOM, à la fois en CSS et JS, en utilisant le composant intégré `<transition>`.
- Modes de transition afin que vous puissiez orchestrer l'ordre pendant une transition.
- Hooks pour quand plusieurs éléments sont mis à jour en position, avec des techniques FLIP appliquées sous le capot pour augmenter les performances, en utilisant le composant `<transition-group>`.
- Transition de différents états dans une application, avec `watchers`.

Nous couvrirons tout cela et bien plus dans les trois prochaines sections de ce guide. Cependant, en plus de ce qu'offre ces API utiles, il convient de mentionner que les déclarations de classe et de style que nous avons couvertes précédemment peuvent également être utilisées pour appliquer des animations et des transitions, pour des cas d'utilisation plus simples.

Dans cette section suivante, nous passerons en revue quelques notions de base sur l'animation Web et les transitions, et nous établirons un lien vers certaines ressources pour une exploration plus approfondie. Si vous êtes déjà familier avec l'animation Web et comment ces principes peuvent fonctionner avec certaines des directives de Vue, n'hésitez pas à ignorer la section suivante. Si vous souhaitez en savoir un peu plus sur les bases de l'animation Web avant de vous lancer, poursuivez votre lecture.

## Animations et transitions basées sur les classes

Bien que le composant `<transition>` puisse être merveilleux pour les composants entrant et sortant, vous pouvez également activer une animation sans monter de composant, en ajoutant une classe conditionnelle.

```html
<div id="demo">
  Push this button to do something you shouldn't be doing:<br />

  <div :class="{ shake: noActivated }">
    <button @click="noActivated = true">Click me</button>
    <span v-if="noActivated">Oh no!</span>
  </div>
</div>
```

```css
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

```js
const Demo = {
  data() {
    return {
      noActivated: false
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

<common-codepen-snippet title="Create animation with a class" slug="ff45b91caf7a98c8c9077ad8ab539260" tab="css,result" :editable="false" :preview="false" />

## Transitions avec liaisons de style

Certains effets de transition peuvent être appliqués en interpolant des valeurs, par exemple en liant un style à un élément lors d'une interaction. Prenons cet exemple par exemple:

```html
<div id="demo">
  <div
    @mousemove="xCoordinate"
    :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
    class="movearea"
  >
    <h3>Move your mouse across the screen...</h3>
    <p>x: {{x}}</p>
  </div>
</div>
```

```css
.movearea {
  transition: 0.2s background-color ease;
}
```

```js
const Demo = {
  data() {
    return {
      x: 0
    }
  },
  methods: {
    xCoordinate(e) {
      this.x = e.clientX
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

<common-codepen-snippet title="Interpolation with style bindings" slug="JjGezQY" :editable="false" />

Dans cet exemple, nous créons une animation grâce à l'utilisation de l'interpolation, attachée au mouvement de la souris. La transition CSS est également appliquée à l'élément, pour indiquer à l'élément quel type d'accélération à utiliser lors de sa mise à jour.

## Performance

Vous remarquerez peut-être que les animations présentées ci-dessus utilisent des choses comme `transform`, et appliquent des propriétés étranges comme `perspective` - pourquoi ont-elles été construites de cette façon au lieu d'utiliser simplement `margin` et `top` etc?

Nous pouvons créer des animations extrêmement fluides sur le Web en étant conscients des performances. Nous voulons accélérer les éléments matériels lorsque nous le pouvons et utiliser des propriétés qui ne déclenchent pas de repeintes. Voyons comment nous pouvons y parvenir.

### Transform et Opacity

Nous pouvons vérifier des ressources comme [CSS-Triggers](https://csstriggers.com/) pour voir quelles propriétés déclencheront des repeintes si nous les animons. Ici, si vous regardez sous `transform`, vous verrez:

> La modification de "transform" ne déclenche aucune modification de géométrie ni aucune peinture, ce qui est très bien. Cela signifie que l'opération peut probablement être effectuée par le thread du compositeur à l'aide du GPU.

L'opacité se comporte de la même manière. Ainsi, ils sont des candidats idéaux pour les mouvements sur le web.

### Accélération matérielle

Des propriétés telles que `perspective`, `backface-visibility`, et `transform: translateZ(x)` permettront au navigateur de savoir que vous avez besoin d'une accélération matérielle.

Si vous souhaitez accélérer matériellement un élément, vous pouvez appliquer l'une de ces propriétés (toutes ne sont pas nécessaires, une seule):

```css
perspective: 1000px;
backface-visibility: hidden;
transform: translateZ(0);
```

De nombreuses libairies JS comme GreenSock supposeront que vous souhaitez une accélération matérielle et les appliqueront par défaut, vous n'avez donc pas besoin de les définir manuellement.

## Timing

Pour les transitions d'interface utilisateur simples, c'est-à-dire d'un état à un autre sans états intermédiaires, il est courant d'utiliser des temporisations entre 0,1 s et 0,4 s, et la plupart des gens trouvent que _0,25 s_ a tendance à être un point idéal. Pouvez-vous utiliser ce timing pour tout? Non, pas vraiment. Si vous avez quelque chose qui doit se déplacer sur une plus grande distance ou qui a plus d'étapes ou de changements d'état, 0,25 s ne fonctionnera pas aussi bien et vous devrez être beaucoup plus intentionnel, et le timing devra être plus unique. Cela ne signifie pas pour autant que vous ne pouvez pas avoir de bons paramètres par défaut que vous répétez dans votre application.

Vous pouvez également constater que les entrées sont meilleures avec un peu plus de temps qu'une sortie. L'utilisateur est typiquement guidé lors de l'entrée, et est un peu moins patient à la sortie car il souhaite continuer son chemin.

## Easing (accélération)

Le "easing" est un moyen important de donner de la profondeur dans une animation. L'une des erreurs les plus courantes commises par les nouveaux arrivants dans l'animation est d'utiliser `ease-in` pour les entrées et `ease-out` pour les sorties. Vous aurez en fait besoin du contraire.

Si nous devions appliquer ces états à une transition, cela ressemblerait à quelque chose comme ça:

```css
.button {
  background: #1b8f5a;
  /*  appliqué à l'état initial, donc cette transition sera appliquée à l'état de retour */
  transition: background 0.25s ease-in;
}

.button:hover {
  background: #3eaf7c;
  /* appliqué à l'état de survol, donc cette transition sera appliquée lorsqu'un survol est déclenché */
  transition: background 0.35s ease-out;
}
```

<common-codepen-snippet title="Transition Ease Example" slug="996a9665131e7902327d350ca8a655ac" tab="css,result" :editable="false" :preview="false" />

Le "easing" peut également transmettre la qualité du matériel animé. Prenez ce codepen par exemple, quelle balle pensez-vous être dure et laquelle est molle?

<common-codepen-snippet title="Bouncing Ball Demo" slug="zxJWBJ" :height="500" :team="false" user="sdras" name="Sarah Drasner" :editable="false" />

Vous pouvez obtenir de nombreux effets uniques et rendre votre animation très élégante en ajustant votre _easing_. CSS vous permet de modifier cela en ajustant une propriété bezier cubique, [ce playground](https://cubic-bezier.com/#.17,.67,.83,.67) par Lea Verou est très utile pour explorer cela .

Bien que vous puissiez obtenir de superbes effets pour une animation simple avec les deux poignées offertes par la facilité cubique-bezier, JavaScript permet plusieurs poignées et, par conséquent, permet beaucoup plus de variance.

![Ease Comparison](/images/css-vs-js-ease.svg)

Prenez un rebond, par exemple. En CSS, nous devons déclarer chaque image clé, de haut en bas. En JavaScript, nous pouvons exprimer tout ce mouvement dans la facilité, en déclarant `bounce` dans l '[API GreenSock (GSAP)](https://greensock.com/) (les autres librairies JS ont d'autres types de valeurs par défaut de easing).

Voici le code utilisé pour un rebond en CSS (exemple de animate.css):

```css
@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, -10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, 5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.bounceInDown {
  animation-name: bounceInDown;
}
```

And here is the same bounce in JS using GreenSock:

```js
gsap.from(element, { duration: 1, ease: 'bounce.out', y: -500 })
```

Nous utiliserons GreenSock dans certains des exemples des sections suivantes. Ils ont un excellent [visualiseur de _ease_](https://greensock.com/ease-visualizer) qui vous aidera à créer des easings bien conçues.

## Lectures complémentaires

- [Designing Interface Animation: Improving the User Experience Through Animation by Val Head](https://www.amazon.com/dp/B01J4NKSZA/)
- [Animation at Work by Rachel Nabors](https://abookapart.com/products/animation-at-work)
