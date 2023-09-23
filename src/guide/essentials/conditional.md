# رِندر شرطی (Conditional Rendering) {#conditional-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/conditional-rendering-in-vue-3" title="Free Vue.js Conditional Rendering Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue" title="Free Vue.js Conditional Rendering Lesson"/>
</div>

<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

## `v-if` {#v-if}

از دستور `v-if` برای رِندر شرطی روی یک بلوک استفاده می‌شود. بلوک فقط در صورتی رِندر می‌شود که عبارت داخل دستور یک مقدار صحیح برگرداند.

```vue-html
<h1 v-if="awesome"> Vue عالی است! </h1>
```

## `v-else` {#v-else}

می‌توانید از دستور `v-else` برای مشخص کردن قسمت "else" برای `v-if` استفاده کنید:

```vue-html
<button @click="awesome = !awesome"> تغییر وضعیت </button>

<h1 v-if="awesome"> Vue عالی است! </h1>
<h1 v-else> اوه نه 😢 </h1>
```

<div class="demo">
  <button @click="awesome = !awesome"> تغییر وضعیت </button>
  <h1 v-if="awesome"> Vue عالی است! </h1>
  <h1 v-else> اوه نه 😢 </h1>
</div>

<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNpFjkEOgjAQRa8ydIMulLA1hegJ3LnqBskAjdA27RQXhHu4M/GEHsEiKLv5mfdf/sBOxux7j+zAuCutNAQOyZtcKNkZbQkGsFjBCJXVHcQBjYUSqtTKERR3dLpDyCZmQ9bjViiezKKgCIGwM21BGBIAv3oireBYtrK8ZYKtgmg5BctJ13WLPJnhr0YQb1Lod7JaS4G8eATpfjMinjTphC8wtg7zcwNKw/v5eC1fnvwnsfEDwaha7w==)

</div>
<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNpFjj0OwjAMha9iMsEAFWuVVnACNqYsoXV/RJpEqVOQqt6DDYkTcgRSWoplWX7y56fXs6O1u84jixlvM1dbSoXGuzWOIMdCekXQCw2QS5LrzbQLckje6VEJglDyhq1pMAZyHidkGG9hhObRYh0EYWOVJAwKgF88kdFwyFSdXRPBZidIYDWvgqVkylIhjyb4ayOIV3votnXxfwrk2SPU7S/PikfVfsRnGFWL6akCbeD9fLzmK4+WSGz4AA5dYQY=)

</div>

یک عنصر `v-else` باید بلافاصله بعد از یک عنصر `v-if` یا `v-else-if` قرار بگیرد - در غیر این صورت شناخته نخواهد شد.

## `v-else-if` {#v-else-if}

`v-else-if`، همانطور که از اسمش پیداست، به عنوان یک بلوک "else if" برای `v-if` عمل می‌کند. همچنین می‌تواند به صورت زنجیره‌ای، چندین بار استفاده شود:

```vue-html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

مشابه `v-else`، یک عنصر `v-else-if` باید بلافاصله بعد از یک عنصر `v-if` یا `v-else-if`  قرار بگیرد.

## `v-if` روی `<template>` {#v-if-on-template}

از آنجا که `v-if` یک دستورالعمل است، باید روی یک عنصر قرار بگیرد. اما اگر بخواهیم بیش از یک عنصر را تغییر دهیم چطور؟ در این صورت می‌توان از `v-if` روی عنصر `<template>` استفاده کرد که به عنوان یک پوشش مخفی عمل می‌کند. نتیجهٔ نهایی رِندر شده شامل عنصر `<template>` نخواهد بود.

```vue-html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

همچنین می‌توانیم از `v-else` و `v-else-if` روی `<template>` استفاده کنیم.

## `v-show` {#v-show}

گزینهٔ دیگر برای نمایش شرطی یک عنصر، دستور `v-show` است. استفاده از آن تا حد زیادی مشابه است:

```vue-html
<h1 v-show="ok">Hello!</h1>
```

تفاوت در این است که یک عنصر با `v-show` همیشه رِندر می‌شود و در DOM باقی می‌ماند. `v-show` فقط ویژگی `display` عنصر را در css آن تغییر می‌دهد.

`v-show` از عنصر `<template>` پشتیبانی نمی‌کند و همچنین `v-else` را قبول نمی‌کند.

## `v-if` در مقابل `v-show` {#v-if-vs-v-show}

`v-if` یک رِندر شرطی "واقعی" است چون اطمینان حاصل می‌کند که event listenerها و کامپوننت‌های فرزند داخل بلوک شرطی به درستی در طول جابجایی از بین بروند و دوباره ساخته شوند.

`v-if` همچنین دارای تاخیر در لود شدن است (**lazy**): اگر شرط در ابتدا false باشد، هیچ کاری انجام نمی‌دهد - بلوک شرطی تا زمانی که شرط برای اولین بار true شود رِندر نمی‌شود.

در مقابل، `v-show` خیلی ساده‌تر است - عنصر همیشه صرف نظر از شرط اولیه رِندر می‌شود، با تغییر وضعیت مبتنی بر CSS عمل می‌کند.

به طور کلی، `v-if` هزینه‌ی تغییر وضعیت بالاتری دارد در حالی که `v-show` هزینه‌ی رِندر اولیه بالاتری دارد. پس اگر نیاز است چیزی به طور مکرر تغییر کند از `v-show` استفاده کنید و اگر شرط احتمالا در رانتایم تغییر نمی‌کند از `v-if` استفاده کنید. (مترجم: استفاده از `v-if` راحت‌تر است.)

## `v-if` با `v-for` {#v-if-with-v-for}

::: warning توجه داشته باشید
استفاده از `v-if` و `v-for` روی یک عنصر به دلیل اولویت ضمنی، **توصیه نمی‌شود**. برای جزئیات به [style guide](/style-guide/rules-essential#avoid-v-if-with-v-for) مراجعه کنید. 
:::

زمانی که `v-if` و `v-for` هر دو روی یک عنصر استفاده می‌شوند، ابتدا `v-if` ارزیابی می‌شود. برای جزئیات به [list rendering guide](list#v-for-with-v-if) مراجعه کنید.
