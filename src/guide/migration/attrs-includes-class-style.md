---
title: $attrs memuat class dan style
badges:
  - breaking
---

# `$attrs` memuat `class` dan `style` <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

`$attrs` sekarang memuat seluruh atribut yang diteruskan pada sebuah komponen, termasuk `class` dan `style`.

## Perilaku pada Vue versi 2.x

Atribut `class` dan `style` ditangani secara khusus pada implementasi DOM virtual milik Vue versi 2. Oleh karena itu, kedua atribut tersebut tidak dimuat dalam `$attrs`, sementara atribut lainnya dimuat.

Sebuah efek samping dari penanganan tersebut muncul ketika menggunakan `inheritAttrs: false`:

- Atribut dalam `$attrs` tidak lagi dimuat pada elemen utama secara otomatis, keputusan dikembalikan pada pengembang untuk menentukan tempat atribut dimuat.
- Namun `class` dan `style`, yang bukan merupakan bagian dari `$attrs`, akan tetap dimuat dalam elemen utama dari komponen:

```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

Ketika digunakan seperti berikut:

```html
<my-component id="id-ku" class="kelas-ku"></my-component>
```

...maka Vue akan menghasilkan HTML berikut:

```html
<label class="kelas-ku">
  <input type="text" id="id-ku" />
</label>
```

## Perilaku pada Vue versi 3.x

`$attrs` memuat seluruh atribut, dimana hal tersebut mempermudah cara penanganan atribut pada elemen-elemen yang berbeda. Pada Vue versi 3.x, contoh di atas akan menghasilkan HTML berikut:

```html
<label>
  <input type="text" id="id-ku" class="kelas-ku" />
</label>
```

## Strategi Migrasi

Pada komponen-komponen yang menggunakan `inheritAttrs: false`, pastikan bahwa _styling_ tetap berjalan sesuai keinginan Anda. Jika Anda sebelumnya bergantung pada penanganan khusus pada `class` dan `style`, beberapa tampilan mungkin saja akan rusak karena atribut-atribut tersebut mungkin saja sekarang diterapkan pada elemen lain.

[_Migration build flag_: `INSTANCE_ATTRS_CLASS_STYLE`](migration-build.html#compat-configuration)

## See also

- [RFC Relevan](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)
- [Strategi Migrasi - `$listeners` dihapus](./listeners-removed.md)
- [Strategi Migrasi - Opsi Emit Baru](./emits-option.md)
- [Strategi Migrasi - Pengubah `.native` dihapus](./v-on-native-modifier-removed.md)
- [Strategi Migrasi - Perubahan dalam API _render functions_](./render-function-api.md)
