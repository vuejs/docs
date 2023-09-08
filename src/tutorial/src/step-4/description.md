# Listener degli eventi {#event-listeners}

Possiamo ascoltare gli eventi del DOM utilizzando la direttiva `v-on`:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

A causa del suo frequente utilizzo, `v-on` ha anche una sintassi abbreviata:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

Qui, `increment` fa riferimento a una funzione dichiarata utilizzando l'opzione `methods`:

<div class="sfc">

```js{7-12}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // aggiorna lo stato del componente
      this.count++
    }
  }
}
```

</div>
<div class="html">

```js{7-12}
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // aggiorna lo stato del componente
      this.count++
    }
  }
})
```

</div>

All'interno di un metodo, possiamo accedere all'istanza del componente utilizzando `this`. L'istanza, poi espone le proprietà dichiarate in `data`. In questo modo possiamo aggiornare lo stato del componente modificando queste proprietà.

</div>

<div class="composition-api">

<div class="sfc">

In questo caso, `increment` fa riferimento a una funzione dichiarata all'interno di `<script setup>`:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // aggiorna lo stato del componente
  count.value++
}
</script>
```

</div>

<div class="html">

In questo caso, `increment` fa riferimento a un metodo nell'oggetto restituito da `setup()`:

```js{$}
setup() {
  const count = ref(0)

  function increment(e) {
    // update component state
    count.value++
  }

  return {
    count,
    increment
  }
}
```

</div>

All'interno della funzione, possiamo aggiornare lo stato del componente mediante la modifica dei `refs`.

</div>

Gli eventi possono anche utilizzare espressioni inline e semplificare compiti comuni mediante l'uso dei modificatori. Questi dettagli sono trattati nella <a target="_blank" href="/guide/essentials/event-handling.html">Guida - La Gestione degli eventi</a>. 

Ora, prova tu a implementare <span class="options-api">il metodo</span><span class="composition-api">la funzione</span> `increment` legandolo al pulsante usando `v-on`.
