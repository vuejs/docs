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

## E2E Testing {#e2e-testing}

While unit tests provide developers with some degree of confidence, unit and component tests are limited in their abilities to provide holistic coverage of an application when deployed to production. As a result, end-to-end (E2E) tests provide coverage on what is arguably the most important aspect of an application: what happens when users actually use your applications.

End-to-end tests focus on multi-page application behavior that makes network requests against your production-built Vue application. They often involve standing up a database or other backend and may even be run against a live staging environment.

End-to-end tests will often catch issues with your router, state management library, top-level components (e.g. an App or Layout), public assets, or any request handling. As stated above, they catch critical issues that may be impossible to catch with unit tests or component tests.

End-to-end tests do not import any of your Vue application's code, but instead rely completely on testing your application by navigating through entire pages in a real browser.

End-to-end tests validate many of the layers in your application. They can either target your locally built application, or even a live Staging environment. Testing against your Staging environment not only includes your frontend code and static server, but all associated backend services and infrastructure.

> The more your tests resemble the way your software is used, the more confidence they can give you. - [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106) - Author of the Testing Library

By testing how user actions impact your application, E2E tests are often the key to higher confidence in whether an application is functioning properly or not.

### Choosing an E2E Testing Solution {#choosing-an-e2e-testing-solution}

While end-to-end (E2E) testing on the web has gained a negative reputation for unreliable (flaky) tests and slowing down development processes, modern E2E tools have made strides forward to create more reliable, interactive, and useful tests. When choosing an E2E testing framework, the following sections provide some guidance on things to keep in mind when choosing a testing framework for your application.

#### Cross-browser testing {#cross-browser-testing}

One of the primary benefits that end-to-end (E2E) testing is known for is its ability to test your application across multiple browsers. While it may seem desirable to have 100% cross-browser coverage, it is important to note that cross browser testing has diminishing returns on a team's resources due the additional time and machine power required to run them consistently. As a result, it is important to be mindful of this trade-off when choosing the amount of cross-browser testing your application needs.

#### Faster feedback loops {#faster-feedback-loops}

One of the primary problems with end-to-end (E2E) tests and development is that running the entire suite takes a long time. Typically, this is only done in continuous integration and deployment (CI/CD) pipelines. Modern E2E testing frameworks have helped to solve this by adding features like parallelization, which allows for CI/CD pipelines to often run magnitudes faster than before. In addition, when developing locally, the ability to selectively run a single test for the page you are working on while also providing hot reloading of tests can help to boost a developer's workflow and productivity.

#### First-class debugging experience {#first-class-debugging-experience}

While developers have traditionally relied on scanning logs in a terminal window to help determine what went wrong in a test, modern end-to-end (E2E) test frameworks allow developers to leverage tools that they are already familiar with, e.g. browser developer tools.

#### Visibility in headless mode {#visibility-in-headless-mode}

When end-to-end (E2E) tests are run in continuous integration / deployment pipelines, they are often run in headless browsers (i.e., no visible browser is opened for the user to watch). A critical feature of modern E2E testing frameworks is the ability to see snapshots and/or videos of the application during testing, providing some insight into why errors are happening. Historically, it was tedious to maintain these integrations.

### Recommendation {#recommendation-2}

- [Cypress](https://www.cypress.io/)

  Overall, we believe Cypress provides the most complete E2E solution with features like an informative graphical interface, excellent debuggability, built-in assertions and stubs, flake-resistance, parallelization, and snapshots. As mentioned above, it also provides support for [Component Testing](https://docs.cypress.io/guides/component-testing/introduction). However, it only supports Chromium-based browsers and Firefox.

### Other Options {#other-options-2}

- [Playwright](https://playwright.dev/) is also a great E2E testing solution with a wider range of browser support (mainly WebKit). See [Why Playwright](https://playwright.dev/docs/why-playwright) for more details.

- [Nightwatch](https://nightwatchjs.org/) is an E2E testing solution based on [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver). This gives it the widest browser support range.

- [WebdriverIO](https://webdriver.io/) is a test automation framework for web and mobile testing based on the WebDriver protocol.

## Recipes {#recipes}

### Adding Vitest to a Project {#adding-vitest-to-a-project}

In a Vite-based Vue project, run:

```sh
> npm install -D vitest happy-dom @testing-library/vue
```

Next, update the Vite configuration to add the `test` option block:

```js{6-12}
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  }
})
```

:::tip
If you are using TypeScript, add `vitest/globals` to the `types` field in your `tsconfig.json`.

```json
// tsconfig.json

{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

:::

Then create a file ending in `*.test.js` in your project. You can place all test files in a test directory in project root, or in test directories next to your source files. Vitest will automatically search for them using the naming convention.

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

  // assert output
  getByText('...')
})
```

Finally, update `package.json` to add the test script and run it:

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

### Testing Composables {#testing-composables}

> This section assumes you have read the [Composables](/guide/reusability/composables) section.

When it comes to testing composables, we can divide them into two categories: composables that do not rely on a host component instance, and composables that do.

A composable depends on a host component instance when it uses the following APIs:

- Lifecycle hooks
- Provide / Inject

If a composable only uses Reactivity APIs, then it can be tested by directly invoking it and asserting its returned state / methods:

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

A composable that relies on lifecycle hooks or Provide / Inject needs to be wrapped in a host component to be tested. We can create a helper like the following:

```js
// test-utils.js
import { createApp } from 'vue'

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // suppress missing template warning
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // return the result and the app instance
  // for testing provide / unmount
  return [result, app]
}
```

```js
import { withSetup } from './test-utils'
import { useFoo } from './foo'

test('useFoo', () => {
  const [result, app] = withSetup(() => useFoo(123))
  // mock provide for testing injections
  app.provide(...)
  // run assertions
  expect(result.foo.value).toBe(1)
  // trigger onUnmounted hook if needed
  app.unmount()
})
```

For more complex composables, it could also be easier to test it by writing tests against the wrapper component using [Component Testing](#component-testing) techniques.

<!--
TODO more testing recipes can be added in the future e.g.
- How to set up CI via GitHub actions
- How to do mocking in component testing
-->
