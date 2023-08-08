# Gestione degli Eventi {#event-handling}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Lezione Gratuita sugli Eventi in Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Lezione Gratuita sugli Eventi in Vue.js"/>
</div>

## Ascolto degli Eventi {#listening-to-events}

Possiamo utilizzare la direttiva `v-on`, che di solito abbreviamo con il simbolo `@`, per ascoltare gli eventi del DOM e eseguire del codice JavaScript quando vengono attivati. L'utilizzo nella forma estesa sarebbe `v-on:click="handler"` o con la scorciatoia, `@click="handler"`.

Il valore dell'handler può essere uno dei seguenti:

1. **Handler in linea:** Codice JavaScript, scritto in linea, da eseguire quando l'evento viene innescato (simile all'attributo nativo `onclick`).

2. **Handler di un Metodo:** Un nome di una proprietà o un percorso che punta a un metodo definito nel componente.

## Handler In Linea {#inline-handlers}

Gli handler in linea (Inline handlers) sono usati in genere per casi semplici, ad esempio:

<div class="composition-api">

```js
const count = ref(0)
```

</div>
<div class="options-api">

```js
data() {
  return {
    count: 0
  }
}
```

</div>

```vue-html
<button @click="count++">Aggiungi 1</button>
<p>Il conteggio è: {{ count }}</p>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNo9jssKgzAURH/lko0tgrbbEqX+Q5fZaLxiqHmQ3LgJ+fdqFZcD58xMYp1z1RqRvRgP0itHEJCia4VR2llPkMDjBBkmbzUUG1oII4y0JhBIGw2hh2Znbo+7MLw+WjZ/C4TaLT3hnogPkcgaeMtFyW8j2GmXpWBtN47w5PWBHLhrPzPCKfWDXRHmPsCAaOBfgSOkdH3IGUhpDBWv9/e8vsZZ/gFFhFJN)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNo9jcEKgzAQRH9lyKlF0PYqqdR/6DGXaLYo1RjiRgrivzepIizLzu7sm1XUzuVLIFEKObe+d1wpS183eYahtw4DY1UWMJr15ZpmxYAnDt7uF0BxOwXL5Evc0kbxlmyxxZLFyY2CaXSDZkqKZROYJ4tnO/Tt56HEgckyJaraGNxlsVt2u6teHeF40s20EDo9oyGy+CPIYF1xULBt4H6kOZeFiwBZnOFi+wH0B1hk)

</div>

## Handler del Metodo {#method-handlers}

Per molti Handler di eventi, però, la logica sarà più complessa e, molto probabilmente, non sarà fattibile con gli handler in linea. Ecco perché `v-on` può accettare anche il nome, o il percorso, di un metodo del componente che si desidera utilizzare (Method Handlers).

Ad esempio:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` è l'Evento nativo del DOM
  if (event) {
    alert(event.target.tagName)
  }
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // `this` all'interno dei metodi punta all'istanza attiva corrente
    alert(`Hello ${this.name}!`)
    // `event` è l'Evento nativo del DOM
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet` è il nome del metodo definito sopra -->
<button @click="greet">Saluta</button>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNpVj0FLxDAQhf/KMwjtXtq7dBcFQS/qzVMOrWFao2kSkkkvpf/dJIuCEBgm771vZnbx4H23JRJ3YogqaM+IxMlfpNWrd4GxI9CMA3NwK5psbaSVVjkbGXZaCediaJv3RN1XbE5FnZNVrJ3FEoi4pY0sn7BLC0yGArfjMxnjcLsXQrdNJtFxM+Ys0PcYa2CEjuBPylNYb4THtxdUobj0jH/YX3D963gKC5WyvGZ+xR7S5jf01yPzeblhWr2ZmErHw0dizivfK6PV91mKursUl6dSh/4qZ+vQ/+XE8QODonDi)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNplUE1LxDAQ/StjEbYL0t5LXRQEvag3Tz00prNtNE1CMilC6X83SUkRhJDJfLz3Jm8tHo2pFo9FU7SOW2Ho0in8MdoSDHhlXhKsnQIYGLHyvL8BLJK3KmcAis3YwOnDY/XlTnt1i2G7i/eMNOnBNRkwWkQqcUFFByVAXUNPk3A9COXEgBkGRgtFDkgDTQjcWxuAwDiJBeMsMcUxszCJlsr+BaXUcLtGwiqut930579KST1IBd5Aqlgie3p/hdTIk+IK//bMGqleEbMjxjC+BZVDIv0+m9CpcNr6MDgkhLORjDBm1H56Iq3ggUvBv++7IhnUFZfnGNt6b4fRtj5wxfYL9p+Sjw==)

</div>

Un handler del metodo riceve automaticamente l'oggetto Evento nativo del DOM che lo innesca. Nell'esempio sopra, possiamo accedere all'elemento che dispaccia l'evento tramite `event.target.tagName`.

<div class="composition-api">

Guarda anche: [Tipizzazione degli Handler degli Eventi](/guide/typescript/composition-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Guarda anche: [Tipizzazione degli Handler degli Eventi](/guide/typescript/options-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### Rilevamento di codice Inline o del Metodo {#method-vs-inline-detection}

Il compilatore del template rileva gli handler dei metodi verificando che la stringa del valore `v-on` sia un identificatore JavaScript valido o un percorso di accesso alla proprietà. Ad esempio: `foo`, `foo.bar` e `foo['bar']` sono trattati come handler del metodo, mentre `foo()` e `count++` sono trattati come handler inline.

## Usare i Metodi negli Handler Inline {#calling-methods-in-inline-handlers}

Invece di collegarsi direttamente a un nome di un metodo, possiamo chiamare metodi anche in un handler inline. Ciò ci consente di passare al metodo degli argomenti personalizzati invece dell'evento nativo:

<div class="composition-api">

```js
function say(message) {
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  say(message) {
    alert(message)
  }
}
```

</div>

```vue-html
<button @click="say('ciao')">Dì ciao</button>
<button @click="say('arrivederci')">Dì arrivederci</button>
```

<div class="composition-api">

[Prova nel Playground](https://play.vuejs.org/#eNp9jTEOwjAMRa8SeSld6I5CBWdg9ZJGBiJSN2ocpKjq3UmpFDGx+Vn//b/ANYTjOxGcQEc7uyAqkqTQI98TW3ETq2jyYaQYzYNatSArZTzNUn/IK7Ludr2IBYTG4I3QRqKHJFJ6LtY7+zojbIXNk7yfmhahv5msvqS7PfnHGjJVp9w/hu7qKKwfEd1NSg==)

</div>
<div class="options-api">

[Prova nel Playground](https://play.vuejs.org/#eNptjUEKwjAQRa8yZFO7sfsSi57B7WzGdjTBtA3NVC2ldzehEFwIw8D7vM9f1cX742tmVSsd2sl6aXDgjx8ngY7vNDuBFQeAnsWMXagToQAEWg49h0APLncDAIUcT5LzlKJsqRBfPF3ljQjCvXcknEj0bRYZBzi3zrbPE6o0UBhblKiaKy1grK52J/oA//23IcmNBD8dXeVBtX0BF0pXsg==)

</div>

## Accesso all'Argomento dell'Evento negli Handler Inline {#accessing-event-argument-in-inline-handlers}

A volte in un handler inline abbiamo bisogno di accedere anche all'evento originale del DOM. Puoi passarlo a un metodo utilizzando la variabile speciale `$event`, o utilizzare una funzione arrow inline:

```vue-html
<!-- utilizzando la variabile speciale $event -->
<button @click="warn('Il Form non può essere ancora inviato.', $event)">
  Invia
