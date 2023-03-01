---
outline: deep
---

# Using Vue with TypeScript {#using-vue-with-typescript}

টাইপস্ক্রিপ্টের মতো একটি টাইপ সিস্টেম বিল্ড টাইমে স্ট্যাটিক বিশ্লেষণের মাধ্যমে অনেক সাধারণ ত্রুটি সনাক্ত করতে পারে। এটি উত্পাদনে রানটাইম ত্রুটির সম্ভাবনাকে হ্রাস করে, এবং আমাদেরকে বড় আকারের অ্যাপ্লিকেশনগুলিতে আরও আত্মবিশ্বাসের সাথে রিফ্যাক্টর কোডের অনুমতি দেয়। টাইপস্ক্রিপ্ট IDE-তে টাইপ-ভিত্তিক স্বয়ংক্রিয়-সম্পূর্ণতার মাধ্যমে বিকাশকারীর এর্গোনমিক্সকেও উন্নত করে।

Vue টাইপস্ক্রিপ্টে লেখা হয় এবং প্রথম শ্রেণীর টাইপস্ক্রিপ্ট সমর্থন প্রদান করে। সমস্ত অফিসিয়াল Vue প্যাকেজ বান্ডিল টাইপ ডিক্লেয়ারেশনের সাথে আসে যা বাক্সের বাইরে কাজ করা উচিত।

## Project Setup {#project-setup}

