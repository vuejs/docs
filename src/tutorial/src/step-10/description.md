# Watchers {#watchers}

কখনও কখনও আমাদের প্রতিক্রিয়াশীলভাবে "পার্শ্ব প্রতিক্রিয়া" সম্পাদন করতে হতে পারে - উদাহরণস্বরূপ, কনসোলে একটি নম্বর লগ করা যখন এটি পরিবর্তন হয়। আমরা পর্যবেক্ষকদের সাথে এটি অর্জন করতে পারি:

<div class="composition-api">

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // yes, console.log() is a side effect
  console.log(`new count is: ${newCount}`)
})
```

`watch()` সরাসরি একটি রেফ দেখতে পারে এবং যখনই `count` এর মান পরিবর্তন হয় তখন কলব্যাকটি বরখাস্ত হয়ে যায়। `watch()` অন্যান্য ধরনের ডেটা উত্সও দেখতে পারে - আরও বিশদ বিবরণ <a target="_blank" href="/guide/essentials/watchers.html">গাইড - ওয়াচার্স</a>-এ দেওয়া আছে।

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  watch: {
    count(newCount) {
      // yes, console.log() is a side effect
      console.log(`new count is: ${newCount}`)
    }
  }
}
```

এখানে, আমরা `count` বৈশিষ্ট্যের পরিবর্তনগুলি দেখতে `watch` বিকল্পটি ব্যবহার করছি। ঘড়ি কলব্যাক বলা হয় যখন `count` পরিবর্তিত হয়, এবং আর্গুমেন্ট হিসাবে নতুন মান গ্রহণ করে। আরো বিশদ বিবরণ <a target="_blank" href="/guide/essentials/watchers.html">গাইড - ওয়াচার্স</a>-এ দেওয়া আছে।

</div>

কনসোলে লগ করার চেয়ে একটি আরও বাস্তব উদাহরণ হল একটি আইডি পরিবর্তন হলে নতুন ডেটা আনা। আমাদের কাছে কোডটি উপাদান মাউন্টে একটি মক API থেকে todos ডেটা আনছে। এছাড়াও একটি বোতাম রয়েছে যা টোডো আইডি বৃদ্ধি করে যা আনতে হবে। বোতামটি ক্লিক করার সময় একটি নতুন করণীয় নিয়ে আসে এমন একটি প্রহরী প্রয়োগ করার চেষ্টা করুন৷
