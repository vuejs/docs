---
outline: deep
---

# Reaktivlik asoslari

:::tip API havola
Ushbu sahifa va qo'llanmaning keyingi boshqa boblarida Options API va Composition API uchun turli xil mazmunli ma'lumotlar mavjud. Siz uchun <span class="options-api">Options API</span><span class="composition-api">Composition API</span> tanlangan. Chap yon panelning yuqori qismidagi “API havola” kalitlari yordamida API turlarini almashtirishingiz mumkin.
:::

## Reaktiv holatlarni e'lon qilish

<div class="options-api">
Options API yordamida komponentning reaktiv holatlarini e'lon qilish uchun `data` metodidan foydalanamiz. Metod qaytaradigan qiymat obyekt bo'lishi kerak. Vue yangi komponent namunasini yaratishda metodni chaqiradi va qaytarilgan obyektni reaktivlik tizimiga o'giradi. Ushbu obyektning har qanday yuqori darajali xususiyatlari komponent bilan proksi-server orqali biriktiriladi (Metodlar va lifecycle hook scope-larda `this` (kontekst) orqali bu xususiyatlariga murojaat qilsa bo'ladi ):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` lifecycle hook haqida keyingi maqolalarda ma'lumot keltirilgan 
  mounted() {
    // bu yerda `this` yaratilgan komponentga yo'naltirilgan havola hisoblanadi.
    console.log(this.count) // => 1

    // `data`-dagi ma'lumotni ham o'zgartiradi
    this.count = 2
  }
}
```

