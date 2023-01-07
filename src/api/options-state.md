# Opciones: Estado

## data

Una función que devuelve el estado reactivo inicial para la instancia del componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  ```

- **Detalles**

  Se espera que la función devuelva un objeto JavaScript plano, que será convertido en reactivo por Vue. Una vez creada la instancia, se puede acceder al objeto de datos reactivo como `this.$data`. La instancia del componente también hace de proxy de todas las propiedades que se encuentran en el objeto de datos, por lo que `this.a` será equivalente a `this.$data.a`.

  Todas las propiedades de nivel superior de los datos deben incluirse en el objeto de datos devuelto. Añadir nuevas propiedades a `this.$data` es posible, pero **no** es recomendable. Si el valor deseado de una propiedad aún no está disponible, se debe incluir un valor vacío como `undefined` o `null` como marcador de posición para asegurar que Vue sabe que la propiedad existe.

  Las propiedades que comienzan con `_` o `$` **no** funcionarán como proxy en la instancia del componente porque pueden entrar en conflicto con las propiedades internas de Vue y los métodos de la API. Tendrás que acceder a ellas como `this.$data._property`.

  **No** es recomendable devolver objetos con su propio comportamiento de estado como los objetos de la API del navegador y las propiedades del prototipo. El objeto devuelto debería ser idealmente un objeto simple que sólo represente el estado del componente.

- **Ejemplo**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    created() {
      console.log(this.a) // 1
      console.log(this.$data) // { a: 1 }
    }
  }
  ```

  Ten en cuenta que si utilizas una función de flecha con la propiedad `data`, `this` no será la instancia del componente, pero todavía puedes acceder a la instancia como primer argumento de la función:

  ```js
  data: (vm) => ({ a: vm.myProp })
  ```

- **Ver también:** [Reactividad en profundidad](/guide/extras/reactivity-in-depth.html)

## props

Declarar las propiedades de un componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    props?: ArrayPropsOptions | ObjectPropsOptions
  }

  type ArrayPropsOptions = string[]

  type ObjectPropsOptions = { [key: string]: Prop }

  type Prop<T = any> = PropOptions<T> | PropType<T> | null

  interface PropOptions<T> {
    type?: PropType<T>
    required?: boolean
    default?: T | ((rawProps: object) => T)
    validator?: (value: unknown) => boolean
  }

  type PropType<T> = { new (): T } | { new (): T }[]
  ```

  > Los tipos se han simplificado para facilitar la lectura.

- **Detalles**

  En Vue, todos los componentes deben ser declarados explícitamente. Los componentes props pueden ser declarados de dos formas:

  - De forma simple usando un array de cadenas
  - De forma completa usando un objeto donde cada clave de propiedad es el nombre de la prop, y el valor es el tipo de la prop (una función constructora) u opciones avanzadas.

  Con la sintaxis basada en objetos, cada propiedad puede definir las siguientes opciones:

  - **`type`**: Puede ser uno de los siguientes constructores nativos: `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`, cualquier función constructora personalizada o un array de ellas. En el modo de desarrollo, Vue comprobará si el valor de una propiedad coincide con el tipo declarado, y lanzará una advertencia si no es así. Ver [Validación de Propiedades](/guide/components/props.html#prop-validation) para más detalles.

    También tenga en cuenta que una propiedad con tipo `Boolean` afecta a su comportamiento debido a la transformación del valor tanto en desarrollo como en producción. Vea la [Asignación de Booleanos](/guide/components/props.html#boolean-casting) para más detalles.

  - **`default`**: Especifica un valor por defecto para la propiedad cuando no es pasada por el padre o tiene un valor `indefinido`. Los valores por defecto de los objetos o arrays deben ser devueltos usando una función de fábrica. La función de fábrica también recibe el objeto props en bruto como argumento.

  - **`required`**: Define si la propiedad es necesaria. En un entorno que no sea de producción, se lanzará una advertencia de la consola si este valor es verdadero y no se pasa la propiedad.

  - **`validator`**: Función de validación personalizada que toma el valor de la propiedad como único argumento. En el modo de desarrollo, se lanzará una advertencia de consola si esta función devuelve un valor falso (es decir, la validación falla).

- **Ejemplo**

  Declaración simple:

  ```js
  export default {
    props: ['size', 'myMessage']
  }
  ```

  Declaración de objeto con validaciones:

  ```js
  export default {
    props: {
      // chequeo del tipo
      height: Number,
      // chequeo del tipo y validaciones adicionales
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
          return value >= 0
        }
      }
    }
  }
  ```

- **Ver también:** [Propiedades](/guide/components/props.html)

## computed

Declara las propiedades computadas que se expondrán en la instancia del componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    computed?: {
      [key: string]: ComputedGetter<any> | WritableComputedOptions<any>
    }
  }

  type ComputedGetter<T> = (
    this: ComponentPublicInstance,
    vm: ComponentPublicInstance
  ) => T

  type ComputedSetter<T> = (
    this: ComponentPublicInstance,
    value: T
  ) => void

  type WritableComputedOptions<T> = {
    get: ComputedGetter<T>
    set: ComputedSetter<T>
  }
  ```

