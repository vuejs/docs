# Translasi dokumentasi Vue 3

Repositori berikut berisi translasi dokumentasi bahasa Indonesia Vue 3 (vue-next). Teman - teman dapat berkontibusi dalam repositori berikut. Rencana (Roadmap) translasi bisa dilihat dibawah halaman ini.

Situs dokumentasi Vue 3 berbahasa Inggris bisa diakses [disini](https://v3.vuejs.org/) untuk situs translasi bisa diakses [disini](https://v3-vuejsid-docs.netlify.app/)

## Tata cara berkontibusi

Untuk tata cara melakukan PR (Pull Request, cara berkontibusi ke dalam repositori) kita mengacu pada [komentar github berikut](https://github.com/mazipan/buku-saku-pramuka/pull/52#issuecomment-710839756) yang mana kita akan detailkan [disini untuk tata cara translasi dan menulis dokumentasi](https://v3.vuejs.org/guide/writing-guide.html), halaman tersebut belum di translasi dan akan ada pengubahan beberapa kalimat / aturan.

## Pengembangan Situs

1. Kloning repositori

```bash
git clone git@github.com:vuejs-id/docs-next.git
```

2. Install dependensi

```bash
yarn # or npm install
# proyek memakai yarn 1.x
```

3. Menjalankan situs pada komputer Anda

```bash
yarn serve # or npm run serve
```

Proyek ini memerlukan Node.js 12+

## Deployment

Situs akan otomatis diperbaharui saat ada _commit_ baru pada branch `indonesian`, melalui [Netlify](https://www.netlify.com/). Akun Netlify dimiliki oleh [@mandaputtra](https://github.com/mandaputtra).

## FAQ

### Kamus Perbendaharaan Istilah

Silakan lihat di halaman [Kamus Perbendaharaan Istilah](https://github.com/vuejs-id/docs/blob/master/GLOSARIUM.md)

### Roadmap

- [x] Sinkronasi dengan repositori _upstream_
- [ ] Bot [apresiasi kontributor](https://github.com/all-contributors/all-contributors-bot)
- [ ] Issue tracking halaman mana saja yang perlu di translasi
- [ ] Pasang [franc](https://github.com/wooorm/franc) untuk mempermudah monitoring translasi

### Bagaimana repo ini bisa sinkron dengan repo _upstream_

Kita menggunakan bot [wei/pull](https://github.com/wei/pull) dengan konfigurasi bisa dibaca [disini](https://github.com/vuejs-id/docs-next/blob/indonesian/.github/pull.yml). Kita tetap menyimpan dan mensinkronasi repo _upstream_ pada _branch master_ yang pada nantinya bisa digunakan sebagai referensi jika bot _wei/pull_ mengalami _merge conflict_ pada saat PR ke _branch indonesian_.

Jikalau ada masukan soal cara sinkronasi ini, kita dengan senang hati akan mengubahnya apabila solusi tersebut lebih baik.
