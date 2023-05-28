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

[চেষ্টা করুন](https://play.vuejs.org/#eNpdUdlqAyEU/ZVbQ0kLMdNsXabTQFvoV8yLcRkkjopLSQj596oTwqRvnuM9y9UT+rR2/hs5qlHjqZM2gOch2m2rZW+NC/BDND1+xRCMBuFMD9N5NeKyeNrqphrUSZdA4L1VJPCEAJrRdCEAvpWke+g5NHcYg1cmADU6cB0A4zzThmYckqimupqiGfpXILe/zdwNhaki3n+0SOR5vAu6ReU++efUajtqYGJQ/FIg5w8Wt9FlOx+OKh/nV1c4ZVNqlHE1TIQQ7xnvCN13zkTNalBSc+Jw5wiTac2H1WLDeDeDyXrJVm9LWG7uE3hev3AhHge1cYwnO200L4QljEnd1bCxB1g82UNhe+I6qQs5kuGcE30NrxeaRudzOWtkemeXuHP5tLIKOv8BN+mw3w==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNpdUdtOwzAM/RUThAbSurIbl1ImARJf0ZesSapoqROlKdo07d9x0jF1SHmIT+xzcY7sw7nZTy9Zwcqu9tqFTYW6ddYH+OZYHz77ECyC8raFySwfYXFsUiFAhXKfBoRUvDcBjhGtLbGgxNAVcLziOlVIp8wvelQE2TrDg6QKoBx1JwDgy+h6B62E8ibLoDM2kAAGoocsiz1VKMfmCCrzCymbsn/GY95rze1grja8694rpmJ/tg1YsfRO/FE134wc2D4YeTYQ9QeKa+mUrgsHE6+zC+vfjoz1Bdwqpd5iveX1rvG2R1GA0Si5zxrPhaaY98v5WshmCrerhVi+LmCxvqPiafUslXoYpq0XkuiQ1p4Ax4XQ2BSwdnuYP7p9QlvuG40JHI1lUaenv3o5w3Xvu2jOWU179oQNn5aisNMvLBvDOg==)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNp1UmtOwkAQvspQYtCEgrx81EqCJibeoX+W7bRZaHc3+1AI4QyewH8ewvN4Aa/gbgtNIfFf5+vMfI/ZXbCQcvBmMYiCWFPFpAGNxsp5wlkphTLwQjjdPlljBIdMiRJ6g2EL88O9pnnxjlqU+EpbzS3s0BwPaypH4gqDpSyIQVcBxK3VFQDwXDC6hhJdlZi4zf3fRKwl4aDNtsDHJKCiECqiW8KTYH5c1gEnwnUdJ9rCh/XeM6Z42AgN+sFZAj6+Ux/LOjFaEK2diMz3h0vjNfj/zokuhPFU3lTdfcpShVOZcJ+DZgHs/HxtCrpZlj34eknoOlfC8jSCgnEkKswVSRlyczkZzVLM+9CdjtPJ/RjGswtX3ExvMcuu6mmhUnTruOBYAZKkKeN5BDO5gdG13FRoSVTOeAW2xkLPY3UEdweYWqW9OCkYN6gctq9uXllx2Z09CJ9dJwzBascI7nBYihWDldUGMqEgdTVIq6TQqCEMfUpNSD+fX7/fH+3b7P8AdGP6wA==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNptUltu2zAQvMpGQZEWsOzGiftQ1QBpgQK9g35oaikwkUiCj9aGkTPkBPnLIXKeXCBXyJKKBdoIoA/tYGd3doa74tqY+b+ARVXUjltp/FWj5GC09fCHKb79FbzXCoTVA5zNFxkWaWdT8/V/dHrAvzxrzrC3ZoBG4SYRWhQs9B52EeWapihU3lWwyxfPDgbfNYq+ejEppcLjYHrmkSqAOqMmAOB3L/ktDEhV4+v8gMR/l1M7wxQ4v+3xZ1Nw3Wtb8S1TTXG1H3cCJIO69oxc5mLUcrSrXkxSi1lxZGT0//CS9Wg875lzJELE/nLto4bko69dr31cFc8auw+3JHvSEfQ7nwbsHY9HwakQ4kes14zfdlYH1VbQS4XMlp1lraRMPl6cr1rsZnB6uWwvvi9hufpAxZfLryjEp5GtbYs0TlGICTCsbaXqKliZDZx/NpuEDsx2UiUwo5VxT6Dkv73BPFgXxRktlUdL2Jh6OoW8O3pX0buTsoTgaCNQcDjoGwk3wXkQ2tJLGzSYYI126KAso0uTSc8Pjy9P93k2d6+NyRKa)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNp1kMsKwjAQRX9lzMaNbfcSC/oL3WbT1ikU8yKZFEX8d5MGgi2YVeZxZ86dN7taWy8B2ZlxP7rZEnikYFuhZ2WNI+jCoGa6BSKjYXJGwbFufpNJfhSaN1kflTEgVFb2hDEC4IeqguARpl7KoR8fQPgkqKpc3Wxo1lxRWWeW+Y4wBk9x9V9d2/UL8g1XbOJN4WAntodOnrecQ2agl8WLYH7tFyw5olj10iR3EJ+gPCxDFluj0YS6EAqKR8mi9M3Td1ifLxWShcU=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp1UEEOwiAQ/MrKxYu1d4Mm+gWvXChuk0YKpCyNxvh3lxIb28SEA8zuDDPzEucQ9mNCcRAymqELdFKu64MfCK6p6Tu6JCLvoB18D9t9/Qtm4lY5AOXwMVFu2OpkCV4ZNZ51HDqKhwLAQjIjb+X4yHr+mh+EfbCakF8AclNVkCJCq61ttLkD4YOgqsp0YbGesJkVBj92NwSTIrH3v7zTVY8oF8F4SdazD7ET69S5rqXPpnigZ8CjEnHaVyInIp5G63O6XIGiIlZMzrGMd8RVfR0q4lIKKV+L+srW+wNTTZq3)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNp9UsFuwjAM/RWrHLgMOi5o6jIkdtphn9BLSF0aKU2ixEVjiH+fm8JoQdvRfu/5xS8+ZVvvl4cOsyITUQXtCSJS5zel1a13geBdRvyUR9cR1MG1MF/mt1YvnZdW5IOWVVwQtt5IQq4AxI2cau5ccZg1KCsMlz4jzWrzgQGh1fuGYIcgwcs9AmkyKHKGLyPykcfD1Apr2ZmrHUN+s+U5Qe6D9A3ULgA1bCK1BeUsoaWlyPuVb3xbgbSOaQGcxRH8v3XtHI0X8mmfeYToWkxmUhFoW7s/JvblJLERmj1l0+T7T5tqK30AZWSMb2WW3LTFUGZXp/u8o3EEVrbI9AFjLn8mt38fN9GIPrSp/p4/Yoj7OMZ+A/boN9KInPeZZpAOLNLRDAsPZDgN4p0L/NQFOV/Ayn9x6EZXMFNKvQ4E5YwLBczW6/WlU3NIi6i/sYDn5Qu2qX1OF51MsvMPkrIEHg==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNp9UkFuwjAQ/MoqHLiUpFxQlaZI9NRDn5CLSTbEkmNb9oKgiL934wRwQK3ky87O7njGPicba9PDHpM8KXzlpKV1qWVnjSP4FB6/xcnsCRpnOpin2R3qh+alBig1HgO9xkbsFcG5RyvDOzRq8vkAQLSury+l5lNkN1EuCDurBCFXAMWdH2pGrn2YtShqdCPOnXa5/kKH0MldS7BFEGDFDoEkKSwybo8rskjjaevo4L7Wrje8x4mdE7aFxjiglkWE1GxQE9tLi8xO+LoGoQ3THLD/qP2/dGMMxYZs8DP34E2HQUxUBFI35o+NfTlJLOomL8n04frXns7W8gCVEt5/lElQkxpdmVyVHvP2yhBo0SHThx5z+TEZvl1uMlP0oU3nH/kRo3iMI9Ybes960UyRsZ9pBuGDeTqpwfBAvn7NrXF81QUZm8PSHjl0JWuYVVX1PhAqo4zLYbZarUak4ZAWXv5gDq/pG3YBHn50EEkuv5irGBk=)

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

মনে রাখবেন অভিব্যক্তি সাপেক্ষে [syntax constraints](/guide/essentials/template-syntax#directives) গতিশীল নির্দেশিক আর্গুমেন্ট.

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

[চেষ্টা করুন](https://play.vuejs.org/#eNp9kMEKgzAMhl8l9OJlU3aVOhg7C3uAXsRlTtC2tFE2pO++dA5xMnZqk+b/8/2dxMnadBxQ5EL62rWWwCMN9qh021vjCMrn2fBNoya4OdNDkmarXhQnSstsVrOOC8LedhVhrEiuHca97wwVSsTj4oz1SvAUgKJpgqWZEj4IQoCvZm0Gtgghzss1BDvIbFkqdmID+CNdbbQnaBwitbop0fuqQSgguWPXmX+JePe1HT/QMtJBHnE51MZOCcjfzPx04JxsydPzp2Szxxo7vABY1I/p)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqFkNFqxCAQRX9l8CUttAl9DbZQ+rzQD/AlJLNpwKjoJGwJ/nvHpAnusrAg6FzHO567iE/nynlCUQsZWj84+lBmGJ31BKffL8sng4bg7O0IRVllWnpWKAOgDF7WBx2em0kTLElt975QbwLkhkmIyvCS1TGXC8LR6YYwVSTzH8yvQVt6VyJt3966oAR38XhaFjjEkvBCECNcia2d2CLyOACZQ7CDrI6h4kXcAF7lcg+za6h5et4JPdLkzV4B9B6RBtOfMISmxxqKH9TarrGtATxMgf/bDfM/qExEUCdEDuLGXAmoV06+euNs2JK7tyCrzSNHjX9aurQf)

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

প্রকৃতপক্ষে, এটি কীভাবে স্কোপড স্লটগুলি সংকলিত হয় এবং কীভাবে আপনি ম্যানুয়ালটিতে স্কোপড স্লটগুলি ব্যবহার করবেন তার খুব কাছাকাছি।[render functions](/guide/extras/render-function).

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

[চেষ্টা করুন](https://play.vuejs.org/#eNqFU11r20AQ/CtbhWIHZMlxkjZVHUMf2r6EUkgolCgPZ2mlHDndHXcnU9fVf++evixDP16Md9cztzszPgQftI52NQZJsLaZ4dqBRVfrTSp5pZVx8InJbH/HrYPCqApmUTx2PHCWynXcIQlDhcNKC+aQKoD1EZ0wzRe1EbdpQJ9pAIlGs9CsROpcLNOgBRBkIIAzTl9peICtyvch1BaNZBWGIPgLWmhGDKFyvoNMMGsJ4HGTGU315tCxQNOsY3/dcTTCKnSMYNs90I+HxwgAv3yjf7PpvkxJ1jE9Pmwfn95/FIvqkyGV1u0Fgs2Uxpw6kV8ADh5XKOkWlv/EBJbRDVbvfTNTQpkEzq5W25ubS2o1rfaeZBOEwYktf/fzAAYLaHo3OwdTmSlJHmmjtIVbyLHgEr/6av44642bhTAbLJs9nR9RXm6PIt75YzeIY6hU9kKtSpGTOaPDCnTZM5dlKmmjB16hqt18fg63m+7mlibaMVEjkT12enauJTC7b1WCe6Gchc81z5H2GUyi+ccdk/Bd1dRtDUpgtYQmpGXchOUbcT/UThnO/D0T/BdaUXAGD6hFTWuyI9EFEfltnkjxkKrlkm78V+hrMaRBcNgteEHhetWdJ1CW7nkSzjvFchIliqIhQIKfoAtl+kgDl51I09xbEgT8DWPuCbPlMh/reIxmz7yO2wX/k0aAWnTGAAlhKY5+vnB7TXJJJbHNJIBmuT8ggWv9o29tWfZSGlXLPCGoRGYWpaEzUbr55cV1jmXoU5xfvlvB6vo1FW+u3mJRnLf4Vms6vX97yk+ejo9UzJRcenf++O5ZURQD3fgnaX4DS1Wb6Q==)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqNVNtq20AQ/ZWpQnECujhO0qaqY+hD25fQl4RCifKwllbKktXushcT1/W/d1bSSnYJNCCEZmbPmcuZ1S76olS6cTTKo6UpNVN2VQjWKqktfCOi3N4yY6HWsoVZmo0eD5kVAqAQ9KU7XNGaOG5h572lRAZBhTV574CJzJv7QuCzzMaMaFjaKk4sRQtgOeUmiiVO85siwncRQa6oThRpKHrO50XUnUdEwMMJw08M7mAtq20MzlAtSEtj4OyZGkweMIiq2AZKToxBgMcdxDCqVrueBfb7ZaaOQiOspZYgbL0FPBySIQD+eMeQc99/HJIsM0weqs+O258mjfZREE1jt5yCKaWiFXpSX0A/5loKmxj2m+YwT69p+7kXg0udw8nlYn19fYGufvSeZBXF0ZGmR2vwmrJKS4WiPswGWWYxzIIgs8fYH6mIJadnQXdNrdMiWAB+yJ7gsXdgLfjqcK10wtJqgmYZ+spnpGgl6up5oaa2fGKi6U8Yau9ZS6Wzpwi7WU1p7BMzaZcLbuBh0q2XM4fZXTc+uOPSGvjuWEWxlaAexr9uiIBf0qG3Uy6HxXwo9B+mn47CvbNSM+LHccDxAyvmjMA9Vdxh1WQiO0eywBVGEaN3Pj972wVxPKwOZ7BJWI2b+K5rOOVUNPbpYJNvJalwZmmahm3j7AhdSz3sPzDRS3R4SQwOCXxP4yVBzJqJarSzcY8H5mXWFfif1QVwPGjGcQWTLp7YrcLxCfyDdAuMW0cq30AOV+plcK1J+dxoXJkqR6igRCeNxjbxp3N6cX5V0Sb2K19dfFrA4uo9Gh8uP9K6Puvw3eyx9SH3IT/qPCZpiW6Y8Gq9mvekrutAN96o/V99ALPj)

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

[চেষ্টা করুন](https://play.vuejs.org/#eNqNUcFqhDAQ/ZUhF12w2rO4Cz301t5aaCEX0dki1SQko6uI/96J7i4qLPQQmHmZ9+Y9ZhQvxsRdiyIVmStsZQgcUmtOUlWN0ZbgXbcOP2xe/KKFs9UNBHGyBj09kCpLFj4zuSFsTJ0T+o6yjUb35GpNRylG6CMYYJKCpwAkzWNQOcgphZG/YZoiX/DQNAttFjMrS+6LRCT2rh6HGsHiOQKtmKIIS19+qmZpYLrmXIKxM1Vo5Yj9HD0vfD7ckGGF3LDWlOyHP/idYPQCfdzldTtjscl/8MuDww78lsqHVHdTYXjwCpdKlfoS52X52qGit8oRKrRhwHYdNrrDILouPbCNVZCtgJ1n/6Xx8JYAmT8epD3fr5cC0oGLQYpkd4zpD27R0vA=)

</div>
<div class="options-api">

[চেষ্টা করুন](https://play.vuejs.org/#eNqVUU1rwzAM/SvCl7SQJTuHdLDDbttthw18MbW6hjW2seU0oeS/T0lounQfUDBGepaenvxO4tG5rIkoClGGra8cPUhT1c56ghcbA756tf1EDztva0iy/Ds4NCbSAEiD7diicafigeA0oFvLPAYNhWICYEE5IL00fMp8Hs0JYe0OinDIqFyIaO7CwdJGihO0KXTcLriK59NYBlUARTyMn6Hv0yHgIp7ARAvl3FXm8yCRiuu1Fv/x23JakVqtz3t5pOjNOQNoC7hPz0nHyRSzEr7Ghxppb/XlZ6JjRlzhTAlA+ypkLWwAM6c+8G2BdzP+/pPbRkOoL/KOldH2mCmtnxr247kKhAb9KuHKgLVtMEkn2knG+sIVzV9sfmy8hfB/swHKwV0oWja4lQKKjoNOivzKrf4L/JPqaQ==)

</div>

While an interesting pattern, most of what can be achieved with Renderless Components can be achieved in a more efficient fashion with Composition API, without incurring the overhead of extra component nesting. Later, we will see how we can implement the same mouse tracking functionality as a [Composable](/guide/reusability/composables).

এটি বলেছে, স্কোপড স্লটগুলি এখনও সেই ক্ষেত্রে কার্যকর যেখানে আমাদের যুক্তি **এবং** উভয়ই ভিজ্যুয়াল আউটপুট রচনা করতে হবে, যেমন `<FancyList>` উদাহরণে।
