# Event Modifiers

Let's start our game as soon as user submits the form with pressing <kbd>Enter</kbd> on the input field. To make this more semantic, let's wrap our input in `<form>` tag:

```html
<form>
  <label for="colors">
    Enter number of colors and press Enter:
    <input id="colors" type="number" v-model="colorsNumber" />
  </label>
</form>
```

Form with the single input will be submitted on <kbd>Enter</kbd> press automatically. We only need to listen to the form's `submit` event:

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
