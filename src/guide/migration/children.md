---
badges:
  - removed
---

# $children <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

Properti `$children` telah dihapus dari Vue versi 3.0 dan tidak didukung lagi.

## Sintaks Vue versi 2.x

Pada Vue versi 2.x, pengembang dapat mengakses komponen turunan langsung dari sebuah objek menggunakan `this.$children`:

```vue
<template>
  <div>
    <img alt="Logo Vue" src="./assets/logo.png">
    <tombol-ku>Ubah logo</tombol-ku>
  </div>
</template>

<script>
import TombolKu from './MyButton'

export default {
  components: {
    TombolKu
  },
  mounted() {
    console.log(this.$children) // [VueComponent]
  }
}
</script>
```

## Perubahan pada Vue versi 3.x

Pada Vue versi 3.x, properti `$children` telah dihapus dan tidak didukung lagi. Sebagai gantinya, jika Anda butuh akses pada sebuah komponen turunan, kami menyarankan Anda untuk menggunakan [$refs](/guide/component-template-refs.html#template-refs).

## Migration Strategy

[_Migration build flag_: `INSTANCE_CHILDREN`](migration-build.html#compat-configuration)
