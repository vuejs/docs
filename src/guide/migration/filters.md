---
badges:
  - removed
---

# Filter <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

Fitur _filter_ dihapus dari Vue versi 3.0 dan tidak didukung lagi.

## Sintaks Vue versi 2.x

Pada Vue versi 2.x, pengembang dapat menggunakan _filter_ untuk menampilkan teks dalam bentuk tertentu.

Sebagai contoh:

```html
<template>
  <h1>Saldo Akun Bank</h1>
  <p>{{ saldoAkun | mataUangIDR }}</p>
</template>

<script>
  export default {
    props: {
      saldoAkun: {
        type: Number,
        required: true
      }
    },
    filters: {
      mataUangIDR(value) {
        return 'IDR ' + value
      }
    }
  }
</script>
```

Walaupun terlihat praktis, namun _filter_ membutuhkan sebuah sintaks khusus yang bertentangan dengan asumsi bahwa seluruh ekspresi yang terdapat dalam kurung kurawal merupakan JavaScript murni, dimana hal tersebut akan membutuhkan biaya belajar dan implementasi.

## Pembaruan Vue versi 3.x

Pada Vue versi 3.x, _filter_ dihapus dan tidak didukung lagi. Sebaliknya, kami menyarankan Anda untuk mengganti _filter_ dengan pemanggilan _method_ atau properti _computed_.

Berdasarkan contoh di atas, berikut merupakan sebuah contoh bagaimana cara tersebut dapat diimplementasikan.

```html
<template>
  <h1>Saldo Akun Bank</h1>
  <p>{{ saldoDalamIDR }}</p>
</template>

<script>
  export default {
    props: {
      saldoAkun: {
        type: Number,
        required: true
      }
    },
    computed: {
      saldoDalamIDR() {
        return 'IDR ' + this.saldoAkun
      }
    }
  }
</script>
```

## Strategi Migrasi

Dibandingkan menggunakan _filter_, kami menyarankan Anda untuk mengganti _filter_ dengan properti _computed_ atau _method_.

[Migration build flags:](migration-build.html#compat-configuration)

- `FILTERS`
- `COMPILER_FILTERS`

### Global Filters

Apabila Anda menggunakan _filter_ yang didaftarkan secara global dan menggunakan _filter_ tersebut pada aplikasi Anda, tentunya mengganti _filter_ tersebut dengan properti _computed_ atau _method_ pada setiap komponen merupakan hal yang tidak praktis.

Sebaliknya, Anda dapat membuat _filter_ global Anda dapat diakses oleh seluruh komponen menggunakan[globalProperties](../../api/application-config.html#globalproperties):

```js
// main.js
const app = createApp(App)

app.config.globalProperties.$filters = {
  mataUangIDR(value) {
    return 'IDR ' + value
  }
}
```

Kemudian Anda dapat mengganti setiap _template_ menggunakan objek `$filters` tersebut seperti berikut:

```html
<template>
  <h1>Saldo Akun Bank</h1>
  <p>{{ $filters.mataUangIDR(saldoAkun) }}</p>
</template>
```

Perlu diingat bahwa dengan menggunakan pendekatan ini, Anda tidak dapat menggunakan properti _computed_.
Anda hanya dapat menggunakan _method_, karena penggunaan _method_ merupakan hal yang masuk akal bila dilihat dalam konteks komponen secara individu.
