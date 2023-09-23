# نمایش لیست {#list-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/list-rendering-in-vue-3" title="Free Vue.js List Rendering Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-list-rendering-in-vue" title="Free Vue.js List Rendering Lesson"/>
</div>

## `v-for` {#v-for}

ما می‌توانیم از دستور `v-for` برای نمایش یک لیست از آیتم‌ها، بر اساس یک آرایه استفاده کنیم. دستور `v-for` نیاز به یک سینتکس ویژه به شکل `item in items` دارد، جایی که `items` آرایه منبع و `item` **نام مستعار** برای عنصر آرایه‌ای است که در حال حلقه زدن بر آن هستیم:

<div class="composition-api">

```js
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>

<div class="options-api">

```js
data() {
  return {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="item in items">
  {{ item.message }}
</li>
```

درون اِسکوپ `v-for`، عبارات الگو (آنچه داخل `v-for` می‌نویسیم) دسترسی به همه مشخصه‌های اِسکوپ والد را دارند. علاوه بر این، `v-for` همچنین از یک نام دوم اختیاری برای اَندیس آیتم فعلی پشتیبانی می‌کند:

<div class="composition-api">

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>
<div class="options-api">

```js
data() {
  return {
    parentMessage: 'Parent',
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

<script setup>
const parentMessage = 'Parent'
const items = [{ message: 'Foo' }, { message: 'Bar' }]
</script>
<div class="demo">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</div>

<div class="composition-api">

دقت کنید در مثال بالا دایره برای المنت `<li> </li>` می‌باشد [امتحان این مورد در Playground](https://play.vuejs.org/#eNpdTsuqwjAQ/ZVDNlFQu5d64bpwJ7g3LopOJdAmIRlFCPl3p60PcDWcM+eV1X8Iq/uN1FrV6RxtYCTiW/gzzvbBR0ZGpBYFbfQ9tEi1ccadvUuM0ERyvKeUmithMyhn+jCSev4WWaY+vZ7HjH5Sr6F33muUhTR8uW0ThTuJua6mPbJEgGSErmEaENedxX3Z+rgxajbEL2DdhR5zOVOdUSIEDOf8M7IULCHsaPgiMa1eK4QcS6rOSkhdfapVeQLQEWnH)

</div>
<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNpVTssKwjAQ/JUllyr0cS9V0IM3wbvxEOxWAm0a0m0phPy7m1aqhpDsDLMz48XJ2nwaUZSiGp5OWzpKg7PtHUGNjRpbAi8NQK1I7fbrLMkhjc5EJAn4WOXQ0BWHQb2whOS24CSN6qjXhN1Qwt1Dt2kufZ9ASOGXOyvH3GMNCdGdH75VsZVjwGa2VYQRUdVqmLKmdwcpdjEnBW1qnPf8wZIrBQujoff/RSEEyIDZZeGLeCn/dGJyCSlazSZVsUWL8AYme21i)

</div>

اِسکوپ متغیر در `v-for` مشابه کد جاوااسکریپت زیر است:

```js
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // دارد `parentMessage` دسترسی به متغیر بیرونی
  // فقط در اینجا در دسترس هستند `index` و `item` اما
  console.log(parentMessage, item.message, index)
})
```

توجه کنید که مقدار `v-for` با امضای تابع `forEach` همخوانی دارد. در واقع، می‌توانید برای نماینده مورد استفاده در `v-for` از تخریب (اشاره به destructuring) متشابه با تخریب آرگومان‌های تابع استفاده کنید.

```vue-html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- with index alias -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

برای `v-for` تو در تو، اِسکوپ متغیر هم مشابه توابع تو در تو عمل می‌کند. هر اِسکوپ `v-for` دسترسی به اِسکوپ والد و بالاتر دارد:

```vue-html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

همچنین می‌توانید به جای `in` از `of` به عنوان جداکننده استفاده کنید تا به سینتکس جاوااسکریپت برای iterator نزدیک‌تر باشد:

```vue-html
<div v-for="item of items"></div>
```

## `v-for` با یک شیء  {#v-for-with-an-object}

همچنین می‌توانید از `v-for` برای تکرار کلیدهای یک شیء استفاده کنید. ترتیب تکرار بر اساس نتیجه تابع `Object.keys()‎` روی شیء خواهد بود:

<div class="composition-api">

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    myObject: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
}
```

</div>

```vue-html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

همچنین می‌توانید یک نام مستعار دیگر برای مشخصه کلید ارائه دهید:

```vue-html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

و یکی دیگر برای اَندیس:

```vue-html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

<div class="composition-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNo9jjFvgzAQhf/KE0sSCQKpqg7IqRSpQ9WlWycvBC6KW2NbcKaNEP+9B7Tx4nt33917Y3IKYT9ESspE9XVnAqMnjuFZO9MG3zFGdFTVbAbChEvnW2yE32inXe1dz2hv7+dPqhnHO7kdtQPYsKUSm1f/DfZoPKzpuYdx+JAL6cxUka++E+itcoQX/9cO8SzslZoTy+yhODxlxWN2KMR22mmn8jWrpBTB1AZbMc2KVbTyQ56yBkN28d1RJ9uhspFSfNEtFf+GfnZzjP/oOll2NQPjuM4xTftZyIaU5VwuN0SsqMqtWZxUvliq/J4jmX4BTCp08A==)

</div>
<div class="options-api">

[امتحان این مورد در Playground](https://play.vuejs.org/#eNo9T8FqwzAM/RWRS1pImnSMHYI3KOwwdtltJ1/cRqXe3Ng4ctYS8u+TbVJjLD3rPelpLg7O7aaARVeI8eS1ozc54M1ZT9DjWQVDMMsBoFekNtucS/JIwQ8RSQI+1/vX8QdP1K2E+EmaDHZQftg/IAu9BaNHGkEP8B2wrFYxgAp0sZ6pn2pAeLepmEuSXDiy7oL9gduXT+3+pW6f631bZoqkJY/kkB6+onnswoDw6owijIhEMByjUBgNU322/lUWm0mZgBX84r1ifz3ettHmupYskjbanedch2XZRcAKTnnvGVIPBpkqGqPTJNGkkaJ5+CiWf4KkfBs=)

</div>

## `v-for` با یک محدوده مشخص {#v-for-with-a-range}

`v-for` همچنین می‌تواند یک عدد صحیح بگیرد. در این حالت، الگو مورد نظر به تعداد آن تکرار می‌شود، بر اساس یک محدوده از `‍‎1...n`.

```vue-html
<span v-for="n in 10">{{ n }}</span>
```

توجه کنید که در اینجا `n` با مقدار اولیه `1` به جای `0` شروع می‌شود.

## `v-for` روی `<template>`  {#v-for-on-template}

مشابه الگوی `v-if`، می‌توانید از تگ `<template>` با `v-for` برای رندر کردن یک بلوک از چندین المان استفاده کنید. برای مثال:

```vue-html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-if` با `v-for` {#v-if-with-v-for}

::: warning توجه داشته باشید
استفاده از `v-if` و `v-for` روی یک عنصر به دلیل اولویت ضمنی، **توصیه نمی‌شود**. برای جزئیات به [style guide](/style-guide/rules-essential#avoid-v-if-with-v-for) مراجعه کنید. 
:::

وقتی هر دو روی یک نود وجود داشته باشند، `v-if` اولویت بالاتری نسبت به `v-for` دارد. این بدان معناست که شرط `v-if` دسترسی به متغیرهای درون اِسکوپ `v-for` نخواهد داشت:

```vue-html
<!--
"todo" خطا می‌دهد چون خاصیت
بر روی نمونه تعریف نشده است
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

این مشکل با انتقال `v-for` به یک تگ `<template>` (که واضح‌تر هم هست) حل می‌شود:

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## حفظ وضعیت با `key` {#maintaining-state-with-key}

وقتی Vue لیستی از المان‌های رندرشده با `v-for` را به‌روزرسانی می‌کند، به طور پیش‌فرض از استراتژی پچ در محل (in-place patch) استفاده می‌کند. اگر ترتیب آیتم‌های داده تغییر کرده باشد، به جای جابجایی المان‌های DOM برای مطابقت با ترتیب آیتم‌ها، Vue هر المان را د رجای قبلی خود اصلاح می‌کند و مطمئن می‌شود که محتوای رندرشده در آن اندیس خاص درست است.

این حالت پیش‌فرض بهینه است، اما **فقط وقتی مناسب است که خروجی رندر لیست شما به state کامپوننت فرزند یا state موقتی DOM (مثل مقادیر فرم) وابسته نباشد.**

برای اینکه به Vue کمک کنید هویت هر نود را دنبال کند و در نتیجه المان‌های موجود را در استفاده مجدد مرتب کند، نیاز است برای هر آیتم یک خاصیت `key` منحصربفرد ارائه دهید:

```vue-html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

وقتی از `<template v-for>` استفاده می‌کنید، `key` باید روی خود تگ `<template>` قرار بگیرد:

```vue-html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

:::tip توجه
`key` اینجا یک خاصیت ویژه‌ای است که با `v-bind` پیاده سازی شده است. نباید آن را با متغیر کلیدی key هنگام [استفاده از v-for با یک شیء](#v-for-with-an-object) اشتباه بگیرید.
:::

[توصیه می‌شود](/style-guide/rules-essential#use-keyed-v-for) هر جا امکان دارد یک خاصیت `key` با `v-for` ارائه دهید، مگر اینکه محتوای DOM تکرارشونده ساده باشد (هیچ اجزاء یا المان‌های DOM حاوی state نباشد) یا عمداً برای افزایش عملکرد به رفتار پیش فرض تکیه می کنید. (مترجم:‌ همه جا از `key` استفاده کنید چون از آینده خبر ندارید و نمی‌دونید چه بلایی قراره سر کدی که شما نوشتید بیاد 😃)

خاصیت `key` مقادیر اولیه - یعنی رشته‌ها و اعداد - را انتظار دارد. از شیء‌ها به عنوان کلید `v-for` استفاده نکنید. برای استفاده جزئی از خاصیت `key` لطفا به [مستندات API key](/api/built-in-special-attributes#key) مراجعه کنید. (مترجم: از `index` درون `v-for` به عنوان `key` استفاده نکنید)

## `v-for` به‌همراه کامپوننت  {#v-for-with-a-component}

> این بخش به پیش‌نیاز [کامپوننت‌ها](/guide/essentials/component-basics) نیاز دارد. اگر می‌خواهید می‌توانید آن را رد کنید و بعدا برگردید.

می‌توانید مستقیما `v-for` را روی یک کامپوننت، مانند هر المان عادی، استفاده کنید (فراموش نکنید `key` ارائه دهید):

```vue-html
<MyComponent v-for="item in items" :key="item.id" />
```

اما این به طور خودکار داده‌ای را به کامپوننت منتقل نمی‌کند، چرا که کامپوننت‌ها اِسکوپ مستقل خودشان را دارند. برای منتقل کردن داده‌ به کامپوننت، باید از props هم استفاده کنیم:

```vue-html
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

دلیل اینکه `item` به طور خودکار به کامپوننت تزریق نمی‌شود این است که این کار باعث وابستگی شدید کامپوننت به نحوه کارکرد `v-for` می‌شود. مشخص کردن صریح منبع داده‌ باعث می‌شود کامپوننت در سایر موقعیت‌ها نیز قابل استفاده مجدد باشد.

<div class="composition-api">

[این مثال لیست کارها](https://play.vuejs.org/#eNp1U8Fu2zAM/RXCGGAHTWx02ylwgxZYB+ywYRhyq3dwLGYRYkuCJTsZjPz7KMmK3ay9JBQfH/meKA/Rk1Jp32G0jnJdtVwZ0Gg6tSkEb5RsDQzQ4h4usG9lAzGVxldoK5n8ZrAZsTQLCduRygAKUUmhDQg8WWyLZwMPtmESx4sAGkL0mH6xrMH+AHC2hvuljw03Na4h/iLBHBAY1wfUbsTFVcwoH28o2/KIIDuaQ0TTlvrwNu/TDe+7PDlKXZ6EZxTiN4kuRI3W0dk4u4yUf7bZfScqw6WAkrEf3m+y8AOcw7Qv6w5T1elDMhs7Nbq7e61gdmme60SQAvgfIhExiSSJeeb3SBukAy1D1aVBezL5XrYN9Csp1rrbNdykqsUehXkookl0EVGxlZHX5Q5rIBLhNHFlbRD6xBiUzlOeuZJQz4XqjI+BxjSSYe2pQWwRBZizV01DmsRWeJA1Qzv0Of2TwldE5hZRlVd+FkbuOmOksJLybIwtkmfWqg+7qz47asXpSiaN3lxikSVwwfC8oD+/sEnV+oh/qcxmU85mebepgLjDBD622Mg+oDrVquYVJm7IEu4XoXKTZ1dho3gnmdJhedEymn9ab3ysDPdc4M9WKp28xE5JbB+rzz/Trm3eK3LAu8/E7p2PNzYM/i3ChR7W7L7hsSIvR7L2Aal1EhqTp80vF95sw3WcG7r8A0XaeME=) را ببینید تا بیاموزید چگونه با استفاده از `v-for` لیستی از کامپوننت‌ها را رندر کرده و داده‌های متفاوتی به هر نمونه ارسال کنید.

</div>
<div class="options-api">

[این مثال لیست کارها](https://play.vuejs.org/#eNqNVE2PmzAQ/SsjVIlEm4C27Qmx0a7UVuqhPVS5lT04eFKsgG2BSVJF+e8d2xhIu10tihR75s2bNx9wiZ60To49RlmUd2UrtNkUUjRatQa2iquvBhvYt6qBOEmDwQbEhQQoJJ4dlOOe9bWBi7WWiuIlStNlcJlYrivr5MywxdIDAVo0fSvDDUDiyeK3eDYZxLGLsI8hI7H9DHeYQuwjeAb3I9gFCFMjUXxSYCoELroKO6fZP17Mf6jev0i1ZQcE1RtHaFrWVW/l+/Ai3zd1clQ1O8k5Uzg+j1HUZePaSFwfvdGhfNIGTaW47bV3Mc6/+zZOfaaslegS18ZE9121mIm0Ep17ynN3N5M8CB4g44AC4Lq8yTFDwAPNcK63kPTL03HR6EKboWtm0N5MvldtA8e1klnX7xphEt3ikTbpoYimsoqIwJY0r9kOa6Ag8lPeta2PvE+cA3M7k6cOEvBC6n7UfVw3imPtQ8eiouAW/IY0mElsiZWqOdqkn5NfCXxB5G6SJRvj05By1xujpJWUp8PZevLUluqP/ajPploLasmk0Re3sJ4VCMnxvKQ//0JMqrID/iaYtSaCz+xudsHjLpPzscVGHYO3SzpdixIXLskK7pcBucnTUdgg3kkmcxhetIrmH4ebr8m/n4jC6FZp+z7HTlLsVx1p4M7odcXPr6+Lnb8YOne5+C2F6/D6DH2Hx5JqOlCJ7yz7IlBTbZsf7vjXVBzjvLDrH5T0lgo=) را ببینید تا بیاموزید چگونه با استفاده از `v-for` لیستی از کامپوننت‌ها را رندر کرده و داده‌های متفاوتی به هر نمونه ارسال کنید.

</div>

## تشخیص تغییرات آرایه {#array-change-detection}

### متدهای ایجاد تغییر {#mutation-methods}

Vue می‌تواند تشخیص دهد که کدام متد برای تغییر محتوا یک آرایه واکنش‌گرا (reactive) صدا زده شده‌ و به‌روزرسانی‌های لازم را اعمال کند. این متدها عبارتند از:

- `push()‎`
- `pop()‎`
- `shift()‎`
- `unshift()‎`
- `splice()‎`
- `sort()‎`
- `reverse()‎`

### جایگزینی یک آرایه {#replacing-an-array}

همانطور که از نامشان پیداست، متدهای تغییر محتوا روی آرایه‌ای که روی آن صدا زده می‌شوند تغییر ایجاد می‌کنند. در مقابل، روش‌های غیرجهشی مانند `filter()‎`، `concat()‎` و `slice()‎` روی آرایه اصلی تغییر ایجاد نمی‌کنند بلکه **همیشه آرایه‌ای جدید** برمی‌گردانند. هنگام کار با این روش‌ها باید آرایه قدیمی را با آرایه جدید جایگزین کنیم:

<div class="composition-api">

```js
// با مقدار آرایه است ref یک `items`
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

</div>
<div class="options-api">

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

</div>

شاید فکر کنید این کار باعث می‌شود Vue تمام DOM موجود را دور بریزد و کل لیست را دوباره رندر کند - خوشبختانه اینطور نیست. Vue الگوریتم‌های هوشمندی را برای حداکثر استفاده مجدد از المان‌های DOM پیاده‌سازی کرده است، بنابراین جایگزین کردن یک آرایه با آرایه‌ای دیگر که حاوی شیء‌های تکراری است یک عملیات سبک است.

## نمایش نتایج فیلتر شده / مرتب‌ شده {#displaying-filtered-sorted-results}

گاهی اوقات می‌خواهیم نسخه‌ای فیلتر یا مرتب‌شده از یک آرایه را نمایش دهیم بدون اینکه واقعا روی داده‌های اصلی تغییر ایجاد کنیم یا آن‌ها را ریست کنیم. در این موارد می‌توانیم یک کامپیوتد (computed) بسازیم که آرایه فیلتر یا مرتب‌شده را برمی‌گرداند.

برای مثال:

<div class="composition-api">

```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    numbers: [1, 2, 3, 4, 5]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(n => n % 2 === 0)
  }
}
```

</div>

```vue-html
<li v-for="n in evenNumbers">{{ n }}</li>
```

در موقعیت‌هایی که از خاصیت‌های کامپیوتد (computed) امکان‌پذیر نیست (مثلا درون حلقه‌های تودرتوی `v-for`)، می‌توانید از یک متد استفاده کنید:

<div class="composition-api">

```js
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

</div>

```vue-html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

هنگام استفاده از `reverse()‎` و `sort()‎` در یک خاصیت کامپیوتد (computed) مراقب باشید! این دو متد روی آرایه اصلی تغییر ایجاد می‌کنند که در getter‌های کامپیوتد باید از آن اجتناب کرد. قبل از صدا زدن این متدها، یک کپی از آرایه اصلی را بسازید. (مانند کد زیر)

```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```
