# اتصال کلاس و استایل  (Class and Style Bindings) {#class-and-style-bindings}

یک نیاز رایج برای اتصال داده‌‌، دستکاری لیستِ کلاس‌ها و استایل‌های درون خطی (inline styles) یک عنصر است. از آنجا که `class` و `style` هر دو خاصیت هستند، می‌توانیم از `v-bind` برای اختصاص یک مقدار رشته‌ای به آن‌ها به صورت پویا، درست مانند سایر خاصیت‌ها استفاده کنیم. با این حال، تلاش برای تولید این مقادیر با استفاده از اتصال رشته‌ها می‌تواند خسته‌کننده و مستعد خطا باشد. به همین دلیل، Vue هنگامی که `v-bind` با `class` و `style` استفاده شود، قابلیت‌های ویژه‌ای را فراهم می‌کند. اضافه بر رشته‌ها، همچنین می‌توانند به اشیا یا آرایه‌ها نیز متصل شوند.

## اتصال کلاس‌های HTML {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

### اتصال به اشیاء (Binding to Objects) {#binding-to-objects}

می‌توانیم یک شیء را به `‎:class` (کوتاه‌شده عبارت `v-bind:class`) برای تعویض کلاس‌های المان به صورت پویا، ارسال کنیم:

```vue-html
<div :class="{ active: isActive }"></div>
```
  
سینتکس بالا بدین معناست که وجود کلاس `active` توسط مقدار درستی ([Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)) داده `isActive` تعیین خواهد شد.

شما می‌توانید چندین کلاس را با داشتن فیلدهای بیشتر در شیء تغییر دهید. علاوه بر این، دستور `‎:class` همچنین می‌تواند با خاصیت ساده `class` هم‌زیستی داشته باشد. بنابراین با در نظر گرفتن وضعیت زیر:

<div class="composition-api">

```js
const isActive = ref(true)
const hasError = ref(false)
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

</div>

و تمپلیت زیر:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

به این صورت رندر خواهد شد:

```vue-html
<div class="static active"></div>
```

وقتی `isActive` یا `hasError` تغییر کند، لیست کلاس‌ها به ترتیب به‌روزرسانی خواهد شد. به عنوان مثال، اگر `hasError` به `true` تبدیل شود، لیست کلاس‌ها به `"static active text-danger"` تبدیل خواهد شد.

شیء متصل‌شده نیازی نیست درون‌خطی (inline) باشد:

<div class="composition-api">

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

به این صورت رندر خواهد شد:

```vue-html
<div class="active"></div>
```

ما همچنین می‌توانیم به یک [computed property](./computed) که یک شیء برمی‌گرداند متصل شویم. این الگویی متداول و قدرتمند است:

<div class="composition-api">

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

### اتصال به آرایه‌ها {#binding-to-arrays}

می‌توانیم `‎:class` را به یک آرایه متصل کنیم تا یک لیست از کلاس‌ها را اعمال کنیم:

<div class="composition-api">

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

</div>

```vue-html
<div :class="[activeClass, errorClass]"></div>
```

که به این صورت رندر خواهد شد:

```vue-html
<div class="active text-danger"></div>
```

اگر می‌خواهید یک کلاس را در لیست به صورت شرطی تغییر دهید، می‌توانید از عبارت شرطی تک خطی (ternary expression) استفاده کنید:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

این همیشه `errorClass` را اعمال خواهد کرد، اما `activeClass` فقط زمانی اعمال خواهد شد که `isActive` درست باشد.

البته، ممکن است کمی طولانی شود اگر چندین کلاس شرطی داشته باشید. به همین دلیل امکان استفاده از سینتکس شیء درون سینتکس آرایه وجود دارد:

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### با کامپوننت‌ها {#with-components}

> این بخش به پیش‌نیاز [کامپوننت‌ها](/guide/essentials/component-basics) نیاز دارد. اگر می‌خواهید می‌توانید آن را رد کنید و بعدا برگردید.

وقتی شما از خاصیت `class` در یک کامپوننت با یک المان ریشه‌ای استفاده می‌کنید، آن کلاس‌ها به المان ریشه‌ای کامپوننت اضافه شده و با هر کلاس موجود در آن ادغام می‌شوند.

به عنوان مثال، اگر کامپوننتی به نام `MyComponent` با قالب زیر داشته باشیم:

```vue-html
<!-- تمپلیت کامپوننت فرزند -->
<p class="foo bar">Hi!</p>
```

سپس برخی کلاس‌ها را هنگام استفاده از آن اضافه کنیم:

```vue-html
<!-- هنگام استفاده از کامپوننت -->
<MyComponent class="baz boo" />
```

HTML رندرشده به این صورت خواهد بود:

```vue-html
<p class="foo bar baz boo">Hi!</p>
```

همین موضوع در مورد اتصال شرطی کلاس‌ها نیز صادق است:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

وقتی `isActive` درست باشد، HTML رندرشده به این صورت خواهد بود:

```vue-html
<p class="foo bar active">Hi!</p>
```

اگر کامپوننت شما چندین المان ریشه‌ای داشته باشد، باید مشخص کنید کدام المان این کلاس را دریافت خواهد کرد. می‌توانید این کار را با استفاده از خاصیت `$attrs` کامپوننت انجام دهید:

```vue-html
<!-- $attrs با استفاده از MyComponent تمپلیت -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```vue-html
<MyComponent class="baz" />
```

