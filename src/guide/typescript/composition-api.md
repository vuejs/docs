# TypeScript with Composition API {#typescript-with-composition-api}

> এই পৃষ্ঠাটি ধরে নেওয়া হয়েছে আপনি ইতিমধ্যেই [TypeScript এর সাথে Vue ব্যবহার করে](./overview) এর ওভারভিউ পড়েছেন।

## Typing Component Props {#typing-component-props}

### Using `<script setup>` {#using-script-setup}

`<script setup>` ব্যবহার করার সময়, `defineProps()` ম্যাক্রো তার আর্গুমেন্টের উপর ভিত্তি করে প্রপ ধরনের অনুমান করা সমর্থন করে:

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

এটিকে "runtime declaration" বলা হয়, কারণ `defineProps()`-এ পাস করা আর্গুমেন্ট রানটাইম `props` বিকল্প হিসেবে ব্যবহার করা হবে।

যাইহোক, সাধারণত একটি জেনেরিক টাইপ আর্গুমেন্টের মাধ্যমে বিশুদ্ধ প্রকারের সাথে প্রপসকে সংজ্ঞায়িত করা আরও সোজা:

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

একে "type-based declaration" বলা হয়। কম্পাইলার টাইপ আর্গুমেন্টের উপর ভিত্তি করে সমতুল্য রানটাইম বিকল্পগুলি অনুমান করার জন্য যথাসাধ্য চেষ্টা করবে। এই ক্ষেত্রে, আমাদের দ্বিতীয় উদাহরণটি প্রথম উদাহরণের মতো একই রানটাইম বিকল্পগুলিতে কম্পাইল করে।

আপনি type-based declaration বা runtime declaration ব্যবহার করতে পারেন, কিন্তু আপনি একই সময়ে উভয়ই ব্যবহার করতে পারবেন না।

আমরা একটি পৃথক ইন্টারফেসে প্রপস প্রকারগুলিকে স্থানান্তর করতে পারি:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

#### Syntax Limitations {#syntax-limitations}

সংস্করণ 3.2 এবং নীচে, `defineProps()`-এর জন্য জেনেরিক টাইপ প্যারামিটার একটি আক্ষরিক টাইপ বা স্থানীয় ইন্টারফেসের একটি রেফারেন্সের মধ্যে সীমাবদ্ধ ছিল।

এই সীমাবদ্ধতা 3.3 এ সমাধান করা হয়েছে। Vue-এর সর্বশেষ সংস্করণটি টাইপ প্যারামিটার অবস্থানে আমদানি করা রেফারেন্সিং এবং জটিল ধরনের একটি সীমিত সেট সমর্থন করে। যাইহোক, যেহেতু রানটাইম রূপান্তরের ধরনটি এখনও AST-ভিত্তিক, কিছু জটিল প্রকারের প্রকৃত প্রকার বিশ্লেষণের প্রয়োজন, যেমন শর্তাধীন প্রকার, সমর্থিত নয়। আপনি একটি একক প্রপের ধরণের জন্য শর্তসাপেক্ষ প্রকারগুলি ব্যবহার করতে পারেন, তবে সম্পূর্ণ প্রপস অবজেক্ট নয়।

### Props Default Values {#props-default-values}

type-based declaration ব্যবহার করার সময়, আমরা প্রপসের জন্য ডিফল্ট মান ঘোষণা করার ক্ষমতা হারিয়ে ফেলি। এটি `withDefaults` কম্পাইলার ম্যাক্রো দ্বারা সমাধান করা যেতে পারে:

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

এটি সমতুল্য রানটাইম প্রপস `default` বিকল্পে কম্পাইল করা হবে। উপরন্তু, `withDefaults` হেল্পার ডিফল্ট মানগুলির জন্য টাইপ চেক প্রদান করে এবং নিশ্চিত করে যে প্রত্যাবর্তিত `props` টাইপটিতে ডিফল্ট মান ঘোষিত বৈশিষ্ট্যগুলির জন্য ঐচ্ছিক ফ্ল্যাগগুলি সরানো হয়েছে।

