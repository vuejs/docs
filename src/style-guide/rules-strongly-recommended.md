# অগ্রাধিকার B নিয়ম: দৃঢ়ভাবে প্রস্তাবিত {#priority-b-rules-strongly-recommended}

বেশিরভাগ প্রকল্পে পঠনযোগ্যতা এবং/অথবা বিকাশকারীর অভিজ্ঞতা উন্নত করতে এই নিয়মগুলি পাওয়া গেছে। আপনি যদি সেগুলি লঙ্ঘন করেন তবে আপনার কোড এখনও চলবে, তবে লঙ্ঘনগুলি বিরল এবং যথাযথ হওয়া উচিত৷

## কম্পোনেন্ট ফাইল {#component-files}

**যখনই একটি বিল্ড সিস্টেম ফাইলগুলিকে সংযুক্ত করার জন্য উপলব্ধ থাকে, প্রতিটি উপাদান তার নিজস্ব ফাইলে থাকা উচিত।**

এটি আপনাকে আরও দ্রুত একটি উপাদান খুঁজে পেতে সাহায্য করে যখন আপনাকে এটি সম্পাদনা করতে হবে বা কীভাবে এটি ব্যবহার করতে হবে তা পর্যালোচনা করতে হবে।

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
app.component('TodoList', {
  // ...
})

