# Häufig gestellte Fragen {#frequently-asked-questions}

## Wer wartet und hält Vue instand? {#who-maintains-vue}

Vue ist ein unabhängiges, von der Gemeinschaft betriebenes Projekt. Es wurde von [Evan You](https://twitter.com/youyuxi) im Jahr 2014 als persönliches Nebenprojekt gegründet. Heute wird Vue aktiv von [einem Team aus Vollzeit- und freiwilligen Mitgliedern aus der ganzen Welt](/about/team) gepflegt, wobei Evan als Projektleiter fungiert. Sie können mehr über die Geschichte von Vue in dieser [Dokumentation](https://www.youtube.com/watch?v=OrxmtDw4pVI) erfahren.

Die Entwicklung von Vue wird hauptsächlich durch Sponsoring finanziert und wir sind seit 2016 finanziell nachhaltig. Wenn Sie oder Ihr Unternehmen von Vue profitieren, erwägen Sie, [uns zu sponsern](/sponsor/), um die Entwicklung von Vue zu unterstützen!

## Wo liegt der Unterschied zwischen Vue 2 und Vue 3? {#what-s-the-difference-between-vue-2-and-vue-3}

Vue 3 ist die aktuelle, letzte Hauptversion von Vue. Sie enthält neue Funktionen, die in Vue 2 nicht vorhanden sind, zum Beispiel Teleport, Suspense und mehrere Root-Elemente pro Template. Sie enthält auch Änderungen, die sie inkompatibel mit Vue 2 machen. Alle Details sind im [Vue 3 Migration Guide](https://v3-migration.vuejs.org/) dokumentiert.

Trotz der Unterschiede sind die meisten Vue-APIs zwischen den beiden Hauptversionen gemeinsam, so dass die meisten Ihrer Vue-2-Kenntnisse auch in Vue 3 funktionieren werden. Insbesondere die Composition API war ursprünglich ein reines Vue-3-Feature, wurde aber nun nach Vue 2 zurückportiert und ist in [Vue 2.7] (https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01) verfügbar.

Im Allgemeinen bietet Vue 3 kleinere Bundle-Größen, bessere Leistung, bessere Skalierbarkeit und bessere TypeScript-/IDE-Unterstützung. Wenn Sie heute ein neues Projekt beginnen, ist Vue 3 die empfohlene Wahl. Es gibt nur wenige Gründe für Sie, Vue 2 in Betracht zu ziehen, nämlich dann, wenn:

- Sie IE11 unterstützen müssen. Vue 3 nutzt moderne JavaScript-Funktionen und unterstützt den IE11 nicht.

- Sie immer noch darauf warten, dass große Ökosystemprojekte wie Nuxt oder Vuetify stabile Versionen für Vue 3 veröffentlichen. Das ist vernünftig, wenn Sie keine Software im Beta-Stadium verwenden wollen. Beachten Sie jedoch, dass es andere bereits stabile Vue 3 Komponentenbibliotheken gibt, wie [Quasar](https://quasar.dev/), [Naive UI](https://www.naiveui.com/) und [Element Plus](https://element-plus.org/).

Wenn Sie beabsichtigen, eine bestehende Vue 2 Anwendung nach Vue 3 zu migrieren, konsultieren Sie den [migration guide] (https://v3-migration.vuejs.org/).

Vue 2.7, das im Juli 2022 ausgeliefert wurde, ist das letzte Minor Release der Vue 2 Versionsreihe. Vue 2 ist nun in den Wartungsmodus übergegangen: Es werden keine neuen Funktionen mehr ausgeliefert, aber es werden weiterhin kritische Fehlerbehebungen und Sicherheitsupdates für 18 Monate ab dem Veröffentlichungsdatum von 2.7 bereitgestellt. Das bedeutet, dass **Vue 2 Ende 2023 das Ende seiner Lebensdauer erreichen wird**. Wir glauben, dass dies genug Zeit für den Großteil des Ökosystems sein sollte, um auf Vue 3 umzusteigen. Wir verstehen jedoch auch, dass es Teams oder Projekte geben könnte, die nicht bis zu diesem Zeitpunkt aufrüsten können und dennoch Sicherheits- und Compliance-Anforderungen erfüllen müssen. Wir planen einen erweiterten Support für Vue 2 für Teams mit solchen Anforderungen - wenn Ihr Team erwartet, Vue 2 über Ende 2023 hinaus zu verwenden, stellen Sie sicher, dass Sie vorausplanen und Ihr Interesse [hier](https://airtable.com/shrj37Zf4ZIfrxFzh) registrieren.

## Welche Lizenz verwendet Vue? {#what-license-does-vue-use}

Vue ist ein freies und quelloffenes Projekt, das unter der [MIT License] (https://opensource.org/licenses/MIT) veröffentlicht wird.

## Welche Browser werden von Vue unterstützt? {#what-browsers-does-vue-support}

Die neueste Version von Vue (3.x) unterstützt nur [Browser mit nativer ES2015-Unterstützung] (https://caniuse.com/es6). Dies schließt IE11 aus. Vue 3.x verwendet ES2015-Features, die nicht in Legacy-Browsern ausgefüllt werden können. Wenn Sie also Legacy-Browser unterstützen müssen, müssen Sie stattdessen Vue 2.x verwenden.

## Ist Vue zuverlässig? {#is-vue-reliable}

Vue ist ein ausgereiftes und kampferprobtes Framework. Es ist eines der am weitesten verbreiteten JavaScript-Frameworks in der Produktion heute, mit über 1,5 Millionen Nutzern weltweit und wird fast 10 Millionen Mal pro Monat auf npm heruntergeladen.

Vue wird von renommierten Organisationen in unterschiedlichen Funktionen auf der ganzen Welt eingesetzt, darunter Wikimedia Foundation, NASA, Apple, Google, Microsoft, GitLab, Zoom, Tencent, Weibo, Bilibili, Kuaishou und viele mehr.

## Ist Vue schnell? {#is-vue-fast}

Vue 3 ist eines der leistungsfähigsten Mainstream-Frontend-Frameworks und bewältigt die meisten Anwendungsfälle von Webanwendungen mit Leichtigkeit, ohne dass manuelle Optimierungen erforderlich sind.

In Stresstestszenarien übertrifft Vue im [js-framework-benchmark](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html) React und Angular um ein gutes Stück. Es liefert sich auch ein Kopf-an-Kopf-Rennen mit einigen der schnellsten Nicht-Virtual-DOM-Frameworks auf Produktionsebene in diesem Benchmark.

Beachten Sie, dass synthetische Benchmarks wie die obigen sich auf die reine Rendering-Leistung mit speziellen Optimierungen konzentrieren und möglicherweise nicht vollständig repräsentativ für die realen Leistungsergebnisse sind. Wenn Sie sich mehr für die Seitenladeleistung interessieren, können Sie gerne diese Website mit [WebPageTest] (https://www.webpagetest.org/lighthouse) oder [PageSpeed Insights] (https://pagespeed.web.dev/) überprüfen. Diese Website wird von Vue selbst betrieben, mit SSG-Pre-Rendering, vollständiger Seitenhydrierung und SPA-Client-seitiger Navigation. Sie erreicht eine Leistung von 100 auf einem emulierten Moto G4 mit 4-facher CPU-Drosselung über langsame 4G-Netzwerke.

Mehr darüber, wie Vue automatisch die Laufzeitleistung optimiert, erfahren Sie im Abschnitt [Rendering Mechanism](/guide/extras/rendering-mechanism.html), und wie Sie eine Vue-App in besonders anspruchsvollen Fällen optimieren können, im [Performance Optimization Guide](/guide/best-practices/performance.html).

## Ist Vue leichtgewichtig? {#is-vue-lightweight}

Wenn Sie ein Build-Tool verwenden, sind viele von Vue's APIs ["tree-shakable"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). Wenn Sie zum Beispiel die eingebaute `<Transition>` Komponente nicht verwenden, wird sie nicht in das endgültige Produktionspaket aufgenommen.

Eine Hallo-Welt-Vue-Anwendung, die nur die absolut minimalen APIs verwendet, hat eine Basisgröße von nur etwa **16kb**, mit Minification und Brotli-Kompression. Die tatsächliche Größe der Anwendung hängt davon ab, wie viele optionale Features des Frameworks verwendet werden. In dem unwahrscheinlichen Fall, dass eine Anwendung jedes einzelne Feature von Vue nutzt, liegt die Gesamtgröße zur Laufzeit bei etwa **27kb**.

Wenn Vue ohne ein Build-Tool verwendet wird, verlieren wir nicht nur das Tree-Shaking, sondern müssen auch den Template-Compiler an den Browser ausliefern. Dies bläht die Größe auf etwa **41kb** auf. Wenn Sie Vue also hauptsächlich für Progressive Enhancement ohne einen Build-Schritt verwenden, sollten Sie stattdessen [petite-vue](https://github.com/vuejs/petite-vue) (nur **6kb**) in Betracht ziehen.

Einige Frameworks, wie z.B. Svelte, verwenden eine Kompilierungsstrategie, die in Szenarien mit nur einer Komponente eine extrem schlanke Ausgabe erzeugt. Jedoch zeigt [unsere Forschung](https://github.com/yyx990803/vue-svelte-size-analysis), dass der Größenunterschied stark von der Anzahl der Komponenten in der Anwendung abhängt. Während Vue eine schwerere Basisgröße hat, generiert es weniger Code pro Komponente. In realen Szenarien kann eine Vue-Anwendung am Ende sehr wohl leichter sein.

## Ist Vue skalierbar? {#does-vue-scale}

Ja. Trotz des weit verbreiteten Missverständnisses, dass Vue nur für einfache Anwendungsfälle geeignet ist, ist Vue durchaus in der Lage, große Anwendungen zu handhaben:

- [Single-File Components](/guide/scaling-up/sfc) bieten ein modularisiertes Entwicklungsmodell, das es erlaubt, verschiedene Teile einer Anwendung isoliert zu entwickeln.

- [Composition API](/guide/reusability/composables) bietet erstklassige TypeScript-Integration und ermöglicht saubere Muster für die Organisation, Extraktion und Wiederverwendung komplexer Logik.

- [Umfassende Tooling-Unterstützung](/guide/scaling-up/tooling.html) gewährleistet eine reibungslose Entwicklung, wenn die Anwendung wächst.

- Niedrigere Einstiegshürden und eine hervorragende Dokumentation sorgen für geringere Einarbeitungs- und Schulungskosten für neue Entwickler.

## Wie trage ich zu Vue bei? {#how-do-i-contribute-to-vue}

Wir freuen uns über Ihr Interesse! Bitte sehen Sie sich unseren [Community Guide](/about/community-guide.html) an.

## Soll ich die Options API oder die Composition API verwenden? {#should-i-use-options-api-or-composition-api}

Wenn Vue neu für Sie ist, finden Sie [hier](/guide/introduction.html#which-to-choose) einen umfassenden Vergleich zwischen den beiden Stilen.

Wenn Sie zuvor die Options API verwendet haben und derzeit die Composition API evaluieren, schauen Sie sich [diese FAQ](/guide/extras/composition-api-faq) an.

## Sollte ich JavaScript oder TypeScript mit Vue verwenden? {#should-i-use-javascript-or-typescript-with-vue}

Während Vue selbst in TypeScript implementiert ist und erstklassige TypeScript-Unterstützung bietet, setzt es keine Meinung darüber durch, ob man TypeScript als Benutzer verwenden sollte.

TypeScript-Unterstützung ist eine wichtige Überlegung, wenn neue Features zu Vue hinzugefügt werden. APIs, die mit TypeScript im Hinterkopf entworfen wurden, sind typischerweise einfacher für IDEs und Linters zu verstehen, auch wenn man selbst kein TypeScript verwendet. Jeder gewinnt. Vue-APIs sind auch so konzipiert, dass sie sowohl in JavaScript als auch in TypeScript so weit wie möglich auf die gleiche Weise funktionieren.

Die Einführung von TypeScript ist ein Kompromiss zwischen der Komplexität der Einführung und den langfristigen Vorteilen der Wartbarkeit. Ob ein solcher Kompromiss gerechtfertigt werden kann, hängt vom Hintergrund Ihres Teams und dem Umfang des Projekts ab, aber Vue ist nicht wirklich ein beeinflussender Faktor bei dieser Entscheidung.

## Was ist der Unterschied zwischen Vue und Web Components? {#how-does-vue-compare-to-web-components}

Vue wurde erstellt, bevor Web Components nativ verfügbar waren, und einige Aspekte des Vue-Designs (z.B. Slots) wurden durch das Web Components-Modell inspiriert.

Die Web Components-Spezifikationen sind relativ niedrig, da sie sich auf die Definition von benutzerdefinierten Elementen konzentrieren. Als Framework adressiert Vue zusätzliche übergeordnete Belange wie effizientes DOM-Rendering, reaktive Zustandsverwaltung, Tooling, clientseitiges Routing und serverseitiges Rendering.

Vue unterstützt auch vollständig das Konsumieren oder Exportieren von nativen benutzerdefinierten Elementen - schauen Sie sich den [Vue and Web Components Guide](/guide/extras/web-components) für weitere Details an.

<!-- ## TODO How does Vue compare to React? -->

<!-- ## TODO How does Vue compare to Angular? -->
