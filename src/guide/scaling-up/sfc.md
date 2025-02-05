# Komponenty jednoplikowe (SFC) {#single-file-components}

## Wprowadzenie {#introduction}

"Single-File Components" (inaczej pliki `*.vue`, skrótowo **SFC**) to specjalny format plików który pozwala nam zawrzeć template, logikę **oraz** style danego komponentu Vue w jednym pliku. Oto przykład komponentu SFC:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      greeting: 'Witaj Świecie!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

</div>

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const greeting = ref('Witaj Świecie!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

</div>

Jak widzimy, komponenty SFC są naturalnym rozszerzeniem klasycznej trójki HTML, CSS oraz JavaScript. Bloki `<template>`, `<script>` oraz `<style>` enkapsulują i trzymają razem widok, logikę i style komponentu w jednym pliku. Pełna składania jest opisana w [Specyfikacji składni SFC](/api/sfc-spec).

## Czemu używać SFC {#why-sfc}

SFC wymagają kroku budowania w naszym projekcie ale dostarczają w zamian wiele zalet:

- Tworzenie modularnych komponentów z użyciem znajomej składni języka HTML, CSS oraz JavaScript
- [Trzymanie blisko siebie powiązanych częsci kodu](#what-about-separation-of-concerns)
- Prekompilacja szablonów bez kosztów w trakcie runtime
- [Component-scoped CSS](/api/sfc-css-features)
- [Bardziej ergonomiczna składnia przy pracy z Composition API](/api/sfc-script-setup)
- Więcej optymalizacji podczas etapu kompilacji dzięki analizie template oraz script
- [Wsparcie IDE](/guide/scaling-up/tooling#ide-support) z auto-completion oraz sprawdzaniem typów w szablonach
- Hot-Module Replacement (HMR) działający out-of-the-box

SFC są sztandardową funkcjonalnością Vue jako frameworka oraz zalecanym podejściem używania Vue w następujących przypadkach:

- Aplikacje typu SPA (Single-Page Application)
- Statyczne generowanie treści (SSG)
- Każdy nietrywialny frontend gdzie krok budowania może być uzasadniony celem lepszego development experience (DX).

Mając to na uwadze, mamy również świadomość, że są przypadki gdzie SFC mogą być przesadą. Dlatego też możemy nadal stosować Vue bez kroku budowania używając zwykłego JavaScript. Jeśli chcesz ubogacić głównie statyczną treść HTML drobnymi interakcjami, sprawdź [petite-vue](https://github.com/vuejs/petite-vue), to ważąca 6 kB uproszczona wersja Vue zoptymalizowana celem tzw. "progressive enhancement".

## Jak to działa {#how-it-works}

SFC to format plików używany przez framework Vue i musi być prekompilowany przez [@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) do standardowego kodu JavaScript oraz CSS. Skompilowany SFC to standardowy moduł JavaScript (ES module) - co oznacza, że z prawidłowo skonfigurowanym środowiskiem możemy go również zaimportować jak moduł:

```js
import MyComponent from './MyComponent.vue'

export default {
  components: {
    MyComponent
  }
}
```

Tagi `<style>` w środku plików SFC są wstrzykiwane jako natywne tagi `<style>` podczas developmentu, aby wspierać hot-module reloading. Budując kod w celach produkcyjnych, mogą być one wyekstraktowane jako pojedynczy plik CSS.

Możesz poeksperymentować z SFC i zbadać jak wynikowo wyglądają skompilowane w [Piaskownicy Vue SFC](https://play.vuejs.org/).

W faktycznych projektach, najczęściej kompilator SFC jest integrowany przez narzędzie do budowania jak [Vite](https://vitejs.dev/) lub [Vue CLI](http://cli.vuejs.org/) (które oparte jest na [webpacku](https://webpack.js.org/)), a samo Vue dostarcza oficjalne narzędzia, aby móc pracować z SFC jak najłatwiej i najszybciej. Aby dowiedzieć się więcej, zobacz sekcję [Narzędzia SFC ](/guide/scaling-up/tooling).

## Co z separacją zagadnień? {#what-about-separation-of-concerns}

Niektórzy użytkownicy pochodzący z tradycjonalnego podejścia do web developmentu mogą mieć obawy że SFC mieszają różne zależności i zagadnienia w jednym miejscu - które przecież HTML/CSS/JS miały separować!

Aby odpowiedzieć na to pytanie, ważnym jest, abyśmy się zgodzili, że **separacja zagadnień nie oznacza separacji typów plików**. Ostatecznym celem dobrych praktych inżynierskich jest zapewnienie łatwości utrzymania bazy kodu. Separacja zagadnień, praktykowana bardzo dogmatycznie jako separacja przez rózne typy plików, nie pomaga nam w dojściu do tego celu w kontekście co raz bardziej skomplikowanych aplikacji frontendowych.

We współczesnym developmencie UI zamiast bardzo granularnie separować bazę kodu na trzy oddzielne warstwy zależne od siebie więcej sensu ma dzielenie kodu na komponenty luźniej zależne od siebie i zastosowanie kompozycji. W środku komponentu jego szablon, logika czy style są z natury zależne od siebie i trzymanie ich razem w jednym pliku sprawia, że łatwiej zrozumieć, zarządzać i utrzymywać taką bazę kodu.

Pamiętaj jednak, że jeśli nie podoba Ci się idea komponentów jednoplikowych - możesz nadal korzystać z pre-kompilacji kodu czy hot-module reloading poprzez wydzielenie JavaScript i CSS do osobnych plików z użyciem [Src Imports](/api/sfc-spec#src-imports).
