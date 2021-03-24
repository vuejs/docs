# Instanze dell'Applicatione e del Componente

## Creare un Istanza dell'Applicazione

Ogni applicazione Vue inizia creando una nuova **istanza dell'applicazione** con la funzione `createApp`:

```js
const app = Vue.createApp({
  /* opzioni */
})
```

L'istanza dell'applicazione è utilizzata per registrare dei 'globali' che potranno poi essere usati dai componenti all'interno dell'applicazione. Ne verrà discusso in dettaglio dopo nella guida ma questo è un piccolo esempio: 

```js
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```

La maggior parte dei metodi esposti dall'istanza dell'applicazione ritornano la stessa istanza, permettendo la concatenazione:

```js
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
```

Puoi sfogliare la completa API dell'applicazione nelle [API reference](../api/application-api.html).

## Il Componente Root

Le opzioni passate a `createApp` sono usate per configurare il **componente root**. Questo componente è utilizzato come punto d'inizio per il rendering quando **montiamo** l'applicazione

Un applicazione ha bisogno di essere montata in un elemento DOM. Per esempio, se vogliamo montare un'applicazione Vue in `<div id="app"></div>`, dobbiamo passare `#app`:

```js
const RootComponent = {
  /* opzioni */
}
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```

Diversamente dalla maggior parte dei metodi dell'applicazione, `mount` non ritorna l'applicazione. Invece ritorna l'istanza del componente root.

Nonostante non è strettamente associato con il [pattern MVVM](https://en.wikipedia.org/wiki/Model_View_ViewModel), il design di Vue è parzialmente ispirato ad esso. Come convenzione, noi spesso usiamo la variabile `vm` (abbreviazione per ViewModel) per riferirci ad un istanza di un componente.

Mentre tutti gli esempi su questa pagina hanno bisogno di un solo componente, la maggior parte delle applicazioni reali sono organizzate in alberi di componenti annidati e riusabili. Ad esempio, l'albero di un applicazione di Todo potrebbe assomigliare a questo:

```
Root Component
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

Ogni componente avrà la sua personale istanza, `vm`. Per alcuni componenti, come `TodoItem`, probabilmente ci saranno multiple instanze renderizzate nello stesso momento. Tutte le istanze dei componenti in questa applicazione condivideranno la stessa istanza dell'applicazione.

Parleremo del [sistema del componente](component-basics.html) in dettaglio più tardi. Per adesso, basta sapere che il componente root non è realmente differente dagli altri componenti. Le opzioni di configurazione sono le stesse, cosi come il comportamento della corrispettiva istanza del componente.

## Proprietà dell'Istanza del Componente

Precedentemente nella guida abbiamo incontrato le proprietà `data`. Le proprietà definite in `data` sono esposte attraverso l'istanza del componente:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4
```

Ci sono diverse opzioni per il componente che aggiungono proprietà definite dall'utente all'istanza del componente, come `methods`, `props`, `computed`, `inject` e `setup`. Discuteremo di ognuna di queste in dettaglio più avanti nella guida. Tutte le proprietà dell'istanza del componente, indipendentemente da come sono definite, sono accessibili nel template del componente.

Inoltre Vue espone alcune proprietà built-in attraverso l'istanza del componente, come `$attrs` ed `$emit`. Tutte queste proprietà hanno il prefisso `$` per evitare conflitti con i nomi delle proprietà definite dall'utente.

## Lifecycle Hooks

Ogni istanza del componente attraversa una serie di step di inizializzazione quando viene creata - ad esempio, ha bisogno di impostare l'osservazione dei dati, compilare il template, montare l'istanza nel DOM, e aggiornare il DOM quando i dati cambiano. Nel mentre, vengono eseguite funzioni chiamate **lifecycle hooks**, dando l'opportunità agli utenti di aggiungere il proprio codice in fasi specifiche.

Per esempio, l'hook [created](../api/options-lifecycle-hooks.html#created) può essere usato per eseguire codice dopo che un istanza è stata creata:

```js
Vue.createApp({
  data() {
    return { count: 1 }
  },
  created() {
    // `this` punta all'istanza vm
    console.log('count is: ' + this.count) // => "count is: 1"
  }
})
```

Ci sono inoltre hooks che verranno chiamati a fasi differenti del ciclo di vita dell'istanza, come [mounted](../api/options-lifecycle-hooks.html#mounted), [updated](../api/options-lifecycle-hooks.html#updated), e [unmounted](../api/options-lifecycle-hooks.html#unmounted). Tutti i lifecycle hooks sono chiamati con il loro contesto `this` che punta all'istanza corrente attiva che lo sta invocando.

::: tip
Non usare le [arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) come proprietà delle opzioni o come callback, come ad esempio `created: () => console.log(this.a)` o `vm.$watch('a', newValue => this.myMethod())`. Dato che un arrow function non ha il `this`, il `this` verrà trattato come qualunque altra variabile e cercato lessicalmente negli scopes padri finchè verrà trovato, spesso risultando in errori come `Uncaught TypeError: Cannot read property of undefined` o `Uncaught TypeError: this.myMethod is not a function`.
:::

## Diagramma del Ciclo di vita

Qui sotto è mostrato il diagramma del ciclo di vita dell'istanza. In questo momento non hai bisogno di comprendere appieno tutto il diagramma, ma mentre impari e realizzi più cose, sarà un utile riferimento.

<img src="/images/lifecycle.svg" width="840" height="auto" style="margin: 0px auto; display: block; max-width: 100%;" loading="lazy" alt="Instance lifecycle hooks">
