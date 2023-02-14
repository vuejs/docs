---
footer: false
---

# দ্রুত শুরু করার নির্দেশাবলী {#quick-start}

## Vue অনলাইন চেষ্টা করুন {#try-vue-online}

- দ্রুত Vue এর স্বাদ পেতে, আপনি এটি সরাসরি আমাদের এ চেষ্টা করতে পারেন [চেষ্টা করুন](https://sfc.vuejs.org/#eNo9j01qAzEMha+iapMWOjbdDm6gu96gG2/cjJJM8B+2nBaGuXvlpBMwtj4/JL234EfO6toIRzT1UObMexvpN6fCMNHRNc+w2AgwOXbPL/caoBC3EjcCCPU0wu6TvE/wlYqfnnZ3ae2PXHKMfiwQYArZOyYhAHN+2y9LnwLrarTQ7XeOuTFch5Am8u8WRbcoktGPbnzFOXS3Q3BZXWqKkuRmy/4L1eK4GbUoUTtbPDPnOmpdj4ee/1JVKictlSot8hxIUQ3Dd0k/lYoMtrglwfUPkXdoJg==).

- আপনি যদি কোনো বিল্ড স্টেপ ছাড়াই একটি প্লেইন HTML সেটআপ পছন্দ করেন, তাহলে আপনি এটি [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) আপনার শুরুর পয়েন্ট হিসেবে ব্যবহার করতে পারেন।

- আপনি যদি ইতিমধ্যেই Node.js এবং বিল্ড টুলের ধারণার সাথে পরিচিত হন, তাহলে আপনি [StackBlitz](https://vite.new/vue) এ আপনার ব্রাউজারের মধ্যেই একটি সম্পূর্ণ বিল্ড সেটআপ চেষ্টা করতে পারেন।

## Creating a Vue Application {#creating-a-vue-application}

:::tip পূর্বশর্ত

- কমান্ড লাইনের সাথে পরিচিতি
- [Node.js](https://nodejs.org/) 16.0 বা উচ্চতর সংস্করণ ইনস্টল করুন

:::

এই বিভাগে আমরা আপনার স্থানীয় মেশিনে কীভাবে একটি Vue [একক পৃষ্ঠা অ্যাপ্লিকেশন](/guide/extras/ways-of-using-vue.html#single-page-application-spa) ভারাবেন তা পরিচয় করিয়ে দেব। তৈরি করা প্রোজেক্টটি [Vite](https://vitejs.dev) এর উপর ভিত্তি করে একটি বিল্ড সেটআপ ব্যবহার করবে এবং আমাদের Vue [সিঙ্গেল-ফাইল কম্পোনেন্ট](/guide/scaling-up/sfc) (SFCs) ব্যবহার করার অনুমতি দেবে।

নিশ্চিত করুন যে আপনি [Node.js](https://nodejs.org/) এর একটি আপ-টু-ডেট সংস্করণ ইনস্টল করেছেন, তারপর আপনার কমান্ড লাইনে নিম্নলিখিত কমান্ডটি চালান (`>` চিহ্ন ছাড়া):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

এই কমান্ডটি [create-vue](https://github.com/vuejs/create-vue), অফিসিয়াল Vue প্রোজেক্ট স্ক্যাফোল্ডিং টুল ইনস্টল এবং কার্যকর করবে। টাইপস্ক্রিপ্ট এবং টেস্টিং সাপোর্টের মতো কয়েকটি ঐচ্ছিক বৈশিষ্ট্যের জন্য আপনাকে প্রম্পট দেওয়া হবে:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

আপনি যদি একটি বিকল্প সম্পর্কে অনিশ্চিত হন, তাহলে এখনকার জন্য এন্টার টিপে শুধু `No` নির্বাচন করুন। প্রকল্পটি তৈরি হয়ে গেলে, নির্ভরতা ইনস্টল করতে এবং ডেভ সার্ভার শুরু করতে নির্দেশাবলী অনুসরণ করুন:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

আপনি এখন আপনার প্রথম Vue প্রকল্প চলমান করা উচিত! মনে রাখবেন যে জেনারেট করা প্রকল্পের উদাহরণ উপাদানগুলি [Options API](/guide/introduction.html#options-api) এর পরিবর্তে [Composition API](/guide/introduction.html#composition-api) এবং `<script setup>` ব্যবহার করে লেখা হয়েছে। এখানে কিছু অতিরিক্ত টিপস আছে:

- প্রস্তাবিত IDE সেটআপ হল [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)। আপনি যদি অন্যান্য সম্পাদক ব্যবহার করেন তবে [IDE support section](/guide/scaling-up/tooling.html#ide-support) দেখুন।
- ব্যাকএন্ড ফ্রেমওয়ার্কের সাথে ইন্টিগ্রেশন সহ আরও টুলিং বিশদ [Tooling Guide](/guide/scaling-up/tooling.html) এ আলোচনা করা হয়েছে।
- অন্তর্নিহিত বিল্ড টুল Vite সম্পর্কে আরও জানতে, [Vite docs](https://vitejs.dev) দেখুন।
- আপনি যদি TypeScript ব্যবহার করতে চান তবে [TypeScript ব্যবহার নির্দেশিকা](typescript/overview.html) দেখুন।

আপনি যখন আপনার অ্যাপটিকে প্রোডাকশনে পাঠানোর জন্য প্রস্তুত হন, তখন নিম্নলিখিতটি চালান:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

এটি প্রোজেক্টের `./dist` ডিরেক্টরিতে আপনার অ্যাপের একটি প্রোডাকশন-রেডি বিল্ড তৈরি করবে। আপনার অ্যাপটিকে প্রোডাকশনে পাঠানোর বিষয়ে আরও জানতে [প্রোডাকশন ডিপ্লয়মেন্ট গাইড](/guide/best-practices/production-deployment.html) দেখুন।

[পরবর্তী ধাপ >](#next-steps)

## CDN থেকে Vue ব্যবহার করা {#using-vue-from-cdn}

আপনি একটি স্ক্রিপ্ট ট্যাগের মাধ্যমে সরাসরি CDN থেকে Vue ব্যবহার করতে পারেন:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

এখানে আমরা [unpkg](https://unpkg.com/) ব্যবহার করছি, কিন্তু আপনি যে কোনো CDN ব্যবহার করতে পারেন যা npm প্যাকেজ পরিবেশন করে, উদাহরণস্বরূপ [jsdelivr](https://www.jsdelivr.com/package/npm/ vue) অথবা [cdnjs](https://cdnjs.com/libraries/vue)। অবশ্যই, আপনি এই ফাইলটি ডাউনলোড করতে পারেন এবং এটি নিজে ব্যবহার করতে পারেন।

একটি CDN থেকে Vue ব্যবহার করার সময়, কোন "বিল্ড স্টেপ" জড়িত থাকে না। এটি সেটআপটিকে অনেক সহজ করে তোলে এবং স্ট্যাটিক HTML বাড়ানো বা ব্যাকএন্ড ফ্রেমওয়ার্কের সাথে একীভূত করার জন্য উপযুক্ত। যাইহোক, আপনি একক-ফাইল কম্পোনেন্ট (SFC) সিনট্যাক্স ব্যবহার করতে পারবেন না।

### গ্লোবাল বিল্ড ব্যবহার করে {#using-the-global-build}

উপরের লিঙ্কটি Vue-এর _global build_ লোড করে, যেখানে সমস্ত টপ-লেভেল APIs গ্লোবাল `Vue` অবজেক্টের বৈশিষ্ট্য হিসেবে উন্মুক্ত হয়। এখানে গ্লোবাল বিল্ড ব্যবহার করে একটি সম্পূর্ণ উদাহরণ রয়েছে:

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

[JSFiddle demo](https://jsfiddle.net/yyx990803/nw1xg8Lj/)

### ES মডিউল বিল্ড ব্যবহার করে {#using-the-es-module-build}

বাকি ডকুমেন্টেশন জুড়ে, আমরা প্রাথমিকভাবে [ES মডিউল](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) সিনট্যাক্স ব্যবহার করব। বেশিরভাগ আধুনিক ব্রাউজার এখন স্থানীয়ভাবে ES মডিউলগুলিকে সমর্থন করে, তাই আমরা একটি CDN থেকে Vue ব্যবহার করতে পারি নেটিভ ES মডিউলগুলির মাধ্যমে:

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

লক্ষ্য করুন যে আমরা `<script type="module">` ব্যবহার করছি, এবং imported CDN URL এর পরিবর্তে Vue-এর **ES মডিউল বিল্ড**-এর দিকে নির্দেশ করছে।

[JSFiddle demo](https://jsfiddle.net/yyx990803/vo23c470/)

### Import maps ব্যবহার করে {#enabling-import-maps}

উপরের উদাহরণে, আমরা সম্পূর্ণ CDN URL থেকে import করছি, কিন্তু বাকি ডকুমেন্টেশনে আপনি এইরকম কোড দেখতে পাবেন:

```js
import { createApp } from 'vue'
```

আমরা ব্রাউজারকে শেখাতে পারি কোথায় `vue` ইম্পোর্ট ব্যবহার করে সনাক্ত করতে হয় [Import Maps](https://caniuse.com/import-maps):

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

[JSFiddle demo](https://jsfiddle.net/yyx990803/2ke1ab0z/)

আপনি import maps অন্যান্য নির্ভরতার জন্য এন্ট্রি যোগ করতে পারেন - তবে নিশ্চিত করুন যে তারা লাইব্রেরির ES মডিউল সংস্করণের দিকে নির্দেশ করে যা আপনি ব্যবহার করতে চান।

:::tip import maps ব্রাউজার সমর্থন করে
ক্রোমিয়াম-ভিত্তিক ব্রাউজারগুলিতে import maps ডিফল্টরূপে সমর্থিত, তাই আমরা শেখার প্রক্রিয়া চলাকালীন Chrome বা Edge ব্যবহার করার পরামর্শ দিই।

Firefox ব্যবহার করলে, এটি 108+ সংস্করণে ডিফল্টরূপে সমর্থিত হয় অথবা 102+ সংস্করণের জন্য `about:config`-এ `dom.importMaps.enabled` বিকল্পটিকে সত্য হিসেবে সেট করে।

যদি আপনার পছন্দের ব্রাউজার এখনও import maps সমর্থন না করে, আপনি এটি [es-module-shims](https://github.com/guybedford/es-module-shims) দিয়ে পলিফিল করতে পারেন।
:::

:::warning প্রোডাকশনে ব্যবহারের বিষয়ে সতর্কীকরণ নোট
এখন পর্যন্ত উদাহরণগুলি হল Vue-এর ডেভেলপমেন্ট বিল্ড ব্যবহার করা - আপনি যদি প্রোডাকশনে CDN থেকে Vue ব্যবহার করতে চান, তাহলে [প্রোডাকশন ডিপ্লয়মেন্ট গাইড](/guide/best-practices/production-deployment.html#without-build-tools)।
:::

### মডিউলগুলি বিভক্ত করা {#splitting-up-the-modules}

আমরা গাইডের গভীরে ডুব দেওয়ার সাথে সাথে আমাদের কোড আলাদা জাভাস্ক্রিপ্ট ফাইলগুলিতে বিভক্ত করতে হতে পারে যাতে সেগুলি পরিচালনা করা সহজ হয়। উদাহরণ স্বরূপ:

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}
```

আপনি যদি সরাসরি আপনার ব্রাউজারে উপরের `index.html` খোলেন, আপনি দেখতে পাবেন যে এটি একটি ত্রুটি নিক্ষেপ করে কারণ ES মডিউলগুলি `file://` প্রোটোকলের উপর কাজ করতে পারে না। এটি কাজ করার জন্য, আপনাকে একটি স্থানীয় HTTP সার্ভারের সাথে `http://` প্রোটোকলের মাধ্যমে আপনার `index.html` পরিবেশন করতে হবে।

একটি স্থানীয় HTTP সার্ভার শুরু করতে, প্রথমে [Node.js](https://nodejs.org/en/) ইনস্টল করুন এবং তারপর আপনার HTML ফাইল যেখানে রয়েছে একই ডিরেক্টরিতে কমান্ড লাইন থেকে `npx serve` চালান। আপনি অন্য কোনো HTTP সার্ভারও ব্যবহার করতে পারেন যা সঠিক MIME প্রকারের সাথে স্ট্যাটিক ফাইল পরিবেশন করতে পারে।

আপনি হয়তো লক্ষ্য করেছেন যে import করা উপাদানের টেমপ্লেটটি জাভাস্ক্রিপ্ট স্ট্রিং হিসাবে ইনলাইন করা হয়েছে। আপনি যদি VSCode ব্যবহার করেন তবে আপনি [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) এক্সটেনশন ইনস্টল করতে পারেন এবং একটি `/*html*/` সহ স্ট্রিংগুলি comment করতে পারেন তাদের জন্য সিনট্যাক্স হাইলাইটিং পেতে মন্তব্য করুন।

### বিল্ড স্টেপ ছাড়া Composition API ব্যবহার করা {#using-composition-api-without-a-build-step}

Composition API-এর অনেক উদাহরণ `<script setup>` সিনট্যাক্স ব্যবহার করবে। আপনি যদি বিল্ড স্টেপ ছাড়া কম্পোজিশন API ব্যবহার করতে চান, তাহলে [`setup()` option](/api/composition-api-setup.html) ব্যবহারের পরামর্শ নিন।

## পরবর্তী ধাপ {#next-steps}

আপনি যদি [ভূমিকা](/guide/introduction) এড়িয়ে যান, তাহলে বাকি ডকুমেন্টেশনে যাওয়ার আগে আমরা দৃঢ়ভাবে এটি পড়ার পরামর্শ দিচ্ছি।

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">গাইডের সাথে চালিয়ে যান</p>
    <p class="next-steps-caption">গাইড আপনাকে সম্পূর্ণ বিশদে ফ্রেমওয়ার্কের প্রতিটি দিক দিয়ে চলে।</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">টিউটোরিয়াল ব্যবহার করে দেখুন</p>
    <p class="next-steps-caption">যারা হাতে-কলমে শিখতে পছন্দ করেন তাদের জন্য।</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">উদাহরণ দেখুন</p>
    <p class="next-steps-caption">মূল বৈশিষ্ট্য এবং সাধারণ UI কার্যগুলির উদাহরণগুলি অন্বেষণ করুন৷</p>
  </a>
</div>
