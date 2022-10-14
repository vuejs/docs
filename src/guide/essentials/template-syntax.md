# Składnia szablonu (Template Syntax)

Vue wykorzystuje składnię szablonów opartą na HTML, która pozwala na deklaratywne powiązanie renderowanego DOM z danymi instancji komponentu. Wszystkie szablony Vue są poprawnym składniowo kodem HTML, który może być przetwarzany przez przeglądarki i parsery HTML zgodne ze specyfikacją.

Pod spodem Vue generuje szablony do wysoce zoptymalizowanego kodu JavaScript. W połączeniu z systemem reaktywności Vue jest w stanie inteligentnie określić minimalną liczbę komponentów do ponownego wyrenderowania i zastosować minimalną liczbę manipulacji DOM, gdy zmienia się stan aplikacji.

Jeśli znasz koncepcje wirtualnego DOM i wolisz czystą moc JavaScript, możesz także [bezpośrednio pisać funkcje renderowania](/guide/extras/render-function.html) zamiast szablonów, z opcjonalną obsługą JSX. Należy jednak pamiętać, że nie mają one takiego samego poziomu optymalizacji w czasie renderowania jak szablony.

## Interpolacja tekstu

Najbardziej podstawową formą wiązania danych jest interpolacja tekstu za pomocą składni "Mustache" (podwójne nawiasy klamrowe):

```vue-html
<span>Message: {{ msg }}</span>
```

Znacznik mustache zostanie zastąpiony wartością właściwości `msg` z odpowiedniej instancji komponentu. Będzie on również aktualizowany za każdym razem, gdy właściwość `msg` ulegnie zmianie.

## Czysty HTML

