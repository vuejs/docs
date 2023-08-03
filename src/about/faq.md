# Frequently Asked Questions {#frequently-asked-questions}

## Chi gestisce Vue? {#who-maintains-vue}

Vue è indipendente ed è un prodotto guidato dalla community, fondato da [Evan You](https://twitter.com/youyuxi) nel 2014 come side-project personale. Oggi, Vue è gestito attivamente da un team composto sia di [lavoratori full-time che volontari, provenienti da tutto il mondo](/about/team), e Evan è il team leader. Puoi scoprire di più sulla storia di Vue in questo [documentario](https://www.youtube.com/watch?v=OrxmtDw4pVI).

Vue è principalmente finanziato attraverso sponsorizzazioni ed è stato finanziariamente sostenibile dal 2016. Se tu o la tua azienda traete vantaggio da Vue, considera una [sponsorizzazione](/sponsor/) per supportare lo sviluppo di Vue!

## Qual è la differenza fra Vue 2 e Vue 3? {#what-s-the-difference-between-vue-2-and-vue-3}

Vue 3 è la versione principale corrente e più recente di Vue. Contiene nuove funzionalità che non sono presenti in Vue 2, come Teleport, Suspense e la possibilità di avere più elementi radice per template. Contiene anche cambiamenti che rompono la compatibilità con Vue 2. Tutti i dettagli sono documentati nella [Guida alla Migrazione a Vue 3](https://v3-migration.vuejs.org/).

Nonostante le differenze, la maggior parte delle API di Vue sono condivise tra le due versioni principali, quindi gran parte delle tue conoscenze di Vue 2 continueranno a funzionare in Vue 3. In particolare, la Composition API era originariamente una funzionalità esclusiva di Vue 3, ma è stata retroportata a Vue 2 ed è disponibile in [Vue 2.7](https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01).

In generale, Vue 3 offre dimensioni di bundle più piccole, migliore prestazioni, maggiore scalabilità e migliore supporto TypeScript / IDE. Se stai iniziando un nuovo progetto, Vue 3 è la scelta consigliata. Ci sono solo alcune ragioni per considerare Vue 2 al momento:

Devi supportare IE11. Vue 3 utilizza le caratteristiche del JavaScript moderno e non supporta IE11.
Se intendi migrare un'applicazione Vue 2 esistente a Vue 3, consulta la [guida alla migrazione](https://v3-migration.vuejs.org/).

## Vue 2 è ancora supportato? {#is-vue-2-still-supported}

Vue 2.7, che è stato rilasciato a luglio 2022, è l'ultima versione minore della gamma di versioni di Vue 2. Vue 2 è ora entrato nella modalità di manutenzione: non verranno più introdotte nuove funzionalità, ma continuerà a ricevere correzioni critiche di bug e aggiornamenti di sicurezza per 18 mesi a partire dalla data di rilascio della versione 2.7. Questo significa che Vue 2 raggiungerà la fine del supporto il 31 dicembre 2023. 

Crediamo che ciò dovrebbe fornire abbondante tempo per la maggior parte dell'ecosistema per migrare a Vue 3. Tuttavia, comprendiamo anche che potrebbero esserci team o progetti che non possono effettuare l'aggiornamento entro questa data, ma hanno ancora bisogno di soddisfare requisiti di sicurezza e conformità. Stiamo collaborando con esperti del settore per fornire supporto esteso per Vue 2 per i team con tali esigenze - se il tuo team prevede di utilizzare Vue 2 oltre la fine del 2023, assicurati di pianificare in anticipo e scoprire di più su [Vue 2 Extended LTS](https://v2.vuejs.org/lts/).

## Che licenza usa Vue? {#what-license-does-vue-use}

Vue è un progetto open source rilasciato sotto licenza dal [MIT](https://opensource.org/licenses/MIT).

## Quali browsers supportano Vue? {#what-browsers-does-vue-support}

L'ultima versione di Vue (3.x) supporta solo browser con [supporto nativo di ES2015](https://caniuse.com/es6). Questo esclude IE11. Vue 3.x utilizza funzionalità ES2015 che non possono essere polyfillate nei browser meno moderni, quindi se è necessario supportare questi browser, dovrai utilizzare Vue 2.x al suo posto.

## Vue è affidabile? {#is-vue-reliable}
Vue è un framework maturo e collaudato. È uno dei framework JavaScript più utilizzati in produzione oggi, con oltre 1,5 milioni di utenti in tutto il mondo, e viene scaricato quasi 10 milioni di volte al mese su npm.

Vue è utilizzato in produzione da rinomate organizzazioni in diverse capacità in tutto il mondo, tra cui Wikimedia Foundation, NASA, Apple, Google, Microsoft, GitLab, Zoom, Tencent, Weibo, Bilibili, Kuaishou e molti altri.

## Vue è veloce? {#is-vue-fast}

Vue 3 è uno dei framework front-end mainstream più performanti e gestisce la maggior parte dei casi d'uso delle applicazioni web con facilità, senza la necessità di ottimizzazioni manuali.

In scenari di stress test, Vue supera React e Angular con un margine significativo nel test [js-framework-benchmark](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html). 
Vue 3 si posiziona allo stesso livello di alcune delle più veloci librerie front-end di produzione non basate su Virtual-DOM nel benchmark.

Tieni presente che i benchmark sintetici come quello sopra si concentrano sulle prestazioni di rendering grezze con ottimizzazioni dedicate e potrebbero non rappresentare completamente i risultati delle prestazioni nel mondo reale. Se ti interessa di più la performance di caricamento delle pagine, puoi testare questa stessa pagina web usando [WebPageTest](https://www.webpagetest.org/lighthouse) o [PageSpeed Insights](https://pagespeed.web.dev/). This website è fatto in Vue stesso, con pre-rendering SSG e navigazione client-side SPA. Ottiene un punteggio di 100 in performance su un emulatore Moto G4 con throttling della CPU a 4x su reti 4G lente.

Puoi saperne di più su come Vue ottimizza automaticamente le prestazioni di runtime nella sezione [Rendering Mechanism](/guide/extras/rendering-mechanism), e su come ottimizzare un app Vue in casi particolari qui: [Performance Optimization Guide](/guide/best-practices/performance).

## Vue è leggero? {#is-vue-lightweight}

Quando si utilizza uno strumento di build, molte delle API di Vue sono ["tree-shakable"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). Ad esempio, se non si utilizza il componente integrato `<Transition>`, non sarà incluso nel bundle finale di produzione.

Un'app Vue HelloWorld che utilizza solo le API assolutamente minimali ha una dimensione di base di soli circa **16kb**, con minificazione e compressione brotli. La dimensione effettiva dell'applicazione dipenderà da quante funzionalità opzionali si utilizzano dal framework. Nel caso improbabile in cui un'app utilizzi tutte le funzionalità che Vue offre, la dimensione totale del runtime è di circa **27kb**.

Quando si utilizza Vue senza uno strumento di build, si perde non solo il tree-shaking, ma si deve anche inviare il compilatore del template al browser. Questo gonfia la dimensione a circa **41kb**. Pertanto, se si utilizza Vue principalmente per un potenziamento progressivo senza uno step di build, si può prendere in considerazione l'uso di [petite-vue](https://github.com/vuejs/petite-vue) (solamente **6kb**).


Alcuni framework, come Svelte, utilizzano una strategia di compilazione che produce output estremamente leggero in scenari con SFC. Tuttavia, [la nostra ricerca](https://github.com/yyx990803/vue-svelte-size-analysis) mostra che la differenza di dimensione dipende fortemente dal numero di componenti nell'applicazione. Mentre Vue ha una dimensione di base più pesante, genera meno codice per ogni componente. In scenari del mondo reale, un'app Vue potrebbe finire per essere più leggera.

## Vue è scalabile? {#does-vue-scale}

Sì. Nonostante il comune fraintendimento che Vue sia adatto solo per casi d'uso semplici, Vue è perfettamente in grado di gestire applicazioni su larga scala:

- I [Single-File Components](/guide/scaling-up/sfc) forniscono un modello di sviluppo modularizzato che consente di sviluppare diverse parti di un'applicazione in modo isolato.

- Il [Composition API](/guide/reusability/composables) fornisce un'integrazione di TypeScript di prima classe e consente di utilizzare pattern puliti per organizzare, estrarre e riutilizzare logica complessa.

- Il [supporto completo degli strumenti](/guide/scaling-up/tooling) garantisce un'esperienza di sviluppo fluida man mano che l'applicazione cresce.

- Una barriera d'ingresso più bassa e una documentazione eccellente si traducono in costi più bassi per l'integrazione e la formazione dei nuovi sviluppatori.

## Come posso contribuire a Vue? {#how-do-i-contribute-to-vue}

Apprezziamo il tuo interesse! Per favore, dai un'occhiata alla nostra [Guida alla Comunità](/about/community-guide).

## Dovrei utilizzare l'Options API o la Composition API? {#should-i-use-options-api-or-composition-api}

Se sei nuovo a Vue, forniamo un confronto di alto livello tra i due stili [qui](/guide/introduction#which-to-choose).

Se hai precedentemente utilizzato l'Options API e stai valutando attualmente la Composition API, dai un'occhiata a queste [domande frequenti](/guide/extras/composition-api-faq).

## Dovrei utilizzare JavaScript o TypeScript con Vue? {#should-i-use-javascript-or-typescript-with-vue}

Anche se Vue stesso è implementato in TypeScript e offre un supporto di prima classe per TypeScript, non impone il linguaggio da usare come utente.

Il supporto di TypeScript è una considerazione importante quando vengono aggiunte nuove funzionalità a Vue. Le API progettate tenendo in mente TypeScript sono generalmente più facili da comprendere per gli IDE e i linter, anche se non stai usando TypeScript tu stesso. Tutti ne traggono vantaggio. Le API di Vue sono anche progettate per funzionare allo stesso modo sia in JavaScript che in TypeScript, per quanto possibile.

L'adozione di TypeScript comporta un compromesso tra complessità di integrazione e vantaggi di mantenibilità a lungo termine. Se tale compromesso può essere giustificato può variare a seconda dell'esperienza del tuo team e della scala del progetto, ma Vue non è davvero un fattore influente nella presa di questa decisione.

## Come si confronta Vue con i Web Components? {#how-does-vue-compare-to-web-components}

Vue è stato creato prima che i Web Components fossero disponibili nativamente, e alcuni aspetti del design di Vue (ad esempio, gli slot) sono stati ispirati dal modello dei Web Components.

Le specifiche dei Web Components sono relativamente a basso livello, in quanto si concentrano sulla definizione di elementi personalizzati. Come framework, Vue affronta ulteriori problemi a un livello più alto, come il rendering efficiente del DOM, la gestione reattiva dello stato, gli strumenti, il routing lato client e il rendering lato server.

Vue supporta anche pienamente il consumo o l'esportazione verso elementi personalizzati nativi - consulta la guida [Vue e i Web Components](/guide/extras/web-components) per ulteriori dettagli.

<!-- ## TODO How does Vue compare to React? -->

<!-- ## TODO How does Vue compare to Angular? -->
