---
footer: false
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# Szybki start {#quick-start}

## Wypróbuj Vue Online {#try-vue-online}

- Aby szybko zapoznać się z Vue, możesz wypróbować go bezpośrednio w naszym [Interaktywnym demo](https://play.vuejs.org/#eNo9jcEKwjAMhl/lt5fpQYfXUQfefAMvvRQbddC1pUuHUPrudg4HIcmXjyRZXEM4zYlEJ+T0iEPgXjn6BB8Zhp46WUZWDjCa9f6w9kAkTtH9CRinV4fmRtZ63H20Ztesqiylphqy3R5UYBqD1UyVAPk+9zkvV1CKbCv9poMLiTEfR2/IXpSoXomqZLtti/IFwVtA9A==).

- Jeśli wolisz prostą konfigurację HTML bez żadnych kroków kompilacji, możesz użyć tego [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) jako twój punkt startowy.

- Jeśli znasz już Node.js i koncepcję narzędzi do kompilacji, możesz również wypróbować pełną konfigurację kompilacji bezpośrednio w przeglądarce na [StackBlitz](https://vite.new/vue).

## Tworzenie aplikacji Vue {#creating-a-vue-application}

:::tip Prerequisites

- Znajomość wiersza poleceń
- Instalacja [Node.js](https://nodejs.org/) wersji 18.3 lub wyższej
  :::

W tej sekcji przedstawimy, jak zbudować szkielet Vue [Single Page Application](/guide/extras/ways-of-using-vue#single-page-application-spa) na komputerze lokalnym. Utworzony projekt będzie korzystał z konfiguracji kompilacji opartej na [Vite](https://vitejs.dev) i umożliwi nam korzystanie z Vue [Single-File Components](/guide/scaling-up/sfc) (SFC).

Upewnij się, że masz zainstalowaną aktualną wersję [Node.js](https://nodejs.org/) i że Twój bieżący katalog roboczy to ten, w którym zamierzasz utworzyć projekt. Uruchom następujące polecenie w wierszu poleceń (bez znaku `$`):

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ pnpm create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh
  $ yarn create vue@latest
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">

  ```sh
  $ bun create vue@latest
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

To polecenie zainstaluje i uruchomi [create-vue](https://github.com/vuejs/create-vue), oficjalne narzędzie do tworzenia szkieletów projektów Vue. Zostaną wyświetlone monity dotyczące kilku opcjonalnych funkcji, takich jak obsługa TypeScript i testowania:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">twoja-nazwa-projektu</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add an End-to-End Testing Solution? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Cypress / Nightwatch / Playwright</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… No / <span style="color:#89DDFF;text-decoration:underline">Yes</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue DevTools 7 extension for debugging? (experimental) <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">twoja-nazwa-projektu</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Jeśli nie jesteś pewien opcji, po prostu wybierz „Nie”, naciskając Enter. Po utworzeniu projektu postępuj zgodnie z instrukcjami, aby zainstalować zależności i uruchomić serwer deweloperski:

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh-vue
  $ cd {{'<twoja-nazwa-projektu>'}}
  $ npm install
  $ npm run dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh-vue
  $ cd {{'<twoja-nazwa-projektu>'}}
  $ pnpm install
  $ pnpm run dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh-vue
  $ cd {{'<twoja-nazwa-projektu>'}}
  $ yarn
  $ yarn dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">

  ```sh-vue
  $ cd {{'<twoja-nazwa-projektu>'}}
  $ bun install
  $ bun run dev
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

Powinieneś teraz uruchomić swój pierwszy projekt Vue! Zwróć uwagę, że przykładowe komponenty w wygenerowanym projekcie są pisane przy użyciu [Composition API](/guide/introduction#composition-api) i `<script setup>`, a nie [Options API](/guide/introduction#options-api). Oto kilka dodatkowych wskazówek:

- Zalecana konfiguracja IDE to [Visual Studio Code](https://code.visualstudio.com/) + [Vue - Oficjalne rozszerzenie](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Jeśli używasz innych edytorów, sprawdź [sekcję wsparcia IDE](/guide/scaling-up/tooling#ide-support).
- Więcej szczegółów na temat narzędzi, w tym integracji z frameworkami zaplecza, omówiono w [Tooling Guide](/guide/scaling-up/tooling).
- Aby dowiedzieć się więcej o podstawowym narzędziu do kompilacji Vite, zapoznaj się z [dokumentacją Vite](https://vitejs.dev).
- Jeśli zdecydujesz się na użycie TypeScript, zapoznaj się z [Przewodnikiem po użyciu TypeScript](typescript/overview).

Gdy będziesz gotowy do wysłania aplikacji do produkcji, uruchom następujące polecenie:

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm run build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ pnpm run build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh
  $ yarn build
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="bun">

  ```sh
  $ bun run build
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

Spowoduje to utworzenie gotowej do produkcji kompilacji Twojej aplikacji w katalogu `./dist` projektu. Zapoznaj się z [Production Deployment Guide](/guide/best-practices/production-deployment), aby dowiedzieć się więcej o wysyłaniu aplikacji do produkcji.

[Następne kroki >](#next-steps)

## Korzystanie z Vue z CDN {#using-vue-from-cdn}

Możesz używać Vue bezpośrednio z CDN za pomocą znacznika script:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Tutaj używamy [unpkg](https://unpkg.com/), ale możesz również użyć dowolnego CDN, który obsługuje pakiety npm, na przykład [jsdelivr](https://www.jsdelivr.com/package/npm/vue) lub [cdnjs](https://cdnjs.com/libraries/vue). Oczywiście możesz również pobrać ten plik i obsługiwać go samodzielnie.

Podczas korzystania z Vue z CDN nie ma żadnego „kroku kompilacji”. Dzięki temu konfiguracja jest znacznie prostsza i nadaje się do ulepszania statycznego HTML lub integracji z frameworkiem zaplecza. Nie będziesz jednak mógł użyć składni Single-File Component (SFC).

### Korzystanie z kompilacji globalnej {#using-the-global-build}

Powyższy link ładuje _global build_ Vue, gdzie wszystkie API najwyższego poziomu są eksponowane jako właściwości globalnego obiektu `Vue`. Oto pełny przykład użycia global build:

<div class="options-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Witaj Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Demo na CodePen >](https://codepen.io/vuejs-examples/pen/QWJwJLp)

</div>

<div class="composition-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[Demo na CodePen >](https://codepen.io/vuejs-examples/pen/eYQpQEG)

:::tip
Wiele przykładów dla Composition API w całym przewodniku będzie używać składni `<script setup>`, która wymaga narzędzi do kompilacji. Jeśli zamierzasz używać Composition API bez etapu kompilacji, zapoznaj się z użyciem opcji [`setup()`](/api/composition-api-setup).
:::

</div>

### Korzystanie z modułu ES Build {#using-the-es-module-build}

W pozostałej części dokumentacji będziemy głównie używać składni [modułów ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Większość nowoczesnych przeglądarek obsługuje teraz natywnie moduły ES, więc możemy używać Vue z CDN za pośrednictwem natywnych modułów ES w następujący sposób:

<div class="options-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'Witaj Vue!'
      }
    }
  }).mount('#app')
</script>
```

</div>

<div class="composition-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Witaj Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

</div>

Zwróć uwagę, że używamy `<script type="module">`, a zaimportowany adres URL CDN wskazuje na **kompilację modułów ES** Vue.

<div class="options-api">

[Demo CodePen >](https://codepen.io/vuejs-examples/pen/VwVYVZO)

</div>
<div class="composition-api">

[Demo CodePen >](https://codepen.io/vuejs-examples/pen/MWzazEv)

</div>

### Włączanie importowania map {#enabling-import-maps}

W powyższym przykładzie importujemy z pełnego adresu URL CDN, ale w pozostałej części dokumentacji zobaczysz taki kod:

```js
import { createApp } from 'vue'
```

Możemy nauczyć przeglądarkę, gdzie ma zlokalizować import `vue`, używając [Import Maps](https://caniuse.com/import-maps):

<div class="options-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Witaj Vue!'
      }
    }
  }).mount('#app')
</script>
```

[Demo CodePen >](https://codepen.io/vuejs-examples/pen/wvQKQyM)

</div>

<div class="composition-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Witaj Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[Demo CodePen >](https://codepen.io/vuejs-examples/pen/YzRyRYM)

</div>

Możesz również dodać wpisy dla innych zależności do mapy importu - ale upewnij się, że wskazują one na wersję modułów ES biblioteki, której zamierzasz użyć.

:::tip Obsługa przeglądarki Import Maps
Import Maps to stosunkowo nowa funkcja przeglądarki. Upewnij się, że używasz przeglądarki w jej [zakresie wsparcia](https://caniuse.com/import-maps). W szczególności jest ona obsługiwana tylko w Safari 16.4+.
:::

:::warning Uwagi dotyczące użytkowania produkcyjnego
Do tej pory przykłady wykorzystują kompilację rozwojową Vue - jeśli zamierzasz używać Vue z CDN w środowisku produkcyjnym, zapoznaj się z [Przewodnikiem wdrażania produkcyjnego](/guide/best-practices/production-deployment#without-build-tools).

Chociaż możliwe jest używanie Vue bez systemu kompilacji, alternatywnym podejściem do rozważenia jest użycie [`vuejs/petite-vue`](https://github.com/vuejs/petite-vue), które mogłoby lepiej pasować do kontekstu, w którym można by użyć [`jquery/jquery`](https://github.com/jquery/jquery) (w przeszłości) lub [`alpinejs/alpine`](https://github.com/alpinejs/alpine) (w chwili obecnej).
:::

### Rozdzielanie modułów {#splitting-up-the-modules}

W miarę jak zagłębiamy się w przewodnik, może zaistnieć potrzeba podzielenia naszego kodu na oddzielne pliki JavaScript, aby łatwiej nimi zarządzać. Na przykład:

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

<div class="options-api">

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>Podliczenie to: {{ count }}</div>`
}
```

</div>
<div class="composition-api">

```js
// my-component.js
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>Podliczenie to: {{ count }}</div>`
}
```

</div>

Jeśli otworzysz powyższy `index.html` bezpośrednio w swojej przeglądarce, zauważysz, że wyrzuca błąd, ponieważ moduły ES nie mogą działać w protokole `file://`, który jest protokołem używanym przez przeglądarkę podczas otwierania pliku lokalnego.

Ze względów bezpieczeństwa moduły ES mogą działać tylko w protokole `http://`, którego używają przeglądarki podczas otwierania stron w sieci. Aby moduły ES działały na naszym komputerze lokalnym, musimy obsługiwać `index.html` w protokole `http://`, z lokalnym serwerem HTTP.

Aby uruchomić lokalny serwer HTTP, najpierw upewnij się, że masz zainstalowany [Node.js](https://nodejs.org/en/), a następnie uruchom `npx serve` z wiersza poleceń w tym samym katalogu, w którym znajduje się plik HTML. Możesz również użyć dowolnego innego serwera HTTP, który może obsługiwać pliki statyczne z prawidłowymi typami MIME.

Możesz zauważyć, że szablon importowanego komponentu jest wstawiony jako ciąg JavaScript. Jeśli używasz programu VS Code, możesz zainstalować rozszerzenie [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) i dodać do ciągów prefiks w postaci komentarza `/*html*/`, aby wyróżnić ich składnię.

## Następne kroki {#next-steps}

Jeżeli pominąłeś [Wstęp](/guide/introduction), gorąco zalecamy jego przeczytanie przed przejściem do dalszej części dokumentacji.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Kontynuuj z przewodnikiem</p>
    <p class="next-steps-caption">Przewodnik przeprowadzi Cię przez każdy aspekt struktury w pełnym szczególe.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Wypróbuj samouczek</p>
    <p class="next-steps-caption">Dla tych, którzy wolą uczyć się rzeczy w praktyce.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Sprawdź przykłady</p>
    <p class="next-steps-caption">Przeglądaj przykłady podstawowych funkcji i typowych zadań interfejsu użytkownika.</p>
  </a>
</div>
