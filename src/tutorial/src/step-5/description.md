# Form Bindings {#form-bindings}

Using `v-bind` and `v-on` together, we can create two-way bindings on form input elements:

```vue-html
<input :value="text" @input="onInput">
```

<div class="options-api">

```js
methods: {
  onInput(e) {
    // a v-on handler receives the native DOM event
    // as the argument.
    this.text = e.target.value
  }
}
```

</div>

<div class="composition-api">

```js
function onInput(e) {
  // a v-on handler receives the native DOM event
  // as the argument.
  text.value = e.target.value
}
```

</div>

Try typing in the input box - you should see the text in `<p>` updating as you type.

To simplify two-way bindings, Vue provides a directive, `v-model`, which is essentially a syntax sugar for the above:

```vue-html
<input v-model="text">
```

`v-model` automatically syncs the `<input>`'s value with the bound state, so we no longer need to use an event handler for that.

`v-model` works not only on text inputs, but also on other input types such as checkboxes, radio buttons, and select dropdowns. We cover more details in <a target="_blank" href="/guide/essentials/forms.html">Guide - Form Bindings</a>.

Now, try to refactor the code to use `v-model` instead.
