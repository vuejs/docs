# Ciclo de Vida y Refs de la Plantilla

Hasta ahora, Vue ha manejado todas las actualizaciones del DOM por nosotros, gracias a la reactividad y al renderizado declarativo. Pero, inevitablemente, habrá casos en los que necesitemos trabajar manualmente con el DOM.

Para ello podemos solicitar una **template ref**; es decir, una referencia a un elemento de la plantilla, utilizando el <a target="_blank" href="/api/built-in-special-attributes.html#ref">atributo especial `ref`</a>:

```vue-html
<p ref="p">hola</p>
```

<div class="composition-api">

Para acceder a la ref, necesitamos declarar<span class="html"> y exponer</span> una ref con un nombre equivalente:

<div class="sfc">

```js
const p = ref(null)
```

</div>
<div class="html">

```js
setup() {
  const p = ref(null)

  return {
    p
  }
}
```

</div>

Observa que la ref es inicializada con valor `null`. Esto es así porque el elemento no existe todavía cuando se ejecuta <span class="sfc">`<script setup>`</span><span class="html">`setup()`</span>. La ref de la plantilla sólo es accesible después de que el componente esté **montado**.

Para ejecutar el código después del montaje, podemos utilizar la función `onMounted()`:

<div class="sfc">

```js
import { onMounted } from 'vue'

onMounted(() => {
  // el componente está montado.
})
```

</div>
<div class="html">

```js
import { onMounted } from 'vue'

createApp({
  setup() {
    onMounted(() => {
      // el componente está montado.
    })
  }
})
```

</div>
</div>

<div class="options-api">

El elemento será expuesto en `this.$refs` como `this.$refs.p`. Sin embargo, sólo se puede acceder a él después de que el componente esté **montado**.

Para ejecutar el código después del montaje, podemos utilizar la opción `mounted`:

<div class="sfc">

```js
export default {
  mounted() {
    // el componente está montado.
  }
}
```

</div>
<div class="html">

```js
createApp({
  mounted() {
    // el componente está montado.
  }
})
```

</div>
</div>

Esto se denomina "**hook del ciclo de vida**"; este nos permite registrar un callback para ser llamado en ciertos momentos del ciclo de vida del componente. Hay otros hooks como <span class="options-api">`created` y `updated`</span><span class="composition-api">`onUpdated` y `onUnmounted`</span>. Consulta el <a target="_blank" href="/guide/essentials/lifecycle.html#diagrama-del-ciclo-de-vida">Diagrama del Ciclo de Vida</a> para obtener más detalles.

A continuación, intenta añadir un hook <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span>, accede a `<p>` a través de <span class="options-api">`this.$refs.p`</span><span class="composition-api">`p.value`</span>, y realiza algunas operaciones directas en el DOM (por ejemplo, cambiar su `textContent`).
