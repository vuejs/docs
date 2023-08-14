<script setup>
import TestingApiSwitcher from './TestingApiSwitcher.vue'
</script>

# Testing {#testing}

## Perché testare? {#why-test}

I test automatizzati aiutano te e il tuo team a sviluppare rapidamente e con fiducia applicazioni complesse in Vue, prevenendo regressioni ed incoraggiandoti a suddividere la tua applicazione in funzioni, moduli, classi e componenti testabili. Come per qualsiasi applicazione, la tua nuova app Vue può rompersi in molti modi ed è importante che tu possa individuare questi problemi e correggerli prima di rilasciare.

In questa guida, copriremo la terminologia di base e forniremo le nostre raccomandazioni su quali strumenti scegliere per la tua applicazione Vue 3.

C'è una sezione specifica su Vue che riguarda i composabili. Vedi [Testing Composables](#testing-composables) qui sotto per ulteriori dettagli.

## Quando testare {#when-to-test}

Inizia a testare presto! Ti consigliamo di iniziare a scrivere test il prima possibile. Più attendi ad aggiungere i test alla tua applicazione, più dipendenze avrà l'applicazione e più difficile sarà iniziare.

## Tipi di test {#testing-types}

Quando progetti la strategia di test per la tua applicazione Vue, dovresti sfruttare i seguenti tipi di test:

- **Unità**: Verifica che gli input a una determinata funzione, classe o componibile producano l'output o gli effetti collaterali attesi.
- **Componente**: Verifica che il tuo componente venga montato, renderizzato, possa essere interagito e si comporti come previsto. Questi test importano più codice rispetto ai test di unità, sono più complessi e richiedono più tempo per essere eseguiti.
- **End-to-end**: Verifica le funzionalità che coinvolgono più pagine e effettuano richieste di rete reali alla tua applicazione Vue costruita in produzione. Questi test spesso coinvolgono l'avvio di un database o di altri backend.

Ogni tipo di test gioca un ruolo nella strategia di test della tua applicazione e ognuno ti proteggerà da diversi tipi di problemi.

## Panoramica {#overview}

Discuteremo brevemente cosa sono ognuno di questi tipi di test, come possono essere implementati per le applicazioni Vue e fornire alcune raccomandazioni generali.

## Unit Test {#unit-testing}

I test di unità sono scritti per verificare che piccole unità isolate di codice funzionino come previsto. Un test di unità copre di solito una singola funzione, classe, componibile o modulo. I test di unità si concentrano sulla correttezza logica e si occupano solo di una piccola parte della funzionalità complessiva dell'applicazione. Possono simulare grandi parti dell'ambiente dell'applicazione (ad esempio, lo stato iniziale, classi complesse, moduli di terze parti e richieste di rete).

In generale, i test di unità individueranno problemi con la logica di business di una funzione e la sua correttezza logica.

Prendi ad esempio questa funzione `increment`:

```js
// helpers.js
export function increment (current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

Poiché è molto autonoma, sarà facile invocare la funzione increment e verificare che restituisca ciò che dovrebbe, quindi scriveremo un test di unità.

Se una qualsiasi di queste asserzioni fallisce, è chiaro che il problema è contenuto nella funzione `increment`.

```js{4-16}
// helpers.spec.js
import { increment } from './helpers'

