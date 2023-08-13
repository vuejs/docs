---
outline: deep
---

# Suspense {#suspense}

:::warning Funzione Sperimentale
`<Suspense>` è una funzione sperimentale. Non è garantito che raggiunga uno stato stabile e l'API potrebbe cambiare prima che ciò accada.
:::

`<Suspense>` è un componente nativo per orchestrare le dipendenze asincrone in un albero di componenti. Può renderizzare uno stato di caricamento mentre si attende che più dipendenze asincrone annidate nell'albero dei componenti vengano risolte.

## Dipendenze Asincrone {#async-dependencies}

Per spiegare il problema che `<Suspense>` sta cercando di risolvere e come interagisce con queste dipendenze asincrone, immaginiamo una gerarchia di componenti come la seguente:

```
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus> (component con async setup())
   └─ <Content>
      ├─ <ActivityFeed> (componente asincrono)
      └─ <Stats> (componente asincrono)
```

Nell'albero dei componenti ci sono più componenti annidati il cui rendering dipende da una risorsa asincrona che deve essere prima risolta. Senza `<Suspense>` ciascuno di essi dovrà gestire i propri stati di caricamento/caricato e errore. Nel peggiore dei casi, potremmo vedere tre spinner di caricamento sulla pagina, con contenuti visualizzati in tempi diversi.

Il componente `<Suspense>` ci dà la possibilità di visualizzare stati di caricamento/errore a livello superiore mentre attendiamo che queste dipendenze asincrone annidate vengano risolte.

Ci sono due tipi di dipendenze asincrone per le quali `<Suspense>` può attendere:

1. Componenti con un hook `setup()` asincrono. Ciò include componenti che utilizzano `<script setup>` con espressioni `await` a livello superiore.

2. [Componenti Asincroni](/guide/components/async).

### `async setup()` {#async-setup}

Un componente della Composition API può avere un hook `setup()` asincrono:

```js
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

Se si utilizza `<script setup>`, la presenza di espressioni `await` di livello superiore rende automaticamente il componente una dipendenza asincrona:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

### Componenti Asincroni {#async-components}

I componenti asincroni possono essere messi **sospesi** (messi in attesa) per impostazione predefinita. Ciò significa che, se hanno un `<Suspense>` nella catena genitoriale, verranno trattati come una dipendenza asincrona di quel `<Suspense>`. In questo caso, lo stato di caricamento sarà controllato dal `<Suspense>`, e le opzioni di caricamento, errore, ritardo e timeout del componente saranno ignorate.

Il componente asincrono può scegliere di non essere controllato da `Suspense` e lasciare che il componente controlli sempre il proprio stato di caricamento specificando `suspensible: false` nelle sue opzioni.

## Stato di Loading {#loading-state}

Il componente `<Suspense>` ha due slot: `#default` e `#fallback`. Entrambi gli slot consentono solo `un` nodo figlio di primo livello. Il nodo nello slot default viene mostrato se possibile. In caso contrario, verrà mostrato il nodo nello slot di fallback.

```vue-html
<Suspense>
  <!-- componente con dipendenze asincrone annidate -->
  <Dashboard />

  <!-- stato di caricamento tramite slot #fallback -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

Al rendering iniziale, `<Suspense>` renderizzerà il contenuto dello slot predefinito in memoria. Se durante il processo vengono riscontrate dipendenze asincrone, entrerà in uno stato di **pending**. Durante lo stato di sospensione, verrà visualizzato il contenuto di fallback. Quando tutte le dipendenze asincrone riscontrate sono state risolte, `<Suspense>` entra in uno stato **resolved** e viene visualizzato il contenuto risolto dello slot predefinito.

Se non sono state riscontrate dipendenze asincrone durante il rendering iniziale, `<Suspense>` passerà direttamente a uno stato "resolved".

Una volta in uno stato "resolved", `<Suspense>` tornerà allo stato "pending" solo se il nodo radice dello slot `#default` viene sostituito. Nuove dipendenze asincrone annidate più in profondità nell'albero **non** causeranno il ritorno di `<Suspense>` a uno stato "pending".

Quando si verifica un "revert", il contenuto di fallback non verrà visualizzato immediatamente. Invece, `<Suspense>` mostrerà il contenuto `#default` precedente mentre attende che il nuovo contenuto e le sue dipendenze asincrone vengano risolti. Questo comportamento può essere configurato con la prop `timeout`: `<Suspense>` passerà al contenuto di fallback se impiega più tempo del `timeout` per rendere il nuovo contenuto predefinito. Un valore di `timeout` di 0 farà sì che il contenuto di fallback venga visualizzato immediatamente quando il contenuto predefinito viene sostituito.

## Eventi {#events}

Il componente `<Suspense>` emette 3 eventi: `pending`, `resolve` e `fallback`. L'evento `pending` si verifica quando si entra in uno stato "in sospeso". L'evento `resolve` viene emesso quando il nuovo contenuto è stato risolto nello slot `default`. L'evento `fallback` viene attivato quando vengono mostrati i contenuti dello slot `fallback`.

Gli eventi potrebbero essere utilizzati, ad esempio, per mostrare un indicatore di caricamento davanti al vecchio DOM mentre si caricano i nuovi componenti.

## Gestione degli Errori {#error-handling}

Attualmente, `<Suspense>` non fornisce una gestione degli errori tramite il componente stesso - tuttavia, è possibile utilizzare l'opzione [`errorCaptured`](/api/options-lifecycle#errorcaptured) o l'hook [`onErrorCaptured()`](/api/composition-api-lifecycle#onerrorcaptured) per catturare e gestire gli errori asincroni nel componente genitore di `<Suspense>`.

## Uso con Altri Componenti {#combining-with-other-components}

È comune voler utilizzare `<Suspense>` in combinazione con i componenti [`<Transition>`](./transition) e [`<KeepAlive>`](./keep-alive). L'ordine di annidamento di questi componenti è importante per farli funzionare correttamente.

In più, questi componenti sono spesso utilizzati insieme al componente `<RouterView>` da [Vue Router](https://router.vuejs.org/).

L'esempio seguente mostra come annidare questi componenti in modo che si comportino come previsto. Per combinazioni più semplici è possibile rimuovere i componenti che non servono:

```vue-html
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- contenuto principale -->
          <component :is="Component"></component>

          <!-- stato di caricamento -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>
```

Vue Router ha il supporto integrato per il [caricamento lazy dei componenti](https://router.vuejs.org/guide/advanced/lazy-loading.html) utilizzando importazioni dinamiche. Questi sono distinti dai componenti asincroni e per ora non attiveranno `<Suspense>`. Tuttavia, possono avere altri componenti asincroni come discendenti e questi possono attivare `<Suspense>` nel modo consueto.
