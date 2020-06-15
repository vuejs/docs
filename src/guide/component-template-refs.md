# Template refs

> This page assumes you've already read the [Components Basics](component-basics.md). Read that first if you are new to components.

Despite the existence of props and events, sometimes you might still need to directly access a child component in JavaScript. To achieve this you can assign a reference ID to the child component or HTML element using the `ref` attribute. For example:

```html
<input ref="input" />
```

This may be useful when you want to, for example, programmatically focus this input on component mount:

```js
const app = Vue.createApp({})

app.component('base-input', {
  template: `
    <input ref="input" />
  `,
  methods: {
    focusInput() {
      this.$refs.input.focus()
    }
  },
  mounted() {
    this.focusInput()
  }
})
```

Also, you can add another `ref` to the component itself and use it to trigger `focusInput` event from the parent component:

```html
<base-input ref="usernameInput"></base-input>
```

```js
this.$refs.usernameInput.focusInput()
```

When `ref` is used together with `v-for`, the ref you get will be an array containing the child components mirroring the data source.

::: warning
`$refs` are only populated after the component has been rendered. It is only meant as an escape hatch for direct child manipulation - you should avoid accessing `$refs` from within templates or computed properties.
:::

**See also**: [Using template refs in Composition API](../api/composition-api.html#template-refs)
