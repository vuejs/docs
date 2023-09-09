# Watchers {#watchers}

A volte abbiamo bisogno di eseguire dei "side effects" in modo reattivo. Per esempio, fare il log di un numero nella console quando esso cambia valore. Possiamo farlo attraverso i watchers:

<div class="composition-api">

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // si, console.log() è un side effect
  console.log(`il nuovo valore di count è: ${newCount}`)
})
```

`watch()` può essere utilizzato direttamente su di un ref e la callback viene eseguita appena cambia il valore di `count`. `watch()` può essere usato anche con altri tipi di sorgenti dati. Per maggiori dettagli, consultare <a target="_blank" href="/guide/essentials/watchers.html">Guida - I Watchers</a>.

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  watch: {
    count(newCount) {
      // si, console.log() è un side effect
      console.log(`il nuovo valore di count è: ${newCount}`)
    }
  }
}
```

In questo caso, si utilizza l'opzione `watch` per osservare le modifiche alla proprietà `count`. La callback viene eseguita quando il valore di `count` cambia e riceve il nuovo valore come argomento. Per maggiori dettagli, consultare <a target="_blank" href="/guide/essentials/watchers.html">Guida - I Watchers</a>.

</div>

Un esempio più pratico rispetto a fare il logging all'interno della console potrebbe essere quello di recuperare nuovi dati quando un ID cambia. Il codice che abbiamo effettua il fetch di alcuni todos da una mock API al mount del componente. C'è un bottone che incrementa l'ID del todo che deve essere recuperato. Prova a implementare un watcher che recupera un nuovo todo quando il bottone viene cliccato.
