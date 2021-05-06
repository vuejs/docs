# Dasar

Aksesibilitas Web (atau yang dikenal juga dengan _a11y_) mengacu kepada praktik pembuatan situs web yang dapat digunakan oleh siapapun - baik itu penyandang cacat, pengguna dengan koneksi yang lambat, pengguna dengan perangkat keras yang sudah ketinggalan zaman atau rusak, atau pengguna yang sedang tidak pada lingkungan yang mendukung. Contohnya, menambahkan subtitle ke dalam video akan membantu pengguna tuna rungu dan pengguna yang memiliki gangguan pendengaran serta pengguna yang sedang berada di lingkungan yang sangat bising sehingga tidak dapat mendengarkan video tersebut. Selain itu, memastikan subtitle tidak memiliki kontras yang terlalu rendah akan membantu pengguna dengan penglihatan rendah dan pengguna yang sedang menggunakan telepon mereka di bawah terik matahari.

Siap untuk memulai tetapi tidak yakin dari mana?

Lihatlah [Planning and managing web accessibility guide](https://www.w3.org/WAI/planning-and-managing/) yang disediakan oleh [World Wide Web Consortium (W3C)](https://www.w3.org/)

## Lewati tautan

Kamu sebaiknya menambahkan tautan di bagian atas setiap halaman yang mengarah langsung ke area konten sehingga pengguna dapat melewatkan konten yang diulang di beberapa halaman web.

Biasanya ini dilakukan di bagian atas `App.vue` karena ini akan menjadi elemen pertama yang difokuskan di semua halaman kamu:

```html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink">Lewati ke konten utama</a>
  </li>
</ul>
```

Untuk menyembunyikan tautan (kecuali jika difokuskan), kamu dapat menambahkan gaya berikut:

```css
.skipLink {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skipLink:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
```

Setelah pengguna mengubah _route_, kembalikan fokus kepada lewati tautan. Ini dapat dicapai dengan cara berikut:

```vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.skipLink.focus()
    }
  }
}
</script>
```

<common-codepen-snippet title="Skip to Main" slug="GRrvQJa" :height="350" tab="js,result" theme="light" :preview="false" :editable="false" />

[Baca dokumentasi tentang lewati tautan ke konten utama](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## Susun Konten Kamu

Salah satu bagian terpenting dari aksesibilitas adalah memastikan bahwa desain dapat mendukung implementasi aksesibilitas. Desain sebaiknya mempertimbangkan tidak hanya kontras warna, pilihan font, ukuran teks, dan bahasa, tetapi juga bagaimana konten yang disusun di dalam aplikasi.

### Judul

Pengguna dapat menavigasi aplikasi melalui judul. Memiliki judul yang deskriptif untuk setiap bagian aplikasimu dapat memudahkan pengguna untuk memprediksi konten yang ada di dalamnya. Terkait judul, berikut adalah beberapa praktik aksesibilitas yang direkomendasikan:

- Tempatkan judul berdasarkan kepentingannya: `<h1>` - `<h6>`
- Jangan melewatkan judul dalam suatu bagian
- Gunakan tanda judul yang sebenarnya, bukan menggunakan teks yang diberi gaya untuk memberikan tampilan visual pada judul.

[Baca lebih lanjut mengenai judul](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```html
<main role="main" aria-labelledby="judul-utama">
  <h1 id="judul-utama">Judul Utama</h1>
  <section aria-labelledby="judul-bagian">
    <h2 id="judul-bagian">Judul Bagian</h2>
    <h3>Subtitle Bagian</h3>
    <!-- Konten -->
  </section>
  <section aria-labelledby="judul-bagian">
    <h2 id="judul-bagian">Judul Bagian</h2>
    <h3>Subtitle Bagian</h3>
    <!-- Konten -->
    <h3>Subtitle Bagian</h3>
    <!-- Konten -->
  </section>
</main>
```

### _Landmark_

_Landmark_ menyediakan akses programatik ke bagian dalam aplikasi. Pengguna yang mengandalkan teknologi pendukung dapat melakukan navigasi ke setiap bagian aplikasi dan melewati konten. Kamu dapat menggunakan [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) untuk informasi lebih lanjut.

| HTML            | ARIA Role            | Landmark Purpose                                                                                                 |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| header          | role="banner"        | Judul utama: judul halaman                                                                                       |
| nav             | role="navigation"    | Kumpulan link yang cocok digunakan saat menavigasi dokumen atau dokumen terkait                                  |
| main            | role="main"          | Isi utama atau konten utama dari dokumen                                                                         |
| footer          | role="contentinfo"   | Informasi tentang dokumen induk: catatan kaki / hak cipta / tautan ke pernyataan privasi                         |
| aside           | role="complementary" | Mendukung konten utama, namun terpisah dan memiliki makna pada kontennya sendiri                                 |
| _Not available_ | role="search"        | Bagian ini berisi fungsionalitas pencarian untuk aplikasi                                                        |
| form            | role="form"          | Kumpulan elemen yang terkait dengan formulir                                                                     |
| section         | role="region"        | Konten yang relevan dan kemungkinan besar ingin dinavigasi oleh pengguna. Label harus diberikan untuk elemen ini |

:::tip Tip:
Direkomendasikan untuk menggunakan landmark elemen HTML dengan atribut peran (_role attributes_) landmark yang redundan untuk memaksimalkan kompatibilitas dengan [peramban yang tidak mendukung elemen semantik HTML5](https://caniuse.com/#feat=html5semantic)
:::

[Baca lebih lanjut mengenai landmark](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)
