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

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcGFyZW50TWVzc2FnZSA9IHJlZignUGFyZW50JylcbmNvbnN0IGl0ZW1zID0gcmVmKFt7IG1lc3NhZ2U6ICdGb28nIH0sIHsgbWVzc2FnZTogJ0JhcicgfV0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8bGkgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGl0ZW1zXCI+XG4gIFx0e3sgcGFyZW50TWVzc2FnZSB9fSAtIHt7IGluZGV4IH19IC0ge3sgaXRlbS5tZXNzYWdlIH19XG5cdDwvbGk+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgcGFyZW50TWVzc2FnZTogJ1BhcmVudCcsXG4gICAgXHRpdGVtczogW3sgbWVzc2FnZTogJ0ZvbycgfSwgeyBtZXNzYWdlOiAnQmFyJyB9XVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGxpIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBpdGVtc1wiPlxuICBcdHt7IHBhcmVudE1lc3NhZ2UgfX0gLSB7eyBpbmRleCB9fSAtIHt7IGl0ZW0ubWVzc2FnZSB9fVxuXHQ8L2xpPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

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

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBteU9iamVjdCA9IHJlYWN0aXZlKHtcbiAgdGl0bGU6ICdIb3cgdG8gZG8gbGlzdHMgaW4gVnVlJyxcbiAgYXV0aG9yOiAnSmFuZSBEb2UnLFxuICBwdWJsaXNoZWRBdDogJzIwMTYtMDQtMTAnXG59KVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PHVsPlxuICAgIDxsaSB2LWZvcj1cIih2YWx1ZSwga2V5LCBpbmRleCkgaW4gbXlPYmplY3RcIj5cblx0XHQgIHt7IGluZGV4IH19LiB7eyBrZXkgfX06IHt7IHZhbHVlIH19XG5cdFx0PC9saT5cbiAgPC91bD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgbXlPYmplY3Q6IHtcbiAgXHQgICAgdGl0bGU6ICdIb3cgdG8gZG8gbGlzdHMgaW4gVnVlJyxcblx0ICAgICAgYXV0aG9yOiAnSmFuZSBEb2UnLFxuICAgICAgXHRwdWJsaXNoZWRBdDogJzIwMTYtMDQtMTAnXG4gICAgXHR9XG4gIFx0fVxuXHR9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8dWw+XG4gICAgPGxpIHYtZm9yPVwiKHZhbHVlLCBrZXksIGluZGV4KSBpbiBteU9iamVjdFwiPlxuXHRcdCAge3sgaW5kZXggfX0uIHt7IGtleSB9fToge3sgdmFsdWUgfX1cblx0XHQ8L2xpPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

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

