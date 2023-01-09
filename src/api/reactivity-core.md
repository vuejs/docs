# Reactividad: Núcleo (Core) {#reactividad-nucleo-core}

:::info Véase también
Para comprender mejor las API de Reactividad, se recomienda leer los siguientes capítulos de la guía:

- [Fundamentos de Reactividad](/guide/essentials/reactivity-fundamentals.html) (con la preferencia de API establecida en Composition API)
- [Reactividad en Profundidad](/guide/extras/reactivity-in-depth.html)
  :::

## ref() {#ref}

Toma un valor interno y devuelve un objeto ref reactivo y mutable, que tiene una sola propiedad `.value` que apunta al valor interno.

- **Tipo**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **Detalles**

  El objeto ref es mutable, es decir, puedes asignar nuevos valores a `.value`. También es reactivo, es decir, se rastrea cualquier operación de lectura a `.value`, y las operaciones de escritura activarán los efectos asociados.

  Si se asigna un objeto como valor de una ref, el objeto se vuelve profundamente reactivo con [reactive()](#reactive). Esto también significa que si el objeto contiene refs anidadas, se desenvolverán profundamente.

  Para evitar la conversión profunda, utilice [`shallowRef()`](./reactivity-advanced.html#shallowref) en su lugar.

- **Ejemplo**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value++
  console.log(count.value) // 1
  ```

- **Véase también:**
  - [Guía - Variables Reactivas con `ref()`](/guide/essentials/reactivity-fundamentals.html#variables-reactivas-con-ref)
  - [Guía - Escritura de `ref()`](/guide/typescript/composition-api.html#escritura-de-ref)

## computed() {#computed}

Toma una función getter y devuelve un objeto [ref](#ref) reactivo de solo lectura para el valor devuelto por el getter. También puede tomar un objeto con funciones `get` y `set` para crear un objeto ref escribible.

- **Tipo**

  ```ts
  // solo lectura
  function computed<T>(
    getter: () => T,
    // véase el enlace "Depuración de Computed" más abajo
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // escribible
  function computed<T>(
    options: {
      get: () => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **Ejemplo**

  Creando una ref calculada de solo lectura:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // error
  ```

  Creando una ref calculada escribible:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  Depuración:

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **Véase también:**
  - [Guía - Propiedades Computadas](/guide/essentials/computed.html)
  - [Guía - Depuración Computada](/guide/extras/reactivity-in-depth.html#depuracion-computada)
  - [Guía - Escritura de `computed()`](/guide/typescript/composition-api.html#escritura-de-computed)

## reactive() {#reactive}

Devuelve un proxy reactivo del objeto.

- **Tipo**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **Detalles**

  La conversión reactiva es "profunda": afecta a todas las propiedades anidadas. Un objeto reactivo también desenvuelve profundamente cualquier propiedad que sea [refs](#ref) mientras mantiene la reactividad.

  También se debe tener en cuenta que no se desenvuelve la ref cuando se accede a la ref como un elemento de un array reactivo o de un tipo de colección nativa como `Map`.

  Para evitar la conversión profunda y solo retener la reactividad en el nivel raíz, utiliza en su lugar [shallowReactive()](./reactivity-advanced.html#shallowreactive).

  El objeto devuelto y sus objetos anidados están envueltos con [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) y **no** son iguales a los objetos originales. Se recomienda trabajar exclusivamente con el proxy reactivo y evitar depender del objeto original.

- **Ejemplo**

  Creando un objeto reactivo:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  Desenvolvimiento de la ref:

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // ref será desenvuelto
  console.log(obj.count === count.value) // true

  // se actualizará `obj.count`
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // también actualizará la ref `count`.
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  Tenga en cuenta que las refs **no** se desenvuelven cuando se accede a ellas como elementos de un array o de una colección:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // se necesita .value aquí
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // se necesita .value aquí
  console.log(map.get('count').value)
  ```

  Al asignar una [ref](#ref) a una propiedad `reactive`, esa ref también se desenvolverá automáticamente:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **Véase también:**
  - [Guía - Fundamentos de Reactividad](/guide/essentials/reactivity-fundamentals.html)
  - [Guía - Escritura de `reactive()`](/guide/typescript/composition-api.html#escritura-de-reactive)

## readonly() {#readonly}

Toma un objeto (reactivo o simple) o una [ref](#ref) y devuelve un proxy de solo lectura del original.

- **Tipo**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **Detalles**

  Un proxy de solo lectura es profundo: cualquier propiedad anidada a la que se acceda también será de solo lectura. También tiene el mismo comportamiento de desenvolvimiento de refs que `reactive()`, excepto que los valores desenvueltos también se convertirán en solo lectura.

  Para evitar la conversión profunda, utiliza en su lugar [shallowReadonly()](./reactivity-advanced.html#shallowreadonly).

- **Ejemplo**

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // funciona para el seguimiento de la reactividad
    console.log(copy.count)
  })

  // La mutación del original activará los watchers que dependen de la copia
  original.count++

  // La mutación de la copia fallará y dará lugar a una advertencia
  copy.count++ // advertencia!
  ```

## watchEffect() {#watcheffect}

Ejecuta una función inmediatamente mientras realiza un seguimiento reactivo de sus dependencias y la vuelve a ejecutar cada vez que las dependencias cambian.

- **Tipo**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): StopHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // por defecto: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Detalles**

  El primer argumento es la función de efecto que se ejecutará. La función de efecto recibe una función que se puede usar para registrar una devolución de llamada de limpieza. La devolución de llamada de limpieza se llamará justo antes de la próxima vez que se vuelva a ejecutar el efecto, y se puede usar para limpiar los efectos secundarios invalidados, por ejemplo, una petición asincrónica pendiente (ver ejemplo abajo).

  El segundo argumento es un objeto de opciones opcional que se puede usar para ajustar el tiempo de descarga del efecto o para depurar las dependencias del efecto.

  De forma predeterminada, los watchers se ejecutarán justo antes de la renderización del componente. Configurando `flush: 'post'` el watcher se aplazará hasta después de la renderización del componente. Consulta [Temporización del Flujo del Callback](/guide/essentials/watchers.html#temporizacion-del-flujo-del-callback) para obtener más información. En casos excepcionales, podría ser necesario activar un watcher inmediatamente cuando cambia una dependencia reactiva, por ejemplo, para invalidar un caché. Esto se puede lograr usando `flush: 'sync'`. Sin embargo, esta configuración debe usarse con precaución, ya que puede provocar problemas con el rendimiento y la consistencia de los datos si se actualizan varias propiedades al mismo tiempo.

  El valor devuelto es una función de control que se puede llamar para evitar que el efecto se ejecute de nuevo.

- **Ejemplo**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> logs 0

  count.value++
  // -> logs 1
  ```

  Limpieza de efectos secundarios:

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value)
    // Se llamará a `cancel` si cambia `id`
    // de modo que la solicitud pendiente anterior se cancelará
    // si aún no se ha completado
    onCleanup(cancel)
    data.value = await response
  })
  ```

  Deteniendo el watcher:

  ```js
  const stop = watchEffect(() => {})

  // cuando el watcher ya no es necesario:
  stop()
  ```

  Opciones:

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **Véase también**:
  - [Guía - Watchers](/guide/essentials/watchers.html#watcheffect)
  - [Guía - Depuración del Watcher](/guide/extras/reactivity-in-depth.html#depuracion-del-watcher)

## watchPostEffect() {#watchposteffect}

Alias de [`watchEffect()`](#watcheffect) con la opción `flush: 'post'`.

## watchSyncEffect() {#watchsynceffect}

Alias de [`watchEffect()`](#watcheffect) con la opción `flush: 'sync'`.

## watch() {#watch}

Observa una o más fuentes de datos reactivas e invoca una función de devolución de llamada cuando las fuentes cambian.

- **Tipo**

  ```ts
  // observando una sola fuente
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): StopHandle

  // observando multiples fuentes
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): StopHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // ref
    | (() => T) // getter
    | T extends object
    ? T
    : never // objeto reactivo

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // por defecto: false
    deep?: boolean // por defecto: false
    flush?: 'pre' | 'post' | 'sync' // por defecto: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > Los tipos se han simplificado para facilitar la lectura.

- **Detalles**

  `watch()` es perezoso por defecto, es decir, la devolución de llamada solo se llama cuando la fuente observada ha cambiado.

  El primer argumento es la **fuente** del watcher. La fuente puede ser una de las siguientes:

  - Una función getter que devuelve un valor
  - Una ref
  - Un objeto reactivo
  - ... o un array de los anteriores.

  El segundo argumento es la devolución de llamada que se llamará cuando la fuente cambie. La devolución de llamada recibe tres argumentos: el nuevo valor, el antiguo valor y una función para registrar una devolución de llamada de limpieza de efectos secundarios. La devolución de llamada de limpieza se llamará justo antes de la próxima vez que se vuelva a ejecutar el efecto, y se puede usar para limpiar los efectos secundarios invalidados, por ejemplo, una petición asíncrona pendiente.

  Cuando se observan múltiples fuentes, la devolución de llamada recibe dos arreglos que contienen los valores nuevos/antiguos correspondientes al array de origen.

  El tercer argumento opcional es un objeto de opciones que admite las siguientes opciones:

  - **`immediate`**: activa la devolución de llamada inmediatamente después de la creación del watcher. El valor antiguo será `undefined` en la primera llamada.
  - **`deep`**: fuerza el recorrido profundo de la fuente si es un objeto, de modo que la devolución de llamada se dispare en mutaciones profundas. Vea [Watchers Profundos](/guide/essentials/watchers.html#watchers-profundos).
  - **`flush`**: ajusta el tiempo de descarga de la devolución de llamada. Vea [Temporización del Flujo del Callback](/guide/essentials/watchers.html#temporizacion-del-flujo-del-callback) y [`watchEffect()`](/api/reactivity-core.html#watcheffect).
  - **`onTrack / onTrigger`**: depura las dependencias del watcher. Vea [Depuración del Watcher](/guide/extras/reactivity-in-depth.html#depuracion-del-watcher).

  Comparado con [`watchEffect()`](#watcheffect), `watch()` nos permite:

  - Realizar el efecto secundario de forma perezosa;
  - Ser más específico sobre qué estado debe hacer que el watcher se vuelva a ejecutar;
  - Acceder tanto al valor anterior como al actual del estado observado.

- **Ejemplo**

  Observando un getter:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  Observando una ref:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  Al observar múltiples fuentes, la devolución de llamada recibe arreglos que contienen valores nuevos/antiguos correspondientes al array de origen:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  Cuando se utiliza una fuente getter, el watcher solo se activa si el valor de retorno del getter ha cambiado. Si deseas que la devolución de llamada se active incluso en mutaciones profundas, debes obligar explícitamente al watcher a entrar en modo profundo con `{ deep: true }`. Ten en cuenta que en el modo profundo, el nuevo valor y el antiguo valor serán el mismo objeto si la devolución de llamada se desencadenó por una mutación profunda:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  Cuando se observa directamente un objeto reactivo, el watcher está automáticamente en modo profundo:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* desencadena una mutación profunda al estado */
  })
  ```

  `watch()` comparte las mismas opciones de sincronización y depuración con [`watchEffect()`](#watcheffect):

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

  Detener el watcher:

  ```js
  const stop = watch(source, callback)
  // cuando el watcher ya no es necesario:
  stop()
  ```

  Limpieza de efectos secundarios:

  ```js
  watch(id, async (newId, oldId, onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel` será llamado si `id` cambia, cancelando
    // la petición anterior si aún no se ha completado
    onCleanup(cancel)
    data.value = await response
  })
  ```

- **Véase también**:

  - [Guía - Watchers](/guide/essentials/watchers.html)
  - [Guía - Depuración del Watcher](/guide/extras/reactivity-in-depth.html#depuracion-del-watcher)
