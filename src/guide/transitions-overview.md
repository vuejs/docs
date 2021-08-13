# Overview

Vue offers some abstractions that can help work with transitions and animations, particularly in response to something changing. Some of these abstractions include:

- Hooks for components entering and leaving the DOM, in both CSS and JS, using the built-in `<transition>` component.
- Transition Modes so that you can orchestrate ordering during a transition.
- Hooks for when multiple elements are updating in position, with FLIP techniques applied under the hood to increase performance, using the `<transition-group>` component.
- Transitioning different states in an application, with `watchers`.

We will cover all of these and more in the next three sections in this Guide. However, aside from these useful API offerings, it's worth mentioning that the class and style declarations we covered earlier can be used to apply animations and transitions as well, for more simple use cases.

In this next section, we'll go over some web animation and transitions basics, and link off to some resources for further exploration. If you're already familiar with web animation and how those principles might work with some of Vue's directives, feel free to skip this next section. For anyone else looking to learn a little more about web animation basics before diving in, read on.

## Class-based Animations & Transitions

Though the `<transition>` component can be wonderful for components entering and leaving, you can also activate an animation without mounting a component, by adding a conditional class.

```vue-html
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

## Transitions with Style Bindings

Some transition effects can be applied by interpolating values, for instance by binding a style to an element while an interaction occurs. Take this example for instance:

```vue-html
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

In this example, we are creating animation through the use of interpolation, attached to the mouse movement. The CSS transition is applied to the element as well, to let the element know what kind of easing to use while it's updating.

## Performance

You may notice that the animations shown above are using things like `transforms`, and applying strange properties like `perspective`- why were they built that way instead of just using `margin` and `top` etc?

We can create extremely smooth animations on the web by being aware of performance. We want to hardware accelerate elements when we can, and use properties that don't trigger repaints. Let's go over some of how we can accomplish this.

### Transform and Opacity

We can check resources like [CSS-Triggers](https://csstriggers.com/) to see which properties will trigger repaints if we animate them. Here, if you look under `transform`, you will see:

> Changing transform does not trigger any geometry changes or painting, which is very good. This means that the operation can likely be carried out by the compositor thread with the help of the GPU.

Opacity behaves similarly. Thus, they are ideal candidates for movement on the web.

### Hardware Acceleration

Properties such as `perspective`, `backface-visibility`, and `transform: translateZ(x)` will allow the browser to know you need hardware acceleration.

If you wish to hardware-accelerate an element, you can apply any of these properties (not all are necessary, only one):

```css
perspective: 1000px;
backface-visibility: hidden;
transform: translateZ(0);
```

Many JS libraries like GreenSock will assume you want hardware acceleration and will apply them by default, so you do not need to set them manually.

## Timing

For simple UI transitions, meaning from just one state to another with no intermediary states, it's common to use timings between 0.1s and 0.4s, and most folks find that _0.25s_ tends to be a sweet spot. Can you use that timing for everything? No, not really. If you have something that needs to move a greater distance or has more steps or state changes, 0.25s is not going to work as well and you will have to be much more intentional, and the timing will need to be more unique. That doesn't mean you can't have nice defaults that you repeat within your application, though.

You may also find that entrances look better with slightly more time than an exit. The user typically is being guided during the entrance, and is a little less patient upon exit because they want to go on their way.

## Easing

Easing is an important way to convey depth in an animation. One of the most common mistakes newcomers to animation make is to use `ease-in` for entrances, and `ease-out` for exits. You'll actually need the opposite.

If we were to apply these states to a transition, it would look something like this:

```css
.button {
  background: #1b8f5a;
  /* applied to the initial state, so this transition will be applied to the return state */
  transition: background 0.25s ease-in;
}

.button:hover {
  background: #3eaf7c;
  /* applied to the hover state, so this transition will be applied when a hover is triggered */
  transition: background 0.35s ease-out;
}
```

<common-codepen-snippet title="Transition Ease Example" slug="996a9665131e7902327d350ca8a655ac" tab="css,result" :editable="false" :preview="false" />

Easing can also convey the quality of material being animated. Take this pen for example, which ball do you think is hard and which is soft?

<common-codepen-snippet title="Bouncing Ball Demo" slug="wvgqyyW" :height="500" :editable="false" />

You can get a lot of unique effects and make your animation very stylish by adjusting your easing. CSS allows you to modify this by adjusting a cubic bezier property, [this playground](https://cubic-bezier.com/#.17,.67,.83,.67) by Lea Verou is very helpful for exploring this.

Though you can achieve great effects for simple animation with the two handles the cubic-bezier ease offers, JavaScript allows multiple handles, and therefore, allows for much more variance.

![Ease Comparison](/images/css-vs-js-ease.svg)

Take a bounce, for instance. In CSS we have to declare each keyframe, up and down. In JavaScript, we can express all of that movement within the ease, by declaring `bounce` in the [GreenSock API (GSAP)](https://greensock.com/) (other JS libraries have other types of easing defaults).

Here is the code used for a bounce in CSS (example from animate.css):

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

We'll be using GreenSock in some of the examples in the sections following. They have a great [ease visualizer](https://greensock.com/ease-visualizer) that will help you build nicely crafted eases.

## Further Reading

- [Designing Interface Animation: Improving the User Experience Through Animation by Val Head](https://www.amazon.com/dp/B01J4NKSZA/)
- [Animation at Work by Rachel Nabors](https://abookapart.com/products/animation-at-work)
