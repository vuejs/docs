# ناظرها {#watchers}

## مثال پایه {#basic-example}

ویژگی‌های (computed) به شما این امکان را می‌دهند که مقادیر جدید را براساس داده‌های موجود محاسبه کنید.

با این حال در یک سری از موارد ما باید در واکنش به تغییرات ،برای مثال تغییر در DOM  یا تغییر بخشی از state که نتیجه یک عملیات همگام است،
 عملیات‌هایی را انجام دهیم .
<div class="options-api">

با استفاده از Options API، ما می‌توانیم از [`watch`](/api/options-state#watch) استفاده کنیم تا هروقت پراپرتی داینامیک تغییر کرد،یک تابع را فراخوانی کنیم:

```js
export default {
  data() {
    return {
      question: '',
      answer: 'سوالی که مینویسید باید شامل علامت سوال(?) باشد.'
    }
  },
  watch: {
    // هر زمان که سوال  تغییر کند، این تابع اجرا خواهد شد
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'درحال فکر کردن...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'خطا! دسترسی به لینک ممکن نیست. ' + error
      }
    }
  }
}
```

```vue-html
<p>
  یک سوال بله/خیر بپرسید:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[امتحان کنید](https://play.vuejs.org/#eNptUk2PmzAQ/SuvXAA1sdVrmt0qqnroqa3UIxcLhuCGjKk/wkYR/70OBJLuroRkPDPvzbznuSS7rhOnQMkm2brS6s4/F0wvnbEeFdUqtB6XgoFKeZXl0z9gyQfL8w34G8h5bXiDNF3NQcWuJxtDv25Zh+CCatszSsNeaYZakDgqexD4vM7TCT9cj2Ek65Uvm83cTUr0DTGdyN7RZaN4T24F32iHOnA5hnvdtrCBJ+RcnTH180wrmLaaL4s+QNd4LBOaK3r5UWfplzTHM9afHmoxdhV78rtRcpbPmVHEf1qO5BtTuUWNcmcu8QC9046kk4l4Qvq70XzQvBdC3CyKJfb8OEa01fn4OC7Wq15pj5qidVnaeN+5jZRncmxE72upOp0uY77ulU3gSCT+uOhXnt9yiy6U1zdBRtYa+9aK+9TfrgUf8NWEtgKbK6mKQN8Qdj+/C6T4iJHkXcsKjt9WLpsZL56OXas8xRuw7cYD2LlDXKYoT7K5b+OU22rugsdpfTQVtU9FMueLBHKikRNPpLtcbnuLYZjCW7m0TIZ/92UFiQ==)

گزینه `watch` از پراپرتی های تو در تو یک آبجکت هم پشتیبانی می کند.

```js
export default {
  watch: {
    //  توجه: عبارات پشتیبانی نمی شوند و فقط میتوان از پراپرتی های شی استفاده کرد
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

با استفاده از Composition API، می‌توانیم از [تابع `watch` ](/api/reactivity-core#watch) استفاده کنیم تا هر زمان یک قسمت از reactive state تغییر کرد، یک تابع (callback) را فراخوانی کنیم:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('سوالی که مینویسید باید شامل علامت سوال(?) باشد.')

watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'درحال فکر کردن...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'خطا! دسترسی به لینک ممکن نیست. ' + error
    }
  }
})
</script>

