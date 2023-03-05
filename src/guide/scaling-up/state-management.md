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

প্রথম ক্ষেত্রে, একটি সম্ভাব্য সমাধান হল শেয়ার্ড স্টেটটিকে একটি সাধারণ পূর্বপুরুষ উপাদান পর্যন্ত "উঠিয়ে" এবং তারপর এটিকে প্রপস হিসাবে নামিয়ে দেওয়া। যাইহোক, এটি গভীর স্তরবিন্যাস সহ উপাদান গাছগুলিতে দ্রুত ক্লান্তিকর হয়ে ওঠে, যার ফলে [Prop Drilling](/guide/components/provide-inject.html#prop-drilling) নামে পরিচিত আরেকটি সমস্যা দেখা দেয়।

দ্বিতীয় ক্ষেত্রে, আমরা প্রায়শই নিজেদেরকে সমাধানের অবলম্বন করতে দেখি যেমন টেমপ্লেট রেফের মাধ্যমে সরাসরি পিতামাতা/শিশুদের কাছে পৌঁছানো, বা নির্গত ইভেন্টের মাধ্যমে রাষ্ট্রের একাধিক অনুলিপি পরিবর্তন এবং সিঙ্ক্রোনাইজ করার চেষ্টা করা। এই দুটি প্যাটার্নই ভঙ্গুর এবং দ্রুত অরক্ষণীয় কোডের দিকে নিয়ে যায়।

একটি সহজ এবং আরও সরল সমাধান হ'ল অংশগুলি থেকে ভাগ করা রাজ্যটি বের করা এবং এটি একটি বিশ্বব্যাপী এককটনে পরিচালনা করা। এটির সাথে, আমাদের উপাদান গাছটি একটি বড় "ভিউ" হয়ে যায় এবং যে কোনও উপাদান রাজ্যে অ্যাক্সেস করতে পারে বা ট্রিগার অ্যাকশনগুলিকে ট্রিগার করতে পারে, তারা গাছের মধ্যে যেখানেই থাকুক না কেন!

## Simple State Management with Reactivity API {#simple-state-management-with-reactivity-api}

<div class="options-api">

Options API -এ, `data()` বিকল্প ব্যবহার করে প্রতিক্রিয়াশীল ডেটা ঘোষণা করা হয়। অভ্যন্তরীণভাবে, `data()` দ্বারা প্রত্যাবর্তিত বস্তুটিকে [`reactive()`](/api/reactivity-core.html#reactive) ফাংশনের মাধ্যমে প্রতিক্রিয়াশীল করা হয়, যা একটি সর্বজনীন API হিসাবেও উপলব্ধ।

</div>

আপনার যদি রাজ্যের একটি অংশ থাকে যা একাধিক দৃষ্টান্ত দ্বারা ভাগ করা উচিত, আপনি একটি প্রতিক্রিয়াশীল বস্তু তৈরি করতে [`reactive()`](/api/reactivity-core.html#reactive) ব্যবহার করতে পারেন এবং তারপরে এটি একাধিক উপাদানে আমদানি করতে পারেন :

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

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBDb21wb25lbnRBIGZyb20gJy4vQ29tcG9uZW50QS52dWUnXG5pbXBvcnQgQ29tcG9uZW50QiBmcm9tICcuL0NvbXBvbmVudEIudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPENvbXBvbmVudEEgLz5cbiAgPENvbXBvbmVudEIgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNvbXBvbmVudEEudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9zdG9yZS5qcydcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCJzdG9yZS5pbmNyZW1lbnQoKVwiPlxuICAgICAgRnJvbSBBOiB7eyBzdG9yZS5jb3VudCB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiQ29tcG9uZW50Qi52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL3N0b3JlLmpzJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIEBjbGljaz1cInN0b3JlLmluY3JlbWVudCgpXCI+XG4gICAgICBGcm9tIEI6IHt7IHN0b3JlLmNvdW50IH19XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJzdG9yZS5qcyI6ImltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSByZWFjdGl2ZSh7XG4gIGNvdW50OiAwLFxuICBpbmNyZW1lbnQoKSB7XG4gICAgdGhpcy5jb3VudCsrXG4gIH1cbn0pIn0=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wb25lbnRBIGZyb20gJy4vQ29tcG9uZW50QS52dWUnXG5pbXBvcnQgQ29tcG9uZW50QiBmcm9tICcuL0NvbXBvbmVudEIudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIENvbXBvbmVudEEsXG4gICAgQ29tcG9uZW50QlxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8Q29tcG9uZW50QSAvPlxuICA8Q29tcG9uZW50QiAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ29tcG9uZW50QS52dWUiOiI8c2NyaXB0PlxuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL3N0b3JlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0b3JlXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxidXR0b24gQGNsaWNrPVwic3RvcmUuaW5jcmVtZW50KClcIj5cbiAgICAgIEZyb20gQToge3sgc3RvcmUuY291bnQgfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIkNvbXBvbmVudEIudnVlIjoiPHNjcmlwdD5cbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9zdG9yZS5qcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdG9yZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIEBjbGljaz1cInN0b3JlLmluY3JlbWVudCgpXCI+XG4gICAgICBGcm9tIEI6IHt7IHN0b3JlLmNvdW50IH19XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJzdG9yZS5qcyI6ImltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSByZWFjdGl2ZSh7XG4gIGNvdW50OiAwLFxuICBpbmNyZW1lbnQoKSB7XG4gICAgdGhpcy5jb3VudCsrXG4gIH1cbn0pIn0=)

</div>

:::tip
মনে রাখবেন ক্লিক হ্যান্ডলার বন্ধনী সহ `store.increment()` ব্যবহার করে - এটি একটি উপাদান পদ্ধতি না হওয়ায় সঠিক `this` প্রসঙ্গ সহ পদ্ধতিটিকে কল করতে হবে।
:::

যদিও এখানে আমরা একটি দোকান হিসাবে একটি একক প্রতিক্রিয়াশীল বস্তু ব্যবহার করছি, আপনি অন্যান্য [Reactivity APIs](/api/reactivity-core.html) যেমন `ref()` বা `computed()` ব্যবহার করে তৈরি প্রতিক্রিয়াশীল অবস্থা শেয়ার করতে পারেন, অথবা এমনকি একটি [Composable](/guide/reusability/composables.html) থেকে বৈশ্বিক অবস্থা ফেরত দিন:

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
