# Wdrożenie produkcyjne {#production-deployment}

## Różnice między środowiskiem developerskim a produkcyjnym {#development-vs-production}

Podczas rozwoju Vue zapewnia szereg funkcji, które poprawiają doświadczenie programistyczne:

- Ostrzeżenia dotyczące typowych błędów i pułapek
- Walidacja rekwizytów/zdarzeń
- [Reactivity debugging hooks](/guide/extras/reactivity-in-depth#reactivity-debugging)
- Integracja z Devtools

Jednak te funkcje stają się bezużyteczne w środowisku produkcyjnym. Niektóre kontrole ostrzeżeń mogą również powodować niewielki narzut wydajnościowy. Podczas wdrażania w środowisku produkcyjnym powinniśmy usunąć wszystkie nieużywane gałęzie kodu przeznaczone wyłącznie do celów programistycznych, aby uzyskać mniejszy rozmiar ładunku i lepszą wydajność.

## Bez narzędzi do kompilacji {#without-build-tools}

Jeśli używasz Vue bez narzędzia do kompilacji, ładując je z CDN lub samodzielnie hostowanego skryptu, upewnij się, że używasz kompilacji produkcyjnej (pliki dist kończące się na `.prod.js`) podczas wdrażania do produkcji. Kompilacje produkcyjne są wstępnie minimalizowane, a wszystkie gałęzie kodu przeznaczone wyłącznie do programowania są usuwane.

- Jeśli używasz kompilacji globalnej (dostęp przez globalną zmienną `Vue`): użyj `vue.global.prod.js`.
- Jeśli używasz kompilacji ESM (dostęp przez natywne importy ESM): użyj `vue.esm-browser.prod.js`.

Sprawdź [przewodnik po plikach dist](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use), aby uzyskać więcej szczegółów.

## Z narzędziami do kompilacji {#with-build-tools}

Projekty tworzone za pomocą `create-vue` (na podstawie Vite) lub Vue CLI (na podstawie webpack) są wstępnie skonfigurowane do kompilacji produkcyjnych.

Jeśli używasz niestandardowej konfiguracji, upewnij się, że:

1. `vue` jest rozwinięciem `vue.runtime.esm-bundler.js`.
2. [Flagi funkcji czasu kompilacji](/api/compile-time-flags) są poprawnie skonfigurowane.
3. <code>process.env<wbr>.NODE_ENV</code> jest zastępowane przez `"production"` podczas kompilacji.

Dodatkowe odniesienia:

- [Przewodnik po kompilacji produkcyjnej Vite](https://vitejs.dev/guide/build.html)
- [Przewodnik wdrażania Vite](https://vitejs.dev/guide/static-deploy.html)
- [Przewodnik wdrażania Vue CLI](https://cli.vuejs.org/guide/deployment.html)

## Śledzenie błędów w czasie wykonywania {#tracking-runtime-errors}

[Obsługa błędów na poziomie aplikacji](/api/application#app-config-errorhandler) może być używana do raportowania błędów do usług śledzenia:

```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // zgłoś błąd do usług śledzenia
}
```

Usługi takie jak [Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) i [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) również zapewniają oficjalne integracje z Vue.
