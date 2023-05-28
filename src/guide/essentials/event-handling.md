# Event Handling {#event-handling}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="বিনামূল্যে Vue.js Events পাঠ"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="বিনামূল্যে Vue.js Events পাঠ"/>
</div>

## Listening to Events {#listening-to-events}

DOM ইভেন্টগুলি শোনার জন্য এবং ট্রিগার হয়ে গেলে কিছু জাভাস্ক্রিপ্ট চালানোর জন্য আমরা `v-on` নির্দেশিকা ব্যবহার করতে পারি, যেটিকে আমরা সাধারণত `@` চিহ্নে ছোট করি। ব্যবহার হবে `v-on:click="handler"` অথবা শর্টকাট সহ, `@click="handler"`।

হ্যান্ডলার মান নিম্নলিখিতগুলির মধ্যে একটি হতে পারে:

1. **ইনলাইন হ্যান্ডলার:** ইভেন্টটি ট্রিগার হলে ইনলাইন জাভাস্ক্রিপ্ট চালানো হবে (নেটিভ `অনক্লিক` অ্যাট্রিবিউটের মতো)।

2. **পদ্ধতি হ্যান্ডলার:** একটি সম্পত্তির নাম বা পথ যা উপাদানে সংজ্ঞায়িত একটি পদ্ধতি নির্দেশ করে।

## Inline Handlers {#inline-handlers}

ইনলাইন হ্যান্ডলারগুলি সাধারণত সাধারণ ক্ষেত্রে ব্যবহৃত হয়, উদাহরণস্বরূপ:

<div class="composition-api">

```js
const count = ref(0)
```

</div>
<div class="options-api">

```js
data() {
  return {
    count: 0
  }
}
```

</div>

```vue-html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNo9jssKgzAURH/lko0tgrbbEqX+Q5fZaLxiqHmQ3LgJ+fdqFZcD58xMYp1z1RqRvRgP0itHEJCia4VR2llPkMDjBBkmbzUUG1oII4y0JhBIGw2hh2Znbo+7MLw+WjZ/C4TaLT3hnogPkcgaeMtFyW8j2GmXpWBtN47w5PWBHLhrPzPCKfWDXRHmPsCAaOBfgSOkdH3IGUhpDBWv9/e8vsZZ/gFFhFJN)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNo9jcEKgzAQRH9lyKlF0PYqqdR/6DGXaLYo1RjiRgrivzepIizLzu7sm1XUzuVLIFEKObe+d1wpS183eYahtw4DY1UWMJr15ZpmxYAnDt7uF0BxOwXL5Evc0kbxlmyxxZLFyY2CaXSDZkqKZROYJ4tnO/Tt56HEgckyJaraGNxlsVt2u6teHeF40s20EDo9oyGy+CPIYF1xULBt4H6kOZeFiwBZnOFi+wH0B1hk)

</div>

## Method Handlers {#method-handlers}

যদিও অনেক ইভেন্ট হ্যান্ডলারের যুক্তি আরও জটিল হবে, এবং সম্ভবত ইনলাইন হ্যান্ডলারদের সাথে সম্ভব নয়। এই কারণেই `v-on` আপনি কল করতে চান এমন একটি উপাদান পদ্ধতির নাম বা পথও গ্রহণ করতে পারে।

উদাহরণ স্বরূপ:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // `this` inside methods points to the current active instance
    alert(`Hello ${this.name}!`)
    // `event` is the native DOM event
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet` is the name of the method defined above -->
<button @click="greet">Greet</button>
```

<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNpVj0FLxDAQhf/KMwjtXtq7dBcFQS/qzVMOrWFao2kSkkkvpf/dJIuCEBgm771vZnbx4H23JRJ3YogqaM+IxMlfpNWrd4GxI9CMA3NwK5psbaSVVjkbGXZaCediaJv3RN1XbE5FnZNVrJ3FEoi4pY0sn7BLC0yGArfjMxnjcLsXQrdNJtFxM+Ys0PcYa2CEjuBPylNYb4THtxdUobj0jH/YX3D963gKC5WyvGZ+xR7S5jf01yPzeblhWr2ZmErHw0dizivfK6PV91mKursUl6dSh/4qZ+vQ/+XE8QODonDi)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNplUE1LxDAQ/StjEbYL0t5LXRQEvag3Tz00prNtNE1CMilC6X83SUkRhJDJfLz3Jm8tHo2pFo9FU7SOW2Ho0in8MdoSDHhlXhKsnQIYGLHyvL8BLJK3KmcAis3YwOnDY/XlTnt1i2G7i/eMNOnBNRkwWkQqcUFFByVAXUNPk3A9COXEgBkGRgtFDkgDTQjcWxuAwDiJBeMsMcUxszCJlsr+BaXUcLtGwiqut930579KST1IBd5Aqlgie3p/hdTIk+IK//bMGqleEbMjxjC+BZVDIv0+m9CpcNr6MDgkhLORjDBm1H56Iq3ggUvBv++7IhnUFZfnGNt6b4fRtj5wxfYL9p+Sjw==)

</div>

একটি মেথড হ্যান্ডলার স্বয়ংক্রিয়ভাবে নেটিভ DOM ইভেন্ট অবজেক্ট গ্রহণ করে যা এটিকে ট্রিগার করে - উপরের উদাহরণে, আমরা `event.target.tagName` এর মাধ্যমে ইভেন্টটি পাঠানোর উপাদানটি অ্যাক্সেস করতে সক্ষম।

<div class="composition-api">

আরো দেখুন: [Typing Event Handlers](/guide/typescript/composition-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

আরো দেখুন: [Typing Event Handlers](/guide/typescript/options-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### Method vs. Inline Detection {#method-vs-inline-detection}

টেমপ্লেট কম্পাইলার `v-on` মান স্ট্রিং একটি বৈধ জাভাস্ক্রিপ্ট শনাক্তকারী বা সম্পত্তি অ্যাক্সেস পাথ কিনা তা পরীক্ষা করে পদ্ধতি হ্যান্ডলার সনাক্ত করে। উদাহরণস্বরূপ, `foo`, `foo.bar` এবং `foo['bar']` কে পদ্ধতি হ্যান্ডলার হিসাবে বিবেচনা করা হয়, যখন `foo()` এবং `count++` কে ইনলাইন হ্যান্ডলার হিসাবে বিবেচনা করা হয়।

## Calling Methods in Inline Handlers {#calling-methods-in-inline-handlers}

একটি পদ্ধতির নামের সাথে সরাসরি আবদ্ধ হওয়ার পরিবর্তে, আমরা একটি ইনলাইন হ্যান্ডলারে পদ্ধতিগুলিকে কল করতে পারি। এটি আমাদের নেটিভ ইভেন্টের পরিবর্তে পদ্ধতি কাস্টম আর্গুমেন্ট পাস করতে দেয়:

<div class="composition-api">

```js
function say(message) {
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  say(message) {
    alert(message)
  }
}
```

</div>

```vue-html
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

