# State Management {#state-management}

## What is State Management? {#what-is-state-management}

প্রযুক্তিগতভাবে, প্রতিটি Vue কম্পোনেন্ট ইন্সট্যান্স ইতিমধ্যেই তার নিজস্ব প্রতিক্রিয়াশীল অবস্থা "পরিচালনা" করে। একটি উদাহরণ হিসাবে একটি সাধারণ কাউন্টার উপাদান নিন:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

// state
const count = ref(0)

// actions
function increment() {
  count.value++
}
</script>

<!-- view -->
<template>{{ count }}</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  // state
  data() {
    return {
      count: 0
    }
  },
  // actions
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- view -->
<template>{{ count }}</template>
```

</div>

এটি নিম্নলিখিত অংশগুলির সাথে একটি স্বয়ংসম্পূর্ণ ইউনিট:

- **state**, সত্যের উৎস যা আমাদের অ্যাপকে চালিত করে;
- **view**, **state** এর একটি ঘোষণামূলক ম্যাপিং;
- **actions**, **view** থেকে ব্যবহারকারীর ইনপুটগুলির প্রতিক্রিয়ায় রাষ্ট্র পরিবর্তন করতে পারে এমন সম্ভাব্য উপায়।

এটি "one-way data flow" ধারণার একটি সহজ উপস্থাপনা:

<p style="text-align: center">
  <img alt="state flow diagram" src="./images/state-flow.png" width="252px" style="margin: 40px auto">
</p>

যাইহোক, সরলতা ভেঙ্গে যেতে শুরু করে যখন আমাদের কাছে **একাধিক components থাকে যা একটি সাধারণ অবস্থা ভাগ করে**:

1. একাধিক ভিউ একই রাজ্যের উপর নির্ভর করতে পারে।
2. বিভিন্ন দৃষ্টিভঙ্গি থেকে ক্রিয়াকলাপের জন্য একই state অংশকে পরিবর্তন করতে হতে পারে।

প্রথম ক্ষেত্রে, একটি সম্ভাব্য সমাধান হল শেয়ার্ড স্টেটটিকে একটি সাধারণ পূর্বপুরুষ উপাদান পর্যন্ত "উঠিয়ে" এবং তারপর এটিকে প্রপস হিসাবে নামিয়ে দেওয়া। যাইহোক, এটি গভীর শ্রেণিবিন্যাস সহ উপাদান গাছগুলিতে দ্রুত ক্লান্তিকর হয়ে ওঠে, যার ফলে আরেকটি সমস্যা হয় যা [Prop Drilling](/guide/components/provide-inject#prop-drilling).

দ্বিতীয় ক্ষেত্রে, আমরা প্রায়শই নিজেদেরকে সমাধানের অবলম্বন করতে দেখি যেমন টেমপ্লেট রেফের মাধ্যমে সরাসরি পিতামাতা/শিশুদের কাছে পৌঁছানো, বা নির্গত ইভেন্টের মাধ্যমে রাষ্ট্রের একাধিক অনুলিপি পরিবর্তন এবং সিঙ্ক্রোনাইজ করার চেষ্টা করা। এই দুটি প্যাটার্নই ভঙ্গুর এবং দ্রুত অরক্ষণীয় কোডের দিকে নিয়ে যায়।

একটি সহজ এবং আরও সরল সমাধান হ'ল অংশগুলি থেকে ভাগ করা রাজ্যটি বের করা এবং এটি একটি বিশ্বব্যাপী এককটনে পরিচালনা করা। এটির সাথে, আমাদের উপাদান গাছটি একটি বড় "ভিউ" হয়ে যায় এবং যে কোনও উপাদান রাজ্যে অ্যাক্সেস করতে পারে বা ট্রিগার অ্যাকশনগুলিকে ট্রিগার করতে পারে, তারা গাছের মধ্যে যেখানেই থাকুক না কেন!

## Simple State Management with Reactivity API {#simple-state-management-with-reactivity-api}

<div class="options-api">

অপশন এপিআই-এ, `data()` বিকল্প ব্যবহার করে প্রতিক্রিয়াশীল ডেটা ঘোষণা করা হয়। অভ্যন্তরীণভাবে, `data()` দ্বারা প্রত্যাবর্তিত বস্তুটিকে [`reactive()`](/api/reactivity-core#reactive) ফাংশনের মাধ্যমে প্রতিক্রিয়াশীল করা হয়, যা একটি সর্বজনীন API হিসাবেও উপলব্ধ।

</div>

আপনার যদি state একটি অংশ থাকে যা একাধিক দৃষ্টান্ত দ্বারা ভাগ করা উচিত, আপনি একটি প্রতিক্রিয়াশীল বস্তু তৈরি করতে [`reactive()`](/api/reactivity-core#reactive) ব্যবহার করতে পারেন, এবং তারপর এটিকে একাধিক উপাদানে আমদানি করতে পারেন:

```js
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})
```

<div class="composition-api">

```vue
<!-- ComponentA.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From B: {{ store.count }}</template>
```

</div>
<div class="options-api">

```vue
<!-- ComponentA.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From B: {{ store.count }}</template>
```

</div>

এখন যখনই `store` অবজেক্ট পরিবর্তিত হয়, `<ComponentA>` এবং `<ComponentB>` উভয়ই তাদের মতামত স্বয়ংক্রিয়ভাবে আপডেট করবে - আমাদের কাছে এখন সত্যের একক উৎস আছে।

যাইহোক, এর মানে `store` আমদানি করা যেকোন উপাদান এটিকে পরিবর্তন করতে পারে যেভাবে তারা চায়:

```vue-html{2}
<template>
  <button @click="store.count++">
    From B: {{ store.count }}
  </button>
