---


badges:

- yeni

---


# Fragmanlar <MigrationBadges :badges="$frontmatter.badges" />

## Genel bakış

Vue 3’de komponentler artık çok sayıda kök noda, yani fragmana sahip olabilecek!

## 2.x Sentaksı

Versiyon 2.x’da, çok köklü komponentler desteklenmiyordu ve kullanıcı kaza eseri birden fazla kök oluşturduğunda bir uyarı mesajı gösteriliyordu. Sonuç olarak birçok komponent bu hata uyarısını engellemek için ekstra bir `<div>` içerisine yerleştiriliyordu.

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

## 3.x Sentaksı

Versiyon 3.x’de, komponentler birden fazla kök noda sahip olabilecek! Ancak bu durumda programcı komponent niteliklerinin nereye ait olduğunu açıkça belirtmesi gerekecek.

```html
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

Niteliklerin miras ilişkisi hakkında daha fazla bilgi için [Prop-Olmayan Nitelikler](/guide/component-attrs.html) yazısına göz atabilirsiniz.