[`create-vue`](https://github.com/vuejs/create-vue), অফিসিয়াল প্রজেক্ট স্ক্যাফোল্ডিং টুল, একটি [Vite](https://vitejs.dev/)-চালিত স্ক্যাফোল্ড করার বিকল্পগুলি অফার করে , TypeScript-প্রস্তুত Vue প্রকল্প।

### Overview {#overview}

একটি Vite-ভিত্তিক সেটআপের সাথে, dev সার্ভার এবং বান্ডলার শুধুমাত্র ট্রান্সপিলেশন হয় এবং কোনো প্রকার-চেকিং করে না। এটি নিশ্চিত করে যে Vite dev সার্ভারটি টাইপস্ক্রিপ্ট ব্যবহার করার সময়ও দ্রুত জ্বলন্ত থাকে।

- বিকাশের সময়, আমরা টাইপ ত্রুটির বিষয়ে তাত্ক্ষণিক প্রতিক্রিয়ার জন্য একটি ভাল [IDE সেটআপ](#ide-support) এর উপর নির্ভর করার পরামর্শ দিই।

- SFCs ব্যবহার করলে, কমান্ড লাইন টাইপ চেকিং এবং টাইপ ডিক্লেয়ারেশন জেনারেশনের জন্য [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/vue-tsc) ইউটিলিটি ব্যবহার করুন। `vue-tsc` হল `tsc` এর চারপাশে একটি মোড়ক, টাইপস্ক্রিপ্টের নিজস্ব কমান্ড লাইন ইন্টারফেস। এটি টাইপস্ক্রিপ্ট ফাইলগুলি ছাড়াও Vue SFC সমর্থন করে তা ছাড়া এটি মূলত `tsc` এর মতোই কাজ করে। আপনি Vite dev সার্ভারের সমান্তরালে ওয়াচ মোডে `vue-tsc` চালাতে পারেন অথবা [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) এর মতো একটি Vite প্লাগইন ব্যবহার করতে পারেন যা চলে একটি পৃথক কর্মী থ্রেড চেক.

- Vue CLI এছাড়াও TypeScript সমর্থন প্রদান করে, কিন্তু আর সুপারিশ করা হয় না। দেখুন [নীচের নোট](#note-on-vue-cli-and-ts-loader).

### IDE Support {#ide-support}

- [ভিজ্যুয়াল স্টুডিও কোড](https://code.visualstudio.com/) (VSCode) এর TypeScript-এর জন্য দুর্দান্ত আউট-অফ-দ্য-বক্স সমর্থনের জন্য দৃঢ়ভাবে সুপারিশ করা হয়।

  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) হল অফিসিয়াল VSCode এক্সটেনশন যা Vue SFC-এর মধ্যে TypeScript সমর্থন প্রদান করে, সাথে আরও অনেক দুর্দান্ত বৈশিষ্ট্য রয়েছে।

    :::tip
    Volar প্রতিস্থাপন করে [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), Vue 2-এর জন্য আমাদের পূর্ববর্তী অফিসিয়াল VSCode এক্সটেনশন। আপনার যদি বর্তমানে Vetur ইনস্টল করা থাকে, তাহলে Vue 3 প্রকল্পে এটি নিষ্ক্রিয় করার বিষয়টি নিশ্চিত করুন .
    :::

  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) টিএস ফাইলগুলিতে `*.vue` আমদানির জন্য টাইপ সমর্থন পেতেও প্রয়োজন।

- [WebStorm](https://www.jetbrains.com/webstorm/) এছাড়াও TypeScript এবং Vue উভয়ের জন্য আউট-অফ-দ্য-বক্স সমর্থন প্রদান করে। অন্যান্য JetBrains IDE গুলিও তাদের সমর্থন করে, হয় বাক্সের বাইরে বা [একটি বিনামূল্যের প্লাগইন](https://plugins.jetbrains.com/plugin/9442-vue-js) এর মাধ্যমে।

### Configuring `tsconfig.json` {#configuring-tsconfig-json}

`create-vue` এর মাধ্যমে স্ক্যাফোল্ড করা প্রজেক্টের মধ্যে পূর্ব-কনফিগার করা `tsconfig.json` অন্তর্ভুক্ত থাকে। বেস কনফিগারেশনটি [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) প্যাকেজে বিমূর্ত করা হয়েছে। প্রজেক্টের ভিতরে, আমরা [প্রকল্প রেফারেন্স](https://www.typescriptlang.org/docs/handbook/project-references.html) ব্যবহার করি যাতে বিভিন্ন পরিবেশে কোড চলার জন্য সঠিক প্রকার নিশ্চিত করা যায় (যেমন অ্যাপ কোড এবং টেস্ট কোড থাকা উচিত বিভিন্ন গ্লোবাল ভেরিয়েবল)।

ম্যানুয়ালি `tsconfig.json` কনফিগার করার সময়, কিছু উল্লেখযোগ্য বিকল্পের মধ্যে রয়েছে:

- [`compilerOptions.isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) `true`-তে সেট করা আছে কারণ Vite TypeScript ট্রান্সপিলিং করার জন্য [esbuild](https://esbuild.github.io/) ব্যবহার করে এবং একক-ফাইল ট্রান্সপিল সীমাবদ্ধতার বিষয়।

- আপনি যদি Options API ব্যবহার করেন, তাহলে আপনাকে [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) সেট করতে হবে `true` (অথবা অন্তত [`compilerOptions.noImplicitThis` সক্ষম করুন। ](https://www.typescriptlang.org/tsconfig#noImplicitThis), যা `strict` পতাকার একটি অংশ) উপাদান বিকল্পে `this`-এর টাইপ চেকিংয়ের সুবিধা নিতে। অন্যথায় `this`টিকে `any` হিসাবে গণ্য করা হবে।

- আপনি যদি আপনার বিল্ড টুলে সমাধানকারী উপনামগুলি কনফিগার করে থাকেন, উদাহরণস্বরূপ `@/*` উপনাম একটি `create-vue` প্রজেক্টে ডিফল্টরূপে কনফিগার করা থাকে, তাহলে আপনাকে [`compilerOptions.paths`](এর মাধ্যমে TypeScript-এর জন্যও কনফিগার করতে হবে https://www.typescriptlang.org/tsconfig#paths)।

আরো দেখুন:

- [অফিসিয়াল টাইপস্ক্রিপ্ট কম্পাইলার অপশন ডক্স](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [এসবিল্ড টাইপস্ক্রিপ্ট সংকলন সতর্কতা](https://esbuild.github.io/content-types/#typescript-caveats)

### Volar Takeover Mode {#volar-takeover-mode}

> এই বিভাগটি শুধুমাত্র VSCode + Volar এর জন্য প্রযোজ্য।

Vue SFC এবং TypeScript একসাথে কাজ করার জন্য, Volar Vue-নির্দিষ্ট সমর্থনের সাথে প্যাচ করা একটি পৃথক TS ভাষা পরিষেবা দৃষ্টান্ত তৈরি করে এবং এটি Vue SFC-তে ব্যবহার করে। একই সময়ে, প্লেইন টিএস ফাইলগুলি এখনও VSCode-এর অন্তর্নির্মিত TS ভাষা পরিষেবা দ্বারা পরিচালিত হয়, যে কারণে আমাদের [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript) প্রয়োজন -vue-প্লাগইন) টিএস ফাইলগুলিতে Vue SFC আমদানি সমর্থন করতে। এই ডিফল্ট সেটআপ কাজ করে, কিন্তু প্রতিটি প্রকল্পের জন্য আমরা দুটি টিএস ভাষা পরিষেবা দৃষ্টান্ত চালাচ্ছি: একটি Volar থেকে, একটি VSCode-এর অন্তর্নির্মিত পরিষেবা থেকে৷ এটি কিছুটা অদক্ষ এবং বড় প্রকল্পে কর্মক্ষমতা সমস্যা হতে পারে।

ভোলার কর্মক্ষমতা উন্নত করতে "টেকওভার মোড" নামে একটি বৈশিষ্ট্য সরবরাহ করে। টেকওভার মোডে, Volar একটি একক TS ভাষা পরিষেবার উদাহরণ ব্যবহার করে Vue এবং TS ফাইল উভয়ের জন্য সমর্থন প্রদান করে।

টেকওভার মোড সক্ষম করতে, আপনাকে এই পদক্ষেপগুলি অনুসরণ করে **আপনার প্রকল্পের কর্মক্ষেত্রে** ভিএসসিডের অন্তর্নির্মিত টিএস ভাষা পরিষেবা নিষ্ক্রিয় করতে হবে:

1. আপনার প্রজেক্ট ওয়ার্কস্পেসে, 'Ctrl + Shift + P' (macOS: `Cmd + Shift + P`) সহ কমান্ড প্যালেট আনুন।
2. `বিল্ট` টাইপ করুন এবং "এক্সটেনশন: বিল্ট-ইন এক্সটেনশন দেখান" নির্বাচন করুন।
3. এক্সটেনশন সার্চ বক্সে `টাইপস্ক্রিপ্ট` টাইপ করুন (`@builtin` উপসর্গ মুছে ফেলবেন না)।
4. "TypeScript এবং JavaScript Language Features"-এর সামান্য গিয়ার আইকনে ক্লিক করুন এবং "অক্ষম (ওয়ার্কস্পেস)" নির্বাচন করুন।
5. কর্মক্ষেত্র পুনরায় লোড করুন। আপনি যখন একটি Vue বা TS ফাইল খুলবেন তখন টেকওভার মোড সক্ষম হবে৷

<img src="./images/takeover-mode.png" width="590" height="426" style="margin:0px auto;border-radius:8px">

### Note on Vue CLI and `ts-loader` {#note-on-vue-cli-and-ts-loader}

Vue CLI-এর মতো ওয়েবপ্যাক-ভিত্তিক সেটআপগুলিতে, মডিউল ট্রান্সফর্ম পাইপলাইনের অংশ হিসাবে টাইপ চেকিং করা সাধারণ, উদাহরণস্বরূপ `ts-loader` এর সাথে। যাইহোক, এটি একটি পরিষ্কার সমাধান নয় কারণ টাইপ সিস্টেমের টাইপ চেক করার জন্য সম্পূর্ণ মডিউল গ্রাফের জ্ঞান প্রয়োজন। স্বতন্ত্র মডিউলের রূপান্তর পদক্ষেপটি কাজের জন্য সঠিক জায়গা নয়। এটি নিম্নলিখিত সমস্যার দিকে পরিচালিত করে:

- `ts-loader` শুধুমাত্র চেক পোস্ট-ট্রান্সফর্ম কোড টাইপ করতে পারে। এটি আইডিই বা `vue-tsc` থেকে আমরা যে ত্রুটিগুলি দেখি তার সাথে সারিবদ্ধ নয়, যা সরাসরি উৎস কোডে ফিরে আসে।

- টাইপ চেকিং ধীর হতে পারে। যখন এটি একই থ্রেড/প্রসেসে কোড ট্রান্সফরমেশনের সাথে সঞ্চালিত হয়, তখন এটি সমগ্র অ্যাপ্লিকেশনের বিল্ড গতিকে উল্লেখযোগ্যভাবে প্রভাবিত করে।

- আমাদের ইতিমধ্যেই আলাদা প্রক্রিয়ায় আমাদের IDE-তে টাইপ চেকিং চলছে, তাই ডেভ এক্সপেরিয়েন্সের খরচ মন্থর হয়ে যাওয়াটা ভালো ট্রেড-অফ নয়।

আপনি যদি বর্তমানে Vue CLI এর মাধ্যমে Vue 3 + TypeScript ব্যবহার করছেন, আমরা দৃঢ়ভাবে Vite-এ স্থানান্তরিত করার পরামর্শ দিই। আমরা ট্রান্সপিল-শুধু TS সমর্থন সক্ষম করার জন্য CLI বিকল্পগুলিতেও কাজ করছি, যাতে আপনি টাইপ চেকিংয়ের জন্য `vue-tsc`-এ স্যুইচ করতে পারেন।

## General Usage Notes {#general-usage-notes}

### `defineComponent()` {#definecomponent}

টাইপস্ক্রিপ্ট সঠিকভাবে কম্পোনেন্ট অপশনের অভ্যন্তরে প্রকারগুলি অনুমান করতে দিতে, আমাদের [`defineComponent()`](/api/general.html#definecomponent) দিয়ে উপাদানগুলি সংজ্ঞায়িত করতে হবে:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // type: string | undefined
    this.msg // type: string
    this.count // type: number
  }
})
```

`<script setup>` ছাড়া Composition API ব্যবহার করার সময় `defineComponent()` `setup()`-এ পাস করা প্রপস অনুমান করাও সমর্থন করে:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    message: String
  },
  setup(props) {
    props.message // type: string | undefined
  }
})
```

আরো দেখুন:

- [ওয়েবপ্যাক ট্রিশেকিং-এ নোট](/api/general.html#note-on-webpack-treeshaking)
- [`defineComponent` এর জন্য টাইপ টেস্ট](https://github.com/vuejs/core/blob/main/packages/dts-test/defineComponent.test-d.tsx)

:::tip
`defineComponent()` প্লেইন জাভাস্ক্রিপ্টে সংজ্ঞায়িত উপাদানগুলির জন্য টাইপ ইনফারেন্স সক্ষম করে।
:::

### Usage in Single-File Components {#usage-in-single-file-components}

SFC-তে TypeScript ব্যবহার করতে, `<script>` ট্যাগে `lang="ts"` অ্যাট্রিবিউট যোগ করুন। যখন `lang="ts"` উপস্থিত থাকে, তখন সমস্ত টেমপ্লেট এক্সপ্রেশন কঠোর টাইপ চেকিং উপভোগ করে।

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 1
    }
  }
})
</script>

<template>
  <!-- type checking and auto-completion enabled -->
  {{ count.toFixed(2) }}
</template>
```

`lang="ts"` can also be used with `<script setup>`:

```vue
<script setup lang="ts">
// TypeScript enabled
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <!-- type checking and auto-completion enabled -->
  {{ count.toFixed(2) }}
</template>
```

### TypeScript in Templates {#typescript-in-templates}

যখন `<script lang="ts">` বা `<script setup lang="ts">` ব্যবহার করা হয় তখন `<template>` টাইপস্ক্রিপ্টকে বাইন্ডিং এক্সপ্রেশনে সমর্থন করে। এটি এমন ক্ষেত্রে দরকারী যেখানে আপনাকে টেমপ্লেট এক্সপ্রেশনে টাইপ কাস্টিং করতে হবে।

এখানে একটি কল্পিত উদাহরণ:

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- error because x could be a string -->
  {{ x.toFixed(2) }}
</template>
```

এটি একটি ইনলাইন টাইপ কাস্ট দিয়ে কাজ করা যেতে পারে:

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip
Vue CLI বা একটি ওয়েবপ্যাক-ভিত্তিক সেটআপ ব্যবহার করলে, টেমপ্লেট এক্সপ্রেশনে TypeScript-এর প্রয়োজন `vue-loader@^16.8.0`।
:::

## API-Specific Recipes {#api-specific-recipes}

- [TS with Composition API](./composition-api)
- [TS with Options API](./options-api)
