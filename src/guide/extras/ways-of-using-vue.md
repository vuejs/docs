# Sposoby korzystania z Vue {#ways-of-using-vue}

Uważamy, że nie ma jednej uniwersalnej formy dla sieci. Dlatego Vue zostało zaprojektowane jako elastyczne i stopniowo adaptowalane. W zależności od przypadku, Vue może być używane na różne sposoby, by osiągnąć optymalną równowagę pomiędzy kompleksowością stosu technologicznego, doświadczeniem dewelopera i końcową wydajnością.

## Samodzielny skrypt {#standalone-script}

Vue może być używane jako samodzielny plik skryptu - etap budowania nie jest wymagany! Jeśli posiadasz już framework backendowy, który renderuje większość HTML-a, lub twoja logika frontendowa nie jest na tyle skomplikowana by uzasadnić etap budowania, to jest to najprostszy sposób na integrację Vue z twoim stosem technologicznym. W takich przypadkach można traktować Vue jako bardziej deklaratywną alternatywę dla jQuery.

Vue dostarcza również alternatywną dystrybucję zwaną [petite-vue](https://github.com/vuejs/petite-vue), która jest szczególnie zoptymalizowana by progresywnie ulepszać istniejący HTML.

## Zagnieżdżone komponenty webowe {#embedded-web-components}

Możesz użyć Vue do [budowania standardowych komponentów webowych](/guide/extras/web-components), które mogą być osadzane na dowolnej HTMLowej stornie, niezależnie od tego jak są renderowane. Ta opcja umożliwia korzystanie z Vue w sposób całkowicie agnostyczny: powstałe komponenty mogą być osadzane w starszych aplikacjach, statycznym kodzie HTML, a nawet w aplikacjach zbudowanych za pomocą innych frameworków.

## Jednostronicowa aplikacja (Single-Page Application (SPA)) {#single-page-application-spa}

Niektóre aplikacje wymagają bogatej interaktywności, dużej głębi sesji, i nietrywialnej logiki stanowej na froncie. Najlepszym sposobem budowania takich aplikacji jest używanie architektury, w której Vue nie tylko kontroluje całą stronę, ale także obsługuje aktualizacje danych i nawigację bez konieczności ponownego ładowania strony. Ten typ aplikacji jest zwykle określany jako aplikacja jednostronicowa (Single-Page Application (SPA)).

Vue udostępnia podstawowe biblioteki i [wszechstronne wsparcie narzędziowe](/guide/scaling-up/tooling) z niesmaowitym doświadczeniem programistycznym w zakresie tworzenia nowoczesnych aplikacji SPA, w tym:

- Router po stronie klienta
- Błyskawicznie szybki łańcuch narzędzi do kompilacji
- Obsługa IDE
- Narzędzia dewelopreskie przeglądarki
- Integracje TypeScript
- Narzędzia testowe

Aplikacje SPA zazwyczaj wymagają, aby backend udostępniał endpointy API - ale można też połączyć Vue z rozwiązaniami takimi jak [Inertia.js](https://inertiajs.com), aby uzyskać korzyści płynące z aplikacji SPA, zachowując jednocześnie model rozwoju zorientowany na serwer.

## Fullstack / SSR {#fullstack-ssr}

Czysto klienckie aplikacje SPA są problematyczne, kiedy aplikacja jest wymaga wysokiej optymalizacji pod kątem SEO i szybkiego wyświetlania treści (time-to-content). Wynika to z faktu, że przeglądarka otrzymuje w dużej mierze pusty plik HTML i musi poczekać na załadowanie JavaScriptu, zanim cokolwiek zostanie wyrenderowane.

Vue dostarcza wbudowane API, które pozwala na "renderowanie" aplikcji Vue do postaci ciągów HTML po stronie serwera, dzięki temu serwer może przesłać już wyrenderowany HTML, pozwalając, by końcowy użytkownik zobaczył treść natychmiast, podczas kiedy JavaScript jest pobierany. Następnie Vue "napełnia" aplikację danymi po stronie klienta, by uczynić ją interaktywną. Ta technika nazywana jest [renderowaniem po stronie klienta (Server-Side Rendering (SSR))](/guide/scaling-up/ssr) i znacznie poprawia wskaźniki Core Web Vital takie jak [Largest Contentful Paint (LCP)](https://web.dev/lcp/).

Istnieją bardziej zaawansowane frameworki oparte na Vue, takie jak [Nuxt](https://nuxt.com/), które pozwalają na tworzenie aplikacji fullstackowych z wykorzystaniem Vue i JavaScriptu.

## JAMStack / SSG {#jamstack-ssg}

Renderowanie po stronie serwera można wykonać z wyprzedzeniem, jeśli wymagane dane są statyczne. Oznacza to, że całą aplikację można wstępnie wyrenderować do HTML i serwować jako statyczne pliki. Poprawia to wydajność strony i upraszcza proces wdrażania, ponieważ nie trzeba już dynamicznie renerować stron przy każdym żądaniu. Vue nadal może napełniać danymi takie aplikacje, by dostaczać bogatą interaktywność po stronie klienta. Ta technika jest powszechnie nazywana generowanie stron statycznych (Static-Side Generation (SSG)), znana również jako [JAMStack](https://jamstack.org/what-is-jamstack/).

SSG występuje w dwóch wersjach: jedno- i wielostronicowej. Obydwie wersje wstępnie renderują strony do statycznego HTML, ale różnią się tym, że:

- Po pierwszym załadowaniu strony, jednostronicowy SSG "napełnia" stronę danymi do formy SPA. Wymaga to większego początkowego ładunku JS i kosztu napełniania danymi, ale kolejne nawigacje są szybsze, ponieważ wystarczy częściowo zaktualizować treść strony, zamiast przeładowywać całą stronę.

- Wielostronicowe SSG ładują nową stronę przy każdej nawigacji. Zaletą tego rozwiązania jest możliwość ograniczenia wysyłanego JS do minimum - a nawet nie wysyłania JS w ogóle, jeśli strona nie wymaga interakcji! Niektóre frameworki wielostronicowego SSG, takie jak [Astro](https://astro.build/), wspierają również "częściową napełnianie danymi" - co pozwala na używanie komponentów Vue do tworzenia interaktywnych "wysp" wewnątrz statycznego HTML.

Jednostronicowe SSG sprawdzają się lepiej jeśli oczekujesz nietrywialnej interaktywności, długich sesji użytkowników lub utrzymywania elementów/stanu pomiędzy nawigacjami. W przeciwnym razie, wielostronicowe SSG będą lepszym wyborem.

Zespół Vue stworzył także generator statycznych stron zwany [VitePress](https://vitepress.dev/), który zasila tę stronę, którą obecnie czytasz! VitePress wspiera obie wersje SSG. [Nuxt](https://nuxt.com/) również wspiera SSG. Możesz nawet połączyć SSR i SSG dla różnych podstron w jednej aplikacji Nuxt.

## Poza siecią {#beyond-the-web}

Mimo, że Vue zostało zaprojektowane głównie do budowania aplikacji webowych, nie jest ograniczone wyłącznie do przeglądarek. Możesz:

- Budować aplikacje desktopowe z użyciem [Electron](https://www.electronjs.org/)
- Budować aplikacje mobile z użyciem [Ionic Vue](https://ionicframework.com/docs/vue/overview)
- Budować aplikacje desktopowe i mobilne z tej samej bazy kodu przy użyciu [Quasar](https://quasar.dev/) lub [Tauri](https://tauri.app)
- Budować trójwymiarowe doświadczenia WebGL z [TresJS](https://tresjs.org/)
- Używać [Custom Renderer API](/api/custom-renderer) Vue do budowy niestandardowych renderów, takich jak te do [terminala](https://github.com/vue-terminal/vue-termui)!
