---
outline: deep
---

# Grundlagen der Reaktivität {#reactivity-fundamentals}

:::tip API-Präferenz
Diese Seite und viele andere Kapitel im weiteren Verlauf des Handbuchs enthalten unterschiedliche Inhalte für die Options-API und die Composition-API. Ihre aktuelle Präferenz ist <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. Mit den Schaltern "API-Einstellungen" oben in der linken Seitenleiste können Sie zwischen den API-Stilen wechseln.
:::

## Reaktiven Zustand deklarieren {#declaring-reactive-state}

<div class="options-api">

Mit der Options-API verwenden wir die Option `data`, um den reaktiven Zustand einer Komponente zu deklarieren. Der Optionswert sollte eine Funktion sein, die ein Objekt zurückgibt. Vue wird die Funktion bei der Erstellung einer neuen Komponenteninstanz aufrufen und das zurückgegebene Objekt in sein Reaktivitätssystem verpacken. Alle Top-Level-Eigenschaften dieses Objekts werden auf die Komponenteninstanz (`this` in Methoden und Lifecycle Hooks) proxiert:

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` is a lifecycle hook which we will explain later
  mounted() {
    // `this` refers to the component instance.
    console.log(this.count) // => 1

    // data can be mutated as well
    this.count = 2
  }
}
```

