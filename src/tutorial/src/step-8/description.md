# Computed Property {#computed-property}

Continuiamo a sviluppare la todo list dal punto in cui ci eravamo fermati. Qui, abbiamo già aggiunto la funzionalità di toggle per ciascun todo. Questo viene fatto aggiungendo una proprietà `done` a ogni oggetto todo e usando `v-model` per fare il binding al checkbox:

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

Il prossimo miglioramento che possiamo aggiungere è la possibilità di nascondere i todos già completati. Abbiamo già un pulsante che alterna lo stato `hideCompleted`. Ma come possiamo rendere i diversi elementi dell'elenco in base a questo stato? 

<div class="options-api">

Introducendo la <a target="_blank" href="/guide/essentials/computed.html">computed property</a>. Possiamo dichiarare una proprietà che viene calcolata in modo reattivo da altre proprietà utilizzando l'opzione `computed`:

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // restituisce i todos filtrati in base a `this.hideCompleted`
    }
  }
}
```

</div>
<div class="html">

```js
createApp({
  // ...
  computed: {
    filteredTodos() {
      // restituisce i todos filtrati in base a `this.hideCompleted`
    }
  }
})
```

</div>

</div>
<div class="composition-api">

Introducendo <a target="_blank" href="/guide/essentials/computed.html">`computed()`</a>. Possiamo creare un computed ref che calcola il suo `.value` in base ad altri dati reattivi.

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // restituisce i todos filtrati in base a 
  // `todos.value` & `hideCompleted.value`
})
```

</div>
<div class="html">

```js{10-13}
import { createApp, ref, computed } from 'vue'

createApp({
  setup() {
    const hideCompleted = ref(false)
    const todos = ref([
      /* ... */
    ])

    const filteredTodos = computed(() => {
      // restituisce i todos filtrati in base a 
      // `todos.value` & `hideCompleted.value`
    })

    return {
      // ...
    }
  }
})
```

</div>

</div>

```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

Una computed property tiene traccia degli altri stati reattivi utilizzati nel suo calcolo come dipendenze. Mette in cache il risultato e lo aggiorna automaticamente quando le sue dipendenze cambiano.

Ora, prova ad aggiungere la computed property `filteredTodos` e a implementare la sua logica di calcolo! Se implementata correttamente, la spunta di un todo quando stiamo nascondendo quelli completati dovrebbe nasconderlo istantaneamente.
