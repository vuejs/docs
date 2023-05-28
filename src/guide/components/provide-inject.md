# Provide / Inject {#provide-inject}

> এই পৃষ্ঠাটি ধরে নেওয়া হচ্ছে আপনি ইতিমধ্যেই [Components Basics](/guide/essentials/component-basics) পড়েছেন। আপনি যদি উপাদানগুলিতে নতুন হন তবে প্রথমে এটি পড়ুন।

## Prop Drilling {#prop-drilling}

সাধারণত, যখন আমাদের পিতামাতার কাছ থেকে একটি শিশু উপাদানে ডেটা পাঠানোর প্রয়োজন হয়, আমরা [props](/guide/components/props) ব্যবহার করি। যাইহোক, সেই ক্ষেত্রে কল্পনা করুন যেখানে আমাদের একটি বড় উপাদান গাছ রয়েছে এবং একটি গভীরভাবে নেস্টেড উপাদানটির জন্য একটি দূরবর্তী পূর্বপুরুষ উপাদান থেকে কিছু প্রয়োজন। শুধুমাত্র প্রপস সহ, আমাদের পুরো প্যারেন্ট চেইন জুড়ে একই প্রপ পাস করতে হবে:

![prop drilling diagram](./images/prop-drilling.png)

<!-- https://www.figma.com/file/yNDTtReM2xVgjcGVRzChss/prop-drilling -->

লক্ষ্য করুন যদিও `<Footer>` কম্পোনেন্টটি এই প্রপসগুলিকে মোটেও গুরুত্ব নাও দিতে পারে, তবুও এটিকে ঘোষণা করতে হবে এবং পাস করতে হবে যাতে `<DeepChild>` সেগুলি অ্যাক্সেস করতে পারে। যদি একটি দীর্ঘ অভিভাবক শৃঙ্খল থাকে, তবে আরও উপাদানগুলি পথে প্রভাবিত হবে। এটিকে "প্রপস ড্রিলিং" বলা হয় এবং এটি মোকাবেলা করা অবশ্যই মজাদার নয়।

আমরা `provide` এবং `inject` দিয়ে প্রপস ড্রিলিং সমাধান করতে পারি। একটি অভিভাবক উপাদান তার সমস্ত বংশধরদের জন্য **নির্ভরতা প্রদানকারী** হিসেবে কাজ করতে পারে। বংশধর গাছের যেকোনো উপাদান, তা যতই গভীর হোক না কেন, **inject** করতে পারে তার মূল শৃঙ্খলে থাকা উপাদানগুলির দ্বারা প্রদত্ত নির্ভরতা।

![Provide/inject scheme](./images/provide-inject.png)

<!-- https://www.figma.com/file/PbTJ9oXis5KUawEOWdy2cE/provide-inject -->

## Provide {#provide}

<div class="composition-api">

একটি উপাদানের বংশধরদের ডেটা প্রদান করতে, [`provide()`](/api/composition-api-dependency-injection#provide) ফাংশনটি ব্যবহার করুন:

```vue
<script setup>
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>
```

`<script setup>` ব্যবহার না করলে, নিশ্চিত করুন যে `setup()` এর ভিতরে সিঙ্ক্রোনাসভাবে `provide()` বলা হয়েছে:

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* key */ 'message', /* value */ 'hello!')
  }
}
```

`provide()` ফাংশন দুটি আর্গুমেন্ট গ্রহণ করে। প্রথম যুক্তিটিকে **injection key** বলা হয়, যা একটি স্ট্রিং বা একটি `Symbol` হতে পারে। ইনজেকশন কীটি ইনজেকশনের জন্য পছন্দসই মান খুঁজতে বংশধর উপাদান দ্বারা ব্যবহৃত হয়। একটি একক উপাদান বিভিন্ন মান প্রদানের জন্য বিভিন্ন ইনজেকশন কী সহ একাধিকবার `provide()` কল করতে পারে।

দ্বিতীয় যুক্তি হল প্রদত্ত মান। মান যেকোন প্রকারের হতে পারে, যার মধ্যে প্রতিক্রিয়াশীল অবস্থা যেমন refs:

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

প্রতিক্রিয়াশীল মান প্রদানের মাধ্যমে সরবরাহকারী উপাদানের সাথে একটি প্রতিক্রিয়াশীল সংযোগ স্থাপন করার জন্য প্রদত্ত মান ব্যবহার করে বংশধর উপাদানগুলিকে অনুমতি দেয়।

</div>

<div class="options-api">

একটি উপাদানের বংশধরদের ডেটা প্রদান করতে, [`provide`](/api/options-composition#provide) বিকল্পটি ব্যবহার করুন:

```js
export default {
  provide: {
    message: 'hello!'
  }
}
```

`provide` অবজেক্টের প্রতিটি প্রপার্টির জন্য, কীটি চাইল্ড কম্পোনেন্ট দ্বারা ইনজেকশনের সঠিক মানটি সনাক্ত করতে ব্যবহার করা হয়, যখন মানটি ইনজেকশনের মাধ্যমে শেষ হয়।

যদি আমাদের প্রতি-দৃষ্টান্তের অবস্থা প্রদান করতে হয়, উদাহরণস্বরূপ `data()` এর মাধ্যমে ঘোষিত ডেটা, তাহলে `provide` একটি ফাংশন মান ব্যবহার করতে হবে:

```js{7-12}
export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    // use function syntax so that we can access `this`
    return {
      message: this.message
    }
  }
}
```

যাইহোক, মনে রাখবেন যে এটি ইনজেকশনকে ক্রিয়াশীল করে তোলে **না**। আমরা নীচে [making injections reactive](#working-with-reactivity) নিয়ে আলোচনা করব।

</div>

## App-level Provide {#app-level-provide}

একটি উপাদানে ডেটা প্রদানের পাশাপাশি, আমরা অ্যাপ স্তরেও প্রদান করতে পারি:

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')
```

