---
title: v-for Pada Array Refs
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

Pada Vue versi 2, penggunaan atribut `ref` di dalam `v-for` akan mengisi properti `$refs` dengan sebuah `ref` _array_. Perilaku tersebut menjadi ambigu dan tidak efisien ketika dilakukan pada `v-for` bersarang.

Pada Vue versi 3, penggunaan tersebut tidak akan secara otomatis membuat sebuah _array_ pada `$refs`. Untuk mendapatkan banyak `ref` sekaligus dalam satu _binding_, _bind_ `ref` pada sebuah fungsi dimana hal tersebut memberikan lebih banyak fleskibilitas (hal ini merupakan sebuah fitur baru):

```html
<div v-for="barang in daftar" :ref="tetapkanRefBarang"></div>
```

Penggunaan dengan Options API:

```js
export default {
  data() {
    return {
      refBarang: []
    }
  },
  methods: {
    tetapkanRefBarang(el) {
      if (el) {
        this.refBarang.push(el)
      }
    }
  },
  beforeUpdate() {
    this.refBarang = []
  },
  updated() {
    console.log(this.refBarang)
  }
}
```

Penggunaan dengan Composition API:

```js
import { onBeforeUpdate, onUpdated } from 'vue'

export default {
  setup() {
    let refBarang = []
    const tetapkanRefBarang = el => {
      if (el) {
        refBarang.push(el)
      }
    }
    onBeforeUpdate(() => {
      refBarang = []
    })
    onUpdated(() => {
      console.log(refBarang)
    })
    return {
      tetapkanRefBarang
    }
  }
}
```

Ingat bahwa:

- `refBarang` tidak harus merupakan sebuah _array_: boleh berupa sebuah objek dimana `ref` ditetapkan menggunakan kunci iterasi masing-masing.
- Cara ini juga memungkinkan `refBarang` untuk dijadikan reaktif dan dapat diawasi, jika dibutuhkan.
- This also allows `itemRefs` to be made reactive and watched, if needed.

## Migration Strategy

[_Migration build flags_:](migration-build.html#compat-configuration)

- `V_FOR_REF`
- `COMPILER_V_FOR_REF`
