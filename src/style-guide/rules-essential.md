# অগ্রাধিকার A নিয়ম: অপরিহার্য {#priority-a-rules-essential}

এই নিয়মগুলি ত্রুটিগুলি প্রতিরোধ করতে সহায়তা করে, তাই যে কোনও মূল্যে সেগুলি শিখুন এবং মেনে চলুন৷ ব্যতিক্রম থাকতে পারে, কিন্তু খুবই বিরল হতে হবে এবং শুধুমাত্র জাভাস্ক্রিপ্ট এবং Vue উভয় বিষয়ে বিশেষজ্ঞ জ্ঞানসম্পন্ন ব্যক্তিদের দ্বারা করা উচিত।

## বহু-শব্দ উপাদানের নাম ব্যবহার করুন {#use-multi-word-component-names}

রুট `App` উপাদান ব্যতীত ব্যবহারকারীর উপাদানের নাম সর্বদা বহু-শব্দ হওয়া উচিত। বিদ্যমান এবং ভবিষ্যতের HTML উপাদানগুলির সাথে এটি [prevents conflicts](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name), যেহেতু সমস্ত HTML উপাদান একটি একক শব্দ।

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<!-- in pre-compiled templates -->
<Item />

<!-- in in-DOM templates -->
<item></item>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- in pre-compiled templates -->
<TodoItem />

<!-- in in-DOM templates -->
<todo-item></todo-item>
```

</div>

## বিস্তারিত prop সংজ্ঞা ব্যবহার করুন {#use-detailed-prop-definitions}

প্রতিশ্রুতিবদ্ধ কোডে, প্রপ সংজ্ঞাগুলি সর্বদা যতটা সম্ভব বিস্তারিত হওয়া উচিত, অন্তত প্রকার (গুলি) নির্দিষ্ট করে।

::: details বিস্তারিত ব্যাখ্যা
বিশদ [prop definitions](/guide/components/props#prop-validation) দুটি সুবিধা আছে:

- তারা কম্পোনেন্টের API নথিভুক্ত করে, যাতে কম্পোনেন্টটি কীভাবে ব্যবহার করা হয় তা দেখা সহজ হয়।
- ডেভেলপমেন্টে, Vue আপনাকে সতর্ক করবে যদি কোনো উপাদান ভুলভাবে ফরম্যাট করা প্রপস প্রদান করা হয়, যা আপনাকে সম্ভাব্য ত্রুটির উৎস ধরতে সাহায্য করে।
  :::

<div class="options-api">
<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
// This is only OK when prototyping
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
props: {
  status: String
}
```

```js
// Even better!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>
</div>

<div class="composition-api">
<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
// This is only OK when prototyping
const props = defineProps(['status'])
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
const props = defineProps({
  status: String
})
```

```js
// Even better!

const props = defineProps({
  status: {
    type: String,
    required: true,

    validator: (value) => {
      return ['syncing', 'synced', 'version-conflict', 'error'].includes(
        value
      )
    }
  }
})
```

</div>
</div>

## `v-for`এর সাথে `key` ব্যবহার করুন {#use-keyed-v-for}