[Versuchen Sie es in Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gYG1vdW50ZWRgIGlzIGEgbGlmZWN5Y2xlIGhvb2sgd2hpY2ggd2Ugd2lsbCBleHBsYWluIGxhdGVyXG4gIG1vdW50ZWQoKSB7XG4gICAgLy8gYHRoaXNgIHJlZmVycyB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpIC8vID0+IDFcblxuICAgIC8vIGRhdGEgY2FuIGJlIG11dGF0ZWQgYXMgd2VsbFxuICAgIHRoaXMuY291bnQgPSAyXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIENvdW50IGlzOiB7eyBjb3VudCB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Diese Instanzeigenschaften werden nur hinzugefügt, wenn die Instanz zum ersten Mal erstellt wird, daher müssen Sie sicherstellen, dass sie alle in dem von der Funktion "data" zurückgegebenen Objekt vorhanden sind. Wenn nötig, verwenden Sie `null`, `undefined` oder einen anderen Platzhalterwert für Eigenschaften, für die der gewünschte Wert noch nicht verfügbar ist.

Es ist möglich, eine neue Eigenschaft direkt zu `this` hinzuzufügen, ohne sie in `data` aufzunehmen. Eigenschaften, die auf diese Weise hinzugefügt werden, können jedoch keine reaktiven Aktualisierungen auslösen.

Vue verwendet ein `$` Präfix, wenn es seine eigenen eingebauten APIs über die Komponenteninstanz offenlegt. Es reserviert auch das Präfix `_` für interne Eigenschaften. Sie sollten es vermeiden, Namen für Top-Level `data` Eigenschaften zu verwenden, die mit einem dieser Zeichen beginnen.

### Reaktiver Proxy vs. Original \* {#reactive-proxy-vs-original}

In Vue 3 werden die Daten reaktiv gemacht, indem man die [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Benutzer, die von Vue 2 kommen, sollten sich des folgenden Falles bewusst sein:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

Wenn Sie auf `this.someObject` zugreifen, nachdem Sie es zugewiesen haben, ist der Wert ein reaktiver Proxy des ursprünglichen `newObject`. **Im Gegensatz zu Vue 2 bleibt das ursprüngliche `newObject` intakt und wird nicht reaktiv gemacht: stellen Sie sicher, dass Sie immer auf den reaktiven Zustand als Eigenschaft von `this` zugreifen.**

</div>

<div class="composition-api">

Wir können ein reaktives Objekt oder Array mit der [`reactive()`](/api/reactivity-core.html#reactive) Funktion:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

Reaktive Objekte sind [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) und verhalten sich genau wie normale Objekte. Der Unterschied ist, dass Vue in der Lage ist, den Eigenschaftszugriff und die Mutationen eines reaktiven Objekts zu verfolgen. Wenn Sie neugierig auf die Details sind, erklären wir, wie Vue's Reaktivitätssystem funktioniert in [Reaktivität in der Tiefe](/guide/extras/reactivity-in-depth.html) - aber wir empfehlen, ihn zu lesen, nachdem Sie den Hauptleitfaden gelesen haben.

Siehe auch: [Typisierung Reaktiv](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

Um reaktive Zustände in einer Komponentenvorlage zu verwenden, deklarieren Sie sie und geben sie von der Funktion `setup()` der Komponente zurück:

```js{5,9-11}
import { reactive } from 'vue'

export default {
  // `setup` is a special hook dedicated for composition API.
  setup() {
    const state = reactive({ count: 0 })

    // expose the state to the template
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```

In ähnlicher Weise können wir Funktionen deklarieren, die den reaktiven Zustand im selben Bereich verändern, und sie als Methode neben dem Zustand offenlegen:

```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // Vergessen Sie nicht, auch die Funktion freizulegen.
    return {
      state,
      increment
    }
  }
}
```

Ausgesetzte Methoden werden in der Regel als Ereignis-Listener verwendet:

```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### `<script setup>` \*\* {#script-setup}

Die manuelle Freigabe von Zuständen und Methoden über `setup()` kann sehr aufwendig sein. Glücklicherweise ist es nur notwendig, wenn kein Build-Schritt verwendet wird. Bei der Verwendung von Single-File Components (SFCs) können wir die Verwendung mit `<script setup>` stark vereinfachen:

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

[Versuchen Sie es in Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBzdGF0ZS5jb3VudCsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPlxuICAgIHt7IHN0YXRlLmNvdW50IH19XG4gIDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Top-Level-Importe und Variablen, die in `<script setup>` deklariert werden, sind automatisch in der Vorlage der gleichen Komponente verwendbar.

> Für den Rest des Leitfadens werden wir hauptsächlich die SFC + `<script setup>` Syntax für Composition API Code Beispiele verwenden, da dies die häufigste Verwendung für Vue Entwickler ist.

</div>

<div class="options-api">

## Methoden deklarieren \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Free Vue.js Methods Lesson"/>

Um Methoden zu einer Komponenteninstanz hinzuzufügen, verwenden wir die Option `methods`. Dies sollte ein Objekt sein, das die gewünschten Methoden enthält:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // Methoden können in Lebenszyklus-Hooks oder anderen Methoden aufgerufen werden!
    this.increment()
  }
}
```

Vue bindet den `this` Wert für `methods` automatisch, so dass er sich immer auf die Komponenteninstanz bezieht. Dies stellt sicher, dass eine Methode den korrekten "this"-Wert beibehält, wenn sie als Event-Listener oder Callback verwendet wird. Man sollte es vermeiden, Pfeilfunktionen zu verwenden, wenn man `Methoden` definiert, da dies Vue daran hindert, den passenden `this` Wert zu binden:

```js
export default {
  methods: {
    increment: () => {
      // BAD: no `this` access here!
    }
  }
}
```

Genau wie alle anderen Eigenschaften der Komponenteninstanz sind die "Methoden" von der Vorlage der Komponente aus zugänglich. Innerhalb einer Vorlage werden sie am häufigsten als Ereignis-Listener verwendet:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Versuchen Sie es in Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Im obigen Beispiel wird die Methode `increment` aufgerufen, wenn der `<button>` angeklickt wird.

</div>

### DOM-Aktualisierungszeitpunkt {#dom-update-timing}

Wenn Sie den reaktiven Zustand ändern, wird das DOM automatisch aktualisiert. Es ist jedoch zu beachten, dass die DOM-Aktualisierungen nicht synchron durchgeführt werden. Stattdessen puffert Vue sie bis zum "nächsten Tick" im Aktualisierungszyklus, um sicherzustellen, dass jede Komponente nur einmal aktualisiert werden muss, egal wie viele Zustandsänderungen Sie vorgenommen haben.

Um zu warten, bis die DOM-Aktualisierung nach einer Zustandsänderung abgeschlossen ist, können Sie die globale API [nextTick()](/api/general.html#nexttick) verwenden:

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // access updated DOM
  })
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // access updated DOM
      })
    }
  }
}
```

</div>

### Tiefe Reaktivität {#deep-reactivity}

In Vue ist der Zustand standardmäßig sehr reaktiv. Das bedeutet, dass Sie erwarten können, dass Änderungen erkannt werden, selbst wenn Sie verschachtelte Objekte oder Arrays verändern:

<div class="options-api">

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // werden diese wie erwartet funktionieren.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

```js
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // werden diese wie erwartet funktionieren.
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

