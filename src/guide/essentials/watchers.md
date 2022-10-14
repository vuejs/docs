# Watchers (Obserwatorzy)

## Przykład podstawowy

Właściwości obliczeniowe pozwalają nam deklaratywnie obliczać wartości pochodne. Istnieją jednak przypadki, w których musimy wykonać " działanie poboczne" w reakcji na zmiany stanu - na przykład zmutować DOM lub zmienić inny element stanu w oparciu o wynik operacji asynchronicznej.

<div class="options-api">

W Options API, możemy użyć metody [`watch` option](/api/options-state.html#watch), aby wywołać funkcję za każdym razem, gdy zmieni się właściwość reaktywna:

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)'
    }
  },
  watch: {
    // gdy tylko pytanie ulegnie zmianie, funkcja ta zostanie uruchomiona
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      }
    }
  }
}
```

```vue-html
<p>
  Ask a yes/no question:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb246ICcnLFxuICAgICAgYW5zd2VyOiAnUXVlc3Rpb25zIHVzdWFsbHkgY29udGFpbiBhIHF1ZXN0aW9uIG1hcmsuIDstKSdcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgLy8gd2hlbmV2ZXIgcXVlc3Rpb24gY2hhbmdlcywgdGhpcyBmdW5jdGlvbiB3aWxsIHJ1blxuICAgIHF1ZXN0aW9uKG5ld1F1ZXN0aW9uLCBvbGRRdWVzdGlvbikge1xuICAgICAgaWYgKG5ld1F1ZXN0aW9uLmluZGV4T2YoJz8nKSA+IC0xKSB7XG4gICAgICAgIHRoaXMuZ2V0QW5zd2VyKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBhc3luYyBnZXRBbnN3ZXIoKSB7XG4gICAgICB0aGlzLmFuc3dlciA9ICdUaGlua2luZy4uLidcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL3llc25vLnd0Zi9hcGknKVxuICAgICAgICB0aGlzLmFuc3dlciA9IChhd2FpdCByZXMuanNvbigpKS5hbnN3ZXJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMuYW5zd2VyID0gJ0Vycm9yISBDb3VsZCBub3QgcmVhY2ggdGhlIEFQSS4gJyArIGVycm9yXG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBBc2sgYSB5ZXMvbm8gcXVlc3Rpb246XG4gICAgPGlucHV0IHYtbW9kZWw9XCJxdWVzdGlvblwiIC8+XG4gIDwvcD5cbiAgPHA+e3sgYW5zd2VyIH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Opcja `watch` obsługuje również składnię w postaci kropek jako klucz:

```js
export default {
  watch: {
    // Uwaga: tylko proste typy składni. Wyrażenia nie są obsługiwane.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

W Composition API, możemy użyć funkcji [`watch`](/api/reactivity-core.html#watch), aby wywołać wywołanie zwrotne za każdym razem, gdy zmieni się jakiś element stanu reaktywnego:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// obserwacja działa bezpośrednio na ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnXG5cbmNvbnN0IHF1ZXN0aW9uID0gcmVmKCcnKVxuY29uc3QgYW5zd2VyID0gcmVmKCdRdWVzdGlvbnMgdXN1YWxseSBjb250YWluIGEgcXVlc3Rpb24gbWFyay4gOy0pJylcblxud2F0Y2gocXVlc3Rpb24sIGFzeW5jIChuZXdRdWVzdGlvbikgPT4ge1xuICBpZiAobmV3UXVlc3Rpb24uaW5kZXhPZignPycpID4gLTEpIHtcbiAgICBhbnN3ZXIudmFsdWUgPSAnVGhpbmtpbmcuLi4nXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL3llc25vLnd0Zi9hcGknKVxuICAgICAgYW5zd2VyLnZhbHVlID0gKGF3YWl0IHJlcy5qc29uKCkpLmFuc3dlclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhbnN3ZXIudmFsdWUgPSAnRXJyb3IhIENvdWxkIG5vdCByZWFjaCB0aGUgQVBJLiAnICsgZXJyb3JcbiAgICB9XG4gIH1cbn0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBBc2sgYSB5ZXMvbm8gcXVlc3Rpb246XG4gICAgPGlucHV0IHYtbW9kZWw9XCJxdWVzdGlvblwiIC8+XG4gIDwvcD5cbiAgPHA+e3sgYW5zd2VyIH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

### Typy źróddeł obserwatorów

Opcja `watch` obsługuje również ścieżkę w postaci kropek jako klucz:
// Uwaga: tylko proste typy ścieżek. Wyrażenia nie są obsługiwane.
Pierwszym argumentem `watch` mogą być różne typy reaktywnych "źródeł": może to być ref (włączając w to obliczone refy), obiekt reaktywny, funkcja pobierająca lub tablica wielu źródeł:

```js
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

Należy pamiętać, że nie można w ten sposób obserwować właściwości obiektu reaktywnego:

