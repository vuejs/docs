# Composables {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip
এই বিভাগটি কম্পোজিশন এপিআই এর প্রাথমিক জ্ঞান গ্রহণ করে। আপনি যদি শুধুমাত্র Options API এর সাথে Vue শিখছেন, তাহলে আপনি API পছন্দকে কম্পোজিশন API (বাম সাইডবারের উপরে টগল ব্যবহার করে) সেট করতে পারেন এবং [Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals) পুনরায় পড়তে পারেন .html) এবং [Lifecycle Hooks](/guide/essentials/lifecycle.html)।
:::

## What is a "Composable"? {#what-is-a-composable}

Vue অ্যাপ্লিকেশনের পরিপ্রেক্ষিতে, একটি "composable" হল একটি ফাংশন যা **stateful logic** কে এনক্যাপসুলেট এবং পুনঃব্যবহারের জন্য Vue-এর কম্পোজিশন এপিআই ব্যবহার করে।

ফ্রন্টএন্ড অ্যাপ্লিকেশন তৈরি করার সময়, আমাদের প্রায়ই সাধারণ কাজের জন্য যুক্তি পুনরায় ব্যবহার করতে হবে। উদাহরণস্বরূপ, আমাদের অনেক জায়গায় তারিখগুলি ফর্ম্যাট করতে হতে পারে, তাই আমরা এটির জন্য একটি পুনঃব্যবহারযোগ্য ফাংশন বের করি। এই ফরম্যাটার ফাংশনটি **stateless logic** কে এনক্যাপসুলেট করে: এটি কিছু ইনপুট নেয় এবং অবিলম্বে প্রত্যাশিত আউটপুট প্রদান করে। স্টেটলেস লজিক পুনঃব্যবহারের জন্য অনেক লাইব্রেরি আছে - উদাহরণস্বরূপ [lodash](https://lodash.com/) এবং [date-fns](https://date-fns.org/), যা আপনি শুনে থাকবেন এর

বিপরীতে, রাষ্ট্রীয় যুক্তিতে এমন অবস্থা পরিচালনা করা জড়িত যা সময়ের সাথে সাথে পরিবর্তিত হয়। একটি সাধারণ উদাহরণ একটি পৃষ্ঠায় মাউসের বর্তমান অবস্থান ট্র্যাক করা হবে। বাস্তব-বিশ্বের পরিস্থিতিতে, এটি আরও জটিল যুক্তি হতে পারে যেমন স্পর্শ অঙ্গভঙ্গি বা ডাটাবেসের সাথে সংযোগের স্থিতি।

## Mouse Tracker Example {#mouse-tracker-example}

যদি আমরা সরাসরি একটি উপাদানের ভিতরে কম্পোজিশন API ব্যবহার করে মাউস ট্র্যাকিং কার্যকারিতা বাস্তবায়ন করি, তাহলে এটি দেখতে এরকম হবে:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

কিন্তু আমরা যদি একই যুক্তিকে একাধিক উপাদানে পুনরায় ব্যবহার করতে চাই? আমরা একটি কম্পোজেবল ফাংশন হিসাবে একটি বহিরাগত ফাইলে যুক্তি বের করতে পারি:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose managed state as return value
  return { x, y }
}
```

এবং এইভাবে এটি উপাদানগুলিতে ব্যবহার করা যেতে পারে:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

<div class="demo">
  Mouse position is at: {{ x }}, {{ y }}
</div>

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZU1vdXNlIH0gZnJvbSAnLi9tb3VzZS5qcydcblxuY29uc3QgeyB4LCB5IH0gPSB1c2VNb3VzZSgpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICBNb3VzZSBwb3NpdGlvbiBpcyBhdDoge3sgeCB9fSwge3sgeSB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwibW91c2UuanMiOiJpbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VNb3VzZSgpIHtcbiAgY29uc3QgeCA9IHJlZigwKVxuICBjb25zdCB5ID0gcmVmKDApXG5cbiAgZnVuY3Rpb24gdXBkYXRlKGV2ZW50KSB7XG4gICAgeC52YWx1ZSA9IGV2ZW50LnBhZ2VYXG4gICAgeS52YWx1ZSA9IGV2ZW50LnBhZ2VZXG4gIH1cblxuICBvbk1vdW50ZWQoKCkgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZSkpXG4gIG9uVW5tb3VudGVkKCgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGUpKVxuXG4gIHJldHVybiB7IHgsIHkgfVxufSJ9)

আমরা দেখতে পাচ্ছি, মূল যুক্তিটি অভিন্ন রয়ে গেছে - আমাদের যা করতে হবে তা হল এটিকে একটি বাহ্যিক ফাংশনে স্থানান্তরিত করা এবং যে অবস্থাটি প্রকাশ করা উচিত তা ফিরিয়ে দেওয়া। ঠিক একটি উপাদানের ভিতরের মতো, আপনি কম্পোজেবলগুলিতে [Composition API functions](/api/#composition-api) এর সম্পূর্ণ পরিসর ব্যবহার করতে পারেন। একই `useMouse()` কার্যকারিতা এখন যেকোনো উপাদানে ব্যবহার করা যেতে পারে।

যদিও কম্পোজেবল সম্পর্কে শীতল অংশটি হল যে আপনি সেগুলিকে নেস্ট করতে পারেন: একটি কম্পোজেবল ফাংশন এক বা একাধিক অন্যান্য কম্পোজেবল ফাংশনকে কল করতে পারে। এটি আমাদেরকে ছোট, বিচ্ছিন্ন একক ব্যবহার করে জটিল যুক্তি রচনা করতে সক্ষম করে, যেভাবে আমরা উপাদান ব্যবহার করে একটি সম্পূর্ণ অ্যাপ্লিকেশন রচনা করি। প্রকৃতপক্ষে, এই কারণেই আমরা এপিআইগুলির সংগ্রহকে কল করার সিদ্ধান্ত নিয়েছি যা এই প্যাটার্নটিকে Composition API তৈরি করে।

উদাহরণস্বরূপ, আমরা একটি DOM ইভেন্ট শ্রোতাকে তার নিজস্ব কম্পোজেবলে যুক্ত এবং সরানোর যুক্তি বের করতে পারি:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // if you want, you can also make this
  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

এবং এখন আমাদের `useMouse()` কম্পোজেবলকে সরলীকৃত করা যেতে পারে:

```js{3,9-12}
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip
প্রতিটি কম্পোনেন্ট ইন্সট্যান্স যাকে `useMouse()` কল করে তা `x` এবং `y` অবস্থার নিজস্ব কপি তৈরি করবে যাতে তারা একে অপরের সাথে হস্তক্ষেপ না করে। আপনি যদি উপাদানগুলির মধ্যে ভাগ করা অবস্থা পরিচালনা করতে চান তবে [State Management](/guide/scaling-up/state-management.html) অধ্যায়টি পড়ুন।
:::

