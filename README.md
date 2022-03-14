# vuejs.org (باللغة العربية)

هذه هي النسخه العربيه من vue docs (مازالت تحت الإنشاء).

هذا الموقع تم بنائة بإستخدام [VitePress](https://github.com/vuejs/vitepress) ويستخدم بشكل رئيسي [@vue/theme](https://github.com/vuejs/vue-theme).
محتوي الموقع تمت كتابته بواسطة Markdown-format والموجود بداخل فولدر ال `src`.

اذا ما اردت عمل بعض التعديلات البسيطه فيمكنك التعديل فيها بشكل مباشر علي Github وعمل Pull Request.

في هذا المشروع نقوم بإستخدام [pnpm](https://pnpm.io/) كمدير للحزم البرمجية (package manager) ويشبه الي حد كبير npm package manager.

لتشغيل المشروع علي جهازك قم اولا بسحبه من github عن طريق 
```bash
git pull https://github.com/amans199/docs.git
```
ثم قم بالدخول علي المشروع ثم قم بتسطيب الحزم عن طريق 

```bash
pnpm i
pnpm run dev
```

## العمل علي المحتوي

- اطلع علي الشرح الخاص ب VitePress في جزئيات ال [Markdown Extensions](https://vitepress.vuejs.org/guide/markdown.html) وكيفية استخدام [الصيغ الخاصة بال vue في كتابة ال Markdown](https://vitepress.vuejs.org/guide/using-vue.html).
  

- اطلع علي  [ دليل الكتابة](https://github.com/vuejs/docs/blob/main/.github/contributing/writing-guide.md) لمعرفة القواعد والنصائح الخاصة بكتابة والتعديل علي المستندات والشروحات.


## العمل علي السمة (theme)
اذا اردت عمل بعض التغييرات او التعديلات في السمه فيمكنك دائما الإطلاع علي [نصائح لتطوير السمات الخاصة بالمستندات والشروحات](https://github.com/vuejs/vue-theme#developing-with-real-content).