### Without `<script setup>` {#without-script-setup}

`<script setup>` ব্যবহার না করলে, প্রপ টাইপ ইনফারেন্স সক্ষম করতে `defineComponent()` ব্যবহার করতে হবে। প্রপস অবজেক্টের ধরন যা `setup()`-এ পাস করা হয়েছে তা `props` বিকল্প থেকে অনুমান করা হয়েছে।

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- type: string
  }
})
```

### Complex prop types {#complex-prop-types}

টাইপ-ভিত্তিক ঘোষণার সাথে, একটি প্রপ একটি জটিল টাইপ ব্যবহার করতে পারে যেমন অন্য যেকোনো ধরনের:

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
}>()
</script>
```

For runtime declaration, আমরা `PropType` ইউটিলিটি টাইপ ব্যবহার করতে পারি:

```ts
import type { PropType } from 'vue'

const props = defineProps({
  book: Object as PropType<Book>
})
```

এটি একইভাবে কাজ করে যদি আমরা সরাসরি `props` বিকল্পটি নির্দিষ্ট করছি:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    book: Object as PropType<Book>
  }
})
```

অপশন এপিআই-এর সাথে `props` বিকল্পটি বেশি ব্যবহৃত হয়, তাই আপনি [TypeScript with Options API](/guide/typescript/options-api#typing-component-props) এর গাইডে আরও বিস্তারিত উদাহরণ পাবেন। এই উদাহরণগুলিতে দেখানো কৌশলগুলি `defineProps()` ব্যবহার করে রানটাইম ঘোষণার ক্ষেত্রেও প্রযোজ্য।

## Typing Component Emits {#typing-component-emits}

`<script setup>`-এ, `emit` ফাংশনটি রানটাইম ঘোষণা বা টাইপ ঘোষণা ব্যবহার করেও টাইপ করা যেতে পারে:

```vue
<script setup lang="ts">
// runtime
const emit = defineEmits(['change', 'update'])

// type-based
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

টাইপ আর্গুমেন্ট নিম্নলিখিতগুলির মধ্যে একটি হতে পারে:

1. একটি কলযোগ্য ফাংশন প্রকার, কিন্তু [Call Signatures](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures) সহ আক্ষরিক টাইপ হিসাবে লেখা। এটি রিটার্ন করা `এemitমিট` ফাংশনের ধরণ হিসেবে ব্যবহার করা হবে।
2. একটি প্রকার আক্ষরিক যেখানে কীগুলি হল ইভেন্টের নাম, এবং মানগুলি হল অ্যারে/টুপল প্রকার যা ইভেন্টের জন্য অতিরিক্ত গৃহীত পরামিতিগুলিকে উপস্থাপন করে। উপরের উদাহরণটি নামযুক্ত tuples ব্যবহার করছে তাই প্রতিটি আর্গুমেন্টের একটি স্পষ্ট নাম থাকতে পারে।

আমরা দেখতে পাচ্ছি, টাইপ ডিক্লারেশন আমাদের নির্গত ইভেন্টের টাইপ সীমাবদ্ধতার উপর অনেক সূক্ষ্ম নিয়ন্ত্রণ দেয়।

`<script setup>` ব্যবহার না করার সময়, `defineComponent()` সেটআপ প্রসঙ্গে প্রকাশিত `emit` ফাংশনের জন্য অনুমোদিত ইভেন্টগুলি অনুমান করতে সক্ষম:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- type check / auto-completion
  }
})
```

## Typing `ref()` {#typing-ref}

Refs প্রাথমিক মান থেকে প্রকার অনুমান করে:

```ts
import { ref } from 'vue'

// inferred type: Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

