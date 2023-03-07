# Template Refs {#template-refs}

যদিও Vue-এর ঘোষণামূলক রেন্ডারিং মডেল আপনার জন্য বেশিরভাগ সরাসরি DOM ক্রিয়াকলাপগুলিকে বিমূর্ত করে দেয়, তখনও এমন কিছু ক্ষেত্রে হতে পারে যেখানে আমাদের অন্তর্নিহিত DOM উপাদানগুলিতে সরাসরি অ্যাক্সেসের প্রয়োজন। এটি অর্জন করতে, আমরা বিশেষ `ref` বৈশিষ্ট্য ব্যবহার করতে পারি:

```vue-html
<input ref="input">
```

`ref` একটি বিশেষ বৈশিষ্ট্য, `v-for` অধ্যায়ে আলোচিত `key` বৈশিষ্ট্যের অনুরূপ। এটি মাউন্ট করার পরে এটি আমাদের একটি নির্দিষ্ট DOM উপাদান বা চাইল্ড কম্পোনেন্ট ইনস্ট্যান্সের সরাসরি রেফারেন্স পেতে দেয়। এটি উপযোগী হতে পারে যখন আপনি চান, উদাহরণস্বরূপ, প্রোগ্রাম্যাটিকভাবে উপাদান মাউন্টে একটি ইনপুট ফোকাস করতে, বা একটি উপাদানে একটি 3য় পক্ষের লাইব্রেরি শুরু করতে।

## Accessing the Refs {#accessing-the-refs}

<div class="composition-api">

Composition API এর সাথে রেফারেন্স পেতে, আমাদের একই নামের একটি রেফ ঘোষণা করতে হবে:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

যদি `<script setup>` ব্যবহার না করেন, তাহলে নিশ্চিত করুন যে `setup()` থেকে রেফটিও ফেরত দিতে হবে:

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</div>
<div class="options-api">

ফলাফলের রেফটি `this.$refs`-এ উন্মোচিত হয়:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

মনে রাখবেন যে আপনি শুধুমাত্র রেফ অ্যাক্সেস করতে পারবেন **কম্পোনেন্ট মাউন্ট করার পরে।** আপনি যদি <span class="options-api">`$refs.input`</span><span class="composition- অ্যাক্সেস করার চেষ্টা করেন api">`input`</span> একটি টেমপ্লেট এক্সপ্রেশনে, এটি প্রথম রেন্ডারে `null` হবে। কারণ প্রথম রেন্ডার না হওয়া পর্যন্ত উপাদানটির অস্তিত্ব নেই!

<div class="composition-api">

