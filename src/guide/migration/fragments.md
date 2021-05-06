---
badges:
  - new
---

# Fragments <MigrationBadges :badges="$frontmatter.badges" />

## Gambaran Umum

Pada Vue versi 3, komponen memiliki dukungan resmi terhadap komponen _multi-root node_, atau dikenal sebagai _fragments_

## Sintaks Vue versi 2.x

Pada Vue versi 2.x, komponen _multi-root_ tidak didukung dan akan mengeluarkan sebuah peringatan ketika pengguna secara tidak sengaja membuat komponen tersebut. Untuk mengatasi masalah tersebut, banyak komponen yang dibungkus pada sebuah `<div>`.

```html
<!-- Layout.vue -->
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

## Sintaks Vue versi 3.x

Pada Vue versi 3.x, komponen dapat memiliki banyak _root node_. Namun, hal tersebut menuntut pengembang untuk menyatakan secara eksplisit di mana atribut harus didistribusikan.

```html
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

Untuk informasi lebih lanjut mengenai cara kerja pewarisan atribut, silahkan Anda membaca [Atribut Bukan Properti](/guide/component-attrs.html).
