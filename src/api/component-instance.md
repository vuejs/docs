# Instancia del Componente

:::info
Esta página documenta las propiedades y métodos integrados expuestos en la instancia pública del componente, es decir, `this`.

Todas las propiedades listadas en esta página son de solo lectura (excepto las porpiedades anidadas en `$data`).
:::

## $data

El objeto devuelto desde [`data`](./options-state.html#data), es hecho reactivo por el componente. La instancia del componente delega el acceso a las propiedades en su propio objeto data.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props

Un objeto representando las propiedades actuales y resueltas del componente.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **Detalles**

  Solo las propiedades declaradas a través de la opción [`props`](./options-state.html#props) serán incluidas. La instancia del componente delega el acceso a las propiedades en su propio objeto props.

## $el

El nodo raíz DOM que la instancia del componente está gestionando.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $el: Node | undefined
  }
  ```

- **Detalles**

  El valor de `$el` será `undefined` hasta que el componente esté [montado](./options-lifecycle#mounted).

  - Para componentes con un solo elemento raíz, `$el` apuntará a ese elemento.
  - Para componentes de solo texto, `$el` apuntará al nodo de texto.
  - Para componentes con múltiples nodo raíz, `$el` será el nodo marcacdor de lugar en el DOM que Vue utiliza para mantener la posición del componente en el DOM (un nodo de texto, o un nodo de comentario en el modo de hidratación SSR).

  :::tip
  Por coherencia, se recomienda utilizar [template refs](/guide/essentials/template-refs.html) para acceder directamente a los elementos en lugar de confiar en `$el`.
  :::

## $options

Las opciones resueltas del componente utilizadas para instanciar la instancia actual del componente.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **Detalles**

  El objeto `$options` expone las opciones resueltas para el coponente actual y es el resultado de la fusión de estas posibles fuentes:

  - Mixins globales
  - Component `extends` base
  - Mixins del componente

  Se suele utilizar para pasarle al componente variables personalizadas:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **Ver también:** [`app.config.optionMergeStrategies`](/api/application.html#app-config-optionmergestrategies)

## $parent

La instancia apadre, si la instancia actual tiene uno. Para el componente raíz su valor será `null`.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root

La instancia del componente raíz del árbol de componentes actual. Si la instancia actual no tiene padres este valor será él mismo.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots

Un objeto representando los [slots](/guide/components/slots.html) pasados desde el componente padre.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **Detalles**

  Normalmente se utiliza cuando se crean manualmente [funciones de renderizado](/guide/extras/render-function.html), pero también puede ser usado para detectar cuando un slot está presente.

  Cada slot se expone en `this.$slots` como una función que devuelve un array de vnodos bajo la clave correspondiente al nombre de ese slot. El slot por defecto se expone como `this.$slots.default`.

  Si el slot es un [slot con ámbito](/guide/components/slots.html#slots-con-ambito), los argumentos pasados a la función del slot están disponibles para el slot como sus props.

- **Ver también:** [Funciones de Renderizado - Renderizado de Slots](/guide/extras/render-function.html#renderizado-de-slots)

## $refs

Un objeto de elementos del DOM e instancias de componentes, registrados a través de [refs de la plantilla](/guide/essentials/template-refs.html).

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **Ver también:**

  - [Refs de la Plantilla](/guide/essentials/template-refs.html)
  - [Atributos Especiales - ref](./built-in-special-attributes.md#ref)

## $attrs

Un objeto que contiene el resto de los atributos del componente.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **Detalles**

  [Atributos Fallthrough](/guide/components/attrs.html) son atributos y manejadores de eventos pasados por el componente padre, pero no declarados como una prop o un evento emitido por el hijo.

  Por defecto, todo lo que hay en `$attrs` se heredará automáticamente en el elemento raíz del componente si sólo hay un único elemento raíz. Este comportamiento se desactiva si el componente tiene varios nodos raíz, y puede desactivarse explícitamente con la opción [`inheritAttrs`](./options-misc.html#inheritattrs).

- **Ver también:**

  - [Atributos Fallthrough](/guide/components/attrs.html)

## $watch()

API para crear watchers.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Detalles**

  El primer argumento es el nombre de la propiedad a observar. Puede ser el nombre (string) de una propiedad del componente, una simple cadena delimitada por puntos, o una función getter.

  El segundo argumento es la función de callback. El callback recibe el nuevo calor y el valor anterior de la propiedad observada.

  - **`immediate`**: ejecuta el callback inmediatamente a la creación del watcher. El valor anterior será `undefined` en la primera llamada.
  - **`deep`**: fuerza el recorrido de la propiedad observada si ésta es un objeto, así el callback se dispara en mutaciones anidadas. Ver [Watchers Profundos](/guide/essentials/watchers.html#watchers-profundos).
  - **`flush`**: ajusta el temporizador del flujo del callback. Ver [Callback Flush Timing](/guide/essentials/watchers.html#temporizacion-del-flujo-del-callback) y [`watchEffect()`](/api/reactivity-core.html#watcheffect).
  - **`onTrack / onTrigger`**: depura las dependencias del watcher. Ver [Depuración del Watcher](/guide/extras/reactivity-in-depth.html#depuracion-del-watcher).

- **Ejemplo**

  Observar a través del nombre de una propiedad:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  Observar una propiedad de un objeto:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  Usando un getter para expresiones más complejas:

  ```js
  this.$watch(
    // cada vez que la expresión `this.a + this.b` arroje
    // un resultado diferente, el handler será llamado.
    // Es como si vieramos una propiedad computada
    // sin definir la propiedad computada en sí misma.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  Deteniendo el watcher:

  ```js
  const unwatch = this.$watch('a', cb)

  // después...
  unwatch()
  ```

- **Ver también:**
  - [Options - `watch`](/api/options-state.html#watch)
  - [Guía - Watchers](/guide/essentials/watchers.html)

## $emit()

Activa un evento personalizado en la instancia actual. Cualquier arguemnto adicional será pasado dentro de la función callback del que escucha el evento.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **Ejemplo**

  ```js
  export default {
    created() {
      // solo el evento
      this.$emit('foo')
      // con argumentos adicionales
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **Ver también:**

  - [Componentes - Eventos](/guide/components/events.html)
  - [`emits` option](./options-state.html#emits)

## $forceUpdate()

Fuerza a la instancia del componente a re-renderizarse.

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **Detalles**

  Esto debería ser raramente necesario dado el sistema de reactividad completamente automático de Vue. Los únicos casos en los que se puede necesitar es cuando se ha creado explícitamente un estado de componente no reactivo utilizando APIs de reactividad avanzadas.

## $nextTick()

Versión vinculada a la instancia del componente del global [`nextTick()`](./general.html#nexttick).

- **Tipo**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **Detalles**

  La única diferencia con la versión global de `nextTick()` es que el callback pasado a `this.$nextTick()` tendrá su contexto de `this` vinculado con la instancia actual del componente.

- **Ver también:** [`nextTick()`](./general.html#nexttick)
