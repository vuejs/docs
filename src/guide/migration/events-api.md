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

## Strategi Migrase

Anda dapat mengganti _event hub_ yang sudah ada menggunakan sebuah pustaka eksternal yang mengimplementasikan antarmuka _event emitter_, seperti [mitt](https://github.com/developit/mitt) atau [tiny-emitter](https://github.com/scottcorgan/tiny-emitter).

Cara-cara di atas juga dapat dilakukan pada _compatibility builds_.
