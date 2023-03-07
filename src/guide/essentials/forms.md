---
outline: deep
---

<script setup>
import { ref } from 'vue'
const message = ref('')
const multilineText = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multiSelected = ref([])
</script>

# Form Input Bindings {#form-input-bindings}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="Vue.js ব্যবহারকারীর ইনপুটগুলির উপর বিনামূল্যে পাঠ"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="Vue.js ব্যবহারকারীর ইনপুটগুলির উপর বিনামূল্যে পাঠ"/>
</div>

ফ্রন্টএন্ডে ফর্মগুলি নিয়ে কাজ করার সময়, আমাদের প্রায়শই জাভাস্ক্রিপ্টে সংশ্লিষ্ট অবস্থার সাথে ফর্ম ইনপুট উপাদানগুলির অবস্থা সিঙ্ক করতে হবে। ম্যানুয়ালি ভ্যালু বাইন্ডিং ওয়্যার আপ করা এবং ইভেন্ট শ্রোতাদের পরিবর্তন করা কষ্টকর হতে পারে:

```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

`v-model` নির্দেশ আমাদের উপরোক্ত বিষয়গুলিকে সহজ করতে সাহায্য করে:

```vue-html
<input v-model="text">
```

এছাড়াও, `v-model` বিভিন্ন ধরনের ইনপুট, `<textarea>`, এবং `<select>` উপাদানে ব্যবহার করা যেতে পারে। এটি স্বয়ংক্রিয়ভাবে বিভিন্ন DOM সম্পত্তি এবং ইভেন্ট জোড়ায় প্রসারিত হয় যে উপাদানটির উপর এটি ব্যবহৃত হয়:

- `<input>` টেক্সট প্রকার এবং `<textarea>` উপাদানগুলি `value` বৈশিষ্ট্য এবং `input` ইভেন্ট ব্যবহার করে;
- `<input type="checkbox">` এবং `<input type="radio">` `চেকড` বৈশিষ্ট্য এবং `পরিবর্তন` ইভেন্ট ব্যবহার করুন;
- `<select>` একটি প্রপ হিসাবে `মান` ব্যবহার করুন এবং একটি ইভেন্ট হিসাবে `পরিবর্তন` ব্যবহার করুন।

::: tip Note
`v-model` যেকোনো ফর্ম উপাদানে পাওয়া প্রাথমিক `value`, `checked` বা `selected` বৈশিষ্ট্যগুলিকে উপেক্ষা করবে। এটি সর্বদা বর্তমান আবদ্ধ জাভাস্ক্রিপ্ট অবস্থাকে সত্যের উৎস হিসাবে বিবেচনা করবে। আপনি জাভাস্ক্রিপ্ট পাশে প্রাথমিক মান ঘোষণা করা উচিত, ব্যবহার করে <span class="options-api">the `data` option</span><span class="composition-api">reactivity APIs</span>.
:::

## Basic Usage {#basic-usage}

### Text {#text}

```vue-html
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

<div class="demo">
  <p>Message is: {{ message }}</p>
  <input v-model="message" placeholder="edit me" />
</div>

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbWVzc2FnZSA9IHJlZignJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPk1lc3NhZ2UgaXM6IHt7IG1lc3NhZ2UgfX08L3A+XG5cdDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiZWRpdCBtZVwiIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPk1lc3NhZ2UgaXM6IHt7IG1lc3NhZ2UgfX08L3A+XG5cdDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiZWRpdCBtZVwiIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

<span id="vmodel-ime-tip"></span>

