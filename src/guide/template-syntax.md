# Sintaksis Templat

Vue.js menggunakan sintaksis templat yang berbasis HTML yang memungkinkan Anda menghubungkan DOM yang di-_render_ dengan data _instance_ komponen secara deklaratif. Semua templat Vue.js merupakan HTML yang valid dan dapat diterjemahkan oleh peramban (_browser_) dan _parser_ HTML yang sesuai spesifikasi.

Pada dasarnya, Vue mengompilasi templat menjadi fungsi _render_ DOM Virtual. Dikombinasikan dengan sistem reaktivitas, Vue mampu mencari tahu secara cerdas jumlah minimum komponen yang perlu di-_render_ ulang dan menerapkan manipulasi DOM secara minimal ketika _state_ aplikasi berubah.

Jika Anda terbiasa dengan konsep DOM Virtual dan lebih suka menggunakan JavaScript, Anda juga dapat [menulis fungsi _render_ secara langsung](render-function.html) sebagai pengganti templat, dengan pilihan dukungan JSX juga.

## Interpolasi

### Teks

Bentuk paling mendasar dari _binding_ data adalah interpolasi teks menggunakan sintaksis "Mustache" (kurung kurawal ganda):

```html
<span>Pesan: {{ msg }}</span>
```

Tag _mustache_ akan diganti dengan nilai properti `msg` yang berasal dari _instance_ komponen yang sesuai. Nilai tag _mustache_ juga akan dimutakhirkan kapanpun nilai properti `msg` berubah.

