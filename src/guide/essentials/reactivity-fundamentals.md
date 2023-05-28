---
outline: deep
---

# Reactivity Fundamentals {#reactivity-fundamentals}

:::tip API Preference
এই পৃষ্ঠাটি এবং পরবর্তীতে গাইডের অন্যান্য অনেক অধ্যায়ে অপশন এপিআই এবং কম্পোজিশন এপিআই-এর জন্য বিভিন্ন বিষয়বস্তু রয়েছে। আপনার বর্তমান পছন্দ হল <span class="options-api">বিকল্প API</span><span class="composition-api">কম্পোজিশন API</span>। আপনি বাম সাইডবারের শীর্ষে "API পছন্দ" সুইচগুলি ব্যবহার করে API শৈলীগুলির মধ্যে টগল করতে পারেন।
:::

## Declaring Reactive State {#declaring-reactive-state}

<div class="options-api">

অপশন API-এর সাথে, আমরা একটি উপাদানের প্রতিক্রিয়াশীল অবস্থা ঘোষণা করতে `data` বিকল্প ব্যবহার করি। বিকল্পের মান একটি ফাংশন হওয়া উচিত যা একটি বস্তু প্রদান করে। একটি নতুন কম্পোনেন্ট ইন্সট্যান্স তৈরি করার সময় Vue ফাংশনটিকে কল করবে এবং রিঅ্যাকটিভিটি সিস্টেমে রিটার্ন করা অবজেক্টকে মোড়ানো হবে। এই বস্তুর যেকোনো শীর্ষ-স্তরের বৈশিষ্ট্যগুলি কম্পোনেন্ট ইনস্ট্যান্সে প্রক্সি করা হয় (পদ্ধতি এবং লাইফসাইকেল হুকগুলিতে `this`):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` is a lifecycle hook which we will explain later
  mounted() {
    // `this` refers to the component instance.
    console.log(this.count) // => 1

    // data can be mutated as well
    this.count = 2
  }
}
```

