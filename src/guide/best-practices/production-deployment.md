# Production Deployment {#production-deployment}

## Development vs. Production {#development-vs-production}

During development, Vue উন্নয়ন অভিজ্ঞতা উন্নত করতে বেশ কয়েকটি বৈশিষ্ট্য প্রদান করে:

- Warning for common errors and pitfalls
- Props / events validation
- [Reactivity debugging hooks](/guide/extras/reactivity-in-depth#reactivity-debugging)
- Devtools integration

যাইহোক, এই বৈশিষ্ট্যগুলি উত্পাদন অকেজো হয়ে যায়। কিছু সতর্কতা চেক ওভারহেড কর্মক্ষমতা একটি ছোট পরিমাণ বহন করতে পারে. উৎপাদনে মোতায়েন করার সময়, ছোট পেলোড আকার এবং আরও ভাল কার্যকারিতার জন্য আমাদের সমস্ত অব্যবহৃত, শুধুমাত্র বিকাশের কোড শাখা বাদ দেওয়া উচিত।

## Without Build Tools {#without-build-tools}

আপনি যদি CDN বা স্ব-হোস্টেড স্ক্রিপ্ট থেকে লোড করে বিল্ড টুল ছাড়াই Vue ব্যবহার করেন, তাহলে প্রোডাকশনে স্থাপন করার সময় প্রোডাকশন বিল্ড (ডিস্ট ফাইল যা `.prod.js`-এ শেষ হয়) ব্যবহার করতে ভুলবেন না। প্রোডাকশন বিল্ডগুলি সমস্ত ডেভেলপমেন্ট-কেবল কোড শাখাগুলি সরিয়ে দিয়ে প্রাক-মিনিফাই করা হয়।

- যদি গ্লোবাল বিল্ড ব্যবহার করে (`Vue` global মাধ্যমে অ্যাক্সেস করা হয়): `vue.global.prod.js` ব্যবহার করুন।
- যদি ESM বিল্ড ব্যবহার করেন (নেটিভ ESM imports মাধ্যমে অ্যাক্সেস করা হয়): `vue.esm-browser.prod.js` ব্যবহার করুন।

আরও বিস্তারিত জানার জন্য [dist ফাইল গাইড](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) দেখুন।

## With Build Tools {#with-build-tools}

`create-vue` (Vite-এর উপর ভিত্তি করে) বা Vue CLI (ওয়েবপ্যাকের উপর ভিত্তি করে) এর মাধ্যমে স্ক্যাফোল্ড করা প্রজেক্টগুলি প্রোডাকশন বিল্ডের জন্য প্রি-কনফিগার করা হয়।

একটি কাস্টম সেটআপ ব্যবহার করলে, নিশ্চিত করুন যে:

1. `vue` `vue.runtime.esm-bundler.js`-এ সমাধান করে।
2. [কম্পাইল টাইম ফিচার ফ্ল্যাগ](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags) সঠিকভাবে কনফিগার করা হয়েছে।
3. <code>process.env<wbr>.NODE_ENV</code> বিল্ড করার সময় `"production"` দিয়ে প্রতিস্থাপিত হয়।

অতিরিক্ত তথ্যসূত্র:

- [Vite production build guide](https://vitejs.dev/guide/build.html)
- [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
- [Vue CLI deployment guide](https://cli.vuejs.org/guide/deployment.html)

## Tracking Runtime Errors {#tracking-runtime-errors}

[অ্যাপ-লেভেল এরর হ্যান্ডলার](/api/application#app-config-errorhandler) ট্র্যাকিং পরিষেবাগুলিতে ত্রুটি রিপোর্ট করতে ব্যবহার করা যেতে পারে:

```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // report error to tracking services
}
```

[Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) এবং [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) এর মতো পরিষেবাগুলিও প্রদান করে Vue এর জন্য অফিসিয়াল ইন্টিগ্রেশন।
