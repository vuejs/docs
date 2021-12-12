# Handling User Input

Let's make our example more interactive! What if we could allow user to change `colorsNumber` from the UI? To implement this, we need to start with adding an `<input>` field to our component template

```html{4}
<div class="panel">
  <h1>Guess the Color</h1>
  <h2>Number of colors: 3</h2>
  <input type="number">
</div>
```

Now, we have to provide some initial value to our input, and we want to display `colorsNumber` there. Let's use a dynamic binding to provide a value:

```html
<input type="number" :value="colorsNumber" />
```

However, when we change the number in the input field, we don't see any changes on `Number of colors` in the template 🤔. It happens because we only have _one-way binding_ now, displaying reactive property in the input field but not _changing_ it on user input. Let's listen to the `input` DOM event on the `<input>` field and update `colorsNumber` on it:

```html
<input
  type="number"
  :value="colorsNumber"
  @input="colorsNumber = $event.target.value"
/>
```

Now we created a _two-way binding_: we update `input` field on reactive property change and vice versa. Vue.js has a `v-model` directive to make two-way binding less verbose. Let's replace out `:value` and `@input` with it:

```html
<input type="number" v-model="colorsNumber" />
```

Now, we can choose how many colors we'll have in our guessing game! As a last touch, let's add a label to our input field and set up minimum and maximum for it:

```html
<label for="squares">
  Enter number of colors and press Enter:
  <input id="squares" type="number" v-model="squaresNumber" min="2" max="10" />
</label>
```
