# Renderowanie warunkowe (Conditional Rendering)

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/conditional-rendering-in-vue-3" title="Darmowa lekcja renderowania warunkowego Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue" title="Darmowa lekcja renderowania warunkowego Vue.js"/>
</div>

<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

## `v-if`

Dyrektywa `v-if` jest używana do warunkowego renderowania bloku. Blok zostanie wyrenderowany tylko wtedy, gdy wyrażenie dyrektywy zwróci wartość true.

```vue-html
<h1 v-if="awesome">Vue jest wspaniałe!</h1>
```

## `v-else`

Dyrektywy `v-else` można użyć do wskazania "bloku else" dla `v-if`:

```vue-html
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue jest wspaniałe!</h1>
<h1 v-else>O nie 😢</h1>
```

<div class="demo">
  <button @click="awesome = !awesome">Toggle</button>
  <h1 v-if="awesome">Vue jest wspaniłe!</h1>
  <h1 v-else>O nie 😢</h1>
</div>

<div class="composition-api">

[Spróbuj zabawy w piaskownicy](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXdlc29tZSA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Spróbuj w piaskownicy](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgYXdlc29tZTogdHJ1ZVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Element `v-else` musi występować bezpośrednio po elemencie `v-if` lub `v-else-if` - w przeciwnym razie nie zostanie rozpoznany.

## `v-else-if`

`v-else-if`, jak sama nazwa wskazuje, służy jako "blok else if " dla `v-if`. Można go również łączyć łańcuchowo wiele razy:

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

Podobnie do `v-else`, element `v-else-if` musi następować bezpośrednio po elemencie `v-if` lub `v-else-if`.

## `v-if` w `<template>`

Ponieważ `v-if` jest dyrektywą, musi być dołączona do pojedynczego elementu. Ale co zrobić, jeśli chcemy przełączać więcej niż jeden element? W takim przypadku możemy użyć `v-if` na elemencie `<template>`, który służy jako niewidzialna osłona. Końcowy wynik renderowania nie będzie zawierał elementu `<template>`.

```vue-html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

`v-else` i `v-else-if` mogą być także użyte na `<template>`.

## `v-show`

Inną możliwością warunkowego wyświetlenia elementu jest dyrektywa `v-show`. Sposób użycia jest w dużej mierze taki sam:

```vue-html
<h1 v-show="ok">Hello!</h1>
```

Różnica polega na tym, że element z `v-show` zawsze będzie renderowany i pozostanie w DOM; `v-show` tylko przełącza właściwość CSS `display` elementu.

`v-show` nie obsługuje elementu `<template>`, ani nie współpracuje z `v-else`.

## `v-if` vs `v-show`

`v-if` jest "prawdziwym" renderowaniem warunkowym, ponieważ gwarantuje, że event listeners i komponenty potomne wewnątrz bloku warunkowego są poprawnie usuwane i ponownie tworzone podczas przełączania.

`v-if` jest również **lazy**: jeśli warunek jest fałszywy przy pierwszym renderowaniu, to nie zrobi nic - blok warunkowy nie zostanie wyrenderowany, dopóki warunek nie stanie się prawdziwy po raz pierwszy.

Dla porównania, `v-show` jest znacznie prostsze - element jest zawsze renderowany niezależnie od stanu początkowego, z przełączaniem opartym na CSS.

Ogólnie rzecz biorąc, `v-if` ma wyższe nakłady podczas przełączeń, podczas gdy `v-show` ma wyższe początkowe nakłady renderowania. Tak więc wybierz `v-show` jeśli musisz przełączać coś bardzo często, natomiast wybierz `v-if` jeśli stan rzadko się zmienia w czasie działania.

## `v-if` z `v-for`

::: warning Note
**Nie jest** zalecane używanie `v-if` i `v-for` na tym samym elemencie z powodu ukrytego priorytetu. Zobacz [Przewodnik -style](/style-guide/rules-essential.html#avoid-v-if-with-v-for) by dowiedzić się szczegółów.
:::

Gdy `v-if` i `v-for` są użyte na tym samym elemencie, `v-if` zostanie obliczone jako pierwsze. Zobacz. [przewodnik - renderowanie list](list#v-for-with-v-if) by dowiedzić się szczegółów.
