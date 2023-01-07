# Hooks del Ciclo de Vida

Cada instancia de un componente de Vue pasa por una serie de pasos de inicialización cuando se crea; por ejemplo, debe configurar la observación de datos, compilar la plantilla, montar la instancia en el DOM y actualizar el DOM cuando cambien los datos. En el camino, también ejecuta funciones llamadas hooks del ciclo de vida, dando a los usuarios la oportunidad de añadir su propio código en etapas específicas.

## Registrando los Hooks del Ciclo de Vida

Por ejemplo, el hook <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> se puede usar para ejecutar código después que el componente haya terminado el renderizado inicial y creado los nodos del DOM:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`El componente está montado ahora.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`El componente está montado ahora.`)
  }
}
```

</div>

También hay otros hooks que serán llamados en diferentes etapas del ciclo de vida de la instancia, siendo el más utilizado <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle.html#onmounted), [`onUpdated`](/api/composition-api-lifecycle.html#onupdated) y [`onUnmounted`](/api/composition-api-lifecycle.html#onunmounted).</span><span class="options-api">[`mounted`](/api/options-lifecycle.html#mounted), [`updated`](/api/options-lifecycle.html#updated) y [`unmounted`](/api/options-lifecycle.html#unmounted).</span>

<div class="options-api">

Todos los hooks del ciclo de vida se llaman con su contexto `this` que apunta a la instancia activa actual que lo invoca. Ten en cuenta que esto significa que debes evitar el uso de funciones de flecha cuando declares hooks del ciclo de vida, ya que no serás capaz de acceder a la instancia del componente a través del `this` si lo haces.

</div>

<div class="composition-api">

Cuando llamas a `onMounted`, Vue automáticamente asocia la función callback registrada a la instancia del componente activo actual. Esto requiere que estos hooks sean registrados **sincrónicamente** durante la configuración del componente. Por ejemplo, no hagas esto:

```js
setTimeout(() => {
  onMounted(() => {
    // esto no funcionará.
  })
}, 100)
```

Ten en cuenta que esto no significa que la llamada deba colocarse léxicamente dentro de `setup()` o del `<script setup>`. Se puede llamar a `onMounted()` desde una función externa siempre que la pila de llamadas sea síncrona y se origine desde dentro de `setup()`.

</div>

## Diagrama del Ciclo de Vida

A continuación se muestra un diagrama del ciclo de vida de la instancia. En este momento no es necesario que entiendas completamente todo lo que sucede, pero a medida que aprendas y construyas más, será una referencia útil.

![Diagrama del ciclo de vida del componente](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

Consulta la <span class="composition-api">[Referencia de la API de los Hooks del Ciclo de Vida](/api/composition-api-lifecycle.html)</span><span class="options-api">[Referencia de la API de los Hooks del Ciclo de Vida](/api/options-lifecycle.html)</span> para obtener detalles sobre todos los hooks del ciclo de vida y sus respectivos casos de uso.