</button>

<!-- utilizzando la funzione arrow inline -->
<button @click="(event) => warn('Il Form non può essere ancora inviato.', event)">
  Invia
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // ora abbiamo accesso all'evento nativo
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  warn(message, event) {
    // ora abbiamo accesso all'evento nativo
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## Modificatori dell'Evento {#event-modifiers}

In molti casi negli handler degli eventi c'è bisogno di usare `event.preventDefault()` o `event.stopPropagation()`. Anche se possiamo farlo facilmente nei metodi, sarebbe meglio se i metodi riguardassero esclusivamente la logica dei dati, invece di dover gestire i dettagli dell'evento del DOM.

Per risolvere questo problema, per `v-on`, Vue fornisce i **modificatori dell'evento**. Ricorda che i modificatori sono aggiunti alle direttive tramite un punto.

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- la propagazione dell'evento click verrà interrotta -->
<a @click.stop="doThis"></a>

<!-- l'evento submit non ricaricherà più la pagina -->
<form @submit.prevent="onSubmit"></form>

<!-- i modificatori possono essere concatenati -->
<a @click.stop.prevent="doThat"></a>

<!-- singolo modificatore -->
<form @submit.prevent></form>

<!-- attiva l'handler solo se event.target corrisponde all'elemento stesso -->
<!-- cioè non da un elemento figlio -->
<div @click.self="doThat">...</div>
```

::: tip
L'ordine conta quando si utilizzano i modificatori perché il codice correlato viene generato nello stesso ordine. Per questo l'utilizzo di `@click.prevent.self` impedirà **l'azione predefinita del click sull'elemento stesso e sui suoi figli**, mentre `@click.self.prevent` impedirà solo l'azione predefinita del click sull'elemento stesso.
:::

I modificatori `.capture`, `.once` e `.passive` riflettono le [opzioni del metodo nativo `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options):

