# Pierwsze kroki {#getting-started}

Witamy w samouczku Vue!

Celem tego samouczka jest szybkie pokazanie, jak to jest pracować z Vue bezpośrednio w przeglądarce. Nie ma on być wyczerpujący i nie musisz zrozumieć wszystkiego, zanim przejdziesz dalej. Po jego ukończeniu warto jednak zapoznać się z <a target="_blank" href="/guide/introduction.html">Przewodnikiem</a> w którym każdy temat został omówiony bardziej szczegółowo.

## Wymagania wstępne {#prerequisites}

Samouczek zakłada podstawową znajomość HTML, CSS i JavaScript. Jeśli jesteś zupełnie nowy w rozwoju front-endu, może nie być najlepszym pomysłem przeskakiwanie od razu do frameworka jako pierwszego kroku - opanuj podstawy, a następnie wróć! Wcześniejsze doświadczenie z innymi frameworkami pomaga, ale nie jest wymagane.

## Jak korzystać z tego samouczka {#how-to-use-this-tutorial}

Możesz edytować kod <span class="wide">po prawej</span><span class="narrow">stronie</span> i natychmiast zobaczyć aktualizację wyniku. Każdy krok przedstawi podstawową funkcję Vue, a od użytkownika oczekuje się ukończenia kodu w celu uruchomienia wersji demonstracyjnej. Jeśli utkniesz, będziesz mieć przycisk „Pokaż mi!”, który ujawni działający kod. Postaraj się nie polegać na nim zbytnio - szybciej nauczysz się samodzielnie.

Jeśli jesteś doświadczonym programistą pochodzącym z Vue 2 lub innych frameworków, istnieje kilka ustawień, które możesz dostosować, aby jak najlepiej wykorzystać ten samouczek. Jeśli jesteś początkującym programistą, zalecamy skorzystanie z ustawień domyślnych.

<details>
<summary>Szczegóły ustawień samouczka</summary>

- Vue oferuje dwa style API: Options API i Composition API. Ten samouczek został zaprojektowany tak, aby działał dla obu - możesz wybrać preferowany styl za pomocą przełączników  **Preferencje API** u góry. <a target="_blank" href="/guide/introduction.html#api-styles">Dowiedz się więcej o stylach API.</a>.

- Możesz także przełączać się między trybem SFC lub HTML. Ten pierwszy pokaże przykłady kodu w formacie <a target="_blank" href="/guide/introduction.html#single-file-components">Single-File Component</a> (SFC), który jest używany przez większość programistów, gdy używają Vue z krokiem kompilacji. Tryb HTML pokazuje użycie bez kroku kompilacji.

<div class="html">

:::tip
Jeśli zamierzasz używać trybu HTML bez kroku kompilacji we własnych aplikacjach, upewnij się, że zmieniłeś import na:

```js
import { ... } from 'vue/dist/vue.esm-bundler.js'
```

wewnątrz skryptów lub skonfiguruj narzędzie kompilacji, aby odpowiednio rozwiązaywało `vue`. Przykładowa konfiguracja dla [Vite](https://vitejs.dev/):

```js
// vite.config.js
export default {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
}
```

Więcej informacji można znaleźć w [sekcji przewodnika po narzędziach.](/guide/scaling-up/tooling.html#note-on-in-browser-template-compilation).
:::

</div>

</details>

Gotowy? Kliknij „Next”, aby rozpocząć.
