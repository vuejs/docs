# Wtyczki (Plugins) {#plugins}

## Wprowadzenie {#introduction}

Wtyczki to samodzielny kod, który zazwyczaj dodaje funkcjonalność na poziomie aplikacji do Vue. Oto jak instalujemy wtyczkę:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* opcjonalne opcje */
})
```

Wtyczka jest zdefiniowana jako obiekt, który udostępnia metodę `install()` lub po prostu funkcja, która działa jako sama funkcja install. Funkcja install otrzymuje [app instance](/api/application) wraz z dodatkowymi opcjami przekazanymi do `app.use()`, jeśli takie istnieją:

```js
const myPlugin = {
  install(app, options) {
    // konfiguracja aplikacji
  }
}
```

Nie ma ściśle określonego zakresu dla wtyczki, ale typowe scenariusze, w których wtyczki są przydatne, obejmują:

1. Rejestracja jednego lub większej liczby globalnych komponentów lub niestandardowych dyrektyw za pomocą [`app.component()`](/api/application#app-component) i [`app.directive()`](/api/application#app-directive).

2. Utworzenie zasobu [injectable](/guide/components/provide-inject) w całej aplikacji poprzez wywołanie [`app.provide()`](/api/application#app-provide).

3. Dodanie niektórych globalnych właściwości instancji lub metod poprzez dołączenie ich do [`app.config.globalProperties`](/api/application#app-config-globalproperties).

4. Biblioteka, która musi wykonać pewną kombinację powyższych czynności (np. [vue-router](https://github.com/vuejs/vue-router-next)).

## Tworzenie wtyczki (Plugina) {#writing-a-plugin}

Aby lepiej zrozumieć, jak tworzyć własne wtyczki Vue.js, utworzymy bardzo uproszczoną wersję wtyczki, która wyświetla ciągi `i18n` (skrót od [Internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization)).

Zacznijmy od skonfigurowania obiektu wtyczki. Zaleca się utworzenie go w osobnym pliku i wyeksportowanie, jak pokazano poniżej, aby zachować logikę zamkniętą i oddzieloną.

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // Kod wtyczki
  }
}
```

Chcemy utworzyć funkcję tłumaczenia. Ta funkcja otrzyma ciąg `key` rozdzielony kropkami, którego użyjemy do wyszukania przetłumaczonego ciągu w opcjach podanych przez użytkownika. Oto zamierzone użycie w szablonach:

```vue-html
<h1>{{ $translate('greetings.hello') }}</h1>
```

Ponieważ ta funkcja powinna być globalnie dostępna we wszystkich szablonach, umoliwimy to, dołączając ją do `app.config.globalProperties` w naszej wtyczce:

```js{4-11}
// plugins/i18n.js
export default {
  install: (app, options) => {
    // wstrzyknij globalnie dostępną metodę $translate()
    app.config.globalProperties.$translate = (key) => {
      // pobierz zagnieżdżoną właściwość w `options`
      // używając `key` jako ścieżki
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

Nasza funkcja `$translate` przyjmie ciąg znaków, taki jak `greetings.hello`, zajrzy do konfiguracji podanej przez użytkownika i zwróci przetłumaczoną wartość.

Obiekt zawierający przetłumaczone klucze powinien zostać przekazany do wtyczki podczas instalacji za pośrednictwem dodatkowych parametrów do `app.use()`:

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Witaj!'
  }
})
```

Teraz nasze początkowe wyrażenie `$translate('greetings.hello')` zostanie zastąpione przez `Witaj!` w czasie wykonywania.

Zobacz także: [Rozszerzanie właściwości globalnych](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

:::tip
Należy rzadko używać właściwości globalnych, ponieważ może to szybko stać się mylące, jeśli w całej aplikacji będzie używanych zbyt wiele właściwości globalnych wstrzykiwanych przez różne wtyczki.
:::

### Dostarcz/wstrzyknij (Provide/Inject) za pomocą wtyczek {#provide-inject-with-plugins}

Wtyczki pozwalają nam również używać `inject`, aby zapewnić funkcję lub atrybut użytkownikom wtyczki. Na przykład możemy zezwolić aplikacji na dostęp do parametru `options`, aby móc używać obiektu translations.

```js{10}
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.provide('i18n', options)
  }
}
```

Użytkownicy wtyczek będą teraz mogli wstrzykiwać opcje wtyczki do swoich komponentów, korzystając z klucza `i18n`:

<div class="composition-api">

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

</div>
<div class="options-api">

```js
export default {
  inject: ['i18n'],
  created() {
    console.log(this.i18n.greetings.hello)
  }
}
```

</div>
