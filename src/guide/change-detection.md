# Peringatan Deteksi Perubahan di Vue 2

> Halaman ini hanya berlaku untuk Vue 2.x dan di bawahnya, dan mengasumsikan kamu telah membaca [Bagian Reaktivitas](reactivity.md). Silakan baca bagian itu dulu.

Karena keterbatasan pada JavaScript, ada beberapa jenis perubahan **yang tidak dapat dideteksi** oleh Vue. Namun, ada beberapa cara untuk mengakali untuk menjaga reaktivitas.

### Untuk Objek

Vue tidak dapat mendeteksi penambahan atau penghapusan properti. Karena Vue melakukan proses konversi pengambil/penyetel selama inisialisasi _instance_, properti harus ada di objek `data` agar Vue dapat mengubahnya dan membuatnya reaktif. Sebagai contoh:

```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` sekarang menjadi reaktif

vm.b = 2
// `vm.b` TIDAK reaktif
```

Vue tidak mengizinkan penambahan properti reaktif level root baru secara dinamis ke dalam _instance_ yang sudah dibuat. Namun, memungkinkan untuk menambahkan properti reaktif ke objek bersarang menggunakan metode `Vue.set(object, propertyName, value)`:

```js
Vue.set(vm.suatuObjek, 'b', 2)
```

Kamu juga dapat menggunakan metode _instance_ `vm.$set`, yang merupakan alias untuk `Vue.set` global:

```js
this.$set(this.suatuObjek, 'b', 2)
```

Terkadang kamu mungkin ingin menetapkan sejumlah properti ke objek yang sudah ada, misalnya menggunakan `Object.assign ()` atau `_.extend ()`. Namun, properti baru yang ditambahkan ke objek tidak akan memicu perubahan. Dalam kasus seperti itu, buat objek baru dengan properti dari objek asli dan objek _mixin_:

```js
// Daripada `Object.assign(this.suatuObjek, { a: 1, b: 2 })`
this.suatuObjek = Object.assign({}, this.suatuObjek, { a: 1, b: 2 })
```

### Untuk Array

Vue tidak dapat mendeteksi perubahan berikut pada sebuah array:

1. Ketika kamu langsung mengatur item dengan indeks, contoh: `vm.item[indeksItem] = nilaiBaru`
2. Ketika kamu mengubah panjang array, contoh: `vm.item.length = panjangBaru`

Sebagai contoh:

```js
var vm = new Vue({
  data: {
    item: ['a', 'b', 'c']
  }
})
vm.item[1] = 'x' // TIDAK reaktif
vm.item.length = 2 // TIDAK reaktif
```

Untuk mengatasi peringatan 1, kedua hal berikut ini akan melakukan hal yang sama seperti `vm.item[indeksItem] = nilaiBaru`, tetapi juga akan memicu pembaruan status dalam sistem reaktivitas:

```js
// Vue.set
Vue.set(vm.item, indeksItem, nilaiBaru)
```

```js
// Array.prototype.splice
vm.item.splice(indeksItem, 1, nilaiBaru)
```

Kamu juga dapat menggunakan metode _instance_ [`vm.$Set`](https://vuejs.org/v2/api/#vm-set), yang merupakan alias untuk `Vue.set` global:

```js
vm.$set(vm.item, indeksItem, nilaiBaru)
```

Untuk menangani peringatan 2, kamu dapat menggunakan `splice`:

```js
vm.item.splice(panjangBaru)
```

## Mendeklarasikan Properti-Properti Reaktif

Karena Vue tidak mengizinkan penambahan properti reaktif level root secara dinamis, kamu harus menginisialisasi _instance_ komponen dengan mendeklarasikan semua properti data reaktif level root di awal, bahkan dengan nilai kosong:

```js
var vm = new Vue({
  data: {
    //
    pesan: ''
  },
  template: '<div>{{ pesan }}</div>'
})
// set `pesan` nanti
vm.pesan = 'Halo!'
```

Jika kamu tidak mendeklarasikan `pesan` dalam opsi data, Vue akan memperingatkanmu bahwa fungsi render mencoba mengakses properti yang tidak ada.

Ada alasan teknis di balik pembatasan tersebut - ini menghilangkan kelas kasus tepi dalam sistem pelacakan ketergantungan (_dependency tracking system_), dan juga membuat _instance_ komponen bermain lebih baik dengan sistem pemeriksaan tipe. Namun ada juga pertimbangan penting dalam hal pemeliharaan kode: objek `data` seperti skema untuk status komponenmu. Mendeklarasikan semua properti reaktif di awal membuat kode komponen lebih mudah dipahami saat dikunjungi kembali nanti atau dibaca oleh pengembang lain.

## Async Update Queue

Jika kamu belum menyadarinya, Vue melakukan pembaruan DOM **secara asinkron**. Setiap kali perubahan data diamati, itu akan membuka antrian dan menyangga semua perubahan data yang terjadi pada _event loop_ yang sama. Jika _watcher_ yang sama dipicu beberapa kali, maka akan didorong ke antrean hanya sekali. De-duplikasi yang disangga ini penting untuk menghindari penghitungan yang tidak perlu dan manipulasi DOM. Kemudian, di _event loop_ berikutnya "_tick_", Vue membersihkan antrian dan melakukan pekerjaan yang sebenarnya. Secara internal Vue mencoba _native_ `Promise.then`,`MutationObserver`, dan `setImmediate` untuk antrian asinkron dan _fallback_ ke `setTimeout(fn, 0)`.

Misalnya, saat kamu menyetel `vm.suatuData = 'nilai baru'`, komponen tidak akan langsung dirender ulang. Ini akan diperbarui di "_tick_" berikutnya ketika antrian dibilas. Seringkali kita tidak perlu mempedulikan hal ini, tetapi ini bisa menjadi rumit ketika kamu ingin melakukan sesuatu yang bergantung pada status DOM pasca-pembaruan. Meskipun Vue.js umumnya mendorong pengembang untuk berpikir dengan cara "berdasarkan data" dan menghindari menyentuh DOM secara langsung, terkadang kamu mungkin perlu mengotori tanganmu. Untuk menunggu hingga Vue.js selesai memperbarui DOM setelah perubahan data, kamu dapat menggunakan `Vue.nextTick(callback)` segera setelah data diubah. _Callback_ akan dipanggil setelah DOM diperbarui. Sebagai contoh:

```html
<div id="contoh">{{ pesan }}</div>
```

```js
var vm = new Vue({
  el: '#contoh',
  data: {
    pesan: '123'
  }
})
vm.pesan = 'pesan baru' // ubah data
vm.$el.textContent === 'pesan baru' // salah
Vue.nextTick(function() {
  vm.$el.textContent === 'pesan baru' // benar
})
```

Ada juga metode _instance_ `vm.$nextTick()`, yang sangat berguna di dalam komponen, karena tidak memerlukan `Vue` global dan konteks`this` callbacknya akan otomatis terikat ke instance komponen saat ini:

```js
Vue.component('contoh', {
  template: '<span>{{ pesan }}</span>',
  data: function() {
    return {
      pesan: 'belum terubah'
    }
  },
  methods: {
    ubahPesan: function() {
      this.pesan = 'sudah terubah'
      console.log(this.$el.textContent) // => 'belum terubah'
      this.$nextTick(function() {
        console.log(this.$el.textContent) // => 'sudah terubah'
      })
    }
  }
})
```

Karena `$nextTick()` mengembalikan sebuah _promise_, kamu dapat mencapai hal yang sama seperti di atas menggunakan [ES2017 async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) sintaks:

```js
  methods: {
    ubahPesan: async function () {
      this.pesan = 'sudah terubah'
      console.log(this.$el.textContent) // => 'belum terubah'
      await this.$nextTick()
      console.log(this.$el.textContent) // => 'sudah terubah'
    }
  }
```
