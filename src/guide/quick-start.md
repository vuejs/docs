---
footer: false
---

# شروع سریع {#quick-start}

## امتحان Vue بصورت آنلاین {#try-vue-online}

- برای اینکه بتوانید به سرعت Vue را امتحان کنید، می‌توانید آن را مستقیماً در [Playground](https://play.vuejs.org/#eNo9jcEKwjAMhl/lt5fpQYfXUQfefAMvvRQbddC1pUuHUPrudg4HIcmXjyRZXEM4zYlEJ+T0iEPgXjn6BB8Zhp46WUZWDjCa9f6w9kAkTtH9CRinV4fmRtZ63H20Ztesqiylphqy3R5UYBqD1UyVAPk+9zkvV1CKbCv9poMLiTEfR2/IXpSoXomqZLtti/IFwVtA9A==) ما امتحان کنید.

- اگر ترجیح می‌دهید یک راه‌اندازی HTML ساده بدون هیچ مراحل ساختی داشته باشید، می‌توانید از [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) به عنوان نقطه شروع خود استفاده کنید.

- اگر شما از قبل با Node.js و مفهوم ابزارهای ساخت آشنا هستید، می‌توانید یک تنظیم کامل ساخت را مستقیماً در مرورگر خود با [StackBlitz](https://vite.new/vue) امتحان کنید.

## ایجاد یک برنامه Vue {#creating-a-vue-application}

:::tip پیش‌نیازها

- آشنایی با خط فرمان (command line)
- نصب [Node.js](https://nodejs.org/) نسخه 16.0 یا بالاتر
  :::

در این بخش به ایجاد اولیه یک برنامه تک صفحه‌ای Vue بر روی ماشین محلی خود می‌پردازیم ([Single Page Application](/guide/extras/ways-of-using-vue#single-page-application-spa)). پروژه ایجاد شده از یک ابزار راه اندازی ساخت مبتنی بر [Vite](https://vitejs.dev) استفاده خواهد کرد و به ما امکان می‌دهد از [کامپوننت‌های تک فایلی](/guide/scaling-up/sfc) Vue استفاده کنیم  (SFCs).

اطمینان حاصل کنید که شما یک نسخه به‌روز از [Node.js](https://nodejs.org/)  را بصورت نصب شده دارید و دایرکتوری فعلی شما همان جایی است که قصد ایجاد یک پروژه جدید را دارید. دستور زیر را در خط فرمان خود اجرا کنید (بدون علامت `<`): 

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm create vue@latest</span></span></code></pre></div>

این دستور ابزار رسمی ایجاد اولیه پروژه Vue به نام [create-vue](https://github.com/vuejs/create-vue) را نصب و اجرا خواهد کرد. شما با گزینه‌هایی برای قابلیت‌های اختیاری مختلف مانند پشتیبانی از TypeScript و تست نویسی روبرو خواهید شد:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add an End-to-End Testing Solution? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Cypress / Playwright</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

اگر در مورد یک گزینه مطمئن نیستید، فعلاً با زدن enter برای انتخاب `No` آن را نادیده بگیرید. وقتی پروژه ایجاد شد، دستورالعمل‌های زیر را برای نصب وابستگی‌ها و راه‌اندازی dev server دنبال کنید:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

حالا شما باید اولین پروژه Vue خود را بصورت اجرا شده داشته باشید! توجه داشته باشید که کامپوننت‌های نمونه در پروژه ایجاد شده با استفاده از [Composition API](/guide/introduction#composition-api) و `<script setup>` نوشته شده‌اند، به جای [Options API](/guide/introduction#options-api). چند نکته بیشتر:

- IDE توصیه شده [Visual Studio Code](https://code.visualstudio.com/) + [افزونه Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) است. اگر از ویرایشگرهای دیگر استفاده می‌کنید، بخش [پشتیبانی IDE](/guide/scaling-up/tooling#ide-support) را بررسی کنید.
- جزئیات بیشتر ابزار، از جمله یکپارچه‌سازی با فریم‌ورک‌های بک‌اند، در [راهنمای ابزارها](/guide/scaling-up/tooling) مورد بحث قرار گرفته.
- برای یادگیری بیشتر در مورد ابزار ساخت پایه Vite، [مستندات Vite](https://vitejs.dev) را بررسی کنید.
- اگر TypeScript را انتخاب کردید، [راهنمای استفاده از TypeScript](typescript/overview) را بررسی کنید.

هنگامی که آماده ارسال برنامه خود به پروداکشن هستید، کامند زیر را اجرا کنید:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

این کار یک بیلد آماده برای محیط پروداکشن در دایرکتوری `‎./dist` پروژه شما ایجاد خواهد کرد. [راهنمای استقرار پروداکشن](/guide/best-practices/production-deployment) را برای یادگیری بیشتر در مورد ارسال برنامه خود به پروداکشن بررسی کنید.

[مراحل بعدی >](#next-steps)

## استفاده از Vue از طریق CDN {#using-vue-from-cdn}

شما می‌توانید مستقیماً از Vue از طریق یک تگ script استفاده کنید:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

اینجا از [unpkg](https://unpkg.com/) استفاده کردیم، اما شما همچنین می‌توانید از هر CDN دیگری که بسته‌های npm را ارائه می‌دهد مثل [jsdelivr](https://www.jsdelivr.com/package/npm/vue) یا [cdnjs](https://cdnjs.com/libraries/vue) استفاده کنید. البته، شما همچنین می‌توانید این فایل را دانلود و خودتان سرو کنید.

هنگام استفاده از Vue از طریق CDN، هیچ مرحله‌ای برای بیلد گرفتن وجود ندارد. این موضوع تنظیمات را بسیار ساده‌تر می‌کند، و برای بهبود HTML ایستا یا یکپارچه‌سازی با یک فریم‌ورک بک‌اند مناسب است. با این حال، شما نمی‌توانید از سینتکس کامپوننت تک فایلی (SFC) استفاده کنید.

### استفاده از بیلد سراسری {#using-the-global-build}

لینک بالا بیلد سراسری ویو را بارگذاری می‌کند که در آن تمام API‌های سطح بالا به عنوان خاصیت‌هایی روی شی سراسری `Vue` در دسترس هستند. اینجا یک نمونه کامل با استفاده از بیلد سراسری است:

<div class="options-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[نمونه در Codepen](https://codepen.io/vuejs-examples/pen/QWJwJLp)

</div>

<div class="composition-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[نمونه در Codepen](https://codepen.io/vuejs-examples/pen/eYQpQEG)

:::tip نکته
بسیاری از نمونه‌های Composition API در سراسر راهنما از سینتکس `<script setup>` استفاده خواهند کرد که نیاز به ابزارهای ساخت دارد. اگر قصد استفاده از Composition API بدون مرحله ساخت را دارید، استفاده از [گزینه `setup()‎`](/api/composition-api-setup) را مشاهده کنید.
:::

</div>

### استفاده از بیلد ES Module {#using-the-es-module-build}

در بقیه مستندات، ما عمدتاً از سینتکس [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) استفاده خواهیم کرد. اکثر مرورگرهای مدرن اکنون بطور بومی از ES modules پشتیبانی می‌کنند، بنابراین می‌توانیم از Vue از طریق CDN با استفاده از ES modules بومی مانند این استفاده کنیم:

<div class="options-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

</div>

<div class="composition-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

</div>

توجه کنید که از `<script type="module"‎>` استفاده می‌کنیم، و URL وارد شده CDN به مکان بیلد **ES modules** برای Vue اشاره دارد.

<div class="options-api">

[نمونه در Codepen](https://codepen.io/vuejs-examples/pen/VwVYVZO)

</div>
<div class="composition-api">

[نمونه در Codepen](https://codepen.io/vuejs-examples/pen/MWzazEv)

</div>

### فعال کردن Import maps {#enabling-import-maps}

در مثال بالا، ما URL کامل CDN را وارد می‌کنیم، اما در بقیه مستندات شما کدی مانند این خواهید دید:

```js
import { createApp } from 'vue'
```

ما می‌توانیم به مرورگر بگوییم که `vue` را از کجا وارد کند با استفاده از [Import Maps](https://caniuse.com/import-maps):

<div class="options-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[نمونه در Codepen](https://codepen.io/vuejs-examples/pen/wvQKQyM)

</div>

<div class="composition-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[نمونه در Codepen](https://codepen.io/vuejs-examples/pen/YzRyRYM)

</div>

شما همچنین می‌توانید ورودی‌هایی برای سایر وابستگی‌ها به import map اضافه کنید - اما مطمئن شوید آن‌ها به نسخه ES modules کتابخانه‌ای که قصد استفاده از آن را دارید اشاره می‌کنند.

:::tip پشتیبانی مرورگر از Import Maps
Import Maps یک ویژگی نسبتاً جدید مرورگر است. مطمئن شوید از یک مرورگر در محدوده پشتیبانی آن استفاده می‌کنید. به طور خاص، تنها در Safari 16.4+ پشتیبانی می‌شود.
:::

:::warning نکاتی درباره استفاده در محیط پروداکشن
نمونه‌های تا اینجا از بیلد مناسب برای محیط توسعه Vue استفاده کرده‌اند - اگر قصد دارید از ویو از طریق CDN در محیط پروداکشن استفاده کنید، حتماً [راهنمای استقرار پروداکشن](/guide/best-practices/production-deployment#without-build-tools) را بررسی کنید.
:::

### تفکیک ماژول‌ها {#splitting-up-the-modules}

هنگامی که عمیق‌تر به درون راهنما می‌رویم، ممکن است نیاز داشته باشیم کدمان را به فایل‌های JavaScript جداگانه‌ای تقسیم کنیم تا مدیریت آن‌ها آسان‌تر شود. برای مثال:

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

<div class="options-api">

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}
```

</div>
<div class="composition-api">

```js
// my-component.js
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>count is {{ count }}</div>`
}
```

</div>

اگر `index.html` بالا را مستقیماً در مرورگر باز کنید، متوجه خواهید شد که خطایی رخ می‌دهد زیرا ماژول‌های ES نمی‌توانند روی پروتکل `file://‎` کار کنند که مرورگرها هنگام باز کردن یک فایل محلی از آن استفاده می‌کنند.

به دلایل امنیتی، ماژول‌های ES تنها می‌توانند روی پروتکل `http://‎` کار کنند که مرورگرها هنگام باز کردن صفحات در وب از آن استفاده می‌کنند. برای اینکه ماژول‌های ES بر روی ماشین محلی ما کار کنند، نیاز داریم که `index.html` را از طریق پروتکل `http://‎` سرو کنیم، با استفاده از یک سرور HTTP محلی.

برای راه‌اندازی یک سرور HTTP محلی، ابتدا مطمئن شوید [Node.js](https://nodejs.org/en/) نصب شده است، سپس `npx serve` را از خط فرمان در همان دایرکتوری حاوی فایل HTML خود اجرا کنید. همچنین می‌توانید از هر سرور HTTP دیگری که بتواند فایل‌های ایستا را با انواع MIME صحیح سرو کند، استفاده نمایید.

شاید متوجه شده باشید که قالب کامپوننت وارد شده به صورت یک رشته JavaScript درون خطی شده است. اگر از VSCode استفاده می‌کنید، می‌توانید افزونه [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) را نصب کرده و رشته‌ها را با یک توضیح `/*html*/` پیشوند دهید تا برای آن‌ها هایلایت سینتکس فعال شود.

## مراحل بعدی {#next-steps}

اگر از [معرفی](/guide/introduction) صرف‌نظر کردید، توصیه می‌کنیم قبل از حرکت به بقیه مستندات آن را بخوانید.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">ادامه با راهنما</p>
    <p class="next-steps-caption"> راهنما شما را به تمام جنبه‌های فریمورک با جزئیات کامل هدایت می‌کند. </p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link"> آموزش‌ها را امتحان کنید </p>
    <p class="next-steps-caption"> برای کسانی که یادگیری عملی را ترجیح می‌دهند. </p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">مشاهده نمونه‌ها</p>
    <p class="next-steps-caption"> نمونه‌هایی از ویژگی‌های اصلی و کارهای معمول UI را کاوش کنید. </p>
  </a>
</div>
