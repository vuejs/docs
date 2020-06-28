# Transition & Animations Overview

Vue offers some abstractions that can help work with transitions and animations, particularly in response to something changing. Some of these abstractions include:

- Hooks for components entering and leaving the DOM, in both CSS and JS, using the built-in `<transition>` component.
- Transition Modes so that you can orchestrate ordering during a transition.
- Hooks for when multiple elements are updating in position, with FLIP techniques applied under the hood to increase performance, using the `<transition-group>` component.
- Transitioning different states in an application, with `watchers`.

We will cover all of these and more in the next two sections in this Guide. However, aside from these useful API offerings, it's worth mentioning that the class and style declarations we covered earlier can be used to apply animations and transitions as well, for more simple use cases.

In this next section, we'll go over some web animation and transitions basics, and link off to some resources for further exploration. If you're already familiar with web animation and how those principles might work with some of Vue's directives, feel free to skip this next section. For anyone else looking to learn a little more about web animation basics before diving in, read on.

## Class-based Animations & Transitions

Though the `<transition>` component can be wonderful for components entering and leaving, you can also activate an animation from the

# Transitions with Style Bindings

## Timing

For simple UI transitions, meaning from just one state to another with no intermediary states, it's common to use timings between 0.1s and 0.4s, and most folks find that _0.25s_ tends to be a sweet spot. Can you use that timing for everything? No, not really. If you have something that needs to move a greater distance or has more steps or state changes, 0.25s is not going to work as well and you will have to be much more intentional, and the timing will need to be more unique. That doesn't mean you can't have nice defaults that you repeat within your application, though.

You may also find that entrances look better with slightly more time than an exit. The user typically is being guided during the entrance, and is a little less patient upon exit because they want to go on their way.

## Easing

Easing is an important way to convey depth in an animation. One of the most common mistakes newcomers to animation have is to use `ease-in` for entrances, and `ease-out` for exits. You'll actually need the opposite.

If we were to apply these states to a transition, it would look something like this:

```css
.button {
  background: #1b8f5a;
  /* applied to the initial state, so this transition will be applied to the return state */
  transition: background 0.25s ease-in;
}

.button:hover {
  background: #3eaf7c;
  /* applied to the hover state, so this trnaisition will be applied when a hover is triggered */
  transition: background 0.35s ease-out;
}
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="css,result" data-user="Vue" data-slug-hash="996a9665131e7902327d350ca8a655ac" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Transition Ease Example">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/996a9665131e7902327d350ca8a655ac">
  Transition Ease Example</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Whereas for an animation it would look like this:

```css
```

We'll be using [GreenSock (GSAP)](https://greensock.com/) in some of the examples in the sections following, they have a great [ease visualizer](https://greensock.com/ease-visualizer) that will help you build nicely crafted eases.

## Further Reading

- [Designing Interface Animation: Improving the User Experience Through Animation by Val Head](https://www.amazon.com/dp/B01J4NKSZA/)
- [Animation at Work by Rachel Nabors](https://abookapart.com/products/animation-at-work)