Es ist auch möglich, explizit [shallow reactive objects](/api/reactivity-advanced.html#shallowreactive) zu erstellen, bei denen die Reaktivität nur auf der Stammebene verfolgt wird, aber diese werden in der Regel nur in fortgeschrittenen Anwendungsfällen benötigt.

<div class="composition-api">

### Reaktiver Proxy vs. Original \*\* {#reactive-proxy-vs-original-1}

Es ist zu beachten, dass der von `reactive()` zurückgegebene Wert ein [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) des ursprünglichen Objekts ist, das nicht mit dem ursprünglichen Objekt identisch ist:

```js
const raw = {}
const proxy = reactive(raw)

// Proxy ist NICHT mit dem Original identisch.
console.log(proxy === raw) // false
```

Nur der Proxy ist reaktiv - eine Änderung des Originalobjekts löst keine Aktualisierungen aus. Daher ist die beste Praxis bei der Arbeit mit dem Reaktivitätssystem von Vue, **ausschließlich die Proxy-Versionen Ihres Zustands** zu verwenden.

Um einen konsistenten Zugriff auf den Proxy zu gewährleisten, gibt der Aufruf von `reactive()` auf dasselbe Objekt immer denselben Proxy zurück, und der Aufruf von `reactive()` auf einen bestehenden Proxy gibt ebenfalls denselben Proxy zurück:

```js
// der Aufruf von reactive() für dasselbe Objekt liefert denselben Proxy
console.log(reactive(raw) === proxy) // true

// der Aufruf von reactive() auf einem Proxy gibt sich selbst zurück
console.log(reactive(proxy) === proxy) // true
```

Diese Regel gilt auch für verschachtelte Objekte. Aufgrund der tiefen Reaktivität sind verschachtelte Objekte innerhalb eines reaktiven Objekts ebenfalls Proxys:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Beschränkungen von `reactive()` \*\* {#limitations-of-reactive}

Die API `reactive()` hat zwei Einschränkungen:

1. Es funktioniert nur für Objekttypen (Objekte, Arrays und [Sammlungstypen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) wie `Map` und `Set`). Es kann keine [primitiven Typen](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) wie `string`, `number` oder `boolean` enthalten.

2. Da das Reaktivitäts-Tracking von Vue über den Property-Zugriff funktioniert, müssen wir immer denselben Verweis auf das reaktive Objekt behalten. Das bedeutet, dass wir ein reaktives Objekt nicht einfach "ersetzen" können, da die Reaktivitätsverbindung zur ersten Referenz verloren geht:

   ```js
   let state = reactive({ count: 0 })

   // the above reference ({ count: 0 }) is no longer being tracked (reactivity connection is lost!)
   state = reactive({ count: 1 })
   ```

   Das bedeutet auch, dass wir die Verbindung zur Reaktivität verlieren, wenn wir die Eigenschaft eines reaktiven Objekts in lokalen Variablen zuweisen oder destrukturieren oder wenn wir diese Eigenschaft an eine Funktion übergeben:

   ```js
   const state = reactive({ count: 0 })

   // n is a local variable that is disconnected
   // from state.count.
   let n = state.count
   // does not affect original state
   n++

   // count is also disconnected from state.count.
   let { count } = state
   // does not affect original state
   count++

   // the function receives a plain number and
   // won't be able to track changes to state.count
   callSomeFunction(state.count)
   ```

## Reaktive Variablen mit `ref()` \*\* {#reactive-variables-with-ref}

Um die Einschränkungen von `reactive()` zu adressieren, bietet Vue auch eine [`ref()`](/api/reactivity-core.html#ref) Funktion, die es uns erlaubt, reaktive **"refs "** zu erstellen, die jeden Werttyp enthalten können:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` nimmt das Argument und gibt es in einem ref-Objekt mit der Eigenschaft `.value` zurück:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

Siehe auch: [Typing Refs](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

Ähnlich wie die Eigenschaften eines reaktiven Objekts ist auch die Eigenschaft `.value` eines ref reaktiv. Darüber hinaus wandelt ref bei der Aufnahme von Objekttypen seinen `.value` automatisch mit `reactive()` um.

Eine Referenz, die einen Objektwert enthält, kann reaktiv das gesamte Objekt ersetzen:

```js
const objectRef = ref({ count: 0 })

// this works reactively
objectRef.value = { count: 1 }
```

Refs können auch an Funktionen übergeben oder aus einfachen Objekten destrukturiert werden, ohne dass die Reaktivität verloren geht:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// the function receives a ref
// it needs to access the value via .value but it
// will retain the reactivity connection
callSomeFunction(obj.foo)

// still reactive
const { foo, bar } = obj
```

Mit anderen Worten, `ref()` ermöglicht es uns, einen "Verweis" auf einen beliebigen Wert zu erstellen und diesen weiterzugeben, ohne die Reaktivität zu verlieren. Diese Fähigkeit ist sehr wichtig, da sie häufig bei der Extraktion von Logik in [Composable Functions](/guide/reusability/composables.html) verwendet wird.

### Ref Unwrapping in Templates \*\* {#ref-unwrapping-in-templates}

Wenn auf refs als Top-Level-Eigenschaften in der Vorlage zugegriffen wird, werden sie automatisch "ausgepackt", so dass es nicht notwendig ist, `.value` zu verwenden. Hier ist das vorherige Zähler-Beispiel, das stattdessen `ref()` verwendet:

```vue{13}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- no .value needed -->
  </button>
</template>
```

[Versuchen Sie es in Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Beachten Sie, dass das Unwrapping nur gilt, wenn die Referenz eine Eigenschaft der obersten Ebene im Renderkontext der Vorlage ist. Ein Beispiel: `foo` ist eine Top-Level-Eigenschaft, aber `object.foo` ist keine.

Nehmen wir also das folgende Objekt:

```js
const object = { foo: ref(1) }
```

Der folgende Ausdruck wird **NICHT** wie erwartet funktionieren:

```vue-html
{{ object.foo + 1 }}
```

Das gerenderte Ergebnis wird `[object Object]` sein, weil `object.foo` ein ref object ist. Wir können das beheben, indem wir `foo` zu einer Eigenschaft der obersten Ebene machen:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

Das Rendering-Ergebnis wird nun `2` sein.

Zu beachten ist, dass ein ref auch dann ausgepackt wird, wenn es sich um den endgültigen Wert einer Textinterpolation handelt (d.h. ein <code v-pre>{{ }}</code>-Tag), so dass der folgende Text als `1` dargestellt wird:

```vue-html
{{ object.foo }}
```

Dies ist nur eine praktische Funktion der Textinterpolation und entspricht <code v-pre>{{ object.foo.value }}</code>.

### Ref Unwrapping in reaktiven Objekten \*\* {#ref-unwrapping-in-reactive-objects}

Wenn auf ein `ref` als Eigenschaft eines reaktiven Objekts zugegriffen wird oder es verändert wird, wird es auch automatisch entpackt, so dass es sich wie eine normale Eigenschaft verhält:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

Wenn eine neue Referenz einer Eigenschaft zugewiesen wird, die mit einer bestehenden Referenz verknüpft ist, ersetzt sie die alte Referenz:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref is now disconnected from state.count
console.log(count.value) // 1
```

Ref unwrapping findet nur statt, wenn es innerhalb eines tiefen reaktiven Objekts verschachtelt ist. Sie gilt nicht, wenn auf sie als Eigenschaft eines [shallow reactive object](/api/reactivity-advanced.html#shallowreactive) zugegriffen wird.

### Ref Unwrapping in Arrays und Collections {#ref-unwrapping-in-arrays-and-collections}

Im Gegensatz zu reaktiven Objekten wird kein Unwrapping durchgeführt, wenn auf den ref als Element eines reaktiven Arrays oder eines nativen Auflistungstyps wie `Map` zugegriffen wird:

```js
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Zustandsabhängige Methoden \* {#stateful-methods}

In einigen Fällen kann es erforderlich sein, eine Methodenfunktion dynamisch zu erstellen, z. B. bei der Erstellung eines entprellten Event-Handlers:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Debouncing with Lodash
    click: debounce(function () {
      // ... respond to click ...
    }, 500)
  }
}
```

Dieser Ansatz ist jedoch problematisch für Komponenten, die wiederverwendet werden, da eine entprellte Funktion **zustandsabhängig** ist: Sie behält einen internen Zustand über die verstrichene Zeit bei. Wenn sich mehrere Komponenteninstanzen dieselbe entprellte Funktion teilen, werden sie sich gegenseitig stören.

Um die entprellte Funktion jeder Komponenteninstanz unabhängig von den anderen zu halten, können wir die entprellte Version im `created` lifecycle hook erstellen:

```js
export default {
  created() {
    // each instance now has its own copy of debounced handler
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // also a good idea to cancel the timer
    // when the component is removed
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... respond to click ...
    }
  }
}
```

</div>

<div class="composition-api">

## ReAktivität Transformieren <sup class="vt-badge experimental" /> \*\* {#reactivity-transform}

Die Verwendung von `.value` mit refs ist ein Nachteil, der durch die sprachlichen Einschränkungen von JavaScript bedingt ist. Mit Compile-Time-Transformationen können wir jedoch die Ergonomie verbessern, indem wir automatisch `.value` an den entsprechenden Stellen anhängen. Vue bietet eine Kompilierzeittransformation, die es uns erlaubt, das frühere "counter"-Beispiel so zu schreiben:

```vue
<script setup>
let count = $ref(0)

function increment() {
  // no need for .value
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

Sie können mehr über [Reactivity Transform](/guide/extras/reactivity-transform.html) in dem entsprechenden Abschnitt erfahren. Bitte beachten Sie, dass die Funktion derzeit noch experimentell ist und sich vor ihrer Fertigstellung noch ändern kann.

</div>
