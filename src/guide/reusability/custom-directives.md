# Custom Directives {#custom-directives}

<script setup>
const vFocus = {
  mounted: el => {
    el.focus()
  }
}
</script>

## Introduction {#introduction}

In addition to the default set of directives shipped in core (like `v-model` or `v-show`), Vue also allows you to register your own custom directives.

We have introduced two forms of code reuse in Vue: [components](/guide/essentials/component-basics) and [composables](./composables). Components are the main building blocks, while composables are focused on reusing stateful logic. Custom directives, on the other hand, are mainly intended for reusing logic that involves low-level DOM access on plain elements.

A custom directive is defined as an object containing lifecycle hooks similar to those of a component. The hooks receive the element the directive is bound to. Here is an example of a directive that focuses an input when the element is inserted into the DOM by Vue:

<div class="composition-api">

```vue
<script setup>
// enables v-focus in templates
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

</div>

<div class="options-api">

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // enables v-focus in template
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

<div class="demo">
  <input v-focus placeholder="This should be focused" />
</div>

Assuming you haven't clicked elsewhere on the page, the input above should be auto-focused. This directive is more useful than the `autofocus` attribute because it works not just on page load - it also works when the element is dynamically inserted by Vue.

<div class="composition-api">

In `<script setup>`, any camelCase variable that starts with the `v` prefix can be used as a custom directive. In the example above, `vFocus` can be used in the template as `v-focus`.

If not using `<script setup>`, custom directives can be registered using the `directives` option:

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // enables v-focus in template
    focus: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

Similar to components, custom directives must be registered so that they can be used in templates. In the example above, we are using local registration via the `directives` option.

</div>

It is also common to globally register custom directives at the app level:

```js
const app = createApp({})

// make v-focus usable in all components
app.directive('focus', {
  /* ... */
})
```

:::tip
Custom directives should only be used when the desired functionality can only be achieved via direct DOM manipulation. Prefer declarative templating using built-in directives such as `v-bind` when possible because they are more efficient and server-rendering friendly.
:::

## Directive Hooks {#directive-hooks}

A directive definition object can provide several hook functions (all optional):

```js
const myDirective = {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode, prevVnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode, prevVnode) {},
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // called after the parent component and
  // all of its children have updated
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### Hook Arguments {#hook-arguments}

Directive hooks are passed these arguments:

- `el`: the element the directive is bound to. This can be used to directly manipulate the DOM.

- `binding`: an object containing the following properties.

  - `value`: The value passed to the directive. For example in `v-my-directive="1 + 1"`, the value would be `2`.
  - `oldValue`: The previous value, only available in `beforeUpdate` and `updated`. It is available whether or not the value has changed.
  - `arg`: The argument passed to the directive, if any. For example in `v-my-directive:foo`, the arg would be `"foo"`.
  - `modifiers`: An object containing modifiers, if any. For example in `v-my-directive.foo.bar`, the modifiers object would be `{ foo: true, bar: true }`.
  - `instance`: The instance of the component where the directive is used.
  - `dir`: the directive definition object.

- `vnode`: the underlying VNode representing the bound element.
- `prevNode`: the VNode representing the bound element from the previous render. Only available in the `beforeUpdate` and `updated` hooks.

As an example, consider the following directive usage:

```vue-html
<div v-example:foo.bar="baz">
```

The `binding` argument would be an object in the shape of:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* value of `baz` */,
  oldValue: /* value of `baz` from previous update */
}
```

Similar to built-in directives, custom directive arguments can be dynamic. For example:

```vue-html
<div v-example:[arg]="value"></div>
```

Here the directive argument will be reactively updated based on `arg` property in our component state.

:::tip Note
Apart from `el`, you should treat these arguments as read-only and never modify them. If you need to share information across hooks, it is recommended to do so through element's [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
:::

## Function Shorthand {#function-shorthand}

It's common for a custom directive to have the same behavior for `mounted` and `updated`, with no need for the other hooks. In such cases we can define the directive as a function:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // this will be called for both `mounted` and `updated`
  el.style.color = binding.value
})
```

## Object Literals {#object-literals}

If your directive needs multiple values, you can also pass in a JavaScript object literal. Remember, directives can take any valid JavaScript expression.

```vue-html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## Usage on Components {#usage-on-components}

When used on components, custom directives will always apply to a component's root node, similar to [Fallthrough Attributes](/guide/components/attrs).

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- template of MyComponent -->

<div> <!-- v-demo directive will be applied here -->
  <span>My component content</span>
</div>
```

Note that components can potentially have more than one root node. When applied to a multi-root component, a directive will be ignored and a warning will be thrown. Unlike attributes, directives can't be passed to a different element with `v-bind="$attrs"`. In general, it is **not** recommended to use custom directives on components.
