# Transition & Animations Overview

Vue offers some abstractions that can help work with transitions and animations, particularly in response to something changing. Some of these abstractions include:

- Hooks for components entering and leaving the DOM, in both CSS and JS, using the built-in `<transition>` component.
- Transition Modes so that you can orchestrate ordering during a transition.
- Hooks for when multiple elements are updating in position, with FLIP techniques applied under the hood to increase performance, using the `<transition-group>` component.
- Transitioning different states in an application, with `watchers`.

We will cover all of these and more in the next two sections in this Guide. However, aside from these useful API offerings, it's worth mentioning that the class and style declarations we covered earlier can be used to apply animations and transitions as well, for more simple use cases.

In this next section, we'll go over some web animation and transitions basics, for those who are just learning, as well as linking off to some good resources. If you're already familiar with web animation and how those principles might work with some of Vue's directives, feel free to skip this next section. For anyone else looking to learn a little more about web animation basics before diving in, read on.

## Class-based Animations & Transitions

Though the `<transition>` component can be wonderful for components entering and leaving, you can also activate an animation from the

# Transitions with Style Bindings

## Timing

For simple UI transitions, meaning from just one state to another with no intermediary states, it's common to use timings between 0.1s and 0.4s, and most folks find that _0.25s_ tends to be a sweet spot. Can you use that timing for everything? No, not really. As you work with

## Easing

Easing is an important way to convey depth in an animation. One of the most common mistakes newcomers to animation have is to use `ease-in` for entrances, and `ease-out` for exits. You'll actually need the opposite.

We'll be using [GreenSock (GSAP)](https://greensock.com/) in some of the examples in the sections following, they have a great [ease visualizer](https://greensock.com/ease-visualizer) that will help you build nicely crafted eases.

## Further Reading

- [Designing Interface Animation: Improving the User Experience Through Animation](https://www.amazon.com/dp/B01J4NKSZA/)