::: tip বিঃদ্রঃ
যে ভাষাগুলির জন্য [IME](https://en.wikipedia.org/wiki/Input_method) (চীনা, জাপানি, কোরিয়ান ইত্যাদি) প্রয়োজন, আপনি লক্ষ্য করবেন যে IME চলাকালীন `v-model` আপডেট হয় না গঠন. আপনি যদি এই আপডেটগুলিতেও সাড়া দিতে চান, তাহলে `v-মডেল` ব্যবহার না করে আপনার নিজের `ইনপুট` ইভেন্ট লিসেনার এবং `মান` বাইন্ডিং ব্যবহার করুন।
:::

### Multiline text {#multiline-text}

```vue-html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

<div class="demo">
  <span>Multiline message is:</span>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  <textarea v-model="multilineText" placeholder="add multiple lines"></textarea>
</div>

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbWVzc2FnZSA9IHJlZignJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxzcGFuPk11bHRpbGluZSBtZXNzYWdlIGlzOjwvc3Bhbj5cblx0PHAgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XCI+e3sgbWVzc2FnZSB9fTwvcD5cblx0PHRleHRhcmVhIHYtbW9kZWw9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJhZGQgbXVsdGlwbGUgbGluZXNcIj48L3RleHRhcmVhPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxzcGFuPk11bHRpbGluZSBtZXNzYWdlIGlzOjwvc3Bhbj5cblx0PHAgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XCI+e3sgbWVzc2FnZSB9fTwvcD5cblx0PHRleHRhcmVhIHYtbW9kZWw9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJhZGQgbXVsdGlwbGUgbGluZXNcIj48L3RleHRhcmVhPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

মনে রাখবেন `<textarea>` এর ভিতরে ইন্টারপোলেশন কাজ করবে না। পরিবর্তে `v-model` ব্যবহার করুন।

```vue-html
<!-- bad -->
<textarea>{{ text }}</textarea>

<!-- good -->
<textarea v-model="text"></textarea>
```

### Checkbox {#checkbox}

সিঙ্গেল চেকবক্স, boolean মান:

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY2hlY2tlZCA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

আমরা একই অ্যারে বা [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) মানতে একাধিক চেকবক্স আবদ্ধ করতে পারি:

<div class="composition-api">

```js
const checkedNames = ref([])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      checkedNames: []
    }
  }
}
```

</div>

```vue-html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```

<div class="demo">
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="demo-jack" value="Jack" v-model="checkedNames">
  <label for="demo-jack">Jack</label>

  <input type="checkbox" id="demo-john" value="John" v-model="checkedNames">
  <label for="demo-john">John</label>

  <input type="checkbox" id="demo-mike" value="Mike" v-model="checkedNames">
  <label for="demo-mike">Mike</label>
</div>

এই ক্ষেত্রে, `checkedNames` অ্যারেতে সর্বদা বর্তমানে চেক করা বাক্সের মান থাকবে।

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY2hlY2tlZE5hbWVzID0gcmVmKFtdKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5DaGVja2VkIG5hbWVzOiB7eyBjaGVja2VkTmFtZXMgfX08L2Rpdj5cblxuICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJqYWNrXCIgdmFsdWU9XCJKYWNrXCIgdi1tb2RlbD1cImNoZWNrZWROYW1lc1wiIC8+XG4gIDxsYWJlbCBmb3I9XCJqYWNrXCI+SmFjazwvbGFiZWw+XG4gXG4gIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImpvaG5cIiB2YWx1ZT1cIkpvaG5cIiB2LW1vZGVsPVwiY2hlY2tlZE5hbWVzXCIgLz5cbiAgPGxhYmVsIGZvcj1cImpvaG5cIj5Kb2huPC9sYWJlbD5cbiBcbiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwibWlrZVwiIHZhbHVlPVwiTWlrZVwiIHYtbW9kZWw9XCJjaGVja2VkTmFtZXNcIiAvPlxuICA8bGFiZWwgZm9yPVwibWlrZVwiPk1pa2U8L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hlY2tlZE5hbWVzOiBbXVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5DaGVja2VkIG5hbWVzOiB7eyBjaGVja2VkTmFtZXMgfX08L2Rpdj5cblxuICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJqYWNrXCIgdmFsdWU9XCJKYWNrXCIgdi1tb2RlbD1cImNoZWNrZWROYW1lc1wiIC8+XG4gIDxsYWJlbCBmb3I9XCJqYWNrXCI+SmFjazwvbGFiZWw+XG4gXG4gIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImpvaG5cIiB2YWx1ZT1cIkpvaG5cIiB2LW1vZGVsPVwiY2hlY2tlZE5hbWVzXCIgLz5cbiAgPGxhYmVsIGZvcj1cImpvaG5cIj5Kb2huPC9sYWJlbD5cbiBcbiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwibWlrZVwiIHZhbHVlPVwiTWlrZVwiIHYtbW9kZWw9XCJjaGVja2VkTmFtZXNcIiAvPlxuICA8bGFiZWwgZm9yPVwibWlrZVwiPk1pa2U8L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

### Radio {#radio}

```vue-html
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

