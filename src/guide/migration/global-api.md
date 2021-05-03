---
badges:
  - breaking
---

# API Global <MigrationBadges :badges="$frontmatter.badges" />

Vue versi 2.x memiliki beberapa API dan konfigurasi yang secara global mengubah perilaku Vue. Sebagai contoh, untuk membuat sebuah komponen global, Anda akan menggunakan API `Vue.component` seperti berikut:

```js
Vue.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Ditekan sebanyak {{ count }} kali.</button>'
})
```

Mirip dengan komponen global, berikut merupakan bagaimana sebuah _directive_ global dideklarasikan:

```js
Vue.directive('focus', {
  inserted: el => el.focus()
})
```

Walaupun cara di atas cenderung praktis, namun cara tersebut menimbulkan beberapa masalah. Secara teknis, Vue versi 2 tidak memiliki konsep "aplikasi". Apa yang Anda definisikan sebagai sebuah aplikasi sebenarnya merupakan sebuah objek Vue utama yang dibuat menggunakan `new Vue()`. Setiap objek Vue dibuat dari konstruktor Vue yang sama **akan memiliki konfigurasi global yang sama**. Sehingga:

- Konfigurasi global mempermudah adanya intervensi pada kasus uji lain selama proses pengujian secara tidak sengaja. Pengguna harus berhati-hati dalam menyimpan konfigurasi global yang asli dan mengembalikan konfigurasi tersebut setelah setiap kasus uji dijalankan (sebagai contoh, mengembalikan `Vue.config.errorHandler` seperti sedia kala). Bahkan, beberapa API seperti `Vue.use` dan `Vue.mixin` tidak memiliki cara untuk mengembalikan perubahan yang mereka lakukan. Hal tersebut membuat pengujian yang melibatkan _plugin_ menjadi rumit. Nyatanya, `vue-test-utils` harus mengimplementasikan sebuah API khusus bernama `createLocalVue` untuk mengatasi masalah tersebut:

  ```js
  import { createLocalVue, mount } from '@vue/test-utils'

// buat sebuah konstruktor `Vue` khusus
const vueLokal = createLocalVue()

// tambahkan sebuah _plugin_ secara global pada konstruktor Vue lokal
vueLokal.use(PluginKu)

// teruskan `localVue` pada opsi _mount_
mount(Component, { vueLokal })
```

- Konfigurasi global mempersulit untuk mendistribusikan objek Vue yang sama pada lebih dari satu aplikasi pada halaman yang sama, namun memiliki konfigurasi global yang berbeda.

  ```js
  // Kode dibawah ini akan berpengaruh pada kedua objek di bawah
  Vue.mixin({
    /* ... */
  })

  const app1 = new Vue({ el: '#app-1' })
  const app2 = new Vue({ el: '#app-2' })
  ```

Untuk mengatasi masalah tersebut, pada Vue 3 kami memperkenalkan

## Sebuah API Global Baru: `createApp`

_Method_ `createApp` akan mengembalikan sebuah objek aplikasi, sebuah konsep baru pada Vue versi 3.

```js
import { createApp } from 'vue'

const app = createApp({})
```

