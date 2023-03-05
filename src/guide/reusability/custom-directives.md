# Custom Directives {#custom-directives}

<script setup>
const vFocus = {
  mounted: el => {
    el.focus()
  }
}
</script>

## Introduction {#introduction}

কোরে পাঠানো নির্দেশাবলীর ডিফল্ট সেট ছাড়াও (যেমন `v-model` বা `v-show`), Vue আপনাকে আপনার নিজস্ব কাস্টম নির্দেশাবলী নিবন্ধন করার অনুমতি দেয়।

আমরা Vue-তে কোড পুনঃব্যবহারের দুটি ফর্ম চালু করেছি: [components](/guide/essentials/component-basics.html) এবং [composables](./composables)। উপাদানগুলি হল প্রধান বিল্ডিং ব্লক, যখন কম্পোজেবলগুলি রাষ্ট্রীয় যুক্তি পুনঃব্যবহারের উপর দৃষ্টি নিবদ্ধ করে। অন্যদিকে, কাস্টম নির্দেশাবলী প্রধানত যুক্তির পুনঃব্যবহারের উদ্দেশ্যে তৈরি করা হয়েছে যা প্লেইন উপাদানগুলিতে নিম্ন-স্তরের DOM অ্যাক্সেস জড়িত।

একটি কাস্টম নির্দেশিকাকে একটি বস্তু হিসাবে সংজ্ঞায়িত করা হয় যাতে একটি উপাদানের অনুরূপ জীবনচক্র হুক থাকে। হুকগুলি সেই উপাদানটি গ্রহণ করে যা নির্দেশে আবদ্ধ। এখানে একটি নির্দেশের একটি উদাহরণ যা একটি ইনপুট ফোকাস করে যখন উপাদানটি Vue দ্বারা DOM-এ ঢোকানো হয়:

<div class="composition-api">

```vue
<script setup>
// enables v-focus in templates
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

</div>

<div class="options-api">

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // enables v-focus in template
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

<div class="demo">
  <input v-focus placeholder="This should be focused" />
</div>

ধরে নিচ্ছি আপনি পৃষ্ঠার অন্য কোথাও ক্লিক করেননি, উপরের ইনপুটটি স্বয়ংক্রিয়ভাবে ফোকাস করা উচিত। এই নির্দেশিকাটি `autofocus` অ্যাট্রিবিউটের চেয়ে বেশি কার্যকর কারণ এটি শুধুমাত্র পৃষ্ঠা লোডের ক্ষেত্রে কাজ করে না - এটি Vue দ্বারা উপাদানটিকে গতিশীলভাবে সন্নিবেশ করা হলে এটিও কাজ করে।

<div class="composition-api">

`<script setup>`-এ, `v` prefix দিয়ে শুরু হওয়া যে কোনো camelCase variable একটি কাস্টম নির্দেশিকা হিসেবে ব্যবহার করা যেতে পারে। উপরের উদাহরণে, `vFocus` টেমপ্লেটে `v-focus` হিসেবে ব্যবহার করা যেতে পারে।

`<script setup>` ব্যবহার না করলে, কাস্টম নির্দেশাবলী `directives` বিকল্প ব্যবহার করে নিবন্ধিত করা যেতে পারে:

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // enables v-focus in template
    focus: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

উপাদানগুলির অনুরূপ, কাস্টম নির্দেশাবলী অবশ্যই নিবন্ধিত হতে হবে যাতে সেগুলি টেমপ্লেটে ব্যবহার করা যায়। উপরের উদাহরণে, আমরা `directives` বিকল্পের মাধ্যমে স্থানীয় নিবন্ধন ব্যবহার করছি।

</div>

অ্যাপ স্তরে বিশ্বব্যাপী কাস্টম নির্দেশাবলী নিবন্ধন করাও সাধারণ:

```js
const app = createApp({})

// make v-focus usable in all components
app.directive('focus', {
  /* ... */
})
```

:::tip
কাস্টম নির্দেশাবলী শুধুমাত্র তখনই ব্যবহার করা উচিত যখন কাঙ্ক্ষিত কার্যকারিতা শুধুমাত্র সরাসরি DOM ম্যানিপুলেশনের মাধ্যমে অর্জন করা যায়। বিল্ট-ইন নির্দেশাবলী ব্যবহার করে ঘোষণামূলক টেমপ্লেটিং পছন্দ করুন যেমন সম্ভব হলে `v-bind` কারণ সেগুলি আরও দক্ষ এবং সার্ভার-রেন্ডারিং বন্ধুত্বপূর্ণ।
:::

## Directive Hooks {#directive-hooks}

একটি নির্দেশমূলক সংজ্ঞা বস্তু বিভিন্ন হুক ফাংশন প্রদান করতে পারে (সমস্ত ঐচ্ছিক):

```js
const myDirective = {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode, prevVnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode, prevVnode) {},
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // called after the parent component and
  // all of its children have updated
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### Hook Arguments {#hook-arguments}

নির্দেশিক হুক এই আর্গুমেন্ট পাস করা হয়:

- `el`: নির্দেশিকাটি যে উপাদানটির সাথে আবদ্ধ। এটি সরাসরি DOM ম্যানিপুলেট করতে ব্যবহার করা যেতে পারে।

- `binding`: নিম্নলিখিত বৈশিষ্ট্য ধারণকারী একটি বস্তু।

  - `value`: নির্দেশিকায় পাঠানো মান। যেমন `v-my-directive="1 + 1"`-এ, মান হবে `2`।
  - `oldValue`: পূর্ববর্তী মান, শুধুমাত্র `beforeUpdate` এবং `updated`-এ উপলব্ধ। মান পরিবর্তিত হয়েছে কিনা তা উপলব্ধ।
  - `arg`: আর্গুমেন্ট নির্দেশে চলে গেছে, যদি থাকে। যেমন `v-my-directive:foo`-এ, arg হবে `"foo"`।
  - `modifiers`: কোনো বস্তু যাতে মডিফায়ার থাকে, যদি থাকে। যেমন `v-my-directive.foo.bar`-এ, মডিফায়ার অবজেক্ট হবে `{ foo: true, bar: true }`।
  - `instance`: উপাদানের উদাহরণ যেখানে নির্দেশিকা ব্যবহার করা হয়।
  - `dir`: নির্দেশক সংজ্ঞা বস্তু।

- `vnode`: অন্তর্নিহিত VNode আবদ্ধ উপাদানের প্রতিনিধিত্ব করে।
- `prevNode`: VNode পূর্ববর্তী রেন্ডার থেকে আবদ্ধ উপাদানের প্রতিনিধিত্ব করে। শুধুমাত্র `beforeUpdate` এবং `updated` হুকগুলিতে উপলব্ধ।

একটি উদাহরণ হিসাবে, নিম্নলিখিত নির্দেশিক ব্যবহার বিবেচনা করুন:

```vue-html
<div v-example:foo.bar="baz">
```

`binding` আর্গুমেন্ট এর আকারে একটি বস্তু হবে:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* value of `baz` */,
  oldValue: /* value of `baz` from previous update */
}
```

অন্তর্নির্মিত নির্দেশের অনুরূপ, কাস্টম নির্দেশিক আর্গুমেন্টগুলি গতিশীল হতে পারে। উদাহরণ স্বরূপ:

```vue-html
<div v-example:[arg]="value"></div>
```

এখানে নির্দেশমূলক আর্গুমেন্ট আমাদের কম্পোনেন্ট স্টেটে `arg` সম্পত্তির উপর ভিত্তি করে প্রতিক্রিয়াশীলভাবে আপডেট করা হবে।

:::tip Note
'el' ছাড়াও, আপনার এই আর্গুমেন্টগুলিকে শুধুমাত্র পঠনযোগ্য হিসাবে বিবেচনা করা উচিত এবং সেগুলিকে কখনও সংশোধন করবেন না৷ আপনি যদি হুক জুড়ে তথ্য ভাগ করতে চান তবে উপাদানের [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) এর মাধ্যমে এটি করার পরামর্শ দেওয়া হয়।
:::

## Function Shorthand {#function-shorthand}

একটি কাস্টম নির্দেশের জন্য `mounted` এবং `updated`-এর জন্য একই আচরণ করা সাধারণ, অন্য হুকের প্রয়োজন নেই। এই ধরনের ক্ষেত্রে আমরা নির্দেশকে একটি ফাংশন হিসাবে সংজ্ঞায়িত করতে পারি:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // this will be called for both `mounted` and `updated`
  el.style.color = binding.value
})
```

## Object Literals {#object-literals}

আপনার নির্দেশের একাধিক মান প্রয়োজন হলে, আপনি জাভাস্ক্রিপ্ট অবজেক্ট আক্ষরিকভাবেও পাস করতে পারেন। মনে রাখবেন, নির্দেশাবলী যেকোনো বৈধ জাভাস্ক্রিপ্ট এক্সপ্রেশন নিতে পারে।

```vue-html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## Usage on Components {#usage-on-components}

উপাদানগুলিতে ব্যবহার করা হলে, কাস্টম নির্দেশাবলী সর্বদা একটি উপাদানের রুট নোডে প্রযোজ্য হবে, [Fallthrough Attributes](/guide/components/attrs.html) এর মতো।

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- template of MyComponent -->

<div> <!-- v-demo directive will be applied here -->
  <span>My component content</span>
</div>
```

মনে রাখবেন যে উপাদানগুলির সম্ভাব্য একাধিক রুট নোড থাকতে পারে। মাল্টি-রুট উপাদানে প্রয়োগ করা হলে, একটি নির্দেশ উপেক্ষা করা হবে এবং একটি সতর্কতা নিক্ষেপ করা হবে। অ্যাট্রিবিউটের বিপরীতে, নির্দেশাবলী `v-bind="$attrs"` সহ একটি ভিন্ন উপাদানে পাঠানো যাবে না। সাধারণভাবে, উপাদানগুলিতে কাস্টম নির্দেশাবলী ব্যবহার করার জন্য **not** সুপারিশ করা হয়।
