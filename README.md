# vuejs.org (باللغة العربية)

هذه النسخه العربيه من vue docs. مازالت تحت الإنشاء

## Contributing

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

## Working on the content

- See VitePress docs on supported [Markdown Extensions](https://vitepress.vuejs.org/guide/markdown.html) and the ability to [use Vue syntax inside markdown](https://vitepress.vuejs.org/guide/using-vue.html).

- See the [Writing Guide](https://github.com/vuejs/docs/blob/main/.github/contributing/writing-guide.md) for our rules and recommendations on writing and maintaining documentation content.

## Working on the theme

If changes need to made for the theme, check out the [instructions for developing the theme alongside the docs](https://github.com/vuejs/vue-theme#developing-with-real-content).