- **Detalles**

  La opción acepta un objeto en el que la clave es el nombre de la propiedad computada, y el valor es un getter computado, o un objeto con métodos `get` y `set` (para propiedades computadas escribibles).

  Todos los getters y setters tienen su contexto `this` automáticamente ligado a la instancia del componente.

  Ten en cuenta que si utilizas una función de flecha con una propiedad computada, `this` no apuntará a la instancia del componente, pero aún puedes acceder a la instancia como primer argumento de la función:

  ```js
  export default {
    computed: {
      aDouble: (vm) => vm.a * 2
    }
  }
  ```

- **Ejemplo**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    computed: {
      // solo lectura
      aDouble() {
        return this.a * 2
      },
      // escribible
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    },
    created() {
      console.log(this.aDouble) // => 2
      console.log(this.aPlus) // => 2

      this.aPlus = 3
      console.log(this.a) // => 2
      console.log(this.aDouble) // => 4
    }
  }
  ```

- **Ver también:** [Computed Properties](/guide/essentials/computed.html)

## methods

Declara los métodos que se mezclan en la instancia del componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  ```

- **Detalles**

  Se puede acceder a los métodos declarados directamente en la instancia del componente, o utilizarlos en expresiones de plantillas. Todos los métodos tienen su contexto `this` automáticamente ligado a la instancia del componente, incluso cuando son pasados a otras funciones.

  Evite usar funciones de flecha cuando declare métodos, ya que no tendrán acceso a la instancia del componente a través de `this`.

