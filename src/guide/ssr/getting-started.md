# Getting Started

> This guide is currently under active development

## Installation

In order to create a server-side rendered application, we need to install the `@vue/server-renderer` package:

```bash
npm install @vue/server-renderer
## OR
yarn add @vue/server-renderer
```

#### Notes

- It's recommended to use Node.js version 10+.
- `@vue/server-renderer` and `vue` must have matching versions.
- `@vue/server-renderer` relies on some Node.js native modules and therefore can only be used in Node.js. We may provide a simpler build that can be run in other JavaScript runtimes in the future.

## Rendering a Vue Application

Unlike a client-only Vue application, which is created using `createApp`, an SSR application needs to be created using `createSSRApp`:

```js
const { createSSRApp } = require('vue')

const app = createSSRApp({
  data() {
    return {
      user: 'John Doe'
    }
  },
  template: `<div>Current user is: {{ user }}</div>`
})
```

Now, we can use the `renderToString` function to render our application instance to a string. This function returns a Promise which resolves to the rendered HTML.

```js{2,13}
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')

const app = createSSRApp({
  data() {
    return {
      user: 'John Doe'
    }
  },
  template: `<div>Current user is: {{ user }}</div>`
})

const appContent = await renderToString(app)
```

## Integrating with a Server

To run an application, in this example we will use [Express](https://expressjs.com/):

```bash
npm install express
## OR
yarn add express
```

```js
// server.js

const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const server = require('express')()

server.get('*', async (req, res) => {
  const app = createSSRApp({
    data() {
      return {
        user: 'John Doe'
      }
    },
    template: `<div>Current user is: {{ user }}</div>`
  })

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

Now, when running this Node.js script, we can see a static HTML page on `localhost:8080`. However, this code is not _hydrated_: Vue hasn't yet taken over the static HTML sent by the server to turn it into dynamic DOM that can react to client-side data changes. This will be covered in the [Client Side Hydration](hydration.html) section.
