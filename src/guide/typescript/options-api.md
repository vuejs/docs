# TypeScript con la Options API {#typescript-con-la-options-api}

> Esta página supone que ya has leído las generalidades en la sección [Usando Vue con TypeScript](./overview).

:::tip
Aunque Vue soporta el uso de TypeScript con Options API, se recomienda usar Vue con TypeScript a través de Composition API ya que ofrece una inferencia de tipos más simple, eficiente y robusta.
:::

## Escritura de las Props de Componentes {#escritura-de-las-props-de-componentes}

La inferencia de tipos para las props en la Options API requiere el encapsulamiento del componente con `defineComponent()`. Con ello, Vue es capaz de inferir los tipos para las props basándose en la opción `props`, teniendo en cuenta opciones adicionales como `required: true` y `default`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // inferencia de tipo habilitada
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // tipo: string | undefined
    this.id // tipo: number | string | undefined
    this.msg // tipo: string
    this.metadata // tipo: any
  }
})
```

Sin embargo, las opciones de las "props" en tiempo de ejecución sólo soportan el uso de funciones constructoras como tipo de una prop; no hay manera de especificar tipos complejos como objetos con propiedades anidadas o expresiones de llamada a funciones.

Para anotar tipos de props complejos, podemos utilizar el tipo de utilidad `PropType`:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      // proporcionar un tipo más específico a `Object`
      type: Object as PropType<Book>,
      required: true
    },
    // puede también anotar funciones
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // string
    this.book.year // number

    // Error TS: el argumento de tipo 'string' no es
    // asignable a un parámetro de tipo 'number'
    this.callback?.('123')
  }
})
```

### Advertencias {#advertencias}

Si tu versión de TypeScript es inferior a `4.7`, tienes que tener cuidado cuando utilices valores de función para las opciones de las props `validator` y `default`; asegúrate de utilizar funciones de flecha:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // Asegúrate de utilizar las funciones de flecha si
      // tu versión de TypeScript es inferior a la 4.7
      default: () => ({
        title: 'Expresión de la Función Flecha'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

Esto evita que TypeScript tenga que inferir el tipo de `this` dentro de estas funciones, lo que, desafortunadamente, puede hacer que la inferencia de tipo falle. Esta era una [limitación de diseño](https://github.com/microsoft/TypeScript/issues/38845) previa, y ahora ha sido mejorada en [TypeScript 4.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#improved-function-inference-in-objects-and-methods).

## Escritura de Emits del Componente {#escritura-de-emits-del-componente}

Podemos declarar el tipo de payload esperado para un evento emitido usando la sintaxis de objeto de la opción `emits`. Además, todos los eventos emitidos no declarados lanzarán un error de tipo cuando sean llamados:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // realizar la validación en tiempo de ejecución
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // ¡Error de tipado!
      })

      this.$emit('non-declared-event') // ¡Error de tipado!
    }
  }
})
```

## Escritura de Propiedades Computadas {#escritura-de-propiedades-computadas}

Una propiedad computada infiere su tipo basándose en su valor de retorno:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hola!'
    }
  },
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // tipo: string
  }
})
```

En algunos casos, es posible que quieras indicar explícitamente el tipo de una propiedad computada para asegurarte de que su implementación es correcta:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hola!'
    }
  },
  computed: {
    // indicar explícitamente el tipo de retorno
    greeting(): string {
      return this.message + '!'
    },

    // indicar una propiedad computada editable
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

Las indicaciones explícitas también pueden ser necesarias en algunos casos extremos en los que TypeScript no puede inferir el tipo de una propiedad computada debido a bucles de inferencia circular.

## Escritura de Manejadores de Eventos {#escritura-de-manejadores-de-eventos}

Cuando se trata de eventos nativos del DOM, puede ser útil escribir correctamente el argumento que pasamos al manejador. Veamos este ejemplo:

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // `event` tiene implícitamente el tipo `any`.
      console.log(event.target.value)
    }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

Sin anotación de tipo, el argumento `event` tendrá implícitamente un tipo `any`. Esto también dará lugar a un error de TS si se utiliza `"strict": true` o `"noImplicitAny": true` en `tsconfig.json`. Por lo tanto, se recomienda indicar explícitamente el argumento de los manejadores de eventos. Además, es posible que tengas que asignar explícitamente propiedades a `event`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event: Event) {
      console.log((event.target as HTMLInputElement).value)
    }
  }
})
```

## Aumento de las Propiedades Globales {#aumento-de-las-propiedades-globales}

Algunos plugins instalan propiedades disponibles globalmente a todas las instancias del componente a través de [`app.config.globalProperties`](/api/application.html#app-config-globalproperties). Por ejemplo, podemos instalar `this.$http` para la obtención de datos o `this.$translate` para la internacionalización. Para que esto funcione bien con TypeScript, Vue expone una interfaz `ComponentCustomProperties` diseñada para ser aumentada mediante [TypeScript module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation):

```ts
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

Mira también:

- [Pruebas unitarias de TypeScript para extensiones de tipos de componentes](https://github.com/vuejs/core/blob/main/test-dts/componentTypeExtensions.test-d.tsx)

### Ubicación del Aumento de Tipo {#ubicacion-del-aumento-de-tipo}

Podemos poner este aumento de tipo en un archivo `.ts`, o en un archivo de todo el proyecto `*.d.ts`. De cualquier manera, asegúrate de que está incluido en `tsconfig.json`. Para los autores de librerías / plugins, este archivo debe ser especificado en la propiedad `types` en `package.json`.

Para aprovechar las ventajas del aumento del módulo, tendrás que asegurarte de que el aumento se coloca en un [módulo TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html). Es decir, el archivo necesita contener al menos un `import` o `export` de nivel superior, incluso si es sólo `export {}`. Si el aumento se coloca fuera de un módulo, ¡sobreescribirá los tipos originales en lugar de aumentarlos!

```ts
// No funciona, sobrescribe los tipos originales.
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

```ts
// Funciona correctamente
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

## Aumento de las Opciones Personalizadas {#aumento-de-las-opciones-personalizadas}

Algunos plugins, por ejemplo `vue-router`, proporcionan soporte para opciones de componentes personalizados como `beforeRouteEnter`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // ...
  }
})
```

Sin un aumento de tipo adecuado, los argumentos de este hook tendrán implícitamente un tipo `any`. Podemos aumentar la interfaz `ComponentCustomOptions` para soportar estas opciones personalizadas:

```ts
import { Route } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomOptions {
    beforeRouteEnter?(to: Route, from: Route, next: () => void): void
  }
}
```

Ahora la opción `beforeRouteEnter` estará correctamente tipada. Ten en cuenta que esto es sólo un ejemplo; las librerías bien tipadas como `vue-router` deberían realizar automáticamente estos aumentos en sus propias definiciones de tipo.

La colocación de este aumento está sujeta a las [mismas restricciones](#ubicacion-del-aumento-de-tipo) que los aumentos de propiedades globales.

Mira también:

- [Pruebas unitarias de TypeScript para extensiones de tipos de componentes](https://github.com/vuejs/core/blob/main/test-dts/componentTypeExtensions.test-d.tsx)
