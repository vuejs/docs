# Opciones: Ciclo de vida

:::info Ver también
Para el uso compartido de los hooks del ciclo de vida, véase [Guía - Hooks del Ciclo de Vida](/guide/essentials/lifecycle.html)
:::

## beforeCreate

Se llama cuando se inicializa la instancia.

- **Tipo**

  ```ts
  interface ComponentOptions {
    beforeCreate?(this: ComponentPublicInstance): void
  }
  ```

- **Detalles**

  Se llama inmediatamente cuando se inicializa la instancia, después de la resolución de propiedades (props), antes de procesar otras opciones como `data()` o `computed`.

  Tenga en cuenta que el hook `setup()` de la API de composición se llama antes de cualquier hook de la API de opciones, incluso antes de `beforeCreate()`.

## created

Se llama después de que la instancia haya terminado de procesar todas las opciones relacionadas con el estado.

- **Tipo**

  ```ts
  interface ComponentOptions {
    created?(this: ComponentPublicInstance): void
  }
  ```

- **Detalles**

  Cuando se llama a este hook, se han montado los siguientes elementos: datos reactivos, propiedades computadas, métodos y observadores. Sin embargo, la fase de montaje no se ha iniciado, y la propiedad `$el` no estará disponible todavía.

## beforeMount

Se llama justo antes de montar el componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    beforeMount?(this: ComponentPublicInstance): void
  }
  ```

- **Detalles**

  Cuando se llama a este hook, el componente ha terminado de configurar su estado reactivo, pero aún no se han creado nodos DOM. Está a punto de ejecutar su efecto de renderización del DOM por primera vez.

  **Este hook no se llama durante el renderizado del lado del servidor.**

## mounted

Se llama después de montar el componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    mounted?(this: ComponentPublicInstance): void
  }
  ```

- **Detalles**

  Un componente se considera montado después de:

  - Todos sus componentes hijos síncronos han sido montados (no incluye componentes asíncronos o componentes dentro de árboles `<Suspense>`).

  - Su propio árbol DOM ha sido creado e insertado en el contenedor padre. Tenga en cuenta que sólo garantiza que el árbol DOM del componente esta en-el-documento si el contenedor raíz de la aplicación también está en-el-documento.

  Este hook se utiliza normalmente para realizar efectos secundarios que necesitan acceder al DOM renderizado del componente, o para limitar el código relacionado con el DOM al cliente en una [aplicación renderizada por el servidor](/guide/scaling-up/ssr.html).

  **Este hook no se llama durante el renderizado del lado del servidor.**

## beforeUpdate

Se llama justo antes de que el componente esté a punto de actualizar su árbol DOM debido a un cambio de estado reactivo.

- **Tipo**

  ```ts
  interface ComponentOptions {
    beforeUpdate?(this: ComponentPublicInstance): void
  }
  ```

- **Detalles**

  Este hook se puede utilizar para acceder al estado del DOM antes de que Vue actualice el DOM. También es seguro modificar el estado del componente dentro de este hook.

  **Este hook no se llama durante el renderizado del lado del servidor.**

## updated

Se llama después de que el componente haya actualizado su árbol DOM debido a un cambio de estado reactivo.

- **Tipo**

  ```ts
  interface ComponentOptions {
    updated?(this: ComponentPublicInstance): void
  }
  ```

- **Detalles**

  El hook de actualización de un componente padre es llamado después del de sus componentes hijos.

  Este hook es llamado después de cualquier actualización del DOM del componente, que puede ser causada por diferentes cambios de estado. Si necesita acceder al DOM actualizado después de un cambio de estado específico, utilice [nextTick()](/api/general.html#nexttick) en su lugar.

  **Este hook no se llama durante el renderizado del lado del servidor.**

  :::warning
  No mutee el estado del componente en el hook de actualización - ¡esto probablemente conducirá a un bucle de actualización infinito!
  :::

## beforeUnmount

Se llama justo antes de desmontar una instancia de un componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    beforeUnmount?(this: ComponentPublicInstance): void
  }
  ```

- **Detalles**

  Cuando se llama a este hook, la instancia del componente sigue siendo totalmente funcional.

  **Este hook no se llama durante el renderizado del lado del servidor.**

## unmounted

Se llama después de que el componente haya sido desmontado.

- **Tipo**

  ```ts
  interface ComponentOptions {
    unmounted?(this: ComponentPublicInstance): void
  }
  ```

- **Detalles**

  Un componente se considera desmontado después de:

  - Todos sus componentes hijos han sido desmontados.

  - Todos sus efectos reactivos asociados (efecto de renderizado y computados / observadores creados durante `setup()`) han sido detenidos.

  Utilice este hook para limpiar los efectos secundarios creados manualmente, como temporizadores, escuchadores de eventos DOM o conexiones al servidor.

  **Este hook no se llama durante el renderizado del lado del servidor.**

## errorCaptured

Se llama cuando se ha capturado un error que se propaga desde un componente descendente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    errorCaptured?(
      this: ComponentPublicInstance,
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ): boolean | void
  }
  ```

