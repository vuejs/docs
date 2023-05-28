# Class and Style Bindings {#class-and-style-bindings}

ডেটা বাইন্ডিংয়ের জন্য একটি সাধারণ প্রয়োজন হল একটি উপাদানের ক্লাস তালিকা এবং ইনলাইন শৈলীগুলি পরিচালনা করা। যেহেতু `class` এবং `style` উভয়ই অ্যাট্রিবিউট, তাই আমরা অন্যান্য অ্যাট্রিবিউটের মতোই গতিশীলভাবে একটি স্ট্রিং মান নির্ধারণ করতে `v-bind` ব্যবহার করতে পারি। যাইহোক, স্ট্রিং কনক্যাটেনেশন ব্যবহার করে সেই মানগুলি তৈরি করার চেষ্টা করা বিরক্তিকর এবং ত্রুটি-প্রবণ হতে পারে। এই কারণে, Vue বিশেষ বর্ধন প্রদান করে যখন `v-bind` `class` এবং `style` এর সাথে ব্যবহার করা হয়। স্ট্রিংগুলি ছাড়াও, অভিব্যক্তিগুলি বস্তু বা অ্যারেতেও মূল্যায়ন করতে পারে।

## Binding HTML Classes {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="বিনামূল্যে Vue.js ডায়নামিক CSS ক্লাস পাঠ"/>
</div>

### Binding to Objects {#binding-to-objects}

ক্লাসগুলিকে গতিশীলভাবে টগল করতে আমরা একটি বস্তুকে `:class` (`v-bind:class`-এর জন্য সংক্ষিপ্ত) পাস করতে পারি:

```vue-html
<div :class="{ active: isActive }"></div>
```

উপরের সিনট্যাক্সের অর্থ হল `active` শ্রেণীর উপস্থিতি ডেটা প্রপার্টি `isActive` এর [truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) দ্বারা নির্ধারিত হবে।

অবজেক্টে আরও ক্ষেত্র থাকার মাধ্যমে আপনি একাধিক ক্লাস টগল করতে পারেন। উপরন্তু, `:class` নির্দেশিকাও প্লেইন `class` বৈশিষ্ট্যের সাথে সহ-অস্তিত্ব করতে পারে। তাই নিম্নলিখিত রাষ্ট্র দেওয়া:

<div class="composition-api">

```js
const isActive = ref(true)
const hasError = ref(false)
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

</div>

এবং নিম্নলিখিত টেমপ্লেট:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

এটি রেন্ডার করবে:

```vue-html
<div class="static active"></div>
```

যখন `isActive` বা `hasError` পরিবর্তিত হয়, ক্লাস তালিকা সেই অনুযায়ী আপডেট করা হবে। উদাহরণস্বরূপ, যদি `hasError` `true` হয়ে যায়, তাহলে ক্লাস তালিকা `"static active text-danger"` হয়ে যাবে।

আবদ্ধ বস্তুটি ইনলাইন হতে হবে না:

<div class="composition-api">

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

এটি একই ফলাফল রেন্ডার করবে। আমরা একটি [computed property](./computed) এর সাথেও আবদ্ধ করতে পারি যা একটি বস্তুকে ফেরত দেয়। এটি একটি সাধারণ এবং শক্তিশালী প্যাটার্ন:

<div class="composition-api">

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

### Binding to Arrays {#binding-to-arrays}

ক্লাসের একটি তালিকা প্রয়োগ করতে আমরা একটি অ্যারের সাথে `:class` আবদ্ধ করতে পারি:

<div class="composition-api">

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

</div>

```vue-html
<div :class="[activeClass, errorClass]"></div>
```

যা রেন্ডার করবে:

```vue-html
<div class="active text-danger"></div>
```

আপনি যদি শর্তসাপেক্ষে তালিকায় একটি ক্লাস টগল করতে চান তবে আপনি এটি একটি ত্রিমুখী অভিব্যক্তি দিয়ে করতে পারেন:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

এটি সর্বদা `errorClass` প্রয়োগ করবে, কিন্তু `activeClass` শুধুমাত্র তখনই প্রয়োগ করা হবে যখন `isActive` সত্য হবে।

যাইহোক, যদি আপনার একাধিক শর্তসাপেক্ষ ক্লাস থাকে তবে এটি কিছুটা ভার্বোস হতে পারে। এই কারণেই অ্যারে সিনট্যাক্সের ভিতরে অবজেক্ট সিনট্যাক্স ব্যবহার করাও সম্ভব:

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### With Components {#with-components}

> এই বিভাগটি [Components](/guide/essentials/component-basics) সম্পর্কে জ্ঞান গ্রহণ করে। নির্দ্বিধায় এটি এড়িয়ে যান এবং পরে ফিরে আসুন।

আপনি যখন একটি একক রুট এলিমেন্ট সহ একটি কম্পোনেন্টে `class` অ্যাট্রিবিউট ব্যবহার করেন, তখন সেই ক্লাসগুলিকে কম্পোনেন্টের রুট এলিমেন্টে যোগ করা হবে এবং আগে থেকে থাকা যেকোনো ক্লাসের সাথে মার্জ করা হবে।

উদাহরণস্বরূপ, যদি আমাদের কাছে নিম্নলিখিত টেমপ্লেট সহ `MyComponent` নামের একটি উপাদান থাকে:

```vue-html
<!-- child component template -->
<p class="foo bar">Hi!</p>
```

তারপর এটি ব্যবহার করার সময় কিছু classes যোগ করুন:

```vue-html
<!-- when using the component -->
<MyComponent class="baz boo" />
```

রেন্ডার করা HTML হবে:

```vue-html
<p class="foo bar baz boo">Hi!</p>
```

class bindings জন্য একই কথা সত্য:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

যখন `isActive` সত্য হয়, রেন্ডার করা HTML হবে:

```vue-html
<p class="foo bar active">Hi!</p>
```

আপনার কম্পোনেন্টে একাধিক রুট এলিমেন্ট থাকলে, কোন এলিমেন্টটি এই ক্লাসটি পাবে তা আপনাকে নির্ধারণ করতে হবে। আপনি `$attrs` উপাদান বৈশিষ্ট্য ব্যবহার করে এটি করতে পারেন:

```vue-html
<!-- MyComponent template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```vue-html
<MyComponent class="baz" />
```

