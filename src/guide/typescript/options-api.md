# TypeScript with Options API {#typescript-with-options-api}

> এই পৃষ্ঠাটি ধরে নেওয়া হয়েছে আপনি ইতিমধ্যেই [TypeScript এর সাথে Vue ব্যবহার করে](./overview) এর ওভারভিউ পড়েছেন।

:::tip
যদিও Vue Options API এর সাথে TypeScript ব্যবহার সমর্থন করে, এটি Composition API এর মাধ্যমে TypeScript-এর সাথে Vue ব্যবহার করার পরামর্শ দেওয়া হয় কারণ এটি সহজ, আরও দক্ষ এবং আরও শক্তিশালী টাইপ ইনফারেন্স প্রদান করে।
:::

## Typing Component Props {#typing-component-props}

অপশন এপিআই-এ প্রপসের জন্য টাইপ ইনফারেন্সের জন্য কম্পোনেন্টকে `defineComponent()` দিয়ে মোড়ানো প্রয়োজন। এটির সাহায্যে, Vue `props` বিকল্পের উপর ভিত্তি করে প্রপগুলির জন্য প্রকারগুলি অনুমান করতে সক্ষম হয়, অতিরিক্ত বিকল্পগুলি যেমন `required: true` এবং `default` হিসাবে বিবেচনা করে:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // type: string | undefined
    this.id // type: number | string | undefined
    this.msg // type: string
    this.metadata // type: any
  }
})
```

যাইহোক, রানটাইম `props` বিকল্পগুলি শুধুমাত্র কনস্ট্রাক্টর ফাংশনগুলিকে প্রপের ধরণ হিসাবে ব্যবহার করে সমর্থন করে - নেস্টেড বৈশিষ্ট্য বা ফাংশন কল স্বাক্ষর সহ বস্তুর মতো জটিল প্রকারগুলি নির্দিষ্ট করার কোনো উপায় নেই৷

জটিল প্রপ ধরনের টীকা করতে, আমরা `PropType` ইউটিলিটি টাইপ ব্যবহার করতে পারি:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      // provide more specific type to `Object`
      type: Object as PropType<Book>,
      required: true
    },
    // can also annotate functions
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // string
    this.book.year // number

    // TS Error: argument of type 'string' is not
    // assignable to parameter of type 'number'
    this.callback?.('123')
  }
})
```

### Caveats {#caveats}

যদি আপনার TypeScript সংস্করণ `4.7` এর কম হয়, তাহলে `validator` এবং `default` প্রপ বিকল্পগুলির জন্য ফাংশন মান ব্যবহার করার সময় আপনাকে সতর্ক থাকতে হবে - arrow functions ব্যবহার করতে ভুলবেন না:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // Make sure to use arrow functions if your TypeScript version is less than 4.7
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

এটি টাইপস্ক্রিপ্টকে এই ফাংশনগুলির মধ্যে `this` ধরনের অনুমান করতে বাধা দেয়, যা দুর্ভাগ্যবশত, টাইপ অনুমান ব্যর্থ হতে পারে। এটি একটি পূর্ববর্তী [ডিজাইন সীমাবদ্ধতা](https://github.com/microsoft/TypeScript/issues/38845), এবং এখন উন্নত করা হয়েছে [TypeScript 4.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#improved-function-inference-in-objects-and-methods).

## Typing Component Emits {#typing-component-emits}

আমরা `emits` বিকল্পের অবজেক্ট সিনট্যাক্স ব্যবহার করে নির্গত ইভেন্টের জন্য প্রত্যাশিত পেলোডের ধরন ঘোষণা করতে পারি। এছাড়াও, সমস্ত অ-ঘোষিত নির্গত ইভেন্টগুলি কল করার সময় একটি টাইপ ত্রুটি নিক্ষেপ করবে:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // perform runtime validation
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // Type error!
      })

      this.$emit('non-declared-event') // Type error!
    }
  }
})
```

## Typing Computed Properties {#typing-computed-properties}

একটি গণনাকৃত সম্পত্তি তার রিটার্ন মানের উপর ভিত্তি করে তার ধরন অনুমান করে:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // type: string
  }
})
```

কিছু ক্ষেত্রে, আপনি একটি গণনা করা সম্পত্তির ধরনটি স্পষ্টভাবে ব্যাখ্যা করতে চাইতে পারেন যাতে এটির বাস্তবায়ন সঠিক হয়:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // explicitly annotate return type
    greeting(): string {
      return this.message + '!'
    },

    // annotating a writable computed property
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

কিছু প্রান্তের ক্ষেত্রেও স্পষ্ট টীকাগুলির প্রয়োজন হতে পারে যেখানে বৃত্তাকার অনুমান লুপের কারণে টাইপস্ক্রিপ্ট একটি গণনাকৃত সম্পত্তির ধরণ অনুমান করতে ব্যর্থ হয়।

## Typing Event Handlers {#typing-event-handlers}

নেটিভ DOM ইভেন্টগুলির সাথে ডিল করার সময়, আমরা হ্যান্ডলারকে সঠিকভাবে যে আর্গুমেন্ট দিয়ে থাকি তা টাইপ করা কার্যকর হতে পারে। আসুন এই উদাহরণটি একবার দেখে নেওয়া যাক:

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // `event` implicitly has `any` type
      console.log(event.target.value)
    }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

