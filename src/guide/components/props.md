# Props

> Esta página supone que ya has leído los [Fundamentos de los Componentes](/guide/essentials/component-basics). Léelo primero si eres nuevo en el tema de componentes.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="Lección gratuita de Props de Vue.js"/>
</div>

## Declaración de Props

Los componentes de Vue requieren una declaración explícita de props para que Vue sepa qué props externos pasados al componente deben ser tratados como atributos fallthrough (que se discutirán en [su sección dedicada](/guide/components/attrs)).

<div class="composition-api">

En los SFC que utilizan `<script setup>`, las props pueden declararse utilizando la macro `defineProps()`:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

En los componentes que no son `<script setup>`, las props se declaran utilizando la opción [`props`](/api/options-state.html#props):

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() recibe props como primer argumento.
    console.log(props.foo)
  }
}
```

Observa que el argumento pasado a `defineProps()` es el mismo que el valor proporcionado a las opciones `props`: las mismas props de la options API son compatibles con los dos estilos de declaración.

</div>

<div class="options-api">

Las props se declaran utilizando la opción [`props`](/api/options-state.html#props):

```js
export default {
  props: ['foo'],
  created() {
    // las props van a estar expuestas a `this`.
    console.log(this.foo)
  }
}
```

</div>

Además de declarar las props utilizando un array de strings, también podemos utilizar la sintaxis de objetos:

<div class="options-api">

```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>
<div class="composition-api">

```js
// en <script setup>
defineProps({
  title: String,
  likes: Number
})
```

```js
// sin <script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>

Para cada propiedad en la sintaxis de la declaración del objeto, la key es el nombre de la prop, mientras que el value debe ser la función constructora del tipo esperado.

Esto no sólo documenta tu componente, sino que también advertirá a otros desarrolladores que utilicen tu componente en la consola del navegador si pasan el tipo incorrecto. Discutiremos más detalles sobre [validación de prop](#validacion-de-prop) más adelante en esta página.

<div class="options-api">

Mira también: [Escritura de las Props de Componentes](/guide/typescript/options-api.html#escritura-de-las-props-de-componentes) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

Si estás usando TypeScript con `<script setup>`, también es posible declarar props usando anotaciones de tipo puro:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

Más detalles: [Escritura de las Props de Componentes](/guide/typescript/composition-api.html#escritura-de-las-props-de-componentes) <sup class="vt-badge ts" />

</div>

## Detalles del Pase del Prop

### Nomenclatura de las Props

Declaramos los nombres largos de las props usando camelCase porque esto evita tener que usar comillas cuando se usan como claves de propiedades, y nos permite referenciarlas directamente en las expresiones de las plantillas porque son identificadores válidos de JavaScript:

<div class="composition-api">

```js
defineProps({
  greetingMessage: String
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    greetingMessage: String
  }
}
```

</div>

```vue-html
<span>{{ greetingMessage }}</span>
```

Técnicamente, también puedes usar camelCase al pasar props a un componente hijo (excepto en [plantillas del DOM](/guide/essentials/component-basics.html#advertencias-sobre-el-procesamiento-de-las-plantillas-del-dom)). Sin embargo, la convención es usar kebab-case en todos los casos para alinearse con los atributos HTML:

```vue-html
<MyComponent greeting-message="hola" />
```

Utilizamos [PascalCase para las etiquetas de los componentes](/guide/components/registration.html#nomenclatura-de-los-componentes) cuando es posible porque mejora la legibilidad de la plantilla al diferenciar los componentes Vue de los elementos nativos. Sin embargo, no hay tanto beneficio práctico en el uso de camelCase al pasar props, por lo que elegimos seguir las convenciones de cada lenguaje.

### Props Estáticas vs. Dinámicas

Hasta ahora, has visto pasar props como valores estáticos, como en

```vue-html
<BlogPost title="Mi viaje con Vue" />
```

También has visto props asignadas dinámicamente con `v-bind` o su atajo `:`, como en:

```vue-html
<!-- Asignar dinámicamente el valor de una variable -->
<BlogPost :title="post.title" />

<!-- Asignar dinámicamente el valor de una expresión compleja -->
<BlogPost :title="post.title + ' por ' + post.author.name" />
```

### Pasando Diferentes Tipos de Valores

En los dos ejemplos anteriores, resulta que pasamos valores de tipo string, pero se puede pasar cualquier tipo de valor a una prop.

#### Número

```vue-html
<!-- Aunque `42` es estático, necesitamos v-bind para decirle a Vue que -->
<!-- se trata de una expresión JavaScript en lugar de un string.       -->
<BlogPost :likes="42" />

<!-- Asignar dinámicamente al valor de una variable. -->
<BlogPost :likes="post.likes" />
```

#### Booleano

```vue-html
<!-- Incluir la prop sin valor implicará ``true``. -->
<BlogPost is-published />

<!-- Aunque `false` es estático, necesitamos v-bind para decirle a Vue que -->
<!-- se trata de una expresión JavaScript en lugar de un string.          -->
<BlogPost :is-published="false" />

