# Dostępność {#accessibility}

Dostępność internetowa (znana również jako a11y) odnosi się do praktyki tworzenia stron internetowych, z których może korzystać każdy — osoba niepełnosprawna, z wolnym połączeniem, przestarzałym lub zepsutym sprzętem lub po prostu ktoś w niekorzystnym otoczeniu. Na przykład dodanie napisów do filmu pomogłoby zarówno użytkownikom głuchym i niedosłyszącym, jak i użytkownikom, którzy znajdują się w głośnym otoczeniu i nie słyszą swojego telefonu. Podobnie upewnienie się, że tekst nie ma zbyt niskiego kontrastu, pomoże zarówno użytkownikom słabowidzącym, jak i użytkownikom, którzy próbują korzystać ze swojego telefonu w jasnym świetle słonecznym.

Gotowy do rozpoczęcia, ale nie wiesz, gdzie?

Sprawdź [Przewodnik po planowaniu i zarządzaniu dostępnością internetową](https://www.w3.org/WAI/planning-and-managing/) udostępniony przez [World Wide Web Consortium (W3C)](https://www.w3.org/)

## Pomiń link {#skip-link}

Powinieneś dodać link na górze każdej strony, który prowadzi bezpośrednio do głównego obszaru treści, aby użytkownicy mogli pominąć treść, która jest powtarzana na wielu stronach internetowych.

Zazwyczaj robi się to na górze `App.vue`, ponieważ będzie to pierwszy element, na którym można się skupić na wszystkich stronach:

```vue-html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink" class="skip-link">Skip to main content</a>
  </li>
</ul>
```

Aby ukryć link, jeśli nie jest aktywny, możesz dodać następujący styl:

```css
.skip-link {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skip-link:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
```

Gdy użytkownik zmieni trasę, przywróć fokus do linku pomijającego. Można to osiągnąć, wywołując fokus na szablonie ref linku pomijającego (zakładając użycie `vue-router`):

<div class="options-api">

```vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.skipLink.focus()
    }
  }
}
</script>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const skipLink = ref()

watch(
  () => route.path,
  () => {
    skipLink.value.focus()
  }
)
</script>
```

</div>

[Przeczytaj dokumentację dotyczącą pomijania linku do treści głównej](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## Struktura treści {#content-structure}

Jednym z najważniejszych elementów dostępności jest upewnienie się, że projekt może wspierać dostępną implementację. Projekt powinien uwzględniać nie tylko kontrast kolorów, wybór czcionki, rozmiar tekstu i język, ale także sposób, w jaki treść jest ustrukturyzowana w aplikacji.

### Nagłówki {#headings}

Użytkownicy mogą poruszać się po aplikacji za pomocą nagłówków. Posiadanie opisowych nagłówków dla każdej sekcji aplikacji ułatwia użytkownikom przewidywanie zawartości każdej sekcji. Jeśli chodzi o nagłówki, istnieje kilka zalecanych praktyk dostępności:

- Umieszczaj nagłówki w kolejności ich rankingu: `<h1>` - `<h6>`
- Nie pomijaj nagłówków w obrębie sekcji
- Używaj rzeczywistych znaczników nagłówków zamiast stylizowania tekstu, aby nadać wizualny wygląd nagłówkom

[Przeczytaj więcej o nagłówkach](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```vue-html
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">Main title</h1>
  <section aria-labelledby="section-title-1">
    <h2 id="section-title-1"> Section Title </h2>
    <h3>Section Subtitle</h3>
    <!-- Content -->
  </section>
  <section aria-labelledby="section-title-2">
    <h2 id="section-title-2"> Section Title </h2>
    <h3>Section Subtitle</h3>
    <!-- Content -->
    <h3>Section Subtitle</h3>
    <!-- Content -->
  </section>
</main>
```

### Landmarks {#landmarks}

[Landmarks](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) zapewniają programowy dostęp do sekcji w aplikacji. Użytkownicy, którzy polegają na technologii wspomagającej, mogą nawigować do każdej sekcji aplikacji i pomijać treści. Możesz użyć [roli ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles), aby pomóc Ci to osiągnąć.

| HTML            | Rola ARIA             | Cel Landmark                                                                                                  |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| header          | role="banner"        | Główny nagłówek: tytuł strony                                                                                 |
| nav             | role="navigation"    | Zbiór linków przydatnych podczas nawigacji po dokumencie lub powiązanych dokumentach                          |
| main            | role="main"          | Główna lub centralna treść dokumentu.                                                                     |
| footer          | role="contentinfo"   | Informacje o dokumencie nadrzędnym: przypisy/prawa autorskie/linki do oświadczenia o ochronie prywatności                           |
| aside           | role="complementary" | Wspiera główną treść, ale jest oddzielona i ma znaczenie w odniesieniu do własnej treści                                    |
| search          | role="search"        | Ta sekcja zawiera funkcjonalność wyszukiwania dla aplikacji                                               |
| form            | role="form"          | Zbiór elementów powiązanych z formularzem                                                                           |
| section         | role="region"        | Treść, która jest istotna i do której użytkownicy prawdopodobnie będą chcieli przejść. Etykieta musi być podana dla tego elementu |

:::tip Tip:
Zaleca się używanie elementów HTML landmark z redundantnymi atrybutami roli landmark w celu zapewnienia maksymalnej zgodności ze starszymi przeglądarkami, które nie obsługują elementów semantycznych HTML5 (https://caniuse.com/#feat=html5semantic).
:::

[Przeczytaj więcej o landmarks](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

## Semantyczne Formularze {#semantic-forms}

Podczas tworzenia formularza możesz użyć następujących elementów: `<form>`, `<label>`, `<input>`, `<textarea>` i `<button>`

Etykiety są zazwyczaj umieszczane na górze lub po lewej stronie pól formularza:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      :type="item.type"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

Zauważ, że możesz dodać `autocomplete='on'` do elementu formularza i będzie to miało zastosowanie do wszystkich danych wejściowych w formularzu. Możesz również ustawić różne [wartości dla atrybutu autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) dla każdego pola wejściowego.

### Etykiety (labels) {#labels}

Podaj etykiety opisujące cel wszystkich kontrolek formularza, łącząc `for` i `id`:

```vue-html
<label for="name">Name: </label>
<input type="text" name="name" id="name" v-model="name" />
```

Jeśli sprawdzisz ten element w Chrome DevTools i otworzysz kartę Accessibility w karcie Elements, zobaczysz, jak dane wejściowe otrzymują swoją nazwę z etykiety:

![Chrome Developer Tools wyświetla nazwę dostępną dla danych wejściowych z etykiety](./images/AccessibleLabelChromeDevTools.png)

:::warning Warning:
Chociaż mogłeś zobaczyć etykiety otaczające pola wprowadzania danych w następujący sposób:

```vue-html
<label>
  Name:
  <input type="text" name="name" id="name" v-model="name" />
</label>
```

Jawne ustawianie etykiet z dopasowanym identyfikatorem jest lepiej obsługiwane przez technologie wspomagające.
:::

#### `aria-label` {#aria-label}

Można również nadać wejściu dostępną nazwę za pomocą [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label).

```vue-html
<label for="name">Name: </label>
<input
  type="text"
  name="name"
  id="name"
  v-model="name"
  :aria-label="nameLabel"
/>
```

Możesz sprawdzić ten element w Chrome DevTools, aby zobaczyć, jak zmieniła się dostępna nazwa:

![Chrome Developer Tools pokazuje dostępną nazwę wprowadzoną z aria-label](./images/AccessibleARIAlabelDevTools.png)

#### `aria-labelledby` {#aria-labelledby}

Użycie [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) jest podobne do `aria-label`, z tą różnicą, że jest używane, jeśli tekst etykiety jest widoczny na ekranie. Jest ono sparowane z innymi elementami przez ich `id` i można łączyć wiele `id`:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Name: </label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

![Narzędzia programistyczne Chrome pokazujące dostępną nazwę wejściową z aria-labelledby](./images/AccessibleARIAlabelledbyDevTools.png)

#### `aria-describedby` {#aria-describedby}

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) jest używane w ten sam sposób co `aria-labelledby`, z wyjątkiem tego, że zapewnia opis z dodatkowymi informacjami, których użytkownik może potrzebować. Może być używane do opisywania kryteriów dla dowolnego wejścia:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Full Name: </label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
      aria-describedby="nameDescription"
    />
    <p id="nameDescription">Please provide first and last name.</p>
  </div>
  <button type="submit">Submit</button>
</form>
```

Opis można zobaczyć, sprawdzając Chrome DevTools:

![Narzędzia Chrome Developer Tools pokazujące dostępną nazwę wejściową z aria-labelledby i opis z aria-describedby](./images/AccessibleARIAdescribedby.png)

### Symbol zastępczy (placeholder) {#placeholder}

Unikaj używania symboli zastępczych, ponieważ mogą one dezorientować wielu użytkowników.

Jednym z problemów z symbolami zastępczymi jest to, że domyślnie nie spełniają [kryteriów kontrastu kolorów](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html); naprawienie kontrastu kolorów sprawia, że ​​symbol zastępczy wygląda jak wstępnie wypełnione dane w polach wprowadzania. Patrząc na poniższy przykład, możesz zobaczyć, że symbol zastępczy nazwiska, który spełnia kryteria kontrastu kolorów, wygląda jak wstępnie wypełnione dane:

![Dostępny symbol zastępczy](./images/AccessiblePlaceholder.png)

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      type="text"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
      :placeholder="item.placeholder"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

```css
/* https://www.w3schools.com/howto/howto_css_placeholder.asp */

#lastName::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}

#lastName:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

#lastName::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}
```

Najlepiej jest podać wszystkie informacje, których użytkownik potrzebuje do wypełnienia formularzy, poza polami wejściowymi.

### Instrukcje {#instructions}

Podczas dodawania instrukcji do pól wprowadzania danych upewnij się, że są one poprawnie połączone z danymi wejściowymi.
Możesz podać dodatkowe instrukcje i powiązać wiele identyfikatorów wewnątrz [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby). Pozwala to na bardziej elastyczny projekt.

```vue-html
<fieldset>
  <legend>Using aria-labelledby</legend>
  <label id="date-label" for="date">Current Date: </label>
  <input
    type="date"
    name="date"
    id="date"
    aria-labelledby="date-label date-instructions"
  />
  <p id="date-instructions">MM/DD/YYYY</p>
</fieldset>
```

Alternatywnie możesz dołączyć instrukcje do danych wejściowych za pomocą [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby):

```vue-html
<fieldset>
  <legend>Using aria-describedby</legend>
  <label id="dob" for="dob">Date of Birth: </label>
  <input type="date" name="dob" id="dob" aria-describedby="dob-instructions" />
  <p id="dob-instructions">MM/DD/YYYY</p>
</fieldset>
```

### Ukrywanie treści {#hiding-content}

Zwykle nie zaleca się wizualnego ukrywania etykiet, nawet jeśli dane wejściowe mają dostępną nazwę. Jednak jeśli funkcjonalność danych wejściowych można zrozumieć dzięki otaczającej je zawartości, możemy ukryć etykietę wizualną.

Przyjrzyjmy się temu polu wyszukiwania:

```vue-html
<form role="search">
  <label for="search" class="hidden-visually">Search: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">Search</button>
</form>
```

Możemy to zrobić, ponieważ przycisk wyszukiwania pomoże użytkownikom wizualnym zidentyfikować cel pola wprowadzania danych.

Możemy użyć CSS, aby wizualnie ukryć elementy, ale zachować je dostępne dla technologii wspomagających:

```css
.hidden-visually {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}
```

#### `aria-hidden="true"` {#aria-hidden-true}

Dodanie `aria-hidden="true"` ukryje element przed technologią wspomagającą, ale pozostawi go wizualnie dostępnym dla innych użytkowników. Nie używaj go na elementach, na których można się skupić, tylko na treściach dekoracyjnych, zduplikowanych lub pozaekranowych.

```vue-html
<p>To nie jest ukryte przed czytnikami ekranu.</p>
<p aria-hidden="true">To jest ukryte przed czytnikami ekranu.</p>
```

### Przyciski {#buttons}

Używając przycisków wewnątrz formularza, musisz ustawić typ, aby zapobiec przesłaniu formularza.
Możesz również użyć danych wejściowych, aby utworzyć przyciski:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <!-- Buttons -->
  <button type="button">Cancel</button>
  <button type="submit">Submit</button>

  <!-- Input buttons -->
  <input type="button" value="Cancel" />
  <input type="submit" value="Submit" />
</form>
```

### Obrazy funkcjonalne {#functional-images}

Technikę tę można stosować do tworzenia obrazów funkcjonalnych.

- Pola wprowadzania danych

  - Te obrazy będą działać jako przycisk typu „Prześlij” w formularzach

  ```vue-html
  <form role="search">
    <label for="search" class="hidden-visually">Search: </label>
    <input type="text" name="search" id="search" v-model="search" />
    <input
      type="image"
      class="btnImg"
      src="https://img.icons8.com/search"
      alt="Search"
    />
  </form>
  ```

- Ikony

```vue-html
<form role="search">
  <label for="searchIcon" class="hidden-visually">Search: </label>
  <input type="text" name="searchIcon" id="searchIcon" v-model="searchIcon" />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="hidden-visually">Search</span>
  </button>
</form>
```

## Standardy {#standards}

Inicjatywa dostępności sieci Web (WAI) konsorcjum World Wide Web (W3C) opracowuje standardy dostępności sieci Web dla różnych komponentów:

- [Wytyczne dotyczące dostępności agenta użytkownika (UAAG)](https://www.w3.org/WAI/standards-guidelines/uaag/)
  - przeglądarki internetowe i odtwarzacze multimedialne, w tym niektóre aspekty technologii wspomagających
- [Wytyczne dotyczące dostępności narzędzi do tworzenia (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)
  - narzędzia do tworzenia
- [Wytyczne dotyczące dostępności treści internetowych (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
  - treści internetowe - używane przez programistów, narzędzia do tworzenia i narzędzia do oceny dostępności

### Wytyczne dotyczące dostępności treści internetowych (WCAG) {#web-content-accessibility-guidelines-wcag}

[WCAG 2.1](https://www.w3.org/TR/WCAG21/) rozszerza [WCAG 2.0](https://www.w3.org/TR/WCAG20/) i umożliwia implementację nowych technologii poprzez zajęcie się zmianami w sieci. W3C zachęca do korzystania z najnowszej wersji WCAG podczas opracowywania lub aktualizowania zasad dostępności sieci.

#### WCAG 2.1 Cztery główne zasady przewodnie(w skrócie POUR): {#wcag-2-1-four-main-guiding-principles-abbreviated-as-pour}

- [Dostrzegalny (Perceivable)](https://www.w3.org/TR/WCAG21/#perceivable)
  - Użytkownicy muszą być w stanie postrzegać prezentowane informacje
- [Wykonalny (Operable)](https://www.w3.org/TR/WCAG21/#operable)
  - Formularze interfejsu, elementy sterujące i nawigacja są funkcjonalne
- [Zrozumiały (Understandable)](https://www.w3.org/TR/WCAG21/#understandable)
  - Informacje i obsługa interfejsu użytkownika muszą być zrozumiałe dla wszystkich użytkowników
- [Solidny (Robust)](https://www.w3.org/TR/WCAG21/#robust)
  - Użytkownicy muszą mieć możliwość dostępu do treści w miarę postępu technologicznego

#### Inicjatywa dostępności sieci Web – dostępne bogate aplikacje internetowe (WAI-ARIA) {#web-accessibility-initiative-–-accessible-rich-internet-applications-wai-aria}

Dokument WAI-ARIA organizacji W3C zawiera wskazówki dotyczące tworzenia dynamicznej zawartości i zaawansowanych elementów sterujących interfejsem użytkownika.

- [Dostępne bogate aplikacje internetowe (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [Praktyki autorskie WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

## Zasoby {#resources}

### Dokumentacja {#documentation}

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [Dostępne bogate aplikacje internetowe (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [Praktyki autorskie WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

### Technologie wspomagające {#assistive-technologies}

- Czytniki ekranu
  - [NVDA](https://www.nvaccess.org/download/)
  - [VoiceOver](https://www.apple.com/accessibility/mac/vision/)
  - [JAWS](https://www.freedomscientific.com/products/software/jaws/?utm_term=jaws%20screen%20reader&utm_source=adwords&utm_campaign=All+Products&utm_medium=ppc&hsa_tgt=kwd-394361346638&hsa_cam=200218713&hsa_ad=2962011316 73&hsa_kw=czytnik%20ekranu%20jaws&hsa_grp=52663682111&hsa_net=adwords&hsa_mt=e&hsa_src=g&hsa_acc=1684996396&hsa_ver=3&gclid=Cj0KCQjwnv71BRCOARIsAIkxW9HXKQ6kKNQD0q8a_1TXSJXnIuUyb65KJeTWmtS6BH96-5he9dsNq6oaAh6UEALw_wcB)
  - [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=pl)
- Narzędzia powiększania
  - [MAGic](https://www.freedomscientific.com/products/software/magic/)
  - [ZoomText](https://www.freedomscientific.com/products/software/zoomtext/)
  - [Lupa](https://support.microsoft.com/en-us/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

### Testowanie {#testing}

- Narzędzia automatyczne
  - [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
  - [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
  - [ARC Toolkit](https://chrome.google.com/webstore/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce?hl=en-US)
- Narzędzia kolorów
  - [WebAim Color Contrast](https://webaim.org/resources/contrastchecker/)
  - [WebAim Link Color Contrast](https://webaim.org/resources/linkcontrastchecker)
- Inne pomocne Narzędzia
  - [HeadingMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=pl…)
  - [Color Oracle](https://colororacle.org)
  - [NerdeFocus](https://chrome.google.com/webstore/detail/nerdefocus/lpfiljldhgjecfepfljnbjnbjfhennpd?hl=pl…)
  - [Visual Aria](https://chrome.google.com/webstore/detail/visual-aria/lhbmajchkkmakajkjenkchhnhbadmhmk?hl=pl)
  - [Dostępność witryny Silktide Symulator](https://chrome.google.com/webstore/detail/silktide-website-accessib/okcpiimdfkpkjcbihbmhppldhiebhhaf?hl=en-US)

### Użytkownicy {#users}

Światowa Organizacja Zdrowia szacuje, że 15% światowej populacji ma jakąś formę niepełnosprawności, z czego 2-4% jest poważnie niepełnosprawnych. Szacuje się, że jest to 1 miliard ludzi na całym świecie; co czyni osoby niepełnosprawne największą grupą mniejszościową na świecie.

Istnieje ogromny zakres niepełnosprawności, które można podzielić na cztery kategorie:

- _[Wizualne](https://webaim.org/articles/visual/)_ - Ci użytkownicy mogą skorzystać z czytników ekranu, powiększania ekranu, kontrolowania kontrastu ekranu lub wyświetlacza brajlowskiego.
- _[Słuchowe](https://webaim.org/articles/auditory/)_ - Ci użytkownicy mogą skorzystać z napisów, transkrypcji lub filmów w języku migowym.
- _[Motor](https://webaim.org/articles/motor/)_ - Ci użytkownicy mogą skorzystać z szeregu [technologii wspomagających dla osób z upośledzeniem motorycznym](https://webaim.org/articles/motor/assistive): oprogramowanie do rozpoznawania głosu, śledzenie wzroku, dostęp za pomocą jednego przełącznika, różdżka na głowę, przełącznik sip and puff, duża mysz typu trackball, adaptacyjna klawiatura lub inne technologie wspomagające.
- _[Cognitive](https://webaim.org/articles/cognitive/)_ - Ci użytkownicy mogą skorzystać z dodatkowych mediów, strukturalnej organizacji treści, jasnego i prostego pisania.

Sprawdź następujące linki z WebAim, aby dowiedzieć się od użytkowników:

- [Web Accessibility Perspectives: Poznaj wpływ i korzyści dla każdego](https://www.w3.org/WAI/perspective-videos/)
- [Historie użytkowników sieci](https://www.w3.org/WAI/people-use-web/user-stories/)