কখনও কখনও আমাদের একটি রেফের অভ্যন্তরীণ মানের জন্য জটিল প্রকারগুলি নির্দিষ্ট করতে হতে পারে। আমরা `Ref` টাইপ ব্যবহার করে এটি করতে পারি:

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

অথবা, ডিফল্ট অনুমানকে ওভাররাইড করতে `ref()` কল করার সময় একটি জেনেরিক আর্গুমেন্ট পাস করে:

```ts
// resulting type: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

আপনি যদি একটি জেনেরিক টাইপ আর্গুমেন্ট নির্দিষ্ট করেন কিন্তু প্রাথমিক মানটি বাদ দেন, তাহলে ফলাফলের ধরনটি হবে একটি ইউনিয়নের ধরন যাতে `undefined` অন্তর্ভুক্ত থাকে:

```ts
// inferred type: Ref<number | undefined>
const n = ref<number>()
```

## Typing `reactive()` {#typing-reactive}

`reactive()` এছাড়াও এর আর্গুমেন্ট থেকে টাইপটিকে অন্তর্নিহিতভাবে অনুমান করে:

```ts
import { reactive } from 'vue'

// inferred type: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

স্পষ্টভাবে একটি `reactive` বৈশিষ্ট্য টাইপ করতে, আমরা ইন্টারফেস ব্যবহার করতে পারি:

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

:::tip
এটি `reactive()` এর জেনেরিক আর্গুমেন্ট ব্যবহার করার পরামর্শ দেওয়া হয় না কারণ রিটার্ন করা টাইপ, যা নেস্টেড রেফ আনর্যাপিং পরিচালনা করে, জেনেরিক আর্গুমেন্ট টাইপ থেকে আলাদা।
:::

## Typing `computed()` {#typing-computed}

প্রাপ্তির রিটার্ন মানের উপর ভিত্তি করে `computed()` এর ধরন অনুমান করে:

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// inferred type: ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

আপনি একটি জেনেরিক আর্গুমেন্টের মাধ্যমে একটি স্পষ্ট প্রকার নির্দিষ্ট করতে পারেন:

```ts
const double = computed<number>(() => {
  // type error if this doesn't return a number
})
```

## Typing Event Handlers {#typing-event-handlers}

নেটিভ DOM ইভেন্টগুলির সাথে ডিল করার সময়, আমরা হ্যান্ডলারকে সঠিকভাবে যে আর্গুমেন্ট দিয়ে থাকি তা টাইপ করা কার্যকর হতে পারে। আসুন এই উদাহরণটি একবার দেখে নেওয়া যাক:

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` implicitly has `any` type
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

টাইপ টীকা ব্যতীত, `event` আর্গুমেন্টে নিহিতভাবে `any` প্রকার থাকবে। `tsconfig.json`-এ যদি `"strict": true` বা `"noImplicitAny": true` ব্যবহার করা হয় তাহলে এটি একটি TS ত্রুটির কারণ হবে। তাই ইভেন্ট হ্যান্ডলারদের যুক্তি স্পষ্টভাবে টীকা করার সুপারিশ করা হয়। উপরন্তু, `event` এর বৈশিষ্ট্যগুলি অ্যাক্সেস করার সময় আপনাকে টাইপ অ্যাসার্টেশন ব্যবহার করতে হতে পারে:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## Typing Provide / Inject {#typing-provide-inject}

প্রদান এবং ইনজেকশন সাধারণত পৃথক উপাদান সঞ্চালিত হয়. সঠিকভাবে ইনজেকশন করা মান টাইপ করতে, Vue একটি `InjectionKey` ইন্টারফেস প্রদান করে, যা একটি জেনেরিক টাইপ যা `Symbol` প্রসারিত করে। এটি প্রদানকারী এবং ভোক্তার মধ্যে ইনজেকশনের মানটির ধরন সিঙ্ক করতে ব্যবহার করা যেতে পারে:

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // providing non-string value will result in error

const foo = inject(key) // type of foo: string | undefined
```

