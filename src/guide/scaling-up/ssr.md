---
outline: deep
---

# Renderizado del Lado del Servidor (SSR)

## Generalidades

### ¿Qué es el SSR?

Vue.js es un framework para construir aplicaciones del lado del cliente. Por defecto, los componentes de Vue generan y manipulan el DOM en el navegador a modo de salida. Sin embargo, también es posible renderizar los mismos componentes en cadenas HTML en el servidor, enviarlas directamente al navegador y, finalmente, "hidratar" el código estático en una aplicación completamente interactiva sobre el cliente.

Una aplicación Vue.js renderizada por el servidor también se puede considerar "isomórfica" o "universal", en el sentido de que la mayor parte del código de la aplicación se ejecuta tanto en el servidor **como en el** cliente.

### ¿Por qué el SSR?

En comparación con una aplicación de una sola página (SPA) del lado del cliente, la ventaja de SSR radica principalmente en:

- **Mayor rapidez en la visualización del contenido**: esto es más importante en el caso de internet lento o de dispositivos lentos. El código renderizado en el servidor no necesita esperar hasta que todo el JavaScript se haya descargado y ejecutado para ser mostrado, por lo que el usuario verá una página completamente renderizada en menos tiempo. Por otra parte, la recuperación de datos se realiza en el lado del servidor durante la primera consulta, que probablemente tenga una conexión con la base de datos más rápida que la del cliente. Esto generalmente resulta en una mejora de las métricas de las [Core Web Vitals](https://web.dev/vitals/), una mejor experiencia de usuario y puede ser crítico para las aplicaciones en las que el tiempo para llegar al contenido esté directamente asociado con la tasa de conversión.

- **Modelo mental unificado**: puedes utilizar el mismo lenguaje y el mismo modelo mental declarativo orientado a componentes para desarrollar toda tu aplicación, en lugar de saltar adelante y atrás entre un sistema de plantillas de backend y un framework de frontend.

- **Mejor SEO**: los rastreadores de los motores de búsqueda visualizarán la página completamente renderizada de forma directa.

  :::tip
  A partir de ahora, Google y Bing pueden indexar aplicaciones JavaScript síncronas sin problemas. Sincrónico es la palabra clave. Si tu aplicación comienza con un spinner de carga, y luego obtienes el contenido a través de Ajax, el rastreador no esperará a que termine. Esto significa que si tienes contenido obtenido de forma asíncrona en páginas donde el SEO es importante, el SSR podría ser necesario.
  :::

También hay que tener en cuenta algunas desventajas a la hora de utilizar el SSR:

- Restricciones de desarrollo. El código específico del navegador solo se puede usar dentro de ciertos hooks del ciclo de vida; algunas librerías externas pueden necesitar un tratamiento especial para poder ejecutarse en una aplicación renderizada por el servidor.

- Requisitos de configuración y despliegue más complicados. A diferencia de una SPA totalmente estática que se puede implementar en cualquier servidor de archivos estático, una aplicación renderizada en el servidor requiere un entorno en el que pueda ejecutarse un servidor de Node.js.

- Más carga del lado del servidor. Renderizar una aplicación completa en Node.js requerirá más CPU que solo servir archivos estáticos, por lo que si esperas mucho tráfico, prepárate para la correspondiente carga del servidor y emplea sabiamente estrategias de almacenamiento en caché.

Antes de usar SSR para tu aplicación, la primera pregunta que debes hacerte es si realmente lo necesitas. Depende sobre todo de la importancia que tenga el tiempo de acceso al contenido para tu aplicación. Por ejemplo, si estás construyendo un panel de control interno en el que unos cientos de milisegundos adicionales en la carga inicial no importan demasiado, SSR sería una exageración. Sin embargo, en los casos en los que el tiempo de acceso al contenido es absolutamente crítico, SSR puede ayudarte a conseguir el mejor rendimiento posible en la carga inicial.

### SSR vs. SSG

**La Generación de Sitios Estáticos (SSG)**, también conocida como pre-renderización, es otra técnica popular para crear sitios web rápidos. Si los datos necesarios para renderizar una página en el servidor son los mismos para todos los usuarios, entonces, en lugar de renderizar la página cada vez que llega una solicitud, podemos renderizarla solo una vez, por adelantado, durante el proceso de compilación. Las páginas renderizadas previamente se generan y sirven como archivos HTML estáticos.

SSG conserva las mismas características de rendimiento de las aplicaciones SSR: proporciona un gran rendimiento en el tiempo de acceso al contenido. Al mismo tiempo, es más barato y fácil de implementar que las aplicaciones SSR porque la salida es HTML estático y los recursos. La palabra clave aquí es **estático**: SSG solo se puede aplicar a páginas que consumen datos estáticos; es decir, datos que se conocen en el momento de la compilación y que no cambian entre despliegues. Cada vez que los datos cambian, se necesita un nuevo despliegue.

Si solo estás investigando SSR para mejorar el SEO de un puñado de páginas de marketing (por ejemplo, `/`, `/about`, `/contact`, etc.), entonces probablemente deseas SSG en lugar de SSR. SSG también es excelente para sitios web basados ​​en contenido, como sitios de documentación o blogs. De hecho, este sitio web que estás leyendo en este momento se genera estáticamente utilizando [VitePress](https://vitepress.vuejs.org/), un generador de sitios estáticos con tecnología de Vue.

## Tutorial Básico

### Renderizado de una App

Veamos el ejemplo más básico de Vue SSR en acción.

1. Crear un nuevo directorio e ingresar a él con `cd`
2. Ejecutar `npm init -y`
3. Agregar `"type": "module"` en el archivo `package.json` para que Node.js se ejecute en [modo ES modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules).
4. Ejecutar `npm install vue`
5. Crear un archivo `example.js`:

```js
// esto se ejecuta en Node.js en el servidor.
import { createSSRApp } from 'vue'
// La API de renderización de servidores de Vue está expuesta en `vue/server-renderer`.
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp({
  data: () => ({ count: 1 }),
  template: `<button @click="count++">{{ count }}</button>`
})

renderToString(app).then((html) => {
  console.log(html)
})
```

Entonces ejecuta:

```sh
> node example.js
```

Debería imprimir lo siguiente en la línea de comandos:

```
<button>1</button>
```

[`renderToString()`](/api/ssr.html#rendertostring) toma una instancia de la aplicación de Vue y devuelve una Promesa que resuelve el HTML renderizado de la aplicación. También es posible transmitir la renderización mediante la [API de secuencias de Node.js](https://nodejs.org/api/stream.html) o la [API de secuencias web](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). Consulta la [referencia de la API de SSR](/api/ssr.html) para obtener todos los detalles.

Luego, podemos mover el código Vue SSR a un manejador de peticiones del servidor, que envuelve el contenido de la aplicación con el HTML de la página completa. Usaremos [`express`](https://expressjs.com/) para los siguientes pasos:

- Ejecuta `npm install express`
- Crea el siguiente archivo `server.js`:

```js
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})
```

Finalmente, ejecuta `node server.js` y visita `http://localhost:3000`. Deberías ver la página funcionando con el botón.

[Pruébalo en StackBlitz](https://stackblitz.com/fork/vue-ssr-example-basic?file=index.js)

### Hidratación del Cliente

Si haces clic en el botón, verás que el número no cambia. El HTML es completamente estático en el cliente ya que no estamos cargando Vue en el navegador.

Para que la aplicación del lado del cliente sea interactiva, Vue debe realizar el paso de **hidratación**. Durante la hidratación, crea la misma aplicación Vue que se ejecutó en el servidor, hace coincidir cada componente con los nodos del DOM que debe controlar y adjunta escuchadores de eventos del DOM.

Para montar una aplicación en modo de hidratación, necesitamos usar [`createSSRApp()`](/api/application.html#createssrapp) en lugar de `createApp()`:

```js{2}
// esto se ejecuta en el navegador.
import { createSSRApp } from 'vue'

const app = createSSRApp({
  // ...la misma aplicación que en el servidor
})

// montar una aplicación SSR en el cliente supone
// que el HTML se renderizó previamente y realizará
// la hidratación en lugar de montar nuevos nodos en el DOM.
app.mount('#app')
```

### Estructura del Código

Observa cómo necesitamos reutilizar la misma implementación de la aplicación que en el servidor. Aquí es donde debemos comenzar a pensar en la estructura del código en una aplicación SSR: ¿cómo compartimos el mismo código de aplicación entre el servidor y el cliente?

Aquí demostraremos la configuración más básica. Primero, dividamos la lógica de creación de la aplicación en un archivo dedicado, `app.js`:

```js
// app.js (compartido entre el servidor y el cliente)
import { createSSRApp } from 'vue'

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}
```

Este archivo y sus dependencias se comparten entre el servidor y el cliente; los llamamos **código universal**. Hay una serie de cosas a las que hay que prestar atención cuando se escribe código universal, como veremos [a continuación](#escritura-de-codigo-amigable-con-el-ssr).

Nuestro archivo de cliente importa el código universal, crea la aplicación y realiza el montaje:

```js
// client.js
import { createApp } from './app.js'

createApp().mount('#app')
```

Y el servidor utiliza la misma lógica de creación de aplicaciones en el manejador de solicitudes:

```js{2,5}
// server.js (código irrelevante omitido)
import { createApp } from './app.js'

server.get('/', (req, res) => {
  const app = createApp()
  renderToString(app).then(html => {
    // ...
  })
})
```

Además, para cargar los archivos del cliente en el navegador, también necesitamos:

1. Entregar los archivos del cliente agregando `server.use(express.static('.'))` en el archivo `server.js`.
2. Cargue la entrada del cliente agregando `<script type="module" src="/client.js"></script>` al shell HTML.
3. Soporte el uso de `import * from 'vue'` en el navegador agregando un [mapa de importación](https://github.com/WICG/import-maps) al shell HTML.

[Pruebe el ejemplo completo en StackBlitz](https://stackblitz.com/fork/vue-ssr-example?file=index.js). ¡El botón ahora es interactivo!

## Soluciones de Alto Nivel

Pasar del ejemplo a una aplicación SSR lista para producción implica mucho más. Necesitaremos:

- Soportar los SFC de Vue y otros requisitos de los pasos de compilación. De hecho, necesitaremos coordinar dos compilaciones para la misma aplicación: una para el cliente y otra para el servidor.

  :::tip
  Los componentes de Vue se compilan de manera diferente cuando se usan para SSR: las plantillas se compilan en concatenaciones de cadenas en lugar de las funciones de renderizado del Virtual DOM para un rendimiento de procesamiento más eficiente.
  :::

- En el manejador de peticiones del servidor, renderizar el HTML con los enlaces correctos de recursos del lado del cliente y las sugerencias de recursos óptimas. También podemos necesitar cambiar entre el modo SSR y SSG, o incluso mezclar ambos en la misma aplicación.

- Administrar el enrutamiento, la obtención de datos y los stores de administración de estado de manera universal.

Una implementación completa sería bastante compleja y depende de la cadena de herramientas de compilación con la que hayas elegido trabajar. Por lo tanto, recomendamos encarecidamente optar por una solución de alto nivel que abstraiga la complejidad por ti. A continuación, presentaremos algunas soluciones SSR recomendadas en el ecosistema de Vue.

### Nuxt

[Nuxt](https://v3.nuxtjs.org/) es un framework de alto nivel creado sobre el ecosistema de Vue que proporciona una experiencia de desarrollo simplificada para escribir aplicaciones universales de Vue. Mejor aún, ¡también puedes usarlo como un generador de sitios estáticos! Recomendamos encarecidamente que lo pruebes.

### Quasar

[Quasar](https://quasar.dev) es una solución completa basada en Vue que le permite apuntar a SPA, SSR, PWA, aplicación móvil, aplicación de escritorio y extensión del navegador, todo ello usando una base de código. No solo maneja la configuración de la compilación, sino que también proporciona una colección completa de componentes de interfaz de usuario compatibles con Material Design.

### Vite SSR

Vite proporciona soporte incorporado para el [renderizado del lado del servidor de Vue](https://vitejs.dev/guide/ssr.html), pero es intencionalmente de bajo nivel. Si deseas ir directamente con Vite, consulta [vite-plugin-ssr](https://vite-plugin-ssr.com/), un complemento de la comunidad que abstrae muchos detalles difíciles por ti.

También puedes encontrar un proyecto de ejemplo de Vue + Vite SSR utilizando la configuración manual [aquí](https://github.com/vitejs/vite/tree/main/playground/ssr-vue), que puede servir como base para compilar. Ten en cuenta que esto solo se recomienda si tienes experiencia con SSR/herramientas de compilación y realmente quieres tener un control completo sobre la arquitectura de alto nivel.

## Escritura de Código Amigable con el SSR

Independientemente de la configuración de compilación o la elección del framework de alto nivel, existen algunos principios que se aplican en todas las aplicaciones de Vue SSR.

### Reactividad en el Servidor

Durante el SSR, cada URL de solicitud se asigna a un estado deseado de nuestra aplicación. No hay interacción del usuario ni actualizaciones del DOM, por lo que la reactividad no es necesaria en el servidor. Por defecto, la reactividad está desactivada durante la SSR para mejorar el rendimiento.

### Hooks del Ciclo de Vida de los Componentes

Dado que no hay actualizaciones dinámicas, los hooks del ciclo de vida como <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> o <span class="options-api">`updated`</span><span class="composition-api">`onUpdated`</span> **NO** se llamarán durante SSR y solo se ejecutarán en el cliente.<span class="options-api"> Los únicos hooks que se llaman durante el SSR son `beforeCreate` y `created`.</span>

Debes evitar el código que produce efectos secundarios que necesitan ser limpiados en <span class="options-api">`beforeCreate` y `created`</span><span class="composition-api">`setup()` o el ámbito raíz de `<script setup>`</span>. Un ejemplo de tales efectos secundarios es configurar temporizadores con `setInterval`. En el código del lado del cliente, podemos configurar un temporizador y luego desactivarlo en <span class="options-api">`beforeUnmount`</span><span class="composition-api">`onBeforeUnmount`</span> o <span class="options-api">`unmounted`</span><span class="composition-api">`onUnmounted`</span>. Sin embargo, debido a que los hooks de unmount nunca se llamarán durante el SSR, los temporizadores permanecerán para siempre. Para evitar esto, mueve tu código de efectos secundarios a <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span>.

### Acceso a las API Específicas de la Plataforma

El código universal no puede asumir el acceso a las API específicas de la plataforma, por lo que si tu código utiliza directamente globales exclusivos del navegador como `window` o `document`, generarán errores cuando se ejecuten en Node.js y viceversa.

Para las tareas que se comparten entre el servidor y el cliente pero con diferentes API de plataforma, se recomienda envolver las implementaciones específicas de la plataforma dentro de una API universal, o utilizar bibliotecas que lo hagan por ti. Por ejemplo, puedes usar [`node-fetch`](https://github.com/node-fetch/node-fetch) para usar la misma API de fetch tanto en el servidor como en el cliente.

En el caso de las APIs sólo para navegadores, el enfoque común es acceder a ellas de forma perezosa dentro de los hooks del ciclo de vida sólo para clientes, como <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span>.

Ten en cuenta que si una librería de terceros no está escrita teniendo en cuenta el uso universal, podría ser complicado integrarla en una aplicación renderizada por el servidor. _Podrías_ conseguir que funcione imitando algunos de los globales, pero sería complicado y podría interferir con el código de detección del entorno de otras librerías.

### Contaminación del Estado por Solicitudes Cruzadas

En el capítulo Gestión del estado, presentamos [un patrón de gestión sencilla del estado utilizando las API de reactividad](state-management.html#gestion-sencilla-del-estado-con-la-api-de-reactividad). En un contexto SSR, este patrón requiere algunos ajustes adicionales.

El patrón declara el estado compartido en el ámbito raíz de un módulo de JavaScript. Esto los convierte en **singletons**, es decir, solo hay una instancia del objeto reactivo durante todo el ciclo de vida de nuestra aplicación. Esto funciona como se espera en una aplicación de Vue pura del lado del cliente, ya que los módulos de nuestra aplicación se inicializan de nuevo para cada visita a la página del navegador.

Sin embargo, en un contexto de SSR, los módulos de la aplicación generalmente se inicializan solo una vez en el servidor, cuando el servidor arranca. Las mismas instancias del módulo serán reutilizadas a través de múltiples peticiones al servidor, al igual que nuestros objetos de estado singleton. Si mutamos el estado singleton compartido con datos específicos de un usuario, puede filtrarse accidentalmente a una solicitud de otro usuario. A esto lo llamamos **contaminación del estado por solicitudes cruzadas.**

Técnicamente, podemos reiniciar todos los módulos de JavaScript en cada solicitud, tal como lo hacemos en los navegadores. Sin embargo, la inicialización de los módulos de JavaScript puede resultar costosa, por lo que afectaría significativamente el rendimiento del servidor.

La solución recomendada es crear una nueva instancia completa de toda la aplicación, incluyendo el router y los stores globales, en cada solicitud. Luego, en lugar de importarlo directamente en nuestros componentes, proporcionamos el estado compartido usando [nivel de aplicación de Provide](/guide/components/provide-inject.html#nivel-de-aplicacion-de-provide) y lo inyectamos en los componentes que lo necesitan:

```js
// app.js (compartido entre el servidor y el cliente)
import { createSSRApp } from 'vue'
import { createStore } from './store.js'

// llamado en cada solicitud
export function createApp() {
  const app = createSSRApp(/* ... */)
  // crear una nueva instancia del store por solicitud
  const store = createStore(/* ... */)
  // provide un store en el nivel de la aplicación
  app.provide('store', store)
  // también exponer el store para la hidratación
  return { app, store }
}
```

Las librerías de gestión de estados como Pinia están diseñadas con esto en mente. Consulta la [guía de SSR de Pinia](https://pinia.vuejs.org/ssr/) para más detalles.

### Error en la Hidratación

Si la estructura DOM del HTML renderizado previamente no coincide con el resultado esperado de la aplicación del lado del cliente, habrá un error de diferencia de hidratación. La diferencia de hidratación se presenta más comúnmente por las siguientes causas:

1. La plantilla contiene una estructura de anidamiento de HTML no válida, y el HTML renderizado fue "corregido" por el comportamiento de análisis de HTML nativo del navegador. Por ejemplo, un problema común es que [`<div>` no se puede colocar dentro de `<p>`](https://stackoverflow.com/questions/8397852/why-cant-the-p-tag-contain-a-div-tag-inside-it):

   ```html
   <p><div>Hola</div></p>
   ```

   Si escribimos esto en nuestro HTML renderizado por el servidor, el navegador terminará el primer `<p>` cuando se encuentre el `<div>` y lo analizará en la siguiente estructura DOM:

   ```html
   <p></p>
   <div>Hola</div>
   <p></p>
   ```

2. Los datos utilizados durante el renderizado contienen valores generados aleatoriamente. Dado que la misma aplicación se ejecutará dos veces, una en el servidor y otra en el cliente, no se garantiza que los valores aleatorios sean los mismos entre las dos ejecuciones. Hay dos formas de evitar las diferencias inducidas por valores aleatorios:

   1. Usa `v-if` + `onMounted` para representar la parte que depende de valores aleatorios solo en el cliente. Tu framework también puede tener características integradas para hacer esto más fácil, por ejemplo, el componente `<ClientOnly>` en VitePress.

   2. Usa una librería generadora de números aleatorios que soporte la generación con semillas y garantice que la ejecución del servidor y la ejecución del cliente utilicen la misma semilla (por ejemplo, incluyendo la semilla en el estado serializado y recuperándola en el cliente).

3. El servidor y el cliente están en diferentes zonas horarias. A veces, es posible que deseemos convertir una marca de tiempo en la hora local del usuario. Sin embargo, la zona horaria durante la ejecución del servidor y la zona horaria durante la ejecución del cliente no siempre son las mismas, y es posible que no sepamos de manera confiable la zona horaria del usuario durante la ejecución del servidor. En tales casos, la conversión de la hora local también debe realizarse como una operación exclusiva del cliente.

Cuando Vue encuentra una diferencia de hidratación, intentará recuperarse automáticamente y ajustar el DOM pre-renderizado para que coincida con el estado del lado del cliente. Esto conducirá a una cierta pérdida de rendimiento de renderizado debido a que se descartan los nodos incorrectos y se montan nuevos nodos, pero en la mayoría de los casos, la aplicación debería continuar funcionando como se espera. Dicho esto, sigue siendo mejor eliminar las diferencias de hidratación durante el desarrollo.

### Directivas Personalizadas

Dado que la mayoría de las directivas personalizadas implican la manipulación directa del DOM, se ignoran durante el SSR. Sin embargo, si deseas especificar cómo se debe renderizar una directiva personalizada (es decir, qué atributos debe agregar al elemento renderizado), puedes usar el hook de la directiva `getSSRProps`:

```js
const myDirective = {
  mounted(el, binding) {
    // implementación del lado del cliente:
    // actualizar directamente el DOM
    el.id = binding.value
  },
  getSSRProps(binding) {
    // implementación del lado del servidor:
    // retorna las props que se van a renderizar.
    // getSSRProps sólo recibe la directiva vinculante.
    return {
      id: binding.value
    }
  }
}
```

### Teleports

Los teleports requieren un manejo especial durante el SSR. Si la aplicación renderizada contiene Teleports, el contenido teletransportado no formará parte de la cadena renderizada. Una solución más fácil es renderizar condicionalmente el Teleport en el montaje.

Si necesita hidratar contenido teletransportado, se exponen bajo la propiedad `teleports` del objeto de contexto del ssr:

```js
const ctx = {}
const html = await renderToString(app, ctx)

console.log(ctx.teleports) // { '#teleported': 'contenido teletransportado' }
```

Tienes que inyectar el contenido teletransportado en la ubicación correcta en el HTML de tu página final de forma similar a como tienes que inyectar el contenido de la aplicación principal.

:::tip
Evite apuntar al `body` cuando use Teleports y SSR juntos; por lo general, `<body>` contendrá otro contenido generado por el servidor, lo que hace imposible que los Teleports determinen la ubicación de inicio correcta para la hidratación.

En su lugar, prefiera un contenedor dedicado, por ejemplo, `<div id="teleported"></div>` que contenga sólo contenido teletransportado.
:::
