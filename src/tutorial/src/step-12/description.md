# Props {#props}

একটি শিশু উপাদান **props** এর মাধ্যমে পিতামাতার কাছ থেকে ইনপুট গ্রহণ করতে পারে। প্রথমত, এটি যে প্রপগুলি গ্রহণ করে তা ঘোষণা করতে হবে:

<div class="composition-api">
<div class="sfc">

```vue
<!-- ChildComp.vue -->
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

দ্রষ্টব্য `defineProps()` একটি কম্পাইল-টাইম ম্যাক্রো এবং এটি আমদানি করার প্রয়োজন নেই। একবার ঘোষণা করা হলে, শিশু উপাদানের টেমপ্লেটে `msg` প্রপ ব্যবহার করা যেতে পারে। এটি `defineProps()` এর প্রত্যাবর্তিত বস্তুর মাধ্যমে জাভাস্ক্রিপ্টে অ্যাক্সেস করা যেতে পারে।

</div>

<div class="html">

```js
// in child component
export default {
  props: {
    msg: String
  },
  setup(props) {
    // access props.msg
  }
}
```

একবার ঘোষণা করা হলে, `this`-এ `msg` প্রপ প্রকাশ করা হয় এবং শিশু উপাদানের টেমপ্লেটে ব্যবহার করা যেতে পারে। প্রাপ্ত প্রপগুলিকে প্রথম আর্গুমেন্ট হিসাবে `setup()`-এ পাঠানো হয়।

</div>

</div>

<div class="options-api">

```js
// in child component
export default {
  props: {
    msg: String
  }
}
```

একবার ঘোষণা করা হলে, `this`-এ `msg` প্রপ প্রকাশ করা হয় এবং শিশু উপাদানের টেমপ্লেটে ব্যবহার করা যেতে পারে।

</div>

অভিভাবক গুণাবলীর মতই সন্তানকে প্রপ দিতে পারেন। একটি গতিশীল মান পাস করতে, আমরা `v-bind` বাক্য গঠনও ব্যবহার করতে পারি:

<div class="sfc">

```vue-html
<ChildComp :msg="greeting" />
```

</div>
<div class="html">

```vue-html
<child-comp :msg="greeting"></child-comp>
```

</div>

এখন এডিটরে নিজেই চেষ্টা করে দেখুন।