</template>
```

যদিও এটি সাধারণ ক্ষেত্রে কাজ করে, বৈশ্বিক রাষ্ট্র যা কোনো উপাদান দ্বারা নির্বিচারে পরিবর্তিত হতে পারে তা দীর্ঘমেয়াদে খুব রক্ষণাবেক্ষণযোগ্য হবে না। স্টেট-মিউটেটিং লজিক রাজ্যের মতোই কেন্দ্রীভূত হয় তা নিশ্চিত করার জন্য, দোকানে এমন নামগুলির সাথে পদ্ধতিগুলি সংজ্ঞায়িত করার সুপারিশ করা হয় যা ক্রিয়াগুলির অভিপ্রায় প্রকাশ করে:

```js{6-8}
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```vue-html{2}
<template>
  <button @click="store.increment()">
    From B: {{ store.count }}
  </button>
</template>
```

<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNrNkk1uwyAQha8yYpNEiUzXllPVrtRTeJNSqtLGgGBsVbK4ewdwnT9FWWSTFczwmPc+xMhqa4uhl6xklRdOWQQvsbfPrVadNQ7h1dCqpcYaPp3pYFHwQyteXVxKm0tpM0krnm3IgAqUnd3vUFIFUB1Z8bNOkzoVny+wDTuNcZ1gBI/GSQhzqlQX3/5Gng81pA1t33tEo+FF7JX42bYsT1BaONlRguWqZZMU4C261CWMk3EhTK8RQphm8Twse/BscoUsvdqDkTX3kP3nI6aZwcmdQDUcMPJPabX8TQphtCf0RLqd1csxuqQAJTxtYnEUGtIpAH4pn1Ou17FDScOKhT+QNAVM)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNrdU8FqhDAU/JVHLruyi+lZ3FIt9Cu82JilaTWR5CkF8d8bE5O1u1so9FYQzAyTvJnRTKTo+3QcOMlIbpgWPT5WUnS90gjPyr4ll1jAWasOdim9UMum3a20vJWWqxSgkvzTyRt+rocWYVpYFoQm8wRsJh+viHLBcyXtk9No2ALkXd/WyC0CyDfW6RVTOiancQM5ku+x7nUxgUGlOcwxn8Ppu7HJ7udqaqz3SYikOQ5aBgT+OA9slt9kasToFnb5OiAqCU+sFezjVBHvRUimeWdT7JOKrFKAl8VvYatdI6RMDRJhdlPtWdQf5mdQP+SHdtyX/IftlH9pJyS1vcQ2NK8ZivFSiL8BsQmmpMG1s1NU79frYA1k8OD+/I3pUA6+CeNdHg6hmoTMX9pPSnk=)

</div>

:::tip
মনে রাখবেন ক্লিক হ্যান্ডলার বন্ধনী সহ `store.increment()` ব্যবহার করে - এটি একটি উপাদান পদ্ধতি না হওয়ায় সঠিক `this` প্রসঙ্গ সহ পদ্ধতিটিকে কল করতে হবে।
:::

