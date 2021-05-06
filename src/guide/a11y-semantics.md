# Semantik

## Formulir

Saat membuat formulir, kamu dapat menggunakan elemen-elemen berikut: `<form>`, `<label>`, `<input>`, `<textarea>`, and `<button>`

Label biasanya ditempatkan di atas atau di sebelah kiri:

```html
<form action="/lokasiPengumpulanData" method="post" autocomplete="on">
  <div v-for="isi in IsiFormulir" :key="isi.id" class="isi-formulir">
    <label :for="isi.id">{{ isi.label }}: </label>
    <input :type="isi.tipe" :id="isi.id" :name="isi.id" v-model="isi.nilai" />
  </div>
  <button type="submit">Kirim</button>
</form>
```

<common-codepen-snippet title="Simple Form" slug="dyNzzWZ" :height="368" tab="js,result" theme="light" :preview="false" :editable="false" />

Perhatikan bagaimana kamu dapat menyertakan `autocomplete="on"`pada elemen formulir dan ini akan berlaku untuk semua masukan (_input_) dalam formulirmu. Kamu juga dapat menyetel [nilai atribut _autocomplete_](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) yang berbeda-beda untuk setiap masukan.

### Label

Berikan label untuk mendeskripsikan tujuan dari semua kontrol formulir; dengan cara menghubungkan `for` dan `id`:

```html
<label for="nama">Nama</label>
<input type="text" name="nama" id="nama" v-model="nama" />
```

<common-codepen-snippet title="Form Label" slug="XWpaaaj" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" />

Jika kamu memeriksa elemen tersebut di dalam alat pengembang chrome-mu dan membuka tab aksesibilitas di dalam tab elemen, kamu akan melihat bagaimana masukan mendapatkan namanya dari label:

![Alat Pengembang Chrome menampilkan nama masukan dari label](/images/AccessibleLabelChromeDevTools.png)

:::warning Peringatan:
Meskipun kamu mungkin pernah melihat label yang membungkus bidang masukan seperti ini:

```html
<label>
  Nama:
  <input type="text" name="nama" id="nama" v-model="nama" />
</label>
```

Pengaturan label secara eksplisit dengan id yang cocok lebih didukung oleh teknologi pendukung.
:::

#### aria-label

Kamu juga dapat memberi masukan dengan nama yang dapat diakses dengan [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute).

```html
<label for="nama">Nama</label>
<input
  type="text"
  name="nama"
  id="nama"
  v-model="nama"
  :aria-label="namaLabel"
/>
```

<common-codepen-snippet title="Form ARIA label" slug="NWdvvYQ" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" />

Jangan ragu untuk memeriksa elemen tersebut di Alat Pengembang Chrome untuk melihat bagaimana nama yang dapat diakses telah berubah:

![Alat Pengembang Chrome menampilkan masukan dengan nama yang dapat diakses dari aria-label](/images/AccessibleARIAlabelDevTools.png)

#### aria-labelledby

Penggunaan [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) mirip dengan `aria-label` kecuali teknik ini digunakan jika label pada text terlihat pada layar. Sering digunakan bersama dengan elemen lain melalui `id` dan anda dapat menggunakan `id` berulang kali:

```html
<form
  class="demo"
  action="/lokasiPengumpulanData"
  method="post"
  autocomplete="on"
>
  <h1 id="tagihan">Tagihan</h1>
  <div class="isi-formulir">
    <label for="nama">Nama:</label>
    <input
      type="text"
      name="nama"
      id="nama"
      v-model="nama"
      aria-labelledby="tagihan nama"
    />
  </div>
  <button type="submit">Kirim</button>
</form>
```

<common-codepen-snippet title="Form ARIA labelledby" slug="MWJvvBe" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" />

![Alat Pengembang Chrome menampilkan masukan nama yang dapat diakses dari aria-labelledby](/images/AccessibleARIAlabelledbyDevTools.png)

#### aria-describedby

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute) digunakan dengan cara yang sama seperti `aria-labelledby`, yaitu mengharapkan memberikan deskripsi dengan informasi tambahan yang mungkin diperlukan pengguna. Ini dapat digunakan untuk mendesripsikan kriteria untuk masukan apapun

```html
<form
  class="demo"
  action="/lokasiPengumpulanData"
  method="post"
  autocomplete="on"
>
  <h1 id="tagihan">Tagihan</h1>
  <div class="isi-formulir">
    <label for="nama">Nama Lengkap:</label>
    <input
      type="text"
      name="nama"
      id="nama"
      v-model="nama"
      aria-labelledby="tagihan nama"
      aria-describedby="deskripsiNama"
    />
    <p id="deskripsiNama">Mohon sebutkan nama depan dan nama belakang.</p>
  </div>
  <button type="submit">Kirim</button>
</form>
```

<common-codepen-snippet title="Form ARIA describedby" slug="gOgxxQE" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" />

Kamu dapat melihat deskripsinya dengan memeriksa Alat Pengembang Chrome:

![Alat Pengembang Chrome menampilkan masukan nama yang dapat diakses dari aria-labelledby dan deskripsi dengan aria-describedby](/images/AccessibleARIAdescribedby.png)

### Placeholder

