# Slots {#slots}

> এই পৃষ্ঠাটি ধরে নেওয়া হচ্ছে আপনি ইতিমধ্যেই [Components Basics](/guide/essentials/component-basics) পড়েছেন। আপনি যদি উপাদানগুলিতে নতুন হন তবে প্রথমে এটি পড়ুন।

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-component-slots" title="বিনামূল্যে Vue.js Slots পাঠ"/>

## Slot Content and Outlet {#slot-content-and-outlet}

আমরা শিখেছি যে উপাদানগুলি প্রপস গ্রহণ করতে পারে, যা যেকোনো ধরনের জাভাস্ক্রিপ্ট মান হতে পারে। কিন্তু কিভাবে টেমপ্লেট বিষয়বস্তু সম্পর্কে? কিছু ক্ষেত্রে, আমরা চাইল্ড কম্পোনেন্টে একটি টেমপ্লেট ফ্র্যাগমেন্ট পাঠাতে চাই এবং চাইল্ড কম্পোনেন্টকে তার নিজস্ব টেমপ্লেটের মধ্যে টুকরো রেন্ডার করতে দিতে পারি।

উদাহরণস্বরূপ, আমাদের একটি `<FancyButton>` উপাদান থাকতে পারে যা এই ধরনের ব্যবহার সমর্থন করে:

```vue-html{2}
<FancyButton>
  Click me! <!-- slot content -->
</FancyButton>
```

`<FancyButton>` এর টেমপ্লেটটি দেখতে এইরকম:

```vue-html{2}
<button class="fancy-btn">
  <slot></slot> <!-- slot outlet -->
</button>
```

`<slot>` উপাদান হল একটি **স্লট আউটলেট** যা নির্দেশ করে যে অভিভাবক-প্রদত্ত **স্লট সামগ্রী** কোথায় রেন্ডার করা উচিত।

![slot diagram](./images/slots.png)

<!-- https://www.figma.com/file/LjKTYVL97Ck6TEmBbstavX/slot -->

এবং চূড়ান্ত রেন্ডার করা DOM:

```html
<button class="fancy-btn">Click me!</button>
```

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBGYW5jeUJ1dHRvbiBmcm9tICcuL0ZhbmN5QnV0dG9uLnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxGYW5jeUJ1dHRvbj5cbiAgICBDbGljayBtZSA8IS0tIHNsb3QgY29udGVudCAtLT5cbiBcdDwvRmFuY3lCdXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJGYW5jeUJ1dHRvbi52dWUiOiI8dGVtcGxhdGU+XG4gIDxidXR0b24gY2xhc3M9XCJmYW5jeS1idG5cIj5cbiAgXHQ8c2xvdC8+IDwhLS0gc2xvdCBvdXRsZXQgLS0+XG5cdDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhbmN5LWJ0biB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMzE1ZGVnLCAjNDJkMzkyIDI1JSwgIzY0N2VmZik7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIG1hcmdpbjogNXB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjwvc3R5bGU+In0=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBGYW5jeUJ1dHRvbiBmcm9tICcuL0ZhbmN5QnV0dG9uLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgRmFuY3lCdXR0b24gfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEZhbmN5QnV0dG9uPlxuICAgIENsaWNrIG1lIDwhLS0gc2xvdCBjb250ZW50IC0tPlxuIFx0PC9GYW5jeUJ1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkZhbmN5QnV0dG9uLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBjbGFzcz1cImZhbmN5LWJ0blwiPlxuICBcdDxzbG90Lz4gPCEtLSBzbG90IG91dGxldCAtLT5cblx0PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uZmFuY3ktYnRuIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICM0MmQzOTIgMjUlLCAjNjQ3ZWZmKTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgbWFyZ2luOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuPC9zdHlsZT4ifQ==)

</div>

স্লটের সাথে, `<FancyButton>` বাইরের `<button>` (এবং এর অভিনব স্টাইলিং) রেন্ডার করার জন্য দায়ী, যখন ভিতরের বিষয়বস্তু মূল উপাদান দ্বারা সরবরাহ করা হয়।

স্লট বোঝার আরেকটি উপায় হল জাভাস্ক্রিপ্ট ফাংশনের সাথে তুলনা করা:

```js
// parent component passing slot content
FancyButton('Click me!')

// FancyButton renders slot content in its own template
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`
}
```

স্লট বিষয়বস্তু শুধু পাঠ্যের মধ্যে সীমাবদ্ধ নয়। এটা কোনো বৈধ টেমপ্লেট বিষয়বস্তু হতে পারে. উদাহরণস্বরূপ, আমরা একাধিক উপাদান, বা এমনকি অন্যান্য উপাদান পাস করতে পারি:

```vue-html
<FancyButton>
  <span style="color:red">Click me!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBGYW5jeUJ1dHRvbiBmcm9tICcuL0ZhbmN5QnV0dG9uLnZ1ZSdcbmltcG9ydCBBd2Vzb21lSWNvbiBmcm9tICcuL0F3ZXNvbWVJY29uLnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxGYW5jeUJ1dHRvbj5cbiAgICBDbGljayBtZVxuIFx0PC9GYW5jeUJ1dHRvbj5cbiAgPEZhbmN5QnV0dG9uPlxuICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6Y3lhblwiPkNsaWNrIG1lISA8L3NwYW4+XG4gICAgPEF3ZXNvbWVJY29uIC8+XG4gIDwvRmFuY3lCdXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJGYW5jeUJ1dHRvbi52dWUiOiI8dGVtcGxhdGU+XG4gIDxidXR0b24gY2xhc3M9XCJmYW5jeS1idG5cIj5cbiAgXHQ8c2xvdC8+XG5cdDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhbmN5LWJ0biB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMzE1ZGVnLCAjNDJkMzkyIDI1JSwgIzY0N2VmZik7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIG1hcmdpbjogNXB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjwvc3R5bGU+IiwiQXdlc29tZUljb24udnVlIjoiPCEtLSB1c2luZyBhbiBlbW9qaSBqdXN0IGZvciBkZW1vIHB1cnBvc2VzIC0tPlxuPHRlbXBsYXRlPuKdpO+4jzwvdGVtcGxhdGU+In0=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBGYW5jeUJ1dHRvbiBmcm9tICcuL0ZhbmN5QnV0dG9uLnZ1ZSdcbmltcG9ydCBBd2Vzb21lSWNvbiBmcm9tICcuL0F3ZXNvbWVJY29uLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgRmFuY3lCdXR0b24sIEF3ZXNvbWVJY29uIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxGYW5jeUJ1dHRvbj5cbiAgICBDbGljayBtZVxuIFx0PC9GYW5jeUJ1dHRvbj5cblxuICA8RmFuY3lCdXR0b24+XG4gICAgPHNwYW4gc3R5bGU9XCJjb2xvcjpjeWFuXCI+Q2xpY2sgbWUhIDwvc3Bhbj5cbiAgICA8QXdlc29tZUljb24gLz5cbiAgPC9GYW5jeUJ1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkZhbmN5QnV0dG9uLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBjbGFzcz1cImZhbmN5LWJ0blwiPlxuICBcdDxzbG90Lz5cblx0PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uZmFuY3ktYnRuIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICM0MmQzOTIgMjUlLCAjNjQ3ZWZmKTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgbWFyZ2luOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuPC9zdHlsZT4iLCJBd2Vzb21lSWNvbi52dWUiOiI8IS0tIHVzaW5nIGFuIGVtb2ppIGp1c3QgZm9yIGRlbW8gcHVycG9zZXMgLS0+XG48dGVtcGxhdGU+4p2k77iPPC90ZW1wbGF0ZT4ifQ==)

</div>

স্লট ব্যবহার করে, আমাদের `<FancyButton>` আরও নমনীয় এবং পুনরায় ব্যবহারযোগ্য। আমরা এখন এটিকে বিভিন্ন জায়গায় বিভিন্ন অভ্যন্তরীণ বিষয়বস্তু সহ ব্যবহার করতে পারি, তবে একই অভিনব স্টাইলিং সহ।