## Async State Example {#async-state-example}

`useMouse()` কম্পোজেবল কোনো আর্গুমেন্ট নেয় না, তাই আসুন আরেকটি উদাহরণ দেখি যা একটি ব্যবহার করে। অ্যাসিঙ্ক ডেটা আনার সময়, আমাদের প্রায়শই বিভিন্ন অবস্থা পরিচালনা করতে হয়: লোডিং, সাফল্য এবং ত্রুটি:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
```

ডেটা আনার জন্য প্রয়োজন এমন প্রতিটি উপাদানে এই প্যাটার্নটি পুনরাবৃত্তি করা ক্লান্তিকর হবে। আসুন এটিকে কম্পোজেবলে বের করি:

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

এখন আমাদের উপাদানে আমরা শুধু করতে পারি:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

`useFetch()` ইনপুট হিসাবে একটি স্ট্যাটিক ইউআরএল স্ট্রিং নেয় - তাই এটি শুধুমাত্র একবার আনয়ন সম্পাদন করে এবং তারপর সম্পন্ন হয়। যখনই ইউআরএল পরিবর্তিত হয় তখন আমরা যদি এটি পুনরায় আনতে চাই? আমরা একটি যুক্তি হিসাবে refs গ্রহণ করে এটি অর্জন করতে পারি:

```js
// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // reset state before fetching..
    data.value = null
    error.value = null
    // unref() unwraps potential refs
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(doFetch)
  } else {
    // otherwise, just fetch once
    // and avoid the overhead of a watcher
    doFetch()
  }

  return { data, error }
}
```

`useFetch()` এর এই সংস্করণটি এখন স্ট্যাটিক ইউআরএল স্ট্রিং এবং ইউআরএল স্ট্রিংয়ের রেফ উভয়ই গ্রহণ করে। যখন এটি সনাক্ত করে যে URLটি [`isRef()`](/api/reactivity-utilities.html#isref) ব্যবহার করে একটি গতিশীল রেফ, এটি [`watchEffect()`](/api/reactivity) ব্যবহার করে একটি প্রতিক্রিয়াশীল প্রভাব সেট আপ করে -core.html#watcheffect)। প্রভাব অবিলম্বে চালানো হবে এবং নির্ভরতা হিসাবে URL রেফ ট্র্যাক করবে। যখনই URL রেফ পরিবর্তন হবে, ডেটা পুনরায় সেট করা হবে এবং আবার আনা হবে।

এখানে [`useFetch()` এর আপডেট করা সংস্করণ](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VGZXRjaCB9IGZyb20gJy4vdXNlRmV0Y2guanMnXG5cbmNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLydcbmNvbnN0IGlkID0gcmVmKCcxJylcbmNvbnN0IHVybCA9IGNvbXB1dGVkKCgpID0+IGJhc2VVcmwgKyBpZC52YWx1ZSlcblxuY29uc3QgeyBkYXRhLCBlcnJvciwgcmV0cnkgfSA9IHVzZUZldGNoKHVybClcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIExvYWQgcG9zdCBpZDpcbiAgPGJ1dHRvbiB2LWZvcj1cImkgaW4gNVwiIEBjbGljaz1cImlkID0gaVwiPnt7IGkgfX08L2J1dHRvbj5cblxuXHQ8ZGl2IHYtaWY9XCJlcnJvclwiPlxuICAgIDxwPk9vcHMhIEVycm9yIGVuY291bnRlcmVkOiB7eyBlcnJvci5tZXNzYWdlIH19PC9wPlxuICAgIDxidXR0b24gQGNsaWNrPVwicmV0cnlcIj5SZXRyeTwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiB2LWVsc2UtaWY9XCJkYXRhXCI+RGF0YSBsb2FkZWQ6IDxwcmU+e3sgZGF0YSB9fTwvcHJlPjwvZGl2PlxuICA8ZGl2IHYtZWxzZT5Mb2FkaW5nLi4uPC9kaXY+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJ1c2VGZXRjaC5qcyI6ImltcG9ydCB7IHJlZiwgaXNSZWYsIHVucmVmLCB3YXRjaEVmZmVjdCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZldGNoKHVybCkge1xuICBjb25zdCBkYXRhID0gcmVmKG51bGwpXG4gIGNvbnN0IGVycm9yID0gcmVmKG51bGwpXG5cbiAgYXN5bmMgZnVuY3Rpb24gZG9GZXRjaCgpIHtcbiAgICAvLyByZXNldCBzdGF0ZSBiZWZvcmUgZmV0Y2hpbmcuLlxuICAgIGRhdGEudmFsdWUgPSBudWxsXG4gICAgZXJyb3IudmFsdWUgPSBudWxsXG4gICAgXG4gICAgLy8gcmVzb2x2ZSB0aGUgdXJsIHZhbHVlIHN5bmNocm9ub3VzbHkgc28gaXQncyB0cmFja2VkIGFzIGFcbiAgICAvLyBkZXBlbmRlbmN5IGJ5IHdhdGNoRWZmZWN0KClcbiAgICBjb25zdCB1cmxWYWx1ZSA9IHVucmVmKHVybClcbiAgICBcbiAgICB0cnkge1xuICAgICAgLy8gYXJ0aWZpY2lhbCBkZWxheSAvIHJhbmRvbSBlcnJvclxuICBcdCAgYXdhaXQgdGltZW91dCgpXG4gIFx0ICAvLyB1bnJlZigpIHdpbGwgcmV0dXJuIHRoZSByZWYgdmFsdWUgaWYgaXQncyBhIHJlZlxuXHQgICAgLy8gb3RoZXJ3aXNlIHRoZSB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIGFzLWlzXG4gICAgXHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmxWYWx1ZSlcblx0ICAgIGRhdGEudmFsdWUgPSBhd2FpdCByZXMuanNvbigpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyb3IudmFsdWUgPSBlXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzUmVmKHVybCkpIHtcbiAgICAvLyBzZXR1cCByZWFjdGl2ZSByZS1mZXRjaCBpZiBpbnB1dCBVUkwgaXMgYSByZWZcbiAgICB3YXRjaEVmZmVjdChkb0ZldGNoKVxuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSwganVzdCBmZXRjaCBvbmNlXG4gICAgZG9GZXRjaCgpXG4gIH1cblxuICByZXR1cm4geyBkYXRhLCBlcnJvciwgcmV0cnk6IGRvRmV0Y2ggfVxufVxuXG4vLyBhcnRpZmljaWFsIGRlbGF5XG5mdW5jdGlvbiB0aW1lb3V0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjMpIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdSYW5kb20gRXJyb3InKSlcbiAgICAgIH1cbiAgICB9LCAzMDApXG4gIH0pXG59In0=), with an artificial delay and randomized error for demo purposes.

## Conventions and Best Practices {#conventions-and-best-practices}

### Naming {#naming}

এটি "ব্যবহার" দিয়ে শুরু হওয়া ক্যামেলকেস নামগুলির সাথে কম্পোজেবল ফাংশনগুলির নামকরণ একটি প্রথা।

### Input Arguments {#input-arguments}

একটি কম্পোজেবল রেফ আর্গুমেন্ট গ্রহণ করতে পারে এমনকি যদি এটি প্রতিক্রিয়াশীলতার জন্য তাদের উপর নির্ভর না করে। আপনি যদি অন্য ডেভেলপারদের দ্বারা ব্যবহার করা হতে পারে এমন একটি কম্পোজেবল লিখছেন, তাহলে ইনপুট আর্গুমেন্টগুলি কাঁচা মানের পরিবর্তে রেফ হওয়ার ক্ষেত্রে পরিচালনা করা একটি ভাল ধারণা। [`unref()`](/api/reactivity-utilities.html#unref) ইউটিলিটি ফাংশন এই উদ্দেশ্যে কাজে আসবে:

```js
import { unref } from 'vue'

