# Source Code Structure

## Avoid Stateful Singletons

When writing client-only code, we can assume that our code will be evaluated in a fresh context every time. However, a Node.js server is a long-running process. When our code is first imported by the process, it will be evaluated once and then stay in memory. This means that if you create a singleton object, it will be shared between every incoming request, with the risk of cross-request state pollution.

```js
// bad
import app from './app.js'

server.get('*', async (req, res) => {
  // the app is now shared amongst all users
  const result = await renderToString(app)
  // ...
})
```

```js
// good
function createApp() {
  return createSSRApp(/* ... */)
}

server.get('*', async (req, res) => {
  // each user gets its own app
  const app = createApp()
  const result = await renderToString(app)
  // ...
})
```

Therefore, we need to **create a new root Vue instance for each request.** In order to do that, we need to write a factory function that can be repeatedly executed to create fresh app instances for each request:

```js
// server.js
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const express = require('express')

const server = express()

function createApp() {
  return createSSRApp({
    data() {
      return {
        user: 'John Doe'
      }
    },
    template: `<div>Current user is: {{ user }}</div>`
  })
}

server.get('*', async (req, res) => {
  const app = createApp()

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

server.listen(8080)
```

The same rule applies to other instances as well (such as the router or store). Instead of exporting the router or store directly from a module and importing it across your app, you should create a fresh instance in `createApp` and inject it from the root Vue instance each time a new request is made.

## Introducing a Build Step

So far, we haven't discussed how to deliver the same Vue app to the client yet. To do that, we need to use webpack to bundle our Vue app.

- We need to process the server code with webpack. For example, `.vue` files need to be processed with `vue-loader`, and many webpack-specific features such as importing files via `file-loader` or importing CSS via `css-loader` do not work directly in Node.js.

- Similarly, we need a separate client-side build because although the latest version of Node.js fully supports ES2015 features, older browsers will require the code to be transpiled.

So the basic idea is that we will use webpack to bundle our app for both client and server. The server bundle will be required on the server and used to render static HTML, while the client bundle will be sent to the browser to hydrate the static markup.

![architecture](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

We will discuss the details of the setup in later sections - for now, let's just assume we've got the build setup figured out and we can write our Vue app code with webpack enabled.

## Code Structure with webpack

Now that we are using webpack to process the app for both server and client, the majority of our source code can be written in a universal fashion, with access to all the webpack-powered features. At the same time, there are a number of things you should keep in mind when [writing universal code](./universal.html).

A simple project would look like this:

```bash
src
├── components
│   ├── MyUser.vue
│   └── MyTable.vue
├── App.vue # the root of your application
├── entry-client.js # runs in browser only
└── entry-server.js # runs on server only
```

### `App.vue`

You may have noticed we now have a file called `App.vue` in the root of our `src` folder. That's where the root component of your application will be stored. We can now safely move the application code from `server.js` to the `App.vue` file:

```vue
<template>
  <div>Current user is: {{ user }}</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: 'John Doe'
    }
  }
}
</script>
```

### `entry-client.js`

The client entry creates the application using the `App.vue` component and mounts it to the DOM:

```js
import { createSSRApp } from 'vue'
import App from './App.vue'

// client-specific bootstrapping logic...

const app = createSSRApp(App)

// this assumes App.vue template root element has `id="app"`
app.mount('#app')
```

### `entry-server.js`

The server entry uses a default export which is a function that can be called repeatedly for each render. At this moment, it doesn't do much other than returning the app instance - but later we will perform server-side route matching and data pre-fetching logic here.

```js
import { createSSRApp } from 'vue'
import App from './App.vue'

export default function () {
  const app = createSSRApp(App)

  return {
    app
  }
}
```
