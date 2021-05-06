---
badges:
  - breaking
---

# Treeshaking API Global <MigrationBadges :badges="$frontmatter.badges" />

## Sintaks Vue versi 2.x

Apabila Anda pernah melakukan manipulasi DOM secara manual pada Vue, mungkin Anda pernah menggunakan pola berikut:

```js
import Vue from 'vue'

Vue.nextTick(() => {
  // sesuatu yang berhubungan dengan DOM
})
```

Atau, apabila Anda pernah melakukan _unit testing_ pada sebuah aplikasi yang melibatakan [komponen asinkron](/guide/component-dynamic-async.html), kemungkinan Anda pernah menulis kode program seperti berikut:

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'

test('sebuah fitur asinkron', async () => {
  const wrapper = shallowMount(MyComponent)

  // lakukan beberapa hal yang berkaitan dengan DOM

  await wrapper.vm.$nextTick()

  // jalankan tuntutan Anda
})
```

`Vue.nextTick()` merupakan sebuah API global yang diekspos secara langsung pada sebuah objek Vue – nyatanya, _method_ `$nextTick` merupakan sebuah _wrapper_ untuk fungsi `Vue.nextTick()` dengan konteks `this` pada _callback_ yang diikat secara otomatis pada objek tempat fungsi tersebut dipanggil untuk mempermudah proses pengembangan.

Tapi bagaimana bila Anda tidak pernah berurusan dengan manipulasi DOM secara manual, atau Anda tidak menggunakan atau menguji komponen asinkron pada aplikasi Anda? Atau bagaimana bila, dengan alasan tertentu, Anda lebih suka menggunakan `window.setTimeout()`? Dalam kasus tersebut, kode `nextTick()` akan menjadi kode mati – yang merupakan kode yang sudah ditulis namun tidak pernah dipakai. Ingat bahwa kode mati bukanlah sesuaty yang baik, khususnya dalam konteks sisi klien dimana setiap _kilobyte_ penting. 

_Module bundler_ seperti [webpack](https://webpack.js.org/) mendukung fitur [_tree-shaking_](https://webpack.js.org/guides/tree-shaking/), yang merupakan sebuah istilah untuk pemangkasan kode mati. Sayangnya, karena cara kode Vue ditulis pada versi sebelumnya, API global seperti `Vue.nextTick()` tidak dapat dipangkas dan tetap diikutsertakan pada kode akhir terlepas API tersebut digunakan atau tidak.

## Sintaks Vue versi 3.x

Pada Vue versi 3, API global dan internal telah ditrusktur ulang supaya mendukung fitur _tree-shaking_. Sehingga, API global sekarang dapat diakses melalui _named export_ untuk pembangunan modul ES. Sebagai contoh, kode program di atas dapat ditulis ulang menjadi seperti berikut:

```js
import { nextTick } from 'vue'

nextTick(() => {
  // sesuatu yang berkaitan dengan DOM
})
```

dan

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'
import { nextTick } from 'vue'

test('sebuah fitur asinkron', async () => {
  const wrapper = shallowMount(MyComponent)

  // lakukan beberapa hal yang berkaitan dengan DOM

  await wrapper.vm.$nextTick()

  // jalankan tuntutan Anda
})
```

Memanggil `Vue.nextTick()` secara langsung sekarang akan menghasilkan galat `undefined is not a function`.

Dengan perubahan tersebut, dengan catatan bahwa _bundler_ modul mendukung fitur _tree-shaking_, API global yang tidak digunakan pada aplikasi Vue akan dipangkas dari kode akhir, menghasilkan ukuran berkas yang optimal.

## API yang Terdampak

Berikut merupakan API global pada Vue versi 2.x yang terdampak oleh perubahan tersebut:

- `Vue.nextTick`
- `Vue.observable` (diganti dengan `Vue.reactive`)
- `Vue.version`
- `Vue.compile` (hanya pada distribusi Vue yang lengkap)
- `Vue.set` (hanya pada distribusi Vue yang ringkas)
- `Vue.delete` (hanya pada distribusi Vue yang ringkas)

