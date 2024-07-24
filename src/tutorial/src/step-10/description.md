# Obserwatorzy {#watchers}

Czasami możemy potrzebować wykonać „efekty uboczne” reaktywnie - na przykład logowanie liczby do konsoli, gdy się zmieni. Możemy to osiągnąć za pomocą obserwatorów:

<div class="composition-api">

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // tak, console.log() jest efektem ubocznym
  console.log(`new count is: ${newCount}`)
})
```

`watch()` może bezpośrednio obserwować ref, a wywołanie zwrotne jest uruchamiane za każdym razem, gdy zmienia się wartość `count`. `watch()` może również obserwować inne typy źródeł danych - więcej szczegółów znajduje się w  <a target="_blank" href="/guide/essentials/watchers.html">Przewodnik - Obserwatorzy</a>.

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
      // tak, console.log() jest efektem ubocznym
      console.log(`new count is: ${newCount}`)
    }
  }
}
```

Tutaj używamy opcji `watch` do obserwowania zmian we właściwości `count`. Wywołanie zwrotne watch jest wywoływane, gdy zmienia się `count` i otrzymuje nową wartość jako argument. Więcej szczegółów znajduje się w <a target="_blank" href="/guide/essentials/watchers.html">Przewodnik - Obserwatorz</a>.

</div>

Bardziej praktycznym przykładem niż logowanie do konsoli byłoby pobieranie nowych danych po zmianie identyfikatora. Kod, który mamy, pobiera dane todo z mock API na zamontowanym komponencie. Posiadamy również przycisk, który zwiększa identyfikator todo, który powinien zostać pobrany. Spróbuj zaimplementować metodę obserwującą, która pobiera nowe todo po kliknięciu przycisku.