- **Detalles**

  Los errores pueden ser capturados desde las siguientes fuentes:

  - Los renders de los componentes
  - Manejadores de eventos
  - Hooks del ciclo de vida
  - Función `setup()`.
  - Observadores
  - Hooks de directiva personalizados
  - Hooks de transición

  El hook recibe tres argumentos: el error, la instancia del componente que desencadenó el error y una cadena de información que especifica el tipo de origen del error.

  Puede modificar el estado del componente en `errorCaptured()` para mostrar un estado de error al usuario. Sin embargo, es importante que el estado de error no debe renderizar el contenido original que causó el error; de lo contrario el componente será lanzado a un bucle de renderización infinito.

  El hook puede devolver `false` para evitar que el error se siga propagando. Vea los detalles de la propagación de errores más abajo.

  **Reglas de propagación de errores**

  - Por defecto, todos los errores se siguen enviando al nivel de la aplicación [`app.config.errorHandler`](/api/application.html#app-config-errorhandler) si está definido, para que estos errores puedan seguir siendo reportados a un servicio de análisis en un único lugar.

  - Si existen varios hooks `errorCaptured` en la cadena de herencia de un componente o en la cadena padre, todos ellos serán invocados en el mismo error, en el orden de abajo hacia arriba. Esto es similar al mecanismo de burbujeo de los eventos nativos del DOM.

  - Si el propio hook `errorCaptured` lanza un error, tanto este error como el error original capturado se envían a `app.config.errorHandler`.

  - Un hook `errorCaptured` puede devolver `false` para evitar que el error se siga propagando. Esto es esencialmente decir "este error ha sido manejado y debe ser ignorado". Evitará que cualquier hook `errorCaptured` adicional o `app.config.errorHandler` sea invocado para este error.

## renderTracked <sup class="vt-badge dev-only" />

Se llama cuando una dependencia reactiva ha sido rastreada por el efecto de renderización del componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  Tipo DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    Tipo: TrackOpTipos /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **Ver también:** [Reactividad en Profundidad](/guide/extras/reactivity-in-depth.html)

## renderTriggered <sup class="vt-badge dev-only" />

Se llama cuando una dependencia reactiva hace que el efecto de renderización del componente se vuelva a ejecutar.

- **Tipo**

  ```ts
  interface ComponentOptions {
    renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  Tipo DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    Tipo: TriggerOpTipos /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **Ver también:** [Reactividad en Profundidad](/guide/extras/reactivity-in-depth.html)

## activated

Se llama después de que la instancia del componente se inserta en el DOM como parte de un árbol almacenado en caché por [`<KeepAlive>`](/api/built-in-components.html#keepalive).

**Este hook no se llama durante el renderizado del lado del servidor.**

- **Tipo**

  ```ts
  interface ComponentOptions {
    activated?(this: ComponentPublicInstance): void
  }
  ```

- **Ver también:** [Guía - Ciclo de Vida de la Instancia en Caché ](/guide/built-ins/keep-alive.html#ciclo-de-vida-de-la-instancia-en-cache)

## deactivated

Se llama después de que la instancia del componente se elimina del DOM como parte de un árbol cacheado por [`<KeepAlive>`](/api/built-in-components.html#keepalive).

**Este hook no se llama durante el renderizado del lado del servidor.**

- **Tipo**

  ```ts
  interface ComponentOptions {
    deactivated?(this: ComponentPublicInstance): void
  }
  ```

- **Ver también:** [Guía - Ciclo de Vida de la Instancia en Caché ](/guide/built-ins/keep-alive.html#ciclo-de-vida-de-la-instancia-en-cache)

## serverPrefetch <sup class="vt-badge" data-text="SSR only" />

Función asíncrona a resolverse antes de que la instancia del componente se renderice en el servidor.

- **Tipo**

  ```ts
  interface ComponentOptions {
    serverPrefetch?(this: ComponentPublicInstance): Promise<any>
  }
  ```

- **Detalles**

  Si el hook devuelve una Promesa, el renderizador del servidor esperará hasta que la Promesa se resuelva antes de renderizar el componente.

  Este hook sólo es llamado durante el renderizado del lado del servidor, puede ser utilizado para realizar la obtención de datos sólo en el servidor.

- **Ejemplo**

  ```js
  export default {
    data() {
      return {
        data: null
      }
    },
    async serverPrefetch() {
      // el componente se renderiza como parte de la solicitud inicial
      // precarga de datos en el servidor, ya que es más rápido que en el cliente
      this.data = await fetchOnServer(/* ... */)
    },
    async mounted() {
      if (!this.data) {
        // si los datos son nulos en el montaje, significa que el componente
        // se renderiza dinámicamente en el cliente. 
        // De lo contrario realiza una petición fetch en el lado del cliente.
        this.data = await fetchOnClient(/* ... */)
      }
    }
  }
  ```

- **Ver también:** [Renderizado del Lado del Servidor (SSR)](/guide/scaling-up/ssr.html)
