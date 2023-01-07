---
outline: deep
---

# Guía de Optimización del Rendimiento

## Generalidades

Vue está diseñado para funcionar en los casos de uso más comunes sin necesidad de optimizaciones manuales. Sin embargo, siempre hay escenarios desafiantes en los que se necesita un ajuste más fino. En esta sección, analizaremos a qué debe prestar atención en lo que respecta al rendimiento en una aplicación de Vue.

Primero, analicemos los dos aspectos principales del rendimiento web:

- **Rendimiento de carga de la página**: la rapidez con la que la aplicación muestra el contenido y se vuelve interactiva en la visita inicial. Esto generalmente se mide utilizando métricas importantes para la web, como [Despliegue del contenido más extenso (LCP)](https://web.dev/lcp/) y [Demora de la primera entrada (FID)](https://web.dev/fid/).

- **Rendimiento de actualización**: la rapidez con la que la aplicación se actualiza en respuesta a la entrada del usuario. Por ejemplo, qué tan rápido se actualiza una lista cuando el usuario escribe en un cuadro de búsqueda o qué tan rápido cambia la página cuando el usuario hace clic en un enlace de navegación en una aplicación de una sola página (SPA).

Aunque lo ideal sería maximizar ambas cosas, las diferentes arquitecturas de frontend tienden a afectar la facilidad con la que se logra el rendimiento deseado en estos aspectos. Además, el tipo de aplicación que estás creando influye en gran medida en lo que debes priorizar en términos de rendimiento. Por lo tanto, el primer paso para garantizar un rendimiento óptimo es elegir la arquitectura adecuada para el tipo de aplicación que estás creando:

- Consulta [Formas de usar Vue](/guide/extras/ways-of-using-vue.html) para ver cómo puedes aprovechar Vue de diferentes maneras.

- Jason Miller analiza los tipos de aplicaciones web y su respectiva implementación/entrega en [Application Holotypes](https://jasonformat.com/application-holotypes/).

## Opciones de Configuración de Perfiles

Para mejorar el rendimiento, primero debemos saber cómo medirlo. Hay una serie de excelentes herramientas que pueden ayudar en este sentido:

Para perfilar el rendimiento de la carga de los despliegues de producción:

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

Para perfilar el rendimiento durante el desarrollo local:

- [Panel de rendimiento de Chrome DevTools](https://developer.chrome.com/docs/devtools/evaluate-performance/)
  - [`app.config.performance`](/api/application.html#app-config-performance) habilita indicadores de rendimiento específicos de Vue en la línea de tiempo de rendimiento de Chrome DevTools.
- [Extension Vue DevTools](/guide/scaling-up/tooling.html#devtools-del-navegador) también proporciona características de perfilado del rendimiento.

## Optimizaciones para la Carga de Página

Hay muchos aspectos agnósticos del framework para optimizar el rendimiento de carga de la página: consulta esta [guía web.dev](https://web.dev/fast/) para obtener un resumen completo. Aquí, nos centraremos principalmente en las técnicas que son específicas de Vue.

### Elegir la Arquitectura Adecuada

Si tu caso de uso es sensible al rendimiento de la carga de la página, evita enviarlo como un SPA puro del lado del cliente. Necesitas que tu servidor envíe directamente el HTML que contiene el contenido que los usuarios quieren ver. El renderizado puro del lado del cliente sufre de lentitud al mostrar el contenido. Esto se puede mitigar con la [Renderización del lado del servidor (SSR)](/guide/extras/ways-of-using-vue.html#fullstack-ssr) o la [Generación de sitios estáticos (SSG)](/guide/extras/ways-of-using-vue.html#jamstack-ssg). Consulta la [Guía de SSR](/guide/scaling-up/ssr.html) para obtener información sobre cómo realizar SSR con Vue. Si tu aplicación no tiene requisitos de interactividad enriquecidos, también puedes usar un servidor de backend tradicional para renderizar el HTML y mejorarlo con Vue en el cliente.

Si tu aplicación principal tiene que ser una SPA, pero tiene páginas de marketing (aterrizaje, información, blog), ¡envíalas por separado! Tus páginas de marketing deberían implementarse idealmente como HTML estático con un mínimo de JS, utilizando SSG.

### Tamaño del Paquete y Sacudida del Árbol

Una de las formas más efectivas de mejorar el rendimiento de carga de la página es enviar paquetes de JavaScript más pequeños. Aquí hay algunas formas de reducir el tamaño del paquete al usar Vue:

- Usa un paso de compilación si es posible.

  - Muchas de las API de Vue son ["sacudibles de árbol"](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) si se agrupan a través de una herramienta de compilación moderna. Por ejemplo, si no usas el componente incorporado `<Transition>`, no se incluirá en el paquete de producción final. La sacudida del árbol también puede eliminar otros módulos no utilizados en su código fuente.

  - Cuando se utiliza un paso de compilación, las plantillas se compilan previamente, por lo que no es necesario enviar el compilador de Vue al navegador. Esto ahorra **14kb** min + JavaScript comprimido y evita el costo de compilación en tiempo de ejecución.

- ¡Ten cuidado con el tamaño al introducir nuevas dependencias! En las aplicaciones del mundo real, los paquetes sobrecargados suelen ser el resultado de la introducción de dependencias pesadas sin darse cuenta.

  - Si usas un paso de compilación, opta por dependencias que ofrezcan formatos de módulos ES y que sean compatibles con la sacudida de árboles. Por ejemplo, opta por `lodash-es` sobre `lodash`.

  - Verifica el tamaño de una dependencia y evalúa si vale la pena la funcionalidad que proporciona. Ten en cuenta que si la dependencia es compatible con la sacudida de árboles, el aumento de tamaño real dependerá de las API que realmente importe desde ella. Se pueden usar herramientas como [bundlejs.com](https://bundlejs.com/) para realizar comprobaciones rápidas, pero la medición con la configuración de compilación real siempre será la más precisa.

- Si estás utilizando Vue principalmente para la mejora progresiva y prefieres evitar un paso de compilación, considera usar [petite-vue](https://github.com/vuejs/petite-vue) (solo **6kb**) en su lugar.

### División del Código

La división de código es donde una herramienta de compilación divide el paquete de la aplicación en varios fragmentos más pequeños, que luego se pueden cargar bajo pedido o en paralelo. Con la división de código adecuada, las características requeridas en la carga de la página pueden ser descargadas inmediatamente, y los fragmentos adicionales se cargan de forma diferida solo cuando es necesario, lo que mejora el rendimiento.

Los paquetes como Rollup (en el que se basa Vite) o webpack pueden crear automáticamente fragmentos divididos al detectar la sintaxis de importación dinámica de ESM:

```js
// lazy.js y sus dependencias se dividirán en un fragmento separado
// y sólo se cargarán cuando se llame a `loadLazy()`.
function loadLazy() {
  return import('./lazy.js')
}
```

La carga diferida se usa mejor en características que no se necesitan inmediatamente después de la carga inicial de la página. En las aplicaciones de Vue, esto se puede usar en combinación con [Componentes Asíncronos](/guide/components/async.html) de Vue para crear fragmentos divididos para árboles de componentes:

```js
import { defineAsyncComponent } from 'vue'

// se crea un fragmento separado para Foo.vue y sus dependencias.
// sólo se obtiene bajo demanda cuando el componente asíncrono
// se renderiza en la página.
const Foo = defineAsyncComponent(() => import('./Foo.vue'))
```

Para las aplicaciones que utilizan Vue Router, se recomienda encarecidamente utilizar la carga diferida para los componentes de ruta. Vue Router tiene soporte explícito para la carga diferida, aparte de `defineAsyncComponent`. Consulta [Rutas de carga diferida](https://router.vuejs.org/guide/advanced/lazy-loading.html) para obtener más detalles.

## Optimizaciones para Actualizar

### Estabilidad de las Props

En Vue, un componente hijo solo se actualiza cuando al menos uno de sus props recibidos ha cambiado. Considere el siguiente ejemplo:

```vue-html
<ListItem
  v-for="item in list"
  :id="item.id"
  :active-id="activeId" />
```

Dentro del componente `<ListItem>`, utiliza sus props `id` y `activeId` para determinar si es el elemento activo actualmente. Si bien esto funciona, el problema es que cada vez que cambia `activeId`, ¡**cada** `<ListItem>` de la lista tiene que actualizarse!

Idealmente, solo deberían actualizarse los elementos cuyo estado activo ha cambiado. Podemos lograrlo moviendo el cálculo del estado activo al padre y haciendo que `<ListItem>` acepte directamente una prop `active` en su lugar:

```vue-html
<ListItem
  v-for="item in list"
  :id="item.id"
  :active="item.id === activeId" />
```

Ahora, para la mayoría de los componentes, la prop `active` seguirá siendo la misma cuando cambie `activeId`, por lo que ya no necesitan actualizarse. En general, la idea es mantener los props pasados a los componentes hijos tan estables como sea posible.

### `v-once`

`v-once` es una directiva integrada que se puede usar para renderizar contenido que depende de datos en tiempo de ejecución pero que nunca necesita actualizarse. Todo el subárbol en el que se usa se omitirá para todas las actualizaciones futuras. Consulte la [referencia de su API](/api/built-in-directives.html#v-once) para más detalles.

### `v-memo`

`v-memo` es una directiva integrada que se puede usar para omitir condicionalmente la actualización de grandes subárboles o listas `v-for`. Consulte la [referencia de su API](/api/built-in-directives.html#v-memo) para más detalles.

## Optimizaciones Generales

> Los siguientes consejos afectan tanto a la carga de la página como al rendimiento de las actualizaciones.

### Virtualizar Grandes Listas

Uno de los problemas de rendimiento más comunes en todas las aplicaciones frontend es la renderización de listas grandes. Independientemente del rendimiento de un framework, la renderización de una lista con miles de elementos **será** lenta debido a la gran cantidad de nodos del DOM que el navegador debe manejar.

Sin embargo, no necesariamente tenemos que renderizar todos estos nodos por adelantado. En la mayoría de los casos, el tamaño de la pantalla del usuario sólo puede mostrar un pequeño subconjunto de nuestra gran lista. Podemos mejorar en gran medida el rendimiento con la **virtualización de listas**, la técnica de renderizar solo los elementos que están actualmente en el viewport, o cerca de él, de una lista grande.

Implementar la virtualización de listas no es fácil, por suerte existen librerías de la comunidad que puedes utilizar directamente:

- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [vue-virtual-scroll-grid](https://github.com/rocwang/vue-virtual-scroll-grid)

### Reducción de la Sobrecarga de Reactividad en Estructuras Inmutables de Gran Tamaño

El sistema de reactividad de Vue es profundo por defecto. Si bien esto hace que la administración del estado sea intuitiva, crea un cierto nivel de sobrecarga cuando el tamaño de los datos es grande, porque cada acceso a las propiedades desencadena trampas de proxy que realizan el seguimiento de las dependencias. Esto suele notarse cuando se trata de grandes arrays de objetos profundamente anidados, donde un solo renderizado necesita acceder a más de 100.000 propiedades, por lo que solo debería afectar a casos de uso muy específicos.

Vue proporciona una vía de escape para optar por la reactividad profunda utilizando [`shallowRef()`](/api/reactivity-advanced.html#shallowref) y [`shallowReactive()`](/api/reactivity-advanced.html#shallowreactive). Las API superficiales crean un estado que es reactivo solo en el nivel raíz, y expone todos los objetos anidados sin tocarlos. Esto mantiene el acceso rápido a las propiedades anidadas, con la condición de que ahora debemos tratar todos los objetos anidados como inmutables, y las actualizaciones solo pueden activarse reemplazando el estado raíz:

```js
const shallowArray = shallowRef([
  /* gran lista de objetos profundos */
])

// esto no activará las actualizaciones...
shallowArray.value.push(newObject)
// esto sí lo hará:
shallowArray.value = [...shallowArr.value, newObject]

// esto no activará las actualizaciones...
shallowArray.value[0].foo = 1
// esto sí lo hará:
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]
```

### Evite las Abstracciones Innecesarias de los Componentes

A veces, podemos crear [componentes sin renderizado](/guide/components/slots.html#componentes-sin-renderizado) o componentes de orden superior (es decir, componentes que renderizan otros componentes con props adicionales) para una mejor abstracción u organización del código. Si bien esto no tiene nada de malo, ten en cuenta que las instancias de componentes son mucho más costosas que los nodos simples del DOM, y crear demasiados de ellos debido a patrones de abstracción generará costos de rendimiento.

Ten en cuenta que reducir solo unas pocas instancias no tendrá un efecto notable, así que no te preocupes si el componente se renderiza sólo unas pocas veces en la aplicación. El mejor escenario para considerar esta optimización es, de nuevo, en las listas grandes. Imagina una lista de 100 artículos donde cada componente del artículo contiene muchos componentes hijos. La eliminación de una abstracción de componente innecesaria aquí podría resultar en una reducción de cientos de instancias de componentes.