[Sinab ko'ring](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gYG1vdW50ZWRgIGlzIGEgbGlmZWN5Y2xlIGhvb2sgd2hpY2ggd2Ugd2lsbCBleHBsYWluIGxhdGVyXG4gIG1vdW50ZWQoKSB7XG4gICAgLy8gYHRoaXNgIHJlZmVycyB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpIC8vID0+IDFcblxuICAgIC8vIGRhdGEgY2FuIGJlIG11dGF0ZWQgYXMgd2VsbFxuICAgIHRoaXMuY291bnQgPSAyXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIENvdW50IGlzOiB7eyBjb3VudCB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Ushbu komponent xususiyatlari faqat birinchi yaratilganda qo'shiladi, shuning uchun ularning barchasi `data` metodi tomonidan qaytarilgan obyektda mavjudligiga ishonch hosil qilishingiz kerak. Agar kerak bo'lsa, kerakli qiymat hali mavjud bo'lmagan xususiyatlar uchun `null`, `undefined` yoki boshqa to'ldiruvchi qiymatdan foydalaning.

Yangi xususiyatni to'g'ridan-to'g'ri `this` `data`(komponent namunasidagi reaktiv ma'lutmot)-ni, e'lon qilmasdan turib qo'shish mumkin. Biroq, shu tarzda qo'shilgan xususiyatlar reaktiv yangilanishlarni ishga tushira olmaydi.

Vue komponent namunasi orqali o‘zining o‘rnatilgan API-larini ishlatishda “$” prefiksidan foydalanadi. Shuningdek, u ichki xususiyatlar uchun `_` prefiksini ishlatadi. Ushbu belgilarning har biri bilan boshlanadigan yuqori darajadagi `data` xususiyatlari uchun shu prefiks bilan boshlangan nomlardan foydalanmaslik kerak.
```js{2-6}
export default {
  data() {
    return {
      name: 'foo,
      $name: 'bar', // Yaxshi emas
      _count: 'baz' // Xato
    }
  }
```
### Reaktiv Proxy va. Orginal \*

Vue 3 da ma'lumotlar [JavaScript proksi-server](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) yordamida reaktiv holatga keltiriladi. Vue 2 dan foydalangan foydalanuvchilar quyidagi cheklov holatlaridan xabardor bo'lishlari kerak:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```
`this.someObject` ni `newObject` ga tenglashtirganizdan so'ng, uning qiymati asl nusxaning, `newObject` ning reaktiv proksisi hisoblanadi. **Vue 2 dan farqli, original `newObject` butunligicha qoldiriladi va reaktiv bo'lib qolmaydi va doim e'tibor bering reaktiv xususiyatlarga `this` orqali murojaat qilishingiz kerak.**   

</div>

<div class="composition-api">

Biz [`reactive()`](/api/reactivity-core.html#reactive) funksiyasi bilan reaktiv obyekt va array yarata olamiz:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

Reaktiv obyektlar [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)-lar hisoblanadi va oddiy obyektlarga o'xshaydi. Farqi shundaki, Vue reaktiv obyektdan ma'lumot olishni va uni mutatsiyasini kuzata oladi. Agar siz tafsilotlarga qiziqsangiz, biz Vue reaktivlik tizimi qanday ishlashini [Reaktivlik chuqurroq](/guide/extras/reactivity-in-depth.html) maqolasida tushuntiramiz lekin, uni o‘qishni asosiy qo‘llanmani tugatgandan so‘ng tavsiya qilamiz.

Buni ham ko'ring: [Reaktivlikdan foydalanish](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

Komponent shablonida reaktiv holatni ishlatish uchun ularni komponentning `setup()` funksiyasi ichida e’lon qiling va uni qaytaring:

```js{5,9-11}
import { reactive } from 'vue'
export default {
  // `setup` composition API uchun maxsus hook.
  setup() {
    const state = reactive({ count: 0 })

    // reaktiv holat shablonda mavjud bo'lishi uchun qaytariladi
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```
Xuddi shunday, biz reaktiv holatni setup metodi doirasi(in scope)da oz'gartira oladigan funksiyani e'lon qilishimiz va u shablonda mavjud bo'lishi uchun holat bilan yonma-yon qilib qaytara olamiz.

```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // funksiyani ham qaytarishni unutmang.
    return {
      state,
      increment
    }
  }
}
```

Qaytarilgan metodlar odatda hodisa tinglovchilar(event listeners)i sifatida  ishlatiladi:

```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### `<script setup>` \*\*
`setup()` orqali holat va metodlarni qo'lda qaytraish ortiqcha ish bo'lishi mumkin. Yaxshiyamki, bu faqat qurilish bosqichi(build step)dan  foydalanmayotganda kerak bo'ladi. Yagona faylli komponentlardan (SFC) foydalanganda biz `<script setup>` yordamida foydalanishni ancha soddalashtira olamiz.

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

[Sinab ko'ring](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBzdGF0ZS5jb3VudCsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPlxuICAgIHt7IHN0YXRlLmNvdW50IH19XG4gIDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)
`<script setup>` da e'lon qilingan yuqori darajadagi importlar va o'zgaruvchilar avtomatik ravishda shu komponentga biriktiriladi va komponent shablonida ishlatilishi mumkin.

> Qo'llanmaning qolgan qismida biz asosan SFC + `<script setup>` sintaksisidan Composition API kod misollari uchun foydalanamiz, chunki bu Vue-dan foydalanadiganlar uchun eng keng tarqalgan sintaksis hisoblanadi.

</div>

<div class="options-api">

## Metod larni e'lon qilish \*

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Vue js metodlar - tekin darslik"/>

Komponent namunasiga metodlar qo'shish uchun biz `methods` opsiyasidan foydalanamiz. Bu kerakli metodlarni o'z ichiga olgan obyekt bo'lishi kerak:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // metodlar  lifecycle hook-larda, yoki boshqa metodlar ichida chaqirilishi mumkin!
    this.increment()
  }
}
```

Metodlar komponent namunasida mavjud bo'lishi uchun Vue avtomatik ravishda metodlarga `this` kontekstini biriktiradi. Bu metod event listener yoki callback sifatida ishlatilsa `this` to'g'ri qiymatni saqlab qolishni ta'minlaydi. Metodlarni e'lon qilayotganda strelka funksiyasidan foydalnamaslik kerak, chunki bu Vue ning `this` qiymatini bog'lashiga yo'l qo'ymaydi:

```js
export default {
  methods: {
    increment: () => {
      // NOTO'G'RI: `this` ga bu yerda murojaat qilib bo'lmaydi!
    }
  }
}
```

Komponent namunasining barcha boshqa xususiyatlari singari, `method`-larga komponent shablonida murojaat qilsa bo'ladi. Shablon ichida ular ko'pincha event listener sifatida ishlatiladi:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Sinab ko'ring](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Yuqoridagi misolda tugma bosilganda `increment` nomli metod chaqiriladi.

</div>

### DOM yangilash vaqti

Reaktiv holatni o'zgartirganingizda, DOM avtomatik ravishda yangilanadi.
Ammo shuni ta'kidlash kerakki, DOM yangilanishlari sinxron ravishda qo'llanilmaydi.
Buning o'rniga, Vue ularni keyingi yangilanish sikl(`next tick`)igacha buferda saqlaydi.  
Shu tufayli qancha holatni  o'zgartirgan bo'lishingizdan qat'iy nazar, har bir komponent faqat bir marta yangilanadi.

Holatlar o'zgargandan so'ng DOM yangilanishini kutish uchun [nextTick()](/api/general.html#nexttick) global API-dan foydalanishingiz mumkin:

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // bu yerda yangilangan DOM dan foydalanishingiz mumkin 
  })
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // bu yerda yangilangan DOM dan foydalanishingiz mumkin 
      })
    }
  }
}
```

</div>

### Reaktivlik chuqurroq

Vue-da holatlar azaldan chuqur reaktiv hisoblanadi. Bu shuni anglatadiki, siz ichki o'rnatilgan obyektlar yoki massivlarni mutatsiya qilinganda ham o'zgarishlar aniqlanishini kutishingiz mumkin:

<div class="options-api">

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // Kutilganidak ishlaydi.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

```js
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // Kutilganidak ishlaydi.
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

Reaktivlik holati chuqur bo'lmagan, faqatgina yuqori darajadagi xususiyatlari reaktiv bo'lgan [sayoz reaktiv obyekt](/api/reactivity-advanced.html#shallowreactive) yaratish imkoniyati ham mavjud, ammo bu murakkab ko'rinishdagi ishlar uchun qo'llaniladi.

<div class="composition-api">

### Reactive Proxy Obyekt va Asl Obyekt \*\*

Shuni ta'kidlash kerakki, `reactive()`-dan qaytarilgan obyekt asl nusxaning [Proksi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)-si hisoblanadi va u asl obyektga teng emas:

```js
const raw = {}
const proxy = reactive(raw)

// proxy obyekt uning asl nusxasiga teng emas.
console.log(proxy === raw) // false
```

Faqat proksi reaktivniy hisoblanadi va asl obyektni o'zgartirish yangilanishlarni ishga tushirmaydi. Shuning uchun, Vue reaktivlik tizimi bilan ishlashda eng yaxshi amaliyot **faqat proksi holatlardan foydalanish** hisoblanadi.

Bir xil obyekt bilan `reactive()` chaqiruvi har doim bir xil proksi obyektni qaytaradi va proksi obyekt bilan `reactive()` chaqiruvi ham o'sha proksi obyetkni qaytaradi:

```js
// Bir xil obyekt bilan reactive() chaqiruvi bir xil proksi obyektni chaqiradi
console.log(reactive(raw) === proxy) // true

// proxy obyekt bilan  reactive() chaqiruvi shu proxy obyektni uzini qaytaradi
console.log(reactive(proxy) === proxy) // true
```

Bu qoida ichki o'rnatilgan obyektlar uchun ham amal qiladi. Chuqur reaktivlik tufayli reaktiv obyekt ichidagi ichki o'rnatilgan obyektlar ham proksi obyekt hisoblanadi:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### `reactive()` cheklovlari \*\*

`reactive()` API da 2ta cheklov mavjud:

1. U faqat obyekt turlari uchun ishlaydi (obyektlar, massivlar,  [Kollekisya turlari](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) `Map` va `Set` kabi to'plam turlari). U `string`, `number` yoki `boolean` kabi turdagi ma'lumotlar bilan ishlay olmaydi.
2. Vue reaktivligini kuzatish obyekt xususiyatlaridan  foydalanayotganda vaqtda ishlaganligi sababli, biz har doim reaktiv obyektga bir xil havolani saqlashimiz kerak. Bu shuni anglatadiki, biz reaktiv obyektni osongina `almashtira olmaymiz`, chunki birinchi havola bilan reaktivlik aloqasi yo'qoladi:

   ```js
   let state = reactive({ count: 0 })
   // yuqoridagi havola ({ count: 0 }) endi kuzatilmaydi (reaktivlik aloqasi uzildi!)
   state = reactive({ count: 1 })
   ```
   Bundan tashqari, biz reaktiv obyektning xususiyatini boshqa o'zgaruvchilarga tenglaganimizda, destrukzatsiydan foydalanganimizda yoki bu xususiyatni funksiyaga argument sifatida berganimizda, biz reaktivlik aloqasini yo'qotamiz:

   ```js
   const state = reactive({ count: 0 })

   // n - uzilgan o'zgaruvchi
   // state.count dan.
   let n = state.count
   // state-ning count xususiyatini o'zgartirmaydi
   n++

   // count ham state.count dan uzilgan.
   let { count } = state
   // state-ning count xususiyatini o'zgartirmaydi
   count++

   // funksiya oddiy raqamni oladi va
   // state.count-dagi o'zgarishlarni kuzata olmaydi
   callSomeFunction(state.count)
   ```

## `ref()` bilan reaktiv o'zgaruvchilar\*\*

`Reactive()` cheklovlarini hal qilish uchun Vue shuningdek, [`ref()`](/api/reactivity-core.html#ref) funksiyasini taqdim etadi, bu bizga reaktiv **"refs"** yaratish imkonini beradi va unda har qanday qiymat turini saqlasa bo'ladi:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` argument oladi va uni `.value` xususiyatiga ega ref obyektiga o'ralgan holda qaytaradi:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

Buni ham ko'ring: [Refs typescript bilan](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

Reaktiv obyektning xususiyatlariga o'xshab, ref ning .value xususiyati reaktivdir. Bunga qo'shimcha ravishda, obyekt turlarini saqlaganda ref avtomatik ravishda uning `.value` qiymatini `reactive()` bilan o'zgartiradi.

Obyekt qiymatini o'z ichiga olgan ref butun obyektni reaktiv ravishda almashtira oladi:

```js
const objectRef = ref({ count: 0 })

// bu reaktiv ishlaydi
objectRef.value = { count: 1 }
```

Reflar reaktivlikni yo'qotmasdan funksiyalarga argument sifatida berilishi va destrukzatsiyadan foydalanishi mumkin:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// funksiya ref qabul qiladi
// u qiymatga .value orqali murojaat qilish kerak, lekin u
// reaktivlik aloqasini saqlab qoladi
callSomeFunction(obj.foo)

// hali ham reaktiv
const { foo, bar } = obj
```

Boshqacha qilib aytadigan bo'lsak, `ref()` har qanday qiymatga ega "ma'lumotlar" yaratish va uni reaktivlikni yo'qotmasdan saqlash imkonini beradi. Bu  juda muhim, chunki u [Composable Functions](/guide/reusability/composables.html)-ni ishlatishda tez-tez qo'llaniladi.

### Ref Unwrapping in Templates \*\*

Shablonda yuqori darajadagi xususiyatlarga murojaat qilinganda, ular avtomatik ravishda "ochiladi" va shuning uchun `.value` dan foydalanishga hojat qolmaydi. Mana oldingi hisoblagich misoli, uning oʻrniga `ref()` dan foydalanilgan:

```vue{13}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- .value dan foydalanishga hojat yo'q -->
  </button>
</template>
```

[Sinab ko'ring](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

E'tibor bering, ref ni shablonda avtomatik ochilishi yuqori darajadagi xususiyatlardagina amal qiladi. Misol tariqasida, `foo` yuqori darajadagi xususiyatdir, lekin `object.foo` emas.

Shunday qilib, quyidagi obyekt berilgan:

```js
const object = { foo: ref(1) }
```

Quyidagi ifoda kutilganidek ishlamaydi **NOT**:

```vue-html
{{ object.foo + 1 }}
```
Natija bu yerda `[object Object]` chunki `object.foo` ref obyekt. `foo` ni yuqori darajadagi xususiyatga aylantirish orqali buni tuzatishimiz mumkin:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

Endi  natija `2` bo'ladi.

Shuni ta'kidlash kerakki, agar shablonda matn interpolyatsiyasidan foydanlanilgan (ya'ni, <code v-pre>{{ }}</code> tegi) bo'lsa, ref lar avtomatik tarzda ochib chiqiladi, shuning uchun natija `1` ko'rinishiga ega bo'ladi. :

```vue-html
{{ object.foo }}
```

Bu shunchaki matn interpolyatsiyasining qulayligi va  u <code v-pre>{{ object.foo.value }}</code> ga teng.

### Reaktiv obyektlarda Ref ni ochilishi  \*\*

Reaktiv obyektning xususiyati sifatida `ref` ga murojaat qilganda yoki mutatsiya qilganda, u ham avtomatik ravishda ochiladi, shuning uchun u odatdagi xususiyat kabi ishlaydi:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```
Agar mavjud ref bilan bog'langan xususiyatga yangi ref tayinlangan bo'lsa, u eski ref o'rnini egallaydi:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref endi state.count dan uzilgan
console.log(count.value) // 1
```

Ref o'ramini ochish faqat chuqur reaktiv obyekt ichiga joylashtirilganida sodir bo'ladi. U [sayoz reaktiv obyekt](/api/reactivity-advanced.html#shallowreactive) xususiyat foydalanilganda qo‘llanilmaydi.

#### Massivlar va kollektsiyalarda o'ramni ochish

Reaktiv obyektlardan farqli, reaktiv massivning elementi yoki `Map` kabi to'plam turlariga murojaat qilinganda o'ramni avtomatik ochish amalga oshirilmaydi:

```js
const books = reactive([ref('Vue 3 Guide')])
// bu yerda .value kerak
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// bu yerda .value kerak
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Holatli Metodlar \*

Ba'zi hollarda  dinamik ravishda funksiya yaratishimiz kerak bo'lishi mumkin, masalan, debounce hodisasini yaratish:
```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Debounce Lodash bilan
    click: debounce(function () {
      // ... bosilgandan so'ng ...
    }, 500)
  }
}
```

Biroq, bu yondashuv qayta ishlatiladigan komponentlar uchun muammoli, chunki o'chirilgan funksiya **holatli**: u ba'zi ichki holatlarni o'zida saqlaydi. Agar bir nechta komponent namunalari bir xil debounce funksiyani ishlatsa, ular bir-biriga xalaqit beradi.
Har bir komponent misolining debounce funksiyasi boshqalardan mustaqil ravishda ishlashi uchun biz debounce versiyani `created` lifecycle hook-da yaratishimiz mumkin:

```js
export default {
  created() {
    // har bir komponent endi o'z debounce nusxasiga ega
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // komponent o'chirilganda 
    // taymerni bekor qilish ham yaxshi fikr
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... bosilgandan so'ng ...
    }
  }
}
```

</div>

<div class="composition-api">

## Reaktivlikni o'zgartirish <sup class="vt-badge experimental" /> \*\*

`.value`-dan foydalanish JavaScript-ning til cheklovlari tufayli yuzaga kelgan kamchilikdir. Biroq, kompilyatsiya vaqtini o'zgartirish bilan biz tegishli joylarda avtomatik ravishda `.value`-ni qo'shish orqali bu holatni yaxshilashimiz mumkin. Vue kompilyatsiya vaqtida o'zgartirishlar qila oladi va bu bizga oldingi "hisoblagich" misolini quyidagicha yozish imkonini beradi:

```vue
<script setup>
let count = $ref(0)

function increment() {
  // .value ni ishlatishga hojat yo'q
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

[Reaktivlikni o'zgartirish](/guide/extras/reactivity-transform.html) haqida uning maxsus boʻlimida koʻproq bilib olishingiz mumkin. E'tibor qarating, u hozircha tajribada va yakunlanishidan oldin oʻzgarishi mumkin.

</div>
