# Custom Directives

## Intro

In addition to the default set of directives shipped in core (like `v-model` or `v-show`), Vue also allows you to register your own custom directives. Note that in Vue, the primary form of code reuse and abstraction is components - however, there may be cases where you need some low-level DOM access on plain elements, and this is where custom directives would still be useful. An example would be focusing on an input element, like this one:

<common-codepen-snippet title="Custom directives: basic example" slug="JjdxaJW" :preview="false" />

When the page loads, that element gains focus (note: `autofocus` doesn't work on mobile Safari). In fact, if you haven't clicked on anything else since visiting this page, the input above should be focused now. Also, you can click on the `Rerun` button and input will be focused.

Now let's build the directive that accomplishes this:

```js
const app = Vue.createApp({})
// Register a global custom directive called `v-focus`
app.directive('focus', {
  // When the bound element is mounted into the DOM...
  mounted(el) {
    // Focus the element
    el.focus()
  }
})
```

If you want to register a directive locally instead, components also accept a `directives` option:

```js
directives: {
  focus: {
    // directive definition
    mounted(el) {
      el.focus()
    }
  }
}
```

Then in a template, you can use the new `v-focus` attribute on any element, like this:

```vue-html
<input v-focus />
```

## Hook Functions

A directive definition object can provide several hook functions (all optional):

- `created`: called before the bound element's attributes or event listeners are applied. This is useful in cases where the directive needs to attach event listeners that must be called before normal `v-on` event listeners.

- `beforeMount`: called when the directive is first bound to the element and before parent component is mounted.

- `mounted`: called when the bound element's parent component is mounted.

- `beforeUpdate`: called before the containing component's VNode is updated

:::tip Note
We'll cover VNodes in more detail [later](render-function.html#the-virtual-dom-tree), when we discuss render functions.
:::

- `updated`: called after the containing component's VNode **and the VNodes of its children** have updated.

- `beforeUnmount`: called before the bound element's parent component is unmounted

- `unmounted`: called only once, when the directive is unbound from the element and the parent component is unmounted.

You can check the arguments passed into these hooks (i.e. `el`, `binding`, `vnode`, and `prevVnode`) in [Custom Directive API](../api/application-api.html#directive)

### Dynamic Directive Arguments

Directive arguments can be dynamic. For example, in `v-mydirective:[argument]="value"`, the `argument` can be updated based on data properties in our component instance! This makes our custom directives flexible for use throughout our application.

Let's say you want to make a custom directive that allows you to pin elements to your page using fixed positioning. We could create a custom directive where the value updates the vertical positioning in pixels, like this:

```vue-html
<div id="dynamic-arguments-example" class="demo">
  <p>Scroll down the page</p>
  <p v-pin="200">Stick me 200px from the top of the page</p>
</div>
```

```js
const app = Vue.createApp({})

app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    // binding.value is the value we pass to directive - in this case, it's 200
    el.style.top = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
```

This would pin the element 200px from the top of the page. But what happens if we run into a scenario when we need to pin the element from the left, instead of the top? Here's where a dynamic argument that can be updated per component instance comes in very handy:

```vue-html
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      direction: 'right'
    }
  }
})

app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    // binding.arg is an argument we pass to directive
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
```

Result:

<common-codepen-snippet title="Custom directives: dynamic arguments" slug="YzXgGmv" :preview="false" />

Our custom directive is now flexible enough to support a few different use cases. To make it even more dynamic, we can also allow to modify a bound value. Let's create an additional property `pinPadding` and bind it to the `<input type="range">`

```vue-html{4}
<div id="dynamicexample">
  <h2>Scroll down the page</h2>
  <input type="range" min="0" max="500" v-model="pinPadding">
  <p v-pin:[direction]="pinPadding">Stick me {{ pinPadding + 'px' }} from the {{ direction || 'top' }} of the page</p>
</div>
```

```js{5}
const app = Vue.createApp({
  data() {
    return {
      direction: 'right',
      pinPadding: 200
    }
  }
})
```

Now let's extend our directive logic to recalculate the distance to pin on component update:

```js{7-10}
app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  },
  updated(el, binding) {
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})
```

Result:

<common-codepen-snippet title="Custom directives: dynamic arguments + dynamic binding" slug="rNOaZpj" :preview="false" />

## Function Shorthand

In previous example, you may want the same behavior on `mounted` and `updated`, but don't care about the other hooks. You can do it by passing the callback to directive:

```js
app.directive('pin', (el, binding) => {
  el.style.position = 'fixed'
  const s = binding.arg || 'top'
  el.style[s] = binding.value + 'px'
})
```

## Object Literals

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

## Usage on Components

When used on components, custom directive will always apply to component's root node, similarly to [non-prop attributes](component-attrs.html).

```vue-html
<my-component v-demo="test"></my-component>
```

```js
app.component('my-component', {
  template: `
    <div> // v-demo directive will be applied here
      <span>My component content</span>
    </div>
  `
})
```

Unlike attributes, directives can't be passed to a different element with `v-bind="$attrs"`.

With [fragments](/guide/migration/fragments.html#overview) support, components can potentially have more than one root nodes. When applied to a multi-root component, directive will be ignored and the warning will be thrown.