Anda juga dapat melakukan interpolasi syang hanya dijalankan sekali. Dan tidak akan dimutakhirkan ketika terjadi perubahan data menggunakan [direktif `v-once`](../api/directives.html#v-once), tetapi perlu diingat cara ini juga berdampak pada _binding_ lain pada _node_ yang sama.

```html
<span v-once>Msg tidak akan berubah jika nilai variabelnya berubah: {{ msg }}</span>
```

### HTML Raw

Tanda _mustaches_ menerjemahkan data sebagai teks biasa, bukan sebagai HTML. Untuk menampilkan HTML sebenarnya, Anda perlu menggunakan [direktif `v-html`](../api/directives.html#v-html):

```html
<p>Menggunakan tanda <em>mustaches</em>: {{ rawHtml }}</p>
<p>Menggunakan direktif v-html: <span v-html="rawHtml"></span></p>
```

<common-codepen-snippet title="Merender v-html" slug="yLNEJJM" :preview="false" />

Konten dari `span` akan diganti dengan nilai properti `rawHtml`, diterjemahkan sebagai HTML biasa - _binding_ data diabaikan. Perlu diingat bahwa Anda tidak dapat menggunakan `v-html` untuk membuat sebagian templat, karena Vue bukanlah mesin _templating_ berbasis string. Sebaliknya, komponen dianggap sebagai unit dasar dari antar muka pengguna (UI) untuk dapat digunakan kembali dan dikomposisi.

::: tip
Me-_render_ HTML yang berubah-ubah secara dinamis pada situs Anda sangat berbahaya karena hal tersebut dapat memicu [kerentanan XSS](https://en.wikipedia.org/wiki/Cross-site_scripting). Hanya gunakan interpolasi HTML pada konten terpecaya dan **jangan pernah** pada konten yang disediakan oleh pengguna.
:::

### Atribut

Tanda _mustache_ tidak dapat digunakan di dalam atribut HTML. Sebagai gantinya, gunakan [direktif `v-bind`](../api/directives.html#v-bind):

```html
<div v-bind:id="dynamicId"></div>
```

Jika nilai yang terhubung berupa `null` atau `undefined`, maka atribut tidak akan disertakan pada elemen yang di-_render_.

Pada kasus atribut bernilai boolean, dimana keberadaan nilainya berupa `true`, `v-bind` bekerja sedikit berbeda. Sebagai contoh:

```html
<button v-bind:disabled="isButtonDisabled">Tombol</button>
```

Atribut `disabled` akan disertakan jika `isButtonDisabled` memiliki nilai _truthy_. Atribut tersebut juga akan disertakan jika nilai nya string kosong, menjaga kekonsistesian dengan `<button disabled="">`. Untuk nilai _falsy_ lainnya, atribut tersebut akan dihilangkan.

### Menggunakan Ekspresi JavaScript

Sejauh ini kita hanya melakukan _binding_ ke properti sederhana di templat. Tetapi Vue.js sebenarnya juga mendukung fitur penuh ekspresi JavaScript di dalam semua _binding_ data:

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

Ekspresi akan dijalankan sebagai JavaScript pada cakupan _instance_ aktif sekarang. Batasannya adalah setiap _binding_ hanya boleh berisi **satu jenis ekspresi**, sehingga contoh berikut **tidak** akan bekerja:

```html
<!-- contoh kode berikut merupakan pernyataan, bukan ekspresi: -->
{{ var a = 1 }}

<!-- alur kontrol tidak akan bekerja juga, gunakan ekspresi ternary -->
{{ if (ok) { return message } }}
```

## Direktif

Direktif adalah atribut spesial dengan awalan `v-`. Nilai atribut direktif diharapkan menjadi **suatu ekspresi JavaScript** (dengan pengecualian untuk `v-for` dan `v-on`, yang akan didiskusikan nanti). Tugas direktif adalah menerapkan efek samping (_side effect_) secara reaktif ke DOM ketika nilai dari ekspresi berubah. Mari kita lihat contoh yang terdapat pada bagian perkenalan:

```html
<p v-if="seen">Sekarang Anda melihatku</p>
```

Pada contoh tersebut, direktif `v-if` akan menghapus/memasukkan elemen `<p>` berdasarkan kebenaran nilai ekspresi `seen`.

### Argumen

Beberapa direktif dapat menerima sebuah "argumen", ditulis sebagai titik dua setelah nama direktif. Sebagai contoh, direktif `v-bind` digunakan untuk memutakhirkan atribut HTML secara reaktif:

```html
<a v-bind:href="url"> ... </a>
```

Pada contoh tersebut, `href` adalah argumen, yang memberitahukan direktif `v-bind` untuk melakukan _binding_ atribut elemen `href` ke nilai ekspresi `url`.

Contoh lain adalah direktif `v-on`, yang akan menambahkan _listener_ ke _event_ DOM:

```html
<a v-on:click="doSomething"> ... </a>
```

Pada contoh tersebut, argumen adalah nama _event_ yang di-_listen_. Kita juga akan membahas mengenai penanganan _event_ lebih dalam.

### Argumen Dinamis

Memungkinkan juga untuk menggunakan ekspresi JavaScript pada argumen direktif dengan cara membungkusnya dengan kurung siku:

```html
<!--
Mohon diingat bahwa ada beberapa batasan untuk ekspresi argumen, seperti yang dijelaskan
pada bagian "Batasan Ekspresi Argumen Dinamis" di bawah ini.
-->
<a v-bind:[attributeName]="url"> ... </a>
```

Pada contoh tersebut, `attributeName` akan diterjemahkan sebagai ekspresi JavaScript, dan nilai terjemahannya akan digunakan sebagai nilai final untuk argumen. Sebagai contoh, jika _instance_ komponen Anda memiliki properti data, `attributeName`, yang memiliki nilai `"href"`, maka _binding_ ini akan sama seperti `v-bind:href`.

Demikian pula, jika Anda menggunakan argumen dinamis untuk melakukan _binding_ penanganan untuk nama _event_ dinamis:

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

Pada contoh tersebut, ketika `eventName` bernilai `"focus"`, maka `v-on:[eventName]` akan sama seperti `v-on:focus`.

### _Modifier_

_Modifier_ adalah akhiran spesial ditulis sebagai titik setelah nama argumen direktif. Modifier menunjukkan sebuah direktif harus dihubungkan dengan cara tertentu. Sebagai contoh _modifier_ `.prevent` memberitahu direktif `v-on` untuk memanggil `event.preventDefault()` pada _event_ yang terpicu:

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

Anda akan melihat contoh _modifier_ lain nantinya, [untuk `v-on`](events.md#event-modifiers) dan [untuk `v-model`](forms.md#modifiers), ketika kita menjelajahi fitur-fitur tersebut.

## Singkatan

Awalan `v-` berfungsi sebagai isyarat visual untuk mengidentifikasi atribut sepesifik Vue pada templat Anda. Cara tersebut berguna ketika Anda menggunakan Vue.js untuk menerapkan perilaku dinamis pada markah yang ada, tetapi dapat terasa bertele-tele untuk beberapa direktif yang sering digunakan. Pada saat yang sama, kebutuhan untuk awalan `v-` menjadi tidak terlalu penting ketika Anda membangun [SPA](https://en.wikipedia.org/wiki/Single-page_application), dimana Vue mengatur setiap templat. Sehingga, Vue menyediakan singkatan spesial untuk dua direktif yang paling sering digunakan, `v-bind` dan `v-on`:

### Singkatan `v-bind`

```html
<!-- sintaksis penuh -->
<a v-bind:href="url"> ... </a>

<!-- singkatan -->
<a :href="url"> ... </a>

<!-- singkatan dengan argumen dinamis -->
<a :[key]="url"> ... </a>
```

### Singkatan `v-on`

```html
<!-- sintaksis penuh -->
<a v-on:click="doSomething"> ... </a>

<!-- singkatan -->
<a @click="doSomething"> ... </a>

<!-- singkatan dengan argumen dinamis -->
<a @[event]="doSomething"> ... </a>
```

Cara tersebut mungkin terlihat berbeda dari HTML pada umumnya, tetapi `:` dan `@` adalah karakter valid untuk nama atribut dan peramban yang didukung oleh Vue dapat menerjemahkannya secara benar. Selain itu, mereka tidak akan muncul pada markah final yang ter-_render_. Sintaksis singkatan sangat opsional, tetapi Anda akan mengapresiasinya ketika Anda mempelajari mengenai penggunaannya nanti.

> Dari halaman selanjutnya hingga seterusnya, kita akan menggunakan singkatan pada contoh kita, karena hal tersebut merupakan penggunaan yang paling umum untuk pengembang Vue.

### Peringatan

#### Batasan Nilai Argumen Dinamis

Argumen dinamis diharapkan diterjemahkan sebagai string, dengan pengecualian nilai `null`. Nilai spesial `null` dapat digunakan untuk menghilangkan _binding_ secara jelas. Nilai bukan string lainnya akan memicu peringatan.

#### Batasan Ekspresi Argumen Dinamis

Ekspresi argumen dinamis memiliki batasan sintaksi karena karakter tertentu, seperti spasi dan tanda kutip, tidak valid di dalam nama atribut HTML. Sebagai contoh, contoh kode berikut tidaklah valid:

```html
<!-- Contoh kode berikut akan memicu peringatan kompilator. -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

Kita merekomendasikan mengganti ekspresi kompleks apapun dengan [properti _computed_](computed.html), salah satu dasar Vue, yang akan kita bahas dalam waktu dekat.

Ketika menggunakan templat di dalam DOM (templat yang secara langsung ditulis pada berkas HTML), Anda juga harus menghindari penamaan kunci dengan karakter huruf besar, karena peramban (_browser_) akan memaksa nama atribut menjadi huruf kecil:

```html
<!--
Contoh kode berikut akan diubah menjadi v-bind:[someattr] pada templat di dalam DOM.
Kecuali jika Anda memiliki properti "someattr" pada _instance_ Anda, kode Anda tidak akan bekerja.
-->
<a v-bind:[someAttr]="value"> ... </a>
```

#### Ekspresi JavaScript

Ekspresi templat dijalankan di dalam _sandbox_ dan hanya dapat mengakses  [beberapa daftar global](https://github.com/vuejs/vue-next/blob/master/packages/shared/src/globalsWhitelist.ts#L3) seperti `Math` dan `Date`. Anda tidak boleh mencoba mengakses _global_ yang didefinisikan oleh pengembang sendiri pada ekspresi templat.

