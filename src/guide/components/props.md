# Props {#props}

> এই পৃষ্ঠাটি ধরে নেওয়া হচ্ছে আপনি ইতিমধ্যেই [Components Basics](/guide/essentials/component-basics) পড়েছেন। আপনি যদি উপাদানগুলিতে নতুন হন তবে প্রথমে এটি পড়ুন।

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="বিনামূল্যে Vue.js Props পাঠ"/>
</div>

## Props Declaration {#props-declaration}

Vue উপাদানগুলির সুস্পষ্ট প্রপস ঘোষণার প্রয়োজন যাতে Vue জানে যে কোন বাহ্যিক প্রপগুলি কম্পোনেন্টে পাস করা হয়েছে তাকে ফলথ্রু বৈশিষ্ট্য হিসাবে গণ্য করা উচিত (যা [এই বিভাগে](/guide/components/attrs)) এ আলোচনা করা হবে৷

<div class="composition-api">

`<script setup>` ব্যবহার করে এসএফসি-তে, প্রপগুলিকে `defineProps()` ম্যাক্রো ব্যবহার করে ঘোষণা করা যেতে পারে:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

অ-`<script setup>` উপাদানগুলিতে, প্রপগুলি [`props`](/api/options-state#props) বিকল্প ব্যবহার করে ঘোষণা করা হয়:

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.foo)
  }
}
```

লক্ষ্য করুন `defineProps()`-এ পাস করা আর্গুমেন্ট `props` অপশনে প্রদত্ত মানের সমান: একই প্রপস অপশন API দুটি ঘোষণা শৈলীর মধ্যে ভাগ করা হয়েছে।

</div>

<div class="options-api">

প্রপগুলি [`props`](/api/options-state#props) বিকল্প ব্যবহার করে ঘোষণা করা হয়:

```js
export default {
  props: ['foo'],
  created() {
    // props are exposed on `this`
    console.log(this.foo)
  }
}
```

</div>

স্ট্রিংগুলির একটি অ্যারে ব্যবহার করে প্রপস ঘোষণা করার পাশাপাশি, আমরা অবজেক্ট সিনট্যাক্সও ব্যবহার করতে পারি:

<div class="options-api">

```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>
<div class="composition-api">

```js
// in <script setup>
defineProps({
  title: String,
  likes: Number
})
```

```js
// in non-<script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>

অবজেক্ট ডিক্লারেশন সিনট্যাক্সের প্রতিটি প্রপার্টির জন্য, কী হল প্রপের নাম, যখন মানটি প্রত্যাশিত ধরনের কনস্ট্রাক্টর ফাংশন হওয়া উচিত।

এটি শুধুমাত্র আপনার কম্পোনেন্ট নথিভুক্ত করে না, তবে অন্য ডেভেলপারদেরও সতর্ক করবে ব্রাউজার কনসোলে আপনার কম্পোনেন্ট ব্যবহার করে যদি তারা ভুল টাইপ পাস করে। আমরা এই পৃষ্ঠার আরও নিচে [prop validation](#prop-validation) সম্পর্কে আরও বিস্তারিত আলোচনা করব।

<div class="options-api">

আরো দেখুন: [Typing Component Props](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

আপনি যদি `<script setup>` এর সাথে TypeScript ব্যবহার করেন, তাহলে বিশুদ্ধ টাইপ টীকা ব্যবহার করে প্রপস ঘোষণা করাও সম্ভব:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

আরো বিস্তারিত: [Typing Component Props](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

</div>

## Prop Passing Details {#prop-passing-details}

### Prop Name Casing {#prop-name-casing}

আমরা camelCase ব্যবহার করে দীর্ঘ প্রপ নাম ঘোষণা করি কারণ এটি প্রপার্টি কী হিসাবে ব্যবহার করার সময় উদ্ধৃতিগুলি ব্যবহার করা এড়িয়ে যায় এবং আমাদেরকে সরাসরি টেমপ্লেট এক্সপ্রেশনে তাদের উল্লেখ করার অনুমতি দেয় কারণ তারা বৈধ জাভাস্ক্রিপ্ট শনাক্তকারী:

<div class="composition-api">

```js
defineProps({
  greetingMessage: String
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    greetingMessage: String
  }
}
```

</div>

```vue-html
<span>{{ greetingMessage }}</span>
```

টেকনিক্যালি, আপনি চাইল্ড কম্পোনেন্টে প্রপস দেওয়ার সময় ক্যামেলকেস ব্যবহার করতে পারেন ([DOM টেমপ্লেট](/guide/essentials/component-basics#dom-template-parsing-caveats) ছাড়া)। যাইহোক, কনভেনশন এইচটিএমএল বৈশিষ্ট্যের সাথে সারিবদ্ধ করার জন্য সব ক্ষেত্রে কাবাব-কেস ব্যবহার করছে:

```vue-html
<MyComponent greeting-message="hello" />
```

আমরা যখনই সম্ভব [কম্পোনেন্ট ট্যাগের জন্য PascalCase](/guide/components/registration#component-name-casing) ব্যবহার করি কারণ এটি Vue উপাদানগুলিকে নেটিভ উপাদান থেকে আলাদা করে টেমপ্লেট পাঠযোগ্যতা উন্নত করে। যাইহোক, প্রপস পাস করার সময় ক্যামেলকেস ব্যবহার করার মতো ব্যবহারিক সুবিধা নেই, তাই আমরা প্রতিটি ভাষার নিয়ম অনুসরণ করা বেছে নিই।

### Static vs. Dynamic Props {#static-vs-dynamic-props}

এখনও অবধি, আপনি প্রপগুলিকে স্ট্যাটিক মান হিসাবে পাস করতে দেখেছেন, যেমন:

```vue-html
<BlogPost title="My journey with Vue" />
```

আপনি `v-bind` বা এর `:` শর্টকাটের সাথে গতিশীলভাবে বরাদ্দ করা প্রপসও দেখেছেন, যেমন:

```vue-html
<!-- Dynamically assign the value of a variable -->
<BlogPost :title="post.title" />

