# Modi di utilizzare Vue {#ways-of-using-vue}

Noi crediamo alla storia che c'è un modo giusto in assoluto che vada per tutti nel mondo del web. Questo è il principale motivo per la quale abbiamo disegnato Vue per essere versatile e flessibile. A seconda del tuo caso d'uso, Vue può essere utilizzato in modi diversi per trovare l'equilibrio ottimale tra complessità dello stack, esperienza dello sviluppatore e performance.

## Standalone Script {#standalone-script}

Vue può essere utilizzato con script file "standalone", ovvero senza necessità di build. Se hai un framework backend che già renderizza la maggior parte del HTML, o la tua logica di frontend non è complessa a tal punto da giustificare una build, questo è il modo più semplice per integrare Vue all'interno del vostro stack. In questi casi puoi pensare a Vue come un sostituto più dichiarativo di JQuery.

Inoltre Vue dispone di una distribuzione alternativa chiamata [petite-vue](https://github.com/vuejs/petite-vue) che è specificatamente ottimizzata per migliorare progressivamente il codice HTML esistente. Ha un set di funzionalità più limitato ma estremamente leggero ed è molto efficace soprattutto negli scenari senza step di build. 

## Utilizzare Web Components {#embedded-web-components}

Puoi usare Vue per [creare Web Components nativi](/guide/extras/web-components) che potrai embeddare in ogni pagina HTML, indipendentemente da come quest'ultime vengano renderizzate. Questa opzione ti consente di sfruttare Vue in modo completamente indipendente da chi lo integra: i web components creati potranno essere incorporati in applicazioni legacy, HTML statico o persino applicazioni create con altri framework.

## Single-Page Application (SPA) {#single-page-application-spa}

Molte delle applicazioni richiedono molta interattività, gestione della sessione, e una logica stateful complessa lato frontend. Il modo migliore per creare applicazioni è di usare un architettura dove Vue non controlla solamente l'intera pagina, ma controlla anche l'aggiornamento dei dati e navigazione senza necessità di ricaricare la pagina. Questo tipo di applicazione è tipicamente chiamata come Single-Page Application (SPA).

Per rendere ancora più piacevole l'esperienza di sviluppo, Vue dispone di librerie core e [strumenti di supporto completo](/guide/scaling-up/tooling) che  includono:

- Client-side router 
- Blazing fast build tool chain (Strumenti di costruzione delle applicazioni incredibilmente veloce)
- Supporto agli IDE
- Browser devtools
- Integrazioni per TypeScript
- Utility per i test

Tipicamente le SPA richiedono un backend che espone API, ma soluzioni come [Inertia.js](https://inertiajs.com) possono essere abbinate a Vue per avere i vantaggi di una SPA ma mantenere il modello di sviluppo lato server. 

## Fullstack / SSR {#fullstack-ssr}

Le SPA "pure" sono limitate quando le applicazioni devono essere soggette a pratiche SEO e time-to-content. Questo perché il browser riceverà una pagina HTML gran parte vuota, e deve aspettare fino a che il Javascript verrà caricato prima di renderizzare qualsiasi cosa.

Vue dispone di API di prima categoria per "renderizzare" lato Sever una Vue app in stringhe HTML. Questo fa si che il server risponda con il codice HTML già renderizzato, così che l'utente finale veda il contenuto immediatamente anche se il Javascript è ancora in caricamento. Quando il caricamento di quest'ultimo sarà finito, Vue "sostituirà" l'applicazione visualizzata server side con una client side per renderla interattiva. Questa modalità è chiamata [Server-Side Rendering (SSR)](/guide/scaling-up/ssr) e migliora notevolmente le "Core Web Vital metrics" come [Largest Contentful Paint (LCP)](https://web.dev/lcp/).

Esistono Framework che si basano su Vue costruiti su questo paradigma, come [Nuxt](https://nuxt.com/), che fa si che tu possa sviluppare una fullstack application utilizzando Vue e Javascript.

## JAMStack / SSG {#jamstack-ssg}

Il rendering lato server può essere eseguito in anticipo se i dati sono statici. Questo significa che noi possiamo pre-renderizzare un intera applicazione in HTML e distribuirla come file statici. Questo migliora le performance dei siti e semplifica visto che non sempre abbiamo bisogno di renderizzare la pagina dinamicamente. Vue può sempre rendere interattive applicazioni mediante il processo di "hydration". Questa tecnica è comunemente chiamata Static-Site Generation (SSG), anche conosciuta come [JAMStack](https://jamstack.org/what-is-jamstack/).

Ci sono due tipi di SSG: single-page e multi-page.Tutte e due le tipologie pre-renderizzano il sito in HTML statico, la differenza è la seguente:

- Dopo che la pagina iniziale è caricata , una single-page SSG verrà sostituita con una SPA. Questo richiede un costo in termini di tempo di caricamento e di "hydration", ma dopo di questo le navigazioni successive saranno molto veloci,poiché l'applicazione avrà solo bisogno di aggiornare parzialmente il contenuto della pagina invece di ricaricarla interamente.

- Una multi-page SSG caricherà una nuova pagina ogni navigazione. Il lato positivo è che verrà caricato il solo JS necessario - o potrebbe non caricare JS se tutte le pagine caricate non hanno interazioni! Multi framework per la creazione di multi-page SSG come [Astro](https://astro.build/) possiedono il supporto per un "partial hydration" (sostituzione parziale) - questo permette di creare con le componenti Vue delle "zone" interattive all'interno del HTML statico.

Le applicazioni Single-page SSG è la migliore soluzione se ti aspetti un interazione significativa, gestione della sessione o elementi persistenti / stato applicativo cross navigazione. Altrimenti, le applicazioni multi-page SSG saranno la scelta migliore.

Il team di Vue mantiene anche uno static-site generator chiamato [VitePress](https://vitepress.dev/), su cui è costruito questo sito Web che stai leggendo in questo momento! VitePress supporto tutte e due le tipologie. Anche [Nuxt](https://nuxt.com/) le supporta entrambe. Ogni applicazione Nuxt consente per ogni rotta configurata di decidere quale delle due tipologie utilizzare, SSR e SSG.

## Oltre al web {#beyond-the-web}

Sebbene Vue sia progettato principalmente per la creazione di applicazioni web, non è limitato ad esso. Puoi:

- Creare applicazioni desktop con [Electron](https://www.electronjs.org/) o [Tauri](https://tauri.studio/en/)
- Creare applicazioni mobile con [Ionic Vue](https://ionicframework.com/docs/vue/overview)
- Creare applicazioni desktop e mobile dallo stesso codice sorgente con [Quasar](https://quasar.dev/)
- Utilizzare Vue come [Custom Renderer API](/api/custom-renderer) per creare targeting renderer personalizzati [WebGL](https://troisjs.github.io/) o anche per [il terminale](https://github.com/vue-terminal/vue-termui)!
