---
outline: deep
---

# Reaktivlik asoslari

:::tip API havola
Ushbu sahifa va qo'llanmaning keyingi boshqa boblarida Options API va Composition API uchun turli xil mazmunli ma'lumotlar mavjud. Siz uchun <span class="options-api">Options API</span><span class="composition-api">Composition API</span> tanlangan. Chap yon panelning yuqori qismidagi “API havola” kalitlari yordamida API turlarini almashtirishingiz mumkin.
:::

## Reaktiv holatlarni e'lon qilish

<div class="options-api">
Options API yordamida komponentning reaktiv holatlarini e'lon qilish uchun `data` metodidan foydalanamiz. Metod qaytaradigan qiymat obyekt bo'lishi kerak. Vue yangi komponent namunasini yaratishda metodni chaqiradi va qaytarilgan obyektni reaktivlik tizimiga o'giradi. Ushbu obyektning har qanday yuqori darajali xususiyatlari komponent bilan proksi-server orqali biriktiriladi (Metod lar va lifecycle hook scope larda `this` (kontekst) orqali bu xususiyatlariga murojaat qilsa bo'ladi ):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` lifecycle hook haqida keyingi maqolalarda ma'lumot keltirilgan 
  mounted() {
    // bu yerda `this` yaratilgan komponent ga yo'naltirilgan havola hisoblanadi.
    console.log(this.count) // => 1

    // `data` dagi ma'lumotni ham o'zgartiradi
    this.count = 2
  }
}
```