<!-- Dynamically assign the value of a complex expression -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### Passing Different Value Types {#passing-different-value-types}

উপরের দুটি উদাহরণে, আমরা স্ট্রিং মান পাস করি, কিন্তু _যেকোনো_ ধরনের মান একটি প্রপে পাস করা যেতে পারে।

#### Number {#number}

```vue-html
<!-- Even though `42` is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.       -->
<BlogPost :likes="42" />

<!-- Dynamically assign to the value of a variable. -->
<BlogPost :likes="post.likes" />
```

#### Boolean {#boolean}

```vue-html
<!-- Including the prop with no value will imply `true`. -->
<BlogPost is-published />

<!-- Even though `false` is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.          -->
<BlogPost :is-published="false" />

<!-- Dynamically assign to the value of a variable. -->
<BlogPost :is-published="post.isPublished" />
```

#### Array {#array}

```vue-html
<!-- Even though the array is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.            -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- Dynamically assign to the value of a variable. -->
<BlogPost :comment-ids="post.commentIds" />
```

#### Object {#object}

```vue-html
<!-- Even though the object is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.             -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- Dynamically assign to the value of a variable. -->
<BlogPost :author="post.author" />
```

### Binding Multiple Properties Using an Object {#binding-multiple-properties-using-an-object}