Vue কম্পোনেন্টের স্লট মেকানিজম [native Web Component `<slot>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) দ্বারা অনুপ্রাণিত, কিন্তু অতিরিক্ত ক্ষমতা সহ যা আমরা পরে দেখব।

## Render Scope {#render-scope}

স্লট বিষয়বস্তুর প্যারেন্ট কম্পোনেন্টের ডেটা স্কোপের অ্যাক্সেস আছে, কারণ এটি প্যারেন্টে সংজ্ঞায়িত করা হয়েছে। উদাহরণ স্বরূপ:

```vue-html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

এখানে উভয় <span v-pre>`{{ message  }}`</span> ইন্টারপোলেশন একই বিষয়বস্তু রেন্ডার করবে।

স্লট বিষয়বস্তুর চাইল্ড কম্পোনেন্টের ডেটাতে অ্যাক্সেস **না** থাকে। Vue টেমপ্লেটের অভিব্যক্তিগুলি শুধুমাত্র জাভাস্ক্রিপ্টের আভিধানিক স্কোপিংয়ের সাথে সামঞ্জস্যপূর্ণ, এটি সংজ্ঞায়িত স্কোপ অ্যাক্সেস করতে পারে। অন্য কথায়:

> অভিভাবক টেমপ্লেটের অভিব্যক্তিগুলির শুধুমাত্র অভিভাবক সুযোগে অ্যাক্সেস আছে; চাইল্ড টেমপ্লেটের এক্সপ্রেশনের শুধুমাত্র চাইল্ড স্কোপের অ্যাক্সেস আছে।

## Fallback Content {#fallback-content}

এমন কিছু ক্ষেত্রে আছে যখন একটি স্লটের জন্য ফলব্যাক (অর্থাৎ ডিফল্ট) বিষয়বস্তু নির্দিষ্ট করা উপযোগী, শুধুমাত্র তখনই রেন্ডার করা হবে যখন কোনো বিষয়বস্তু প্রদান করা হয় না। উদাহরণস্বরূপ, একটি `<SubmitButton>` উপাদানে:

```vue-html
<button type="submit">
  <slot></slot>
</button>
```

অভিভাবক যদি কোনো স্লট সামগ্রী প্রদান না করেন তাহলে আমরা হয়ত "জমা দিন" পাঠ্যটিকে `<button>`-এর মধ্যে রেন্ডার করতে চাই। ফলব্যাক বিষয়বস্তু "জমা দিন" করতে, আমরা এটিকে `<slot>` ট্যাগের মধ্যে রাখতে পারি:

```vue-html{3}
<button type="submit">
  <slot>
    Submit <!-- fallback content -->
  </slot>
</button>
```

এখন যখন আমরা একটি প্যারেন্ট কম্পোনেন্টে `<SubmitButton>` ব্যবহার করি, স্লটের জন্য কোনো বিষয়বস্তু প্রদান করি না:

```vue-html
<SubmitButton />
```

এটি ফলব্যাক সামগ্রী রেন্ডার করবে, "Submit":

```html
<button type="submit">Submit</button>
```

কিন্তু যদি আমরা সামগ্রী প্রদান করি:

```vue-html
<SubmitButton>Save</SubmitButton>
```

তারপর প্রদত্ত বিষয়বস্তু পরিবর্তে রেন্ডার করা হবে:

```html
<button type="submit">Save</button>
```

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBTdWJtaXRCdXR0b24gZnJvbSAnLi9TdWJtaXRCdXR0b24udnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPCEtLSB1c2UgZmFsbGJhY2sgdGV4dCAtLT5cbiAgPFN1Ym1pdEJ1dHRvbiAvPlxuICBcbiAgPCEtLSBwcm92aWRlIGN1c3RvbSB0ZXh0IC0tPlxuICA8U3VibWl0QnV0dG9uPlNhdmU8L1N1Ym1pdEJ1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIlN1Ym1pdEJ1dHRvbi52dWUiOiI8dGVtcGxhdGU+XG4gIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlxuXHQgIDxzbG90PlxuICAgIFx0U3VibWl0IDwhLS0gZmFsbGJhY2sgY29udGVudCAtLT5cbiAgXHQ8L3Nsb3Q+XG5cdDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBTdWJtaXRCdXR0b24gZnJvbSAnLi9TdWJtaXRCdXR0b24udnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIFN1Ym1pdEJ1dHRvblxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8IS0tIHVzZSBmYWxsYmFjayB0ZXh0IC0tPlxuICA8U3VibWl0QnV0dG9uIC8+XG4gIFxuICA8IS0tIHByb3ZpZGUgY3VzdG9tIHRleHQgLS0+XG4gIDxTdWJtaXRCdXR0b24+U2F2ZTwvU3VibWl0QnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiU3VibWl0QnV0dG9uLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XG5cdCAgPHNsb3Q+XG4gICAgXHRTdWJtaXQgPCEtLSBmYWxsYmFjayBjb250ZW50IC0tPlxuICBcdDwvc2xvdD5cblx0PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

</div>

## Named Slots {#named-slots}

এমন সময় আছে যখন একটি একক উপাদানে একাধিক স্লট আউটলেট থাকা দরকারী। উদাহরণস্বরূপ, নিম্নলিখিত টেমপ্লেট সহ একটি `<BaseLayout>` উপাদানে:

```vue-html
<div class="container">
  <header>
    <!-- We want header content here -->
  </header>
  <main>
    <!-- We want main content here -->
  </main>
  <footer>
    <!-- We want footer content here -->
  </footer>
</div>
```

এই ক্ষেত্রে, `<slot>` উপাদানটির একটি বিশেষ বৈশিষ্ট্য রয়েছে, `name`, যা বিভিন্ন স্লটে একটি অনন্য আইডি বরাদ্দ করতে ব্যবহার করা যেতে পারে যাতে আপনি নির্ধারণ করতে পারেন যে সামগ্রী কোথায় রেন্ডার করা হবে:

```vue-html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

`নাম` ছাড়া একটি `<slot>` আউটলেটের অন্তর্নিহিত নাম "ডিফল্ট" আছে।

`<BaseLayout>` ব্যবহার করে একটি প্যারেন্ট কম্পোনেন্টে, আমাদের একাধিক স্লট কন্টেন্ট ফ্র্যাগমেন্ট পাস করার একটি উপায় প্রয়োজন, প্রতিটি আলাদা স্লট আউটলেটকে লক্ষ্য করে। এখানেই **নামকৃত স্লট** আসে।

একটি নামযুক্ত স্লট পাস করার জন্য, আমাদের `v-slot` নির্দেশের সাথে একটি `<template>` উপাদান ব্যবহার করতে হবে এবং তারপরে `v-slot`-এ আর্গুমেন্ট হিসেবে স্লটের নাম পাস করতে হবে:

```vue-html
<BaseLayout>
  <template v-slot:header>
    <!-- content for the header slot -->
  </template>
</BaseLayout>
```

`v-slot` এর একটি ডেডিকেটেড শর্টহ্যান্ড `#` আছে, তাই `<template v-slot:header>` কে শুধু `<template #header>`-এ ছোট করা যেতে পারে। এটিকে "শিশু উপাদানের 'শিরোনাম' স্লটে এই টেমপ্লেট খণ্ডটি রেন্ডার করুন" হিসাবে ভাবুন৷

![named slots diagram](./images/named-slots.png)

<!-- https://www.figma.com/file/2BhP8gVZevttBu9oUmUUyz/named-slot -->

শর্টহ্যান্ড সিনট্যাক্স ব্যবহার করে `<BaseLayout>`-এ তিনটি স্লটের জন্য কোড পাস করার বিষয়বস্তু এখানে রয়েছে:

```vue-html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

যখন একটি উপাদান একটি ডিফল্ট স্লট এবং নামযুক্ত স্লট উভয়ই গ্রহণ করে, তখন সমস্ত শীর্ষ-স্তরের অ-`<টেমপ্লেট>` নোডগুলিকে ডিফল্ট স্লটের জন্য বিষয়বস্তু হিসাবে অন্তর্নিহিতভাবে বিবেচনা করা হয়। সুতরাং উপরেরটি এভাবেও লেখা যেতে পারে:

```vue-html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- implicit default slot -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

এখন `<template>` উপাদানের ভিতরের সবকিছু সংশ্লিষ্ট স্লটে পাঠানো হবে। চূড়ান্ত রেন্ডার করা HTML হবে:

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBCYXNlTGF5b3V0IGZyb20gJy4vQmFzZUxheW91dC52dWUnXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8QmFzZUxheW91dD5cbiAgICA8dGVtcGxhdGUgI2hlYWRlcj5cbiAgICAgIDxoMT5IZXJlIG1pZ2h0IGJlIGEgcGFnZSB0aXRsZTwvaDE+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDx0ZW1wbGF0ZSAjZGVmYXVsdD5cbiAgICAgIDxwPkEgcGFyYWdyYXBoIGZvciB0aGUgbWFpbiBjb250ZW50LjwvcD5cbiAgICAgIDxwPkFuZCBhbm90aGVyIG9uZS48L3A+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDx0ZW1wbGF0ZSAjZm9vdGVyPlxuICAgICAgPHA+SGVyZSdzIHNvbWUgY29udGFjdCBpbmZvPC9wPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvQmFzZUxheW91dD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJhc2VMYXlvdXQudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGhlYWRlcj5cbiAgICAgIDxzbG90IG5hbWU9XCJoZWFkZXJcIj48L3Nsb3Q+XG4gICAgPC9oZWFkZXI+XG4gICAgPG1haW4+XG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9tYWluPlxuICAgIDxmb290ZXI+XG4gICAgICA8c2xvdCBuYW1lPVwiZm9vdGVyXCI+PC9zbG90PlxuICAgIDwvZm9vdGVyPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbiAgZm9vdGVyIHtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcbiAgICBjb2xvcjogIzY2NjtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICB9XG48L3N0eWxlPiJ9)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCYXNlTGF5b3V0IGZyb20gJy4vQmFzZUxheW91dC52dWUnXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7XG4gICAgQmFzZUxheW91dFxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8QmFzZUxheW91dD5cbiAgICA8dGVtcGxhdGUgI2hlYWRlcj5cbiAgICAgIDxoMT5IZXJlIG1pZ2h0IGJlIGEgcGFnZSB0aXRsZTwvaDE+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDx0ZW1wbGF0ZSAjZGVmYXVsdD5cbiAgICAgIDxwPkEgcGFyYWdyYXBoIGZvciB0aGUgbWFpbiBjb250ZW50LjwvcD5cbiAgICAgIDxwPkFuZCBhbm90aGVyIG9uZS48L3A+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDx0ZW1wbGF0ZSAjZm9vdGVyPlxuICAgICAgPHA+SGVyZSdzIHNvbWUgY29udGFjdCBpbmZvPC9wPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvQmFzZUxheW91dD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJhc2VMYXlvdXQudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGhlYWRlcj5cbiAgICAgIDxzbG90IG5hbWU9XCJoZWFkZXJcIj48L3Nsb3Q+XG4gICAgPC9oZWFkZXI+XG4gICAgPG1haW4+XG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9tYWluPlxuICAgIDxmb290ZXI+XG4gICAgICA8c2xvdCBuYW1lPVwiZm9vdGVyXCI+PC9zbG90PlxuICAgIDwvZm9vdGVyPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbiAgZm9vdGVyIHtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcbiAgICBjb2xvcjogIzY2NjtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICB9XG48L3N0eWxlPiJ9)

