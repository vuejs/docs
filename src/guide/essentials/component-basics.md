# Components Basics {#components-basics}

উপাদানগুলি আমাদের UI কে স্বাধীন এবং পুনঃব্যবহারযোগ্য টুকরোগুলিতে বিভক্ত করার অনুমতি দেয় এবং প্রতিটি অংশকে বিচ্ছিন্নভাবে চিন্তা করতে দেয়৷ একটি অ্যাপকে নেস্টেড উপাদানগুলির একটি গাছে সংগঠিত করা সাধারণ:

![Component Tree](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

এটি আমরা কীভাবে নেটিভ HTML উপাদানগুলিকে নেস্ট করি তার সাথে খুব মিল, তবে Vue এর নিজস্ব উপাদান মডেল প্রয়োগ করে যা আমাদের প্রতিটি উপাদানে কাস্টম সামগ্রী এবং যুক্তিকে এনক্যাপসুলেট করার অনুমতি দেয়। Vue নেটিভ ওয়েব কম্পোনেন্টের সাথে সুন্দরভাবে খেলে। আপনি যদি Vue উপাদান এবং নেটিভ ওয়েব উপাদানগুলির মধ্যে সম্পর্ক সম্পর্কে আগ্রহী হন, [এখানে আরও পড়ুন](/guide/extras/web-components.html)।

## Defining a Component {#defining-a-component}

একটি বিল্ড স্টেপ ব্যবহার করার সময়, আমরা সাধারণত `.vue` এক্সটেনশন ব্যবহার করে একটি ডেডিকেটেড ফাইলে প্রতিটি Vue কম্পোনেন্টকে সংজ্ঞায়িত করি - যা [Single-File Component](/guide/scaling-up/sfc.html) (সংক্ষেপে SFC) নামে পরিচিত। :

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
  // or `template: '#my-template-element'`
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

আমাদের টেমপ্লেটে ইম্পোর্ট করা কম্পোনেন্ট এক্সপোজ করতে, আমাদের এটিকে `components` বিকল্পের সাথে [register](/guide/components/registration.html) করতে হবে। কম্পোনেন্টটি তারপরে নিবন্ধিত কী ব্যবহার করে একটি ট্যাগ হিসাবে উপলব্ধ হবে।

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

এটি আমদানি না করেই একটি প্রদত্ত অ্যাপের সমস্ত উপাদানের জন্য উপলব্ধ করে, বিশ্বব্যাপী একটি উপাদান নিবন্ধন করাও সম্ভব। গ্লোবাল বনাম স্থানীয় রেজিস্ট্রেশনের ভালো-মন্দ আলোচনা করা হয়েছে ডেডিকেটেড [Component Registration](/guide/components/registration.html) বিভাগে।

উপাদানগুলি আপনি যতবার চান ততবার পুনরায় ব্যবহার করা যেতে পারে:

```vue-html
<h1>Here are many child components!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCdXR0b25Db3VudGVyIGZyb20gJy4vQnV0dG9uQ291bnRlci52dWUnXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7XG4gICAgQnV0dG9uQ291bnRlclxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8aDE+SGVyZSBhcmUgbWFueSBjaGlsZCBjb21wb25lbnRzITwvaDE+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJCdXR0b25Db3VudGVyLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiAwXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj5cbiAgICBZb3UgY2xpY2tlZCBtZSB7eyBjb3VudCB9fSB0aW1lcy5cbiAgPC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBCdXR0b25Db3VudGVyIGZyb20gJy4vQnV0dG9uQ291bnRlci52dWUnXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8aDE+SGVyZSBhcmUgbWFueSBjaGlsZCBjb21wb25lbnRzITwvaDE+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJCdXR0b25Db3VudGVyLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGNvdW50ID0gcmVmKDApXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj5cbiAgICBZb3UgY2xpY2tlZCBtZSB7eyBjb3VudCB9fSB0aW1lcy5cbiAgPC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

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

প্রপগুলি হল কাস্টম বৈশিষ্ট্যগুলি যা আপনি একটি উপাদানে নিবন্ধন করতে পারেন। আমাদের ব্লগ পোস্ট কম্পোনেন্টে একটি শিরোনাম পাস করার জন্য, আমাদের অবশ্যই এটিকে এই উপাদানটি গ্রহণ করে প্রপসের তালিকায় ঘোষণা করতে হবে, ব্যবহার করে<span class="options-api">[`props`](/api/options-state.html#props) option</span><span class="composition-api">[`defineProps`](/api/sfc-script-setup.html#defineprops-defineemits) macro</span>:

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

আরও দেখুন: [টাইপিং কম্পোনেন্ট প্রপস](/guide/typescript/composition-api.html#typing-component-props) <sup class="vt-badge ts" />

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

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBCbG9nUG9zdFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0czogW1xuICAgICAgICB7IGlkOiAxLCB0aXRsZTogJ015IGpvdXJuZXkgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDIsIHRpdGxlOiAnQmxvZ2dpbmcgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDMsIHRpdGxlOiAnV2h5IFZ1ZSBpcyBzbyBmdW4nIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxCbG9nUG9zdFxuICBcdHYtZm9yPVwicG9zdCBpbiBwb3N0c1wiXG5cdCAgOmtleT1cInBvc3QuaWRcIlxuICBcdDp0aXRsZT1cInBvc3QudGl0bGVcIlxuXHQ+PC9CbG9nUG9zdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ3RpdGxlJ11cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxoND57eyB0aXRsZSB9fTwvaDQ+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5jb25zdCBwb3N0cyA9IHJlZihbXG4gIHsgaWQ6IDEsIHRpdGxlOiAnTXkgam91cm5leSB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMiwgdGl0bGU6ICdCbG9nZ2luZyB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMywgdGl0bGU6ICdXaHkgVnVlIGlzIHNvIGZ1bicgfVxuXSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxCbG9nUG9zdFxuICBcdHYtZm9yPVwicG9zdCBpbiBwb3N0c1wiXG5cdCAgOmtleT1cInBvc3QuaWRcIlxuICBcdDp0aXRsZT1cInBvc3QudGl0bGVcIlxuXHQ+PC9CbG9nUG9zdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyhbJ3RpdGxlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDQ+e3sgdGl0bGUgfX08L2g0PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

লক্ষ্য করুন কিভাবে `v-bind` ডায়নামিক প্রপ মান পাস করতে ব্যবহৃত হয়। এটি বিশেষভাবে উপযোগী যখন আপনি সঠিক বিষয়বস্তু জানেন না যে আপনি সময়ের আগে রেন্ডার করতে যাচ্ছেন।

আপাতত প্রপস সম্পর্কে আপনার শুধু এটাই জানা দরকার, কিন্তু একবার আপনি এই পৃষ্ঠাটি পড়া শেষ করে এবং এর বিষয়বস্তুতে স্বাচ্ছন্দ্য বোধ করলে, আমরা সম্পূর্ণ গাইড [Props](/guide/components/props.html) পড়ার জন্য পরে ফিরে আসার পরামর্শ দিই।

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

তারপর চাইল্ড কম্পোনেন্ট বিল্ট-ইন [**`$emit`** পদ্ধতি](/api/component-instance.html#emit) কল করে ইভেন্টের নাম পাস করে নিজেই একটি ইভেন্ট নির্গত করতে পারে:

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

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBCbG9nUG9zdFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0czogW1xuICAgICAgICB7IGlkOiAxLCB0aXRsZTogJ015IGpvdXJuZXkgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDIsIHRpdGxlOiAnQmxvZ2dpbmcgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDMsIHRpdGxlOiAnV2h5IFZ1ZSBpcyBzbyBmdW4nIH1cbiAgICAgIF0sXG4gICAgICBwb3N0Rm9udFNpemU6IDFcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOnN0eWxlPVwieyBmb250U2l6ZTogcG9zdEZvbnRTaXplICsgJ2VtJyB9XCI+XG4gICAgPEJsb2dQb3N0XG4gICAgICB2LWZvcj1cInBvc3QgaW4gcG9zdHNcIlxuICAgICAgOmtleT1cInBvc3QuaWRcIlxuICAgICAgOnRpdGxlPVwicG9zdC50aXRsZVwiXG4gICAgICBAZW5sYXJnZS10ZXh0PVwicG9zdEZvbnRTaXplICs9IDAuMVwiXG4gICAgPjwvQmxvZ1Bvc3Q+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQmxvZ1Bvc3QudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IFsndGl0bGUnXSxcbiAgZW1pdHM6IFsnZW5sYXJnZS10ZXh0J11cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJibG9nLXBvc3RcIj5cblx0ICA8aDQ+e3sgdGl0bGUgfX08L2g0PlxuXHQgIDxidXR0b24gQGNsaWNrPVwiJGVtaXQoJ2VubGFyZ2UtdGV4dCcpXCI+RW5sYXJnZSB0ZXh0PC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5jb25zdCBwb3N0cyA9IHJlZihbXG4gIHsgaWQ6IDEsIHRpdGxlOiAnTXkgam91cm5leSB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMiwgdGl0bGU6ICdCbG9nZ2luZyB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMywgdGl0bGU6ICdXaHkgVnVlIGlzIHNvIGZ1bicgfVxuXSlcblxuY29uc3QgcG9zdEZvbnRTaXplID0gcmVmKDEpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8ZGl2IDpzdHlsZT1cInsgZm9udFNpemU6IHBvc3RGb250U2l6ZSArICdlbScgfVwiPlxuICAgIDxCbG9nUG9zdFxuICAgICAgdi1mb3I9XCJwb3N0IGluIHBvc3RzXCJcbiAgICAgIDprZXk9XCJwb3N0LmlkXCJcbiAgICAgIDp0aXRsZT1cInBvc3QudGl0bGVcIlxuICAgICAgQGVubGFyZ2UtdGV4dD1cInBvc3RGb250U2l6ZSArPSAwLjFcIlxuICAgID48L0Jsb2dQb3N0PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyhbJ3RpdGxlJ10pXG5kZWZpbmVFbWl0cyhbJ2VubGFyZ2UtdGV4dCddKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImJsb2ctcG9zdFwiPlxuICAgIDxoND57eyB0aXRsZSB9fTwvaDQ+XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCIkZW1pdCgnZW5sYXJnZS10ZXh0JylcIj5FbmxhcmdlIHRleHQ8L2J1dHRvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPiJ9)

</div>

আমরা ঐচ্ছিকভাবে ব্যবহার করে নির্গত ইভেন্ট ঘোষণা করতে পারি <span class="options-api">[`emits`](/api/options-state.html#emits) option</span><span class="composition-api">[`defineEmits`](/api/sfc-script-setup.html#defineprops-defineemits) macro</span>:

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

This documents all the events that a component emits and optionally [validates them](/guide/components/events.html#events-validation). It also allows Vue to avoid implicitly applying them as native listeners to the child component's root element.

<div class="composition-api">

`defineProps` এর মতো, `defineEmits` শুধুমাত্র `<script setup>`-এ ব্যবহারযোগ্য এবং আমদানি করার প্রয়োজন নেই। এটি একটি `emit` ফাংশন প্রদান করে যা `$emit` পদ্ধতির সমতুল্য। এটি একটি উপাদানের `<script setup>` বিভাগে ইভেন্ট নির্গত করতে ব্যবহার করা যেতে পারে, যেখানে `$emit` সরাসরি অ্যাক্সেসযোগ্য নয়:

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

See also: [Typing Component Emits](/guide/typescript/composition-api.html#typing-component-emits) <sup class="vt-badge ts" />

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

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBBbGVydEJveCBmcm9tICcuL0FsZXJ0Qm94LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQWxlcnRCb3ggfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PEFsZXJ0Qm94PlxuICBcdFNvbWV0aGluZyBiYWQgaGFwcGVuZWQuXG5cdDwvQWxlcnRCb3g+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJBbGVydEJveC52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJhbGVydC1ib3hcIj5cbiAgICA8c3Ryb25nPkVycm9yITwvc3Ryb25nPlxuICAgIDxici8+XG4gICAgPHNsb3QgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuLmFsZXJ0LWJveCB7XG4gIGNvbG9yOiAjNjY2O1xuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbn1cbiAgXG5zdHJvbmcge1xuXHRjb2xvcjogcmVkOyAgICBcbn1cbjwvc3R5bGU+In0=)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBBbGVydEJveCBmcm9tICcuL0FsZXJ0Qm94LnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxBbGVydEJveD5cbiAgXHRTb21ldGhpbmcgYmFkIGhhcHBlbmVkLlxuXHQ8L0FsZXJ0Qm94PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQWxlcnRCb3gudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiYWxlcnQtYm94XCI+XG4gICAgPHN0cm9uZz5FcnJvciE8L3N0cm9uZz5cbiAgICA8YnIvPlxuICAgIDxzbG90IC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cbi5hbGVydC1ib3gge1xuICBjb2xvcjogIzY2NjtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XG59XG4gIFxuc3Ryb25nIHtcblx0Y29sb3I6IHJlZDsgICAgXG59XG48L3N0eWxlPiJ9)

</div>

আপাতত স্লট সম্পর্কে আপনার এতটুকুই জানা দরকার, কিন্তু একবার আপনি এই পৃষ্ঠাটি পড়া শেষ করে এবং এর বিষয়বস্তুতে স্বাচ্ছন্দ্য বোধ করলে, আমরা [Slots](/guide/components/slots) এর সম্পূর্ণ নির্দেশিকা পড়তে পরে ফিরে আসার পরামর্শ দিই।

## Dynamic Components {#dynamic-components}

কখনও কখনও, ট্যাবযুক্ত ইন্টারফেসের মতো উপাদানগুলির মধ্যে গতিশীলভাবে স্যুইচ করা দরকারী:

<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEhvbWUsXG4gICAgUG9zdHMsXG4gICAgQXJjaGl2ZVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50VGFiOiAnSG9tZScsXG4gICAgICB0YWJzOiBbJ0hvbWUnLCAnUG9zdHMnLCAnQXJjaGl2ZSddXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cInRhYiBpbiB0YWJzXCJcbiAgICAgICA6a2V5PVwidGFiXCJcbiAgICAgICA6Y2xhc3M9XCJbJ3RhYi1idXR0b24nLCB7IGFjdGl2ZTogY3VycmVudFRhYiA9PT0gdGFiIH1dXCJcbiAgICAgICBAY2xpY2s9XCJjdXJyZW50VGFiID0gdGFiXCJcbiAgICAgPlxuICAgICAge3sgdGFiIH19XG4gICAgPC9idXR0b24+XG5cdCAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50VGFiXCIgY2xhc3M9XCJ0YWJcIj48L2NvbXBvbmVudD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uZGVtbyB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBhZGRpbmc6IDIwcHggMzBweDtcbiAgbWFyZ2luLXRvcDogMWVtO1xuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgb3ZlcmZsb3cteDogYXV0bztcbn1cblxuLnRhYi1idXR0b24ge1xuICBwYWRkaW5nOiA2cHggMTBweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjA7XG4gIG1hcmdpbi1ib3R0b206IC0xcHg7XG4gIG1hcmdpbi1yaWdodDogLTFweDtcbn1cbi50YWItYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWItYnV0dG9uLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNlMGUwZTA7XG59XG4udGFiIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZzogMTBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkhvbWUudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgSG9tZSBjb21wb25lbnRcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIlBvc3RzLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIFBvc3RzIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiQXJjaGl2ZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBBcmNoaXZlIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>
<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuIFxuY29uc3QgY3VycmVudFRhYiA9IHJlZignSG9tZScpXG5cbmNvbnN0IHRhYnMgPSB7XG4gIEhvbWUsXG4gIFBvc3RzLFxuICBBcmNoaXZlXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cIihfLCB0YWIpIGluIHRhYnNcIlxuICAgICAgIDprZXk9XCJ0YWJcIlxuICAgICAgIDpjbGFzcz1cIlsndGFiLWJ1dHRvbicsIHsgYWN0aXZlOiBjdXJyZW50VGFiID09PSB0YWIgfV1cIlxuICAgICAgIEBjbGljaz1cImN1cnJlbnRUYWIgPSB0YWJcIlxuICAgICA+XG4gICAgICB7eyB0YWIgfX1cbiAgICA8L2J1dHRvbj5cblx0ICA8Y29tcG9uZW50IDppcz1cInRhYnNbY3VycmVudFRhYl1cIiBjbGFzcz1cInRhYlwiPjwvY29tcG9uZW50PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5kZW1vIHtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgcGFkZGluZzogMjBweCAzMHB4O1xuICBtYXJnaW4tdG9wOiAxZW07XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBvdmVyZmxvdy14OiBhdXRvO1xufVxuXG4udGFiLWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZDogI2YwZjBmMDtcbiAgbWFyZ2luLWJvdHRvbTogLTFweDtcbiAgbWFyZ2luLXJpZ2h0OiAtMXB4O1xufVxuLnRhYi1idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZTBlMGUwO1xufVxuLnRhYi1idXR0b24uYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiSG9tZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBIb21lIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiUG9zdHMudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgUG9zdHMgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJBcmNoaXZlLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIEFyY2hpdmUgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4ifQ==)

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

`<component :is="...">` দিয়ে একাধিক কম্পোনেন্টের মধ্যে স্যুইচ করার সময়, একটি কম্পোনেন্ট আনমাউন্ট করা হবে যখন এটি থেকে সুইচ করা হবে। আমরা বিল্ট-ইন [`<KeepAlive>` কম্পোনেন্ট](/guide/built-ins/keep-alive.html) দিয়ে নিষ্ক্রিয় উপাদানগুলিকে "জীবিত" থাকতে বাধ্য করতে পারি।

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

কাস্টম উপাদান `<blog-post-row>` অবৈধ বিষয়বস্তু হিসাবে উত্তোলন করা হবে, যার ফলে চূড়ান্ত রেন্ডার করা আউটপুটে ত্রুটি দেখা দেবে। আমরা একটি সমাধান হিসাবে বিশেষ [`is` বৈশিষ্ট্য](/api/built-in-special-attributes.html#is) ব্যবহার করতে পারি:

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
