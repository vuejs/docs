# Ciclo di vita e Template Refs {#lifecycle-and-template-refs}

Fino a questo momento, Vue ha gestito autonomamente tutti gli aggiornamenti del DOM per noi, sfruttando la reattività e il rendering dichiarativo. Tuttavia, è inevitabile che si verifichino situazioni in cui sarà necessario intervenire manualmente sul DOM.

Possiamo richiedere un **template ref**, cioè un riferimento a un elemento nel template utilizzando l'<a target="_blank" href="/api/built-in-special-attributes.html#ref">attributo speciale `ref`</a>:

```vue-html
<p ref="pElementRef">hello</p>
```

<div class="composition-api">

Per accedere al ref, è necessario dichiarare <span class="html"> ed esporre</span> un ref con il nome corrispondente:

<div class="sfc">

```js
const pElementRef = ref(null)
```

</div>
<div class="html">

```js
setup() {
  const pElementRef = ref(null)

  return {
    pElementRef
  }
}
```

</div>

Da notare che il ref è inizializzato con il valore `null`. Questo avviene perché l'elemento non esiste ancora durante l'esecuzione di <span class="sfc">`<script setup>`</span><span class="html">`setup()`</span>. Il template ref diventa accessibile solo dopo che il componente è stato `montato`.

Per seguire del codice dopo il mount, è possibile utilizzare la funzione `onMounted()`:

<div class="sfc">

```js
import { onMounted } from 'vue'

onMounted(() => {
  // il componente ora è montato.
})
```

</div>
<div class="html">

```js
import { onMounted } from 'vue'

createApp({
  setup() {
    onMounted(() => {
      // il componente ora è montato.
    })
  }
})
```

</div>
</div>

<div class="options-api">

L'elemento verrà esposto su `this.$refs` come `this.$refs.pElementRef`. Tuttavia, sarà possibile accedervi soltanto dopo che il componente sarà stato **montato**.

Per eseguire del codice dopo il mount, è possibile utilizzare l'opzione `mounted`:

<div class="sfc">

```js
export default {
  mounted() {
    // il componente ora è montato.
  }
}
```

</div>
<div class="html">

```js
createApp({
  mounted() {
    // il componente ora è montato.
  }
})
```

</div>
</div>

Questo è chiamato **hook del ciclo di vita**, che ci permetti di registrare una callback da eseguire in determinati momenti del ciclo di vita del componente. Ci sono altri hook come <span class="options-api">`created` e `updated`</span><span class="composition-api">`onUpdated` e `onUnmount`</span>. Per ulteriori dettagli, si può fare riferimento al <a target="_blank" href="/guide/essentials/lifecycle.html#lifecycle-diagram">diagramma del ciclo di vita</a>.

Ora, prova ad aggiungere <span class="options-api">un hook `mounted`</span><span class="composition-api">un hook `onMounted`</span>, ad accedere all'elemento `<p>` tramite <span class="options-api">`this.$refs.pElementRef`</span><span class="composition-api">`pElementRef.value`</span> e a eseguire un'operazione diretta su di esso, come ad esempio la modifica del suo `textContent`.
