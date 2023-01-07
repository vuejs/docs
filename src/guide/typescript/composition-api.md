# TypeScript con Composition API

> Esta página supone que ya has leído las generalidades en la sección [Usando Vue con TypeScript](./overview).

## Escritura de las Props de Componentes

### Usando `<script setup>`

Cuando se utiliza `<script setup>`, la macro `defineProps()` permite inferir los tipos de props basándose en su argumento:

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

Esto se llama "declaración en tiempo de ejecución", porque el argumento pasado a `defineProps()` se utilizará como la opción `props` en tiempo de ejecución.

Sin embargo, suele ser más cómodo definir props con tipos puros a través de un argumento de tipo genérico:

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

Esto se llama "declaración basada en tipos". El compilador intentará hacer todo lo posible para inferir las opciones en tiempo de ejecución equivalentes basándose en el argumento del tipo. En este caso, nuestro segundo ejemplo compila exactamente con las mismas opciones en tiempo de ejecución que el primer ejemplo.

Puedes usar la declaración basada en tipos O la declaración en tiempo de ejecución, pero no puedes usar ambas al mismo tiempo.

También podemos mover los tipos de las props a una interfaz separada:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

#### Limitaciones de la Sintaxis

Para generar el código correcto en tiempo de ejecución, el argumento genérico para `defineProps()` debe ser uno de los siguientes

- Un tipo de objeto literal:

  ```ts
  defineProps<{
    /*... */
  }>()
  ```

- Una referencia a un tipo de interfaz u objeto literal **en el mismo archivo**:

  ```ts
  interface Props {
    /* ... */
  }

  defineProps<Props>()
  ```

El tipo de interfaz o de objeto literal puede contener referencias a tipos importados de otros archivos, sin embargo, el propio argumento genérico pasado a `defineProps` **no puede** ser un tipo importado:

```ts
import { Props } from './other-file'

// NO soportado
defineProps<Props>()
```

Esto se debe a que los componentes Vue se compilan de forma aislada y el compilador actualmente no rastrea los archivos importados para analizar el tipo de fuente. Esta limitación podría eliminarse en una futura versión.

### Valores por Defecto de las Props />

Al utilizar la declaración basada en tipos, perdemos la capacidad de declarar valores por defecto para los props. Esto puede resolverse con la macro del compilador `withDefaults`:

```ts
export interface Props {
  msg?: string
  labels?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hola',
  labels: () => ['uno', 'dos']
})
```

Esto se compilará con las opciones de las props `default` equivalentes en tiempo de ejecución. Además, el helper `withDefaults` permite realizar comprobaciones de tipo para los valores por defecto, y asegura que el tipo `props` devuelto tiene las banderas opcionales removidas para las propiedades que sí tienen valores por defecto declarados.

Alternativamente, puedes usar la versión actualmente experimental [Transformación de la Reactividad](/guide/extras/reactivity-transform.html):

```vue
<script setup lang="ts">
interface Props {
  name: string
  count?: number
}

// desestructuración reactiva para defineProps()
// el valor por defecto se compila a la opción
// equivalente en tiempo de ejecución
const { name, count = 100 } = defineProps<Props>()
</script>
```

Este comportamiento requiere por el momento [opt-in explícito](/guide/extras/reactivity-transform.html#opt-in-explicito).

### Sin `<script setup>`

Si no usas `<script setup>`, es necesario utilizar `defineComponent()` para habilitar la inferencia del tipo de props. El tipo del objeto props pasado a `setup()` se infiere de la opción `props`.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- tipo: string
  }
})
```

## Escritura de Emits del Componente

En `<script setup>`, la función `emit` también puede ser tipada usando la declaración en tiempo de ejecución O la declaración de tipo:

```vue
<script setup lang="ts">
// tiempo de ejecución
const emit = defineEmits(['change', 'update'])

// basado en el tipo
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

El argumento de tipo debe ser un tipo literal con [Call Signatures](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures). El tipo literal se utilizará como el tipo de la función `emit` devuelta. Como podemos ver, la declaración de tipo nos da un control mucho más fino sobre las restricciones de tipo de los eventos emitidos.

Cuando no usas `<script setup>`, `defineComponent()` es capaz de inferir los eventos permitidos para la función `emit` expuesta en el contexto de setup:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- comprobación de tipo / autocompletado
  }
})
```

## Escritura de `ref()`

Las referencias infieren el tipo a partir del valor inicial:

```ts
import { ref } from 'vue'

// tipo inferido: Ref<number>
const year = ref(2020)

