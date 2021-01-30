# Transitions de liste

Jusqu'à présent, nous avons géré les transitions pour:

- Des noeuds individuels
- Plusieurs nœuds où un seul est rendu à la fois

Alors qu'en est-il lorsque nous avons toute une liste d'éléments que nous voulons rendre simultanément, par exemple avec `v-for`? Dans ce cas, nous utiliserons le composant `<transition-group>`. Avant de plonger dans un exemple, il y a quelques choses importantes à savoir sur ce composant:

- Par défaut, il ne génère pas un élément wrapper, mais vous pouvez spécifier un élément à rendre avec l'attribut `tag`.
- [Les modes de transitions](/guide/transitions-enterleave#transition-modes) ne sont pas disponibles, parce que nous n'alternons plus entre des éléments qui s'excluent mutuellement.
- Les éléments à l'intérieur **doivent toujours** avoir un attribut `key` unique.
- Les classes de transition CSS seront appliquées aux éléments internes et non au groupe / conteneur lui-même.

## Transitions d'entrées/sorties des listes

Passons maintenant à un exemple, la transition entre l'entrée et la sortie en utilisant les mêmes classes CSS que nous avons utilisées précédemment:

```html
<div id="list-demo">
  <button @click="add">Ajouter</button>
  <button @click="remove">Supprimer</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" :key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```

```js
const Demo = {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    }
  }
}

Vue.createApp(Demo).mount('#list-demo')
```

```css
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
```

<common-codepen-snippet title="Transition List" slug="e1cea580e91d6952eb0ae17bfb7c379d" tab="js,result" :editable="false" :preview="false" />

Il y a un problème avec cet exemple. Lorsque vous ajoutez ou supprimez un élément, ceux qui l'entourent s'emboîtent instantanément dans leur nouvel emplacement au lieu de le faire tout en douceur. Nous réglerons cela plus tard.

## Mouvements de transition des listes

Le composant `<transition-group>` a une autre astuce dans sa manche. Il peut non seulement animer l'entrée et la sortie, mais aussi les changements de position. Le seul nouveau concept que vous devez connaître pour utiliser cette fonctionnalité est l'ajout de **la classe `v-move`**, qui est ajoutée lorsque les éléments changent de position. Comme les autres classes, son préfixe correspondra à la valeur d'un attribut `name` fourni et vous pouvez également spécifier manuellement une classe avec l'attribut `move-class`.

Cette classe est surtout utile pour spécifier le timing de transition et la courbe d'accélération, comme vous le verrez ci-dessous:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js"></script>

<div id="flip-list-demo">
  <button @click="shuffle">Mélanger</button>
  <transition-group name="flip-list" tag="ul">
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </transition-group>
</div>
```

```js
const Demo = {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    shuffle() {
      this.items = _.shuffle(this.items)
    }
  }
}

Vue.createApp(Demo).mount('#flip-list-demo')
```

```css
.flip-list-move {
  transition: transform 0.8s ease;
}
```

<common-codepen-snippet title="Transition-group example" slug="049211673d3c185fde6b6eceb8baebec" tab="html,result" :editable="false" :preview="false" />

Cela peut sembler magique, mais sous le capot, Vue utilise une technique d'animation appelée [FLIP](https://aerotwist.com/blog/flip-your-animations/) pour faire la transition en douceur des éléments de leur ancienne position à leur nouvelle position à l'aide de transformations.

Nous pouvons combiner cette technique avec notre implémentation précédente pour animer chaque changement possible de notre liste!

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>

<div id="list-complete-demo" class="demo">
  <button @click="shuffle">Mélanger</button>
  <button @click="add">Ajouter</button>
  <button @click="remove">Supprimer</button>
  <transition-group name="list-complete" tag="p">
    <span v-for="item in items" :key="item" class="list-complete-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```

```js
const Demo = {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle() {
      this.items = _.shuffle(this.items)
    }
  }
}

Vue.createApp(Demo).mount('#list-complete-demo')
```

```css
.list-complete-item {
  transition: all 0.8s ease;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
```

<common-codepen-snippet title="Transition-group example" slug="373b4429eb5769ae2e6d097fd954fd08" tab="js,result" :editable="false" :preview="false" />

::: tip
Une note importante est que ces transitions FLIP ne fonctionnent pas avec des éléments définis sur `display: inline`. Comme alternative, vous pouvez utiliser `display: inline-block` ou placer des éléments dans un contexte flex.
:::

