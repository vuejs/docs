# State Management {#state-management}

## State Management چیست؟ {#what-is-state-management}

از نظر فنی، هر کامپوننت Vue به طور خودکار state واکنش‌‌پذیری خود را "مدیریت" می‌کند. به عنوان مثال یک کامپوننت ساده شمارنده را در نظر بگیرید:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

// state
const count = ref(0)

// actions
function increment() {
  count.value++
}
</script>

<!-- view -->
<template>{{ count }}</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  // state
  data() {
    return {
      count: 0
    }
  },
  // actions
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- view -->
<template>{{ count }}</template>
```

</div>

این یک واحد مجزا با اجزای زیر است:

- **state**، داده‌ای که برنامه ما بر اساس آن هدایت می‌شود؛
- **view**، پیاده‌سازی ظاهری از **state؛**
- **actions**، راه‌های احتمالی برای تغییر state در واکنش به ورودی‌های کاربر از **view**.

این یک ارائه ساده‌ای از مفهوم "جریان داده یک‌طرفه (one-way data flow)" است:

<p style="text-align: center">
  <img alt="نمودار state flow" src="./images/state-flow.png" width="252px" style="margin: 40px auto">
</p>

اما سادگی زمانی شروع به فروپاشی می‌کند که **چندین کامپوننت وجود داشته باشند که state مشترکی داشته باشند**:

1. چندین view ممکن است به یک قطعه از state وابسته باشند.
2. action های مختلف view ها ممکن است نیاز به تغییر یک قطعه مشترک از state داشته باشند.

برای مورد اول، یک راه حل ممکن این است که state مشترک را به یک کامپوننت پدر مشترک انتقال دهیم و سپس آن را به عنوان props به پایین پاس دهیم. اما این عمل در درخت‌های کامپوننت با سلسله‌مراتب عمیق به سرعت خسته‌کننده می‌شود و منجر به مشکل دیگری به نام [Prop Drilling](/guide/components/provide-inject#prop-drilling) می‌شود.

برای مورد دوم، اغلب خود را در حال استفاده از راه حل‌هایی مانند دسترسی مستقیم به instance های والد / فرزند از طریق template refs، یا تلاش برای تغییر و همگام‌سازی چندین کپی از state از طریق رویدادهای emit شده می‌یابیم. هر دو الگو شکننده هستند و به سرعت منجر به تولید کد غیرقابل نگهداری می‌شوند.

یک راه‌حل ساده‌تر این است که state مشترک را از کامپوننت‌ها خارج کنیم و آن را بصورت یگانه و سراسری مدیریت کنیم. با این کار درخت کامپوننت‌ها ما به یک "view" بزرگ تبدیل می‌شود، و هر کامپوننتی می‌تواند به state دسترسی پیدا کند یا اکشن‌ها را فراخوانی کند، صرف‌نظر از اینکه در کجای درخت قرار دارد!

## مدیریت ساده State با Reactivity API {#simple-state-management-with-reactivity-api}

<div class="options-api">

در Options API، داده‌های reactive با استفاده از گزینه `data()‎` اعلام می‌شوند. در داخل آن، شیء برگردانده شده توسط `data()‎` با استفاده از تابع [`reactive()‎`](/api/reactivity-core#reactive) واکنش‌گرا می‌شود، که به عنوان یک API عمومی نیز در دسترس است.

</div>

اگر یک state داشته باشید که باید توسط چندین نمونه به اشتراک گذاشته شود، می‌توانید از [`reactive()‎`](/api/reactivity-core#reactive) برای ایجاد یک شیء واکنش‌گرا استفاده کنید، و سپس آن را در چندین کامپوننت import کنید:

```js
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})
```

<div class="composition-api">

```vue
<!-- ComponentA.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From B: {{ store.count }}</template>
```

</div>
<div class="options-api">

```vue
<!-- ComponentA.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From B: {{ store.count }}</template>
```

</div>

حالا هر زمانی که شی `store` تغییر کند، هر دو `<ComponentA>` و `<ComponentB>` به‌طور خودکار view خود را به‌روزرسانی خواهند کرد - دیگر یک منبع واحد داده داریم.

با این حال، این به معنای آن است که هر کامپوننتی که `store` را import می‌کند، می‌تواند به هر روشی که می‌خواهد آن را تغییر دهد:

```vue-html{2}
<template>
  <button @click="store.count++">
    From B: {{ store.count }}
  </button>
</template>
```

در حالی که این در موارد ساده کار می‌کند، اما state سراسری که به‌طور دلخواه توسط هر کامپوننتی قابل تغییر باشد، در بلندمدت چندان قابل نگهداری نخواهد بود. برای اطمینان از اینکه منطق تغییردهنده state مانند خود state متمرکز شده باشد، توصیه می‌شود متدهایی را با نام‌هایی که قصد آن action خاص را بیان می‌کنند، روی store تعریف کرد:

```js{6-8}
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```vue-html{2}
<template>
  <button @click="store.increment()">
    From B: {{ store.count }}
  </button>
</template>
```

