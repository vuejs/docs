# Global API

In Vue 3, global APIs that globally mutate Vue's behavior are now moved to application instances created by the new `createApp` method, and their effects are now scoped to that application instance only:

```js
import { createApp } from 'vue'

const app = createApp({})
```

Calling `createApp` returns an application instance. This instance provides an application context. The entire component tree mounted by the application instance share the same context, which provides the configurations that were previously "global" in Vue 2.x.

## component

- **Arguments:**
  - `{string} name`
  - `{PublicAPIComponent} [definition]`

- **Usage:**

  Register or retrieve a global component. Registration also automatically sets the component's `name` with the given `name` parameter.

``` js
import { createApp } from 'vue'

const app = createApp({})

// register an options object
app.component('my-component', { /* ... */ })

// retrieve a registered component (always return constructor)
const MyComponent = app.component('my-component', {})
```

- **See also:** [Components](../guide/component-basics.html)

## config

An object containing application configurations.

- **Usage:**

```js
import { createApp } from 'vue'
const app = createApp({})

app.config = {...}
```

- **See also:** [Global Config Properties](./global-config.html)

## directive

- **Arguments:**
  - `{string} name`
  - `{Directive} [definition]`

- **Usage:**

  Register or retrieve a global directive.

``` js
import { createApp } from 'vue'
const app = createApp({})

// register
app.directive('my-directive', {
  // Directive has a set of lifecycle hooks:
  // called before bound element's parent component is mounted
  beforeMount() {},
  // called when bound element's parent component is mounted
  mounted() {},
  // called before the containing component's VNode is updated
  beforeUpdate() {},
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated() {},
  // called before the bound element's parent component is unmounted
  beforeUnmount() {},
  // called when the bound element's parent component is unmounted
  unmounted() {}
})

// register (function directive)
app.directive('my-directive', () => {
  // this will be called as `mounted` and `updated`
})

// getter, return the directive definition if registered
const myDirective = app.directive('my-directive')
```

Directive hooks are passed these arguments:

### el

The element the directive is bound to. This can be used to directly manipulate the DOM.

### binding

An object containing the following properties.

- `instance`: The instance of the component where directive is used.
- `value`: The value passed to the directive. For example in `v-my-directive="1 + 1"`, the value would be `2`.
- `oldValue`: The previous value, only available in `beforeUpdate` and `updated`. It is available whether or not the value has changed.
- `arg`: The argument passed to the directive, if any. For example in `v-my-directive:foo`, the arg would be `"foo"`.
- `modifiers`: An object containing modifiers, if any. For example in `v-my-directive.foo.bar`, the modifiers object would be `{ foo: true, bar: true }`.
- `dir`: an object, passed as a parameter when directive is registered. For example, in the directive

```js
app.directive('focus', {
  mounted(el) {
    el.focus()
  },
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

### vnode

A blueprint of the real DOM element received as el argument above. See the [VNode API](TODO) for full details.

### prevNode

The previous virtual node, only available in the `beforeUpdate` and `updated` hooks.

:::tip Note
Apart from `el`, you should treat these arguments as read-only and never modify them. If you need to share information across hooks, it is recommended to do so through element's [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
:::

- **See also:** [Custom Directives](../guide/custom-directive.html)
