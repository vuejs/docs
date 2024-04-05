# Watchers {#watchers}

## Grundlegendes Beispiel {#basic-example}

Mit berechneten Eigenschaften können wir abgeleitete Werte deklarativ berechnen. Es gibt jedoch Fälle, in denen als Reaktion auf Zustandsänderungen "Seiteneffekte" ausgeführt werden müssen, z. B. Mutation des DOM oder Änderung eines anderen Teils des Zustands auf der Grundlage des Ergebnisses einer asynchronen Operation.

<div class="options-api">

Mit der Options-API können wir die Option [`watch`](/api/options-state.html#watch) verwenden, um eine Funktion auszulösen, sobald sich eine reaktive Eigenschaft ändert:

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)'
    }
  },
  watch: {
    // whenever question changes, this function will run
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
  Stellen Sie eine Ja/Nein-Frage:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[Versuchen Sie es auf dem Spielplatz](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb246ICcnLFxuICAgICAgYW5zd2VyOiAnUXVlc3Rpb25zIHVzdWFsbHkgY29udGFpbiBhIHF1ZXN0aW9uIG1hcmsuIDstKSdcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgLy8gd2hlbmV2ZXIgcXVlc3Rpb24gY2hhbmdlcywgdGhpcyBmdW5jdGlvbiB3aWxsIHJ1blxuICAgIHF1ZXN0aW9uKG5ld1F1ZXN0aW9uLCBvbGRRdWVzdGlvbikge1xuICAgICAgaWYgKG5ld1F1ZXN0aW9uLmluZGV4T2YoJz8nKSA+IC0xKSB7XG4gICAgICAgIHRoaXMuZ2V0QW5zd2VyKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBhc3luYyBnZXRBbnN3ZXIoKSB7XG4gICAgICB0aGlzLmFuc3dlciA9ICdUaGlua2luZy4uLidcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL3llc25vLnd0Zi9hcGknKVxuICAgICAgICB0aGlzLmFuc3dlciA9IChhd2FpdCByZXMuanNvbigpKS5hbnN3ZXJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMuYW5zd2VyID0gJ0Vycm9yISBDb3VsZCBub3QgcmVhY2ggdGhlIEFQSS4gJyArIGVycm9yXG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBBc2sgYSB5ZXMvbm8gcXVlc3Rpb246XG4gICAgPGlucHV0IHYtbW9kZWw9XCJxdWVzdGlvblwiIC8+XG4gIDwvcD5cbiAgPHA+e3sgYW5zd2VyIH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Die Option `watch` unterstützt auch einen durch Punkte getrennten Pfad als Schlüssel:

```js
export default {
  watch: {
    // Hinweis: nur einfache Pfade. Ausdrücke werden nicht unterstützt.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

Mit der Composition API können wir die Funktion [`watch`](/api/reactivity-core.html#watch) verwenden, um einen Callback auszulösen, sobald sich ein Teil des reaktiven Zustands ändert:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Fragen enthalten in der Regel ein Fragezeichen. ;-)')

// Uhr arbeitet direkt auf einem Ref
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

[Versuchen Sie es auf dem Spielplatz](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnXG5cbmNvbnN0IHF1ZXN0aW9uID0gcmVmKCcnKVxuY29uc3QgYW5zd2VyID0gcmVmKCdRdWVzdGlvbnMgdXN1YWxseSBjb250YWluIGEgcXVlc3Rpb24gbWFyay4gOy0pJylcblxud2F0Y2gocXVlc3Rpb24sIGFzeW5jIChuZXdRdWVzdGlvbikgPT4ge1xuICBpZiAobmV3UXVlc3Rpb24uaW5kZXhPZignPycpID4gLTEpIHtcbiAgICBhbnN3ZXIudmFsdWUgPSAnVGhpbmtpbmcuLi4nXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL3llc25vLnd0Zi9hcGknKVxuICAgICAgYW5zd2VyLnZhbHVlID0gKGF3YWl0IHJlcy5qc29uKCkpLmFuc3dlclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhbnN3ZXIudmFsdWUgPSAnRXJyb3IhIENvdWxkIG5vdCByZWFjaCB0aGUgQVBJLiAnICsgZXJyb3JcbiAgICB9XG4gIH1cbn0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBBc2sgYSB5ZXMvbm8gcXVlc3Rpb246XG4gICAgPGlucHV0IHYtbW9kZWw9XCJxdWVzdGlvblwiIC8+XG4gIDwvcD5cbiAgPHA+e3sgYW5zd2VyIH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

### Quellenarten beobachten {#watch-source-types}

Das erste Argument von `watch` kann aus verschiedenen Arten von reaktiven "Quellen" bestehen: Es kann ein ref (einschließlich berechneter refs), ein reaktives Objekt, eine Getter-Funktion oder ein Array aus mehreren Quellen sein:

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

// Array aus mehreren Quellen
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

Beachten Sie, dass Sie eine Eigenschaft eines reaktiven Objekts nicht auf diese Weise überwachen können:

```js
const obj = reactive({ count: 0 })

// dies wird nicht funktionieren, da wir eine Zahl an watch() übergeben
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

Verwenden Sie stattdessen einen Getter:

```js
// verwenden Sie stattdessen einen Getter:
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

</div>

## Deep Watchers {#deep-watchers}

<div class="options-api">

`watch` ist standardmäßig oberflächlich: der Callback wird nur ausgelöst, wenn der überwachten Eigenschaft ein neuer Wert zugewiesen wurde - er wird nicht bei verschachtelten Eigenschaftsänderungen ausgelöst. Wenn Sie möchten, dass der Callback bei allen verschachtelten Änderungen ausgelöst wird, müssen Sie einen Deep Watcher verwenden:

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Hinweis: `newValue` ist hier gleich `oldValue`
        // bei verschachtelten Mutationen, solange das Objekt selbst
        // nicht ersetzt worden ist.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

Wenn Sie `watch()` direkt auf einem reaktiven Objekt aufrufen, wird implizit ein Deep Watcher erstellt - der Callback wird bei allen verschachtelten Mutationen ausgelöst:

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // feuert auf verschachtelte Eigenschaftsmutationen
  // Hinweis: `newValue` wird hier gleich `oldValue` sein
  // weil sie beide auf dasselbe Objekt zeigen!
})

obj.count++
```

Dies ist zu unterscheiden von einem Getter, der ein reaktives Objekt zurückgibt - im letzteren Fall wird der Callback nur ausgelöst, wenn der Getter ein anderes Objekt zurückgibt:

```js
watch(
  () => state.someObject,
  () => {
    // wird nur ausgelöst, wenn state.someObject ersetzt wird
  }
)
```

Sie können jedoch den zweiten Fall in einen Deep Watcher erzwingen, indem Sie explizit die Option `deep` verwenden:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Hinweis: `newValue` ist hier gleich `oldValue`
    // *außer* state.someObject wurde ersetzt
  },
  { deep: true }
)
```

</div>

:::warning Verwendung mit Vorsicht
Deep Watch erfordert das Durchlaufen aller verschachtelten Eigenschaften des überwachten Objekts und kann bei großen Datenstrukturen teuer sein. Verwenden Sie es nur, wenn es notwendig ist, und achten Sie auf die Auswirkungen auf die Leistung.
:::

<div class="options-api">

## Eager Watchers \* {#eager-watchers}

`watch` is lazy by default: the callback is only called when the monitored source has changed. But in some cases, we want the same callback logic to run eagerly - for example, we want to retrieve some initial data and then retrieve the data again when the relevant state changes.

Wir können erzwingen, dass der Rückruf eines Watchers sofort ausgeführt wird, indem wir ihn als Objekt mit einer `handler`-Funktion und der Option `immediate: true` deklarieren:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // wird dies sofort bei der Erstellung der Komponente ausgeführt.
      },
      // eifrige Callback-Ausführung erzwingen
      immediate: true
    }
  }
  // ...
}
```