[Sinab ko'ring](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gYG1vdW50ZWRgIGlzIGEgbGlmZWN5Y2xlIGhvb2sgd2hpY2ggd2Ugd2lsbCBleHBsYWluIGxhdGVyXG4gIG1vdW50ZWQoKSB7XG4gICAgLy8gYHRoaXNgIHJlZmVycyB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpIC8vID0+IDFcblxuICAgIC8vIGRhdGEgY2FuIGJlIG11dGF0ZWQgYXMgd2VsbFxuICAgIHRoaXMuY291bnQgPSAyXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIENvdW50IGlzOiB7eyBjb3VudCB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Ushbu namuna xususiyatlari faqat birinchi yaratilganda qo'shiladi, shuning uchun ularning barchasi `data` metodi tomonidan qaytarilgan obyektda mavjudligiga ishonch hosil qilishingiz kerak. Agar kerak bo'lsa, kerakli qiymat hali mavjud bo'lmagan xususiyatlar uchun `null`, `undefined` yoki boshqa to'ldiruvchi qiymatdan foydalaning.

Yangi xususiyatni to'g'ridan-to'g'ri `this` (komponent namunasidagi reaktiv ma'lutmot), `data` ga e'lon qilmasdan turib qo'shish mumkin. Biroq, shu tarzda qo'shilgan xususiyatlar reaktiv yangilanishlarni ishga tushira olmaydi.

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
When you access `this.someObject` after assigning it, the value is a reactive proxy of the original `newObject`. **Unlike in Vue 2, the original `newObject` is left intact and will not be made reactive: make sure to always access reactive state as a property of `this`.**

</div>

<div class="composition-api">

Biz [`reactive()`](/api/reactivity-core.html#reactive) funksiyasi bilan reaktiv obyekt va array yarata olamiz:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

Reaktiv obyekt lar va [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) lar hisoblanadi va oddiy obyektlarga o'xshaydi. Farqi shundaki, Vue reaktiv obyektdan ma'lumot olishni va uni mutatsiyasini kuzata oladi. Agar siz tafsilotlarga qiziqsangiz, biz Vue reaktivlik tizimi qanday ishlashini [Reaktivlik chuqurroq](/guide/extras/reactivity-in-depth.html) maqolasida tushuntiramiz - lekin, asosiy qo‘llanmani tugatgandan so‘ng uni o‘qishni tavsiya qilamiz.

Buni ham ko'ring: [Reaktivlikdan foydalanish](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

Komponent shablonida reaktiv holatni ishlatish uchun ularni komponentning `setup()` funksiyasi ichida e’lon qiling va uni qaytaring:

```js{5,9-11}
import { reactive } from 'vue'

export default {
  // `setup` kompozitsiya API uchun maxsus hook.
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
Xuddi shunday, biz reaktiv holatni funksiya doirasida (in scope) oz'gartira oladigan funksiyani e'lon qilishimiz va u shablonda mavjud bo'lishi uchun holat bilan yonma-yon qilib qaytara olamiz. 

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

Qaytarilgan methodlar odatda hodisa tinglovchilari (event listeners) sifatida  ishlatiladi:

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
`<script setup>` da e'lon qilingan yuqori darajadagi importlar va o'zgaruvchilar avtomatik ravishda shu komponent shablonida ishlatilishi mumkin.

> Qo'llanmaning qolgan qismida biz asosan SFC + `<script setup>` sintaksisidan Composition API kod misollari uchun foydalanamiz, chunki bu Vue dan foydalanadiganlar uchun eng keng tarqalgan sintaksis hisoblanadi.

</div>

<div class="options-api">

## Metod larni e'lon qilish \*

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Vue js metod lar - tekin darslik"/>

Komponent namunasiga metod lar qo'shish uchun biz `methods` opsiyasidan foydalanamiz. Bu kerakli metod larni o'z ichiga olgan obyekt bo'lishi kerak:

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
    // metod lar  lifecycle hook larda, yoki boshqa metod lar ichida chaqirilishi mumkin!
    this.increment()
  }
}
```

Metod lar komponent namunasida mavjud bo'lishi uchun Vue avtomatik ravishda metod larga `this` kontekstini biriktiradi. Bu metod event listener yoki callback sifatida ishlatilsa `this` to'g'ri qiymatni saqlab qolishni ta'minlaydi. Metod larni e'lon qilayotganda strelka funksiyasidan foydalnamaslik kerak, chunki bu Vue ning `this` qiymatini bog'lashiga yo'l qo'ymaydi:

```js
export default {
  methods: {
    increment: () => {
      // NOTO'G'RI: `this` ga bu yerda murojaat qilib bo'lmaydi!
    }
  }
}
```

Komponent namunasining barcha boshqa property lari singari, `method` larga komponent shablonida murojaat qilsa bo'ladi. Shablon ichida ular ko'pincha event listener sifatida ishlatiladi:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Sinab ko'ring](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Yuqoridagi misolda tugma bosilganda `increment` nomli metod chaqiriladi.

</div>

### DOM yangilash vaqti

Reaktiv holatni o'zgartirganingizda, DOM avtomatik ravishda yangilanadi.
Ammo shuni ta'kidlash kerakki, DOM yangilanishlari sinxron ravishda qo'llanilmaydi.
Buning o'rniga, Vue ularni keyingi yangilanish sikligacha `next tick` buferda saqlaydi.  
Shu tufayli qancha holatni  o'zgartirgan bo'lishingizdan qat'iy nazar, har bir komponent faqat bir marta yangilanadi.

Holatlar o'zgargandan so'ng DOM ynagilanishini kutish uchun [nextTick()](/api/general.html#nexttick) global API dan foydalanishingiz mumkin:

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // yangilangan DOM dan foydalanishingiz mumkin 
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
        // yangilangan DOM dan foydalanishingiz mumkin 
      })
    }
  }
}
```

</div>

### Reaktivlik chuqurroq

Vue da holatlar azaldan chuqur reaktiv hisoblanadi. Bu shuni anglatadiki, siz ichki o'rnatilgan obyektlar yoki massivlarni mutatsiya qilganingizda ham o'zgarishlar aniqlanishini kutishingiz mumkin:

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
      // Kutilganidek ishlaydi.
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
  // Kutilganidek ishlaydi.
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

Reaktivlik holati chuqur bo'lmagan, faqatgina yuqori darajadagi propertylari reaktiv bo'lgan [sayoz reaktiv obyekt](/api/reactivity-advanced.html#shallowreactive) yaratish imkoniyati ham mavjud, ammo bu murakkab ko'rinishdagi ishlar uchun qo'llaniladi.

<div class="composition-api">

### Reactive Proxy vs. Original \*\*

Shuni ta'kidlash kerakki, `reactive()` dan qaytarilgan obyekt asl nusxaning [Proksi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) hisoblanadi va u asl ob'ektga teng emas:

```js
const raw = {}
const proxy = reactive(raw)

// proxy obyekt uning asl nusxasiga teng emas.
console.log(proxy === raw) // false
```

Faqat proksi reaktivniy hisoblanadi va asl obyektni o'zgartirish yangilanishlarni ishga tushirmaydi. Shuning uchun, Vue reaktivlik tizimi bilan ishlashda eng yaxshi amaliyot **faqat proksi holatlradan foydalanish** hisoblanadi.

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
2. Vue reaktivligini kuzatish mulkka kirishda ishlaganligi sababli, biz har doim reaktiv ob'ektga bir xil havolani saqlashimiz kerak. Bu shuni anglatadiki, biz reaktiv ob'ektni osongina "almashtira olmaymiz", chunki birinchi havola bilan reaktivlik aloqasi yo'qoladi:
3. Since Vue's reactivity tracking works over property access, we must always keep the same reference to the reactive object. This means we can't easily "replace" a reactive object because the reactivity connection to the first reference is lost:

   ```js
   let state = reactive({ count: 0 })

   // the above reference ({ count: 0 }) is no longer being tracked (reactivity connection is lost!)
   state = reactive({ count: 1 })
   ```

   It also means that when we assign or destructure a reactive object's property into local variables, or when we pass that property into a function, we will lose the reactivity connection:

   ```js
   const state = reactive({ count: 0 })

   // n is a local variable that is disconnected
   // from state.count.
   let n = state.count
   // does not affect original state
   n++

   // count is also disconnected from state.count.
   let { count } = state
   // does not affect original state
   count++

   // the function receives a plain number and
   // won't be able to track changes to state.count
   callSomeFunction(state.count)
   ```

## Reactive Variables with `ref()` \*\*

To address the limitations of `reactive()`, Vue also provides a [`ref()`](/api/reactivity-core.html#ref) function which allows us to create reactive **"refs"** that can hold any value type:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` takes the argument and returns it wrapped within a ref object with a `.value` property:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