<!-- Asignar dinámicamente al valor de una variable. -->
<BlogPost :is-published="post.isPublished" />
```

#### Array

```vue-html
<!-- Aunque el array es estático, necesitamos v-bind para decirle a Vue que -->
<!-- se trata de una expresión JavaScript en lugar de un string.            -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- Asignar dinámicamente al valor de una variable. -->
<BlogPost :comment-ids="post.commentIds" />
```

#### Objeto

```vue-html
<!-- Aunque el objeto es estático, necesitamos v-bind para decirle a Vue que -->
<!-- se trata de una expresión JavaScript en lugar de un string.             -->
<BlogPost
  :author="{
  name: 'Veronica',
  company: 'Veridian Dynamics'
  }"
 />

<!-- Asignar dinámicamente al valor de una variable. -->
<BlogPost :author="post.author" />
```

### Vinculación de Múltiples Propiedades Usando un Objeto

Si quieres pasar todas las propiedades de un objeto como props, puedes usar [`v-bind` sin argumento](/guide/essentials/template-syntax.html#vinculacion-dinamica-de-multiples-atributos) (`v-bind` en lugar de `:prop-name`). Por ejemplo, dado un objeto `post`:

<div class="options-api">

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'Mi viaje con Vue'
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const post = {
  id: 1,
  title: 'Mi viaje con Vue'
}
```

</div>

La siguiente plantilla:

```vue-html
<BlogPost v-bind="post" />
```

será equivalente a:

```vue-html
<BlogPost :id="post.id" :title="post.title" />
```

## Flujo de Datos Unidireccional

Todos las props forman una **vinculación unidireccional** entre la propiedad del hijo y la del padre: cuando la propiedad del padre se actualiza, fluye hacia el hijo, pero no al revés. Esto evita que los componentes hijos muten accidentalmente el estado del padre, lo que puede hacer que el flujo de datos de tu aplicación sea más difícil de entender.

Además, cada vez que se actualice el componente padre, todos los props del componente hijo se actualizarán con el último valor. Esto significa que **no** debes intentar mutar una prop dentro de un componente hijo. Si lo haces, Vue te avisará en la consola:

<div class="composition-api">

```js
const props = defineProps(['foo'])

// ❌ aviso, ¡las props son solamente de lectura!
props.foo = 'bar'
```

</div>
<div class="options-api">

```js
export default {
  props: ['foo'],
  created() {
    // ❌ aviso, ¡las props son solamente de lectura!
    this.foo = 'bar'
  }
}
```

</div>

Suele haber dos casos en los que es tentador mutar una prop:

1. **La prop es usada para pasar un valor inicial; el componente hijo quiere utilizarla más adelante como una propiedad de datos local.** En este caso, es mejor definir una propiedad de datos local que utilice la prop como valor inicial:

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // el contador sólo utiliza props.initialCounter como valor inicial;
   // está desconectado de futuras actualizaciones de la prop.
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
         // el contador sólo utiliza props.initialCounter como valor inicial;
         // está desconectado de futuras actualizaciones de la prop.
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **La prop se pasa como un valor primario que necesita ser transformado.** En este caso, es mejor definir una propiedad computada usando el valor de la prop:

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   // propiedad computada que se auto-actualiza cuando la prop cambia
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       // propiedad computada que se auto-actualiza cuando la prop cambia
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### Mutación de Props de Objetos / Arrays

Cuando se pasan objetos y arrays como props, mientras que el componente hijo no puede mutar el enlace de la prop, **podrá** mutar las propiedades anidadas del objeto o del array. Esto es porque en JavaScript los objetos y arrays se pasan por referencia, y es excesivamente costoso para Vue evitar tales mutaciones.

La desventaja principal de estas mutaciones es que permiten que el componente hijo afecte al estado del padre de una manera que no es obvia para el componente padre, haciendo potencialmente más difícil razonar sobre el flujo de datos en el futuro. La mejor práctica es evitar estas mutaciones a menos que el padre y el hijo estén estrechamente acoplados por diseño. La mayor parte de las veces, el hijo debería [emitir un evento](/guide/components/events.html) para que el padre realice la mutación.

## Validación de Prop

Los componentes pueden especificar requisitos para sus props, como los tipos que ya has visto. Si un requerimiento no se cumple, Vue te avisará en la consola JavaScript del navegador. Esto es especialmente útil cuando se desarrolla un componente que va a ser utilizado por otros.

Con el fin de especificar validaciones de props, puedes proporcionar un objeto con requisitos de validación a la macro <span class="composition-api">`defineProps()`</span><span class="options-api">`props` option</span>, en lugar de un array de strings. Por ejemplo:

<div class="composition-api">