<div class="composition-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp9jTEOwjAMRa8SeSld6I5CBWdg9ZJGBiJSN2ocpKjq3UmpFDGx+Vn//b/ANYTjOxGcQEc7uyAqkqTQI98TW3ETq2jyYaQYzYNatSArZTzNUn/IK7Ludr2IBYTG4I3QRqKHJFJ6LtY7+zojbIXNk7yfmhahv5msvqS7PfnHGjJVp9w/hu7qKKwfEd1NSg==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNptjUEKwjAQRa8yZFO7sfsSi57B7WzGdjTBtA3NVC2ldzehEFwIw8D7vM9f1cX742tmVSsd2sl6aXDgjx8ngY7vNDuBFQeAnsWMXagToQAEWg49h0APLncDAIUcT5LzlKJsqRBfPF3ljQjCvXcknEj0bRYZBzi3zrbPE6o0UBhblKiaKy1grK52J/oA//23IcmNBD8dXeVBtX0BF0pXsg==)

</div>

## Accessing Event Argument in Inline Handlers {#accessing-event-argument-in-inline-handlers}

কখনও কখনও আমাদের একটি ইনলাইন হ্যান্ডলারে মূল DOM ইভেন্ট অ্যাক্সেস করতে হবে। আপনি বিশেষ `$event` ভেরিয়েবল ব্যবহার করে একটি পদ্ধতিতে এটি পাস করতে পারেন, অথবা একটি ইনলাইন তীর ফাংশন ব্যবহার করতে পারেন:

```vue-html
<!-- using $event special variable -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // now we have access to the native event
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  warn(message, event) {
    // now we have access to the native event
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## Event Modifiers {#event-modifiers}

ইভেন্ট হ্যান্ডলারের ভিতরে `event.preventDefault()` বা `event.stopPropagation()` কল করা খুবই সাধারণ প্রয়োজন। যদিও আমরা এটি সহজে পদ্ধতিগুলির ভিতরে করতে পারি, তবে এটি ভাল হবে যদি পদ্ধতিগুলি DOM ইভেন্টের বিবরণের সাথে মোকাবিলা করার পরিবর্তে কেবলমাত্র ডেটা লজিক সম্পর্কে হতে পারে।

এই সমস্যার সমাধান করতে, Vue `v-on`-এর জন্য **ইভেন্ট মডিফায়ার** প্রদান করে। মনে রাখবেন যে মডিফায়ারগুলি একটি বিন্দু দ্বারা নির্দেশিত নির্দেশমূলক পোস্টফিক্স।

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
```

::: tip
সংশোধক ব্যবহার করার সময় অর্ডার গুরুত্বপূর্ণ কারণ প্রাসঙ্গিক কোড একই ক্রমে তৈরি হয়। তাই `@click.prevent.self` ব্যবহার করলে **এলিমেন্টের নিজের এবং এর বাচ্চাদের উপর ক্লিকের ডিফল্ট অ্যাকশন আটকাবে**, যেখানে `@click.self.prevent` শুধুমাত্র এলিমেন্টে ক্লিকের ডিফল্ট অ্যাকশন প্রতিরোধ করবে।
:::

