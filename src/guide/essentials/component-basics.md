# Components Basics {#components-basics}

উপাদানগুলি আমাদের UI কে স্বাধীন এবং পুনঃব্যবহারযোগ্য টুকরোগুলিতে বিভক্ত করার অনুমতি দেয় এবং প্রতিটি অংশকে বিচ্ছিন্নভাবে চিন্তা করতে দেয়৷ একটি অ্যাপকে নেস্টেড উপাদানগুলির একটি গাছে সংগঠিত করা সাধারণ:

![Component Tree](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

এটি আমরা কীভাবে নেটিভ HTML উপাদানগুলিকে নেস্ট করি তার সাথে খুব মিল, তবে Vue এর নিজস্ব উপাদান মডেল প্রয়োগ করে যা আমাদের প্রতিটি উপাদানে কাস্টম সামগ্রী এবং যুক্তিকে এনক্যাপসুলেট করার অনুমতি দেয়। Vue নেটিভ ওয়েব কম্পোনেন্টের সাথে সুন্দরভাবে খেলে। আপনি যদি Vue উপাদান এবং নেটিভ ওয়েব উপাদানগুলির মধ্যে সম্পর্ক সম্পর্কে আগ্রহী হন, [এখানে আরও পড়ুন](/guide/extras/web-components)।

## Defining a Component {#defining-a-component}

একটি বিল্ড স্টেপ ব্যবহার করার সময়, আমরা সাধারণত `.vue` এক্সটেনশন ব্যবহার করে একটি ডেডিকেটেড ফাইলে প্রতিটি Vue কম্পোনেন্টকে সংজ্ঞায়িত করি - যা [Single-File Component](/guide/scaling-up/sfc) (সংক্ষেপে SFC):

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

</div>

একটি বিল্ড স্টেপ ব্যবহার না করার সময়, একটি Vue উপাদানকে একটি প্লেইন জাভাস্ক্রিপ্ট অবজেক্ট হিসাবে সংজ্ঞায়িত করা যেতে পারে যেখানে Vue-নির্দিষ্ট বিকল্প রয়েছে:

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
}
```

</div>
<div class="composition-api">

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
  // Can also target an in-DOM template:
  // template: '#my-template-element'
}
```

</div>

টেমপ্লেটটি এখানে জাভাস্ক্রিপ্ট স্ট্রিং হিসাবে ইনলাইন করা হয়েছে, যা Vue ফ্লাইতে কম্পাইল করবে। আপনি একটি আইডি নির্বাচকও ব্যবহার করতে পারেন যেটি একটি উপাদানের দিকে নির্দেশ করে (সাধারণত নেটিভ `<template>` উপাদান) - Vue এর সামগ্রীকে টেমপ্লেট উত্স হিসাবে ব্যবহার করবে৷

উপরের উদাহরণটি একটি একক উপাদানকে সংজ্ঞায়িত করে এবং এটি একটি `.js` ফাইলের ডিফল্ট exports হিসাবে export করে, তবে আপনি একই ফাইল থেকে একাধিক উপাদান exports করতে নাম export ব্যবহার করতে পারেন।

## Using a Component {#using-a-component}

:::tip
আমরা এই গাইডের বাকি অংশের জন্য SFC সিনট্যাক্স ব্যবহার করব - আপনি একটি বিল্ড স্টেপ ব্যবহার করছেন বা না করছেন তা নির্বিশেষে উপাদানগুলির চারপাশের ধারণাগুলি একই। [Examples](/examples/) বিভাগটি উভয় পরিস্থিতিতেই উপাদানের ব্যবহার দেখায়।
:::

একটি চাইল্ড কম্পোনেন্ট ব্যবহার করতে, আমাদের এটিকে প্যারেন্ট কম্পোনেন্টে ইম্পোর্ট করতে হবে। ধরে নিচ্ছি আমরা আমাদের কাউন্টার কম্পোনেন্টকে `ButtonCounter.vue` নামক একটি ফাইলের ভিতরে রেখেছি, কম্পোনেন্টটি ফাইলের ডিফল্ট এক্সপোর্ট হিসেবে উন্মুক্ত হবে:

<div class="options-api">

