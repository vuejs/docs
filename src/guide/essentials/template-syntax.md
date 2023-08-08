# La Sintassi del Template {#template-syntax}

Vue utilizza una sintassi di template basata su HTML che ti permette in maniera dichiarativa di legare il DOM renderizzato con i dati dell'istanza del componente sottostante. Tutti i template Vue sono HTML sintatticamente valido che possono essere letti da parser e da browser conformi alle specifiche HTML.

Sotto il cofano, Vue compila i template in codice JavaScript altamente ottimizzato. Combinato con il sistema di reattività, Vue può capire in maniera intelligente il numero minimo di componenti da ri-renderizzare e applicare il minimo numero di modifiche al DOM quando cambia lo stato dell'app.

Se hai familiarità con i concetti del Virtual DOM e preferisci la potenza di JavaScript, con il supporto opzionale a JSX, puoi anche [scrivere direttamente le render function](/guide/extras/render-function) invece dei template. Tuttavia, nota che non godono dello stesso livello di ottimizzazioni durante la compilazione dei template.

## Interpolazione del Testo {#text-interpolation}

La forma più basilare di data binding è l'interpolazione del testo utilizzando la sintassi "Mustache" (doppie parentesi graffe):

```vue-html
<span>Messaggio: {{ msg }}</span>
```

