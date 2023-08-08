# I Watcher {#watchers}

## Esempio Base {#basic-example}

Le computed properties ci permettono di calcolare in maniera dichiarativa dei valori derivati. Tuttavia, ci sono casi in cui abbiamo bisogno di eseguire "side effects" in risposta ai cambiamenti di stato - ad esempio: fare modifiche al DOM o cambiare un altro pezzo di stato in base al risultato di un'operazione asincrona.

<div class="options-api">

Con l'Options API possiamo usare l'[opzione `watch`](/api/options-state#watch) per attivare una funzione ogni volta che una proprietà reattiva cambia:

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Le domande contengono di solito un punto interrogativo. ;-)'
    }
  },
  watch: {
    // ogni volta che question cambia, questa funzione verrà eseguita
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Sto pensando...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Errore! Impossibile raggiungere l\'API. ' + error
      }
    }
  }
}
```

```vue-html
<p>
  Fai una domanda a risposta sì/no:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[Prova nel Playground](https://play.vuejs.org/#eNptUk2PmzAQ/SuvXAA1sdVrmt0qqnroqa3UIxcLhuCGjKk/wkYR/70OBJLuroRkPDPvzbznuSS7rhOnQMkm2brS6s4/F0wvnbEeFdUqtB6XgoFKeZXl0z9gyQfL8w34G8h5bXiDNF3NQcWuJxtDv25Zh+CCatszSsNeaYZakDgqexD4vM7TCT9cj2Ek65Uvm83cTUr0DTGdyN7RZaN4T24F32iHOnA5hnvdtrCBJ+RcnTH180wrmLaaL4s+QNd4LBOaK3r5UWfplzTHM9afHmoxdhV78rtRcpbPmVHEf1qO5BtTuUWNcmcu8QC9046kk4l4Qvq70XzQvBdC3CyKJfb8OEa01fn4OC7Wq15pj5qidVnaeN+5jZRncmxE72upOp0uY77ulU3gSCT+uOhXnt9yiy6U1zdBRtYa+9aK+9TfrgUf8NWEtgKbK6mKQN8Qdj+/C6T4iJHkXcsKjt9WLpsZL56OXas8xRuw7cYD2LlDXKYoT7K5b+OU22rugsdpfTQVtU9FMueLBHKikRNPpLtcbnuLYZjCW7m0TIZ/92UFiQ==)

L'opzione `watch` supporta anche un percorso di chiavi separate da punti:

```js
export default {
  watch: {
    // Nota: solo percorsi semplici. Le espressioni non sono supportate.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

Con la Composition API possiamo utilizzare la [funzione `watch`](/api/reactivity-core#watch) per innescare una callback ogni volta che cambia uno stato reattivo:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Le domande contengono di solito un punto interrogativo. ;-)')

// watch funziona direttamente su un ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Sto pensando...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Errore! Impossibile raggiungere l\'API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Fai una domanda a risposta sì/no:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[Prova nel Playground](https://play.vuejs.org/#eNplkkGPmzAQhf/KKxdA3Rj1mpJUUdVDT22lHrlYxDRuYOzaJjRC/PcdxyGr3b2A7PfmmzcMc3awVlxGlW2z2rdO2wCvwmj3DenBGhcww6nuCZMM7QkLOmcG5FyRN9RQa8gH/BuVD9oQdtFb5Hm5KpL8pNx6/+vu8xj9KPv+CnYFqQnyhTFIdxb4vCkjpaFb32JVnyD9lVoUpKaVVmK3x9wQoLtXgtB0VP9/cOMveYk9Np/K5MM9l7jIflScLv990nTW9EcIwXNFR3DX1YwYk4dxyrNXTlIHdCrGyk8hWL+tqqvyZMQUukpaHYOnujdtilTLHPHXGyrKUiRH8i9obx+5UM4Z98j6Pu23qH/AVzP2R5CJRMl14aRw+PldIMdH3Bh3bnzxY+FcdZW2zPvlQ1CD7WVQfALquPToP/gzL4RHqsg89rJNWq3JjgGXzWCOqt812ao3GaqEqRKHcfO8/gDLkq7r6tEyW54Bf5TTlg==)

### Tipi di Valori Osservati {#watch-source-types}

Il primo argomento di `watch` può avere diversi tipi di "sorgenti" reattive: può essere un ref (inclusi i ref calcolati), un oggetto reattivo, una funzione getter o un array di valori multipli:

```js
const x = ref(0)
const y = ref(0)

// ref singola
watch(x, (newX) => {
  console.log(`x è ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`la somma di x + y è: ${sum}`)
  }
)

// array di valori multipli
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x è ${newX} e y è ${newY}`)
})
```

Nota che non puoi osservare una proprietà di un oggetto reattivo in questo modo:

```js
const obj = reactive({ count: 0 })

// questo non funzionerà perché stiamo passando un numero a watch()
watch(obj.count, (count) => {
  console.log(`count è: ${count}`)
})
```

Invece, utilizza un getter:

```js
// instead, use a getter:
watch(
  () => obj.count,
  (count) => {
    console.log(`count è: ${count}`)
  }
)
```

</div>

## Watcher Avanzati {#deep-watchers}

<div class="options-api">

Di default, un `watch` è di tipo "shallow" (superficiale): la callback verrà attivata solo quando alla proprietà osservata viene assegnato un nuovo valore - non verrà attivata in caso di modifiche alle proprietà annidate. Se vuoi che la callback venga eseguita per tutte le modifiche effettuate alle proprietà annidate, devi utilizzare un watcher di tipo "deep" (avanzato):

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Nota: qui `newValue` sarà uguale a `oldValue`
        // osu mutazioni annidate fintanto che l'oggetto stesso
        // non è stato sostituito.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

Quando chiami `watch()` direttamente su un oggetto reattivo, verrà creato implicitamente un watcher avanzato - la callback verrà attivata su tutte le mutazioni annidate:

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // si attiva con mutazioni di proprietà annidate
  // Nota: qui newValue sarà uguale a oldValue
  // perché entrambi puntano allo stesso oggetto!
})

obj.count++
```

Questo dovrebbe essere differenziato da un getter che restituisce un oggetto reattivo - nel secondo caso, la callback verrà attivata solo se il getter restituisce un oggetto diverso:

```js
watch(
  () => state.someObject,
  () => {
    // si attiva solo quando state.someObject viene sostituito
  }
)
```

Puoi forzare, tuttavia, il secondo caso in un watcher avanzato utilizzando esplicitamente l'opzione `deep`:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Nota: qui newValue sarà uguale a oldValue
    // *a meno che* state.someObject non sia stato sostituito
  },
  { deep: true }
)
```

</div>

:::warning Usa con Cautela
Il watcher avanzato richiede il traversing di tutte le proprietà annidate nell'oggetto osservato e può essere costoso se utilizzato su grandi strutture dati. Usalo solo quando necessario e tieni conto delle implicazioni sulle prestazioni.
:::

## Watcher Immediati {#eager-watchers}

Di default `watch` è "pigro": la callback non verrà chiamata finché la fonte osservata non cambierà. Ma in alcuni casi potremmo volere che la stessa logica di callback venga eseguita immediatamente - ad esempio, potremmo voler recuperare alcuni dati iniziali e poi ri-recuperare i dati ogni volta che ci siano modifiche dello stato.

<div class="options-api">

Possiamo forzare l'esecuzione immediata della callback di un watcher dichiarandolo tramite un oggetto con una funzione `handler` e l'opzione `immediate: true`:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // questo verrà eseguito immediatamente alla creazione del componente.
      },
      // forza l'esecuzione immediata della callback
      immediate: true
    }
  }
  // ...
}
```