:::warning বিঃদ্রঃ
অন্তর্নিহিত অগ্রাধিকারের কারণে একই এলিমেন্টে `v-if` এবং `v-for` ব্যবহার করার পরামর্শ **নয়**। বিস্তারিত জানার জন্য [style guide](/style-guide/rules-essential.html#avoid-v-if-with-v-for) পড়ুন।
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

[এটি বাঞ্ছনীয়](/style-guide/rules-essential.html#use-keyed-v-for) যখনই সম্ভব `v-for` সহ একটি `key` বৈশিষ্ট্য প্রদান করা, যদি না পুনরাবৃত্তি করা DOM বিষয়বস্তু সহজ হয় (যেমন কোন উপাদান বা state DOM উপাদান নেই), অথবা আপনি ইচ্ছাকৃতভাবে কর্মক্ষমতা লাভের জন্য ডিফল্ট আচরণের উপর নির্ভর করছেন।

`key` বাইন্ডিং আদিম মান আশা করে - যেমন স্ট্রিং এবং সংখ্যা। বস্তুকে `v-for` কী হিসেবে ব্যবহার করবেন না। `key` অ্যাট্রিবিউটের বিস্তারিত ব্যবহারের জন্য, অনুগ্রহ করে [`key` API ডকুমেন্টেশন](/api/built-in-special-attributes.html#key) দেখুন।

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

চেক আউট [একটি সহজ কাজ তালিকার এই উদাহরণ](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5jb25zdCBuZXdUb2RvVGV4dCA9IHJlZignJylcbmNvbnN0IHRvZG9zID0gcmVmKFtcbiAge1xuICAgIGlkOiAxLFxuICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gIH1cbl0pXG5cbmxldCBuZXh0VG9kb0lkID0gNFxuXG5mdW5jdGlvbiBhZGROZXdUb2RvKCkge1xuICB0b2Rvcy52YWx1ZS5wdXNoKHtcbiAgICBpZDogbmV4dFRvZG9JZCsrLFxuICAgIHRpdGxlOiBuZXdUb2RvVGV4dC52YWx1ZVxuICB9KVxuICBuZXdUb2RvVGV4dC52YWx1ZSA9ICcnXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8Zm9ybSB2LW9uOnN1Ym1pdC5wcmV2ZW50PVwiYWRkTmV3VG9kb1wiPlxuICAgIDxsYWJlbCBmb3I9XCJuZXctdG9kb1wiPkFkZCBhIHRvZG88L2xhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgdi1tb2RlbD1cIm5ld1RvZG9UZXh0XCJcbiAgICAgIGlkPVwibmV3LXRvZG9cIlxuICAgICAgcGxhY2Vob2xkZXI9XCJFLmcuIEZlZWQgdGhlIGNhdFwiXG4gICAgLz5cbiAgICA8YnV0dG9uPkFkZDwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIDx1bD5cbiAgICA8dG9kby1pdGVtXG4gICAgICB2LWZvcj1cIih0b2RvLCBpbmRleCkgaW4gdG9kb3NcIlxuICAgICAgOmtleT1cInRvZG8uaWRcIlxuICAgICAgOnRpdGxlPVwidG9kby50aXRsZVwiXG4gICAgICBAcmVtb3ZlPVwidG9kb3Muc3BsaWNlKGluZGV4LCAxKVwiXG4gICAgPjwvdG9kby1pdGVtPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiVG9kb0l0ZW0udnVlIjoiPHNjcmlwdCBzZXR1cD5cbmRlZmluZVByb3BzKFsndGl0bGUnXSlcbmRlZmluZUVtaXRzKFsncmVtb3ZlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8bGk+XG4gICAge3sgdGl0bGUgfX1cbiAgICA8YnV0dG9uIEBjbGljaz1cIiRlbWl0KCdyZW1vdmUnKVwiPlJlbW92ZTwvYnV0dG9uPlxuICA8L2xpPlxuPC90ZW1wbGF0ZT4ifQ==) প্রতিটি ইন্সট্যান্সে বিভিন্ন ডেটা পাস করে `v-for` ব্যবহার করে উপাদানের তালিকা কীভাবে রেন্ডার করা যায় তা দেখতে।

</div>
<div class="options-api">

চেক আউট [একটি সহজ কাজ তালিকার এই উদাহরণ](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgVG9kb0l0ZW0gfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmV3VG9kb1RleHQ6ICcnLFxuICAgICAgdG9kb3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBuZXh0VG9kb0lkOiA0XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYWRkTmV3VG9kbygpIHtcbiAgICAgIHRoaXMudG9kb3MucHVzaCh7XG4gICAgICAgIGlkOiB0aGlzLm5leHRUb2RvSWQrKyxcbiAgICAgICAgdGl0bGU6IHRoaXMubmV3VG9kb1RleHRcbiAgICAgIH0pXG4gICAgICB0aGlzLm5ld1RvZG9UZXh0ID0gJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XCJhZGROZXdUb2RvXCI+XG4gICAgPGxhYmVsIGZvcj1cIm5ldy10b2RvXCI+QWRkIGEgdG9kbzwvbGFiZWw+XG4gICAgPGlucHV0XG4gICAgICB2LW1vZGVsPVwibmV3VG9kb1RleHRcIlxuICAgICAgaWQ9XCJuZXctdG9kb1wiXG4gICAgICBwbGFjZWhvbGRlcj1cIkUuZy4gRmVlZCB0aGUgY2F0XCJcbiAgICAvPlxuICAgIDxidXR0b24+QWRkPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgPHVsPlxuICAgIDx0b2RvLWl0ZW1cbiAgICAgIHYtZm9yPVwiKHRvZG8sIGluZGV4KSBpbiB0b2Rvc1wiXG4gICAgICA6a2V5PVwidG9kby5pZFwiXG4gICAgICA6dGl0bGU9XCJ0b2RvLnRpdGxlXCJcbiAgICAgIEByZW1vdmU9XCJ0b2Rvcy5zcGxpY2UoaW5kZXgsIDEpXCJcbiAgICA+PC90b2RvLWl0ZW0+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJUb2RvSXRlbS52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXHRwcm9wczogWyd0aXRsZSddLFxuICBlbWl0czogWydyZW1vdmUnXVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGxpPlxuICAgIHt7IHRpdGxlIH19XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCIkZW1pdCgncmVtb3ZlJylcIj5SZW1vdmU8L2J1dHRvbj5cbiAgPC9saT5cbjwvdGVtcGxhdGU+In0=) প্রতিটি ইন্সট্যান্সে বিভিন্ন ডেটা পাস করে `v-for` ব্যবহার করে উপাদানের তালিকা কীভাবে রেন্ডার করা যায় তা দেখতে।

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
