# Reactividad: Utilidades

## isRef()

Comprueba si un valor es un objeto ref.

- **Tipo**

  ```ts
  function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
  ```

  Ten en cuenta que el tipo de retorno es un [predicado de tipo](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates), lo que significa que `isRef` puede ser utilizado como un protector de tipo:

  ```ts
  let foo: unknown
  if (isRef(foo)) {
    // El tipo de foo se reduce a Ref<unknown>
    foo.value
  }
  ```

## unref()

Devuelve el valor interno si el argumento es una ref, de lo contrario devuelve el argumento en sí. Esta es una función de azúcar sintáctica para `val = isRef(val) ? val.value : val`.

- **Tipo**

  ```ts
  function unref<T>(ref: T | Ref<T>): T
  ```

- **Ejemplo**

  ```ts
  function useFoo(x: number | Ref<number>) {
    const unwrapped = unref(x)
    // unwrapped se garantiza que será ahora number
  }
  ```

## toRef()

Se puede utilizar para crear una ref para una propiedad en un objeto reactivo de origen. La ref creada se sincroniza con su propiedad de origen: al mutar la propiedad de origen se actualizará la ref y viceversa.

- **Tipo**

  ```ts
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```

- **Ejemplo**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const fooRef = toRef(state, 'foo')

  // la mutación de la ref actualiza el original
  fooRef.value++
  console.log(state.foo) // 2

  // al mutar el original también se actualiza la ref
  state.foo++
  console.log(fooRef.value) // 3
  ```

  Ten en cuenta que esto es diferente de:

  ```js
  const fooRef = ref(state.foo)
  ```

  La ref anterior **no** está sincronizada con `state.foo`, porque `ref()` recibe un valor numérico simple.

  `toRef()` es útil cuando deseas pasar la ref de una prop a una función composable:

  ```vue
  <script setup>
  import { toRef } from 'vue'

  const props = defineProps(/* ... */)

  // convertir `props.foo` en una ref, y luego pasarla a
  // una composable
  useSomeFeature(toRef(props, 'foo'))
  </script>
  ```

  Cuando `toRef` se usa con props de componentes, se siguen aplicando las restricciones habituales sobre la mutación de las props. Intentar asignar un nuevo valor a la ref es equivalente a intentar modificar la prop directamente y no está permitido. En ese escenario, puedes considerar el uso de [`computed`](./reactivity-core.html#computed) con `get` y `set` en su lugar. Consulta la guía para [usar `v-model` con componentes](/guide/components/events.html#uso-con-v-model) para más información.

  `toRef()` devolverá una ref utilizable incluso si la propiedad de origen no existe actualmente. Esto hace posible trabajar con propiedades opcionales, que no serían recogidas por [`toRefs`](#torefs).

## toRefs()

Convierte un objeto reactivo en un objeto simple donde cada propiedad del objeto resultante es una ref que apunta a la propiedad correspondiente del objeto original. Cada ref individual se crea utilizando [`toRef()`](#toref).

- **Tipo**

  ```ts
  function toRefs<T extends object>(
    object: T
  ): {
    [K in keyof T]: ToRef<T[K]>
  }

  type ToRef = T extends Ref ? T : Ref<T>
  ```

- **Ejemplo**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const stateAsRefs = toRefs(state)
  /*
  Tipos de stateAsRefs: {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */

  // La ref y la propiedad original están "vinculadas"
  state.foo++
  console.log(stateAsRefs.foo.value) // 2

  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

  `toRefs` es útil cuando se devuelve un objeto reactivo de una función composable para que el componente consumidor pueda desestructurar/difundir el objeto devuelto sin perder la reactividad:

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    // ...lógica que opera sobre el estado

    // convierte en refs cuando hace el return
    return toRefs(state)
  }

  // puede desestructurarse sin perder la reactividad
  const { foo, bar } = useFeatureX()
  ```

  `toRefs` solo generará refs para las propiedades que se pueden enumerar en el objeto de origen en el momento de la llamada. Para crear una ref para una propiedad que quizás aún no exista, utiliza [`toRef`](#toref) en su lugar.

## isProxy()

Comprueba si un objeto es un proxy creado por [`reactive()`](./reactivity-core.html#reactive), [`readonly()`](./reactivity-core.html#readonly), [`shallowReactive()`](./reactivity-advanced.html#shallowreactive) o [`shallowReadonly()`](./reactivity-advanced.html#shallowreadonly).

- **Tipo**

  ```ts
  function isProxy(value: unknown): boolean
  ```

## isReactive()

Comprueba si un objeto es un proxy creado por [`reactive()`](./reactivity-core.html#reactive) o [`shallowReactive()`](./reactivity-advanced.html#shallowreactive).

- **Tipo**

  ```ts
  function isReactive(value: unknown): boolean
  ```

## isReadonly()

Comprueba si un objeto es un proxy creado por [`readonly()`](./reactivity-core.html#readonly) o [`shallowReadonly()`](./reactivity-advanced.html#shallowreadonly).

- **Tipo**

  ```ts
  function isReadonly(value: unknown): boolean
  ```
