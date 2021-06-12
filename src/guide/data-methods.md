# Metode/Fungsi dan Properti Data

## Properti Data

<VideoLesson href="https://vueschool.io/lessons/methods-in-vue-3?friend=vuejs" title="Learn how to use methods on Vue School">Belajar cara menggunakan data dan method dari Video gratis milik Vueschool</VideoLesson>

## Data Properties

Properti `data` untuk komponen berbentuk fungsi. Vue memanggil fungsi ini sebagai bagian dari pembuatan _instance_ komponen baru. Properti ini harus mengembalikan nilai objek, yang kemudian Vue akan membungkusnya pada sistem reaktivitasnya dan menyimpan _instance_ komponen sebagai `$data`. Untuk kemudahan Anda, semua properti yang terletak pada level utama objek tersebut tersedia secara langsung melalui _instance_ komponen:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.$data.count) // => 4
console.log(vm.count)       // => 4

// Mengubah nilai vm.count juga akan mengubah $data.count
vm.count = 5
console.log(vm.$data.count) // => 5

// ... begitu juga sebaliknya
vm.$data.count = 6
console.log(vm.count) // => 6
```

Properti _instance_ ini hanya ditambahkan ketika _instance_ pertama kali dibuat, sehingga Anda perlu memastikan mereka tersedia pada hasil kembalian fungsi `data`. Jika dibutuhkan, gunakan `null`, `undefined` atau nilai _placeholder_ lainnya untuk properti yang nilainya belum tersedia.

Sangat memungkinkan untuk menambahkan properti secara langsung ke _instance_ komponen tanpa menambahkannya ke `data`. Namun, karena properti ini tidak tersedia sebagai objek `$data`, ia tidak akan terlacak secara otomatis oleh [sistem reaktivitas Vue](reactivity.html).

Vue menggunakan awalan `$` untuk menyediakan API bawaannya sendiri melalui _instance_ komponen. Vue juga menyimpan awalan `_` untuk properti internal. Anda harus menghindari menggunakan nama dengan awalan karakter tersebut untuk properti level atas `data`.

## Metode/Fungsi

Untuk menambahkan metode pada sebuah _instance_ komponen, kita menggunakan opsi komponen bernama `methods`. Opsi tersebut harus berupa objek yang berisi metode/fungsi yang dimaksud:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  },
  methods: {
    increment() {
      // `this` akan mengarah ke _instance_ komponen
      this.count++
    }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4

vm.increment()

console.log(vm.count) // => 5
```

Vue memasang `this` secara otomatis untuk `methods` sehingga ia selalu mengarah ke _instance_ komponen. Hal tersebut memastikan metode/fungsi mengarah ke nilai `this` yang tepat jika digunakan pada _event listener_ atau _callback_. Anda harus menghindari penggunaan _arrow functions_ ketika mendeklarasikan `methods`, karena hal tersebut dapat mencegah Vue memasang nilai `this` yang sesuai.

Seperti properti _instance_ komponen lainnya, `methods` dapat diakses di dalam templat komponen. Pada umumnya mereka digunakan sebagai _event listener_:

```html
<button @click="increment">Up vote</button>
```

Pada contoh di atas, metode/fungsi `increment` akan dipanggil ketika `<button>` diklik.

Selain itu, kita juga dapat memanggil metode/fungsi secara langsung melalui templat. Yang akan kita lihat sebentar lagi, pada umumnya akan lebih baik jika menggunakan [properti computed](computed.html) sebagai gantinya. Namun, menggunakan metode/fungsi dapat berguna pada kasus dimana properti _computed_ bukan merupakan opsi yang bijak. Anda dapat memanggil metode/fungsi dimanapun pada templat yang mendukung ekspresi JavaScript:

```html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

Jika metode/fungsi `toTitleDate` atau `formatDate` mengakses data reaktif apapun, ia akan dilacak sebagai dependensi pe-_render_-an, begitu juga jika ia digunakan di templat secara langsung.

Metode/fungsi yang dipanggil dari templat tidak boleh memiliki efek apapun, seperti mengubah data atau memicu proses asinkronus. Jika Anda ingin melakukan hal tersebut, Anda seharusnya menggunakan [_lifecycle hook_](instance.html#lifecycle-hooks) sebagai gantinya.

### _Debouncing_ dan _Throttling_

Vue tidak memiliki dukungan bawaan untuk _debouncing_ atau _throttling_ tetapi keduanya dapat diimplementasi menggunakan pustaka seperti [Lodash](https://lodash.com/).

Pada kasus ketika komponen digunakan sekali, _debouncing_ dapat diterapkan secara langsung di dalam `methods`:

```html
<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"></script>
<script>
  Vue.createApp({
    methods: {
      // _Debouncing_ menggunakan Lodash
      click: _.debounce(function() {
        // ... merespon klik ...
      }, 500)
    }
  }).mount('#app')
</script>
```

Bagaimanapun juga, pendekatan ini berpotensi memiliki masalah untuk komponen yang digunakan berkali-kali karena mereka berbagi fungsi _debounce_ yang sama. Untuk menjaga _instance_ komponen mandiri satu sama lain, kita dapat menambahkan fungsi _debounce_ pada _lifecycle hook_ `created`:

```js
app.component('save-button', {
  created() {
    // _Debouncing_ dengan Lodash
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // Batalkan penghitung waktu ketika komponen dihilangkan
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... merespon klik ...
    }
  },
  template: `
    <button @click="debouncedClick">
      Save
    </button>
  `
})
```
