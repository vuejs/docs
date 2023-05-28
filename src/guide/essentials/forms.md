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
`v-model` যেকোনো ফর্ম উপাদানে পাওয়া প্রাথমিক `value`, `checked` বা `selected` বৈশিষ্ট্যগুলিকে উপেক্ষা করবে। এটি সর্বদা বর্তমান আবদ্ধ জাভাস্ক্রিপ্ট অবস্থাকে সত্যের উৎস হিসাবে বিবেচনা করবে। আপনি জাভাস্ক্রিপ্ট পাশে প্রাথমিক মান ঘোষণা করা উচিত, ব্যবহার করে<span class="options-api"> [`data`](/api/options-state.html#data) অপশন</span><span class="composition-api">[reactivity APIs](/api/reactivity-core.html#reactivity-api-core)</span>.
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

[চেষ্টা করুন](https://play.vuejs.org/#eNo9jUEOgyAQRa8yYUO7aNkbNOkBegM2RseWRGACoxvC3TumxuX/+f+9ql5Ez31D1SlbpuyJoSBvNLjoA6XMUCHjAg2WnAJomWoXXZxSLAwBSxk/CP2xuWl9d9GaP0YAEhgDrSOjJABLw/s8+NJBrde/NWsOpWPrI20M+yOkGdfeqXPiFAhowm9aZ8zS4+wPv/RGjtZcJtV+YpNK1g==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNo9jdEKwjAMRX8l9EV90L2POvAD/IO+lDVqoetCmw6h9N/NmBuEJPeSc1PVg+i2FFS90nlMnngwEb80JwaHL1sCQzURwFm258u2AyTkkuKuACbM2b6xh9Nps9o6pEnp7ggWwThRsIyiADQNz40En3uodQ+C1nRHK8HaRyoMy3WaHYa7Uf8To0CCRvzMwWESH51n4cXvBNTd8Um1H0FuTq0=)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNo9jktuwzAMRK9CaON24XrvKgZ6gN5AG8FmGgH6ECKdJjB891D5LYec9zCb+SH6Oq9oRmN5roEEGGWlyeWQqFSBDSoeYYdjLQk6rXYuuzyXzAIJmf0fwqF1Prru02U7PDQq0CCYKHrBlsQy+Tz9rlFCDBnfdOBRqfa7twhYrhEPzvyfgmCvnxlHoIp9w76dmbbtDe+7HdpaBQUv4it6OPepLBjV8Gw5AzpjxlOJC1a9+2WB1IZQRGhWVqsdXgb1tfDcbvYbJDRqLQ==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNo9jk2OwyAMha9isenMIpN9hok0B+gN2FjBbZEIscDpj6LcvaZpKiHg2X6f32L+mX+uM5nO2DLkwNK7RHeesoCnE85RYHEJwKPg1/f2B8gkc067AhipFDxTB4fDVlrro5ce237AKoRGjihUldjCmPqjLgkxJNoxEEqnrtp7TTEUeUT6c+Z2CUKNdgbdxZmaavt1pl+Wj3ldbcubUegumAnh2oyTp6iE95QzoDEGukzRU9Y6eg9jDcKRoFKLUm27E5RXxTu7WZ89/G4E)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNpVjssKgzAURH/lko3tonVfotD/yEaTKw3Ni3gjLSH/3qhUcDnDnMNk9gzhviRkD8ZnGXUgmJFS6IXTNvhIkCHiBAWm6C00ddoIJ5z0biaQL5RvVNCtmwvFhFfheLuLqqIGQhvMQLgm4tqFREDfgJ1gGz36j2Cg1TkvN+sVmn+JqnbtrjDDiAYmH09En/PxphTebqsK8PY4wMoPslBUxQ==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNpVjtEKgzAMRX8l9Gl72Po+OmH/0ZdqI5PVNnSpOEr/fVVREEKSc0kuN4sX0X1KKB5Cfbs4EDfa40whMljsTXIMWXsAa9hcrtsOEJFT9DsBdG/sPmgfwDHhJpZl1FZLycO6AuNIzjAuxGrwlBj4R/jUYrVpw6wFDPbM020MFt0uoq2a3CycadFBH+Lpo8l5jwWlKLle1QcljwCi/AH7gFic)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNqVkUtqwzAURbfy0CTtoNU8KILSWaHdQNWBIj8T1fohyybBeO+RbOc3i2e+vHvuMWggHyG89x2SLWGtijokaDF1gQunbfAxwQARaxihjt7CJlc3wgmnvGsTqAOqBqsfabGFXSm+/P69CsfovJVXckhog5EJcwJgle7558yBK+AWhuFxaRwZLbVCZ0K70CVIp4A7Qabi3h8FAV3l/C9Vk797abpy/lrim/UVmkt/Gc4HOv+EkXs0UPt4XeCFZHQ6lM4TZn9w9+YlrjFPCC/kKrPVDd6Zv5e4wjwv8ELezIxeX4qMZwHduAs=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqVUc1qxCAQfpXBU3tovS9WKL0V2hdoenDjLGtjVNwxbAl592rMpru3DYjO5/cnOLLXEJ6HhGzHxKmNJpBsHJ6DjwQaDypZgrFxAFqRenisM0BEStFdEEB7xLZD/al6PO3g67veT+XIW16Cr+kZEPbBKsKMAIQ2g3yrAeBqwjjeRMI0CV5kxZ0dxoVEQL8BXxo2C/f+3DAwOuMf1XZ5HpRNhX5f4FPvNdqLfgnOBK+PsGqPFg4+rgmyOAWfiaK5o9kf3XXzArc0zxZZnJuae9PhVfPHAjc01wRZnP/Ngq8/xaY/yMW74g==)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNqFkDFuwzAMRa9CaHE7tNoDxUBP0A4dtTgWDQiRJUKmHQSG7x7KhpMMAbLxk3z/g5zVD9H3NKI6KDO02RPDgDxSbaPvKWWGGTJ2sECXUw+VrFY22timODCQb8/o4FhWPqrfiNWnjUZvRmIhgrGn0DCKAjDOT/XfCh1gnnd+WYwukwJYNj7SyMBXwqNVuXE+WQXeiUgRpZyaMJaR5BX11SeHQfTmJi1dnNiE5oQBupR3shbC6LX9Posvpdyz/jf1OksOe85ayVqIR5bR9z+o5Qbc6oCk)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqNkEEOAiEMRa/SsFEXyt7gJJ5AFy5ng1ITIgLBMmomc3eLOONSEwJ9Lf//pL3YxrjqMoq1ULdTspGa1uMjhkRg8KyzI+hbD2A06fmi1gAJKSc/EkC0pwuaNcx2Hme1OZSHLz5KTtYMhNfoNGEhUsZ2zf6j7vuPEQyDkmVSBPzJ+pgJ6Blx04qkjQ2tAGsYgkcuO+1yGXF6oeU1GHTM1Y1bsoY5fUQH55BGZcMKJd/t31l0L+WYdaj0V9Zb2bDim6XktAcxvADR+YWb)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNp1j7EOgyAQhl/lwmI7tO4Nmti+QJOuLFTPxASBALoQ3r2H2jYOjvff939wkTXWXucJ2Y1x37rBBvAYJlsLPYzWuAARHPaQoHdmhILQQmihW6N9RhW2ATuoMnQqirPQvFw9ZKAh4GiVDEgTAPdW6hpeW+sGMf4VKVEz73Mvs8sC5stoOlSVYF9SsEVGiLFhMBq6wcu3IsUs1YREEvFUKD1udjAaebnS+27dHOT3g/yxy+nHywM08PJ3KksfXwJ2dA==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp1j1ELgyAUhf/KxZe2h633cEHbHxjstReXdxCYSt5iEP333XIJPQSinuN3jjqJyvvrOKAohAxN33oqa4tf73oCjR81GIKptgBakTqd4x6gRxp6uymAgAYbQl1AlkVvXhaeeMg8NbMg7LxRhKwAZPDKlvBK8WlKXTDPnFzOI7naMF46p9HcarFxtVgBRpyn1lnQbVBvwwWjMgMyycTToAr47wZnUeaR3mfL6sC/H/iPnc/vXS9gIfP0UTH/ACgWeYE=)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNp1kL2OwjAQhF9l5Ya74i7QBhMJeARKTIESIyz5Z5VsAsjyu7NOQEBB5xl/M7vaKNaI/0OvRSlkV7cGCTpNPVbKG4ehJYjQ6hMkOLXBwYzRmfLK18F3GbW6Jt3AKkM/+8Ov8rKYeriBBWmH9kiaFYBszFDtHpkSYnwVpCSL/JtDDE4+DH8uNNqulHiCSoDrLRm0UyWzAckEX61l8Xh9+psv/vbD563HCSxk8bY0y45u47AJ2D/HHyDm4MU0dC5hMZ/jdal8Gg8wJkS6A3nRew4=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp1UEEOgjAQ/MqmJz0oeMVKgj7BI3AgdI1NCjSwIIbwdxcqRA4mTbsznd2Z7CAia49diyIQsslrbSlMSuxtVRMofGStIRiSEkBllO32rgaokdq6XBBAgwZzQhVAnDpunB6++EhvncyAsLAmI2QEIJXuwvvaPAzrJBhH6U2/UxMLHQ/doagUmksiFmEioOCU2ho3krWVJV2VYSS9b7Xlr3/424bn1LMDA+n9hGbY0Hs2c4J4sU/dPl5a0TOAk+/b/rwsYO4Q4wdtRX7l)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNplkMFugzAQRH9l5YtbKYU7IpFoP6CH9lb3EMGiWgLbMguthPzvXduEJMqNYUazb7yKxrlimVFUop5arx3BhDS7kzJ6dNYTrOCxhwC9tyNIjkpllGmtmWJ0wJawg2MMPclGPl9N60jzx+Z9KQPcRfhHFch3g/IAy3mYkVUjIRzu/M9fe+O/Pvo/Hm8b3jihzDdfr8s8gwewIBzdcCZkBVBnXFheRtvhcFTiwq9ECnAkQ3Okt54Dm9TmskYJqNLR3SyS3BsYct3CRYSFwGCpusx/M0qZTydKRXWnl9PHBlPFhv1lQ6jL6MZl+xoR/gFjPZTD)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp1kMFqxCAQhl9l8JIWtsk92IVtH6CH9lZ7COssDbgqZpJdCHn3nWiUXBZE/Mdvxv93Fifv62lE0Qo5nEPv6ags3r0LBBov3WgIZmUBdEfdy2s6AwSkMdisAAY0eCbULVSn6pCrzlPv7NDCb64AzEB4J+a+LFYHmDozYuyCpfTtqJ+b21Efz6j/gPtpn8xl7C8douaNl2xKUhaEV286QlYAMgWB6e3qNJp3JXIyJSLASErFyMUFBjbZ2xxXCWijkXJZR1kmsPF5g+s1ACybWdmkarLSpKejS0VS99Pxu3wzT8jOuF026+2arKQRywOBGJfE)

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

HTML এর অন্তর্নির্মিত ইনপুট প্রকারগুলি সর্বদা আপনার চাহিদা পূরণ করবে না। ভাগ্যক্রমে, Vue উপাদানগুলি আপনাকে সম্পূর্ণরূপে কাস্টমাইজড আচরণের সাথে পুনরায় ব্যবহারযোগ্য ইনপুট তৈরি করতে দেয়। এই ইনপুটগুলি এমনকি `v-model` এর সাথেও কাজ করে! আরও জানতে, কম্পোনেন্টস গাইডে [`v-model` এর সাথে ব্যবহার](/guide/components/v-model) সম্পর্কে পড়ুন।
