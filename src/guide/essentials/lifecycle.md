# هوک های چرخه حیات {#lifecycle-hooks}

هر نمونه کامپوننت Vue در هنگام ساخت مجموعه ای از مراحل را طی می کند - برای مثال، نیاز به برقراری مشاهده داده، کامپایل کردن تمپلیت، مانت کردن نمونه در DOM،و بروزرسانی DOM هنگام تغییر داده دارد. همچنین در طول مسیر توابعی به نام هوک های چرخه حیات اجرا می کند که به کاربران فرصت می دهد کد خودشان را در مراحلی خاص وارد کنند. 

## ثبت هوک های چرخه حیات {#registering-lifecycle-hooks}

برای مثال <span class="composition-api">هوک `onMounted`</span><span class="options-api">هوک `mounted`</span> برای ایجاد کد بعد از اینکه کامپوننت رِندر اولیه را به اتمام رساند یا نود های DOM ایجاد شدند مورد استفاده قرار می گیرد:


<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(` کامپوننت اکنون مانت شده است.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(` کامپوننت اکنون مانت شده است.`)
  }
}
```

</div>

هوک های دیگری وجود دارد که در مراحل مختلفی از چرخه حیات نمونه صدا زده می شوند که رایج ترین آنها هوک های <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle#onmounted), [`onUpdated`](/api/composition-api-lifecycle#onupdated) و [`onUnmounted`](/api/composition-api-lifecycle#onunmounted) است.</span><span class="options-api">[`mounted`](/api/options-lifecycle#mounted), [`updated`](/api/options-lifecycle#updated) و [`unmounted`](/api/options-lifecycle#unmounted) است.</span>

<div class="options-api">

<!-- All lifecycle hooks are called with their `this` context pointing to the current active instance invoking it. -->

همه هوک های چرخه حیات همراه با کلمه کلیدی `this` متعلق به آنها که به نمونه فعال فعلی که آن را فراخوانی می کند اشاره دارد، صدا زده می شوند. توجه داشته باشید این به این معنی است که شما باید از نوشتن هوک های چرخه حیات به صورت تابع پیکانی (arrow function) خودداری کنید، در صورت انجام چنین کاری قادر به دستیابی به نمونه کامپوننت از طریق کلمه کلیدی `this` نخواهید بود.

</div>

<div class="composition-api">

هنگامی که هوک `onMounted` صدا زده می شود، Vue به صورت خودکار تابع callback ثبت شده را با نمونه کامپوننت فعال فعلی مرتبط می کند. این امر مستلزم این است که این هوک ها در طول راه اندازی کامپوننت به صورت **همزمان** (synchronously) ثبت شوند. برای مثال کار زیر را انجام ندهید:

```js
setTimeout(() => {
  onMounted(() => {
    // این کار نخواهد کرد.
  })
}, 100)
```

توجه داشته باشید این به این معنی نیست که فراخوانی از نظر لغوی حتما باید درون `setup()` یا `<script setup>` قرار داشته باشد. هوک `onMounted()` تا زمانیکه پشته فراخوانی همزمان است و از درون `setup()` ناشی می شود می تواند از یک تابع بیرونی صدا زده شود.

</div>

## نمودار چرخه حیات {#lifecycle-diagram}

در زیر نموداری برای چرخه عمر نمونه آورده شده است. در حال حاضر نیاز نیست همه چیز را به طور کامل درک کنید، اما با یادگیری و ساخت بیشتر ، مرجعی مفید خواهد بود.

![Component lifecycle diagram](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

برای کنکاش در جزئیات بیشتر در مورد هوک های چرخه حیات و موارد استفاده مربوطه به <span class="composition-api">[مرجع API هوک های چرخه حیات](/api/composition-api-lifecycle)</span><span class="options-api">[مرجع API هوک های چرخه حیات](/api/options-lifecycle)</span> مراجعه کنید.