আপনি যদি একটি টেমপ্লেট রেফের পরিবর্তনগুলি দেখার চেষ্টা করছেন, তাহলে রেফের `null` মান আছে এমন ক্ষেত্রে অ্যাকাউন্ট নিশ্চিত করুন:

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
})
```

আরো দেখুন: [Typing Template Refs](/guide/typescript/composition-api.html#typing-template-refs) <sup class="vt-badge ts" />

</div>

## Refs inside `v-for` {#refs-inside-v-for}

> Requires v3.2.25 or above

<div class="composition-api">

যখন `v-for`-এর ভিতরে `ref` ব্যবহার করা হয়, তখন সংশ্লিষ্ট রেফটিতে একটি অ্যারে মান থাকা উচিত, যা মাউন্টের পরে উপাদানগুলির সাথে পপুলেট করা হবে:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ID0gcmVmKFsxLCAyLCAzXSlcblxuY29uc3QgaXRlbVJlZnMgPSByZWYoW10pXG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIGFsZXJ0KGl0ZW1SZWZzLnZhbHVlLm1hcChpID0+IGkudGV4dENvbnRlbnQpKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtUmVmc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

যখন `v-for`-এর ভিতরে `ref` ব্যবহার করা হয়, তখন রেফ মানটি সংশ্লিষ্ট উপাদান সমন্বিত একটি অ্যারে হবে:

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdDogWzEsIDIsIDNdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuJHJlZnMuaXRlbXMpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

এটা উল্লেখ করা উচিত যে রেফ অ্যারে সোর্স অ্যারের মতো একই অর্ডারের নিশ্চয়তা **না** দেয়।

## Function Refs {#function-refs}

একটি স্ট্রিং কী এর পরিবর্তে, `ref` অ্যাট্রিবিউটটি একটি ফাংশনের সাথেও আবদ্ধ হতে পারে, যা প্রতিটি উপাদান আপডেটে কল করা হবে এবং আপনাকে উপাদানের রেফারেন্স কোথায় সংরক্ষণ করতে হবে সে সম্পর্কে সম্পূর্ণ নমনীয়তা দেয়। ফাংশন প্রথম যুক্তি হিসাবে উপাদান রেফারেন্স গ্রহণ করে:

```vue-html
<input :ref="(el) => { /* assign el to a property or ref */ }">
```

মনে রাখবেন আমরা একটি ডায়নামিক `:ref` বাইন্ডিং ব্যবহার করছি যাতে আমরা এটিকে রেফ নামের স্ট্রিংয়ের পরিবর্তে একটি ফাংশন পাস করতে পারি। যখন উপাদানটি আনমাউন্ট করা হয়, আর্গুমেন্টটি হবে `null`। আপনি, অবশ্যই, ইনলাইন ফাংশনের পরিবর্তে একটি পদ্ধতি ব্যবহার করতে পারেন।

## Ref on Component {#ref-on-component}

> এই বিভাগটি [Components](/guide/essentials/component-basics) সম্পর্কে জ্ঞান গ্রহণ করে। নির্দ্বিধায় এটি এড়িয়ে যান এবং পরে ফিরে আসুন।

`ref` একটি child উপাদানেও ব্যবহার করা যেতে পারে। এই ক্ষেত্রে রেফারেন্স একটি উপাদান উদাহরণ যে হবে:

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value will hold an instance of <Child />
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child will hold an instance of <Child />
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">যদি চাইল্ড কম্পোনেন্ট Options API ব্যবহার করে বা `<script setup>` ব্যবহার না করে, তাহলে</span><span class="options-api">দি</span> রেফারেন্স করা উদাহরণ চাইল্ড কম্পোনেন্টের 'এই'-এর সাথে অভিন্ন হবে, যার মানে প্যারেন্ট কম্পোনেন্টের চাইল্ড কম্পোনেন্টের প্রতিটি সম্পত্তি এবং পদ্ধতিতে সম্পূর্ণ অ্যাক্সেস থাকবে। এটি পিতামাতা এবং সন্তানের মধ্যে দৃঢ়ভাবে সংযুক্ত বাস্তবায়নের বিশদ তৈরি করা সহজ করে তোলে, তাই কম্পোনেন্ট রেফ শুধুমাত্র যখন একেবারে প্রয়োজন হয় তখনই ব্যবহার করা উচিত - বেশিরভাগ ক্ষেত্রে, আপনাকে স্ট্যান্ডার্ড প্রপস ব্যবহার করে অভিভাবক/শিশু মিথস্ক্রিয়া প্রয়োগ করার চেষ্টা করা উচিত এবং প্রথমে ইন্টারফেস নির্গত করার চেষ্টা করা উচিত।

<div class="composition-api">

এখানে একটি ব্যতিক্রম হল যে `<স্ক্রিপ্ট সেটআপ>` ব্যবহার করা উপাদানগুলি **ডিফল্টরূপে ব্যক্তিগত**: একটি অভিভাবক উপাদান যা `<স্ক্রিপ্ট সেটআপ>` ব্যবহার করে একটি শিশু উপাদানকে উল্লেখ করে কোনো কিছু অ্যাক্সেস করতে সক্ষম হবে না যদি না শিশু উপাদান পছন্দ করে 'defineExpose' ম্যাক্রো ব্যবহার করে একটি সর্বজনীন ইন্টারফেস প্রকাশ করুন:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// Compiler macros, such as defineExpose, don't need to be imported
defineExpose({
  a,
  b
})
</script>
```

যখন একজন অভিভাবক টেমপ্লেট রেফের মাধ্যমে এই উপাদানটির একটি দৃষ্টান্ত পান, তখন পুনরুদ্ধারকৃত দৃষ্টান্তটি `{ a: number , b: number  }` আকারের হবে (রেফগুলি স্বয়ংক্রিয়ভাবে স্বাভাবিক উদাহরণের মতোই খুলে ফেলা হয়)।

আরো দেখুন: [Typing Component Template Refs](/guide/typescript/composition-api.html#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

`expose` option একটি child উদাহরণে অ্যাক্সেস সীমিত করতে ব্যবহার করা যেতে পারে:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

উপরের উদাহরণে, টেমপ্লেট রেফের মাধ্যমে এই উপাদানটি উল্লেখ করা একজন অভিভাবক শুধুমাত্র `publicData` এবং `publicMethod` অ্যাক্সেস করতে সক্ষম হবেন।

</div>
