# Accessibility {#accessibility}

ওয়েব অ্যাক্সেসিবিলিটি (এছাড়াও a11y নামে পরিচিত) এমন ওয়েবসাইট তৈরির অনুশীলনকে বোঝায় যা যে কেউ ব্যবহার করতে পারে - সে একজন প্রতিবন্ধী ব্যক্তি, একটি ধীর সংযোগ, পুরানো বা ভাঙা হার্ডওয়্যার বা কেবল প্রতিকূল পরিবেশে থাকা ব্যক্তি। উদাহরণ স্বরূপ, একটি ভিডিওতে সাবটাইটেল যোগ করা আপনার বধির এবং শ্রবণশক্তিহীন ব্যবহারকারী এবং আপনার ব্যবহারকারী যারা উচ্চস্বরে পরিবেশে আছেন এবং তাদের ফোন শুনতে পাচ্ছেন না উভয়কেই সাহায্য করবে৷ একইভাবে, আপনার টেক্সট খুব কম কনট্রাস্ট নয় তা নিশ্চিত করা আপনার কম-দৃষ্টিসম্পন্ন ব্যবহারকারী এবং আপনার ব্যবহারকারী যারা উজ্জ্বল সূর্যের আলোতে তাদের ফোন ব্যবহার করার চেষ্টা করছেন উভয়কেই সাহায্য করবে।

শুরু করতে প্রস্তুত কিন্তু কোথায় নিশ্চিত নন?

