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
const halamanAsinkron = () => import('./HalamanSelanjutnya.vue')
```

Atau, dengan sintaks komponen yang lebih rumit yang memiliki opsi:

```js
const halamanAsinkron = {
  component: () => import('./HalamanSelanjutnya.vue'),
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

// Komponen asinkron tanpa opsi
const halamanAsinkron = defineAsyncComponent(() => import('./HalamanSelanjutnya.vue'))

// Komponen asinkron yang memiliki opsi
const halamanAsinkronDenganOpsi = defineAsyncComponent({
  loader: () => import('./HalamanSelanjutnya.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

Perubahan lain yang terjadi dari Vue versi 2 adalah opsi `component` yang diubah menjadi `loader` yang bertujuan untuk menyampaikan bahwa pernyataan komponen tidak dapat disediakan secara langsung.

```js{4}
import { defineAsyncComponent } from 'vue'

const halamanAsinkronDenganOpsi = defineAsyncComponent({
  loader: () => import('./HalamanSelanjutnya.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
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
