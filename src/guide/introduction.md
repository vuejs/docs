---
footer: false
---

# Panoramica {#introduction}

:::info Stai leggendo la documentazione per Vue 3!

- Il supporto a Vue 2 terminerà il 31 Dicembre 2023. Per saperne di più vai su [Vue 2 Extended LTS](https://v2.vuejs.org/lts/).
- La documentazione di Vue 2 è stata spostata su [v2.vuejs.org](https://v2.vuejs.org/).
- Stai aggiornando da Vue 2? Dai un'occhiata alla [Guida alla Migrazione ](https://v3-migration.vuejs.org/).
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Impara Vue con i tutorial video su <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Logo di Vue Mastery" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Cos'è Vue? {#what-is-vue}

Vue (pronunciato /vjuː/, come **view** in inglese) è un framework JavaScript per la costruzione di interfacce utente. Si basa su standard HTML, CSS e JavaScript e fornisce un modello di programmazione dichiarativo e basato su componenti che ti aiuta a sviluppare in modo efficiente interfacce utente, siano esse semplici o complesse.

Questo è un piccolo esempio:

<div class="options-api">

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

</div>
<div class="composition-api">

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

</div>

```vue-html
<div id="app">
  <button @click="count++">
    Il conteggio è: {{ count }}
  </button>
</div>
```

**Risultato**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Il conteggio è: {{ count }}
  </button>
</div>

L'esempio precedente dimostra le due caratteristiche fondamentali di Vue:

- **Rendering Dichiarativo**: Vue estende l'HTML standard con una sintassi di template che ci permette di descrivere in modo dichiarativo l'output HTML basato sullo stato JavaScript.

- **Reattività**: Vue traccia automaticamente i cambiamenti dello stato JavaScript e aggiorna in modo efficiente il DOM quando avvengono modifiche.

Potresti già avere delle domande, non preoccuparti. Copriremo ogni piccolo dettaglio nel resto della documentazione. Per ora, ti preghiamo di continuare a leggere per avere una comprensione di alto livello di ciò che Vue offre.

:::tip Prerequisiti
Il resto della documentazione presume una conoscenza di base di HTML, CSS e JavaScript. Se sei completamente nuovo allo sviluppo frontend, potrebbe non essere la migliore idea tuffarti direttamente nell'uso di un framework Javascript - impara le basi e poi riprendi! Puoi verificare il tuo livello di conoscenza con questa [panoramica di JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). L'esperienza precedente con altri framework aiuta, ma non è necessaria.
:::

## Il Framework Progressivo {#the-progressive-framework}

Vue è un framework e un ecosistema che copre la maggior parte delle caratteristiche necessarie allo sviluppo frontend. Ma il web è estremamente vario - le cose che costruiamo sul web possono essere estremamente differenti nella forma e nella grandezza. Pensando a ciò, Vue è stato progettato per essere flessibile e favorirne l'uso in modo incrementale. A seconda del tuo caso d'uso, Vue può essere utilizzato in modi diversi:

- Migliorare l'HTML statico senza l'uso della compilazione
- Incorporare Web Components su qualsiasi pagina
- Applicazioni Single-Page (SPA)
- Fullstack / Rendering Server-Side (SSR)
- Jamstack / Generazione di Siti Statici (SSG)
- per usi su desktop, mobile, WebGL e perfino al terminale

Se questi concetti sembrano difficili non preoccuparti! Il tutorial e la guida richiedono conoscenze di HTML e JavaScript di base e dovresti riuscire a seguire tutto senza essere un esperto.

Se sei uno sviluppatore esperto interessato a come integrare al meglio Vue nel tuo stack tecnologico, o sei curioso di sapere cosa significano questi termini, ne discutiamo in modo più dettagliato in [Modi di utilizzare Vue](/guide/extras/ways-of-using-vue).

Indipendentemente dalla sua flessibilità, la conoscenza di base su come funziona Vue rimane la stessa in tutti casi d'uso visti qui sopra. Anche se ora sei solo un principiante, le conoscenze acquisite lungo il cammino rimarranno utili mentre cresci e affronti obiettivi sempre più ambiziosi. Se sei un veterano, puoi scegliere il modo più congeniale per sfruttare Vue in base ai problemi che stai cercando di risolvere, mantenendo la stessa produttività. Questo è il motivo per cui chiamiamo Vue "Il Framework Progressivo": è un framework che può crescere con te e adattarsi alle tue esigenze.

## Componenti Single-File {#single-file-components}

Nei progetti Vue che sfruttano gli strumenti di compilazione, creiamo componenti Vue utilizzando un formato di file simile a HTML chiamato **Single-File Component** (Componente in un singolo file, anche noto come file `*.vue` , abbreviato in **SFC**). Un file SFC, come suggerisce il nome, incorpora in un singolo file la logica (JavaScript), il template (HTML) e lo stile (CSS) del componente. Ecco l'esempio precedente, riscritto in formato SFC:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Il conteggio è: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Il conteggio è: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>

L'SFC è una caratteristica distintiva di Vue ed è il modo consigliato per la creazione di componenti Vue **se** il tuo progetto richiede l'uso e la configurazione della compilazione. Nella sezione dedicata puoi saperne di più su [come e perché usare SFC](/guide/scaling-up/sfc). Al momento è sufficiente sapere che Vue si occuperà di tutta la configurazione degli strumenti di compilazione per te.

## Stili delle API {#api-styles}

I componenti Vue possono essere scritti in due diversi stili di API: **Options API** e **Composition API**.

### Options API {#options-api}

Con l'Options API definiamo la logica di un componente utilizzando un oggetto contenente opzioni come `data`, `methods`, and `mounted`. Le proprietà definite dalle opzioni vengono esposte all'interno delle funzioni su `this`, che fa riferimento all'istanza del componente:

```vue
<script>
export default {
  // Le proprietà restituite da data() diventano parte dello stato reattivo.
  // e saranno esposte su `this`.
  data() {
    return {
      count: 0
    }
  },

  // I metodi sono funzioni che modificano lo stato e innescano degli aggiornamenti.
  // Possono essere usati come gestori di eventi nei template (tramite `v-on`).
  methods: {
    increment() {
      this.count++
    }
  },

  // Gli hook del ciclo di vita vengono chiamati in diverse fasi
  // del ciclo di vita di un componente.
  // Questa funzione verrà chiamata quando il componente sarà montato.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Il conteggio è: {{ count }}</button>
</template>
```

[Prova nel Playground](https://play.vuejs.org/#eNptkMFqxCAQhl9lkB522ZL0HNKlpa/Qo4e1ZpLIGhUdl5bgu9es2eSyIMio833zO7NP56pbRNawNkivHJ25wV9nPUGHvYiaYOYGoK7Bo5CkbgiBBOFy2AkSh2N5APmeojePCkDaaKiBt1KnZUuv3Ky0PppMsyYAjYJgigu0oEGYDsirYUAP0WULhqVrQhptF5qHQhnpcUJD+wyQaSpUd/Xp9NysVY/yT2qE0dprIS/vsds5Mg9mNVbaDofL94jZpUgJXUKBCvAy76ZUXY53CTd5tfX2k7kgnJzOCXIF0P5EImvgQ2olr++cbRE4O3+t6JxvXj0ptXVpye1tvbFY+ge/NJZt)

### Composition API {#composition-api}

Nella Composition API definiamo la logica di un componente importando le funzioni dell'API. Negli SFC, di solito, la Composition API è utilizzata con [`<script setup>`](/api/sfc-script-setup). L'attributo `setup` è un suggerimento che, durante la compilazione, permette a Vue di eseguire delle trasformazioni e usare la Composition API con meno codice ripetitivo. Per esempio gli imports e le variabili / funzioni di livello superiore dichiarate in `<script setup>` possono essere usate direttamente nel template.

Ecco lo stesso componente, con lo stesso identico template, ma utilizzando la Composition API usando `<script setup>`:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// stato reattivo
const count = ref(0)

// funzioni che modificano lo stato e innescano l'aggiornamento
function increment() {
  count.value++
}

// hook del ciclo di vita
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Il conteggio è: {{ count }}</button>
</template>
```

[Prova nel Playground](https://play.vuejs.org/#eNpNkMFqwzAQRH9lMYU4pNg9Bye09NxbjzrEVda2iLwS0spQjP69a+yYHnRYad7MaOfiw/tqSliciybqYDxDRE7+qsiM3gWGGQJ2r+DoyyVivEOGLrgRDkIdFCmqa1G0ms2EELllVKQdRQa9AHBZ+PLtuEm7RCKVd+ChZRjTQqwctHQHDqbvMUDyd7mKip4AGNIBRyQujzArgtW/mlqb8HRSlLcEazrUv9oiDM49xGGvXgp5uT5his5iZV1f3r4HFHvDprVbaxPhZf4XkKub/CDLaep1T7IhGRhHb6WoTADNT2KWpu/aGv24qGKvrIrr5+Z7hnneQnJu6hURvKl3ryL/ARrVkuI=)

### Quale scegliere? {#which-to-choose}

Entrambi gli stili di API sono completamente in grado di coprire i casi d'uso più comuni. Si tratta di interfacce diverse alimentate dallo stesso identico sistema. In effetti l'Options API è implementata al di sopra della Composition API! I concetti fondamentali e la conoscenza riguardo Vue sono condivisi dai due stili.

L'Options API è incentrata sul concetto di "component instance" ('istanza di componente', `this` come visto nell'esempio), che tipicamente si allinea meglio con un modello mentale basato sulle Classi per gli utenti provenienti da linguaggi OOP. È anche più accessibile ai principianti, nascondendo i dettagli della reattività e imponendo un'organizzazione del codice tramite gruppi di opzioni.

La Composition API, invece, si concentra sulla dichiarazione di variabili di stato reattive direttamente nell'ambito di una funzione e, per gestire la complessità, sulla composizione dello stato da più funzioni insieme. È un modo di scrivere codice più libero e richiede una comprensione di come funziona la reattività in Vue per essere utilizzata in modo efficace. In cambio la sua flessibilità consente strutture per l'organizzazione e il riutilizzo della logica più potenti.

Puoi saperne di più sul confronto tra i due stili e sui potenziali vantaggi della Composition API nelle [FAQ sulla Composition API](/guide/extras/composition-api-faq).

Se sei nuovo in Vue, in linea di massima, ecco la nostra raccomandazione:

- Per scopi di apprendimento scegli lo stile che ti sembra più facile da capire. Ancora una volta, la maggior parte dei concetti chiave sono condivisi tra i due stili. Puoi sempre imparare l'altro stile in seguito.

- Per l'uso in produzione:

  - Scegli l'Options API se non stai utilizzando strumenti di build, o se prevedi di utilizzare Vue principalmente in scenari di bassa complessità, ad esempio per un miglioramento progressivo.

  - Scegli la Composition API + Componenti Single-File se prevedi di costruire applicazioni complete con Vue.

 The rest of the documentation will provide code samples in both styles where applicable, and you can toggle between them at any time using the **API Preference switches** at the top of the left sidebar. Non devi impegnarti a utilizzare un solo stile durante la fase di apprendimento. Il resto della documentazione fornirà esempi di codice in entrambi gli stili dove applicabile, e potrai passare da uno all'altro in qualsiasi momento utilizzando il **selettore di preferenza API**, presente nella parte superiore della barra laterale sinistra.

## Hai ancora domande? {#still-got-questions}

Consulta le nostre [FAQ](/about/faq).

## Scegli il tuo percorso di apprendimento​ {#pick-your-learning-path}

Ogni sviluppatore ha uno stile di apprendimento diverso. Sentiti libero di scegliere un percorso di apprendimento che si adatti alle tue preferenze - anche se ti consigliamo di esaminare tutto il contenuto, se possibile!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Prova il Tutorial</p>
    <p class="next-steps-caption">Per coloro che preferiscono apprendere sporcandosi le mani.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Leggi la Guida</p>
    <p class="next-steps-caption">La guida ti mostrerà in dettaglio ogni aspetto del framework.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Guarda gli Esempi</p>
    <p class="next-steps-caption">Esplora gli esempi di funzionalità base e casi d'uso comuni.</p>
  </a>
</div>