<div class="demo">
  <div>Picked: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
</div>

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcGlja2VkID0gcmVmKCdPbmUnKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5QaWNrZWQ6IHt7IHBpY2tlZCB9fTwvZGl2PlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIm9uZVwiIHZhbHVlPVwiT25lXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJvbmVcIj5PbmU8L2xhYmVsPlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInR3b1wiIHZhbHVlPVwiVHdvXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG4gIDxsYWJlbCBmb3I9XCJ0d29cIj5Ud288L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGlja2VkOiAnT25lJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGRpdj5QaWNrZWQ6IHt7IHBpY2tlZCB9fTwvZGl2PlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIm9uZVwiIHZhbHVlPVwiT25lXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJvbmVcIj5PbmU8L2xhYmVsPlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInR3b1wiIHZhbHVlPVwiVHdvXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJ0d29cIj5Ud288L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

### Select {#select}

একক select:

```vue-html
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Selected: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoJycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c3Bhbj4gU2VsZWN0ZWQ6IHt7IHNlbGVjdGVkIH19PC9zcGFuPlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCI+XG4gICAgPG9wdGlvbiBkaXNhYmxlZCB2YWx1ZT1cIlwiPlBsZWFzZSBzZWxlY3Qgb25lPC9vcHRpb24+XG4gICAgPG9wdGlvbj5BPC9vcHRpb24+XG4gICAgPG9wdGlvbj5CPC9vcHRpb24+XG4gICAgPG9wdGlvbj5DPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6ICcnXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c3Bhbj4gU2VsZWN0ZWQ6IHt7IHNlbGVjdGVkIH19PC9zcGFuPlxuICA8c2VsZWN0IHYtbW9kZWw9XCJzZWxlY3RlZFwiPlxuICAgIDxvcHRpb24gZGlzYWJsZWQgdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IG9uZTwvb3B0aW9uPlxuICAgIDxvcHRpb24+QTwvb3B0aW9uPlxuICAgIDxvcHRpb24+Qjwvb3B0aW9uPlxuICAgIDxvcHRpb24+Qzwvb3B0aW9uPlxuICA8L3NlbGVjdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

:::tip বিঃদ্রঃ
যদি আপনার `v-model` অভিব্যক্তির প্রাথমিক মান কোনো বিকল্পের সাথে মেলে না, তাহলে `<select>` উপাদানটি একটি "অনির্বাচিত" অবস্থায় রেন্ডার হবে। আইওএস-এ এটি ব্যবহারকারীর প্রথম আইটেমটি নির্বাচন করতে সক্ষম হবে না কারণ iOS এই ক্ষেত্রে কোনও পরিবর্তন ইভেন্ট চালু করে না। সুতরাং উপরের উদাহরণে প্রদর্শিত হিসাবে, একটি খালি মান সহ একটি অক্ষম বিকল্প প্রদান করার সুপারিশ করা হয়।
:::

একাধিক নির্বাচন (array সাথে আবদ্ধ):

```vue-html
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Selected: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoW10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlNlbGVjdGVkOiB7eyBzZWxlY3RlZCB9fTwvZGl2PlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCIgbXVsdGlwbGU+XG4gICAgPG9wdGlvbj5BPC9vcHRpb24+XG4gICAgPG9wdGlvbj5CPC9vcHRpb24+XG4gICAgPG9wdGlvbj5DPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuc2VsZWN0W211bHRpcGxlXSB7XG4gIHdpZHRoOiAxMDBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6IFtdXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlNlbGVjdGVkOiB7eyBzZWxlY3RlZCB9fTwvZGl2PlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCIgbXVsdGlwbGU+XG4gICAgPG9wdGlvbj5BPC9vcHRpb24+XG4gICAgPG9wdGlvbj5CPC9vcHRpb24+XG4gICAgPG9wdGlvbj5DPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuc2VsZWN0W211bHRpcGxlXSB7XG4gIHdpZHRoOiAxMDBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

