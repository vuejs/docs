# Routing {#routing}

## Client-Side vs. Server-Side Routing {#client-side-vs-server-side-routing}

সার্ভার সাইডে রাউটিং মানে সার্ভার ব্যবহারকারীর ভিজিট করা URL পাথের উপর ভিত্তি করে একটি প্রতিক্রিয়া পাঠাচ্ছে। যখন আমরা একটি প্রথাগত সার্ভার-রেন্ডার করা ওয়েব অ্যাপের একটি লিঙ্কে ক্লিক করি, তখন ব্রাউজার সার্ভার থেকে একটি HTML প্রতিক্রিয়া পায় এবং নতুন HTML সহ পুরো পৃষ্ঠাটি পুনরায় লোড করে।

একটি [একক-পৃষ্ঠার অ্যাপ্লিকেশন](https://developer.mozilla.org/en-US/docs/Glossary/SPA) (SPA), তবে, ক্লায়েন্ট-সাইড জাভাস্ক্রিপ্ট নেভিগেশন বাধা দিতে পারে, গতিশীলভাবে নতুন ডেটা আনতে পারে, এবং পুরো পৃষ্ঠা পুনরায় লোড না করে বর্তমান পৃষ্ঠা আপডেট করুন। এটি সাধারণত একটি আরও চটজলদি ব্যবহারকারীর অভিজ্ঞতার ফলাফল করে, বিশেষত বাস্তব "অ্যাপ্লিকেশন" এর মতো ব্যবহারের ক্ষেত্রে, যেখানে ব্যবহারকারী দীর্ঘ সময়ের মধ্যে অনেকগুলি মিথস্ক্রিয়া সম্পাদন করবে বলে আশা করা হয়।

এই জাতীয় এসপিএগুলিতে, ব্রাউজারে ক্লায়েন্টের দিকে "রাউটিং" করা হয়। একটি ক্লায়েন্ট-সাইড রাউটার ব্রাউজার API যেমন [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) বা [`hashchange] ব্যবহার করে অ্যাপ্লিকেশনটির রেন্ডার করা দৃশ্য পরিচালনা করার জন্য দায়ী ` ইভেন্ট](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)।

## Official Router {#official-router}

<!-- TODO update links -->
<div>
  <VueSchoolLink href="https://vueschool.io/courses/vue-router-4-for-everyone" title="Free Vue Router Course">
    Vue স্কুলে একটি বিনামূল্যে ভিডিও কোর্স দেখুন
  </VueSchoolLink>
</div>

Vue SPA নির্মাণের জন্য উপযুক্ত। বেশিরভাগ SPA-এর জন্য, আনুষ্ঠানিকভাবে-সমর্থিত [Vue Router লাইব্রেরি](https://github.com/vuejs/router) ব্যবহার করার পরামর্শ দেওয়া হয়। আরও বিস্তারিত জানার জন্য, ভিউ রাউটারের [ডকুমেন্টেশন](https://router.vuejs.org/) দেখুন।

## Simple Routing from Scratch {#simple-routing-from-scratch}

আপনার যদি খুব সাধারণ রাউটিং প্রয়োজন হয় এবং আপনি একটি পূর্ণ-বৈশিষ্ট্যযুক্ত রাউটার লাইব্রেরি অন্তর্ভুক্ত করতে না চান, তাহলে আপনি [ডাইনামিক কম্পোনেন্ট](/guide/essentials/component-basics#dynamic-components) দিয়ে তা করতে পারেন এবং বর্তমান উপাদানের অবস্থা আপডেট করুন ব্রাউজারে শোনা [`hashchange` ইভেন্ট](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) অথবা [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) ব্যবহার করে। ।

এখানে একটি উদাহরণ:

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">Home</a> | <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

[চেষ্টা করুন](https://play.vuejs.org/#eNptUk1vgkAQ/SsTegAThZp4MmhikzY9mKanXkoPWxjLRpgly6JN1P/eWb5Eywlm572ZN2/m5GyKwj9U6CydsIy1LAyUaKpiHZHMC6UNnEDjbgqxyovKYAIX2GmVg8sktwe9qhzbdz+wga15TW++VWX6fB3dAt6UeVEVJT2me2hhEcWKSgOamVjCCk4RAbiBu6xbT5tI2ML8VDeI6HLlxZXWSOZdmJTJPJB3lJSoo5+pWBipyE9FmU4soU2IJHk+MGUrS4OE2nMtIk4F/aA7BW8Cq3WjYlDbP4isQu4wVp0F1Q1uFH1IPDK+c9cb1NW8B03tyJ//uvhlJmP05hM4n60TX/bb2db0CoNmpbxMDgzmRSYMcgQQCkjZhlXkPASRs7YmhoFYw/k+WXvKiNrTcQgpmuFv7ZOZFSyQ4U9a7ZFgK2lvSTXFDqmIQbCUJTMHFkQOBAwKg16kM3W6O7K3eSs+nbeK+eee1V/XKK0dY4Q3vLhR6uJxMUK8/AFKaB6k)

</div>

<div class="options-api">

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <a href="#/">Home</a> | <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

[চেষ্টা করুন](https://play.vuejs.org/#eNptUstO6zAQ/ZVR7iKtVJKLxCpKK3Gli1ggxIoNZmGSKbFoxpEzoUi0/87YeVBKNonHPmfOmcdndN00yXuHURblbeFMwxtFpm6sY7i1NcLW2RriJPWBB8bT8/WL7Xh6D9FPwL3lG9tROWHGiwGmqLDUMjhhYgtr+FQEEKdxFqRXfaR9YrkKAoqOnocfQaDEre523PNKzXqx7M8ADrlzNEYAReccEj9orjLYGyrtPtnZQrOxlFS6rXqgZJdPUC5s3YivMhuTDCkeDe6/dSalvognrkybnIgl7c4UuLhcwuHgS3v2/7EPvzRruRXJ7/SDU12W/98l451pGQndIvaWi0rTK8YrEPx64ymKFQOce5DOzlfs4cdlkA+NzdNpBSRgrJudZpQIINdQOdyuVfQnVdHGzydP9QYO549hXIII45qHkKUL/Ail8EUjBgX+z9k3JLgz9OZJgeInYElAkJlWmCcDUBGkAsrTyWS0isYV9bv803x1OTiWwzlrWtxZ2lDGDO90mWepV3+vZojHL3QQKQE=)

</div>
