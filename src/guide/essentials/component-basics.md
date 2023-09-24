# اصول اولیه کامپوننت‌ها | Components Basics {#components-basics}

کامپوننت‌‌ها به ما اجازه می‌دهند تا رابط کاربری را به قطعات مستقل و قابل استفاده مجدد تقسیم کنیم و در مورد هر قطعه به طور مجزا فکر کنیم. معمول است که یک برنامه به صورت درختی از کامپوننت‌‌های تودرتو سازماندهی شود:

![درخت کامپوننت ها](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

این بسیار شبیه به چگونگی تودرتو بودن عناصر HTML است، اما Vue  به ما اجازه می‌دهد محتوا و منطق سفارشی را در هر کامپوننت‌ بطور جدا محصور کنیم. Vue همچنین به خوبی با کامپوننت‌‌های Web اصلی کار می‌کند. اگر در مورد رابطه بین کامپوننت‌‌های Vue و کامپوننت‌‌های Web کنجکاو هستید، [اینجا بیشتر بخوانید](/guide/extras/web-components).

## تعریف کامپوننت‌ {#defining-a-component}

هنگامی که برنامه دارای مرحله‌ای برای build باشد ، معمولاً هر کامپوننت Vue را در یک فایل اختصاصی با پسوند `‎.vue` تعریف می‌کنیم - که به آن کامپوننت تک فایلی ([Single-File Component](/guide/scaling-up/sfc) (SFC)) می‌گویند:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

</div>

وقتی از مرحله build استفاده نمی‌کنیم، یک کامپوننت Vue می‌تواند به عنوان یک شیء جاوااسکریپت ساده که حاوی مقادیر معنا داری برای Vue است، تعریف شود:

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
}
```

</div>
<div class="composition-api">

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
  // استفاده کرد in-DOM template همچنین می‌توان از 
  // template: '#my-template-element'
}
```

</div>

تمپلیت یک رشته جاوااسکریپتی است که Vue آن را کامپایل می‌کند. همچنین می‌توانید از یک سلکتور ID استفاده کنید که به عنصری اشاره می‌کند - Vue محتوای آن را به عنوان منبع تمپلیت استفاده خواهد کرد.

مثال بالا یک کامپوننت را تعریف می‌کند و آن را به عنوان export پیش‌فرض یک فایل export `‎.js` می‌کند، اما می‌توانید از export نام‌دار برای export کردن چند کامپوننت از یک فایل استفاده کنید.

## استفاده از کامپوننت {#using-a-component}

:::tip نکته
ما برای بقیه این راهنما از سینتکس SFC استفاده خواهیم کرد - مفاهیم مربوط به کامپوننت‌ها بدون توجه به اینکه آیا از مرحله build استفاده می‌کنید یا خیر، یکسان است. بخش [Examples](/examples/) نحوه استفاده از کامپوننت را در هر دو سناریو نشان می‌دهد.
:::

برای استفاده از یک کامپوننت فرزند، نیاز داریم آن را در کامپوننت والد وارد کنیم. فرض کنید کامپوننت شمارنده را داخل فایلی به نام `ButtonCounter.vue` قرار داده‌ایم، این کامپوننت به عنوان export پیش‌فرض فایل در دسترس خواهد بود (نحوه استفاده در کامپوننت والد در پایین آمده):

<div class="options-api">

```vue
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

برای ارائه کامپوننت وارد شده به تمپلیت، نیاز داریم آن را با گزینه `components` [ثبت کنیم](/guide/components/registration). سپس کامپوننت به عنوان یک تگ با کلیدی که با آن ثبت شده است، در دسترس خواهد بود.

</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

با استفاده از `<script setup>`، کامپوننت‌های import شده به طور خودکار در تمپلیت در دسترس قرار می‌گیرند.

</div>

همچنین می‌توان یک [کامپوننت را به طور سراسری ثبت کرد](/guide/components/registration) که آن را بدون نیاز به import کردن، در دسترس تمام کامپوننت‌های یک برنامه داشته باشیم.

همچنین می‌توانیم کامپوننت‌ها را تا جایی که لازم است دوباره استفاده کنیم:

```vue-html
<h1>Here are many child components!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNqVUE1LxDAQ/StjLqusNHotcfHj4l8QcontLBtsJiGdiFL6301SdrEqyEJyeG9m3ps3k3gIoXlPKFqhxi7awDtN1gUfGR4Ts6cnn4gxwj56B5tGrtgyutEEoAk/6lCPe5MGhqmwnc9KhMRjuxCwFi3UrCk/JU/uGTC6MBjGglgdbnfPGBFM/s7QJ3QHO/TfxC+UzD21d72zPItU8uQrrsWvnKsT/ZW2N2wur45BI3KKdETlFlmphZsF58j/RgdQr3UJuO8G273daVFFtlstahngxSeoNezBIUzTYgPzDGwdjk1VkYvMj4jzF0nwsyQ=)

