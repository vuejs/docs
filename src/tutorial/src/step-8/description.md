# Właściwość computed {#computed-property}

Kontynuujmy budowanie na podstawie listy zadań z ostatniego kroku. Tutaj dodaliśmy już funkcję przełączania do każdego todo. Odbywa się to poprzez dodanie właściwości `done` do każdego obiektu todo i użycie `v-model` do powiązania jej z polem wyboru:

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

Kolejnym usprawnieniem, które możemy dodać, jest możliwość ukrycia już ukończonych zadań. Mamy już przycisk, który przełącza stan `hideCompleted`. Ale jak renderować różne elementy listy w oparciu o ten stan?

<div class="options-api">

Przedstawiamy <a target="_blank" href="/guide/essentials/computed.html">wartości computed</a>. Możemy zadeklarować właściwość, która jest reaktywnie obliczana na podstawie innych właściwości przy użyciu opcji `computed`:

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // zwraca przefiltrowane zadania na podstawie `this.hideCompleted`
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
      // zwraca przefiltrowane zadania na podstawie `this.hideCompleted`
    }
  }
})
```

</div>

</div>
<div class="composition-api">

Przedstawiamy <a target="_blank" href="/guide/essentials/computed.html">`computed()`</a>. Możemy utworzyć wyliczany ref, który oblicza swoją `.value` na podstawie innych reaktywnych źródeł danych:

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // zwraca przefiltrowane zadania na podstawie 
  // `todos.value` i `hideCompleted.value`
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
      // zwraca przefiltrowane zadania na podstawie 
      // `todos.value` i `hideCompleted.value`
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

Obliczana właściwość śledzi inne stany reaktywne używane w jej obliczeniach jako zależności. Buforuje wynik i automatycznie aktualizuje go, gdy zmieniają się jego zależności.

Teraz spróbuj dodać właściwość obliczaną `filteredTodos` i zaimplementuj jej logikę obliczeniową! Jeśli zostanie zaimplementowana poprawnie, zaznaczenie todo podczas ukrywania ukończonych elementów powinno natychmiast je ukryć.
