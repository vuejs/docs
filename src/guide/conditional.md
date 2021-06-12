# _Rendering_ Bersyarat

<VideoLesson href="https://vueschool.io/lessons/conditional-rendering-in-vue-3?friend=vuejs" title="Learn how conditional rendering works with Vue School">Learn how conditional rendering works with a free lesson on Vue School</VideoLesson>

## `v-if`

Instruksi `v-if` biasa digunakan untuk melakukan _rendering_ sebuah bagian dengan syarat tertentu. Bagian tersebut akan di-_render_ jika ekspresi instruksi mengembalikan nilai _truthy_.

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

Memungkinkan juga untuk menambahkan "bagian _else_" menggunakan `v-else`:

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

### Pengelompokan Bersyarat dengan `v-if` pada `<template>`

Karena `v-if` merupkan instruksi, ia harus ditempelkan pada sebuah elemen tunggal. Tetapi bagaimana jika kita ingin mengalihkan lebih dari satu elemen? Dalam kasus ini kita dapat menggunakan `v-if` pada elemen `<template>`, yang bertindak sebagai pembungkus tak terlihat. Hasil final yang di-_render_ tidak akan menyertakan elemen

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### `v-else`

Anda dapat menggunakan instruksi `v-else` untuk menunjukkan "bagian _else_" untuk `v-if`:

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

Sebuah elemen yang memiliki instruksi `v-else` harus berada tepat setelah elemen `v-if` atau `v-else-if` - jika tidak maka ia tidak akan dikenali.

### `v-else-if`

Sesuai namanya, `v-else-if` bertindak sebagai "bagian _else if_" untuk `v-if`. Ia juga bisa dirangkai berkali-kali:

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

Sama seperti `v-else`, sebuah elemen `v-else-if` harus berada tepat setelah elemen `v-if` atau `v-else-if`.

## `v-show`

Pilihan lain untuk menampilkan elemen secara bersyarat adalah instruksi `v-show`. Penggunaannya kurang lebih sama:

```html
<h1 v-show="ok">Hello!</h1>
```

Perbedaannya adalah elemen yang menggunakan `v-show` akan selalu di-_render_ dan tetap berada pada DOM; `v-show` hanya mengalihkan properti CSS `display` dari elemen tersebut.

`v-show` tidak mendukung elemen `<template>`, tidak juga bekerja dengan `v-else`.

## `v-if` vs `v-show`

`v-if` merupakan _rendering_ bersyarat yang "nyata" karena ia memastikan _event listener_ dan komponen _child_ di dalam bagian bersyarat benar-benar dihancurkan dan dibuat ulang selama peralihan.

`v-if` juga **malas**: jika kondisi bernilai salah pada _rendering_ awal, ia tidak akan melakukan apapun - bagian bersyarat tidak akan di-_render_ hingga kondisi bernilai benar untuk pertama kali.

Sebagai perbandingan, `v-show` jauh lebih sederhana - elemen selalu di-_render_ terlepas dari kondisi awal atau tidak, menggunakan peralihan berbasis CSS.

Secara umum, `v-if` memiliki biaya peralihan yang tinggi sedangkan `v-show` memiliki biaya _rendering_ awal yang lebih tinggi. Sehingga lebih baik gunakan `v-show` jika Anda butuh peralihan yang cukup sering, dan gunakan `v-if` jika kondisinya tidak mungkin berubah saat _runtime_.

## `v-if` dengan `v-for`

::: tip Catatan
Menggunakan `v-if` dan `v-for` secara bersama-sama **tidak direkomendasikan**. Lihat [panduan gaya](../style-guide/#avoid-v-if-with-v-for-essential) untuk informasi lebih lanjut.
:::

Ketika `v-if` dan `v-for` digunakan secara bersama-sama pada elemen, `v-if` akan dievaluasi terlebih dahulu. Lihat [panduan _rendering_ daftar](list#v-for-with-v-if) untuk detailnya.
