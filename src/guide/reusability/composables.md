# Composables

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip
Esta sección supone un conocimiento básico de la Composition API. Si has estado aprendiendo Vue sólo con la Options API, puedes establecer la Preferencia de la API en la Composition API (utilizando el conmutador en la parte superior de la barra lateral izquierda) y volver a leer los capítulos [Fundamentos de Reactividad](/guide/essentials/reactivity-fundamentals.html) y [Hooks del Ciclo de Vida](/guide/essentials/lifecycle.html).
:::

## ¿Qué es un "Composable"?

En el contexto de las aplicaciones Vue, un " composable " es una función que aprovecha la Composition API de Vue para encapsular y reutilizar la **lógica de estado**.

Al construir aplicaciones de frontend, a menudo necesitamos reutilizar la lógica para tareas comunes. Por ejemplo, podemos necesitar formatear fechas en muchos lugares, así que extraemos una función reutilizable para ello. Esta función de formato encapsula **lógica sin estado**: toma una entrada y devuelve inmediatamente la salida esperada. Existen muchas librerías para reutilizar la lógica sin estado; por ejemplo [lodash](https://lodash.com/) y [date-fns](https://date-fns.org/), de las que quizás hayas oído hablar.

Por el contrario, la lógica con estado implica la gestión del estado que cambia con el tiempo. Un ejemplo sencillo sería el seguimiento de la posición actual del ratón en una página. En escenarios del mundo real, también podría ser una lógica más compleja, como los gestos táctiles o el estado de conexión a una base de datos.

## Ejemplo de Rastreador de Ratón

Si tuviéramos que implementar la funcionalidad de seguimiento del ratón utilizando la Composition API directamente dentro de un componente, se vería así:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>El ratón se encuentra en la posición: {{ x }}, {{ y }}</template>
```

¿Pero qué pasa si queremos reutilizar la misma lógica en varios componentes? Podemos extraer la lógica en un archivo externo, como una función composable:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// por convención, los nombres de las funciones composables comienzan con "use"
export function useMouse() {
  // estado encapsulado y gestionado por el composable
  const x = ref(0)
  const y = ref(0)

  // un composable puede actualizar su estado gestionado a lo largo del tiempo.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // un composable también puede engancharse al ciclo de vida de su componente
  // propietario para configurar y deshacer los efectos secundarios.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // exponer el estado gestionado como valor de retorno
  return { x, y }
}
```

Y así es como se puede utilizar en los componentes:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>El ratón se encuentra en la posición: {{ x }}, {{ y }}</template>
```

<div class="demo">
  El ratón se encuentra en la posición: {{ x }}, {{ y }}
</div>

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZU1vdXNlIH0gZnJvbSAnLi9tb3VzZS5qcydcblxuY29uc3QgeyB4LCB5IH0gPSB1c2VNb3VzZSgpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICBNb3VzZSBwb3NpdGlvbiBpcyBhdDoge3sgeCB9fSwge3sgeSB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwibW91c2UuanMiOiJpbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VNb3VzZSgpIHtcbiAgY29uc3QgeCA9IHJlZigwKVxuICBjb25zdCB5ID0gcmVmKDApXG5cbiAgZnVuY3Rpb24gdXBkYXRlKGV2ZW50KSB7XG4gICAgeC52YWx1ZSA9IGV2ZW50LnBhZ2VYXG4gICAgeS52YWx1ZSA9IGV2ZW50LnBhZ2VZXG4gIH1cblxuICBvbk1vdW50ZWQoKCkgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZSkpXG4gIG9uVW5tb3VudGVkKCgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGUpKVxuXG4gIHJldHVybiB7IHgsIHkgfVxufSJ9)

Como podemos ver, el núcleo de la lógica sigue siendo el mismo; todo lo que teníamos que hacer era trasladarlo a una función externa y devolver el estado que debe ser expuesto. Al igual que dentro de un componente, se puede utilizar toda la gama de funciones de la [Composition API](/api/#composition-api) en los composables. La misma funcionalidad `useMouse()` se puede utilizar ahora en cualquier componente.

Lo mejor de los composables es que también se pueden anidar: una función composable puede llamar a otra u otras funciones composables. Esto nos permite componer una lógica compleja utilizando unidades pequeñas y aisladas, de forma similar a como componemos una aplicación completa utilizando componentes. De hecho, esta es la razón por la que hemos decidido llamar Composition API al conjunto de APIs que hacen posible este patrón.

Por ejemplo, podemos extraer la lógica de añadir y eliminar un escuchador de eventos del DOM en su propio composable:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // si lo deseas, también puedes hacer que este
  // soporte selectores string como objetivo
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

Y ahora nuestro composable `useMouse()` puede ser simplificado a:

```js{3,9-12}
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip
Cada instancia del componente que llame a `useMouse()` creará sus propias copias del estado `x` e `y` para que no interfieran entre sí. Si quieres gestionar el estado compartido entre componentes, lee el capítulo [Manejo del Estado](/guide/scaling-up/state-management.html).
:::

## Ejemplo de Estado Asíncrono

El composable `useMouse()` no toma ningún argumento, así que veamos otro ejemplo que hace uso de uno. Cuando se hace una recuperación de datos asíncrona, a menudo necesitamos manejar diferentes estados: carga, éxito y error:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">¡Oops! Error encontrado: {{ error.message }}</div>
  <div v-else-if="data">
    Datos cargados:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Cargando...</div>
</template>
```

Sería tedioso tener que repetir este patrón en cada componente que necesite obtener datos. Vamos a extraerlos en un composable:

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

Ahora en nuestro componente podemos simplemente hacer:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

`useFetch()` toma una cadena de URL estática como entrada, por lo que realiza la búsqueda sólo una vez y termina. ¿Qué pasa si queremos que se recupere cada vez que la URL cambie? Podemos conseguirlo aceptando también refs como argumento:

```js
// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // restablecer el estado antes de la recuperación..
    data.value = null
    error.value = null
    // unref() desenvuelve las refs potenciales
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // configurar la recuperación reactiva si la URL de entrada es una ref
    watchEffect(doFetch)
  } else {
    // de lo contrario, sólo se obtiene una vez
    // y se evita la sobrecarga de un watcher
    doFetch()
  }

  return { data, error }
}
```

Esta versión de `useFetch()` acepta ahora tanto cadenas de URL estáticas como refs de cadenas de URL. Cuando detecta que la URL es una referencia dinámica utilizando [`isRef()`](/api/reactivity-utilities.html#isref), establece un efecto reactivo utilizando [`watchEffect()`](/api/reactivity-core.html#watcheffect). El efecto se ejecutará inmediatamente y también hará un seguimiento de la referencia de la URL como una dependencia. Cada vez que la referencia de la URL cambie, se restablecerán los datos y se obtendrán de nuevo.

Aquí está [la versión actualizada de `useFetch()`](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VGZXRjaCB9IGZyb20gJy4vdXNlRmV0Y2guanMnXG5cbmNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLydcbmNvbnN0IGlkID0gcmVmKCcxJylcbmNvbnN0IHVybCA9IGNvbXB1dGVkKCgpID0+IGJhc2VVcmwgKyBpZC52YWx1ZSlcblxuY29uc3QgeyBkYXRhLCBlcnJvciwgcmV0cnkgfSA9IHVzZUZldGNoKHVybClcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIExvYWQgcG9zdCBpZDpcbiAgPGJ1dHRvbiB2LWZvcj1cImkgaW4gNVwiIEBjbGljaz1cImlkID0gaVwiPnt7IGkgfX08L2J1dHRvbj5cblxuXHQ8ZGl2IHYtaWY9XCJlcnJvclwiPlxuICAgIDxwPk9vcHMhIEVycm9yIGVuY291bnRlcmVkOiB7eyBlcnJvci5tZXNzYWdlIH19PC9wPlxuICAgIDxidXR0b24gQGNsaWNrPVwicmV0cnlcIj5SZXRyeTwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiB2LWVsc2UtaWY9XCJkYXRhXCI+RGF0YSBsb2FkZWQ6IDxwcmU+e3sgZGF0YSB9fTwvcHJlPjwvZGl2PlxuICA8ZGl2IHYtZWxzZT5Mb2FkaW5nLi4uPC9kaXY+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJ1c2VGZXRjaC5qcyI6ImltcG9ydCB7IHJlZiwgaXNSZWYsIHVucmVmLCB3YXRjaEVmZmVjdCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZldGNoKHVybCkge1xuICBjb25zdCBkYXRhID0gcmVmKG51bGwpXG4gIGNvbnN0IGVycm9yID0gcmVmKG51bGwpXG5cbiAgYXN5bmMgZnVuY3Rpb24gZG9GZXRjaCgpIHtcbiAgICAvLyByZXNldCBzdGF0ZSBiZWZvcmUgZmV0Y2hpbmcuLlxuICAgIGRhdGEudmFsdWUgPSBudWxsXG4gICAgZXJyb3IudmFsdWUgPSBudWxsXG4gICAgXG4gICAgLy8gcmVzb2x2ZSB0aGUgdXJsIHZhbHVlIHN5bmNocm9ub3VzbHkgc28gaXQncyB0cmFja2VkIGFzIGFcbiAgICAvLyBkZXBlbmRlbmN5IGJ5IHdhdGNoRWZmZWN0KClcbiAgICBjb25zdCB1cmxWYWx1ZSA9IHVucmVmKHVybClcbiAgICBcbiAgICB0cnkge1xuICAgICAgLy8gYXJ0aWZpY2lhbCBkZWxheSAvIHJhbmRvbSBlcnJvclxuICBcdCAgYXdhaXQgdGltZW91dCgpXG4gIFx0ICAvLyB1bnJlZigpIHdpbGwgcmV0dXJuIHRoZSByZWYgdmFsdWUgaWYgaXQncyBhIHJlZlxuXHQgICAgLy8gb3RoZXJ3aXNlIHRoZSB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIGFzLWlzXG4gICAgXHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmxWYWx1ZSlcblx0ICAgIGRhdGEudmFsdWUgPSBhd2FpdCByZXMuanNvbigpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyb3IudmFsdWUgPSBlXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzUmVmKHVybCkpIHtcbiAgICAvLyBzZXR1cCByZWFjdGl2ZSByZS1mZXRjaCBpZiBpbnB1dCBVUkwgaXMgYSByZWZcbiAgICB3YXRjaEVmZmVjdChkb0ZldGNoKVxuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSwganVzdCBmZXRjaCBvbmNlXG4gICAgZG9GZXRjaCgpXG4gIH1cblxuICByZXR1cm4geyBkYXRhLCBlcnJvciwgcmV0cnk6IGRvRmV0Y2ggfVxufVxuXG4vLyBhcnRpZmljaWFsIGRlbGF5XG5mdW5jdGlvbiB0aW1lb3V0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjMpIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdSYW5kb20gRXJyb3InKSlcbiAgICAgIH1cbiAgICB9LCAzMDApXG4gIH0pXG59In0=), con un retardo artificial y un error aleatorio para fines de demostración.

## Convenciones y Mejores Prácticas

### Nomenclatura

Es una convención nombrar las funciones composables con nombres camelCase que comienzan con "use".

### Argumentos de Entrada

Un composable puede aceptar argumentos de referencia incluso si no depende de ellos para la reactividad. Si estás escribiendo un composable que puede ser utilizado por otros desarrolladores, es una buena idea manejar el caso de que los argumentos de entrada sean refs en lugar de valores crudos. La función de ayuda [`unref()`](/api/reactivity-utilities.html#unref) será muy útil para este propósito:

```js
import { unref } from 'vue'