</div>
<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNqVj91KAzEQhV/lmJsqlY3eSlr8ufEVhNys6ZQGNz8kE0GWfXez2SJUsdCLuZiZM9+ZM4qnGLvPQuJBqGySjYxMXOJWe+tiSIznwhz8SyieKWGfgsOqkyfTGbDSXsmFUG9rw+Ti0DPNHavD/faVEqGv5Xr/BXOwww4mVBNPnvOVklXTtKeO8qKhkj++4lb8+fL/mCMS7TEdAy6BtDfBZ65fVgA2s+L67uZMUEC9N0s8msGaj40W7Xa91qKtgbdQ0Ha0gyOM45E+TWDrKHeNIhfMr0DTN4U0me8=)

</div>

توجه کنید که با کلیک روی دکمه‌ها، هر کدام مقدار جداگانه‌ای از `count` را نگه می‌دارند. چون هر بار که از یک کامپوننت استفاده می‌کنید، **نمونه** جدیدی از آن ساخته می‌شود.

در SFCها، توصیه می‌شود برای نام تگ کامپوننت‌های فرزند از فرمت `PascalCase` استفاده شود تا از المان‌های HTML متمایز شوند. اگرچه نام‌های تگ‌های HTML بصورت case-insensitive هستند، اما SFC یک فرمت کامپایل شده است و می‌توانیم از نام‌های case-sensitive در آن استفاده کنیم. همچنین می‌توانیم از `‎/>‎` برای بستن تگ استفاده کنیم.

اگر تمپلیت‌ها را مستقیماً در DOM می‌نویسید (مثلاً به عنوان محتوای المان `<template>`)، تمپلیت مطابق با رفتار پارسر HTML مرورگر عمل خواهد کرد. در چنین مواردی، نیاز دارید از نام‌های `kebab-case` و تگ‌های بسته‌شده صریح برای کامپوننت‌ها استفاده کنید:

```vue-html
<!-- نوشته شده باشد DOM اگر این تمپلیت در -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

برای جزئیات بیشتر [محدودیت‌های تجزیه تمپلیت در DOM](#in-dom-template-parsing-caveats) را مشاهده کنید .

## پاس دادنِ props {#passing-props}

اگر قرار است بلاگی بسازیم، احتمالاً نیاز به کامپوننتی داریم که نماینده پست بلاگ باشد. می‌خواهیم تمام پست‌های بلاگ از طرح بصری یکسانی استفاده کنند، اما با محتوای متفاوت. چنین کامپوننتی بدون توانایی پاس دادن داده‌ها به آن، مانند عنوان و محتوای پست خاصی که می‌خواهیم نمایش دهیم، مفید نخواهد بود. در اینجاست که props (مانند یک قهرمان) وارد می‌شود.

props صفات سفارشی هستند که می‌توانید روی یک کامپوننت ثبت کنید. برای پاس دادن عنوان به کامپوننت پست بلاگ، باید آن را در لیست props هایی که این کامپوننت قبول می‌کند، اعلام کنیم، با استفاده از ماکرو <span class="options-api">[`props`](/api/options-state#props) option</span><span class="composition-api">[`defineProps`](/api/sfc-script-setup#defineprops-defineemits)</span>:

<div class="options-api">

```vue
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