L'esecuzione iniziale della funzione handler avverrà appena prima dell'hook `created`. Vue avrà già elaborato le opzioni `data`, `computed` e `methods`, quindi queste proprietà saranno disponibili alla prima invocazione.

</div>

<div class="composition-api">

Possiamo forzare l'esecuzione immediata della callback di un watcher passando l'opzione `immediate: true`:

```js
watch(source, (newValue, oldValue) => {
  // eseguito immediatamente, poi di nuovo quando `source` cambia
}, { immediate: true })
```

</div>

<div class="composition-api">

## `watchEffect()` \*\* {#watcheffect}

È comune che la callback del watcher utilizzi esattamente lo stesso stato reattivo del valore osservato. Ad esempio, considera il seguente codice, che utilizza un watcher per caricare una risorsa remota ogni volta che la ref `todoId` cambia:

```js
const todoId = ref(1)
const data = ref(null)

watch(todoId, async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
}, { immediate: true })
```

In particolare notiamo come il watcher utilizzi `todoId` due volte, una volta come valore osservato e poi di nuovo all'interno della callback.

Questo può essere semplificato con [`watchEffect()`](/api/reactivity-core#watcheffect). `watchEffect()` ci permette di tenere traccia automaticamente delle dipendenze reattive della callback. Il watcher sopra può essere riscritto come:

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

Qui, la callback verrà eseguita immediatamente, senza bisogno di specificare `immediate: true`. Durante la sua esecuzione, terrà automaticamente traccia di `todoId.value` come dipendenza (come nelle computed properties). Ogni volta che `todoId.value` cambia, la callback verrà eseguita di nuovo. Con `watchEffect()` non c'è più bisogno di passare `todoId` esplicitamente come valore osservato.

Puoi vedere [questo esempio](/examples/#fetching-data) di `watchEffect()` e del recupero di dati reattivi in azione.

Per questo tipo di esempi, con una sola dipendenza, il vantaggio di `watchEffect()` è relativamente piccolo. Ma per i watcher che hanno molteplici dipendenze, l'utilizzo di `watchEffect()` elimina la responsabilità di dover mantenere manualmente l'elenco delle dipendenze. Inoltre, se hai bisogno di osservare diverse proprietà in una struttura di dati nidificata, `watchEffect()` può rivelarsi più efficiente di un watcher avanzato, poiché terrà traccia solo delle proprietà utilizzate nella callback, invece di tracciarle tutte in modo ricorsivo.

:::tip
`watchEffect` monitora le dipendenze solo durante l'esecuzione che avviene in **modo sincrono**. Se lo si utilizza con una callback asincrona, solo le proprietà a cui si accede prima del primo comando `await` vengono considerate come dipendenze.
:::

### `watch` vs. `watchEffect` {#watch-vs-watcheffect}

`watch` e `watchEffect` permettono entrambi di eseguire "side effects" in modo reattivo. La loro differenza principale sta nel modo in cui tracciano le dipendenze reattive:

- `watch` tiene traccia soltanto della fonte specificata che sta osservando. Non tiene conto di ciò che viene utilizzato all'interno della callback. Inoltre, la callback viene innescata solo quando la fonte specifica cambia effettivamente. `watch` separa il monitoraggio delle dipendenze dall'azione che deve essere eseguita, offrendo un controllo più dettagliato sul "quando" la callback deve essere attivata.

- `watchEffect`, invece, unisce il monitoraggio delle dipendenze con l'azione in una sola fase. Esso traccia automaticamente ogni proprietà reattiva che viene utilizzata durante la sua esecuzione sincrona. Questo approccio è più pratico e generalmente porta a un codice più snello, ma rende meno chiare le dipendenze reattive.

</div>

## Tempi di esecuzione della Callback {#callback-flush-timing}

La modifica di uno stato reattivo potrebbe innescare sia gli aggiornamenti del componente Vue sia le callback del watcher da te create.

Di default, le callback del watcher create dall'utente vengono chiamate **prima** degli aggiornamenti del componente Vue. Questo significa che se tenti di accedere al DOM all'interno di una callback del watcher, il DOM sarà nello stato precedente all'applicazione degli aggiornamenti da parte di Vue.

Se desideri accedere al DOM in una callback del watcher **dopo** che Vue lo ha aggiornato, devi specificare l'opzione `flush: 'post'`:

<div class="options-api">

```js
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

</div>

<div class="composition-api">

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

L'opzione post-flush di `watchEffect()` ha anche un comodo alias, `watchPostEffect()`:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* eseguito dopo gli aggiornamenti di Vue */
})
```

</div>

<div class="options-api">

## `this.$watch()` \* {#this-watch}

È anche possibile creare watcher in modo imperativo utilizzando il [metodo di istanza `$watch()`](/api/component-instance#watch):

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

Questo è utile quando hai bisogno di configurare un watcher in modo condizionale o quando desideri osservare qualcosa solo in risposta a un'interazione dell'utente. Ti permette anche di fermare il watcher in anticipo.

</div>

## Fermare un Watcher {#stopping-a-watcher}

<div class="options-api">

I watcher dichiarati utilizzando l'opzione `watch` o il metodo di istanza `$watch()` vengono fermati automaticamente quando il componente proprietario passa nello stage `unmounted` (smontato), quindi, nella maggior parte dei casi non devi preoccuparti di fermare tu stesso il watcher.

Nel raro caso in cui hai bisogno di fermare un watcher prima che il componente proprietario venga smontato, l'API `$watch()` restituisce una funzione per farlo:

```js
const unwatch = this.$watch('foo', callback)

// ... quando il watcher non è più necessario:
unwatch()
```

</div>

<div class="composition-api">

I watcher dichiarati in modo sincrono all'interno di `setup()` o `<script setup>` sono legati all'istanza del componente proprietario e verranno fermati automaticamente quando il componente proprietario passa nello stage `unmounted` (smontato). Nella maggior parte dei casi, quindi, non devi preoccuparti di fermare tu stesso il watcher.

Il concetto chiave qui è che il watcher deve essere creato in **modo sincrono**: se il watcher viene creato in una callback asincrona, non sarà legato al componente proprietario e dovrà essere fermato manualmente per evitare perdite di memoria. Ecco un esempio:

```vue
<script setup>
import { watchEffect } from 'vue'

// questo verrà fermato automaticamente
watchEffect(() => {})

// ...questo no!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

Per fermare manualmente un watcher, utilizza la funzione handle. Questo vale sia per `watch` che per `watchEffect`:

```js
const unwatch = watchEffect(() => {})

// ... più tardi, quando non è più necessario
unwatch()
```

Nota che dovrebbero esserci pochissimi casi in cui hai bisogno di creare watcher in modo asincrono, e che la creazione sincrona dovrebbe essere preferita ogni volta che è possibile. Se hai bisogno di attendere alcuni dati asincroni, puoi usare una logica condizionale per il tuo watcher:

```js
// dati da caricare in modo asincrono
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // fai qualcosa quando i dati sono caricati
  }
})
```

</div>
