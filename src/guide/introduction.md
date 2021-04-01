# Introduzione

::: tip NOTE
Conosci già Vue 2 e vuoi solo sapere cosa c'è di nuovo in Vue 3? Leggi la [Guida alla Migrazione](/guide/migration/introduction.html)!
:::

## Cos'è Vue.js?

Vue (pronunciato /vjuː/, come **viu**) è un **framework progressivo** per lo sviluppo di interfaccie grafiche. Diversamente da altri framework monolitici, Vue è progettato dalla base per essere adottabile in modo incrementale. La libreria core si concentra solo sul view layer, ed è semplice da imparare ed integrare con altre librerie o progetti già esistenti. D'altro canto, quando utilizzato insieme a [strumenti moderni](../guide/single-file-component.html) e [librerie di supporto](https://github.com/vuejs/awesome-vue#components--libraries), Vue è anche perfettamente capace di far funzionare Single-Page Applications sofisticate.

Se vuoi saperne di più su Vue prima di continuare la lettura, abbiamo <a id="modal-player" class="vuemastery-trigger"  href="#">creato un video</a> che ne illustra i prinicipi alla base e un progetto di esempio.

<VideoLesson href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3" title="Guarda un video corso gratuito su Vue Mastery">Guarda un video corso gratuito su Vue Mastery</VideoLesson>

<common-vuemastery-video-modal/>

## Primi passi

<p>
  <ActionLink class="primary" url="installation.html">
    Installazione
  </ActionLink>
</p>

::: tip
La guida ufficiale presuppone una conoscenza intermedia di HTLM, CSS e JavaScript. Se questo è il tuo primo approccio allo sviluppo frontend, potrebbe non essere una buona idea cominciare direttamente con un framework come primo passo - apprendi le basi e poi torna quì. Esperienza pregressa con altri framework aiuta, ma non è richiesta.
:::

