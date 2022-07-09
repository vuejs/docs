# State Transitions

Vue's transition system offers many simple ways to animate entering, leaving, and lists, but what about animating your data itself? For example:

- numbers and calculations
- colors displayed
- the positions of SVG nodes
- the sizes and other properties of elements

All of these are either already stored as raw numbers or can be converted into numbers. Once we do that, we can animate these state changes using 3rd-party libraries to tween state, in combination with Vue's reactivity and component systems.

## Animating State with Watchers

Watchers allow us to animate changes of any numerical property into another property. That may sound complicated in the abstract, so let's dive into an example using [GreenSock](https://greensock.com/):

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

When you update the number, the change is animated below the input.

## Dynamic State Transitions

As with Vue's transition components, the data backing state transitions can be updated in real time, which is especially useful for prototyping! Even using a simple SVG polygon, you can achieve many effects that would be difficult to conceive of until you've played with the variables a little.

<common-codepen-snippet title="Updating SVG" slug="a8e00648d4df6baa1b19fb6c31c8d17e" :height="500" tab="js,result" :editable="false" />

## Organizing Transitions into Components

Managing many state transitions can quickly increase the complexity of a component instance. Fortunately, many animations can be extracted out into dedicated child components. Let's do this with the animated integer from our earlier example:

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

Now we can compose multiple states with these child components. It's exciting- we can use any combination of transition strategies that have been covered on this page, along with those offered by Vue's [built-in transition system](transitions-enterleave.html). Together, there are very few limits to what can be accomplished.

You can see how we could use this for data visualization, for physics effects, for character animations and interactions, the sky's the limit.

## Bringing Designs to Life

To animate, by one definition, means to bring to life. Unfortunately, when designers create icons, logos, and mascots, they're usually delivered as images or static SVGs. So although GitHub's octocat, Twitter's bird, and many other logos resemble living creatures, they don't really seem alive.

Vue can help. Since SVGs are just data, we only need examples of what these creatures look like when excited, thinking, or alarmed. Then Vue can help transition between these states, making your welcome pages, loading indicators, and notifications more emotionally compelling.

Sarah Drasner demonstrates this in the demo below, using a combination of timed and interactivity-driven state changes:

<common-codepen-snippet title="Vue-controlled Wall-E" slug="YZBGNp" :height="400" :team="false" user="sdras" name="Sarah Drasner" :editable="false" :preview="false" version="2" theme="light" />
