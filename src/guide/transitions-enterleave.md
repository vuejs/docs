# Enter & Leave Transitions

Vue provides a variety of ways to apply transition effects when items are inserted, updated, or removed from the DOM. This includes tools to:

- automatically apply classes for CSS transitions and animations
- integrate 3rd-party CSS animation libraries, such as [Animate.css](https://animate.style/)
- use JavaScript to directly manipulate the DOM during transition hooks
- integrate 3rd-party JavaScript animation libraries

On this page, we'll only cover entering, and leaving, but you can see the next sections for [list transitions](transitions-list.html) and [managing state transitions](transitions-state.html).

## Transitioning Single Elements/Components

Vue provides a `transition` wrapper component, allowing you to add entering/leaving transitions for any element or component in the following contexts:

- Conditional rendering (using `v-if`)
- Conditional display (using `v-show`)
- Dynamic components
- Component root nodes

This is what an example looks like in action:

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

When an element wrapped in a `transition` component is inserted or removed, this is what happens:

1. Vue will automatically sniff whether the target element has CSS transitions or animations applied. If it does, CSS transition classes will be added/removed at appropriate timings.

2. If the transition component provided [JavaScript hooks](#javascript-hooks), these hooks will be called at appropriate timings.

3. If no CSS transitions/animations are detected and no JavaScript hooks are provided, the DOM operations for insertion and/or removal will be executed immediately on next frame (Note: this is a browser animation frame, different from Vue's concept of `nextTick`).

### Transition Classes

There are six classes applied for enter/leave transitions.

1. `v-enter-from`: Starting state for enter. Added before the element is inserted, removed one frame after the element is inserted.

2. `v-enter-active`: Active state for enter. Applied during the entire entering phase. Added before the element is inserted, removed when the transition/animation finishes. This class can be used to define the duration, delay and easing curve for the entering transition.

3. `v-enter-to`: Ending state for enter. Added one frame after the element is inserted (at the same time `v-enter-from` is removed), removed when the transition/animation finishes.

4. `v-leave-from`: Starting state for leave. Added immediately when a leaving transition is triggered, removed after one frame.

5. `v-leave-active`: Active state for leave. Applied during the entire leaving phase. Added immediately when a leave transition is triggered, removed when the transition/animation finishes. This class can be used to define the duration, delay and easing curve for the leaving transition.

6. `v-leave-to`: Ending state for leave. Added one frame after a leaving transition is triggered (at the same time `v-leave-from` is removed), removed when the transition/animation finishes.

![Transition Diagram](/images/transitions.svg)

Each of these classes will be prefixed with the name of the transition. Here the `v-` prefix is the default when you use a `<transition>` element with no name. If you use `<transition name="my-transition">` for example, then the `v-enter-from` class would instead be `my-transition-enter-from`.

`v-enter-active` and `v-leave-active` give you the ability to specify different easing curves for enter/leave transitions, which you'll see an example of in the following section.

### CSS Transitions

One of the most common transition types uses CSS transitions. Here's an example:

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
/* Enter and leave animations can use different */
/* durations and timing functions.              */
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

### CSS Animations

CSS animations are applied in the same way as CSS transitions, the difference being that `v-enter-from` is not removed immediately after the element is inserted, but on an `animationend` event.

Here's an example, omitting prefixed CSS rules for the sake of brevity:

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

### Custom Transition Classes

You can also specify custom transition classes by providing the following attributes:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

These will override the conventional class names. This is especially useful when you want to combine Vue's transition system with an existing CSS animation library, such as [Animate.css](https://daneden.github.io/animate.css/).

Here's an example:

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

### Using Transitions and Animations Together

Vue needs to attach event listeners in order to know when a transition has ended. It can either be `transitionend` or `animationend`, depending on the type of CSS rules applied. If you are only using one or the other, Vue can automatically detect the correct type.

However, in some cases you may want to have both on the same element, for example having a CSS animation triggered by Vue, along with a CSS transition effect on hover. In these cases, you will have to explicitly declare the type you want Vue to care about in a `type` attribute, with a value of either `animation` or `transition`.

### Explicit Transition Durations

<!-- TODO: validate and provide an example -->

In most cases, Vue can automatically figure out when the transition has finished. By default, Vue waits for the first `transitionend` or `animationend` event on the root transition element. However, this may not always be desired - for example, we may have a choreographed transition sequence where some nested inner elements have a delayed transition or a longer transition duration than the root transition element.

In such cases you can specify an explicit transition duration (in milliseconds) using the `duration` prop on the `<transition>` component:

```html
<transition :duration="1000">...</transition>
```

You can also specify separate values for enter and leave durations:

```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### JavaScript Hooks

You can also define JavaScript hooks in attributes:

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
  // ENTERING
  // --------

  beforeEnter(el) {
    // ...
  },
  // the done callback is optional when
  // used in combination with CSS
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
  // LEAVING
  // --------

  beforeLeave(el) {
    // ...
  },
  // the done callback is optional when
  // used in combination with CSS
  leave(el, done) {
    // ...
    done()
  },
  afterLeave(el) {
    // ...
  },
  // leaveCancelled only available with v-show
  leaveCancelled(el) {
    // ...
  }
}
```

These hooks can be used in combination with CSS transitions/animations or on their own.

When using JavaScript-only transitions, **the `done` callbacks are required for the `enter` and `leave` hooks**. Otherwise, the hooks will be called synchronously and the transition will finish immediately. Adding `:css="false"` will also let Vue know to skip CSS detection. Aside from being slightly more performant, this also prevents CSS rules from accidentally interfering with the transition.

Now let's dive into an example. Here's a JavaScript transition using [GreenSock](https://greensock.com/):

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

## Transitions on Initial Render

If you also want to apply a transition on the initial render of a node, you can add the `appear` attribute:

```html
<transition appear>
  <!-- ... -->
</transition>
```

## Transitioning Between Elements

We discuss [transitioning between components](#transitioning-between-components) later, but you can also transition between raw elements using `v-if`/`v-else`. One of the most common two-element transitions is between a list container and a message describing an empty list:

```html
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>Sorry, no items found.</p>
</transition>
```

It's actually possible to transition between any number of elements, either by using `v-if`/`v-else-if`/`v-else` or binding a single element to a dynamic property. For example:

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

Which could also be written as:

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

### Transition Modes

There's still one problem though. Try clicking the button below:

<common-codepen-snippet title="Transition Modes Button Problem" slug="Rwrqzpr" :editable="false" />

As it's transitioning between the "on" button and the "off" button, both buttons are rendered - one transitioning out while the other transitions in. This is the default behavior of `<transition>` - entering and leaving happens simultaneously.

Sometimes this works great, like when transitioning items are absolutely positioned on top of each other:

<common-codepen-snippet title="Transition Modes Button Problem- positioning" slug="abdQgLr" :editable="false" />

Sometimes this isn't an option, though, or we're dealing with more complex movement where in and out states need to be coordinated, so Vue offers an extremely useful utility called **transition modes**:

- `in-out`: New element transitions in first, then when complete, the current element transitions out.
- `out-in`: Current element transitions out first, then when complete, the new element transitions in.

::: tip
You'll find very quickly that `out-in` is the state you will want most of the time :)
:::

Now let's update the transition for our on/off buttons with `out-in`:

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

<common-codepen-snippet title="Transition Modes Button Problem- solved" slug="ZEQmdvq" :editable="false" />

With one attribute addition, we've fixed that original transition without having to add any special styling.

We can use this to coordinate more expressive movement, such as a folding card, as demonstrated below. It's actually two elements transitioning between each other, but since the beginning and end states are scaling the same: horizontally to 0, it appears like one fluid movement. This type of sleight-of-hand can be very useful for realistic UI microinteractions:

<common-codepen-snippet title="Transition Modes Flip Cards" slug="76e344bf057bd58b5936bba260b787a8" :editable="false" />

## Transitioning Between Components

Transitioning between components is even simpler - we don't even need the `key` attribute. Instead, we wrap a [dynamic component](component-basics.html#dynamic-components):

```html
<div id="demo">
  <input v-model="view" type="radio" value="v-a" id="a"><label for="a">A</label>
  <input v-model="view" type="radio" value="v-b" id="b"><label for="b">B</label>
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
