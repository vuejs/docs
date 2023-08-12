# Single-File Components {#single-file-components}

## Introduzione {#introduction}

I Componenti Single-File di Vue (chiamati anche file `*.vue`, abbreviati come **SFC**) sono un formato speciale di file che ci consente di incapsulare il template, la logica **e** lo stile di un componente Vue in un singolo file. Ecco un esempio di un SFC:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

</div>

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

</div>

Come possiamo vedere, i SFC di Vue sono un'estensione naturale del classico trio di HTML, CSS e JavaScript. I blocchi`<template>`, `<script>`, e `<style>` incapsulano e collocano la vista, la logica e lo stile di un componente nello stesso file. La sintassi completa è definita nella [Specifiche SFC](/api/sfc-spec).

## Perché i SFC {#why-sfc}

Anche se i SFC richiedono una fase di compilazione, ci sono numerosi vantaggi in cambio:

- Creare componenti modulari utilizzando la familiare sintassi di HTML, CSS e JavaScript
- [Co-locazione delle responsabilità](#what-about-separation-of-concerns)
- Template precompilati senza costi di compilazione in fase di runtime
- [CSS a livello di componente](/api/sfc-css-features)
- [Sintassi più ergonomica quando si lavora con Composition API](/api/sfc-script-setup)
- Maggiori ottimizzazioni in fase di compilazione attraverso l'analisi incrociata di template e script
- [Supporto dell'IDE](/guide/scaling-up/tooling#ide-support) con autocompletamento e controllo dei tipi per le espressioni nel template
- Supporto integrato per la sostituzione del modulo in caldo (HMR)

I SFC sono una caratteristica fondamentale di Vue come framework e rappresentano l'approccio raccomandato per utilizzare Vue nei seguenti scenari:

- Applicazioni Single-Page (SPA)
- Generazione di Siti Statici (SSG)
- Qualsiasi frontend non banale in cui una fase di compilazione possa essere giustificata per una migliore esperienza di sviluppo (DX).

Detto questo, comprendiamo che ci sono situazioni in cui i SFC possono sembrare eccessivi. Per questo motivo, Vue può ancora essere utilizzato tramite JavaScript puro senza una fase di compilazione. Se stai cercando semplicemente di migliorare HTML in gran parte statico con interazioni leggere, puoi dare un'occhiata a [petite-vue](https://github.com/vuejs/petite-vue), un sottoinsieme di Vue ottimizzato per il miglioramento progressivo e che occupa solo 6 kB.

## Come funziona {#how-it-works}

I SFC di Vue sono un formato di file specifico del framework e devono essere precompilati da [@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) in JavaScript e CSS standard. Un SFC compilato è un modulo JavaScript standard (ES) - il che significa che con una configurazione di compilazione adeguata puoi importare un SFC come un modulo:

```js
import MyComponent from './MyComponent.vue'

export default {
  components: {
    MyComponent
  }
}
```

i tag `<style>`  all'interno dei SFC vengono tipicamente iniettati come tag `<style>` nativi durante lo sviluppo per supportare gli aggiornamenti in tempo reale. Per la produzione possono essere estratti e uniti in un singolo file CSS.

Puoi sperimentare con i SFC e vedere come vengono compilati nel [Vue SFC Playground](https://play.vuejs.org/).

Nei progetti reali, integriamo tipicamente il compilatore SFC con uno strumento di compilazione come [Vite](https://vitejs.dev/) o [Vue CLI](http://cli.vuejs.org/) (che si basa su [webpack](https://webpack.js.org/)), e Vue fornisce strumenti ufficiali per la creazione di strutture di base per SFC in modo da poter iniziare il più velocemente possibile. Trovi ulteriori dettagli nella sezione [Strumenti per i SFC](/guide/scaling-up/tooling).

## Per quanto riguarda la separazione delle responsabilità? {#what-about-separation-of-concerns}

Alcuni utenti provenienti da un contesto di sviluppo web tradizionale potrebbero avere la preoccupazione che gli SFC mescolino diverse responsabilità nello stesso posto - che HTML, CSS e JS dovrebbero separare!

Per rispondere a questa domanda, è importante concordare sul fatto che **la separazione delle responsabilità non è uguale alla separazione dei tipi di file**. L'obiettivo finale dei principi ingegneristici è migliorare la manutenibilità delle codebase. La separazione delle responsabilità, quando applicata dogmaticamente come separazione dei tipi di file, non ci aiuta a raggiungere questo obiettivo nel contesto delle applicazioni frontend sempre più complesse.

Nello sviluppo moderno delle UI, abbiamo scoperto che invece di dividere la codebase in tre grandi livelli che si intrecciano tra loro, ha molto più senso dividerli in componenti a basso accoppiamento e comporli. All'interno di un componente, il suo template, la sua logica e i suoi stili sono intrinsecamente accoppiati, e la loro collocazione effettiva rende il componente più coeso e manutenibile.

Nota che anche se non ti piace l'idea degli SFC, puoi comunque sfruttare le sue funzionalità di ricarica in tempo reale e precompilazione separando il tuo JavaScript e il tuo CSS in file separati utilizzando [importazioni src](/api/sfc-spec#src-imports).