নির্বাচনের বিকল্পগুলি গতিশীলভাবে `v-for` দিয়ে রেন্ডার করা যেতে পারে:

<div class="composition-api">

```js
const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  }
}
```

</div>

```vue-html
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selected: {{ selected }}</div>
```

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoJ0EnKVxuXG5jb25zdCBvcHRpb25zID0gcmVmKFtcbiAgeyB0ZXh0OiAnT25lJywgdmFsdWU6ICdBJyB9LFxuICB7IHRleHQ6ICdUd28nLCB2YWx1ZTogJ0InIH0sXG4gIHsgdGV4dDogJ1RocmVlJywgdmFsdWU6ICdDJyB9XG5dKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHNlbGVjdCB2LW1vZGVsPVwic2VsZWN0ZWRcIj5cbiAgICA8b3B0aW9uIHYtZm9yPVwib3B0aW9uIGluIG9wdGlvbnNcIiA6dmFsdWU9XCJvcHRpb24udmFsdWVcIj5cbiAgICAgIHt7IG9wdGlvbi50ZXh0IH19XG4gICAgPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuXG5cdDxkaXY+U2VsZWN0ZWQ6IHt7IHNlbGVjdGVkIH19PC9kaXY+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6ICdBJyxcbiAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgeyB0ZXh0OiAnT25lJywgdmFsdWU6ICdBJyB9LFxuICAgICAgICB7IHRleHQ6ICdUd28nLCB2YWx1ZTogJ0InIH0sXG4gICAgICAgIHsgdGV4dDogJ1RocmVlJywgdmFsdWU6ICdDJyB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c2VsZWN0IHYtbW9kZWw9XCJzZWxlY3RlZFwiPlxuICAgIDxvcHRpb24gdi1mb3I9XCJvcHRpb24gaW4gb3B0aW9uc1wiIDp2YWx1ZT1cIm9wdGlvbi52YWx1ZVwiPlxuICAgICAge3sgb3B0aW9uLnRleHQgfX1cbiAgICA8L29wdGlvbj5cbiAgPC9zZWxlY3Q+XG5cblx0PGRpdj5TZWxlY3RlZDoge3sgc2VsZWN0ZWQgfX08L2Rpdj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

## Value Bindings {#value-bindings}

রেডিও, চেকবক্স এবং নির্বাচনের বিকল্পগুলির জন্য, `v-model` বাঁধাই মানগুলি সাধারণত স্ট্যাটিক স্ট্রিং (বা চেকবক্সের জন্য বুলিয়ান):

```vue-html
<!-- `picked` is a string "a" when checked -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` is either true or false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` is a string "abc" when the first option is selected -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

কিন্তু কখনও কখনও আমরা বর্তমান সক্রিয় উদাহরণে একটি গতিশীল সম্পত্তির সাথে মানটিকে আবদ্ধ করতে চাই। আমরা এটি অর্জন করতে `v-bind` ব্যবহার করতে পারি। উপরন্তু, `v-bind` ব্যবহার করে আমাদের ইনপুট মানকে নন-স্ট্রিং মানের সাথে আবদ্ধ করতে দেয়।

### Checkbox {#checkbox-1}

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

`true-value` এবং `false-value` হল Vue-নির্দিষ্ট বৈশিষ্ট্য যা শুধুমাত্র `v-model` এর সাথে কাজ করে। এখানে `toggle` প্রপার্টির মান বক্সে টিক চিহ্ন দিলে `'yes'` তে সেট করা হবে এবং টিক চিহ্নমুক্ত করা হলে `no'`তে সেট করা হবে। আপনি এগুলিকে `v-bind` ব্যবহার করে গতিশীল মানগুলিতে আবদ্ধ করতে পারেন:

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip পরামর্শ
`true-value` এবং `false-value` বৈশিষ্ট্যগুলি ইনপুটের `value` বৈশিষ্ট্যকে প্রভাবিত করে না, কারণ ব্রাউজারগুলি ফর্ম জমা দেওয়ার ক্ষেত্রে অচেক করা বাক্সগুলিকে অন্তর্ভুক্ত করে না। দুটি মানের মধ্যে একটি ফর্মে জমা দেওয়া হয়েছে তা নিশ্চিত করতে (যেমন "হ্যাঁ" বা "না"), পরিবর্তে রেডিও ইনপুট ব্যবহার করুন।
:::

