# Hook del Ciclo di Vita {#lifecycle-hooks}

Quando viene creata, ciascuna istanza di un componente Vue attraversa una serie di passaggi di inizializzazione - ad esempio: deve impostare l'osservazione dei dati, compilare il template, montare l'istanza nel DOM e aggiornare il DOM quando i dati cambiano. Lungo il percorso, esegue anche delle funzioni chiamate hook del ciclo di vita, dando agli utenti l'opportunità di aggiungere il proprio codice in specifiche fasi.

## Registrazione degli Hook del Ciclo di Vita {#registering-lifecycle-hooks}

Ad esempio, l'hook <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> può essere utilizzato per eseguire del codice dopo che il componente ha terminato il rendering iniziale e creato i nodi del DOM:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`il componente è ora montato.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`il componente è ora montato.`)
  }
}
```

</div>

Ci sono anche altri hook che verranno chiamati in diverse fasi del ciclo di vita dell'istanza del componente, quelli comunemente utilizzati sono <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle#onmounted), [`onUpdated`](/api/composition-api-lifecycle#onupdated) e [`onUnmounted`](/api/composition-api-lifecycle#onunmounted).</span> <span class="options-api">[`mounted`](/api/options-lifecycle#mounted), [`updated`](/api/options-lifecycle#updated) e [`unmounted`](/api/options-lifecycle#unmounted).</span>

<div class="options-api">

Tutti gli hook del ciclo di vita sono chiamati con il loro contesto `this` che punta all'istanza corrente attiva che li invoca. Nota: ciò significa che dovresti evitare di utilizzare le funzioni arrow quando dichiari gli hook del ciclo di vita, poiché, se lo fai, non sarai in grado di accedere all'istanza del componente tramite `this`.

</div>

<div class="composition-api">

Quando si chiama `onMounted`, Vue associa automaticamente la funzione di callback registrata con l'istanza corrente del componente attivo. Questo richiede che gli hook vengano registrati **in maniera sincronizzata** durante l'installazione del componente. Ad esempio, non fare questo:

```js
setTimeout(() => {
  onMounted(() => {
    // questo non funzionerà.
  })
}, 100)
```

Si noti che ciò non significa che la chiamata debba essere posta lessicalmente all'interno di `setup()` o `<script setup>`. `onMounted()` può essere chiamato in una funzione esterna purché lo stack di chiamate sia sincrono e abbia origine all'interno di `setup()`.

</div>

## Diagramma del Ciclo di Vita {#lifecycle-diagram}

Di seguito è riportato un diagramma per il ciclo di vita dell'istanza di un componente. Non è necessario comprendere completamente tutto ciò che sta accadendo in questo momento, ma man mano che impari e costruisci più applicazioni, sarà un riferimento utile.

![Diagramma del Ciclo di Vita](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

Consulta le <span class="composition-api">[API sugli Hook del Ciclo di Vita](/api/composition-api-lifecycle)</span><span class="options-api">[API sugli Hook del Ciclo di Vita](/api/options-lifecycle)</span> per i dettagli su tutti gli hook del ciclo di vita e i rispettivi casi d'uso.