```vue
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

আমাদের টেমপ্লেটে ইম্পোর্ট করা কম্পোনেন্ট এক্সপোজ করতে, আমাদের এটিকে 'কম্পোনেন্টস' বিকল্পের সাথে [রেজিস্টার](/guide/components/registration) করতে হবে। কম্পোনেন্টটি তারপরে নিবন্ধিত কী ব্যবহার করে একটি ট্যাগ হিসাবে উপলব্ধ হবে।

</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

`<script setup>` এর সাথে, আমদানি করা উপাদানগুলি স্বয়ংক্রিয়ভাবে টেমপ্লেটে উপলব্ধ করা হয়।

</div>

এটি আমদানি না করেই একটি প্রদত্ত অ্যাপের সমস্ত উপাদানের জন্য উপলব্ধ করে, বিশ্বব্যাপী একটি উপাদান নিবন্ধন করাও সম্ভব। গ্লোবাল বনাম স্থানীয় রেজিস্ট্রেশনের ভালো-মন্দ আলোচনা করা হয়েছে ডেডিকেটেড [কম্পোনেন্ট রেজিস্ট্রেশন](/guide/components/registration) বিভাগে।

উপাদানগুলি আপনি যতবার চান ততবার পুনরায় ব্যবহার করা যেতে পারে:

```vue-html
<h1>Here are many child components!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqVUE1LxDAQ/StjLqusNHotcfHj4l8QcontLBtsJiGdiFL6301SdrEqyEJyeG9m3ps3k3gIoXlPKFqhxi7awDtN1gUfGR4Ts6cnn4gxwj56B5tGrtgyutEEoAk/6lCPe5MGhqmwnc9KhMRjuxCwFi3UrCk/JU/uGTC6MBjGglgdbnfPGBFM/s7QJ3QHO/TfxC+UzD21d72zPItU8uQrrsWvnKsT/ZW2N2wur45BI3KKdETlFlmphZsF58j/RgdQr3UJuO8G273daVFFtlstahngxSeoNezBIUzTYgPzDGwdjk1VkYvMj4jzF0nwsyQ=)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqVj91KAzEQhV/lmJsqlY3eSlr8ufEVhNys6ZQGNz8kE0GWfXez2SJUsdCLuZiZM9+ZM4qnGLvPQuJBqGySjYxMXOJWe+tiSIznwhz8SyieKWGfgsOqkyfTGbDSXsmFUG9rw+Ti0DPNHavD/faVEqGv5Xr/BXOwww4mVBNPnvOVklXTtKeO8qKhkj++4lb8+fL/mCMS7TEdAy6BtDfBZ65fVgA2s+L67uZMUEC9N0s8msGaj40W7Xa91qKtgbdQ0Ha0gyOM45E+TWDrKHeNIhfMr0DTN4U0me8=)

</div>

লক্ষ্য করুন যে বোতামগুলিতে ক্লিক করার সময়, প্রতিটি তার নিজস্ব, পৃথক `count` বজায় রাখে। কারণ প্রতিবার আপনি একটি উপাদান ব্যবহার করলে, এর একটি নতুন **উদাহরণ** তৈরি হয়।

SFC-তে, নেটিভ HTML উপাদান থেকে আলাদা করতে চাইল্ড কম্পোনেন্টের জন্য `PascalCase` ট্যাগ নাম ব্যবহার করার পরামর্শ দেওয়া হয়। যদিও নেটিভ HTML ট্যাগের নামগুলি কেস-সংবেদনশীল, তবে Vue SFC একটি সংকলিত বিন্যাস তাই আমরা এতে কেস-সংবেদনশীল ট্যাগ নামগুলি ব্যবহার করতে সক্ষম। আমরা ট্যাগ বন্ধ করতে `/>` ব্যবহার করতেও সক্ষম।

আপনি যদি আপনার টেমপ্লেটগুলি সরাসরি একটি DOM-এ রচনা করেন (যেমন একটি নেটিভ `<template>` উপাদানের বিষয়বস্তু হিসাবে), টেমপ্লেটটি ব্রাউজারের নেটিভ HTML পার্সিং আচরণের অধীন হবে। এই ধরনের ক্ষেত্রে, আপনাকে 'কাবাব-কেস' এবং উপাদানগুলির জন্য স্পষ্ট ক্লোজিং ট্যাগ ব্যবহার করতে হবে:

```vue-html
<!-- if this template is written in the DOM -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

আরও বিশদ বিবরণের জন্য [DOM টেমপ্লেট পার্সিং সতর্কতা](#dom-template-parsing-caveats) দেখুন।

## Passing Props {#passing-props}

যদি আমরা একটি ব্লগ তৈরি করি, তাহলে আমাদের সম্ভবত একটি ব্লগ পোস্টের প্রতিনিধিত্বকারী একটি উপাদানের প্রয়োজন হবে। আমরা চাই যে সমস্ত ব্লগ পোস্ট একই ভিজ্যুয়াল লেআউট শেয়ার করুক, কিন্তু ভিন্ন বিষয়বস্তু সহ। এই ধরনের একটি উপাদান উপযোগী হবে না যদি না আপনি এটিতে ডেটা পাঠাতে পারেন, যেমন নির্দিষ্ট পোস্টের শিরোনাম এবং বিষয়বস্তু আমরা প্রদর্শন করতে চাই। যে যেখানে প্রপস আসা.

প্রপগুলি হল কাস্টম বৈশিষ্ট্যগুলি যা আপনি একটি উপাদানে নিবন্ধন করতে পারেন। আমাদের ব্লগ পোস্ট কম্পোনেন্টে একটি শিরোনাম পাস করার জন্য, <span class="options-api">[`props`](/api/options-state#props) ব্যবহার করে এই উপাদানটি গ্রহণ করে এমন প্রপসের তালিকায় আমাদের এটি ঘোষণা করতে হবে। বিকল্প</span><span class="composition-api">[`defineProps`](/api/sfc-script-setup#defineprops-defineemits) ম্যাক্রো</span>:

<div class="options-api">

```vue
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

