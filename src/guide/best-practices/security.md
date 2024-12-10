# Bezpieczeństwo {#security}

## Zgłaszanie luk w zabezpieczeniach {#reporting-vulnerabilities}

Gdy zgłaszana jest luka, natychmiast staje się ona naszym głównym zmartwieniem, a pełnoetatowy współpracownik porzuca wszystko, aby nad nią pracować. Aby zgłosić lukę, wyślij wiadomość e-mail na adres [security@vuejs.org](mailto:security@vuejs.org).

Chociaż odkrycie nowych luk zdarza się rzadko, zalecamy również zawsze korzystanie z najnowszych wersji Vue i oficjalnych bibliotek towarzyszących, aby zapewnić, że Twoja aplikacja pozostanie tak bezpieczna, jak to możliwe.

## Zasada nr 1: Nigdy nie używaj szablonów, którym nie ufasz {#rule-no-1-never-use-non-trusted-templates}

Najbardziej podstawowa zasada bezpieczeństwa podczas korzystania z Vue to **nigdy nie używaj niezaufanej zawartości jako szablonu komponentu**. Robienie tego jest równoznaczne z zezwoleniem na dowolne wykonywanie JavaScript w aplikacji - a co gorsza, może prowadzić do naruszeń serwera, jeśli kod jest wykonywany podczas renderowania po stronie serwera. Przykład takiego użycia:

```js
Vue.createApp({
  template: `<div>` + userProvidedString + `</div>` // NIGDY TEGO NIE RÓB
}).mount('#app')
```

Szablony Vue są kompilowane do JavaScript, a wyrażenia wewnątrz szablonów będą wykonywane jako część procesu renderowania. Chociaż wyrażenia są oceniane w odniesieniu do określonego kontekstu renderowania, ze względu na złożoność potencjalnych globalnych środowisk wykonawczych, niepraktyczne jest, aby framework taki jak Vue całkowicie chronił Cię przed potencjalnym złośliwym wykonaniem kodu bez ponoszenia nierealistycznych kosztów wydajności. Najprostszym sposobem na całkowite uniknięcie tej kategorii problemów jest upewnienie się, że zawartość Twoich szablonów Vue jest zawsze zaufana i w pełni kontrolowana przez Ciebie.

## Co Vue robi, aby Cię chronić {#what-vue-does-to-protect-you}

### Zawartość HTML {#html-content}

Niezależnie od tego, czy używasz szablonów, czy funkcji renderowania, treść jest automatycznie escapedowana. Oznacza to, że w tym szablonie:

```vue-html
<h1>{{ userProvidedString }}</h1>
```

jeśli `userProvidedString` zawiera:

```js
'<script>alert("hi")</script>'
```

następnie zostanie on przeniesiony do następującego kodu HTML:

```vue-html
&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;
```

zapobiegając w ten sposób wstrzyknięciu skryptu. To uciekanie odbywa się za pomocą natywnych interfejsów API przeglądarki, takich jak `textContent`, więc luka może istnieć tylko wtedy, gdy sama przeglądarka jest podatna.

### Powiązania atrybutów {#attribute-bindings}

Podobnie, dynamiczne powiązania atrybutów są również automatycznie uciekane. Oznacza to, że w tym szablonie:

```vue-html
<h1 :title="userProvidedString">
  hello
</h1>
```

jeśli `userProvidedString` zawiera:

```js
'" onclick="alert(\'hi\')'
```

następnie zostanie on przeniesiony do następującego kodu HTML:

```vue-html
&quot; onclick=&quot;alert('hi')
```

zapobiegając w ten sposób zamknięciu atrybutu `title` w celu wstrzyknięcia nowego, dowolnego kodu HTML. To uciekanie odbywa się za pomocą natywnych interfejsów API przeglądarek, takich jak `setAttribute`, więc luka może istnieć tylko wtedy, gdy sama przeglądarka jest podatna.

## Potencjalne zagrożenia {#potential-dangers}

W dowolnej aplikacji internetowej zezwalanie na wykonywanie nieoczyszczonych, dostarczonych przez użytkownika treści w formacie HTML, CSS lub JavaScript jest potencjalnie niebezpieczne, dlatego należy tego unikać, gdziekolwiek to możliwe. Są jednak sytuacje, w których pewne ryzyko może być dopuszczalne.

