# Proses Produksi

::: info
Sebagian besar tips di bawah ini diaktifkan secara bawaan jika Anda menggunakan [Vue CLI](https://cli.vuejs.org). Bagian ini cocok jika Anda membangun penyiapan dengan cara yang berbeda.
:::

## Menghidupkan Mode Produksi

Selama pengembangan, Vue menyediakan banyak peringatan untuk membantu Anda mengatasi galat dan kesalahan umum. Namun, peringatan ini menjadi tidak berguna dalam mode produksi dan akan memperbesar ukuran muatan aplikasi Anda. Selain itu, beberapa pemeriksaan peringatan ini memiliki waktu proses yang rendah dan dapat terelakkan saat [mode produksi](https://cli.vuejs.org/guide/mode-and-env.html#modes).

### Tanpa Alat Bangun

Jika Anda membangun langsung, yaitu menyertakan Vue melalui tag skrip tanpa alat bangun. Pastikan untuk mengecilkan versi produksi. Ini dapat melihat di [panduan Instalasi](/guide/installation.html#cdn).

### Dengan Alat Bangun

Ketika menggunakan alat Bangun seperti _Webpack_ atau _Browserify_, mode produksi akan ditentukan oleh `process.env.NODE_ENV` di dalam kode sumber Vue dan itu akan berada dalam mode pengembangan secara bawaan. Kedua alat bangun menyediakan cara untuk menimpa variabel ini agar mengaktifkan mode produksi Vue, dan peringatan akan dihilangkan oleh _minifiers_ selama proses membangun. Vue CLI memiliki pra-konfigurasi ini untuk Anda, tetapi akan bermanfaat jika mengetahui cara melakukannya:

#### Webpack

Di Webpack 4+, Anda dapat menggunakan opsi `mode`:

```js
module.exports = {
  mode: 'production'
}
```

#### Browserify

- Jalankan perintah _bundling_ Anda di berkas `NODE_ENV` lingkungan variabel menetapkan ke `"production"`. Ini memberikan `vueify` untuk menghindari memasukkan _hot-reload_ dan kode terkait pengembangan.

- Terapkan _global_ [envify](https://github.com/hughsk/envify) ubah ke bundel Anda. Ini memungkinkan _minifier_ untuk menghapus semua peringatan dalam kode sumber Vue yang membungkus dalam blok bersyarat di _env_ variabel. Sebagai contoh:

  ```bash
  NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m > build.js
  ```

- Atau, menggunakan [envify](https://github.com/hughsk/envify) dengan Gulp:

  ```js
  // Gunakan modul kustom envify untuk menentukan lingkungan variabel
  const envify = require('envify/custom')

  browserify(browserifyOptions)
    .transform(vueify)
    .transform(
      // Diperlukan untuk memproses berkas node_modules
      { global: true },
      envify({ NODE_ENV: 'production' })
    )
    .bundle()
  ```

- Atau, menggunakan [envify](https://github.com/hughsk/envify) dengan Grunt dan [grunt-browserify](https://github.com/jmreidy/grunt-browserify):

  ```js
  // Gunakan modul kustom envify untuk menentukan lingkungan variabel
  const envify = require('envify/custom')

  browserify: {
    dist: {
      options: {
        // Berfungsi untuk menyimpang dari urutan bawaan grunt-browserify
        configure: b =>
          b
            .transform('vueify')
            .transform(
              // Diperlukan untuk memproses berkas node_modules
              { global: true },
              envify({ NODE_ENV: 'production' })
            )
            .bundle()
      }
    }
  }
  ```

#### Rollup

Menggunakan [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace):

```js
const replace = require('@rollup/plugin-replace')

rollup({
  // ...
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    })
  ]
}).then(...)
```

## Templat Pra-Kompilasi

Ketika menggunakan di-DOM templat atau di-JavaScript templat untai, kompilasi _template-to-render-function_ dilakukan dengan cepat. Ini biasanya cukup cepat dalam banyak kasus, tetapi sebaiknya dihindari jika aplikasi Anda _performance-sensitive_.

Cara termudah untuk mengkompilasi templat menggunakan [Komponen Berkas-Tunggal](/guide/single-file-component.html) - penyiapan membangun secara otomatis dengan melakukan pra-kompilasi untuk Anda. Jadi kode yang dibangun berisi fungsi _render_ yang sudah dikompilasi, bukan untai templat mentah.

Jika Anda menggunakan _Webpack_, lebih suka memisahkan JavaScript dan berkas templat, kamu bisa menggunakan [vue-template-loader](https://github.com/ktsn/vue-template-loader), yang juga mengubah berkas templat menjadi fungsi _render_ JavaScript selama langkah membangun.

## Mengekstrak Komponen CSS

Ketika menggunakan _Komponen Berkas-Tunggal_, CSS di dalam komponen menggunakan secara dinamis `<style>` tag melalui JavaScript. Ini memiliki waktu proses yang kecil, dan jika Anda menggunakan _server-side rendering_ itu akan menyebabkan "perubahan konten tanpa gaya". Mengekstrak CSS di semua komponen ke dalam berkas yang sama akan menghindari masalah ini, dan juga menghasilkan _minifikasi_ dan _caching_ CSS yang lebih baik.

Lihat dokumentasi alat bangun masing-masing untuk melihat cara melakukannya:

- [Webpack + vue-loader](https://vue-loader.vuejs.org/en/configurations/extract-css.html) (templat _webpack_ `vue-cli` memiliki pra-konfigurasi ini)
- [Browserify + vueify](https://github.com/vuejs/vueify#css-extraction)
- [Rollup + rollup-plugin-vue](https://rollup-plugin-vue.vuejs.org/)

## Melacak Galat Waktu Proses

Jika galat waktu proses terjadi selama _render_ komponen, itu akan diteruskan ke _global_ `app.config.errorHandler` fungsi config jika sudah diatur. Mungkin ide yang baik untuk memanfaatkan proses ini dengan layanan _pelacakan-galat_ seperti [Sentry](https://sentry.io), yang menyediakan [integrasi resmi](https://sentry.io/for/vue/) untuk Vue.
