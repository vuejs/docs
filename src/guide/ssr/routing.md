# Routing and Code-Splitting

## Routing with `vue-router`

You may have noticed that our server code uses a `*` handler which accepts arbitrary URLs. This allows us to pass the visited URL into our Vue app, and reuse the same routing config for both client and server!

It is recommended to use the official [vue-router](https://github.com/vuejs/vue-router-next) library for this purpose. Let's first create a file where we create the router. Note that similar to `createRootComponent`, we also need a fresh router instance for each request, so the file exports a `createRouter` function:

```js
// router.js
import {
  createRouter,
  createMemoryHistory,
  createWebHistory
} from 'vue-router'

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
import { createSSRApp, h } from 'vue'
import App from './App.vue'
import createRouter from './router'

export default function(args) {
  const rootComponent = {
    render: () => h(App),
    components: { App },
    setup() {
      /*...*/
    }
  }

  const app = createSSRApp(rootComponent)
  const router = createRouter()

  app.use(router)

  return {
    app,
    router
  }
}
```

```js
// entry-client.js
const { app, router } = createApp({
  /*...*/
})
```

```js
// entry-server.js
const { app, router } = createApp({
  /*...*/
})
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

Note that it is still necessary to use `router.isReady` on both server and client before returning / mounting the app, because the router must resolve async route components ahead of time in order to properly invoke in-component hooks. Let's update our client entry:

```js
// entry-client.js

import { createApp } from 'vue'
import createRootComponent from './app'

const { app, router } = createApp({
  /* ... */
})

router.isReady().then(() => {
  app.mount('#app')
})
```

For server part, we need to update our `server.js` script:

```js
// server.js
const createApp = require('./app')

server.get('*', async (req, res) => {
  const { app, router } = await createApp()

  router.push(req.url)
  await router.isReady()

  const appContent = await renderToString(app)

  const html = `
  <html>
    <body>
      <h1>My First Heading</h1>
      <div id="app">${appContent}</div>
    </body>
  </html>
  `

  res.end(html)
})
```