রেন্ডার করবে:

```html
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

আপনি [Fallthrough Attributes](/guide/components/attrs) বিভাগে কম্পোনেন্ট অ্যাট্রিবিউটের উত্তরাধিকার সম্পর্কে আরও জানতে পারেন।

## Binding Inline Styles {#binding-inline-styles}

### Binding to Objects {#binding-to-objects-1}

`:style` জাভাস্ক্রিপ্ট অবজেক্টের মানগুলির সাথে বাঁধাই সমর্থন করে - এটি একটি [HTML element's `style` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) এর সাথে মিলে যায়:

<div class="composition-api">

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

</div>

```vue-html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

যদিও ক্যামেলকেস কীগুলি সুপারিশ করা হয়, `:style` কাবাব-কেসড সিএসএস প্রপার্টি কীগুলিকেও সমর্থন করে (এগুলি প্রকৃত CSS-এ কীভাবে ব্যবহার করা হয় তার সাথে মিলে যায়) - উদাহরণস্বরূপ:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

এটি প্রায়শই একটি স্টাইল বস্তুর সাথে সরাসরি আবদ্ধ করা একটি ভাল ধারণা যাতে টেমপ্লেটটি পরিষ্কার হয়:

<div class="composition-api">

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

</div>

```vue-html
<div :style="styleObject"></div>
```

আবার, অবজেক্ট স্টাইল বাইন্ডিং প্রায়ই কম্পিউটেড বৈশিষ্ট্যের সাথে ব্যবহার করা হয় যা বস্তুকে ফেরত দেয়।

### Binding to Arrays {#binding-to-arrays-1}

আমরা একাধিক স্টাইল অবজেক্টের অ্যারেতে `:style` আবদ্ধ করতে পারি। এই বস্তুগুলিকে একত্রিত করা হবে এবং একই উপাদানে প্রয়োগ করা হবে:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Auto-prefixing {#auto-prefixing}

আপনি যখন একটি CSS প্রপার্টি ব্যবহার করেন যার জন্য `:style`-এ [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) প্রয়োজন, Vue স্বয়ংক্রিয়ভাবে উপযুক্ত উপসর্গ যোগ করবে। বর্তমান ব্রাউজারে কোন স্টাইল বৈশিষ্ট্যগুলি সমর্থিত তা দেখতে রানটাইমে চেক করে Vue এটি করে। যদি ব্রাউজার একটি নির্দিষ্ট সম্পত্তি সমর্থন না করে তাহলে সমর্থিত একটি খুঁজে বের করার চেষ্টা করার জন্য বিভিন্ন প্রিফিক্সড ভেরিয়েন্ট পরীক্ষা করা হবে।

### Multiple Values {#multiple-values}

আপনি একটি শৈলী সম্পত্তিতে একাধিক (প্রিফিক্সড) মানগুলির একটি অ্যারে প্রদান করতে পারেন, উদাহরণস্বরূপ:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

এটি ব্রাউজার সমর্থন করে এমন অ্যারের মধ্যে শুধুমাত্র শেষ মানটি রেন্ডার করবে। এই উদাহরণে, এটি ফ্লেক্সবক্সের আনপ্রিফিক্সড সংস্করণ সমর্থন করে এমন ব্রাউজারগুলির জন্য `display: flex` রেন্ডার করবে।
