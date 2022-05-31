# Komponentlarni ro'yxatdan o'tkazish

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="Vue maktabida bepul video darsni tomosha qiling"/>

> Ushbu sahifada siz allaqachon [Komponentlar asoslarini](/guide/essentials/component-basics). o'qigan deb taxmin qiladi . Agar siz komponentlar uchun yangi bo'lsangiz, avval buni o'qing.

Vue komponenti shablonda uchraganida uni amalga oshirish joyini qaerdan bilishi uchun “roʻyxatdan oʻtgan” boʻlishi kerak. Komponentlarni ro'yxatdan o'tkazishning ikki yo'li mavjud: global va mahalliy.

## Global ro'yxatga olish

Biz komponentlarni `app.component()` usuli yordamida joriy [Vue ilovasida](/guide/essentials/application.html) global miqyosda mavjud qilishimiz mumkin:
```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // Ro'yxatdan o'tgan nom
  'MyComponent',
  // Amalga oshirish
  {
    /* ... */
  }
)
```

Agar SFC dan foydalansangiz, import qilingan `.vue` fayllarni ro'yxatdan o'tkazasiz:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

`app.component()` usuli zanjirlangan bo'lishi mumkin:

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

Global ro'yxatdan o'tgan komponentlar ushbu ilova ichidagi har qanday komponent shablonida ishlatilishi mumkin:

```vue-html
<!-- bu ilova ichidagi har qanday komponentda ishlaydi -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

Bu hatto barcha subkomponentlar uchun ham amal qiladi, ya'ni bu uchta komponent _bir-birining ichida_ ham mavjud bo'ladi .
## Mahalliy ro'yxatga olish

Global ro'yxatdan o'tish qulay bo'lsa-da, bir qator kamchiliklarga ega:

1. Global registr qurilish tizimlaridan foydalanilmagan komponentlarni ("daraxtning-silkinishi") olib tashlashni oldini oladi. Agar siz komponentni global miqyosda ro'yxatdan o'tkazsangiz, lekin uni ilovangizning biron bir joyida ishlatmasangiz, u hali ham yakuniy paketga kiritiladi.

2. Global ro'yxatga olish katta ilovalarda qaramlik munosabatlarini kamroq aniq qiladi. Bu asosiy komponentdan foydalanib, bola komponentining amalga oshirilishini aniqlashni qiyinlashtiradi. Bu juda ko'p global o'zgaruvchilardan foydalanish kabi uzoq muddatli barqarorlikka ta'sir qilishi mumkin.

Mahalliy ro'yxatga olish faqat joriy komponent bilan ro'yxatdan o'tgan komponentlar mavjudligini qamrab oladi. Bu qaramlik munosabatlarini yanada ochiqroq va ko'proq daraxtlarni silkituvchi qiladi.

<div class="composition-api">

SFC dan `<script setup>` bilan foydalanilganda import qilingan komponentlar roʻyxatdan oʻtmasdan mahalliy sifatida ishlatilishi mumkin:
```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

Agar `<script setup>` ishlatmasangiz `components` opsiyasidan foydalanishingiz kerak bo'ladi:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

Mahalliy ro'yxatga olish `components` opsiyasi yordamida amalga oshiriladi:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

`components` ob'ektidagi har bir xususiyat uchun kalit komponentning ro'yxatdan o'tgan nomi bo'ladi, qiymat esa komponentning amalga oshirilishini o'z ichiga oladi. Yuqoridagi misol ES2015 xususiyati stenografiyasidan foydalaniladi va quyidagilarga tengdir:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

E'tibor bering, **mahalliy ro'yxatdan o'tgan komponentlar nasl komponentlarida ham _mavjud emas_** . Bunday holda, `ComponentA` faqat joriy komponent uchun mavjud bo'ladi, uning har qanday bola yoki nasl komponentlari emas.
## Komponent nomi korpusi

Qo'llanma davomida biz komponentlarni ro'yxatdan o'tkazishda PascalCase nomlaridan foydalanamiz. Buning sababi:

1. PascalCase nomlari haqiqiy JavaScript identifikatorlaridir. Bu JavaScript-da komponentlarni import qilish va ro'yxatdan o'tkazishni osonlashtiradi. Shuningdek, u IDE-larga avtomatik to'ldirish bilan yordam beradi.

2. `<PascalCase />` bu shablonlardagi mahalliy HTML elementi o'rniga Vue komponenti ekanligini aniqroq qiladi. Shuningdek, u Vue komponentlarini maxsus elementlardan (veb komponentlar) ajratib turadi.

Bu SFC yoki string shablonlari bilan ishlashda tavsiya etilgan uslubdir. Biroq, [DOM shablonini tahlil qilish bo'yicha ogohlantirishlar](/guide/essentials/component-basics.html#dom-template-parsing-caveats) bo'limida muhokama qilinganidek , PascalCase teglari DOM shablonlarida ishlatilmaydi.

Yaxshiyamki, Vue PascalCase yordamida ro'yxatdan o'tgan komponentlarga kabob qutisi teglarini hal qilishni qo'llab-quvvatlaydi. Bu `MyComponent` sifatida ro`yxatdan o`tgan komponentga shablonda `<MyComponent>` va `<my-component>` orqali murojaat qilish mumkinligini anglatadi. Bu bizga shablon manbasidan qat'iy nazar bir xil JavaScript komponentining ro'yxatga olish kodidan foydalanish imkonini beradi.
