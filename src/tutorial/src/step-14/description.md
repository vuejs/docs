# Slots {#slots}

props এর মাধ্যমে data পাঠানোর পাশাপাশি, মূল উপাদান **slots**-এর মাধ্যমে child এর কাছে টেমপ্লেটের টুকরোগুলিও পাঠাতে পারে:

<div class="sfc">

```vue-html
<ChildComp>
  This is some slot content!
</ChildComp>
```

</div>
<div class="html">

```vue-html
<child-comp>
  This is some slot content!
</child-comp>
```

</div>

চাইল্ড কম্পোনেন্টে, এটি আউটলেট হিসাবে `<slot>` উপাদান ব্যবহার করে parent এর কাছ থেকে স্লট সামগ্রী রেন্ডার করতে পারে:

<div class="sfc">

```vue-html
<!-- in child template -->
<slot/>
```

</div>
<div class="html">

```vue-html
<!-- in child template -->
<slot></slot>
```

</div>

`<slot>` আউটলেটের ভিতরের বিষয়বস্তুকে "ফলব্যাক" বিষয়বস্তু হিসেবে গণ্য করা হবে: যদি parent কোনো স্লট বিষয়বস্তু না দিয়ে থাকেন তাহলে এটি প্রদর্শিত হবে:

```vue-html
<slot>Fallback content</slot>
```

বর্তমানে আমরা `<ChildComp>`-এ কোনো slot সামগ্রী পাঠাচ্ছি না, তাই আপনার ফলব্যাক সামগ্রী দেখতে হবে। parent's `msg` state ব্যবহার করার সময় child এ কিছু স্লট সামগ্রী প্রদান করা যাক।