যখন একটি মান একটি প্রপ অ্যাট্রিবিউটে পাস করা হয়, তখন এটি সেই উপাদান উদাহরণে একটি সম্পত্তি হয়ে যায়। সেই সম্পত্তির মান টেমপ্লেটের মধ্যে এবং কম্পোনেন্টের `this` প্রেক্ষাপটে অ্যাক্সেসযোগ্য, ঠিক অন্য কোনো উপাদান সম্পত্তির মতো।

</div>
<div class="composition-api">

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` হল একটি কম্পাইল-টাইম ম্যাক্রো যা শুধুমাত্র `<script setup>`-এর মধ্যেই উপলব্ধ এবং স্পষ্টভাবে আমদানি করার প্রয়োজন নেই। ঘোষিত প্রপগুলি স্বয়ংক্রিয়ভাবে টেমপ্লেটের কাছে প্রকাশিত হয়। `defineProps` একটি অবজেক্টও ফেরত দেয় যাতে কম্পোনেন্টে পাস করা সমস্ত প্রপ থাকে, যাতে আমরা প্রয়োজনে জাভাস্ক্রিপ্টে সেগুলি অ্যাক্সেস করতে পারি:

```js
const props = defineProps(['title'])
console.log(props.title)
```

আরো দেখুন: [Typing Component Props](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

আপনি যদি `<script setup>` ব্যবহার না করেন, তাহলে প্রপসকে `props` বিকল্প ব্যবহার করে ঘোষণা করা উচিত এবং প্রপস অবজেক্টটি প্রথম আর্গুমেন্ট হিসেবে `setup()`-এ পাস করা হবে:

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

একটি কম্পোনেন্টে আপনার পছন্দ মতো অনেকগুলি প্রপ থাকতে পারে এবং ডিফল্টরূপে, যেকোন মান যেকোন প্রপে পাস করা যেতে পারে।

একবার একটি প্রপ নিবন্ধিত হয়ে গেলে, আপনি এটিতে একটি কাস্টম বৈশিষ্ট্য হিসাবে ডেটা প্রেরণ করতে পারেন, যেমন:

```vue-html
<BlogPost title="My journey with Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />
```

একটি সাধারণ অ্যাপে, তবে, আপনার সম্ভবত আপনার অভিভাবক উপাদানে পোস্টের একটি অ্যারে থাকবে:

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' }
])
```

</div>

তারপর `v-for` ব্যবহার করে প্রত্যেকটির জন্য একটি উপাদান রেন্ডার করতে চান:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp9UU1rhDAU/CtDLrawVfpxklRo74We2kPtQdaoaTUJ8bmtiP+9ia6uC2VBgjOZeXnz3sCejAkPnWAx4+3eSkNJqmRjtCU817p81S2hsLpBEEYL4Q1BqoBUid9Jmosi62rC4Nm9dn4lFLXxTGAt5dG482eeUXZ1vdxbQZ1VCwKM0zr3x4KBATKPcbsDSapFjOClx5d2JtHjR1KFN9fTsfbWcXdy+CZKqcqL+vuT/r3qvQqyRatRdMrpF/nn/DNhd7iPR+v8HCDRmDoj4RHxbfyUDjeFto8p8yEh1Rw2ZV4JxN+iP96FMvest8RTTws/gdmQ8HUr7ikere+yHduu62y//y3NWG38xIOpeODyXcoE8OohGYZ5VhhHHjl83sD4B3XgyGI=)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp9kU9PhDAUxL/KpBfWBCH+OZEuid5N9qSHrQezFKhC27RlDSF8d1tYQBP1+N78OpN5HciD1sm54yQj1J6M0A6Wu07nTIpWK+MwwPASI0qjWkQejVbpsVHVQVl30ZJ0WQRHjwFMnpT0gPZLi32w2h2DMEAUGW5iOOEaniF66vGuOiN5j0/hajx7B4zxxt5ubIiphKz+IO828qXugw5hYRXKTnqSydcrJmk61/VF/eB4q5s3x8Pk6FJjauDO16Uye0ZCBwg5d2EkkED2wfuLlogibMOTbMpf9tMwP8jpeiMfRdM1l8Tk+/F++Y6Cl0Lyg1Ha7o7R5Bn9WwSg9X0+DPMxMI409fPP1PELlVmwdQ==)