Il modo più semplice per provare Vue.js è usare [l'esempio Hello World](https://codepen.io/team/Vue/pen/KKpRVpx). Sentiti libero di aprirlo in un'altra finestra e consultarlo mentre illustriamo qualche semplice esempio.

La pagina di [Installazione](installation.md) fornisce più opzioni per installare Vue. Nota: **non** raccomandiamo che i principianti comincino con la `vue-cli`, specialmente se non ancora familiari con strumenti di build basati su Node.js.

## Rendering Dichiarativo

Alla base Vue.js è un sistema che ti permette di fare rendering sul DOM in modo dichiarativo, utilizzando una sintassi di templating semplice:

```html
<div id="counter">
  Counter: {{ counter }}
</div>
```

```js
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')
```

Abbiamo appena creato la nostra prima app Vue! Sembrerebbe un semplice rendering di stringhe, ma Vue sotto al cofano sta lavorando per noi. I dati e il DOM ora sono collegati, e ora tutto è **reattivo**. Come lo sappiamo? Guarda l'esempio quì sotto dove la proprietà `counter` incrementa ogni secondo e vedrai come il DOM renderizzato cambia:

```js{8-10}
const CounterApp = {
  data() {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
```

<FirstExample />

Oltre all'interpolazione del testo, possiamo anche fare il bind degli attributi dell'elemento in questo modo:

```html
<div id="bind-attribute">
  <span v-bind:title="message">
    Sposta il puntatore su di me per qualche secondo per vedere il mio titolo
    determinato dinamicamente!
  </span>
</div>
```

```js
const AttributeBinding = {
  data() {
    return {
      message: 'Hai caricato questa pagina in data ' + new Date().toLocaleString()
    }
  }
}

Vue.createApp(AttributeBinding).mount('#bind-attribute')
```

<common-codepen-snippet title="Binding dinamico degli attributi" slug="KKpRVvJ" />

Quì incontriamo qualcosa di nuovo. L'attributo `v-bind` che vedi si chiama **directive**. Le direttive hanno il prefisso `v-` per indicare che sono attributi speciali forniti da Vue, e come avrai intuito, applicano un comportamento reattivo al DOM. Quì stiamo praticamente dicendo "_mantieni l'attributo `title` di questo elemento aggiornato con la proprietà `message` dell'istanza attualmente attiva._"

## Gestione dell'Input Utente

Per permettere agli utenti di interagire con la tua applicazione, possiamo usare la direttiva `v-on` per agganciare degli event listeners che invocano metodi sulle nostre istanze:

```html
<div id="event-handling">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Messaggio al contrario</button>
</div>
```

```js
const EventHandling = {
  data() {
    return {
      message: 'Hello Vue.js!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message
        .split('')
        .reverse()
        .join('')
    }
  }
}

Vue.createApp(EventHandling).mount('#event-handling')
```

<common-codepen-snippet title="Event handling" slug="dyoeGjW" />

Nota che in questo metodo aggiorniamo lo state della nostra applicazione senza toccare il DOM - tutte le manipolazioni del DOM sono gestite da Vue, e il nostro codice si concentra solo sulla logica sottostante.

Vue fornisce anche la direttiva `v-model` che rende il binding a due vie tra l'input del form e lo state dell'applicazione un gioco da ragazzi:

```html
<div id="two-way-binding">
  <p>{{ message }}</p>
  <input v-model="message" />
</div>
```

```js
const TwoWayBinding = {
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}

Vue.createApp(TwoWayBinding).mount('#two-way-binding')
```

<common-codepen-snippet title="Binding a due vie" slug="poJVgZm" />

## Condizionali e Cicli

È semplice anche attivare e disattivare la presenza di un elmento:

```html
<div id="conditional-rendering">
  <span v-if="seen">Ora mi vedi</span>
</div>
```

```js
const ConditionalRendering = {
  data() {
    return {
      seen: true
    }
  }
}

Vue.createApp(ConditionalRendering).mount('#conditional-rendering')
```

Questo esempio dimostra che possiamo fare il bind di dati non solo a testi e attributi, ma anche alla **struttura** del DOM. Inoltre, Vue fornisce anche un potente sistema di effetti sulle transizioni che può applicare automaticamente [effetti di transizione](transitions-enterleave.md) quando gli elementi sono inseriti/aggiornati/rimossi da Vue.

Puoi cambiare `seen` da `true` a `false` nella sandbox quì sotto per vedere l'effetto:

<common-codepen-snippet title="Rendering condizionale" slug="oNXdbpB" tab="js,result" />

Ci sono molte altre direttive, ognuna con la propria funzionalità. Per esempio, la direttiva `v-for` può essere usata per mostrare una lista di elementi usando i dati di un array:

```html
<div id="list-rendering">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
const ListRendering = {
  data() {
    return {
      todos: [
        { text: 'Imparare JavaScript' },
        { text: 'Imparare Vue' },
        { text: 'Sviluppare qualcosa di fantastico' }
      ]
    }
  }
}

Vue.createApp(ListRendering).mount('#list-rendering')
```

<common-codepen-snippet title="Rendering di liste" slug="mdJLVXq" />

## Composizione dei Componenti

Il sistema di componenti è un altro concetto importante in Vue, perchè è un'astrazione che ci permette di sviluppare applicazioni di larga scala composte da componenti piccole, autonome e spesso riutilizzabili. Riflettendoci, l'interfaccia di quasi ogni tipo di applicazione può essere astratta in un albero di componenti:

![Albero dei componenti](/images/components.png)

In Vue, un componente è essenzialmente un'instanza con delle options pre-definite. Registrare un componente in Vue è un gioco da ragazzi: creiamo un oggetto componente come abbiamo fatto per l'oggetto `App` e lo definiamo nell'option `components` del padre:

```js
// Crea un'applicazione Vue
const app = Vue.createApp(...)

// Definisce un nuovo componente chiamato todo-item
app.component('todo-item', {
  template: `<li>This is a todo</li>`
})

// Esegue il mount dell'applicazione Vue
app.mount(...)
```

Ora lo puoi comporre nel template di un altro componente:

```html
<ol>
  <!-- Crea un'istanza del componente todo-item -->
  <todo-item></todo-item>
</ol>
```

Ma questo renderizzerebbe lo stesso testo per ogni todo, cosa non molto interessante. Dovremmo essere capaci di passare dati dallo scope del padre al componente figlio. Modifichiamo la definizione del componente per permettergli di accettare una [prop](component-basics.html#passing-data-to-child-components-with-props):

```js
app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})
```

Ora possiamo passare il todo in ogni componente ripetuto usando `v-bind`:

```html
<div id="todo-list-app">
  <ol>
    <!--
      Ora stiamo fornendo ad ogni todo-item l'oggetto todo che sta 
      rappresentando, in modo che il suo contenuto possa essere dinamico.
      Dobbiamo inoltre fornire ad ogni componente una "key",
      che spiegheremo più in là.
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
const TodoList = {
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}

const app = Vue.createApp(TodoList)

app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})

app.mount('#todo-list-app')
```

<common-codepen-snippet title="Intro-Components-1" slug="VwLxeEz" />

Questo è un esempio artificioso, ma siamo riusciti a separare la nostra app in unità più piccole, e il figlio ha un coupling ragionevolemnte basso dal padre, grazie all'interfaccia props. Ora possiamo ulteriormente migliorare il nostro componente `<todo-item>` con un template e una logica più complesse senza avere ripercussioni sull'applicazione padre. 

In un'applicazione di larga scala, è necessario dividere l'intera applicazione in componenti per rendere lo sviluppo gestibile. Analizzeremo meglio i componenti [più avanti nella guida](component-basics.md), ma per ora quì puoi vedere un esempio (immaginario) dell'aspetto che il template di un'applicazione con componenti può avere:

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

### Relazione con i Custom Elements

Potresti aver notato che i componenti Vue sono molto simili ai **Custom Elements**, che sono parte della [Specifica Web Components](https://www.w3.org/wiki/WebComponents/). Questo perchè la sintassi dei componenti Vue è vagamente modellata su tale specifica. Per esempio, i componenti Vue implementano la [Slot API](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md) e l'attributo speciale `is`. Tuttavia, ci sono alcune differenze chiave:

1. La specifica Web Components è stata finalizzata ma non è implementata nativamente in tutti i browser. Safari 10.1+, Chrome 54+ e Firefox 63+ supportano nativamente i web components. Invece, i componenti Vue funzionano in modo consistente in tutti i browser supportati (IE11 con compatibility build e superiori). Quando è necessario, i componenti Vue possono anche essere racchiusi all'interno di un elemento custom nativo.

[//]: # 'TODO: link to compatibility build'

2. I componenti Vue forniscono funzionalità importanti che non sono presenti nei normali elementi custom, in particolare il flusso di dati tra componenti, la comunicazione tramite eventi custom e l'integrazione con dei build tools.

Sebbene Vue non usi gli elementi custom internamente, ha una [grande interoperabilità](https://custom-elements-everywhere.com/#vue) quando si tratta di utilizzare o fornire elementi custom. La Vue CLI inoltre supporta la compilazione di componenti Vue che registrano loro stessi come elementi custom nativi.

## Pronto per avere di più?

Abbiamo introdotto le funzionalità più base del core di Vue.js - il resto di questa guida le spiegherà più in dettaglio, insieme ad altre funzionalità ancora più avanzate, assicurati quindi di leggerla tutta!