Die anfängliche Ausführung der Handler-Funktion wird kurz vor dem `created`-Hook erfolgen. Vue hat bereits die Optionen `data`, `computed` und `methods` verarbeitet, so dass diese Eigenschaften beim ersten Aufruf verfügbar sind.
</div>

<div class="composition-api">

## `watchEffect()` \*\* {#watcheffect}

`watch()` ist träge: der Callback wird erst aufgerufen, wenn sich die überwachte Quelle geändert hat. Aber in einigen Fällen möchten wir vielleicht, dass die gleiche Callback-Logik eifrig ausgeführt wird - zum Beispiel möchten wir einige anfängliche Daten abrufen und dann die Daten erneut abrufen, wenn sich der relevante Zustand ändert. Möglicherweise werden wir dies tun:

```js
const url = ref('https://...')
const data = ref(null)

async function fetchData() {
  const response = await fetch(url.value)
  data.value = await response.json()
}

// sofort abrufen
fetchData()
// ...dann auf Url-Änderung achten
watch(url, fetchData)
```

Dies kann mit [`watchEffect()`](/api/reactivity-core.html#watcheffect) vereinfacht werden. Mit `watchEffect()` können wir einen Seiteneffekt sofort ausführen und dabei automatisch die reaktiven Abhängigkeiten des Effekts verfolgen. Das obige Beispiel kann umgeschrieben werden als:

```js
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

Hier wird der Callback sofort ausgeführt. Während seiner Ausführung wird er auch automatisch `url.value` als Abhängigkeit verfolgen (ähnlich wie bei berechneten Eigenschaften). Wann immer sich `url.value` ändert, wird der Callback erneut ausgeführt.

Sie können sich [dieses Beispiel](/examples/#fetching-data) mit `watchEffect` und reaktivem Datenabruf in Aktion ansehen.

:::tip
`watchEffect` verfolgt Abhängigkeiten nur während seiner **synchronen** Ausführung. Wenn es mit einem asynchronen Callback verwendet wird, werden nur Eigenschaften verfolgt, auf die vor dem ersten `await`-Tick zugegriffen wird.
:::

### `watch` vs. `watchEffect` {#watch-vs-watcheffect}

Sowohl `watch` als auch `watchEffect` erlauben es uns, reaktiv Seiteneffekte auszuführen. Ihr Hauptunterschied ist die Art und Weise, wie sie ihre reaktiven Abhängigkeiten verfolgen:

- Sowohl `watch` als auch `watchEffect` erlauben es uns, reaktiv Seiteneffekte auszuführen. Ihr Hauptunterschied ist die Art und Weise, wie sie ihre reaktiven Abhängigkeiten verfolgen.

- `watchEffect` hingegen kombiniert die Verfolgung von Abhängigkeiten und Seiteneffekten in einer Phase. Sie verfolgt automatisch jede reaktive Eigenschaft, auf die während ihrer synchronen Ausführung zugegriffen wird. Dies ist bequemer und führt in der Regel zu kürzerem Code, macht aber die reaktiven Abhängigkeiten weniger explizit.

</div>

## Callback Flush Timing {#callback-flush-timing}

Wenn Sie den reaktiven Zustand verändern, kann dies sowohl Aktualisierungen der Vue-Komponenten als auch von Ihnen erstellte Watcher-Rückrufe auslösen.

Standardmäßig werden vom Benutzer erstellte Watcher-Callbacks **vor** den Aktualisierungen der Vue-Komponenten aufgerufen. Das bedeutet, wenn Sie versuchen, auf das DOM innerhalb eines Watcher-Callbacks zuzugreifen, wird das DOM in dem Zustand sein, bevor Vue irgendwelche Updates angewendet hat.

Wenn Sie in einem Watcher-Callback auf das DOM zugreifen wollen, ** nachdem** Vue es aktualisiert hat, müssen Sie die Option `flush: 'post'` angeben:

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

Post-flush `watchEffect()` hat auch einen praktischen Alias, `watchPostEffect()`:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* executed after Vue updates */
})
```

</div>

<div class="options-api">

## `this.$watch()` \* {#this-watch}

Es ist auch möglich, zwingend Watcher zu erstellen, indem man die [`$watch()` instance method](/api/component-instance.html#watch):

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

Dies ist nützlich, wenn Sie einen Watcher bedingt einrichten oder etwas nur als Reaktion auf eine Benutzerinteraktion beobachten wollen. Außerdem können Sie damit den Watcher frühzeitig beenden.

</div>

## Stopping a Watcher {#stopping-a-watcher}

<div class="options-api">

Watchers declared using the `watch` option or the `$watch()` instance method are automatically stopped when the owner component is unmounted, so in most cases you don't need to worry about stopping the watcher yourself.

In the rare case where you need to stop a watcher before the owner component unmounts, the `$watch()` API returns a function for that:

```js
const unwatch = this.$watch('foo', callback)

// ...when the watcher is no longer needed:
unwatch()
```

</div>

<div class="composition-api">

Watchers declared synchronously inside `setup()` or `<script setup>` are bound to the owner component instance, and will be automatically stopped when the owner component is unmounted. In most cases, you don't need to worry about stopping the watcher yourself.

The key here is that the watcher must be created **synchronously**: if the watcher is created in an async callback, it won't be bound to the owner component and must be stopped manually to avoid memory leaks. Here's an example:

```vue
<script setup>
import { watchEffect } from 'vue'

// this one will be automatically stopped
watchEffect(() => {})

// ...this one will not!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

To manually stop a watcher, use the returned handle function. This works for both `watch` and `watchEffect`:

```js
const unwatch = watchEffect(() => {})

// ...later, when no longer needed
unwatch()
```

Note that there should be very few cases where you need to create watchers asynchronously, and synchronous creation should be preferred whenever possible. If you need to wait for some async data, you can make your watch logic conditional instead:

```js
// data to be loaded asynchronously
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // do something when data is loaded
  }
})
```

</div>
