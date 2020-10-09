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

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="22903bc3b53eb5b7817378ecb985ce96" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transitioning State 1">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/22903bc3b53eb5b7817378ecb985ce96">
  Transitioning State 1</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

When you update the number, the change is animated below the input.

## Dynamic State Transitions

As with Vue's transition components, the data backing state transitions can be updated in real time, which is especially useful for prototyping! Even using a simple SVG polygon, you can achieve many effects that would be difficult to conceive of until you've played with the variables a little.

<p class="codepen" data-height="500" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="a8e00648d4df6baa1b19fb6c31c8d17e" data-preview="true" style="height: 493px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Updating SVG">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/a8e00648d4df6baa1b19fb6c31c8d17e">
  Updating SVG</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

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

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="e9ef8ac7e32e0d0337e03d20949b4d17" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="State Transition Components">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/e9ef8ac7e32e0d0337e03d20949b4d17">
  State Transition Components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Now we can compose multiple states with these child components. It's exciting- we can use any combination of transition strategies that have been covered on this page, along with those offered by Vue's [built-in transition system](transitions-enterleave.html). Together, there are very few limits to what can be accomplished.

You can see how we could use this for data visualization, for physics effects, for character animations and interactions, the sky's the limit.

## Bringing Designs to Life

To animate, by one definition, means to bring to life. Unfortunately, when designers create icons, logos, and mascots, they're usually delivered as images or static SVGs. So although GitHub's octocat, Twitter's bird, and many other logos resemble living creatures, they don't really seem alive.

Vue can help. Since SVGs are just data, we only need examples of what these creatures look like when excited, thinking, or alarmed. Then Vue can help transition between these states, making your welcome pages, loading indicators, and notifications more emotionally compelling.

Sarah Drasner demonstrates this in the demo below, using a combination of timed and interactivity-driven state changes:

<p data-height="400" data-theme-id="light" data-slug-hash="YZBGNp" data-default-tab="result" data-user="sdras" data-embed-version="2" data-pen-title="Vue-controlled Wall-E" class="codepen">See the Pen <a href="https://codepen.io/sdras/pen/YZBGNp/">Vue-controlled Wall-E</a> by Sarah Drasner (<a href="https://codepen.io/sdras">@sdras</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
