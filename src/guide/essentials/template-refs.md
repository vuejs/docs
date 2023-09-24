# مراجع تمپلیت {#template-refs}

درحالیکه مدل رندر اعلامی Vue بیشتر عملیات های مرتبط با DOM را برای شما جدا می کند، در مواردی پیش می آید که نیاز داریم به المنت های اساسی DOM دسترسی مستقیم داشته باشیم. برای رسیدن به این هدف، می توانیم از ویژگی به خصوص `ref` بهره ببریم:

```vue-html
<input ref="input">
```

ویژگی `ref` همانند ویژگی `key` که در فصل `v-for` مورد بحث قرار گرفت، به خصوص است. این ویژگی به ما اجازه می دهد مرجعی مستقیم به المنت مشخصی از DOM یا نمونه کامپوننت فرزند بعد از اینکه مانت شد بدست بیاوریم. این ویژگی ممکن است هنگامی مفید باشد که شما بخواهید، به عنوان مثال، به صورت برنامه ای عمل فوکس را بر روی یک اینپوت درون کامپوننتی که مانت شده انجام دهید یا یک کتابخانه شخص ثالث را بر روی المنتی مقدار دهی اولیه کنید.

## دسترسی به مراجع {#accessing-the-refs}

<div class="composition-api">

برای دسترسی به مرجع در حالت Composition API, نیاز داریم که یک ref هم نام با مرجع تعریف کنیم:

```vue
<script setup>
import { ref, onMounted } from 'vue'
// یک ref برای نگهداری از مرجع المنت تعریف کن
// نام ref باید با مقدار مرجع قالب یکسان باشد
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

اگر از `<script setup>` استفاده نمی کنید، اطمینان حاصل کنید که ref را از `setup()` برگشت دهید:

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

مرجع حاصل بر روی `this.$refs` نمایش داده می شود:

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

توجه داشته باشید که شما فقط **بعد از اینکه کامپوننت مانت شد** میتوانید به مرجع دسترسی داشته باشید. اگر شما سعی کنید که به <span class="options-api">`$refs.input`</span><span class="composition-api">`input`</span> درون یک عبارت تمپلیت دسترسی داشته باشید، در اولین رندر مقدار `null` را خواهد داشت. این به این دلیل است که المنت تا بعد از اولین رندر موجود نمی باشد.

<div class="composition-api">

اگر سعی داشته باشید که تغییرات مرجع تمپلیت را watch کنید، اطمینان حاصل کنید در موردی که مقدار مرجع `null` است را نظر بگیرید :

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // المنت هنوز مانت نشده یا در حالت آنمانت قرار دارد (برای مثال توسط v-if)
  }
})
```

