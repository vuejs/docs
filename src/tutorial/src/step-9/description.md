# Lifecycle and Template Refs {#lifecycle-and-template-refs}

এখন পর্যন্ত, Vue আমাদের জন্য সমস্ত DOM আপডেট পরিচালনা করছে, প্রতিক্রিয়াশীলতা এবং ঘোষণামূলক রেন্ডারিংয়ের জন্য ধন্যবাদ। যাইহোক, অনিবার্যভাবে এমন কিছু ক্ষেত্রে থাকবে যেখানে আমাদের DOM-এর সাথে ম্যানুয়ালি কাজ করতে হবে।

আমরা <a target="_blank" href="/api/built-in-special-attributes.html#ref">বিশেষ ব্যবহার করে একটি **template ref** - অর্থাৎ টেমপ্লেটের একটি উপাদানের রেফারেন্সের জন্য অনুরোধ করতে পারি `ref` অ্যাট্রিবিউট</a>:

```vue-html
<p ref="pElementRef">hello</p>
```

<div class="composition-api">

রেফারেন্স অ্যাক্সেস করার জন্য, আমাদেরকে মিলিত নামের সাথে একটি ref <span class="html"> এবং প্রকাশ</span> করতে হবে:

<div class="sfc">

```js
const pElementRef = ref(null)
```

</div>
<div class="html">

```js
setup() {
  const pElementRef = ref(null)

  return {
    pElementRef
  }
}
```

</div>

লক্ষ্য করুন রেফটি `null` মান দিয়ে আরম্ভ করা হয়েছে। কারণ <span class="sfc">`<script setup>`</span><span class="html">`setup()`</span> সম্পাদিত হলে উপাদানটি এখনও বিদ্যমান নেই৷ টেমপ্লেট রেফ শুধুমাত্র কম্পোনেন্ট **mounted** করার পরেই অ্যাক্সেসযোগ্য।

মাউন্টের পরে কোড চালানোর জন্য, আমরা `onMounted()` ফাংশন ব্যবহার করতে পারি:

<div class="sfc">

```js
import { onMounted } from 'vue'

onMounted(() => {
  // component is now mounted.
})
```

</div>
<div class="html">

```js
import { onMounted } from 'vue'

createApp({
  setup() {
    onMounted(() => {
      // component is now mounted.
    })
  }
})
```

</div>
</div>

<div class="options-api">

উপাদানটি `this.$refs`-এ `this.$refs.pElementRef` হিসেবে প্রকাশ করা হবে। যাইহোক, কম্পোনেন্ট **mounted** হওয়ার পরেই আপনি এটি অ্যাক্সেস করতে পারবেন।

mount পরে কোড চালানোর জন্য, আমরা 'mounted' option ব্যবহার করতে পারি:

<div class="sfc">

```js
export default {
  mounted() {
    // component is now mounted.
  }
}
```

</div>
<div class="html">

```js
createApp({
  mounted() {
    // component is now mounted.
  }
})
```

</div>
</div>

এটিকে **lifecycle hook** বলা হয় - এটি আমাদেরকে কম্পোনেন্টের জীবনচক্রের নির্দিষ্ট সময়ে কল করার জন্য একটি কলব্যাক নিবন্ধন করতে দেয়। অন্যান্য হুক আছে যেমন <span class="options-api">`created` এবং `updated`</span><span class="composition-api">`onUpdated` এবং `onUnmounted`</span>। আরো বিস্তারিত জানার জন্য <a target="_blank" href="/guide/essentials/lifecycle.html#lifecycle-diagram">লাইফসাইকেল ডায়াগ্রাম</a> দেখুন।

এখন, <span class="options-api">a `mounted`</span><span class="composition-api">একটি `onMounted`</span> হুক যোগ করার চেষ্টা করুন, `<p>` অ্যাক্সেস করুন <span class="options-api">`this.$refs.pElementRef`</span><span class="composition-api">`pElementRef.value`</span> এর মাধ্যমে, এবং কিছু সরাসরি DOM অপারেশন সম্পাদন করুন এটি (যেমন এর `textContent` পরিবর্তন করা)।
