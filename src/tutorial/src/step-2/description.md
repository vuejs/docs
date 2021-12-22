# Binding Dynamic Attributes

Let's make our example more interactive! What if we could allow user to change `colorsNumber` from the UI? To implement this, we need to start with adding an `<input>` field to our component template

```html{4}
<div class="panel">
  <h1>Guess the Color</h1>
  <h2>Number of colors: 3</h2>
  <input type="number">
</div>
```

Now, we have to provide some initial value to our input, and we want to display `colorsNumber` there. In Vue, we can use a `v-bind` directive or its shorthand `:` to bind the component reactive property to the element attribute:

```html
<input type="number" :value="colorsNumber" />
```
