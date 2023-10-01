# Funzionalità CSS dei SFC {#sfc-css-features}

## CSS Scoped {#scoped-css}

Quando un tag `<style>` ha l'attributo `scoped`, il suo CSS verrà applicato solo agli elementi del componente corrente. Questo è simile all'incapsulamento dello stile presente in Shadow DOM. Ha alcune limitazioni, ma non richiede alcun polyfill. Ciò è ottenuto utilizzando PostCSS per trasformare quanto segue:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">ciao</div>
</template>
```

In questo:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>ciao</div>
</template>
```

### Elementi Root dei componenti figli {#child-component-root-elements}

Con l'attributo  `scoped`, gli stili del componente genitore non si propagheranno nei componenti figlio. Tuttavia, il nodo radice di un componente figlio sarà influenzato sia dagli stili scoped del genitore che da quelli del figlio. Questo è progettato in modo che il genitore possa stilizzare l'elemento radice del figlio per scopi di layout.

### Selettori in profondità {#deep-selectors}

Se desideri che un selettore negli stili `scoped` abbia effetto anche sui componenti figlio, puoi utilizzare la pseudo-classe `:deep()`:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

Il codice sopra verrà compilato in:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
Il contenuto DOM creato con `v-html` non è influenzato dagli stili scoped, ma puoi comunque stilizzarlo utilizzando i selettori deep.
:::

### Selettori degli slot {#slotted-selectors}

Per impostazione predefinita, gli stili scoped non influenzano il contenuto renderizzato da `<slot/>`, poiché sono considerati di proprietà del componente genitore che li passa. Per puntare in modo esplicito al contenuto dello slot, utilizza la pseudo-classe `:slotted`:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### Selettori globali {#global-selectors}

Se vuoi applicare una regola globalmente, puoi utilizzare la pseudo-classe `:global` anziché creare un altro blocco `<style>` (vedi sotto):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### Mixare stili locali e globali {#mixing-local-and-global-styles}

Puoi anche includere stili sia scoped che non scoped nello stesso componente:

```vue
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>
```

### Tips per lo style scoped {#scoped-style-tips}

- **Gli stili scoped non eliminano la necessità delle classi.**. A causa del modo in cui i browser interpretano i diversi selettori CSS, `p { color: red }` sarà molto più lento quando è scoped (ossia quando è combinato con un selettore di attributo). Se invece usi classi o id, come ad esempio  `.example { color: red }`, eliminerai praticamente questo impatto sulle prestazioni.

- **Fai attenzione ai selettori discendenti nei componenti ricorsivi!** Per una regola CSS con il selettore `.a .b`, se l'elemento che corrisponde a `.a` contiene un componente figlio ricorsivo, allora a tutti i `.b` in quel componente figlio verrà applicata quella regola.

## Moduli CSS {#css-modules}

Un tag `<style module>` viene compilato come [moduli CSS](https://github.com/css-modules/css-modules) ed espone le classi CSS risultanti al componente come un oggetto con chiave `$style`:

```vue
<template>
  <p :class="$style.red">Questo dovrebbe essere rosso</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

Le classi risultanti sono hashate per evitare collisioni, ottenendo lo stesso effetto di delimitazione degli stili CSS per il solo componente corrente.

Fai riferimento alle [spec dei moduli CSS](https://github.com/css-modules/css-modules) per ulteriori dettagli come le [eccezioni globali](https://github.com/css-modules/css-modules#exceptions) e [composition](https://github.com/css-modules/css-modules#composition).

### Nome Personalizzato per Inject {#custom-inject-name}

Puoi personalizzare la chiave di proprietà dell'oggetto delle classi iniettate assegnando un valore all'attributo `module`:

```vue
<template>
  <p :class="classes.red">rosso</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### Utilizzo con Composition API {#usage-with-composition-api}

Puoi avere accesso alle classi iniettate in `setup()` e `<script setup>` via l'API `useCssModule`. Per i blocchi `<style module>` con nomi di iniezione custom, `useCssModule` accetta il valore corrispondente dell'attributo `module` come primo argomento:

```js
import { useCssModule } from 'vue'

// dentro lo scope setup()...
// default, ritorna classi per <style module>
useCssModule()

// nominate, ritorna classi per <style module="classes">
useCssModule('classes')
```

## `v-bind()` in CSS {#v-bind-in-css}

Le etichette `<style>` dei SFC supportano il collegamento dei valori CSS allo stato dinamico del componente utilizzando la funzione CSS `v-bind`:

```vue
<template>
  <div class="text">ciao</div>
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

La sintassi funziona con [`<script setup>`](./sfc-script-setup), e supporta espressioni JavaScript (deve essere racchiuso tra virgolette):

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>ciao</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

Il valore effettivo verrà compilato in una variabile CSS personalizzata hashata, quindi il CSS è comunque statico. La variabile personalizzata verrà applicata all'elemento radice del componente tramite stili inline e verrà aggiornata in modo reattivo se il valore di origine cambia.