সাবট্রির নিচে অভ্যন্তরীণ উপাদানের অবস্থা বজায় রাখার জন্য উপাদানগুলিতে `v-for` সহ `key` _সর্বদাই_ প্রয়োজন। এমনকি উপাদানগুলির জন্যও, অ্যানিমেশনগুলিতে [অবজেক্ট কনস্টেন্সি](https://bost.ocks.org/mike/constancy/) এর মতো অনুমানযোগ্য আচরণ বজায় রাখা একটি ভাল অভ্যাস।

::: details বিস্তারিত ব্যাখ্যা
ধরা যাক আপনার কাছে করণীয়গুলির একটি তালিকা রয়েছে:

```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: 'Learn to use v-for'
      },
      {
        id: 2,
        text: 'Learn to use key'
      }
    ]
  }
}
```

তারপর আপনি তাদের বর্ণানুক্রমিকভাবে সাজান। DOM আপডেট করার সময়, Vue সম্ভাব্য সবচেয়ে সস্তা DOM মিউটেশনগুলি সম্পাদন করতে রেন্ডারিং অপ্টিমাইজ করবে। এর অর্থ হতে পারে প্রথম করণীয় উপাদানটি মুছে ফেলা, তারপর তালিকার শেষে আবার যোগ করা।

সমস্যা হল, এমন কিছু ক্ষেত্রে রয়েছে যেখানে DOM-এ থাকা উপাদানগুলি মুছে ফেলা গুরুত্বপূর্ণ নয়। উদাহরণস্বরূপ, আপনি তালিকা সাজানোর অ্যানিমেট করতে `<transition-group>` ব্যবহার করতে চাইতে পারেন, অথবা যদি রেন্ডার করা উপাদানটি `<input>` হয় তাহলে ফোকাস বজায় রাখতে পারেন। এই ক্ষেত্রে, প্রতিটি আইটেমের জন্য একটি অনন্য কী যোগ করা (যেমন `:key="todo.id"`) Vue কে বলবে কিভাবে আরও অনুমানযোগ্য আচরণ করতে হবে।

আমাদের অভিজ্ঞতায়, _সর্বদা_ একটি অনন্য কী যোগ করা ভাল, যাতে আপনি এবং আপনার দলকে এই প্রান্তের ক্ষেত্রেগুলি নিয়ে চিন্তা করতে হবে না। তারপরে বিরল, কর্মক্ষমতা-সমালোচনামূলক পরিস্থিতিতে যেখানে বস্তুর স্থিরতা প্রয়োজন হয় না, আপনি সচেতন ব্যতিক্রম করতে পারেন।
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

</div>

## `v-for` এর সাথে `v-if` এড়িয়ে চলুন {#avoid-v-if-with-v-for}

**কখনই `v-if` একই উপাদানে `v-for` ব্যবহার করবেন না।**

দুটি সাধারণ ক্ষেত্রে এটি প্রলুব্ধ হতে পারে:

- একটি তালিকায় আইটেম ফিল্টার করতে (যেমন `v-for="user in user" v-if="user.isActive"`)। এই ক্ষেত্রে, `users`কে একটি নতুন গণনাকৃত সম্পত্তি দিয়ে প্রতিস্থাপন করুন যা আপনার ফিল্টার করা তালিকা (যেমন `activeUsers`) প্রদান করে।

- একটি তালিকা লুকানো উচিত হলে রেন্ডার করা এড়াতে (যেমন `v-for="user in user" v-if="shouldShowUsers"`)। এই ক্ষেত্রে, `v-if` একটি ধারক উপাদানে সরান (যেমন `ul`, `ol`)।

::: details বিস্তারিত ব্যাখ্যা
যখন Vue নির্দেশাবলী প্রসেস করে, `v-if` এর থেকে `v-for` এর চেয়ে বেশি অগ্রাধিকার থাকে, যাতে এই টেমপ্লেটটি:

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

একটি ত্রুটি নিক্ষেপ করবে, কারণ `v-if` নির্দেশটি প্রথমে মূল্যায়ন করা হবে এবং পুনরাবৃত্তি ভেরিয়েবল `user` এই মুহূর্তে বিদ্যমান নেই।

এটি পরিবর্তে একটি গণনাকৃত সম্পত্তির উপর পুনরাবৃত্তি করে ঠিক করা যেতে পারে, যেমন:

```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

বিকল্পভাবে, আমরা `<li>` উপাদানটিকে মোড়ানোর জন্য `v-for` সহ একটি `<template>` ট্যাগ ব্যবহার করতে পারি:

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

</div>

## কম্পোনেন্ট-স্কোপড স্টাইলিং ব্যবহার করুন {#use-component-scoped-styling}

অ্যাপ্লিকেশানগুলির জন্য, একটি শীর্ষ-স্তরের `App`' উপাদান এবং লেআউট উপাদানগুলির ধরনগুলি বিশ্বব্যাপী হতে পারে, তবে অন্যান্য সমস্ত উপাদান সর্বদা ব্যাপ্ত হওয়া উচিত৷

এই জন্য শুধুমাত্র প্রাসঙ্গিক [Single-File Components](/guide/scaling-up/sfc). এটার প্রয়োজন _নেই_ যে [`scoped` attribute](https://vue-loader.vuejs.org/en/features/scoped-css.html) ব্যবহার করা. স্কোপিং মাধ্যমে হতে পারে [CSS modules](https://vue-loader.vuejs.org/en/features/css-modules), একটি ক্লাস-ভিত্তিক কৌশল যেমন [BEM](http://getbem.com/), অথবা অন্য লাইব্রেরি/সম্মেলন।

**কম্পোনেন্ট লাইব্রেরি, তবে, `scoped` অ্যাট্রিবিউট ব্যবহার করার পরিবর্তে একটি ক্লাস-ভিত্তিক কৌশল পছন্দ করা উচিত।**

এটি অভ্যন্তরীণ শৈলীগুলিকে ওভাররাইড করা সহজ করে তোলে, মানব-পঠনযোগ্য শ্রেণির নামগুলির সাথে যেগুলির খুব বেশি নির্দিষ্টতা নেই, তবে এখনও একটি দ্বন্দ্বের ফলে হওয়ার সম্ভাবনা খুব কম।

::: details বিস্তারিত ব্যাখ্যা
আপনি যদি একটি বড় প্রকল্প তৈরি করেন, অন্যান্য বিকাশকারীদের সাথে কাজ করেন, বা কখনও কখনও 3য়-পক্ষের HTML/CSS (যেমন Auth0 থেকে) অন্তর্ভুক্ত করেন, তাহলে ধারাবাহিক স্কোপিং নিশ্চিত করবে যে আপনার শৈলীগুলি শুধুমাত্র সেগুলির জন্য প্রযোজ্য উপাদানগুলির জন্য প্রযোজ্য৷

`scoped` অ্যাট্রিবিউটের বাইরে, অনন্য ক্লাসের নাম ব্যবহার করা নিশ্চিত করতে সাহায্য করতে পারে যে 3য়-পক্ষের CSS আপনার নিজের HTML-এ প্রযোজ্য নয়। উদাহরণস্বরূপ, অনেক প্রকল্প `button`, `btn`, বা `icon` শ্রেণীর নাম ব্যবহার করে, তাই BEM-এর মতো কোনো কৌশল ব্যবহার না করলেও, একটি অ্যাপ-নির্দিষ্ট এবং/অথবা উপাদান-নির্দিষ্ট উপসর্গ যোগ করা (যেমন `ButtonClose-icon`) কিছু সুরক্ষা প্রদান করতে পারে।
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<template>
  <button class="button button-close">×</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- Using CSS modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- Using the BEM convention -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

</div>