```vue-html
<!-- usa la modalità di cattura quando aggiungi il listener dell'evento -->
<!-- cioè un evento che punta a un elemento interno viene gestito qui prima di essere gestito da quell'elemento -->
<div @click.capture="doThis">...</div>

<!-- l'evento click sarà attivato al massimo una volta -->
<a @click.once="doThis"></a>

<!-- il comportamento predefinito dell'evento di scorrimento (scrolling) avverrà -->
<!-- immediatamente, invece di aspettare che `onScroll` sia completato  -->
<!-- nel caso contenga `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

Il modificatore `.passive` è tipicamente usato con i listener degli eventi touch per [migliorare le prestazioni sui dispositivi mobili](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners).

::: tip
Non usare `.passive` e `.prevent` insieme, perché `.passive` indica già al browser che _non intendi_ impedire il comportamento predefinito dell'evento, se lo fai, probabilmente riceverai un avviso dal browser.
:::

## Modificatori dei Tasti {#key-modifiers}

Quando si ascoltano gli eventi della tastiera, spesso è necessario verificare specifici tasti. Vue permette di aggiungere i modificatori dei tasti per `v-on` o `@` quando si ascoltano gli eventi dei tasti:

```vue-html
<!-- chiama `submit` solo quando la `key` è `Enter` -->
<input @keyup.enter="submit" />
```

Come modificatore è possibile utilizzare qualsiasi nome di tasto valido, esposto tramite [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values), convertendolo in kebab-case.

```vue-html
<input @keyup.page-down="onPageDown" />
```

Nell'esempio sopra, l'handler verrà chiamato solo se `$event.key` è uguale a `'PageDown'`.

### Alias per i Tasti {#key-aliases}

Vue fornisce degli alias per i tasti utilizzati più di frequente:

- `.enter`
- `.tab`
- `.delete` (cattura sia il tasto "Delete" sia "Backspace")
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### Tasti Modificatori di Sistema {#system-modifier-keys}

Puoi utilizzare i seguenti modificatori per attivare i listener di eventi del mouse, o della tastiera, solo quando viene premuto il corrispondente tasto modificatore:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Nota
Sulle tastiere Macintosh, `meta` è il tasto command (⌘). Sulle tastiere Windows, `meta` è il tasto Windows (⊞). Sulle tastiere Sun Microsystems, `meta` è contrassegnato da un rombo pieno (◆). Su alcune tastiere, in particolare le tastiere MIT e Lisp e le loro successive, come la tastiera Knight e la tastiera space-cadet, `meta` è etichettato come “META”. Sulle tastiere Symbolics, `meta` è etichettato come “META” o “Meta”.
:::

For example:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

::: tip
Nota che i tasti modificatori sono diversi dai tasti regolari e quando vengono utilizzati con gli eventi `keyup`, devono essere premuti quando l'evento viene emesso. In altre parole, `keyup.ctrl` si attiverà solo se rilasci un tasto tenendo premuto `ctrl`. Non si attiverà se rilasci il tasto `ctrl` da solo.
:::

### Modificatore `.exact` {#exact-modifier}

Il modificatore `.exact` consente di controllare la combinazione esatta dei tasti modificatori di sistema necessari per attivare un evento.

```vue-html
<!-- questo handler si attiverà anche se vengono premuti Alt o Shift insieme a Ctrl -->
<button @click.ctrl="onClick">A</button>

<!-- questo handler si attiverà solo quando viene premuto Ctrl e nessun altro tasto -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- questo handler si attiverà solo se non vengono premuti tasti modificatori di sistema -->
<button @click.exact="onClick">A</button>
```

## Modificatori dei Tasti del Mouse {#mouse-button-modifiers}

- `.left`
- `.right`
- `.middle`

Questi modificatori limitano l'handler agli eventi attivati da un specifico tasto del mouse.
