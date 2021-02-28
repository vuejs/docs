# Instalasi

Vue.js secara desain dibangun untuk dapat diadopsi secara bertahap. Hal tersebut berarti Vue dapat diintegrasi menjadi sebuah proyek dengan banyak cara tergantung dari persyaratannya.

Ada tiga cara utama untuk menambahkan Vue.js ke dalam suatu proyek:

1. Mengimpor Vue sebagai [paket CDN](#cdn) di dalam halaman
2. Memasang Vue menggunakan [npm](#npm)
3. Menggunakan [Antarmuka Perintah Sebaris](#cli) untuk membangun proyek, yang menyediakan susunan lengkap untuk alur kerja frontend modern (contohnya: hot-reload, lint-saat-disimpan, dan masih banyak lagi)

## Catatan Rilis

Versi terakhir: ![npm](https://img.shields.io/npm/v/vue/next.svg)

Catatan rilis yang detail untuk setiap versi terdapat pada [GitHub](https://github.com/vuejs/vue-next/blob/master/CHANGELOG.md).

## Vue Devtools

> Saat ini pada tahap Beta - Integrasi VueX dan Router masih dalam proses pengerjaan

Ketika menggunakan Vue, kami merekomendasikan juga untuk memasang [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) pada peramban Anda, yang memungkinkan Anda untuk menginspeksi dan mendebug aplikasi Vue dengan antarmuka yang lebih ramah pengguna.

[Dapatkan Ekstensi Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

[Dapatkan Addon Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

[Dapatkan Aplikasi Elektron](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

## CDN

Untuk tujuan pembuatan prototipe atau pembelajaran, Anda dapat menggunakan versi terakhir dengan:

```html
<script src="https://unpkg.com/vue@next"></script>
```

Untuk produksi, kami merekomendasikan untuk menggunakan versi angka spesifik dan _build_ tertentu untuk mencegah kerusakan pada versi terbaru.

## npm

npm adalah metode pemasangan yang direkomendasikan ketika membangun aplikasi skala besar dengan Vue. npm berpasangan dengan baik dengan _bundler_ modul seperti [Webpack](https://webpack.js.org/) atau [Rollup](https://rollupjs.org/). Vue juga menyediakan peralatan pendukung untuk membuat [Komponen Berkas Tunggal](../guide/single-file-component.html).

```bash
# versi stabil terakhir
$ npm install vue@next
```

## CLI

Vue menyediakan [Antarmuka Perintah Sebaris (CLI) Resmi](https://github.com/vuejs/vue-cli) untuk perancah cepat Aplikasi Laman Tunggal (_Single Page Applications_). Vue CLI menyediakan alur kerja _frontend_ modern yang lengkap. Hanya membutuhkan beberapa menit untuk bangun dan berjalan dengan _hot-reload_, _lint-ketika-berkas-disimpan_, _build_ siap-produksi. Lihat [dokumentasi Vue CLI](https://cli.vuejs.org) untuk lebih detail.

:::tip
CLI mengasumsikan pengetahuan sebelumnya tentang Node.js dan alat pembangun terkait. Jika Anda baru dalam Vue atau perangkat pembangun _front-end_, kami sangat menyarankan pergi ke [petunjuk](./introduction.html) tanpa perangkat pembangun apapun sebelum menggunakan CLI.
:::

Untuk Vue 3, Anda harus menggunakan Vue CLI v4.5 yang tersedia di `npm` sebagai `@vue/cli`. Untuk memutakhirkan, Anda perlu memasang ulang versi terakhir dari `@vue/cli` secara global:

```bash
yarn global add @vue/cli
# Atau
npm install -g @vue/cli
```

Kemudian di proyek Vue, jalankan

```bash
vue upgrade --next
```

## Vite

[Vite](https://github.com/vitejs/vite) adalah perangkat pembangunan web yang memungkinkan menyediakan kode secara cepat karena pendekatan modul ES asli.

Proyek Vue dapat diatur secara cepat dengan Vite dengan menjalankan perintah berikut di terminal Anda.

Dengan npm:

```bash
$ npm init @vitejs/app <nama-proyek>
$ cd <nama-proyek>
$ npm install
$ npm run dev
```

Atau dengan Yarn:

```bash
$ yarn create @vitejs/app <nama-proyek>
$ cd <nama-proyek>
$ yarn
$ yarn dev
```

Mungkin terjadi, ketika nama pengguna Anda memiliki spasi di dalamnya seperti 'Mike Baker' yang Vite tidak dapat lakukan. Coba lakukan dengan cara

```bash
$ create-vite-app <nama-proyek>
```

## Penjelasan dari Berbagai _Build_

Di dalam [direktori `dist/` dari paket npm](https://cdn.jsdelivr.net/npm/vue@3.0.2/dist/), Anda dapat menemukan beberapa _build_ berbeda dari Vue.js. Berikut gambaran berkas `dist` yang mana yang harus digunakan berdasarkan studi kasus yang Anda miliki.

### Dari CDN atau tanpa _Bundler_

#### `vue(.runtime).global(.prod).js`:

- Untuk akses secara langsung melalui `<script src="...">` di peramban (_browser_), menyediakan Vue secara global.
- Kompilasi templat di-peramban:
  - `vue.global.js` adalah _build_ "penuh" yang menyertakan kompilator dan _runtime_ secara bersamaan sehingga mendukung kompilasi templat secara langsung.
  - `vue.runtime.global.js` hanya berisi _runtime_ dan membutuhkan templat untuk pra-terkompilasi selama tahap _build_.
- Menyatukan semua paket internal inti Vue - sebagai contoh: berkas tunggal tanpa dependensi apapun dengan berkas lain. Hal tersebut berarti Anda harus mengimpor semua hal dari berkas ini dan berkas ini hanya memastikan Anda mendapatkan _instance_ kode yang sama.
- Berisi berkas lingkungan prod/dev yang _hard-coded_, dan _build_ produksi terminifikasi. Gunakan berkas `*.prod.js` untuk tujuan produksi.

:::tip Catatan
_Build_ global bukanlah _build_ [UMD](https://github.com/umdjs/umd). Mereka di-_build_ sebagai [IIFEs](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) dan hanya dimaksudkan untuk digunakan secara langsung melalui `<script src="...">`.
:::

#### vue(.runtime).esm-browser(.prod).js:

- Untuk digunakan melalui impor modul ES asli (di peramban (_browser_) melalui `<script type="module">`).
- Memiliki kompilasi _runtime_, dependensi yang disatukan dan perilaku prod/dev yang sama seperti _build_ global.

### Dengan _Bundler_

#### vue(.runtime).esm-bundler.js:

- Untuk penggunaan dengan _bundlers_ seperti `webpack`, `rollup` dan `parcel`.
- Meninggalkan bagian prod/dev dengan `process.env.NODE_ENV guards` (harus diganti oleh _bundler_)
- Tidak menyediakan versi _build_ yang terminifikasi (akan dilakukan bersama bagian kode lainnya setelah proses _bundling_).
- Mengimpor dependensi (seperti `@vue/runtime-core`, `@vue/runtime-compiler`)
  - Dependensi yang terimpor juga _build_ versi _esm-buindler_ dan akan mengimpor dependensi mereka sendiri (seperti @vue/runtime-core mengimpor @vue/reactivity)
  - Hal tersebut berarti Anda **dapat** memasang/mengimpor dependensi tersebut sendiri-sendiri tanpa menghasilkan _instances_ yang berbeda dari dependensi ini, tetapi Anda harus meyakinkan mereka mengacu pada versi yang sama.
- Kompilasi templat di peramban (_browser_):
  - `vue.runtime.esm-bundler.js` **(bawaan)** hanyalah _runtime_, dan membutuhkan semua templat untuk terkompilasi dahulu. Berkas ini merupakan entri bawaan untuk _bundlers_ (melalui bagian modul di berkas `package.json`) karena ketika menggunakan _bundler_ templat pada umumnya terkompilasi dahulu (seperti pada berkas `*.vue`).
  - `vue.esm-bundler.js`: menyertakan kompilator _runtime_. Gunakan berkas ini jika Anda menggunakan _bundler_ tetapi ingin proses kompilasi templat saat _runtime_ (seperti templat di dalam DOM atau templat melalui string JavaScript). Anda perlu mengatur _bundler_ Anda untuk mengalias vue ke berkas ini.

### Untuk _Server-side Rendering_

#### `vue.cjs(.prod).js`:

- Untuk digunakan pada _server-side rendering_ Node.js melalui `require()`.
- Jika Anda mem-_bundle_ aplikasi Anda menggunakan webpack dengan `target: 'node'` dan dengan benar tidak menyertakan `vue`, berkas ini merupakan _build_ yang akan termuat.
- Berkas dev/prod ter-_build_ terlebih dahulu, tetapi berkas yang sesuai akan secara otomatis diimpor berdasarkan `process.env.NODE_ENV`.

## _Runtime_ + Kompilator vs. Hanya-_runtime_

Jika Anda perlu untuk mengompilasi templat di klien (seperti melewatkan string di opsi templat, atau _mounting_ ke elemen menggunakan HTML di-dalam-DOM sebagai templat), Anda akan memerlukan kompilator dan juga _bild_ versi penuh:

```js
// Kode ini membutuhkan kompilator (_compiler_)
Vue.createApp({
  template: '<div>{{ halo }}</div>'
})

// Kode ini tidak
Vue.createApp({
  render() {
    return Vue.h('div', {}, this.halo)
  }
})
```

Ketika menggunakan `vue-loader`, templat di dalam berkas `*.vue` terkompilasi terlebih dahulu menjadi JavaScript ketika proses _build_. Anda tidak membutuhkan kompilator pada _bundle_ akhir, dan oleh karena itu dapat menggunakan _build_ versi _runtime_ saja.