[Try it in the Playground](https://play.vuejs.org/#eNpFUNFqhDAQ/JXBpzsoHu2j3B2U/oYPpnGtoetGkrW2iP/eRFsPApthd2Zndilex7H8mqioimu0wY16r4W+Rx8ULXVmYsVSC9AaNafz/gcC6RTkHwHWT6IVnne85rI+1ZLr5YJmyG1qG7gIA3Yd2R/LhN77T8y9sz1mwuyYkXazcQI2SiHz/7iP3VlQexeb5KKjEKEe2lPyMIxeSBROohqxVO4E6yV6ppL9xykTy83tOQvd7tnzoZtDwhrBO2GYNFloYWLyxrzPPOi44WWLWUt618txvASUhhRCKSHgbZt2scKy7HfCujGOqWL9BVfOgyI=)

এই উদাহরণ বৈশিষ্ট্যগুলি শুধুমাত্র যোগ করা হয় যখন দৃষ্টান্তটি প্রথম তৈরি করা হয়, তাই আপনাকে নিশ্চিত করতে হবে যে সেগুলি `data` ফাংশন দ্বারা প্রত্যাবর্তিত বস্তুতে উপস্থিত রয়েছে। যেখানে প্রয়োজন, সেইসব বৈশিষ্ট্যের জন্য `null`, `undefined` বা অন্য কোনো স্থানধারক মান ব্যবহার করুন যেখানে পছন্দসই মান এখনও উপলব্ধ নয়।

এটিকে `data`-এ অন্তর্ভুক্ত না করে সরাসরি `this`তে একটি নতুন প্রপার্টি যোগ করা সম্ভব। যাইহোক, এইভাবে যোগ করা বৈশিষ্ট্য প্রতিক্রিয়াশীল আপডেট ট্রিগার করতে সক্ষম হবে না।

Vue একটি `$` উপসর্গ ব্যবহার করে যখন কম্পোনেন্ট ইন্সট্যান্সের মাধ্যমে তার নিজস্ব বিল্ট-ইন APIs প্রকাশ করে। এটি অভ্যন্তরীণ বৈশিষ্ট্যের জন্য উপসর্গ `_` সংরক্ষণ করে। এই অক্ষরগুলির যেকোনো একটি দিয়ে শুরু হওয়া শীর্ষ-স্তরের `data` বৈশিষ্ট্যগুলির জন্য আপনার নাম ব্যবহার করা এড়ানো উচিত।

### Reactive Proxy vs. Original \* {#reactive-proxy-vs-original}

Vue 3-তে, [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) ব্যবহার করে ডেটা প্রতিক্রিয়াশীল করা হয়। Vue 2 থেকে আগত ব্যবহারকারীদের নিম্নলিখিত এজ কেস সম্পর্কে সচেতন হওয়া উচিত:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

বরাদ্দ করার পরে আপনি যখন `this.someObject` অ্যাক্সেস করেন, তখন মানটি আসল `newObject`-এর একটি প্রতিক্রিয়াশীল প্রক্সি। **ভিউ 2-এর বিপরীতে, আসল `নতুন বস্তু` অক্ষত রাখা হয়েছে এবং প্রতিক্রিয়াশীল করা হবে না: নিশ্চিত করুন যে সর্বদা `এই`-এর বৈশিষ্ট্য হিসেবে প্রতিক্রিয়াশীল অবস্থা অ্যাক্সেস করতে হবে।**

</div>

<div class="composition-api">

আমরা [`reactive()`](/api/reactivity-core#reactive) ফাংশন দিয়ে একটি প্রতিক্রিয়াশীল বস্তু বা অ্যারে তৈরি করতে পারি:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

প্রতিক্রিয়াশীল বস্তু হল [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) এবং সাধারণ বস্তুর মতোই আচরণ করে। পার্থক্য হল Vue একটি প্রতিক্রিয়াশীল বস্তুর সম্পত্তি অ্যাক্সেস এবং মিউটেশন ট্র্যাক করতে সক্ষম। আপনি যদি বিশদ বিবরণ সম্পর্কে জানতে আগ্রহী হন, আমরা ব্যাখ্যা করি যে কীভাবে Vue-এর প্রতিক্রিয়াশীলতা সিস্টেম [গভীরতার মধ্যে প্রতিক্রিয়া](/guide/extras/reactivity-in-depth) এ কাজ করে - তবে আমরা আপনাকে মূল নির্দেশিকা শেষ করার পরে এটি পড়ার পরামর্শ দিই।

আরো দেখুন: [Typing Reactive](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

একটি উপাদানের টেমপ্লেটে প্রতিক্রিয়াশীল অবস্থা ব্যবহার করতে, একটি উপাদানের `setup()` ফাংশন থেকে তাদের ঘোষণা করুন এবং ফেরত দিন:

```js{5,9-11}
import { reactive } from 'vue'

export default {
  // `setup` is a special hook dedicated for the composition API.
  setup() {
    const state = reactive({ count: 0 })

    // expose the state to the template
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```

একইভাবে, আমরা ফাংশন ঘোষণা করতে পারি যেগুলি প্রতিক্রিয়াশীল অবস্থাকে একই সুযোগে পরিবর্তিত করে এবং সেগুলিকে রাষ্ট্রের পাশাপাশি পদ্ধতি হিসাবে প্রকাশ করতে পারে:

```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // don't forget to expose the function as well.
    return {
      state,
      increment
    }
  }
}
```

উন্মুক্ত পদ্ধতিগুলি সাধারণত ইভেন্ট শ্রোতা হিসাবে ব্যবহৃত হয়:

```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### `<script setup>` \*\* {#script-setup}

`setup()` এর মাধ্যমে ম্যানুয়ালি স্টেট এবং পদ্ধতি প্রকাশ করা ভার্বোস হতে পারে। সৌভাগ্যবশত, এটি শুধুমাত্র প্রয়োজনীয় যখন একটি বিল্ড পদক্ষেপ ব্যবহার না করা হয়। সিঙ্গেল-ফাইল কম্পোনেন্টস (এসএফসি) ব্যবহার করার সময়, আমরা `<script setup>` এর মাধ্যমে ব্যবহারকে অনেকটাই সহজ করতে পারি:

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNpNjkEKgzAURK8yZFNF0K5FS3uPbGyIEKo/If64Cbl7fxWky2HePCarVwjtnqzq1bCZ6AJjs5zCQ5Nbg4+MjGgnw263KJijX3ET/qZJk/G0Cc8TW4wXVmUYn4h73FHqHzcnksYTHJloV0tc1ciacG7bA28aTUXT0J035IAEtmtYBJEEDO/ELJanWZz5jFpdOq0OAMj5X4kiQtl151CYobuMqnwBBoFaVA==)

`<script setup>`-এ ঘোষিত শীর্ষ-স্তরের আমদানি এবং ভেরিয়েবল একই উপাদানের টেমপ্লেটে স্বয়ংক্রিয়ভাবে ব্যবহারযোগ্য।

> বাকি গাইডের জন্য, আমরা প্রাথমিকভাবে কম্পোজিশন API কোড উদাহরণের জন্য SFC + `<script setup>` সিনট্যাক্স ব্যবহার করব, কারণ এটি Vue বিকাশকারীদের জন্য সবচেয়ে সাধারণ ব্যবহার।

</div>

<div class="options-api">

## Declaring Methods \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="বিনামূল্যে Vue.js methods পাঠ"/>

একটি উপাদান উদাহরণে পদ্ধতি যোগ করতে আমরা `methods` বিকল্প ব্যবহার করি। এটি পছন্দসই পদ্ধতি ধারণকারী একটি বস্তু হওয়া উচিত:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // methods can be called in lifecycle hooks, or other methods!
    this.increment()
  }
}
```

Vue স্বয়ংক্রিয়ভাবে `this` মানটিকে `methods` এর জন্য আবদ্ধ করে যাতে এটি সর্বদা কম্পোনেন্ট ইনস্ট্যান্সকে নির্দেশ করে। এটি নিশ্চিত করে যে একটি পদ্ধতি সঠিক `this` মান ধরে রাখে যদি এটি একটি ইভেন্ট লিসেনার বা কলব্যাক হিসাবে ব্যবহার করা হয়। `methods` সংজ্ঞায়িত করার সময় আপনার তীর ফাংশন ব্যবহার করা এড়ানো উচিত, কারণ এটি Vue-কে উপযুক্ত `this` মান বাঁধাই করতে বাধা দেয়:

```js
export default {
  methods: {
    increment: () => {
      // BAD: no `this` access here!
    }
  }
}
```

কম্পোনেন্ট ইন্সট্যান্সের অন্যান্য সব বৈশিষ্ট্যের মতোই, উপাদানের টেমপ্লেট থেকে `methods` অ্যাক্সেসযোগ্য। একটি টেমপ্লেটের ভিতরে তারা সাধারণত ইভেন্ট শ্রোতা হিসাবে ব্যবহৃত হয়:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Try it in the Playground](https://play.vuejs.org/#eNplj9EKwyAMRX8l+LSx0e65uLL9hy+dZlTWqtg4BuK/z1baDgZicsPJgUR2d656B2QN45P02lErDH6c9QQKn10YCKIwAKqj7nAsPYBHCt6sCUDaYKiBS8lpLuk8/yNSb9XUrKg20uOIhnYXAPV6qhbF6fRvmOeodn6hfzwLKkx+vN5OyIFwdENHmBMAfwQia+AmBy1fV8E2gWBtjOUASInXBcxLvN4MLH0BCe1i4Q==)

উপরের উদাহরণে, `<button>` ক্লিক করলে `increment` পদ্ধতিটিকে বলা হবে।

</div>

### DOM Update Timing {#dom-update-timing}

যখন আপনি প্রতিক্রিয়াশীল অবস্থা পরিবর্তন করেন, DOM স্বয়ংক্রিয়ভাবে আপডেট হয়। যাইহোক, এটি লক্ষ করা উচিত যে DOM আপডেটগুলি সিঙ্ক্রোনাসভাবে প্রয়োগ করা হয় না। পরিবর্তে, Vue আপডেট চক্রে "পরবর্তী টিক" না হওয়া পর্যন্ত সেগুলিকে বাফার করে যাতে আপনি যতগুলি রাজ্য পরিবর্তন করেছেন না কেন প্রতিটি উপাদান শুধুমাত্র একবার আপডেট হয়।

একটি রাষ্ট্র পরিবর্তনের পরে DOM আপডেট সম্পূর্ণ হওয়ার জন্য অপেক্ষা করতে, আপনি [nextTick()](/api/general#nexttick) গ্লোবাল API ব্যবহার করতে পারেন:

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // access updated DOM
  })
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // access updated DOM
      })
    }
  }
}
```

</div>

### Deep Reactivity {#deep-reactivity}

Vue-তে, state ডিফল্টরূপে গভীরভাবে প্রতিক্রিয়াশীল। এর মানে আপনি নেস্টেড অবজেক্ট বা অ্যারে পরিবর্তন করলেও আপনি পরিবর্তনগুলি সনাক্ত করা আশা করতে পারেন:

<div class="options-api">

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // these will work as expected.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

```js
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // these will work as expected.
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

