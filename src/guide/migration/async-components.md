---
badges:
  - new
---

# Komponen Asinkron <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

Berikut merupakan gambaran umum tentang perubahan yang terjadi:

- Fungsi bantuan baru bernama `defineAsyncComponent` yang secara eksplisit menyatakan komponen asinkron
- Opsi `component` diubah menjadi `loader`
- Fungsi pemuat tidak lagi memiliki argumen `resolve` dan `reject` dan harus mengembalikan sebuah `Promise`

Lanjutkan membaca untuk penjelasan lebih lanjut

## Perkenalan

Sebelumnya, komponen asinkron dibuat dengan menyatakan sebuah komponen sebagai sebuah fungsi yang mengembalikan sebuah `Promise`, seperti:

```js
const asyncModal = () => import('./Modal.vue')
```

Atau, dengan sintaks komponen yang lebih rumit yang memiliki opsi:

```js
const asyncModal = {
  component: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}
```

## Sintaks Pada Versi 3.x

Sekarang di Vue versi 3 karena komponen fungsional dinyatakan sebagai fungsi murni, pernyataan komponen asinkron harus dinyatakan secara eksplisit dengan membungkus komponen dengan sebuah fungsi bantuan bernama `defineAsyncComponent`:

```js
import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// Komponen asingkronus tanpa opsi
const asyncModal = defineAsyncComponent(() => import('./Modal.vue'))

// dengan opsi
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

::: tip NOTE
Vue Router supports a similar mechanism for asynchronously loading route components, known as *lazy loading*. Despite the similarities, this feature is distinct from Vue's support for async components. You should **not** use `defineAsyncComponent` when configuring route components with Vue Router. You can read more about this in the [Lazy Loading Routes](https://next.router.vuejs.org/guide/advanced/lazy-loading.html) section of the Vue Router documentation.
:::

::: tip NOTE
Vue router mendukung cara yang sama untuk menggunakan komponen _asynchronously loading route_, yang di ketahui sebagai __lazy loading__. Meskipun hampir sama, fitur ini berbeda dengan Vue komponen _async_. Kamu seharusnya tidak menggunakan `defineAsyncComponent` saat mengkonfigurasi komponen `router` dengan Vue Router. Kamu bisa membaca lebih lanjut tentang [_Lazy Loading Route_](https://next.router.vuejs.org/guide/advanced/lazy-loading.html) disini pada bagian Dokumentasi _Vue Router_.
:::
Perubahan lain yang terjadi dari Vue versi 2 adalah opsi `component` yang diubah menjadi `loader` yang bertujuan untuk menyampaikan bahwa pernyataan komponen tidak dapat disediakan secara langsung.

```js{4}
import { defineAsyncComponent } from 'vue'

const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

Selain itu, tidak sepert pada Vue versi 2, fungsi pemuat tidak lagi memiliki argumen `resolve` dan `reject` dan harus selalu mengembalikan sebuah `Promise`

```js
// Pada Vue versi 2.0
const komponenAsinkronLama = (resolve, reject) => {
  /* ... */
}

// Pada Vue versi 3.0
const komponenAsinkron = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)
```

Anda dapat mempelajari lebih lanjut tentang penggunaan komponen asinknron pada:

- [Panduan: Komponen Dinamis dan Asinkron](/guide/component-dynamic-async.html#dynamic-components-with-keep-alive)
- [_Migration build flag_: `COMPONENT_ASYNC`](migration-build.html#compat-configuration)
