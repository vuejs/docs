# Propiedades Computadas

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Lección gratuita de Propiedades Computadas de Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Lección gratuita de Propiedades Computadas de Vue.js"/>
</div>

## Ejemplo Básico

Las expresiones en las plantillas son muy convenientes, pero están pensadas para operaciones simples. Poner demasiada lógica en tus plantillas puede hacerlas infladas y difíciles de mantener. Por ejemplo, si tenemos un objeto con un array anidado:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Guía Avanzada',
          'Vue 3 - Guía Básica',
          'Vue 4 - El Misterio'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Guía Avanzada',
    'Vue 3 - Guía Básica',
    'Vue 4 - El Misterio'
  ]
})
```

</div>

Y queremos mostrar diferentes mensajes dependiendo de si `author` ya tiene algunos libros o no:

```vue-html
<p>Ha publicado libros:</p>
<span>{{ author.books.length > 0 ? 'Sí' : 'No' }}</span>
```

Llegados a este punto, la plantilla se está volviendo un poco desordenada. Tenemos que mirarla un segundo antes de darnos cuenta de que realiza un cálculo en función de `author.books`. Y lo que es más importante, probablemente no queramos repetirnos si necesitamos incluir este cálculo en la plantilla más de una vez.

Por eso, para una lógica compleja que incluya datos reactivos, se recomienda utilizar una **propiedad computada**. Aquí está el mismo ejemplo, refactorizado:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Guía Avanzada',
          'Vue 3 - Guía Básica',
          'Vue 4 - El Misterio'
        ]
      }
    }
  },
  computed: {
    // un getter computado
    publishedBooksMessage() {
      // `this` apunta a la instancia del componente
      return this.author.books.length > 0 ? 'Sí' : 'No'
    }
  }
}
```

```vue-html
<p>Ha publicado libros:</p>
<span>{{ publishedBooksMessage }}</span>
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIG5hbWU6ICdKb2huIERvZScsXG4gICAgICAgIGJvb2tzOiBbXG4gICAgICAgICAgJ1Z1ZSAyIC0gQWR2YW5jZWQgR3VpZGUnLFxuICAgICAgICAgICdWdWUgMyAtIEJhc2ljIEd1aWRlJyxcbiAgICAgICAgICAnVnVlIDQgLSBUaGUgTXlzdGVyeSdcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBwdWJsaXNoZWRCb29rc01lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+SGFzIHB1Ymxpc2hlZCBib29rczo8L3A+XG4gIDxzcGFuPnt7IGF1dGhvci5ib29rcy5sZW5ndGggPiAwID8gJ1llcycgOiAnTm8nIH19PC9zcGFuPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Aquí hemos declarado una propiedad computada `publishedBooksMessage`.

Intenta cambiar el valor del array `books` en la aplicación `data` y verás cómo `publishedBooksMessage` cambia en consecuencia.

Puedes enlazar datos a las propiedades computadas en las plantillas como si se tratara de una propiedad normal. Vue es consciente de que `this.publishedBooksMessage` depende de `this.author.books`, por lo que actualizará cualquier enlace que dependa de `this.publishedBooksMessage` cuando cambie `this.author.books`.

Mira también: [Escritura de Propiedades Computadas](/guide/typescript/options-api.html#escritura-de-propiedades-computadas) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Guía Avanzada',
    'Vue 3 - Guía Básica',
    'Vue 4 - El Misterio'
  ]
})

// una ref computada
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Sí' : 'No'
})
</script>

<template>
  <p>Ha publicado libros:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXV0aG9yID0gcmVhY3RpdmUoe1xuICBuYW1lOiAnSm9obiBEb2UnLFxuICBib29rczogW1xuICAgICdWdWUgMiAtIEFkdmFuY2VkIEd1aWRlJyxcbiAgICAnVnVlIDMgLSBCYXNpYyBHdWlkZScsXG4gICAgJ1Z1ZSA0IC0gVGhlIE15c3RlcnknXG4gIF1cbn0pXG5cbi8vIGEgY29tcHV0ZWQgcmVmXG5jb25zdCBwdWJsaXNoZWRCb29rc01lc3NhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBhdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPkhhcyBwdWJsaXNoZWQgYm9va3M6PC9wPlxuICA8c3Bhbj57eyBwdWJsaXNoZWRCb29rc01lc3NhZ2UgfX08L3NwYW4+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Aquí hemos declarado la propiedad computada `publishedBooksMessage`. La función `computed()` espera que se le pase una función getter, y el valor devuelto es una **ref computada**. Al igual que con las refs normales, se puede acceder al resultado calculado como `publishedBooksMessage.value`. Las refs computadas también se desenvuelven automáticamente en las plantillas, por lo que se puede hacer referencia a ellas sin `.value` en las expresiones de las plantillas.

Una propiedad computada rastrea automáticamente sus dependencias reactivas. Vue es consciente de que el cálculo de `publishedBooksMessage` depende de `author.books`, por lo que actualizará cualquier enlace que dependa de `publishedBooksMessage` cuando cambie `author.books`.

Véase también: [Escritura de computed()](/guide/typescript/composition-api.html#escritura-de-computed) <sup class="vt-badge ts" />

</div>

## Almacenamiento en Caché Computado vs. Métodos

Te habrás dado cuenta de que podemos conseguir el mismo resultado invocando un método en la expresión:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// en un componente
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Sí' : 'No'
  }
}
```

