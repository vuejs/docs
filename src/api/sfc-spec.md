# SFC Syntax Specification {#sfc-syntax-specification}

## Informacje ogólne {#overview}

Vue Single-File Component (SFC), konwencjonalnie używający rozszerzenia pliku `*.vue`, to niestandardowy format pliku, który wykorzystuje składnię podobną do HTML do opisu komponentu Vue. Vue SFC jest składniowo kompatybilny z HTML.

Każdy plik `*.vue` składa się z trzech typów bloków językowych najwyższego poziomu: `<template>`, `<script>` i `<style>` oraz opcjonalnie dodatkowych bloków niestandardowych:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>
```

## Bloki językowe {#language-blocks}

### `<template>` {#template}

- Każdy plik `*.vue` może zawierać co najwyżej jeden blok najwyższego poziomu `<template>`.

- Zawartość zostanie wyodrębniona i przekazana do `@vue/compiler-dom`, wstępnie skompilowana do funkcji renderowania JavaScript i dołączona do eksportowanego komponentu jako jego opcja `render`.

### `<script>` {#script}

- Każdy plik `*.vue` może zawierać co najwyżej jeden blok `<script>` (z wyłączeniem [`<script setup>`](/api/sfc-script-setup)).

- Skrypt jest wykonywany jako moduł ES.

- **Domyślnym eksportem** powinien być obiekt opcji komponentu Vue, albo jako zwykły obiekt, albo jako wartość zwrotna [defineComponent](/api/general#definecomponent).

### `<script setup>` {#script-setup}

- Każdy plik `*.vue` może zawierać co najwyżej jeden blok `<script setup>` (wyłączając normalny `<script>`).

- Skrypt jest wstępnie przetwarzany i używany jako funkcja `setup()` komponentu, co oznacza, że będzie wykonywany **dla każdej instancji komponentu**. Wiązania najwyższego poziomu w `<script setup>` są automatycznie eksponowane na szablon. Więcej szczegółów można znaleźć w [dedykowanej dokumentacji `<script setup>`](/api/sfc-script-setup).

### `<style>` {#style}

- Pojedynczy plik `*.vue` może zawierać wiele tagów `<style>`.

- Znacznik `<style>` może mieć atrybuty `scoped` lub `module` (zobacz [SFC Style Features](/api/sfc-css-features) po więcej szczegółów) by pomóc w enkapsulacji stylów do bieżącego komponentu. Wiele tagów `<style>` z różnymi trybami enkapsulacji może być mieszanych w tym samym komponencie.

### Bloki niestandardowe {#custom-blocks}

Dodatkowe niestandardowe bloki mogą być zawarte w pliku `*.vue` dla dowolnych potrzeb specyficznych dla projektu, na przykład blok `<docs>`. Niektóre rzeczywiste przykłady niestandardowych bloków obejmują:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#i18n-custom-block)

Obsługa bloków niestandardowych będzie zależeć od narzędzi - jeśli chcesz zbudować własne niestandardowe integracje bloków, zobacz sekcję [SFC custom block integrations tooling section] (/guide/scaling-up/tooling#sfc-custom-block-integrations), aby uzyskać więcej informacji.

## Automatyczne wnioskowanie o nazwach {#automatic-name-inference}

SFC automatycznie wywnioskuje nazwę komponentu z jego **nazwy pliku** w następujących przypadkach:

- Formatowanie ostrzeżeń dla deweloperów
- Inspekcja DevTools
- Rekursywne samoodniesienie, np. plik o nazwie `FooBar.vue` może odnosić się do siebie jako `<FooBar/>` w swoim szablonie. Ma to niższy priorytet niż jawnie zarejestrowane/zaimportowane komponenty.

## Pre-Processors {#pre-processors}

Bloki mogą deklarować języki preprocesora przy użyciu atrybutu `lang`. Najczęstszym przypadkiem jest użycie TypeScript dla bloku `<script>`:

```vue-html
<script lang="ts">
  // use TypeScript
</script>
```

`lang` można zastosować do dowolnego bloku - na przykład możemy użyć `<style>` z [Sass](https://sass-lang.com/) i `<template>` z [Pug](https://pugjs.org/api/getting-started.html):

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

Należy pamiętać, że integracja z różnymi preprocesorami może się różnić w zależności od łańcucha narzędzi. Przykłady można znaleźć w odpowiedniej dokumentacji:

- [Vite](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## `src` Imports {#src-imports}

Jeśli wolisz podzielić swoje komponenty `*.vue` na wiele plików, możesz użyć atrybutu `src` do zaimportowania zewnętrznego pliku dla bloku językowego:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

Należy pamiętać, że importy `src` są zgodne z tymi samymi zasadami rozwiązywania ścieżek, co żądania modułów webpack, co oznacza:

- Względne ścieżki muszą zaczynać się od `./`.
- Możesz importować zasoby z zależności npm:

```vue
<!-- importowanie pliku z zainstalowanego pakietu npm „todomvc-app-css” -->
<style src="todomvc-app-css/index.css" />
```

Import `src` działa również z niestandardowymi blokami, np:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

## Komentarze {#comments}

Wewnątrz każdego bloku należy użyć składni komentarza używanego języka (HTML, CSS, JavaScript, Pug itp.). W przypadku komentarzy najwyższego poziomu należy używać składni komentarzy HTML: `<!-- treść komentarza tutaj -->`.