যদিও এখানে আমরা একটি দোকান হিসাবে একটি একক প্রতিক্রিয়াশীল বস্তু ব্যবহার করছি, আপনি অন্যান্য [রিঅ্যাকটিভিটি API](/api/reactivity-core) যেমন `ref()` বা `কম্পিউটেড()`, অথবা এমনকি ব্যবহার করে তৈরি প্রতিক্রিয়াশীল অবস্থাও ভাগ করতে পারেন। একটি [কম্পোজযোগ্য](/guide/reusability/composables) থেকে বৈশ্বিক অবস্থা ফেরত দিন:

```js
import { ref } from 'vue'

// global state, created in module scope
const globalCount = ref(1)

export function useCount() {
  // local state, created per-component
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

Vue এর প্রতিক্রিয়াশীলতা সিস্টেমটি উপাদান মডেল থেকে বিচ্ছিন্ন হওয়ার কারণে এটিকে অত্যন্ত নমনীয় করে তোলে।

## SSR Considerations {#ssr-considerations}

আপনি যদি এমন একটি অ্যাপ্লিকেশন তৈরি করেন যা [সার্ভার-সাইড রেন্ডারিং (SSR)](./ssr) ব্যবহার করে, তবে উপরের প্যাটার্নটি একাধিক অনুরোধে শেয়ার করা একটি সিঙ্গলটন হওয়ার কারণে সমস্যা হতে পারে। SSR নির্দেশিকায় [আরো বিশদ বিবরণ](./ssr#cross-request-state-pollution) এ নিয়ে আলোচনা করা হয়েছে।

## Pinia {#pinia}

যদিও আমাদের হ্যান্ড-রোল্ড স্টেট ম্যানেজমেন্ট সলিউশন সাধারণ পরিস্থিতিতে যথেষ্ট হবে, বৃহৎ-স্কেল উত্পাদন অ্যাপ্লিকেশনগুলিতে আরও অনেক বিষয় বিবেচনা করতে হবে:

- দলের সহযোগিতার জন্য শক্তিশালী সম্মেলন
- টাইমলাইন, ইন-কম্পোনেন্ট পরিদর্শন এবং টাইম-ট্রাভেল ডিবাগিং সহ Vue DevTools-এর সাথে একীভূত করা
- হট মডিউল প্রতিস্থাপন
- সার্ভার-সাইড রেন্ডারিং সমর্থন

[Pinia](https://pinia.vuejs.org) হল একটি রাষ্ট্রীয় ব্যবস্থাপনা লাইব্রেরি যা উপরোক্ত সবগুলো বাস্তবায়ন করে। এটি Vue কোর টিম দ্বারা রক্ষণাবেক্ষণ করা হয় এবং Vue 2 এবং Vue 3 উভয়ের সাথেই কাজ করে।

বর্তমান ব্যবহারকারীরা হয়তো [Vuex](https://vuex.vuejs.org/), Vue-এর আগের অফিসিয়াল স্টেট ম্যানেজমেন্ট লাইব্রেরির সাথে পরিচিত। পিনিয়া ইকোসিস্টেমে একই ভূমিকা পালন করে, Vuex এখন রক্ষণাবেক্ষণ মোডে রয়েছে। এটি এখনও কাজ করে, তবে আর নতুন বৈশিষ্ট্য পাবে না। নতুন অ্যাপ্লিকেশনের জন্য পিনিয়া ব্যবহার করার পরামর্শ দেওয়া হয়।

পিনিয়া Vuex এর পরবর্তী পুনরাবৃত্তি কেমন হতে পারে তার একটি অন্বেষণ হিসাবে শুরু করেছিল, Vuex 5 এর জন্য মূল দলের আলোচনা থেকে অনেক ধারনা একত্রিত করে। অবশেষে, আমরা বুঝতে পেরেছি যে পিনিয়া ইতিমধ্যেই Vuex 5-এ আমরা যা চেয়েছিলাম তার বেশিরভাগই বাস্তবায়ন করেছে এবং এটি করার সিদ্ধান্ত নিয়েছে। পরিবর্তে নতুন সুপারিশ.

Vuex-এর তুলনায়, Pinia কম অনুষ্ঠানের সাথে একটি সহজ API প্রদান করে, Composition-API-শৈলী API গুলি অফার করে এবং সবচেয়ে গুরুত্বপূর্ণভাবে, TypeScript-এর সাথে ব্যবহার করার সময় কঠিন ধরনের অনুমান সমর্থন থাকে।
