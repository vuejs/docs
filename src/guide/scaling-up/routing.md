# Routing {#routing}

## Routing po stronie klienta vs. po stronie serwera {#client-side-vs-server-side-routing}

Routing po stronie serwera oznacza, że serwer zwraca response opierając się na URL pod którym użytkownik odwiedza aplikację. Gdy klikamy w link w tradycyjnej aplikacji renderowanej po stronie serwera, przeglądarka pobiera odpowiedź HTML z serwera i przeładowuje całą stronę z nowym kodem HTML.

W aplikacjach [Single-Page](https://developer.mozilla.org/en-US/docs/Glossary/SPA) (SPA), kod JavaScript po stronie klienta może przechwycić nawigację, dynamicznie pobrać nowe dane i zaktualizować stronę bez pełnego odświeżania strony. Zazwyczaj oznacza to lepsze user experience, szczególnie w przypadkach, które są bardziej jak faktyczne "aplikacje" - tj użytkownik wykonuje bardzo wiele interakcji przez dłuższy czas.

W takich aplikacjach SPA "routing" dzieje się po stronie klienta, w jego przeglądarce. Router w tym wypadku jest odpowiedzialny za zarządzanie renderowanym widokiem aplikacji wykorzystując API przeglądarek jak [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) lub [event `hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event).

## Oficjalny Router {#official-router}

<!-- TODO update links -->
<div>
  <VueSchoolLink href="https://vueschool.io/courses/vue-router-4-for-everyone" title="Darmowa lekcja o Vue Router">
      Obejrzyj bezpłatną lekcję wideo na Vue School
  </VueSchoolLink>
</div>

Vue świetnie nadaje się do budowania aplikacji SPA. Dla większości SPA, zalecamy użycie oficjalnie wspieranej [biblioteki Vue Router](https://github.com/vuejs/router). Aby dowiedzieć się więcej, odwiedź dokumentację [Vue Routera](https://router.vuejs.org/).

## Prosty routing od podstaw {#simple-routing-from-scratch}

Jeśli potrzebujesz jedynie bardzo prostego routingu i nie chcesz korzystać z pełnoprawnej biblioteki routingu, możesz wykorzystać [dynamiczne komponenty](/guide/essentials/component-basics#dynamic-components) i aktualizować obecny komponent nasłuchując do eventów [`hashchange` przegląrdki](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) lub wykorzystać [History API](https://developer.mozilla.org/en-US/docs/Web/API/History).

Poniżej przedstawiamy bardzo uproszczony przykład:

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

[Wypróbuj w piaskownicy](https://play.vuejs.org/#eNptUk1vgkAQ/SsTegAThZp4MmhikzY9mKanXkoPWxjLRpgly6JN1P/eWb5Eywlm572ZN2/m5GyKwj9U6CydsIy1LAyUaKpiHZHMC6UNnEDjbgqxyovKYAIX2GmVg8sktwe9qhzbdz+wga15TW++VWX6fB3dAt6UeVEVJT2me2hhEcWKSgOamVjCCk4RAbiBu6xbT5tI2ML8VDeI6HLlxZXWSOZdmJTJPJB3lJSoo5+pWBipyE9FmU4soU2IJHk+MGUrS4OE2nMtIk4F/aA7BW8Cq3WjYlDbP4isQu4wVp0F1Q1uFH1IPDK+c9cb1NW8B03tyJ//uvhlJmP05hM4n60TX/bb2db0CoNmpbxMDgzmRSYMcgQQCkjZhlXkPASRs7YmhoFYw/k+WXvKiNrTcQgpmuFv7ZOZFSyQ4U9a7ZFgK2lvSTXFDqmIQbCUJTMHFkQOBAwKg16kM3W6O7K3eSs+nbeK+eee1V/XKK0dY4Q3vLhR6uJxMUK8/AFKaB6k)

</div>

<div class="options-api">

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

[Wypróbuj w piaskownicy](https://play.vuejs.org/#eNptUstO6zAQ/ZVR7iKtVJKLxCpKK3Gli1ggxIoNZmGSKbFoxpEzoUi0/87YeVBKNonHPmfOmcdndN00yXuHURblbeFMwxtFpm6sY7i1NcLW2RriJPWBB8bT8/WL7Xh6D9FPwL3lG9tROWHGiwGmqLDUMjhhYgtr+FQEEKdxFqRXfaR9YrkKAoqOnocfQaDEre523PNKzXqx7M8ADrlzNEYAReccEj9orjLYGyrtPtnZQrOxlFS6rXqgZJdPUC5s3YivMhuTDCkeDe6/dSalvognrkybnIgl7c4UuLhcwuHgS3v2/7EPvzRruRXJ7/SDU12W/98l451pGQndIvaWi0rTK8YrEPx64ymKFQOce5DOzlfs4cdlkA+NzdNpBSRgrJudZpQIINdQOdyuVfQnVdHGzydP9QYO549hXIII45qHkKUL/Ail8EUjBgX+z9k3JLgz9OZJgeInYElAkJlWmCcDUBGkAsrTyWS0isYV9bv803x1OTiWwzlrWtxZ2lDGDO90mWepV3+vZojHL3QQKQE=)

</div>
