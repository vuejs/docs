# Watchers {#watchers}

## Basic Example {#basic-example}

গণনাকৃত বৈশিষ্ট্য আমাদেরকে ঘোষণামূলকভাবে প্রাপ্ত মান গণনা করতে দেয়। যাইহোক, এমন কিছু ক্ষেত্রে আছে যেখানে রাষ্ট্রীয় পরিবর্তনের প্রতিক্রিয়ায় আমাদের "পার্শ্ব প্রতিক্রিয়া" করতে হবে - উদাহরণস্বরূপ, DOM পরিবর্তন করা, বা অ্যাসিঙ্ক অপারেশনের ফলাফলের ভিত্তিতে রাষ্ট্রের অন্য অংশ পরিবর্তন করা।

<div class="options-api">

অপশন এপিআই এর সাথে, যখনই একটি প্রতিক্রিয়াশীল প্রপার্টি পরিবর্তন হয় তখন আমরা একটি ফাংশন ট্রিগার করতে [`ঘড়ি` বিকল্প](/api/options-state#watch) ব্যবহার করতে পারি:

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)'
    }
  },
  watch: {
    // whenever question changes, this function will run
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      }
    }
  }
}
```

```vue-html
<p>
  Ask a yes/no question:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[চেষ্টা করুন](https://play.vuejs.org/#eNptUk2PmzAQ/SuvXAA1sdVrmt0qqnroqa3UIxcLhuCGjKk/wkYR/70OBJLuroRkPDPvzbznuSS7rhOnQMkm2brS6s4/F0wvnbEeFdUqtB6XgoFKeZXl0z9gyQfL8w34G8h5bXiDNF3NQcWuJxtDv25Zh+CCatszSsNeaYZakDgqexD4vM7TCT9cj2Ek65Uvm83cTUr0DTGdyN7RZaN4T24F32iHOnA5hnvdtrCBJ+RcnTH180wrmLaaL4s+QNd4LBOaK3r5UWfplzTHM9afHmoxdhV78rtRcpbPmVHEf1qO5BtTuUWNcmcu8QC9046kk4l4Qvq70XzQvBdC3CyKJfb8OEa01fn4OC7Wq15pj5qidVnaeN+5jZRncmxE72upOp0uY77ulU3gSCT+uOhXnt9yiy6U1zdBRtYa+9aK+9TfrgUf8NWEtgKbK6mKQN8Qdj+/C6T4iJHkXcsKjt9WLpsZL56OXas8xRuw7cYD2LlDXKYoT7K5b+OU22rugsdpfTQVtU9FMueLBHKikRNPpLtcbnuLYZjCW7m0TIZ/92UFiQ==)

`watch` option key হিসাবে একটি ডট-ডিলিমিটেড পাথকেও সমর্থন করে:

```js
export default {
  watch: {
    // Note: only simple paths. Expressions are not supported.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

কম্পোজিশন এপিআই-এর সাথে, যখনই প্রতিক্রিয়াশীল অবস্থার একটি অংশ পরিবর্তিত হয় তখন আমরা একটি কলব্যাক ট্রিগার করতে [`ঘড়ি` ফাংশন](/api/reactivity-core#watch) ব্যবহার করতে পারি:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[চেষ্টা করুন](https://play.vuejs.org/#eNplkkGPmzAQhf/KKxdA3Rj1mpJUUdVDT22lHrlYxDRuYOzaJjRC/PcdxyGr3b2A7PfmmzcMc3awVlxGlW2z2rdO2wCvwmj3DenBGhcww6nuCZMM7QkLOmcG5FyRN9RQa8gH/BuVD9oQdtFb5Hm5KpL8pNx6/+vu8xj9KPv+CnYFqQnyhTFIdxb4vCkjpaFb32JVnyD9lVoUpKaVVmK3x9wQoLtXgtB0VP9/cOMveYk9Np/K5MM9l7jIflScLv990nTW9EcIwXNFR3DX1YwYk4dxyrNXTlIHdCrGyk8hWL+tqqvyZMQUukpaHYOnujdtilTLHPHXGyrKUiRH8i9obx+5UM4Z98j6Pu23qH/AVzP2R5CJRMl14aRw+PldIMdH3Bh3bnzxY+FcdZW2zPvlQ1CD7WVQfALquPToP/gzL4RHqsg89rJNWq3JjgGXzWCOqt812ao3GaqEqRKHcfO8/gDLkq7r6tEyW54Bf5TTlg==)

### Watch Source Types {#watch-source-types}

`watch` এর প্রথম যুক্তি হতে পারে বিভিন্ন ধরনের প্রতিক্রিয়াশীল "উৎস": এটি একটি ref (including computed refs), একটি প্রতিক্রিয়াশীল বস্তু, একটি getter ফাংশন, বা একাধিক sources একটি array হতে পারে:

```js
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

মনে রাখবেন যে আপনি এই মত একটি প্রতিক্রিয়াশীল বস্তুর একটি সম্পত্তি দেখতে পারবেন না:

```js
const obj = reactive({ count: 0 })

// this won't work because we are passing a number to watch()
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

পরিবর্তে, একটি গেটার ব্যবহার করুন:

```js
// instead, use a getter:
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

</div>

## Deep Watchers {#deep-watchers}

<div class="options-api">

`watch` ডিফল্টরূপে অগভীর: কলব্যাক শুধুমাত্র তখনই ট্রিগার হবে যখন প্রেক্ষিত সম্পত্তির একটি নতুন মান বরাদ্দ করা হয়েছে - এটি নেস্টেড সম্পত্তি পরিবর্তনে ট্রিগার করবে না। আপনি যদি সমস্ত নেস্টেড মিউটেশনে কলব্যাক ফায়ার করতে চান তবে আপনাকে একটি গভীর পর্যবেক্ষণকারী ব্যবহার করতে হবে:

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

যখন আপনি একটি প্রতিক্রিয়াশীল বস্তুতে সরাসরি `watch()` কল করেন, তখন এটি অন্তর্নিহিতভাবে একটি গভীর পর্যবেক্ষণকারী তৈরি করবে - কলব্যাকটি সমস্ত নেস্টেড মিউটেশনে ট্রিগার হবে:

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // fires on nested property mutations
  // Note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object!
})

