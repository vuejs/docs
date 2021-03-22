# Source Code Structure

## Avoid Stateful Singletons

When writing client-only code, we can assume that our code will be evaluated in a fresh context every time. However, a Node.js server is a long-running process. When our code is first imported by the process, it will be evaluated once and then stay in memory. This means that if you create a singleton object, it will be shared between every incoming request, with the risk of cross-request state pollution.

As seen in the basic example, we are **creating a new root Vue instance for each request.** This is similar to how each user will be using a fresh instance of the app in their own browser. If we use a shared instance across multiple requests, it will easily lead to cross-request state pollution.

So, instead of directly creating an app instance, we should expose a factory function that can be repeatedly executed to create fresh app instances for each request:

```js
// app.js
const { createSSRApp } = require('vue')

module.exports = function createApp() {
  return createSSRApp({
    data() {
      return {
        user: 'John Doe'
      }
    },
    template: `<div>Current user is: {{ user }}</div>`
  })
}
```

And our server code now becomes:

```js
// server.js
const createApp = require('./app')

server.get('*', (req, res) => {
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
```

The same rule applies to router and store instances as well. Instead of exporting it directly from a module and importing it across your app, you need to create a fresh instance in `createApp` and inject it from the root Vue instance.

## Introducing a Build Step

So far, we haven't discussed how to deliver the same Vue app to the client yet. To do that, we need to use webpack to bundle our Vue app. In fact, we probably want to use webpack to bundle the Vue app on the server as well, because:

- Typical Vue apps are built with webpack and `vue-loader`, and many webpack-specific features such as importing files via `file-loader`, importing CSS via `css-loader` would not work directly in Node.js.

- Although the latest version of Node.js fully supports ES2015 features, we still need to transpile client-side code to cater to older browsers. This again involves a build step.

So the basic idea is we will be using webpack to bundle our app for both client and server - the server bundle will be required by the server and used for SSR, while the client bundle is sent to the browser to hydrate the static markup.

![architecture](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

We will discuss the details of the setup in later sections - for now, let's just assume we've got the build setup figured out and we can write our Vue app code with webpack enabled.

## Code Structure with webpack

Now that we are using webpack to process the app for both server and client, the majority of our source code can be written in a universal fashion, with access to all the webpack-powered features. At the same time, there are [a number of things](./universal.md) you should keep in mind when writing universal code.

A simple project would look like this:

```bash
src
├── components
│   ├── MyUser.vue
│   └── MyTable.vue
├── App.vue
├── app.js # universal entry
├── entry-client.js # runs in browser only
└── entry-server.js # runs on server only
```

### `app.js`

`app.js` is the universal entry to our app. In a client-only app, we would create the Vue application instance right in this file and mount directly to DOM. However, for SSR that responsibility is moved into the client-only entry file. `app.js` instead creates an application instance and exports it:

```js
import { createSSRApp, h } from 'vue'
import App from './App.vue'

// export a factory function for creating a root component
export default function(args) {
  const rootComponent = {
    render: () => h(App),
    components: { App },
    setup() {
      // additional application logic here
    }
  }

  const app = createSSRApp(rootComponent)

  return {
    app
  }
}
```

### `entry-client.js`

The client entry creates the application using the root component factory and mounts it to the DOM:

```js
import createApp from './app'

// client-specific bootstrapping logic...

const { app } = createApp({
  // here we can pass additional arguments to app factory
})

// this assumes App.vue template root element has `id="app"`
app.mount('#app')
```

### `entry-server.js`

The server entry uses a default export which is a function that can be called repeatedly for each render. At this moment, it doesn't do much other than returning the app instance - but later we will perform server-side route matching and data pre-fetching logic here.

```js
import createApp from './app'

export default function() {
  const { app } = createApp({
    /*...*/
  })

  return {
    app
  }
}
```
