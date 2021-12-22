# Two-Way Binding

In the previous step we created a _two-way binding_: we update `input` field on reactive property change and vice versa. Vue.js has a `v-model` directive to make two-way binding less verbose. Let's replace out `:value` and `@input` with it:

```html
<input type="number" v-model="colorsNumber" />
```

Now, we can choose how many colors we'll have in our guessing game! As a last touch, let's add a label to our input field and set up minimum and maximum for it:

```html
<label for="colors">
  Enter number of colors and press Enter:
  <input id="colors" type="number" v-model="colorsNumber" min="2" max="10" />
</label>
```