</div>

লক্ষ্য করুন কিভাবে `v-bind` ডায়নামিক প্রপ মান পাস করতে ব্যবহৃত হয়। এটি বিশেষভাবে উপযোগী যখন আপনি সঠিক বিষয়বস্তু জানেন না যে আপনি সময়ের আগে রেন্ডার করতে যাচ্ছেন।

আপাতত প্রপস সম্পর্কে আপনার এতটুকুই জানা দরকার, কিন্তু একবার আপনি এই পৃষ্ঠাটি পড়া শেষ করে এবং এর বিষয়বস্তুতে স্বাচ্ছন্দ্য বোধ করলে, আমরা [প্রপস](/guide/components/props) এর সম্পূর্ণ নির্দেশিকা পড়তে পরে ফিরে আসার পরামর্শ দিই।

## Listening to Events {#listening-to-events}

যেহেতু আমরা আমাদের `<BlogPost>` উপাদানটি বিকাশ করি, কিছু বৈশিষ্ট্যের জন্য অভিভাবকের সাথে ব্যাক আপ যোগাযোগের প্রয়োজন হতে পারে। উদাহরণস্বরূপ, আমরা পৃষ্ঠার বাকি অংশটিকে ডিফল্ট আকারে রেখে ব্লগ পোস্টের পাঠ্যকে বড় করার জন্য একটি অ্যাক্সেসিবিলিটি বৈশিষ্ট্য অন্তর্ভুক্ত করার সিদ্ধান্ত নিতে পারি।

অভিভাবকদের মধ্যে, আমরা একটি `পোস্টফন্ট সাইজ` যোগ করে এই বৈশিষ্ট্যটিকে সমর্থন করতে পারি <span class="options-api">data property</span><span class="composition-api">ref</span>:

<div class="options-api">

```js{6}
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}
```

</div>
<div class="composition-api">

```js{5}
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

</div>

যা সমস্ত ব্লগ পোস্টের ফন্ট সাইজ নিয়ন্ত্রণ করতে টেমপ্লেটে ব্যবহার করা যেতে পারে:

```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

এখন আসুন `<BlogPost>` কম্পোনেন্টের টেমপ্লেটে একটি বোতাম যোগ করি:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>Enlarge text</button>
  </div>
</template>
```

বোতামটি এখনও কিছু করে না - আমরা অভিভাবকদের সাথে যোগাযোগ করতে বোতামটি ক্লিক করতে চাই যে এটি সমস্ত পোস্টের পাঠ্যকে বড় করবে৷ এই সমস্যাটি সমাধান করার জন্য, উপাদানগুলি একটি কাস্টম ইভেন্ট সিস্টেম প্রদান করে। অভিভাবক শিশুর উপাদান ইন্সট্যান্সে `v-on` বা `@` দিয়ে যেকোনো ইভেন্ট শোনার জন্য বেছে নিতে পারেন, ঠিক যেমনটি আমরা একটি নেটিভ DOM ইভেন্টে করব:

```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