See also: [Typing Refs](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

Similar to properties on a reactive object, the `.value` property of a ref is reactive. In addition, when holding object types, ref automatically converts its `.value` with `reactive()`.

A ref containing an object value can reactively replace the entire object:

```js
const objectRef = ref({ count: 0 })

// this works reactively
objectRef.value = { count: 1 }
```

Refs can also be passed into functions or destructured from plain objects without losing reactivity:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// the function receives a ref
// it needs to access the value via .value but it
// will retain the reactivity connection
callSomeFunction(obj.foo)

// still reactive
const { foo, bar } = obj
```

In other words, `ref()` allows us to create a "reference" to any value and pass it around without losing reactivity. This capability is quite important as it is frequently used when extracting logic into [Composable Functions](/guide/reusability/composables.html).

### Ref Unwrapping in Templates \*\*

When refs are accessed as top-level properties in the template, they are automatically "unwrapped" so there is no need to use `.value`. Here's the previous counter example, using `ref()` instead:

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
    {{ count }} <!-- no .value needed -->
  </button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Note the unwrapping only applies if the ref is a top-level property on the template render context. As an example, `foo` is a top-level property, but `object.foo` is not.

So given the following object:

```js
const object = { foo: ref(1) }
```

The following expression will **NOT** work as expected:

```vue-html
{{ object.foo + 1 }}
```

The rendered result will be `[object Object]` because `object.foo` is a ref object. We can fix that by making `foo` a top-level property:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

Now the render result will be `2`.

One thing to note is that a ref will also be unwrapped if it is the final evaluated value of a text interpolation (i.e. a <code v-pre>{{ }}</code> tag), so the following will render `1`:

```vue-html
{{ object.foo }}
```

This is just a convenience feature of text interpolation and is equivalent to <code v-pre>{{ object.foo.value }}</code>.

### Ref Unwrapping in Reactive Objects \*\*

When a `ref` is accessed or mutated as a property of a reactive object, it is also automatically unwrapped so it behaves like a normal property:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

If a new ref is assigned to a property linked to an existing ref, it will replace the old ref:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref is now disconnected from state.count
console.log(count.value) // 1
```

Ref unwrapping only happens when nested inside a deep reactive object. It does not apply when it is accessed as a property of a [shallow reactive object](/api/reactivity-advanced.html#shallowreactive).

#### Ref Unwrapping in Arrays and Collections

Unlike reactive objects, there is no unwrapping performed when the ref is accessed as an element of a reactive array or a native collection type like `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Stateful Methods \*

In some cases, we may need to dynamically create a method function, for example creating a debounced event handler:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Debouncing with Lodash
    click: debounce(function () {
      // ... respond to click ...
    }, 500)
  }
}
```

However, this approach is problematic for components that are reused because a debounced function is **stateful**: it maintains some internal state on the elapsed time. If multiple component instances share the same debounced function, they will interfere with one another.

To keep each component instance's debounced function independent of the others, we can create the debounced version in the `created` lifecycle hook:

```js
export default {
  created() {
    // each instance now has its own copy of debounced handler
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // also a good idea to cancel the timer
    // when the component is removed
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... respond to click ...
    }
  }
}
```

</div>

<div class="composition-api">

## Reactivity Transform <sup class="vt-badge experimental" /> \*\*

Having to use `.value` with refs is a drawback imposed by the language constraints of JavaScript. However, with compile-time transforms we can improve the ergonomics by automatically appending `.value` in appropriate locations. Vue provides a compile-time transform that allows us to write the earlier "counter" example like this:

```vue
<script setup>
let count = $ref(0)

function increment() {
  // .value ga ishlatishga ehtiyoj yo'q
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

[Reactivity Transform](/guide/extras/reactivity-transform.html) haqida uning maxsus boʻlimida koʻproq bilib olishingiz mumkin. E'tibor qarating, u hozircha tajribada va yakunlanishidan oldin oʻzgarishi mumkin.

</div>