<template>
  <p>
    یک سوال بله/خیر بپرسید:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[ امتحان کنید ](https://play.vuejs.org/#eNplkkGPmzAQhf/KKxdA3Rj1mpJUUdVDT22lHrlYxDRuYOzaJjRC/PcdxyGr3b2A7PfmmzcMc3awVlxGlW2z2rdO2wCvwmj3DenBGhcww6nuCZMM7QkLOmcG5FyRN9RQa8gH/BuVD9oQdtFb5Hm5KpL8pNx6/+vu8xj9KPv+CnYFqQnyhTFIdxb4vCkjpaFb32JVnyD9lVoUpKaVVmK3x9wQoLtXgtB0VP9/cOMveYk9Np/K5MM9l7jIflScLv990nTW9EcIwXNFR3DX1YwYk4dxyrNXTlIHdCrGyk8hWL+tqqvyZMQUukpaHYOnujdtilTLHPHXGyrKUiRH8i9obx+5UM4Z98j6Pu23qH/AVzP2R5CJRMl14aRw+PldIMdH3Bh3bnzxY+FcdZW2zPvlQ1CD7WVQfALquPToP/gzL4RHqsg89rJNWq3JjgGXzWCOqt812ao3GaqEqRKHcfO8/gDLkq7r6tEyW54Bf5TTlg==)

### انواع منابع نظارتی{#watch-source-types}

اولین آرگومان `watch` می‌تواند انواع مختلفی از «منابع» واکنش‌پذیر باشد: می‌تواند یک ref (شامل computed refs)، یک reactive object، یک تابع getter یا آرایه‌ باشد:

```js
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter تابع
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// آرایه‌
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

توجه داشته باشید که نمی توانید یک reactive object را مانند مثال زیر نظارت کنید:

```js
const obj = reactive({ count: 0 })
// this won't work because we are passing a number to watch()

watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

در عوض، از یک getter استفاده کنید:

```js
// instead, use a getter:

watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

</div>

## ناظران عمیق (جزئی) {#deep-watchers}

<div class="options-api">

تابع `watch` به طور پیش‌فرض فقط زمانی فعال می‌شود که مقدار جدید به ویژگی اختصاص داده شود و در تغییرات تودرتو پراپرتی فعال نمی‌شود. اگر می‌خواهید همه تغییرات داخلی پراپرتی را نظارت کنید، باید از نظارت عمیق (deep watcher) استفاده کنید.

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        //توجه: در میوتیشن های تو در تو مقدار جدید برابر با مقدار قدیم خواهد بود،
        //در صورتی که خود شیء جایگزین نشده باشد
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

وقتی `watch()` را روی یک شیء واکنش گرا مستقیماً فراخوانی می‌کنید، به طور خودکار یک نظارت عمیق ایجاد می‌شود. این به این معناست که تابع callback به صورت خودکار برای تمام تغییرات در تمام بخش‌های درونی این شیء اجرا می‌شود.

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {

//این رویداد در صورت تغییرات در ویژگی‌های تو در تو اتفاق می‌افتد.
// توجه: مقدار جدید در اینجا برابر با مقدار قدیمی خواهد بود
// زیرا هر دو به همان شیء اشاره می‌کنند!
})

obj.count++
```

این مورد باید از یک getter که یک شیء reactive را برمی‌گرداند متمایز شود - در مورد دوم، تابع callback تنها در صورتی فعال می‌شود که getter یک شیء متفاوت را برگرداند:

```js
watch(
  () => state.someObject,
  () => {
    // fires only when state.someObject is replaced
  }
)
```

می‌توانید با استفاده از گزینه `deep` مورد دوم را به نظارت عمیق تبدیل کنید:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Note: `newValue` will be equal to `oldValue` here
    // *unless* state.someObject has been replaced
  },
  { deep: true }
)
```

</div>

:::warning احتیاط کنید
نظارت عمیق نیازمند بررسی تمام ویژگی‌های تودرتو در شیء مشاهده شده است و ممکن است زمان‌بر باشد، به ویژه زمانی که بر روی ساختارهای داده بزرگ استفاده می‌شود. از آن تنها زمانی استفاده کنید که واقعاً ضروری باشد و مراقب پیامدهای عملکردی آن باشید.
:::

## ناظران آنی {#eager-watchers}

نظارت `watch` به طور پیش‌فرض بلافاصله نیست ، به این معنا که تابع callback تا زمانی که پراپرتی نظارت شده تغییر نکند، فراخوانی نمی‌شود. اما در برخی موارد، ممکن است بخواهیم تابع callback بلافاصله اجرا شود - به عنوان مثال، ممکن است بخواهیم ابتدا داده‌های اولیه را دریافت کنیم و سپس هر زمان که وضعیت مرتبط تغییر کرد، داده‌ها را دوباره دریافت کنیم.

<div class="options-api">

ما می‌توانیم با استفاده از تابع `handler`و گزینه `immediate: true`، فراخوانی را بلافاصله اجرا کنیم:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // this will be run immediately on component creation.
      },
      // force eager callback execution
      immediate: true
    }
  }
  // ...
}
```

اجرای اولیه تابع (handler) به طور دقیق قبل از هوک created اتفاق می‌افتد. Vue در حالت ابتدایی گزینه‌های `data` `computed` و `methods` را پردازش کرده است، بنابراین این ویژگی‌ها در اولین فراخوانی در دسترس خواهند بود.

</div>

<div class="composition-api">

ما می‌توانیم با استفاده از گزینه `immediate: true`، فراخوانی را بلافاصله اجرا کنیم:

```js
watch(
  source,
  (newValue, oldValue) => {
    // executed immediately, then again when `source` changes
  },
  { immediate: true }
)
```

</div>

<div class="composition-api">

## `watchEffect()` \*\* {#watcheffect}

معمولاً تابع ناظر  از همان داده‌هایی استفاده می‌کند که تغییرات را بر روی آن‌ها نظارت می‌کند.

