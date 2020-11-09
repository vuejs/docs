---
badges:
  - breaking
---

# Perilaku Penanganan Atribut <MigrationBadges :badges="$frontmatter.badges" />

::: info Info
Perubahan ini merupakan perubahan API internal yang _low-level_ dan tidak berpengaruh pada sebagian besar pengembang.
:::

## Gambaran Umum

Berikut merupakan gambaran umum tentang perubahan yang terjadi:

- Menghapus konsep internal tentang atribut yang dapat dienumerasi dan memperlakukan atribut tersebut sama seperti atribut bukan _boolean_ biasa
- **MERUSAK**: Tidak menghapus atribut bila nilainya merupakan `false`, melainkan menetapkannya sebagai `attr=false`. Untuk menghapus atribut, gunakan `null` atau `undefined`.

Silahkan membaca untuk penjelasan lebih lanjut

## Sintaks Vue versi 2.x

Pada Vue versi 2.x, kami memiliki beberapa cara untuk menangani nilai `v-bind`:

- Untuk beberapa pasangan atribut/elemen, Vue selalu menggunakan atribut (properti) IDLnya [seperti `value` dari `<input>`, `<select>`, `<progress>`, dan lain sebagainya](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L11-L18).

- Untuk [atribut boolean](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L33-L40)" dan [xlinks](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L44-L46), Vue akan menghapus atribut tersebut bila bernilai 'falsy' ([`undefined`, `null` atau `false`](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L52-L54)) dan menambahkan atribut tersebut (lihat [di sini](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L66-L77) dan [di sini](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L81-L85)).

