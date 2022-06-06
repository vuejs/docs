# Template Refs

Vue ning deklarativ renderlash modeli(template sintaksisi( `{}` ) orqali ma'lumotlarni DOMga chiqarish) siz uchun DOM ning to'g'ridan-to'g'ri bajariladigan ko'p operatsiyalarini(Masalan, `document.querySelector()`) qisqartirib bergan bo'lsa-da, DOM 


```vue-html
<input ref="input">
```

`ref` - `key` atributiga o'xshagan maxsus atribut bo'lib, bu `v-for` bo'limida muhokama qilingan. Bu bizga DOM ning xos elementi yoki bola komponent namunasi(instance) `mounted` bo'lgandan keyin, to'g'ridan-to'g'ri aloqa yaratish imkonini beradi. Misol uchun, siz component `mount` bo'lganda `input` bilan bog'lanishni xohlasangiz yoki elementda yordamchi kutubxonani ishga tushirganingizda foydali bo'lishi mumkin.

## Ref dan foydalanish

<div class="composition-api">

Composition API bilan aloqa yaratish uchun, biz `ref` xuddi shu nom bilan e'lon qilishimiz kerak:
```vue
<script setup>
import { ref, onMounted } from 'vue'


// elementni bog'langan holda ushlash uchun ref e'lon qiling
// nom refning qiymati bilan mos bo'lishi shart
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

Agar siz `<script setup>`dan foydalanmayotgan bo'lsangiz, `setup()` funksiyasidan `ref` ni qaytarayotganingiz(return qilayotganingiz)ga e'tibor bering:

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</div>
<div class="options-api">

ref ning natijasi `this.$refs` orqali ko'rsatiladi:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>
Yodda tuting, siz `ref` ni faqatgina **komponent mounted bo'lgandan keyin** ishlata olasiz. Agar siz <span class="options-api">`$refs.input` ga</span><span class="composition-api">`input` ga</span> template expression ichida bog'lanishga harakat qilsangiz, birinchi render da uning qiymati `null` ga teng bo'ladi. 
Buning sababi element birinchi renderdan keyin mavjud emas!

<div class="composition-api">

If you are trying to watch the changes of a template ref, refning qiymati `null` bo'lgan holat uchun ta'rif berganingizga ishonch hosil qiling:
Agar siz template refning o'zgarishlarini kuzatishga harakat qilayotgan bo'lsangiz, 
```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // hali mounted bo'lmadi, yoki element unmounted bo'lgan (masalan, v-if tomonidan)
  }
})
```

Buni ham ko'ring: [Typing Template Refs](/guide/typescript/composition-api.html#typing-template-refs) <sup class="vt-badge ts" />

</div>

## `v-for` ichidagi Reflar

> v3.2.25 yoki undan yuqori versiyani talab qiladi

<div class="composition-api">

Qachonki `ref` `v-for` ichida ishlatilsa, shunga bog'langan ref mount bo'lgandan keyin, ichiga elementlar to'ldiriladigan, Array qiymatini o'z ichiga olishi kerak:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ID0gcmVmKFsxLCAyLCAzXSlcblxuY29uc3QgaXRlbVJlZnMgPSByZWYoW10pXG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIGFsZXJ0KGl0ZW1SZWZzLnZhbHVlLm1hcChpID0+IGkudGV4dENvbnRlbnQpKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtUmVmc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

Qachonki `ref` `v-for` ichida ishlatilsa, natija olinayotgan refning qiymati bir-biriga mos elementlarni o'z ichiga olgan arrayga teng bo'ladi:

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdDogWzEsIDIsIDNdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuJHJlZnMuaXRlbXMpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

Yodda saqlash kerakki, `ref array` ning tartibi `source array` nikidek bir xil bo'lishiga kafolat **bermaydi**.

## Funksiyali Reflar

String kaliti o'rniga `ref` atributi har bir komponent yangilanganda chaqiriladigan va element bilan bog'liqlikni qayerda saqlash to'g'risida to'liq moslashuvchanlikni beradigan funksiyaga ham bog'lanishi mumkin. Funksiya bog'langan elementni birinchi argument sifatida qabul qiladi:

```vue-html
<input :ref="(el) => { /* ref yoki property uchun el parametrini tayinlang */ }">
```

Yodda tuting biz dinamik bog'lanuvchi `:ref` ishlatyapmiz, shuning uchun ref nomli string o'rniga funksiyani uzatib yuboryapmiz. Element unmounted bo'lganda, argument `null` ga teng bo'ladi. Siz, albatta, inline funksiyaning o'rniga `method` ni ishlata olasiz.

## Komponentdagi ref

> Bu bo'lim [Komponentlar](/guide/essentials/component-basics) haqidagi bilimni o'z ichiga oladi. O'tkazib yuborishingiz va keyinroq qaytishingiz mumkin.

`ref` bola komponentda ham ishlatilishi mumkin. Bu holatda bog'langan ref komponent namunasi bo'ladi: 

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value <Child /> namunasini kutib turadi
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child <Child /> namunasini kutib turadi
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">Agar bola komponent Options API ishlatayotgan bo'lsa yoki `<script setup>` ishlatmasa, bog'langan</span><span class="options-api">Bog'langan</span> namuna bola komponentning `this` kalit so'zi bilan bir xil bo'ladi, shuningdek ota komponent bola komponentning har bir xususiyati(property) va metodlariga to'liq ulana oladi - foydalana oladi. Bu esa ota va bola komponent o'rtasidagi birgalikda amalga oshiriladigan chambarchas ma'lumotlarni yaratishni osonlashtiradi, shuning uchun ko'p holatlarda komponent reflar kerakli bo'lganda ishlatilishi kerak. Birinchi o'rinda standard xususiyatlar(props) va emit(bola komponentdan turib ota komponentga ta'sir qilish)dan foydalangan holda ota / bola o'zaro ta'sirlarini amalga oshirishga harakat qilishingiz kerak.

<div class="composition-api">

`<script setup>` ni **tabiiy holatda shaxsiy(by default private)** qilgan holatda foydalanayotgan komponentlar uchun istisno bor: bola komponent `defineExpose` `compiler` idan foydalanib umumiy interfeysni ochishni tanlamagunicha, ota komponent `<script setup>` dan foydalanayotgan bola komponentga bog'lanayotib bola komponentning hech narsaniga kira olmaydi - foydalana olmaydi:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

Ota component template reflar orqali shu komponent namunasini olganda, olingan namuna `{ a: number, b: number }` ko'rinishda bo'ladi (reflar normal namunadagidek avtomatik o'ralmagan holda bo'ladi).

Buni ham ko'ring: [Typing Component Template Refs](/guide/typescript/composition-api.html#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

`expose` varianti(option)dan bola namuna bog'lanish - ulanishni cheklash uchun foydalanish mumkin:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

Yuqoridagi misolda, a parent referencing this component via template ref will only be able to access `publicData` and `publicMethod`.
Ota shu komponentga template ref orqali bog'lanyapti va faqatgina `publicData` hamda `publicMethod` lardan foydalana oladi.
</div>
