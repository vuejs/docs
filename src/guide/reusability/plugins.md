# Plugins {#plugins}

## Introduction {#introduction}

প্লাগইন হল স্বয়ংসম্পূর্ণ কোড যা সাধারণত Vue-তে অ্যাপ-স্তরের কার্যকারিতা যোগ করে। এইভাবে আমরা একটি প্লাগইন ইনস্টল করি:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* optional options */
})
```

একটি প্লাগইনকে একটি বস্তু হিসাবে সংজ্ঞায়িত করা হয় যা একটি `install()` পদ্ধতি প্রকাশ করে, অথবা কেবলমাত্র একটি ফাংশন যা নিজেই ইনস্টল ফাংশন হিসাবে কাজ করে। ইনস্টল ফাংশনটি [অ্যাপ ইনস্ট্যান্স](/api/application) এর সাথে অতিরিক্ত বিকল্পগুলি `app.use()`-এ পাস করে, যদি থাকে:

```js
const myPlugin = {
  install(app, options) {
    // configure the app
  }
}
```

একটি প্লাগইনের জন্য কোন কঠোরভাবে সংজ্ঞায়িত সুযোগ নেই, তবে সাধারণ পরিস্থিতিতে যেখানে প্লাগইনগুলি দরকারী সেগুলির মধ্যে রয়েছে:

1. এক বা একাধিক global উপাদান বা কাস্টম নির্দেশাবলী নিবন্ধন করুন [`app.component()`](/api/application#app-component) এবং [`app.directive()`](/api/application#app-directive).

2. একটি resource তৈরি করুন [injectable](/guide/components/provide-inject) কল করে অ্যাপ জুড়ে [`app.provide()`](/api/application#app-provide).

3. তাদের সাথে সংযুক্ত করে কিছু বৈশ্বিক উদাহরণ বৈশিষ্ট্য বা পদ্ধতি যোগ করুন[`app.config.globalProperties`](/api/application#app-config-globalproperties).

4. একটি লাইব্রেরি যা উপরের কিছু সমন্বয় করতে হবে (যেমন [vue-router](https://github.com/vuejs/vue-router-next))।

## Writing a Plugin {#writing-a-plugin}

আপনার নিজের Vue.js প্লাগইনগুলি কীভাবে তৈরি করবেন তা আরও ভালভাবে বোঝার জন্য, আমরা একটি প্লাগইনের একটি খুব সরলীকৃত সংস্করণ তৈরি করব যা `i18n` প্রদর্শন করে ([Internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization) )) strings

প্লাগইন অবজেক্ট সেট আপ করে শুরু করা যাক। এটিকে একটি পৃথক ফাইলে তৈরি করার এবং এটিকে export করার পরামর্শ দেওয়া হচ্ছে, যেমনটি যুক্তি ধারণ করে এবং আলাদা রাখতে নীচে দেখানো হয়েছে৷

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // Plugin code goes here
  }
}
```

আমরা একটি অনুবাদ ফাংশন তৈরি করতে চাই। এই ফাংশনটি একটি ডট-ডিলিমিটেড `key` string পাবে, যা আমরা ব্যবহারকারী-প্রদত্ত বিকল্পগুলিতে অনুবাদিত স্ট্রিংটি দেখতে ব্যবহার করব। এটি টেমপ্লেটগুলিতে উদ্দেশ্যমূলক ব্যবহার:

```vue-html
<h1>{{ $translate('greetings.hello') }}</h1>
```

যেহেতু এই ফাংশনটি সমস্ত টেমপ্লেটে বিশ্বব্যাপী উপলব্ধ হওয়া উচিত, তাই আমরা এটিকে আমাদের প্লাগইনে `app.config.globalProperties`-এর সাথে সংযুক্ত করে তৈরি করব:

```js{4-11}
// plugins/i18n.js
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$translate = (key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

আমাদের `$translate` ফাংশন একটি স্ট্রিং নেবে যেমন `greetings.hello`, ব্যবহারকারীর প্রদত্ত কনফিগারেশনের ভিতরে তাকাবে এবং অনুবাদিত মান ফেরত দেবে।

অনূদিত কীগুলি ধারণকারী বস্তুটিকে ইনস্টলেশনের সময় অতিরিক্ত প্যারামিটারের মাধ্যমে `app.use()`-এ প্লাগইনে পাঠানো উচিত:

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

এখন, আমাদের প্রাথমিক অভিব্যক্তি `$translate('greetings.hello')` রানটাইমে `Bonjour!` দ্বারা প্রতিস্থাপিত হবে।

আরো দেখুন: [Augmenting Global Properties](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

:::tip
গ্লোবাল প্রপার্টি খুব কমই ব্যবহার করুন, যেহেতু একটি অ্যাপ জুড়ে বিভিন্ন প্লাগইন দ্বারা ইনজেকশন করা অনেকগুলি বৈশ্বিক বৈশিষ্ট্য ব্যবহার করা হলে এটি দ্রুত বিভ্রান্তিকর হয়ে উঠতে পারে।
:::

### Provide / Inject with Plugins {#provide-inject-with-plugins}

প্লাগইনগুলি আমাদের প্লাগইন ব্যবহারকারীদের একটি ফাংশন বা বৈশিষ্ট্য প্রদান করতে `inject` ব্যবহার করার অনুমতি দেয়। উদাহরণস্বরূপ, অনুবাদ বস্তু ব্যবহার করতে সক্ষম হওয়ার জন্য আমরা অ্যাপ্লিকেশনটিকে `options` প্যারামিটারে অ্যাক্সেসের অনুমতি দিতে পারি।

```js{10}
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    app.provide('i18n', options)
  }
}
```

প্লাগইন ব্যবহারকারীরা এখন `i18n` কী ব্যবহার করে তাদের উপাদানগুলিতে প্লাগইন বিকল্পগুলি ইনজেক্ট করতে সক্ষম হবেন:

<div class="composition-api">

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

</div>
<div class="options-api">

```js
export default {
  inject: ['i18n'],
  created() {
    console.log(this.i18n.greetings.hello)
  }
}
```

</div>
