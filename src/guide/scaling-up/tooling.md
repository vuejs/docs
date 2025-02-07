<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# Narzędzia {#tooling}

## Wypróbuj w przeglądarce {#try-it-online}

Nie musisz nic instalować na swojej maszynie, aby sprawdzić jak działają SFC w Vue - istnieją interaktywne piaskownice, które pozwalają poeksperymentować bezpośrednio w przeglądarce:

- [Piaskownica Vue SFC](https://play.vuejs.org)
  - Zawsze zdeployowana z ostatniego commita
  - Zaprojektowana celem analizy rezultatów kompilacji komponentów jednoplikowych
- [Starter Vue + Vite na StackBlitz](https://vite.new/vue)
  - Środowisko z wbudowanym IDE, uruchamiające serwer deweloperski Vite w przeglądarce
  - Zbliżone do środowiska lokalnego

Zalecane jest również korzystanie z tych piaskownic online do tworzenia reprodukcji podczas zgłaszania błędów.

## Przygotowywanie Projektu {#project-scaffolding}

### Vite {#vite}

[Vite](https://vitejs.dev/) to bardzo lekkie i szybkie narzędzie budowania projektu z pierwszorzędowym wsparciem dla Vue SFC. Zostało stworzone przez Evana You, który również jest autorem Vue!

Aby zacząć pracę z Vite + Vue, wywołaj polecenie:

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

To polecenie zainstaluje i wywoła [create-vue](https://github.com/vuejs/create-vue), oficjalne narzędzie do setupowania projektów.

- Aby dowiedzieć się więcej o Vite, odwiedź [dokumentację Vite](https://vitejs.dev).
- Aby skonfigurować zachowanie Vue w projekcie Vite, na przykład, aby przekazać jakieś opcje do kompilatora Vue, odwiedź dokumentację dla [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme).

Oba narzędzia przytoczony wyżej również wspierają pobieranie plików jako gotowego projektu Vite.

### Vue CLI {#vue-cli}

[Vue CLI](https://cli.vuejs.org/) to oficjalny zestaw narzędzi dla Vue oparty na webpacku. Jest on obecnie w fazie maintenance i zalecamy, aby tworzyć nowe projekty z użyciem Vite o ile nie są Tobie potrzebne funkcjonalności specyficzne dla webpacka. Vite dostarczy o wiele lepsze developer experience w większości przypadków.

Aby dowiedzieć się o migracji z Vue CLI do Vite:

- [Poradnik migracji Vue CLI -> Vite od VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Narzędzia / Wtyczki które pomagają z auto migracją](https://github.com/vitejs/awesome-vite#vue-cli)

### O kompilacji szablonów w środowisku przeglądarki {#note-on-in-browser-template-compilation}

Gdy używasz Vue bez kroku budowania, szablony komponentów definiowane są bezpośrednio w kodzie HTML strony lub jako ciągi znaków w  JavaScript. W tego typu przypadkach, Vue musi być również użyte razem z kompilatorem szablonów dla przeglądarki, aby wedle potrzeb kompilować tego typu szablony. Z drugiej strony, kompilator nie jest potrzebny jeśli prekompilujemy szablony na etapie budowania projektu. Aby zmniejszyć rozmiar paczki, Vue dostarcza [różne "wersje"](https://unpkg.com/browse/vue@3/dist/) zoptymalizowane pod różne przypadki.

- Pliki wersji zaczynające się na `vue.runtime.*` są **wersjami runtime-only**: nie zawierają one kompilatora. W przypadku używania ich wszystkie szablony muszą być pre-kompilowane na etapie budowania projektu.

- Pliki wersji nie zawierające `.runtime` są **wersjami pełnymi**: zawierają kompilator i wspierają kompilowanie szablonów bezpośrednio w przeglądarce. Jednakże, zwiększają rozmiar paczki o ~14kb.

Domyślnie, nasze konfiguracje narzędzi używają wersji runtime-only, z tego powodu że podczas budowania projektu wszystkie szablony w SFC są prekompilowane. Jeśli z jakiegoś powodu potrzebujesz kompilacji szablonów w przeglądarce pomimo kroku budowania, możesz skonfigurować narzędzie budowania projektu by aliasować `vue` na `vue/dist/vue.esm-bundler.js`.

Jeśli szukasz lżejszej, alternatywnej wersji Vue dla projektów bez kroku budowania, zobacz [petite-vue](https://github.com/vuejs/petite-vue).

## Wsparcie IDE {#ide-support}

- Rekomendowane przez IDE to [VS Code](https://code.visualstudio.com/) oraz [wtyczka Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (wcześniej Volar). Ta wtyczka dostarcza kolorwanie składni, wsparcie dla TypeScripta oraz intellisense dla wyrażeń w szablonach i propsach komponentów.

  :::tip
  Wtyczka Vue - Official zastępuje [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), poprzednią oficjalną wtyczkę do VS Code dla Vue 2. Jeśli masz obecnie zainstalowany Vetur upewnij się, aby go wyłączyć pracując przy projektach w Vue 3.
  :::

- [WebStorm](https://www.jetbrains.com/webstorm/) również posiada dobre wbudowane wsparcie dla Vue SFC.

- Inne IDE które wspierają [Language Service Protocol](https://microsoft.github.io/language-server-protocol/) (LSP) mogą również wykorzystać główne funkcjonalności Volara:

  - Sublime Text wspiera przy pomocy [LSP-Volar](https://github.com/sublimelsp/LSP-volar).

  - vim / Neovim wspierają przy pomocy [coc-volar](https://github.com/yaegassy/coc-volar).

  - emacs wspiera przy pomocy [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/)

## Narzędzia deweloperskie w przeglądarce {#browser-devtools}

<VueSchoolLink href="https://vueschool.io/lessons/using-vue-dev-tools-with-vuejs-3" title="Free Vue.js Devtools Lesson"/>

Narzędzia deweloperskie Vue dla przeglądarek pozwalają przeglądać drzewo komponentów w aplikacji Vue, podejrzeć stan konkretnych komponentów, śledzić zdarzenia zmiany stanu oraz profilować wydajność.

![Zrzut ekranu narzędzi deweloperskich](https://raw.githubusercontent.com/vuejs/devtools/main/media/screenshot-shadow.png)

- [Dokumentacja](https://devtools.vuejs.org/)
- [Wtyczka dla Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Wtyczka dla Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Wtyczka dla Edge](https://microsoftedge.microsoft.com/addons/detail/vuejs-devtools/olofadcdnkkjdfgjcmjaadnlehnnihnl)
- [Samodzielna aplikacja w Electron](https://devtools.vuejs.org/guide/installation.html#standalone)

## TypeScript {#typescript}

Główny artykuł: [Używanie Vue z TypeScriptem](/guide/typescript/overview).

- [Wtyczka Vue - Official](https://github.com/vuejs/language-tools) dostarcza sprawdzanie typów w obrębie SFC przy użyciu bloków `<script lang="ts">`. Tyczy się to również wyrażeń w szablonach i walidacji props między komponentami.

- Użyj [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) aby przeprowadzić sprawdzenie typów z poziomu wiersza poleceń, albo by wygenerować pliki `d.ts` dla komponentów jednoplikowych.

## Testowanie {#testing}

Główny artykuł: [Poradnik Testowania](/guide/scaling-up/testing).

- [Cypress](https://www.cypress.io/) jest zalecanym narzędziem do testów E2E. Może być również użyty do testowania komponentów dla SFC poprzez [Cypress Component Test Runner](https://docs.cypress.io/guides/component-testing/introduction).

- [Vitest](https://vitest.dev/) jest test runnerem stworzonym przez zespół Vue / Vite, który skupia się na szybkości. Jest zaprojektowany dla aplikacji opierających się na Vite, aby dostarczyć taki sam błyskawiczny feedback zarówno podczas testów jednostkowych czy testów komponentów.

- [Jest](https://jestjs.io/) może również działać z Vite dzięki [vite-jest](https://github.com/sodatea/vite-jest). Jednakże, jest on jedynie zalecany jedynie gdy masz już istniejące zestawy testów opierające się na Jest, które chcesz zmigrować do setupu opierającego się o Vite. W innym wypadku Vite dostarcza bardzo podobne funkcjonalności i jest znacznie łatwiejszy w integracji.

## Linting {#linting}

Zespół Vue utrzymuje [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue), wtyczkę do [ESLint](https://eslint.org/) która wspiera zestaw zasad lintera dla SFC.

Użytkownicy korzystający uprzednio z Vue CLI mogą być przyzwyczajeni do konfigurowania linterów poprzez loadery webpacka. Jednakże, przy projekcie opierającym się o Vite, naszymi zalecaniami są:

1. `npm install -D eslint eslint-plugin-vue`, i dalej podążanie [poradnikiem konfiguracji](https://eslint.vuejs.org/user-guide/#usage) `eslint-plugin-vue`.

2. Konfiguracja ESLint w Twoim IDE, na przykład [ESLint dla VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), dzięki czemu feedback od lintera dostaniesz bezpośrednio w swoim edytorze podczas developmentu. Dodatkowo pomaga to ominąć dodatkowe koszta lintera występujące przy włączania dev serwera.

3. Uruchamianie ESLint jako część procesure budującego kod produkcyjny, tak aby otrzymać pełny feedback od lintera przed wypuszczaniem kodu na produkcję.

4. (Opcjonalnie) Konfiguracja narzędzi takich jak [lint-staged](https://github.com/okonet/lint-staged), aby automatycznie lintować zmodyfikowane pliki przy uruchamianiu poleceń gita.

## Formatowanie {#formatting}

- Wtyczka [Vue - Official](https://github.com/vuejs/language-tools) do VS Code dostarczana narzędzia formatowania kodu komponentów SFC.

- Alternatywnie, [Prettier](https://prettier.io/) również dostarcza wsparcie formatowania dla komponentów jednoplikowych.

## Integracja niestandardowych bloków SFC {#sfc-custom-block-integrations}

Niestandardowe bloki są kompilowane na importy do tego samego pliku Vue podczas różnych zapytań. To od narzędzia budującego kod zależy to jak zostaną obsłużone te importy.

- Jeśli używasz Vite, najlepiej stworzyć własny plugin Vite, aby obsłużyć niestandardowe bloki i zmienić je w wykonywalny kod JavaScript. [Przykład](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- Jeśli używasz Vue CLI, lub po prostu webpacka, własny loader może być skonfigurowany celem obsługi niestandardowych bloków. [Przykład](https://vue-loader.vuejs.org/guide/custom-blocks.html)

## Paczki niskiego poziomu {#lower-level-packages}

### `@vue/compiler-sfc` {#vue-compiler-sfc}

- [Dokumentacja](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

Ta paczka jest częścią głównego monorepo Vue i jest zawsze opublikowana z tą samą wersją co główna paczka `vue`. Jest załączona jako zależność głównej paczki `vue` i dostępna pod `vue/compiler-sfc`, więc nie musisz instalować jej osobno.

Paczka dostarcza różnego rodzaju narzędzia niskiego poziomu do procesowania komponentów SFC i jest przeznaczona dla autorów niestandardowych narzędzi, które wspierają komponenty jednoplikowe.

:::tip
Zawsze używaj tą paczkę poprzez import `vue/compiler-sfc` ponieważ zapewnia to używanie jej wersji zsynchronizowanej z runtime Vue.
:::

### `@vitejs/plugin-vue` {#vitejs-plugin-vue}

- [Dokumentacja](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)

Oficjalna wtyczka, która dostarcza wsparcie SFC w Vite.

### `vue-loader` {#vue-loader}

- [Dokumentacja](https://vue-loader.vuejs.org/)

Oficjalny loader zapewniający wsparcie SFC dla webpacka. Jeśli używasz Vue CLI, również zajrzyj do [dokumentacji odnośnie modyfikowania `vue-loader` w Vue CLI](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

## Inne piaskownice dostępne w sieci {#other-online-playgrounds}

- [Piaskownica VueUse](https://play.vueuse.org)
- [Vue + Vite on Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue w CodeSandbox](https://codesandbox.io/p/devbox/github/codesandbox/sandbox-templates/tree/main/vue-vite)
- [Vue w Codepen](https://codepen.io/pen/editor/vue)
- [Vue w Components.studio](https://components.studio/create/vue3)
- [Vue w WebComponents.dev](https://webcomponents.dev/create/cevue)

<!-- TODO ## Backend Framework Integrations -->