obj.count++
```

এটি একটি প্রাপ্তকারীর সাথে পার্থক্য করা উচিত যা একটি প্রতিক্রিয়াশীল বস্তু ফেরত দেয় - পরবর্তী ক্ষেত্রে, কলব্যাক শুধুমাত্র তখনই চালু হবে যদি প্রাপ্তকারী একটি ভিন্ন বস্তু ফেরত দেয়:

```js
watch(
  () => state.someObject,
  () => {
    // fires only when state.someObject is replaced
  }
)
```

তবে, আপনি স্পষ্টভাবে `deep` বিকল্পটি ব্যবহার করে দ্বিতীয় কেসটিকে গভীর পর্যবেক্ষণকারীতে জোর করতে পারেন:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Note: `newValue` will be equal to `oldValue` here
    // *unless* state.someObject has been replaced
  },
  { deep: true }
)
```

</div>

:::warning সতর্কতার সাথে ব্যবহার করুন
গভীর ঘড়ির জন্য প্রেক্ষিত বস্তুর সমস্ত নেস্টেড বৈশিষ্ট্যগুলিকে অতিক্রম করা প্রয়োজন এবং বড় ডেটা স্ট্রাকচারে ব্যবহার করা হলে এটি ব্যয়বহুল হতে পারে। প্রয়োজন হলেই এটি ব্যবহার করুন এবং কর্মক্ষমতার প্রভাব সম্পর্কে সতর্ক থাকুন।
:::

## Eager Watchers {#eager-watchers}

