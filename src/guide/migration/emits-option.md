---
title: Opsi emits
badges:
  - new
---

# Opsi `emits` <MigrationBadges :badges="$frontmatter.badges" />

## Gambarang Umum

Vue versi 3 menawarkan opsi `emits`, yang mirip dengan opsi `props` yang sudah ada. Opsi ini dapat digunakan untuk mendefinisikan kejadian yang dapat diteruskan pada komponen induk.

## Perilaku Vue versi 2.x

Pada Vue versi 2, Anda dapat mendefinisikan properti-properti yang dapat diterima oleh sebuah komponen, namun Anda tidak dapat menentukan kejadian apa saja yang dapat diteruskan:

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text']
  }
</script>
```

## Perilaku Vue versi 3.x

Mirip dengan properti, kejadian yang dapat diteruskan oleh komponen dapat didefinisikan menggunakan opsi `emits`:

```vue
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted']
  }
</script>
```

Opsi tersebut juga menerima sebuah objek, yang memperbolehkan pengembang untuk menetapkan pemeriksa untuk argumen yang diberikan pada _event_ yang diteruskan, mirip dengan pemeriksa pada definisi `props`. 

Untuk informasi lebih lanjut mengenai hal ini, silahkan baca [dokumentasi API untuk fitur ini](../../api/options-data.md#emits).

## Strategi Migrasi

Sangat disarankan bagi Anda untuk mendokumentasikan seluruh _event_ yang diteruskan oleh setiap komponen yang Anda buat menggunakan `emits`.

Hal tersebut menjadi sangat penting karena [penghapusan pengubah .native](./v-on-native-modifier-removed.md). Setiap _listener_ untuk _event_ yang tidak dideklarasikan menggunakan `emits` akan diikutsertakan pada `$attrs` milik komponen, yang secara umum akan terikat pada _node_ inti dari komponen. 

### Contoh

Untuk komponen-komponen yang meneruskan ulang _event_ bawaan pada komponen induk, perubahan tersebut akan menyebabkan adanya dua _event_ yang terjadi sekaligus:

```vue
<template>
  <button v-on:click="$emit('click', $event)">OK</button>
</template>
<script>
export default {
  emits: [] // tanpa deklarasi event
}
</script>
```

Ketika sebuah komponen induk mendengar _event_ `click` pada komponen:

```html
<tombol-ku v-on:click="tanganiKlik"></tombol-ku>
```

_Event_ tersebut akan terjadi sebanyak dua kali:
- Sekali dari `$emit()`
- Sekali dari _event listener_ bawaan yang ada pada elemen inti.

Disini Anda memiliki dua pilihan:

1. Mendeklarasikan _event_ `click` dengan jelas. Pilihan ini akan membantu jika Anda menambahkan beberapa logika pada responden _event_ di `<tombol-ku>`.
2. Hapus penerusan ulang _event_, karena sekarang elemen induk dapat mendengarkan _event_ bawaan dengan mudah, tanpa menambahkan `.native`. Cocok digunakan bila Anda hanya akan meneruskan ulang _event_ tersebut.

## Lihat Juga

- [RFC yang relevan](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0030-emits-option.md)
- [Panduan migrasi - Pengubah `.native` dihapus](./v-on-native-modifier-removed.md)
- [Panduan migrasi - `$listeners` dihapus](./listeners-removed.md)
- [Panduan migrasi - `$attrs` memuat `class` dan `style`](./attrs-includes-class-style.md)
- [Panduan migrasi - Perubahan pada API fungsi _render_](./render-function-api.md)