```js
const obj = reactive({ count: 0 })

// this won't work because we are passing a number to watch()
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

Zamiast tego,używaj getter:

```js
// zamiast tego,używaj getter:
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

</div>

## Głeboki Watcher

<div class="options-api">

Domyślnie `watch` jest płytki: wywołanie zwrotne zostanie wywołane tylko wtedy, gdy obserwowanej właściwości zostanie przypisana nowa wartość - nie zostanie wywołane przy zagnieżdżonych zmianach właściwości. Jeśli chcesz, aby wywołanie zwrotne wyzwalało się na wszystkich zagnieżdżonych mutacjach, musisz użyć głębokiego obserwatora:

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Uwaga: `newValue` będzie tutaj równe `oldValue`.
        // na zagnieżdżonych mutacjach tak długo, jak długo sam obiekt
        // nie został zastąpiony.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

Kiedy wywołasz `watch()` bezpośrednio na obiekcie reaktywnym, utworzy on niejawnie głębokiego obserwatora - wywołanie zwrotne zostanie wywołane na wszystkich zagnieżdżonych mutacjach:

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // wywołuje mutacje właściwości zagnieżdżonych
  // Uwaga: `newValue` będzie tutaj równe `oldValue`.
  // ponieważ obie wskazują na ten sam obiekt!
})

obj.count++
```

Należy to odróżnić od gettera, który zwraca obiekt reaktywny - w tym drugim przypadku wywołanie zwrotne zostanie wywołane tylko wtedy, gdy getter zwróci inny obiekt:

```js
watch(
  () => state.someObject,
  () => {
    // wywołuje się tylko wtedy, gdy state.someObject zostanie zastąpiony
  }
)
```

Można jednak zmusić drugi przypadek do głębokiej obserwacji, jawnie używając opcji `deep`:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Uwaga: `newValue` będzie tutaj równe `oldValue`.
    // *chyba że* state.someObject został zastąpiony
  },
  { deep: true }
)
```

</div>

:::warning Używaj z rozwagą
Głęboka obserwacja wymaga prześledzenia wszystkich zagnieżdżonych właściwości obserwowanego obiektu i może być kosztowna, gdy jest używana na dużych strukturach danych. Używaj go tylko wtedy, gdy jest to konieczne i uważaj na jego wpływ na wydajność.
:::

<div class="options-api">

## Watcher natychmiastowy \*

Domyślnie `watch` jest leniwy: wywołanie zwrotne nie zostanie wywołane dopóki obserwowane źródło nie ulegnie zmianie. Jednak w niektórych przypadkach możemy chcieć, aby ta sama logika wywołania zwrotnego była uruchamiana natychmiast - na przykład, możemy chcieć pobrać pewne dane początkowe, a następnie ponownie pobrać te dane, gdy tylko zmieni się odpowiedni stan.

Możemy wymusić natychmiastowe wykonanie wywołania zwrotnego watchera, deklarując go za pomocą obiektu z funkcją `handler` i opcją `immediate: true`:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // będzie to uruchamiane natychmiast po utworzeniu komponentu.
      },
      // wymuś wykonanie żądanego wywołania zwrotnego
      immediate: true
    }
  }
  // ...
}
```

</div>

<div class="composition-api">

## `watchEffect()` \*\*

Funkcja `watch()` jest leniwa: wywołanie zwrotne nie zostanie wywołane, dopóki obserwowane źródło się nie zmieni. Jednak w niektórych przypadkach możemy chcieć, aby ta sama logika wywołania zwrotnego była uruchamiana natychmiast - na przykład, możemy chcieć pobrać pewne dane początkowe, a następnie ponownie pobrać te dane, gdy tylko zmieni się odpowiedni stan. Może się zdarzyć, że tak właśnie zrobimy:

```js
const url = ref('https://...')
const data = ref(null)

async function fetchData() {
  const response = await fetch(url.value)
  data.value = await response.json()
}

// pobieraj natychmiast
fetchData()
// ...a następnie obserwuj zmianę adresu url
watch(url, fetchData)
```

Można to uprościć za pomocą [`watchEffect()`] (/api/reactivity-core.html#watcheffect). Funkcja `watchEffect()` pozwala nam na natychmiastowe wykonanie efektu ubocznego, jednocześnie automatycznie śledząc reaktywne zależności tego efektu. Powyższy przykład może być przepisany jako:

```js
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

W tym przypadku wywołanie zwrotne zostanie uruchomione natychmiast. Podczas jego wykonywania, będzie on również automatycznie śledził `url.value` jako zależność (podobnie jak w przypadku właściwości computed). Kiedykolwiek `url.value` się zmieni, callback zostanie uruchomiony ponownie.

