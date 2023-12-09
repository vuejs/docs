# Template Refs {#template-refs}

Während das deklarative Rendering-Modell von Vue die meisten direkten DOM-Operationen für Sie abstrahiert, kann es immer noch Fälle geben, in denen wir direkten Zugriff auf die zugrunde liegenden DOM-Elemente benötigen. Um dies zu erreichen, können wir das spezielle `ref`-Attribut verwenden:

```vue-html
<input ref="input">
```

`ref` ist ein spezielles Attribut, ähnlich dem `key`-Attribut, das im Kapitel `v-for` besprochen wurde. Es erlaubt uns, einen direkten Verweis auf ein bestimmtes DOM-Element oder eine untergeordnete Komponenteninstanz zu erhalten, nachdem es eingebunden wurde. Dies kann nützlich sein, wenn man z.B. eine Eingabe beim Einbinden einer Komponente programmatisch fokussieren oder eine Bibliothek eines Drittanbieters für ein Element initialisieren möchte.

## Zugriff auf die Refs {#accessing-the-refs}

<div class="composition-api">

Um die Referenz mit der Composition API zu erhalten, müssen wir eine Referenz mit demselben Namen deklarieren:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

Wenn Sie nicht `<script setup>` verwenden, stellen Sie sicher, dass Sie auch die Referenz von `setup()` zurückgeben:

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</div>
<div class="options-api">

Die resultierende Referenz wird auf `this.$refs` ausgesetzt:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

Beachten Sie, dass Sie nur auf die Referenz zugreifen können, **nachdem die Komponente montiert ist.** Wenn Sie versuchen, auf <span class="options-api">`$refs.input`</span><span class="composition-api">`input`</span> in einem Template-Ausdruck zuzugreifen, wird es beim ersten Rendering `null` sein. Das liegt daran, dass das Element erst nach dem ersten Rendering existiert!

<div class="composition-api">

Wenn Sie versuchen, die Änderungen einer Vorlagenreferenz zu überwachen, müssen Sie den Fall berücksichtigen, dass die Referenz den Wert `null` hat:

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
})
```

Siehe auch: [Typing Template Refs](/guide/typescript/composition-api.html#typing-template-refs) <sup class="vt-badge ts" />

</div>

## Refs innerhalb `v-for` {#refs-inside-v-for}

> Requires v3.2.25 or above

<div class="composition-api">

Wenn `ref` innerhalb von `v-for` verwendet wird, sollte das entsprechende ref einen Array-Wert enthalten, der nach dem Einhängen mit den Elementen gefüllt wird:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

[Versuchen Sie es auf dem Spielplatz](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ID0gcmVmKFsxLCAyLCAzXSlcblxuY29uc3QgaXRlbVJlZnMgPSByZWYoW10pXG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIGFsZXJ0KGl0ZW1SZWZzLnZhbHVlLm1hcChpID0+IGkudGV4dENvbnRlbnQpKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtUmVmc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

Wenn `ref` innerhalb von `v-for` verwendet wird, ist der resultierende ref-Wert ein Array, das die entsprechenden Elemente enthält:

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Versuchen Sie es auf dem Spielplatz](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdDogWzEsIDIsIDNdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuJHJlZnMuaXRlbXMpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

Es ist zu beachten, dass das Ref-Array **nicht** die gleiche Reihenfolge wie das Quell-Array garantiert.

## Function Refs {#function-refs}

Anstelle eines String-Schlüssels kann das Attribut `ref` auch an eine Funktion gebunden werden, die bei jeder Komponentenaktualisierung aufgerufen wird und Ihnen volle Flexibilität bei der Wahl des Speicherorts für die Elementreferenz bietet. Die Funktion erhält die Elementreferenz als erstes Argument:

```vue-html
<input :ref="(el) => { /* assign el to a property or ref */ }">
```

Beachten Sie, dass wir eine dynamische `:ref`-Bindung verwenden, so dass wir eine Funktion anstelle einer Zeichenkette mit dem Namen ref übergeben können. Wenn das Element abgehängt wird, wird das Argument `null` sein. Sie können natürlich auch eine Methode anstelle einer Inline-Funktion verwenden.

## Ref zu Komponente {#ref-on-component}

> Dieser Abschnitt setzt Kenntnisse über [Komponenten](/guide/essentials/component-basics) voraus. Sie können es auch überspringen und später wiederkommen.

`ref` kann auch für eine untergeordnete Komponente verwendet werden. In diesem Fall wird die Referenz die einer Komponenteninstanz sein:

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value will hold an instance of <Child />
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child will hold an instance of <Child />
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">Wenn die untergeordnete Komponente die Options-API verwendet oder kein `<Skript-Setup>` verwendet, wird die</span><span class="options-api">The</span> referenzierte Instanz identisch mit der `this` der Kindkomponente sein wird, was bedeutet, dass die Elternkomponente vollen Zugriff auf jede Eigenschaft und Methode der Kindkomponente hat. Dies macht es einfach, eng gekoppelte Implementierungsdetails zwischen der Eltern- und der Kindkomponente zu erstellen. Daher sollten Komponentenreferenzen nur verwendet werden, wenn es unbedingt notwendig ist - in den meisten Fällen sollten Sie versuchen, Eltern-/Kind-Interaktionen zuerst mit den Standardschnittstellen props und emit zu implementieren.

<div class="composition-api">

Eine Ausnahme hiervon ist, dass Komponenten, die `<script setup>` verwenden, **standardmäßig privat** sind: eine Elternkomponente, die eine Kindkomponente referenziert, die `<script setup>` verwendet, wird auf nichts zugreifen können, es sei denn, die Kindkomponente entscheidet sich, eine öffentliche Schnittstelle mit dem Makro `defineExpose` freizugeben:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

Wenn ein Elternteil eine Instanz dieser Komponente über Template-Refs abruft, hat die abgerufene Instanz die Form `{ a: Zahl, b: Zahl }` (Refs werden automatisch wie bei normalen Instanzen entpackt).

Siehe auch: [Typing Component Template Refs](/guide/typescript/composition-api.html#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Die Option `expose` kann verwendet werden, um den Zugriff auf eine Child-Instanz einzuschränken:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

Im obigen Beispiel kann ein Elternteil, der diese Komponente über eine Vorlage referenziert, nur auf `publicData` und `publicMethod` zugreifen.

</div>