`watch` ডিফল্টরূপে অলস: দেখা উৎস পরিবর্তন না হওয়া পর্যন্ত কলব্যাক কল করা হবে না। কিন্তু কিছু ক্ষেত্রে আমরা একই কলব্যাক লজিক সাগ্রহে চালিত করতে চাই - উদাহরণস্বরূপ, আমরা কিছু প্রাথমিক ডেটা আনতে চাই, এবং তারপরে প্রাসঙ্গিক অবস্থার পরিবর্তন হলে ডেটা পুনরায় আনতে চাই৷

<div class="options-api">

আমরা একটি `handler` ফাংশন এবং `immediate: true` বিকল্পের সাথে একটি বস্তু ব্যবহার করে ঘোষণা করে অবিলম্বে একজন প্রহরীর কলব্যাক কার্যকর করতে বাধ্য করতে পারি:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // this will be run immediately on component creation.
      },
      // force eager callback execution
      immediate: true
    }
  }
  // ...
}
```

হ্যান্ডলার ফাংশনের প্রাথমিক সঞ্চালন 'তৈরি' হুকের ঠিক আগে ঘটবে। Vue ইতিমধ্যেই `data`, `computed` এবং `created` বিকল্পগুলিকে প্রক্রিয়া করেছে, তাই সেই বৈশিষ্ট্যগুলি প্রথম আহ্বানে উপলব্ধ হবে।

</div>

<div class="composition-api">

আমরা `immediate: true` বিকল্পটি পাস করে অবিলম্বে একজন পর্যবেক্ষকের কলব্যাক কার্যকর করতে বাধ্য করতে পারি:

```js
watch(
  source,
  (newValue, oldValue) => {
    // executed immediately, then again when `source` changes
  },
  { immediate: true }
)
```

</div>

<div class="composition-api">

## `watchEffect()` \*\* {#watcheffect}

পর্যবেক্ষক কলব্যাকের জন্য উত্স হিসাবে ঠিক একই প্রতিক্রিয়াশীল অবস্থা ব্যবহার করা সাধারণ। উদাহরণ স্বরূপ, নিম্নলিখিত কোডটি বিবেচনা করুন, যেটি রিমোট রিসোর্স লোড করার জন্য একটি প্রহরী ব্যবহার করে যখনই `todoId` রেফ পরিবর্তন হয়:

```js
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
```

বিশেষ করে, লক্ষ্য করুন কিভাবে পর্যবেক্ষক দুইবার `todoId` ব্যবহার করে, একবার উৎস হিসেবে এবং তারপর আবার কলব্যাকের ভিতরে।

এটি [`watchEffect()`](/api/reactivity-core#watcheffect) দিয়ে সরলীকৃত করা যেতে পারে। `watchEffect()` আমাদের কলব্যাকের প্রতিক্রিয়াশীল নির্ভরতা স্বয়ংক্রিয়ভাবে ট্র্যাক করতে দেয়। উপরের প্রহরীটিকে এইভাবে পুনরায় লেখা যেতে পারে:

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

এখানে, কলব্যাক অবিলম্বে চালানো হবে, `immediate: true` নির্দিষ্ট করার প্রয়োজন নেই। এটি কার্যকর করার সময়, এটি স্বয়ংক্রিয়ভাবে নির্ভরতা হিসাবে `todoId.value` ট্র্যাক করবে (গণনা করা বৈশিষ্ট্যের মতো)। যখনই `todoId.value` পরিবর্তিত হয়, কলব্যাক আবার চালানো হবে। `watchEffect()` এর সাথে, আমাদের আর `todoId` সুস্পষ্টভাবে উৎস মান হিসেবে পাস করতে হবে না।

আপনি `watchEffect()`-এর [এই উদাহরণ](/examples/#fetching-data) এবং প্রতিক্রিয়াশীল ডেটা-ফেচিং অ্যাকশনে দেখতে পারেন।

এই ধরনের উদাহরণের জন্য, শুধুমাত্র একটি নির্ভরতার সাথে, `watchEffect()` এর সুবিধা তুলনামূলকভাবে ছোট। কিন্তু পর্যবেক্ষকদের জন্য যাদের একাধিক নির্ভরতা রয়েছে, `watchEffect()` ব্যবহার করে নির্ভরতার তালিকা ম্যানুয়ালি বজায় রাখার বোঝা সরিয়ে দেয়। উপরন্তু, যদি আপনি একটি নেস্টেড ডেটা স্ট্রাকচারে বেশ কয়েকটি বৈশিষ্ট্য দেখতে চান, তাহলে `watchEffect()` একটি গভীর পর্যবেক্ষণকারীর চেয়ে বেশি কার্যকরী প্রমাণিত হতে পারে, কারণ এটি কেবলমাত্র কলব্যাকে ব্যবহৃত বৈশিষ্ট্যগুলিকে ট্র্যাক করবে, পুনরাবৃত্তিমূলকভাবে সমস্ত ট্র্যাক করার পরিবর্তে তাদের

:::tip
`watchEffect` শুধুমাত্র তার **synchronous** সম্পাদনের সময় নির্ভরতা ট্র্যাক করে। একটি async কলব্যাকের সাথে এটি ব্যবহার করার সময়, প্রথম `await` টিক টিক করার আগে শুধুমাত্র অ্যাক্সেস করা বৈশিষ্ট্যগুলি ট্র্যাক করা হবে৷
:::

### `watch` vs. `watchEffect` {#watch-vs-watcheffect}

`watch` এবং `watchEffect` উভয়ই আমাদের প্রতিক্রিয়াশীলভাবে পার্শ্বপ্রতিক্রিয়া সম্পাদন করতে দেয়। তাদের প্রধান পার্থক্য হল যেভাবে তারা তাদের প্রতিক্রিয়াশীল নির্ভরতা ট্র্যাক করে:

- `watch` শুধুমাত্র স্পষ্টভাবে দেখা উৎস ট্র্যাক করে। এটি কলব্যাকের ভিতরে অ্যাক্সেস করা কিছু ট্র্যাক করবে না। উপরন্তু, কলব্যাক শুধুমাত্র তখনই ট্রিগার হয় যখন উৎস আসলে পরিবর্তিত হয়। `watch` নির্ভরতা ট্র্যাকিংকে পার্শ্বপ্রতিক্রিয়া থেকে আলাদা করে, কলব্যাক কখন চালু হবে তার উপর আমাদের আরও সুনির্দিষ্ট নিয়ন্ত্রণ দেয়।

- `watchEffect`, অন্যদিকে, নির্ভরতা ট্র্যাকিং এবং পার্শ্ব প্রতিক্রিয়াকে এক পর্যায়ে একত্রিত করে। এটি স্বয়ংক্রিয়ভাবে তার সিঙ্ক্রোনাস সম্পাদনের সময় অ্যাক্সেস করা প্রতিটি প্রতিক্রিয়াশীল সম্পত্তি ট্র্যাক করে। এটি আরও সুবিধাজনক এবং সাধারণত টারসার কোডে পরিণত হয়, তবে এর প্রতিক্রিয়াশীল নির্ভরতা কম স্পষ্ট করে তোলে।

</div>

## Callback Flush Timing {#callback-flush-timing}

আপনি যখন প্রতিক্রিয়াশীল অবস্থা পরিবর্তন করেন, তখন এটি আপনার দ্বারা তৈরি Vue উপাদান আপডেট এবং প্রহরী কলব্যাক উভয়ই ট্রিগার করতে পারে।

ডিফল্টরূপে, ব্যবহারকারীর তৈরি প্রহরী কলব্যাকগুলিকে **আগে** Vue কম্পোনেন্ট আপডেট বলা হয়। এর অর্থ হল আপনি যদি একজন প্রহরী কলব্যাকের ভিতরে DOM অ্যাক্সেস করার চেষ্টা করেন, Vue কোনো আপডেট প্রয়োগ করার আগে DOM-টি থাকবে।

আপনি যদি ভিউ এটি আপডেট করার **পর** একটি প্রহরী কলব্যাকে DOM অ্যাক্সেস করতে চান তবে আপনাকে `flush: 'post'` বিকল্পটি নির্দিষ্ট করতে হবে:

<div class="options-api">

```js
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