زمانی که مقداری به یک prop پاس داده می‌شود، آن به یک property روی آن نمونه کامپوننت تبدیل می‌شود. مقدار آن property در تمپلیت بصورت مستقیم و در در بدنه کامپوننت با `this`، درست مثل هر property دیگر کامپوننت، قابل دسترسی است.

</div>
<div class="composition-api">

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` یک ماکرو زمان کامپایل است که تنها در `<script setup>` در دسترس است و نیازی به import کردن صریح آن نیست. propsهای اعلام شده به طور خودکار در تمپلیت قابل دسترسی هستند. `defineProps` همچنین یک شی برمی‌گرداند که تمام propsهای پاس داده شده به کامپوننت را شامل می‌شود، به طوری که اگر لازم بود در کد جاوااسکریپت بتوانیم به آن‌ها دسترسی داشته باشیم:

```js
const props = defineProps(['title'])
console.log(props.title)
```

همچنین ببینید: [Typing Component Props](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

اگر از `<script setup>` استفاده نمی‌کنید، باید `props` ها را با استفاده از گزینه props اعلام کنید، و شی props به عنوان اولین آرگومان به `setup()‎` پاس داده خواهد شد:

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

یک کامپوننت می‌تواند تعداد دلخواهی props داشته باشد و، به طور پیش‌فرض هر مقداری می‌تواند به هر prop پاس داده شود.

 پس از ثبت یک prop، می‌توانید داده را به عنوان یک صفت سفارشی شده به آن پاس دهید، مانند:

```vue-html
<BlogPost title="سفر من با ویو" />
<BlogPost title="بلاگ‌نویسی با ویو" />
<BlogPost title="چرا ویو خیلی جالب است" />
```

اما در یک برنامه معمولی، احتمالا آرایه‌ای از پست‌ها در کامپوننت والد خواهید داشت:

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'سفر من با ویو' },
        { id: 2, title: 'بلاگ‌نویسی با ویو' },
        { id: 3, title: 'چرا ویو خیلی جالب است' }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: 'سفر من با ویو' },
  { id: 2, title: 'بلاگ‌نویسی با ویو' },
  { id: 3, title: 'چرا ویو خیلی جالب است' }
])
```

</div>

سپس نیاز داریم برای هر کدام یک کامپوننت render کنیم، با استفاده از `v-for`:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNp9UU1rhDAU/CtDLrawVfpxklRo74We2kPtQdaoaTUJ8bmtiP+9ia6uC2VBgjOZeXnz3sCejAkPnWAx4+3eSkNJqmRjtCU817p81S2hsLpBEEYL4Q1BqoBUid9Jmosi62rC4Nm9dn4lFLXxTGAt5dG482eeUXZ1vdxbQZ1VCwKM0zr3x4KBATKPcbsDSapFjOClx5d2JtHjR1KFN9fTsfbWcXdy+CZKqcqL+vuT/r3qvQqyRatRdMrpF/nn/DNhd7iPR+v8HCDRmDoj4RHxbfyUDjeFto8p8yEh1Rw2ZV4JxN+iP96FMvest8RTTws/gdmQ8HUr7ikere+yHduu62y//y3NWG38xIOpeODyXcoE8OohGYZ5VhhHHjl83sD4B3XgyGI=)

</div>
<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNp9kU9PhDAUxL/KpBfWBCH+OZEuid5N9qSHrQezFKhC27RlDSF8d1tYQBP1+N78OpN5HciD1sm54yQj1J6M0A6Wu07nTIpWK+MwwPASI0qjWkQejVbpsVHVQVl30ZJ0WQRHjwFMnpT0gPZLi32w2h2DMEAUGW5iOOEaniF66vGuOiN5j0/hajx7B4zxxt5ubIiphKz+IO828qXugw5hYRXKTnqSydcrJmk61/VF/eB4q5s3x8Pk6FJjauDO16Uye0ZCBwg5d2EkkED2wfuLlogibMOTbMpf9tMwP8jpeiMfRdM1l8Tk+/F++Y6Cl0Lyg1Ha7o7R5Bn9WwSg9X0+DPMxMI409fPP1PELlVmwdQ==)

</div>

