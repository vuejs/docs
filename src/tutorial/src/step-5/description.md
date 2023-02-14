# Form Bindings {#form-bindings}

`v-bind` এবং `v-on` একসাথে ব্যবহার করে, আমরা form ইনপুট উপাদানগুলিতে দ্বি-মুখী বাইন্ডিং তৈরি করতে পারি:

```vue-html
<input :value="text" @input="onInput">
```

<div class="options-api">

```js
methods: {
  onInput(e) {
    // a v-on handler receives the native DOM event
    // as the argument.
    this.text = e.target.value
  }
}
```

</div>

<div class="composition-api">

```js
function onInput(e) {
  // a v-on handler receives the native DOM event
  // as the argument.
  text.value = e.target.value
}
```

</div>

ইনপুট বাক্সে টাইপ করার চেষ্টা করুন - আপনি টাইপ করার সাথে সাথে আপডেট হওয়া `<p>`-এ পাঠ্য দেখতে পাবেন।

দ্বি-মুখী বাইন্ডিং সহজ করার জন্য, Vue একটি নির্দেশিকা প্রদান করে, `v-model`, যা মূলত উপরের জন্য একটি সিনট্যাক্স চিনি:

```vue-html
<input v-model="text">
```

`v-model` স্বয়ংক্রিয়ভাবে `<input>` এর মানকে আবদ্ধ অবস্থার সাথে সিঙ্ক করে, তাই এর জন্য আমাদের আর কোনো ইভেন্ট হ্যান্ডলার ব্যবহার করতে হবে না।

`v-model` শুধুমাত্র টেক্সট ইনপুট নয়, অন্যান্য ইনপুট ধরনের যেমন চেকবক্স, রেডিও বোতাম এবং নির্বাচিত ড্রপডাউনগুলিতেও কাজ করে। আমরা <a target="_blank" href="/guide/essentials/forms.html">গাইড - ফর্ম বাইন্ডিং</a>-এ আরও বিশদ বিবরণ কভার করি।

এখন, পরিবর্তে `v-model` ব্যবহার করতে কোডটিকে রিফ্যাক্টর করার চেষ্টা করুন।
