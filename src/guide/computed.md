# Properti Terkomputasi (_Computed Properties_) dan _Watcher_

## Properti Terkomputasi (_Computed Property_)

Ekspresi di dalam templat sangat mudah, tetapi ekspresi tersebut bertujuan untuk operasi sederhana. Meletakkan logika kode yang terlalu kompleks pada templat dapat membuat mereka menjadi membengkak dan lebih susah untuk dirawat. Sebagai contoh, jika kita memiliki objek pada array bersarang:

<VideoLesson href="https://vueschool.io/lessons/computed-properties-in-vue-3?friend=vuejs" title="Belajar bagaimanakah caranya properti computed bekerja dengan Vue School</VideoLesson>
">Belajar bagaimanakah caranya properti _computed_ bekerja dengan Vue School</VideoLesson>

In-template expressions are very convenient, but they are meant for simple operations. Putting too much logic in your templates can make them bloated and hard to maintain. For example, if we have an object with a nested array:

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
})
```

Dan jika kita ingin untuk menampilkan pesan berbeda tergantung nilai `author` memiliki buku atau tidak

```html
<div id="computed-basics">
  <p>Has published books:</p>
  <span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
</div>
```

Pada tahap ini, templat tidak lagi sederhana dan deklaratif. Anda harus melihatnya beberapa waktu sebelum menyadari bahwa kode tersebut melakukan kalkulasi berdasarkan nilai `author.books`. Permasalahan tersebut menjadi lebih buruk jika Anda ingin menyertakan kalkulasi ini pada templat Anda lebih dari sekali.

Oleh karena itu untuk logika kode yang kompleks yang menyertakan data reaktif, Anda harus menggunakan **properti terkomputasi**.

### Contoh Sederhana

```html
<div id="computed-basics">
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // _getter_ terkomputasi
    publishedBooksMessage() {
      // `this` mengarah ke _instance_ vm
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}).mount('#computed-basics')
```

Hasilnya:

<common-codepen-snippet title="Contoh sederhana properti terkomputasi" slug="NWqzrjr" tab="js,result" :preview="false" />

Di sini kita telah mendeklarasikan properti terkomputasi `publishedBooksMessage`.

Coba mengubah nilai array `books` pada aplikasi `data` dan Anda akan melihat bagaimana `publishedBooksMessage` berubah juga.

Anda data memasang data ke properti terkomputasi pada templat seperti properti pada umumnya. Vue mengetahui `vm.publishedBooksMessage` bergantung pada `vm.author.books`, sehingga Vue akan memutakhirkan _binding_ yang bergantung pada `vm.publishedBooksMessage` ketika `vm.author.books` berubah. Dan bagian terbaiknya adalah kita telah membuat hubungan dependensi ini secara deklaratif: _getter_ fungsi terkomputasi tidak memiliki efek samping, yang membuatnya lebih mudah untuk diuji dan dipahami.

### Tembolok Properti Terkomputasi (Computed Cache) vs Metode/Fungsi

Anda mungkin menyadari kita dapat mendapatkan hasil serupa dengan memanggil metode/fungsi pada ekspresi:

```html
<p>{{ calculateBooksMessage() }}</p>
```

```js
// di dalam komponen
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
}
```

Sebagai ganti properti terkomputasi, kita dapat mendefinisikan fungsi yang sama sebagai metode/fungsi. Hasil akhirnya, dua pendekatan tersebut memang sama. Namun, perpedaannya adalah **properti terkomputasi akan disimpan sebagai tembolok (_cached_) pada dependensi reaktifnya.** Sebuah properti terkomputasi akan dijalankan kembali ketika dependensi reaktifnya berubah. Hal tersebut berarti selama `author.books` tidak berubah, akses berkali-kali pada properti terkomputasi `publishedBooksMessage` akan mengembalikan hasil komputasi sebelumnya tanpa menjalankan ulang fungsinya.

Karena hal tersebut, properti terkomputasi berikut tidak akan pernah dimutakhirkan, karena `Date.now()` bukan dependensi reaktif:

```js
computed: {
  now() {
    return Date.now()
  }
}
```

Sebagai perbandingan, sebuah pemanggilan metode/fungsi akan **selalu** dijalankan kapapun proses pe-_render_-an ulang terjadi.

Why do we need caching? Imagine we have an expensive computed property `list`, which requires looping through a huge array and doing a lot of computations. Then we may have other computed properties that in turn depend on `list`. Without caching, we would be executing `list`’s getter many more times than necessary! In cases where you do not want caching, use a `method` instead.

Mengapa kita membutuhkan tembolok (_caching_)? Bayangkan kita memiliki properti terkomputasi `list` yang kompleks, membutuhkan perulangan array yang besar dan melakukan perhitungan yang banyak. Kemudian kita mungkin memiliki properti terkomputasi yang lain yang bergantung pada `list`. Tanpa adanya tembolok (_caching_), kita akan menjalankan _getter_ `list` berkali-kali walaupun tidak perlu! Pada kasus dimana kita tidak membutuhkan tembolok (_caching_), gunakanlah `method`.

### _Setter_ Terkomputasi

Properti terkomputasi secara bawaan hanya memiliki _getter_, tetapi Anda juga dapat memberikan _setter_ ketika Anda membutuhkannya:

```js
// ...
computed: {
  fullName: {
    // getter
    get() {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set(newValue) {
      const names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

Sekarang ketika Anda menjalankan `vm.fullName = 'John Doe'`, _setter_ akan dipanggil dan `vm.firstName` dan `vm.lastName` akan dimutakhirkan.

## _Watchers_

While computed properties are more appropriate in most cases, there are times when a custom watcher is necessary. That's why Vue provides a more generic way to react to data changes through the `watch` option. This is most useful when you want to perform asynchronous or expensive operations in response to changing data.

Properti terkomputasi cocok untuk sebagian besar kasus, namun terkadang kita juga membutuhkan _watcher_ kustom. Itulah mengapa Vue menyediakan cara paling umum untuk bereaksi pada perubahan data melalui opsi `watch`. Hal ini akan berguna jika Anda ingin melakukan operasi asinkronus dan kompleks ketika merespon perubahan data.

Sebagai contoh:

```html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</div>
```

```html
<!-- Since there is already a rich ecosystem of ajax libraries    -->
<!-- and collections of general-purpose utility methods, Vue core -->
<!-- is able to remain small by not reinventing them. This also   -->
<!-- gives you the freedom to use what you're familiar with.      -->

<!-- Karena telah tersedia ekosistem kaya dari pustaka ajax -->
<!-- dan kumpulan metode/fungsi utilitas yang memiliki tujuan umum, inti Vue -->
<!-- tetap berukuran kecil dengan tidak membuatnya lagi. Hal tersebut juga -->
<!-- memberikan Anda kebebasan untuk menggunakan hal apapun yang Anda biasa. -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script>
  const watchExampleVM = Vue.createApp({
    data() {
      return {
        question: '',
        answer: 'Questions usually contain a question mark. ;-)'
      }
    },
    watch: {
      // kapapun pertanyaan berubah, fungsi ini akan dijalankan
      question(newQuestion, oldQuestion) {
        if (newQuestion.indexOf('?') > -1) {
          this.getAnswer()
        }
      }
    },
    methods: {
      getAnswer() {
        this.answer = 'Thinking...'
        axios
          .get('https://yesno.wtf/api')
          .then(response => {
            this.answer = response.data.answer
          })
          .catch(error => {
            this.answer = 'Error! Could not reach the API. ' + error
          })
      }
    }
  }).mount('#watch-example')
</script>
```

Hasilnya:

<common-codepen-snippet title="Watch basic example" slug="GRJGqXp" tab="result" :preview="false" />

In this case, using the `watch` option allows us to perform an asynchronous operation (accessing an API) and sets a condition for performing this operation. None of that would be possible with a computed property.

Dalam kasus ini, gunakan opsi `watch` memungkinkan kita untuk melakukan operasi asinkronus (mengakses API) dan

In addition to the `watch` option, you can also use the imperative [vm.$watch API](../api/instance-methods.html#watch).

### Properti Terkomputasi vs Properti _Watch_

Vue menyediakan cara yang lebih umum untuk mengamati dan bereaksi pada perubahan data pada _instance_ aktif sekarang: **properti watch**. Ketika Anda memiliki data yang perlu berubah berdasarkan data lain, sebaiknya jangan menggunakan `watch` secara berlebih juga - khususnya jika Anda dari latar belakang AngularJS. Bagaimanapun, pada umumnya lebih baik untuk menggunakan properti terkomputasi daripada _callback_ `watch` yang imperatif. Pertimbangkan contoh berikut:

```html
<div id="demo">{{ fullName }}</div>
```

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    }
  },
  watch: {
    firstName(val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName(val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
}).mount('#demo')
```

Kode di atas imperatif dan berulang. Bandingkan dengan versi properti terkomputasinya:

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar'
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}).mount('#demo')
```

Lebih baik, bukan?
