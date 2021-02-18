# Getting Started

## Installation

In order to create a server-side rendered application, we need to install `@vue/server-renderer` package:

```bash
npm install @vue/server-renderer
## OR
yarn add @vue/server-renderer
```

#### Notes

- It's recommended to use Node.js version 10+.
- `@vue/server-renderer` and `vue` must have matching versions.
- `@vue/server-renderer` relies on some Node.js native modules and therefore can only be used in Node.js. We may provide a simpler build that can be run in other JavaScript runtimes in the future.

## Rendering a Vue Instance

Unlike Vue client-only application, SSR one should use a different method for creating an application instance: instead of `createApp` we need to use `createSSRApp`.

```js
// server.js
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

Now, we can use `renderToString` method to render an application instance to string. This method returns a Promise which resolves to the rendered HTML.

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

To run an application, [Express](https://expressjs.com/):

```bash
npm install express
## OR
yarn add express
```

```js
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
      ${appContent}
    </body>
  </html>
  `

  res.end(html)
})

server.listen(8080)
```

## Using a Page Template

When you render a Vue app, the renderer only generates the markup of the app. In the example we had to wrap the output with an extra HTML page shell.

To simplify this, you can directly provide a page template when creating the renderer. Most of the time we will put the page template in its own file, e.g. `index.template.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello</title>
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```

Notice the `<!--vue-ssr-outlet-->` comment -- this is where your app's markup will be injected.

We can then read and pass the file to the Vue renderer:

```js
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

renderer.renderToString(app, (err, html) => {
  console.log(html) // will be the full page with app content injected.
})
```
