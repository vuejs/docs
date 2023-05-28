# Computed Properties {#computed-properties}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="বিনামূল্যে Vue.js Computed Properties পাঠ"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="বিনামূল্যে Vue.js Computed Properties পাঠ"/>
</div>

## Basic Example {#basic-example}

ইন-টেমপ্লেট এক্সপ্রেশনগুলি খুব সুবিধাজনক, তবে সেগুলি সাধারণ ক্রিয়াকলাপের জন্য তৈরি৷ আপনার টেমপ্লেটগুলিতে অত্যধিক যুক্তি রাখলে সেগুলি ফুলে উঠতে পারে এবং বজায় রাখা কঠিন হতে পারে। উদাহরণস্বরূপ, যদি আমাদের একটি নেস্টেড অ্যারে সহ একটি বস্তু থাকে:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

এবং `author` ইতিমধ্যেই কিছু বই আছে কি না তার উপর নির্ভর করে আমরা বিভিন্ন বার্তা প্রদর্শন করতে চাই:

```vue-html
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

এই মুহুর্তে, টেমপ্লেটটি কিছুটা বিশৃঙ্খল হচ্ছে। এটি `author.books`-এর উপর নির্ভর করে একটি গণনা করে তা উপলব্ধি করার আগে আমাদের এটিকে এক সেকেন্ডের জন্য দেখতে হবে। আরও গুরুত্বপূর্ণ, যদি আমাদের এই গণনাটি একাধিকবার টেমপ্লেটে অন্তর্ভুক্ত করার প্রয়োজন হয় তবে আমরা সম্ভবত নিজেদের পুনরাবৃত্তি করতে চাই না।

এই কারণেই জটিল যুক্তির জন্য যা প্রতিক্রিয়াশীল ডেটা অন্তর্ভুক্ত করে, এটি একটি **গণনা করা সম্পত্তি** ব্যবহার করার পরামর্শ দেওয়া হয়। এখানে একই উদাহরণ, রিফ্যাক্টর করা হয়েছে:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
```

```vue-html
<p>Has published books:</p>
<span>{{ publishedBooksMessage }}</span>
```