Ces animations FLIP ne sont pas non plus limitées à un seul axe. Les éléments d'une grille multidimensionnelle peuvent être [transitionnés](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-list-move-transitions):

<!-- TODO: example -->

## Transitions de liste échelonnées

En communiquant avec les transitions JavaScript via des attributs de données, il est également possible d'échelonner les transitions dans une liste:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.4/gsap.min.js"></script>

<div id="demo">
  <input v-model="query" />
  <transition-group
    name="staggered-fade"
    tag="ul"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <li
      v-for="(item, index) in computedList"
      :key="item.msg"
      :data-index="index"
    >
      {{ item.msg }}
    </li>
  </transition-group>
</div>
```

```js
const Demo = {
  data() {
    return {
      query: '',
      list: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ]
    }
  },
  computed: {
    computedList() {
      var vm = this
      return this.list.filter(item => {
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    }
  }
}

Vue.createApp(Demo).mount('#demo')
```

<common-codepen-snippet title="Staggered Lists" slug="c2fc5107bd3025ceadea049b3ee44ec0" tab="js,result" :editable="false" :preview="false" />

## Transitions réutilisables

Les transitions peuvent être réutilisées via le système de composants de Vue. Pour créer une transition réutilisable, il suffit de placer un composant `<transition>` ou `<transition-group>` à la racine, puis de passer tous les enfants dans le composant de transition.

<!-- TODO: refactor to Vue 3 -->

Voici un exemple utilisant un template de composant:

```js
Vue.component('my-special-transition', {
  template: '\
    <transition\
      name="very-special-transition"\
      mode="out-in"\
      @before-enter="beforeEnter"\
      @after-enter="afterEnter"\
    >\
      <slot></slot>\
    </transition>\
  ',
  methods: {
    beforeEnter(el) {
      // ...
    },
    afterEnter(el) {
      // ...
    }
  }
})
```

Et les [composants fonctionnels](render-function.html#Functional-Components) sont particulièrement bien adaptés à cette tâche:

```js
Vue.component('my-special-transition', {
  functional: true,
  render: function(createElement, context) {
    var data = {
      props: {
        name: 'very-special-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // ...
        },
        afterEnter(el) {
          // ...
        }
      }
    }
    return createElement('transition', data, context.children)
  }
})
```

## Transitions dynamiques

Eh Oui, même les transitions dans Vue sont basées sur les données! L'exemple le plus basique d'une transition dynamique lie l'attribut `name` à une propriété dynamique.

```html
<transition :name="transitionName">
  <!-- ... -->
</transition>
```

Cela peut être utile lorsque vous avez défini des transitions/animations CSS à l'aide des conventions de classe de transition de Vue et que vous souhaitez basculer entre elles.

En réalité, tout attribut de transition peut être lié dynamiquement. Et ce ne sont pas seulement des attributs. Les hooks d'événement étant des méthodes, ils ont accès à toutes les données du contexte. Cela signifie qu'en fonction de l'état de votre composant, vos transitions JavaScript peuvent se comporter différemment.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

<div id="dynamic-fade-demo" class="demo">
  Fade In:
  <input type="range" v-model="fadeInDuration" min="0" :max="maxFadeDuration" />
  Fade Out:
  <input
    type="range"
    v-model="fadeOutDuration"
    min="0"
    :max="maxFadeDuration"
  />
  <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <p v-if="show">hello</p>
  </transition>
  <button v-if="stop" @click="stop = false; show = false">
    Start animating
  </button>
  <button v-else @click="stop = true">Stop it!</button>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      show: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      stop: true
    }
  },
  mounted() {
    this.show = false
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      var vm = this
      Velocity(
        el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: function() {
            done()
            if (!vm.stop) vm.show = false
          }
        }
      )
    },
    leave(el, done) {
      var vm = this
      Velocity(
        el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: function() {
            done()
            vm.show = true
          }
        }
      )
    }
  }
})

app.mount('#dynamic-fade-demo')
```

<!-- TODO: example -->

Enfin, le moyen ultime de créer des transitions dynamiques consiste à utiliser des composants qui acceptent des props pour changer la nature de la ou des transitions à utiliser. Cela peut sembler ringard, mais la seule limite est vraiment votre imagination.
