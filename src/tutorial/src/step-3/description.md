# Vinculación de Atributos

En Vue, los mostachos se utilizan únicamente para la interpolación de texto. Para vincular un atributo a un valor dinámico, utilizamos la directiva `v-bind`:

```vue-html
<div v-bind:id="dynamicId"></div>
```

Una **directiva** es un atributo especial que comienza con el prefijo `v-`. Son parte de la sintaxis de la plantilla de Vue. De manera similar a las interpolaciones de texto, los valores de las directivas son expresiones de JavaScript que tienen acceso al estado del componente. Los detalles completos de `v-bind` y la sintaxis de las directivas se tratan en <a target="_blank" href="/guide/essentials/template-syntax.html">Guía - Sintaxis de la Plantilla</a>.

La parte después de los dos puntos (`:id`) es el "argumento" de la directiva. En este caso, el atributo `id` del elemento se sincronizará con la propiedad `dynamicId` del estado del componente.

Puesto que `v-bind` se utiliza con tanta frecuencia, tiene una sintaxis abreviada específica:

```vue-html
<div :id="dynamicId"></div>
```

Prueba ahora a añadir un enlace dinámico `class` al `<h1>`, utilizando la <span class="composition-api">ref</span><span class="options-api">propiedad data</span> `titleClass` como valor. Si está vinculado correctamente, el texto debería cambiar a rojo.
