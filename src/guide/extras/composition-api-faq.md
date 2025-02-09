---
outline: deep
---

# Composition API - często zadawane pytania {#composition-api-faq}

:::tip
Te często zadawane pytania zakładają wcześniejsze doświadczenia z Vue, a szczególnie doświadczenie z Vue 2 z użyciem głównie Options API.
:::

## Czym jest Composition API? {#what-is-composition-api}

<VueSchoolLink href="https://vueschool.io/lessons/introduction-to-the-vue-js-3-composition-api" title="Darmowa lekcja o Composition API"/>

Composition API to zestaw API umożliwiających tworzenie komponentów Vue przy użyciu importowanych funkcji zamiast deklarowania opcji. Jest to termin zbiorczy obejmujący następujące API:

- [Api reaktywności](/api/reactivity-core), np. `ref()` i `reactive()`, które pozwalają na tworzenie reaktywnego stanu, stanu obliczanego i obserwatorów.

- [Haki cyklu życia](/api/composition-api-lifecycle), np. `onMounted()` i `onUnmounted()`, które pozwalają na programowe podłączanie się do cyklu życia komponentu.

- [Wstrzykiwanie zależności](/api/composition-api-dependency-injection), np. `provide()` i `inject()`, które umożliwiają korzystanie z systemu wstrzykiwania z użyciem API reaktywności.