`.capture`, `.once` এবং `.passive` মডিফায়ারগুলি [নেটিভ `addEventListener` পদ্ধতির বিকল্পগুলি](https://developer.mozilla.org/en-US/docs/Web/API/) মিরর করে EventTarget/addEventListener#options):

```vue-html
<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>
```

`.প্যাসিভ` সংশোধকটি সাধারণত স্পর্শ ইভেন্ট শ্রোতাদের জন্য ব্যবহৃত হয়[improving performance on mobile devices](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners).

::: tip
`.passive` এবং `.prevent` একসাথে ব্যবহার করবেন না, কারণ `.passive` ইতিমধ্যেই ব্রাউজারকে নির্দেশ করে যে আপনি ইভেন্টের ডিফল্ট আচরণ রোধ করতে চান না, এবং আপনি যদি তা করেন তাহলে সম্ভবত আপনি ব্রাউজার থেকে একটি সতর্কতা দেখতে পাবেন .
:::

## Key Modifiers {#key-modifiers}

কীবোর্ড ইভেন্টগুলির জন্য শোনার সময়, আমাদের প্রায়শই নির্দিষ্ট কীগুলি পরীক্ষা করতে হবে। Vue মূল ইভেন্টগুলি শোনার সময় `v-on` বা `@`-এর জন্য কী মডিফায়ার যোগ করার অনুমতি দেয়:

```vue-html
<!-- only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />
```

আপনি সরাসরি [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) এর মাধ্যমে উন্মোচিত যেকোন বৈধ কী নামগুলিকে পরিবর্তন করে পরিবর্তনকারী হিসাবে ব্যবহার করতে পারেন কাবাব-কেস।

```vue-html
<input @keyup.page-down="onPageDown" />
```

উপরের উদাহরণে, হ্যান্ডলারকে শুধুমাত্র তখনই ডাকা হবে যদি `$event.key` `'PageDown'` এর সমান হয়।

### Key Aliases {#key-aliases}

Vue সর্বাধিক ব্যবহৃত কীগুলির জন্য উপনাম প্রদান করে:

- `.enter`
- `.tab`
- `.delete` ("Delete" এবং "Backspace" কী উভয়ই captures করে)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### System Modifier Keys {#system-modifier-keys}

মাউস বা কীবোর্ড ইভেন্ট শ্রোতাদের ট্রিগার করার জন্য আপনি নিম্নলিখিত সংশোধকগুলি ব্যবহার করতে পারেন শুধুমাত্র যখন সংশ্লিষ্ট মডিফায়ার কী চাপা হয়:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Note
Macintosh কীবোর্ডে, মেটা হল কমান্ড কী (⌘)। উইন্ডোজ কীবোর্ডে, মেটা হল উইন্ডোজ কী (⊞)। সান মাইক্রোসিস্টেম কীবোর্ডে, মেটাকে একটি কঠিন হীরা (◆) হিসাবে চিহ্নিত করা হয়। কিছু কীবোর্ডে, বিশেষ করে এমআইটি এবং লিস্প মেশিন কীবোর্ড এবং উত্তরসূরি, যেমন নাইট কীবোর্ড, স্পেস-ক্যাডেট কীবোর্ড, মেটাকে "META" লেবেল করা হয়। সিম্বলিক্স কীবোর্ডে, মেটাকে "META" বা "Meta" লেবেল করা হয়।
:::

উদাহরণ স্বরূপ:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

::: tip
নোট করুন যে মডিফায়ার কীগুলি নিয়মিত কী থেকে আলাদা এবং যখন `keyup` ইভেন্টের সাথে ব্যবহার করা হয়, ইভেন্টটি নির্গত হলে সেগুলিকে টিপতে হবে। অন্য কথায়, `keyup.ctrl` শুধুমাত্র তখনই ট্রিগার করবে যদি আপনি `ctrl` চেপে ধরে একটি কী ছেড়ে দেন। আপনি একা `ctrl` কী ছেড়ে দিলে এটি ট্রিগার হবে না।
:::

### `.exact` Modifier {#exact-modifier}

`.exact` সংশোধক একটি ইভেন্ট ট্রিগার করার জন্য প্রয়োজনীয় সিস্টেম মডিফায়ারগুলির সঠিক সমন্বয় নিয়ন্ত্রণের অনুমতি দেয়।

```vue-html
<!-- this will fire even if Alt or Shift is also pressed -->
<button @click.ctrl="onClick">A</button>

<!-- this will only fire when Ctrl and no other keys are pressed -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- this will only fire when no system modifiers are pressed -->
<button @click.exact="onClick">A</button>
```

## Mouse Button Modifiers {#mouse-button-modifiers}

- `.left`
- `.right`
- `.middle`

এই মডিফায়ারগুলি হ্যান্ডলারকে একটি নির্দিষ্ট মাউস বোতাম দ্বারা ট্রিগার করা ইভেন্টগুলিতে সীমাবদ্ধ করে।