توجه کنید که چطور از `v-bind` برای پاس دادن مقادیر پویای prop استفاده شده است. این ویژگی به خصوص زمانی مفید است که از قبل نمی‌دانید دقیقاً چه محتوایی قرار است render شود.

تنها چیزی که در حال حاضر دربارهٔ props نیاز دارید همین است، اما بعد از خواندن این صفحه و فهم محتوای آن، توصیه می‌کنیم بعداً برگردید و راهنمای کامل [props](/guide/components/props) را بخوانید.

## گوش دادن به رویدادها {#listening-to-events}

هنگام توسعه کامپوننت `<BlogPost>` خود، ممکن است برخی ویژگی‌ها نیازمند ارتباط بازگشتی با والد باشند. به عنوان مثال، ممکن است تصمیم بگیریم ویژگی برای بزرگ کردن متن پست‌های بلاگ اضافه کنیم، در حالی که بقیه صفحه با اندازه پیش‌فرض باقی می‌ماند.

در والد، می‌توانیم از این ویژگی با اضافه کردن یک پراپرتی <span class="options-api">data</span><span class="composition-api">ref</span> به نام `postFontSize` پشتیبانی کنیم:

<div class="options-api">

```js{6}
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}
```

</div>
<div class="composition-api">

```js{5}
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

</div>

که می‌تواند در تمپلیت برای کنترل اندازه فونت تمام پست‌های بلاگ استفاده شود:

```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

حالا یک دکمه به تمپلیت کامپوننت `<BlogPost>` اضافه می‌کنیم:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button> بزرگ کردن متن </button>
  </div>
</template>
```

دکمه هنوز کاری انجام نمی‌دهد - می‌خواهیم با کلیک روی دکمه به والد اطلاع دهیم که باید متن تمام پست‌ها را بزرگ کند. برای حل این مسئله، کامپوننت‌ها از یک سیستم رویدادهای سفارشی استفاده می‌کنند. والد می‌تواند انتخاب کند که به هر رویدادی روی نمونه کامپوننت فرزند با `v-on` یا `@` گوش دهد، دقیقاً مثل یک رویداد DOM:

```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

