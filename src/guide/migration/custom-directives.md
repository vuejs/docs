---
badges:
  - breaking
---

# Custom Directives <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

Fungsi _hook_ pada _directives_ telah berganti nama agar lebih selaras dengan siklus hidup komponen. Berikut merupakan gambaran singkat mengenai apa yang telah berubah:

- API telah berganti nama agar lebih selaras dengan siklus hidup komponen

Lanjutkan membaca untuk penjelasan lebih lanjut.

## Sintaks Vue versi 2.x

Pada Vue versi 2, _custom directives_ dibuat menggunakan _hook-hook_ berikut untuk mengacu pada salah satu bagian dari siklus hidup komponen, dimana semuanya opsional:

- **bind** - Dipanggil saat _directive_ terikat dengan elemen. Hanya diapnggil sekali.
- **inserted** - Dipanggil sesudah elemen ditambahkan pada DOM induk.
- **update** - _Hook_ ini dipanggil ketika elemen diperbarui, namun turunannya belum diperbarui.
- **componentUpdated** - _Hook_ ini dipanggil sesudah komponen dan turunannya selesai diperbarui.
- **unbind** - _Hook_ ini dipanggil sesudah _directive_ dihapus. Hanya dipanggil sekali.

Berikut merupakan contoh dari _directives_:

```html
<p v-highlight="'yellow'">Sorot elemen ini supaya berlatar kuning cerah</p>
```

```js
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

Pada penyetelan awal untuk komponen di atas, _directive_ mengikat sebuah _style_ dengan meneruskan sebuah nilai yang dapat diperbarui menjadi nilai lain pada aplikasi.

## Sintaks Vue versi 3.x

Namun pada Vue versi 3, kami telah membuat API yang lebih kohesif untuk _custom directives_. Seperti yang dapat Anda lihat, API pada versi sebelumnya berbeda jauh dengan siklus hidup komponen Vue walaupun sama-sama dihubungkan pada kejadian yang sejenis. Sekarang kami telah menyatukan kedua hal tersebut menjadi:

- **created** - new! This is called before the element's attributes or event listeners are applied.
- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**: Baru! _Hook_ ini akan dipanggil sebelum elemen diperbarui, mirip dengan _hook_ pada siklus hidup komponen.
- update → Dihapus! Ada terlalu banyak persamaan dengan `updated`, sehingga _hook_ ini berlebihan. Mohon gunakan `updated`.
- componentUpdated → **updated**
- **beforeUnmount**: Baru! Mirip dengan _hook_ pada siklus hidup komponen, _hook_ ini akan dipanggil sebelum elemen dilepaskan dari DOM.
- unbind -> **unmounted**

API akhir akan menjadi seperti berikut:

```js
const DirectiveKu = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {}, // baru
  updated() {},
  beforeUnmount() {}, // baru
  unmounted() {}
}
```

API yang dihasilkan dapat digunakan seperti berikut, mengikuti contoh sebelumnya:

```html
<p v-highlight="'yellow'">Sorot elemen ini supaya berlatar kuning cerah</p>
```

```js
const app = Vue.createApp({})

app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

Sekarang _hook_ siklus hidup pada _custom directive_ telah mengikuti _hook_ siklus hidup pada komponen, sehingga _hook_ tersebut dapat lebih mudah diingat dan dibuat!

### Kasus Tepi: Mengakses Komponen

Umumnya, Anda dianjurkan untuk memisahkan _directive_ dengan komponen tempat _directive_ tersebut digunakan. Mengakses komponen melalui sebuah _custom directive_ menunjukkan sebuah tanda bahwa _directive_ tersebut seharusnya merupakan sebuah komponen. Namun, ada beberapa kasus dimana hal tersebut menjadi masuk akal.

Pada Vue versi 2, komponen harus diakses melalui argumen `vnode`:

```javascript
bind(el, binding, vnode) {
  const vm = vnode.context
}
```

Pada Vue versi 3, komponen tersebut merupakan bagian dari argumen `binding`:

```javascript
mounted(el, binding, vnode) {
  const vm = binding.instance
}
```

:::warning
Dengan dukungan [fragments](/guide/migration/fragments.html#overview), komponen dapat memiliki lebih dari satu _node_ utama. Ketika digunakan pada komponen yang memiliki lebih dari satu _node_ inti, sebuah _directive_ akan dihiraukan dan sebuah peringatan akan dicatat.
:::
