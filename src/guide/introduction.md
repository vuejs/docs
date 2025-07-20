---
footer: false
---

# Pendahuluan {#introduction}

:::info Anda sedang membaca dokumentasi untuk Vue 3!

- Dukungan Vue 2 telah berakhir pada **31 Desember, 2023**. Pelajari lebih lanjut tentang [Vue 2 EOL](https://v2.vuejs.org/eol/).
- Upgrade dari Vue 2? Silahkan cek [Panduan Migrasi](https://v3-migration.vuejs.org/).
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Pelajari Vue dengan tutorial video di <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Apa itu Vue? {#what-is-vue}

Vue (diucapkan /vjuː/, seperti **view**) merupakan kerangka kerja JavaScript untuk membangun antarmuka pengguna. Ini dibangun di atas standar HTML, CSS, dan JavaScript, serta menyediakan deklaratif, model pemrograman berbasis komponen yang membantu anda mengembangkan antarmuka pengguna dengan kompleksitas apapun secara efisien.

Berikut adalah contoh sederhananya:

<div class="options-api">

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

</div>
<div class="composition-api">

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

</div>

```vue-html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

**Hasil**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>

Pada contoh di atas menunjukkan dua fitur inti Vue:

- **Rendering Deklaratif**: Vue menjangkau HTML standar dengan sintaks templat yang memungkinkan kita untuk mendeskripsikan output HTML secara deklaratif berdasarkan state JavaScript.

- **Reaktivitas**: Vue secara otomatis melacak perubahan state JavaScript dan memperbarui DOM secara efisien ketika perubahan terjadi. 

Anda mungkin sudah memiliki pertanyaan - jangan khawatir. Kami akan membahas setiap detail kecil di sisa dokumentasi. Untuk saat ini, silakan baca terus agar Anda dapat memiliki pemahaman tingkat tinggi tentang apa yang ditawarkan oleh Vue.

:::tip Prasyarat
Jika Anda benar-benar baru dalam pengembangan frontend, mungkin bukan ide terbaik untuk langsung menggunakan framework sebagai langkah pertama Anda - pahami dasarnya lalu kembali lagi! Anda dapat memeriksa tingkat pengetahuan Anda dengan ikhtisar ini untuk [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript), [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) dan [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) jika diperlukan. Pengalaman sebelumnya dengan kerangka kerja lain dapat membantu, tetapi tidak diwajibkan.
:::

## Kerangka Kerja Progresif {#the-progressive-framework}

Vue adalah kerangka kerja dan ekosistem yang mencakup sebagian besar fitur umum yang dibutuhkan dalam pengembangan frontend. Namun web sangatlah beragam - hal-hal yang kita buat di web mungkin sangat bervariasi dalam bentuk dan skalanya. Dengan mengingat hal tersebut, Vue dirancang agar fleksibel dan dapat diadopsi secara bertahap. Tergantung pada kasus penggunaan Anda, Vue dapat digunakan dengan beragam cara:

- Meningkatkan HTML statis tanpa langkah pembuatan
- Penyematan sebagai Komponen Web di halaman mana pun
- Aplikasi Satu Halaman (SPA)
- Fullstack / Rendering Sisi Server (SSR)
- Jamstack / Pembuatan Situs Statis (SSG)
- Menargetkan desktop, ponsel seluler, WebGL, dan bahkan terminal

Jika Anda merasa konsep ini menakutkan, jangan khawatir! Tutorial dan panduan hanya membutuhkan pengetahuan dasar HTML dan JavaScript, serta Anda semestinya bisa mengikutinya tanpa menjadi ahli dalam hal ini.

Jika Anda adalah pengembang berpengalaman yang tertarik dengan cara terbaik mengintegrasikan Vue ke dalam stack Anda, atau Anda penasaran dengan arti istilah-istilah ini, kami membahasnya lebih detail dalam [Cara Menggunakan Vue](/guide/extras/ways-of-using-vue).

Meskipun fleksibel, pengetahuan inti tentang cara kerja Vue dibagikan ke semua kasus penggunaan ini. Bahkan jika Anda hanya seorang pemula saat ini, pengetahuan yang diperoleh selama perjalanan akan tetap berguna saat Anda tumbuh untuk mencapai tujuan yang lebih ambisius di masa depan. Jika Anda seorang veteran, Anda dapat memilih cara optimal untuk memanfaatkan Vue berdasarkan masalah yang ingin Anda selesaikan, sembari mempertahankan produktivitas yang sama. Inilah mengapa kami menyebut Vue "Kerangka Kerja Progresif": ini merupakan kerangka kerja yang dapat tumbuh bersama dan beradaptasi dengan kebutuhan Anda.

## Komponen File-Tunggal {#single-file-components}

Pada sebagian besar build-tool-enabled proyek Vue, kami membuat komponen Vue menggunakan format file seperti-HTML yang disebut **Komponen File-Tunggal** (juga dikenal sebagai file `*.vue`, disingkat menjadi **SFC**). Vue SFC, seperti namanya, merangkum logika komponen (JavaScript), templat (HTML), dan style (CSS) dalam satu file. Berikut contoh sebelumnya, ditulis dalam format SFC:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>

<!-- SFC is a defining feature of Vue and is the recommended way to author Vue components **if** your use case warrants a build setup. You can learn more about the [how and why of SFC](/guide/scaling-up/sfc) in its dedicated section - but for now, just know that Vue will handle all the build tools setup for you. -->

SFC adalah fitur yang mendefinisikan Vue dan merupakan cara yang direkomendasikan untuk menulis komponen Vue **jika** kasus penggunaan Anda memerlukan pengaturan build. Anda dapat mempelajari lebih lanjut tentang [bagaimana dan mengapa SFC](/guide/scaling-up/sfc) pada bagian khusus - namun untuk saat ini, ketahuilah bahwa Vue akan menangani semua pengaturan alat build untuk Anda.

## Gaya API {#api-styles}

Komponen Vue bisa dibuat dalam dua gaya API yang berbeda: **Opsi API** and **API Komposisi**.

### Opsi API {#options-api}

Dengan Opsi API, kami mendefinisikan logika komponen menggunakan objek dari opsi seperti `data`, `methods`, dan `mounted`. Properti yang ditentukan oleh opsi diekspos pada `this` di dalam fungsi, yang tertuju pada instansi komponen:

```vue
<script>
export default {
  // Properti yang dikembalikan dari data() menjadi state reaktif
  // dan akan dipaparkan pada `this`.
  data() {
    return {
      count: 0
    }
  },

  // Method adalah fungsi yang mengubah state dan memicu pembaruan.
  // Mereka dapat terikat sebagai event handler dalam templat.
  methods: {
    increment() {
      this.count++
    }
  },
  
  // Siklus hidup hooks dipanggil pada tahap yang berbeda
  // dari suatu siklus hidup komponen.
  // Fungsi ini akan dipanggil saat komponen terpasang.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Coba di Playground](https://play.vuejs.org/#eNptkMFqxCAQhl9lkB522ZL0HNKlpa/Qo4e1ZpLIGhUdl5bgu9es2eSyIMio833zO7NP56pbRNawNkivHJ25wV9nPUGHvYiaYOYGoK7Bo5CkbgiBBOFy2AkSh2N5APmeojePCkDaaKiBt1KnZUuv3Ky0PppMsyYAjYJgigu0oEGYDsirYUAP0WULhqVrQhptF5qHQhnpcUJD+wyQaSpUd/Xp9NysVY/yT2qE0dprIS/vsds5Mg9mNVbaDofL94jZpUgJXUKBCvAy76ZUXY53CTd5tfX2k7kgnJzOCXIF0P5EImvgQ2olr++cbRE4O3+t6JxvXj0ptXVpye1tvbFY+ge/NJZt)

### API Komposisi {#composition-api}

Dengan API Komposisi, kami mendefinisikan logika komponen menggunakan fungsi API yang diimpor. Dalam SFC, API Komposisi biasanya menggunakan [`<script setup>`](/api/sfc-script-setup). Atribut `setup` merupakan petunjuk yang membuat Vue melakukan transformasi waktu kompilasi yang memungkinkan kita menggunakan API Komposisi dengan sedikit boilerplate. Sebagai contoh, impor dan variabel tingkat-atas / fungsi dideklarasikan dalam `<script setup>` dapat langsung digunakan dalam templat.

Berikut adalah komponen yang sama, dengan templat yang sama persis, tetapi menggunakan API Komposisi dan `<script setup>` sebagai gantinya:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// State reaktif
const count = ref(0)

// Fungsi yang mengubah state dan memicu pembaruan
function increment() {
  count.value++
}

// Siklus hidup hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Coba di Playground](https://play.vuejs.org/#eNpNkMFqwzAQRH9lMYU4pNg9Bye09NxbjzrEVda2iLwS0spQjP69a+yYHnRYad7MaOfiw/tqSliciybqYDxDRE7+qsiM3gWGGQJ2r+DoyyVivEOGLrgRDkIdFCmqa1G0ms2EELllVKQdRQa9AHBZ+PLtuEm7RCKVd+ChZRjTQqwctHQHDqbvMUDyd7mKip4AGNIBRyQujzArgtW/mlqb8HRSlLcEazrUv9oiDM49xGGvXgp5uT5his5iZV1f3r4HFHvDprVbaxPhZf4XkKub/CDLaep1T7IhGRhHb6WoTADNT2KWpu/aGv24qGKvrIrr5+Z7hnneQnJu6hURvKl3ryL/ARrVkuI=)

### Mana yang Harus Dipilih? {#which-to-choose}

Kedua gaya API sepenuhnya mampu mencakup kasus penggunaan umum. Mereka adalah antarmuka berbeda yang didukung oleh sistem dasar yang sama persis. Faktanya, API Opsi diimplementasikan di atas API Komposisi! Konsep dasar dan pengetahuan tentang Vue digunakan bersama dalam kedua gaya tersebut.

API Opsi berpusat pada konsep "instance komponen" (`this` seperti yang terlihat pada contoh), yang biasanya lebih selaras dengan model mental berbasis kelas bagi pengguna yang berasal dari latar belakang bahasa OOP. Ini juga lebih ramah bagi pemula dengan mengabstraksikan detail reaktivitas dan menerapkan pengorganisasian kode melalui opsi grup.

API Komposisi berpusat pada deklarasi variabel state reaktif secara langsung dalam cakupan fungsi dan menggabungkan state dari beberapa fungsi yang bersama-sama untuk menangani kompleksitas. Bentuknya lebih bebas dan memerlukan pemahaman tentang cara kerja reaktivitas pada Vue agar dapat digunakan secara efektif. Fleksibilitasnya memungkinkan pola yang lebih kuat untuk mengatur dan menggunakan kembali logika.

Anda dapat mempelajari lebih lanjut tentang perbandingan antara kedua gaya dan potensi manfaat dari API Komposisi pada [Composition API FAQ](/guide/extras/composition-api-faq).

Jika Anda baru mengenal Vue, berikut rekomendasi kami secara umum:

- Untuk tujuan pembelajaran, pilihlah style yang menurut Anda lebih mudah dipahami. Sekali lagi, sebagian besar konsep inti dimiliki oleh kedua style tersebut. Anda selalu dapat mengambil style lainnya nanti.

- Untuk penggunaan produksi:

  - Gunakan Opsi API jika Anda tidak menggunakan alat build, atau berencana untuk menggunakan Vue terutama dalam skenario dengan kompleksitas-rendah, misalnya peningkatan progresif.

  - Gunakan API Komposisi + Komponen File-Tunggal jika Anda berencana untuk membangun aplikasi lengkap dengan Vue.

Anda tidak harus berkomitmen hanya pada satu style selama fase pembelajaran. Pada dokumentasi akan memberikan contoh kode dalam kedua style jika berlaku, dan Anda dapat beralih di antara keduanya kapan saja menggunakan **perubahan Preferensi API** pada bagian atas sisi kiri sidebar.

## Masih Ada Pertanyaan? {#still-got-questions}

Lihat [FAQ](/about/faq) kami.

## Pilih Jalur Pembelajaran Anda {#pick-your-learning-path}

Pengembang yang berbeda memiliki style belajar yang berbeda. Jangan ragu untuk memilih jalur pembelajaran yang sesuai dengan preferensi Anda - meskipun kami merekomendasikan untuk meninjau semua konten, jika memungkinkan!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Coba Tutorial</p>
    <p class="next-steps-caption">Untuk mereka yang lebih suka belajar secara langsung.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Baca Panduan</p>
    <p class="next-steps-caption">Panduan ini memandu Anda melalui setiap aspek kerangka kerja secara detail.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Lihat Contoh</p>
    <p class="next-steps-caption">Jelajahi contoh fitur inti dan tugas UI umum</p>
  </a>
</div>
