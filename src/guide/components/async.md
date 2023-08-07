# Componenti asincroni {#async-components}

## Utilizzo base {#basic-usage}

Nelle grandi applicazioni, potrebbe essere necessario dividere l'applicazione in chunk più piccoli e caricare un componente dal server solo quando è necessario. Per rendere ciò possibile, Vue ha una funzione [`defineAsyncComponent`](/api/general#defineasynccomponent):

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...carica il componente dal server
    resolve(/* componente caricato */)
  })
})
// ... utilizzo normale del componente
```

Come si può notare, `defineAsyncComponent` accetta una funzione loader che restituisce una Promise. La funzione `resolve` della Promise dovrebbe essere chiamata quando hai recuperato la definizione del componente dal server. Puoi anche chiamare `reject(reason)` per indicare che il caricamento è fallito.

[ES module dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) restituisce anche una Promise, quindi nella maggior parte dei casi lo useremo in combinazione con `defineAsyncComponent`. I bundler come Vite e webpack supportano anche questa sintassi (e la utilizzeranno per dividere i bundle), quindi possiamo usarla per importare i file SFC di Vue.

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

Il componente risultante `AsyncComp` è un componente wrapper che chiama la funzione di caricamento solo quando viene effettivamente reso nella pagina. Inoltre, passerà tutte le props e gli slot al componente interno, consentendoti di utilizzare il wrapper asincrono per sostituire senza problemi il componente originale ottenendo il lazy loading.

Come con i componenti normali, i componenti asincroni possono essere [registrati globalmente](/guide/components/registration#global-registration) utilizzando `app.component()`:

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

<div class="options-api">

Puoi anche utilizzare `defineAsyncComponent` quando [registri un componente localmente](/guide/components/registration#local-registration):

```vue
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

</div>

<div class="composition-api">

Possono anche essere definiti direttamente all'interno del componente genitore:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

</div>

## Stati di caricamento e di errore {#stati-di-caricamento-e-di-errore}

Le operazioni asincrone implicano inevitabilmente stati di caricamento e di errore.  `defineAsyncComponent()` supporta la gestione di questi stati tramite opzioni avanzate:

```js
const AsyncComp = defineAsyncComponent({
  // la funzione loader
  loader: () => import('./Foo.vue'),

  // Componente utilizzato durante il caricamento dell'async component
  loadingComponent: LoadingComponent,
  // Ritardo prima di mostrare il componente di caricamento. Predefinito: 200ms.
  delay: 200,

  // Componente utilizzato se il caricamento fallisce
  errorComponent: ErrorComponent,
  // Il componente di errore verrà mostrato se viene fornito un timeout ed è superato. Predefinito: Infinity.
  timeout: 3000
})
```

Se viene fornito un componente di caricamento, verrà mostrato prima mentre l'inner component viene caricato. C'è un ritardo predefinito di 200 ms prima che il componente di caricamento venga mostrato - questo perché su reti veloci, uno stato di caricamento istantaneo potrebbe essere sostituito troppo velocemente e sembrare un lampeggio.

Se viene fornito un componente di errore, verrà mostrato quando la Promise restituita dalla funzione di caricamento viene rifiutata. È anche possibile specificare un timeout per mostrare il componente di errore quando la richiesta sta richiedendo troppo tempo.

## Using with Suspense {#using-with-suspense}

 I componenti asincroni possono essere utilizzati con il componente integrato `<Suspense>`.  L'interazione tra `<Suspense>` e i componenti asincroni è documentata nel [capitolo dedicato a `<Suspense>`](/guide/built-ins/suspense).