Na przykład usługi takie jak CodePen i JSFiddle zezwalają na wykonywanie dostarczonych przez użytkownika treści, ale w kontekście, w którym jest to oczekiwane i w pewnym stopniu izolowane w ramach ramek iframe. W przypadkach, gdy ważna funkcja z natury wymaga pewnego poziomu podatności, to Twój zespół musi rozważyć znaczenie funkcji w porównaniu z najgorszymi scenariuszami, jakie umożliwia podatność.

### Wstrzyknięcie HTML {#html-injection}

Jak się wcześniej dowiedziałeś, Vue automatycznie ucieka z zawartości HTML, zapobiegając przypadkowemu wstrzyknięciu wykonywalnego HTML do Twojej aplikacji. Jednak **w przypadkach, gdy wiesz, że HTML jest bezpieczny**, możesz jawnie renderować zawartość HTML:

- Korzystanie z szablonu:

  ```vue-html
  <div v-html="userProvidedHtml"></div>
  ```

- Korzystanie z funkcji renderowania:

  ```js
  h('div', {
    innerHTML: this.userProvidedHtml
  })
  ```

- Korzystanie z funkcji renderowania z JSX:

  ```jsx
  <div innerHTML={this.userProvidedHtml}></div>
  ```

:::warning
Dostarczony przez użytkownika kod HTML nigdy nie może być uważany za w 100% bezpieczny, chyba że znajduje się w piaskownicy iframe lub w części aplikacji, w której tylko użytkownik, który napisał ten kod HTML, może być na niego narażony. Ponadto umożliwienie użytkownikom pisania własnych szablonów Vue niesie ze sobą podobne zagrożenia.
:::

### Wstrzyknięcie adresu URL {#url-injection}

W takim adresie URL:

```vue-html
<a :href="userProvidedUrl">
  click me
</a>
```