আপনি যদি একটি বস্তুর সমস্ত বৈশিষ্ট্যকে প্রপ হিসাবে পাস করতে চান তবে আপনি যুক্তি ছাড়াই [`v-bind` ব্যবহার করতে পারেন](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) (`v-bind `` এর পরিবর্তে `:প্রপ-নাম`)। উদাহরণস্বরূপ, একটি 'পোস্ট' অবজেক্ট দেওয়া হয়েছে:

<div class="options-api">

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
```

</div>

নিম্নলিখিত টেমপ্লেট:

```vue-html
<BlogPost v-bind="post" />
```

এর সমতুল্য হবে:

```vue-html
<BlogPost :id="post.id" :title="post.title" />
```

## One-Way Data Flow {#one-way-data-flow}

সমস্ত প্রপস শিশু সম্পত্তি এবং পিতামাতার মধ্যে একটি **ওয়ান-ওয়ে-ডাউন বাইন্ডিং** গঠন করে: যখন পিতামাতার সম্পত্তি আপডেট হয়, তখন এটি সন্তানের কাছে প্রবাহিত হবে, তবে অন্যভাবে নয়। এটি শিশুর উপাদানগুলিকে দুর্ঘটনাক্রমে পিতামাতার অবস্থা পরিবর্তন করতে বাধা দেয়, যা আপনার অ্যাপের ডেটা প্রবাহকে বোঝা কঠিন করে তুলতে পারে।

উপরন্তু, প্রতিবার অভিভাবক উপাদান আপডেট করা হয়, চাইল্ড কম্পোনেন্টের সমস্ত প্রপস সর্বশেষ মান সহ রিফ্রেশ করা হবে। এর মানে হল আপনার চাইল্ড কম্পোনেন্টের ভিতরে প্রপ মিউটেট করার চেষ্টা **না** করা উচিত। আপনি যদি তা করেন, Vue আপনাকে কনসোলে সতর্ক করবে:

<div class="composition-api">

```js
const props = defineProps(['foo'])

// ❌ warning, props are readonly!
props.foo = 'bar'
```

</div>
<div class="options-api">

```js
export default {
  props: ['foo'],
  created() {
    // ❌ warning, props are readonly!
    this.foo = 'bar'
  }
}
```

</div>

সাধারণত দুটি ক্ষেত্রে এটি একটি প্রপ পরিবর্তন করতে প্রলুব্ধ করে:

1. **প্রপটি একটি প্রাথমিক মান পাস করতে ব্যবহৃত হয়; চাইল্ড কম্পোনেন্ট এটিকে পরবর্তীতে একটি স্থানীয় ডেটা সম্পত্তি হিসাবে ব্যবহার করতে চায়।** এই ক্ষেত্রে, একটি স্থানীয় ডেটা সম্পত্তি সংজ্ঞায়িত করা ভাল যা প্রারম্ভিক মান হিসাবে প্রপ ব্যবহার করে:

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // counter only uses props.initialCounter as the initial value;
   // it is disconnected from future prop updates.
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
         // counter only uses this.initialCounter as the initial value;
         // it is disconnected from future prop updates.
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **প্রপটি একটি কাঁচা মান হিসাবে পাস করা হয়েছে যা রূপান্তরিত করা দরকার।** এই ক্ষেত্রে, প্রপের মান ব্যবহার করে একটি গণনা করা সম্পত্তি সংজ্ঞায়িত করা ভাল:

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   // computed property that auto-updates when the prop changes
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       // computed property that auto-updates when the prop changes
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### Mutating Object / Array Props {#mutating-object-array-props}

যখন বস্তু এবং অ্যারেগুলিকে প্রপ হিসাবে পাস করা হয়, যখন চাইল্ড কম্পোনেন্ট প্রপ বাইন্ডিংকে পরিবর্তন করতে পারে না, তখন এটি বস্তু বা অ্যারের নেস্টেড বৈশিষ্ট্যগুলিকে পরিবর্তিত করতে সক্ষম **হবে**। এর কারণ হল জাভাস্ক্রিপ্টে অবজেক্ট এবং অ্যারে রেফারেন্স দ্বারা পাস করা হয় এবং এই ধরনের মিউটেশন প্রতিরোধ করা Vue-এর জন্য অযৌক্তিকভাবে ব্যয়বহুল।

এই ধরনের মিউটেশনগুলির প্রধান ত্রুটি হল যে এটি শিশু উপাদানটিকে এমনভাবে পিতামাতার অবস্থাকে প্রভাবিত করতে দেয় যা পিতামাতার উপাদানের কাছে স্পষ্ট নয়, সম্ভাব্যভাবে ভবিষ্যতে ডেটা প্রবাহ সম্পর্কে যুক্তি করা আরও কঠিন করে তোলে। একটি সর্বোত্তম অভ্যাস হিসাবে, আপনার এই ধরনের মিউটেশন এড়ানো উচিত যদি না পিতামাতা এবং সন্তানের নকশা দ্বারা শক্তভাবে মিলিত হয়। বেশিরভাগ ক্ষেত্রে, সন্তানের উচিত [একটি ইভেন্ট নির্গত করা](/guide/components/events) যাতে পিতামাতাকে মিউটেশন করতে দেয়।

## Prop Validation {#prop-validation}

উপাদানগুলি তাদের প্রপসের জন্য প্রয়োজনীয়তা নির্দিষ্ট করতে পারে, যেমন আপনি ইতিমধ্যে দেখেছেন প্রকারগুলি। কোনো প্রয়োজন পূরণ না হলে, Vue আপনাকে ব্রাউজারের JavaScript কনসোলে সতর্ক করবে। অন্যদের দ্বারা ব্যবহার করার উদ্দেশ্যে এমন একটি উপাদান তৈরি করার সময় এটি বিশেষভাবে কার্যকর।

প্রপ যাচাইকরণ নির্দিষ্ট করতে, আপনি <span class="composition-api">`defineProps()` macro</span><span class="options-api">`props` বিকল্পতে বৈধকরণের প্রয়োজনীয়তা সহ একটি বস্তু প্রদান করতে পারেন </span>, স্ট্রিংগুলির একটি অ্যারের পরিবর্তে। উদাহরণ স্বরূপ:

<div class="composition-api">

```js
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,
  // Multiple possible types
  propB: [String, Number],
  // Required string
  propC: {
    type: String,
    required: true
  },
  // Number with a default value
  propD: {
    type: Number,
    default: 100
  },
  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory 
    // function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  }
})
```

:::tip
`defineProps()` আর্গুমেন্টের ভিতরের কোড **`<script setup>`**-এ ঘোষিত অন্যান্য ভেরিয়েবল অ্যাক্সেস করতে পারে না, কারণ কম্পাইল করার সময় সম্পূর্ণ এক্সপ্রেশন একটি বাইরের ফাংশন স্কোপে সরানো হয়।
:::

</div>
<div class="options-api">

```js
export default {
  props: {
    // Basic type check
    //  (`null` and `undefined` values will allow any type)
    propA: Number,
    // Multiple possible types
    propB: [String, Number],
    // Required string
    propC: {
      type: String,
      required: true
    },
    // Number with a default value
    propD: {
      type: Number,
      default: 100
    },
    // Object with a default value
    propE: {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function. The function receives the raw
      // props received by the component as the argument.
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // Custom validator function
    propF: {
      validator(value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // Function with a default value
    propG: {
      type: Function,
      // Unlike object or array default, this is not a factory 
      // function - this is a function to serve as a default value
      default() {
        return 'Default function'
      }
    }
  }
}
```

</div>

অতিরিক্ত বিস্তারিত:

- সমস্ত প্রপস ডিফল্টরূপে ঐচ্ছিক, যদি না `required: true` নির্দিষ্ট করা হয়।

- `Boolean` ব্যতীত একটি অনুপস্থিত ঐচ্ছিক প্রপ হবে `undefined` মান।

- `Boolean` অনুপস্থিত প্রপগুলিকে `false` তে নিক্ষেপ করা হবে। আপনি এটির জন্য একটি `default` সেট করে এটি পরিবর্তন করতে পারেন — যেমন: `default: undefined` একটি নন-বুলিয়ান প্রপ হিসাবে আচরণ করতে।

- যদি একটি `default` মান নির্দিষ্ট করা থাকে, তাহলে এটি ব্যবহার করা হবে যদি সমাধানকৃত প্রপ মান `undefined` হয় - এতে প্রপ অনুপস্থিত থাকলে বা একটি সুস্পষ্ট `undefined` মান পাস হলে উভয়ই অন্তর্ভুক্ত থাকে।

যখন প্রপ বৈধতা ব্যর্থ হয়, Vue একটি কনসোল সতর্কতা তৈরি করবে (যদি development বিল্ড ব্যবহার করে)।

<div class="composition-api">

[Type-based props declarations](/api/sfc-script-setup#typescript-only-features) <sup class="vt-badge ts" /> ব্যবহার করলে, Vue টাইপ টীকাগুলিকে সমতুল্য কম্পাইল করার জন্য যথাসাধ্য চেষ্টা করবে রানটাইম প্রপ ঘোষণা। উদাহরণস্বরূপ, `defineProps<{ msg: string }>` কম্পাইল করা হবে `{ msg: { type: String, required: true }}`-এ।

</div>
<div class="options-api">

::: tip Note
উল্লেখ্য যে প্রপগুলি একটি কম্পোনেন্ট ইন্সট্যান্স তৈরি করার **আগে ** যাচাই করা হয়, তাই ইনস্ট্যান্স বৈশিষ্ট্যগুলি (যেমন `data`, `computed`, ইত্যাদি) `default` বা `validator` ফাংশনের মধ্যে উপলব্ধ হবে না।
:::

</div>

### Runtime Type Checks {#runtime-type-checks}

`type` নিম্নলিখিত নেটিভ কনস্ট্রাক্টরগুলির মধ্যে একটি হতে পারে:

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

এছাড়াও, `type` একটি কাস্টম ক্লাস বা কনস্ট্রাক্টর ফাংশনও হতে পারে এবং দাবিটি `instanceof` চেকের মাধ্যমে করা হবে। উদাহরণস্বরূপ, নিম্নলিখিত ক্লাস দেওয়া:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

আপনি এটি একটি প্রপের প্রকার হিসাবে ব্যবহার করতে পারেন:

<div class="composition-api">

```js
defineProps({
  author: Person
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    author: Person
  }
}
```

</div>

`author` প্রপের মান প্রকৃতপক্ষে `Person` শ্রেণীর একটি উদাহরণ কিনা তা যাচাই করতে Vue `instanceof Person` ব্যবহার করবে।

## Boolean Casting {#boolean-casting}

`Boolean` টাইপের প্রপগুলিতে নেটিভ বুলিয়ান অ্যাট্রিবিউটের আচরণ অনুকরণ করার জন্য বিশেষ কাস্টিং নিয়ম রয়েছে৷ নিম্নলিখিত ঘোষণার সাথে একটি `<MyComponent>` দেওয়া হয়েছে:

<div class="composition-api">

```js
defineProps({
  disabled: Boolean
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

</div>

component এই মত ব্যবহার করা যেতে পারে:

```vue-html
<!-- equivalent of passing :disabled="true" -->
<MyComponent disabled />

<!-- equivalent of passing :disabled="false" -->
<MyComponent />
```

যখন একটি প্রপ একাধিক প্রকারের অনুমতি দেওয়ার জন্য ঘোষণা করা হয়, যেমন

<div class="composition-api">

```js
defineProps({
  disabled: [Boolean, Number]
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
```

</div>

`Boolean`-এর জন্য ঢালাই নিয়ম প্রযোজ্য হবে তা নির্বিশেষে উপস্থিতি ক্রম প্রকার।