<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNrNkk1uwyAQha8yYpNEiUzXllPVrtRTeJNSqtLGgGBsVbK4ewdwnT9FWWSTFczwmPc+xMhqa4uhl6xklRdOWQQvsbfPrVadNQ7h1dCqpcYaPp3pYFHwQyteXVxKm0tpM0krnm3IgAqUnd3vUFIFUB1Z8bNOkzoVny+wDTuNcZ1gBI/GSQhzqlQX3/5Gng81pA1t33tEo+FF7JX42bYsT1BaONlRguWqZZMU4C261CWMk3EhTK8RQphm8Twse/BscoUsvdqDkTX3kP3nI6aZwcmdQDUcMPJPabX8TQphtCf0RLqd1csxuqQAJTxtYnEUGtIpAH4pn1Ou17FDScOKhT+QNAVM)

</div>
<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNrdU8FqhDAU/JVHLruyi+lZ3FIt9Cu82JilaTWR5CkF8d8bE5O1u1so9FYQzAyTvJnRTKTo+3QcOMlIbpgWPT5WUnS90gjPyr4ll1jAWasOdim9UMum3a20vJWWqxSgkvzTyRt+rocWYVpYFoQm8wRsJh+viHLBcyXtk9No2ALkXd/WyC0CyDfW6RVTOiancQM5ku+x7nUxgUGlOcwxn8Ppu7HJ7udqaqz3SYikOQ5aBgT+OA9slt9kasToFnb5OiAqCU+sFezjVBHvRUimeWdT7JOKrFKAl8VvYatdI6RMDRJhdlPtWdQf5mdQP+SHdtyX/IftlH9pJyS1vcQ2NK8ZivFSiL8BsQmmpMG1s1NU79frYA1k8OD+/I3pUA6+CeNdHg6hmoTMX9pPSnk=)

</div>

:::tip نکته
توجه کنید که هندلر کلیک از `store.increment()‎` با پرانتز استفاده می‌کند - این برای صدا زدن متد با `this` ضروری است چون متد برای کامپوننت نیست.
:::

اگرچه در اینجا از یک شیء واکنش‌گرای یگانه به عنوان یک store استفاده کرده‌ایم، اما می‌توانید state واکنش‌گرا ایجاد شده با سایر [Reactivity APIs](/api/reactivity-core) مانند `ref()‎` یا `computed()‎` و یا حتی state سراسری را از یک [Composable](/guide/reusability/composables) برگردانید:

```js
import { ref } from 'vue'

//  سراسری - ایجاد شده در اسکوپ ماژول state
const globalCount = ref(1)

export function useCount() {
  // محلی، ایجاد شده برای هر کامپوننت state
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

این موضوع که سیستم واکنش‌پذیری Vue از کامپوننت جدا شده است، آن را بسیار انعطاف‌پذیر می‌کند.

## در نظر گرفتن‌ SSR {#ssr-considerations}

اگر در حال ساختن برنامه‌ای هستید که از [Server-Side Rendering (SSR)](./ssr) استفاده می‌کند، الگوی بالا می‌تواند به دلیل اینکه store یک سینگلتون مشترک در میان چندین درخواست است، منجر به مشکلاتی شود. این موضوع با [جزئیات بیشتری](./ssr#cross-request-state-pollution) در راهنمای SSR بحث شده است.

## Pinia {#pinia}

در حالی که راه حل مدیریت state دست‌ساز ما در سناریوهای ساده کافی است، اما در برنامه‌های تولید شده مقیاس بزرگ نکات بیشتری وجود دارد که باید در نظر گرفته شود:

- قوانین سخت گیرانه تر برای کار تیمی
- ادغام با Vue DevTools شامل تایم‌لاین، بازرسی درون کامپوننت، و دیباگ بصورت time-travel
- Hot Module Replacement
- پشتیبانی از Server-Side Rendering

[Pinia](https://pinia.vuejs.org) یک کتابخانه مدیریت state است که تمام موارد بالا را پیاده‌سازی می‌کند. توسط تیم اصلی Vue نگهداری می‌شود و هم با  Vue 2 و Vue 3 کار می‌کند.

کاربران فعلی ممکن است با [Vuex](https://vuex.vuejs.org/) آشنا باشند، کتابخانه رسمی قبلی مدیریت state برای Vue. با اینکه Pinia نقش مشابهی در اکوسیستم دارد، Vuex حالا در حالت نگهداری قرار گرفته است. هنوز کار می‌کند، اما دیگر ویژگی‌های جدیدی دریافت نخواهد کرد. توصیه می‌شود برای برنامه‌های جدید از Pinia استفاده کنید.

Pinia ابتدا به عنوان اکتشافی در مورد اینکه نسل بعدی Vuex می‌تواند چه شکلی داشته باشد، شروع شد و بسیاری از ایده‌هایی که در بحث‌های تیم اصلی برای Vuex 5 مطرح شده بود را پیاده کرد. در نهایت، متوجه شدیم که Pinia اکثر آنچه را که می‌خواستیم در Vuex 5 داشته باشیم پیاده‌سازی کرده است، و تصمیم گرفتیم آن را توصیه کنیم.

در مقایسه با Vuex، در Pinia ما API ساده‌تری با پیچیدگی کمتری مشاهده می‌کنیم، API‌های شبه Composition-API خواهیم دید و مهم‌تر از همه اینکه هنگام استفاده با TypeScript از type inference قوی پشتیبانی می‌کند.