The double mustaches interpret the data as plain text, not HTML. In order to output real HTML, you will need to use the [`v-html` directive](/api/built-in-directives.html#v-html):

```vue-html
<p>Używając interpolacji: {{ rawHtml }}</p>
<p>Używając dyrektywy v-html: <span v-html="rawHtml"></span></p>
```

<script setup>
  const rawHtml = '<span style="color: red">To musi być czerwone.</span>'
</script>

<div class="demo">
  <p>Używając interpolacji:: {{ rawHtml }}</p>
  <p>Używając dyrektywy v-html: <span v-html="rawHtml"></span></p>
</div>

Tutaj spotykamy się z czymś nowym. Atrybut `v-html`, który widzisz, jest nazywany **dyrektywą**. Dyrektywy są poprzedzone literą `v-`, aby wskazać, że są to specjalne właściwości dostarczane przez Vue, i jak zapewne się domyślasz, stosują one specjalne reaktywne zachowanie do renderowanego DOM. W tym przypadku, w zasadzie mówimy "utrzymuj wewnętrzny HTML tego elementu na podstawie stałej `rawHtml` bieżącej aktywnej instancji".

Zawartość `span` zostanie zastąpiona wartością właściwości `rawHtml`, interpretowaną jako zwykły HTML - wiązania danych są ignorowane. Zauważ, że nie możesz używać `v-html` do kompilowania fragmentów szablonów, ponieważ Vue nie jest silnikiem szablonów opartym na ciągach znaków. Zamiast tego, preferowane są komponenty jako podstawowa jednostka do ponownego użycia i kompozycji UI.

:::warning Security Warning
Dynamiczne renderowanie dowolnego kodu HTML na stronie internetowej może być bardzo niebezpieczne, ponieważ może łatwo doprowadzić do powstania luk, podatności na zagrożenia [XSS vulnerabilities](https://en.wikipedia.org/wiki/Cross-site_scripting). Używaj `v-html` tylko w przypadku zaufanej zawartości i **nigdy** w przypadku zawartości dostarczonej przez użytkownika.
:::

## Wiązanie atrybutów

Podwójne nawiasy nie mogą być używane wewnątrz atrybutów HTML. Zamiast tego należy użyć dyrektywy [`v-bind`](/api/built-in-directives.html#v-bind):

```vue-html
<div v-bind:id="dynamicId"></div>
```

Dyrektywa `v-bind` nakazuje Vue utrzymywać atrybut `id` elementu w synchronizacji z właściwością `dynamicId` komponentu. Jeśli powiązana wartość jest `null` lub `undefined`, to atrybut zostanie usunięty z renderowanego elementu.

### Skrót składni

Ponieważ `v-bind` jest tak powszechnie używany, posiada on dedykowaną skróconą składnię:

```vue-html
<div :id="dynamicId"></div>
```

Atrybuty zaczynające się od `:` mogą wyglądać nieco inaczej niż w normalnym HTML-u, ale w rzeczywistości jest to poprawny znak dla nazw atrybutów i wszystkie przeglądarki obsługujące Vue mogą go poprawnie przetworzyć. Ponadto nie pojawiają się one w końcowym renderowanym szablonie. Skrócona składnia jest opcjonalna, ale prawdopodobnie docenisz ją, gdy dowiesz się więcej o jej użyciu później.

> W pozostałej części przewodnika będziemy używać składni skróconej w przykładach kodu, ponieważ jest to najczęstsze zastosowanie dla programistów Vue.

### Atrybuty boolean

[Atrybuty boolean](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes) są atrybutami, które mogą wskazywać wartości true / false poprzez swoją obecność na elemencie. Na przykład, [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) jest jednym z najczęściej używanych atrybutów boolean.

W tym przypadku `v-bind` działa nieco inaczej:

```vue-html
<button :disabled="isButtonDisabled">Button</button>
```

Atrybut `disabled` zostanie dołączony, jeśli `isButtonDisabled` ma wartość [prawda](https://developer.mozilla.org/en-US/docs/Glossary/Truthy). Będzie on również dołączony, jeśli wartość jest pustym łańcuchem, zachowując spójność z `<button disabled="">`. Dla innych [fałszywych wartości](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) atrybut zostanie pominięty.

### Dynamiczne wiązanie wielu atrybutów

Jeśli masz obiekt JavaScript reprezentujący wiele atrybutów, który wygląda tak jak poniżej:

<div class="composition-api">

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

</div>

Można je powiązać z pojedynczym elementem przez użycie `v-bind` bez argumentu:

```vue-html
<div v-bind="objectOfAttrs"></div>
```

## Używanie wyrażeń JavaScript

Do tej pory w naszych szablonach wiązaliśmy się tylko z prostymi typami właściwości. Ale Vue obsługuje pełną moc wyrażeń JavaScript we wszystkich powiązaniach z danymi:

```vue-html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

Te wyrażenia zostaną przetworzone jako JavaScript w zakresie danych bieżącej instancji komponentu.

W szablonach Vue, wyrażenia JavaScript mogą być używane w następujących miejscach:

- Wewnątrz interpolacji tekstu (wąsy)
- W wartości atrybutów dowolnych dyrektyw Vue (atrybuty specjalne, które zaczynają się od `v-`)

### Tylko wyrażenia

Każde wiązanie może zawierać tylko **jedno wyrażenie**. Wyrażenie to fragment kodu, którego wartością może być wartość. Proste sprawdzenie polega na tym, czy można go użyć po `return`. więc poniższe wyrażenia **nie będą** działać:
Więc poniższe wyrażenia **nie będą** działać:

```vue-html
<!-- to jest stwierdzenie, a nie wyrażenie: -->
{{ var a = 1 }}

<!-- sterowanie przepływem również nie zadziała, użyć wyrażenia warunkowego typu - warunek ? wyr1 : wyr2  -->
{{ if (ok) { return message } }}
```

### Wywoływanie funkcji

Wewnątrz wyrażenia wiążącego można wywołać metodę udostępnioną przez komponent:

```vue-html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

:::tip
Funkcje wywoływane wewnątrz wyrażeń wiążących będą wywoływane przy każdej aktualizacji komponentu, więc **nie** powinny mieć żadnych efektów ubocznych, takich jak zmiana danych lub wywoływanie operacji asynchronicznych.
:::

### Ograniczony dostęp globalny

Wyrażenia szablonowe są sandboxowane i mają dostęp tylko do [ograniczonej listy funkcji globalnych](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsWhitelist.ts#L3). Lista ta zawiera powszechnie używane wbudowane funkcje globalne, takie jak `Math` i `Date`.

Wyrażenia globalne, które nie są wyraźnie uwzględnione na liście, na przykład właściwości dołączone przez użytkownika do `window`, nie będą dostępne w wyrażeniach szablonów. Można jednak jawnie zdefiniować dodatkowe funkcje globalne dla wszystkich wyrażeń Vue, dodając je do [`app.config.globalProperties`] (/api/application.html#app-config-globalproperties).

## Dyrektywy

Dyrektywy są specjalnymi atrybutami z prefiksem `v-`. Vue udostępnia wiele [wbudowanych dyrektyw](/api/built-in-directives.html), w tym `v-html` i `v-bind`, które wprowadziliśmy powyżej.

Oczekuje się, że wartości atrybutów dyrektyw będą pojedynczymi wyrażeniami JavaScript (z wyjątkiem `v-for`, `v-on` i `v-slot`, które zostaną omówione w ich odpowiednich sekcjach później). Zadaniem dyrektywy jest reaktywne zastosowanie aktualizacji w DOM, gdy wartość jej wyrażenia się zmieni. Jako przykład weźmy [`v-if`](/api/built-in-directives.html#v-if):

```vue-html
<p v-if="seen">Teraz mnie widzisz</p>
```

## Dyrektywy

Tutaj, dyrektywa `v-if` usunie/wstawi element `<p>` na podstawie prawdziwości wartości wyrażenia `seen`.

### Argumenty

Niektóre dyrektywy mogą przyjmować "argument", oznaczany dwukropkiem po nazwie dyrektywy. Na przykład, dyrektywa `v-bind` jest używana do reaktywnej aktualizacji atrybutu HTML:

```vue-html
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>
```

Tutaj `href` jest argumentem, który mówi dyrektywie `v-bind`, aby związała atrybut `href` elementu z wartością wyrażenia `url`. W skrócie, wszystko przed argumentem (tj. `v-bind:`) jest skondensowane do pojedynczego znaku, `:`.

Innym przykładem jest dyrektywa `v-on`, która nasłuchuje zdarzeń DOM:

```vue-html
<a v-on:click="doSomething"> ... </a>

<!-- skrót -->
<a @click="doSomething"> ... </a>
```

Argumentem jest tutaj nazwa zdarzenia, które ma być nasłuchiwane: `click`. `v-on` jest jedną z niewielu dyrektyw, które mają również odpowiadający im skrót, a jego skrótem jest znak `@`. O obsłudze zdarzeń będziemy jeszcze mówić bardziej szczegółowo.

### Argumenty dynamiczne

Możliwe jest także użycie wyrażenia JavaScript w argumencie dyrektywy poprzez zawinięcie go w nawiasy kwadratowe:

```vue-html
<!--
Należy pamiętać, że istnieją pewne ograniczenia dotyczące wyrażenia argumentu,
jak wyjaśniono w sekcjach "Ograniczenia wartości argumentu dynamicznego" i "Ograniczenia składni argumentu dynamicznego" poniżej.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- skrót -->
<a :[attributeName]="url"> ... </a>
```

Tutaj `attributeName` zostanie dynamicznie przetworzony jako wyrażenie JavaScript, a jego wartość zostanie użyta jako ostateczna wartość argumentu. Na przykład, jeśli instancja komponentu posiada właściwość danych `attributeName`, której wartością jest `"href"`, to takie powiązanie będzie równoważne z `v-bind:href`.

Podobnie można użyć argumentów dynamicznych, aby powiązać handler z dynamiczną nazwą zdarzenia:

```vue-html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething">
```

W tym przykładzie, gdy `eventName` ma wartość `"focus"`, `v-on:[eventName]` będzie równoważne `v-on:focus`.

#### Ograniczenia wartości argumentów dynamicznych

Oczekuje się, że argumenty dynamiczne będą interpretowane jako łańcuch, z wyjątkiem `null`. Specjalna wartość `null` może być użyta do jawnego usunięcia wiązania. Każda inna wartość, nie będąca łańcuchem, spowoduje wyświetlenie ostrzeżenia.

#### Ograniczenia składni argumentów dynamicznych

Dynamiczne wyrażenia argumentów mają pewne ograniczenia składniowe, ponieważ pewne znaki, takie jak spacje i cudzysłowy, są niepoprawne wewnątrz nazw atrybutów HTML. Na przykład, poniższy tekst jest nieprawidłowy:

```vue-html
<!-- Spowoduje to wyświetlenie ostrzeżenia . -->
<a :['foo' + bar]="value"> ... </a>
```

Jeśli trzeba przekazać złożony argument dynamiczny, prawdopodobnie lepiej jest użyć właściwości [computed property](./computed.html), którą omówimy wkrótce.

Podczas korzystania z szablonów in-DOM (szablonów zapisanych bezpośrednio w pliku HTML) należy również unikać nazywania kluczy wielkimi literami, ponieważ przeglądarki wymuszają stosowanie małych liter w nazwach atrybutów:

```vue-html
<a :[someAttr]="value"> ... </a>
```

Powyższe zostanie przekonwertowane na `:[someattr]` w szablonach in-DOM. Jeśli twój komponent ma właściwość `someAttr` zamiast `someattr`, twój kod nie będzie działał.
Komponenty jednoplikowe **nie** podlegają temu ograniczeniu.

### Modyfikatory

Modyfikatory są specjalnymi postfiksami oznaczanymi kropką, które wskazują, że dyrektywa powinna być związana w jakiś specjalny sposób. Na przykład, modyfikator `.prevent` mówi dyrektywie `v-on`, aby wywołała `event.preventDefault()` na wywołanym zdarzeniu:

```vue-html
<form @submit.prevent="onSubmit">...</form>
```

### Modyfikatory

Inne przykłady modyfikatorów zobaczysz później, [dla `v-on`](./event-handling.html#event-modifiers) i [dla `v-model`](./forms.html#modifiers), gdy będziemy poznawać te funkcje.

A oto wizualizacja pełnej składni dyrektywy:

![directive syntax graph](./images/directive.png)

<!-- https://www.figma.com/file/BGWUknIrtY9HOmbmad0vFr/Directive -->
