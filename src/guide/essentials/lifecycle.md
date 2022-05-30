# Lifecylce hooks - Hayotiy-sikl bosqichlari

Har bir Vue komponent yaratilganda bir qator jarayonlardan, bosqichlardan yani Hook-lardan o'tadi, masalan,  komponent data-kuzatuvchilarini sozlashi, shablonni (template) kompilyatsiya qilish, uni DOM-ga mount yani biriktirishi, DOM-ga, bo'lgan o'zgarishlarni kiritishi. Shular bilan birgalikda, foydalanuchilar, har bir bosqichda o'zlarining kodlarini kiritishlari uchun imkon beruvchi bosqichlardur.

<!-- ## Registering Lifecycle Hooks -->
## Haytiy-tsikl bosqichlarini registratsiya qilish 

Masalan, <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span>, komponent boshlang'ich renderdan va DOM elementlari yaratilgandan so'ng ishga tushadigan boshqich hisoblanadi:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`Kopmonent mount bo'ldi.`)
  }
}
```

</div>

<!-- There are also other hooks which will be called at different stages of the instance's lifecycle, with the most commonly used being  -->
Shuningdek, komponent yaratilishing turli boshqichlarida o'z navbati bilan ishga tushuvchi, odatda ko'p ichlatiluvchi boshqichlar mavjud, bular  <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle.html#onmounted), [`onUpdated`](/api/composition-api-lifecycle.html#onupdated), va [`onUnmounted`](/api/composition-api-lifecycle.html#onunmounted).</span><span class="options-api">[`mounted`](/api/options-lifecycle.html#mounted), [`updated`](/api/options-lifecycle.html#updated), va [`unmounted`](/api/options-lifecycle.html#unmounted).</span>

<div class="options-api">

Barcha hayotiy-sikllari, o'zi ishlatilayotgan context-ga ishora sifatida  `this`-ni ishlatadi.  
Shu sababdan hayotiy-sikl hook-lari uchun arrow-funksiyani ishlatib bo'lmaydi, aks holda `this`-contextini ishlatib bo'lmaydi.

</div>

<div class="composition-api">

`onMounted` ishlatilganda, Vue avtomatik tarzda quydagi aktive kopmonentga callback-funksiyani registratsiya qiladi.
Bu o'z navbatida hook-lar, dastlabki sozlashlarda,   **sinxron** tarzda registratsiya qilinishini talab qiladi. Masalan, bunday qilinmaydi:

```js
setTimeout(() => {
  onMounted(() => {
    // bu ishlamaydi.
  })
}, 100)
```

Do note this doesn't mean that the call must be placed lexically inside `setup()` or `<script setup>`. `onMounted()` can be called in an external function as long as the call stack is synchronous and originates from within `setup()`.
Lekin bu degan,hook-larni ishlatish,  leksik jihatdan `setup()` yoki `<script setup>` da bo'lishini talab qilmaydi. Hook-larni ishlatish sinxron va `setup()`- ichidan kelib chiqgan holatda, `onMounted()` tashqi funksiyalardan ham chaqirilishi mumkin.

</div>

## Lifecycle Diagrammasi

Quyidagi keltirilgan diagrammada, lifecycle qanday boshqichlardan iboratligini bilib olishimiz mumkin. Hozir ko'rib turganlaringizning barchasiga to'liq tushunishingiz shart emas, ular bilan ko'plab ishlaganingiz sari, ularni foydasini ko'rib borasiz.

![Component lifecycle diagram](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

Barcha bosqichlar va ularning ishlatish o'rinlarini aniqroq ko'rish uchun <span class="composition-api">[Lifecycle Hooks API reference](/api/composition-api-lifecycle.html)</span><span class="options-api">[Lifecycle Hooks API bo'yicha malumotlar](/api/options-lifecycle.html)</span>-ga murojat qiling
