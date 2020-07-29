# Global API

## createApp

Returns an application instance which provides an application context. The entire component tree mounted by the application instance share the same context.

```js
const app = Vue.createApp({})
```

You can chain other methods after `createApp`, they can be found in [Application API](./application-api.html)

### Arguments

The function receives a root component options object as a first parameter:

```js
const app = Vue.createApp({
  data() {
    return {
      ...
    }
  },
  methods: {...},
  computed: {...}
  ...
})
```

With the second parameter, we can pass root props to the application:

```js
const app = Vue.createApp(
  {
    props: ['username']
  },
  { username: 'Evan' }
)
```


```html
<div id="app">
  <!-- Will display 'Evan' -->
  {{ username }}
</div>
```

### Typing

```ts
interface Data {
  [key: string]: unknown
}

export type CreateAppFunction<HostElement> = (
  rootComponent: PublicAPIComponent,
  rootProps?: Data | null
) => App<HostElement>
```

## h

Returns a returns "virtual node", usually abbreviated to **VNode**: a plain object which contains information describing to Vue what kind of node it should render on the page, including descriptions of any child nodes. It is intended for manually written [render functions](../guide/render-function.md):

```js
render() {
  return Vue.h('h1', {}, 'Some title')
}
```

### Arguments

Accepts three arguments: `tag`, `props` and `children`

#### tag

- **Type:** `String | Object | Function | null`

- **Details:**

  An HTML tag name, a component, an async component or null. Using null would render a comment. This parameter is required

#### props

- **Type:** `Object`

- **Details:**

  An object corresponding to the attributes, props and events we would use in a template. Optional

#### children

- **Type:** `String | Array | Object`

- **Details:**

  Children VNodes, built using `h()`, or using strings to get "text VNodes" or an object with slots. Optional

  ```js
  h('div', {}, [
    'Some text comes first.',
    h('h1', 'A headline'),
    h(MyComponent, {
      someProp: 'foobar'
    })
  ])
  ```

## defineComponent

Implementation-wise `defineComponent` does nothing but return the object passed to it. However, in terms of typing, the returned value has a synthetic type of a constructor for manual render function, TSX and IDE tooling support.

### Arguments

An object with component options

```js
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  data() {
    return { count: 1 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
```

## defineAsyncComponent

Creates an async component that will be loaded only when it's necessary.

### Arguments

For basic usage, `defineAsyncComponent` can accept a factory function returning a `Promise`. Promise's `resolve` callback should be called when you have retrieved your component definition from the server. You can also call `reject(reason)` to indicate the load has failed.

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)
```

When using [local registration](../guide/component-registration.html#local-registration), you can also directly provide a function that returns a `Promise`:

```js
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```

For advanced usage, `defineAsyncComponent` can accept an object:

The `defineAsyncComponent` method can also return an object of the following format:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent({
  // The factory function
  loader: () => import('./Foo.vue')
  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // A component to use if the load fails
  errorComponent: ErrorComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000,
  // A function that returns a boolean indicating whether the async component should retry when the loader promise rejects
  retryWhen: error => error.code !== 404,
  // Maximum allowed retries number
  maxRetries: 3,
  // Defining if component is suspensible
  suspensible: false
})
```

**See also**: [Dynamic and Async components](../guide/component-dynamic-async.html)

## resolveComponent

:::warning
`resolveComponent` can only be used within `render` or `setup` functions.
:::

Allows resolving a `component` by its name, if it is available in the current application instance.

Returns a `Component` or `undefined` when not found.

```js
const app = Vue.createApp({})
app.component('MyComponent', {
  /* ... */
})
```

```js
import { resolveComponent } from 'vue'
render() {
  const MyComponent = resolveComponent('MyComponent')
}
```

### Arguments

Accepts one argument: `component`

#### component

- **Type:** `String`

- **Details:**

  The name of a loaded component.

## resolveDynamicComponent

:::warning
`resolveDynamicComponent` can only be used within `render` or `setup` functions.
:::

Allows resolving a `component` by the same mechanism that `<component :is="">` employs.

Returns the resolved `Component` or a newly created `VNode` with the component name as the node tag. Will raise a warning if the `Component` was not found.

```js
import { resolveDynamicComponent } from 'vue'
render () {
  const MyComponent = resolveDynamicComponent('MyComponent')
}
```

### Arguments

Accepts one argument: `component`

#### component

- **Type:** `String | Object (component’s options object)`

- **Details:**

  For more details, refer to the documentation on [Dynamic Components](../guide/component-dynamic-async.html).

## resolveDirective

:::warning
`resolveDirective` can only be used within `render` or `setup` functions.
:::

Allows resolving a `directive` by its name, if it is available in the current application instance.

Returns a `Directive` or `undefined` when not found.

```js
const app = Vue.createApp({})
app.directive('highlight', {})
```

```js
import { resolveDirective } from 'vue'
render () {
  const highlightDirective = resolveDirective('highlight')
}
```

### Arguments

Accepts one argument: `name`

#### name

- **Type:** `String`

- **Details:**

  The name of a loaded directive.

## withDirectives

:::warning
`withDirectives` can only be used within `render` or `setup` functions.
:::

Allows applying directives to a **VNode**. Returns a VNode with the applied directives.

```js
import { withDirectives, resolveDirective } from 'vue'
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h('div'), [
  [foo, this.x],
  [bar, this.y]
])
```

### Arguments

Accepts two arguments: `vnode` and `directives`.

#### vnode

- **Type:** `vnode`

- **Details:** 

  A virtual node, usually created with `h()`.

#### directives

- **Type:** `Array`

- **Details:**

  An array of directives. 
  
  Each directive itself is an array, which allows for up to 4 indexes to be defined as seen in the following examples.

  - `[directive]` - The directive by itself. Required.

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(
    h('div'), 
    [ [MyDirective] ]
  )
  ```

  - `[directive, value]` - The above, plus a value of type `any` to be assigned to the directive

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(
    h('div'), 
    [ [MyDirective, 100] ]
  )
  ```

  - `[directive, value, arg]` - The above, plus a `String` argument, ie. `click` in `v-on:click`

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(
    h('div'), 
    [ [MyDirective, 100, 'click'] ]
  )
  ```

  - `[directive, value, arg, modifiers]` - The above, plus a `key: value` pair `Object` defining any modifiers. 

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(
    h('div'), 
    [ [MyDirective, 100, 'click', { prevent: true }] ]
  )
  ```

## createRenderer

The createRenderer function accepts two generic arguments:
`HostNode` and `HostElement`, corresponding to Node and Element types in the
host environment. 
 
For example, for runtime-dom, HostNode would be the DOM
`Node` interface and HostElement would be the DOM `Element` interface.
  
Custom renderers can pass in the platform specific types like this:
``` js
import { createRenderer } from 'vue'
const { render, createApp } = createRenderer<Node, Element>({
  patchProp,
  ...nodeOps
})
```

### Arguments

Accepts two arguments: `HostNode` and `HostElement`

#### HostNode

- **Type:** `Node`

- **Details:**

  The node in the host environment.

#### HostElement

- **Type:** `Element`

- **Details:**

  The element in the host environment.

## nextTick

Defer the callback to be executed after the next DOM update cycle. Use it immediately after you’ve changed some data to wait for the DOM update.

```js
import { createApp, nextTick } from 'vue'

const app = createApp({
  setup() {
    const message = ref('Hello!')
    const changeMessage = async newMessage => {
      message.value = newMessage
      await nextTick()
      console.log('Now DOM is updated')
    }
  }
})
```

**See also**: [`$nextTick` instance method](instance-methods.html#nexttick)
