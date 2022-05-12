---
footer: false
---

# Szybki start

W zależności od przypadku użycia i preferencji, można używać Vue z narzędziami do budowania lub bez.

## Z narzędziami do budowania

Konfiguracja budowania pozwala nam używać komponentów jednoplikowych ([SFC](/guide/scaling-up/sfc)) Vue. Oficjalna konfiguracja budowania Vue jest oparta na [Vite](https://vitejs.dev), narzędziu do budowania frontendu, które jest nowoczesne, lekkie i bardzo szybkie.

### Online

Vue z SFC można wypróbować online na stronie [StackBlitz](https://vite.new/vue). StackBlitz uruchamia konfigurację budowania opartą na Vue bezpośrednio w przeglądarce, więc jest ona prawie identyczna z konfiguracją lokalną, ale nie wymaga instalowania niczego na komputerze.

### Lokalnie

:::tip Wymagania wstępne

- Znajomość wiersza poleceń
- Zainstalowany [Node.js](https://nodejs.org/)
  :::

Aby utworzyć projekt Vue z obsługą narzędzia Build-tool na swoim komputerze, wykonaj następujące polecenie w wierszu poleceń (bez znaku ">"):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

To polecenie zainstaluje i uruchomi [create-vue](https://github.com/vuejs/create-vue), oficjalne narzędzie do tworzenia rusztowań dla projektów Vue. Zostaną wyświetlone podpowiedzi dotyczące wielu opcjonalnych funkcji, takich jak TypeScript i obsługa testów:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">nazwa-twojego-projektu</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">nazwa-twojego-projektu</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Jeśli nie jesteś pewien jakiejś opcji, po prostu wybierz `Nie`, naciskając na razie klawisz Enter. Po utworzeniu projektu postępuj zgodnie z instrukcjami, aby zainstalować zależności i uruchomić serwer dev:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">nazwa-twojego-projektu</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

Powinieneś już mieć uruchomiony swój pierwszy projekt Vue! Poniżej znajdziesz kilka dodatkowych wskazówek:

- Zalecana konfiguracja IDE to [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar). Można również użyć programu [WebStorm](https://www.jetbrains.com/webstorm/).
- Więcej szczegółów dotyczących narzędzi, w tym integrację z frameworkami backendu, omówiono w [Przewodniku narzędziowym](/guide/scaling-up/tooling.html).
- Aby dowiedzieć się więcej o narzędziu Vite, zapoznaj się z dokumentami [Vite docs](https://vitejs.dev).
- Jeśli zdecydujesz się na użycie języka TypeScript, zapoznaj się z [Przewodnikem użytkowania języka TypeScript](typescript/overview.html).

Gdy aplikacja będzie gotowa do wysłania na produkcję, wykonaj następujące polecenie:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

Spowoduje to utworzenie gotowej do produkcji kompilacji Twojej aplikacji w katalogu projektu `./dist`. Przeczytaj [Przewodnik wdrożenia produkcyjnego](/guide/best-practices/production-deployment.html), aby dowiedzieć się więcej o wysyłaniu aplikacji do produkcji.

[Kolejne kroki >](#kolejne-kroki)

## Bez narzędzi do budowania

Aby rozpocząć pracę z Vue bez etapu kompilacji, wystarczy skopiować poniższy kod do pliku HTML i otworzyć go w przeglądarce:

```html
<script src="https://unpkg.com/vue@3"></script>

<div id="app">{{ message }}</div>

<script>
  Vue.createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

W powyższym przykładzie użyto globalnej wersji Vue, w której wszystkie interfejsy API są dostępne pod globalną zmienną `Vue`.

Chociaż globalny build działa, w pozostałej części dokumentacji dla zachowania spójności będziemy używać składni [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Aby użyć Vue zamiast natywnych modułów ES, należy użyć następującego kodu HTML:

```html
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
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

Zauważ, że w naszym kodzie możemy importować bezpośrednio z `'vue'` - jest to możliwe dzięki blokowi `<script type="importmap">`, wykorzystującemu natywną funkcję przeglądarki o nazwie [Import Maps](https://caniuse.com/import-maps). Mapy importu są obecnie dostępne tylko w przeglądarkach opartych na Chromium, dlatego podczas nauki zalecamy korzystanie z Chrome lub Edge. Jeśli Twoja preferowana przeglądarka nie obsługuje jeszcze map importu, możesz ją uzupełnić za pomocą [es-module-shims](https://github.com/guybedford/es-module-shims).

Do mapy importu można dodać wpisy dotyczące innych zależności - należy tylko upewnić się, że wskazują one na wersję biblioteki, której zamierzamy używać w modułach ES.

:::tip Nie do produkcji
Konfiguracja oparta na import-maps jest przeznaczona wyłącznie do nauki - jeśli zamierzasz używać Vue bez narzędzi do budowania na produkcji, sprawdź [Przewodnik wdrożenia produkcyjnego](/guide/best-practices/production-deployment.html#without-build-tools).
:::

### Obsługa przez HTTP

Gdy zagłębimy się w przewodnik, może się okazać, że będziemy musieli podzielić nasz kod na osobne pliki JavaScript, aby łatwiej było nimi zarządzać. Na przykład:

```html
<!-- index.html -->
<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}
```

Aby to zadziałało, musisz dostarczyć swój HTML przez protokół `http://` zamiast protokołu `file://`. Aby uruchomić lokalny serwer HTTP, najpierw zainstaluj [Node.js](https://nodejs.org/en/), a następnie uruchom `npx serve` z linii poleceń w tym samym katalogu, w którym znajduje się twój plik HTML. Można również użyć dowolnego innego serwera HTTP, który może obsługiwać pliki statyczne z poprawnymi typami MIME.

Być może zauważyłeś, że szablon importowanego komponentu jest wklejony jako łańcuch JavaScript. Jeśli używasz VSCode, możesz zainstalować rozszerzenie [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) i poprzedzać łańcuchy komentarzem `/*html*/`, aby uzyskać dla nich kolorowanie składni.

## Kolejne kroki

Jeśli pominąłeś [Wprowadzenie](/guide/introduction), zdecydowanie zalecamy przeczytanie go przed przejściem do reszty dokumentacji.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Kontynuuj Przewodnik</p>
    <p class="next-steps-caption">W przewodniku szczegółowo omówiono każdy aspekt frameworku.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Spróbuj samouczka</p>
    <p class="next-steps-caption">Dla tych, którzy wolą uczyć się w praktyce.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Sprawdź przykłady</p>
    <p class="next-steps-caption">Zapoznaj się z przykładami podstawowych funkcji i typowych zadań UI.</p>
  </a>
</div>
