# Conditional Rendering

Now, when we have defined how many colors we will show in the game, it's time to actually make our game start. For now, we want to have two states:

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

Now, we can add a new section to our component template:

```html{4}
<div class="panel">
  <!-- header content -->
</div>
<section class="flex" v-if="gameStarted">Game is started</section>
```

Try to change `gameStarted` to `true` and you will see a text rendered below the header.

Let's start our game as soon as user submits the form with pressing <kbd>Enter</kbd> on the input field. To make this more semantic, let's wrap our input in `<form>` tag:

```html
<form>
  <label for="colors">
    Enter number of colors and press Enter:
    <input id="colors" type="number" v-model="colorsNumber" />
  </label>
</form>
```

Form with the single input will be submitted on <kbd>Enter</kbd> press automatically. We only need to listen to the form's submit event:

```html
<form @submit="gameStarted = true">
  <label for="colors">
    Enter number of colors and press Enter:
    <input id="colors" type="number" v-model="colorsNumber" />
  </label>
</form>
```

However, if we leave it like this, page will refresh and no text will be shown. The reason is we need to _prevent a default form submit event_ and make our change instead. In JavaScript, it's done with `event.preventDefault()` method; in Vue.js we have an event modifier `.prevent` that does the same under the hood.

```html
<form @submit.prevent="gameStarted = true">
  <label for="colors">
    Enter number of colors and press Enter:
    <input id="colors" type="number" v-model="colorsNumber" />
  </label>
</form>
```

Now, whenever user enter a number in the input field and presses <kbd>Enter</kbd>, we can see that game is started.

The last thing we want to implement in this lesson is hiding the input field when the game is already started and showing a button `Change colors number`. Clicking on the button will set the game to "not-started" and show the input again. First, let's add the button to our template:

```html{1-3}
<nav>
  <button @click="gameStarted = false">Change squares number</button>
</nav>
<form @submit.prevent="gameStarted = true">
  <label for="colors">
    Enter number of colors and press Enter:
    <input id="colors" type="number" v-model="colorsNumber" />
  </label>
</form>
```

Now, let's display the `<nav>` conditionally when game is started:

```html{1-3}
<nav v-if="gameStarted">
  <button @click="gameStarted = false">Change squares number</button>
</nav>
```

Just like you can use `if...else` in JavaScript, you can use `v-if` and `v-else` in Vue. So when `gameStarted` is `true`, we're displaying `<nav>`, else we're displaying the form:

```html
<nav v-if="gameStarted">
  <button @click="gameStarted = false">Change squares number</button>
</nav>
<form v-else @submit.prevent="gameStarted = true">
  <label for="colors">
    Enter number of colors and press Enter:
    <input id="colors" type="number" v-model="colorsNumber" />
  </label>
</form>
```
