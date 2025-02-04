# SFC CSS Features {#sfc-css-features}

## Scoped CSS {#scoped-css}

Gdy znacznik `<style>` ma atrybut `scoped`, jego CSS będzie miał zastosowanie tylko do elementów bieżącego komponentu. Jest to podobne do enkapsulacji stylu w Shadow DOM. Wiąże się to z pewnymi zastrzeżeniami, ale nie wymaga żadnych polyfillów. Osiąga się to poprzez użycie PostCSS do przekształcenia następujących elementów:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

W następujący sposób:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### Elementy podrzędne komponentu głównego {#child-component-root-elements}

Z `scoped`, style komponentu nadrzędnego nie wyciekną do komponentów podrzędnych. Jednakże, główny węzeł komponentu podrzędnego będzie pod wpływem zarówno CSS rodzica, jak i CSS dziecka. Jest to zaprojektowane tak, aby rodzic mógł stylizować element główny dziecka dla celów układu.

### Deep Selectors {#deep-selectors}

Jeśli chcesz, aby selektor w stylach `scoped` był „głęboki”, tj. wpływający na komponenty potomne, możesz użyć pseudoklasy `:deep()`:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

Powyższe zostanie skompilowane w:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
Zawartość DOM utworzona za pomocą `v-html` nie jest objęta zakresem stylów, ale nadal można ją stylizować za pomocą głębokich selektorów.
:::

### Slotted Selectors {#slotted-selectors}

Domyślnie, style scoped nie wpływają na zawartość renderowaną przez `<slot/>`, ponieważ są one uważane za własność komponentu nadrzędnego, który je przekazuje. Aby jawnie targetować zawartość slotu, należy użyć pseudoklasy `:slotted`:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### Selektory globalne {#global-selectors}

Jeśli chcesz, aby tylko jedna reguła była stosowana globalnie, możesz użyć pseudoklasy `:global` zamiast tworzyć kolejny `<style>` (patrz poniżej):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### Mieszanie stylów lokalnych i globalnych {#mixing-local-and-global-styles}

W tym samym komponencie można również umieścić zarówno style z zakresem, jak i bez zakresu:

```vue
<style>
/* style globalne */
</style>

<style scoped>
/* style lokalne */
</style>
```

### Wskazówki dotyczące stylu Scoped {#scoped-style-tips}

- **Style scoped nie eliminują potrzeby stosowania klas**. Ze względu na sposób, w jaki przeglądarki renderują różne selektory CSS, `p { color: red }` będzie wielokrotnie wolniejsze, gdy jest scoped (tj. w połączeniu z selektorem atrybutu). Jeśli zamiast tego użyjesz klas lub identyfikatorów, takich jak `.example { color: red }`, to praktycznie wyeliminujesz ten hit wydajnościowy.

- **Bądź ostrożny z selektorami potomków w rekurencyjnych komponentach!** Dla reguły CSS z selektorem `.a .b`, jeśli element pasujący do `.a` zawiera rekurencyjny element potomny, to wszystkie `.b` w tym elemencie potomnym zostaną dopasowane przez regułę.

## CSS Modules {#css-modules}

Znacznik `<style module>` jest kompilowany jako [CSS Modules](https://github.com/css-modules/css-modules) i udostępnia wynikowe klasy CSS komponentowi jako obiekt pod kluczem `$style`:

```vue
<template>
  <p :class="$style.red">To powinno być czerwone</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

Wynikowe klasy są hashowane w celu uniknięcia kolizji, osiągając ten sam efekt określania zakresu CSS tylko do bieżącego komponentu.

Więcej szczegółów, takich jak [globalne wyjątki](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#exceptions) i [kompozycja](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#composition) można znaleźć w [CSS Modules spec](https://github.com/css-modules/css-modules).

### Niestandardowa nazwa iniekcji {#custom-inject-name}

Można dostosować klucz właściwości obiektu wstrzykiwanych klas poprzez nadanie wartości atrybutowi `module`:

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### Użycie z Composition API {#usage-with-composition-api}

Wstrzyknięte klasy mogą być dostępne w `setup()` i `<script setup>` poprzez API `useCssModule`. Dla bloków `<style module>` z niestandardowymi nazwami wstrzykiwania, `useCssModule` akceptuje pasującą wartość atrybutu `module` jako pierwszy argument:

```js
import { useCssModule } from 'vue'

// wewnątrz zakresu setup()...
// domyślnie, zwraca klasy dla <modułu stylu>
useCssModule()

// nazwany, zwraca klasy dla <style module=„classes”>
useCssModule('classes')
```

## `v-bind()` in CSS {#v-bind-in-css}

Znaczniki SFC `<style>` wspierają łączenie wartości CSS z dynamicznym stanem komponentu za pomocą funkcji CSS `v-bind`:

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

Składnia działa z [`<script setup>`](./sfc-script-setup) i obsługuje wyrażenia JavaScript (muszą być ujęte w cudzysłowy):

```vue
<script setup>
import { ref } from 'vue'
const theme = ref({
    color: 'red',
})
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

Rzeczywista wartość zostanie skompilowana do niestandardowej właściwości CSS, więc CSS jest nadal statyczny. Właściwość niestandardowa zostanie zastosowana do elementu głównego komponentu za pośrednictwem stylów wbudowanych i będzie aktualizowana reaktywnie, jeśli wartość źródłowa ulegnie zmianie.