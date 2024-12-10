---
outline: deep
---

# Wydajność {#performance}

## Przegląd {#overview}

Vue jest zaprojektowane tak, aby działać wydajnie w większości typowych przypadków użycia bez konieczności ręcznej optymalizacji. Jednak zawsze zdarzają się trudne scenariusze, w których potrzebne jest dodatkowe dostrajanie. W tej sekcji omówimy, na co należy zwrócić uwagę, jeśli chodzi o wydajność w aplikacji Vue.

Najpierw omówmy dwa główne aspekty wydajności sieci:

- **Wydajność ładowania strony**: jak szybko aplikacja wyświetla zawartość i staje się interaktywna podczas pierwszej wizyty. Zwykle mierzy się to za pomocą wskaźników web vital, takich jak [Largest Contentful Paint (LCP)](https://web.dev/lcp/) i [First Input Delay (FID)](https://web.dev/fid/).

- **Wydajność aktualizacji**: jak szybko aplikacja aktualizuje się w odpowiedzi na dane wprowadzane przez użytkownika. Na przykład, jak szybko lista aktualizuje się, gdy użytkownik wpisuje dane w polu wyszukiwania lub jak szybko strona przełącza się, gdy użytkownik klika łącze nawigacyjne w aplikacji jednostronicowej (SPA).

Chociaż idealnie byłoby zmaksymalizować oba, różne architektury front-endu mają tendencję do wpływania na to, jak łatwo jest osiągnąć pożądaną wydajność w tych aspektach. Ponadto typ tworzonej aplikacji ma duży wpływ na to, co należy traktować priorytetowo pod względem wydajności. Dlatego pierwszym krokiem do zapewnienia optymalnej wydajności jest wybranie odpowiedniej architektury dla typu tworzonej aplikacji:

- Zapoznaj się ze [Sposobów korzystania z Vue](/guide/extras/ways-of-using-vue), aby dowiedzieć się, jak można wykorzystać Vue na różne sposoby.

- Jason Miller omawia typy aplikacji internetowych i ich odpowiednią idealną implementację/dostarczanie w [Application Holotypes](https://jasonformat.com/application-holotypes/).

## Opcje profilowania {#profiling-options}

Aby poprawić wydajność, musimy najpierw wiedzieć, jak ją mierzyć. Istnieje wiele świetnych narzędzi, które mogą w tym pomóc:

Do profilowania wydajności obciążenia wdrożeń produkcyjnych:

- [PageSpeed ​​Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

Do profilowania wydajności podczas lokalnego rozwoju:

- [Panel wydajności Chrome DevTools](https://developer.chrome.com/docs/devtools/evaluate-performance/)
- [`app.config.performance`](/api/application#app-config-performance) włącza specyficzne dla Vue znaczniki wydajności na osi czasu wydajności Chrome DevTools.
- [Rozszerzenie Vue DevTools](/guide/scaling-up/tooling#browser-devtools) również zapewnia funkcję profilowania wydajności.

## Optymalizacje ładowania strony {#page-load-optimizations}

Istnieje wiele aspektów niezależnych od frameworka, które optymalizują wydajność ładowania stron — sprawdź [ten przewodnik web.dev](https://web.dev/fast/), aby uzyskać kompleksowe podsumowanie. Tutaj skupimy się głównie na technikach specyficznych dla Vue.

### Wybór właściwej architektury {#choosing-the-right-architecture}

Jeśli Twój przypadek użycia jest wrażliwy na wydajność ładowania strony, unikaj wysyłania go jako czystego SPA po stronie klienta. Chcesz, aby Twój serwer bezpośrednio wysyłał HTML zawierający treść, którą użytkownicy chcą zobaczyć. Czyste renderowanie po stronie klienta cierpi z powodu długiego czasu do treści. Można to złagodzić za pomocą [Server-Side Rendering (SSR)](/guide/extras/ways-of-using-vue#fullstack-ssr) lub [Static Site Generation (SSG)](/guide/extras/ways-of-using-vue#jamstack-ssg). Zapoznaj się z [SSR Guide](/guide/scaling-up/ssr), aby dowiedzieć się, jak wykonywać SSR za pomocą Vue. Jeśli Twoja aplikacja nie ma rozbudowanych wymagań interaktywności, możesz również użyć tradycyjnego serwera zaplecza do renderowania HTML i ulepszania go za pomocą Vue na kliencie.

Jeśli Twoja główna aplikacja musi być SPA, ale ma strony marketingowe (strona docelowa, o nas, blog), wysyłaj je osobno! Twoje strony marketingowe najlepiej jest wdrażać w statycznym kodzie HTML z minimalną ilością kodu JavaScript, korzystając z SSG.

### Bundle size i tree-shaking {#bundle-size-and-tree-shaking}

Jednym z najskuteczniejszych sposobów na poprawę wydajności ładowania strony jest wysyłanie mniejszych pakietów JavaScript. Oto kilka sposobów na zmniejszenie rozmiaru pakietu podczas korzystania z Vue:

- Jeśli to możliwe, użyj kroku kompilacji.

- Wiele interfejsów API Vue jest ["tree-shakable"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), jeśli są pakowane za pomocą nowoczesnego narzędzia do kompilacji. Na przykład, jeśli nie używasz wbudowanego komponentu `<Transition>`, nie zostanie on uwzględniony w końcowym pakiecie produkcyjnym. Tree-shaking może również usunąć inne nieużywane moduły w kodzie źródłowym.

- Podczas korzystania z kroku kompilacji szablony są wstępnie kompilowane, więc nie musimy wysyłać kompilatora Vue do przeglądarki. Oszczędza to **14 kb** min + skompresowany kod JavaScript i unika kosztów kompilacji w czasie wykonywania.

- Zachowaj ostrożność co do rozmiaru podczas wprowadzania nowych zależności! W rzeczywistych zastosowaniach, rozdęte pakiety są najczęściej wynikiem wprowadzania ciężkich zależności bez zdawania sobie z tego sprawy.

- Jeśli używasz kroku kompilacji, preferuj zależności, które oferują formaty modułów ES i są przyjazne dla tree-shaking. Na przykład, preferuj `lodash-es` od `lodash`.

- Sprawdź rozmiar zależności i oceń, czy jest warta funkcjonalności, którą zapewnia. Zauważ, że jeśli zależność jest przyjazna dla tree-shaking, rzeczywisty wzrost rozmiaru będzie zależał od interfejsów API, które faktycznie z niej importujesz. Narzędzia takie jak [bundlejs.com](https://bundlejs.com/) mogą być używane do szybkich kontroli, ale pomiar z rzeczywistą konfiguracją kompilacji zawsze będzie najdokładniejszy.

- Jeśli używasz Vue głównie do progresywnego ulepszania i wolisz unikać kroku kompilacji, rozważ użycie [petite-vue](https://github.com/vuejs/petite-vue) (tylko **6 kb**).

### Podział kodu {#code-splitting}

Podział kodu polega na tym, że narzędzie do kompilacji dzieli pakiet aplikacji na wiele mniejszych fragmentów, które następnie mogą być ładowane na żądanie lub równolegle. Dzięki odpowiedniemu podziałowi kodu funkcje wymagane przy ładowaniu strony mogą być pobierane natychmiast, a dodatkowe fragmenty są ładowane leniwie tylko wtedy, gdy są potrzebne, co poprawia wydajność.

Bundlery takie jak Rollup (na którym opiera się Vite) lub webpack mogą automatycznie tworzyć podzielone fragmenty, wykrywając składnię dynamicznego importu ESM:

```js
// lazy.js i jego zależności zostaną podzielone na osobny fragment
// i załadowane tylko wtedy, gdy zostanie wywołane `loadLazy()`.
function loadLazy() {
  return import('./lazy.js')
}
```

Lazy loading najlepiej sprawdza się w przypadku funkcji, które nie są potrzebne od razu po pierwszym załadowaniu strony. W aplikacjach Vue można go używać w połączeniu z funkcją Vue [Async Component](/guide/components/async) w celu tworzenia podzielonych fragmentów dla drzew komponentów:

```js
import { defineAsyncComponent } from 'vue'

// tworzony jest osobny fragment dla Foo.vue i jego zależności.
// jest on pobierany tylko na żądanie, gdy komponent asynchroniczny jest
// renderowany na stronie.
const Foo = defineAsyncComponent(() => import('./Foo.vue'))
```

W przypadku aplikacji korzystających z Vue Router zdecydowanie zaleca się używanie lazy loading dla komponentów ścieżek. Vue Router ma wyraźne wsparcie dla lazy loading, oddzielne od `defineAsyncComponent`. Więcej szczegółów można znaleźć w [Lazy Loading Routes](https://router.vuejs.org/guide/advanced/lazy-loading.html).

## Optymalizacje aktualizacji {#update-optimizations}

### Stabilność props {#props-stability}

W Vue komponent dziecko aktualizuje się tylko wtedy, gdy co najmniej jeden z otrzymanych props uległ zmianie. Rozważmy następujący przykład:

```vue-html
<ListItem
  v-for="item in list"
  :id="item.id"
  :active-id="activeId" />
```

Wewnątrz komponentu `<ListItem>` używa on swoich właściwości `id` i `activeId`, aby określić, czy jest to aktualnie aktywny element. Chociaż to działa, problem polega na tym, że za każdym razem, gdy `activeId` ulega zmianie, **każdy** `<ListItem>` na liście musi zostać zaktualizowany!

W idealnym przypadku tylko elementy, których status aktywności uległ zmianie, powinny zostać zaktualizowane. Możemy to osiągnąć, przenosząc obliczenia statusu aktywności do elementu nadrzędnego i sprawiając, że `<ListItem>` bezpośrednio akceptuje właściwość `active`:

```vue-html
<ListItem
  v-for="item in list"
  :id="item.id"
  :active="item.id === activeId" />
```

Teraz dla większości komponentów prop `active` pozostanie takie samo, gdy zmieni się `activeId`, więc nie trzeba ich już aktualizować. Generalnie chodzi o to, aby propsy przekazywane do komponentów podrzędnych były jak najbardziej stabilne.

### `v-once` {#v-once}

`v-once` to wbudowana dyrektywa, której można użyć do renderowania treści, która opiera się na danych środowiska wykonawczego, ale nigdy nie musi być aktualizowana. Całe poddrzewo, w którym jest używana, zostanie pominięte w przypadku wszystkich przyszłych aktualizacji. Więcej szczegółów można znaleźć w [odniesieniu do API](/api/built-in-directives#v-once).

### `v-memo` {#v-memo}

`v-memo` to wbudowana dyrektywa, której można użyć do warunkowego pominięcia aktualizacji dużych poddrzew lub list `v-for`. Zapoznaj się z [odniesieniem do API](/api/built-in-directives#v-memo) w celu uzyskania szczegółowych informacji.

### Stabilność Computed Property <sup class="vt-badge" data-text="3.4+" /> {#computed-stability}

Od wersji 3.4 Computed Property będzie wyzwalać efekty tylko wtedy, gdy jej obliczona wartość zmieni się od poprzedniej. Na przykład, następujący `isEven` obliczony wyzwala efekty tylko wtedy, gdy zwrócona wartość zmieniła się z `true` na `false` lub odwrotnie:

```js
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // true

// nie spowoduje to wygenerowania nowych logów, ponieważ obliczona wartość pozostaje równa `true`
count.value = 2
count.value = 4
```

Zmniejsza to liczbę niepotrzebnych wyzwalaczy efektów, ale niestety nie działa, jeśli obliczeniowo tworzy się nowy obiekt przy każdym obliczeniu:

```js
const computedObj = computed(() => {
  return {
    isEven: count.value % 2 === 0
  }
})
```

Ponieważ za każdym razem tworzony jest nowy obiekt, nowa wartość technicznie zawsze różni się od starej wartości. Nawet jeśli właściwość `isEven` pozostaje taka sama, Vue nie będzie w stanie tego wiedzieć, dopóki nie przeprowadzi głębokiego porównania starej wartości i nowej wartości. Takie porównanie może być kosztowne i prawdopodobnie nieopłacalne.

Zamiast tego możemy to zoptymalizować, ręcznie porównując nową wartość ze starą wartością i warunkowo zwracając starą wartość, jeśli wiemy, że nic się nie zmieniło:

```js
const computedObj = computed((oldValue) => {
  const newValue = {
    isEven: count.value % 2 === 0
  }
  if (oldValue && oldValue.isEven === newValue.isEven) {
    return oldValue
  }
  return newValue
})
```

[Try it in the playground](https://play.vuejs.org/#eNqVVMtu2zAQ/JUFgSZK4UpuczMkow/40AJ9IC3aQ9mDIlG2EokUyKVt1PC/d0lKtoEminMQQC1nZ4c7S+7Yu66L11awGUtNoesOwQi03ZzLuu2URtiBFtUECtV2FkU5gU2OxWpRVaJA2EOlVQuXxHDJJZeFkgYJayVC5hKj6dUxLnzSjZXmV40rZfFrh3Vb/82xVrLH//5DCQNNKPkweNiNVFP+zBsrIJvDjksgGrRahjVAbRZrIWdBVLz2yBfwBrIsg6mD7LncPyryfIVnywupUmz68HOEEqqCI+XFBQzrOKR79MDdx66GCn1jhpQDZx8f0oZ+nBgdRVcH/aMuBt1xZ80qGvGvh/X6nlXwnGpPl6qsLLxTtitzFFTNl0oSN/79AKOCHHQuS5pw4XorbXsr9ImHZN7nHFdx1SilI78MeOJ7Ca+nbvgd+GgomQOv6CNjSQqXaRJuHd03+kHRdg3JoT+A3a7XsfcmpbcWkQS/LZq6uM84C8o5m4fFuOg0CemeOXXX2w2E6ylsgj2gTgeYio/f1l5UEqj+Z3yC7lGuNDlpApswNNTrql7Gd0ZJeqW8TZw5t+tGaMdDXnA2G4acs7xp1OaTj6G2YjLEi5Uo7h+I35mti3H2TQsj9Jp6etjDXC8Fhu3F9y9iS+vDZqtK2xB6ZPNGGNVYpzHA3ltZkuwTnFf70b+1tVz+MIstCmmGQzmh/p56PGf00H4YOfpR7nV8PTxubP8P2GAP9Q==)

Należy pamiętać, że zawsze należy wykonać pełne obliczenia przed porównaniem i zwróceniem starej wartości, tak aby przy każdym przebiegu można było zebrać te same zależności.

## Ogólne optymalizacje {#general-optimizations}

> Poniższe wskazówki dotyczą zarówno ładowania strony, jak i wydajności aktualizacji.

### Wirtualizacja dużych list {#virtualize-large-lists}

Jednym z najczęstszych problemów wydajnościowych we wszystkich aplikacjach front-end jest renderowanie dużych list. Niezależnie od tego, jak wydajny jest framework, renderowanie listy z tysiącami elementów **będzie** wolne ze względu na ogromną liczbę węzłów DOM, które przeglądarka musi obsłużyć.

Nie musimy jednak koniecznie renderować wszystkich tych węzłów z góry. W większości przypadków rozmiar ekranu użytkownika może wyświetlić tylko mały podzbiór naszej dużej listy. Możemy znacznie poprawić wydajność dzięki **wirtualizacji listy**, technice renderowania tylko elementów, które są obecnie w lub blisko obszaru widoku na dużej liście.

Implementacja wirtualizacji listy nie jest łatwa, na szczęście istnieją biblioteki zbudowane przez społeczność, których możesz bezpośrednio używać:

- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [vue-virtual-scroll-grid](https://github.com/rocwang/vue-virtual-scroll-grid)
- [vueuc/VVirtualList](https://github.com/07akioni/vueuc)

### Zmniejsz obciążenie reaktywności dla dużych niezmiennych struktur {#reduce-reactivity-overhead-for-large-immutable-structures}

System reaktywności Vue jest domyślnie głęboki. Chociaż dzięki temu zarządzanie stanem jest intuicyjne, to jednak tworzy pewien poziom narzutu, gdy rozmiar danych jest duży, ponieważ każdy dostęp do właściwości uruchamia pułapki proxy, które wykonują śledzenie zależności. Zwykle staje się to zauważalne w przypadku dużych tablic głęboko zagnieżdżonych obiektów, gdzie pojedyncze renderowanie wymaga dostępu do ponad 100 000 właściwości, więc powinno to dotyczyć tylko bardzo specyficznych przypadków użycia.

Vue zapewnia wyjście awaryjne, aby zrezygnować z głębokiej reaktywności, używając [`shallowRef()`](/api/reactivity-advanced#shallowref) i [`shallowReactive()`](/api/reactivity-advanced#shallowreactive). Płytkie interfejsy API tworzą stan, który jest reaktywny tylko na poziomie głównym i udostępnia wszystkie zagnieżdżone obiekty w stanie nienaruszonym. Dzięki temu dostęp do zagnieżdżonych właściwości jest szybki, a kompromisem jest to, że musimy teraz traktować wszystkie zagnieżdżone obiekty jako niezmienne, a aktualizacje mogą być wyzwalane tylko przez zastąpienie stanu głównego:

```js
const shallowArray = shallowRef([
  /* długa lista głębokich obiektów */
])

// to nie spowoduje aktualizacji...
shallowArray.value.push(newObject)
// to spowoduje:
shallowArray.value = [...shallowArray.value, newObject]

// to nie spowoduje aktualizacji..
shallowArray.value[0].foo = 1
// to spowoduje:
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]
```

### Unikaj niepotrzebnych abstrakcji komponentów {#avoid-unnecessary-component-abstractions}

Czasami możemy tworzyć [komponenty bez renderowania](/guide/components/slots#renderless-components) lub komponenty wyższego rzędu (tj. komponenty, które renderują inne komponenty z dodatkowymi rekwizytami) w celu lepszej abstrakcji lub organizacji kodu. Chociaż nie ma w tym nic złego, należy pamiętać, że wystąpienia komponentów są znacznie droższe niż zwykłe węzły DOM, a utworzenie ich zbyt wielu z powodu wzorców abstrakcji spowoduje koszty wydajności.

Należy pamiętać, że zmniejszenie tylko kilku wystąpień nie będzie miało zauważalnego efektu, więc nie przejmuj się, jeśli komponent jest renderowany tylko kilka razy w aplikacji. Najlepszym scenariuszem do rozważenia tej optymalizacji są ponownie duże listy. Wyobraź sobie listę 100 elementów, gdzie każdy komponent elementu zawiera wiele komponentów podrzędnych. Usunięcie tutaj jednej niepotrzebnej abstrakcji komponentu może skutkować zmniejszeniem setek wystąpień komponentu.
