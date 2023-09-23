---
footer: false
---

# مقدمه {#introduction}

:::info شما در حال مطالعه مستندات Vue 3 هستید!

- پشتیبانی از Vue 2 در تاریخ Dec 31, 2023 پایان می یابد. اطلاعات بیشتر [Vue 2 Extended LTS](https://v2.vuejs.org/lts/).
- مستندات Vue 2 منتقل شده به [v2.vuejs.org](https://v2.vuejs.org/).
- اطلاعات بیشتر جهت ارتقا از Vue 2 [Migration Guide](https://v3-migration.vuejs.org/).
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">یادگیری Vue در <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## چیست Vue؟ {#what-is-vue}

Vue (که مانند واژه "view" خوانده می‌شود) یک فریمورک جاوا اسکریپت برای ساخت رابط کاربری است. این فریمورک بر بالای استانداردهای HTML، CSS و جاوا اسکریپت ساخته شده و یک مدل برنامه‌نویسی اعلامی و مبتنی بر کامپوننت را فراهم می‌کند که به شما کمک می‌کند به طور کارآمد رابط کاربری را توسعه دهید، چه ساده باشد یا پیچیده.

در اینجا یک نمونه ساده آورده شده است:

<div class="options-api">

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

</div>
<div class="composition-api">

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

</div>

```vue-html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

**نتیجه**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>

نمونه فوق دو ویژگی اصلی Vue را نشان می‌دهد:

- **Declarative Rendering**: Vue با افزودن یک سینتکس قالب به HTML استاندارد، به ما امکان می‌دهد تا خروجی HTML را بر اساس وضعیت جاوا اسکریپت به صورت اعلامی توصیف کنیم.

- **Reactivity**: Vue به طور خودکار تغییرات وضعیت جاوا اسکریپت را پیگیری می‌کند و هنگامی که تغییرات رخ می‌دهد، به طور کارآمد DOM را به‌روز می‌کند.

شما ممکن است هم اکنون سوالاتی داشته باشید - نگران نباشید. ما در بقیه مستندات، هر جزئی را پوشش خواهیم داد. اکنون، لطفاً ادامه دهید تا متوجه سطح بالایی از آنچه Vue ارائه می‌دهد شوید.

:::tip پیش‌نیازها
بقیه مستندات فرض می‌کند که شما با HTML، CSS و جاوا اسکریپت آشنایی ابتدایی دارید. اگر کاملاً به توسعه فرانت‌اند جدید هستید، ممکن است بهترین ایده نباشد که مستقیماً با یک فریمورک شروع کنید - ابتدا مبانی را فهمیده و سپس برگردید! شما می‌توانید سطح دانش خود را با [مبانی جاوااسکریپت](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) ارتقا بدهید. تجربه قبلی با فریمورک‌های دیگر کمک می‌کند، ولی الزامی نیست.

:::

## فریمورک پیش‌رونده {#the-progressive-framework}

Vue یک فریمورک و اکوسیستم است که بیشتر ویژگی‌های متداول مورد نیاز در توسعه فرانت‌اند را پوشش می‌دهد. اما وب بسیار متنوع است - چیزهایی که ما روی وب می‌سازیم ممکن است از نظر شکل و مقیاس به طور جدی متفاوت باشد. با این نظر، Vue طراحی شده است تا مرن و به صورت گام‌به‌گام قابل پذیرش باشد. بسته به مورد استفاده شما، Vue می‌تواند به روش‌های مختلفی استفاده شود:

- افزایش قابلیت HTML استاتیک بدون گام ساخت و ساز
- جاسازی به عنوان وب کامپوننت‌ها در هر صفحه
- برنامه تک صفحه‌ای (SPA)
- فول‌استک / رندر سمت سرور (SSR)
- Jamstack / تولید سایت استاتیک (SSG)
- برای دسکتاپ، موبایل، WebGL و حتی ترمینال

اگر این مفاهیم را تهدیدآمیز می‌یابید، نگران نباشید! آموزش و راهنما فقط به دانش ابتدایی HTML و جاوا اسکریپت نیاز دارند و شما باید بتوانید بدون اینکه در هیچ یک از این موارد متخصص باشید، پیگیری کنید.

اگر شما یک توسعه‌دهنده با تجربه هستید که به دنبال راه بهترین ادغام Vue در مجموعه‌ی تکنولوژی‌های خود هستید، یا کنجکاو هستید که معنی این واژگان چیست، ما در مورد آنها به تفصیل بحث می‌کنیم در [روش های استفاده مختلف از Vue](/guide/extras/ways-of-using-vue).

علیرغم این انعطاف‌پذیری، دانش اصلی در مورد نحوه کارکرد Vue در تمام این موارد استفاده مشترک است. حتی اگر شما هم‌اکنون فقط یک مبتدی هستید، دانشی که در طول مسیر به دست می‌آورید در آینده، هنگامی که با هدف‌های بلندپروازانه‌تر مواجه می‌شوید، مفید خواهد بود. اگر شما یک کارآزموده هستید، می‌توانید راه بهینه برای استفاده از Vue را بر اساس مشکلاتی که سعی دارید حل کنید انتخاب کنید، در حالی که همان بهره‌وری را حفظ می‌کنید. به همین دلیل است که ما Vue را "فریمورک پیشرو" می‌نامیم: این یک فریمورک است که می‌تواند با شما رشد کند و به نیازهای شما واکنش نشان دهد.

## Single-File Components {#single-file-components}

در بیشتر پروژه‌های Vue که از ابزار ساخت استفاده می‌کنند، ما کامپوننت‌های Vue را با استفاده از یک فرمت فایل شبیه به HTML به نام **Single-File Components** نوشته‌ایم (همچنین به نام فایل‌های ‍‍`*.vue` شناخته شده و به اختصار SFC نامیده می‌شود). یک SFC Vue، همان‌طور که از نام آن پیداست، منطق کامپوننت (جاوا اسکریپت)، قالب (HTML) و سبک‌ها (CSS) را در یک فایل جمع‌آوری می‌کند. در اینجا نمونه قبلی است که به فرمت SFC نوشته شده است:

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
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>

SFC یک ویژگی معین‌کننده در Vue است و روش پیشنهادی برای نوشتن کامپوننت‌های Vue است **اگر** مورد استفاده شما نیاز به یک تنظیمات Build داشته باشد. شما می‌توانید بیشتر در مورد آن بیاموزید [چگونگی و چرای SFC](/guide/scaling-up/sfc) اما برای حال، فقط بدانید که Vue تمام تنظیمات Build را برای شما انجام می‌دهد.

## استایل API {#api-styles}

کامپوننت‌های Vue می‌توانند با دو سبک API مختلف نوشته شوند: **Options API** و **Composition API**.

### Options API {#options-api}

با استفاده از API, ما منطق یک کامپوننت را با استفاده از یک شیء از گزینه‌ها تعریف می‌کنیم مانند `data`, `methods`, و `mounted`. ویژگی‌هایی که توسط گزینه‌ها تعریف شده‌اند، در داخل `this` قرار داده شده‌اند، که به نمونه کامپوننت اشاره دارد:

```vue
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[امتحان کنید](https://play.vuejs.org/#eNptkMFqxCAQhl9lkB522ZL0HNKlpa/Qo4e1ZpLIGhUdl5bgu9es2eSyIMio833zO7NP56pbRNawNkivHJ25wV9nPUGHvYiaYOYGoK7Bo5CkbgiBBOFy2AkSh2N5APmeojePCkDaaKiBt1KnZUuv3Ky0PppMsyYAjYJgigu0oEGYDsirYUAP0WULhqVrQhptF5qHQhnpcUJD+wyQaSpUd/Xp9NysVY/yT2qE0dprIS/vsds5Mg9mNVbaDofL94jZpUgJXUKBCvAy76ZUXY53CTd5tfX2k7kgnJzOCXIF0P5EImvgQ2olr++cbRE4O3+t6JxvXj0ptXVpye1tvbFY+ge/NJZt)

### Composition API {#composition-api}

با استفاده از API ترکیب، ما منطق یک کامپوننت را با استفاده از توابع API وارد شده تعریف می‌کنیم. در SFCها، معمولاً API ترکیب با [`<script setup>`](/api/sfc-script-setup) می‌شود استفاده. ویژگی setup یک نکته است که باعث می‌شود Vue تبدیل‌های زمان کامپایل را انجام دهد که به ما اجازه می‌دهد تا Composition API استفاده کنیم با استفاده از الگوهای کمتر. به عنوان مثال، وارد کردن متغیرها/توابع سطح بالا که در `<script setup>` اعلام شده‌اند، مستقیماً در قالب قابل استفاده هستند.

در اینجا همان کامپوننت است، با دقیقاً همان قالب، اما با استفاده از Composition API و `<script setup>` :

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[امتحان کنید](https://play.vuejs.org/#eNpNkMFqwzAQRH9lMYU4pNg9Bye09NxbjzrEVda2iLwS0spQjP69a+yYHnRYad7MaOfiw/tqSliciybqYDxDRE7+qsiM3gWGGQJ2r+DoyyVivEOGLrgRDkIdFCmqa1G0ms2EELllVKQdRQa9AHBZ+PLtuEm7RCKVd+ChZRjTQqwctHQHDqbvMUDyd7mKip4AGNIBRyQujzArgtW/mlqb8HRSlLcEazrUv9oiDM49xGGvXgp5uT5his5iZV1f3r4HFHvDprVbaxPhZf4XkKub/CDLaep1T7IhGRhHb6WoTADNT2KWpu/aGv24qGKvrIrr5+Z7hnneQnJu6hURvKl3ryL/ARrVkuI=)

### کدام را انتخاب کنیم؟ {#which-to-choose}

هر دو سبک API کاملاً قادر به پوشش موارد استفاده متداول هستند. آن‌ها واسط‌های متفاوتی هستند که توسط دقیقاً یک سیستم زیرین به قدرت می‌رسند. در واقع، Options API بر روی Composition API پیاده‌سازی شده است! مفاهیم اساسی و دانش در مورد Vue در دو سبک به اشتراک گذاشته شده است.

Options API به مفهوم "component instance" متمرکز است (که در مثال به عنوان ‍`this` دیده می‌شود)، که معمولاً برای کاربرانی که از زمینه‌های زبان OOP می‌آیند، بهتر با مدل ذهنی مبتنی بر کلاس تطابق دارد. همچنین با پنهان کردن جزئیات واکنش‌پذیری و اجبار به سازماندهی کد از طریق گروه‌های گزینه، برای مبتدیان دوستانه‌تر است.

Composition API به اعلام متغیرهای وضعیت واکنش‌پذیر مستقیماً در محدوده تابع و ترکیب وضعیت از چندین تابع با یکدیگر برای مدیریت پیچیدگی متمرکز است. این سبک آزادتر است و نیاز به درک این دارد که چگونه واکنش‌پذیری در Vue کار می‌کند تا به طور موثر استفاده شود. به عوض، انعطاف‌پذیری آن الگوهای قدرتمندتری را برای سازماندهی و استفاده مجدد از منطق فراهم می‌کند.

شما می‌توانید در مورد مقایسه بین دو سبک و مزایای بالقوه Composition API بیشتر بیاموزید در [سوالات متداول Composition API](/guide/extras/composition-api-faq).

اگر شما به Vue جدید هستید، در اینجا توصیه عمومی ما است:

- برای اهداف یادگیری، با سبکی که برایتان آسان‌تر به نظر می‌رسد پیش بروید. دوباره، بیشتر مفاهیم اصلی بین دو سبک به اشتراک گذاشته شده است. شما همیشه می‌توانید بعداً سبک دیگر را یاد بگیرید.

- برای استفاده در محیط پروداکشن:

  - اگر از ابزارهای ساخت و ساز استفاده نمی‌کنید، یا قصد دارید Vue را عمدتاً در سناریوهای کم‌پیچیدگی استفاده کنید، مثل بهبود تدریجی، با Options API پیش بروید.

  - اگر قصد دارید نرم‌افزارهای کامل با Vue بسازید، با Composition API + کامپوننت‌های Single-File پیش بروید.

شما در طول مرحله یادگیری نیازی به پایبندی به فقط یک سبک ندارید. بقیه اسناد مستندات نمونه‌های کد را در هر دو سبک (جایی که کاربردی باشد) ارائه خواهد داد، و شما می‌توانید در هر زمان با استفاده از کلید API در بالای نوار کناری سمت چپ بین Composition و Options جابجا شوید.

## هنوز سوالاتی دارید؟? {#still-got-questions}

به [سوالات متداول](/about/faq) ما سر بزنید.

## انتخاب مسیر یادگیری {#pick-your-learning-path}

توسعه‌دهندگان مختلف، سبک‌های متفاوتی در یادگیری دارند. بدون هیچ مشکلی مسیر یادگیری را انتخاب کنید که به سلیقه شما مناسب است - اگرچه ما توصیه می‌کنیم اگر امکان دارد، تمام محتوا را مطالعه کنید!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">این آموزش را امتحان کنید.</p>
    <p class="next-steps-caption">برای کسانی که ترجیح می‌دهند چیزها را به صورت عملی یاد بگیرند.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">راهنما را بخوانید.</p>
    <p class="next-steps-caption">راهنما شما را از هر جنبه‌ای از فریمورک با جزئیات کامل یاد می‌دهد.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">نمونه‌ها را بررسی کنید</p>
    <p class="next-steps-caption">نمونه‌های ویژگی‌های اصلی و وظایف رابط کاربری رایج را کاوش کنید.</p>
  </a>
</div>