তারপর চাইল্ড কম্পোনেন্ট বিল্ট-ইন [**`$emit`** পদ্ধতি](/api/component-instance#emit) কল করে ইভেন্টের নাম পাস করে নিজেই একটি ইভেন্ট নির্গত করতে পারে:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

`@enlarge-text="postFontSize += 0.1"` শ্রোতাকে ধন্যবাদ, অভিভাবক ইভেন্টটি পাবেন এবং `postFontSize`-এর মান আপডেট করবেন।

<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqNUsFOg0AQ/ZUJMaGNbbHqidCmmujNxMRED9IDhYWuhV0CQy0S/t1ZYIEmaiRkw8y8N/vmMZVxl6aLY8EM23ByP+Mprl3Bk1RmCPexjJ5ljhBmMgFzYemEIpiuAHAFOzXQgIVeESNUKutL4gsmMLfbBPStVFTP1Bl46E2mup4xLDKhI4CUsMR+1zFABTywYTkD5BgzG8ynEj4kkVgJnxz38Eqaut5jxvXAUCIiLqI/8TcD/m1fKhTwHHIJYSEIr+HbnqikPkqBL/yLSMs23eDooNexel8pQJaksYeMIgAn4EewcyxjtnKNCsK+zbgpXILJEnW30bCIN7ZTPcd5KDNqoWjARWufa+iyfWBlV13wYJRvJtWVJhiKGyZiL4vYHNkJO8wgaQVXi6UGr51+Ndq5LBqMvhyrH9eYGePtOVu3n3YozWSqFsBsVJmt3SzhzVaYY2nm9l82+7GX5zTGjlTM1SyNmy5SeX+7rqr2r0NdOxbFXWVXIEoBGz/m/oHIF0rB5Pz6KTV6aBOgEo7Vsn51ov4GgAAf2A==)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp1Uk1PwkAQ/SuTxqQYgYp6ahaiJngzITHRA/UAZQor7W7TnaK16X93th8UEuHEvPdm5s3bls5Tmo4POTq+I0yYyZTAIOXpLFAySXVGUEKGEVQQZToBl6XukXqO9XahDbXc2OsAO5FlAIEKtWJByqCBqR01WFqiBLnxYTIEkhSjD+5rAV86zxQW8C1pB+88Aaphr73rtXbNVqrtBeV9r/zYFZYHacBoiHLFykB9Xgfq1NmLVvQmf7E1OGFaeE0anAMXhEkarwhtRWIjD+AbKmKcBk4JUdvtn8+6ARcTu87hLuCf6NJpSoDDKNIZj7BtIFUTUuB0tL/HomXHcnOC18d1TF305COqeJVtcUT4Q62mtzSF2/GkE8/E8b1qh8Ljw/if8I7nOkPn9En/+Ug2GEmFi0ynZrB0azOujbfB54kki5+aqumL8bING28Yr4xh+2vePrI39CnuHmZl2TwwVJXwuG6ZdU6kFTyGsQz33HyFvH5wvvyaB80bACwgvKbrYgLVH979DQc=)

</div>

আমরা ঐচ্ছিকভাবে <span class="options-api">[`emits`](/api/options-state#emits) বিকল্প</span><span class="composition-api">[` ব্যবহার করে নির্গত ইভেন্ট ঘোষণা করতে পারি defineEmits`](/api/sfc-script-setup#defineprops-defineemits) ম্যাক্রো</span>:

<div class="options-api">

```vue{5}
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```

</div>
<div class="composition-api">

```vue{4}
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

</div>

এটি সমস্ত ইভেন্টগুলিকে নথিভুক্ত করে যা একটি উপাদান নির্গত করে এবং ঐচ্ছিকভাবে [তাদের যাচাই করে](/guide/components/events#events-validation)। এটি Vue-কে শিশু উপাদানের মূল উপাদানে নেটিভ শ্রোতা হিসাবে প্রয়োগ করা এড়াতেও অনুমতি দেয়।

<div class="composition-api">

`defineProps` এর মতো, `defineEmits` শুধুমাত্র `<script setup>`-এ ব্যবহারযোগ্য এবং আমদানি করার প্রয়োজন নেই। এটি একটি `emit` ফাংশন প্রদান করে যা `$emit` পদ্ধতির সমতুল্য। এটি একটি উপাদানের `<script setup>` বিভাগে ইভেন্ট নির্গত করতে ব্যবহার করা যেতে পারে, যেখানে `$emit` সরাসরি অ্যাক্সেসযোগ্য নয়:

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

See also: [Typing Component Emits](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

আপনি যদি `<script setup>` ব্যবহার না করেন, তাহলে আপনি `emits` বিকল্প ব্যবহার করে নির্গত ইভেন্ট ঘোষণা করতে পারেন। আপনি সেটআপ প্রসঙ্গের একটি বৈশিষ্ট্য হিসাবে `emits` ফাংশনটি অ্যাক্সেস করতে পারেন (দ্বিতীয় আর্গুমেন্ট হিসাবে `setup()` এ পাস করা হয়েছে):

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

কাস্টম কম্পোনেন্ট ইভেন্টগুলি সম্পর্কে আপনার আপাতত এতটুকুই জানা দরকার, কিন্তু একবার আপনি এই পৃষ্ঠাটি পড়া শেষ করে এবং এর সামগ্রীর সাথে স্বাচ্ছন্দ্য বোধ করলে, আমরা সম্পূর্ণ নির্দেশিকাটি [Custom Events](/guide/components/events) পড়ার জন্য পরে ফিরে আসার পরামর্শ দিই।

## Content Distribution with Slots {#content-distribution-with-slots}

ঠিক HTML উপাদানগুলির মতো, এটি প্রায়শই একটি উপাদানে সামগ্রী প্রেরণ করতে সক্ষম হওয়া দরকারী, যেমন:

```vue-html
<AlertBox>
  Something bad happened.
</AlertBox>
```

যা কিছু রেন্ডার করতে পারে:

:::danger এটি ডেমো উদ্দেশ্যের জন্য একটি ত্রুটি
খারাপ কিছু ঘটেছে.
:::

এটি Vue এর কাস্টম `<slot>` উপাদান ব্যবহার করে অর্জন করা যেতে পারে:

```vue{4}
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

আপনি উপরে দেখতে পাবেন, আমরা `<slot>` একটি স্থানধারক হিসাবে ব্যবহার করি যেখানে আমরা বিষয়বস্তুটি যেতে চাই - এবং এটাই। সম্পন্ন করা হয়েছে!

<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNpVUcFOwzAM/RUTDruwFhCaUCmThsQXcO0lbbKtIo0jx52Kpv07TreWouTynl+en52z2oWQnXqrClXGhtrA28q3XUBi2DlL/IED7Ak7WGX5RKQHq8oDVN4Oo9TYve4dwzmxDcp7bz3HAs5/LpfKyy3zuY0Atl1wmm1CXE5SQeLNX9hZPrb+ALU2cNQhWG9NNkrnLKIt89lGPahlyDTVogVAadoTNE7H+F4pnZTrGodKjUUpRyb0h+0nEdKdRL3CW7GmfNY5ZLiiMhfP/ynG0SL/OAuxwWCNMNncbVqSQyrgfrPZvCVcIxkrxFMYIKJrDZA1i8qatGl72ehLGEY6aGNkNwU8P96YWjffB8Lem/Xkvn9NR6qy+fRd14FSgopvmtQmzTT9Toq9VZdfIpa5jQ==)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNpVUEtOwzAQvcpgFt3QBBCqUAiRisQJ2GbjxG4a4Xis8aQKqnp37PyUyqv3mZn3fBVH55JLr0Umcl9T6xi85t4VpW07h8RwNJr4Cwc4EXawS9KFiGO70ubpNBcmAmDdOSNZR8T5Yg0IoOQf7DSfW9tAJRWcpXPaapWM1nVt8ObpukY8ie29GHNzAiBX7QVqI73/LIWMzn2FQylGMcieCW1TfBMhPYSoE5zFitLVZ5BhQnkadt6nGKt5/jMafI1Oq8Ak6zW4xrEaDVIGj4fD4SPiCknpQLy4ATyaVgFptVH2JFXb+wze3DDSTioV/iaD1+eZqWT92xD2Vu2X7af3+IJ6G7/UToVigpJnTzwTO42eWDnELsTtH/wUqH4=)

