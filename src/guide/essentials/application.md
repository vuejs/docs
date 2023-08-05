# Creazione di un'Applicazione Vue {#creating-a-vue-application}

## L'istanza dell'Applicazione {#the-application-instance}

Ogni applicazione Vue inizia creando una nuova **istanza dell'applicazione** con la funzione [`createApp`](/api/application#createapp):

```js
import { createApp } from 'vue'

const app = createApp({
  /* opzioni del root component (componente root) */
})
```

## Il Componente Root {#the-root-component}

L'oggetto che passiamo a `createApp` è in realtà un componente. Ogni app richiede un "componente radice" che può contenere altri componenti come suoi figli.

Utilizzando Componenti Single-File (SFC) di solito importiamo il componente root da un altro file:

```js
import { createApp } from 'vue'
// importa il componente root 'App' da un componente single-file.
import App from './App.vue'

const app = createApp(App)
```

Sebbene molti esempi in questa guida richiedano solo un singolo componente, la maggior parte delle applicazioni reali sono organizzate in un albero di componenti nidificati e riutilizzabili. Ad esempio, l'albero dei componenti di un'applicazione Todo potrebbe apparire così:

```
App (componente root)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

Nelle sezioni successive della guida, parleremo di come definire e comporre insieme più componenti. Prima, però, ci concentreremo su ciò che accade all'interno di un singolo componente.

## Mounting dell'Applicazione {#mounting-the-app}

Un'istanza dell'applicazione non renderizzerà nulla fino a quando non verrà chiamato il suo metodo `.mount()`. Questo metodo si aspetta un argomento "contenitore", che può essere sia un elemento reale del DOM sia un selettore di stringa:

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

Il contenuto del componente root dell'app verrà renderizzato all'interno dell'elemento contenitore. L'elemento contenitore stesso non è considerato parte dell'app.

Il metodo `.mount()` dovrebbe sempre essere chiamato dopo che siano state effettuate tutte le configurazioni dell'app e le registrazioni delle risorse. Nota anche che il valore che ritorna, a differenza dei metodi di registrazione delle risorse, è l'istanza del componente root invece dell'istanza dell'applicazione.

### Template del Componente Root nel DOM  {#in-dom-root-component-template}

Il template del componente root di solito è parte dello stesso componente, ma è possibile fornire il template separatamente, inserendolo direttamente nel contenitore di mount (nel mount container):

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

Vue utilizzerà automaticamente l'`innerHTML` del contenitore come template se il componente root non ha già un'opzione `template`.

I template nel DOM sono spesso utilizzati in applicazioni che [usano Vue senza una fase di build](/guide/quick-start.html#using-vue-from-cdn). Possono anche essere utilizzati in combinazione con framework server-side, dove il template root potrebbe essere generato dinamicamente dal server.

## Configurazioni dell'Applicazione {#app-configurations}

L'istanza dell'applicazione espone un oggetto `.config`  che ci permette di configurare alcune opzioni a livello di app, come ad esempio definire a livello di app un gestore di errori che cattura gli errori provenienti da tutti i componenti figli:

```js
app.config.errorHandler = (err) => {
  /* gestisci l'errore */
}
```

L'istanza dell'applicazione fornisce anche alcuni metodi per registrare le risorse a livello di app. Ad esempio, registrare un componente:

```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

Questo rende il `TodoDeleteButton` disponibile per l'uso ovunque nella nostra app. Parleremo della registrazione di componenti e altri tipi di risorse nelle successive sezioni della guida. Puoi anche sfogliare l'elenco completo delle API che riguardano l'istanza dell'applicazione nella [documentazione API](/api/application) relativa.

Assicurati di applicare tutte le configurazioni dell'app prima di montare l'app!

## Multiple istanze dell'applicazione {#multiple-application-instances}

Non sei limitato a una singola istanza dell'applicazione sulla stessa pagina. L'API `createApp` permette a più applicazioni Vue di coesistere sulla stessa pagina, ognuna con il suo ambito per la configurazione e l'uso di risorse globali:

```js
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

Se stai utilizzando Vue per migliorare l'HTML renderizzato dal server e hai bisogno di Vue solo per controllare parti specifiche di una grande pagina, evita di montare una singola istanza dell'applicazione Vue su tutta la pagina. Crea, invece, istanze dell'applicazione più piccole e montale sugli elementi da controllare.
