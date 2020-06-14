# Template refs

> This page assumes you've already read the [Components Basics](component-basics.md). Read that first if you are new to components.

Despite the existence of props and events, sometimes you might still need to directly access a child component in JavaScript. To achieve this you can assign a reference ID to the child component using the `ref` attribute. For example:

```html
<base-input ref="usernameInput"></base-input>
```

Now in the component where you've defined this `ref`, you can use:

```js
this.$refs.usernameInput
```

to access the `<base-input>` instance. This may be useful when you want to, for example, programmatically focus this input from a parent. In that case, the `<base-input>` component may similarly use a `ref` to provide access to specific elements inside it, such as:

```html
<input ref="input">
```

And even define methods for use by the parent:

```js
methods: {
  // Used to focus the input from the parent
  focus() {
    this.$refs.input.focus()
  }
}
```

Thus allowing the parent component to focus the input inside `<base-input>` with:

```js
this.$refs.usernameInput.focus()
```

When `ref` is used together with `v-for`, the ref you get will be an array containing the child components mirroring the data source.

::: warning
`$refs` are only populated after the component has been rendered. It is only meant as an escape hatch for direct child manipulation - you should avoid accessing `$refs` from within templates or computed properties.
:::

**See also**: [Using template refs in Composition API](../api/composition-api.html#template-refs)