</div>

আপাতত স্লট সম্পর্কে আপনার এতটুকুই জানা দরকার, কিন্তু একবার আপনি এই পৃষ্ঠাটি পড়া শেষ করে এবং এর বিষয়বস্তুতে স্বাচ্ছন্দ্য বোধ করলে, আমরা [Slots](/guide/components/slots) এর সম্পূর্ণ নির্দেশিকা পড়তে পরে ফিরে আসার পরামর্শ দিই।

## Dynamic Components {#dynamic-components}

কখনও কখনও, ট্যাবযুক্ত ইন্টারফেসের মতো উপাদানগুলির মধ্যে গতিশীলভাবে স্যুইচ করা দরকারী:

<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqNVE2PmzAQ/Ssj9kArLSHbrXpwk1X31mMPvS17cIxJrICNbJMmivLfO/7AEG2jRiDkefP85sNmztlr3y8OA89ItjJMi96+VFJ0vdIWfqqOQ6NVB/midIYj5sn9Sxlrkt9b14RXzXbiMElEO5IAKsmPnljzhg6thbNDmcLdkktrSADAJ/IYlj5MXEc9Z1w8VFNLP30ed2luBy1HC4UHrVH2N90QyJ1kHnUALN1gtLeIQu6juEUMkb8H5sXHqiS+qzK1Cw3Lu76llqMFsKrFAVhLjVlXWc07VWUeR89msFbhhhAWDkWjNJIwPgjp06iy5CV7fgrOOTgKv+XoKIIgpnoGyiymSmZ1wnq9dqJweZ8p/GCtYHtUmBMdLXFitgDnc9ju68b0yxDO1WzRTEcFRLiUJsEqSw3wwi+rMpFDj0psEq5W5ax1aBp7at1y4foWzq5R0hYN7UR7ImCoNIXhWjTfnW+jdM01gaf+CEa1ooYHzvnMVWhaiwEP90t/9HBP61rILQJL3POMHw93VG+FLKzqUYx3c2yjsOaOwNeRO2B8zKHlzBKQWJNH1YHrplV/iiMBOliFILYNK5mOKdSTMviGCTyNojFdTKBoeWNT3s8f/Vpsd7cIV61gjHkXnotR6OqVkJbrQKdsv9VqkDWBh2bpnn8VXaDcHPexE4wFzsojO9eDUOSVPF+65wN/EW7sHRsi5XaFqaexn+EH9Xcpe8zG2eWG3O0/NVzUaeJMk+jGhUXlNPXulw5j8w7t2bi8X32cuf/Vv/wF/SL98A==)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqNVMGOmzAQ/ZURe2BXCiHbrXpwk1X31mMPvS1V5RiTWAEb2SZNhPLvHdvggLZRE6TIM/P8/N5gpk/e2nZ57HhCkrVhWrQWDLdd+1pI0bRKW/iuGg6VVg2ky9wFDp7G8g9lrIl1H80Bb5rtxfFKMcRzUA+aV3AZQKEEhWRKGgus05pL+5NuYeNwj6mTkT4VckRYujVY63GT17twC6/Fr4YjC3kp5DoPNtEgBpY3bU0txwhgXYojsJoasymSkjeqSHweK9vOWoUbXIC/Y1YpjaDH3wt39hMI6TUUSYSQAz8jArPT5Mj+nmIhC6zpAu1TZlEhmXndbBwpXH5NGL6xWrADMsyaMj1lkAzQ92E7mvYe8nCcM24xZApbL5ECiHCSnP73KyseGnvh6V/XedwS2pVjv3C1ziddxNDYc+2WS9fC8E4qJW1W0UbUZwKGSpMZrkX11dW2SpdcE3huT2BULUp44JxPSpmmpegMgU/tyadbWpZC7jCxwj0v+OfTDdU7ITOrWiTjzTS3Vei8IfB5xHZ4PmqoObMEJHryWXXkuqrVn+xEgHZWYRKbh06uLyv4iQq+oIDnkXSQiwKymlc26n75WNdit78FmLWCMeZL+GKMwlKrhLRcBzhlh51WnSwJPFQr9/zLdIZ007w/O6bR4MQe2bseBJMzer5yzwf8MtzbOzYMkNsOY0+HfoZv1d+lZJGMg8fNqdsfbbio4b77uRVv7I0Li8xxZN1PHWbeHdyTWXc/+zgw/8t/+QsROe9h)

