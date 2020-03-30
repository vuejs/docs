# Custom Directives

## Intro

In addition to the default set of directives shipped in core (`v-model` and `v-show`), Vue also allows you to register your own custom directives. Note that in Vue, the primary form of code reuse and abstraction is components - however there may be cases where you need some low-level DOM access on plain elements, and this is where custom directives would still be useful. An example would be focusing on an input element, like this one:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="JjdxaJW" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Custom directives: basic example">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/JjdxaJW">
  Custom directives: basic example</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

When the page loads, that element gains focus (note: `autofocus` doesn't work on mobile Safari). In fact, if you haven't clicked on anything else since visiting this page, the input above should be focused now. Now let's build the directive that accomplishes this:

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

```html
<input v-focus />
```

## Hook Functions

A directive definition object can provide several hook functions (all optional):

- `beforeMount`: called only once, when the directive is first bound to the element and before parent component is mounted. This is where you can do one-time setup work.

- `mounted`: called when the bound element's parent component is mounted.

- `beforeUpdate`: called before the the containing component's VNode is updated

:::tip Note
We'll cover VNodes in more detail [later](TODO:/render-function.html#The-Virtual-DOM), when we discuss [render functions](TODO:./render-function.html).
:::

- `updated`: called after the containing component's VNode **and the VNodes of its children** have updated.

- `beforeUnmount`: called before the bound element's parent component is unmounted

- `unmounted`: called only once, when the directive is unbound from the element and the parent component is unmounted.

We'll explore the arguments passed into these hooks (i.e. `el`, `binding`, `vnode`, and `prevVnode`) in the next section.

## Directive Hook Arguments

Directive hooks are passed these arguments:

- `el`: The element the directive is bound to. This can be used to directly manipulate the DOM.
- `binding`: An object containing the following properties.
  - `instance`: The instance of the parent component of the directive's bound element
  - `value`: The value passed to the directive. For example in `v-my-directive="1 + 1"`, the value would be `2`.
  - `oldValue`: The previous value, only available in `update` and `componentUpdated`. It is available whether or not the value has changed.
  - `arg`: The argument passed to the directive, if any. For example in `v-my-directive:foo`, the arg would be `"foo"`.
  - `modifiers`: An object containing modifiers, if any. For example in `v-my-directive.foo.bar`, the modifiers object would be `{ foo: true, bar: true }`.
  - `dir`: an object, passed as a parameter to the directive. For example, in the our first directive
  ```js
  app.directive('focus', {
    mounted(el) {
      el.focus()
    }
  })
  ```
  `dir` would be the following object:
  ```js
  {
    mounted(el) {
      el.focus()
    }
  }
  ```
- `vnode`: The virtual node produced by Vue's compiler. See the [VNode API](TODO:../api/#VNode-Interface) for full details.
- `prevVnode`: The previous virtual node, only available in the `update` and `componentUpdated` hooks.

:::tip Note
Apart from `el`, you should treat these arguments as read-only and never modify them. If you need to share information across hooks, it is recommended to do so through element's [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
:::

An example of a custom directive using some of these properties:

```html
<div id="hook-arguments-example" class="demo">
  <span v-demo:foo.a.b="message"></span>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      message: 'hello!'
    }
  }
})

app.directive('demo', {
  mounted(el, binding, vnode) {
    const s = JSON.stringify
    el.innerHTML =
      'value: ' +
      s(binding.value) +
      '<br>' +
      'argument: ' +
      s(binding.arg) +
      '<br>' +
      'modifiers: ' +
      s(binding.modifiers) +
      '<br>' +
      'vnode keys: ' +
      Object.keys(vnode).join(', ')
  }
})

app.mount('#hook-arguments-example')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="KKpJxJp" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Custom directives: example with arguments">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/KKpJxJp">
  Custom directives: example with arguments</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Dynamic Directive Arguments

Directive arguments can be dynamic. For example, in `v-mydirective:[argument]="value"`, the `argument` can be updated based on data properties in our component instance! This makes our custom directives flexible for use throughout our application.

Let's say you want to make a custom directive that allows you to pin elements to your page using fixed positioning. We could create a custom directive where the value updates the vertical positioning in pixels, like this:

```html
<div id="baseexample">
  <p>Scroll down the page</p>
  <p v-pin="200">Stick me 200px from the top of the page</p>
</div>
```

```js
Vue.directive('pin', {
  bind: function(el, binding, vnode) {
    el.style.position = 'fixed'
    el.style.top = binding.value + 'px'
  }
})

new Vue({
  el: '#baseexample'
})
```

This would pin the element 200px from the top of the page. But what happens if we run into a scenario when we need to pin the element from the left, instead of the top? Here's where a dynamic argument that can be updated per component instance comes in very handy:

```html
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
```

```js
Vue.directive('pin', {
  bind: function(el, binding, vnode) {
    el.style.position = 'fixed'
    var s = binding.arg == 'left' ? 'left' : 'top'
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function() {
    return {
      direction: 'left'
    }
  }
})
```

Result:

{% raw %}

<iframe height="200" style="width: 100%;" class="demo" scrolling="no" title="Dynamic Directive Arguments" src="//codepen.io/team/Vue/embed/rgLLzb/?height=300&theme-id=32763&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/team/Vue/pen/rgLLzb/'>Dynamic Directive Arguments</a> by Vue
  (<a href='https://codepen.io/Vue'>@Vue</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
{% endraw %}

Our custom directive is now flexible enough to support a few different use cases.

## Function Shorthand

In many cases, you may want the same behavior on `bind` and `update`, but don't care about the other hooks. For example:

```js
Vue.directive('color-swatch', function(el, binding) {
  el.style.backgroundColor = binding.value
})
```

## Object Literals

If your directive needs multiple values, you can also pass in a JavaScript object literal. Remember, directives can take any valid JavaScript expression.

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
Vue.directive('demo', function(el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```
