# List Rendering {#list-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/list-rendering-in-vue-3" title="বিনামূল্যে Vue.js তালিকা রেন্ডারিং পাঠ"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-list-rendering-in-vue" title="বিনামূল্যে Vue.js তালিকা রেন্ডারিং পাঠ"/>
</div>

## `v-for` {#v-for}

অ্যারের উপর ভিত্তি করে আইটেমগুলির একটি তালিকা রেন্ডার করতে আমরা `v-for` নির্দেশিকা ব্যবহার করতে পারি। `v-for` নির্দেশের জন্য `item in items` আকারে একটি বিশেষ সিনট্যাক্স প্রয়োজন, যেখানে `items` হল উৎস ডেটা অ্যারে এবং `item` হল একটি **alias** যে অ্যারে উপাদানটির উপর পুনরাবৃত্তি করা হচ্ছে:

<div class="composition-api">

```js
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>

<div class="options-api">

```js
data() {
  return {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="item in items">
  {{ item.message }}
</li>
```

`v-for` স্কোপের ভিতরে, টেমপ্লেট এক্সপ্রেশনের সমস্ত প্যারেন্ট স্কোপের বৈশিষ্ট্যগুলিতে অ্যাক্সেস রয়েছে। উপরন্তু, `v-for` বর্তমান আইটেমের সূচীর জন্য একটি ঐচ্ছিক দ্বিতীয় উপনাম সমর্থন করে:

<div class="composition-api">

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>
<div class="options-api">

```js
data() {
  return {
    parentMessage: 'Parent',
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

<script setup>
const parentMessage = 'Parent'
const items = [{ message: 'Foo' }, { message: 'Bar' }]
</script>
<div class="demo">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</div>

<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNpdTsuqwjAQ/ZVDNlFQu5d64bpwJ7g3LopOJdAmIRlFCPl3p60PcDWcM+eV1X8Iq/uN1FrV6RxtYCTiW/gzzvbBR0ZGpBYFbfQ9tEi1ccadvUuM0ERyvKeUmithMyhn+jCSev4WWaY+vZ7HjH5Sr6F33muUhTR8uW0ThTuJua6mPbJEgGSErmEaENedxX3Z+rgxajbEL2DdhR5zOVOdUSIEDOf8M7IULCHsaPgiMa1eK4QcS6rOSkhdfapVeQLQEWnH)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNpVTssKwjAQ/JUllyr0cS9V0IM3wbvxEOxWAm0a0m0phPy7m1aqhpDsDLMz48XJ2nwaUZSiGp5OWzpKg7PtHUGNjRpbAi8NQK1I7fbrLMkhjc5EJAn4WOXQ0BWHQb2whOS24CSN6qjXhN1Qwt1Dt2kufZ9ASOGXOyvH3GMNCdGdH75VsZVjwGa2VYQRUdVqmLKmdwcpdjEnBW1qnPf8wZIrBQujoff/RSEEyIDZZeGLeCn/dGJyCSlazSZVsUWL8AYme21i)

</div>

`v-for` এর পরিবর্তনশীল স্কোপিং নিম্নলিখিত জাভাস্ক্রিপ্টের অনুরূপ:

```js
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // has access to outer scope `parentMessage`
  // but `item` and `index` are only available in here
  console.log(parentMessage, item.message, index)
})
```

লক্ষ্য করুন কিভাবে `v-for` মান `forEach` কলব্যাকের ফাংশন স্বাক্ষরের সাথে মেলে। প্রকৃতপক্ষে, আপনি `v-for` আইটেম উপনামে ধ্বংস ফাংশন আর্গুমেন্টের অনুরূপ ডিস্ট্রাকচারিং ব্যবহার করতে পারেন:

```vue-html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- with index alias -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

নেস্টেড `v-for` এর জন্য, স্কোপিং নেস্টেড ফাংশনের মতোই কাজ করে। প্রতিটি `v-for` স্কোপের প্যারেন্ট স্কোপের অ্যাক্সেস আছে:

```vue-html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

আপনি `in`-এর পরিবর্তে পরিসীমাক হিসেবে `of` ব্যবহার করতে পারেন, যাতে এটি পুনরাবৃত্তিকারীদের জন্য জাভাস্ক্রিপ্টের সিনট্যাক্সের কাছাকাছি হয়:

```vue-html
<div v-for="item of items"></div>
```

## `v-for` with an Object {#v-for-with-an-object}

আপনি একটি বস্তুর বৈশিষ্ট্যের মাধ্যমে পুনরাবৃত্তি করতে `v-for` ব্যবহার করতে পারেন। পুনরাবৃত্তির ক্রম অবজেক্টে `Object.keys()` কল করার ফলাফলের উপর ভিত্তি করে করা হবে:

<div class="composition-api">

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    myObject: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
}
```

</div>

```vue-html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

আপনি সম্পত্তির নামের জন্য একটি দ্বিতীয় উপনামও প্রদান করতে পারেন (ওরফে key):

```vue-html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

এবং সূচকের জন্য আরেকটি:

```vue-html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNo9jjFvgzAQhf/KE0sSCQKpqg7IqRSpQ9WlWycvBC6KW2NbcKaNEP+9B7Tx4nt33917Y3IKYT9ESspE9XVnAqMnjuFZO9MG3zFGdFTVbAbChEvnW2yE32inXe1dz2hv7+dPqhnHO7kdtQPYsKUSm1f/DfZoPKzpuYdx+JAL6cxUka++E+itcoQX/9cO8SzslZoTy+yhODxlxWN2KMR22mmn8jWrpBTB1AZbMc2KVbTyQ56yBkN28d1RJ9uhspFSfNEtFf+GfnZzjP/oOll2NQPjuM4xTftZyIaU5VwuN0SsqMqtWZxUvliq/J4jmX4BTCp08A==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNo9T8FqwzAM/RWRS1pImnSMHYI3KOwwdtltJ1/cRqXe3Ng4ctYS8u+TbVJjLD3rPelpLg7O7aaARVeI8eS1ozc54M1ZT9DjWQVDMMsBoFekNtucS/JIwQ8RSQI+1/vX8QdP1K2E+EmaDHZQftg/IAu9BaNHGkEP8B2wrFYxgAp0sZ6pn2pAeLepmEuSXDiy7oL9gduXT+3+pW6f631bZoqkJY/kkB6+onnswoDw6owijIhEMByjUBgNU322/lUWm0mZgBX84r1ifz3ettHmupYskjbanedch2XZRcAKTnnvGVIPBpkqGqPTJNGkkaJ5+CiWf4KkfBs=)

