# Computed Property {#computed-property}

শেষ ধাপ থেকে করণীয় তালিকার শীর্ষে তৈরি করা যাক। এখানে, আমরা ইতিমধ্যে প্রতিটি টোডোতে একটি টগল কার্যকারিতা যোগ করেছি। এটি প্রতিটি টোডো অবজেক্টে একটি `done` বৈশিষ্ট্য যোগ করে এবং এটিকে একটি চেকবক্সে আবদ্ধ করতে `v-model` ব্যবহার করে করা হয়:

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

পরবর্তী উন্নতি যা আমরা যোগ করতে পারি তা হল ইতিমধ্যে সম্পন্ন করা টোডো লুকিয়ে রাখতে সক্ষম হওয়া। আমাদের কাছে ইতিমধ্যেই একটি বোতাম রয়েছে যা `hideCompleted` অবস্থাকে টগল করে। কিন্তু কিভাবে আমরা যে state এর উপর ভিত্তি করে বিভিন্ন তালিকা আইটেম রেন্ডার করব?

<div class="options-api">

<a target="_blank" href="/guide/essentials/computed.html">গণনা করা সম্পত্তি</a> উপস্থাপন করা হচ্ছে৷ আমরা একটি সম্পত্তি ঘোষণা করতে পারি যা প্রতিক্রিয়াশীলভাবে অন্যান্য বৈশিষ্ট্য থেকে গণনা করা হয় `গণনা করা` বিকল্প ব্যবহার করে:

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // return filtered todos based on `this.hideCompleted`
    }
  }
}
```

</div>
<div class="html">

```js
createApp({
  // ...
  computed: {
    filteredTodos() {
      // return filtered todos based on `this.hideCompleted`
    }
  }
})
```

</div>

</div>
<div class="composition-api">

পেশ করা হচ্ছে <a target="_blank" href="/guide/essentials/computed.html">`computed()`</a>। আমরা একটি গণনাকৃত রেফ তৈরি করতে পারি যা অন্যান্য প্রতিক্রিয়াশীল ডেটা উত্সের উপর ভিত্তি করে এর `.value` গণনা করে:

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // return filtered todos based on
  // `todos.value` & `hideCompleted.value`
})
```

</div>
<div class="html">

```js{10-13}
import { createApp, ref, computed } from 'vue'

createApp({
  setup() {
    const hideCompleted = ref(false)
    const todos = ref([
      /* ... */
    ])

    const filteredTodos = computed(() => {
      // return filtered todos based on
      // `todos.value` & `hideCompleted.value`
    })

    return {
      // ...
    }
  }
})
```

</div>

</div>

```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

একটি গণনাকৃত সম্পত্তি নির্ভরতা হিসাবে তার গণনায় ব্যবহৃত অন্যান্য প্রতিক্রিয়াশীল অবস্থাকে ট্র্যাক করে। এটি ফলাফল ক্যাশ করে এবং যখন এর নির্ভরতা পরিবর্তিত হয় তখন এটি স্বয়ংক্রিয়ভাবে আপডেট হয়।

এখন, `filteredTodos` গণনাকৃত সম্পত্তি যোগ করার চেষ্টা করুন এবং এর গণনা যুক্তি প্রয়োগ করুন! সঠিকভাবে প্রয়োগ করা হলে, সম্পূর্ণ আইটেম লুকানোর সময় একটি টোডো চেক করা হলে তা সঙ্গে সঙ্গে লুকিয়ে রাখাও উচিত।