## Bantuan INternal

Selain API publik, banyak komponen atau fungsi bantuan internal yang sekarang diekspor sebagai _named export_. Hal tersebut memungkinkan kompilator untuk menghasilkan kode program yang hanya mengimpor fitur yang dibutuhkan. Sebagai contoh, pada _template_ berikut: 

```html
<transition>
  <div v-show="ok">halo</div>
</transition>
```

akan dikompilasi menjadi kode berikut:

```js
import { h, Transition, withDirectives, vShow } from 'vue'

export function render() {
  return h(Transition, [withDirectives(h('div', 'halo'), [[vShow, this.ok]])])
}
```

Hal tersebut menandakan bahwa komponen `Transition` hanya akan diimpor apabila aplikasi yang Anda buat menggunakan komponen tersebut. Dengan kata lain, apabila aplikasi yang Anda buat tidak menggunakan komponen `Transition`, kode yang mendukung fitur tersebut tidak akan ada pada kode akhir.

Dengan _tree-shaking_ global, pengguna hanya akan "membayar" untuk fitur yang benar-benar mereka gunakan. Selain itu, karena fitur yang tidak wajib tidak akan menambah ukuran kode program pada aplikasi yang tidak menggunakan fitur tersebut, ukuran _framework_ tidak lagi menjadi masalah apabila terdapat penambahan fitur utama baru pada versi-versi selanjutnya. 

::: warning Penting
Keuntungan di atas hanya berlaku bagi kode program yang memanfaatkan [modul ES](/guide/installation.html#explanation-of-different-builds) yang dibangun menggunakan _bundler_ yang mendukung fitur _tree-shaking_ - kode program yang dibangun menggunakan modul UMD tetap memasukkan seluruh fitur dan mengekspos seluruh variabel global dari Vue (dan kompilator tetap akan menghasilkan kode program yang sebisa mungkin menggunakan API global dibandingkan mengimpor API).
:::

## Penggunaan pada Plugin

Apabila _plugin_ Anda bergantung pada API global yang terdampak pada Vue versi 2.x, seperti:

```js
const plugin = {
  install: Vue => {
    Vue.nextTick(() => {
      // ...
    })
  }
}
```

Pada Vue versi 3, Anda harus mengimpor fitur tersebut secara eksplisit:

```js
import { nextTick } from 'vue'

const plugin = {
  install: app => {
    nextTick(() => {
      // ...
    })
  }
}
```

Apabila Anda menggunakan _bundler_ modul seperti webpack, _bundler_ tersebut dapat menyebabkan kode sumber Vue diikutsertakan pada _plugin_ tersebut, dimana seringkali Anda tidak mengharapkan perilaku tersebut. Cara yang umum digunakan untuk mencegah perilaku tersebut adalah dengan mengatur _bundler_ untuk tidak mengikutsertakan Vue pada kode akhir. Pada webpack, Anda dapat menggunakna opsi [`externals`](https://webpack.js.org/configuration/externals/):

```js
// webpack.config.js
module.exports = {
  /*...*/
  externals: {
    vue: 'Vue'
  }
}
```

Konfigurasi tersebut akan menyebabkan webpack mengenali modul Vue sebagai pustaka eksternal dan tidak mengikutsertakannya.

Apabila Anda menggunakan [Rollup](https://rollupjs.org/) sebagai _bundler_ modul Anda, Anda dapat mendapatkan fitur yang sama seperti webpack, karena secara bawaan Rollup akan menganggap ID dari modul absolut (`'vue'` dalam kasus ini) sebagai _dependency_ eksternal dan tidak mengikutsertakannya pada kode akhir. Dalam proses pembentukan kode program, Rollup mungkin akan mengeluarkan peringatan [“Treating vue as external dependency”](https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency), yang dapat diabaikan menggunakan opsi `external`:

```js
// rollup.config.js
export default {
  /*...*/
  external: ['vue']
}
```