// => Error TS: El tipo 'string' no es asignable al tipo 'number'.
year.value = '2020'
```

A veces podemos necesitar especificar tipos complejos para el valor interno de una ref. Podemos hacerlo utilizando el tipo `Ref`:

```ts
import { ref, Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

O bien, pasando un argumento genérico al llamar a `ref()` para anular la inferencia por defecto:

```ts
// tipo resultante: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

Si se especifica un argumento de tipo genérico pero se omite el valor inicial, el tipo resultante será un tipo de unión que incluye `undefined`:

```ts
// tipo inferido: Ref<number | undefined>
const n = ref<number>()
```

## Escritura de `reactive()`

La función `reactive()` también infiere implícitamente el tipo a partir de su argumento:

```ts
import { reactive } from 'vue'

// tipo inferido: { title: string }
const book = reactive({ title: 'Guía de Vue 3' })
```

Para escribir explícitamente una propiedad `reactiva`, podemos utilizar interfaces:

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Guía de Vue 3' })
```

:::tip
No es recomendable usar el argumento genérico de `reactive()` porque el tipo devuelto, que maneja el desempaquetado de la ref anidada, es diferente del tipo del argumento genérico.
:::

## Escritura de `computed()`

`computed()` infiere su tipo basándose en el valor de retorno del getter:

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// tipo inferido: ComputedRef<number>
const double = computed(() => count.value * 2)

// => Error TS: La propiedad 'split' no existe en el tipo 'number'
const result = double.value.split('')
```

También puede especificar un tipo explícito mediante un argumento genérico:

```ts
const double = computed<number>(() => {
  // error de tipo si esto no devuelve un número
})
```

## Escritura de Manejadores de Eventos

Cuando se trata de eventos nativos del DOM, puede ser útil escribir correctamente el argumento que pasamos al manejador. Veamos este ejemplo:

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` tiene implícitamente el tipo `any`.
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

Sin anotación de tipo, el argumento `event` tendrá implícitamente un tipo `any`. Esto también dará lugar a un error de TS si se utiliza `"strict": true` o `"noImplicitAny": true` en `tsconfig.json`. Por lo tanto, se recomienda indicar explícitamente el argumento de los manejadores de eventos. Además, es posible que tengas que definir explícitamente las propiedades de `event`:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## Escritura de Provide / Inject

Provide e Inject se ejecutan normalmente en componentes separados. Para tipificar adecuadamente los valores inyectados, Vue proporciona una interfaz `InjectionKey`, que es un tipo genérico que extiende `Symbol`. Se puede utilizar para sincronizar el tipo del valor inyectado entre el proveedor y el consumidor:

```ts
import { provide, inject, InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // proporcionar un valor que no sea una cadena dará lugar a un error

const foo = inject(key) // tipo de foo: string | undefined
```

Se recomienda colocar la clave de inyección en un archivo separado para que pueda ser importada en múltiples componentes.

Cuando se utilizan claves de inyección de cadena, el tipo del valor inyectado será `unknown`, y necesita ser declarado explícitamente a través de un argumento de tipo genérico:

```ts
const foo = inject<string>('foo') // tipo: string | undefined
```

Ten en cuenta que el valor inyectado puede seguir siendo `undefined`, porque no hay garantía de que un proveedor proporcione este valor en tiempo de ejecución.

El tipo `undefined` puede eliminarse proporcionando un valor por defecto:

```ts
const foo = inject<string>('foo', 'bar') // tipo: string
```

Si estás seguro de que el valor siempre se provisto, también puedes forzar el control del valor:

```ts
const foo = inject('foo') as string
```

## Escritura de Refs de la Plantilla

Las refs de las plantillas deben ser creadas con un argumento de tipo genérico explícito y un valor inicial de `null`:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

Ten en cuenta que para una estricta seguridad de tipo, es necesario utilizar encadenamiento opcional o guías de tipo cuando se accede a `el.value`. Esto se debe a que el valor inicial de la referencia es `null` hasta que se monta el componente, y también puede ser establecido a `null` si el elemento referenciado es desmontado por `v-if`.

## Escritura de Refs de la Plantilla del Componente

A veces puede ser necesario añadir una anotación a la plantilla de un componente hijo para llamar a su método público. Por ejemplo, tenemos un componente hijo `MyModal` con un método que abre el modal:

```vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
```

Para obtener el tipo de instancia de `MyModal`, primero tenemos que obtener su tipo a través de `typeof`, y luego usar la utilidad incorporada de TypeScript `InstanceType` para extraer su tipo de instancia:

```vue{5}
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```

Ten en cuenta que si quieres usar esta técnica en archivos TypeScript en lugar de SFCs de Vue, necesitas habilitar el [Modo Takeover](./overview.html#takeover-mode) de Volar.
