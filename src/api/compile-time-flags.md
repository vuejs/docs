---
outline: deep
---

# Compile-Time Flags {#compile-time-flags}

:::tip
Compile-time flags only apply when using the `esm-bundler` build of Vue (i.e. `vue/dist/vue.esm-bundler.js`).
:::

When using Vue with a build step, it is possible to configure a number of compile-time flags to enable / disable certain features. The benefit of using compile-time flags is that features disabled this way can be removed from the final bundle via tree-shaking.

Vue will work even if these flags are not explicitly configured. However, it is recommended to always configure them so that the relevant features can be properly removed when possible.

See [Configuration Guides](#configuration-guides) on how to configure them depending on your build tool.

## `__VUE_OPTIONS_API__` {#VUE_OPTIONS_API}

- **Default:** `true`

  Enable / disable Options API support. Disabling this will result in smaller bundles, but may affect compatibility with 3rd party libraries if they rely on Options API.

## `__VUE_PROD_DEVTOOLS__` {#VUE_PROD_DEVTOOLS}

- **Default:** `false`

  Enable / disable devtools support in production builds. This will result in more code included in the bundle, so it is recommended to only enable this for debugging purposes.

## `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` <sup class="vt-badge" data-text="3.4+" /> {#VUE_PROD_HYDRATATION_MISMATCH_DETAILS}

- **Default:** `false`

  Enable/disable detailed warnings for hydration mismatches in production builds. This will result in more code included in the bundle, so it is recommended to only enable this for debugging purposes.

## Configuration Guides {#configuration-guides}

### Vite {#vite}

`@vitejs/plugin-vue` automatically provides default values for these flags. To change the default values, use Vite's [`define` config option](https://vitejs.dev/config/shared-options.html#define):

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  }
})
```

### vue-cli {#vue-cli}

`@vue/cli-service` automatically provides default values for some of these flags. To configure /change the values:

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  }
}
```

### webpack {#webpack}

Flags should be defined using webpack's [DefinePlugin](https://webpack.js.org/plugins/define-plugin/):

```js
// webpack.config.js
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    })
  ]
}
```

### Rollup {#rollup}

Flags should be defined using [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace):

```js
// rollup.config.js
import replace from '@rollup/plugin-replace'

export default {
  plugins: [
    replace({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    })
  ]
}
```
