# Tooling {#tooling}

## Try It Online {#try-it-online}

Vue SFC ব্যবহার করে দেখতে আপনার মেশিনে কিছু ইনস্টল করার দরকার নেই - এমন অনলাইন খেলার মাঠ রয়েছে যা আপনাকে ব্রাউজারেই তা করতে দেয়:

- [Vue SFC Playground](https://play.vuejs.org)
  - সর্বদা সর্বশেষ প্রতিশ্রুতি থেকে মোতায়েন করা হয়
  - উপাদান সংকলন ফলাফল পরিদর্শন জন্য পরিকল্পিত
- [Vue + Vite on StackBlitz](https://vite.new/vue)
  - IDE-এর মতো পরিবেশে ব্রাউজারে Vite dev সার্ভার চলছে
  - স্থানীয় সেটআপের নিকটতম

বাগ রিপোর্ট করার সময় প্রজনন প্রদানের জন্য এই অনলাইন খেলার মাঠগুলি ব্যবহার করার পরামর্শ দেওয়া হয়।

## Project Scaffolding {#project-scaffolding}

### Vite {#vite}

[Vite](https://vitejs.dev/) প্রথম শ্রেণীর Vue SFC সমর্থন সহ একটি লাইটওয়েট এবং দ্রুত বিল্ড টুল। এটি ইভান ইউ দ্বারা তৈরি করা হয়েছে, যিনি Vue এর লেখকও!

Vite + Vue এর সাথে শুরু করতে, সহজভাবে চালান:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">$</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

এই কমান্ডটি [create-vue](https://github.com/vuejs/create-vue), অফিসিয়াল Vue প্রোজেক্ট স্ক্যাফোল্ডিং টুল ইনস্টল এবং কার্যকর করবে।

- Vite সম্পর্কে আরও জানতে, [Vite docs](https://vitejs.dev) দেখুন।
- একটি Vite প্রকল্পে Vue-নির্দিষ্ট আচরণ কনফিগার করতে, উদাহরণস্বরূপ Vue কম্পাইলারে বিকল্পগুলি পাস করার জন্য, [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme) এর জন্য ডক্স দেখুন।

উপরে উল্লিখিত উভয় অনলাইন চেষ্টা করুন একটি Vite প্রকল্প হিসাবে ফাইল ডাউনলোড সমর্থন করে।

### Vue CLI {#vue-cli}

[Vue CLI](https://cli.vuejs.org/) হল Vue-এর অফিসিয়াল ওয়েবপ্যাক-ভিত্তিক টুলচেন। এটি এখন রক্ষণাবেক্ষণ মোডে রয়েছে এবং আমরা Vite এর সাথে নতুন প্রকল্প শুরু করার পরামর্শ দিই যদি না আপনি নির্দিষ্ট ওয়েবপ্যাক-শুধু বৈশিষ্ট্যগুলির উপর নির্ভর করেন৷ Vite বেশিরভাগ ক্ষেত্রে উন্নত বিকাশকারী অভিজ্ঞতা প্রদান করবে।

Vue CLI থেকে Vite-এ স্থানান্তরিত করার তথ্যের জন্য:

- [Vue CLI -> VueSchool.io থেকে ভিটে মাইগ্রেশন গাইড](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Tools/ প্লাগইন যা স্বয়ংক্রিয় স্থানান্তরে সহায়তা করে](https://github.com/vitejs/awesome-vite#vue-cli)

### Note on In-Browser Template Compilation {#note-on-in-browser-template-compilation}

বিল্ড স্টেপ ছাড়া Vue ব্যবহার করার সময়, কম্পোনেন্ট টেমপ্লেটগুলি সরাসরি পৃষ্ঠার HTML-এ বা ইনলাইনযুক্ত JavaScript স্ট্রিং হিসাবে লেখা হয়। এই ধরনের ক্ষেত্রে, অন-দ্য-ফ্লাই টেমপ্লেট সংকলন সম্পাদন করার জন্য Vue-কে টেমপ্লেট কম্পাইলারটি ব্রাউজারে পাঠাতে হবে। অন্যদিকে, কম্পাইলারটি অপ্রয়োজনীয় হবে যদি আমরা একটি বিল্ড স্টেপ দিয়ে টেমপ্লেটগুলিকে প্রাক-কম্পাইল করি। ক্লায়েন্ট বান্ডেলের আকার কমাতে, Vue বিভিন্ন ব্যবহারের ক্ষেত্রে অপ্টিমাইজ করা [different "builds"](https://unpkg.com/browse/vue@3/dist/) প্রদান করে।

- যে ফাইলগুলি `vue.runtime.*` দিয়ে শুরু হয় সেগুলো **রানটাইম-শুধু বিল্ড**: সেগুলি কম্পাইলারকে অন্তর্ভুক্ত করে না। এই বিল্ডগুলি ব্যবহার করার সময়, সমস্ত টেমপ্লেটগুলিকে একটি বিল্ড ধাপের মাধ্যমে প্রাক-কম্পাইল করা আবশ্যক।

- যে ফাইলগুলি `.runtime` অন্তর্ভুক্ত করে না সেগুলি **সম্পূর্ণ বিল্ড**: তারা সরাসরি ব্রাউজারে কম্পাইলার এবং সমর্থন কম্পাইলিং টেমপ্লেট অন্তর্ভুক্ত করে। যাইহোক, তারা পেলোড ~ 14kb বৃদ্ধি করবে।

আমাদের ডিফল্ট টুলিং সেটআপগুলি শুধুমাত্র রানটাইম বিল্ড ব্যবহার করে যেহেতু SFC-তে সমস্ত টেমপ্লেট পূর্ব-সংকলিত। যদি, কোনো কারণে, একটি বিল্ড স্টেপ সহও আপনার ইন-ব্রাউজার টেমপ্লেট সংকলনের প্রয়োজন হয়, তাহলে আপনি এর পরিবর্তে বিল্ড টুলটিকে `vue` থেকে `vue/dist/vue.esm-bundler.js` নামে কনফিগার করে তা করতে পারেন।

আপনি যদি নো-বিল্ড-স্টেপ ব্যবহারের জন্য হালকা-ওজন বিকল্প খুঁজছেন, তবে [petite-vue](https://github.com/vuejs/petite-vue) দেখুন।

## IDE Support {#ide-support}

- প্রস্তাবিত IDE সেটআপ হল [VSCode](https://code.visualstudio.com/) + [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) এক্সটেনশন . এক্সটেনশনটি টেমপ্লেট এক্সপ্রেশন এবং কম্পোনেন্ট প্রপসের জন্য সিনট্যাক্স হাইলাইটিং, টাইপস্ক্রিপ্ট সমর্থন এবং বুদ্ধিমত্তা প্রদান করে।

  :::tip
  Volar প্রতিস্থাপন করে [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), Vue 2-এর জন্য আমাদের পূর্ববর্তী অফিসিয়াল VSCode এক্সটেনশন। আপনার যদি বর্তমানে Vetur ইনস্টল করা থাকে, তাহলে Vue 3 প্রকল্পে এটি নিষ্ক্রিয় করতে ভুলবেন না .
  :::

- [WebStorm](https://www.jetbrains.com/webstorm/) এছাড়াও Vue SFC-এর জন্য দুর্দান্ত বিল্ট-ইন সমর্থন প্রদান করে।

- অন্যান্য IDE যেগুলি [Language Service Protocol](https://microsoft.github.io/language-server-protocol/) (LSP) সমর্থন করে তারা LSP-এর মাধ্যমে Volar-এর মূল কার্যকারিতাগুলিকেও লাভ করতে পারে:

  - [LSP-Volar](https://github.com/sublimelsp/LSP-volar) এর মাধ্যমে সাবলাইম টেক্সট সমর্থন।

  - [coc-volar](https://github.com/yaegassy/coc-volar) এর মাধ্যমে vim / Neovim সমর্থন।

  - [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-fly/) এর মাধ্যমে emacs সমর্থন

## Browser Devtools {#browser-devtools}

<VueSchoolLink href="https://vueschool.io/lessons/using-vue-dev-tools-with-vuejs-3" title="ফ্রি Vue.js Devtools পাঠ"/>

Vue ব্রাউজার devtools এক্সটেনশন আপনাকে একটি Vue অ্যাপের কম্পোনেন্ট ট্রি অন্বেষণ করতে, পৃথক উপাদানগুলির অবস্থা পরিদর্শন করতে, স্টেট ম্যানেজমেন্ট ইভেন্টগুলি এবং প্রোফাইল কার্যকারিতা ট্র্যাক করতে দেয়৷

![devtools screenshot](https://raw.githubusercontent.com/vuejs/devtools/main/media/screenshot-shadow.png)

- [Documentation](https://devtools.vuejs.org/)
- [Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Standalone Electron app](https://devtools.vuejs.org/guide/installation.html#standalone)

## TypeScript {#typescript}

মূল নিবন্ধ: [TypeScript এর সাথে Vue ব্যবহার করা](/guide/typescript/overview)।

- [Volar](https://github.com/johnsoncodehk/volar) টেমপ্লেট এক্সপ্রেশন এবং ক্রস-কম্পোনেন্ট প্রপস যাচাইকরণ সহ `<script lang="ts">` ব্লক ব্যবহার করে SFC-এর জন্য টাইপ চেকিং প্রদান করে।

- ব্যবহার করুন [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/vue-tsc) কমান্ড লাইন থেকে একই ধরনের চেক করার জন্য বা SFC-এর জন্য `d.ts` ফাইল তৈরি করার জন্য।

## Testing {#testing}

মূল নিবন্ধ: [টেস্টিং গাইড](/guide/scaling-up/testing)।

- [Cypress](https://www.cypress.io/) E2E পরীক্ষার জন্য সুপারিশ করা হয়। এটি [সাইপ্রেস কম্পোনেন্ট টেস্ট রানার](https://docs.cypress.io/guides/component-testing/introduction) এর মাধ্যমে Vue SFC-এর জন্য উপাদান পরীক্ষার জন্যও ব্যবহার করা যেতে পারে।

- [Vitest](https://vitest.dev/) হল Vue/Vite টিমের সদস্যদের দ্বারা তৈরি করা একটি টেস্ট রানার যা গতির উপর ফোকাস করে। ইউনিট/কম্পোনেন্ট পরীক্ষার জন্য একই তাত্ক্ষণিক প্রতিক্রিয়া লুপ প্রদান করার জন্য এটি বিশেষভাবে Vite-ভিত্তিক অ্যাপ্লিকেশনগুলির জন্য ডিজাইন করা হয়েছে।

- [Jest](https://jestjs.io/) [vite-jest](https://github.com/sodatea/vite-jest) এর মাধ্যমে Vite-এর সাথে কাজ করা যেতে পারে। যাইহোক, এটি শুধুমাত্র তখনই সুপারিশ করা হয় যদি আপনার বিদ্যমান জেস্ট-ভিত্তিক টেস্ট স্যুট থাকে যা আপনাকে Vite-ভিত্তিক সেটআপে স্থানান্তর করতে হবে, কারণ Vitest অনেক বেশি দক্ষ ইন্টিগ্রেশনের সাথে একই ধরনের কার্যকারিতা প্রদান করে।

## Linting {#linting}

Vue টিম [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue), একটি [ESLint](https://eslint.org/) প্লাগইন বজায় রাখে যা SFC-নির্দিষ্ট লিন্টিং সমর্থন করে নিয়ম

পূর্বে Vue CLI ব্যবহারকারী ব্যবহারকারীরা ওয়েবপ্যাক লোডারের মাধ্যমে লিন্টার কনফিগার করতে অভ্যস্ত হতে পারে। তবে একটি Vite-ভিত্তিক বিল্ড সেটআপ ব্যবহার করার সময়, আমাদের সাধারণ সুপারিশ হল:

1. `npm install -D eslint eslint-plugin-vue`, তারপর `eslint-plugin-vue`-এর [কনফিগারেশন গাইড](https://eslint.vuejs.org/user-guide/#usage) অনুসরণ করুন।

2. ESLint IDE এক্সটেনশন সেটআপ করুন, উদাহরণস্বরূপ [VSCode এর জন্য ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), যাতে আপনি বিকাশের সময় আপনার সম্পাদকের মধ্যেই লিন্টার প্রতিক্রিয়া পান। এটি ডেভ সার্ভার শুরু করার সময় অপ্রয়োজনীয় লিন্টিং খরচ এড়ায়।

3. প্রোডাকশন বিল্ড কমান্ডের অংশ হিসাবে ESLint চালান, যাতে আপনি প্রোডাকশনে শিপিংয়ের আগে সম্পূর্ণ লিন্টার প্রতিক্রিয়া পান।

4. (ঐচ্ছিক) সেটআপ টুল যেমন [lint-staged](https://github.com/okonet/lint-staged) গিট কমিট-এ স্বয়ংক্রিয়ভাবে সংশোধিত ফাইলগুলিকে লিন্ট করতে।

## Formatting {#formatting}

- The [Volar](https://github.com/johnsoncodehk/volar) VSCode extension provides formatting for Vue SFCs out of the box.

- Alternatively, [Prettier](https://prettier.io/) provides built-in Vue SFC formatting support.

## SFC Custom Block Integrations {#sfc-custom-block-integrations}

কাস্টম ব্লকগুলি একই Vue ফাইলে বিভিন্ন অনুরোধের প্রশ্নের সাথে আমদানিতে কম্পাইল করা হয়। এই আমদানি অনুরোধগুলি পরিচালনা করা অন্তর্নিহিত বিল্ড টুলের উপর নির্ভর করে।

- যদি Vite ব্যবহার করেন, তাহলে একটি কাস্টম Vite প্লাগইন ব্যবহার করা উচিত যাতে মিলিত কাস্টম ব্লকগুলিকে এক্সিকিউটেবল জাভাস্ক্রিপ্টে রূপান্তর করা হয়। [উদাহরণ](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- যদি Vue CLI বা প্লেইন ওয়েবপ্যাক ব্যবহার করা হয়, তাহলে একটি ওয়েবপ্যাক লোডারকে মিলিত ব্লকগুলিকে রূপান্তর করতে কনফিগার করা উচিত। [উদাহরণ](https://vue-loader.vuejs.org/guide/custom-blocks.html)

## Lower-Level Packages {#lower-level-packages}

### `@vue/compiler-sfc` {#vue-compiler-sfc}

- [ডক্স](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

এই প্যাকেজটি Vue core monorepo-এর অংশ এবং সর্বদা মূল `vue` প্যাকেজের মতো একই সংস্করণে প্রকাশিত হয়। এটি প্রধান `vue` প্যাকেজের নির্ভরতা হিসাবে অন্তর্ভুক্ত করা হয়েছে এবং `vue/compiler-sfc` এর অধীনে প্রক্সি করা হয়েছে তাই আপনাকে এটি পৃথকভাবে ইনস্টল করতে হবে না।

প্যাকেজ নিজেই Vue SFCs প্রক্রিয়াকরণের জন্য নিম্ন-স্তরের ইউটিলিটিগুলি প্রদান করে এবং শুধুমাত্র টুলিং লেখকদের জন্য যাদের কাস্টম সরঞ্জামগুলিতে Vue SFC সমর্থন করতে হবে।

:::tip
সর্বদা এই প্যাকেজটি `vue/compiler-sfc` গভীর আমদানির মাধ্যমে ব্যবহার করতে পছন্দ করুন কারণ এটি নিশ্চিত করে যে এর সংস্করণটি Vue রানটাইমের সাথে সিঙ্ক করা হয়েছে।
:::

### `@vitejs/plugin-vue` {#vitejs-plugin-vue}

- [Docs](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)

অফিসিয়াল প্লাগইন যা Vite-এ Vue SFC সমর্থন প্রদান করে।

### `vue-loader` {#vue-loader}

- [Docs](https://vue-loader.vuejs.org/)

অফিসিয়াল লোডার যা ওয়েবপ্যাকে Vue SFC সমর্থন প্রদান করে। আপনি যদি Vue CLI ব্যবহার করেন, এছাড়াও [Vue CLI-তে `vue-লোডার` বিকল্পগুলি পরিবর্তন করার ডক্স দেখুন](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader) .

## Other Online Playgrounds {#other-online-playgrounds}

- [VueUse Playground](https://play.vueuse.org)
- [Vue + Vite on Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue on CodeSandbox](https://codesandbox.io/s/vue-3)
- [Vue on Codepen](https://codepen.io/pen/editor/vue)
- [Vue on Components.studio](https://components.studio/create/vue3)
- [Vue on WebComponents.dev](https://webcomponents.dev/create/cevue)

<!-- TODO ## Backend Framework Integrations -->