describe('increment', () => {
  test('increments the current number by 1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('does not increment the current number over the max', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('has a default max of 10', () => {
    expect(increment(10)).toBe(10)
  })
})
```

Come precedentemente menzionato, gli unit test vengono generalmente applicati alla logica di business autonoma, ai componenti, alle classi, ai moduli o alle funzioni che non coinvolgono il rendering dell'interfaccia utente, le richieste di rete o altre questioni ambientali.

In genere, questi sono moduli JavaScript / TypeScript puri non correlati a Vue. In generale, scrivere test di unità per la logica di business nelle applicazioni Vue non differisce significativamente dalle applicazioni che utilizzano altri framework.

Ci sono due casi in cui SI effettuano test di unità sulle funzionalità specifiche di Vue:

1. Composables
2. Componenti

### Composables {#composables}

Una categoria di funzioni specifiche per le applicazioni Vue sono [Composables](/guide/reusability/composables), che possono richiedere una gestione speciale durante i test.
Guarda [Testing Composables](#testing-composables) di seguito per ulteriori dettagli.

### Unit test per i componenti {#unit-testing-components}

Un componente può essere testato in due modi:

1. Whitebox: Unit Testing

   I test che sono "test di Whitebox" sono consapevoli dei dettagli di implementazione e delle dipendenze di un componente. Sono focalizzati sull'**isolamento** del componente in prova. Questi test solitamente coinvolgono la simulazione di alcuni, se non tutti, i figli del componente, nonché la configurazione dello stato dei plugin e delle dipendenze (ad esempio, Pinia).

2. Blackbox: Test dei Componenti

   I test che sono "test di Blackbox" non sono a conoscenza dei dettagli di implementazione di un componente. Questi test simulano il minor numero possibile di elementi per testare l'integrazione del componente e dell'intero sistema. Solitamente, renderizzano tutti i componenti figli e vengono considerati più come un "test di integrazione". Vedere le [raccomandazioni per il testing dei componenti](#component-testing) di seguito.

### Raccomandazione {#recommendation}

- [Vitest](https://vitest.dev/)

  Poiché la configurazione ufficiale creata da `create-vue` si basa su [Vite](https://vitejs.dev/), consigliamo di utilizzare un framework per i test di unità che possa sfruttare la stessa configurazione e la stessa pipeline di trasformazione direttamente da Vite. [Vitest](https://vitest.dev/) è un framework per i test di unità progettato appositamente per questo scopo, creato e mantenuto da membri del team Vue / Vite. Si integra facilmente con i progetti basati su Vite ed è estremamente veloce.

### Altre opzioni {#other-options}

- [Peeky](https://peeky.dev/) è un altro rapido runner per i test di unità con un'integrazione di prima classe con Vite. È stato anche creato da un membro del team Vue core e offre un'interfaccia grafica per i test.

- [Jest](https://jestjs.io/) è un framework popolare per i test di unità e può essere utilizzato con Vite tramite il pacchetto [vite-jest](https://github.com/sodatea/vite-jest). Tuttavia, consigliamo Jest solo se hai già una suite di test Jest che deve essere migrata in un progetto basato su Vite, poiché Vitest offre un'integrazione più fluida e migliori prestazioni.

## Testing dei Componenti {#component-testing}

Nelle applicazioni Vue, i componenti sono i principali blocchi di costruzione dell'interfaccia utente. Pertanto, i componenti sono l'unità naturale di isolamento quando si tratta di convalidare il comportamento dell'applicazione. Dal punto di vista della granularità, il testing dei componenti si trova da qualche parte sopra il testing delle unità e può essere considerato una forma di testing di integrazione. Gran parte della tua applicazione Vue dovrebbe essere coperta da un test di componente e ti consigliamo di creare un file di specifica (spec) per ciascun componente Vue.

I test dei componenti dovrebbero individuare problemi relativi alle props del componente, agli eventi, agli slot che fornisce, agli stili, alle classi, ai lifecycle hook e altro ancora.

I test dei componenti non dovrebbero simulare componenti figlio, ma testare invece le interazioni tra il tuo componente e i suoi figli interagendo con i componenti come farebbe un utente. Ad esempio, un test di componente dovrebbe fare clic su un elemento come farebbe un utente anziché interagire con il componente in modo programmato.

I test dei componenti dovrebbero concentrarsi sulle interfacce pubbliche del componente piuttosto che sui dettagli di implementazione interni. Per la maggior parte dei componenti, l'interfaccia pubblica è limitata a: eventi emessi, props e slot. Durante il testing, ricorda di **testare ciò che fa un componente, non come lo fa**.

**FARE**

- Per la logica **visuale**: verifica l'output di rendering corretto in base alle props e agli slot inseriti.
- Per la logica **comportamentale**: verifica gli aggiornamenti di rendering corretti o gli eventi emessi in risposta agli eventi di input dell'utente.

 Nell'esempio seguente, mostriamo un componente Stepper che ha un elemento DOM etichettato "increment" e può essere cliccato. Passiamo una prop chiamata `max` che impedisce al componente Stepper di essere incrementato oltre `2`, quindi se facciamo clic sul pulsante 3 volte, l'interfaccia utente dovrebbe comunque mostrare `2`.

  Non sappiamo nulla dell'implementazione di Stepper, sappiamo solo che l'"input" è la prop `max` e l'"output" è lo stato del DOM come lo vedrà l'utente.

<TestingApiSwitcher>

<div class="testing-library-api">

```js
const { getByText } = render(Stepper, {
  props: {
    max: 1
  }
})

getByText('0')  // Verifica implicita che "0" sia presente nel componente

const button = getByText('increment')

