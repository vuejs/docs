# Composition API: setup()

:::info Nota
Esta página documenta el uso de la opción `setup` del componente. Si está utilizando Composition API (la API de Composición) con Componentes de un Solo Archivo (SFC), se recomienda usar [`<script setup>`](/api/sfc-script-setup.html) para una sintaxis más sucinta y ergonómica.
:::

El hook `setup()` sirve como el punto de entrada para el uso de Composition API, en los componentes en los siguientes casos:

1. Uso de Composition API sin un paso de compilación;
2. Cuando se integra código basado en Composition API en un componente que usa Options API.

## Uso básico

Podemos declarar el estado reactivo usando [Reactivity APIs](./reactivity-core.html) y exponerlos a la plantilla devolviendo un objeto desde `setup()`. Las propiedades del objeto devuelto también estarán disponibles en la instancia del componente (si otras opciones son usadas):

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // expone a la plantilla y otros hooks de las opciones de la API
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

Ten en cuenta que las [referencias (refs)](/api/reactivity-core.html#ref) devueltas por `setup` son [automáticamente shallow unwrapped](/guide/essentials/reactivity-fundamentals.html#deep-reactivity) cuando son accedidas en la plantilla, por lo que no necesitas utilizar `.value` cuando se acceden a ellas. También se desenvuelven de la misma manera cuando se accede a `this`.

:::consejo
El propio `setup()` no tiene acceso a la instancia del componente - `this` tendrá un valor de `undefined` dentro de `setup()`. Puedes acceder a los valores expuestos por la Composition-API desde la Options API, pero no al revés.
:::

## Accediendo a las propiedades (props)

El primer argumento de la función `setup` es el argumento `props`. Tal y como se espera en un componente estándar, las `props` dentro de una función `setup` son reactivas y se actualizarán cuando se pasen nuevas propiedades.

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

Tenga en cuenta que si desestructura el objeto `props`, las variables desestructuradas perderán reactividad. Por lo tanto, se recomienda acceder siempre a a los props en forma de `props.xxx`.

Si realmente necesita desestructurar los props, o necesita pasar una propiedad a una función externa mientras conserva la reactividad, puede hacerlo con las APIs de utilidad [toRefs()](./reactivity-utilities.html#torefs) y [toRef()](/api/reactivity-utilities.html#toref):


```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // convierte `props` en un objeto de refs, luego desestructura
    const { title } = toRefs(props)
    // `title` es una referencia que vigila a `props.title`
    console.log(title.value)

    // O bien, convertir una sola propiedad de `props` en una ref
    const title = toRef(props, 'title')
  }
}
```

## El Contexto en Setup

El segundo argumento que se pasa a la función `setup` es un objeto **Contexto de configuración**. El objeto contexto expone otros valores que pueden ser útiles dentro de `setup`:

```js
export default {
  setup(props, context) {
    // Atributos (objeto no reactivo, equivalente a $attrs)
    console.log(context.attrs)

    // Slots (objeto no reactivo, equivalente a $slots)
    console.log(context.slots)

    // Emitir eventos (Función, equivalente a $emit)
    console.log(context.emit)

    // Exponer propiedades públicas (Función)
    console.log(context.expose)
  }
}
```

El objeto de contexto no es reactivo y puede ser desestructurado con seguridad:

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```
Las propiedades `attrs` y `slots` son objetos con estado que siempre son actualizados cuando el mismo componente es actualizado. Esto significa que debes evitar desestructurarlos y siempre referenciar las propiedades como `attrs.x` o `slots.x`. Ten en cuenta también que, a diferencia de `props`, las propiedades de `attrs` y `slots` **no** son reactivas. Si pretendes aplicar efectos secundarios basados en los cambios de `attrs` o `slots`, debes hacerlo dentro de un hook del ciclo de vida `onBeforeUpdate`.

### Exponiendo Propiedades Públicas

`expose` es una función que puede utilizarse para limitar explícitamente las propiedades expuestas cuando la instancia del componente es accedida por un componente padre a través de [refs de la Plantilla ](/guide/essentials/template-refs.html#ref-on-component):

```js{5,10}
export default {
  setup(props, { expose }) {
    // hacer la instancia "cerrada" -
    // ej. no exponer nada al padre
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // exponer de forma selectiva el estado local
    expose({ count: publicCount })
  }
}
```

## Uso con Funciones de Renderizado 

`setup` también puede devolver una [función de renderizado](/guide/extras/render-function.html) que puede hacer uso directamente del estado reactivo declarado en el mismo ámbito:

```js{6}
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

Devolver una función de renderizado nos previene devolver cualquier otra cosa. Internamente esto no debería ser un problema, pero puede ser problemático si queremos exponer métodos de este componente al componente padre a través de las refs. de la plantilla.

Podemos resolver este problema llamando a [`expose()`](#exposing-public-properties):

```js{8-10}
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

El método `incremento` estaría entonces disponible en el componente padre a través de una plantilla de referencia.
