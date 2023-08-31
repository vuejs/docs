# Bedingtes Rendering {#conditional-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/conditional-rendering-in-vue-3" title="Gratis Vue.js Bedingtes Rendering Lerneinheit"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue" title="Gratis Vue.js Bedingtes Rendering Lerneinheit"/>
</div>

<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

## `v-if` {#v-if}

Die `v-if`-Direktive wird für das bedingte Rendering eines Blocks genutzt. Der Block wird nur ausgegeben, wenn der in der Direktive angegebene Ausruck `true` zurückgibt.

```vue-html
<h1 v-if="awesome">Vue is awesome!</h1>
```

## `v-else` {#v-else}

Die `v-else`-Direktive wird genutzt, um einen "else Block" für `v-if` anzugeben:

```vue-html
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

<div class="demo">
  <button @click="awesome = !awesome">Toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</div>

<div class="composition-api">

[Probiere es im Playground aus](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXdlc29tZSA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Probiere es im Playground aus](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgYXdlc29tZTogdHJ1ZVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Ein `v-else`-Element muss direkt hinter einem `v-if`- oder `v-else-if`-Element folgen - sonst wird es nicht erkannt und interpretiert.

## `v-else-if` {#v-else-if}

Das `v-else-if` dient - wie der Name bereits vermuten lässt - als "else if Block" für ein `v-if`-Element. Es kann auch mehrfach genutzt werden:

```vue-html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

Genauso wie bei `v-else`, muss ein `v-else-if`-Element direkt auf ein `v-if`- oder `v-else-if`-Element folgen.

## `v-if` on `<template>` {#v-if-on-template}

Weil `v-if` eine Direktive ist, muss es auf ein einzelnes Element angewendet werden. Wenn mehrere Elemente betroffen sind, kann `v-if` auf ein `<template>`-Element angewendet werden, welches dann als unsichtbarer Container fungiert. Im Ergebnis des endgültigen Renderings ist das `<template>`-Element nicht enthalten.

```vue-html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

`v-else` und `v-else-if` können ebenfalls auf ein `<template>` angewendet werden.

## `v-show` {#v-show}

Eine weitere Möglichkeit, Elemente nur beim Eintreteten einer definierten Bedingung anzuzeigen, ist die `v-show`-Direktive. Die Nutzung ist größtenteils identisch mit der Nutzung von `v-if`:

```vue-html
<h1 v-show="ok">Hello!</h1>
```

Der Unterschied besteht darin, dass ein Element, auf das die `v-show`-Direktive angewendet wird, immer gerendert wird und Teil des DOM ist. `v-show` steuert die Sichtbarkeit über das Setzen des CSS-Attributs `display`.

`v-show` bietet keine Unterstützung für die Nutzung mit einem `<template>`-Element und funktioniert auch nicht mit `v-else`.

## `v-if` vs. `v-show` {#v-if-vs-v-show}

`v-if` setzt "echtes" bedingtes Rendering um. Es stellt sicher, dass Listener und Unterkomponenten innerhalb des bedingten Blockes korrekt zerstört bzw. neu angelegt werden, wenn sich das Ergebnis des Bedingungsausdruckes ändert.

`v-if` ist **lazy**: Falls die Bedingung beim initialen Rendern `false` ist, passiert zunächst gar nichts - der betroffene Block wird solange nicht gerendert, bis die Bedingung das erste mal zu `true` evaluiert wird.

`v-show` ist im Vergleich deutlich einfacher gestaltet - das betroffene Element wird unabhängig vom initialen Evaluierungsergebnis der Bedingung immer in das DOM gerendert. Die Sichtbarkeit wird mit CSS-Mitteln gesteuert.

Generell sind im Vergleich die Kosten für die Zustandsänderung bei `v-if` höher, während die Kosten für das initiale Rendern von `v-show` höher sind. `v-show`  sollte bevorzugt werden, wenn die Sichtbarkeit eines Elements oft geändert wird. `v-if` sollte eingesetzt werden, wenn es eher unwahrscheinlich ist, dass die Bedingung sich zur Laufzeit ändert.

## `v-if` in Kombination mit `v-for` {#v-if-with-v-for}

::: warning Hinweis
Wegen der impliziten Prioritätsregeln wird es **nicht** empfohlen, `v-if` und `v-for` auf demselben Element zu nutzen. Details dazu sind im [Style-Guide](/style-guide/rules-essential.html#avoid-v-if-with-v-for) beschrieben.
:::

Wenn `v-if` und `v-for` beide auf demselben Element verwendet werden, wird `v-if` zuerst evaluiert. Der [List Rendering Guide](list#v-for-with-v-if) gibt hierzu tiefergehende Informationen.