### Radio {#radio-1}

```vue-html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

প্রথম রেডিও ইনপুট চেক করা হলে `pick` `first` এর মান সেট করা হবে এবং দ্বিতীয়টি চেক করা হলে `second` এর মান সেট করা হবে।

### Select Options {#select-options}

```vue-html
<select v-model="selected">
  <!-- inline object literal -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model` নন-স্ট্রিং মানের মান বাইন্ডিংকেও সমর্থন করে! উপরের উদাহরণে, বিকল্পটি নির্বাচন করা হলে, `selected` অবজেক্টের আক্ষরিক মান `{ number: 123 }`-এ সেট করা হবে।

## Modifiers {#modifiers}

### `.lazy` {#lazy}

ডিফল্টরূপে, `v-model` প্রতিটি `input` ইভেন্টের পরে ডেটার সাথে ইনপুটকে সিঙ্ক করে (IME কম্পোজিশন বাদে [stated above](#vmodel-ime-tip))। আপনি `change` events পরে সিঙ্ক করার পরিবর্তে `lazy` সংশোধক যোগ করতে পারেন:

```vue-html
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" />
```

### `.number` {#number}

আপনি যদি চান যে ব্যবহারকারীর ইনপুট স্বয়ংক্রিয়ভাবে একটি সংখ্যা হিসাবে টাইপকাস্ট হোক, আপনি আপনার `v-model` পরিচালিত ইনপুটগুলিতে `number` সংশোধক যোগ করতে পারেন:

```vue-html
<input v-model.number="age" />
```

যদি মানটিকে `parseFloat()` দিয়ে পার্স করা না যায়, তাহলে এর পরিবর্তে আসল মান ব্যবহার করা হয়।

যদি ইনপুটে `type="number"` থাকে তাহলে `number` সংশোধক স্বয়ংক্রিয়ভাবে প্রয়োগ করা হয়।

### `.trim` {#trim}

আপনি যদি ব্যবহারকারীর ইনপুট থেকে হোয়াইটস্পেস স্বয়ংক্রিয়ভাবে ছাঁটাই করতে চান, তাহলে আপনি আপনার `v-model`-পরিচালিত ইনপুটগুলিতে `trim` সংশোধক যোগ করতে পারেন:

```vue-html
<input v-model.trim="msg" />
```

## `v-model` with Components {#v-model-with-components}

> আপনি যদি এখনও Vue এর উপাদানগুলির সাথে পরিচিত না হন তবে আপনি আপাতত এটি এড়িয়ে যেতে পারেন৷

HTML এর অন্তর্নির্মিত ইনপুট প্রকারগুলি সর্বদা আপনার চাহিদা পূরণ করবে না। ভাগ্যক্রমে, Vue উপাদানগুলি আপনাকে সম্পূর্ণরূপে কাস্টমাইজড আচরণের সাথে পুনরায় ব্যবহারযোগ্য ইনপুট তৈরি করতে দেয়। এই ইনপুটগুলি এমনকি `v-model` এর সাথেও কাজ করে! আরও জানতে, কম্পোনেন্টস গাইডে [`v-model` এর সাথে ব্যবহার](/guide/components/v-model.html) সম্পর্কে পড়ুন।