</div>

<div class="composition-api">

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

পোস্ট-ফ্লাশ `watchEffect()` এরও একটি সুবিধার উপনাম আছে, `watchPostEffect()`:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* executed after Vue updates */
})
```

</div>

<div class="options-api">

## `this.$watch()` \* {#this-watch}

এটি ব্যবহার করে অপরিহার্যভাবে পর্যবেক্ষক তৈরি করাও সম্ভব [`$watch()` instance method](/api/component-instance#watch):

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

আপনি যখন শর্তসাপেক্ষে একজন পর্যবেক্ষক সেট আপ করতে চান বা শুধুমাত্র ব্যবহারকারীর ইন্টারঅ্যাকশনের প্রতিক্রিয়া হিসাবে কিছু দেখতে চান তখন এটি কার্যকর। এটি আপনাকে পর্যবেক্ষককে তাড়াতাড়ি থামাতে দেয়।

</div>

## Stopping a Watcher {#stopping-a-watcher}

<div class="options-api">

যখন মালিকের উপাদান আনমাউন্ট করা হয় তখন `watch` বিকল্প বা `$watch()` ইনস্ট্যান্স পদ্ধতি ব্যবহার করে ঘোষিত প্রহরীরা স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যায়, তাই বেশিরভাগ ক্ষেত্রে আপনাকে প্রহরীকে থামানোর বিষয়ে চিন্তা করতে হবে না।

বিরল ক্ষেত্রে যেখানে মালিকের উপাদান আনমাউন্ট করার আগে আপনাকে একজন প্রহরীকে থামাতে হবে, `$watch()` API এর জন্য একটি ফাংশন প্রদান করে:

```js
const unwatch = this.$watch('foo', callback)

