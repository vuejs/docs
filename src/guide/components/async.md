# Async Components {#async-components}

## Basic Usage {#basic-usage}

বড় অ্যাপ্লিকেশানগুলিতে, আমাদের অ্যাপটিকে ছোট ছোট খণ্ডে ভাগ করতে হবে এবং প্রয়োজন হলেই সার্ভার থেকে একটি উপাদান লোড করতে হবে। এটি সম্ভব করার জন্য, Vue এর একটি [`defineAsyncComponent`](/api/general#defineasynccomponent) ফাংশন রয়েছে:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...load component from server
    resolve(/* loaded component */)
  })
})
// ... use `AsyncComp` like a normal component
```

আপনি দেখতে পাচ্ছেন, `defineAsyncComponent` একটি লোডার ফাংশন গ্রহণ করে যা একটি প্রতিশ্রুতি প্রদান করে। যখন আপনি সার্ভার থেকে আপনার উপাদান সংজ্ঞা পুনরুদ্ধার করেছেন তখন প্রতিশ্রুতির `resolve` কলব্যাক কল করা উচিত। আপনি লোড ব্যর্থ হয়েছে নির্দেশ করতে `reject(reason)` কল করতে পারেন।

[ES মডিউল ডাইনামিক ইম্পোর্ট](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) এছাড়াও একটি প্রতিশ্রুতি প্রদান করে, তাই বেশিরভাগ সময় আমরা এটির সাথে একত্রে ব্যবহার করব `fineAsyncComponent`. Vite এবং ওয়েবপ্যাকের মতো বান্ডলারগুলিও সিনট্যাক্স সমর্থন করে (এবং এটিকে বান্ডেল স্প্লিট পয়েন্ট হিসাবে ব্যবহার করবে), তাই আমরা এটি Vue SFC আমদানি করতে ব্যবহার করতে পারি:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

ফলস্বরূপ `AsyncComp` হল একটি র‍্যাপার উপাদান যা শুধুমাত্র লোডার ফাংশনকে কল করে যখন এটি আসলে পৃষ্ঠায় রেন্ডার করা হয়। উপরন্তু, এটি যেকোনো প্রপস এবং স্লট বরাবর অভ্যন্তরীণ কম্পোনেন্টে চলে যাবে, তাই আপনি অলস লোডিং অর্জনের সময় মূল উপাদানটিকে নির্বিঘ্নে প্রতিস্থাপন করতে অ্যাসিঙ্ক র‍্যাপার ব্যবহার করতে পারেন।

সাধারণ উপাদানগুলির মতো, async উপাদানগুলি `app.component()` ব্যবহার করে [registered globally](/guide/components/registration#global-registration) হতে পারে:

```js
app.component(
  'MyComponent',
  defineAsyncComponent(() => import('./components/MyComponent.vue'))
)
```

<div class="options-api">

[স্থানীয়ভাবে একটি উপাদান নিবন্ধন করার সময়](/guide/components/registration#local-registration): আপনি `defineAsyncComponent` ব্যবহার করতে পারেন:

```vue
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

</div>

<div class="composition-api">

এগুলি সরাসরি তাদের মূল উপাদানের ভিতরেও সংজ্ঞায়িত করা যেতে পারে:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

</div>

## Loading and Error States {#loading-and-error-states}

অ্যাসিঙ্ক্রোনাস অপারেশনে অনিবার্যভাবে লোডিং এবং ত্রুটির অবস্থা জড়িত - `defineAsyncComponent()` উন্নত বিকল্পগুলির মাধ্যমে এই অবস্থাগুলি পরিচালনা করতে সমর্থন করে:

```js
const AsyncComp = defineAsyncComponent({
  // the loader function
  loader: () => import('./Foo.vue'),

  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // A component to use if the load fails
  errorComponent: ErrorComponent,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})
```

যদি একটি লোডিং উপাদান প্রদান করা হয়, এটি প্রথমে প্রদর্শিত হবে যখন ভিতরের উপাদানটি লোড হচ্ছে৷ লোডিং কম্পোনেন্ট দেখানোর আগে একটি ডিফল্ট 200ms বিলম্ব আছে - এর কারণ হল দ্রুত নেটওয়ার্কগুলিতে, একটি তাত্ক্ষণিক লোডিং অবস্থা খুব দ্রুত প্রতিস্থাপিত হতে পারে এবং এটি একটি ঝাঁকুনির মতো দেখায়।

যদি একটি ত্রুটি উপাদান প্রদান করা হয়, এটি প্রদর্শিত হবে যখন লোডার ফাংশন দ্বারা প্রত্যাবর্তিত প্রতিশ্রুতি প্রত্যাখ্যান করা হয়। অনুরোধটি খুব বেশি সময় নিলে আপনি ত্রুটি উপাদানটি দেখানোর জন্য একটি সময়সীমা নির্দিষ্ট করতে পারেন।

## Using with Suspense {#using-with-suspense}

Async উপাদানগুলি `<Suspense>` বিল্ট-ইন কম্পোনেন্টের সাথে ব্যবহার করা যেতে পারে। `<Suspense>` এবং অ্যাসিঙ্ক উপাদানগুলির মধ্যে মিথস্ক্রিয়া নথিভুক্ত করা হয়েছে [`<Suspense>`](/guide/built-ins/suspense)-এর জন্য নিবেদিত অধ্যায়ে।