Composition API to wbudowana funkcja Vue 3 oraz [Vue 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html). Dla starszych wersji Vue 2, można korzystać z oficjalnie utrzymywanej wtyczki [`@vue/composition-api`](https://github.com/vuejs/composition-api). W Vue 3 Composition API jest często używane razem ze składnią [`<script setup>`](/api/sfc-script-setup) w komponentach jednoplikowych. Oto podstawowy przykład komponentu korzystającego z Composition API:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// stan reaktywny
const count = ref(0)

// funkcje modyfikujące stan i wyzwaląjące aktualizacje
function increment() {
  count.value++
}

// haki cyklu życia
onMounted(() => {
  console.log(`Początkowa wartość licznika to ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Wartość licznika to: {{ count }}</button>
</template>
```

Pomimo, że styl API bazuje na kompozycji funkcji **Composition API NIE jest programowaniem funkcyjnym**. Composition API opiera się na mutowalnym, szczegółowym modelu reaktywności Vue, podczas gdy programowanie funkcyjne kładzie nacisk na niemutowalność.

Jeśli jesteś zainteresowany nauczeniem się korzystania z Vue przy użyciu Composition API, możesz ustawić preferencje do Composition API dla całej witryny używając przełącznika na górze lewego paska bocznego, a następnie przestudiować przewodnik od początku.

## Dlaczego Composition API? {#why-composition-api}

### Lepsza reużywalność logiki {#better-logic-reuse}

Podstawowa zaletą Composition API jest to, że umożliwa czyste, efektywne reużywanie logiki w formie [Composable functions](/guide/reusability/composables). Rozwiązuje to [wszystkie wady mixinów](/guide/reusability/composables#vs-mixins), czyli głównego mechanizmu reużywania logiki w Options API.

Możliwości reużywania logiki Composition API umożliwiły rozwój imponujących projektów tworzonych przez społeczność takich jak [VueUse](https://vueuse.org/), czyli stale rosnąca kolekcja narzędzi kompozycyjnych. API to jest także doskonałym mechanizmem do łatwego integrowania z system reaktywności Vue, np. [niemutowalnymi danymi](/guide/extras/reactivity-in-depth#immutable-data), [maszynami stanowymi](/guide/extras/reactivity-in-depth#state-machines), czy [RxJS](/guide/extras/reactivity-in-depth#rxjs).

### Bardziej elastyczna organizacja kodu {#more-flexible-code-organization}

Wielu użytkowników chwali sobie możliwość pisania uporządkowanego kodu dzięki Options API: wszystko ma swoje miejsce w zależności od opcji, do której należy. Jednak Options API ma poważne ogranicznia, gdy logika pojedynczego komoponentu rozrasta się i przekracza pewien próg złożoności. To ograniczenie jest szczególnie widoczne w komponentach, kótr muszą obsługiwać wiele **aspektów logicznych**, co wielokrotnie obserwowaliśmy w wielu produkcyjnych aplikacjach Vue 2.

Weźmy na przykład komponent eksploratora folderów w interfejsie graficznym Vue: ten komponent jest odpowiedzialny za następujące aspekty logiczne:

- Handling folder navigation (opening, closing, refreshing...)
- Handling new folder creation
- Toggling show favorite folders only
- Toggling show hidden folders
- Handling current working directory changes -->

- Śledzenie bieżącego stanu folderu i wyświetlanie jego zawartości
- Obsługę nawigacji po folderach (otwieranie, zamykanie, odświeżanie...)
- Obsługę tworzenia nowych folderów
- Przełączanie wyświetlania jedynie ulubioncych folderów
- Przełączanie wyświetlania ukrytych folderów
- Obsługę zmian bieżacego katalogu roboczego

[Oryginalna wersja](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404) tego komponentu była napisana z użyciem Options API. Jeśli pokolorujemy każdą linikę kodu zależnie od aspektu logicznego, którym się zajmuje, wygląda to tak:

<img alt="folder component before" src="./images/options-api.png" width="129" height="500" style="margin: 1.2em auto">

Zwróć uwagę, że kod dotyczący tego samego aspektu logicznego musi zostać podzielony na różne opcje, znajdujące się w innych częściach pliku. W komponencie, posiadającym kilkaset linii kodu zrozumienie i nawigowanie w ramach jednego aspektu logicznego wymaga ciągłego przewijania pliku w górę i w dół, czyniąc to znacznie trudniejszym, niż powinno być. Ponadto, jeśli kiedykolwiek zamierzamy wydzielić aspekt logiczny w narzędzie wielokrotnego użytku, znalezienie odpowiednich fragmentów kodu z różnych części pliku wymaga sporej ilości pracy.

Oto ten sam komponent przed i po [refaktoryzacji do Composition API](https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e):

![komponent folderu po](./images/composition-api-after.png)

Zwróć uwagę, że kod dotyczący tego samego aspektu logicznego można teraz pogrupować w jednym miejscu: nie musimy już skakać pomiędzy różnymi blokami opcji, kiedy pracujemy nad konkretnym problemem logicznym. Co więcej, możemy teraz łatwo przenieść fragment kodu do istniejącego pliku, ponieważ nie musimy już przewijać kodu, aby je wyodrębnić.Zmniejszenie tarcia podczas refaktoryzacji jest kluczowe dla długoterminowej utrzymalności w dużych bazach kodu.

### Lepsze wnioskowanie typów {#better-type-inference}

W ostatnich latach coraz więej programistów frontendowych przyjmuje [TypeScript](https://www.typescriptlang.org/), ponieważ pomaga on pisać bardziej niezawodny kod, wprowadzać zmiany z większą pewnością i zapewnia doskonałe doświadczenia w pracy poprzez wsparcie IDE. Jednak Options API, pierwotnie opracowane w 2013 roku, nie uwzględniało wnioskowania typów.
Musieliśmy zaimplementować pewne [absurdalnie skomplikowane akrobacje typów](https://github.com/vuejs/core/blob/44b95276f5c086e1d88fa3c686a5f39eb5bb7821/packages/runtime-core/src/), by umożliwić wnioskowanie typów dla Options API. Pomimo tych wysiłków wioskowanie typów dla Options API może nadal zawodzić dla mixinów i wstrzykiwania zależności.

To skłoniło wielu programistów, którzy chcieli używać Vue z TS, do wyboru API klasowego (Class API) napędzanego `vue-class-component`. Jednak oparte na klasach API w dużym stopniu polega na dekoratorach ES, funkcji językowej, która była jednynie propozycją w drugim stadium, kiedy Vue @ było rozwijane w 2019 roku. Czuliśmy, że to zbyr ryzykowne, by opierać oficjalne API na niestabilnej propozycji. Od tego czasu propozycja dekoratorów przeszła kolejną kompletną przebudowę i ostatecznie osiągneła trzecie stadnium w 2022 roku. Dodatkowo, API oparte na klasach ma ograniczenia związane z ponownym wykorzystaniem logiki i organizacją, podobne do tych w Options API.

Dla porównania, Composition API wykorzystuje głównie zwykłe zmienne i funkcje, które są naturalnie przyjazdne dla typów. Kod napisany w Composition API może korzystać z pełnego wnioskowania typów, przy minimalnym zapotrzebowaniu na ręczne adnotacje typów. W większości przypadków kod napisany w Composition API bę∂zie wyglądał bardzo podobnie w TypeScript i w czystym JavaScript. Dzięki temu użytkowanicy czystego JavaScriptu mogą korzystać również z częściowego wnioskowania typów.

### Mniejszy rozmiar produkcyjnej paczki i mniejszy overhead {#smaller-production-bundle-and-less-overhead}

Kod napisany w Composition API i `<script setup>` jest także bardziej wydajny i przyjazny dla minifikacji niż odpowiedniki w Options API. Dzieje się tak dlatego, że szablon w komponencie `<script setup>` jest kompilowany jako funkcja osadzona w tym samym zakresie co kod `<script setup>`. W przeciwieństwie do dostępu do właściwości za pomocą słowa kluczowego this, skompilowany kod szablonu może bezpośrednio odwoływać się do zmiennych zadeklarowanych wewnątrz `<script setup>`, bez pośredniczącej instancji proxy. To również prowadzi do lepszej minifikacji, ponieważ wszystkie nazwy zmiennych mogą być bezpiecznie skracane.

## Relacja z Options API {#relationship-with-options-api}

### Kompromisy {#trade-offs}

Niektórzy użytkownicy przechodzący z Options API uznali, że ich kod napisany w Composition API jest mniej uporządkowany, co prowadzi do wniosku, że Composition API jest "gorsze" pod względem organizacji kodu. Zalecamy jednak spojrzeć na ten problem z innej perspektywy.

To prawda, że Composition API nie narzuca "barier ochronnych",które pomogłyby Ci umieścić kod w odpowiednich grupach. W zamian umożliwia pisanie kodu komponentów w sposób podobny do pisania zwykłego kodu JavaScript. Oznacza to, że **można i należy stosować najlepsze praktyki organizacji kodu JavaScript również w Composition API**. Jeśli potrafisz pisać dobrze zorganizowany kod JavaScript, to również powinieneś być w stanie pisać dobrze zorganizowany kod w Composition API.

Options API pozwala "mniej myśleć" podczas pisania komponentów, co sprawia, że wielu użytkowników je lubi. Jednak w zamian za zmniejszenie obciążenia umysłowego, API to narzuca sztywny wzorzec organizacji kodu, bez możliwości odstępstwa, co może utrudnić refaktoryzację lub poprawę jakości kodu w większych projektach. Pod tym względem Composition API oferuje lepszą skalowalność w dłuższym okresie czasu.

### Czy Composition API pokrywa wszystkie przypadki użycia?{#does-composition-api-cover-all-use-cases}

Tak, jeśli chodzi o logikę związaną ze stanem (stateful logic). Przy korzystaniu z Composition API jedynymi opcjami, które mogą nadal być potrzebne, są: `props`, `emits`, `name`, i `inheritAttrs`.

:::tip

Od wersji 3.3 można bezpośrednio używać `defineOptions` w `<script setup>`, by ustawić nazwę komponentu lub właściwość `inheritAttrs`.
:::

If you intend to exclusively use Composition API (along with the options listed above), you can shave a few kbs off your production bundle via a [compile-time flag](/api/compile-time-flags) that drops Options API related code from Vue. Note this also affects Vue components in your dependencies. -->

Jeśli zamierzasz korzystać wyłącznie z Composition API (wraz z wymienionymi opcjami), możesz zmniejszyć rozmiar pliku produkcyjnego o kilka KB, używając [flagi kompilacyjnej](/api/compile-time-flags), która usuwa kod związany z Options API z Vue. Warto jednak pamiętać, że wpłynie to również na komponenty Vue w Twoich zależnościach.

### Czy mogę używać obu API w tym samym komponencie? {#can-i-use-both-apis-in-the-same-component}

Tak. Można używać Composition API za pomocą opcji [`setup()`](/api/composition-api-setup) w komponencie napisanym w Options API.

Zalecamy jednak skorzystanie z tej opcji tylko wtedy, gdy posiadasz istniejącą bazę kodu interfejsu API opcji, która wymaga integracji z nowymi funkcjami/bibliotekami zewnętrznymi napisanymi przy użyciu interfejsu Composition API.

### Czy Options API zostanie wycofane? {#will-options-api-be-deprecated}

Nie, nie mamy takich planów. Options API jest integralną częścią Vue i powodem, dla którego wielu programistów go uwielbia. Zdajemy sobie również sprawę, że wiele zalet Composition API ujawnia się dopiero w większych projektach, a Options API nadal pozostaje solidnym wyborem dla wielu przypadków o niskiej i średniej złożoności.

## Relacja z Class API {#relationship-with-class-api}

Nie zalecamy już używania Class API w Vue 3, ponieważ Composition API zapewnia doskonałą integrację z TypeScript oraz dodatkowe korzyści związane z ponownym użyciem logiki i organizacją kodu.

## Porównanie z React Hooks {#comparison-with-react-hooks}

Composition API oferuje ten sam poziom kompozycji logiki co React Hooks, ale z kilkoma istotnymi różnicami.

React Hooks są wywoływane wielokrotnie przy każdej aktualizacji komponentu. Powoduje to szereg problemów, które mogą wprowadzać w błąd nawet doświadczonych programistów Reacta i prowadzić do problemów z optymalizacją wydajności. Oto kilka przykładów:

- Hooks są zależne od kolejności wywołania i nie mogą być używane warunkowo.

- Zmienne zadeklarowane w komponencie Reacta mogą zostać przechwycone przez hak zamknięcia (closure) i stać się "nieaktualne", jeśli programista nie poda poprawnej tablicy zależności. To prowadzi do tego, że programiści React polegają na regułach ESLint, aby zapewnić przekazanie prawidłowych zależności. Jednak reguła często nie jest wystarczająco inteligentna i nadmiernie kompensuje poprawność, co prowadzi do niepotrzebnych unieważnień i probleowm, gdy napotykane są przypadki brzegowe.

- Złożone obliczenia wymagają użycia `useMemo`, co z kolei wymaga ręcznego przekazania prawidłowej tablicy zależności.

- Handlery zdarzeń przekazywane do komponentów podrzędnych domyślnie powodują niepotrzebne aktualizacje komponentów podrzędnyc i wymagają jawnego `useCallback` jako optymalizacji. Jest to prawie zawsze potrzebne i ponownie wymaga poprawnej tablicy zależności. Zaniedbanie tego prowadzi do domyślnego nadmiernego renderowania aplikacji i może powodować problemy z wydajnością bez zdawania sobie z tego sprawy.

- Problem nieaktualnych zamknięć (stale closures), w połączeniu z funkcjami współbieżnymi (Concurrent features), utrudnia przewidywanie, kiedy kod haka zostanie uruchomiony, a także sprawia, że ​​praca ze zmiennym stanem, który powinien być zachowywany między renderowaniami (za pośrednictwem `useRef`), staje się uciążliwa.

> Uwaga: Niektóre z powyższych problemów, związanych z pamięcią podręczną (memoization), mogą zostać rozwiązane przez nadchodzący [React Compiler](https://react.dev/learn/react-compiler).

W porównaniu do tego, Vue Composition API:

- Wywołuje `setup()` lub `<script setup>` tylko raz. Dzięki temu kod lepiej pasuje do intuicjyjnego idiomatycznego użycia JavaScript, ponieważ nie trzeba się martwić o nieaktualne zamknięcia. Wywołania interfejsu Composition API nie są również wrażliwe na kolejność wywołań i mogą być warunkowe.

- System reaktywności środowiska wykonawczego Vue automatycznie zbiera reaktywne zależności używane we właściwościach obliczeniowych i obserwatorach, dzięki czemu nie ma potrzeby ręcznego deklarowania zależności.

- Nie ma potrzeby ręcznego buforowania funkcji wywołania zwrotnego, aby uniknąć niepotrzebnych aktualizacji komponentów podrzędnych. Ogólnie rzecz biorąc, szczegółowy system reaktywności Vue zapewnia, że ​​komponenty potomne są aktualizowane tylko wtedy, gdy jest to konieczne. Ręczne optymalizacje aktualizacji potomnych rzadko stanowią problem dla programistów Vue.

Doceniamy kreatywność React Hooks i jest to główne źródło inspiracji dla Composition API. Jednak problemy wymienione powyżej są w nich obecne i zauważyliśmy, że model reaktywności Vue zapewnia sposób na ich obejście.
