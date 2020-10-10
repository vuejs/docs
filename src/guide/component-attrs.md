# Non-Prop Attributes

> This page assumes you've already read the [Components Basics](component-basics.md). Read that first if you are new to components.

A component non-prop attribute is an attribute or event listener that is passed to a component, but does not have a corresponding property defined in [props](component-props) or [emits](component-custom-events.html#defining-custom-events). Common examples of this include `class`, `style`, and `id` attributes. You can access those attributes via `$attrs` property.

## Attribute Inheritance

When a component returns a single root node, non-prop attributes will automatically be added to the root node's attributes. For example, in the instance of a date-picker component:

```js
app.component('date-picker', {
  template: `
    <div class="date-picker">
      <input type="datetime" />
    </div>
  `
})
```

In the event we need to define the status of the date-picker component via a `data-status` property, it will be applied to the root node (i.e., `div.date-picker`).

```html
<!-- Date-picker component with a non-prop attribute -->
<date-picker data-status="activated"></date-picker>

<!-- Rendered date-picker component -->
<div class="date-picker" data-status="activated">
  <input type="datetime" />
</div>
```

Same rule applies to the event listeners:

```html
<date-picker @change="submitChange"></date-picker>
```

```js
app.component('date-picker', {
  created() {
    console.log(this.$attrs) // { onChange: () => {}  }
  }
})
```

This might be helpful when we have an HTML element with `change` event as a root element of `date-picker`.

```js
app.component('date-picker', {
  template: `
    <select>
      <option value="1">Yesterday</option>
      <option value="2">Today</option>
      <option value="3">Tomorrow</option>
    </select>
  `
})
```

In this case, `change` event listener is passed from the parent component to the child and it will be triggered on native `<select>` `change` event. We won't need to emit an event from the `date-picker` explicitly:

```html
<div id="date-picker" class="demo">
  <date-picker @change="showChange"></date-picker>
</div>
```

```js
const app = Vue.createApp({
  methods: {
    showChange(event) {
      console.log(event.target.value) // will log a value of the selected option
    }
  }
})
```

## Disabling Attribute Inheritance

If you do **not** want a component to automatically inherit attributes, you can set `inheritAttrs: false` in the component's options.

The common scenario for disabling an attribute inheritance is when attributes need to be applied to other elements besides the root node.

By setting the `inheritAttrs` option to `false`, you can control to apply to other elements attributes to use the component's `$attrs` property, which includes all attributes not included to component `props` and `emits` properties (e.g., `class`, `style`, `v-on` listeners, etc.).

Using our date-picker component example from the [previous section](#attribute-inheritance), in the event we need to apply all non-prop attributes to the `input` element rather than the root `div` element, this can be accomplished by using the `v-bind` shortcut.

```js{5}
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime" v-bind="$attrs" />
    </div>
  `
})
```

With this new configuration, our `data-status` attribute will be applied to our `input` element!

```html
<!-- Date-picker component with a non-prop attribute -->
<date-picker data-status="activated"></date-picker>

<!-- Rendered date-picker component -->
<div class="date-picker">
  <input type="datetime" data-status="activated" />
</div>
```

## Attribute Inheritance on Multiple Root Nodes

Unlike single root node components, components with multiple root nodes do not have an automatic attribute fallthrough behavior. If `$attrs` are not bound explicitly, a runtime warning will be issued.

```html
<custom-layout id="custom-layout" @click="changeValue"></custom-layout>
```

```js
// This will raise a warning
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  `
})

// No warnings, $attrs are passed to <main> element
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main v-bind="$attrs">...</main>
    <footer>...</footer>
  `
})
```
