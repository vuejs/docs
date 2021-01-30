# Transitions d'état

Le système de transition de Vue offre de nombreuses façons simples d'animer les entrées, les sorties et les listes, mais qu'en est-il de l'animation de vos données elles-mêmes? Par exemple:

- les nombres et les calculs
- les couleurs affichées
- la position des noeuds SVG
- la taille et autre propriétés des éléments

Tous ces éléments sont déjà stockés sous forme de nombres bruts ou peuvent être convertis en nombres. Une fois que nous faisons cela, nous pouvons animer ces changements d'état à l'aide de librairies tierces pour interpoler l'état, en combinaison avec la réactivité de Vue et les systèmes de composants.

## Animation de l'état avec les observateurs

Les observateurs nous permettent d'animer les changements de toute propriété numérique dans une autre propriété. Cela peut sembler compliqué dans l'abstrait, alors plongeons-nous dans un exemple utilisant [GreenSock](https://greensock.com/):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"></script>

<div id="animated-number-demo">
  <input v-model.number="number" type="number" step="20" />
  <p>{{ animatedNumber }}</p>
</div>
```

```js
const Demo = {
  data() {
    return {
      number: 0,
      tweenedNumber: 0
    }
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0)
    }
  },
  watch: {
    number(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue })
    }
  }
}

Vue.createApp(Demo).mount('#animated-number-demo')
```

<common-codepen-snippet title="Transitioning State 1" slug="22903bc3b53eb5b7817378ecb985ce96" tab="js,result" :editable="false" :preview="false" />

Lorsque vous mettez à jour le numéro, la modification est animée sous l'entrée de formulaire.

## Transitions d'états dynamiques

Comme pour les composants de transition de Vue, les transitions d'état de sauvegarde des données peuvent être mises à jour en temps réel, ce qui est particulièrement utile pour le prototypage! Même en utilisant un simple polygone SVG, vous pouvez obtenir de nombreux effets qui seraient difficiles à concevoir jusqu'à ce que vous ayez un peu joué avec les variables.

<common-codepen-snippet title="Updating SVG" slug="a8e00648d4df6baa1b19fb6c31c8d17e" :height="500" tab="js,result" :editable="false" />

## Organisation des transitions en composants

La gestion de nombreuses transitions d'état peut rapidement augmenter la complexité d'une instance de composant. Heureusement, de nombreuses animations peuvent être extraites dans des composants enfants dédiés. Faisons cela avec le nombre entier animé de notre exemple précédent:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"></script>

<div id="app">
  <input v-model.number="firstNumber" type="number" step="20" /> +
  <input v-model.number="secondNumber" type="number" step="20" /> = {{ result }}
  <p>
    <animated-integer :value="firstNumber"></animated-integer> +
    <animated-integer :value="secondNumber"></animated-integer> =
    <animated-integer :value="result"></animated-integer>
  </p>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      firstNumber: 20,
      secondNumber: 40
    }
  },
  computed: {
    result() {
      return this.firstNumber + this.secondNumber
    }
  }
})

app.component('animated-integer', {
  template: '<span>{{ fullValue }}</span>',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tweeningValue: 0
    }
  },
  computed: {
    fullValue() {
      return Math.floor(this.tweeningValue)
    }
  },
  methods: {
    tween(newValue, oldValue) {
      gsap.to(this.$data, {
        duration: 0.5,
        tweeningValue: newValue,
        ease: 'sine'
      })
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(newValue, oldValue)
    }
  },
  mounted() {
    this.tween(this.value, 0)
  }
})

app.mount('#app')
```

<common-codepen-snippet title="State Transition Components" slug="e9ef8ac7e32e0d0337e03d20949b4d17" tab="js,result" :editable="false" />

Nous pouvons maintenant composer plusieurs états avec ces composants enfants. C'est passionnant - nous pouvons utiliser n'importe quelle combinaison de stratégies de transition qui ont été couvertes sur cette page, avec celles offertes par le [système de transition intégré](transitions-enterleave.html) de Vue. Ensemble, il y a très peu de limites à ce qui peut être accompli.

Vous pouvez voir comment nous pourrions l'utiliser pour la visualisation des données, pour les effets physiques, pour les animations et les interactions de personnages, comme on le dit the sky's the limit.

## Donner vie aux designs

Animer, par définition, signifie donner vie. Malheureusement, lorsque les concepteurs créent des icônes, des logos et des mascottes, ils sont généralement livrés sous forme d'images ou de SVG statiques. Ainsi, bien que l'octocat de GitHub, l'oiseau de Twitter et de nombreux autres logos ressemblent à des créatures vivantes, ils ne semblent pas vraiment vivants..

Vue peut vous aider. Puisque les SVG ne sont que des données, nous n'avons besoin que d'exemples de ce à quoi ces créatures ressemblent lorsqu'elles sont excitées, réfléchies ou alarmées. Ensuite, Vue peut vous aider à faire la transition entre ces états, rendant vos pages d'accueil, vos indicateurs de chargement et vos notifications plus attrayants sur le plan émotionnel.

Sarah Drasner le démontre dans la démo ci-dessous, en utilisant une combinaison de changements d'état chronométrés et basés sur l'interactivité::

<common-codepen-snippet title="Vue-controlled Wall-E" slug="YZBGNp" :height="400" :team="false" user="sdras" name="Sarah Drasner" :editable="false" :preview="false" version="2" theme="light" />
