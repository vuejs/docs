# Funkcje kompozycyjne (Composables) {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip
Ta sekcja zakłada podstawową wiedzę na temat Composition API. Jeśli uczyłeś się Vue tylko z Options API, możesz ustawić API Preference na Composition API (używając przełącznika u góry lewego paska bocznego) i ponownie przeczytać rozdziały [Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals) i [Lifecycle Hooks](/guide/essentials/lifecycle).
:::

## Czym jest funkcja kompozycyjna "Composable"? {#what-is-a-composable}

W kontekście aplikacji Vue „composable” to funkcja wykorzystująca interfejs API kompozycji Vue do enkapsulacji i ponownego użycia **logiki stanowej**.

Podczas tworzenia aplikacji front-endowych często musimy ponownie użyć logiki do typowych zadań. Na przykład możemy potrzebować sformatować daty w wielu miejscach, więc wyodrębniamy w tym celu funkcję wielokrotnego użytku. Ta funkcja formatera enkapsuluje **logikę bezstanową**: pobiera pewne dane wejściowe i natychmiast zwraca oczekiwane dane wyjściowe. Istnieje wiele bibliotek do ponownego użycia logiki bezstanowej — na przykład [lodash](https://lodash.com/) i [date-fns](https://date-fns.org/), o których być może słyszałeś.

Natomiast logika stanowa obejmuje zarządzanie stanem, który zmienia się w czasie. Prostym przykładem byłoby śledzenie bieżącej pozycji myszy na stronie. W rzeczywistych scenariuszach może to być również bardziej złożona logika, taka jak gesty dotykowe lub stan połączenia z bazą danych.

## Przykład funkcji śledzącej połozenie myszki {#mouse-tracker-example}

Gdybyśmy chcieli zaimplementować funkcjonalność śledzenia myszy bezpośrednio w komponencie za pomocą interfejsu API kompozycji, wyglądałoby to następująco:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Pozycja myszyki to: {{ x }}, {{ y }}</template>
```

Ale co, jeśli chcemy ponownie wykorzystać tę samą logikę w wielu komponentach? Możemy wyodrębnić logikę do pliku zewnętrznego, jako funkcję kompozycyjną:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// zgodnie z konwencją nazwy funkcje kompozycyjne zaczynają się od „use”
export function useMouse() {
  // stan kapsułkowany i zarządzany przez kompozycję
  const x = ref(0)
  const y = ref(0)

  // obiekt kompozycyjny może z czasem aktualizować swój zarządzany stan.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // obiekt kompozycyjny może również zostać podłączony do komponentu właściciela
  // cykl życia, konfiguracja i demontaż – efekty uboczne.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // udostępnij zarządzany stan jako wartość zwracaną
  return { x, y }
}
```

A oto jak można go wykorzystać w komponentach:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Pozycja myszki to: {{ x }}, {{ y }}</template>
```

<div class="demo">
  Pozycja myszki to: {{ x }}, {{ y }}
</div>

[Wypróbuj interaktywne demo](https://play.vuejs.org/#eNqNkj1rwzAQhv/KocUOGKVzSAIdurVjoQUvJj4XlfgkJNmxMfrvPcmJkkKHLrbu69H7SlrEszFyHFDsxN6drDIeHPrBHGtSvdHWwwKDwzfNHwjQWd1DIbd9jOW3K2qq6aTJxb6pgpl7Dnmg3NS0365YBnLgsTfnxiNHACvUaKe80gTKQeN3sDAIQqjignEhIvKYqMRta1acFVrsKtDEQPLYxuU7cV8Msmg2mdTilIa6gU5p27tYWKKq1c3ENphaPrGFW25+yMXsHWFaFlfiiOSvFIBJjs15QJ5JeWmaL/xYS/Mfpc9YYrPxl52ULOpwhIuiVl9k07Yvsf9VOY+EtizSWfR6xKK6itgkvQ/+fyNs6v4XJXIsPwVL+WprCiL8AEUxw5s=)

Jak widać, podstawowa logika pozostaje taka sama — musieliśmy tylko przenieść ją do funkcji zewnętrznej i zwrócić stan, który powinien zostać ujawniony. Podobnie jak w komponencie, możesz używać pełnego zakresu [funkcji API kompozycji](/api/#composition-api) w obiektach kompozycyjnych. Ta sama funkcjonalność `useMouse()` może być teraz używana w dowolnym komponencie.

Najfajniejszą częścią obiektów kompozycyjnych jest to, że można je również zagnieżdżać: jedna funkcja kompozycyjna może wywołać jedną lub więcej innych funkcji kompozycyjnych. Umożliwia nam to komponowanie złożonej logiki przy użyciu małych, izolowanych jednostek, podobnie jak komponowanie całej aplikacji przy użyciu komponentów. W rzeczywistości dlatego zdecydowaliśmy się wywołać zbiór interfejsów API, które umożliwiają ten wzorzec, za pomocą interfejsu API kompozycji.

Na przykład możemy wyodrębnić logikę dodawania i usuwania nasłuchiwacza zdarzeń DOM do jego własnego obiektu kompozycyjnego:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // jeśli chcesz, możesz też to zrobić
  // obsługa ciągów selektorów jako celu
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

A teraz naszą funkcje kompozycyjną `useMouse()` można uprościć do:

```js{3,9-12}
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip
Każda instancja komponentu wywołująca `useMouse()` utworzy własne kopie stanu `x` i `y`, dzięki czemu nie będą one kolidować ze sobą. Jeśli chcesz zarządzać współdzielonym stanem między komponentami, przeczytaj rozdział [Zarządzanie stanem](/guide/scaling-up/state-management).
:::

## Przykład asynchronicznego stanu {#async-state-example}

Composable `useMouse()` nie przyjmuje żadnych argumentów, więc przyjrzyjmy się innemu przykładowi, który z nich korzysta. Podczas asynchronicznego pobierania danych często musimy obsługiwać różne stany: ładowanie, powodzenie i błąd:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Ups! Natrafiliśmy na błąd: {{ error.message }}</div>
  <div v-else-if="data">
    Dane załadowane:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Ładowanie...</div>
</template>
```

Byłoby żmudne powtarzanie tego wzorca w każdym komponencie, który musi pobierać dane. Wyodrębnijmy go do composable:

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

Teraz w naszym komponencie możemy po prostu zrobić:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

### Przyjmowanie reaktywnego stanu {#accepting-reactive-state}

`useFetch()` przyjmuje statyczny ciąg URL jako dane wejściowe - więc wykonuje pobieranie tylko raz i jest gotowe. Co jeśli chcemy, aby pobieranie było wykonywane ponownie za każdym razem, gdy URL się zmienia? Aby to osiągnąć, musimy przekazać stan reaktywny do funkcji composable i pozwolić funkcji composable tworzyć obserwatorów, którzy wykonują akcje przy użyciu przekazanego stanu.

Na przykład `useFetch()` powinno być w stanie zaakceptować ref:

```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// powinno to spowodować ponowne pobranie
url.value = '/new-url'
```

Lub zaakceptuj [funkcję gettera](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description):

```js
// pobierz ponownie, gdy props.id ulegnie zmianie
const { data, error } = useFetch(() => `/posts/${props.id}`)
```

Możemy przebudować naszą obecną implementację za pomocą interfejsów API [`watchEffect()`](/api/reactivity-core.html#watcheffect) i [`toValue()`](/api/reactivity-utilities.html#tovalue):

```js{8,13}
// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // zresetuj stan przed pobraniem..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```

`toValue()` to API dodane w wersji 3.3. Zostało zaprojektowane w celu normalizacji odwołań lub getterów do wartości. Jeśli argument jest odwołaniem, zwraca wartość odwołania; jeśli argument jest funkcją, wywoła funkcję i zwróci jej wartość zwracaną. W przeciwnym razie zwraca argument taki, jaki jest. Działa podobnie do [`unref()`](/api/reactivity-utilities.html#unref), ale ze specjalnym traktowaniem funkcji.

Należy zauważyć, że `toValue(url)` jest wywoływane **wewnątrz** wywołania zwrotnego `watchEffect`. Zapewnia to, że wszelkie reaktywne zależności dostępne podczas normalizacji `toValue()` są śledzone przez obserwatora.

Ta wersja `useFetch()` akceptuje teraz statyczne ciągi URL, odwołania i gettery, co czyni ją znacznie bardziej elastyczną. Efekt obserwatora zostanie uruchomiony natychmiast i będzie śledził wszelkie zależności dostępne podczas `toValue(url)`. Jeśli nie są śledzone żadne zależności (np. adres url jest już ciągiem znaków), efekt zostanie uruchomiony tylko raz; w przeciwnym razie zostanie uruchomiony ponownie przy każdej zmianie śledzonej zależności.

Tutaj znajduje się [zaktualizowany przykład `useFetch()`](https://play.vuejs.org/#eNp9Vdtu20YQ/ZUpUUA0qpAOjL4YktCbC7Rom8BN8sSHrMihtfZql9iLZEHgv2dml6SpxMiDIWkuZ+acmR2fs1+7rjgEzG6zlaut7Dw49KHbVFruO2M9nMFiu4Ta7LvgsYEeWmv2sKCkxSwoOPwTfb2b/EU5mopHR5GVro12HrbC4UerYA2Lnfeduy3LR2d0p0SNO6MatIU/dbI2DRZUtPSmMa4kgJQuG8qkjvLF28XVaAwRb2wxz69gvZkK/UQ5xUGogBQ/ZpyhEV4sAa01lnpeTwRyApsFWvT2RO6Eea40THBMgfq6NLwlS1/pVZnUJB3ph8c98fNIvwD+MaKBzkQut2xYbYP3RsPhTWvsusokSA0/Vxn8UitZP7GFSX/+8Sz7z1W2OZ9BQt+vypQXS1R+1cgDQciW4iMrimR0wu8270znfoC7SBaJWdAeLTa3QFgxuNijc+IBIy5PPyYOjU19RDEI954/Z/UptKTy6VvqA5XD1AwLTTl/0Aco4s5lV51F5sG+VJJ+v4qxYbmkfiiKYvSvyknPbJnNtoyW+HJpj4Icd22LtV+CN5/ikC4XuNL4HFPaoGsvie3FIqSJp1WIzabl00HxkoyetEVfufhv1kAu3EnX8z0CKEtKofcGzhMb2CItAELL1SPlFMV1pwVj+GROc/vWPoc26oDgdxhfSArlLnbWaBOcOoEzIP3CgbeifqLXLRyICaDBDnVD+3KC7emCSyQ4sifspOx61Hh4Qy/d8BsaOEdkYb1sZS2FoiJKnIC6FbqhsaTVZfk8gDgK6cHLPZowFGUzAQTNWl/BUSrFbzRYHXmSdeAp28RMsI0fyFDaUJg9Spd0SbERZcvZDBRleCPdQMCPh8ARwdRRnBCTjGz5WkT0i0GlSMqixTR6VKyHmmWEHIfV+naSOETyRx8vEYwMv7pa8dJU+hU9Kz2t86ReqjcgaTzCe3oGpEOeD4uyJOcjTXe+obScHwaAi82lo9dC/q/wuyINjrwbuC5uZrS4WAQeyTN9ftOXIVwy537iecoX92kR4q/F1UvqIMsSbq6vo5XF6ekCeEcTauVDFJpuQESvMv53IBXadx3r4KqMrt0w0kwoZY5/R5u3AZejvd5h/fSK/dE9s63K3vN7tQesssnnhX1An9x3//+Hz/R9cu5NExRFf8d5zyIF7jGF/RZ0Q23P4mK3f8XLRmfhg7t79qjdSIobjXLE+Cqju/b7d6i/tHtT3MQ8VrH/Ahstp5A=), ze sztucznym opóźnieniem i losowym błędem w celach demonstracyjnych.

## Konwencje i najlepsze praktyki {#conventions-and-best-practices}

### Nazewnictwo {#naming}

Przyjętą konwencją jest nazywanie funkcji kompozycyjnych za pomocą nazw camelCase rozpoczynających się od „use”.

### Argumenty {#input-arguments}

Obiekt composable może akceptować argumenty ref lub getter, nawet jeśli nie polega na nich w kwestii reaktywności. Jeśli piszesz obiekt composable, który może być używany przez innych programistów, dobrym pomysłem jest obsługa przypadku, gdy argumenty wejściowe są ref lub getterami zamiast surowych wartości. Funkcja pomocnicza [`toValue()`](/api/reactivity-utilities#tovalue) przyda się w tym celu:

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // Jeśli maybeRefOrGetter jest referencją lub getterem,
  // zostanie zwrócona jego znormalizowana wartość.
  // W przeciwnym razie zostanie zwrócona w stanie takim, w jakim jest.
  const value = toValue(maybeRefOrGetter)
}
```

Jeśli obiekt kompozycyjny tworzy reaktywne efekty, gdy dane wejściowe są referencją lub getterem, upewnij się, że jawnie obserwujesz referencję/getter za pomocą `watch()` lub wywołujesz `toValue()` wewnątrz `watchEffect()`, aby był on prawidłowo śledzony.

Omówiona wcześniej [implementacja useFetch()](#accepting-reactive-state) dostarcza konkretnego przykładu obiektu kompozycyjnego, który akceptuje referencje, gettery i zwykłe wartości jako argument wejściowy.

### Wartości zwrotne {#return-values}

Prawdopodobnie zauważyłeś, że w obiektach composables używaliśmy wyłącznie `ref()` zamiast `reactive()`. Zalecaną konwencją jest, aby obiekty composables zawsze zwracały zwykły, niereaktywny obiekt zawierający wiele ref. Pozwala to na destrukturyzację w komponentach przy zachowaniu reaktywności:

```js
// zmienne `x` i `y` są `ref()`
const { x, y } = useMouse()
```

Zwrócenie obiektu reaktywnego z obiektu composable spowoduje, że takie destrukturyzacje utracą połączenie reaktywności ze stanem wewnątrz obiektu composable, podczas gdy referencje zachowają to połączenie.

Jeśli wolisz używać zwróconego stanu z obiektów composable jako właściwości obiektu, możesz opakować zwrócony obiekt za pomocą `reactive()`, aby referencje zostały rozpakowane. Na przykład:

```js
const mouse = reactive(useMouse())
// mouse.x jest powiązany z oryginalnym ref
console.log(mouse.x)
```

```vue-html
Pozycja myszki to: {{ mouse.x }}, {{ mouse.y }}
```

### Skutki uboczne {#side-effects}

Można wykonywać efekty uboczne (np. dodawanie nasłuchiwaczy zdarzeń DOM lub pobieranie danych) w obiektach kompozycyjnych, ale należy zwrócić uwagę na następujące zasady:

- Jeśli pracujesz nad aplikacją, która używa [Server-Side Rendering](/guide/scaling-up/ssr) (SSR), upewnij się, że wykonujesz specyficzne dla DOM efekty uboczne w haczykach cyklu życia po zamontowaniu, np. `onMounted()`. Te haki są wywoływane tylko w przeglądarce, więc możesz mieć pewność, że kod w nich zawarty ma dostęp do DOM.

- Pamiętaj o usunięciu efektów ubocznych w `onUnmounted()`. Na przykład, jeśli obiekt kompozycyjny ustawia nasłuchiwacza zdarzeń DOM, powinien usunąć tego nasłuchiwacza w `onUnmounted()`, jak widzieliśmy w przykładzie `useMouse()`. Dobrym pomysłem może być użycie obiektu kompozycyjnego, który automatycznie to robi, takiego jak przykład `useEventListener()`.

### Ograniczenia użytkowania {#usage-restrictions}

Funkcje kompozycyjne powinny być wywoływane tylko w `<script setup>` lub haku `setup()`. Powinny być również wywoływane **synchronicznie** w tych kontekstach. W niektórych przypadkach można je również wywoływać w hakach cyklu życia, takich jak `onMounted()`.

Te ograniczenia są ważne, ponieważ są to konteksty, w których Vue jest w stanie określić bieżącą aktywną instancję komponentu. Dostęp do aktywnej instancji komponentu jest konieczny, aby:

1. Można było do niej rejestrować haki cyklu życia.

2. Można było do niej łączyć obliczone właściwości i obserwatorów, aby można je było usunąć, gdy instancja jest odmontowywana, zapobiegając wyciekom pamięci.

:::tip
`<script setup>` to jedyne miejsce, w którym można wywołać funkcje kompozycyjne **after** za pomocą `await`. Kompilator automatycznie przywraca aktywny kontekst instancji po operacji asynchronicznej.
:::

## Ekstrakcja funkcji kompozycyjnych w celu organizacji kodu {#extracting-composables-for-code-organization}

Funkcje kompozycyjne można wyodrębnić nie tylko do ponownego użycia, ale także do organizacji kodu. Wraz ze wzrostem złożoności komponentów możesz skończyć z komponentami, które są zbyt duże, aby poruszać się po nich i je analizować. Interfejs API kompozycji zapewnia pełną elastyczność w organizacji kodu komponentu w mniejsze funkcje na podstawie kwestii logicznych:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

W pewnym zakresie można myśleć o tych wyodrębnionych obiektach kompozycyjnych jako o usługach o zakresie komponentów, które mogą się ze sobą komunikować.

## Korzystanie z funkcji kompozycyjnych w Options API {#using-composables-in-options-api}

Jeśli używasz Options API, funkcje kompozycyjne muszą być wywoływane wewnątrz `setup()`, a zwrócone powiązania muszą być zwracane z `setup()`, aby były widoczne dla `this` i szablonu:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // Dostęp do udostępnionych właściwości setup() można uzyskać w `this`
    console.log(this.x)
  }
  // ...pozostałe opcje
}
```

## Porównania z innymi technikami {#comparisons-with-other-techniques}

### w porównaniu z Mixinami {#vs-mixins}

Użytkownicy przychodzący z Vue 2 mogą być zaznajomieni z opcją [mixins](/api/options-composition#mixins), która pozwala nam również wyodrębnić logikę komponentu do jednostek wielokrotnego użytku. Istnieją trzy główne wady miksinów:

1. **Niejasne źródło właściwości**: podczas korzystania z wielu miksinów staje się niejasne, która właściwość instancji jest wstrzykiwana przez który miksin, co utrudnia śledzenie implementacji i zrozumienie zachowania komponentu. Dlatego też zalecamy korzystanie ze wzorca refs + destructure dla elementów kompozycyjnych: sprawia on, że źródło właściwości jest jasne w komponentach konsumujących.

2. **Kolizje przestrzeni nazw**: wiele miksinów od różnych autorów może potencjalnie rejestrować te same klucze właściwości, powodując kolizje przestrzeni nazw. W przypadku elementów kompozycyjnych można zmienić nazwy zdestrukturyzowanych zmiennych, jeśli występują konflikty kluczy z różnych elementów kompozycyjnych.

3. **Niejawna komunikacja między miksinami**: wiele miksinów, które muszą ze sobą oddziaływać, musi polegać na współdzielonych kluczach właściwości, co sprawia, że ​​są niejawnie sprzężone. W przypadku obiektów kompozycyjnych wartości zwracane z jednego obiektu kompozycyjnego mogą być przekazywane do innego jako argumenty, tak jak normalne funkcje.

Z powyższych powodów nie zalecamy już używania miksinów w Vue 3. Funkcja ta jest zachowana tylko ze względu na migrację i znajomość.

### w porównaniu z komponentami Renderless {#vs-renderless-components}

W rozdziale o slotach komponentów omówiliśmy wzorzec [Renderless Component](/guide/components/slots#renderless-components) oparty na zakresowych slotach. Zaimplementowaliśmy nawet tę samą demonstrację śledzenia myszy, używając komponentów renderless.

Główną zaletą elementów kompozycyjnych w porównaniu z komponentami renderless jest to, że elementy kompozycyjne nie powodują dodatkowego obciążenia wystąpienia komponentu. Gdy są używane w całej aplikacji, ilość dodatkowych wystąpień komponentu utworzonych przez wzorzec komponentu renderless może stać się zauważalnym obciążeniem wydajności.

Zaleca się używanie elementów kompozycyjnych podczas ponownego używania czystej logiki i używanie komponentów podczas ponownego używania zarówno logiki, jak i układu wizualnego.

### w porównaniu z React Hooks {#vs-react-hooks}

Jeśli masz doświadczenie z React, możesz zauważyć, że wygląda to bardzo podobnie do niestandardowych hooków React. Composition API zostało częściowo zainspirowane hookami React, a obiekty Vue composable są rzeczywiście podobne do hooków React pod względem możliwości kompozycji logiki. Jednak obiekty Vue composable są oparte na drobnoziarnistym systemie reaktywności Vue, który zasadniczo różni się od modelu wykonywania hooków React. Jest to omówione bardziej szczegółowo w [Composition API FAQ](/guide/extras/composition-api-faq#comparison-with-react-hooks).

## Dodatkowe materiały {#further-reading}

- [Zaawansowana Reaktywność](/guide/extras/reactivity-in-depth): dla podstawowego zrozumienia, jak działa system reaktywności Vue.
- [Zarządzanie globalnym stanem](/guide/scaling-up/state-management): dla wzorców zarządzania stanem współdzielonym przez wiele komponentów.
- [Testowanie funkcji kompozycyjnych](/guide/scaling-up/testing#testing-composables): wskazówki dotyczące testowania jednostkowego elementów złożonych.
- [VueUse](https://vueuse.org/): stale rosnąca kolekcja elementów złożonych Vue. Kod źródłowy jest również świetnym źródłem wiedzy.
