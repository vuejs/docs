# Routing and Code-Splitting

## Routing with `vue-router`

You may have noticed that our server code uses a `*` handler which accepts arbitrary URLs. This allows us to pass the visited URL into our Vue app, and reuse the same routing config for both client and server!

It is recommended to use the official [vue-router](https://github.com/vuejs/vue-router-next) library for this purpose. Let's first create a file where we create the router. Note that similar to `createRootComponent`, we also need a fresh router instance for each request, so the file exports a `createRouter` function:

```js
// router.js
const {
  createRouter,
  createMemoryHistory,
  createWebHistory
} = require('vue-router')

const isServer = typeof window === 'undefined'

let history = isServer ? createMemoryHistory() : createWebHistory()

const routes = [
  /* ... */
]

export default function() {
  return createRouter({ routes, history })
}
```

And update our `app.js`, client and server entries:

```js
// app.js
import { h } from 'vue'
import App from './App.vue'
import createRouter from './router'

export default function(args) {
  return {
    rootComponent: {
      render: () => h(App),
      components: { App },
      setup() {
        nativeStore.provideStore(args.nativeStore)
        vuexStore.provideStore(args.vuexStore)
      }
    },
    // create a router instance
    router: createRouter()
  }
}
```

```js
// entry-client.js

const { rootComponent, router } = createRootComponent({})

const app = createApp(rootComponent)
app.use(router)
```

```js
// entry-server.js
const { rootComponent, router } = createRootComponent({})

const app = createSSRApp(rootComponent)

app.use(router)

return {
  app,
  router
}
```

## Code-Splitting

Code-splitting, or lazy-loading part of your app, helps reducing the amount of assets that need to be downloaded by the browser for the initial render, and can greatly improve TTI (time-to-interactive) for apps with large bundles. The key is "loading just what is needed" for the initial screen.

Vue provides async components as a first-class concept, combining it with [webpack 2's support for using dynamic import as a code-split point](https://webpack.js.org/guides/code-splitting-async/), all you need to do is:

```js
// changing this...
import User from './User.vue'

// to this:
const User = () => import('./User.vue')
```

Note that it is still necessary to use `router.isReady` on both server and client before returning / mounting the app, because the router must resolve async route components ahead of time in order to properly invoke in-component hooks. We already did that in our server entry, and now we just need to update the client entry:

```js
// entry-client.js

import { createApp } from 'vue'
import createRootComponent from './app'

const { rootComponent, router } = createRootComponent({})

const app = createApp(rootComponent)

app.use(router)

(async (r, a) => {
  await r.isReady()
  a.mount('#app', true)
})(router, app)
```
