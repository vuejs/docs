---
badges:
  - breaking
---

# Komponen Fungsional <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

Berikut merupakan gambaran umum tentang perubahan yang terjadi:

- Peningkatan performa komponen fungsional yang terdapat pada Vue versi 2.x dapat diabaikan pada Vue versi 3.x, sehingga kami menyarankan Anda untuk menggunakan komponen _stateful_.
- Komponen fungsional hanya dapat dibuat menggunakan sebuah fungsi biasa yang menerima `props` dan `context` (yang di dalamnya terdapat `slots`, `attrs`, dan `emit`) sebagai parameter.
- **MERUSAK** Atribut `fungsional` pada _tag_ `<template>` milik _single-file component_ (SFC) dihapus.
- **MERUSAK** Opsi `{ functional: true }` pada komponen yang dibuat dengan fungsi dihapus.

Lanjutkan membaca untuk informasi lebih lanjut.

## Pengenalan

Pada Vue versi 2, komponen fungsional memiliki dua kasus penggunaan yaitu:

- sebagai sebuah bentuk optimisasi performa, karena komponen fungsional akan diinisialisasi lebih cepat dibandingkan dengan komponen _stateful_.
- agar dapat menghasilkan lebih dari satu _node_ utama.

Namun, pada Vue versi 3, performa dari komponen _stateful_ telah ditingkatkan sehingga perbedaan performa antara komponen _stateful_ dan komponen fungsional dapat diabaikan. Sebagai tambahan, saat ini komponen _stateful_ juga sudah dapat menghasilkan lebih dari satu _node_ utama.

Sehingga, satu-satunya kasus penggunaan dari komponen fungsional adalah komponen-komponen sederhana, seperti sebuah komponen yang menghasilkan _heading_ yang dinamis. Selain itu, kami menyarankan Anda untuk menggunakan komponen _stateful_ seperti biasanya.

## Sintaks Vue versi 2.x

Pada komponen `<dynamic-heading>`, yang berfungsi untuk menghasilkan _heading_ yang sesuai (entah `h1`, `h2`, `h3`, dan lain-lain), komponen tersebut dapat ditulis dalam sebuah _single-file component_ pada Vue versi 2.x sebagai:

```js
// Contoh komponen fungsional Vue versi 2
export default {
  functional: true,
  props: ['level'],
  render(h, { props, data, children }) {
    return h(`h${props.level}`, data, children)
  }
}
```

Atau, bagi Anda yang lebih suka menggunakan `<template>` dalam _single-file component_:

```vue
// Contoh komponen fungsional Vue versi 2 menggunakan <template>
<template functional>
  <component
    :is="`h${props.level}`"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

## Sintaks Vue versi 3.x

### Komponen yang Dibuat oleh Fungsi

Sekarang pada Vue versi 3, seluruh komponen fungsional dibuat menggunakan sebuah fungsi biasa. Dengan kata lain, Anda tidak perlu untuk mendefinisikan `{ functional: true }` pada pengaturan komponen.

Fungsi tersebut akan menerima dua argumen: `props` dan `context`. Argumen `context` adalah sebuah objek yang memuat properti `attrs`, `slots`, dan `emit` untuk komponen tersebut.

Sebagai tambahan, dibandingkan dengan menyediakan `h` dalam fungsi `render` secara implisit, sekarang `h` akan diimpor secara global.

Mengacu pada komponen `<dynamic-heading>` sebelumnya, berikut merupakan cara penulisan komponen tersebut sekarang:

```js
import { h } from 'vue'

const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default DynamicHeading
```

### Single File Components (SFCs)

Pada Vue versi 2.x, perbedaan performa antara komponen _stateful_ dan fungsional berkurang secara drastis dan tidak signifikan untuk sebagian besar kasus penggunaan. Sehingga, cara migrasi bagi pengembang yang menggunakan atribut `functional` pada SFC adalah dengan menghapus atribut tersebut dan menamai ulang segala acuan pada `props` menjadi `$props` dan `attrs` menjadi `$attrs`.

Mengacu pada contoh `<dynamic-heading>` sebelumnya, berikut merupakan cara penulisan komponen tersebut sekarang:

```vue{1,3,4}
<template>
  <component
    v-bind:is="`h${$props.level}`"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: ['level']
}
</script>
```

Perbedaan utama dari kedua cara penulisan tersebut adalah:

1. Atribut `functional` dihapus dari `<template>`
1. Sekarang, `listeners` diteruskan sebagai bagian dari `$attrs` dan dapat dihapus

## Langkah Selanjutnya

Anda dapat memperoleh informasi lebih lanjut mengenai penggunaan komponen fungsional yang baru dan perubahan pada fungsi _render_ melalui:

- [Migrasi: Fungsi Render](/guide/migration/render-function-api.html)
- [Panduan: Fungsi Render](/guide/render-function.html)
- [_Migration build flag_: `COMPONENT_FUNCTIONAL`](migration-build.html#compat-configuration)
