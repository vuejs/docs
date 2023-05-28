<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // The docs for v-model used to be part of this page. Attempt to redirect outdated links.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>

# Component Events {#component-events}

> এই পৃষ্ঠাটি ধরে নেওয়া হচ্ছে আপনি ইতিমধ্যেই [Components Basics](/guide/essentials/component-basics) পড়েছেন। আপনি যদি উপাদানগুলিতে নতুন হন তবে প্রথমে এটি পড়ুন।

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="কাস্টম ইভেন্ট সংজ্ঞায়িত করার জন্য বিনামূল্যে Vue.js পাঠ"/>
</div>

## Emitting and Listening to Events {#emitting-and-listening-to-events}

একটি component অন্তর্নির্মিত `$emit` পদ্ধতি ব্যবহার করে সরাসরি টেমপ্লেট এক্সপ্রেশনে (যেমন `v-on` হ্যান্ডলারে) কাস্টম ইভেন্ট নির্গত করতে পারে:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

<div class="options-api">

`$emit()` পদ্ধতিটি কম্পোনেন্ট ইনস্ট্যান্সে `this.$emit()` হিসেবেও পাওয়া যায়:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

</div>

তারপর parent `v-on` ব্যবহার করে এটি শুনতে পারেন:

```vue-html
<MyComponent @some-event="callback" />
```

`.once` সংশোধকটি উপাদান ইভেন্ট শ্রোতাদের জন্যও সমর্থিত:

```vue-html
<MyComponent @some-event.once="callback" />
```

