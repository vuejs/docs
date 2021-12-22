# Conditional Rendering - 2

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
