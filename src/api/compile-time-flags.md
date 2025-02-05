---
outline: deep
---

# Compile-Time Flags {#compile-time-flags}

:::tip
Flagi kompilacji mają zastosowanie tylko w przypadku kompilacji Vue przy użyciu `esm-bundler` (czyli `vue/dist/vue.esm-bundler.js`).
:::

Podczas korzystania z Vue z krokiem kompilacji możliwe jest skonfigurowanie szeregu flag kompilacji w celu włączenia/wyłączenia określonych funkcji. Korzyścią z korzystania z flag kompilacji jest to, że funkcje wyłączone w ten sposób można usunąć z ostatecznego pakietu za pomocą tree-shaking.

Vue będzie działać nawet jeśli te flagi nie zostaną jawnie skonfigurowane. Zaleca się jednak, aby zawsze je konfigurować, tak aby odpowiednie funkcje mogły zostać prawidłowo usunięte, gdy będzie to możliwe.

Zobacz [Configuration Guides](#configuration-guides), aby dowiedzieć się, jak je skonfigurować w zależności od narzędzia kompilacji.

## `__VUE_OPTIONS_API__` {#VUE_OPTIONS_API}

- **Domyślnie:** `true`

  Włącz/wyłącz obsługę Options API. Wyłączenie tej opcji spowoduje mniejsze pakiety, ale może wpłynąć na zgodność z bibliotekami innych firm, jeśli polegają na Options API.

## `__VUE_PROD_DEVTOOLS__` {#VUE_PROD_DEVTOOLS}

- **Domyślnie:** `false`

  Włącz/wyłącz obsługę narzędzi deweloperskich w kompilacjach produkcyjnych. Spowoduje to dołączenie większej ilości kodu do pakietu, dlatego zaleca się włączenie tej opcji tylko w celach debugowania.

## `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` <sup class="vt-badge" data-text="3.4+" /> {#VUE_PROD_HYDRATION_MISMATCH_DETAILS}

- **Domyślnie:** `false`

  Włącz/wyłącz szczegółowe ostrzeżenia dotyczące niezgodności nawodnienia w kompilacjach produkcyjnych. Spowoduje to dołączenie większej ilości kodu do pakietu, dlatego zaleca się włączenie tej opcji tylko w celach debugowania.

## Przewodniki konfiguracji {#configuration-guides}

### Vite {#vite}

`@vitejs/plugin-vue` automatycznie podaje wartości domyślne dla tych flag. Aby zmienić wartości domyślne, użyj opcji konfiguracyjnej [`define`](https://vitejs.dev/config/shared-options.html#define) Vite:

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    // włącz szczegóły niezgodności hydration w kompilacji produkcyjnej
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  }
})
```

### vue-cli {#vue-cli}

`@vue/cli-service` automatycznie dostarcza wartości domyślne dla niektórych z tych flag. Aby skonfigurować/zmienić wartości:

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

Flagi należy definiować za pomocą [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) pakietu webpack:

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

Flagi należy definiować za pomocą [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace):

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