// ...when the watcher is no longer needed:
unwatch()
```

</div>

<div class="composition-api">

`setup()` বা `<script setup>` এর ভিতরে সিঙ্ক্রোনাসভাবে ঘোষিত প্রহরীরা মালিকের কম্পোনেন্ট ইনস্ট্যান্সের সাথে আবদ্ধ থাকে এবং মালিকের কম্পোনেন্ট আনমাউন্ট করা হলে স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যাবে। বেশিরভাগ ক্ষেত্রে, আপনাকে প্রহরীকে থামানোর বিষয়ে চিন্তা করার দরকার নেই।

এখানে মূল বিষয় হল প্রহরীকে **synchronously** তৈরি করতে হবে: যদি প্রহরী একটি অ্যাসিঙ্ক কলব্যাকে তৈরি করা হয়, তবে এটি মালিকের উপাদানের সাথে আবদ্ধ হবে না এবং মেমরি লিক এড়াতে ম্যানুয়ালি বন্ধ করতে হবে। এখানে একটি উদাহরণ:

```vue
<script setup>
import { watchEffect } from 'vue'

// this one will be automatically stopped
watchEffect(() => {})

// ...this one will not!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

একজন প্রহরীকে ম্যানুয়ালি থামাতে, রিটার্ন করা হ্যান্ডেল ফাংশনটি ব্যবহার করুন। এটি `watch` এবং `watchEffect` উভয়ের জন্যই কাজ করে:

```js
const unwatch = watchEffect(() => {})

// ...later, when no longer needed
unwatch()
```

মনে রাখবেন যে খুব কম ক্ষেত্রেই আপনাকে অ্যাসিঙ্ক্রোনাসভাবে পর্যবেক্ষক তৈরি করতে হবে এবং যখনই সম্ভব সিঙ্ক্রোনাস তৈরিকে অগ্রাধিকার দেওয়া উচিত। আপনার যদি কিছু অ্যাসিঙ্ক ডেটার জন্য অপেক্ষা করতে হয়, তাহলে আপনি পরিবর্তে আপনার ঘড়ির যুক্তি শর্তসাপেক্ষ করতে পারেন:

```js
// data to be loaded asynchronously
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // do something when data is loaded
  }
})
```

</div>
