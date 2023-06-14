---
outline: deep
---

# Reactivity Fundamentals {#reactivity-fundamentals}

:::tip API Preference
এই পৃষ্ঠাটি এবং পরবর্তীতে গাইডের অন্যান্য অনেক অধ্যায়ে অপশন এপিআই এবং কম্পোজিশন এপিআই-এর জন্য বিভিন্ন বিষয়বস্তু রয়েছে। আপনার বর্তমান পছন্দ হল <span class="options-api">বিকল্প API</span><span class="composition-api">কম্পোজিশন API</span>। আপনি বাম সাইডবারের শীর্ষে "API পছন্দ" সুইচগুলি ব্যবহার করে API শৈলীগুলির মধ্যে টগল করতে পারেন।
:::

<div class="options-api">

## Declaring Reactive State \* {#declaring-reactive-state}

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

## Declaring Reactive State \*\* {#declaring-reactive-state-1}

### `ref()` \*\* {#ref}

Composition API-এ, প্রতিক্রিয়াশীল অবস্থা ঘোষণা করার প্রস্তাবিত উপায় হল [`ref()`](/api/reactivity-core#ref) ফাংশন ব্যবহার করা:

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

> আরো দেখুন: [Refs টাইপ করা](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

একটি উপাদানের টেমপ্লেটে রেফ অ্যাক্সেস করতে, একটি উপাদানের `setup()` ফাংশন থেকে ঘোষণা করুন এবং ফেরত দিন:

```js{5,9-11}
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for the Composition API.
  setup() {
    const count = ref(0)

    // expose the ref to the template
    return {
      count
    }
  }
}
```

```vue-html
<div>{{ count }}</div>
```

লক্ষ্য করুন যে টেমপ্লেটে রেফ ব্যবহার করার সময় আমাদের `.value` যোগ করার প্রয়োজন **নেই**। সুবিধার জন্য, টেমপ্লেটের ভিতরে ব্যবহার করা হলে রেফগুলি স্বয়ংক্রিয়ভাবে খুলে ফেলা হয় (কিছু [ সতর্কতার সাথে](#caveat-when-unwrapping-in-templates))।

You can also mutate a ref directly in event handlers:

```vue-html{1}
<button @click="count++">
  {{ count }}
</button>
```

আরও জটিল যুক্তির জন্য, আমরা এমন ফাংশন ঘোষণা করতে পারি যেগুলি একই সুযোগে রেফগুলিকে রূপান্তরিত করে এবং সেগুলিকে state পাশাপাশি পদ্ধতি হিসাবে প্রকাশ করে:

```js{7-10,15}
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // .value is needed in JavaScript
      count.value++
    }

    // don't forget to expose the function as well.
    return {
      count,
      increment
    }
  }
}
```

উন্মুক্ত পদ্ধতিগুলি তখন ইভেন্ট হ্যান্ডলার হিসাবে ব্যবহার করা যেতে পারে:

```vue-html{1}
<button @click="increment">
  {{ count }}
</button>
```

Here's the example live on [Codepen](https://codepen.io/vuejs-examples/pen/WNYbaqo), without using any build tools.

### `<script setup>` \*\* {#script-setup}

`setup()` এর মাধ্যমে ম্যানুয়ালি স্টেট এবং পদ্ধতি প্রকাশ করা ভার্বোস হতে পারে। সৌভাগ্যবশত, [Single-File Components (SFCs)](/guide/scaling-up/sfc) ব্যবহার করার সময় এটি এড়ানো যেতে পারে। আমরা `<script setup>` দিয়ে ব্যবহার সহজ করতে পারি:

```vue{1}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNo9jUEKgzAQRa8yZKMiaNcllvYe2dgwQqiZhDhxE3L3jrW4/DPvv1/UK8Zhz6juSm82uciwIef4MOR8DImhQMIFKiwpeGgEbQwZsoE2BhsyMUwH0d66475ksuwCgSOb0CNx20ExBCc77POase8NVUN6PBdlSwKjj+vMKAlAvzOzWJ52dfYzGXXpjPoBAKX856uopDGeFfnq8XKp+gWq4FAi)

`<script setup>`-এ ঘোষিত শীর্ষ-স্তরের আমদানি, ভেরিয়েবল এবং ফাংশন একই উপাদানের টেমপ্লেটে স্বয়ংক্রিয়ভাবে ব্যবহারযোগ্য। টেমপ্লেটটিকে একই সুযোগে ঘোষিত একটি জাভাস্ক্রিপ্ট ফাংশন হিসাবে ভাবুন - এটির পাশাপাশি ঘোষিত সমস্ত কিছুতে স্বাভাবিকভাবেই অ্যাক্সেস রয়েছে।

:::tip
গাইডের বাকি অংশের জন্য, আমরা প্রাথমিকভাবে কম্পোজিশন API কোড উদাহরণগুলির জন্য SFC + `<script setup>` সিনট্যাক্স ব্যবহার করব, কারণ এটি Vue বিকাশকারীদের জন্য সবচেয়ে সাধারণ ব্যবহার।

If you are not using SFC, you can still use Composition API with the [`setup()`](/api/composition-api-setup) option.
:::

### Why Refs? \*\* {#why-refs}

আপনি হয়তো ভাবছেন কেন আমাদের প্লেইন ভেরিয়েবলের পরিবর্তে `.value` এর সাথে refs দরকার। এটি ব্যাখ্যা করার জন্য, আমাদের সংক্ষিপ্তভাবে আলোচনা করতে হবে কিভাবে Vue এর প্রতিক্রিয়াশীলতা সিস্টেম কাজ করে।

আপনি যখন টেমপ্লেটে একটি রেফ ব্যবহার করেন এবং পরে রেফের মান পরিবর্তন করেন, Vue স্বয়ংক্রিয়ভাবে পরিবর্তনটি সনাক্ত করে এবং সেই অনুযায়ী DOM আপডেট করে। এটি একটি নির্ভরতা-ট্র্যাকিং ভিত্তিক প্রতিক্রিয়া সিস্টেমের মাধ্যমে সম্ভব হয়েছে। যখন একটি উপাদান প্রথমবারের জন্য রেন্ডার করা হয়, Vue **tracks** প্রতিটি রেফারেন্স যা রেন্ডারের সময় ব্যবহৃত হয়েছিল। পরবর্তীতে, যখন একটি রেফ মিউটেট করা হয়, তখন এটি ট্র্যাক করা উপাদানগুলির জন্য **trigger** পুনরায় রেন্ডার করবে।

স্ট্যান্ডার্ড জাভাস্ক্রিপ্টে, প্লেইন ভেরিয়েবলের অ্যাক্সেস বা মিউটেশন সনাক্ত করার কোন উপায় নেই। কিন্তু আমরা একটি সম্পত্তি এর গেট এবং সেট অপারেশন বাধা দিতে পারেন.

`.value` প্রপার্টি Vue কে শনাক্ত করার সুযোগ দেয় যখন কোনো রেফ অ্যাক্সেস করা হয়েছে বা মিউটেট করা হয়েছে। হুডের নিচে, Vue তার গেটারে ট্র্যাকিং সঞ্চালন করে এবং তার সেটারের মধ্যে ট্রিগারিং সঞ্চালন করে। ধারণাগতভাবে, আপনি একটি রেফকে এমন একটি বস্তু হিসাবে ভাবতে পারেন যা দেখতে এইরকম:

```js
// pseudo code, not actual implementation
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

রেফের আরেকটি চমৎকার বৈশিষ্ট্য হল যে প্লেইন ভেরিয়েবলের বিপরীতে, আপনি সর্বশেষ মান এবং রিঅ্যাকটিভিটি সংযোগে অ্যাক্সেস বজায় রেখে রেফগুলিকে ফাংশনে পাস করতে পারেন। পুনর্ব্যবহারযোগ্য কোডে জটিল লজিক রিফ্যাক্টর করার সময় এটি বিশেষভাবে কার্যকর।

রিঅ্যাকটিভিটি সিস্টেমটি [গভীরতার মধ্যে প্রতিক্রিয়া](/guide/extras/reactivity-in-depth) বিভাগে আরও বিশদে আলোচনা করা হয়েছে।
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

### Deep Reactivity {#deep-reactivity}

<div class="options-api">

Vue-তে, state ডিফল্টরূপে গভীরভাবে প্রতিক্রিয়াশীল। এর মানে আপনি nested objects or arrays পরিবর্তন করলেও আপনি পরিবর্তনগুলি সনাক্ত করা আশা করতে পারেন:

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

Refs গভীরভাবে নেস্টেড অবজেক্ট, অ্যারে, বা জাভাস্ক্রিপ্ট বিল্ট-ইন ডেটা স্ট্রাকচার যেমন `Map` সহ যেকোনো মান ধরতে পারে।

একটি ref এর মানকে গভীরভাবে প্রতিক্রিয়াশীল করে তুলবে। এর মানে আপনি nested objects or arrays পরিবর্তন করলেও আপনি পরিবর্তনগুলি সনাক্ত করা আশা করতে পারেন:

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // these will work as expected.
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

Non-primitive values are turned into reactive proxies via [`reactive()`](#reactive), which is discussed below.

It is also possible to opt-out of deep reactivity with [shallow refs](/api/reactivity-advanced#shallowref). For shallow refs, only `.value` access is tracked for reactivity. Shallow refs can be used for optimizing performance by avoiding the observation cost of large objects, or in cases where the inner state is managed by an external library.

Further reading:

- [Reduce Reactivity Overhead for Large Immutable Structures](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
- [Integration with External State Systems](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

</div>

### DOM Update Timing {#dom-update-timing}

যখন আপনি প্রতিক্রিয়াশীল অবস্থা পরিবর্তন করেন, DOM স্বয়ংক্রিয়ভাবে আপডেট হয়। যাইহোক, এটি লক্ষ করা উচিত যে DOM আপডেটগুলি সিঙ্ক্রোনাসভাবে প্রয়োগ করা হয় না। পরিবর্তে, Vue আপডেট চক্রে "পরবর্তী টিক" না হওয়া পর্যন্ত সেগুলিকে বাফার করে যাতে আপনি যতগুলি রাজ্য পরিবর্তন করেছেন না কেন প্রতিটি উপাদান শুধুমাত্র একবার আপডেট হয়।

একটি রাষ্ট্র পরিবর্তনের পরে DOM আপডেট সম্পূর্ণ হওয়ার জন্য অপেক্ষা করতে, আপনি [nextTick()](/api/general#nexttick) গ্লোবাল API ব্যবহার করতে পারেন:

<div class="composition-api">

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // Now the DOM is updated
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    async increment() {
      this.count++
      await nextTick()
      // Now the DOM is updated
    }
  }
}
```

</div>

<div class="composition-api">

## `reactive()` \*\* {#reactive}

প্রতিক্রিয়াশীল অবস্থা ঘোষণা করার আরেকটি উপায় আছে, `reactive()` API সহ। একটি রেফের বিপরীতে যা অভ্যন্তরীণ মানকে একটি বিশেষ বস্তুতে মোড়ানো, `reactive()` একটি বস্তুকে নিজেই প্রতিক্রিয়াশীল করে তোলে:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

> আরও দেখুন: [প্রতিক্রিয়াশীল টাইপিং](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

টেমপ্লেটে ব্যবহার:

```vue-html
<button @click="state.count++">
  {{ state.count }}
</button>
```

প্রতিক্রিয়াশীল বস্তু হল [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) এবং সাধারণ বস্তুর মতোই আচরণ করে। পার্থক্য হল যে Vue প্রতিক্রিয়াশীল বস্তুর সমস্ত বৈশিষ্ট্যের অ্যাক্সেস এবং মিউটেশনকে রিঅ্যাকটিভিটি ট্র্যাকিং এবং ট্রিগার করার জন্য বাধা দিতে সক্ষম।

`reactive()` অবজেক্টকে গভীরভাবে রূপান্তর করে: নেস্টেড অবজেক্টগুলিকেও `reactive()` দিয়ে মোড়ানো হয় যখন অ্যাক্সেস করা হয়। এটিকে অভ্যন্তরীণভাবে `রেফ()` দ্বারাও বলা হয় যখন রেফ মান একটি বস্তু হয়। অগভীর রেফের মতো, গভীর প্রতিক্রিয়া থেকে অপ্ট-আউট করার জন্য [`shallowReactive()`](/api/reactivity-advanced#shallowreactive) APIও রয়েছে।

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

`reactive()` API-এর কয়েকটি সীমাবদ্ধতা রয়েছে:

1. **সীমিত মান প্রকার:** এটি শুধুমাত্র বস্তুর প্রকারের জন্য কাজ করে (অবজেক্ট, অ্যারে, এবং [সংগ্রহের ধরন](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) ) যেমন `Map` এবং `Set`)। এটি [প্রিমিটিভ ধরনের](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) যেমন `string`, `number` বা `boolean` ধরে রাখতে পারে না।

2. **সম্পূর্ণ অবজেক্ট প্রতিস্থাপন করা যাবে না:** যেহেতু Vue এর রিঅ্যাকটিভিটি ট্র্যাকিং প্রোপার্টি অ্যাক্সেসের উপর কাজ করে, তাই আমাদের অবশ্যই সবসময় রিঅ্যাকটিভ অবজেক্টের একই রেফারেন্স রাখতে হবে। এর মানে হল যে আমরা একটি প্রতিক্রিয়াশীল বস্তুকে সহজে "প্রতিস্থাপন" করতে পারি না কারণ প্রথম রেফারেন্সের প্রতিক্রিয়াশীলতার সংযোগ হারিয়ে গেছে:

   ```js
   let state = reactive({ count: 0 })

   // the above reference ({ count: 0 }) is no longer being tracked
   // (reactivity connection is lost!)
   state = reactive({ count: 1 })
   ```

3. **ডিস্ট্রাকচার-বান্ধব নয়:** যখন আমরা একটি প্রতিক্রিয়াশীল বস্তুর সম্পত্তিকে স্থানীয় ভেরিয়েবলে ধ্বংস করি, অথবা যখন আমরা সেই সম্পত্তিটিকে একটি ফাংশনে পাস করি, তখন আমরা প্রতিক্রিয়াশীলতার সংযোগ হারাবো:

   ```js
   const state = reactive({ count: 0 })

   // count is disconnected from state.count when destructured.
   let { count } = state
   // does not affect original state
   count++

   // the function receives a plain number and
   // won't be able to track changes to state.count
   // we have to pass the entire object in to retain reactivity
   callSomeFunction(state.count)
   ```

এই সীমাবদ্ধতার কারণে, আমরা প্রতিক্রিয়াশীল অবস্থা ঘোষণা করার জন্য প্রাথমিক API হিসেবে `ref()` ব্যবহার করার পরামর্শ দিই।

## Additional Ref Unwrapping Details \*\* {#additional-ref-unwrapping-details}

### As Reactive Object Property \*\* {#ref-unwrapping-as-reactive-object-property}

একটি ref স্বয়ংক্রিয়ভাবে unwrapped যখন একটি প্রতিক্রিয়াশীল বস্তুর একটি সম্পত্তি হিসাবে অ্যাক্সেস বা পরিবর্তন করা হয়. অন্য কথায়, এটি একটি স্বাভাবিক সম্পত্তির মতো আচরণ করে:

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

Ref unwrapping শুধুমাত্র তখনই ঘটে যখন একটি গভীর প্রতিক্রিয়াশীল বস্তুর ভিতরে নেস্ট করা হয়। এটি প্রযোজ্য হয় না যখন এটি একটি [অগভীর প্রতিক্রিয়াশীল বস্তু](/api/reactivity-advanced#shallowreactive) এর সম্পত্তি হিসাবে অ্যাক্সেস করা হয়।

### Caveat in Arrays and Collections \*\* {#caveat-in-arrays-and-collections}

প্রতিক্রিয়াশীল বস্তুর বিপরীতে, যখন রেফটিকে একটি প্রতিক্রিয়াশীল অ্যারের একটি উপাদান হিসাবে বা `Map`-এর মতো একটি নেটিভ সংগ্রহের ধরণ হিসাবে অ্যাক্সেস করা হয় তখন **না** খুলে ফেলা হয়:

```js
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```

### Caveat when Unwrapping in Templates \*\* {#caveat-when-unwrapping-in-templates}

টেমপ্লেটে রেফ আনর্যাপিং শুধুমাত্র তখনই প্রযোজ্য যদি রেফটি টেমপ্লেট রেন্ডার প্রসঙ্গে একটি শীর্ষ-স্তরের সম্পত্তি হয়।

নীচের উদাহরণে, `count` এবং `object` শীর্ষ-স্তরের বৈশিষ্ট্য, কিন্তু `object.id` নয়:

```js
const count = ref(0)
const object = { id: ref(0) }
```

অতএব, এই অভিব্যক্তিটি প্রত্যাশিত হিসাবে কাজ করে:

```vue-html
{{ count + 1 }}
```

...যখন এটি **না** করে:

```vue-html
{{ object.id + 1 }}
```

রেন্ডার করা ফলাফল হবে `[object object]1` কারণ অভিব্যক্তিটির মূল্যায়ন করার সময় `object.id` খুলে রাখা হয় না এবং একটি রেফ অবজেক্ট থাকে। এটি ঠিক করার জন্য, আমরা একটি শীর্ষ-স্তরের সম্পত্তিতে `id' ধ্বংস করতে পারি:

```js
const { id } = object
```

```vue-html
{{ id + 1 }}
```

এখন রেন্ডার ফলাফল হবে `2`।

আরেকটি বিষয় লক্ষণীয় যে একটি রেফ যদি টেক্সট ইন্টারপোলেশনের চূড়ান্ত মূল্যায়ন করা মান হয় (যেমন একটি <code v-pre>{{ }}</code> ট্যাগ) তাহলে রেফটি খুলে যায়, তাই নিম্নলিখিতটি `1` রেন্ডার করবে :

```vue-html
{{ object.id }}
```

এটি টেক্সট ইন্টারপোলেশনের একটি সুবিধাজনক বৈশিষ্ট্য এবং এটি <code v-pre>{{ object.id.value }}</code> এর সমতুল্য।

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
