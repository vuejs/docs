# Server Configuration

The [code structure](./structure.html) and [webpack configuration](./build-config.html) we've described also require some changes to our Express server code.

- we need to create an application with a built `app.js` from the resulting bundle. A path to it can be found using the webpack manifest:

  ```js
  // server.js
  const path = require('path')
  const manifest = require('./dist/server/ssr-manifest.json')

  const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
  const createApp = require(appPath).default
  ```

- we have to define correct paths to all the assets:

  ```js
  // server.js
  server.use(
    '/img',
    express.static(path.join(__dirname, './dist/client', 'img'))
  )
  server.use('/js', express.static(path.join(__dirname, './dist/client', 'js')))
  server.use(
    '/css',
    express.static(path.join(__dirname, './dist/client', 'css'))
  )
  server.use(
    '/favicon.ico',
    express.static(path.join(__dirname, './dist/client', 'favicon.ico'))
  )
  ```

- we need to replace the `index.html` content with our server-side rendered application content:

  ```js
  // server.js
  const indexTemplate = fs.readFileSync(
    path.join(__dirname, '/dist/client/index.html'),
    'utf-8'
  )

  server.get('*', async (req, res) => {
    const { app } = createApp()

    const appContent = await renderToString(app)

    const html = indexTemplate
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`)

    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
  ```

Below you can find a full code for our Express server:

```js
const path = require('path')
const express = require('express')
const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')
const manifest = require('./dist/server/ssr-manifest.json')

const server = express()

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

server.use('/img', express.static(path.join(__dirname, './dist/client', 'img')))
server.use('/js', express.static(path.join(__dirname, './dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, './dist/client', 'css')))
server.use(
  '/favicon.ico',
  express.static(path.join(__dirname, './dist/client', 'favicon.ico'))
)

server.get('*', async (req, res) => {
  const { app } = await createApp()

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

console.log('You can navigate to http://localhost:8080')

server.listen(8080)
```
