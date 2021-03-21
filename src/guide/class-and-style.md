# Class and Style Bindings

A common need for data binding is manipulating an element's class list and its inline styles. Since they are both attributes, we can use `v-bind` to handle them: we only need to calculate a final string with our expressions. However, meddling with string concatenation is annoying and error-prone. For this reason, Vue provides special enhancements when `v-bind` is used with `class` and `style`. In addition to strings, the expressions can also evaluate to objects or arrays.

## Binding HTML Classes

### Object Syntax

We can pass an object to `:class` (short for `v-bind:class`) to dynamically toggle classes:

```html
<div :class="{ active: isActive }"></div>
```

The above syntax means the presence of the `active` class will be determined by the [truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) of the data property `isActive`.

You can have multiple classes toggled by having more fields in the object. In addition, the `:class` directive can also co-exist with the plain `class` attribute. So given the following template:

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

And the following data:

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

It will render:

```html
<div class="static active"></div>
```

When `isActive` or `hasError` changes, the class list will be updated accordingly. For example, if `hasError` becomes `true`, the class list will become `"static active text-danger"`.

The bound object doesn't have to be inline:

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

This will render the same result. We can also bind to a [computed property](computed.md) that returns an object. This is a common and powerful pattern:

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### Array Syntax

We can pass an array to `:class` to apply a list of classes:

```html
<div :class="[activeClass, errorClass]"></div>
```

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

Which will render:

```html
<div class="active text-danger"></div>
```

If you would like to also toggle a class in the list conditionally, you can do it with a ternary expression:

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

This will always apply `errorClass`, but `activeClass` will only be applied when `isActive` is truthy.

However, this can be a bit verbose if you have multiple conditional classes. That's why it's also possible to use the object syntax inside array syntax:

```html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### With Components

> This section assumes knowledge of [Vue Components](component-basics.md). Feel free to skip it and come back later.

When you use the `class` attribute on a custom component with a single root element, those classes will be added to this element. Existing classes on this element will not be overwritten.

For example, if you declare this component:

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `<p class="foo bar">Hi!</p>`
})
```

Then add some classes when using it:

```html
<div id="app">
  <my-component class="baz boo"></my-component>
</div>
```

The rendered HTML will be:

```html
<p class="foo bar baz boo">Hi</p>
```

The same is true for class bindings:

```html
<my-component :class="{ active: isActive }"></my-component>
```

When `isActive` is truthy, the rendered HTML will be:

```html
<p class="foo bar active">Hi</p>
```

If your component has multiple root elements, you would need to define which component will receive this class. You can do this using `$attrs` component property:

```html
<div id="app">
  <my-component class="baz"></my-component>
</div>
```

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p>
    <span>This is a child component</span>
  `
})
```

You can learn more about component attribute inheritance in [Non-Prop Attributes](component-attrs.html) section.

## Binding Inline Styles

### Object Syntax

The object syntax for `:style` is pretty straightforward - it looks almost like CSS, except it's a JavaScript object. You can use either camelCase or kebab-case (use quotes with kebab-case) for the CSS property names:

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

It is often a good idea to bind to a style object directly so that the template is cleaner:

```html
<div :style="styleObject"></div>
```

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

Again, the object syntax is often used in conjunction with computed properties that return objects.

### Array Syntax

The array syntax for `:style` allows you to apply multiple style objects to the same element:

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Auto-prefixing

When you use a CSS property that requires [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) in `:style`, for example `transform`, Vue will automatically detect and add appropriate prefixes to the applied styles.

### Multiple Values

You can provide an array of multiple (prefixed) values to a style property, for example:

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

This will only render the last value in the array which the browser supports. In this example, it will render `display: flex` for browsers that support the unprefixed version of flexbox.