এটি স্পষ্টভাবে [অগভীর প্রতিক্রিয়াশীল বস্তু](/api/reactivity-advanced#shallowreactive) তৈরি করাও সম্ভব যেখানে প্রতিক্রিয়াশীলতা শুধুমাত্র রুট-লেভেলে ট্র্যাক করা হয়, তবে এগুলি সাধারণত শুধুমাত্র উন্নত ব্যবহারের ক্ষেত্রে প্রয়োজন হয়।

<div class="composition-api">

### Reactive Proxy vs. Original \*\* {#reactive-proxy-vs-original-1}

এটা মনে রাখা গুরুত্বপূর্ণ যে `reactive()` থেকে প্রত্যাবর্তিত মান হল একটি [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) বস্তু, যা মূল বস্তুর সমান নয়:

```js
const raw = {}
const proxy = reactive(raw)

// proxy is NOT equal to the original.
console.log(proxy === raw) // false
```

শুধুমাত্র প্রক্সিই প্রতিক্রিয়াশীল - আসল অবজেক্টকে পরিবর্তন করলে আপডেট ট্রিগার হবে না। অতএব, Vue এর প্রতিক্রিয়াশীলতা সিস্টেমের সাথে কাজ করার সময় সর্বোত্তম অনুশীলন হল **একচেটিয়াভাবে আপনার রাজ্যের প্রক্সি সংস্করণগুলি ব্যবহার করা**।

প্রক্সিতে সামঞ্জস্যপূর্ণ অ্যাক্সেস নিশ্চিত করতে, একই বস্তুতে `reactive()` কল করা সর্বদা একই প্রক্সি ফেরত দেয় এবং একটি বিদ্যমান প্রক্সিতে `reactive()` কল করাও একই প্রক্সি ফেরত দেয়:

```js
// calling reactive() on the same object returns the same proxy
console.log(reactive(raw) === proxy) // true

// calling reactive() on a proxy returns itself
console.log(reactive(proxy) === proxy) // true
```

এই নিয়ম নেস্টেড অবজেক্টের ক্ষেত্রেও প্রযোজ্য। গভীর প্রতিক্রিয়াশীলতার কারণে, প্রতিক্রিয়াশীল বস্তুর ভিতরে নেস্টেড অবজেক্টগুলিও প্রক্সি:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Limitations of `reactive()` \*\* {#limitations-of-reactive}

`reactive()` API এর দুটি সীমাবদ্ধতা রয়েছে:

1. এটি শুধুমাত্র বস্তুর প্রকারের জন্য কাজ করে (অবজেক্ট, অ্যারে, এবং [সংগ্রহের ধরন](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) যেমন `Map` এবং `Set`)। এটি [প্রিমিটিভ ধরনের](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) যেমন `string`, `number` বা `boolean` ধরে রাখতে পারে না।

2. যেহেতু Vue এর প্রতিক্রিয়াশীলতা ট্র্যাকিং সম্পত্তি অ্যাক্সেসের উপর কাজ করে, তাই আমাদের অবশ্যই প্রতিক্রিয়াশীল বস্তুর একই রেফারেন্স রাখতে হবে। এর মানে হল যে আমরা একটি প্রতিক্রিয়াশীল বস্তুকে সহজে "প্রতিস্থাপন" করতে পারি না কারণ প্রথম রেফারেন্সের প্রতিক্রিয়াশীলতার সংযোগ হারিয়ে গেছে:

   ```js
   let state = reactive({ count: 0 })

   // the above reference ({ count: 0 }) is no longer being tracked (reactivity connection is lost!)
   state = reactive({ count: 1 })
   ```

   এর মানে হল যে যখন আমরা একটি প্রতিক্রিয়াশীল বস্তুর সম্পত্তি স্থানীয় ভেরিয়েবলে বরাদ্দ করি বা ধ্বংস করি, বা যখন আমরা সেই সম্পত্তিটিকে একটি ফাংশনে পাস করি, তখন আমরা প্রতিক্রিয়াশীলতার সংযোগ হারাবো:

   ```js
   const state = reactive({ count: 0 })

   // n is a local variable that is disconnected
   // from state.count.
   let n = state.count
   // does not affect original state
   n++

   // count is also disconnected from state.count.
   let { count } = state
   // does not affect original state
   count++

   // the function receives a plain number and
   // won't be able to track changes to state.count
   callSomeFunction(state.count)
   ```

## Reactive Variables with `ref()` \*\* {#reactive-variables-with-ref}

`reactive()` এর সীমাবদ্ধতাগুলিকে মোকাবেলা করার জন্য, Vue একটি [`ref()`](/api/reactivity-core#ref) ফাংশনও প্রদান করে যা আমাদেরকে প্রতিক্রিয়াশীল **"refs"** তৈরি করতে দেয় যা যেকোনো একটি ধারণ করতে পারে। মান প্রকার:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` আর্গুমেন্ট নেয় এবং একটি `.value` বৈশিষ্ট্য সহ একটি রেফ অবজেক্টের মধ্যে মোড়ানো রিটার্ন করে:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

আরো দেখুন: [Typing Refs](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

একটি প্রতিক্রিয়াশীল বস্তুর বৈশিষ্ট্যের মতো, একটি রেফের `.value` বৈশিষ্ট্য প্রতিক্রিয়াশীল। উপরন্তু, অবজেক্টের ধরন ধরে রাখার সময়, ref স্বয়ংক্রিয়ভাবে তার `.value` কে `reactive()` দিয়ে রূপান্তর করে।

একটি বস্তুর মান সম্বলিত একটি রেফ প্রতিক্রিয়াশীলভাবে সমগ্র বস্তুটিকে প্রতিস্থাপন করতে পারে:

```js
const objectRef = ref({ count: 0 })

// this works reactively
objectRef.value = { count: 1 }
```

Refs এছাড়াও ফাংশন মধ্যে পাস করা যেতে পারে বা প্রতিক্রিয়া হারানো ছাড়া প্লেইন অবজেক্ট থেকে ধ্বংস করা যেতে পারে:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// the function receives a ref
// it needs to access the value via .value but it
// will retain the reactivity connection
callSomeFunction(obj.foo)

// still reactive
const { foo, bar } = obj
```

অন্য কথায়, `ref()` আমাদেরকে যেকোনো মানের একটি "রেফারেন্স" তৈরি করতে এবং প্রতিক্রিয়াশীলতা না হারিয়ে এটিকে পাস করার অনুমতি দেয়। এই ক্ষমতাটি বেশ গুরুত্বপূর্ণ কারণ [কম্পোজেবল ফাংশন](/guide/reusability/composables) এ লজিক বের করার সময় এটি প্রায়শই ব্যবহৃত হয়।

### Ref Unwrapping in Templates \*\* {#ref-unwrapping-in-templates}

যখন রেফগুলিকে টেমপ্লেটে শীর্ষ-স্তরের বৈশিষ্ট্য হিসাবে অ্যাক্সেস করা হয়, তখন সেগুলি স্বয়ংক্রিয়ভাবে "unwrapped" হয় তাই `.value` ব্যবহার করার দরকার নেই৷ এখানে পূর্ববর্তী কাউন্টার উদাহরণ, পরিবর্তে `ref()` ব্যবহার করে:

```vue{13}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- no .value needed -->
  </button>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNo9jUEKgzAQRa8yZKMiaNclSnuP2dgwQqiZhDhxE3L3Riwu//DmvazeIQxHIvVUejfRBoGdJIUZ2brgo0CGSCsUWKN30FS0QUY2nncB4xMLTCfRPrrzviY2Yj2DZRPJEUvbQUaGix2OZUvU98gFWY9XsbbqEHJhW4TqAtCfJFItL7NZ851Q3TpUc87/cCl6vMD6pMfboMoPvd1Nzg==)

Note that the unwrapping only applies if the ref is a top-level property on the template render context. As an example, `object` is a top-level property, but `object.foo` is not.

সুতরাং, নিম্নলিখিত বস্তু দেওয়া:

```js
const object = { foo: ref(1) }
```

নিম্নোক্ত অভিব্যক্তিটি প্রত্যাশিত **নই** কাজ করবে:

```vue-html
{{ object.foo + 1 }}
```

রেন্ডার করা ফলাফল হবে `[object Object]1` কারণ `object.foo` একটি রেফ অবজেক্ট। আমরা `foo` একটি শীর্ষ-স্তরের সম্পত্তি তৈরি করে এটি ঠিক করতে পারি:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

এখন রেন্ডার ফলাফল হবে `2`।

একটি বিষয় লক্ষণীয় যে একটি রেফটিও খুলে ফেলা হবে যদি এটি একটি পাঠ্য ইন্টারপোলেশনের চূড়ান্ত মূল্যায়ন করা মান হয় (যেমন একটি <code v-pre>{{ }}</code> ট্যাগ), তাই নিম্নলিখিতটি `1 রেন্ডার করবে `:

```vue-html
{{ object.foo }}
```

এটি টেক্সট ইন্টারপোলেশনের একটি সুবিধাজনক বৈশিষ্ট্য এবং এটি <code v-pre>{{ object.foo.value }}</code> এর সমতুল্য।

### Ref Unwrapping in Reactive Objects \*\* {#ref-unwrapping-in-reactive-objects}

যখন একটি `ref` অ্যাক্সেস করা হয় বা একটি প্রতিক্রিয়াশীল বস্তুর একটি সম্পত্তি হিসাবে পরিবর্তিত হয়, তখন এটি স্বয়ংক্রিয়ভাবে মোড়ানো হয় তাই এটি একটি সাধারণ সম্পত্তির মতো আচরণ করে:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

যদি একটি নতুন রেফ একটি বিদ্যমান রেফের সাথে লিঙ্কযুক্ত একটি সম্পত্তিতে বরাদ্দ করা হয় তবে এটি পুরানো রেফের প্রতিস্থাপন করবে:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref is now disconnected from state.count
console.log(count.value) // 1
```

Ref unwrapping only happens when nested inside a deep reactive object. It does not apply when it is accessed as a property of a [shallow reactive object](/api/reactivity-advanced#shallowreactive).

### Ref Unwrapping in Arrays and Collections {#ref-unwrapping-in-arrays-and-collections}

প্রতিক্রিয়াশীল বস্তুর বিপরীতে, যখন রেফটিকে একটি প্রতিক্রিয়াশীল অ্যারের উপাদান হিসাবে বা `Map`-এর মতো একটি নেটিভ সংগ্রহের ধরণ হিসাবে অ্যাক্সেস করা হয় তখন কোনও মোড়ক করা হয় না:

```js
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Stateful Methods \* {#stateful-methods}

কিছু ক্ষেত্রে, আমাদের গতিশীলভাবে একটি পদ্ধতি ফাংশন তৈরি করতে হতে পারে, উদাহরণস্বরূপ একটি ডিবাউন্সড ইভেন্ট হ্যান্ডলার তৈরি করা:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Debouncing with Lodash
    click: debounce(function () {
      // ... respond to click ...
    }, 500)
  }
}
```

যাইহোক, এই পদ্ধতিটি পুনঃব্যবহৃত উপাদানগুলির জন্য সমস্যাযুক্ত কারণ একটি ডিবাউন্সড ফাংশন **stateful**: এটি অতিবাহিত সময়ে কিছু অভ্যন্তরীণ অবস্থা বজায় রাখে। একাধিক কম্পোনেন্ট ইনস্ট্যান্স একই ডিবাউন্সড ফাংশন শেয়ার করলে, তারা একে অপরের সাথে হস্তক্ষেপ করবে।

প্রতিটি কম্পোনেন্ট ইনস্ট্যান্সের ডিবাউন্সড ফাংশন অন্যদের থেকে স্বাধীন রাখতে, আমরা `created` লাইফসাইকেল হুকে ডিবাউন্সড সংস্করণ তৈরি করতে পারি:

```js
export default {
  created() {
    // each instance now has its own copy of debounced handler
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // also a good idea to cancel the timer
    // when the component is removed
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... respond to click ...
    }
  }
}
```

</div>