function useFeature(maybeRef) {
  // if maybeRef is indeed a ref, its .value will be returned
  // otherwise, maybeRef is returned as-is
  const value = unref(maybeRef)
}
```

যদি আপনার কম্পোজেবল প্রতিক্রিয়াশীল প্রভাব তৈরি করে যখন ইনপুট একটি রেফ হয়, তাহলে নিশ্চিত করুন যে হয় স্পষ্টভাবে রেফটিকে `watch()` দিয়ে দেখুন, অথবা `watchEffect()` এর ভিতরে `unref()` কল করুন যাতে এটি সঠিকভাবে ট্র্যাক করা হয়।

### Return Values {#return-values}

আপনি সম্ভবত লক্ষ্য করেছেন যে আমরা কম্পোজেবলগুলিতে `reactive()` এর পরিবর্তে একচেটিয়াভাবে `ref()` ব্যবহার করছি। কম্পোজেবলের জন্য প্রস্তাবিত কনভেনশন হল একটি সরল, অ-প্রতিক্রিয়াশীল বস্তু যাতে একাধিক রেফ থাকে। এটি প্রতিক্রিয়াশীলতা বজায় রাখার সময় উপাদানগুলিতে এটিকে ধ্বংস করার অনুমতি দেয়:

```js
// x and y are refs
const { x, y } = useMouse()
```

একটি কম্পোজেবল থেকে একটি প্রতিক্রিয়াশীল বস্তু ফিরিয়ে আনার ফলে এই ধরনের ধ্বংসগুলি কম্পোজেবলের ভিতরে থাকা অবস্থার সাথে প্রতিক্রিয়াশীলতার সংযোগ হারাবে, যখন রেফগুলি সেই সংযোগটি ধরে রাখবে।

আপনি যদি অবজেক্ট প্রোপার্টি হিসাবে কম্পোজেবল থেকে রিটার্নড স্টেট ব্যবহার করতে পছন্দ করেন, তাহলে আপনি প্রত্যাবর্তিত অবজেক্টকে `reactive()` দিয়ে মোড়ানো করতে পারেন যাতে রেফগুলি খুলে যায়। উদাহরণ স্বরূপ:

```js
const mouse = reactive(useMouse())
// mouse.x is linked to original ref
console.log(mouse.x)
```

```vue-html
Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
```

### Side Effects {#side-effects}

কম্পোজেবলগুলিতে পার্শ্ব প্রতিক্রিয়া (যেমন DOM ইভেন্ট শ্রোতা যোগ করা বা ডেটা আনা) করা ঠিক, তবে নিম্নলিখিত নিয়মগুলিতে মনোযোগ দিন:

- আপনি যদি [Server-Side Rendering](/guide/scaling-up/ssr.html) (SSR) ব্যবহার করে এমন একটি অ্যাপ্লিকেশনে কাজ করছেন, তাহলে পোস্ট-মাউন্ট লাইফসাইকেল হুকগুলিতে DOM-নির্দিষ্ট পার্শ্বপ্রতিক্রিয়া সম্পাদন করতে ভুলবেন না, যেমন `onMounted()`। এই হুকগুলি শুধুমাত্র ব্রাউজারে কল করা হয়, তাই আপনি নিশ্চিত হতে পারেন যে তাদের ভিতরের কোডের DOM-এ অ্যাক্সেস আছে।

- 'onUnmounted()' এর পার্শ্বপ্রতিক্রিয়াগুলি পরিষ্কার করতে মনে রাখবেন। উদাহরণস্বরূপ, যদি একটি কম্পোজেবল একটি DOM ইভেন্ট লিসেনার সেট আপ করে, তাহলে এটি সেই শ্রোতাকে `onUnmounted()` থেকে সরিয়ে দেবে যেমনটি আমরা `useMouse()` উদাহরণে দেখেছি। একটি কম্পোজেবল ব্যবহার করা একটি ভাল ধারণা হতে পারে যা স্বয়ংক্রিয়ভাবে আপনার জন্য এটি করে, যেমন `useEventListener()` উদাহরণ।

### Usage Restrictions {#usage-restrictions}

কম্পোজেবলকে শুধুমাত্র `<script setup>` বা `setup()` হুকে **synchronously** বলা উচিত। কিছু ক্ষেত্রে, আপনি তাদের লাইফসাইকেল হুকগুলিতেও কল করতে পারেন যেমন `onMounted()`।

এগুলি সেই প্রসঙ্গ যেখানে Vue বর্তমান সক্রিয় উপাদানের উদাহরণ নির্ধারণ করতে সক্ষম। একটি সক্রিয় উপাদান উদাহরণে অ্যাক্সেস প্রয়োজন যাতে:

1. লাইফসাইকেল হুকগুলি এতে নিবন্ধিত হতে পারে।

2. কম্পিউটেড প্রপার্টি এবং প্রহরীদের এটির সাথে লিঙ্ক করা যেতে পারে, যাতে মেমরি লিক রোধ করার জন্য উদাহরণটি আনমাউন্ট করা হলে সেগুলি নিষ্পত্তি করা যায়।

:::tip
`<script setup>` হল একমাত্র জায়গা যেখানে আপনি `await` ব্যবহার করে **after** কম্পোজেবল কল করতে পারেন। অ্যাসিঙ্ক অপারেশনের পরে কম্পাইলার স্বয়ংক্রিয়ভাবে আপনার জন্য সক্রিয় উদাহরণ প্রসঙ্গ পুনরুদ্ধার করে।
:::

## Extracting Composables for Code Organization {#extracting-composables-for-code-organization}

কম্পোজেবলগুলি কেবল পুনঃব্যবহারের জন্য নয়, কোড সংস্থার জন্যও বের করা যেতে পারে। আপনার উপাদানগুলির জটিলতা বাড়ার সাথে সাথে, আপনি এমন উপাদানগুলির সাথে শেষ হতে পারেন যেগুলি নেভিগেট করার জন্য এবং যুক্তির জন্য খুব বড়। রচনা API আপনাকে যৌক্তিক উদ্বেগের উপর ভিত্তি করে ছোট ফাংশনে আপনার উপাদান কোড সংগঠিত করার সম্পূর্ণ নমনীয়তা দেয়:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

কিছু পরিমাণে, আপনি এই নিষ্কাশিত কম্পোজেবলগুলিকে কম্পোনেন্ট-স্কোপড পরিষেবা হিসাবে ভাবতে পারেন যা একে অপরের সাথে কথা বলতে পারে।

## Using Composables in Options API {#using-composables-in-options-api}

আপনি যদি Options API ব্যবহার করেন, তাহলে কম্পোজেবলকে অবশ্যই `setup()`-এর ভিতরে কল করতে হবে, এবং প্রত্যাবর্তিত বাইন্ডিংগুলি অবশ্যই `setup()` থেকে ফেরত দিতে হবে যাতে সেগুলি `this` এবং টেমপ্লেটের সংস্পর্শে আসে:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // setup() exposed properties can be accessed on `this`
    console.log(this.x)
  }
  // ...other options
}
```

