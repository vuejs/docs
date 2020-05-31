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

## defineComponent

## defineAsyncComponent

## createRenderer

## getCurrentInstance

## nextTick
