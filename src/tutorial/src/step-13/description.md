# Emits {#emits}

props প্রাপ্তির পাশাপাশি, একটি 'child component' 'parent component' এর কাছে ইভেন্টগুলি emit করতে পারে:

<div class="composition-api">
<div class="sfc">

```vue
<script setup>
// declare emitted events
const emit = defineEmits(['response'])

// emit with argument
emit('response', 'hello from child')
</script>
```

</div>

<div class="html">

```js
export default {
  // declare emitted events
  emits: ['response'],
  setup(props, { emit }) {
    // emit with argument
    emit('response', 'hello from child')
  }
}
```

</div>

</div>

<div class="options-api">

```js
export default {
  // declare emitted events
  emits: ['response'],
  created() {
    // emit with argument
    this.$emit('response', 'hello from child')
  }
}
```

</div>

<span class="options-api">`this.$emit()`</span><span class="composition-api">`emit()`</span> এর প্রথম আর্গুমেন্ট হল ইভেন্টের নাম। কোন অতিরিক্ত আর্গুমেন্ট event listener পাস করা হয়.

parent component `v-on` ব্যবহার করে child component এর ইভেন্ট শুনতে পারেন - এখানে হ্যান্ডলার চাইল্ড emit কলের কাছ থেকে অতিরিক্ত আর্গুমেন্ট গ্রহণ করে এবং এটি local state এ বরাদ্দ করে:

<div class="sfc">

```vue-html
<ChildComp @response="(msg) => childMsg = msg" />
```

</div>
<div class="html">

```vue-html
<child-comp @response="(msg) => childMsg = msg"></child-comp>
```

</div>

এখন এডিটরে নিজেই চেষ্টা করে দেখুন।