অ্যাপ-স্তরের প্রদানগুলি অ্যাপে রেন্ডার করা সমস্ত উপাদানের জন্য উপলব্ধ। [plugins](/guide/reusability/plugins) লেখার সময় এটি বিশেষভাবে উপযোগী, কারণ প্লাগইনগুলি সাধারণত উপাদান ব্যবহার করে মান প্রদান করতে সক্ষম হয় না।

## Inject {#inject}

<div class="composition-api">

একটি ancestor component দ্বারা প্রদত্ত ডেটা ইনজেক্ট করতে, [`ইনজেক্ট()`](/api/composition-api-dependency-injection#inject) ফাংশনটি ব্যবহার করুন:

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

যদি প্রদত্ত মানটি একটি রেফ হয়, তাহলে এটি যেমন আছে-সেভাবেই ইনজেকশন করা হবে এবং **না** স্বয়ংক্রিয়ভাবে খুলে যাবে। এটি ইনজেক্টর উপাদানটিকে প্রদানকারী উপাদানের সাথে প্রতিক্রিয়াশীলতা সংযোগ বজায় রাখতে দেয়।

[Full provide + inject Example with Reactivity](https://play.vuejs.org/#eNqFUUFugzAQ/MrKF1IpxfeIVKp66Kk/8MWFDXYFtmUbpArx967BhURRU9/WOzO7MzuxV+fKcUB2YlWovXYRAsbBvQije2d9hAk8Xo7gvB11gzDDxdseCuIUG+ZN6a7JjZIvVRIlgDCcw+d3pmvTglz1okJ499I0C3qB1dJQT9YRooVaSdNiACWdQ5OICj2WwtTWhAg9hiBbhHNSOxQKu84WT8LkNQ9FBhTHXyg1K75aJHNUROxdJyNSBVBp44YI43NvG+zOgmWWYGt7dcipqPhGZEe2ef07wN3lltD+lWN6tNkV/37+rdKjK2rzhRTt7f3u41xhe37/xJZGAL2PLECXa9NKdD/a6QTTtGnP88LgiXJtYv4BaLHhvg==)

আবার, `<script setup>` ব্যবহার না করলে, `inject()` কে শুধুমাত্র `setup()`-এর ভিতরে সিঙ্ক্রোনাসভাবে বলা উচিত:

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

</div>

<div class="options-api">

ancestor component দ্বারা প্রদত্ত ডেটা ইনজেক্ট করতে, [`ইনজেক্ট`](/api/options-composition#inject) বিকল্পটি ব্যবহার করুন:

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // injected value
  }
}
```

ইনজেকশনগুলি উপাদানের নিজস্ব অবস্থার **before** সমাধান করা হয়, যাতে আপনি `data()`-এ ইনজেকশনের বৈশিষ্ট্যগুলি অ্যাক্সেস করতে পারেন:

```js
export default {
  inject: ['message'],
  data() {
    return {
      // initial data based on injected value
      fullMessage: this.message
    }
  }
}
```

[Full provide + inject example](https://play.vuejs.org/#eNqNkcFqwzAQRH9l0EUthOhuRKH00FO/oO7B2JtERZaEvA4F43+vZCdOTAIJCImRdpi32kG8h7A99iQKobs6msBvpTNt8JHxcTC2wS76FnKrJpVLZelKR39TSUO7qreMoXRA7ZPPkeOuwHByj5v8EqI/moZeXudCIBL30Z0V0FLXVXsqIA9krU8R+XbMR9rS0mqhS4KpDbZiSgrQc5JKQqvlRWzEQnyvuc9YuWbd4eXq+TZn0IvzOeKr8FvsNcaK/R6Ocb9Uc4FvefpE+fMwP0wH8DU7wB77nIo6x6a2hvNEME5D0CpbrjnHf+8excI=)

### Injection Aliasing \* {#injection-aliasing}

`inject`-এর জন্য অ্যারে সিনট্যাক্স ব্যবহার করার সময়, একই কী ব্যবহার করে কম্পোনেন্ট ইনস্ট্যান্সে ইনজেকশনের বৈশিষ্ট্যগুলি প্রকাশ করা হয়। উপরের উদাহরণে, প্রপার্টিটি `"message"`-এর অধীনে প্রদান করা হয়েছে এবং `this.message` হিসেবে ইনজেকশন করা হয়েছে। স্থানীয় কী ইনজেকশন কী হিসাবে একই।

যদি আমরা একটি ভিন্ন স্থানীয় কী ব্যবহার করে সম্পত্তি ইনজেকশন করতে চাই, তাহলে আমাদের `inject` বিকল্পের জন্য অবজেক্ট সিনট্যাক্স ব্যবহার করতে হবে:

```js
export default {
  inject: {
    /* local key */ localMessage: {
      from: /* injection key */ 'message'
    }
  }
}
```

এখানে, উপাদানটি `"message"` কী সহ প্রদত্ত একটি সম্পত্তি সনাক্ত করবে এবং তারপরে এটিকে `this.localMessage` হিসাবে প্রকাশ করবে।

</div>

### Injection Default Values {#injection-default-values}

ডিফল্টরূপে, `inject` অনুমান করে যে ইনজেকশন করা কীটি প্যারেন্ট চেইনের কোথাও সরবরাহ করা হয়েছে। যে ক্ষেত্রে কী প্রদান করা হয়নি, সেখানে একটি রানটাইম সতর্কতা থাকবে।

যদি আমরা ঐচ্ছিক প্রদানকারীদের সাথে একটি ইনজেকশনযুক্ত সম্পত্তি কাজ করতে চাই, তাহলে আমাদের প্রপসের মতো একটি ডিফল্ট মান ঘোষণা করতে হবে:

<div class="composition-api">

```js
// `value` will be "default value"
// if no data matching "message" was provided
const value = inject('message', 'default value')
```

কিছু ক্ষেত্রে, একটি ফাংশন কল করে বা একটি নতুন ক্লাস ইনস্ট্যান্টিয়েট করে ডিফল্ট মান তৈরি করতে হতে পারে। ঐচ্ছিক মান ব্যবহার না করা হলে অপ্রয়োজনীয় গণনা বা পার্শ্ব প্রতিক্রিয়া এড়াতে, আমরা ডিফল্ট মান তৈরি করার জন্য একটি কারখানা ফাংশন ব্যবহার করতে পারি:

```js
const value = inject('key', () => new ExpensiveClass())
```

</div>

<div class="options-api">

```js
export default {
  // object syntax is required
  // when declaring default values for injections
  inject: {
    message: {
      from: 'message', // this is optional if using the same key for injection
      default: 'default value'
    },
    user: {
      // use a factory function for non-primitive values that are expensive
      // to create, or ones that should be unique per component instance.
      default: () => ({ name: 'John' })
    }
  }
}
```

</div>

## Working with Reactivity {#working-with-reactivity}

<div class="composition-api">

প্রতিক্রিয়াশীল প্রদান / ইনজেকশন মান ব্যবহার করার সময়, **যখনই সম্ভব** যেকোন মিউটেশনকে _provider_ এর ভিতরে প্রতিক্রিয়াশীল অবস্থায় রাখার পরামর্শ দেওয়া হয়। এটি নিশ্চিত করে যে প্রদত্ত অবস্থা এবং এর সম্ভাব্য মিউটেশনগুলি একই উপাদানে সহ-অবস্থিত রয়েছে, যা ভবিষ্যতে বজায় রাখা সহজ করে তোলে।

এমন সময় হতে পারে যখন আমাদের একটি ইনজেক্টর উপাদান থেকে ডেটা আপডেট করতে হবে। এই ধরনের ক্ষেত্রে, আমরা এমন একটি ফাংশন প্রদান করার পরামর্শ দিই যা রাষ্ট্রকে পরিবর্তন করার জন্য দায়ী:

```vue{7-9,13}
<!-- inside provider component -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue{5}
<!-- in injector component -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

পরিশেষে, আপনি প্রদত্ত মানটিকে [`readonly()`](/api/reactivity-core#readonly) দিয়ে মুড়ে দিতে পারেন যদি আপনি নিশ্চিত করতে চান যে `provide`-এর মাধ্যমে পাস করা ডেটা ইনজেক্টর উপাদান দ্বারা পরিবর্তিত হতে পারে না।

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

</div>

<div class="options-api">

ইনজেকশনগুলিকে সরবরাহকারীর সাথে প্রতিক্রিয়াশীলভাবে সংযুক্ত করার জন্য, আমাদের [computed()](/api/reactivity-core#computed) ফাংশন ব্যবহার করে একটি গণনা করা সম্পত্তি প্রদান করতে হবে:

```js{10}
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    return {
      // explicitly provide a computed property
      message: computed(() => this.message)
    }
  }
}
```

[Full provide + inject Example with Reactivity](https://play.vuejs.org/#eNqNUctqwzAQ/JVFFyeQxnfjBEoPPfULqh6EtYlV9EKWTcH43ytZtmPTQA0CsdqZ2dlRT16tPXctkoKUTeWE9VeqhbLGeXirheRwc0ZBds7HKkKzBdBDZZRtPXIYJlzqU40/I4LjjbUyIKmGEWw0at8UgZrUh1PscObZ4ZhQAA596/RcAShsGnbHArIapTRBP74O8Up060wnOO5QmP0eAvZyBV+L5jw1j2tZqsMp8yWRUHhUVjKPoQIohQ460L0ow1FeKJlEKEnttFweijJfiORElhCf5f3umObb0B9PU/I7kk17PJj7FloN/2t7a2Pj/Zkdob+x8gV8ZlMs2de/8+14AXwkBngD9zgVqjg2rNXPvwjD+EdlHilrn8MvtvD1+Q==)

`computed()` ফাংশনটি সাধারণত কম্পোজিশন API উপাদানগুলিতে ব্যবহৃত হয়, তবে বিকল্প API-এ নির্দিষ্ট ব্যবহারের ক্ষেত্রে পরিপূরক করতেও ব্যবহার করা যেতে পারে। আপনি কম্পোজিশন এপিআই-এ সেট করা API পছন্দের সাথে [Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals) এবং [Computed Properties](/guide/essentials/computed) পড়ে এর ব্যবহার সম্পর্কে আরও জানতে পারেন।

:::warning অস্থায়ী কনফিগার প্রয়োজন
উপরোক্ত ব্যবহারের জন্য `app.config.unwrapInjectedRef = true` সেট করা প্রয়োজন যাতে ইনজেকশনগুলি স্বয়ংক্রিয়ভাবে গণনা করা রেফগুলিকে আনর্যাপ করা যায়৷ এটি Vue 3.3-এ ডিফল্ট আচরণে পরিণত হবে এবং ভাঙা এড়াতে এই কনফিগারেশন সাময়িকভাবে চালু করা হয়েছে। এটি 3.3 এর পরে আর প্রয়োজন হবে না।
:::

</div>

## Working with Symbol Keys {#working-with-symbol-keys}

এখন পর্যন্ত, আমরা উদাহরণগুলিতে স্ট্রিং ইনজেকশন কী ব্যবহার করে আসছি। আপনি যদি অনেক নির্ভরতা প্রদানকারীর সাথে একটি বড় অ্যাপ্লিকেশনে কাজ করেন, বা আপনি অন্যান্য বিকাশকারীদের দ্বারা ব্যবহৃত উপাদানগুলি রচনা করছেন, তাহলে সম্ভাব্য সংঘর্ষ এড়াতে সিম্বল ইনজেকশন কীগুলি ব্যবহার করা ভাল।

একটি ডেডিকেটেড ফাইলে প্রতীকগুলি রপ্তানি করার পরামর্শ দেওয়া হচ্ছে:

```js
// keys.js
export const myInjectionKey = Symbol()
```

<div class="composition-api">

```js
// in provider component
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* data to provide */
})
```

```js
// in injector component
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

আরো দেখুন: [Typing Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

</div>

<div class="options-api">

```js
// in provider component
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* data to provide */
      }
    }
  }
}
```

```js
// in injector component
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```

</div>
