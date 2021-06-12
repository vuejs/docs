# Perkenalan

::: tip CATATAN
Telah mengetahui Vue 2 dan hanya ingin mempelajari apa yang baru di Vue 3? Cek di [Panduan Migrasi](/guide/migration/introduction.html)!
:::

## Apa itu Vue.js?

Vue (cara pengucapannya /vju:/, seperti **view**) adalah **kerangka kerja nan progresif** untuk membangun antarmuka pengguna. Tidak seperti beberapa kerangka kerja lain, Vue dirancang dari dasar agar dapat diadopsi secara bertahap. Pustaka intinya difokuskan pada bagian tampilan saja, dan sangat mudah untuk diintegrasikan dengan pustaka yang lain atau dengan proyek yang sudah ada. Di sisi lain, Vue sangat mampu memberikan dan mendukung Single-Page Application yang canggih ketika dikombinasikan dengan [perkakas modern](../guide/single-file-component.html) dan [dukungan pustaka](https://github.com/vuejs/awesome-vue#components--libraries).

Jika anda ingin mempelajari lebih lanjut tentang Vue, kami <a id="modal-player" class="vuemastery-trigger"  href="#">membuat sebuah video</a> tentang prinsip - prinsip inti dan contoh proyek.

<VideoLesson href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3" title="Tontoh kursus video gratis di Vue Mastery">Tontoh kursus video gratis di Vue Mastery</VideoLesson>

<common-vuemastery-video-modal/>

## Memulai

<p>
  <ActionLink class="primary" url="installation.html">
    Instalasi
  </ActionLink>
</p>

::: tip
Panduan resmi ini mengasumsikan bahwa pengetahuan HTML, CSS dan JavaScript Anda berada di tingkat menengah. Jika Anda benar-benar baru di pengembangan aplikasi _frontend_, mungkin bukan keputusan yang tepat untuk langsung mencoba kerangka kerja sebagai langka pertama Anda - pelajari terlebih dahulu dasar-dasarnya, kemudian kembali lagi ke sini! Pengalaman menggunakan kerangka kerja lain  membantu, tetapi bukan sebuah keharusan.
:::

Cara yang paling mudah untuk mencoba Vue.js adalah menggunakan [contoh Hello World](https://codepen.io/team/Vue/pen/KKpRVpx). Jangan ragu untuk membukanya di tab lain dan ikuti bagaimana kita memberikan beberapa contoh dasar.

Halaman [Instalasi](installation.md) tersedia lebih banyak pilihan untuk memasang Vue. Catatan: Kami **tidak** merekomendasikan pemula memulai dengan `vue-cli`, terlebih lagi jika Anda masih belum terbiasa dengan _build tools_ yang berbasis Node.js.

## Proses Rendering secara Deklaratif

Inti dari Vue.js adalah sistem yang mampu membantu kita untuk me _render_ data ke dalam DOM secara deklaratif menggunakan sintaks _template_ yang mudah:

```html
<div id="counter">
  Counter: {{ counter }}
</div>
```

```js
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')
```

Kita telah membuat aplikasi Vue pertama kita! Jika kita perhatikan proses _rendering_ nya masih sama seperti string template yang biasa, tetapi Vue di sini sudah membantu banyak pekerjaan kita secara ajaib. Data yang ditampilkan sudah terhubung dengan DOM, dan semuanya bersifat **reaktif**. Bagaimana kita mengetahuinya? Perhatikan contoh di bawah ini, properti `counter` nilainya bertambah setiap detik dan Anda akan melihat perubahan DOM nya di _render_:

```js{8-10}
const Counter = {
  data() {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
```

<FirstExample />

Selain interpolasi teks, kita juga dapat _bind_ atribut pada elemen seperti berikut:

```html
<div id="bind-attribute">
  <span v-bind:title="message">
    Arahkan kursor Anda di atas kalimat ini selama beberapa waktu untuk melihat
    atribut title yang terhubung secara dinamis!
  </span>
</div>
```

```js
const AttributeBinding = {
  data() {
    return {
      pesan: 'Anda memuat halaman ini pada ' + new Date().toLocaleString()
    }
  }
}

Vue.createApp(AttributeBinding).mount('#bind-attribute')
```

<common-codepen-snippet title="Binding Atribut secara Dinamis" slug="KKpRVvJ" />

Sekarang kita telah mempelajari hal baru. Atribut `v-bind` yang telah Anda lihat dinamakan **directive**. **Directive** diawali dengan `v-` untuk menginformasikan bahwa dia adalah atribut spesial yang dibawa oleh Vue, dan seperti yang bisa Anda tebak, dia menerapkan perilaku yang reaktif di DOM yang sudah di-_render_. Ibarat kata, "Jaga atribut `title` ini agar tetap mutakhir dengan properti `pesan` pada _instance_ yang aktif sekarang".

## Menangani Inputan Pengguna

Untuk memungkinkan pengguna berinteraksi dengan aplikasi Anda, kita dapat menggunakan _directive_ `v-on` untuk melampirkan _event listener_ yang menjalankan suatu fungsi/metode pada _instance_ Vue kita:

```html
<div id="event-handling">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Balikkan Pesan</button>
</div>
```

```js
const EventHandling = {
  data() {
    return {
      message: 'Halo Vue.js Indonesia!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message
        .split('')
        .reverse()
        .join('')
    }
  }
}

Vue.createApp(EventHandling).mount('#event-handling')
```

<common-codepen-snippet title="Penanganan Event" slug="dyoeGjW" />

Perlu diingat bahwa metode ini memperbarui _state_ aplikasi kita tanpa menyentuh DOM sama sekali - semua proses manipulasi DOM ditangani oleh Vue, dan kode yang Anda tulis hanya berfokus pada logika saja.

Vue juga menyediakan _directive_ `v-model` yang mampu melakukan _binding_ secara dua arah antara pengisian dengan _state_ pada aplikasi:

```html
<div id="two-way-binding">
  <p>{{ message }}</p>
  <input v-model="message" />
</div>
```

```js
const TwoWayBinding = {
  data() {
    return {
      message: 'Halo Vue.js Indonesia!'
    }
  }
}

Vue.createApp(TwoWayBinding).mount('#two-way-binding')
```

<common-codepen-snippet title="Binding Dua Arah" slug="poJVgZm" />

## Kondisi dan Perulangan

Sangat mudah untuk menerapkan pengondisian pada suatu elemen:

```html
<div id="conditional-rendering">
  <span v-if="seen">Sekarang Anda melihatku</span>
</div>
```

```js
const ConditionalRendering = {
  data() {
    return {
      seen: true
    }
  }
}

Vue.createApp(ConditionalRendering).mount('#conditional-rendering')
```

Contoh tersebut mendemonstrasikan bahwa tidak hanya teks dan atribut yang dapat kita _binding_, tetapi juga **struktur** dari DOM. Bahkan, Vue juga mampu menyediakan sistem [efek transisi](transitions-enterleave.md) yang lengkap ketika elemen ditambahkan/diperbarui/dihapus oleh Vue.

Anda dapat mengubah `seen` dari `true` menjadi `false` pada bak pasir berikut untuk melihat pengaruhnya:

<common-codepen-snippet title="Pengondisian Rendering" slug="oNXdbpB" tab="js,result" />

Ada beberapa _directive_ yang lain, setiap _directive_ tersebut memiliki fungsinya sendiri. Sebagai contoh, _directive_ `v-for` dapat digunakan untuk menampilkan daftar item yang didapatkan dari data array:

```html
<div id="list-rendering">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
const ListRendering = {
  data() {
    return {
      todos: [
        { text: 'Belajar JavaScript' },
        { text: 'Belajar Vue' },
        { text: 'Membangun hal keren' }
      ]
    }
  }
}

Vue.createApp(ListRendering).mount('#list-rendering')
```

<common-codepen-snippet title="List rendering" slug="mdJLVXq" />

## Penyusunan dengan Komponen

Sistem komponen merupakan konsep penting lainnya pada Vue, karena abstraksinya memungkinkan kita untuk membangun aplikasi skala besar yang terdiri dari komponen kecil, mandiri dan dapat digunakan kembali. Jika kita pikirkan lebih lanjut, hampir semua jenis antarmuka aplikasi dapat diabstraksikan menjadi diagram pohon komponen seperti berikut:

![Diagram Pohon Komponen](/images/components.png)

Di Vue, pada dasarnya, komponen adalah _instance_ Vue yang memiliki opsi yang telah dideklarasikan sebelumnya. Mendaftarkan komponen pada Vue sangatlah mudah: kita membuat objek komponen seperti yang kita lakukan pada objek `App` dan kita mendeklarasikannya pada opsi `components` induknya:

```js
// Membuat aplikasi Vue
const app = Vue.createApp(...)

// Mendefinisikan komponen baru bernama todo-item
app.component('todo-item', {
  template: `<li>Ini adalah todo</li>`
})

// Mount aplikasi Vue
app.mount(...)
```

Sekarang Anda dapat menggunakannya pada templat komponen lain:

```html
<ol>
  <!-- Membuat instance dari komponen item-pekerjaan -->
  <item-pekerjaan></item-pekerjaan>
</ol>
```

Tetapi contoh tersebut akan me-_render_ teks yang sama setiap item pekerjaan, yang tidak cukup menarik. Kita seharusnya dapat melewatkan data dari komponen _parent_ ke komponen _child_. Mari kita modifikasi definisi komponen tersebut agar dapat menerima [prop](component-basics.html#passing-data-to-child-components-with-props):

```js
app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})
```

Sekarang kita dapat menyematkan data pekerjaan pada masing-masing komponen menggunakan `v-bind`:

```html
<div id="todo-list-app">
  <ol>
    <!--
      Sekarang kita menyediakan setiap item-pekerjaan dengan objek
      pekerjaan yang diwakilinya, sehingga kontennya juga dapat dinamis.
      Kita juga perlu menyematkan "key" untuk setiap komponen,
      yang akan dijelaskan lebih lanjut nantinya.
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
const TodoList = {
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Sayur-sayuran' },
        { id: 1, text: 'Keju' },
        { id: 2, text: 'Makanan lain' }
      ]
    }
  }
}

const app = Vue.createApp(TodoList)

app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})

app.mount('#todo-list-app')
```

<common-codepen-snippet title="Pengenalan Komponen 1" slug="VwLxeEz" />

Aplikasi tersebut hanyalah sebuah contoh, tetapi kita dapat memisahkan aplikasi kita menjadi dua unit yang lebih kecil, dan komponen _child_ dipisahkan dari komponen _parent_ melalui penghubung _props_. Sekarang kita dapat memperbaiki komponen `<item-pekerjaan>` kita dengan templat dan logika yang kompleks tanpa mempengaruhi komponen _parent_.

Dalam aplikasi berskala besar, sangat penting untuk membagi seluruh aplikasi menjadi komponen untuk membuat proses pengembangan lebih mudah. Kita akan banyak membahas mengenai komponen [nanti di panduan berikut](component-basics.md), tetapi berikut adalah contoh (tak nyata) kode templat aplikasi yang menggunakan komponen:

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

### Hubungan dengan Elemen Kustom

Anda mungkin telah menyadari bahwa komponen Vue sangat mirip dengan **ELemen Kustom**, yang mana adalah bagian dari [Spesifikasi _Web Components_](https://www.w3.org/wiki/WebComponents/). Hal tersebut karena sintaks komponen Vue sangatlah fleksibel. Sebagai contoh, komponen Vue menerapkan [Slot API](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md) dan `is` merupakan atribut spesial. Bagaimanapun, terdapat beberapa perbedaan:

1. Spesifikasi _Web Components_ sudah final tetapi belum tersedia di semua peramban (_browser_) secara _native_. Safari 10.1+, Chrome 54+ dan Firefox 63+ sudah mendukung _web components_ secara _native_. Jika dibandingkan, komponen Vue berjalan secara konsisten di semua peramban (_browser_) yang didukung (kecuali Internet Explorer 11 - cek detailnya di [sini](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0038-vue3-ie11-support.md). Ketika dibutuhkan, komponen Vue juga dapat dibungkus ke dalam kustom elemen _native_.

[//]: # 'TODO: tambahkan pranala ke _build_ versi kompatibilitas'

2. Komponen Vue menyediakan fitur penting yang tidak dimiliki oleh elemen kustom murni, terutama pada aliran data lintas komponen, komunikasi _event_ kustom dan integrasi _build tool_.

Meskipun Vue tidak menggunakan elemen kustom secara internal, Vue memiliki [interoperabilitas yang sangat baik](https://custom-elements-everywhere.com/#vue) dalam hal mengonsumsi dan mendistribusikan sebagai elemen kustom. Vue CLI juga mendukung komponen Vue yang mendaftarkan dirinya sendiri sebagai elemen kustom secara _native_.

## Siap untuk Belajar Lebih Lanjut?

Kita telah memperkenalkan secara singkat fitur-fitur dasar yang ada di Vue.js - panduan ini akan mencakup sisanya dan fitur-fitur tingkat lanjut lebih dalam, jadi pastikan untuk membaca semuanya!