---
badges:
  - new
---

# Suspense <MigrationBadges :badges="$frontmatter.badges" />

:::warning Sperimentale
Suspense è una nuova funzionalità sperimentale e l'API potrebbe cambiare in qualsiasi momento. L'abbiamo comunque documentata in modo che la comunità possa dare un feedback sull'attuale implementazione.

Non dovrebbe essere utilizzato nelle applicazioni in production.
:::

## Introduzione

È normale che i componenti debbano eseguire un qualche tipo di richiesta asincrona prima di poter essere renderizzati correttamente. I componenti spesso gestiscono queste funzionalità a livello locale e in molti casi si tratta di un approccio perfettamente valido.

Il componente `<suspense>` fornisce un'alternativa, consentendo di gestire l'attesa più in alto nell'albero dei componenti, piuttosto che in ogni singolo componente.

Un caso d'uso comune riguarda i [componenti asincroni](/guide/component-dynamic-async.html#async-components):

```vue{2-4,6,17}
<template>
  <suspense>
    <template #default>
      <todo-list />
    </template>
    <template #fallback>
      <div>
        Loading...
      </div>
    </template>
  </suspense>
</template>

<script>
export default {
  components: {
    TodoList: defineAsyncComponent(() => import('./TodoList.vue'))
  }
}
</script>
```

Il componente `<suspense>` ha due slot, ognuno dei quali consente di avere un solo nodo figlio diretto. Se possibile, viene mostrato il nodo nello slot `default` e in caso contrario, viene mostrato il nodo nello slot `fallback`.

È importante sottolineare che il componente asincrono non deve essere figlio diretto di `<suspense>`. Può trovarsi ad una qualsiasi profondità all'interno dell'albero dei componenti e non è necessario che appaia nello stesso template di `<suspense>`. Il contenuto è considerato pronto per il rendering solo quando tutti i discendenti sono pronti.

L'altro modo per attivare lo slot `fallback` è che un componente discendente restituisca una promessa dalla sua funzione `setup`. Questo approccio è tipicamente implementato usando `async` piuttosto che restituendo esplicitamente una promessa:

```js{2}
export default {
  async setup() {
     // Fai molta attenzione a usare `await` in `setup`,
     // come la maggior parte delle funzioni della Composition API funzionerà solo
     // prima del primo `await`
    const data = await loadData()

     // Questo è implicitamente racchiuso in una promessa visto che la funzione è asincrona
    return {
      // ...
    }
  }
}
```

## Aggiornamento dei componenti figli

Una volta che un componente `<suspense>` ha risolto il contenuto del suo slot `default`, può essere riattivato solo se il nodo root `default` viene sostituito. I nuovi componenti annidati più in profondità nell'albero non sono sufficienti per riportare `<suspense>` in uno stato `pending`.

Se il nodo root cambia, emetterà l'evento `pending`. Tuttavia, da impostazione predefinita, non aggiornerà il DOM per mostrare il contenuto di `fallback`. Invece, continuerà a mostrare il vecchio DOM fino a quando i nuovi componenti non saranno pronti. Questo comportamento può essere controllato usando la prop `timeout`. Questo valore, espresso in millisecondi, dice al componente `<suspense>` quanto tempo aspettare prima di mostrare il `fallback`. Un valore di `0` lo mostrerà immediatamente quando `<suspense>` entra nello stato `pending`.

## Eventi

Oltre all'evento `pending`, il componente `<suspense>` possiede anche gli eventi `resolution` e `fallback`. L'evento `resolution` viene emesso quando il nuovo contenuto ha terminato la risoluzione nello slot `default`. L'evento `fallback` viene invece emesso quando vengono mostrati i contenuti dello slot `fallback`.

Questi eventi potrebbero essere utilizzati, ad esempio, per mostrare un indicatore di caricamento davanti al vecchio DOM durante il caricamento di nuovi componenti.

## Combinazione con altri componenti

È piuttosto comune voler usare `<suspense>` in combinazione con i componenti [`<transition>`](/api/built-in-components.html#transition) e [`<keep-alive>`](/api/built-in-components.html#keep-alive). L'ordine di nidificazione di questi componenti è importante perché funzionino correttamente.

Inoltre, questi componenti sono spesso usati insieme al componente `<router-view>` di [Vue Router](https://next.router.vuejs.org/).

L'esempio seguente mostra come annidare questi componenti in modo che si comportino tutti come previsto. Per combinazioni più semplici puoi rimuovere i componenti che non ti servono:

```html
<router-view v-slot="{ Component }">
  <template v-if="Component">
    <transition mode="out-in">
      <keep-alive>
        <suspense>
          <component :is="Component"></component>
          <template #fallback>
            <div>
              Loading...
            </div>
          </template>
        </suspense>
      </keep-alive>
    </transition>
  </template>
</router-view>
```

Vue Router integra il supporto per il [lazy loading](https://next.router.vuejs.org/guide/advanced/lazy-loading.html) dei componenti grazie alle importazioni dinamiche. Queste sono distinte dai componenti asincroni e non attivano `<suspense>`. Tuttavia, possono avere componenti asincroni come discendenti e questi ultimi possono a loro volta attivare `<suspense>`.