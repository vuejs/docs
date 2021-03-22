# Build Configuration

The webpack config for an SSR project will be similar to a client-only project. If you're not familiar with configuring webpack, you can find more information in the documentation for [Vue CLI](https://cli.vuejs.org/guide/webpack.html#working-with-webpack) or [configuring Vue Loader manually](https://vue-loader.vuejs.org/guide/#manual-setup).

### Example configuration
Below is a sample `vue.config.js` that adds SSR rendering to a Vue CLI project, but it can be adapted for any webpack build.

```js
const ManifestPlugin = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

module.exports = {
  chainWebpack: webpackConfig => {
    //
    webpackConfig.module.rule('vue').uses.delete('cache-loader')
    webpackConfig.module.rule('js').uses.delete('cache-loader')
    webpackConfig.module.rule('ts').uses.delete('cache-loader')
    webpackConfig.module.rule('tsx').uses.delete('cache-loader')

    if (!process.env.SSR) {
      // Point entry to your app's client entry file
      webpackConfig
        .entry('app')
        .clear()
        .add('./src/client-entry.js')
      return
    }

    // Point entry to your app's server entry file
    webpackConfig
      .entry('app')
      .clear()
      .add('./src/server-entry.js')

    // This allows webpack to handle dynamic imports in a Node-appropriate
    // fashion, and also tells `vue-loader` to emit server-oriented code when
    // compiling Vue components.
    webpackConfig.target('node')
    // This tells the server bundle to use Node-style exports
    webpackConfig.output.libraryTarget('commonjs2')

    webpackConfig
      .plugin('manifest')
      .use(new ManifestPlugin({ fileName: 'ssr-manifest.json' }))

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // Externalize app dependencies. This makes the server build much faster
    // and generates a smaller bundle file.
    // do not externalize dependencies that need to be processed by webpack.
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }))

    webpackConfig.optimization.splitChunks(false).minimize(false)

    webpackConfig.plugins.delete('hmr')
    webpackConfig.plugins.delete('preload')
    webpackConfig.plugins.delete('prefetch')
    webpackConfig.plugins.delete('progress')
    webpackConfig.plugins.delete('friendly-errors')

    webpackConfig.plugin('limit').use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
  }
}
```

### Externals Caveats

Notice that in the `externals` option we are whitelisting CSS files. This is because CSS imported from dependencies should still be handled by webpack. If you are importing any other types of files that also rely on webpack (e.g. `*.vue`, `*.sass`), you should add them to the whitelist as well.

If you are using `runInNewContext: 'once'` or `runInNewContext: true`, then you also need to whitelist polyfills that modify `global`, e.g. `babel-polyfill`. This is because when using the new context mode, **code inside a server bundle has its own `global` object.** Since you don't really need it on the server when using Node 7.6+, it's actually easier to just import it in the client entry.

### Generating `clientManifest`

In addition to the server bundle, we can also generate a client build manifest. With the client manifest and the server bundle, the renderer now has information of both the server _and_ client builds, so it can automatically infer and inject [preload / prefetch directives](https://css-tricks.com/prefetching-preloading-prebrowsing/) and css links / script tags into the rendered HTML.

The benefits are two-fold:

1. It can replace `html-webpack-plugin` for injecting the correct asset URLs when there are hashes in your generated filenames.

2. When rendering a bundle that leverages webpack's on-demand code splitting features, we can ensure the optimal chunks are preloaded / prefetched, and also intelligently inject `<script>` tags for needed async chunks to avoid waterfall requests on the client, thus improving TTI (time-to-interactive).