এটি একটি পৃথক ফাইলে ইনজেকশন কী রাখার সুপারিশ করা হয় যাতে এটি একাধিক উপাদানে আমদানি করা যায়।

স্ট্রিং ইনজেকশন কী ব্যবহার করার সময়, ইনজেকশনের মানটির ধরন হবে `unknown`, এবং একটি জেনেরিক টাইপ আর্গুমেন্টের মাধ্যমে স্পষ্টভাবে ঘোষণা করা প্রয়োজন:

```ts
const foo = inject<string>('foo') // type: string | undefined
```

লক্ষ্য করুন ইনজেকশনের মানটি এখনও `undefined` হতে পারে, কারণ রানটাইমে কোনো প্রদানকারী এই মানটি প্রদান করবে এমন কোনো গ্যারান্টি নেই।

একটি ডিফল্ট মান প্রদান করে `undefined` প্রকারটি সরানো যেতে পারে:

```ts
const foo = inject<string>('foo', 'bar') // type: string
```

আপনি যদি নিশ্চিত হন যে মানটি সর্বদা প্রদান করা হয়, তাহলে আপনি মানটি জোর করে নিক্ষেপ করতে পারেন:

```ts
const foo = inject('foo') as string
```

## Typing Template Refs {#typing-template-refs}

টেমপ্লেট রেফ একটি স্পষ্ট জেনেরিক টাইপ আর্গুমেন্ট এবং `null` এর একটি প্রাথমিক মান দিয়ে তৈরি করা উচিত:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

মনে রাখবেন যে কঠোর ধরনের নিরাপত্তার জন্য, `el.value` অ্যাক্সেস করার সময় ঐচ্ছিক চেইনিং বা টাইপ গার্ড ব্যবহার করা প্রয়োজন। কারণ কম্পোনেন্ট মাউন্ট না হওয়া পর্যন্ত প্রারম্ভিক রেফ মান `null` থাকে এবং যদি রেফারেন্সকৃত উপাদান `v-if` দ্বারা আনমাউন্ট করা হয় তাহলে এটি `null`-তেও সেট করা যেতে পারে।

## Typing Component Template Refs {#typing-component-template-refs}

কখনও কখনও আপনাকে একটি শিশু উপাদানের জন্য একটি টেমপ্লেট রেফ টীকা করতে হতে পারে যাতে এটির সর্বজনীন পদ্ধতি কল করা যায়। উদাহরণ স্বরূপ, আমাদের কাছে একটি `MyModal` চাইল্ড কম্পোনেন্ট আছে একটি পদ্ধতি সহ যেটি মোডাল খোলে:

```vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
```

`MyModal`-এর ইন্সট্যান্স টাইপ পেতে, আমাদের প্রথমে `typeof` এর মাধ্যমে এর টাইপ পেতে হবে, তারপর TypeScript এর অন্তর্নির্মিত `InstanceType` ইউটিলিটি ব্যবহার করে এর ইনস্ট্যান্স টাইপ বের করতে হবে:

```vue{5}
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```

মনে রাখবেন আপনি যদি Vue SFC এর পরিবর্তে TypeScript ফাইলগুলিতে এই কৌশলটি ব্যবহার করতে চান তবে আপনাকে Volar's সক্ষম করতে হবে[Takeover Mode](./overview#volar-takeover-mode).

যে ক্ষেত্রে কম্পোনেন্টের সঠিক ধরন পাওয়া যায় না বা গুরুত্বপূর্ণ নয়, তার পরিবর্তে `ComponentPublicInstance` ব্যবহার করা যেতে পারে। এটি কেবলমাত্র সেই বৈশিষ্ট্যগুলি অন্তর্ভুক্ত করবে যা সমস্ত উপাদান দ্বারা ভাগ করা হয়, যেমন `$el`:

```ts
import { ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const child = ref<ComponentPublicInstance | null>(null)
```
