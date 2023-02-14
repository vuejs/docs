# List Rendering {#list-rendering}

উৎস অ্যারের উপর ভিত্তি করে উপাদানগুলির একটি তালিকা রেন্ডার করতে আমরা `v-for` নির্দেশিকা ব্যবহার করতে পারি:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

এখানে `todo` হল একটি স্থানীয় ভেরিয়েবল যা বর্তমানে পুনরাবৃত্তি করা অ্যারে উপাদানটিকে উপস্থাপন করে। এটি শুধুমাত্র `v-for` উপাদানে বা ভিতরে অ্যাক্সেসযোগ্য, একটি ফাংশন স্কোপের মতো।

লক্ষ্য করুন কিভাবে আমরা প্রতিটি টোডো অবজেক্টকে একটি অনন্য `id` দিচ্ছি, এবং এটিকে <a target="_blank" href="/api/built-in-special-attributes.html#key">বিশেষ `key` হিসেবে আবদ্ধ করছি। বৈশিষ্ট্য</a> প্রতিটি `<li>` এর জন্য। `key` Vue-কে অ্যারেতে তার সংশ্লিষ্ট বস্তুর অবস্থানের সাথে মেলে প্রতিটি `<li>` সঠিকভাবে সরাতে দেয়।

তালিকা আপডেট করার দুটি উপায় আছে:

1. সোর্স অ্যারেতে [মিউটেটিং পদ্ধতি](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating) কল করুন:

   <div class="composition-api">

   ```js
   todos.value.push(newTodo)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos.push(newTodo)
   ```

   </div>

2. একটি নতুন দিয়ে অ্যারে প্রতিস্থাপন করুন:

   <div class="composition-api">

   ```js
   todos.value = todos.value.filter(/* ... */)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos = this.todos.filter(/* ... */)
   ```

   </div>

এখানে আমাদের একটি সহজ করণীয় তালিকা রয়েছে - এটিকে কার্যকর করতে `addTodo()` এবং `removeTodo()` পদ্ধতির জন্য যুক্তি প্রয়োগ করার চেষ্টা করুন!

`v-for` এর আরও বিশদ বিবরণ: <a target="_blank" href="/guide/essentials/list.html">গাইড - তালিকা রেন্ডারিং</a>
