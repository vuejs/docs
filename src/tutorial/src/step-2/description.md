# Renderizado Declarativo

<div class="sfc">

Lo que ves en el editor es un Componente de Archivo Único (SFC) de Vue. Un SFC es un bloque de código autocontenido y reutilizable que encapsula HTML, CSS y JavaScript que van juntos, escrito dentro de un archivo `.vue`.

</div>

La característica principal de Vue es el **renderizado declarativo**: utilizando una sintaxis de plantillas que extiende el HTML, podemos describir cómo debe ser el HTML basándonos en el estado de JavaScript. Cuando el estado cambia, el HTML se actualiza automáticamente.

<div class="composition-api">

El estado que puede desencadenar actualizaciones cuando se cambia se considera **reactivo**. Podemos declarar el estado reactivo utilizando la API `reactive()` de Vue. Los objetos creados a partir de `reactive()` son [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) de JavaScript que funcionan igual que los objetos normales:

```js
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```

La función `reactive()` sólo funciona con objetos (incluyendo arrays y tipos integrados como `Map` y `Set`). Por otro lado, `ref()` puede tomar cualquier tipo de valor y crear un objeto que exponga el valor interno bajo una propiedad `.value`:

```js
import { ref } from 'vue'

const message = ref('¡Hola Mundo!')

console.log(message.value) // "¡Hola Mundo!"
message.value = 'Changed'
```

Los detalles sobre `reactive()` y `ref()` se tratan en la <a target="_blank" href="/guide/essentials/reactivity-fundamentals.html">Guía - Fundamentos de Reactividad</a>.

<div class="sfc">

El estado reactivo declarado en el bloque `<script setup>` del componente puede ser utilizado directamente en la plantilla. Así es como podemos renderizar un texto dinámico basado en el valor del objeto `counter` y la ref `message`, utilizando la sintaxis de los mostachos:

</div>

<div class="html">

El objeto que se pasa a `createApp()` es un componente Vue. El estado de un componente debe ser declarado dentro de su función `setup()`, y retornado usando un objeto:

```js{2,5}
setup() {
  const counter = reactive({ count: 0 })
  const message = ref('¡Hola Mundo!')
  return {
    counter,
    message
  }
}
```

Las propiedades del objeto retornado estarán disponibles en la plantilla. Así es como podemos renderizar un texto dinámico basado en el valor de `message`, utilizando la sintaxis de los mostachos:

</div>

```vue-html
<h1>{{ message }}</h1>
<p>El contador está en: {{ counter.count }}</p>
```

Fíjate en que no necesitamos usar `.value` cuando accedemos a la ref `message` en las plantillas: se despliega automáticamente para un uso más sucinto.

</div>

<div class="options-api">

El estado que puede desencadenar actualizaciones cuando se cambia se considera **reactivo**. En Vue, el estado reactivo se mantiene en los componentes. <span class="html">En el código de ejemplo, el objeto que se pasa a `createApp()` es un componente.</span>

Se puede declarar el estado reactivo utilizando la opción de componente `data`, que debe ser una función que retorne un objeto:

<div class="sfc">

```js{3-5}
export default {
  data() {
    return {
      message: '¡Hola Mundo!'
    }
  }
}
```

</div>
<div class="html">

```js{3-5}
createApp({
  data() {
    return {
      message: '¡Hola Mundo!'
    }
  }
})
```

</div>

La propiedad `message` estará disponible en la plantilla. Así es como podemos renderizar un texto dinámico basado en el valor de `message`, utilizando la sintaxis de los mostachos:

```vue-html
<h1>{{ message }}</h1>
```

</div>

El contenido dentro de los mostachos no está limitado solo a identificadores o rutas; podemos usar cualquier expresión válida de JavaScript:

```vue-html
<h1>{{ message.split('').reverse().join('') }}</h1>
```

<div class="composition-api">

Ahora, trata de crear algún estado reactivo por ti mismo, y úsalo para renderizar contenido de texto dinámico para el `<h1>` en la plantilla.

</div>

<div class="options-api">

Ahora, prueba a crear una propiedad de datos tú mismo, y utilízala como contenido de texto para el `<h1>` en la plantilla.

</div>