Możesz sprawdzić [ten przykład](/examples/#fetching-data) z `watchEffect` i reaktywnym pobieraniem danych w akcji.

:::tip
Funkcja `watchEffect` śledzi zależności tylko podczas swojego **synchronicznego** wykonania. W przypadku użycia go z wywołaniem zwrotnym asynchronicznym, śledzone będą tylko właściwości dostępne przed pierwszym `await`.
:::

### `watch` vs. `watchEffect`

Zarówno `watch` jak i `watchEffect` pozwalają nam na reaktywne wykonywanie efektów ubocznych. Ich główną różnicą jest sposób w jaki śledzą swoje reaktywne zależności:

- `watch` śledzi tylko jawnie obserwowane źródło. Nie będzie śledzić niczego, do czego uzyskuje się dostęp wewnątrz wywołania zwrotnego. Dodatkowo, wywołanie zwrotne jest wyzwalane tylko wtedy, gdy źródło rzeczywiście się zmieniło. `watch` oddziela śledzenie zależności od efektu ubocznego, dając nam bardziej precyzyjną kontrolę nad tym, kiedy wywołanie zwrotne powinno zostać odpalone.

- Z drugiej strony, `watchEffect` łączy śledzenie zależności i efekt uboczny w jedną fazę. Automatycznie śledzi każdą właściwość reaktywną, do której uzyskano dostęp podczas jej synchronicznego wykonywania. Jest to wygodniejsze i zazwyczaj powoduje, że kod jest krótszy, ale powoduje, że zależności reaktywne są mniej wyraźne.

</div>

## Callback Flush Timing

Kiedy mutujesz stan reaktywny, może on wywoływać zarówno aktualizacje komponentów Vue, jak i wywołania zwrotne obserwatorów utworzone przez użytkownika.

Domyślnie, wywołania zwrotne obserwatora utworzone przez użytkownika są wywoływane **przed** aktualizacjami komponentów Vue. Oznacza to, że jeśli użytkownik spróbuje uzyskać dostęp do DOM wewnątrz wywołania zwrotnego obserwatora, DOM będzie znajdował się w stanie, w którym Vue nie zastosowało żadnych aktualizacji.

Jeśli chcesz uzyskać dostęp do DOM w wywołaniu zwrotnym obserwatora **po** aktualizacji przez Vue, musisz określić opcję `flush: 'post'`:

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

Post-flush `watchEffect()` ma także wygodny alias, `watchPostEffect()`:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* executed after Vue updates */
})
```

</div>

<div class="options-api">

## `this.$watch()` \*

It's also possible to imperatively create watchers using the [`$watch()` instance method](/api/component-instance.html#watch):

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

Jest to przydatne, gdy trzeba warunkowo skonfigurować obserwatora lub obserwować coś tylko w odpowiedzi na interakcję użytkownika. Umożliwia to również wcześniejsze zatrzymanie obserwatora.

</div>

## Zatrzymywanie Watcher

<div class="options-api">

Watchery zadeklarowane przy użyciu opcji `watch` lub metody instancji `$watch()` są automatycznie zatrzymywane, gdy komponent właściciela jest odmontowywany, więc w większości przypadków nie trzeba się martwić o zatrzymywanie watchera.

W rzadkich przypadkach, gdy trzeba zatrzymać watchera przed odmontowaniem komponentu właściciela, API `$watch()` zwraca funkcję, która to umożliwia:

```js
const unwatch = this.$watch('foo', callback)

// ...when the watcher is no longer needed:
unwatch()
```

</div>

<div class="composition-api">

Watchery zadeklarowane synchronicznie wewnątrz `setup()` lub `<script setup>` są związane z instancją komponentu właściciela i zostaną automatycznie zatrzymane, gdy ten zostanie odmontowany. W większości przypadków nie musisz się martwić o zatrzymywanie watchera.

Kluczem jest to, że watcher musi być tworzony **synchronicznie**: jeśli watcher jest tworzony w wywołaniu zwrotnym asynchronicznym, nie będzie powiązany z komponentem właściciela i musi być zatrzymany ręcznie, aby uniknąć wycieków pamięci. Oto przykład:

```vue
<script setup>
import { watchEffect } from 'vue'

// ten zostanie automatycznie zatrzymany
watchEffect(() => {})

// ...ten nie będzie!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

Aby ręcznie zatrzymać watchera, użyj funkcji return handle. Działa to zarówno dla `watch` jak i `watchEffect`:

```js
const unwatch = watchEffect(() => {})

// ...później, gdy nie będzie już potrzebny
unwatch()
```

Należy pamiętać, że powinno być bardzo mało przypadków, w których trzeba tworzyć watchery asynchronicznie, a tworzenie synchroniczne powinno być preferowane zawsze, gdy jest to możliwe. Jeśli musisz czekać na dane asynchroniczne, możesz zamiast tego uczynić logikę obserwacyjną warunkową:

```js
// dane ładowane asynchronicznie
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // zrób coś, gdy dane zostaną załadowane
  }
})
```

</div>
