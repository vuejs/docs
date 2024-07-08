# Często zadawane pytania (FAQ) {#frequently-asked-questions}

## Kto utrzymuje Vue? {#who-maintains-vue}

Vue to niezależny projekt prowadzony przez społeczność. Został on stworzony przez [Evana You](https://twitter.com/youyuxi) w 2014 jako osobisty projekt poboczny. Obecnie Vue jest aktywnie utrzymywane przez [zespół zarówno pełnoetatowych członków zespołu, jak i wolontariuszy z całego świata](/about/team), gdzie Evan pełni rolę lidera projektu. Możesz dowiedzieć się więcej o historii Vue w tym [dokumencie](https://www.youtube.com/watch?v=OrxmtDw4pVI).

Rozwój Vue jest finansowany głównie przez sponsorów i od 2016 roku jesteśmy stabilni finansowo. Jeśli Ty lub Twoja firma czerpiecie korzyści z Vue, rozważ [sponsorowanie nas](/sponsor/) aby wesprzeć rozwój Vue!

## Jaka jest różnica między Vue 2 i Vue 3? {#what-s-the-difference-between-vue-2-and-vue-3}

Vue 3 to aktualna, najnowsza główna wersja Vue. Zawiera nowe funkcje, których nie ma w Vue 2, takie jak Teleport, Suspense i wiele elementów określanych jako `root` w sekcji `<template>`. Zawiera również przełomowe zmiany, które czynią ją niekompatybilną z Vue 2. Pełne szczegóły są udokumentowane w [przewodniku migracji na Vue 3](https://v3-migration.vuejs.org/).

Pomimo różnic, większość interfejsów API Vue jest wspólna dla obu głównych wersji, więc większość wiedzy zdobytej w Vue 2 będzie nadal działać w Vue 3. Warto zauważyć, że Composition API było pierwotnie funkcją dostępną tylko w Vue-3, ale teraz zostało przeniesione do Vue 2 i jest dostępne w [Vue 2.7](https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01).

Ogólnie rzecz biorąc, Vue 3 zapewnia mniejsze rozmiary pakietów, lepszą wydajność, lepszą skalowalność i lepszą obsługę TypeScript / IDE. Jeśli rozpoczynasz dziś nowy projekt, Vue 3 jest zalecanym wyborem. Istnieje tylko kilka powodów, dla których warto rozważyć Vue 2:

- Musisz obsługiwać IE11. Vue 3 wykorzystuje nowoczesne funkcje JavaScript i nie obsługuje IE11.

Jeśli zamierzasz przeprowadzić migrację istniejącej aplikacji Vue 2 do Vue 3, zapoznaj się z [przewodnikiem migracji](https://v3-migration.vuejs.org/).

## Czy Vue 2 jest nadal wspierane? {#is-vue-2-still-supported}

Vue 2.7, który został dostarczony w lipcu 2022 r., jest ostatnią mniejszą wersją z zakresu wersji Vue 2. Vue 2 weszło teraz w tryb utrzymania: nie będzie już dostarczać nowych funkcji, ale będzie nadal otrzymywać krytyczne poprawki błędów i aktualizacje zabezpieczeń przez 18 miesięcy, począwszy od daty wydania 2.7. Oznacza to, że **Vue 2 osiągnie koniec życia 31 grudnia 2023 roku**.

Uważamy, że powinno to zapewnić większości ekosystemu wystarczająco dużo czasu na migrację do Vue 3. Rozumiemy jednak również, że mogą istnieć zespoły lub projekty, które nie mogą dokonać aktualizacji w tym terminie, a jednocześnie muszą spełniać wymogi bezpieczeństwa i zgodności. Współpracujemy z ekspertami branżowymi, aby zapewnić rozszerzone wsparcie dla Vue 2 dla zespołów o takich potrzebach - jeśli Twój zespół spodziewa się korzystać z Vue 2 po zakończeniu 2023 roku, zaplanuj to z wyprzedzeniem i dowiedz się więcej o [Vue 2 Extended LTS].(https://v2.vuejs.org/lts/).

## Jakiej licencji używa Vue?? {#what-license-does-vue-use}

Vue to darmowy i otwarty projekt wydany na licencji [MIT].(https://opensource.org/licenses/MIT).

## Jakie przeglądarki wspiera Vue? {#what-browsers-does-vue-support}

Najnowsza wersja Vue (3.x) obsługuje tylko [przeglądarki z natywną obsługą ES2015] (https://caniuse.com/es6). Wyklucza to IE11. Vue 3.x wykorzystuje funkcje ES2015, których nie można zapewnić w starszych przeglądarkach, więc jeśli chcesz obsługiwać starsze przeglądarki, musisz zamiast tego użyć Vue 2.x.

## Czy Vue jest niezawodne? {#is-vue-reliable}

Vue to dojrzały i sprawdzony w boju framework. Jest to jeden z najczęściej używanych frameworków JavaScript w produkcji, z ponad 1,5 miliona użytkowników na całym świecie i ma blisko 10 milionów pobrań miesięcznie na npm.

Vue jest używany na produkcji przez renomowane organizacje o różnym charakterze na całym świecie, w tym Wikimedia Foundation, NASA, Apple, Google, Microsoft, GitLab, Zoom, Tencent, Weibo, Bilibili, Kuaishou i wiele innych.

## Czy Vue jest szybkie? {#is-vue-fast}

Vue 3 jest jednym z najbardziej wydajnych frameworków frontendowych głównego nurtu i z łatwością obsługuje większość przypadków użycia aplikacji internetowych, bez konieczności ręcznej optymalizacji.

W testach warunków skrajnych Vue przewyższa React i Angular z przyzwoitym marginesem w [js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/current.html). W teście porównawczym Vue idzie również łeb w łeb z niektórymi najszybszymi frameworkami które nie opierają się na użyciu virtual-DOM na poziomie produkcyjnym.

Należy pamiętać, że syntetyczne testy porównawcze, takie jak powyższe, koncentrują się na surowej wydajności renderowania z dedykowanymi optymalizacjami i mogą nie być w pełni reprezentatywne dla rzeczywistych wyników wydajności. Jeśli bardziej zależy ci na wydajności ładowania strony, możesz przeprowadzić audyt tej witryny za pomocą [WebPageTest](https://www.webpagetest.org/lighthouse) lub [PageSpeed Insights](https://pagespeed.web.dev/). Ta witryna jest obsługiwana przez Vue, ze wstępnym renderowaniem SSG, pełną hydracją strony i nawigacją SPA po stronie klienta. Uzyskała 100 punktów wydajności na emulowanym Moto G4 z 4x spowolnieniem procesora w wolnych sieciach 4G.

Więcej informacji o tym, jak Vue automatycznie optymalizuje wydajność w czasie wykonywania, można znaleźć w sekcji [mechanizm renderowania](/guide/extras/rendering-mechanism), a o tym, jak zoptymalizować aplikację Vue w szczególnie wymagających przypadkach - w [przewodniku po optymalziacji wydajności](/guide/best-practices/performance).

## Czy Vue jest lekkie? {#is-vue-lightweight}

Podczas korzystania z narzędzia do kompilacji wiele interfejsów API Vue podlega procesowi ["tree-shaking"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). Na przykład, jeśli nie użyjesz wbudowanego komponentu `<Transition>`, nie zostanie on uwzględniony w ostatecznej paczce produkcyjnej.

Aplikacja hello world Vue, która korzysta tylko z absolutnie minimalnych interfejsów API, ma podstawowy rozmiar tylko około **16kb**, z minifikacją i kompresją brotli. Rzeczywisty rozmiar aplikacji będzie zależeć od liczby opcjonalnych funkcji frameworka. W mało prawdopodobnym przypadku, gdy aplikacja korzysta z każdej funkcji udostępnianej przez Vue, całkowity rozmiar w czasie działania wynosi około **27kb**.

Podczas korzystania z Vue bez narzędzia do kompilacji, nie tylko tracimy tree-shaking, ale także musimy wysłać kompilator szablonu do przeglądarki. Powoduje to zwiększenie rozmiaru do około **41kb**. Dlatego jeśli używasz Vue głównie do progresywnego ulepszania bez kroku kompilacji, rozważ użycie [petite-vue](https://github.com/vuejs/petite-vue) (tylko **6kb**).

Niektóre frameworki, takie jak Svelte, wykorzystują strategię kompilacji, która generuje niezwykle lekkie dane wyjściowe w scenariuszach jednokomponentowych. Jednak [nasze badania](https://github.com/yyx990803/vue-svelte-size-analysis) pokazują, że różnica w rozmiarze w dużej mierze zależy od liczby komponentów w aplikacji. Podczas gdy Vue ma większy rozmiar bazowy, generuje mniej kodu na komponent. W rzeczywistych scenariuszach aplikacja Vue może okazać się lżejsza.

## Czy Vue się skaluje? {#does-vue-scale}

Tak. Pomimo powszechnego błędnego przekonania, że Vue nadaje się tylko do prostych przypadków użycia, Vue doskonale radzi sobie z aplikacjami na dużą skalę:

- [Single-File Components](/guide/scaling-up/sfc) zapewniają modularny model rozwoju, który umożliwia tworzenie różnych części aplikacji w izolacji.

- [Composition API](/guide/reusability/composables) zapewnia pierwszorzędną integrację TypeScript i umożliwia czyste wzorce organizowania, wyodrębniania i ponownego wykorzystywania złożonej logiki.

- [Wszechstronne wsparcie narzędziowe](/guide/scaling-up/tooling) zapewnia płynny rozwój w miarę rozrastania się aplikacji.

- Niższa bariera wejścia i doskonała dokumentacja przekładają się na niższe koszty wdrożenia i szkolenia nowych deweloperów.

## Jak mogę przyczynić się do rozwoju Vue? {#how-do-i-contribute-to-vue}

Dziękujemy za zainteresowanie! Zapoznaj się z naszym [przewodnikiem dla społeczności](/about/community-guide).

## Powinienem użyć Options API czy Composition API? {#should-i-use-options-api-or-composition-api}

Jeśli jesteś nowy w Vue, zapewniamy porównanie na wysokim poziomie między dwoma stylami [tutaj](/guide/introduction#which-to-choose).

Jeśli wcześniej korzystałeś z Options API i obecnie oceniasz Composition API, zapoznaj się z [tym FAQ](/guide/extras/composition-api-faq).

## Czy powinienem używać JavaScript czy TypeScript z Vue? {#should-i-use-javascript-or-typescript-with-vue}

Chociaż Vue samo w sobie jest zaimplementowane w TypeScript i zapewnia pierwszorzędną obsługę TypeScript, nie wymusza tego, czy powinieneś używać TypeScript jako użytkownik.

Obsługa języka TypeScript jest ważnym aspektem przy dodawaniu nowych funkcji do Vue. Interfejsy API zaprojektowane z myślą o TypeScript są zazwyczaj łatwiejsze do zrozumienia dla IDE i linterów, nawet jeśli sam nie używasz TypeScript. Wszyscy wygrywają. Interfejsy API Vue są również zaprojektowane tak, aby działały w ten sam sposób zarówno w JavaScript, jak i TypeScript.

Przyjęcie TypeScript wiąże się z kompromisem między złożonością wdrażania a długoterminowymi korzyściami w zakresie utrzymania. To, czy taki kompromis może być uzasadniony, może się różnić w zależności od doświadczenia zespołu i skali projektu, ale Vue nie jest tak naprawdę czynnikiem wpływającym na podjęcie tej decyzji.

## Jak Vue wypada w porównaniu do Web Components? {#how-does-vue-compare-to-web-components}

Vue zostało stworzone zanim technologia Web Components stała się natywnie dostępna, a niektóre aspekty projektu Vue (np. sloty) zostały zainspirowane modelem tej technologii.

Specyfikacje Web Components są stosunkowo niskopoziomowe, ponieważ koncentrują się na definiowaniu niestandardowych elementów. Jako framework, Vue zajmuje się dodatkowymi kwestiami wyższego poziomu, takimi jak wydajne renderowanie DOM, reaktywne zarządzanie stanem, narzędzia, routing po stronie klienta i renderowanie po stronie serwera.

Vue w pełni obsługuje również użycie jak i eksport do natywnych elementów niestandardowych - sprawdź [przewodnik po Vue i Web Components](/guide/extras/web-components), aby uzyskać więcej informacji.

<!-- ## TODO How does Vue compare to React? -->

<!-- ## TODO How does Vue compare to Angular? -->