</div>

## `v-for` with a Range {#v-for-with-a-range}

`v-for` একটি পূর্ণসংখ্যাও নিতে পারে। এই ক্ষেত্রে এটি `1...n` এর পরিসরের উপর ভিত্তি করে বহুবার টেমপ্লেটটি পুনরাবৃত্তি করবে।

```vue-html
<span v-for="n in 10">{{ n }}</span>
```

এখানে নোট করুন `n` `0` এর পরিবর্তে `1` এর প্রাথমিক মান দিয়ে শুরু হয়।

## `v-for` on `<template>` {#v-for-on-template}

টেমপ্লেট `v-if` এর মতো, আপনি একাধিক উপাদানের একটি ব্লক রেন্ডার করতে `v-for` সহ একটি `<template>` ট্যাগও ব্যবহার করতে পারেন। উদাহরণ স্বরূপ:

```vue-html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` with `v-if` {#v-for-with-v-if}

:::warning Note
অন্তর্নিহিত অগ্রাধিকারের কারণে একই এলিমেন্টে `v-if` এবং `v-for` ব্যবহার করার পরামর্শ **নয়**। বিস্তারিত জানার জন্য [স্টাইল গাইড](/style-guide/rules-essential#avoid-v-if-with-v-for) পড়ুন।
:::

যখন তারা একই নোডে উপস্থিত থাকে, `v-if` এর থেকে `v-for` এর চেয়ে উচ্চ অগ্রাধিকার থাকে। এর মানে `v-if` শর্তের `v-for` এর সুযোগ থেকে ভেরিয়েবলে অ্যাক্সেস থাকবে না:

```vue-html
<!--
This will throw an error because property "todo"
is not defined on instance.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

এটি একটি মোড়ানো `<template>` ট্যাগে `v-for` সরানোর মাধ্যমে ঠিক করা যেতে পারে (যা আরও স্পষ্ট):

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## Maintaining State with `key` {#maintaining-state-with-key}

Vue যখন `v-for` দিয়ে রেন্ডার করা উপাদানগুলির একটি তালিকা আপডেট করে, ডিফল্টরূপে এটি একটি "ইন-প্লেস প্যাচ" কৌশল ব্যবহার করে। যদি ডেটা আইটেমগুলির ক্রম পরিবর্তিত হয়, আইটেমগুলির ক্রম মেলে DOM উপাদানগুলি সরানোর পরিবর্তে, Vue প্রতিটি উপাদানকে জায়গায় প্যাচ করবে এবং নিশ্চিত করবে যে এটি সেই নির্দিষ্ট সূচকে কী রেন্ডার করা উচিত তা প্রতিফলিত করে।

এই ডিফল্ট মোডটি কার্যকর, কিন্তু **শুধুমাত্র তখনই উপযুক্ত যখন আপনার তালিকা রেন্ডার আউটপুট চাইল্ড কম্পোনেন্ট স্টেট বা অস্থায়ী DOM স্টেট (যেমন ফর্ম ইনপুট মান) উপর নির্ভর করে না**।

Vue-কে একটি ইঙ্গিত দিতে যাতে এটি প্রতিটি নোডের পরিচয় ট্র্যাক করতে পারে, এবং এইভাবে বিদ্যমান উপাদানগুলিকে পুনরায় ব্যবহার এবং পুনরায় সাজাতে, আপনাকে প্রতিটি আইটেমের জন্য একটি অনন্য `key` বৈশিষ্ট্য প্রদান করতে হবে:

```vue-html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

`<template v-for>` ব্যবহার করার সময়, `key`টি `<template>` কন্টেইনারে স্থাপন করা উচিত:

```vue-html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

:::tip বিঃদ্রঃ
`key` এখানে `v-bind` এর সাথে আবদ্ধ একটি বিশেষ বৈশিষ্ট্য। এটি প্রপার্টি কী ভেরিয়েবলের সাথে বিভ্রান্ত হওয়া উচিত নয় যখন [কোন বস্তুর সাথে `v-for` ব্যবহার করে](#v-for-with-an-object)।
:::

[এটি সুপারিশ করা হয়](/style-guide/rules-essential#use-keyed-v-for) যখনই সম্ভব `v-for` এর সাথে একটি `key` বৈশিষ্ট্য প্রদান করা, যদি না পুনরাবৃত্তি করা DOM বিষয়বস্তু সহজ হয় (যেমন কোনো উপাদান বা রাষ্ট্রীয় DOM উপাদান), অথবা আপনি ইচ্ছাকৃতভাবে কর্মক্ষমতা লাভের জন্য ডিফল্ট আচরণের উপর নির্ভর করছেন।

`key` বাইন্ডিং আদিম মান আশা করে - যেমন স্ট্রিং এবং সংখ্যা। বস্তুকে `v-for` কী হিসেবে ব্যবহার করবেন না। `key` অ্যাট্রিবিউটের বিস্তারিত ব্যবহারের জন্য, অনুগ্রহ করে [`key` API ডকুমেন্টেশন](/api/built-in-special-attributes#key) দেখুন।

## `v-for` with a Component {#v-for-with-a-component}

> এই বিভাগটি [Components](/guide/essentials/component-basics) সম্পর্কে জ্ঞান গ্রহণ করে। নির্দ্বিধায় এটি এড়িয়ে যান এবং পরে ফিরে আসুন।

আপনি একটি উপাদানে সরাসরি `v-for` ব্যবহার করতে পারেন, যেকোনো সাধারণ উপাদানের মতো (একটি `key` প্রদান করতে ভুলবেন না):

```vue-html
<MyComponent v-for="item in items" :key="item.id" />
```

যাইহোক, এটি স্বয়ংক্রিয়ভাবে উপাদানটিতে কোনো ডেটা পাঠাবে না, কারণ উপাদানগুলির নিজস্ব বিচ্ছিন্ন সুযোগ রয়েছে। কম্পোনেন্টে পুনরাবৃত্ত ডেটা পাস করার জন্য, আমাদের প্রপসও ব্যবহার করা উচিত:

```vue-html
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

কম্পোনেন্টে স্বয়ংক্রিয়ভাবে `item` ইনজেকশন না করার কারণ হল এটি উপাদানটিকে কীভাবে `v-for` কাজ করে তার সাথে শক্তভাবে সংযুক্ত করে। এর ডেটা কোথা থেকে আসে সে সম্পর্কে স্পষ্ট হওয়া উপাদানটিকে অন্যান্য পরিস্থিতিতে পুনরায় ব্যবহারযোগ্য করে তোলে।

<div class="composition-api">

দেখুন [একটি সহজ করণীয় তালিকার এই উদাহরণ](https://play.vuejs.org/#eNp1U8Fu2zAM/RXCGGAHTWx02ylwgxZYB+ywYRhyq3dwLGYRYkuCJTsZjPz7KMmK3ay9JBQfH/meKA/Rk1Jp32G0jnJdtVwZ0Gg6tSkEb5RsDQzQ4h4usG9lAzGVxldoK5n8ZrAZsTQLCduRygAKUUmhDQg8WWyLZwMPtmESx4sAGkL0mH6xrMH+AHC2hvuljw03Na4h/iLBHBAY1wfUbsTFVcwoH28o2/KIIDuaQ0TTlvrwNu/TDe+7PDlKXZ6EZxTiN4kuRI3W0dk4u4yUf7bZfScqw6WAkrEf3m+y8AOcw7Qv6w5T1elDMhs7Nbq7e61gdmme60SQAvgfIhExiSSJeeb3SBukAy1D1aVBezL5XrYN9Csp1rrbNdykqsUehXkookl0EVGxlZHX5Q5rIBLhNHFlbRD6xBiUzlOeuZJQz4XqjI+BxjSSYe2pQWwRBZizV01DmsRWeJA1Qzv0Of2TwldE5hZRlVd+FkbuOmOksJLybIwtkmfWqg+7qz47asXpSiaN3lxikSVwwfC8oD+/sEnV+oh/qcxmU85mebepgLjDBD622Mg+oDrVquYVJm7IEu4XoXKTZ1dho3gnmdJhedEymn9ab3ysDPdc4M9WKp28xE5JbB+rzz/Trm3eK3LAu8/E7p2PNzYM/i3ChR7W7L7hsSIvR7L2Aal1EhqTp80vF95sw3WcG7r8A0XaeME=) to see how to render a list of components using `v-for`, passing different data to each instance.

</div>
<div class="options-api">

দেখুন [একটি সহজ করণীয় তালিকার এই উদাহরণ](https://play.vuejs.org/#eNqNVE2PmzAQ/SsjVIlEm4C27Qmx0a7UVuqhPVS5lT04eFKsgG2BSVJF+e8d2xhIu10tihR75s2bNx9wiZ60To49RlmUd2UrtNkUUjRatQa2iquvBhvYt6qBOEmDwQbEhQQoJJ4dlOOe9bWBi7WWiuIlStNlcJlYrivr5MywxdIDAVo0fSvDDUDiyeK3eDYZxLGLsI8hI7H9DHeYQuwjeAb3I9gFCFMjUXxSYCoELroKO6fZP17Mf6jev0i1ZQcE1RtHaFrWVW/l+/Ai3zd1clQ1O8k5Uzg+j1HUZePaSFwfvdGhfNIGTaW47bV3Mc6/+zZOfaaslegS18ZE9121mIm0Ep17ynN3N5M8CB4g44AC4Lq8yTFDwAPNcK63kPTL03HR6EKboWtm0N5MvldtA8e1klnX7xphEt3ikTbpoYimsoqIwJY0r9kOa6Ag8lPeta2PvE+cA3M7k6cOEvBC6n7UfVw3imPtQ8eiouAW/IY0mElsiZWqOdqkn5NfCXxB5G6SJRvj05By1xujpJWUp8PZevLUluqP/ajPploLasmk0Re3sJ4VCMnxvKQ//0JMqrID/iaYtSaCz+xudsHjLpPzscVGHYO3SzpdixIXLskK7pcBucnTUdgg3kkmcxhetIrmH4ebr8m/n4jC6FZp+z7HTlLsVx1p4M7odcXPr6+Lnb8YOne5+C2F6/D6DH2Hx5JqOlCJ7yz7IlBTbZsf7vjXVBzjvLDrH5T0lgo=) to see how to render a list of components using `v-for`, passing different data to each instance.

</div>

## Array Change Detection {#array-change-detection}

### Mutation Methods {#mutation-methods}

Vue সনাক্ত করতে সক্ষম হয় যখন একটি প্রতিক্রিয়াশীল অ্যারের মিউটেশন পদ্ধতিগুলিকে কল করা হয় এবং প্রয়োজনীয় আপডেটগুলি ট্রিগার করে৷ এই মিউটেশন পদ্ধতিগুলি হল:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

### Replacing an Array {#replacing-an-array}

মিউটেশন পদ্ধতি, নাম থেকে বোঝা যায়, মূল অ্যারেকে মিউটেশন করে যেটিতে তারা কল করা হয়। তুলনামূলকভাবে, নন-মিউটেটিং পদ্ধতিও রয়েছে, যেমন `filter()`, `concat()` এবং `slice()`, যা মূল অ্যারেকে পরিবর্তন করে না কিন্তু **সর্বদা একটি নতুন অ্যারে প্রদান করে**। নন-মিউটেটিং পদ্ধতির সাথে কাজ করার সময়, আমাদের পুরানো অ্যারেটিকে নতুন দিয়ে প্রতিস্থাপন করা উচিত:

<div class="composition-api">

```js
// `items` is a ref with array value
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

</div>
<div class="options-api">

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

</div>

আপনি ভাবতে পারেন যে এটি Vue কে বিদ্যমান DOM ছুঁড়ে ফেলে দেবে এবং পুরো তালিকাটি পুনরায় রেন্ডার করবে - ভাগ্যক্রমে, এটি এমন নয়। Vue কিছু স্মার্ট হিউরিস্টিক প্রয়োগ করে DOM এলিমেন্টের পুনঃব্যবহারকে সর্বাধিক করার জন্য, তাই ওভারল্যাপিং অবজেক্ট সমন্বিত অন্য অ্যারের সাথে একটি অ্যারে প্রতিস্থাপন করা একটি অত্যন্ত দক্ষ অপারেশন।

## Displaying Filtered/Sorted Results {#displaying-filtered-sorted-results}

কখনও কখনও আমরা আসল ডেটা পরিবর্তন বা রিসেট না করে একটি অ্যারের ফিল্টার করা বা সাজানো সংস্করণ প্রদর্শন করতে চাই। এই ক্ষেত্রে, আপনি একটি গণনাকৃত সম্পত্তি তৈরি করতে পারেন যা ফিল্টার করা বা সাজানো অ্যারে প্রদান করে।

উদাহরণ স্বরূপ:

<div class="composition-api">

```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    numbers: [1, 2, 3, 4, 5]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(n => n % 2 === 0)
  }
}
```

</div>

```vue-html
<li v-for="n in evenNumbers">{{ n }}</li>
```

এমন পরিস্থিতিতে যেখানে গণনা করা বৈশিষ্ট্যগুলি সম্ভব নয় (যেমন নেস্টেড `v-for` লুপের ভিতরে), আপনি একটি পদ্ধতি ব্যবহার করতে পারেন:

<div class="composition-api">

```js
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

</div>

```vue-html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

একটি গণনাকৃত সম্পত্তিতে `reverse()` এবং `sort()` এর সাথে সতর্ক থাকুন! এই দুটি পদ্ধতি মূল অ্যারেকে রূপান্তরিত করবে, যা গণিত গেটারগুলিতে এড়ানো উচিত। এই পদ্ধতিগুলি কল করার আগে মূল অ্যারের একটি অনুলিপি তৈরি করুন:

```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```