Il tag mustache verrà sostituito con il valore della proprietà msg [dall'istanza del componente corrispondente](/guide/essentials/reactivity-fundamentals#declaring-reactive-state). Sarà anche aggiornato ogni volta che la proprietà msg cambia.

## HTML puro {#raw-html}

Le doppie parentesi graffe interpretano i dati come testo normale, non HTML. Per produrre vero HTML, avrai bisogno di utilizzare la [direttiva `v-html`](/api/built-in-directives#v-html):

```vue-html
<p>Usando l'interpolazione del testo: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

<script setup>
  const rawHtml = '<span style="color: red">Questo dovrebbe essere rosso.</span>'
</script>

<div class="demo">
  <p>Usando l'interpolazione del testo: {{ rawHtml }}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
</div>

Qui incontriamo qualcosa di nuovo. L'attributo `v-html` che vedi qui sopra si chiama **direttiva** (directive). Le direttive sono prefissate con `v-` per indicare che sono attributi speciali forniti da Vue, e come avrai indovinato, applicano un comportamento reattivo speciale al DOM renderizzato. Con questo codice stiamo dicendo "Mantieni l'HTML interno di questo elemento sempre aggiornato con la proprietà `rawHtml` dell'istanza attiva corrente".

Il contenuto dello `span` verrà sostituito con il valore della proprietà rawHtml e interpretato come HTML grezzo - i data binding saranno ignorati. Nota che non è possibile utilizzare `v-html` per comporre frammenti di template, poiché Vue non è un motore di templating basato su stringhe. Si preferisce, invece, l'uso dei componenti come unità fondamentali per la riutilizzazione e la composizione dell'interfaccia utente.

:::warning Avviso di Sicurezza
La renderizzazione dinamica di HTML arbitrario sul tuo sito web può essere molto pericolosa in quanto può facilmente portare a [vulnerabilità XSS](https://en.wikipedia.org/wiki/Cross-site_scripting). Utilizza `v-html` solo su contenuti di fiducia e **mai** su contenuti forniti dall'utente.
:::

## Associazioni di Attributi (binding) {#attribute-bindings}

Le parentesi graffe non possono essere utilizzate all'interno degli attributi HTML. Si può usare, invece, la [direttiva `v-bind`](/api/built-in-directives#v-bind):

```vue-html
<div v-bind:id="dynamicId"></div>
```

La direttiva `v-bind` indica a Vue di mantenere sincronizzato l'attributo `id` dell'elemento  con  la proprietà dinamica `dynamicId` del componente. Se il valore associato è `null` o `undefined`, l'attributo verrà rimosso dall'elemento renderizzato.

### Forma abbreviata {#shorthand}

dato che `v-bind` è utilizzato così di frequente, ha una sintassi abbreviata dedicata:

```vue-html
<div :id="dynamicId"></div>
```

Gli attributi che iniziano con `:` possono sembrare un po' diversi dall'HTML normale, ma in realtà è un carattere valido per i nomi degli attributi e tutti i browser supportati da Vue possono analizzarlo correttamente. Non appaiono, inoltre, nel markup finale renderizzato. La sintassi abbreviata è opzionale, ma probabilmente la apprezzerai quando imparerai qualcosa in più sul suo utilizzo più avanti.

> Per il resto della guida, negli esempi di codice utilizzeremo la sintassi abbreviata, dato che è l'uso più comune per gli sviluppatori Vue.

### Attributi Booleani {#boolean-attributes}

Gli [Attributi Booleani](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes) sono attributi che possono indicare valori veri / falsi con la loro presenza su un elemento. Ad esempio,[`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) è uno degli attributi booleani più comunemente utilizzati.

In questo caso `v-bind` funziona un po' diversamente:

```vue-html
<button :disabled="isButtonDisabled">Button</button>
```

L'attributo `disabled` sarà incluso se `isButtonDisabled` ha un [valore truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy). Sarà incluso anche se il valore è una stringa vuota, mantenendo la coerenza con `<button disabled="">`. Per altri [valori falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) l'attributo sarà omesso.

### Associazione Dinamica di Attributi Multipli {#dynamically-binding-multiple-attributes}

Se hai un oggetto JavaScript che rappresenta attributi multipli che assomiglia a questo:

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

Puoi associarli a un singolo elemento utilizzando `v-bind` senza un argomento:

```vue-html
<div v-bind="objectOfAttrs"></div>
```

## Utilizzo delle Espressioni JavaScript {#using-javascript-expressions}

Finora abbiamo associato nei nostri template solo semplici chiavi di proprietà ma, all'interno di tutti i data binding, Vue supporta tutta la potenza delle espressioni JavaScript:

```vue-html
{{ number + 1 }}

{{ ok ? 'SI' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

Queste espressioni verranno valutate come JavaScript nello scope dei dati nell'istanza del componente corrente.

Nei template Vue le espressioni JavaScript possono essere utilizzate nelle seguenti posizioni:

- All'interno delle interpolazioni di testo (mustache)
- Nel valore dell'attributo di qualsiasi direttiva Vue (attributi speciali che iniziano con `v-`)

### Singole espressioni {#expressions-only}

Un'espressione è un pezzo di codice che può essere valutato per ottenere un valore. Un semplice test è verificare se può essere utilizzato dopo `return`.

Pertanto, il seguente codice **NON** funzionerà:

```vue-html
<!-- questa è un'istruzione, non un'espressione: -->
{{ var a = 1 }}

<!-- nemmeno il controllo di flusso funzionerà , usa espressioni ternarie -->
{{ if (ok) { return message } }}
```

### Chiamata di Funzioni {#calling-functions}

È possibile chiamare un metodo esposto da un componente all'interno di un'espressione di binding:

```vue-html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

:::tip
Le funzioni chiamate all'interno delle espressioni di binding verranno chiamate ogni volta che il componente si aggiorna, quindi accertati che non abbiano alcun effetto collaterale, come modificare i dati o innescare operazioni asincrone.
:::

### Accesso Limitato alle Globali {#restricted-globals-access}

Le espressioni del template sono isolate e hanno accesso solo a una [lista limitata delle Globali](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsAllowList.ts#L3). La lista espone le globali native usate comunemente come `Math` e `Date`.

Le Globali (oggetti, funzioni) non incluse nella lista, ad esempio le proprietà aggiunte dall'utente alla `window`, non saranno accessibili nelle espressioni del template. Puoi comunque definire esplicitamente delle globali aggiuntive per tutte le espressioni di Vue, aggiungendole a [`app.config.globalProperties`](/api/application#app-config-globalproperties).

## Le Direttive {#directives}

Le direttive sono attributi speciali con il prefisso `v-`. Vue fornisce un numero di [direttive native](/api/built-in-directives), tra cui `v-html` e `v-bind` che abbiamo introdotto in precedenza.

I valori degli attributi delle direttive dovrebbero essere singole espressioni JavaScript (ad eccezione di `v-for`, `v-on` e `v-slot`, che saranno presentati nell relative sezioni in seguito). Il compito di una direttiva è applicare reattivamente gli aggiornamenti al DOM quando il valore della sua espressione cambia.  Prendiamo come esempio [`v-if`](/api/built-in-directives#v-if):

```vue-html
<p v-if="seen">Ora mi vedi</p>
```

Qui, la direttiva `v-if` può rimuovere / inserire l'elemento `<p>` in base alla veridicità del valore dell'espressione `seen`.

### Arguments {#arguments}

Alcune direttive possono accettare un "argomento", indicato da due punti dopo il nome della direttiva. Ad esempio, la direttiva `v-bind` viene utilizzata per aggiornare in maniera reattiva un attributo HTML:

```vue-html
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>
```

Qui `href` è l'argomento, che indica alla direttiva `v-bind` di collegare l'attributo `href` dell'elemento al valore dell'espressione `url`. Nella forma abbreviata, tutto ciò che precede l'argomento (cioè `v-bind:`) è condensato in un singolo carattere `:`.

Un altro esempio è la direttiva `v-on` che ascolta gli eventi del DOM:

```vue-html
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>
```

Qui l'argomento è il nome dell'evento da ascoltare: `click`. `v-on` ha una corrispondente forma abbreviata, ovvero il carattere `@`. Più avanti parleremo nel dettaglio anche della gestione degli eventi.

### Argomenti Dinamici {#dynamic-arguments}

È possibile utilizzare anche un'espressione JavaScript come argomento di direttiva, racchiudendola tra parentesi quadre:

```vue-html
<!--
Nota che ci sono alcune limitazioni all'uso di espressioni nell'argomento,
come spiegato nelle sezioni "Vincoli sul Valore dell'Argomento Dinamico" e "Vincoli sulla Sintassi dell'Argomento Dinamico" qui sotto.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

Qui `attributeName` verrà valutato dinamicamente come un'espressione JavaScript e il suo valore generato verrà utilizzato come valore finale per l'argomento. Ad esempio, se l'istanza del tuo componente ha una proprietà dati, `attributeName`, il cui valore è `"href"`, allora questo binding sarà equivalente a `v-bind:href`.

Allo stesso modo puoi utilizzare argomenti dinamici per collegare un handler (gestore) ad un nome di evento dinamico:

```vue-html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething">
```

In questo esempio, quando il valore di `eventName` è `"focus"`, `v-on:[eventName]` sarà equivalente a `v-on:focus`.

#### Vincoli sul Valore dell'Argomento Dinamico {#dynamic-argument-value-constraints}

Gli argomenti dinamici si aspettano di ricevere (valutare) una stringa, con l'eccezione di `null`. Il valore speciale `null` può essere utilizzato per rimuovere esplicitamente il binding. Qualsiasi altro valore non stringa causerà un avviso.

#### Vincoli sulla Sintassi dell'Argomento Dinamico {#dynamic-argument-syntax-constraints}

Le espressioni degli argomenti dinamici hanno alcuni vincoli di sintassi perché alcuni caratteri, come spazi e virgolette, non sono validi all'interno dei nomi degli attributi HTML. Ad esempio, il seguente codice è non valido:

```vue-html
<!-- Questo causerà un avviso (warning) del compilatore.  -->
<a :['foo' + bar]="value"> ... </a>
```

Se hai bisogno di passare un argomento dinamico complesso, è probabilmente meglio utilizzare una [computed property](./computed), che tratteremo a breve.

Quando si utilizzano template in-DOM (template scritti direttamente in un file HTML), si dovrebbe anche evitare di nominare le chiavi con caratteri maiuscoli, poiché i browser convertiranno i nomi degli attributi in minuscolo:

```vue-html
<a :[someAttr]="value"> ... </a>
```

Il codice qui sopra verrà convertito in `:[someattr]` nei template in-DOM. Se il tuo componente ha una proprietà `someAttr` invece di `someattr`, il tuo codice non funzionerà. I template all'interno dei Componenti Single-File **non** sono soggetti a questo vincolo.

### Modificatori {#modifiers}

I modificatori sono speciali suffissi, contrassegnati da un punto, che indicano ad una direttiva di comportarsi in maniera particolare. Ad esempio, il modificatore `.prevent` indica alla direttiva `v-on` di usare `event.preventDefault()` sull'evento innescato:

```vue-html
<form @submit.prevent="onSubmit">...</form>
```

Vedrai altri esempi di modificatori più avanti, [per `v-on`](./event-handling#event-modifiers) e [per `v-model`](./forms#modifiers), quando esploreremo queste funzionalità.

Ecco, infine, la sintassi completa della direttiva visualizzata:

![grafico della sintassi della direttiva](./images/directive.png)

<!-- https://www.figma.com/file/BGWUknIrtY9HOmbmad0vFr/Directive -->