[চেষ্টা করুন](https://play.vuejs.org/#eNqFkN1KxDAQhV/l0JsqaFfUq1IquwiKsF6JINaLbDNui20S8rO4lL676c82eCFCIDOZMzkzXxetlUoOjqI0ykypa2XzQtC3ktqC0ydzjUVXCIAzy87OpxjQZJ0WpwxgzlZSp+EBEKylFPGTrATuJcUXobST8sukeA8vQPzqCNe4xJofmCiJ48HV/FfbLLrxog0zdfmn4tYrXirC9mgs6WMcBB+nsJ+C8erHH0rZKmeJL0sot2tqUxHfDONuyRi2p4BggWCr2iQTgGTcLGlI7G2FHFe4Q/xGJoYn8SznQSbTQviTrRboPrHUqoZZ8hmQqfyRmTDFTC1bqalsFBN5183o/3NG33uvoWUwXYyi/gdTEpwK)

এখানে আমরা একটি গণনাকৃত সম্পত্তি `publishedBooksMessage` ঘোষণা করেছি।

অ্যাপ্লিকেশন `data`-এ `books` অ্যারের মান পরিবর্তন করার চেষ্টা করুন এবং আপনি দেখতে পাবেন কিভাবে `publishedBooksMessage` সেই অনুযায়ী পরিবর্তিত হচ্ছে।

আপনি একটি সাধারণ সম্পত্তির মতো টেমপ্লেটগুলিতে গণনা করা বৈশিষ্ট্যগুলিতে ডেটা-বাইন্ড করতে পারেন। Vue সচেতন যে `this.publishedBooksMessage` `this.author.books` এর উপর নির্ভর করে, তাই যখন `this.author.books` পরিবর্তিত হয় তখন এটি `this.publishedBooksMessage`-এর উপর নির্ভর করে এমন কোনো বাঁধাই আপডেট করবে।

আরো দেখুন: [Typing Computed Properties](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[চেষ্টা করুন](https://play.vuejs.org/#eNp1kE9Lw0AQxb/KI5dtoTainkoaaREUoZ5EEONhm0ybYLO77J9CCfnuzta0vdjbzr6Zeb95XbIwZroPlMySzJW2MR6OfDB5oZrWaOvRwZIsfbOnCUrdmuCpQo+N1S0ET4pCFarUynnI4GttMT9PjLpCAUq2NIN41bXCkyYxiZ9rrX/cDF/xDYiPQLjDDRbVXqqSHZ5DUw2tg3zP8lK6pvxHe2DtvSasDs6TPTAT8F2ofhzh0hTygm5pc+I1Yb1rXE3VMsKsyDm5JcY/9Y5GY8xzHI+wnIpVw4nTI/10R2rra+S4xSPEJzkBvvNNs310ztK/RDlLLjy1Zic9cQVkJn+R7gIwxJGlMXiWnZEq77orhH3Pq2NH9DjvTfpfSBSbmA==)

এখানে আমরা একটি গণনাকৃত সম্পত্তি `publishedBooksMessage` ঘোষণা করেছি। `computed()` ফাংশনটি একটি গেটার ফাংশন পাস করার আশা করে এবং প্রত্যাবর্তিত মানটি একটি **গণিত রেফ**। সাধারণ রেফের মতো, আপনি গণনা করা ফলাফলটি `publishedBooksMessage.value` হিসাবে অ্যাক্সেস করতে পারেন। কম্পিউটেড রেফগুলিও টেমপ্লেটগুলিতে স্বয়ংক্রিয়ভাবে আনর্যাপ করা হয় যাতে আপনি টেমপ্লেট এক্সপ্রেশনে `.value` ছাড়াই তাদের উল্লেখ করতে পারেন।

একটি গণনাকৃত সম্পত্তি স্বয়ংক্রিয়ভাবে তার প্রতিক্রিয়াশীল নির্ভরতা ট্র্যাক করে। Vue সচেতন যে `publishedBooksMessage`-এর গণনা `author.books`-এর উপর নির্ভর করে, তাই যখন `author.books` পরিবর্তিত হয় তখন `publishedBooksMessage`-এর উপর নির্ভর করে এমন কোনো বাঁধাই আপডেট করবে।

See also: [Typing Computed](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />

</div>

## Computed Caching vs. Methods {#computed-caching-vs-methods}

আপনি হয়তো লক্ষ্য করেছেন যে আমরা অভিব্যক্তিতে একটি পদ্ধতি ব্যবহার করে একই ফলাফল অর্জন করতে পারি:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// in component
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
}
```

</div>

<div class="composition-api">

```js
// in component
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

</div>

একটি গণনাকৃত সম্পত্তির পরিবর্তে, আমরা একটি পদ্ধতি হিসাবে একই ফাংশন সংজ্ঞায়িত করতে পারি। শেষ ফলাফলের জন্য, দুটি পন্থা আসলেই ঠিক একই। যাইহোক, পার্থক্য হল **গণনা করা বৈশিষ্ট্যগুলি তাদের প্রতিক্রিয়াশীল নির্ভরতার উপর ভিত্তি করে ক্যাশে করা হয়।** একটি গণনা করা সম্পত্তি শুধুমাত্র তখনই পুনরায় মূল্যায়ন করবে যখন এর কিছু প্রতিক্রিয়াশীল নির্ভরতা পরিবর্তিত হয়। এর মানে যতক্ষণ `author.books` পরিবর্তিত না হয়, `publishedBooksMessage`-এ একাধিক অ্যাক্সেস অবিলম্বে পূর্বে গণনা করা ফলাফল আবার গেটার ফাংশন চালানো ছাড়াই ফিরিয়ে দেবে।

এর মানে হল নিম্নলিখিত গণনা করা সম্পত্তি কখনই আপডেট হবে না, কারণ `Date.now()` একটি প্রতিক্রিয়াশীল নির্ভরতা নয়:

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

তুলনামূলকভাবে, যখনই রি-রেন্ডার হবে তখন একটি পদ্ধতি আহ্বান **সর্বদা** ফাংশনটি চালাবে।

কেন আমরা ক্যাশিং প্রয়োজন? কল্পনা করুন আমাদের একটি ব্যয়বহুল গণনাকৃত সম্পত্তি `list` আছে, যার জন্য একটি বিশাল অ্যারের মাধ্যমে লুপ করা এবং প্রচুর গণনা করা প্রয়োজন। তারপরে আমাদের অন্যান্য গণনা করা বৈশিষ্ট্য থাকতে পারে যা ঘুরে `list`-এর উপর নির্ভর করে। ক্যাশিং ছাড়া, আমরা প্রয়োজনের চেয়ে অনেক বেশি বার `list`-এর গেটার চালাব! যে ক্ষেত্রে আপনি ক্যাশিং করতে চান না, পরিবর্তে একটি পদ্ধতি কল ব্যবহার করুন।

## Writable Computed {#writable-computed}

গণনা করা বৈশিষ্ট্যগুলি ডিফল্ট গেটার-শুধুমাত্র। আপনি যদি একটি গণনা করা সম্পত্তিতে একটি নতুন মান নির্ধারণ করার চেষ্টা করেন, আপনি একটি রানটাইম সতর্কতা পাবেন। বিরল ক্ষেত্রে যেখানে আপনার একটি "লেখাযোগ্য" গণনা করা সম্পত্তি প্রয়োজন, আপনি একটি গেটার এবং একটি সেটার উভয় প্রদান করে একটি তৈরি করতে পারেন:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        ;[this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

এখন আপনি যখন `this.fullName = 'John Doe'` চালাবেন, তখন সেটারকে ডাকা হবে এবং সেই অনুযায়ী `this.firstName` এবং `this.lastName` আপডেট করা হবে।

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    ;[firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

এখন আপনি যখন `fullName.value = 'John Doe'` চালাবেন, তখন সেটারকে ডাকা হবে এবং সেই অনুযায়ী `firstName` এবং `lastName` আপডেট করা হবে।

</div>

## Best Practices {#best-practices}

### Getters should be side-effect free {#getters-should-be-side-effect-free}

এটা মনে রাখা গুরুত্বপূর্ণ যে কম্পিউটেড গেটার ফাংশনগুলি শুধুমাত্র বিশুদ্ধ গণনা করা উচিত এবং পার্শ্ব প্রতিক্রিয়া মুক্ত হওয়া উচিত। উদাহরণস্বরূপ, **অ্যাসিঙ্ক অনুরোধ করবেন না বা একটি গণনা করা গেটারের মধ্যে DOM পরিবর্তন করবেন না!** একটি গণনাকৃত সম্পত্তির কথা ভাবেন যেটি ঘোষণামূলকভাবে বর্ণনা করে যে কীভাবে অন্যান্য মানের উপর ভিত্তি করে একটি মান অর্জন করা যায় - এর একমাত্র দায়িত্ব হওয়া উচিত গণনা করা এবং সেই মানটি ফিরিয়ে দেওয়া . পরবর্তীতে নির্দেশিকায় আমরা আলোচনা করব কিভাবে আমরা [watchers](./watchers) এর সাথে রাষ্ট্রীয় পরিবর্তনের প্রতিক্রিয়ায় পার্শ্ব প্রতিক্রিয়া করতে পারি।

### Avoid mutating computed value {#avoid-mutating-computed-value}

একটি গণনাকৃত সম্পত্তি থেকে প্রত্যাবর্তিত মানটি প্রাপ্ত অবস্থা। এটিকে একটি অস্থায়ী স্ন্যাপশট হিসাবে ভাবুন - প্রতিবার উত্স অবস্থা পরিবর্তিত হলে, একটি নতুন স্ন্যাপশট তৈরি করা হয়। এটি একটি স্ন্যাপশট পরিবর্তন করার কোন মানে হয় না, তাই একটি গণনাকৃত রিটার্ন মানকে শুধুমাত্র পঠনযোগ্য হিসাবে বিবেচনা করা উচিত এবং কখনই পরিবর্তিত করা উচিত নয় - পরিবর্তে, নতুন গণনাগুলি ট্রিগার করার জন্য এটির উপর নির্ভর করে এমন উত্স অবস্থা আপডেট করুন৷
