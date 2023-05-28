# Component Registration {#component-registration}

> এই পৃষ্ঠাটি ধরে নেওয়া হচ্ছে আপনি ইতিমধ্যেই [কম্পোনেন্ট বেসিকস](/guide/essentials/component-basics) পড়েছেন। আপনি যদি উপাদানগুলিতে নতুন হন তবে প্রথমে এটি পড়ুন।

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="বিনামূল্যে Vue.js কম্পোনেন্ট নিবন্ধন পাঠ"/>

একটি Vue কম্পোনেন্টকে "রেজিস্টার" করতে হবে যাতে Vue জানতে পারে যে এটি একটি টেমপ্লেটে যখন এটির সম্মুখীন হয় তখন এটির বাস্তবায়ন কোথায় পাওয়া যায়। উপাদান নিবন্ধন করার দুটি উপায় আছে: বিশ্বব্যাপী এবং স্থানীয়।

## Global Registration {#global-registration}

আমরা `app.component()` পদ্ধতি ব্যবহার করে বর্তমান [Vue অ্যাপ্লিকেশন](/guide/essentials/application) বিশ্বব্যাপী উপাদানগুলি উপলব্ধ করতে পারি:

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // the registered name
  'MyComponent',
  // the implementation
  {
    /* ... */
  }
)
```

SFC ব্যবহার করলে, আপনি আমদানি করা `.vue` ফাইল রেজিস্টার করবেন:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

The `app.component()` method can be chained:

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

বিশ্বব্যাপী নিবন্ধিত উপাদানগুলি এই অ্যাপ্লিকেশনের মধ্যে যে কোনও উপাদানের টেমপ্লেটে ব্যবহার করা যেতে পারে:

```vue-html
<!-- this will work in any component inside the app -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

এটি এমনকি সমস্ত সাবকম্পোনেন্টের ক্ষেত্রেও প্রযোজ্য, যার অর্থ এই তিনটি উপাদানও পাওয়া যাবে _একে অপরের ভিতর_।

## Local Registration {#local-registration}

সুবিধাজনক হলেও, বিশ্বব্যাপী নিবন্ধনের কিছু ত্রুটি রয়েছে:

1. গ্লোবাল রেজিস্ট্রেশন বিল্ড সিস্টেমকে অব্যবহৃত উপাদান অপসারণ করতে বাধা দেয় (ওরফে "গাছ কাঁপানো")। আপনি যদি বিশ্বব্যাপী একটি উপাদান নিবন্ধন করেন কিন্তু শেষ পর্যন্ত এটি আপনার অ্যাপের কোথাও ব্যবহার না করেন, তাহলেও এটি চূড়ান্ত বান্ডেলে অন্তর্ভুক্ত থাকবে।

2. গ্লোবাল রেজিস্ট্রেশন বড় অ্যাপ্লিকেশনগুলিতে নির্ভরতা সম্পর্ককে কম স্পষ্ট করে তোলে। এটি ব্যবহার করে একটি পিতামাতার উপাদান থেকে একটি শিশু উপাদানের বাস্তবায়ন সনাক্ত করা কঠিন করে তোলে। এটি অনেকগুলি গ্লোবাল ভেরিয়েবল ব্যবহারের মতো দীর্ঘমেয়াদী রক্ষণাবেক্ষণকে প্রভাবিত করতে পারে।

স্থানীয় রেজিস্ট্রেশন শুধুমাত্র বর্তমান কম্পোনেন্টে নিবন্ধিত উপাদানগুলির প্রাপ্যতাকে স্কোপ করে। এটি নির্ভরতার সম্পর্ককে আরও স্পষ্ট করে তোলে এবং আরও বৃক্ষ-কাঁপানো বন্ধুত্বপূর্ণ।

<div class="composition-api">

`<script setup>` সহ SFC ব্যবহার করার সময়, আমদানি করা উপাদানগুলি নিবন্ধন ছাড়াই স্থানীয়ভাবে ব্যবহার করা যেতে পারে:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

অ-`<script setup>`-এ, আপনাকে `components` বিকল্প ব্যবহার করতে হবে:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

`components` বিকল্প ব্যবহার করে স্থানীয় নিবন্ধন করা হয়:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

`components` অবজেক্টের প্রতিটি প্রপার্টির জন্য, কী হবে কম্পোনেন্টের রেজিস্টার্ড নাম, যখন মানটিতে কম্পোনেন্টের ইমপ্লিমেন্টেশন থাকবে। উপরের উদাহরণটি ES2015 প্রপার্টি শর্টহ্যান্ড ব্যবহার করছে এবং এর সমতুল্য:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

মনে রাখবেন যে **স্থানীয়ভাবে নিবন্ধিত উপাদানগুলি বংশধর উপাদানগুলিতে *না*ও উপলব্ধ রয়েছে**। এই ক্ষেত্রে, `ComponentA` শুধুমাত্র বর্তমান উপাদানের জন্য উপলব্ধ করা হবে, এর কোনো শিশু বা বংশধর উপাদান নয়।

## Component Name Casing {#component-name-casing}

সমস্ত নির্দেশিকা জুড়ে, উপাদান নিবন্ধন করার সময় আমরা PascalCase নাম ব্যবহার করছি। এই কারণ:

1. PascalCase নামগুলি বৈধ জাভাস্ক্রিপ্ট শনাক্তকারী৷ এটি জাভাস্ক্রিপ্টে উপাদানগুলি আমদানি এবং নিবন্ধন করা সহজ করে তোলে। এটি স্বয়ংক্রিয়-সম্পূর্ণতার সাথে IDE-কে সহায়তা করে।

2. `<PascalCase />` এটিকে আরও স্পষ্ট করে তোলে যে এটি টেমপ্লেটগুলিতে একটি নেটিভ HTML উপাদানের পরিবর্তে একটি Vue উপাদান। এটি কাস্টম উপাদান (ওয়েব উপাদান) থেকে Vue উপাদানগুলিকেও আলাদা করে।

এসএফসি বা স্ট্রিং টেমপ্লেটগুলির সাথে কাজ করার সময় এটি প্রস্তাবিত শৈলী। যাইহোক, [DOM Template Parsing Caveats](/guide/essentials/component-basics#dom-template-parsing-caveats) এ আলোচনা করা হয়েছে, PascalCase ট্যাগগুলি DOM টেমপ্লেটে ব্যবহারযোগ্য নয়।

ভাগ্যক্রমে, Vue PascalCase ব্যবহার করে নিবন্ধিত উপাদানগুলিতে কাবাব-কেস ট্যাগগুলি সমাধান করতে সমর্থন করে। এর অর্থ হল `MyComponent` হিসেবে নিবন্ধিত একটি উপাদান টেমপ্লেটে `<MyComponent>` এবং `<my-component>` উভয়ের মাধ্যমে উল্লেখ করা যেতে পারে। এটি আমাদের টেমপ্লেট উত্স নির্বিশেষে একই জাভাস্ক্রিপ্ট উপাদান নিবন্ধন কোড ব্যবহার করার অনুমতি দেয়।
