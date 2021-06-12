# _Binding_ Class dan Style

Kebutuhan umum untuk _binding_ data adalah memanipulasi daftar elemen _class_ dan _style_ sebarisnya (_inline styles_). Karena keduanya adalah atribut, kita dapat menggunakan `v-bind` untuk menanganinya: kita hanya perlu menghitung string terakhir dengan ekspresi kita. Namun, berurusan dengan penggabungan string mengjengkelkan dan rawan kesalahan. Karena alasan ini, Vue menyediakan penyempurnaan khusus ketika `v-bind` digunakan dengan `class` dan `style`. Selain string, ekspresi juga dapat dievaluasi menjadi objek atau array.

## _Binding_ Kelas HTML

<VideoLesson href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3?friend=vuejs" title="Vue.js keas dinamus">Lihat video tutorial gratis dari Vue School</VideoLesson>

### Sintaksis Objek

Kita bisa melewatkan objek ke `:class` (kependekan dari `v-bind:class`) untuk mengubah _class_ secara dinamis:

```html
<div :class="{ active: isActive }"></div>
```

Sintaksis di atas berarti keberadaan _class_ `active` akan ditentukan oleh nalai [_truthy_](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) properti data `isActive`.

Anda dapat memiliki beberapa _class_ di-_toggle_ dengan memiliki lebih banyak properti di objek. Selain itu, direktif `:class` juga bisa berdampingan dengan atribut `class` biasa. Misalnya templat berikut:

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Dan data berikut:

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

Kode tersebut akan me-_render_:

```html
<div class="static active"></div>
```

Ketika `isActive` atau `hasError` berubah, daftar _class_ akan diperbarui juga. Misalnya, jika `hasError` menjadi`true`, daftar _class_ akan menjadi `"static active text-danger"`.

Objek yang di-_bind_ tidak harus diletakkan secara sebaris (_inline_):

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

Kode tersebut akan memberikan hasil yang sama. Kita juga bisa melakukan _binding_ ke [properti terkomputasi](computed.md) yang mengembalikan objek. Cara tersebut adalah pola yang umum dan manjur:

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      aktif: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### Sintaksis Array

Kita bisa memasukkan array ke dalam `:class` untuk menerapkan daftar _class_:

```html
<div :class="[isActive, errorClass]"></div>
```

```js
data() {
  return {
    isActive: 'active',
    errorClass: 'text-danger'
  }
}
```

Yang akan me-_render_:

```html
<div class="active text-danger"></div>
```

Jika Anda juga ingin mengubah _class_ dalam daftar dengan kondisi tertentu, Anda dapat melakukannya dengan ekspresi _ternary_:

```html
<div :class="[isActive ? isActive : '', errorClass]"></div>
```

Kode tersebut akan selalu menerapkan `errorClass`, dan hanya akan menerapkan `isActive` jika `isActive` bernilai _truthy_[[1]](#footnote-1).

Namun, cara tersebut bisa cukup bertele-tele jika Anda memiliki beberapa _class_ dengan kondisinya masing-masing. Oleh karena itu, memungkinkan juga untuk menggunakan sintaksis objek di dalam sintaksis array:

```html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### Dengan Komponen

> Bagian ini mengasumsikan pengetahuan tentang [Vue Components](component-basics.md). Jangan ragu untuk melewatinya dan kembali lagi nanti.

Saat Anda menggunakan atribut `class` pada komponen buatan sendiri (_custom component_) dengan satu elemen _root_, _class_ tersebut akan ditambahkan ke elemen tersebut. Kelas yang ada pada elemen tersebut tidak akan ditimpa.

Misalnya, jika Anda mendeklarasikan komponen berikut:

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `<p class="foo bar">Hi!</p>`
})
```

Kemudian tambahkan beberapa _class_ saat menggunakannya:

```html
<div id="app">
  <my-component class="baz boo"></my-component>
</div>
```

HTML yang di-_render_ akan menjadi:

```html
<p class="foo bar baz boo">Hi</p>
```

Hal yang sama berlaku untuk _binding_ _class_:

```html
<my-component :class="{ active: isActive }"></my-component>
```

Jika `isActive` bernilai _truthy_, HTML yang di-_render_ akan menjadi:

```html
<p class="foo bar active">Hi</p>
```

Jika komponen Anda memiliki beberapa elemen _root_, Anda perlu menentukan komponen mana yang akan menerima _class_ ini. Anda juga dapat melakukannya dengan menggunakan properti `$attrs` pada komponen:

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
    <span>This is a child component</span>
  `
})
```

Anda dapat mempelajari lebih lanjut tentang pewarisan atribut komponen pada bagian [Atribut Non-Properti](komponen-attrs.html).

## _Binding_ _Style_ Sebaris (_Inline_)

### Sintaksos Objek

Sintaksis objek untuk `:style` cukup mudah - terlihat hampir seperti CSS, kecuali itu adalah objek JavaScript. Anda dapat menggunakan camelCase atau kebab-case (gunakan tanda kutip dengan kebab-case) untuk nama properti CSS:

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

Seringkali cara tersebut adalah cara yang baik untuk me-_bind_ objek _style_ secara langsung agar templatnya lebih bersih:

```html
<div :style="styleObject"></div>
```

```js
data() {
  return {
    styleObject: {
      activeColor: 'red',
      fontSize: '13px'
    }
  }
}
```

Sekali lagi, sintaksis objek sering digunakan bersama dengan properti komputasi yang mengembalikan objek.

### Sintaksis Array

Sintaksis array untuk `:style` memungkinkan Anda menerapkan beberapa objek _style_ ke elemen yang sama:

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Memberi Awalan Secara Otomatis

Saat Anda menggunakan properti CSS yang membutuhkan [awalan vendor](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) pada `:style`, misalnya `transform`, Vue akan secara otomatis mendeteksi dan tambahkan prefiks yang sesuai ke _style_ yang diterapkan. Vue melakukan ini dengan cara mengecek pada saat _runtime_ properti _style_ manakah yang didukung oleh peramban. Jika peramban tidak mendukung properti tersebut maka macam - macam prefiks dengan varian akan di test satu - persatu untuk menememukan properti yang di support peramban tersebut.
### Beberapa Nilai

Anda dapat memberikan sebuah array dengan beberapa nilai (awalan) ke properti _style_, misalnya:

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Kode tersebut hanya akan me-_render_ nilai terakhir dalam array yang didukung peramban. Dalam kasus ini, contoh tersebut akan me-_render_ `display: flex` untuk peramban yang mendukung versi flexbox yang tidak memiliki awalan.

<small>**Catatan penerjemah**:</small>

<small><a id="footnote-1"></a>[1] _Truthy_ bukanlah bernilai `true`, silahkan memembaca [Mozilla Developer Network - Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) untuk penjelasan lebih lanjut.</small>
