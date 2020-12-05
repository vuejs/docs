# Class dan Style Binding

Kebutuhan umum untuk _data binding_ adalah memanipulasi daftar kelas elemen dan gaya sebarisnya (_inline styles_). Karena keduanya adalah atribut, kita dapat menggunakan `v-bind` untuk menanganinya: kita hanya perlu menghitung string terakhir dengan _expression_ kita. Namun, mencampuri dengan penggabungan string mengganggu dan rawan kesalahan. Karena alasan ini, Vue menyediakan penyempurnaan khusus ketika `v-bind` digunakan dengan `class` dan `style`. Selain string, _expression_ juga dapat dievaluasi menjadi objek atau array.

## Binding Kelas HTML

### Sintaks Objek

Kita bisa _pass_ objek ke `:class` (kependekan dari `v-bind:class`) untuk _toggle_ kelas secara dinamis:

```html
<div :class="{ aktif: sedangAktif }"></div>
```

Sintaks di atas berarti keberadaan kelas `aktif` akan ditentukan oleh [kebenaran](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) properti data `sedangAktif`.

Kamu dapat memiliki beberapa kelas _toggle_ dengan memiliki lebih banyak bidang di objek. Selain itu, perintah `:class` juga bisa ada berdampingan dengan atribut `class` biasa. Jadi misalkan diberikan template berikut:

```html
<div
  class="statis"
  :class="{ aktif: sedangAktif, 'teks-peringatan': terdapatError }"
></div>
```

Dan data berikut:

```js
data() {
  return {
    sedangAktif: true,
    terdapatError: false
  }
}
```

Ini akan membuat:

```html
<div class="statis aktif"></div>
```

Ketika `sedangAktif` atau `terdapatError` berubah, daftar kelas akan diperbarui sesuai dengan itu. Misalnya, jika `terdapatError` menjadi`true`, daftar kelas akan menjadi `"statis aktif teks-peringatan"`.

Objek terikat tidak harus sejajar:

```html
<div :class="objekKelas"></div>
```

```js
data() {
  return {
    objekKelas: {
      aktif: true,
      'teks-peringatan': false
    }
  }
}
```

Ini akan memberikan hasil yang sama. Kita juga bisa melakukan _bind_ ke [properti komputasi](computed.md) yang mengembalikan objek. Ini adalah pola yang umum dan manjur:

```html
<div :class="objekKelas"></div>
```

```js
data() {
  return {
    sedangAktif: true,
    error: null
  }
},
computed: {
  objekKelas() {
    return {
      aktif: this.sedangAktif && !this.error,
      'teks-peringatan': this.error && this.error.type === 'fatal'
    }
  }
}
```

### Sintaks Array

Kita bisa _pass_ array ke `:class` untuk menerapkan daftar kelas:

```html
<div :class="[kelasAktif, kelasError]"></div>
```

```js
data() {
  return {
    kelasAktif: 'aktif',
    kelasError: 'teks-peringatan'
  }
}
```

Yang akan membuat:

```html
<div class="aktif teks-peringatan"></div>
```

Jika kamu juga ingin mengubah kelas dalam daftar secara bersyarat, kamu dapat melakukannya dengan ekspresi _ternary_:

```html
<div :class="[sedangAktif ? kelasAktif : '', kelasError]"></div>
```

Ini akan selalu menerapkan `kelasError`, tetapi hanya akan menerapkan`kelasAktif` jika `sedangAktif` benar (_truthy_).

Namun, ini bisa sedikit bertele-tele jika kamu memiliki beberapa kelas bersyarat. Itu sebabnya juga dimungkinkan untuk menggunakan sintaks objek di dalam sintaks array:

```html
<div :class="[{ aktif: sedangAktif }, kelasError]"></div>
```

### Dengan Komponen

> Bagian ini mengasumsikan pengetahuan tentang [Vue Components](component-basics.md). Jangan ragu untuk melewatkannya dan kembali lagi nanti.

Saat kamu menggunakan atribut `class` pada komponen khusus dengan satu elemen root, kelas tersebut akan ditambahkan ke elemen ini. Kelas yang ada pada elemen ini tidak akan ditimpa.

Misalnya, jika kamu mendeklarasikan komponen berikut:

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `<p class="foo bar">Hi!</p>`
})
```

Kemudian tambahkan beberapa kelas saat menggunakannya:

```html
<div id="app">
  <my-component class="baz boo"></my-component>
</div>
```

HTML yang dirender akan menjadi:

```html
<p class="foo bar baz boo">Hi</p>
```

Hal yang sama berlaku untuk _class binding_:

```html
<my-component :class="{ aktif: sedangAktif }"></my-component>
```

Jika `sedangAktif` benar, HTML yang dirender akan menjadi:

```html
<p class="foo bar aktif">Hi</p>
```

Jika komponenmu memiliki beberapa elemen root, kamu perlu menentukan komponen mana yang akan menerima kelas ini. Kamu dapat melakukan ini menggunakan properti komponen `$attrs`:

```html
<div id="app">
  <my-component class="baz"></my-component>
</div>
```

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p>
    <span>Ini merupakan komponen anak</span>
  `
})
```

Kamu dapat mempelajari lebih lanjut tentang pewarisan atribut komponen di bagian [Atribut Non-Properti](komponen-attrs.html).

## Binding Inline Style

### Sintaks Objek

Sintaks objek untuk `:style` cukup mudah - terlihat hampir seperti CSS, kecuali itu adalah objek JavaScript. Kamu dapat menggunakan camelCase atau kebab-case (gunakan tanda kutip dengan kebab-case) untuk nama properti CSS:

```html
<div :style="{ color: warnaAktif, fontSize: ukuranTeks + 'px' }"></div>
```

```js
data() {
  return {
    warnaAktif: 'red',
    ukuranTeks: 30
  }
}
```

Seringkali merupakan ide yang bagus untuk _bind_ objek gaya secara langsung agar templatenya lebih bersih:

```html
<div :style="objekGaya"></div>
```

```js
data() {
  return {
    objekGaya: {
      warnaAktif: 'red',
      ukuranTeks: '13px'
    }
  }
}
```

Sekali lagi, sintaks objek sering digunakan bersama dengan properti komputasi yang mengembalikan objek.

### Sintaks Array

Sintaks array untuk `:style` memungkinkan kamu menerapkan beberapa objek gaya ke elemen yang sama:

```html
<div :style="[gayaDasar, gayaOverride]"></div>
```

### Auto-prefixing

Saat kamu menggunakan properti CSS yang membutuhkan [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) pada `:style`, misalnya `transform`, Vue akan secara otomatis mendeteksi dan tambahkan prefiks yang sesuai ke gaya yang diterapkan.

### Beberapa Nilai

Kamu dapat memberikan sebuah array dengan beberapa nilai (awalan) ke properti gaya, misalnya:

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Ini hanya akan me-_render_ nilai terakhir dalam array yang didukung peramban. Dalam contoh ini, ini akan merender `display: flex` untuk peramban yang mendukung versi flexbox yang tidak diperbaiki.
