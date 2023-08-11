# Routing {#routing}

## Lato client vs. Lato server {#client-side-vs-server-side-routing}

Il routing lato server implica che il server invii una risposta in base al percorso URL che l'utente sta visitando. Quando clicchiamo su un link in un'app web tradizionalmente renderizzata lato server, il browser riceve una risposta HTML dal server e ricarica l'intera pagina con il nuovo HTML.

In un'applicazione con una singola pagina [Single-Page Application](https://developer.mozilla.org/en-US/docs/Glossary/SPA) (SPA), tuttavia, il JavaScript lato client può intercettare la navigazione, recuperare dinamicamente nuovi dati e aggiornare la pagina corrente senza ricaricare completamente la pagina. Questo solitamente porta a un'esperienza utente più reattiva, specialmente per casi d'uso che sono più simili a vere "applicazioni", in cui ci si aspetta che l'utente esegua molte interazioni nel corso del tempo.

In tali SPA, il "routing" viene gestito lato client, nel browser. Un router lato client è responsabile della gestione della visualizzazione dell'applicazione utilizzando API del browser come [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) o l'evento [`hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event).

## Router ufficiale {#official-router}

<!-- TODO update links -->
<div>
  <VueSchoolLink href="https://vueschool.io/courses/vue-router-4-for-everyone" title="Free Vue Router Course">
    Guarda un video gratuito su VueSchool
  </VueSchoolLink>
</div>

Vue è ben adatto per la creazione di SPA (Single-Page Application). Per la maggior parte delle SPA, è consigliato utilizzare la libreria ufficiale [Vue Router library](https://github.com/vuejs/router). Per ulteriori dettagli, consulta la sua [documentazione](https://router.vuejs.org/).

## Routing semplice da zero {#simple-routing-from-scratch}

Se hai bisogno solo di un routing molto semplice e non desideri utilizzare una libreria di routing completa, puoi farlo con [Componenti Dinamici](/guide/essentials/component-basics#dynamic-components) e aggiornare lo stato corrente del componente ascoltando gli eventi [`hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) del browser o utilizzando l'[History API](https://developer.mozilla.org/en-US/docs/Web/API/History).

Ecco un esempio di base:

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

[Prova nel Playground](https://play.vuejs.org/#eNptUk1vgkAQ/SsTegAThZp4MmhikzY9mKanXkoPWxjLRpgly6JN1P/eWb5Eywlm572ZN2/m5GyKwj9U6CydsIy1LAyUaKpiHZHMC6UNnEDjbgqxyovKYAIX2GmVg8sktwe9qhzbdz+wga15TW++VWX6fB3dAt6UeVEVJT2me2hhEcWKSgOamVjCCk4RAbiBu6xbT5tI2ML8VDeI6HLlxZXWSOZdmJTJPJB3lJSoo5+pWBipyE9FmU4soU2IJHk+MGUrS4OE2nMtIk4F/aA7BW8Cq3WjYlDbP4isQu4wVp0F1Q1uFH1IPDK+c9cb1NW8B03tyJ//uvhlJmP05hM4n60TX/bb2db0CoNmpbxMDgzmRSYMcgQQCkjZhlXkPASRs7YmhoFYw/k+WXvKiNrTcQgpmuFv7ZOZFSyQ4U9a7ZFgK2lvSTXFDqmIQbCUJTMHFkQOBAwKg16kM3W6O7K3eSs+nbeK+eee1V/XKK0dY4Q3vLhR6uJxMUK8/AFKaB6k)

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

[Prova nel Playground](https://play.vuejs.org/#eNptUstO6zAQ/ZVR7iKtVJKLxCpKK3Gli1ggxIoNZmGSKbFoxpEzoUi0/87YeVBKNonHPmfOmcdndN00yXuHURblbeFMwxtFpm6sY7i1NcLW2RriJPWBB8bT8/WL7Xh6D9FPwL3lG9tROWHGiwGmqLDUMjhhYgtr+FQEEKdxFqRXfaR9YrkKAoqOnocfQaDEre523PNKzXqx7M8ADrlzNEYAReccEj9orjLYGyrtPtnZQrOxlFS6rXqgZJdPUC5s3YivMhuTDCkeDe6/dSalvognrkybnIgl7c4UuLhcwuHgS3v2/7EPvzRruRXJ7/SDU12W/98l451pGQndIvaWi0rTK8YrEPx64ymKFQOce5DOzlfs4cdlkA+NzdNpBSRgrJudZpQIINdQOdyuVfQnVdHGzydP9QYO549hXIII45qHkKUL/Ail8EUjBgX+z9k3JLgz9OZJgeInYElAkJlWmCcDUBGkAsrTyWS0isYV9bv803x1OTiWwzlrWtxZ2lDGDO90mWepV3+vZojHL3QQKQE=)

</div>
