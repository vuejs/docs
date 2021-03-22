---
badges:
  - breaking
---

# Interoperabilitas Elemen Kustom <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

- **MERUSAK:** _Whitelisting_ pada elemen kustom sekarang dijalankan pada saat kompilasi _template_, dan harus disetel melalui pengaturan kompilator, bukan melalui pengaturan waktu eksekusi.
- **MERUSAK** Penggunaan properti khusus `is` dibatasi untuk _tag_ `<component>` saja. 
- **BARU** Terdapat _directive_ baru `v-is` untuk mendukung kasus penggunaan pada Vue versi 2.x dimana `is` digunakan pada elemen bawaan untuk mengatasi masalah batasan penguraian pada elemen bawaan HTML.

## Elemen Kustom Otonom

Apabila Anda ingin menambahkan sebuah elemen kustom yang didefiniskan di luar Vue (contoh: menggunakan API Web Components), Anda harus mengatur Vue supaya menganggap komponen tersebut sebagai sebuah elemen kustom. _Template_ berikut akan digunakan sebagai contoh untuk penjelasan selanjutnya.

```html
<tombol-plastik></tombol-plastik>
```

### Sintaks Vue versi 2.x

Pada Vue versi 2.x, _whitelisting tag_ sebagai elemen kustom dilakukan melalui `Vue.config.ignoredElemets`:

```js
// Kode di bawah akan membuat Vue menghiraukan elemen kustom yang
// didefiniskan diluar Vue (contoh: menggunakan API Web Components)

Vue.config.ignoredElements = ['tombol-plastik']
```

### Sintaks Vue versi 3.x

**Pada Vue versi 3.0, pemeriksaan elemen kustom akan dilakukan pada saat kompilasi _template_.** Untuk mengatur supaya kompilator menganggap `<tombol-plastik>` sebagai elemen kustom:

- Apabila terdapat sebuah proses pembangunan kode program: teruskan opsi `isCustomElement` pada kompilator _template_ Vue. Apabila Anda menggunakan `vue-loader`, opsi tersebut harus diteruskan melalui opsi `compilerOptions` pada `vue-loader`:

  ```js
  // pada konfigurasi Webpack
  rules: [
    {
      test: /\.vue$/,
      use: 'vue-loader',
      options: {
        compilerOptions: {
          isCustomElement: tag => tag === 'tombol-plastik'
        }
      }
    }
    // ...
  ]
  ```

- Apabila Anda menggunakan kompilasi _template_ secara _on-the-fly_, teruskan opsi melalui `app.config.isCustomElement`:

  ```js
  const app = Vue.createApp({})
  app.config.isCustomElement = tag => tag === 'tombol-plastik'
  ```

  Perlu diingat bahwa konfigurasi waktu eksekusi hanya mempengaruhi kompilasi _template_ pada waktu eksekusi - konfigurasi tersebut tidak akan mempengaruhi _template_ yang sudah dikompilasi sebelumnya.

## Elemen Bawaan yang Dikustomisasi

Spesifikasi elemen kustom menyediakan sebuah cara untuk menggunakan elemen kustom sebagai [Elemen Bawaan yang Dikustomisasi](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) dengan menambahkan atribut `is` pada pada sebuah elemen bawaan:

```html
<button is="tombol-plastik">Tekan Aku!</button>
```

Penggunaan properti khusus `is` oleh Vue adalah mensimulasikan fungsi atribut bawaan sebelum fungsi tersebut tersedia secara global pada perambah. Namun, pada Vue versi 2.x properti tersebut akan dianggap sebagai sebuah komponen Vue dengan nama `tombol-plastik`. Perilaku tersebut mencegah fungsi bawaan pada Elemen Bawaan yang Dikustomisasi.

Pada Vue versi 3.0, kami membatasi perlakukan khusus Vue pada properti `is` hanya untuk _tag_ `<component>` saja.

- Ketika digunakan pada _tag_ `<component>`, properti tersebut akan memiliki perilaku yang sama dengan pada Vue versi 2.x;
- Ketika digunakan pada komponen biasa, properti tersebut akan dianggap sebagai sebuah properti biasa:

  ```html
  <foo is="bar" />
  ```

  - Perilaku pada Vue versi 2.x: menampilkan komponen `bar`.
  - Perilaku pada Vue versi 3.x: menampilkan komponen `foo` dan meneruskan properti `is`.

- Ketika digunakan pada elemen biasa, properti tersebut akan diteruskan pada pemanggilan fungsi `createElement` sebagai opsi `is`, dan juga ditampilkan sebagai atribut bawaan. Hal tersebut mendukung penggunaan dari elemen bawaan yang dikustomisasi.

  ```html
  <button is="tombol-plastik">Tekan Aku!</button>
  ```

  - Perilaku pada Vue versi 2.x: menampilkan komponen `tombol-plastik`.
  - Perilaku pada Vue versi 3.x: menampilkan komponen tombol bawaan dengan memanggil fungsi

    ```js
    document.createElement('button', { is: 'tombol-plastik' })
    ```

## `v-is` Untuk Menangani Penguraian _Template_ Dalam DOM 

> Catatan: bagian ini hanya mempengaruhi kasus-kasus di mana _template_ Vue ditulis secara langsung pada HTML dari halaman web.
> Ketika menggunakan _template_ dalam DOM, _template_ tersebut akan diuraikan menggunakan aturan penguraian HTML bawaan. Beberapa eleme HTML, seperti `<ul>`, `<ol>`, `<table>`, dan `<select>` memiliki batasan-batasan mengenai elemen yang dapat ditampilkan di dalam elemen tersebut, dan beberapa elemen seperti `<li>`, `<tr>`, dan `<option>` hanya bisa tampil di dalam elemen lain tertentu.

### Sintaks Vue versi 2.x

Pada Vue versi 2, kami menyarankan untuk mengatasi batasan-batasan tersebut dengan menggunakan properti `is` pada sebuah _tag_ HTML bawaan:

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

### Sintaks Vue versi 3.x

Dengan perubahan perilaki dari `is`, kami memperkenalkan sebuah _directive_ baru `v-is` untuk menangani kasus tersebut:

```html
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

:::warning
Fungsi `v-is` mengharapkan sebuah ikatan dinamis `:is` seperti pada Vue versi 2.x - sehingga untuk menampilkan sebuah komponen berdasarkan nama yang sudah didaftarkan, nilai dari `v-is` harus merupakan sebuah _string literal_ JavaScript: 

```html
<!-- Salah, tidak ada yang akan ditampilkan -->
<tr v-is="blog-post-row"></tr>

<!-- Benar -->
<tr v-is="'blog-post-row'"></tr>
```

:::

## Strategi Migrasi

- Ganti `config.ignoredElements` dengan `compilerOptions` milik `vue-loader` (dengan langkah pembangunan kode program) atau `app.config.isCustomElement` (dengan kompilasi _template_ secara _on-the-fly_).
- Ganti seluruh penggunaan `is` pada _tag_ yang bukan `<component>` dengan `<component is="...">` (untuk _template_ SFC) atau `v-is` (untuk _template_ dalam DOM). 