Jika Anda menggunakan versi [CDN](/guide/installation.html#cdn) Vue, fungsi `createApp` dapat diakses melalui objek global `Vue`:

```js
const { createApp } = Vue

const app = createApp({})
```

Sebuah objek aplikasi merupakan bagian dari API global pada versi sebelumnya. Secara praktis, hal tersebut berarti bahwa setiap API yang mengubah perilaku Vue secara global telah dipindahkan pada objek aplikasi. Berikut merupakan tabel perbandingan antara API global saat ini dan API pada objek aplikasi:

| API Global Vue versi 2.x             | API objek Vue versi 3.x (`app`)                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| Vue.config                 | app.config                                                                                      |
| Vue.config.productionTip   | dihapus ([lihat penjelasan](#config-productiontip-removed))                                            |
| Vue.config.ignoredElements | app.config.isCustomElement ([lihat penjelasan](#config-ignoredelements-is-now-config-iscustomelement)) |
| Vue.component              | app.component                                                                                          |
| Vue.directive              | app.directive                                                                                          |
| Vue.mixin                  | app.mixin                                                                                              |
| Vue.use                    | app.use ([lihat penjelasan](#a-note-for-plugin-authors))                                               |
| Vue.prototype              | app.config.globalProperties ([lihat penjelasan](#vue-prototype-replaced-by-config-globalproperties))   |

API global lainnya yang tidak mengubah perilaku Vue secara global telah dipindahkan menjadi _named export_, seperti yang tertera pada [Treeshaking API Global](./global-api-treeshaking.html).

### `config.productionTip` Dihapus

Pada Vue versi 3.x, saran "gunakan produksi build" hanya akan muncul apabila Anda menggunakan kode produksi selama pengembangan dan kode produksi penuh (kode program yang menyertakan kompilator waktu eksekusi dan memiliki peringatan)

Untuk kode Vue yang memanfaatkan modul ES, karena kode tersebut digunakan dengan _bundler_, dan karena kebanyakan sebuah CLI atau _boilerplate_ telah mengatur variabel produksi dengan benar, saran tersebut tidak akan muncul kembali.

### `config.ignoredElements` Sekarang Menjadi `config.isCustomElement`

Opsi ini diperkenalkan dengan tujuan untuk menyediakan dukungan pada elemen kustom bawaan, sehingga perubahan nama yang dilakukan lebih mencerminkan kegunaan dari opsi ini. Opsi yang baru juga mampu menerima sebuah fungsi sehingga lebih fleksibel dibandingkan cara lama yang hanya menerima string atau RegExp:

```js
// sebelum
Vue.config.ignoredElements = ['my-el', /^ion-/]

// sesudah
const app = createApp({})
app.config.isCustomElement = tag => tag.startsWith('ion-')
```

::: tip Penting

Pada Vue versi 3.0, pemeriksaan pada elemen untuk memeriksa apakah elemen tersebut merupakan sebuah komponen atau bukan telah dipindahkan pada fase kompilasi _template_, sehingga opsi ini hanya berpengaruh apabila Anda menggunakan kompilator pada waktu eksekusi. Apabila Anda menggunakan kode program yang telah dibangun sepenuhnya, opsi `isCustomElement` harus diteruskan pada `@vue/compiler-dom` pada penyetelan pembangunan kode program - sebagai contoh, melalui [opsi `compilerOptions` pada vue-loader](https://vue-loader.vuejs.org/options.html#compileroptions).

- Apabila `config.isCustomElement` ditetapkan saat Anda menggunakan kode program yang telah dibangun sepenuhnya, sebuah peringatan akan muncul dan meminta pengguna untuk meneruskan opsi tersebut pada penyetelan pembangunan kode program.
- Opsi ini akan menjadi opsi utama baru pada konfigurasi Vue CLI.
  :::

### `Vue.prototype` Diganti Dengan `config.globalProperties`

Pada Vue versi 2, `Vue.prototype` biasanya digunakan untuk menambahkan properti baru yang dapat digunakan pada seluruh komponen yang ada pada aplikasi.

Opsi yang sama dengan opsi tersebut pada Vue 3 adalah [`config.globalProperties`](/api/application-config.html#globalproperties). Properti-properti yang didaftarkan menggunakan opsi ini akan disalin sebagai bagian dari instansiasi komponen pada aplikasi:

```js
// sebelum - Vue versi 2
Vue.prototype.$http = () => {}
```

```js
// sesudah - Vue versi 3
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

Opsi `provide` (lihat [penjelasan berikut](#provide-inject)) juga dapat menjadi alternatif dari `globalProperties`.

### Catatan untuk Pengembang Plugin

Biasanya, pengembang _plugin_ memilih untuk melakukan instalasi _plugin_ secara otomatis pada kode UMD menggunakan `Vue.use`. Sebagai contoh, berikut merupakan cara _plugin_ resmi `vue-router` melakukan instalasi pada lingkungan perambah:

```js
var inBrowser = typeof window !== 'undefined'
/* … */
if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}
```

Karena API global `use` sudah tidak tersedia pada Vue versi 3, cara ini tidak dapat digunakan lagi dan memanggil `Vue.use` akan menghasilkan sebuah peringatan. Sebaliknya, pengguna akhir sekarang harus menyatakan penggunaan _plugin_ secara eksplisit pada objek aplikasi:

```js
const app = createApp(MyApp)
app.use(VueRouter)
```

## Memasang Objek Aplikasi

Setelah diinisialisasi menggunakan `createApp(/* opsi */)`, objek aplikasi `app` dapat digunakan untuk memasang objek utama Vue menggunakan `app.mount(domTarget)`:

```js
import { createApp } from 'vue'
import AplikasiKu from './AplikasiKu.vue'

const app = createApp(AplikasiKu)
app.mount('#app')
```

Dengan seluruh perubahan yang terjadi, komponen dan _directive_ yang sudah ditulis pada awal panduan ini dapat ditulis ulang menjadi seperti berikut:

```js
const app = createApp(MyApp)

app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Ditekan sebanyak {{ count }} kali.</button>'
})

app.directive('focus', {
  mounted: el => el.focus()
})

// sekarang setiap objek aplikasi dipasang menggunakan app.mount(), bersama
// dengan seluruh komponen, akan memiliki komponen `button-counter` yang sama
// dan directive `focus` tanpa mempengaruhi objek Vue global
app.mount('#app')
```

## Provide / Inject

Mirip dengan penggunaan opsi `provide` pada objek utama Vue versi 2.x, sebuah objek aplikasi yang dibangun menggunakan Vue versi 3 juga dapat menyediakan _dependency_ yang dapat diteruskan oleh segala komponen yang ada pada aplikasi:

```js
// pada berkas utama
app.provide('panduan', 'Panduan Vue 3')

// pada komponen turunan
export default {
  inject: {
    buku: {
      from: 'panduan'
    }
  },
  template: `<div>{{ buku }}</div>`
}
```

Menggunakan `provide` akan sangat berguna ketika sedang membangun sebuah _plugin_, sebagai alternatif dari `globalProperties`.

## Mendistribusikan Konfigurasi Antar Aplikasi

Salah satu cara untuk mendistribusikan konfigurasi — seperti komponen dan _directive — antar aplikasi adalah dengan membuat fungsi _factory_ seperti berikut:

```js
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const buatAplikasi = opsi => {
  const app = createApp(options)
  app.directive('focus', /* ... */)

  return app
}

buatAplikasi(Foo).mount('#foo')
buatAplikasi(Bar).mount('#bar')
```

Sekarang, _directive_ `focus` akan tersedia pada objek Foo dan Bar beserta seluruh turunannya.