উপাদান এবং প্রপসের মতো, ইভেন্টের নামগুলি একটি স্বয়ংক্রিয় কেস রূপান্তর প্রদান করে। লক্ষ্য করুন আমরা একটি ক্যামেলকেস ইভেন্ট নির্গত করেছি, কিন্তু পিতামাতার মধ্যে একটি কাবাব-কেসড শ্রোতা ব্যবহার করে এটি শুনতে পারি। [প্রপস কেসিং](/guide/components/props#prop-name-casing) এর মতো, আমরা টেমপ্লেটে কাবাব-কেসড ইভেন্ট শ্রোতাদের ব্যবহার করার পরামর্শ দিই।

:::tip
নেটিভ DOM ইভেন্টের বিপরীতে, উপাদান নির্গত ইভেন্টগুলি বুদ্বুদ **না** করে। আপনি শুধুমাত্র একটি সরাসরি শিশু উপাদান দ্বারা নির্গত ঘটনা শুনতে পারেন. ভাইবোন বা গভীরভাবে নেস্টেড উপাদানগুলির মধ্যে যোগাযোগ করার প্রয়োজন হলে, একটি বহিরাগত ইভেন্ট বাস বা একটি [গ্লোবাল স্টেট ম্যানেজমেন্ট সলিউশন](/guide/scaling-up/state-management) ব্যবহার করুন।
:::

## Event Arguments {#event-arguments}

এটি কখনও কখনও একটি ইভেন্টের সাথে একটি নির্দিষ্ট মান নির্গত করা দরকারী। উদাহরণ স্বরূপ, আমরা `<BlogPost>` কম্পোনেন্টকে টেক্সটকে কতটা বড় করতে হবে তার দায়িত্বে থাকতে চাই। এই ক্ষেত্রে, আমরা এই মান প্রদান করতে `$emit`-এ অতিরিক্ত আর্গুমেন্ট পাঠাতে পারি:

```vue-html
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

তারপর, যখন আমরা পিতামাতার ইভেন্টটি শুনি, তখন আমরা শ্রোতা হিসাবে একটি ইনলাইন তীর ফাংশন ব্যবহার করতে পারি, যা আমাদের ইভেন্ট আর্গুমেন্ট অ্যাক্সেস করতে দেয়:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

অথবা, যদি ইভেন্ট হ্যান্ডলার একটি পদ্ধতি হয়:

```vue-html
<MyButton @increase-by="increaseCount" />
```

তারপর মানটি সেই পদ্ধতির প্রথম প্যারামিটার হিসাবে পাস করা হবে:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip
ইভেন্টের নামের পরে সমস্ত অতিরিক্ত আর্গুমেন্ট `$emit()`-এ পাঠানো হয়েছে শ্রোতার কাছে ফরোয়ার্ড করা হবে। উদাহরণস্বরূপ, `$emit('foo', 1, 2, 3)` দিয়ে শ্রোতা ফাংশন তিনটি আর্গুমেন্ট পাবে।
:::

## Declaring Emitted Events {#declaring-emitted-events}

একটি উপাদান স্পষ্টভাবে ইভেন্ট ঘোষণা করতে পারে এটি ব্যবহার করে নির্গত হবে <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup#defineprops-defineemits) ম্যাক্রো</span><span class="options-api">[`emits`](/api/options-state#emits) বিকল্প</span>:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

আমরা `<template>` এ যে `$emit` পদ্ধতিটি ব্যবহার করেছি সেটি কোনো উপাদানের `<script setup>` বিভাগে অ্যাক্সেসযোগ্য নয়, কিন্তু `defineEmits()` একটি সমতুল্য ফাংশন প্রদান করে যা আমরা পরিবর্তে ব্যবহার করতে পারি:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

`defineEmits()` ম্যাক্রো **কোনও ফাংশনের ভিতরে ব্যবহার করা যাবে না**, এটি অবশ্যই উপরের উদাহরণের মতো সরাসরি `<script setup>`-এর মধ্যে রাখতে হবে।

আপনি যদি `<script setup>` এর পরিবর্তে একটি স্পষ্ট `setup` ফাংশন ব্যবহার করেন, তবে ইভেন্টগুলি [`emits`](/api/options-state#emits) বিকল্প ব্যবহার করে ঘোষণা করা উচিত এবং `emit` ফাংশনটি হল `setup()` প্রসঙ্গে প্রকাশ করা হয়েছে:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

`setup()` প্রসঙ্গের অন্যান্য বৈশিষ্ট্যের মতো, `emit` নিরাপদে ধ্বংস করা যেতে পারে:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

`emits` বিকল্পটি একটি অবজেক্ট সিনট্যাক্সকেও সমর্থন করে, যা আমাদের নির্গত ইভেন্টের পেলোডের রানটাইম বৈধতা সম্পাদন করতে দেয়:

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  submit(payload) {
    // return `true` or `false` to indicate
    // validation pass / fail
  }
})
</script>
```

আপনি যদি `<script setup>` এর সাথে TypeScript ব্যবহার করেন, তাহলে বিশুদ্ধ ধরনের টীকা ব্যবহার করে নির্গত ইভেন্ট ঘোষণা করাও সম্ভব:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

আরো বিস্তারিত: [টাইপিং কম্পোনেন্ট এমিটস](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload) {
      // return `true` or `false` to indicate
      // validation pass / fail
    }
  }
}
```

আরো দেখুন: [Typing Component Emits](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

</div>

যদিও ঐচ্ছিক, একটি উপাদান কীভাবে কাজ করবে তা আরও ভালভাবে নথি করার জন্য সমস্ত নির্গত ইভেন্টকে সংজ্ঞায়িত করার সুপারিশ করা হয়। এটি Vue-কে পরিচিত শ্রোতাদের [fallthrough attributes](/guide/components/attrs#v-on-listener-inheritance) থেকে বাদ দেওয়ার অনুমতি দেয়, 3য় পক্ষের কোড দ্বারা ম্যানুয়ালি প্রেরিত DOM ইভেন্টের কারণে এজ কেস এড়িয়ে যায়।

:::tip
যদি একটি নেটিভ ইভেন্ট (যেমন, `click`) `emits` বিকল্পে সংজ্ঞায়িত করা হয়, তাহলে শ্রোতা এখন শুধুমাত্র উপাদান-নির্গত `click` ইভেন্ট শুনবে এবং নেটিভ `click` ইভেন্টে আর সাড়া দেবে না।
:::

## Events Validation {#events-validation}

প্রপ টাইপ ভ্যালিডেশনের অনুরূপ, একটি নির্গত ইভেন্টকে বৈধ করা যেতে পারে যদি এটি অ্যারে সিনট্যাক্সের পরিবর্তে অবজেক্ট সিনট্যাক্স দিয়ে সংজ্ঞায়িত করা হয়।

বৈধতা যোগ করতে, ইভেন্টটিকে একটি ফাংশন বরাদ্দ করা হয় যা <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`-এ পাস করা আর্গুমেন্টগুলি গ্রহণ করে </span> কল করে এবং ইভেন্টটি বৈধ কিনা তা নির্দেশ করতে একটি বুলিয়ান ফেরত দেয়।

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // No validation
    click: null,

    // Validate submit event
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>