[ওয়ার্ল্ড ওয়াইড ওয়েব কনসোর্টিয়াম (W3C)](https://www.w3.org/) দ্বারা প্রদত্ত [ওয়েব অ্যাক্সেসিবিলিটি গাইড](https://www.w3.org/WAI/planning-and-managing/) দেখুন।

## Skip link {#skip-link}

আপনার প্রতিটি পৃষ্ঠার শীর্ষে একটি লিঙ্ক যুক্ত করা উচিত যা সরাসরি মূল বিষয়বস্তু এলাকায় যায় যাতে ব্যবহারকারীরা একাধিক ওয়েব পৃষ্ঠায় পুনরাবৃত্তি করা বিষয়বস্তু এড়িয়ে যেতে পারেন।

সাধারণত এটি `App.vue` এর শীর্ষে করা হয় কারণ এটি আপনার সমস্ত পৃষ্ঠায় প্রথম ফোকাসযোগ্য উপাদান হবে:

```vue-html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink" class="skip-link">Skip to main content</a>
  </li>
</ul>
```

লিঙ্কটি ফোকাস না করা পর্যন্ত লুকানোর জন্য, আপনি নিম্নলিখিত শৈলী যোগ করতে পারেন:

```css
.skip-link {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skip-link:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
```

একবার একজন ব্যবহারকারী রুট পরিবর্তন করলে, স্কিপ লিঙ্কে ফোকাস ফিরিয়ে আনুন। স্কিপ লিঙ্কের টেমপ্লেট রেফের উপর ফোকাস কল করে এটি অর্জন করা যেতে পারে (`vue-router` ব্যবহার অনুমান করে):

<div class="options-api">

```vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.skipLink.focus()
    }
  }
}
</script>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const skipLink = ref()

watch(
  () => route.path,
  () => {
    skipLink.value.focus()
  }
)
</script>
```

</div>

[প্রধান বিষয়বস্তুর লিঙ্ক এড়িয়ে যাওয়ার ডকুমেন্টেশন পড়ুন](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## Content Structure {#content-structure}

অ্যাক্সেসযোগ্যতার সবচেয়ে গুরুত্বপূর্ণ অংশগুলির মধ্যে একটি হল নিশ্চিত করা যে ডিজাইনটি অ্যাক্সেসযোগ্য বাস্তবায়নকে সমর্থন করতে পারে। ডিজাইনে শুধুমাত্র রঙের বৈসাদৃশ্য, ফন্ট নির্বাচন, পাঠ্যের আকার এবং ভাষা বিবেচনা করা উচিত নয়, তবে অ্যাপ্লিকেশনটিতে বিষয়বস্তু কীভাবে গঠন করা হয়েছে তাও বিবেচনা করা উচিত।

### Headings {#headings}

ব্যবহারকারী শিরোনাম মাধ্যমে একটি অ্যাপ্লিকেশন নেভিগেট করতে পারেন. আপনার অ্যাপ্লিকেশনের প্রতিটি বিভাগের জন্য বর্ণনামূলক শিরোনাম থাকা ব্যবহারকারীদের জন্য প্রতিটি বিভাগের বিষয়বস্তু অনুমান করা সহজ করে তোলে। যখন শিরোনামের কথা আসে, সেখানে কয়েকটি প্রস্তাবিত অ্যাক্সেসিবিলিটি অনুশীলন রয়েছে:

- নেস্ট শিরোনামগুলি তাদের র‌্যাঙ্কিং ক্রমে: `<h1>` - `<h6>`৷
- একটি বিভাগের মধ্যে শিরোনাম এড়িয়ে যাবেন না
- শিরোনামগুলির চাক্ষুষ চেহারা দিতে পাঠ্য স্টাইল করার পরিবর্তে প্রকৃত শিরোনাম ট্যাগ ব্যবহার করুন

[শিরোনাম সম্পর্কে আরও পড়ুন](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```vue-html
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">Main title</h1>
  <section aria-labelledby="section-title-1">
    <h2 id="section-title-1"> Section Title </h2>
    <h3>Section Subtitle</h3>
    <!-- Content -->
  </section>
  <section aria-labelledby="section-title-2">
    <h2 id="section-title-2"> Section Title </h2>
    <h3>Section Subtitle</h3>
    <!-- Content -->
    <h3>Section Subtitle</h3>
    <!-- Content -->
  </section>
</main>
```

### Landmarks {#landmarks}

[ল্যান্ডমার্কস](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) একটি অ্যাপ্লিকেশনের মধ্যে বিভাগগুলিতে প্রোগ্রাম্যাটিক অ্যাক্সেস প্রদান করে। যে ব্যবহারকারীরা সহায়ক প্রযুক্তির উপর নির্ভর করে তারা অ্যাপ্লিকেশনের প্রতিটি বিভাগে নেভিগেট করতে পারে এবং বিষয়বস্তু এড়িয়ে যেতে পারে। আপনি এটি অর্জনে সহায়তা করতে [ARIA ভূমিকা](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) ব্যবহার করতে পারেন।

| HTML            | ARIA Role            | Landmark Purpose                                                                                                 |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| header          | role="banner"        | Prime heading: title of the page                                                                                 |
| nav             | role="navigation"    | Collection of links suitable for use when navigating the document or related documents                           |
| main            | role="main"          | The main or central content of the document.                                                                     |
| footer          | role="contentinfo"   | Information about the parent document: footnotes/copyrights/links to privacy statement                           |
| aside           | role="complementary" | Supports the main content, yet is separated and meaningful on its own content                                    |
| _Not available_ | role="search"        | This section contains the search functionality for the application                                               |
| form            | role="form"          | Collection of form-associated elements                                                                           |
| section         | role="region"        | Content that is relevant and that users will likely want to navigate to. Label must be provided for this element |

:::tip Tip:
লিগ্যাসি [HTML5 শব্দার্থিক উপাদান সমর্থন করে না এমন ব্রাউজার](https://caniuse.com/#feat=html5semantic) এর সাথে সামঞ্জস্যপূর্ণতা বাড়াতে অপ্রয়োজনীয় ল্যান্ডমার্ক ভূমিকা বৈশিষ্ট্য সহ ল্যান্ডমার্ক HTML উপাদানগুলি ব্যবহার করার পরামর্শ দেওয়া হয়।
:::

[ল্যান্ডমার্ক সম্পর্কে আরও পড়ুন](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

## Semantic Forms {#semantic-forms}

একটি ফর্ম তৈরি করার সময়, আপনি নিম্নলিখিত উপাদানগুলি ব্যবহার করতে পারেন: `<form>`, `<label>`, `<input>`, `<textarea>`, এবং `<button>`

লেবেলগুলি সাধারণত ফর্ম ক্ষেত্রগুলির উপরে বা বাম দিকে রাখা হয়:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      :type="item.type"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

<!-- <common-codepen-snippet title="Simple Form" slug="dyNzzWZ" :height="368" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

লক্ষ্য করুন কিভাবে আপনি ফর্ম উপাদানটিতে `autocomplete='on'` অন্তর্ভুক্ত করতে পারেন এবং এটি আপনার ফর্মের সমস্ত ইনপুটগুলিতে প্রযোজ্য হবে৷ এছাড়াও আপনি প্রতিটি ইনপুটের জন্য বিভিন্ন [স্বয়ংসম্পূর্ণ বৈশিষ্ট্যের জন্য মান](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) সেট করতে পারেন।

### Labels {#labels}

সমস্ত ফর্ম নিয়ন্ত্রণের উদ্দেশ্য বর্ণনা করার জন্য লেবেল প্রদান করুন; `for`' এবং `id` লিঙ্ক করা:

```vue-html
<label for="name">Name</label>
<input type="text" name="name" id="name" v-model="name" />
```

<!-- <common-codepen-snippet title="Form Label" slug="XWpaaaj" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

আপনি যদি আপনার ক্রোম বিকাশকারী সরঞ্জামগুলিতে এই উপাদানটি পরিদর্শন করেন এবং এলিমেন্টস ট্যাবের ভিতরে অ্যাক্সেসিবিলিটি ট্যাবটি খোলেন, আপনি দেখতে পাবেন কিভাবে ইনপুটটি লেবেল থেকে এর নাম পায়:

![Chrome বিকাশকারী সরঞ্জামগুলি লেবেল থেকে ইনপুট অ্যাক্সেসযোগ্য নাম দেখাচ্ছে৷](./images/AccessibleLabelChromeDevTools.png)

:::warning সতর্কতা:
যদিও আপনি ইনপুট ক্ষেত্রগুলিকে এভাবে মোড়ানো লেবেলগুলি দেখে থাকতে পারেন:

```vue-html
<label>
  Name:
  <input type="text" name="name" id="name" v-model="name" />
</label>
```

একটি ম্যাচিং আইডি সহ লেবেলগুলি স্পষ্টভাবে সেট করা সহায়ক প্রযুক্তি দ্বারা আরও ভাল সমর্থিত৷
:::

#### `aria-label` {#aria-label}

আপনি ইনপুটটি দিয়ে একটি অ্যাক্সেসযোগ্য নামও দিতে পারেন [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label).

```vue-html
<label for="name">Name</label>
<input
  type="text"
  name="name"
  id="name"
  v-model="name"
  :aria-label="nameLabel"
/>
```

<!-- <common-codepen-snippet title="Form ARIA label" slug="NWdvvYQ" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

অ্যাক্সেসযোগ্য নামটি কীভাবে পরিবর্তিত হয়েছে তা দেখতে Chrome DevTools-এ এই উপাদানটি নির্দ্বিধায় পরিদর্শন করুন:

![Chrome ডেভেলপার টুলস অ্যারিয়া-লেবেল থেকে ইনপুট অ্যাক্সেসযোগ্য নাম দেখাচ্ছে](./images/AccessibleARIAlabelDevTools.png)

#### `aria-labelledby` {#aria-labelledby}

[`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) ব্যবহার করা `aria-label` এর মতোই, তবে এটি ব্যবহার করা হলে লেবেল পাঠ্য পর্দায় দৃশ্যমান। এটি তাদের `id` দ্বারা অন্যান্য উপাদানের সাথে যুক্ত করা হয়েছে এবং আপনি একাধিক `id` লিঙ্ক করতে পারেন:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Name:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA labelledby" slug="MWJvvBe" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

![Chrome ডেভেলপার টুলস aria-লেবেল দ্বারা ইনপুট অ্যাক্সেসযোগ্য নাম দেখাচ্ছে৷](./images/AccessibleARIAlabelledbyDevTools.png)

#### `aria-describedby` {#aria-describedby}

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) একইভাবে ব্যবহার করা হয় `aria-labelledby` এর সাথে একটি বিবরণ প্রদান করা ছাড়া ব্যবহারকারীর প্রয়োজন হতে পারে এমন অতিরিক্ত তথ্য। এটি যেকোনো ইনপুটের মানদণ্ড বর্ণনা করতে ব্যবহার করা যেতে পারে:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Full Name:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
      aria-describedby="nameDescription"
    />
    <p id="nameDescription">Please provide first and last name.</p>
  </div>
  <button type="submit">Submit</button>
</form>
```

<!-- <common-codepen-snippet title="Form ARIA describedby" slug="gOgxxQE" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

আপনি Chrome DevTools পরিদর্শন করে বিবরণ দেখতে পারেন:

![Chrome ডেভেলপার টুলস aria-labelledby থেকে ইনপুট অ্যাক্সেসযোগ্য নাম এবং aria-describedby-এর সাথে বর্ণনা দেখাচ্ছে](./images/AccessibleARIAdescribedby.png)

### Placeholder {#placeholder}

স্থানধারক ব্যবহার করা এড়িয়ে চলুন কারণ তারা অনেক ব্যবহারকারীকে বিভ্রান্ত করতে পারে।

স্থানধারকদের সাথে একটি সমস্যা হল যে তারা ডিফল্টরূপে [রঙের বৈসাদৃশ্যের মানদণ্ড](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) পূরণ করে না; রঙের বৈসাদৃশ্য ঠিক করা স্থানধারককে ইনপুট ক্ষেত্রের পূর্ব-জনসংখ্যা ডেটার মতো দেখায়। নিম্নলিখিত উদাহরণের দিকে তাকালে, আপনি দেখতে পারেন যে শেষ নাম স্থানধারক যা রঙের বৈসাদৃশ্যের মানদণ্ড পূরণ করে পূর্ব-জনসংখ্যার ডেটার মতো দেখায়:

![অ্যাক্সেসযোগ্য স্থানধারক](./images/AccessiblePlaceholder.png)

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      type="text"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
      :placeholder="item.placeholder"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

```css
/* https://www.w3schools.com/howto/howto_css_placeholder.asp */

#lastName::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}

#lastName:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

#lastName::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}
```

যেকোনো ইনপুটের বাইরে ফর্ম পূরণ করার জন্য ব্যবহারকারীর প্রয়োজনীয় সমস্ত তথ্য প্রদান করা ভাল।

### Instructions {#instructions}

আপনার ইনপুট ক্ষেত্রগুলির জন্য নির্দেশাবলী যোগ করার সময়, এটি ইনপুটের সাথে সঠিকভাবে লিঙ্ক করা নিশ্চিত করুন৷
আপনি অতিরিক্ত নির্দেশাবলী প্রদান করতে পারেন এবং একটি [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) এর ভিতরে একাধিক আইডি আবদ্ধ করতে পারেন। এটি আরও নমনীয় নকশার জন্য অনুমতি দেয়।

```vue-html
<fieldset>
  <legend>Using aria-labelledby</legend>
  <label id="date-label" for="date">Current Date:</label>
  <input
    type="date"
    name="date"
    id="date"
    aria-labelledby="date-label date-instructions"
  />
  <p id="date-instructions">MM/DD/YYYY</p>
</fieldset>
```

বিকল্পভাবে, আপনি ইনপুটের সাথে নির্দেশাবলী সংযুক্ত করতে পারেন[`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby):

```vue-html
<fieldset>
  <legend>Using aria-describedby</legend>
  <label id="dob" for="dob">Date of Birth:</label>
  <input type="date" name="dob" id="dob" aria-describedby="dob-instructions" />
  <p id="dob-instructions">MM/DD/YYYY</p>
</fieldset>
```

<!-- <common-codepen-snippet title="Form Instructions" slug="WNREEqv" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### Hiding Content {#hiding-content}

সাধারণত লেবেলগুলিকে দৃশ্যত লুকানোর পরামর্শ দেওয়া হয় না, এমনকি যদি ইনপুটে একটি অ্যাক্সেসযোগ্য নাম থাকে। যাইহোক, যদি ইনপুটের কার্যকারিতা আশেপাশের বিষয়বস্তুর সাথে বোঝা যায়, তাহলে আমরা ভিজ্যুয়াল লেবেলটি লুকিয়ে রাখতে পারি।

আসুন এই অনুসন্ধান ক্ষেত্রটি দেখি:

```vue-html
<form role="search">
  <label for="search" class="hidden-visually">Search: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">Search</button>
</form>
```

আমরা এটি করতে পারি কারণ অনুসন্ধান বোতামটি ভিজ্যুয়াল ব্যবহারকারীদের ইনপুট ক্ষেত্রের উদ্দেশ্য সনাক্ত করতে সহায়তা করবে।

আমরা দৃশ্যত উপাদানগুলি লুকানোর জন্য CSS ব্যবহার করতে পারি কিন্তু সহায়ক প্রযুক্তির জন্য সেগুলি উপলব্ধ রাখতে পারি:

```css
.hidden-visually {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}
```

<!-- <common-codepen-snippet title="Form Search" slug="QWdMqWy" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

#### `aria-hidden="true"` {#aria-hidden-true}

`aria-hidden="true"` যোগ করলে সহায়ক প্রযুক্তি থেকে উপাদানটি আড়াল হবে কিন্তু অন্যান্য ব্যবহারকারীদের জন্য এটি দৃশ্যত উপলব্ধ থাকবে। এটিকে ফোকাসযোগ্য উপাদানগুলিতে ব্যবহার করবেন না, সম্পূর্ণরূপে আলংকারিক, সদৃশ বা অফস্ক্রিন সামগ্রীতে।

```vue-html
<p>This is not hidden from screen readers.</p>
<p aria-hidden="true">This is hidden from screen readers.</p>
```

### Buttons {#buttons}

একটি ফর্মের ভিতরে বোতামগুলি ব্যবহার করার সময়, ফর্ম জমা দেওয়া প্রতিরোধ করতে আপনাকে অবশ্যই টাইপ সেট করতে হবে৷
আপনি বোতাম তৈরি করতে একটি ইনপুট ব্যবহার করতে পারেন:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <!-- Buttons -->
  <button type="button">Cancel</button>
  <button type="submit">Submit</button>

  <!-- Input buttons -->
  <input type="button" value="Cancel" />
  <input type="submit" value="Submit" />
</form>
```

<!-- <common-codepen-snippet title="Form Buttons" slug="JjEyrYZ" :height="467" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

### Functional Images {#functional-images}

আপনি কার্যকরী ইমেজ তৈরি করতে এই কৌশল ব্যবহার করতে পারেন.

- Input fields

  - These images will act as a submit type button on forms

  ```vue-html
  <form role="search">
    <label for="search" class="hidden-visually">Search: </label>
    <input type="text" name="search" id="search" v-model="search" />
    <input
      type="image"
      class="btnImg"
      src="https://img.icons8.com/search"
      alt="Search"
    />
  </form>
  ```

- Icons

```vue-html
<form role="search">
  <label for="searchIcon" class="hidden-visually">Search: </label>
  <input type="text" name="searchIcon" id="searchIcon" v-model="searchIcon" />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="hidden-visually">Search</span>
  </button>
</form>
```

<!-- <common-codepen-snippet title="Functional Images" slug="jOyLGqM" :height="265" tab="js,result" theme="light" :preview="false" :editable="false" /> -->

## Standards {#standards}

ওয়ার্ল্ড ওয়াইড ওয়েব কনসোর্টিয়াম (W3C) ওয়েব অ্যাক্সেসিবিলিটি ইনিশিয়েটিভ (WAI) বিভিন্ন উপাদানের জন্য ওয়েব অ্যাক্সেসিবিলিটি মান তৈরি করে:

- [ব্যবহারকারী এজেন্ট অ্যাক্সেসিবিলিটি নির্দেশিকা (UAAG)](https://www.w3.org/WAI/standards-guidelines/uaag/)
  - ওয়েব ব্রাউজার এবং মিডিয়া প্লেয়ার, সহকারী প্রযুক্তির কিছু দিক
- [লেখক টুল অ্যাক্সেসিবিলিটি নির্দেশিকা (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)
  - লেখার সরঞ্জাম
- [ওয়েব সামগ্রী অ্যাক্সেসিবিলিটি নির্দেশিকা (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
  - ওয়েব বিষয়বস্তু - ডেভেলপারদের দ্বারা ব্যবহৃত, অথরিং টুল, এবং অ্যাক্সেসিবিলিটি মূল্যায়ন টুল

### Web Content Accessibility Guidelines (WCAG) {#web-content-accessibility-guidelines-wcag}

[WCAG 2.1](https://www.w3.org/TR/WCAG21/) [WCAG 2.0](https://www.w3.org/TR/WCAG20/) পর্যন্ত প্রসারিত এবং ঠিকানার মাধ্যমে নতুন প্রযুক্তি বাস্তবায়নের অনুমতি দেয় ওয়েবে পরিবর্তন। ওয়েব অ্যাক্সেসিবিলিটি নীতিগুলি তৈরি বা আপডেট করার সময় W3C WCAG-এর সবচেয়ে বর্তমান সংস্করণ ব্যবহার করতে উৎসাহিত করে.

#### WCAG 2.1 Four Main Guiding Principles (abbreviated as POUR): {#wcag-2-1-four-main-guiding-principles-abbreviated-as-pour}

- [Perceivable](https://www.w3.org/TR/WCAG21/#perceivable)
  - Users must be able to perceive the information being presented
- [Operable](https://www.w3.org/TR/WCAG21/#operable)
  - Interface forms, controls, and navigation are operable
- [Understandable](https://www.w3.org/TR/WCAG21/#understandable)
  - Information and the operation of user interface must be understandable to all users
- [Robust](https://www.w3.org/TR/WCAG21/#robust)
  - Users must be able to access the content as technologies advance

#### Web Accessibility Initiative – Accessible Rich Internet Applications (WAI-ARIA) {#web-accessibility-initiative-–-accessible-rich-internet-applications-wai-aria}

W3C-এর WAI-ARIA কীভাবে গতিশীল বিষয়বস্তু এবং উন্নত ব্যবহারকারী ইন্টারফেস নিয়ন্ত্রণ তৈরি করতে হয় তার নির্দেশিকা প্রদান করে।

- [অ্যাক্সেসিবল রিচ ইন্টারনেট অ্যাপ্লিকেশন (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

## Resources {#resources}

### Documentation {#documentation}

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [অ্যাক্সেসিবল রিচ ইন্টারনেট অ্যাপ্লিকেশন (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

### Assistive Technologies {#assistive-technologies}

- Screen Readers

  - [NVDA](https://www.nvaccess.org/download/)
  - [VoiceOver](https://www.apple.com/accessibility/mac/vision/)
  - [JAWS](https://www.freedomscientific.com/products/software/jaws/?utm_term=jaws%20screen%20reader&utm_source=adwords&utm_campaign=All+Products&utm_medium=ppc&hsa_tgt=kwd-394361346638&hsa_cam=200218713&hsa_ad=296201131673&hsa_kw=jaws%20screen%20reader&hsa_grp=52663682111&hsa_net=adwords&hsa_mt=e&hsa_src=g&hsa_acc=1684996396&hsa_ver=3&gclid=Cj0KCQjwnv71BRCOARIsAIkxW9HXKQ6kKNQD0q8a_1TXSJXnIuUyb65KJeTWmtS6BH96-5he9dsNq6oaAh6UEALw_wcB)
  - [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)

- Zooming Tools
  - [MAGic](https://www.freedomscientific.com/products/software/magic/)
  - [ZoomText](https://www.zoomtext.com/)
  - [Magnifier](https://support.microsoft.com/en-us/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

### Testing {#testing}

- স্বয়ংক্রিয় সরঞ্জাম
  - [Lighthpuse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
  - [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
  - [ARC Toolkit](https://chrome.google.com/webstore/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce?hl=en-US)
- Color Tools
  - [WebAim Color Contrast](https://webaim.org/resources/contrastchecker/)
  - [WebAim Link Color Contrast](https://webaim.org/resources/linkcontrastchecker)
- Other Helpful Tools
  - [HeadingMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=en…)
  - [Color Oracle](https://colororacle.org)
  - [Focus Indicator](https://chrome.google.com/webstore/detail/focus-indicator/heeoeadndnhebmfebjccbhmccmaoedlf?hl=en-US…)
  - [NerdeFocus](https://chrome.google.com/webstore/detail/nerdefocus/lpfiljldhgjecfepfljnbjnbjfhennpd?hl=en-US…)
  - [Visual Aria](https://chrome.google.com/webstore/detail/visual-aria/lhbmajchkkmakajkjenkchhnhbadmhmk?hl=en-US)
  - [Silktide Website Accessibility Simulator](https://chrome.google.com/webstore/detail/silktide-website-accessib/okcpiimdfkpkjcbihbmhppldhiebhhaf?hl=en-US)

### Users {#users}

বিশ্ব স্বাস্থ্য সংস্থা অনুমান করে যে বিশ্বের জনসংখ্যার ১৫% কোনো না কোনো ধরনের অক্ষমতা রয়েছে, তাদের মধ্যে ২-৪% গুরুতরভাবে তাই। এটি বিশ্বব্যাপী আনুমানিক ১ বিলিয়ন মানুষ; প্রতিবন্ধী ব্যক্তিদের বিশ্বের বৃহত্তম সংখ্যালঘু গোষ্ঠীতে পরিণত করা।

অক্ষমতার একটি বিশাল পরিসর রয়েছে, যেগুলোকে মোটামুটিভাবে চারটি বিভাগে ভাগ করা যায়:

- _[Visual](https://webaim.org/articles/visual/)_ - এই ব্যবহারকারীরা স্ক্রিন রিডার, স্ক্রিন ম্যাগনিফিকেশন, স্ক্রিন কনট্রাস্ট নিয়ন্ত্রণ বা ব্রেইল ডিসপ্লে ব্যবহার করে উপকৃত হতে পারেন।
- _[Auditory](https://webaim.org/articles/auditory/)_ - এই ব্যবহারকারীরা ক্যাপশন, ট্রান্সক্রিপ্ট বা সাইন ল্যাঙ্গুয়েজ ভিডিও থেকে উপকৃত হতে পারেন।
- _[Motor](https://webaim.org/articles/motor/)_ - এই ব্যবহারকারীরা বিভিন্ন ধরনের [মোটর দুর্বলতার জন্য সহায়ক প্রযুক্তি](https://webaim.org/articles/motor/assistive) থেকে উপকৃত হতে পারেন ): ভয়েস রিকগনিশন সফটওয়্যার, আই ট্র্যাকিং, একক-সুইচ অ্যাক্সেস, হেড ওয়ান্ড, সিপ এবং পাফ সুইচ, বড় আকারের ট্র্যাকবল মাউস, অভিযোজিত কীবোর্ড বা অন্যান্য সহায়ক প্রযুক্তি।
- _[Cognitive](https://webaim.org/articles/cognitive/)_ - এই ব্যবহারকারীরা সম্পূরক মিডিয়া, বিষয়বস্তুর কাঠামোগত সংগঠন, পরিষ্কার এবং সহজ লেখা থেকে উপকৃত হতে পারেন।

ব্যবহারকারীদের কাছ থেকে বোঝার জন্য WebAim থেকে নিম্নলিখিত লিঙ্কগুলি দেখুন:

- [ওয়েব অ্যাক্সেসিবিলিটি দৃষ্টিকোণ: প্রত্যেকের জন্য প্রভাব এবং সুবিধাগুলি অন্বেষণ করুন](https://www.w3.org/WAI/perspective-videos/)
- [ওয়েব ব্যবহারকারীদের গল্প](https://www.w3.org/WAI/people-use-web/user-stories/)