- Untuk "[atribut yang dapat dienumerasi](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L20)" (untuk saat ini: `contenteditable`, `draggable` dan `spellcheck`), Vue akan mencoba [mengubah](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L24-L31) atribut tersebut menjadi `string` (Untuk sekarang atribut `contenteditable` mendapat perlakukan khusus, dapat diperbaiki melalui [vuejs/vue#9397](https://github.com/vuejs/vue/issues/9397)).

- Untuk atribut lainnya, kami menghapus nilai 'falsy' (`undefined`, `null`, or `false`) dan menetapkan nilai lainnya sebagaimana adanya (lihat [di sini](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L92-L113)).

Tabel di bawah ini mendeskripsikan perbedaan dalam cara Vue menangani atribut yang dienumerasi dan atribut biasa yang bukan `boolean`:

| Ekspersi _binding_  | `foo` <sup>normal</sup> | `draggable` <sup>enumerated</sup> |
| ------------------- | ----------------------- | --------------------------------- |
| `:attr="null"`      | /                       | `draggable="false"`               |
| `:attr="undefined"` | /                       | /                                 |
| `:attr="true"`      | `foo="true"`            | `draggable="true"`                |
| `:attr="false"`     | /                       | `draggable="false"`               |
| `:attr="0"`         | `foo="0"`               | `draggable="true"`                |
| `attr=""`           | `foo=""`                | `draggable="true"`                |
| `attr="foo"`        | `foo="foo"`             | `draggable="true"`                |
| `attr`              | `foo=""`                | `draggable="true"`                |

Dapat dilihat dari tabel di atas, implementasi saat ini mengubah nilai `true` menjadi `'true'` namun menghapus atribut tersebut apabila bernilai `false`. Perilaku tersebut berujung pada inkonsistensi dan menuntut pengguna untuk mengubah atribut yang bernilai `boolean` menjadi sebuah `string` secara manual pada kasus-kasus umum seperti atribut `aria-*`: `aria-selected`, `aria-hidden`, dan lain sebagainya.

## Sintaks Vue 3.x

Kami berencana untuk menghapus konsep internal tentang atribut yang dapat dienumerasi dan menangani atribut-atribut tersebut sebagai atribut HTML biasa yang tidak bernilai `boolean`.

- Keputusan tersebut menyelasikan masalah inkonsistensi antara atribut biasa yang tidak bernilai `boolean` dan atribut yang dapat dienumerasi.
- Keputusan tersebut juga membuka peluang untuk menggunakan nilai lain selain `'true'` dan `'false'` atau bahkan kata kunci lain yang belum tersedia, untuk atribut seperti `contenteditable`

Untuk atribut lainnya yang tidak bernilai `boolean`, Vue akan berhenti untuk menghapus atribut tersebut apabila atribut tersebut bernilai `false` dan mengubah nilai tersebut menjadi `'false'`.

- Keputusan tersebut menyelesaikan masalah inkonsistensi antara nilai `true` dan `false` dan mempermudah penggunaan atribut `aria-*`

Tabel di bawah ini mendeskripsikan perilaku baru tersebut:

| Ekspresi _binding_  | `foo` <sup>normal</sup>    | `draggable` <sup>enumerated</sup> |
| ------------------- | -------------------------- | --------------------------------- |
| `:attr="null"`      | /                          | / <sup>†</sup>                    |
| `:attr="undefined"` | /                          | /                                 |
| `:attr="true"`      | `foo="true"`               | `draggable="true"`                |
| `:attr="false"`     | `foo="false"` <sup>†</sup> | `draggable="false"`               |
| `:attr="0"`         | `foo="0"`                  | `draggable="0"` <sup>†</sup>      |
| `attr=""`           | `foo=""`                   | `draggable=""` <sup>†</sup>       |
| `attr="foo"`        | `foo="foo"`                | `draggable="foo"` <sup>†</sup>    |
| `attr`              | `foo=""`                   | `draggable=""` <sup>†</sup>       |

<small>†: diubah</small>

Pengubahan terhadap atribut `boolean` tidak berubah.

## Strategi Migrasi

### Atribut yang Dapat Dienumerasi

Penghapusan konsep atribut yang dapat dienumerasi dan `attr="false"` dapat menghasilkan nilai atribut IDL yang berbeda (yang akan dicerminkan pada keadaan sesungguhnya), yang dideskripsikan seperti berikut:

| Atribut yang Dihapus | Atribut IDL dan Nilainya             |
| -------------------- | ------------------------------------ |
| `contenteditable`    | `contentEditable` &rarr; `'inherit'` |
| `draggable`          | `draggable` &rarr; `false`           |
| `spellcheck`         | `spellcheck` &rarr; `true`           |

Supaya perilaku lama tetap dapat dijalankan, dan karena Anda akan menngubah nilai `false` menjadi `'false'`, pada Vue versi 3.x pengembang harus membuat ekspresi `v-bind` pada atribut `contenteditable` dan `spellcheck` agar menghasilkan nilai `false` atau `'false'`.

Pada Vue versi 2.x, nilai yang tidak valid diubah menjadi `'true'` untuk atribut yang dapat dienumerasi. Perilaku tersebut biasanya tidak diharapkan dan tidak diinginkan pada kasus skala besar. Pada Vue versi 3.x `true` atau `'true'` harus dinyatakan secara eksplisit.

### Mengubah `false` menjadi `'false'`

Pada Vue versi 3.x, penghapusan atribut harus dinyatakan secara eksplisit dengan menetapkan nilai pada atribut tersebut sebagai `null` atau `undefined`.

### Perbandingan Perilaku Vue Versi 2.x dan 3.x

<table>
  <thead>
    <tr>
      <th>Atribut</th>
      <th>Nilai <code>v-bind</code> <sup>2.x</sup></th>
      <th>Nilai <code>v-bind</code> <sup>3.x</sup></th>
      <th>Keluaran HTML</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">2.x, atribut yang dapat dienumerasi<br><small>seperti <code>contenteditable</code>, <code>draggable</code> dan <code>spellcheck</code>.</small></td>
      <td><code>undefined</code>, <code>false</code></td>
      <td><code>undefined</code>, <code>null</code></td>
      <td><i>dihapus</i></td>
    </tr>
    <tr>
      <td>
        <code>true</code>, <code>'true'</code>, <code>''</code>, <code>1</code>,
        <code>'foo'</code>
      </td>
      <td><code>true</code>, <code>'true'</code></td>
      <td><code>"true"</code></td>
    </tr>
    <tr>
      <td><code>null</code>, <code>'false'</code></td>
      <td><code>false</code>, <code>'false'</code></td>
      <td><code>"false"</code></td>
    </tr>
    <tr>
      <td rowspan="2">Atribut lain yang tidak bernilai `boolean`<br><small>seperti <code>aria-checked</code>, <code>tabindex</code>, <code>alt</code>, etc.</small></td>
      <td><code>undefined</code>, <code>null</code>, <code>false</code></td>
      <td><code>undefined</code>, <code>null</code></td>
      <td><i>dihapus</i></td>
    </tr>
    <tr>
      <td><code>'false'</code></td>
      <td><code>false</code>, <code>'false'</code></td>
      <td><code>"false"</code></td>
    </tr>
  </tbody>
</table>
