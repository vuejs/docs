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

- **See also:** [Components](../guide/component-basics)
