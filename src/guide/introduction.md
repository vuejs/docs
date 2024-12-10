---
footer: false
---

# Wstęp {#introduction}

:::info Czytasz dokumentację Vue 3!

- Wsparcie dla Vue 2 zakończyło się **31 grudnia 2023 r.**. Dowiedz się więcej o [Vue 2 EOL](https://v2.vuejs.org/eol/).
- Uuaktualnienie z Vue 2? Sprawdź [Przewodnik migracji](https://v3-migration.vuejs.org/).
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Naucz się Vue z wykorzystaniem tutoriali video na <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Czym jest Vue? {#what-is-vue}

Vue (wymawiane /vjuː/, jak **view**) to framework JavaScript do tworzenia interfejsów użytkownika. Opiera się na standardowym HTML, CSS i JavaScript i zapewnia deklaratywny, oparty na komponentach model programowania, który pomaga wydajnie rozwijać interfejsy użytkownika o dowolnej złożoności.

Oto minimalny przykład:

<div class="options-api">

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

</div>
<div class="composition-api">

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

</div>

```vue-html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

**Rezultat**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>

Powyższy przykład pokazuje dwie podstawowe funkcje Vue:

- **Deklaratywne renderowanie**: Vue rozszerza standardowy HTML o składnię szablonu, która pozwala nam deklaratywnie opisywać dane wyjściowe HTML na podstawie stanu JavaScript.

- **Reaktywność**: Vue automatycznie śledzi zmiany stanu JavaScript i skutecznie aktualizuje DOM, gdy zmiany zachodzą.

Możesz już mieć pytania — nie martw się. Omówimy każdy szczegół w pozostałej części dokumentacji. Na razie czytaj dalej, aby mieć ogólne pojęcie o tym, co oferuje Vue.

:::tip Wymagania wstępne
Pozostała część dokumentacji zakłada podstawową znajomość HTML, CSS i JavaScript. Jeśli jesteś całkowicie nowy w programowaniu front-end, może nie być najlepszym pomysłem, aby od razu zacząć od frameworka — poznaj podstawy, a potem wróć! Możesz sprawdzić swój poziom wiedzy za pomocą tych przeglądów dla [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript), [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) i [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps), jeśli to konieczne. Wcześniejsze doświadczenie z innymi frameworkami jest pomocne, ale nie jest wymagane.
:::

## Progresywny Framework {#the-progressive-framework}

Vue to framework i ekosystem, który obejmuje większość typowych funkcji potrzebnych w rozwoju front-endu. Jednak sieć jest niezwykle różnorodna — rzeczy, które budujemy w sieci, mogą się drastycznie różnić pod względem formy i skali. Mając to na uwadze, Vue jest zaprojektowane tak, aby było elastyczne i stopniowo adoptowalne. W zależności od przypadku użycia, Vue można używać na różne sposoby:

- Ulepszanie statycznego HTML bez etapu kompilacji
- Osadzanie jako komponentów internetowych na dowolnej stronie
- Aplikacja jednostronicowa (SPA)
- Renderowanie Fullstack/Server-Side (SSR)
- Generowanie Jamstack/Static Site (SSG)
- Kierowanie na komputery stacjonarne, urządzenia mobilne, WebGL, a nawet terminal

Jeśli te koncepcje wydają Ci się przerażające, nie martw się! Samouczek i przewodnik wymagają jedynie podstawowej znajomości HTML i JavaScript, a powinieneś być w stanie śledzić je bez konieczności bycia ekspertem w żadnej z tych dziedzin.

Jeśli jesteś doświadczonym programistą zainteresowanym tym, jak najlepiej zintegrować Vue ze swoim stosem, lub jesteś ciekaw, co oznaczają te terminy, omawiamy je bardziej szczegółowo w [Sposoby korzystania z Vue](/guide/extras/ways-of-using-vue).

Pomimo elastyczności, podstawowa wiedza na temat działania Vue jest wspólna dla wszystkich tych przypadków użycia. Nawet jeśli jesteś teraz początkującym, wiedza zdobyta po drodze pozostanie przydatna, gdy będziesz się rozwijać, aby w przyszłości realizować bardziej ambitne cele. Jeśli jesteś weteranem, możesz wybrać optymalny sposób wykorzystania Vue w oparciu o problemy, które próbujesz rozwiązać, zachowując jednocześnie tę samą produktywność. Dlatego nazywamy Vue „Progresywnym Frameworkiem”: to framework, który może rozwijać się wraz z Tobą i dostosowywać się do Twoich potrzeb.

## Komponenty Single-file {#single-file-components}

W większości projektów Vue z włączonym narzędziem do kompilacji tworzymy komponenty Vue przy użyciu formatu pliku podobnego do HTML, zwanego **Komponentem Jednoplikowym** (znanego również jako pliki `*.vue`, w skrócie **SFC**). Vue SFC, jak sama nazwa wskazuje, hermetyzuje logikę komponentu (JavaScript), szablon (HTML) i style (CSS) w jednym pliku. Oto poprzedni przykład, napisany w formacie SFC:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Podliczenie to: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Podliczenie to: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>

SFC jest cechą definiującą Vue i jest zalecanym sposobem tworzenia komponentów Vue, **jeśli** Twój przypadek użycia wymaga konfiguracji kompilacji. Możesz dowiedzieć się więcej o [jak i dlaczego SFC](/guide/scaling-up/sfc) w dedykowanej sekcji - ale na razie wiedz, że Vue zajmie się całą konfiguracją narzędzi kompilacji za Ciebie.

## Style API {#api-styles}

Komponenty Vue można tworzyć w dwóch różnych stylach API: **API opcji** i **API kompozycji**.

### Options API {#options-api}

Za pomocą Options API definiujemy logikę komponentu, używając obiektu opcji, takich jak `data`, `methods` i `mounted`. Właściwości zdefiniowane przez options są udostępniane w `this` wewnątrz funkcji, które wskazują na wystąpienie komponentu:

```vue
<script>
export default {
  // Właściwości zwrócone przez data() stają się stanem reaktywnym
  // i zostaną ujawnione w `this`.
  data() {
    return {
      count: 0
    }
  },

  // Metody to funkcje, które zmieniają stan i wyzwalają aktualizacje.
  // Mogą być powiązane jako procedury obsługi zdarzeń w szablonach.
  methods: {
    increment() {
      this.count++
    }
  },

  // Haki cyklu życia są wywoływane na różnych etapach
  // cyklu życia komponentu.
  // Ta funkcja zostanie wywołana, gdy komponent zostanie zamontowany.
  mounted() {
    console.log(`Początkowe podliczenie to ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Podliczenie to: {{ count }}</button>
</template>
```

[Wypróbuj interaktywne demo](https://play.vuejs.org/#eNptkMFqxCAQhl9lkB522ZL0HNKlpa/Qo4e1ZpLIGhUdl5bgu9es2eSyIMio833zO7NP56pbRNawNkivHJ25wV9nPUGHvYiaYOYGoK7Bo5CkbgiBBOFy2AkSh2N5APmeojePCkDaaKiBt1KnZUuv3Ky0PppMsyYAjYJgigu0oEGYDsirYUAP0WULhqVrQhptF5qHQhnpcUJD+wyQaSpUd/Xp9NysVY/yT2qE0dprIS/vsds5Mg9mNVbaDofL94jZpUgJXUKBCvAy76ZUXY53CTd5tfX2k7kgnJzOCXIF0P5EImvgQ2olr++cbRE4O3+t6JxvXj0ptXVpye1tvbFY+ge/NJZt)

### Composition API {#composition-api}

Dzięki Composition API definiujemy logikę komponentu za pomocą importowanych funkcji API. W SFC Composition API jest zazwyczaj używane z [`<script setup>`](/api/sfc-script-setup). Atrybut `setup` to wskazówka, która sprawia, że ​​Vue wykonuje transformacje w czasie kompilacji, które pozwalają nam używać Composition API z mniejszą ilością szablonów. Na przykład importy i zmienne najwyższego poziomu / funkcje zadeklarowane w `<script setup>` są bezpośrednio użyteczne w szablonie.

Oto ten sam komponent, z dokładnie tym samym szablonem, ale wykorzystujący API kompozycji i `<script setup>`:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// stan reaktywny
const count = ref(0)

// funkcje, które zmieniają stan i wyzwalają aktualizacje
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`Początkowe podliczenie to ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Podliczenie to: {{ count }}</button>
</template>
```

[Wypróbuj interaktywne demo](https://play.vuejs.org/#eNpNkMFqwzAQRH9lMYU4pNg9Bye09NxbjzrEVda2iLwS0spQjP69a+yYHnRYad7MaOfiw/tqSliciybqYDxDRE7+qsiM3gWGGQJ2r+DoyyVivEOGLrgRDkIdFCmqa1G0ms2EELllVKQdRQa9AHBZ+PLtuEm7RCKVd+ChZRjTQqwctHQHDqbvMUDyd7mKip4AGNIBRyQujzArgtW/mlqb8HRSlLcEazrUv9oiDM49xGGvXgp5uT5his5iZV1f3r4HFHvDprVbaxPhZf4XkKub/CDLaep1T7IhGRhHb6WoTADNT2KWpu/aGv24qGKvrIrr5+Z7hnneQnJu6hURvKl3ryL/ARrVkuI=)

### Które wybrać? {#which-to-choose}

Oba style API są w pełni zdolne do pokrycia typowych przypadków użycia. Są to różne interfejsy obsługiwane przez dokładnie ten sam system bazowy. W rzeczywistości API opcji jest implementowane na wierzchu API kompozycji! Podstawowe koncepcje i wiedza na temat Vue są wspólne dla obu stylów.

API opcji koncentruje się wokół koncepcji „instancji komponentu” (`this`, jak widać w przykładzie), która zazwyczaj lepiej pasuje do opartego na klasach modelu mentalnego dla użytkowników pochodzących z środowisk języka OOP. Jest również bardziej przyjazny dla początkujących, ponieważ abstrahuje szczegóły reaktywności i wymusza organizację kodu za pomocą grup opcji.

API kompozycji koncentruje się na deklarowaniu reaktywnych zmiennych stanu bezpośrednio w zakresie funkcji i składaniu stanu z wielu funkcji razem w celu obsługi złożoności. Jest bardziej swobodny i wymaga zrozumienia, jak działa reaktywność w Vue, aby można go było skutecznie używać. W zamian jego elastyczność umożliwia bardziej wydajne wzorce organizacji i ponownego wykorzystywania logiki.

Możesz dowiedzieć się więcej o porównaniu obu stylów i potencjalnych korzyściach z Composition API w [Composition API FAQ](/guide/extras/composition-api-faq).

Jeśli jesteś nowy w Vue, oto nasza ogólna rekomendacja:

- W celach edukacyjnych wybierz styl, który wydaje Ci się łatwiejszy do zrozumienia. Ponownie, większość podstawowych koncepcji jest wspólna dla obu stylów. Zawsze możesz wybrać inny styl później.

- Do użytku produkcyjnego:

  - Wybierz Options API, jeśli nie używasz narzędzi do kompilacji lub planujesz używać Vue głównie w scenariuszach o niskiej złożoności, np. progresywne ulepszanie.

  - Wybierz Composition API + Single-File Components, jeśli planujesz budować pełne aplikacje za pomocą Vue.

Nie musisz zobowiązywać się do tylko jednego stylu podczas fazy nauki. Pozostała część dokumentacji zawiera przykłady kodu w obu stylach, jeśli ma to zastosowanie, i możesz przełączać się między nimi w dowolnym momencie, używając **przełączników preferencji API** u góry lewego paska bocznego.

## Nadal masz pytania? {#still-got-questions}

Sprawdź nasze [FAQ](/about/faq).

## Wybierz swoją ścieżkę nauki {#pick-your-learning-path}

Różni programiści mają różne style uczenia się. Możesz swobodnie wybrać ścieżkę nauki, która odpowiada Twoim preferencjom - chociaż zalecamy przejrzenie całej zawartości, jeśli to możliwe!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Wypróbuj samouczek</p>
    <p class="next-steps-caption">Dla tych, którzy wolą uczyć się rzeczy w praktyce.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Przeczytaj przewodnik</p>
    <p class="next-steps-caption">Przewodnik przeprowadzi Cię przez każdy aspekt struktury w pełnym szczególe.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Sprawdź przykłady</p>
    <p class="next-steps-caption">Przeglądaj przykłady podstawowych funkcji i typowych zadań interfejsu użytkownika.</p>
  </a>
</div>