همچنین ببینید: [Typing Template Refs](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />

</div>

## استفاده مراجع درون `v-for` {#refs-inside-v-for}

> به نسخه v3.2.25 یا بالاتر نیاز دارد

<div class="composition-api">

هنگامی که `ref` درون `v-for`استفاده می شود، مرجع مربوطه باید شامل مقدار آرایه باشد، که این آرایه بعد از عمل مانت با المنت ها پُر می شود.

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

[آن را در Playground امتحان کنید](https://play.vuejs.org/#eNpFjs1qwzAQhF9l0CU2uDZtb8UOlJ576bXqwaQyCGRJyCsTEHr3rGwnOehnd2e+nSQ+vW/XqMSH6JdL0J6wKIr+LK2evQuEhKCmBs5+u2hJ/SNjCm7GiV0naaW9OLsQjOZrKNrq97XBW4P3v/o51qTmHzUtd8k+e0CrqsZwRpIWGI0KVN0N7TqaqNp59JUuEt2SutKXY5elmimZT9/t2Tk1F+z0ZiTFFdBHs738Mxrry+TCIEWhQ9sttRQl0tEsK6U4HEBKW3LkfDA6o3dst3H77rFM5BtTfm/P)

</div>
<div class="options-api">

هنگامی که `ref` درون `v-for`استفاده می شود، مقدار مرجع حاصل آرایه ای شامل مقادیر مربوطه خواهد بود: 

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

[Try it in the Playground](https://play.vuejs.org/#eNpFjk0KwjAQha/yCC4Uaou6kyp4DuOi2KkGYhKSiQildzdNa4WQmTc/37xeXJwr35HEUdTh7pXjszT0cdYzWuqaqBm9NEDbcLPeTDngiaM3PwVoFfiI667AvsDhNpWHMQzF+L9sNEztH3C3JlhNpbaPNT9VKFeeulAqplfY5D1p0qurxVQSqel0w5QUUEedY8q0wnvbWX+SYgRAmWxIiuSzm4tBinkc6HvkuSE7TIBKq4lZZWhdLZfE8AWp4l3T)

</div>

باید توجه داشت که آرایه مرجع تضمین نمی کند که به همان ترتیب آرایه مبدا باشد.

## مراجع تابع {#function-refs}

 ویژگی `ref` همچنین می تواند به جای استفاده از یک کلید استرینگ به یک تابع وصل شود، که در هر بروزرسانی کامپوننت صدا زده می شود و به شما انعطاف کامل در اینکه کجا مرجع المنت را نگه دارید می دهد. تابع مرجع المنت را به عنوان اولین آرگومان دریافت می کند:

```vue-html
<input :ref="(el) => { /* el را به یک پراپرتی یا ref اختصاص دهید */ }">
```

توجه داشته باشید ما داریم از یک اتصال `:ref` پویا استفاده میکنیم تا بتونیم یک تابع را به جای یک رشته نام مرجع ارسال کنیم. هنگامی که المنت آنمانت می شود، آرگومان `null` خواهد بود. البته که شما می توانید از یک متد به جای تابع خطی استفاده کنید.


## استفاده از مرجع در کامپوننت {#ref-on-component}

> این قسمت دانش [Components](/guide/essentials/component-basics) را فرض می کند . راحت از آن صرف نظر کنید و بعداً برگردید

`ref` همچنین می تواند بر روی کامپوننت فرزند استفاده شود. در این مورد مرجع نمونه ای از کامپوننت فرزند خواهد بود:

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value نمونه ای از <Child /> را نگه می دارد
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
    // this.$refs.child نمونه ای از <Child /> را نگه می دارد
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api"> اگر کامپوننت فرزند از Options API استفاده می کند یا از `<script setup>` استفاده نمی کند، نمونه مرجع با کلمه کلیدی `this` کامپوننت فرزند یکسان خواهد بود، این به این معنی است که کامپوننت والد به هر پراپرتی و متد کامپوننت فرزند دسترسی خواهد داشت. این کار را آسان می کند که جزئیات پیاده سازی کاملا محکمی بین کامپوننت والد و فرزند ایجاد شود، بنابراین باید از مرجع کامپوننت ها در صورت لزوم استفاده کرد - در بیشتر موارد، ابتدا باید سعی کنید که تعاملات بین والد و فرزند را با استفاده از رابط های props و emit به کار ببرید. </span><span class="options-api">   نمونه مرجع با کلمه کلیدی `this` کامپوننت فرزند یکسان خواهد بود، این به این معنی است که کامپوننت والد به هر پراپرتی و متد کامپوننت فرزند دسترسی خواهد داشت. این کار را آسان می کند که جزئیات پیاده سازی کاملا محکمی بین کامپوننت والد و فرزند ایجاد شود، بنابراین باید از مرجع کامپوننت ها در صورت لزوم استفاده کرد - در بیشتر موارد، ابتدا باید سعی کنید که تعاملات بین والد و فرزند را با استفاده از رابط های props و emit به کار ببرید. </span> 

<div class="composition-api">

یک استثنا در اینجا این است که کامپوننت هایی که از `<script setup>` استفاده می کنند **به صورت پیش فرض خصوصی** هستند: کامپوننت والدی که با استفاده از `<script setup>` به کامپوننت فرزند رجوع می کند قادر نخواهد بود به چیزی دسترسی پیدا کند مگر اینکه کامپوننت فرزند با استفاده از ماکرو `defineExpose` یک رابط عمومی را در معرض دید قرار دهد:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// ماکروهای کامپایلر، مانند defineExpose, نیاز به ایمپورت شدن ندارند

defineExpose({
  a,
  b
})
</script>
```

هنگامی که والد نمونه ای از این کامپوننت را از طریق مرجع تمپلیت می گیرد، نمونه بازیابی شده به شکل `{ a: number, b: number }` خواهد بود (refها همانند نمونه های معمولی به صورت خودکار unwrap می شوند )

همچنین ببینید: [Typing Component Template Refs](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

گزینه `expose` برای محدود کردن دسترسی به نمونه فرزند استفاده می شود:

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

در مثال بالا، والدی که به این کامپوننت از طریق مرجع تمپلیت رجوع می کند فقط قادر خواهد بود به `publicData` و `publicMethod` دسترسی پیدا کند.

</div>
