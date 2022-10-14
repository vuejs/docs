---
footer: false
---

# Wprowadzenie

:::info Czytasz dokumentację dla Vue 3!

- Dokumentacja Vue 2 została przeniesiona na stronę [v2.vuejs.org](https://v2.vuejs.org/).
- Przechodzisz z Vue 2? Zapoznaj się z [przewodnikiem migracji](https://v3-migration.vuejs.org/).
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses-path/beginner" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Naucz się Vue dzięki samouczkom wideo na stronie <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Co to jest Vue?

Vue (wywawiaj /vjuː/, jak **view**) to framework JavaScript do tworzenia interfejsów użytkownika. Bazuje na standardowym HTML, CSS i JavaScript oraz zapewnia deklaratywny i oparty na komponentach model programowania, który pomaga efektywnie tworzyć interfejsy użytkownika, zarówno proste, jak i złożone.

Oto mały przykład:

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

Powyższy przykład demonstruje dwie podstawowe cechy Vue:

- **Declarative Rendering**: Vue rozszerza standardowy HTML o składnię szablonów, która pozwala nam deklaratywnie renderować wyjściowe HTML na podstawie stanu z JavaScript.

- **Reactivity**: Vue automatycznie śledzi zmiany stanu JavaScript i sprawnie aktualizuje DOM, gdy te zmiany następują.

Być może masz już jakieś pytania - nie martw się. Każdy szczegół omówimy w dalszej części dokumentacji. Na razie prosimy czytać dalej, aby mieć ogólne pojęcie o tym, co oferuje Vue.

:::tip Wymagania wstępne
Pozostała część dokumentacji zakłada podstawową znajomość HTML, CSS i JavaScript. Jeśli jesteś zupełnie nowy w świecie frontendu, to nauka frameworku może nie być najlepszym pomysłem. Opanuj podstawy, a potem wróć! Możesz sprawdzić swój poziom wiedzy, korzystając z [tego przeglądu JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). Wcześniejsze doświadczenie z innymi frameworkami pomaga, ale nie jest wymagane.
:::

## Progresywny Framework

Vue to framework oraz ekosystem, który obejmuje większość typowych funkcji potrzebnych do tworzenia frontendu. Web ddevelopmend jest jednak niezwykle zróżnicowany - rzeczy, które budujemy w sieci, mogą bardzo różnić się pod względem struktury i skali. Mając to na uwadze, Vue został zaprojektowany tak, aby był elastyczny i można go było stopniowo adoptować. W zależności od przypadku użycia, Vue można używać na różne sposoby:

- Wsparcie statycznego HTML bez etapu budowy
- Osadzanie Web Components na dowolnej stronie
- Single-Page Application (SPA)
- Fullstack / Server-Side-Rendering (SSR)
- Jamstack / Generowanie statycznych stron (SSG)
- Możliwość wykorzystania w aplikacjach desktopowych, urządzeniach mobilnych, WebGL, a nawet terminalach

Jeśli te pojęcia są dla Ciebie przerażające, nie przejmuj się! Samouczek i przewodnik wymagają jedynie podstawowej znajomości HTML i JavaScript, więc nie będąc ekspertem w żadnej z tych dziedzin, powinieneś być w stanie dać sobie radę.

Jeśli jesteś doświadczonym programistą zainteresowanym tym, jak najlepiej zintegrować Vue z tym czego używasz w delvelopmencie, lub jesteś ciekawy, co te terminy oznaczają, omówimy je bardziej szczegółowo w [Sposoby korzystania z Vue](/guide/extras/ways-of-using-vue).

Pomimo elastyczności, podstawowa wiedza o tym, jak działa Vue, jest wspólna dla wszystkich tych przypadków użycia. Nawet jeśli jesteś teraz początkującym użytkownikiem, wiedza zdobyta po drodze będzie przydatna, gdy będziesz się rozwijał i stawiał sobie bardziej ambitne cele w przyszłości. Jeśli jesteś weteranem, możesz wybrać optymalny sposób wykorzystania Vue w zależności od problemów, które próbujesz rozwiązać, zachowując tę samą dobrą wydajność (DX). Dlatego właśnie nazywamy Vue "progresywnym frameworkiem": jest to framework, który może rosnąć wraz z Tobą i dostosowywać się do Twoich potrzeb.

## Komponenty oparte o jeden plik (SFC)

W większości projektów Vue wykorzystujących narzędzia generujące kod, komponenty Vue tworzy się przy użyciu formatu pliku podobnego do HTML, zwanego **Single-File Component** (znanego również jako pliki `*.vue`, w skrócie **SFC**). SFC Vue, jak sama nazwa wskazuje, zamyka logikę komponentu (JavaScript), szablon (HTML) i style (CSS) w jednym pliku. Oto poprzedni przykład, zapisany w formacie SFC:

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
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC jest cechą definiującą Vue i jest zalecanym sposobem tworzenia komponentów Vue, **jeśli** Twój przypadek użycia wymaga konfiguracji budowania. Możesz dowiedzieć się więcej o tym, [jak i dlaczego SFC](/guide/scaling-up/sfc) w dedykowanej sekcji - ale na razie wiedz, że Vue zajmie się konfiguracją narzędzi do budowania kodu wyjściowego za Ciebie.

## Style API

Komponenty Vue mogą być tworzone w dwóch różnych stylach API: **Options API** i **Composition API**.

### Options API

Dzięki Options API definiujemy logikę komponentu za pomocą obiektu opcji, takich jak `data`, `methods` czy `mounted` (data, metody, zamontowane). Właściwości zdefiniowane przez opcje są eksponowane dzięki wyrażeniu `this` wewnątrz funkcji, która wskazuje na instancję komponentu:

```vue
<script>
export default {
  // Właściwości zwrócone z data() stają się stanem reaktywnym
  // i zostaną udostępnione na `this`.
  data() {
    return {
      count: 0
    }
  },

  // Metody to funkcje, które modyfikują stan i wyzwalają aktualizacje.
  // Można je powiązać w szablonach jako nasłuchiwacze zdarzeń.
  methods: {
    increment() {
      this.count++
    }
  },

  // Zapisane w odpowiednich miejscach cyklu życia są wywoływane na różnych etapach
  // cyklu życia komponentu.
  // Ta funkcja zostanie wywołana, gdy komponent zostanie zamontowany.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Spróbuj zabawy w piaskownicy](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPkNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

### Composition API

Korzystając z Composition API, definiujemy logikę komponentu za pomocą importowanych funkcji API. W SFC, Composition API jest zwykle używane z [`<script setup>`](/api/sfc-script-setup). Atrybut `setup` jest podpowiedzią, która sprawia, że Vue wykonuje transformacje w czasie kompilacji, które pozwalają nam używać Composition API z mniejszą ilością szablonów. Na przykład, importy i zmienne / funkcje najwyższego poziomu zadeklarowane w `<script setup>` są bezpośrednio użyte w szablonie.

Oto ten sam komponent, z dokładnie tym samym szablonem, ale wykorzystujący Composition API i `<script setup>` zamiast Option API:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// stan reaktywny
const count = ref(0)

// funkcje, które modyfikują stan i wywołują aktualizacje
function increment() {
  count.value++
}

// miejsca cyklu życia komponentu
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Spróbuj zabawy w piaskownicy](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Q291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

### Które wybrać?

Po pierwsze, oba style API są w pełni przystosowane do obsługi typowych przypadków użycia. Są to różne interfejsy zasilane przez dokładnie ten sam system bazowy. W rzeczywistości interfejs API opcji jest zaimplementowany na wierzchu interfejsu API kompozycji! Podstawowe koncepcje i wiedza na temat Vue są wspólne dla obu stylów.

Options API jest skoncentrowane wokół koncepcji "instancji komponentu" (`this`, jak widać w przykładzie), co zazwyczaj lepiej pasuje do modelu mentalnego opartego na klasach dla użytkowników wywodzących się z języków OOP. Jest ono również bardziej przyjazne dla początkujących, ponieważ abstrahuje od szczegółów reaktywności i wymusza organizację kodu poprzez grupy opcji.

Composition API jest skoncentrowane na deklarowaniu reaktywnych zmiennych stanu bezpośrednio w zakresie funkcji oraz na łączeniu stanów z wielu funkcji w celu obsługi złożoności. Jest ono bardziej swobodne i wymaga zrozumienia, jak działa reaktywność w Vue, aby można było z niego efektywnie korzystać. W zamian za to, jego elastyczność umożliwia stosowanie bardziej wydajnych wzorców do organizowania i ponownego wykorzystywania logiki.

Więcej informacji na temat porównania tych dwóch stylów i potencjalnych korzyści płynących z zastosowania Composition API można znaleźć w dokumencie [Composition API FAQ](/guide/extras/composition-api-faq).

Jeśli jesteś nowym użytkownikiem Vue, oto nasze ogólne zalecenia:

- Dla celów nauki wybierz styl, który wydaje Ci się łatwiejszy do zrozumienia. Większość podstawowych pojęć jest wspólna dla obu stylów API. Zawsze możesz wybrać ten drugi w późniejszym czasie.

- Do użytku produkcyjnego:

  - Wybierz Options API, jeśli nie używasz narzędzi do budowania lub planujesz używać Vue głównie w mało skomplikowanych scenariuszach, np. do progresywnego ulepszania.

  - Wybierz Composition API + Single-File Components, jeśli planujesz budować pełne aplikacje z Vue.

Podczas nauki nie musisz wybierać tylko jednego stylu. W pozostałej części dokumentacji znajdziesz próbki kodu w obu stylach, a w każdej chwili możesz przełączać się między nimi za pomocą **przełączników preferencji API** na górze lewego paska bocznego.

## Nadal masz pytania?

Sprawdź nasze [FAQ](/about/faq).

## Wybierz swoją ścieżkę kształcenia

Różni programiści mają różne style uczenia się. Nie krępuj się wybrać ścieżki nauki, która odpowiada Twoim preferencjom - choć zalecamy, aby w miarę możliwości zapoznać się z całą zawartością!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Wypróbuj samouczek</p>
    <p class="next-steps-caption">Dla tych, którzy wolą uczyć się w praktyce.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Przeczytaj przewodnik</p>
    <p class="next-steps-caption">Przewodnik zawiera szczegółowe informacje na temat każdego aspektu frameworku.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Sprawdź przykłady</p>
    <p class="next-steps-caption">Zapoznaj się z przykładami podstawowych funkcji i typowych zadań UI.</p>
  </a>
</div>
