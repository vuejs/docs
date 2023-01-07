# Composition API: Hooks del Ciclo de Vida

:::info Nota de Uso
Todas las APIs listadas en esta página deben ser llamadas en forma sincrónica durante la ejecución de la función `setup()`. Ver [Guía - Hooks del Ciclo de Vida](/guide/essentials/lifecycle.html) para más detalles.
:::

## onMounted()

Registra un callback que será llamado una vez que el componente se haya montado.

- **Tipo**

  ```ts
  function onMounted(callback: () => void): void
  ```

- **Detalles**

  Un componente se considera montado luego de que:

  - Todos sus componentes hijos han sido montados (no incluye componentes asincrónos o componentes dnetro de `<Suspense>`).

  - Su propio estructura de DOM es creado e insertado entro del contenedor padre. Ten en cuenta que esto solo garantiza que la estructura de DOM del componente esté en el documento siempre y cuando el contenedor raíz de la aplicación también lo esté.

  Este hook para realizar tareas que necesitan acceder al DOM renderizado del componente, o para limitar el código relacionado con el DOM en el cliente en una [aplicación renderizada del lado del servidor](/guide/scaling-up/ssr.html).

  **Este hook no es llamado durante el renderizado del lado del servidor.**

- **Ejemplo**

  Accediendo a un elemento a través de un ref de la plantilla:

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const el = ref()

  onMounted(() => {
    el.value // <div>
  })
  </script>

  <template>
    <div ref="el"></div>
  </template>
  ```

## onUpdated()

Registra un callback que será llamado luego de que el componente ha actualizado su estrucutra de DOM debido a un cambio de estado reactivo.

- **Tipo**

  ```ts
  function onUpdated(callback: () => void): void
  ```

- **Detalles**

  El hook de actualización de un componente padre es llamado después del de sus componentes hijos.

  Este hook es llamado después de cualquier actualización del DOM del componente, que puede ser causada por diferentes cambios de estado. Si necesitas acceder al DOM actualizado después de un cambio de estado específico, utiliza [nextTick()](/api/general.html#nexttick) en su lugar.

  **Este hook no es llamado durante el renderizado del lado del servidor.**

  :::warning
  No mutes el estado del componente en el hook de actualización - ¡esto posiblemente provocará un bucle infinito de actualizaciones!
  :::

- **Ejemplo**

  Accediendo a una actualización del DOM:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // el texto del elemento debería ser igual al contenido de `count.value`
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## onUnmounted()

Registra un callback que será llamado una vez que el componente haya sido desmontado.

- **Tipo**

  ```ts
  function onUnmounted(callback: () => void): void
  ```

- **Detalles**

  Un componente se considera desmontado luego de que:

  - Todos sus componentes hijos hayan sido desmontados.

  - Todos sus efectos reactivos asociados (efectos de renderizado y computadas / watchers creadas en `setup()`) han sido detenidos.

  Utiliza este hook para limpiar manualmente los efectos secundarios tales como timers, listeners de eventos del DOM o conexiones con el servidor.

  **Este hook no es llamado durante el renderizado del lado del servidor.**

- **Ejemplo**

  ```vue
  <script setup>
  import { onMounted, onUnmounted } from 'vue'

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    })
  })

  onUnmounted(() => clearInterval(intervalId))
  </script>
  ```

## onBeforeMount()

Registra un hook que será llamado justo antes de que el componente sea montado.

- **Tipo**

  ```ts
  function onBeforeMount(callback: () => void): void
  ```

- **Detalles**

  Cuando este hook es llamado, el componente ha terminado de configurar su estado reactivo, pero todavía no se ha creado ningun nodo en el DOM. Está a punto de ejecutar el renderizado en el DOM por primera vez.

  **Este hook no es llamado durante el renderizado del lado del servidor.**

## onBeforeUpdate()

Registra un hook que será llamado justo antes de que el componente actualize su árbol de DOM debido a un cambio en su estado reactivo.

- **Tipo**

  ```ts
  function onBeforeUpdate(callback: () => void): void
  ```

- **Detalles**

  Este hook puede ser usado para acceder al estado del DOM antes de que Vue actualice el DOM. Asimismo, es seguro modificar el estado de un componente dentro de este hook.

  **Este hook no es llamado durante el renderizado del lado del servidor.**

## onBeforeUnmount()

Registra un hook que será llamado justo antes de que el componente sea desmontado.

- **Tipo**

  ```ts
  function onBeforeUnmount(callback: () => void): void
  ```

- **Detalles**

  Cuando este hook es llamado, la instancia del componente aun es funcional.

  **Este hook no es llamado durante el renderizado del lado del servidor.**

## onErrorCaptured()

Registra un hook que será llamado cuando se capture un error que fue propagado por un componente hijo.

- **Tipo**

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **Detalles**

  Los errores pueden ser capturados desde las siguientes fuentes:

  - Renderizado de los componentes
  - Manejadores de eventos
  - Hooks del ciclo de vida
  - La función `setup()`
  - Watchers
  - Hooks de directivas personalizadas
  - Hooks de transiciones

  El hook recibe tres argumentos: el error, la instancia del componente que disparó el error y un string que especifica el tipo de fuente del error.

  Es posible modificar el estado del componente en `errorCaptured()` para mostrar así el error al usuario. Sin embargo, es importante que no se vuelva a renderizar el contenido que causo el error en primer lugar; de lo contrario esto causará que el componente entre en un bucle infinito de renderizaciones.

  El hook puede retornar `false` para detener la propagación del error. Ver los detalles de la propagación del error a continuación.

  **Reglas de la Propagación de Errores**

  - Por defecto, todos los errores son enviados al objeto [`app.config.errorHandler`](/api/application.html#app-config-errorhandler) si este está definido, por lo que estos errores pueden ser reportados incluso a un servicio de analytics en un solo lugar.

  - Si exiten múltiples hooks `errorCaptured` en la cadena de herencia de un componente o en la cadena padre, todos ellos serán invocados ante el mismo error, partiendo del que esté más abajo en la cadena hacia arriba. Esto es similar al mecanismo de bubujeo naivo de los eventos del DOM.

  - Si el hook `errorCaptured` mismo arroja un error, tanto este error como el que disparó la llamada son enviados a `app.config.errorHandler`.

  - Un hook `errorCaptured` puede retornar `false` para prevenir que el error se siga propagando. Esto es, básicamente, "este error ya ha sido manejado por lo que debe ser ignorado." Esto evitará cualquier llamada adicional a otros hooks `errorCaptured` o que `app.config.errorHandler` sea invocada a causa de este error.

## onRenderTracked() <sup class="vt-badge dev-only" />

Registra un hook de depuración que será llamado cuando una dependencia reactiva ha sido rastreada por el efecto de renderizado del componente.

**Este hook es usado en desarrollo y tampoco es llamado durante el renderizado del lado del servidor.**

- **Tipo**

  ```ts
  function onRenderTracked(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **Ver también:** [Reactividad en Profundidad](/guide/extras/reactivity-in-depth.html)

## onRenderTriggered() <sup class="vt-badge dev-only" />

Registra un hook de depuración que será llamado cuando una dependencia reactiva dispare el efecto de renderizado del componente para que se vuelva a ejecutar.

**Este hook es usado en desarrollo y tampoco es llamado durante el renderizado del lado del servidor.**

- **Tipo**

  ```ts
  function onRenderTriggered(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **Ver también:** [Reactividad en Profundidad](/guide/extras/reactivity-in-depth.html)

## onActivated()

Registra un callback que será llamado luego de que la instancia del componente es insertada en el DOM como parte de una estructura cacheada por [`<KeepAlive>`](/api/built-in-components.html#keepalive).

**Este hook no es llamado durante el renderizado del lado del servidor.**

- **Tipo**

  ```ts
  function onActivated(callback: () => void): void
  ```

- **Ver también:** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## onDeactivated()

Registra un callback que será llamado luego de que la instancia del componente es removida del DOM como parte de una estructura cacheada por [`<KeepAlive>`](/api/built-in-components.html#keepalive).

**Este hook no es llamado durante el renderizado del lado del servidor.**

- **Tipo**

  ```ts
  function onDeactivated(callback: () => void): void
  ```

- **Ver también:** [Guía - Ciclo de Vida de la Instancia en Caché ](/guide/built-ins/keep-alive.html#ciclo-de-vida-de-la-instancia-en-cache)

## onServerPrefetch() <sup class="vt-badge" data-text="SSR only" />

Registra una función asíncrona que será resuelta antes de que la instancia del componente sea renderizada del lado del servidor.

- **Tipo**

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **Detalles**

  Si el callback retorna una Promise, el renderizado del servidor esperará hasta que la Promise se resuelva antes del renderizado del componente.

  Este hook solo es llamado durante el renderizado del lado del servidor y puede ser usado para realizar la búsqueda de datos exclusivamente del lado del servidor.

- **Ejemplo**

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // el componente es renderizado como parte de la solicitud inicial
    // obtiene los datos desde el servidor ya que es más rapido que hacerlo en el cliente
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // si data es null en el montado, significa que el componente
      // será renderizado dinámicamente en el cliente. Realiza
      // la obtención del lado del cliente en su lugar.
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **Ver también:** [Renderizado del Lado del Servidor (SSR)](/guide/scaling-up/ssr.html)