```js
defineProps({
  // Comprobación básica de tipo
  // (los valores `null` y `undefined` permitirán cualquier tipo)
  propA: Number,
  // Múltiples tipos posibles
  propB: [String, Number],
  // String requerido
  propC: {
    type: String,
    required: true
  },
  // Número con valor por defecto
  propD: {
    type: Number,
    default: 100
  },
  // Objeto con valor por defecto
  propE: {
    type: Object,
    // Los valores por defecto de los objetos o arrays deben ser
    // devueltos desde una función de fábrica. La función recibe las
    // props originales recibidas por el componente como argumento.
    default(rawProps) {
      return { message: 'hola' }
    }
  },
  // Función de validación personalizada
  propF: {
    validator(value) {
      // El valor debe coincidir con una de estas cadenas
      return ['éxito', 'advertencia', 'peligro'].includes(valor)
    }
  },
  // Función con valor por defecto
  propG: {
    type: Function,
    // A diferencia de los objetos o arrays por defecto, esta no es una
    // función de fábrica; es una función que sirve como valor por defecto
    default() {
      return 'Default function'
    }
  }
})
```

:::tip
El código dentro del argumento `defineProps()` **no puede acceder a otras variables declaradas en `<script setup>`**, porque toda la expresión se mueve a un ámbito de función externo cuando se compila.
:::

</div>
<div class="options-api">

```js
export default {
  props: {
    // Comprobación básica de tipo
    // (los valores `null` y `undefined` permitirán cualquier tipo)
    propA: Number,
    // Múltiples tipos posibles
    propB: [String, Number],
    // String requerido
    propC: {
      type: String,
      required: true
    },
    // Número con valor por defecto
    propD: {
      type: Number,
      default: 100
    },
    // Objeto con valor por defecto
    propE: {
      type: Object,
      // Los valores por defecto de los objetos o arrays deben ser
      // devueltos desde una función de fábrica. La función recibe las
      // props originales recibidas por el componente como argumento.
      default(rawProps) {
        return { message: 'hola' }
      }
    },
    // Función de validación personalizada
    propF: {
      validator(value) {
        // El valor debe coincidir con una de estas cadenas
        return ['éxito', 'advertencia', 'peligro'].includes(valor)
      }
    },
    // Función con valor por defecto
    propG: {
      type: Function,
      // A diferencia de los objetos o arrays por defecto, esta no es una
      // función de fábrica; es una función que sirve como valor por defecto
      default() {
        return 'Default function'
      }
    }
  }
}
```

</div>

Detalles adicionales:

- Todas las props son opcionales por defecto, a menos que se especifique `required: true`.

- Cualquier props opcional ausente que no sea `Boolean` tendrá un valor `undefined`.

- Las props ausentes `Boolean` se convertirán en `false`. Deberías establecer un valor `default` para obtener el comportamiento deseado.

- Cuando se especifica un valor `default`, se utilizará si el valor resuelto de la props es `undefined`; esto incluye tanto cuando la prop está ausente, como cuando se pasa un valor `undefined` explícito.

Cuando falla la validación de la prop, Vue generará una advertencia en la consola (si se utiliza la compilación de desarrollo).

<div class="composition-api">

Cuando se utilizan [declaraciones de props basadas en tipos](/api/sfc-script-setup.html#funcionalidades-exclusivas-de-typeScript) <sup class="vt-badge ts" />, Vue hará todo lo posible para compilar las anotaciones de tipos en declaraciones de props equivalentes en tiempo de ejecución. Por ejemplo, `defineProps<{ msg: string }>` se compilará en `{ msg: { type: String, required: true }}`.

</div>
<div class="options-api">

::: tip Nota
Ten en cuenta que las props se validan **antes** de que se cree una instancia del componente, por lo que las propiedades de la instancia (por ejemplo, `data`, `computed`, etc.) no estarán disponibles dentro de las funciones `default` o `validator`.
:::

</div>

### Comprobaciones de Tipo en Tiempo de Ejecución

El `tipo` puede ser uno de los siguientes constructores nativos:

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

Además, `type` también puede ser una clase o función constructora personalizada y la declaración será realizada con una comprobación `instanceof`. Por ejemplo, dada la siguiente clase:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

Podrías usarlo como tipo de props:

<div class="composition-api">

```js
defineProps({
  author: Person
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    author: Person
  }
}
```

</div>

Vue utilizará `instanceof Person` para validar si el valor de la prop `author` es efectivamente una instancia de la clase `Person`.

## Asignación de Booleanos

Las props de tipo `Boolean` tienen reglas especiales de asignación para imitar el comportamiento de los atributos booleanos nativos. Dado un `<MyComponent>` con la siguiente declaración:

<div class="composition-api">

```js
defineProps({
  disabled: Boolean
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

</div>

El componente se puede utilizar así:

```vue-html
<!-- equivalente a pasar :disabled="true" -->
<MyComponent disabled />

<!-- equivalente a pasar :disabled="false" -->
<MyComponent />
```

Cuando se declara una prop para permitir múltiples tipos, por ejemplo

<div class="composition-api">

```js
defineProps({
  disabled: [Boolean, Number]
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
```

</div>

Las reglas de asignación para `Boolean` se aplicarán independientemente del orden de aparición del tipo.