app.component('TodoItem', {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- TodoList.js
|- TodoItem.js
```

```
components/
|- TodoList.vue
|- TodoItem.vue
```

</div>

## একক-ফাইল উপাদান ফাইলের নাম আবরণ {#single-file-component-filename-casing}

**[একক-ফাইল উপাদান](/guide/scaling-up/sfc) এর ফাইলের নাম হয় সর্বদা PascalCase বা সর্বদা কাবাব-কেস হওয়া উচিত।**

PascalCase কোড এডিটরগুলিতে স্বয়ংসম্পূর্ণতার সাথে সর্বোত্তম কাজ করে, কারণ যেখানেই সম্ভব আমরা JS(X) এবং টেমপ্লেটগুলিতে উপাদানগুলিকে কীভাবে উল্লেখ করি তার সাথে এটি সামঞ্জস্যপূর্ণ। যাইহোক, মিশ্র কেস ফাইলের নাম কখনও কখনও কেস-অসংবেদনশীল ফাইল সিস্টেমে সমস্যা তৈরি করতে পারে, যে কারণে কাবাব-কেসও পুরোপুরি গ্রহণযোগ্য।

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- MyComponent.vue
```

```
components/
|- my-component.vue
```

</div>

## মূল উপাদানের নাম {#base-component-names}

**বেস উপাদান (ওরফে উপস্থাপনামূলক, মূক বা বিশুদ্ধ উপাদান) যেগুলি অ্যাপ-নির্দিষ্ট স্টাইলিং এবং নিয়মাবলী প্রয়োগ করে সবগুলি একটি নির্দিষ্ট উপসর্গ দিয়ে শুরু হওয়া উচিত, যেমন `Base`, `App` বা `V`।**

::: details বিস্তারিত ব্যাখ্যা
এই উপাদানগুলি আপনার অ্যাপ্লিকেশনে সামঞ্জস্যপূর্ণ স্টাইলিং এবং আচরণের ভিত্তি স্থাপন করে। তারা **শুধু** থাকতে পারে:

- এইচটিএমএল উপাদান,
- অন্যান্য বেস উপাদান, এবং
- তৃতীয় পক্ষের UI উপাদান।

কিন্তু তারা **কখনই** গ্লোবাল state ব্যবহার করবে না (যেমন একটি [Pinia](https://pinia.vuejs.org/) store এ থেকে)।

তাদের নামের মধ্যে প্রায়শই তারা মোড়ানো একটি উপাদানের নাম অন্তর্ভুক্ত করে (যেমন `BaseButton`, `BaseTable`), যদি না কোনো উপাদান তাদের নির্দিষ্ট উদ্দেশ্যে (যেমন `BaseIcon`) বিদ্যমান না থাকে। আপনি যদি আরও নির্দিষ্ট প্রেক্ষাপটের জন্য অনুরূপ উপাদান তৈরি করেন, তাহলে তারা প্রায় সবসময় এই উপাদানগুলিকে গ্রাস করবে (যেমন `ButtonSubmit`-এ `BaseButton` ব্যবহার করা যেতে পারে)।

এই কনভেনশনের কিছু সুবিধা:

- এডিটরগুলিতে বর্ণানুক্রমিকভাবে সংগঠিত হলে, আপনার অ্যাপের বেস উপাদানগুলি একসাথে তালিকাভুক্ত করা হয়, যাতে তাদের সনাক্ত করা সহজ হয়৷

- যেহেতু উপাদানের নামগুলি সর্বদা বহু-শব্দ হওয়া উচিত, তাই এই সম্মেলন আপনাকে সাধারণ উপাদান মোড়কের (যেমন `MyButton`, `VueButton`) জন্য একটি নির্বিচারী উপসর্গ চয়ন করতে বাধা দেয়।

- যেহেতু এই উপাদানগুলি প্রায়শই ব্যবহার করা হয়, আপনি সেগুলিকে সর্বত্র আমদানি করার পরিবর্তে কেবল বিশ্বব্যাপী করতে চাইতে পারেন৷ একটি উপসর্গ ওয়েবপ্যাকের সাথে এটি সম্ভব করে:

  ```js
  const requireComponent = require.context(
    './src',
    true,
    /Base[A-Z]\w+\.(vue|js)$/
  )
  requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig =
      baseComponentConfig.default || baseComponentConfig
    const baseComponentName =
      baseComponentConfig.name ||
      fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    app.component(baseComponentName, baseComponentConfig)
  })
  ```

  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

```
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```

```
components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

</div>

## একক-ইন্সট্যান্স উপাদানের নাম {#single-instance-component-names}

**যে উপাদানগুলিতে শুধুমাত্র একটি সক্রিয় দৃষ্টান্ত থাকা উচিত সেগুলিকে `The` উপসর্গ দিয়ে শুরু করা উচিত, বোঝানোর জন্য যে শুধুমাত্র একটি থাকতে পারে।**

এর মানে এই নয় যে কম্পোনেন্টটি শুধুমাত্র একটি পৃষ্ঠায় ব্যবহার করা হয়, তবে এটি শুধুমাত্র একবার _per page_ ব্যবহার করা হবে। এই উপাদানগুলি কখনই কোনও প্রপ গ্রহণ করে না, কারণ সেগুলি আপনার অ্যাপের জন্য নির্দিষ্ট, আপনার অ্যাপের মধ্যে তাদের প্রসঙ্গ নয়। আপনি যদি প্রপস যোগ করার প্রয়োজন খুঁজে পান, তবে এটি একটি ভাল ইঙ্গিত যে এটি আসলে একটি পুনঃব্যবহারযোগ্য উপাদান যা প্রতি পৃষ্ঠায় একবার ব্যবহার করা হয় _আপাতত_।

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- Heading.vue
|- MySidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

</div>

## দৃঢ়ভাবে সংযুক্ত উপাদান নাম {#tightly-coupled-component-names}

**শিশু উপাদানগুলি যেগুলি তাদের পিতামাতার সাথে দৃঢ়ভাবে সংযুক্ত থাকে তাদের একটি উপসর্গ হিসাবে পিতামাতার উপাদানের নাম অন্তর্ভুক্ত করা উচিত।**

যদি একটি উপাদান শুধুমাত্র একটি একক অভিভাবক উপাদানের প্রেক্ষাপটে অর্থবোধ করে, সেই সম্পর্কটি তার নামে স্পষ্ট হওয়া উচিত। যেহেতু সম্পাদকরা সাধারণত ফাইলগুলিকে বর্ণানুক্রমিকভাবে সংগঠিত করে, তাই এটি এই সম্পর্কিত ফাইলগুলিকে একে অপরের পাশে রাখে।

::: details বিস্তারিত ব্যাখ্যা
আপনি তাদের পিতামাতার নামে নাম করা ডিরেক্টরিগুলিতে শিশু উপাদানগুলি নেস্ট করে এই সমস্যাটি সমাধান করতে প্রলুব্ধ হতে পারেন। উদাহরণ স্বরূপ:

```
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```

or:

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```

এটি সুপারিশ করা হয় না, কারণ এর ফলে:

- একই নামের অনেক ফাইল, কোড এডিটরগুলিতে দ্রুত ফাইল পরিবর্তন করা আরও কঠিন করে তোলে।
- অনেক নেস্টেড সাব-ডিরেক্টরি, যা সম্পাদকের সাইডবারে উপাদান ব্রাউজ করতে সময় বাড়ায়।
  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

</div>

## উপাদানের নামের মধ্যে শব্দের ক্রম {#order-of-words-in-component-names}

**উপাদানের নাম সর্বোচ্চ-স্তরের (প্রায়শই সর্বাধিক সাধারণ) শব্দ দিয়ে শুরু হওয়া উচিত এবং বর্ণনামূলক পরিবর্তনকারী শব্দ দিয়ে শেষ হওয়া উচিত।**

::: details বিস্তারিত ব্যাখ্যা
আপনি হয়তো ভাবছেন:

> "কেন আমরা উপাদানের নামগুলিকে কম প্রাকৃতিক ভাষা ব্যবহার করতে বাধ্য করব?"

স্বাভাবিক ইংরেজিতে, বিশেষণ এবং অন্যান্য বর্ণনাকারী সাধারণত বিশেষ্যের আগে উপস্থিত হয়, যখন ব্যতিক্রমগুলির জন্য সংযোগকারী শব্দের প্রয়োজন হয়। উদাহরণ স্বরূপ:

- Coffee _with_ milk
- Soup _of the_ day
- Visitor _to the_ museum

আপনি যদি চান তবে আপনি অবশ্যই এই সংযোগকারী শব্দগুলিকে উপাদানের নামগুলিতে অন্তর্ভুক্ত করতে পারেন, তবে অর্ডারটি এখনও গুরুত্বপূর্ণ।

এছাড়াও মনে রাখবেন **যাকে "সর্বোচ্চ-স্তর" হিসেবে বিবেচনা করা হয় তা আপনার অ্যাপের সাথে প্রাসঙ্গিক হবে**। উদাহরণস্বরূপ, একটি অনুসন্ধান ফর্ম সহ একটি অ্যাপ কল্পনা করুন। এটি এই ধরনের উপাদান অন্তর্ভুক্ত করতে পারে:

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

আপনি লক্ষ্য করতে পারেন, অনুসন্ধানের জন্য কোন উপাদানগুলি নির্দিষ্ট তা দেখা বেশ কঠিন। এখন নিয়ম অনুসারে উপাদানগুলির নাম পরিবর্তন করা যাক:

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

যেহেতু সম্পাদকরা সাধারণত ফাইলগুলিকে বর্ণানুক্রমিকভাবে সংগঠিত করে, তাই উপাদানগুলির মধ্যে সমস্ত গুরুত্বপূর্ণ সম্পর্ক এখন এক নজরে স্পষ্ট।

আপনি এই সমস্যাটি ভিন্নভাবে সমাধান করতে প্রলুব্ধ হতে পারেন, একটি "অনুসন্ধান" ডিরেক্টরির অধীনে সমস্ত অনুসন্ধান উপাদানগুলিকে নেস্ট করে, তারপর একটি "সেটিংস" ডিরেক্টরির অধীনে সমস্ত সেটিংস উপাদান। আমরা শুধুমাত্র এই কারণগুলির জন্য খুব বড় অ্যাপগুলিতে (যেমন ১০০+ উপাদান) এই পদ্ধতিটি বিবেচনা করার পরামর্শ দিই:

- একটি একক `components` ডিরেক্টরিতে স্ক্রোল করার চেয়ে নেস্টেড সাব-ডিরেক্টরিগুলির মাধ্যমে নেভিগেট করতে সাধারণত বেশি সময় লাগে।
- নামের দ্বন্দ্ব (যেমন একাধিক `ButtonDelete.vue` উপাদান) একটি কোড এডিটরে একটি নির্দিষ্ট উপাদানে দ্রুত নেভিগেট করা আরও কঠিন করে তোলে।
- রিফ্যাক্টরিং আরও কঠিন হয়ে ওঠে, কারণ অনুসন্ধান এবং প্রতিস্থাপন প্রায়শই একটি সরানো উপাদানের আপেক্ষিক রেফারেন্স আপডেট করার জন্য যথেষ্ট নয়।
  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

</div>

## স্ব-বন্ধ উপাদান {#self-closing-components}

**কোন বিষয়বস্তু ছাড়া উপাদানগুলি [সিঙ্গেল-ফাইল কম্পোনেন্টস](/guide/scaling-up/sfc), স্ট্রিং টেমপ্লেট এবং [JSX](/guide/extras/render-function#jsx-tsx) এ স্ব-বন্ধ হওয়া উচিত - কিন্তু কখনোই DOM টেমপ্লেটে নয়।**

যে উপাদানগুলি স্ব-ঘনিষ্ঠ যোগাযোগ করে যে তাদের শুধুমাত্র কোন বিষয়বস্তু নেই, কিন্তু **মানে** কোন বিষয়বস্তু নেই। এটি একটি বইয়ের একটি ফাঁকা পৃষ্ঠা এবং "এই পৃষ্ঠাটি ইচ্ছাকৃতভাবে ফাঁকা রাখা" লেবেলযুক্ত একটির মধ্যে পার্থক্য। আপনার কোডটি অপ্রয়োজনীয় ক্লোজিং ট্যাগ ছাড়াই পরিষ্কার।

দুর্ভাগ্যবশত, HTML কাস্টম উপাদানগুলিকে স্ব-বন্ধ হওয়ার অনুমতি দেয় না - শুধুমাত্র [অফিসিয়াল "ভয়েড" উপাদান](https://www.w3.org/TR/html/syntax.html#void-elements)। এই কারণেই কৌশলটি তখনই সম্ভব যখন Vue-এর টেমপ্লেট কম্পাইলার DOM-এর আগে টেমপ্লেটে পৌঁছাতে পারে, তারপর DOM স্পেক-অনুবর্তী HTML পরিবেশন করতে পারে।

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<!-- In Single-File Components, string templates, and JSX -->
<MyComponent></MyComponent>
```

```vue-html
<!-- In DOM templates -->
<my-component/>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- In Single-File Components, string templates, and JSX -->
<MyComponent/>
```

```vue-html
<!-- In DOM templates -->
<my-component></my-component>
```

</div>

## টেমপ্লেটগুলিতে উপাদানের নাম আবরণ {#component-name-casing-in-templates}

**বেশিরভাগ প্রজেক্টে, কম্পোনেন্টের নাম সবসময় [Single-File Components](/guide/scaling-up/sfc) এবং স্ট্রিং টেমপ্লেটে PascalCase হওয়া উচিত - কিন্তু DOM টেমপ্লেটে কাবাব-কেস।**

কাবাব-কেসের তুলনায় প্যাসকালকেসের কয়েকটি সুবিধা রয়েছে:

- সম্পাদকরা টেমপ্লেটে উপাদানের নাম স্বয়ংসম্পূর্ণ করতে পারে, কারণ PascalCase জাভাস্ক্রিপ্টেও ব্যবহৃত হয়।
- `<MyComponent>` একটি একক-শব্দের HTML উপাদান থেকে `<my-component>` থেকে দৃশ্যতভাবে আলাদা, কারণ দুটি অক্ষরের পার্থক্য রয়েছে (দুটি বড় বড়), একটি (একটি হাইফেন) নয়।
- আপনি যদি আপনার টেমপ্লেটগুলিতে কোনো নন-ভিউ কাস্টম উপাদান ব্যবহার করেন, যেমন একটি ওয়েব উপাদান, PascalCase নিশ্চিত করে যে আপনার Vue উপাদানগুলি স্পষ্টভাবে দৃশ্যমান থাকবে।

দুর্ভাগ্যবশত, HTML-এর ক্ষেত্রে অসংবেদনশীলতার কারণে, DOM টেমপ্লেটগুলিকে এখনও কাবাব-কেস ব্যবহার করতে হবে।

এছাড়াও মনে রাখবেন যে আপনি যদি ইতিমধ্যেই কাবাব-কেস-এ প্রচুর বিনিয়োগ করে থাকেন, তাহলে HTML কনভেনশনের সাথে সামঞ্জস্যতা এবং আপনার সমস্ত প্রকল্পে একই কেসিং ব্যবহার করতে সক্ষম হওয়া উপরে তালিকাভুক্ত সুবিধার চেয়ে বেশি গুরুত্বপূর্ণ হতে পারে। এই ক্ষেত্রে, **সব জায়গায় কাবাব-কেস ব্যবহার করাও গ্রহণযোগ্য।**

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<!-- In Single-File Components and string templates -->
<mycomponent/>
```

```vue-html
<!-- In Single-File Components and string templates -->
<myComponent/>
```

```vue-html
<!-- In DOM templates -->
<MyComponent></MyComponent>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- In Single-File Components and string templates -->
<MyComponent/>
```

```vue-html
<!-- In DOM templates -->
<my-component></my-component>
```

OR

```vue-html
<!-- Everywhere -->
<my-component></my-component>
```

</div>

## JS/JSX-এ কম্পোনেন্ট নামের আবরণ {#component-name-casing-in-js-jsx}

**JS/[JSX](/guide/extras/render-function#jsx-tsx) এ কম্পোনেন্টের নাম সবসময় PascalCase হওয়া উচিত, যদিও সেগুলি সহজ অ্যাপ্লিকেশনের জন্য স্ট্রিং-এর ভিতরে কাবাব-কেস হতে পারে যা শুধুমাত্র গ্লোবাল কম্পোনেন্ট রেজিস্ট্রেশন ব্যবহার করে  `app.component`.**

::: details বিস্তারিত ব্যাখ্যা
JavaScript-এ, PascalCase হল ক্লাস এবং প্রোটোটাইপ কনস্ট্রাক্টরদের জন্য কনভেনশন - মূলত, যেকোন কিছুরই আলাদা উদাহরণ থাকতে পারে। Vue উপাদানগুলিরও উদাহরণ রয়েছে, তাই এটি PascalCase ব্যবহার করাও বোধগম্য। একটি অতিরিক্ত সুবিধা হিসাবে, JSX (এবং টেমপ্লেট) এর মধ্যে PascalCase ব্যবহার করা কোডের পাঠকদের আরও সহজে উপাদান এবং HTML উপাদানগুলির মধ্যে পার্থক্য করতে দেয়।

যাইহোক, যে অ্যাপ্লিকেশানগুলি `app.component` এর মাধ্যমে **শুধু** গ্লোবাল কম্পোনেন্ট সংজ্ঞা ব্যবহার করে, আমরা এর পরিবর্তে কাবাব-কেস সুপারিশ করি। কারণগুলি হল:

- এটা বিরল যে বৈশ্বিক উপাদানগুলি কখনও জাভাস্ক্রিপ্টে উল্লেখ করা হয়েছে, তাই জাভাস্ক্রিপ্টের জন্য একটি নিয়ম অনুসরণ করা কম অর্থবহ৷
- এই অ্যাপ্লিকেশনগুলিতে সর্বদা অনেকগুলি ইন-ডোম টেমপ্লেট অন্তর্ভুক্ত থাকে, যেখানে [কাবাব-কেস **অবশ্যই** ব্যবহার করা উচিত](#কম্পোনেন্ট-নাম-কেসিং-ইন-টেমপ্লেট)।
  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
app.component('myComponent', {
  // ...
})
```

```js
import myComponent from './MyComponent.vue'
```

```js
export default {
  name: 'myComponent'
  // ...
}
```

```js
export default {
  name: 'my-component'
  // ...
}
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
app.component('MyComponent', {
  // ...
})
```

```js
app.component('my-component', {
  // ...
})
```

```js
import MyComponent from './MyComponent.vue'
```

```js
export default {
  name: 'MyComponent'
  // ...
}
```

</div>

## পূর্ণ-শব্দ উপাদানের নাম {#full-word-component-names}

**উপাদানের নামগুলি সংক্ষিপ্ত রূপের চেয়ে সম্পূর্ণ শব্দকে প্রাধান্য দিতে হবে।**

সম্পাদকদের স্বয়ংসম্পূর্ণতা দীর্ঘ নাম লেখার খরচ খুব কম করে তোলে, যখন তারা যে স্পষ্টতা প্রদান করে তা অমূল্য। অস্বাভাবিক সংক্ষেপণ, বিশেষ করে, সবসময় এড়ানো উচিত।

<div class="style-example style-example-bad">
<h3>Bad</h3>

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

</div>

## Prop নামের আবরণ {#prop-name-casing}

**প্রপ নামগুলি ঘোষণার সময় সর্বদা ক্যামেলকেস ব্যবহার করা উচিত। ইন-ডোম টেমপ্লেটের ভিতরে ব্যবহার করা হলে, প্রপগুলি কাবাব-কেস করা উচিত। একক-ফাইল উপাদান টেমপ্লেট এবং [JSX](/guide/extras/render-function#jsx-tsx) কাবাব-কেস বা ক্যামেলকেস প্রপস ব্যবহার করতে পারে। কেসিং সামঞ্জস্যপূর্ণ হওয়া উচিত - আপনি যদি ক্যামেলকেসড প্রপস ব্যবহার করতে চান তবে নিশ্চিত করুন যে আপনি আপনার অ্যাপ্লিকেশনে কাবাব-কেসড ব্যবহার করবেন না**

<div class="style-example style-example-bad">
<h3>Bad</h3>

<div class="options-api">

```js
props: {
  'greeting-text': String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  'greeting-text': String
})
```

</div>

```vue-html
// for in-DOM templates
<welcome-message greetingText="hi"></welcome-message>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

<div class="options-api">

```js
props: {
  greetingText: String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  greetingText: String
})
```

</div>

```vue-html
// for SFC - please make sure your casing is consistent throughout the project
// you can use either convention but we don't recommend mixing two different casing styles
<WelcomeMessage greeting-text="hi"/>
// or
<WelcomeMessage greetingText="hi"/>
```

```vue-html
// for in-DOM templates
<welcome-message greeting-text="hi"></welcome-message>
```

</div>

## মাল্টি-অ্যাট্রিবিউট উপাদান {#multi-attribute-elements}

**একাধিক অ্যাট্রিবিউট সহ উপাদানগুলির একাধিক লাইন বিস্তৃত হওয়া উচিত, প্রতি লাইনে একটি বৈশিষ্ট্য সহ।**

জাভাস্ক্রিপ্টে, একাধিক লাইনে একাধিক বৈশিষ্ট্য সহ অবজেক্টকে বিভক্ত করা ব্যাপকভাবে একটি ভাল নিয়ম হিসাবে বিবেচিত হয়, কারণ এটি পড়া অনেক সহজ। আমাদের টেমপ্লেট এবং [JSX](/guide/extras/render-function#jsx-tsx) একই বিবেচনার যোগ্য।

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
```

```vue-html
<MyComponent foo="a" bar="b" baz="c"/>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

```vue-html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

</div>

## টেমপ্লেটে সরল অভিব্যক্তি {#simple-expressions-in-templates}

**কম্পোনেন্ট টেমপ্লেটগুলিতে কেবলমাত্র সাধারণ অভিব্যক্তিগুলি অন্তর্ভুক্ত করা উচিত, আরও জটিল অভিব্যক্তিগুলি গণনা করা বৈশিষ্ট্য বা পদ্ধতিতে পুনর্বিন্যাস করা উচিত৷**

আপনার টেমপ্লেটের জটিল অভিব্যক্তিগুলি তাদের কম ঘোষণামূলক করে তোলে। আমাদের _কী_ উপস্থিত হওয়া উচিত তা বর্ণনা করার চেষ্টা করা উচিত, _কিভাবে_ আমরা সেই মানটি গণনা করছি না। গণনাকৃত বৈশিষ্ট্য এবং পদ্ধতিগুলি কোডটিকে পুনরায় ব্যবহার করার অনুমতি দেয়।

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
{{
  fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- In a template -->
{{ normalizedFullName }}
```

<div class="options-api">

```js
// The complex expression has been moved to a computed property
computed: {
  normalizedFullName() {
    return this.fullName.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }
}
```

</div>

<div class="composition-api">

```js
// The complex expression has been moved to a computed property
const normalizedFullName = computed(() =>
  fullName.value
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
)
```

</div>

</div>

## সাধারণ গণনা করা বৈশিষ্ট্য {#simple-computed-properties}

**কমপ্লেক্স কম্পিউটেড প্রোপার্টি যতটা সম্ভব সহজ প্রপার্টিতে বিভক্ত করা উচিত।**

::: details বিস্তারিত ব্যাখ্যা
সহজ, সু-নামিত গণনাকৃত বৈশিষ্ট্যগুলি হল:

- **পরীক্ষা করা সহজ**

  যখন প্রতিটি গণনা করা সম্পত্তিতে খুব কম নির্ভরতা সহ শুধুমাত্র একটি খুব সাধারণ অভিব্যক্তি থাকে, তখন এটি সঠিকভাবে কাজ করে কিনা তা নিশ্চিত করে পরীক্ষাগুলি লেখা অনেক সহজ।

- **পড়া সহজ**

  কম্পিউটেড প্রপার্টি সরলীকরণ করা আপনাকে প্রতিটি মানকে একটি বর্ণনামূলক নাম দিতে বাধ্য করে, এমনকি যদি এটি পুনরায় ব্যবহার না করা হয়। এটি অন্যান্য বিকাশকারীদের (এবং ভবিষ্যতে আপনার) জন্য তাদের যত্নশীল কোডে ফোকাস করা এবং কী ঘটছে তা নির্ধারণ করা আরও সহজ করে তোলে।

- **পরিবর্তিত প্রয়োজনীয়তাগুলির সাথে আরও মানিয়ে নেওয়া যায়**

  নামকরণ করা যেতে পারে এমন যেকোনো মান দৃশ্যের জন্য উপযোগী হতে পারে। উদাহরণস্বরূপ, আমরা একটি বার্তা প্রদর্শন করার সিদ্ধান্ত নিতে পারি যা ব্যবহারকারীকে বলে যে তারা কত টাকা সঞ্চয় করেছে। আমরা সেলস ট্যাক্স গণনা করার সিদ্ধান্তও নিতে পারি, তবে চূড়ান্ত মূল্যের অংশ হিসাবে না করে সম্ভবত এটি আলাদাভাবে প্রদর্শন করতে পারি।

  ছোট, ফোকাসড কম্পিউটেড বৈশিষ্ট্যগুলি কীভাবে তথ্য ব্যবহার করা হবে সে সম্পর্কে কম অনুমান করে, তাই প্রয়োজনীয়তা পরিবর্তনের সাথে কম রিফ্যাক্টরিং প্রয়োজন।
  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

<div class="options-api">

```js
computed: {
  price() {
    const basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```

</div>

<div class="composition-api">

```js
const price = computed(() => {
  const basePrice = manufactureCost.value / (1 - profitMargin.value)
  return basePrice - basePrice * (discountPercent.value || 0)
})
```

</div>

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

<div class="options-api">

```js
computed: {
  basePrice() {
    return this.manufactureCost / (1 - this.profitMargin)
  },

  discount() {
    return this.basePrice * (this.discountPercent || 0)
  },

  finalPrice() {
    return this.basePrice - this.discount
  }
}
```

</div>

<div class="composition-api">

```js
const basePrice = computed(
  () => manufactureCost.value / (1 - profitMargin.value)
)

const discount = computed(
  () => basePrice.value * (discountPercent.value || 0)
)

const finalPrice = computed(() => basePrice.value - discount.value)
```

</div>

</div>

## উদ্ধৃত বৈশিষ্ট্য মান {#quoted-attribute-values}

**খালি না HTML অ্যাট্রিবিউটের মানগুলি সর্বদা উদ্ধৃতির ভিতরে থাকা উচিত (একক বা দ্বিগুণ, যেটি JS-এ ব্যবহার করা হয় না)।**

যদিও কোনো স্পেস ছাড়া অ্যাট্রিবিউট ভ্যালুর এইচটিএমএল-এ উদ্ধৃতি থাকার প্রয়োজন হয় না, এই অভ্যাসটি প্রায়শই স্পেস এড়িয়ে চলার দিকে নিয়ে যায়, অ্যাট্রিবিউটের মানগুলিকে কম পাঠযোগ্য করে তোলে।

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<input type=text>
```

```vue-html
<AppSidebar :style={width:sidebarWidth+'px'}>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<input type="text">
```

```vue-html
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```

</div>

## নির্দেশমূলক সংক্ষিপ্ত বিবরণ {#directive-shorthands}

**নির্দেশমূলক সংক্ষিপ্ত বিবরণ (`:` এর জন্য `v-bind:`, `@` এর জন্য `v-on:` এবং `#` এর জন্য `v-slot` ব্যবহার করা উচিত।**

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<input
  v-bind:value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-on:input="onInput"
  @focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>
```

```vue-html
<input
  @input="onInput"
  @focus="onFocus"
>
```

```vue-html
<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
  <p>Here's some contact info</p>
</template>
```

```vue-html
<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>