// Simula un evento di clic sul nostro pulsante di incremento.
await fireEvent.click(button)

getByText('1')

await fireEvent.click(button)
```

</div>

<div class="vtu-api">

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

const wrapper = mount(Stepper, {
  props: {
    max: 1
  }
})

expect(wrapper.find(valueSelector).text()).toContain('0')

await wrapper.find(buttonSelector).trigger('click')

expect(wrapper.find(valueSelector).text()).toContain('1')
```

</div>

<div class="cypress-api">

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

mount(Stepper, {
  props: {
    max: 1
  }
})

cy.get(valueSelector).should('be.visible').and('contain.text', '0')
  .get(buttonSelector).click()
  .get(valueSelector).should('contain.text', '1')
```

</div>

</TestingApiSwitcher>

- **NON FARE**

  Non fare asserzioni sullo stato privato di un'istanza di componente o sui metodi privati di un componente. Testare dettagli di implementazione rende i test fragili, in quanto sono più inclini a rompersi e richiedono aggiornamenti quando cambia l'implementazione.

  Il compito principale di un componente è rappresentare correttamente l'output DOM, quindi i test che si concentrano sull'output DOM offrono lo stesso livello di garanzia di correttezza (se non di più), pur essendo più robusti e resilienti ai cambiamenti.

  Non fare affidamento esclusivo sui test di snapshot. Assegnare stringhe HTML non descrive la correttezza. Scrivi test con intenzionalità.

  Se un metodo deve essere testato approfonditamente, considera l'estrazione in una funzione di utilità autonoma e scrivi un test unitario dedicato per essa. Se non può essere estratto in modo pulito, può essere testato come parte di un componente, di un test di integrazione o end-to-end che lo copra.

### Raccomandazione {#recommendation-1}

- [Vitest](https://vitest.dev/) per componenti o composable che vengono resi in modo "headless" (ad esempio la funzione [`useFavicon`](https://vueuse.org/core/useFavicon/#usefavicon) in VueUse). I componenti e il DOM possono essere testati usando [`@vue/test-utils`](https://github.com/vuejs/test-utils).

- [Cypress Component Testing](https://on.cypress.io/component) per componenti il cui comportamento atteso dipende dal rendering corretto degli stili o dall'attivazione degli eventi nativi del DOM. Può essere utilizzato con Testing Library tramite [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro).

Le principali differenze tra Vitest e i runner basati su browser sono la velocità e il contesto di esecuzione. In breve, i runner basati su browser, come Cypress, possono individuare problemi che i runner basati su node, come Vitest, non possono individuare (ad esempio problemi di stile, eventi nativi reali del DOM, cookie, archiviazione locale e errori di rete), ma i runner basati su browser sono _ordini di grandezza più lenti di Vitest_ perché aprono un browser, compilano i fogli di stile e altro ancora. Cypress è un runner basato su browser che supporta il testing dei componenti. Leggi la [pagina di confronto di Vitest](https://vitest.dev/guide/comparisons.html#cypress) per le informazioni più recenti sul confronto tra Vitest e Cypress.

### Librerie di montaggio {#mounting-libraries}

Il testing dei componenti spesso comporta il montaggio del componente in isolamento, la simulazione di eventi di input dell'utente e la verifica dell'output DOM renderizzato. Esistono librerie di utilità dedicate che semplificano queste operazioni.

- [`@vue/test-utils`](https://github.com/vuejs/test-utils) è la libreria ufficiale per il testing dei componenti a basso livello, scritta per fornire agli utenti accesso alle API specifiche di Vue. È anche la libreria a livello inferiore su cui è costruita `@testing-library/vue`.

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library) è una libreria di testing Vue focalizzata sul testing dei componenti senza fare affidamento sui dettagli di implementazione. Il suo principio guida è che più i test assomigliano al modo in cui il software viene utilizzato, maggiore fiducia possono fornire.

Raccomandiamo di utilizzare `@vue/test-utils` per testare i componenti nelle applicazioni.`@testing-library/vue` ha problemi nel testare componenti asincroni con Suspense, quindi dovrebbe essere usato con cautela.

### Altre opzioni {#other-options-1}

- [Nightwatch](https://nightwatchjs.org/) è un runner di test end-to-end con il supporto per il Vue Component Testing. ([Progetto esempio](https://github.com/nightwatchjs-community/todo-vue))

- [WebdriverIO](https://webdriver.io/docs/component-testing/vue) per il testing dei componenti su browser multipli che si basa su interazioni utente native basate su automazione standardizzata. Può anche essere utilizzato con Testing Library. 

## Testing E2E {#e2e-testing}

Sebbene i test unitari offrano ai programmatori un certo grado di sicurezza, i test unitari e i test dei componenti hanno limitazioni nella loro capacità di fornire una copertura completa dell'applicazione quando viene distribuita in produzione. Di conseguenza, i test end-to-end (E2E) forniscono una copertura su ciò che è probabilmente l'aspetto più importante di un'applicazione: cosa succede quando gli utenti effettivamente utilizzano le tue applicazioni.

I test end-to-end si concentrano sul comportamento delle applicazioni multi-pagina che effettuano richieste di rete contro l'applicazione Vue costruita per la produzione. Spesso coinvolgono la configurazione di un database o di un backend e potrebbero persino essere eseguiti contro un ambiente di staging live.

I test end-to-end spesso rilevano problemi relativi al router, alla libreria di gestione dello stato, ai componenti di alto livello (ad esempio un'app o un layout), agli asset pubblici o a qualsiasi gestione delle richieste. Come già detto, rilevano problemi critici che potrebbero essere impossibili da individuare con i test unitari o i test dei componenti.

I test end-to-end non importano alcun codice dell'applicazione Vue, ma si affidano completamente al test dell'applicazione navigando attraverso intere pagine in un vero browser.

I test end-to-end convalidano molte delle componenti dell'applicazione. Possono essere indirizzati all'applicazione costruita localmente o persino a un ambiente di staging live. I test contro l'ambiente di staging includono non solo il codice frontend e il server statico, ma tutti i servizi di backend e l'infrastruttura associata.

> Più i tuoi test assomigliano al modo in cui il tuo software viene utilizzato, maggiore fiducia possono darti. - [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106) - Autore della Testing Library

Testando come le azioni degli utenti influenzano la tua applicazione, i test E2E sono spesso la chiave per una maggiore fiducia nel corretto funzionamento di un'applicazione.

### Scelta di una soluzione di test E2E{#choosing-an-e2e-testing-solution}

Sebbene i test end-to-end (E2E) sul web abbiano guadagnato una cattiva reputazione per i test inaffidabili (instabili) e per il rallentamento dei processi di sviluppo, gli strumenti E2E moderni hanno fatto passi avanti per creare test più affidabili, interattivi e utili. Quando si sceglie un framework di test E2E, le seguenti sezioni forniscono alcune indicazioni su cosa tenere presente nella scelta di un framework di test per la tua applicazione.

#### Test multi-browser {#cross-browser-testing}

Uno dei principali vantaggi noti dei test end-to-end (E2E) è la capacità di testare l'applicazione su più browser. Sebbene possa sembrare auspicabile avere una copertura multi-browser del 100%, è importante notare che i test multi-browser hanno un rendimento decrescente sulle risorse del team a causa del tempo aggiuntivo e della potenza della macchina richiesta per eseguirli in modo coerente. Di conseguenza, è importante essere consapevoli di questo compromesso quando si sceglie la quantità di test multi-browser necessari per la tua applicazione.

#### Feedback più rapido {#faster-feedback-loops}

Uno dei problemi principali legati ai test end-to-end (E2E) e allo sviluppo è che l'esecuzione di tutta la suite richiede molto tempo. Di solito, ciò avviene solo nelle pipeline di integrazione e distribuzione continue (CI/CD). I framework di test E2E moderni hanno contribuito a risolvere questo problema aggiungendo funzionalità come la parallelizzazione, che consente alle pipeline CI/CD di eseguire spesso i test con tempi molto più brevi rispetto a prima. Inoltre, durante lo sviluppo in locale, la possibilità di eseguire selettivamente un singolo test per la pagina su cui si sta lavorando, garantendo anche il ricaricamento a caldo dei test, può contribuire ad aumentare la produttività e il flusso di lavoro di uno sviluppatore.

#### Esperienza di debug di prima classe {#first-class-debugging-experience}

Mentre i programmatori tradizionalmente si affidavano all'analisi dei log in una finestra del terminale per determinare cosa fosse andato storto in un test, i moderni framework di test end-to-end (E2E) consentono ai programmatori di sfruttare strumenti con cui sono già familiari, ad esempio gli strumenti per sviluppatori del browser.

#### Visibilità in modalità headless {#visibility-in-headless-mode}

Quando i test end-to-end (E2E) vengono eseguiti nelle pipeline di integrazione / distribuzione continue, spesso vengono eseguiti in browser headless (cioè, nessun browser visibile viene aperto per l'utente). Una caratteristica critica dei moderni framework di test E2E è la capacità di visualizzare snapshot e/o video dell'applicazione durante il test, fornendo una certa comprensione del motivo per cui si verificano errori. Storicamente, mantenere queste integrazioni era laborioso.

### Raccomandazione {#recommendation-2}

- [Cypress](https://www.cypress.io/)

  Nel complesso, riteniamo che Cypress fornisca la soluzione E2E più completa, con funzionalità come un'interfaccia grafica informativa, eccellente capacità di debug, asserzioni integrate e stub, resistenza agli errori, parallelizzazione e snapshot. Come menzionato in precedenza, offre anche il supporto per il [testing dei componenti](https://docs.cypress.io/guides/component-testing/introduction). Tuttavia, supporta solo browser basati su Chromium e Firefox.

### Altre opzioni {#other-options-2}

- [Playwright](https://playwright.dev/) è anche una ottima soluzione di test E2E con un'ampia gamma di supporto per i browser (principalmente WebKit). Guarda [Why Playwright](https://playwright.dev/docs/why-playwright) per ulteriori dettagli.

- [Nightwatch](https://nightwatchjs.org/) è una soluzione di test E2E basata su [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver). Questo gli conferisce la più ampia gamma di supporto per i browser.

- [WebdriverIO](https://webdriver.io/) è un framework di automazione dei test per il web e il testing mobile basato sul protocollo WebDriver.

## Ricette {#recipes}

### Aggiunta di Vitest a un Progetto {#adding-vitest-to-a-project}

In un progetto Vue basato su Vite, eseguire:

```sh
> npm install -D vitest happy-dom @testing-library/vue
```

Successivamente, aggiornare la configurazione di Vite per aggiungere il blocco di opzioni `test`:

```js{6-12}
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // abilita le API globali simili a Jest
    globals: true,
    // simula il DOM con happy-dom
    // (richiede l'installazione di happy-dom come dipendenza peer)
    environment: 'happy-dom'
  }
})
```

:::tip
Se si sta utilizzando TypeScript, aggiungere `vitest/globals` al campo `types` nel file `tsconfig.json`.

```json
// tsconfig.json