</div>

<div class="composition-api">

```js
// en un componente
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Sí' : 'No'
}
```

</div>

En lugar de una propiedad computada, podemos definir la misma función como un método. Para el resultado final, los dos enfoques son de hecho exactamente lo mismo. Sin embargo, la diferencia es que **las propiedades computadas se almacenan en caché en función de sus dependencias reactivas.** Una propiedad computada sólo se reevaluará cuando alguna de sus dependencias reactivas haya cambiado. Esto significa que mientras `author.books` no haya cambiado, un acceso múltiple a `publishedBooksMessage` devolverá inmediatamente el resultado calculado anteriormente sin tener que volver a ejecutar la función getter.

Esto también significa que la siguiente propiedad calculada nunca se actualizará, porque `Date.now()` no es una dependencia reactiva:

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

En comparación, una invocación a un método ejecutará **siempre** la función cada vez que se produzca una nueva renderización.

¿Por qué necesitamos el almacenamiento en caché? Imagina que tenemos una costosa propiedad computada `lista`, que requiere recorrer un enorme array y hacer muchos cálculos. Luego podemos tener otras propiedades computadas que a su vez dependen de `list`. Sin la caché, estaríamos ejecutando el getter de `list` muchas más veces de las necesarias. En los casos en los que no quieras almacenar en caché, en su lugar utiliza una llamada a un método.

## "Escribible" Computado

Las propiedades computadas son, por defecto, de tipo getter. Si intentas asignar un nuevo valor a una propiedad computada, recibirás una advertencia en tiempo de ejecución. En los raros casos en los que necesites una propiedad computada "escribible", puedes crear una proporcionando tanto un getter como un setter:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // Nota: aquí utilizamos la sintaxis de asignación de desestructuración.
        ;[this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

Ahora cuando ejecutes `this.fullName = 'John Doe'`, se invocará el setter y se actualizarán `this.firstName` y `this.lastName` en consecuencia.

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Nota: aquí utilizamos la sintaxis de asignación de desestructuración.
    ;[firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

Ahora cuando ejecutes `fullName.value = 'John Doe'`, el setter será invocado y `firstName` y `lastName` serán actualizados en consecuencia.

</div>

## Mejores Prácticas

### Los getters deben estar libres de efectos secundarios

Es importante recordar que las funciones getter computadas sólo deben realizar cálculos puros y estar libres de efectos secundarios. Por ejemplo, no hagas peticiones asíncronas ni mutes el DOM dentro de un getter computado. Piensa en una propiedad computada como una descripción declarativa de cómo derivar un valor basado en otros valores: su única responsabilidad debe ser calcular y devolver ese valor. Más adelante en la guía discutiremos cómo podemos realizar efectos secundarios en reacción a los cambios de estado con los [watchers](./watchers).

### Evitar la mutación del valor computado

El valor devuelto de una propiedad computada es un estado derivado. Piensa en ello como una instantánea temporal: cada vez que el estado fuente cambia, se crea una nueva instantánea. No tiene sentido mutar una instantánea, por lo que un valor de retorno computado debe ser tratado como de sólo lectura y nunca ser mutado; en su lugar, actualizar el estado fuente del que depende para desencadenar nuevos cálculos.
