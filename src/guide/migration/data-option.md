---
title: Opsi Data
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

- **MERUSAK**: deklarasi opsi `data` pada komponen tidak lagi menerima objek JavaScript murni dan mengharapkan sebuah deklarasi fungsi.

- **MERUSAK**: ketika menggabungkan nilai kembalian `data` dari _mixins_ atau _extends_, penggabungan sekarang akan dilakukan secara dangkal, bukan dalam (hanya properti inti yang akan digabungkan).

## Sintaks Vue versi 2.x

Pada Vue versi 2.x, pengembang dapat mendefinisikan opsi `data` dengan sebuah objek atau sebuah fungsi.

Sebagai contoh:

```html
<!-- Deklarasi Objek -->
<script>
  const app = new Vue({
    data: {
      apiKey: 'a1b2c3'
    }
  })
</script>

<!-- Deklarasi Fungsi -->
<script>
  const app = new Vue({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  })
</script>
```

Walaupun hal tersebut memberi kemudahan dalam hal komponen inti yang mempunyai _state_ bersama, namun kemampuan tersebut membingungkan karena hanya dapat digunakan pada komponen inti.

## Pembaruan pada Vue versi 3.x

Pada Vue versi 3.x, opsi `data` telah distandarisasikan supaya hanya menerima sebuah fungsi yang mengembalikan sebuah objek.

Berdasarkan contoh di atas, hanya akan ada satu implementasi yang mungkin untuk kode tersebut:

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  }).mount('#app')
</script>
```

## Perubahan Perilaku Penggabungan Mixin

Sebagai tambahan, ketika `data()` dari sebuah komponen dan basis _mixins_ atau _extends_ digabungkan, penggabungan akan dilakukan secara *dangkal*:

```js
const Mixin = {
  data() {
    return {
      pengguna: {
        nama: 'Jack',
        id: 1
      }
    }
  }
}

const KomponenA = {
  mixins: [Mixin],
  data() {
    return {
      pengguna: {
        id: 2
      }
    }
  }
}
```

Pada Vue versi 2.x, `$data` yang dihasilkan adalah:

```json
{
  pengguna: {
    id: 2,
    nama: 'Jack'
  }
}
```

Pada Vue versi 3.0, hasilnya adalah:

```json
{
  pengguna: {
    id: 2
  }
}
```

[Migration build flag: `OPTIONS_DATA_FN`](migration-build.html#compat-configuration)

## Migration Strategy

Untuk pengguna yang bergantung pada deklarasi objek, kami menyarankan:

- Mengekstrak data bersama pada sebuah objek eksternal dan menggunakan objek tersebut sebagai sebuah properti pada `data`
- Menulis ulang acuan pada data bersama untuk menunjuk pada objek bersama baru

Untuk pengguna yang bergantung pada perilaku penggabungan _mixin_ yang dalam, kami menyarankan Anda untuk menstruktur ulang kode program Anda untuk menghindari ketergantungan tersebut, karena penggabungan _mixin_ yang dalam merupakan sesuatu yang sangat implisit dan mampu menyebabkan logika dalam kode program menjadi lebih sulit untuk dipahami dan di*debug*.

For users relying on the deep merge behavior from mixins, we recommend refactoring your code to avoid such reliance altogether, since deep merges from mixins are very implicit and can make the code logic more difficult to understand and debug.

[Migration build flags:](migration-build.html#compat-configuration)

- `OPTIONS_DATA_FN`
- `OPTIONS_DATA_MERGE`
