---
outline: deep
---

# Fallthrough Attributes {#fallthrough-attributes}

> এই পৃষ্ঠাটি ধরে নেওয়া হচ্ছে আপনি ইতিমধ্যেই [Components Basics](/guide/essentials/component-basics) পড়েছেন। আপনি যদি উপাদানগুলিতে নতুন হন তবে প্রথমে এটি পড়ুন।

## Attribute Inheritance {#attribute-inheritance}

একটি "ফলথ্রু অ্যাট্রিবিউট" হল একটি অ্যাট্রিবিউট বা `v-on` ইভেন্ট লিসেনার যা একটি কম্পোনেন্টে পাস করা হয়, কিন্তু রিসিভিং কম্পোনেন্টের [props](./props) বা [emits](./events.html) এ স্পষ্টভাবে ঘোষণা করা হয় না #ঘোষণা-নির্গত-ঘটনা)। এর সাধারণ উদাহরণগুলির মধ্যে রয়েছে `class`, `style`, এবং `id` বৈশিষ্ট্য।

যখন একটি উপাদান একটি একক রুট উপাদান রেন্ডার করে, তখন ফলথ্রু বৈশিষ্ট্যগুলি স্বয়ংক্রিয়ভাবে রুট উপাদানের বৈশিষ্ট্যগুলিতে যোগ করা হবে। উদাহরণস্বরূপ, নিম্নলিখিত টেমপ্লেট সহ একটি `<MyButton>` উপাদান দেওয়া হয়েছে:

```vue-html
<!-- template of <MyButton> -->
<button>click me</button>
```

এবং একজন অভিভাবক এই উপাদানটির সাথে ব্যবহার করছেন:

```vue-html
<MyButton class="large" />
```

চূড়ান্ত রেন্ডার করা DOM হবে:

```html
<button class="large">click me</button>
```

এখানে, `<MyButton>` একটি গৃহীত প্রপ হিসাবে `class` ঘোষণা করেনি। তাই, `class` কে একটি ফলথ্রু অ্যাট্রিবিউট হিসেবে বিবেচনা করা হয় এবং স্বয়ংক্রিয়ভাবে `<MyButton>` এর মূল উপাদানে যোগ করা হয়।

### `class` and `style` Merging {#class-and-style-merging}

যদি চাইল্ড কম্পোনেন্টের রুট এলিমেন্টে ইতিমধ্যেই বিদ্যমান `class` বা `style` অ্যাট্রিবিউট থাকে, তাহলে এটি অভিভাবকদের কাছ থেকে উত্তরাধিকারসূত্রে পাওয়া `class` এবং `style` মানগুলির সাথে মার্জ করা হবে। ধরুন আমরা আগের উদাহরণে `<MyButton>` এর টেমপ্লেট পরিবর্তন করেছি:

```vue-html
<!-- template of <MyButton> -->
<button class="btn">click me</button>
```

তারপর চূড়ান্ত রেন্ডার করা DOM এখন হয়ে যাবে:

```html
<button class="btn large">click me</button>
```

### `v-on` Listener Inheritance {#v-on-listener-inheritance}

একই নিয়ম `v-on` ইভেন্ট শ্রোতাদের ক্ষেত্রে প্রযোজ্য:

```vue-html
<MyButton @click="onClick" />
```

`click` শ্রোতাকে `<MyButton>` এর মূল উপাদানে যোগ করা হবে, অর্থাৎ নেটিভ `<button>` উপাদান। যখন নেটিভ `<button>` ক্লিক করা হয়, তখন এটি মূল উপাদানের `onClick` পদ্ধতিকে ট্রিগার করবে। যদি নেটিভ `<button>` এর ইতিমধ্যেই `v-on` এর সাথে আবদ্ধ কোনো `click` শ্রোতা থাকে, তাহলে উভয় শ্রোতাই ট্রিগার করবে।

### Nested Component Inheritance {#nested-component-inheritance}

যদি একটি উপাদান অন্য একটি উপাদানকে তার রুট নোড হিসাবে রেন্ডার করে, উদাহরণস্বরূপ, আমরা একটি `<BaseButton>` এর রুট হিসাবে রেন্ডার করতে `<MyButton>` রিফ্যাক্টর করেছি:

```vue-html
<!-- template of <MyButton/> that simply renders another component -->
<BaseButton />
```

তারপর `<MyButton>` দ্বারা প্রাপ্ত ফলথ্রু বৈশিষ্ট্যগুলি স্বয়ংক্রিয়ভাবে `<BaseButton>`-এ ফরোয়ার্ড করা হবে।

মনে রাখবেন যে:

1. ফরোয়ার্ড করা অ্যাট্রিবিউটের মধ্যে এমন কোনো অ্যাট্রিবিউট অন্তর্ভুক্ত নয় যা প্রপস হিসেবে ঘোষণা করা হয়েছে বা `<MyButton>` দ্বারা ঘোষিত ইভেন্টের `v-on` শ্রোতারা - অন্য কথায়, ঘোষিত props এবং শ্রোতাদের `<MyButton' দ্বারা "গ্রাহ্য" করা হয়েছে। >`

2. ফরোয়ার্ড করা বৈশিষ্ট্যগুলি `<BaseButton>` দ্বারা প্রপস হিসাবে গৃহীত হতে পারে, যদি এটি দ্বারা ঘোষণা করা হয়।

## Disabling Attribute Inheritance {#disabling-attribute-inheritance}

আপনি যদি **না** চান যে কোনো কম্পোনেন্ট স্বয়ংক্রিয়ভাবে অ্যাট্রিবিউটের উত্তরাধিকারী হোক, আপনি কম্পোনেন্টের বিকল্পগুলিতে `inheritAttrs: false` সেট করতে পারেন।

<div class="composition-api">

যদি `<script setup>` ব্যবহার করেন, তাহলে আপনাকে একটি পৃথক, স্বাভাবিক `<script>` ব্লক ব্যবহার করে এই বিকল্পটি ঘোষণা করতে হবে:

```vue
<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup logic
</script>
```

</div>

বৈশিষ্ট্যের উত্তরাধিকার নিষ্ক্রিয় করার সাধারণ দৃশ্য হল যখন বৈশিষ্ট্যগুলিকে রুট নোড ছাড়াও অন্যান্য উপাদানগুলিতে প্রয়োগ করা প্রয়োজন। `inheritAttrs` বিকল্পটিকে `false` তে সেট করে, আপনি ফলথ্রু বৈশিষ্ট্যগুলি কোথায় প্রয়োগ করতে হবে তার উপর সম্পূর্ণ নিয়ন্ত্রণ নিতে পারেন।

এই ফলথ্রু অ্যাট্রিবিউটগুলি সরাসরি টেমপ্লেট এক্সপ্রেশনে `$attrs` হিসাবে অ্যাক্সেস করা যেতে পারে:

```vue-html
<span>Fallthrough attributes: {{ $attrs }}</span>
```

`$attrs` অবজেক্টে এমন সব বৈশিষ্ট্য রয়েছে যা উপাদানের `props` বা `emits` বিকল্প দ্বারা ঘোষণা করা হয় না (যেমন, `class`, `style`, `v-on` listeners, ইত্যাদি)।

কিছু নোট:

- props বিপরীতে, ফলথ্রু অ্যাট্রিবিউটগুলি জাভাস্ক্রিপ্টে তাদের আসল কেসিং সংরক্ষণ করে, তাই `foo-bar`-এর মতো একটি অ্যাট্রিবিউটকে `$attrs['foo-bar']` হিসেবে অ্যাক্সেস করতে হবে।

- একটি `v-on` ইভেন্ট লিসেনার যেমন `@click` অবজেক্টে `$attrs.onClick` এর অধীনে একটি ফাংশন হিসেবে উন্মুক্ত হবে।