- **Ejemplo**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    },
    created() {
      this.plus()
      console.log(this.a) // => 2
    }
  }
  ```

- **Ver también:** [Manejo de Eventos](/guide/essentials/event-handling.html)

## watch

Declara funciones de vigilancia que se invocan cuando cambian los datos.

- **Tipo**

  ```ts
  interface ComponentOptions {
    watch?: {
      [key: string]: WatchOptionItem | WatchOptionItem[]
    }
  }

  type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type ObjectWatchOptionItem = {
    handler: WatchCallback | string
    immediate?: boolean // valor por defecto: false
    deep?: boolean // valor por defecto: false
    flush?: 'pre' | 'post' | 'sync' // valor por defecto: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > Los tipos se han simplificado para facilitar la lectura.

- **Detalles**

  La opción `watch` espera un objeto donde las claves son las propiedades de la instancia del componente reactivo a vigilar (por ejemplo, las propiedades declaradas a través de `data` o `computed`) - y los valores son las correspondientes devoluciones de llamada. La devolución de llamada recibe el nuevo valor y el valor antiguo de la fuente vigilada.

  Además de una propiedad a nivel de raíz, la clave también puede ser una simple ruta delimitada por puntos, por ejemplo `a.b.c`. Tenga en cuenta que este uso **no** admite expresiones complejas, sólo admite rutas delimitadas por puntos. Si necesita vigilar fuentes de datos complejas, utilice en su lugar la API imperativa de [`$watch()`](/api/component-instance.html#watch).

  El valor también puede ser una cadena con el nombre de un método (declarado mediante `methods`), o un objeto que contenga opciones adicionales. Si se utiliza la sintaxis de objeto, la llamada de retorno debe declararse en el campo `handler`. Las opciones adicionales incluyen:

  - **`immediate`**: activa la llamada de retorno inmediatamente después de la creación del observador. El valor antiguo será `undefined` en la primera llamada.
  - **`deep`**: forza el recorrido profundo de la fuente si es un objeto o un array, para que la llamada de retorno se dispare en las mutaciones profundas. Ver [Watchers Profundos](/guide/essentials/watchers.html#watchers-profundos).
  - **`flush`**: ajusta el tiempo de sincronización de la llamada de retorno. Ver [Temporización del Flujo del Callback](/guide/essentials/watchers.html#temporizacion-del-flujo-del-callback) y [`watchEffect()`](/api/reactivity-core.html#watcheffect).
  - **`onTrack / onTrigger`**: depura las dependencias del observador. Ver [Depuración del Watcher](/guide/extras/reactivity-in-depth.html#depuracion-del-watcher).

- **Ejemplo**

  ```js
  export default {
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 5,
        f: 6
      }
    },
    watch: {
      // vigilando una propiedad de nivel superior
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // cadena con el nombre del método
      b: 'someMethod',
      // la llamada de retorno será llamada cada vez que cualquiera de las propiedades del objeto vigilado cambie, independientemente de su profundidad anidada
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // observando una única propiedad anidada:
      'c.d': function (val, oldVal) {
        // hacer algo
      },
      // el callback será llamado inmediatamente después del inicio de la observación
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // puedes pasar un array de callbacks, serán llamados uno a uno
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    },
    created() {
      this.a = 3 // => nuevo: 3, anterior: 1
    }
  }
  ```

- **Ver también:** [Watchers](/guide/essentials/watchers.html)

## emits

Declara los eventos personalizados emitidos por el componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  ```

- **Detalles**

  Los eventos emitidos pueden declararse de dos formas:

  - De forma simple utilizando un arreglo de cadenas
  - De forma completa utilizando un objeto donde cada propiedad clave es el nombre del evento, y el valor es `null` o una función de validación.

  La función de validación recibirá los argumentos adicionales pasados a la llamada `$emit` del componente. Por ejemplo, si se llama a `this.$emit('foo', 1)`, el validador correspondiente para `foo` recibirá el argumento `1`. La función validadora debería devolver un booleano para indicar si los argumentos del evento son válidos.

  Tenga en cuenta que la opción `emits` afecta a los oyentes de eventos que se consideran oyentes de eventos del componente, en lugar de oyentes de eventos nativos del DOM. Los oyentes de los eventos declarados se eliminarán del objeto `$attrs` del componente, por lo que no se pasarán al elemento raíz del componente. Consulte [Atributos Fallthrough](/guide/components/attrs.html) para más detalles.

- **Ejemplo**

  Sintaxis del arreglo de cadenas de text:

  ```js
  export default {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  }
  ```

  Sintaxis de objecto:

  ```js
  export default {
    emits: {
      // sin validación
      click: null,

      // con validación
      submit: (payload) => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  }
  ```

* **Ver también:** [Attributos Fallthrough](/guide/components/attrs.html)

## expose

Declara las propiedades públicas expuestas cuando la instancia del componente es accedida por un padre a través de las referencias de la plantilla.

- **Tipo**

  ```ts
  interface ComponentOptions {
    expose?: string[]
  }
  ```

- **Detalles**

  Por defecto, una instancia de componente expone todas las propiedades de la instancia al padre cuando se accede a través de `$parent`, `$root`, o refs de plantilla. Esto puede ser indeseable, ya que un componente probablemente tiene estado interno o métodos que deben mantenerse privados para evitar un acoplamiento estrecho.

  La opción `expose` espera una lista de cadenas de nombres de propiedades. Cuando se utiliza `expose`, sólo las propiedades explícitamente listadas serán expuestas en la instancia pública del componente.

  La opción `expose` sólo afecta a las propiedades definidas por el usuario, no filtra las propiedades incorporadas en la instancia del componente.

- **Ejemplo**

  ```js
  export default {
    // solamente `publicMethod` estará disponible en la instancia pública
    expose: ['publicMethod'],
    methods: {
      publicMethod() {
        // ...
      },
      privateMethod() {
        // ...
      }
    }
  }
  ```
