---
badges:
  - breaking
---

# API Events <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

_Method_ `$on`, `$off` dan `$once` dihapus. Objek aplikasi tidak perlu lagi untuk mengimplementasikan antarmuka _event emitter_. 

## Sintaks Vue versi 2.x

Pada Vue versi 2.x, objek Vue dapat digunakan untuk memicu _event handler_ yang dipasang secara imperatif melalui API _event emitter_ (`$on`, `$off`, dan `$once`). Hal tersebut dapat digunakan untuk membuat _event hub_ yang dapat membuat _event handler_ global yang dapat digunakan diseluruh bagian pada aplikasi:

```js
// eventHub.js

const eventHub = new Vue()

export default eventHub
```

```js
// KomponenAnak.vue
import eventHub from './eventHub'

export default {
  mounted() {
    // menambahkan _handler_ eventHub
    eventHub.$on('event-kustom', () => {
      console.log('Event kustom terjadi!')
    })
  },
  beforeDestroy() {
    // menghapus _handler_ kejadianKustom
    eventHub.$off('event-kustom')
  }
}
```

```js
// KomponenInduk.vue
import eventHub from './eventHub'

export default {
  methods: {
    callGlobalCustomEvent() {
      eventHub.$emit('event-kustom') // jika KomponenAnak telah masuk ke dalam DOM, Anda dapat mlihat sebuah pesan pada console.
    }
  }
}
```

## Pembaruan Vue versi 3.x

Kami menghapus _method_ `$on`, `$off` dan `$once` dari objek Vue sepenuhnya. `$emit` tidak dihapus dan tetap merupakan bagian dari API karena `$emit` digunakan untuk memicu _event handler_ yang dipasang secara deklaratif pada sebuah komponen induk.

## Strategi Migrasi

Di Vue 3, tidak memungkinkan lagi menggunakan API ini untuk me-_listen_ _event_ komponen yang dihasilkan oleh dirinya sendiri, tidak ada cara migrasi untuk kasus tersebut.

Tetapi pola eventHub dapat diganti dengan pustaka eksternal yang mengimplementasi antarmuka _event emitter_, sebagai contoh [mitt](https://github.com/developit/mitt) atau [tiny-emitter](https://github.com/scottcorgan/tiny-emitter).

Contoh:

```js
//eventHub.js
import emitter from 'tiny-emitter/instance'

export default {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
}
```

Cara tersebut menghasilkan API _event emitter_ yang sama seperti pada Vue 2.

Cara tersebut mungkin akan didukung juga pada _build_ kompatibel dari Vue 3.