به عنوان مثال، کد زیر را در نظر بگیرید. این کد از یک ناظر استفاده می‌کند تا هر زمان که مقدار `todoId` تغییر کرد ، یک منبع خارجی را لود کند.

```js
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
```

 توجه داشته باشید که چگونه ناظر از `todoId` دو بار استفاده می کند، یک بار به عنوان ابتدا به عنوان منبع تشخیص تغییرات و سپس دوباره در داخل callback.

این کد را می توان با [`watchEffect()`](/api/reactivity-core#watcheffect) ساده تر کرد. `watchEffect()` فرآیند نظارت بر تغییرات در داده‌های شما را با تشخیص خودکار آنچه کد شما به آن وابسته است ، ساده می‌کند و هر زمان که وابستگی‌ها تغییر می‌کنند،   callback اجرا می شود
. ناظر بالا را می توان به صورت زیر بازنویسی کرد:




```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

در اینجا، تابع callback بلافاصله اجرا می‌شود و نیازی به مشخص کردن `immediate: true` نیست. در طی اجرای آن، به طور خودکار `todoId.value` را به عنوان یک وابستگی دنبال می‌کند (مشابه ویژگی‌های computed). هر زمان که `todoId.value` تغییر کند، تابع callback مجدداً اجرا می‌شود. با استفاده از 
 `watchEffect()`، دیگر نیازی نیست `todoId` را به عنوان مقدار ارسال کنیم.

شما می‌توانید [این مثال](/examples/#fetching-data) را برای دیدن نمونه‌ای از استفاده از `watchEffect()` بررسی کنید.
این مثال به شما نشان می‌دهد که چگونه می‌توانید تغییرات در داده‌ها را نظارت کرده و به آنها واکنش نشان دهید.

  برای ناظر هایی  که دارای چندین وابستگی هستند، استفاده از `watchEffect()` مسئولیت  دستی مدیریت لیست وابستگی‌ها را برطرف می‌کند. علاوه بر این، اگر نیاز به نظارت چندین پراپرتی در یک ساختار داده تو در تو داشته باشید، `watchEffect()` ممکن است به نسبت یک ناظر عمیق (deep watcher) موثرتر باشد، زیرا تنها پراپرتی هایی که در تابع callback استفاده می‌شوند را پیگیری می‌کند و به جای پیگیری همگی آن‌ها به صورت بازگشتی، بهینه‌تر عمل می‌کند.

:::tip نکته
`watchEffect` تنها در حین اجرای همگام(**synchronous**) خود وابستگی‌ها را دنبال می‌کند. هنگام استفاده از آن با یک تابع ناهمگام(async)، تنها پراپرتی هایی که قبل از اولین دستور `await` مشخص شده باشند، دنبال می‌شوند.

:::

### `watch` در مقابل `watchEffect` {#watch-vs-watcheffect}


`watch` و `watchEffect` هر دو به ما اجازه می‌دهند که عملیات‌هایی را در پاسخ به تغییرات انجام دهیم. تفاوت اصلی بین آن‌ها در نحوه پیگیری وابستگی‌هاست.

- `watch` فقط منبع مشخصی را دنبال می‌کند و تغییرات داخل تابع callback را نادیده می‌گیرد. علاوه بر این، تابع تنها زمانی فعال می شود که منبع واقعاً تغییر کرده باشد. `watch` به شما امکان می‌دهد مشخص کنید چه داده‌ها یا منابعی را میخواهید دنبال کنید (ردیابی وابستگی)، و زمانی که آن داده‌ها یا ویژگی‌ها تغییر می‌کنند چه اتفاقی بیفتد (اثر جانبی). این تفکیک ، باعث می شود کنترل دقیق‌تری در مورد زمانی که تابع باید اجرا شود، داشته باشیم.


- `watchEffect` از سوی دیگر، ردیابی وابستگی و اجرای اثر جانبی را در یک مرحله ترکیب می‌کند. و به طور خودکار هر پراپرتی را که کد شما به آن دسترسی دارد را، در حالی که به طور همزمان اجرا می شود، ردیابی می کند.به عبارت ساده تر، وقتی از watchEffect استفاده می کنید، به تمام داده ها یا ویژگی هایی که کد شما در داخل بلوک کد خود با آنها تعامل دارد توجه می کند. این روش به کدنویسی بهتر و ساده‌تر منجر می‌شود، اما وابستگی‌های آن کمتر مشخص اند.

</div>

## زمانبندی اجرای callback ها {#callback-flush-timing}

وقتی شما reactive state را تغییر می‌دهید، این ممکن است باعث فراخوانی همزمان به‌روزرسانی‌ کامپوننت های Vue و ناظرهای ایجاد شده توسط شما شود.

از آنجایی که Vue.js تغییرات در reactive state را در مرحله‌ای **قبل از**  به‌روزرسانی کامپوننت‌ها اعمال می‌کند، این به این معناست که ناظر های کاربر (شما) به صورت پیش‌فرض قبل از اعمال تغییرات در کامپوننت‌های Vue فراخوانی می‌شوند. به عبارت ساده، تغییرات در داده‌ها اعمال می‌شوند و سپس  ناظر ها فراخوانی می‌شوند.این به این معناست که اگر سعی کنید درون یک ناظر به DOM دسترسی پیدا کنید، DOM در وضعیتی خواهد بود که به‌روزرسانی در آن اعمال نشده است.

اگر می‌خواهید پس از به‌روزرسانی Vue،درون یک ناظر به DOM دسترسی پیدا کنید، باید گزینه `flush: 'post'` را ذکر کنید.

 این گزینه به Vue می‌گوید که ناظر را پس از به‌روزرسانی کامپوننت‌ها فراخوانی کند. این کار به شما این امکان را می‌دهد که با DOM به‌روز شده (تغییر یافته توسط Vue) در ناظر خود، کار کنید.

<div class="options-api">

```js
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

</div>

<div class="composition-api">

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```
همچنین Post-flush،  یک نام مختصر به نام `watchPostEffect()` دارد.

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {

/* پس از به روز رسانی Vue اجرا می شود */

})
```

</div>

<div class="options-api">

## `this.$watch()` \* {#this-watch}

همچنین می‌توان با استفاده از روش [`$watch()`](/api/component-instance#watch) ناظر ایجاد کرد:

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

این ویژگی زمانی مفید است که می‌خواهید یک ناظر را شرطی یا در پاسخ به تعامل کاربر فعال کنید و  در مواقعی که دیگر لازم نیست، عملکرد ناظر را متوقف کنید .

</div>

## متوقف کردن ناظر {#stopping-a-watcher}

<div class="options-api">

ناظرهایی که با استفاده از گزینه `watch` یا متد `$watch()` ایجاد می‌شوند، به طور خودکار وقتی کامپوننتی که آنها به آن تعلق دارند از صفحه وب حذف یا "unmount" می شود، متوقف می‌شوند. بنابراین در بیشتر موارد نیازی نیست که خودتان نگران متوقف کردن ناظر باشید.

در موارد نادری که می‌خواهید یک ناظر را قبل از حذف کامپوننتی که به آن تعلق دارد متوقف کنید، Vue.js راهی برای انجام این کار با استفاده از متد `$watch()`ارائه می‌کند. این روش یک تابع ویژه را برمی گرداند که می توانید با فراخوانی آن به صورت دستی ناظر را متوقف کنید:
```js
const unwatch = this.$watch('foo', callback)

// زمانی که دیگر به ناظر نیازی نیست:
unwatch()
```

</div>

<div class="composition-api">

watcher هایی که به صورت همزمان در داخل `setup()` یا `<script setup>` تعریف می‌شوند، به کامپوننت والد متصل می شوند و هنگامی که کامپوننت والد حذف شود، به طور خودکار متوقف می شوند. بنابراین در بیشتر موارد نیازی نیست که خودتان نگران متوقف کردن ناظر باشید.

نکته کلیدی در اینجا این است که ناظر باید **همزمان** ایجاد شود: اگر ناظر در یک فراخوانی ناهمگام ایجاد شود، بعد از حذف کامپوننت والد متوقف نمی شود و باید به صورت دستی متوقف شود تا از نشت حافظه جلوگیری کند. مثال زیر را ببینید:

```vue
<script setup>
import { watchEffect } from 'vue'

// این یکی به طور خودکار متوقف خواهد شد
watchEffect(() => {})

// ... این یکی خودکار متوقف نمی شود!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

برای متوقف کردن یک ناظر به صورت دستی باید از تابع `unwatch()` استفاده کنید. این کار برای هر دو `watch` و `watchEffect` کار می‌کند.

```js
const unwatch = watchEffect(() => {})

// ... بعداً، زمانی که دیگر مورد نیاز نیست
unwatch()
```

توجه داشته باشید که موارد کمی وجود دارند که نیاز به ایجاد نظارت ناهمگام دارید، و بهتر است اگر امکان دارد از نظارت همزمان استفاده کنید. اگر باید منتظر برخی از داده‌های ناهمگام باشید، به جای آن می‌توانید منطق ناظر خود را برعکس کنید:

```js
// داده هایی که به صورت ناهمزمان بارگذاری  می شوند
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // هنگامی که داده ها لود می شوند کاری انجام دهید
  }
})
```

</div>