## Comparisons with Other Techniques {#comparisons-with-other-techniques}

### vs. Mixins {#vs-mixins}

Vue 2 থেকে আগত ব্যবহারকারীরা [mixins](/api/options-composition.html#mixins) বিকল্পের সাথে পরিচিত হতে পারে, যা আমাদের পুনঃব্যবহারযোগ্য ইউনিটগুলিতে উপাদানের যুক্তি বের করতে দেয়। মিশ্রণের তিনটি প্রাথমিক ত্রুটি রয়েছে:

1. **Unclear source of properties**: অনেকগুলি মিক্সিন ব্যবহার করার সময়, কোন মিক্সিনের দ্বারা কোন উদাহরণের বৈশিষ্ট্যটি ইনজেকশন করা হয়েছে তা অস্পষ্ট হয়ে যায়, যার ফলে বাস্তবায়নটি সনাক্ত করা এবং উপাদানটির আচরণ বোঝা কঠিন হয়। এই কারণেই আমরা কম্পোজেবলের জন্য refs + destructure প্যাটার্ন ব্যবহার করার পরামর্শ দিই: এটি উপাদানগুলি ব্যবহার করার ক্ষেত্রে সম্পত্তির উৎসকে স্পষ্ট করে তোলে।

2. **Namespace collisions**: বিভিন্ন লেখকের একাধিক মিশ্রণ সম্ভাব্যভাবে একই সম্পত্তি কী নিবন্ধন করতে পারে, যার ফলে নামস্থানের সংঘর্ষ হয়। কম্পোজেবলের সাহায্যে, যদি বিভিন্ন কম্পোজেবল থেকে বিরোধপূর্ণ কী থাকে তাহলে আপনি ধ্বংসকৃত ভেরিয়েবলের নাম পরিবর্তন করতে পারেন।

3. **Implicit cross-mixin communication**: একাধিক মিক্সিন যেগুলি একে অপরের সাথে ইন্টারঅ্যাক্ট করতে হবে তাদের শেয়ার্ড প্রপার্টি কীগুলির উপর নির্ভর করতে হবে, যাতে সেগুলি পরোক্ষভাবে মিলিত হয়। কম্পোজেবলের সাথে, একটি কম্পোজেবল থেকে প্রত্যাবর্তিত মানগুলিকে আর্গুমেন্ট হিসাবে অন্যটিতে প্রেরণ করা যেতে পারে, ঠিক স্বাভাবিক ফাংশনের মতো।

উপরের কারণগুলির জন্য, আমরা আর Vue 3-এ মিক্সিন ব্যবহার করার পরামর্শ দিই না৷ বৈশিষ্ট্যটি শুধুমাত্র স্থানান্তর এবং পরিচিতির কারণে রাখা হয়েছে৷

### vs. Renderless Components {#vs-renderless-components}

কম্পোনেন্ট স্লট অধ্যায়ে, আমরা স্কোপড স্লটের উপর ভিত্তি করে [রেন্ডারলেস কম্পোনেন্ট](/guide/components/slots.html#renderless-components) প্যাটার্ন নিয়ে আলোচনা করেছি। এমনকি আমরা রেন্ডারলেস উপাদান ব্যবহার করে একই মাউস ট্র্যাকিং ডেমো প্রয়োগ করেছি।

রেন্ডারলেস কম্পোনেন্টের উপর কম্পোজেবলের প্রধান সুবিধা হল যে কম্পোজেবল অতিরিক্ত কম্পোনেন্ট ইনস্ট্যান্স ওভারহেড বহন করে না। একটি সম্পূর্ণ অ্যাপ্লিকেশন জুড়ে ব্যবহার করা হলে, রেন্ডারলেস কম্পোনেন্ট প্যাটার্ন দ্বারা তৈরি অতিরিক্ত কম্পোনেন্ট ইনস্ট্যান্সের পরিমাণ একটি লক্ষণীয় কার্যক্ষমতা ওভারহেড হয়ে উঠতে পারে।

বিশুদ্ধ যুক্তি পুনরায় ব্যবহার করার সময় কম্পোজেবল ব্যবহার করার সুপারিশ করা হয় এবং যুক্তি এবং ভিজ্যুয়াল লেআউট উভয়ই পুনরায় ব্যবহার করার সময় উপাদানগুলি ব্যবহার করা হয়।

### vs. React Hooks {#vs-react-hooks}

আপনার যদি প্রতিক্রিয়ার অভিজ্ঞতা থাকে তবে আপনি লক্ষ্য করতে পারেন যে এটি কাস্টম প্রতিক্রিয়া হুকের মতো দেখতে। কম্পোজিশন এপিআই আংশিকভাবে রিঅ্যাক্ট হুক দ্বারা অনুপ্রাণিত ছিল, এবং ভ্যু কম্পোজেবল প্রকৃতপক্ষে লজিক কম্পোজিশন ক্ষমতার পরিপ্রেক্ষিতে রিঅ্যাক্ট হুকের মতো। যাইহোক, Vue কম্পোজেবলগুলি Vue-এর সূক্ষ্ম-দানাযুক্ত প্রতিক্রিয়াশীলতা সিস্টেমের উপর ভিত্তি করে তৈরি করা হয়েছে, যা রিঅ্যাক্ট হুকের এক্সিকিউশন মডেল থেকে মৌলিকভাবে আলাদা। এটি [Composition API FAQ](/guide/extras/composition-api-faq#comparison-with-react-hooks) এ আরো বিস্তারিতভাবে আলোচনা করা হয়েছে।

## Further Reading {#further-reading}

- [Reactivity In Depth](/guide/extras/reactivity-in-depth.html): for a low-level understanding of how Vue's reactivity system works.
- [State Management](/guide/scaling-up/state-management.html): for patterns of managing state shared by multiple components.
- [Testing Composables](/guide/scaling-up/testing.html#testing-composables): tips on unit testing composables.
- [VueUse](https://vueuse.org/): an ever-growing collection of Vue composables. The source code is also a great learning resource.