[previous section](#attribute-inheritance) থেকে আমাদের `<MyButton>` কম্পোনেন্ট উদাহরণ ব্যবহার করে - কখনও কখনও আমাদের স্টাইলিং উদ্দেশ্যে একটি অতিরিক্ত `<div>` দিয়ে প্রকৃত `<button>` উপাদান মোড়ানো প্রয়োজন হতে পারে:

```vue-html
<div class="btn-wrapper">
  <button class="btn">click me</button>
</div>
```

আমরা চাই যে সমস্ত ফলশ্রুতি বৈশিষ্ট্য যেমন `class` এবং `v-on` শ্রোতাদের ভিতরের `<button>`-এ প্রয়োগ করা হোক, বাইরের `<div>` নয়। আমরা `inheritAttrs: false` এবং `v-bind="$attrs"` দিয়ে এটি অর্জন করতে পারি:

```vue-html{2}
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

মনে রাখবেন [`v-bind` কোনো যুক্তি ছাড়াই](/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes) কোনো বস্তুর সমস্ত বৈশিষ্ট্যকে লক্ষ্য উপাদানের বৈশিষ্ট্য হিসেবে আবদ্ধ করে।

## Attribute Inheritance on Multiple Root Nodes {#attribute-inheritance-on-multiple-root-nodes}

একটি একক রুট নোড সহ উপাদানগুলির বিপরীতে, একাধিক রুট নোড সহ উপাদানগুলির একটি স্বয়ংক্রিয় বৈশিষ্ট্য ফলথ্রু আচরণ নেই। যদি `$attrs` স্পষ্টভাবে আবদ্ধ না হয়, তাহলে একটি রানটাইম সতর্কতা জারি করা হবে।

```vue-html
<CustomLayout id="custom-layout" @click="changeValue" />
```

যদি `<CustomLayout>`-এর নিম্নলিখিত মাল্টি-রুট টেমপ্লেট থাকে, তাহলে একটি সতর্কতা থাকবে কারণ Vue নিশ্চিত হতে পারে না যে কোথায় ফলথ্রু অ্যাট্রিবিউট প্রয়োগ করতে হবে:

```vue-html
<header>...</header>
<main>...</main>
<footer>...</footer>
```

যদি `$attrs` স্পষ্টভাবে আবদ্ধ থাকে তাহলে সতর্কতা দমন করা হবে:

```vue-html{2}
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## Accessing Fallthrough Attributes in JavaScript {#accessing-fallthrough-attributes-in-javascript}

<div class="composition-api">

যদি প্রয়োজন হয়, আপনি `useAttrs()` API ব্যবহার করে `<script setup>`-এ কোনো কম্পোনেন্টের ফলথ্রু অ্যাট্রিবিউট অ্যাক্সেস করতে পারেন:

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

`<script setup>` ব্যবহার না করলে, `attrs` কে `setup()` প্রসঙ্গের একটি বৈশিষ্ট্য হিসেবে প্রকাশ করা হবে:

```js
export default {
  setup(props, ctx) {
    // fallthrough attributes are exposed as ctx.attrs
    console.log(ctx.attrs)
  }
}
```

মনে রাখবেন যদিও এখানে `attrs` অবজেক্ট সর্বদা সর্বশেষ ফলথ্রু বৈশিষ্ট্যগুলি প্রতিফলিত করে, এটি প্রতিক্রিয়াশীল নয় (কর্মক্ষমতার কারণে)। আপনি এর পরিবর্তনগুলি পর্যবেক্ষণ করতে পর্যবেক্ষকদের ব্যবহার করতে পারবেন না। আপনার প্রতিক্রিয়াশীলতার প্রয়োজন হলে, একটি প্রপ ব্যবহার করুন। বিকল্পভাবে, আপনি প্রতিটি আপডেটে সর্বশেষ `attrs` এর সাথে পার্শ্ব প্রতিক্রিয়া করতে `onUpdated()` ব্যবহার করতে পারেন।

</div>

<div class="options-api">

প্রয়োজন হলে, আপনি `$attrs` ইনস্ট্যান্স প্রপার্টির মাধ্যমে কোনো কম্পোনেন্টের ফলথ্রু অ্যাট্রিবিউট অ্যাক্সেস করতে পারেন:

```js
export default {
  created() {
    console.log(this.$attrs)
  }
}
```

</div>