{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

:::

Poi creare un file con estensione `*.test.js` nel tuo progetto. Puoi posizionare tutti i file di test in una directory di test nella radice del progetto, o in directory di test accanto ai tuoi file sorgente. Vitest li cercherà automaticamente utilizzando la convenzione di denominazione.

```js
// MyComponent.test.js
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    }
  })

  // asserisci l'output
  getByText('...')
})
```

Infine, aggiornare il file `package.json` per aggiungere lo script di test e eseguirlo:

```json{4}
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```sh
> npm test
```

### Testare i Composables {#testing-composables}

> Si assume che tu abbia già letto la sezione [Composables](/guide/reusability/composables).

Quando si tratta di testare i composables, possiamo dividerli in due categorie: composables che non dipendono da un'istanza di componente host e composables che invece dipendono da essa.

Un composable dipende da un'istanza di componente host quando utilizza le seguenti API:

- Lifecycle hooks
- Provide / Inject

Se un composable utilizza solo le API di reattività, allora può essere testato invocandolo direttamente e verificando il suo stato / metodi restituiti:

```js
// counter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment
  }
}
```

```js
// counter.test.js
import { useCounter } from './counter.js'

test('useCounter', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})
```

Un composable che si basa su hook del ciclo di vita o su Provide / Inject deve essere incapsulato in un'istanza di componente host per essere testato. Possiamo creare un helper come il seguente:

```js
// test-utils.js
import { createApp } from 'vue'

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // sopprimi l'avviso di mancato template
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // restituisci il risultato e l'istanza dell'app
  // per testare provide / unmount
  return [result, app]
}
```

```js
import { withSetup } from './test-utils'
import { useFoo } from './foo'

test('useFoo', () => {
  const [result, app] = withSetup(() => useFoo(123))
  // fai il mock del provide per testare le iniezioni
  app.provide(...)
  // esegui le asserzioni
  expect(result.foo.value).toBe(1)
  // attiva l'hook onUnmounted se necessario
  app.unmount()
})
```

Per composables più complessi, potrebbe essere più facile testarli scrivendo test contro il componente wrapper utilizzando le tecniche di [Component Testing](#component-testing).

<!--
TODO more testing recipes can be added in the future e.g.
- How to set up CI via GitHub actions
- How to do mocking in component testing
-->
