---
outline: deep
---

# FAQ de la Composition API

:::tip
Este FAQ supone una experiencia previa con Vue; en particular, experiencia con Vue 2 utilizando principalmente la Options API.
:::

## ¿Qué es la Composition API?

La Composition API es un conjunto de APIs que nos permiten crear componentes Vue utilizando funciones importadas en lugar de declarar opciones. Es un término genérico que cubre las siguientes APIs:

- [API de Reactividad](/api/reactivity-core.html), por ejemplo `ref()` y `reactive()`, que nos permiten crear directamente estado reactivo, estado computado y watchers.

- [Hooks del Ciclo de Vida](/api/composition-api-lifecycle.html), por ejemplo `onMounted()` y `onUnmounted()`, que nos permiten engancharnos programáticamente al ciclo de vida del componente.

- [Inyección de Dependencias](/api/composition-api-dependency-injection.html), es decir, `provide()` e `inject()`, que nos permiten aprovechar el sistema de inyección de dependencias de Vue mientras usamos las APIs de Reactividad.

La Composition API es una característica integrada en Vue 3 y [Vue 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html). Para las versiones anteriores de Vue 2, utiliza el plugin mantenido oficialmente [`@vue/composition-api`](https://github.com/vuejs/composition-api). En Vue 3, también se utiliza principalmente junto con la sintaxis [`<script setup>`](/api/sfc-script-setup.html) en los Componentes de un Solo Archivo. Este es un ejemplo básico de un componente que utiliza la Composition API:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// estado reactivo
const count = ref(0)

// funciones que mutan el estado y disparan actualizaciones
function increment() {
  count.value++
}

// hooks del ciclo de vida
onMounted(() => {
  console.log(`El conteo inicial es ${count.value}.`)
})
</script>

<template>
  <button @click="increment">El conteo está en: {{ count }}</button>
</template>
```

A pesar de un estilo de API basado en la composición de funciones, **la Composition API NO es programación funcional**. La Composition API se basa en el paradigma de reactividad mutable y de grano fino de Vue, mientras que la programación funcional hace hincapié en la inmutabilidad.

Si estás interesado en aprender a utilizar Vue con la Composition API, puedes establecer la preferencia de la API de todo el sitio a la Composition API utilizando el conmutador en la parte superior de la barra lateral izquierda, y luego ir a través de la guía desde el principio.

## ¿Por Qué la Composition API?

### Mejor Reutilización de la Lógica

La principal ventaja de la Composition API es que permite una reutilización limpia y eficiente de la lógica en forma de [funciones Composable](/guide/reusability/composables.html). Resuelve [todos los inconvenientes de los mixins](/guide/reusability/composables.html#vs-mixins), el principal mecanismo de reutilización lógica de la Options API.

La capacidad de reutilización lógica de la Composition API ha dado lugar a impresionantes proyectos de la comunidad, como [VueUse](https://vueuse.org/), una colección cada vez mayor de utilidades composables. También sirve como un mecanismo sencillo para integrar servicios o librerías con estado de terceros en el sistema de reactividad de Vue, por ejemplo los [datos inmutables](/guide/extras/reactivity-in-depth.html#datos-inmutables), las [máquinas de estado](/guide/extras/reactivity-in-depth.html#maquinas-de-estado), y [RxJS](https://vueuse.org/rxjs/readme.html#vueuse-rxjs).

### Organización Más Flexible del Código

A muchos usuarios les encanta que escribamos código organizado por defecto con la Options API: todo tiene su lugar en función de la opción a la que pertenece. Sin embargo, la Options API plantea serias limitaciones cuando la lógica de un componente crece más allá de un cierto umbral de complejidad. Esta limitación es particularmente prominente en los componentes que necesitan lidiar con múltiples **cuestiones lógicas**, lo que hemos presenciado de primera mano en muchas aplicaciones de Vue 2 en producción.

Tomemos como ejemplo el componente explorador de carpetas de la GUI de Vue CLI: este componente es responsable de las siguientes cuestiones lógicas:

- Rastrear el estado actual de la carpeta y mostrar su contenido
- Manejar la navegación de la carpeta (abrir, cerrar, refrescar...)
- Manejar la creación de nuevas carpetas
- Mostrar sólo las carpetas favoritas
- Mostrar las carpetas ocultas
- Manejo de los cambios en el directorio de trabajo actual

La [versión original](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404) del componente fue escrita en la Options API. Si damos a cada línea de código un color basado en la cuestión lógica que trata, esto es lo que parece:

<img alt="folder component before" src="./images/options-api.png" width="129" height="500" style="margin: 1.2em auto">

Observa cómo el código que se ocupa de la misma cuestión lógica se ve obligado a dividirse en diferentes opciones, situadas en diferentes partes del archivo. En un componente que tiene varios cientos de líneas, entender y navegar por una sola cuestión lógica requiere desplazarse constantemente hacia arriba y hacia abajo en el archivo, lo que hace que sea mucho más difícil de lo que debería ser. Además, si alguna vez tenemos la intención de extraer una cuestión lógica en una utilidad reutilizable, se necesita un poco de trabajo para encontrar y extraer las piezas de código correctas de las diferentes partes del archivo.

Aquí está el mismo componente, antes y después de la [refactorización en la Composition API](https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e):

![componente del archivo después de](./images/composition-api-after.png)

Observa cómo el código relacionado con la misma cuestión lógica puede ahora agruparse: ya no tenemos que saltar entre diferentes bloques de opciones mientras trabajamos en una cuestión lógica específica. Además, ahora podemos trasladar un grupo de código a un archivo externo con un esfuerzo mínimo, puesto que ya no tenemos que revolver el código para extraerlo. Esta reducción de la fricción para la refactorización es clave para la mantenibilidad a largo plazo en grandes bases de código.

### Mejor Inferencia de Tipos

En los últimos años, cada vez más desarrolladores de frontend están adoptando [TypeScript](https://www.typescriptlang.org/) ya que nos ayuda a escribir un código más robusto, a realizar cambios con más confianza y nos proporciona una gran experiencia de desarrollo con soporte IDE. Sin embargo, la Options API, concebida originalmente en 2013, se diseñó sin la inferencia de tipos en mente. Tuvimos que implementar algunas [gimnasias de tipo absurdamente complejas](https://github.com/vuejs/core/blob/44b95276f5c086e1d88fa3c686a5f39eb5bb7821/packages/runtime-core/src/componentPublicInstance.ts#L132-L165) para hacer que la inferencia de tipo funcionara con la Options API. Incluso con todo este esfuerzo, la inferencia de tipos para la Options API todavía puede fallar para los mixins y la inyección de dependencia.

Esto ha llevado a muchos desarrolladores que querían utilizar Vue con TS a inclinarse por la API de clases impulsada por `vue-class-component`. Sin embargo, una API basada en clases depende en gran medida de los decoradores de ES, una característica del lenguaje que solo era una propuesta de fase 2 cuando se estaba desarrollando Vue 3 en 2019. Nos pareció demasiado arriesgado basar una API oficial en una propuesta inestable. Desde entonces, la propuesta de los decoradores ha pasado por otra revisión completa, y finalmente llegó a la fase 3 en 2022. Además, la API basada en clases adolece de limitaciones de reutilización de la lógica y de organización similares a las de la Options API.

En comparación, la Composition API utiliza principalmente variables y funciones simples, que son naturalmente amigables con los tipos. El código escrito en la Composition API puede disfrutar de una inferencia de tipo completa con poca necesidad de sugerencias de tipo manuales. La mayor parte del tiempo, el código de la Composition API tendrá un aspecto prácticamente idéntico en TypeScript y en JavaScript plano. Esto también hace posible que los usuarios de JavaScript plano se beneficien de la inferencia de tipo parcial.

### Paquete de Producción más Pequeño y Menos Sobrecarga

El código escrito en la Composition API y en `<script setup>` también es más eficiente y fácil de minificar que el equivalente de la Options API. Esto se debe a que la plantilla en un componente `<script setup>` se compila como una función inline en el mismo ámbito del código `<script setup>`. A diferencia del acceso a las propiedades desde `this`, el código de la plantilla compilada puede acceder directamente a las variables declaradas dentro de `<script setup>`, sin un proxy de instancia de por medio. Esto también conduce a una mejor minificación porque todos los nombres de las variables pueden ser acortados de forma segura.

## Relación con la Options API

### Contrapartidas

Algunos usuarios que pasaron de la Options API encontraron su código de la Composition API menos organizado, y concluyeron que la Composition API es "peor" en términos de organización del código. Recomendamos a los usuarios con tales opiniones que miren ese problema desde una perspectiva diferente.

Es cierto que la Composition API ya no proporciona las "barandillas" que te guían para colocar tu código en los respectivos cubos. A cambio, puedes crear código de componentes como si escribieras un JavaScript normal. Esto significa que **puedes y debes aplicar las mejores prácticas de organización de código a tu código de la Composition API como lo harías al escribir JavaScript normal**. Si puedes escribir un JavaScript bien organizado, también deberías ser capaz de escribir un código de la Composition API bien organizado.

La Options API te permite "pensar menos" cuando escribes código de componentes, por lo que a muchos usuarios les encanta. Sin embargo, al reducir la sobrecarga mental, también te encierra en el patrón de organización de código prescrito, sin posibilidad de escape, lo que puede dificultar la refactorización o la mejora de la calidad del código en proyectos de gran escala. En este sentido, la Composition API proporciona una mejor escalabilidad a largo plazo.

### ¿La Composition API cubre todos los casos de uso?

Sí, en términos de lógica de estado. Cuando se utiliza la Composition API, sólo hay unas pocas opciones que pueden seguir siendo necesarias: `props`, `emits`, `name`, y `inheritAttrs`. Si se utiliza `<script setup>`, entonces `inheritAttrs` es normalmente la única opción que puede requerir un bloque normal separado `<script>`.

Si tienes la intención de utilizar exclusivamente la Composition API (junto con las opciones mencionadas anteriormente), puedes reducir algunos kbs de tu paquete de producción mediante una [bandera de compilación](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags) que elimina el código relacionado con la Options API de Vue. Ten en cuenta que esto también afecta a los componentes de Vue en tus dependencias.

### ¿Puedo utilizar ambas APIs juntas?

Sí, puedes utilizar la Composition API a través de la opción [`setup()`](/api/composition-api-setup.html) en un componente de la Options API.

Sin embargo, sólo recomendamos hacerlo si tienes una base de código de la Options API existente que necesita integrarse con nuevas características / librerías externas escritas con la Composition API.

### ¿Quedará obsoleta la Options API?

No, no tenemos ningún plan para hacerlo. La Options API es una parte integral de Vue y la razón por la que muchos desarrolladores lo aman. También somos conscientes de que muchas de las ventajas de la Composition API sólo se manifiestan en proyectos de mayor envergadura, y la Options API sigue siendo una opción sólida para muchos escenarios de complejidad baja a media.

## Relación con la API de Clases

Ya no recomendamos utilizar la API de Clases con Vue 3, dado que la Composition API proporciona una gran integración de TypeScript con beneficios adicionales de reutilización de la lógica y organización del código.

## Comparación con los Hooks de React

La Composition API proporciona el mismo nivel de capacidades de composición lógica que los Hooks de React, pero con algunas diferencias importantes.

Los Hooks de React se invocan repetidamente cada vez que se actualiza un componente. Esto crea una serie de advertencias que pueden confundir incluso a los desarrolladores experimentados de React. También conlleva problemas de optimización del rendimiento que pueden afectar gravemente a la experiencia de desarrollo. He aquí algunos ejemplos:

- Los hooks son sensibles al orden de llamada y no pueden ser condicionales.

- Las variables declaradas en un componente de React pueden ser capturadas por el cierre de un hook y convertirse en "obsoletas" si el desarrollador no pasa la matriz de dependencias correcta. Esto hace que los desarrolladores de React confíen en las reglas de ESLint para asegurarse de que se pasan las dependencias correctas. Sin embargo, la regla a menudo no es lo suficientemente inteligente y exagera la corrección, lo que lleva a una invalidación innecesaria y a dolores de cabeza cuando se encuentran casos límite.

- Los cálculos costosos requieren el uso de `useMemo`, que de nuevo requiere pasar manualmente el array de dependencias correcto.

- Los manejadores de eventos pasados a los componentes hijos causan actualizaciones innecesarias de los hijos por defecto, y requieren el uso explícito de `useCallback` como una optimización. Esto es casi siempre necesario, y de nuevo requiere un array de dependencias correcto. Descuidar esto lleva a un exceso de renderizado de las aplicaciones por defecto y puede causar problemas de rendimiento sin que lo notemos.

- El problema de los closure obsoletos, combinado con las características de Concurrent, hace difícil razonar sobre cuándo se ejecuta una pieza de código hooks, y hace que trabajar con estado mutable que debería persistir a través de renders (vía `useRef`) sea engorroso.

En comparación, la Composition API de Vue:

- Invoca el código `setup()` o `<script setup>` sólo una vez. Esto hace que el código se alinee mejor con las intuiciones del uso idiomático de JavaScript, ya que no hay closure obsoletos de los que preocuparse. Las llamadas a la Composition API tampoco son sensibles al orden de llamada y pueden ser condicionales.

- El sistema de reactividad en tiempo de ejecución de Vue recoge automáticamente las dependencias reactivas utilizadas en las propiedades computadas y los watchers, por lo que no es necesario declarar manualmente las dependencias.

- No es necesario almacenar en caché manualmente las funciones callback para evitar actualizaciones innecesarias de los hijos. En general, el sistema de reactividad de grano fino de Vue garantiza que los componentes hijos sólo se actualicen cuando lo necesiten. Las optimizaciones manuales de las actualizaciones de los hijos rara vez son una preocupación para los desarrolladores de Vue.

Agradecemos la creatividad de los hooks de React, y fueron una importante fuente de inspiración para la Composition API. Sin embargo, existen en su diseño los problemas mencionados anteriormente y nos dimos cuenta de que el modelo de reactividad de Vue proporciona una forma de evitarlos.