টাইপ টীকা ব্যতীত, `event` আর্গুমেন্টে নিহিতভাবে `any` প্রকার থাকবে। `tsconfig.json`-এ যদি `"strict": true` বা `"noImplicitAny": true` ব্যবহার করা হয় তাহলে এটি একটি TS ত্রুটির কারণ হবে। তাই ইভেন্ট হ্যান্ডলারদের যুক্তি স্পষ্টভাবে টীকা করার সুপারিশ করা হয়। উপরন্তু, `event` এর বৈশিষ্ট্যগুলি অ্যাক্সেস করার সময় আপনাকে টাইপ অ্যাসার্টেশন ব্যবহার করতে হতে পারে:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event: Event) {
      console.log((event.target as HTMLInputElement).value)
    }
  }
})
```

## Augmenting Global Properties {#augmenting-global-properties}

কিছু প্লাগইন [`app.config.globalProperties`](/api/application#app-config-globalproperties) এর মাধ্যমে সমস্ত উপাদান উদাহরণে বিশ্বব্যাপী উপলব্ধ বৈশিষ্ট্যগুলি ইনস্টল করে। উদাহরণস্বরূপ, আমরা ডেটা-ফেচিংয়ের জন্য `this.$http` বা আন্তর্জাতিকীকরণের জন্য `this.$translate` ইনস্টল করতে পারি। TypeScript-এর সাথে এই নাটকটিকে ভালভাবে তৈরি করতে, Vue একটি `কম্পোনেন্ট কাস্টম প্রোপার্টিজ` ইন্টারফেস প্রকাশ করে যা [TypeScript মডিউল অগমেন্টেশন](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) এর মাধ্যমে পরিবর্ধন করার জন্য ডিজাইন করা হয়েছে :

```ts
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

আরো দেখুন:

- [কম্পোনেন্ট টাইপ এক্সটেনশনের জন্য TypeScript ইউনিট পরীক্ষা করে](https://github.com/vuejs/core/blob/main/packages/dts-test/componentTypeExtensions.test-d.tsx)

### Type Augmentation Placement {#type-augmentation-placement}

আমরা এই ধরনের পরিবর্ধন একটি `.ts` ফাইলে বা প্রজেক্ট-ব্যাপী `*.d.ts` ফাইলে রাখতে পারি। যেভাবেই হোক, নিশ্চিত করুন যে এটি `tsconfig.json`-এ অন্তর্ভুক্ত রয়েছে। লাইব্রেরি/প্লাগইন লেখকদের জন্য, এই ফাইলটি `package.json`-এ `types` প্রপার্টিতে উল্লেখ করা উচিত।

মডিউল অগমেন্টেশনের সুবিধা নেওয়ার জন্য, আপনাকে নিশ্চিত করতে হবে যে অগমেন্টেশনটি একটি [TypeScript মডিউল](https://www.typescriptlang.org/docs/handbook/modules.html) এ স্থাপন করা হয়েছে। অর্থাৎ, ফাইলটিতে অন্তত একটি শীর্ষ-স্তরের `import` বা `export` থাকতে হবে, এমনকি যদি তা কেবল `export {}`ই হয়। যদি পরিবর্ধন একটি মডিউলের বাইরে স্থাপন করা হয়, তবে এটি মূল প্রকারগুলিকে বৃদ্ধি করার পরিবর্তে ওভাররাইট করবে!

```ts
// Does not work, overwrites the original types.
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

```ts
// Works correctly
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

## Augmenting Custom Options {#augmenting-custom-options}

কিছু প্লাগইন, উদাহরণস্বরূপ `vue-router`, কাস্টম উপাদান বিকল্পগুলির জন্য সমর্থন প্রদান করে যেমন `beforeRouteEnter`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // ...
  }
})
```

সঠিক টাইপ অগমেন্টেশন ছাড়া, এই হুকের আর্গুমেন্টের অন্তর্নিহিতভাবে `any` প্রকার থাকবে। আমরা এই কাস্টম বিকল্পগুলিকে সমর্থন করার জন্য `ComponentCustomOptions` ইন্টারফেসকে বাড়িয়ে তুলতে পারি:

```ts
import { Route } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomOptions {
    beforeRouteEnter?(to: Route, from: Route, next: () => void): void
  }
}
```

এখন `beforeRouteEnter` অপশনটি সঠিকভাবে টাইপ করা হবে। মনে রাখবেন এটি শুধুমাত্র একটি উদাহরণ - ভাল-টাইপ করা লাইব্রেরি যেমন `vue-router` স্বয়ংক্রিয়ভাবে তাদের নিজস্ব টাইপ সংজ্ঞায় এই বৃদ্ধিগুলি সম্পাদন করা উচিত।

এই পরিবর্ধনের স্থান নির্ধারণ [একই বিধিনিষেধ](#type-augmentation-placement) বৈশ্বিক সম্পত্তি বৃদ্ধির বিষয়।

আরো দেখুন:

- [কম্পোনেন্ট টাইপ এক্সটেনশনের জন্য TypeScript ইউনিট পরীক্ষা করে](https://github.com/vuejs/core/blob/main/packages/dts-test/componentTypeExtensions.test-d.tsx)