Hindari menggunakan placeholder karena dapat membingunkan banyak pengguna.

Salah satu masalah placeholder adalah mereka tidak memenuhi [kriteria kontras warna](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) secara default; memperbaiki kontras warna membuat placeholder terlihat seperti data yang sudah terisi sebelumnya di bidang masukan. Melihat pada contoh berikut, kamu dapat melihat bahwa placeholder _Last Name_ yang memenuhi kriteria kontras warna tampak seperti data yang sudah terisi sebelumnya:

<common-codepen-snippet title="Form Placeholder" slug="ExZvvMw" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" />

Cara terbaik adalah memberikan semua informasi yang dibutuhkan pengguna untuk mengisi formulir di luar masukan apapun.

### Instruksi

Saat menambahkan instruksi untuk bidang masukan kamu, pastikan untuk menyambungkannya kapada masukan.
Kamu dapat memberikan petunjuk tambahan dan _bind_ beberapa id ke dalam suatu [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute). Ini memungkinkan desain yang lebih fleksibel.

```html
<fieldset>
  <legend>Menggunakan aria-labelledby</legend>
  <label id="label-tanggal" for="tanggal">Tanggal Sekarang:</label>
  <input
    type="date"
    name="tanggal"
    id="tanggal"
    aria-labelledby="label-tanggal instruksi-tanggal"
  />
  <p id="instruksi-tanggal">MM/DD/YYYY</p>
</fieldset>
```

Selain itu, kamu juga dapat melampirkan petunjuk ke masukan dengan [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute):

```html
<fieldset>
  <legend>Menggunakan aria-describedby</legend>
  <label id="tanggal-lahir" for="tanggal-lahir">Tanggal Lahir:</label>
  <input
    type="date"
    name="tanggal-lahir"
    id="tanggal-lahir"
    aria-describedby="instruksi-tanggal-lahir"
  />
  <p id="instruksi-tanggal-lahir">MM/DD/YYYY</p>
</fieldset>
```

<common-codepen-snippet title="Form Instructions" slug="WNREEqv" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" />

### Menyembunyikan Konten

Biasanya tidak disarankan untuk menyembunyikan label secara visual, meskipun masukan memiliki nama yang dapat diakses. Namun, jika fungsionalitas masukan dapat dipahami dengan konten di sekitarnya, maka kita dapat menyembunyikan label secara visual.

Mari kita lihat bidang pencarian ini:

```html
<form role="search">
  <label for="cari" class="disembunyikan-secara-visual">Cari: </label>
  <input type="text" name="cari" id="cari" v-model="cari" />
  <button type="submit">Cari</button>
</form>
```

Kita dapat melakukan ini karena tombol pencarian akan membantu pengguna dengan kemampuan visual untuk mengidentifikasi maksud dari bidang input tersebut.

Kita dapat menggunakan CSS untuk menyembunyikan elemen secara visual tetapi membuatnya tetap tersedia untuk teknologi pendukung:

```css
.disembunyikan-secara-visual {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}
```

<common-codepen-snippet title="Form Search" slug="QWdMqWy" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" />

#### aria-hidden="true"

Menambahkan `aria-hidden="true"` akan menyembunyikan elemen dari teknologi pendukung tetapi membiarkannya tersedia secara visual kepada pengguna lain. Jangan gunakan pada elemen yang dapat difokuskan, gunakanlah hanya pada elemen dekoratif, duplikat, atau konten rahasia.

```html
<p>Ini tidak tersembunyi dari pembaca layar.</p>
<p aria-hidden="true">Ini tersembunyi dari pembaca layar.</p>
```

### Tombol

Saat menggunakan tombol di dalam formulir, kamu dapat mengatur jenis untuk mencegah pengiriman formulir.
Kamu juga dapat menggunakan masukan untuk membuat tombol:

```html
<form action="/lokasiPengumpulanData" method="post" autocomplete="on">
  <!-- Buttons -->
  <button type="button">Batal</button>
  <button type="submit">Kirim</button>

  <!-- Input buttons -->
  <input type="button" value="Batal" />
  <input type="submit" value="Kirim" />
</form>
```

<common-codepen-snippet title="Form Buttons" slug="JjEyrYZ" :height="467" tab="js,result" theme="light" :preview="false" :editable="false" />

#### Gambar Fungsional

Kamu dapat menggunakan teknik ini untuk membuat gambar fungsional.

- Bidang masukan

  - Gambar-gambar ini akan berperan sebagai tombol dengan tipe kirim pada formulir

  ```html
  <form role="search">
    <label for="cari" class="hidden-visually">Cari: </label>
    <input type="text" name="cari" id="cari" v-model="cari" />
    <input
      type="image"
      class="btnImg"
      src="https://img.icons8.com/search"
      alt="Cari"
    />
  </form>
  ```

- Ikon

```html
<form role="search">
  <label for="ikon-pencarian" class="disembunyikan-secara-visual">Cari: </label>
  <input
    type="text"
    name="ikon-pencarian"
    id="ikon-pencarian"
    v-model="ikon-pencarian"
  />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="disembunyikan-secara-visual">Cari</span>
  </button>
</form>
```

<common-codepen-snippet title="Functional Images" slug="jOyLGqM" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" />
