# Reactividad: Avanzado

## shallowRef()

Versión poco profunda de [`ref()`](./reactivity-core.html#ref).

- **Tipo**

  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```

- **Detalles**

  A diferencia de `ref()`, el valor interno de una ref poco profunda se almacena y se expone tal cual, y no se volverá profundamente reactivo. Solo el acceso a `.value` es reactivo.

  `shallowRef()` se usa normalmente para optimizar el rendimiento de grandes estructuras de datos, o para la integración con sistemas externos de gestión de estados.

- **Ejemplo**

  ```js
  const state = shallowRef({ count: 1 })

  // NO activa el cambio
  state.value.count = 2

  // activa el cambio
  state.value = { count: 2 }
  ```

- **Véase también**
  - [Guía - Reducción de la Sobrecarga de Reactividad en Estructuras Inmutables de Gran Tamaño](/guide/best-practices/performance.html#reduccion-de-la-sobrecarga-de-reactividad-en-estructuras-inmutables-de-gran-tamano)
  - [Guía - Integración con los Sistemas de Estado Externos](/guide/extras/reactivity-in-depth.html#integracion-con-los-sistemas-de-estado-externos)

## triggerRef()

Forzar la activación de los efectos que depende de una [ref poco profunda](#shallowref). Esto se usa típicamente después de hacer mutaciones profundas en el valor interno de una ref poco profunda.

- **Tipo**

  ```ts
  function triggerRef(ref: ShallowRef): void
  ```

- **Ejemplo**

  ```js
  const shallow = shallowRef({
    greet: 'Hola, mundo'
  })

  // Muestra "Hola, mundo" una vez para la primera ejecución
  watchEffect(() => {
    console.log(shallow.value.greet)
  })

  // Esto no activará el efecto porque la ref es poco profunda
  shallow.value.greet = 'Hola, universo'

  // Muestra "Hola, universo"
  triggerRef(shallow)
  ```

## customRef()

Crea una ref personalizada con control explícito sobre el seguimiento de sus dependencias y la activación de actualizaciones.

- **Tipo**

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  type CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

- **Detalles**

  `customRef()` espera una función de fábrica, que recibe las funciones `track` y `trigger` como argumentos y debe devolver un objeto con los métodos `get` y `set`.

  En general, `track()` debe llamarse dentro de `get()`, y `trigger()` debe llamarse dentro de `set()`. Sin embargo, tú tienes el control total sobre cuándo deben llamarse, o si deben llamarse en definitiva.

- **Ejemplo**

  Creando una ref que solo actualiza el valor después de un determinado tiempo de espera tras la última llamada establecida:

  ```js
  import { customRef } from 'vue'

  export function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  ```

  Uso en el componente:

  ```vue
  <script setup>
  import { useDebouncedRef } from './debouncedRef'
  const text = useDebouncedRef('hola')
  </script>

  <template>
    <input v-model="text" />
  </template>
  ```

  [Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZURlYm91bmNlZFJlZiB9IGZyb20gJy4vZGVib3VuY2VkUmVmLmpzJ1xuY29uc3QgdGV4dCA9IHVzZURlYm91bmNlZFJlZignaGVsbG8nLCAxMDAwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+XG4gICAgVGhpcyB0ZXh0IG9ubHkgdXBkYXRlcyAxIHNlY29uZCBhZnRlciB5b3UndmUgc3RvcHBlZCB0eXBpbmc6XG4gIDwvcD5cbiAgPHA+e3sgdGV4dCB9fTwvcD5cbiAgPGlucHV0IHYtbW9kZWw9XCJ0ZXh0XCIgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsImRlYm91bmNlZFJlZi5qcyI6ImltcG9ydCB7IGN1c3RvbVJlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZURlYm91bmNlZFJlZih2YWx1ZSwgZGVsYXkgPSAyMDApIHtcbiAgbGV0IHRpbWVvdXRcbiAgcmV0dXJuIGN1c3RvbVJlZigodHJhY2ssIHRyaWdnZXIpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0KCkge1xuICAgICAgICB0cmFjaygpXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgfSxcbiAgICAgIHNldChuZXdWYWx1ZSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gbmV3VmFsdWVcbiAgICAgICAgICB0cmlnZ2VyKClcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgICB9XG4gICAgfVxuICB9KVxufSJ9)

## shallowReactive()

Versión poco profunda de [`reactive()`](./reactivity-core.html#reactive).

- **Tipo**

  ```ts
  function shallowReactive<T extends object>(target: T): T
  ```

- **Detalles**

  A diferencia de `reactive()`, no hay una conversión profunda: solo las propiedades del nivel raíz son reactivas para un objeto reactivo poco profundo. Los valores de propiedad se almacenan y exponen tal cual; esto también significa que las propiedades con valores ref **no** se desenvolverán automáticamente.

  :::warning Úsalo con precaución
  Las estructuras de datos poco profundas solo deben usarse para el estado del nivel raíz en un componente. Evita anidarlos dentro de un objeto reactivo profundo, ya que crea un árbol con un comportamiento de reactividad inconsistente que puede ser difícil de entender y depurar.
  :::

- **Ejemplo**

  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // La mutación de las propiedades del estado es reactiva
  state.foo++

  // ...pero no convierte los objetos anidados
  isReactive(state.nested) // false

  // NO reactivo
  state.nested.bar++
  ```

## shallowReadonly()

Versión poco profunda de [`readonly()`](./reactivity-core.html#readonly).

- **Tipo**

  ```ts
  function shallowReadonly<T extends object>(target: T): Readonly<T>
  ```

- **Detalles**

  A diferencia de `readonly()`, no hay una conversión profunda: solo las propiedades del nivel raíz se hacen de solo lectura. Los valores de propiedad se almacenan y exponen tal cual; esto también significa que las propiedades con valores de ref **no** se desenvolverán automáticamente.

  :::warning Úsalo con precaución
  Las estructuras de datos poco profundas solo deben usarse para el estado del nivel raíz en un componente. Evita anidarlos dentro de un objeto reactivo profundo, ya que crea un árbol con un comportamiento de reactividad inconsistente que puede ser difícil de entender y depurar.
  :::

- **Ejemplo**

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // La mutación de las propiedades propias del estado fallará
  state.foo++

  // ...pero funciona con objetos anidados
  isReadonly(state.nested) // false

  // funciona
  state.nested.bar++
  ```

## toRaw()

Devuelve el objeto original de un proxy creado por Vue.

- **Tipo**

  ```ts
  function toRaw<T>(proxy: T): T
  ```

- **Detalles**

  `toRaw()` puede devolver el objeto original de los proxies creados por [`reactive()`](./reactivity-core.html#reactive), [`readonly()`](./reactivity-core.html#readonly), [`shallowReactive()`](#shallowreactive) o [`shallowReadonly()`](#shallowreadonly).

  Esta es una vía de escape que puede utilizarse para leer temporalmente sin incurrir en la sobrecarga de acceso/seguimiento del proxy, o escribir sin desencadenar cambios. **No** se recomienda mantener una referencia persistente al objeto original. Utilízalo con precaución.

- **Ejemplo**

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo) // true
  ```

## markRaw()

Marca un objeto para que nunca se convierta en un proxy. Devuelve el objeto mismo.

- **Tipo**

  ```ts
  function markRaw<T extends object>(value: T): T
  ```

- **Ejemplo**

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false

  // también funciona cuando se anida dentro de otros objetos reactivos
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

  :::warning Úsalo con precaución
  `markRaw()` y las API poco profundas como `shallowReactive()` te permiten optar por la conversión profunda reactiva/solo lectura por defecto e incrustar objetos sin procesar, sin proxy, en tu gráfico de estado. Se pueden utilizar por varias razones:

  - Algunos valores simplemente no deben volverse reactivos, por ejemplo, una instancia de clase compleja de terceros, o un objeto de componente de Vue.

  - Omitir la conversión de proxy puede proporcionar mejoras de rendimiento al representar listas grandes con fuentes de datos inmutables.

  Se consideran avanzados porque la omisión del proxy es sólo a nivel de raíz, por lo que si se establece un objeto raw anidado y no marcado en un objeto reactivo y luego accedes a él nuevamente, obtienes la versión de proxy. Esto puede conducir a **riesgos de identidad**, es decir, realizar una operación que depende de la identidad del objeto, pero utilizando tanto la versión raw como la versión proxy del mismo objeto:

  ```js
  const foo = markRaw({
    nested: {}
  })

  const bar = reactive({
    // aunque `foo` esté marcado como raw, foo.nested no lo está.
    nested: foo.nested
  })

  console.log(foo.nested === bar.nested) // false
  ```

  Los riesgos de identidad son generalmente raros. Sin embargo, para utilizar correctamente estas API y evitar riesgos de identidad de manera segura, se requiere una comprensión sólida de cómo funciona el sistema de reactividad.

  :::

## effectScope()

Crea un objeto de ámbito de efecto que puede capturar los efectos reactivos (es decir, computed y watchers) creados dentro de él para que estos efectos puedan eliminarse juntos. Para conocer los casos de uso detallados de esta API, consulta su correspondiente [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md).

- **Tipo**

  ```ts
  function effectScope(detached?: boolean): EffectScope

  interface EffectScope {
    run<T>(fn: () => T): T | undefined // undefined si el ámbito está inactivo
    stop(): void
  }
  ```

- **Ejemplo**

  ```js
  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)

    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))
  })

  // para eliminar todos los efectos en el ámbito
  scope.stop()
  ```

## getCurrentScope()

Devuelve el [ámbito de efectos](#effectscope) activo actual, si lo hay.

- **Tipo**

  ```ts
  function getCurrentScope(): EffectScope | undefined
  ```

## onScopeDispose()

Registra una devolución de llamada de eliminación en el [ámbito de efectos](#effectscope) activo actual. La devolución de llamada se invocará cuando se detenga el ámbito de efectos asociado.

Este método se puede usar como un reemplazo no acoplado a componentes de `onUnmounted` en funciones de composición reutilizables, ya que la función `setup()` de cada componente de Vue también se invoca en un ámbito de efectos.

- **Tipo**

  ```ts
  function onScopeDispose(fn: () => void): void
  ```
