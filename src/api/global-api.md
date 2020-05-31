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

```html
<div id="app">
  <!-- Will display 'Evan' -->
  {{ username }}
</div>
```

```js
const app = Vue.createApp(
  {
    props: ['username']
  },
  { username: 'Evan' }
)
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
  return Vue.h('h1', {},'Some title')
}
```

### Arguments

Accepts three arguments: tag, props and children

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

  Children VNodes, built using `h()`, or using strings to get 'text VNodes' or an object with slots. Optional

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

## defineAsyncComponent

## createRenderer

## getCurrentInstance

## nextTick