به این صورت رندر خواهد شد:

```html
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

می‌توانید در بخش [خاصیت‌های Fallthrough](/guide/components/attrs) بیشتر در مورد انتقال خاصیت‌های کامپوننت بخوانید.

## اتصال استایل‌های درون‌خطی  (Binding Inline Styles) {#binding-inline-styles}

### اتصال به اشیا  {#binding-to-objects-1}

`‎:style` از اتصال به شیء جاوااسکریپت پشتیبانی می‌کند - آن متناظر با [خاصیت `style` عناصر HTML](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) است:

<div class="composition-api">

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

</div>

```vue-html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

اگرچه کلیدهای camelCase توصیه می‌شوند، `‎:style` همچنین از کلیدهای خاصیت‌ CSS با خط‌تیره نیز پشتیبانی می‌کند (مربوط به نحوه استفاده از آنها در CSS واقعی است) - به عنوان مثال:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

اتصال مستقیم به یک شیء استایل ایده‌ی خوبی است تا تِمپلیت تمیزتر باشد:

<div class="composition-api">

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

</div>

```vue-html
<div :style="styleObject"></div>
```

اتصال شیء استایل اغلب با خاصیت‌های computed که اشیاء برمی‌گردانند، استفاده می‌شود.

### اتصال به آرایه‌ها {#binding-to-arrays-1}

می‌توانیم `‎:style` را به یک آرایه از چندین شیء استایل متصل کنیم. این اشیاء ادغام شده و به همان عنصر اعمال خواهند شد:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### پیشوند خودکار (Auto-prefixing) {#auto-prefixing}

وقتی از یک خاصیت CSS که نیاز به یک [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) در `‎:style` دارد، استفاده می‌کنید، Vue به طور خودکار prefix مناسب را اضافه خواهد کرد. Vue این کار را با بررسی در زمان اجرا برای دیدن اینکه چه خاصیت‌های استایلی در مرورگر فعلی پشتیبانی می‌شوند، انجام می‌دهد. اگر مرورگر از یک خاصیت خاص پشتیبانی نکند، prefix های مختلف پیاده خواهند شد تا یکی پیدا شود که پشتیبانی می‌شود.

### مقادیر چندگانه (Multiple Values) {#multiple-values}

می‌توانید یک آرایه از چندین مقدار (پیشونددار) را به یک خاصیت استایل ارائه دهید، به عنوان مثال:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

فقط آخرین مقدار در آرایه که مرورگر آن را پشتیبانی می‌کند، رندر خواهد شد. در این مثال، `display: flex` را برای مرورگرهایی که از نسخه بدون پیشوند flexbox پشتیبانی می‌کنند، رندر خواهد کرد.
