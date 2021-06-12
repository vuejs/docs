# Event Handling

<VideoLesson href="https://vueschool.io/lessons/user-events-in-vue-3?friend=vuejs" title="Learn how to handle events on Vue School">Learn how to handle events in a free Vue School lesson</VideoLesson>

## Listening to Events

We can use the `v-on` directive, which we typically shorten to the `@` symbol, to listen to DOM events and run some JavaScript when they're triggered. The usage would be `v-on:click="methodName"` or with the shortcut, `@click="methodName"`

For example:

```html
<div id="basic-event">
  <button @click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      counter: 0
    }
  }
}).mount('#basic-event')
```

Result:

<common-codepen-snippet title="Event handling: basic" slug="xxGadPZ" tab="result" :preview="false" />

## Method Event Handlers

The logic for many event handlers will be more complex though, so keeping your JavaScript in the value of the `v-on` attribute isn't feasible. That's why `v-on` can also accept the name of a method you'd like to call.

For example:

```html
<div id="event-with-method">
  <!-- `greet` is the name of a method defined below -->
  <button @click="greet">Greet</button>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    greet(event) {
      // `this` inside methods points to the current active instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}).mount('#event-with-method')
```

Result:

<common-codepen-snippet title="Event handling: with a method" slug="jOPvmaX" tab="result" :preview="false" />

## Methods in Inline Handlers

Instead of binding directly to a method name, we can also use methods in an inline JavaScript statement:

```html
<div id="inline-handler">
  <button @click="say('hi')">Say hi</button>
  <button @click="say('what')">Say what</button>
</div>
```

```js
Vue.createApp({
  methods: {
    say(message) {
      alert(message)
    }
  }
}).mount('#inline-handler')
```

Result:

<common-codepen-snippet title="Event handling: with an inline handler" slug="WNvgjda" tab="result" :preview="false" />

Sometimes we also need to access the original DOM event in an inline statement handler. You can pass it into a method using the special `$event` variable:

```html
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
// ...
methods: {
  warn(message, event) {
    // now we have access to the native event
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

## Multiple Event Handlers

You can have multiple methods in an event handler separated by a comma operator like this:

```html
<!-- both one() and two() will execute on button click -->
<button @click="one($event), two($event)">
  Submit
</button>
```

```js
// ...
methods: {
  one(event) {
    // first handler logic...
  },
  two(event) {
    // second handler logic...
  }
}
```

## Event Modifiers

It is a very common need to call `event.preventDefault()` or `event.stopPropagation()` inside event handlers. Although we can do this easily inside methods, it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.

To address this problem, Vue provides **event modifiers** for `v-on`. Recall that modifiers are directive postfixes denoted by a dot.

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div @click.capture="doThis">...</div>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
```

::: tip
Order matters when using modifiers because the relevant code is generated in the same order. Therefore using `@click.prevent.self` will prevent **all clicks** while `@click.self.prevent` will only prevent clicks on the element itself.
:::

```html
<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>
```

Unlike the other modifiers, which are exclusive to native DOM events, the `.once` modifier can also be used on [component events](component-custom-events.html). If you haven't read about components yet, don't worry about this for now.

Vue also offers the `.passive` modifier, corresponding to [`addEventListener`'s `passive` option](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters).

```html
<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>
```

The `.passive` modifier is especially useful for improving performance on mobile devices.

::: tip
Don't use `.passive` and `.prevent` together, because `.prevent` will be ignored and your browser will probably show you a warning. Remember, `.passive` communicates to the browser that you _don't_ want to prevent the event's default behavior.
:::

## Key Modifiers

When listening for keyboard events, we often need to check for specific keys. Vue allows adding key modifiers for `v-on` or `@` when listening for key events:

```html
<!-- only call `vm.submit()` when the `key` is `Enter` -->
<input @keyup.enter="submit" />
```

You can directly use any valid key names exposed via [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) as modifiers by converting them to kebab-case.

```html
<input @keyup.page-down="onPageDown" />
```

In the above example, the handler will only be called if `$event.key` is equal to `'PageDown'`.

### Key Aliases

Vue provides aliases for the most commonly used keys:

- `.enter`
- `.tab`
- `.delete` (captures both "Delete" and "Backspace" keys)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

## System Modifier Keys

You can use the following modifiers to trigger mouse or keyboard event listeners only when the corresponding modifier key is pressed:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Note
On Macintosh keyboards, meta is the command key (⌘). On Windows keyboards, meta is the Windows key (⊞). On Sun Microsystems keyboards, meta is marked as a solid diamond (◆). On certain keyboards, specifically MIT and Lisp machine keyboards and successors, such as the Knight keyboard, space-cadet keyboard, meta is labeled “META”. On Symbolics keyboards, meta is labeled “META” or “Meta”.
:::

For example:

```html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

::: tip
Note that modifier keys are different from regular keys and when used with `keyup` events, they have to be pressed when the event is emitted. In other words, `keyup.ctrl` will only trigger if you release a key while holding down `ctrl`. It won't trigger if you release the `ctrl` key alone
:::

### `.exact` Modifier

The `.exact` modifier allows control of the exact combination of system modifiers needed to trigger an event.

```html
<!-- this will fire even if Alt or Shift is also pressed -->
<button @click.ctrl="onClick">A</button>

<!-- this will only fire when Ctrl and no other keys are pressed -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- this will only fire when no system modifiers are pressed -->
<button @click.exact="onClick">A</button>
```

### Mouse Button Modifiers

- `.left`
- `.right`
- `.middle`

These modifiers restrict the handler to events triggered by a specific mouse button.

## Why Listeners in HTML?

You might be concerned that this whole event listening approach violates the good old rules about "separation of concerns". Rest assured - since all Vue handler functions and expressions are strictly bound to the ViewModel that's handling the current view, it won't cause any maintenance difficulty. In fact, there are several benefits in using `v-on` or `@`:

1. It's easier to locate the handler function implementations within your JS code by skimming the HTML template.

2. Since you don't have to manually attach event listeners in JS, your ViewModel code can be pure logic and DOM-free. This makes it easier to test.

3. When a ViewModel is destroyed, all event listeners are automatically removed. You don't need to worry about cleaning it up yourself.