function useFeature(maybeRef) {
  // si maybeRef es efectivamente una ref, se devolverá su .value
  // en caso contrario, maybeRef se devuelve tal cual
  const value = unref(maybeRef)
}
```

Si tu composable crea efectos reactivos cuando la entrada es una ref, asegúrate de vigilar explícitamente la ref con `watch()`, o llama a `unref()` dentro de un `watchEffect()` para que sea rastreado correctamente.

### Valores de Retorno

Probablemente has notado que hemos estado usando exclusivamente `ref()` en lugar de `reactive()` en los composables. La convención recomendada es que los composables devuelvan siempre un objeto simple, no reactivo, que contenga múltiples refs. Esto permite que se desestructure en los componentes mientras se mantiene la reactividad:

```js
// x e y son refs
const { x, y } = useMouse()
```

Devolver un objeto reactivo desde un composable hará que dichas desestructuras pierdan la conexión de reactividad con el estado dentro del composable, mientras que las refs mantendrán esa conexión.

Si prefieres utilizar el estado devuelto de los composables como propiedades de los objetos, puedes encerrar el objeto devuelto en `reactive()` para que las refs se desplieguen. Por ejemplo:

```js
const mouse = reactive(useMouse())
// mouse.x está vinculado a la ref original
console.log(mouse.x)
```

```vue-html
El ratón se encuentra en la posición: {{ mouse.x }}, {{ mouse.y }}
```

### Efectos Secundarios

Está bien utilizar efectos secundarios (por ejemplo, añadir escuchadores de eventos del DOM o buscar datos) en composables, pero presta atención a las siguientes reglas:

- Si estás trabajando en una aplicación que utiliza [Renderizado del Lado del Servidor](/guide/scaling-up/ssr.html) (SSR), asegúrate de ejecutar los efectos secundarios específicos del DOM en los hooks del ciclo de vida posterior al montaje, por ejemplo `onMounted()`. Estos hooks sólo se llaman en el navegador, por lo que puedes estar seguro de que el código dentro de ellos tiene acceso al DOM.

- Recuerda limpiar los efectos secundarios en `onUnmounted()`. Por ejemplo, si un composable establece un escuchador de eventos del DOM, deberías eliminar ese escuchador en `onUnmounted()` como hemos visto en el ejemplo de `useMouse()`. Puede ser una buena idea utilizar un composable que haga esto automáticamente por ti, como el ejemplo de `useEventListener()`.

### Restricciones de Uso

Los composables sólo deben ser llamados **sincrónicamente** en `<script setup>` o en el hook `setup()`. En algunos casos, también puedes llamarlos en hooks del ciclo de vida como `onMounted()`.

Estos son los contextos en los que Vue es capaz de determinar la instancia actual del componente activo. El acceso a una instancia de componente activo es necesario para que:

1. Los hooks del ciclo de vida puedan ser registrados en ella.

2. Las propiedades computadas y los watchers puedan ser vinculados a ella, de manera que puedan ser eliminados cuando la instancia sea desmontada para evitar pérdidas de memoria.

:::tip
`<script setup>` es el único lugar donde puedes llamar a composables **después** de usar `await`. El compilador restaura automáticamente el contexto de la instancia activa por ti después de la operación asíncrona.
:::

## Extracción de Composables para la Organización del Código

Los composables pueden ser extraídos no sólo para su reutilización, sino también para la organización del código. A medida que la complejidad de sus componentes crece, puede terminar con componentes que son demasiado grandes para navegar y razonar. La Composition API te da toda la flexibilidad para organizar el código de tus componentes en funciones más pequeñas basadas en aspectos lógicos:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

Hasta cierto punto, se puede pensar en estos composables extraídos como servicios con alcance de componente que pueden hablar entre sí.

## Uso de los Composables en la Options API

Si estás usando la Options API, los composables deben ser llamados dentro de `setup()`, y los bindings retornados deben ser devueltos desde `setup()` para que sean expuestos a `this` y a la plantilla:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // Las propiedades exhibidas por setup() pueden ser accedidas por `this`.
    console.log(this.x)
  }
  // ...otras opciones
}
```