</div>

উপরেরটি Vue এর `<component>` উপাদান দ্বারা বিশেষ `is` বৈশিষ্ট্যের দ্বারা সম্ভব হয়েছে:

<div class="options-api">

```vue-html
<!-- Component changes when currentTab changes -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- Component changes when currentTab changes -->
<component :is="tabs[currentTab]"></component>
```

</div>

উপরের উদাহরণে, `:is`-এ পাস করা মানটিতে যে কোনো একটি থাকতে পারে:

- একটি নিবন্ধিত component নাম স্ট্রিং, বা
- imported কম্পোনেন্ট অবজেক্ট

আপনি নিয়মিত HTML উপাদান তৈরি করতে `is` বৈশিষ্ট্য ব্যবহার করতে পারেন।

`<component :is="...">` দিয়ে একাধিক কম্পোনেন্টের মধ্যে স্যুইচ করার সময়, একটি কম্পোনেন্ট আনমাউন্ট করা হবে যখন এটি থেকে সুইচ করা হবে। আমরা বিল্ট-ইন [`<KeepAlive>` কম্পোনেন্ট](/guide/built-ins/keep-alive) দিয়ে নিষ্ক্রিয় উপাদানগুলিকে "জীবিত" থাকতে বাধ্য করতে পারি।

## DOM Template Parsing Caveats {#dom-template-parsing-caveats}

আপনি যদি সরাসরি DOM-এ আপনার Vue টেমপ্লেট লিখছেন, Vue-কে DOM থেকে টেমপ্লেট স্ট্রিং পুনরুদ্ধার করতে হবে। এটি ব্রাউজারের নেটিভ HTML পার্সিং আচরণের কারণে কিছু সতর্কতার দিকে নিয়ে যায়।

:::tip
এটি লক্ষ করা উচিত যে নীচে আলোচনা করা সীমাবদ্ধতাগুলি শুধুমাত্র তখনই প্রযোজ্য হবে যদি আপনি সরাসরি DOM-এ আপনার টেমপ্লেটগুলি লিখছেন৷ আপনি যদি নিম্নলিখিত উত্স থেকে স্ট্রিং টেমপ্লেট ব্যবহার করেন তবে সেগুলি প্রযোজ্য হবে না:

- একক ফাইল উপাদান
- ইনলাইনড টেমপ্লেট স্ট্রিং (e.g. `template: '...'`)
- `<script type="text/x-template">`
  :::

### Case Insensitivity {#case-insensitivity}

HTML ট্যাগ এবং অ্যাট্রিবিউটের নামগুলি অক্ষর-সংবেদনশীল, তাই ব্রাউজারগুলি বড় হাতের অক্ষরগুলিকে ছোট হাতের অক্ষর হিসাবে ব্যাখ্যা করবে। এর মানে হল আপনি যখন ইন-ডোম টেমপ্লেটগুলি ব্যবহার করছেন, তখন PascalCase উপাদানের নাম এবং ক্যামেলকেসড প্রপ নাম বা `v-on` ইভেন্টের নামগুলিকে তাদের কাবাব-কেসড (হাইফেন-ডিলিমিটেড) সমতুল্য ব্যবহার করতে হবে:

```js
// camelCase in JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```vue-html
<!-- kebab-case in HTML -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

### Self Closing Tags {#self-closing-tags}

আমরা পূর্ববর্তী কোড নমুনাগুলিতে উপাদানগুলির জন্য স্ব-ক্লোজিং ট্যাগ ব্যবহার করছি:

```vue-html
<MyComponent />
```

এর কারণ হল Vue-এর টেমপ্লেট পার্সার `/>`কে যে কোনো ট্যাগ শেষ করার ইঙ্গিত হিসেবে সম্মান করে, তার ধরন নির্বিশেষে।

DOM টেমপ্লেটগুলিতে, তবে, আমাদের অবশ্যই সর্বদা স্পষ্ট ক্লোজিং ট্যাগগুলি অন্তর্ভুক্ত করতে হবে:

```vue-html
<my-component></my-component>
```

এর কারণ হল HTML স্পেক শুধুমাত্র [কিছু নির্দিষ্ট উপাদান](https://html.spec.whatwg.org/multipage/syntax.html#void-elements) ক্লোজিং ট্যাগগুলিকে বাদ দেওয়ার অনুমতি দেয়, সবচেয়ে সাধারণ হল `<input> ` এবং `<img>`। অন্য সব উপাদানের জন্য, আপনি যদি ক্লোজিং ট্যাগটি বাদ দেন, তাহলে নেটিভ HTML পার্সার মনে করবে আপনি কখনই ওপেনিং ট্যাগটি বন্ধ করেননি। উদাহরণস্বরূপ, নিম্নলিখিত স্নিপেট:

```vue-html
<my-component /> <!-- we intend to close the tag here... -->
<span>hello</span>
```

will be parsed as:

```vue-html
<my-component>
  <span>hello</span>
</my-component> <!-- but the browser will close it here. -->
```

### Element Placement Restrictions {#element-placement-restrictions}

কিছু HTML উপাদান, যেমন `<ul>`, `<ol>`, `<table>` এবং `<select>`-এর মধ্যে কী উপাদান উপস্থিত হতে পারে তার উপর সীমাবদ্ধতা রয়েছে এবং কিছু উপাদান যেমন `<li>`, `<tr>`, এবং `<option>` শুধুমাত্র কিছু অন্যান্য উপাদানের মধ্যে উপস্থিত হতে পারে।

এই ধরনের বিধিনিষেধ আছে এমন উপাদানগুলির সাথে উপাদানগুলি ব্যবহার করার সময় এটি সমস্যার দিকে পরিচালিত করবে। উদাহরণ স্বরূপ:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

কাস্টম উপাদান `<blog-post-row>` অবৈধ বিষয়বস্তু হিসাবে উত্তোলন করা হবে, যার ফলে চূড়ান্ত রেন্ডার করা আউটপুটে ত্রুটি দেখা দেবে। আমরা একটি সমাধান হিসাবে বিশেষ [`is` বৈশিষ্ট্য](/api/built-in-special-attributes#is) ব্যবহার করতে পারি:

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip
যখন নেটিভ এইচটিএমএল উপাদানগুলিতে ব্যবহার করা হয়, তখন একটি Vue উপাদান হিসাবে ব্যাখ্যা করার জন্য `is` এর মান অবশ্যই `vue:` এর সাথে প্রিফিক্স করা উচিত। স্থানীয় [কাস্টমাইজড বিল্ট-ইন elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) নিয়ে বিভ্রান্তি এড়াতে এটি প্রয়োজন।
:::

এখনকার জন্য DOM টেমপ্লেট পার্সিং সতর্কতা সম্পর্কে আপনার এতটুকুই জানা দরকার - এবং আসলে, Vue এর _Essentials_ এর শেষ। অভিনন্দন! শেখার জন্য এখনও আরও অনেক কিছু আছে, কিন্তু প্রথমে, আমরা Vue এর সাথে খেলার জন্য বিরতি নেওয়ার পরামর্শ দিই - মজাদার কিছু তৈরি করুন, অথবা আপনি যদি ইতিমধ্যে না করে থাকেন তবে কিছু [Examples](/examples/) দেখুন।

একবার আপনি যে জ্ঞানটি হজম করেছেন তাতে স্বাচ্ছন্দ্য বোধ করলে, উপাদানগুলি সম্পর্কে গভীরভাবে আরও জানতে গাইডের সাথে এগিয়ে যান।