Istnieje potencjalny problem bezpieczeństwa, jeśli adres URL nie został „oczyszczony”, aby zapobiec wykonywaniu kodu JavaScript za pomocą `javascript:`. Istnieją biblioteki takie jak [sanitize-url](https://www.npmjs.com/package/@braintree/sanitize-url), które mogą w tym pomóc, ale pamiętaj: jeśli kiedykolwiek wykonujesz oczyszczanie adresu URL w interfejsie użytkownika, masz już problem bezpieczeństwa. **Adresy URL dostarczane przez użytkownika powinny być zawsze oczyszczane przez backend, zanim zostaną zapisane w bazie danych.** Wtedy problem jest pomijany dla _każdego_ klienta łączącego się z Twoim interfejsem API, w tym natywnych aplikacji mobilnych. Pamiętaj również, że nawet w przypadku oczyszczonych adresów URL, Vue nie może pomóc Ci zagwarantować, że prowadzą one do bezpiecznych miejsc docelowych.

### Wtrysk stylu {#style-injection}

Przyjrzyjmy się temu przykładowi:

```vue-html
<a
  :href="sanitizedUrl"
  :style="userProvidedStyles"
>
  click me
</a>
```

Załóżmy, że `sanitizedUrl` został wyczyszczony, tak aby był to z pewnością prawdziwy adres URL, a nie JavaScript. Dzięki `userProvidedStyles` złośliwi użytkownicy mogliby nadal udostępniać CSS, aby „przechwytywać kliknięcia”, np. stylizując łącze w przezroczyste pole nad przyciskiem „Zaloguj się”. Następnie, jeśli `https://user-controlled-website.com/` jest zbudowany tak, aby przypominał stronę logowania Twojej aplikacji, mogliby po prostu przechwycić prawdziwe dane logowania użytkownika.

Możesz sobie wyobrazić, jak zezwolenie na zawartość dostarczoną przez użytkownika dla elementu `<style>` stworzyłoby jeszcze większą podatność, dając użytkownikowi pełną kontrolę nad tym, jak stylizować całą stronę. Dlatego Vue uniemożliwia renderowanie tagów stylu wewnątrz szablonów, takich jak:

```vue-html
<style>{{ userProvidedStyles }}</style>
```

Aby zapewnić użytkownikom pełne bezpieczeństwo przed clickjackingiem, zalecamy umożliwienie pełnej kontroli nad CSS tylko w obrębie piaskownicy iframe. Alternatywnie, podczas zapewniania kontroli użytkownika poprzez powiązanie stylu, zalecamy użycie jego [składni obiektu](/guide/essentials/class-and-style#binding-to-objects-1) i umożliwienie użytkownikom podawania wartości tylko dla określonych właściwości, które mogą bezpiecznie kontrolować, w następujący sposób:

```vue-html
<a
  :href="sanitizedUrl"
  :style="{
    color: userProvidedColor,
    background: userProvidedBackground
  }"
>
  click me
</a>
```

### Wstrzyknięcie JavaScript {#javascript-injection}

Zdecydowanie odradzamy renderowanie elementu `<script>` za pomocą Vue, ponieważ szablony i funkcje renderowania nigdy nie powinny mieć skutków ubocznych. Nie jest to jednak jedyny sposób na uwzględnienie ciągów, które byłyby oceniane jako JavaScript w czasie wykonywania.

Każdy element HTML ma atrybuty z wartościami akceptującymi ciągi JavaScript, takie jak `onclick`, `onfocus` i `onmouseenter`. Powiązanie dostarczonego przez użytkownika JavaScript z dowolnym z tych atrybutów zdarzeń stanowi potencjalne ryzyko bezpieczeństwa, dlatego należy tego unikać.

:::warning
Dostarczony przez użytkownika JavaScript nigdy nie może być uważany za w 100% bezpieczny, chyba że znajduje się w piaskownicy iframe lub w części aplikacji, w której tylko użytkownik, który napisał ten JavaScript, może być na niego narażony.
:::

Czasami otrzymujemy raporty o podatnościach na to, jak możliwe jest wykonywanie ataków typu cross-site scripting (XSS) w szablonach Vue. Ogólnie rzecz biorąc, nie uważamy takich przypadków za rzeczywiste luki w zabezpieczeniach, ponieważ nie ma praktycznego sposobu na ochronę programistów przed dwoma scenariuszami, które umożliwiłyby atak XSS:

1. Programista wyraźnie prosi Vue o renderowanie dostarczonej przez użytkownika, nieoczyszczonej zawartości jako szablonów Vue. Jest to z natury niebezpieczne i Vue nie ma możliwości poznania pochodzenia.

2. Programista montuje Vue do całej strony HTML, która przypadkowo zawiera renderowaną przez serwer i dostarczoną przez użytkownika zawartość. Jest to zasadniczo ten sam problem, co \#1, ale czasami programiści mogą to robić, nie zdając sobie z tego sprawy. Może to prowadzić do potencjalnych luk w zabezpieczeniach, gdy atakujący dostarcza HTML, który jest bezpieczny jako zwykły HTML, ale niebezpieczny jako szablon Vue. Najlepszą praktyką jest **nigdy nie montuj Vue na węzłach, które mogą zawierać renderowaną przez serwer i dostarczoną przez użytkownika zawartość**.

## Dobre praktyki {#best-practices}

Ogólna zasada jest taka, że ​​jeśli pozwolisz na wykonywanie nieoczyszczonej, dostarczonej przez użytkownika treści (jako HTML, JavaScript, a nawet CSS), możesz narazić się na ataki. Ta rada jest prawdziwa niezależnie od tego, czy używasz Vue, innego frameworka, czy nawet żadnego frameworka.

Poza zaleceniami podanymi powyżej dla [Potencjalnych zagrożeń](#potential-dangers), zalecamy również zapoznanie się z tymi zasobami:

- [Arkusz informacyjny dotyczący bezpieczeństwa HTML5](https://html5sec.org/)
- [Arkusz informacyjny OWASP dotyczący zapobiegania atakom typu Cross Site Scripting (XSS)](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

Następnie wykorzystaj zdobytą wiedzę, aby przejrzeć kod źródłowy swoich zależności pod kątem potencjalnie niebezpiecznych wzorców, jeśli którykolwiek z nich zawiera komponenty stron trzecich lub w inny sposób wpływa na to, co jest renderowane w DOM.

## Koordynacja zaplecza {#backend-coordination}

Luki w zabezpieczeniach HTTP, takie jak fałszowanie żądań między witrynami (CSRF/XSRF) i dołączanie skryptów między witrynami (XSSI), są rozwiązywane głównie w zapleczu, więc nie są problemem Vue. Niemniej jednak nadal dobrym pomysłem jest komunikacja z zespołem zaplecza, aby dowiedzieć się, jak najlepiej współdziałać z ich API, np. przesyłając tokeny CSRF wraz z formularzami.

## Renderowanie po stronie serwera (SSR) {#server-side-rendering-ssr}

Z korzystaniem z SSR wiążą się dodatkowe problemy związane z bezpieczeństwem, dlatego należy postępować zgodnie z najlepszymi praktykami opisanymi w [naszej dokumentacji SSR](/guide/scaling-up/ssr), aby uniknąć luk w zabezpieczeniach.
