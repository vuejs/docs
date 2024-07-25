# Nasłuchiwanie na zdarzenia {#event-listeners}

Możemy nasłuchiwać zdarzenia DOM za pomocą dyrektywy `v-on`:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

Ze względu na częste użycie, `v-on` ma również skróconą składnię:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

Tutaj `increment` odwołuje się do funkcji zadeklarowanej przy użyciu opcji `methods`:

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
      // update component state
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
      // update component state
      this.count++
    }
  }
})
```

</div>

Wewnątrz metody możemy uzyskać dostęp do instancji komponentu za pomocą `this`. Instancja komponentu udostępnia właściwości danych zadeklarowane przez `data`. Możemy aktualizować stan komponentu poprzez mutowanie tych właściwości.

</div>

<div class="composition-api">

<div class="sfc">

Tutaj `increment` odwołuje się do funkcji zadeklarowanej w `<script setup>`:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // update component state
  count.value++
}
</script>
```

</div>

<div class="html">

Tutaj, `increment` odwołuje się do metody w obiekcie zwróconym z `setup()`:

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

Wewnątrz funkcji możemy zaktualizować stan komponentu poprzez mutację referencji.

</div>

Obsługa zdarzeń może również korzystać z wyrażeń liniowych i upraszczać typowe zadania za pomocą modyfikatorów. Szczegóły te zostały omówione w  <a target="_blank" href="/guide/essentials/event-handling.html">Przewodniku - Obsługa zdarzeń</a>.

Teraz spróbuj samodzielnie zaimplementować <span class="options-api">metodę</span><span class="composition-api">fukncję</span>  `increment` i  powiązać ją z przyciskiem za pomocą `v-on`.
