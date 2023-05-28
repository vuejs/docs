# Creating a Vue Application {#creating-a-vue-application}

## The application instance {#the-application-instance}

প্রতিটি Vue অ্যাপ্লিকেশন [`createApp`](/api/application#createapp) ফাংশনের সাথে একটি নতুন **অ্যাপ্লিকেশন ইনস্ট্যান্স** তৈরি করে শুরু হয়:

```js
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

## The Root Component {#the-root-component}

আমরা যে বস্তুটিকে `createApp`-এ পাঠাচ্ছি তা আসলে একটি উপাদান। প্রতিটি অ্যাপ্লিকেশানের একটি "রুট উপাদান" প্রয়োজন যাতে অন্যান্য উপাদানগুলি তার সন্তান হিসাবে থাকতে পারে৷

আপনি যদি একক-ফাইল উপাদান ব্যবহার করেন, আমরা সাধারণত অন্য ফাইল থেকে রুট উপাদান আমদানি করি:

```js
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```

যদিও এই নির্দেশিকায় অনেক উদাহরণের জন্য শুধুমাত্র একটি একক উপাদান প্রয়োজন, বেশিরভাগ বাস্তব অ্যাপ্লিকেশন নেস্টেড, পুনঃব্যবহারযোগ্য উপাদানগুলির একটি গাছে সংগঠিত হয়। উদাহরণস্বরূপ, একটি টোডো অ্যাপ্লিকেশনের উপাদান গাছটি দেখতে এইরকম হতে পারে:

```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

গাইডের পরবর্তী অংশগুলিতে, আমরা আলোচনা করব কিভাবে একাধিক উপাদান একসাথে সংজ্ঞায়িত করা যায় এবং রচনা করা যায়। তার আগে, আমরা একটি একক উপাদানের অভ্যন্তরে কী ঘটবে তা ফোকাস করব।

## Mounting the App {#mounting-the-app}

একটি অ্যাপ্লিকেশন ইন্সট্যান্স কিছুই রেন্ডার করবে না যতক্ষণ না তার `.mount()` পদ্ধতি কল করা হয়। এটি একটি "ধারক" যুক্তি আশা করে, যা হয় একটি প্রকৃত DOM উপাদান বা একটি নির্বাচক স্ট্রিং হতে পারে:

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

অ্যাপের রুট কম্পোনেন্টের বিষয়বস্তু কন্টেইনার এলিমেন্টের ভিতরে রেন্ডার করা হবে। ধারক উপাদান নিজেই অ্যাপের অংশ হিসাবে বিবেচিত হয় না।

সমস্ত অ্যাপ কনফিগারেশন এবং সম্পদ নিবন্ধন সম্পন্ন হওয়ার পরে `.mount()` পদ্ধতিটি সর্বদা কল করা উচিত। এছাড়াও মনে রাখবেন যে সম্পদ নিবন্ধন পদ্ধতির বিপরীতে এর রিটার্ন মান হল অ্যাপ্লিকেশন ইনস্ট্যান্সের পরিবর্তে রুট কম্পোনেন্ট ইনস্ট্যান্স।

### In-DOM Root Component Template {#in-dom-root-component-template}

রুট কম্পোনেন্টের জন্য টেমপ্লেট সাধারণত কম্পোনেন্টেরই অংশ, কিন্তু মাউন্ট কন্টেইনারের ভিতরে সরাসরি লিখে আলাদাভাবে টেমপ্লেট প্রদান করাও সম্ভব:

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

Vue স্বয়ংক্রিয়ভাবে কন্টেইনারের `innerHTML` কে টেমপ্লেট হিসেবে ব্যবহার করবে যদি রুট কম্পোনেন্টে আগে থেকেই `template` বিকল্প না থাকে।

In-DOM templates are often used in applications that are [using Vue without a build step](/guide/quick-start.html#using-vue-from-cdn). They can also be used in conjunction with server-side frameworks, where the root template might be generated dynamically by the server.

## App Configurations {#app-configurations}

অ্যাপ্লিকেশন উদাহরণটি একটি `.config` অবজেক্টকে প্রকাশ করে যা আমাদের কয়েকটি অ্যাপ-স্তরের বিকল্প কনফিগার করতে দেয়, উদাহরণস্বরূপ, একটি অ্যাপ-লেভেল ত্রুটি হ্যান্ডলারকে সংজ্ঞায়িত করা যা সমস্ত বংশধর উপাদান থেকে ত্রুটিগুলি ক্যাপচার করে:

```js
app.config.errorHandler = (err) => {
  /* handle error */
}
```

অ্যাপ্লিকেশন উদাহরণটি অ্যাপ-স্কোপড সম্পদ নিবন্ধনের জন্য কয়েকটি পদ্ধতিও সরবরাহ করে। উদাহরণস্বরূপ, একটি উপাদান নিবন্ধন:

```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

এটি আমাদের অ্যাপের যেকোনো জায়গায় ব্যবহারের জন্য `TodoDeleteButton` উপলব্ধ করে। আমরা গাইডের পরবর্তী বিভাগে উপাদান এবং অন্যান্য ধরনের সম্পদের নিবন্ধন নিয়ে আলোচনা করব। আপনি এটির [API রেফারেন্স](/api/application) এ অ্যাপ্লিকেশন ইনস্ট্যান্স API এর সম্পূর্ণ তালিকা ব্রাউজ করতে পারেন।

অ্যাপটি মাউন্ট করার আগে সমস্ত অ্যাপ কনফিগারেশন প্রয়োগ করতে ভুলবেন না!

## Multiple application instances {#multiple-application-instances}

আপনি একই পৃষ্ঠায় একটি একক অ্যাপ্লিকেশন উদাহরণে সীমাবদ্ধ নন। `createApp` API একাধিক Vue অ্যাপ্লিকেশনকে একই পৃষ্ঠায় সহ-অস্তিত্বের অনুমতি দেয়, প্রতিটির নিজস্ব কনফিগারেশন এবং বৈশ্বিক সম্পদের সুযোগ রয়েছে:

```js
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

আপনি যদি সার্ভার-রেন্ডার করা এইচটিএমএল উন্নত করতে Vue ব্যবহার করেন এবং শুধুমাত্র একটি বড় পৃষ্ঠার নির্দিষ্ট অংশগুলিকে নিয়ন্ত্রণ করতে Vue-এর প্রয়োজন হয়, তাহলে পুরো পৃষ্ঠায় একটি একক Vue অ্যাপ্লিকেশন ইন্সট্যান্স মাউন্ট করা এড়িয়ে চলুন। পরিবর্তে, একাধিক ছোট অ্যাপ্লিকেশন দৃষ্টান্ত তৈরি করুন এবং তাদের জন্য দায়ী উপাদানগুলিতে মাউন্ট করুন।
