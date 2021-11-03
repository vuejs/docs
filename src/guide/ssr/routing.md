# Routing and Code-Splitting

## Routing with `vue-router`

You may have noticed that our server code uses a `*` handler which accepts arbitrary URLs. This allows us to pass the visited URL into our Vue app, and reuse the same routing config for both client and server!

It is recommended to use the official [vue-router](https://github.com/vuejs/vue-router-next) library for this purpose. Let's first create a file where we create the router. Note that similar to application instance, we also need a fresh router instance for each request, so the file exports a `createRouter` function:

```js
// router.js
import { createRouter } from 'vue-router'
import MyUser from './components/MyUser.vue'

const routes = [{ path: '/user', component: MyUser }]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}
```

And update our client and server entries:

```js
// entry-client.js
import { createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import createRouter from './router.js'
import App from './App.vue'

// ...

const app = createSSRApp(App)

const router = createRouter(createWebHistory())

app.use(router)

// ...
```

```js
// entry-server.js
import { createSSRApp } from 'vue'
// server router uses a different history from the client one
import { createMemoryHistory } from 'vue-router'
import createRouter from './router.js'
import App from './App.vue'

export default function () {
  const app = createSSRApp(App)
  const router = createRouter(createMemoryHistory())

  app.use(router)

  return {
    app,
    router
  }
}
```

## Code-Splitting

Code-splitting, or lazy-loading part of your app, helps reduce the size of assets that need to be downloaded by the browser for the initial render, and can greatly improve TTI (time-to-interactive) for apps with large bundles. The key is "loading just what is needed" for the initial screen.

Vue Router provides [lazy-loading support](https://next.router.vuejs.org/guide/advanced/lazy-loading.html), allowing [webpack to code-split at that point](https://webpack.js.org/guides/code-splitting-async/). All you need to do is:

```js
// change this...
import MyUser from './components/MyUser.vue'
const routes = [{ path: '/user', component: MyUser }]

// to this:
const routes = [
  { path: '/user', component: () => import('./components/MyUser.vue') }
]
```

On both client and server we need to wait for the router to resolve async route components ahead of time in order to properly invoke in-component hooks. For this we will be using the [router.isReady](https://next.router.vuejs.org/api/#isready) method. Let's update our client entry:

```js
// entry-client.js
import { createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import createRouter from './router.js'
import App from './App.vue'

const app = createSSRApp(App)

const router = createRouter(createWebHistory())

app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
```

We also need to update our `server.js` script:

```js
// server.js
const path = require('path')

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

server.get('*', async (req, res) => {
  const { app, router } = createApp()

  await router.push(req.url)
  await router.isReady()

  const appContent = await renderToString(app)

  fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
    if (err) {
      throw err
    }

    html = html
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
})
```