</div>

আবার, এটি আপনাকে জাভাস্ক্রিপ্ট ফাংশন সাদৃশ্য ব্যবহার করে নামযুক্ত স্লটগুলি আরও ভালভাবে বুঝতে সাহায্য করতে পারে:

```js
// passing multiple slot fragments with different names
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`
})

// <BaseLayout> renders them in different places
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`
}
```

## Dynamic Slot Names {#dynamic-slot-names}

[Dynamic directive arguments](/guide/essentials/template-syntax.md#dynamic-arguments) এছাড়াও `v-slot`-এ কাজ করে, যা গতিশীল স্লট নামের সংজ্ঞাকে অনুমতি দেয়:

```vue-html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- with shorthand -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

মনে রাখবেন অভিব্যক্তিটি গতিশীল নির্দেশিক আর্গুমেন্টের [সিনট্যাক্স সীমাবদ্ধতা](/guide/essentials/template-syntax.html#directives) সাপেক্ষে।

## Scoped Slots {#scoped-slots}

[Render Scope](#render-scope) এ যেমন আলোচনা করা হয়েছে, স্লট কন্টেন্টের চাইল্ড কম্পোনেন্টে স্টেটের অ্যাক্সেস নেই।

যাইহোক, এমন কিছু ক্ষেত্রে এটি কার্যকর হতে পারে যদি একটি স্লটের বিষয়বস্তু প্যারেন্ট স্কোপ এবং চাইল্ড স্কোপ উভয়ের ডেটা ব্যবহার করতে পারে। এটি অর্জন করার জন্য, রেন্ডার করার সময় শিশুর একটি স্লটে ডেটা পাস করার জন্য আমাদের একটি উপায় প্রয়োজন।

প্রকৃতপক্ষে, আমরা ঠিক এটি করতে পারি - আমরা একটি স্লট আউটলেটে বৈশিষ্ট্যগুলি পাস করতে পারি ঠিক যেমন একটি উপাদানে প্রপস পাস করা:

```vue-html
<!-- <MyComponent> template -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

একটি একক ডিফল্ট স্লট বনাম নামযুক্ত স্লট ব্যবহার করার সময় স্লট প্রপগুলি গ্রহণ করা কিছুটা আলাদা। চাইল্ড কম্পোনেন্ট ট্যাগে সরাসরি `v-slot` ব্যবহার করে প্রথমে একটি একক ডিফল্ট স্লট ব্যবহার করে প্রপস কীভাবে গ্রহণ করা যায় তা আমরা দেখাতে যাচ্ছি:

```vue-html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

![scoped slots diagram](./images/scoped-slots.svg)

<!-- https://www.figma.com/file/QRneoj8eIdL1kw3WQaaEyc/scoped-slot -->

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxNeUNvbXBvbmVudCB2LXNsb3Q9XCJzbG90UHJvcHNcIj5cbiAgXHR7eyBzbG90UHJvcHMudGV4dCB9fSB7eyBzbG90UHJvcHMuY291bnQgfX1cbiAgPC9NeUNvbXBvbmVudD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIk15Q29tcG9uZW50LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5jb25zdCBncmVldGluZ01lc3NhZ2UgPSAnaGVsbG8nXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICBcdDxzbG90IDp0ZXh0PVwiZ3JlZXRpbmdNZXNzYWdlXCIgOmNvdW50PVwiMVwiPjwvc2xvdD5cblx0PC9kaXY+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBNeUNvbXBvbmVudFxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8TXlDb21wb25lbnQgdi1zbG90PVwic2xvdFByb3BzXCI+XG4gIFx0e3sgc2xvdFByb3BzLnRleHQgfX0ge3sgc2xvdFByb3BzLmNvdW50IH19XG4gIDwvTXlDb21wb25lbnQ+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJNeUNvbXBvbmVudC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBncmVldGluZ01lc3NhZ2U6ICdoZWxsbydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gIFx0PHNsb3QgOnRleHQ9XCJncmVldGluZ01lc3NhZ2VcIiA6Y291bnQ9XCIxXCI+PC9zbG90PlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>

সন্তানের দ্বারা স্লটে পাস করা প্রপগুলি সংশ্লিষ্ট `v-slot` নির্দেশের মান হিসাবে উপলব্ধ, যা স্লটের ভিতরে অভিব্যক্তি দ্বারা অ্যাক্সেস করা যেতে পারে।

আপনি একটি স্কোপড স্লটকে চাইল্ড কম্পোনেন্টে একটি ফাংশন পাস করার মতো ভাবতে পারেন। শিশু উপাদানটি তখন এটিকে কল করে, আর্গুমেন্ট হিসাবে প্রপস পাস করে:

```js
MyComponent({
  // passing the default slot, but as a function
  default: (slotProps) => {
    return `${slotProps.text} ${slotProps.count}`
  }
})

function MyComponent(slots) {
  const greetingMessage = 'hello'
  return `<div>${
    // call the slot function with props!
    slots.default({ text: greetingMessage, count: 1 })
  }</div>`
}
```

প্রকৃতপক্ষে, এটি কীভাবে স্কোপড স্লটগুলি সংকলিত হয় এবং কীভাবে আপনি ম্যানুয়াল [render functions](/guide/extras/render-function.html) এ স্কোপড স্লটগুলি ব্যবহার করবেন তার খুব কাছাকাছি।

লক্ষ্য করুন কিভাবে `v-slot="slotProps"` স্লট ফাংশনের স্বাক্ষরের সাথে মেলে। ঠিক ফাংশন আর্গুমেন্টের মতই, আমরা `v-slot`-এ destructuring ব্যবহার করতে পারি:

```vue-html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### Named Scoped Slots {#named-scoped-slots}

নামযুক্ত স্কোপড স্লট একইভাবে কাজ করে - স্লট প্রপগুলি `v-slot` নির্দেশের মান হিসাবে অ্যাক্সেসযোগ্য: `v-slot:name="slotProps"`৷ শর্টহ্যান্ড ব্যবহার করার সময়, এটি এই মত দেখায়:

```vue-html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

একটি নামযুক্ত স্লটে প্রপস পাস করা:

```vue-html
<slot name="header" message="hello"></slot>
```

নোট করুন একটি স্লটের `name` প্রপস-এ অন্তর্ভুক্ত করা হবে না কারণ এটি সংরক্ষিত - তাই ফলস্বরূপ `headerProps` হবে `{ message: 'hello' }`।

আপনি যদি ডিফল্ট স্কোপড স্লটের সাথে নামযুক্ত স্লটগুলি মিশ্রিত করেন তবে আপনাকে ডিফল্ট স্লটের জন্য একটি স্পষ্ট `<template>` ট্যাগ ব্যবহার করতে হবে। কম্পোনেন্টে সরাসরি `v-slot` নির্দেশনা রাখার চেষ্টা করলে একটি সংকলন ত্রুটি দেখা দেবে। এটি ডিফল্ট স্লটের প্রপসের সুযোগ সম্পর্কে কোনও অস্পষ্টতা এড়াতে। উদাহরণ স্বরূপ:

```vue-html
<!-- This template won't compile -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message belongs to the default slot, and is not available here -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

ডিফল্ট স্লটের জন্য একটি স্পষ্ট `<template>` ট্যাগ ব্যবহার করা এটি স্পষ্ট করতে সাহায্য করে যে অন্য স্লটের ভিতরে `message` প্রপ উপলব্ধ নেই:

```vue-html
<template>
  <MyComponent>
    <!-- Use explicit default slot -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```

### Fancy List Example {#fancy-list-example}

আপনি হয়তো ভাবছেন যে স্কোপড স্লটের জন্য একটি ভাল ব্যবহারের ক্ষেত্রে কী হবে। এখানে একটি উদাহরণ দেওয়া হল: একটি `<FancyList>` উপাদানের কল্পনা করুন যা আইটেমগুলির একটি তালিকা রেন্ডার করে - এটি দূরবর্তী ডেটা লোড করার জন্য, একটি তালিকা প্রদর্শন করতে ডেটা ব্যবহার করে, এমনকি পৃষ্ঠা সংখ্যা বা অসীম স্ক্রলিংয়ের মতো উন্নত বৈশিষ্ট্যগুলিকে এনক্যাপসুলেট করতে পারে৷ যাইহোক, আমরা চাই যে প্রতিটি আইটেম দেখতে কেমন হবে তার সাথে এটি নমনীয় হোক এবং প্রতিটি আইটেমের স্টাইলিংটি মূল উপাদানের উপর ছেড়ে দিন যা এটি ব্যবহার করে। তাই পছন্দসই ব্যবহার এই মত দেখতে পারে:

```vue-html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>
```

`<FancyList>`-এর ভিতরে, আমরা একই `<slot>` বিভিন্ন আইটেম ডেটার সাথে একাধিকবার রেন্ডার করতে পারি (লক্ষ্য করুন আমরা একটি বস্তুকে স্লট প্রপস হিসেবে পাস করতে `v-bind` ব্যবহার করছি):

```vue-html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBGYW5jeUxpc3QgZnJvbSAnLi9GYW5jeUxpc3QudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEZhbmN5TGlzdCA6YXBpLXVybD1cInVybFwiIDpwZXItcGFnZT1cIjEwXCI+XG4gICAgPHRlbXBsYXRlICNpdGVtPVwieyBib2R5LCB1c2VybmFtZSwgbGlrZXMgfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj5cbiAgICAgICAgPHA+e3sgYm9keSB9fTwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJtZXRhXCI+Ynkge3sgdXNlcm5hbWUgfX0gfCB7eyBsaWtlcyB9fSBsaWtlczwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvRmFuY3lMaXN0PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cbi5tZXRhIHtcbiAgZm9udC1zaXplOiAwLjhlbTtcbiAgY29sb3I6ICM0MmI4ODM7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJGYW5jeUxpc3QudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbJ2FwaS11cmwnLCAncGVyLXBhZ2UnXSlcblxuY29uc3QgaXRlbXMgPSByZWYoW10pXG5cbi8vIG1vY2sgcmVtb3RlIGRhdGEgZmV0Y2hpbmdcbnNldFRpbWVvdXQoKCkgPT4ge1xuICBpdGVtcy52YWx1ZSA9IFtcbiAgICB7IGJvZHk6ICdTY29wZWQgU2xvdHMgR3VpZGUnLCB1c2VybmFtZTogJ0V2YW4gWW91JywgbGlrZXM6IDIwIH0sXG5cdCAgeyBib2R5OiAnVnVlIFR1dG9yaWFsJywgdXNlcm5hbWU6ICdOYXRhbGlhIFRlcGx1aGluYScsIGxpa2VzOiAxMCB9XG4gIF1cbn0sIDEwMDApXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8dWw+XG4gICAgPGxpIHYtaWY9XCIhaXRlbXMubGVuZ3RoXCI+XG4gICAgICBMb2FkaW5nLi4uXG4gICAgPC9saT5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGl0ZW1zXCI+XG4gICAgICA8c2xvdCBuYW1lPVwiaXRlbVwiIHYtYmluZD1cIml0ZW1cIi8+XG4gICAgPC9saT5cbiAgPC91bD5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG4gIHVsIHtcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICM0MmQzOTIgMjUlLCAjNjQ3ZWZmKTtcbiAgfVxuICBsaSB7XG4gICAgcGFkZGluZzogNXB4IDIwcHg7XG4gICAgbWFyZ2luOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gIH1cbjwvc3R5bGU+In0=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBGYW5jeUxpc3QgZnJvbSAnLi9GYW5jeUxpc3QudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEZhbmN5TGlzdFxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8RmFuY3lMaXN0IGFwaS11cmw9XCJ1cmxcIiA6cGVyLXBhZ2U9XCIxMFwiPlxuICAgIDx0ZW1wbGF0ZSAjaXRlbT1cInsgYm9keSwgdXNlcm5hbWUsIGxpa2VzIH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+XG4gICAgICAgIDxwPnt7IGJvZHkgfX08L3A+XG4gICAgICAgIDxwIGNsYXNzPVwibWV0YVwiPmJ5IHt7IHVzZXJuYW1lIH19IHwge3sgbGlrZXMgfX0gbGlrZXM8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L0ZhbmN5TGlzdD5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubWV0YSB7XG4gIGZvbnQtc2l6ZTogMC44ZW07XG4gIGNvbG9yOiAjNDJiODgzO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiRmFuY3lMaXN0LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ2FwaS11cmwnLCAncGVyLXBhZ2UnXSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IFtdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIC8vIG1vY2sgcmVtb3RlIGRhdGEgZmV0Y2hpbmdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgIHsgYm9keTogJ1Njb3BlZCBTbG90cyBHdWlkZScsIHVzZXJuYW1lOiAnRXZhbiBZb3UnLCBsaWtlczogMjAgfSxcbiAgICAgICAgeyBib2R5OiAnVnVlIFR1dG9yaWFsJywgdXNlcm5hbWU6ICdOYXRhbGlhIFRlcGx1aGluYScsIGxpa2VzOiAxMCB9XG4gICAgICBdXG4gICAgfSwgMTAwMClcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHVsPlxuICAgIDxsaSB2LWlmPVwiIWl0ZW1zLmxlbmd0aFwiPlxuICAgICAgTG9hZGluZy4uLlxuICAgIDwvbGk+XG4gICAgPGxpIHYtZm9yPVwiaXRlbSBpbiBpdGVtc1wiPlxuICAgICAgPHNsb3QgbmFtZT1cIml0ZW1cIiB2LWJpbmQ9XCJpdGVtXCIvPlxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuICB1bCB7XG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMzE1ZGVnLCAjNDJkMzkyIDI1JSwgIzY0N2VmZik7XG4gIH1cbiAgbGkge1xuICAgIHBhZGRpbmc6IDVweCAyMHB4O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICB9XG48L3N0eWxlPiJ9)

</div>

### Renderless Components {#renderless-components}

আমরা উপরে আলোচনা করা `<FancyList>` ব্যবহারের ক্ষেত্রে স্কোপড স্লটের মাধ্যমে ভিজ্যুয়াল আউটপুটের অংশ ভোক্তাদের কাছে অর্পণ করার সময় পুনঃব্যবহারযোগ্য লজিক (ডেটা আনা, পেজিনেশন ইত্যাদি) এবং ভিজ্যুয়াল আউটপুট উভয়কেই অন্তর্ভুক্ত করে।

আমরা যদি এই ধারণাটিকে আরও কিছুটা এগিয়ে দেই, তাহলে আমরা এমন উপাদান নিয়ে আসতে পারি যা শুধুমাত্র যুক্তিকে এনক্যাপসুলেট করে এবং নিজে থেকে কিছু রেন্ডার করে না - ভিজ্যুয়াল আউটপুট সম্পূর্ণরূপে স্কোপড স্লট সহ ভোক্তা উপাদানের কাছে অর্পণ করা হয়। আমরা এই ধরনের কম্পোনেন্টকে **রেন্ডারলেস কম্পোনেন্ট** বলি।

একটি উদাহরণ রেন্ডারলেস কম্পোনেন্ট হতে পারে যা বর্তমান মাউসের অবস্থান ট্র্যাক করার যুক্তিকে এনক্যাপসুলেট করে:

```vue-html
<MouseTracker v-slot="{ x, y }">
  Mouse is at: {{ x }}, {{ y }}
</MouseTracker>
```

<div class="composition-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBNb3VzZVRyYWNrZXIgZnJvbSAnLi9Nb3VzZVRyYWNrZXIudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PE1vdXNlVHJhY2tlciB2LXNsb3Q9XCJ7IHgsIHkgfVwiPlxuICBcdE1vdXNlIGlzIGF0OiB7eyB4IH19LCB7eyB5IH19XG5cdDwvTW91c2VUcmFja2VyPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiTW91c2VUcmFja2VyLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQgfSBmcm9tICd2dWUnXG4gIFxuY29uc3QgeCA9IHJlZigwKVxuY29uc3QgeSA9IHJlZigwKVxuXG5jb25zdCB1cGRhdGUgPSBlID0+IHtcbiAgeC52YWx1ZSA9IGUucGFnZVhcbiAgeS52YWx1ZSA9IGUucGFnZVlcbn1cblxub25Nb3VudGVkKCgpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGUpKVxub25Vbm1vdW50ZWQoKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZSkpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c2xvdCA6eD1cInhcIiA6eT1cInlcIi8+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="options-api">

[চেষ্টা করুন](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBNb3VzZVRyYWNrZXIgZnJvbSAnLi9Nb3VzZVRyYWNrZXIudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIE1vdXNlVHJhY2tlclxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8TW91c2VUcmFja2VyIHYtc2xvdD1cInsgeCwgeSB9XCI+XG4gIFx0TW91c2UgaXMgYXQ6IHt7IHggfX0sIHt7IHkgfX1cblx0PC9Nb3VzZVRyYWNrZXI+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJNb3VzZVRyYWNrZXIudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB1cGRhdGUoZSkge1xuICAgICAgdGhpcy54ID0gZS5wYWdlWFxuICAgICAgdGhpcy55ID0gZS5wYWdlWVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy51cGRhdGUpXG4gIH0sXG4gIHVubW91bnRlZCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy51cGRhdGUpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxzbG90IDp4PVwieFwiIDp5PVwieVwiLz5cbjwvdGVtcGxhdGU+In0=)

</div>

যদিও একটি আকর্ষণীয় প্যাটার্ন, রেন্ডারলেস কম্পোনেন্টের সাথে যা অর্জন করা যায় তার বেশিরভাগই কম্পোনেন্ট এপিআই-এর সাহায্যে আরও দক্ষ ফ্যাশনে অর্জন করা যেতে পারে, অতিরিক্ত কম্পোনেন্ট নেস্টিংয়ের ওভারহেড খরচ না করে। পরে, আমরা দেখব কিভাবে আমরা একই মাউস ট্র্যাকিং কার্যকারিতা একটি [Composable](/guide/reusability/composables.html) হিসাবে প্রয়োগ করতে পারি।

এটি বলেছে, স্কোপড স্লটগুলি এখনও সেই ক্ষেত্রে কার্যকর যেখানে আমাদের যুক্তি **এবং** উভয়ই ভিজ্যুয়াল আউটপুট রচনা করতে হবে, যেমন `<FancyList>` উদাহরণে।
