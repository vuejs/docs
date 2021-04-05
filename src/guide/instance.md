# _Instance_ Komponen & Aplikasi

## Membuat _Instance_ Aplikasi

Setiap aplikasi Vue dimulai dengan membuat **_instance_ aplikasi** dengan memanggil fungsi `createApp`:

```js
const app = Vue.createApp({
  /* pilihan konfigurasi aplikasi */
})
```

_Instance_ aplikasi digunakan untuk mendaftarkan sesuatu secara 'global' sehingga kemudian dapat digunakan oleh komponen di dalam aplikasi tersebut. Kita akan membahasnya secara mendalam nanti tetapi sebagai contoh:

```js
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```

Sebagian fungsi/method yang dihasilkan oleh _instance_ aplikasi mengembalikan _instance_ yang sama, sehingga memungkinkan kita untuk melakukan _chaining_:

```js
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
```

Anda dapat menelusuri API aplikasi secara menyeluruh pada [referensi API](../api/application-api.html).

## Komponen _Root_

Pilihan yang dilewatkan ke `createApp` sebagai parameter digunakan untuk mengatur **komponen _root_**. Komponen tersebut digunakan sebagai titik awal untuk _rendering_ ketika Vue me-**_mount_** aplikasi.

Sebuah aplikasi perlu dipasang (_mounted_) ke sebuah elemen DOM. Sebagai contoh, jika kita ingin memasang aplikasi Vue ke `<div id="app"></div`, kita harus melewatkan `#app` sebagai parameter pada fungsi `mount`:

```js
const RootComponent = {
  /* pilihan konfigurasi komponen _root_ */
}
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```

Tidak seperti fungsi/metode lain pada _instance_ aplikasi, fungsi `mount` tidak mengembalikan _instance_ aplikasi. Fungsi tersebut mengembalikan _instance_ komponen _root_ sebagai gantinya.

Meskipun tidak terkait secara ketat dengan [pola MVVM](https://en.wikipedia.org/wiki/Model_View_ViewModel), desain Vue sebagian terinspirasi oleh konsep tersebut. Sebagai ketentuan, kita sering menggunakan variabel `vm` (kependekan dari ViewModel) untuk mengacu pada _instance_ komponen.

Walaupun semua contoh pada halaman ini hanya membutuhkan satu komponen saja, sebagian besar aplikasi besar di luar sana diatur menjadi sebuah struktur komponen yang bersarang dan dapat digunakan kembali. Sebagai contoh, struktur komponen aplikasi Todo mungkin akan terlihat seperti berikut:

```
Root Component
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

Setiap komponen memiliki _instance_ komponennya sendiri, `vm`. Pada beberapa komponen, seperti `TodoItem`, kemungkinan ia akan memiliki banyak _instance_ komponen yang di-_render_ secara bersama. Semua _instance_ komponen pada aplikasi ini akan berbagi _instance_ aplikasi yang sama.

Kita akan membicarakan mengenai [sistem komponen](component-basics.html) secara mendalam nantinya. Untuk sekarang, ketahuilah bahwa komponen _root_ tidak jauh berbeda dengan komponen lainnya. Pilihan konfigurasinya sama, sebagaimana perilaku _instance_ komponen pada umumnya.

## Properti _Instance_ Komponen

Pada panduan sebelumnya, kita telah memahami properti `data`. Properti yang didefinisikan pada `data` tersedia melalui _instance_ komponen:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4
```

Ada banyak pilihan konfigurasi komponen lainnya yang dapat ditambahkan sendiri oleh pengembang. Konfigurasi tersebut nantinya juga dapat diakses melalui _instance_ komponen. Konfigurasi komponen tersebut seperti `methods`, `props`, `computed`, `inject` dan `setup`. Kita akan membahas masing-masing secara mendalam nanti. Semua properti pada _instance_ komponen, bagaimanapun cara mereka didefinisikan, akan dapat diakses melalui templat komponen.

Vue juga menyediakan properti bawaan melalui _instance_ komponen, seperti `$attrs` dan `$emit`. Semua properti ini memiliki awalan `$` untuk membedakan nama properti yang didefinisikan sendiri oleh pengembang.

## _Lifecycle Hook_

Setiap komponen melalui beberapa langkah inisialisasi ketika ia dibuat - sebagai contoh, komponen tersebut perlu memasang observasi data, mengompilasi templat, memasang _instance_ ke DOM, dan memutakhirkan DOM ketika terjadi perubahan data. Selama proses tersebut berlangsung, komponen tersebut juga menjalankan fungsi yang bernama **_lifecycle hooks_**, memberikan kesempatan pada pengembang untuk menambahkan kode mereka sendiri pada tahap tertentu.

Sebagai contoh _hook_ [created](../api/options-lifecycle-hooks.html#created) dapat digunakan untuk menjalankan kode setelah _instance_ dibuat:

```js
Vue.createApp({
  data() {
    return { count: 1 }
  },
  created() {
    // `this` mengarah ke _instance_ vm
    console.log('count bernilai: ' + this.count) // => "count bernilai: 1"
  }
})
```

Ada juga _hook_ lain yang akan dipanggil pada tahap siklus hidup _instance_ tertentu, seperti [mounted](../api/options-lifecycle-hooks.html#mounted), [updated](../api/options-lifecycle-hooks.html#updated), dan [unmounted](../api/options-lifecycle-hooks.html#unmounted). Semua _lifecycle hooks_ dipanggil dengan konteks `this` yang mengarah ke _instance_ aktif sekarang yang menjalankannya.

::: tip
Jangan gunakan [arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) pada properti konfigurasi komponen atau _callback_, seperti `created: () => console.log(this.a)` atau ``vm.$watch('a', newValue => this.myMethod())`. Karena _arrow function_ tidak memiliki `this`, `this` akan dianggap sebagai variabel lain dan secara leksikal mencari ke jangkauan _parent_ sampai variabel tersebut ditemukan, hal tersebut sering menyebabkan galat (_error_) seperti `Uncaught TypeError: Cannot read property of undefined` atau `Uncaught TypeError: this.myMethod is not a function`.
:::

## Diagram _Lifecycle_

Berikut merupakan diagram untuk _lifecycle_ _instance_. Anda tidak perlu memahaminya secara menyeluruh sekarang, tetapi ketika Anda belajar dan membuat lebih banyak aplikasi, diagram berikut dapat menjadi referensi yang berguna.

<img src="/images/lifecycle.svg" width="840" height="auto" style="margin: 0px auto; display: block; max-width: 100%;" loading="lazy" alt="Instance lifecycle hooks">