## Comparación con Otras Técnicas

### vs. Mixins

Los usuarios que vienen de Vue 2 pueden estar familiarizados con la opción [mixins](/api/options-composition.html#mixins), que también nos permite extraer la lógica del componente en unidades reutilizables. Los mixins tienen tres inconvenientes principales:

1. **Origen de las propiedades poco claro**: cuando se utilizan muchos mixins, no queda claro qué propiedad de instancia es inyectada por cada mixin, lo que dificulta el seguimiento de la implementación y la comprensión del comportamiento del componente. Esta es también la razón por la que recomendamos utilizar el patrón refs + desestructuración para los composables: hace que la fuente de la propiedad sea clara en los componentes consumidores.

2. **Colisiones de nombre de espacio**: múltiples mixins de diferentes autores pueden potencialmente registrar las mismas keys de propiedades, causando colisiones de nombre de espacio. Con los composables, puedes renombrar las variables desestructuradas si hay keys conflictivas de diferentes composables.

3. **Comunicación implícita entre mixins**: varios mixins que necesitan interactuar entre sí tienen que depender de keys de propiedades compartidas, haciéndolos implícitamente acoplados. Con los composables, los valores devueltos por un composable pueden ser pasados a otro como argumentos, al igual que las funciones normales.

Por las razones anteriores, ya no recomendamos el uso de mixins en Vue 3. La función se mantiene sólo por razones de migración y familiaridad.

### vs. Componentes sin Renderizado

En el capítulo sobre slots de los componentes, discutimos el patrón [Componentes sin Renderizado](/guide/components/slots.html#componentes-sin-renderizado) basado en slots de ámbito. Incluso implementamos la misma demostración de seguimiento del ratón utilizando componentes sin renderizado.

La principal ventaja de los composables sobre los componentes sin renderizado es que los composables no implican la sobrecarga adicional de las instancias de los componentes. Cuando se utilizan en toda una aplicación, la cantidad de instancias de componentes adicionales creadas por el patrón de componentes sin renderizado puede convertirse en una sobrecarga notable para el rendimiento.

La recomendación es utilizar composables cuando se reutiliza la lógica pura, y utilizar componentes cuando se reutiliza tanto la lógica como el diseño visual.

### vs. Hooks de React

Si tienes experiencia con React, puedes notar que esto se parece mucho a los hooks personalizados de React. La Composition API se inspiró en parte en los hooks de React, y los composables de Vue son de hecho similares a los hooks de React en cuanto a las capacidades de composición de la lógica. Sin embargo, los composables de Vue se basan en el sistema de reactividad de precisión de Vue, que es fundamentalmente diferente del modelo de ejecución de los hooks de React. Esto se discute con más detalle en las [FAQ de la Composition API](/guide/extras/composition-api-faq#comparacion-con-los-hooks-de-react).

## Lecturas Adicionales

- [Reactividad en profundidad](/guide/extras/reactivity-in-depth.html): para una comprensión de bajo nivel de cómo funciona el sistema de reactividad de Vue.
- [Manejo del Estado](/guide/scaling-up/state-management.html): para conocer los patrones de gestión del estado compartido por varios componentes.
- [Pruebas de Composables](/guide/scaling-up/testing.html#pruebas-de-composables): tips para realizar pruebas unitarias en composables.
- [VueUse](https://vueuse.org/): una colección cada vez mayor de composables de Vue. El código fuente es también un gran recurso de aprendizaje.
