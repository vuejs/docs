# Conditional Rendering

It's time to actually make our game start. For now, we want to have two states:

- game is not started: we are displaying our input field so user can define the number of colors to guess;
- game is started: for now, we want to hide the input field and we want to display a text "Game is started".

Let's start with creating one more reactive property - `gameStarted`:

<div class="composition-api">

```js{2}
const colorsNumber = ref(3)
const gameStarted = ref(false)
```

</div>

<div class="options-api">

```js{4}
data() {
  return {
    colorsNumber: 3,
    gameStarted: false
  }
}
```

</div>

Let's display a new `section` only when game is started. We will use `v-if` directive for this:

```html{4}
<div class="panel">
  <!-- header content -->
</div>
<section class="flex" v-if="gameStarted">Game is started</section>
```

Try to change `gameStarted` to `true` and you will see a text rendered below the header.
