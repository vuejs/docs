# Listening to Events

Now we can see that `colorsNumber` is displayed on the input field. However, when we change the number in the input, we don't see any changes on `Number of colors` in the template 🤔. It happens because we only have _one-way binding_ now, displaying reactive property in the input field but not _changing_ it on user input.

To make this change, we need to listen to the `input` DOM event on the `<input>` field and update `colorsNumber` on it. This can be done with Vue's `v-on` directive or its shorthand `@`:

```html
<input
  type="number"
  :value="colorsNumber"
  @input="colorsNumber = $event.target.value"
/>
```

`$event` is the HTML native [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)(in our case it's `input`).