سپس کامپوننت فرزند می‌تواند با فراخوانی [متد درونی **`‎$emit`** ](/api/component-instance#emit) و پاس دادن نام رویداد، روی خودش یک رویداد emit کند:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')"> بزرگ کردن متن </button>
  </div>
</template>
```

به خاطر `listener @enlarge-text="postFontSize += 0.1"‎`, والد رویداد را دریافت خواهد کرد و مقدار `postFontSize` را به‌روزرسانی می‌کند.

<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNqNUsFOg0AQ/ZUJMaGNbbHqidCmmujNxMRED9IDhYWuhV0CQy0S/t1ZYIEmaiRkw8y8N/vmMZVxl6aLY8EM23ByP+Mprl3Bk1RmCPexjJ5ljhBmMgFzYemEIpiuAHAFOzXQgIVeESNUKutL4gsmMLfbBPStVFTP1Bl46E2mup4xLDKhI4CUsMR+1zFABTywYTkD5BgzG8ynEj4kkVgJnxz38Eqaut5jxvXAUCIiLqI/8TcD/m1fKhTwHHIJYSEIr+HbnqikPkqBL/yLSMs23eDooNexel8pQJaksYeMIgAn4EewcyxjtnKNCsK+zbgpXILJEnW30bCIN7ZTPcd5KDNqoWjARWufa+iyfWBlV13wYJRvJtWVJhiKGyZiL4vYHNkJO8wgaQVXi6UGr51+Ndq5LBqMvhyrH9eYGePtOVu3n3YozWSqFsBsVJmt3SzhzVaYY2nm9l82+7GX5zTGjlTM1SyNmy5SeX+7rqr2r0NdOxbFXWVXIEoBGz/m/oHIF0rB5Pz6KTV6aBOgEo7Vsn51ov4GgAAf2A==)

</div>
<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNp1Uk1PwkAQ/SuTxqQYgYp6ahaiJngzITHRA/UAZQor7W7TnaK16X93th8UEuHEvPdm5s3bls5Tmo4POTq+I0yYyZTAIOXpLFAySXVGUEKGEVQQZToBl6XukXqO9XahDbXc2OsAO5FlAIEKtWJByqCBqR01WFqiBLnxYTIEkhSjD+5rAV86zxQW8C1pB+88Aaphr73rtXbNVqrtBeV9r/zYFZYHacBoiHLFykB9Xgfq1NmLVvQmf7E1OGFaeE0anAMXhEkarwhtRWIjD+AbKmKcBk4JUdvtn8+6ARcTu87hLuCf6NJpSoDDKNIZj7BtIFUTUuB0tL/HomXHcnOC18d1TF305COqeJVtcUT4Q62mtzSF2/GkE8/E8b1qh8Ljw/if8I7nOkPn9En/+Ug2GEmFi0ynZrB0azOujbfB54kki5+aqumL8bING28Yr4xh+2vePrI39CnuHmZl2TwwVJXwuG6ZdU6kFTyGsQz33HyFvH5wvvyaB80bACwgvKbrYgLVH979DQc=)

</div>

می‌توانیم رویدادهای emit شده را به طور اختیاری با استفاده از <span class="options-api">emits option</span><span class="composition-api">ماکرو [`defineEmits`](/api/sfc-script-setup#defineprops-defineemits)</span> اعلام کنیم:

<div class="options-api">

```vue{5}
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```

</div>
<div class="composition-api">

```vue{4}
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

</div>

این، همه رویدادهایی را که یک کامپوننت emit می‌کند مستندسازی می‌کند و اختیاراً آن‌ها را [اعتبارسنجی](/guide/components/events#events-validation) می‌کند. همچنین به Vue اجازه می‌دهد از اعمال ضمنی آن‌ها به عنوان listener های ساختگی روی المان ریشه کامپوننت فرزند خودداری کند.

<div class="composition-api">

مشابه `defineEmits` ، `defineProps` تنها در `<script setup>` قابل استفاده است و نیازی به import کردن ندارد. این یک تابع `emit` برمی‌گرداند که معادل متد `‎$emit` است. می‌توان از آن برای emit کردن رویدادها در بخش `<script setup>` یک کامپوننت استفاده کرد، جایی که `‎$emit` به طور مستقیم قابل دسترسی نیست:

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

همچنین ببینید: [Typing Component Emits](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

اگر از `<script setup>` استفاده نمی‌کنید، می‌توانید رویدادهای emit شده را با استفاده از گزینه `emits` اعلام کنید. می‌توانید به تابع `emit` به عنوان یک property از context setup دسترسی داشته باشید (به عنوان آرگومان دوم به `setup()‎` پاس داده می‌شود):

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

این همه چیزی است که در حال حاضر در مورد رویدادهای سفارشی کامپوننت نیاز دارید، اما بعد از خواندن این صفحه و فهم محتوای آن، توصیه می‌کنیم برگردید و راهنمای کامل [Custom Events](/guide/components/events) را بخوانید.

## انتقال محتوا با slots {#content-distribution-with-slots}

همانند المان‌های HTML، اغلب مفید است بتوان محتوایی را به یک کامپوننت پاس داد، مانند:

```vue-html
<AlertBox>
  اتفاق بدی افتاده است.
</AlertBox>
```

که ممکن است چیزی شبیه این را render کند:

:::danger این یک خطا برای اهداف نمایشی است
اتفاق بدی افتاده است.
:::

این کار با استفاده از المان سفارشی `<slot>` در Vue امکان‌پذیر است:

```vue{4}
<template>
  <div class="alert-box">
    <strong>این یک خطا برای اهداف نمایشی است</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

همانطور که بالا می‌بینید، از `<slot>` به عنوان placeholder جایی که می‌خواهیم محتوا قرار بگیرد استفاده می‌کنیم - و همین! کارمان تمام شد!

<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNpVUcFOwzAM/RUTDruwFhCaUCmThsQXcO0lbbKtIo0jx52Kpv07TreWouTynl+en52z2oWQnXqrClXGhtrA28q3XUBi2DlL/IED7Ak7WGX5RKQHq8oDVN4Oo9TYve4dwzmxDcp7bz3HAs5/LpfKyy3zuY0Atl1wmm1CXE5SQeLNX9hZPrb+ALU2cNQhWG9NNkrnLKIt89lGPahlyDTVogVAadoTNE7H+F4pnZTrGodKjUUpRyb0h+0nEdKdRL3CW7GmfNY5ZLiiMhfP/ynG0SL/OAuxwWCNMNncbVqSQyrgfrPZvCVcIxkrxFMYIKJrDZA1i8qatGl72ehLGEY6aGNkNwU8P96YWjffB8Lem/Xkvn9NR6qy+fRd14FSgopvmtQmzTT9Toq9VZdfIpa5jQ==)

</div>
<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNpVUEtOwzAQvcpgFt3QBBCqUAiRisQJ2GbjxG4a4Xis8aQKqnp37PyUyqv3mZn3fBVH55JLr0Umcl9T6xi85t4VpW07h8RwNJr4Cwc4EXawS9KFiGO70ubpNBcmAmDdOSNZR8T5Yg0IoOQf7DSfW9tAJRWcpXPaapWM1nVt8ObpukY8ie29GHNzAiBX7QVqI73/LIWMzn2FQylGMcieCW1TfBMhPYSoE5zFitLVZ5BhQnkadt6nGKt5/jMafI1Oq8Ak6zW4xrEaDVIGj4fD4SPiCknpQLy4ATyaVgFptVH2JFXb+wze3DDSTioV/iaD1+eZqWT92xD2Vu2X7af3+IJ6G7/UToVigpJnTzwTO42eWDnELsTtH/wUqH4=)

</div>

این همه‌ی چیزی است که در حال حاضر دربارهٔ slots نیاز دارید، امّا بعد از خواندن این صفحه و فهم محتوای آن، توصیه می‌کنیم بعداً برگردید و راهنمای کامل [slots](/guide/components/slots) را بخوانید.

## کامپوننت‌های پویا {#dynamic-components}

گاهی اوقات مفید است که به صورت پویا بین کامپوننت‌ها سوئیچ کنیم، مثلا در یک رابط کاربری تَب بندی شده:

<div class="options-api">

[مثال را در Playground باز کنید](https://play.vuejs.org/#eNqNVE2PmzAQ/Ssj9kArLSHbrXpwk1X31mMPvS17cIxJrICNbJMmivLfO/7AEG2jRiDkefP85sNmztlr3y8OA89ItjJMi96+VFJ0vdIWfqqOQ6NVB/midIYj5sn9Sxlrkt9b14RXzXbiMElEO5IAKsmPnljzhg6thbNDmcLdkktrSADAJ/IYlj5MXEc9Z1w8VFNLP30ed2luBy1HC4UHrVH2N90QyJ1kHnUALN1gtLeIQu6juEUMkb8H5sXHqiS+qzK1Cw3Lu76llqMFsKrFAVhLjVlXWc07VWUeR89msFbhhhAWDkWjNJIwPgjp06iy5CV7fgrOOTgKv+XoKIIgpnoGyiymSmZ1wnq9dqJweZ8p/GCtYHtUmBMdLXFitgDnc9ju68b0yxDO1WzRTEcFRLiUJsEqSw3wwi+rMpFDj0psEq5W5ax1aBp7at1y4foWzq5R0hYN7UR7ImCoNIXhWjTfnW+jdM01gaf+CEa1ooYHzvnMVWhaiwEP90t/9HBP61rILQJL3POMHw93VG+FLKzqUYx3c2yjsOaOwNeRO2B8zKHlzBKQWJNH1YHrplV/iiMBOliFILYNK5mOKdSTMviGCTyNojFdTKBoeWNT3s8f/Vpsd7cIV61gjHkXnotR6OqVkJbrQKdsv9VqkDWBh2bpnn8VXaDcHPexE4wFzsojO9eDUOSVPF+65wN/EW7sHRsi5XaFqaexn+EH9Xcpe8zG2eWG3O0/NVzUaeJMk+jGhUXlNPXulw5j8w7t2bi8X32cuf/Vv/wF/SL98A==)

</div>
<div class="composition-api">

[مثال را در Playground باز کنید](https://play.vuejs.org/#eNqNVMGOmzAQ/ZURe2BXCiHbrXpwk1X31mMPvS1V5RiTWAEb2SZNhPLvHdvggLZRE6TIM/P8/N5gpk/e2nZ57HhCkrVhWrQWDLdd+1pI0bRKW/iuGg6VVg2ky9wFDp7G8g9lrIl1H80Bb5rtxfFKMcRzUA+aV3AZQKEEhWRKGgus05pL+5NuYeNwj6mTkT4VckRYujVY63GT17twC6/Fr4YjC3kp5DoPNtEgBpY3bU0txwhgXYojsJoasymSkjeqSHweK9vOWoUbXIC/Y1YpjaDH3wt39hMI6TUUSYSQAz8jArPT5Mj+nmIhC6zpAu1TZlEhmXndbBwpXH5NGL6xWrADMsyaMj1lkAzQ92E7mvYe8nCcM24xZApbL5ECiHCSnP73KyseGnvh6V/XedwS2pVjv3C1ziddxNDYc+2WS9fC8E4qJW1W0UbUZwKGSpMZrkX11dW2SpdcE3huT2BULUp44JxPSpmmpegMgU/tyadbWpZC7jCxwj0v+OfTDdU7ITOrWiTjzTS3Vei8IfB5xHZ4PmqoObMEJHryWXXkuqrVn+xEgHZWYRKbh06uLyv4iQq+oIDnkXSQiwKymlc26n75WNdit78FmLWCMeZL+GKMwlKrhLRcBzhlh51WnSwJPFQr9/zLdIZ007w/O6bR4MQe2bseBJMzer5yzwf8MtzbOzYMkNsOY0+HfoZv1d+lZJGMg8fNqdsfbbio4b77uRVv7I0Li8xxZN1PHWbeHdyTWXc/+zgw/8t/+QsROe9h)

</div>

مورد بالا با استفاده از المان `<component>` و ویژگی `is` در Vue امکان‌پذیر است:

<div class="options-api">

```vue-html
<!-- کامپوننت تغییر می‌کند currentTab هنگام تغییر -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- کامپوننت تغییر می‌کند currentTab هنگام تغییر -->
<component :is="tabs[currentTab]"></component>
```

</div>

در مثال بالا، مقدار پاس داده شده به `‎:is` می‌تواند شامل یکی از موارد زیر باشد:

- نام یک کامپوننت ثبت شده به صورت یک رشته
- خود شی کامپوننت import شده

همچنین می‌توانید از ویژگی `is` برای ساخت المان‌های HTML معمولی استفاده کنید.

هنگام سوئیچ کردن بین چند کامپوننت با `‎<component :is="...">‎`، هنگامی که کامپوننت از آن جدا شود، آن کامپوننت unmount می‌شود. می‌توانیم با استفاده از [کامپوننت `<KeepAlive>`](/guide/built-ins/keep-alive)، کامپوننت‌های غیرفعال را وادار کنیم که «زنده» بمانند.

## محدودیت‌های تجزیه تمپلیت در DOM {#in-dom-template-parsing-caveats}

اگر تمپلیت‌های Vue را مستقیماً در DOM می‌نویسید، Vue باید string تمپلیت را از DOM بازیابی کند. این موضوع به دلیل رفتار پارسر HTML مرورگرها، منجر به چند محدودیت می‌شود.

:::tip نکته
لازم به ذکر است محدودیت‌هایی که در زیر این بخش می‌گوییم، فقط زمانی اعمال می‌شوند که تمپلیت‌ها را مستقیماً در DOM می‌نویسید. آن‌ها در موارد زیر اعمال نمی‌شوند:

- کامپوننت تک فایلی - Single-File Component (SFC)
- رشته تمپلیت تک‌خطی (مثلاً `template: '...'‎`)
- `<script type="text/x-template"‎>`
  :::

### عدم حساسیت بین حروف بزرگ و کوچک | Case Insensitivity {#case-insensitivity}

تگ‌ها و ویژگی‌های HTML غیر حساس به بزرگی و کوچکی حروف هستند، بنابراین مرورگرها هر حرف بزرگی را به صورت حرف کوچک تفسیر می‌کنند. این بدان معناست که وقتی از تمپلیت‌های درون DOM استفاده می‌کنید، نام‌های کامپوننت‌های PascalCase و نام‌های propهای camelCase یا رویدادهای `v-on` باید از معادل‌های kebab-case (با - جدا شده) خود استفاده کنید:

```js
// در جاوااسکریپت camelCase
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```vue-html
<!-- HTML در kebab-case -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

### تگ‌های تکی | Self Closing Tags {#self-closing-tags}

در نمونه کدهای قبلی از تگ‌های تکی (self-closing tags بصورت یک تگ نوشته می‌شوند) برای کامپوننت‌ها استفاده کرده‌ایم:

```vue-html
<MyComponent />
```

این به این دلیل است که پارسر تمپلیت Vue، عبارت `‎/>‎` را به عنوان نشانه‌ای برای پایان هر نوع تگ، صرف‌نظر از نوع آن، رعایت می‌کند. می‌کند.

اما در تمپلیت‌های درون DOM، همیشه باید از تگ‌های بسته‌شده بصورت صریح استفاده کنیم:

```vue-html
<my-component></my-component>
```

زیرا HTML فقط اجازه می‌دهد [چند المان خاص](https://html.spec.whatwg.org/multipage/syntax.html#void-elements) تگ‌های بسته‌شده خود را حذف کنند که معمول‌ترین آن‌ها `<input>` و `<img>` هستند. برای تمام المان‌های دیگر، اگر تگ بسته‌شده را حذف کنید، پارسر HTML تصور می‌کند شما هرگز تگ بازشده را نبسته‌اید.

```vue-html
<my-component /> <!-- قصد داریم تگ را اینجا ببندیم -->
<span>hello</span>
```

به این صورت پارس می‌شود:

```vue-html
<my-component>
  <span>hello</span>
</my-component> <!-- اما مرورگر آن را اینجا می‌بندد -->
```

### محدودیت‌های قرارگیری المان | Element Placement Restrictions {#element-placement-restrictions}

برخی المان‌های HTML مانند `‎<ul>‎`، `‎<ol>‎`، `‎<table>‎` و `‎<select>‎` محدودیت‌هایی در مورد المان‌هایی که می‌توانند درون آن‌ها قرار بگیرند دارند، و برخی المان‌ها مانند `‎<li>‎`، `‎<tr>‎` و `‎<option>‎` فقط می‌توانند درون المان‌های خاص دیگری قرار بگیرند.

این موضوع منجر به مشکلاتی هنگام استفاده از کامپوننت‌ها با المان‌هایی که چنین محدودیت‌هایی دارند، می‌شود. به عنوان مثال:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

کامپوننت سفارشی `<blog-post-row>` به عنوان محتوای نامعتبر خارج خواهد شد که منجر به خطا در خروجی render شده نهایی می‌شود. می‌توانیم از [ویژگی `is`](/api/built-in-special-attributes#is) به عنوان راه‌حل استفاده کنیم:

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip نکته
هنگام استفاده روی المان‌های HTML ساختگی، مقدار `is` باید با پیشوند `vue:‎` شروع شود تا به عنوان یک کامپوننت Vue تفسیر شود. این کار برای اجتناب از ابهام با [عناصر ساختگی سفارشی HTML](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) لازم است.
:::

این همه چیزی است که در حال حاضر در مورد محدودیت‌های پارس تمپلیت در DOM نیاز دارید - و در واقع پایان بخش _مبانی Vue_. تبریک می‌گوییم! هنوز مطالب بیشتری برای یادگیری وجود دارد، اما ابتدا توصیه می‌کنیم متوقف شوید و با Vue کدنویسی کنید - چیز جالبی بسازید یا برخی از [مثال‌ها](/examples/) را بررسی کنید، اگر هنوز آنها را ندیده‌اید.

وقتی احساس راحتی با دانشی که هضم کرده‌اید می‌کنید، با عمق بیشتری به یادگیری در مورد کامپوننت‌ها ادامه دهید.
