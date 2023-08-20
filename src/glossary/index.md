# Glossario {#glossary}

Questo glossario ha lo scopo di fornire una guida al significato dei termini tecnici usati abitualmente quando si parla di Vue. È pensato per *descrivere* come questi termini vengano utilizzati di solito, non per essere una *prescrizione* di come dovrebbero essere utilizzati. Alcuni termini potrebbero avere significati o sfumature leggermente diverse a seconda del contesto che li circonda.

[[TOC]]

## componente asincrono {#async-component}

Un *componente asincrono* (*async component*) è un contenitore che racchiude un altro componente e che permette al componente racchiuso di essere caricato in modo "lazy" (lazy loaded, "pigro"). Questo metodo viene utilizzato tipicamente per ridurre la dimensione dei file `.js` generati, permettendo di suddividerli in frammenti più piccoli che vengono caricati solo quando necessario.

Vue Router ha una funzionalità simile per il [caricamento lazy dei route components](https://router.vuejs.org/guide/advanced/lazy-loading.html), anche se questa, in effetti, non utilizza la funzionalità degli async components di Vue.

Per maggiori dettagli consulta:
- [Guida - Componenti asincroni](/guide/components/async.html)

## macro del compilatore {#compiler-macro}

Una *macro del compilatore* (*compiler macro*) è un codice speciale che viene elaborato da un compilatore e convertito in qualcos'altro. Si tratta effettivamente di un modo intelligente di sostituzione di stringhe.

Il compilatore [SFC](#single-file-component) di Vue supporta varie macro, come `defineProps()`, `defineEmits()` e `defineExpose()`. Queste macro sono progettate con l'intenzione di sembrare delle normali funzioni JavaScript, così da poter sfruttare lo stesso parser e gli strumenti di type inference di JavaScript/TypeScript. Tuttavia, non sono delle vere funzioni che vengono eseguite nel browser. Si tratta di stringhe speciali che il compilatore rileva e sostituisce con il vero codice JavaScript che verrà effettivamente eseguito.

Le macro hanno delle limitazioni sul loro uso che non si applicano al normale codice JavaScript. Ad esempio, potresti pensare che `const dp = defineProps` ti permetta di creare un alias per `defineProps`, ma ciò si tradurrebbe in un errore. Ci sono delle limitazioni anche sui valori che possono essere passati a `defineProps()`, poiché gli 'argomenti' devono essere elaborati dal compilatore e non a runtime.

Per maggiori dettagli consulta:
- [`<script setup>` - `defineProps()` & `defineEmits()`](/api/sfc-script-setup.html#defineprops-defineemits)
- [`<script setup>` - `defineExpose()`](/api/sfc-script-setup.html#defineexpose)

## componente {#component}

Il termine *componente* (*component*) non è esclusivo di Vue. È comune a molti framework UI. Descrive una parte della UI, come un pulsante o una casella di spunta. I componenti possono anche essere combinati per formare componenti più grandi.

I componenti sono il principale meccanismo fornito da Vue per suddividere un'interfaccia utente in parti più piccole, sia per migliorare la manutenibilità sia per permettere il riutilizzo del codice.

Un componente Vue è un oggetto. Tutte le proprietà sono opzionali, ma è richiesto o un template o una render function (funzione di rendering) affinché il componente possa essere visualizzato. Ad esempio, l'oggetto seguente potrebbe essere un componente valido:

```js
const HelloWorldComponent = {
  render() {
    return 'Ciao Mondo!'
  }
}
```

In pratica, la maggior parte delle applicazioni Vue sono scritte usando [Componenti Single-File](#single-file-component) (file `.vue`). Anche se questi componenti potrebbero non sembrare oggetti a prima vista, il compilatore SFC li convertirà in un oggetto, che verrà utilizzato come export predefinito per il file. Visto dall'esterno, un file `.vue` è solo un modulo ES che esporta un oggetto del componente.

Le proprietà di un oggetto del componente sono solitamente chiamate *opzioni*. Da qui il nome [Options API](#options-api).

Le opzioni per un componente definiscono come dovrebbero essere create le istanze di quel componente. I componenti sono concettualmente simili alle classi, anche se Vue non usa vere classi JavaScript per definirli.

Il termine componente può anche essere utilizzato in modo più generico per riferirsi alle istanze dei componenti.

Per maggiori dettagli consulta:
- [Guida - Nozioni base sui Componenti](/guide/essentials/component-basics.html)

La parola 'componente' appare anche in vari altri termini:
- [componente asincrono](#async-component)
- [componente dinamico](#dynamic-component)
- [componente funzionale](#functional-component)
- [Web Component](#web-component)

## composable {#composable}

Il termine *composable* descrive un patter molto comune in Vue. Non è una caratteristica separata di Vue, ma solo un modo di utilizzare la [Composition API](#composition-api) del framework.

* Un composable è una funzione.
* I composables sono usati per incapsulare e riutilizzare la logica stateful.
* Il nome della funzione di solito inizia con `use`, in modo che gli altri sviluppatori sappiano che è un composable.
* Ci si aspetta che la funzione venga chiamata durante l'esecuzione sincrona della funzione `setup()` di un componente (o, in modo equivalente, durante l'esecuzione di un blocco `<script setup>`). Questo collega l'invocazione del composable al contesto del componente corrente, ad es. tramite chiamate a `provide()`, `inject()` o `onMounted()`.
* I composables di solito restituiscono un oggetto semplice, non un oggetto reattivo. Questo oggetto di solito contiene refs e funzioni ed è previsto che venga destrutturato all'interno del codice chiamante.

Come per molti modelli, possono esserci delle divergenze sull'applicare o meno un'etichetta a un determinato codice. Non tutte le utility functions JavaScript sono composables. Se una funzione non utilizza la Composition API, probabilmente non è un composable. Se non ci si aspetta che venga chiamata durante l'esecuzione sincrona di `setup()`, probabilmente non è un composable. I composables sono usati specificamente per incapsulare la logica stateful (con stato), non sono solo una convenzione per etichettare le funzioni.

Consulta [Guida - I Composables](/guide/reusability/composables.html) per ulteriori dettagli sulla scrittura di composables.

## Composition API {#composition-api}

La *Composition API* è una raccolta di funzioni utilizzate per scrivere componenti e composables in Vue.

Il termine viene anche usato per descrivere uno dei due principali stili utilizzati per scrivere componenti, mentre l'altro sarebbe l'[Options API](#options-api). I componenti scritti utilizzando la Composition API usano o `<script setup>` o una funzione `setup()` esplicita.

Consulta le [FAQ sulla Composition API](/guide/extras/composition-api-faq) per ulteriori dettagli.

## elemento personalizzato {#custom-element}

Un *elemento personalizzato* (*custom element*) è una caratteristica dello standard dei [Web Components](#web-component), che è implementato nei moderni browser web. Si riferisce alla capacità di utilizzare un elemento HTML personalizzato nel proprio markup HTML per includere un Web Component in quel punto della pagina.

Vue ha il supporto nativo per la resa di elementi personalizzati e permette di utilizzarli direttamente nei template dei componenti Vue.

Gli elementi personalizzati non devono essere confusi con la capacità di includere componenti Vue come tag all'interno del template di un altro componente Vue. Gli elementi personalizzati sono utilizzati per creare Web Component, non componenti Vue.

Per maggiori dettagli consulta:
- [Guida - Vue e i Web Components](/guide/extras/web-components.html)

## direttiva {#directive}

Il termine *direttiva* (*directive*) si riferisce agli attributi del template che iniziano con il prefisso `v-`, o ai loro equivalenti abbreviati.

Le direttive native includono `v-if`, `v-for`, `v-bind`, `v-on` e `v-slot`.

Vue supporta anche la creazione di direttive personalizzate, anche se sono tipicamente utilizzate solo come una "scappatoia" per manipolare direttamente i nodi del DOM. In generale, le direttive personalizzate non possono essere utilizzate per ricreare la funzionalità delle direttive native.

Per maggiori dettagli consulta:
- [Guida - La Sintassi del Template - Le Directtive](/guide/essentials/template-syntax.html#directives)
- [Guida - Le Direttive Personalizzate](/guide/reusability/custom-directives.html)

## componente dinamico {#dynamic-component}

Il termine *componente dinamico* (*dynamic component*) si riferisce a quei casi in cui la scelta di quale componente figlio renderizzare deve essere fatta dinamicamente. Tipicamente, ciò si ottiene utilizzando `<component :is="type">`.

Un componente dinamico non è un speciale tipo di componente. Qualsiasi componente può essere utilizzato come componente dinamico. È la scelta del componente che è dinamica, non è il componente ad esserlo.

Per maggiori dettagli consulta:
- [Guida - Nozioni base sui Componenti - Componenti Dinamici](/guide/essentials/component-basics.html#dynamic-components)

## effetto {#effect}

Vedi [effetto reattivo](#reactive-effect) e [effetto collaterale](#side-effect).

## evento {#event}

L'uso degli eventi (events) per la comunicazione tra diverse parti di un programma è comune a molte delle diverse aree della programmazione. All'interno di Vue, il termine viene comunemente applicato sia agli eventi nativi degli elementi HTML sia agli eventi dei componenti Vue. La direttiva `v-on` viene utilizzata nei template per ascoltare entrambi i tipi di evento.

Per maggiori dettagli consulta:
- [Guida - La Gestione degli Eventi](/guide/essentials/event-handling.html)
- [Guida - Componenti ed Eventi](/guide/components/events.html)

## fragment {#fragment}

Il termine *fragment* si riferisce a un tipo speciale di [VNode](#vnode) utilizzato come genitore per altri VNode, ma che non renderizza elementi lui stesso.

Il nome deriva dal concetto simile a quello di un [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) nell'API DOM nativa.

I fragment sono utilizzati per supportare componenti con vari 'nodi radice' (root nodes). Sebbene tali componenti possano sembrare avere molteplici radici, dietro le quinte utilizzano un nodo fragment come unica radice, come genitore dei nodi 'radice'.

I fragment vengono anche utilizzati dal compilatore di template come un modo per racchiudere più nodi dinamici, ad es. quelli creati tramite `v-for` o `v-if`. Ciò permette di passare suggerimenti aggiuntivi all'algoritmo di patching del [VDOM](#virtual-dom). Gran parte di ciò è gestito internamente, ma un posto in cui potresti imbatterti in esso è l'uso diretto di una key su un tag `<template>` con `v-for`. In questo scenario, la `key` viene aggiunta come una [prop](#prop) al fragment VNode.

I nodi fragment sono attualmente renderizzati nel DOM come nodi di testo vuoti, anche se questo è un dettaglio implementativo. Potresti incontrare questi nodi di testo se usi `$el` o tenti di esplorare il DOM con le API native del browser.

## componente funzionale {#functional-component}

Una definizione di componente è solitamente un 'oggetto che contiene opzioni'. Potrebbe non apparire in questo modo se stai utilizzando `<script setup>`, ma il componente esportato dal file `.vue` rimarrà comunque un oggetto.

Un *componente funzionale* (*functional component*) è una forma alternativa di componente che viene dichiarata usando una funzione. Tale funzione serve da [funzione di rendering](#render-function)  per il componente.

Un componente funzionale non può avere un proprio stato. Inoltre, non attraversa il normale ciclo di vita del componente, quindi gli hook del ciclo di vita non possono essere utilizzati. Ciò lo rende leggermente più leggero rispetto ai normali componenti stateful.

Per maggiori dettagli consulta:
- [Guida - Le Render Function e JSX - I Componenti Funzionali](/guide/extras/render-function.html#functional-components)

## hoisting {#hoisting}

Il termine *hoisting* è utilizzato per descrivere l'esecuzione di una sezione di codice prima che essa sia raggiunta, prima di altro codice. L'esecuzione viene 'tirata su' in un punto precedente del codice.

JavaScript utilizza l'hoisting per alcuni costrutti, come `var`, `import` e dichiarazioni di funzione.

Nel contesto di Vue, il compiler del template applica lo *static hoisting* per migliorare le prestazioni. Quando si converte un template in una render function, i VNodes che corrispondono a contenuti statici possono essere creati una sola volta e poi riutilizzati. Questi VNodes statici vengono descritti come 'hoisted' perché sono creati al di fuori della funzione di rendering, prima che essa venga eseguita. Una forma simile di hoisting viene applicata agli oggetti o array statici generati dal compiler del template.

Per maggiori dettagli consulta:
- [Guida - Il Meccanismo di Rendering - Static Hoisting](/guide/extras/rendering-mechanism.html#static-hoisting)

## template in-DOM {#in-dom-template}

Ci sono vari modi per specificare un template per un componente. Nella maggior parte dei casi, il template è fornito come stringa.

Il termine *template in-DOM* (*in-DOM template*) si riferisce allo scenario in cui il template viene fornito sotto forma di nodi DOM, anziché come una stringa. Vue quindi converte i nodi DOM in una stringa di template utilizzando `innerHTML`.

Tipicamente, un template in-DOM inizia come markup HTML scritto direttamente nell'HTML della pagina. Il browser poi lo analizza in nodi DOM, che Vue utilizza infine per leggere l'`innerHTML`.

Per maggiori dettagli consulta:
- [Guida - Creare un\'applicazione - Template del Componente Root nel DOM](/guide/essentials/application.html#in-dom-root-component-template)
- [Guida - Nozioni base sui Componenti - Limitazioni nel Parsing dei DOM Template](/guide/essentials/component-basics.html#dom-template-parsing-caveats)
- [Options: Rendering - template](/api/options-rendering.html#template)

## inject {#inject}

Vedi [provide / inject](#provide-inject).

## hook del ciclo di vita {#lifecycle-hooks}

L'istanza di un componente Vue attraversa un ciclo di vita. Ad esempio, viene creata, montata, aggiornata e smontata.

Gli *hook del ciclo di vita* (*lifecycle hooks*) sono un modo per ascoltare questi eventi del ciclo di vita.

Con l'Options API, ogni hook è fornito come un'opzione separata, ad es. `mounted`. La Composition API usa invece funzioni, come `onMounted()`.

Per maggiori dettagli consulta:
- [Guida - Gli Hook del Ciclo di Vita](/guide/essentials/lifecycle.html)

## macro {#macro}

Vedi [macro del compilatore](#compiler-macro).

## named slot {#named-slot}

Un componente può avere più slot, differenziati per nome. Gli slot diversi dallo slot predefinito sono definiti come *named slots* (*slot con nome*).

Per maggiori dettagli consulta:
- [Guida - Gli Slot - Slot con nome](/guide/components/slots.html#named-slots)

## Options API {#options-api}

I componenti Vue sono definiti usando oggetti. Le proprietà di questi oggetti dei componenti sono conosciute come *opzioni*.

I componenti possono essere scritti in due stili. Uno stile utilizza la [Composition API](#composition-api) in combinazione con `setup` (tramite un'opzione `setup()` o tramite `<script setup>`). L'altro stile fa poco uso diretto della Composition API, utilizzando invece varie opzioni del componente per ottenere un risultato simile. Le opzioni dei componenti utilizzate in questo modo sono indicate come *Options API*.

L'Options API include opzioni come `data()`, `computed`, `methods` e `created()`.

Alcune opzioni, come `props`, `emits` e `inheritAttrs`, possono essere utilizzate quando si creano componenti con entrambe le API. Essendo delle opzioni dei componenti, potrebbero essere considerate come parte dell'Options API. Tuttavia, dato che queste opzioni sono anche utilizzate in combinazione con `setup()`, è più utile pensare a loro come condivise tra i due stili di componenti.

La funzione `setup()` di per sé è un'opzione del componente, quindi potrebbe essere descritta come parte dell'Options API. Tuttavia, non è così che il termine 'Options API' viene normalmente usato. La funzione `setup()`, invece, è considerata parte della Composition API.

## plugin {#plugin}

Sebbene il termine *plugin* possa essere utilizzato in una vasta gamma di contesti, Vue ha uno specifico concetto di plugin e cioè come un modo per aggiungere funzionalità a un'applicazione.

I plugin vengono aggiunti a un'applicazione chiamando `app.use(plugin)`. Il plugin stesso è o una funzione o un oggetto che espone una funzione `install`. Tale funzione riceverà l'istanza dell'applicazione e potrà quindi fare ciò che deve fare.

Per maggiori dettagli consulta:
- [Guida - I Plugin](/guide/reusability/plugins.html)

## prop {#prop}

Ci sono tre usi comuni del termine *prop* in Vue:

* Prop del componente
* Prop di VNode
* Prop dello slot

Le *prop del componente* sono ciò a cui la maggioranza pensa come prop. Queste sono esplicitamente definite da un componente utilizzando `defineProps()` o l'opzione `props`.

Le *prop di VNode* (*VNode prop*) si riferiscono alle proprietà dell'oggetto passato come secondo argomento a `h()`. Queste possono includere prop del componente, ma possono anche includere eventi del componente, eventi DOM, attributi DOM e proprietà DOM. Di solito le prop di VNode si possono incontrare se si lavora con funzioni di rendering per manipolare direttamente i VNode.

Le *prop dello slot* sono le proprietà passate a uno 'scoped slot'.

In tutti i casi, le prop sono proprietà che vengono passate da altri punti.

Sebbene la parola prop derivi dalla parola *proprietà*, il termine prop ha un significato molto più specifico nel contesto di Vue. Si dovrebbe evitare di usarlo come abbreviazione di proprietà.

Per maggiori dettagli consulta:
- [Guida - Le Props](/guide/components/props.html)
- [Guida - Le Render Function e JSX](/guide/extras/render-function.html)
- [Guida - Gli Slot - Scoped Slots](/guide/components/slots.html#scoped-slots)

## provide / inject {#provide-inject}

`provide` e `inject` sono una forma di comunicazione tra componenti.

Quando un componente *fornisce* (*provides*) un valore, a quel punto tutti i discendenti di quel componente possono scegliere di 'prendere' quel valore, usando `inject`. A differenza delle prop, il componente che fornisce il valore non sa esattamente quale componente riceverà quel valore.

`provide` e `inject`, a volte, sono utilizzati per evitare il *prop drilling*. Possono anche essere utilizzati come un modo implicito per un componente di comunicare con il contenuto del suo slot.

`provide` può anche essere utilizzato a livello di applicazione, rendendo un valore disponibile a tutti i componenti all'interno di quell'applicazione.

Per maggiori dettagli consulta:
- [Guida - provide / inject](/guide/components/provide-inject.html)

## effetto reattivo {#reactive-effect}

Un *effetto reattivo* (*reactive effect*) fa parte del sistema di reattività di Vue. Si riferisce al processo di monitoraggio delle dipendenze di una funzione e alla ri-esecuzione di quella funzione quando i valori di tali dipendenze cambiano.

`watchEffect()` è il modo più diretto per creare un 'effetto'. Diverse parti di Vue utilizzano internamente gli 'effetti'. Ad es. l'aggiornamento nel rendering dei componenti, `computed()` e `watch()`.

Vue può monitorare le dipendenze reattive solo all'interno di un 'effetto reattivo'. Se il valore di una proprietà viene letto al di fuori di un effetto reattivo, essa 'perderà' la reattività, nel senso che Vue non saprà cosa fare se quella proprietà cambia successivamente.

Il termine deriva da 'effetto collaterale' ('side effect'). L'invocazione di una 'effect function' è un 'effetto collaterale', cioè avviene come conseguenza diretta di una variazione nel valore di una proprietà reattiva.

Per maggiori dettagli consulta:
- [Guida - La Reattività in dettaglio](/guide/extras/reactivity-in-depth.html)

## reattività {#reactivity}

In generale, per *reattività* (*reactivity*) si intende la capacità di eseguire automaticamente azioni in risposta ai cambiamenti dei dati. Ad esempio, aggiornare il DOM o effettuare una richiesta di rete quando il valore di un dato cambia.

Nel contesto di Vue, la reattività viene utilizzata per descrivere una serie di funzionalità. Queste funzionalità si combinano per formare un *sistema di reattività*, reso disponibile tramite la [Reactivity API](#reactivity-api).

Ci sono vari modi in cui un sistema di reattività potrebbe essere implementato. Ad esempio, potrebbe essere realizzato attraverso un'analisi statica del codice per determinare le sue dipendenze. Tuttavia, Vue non utilizza questa forma di sistema di reattività.

Al contrario, il sistema di reattività di Vue tiene traccia dell'accesso alle proprietà a runtime. Lo fa utilizzando sia i 'Proxy wrapper' sia le funzioni getter/setter per le proprietà.

Per maggiori dettagli consulta:
- [Guida - Le basi della Reattività](/guide/essentials/reactivity-fundamentals.html)
- [Guida - La Reattività in dettaglio](/guide/extras/reactivity-in-depth.html)

## Reactivity API {#reactivity-api}

La *Reactivity API* è una raccolta di funzioni core di Vue correlate alla [reattività](#reactivity). Queste possono essere utilizzate indipendentemente dai componenti. Comprende funzioni come `ref()`, `reactive()`, `computed()`, `watch()` e `watchEffect()`.

La Reactivity API è un sottoinsieme della Composition API.

Per maggiori dettagli consulta:
- [API Reactivity: Il Core](/api/reactivity-core.html)
- [API Reactivity: Utilità](/api/reactivity-utilities.html)
- [API Reactivity: Uso Avanzato](/api/reactivity-advanced.html)

## ref {#ref}

> Questa voce riguarda l'uso di `ref` per la reattività. Per l'attributo `ref` utilizzato nei template, vedere i [ref del template](#template-ref).

Un `ref` fa parte del sistema di reattività di Vue. È un oggetto con una singola proprietà reattiva, chiamata `value`.

Ci sono vari tipi diversi di ref. Ad esempio, i ref possono essere creati utilizzando `ref()`, `shallowRef()`, `computed()` e `customRef()`. La funzione `isRef()` può essere utilizzata per verificare se un oggetto è un ref, e `isReadonly()` può essere utilizzata per verificare se il ref permette la riassegnazione diretta del suo valore.

Per maggiori dettagli consulta:
- [Guida - Le basi della Reattività](/guide/essentials/reactivity-fundamentals.html)
- [API Reactivity: Il Core](/api/reactivity-core.html)
- [API Reactivity: Utilità](/api/reactivity-utilities.html)
- [API Reactivity: Uso Avanzato](/api/reactivity-advanced.html)

## render function {#render-function}

Una *render function* (*funzione di rendering*) è la parte di un componente che genera i VNodes utilizzati durante il rendering. I template vengono compilati in funzioni di rendering.

Per maggiori dettagli consulta:
- [Guida - Le Render Function e JSX](/guide/extras/render-function.html)

## scheduler {#scheduler}

Lo *scheduler* (*pianificatore*) è quella parte interna di Vue che controlla il momento in cui vengono eseguiti gli [effetti reattivi](#reactive-effect).

Quando lo stato reattivo cambia, Vue non innesca immediatamente gli aggiornamenti di rendering. Piuttosto, li raggruppa insieme utilizzando una coda. Ciò garantisce che un componente venga ri-renderizzato solo una volta, anche se vengono apportate più modifiche ai dati sottostanti.

[I Watcher](/guide/essentials/watchers.html) vengono anch'essi raggruppati utilizzando la coda dello scheduler. I Watchers con `flush: 'pre'` (impostazione predefinita) verranno eseguiti prima del rendering del componente, mentre quelli con `flush: 'post'` verranno eseguiti dopo il rendering del componente.

I lavori nello scheduler vengono anche utilizzati per eseguire varie altre attività interne, come innescare alcuni [hook del ciclo di vita](#lifecycle-hooks) e aggiornare i [ref del template](#template-ref).

## scoped slot {#scoped-slot}

Il termine *scoped slot* (uno slot con props) si riferisce a uno [slot](#slot) che riceve delle [props](#prop).

Storicamente, Vue faceva una distinzione molto più marcata tra scoped slot e slot non-scoped. In un certo senso, potrebbero essere considerate come due funzionalità separate, unificate da una sintassi di template comune.

In Vue 3, le API degli slot sono state semplificate per far sì che tutti gli slot si comportino come *scoped slot*. Tuttavia, i modi di impiegare gli scoped slot e i non-scoped spesso differiscono, quindi, il termine risulta ancora utile come modo per riferirsi a 'slot con props'.

Le props passate a uno slot possono essere utilizzate solo all'interno di una specifica area del template genitore, responsabile della definizione dei contenuti dello slot. Questa area del template si comporta come uno scope 'variabile' per le props, da cui il nome 'scoped slot'.

Per maggiori dettagli consulta:
- [Guida - Gli Slot - Scoped Slots](/guide/components/slots.html#scoped-slots)

## SFC {#sfc}

Vedi [Componente Single-File](#single-file-component).

## effetto collaterale {#side-effect}

Il termine *effetto collaterale* (*side effect*) non è specifico di Vue. Viene utilizzato per descrivere operazioni o funzioni che fanno qualcosa oltre il loro 'scope' locale (local scope).

Ad esempio, quando si verifica la modifica di una proprietà come `user.name = null`, ci si aspetta che ciò modifichi solo il valore di `user.name`. Se, oltre a ciò, compie altre operazioni, come innescare il sistema di reattività di Vue, tale operazione viene definita come un 'effetto collaterale'. Ciò porta all'origine del termine [effetto reattivo](#reactive-effect) all'interno di Vue.

Quando si dice che una funzione ha 'effetti collaterali', significa che la funzione esegue una qualsiasi azione che è osservabile al di fuori della funzione, oltre al semplice ritorno di un valore. Ciò potrebbe voler dire che aggiorna un valore nello stato o attiva una richiesta di rete.

Il termine è spesso utilizzato quando si descrivono il rendering o le computed property. È considerata una buona pratica che il rendering non abbia effetti collaterali. Allo stesso modo, la funzione getter per una computed property non dovrebbe avere effetti collaterali.

## Componente Single-File {#single-file-component}

Il termine *Componente Single-File*, o SFC *Single-File Component*, si riferisce al formato di file `.vue` comunemente utilizzato per i componenti Vue.

Vedi anche:
- [Guida - I Componenti Single-File](/guide/scaling-up/sfc.html)
- [SFC Specifiche della Sintassi](/api/sfc-spec.html)

## slot {#slot}

Gli *slot* vengono utilizzati per passare contenuti ai componenti figli. Mentre le props vengono utilizzate per passare valori di dati, gli slot sono utilizzati per passare contenuti più ricchi composti da elementi HTML e altri componenti Vue.

Per maggiori dettagli consulta:
- [Guida - Gli Slot](/guide/components/slots.html)

## ref del template {#template-ref}

Il termine *ref del template* (*template ref*) si riferisce all'uso di un attributo `ref` su un tag all'interno di un template. Dopo il rendering del componente, questo attributo viene utilizzato per popolare una proprietà corrispondente con o l'elemento HTML o l'istanza del componente corrispondente al tag nel template.

Se stai utilizzando l'Options API, i refs sono esposti tramite le proprietà dell'oggetto `$refs`.

Con la Composition API, i ref del template popolano un [ref](#ref) reattivo con lo stesso nome.

I ref del template non dovrebbero essere confusi con i ref reattivi presenti nel sistema di reattività di Vue.

Per maggiori dettagli consulta:
- [Guida - Template Refs](/guide/essentials/template-refs.html)

## VDOM {#vdom}

Vedi [DOM virtuale](#virtual-dom).

## DOM virtuale {#virtual-dom}

Il termine *DOM virtuale* (VDOM, *virtual DOM*) non è unico di Vue. È un approccio comune utilizzato da diversi framework web per gestire gli aggiornamenti dell'UI.

I browser utilizzano un albero di nodi per rappresentare lo stato attuale della pagina. Quell'albero, e le API JavaScript utilizzate per interagire con esso, sono chiamate *document object model*, o *DOM*.

Manipolare il DOM rappresenta un significativo collo di bottiglia in termini di prestazioni. Il DOM virtuale offre una strategia per affrontare questo problema.

Piuttosto che creare direttamente dei nodi DOM, i componenti Vue generano una descrizione di quali nodi DOM dovrebbero esserci. Queste descrizioni (descriptors) sono semplici oggetti JavaScript, noti come VNode (nodi DOM virtuali). Creare VNodes è relativamente economico.

Ogni volta che un componente viene di nuovo renderizzato, il nuovo albero di VNodes viene confrontato con l'albero precedente di VNodes e le differenze vengono quindi applicate al vero DOM. Se nulla è cambiato, non è necessario toccare il DOM.

Vue utilizza un approccio ibrido che chiamiamo [Compiler-Informed Virtual DOM](/guide/extras/rendering-mechanism.html#compiler-informed-virtual-dom). Il compilatore di template di Vue è in grado di applicare ottimizzazioni delle prestazioni basate sull'analisi statica del template. Piuttosto che effettuare un confronto completo degli alberi VNode vecchi e nuovi di un componente a runtime, Vue può utilizzare le informazioni estratte dal compilatore per ridurre il confronto solo alle parti dell'albero che possono effettivamente cambiare.

Per maggiori dettagli consulta:
- [Guida - Il Meccanismo di Rendering](/guide/extras/rendering-mechanism.html)
- [Guida - Le Render Function e JSX](/guide/extras/render-function.html)

## VNode {#vnode}

Un *VNode* è un *nodo DOM virtuale*. Possono essere creati utilizzando la funzione [`h()`](/api/render-function.html#h).

Vedi [DOM virtuale](#virtual-dom) per ulteriori informazioni.

## Web Component {#web-component}

Lo standard *Web Components* è una raccolta di caratteristiche implementate nei moderni browser web.

I componenti Vue non sono Web Components, ma `defineCustomElement()` può essere utilizzato per creare un [elemento personalizzato](#custom-element) da un componente Vue. Vue supporta anche l'uso di elementi personalizzati all'interno dei componenti Vue.

Per maggiori dettagli consulta:
- [Guida - Vue e i Web Components](/guide/extras/web-components.html)
