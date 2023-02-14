# Event Listeners {#event-listeners}

আমরা `v-on` নির্দেশ ব্যবহার করে DOM ইভেন্ট শুনতে পারি:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

এর ঘন ঘন ব্যবহারের কারণে, `v-on` এর একটি সংক্ষিপ্ত বাক্য গঠনও রয়েছে:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

এখানে, `increment` `methods` option ব্যবহার করে ঘোষিত একটি ফাংশন উল্লেখ করে:

<div class="sfc">

```js{7-12}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // update component state
      this.count++
    }
  }
}
```

</div>
<div class="html">

```js{7-12}
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // update component state
      this.count++
    }
  }
})
```

</div>

একটি পদ্ধতির ভিতরে, আমরা `this` ব্যবহার করে কম্পোনেন্ট ইনস্ট্যান্স অ্যাক্সেস করতে পারি। কম্পোনেন্ট ইনস্ট্যান্স `data` দ্বারা ঘোষিত ডেটা বৈশিষ্ট্যগুলিকে প্রকাশ করে। আমরা এই বৈশিষ্ট্যগুলিকে পরিবর্তন করে উপাদানের অবস্থা আপডেট করতে পারি।

</div>

<div class="composition-api">

<div class="sfc">

এখানে, `increment` `<script setup>` এ ঘোষিত একটি ফাংশনকে উল্লেখ করছে:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // update component state
  count.value++
}
</script>
```

</div>

<div class="html">

এখানে, `increment` `setup()` থেকে প্রত্যাবর্তিত বস্তুর একটি পদ্ধতির উল্লেখ করছে:

```js{$}
setup() {
  const count = ref(0)

  function increment(e) {
    // update component state
    count.value++
  }

  return {
    count,
    increment
  }
}
```

</div>

ফাংশনের ভিতরে, আমরা refs পরিবর্তন করে উপাদানের অবস্থা আপডেট করতে পারি।

</div>

ইভেন্ট হ্যান্ডলাররাও ইনলাইন এক্সপ্রেশন ব্যবহার করতে পারে এবং মডিফায়ারের সাহায্যে সাধারণ কাজগুলোকে সহজ করতে পারে। এই বিবরণগুলি <a target="_blank" href="/guide/essentials/event-handling.html">গাইড - ইভেন্ট হ্যান্ডলিং</a>-এ কভার করা হয়েছে ৷

এখন, `increment` <span class="options-api">পদ্ধতি</span><span class="composition-api">ফাংশন</span> প্রয়োগ করার চেষ্টা করুন এবং `v-on` ব্যবহার করে বোতামে এটি আবদ্ধ করুন ৷
