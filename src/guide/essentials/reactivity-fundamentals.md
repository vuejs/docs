---
outline: deep
---

# Fundamentos de Reactividad

:::tip Preferencias de API
Esta página y muchos otros capítulos posteriores en la guía tienen contenido diferente para la Options API y la Composition API. Tu preferencia actual es <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. Puedes alternar entre los estilos de API usando el interruptor de "Preferencia de API" en la parte superior de la barra lateral izquierda.
:::

## Declarando el Estado Reactivo

<div class="options-api">

Con la Options API, usamos la opción `data` para declarar el estado reactivo de un componente. El valor de la opción debe ser una función que devuelva un objeto. Vue llamará a la función al crear una nueva instancia del componente y empaquetará el objeto devuelto en su sistema de reactividad. Cualquier propiedad de nivel superior de este objeto se representa en la instancia del componente (`this` en los métodos y hooks del ciclo de vida):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` es un hook del ciclo de vida que explicaremos luego
  mounted() {
    // `this` se refiere a la instancia del componente.
    console.log(this.count) // => 1

    // los datos también pueden ser mutados
    this.count = 2
  }
}
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gYG1vdW50ZWRgIGlzIGEgbGlmZWN5Y2xlIGhvb2sgd2hpY2ggd2Ugd2lsbCBleHBsYWluIGxhdGVyXG4gIG1vdW50ZWQoKSB7XG4gICAgLy8gYHRoaXNgIHJlZmVycyB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpIC8vID0+IDFcblxuICAgIC8vIGRhdGEgY2FuIGJlIG11dGF0ZWQgYXMgd2VsbFxuICAgIHRoaXMuY291bnQgPSAyXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIENvdW50IGlzOiB7eyBjb3VudCB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Estas propiedades de la instancia solo se agregan cuando la instancia se crea por primera vez, por lo que debes asegurarte que estén todas presentes en el objeto devuelto por la función `data`. Cuando sea necesario, usa `null`, `undefined` o algún otro valor de marcador de posición para las propiedades donde el valor deseado aún no está disponible.

Es posible agregar una nueva propiedad directamente al `this` sin incluirla en `data`. Sin embargo, las propiedades agregadas de esta manera no podrán desencadenar actualizaciones reactivas.

Vue usa el prefijo `$` cuando expone sus propias API integradas a través de la instancia del componente. También reserva el prefijo `_` para propiedades internas. Debes evitar el uso de nombres para las propiedades de nivel superior de `data` que comiencen con cualquiera de estos caracteres.

### Proxy Reactivo vs. Original \*

En Vue 3, los datos se vuelven reactivos al aprovechar los [Proxies de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Los usuarios que vienen de Vue 2 deben tener en cuenta el siguiente caso extremo:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

Cuando accedes a `this.someObject` después de asignarlo, el valor es un proxy reactivo del `newObject` original. **A diferencia de Vue 2, el `newObject` original se deja intacto y no se volverá reactivo: asegúrate de acceder siempre al estado reactivo como una propiedad de `this`.**

</div>

<div class="composition-api">

Podemos crear un objeto reactivo o un array con la función [`reactive()`](/api/reactivity-core.html#reactive):

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

Los objetos reactivos son [Proxies de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy) y se comportan como objetos normales. La diferencia es que Vue puede rastrear el acceso a la propiedad y las mutaciones de un objeto reactivo. Si tienes curiosidad acerca de los detalles, explicamos cómo funciona el sistema de reactividad de Vue en [Reactividad en profundidad](/guide/extras/reactivity-in-depth.html), pero recomendamos leerlo después de que hayas terminado la guía principal.

Consulta también: [Escritura de reactive()](/guide/typescript/composition-api.html#escritura-de-reactive) <sup class="vt-badge ts" />

Para usar el estado reactivo en la plantilla de un componente, decláralos y devuélvelos desde la función `setup()` del componente:

```js{5,9-11}
import { reactive } from 'vue'

export default {
  // `setup` es un hook especial dedicado para la Composition API.
  setup() {
    const state = reactive({ count: 0 })

    // expone el estado a la plantilla
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```

De manera similar, podemos declarar funciones que mutan el estado reactivo en el mismo ámbito y exponerlo como un método junto con el estado:

```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // no te olvides de exponer la función también.
    return {
      state,
      increment
    }
  }
}
```

Los métodos expuestos se utilizan normalmente como escuchadores de eventos:

```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### `<script setup>` \*\*

Exponer manualmente el estado y los métodos a través de `setup()` puede ser exagerado. Por suerte, sólo es necesario cuando no se utiliza un paso de compilación. Cuando se usan Componentes de un Solo Archivo (SFC), podemos simplificar mucho el uso con `<script setup>`:

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBzdGF0ZS5jb3VudCsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPlxuICAgIHt7IHN0YXRlLmNvdW50IH19XG4gIDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Las importaciones de nivel superior y las variables declaradas en el `<script setup>` se pueden usar automáticamente en la plantilla del mismo componente.

> Para el resto de la guía, utilizaremos principalmente la sintaxis SFC + `<script setup>` para los ejemplos de código de la Composition API, ya que ese es el uso más común para los desarrolladores de Vue.

</div>

<div class="options-api">

## Declarando Métodos \*

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Lección gratuita de Métodos de Vue.js"/>

Para agregar métodos a una instancia del componente, usamos la opción `methods`. Este debería ser un objeto que contenga los métodos deseados:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // los métodos pueden ser llamados en hooks del ciclo de vida u otros métodos!
    this.increment()
  }
}
```

Vue vincula automáticamente el valor `this` para el `methods` para que siempre se refiera a la instancia del componente. Esto asegura que un método conserve el valor `this` correcto si se usa como escuchador de eventos o callback. Debes evitar el uso de funciones de flecha al definir `methods`, ya que eso evita que Vue vincule el valor `this` apropiado:

```js
export default {
  methods: {
    increment: () => {
      // MAL: ¡no hay acceso a `this` aquí!
    }
  }
}
```

Al igual que todas las demás propiedades de la instancia del componente, se puede acceder a los `methods` desde la plantilla del componente. Dentro de una plantilla, se usan más comúnmente como escuchadores de eventos:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

En el ejemplo anterior, se llamará al método `increment` cuando se haga clic en `<button>`.

</div>

### Tiempo de Actualización del DOM

Cuando mutas el estado reactivo, el DOM se actualiza automáticamente. Sin embargo, hay que tener en cuenta que las actualizaciones del DOM no se aplican de forma sincrónica. En su lugar, Vue las almacena en búfer hasta la "siguiente marca" (next tick) del ciclo de actualización para garantizar que cada componente tenga que actualizarse sólo una vez, independientemente de cuántos cambios de estado hayas realizado.

Para esperar a que se complete la actualización del DOM después de un cambio de estado, puedes usar la API global [nextTick()](/api/general.html#nexttick):

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // acceder al DOM actualizado
  })
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // acceder al DOM actualizado
      })
    }
  }
}
```

</div>

### Reactividad Profunda

En Vue, el estado es profundamente reactivo por defecto. Esto significa que puedes esperar que se detecten cambios incluso cuando mutas objetos o arrays anidados:

<div class="options-api">

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // estos funcionarán como se esperaba.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

```js
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // estos funcionarán como se esperaba.
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

También es posible crear explícitamente [objetos reactivos superficiales](/api/reactivity-advanced.html#shallowreactive) donde la reactividad solo se rastrea en el nivel raíz; sin embargo, normalmente estos solo se necesitan en casos de uso avanzado.

<div class="composition-api">

### Proxy Reactivo vs. Original \*\*

Es importante tener en cuenta que el valor devuelto por `reactive()` es un [Proxy](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy) del objeto original, que no es igual al objeto original:

```js
const raw = {}
const proxy = reactive(raw)

// el proxy NO es igual al original.
console.log(proxy === raw) // false
```

Solo el proxy es reactivo: la mutación del objeto original no activará las actualizaciones. Por lo tanto, la mejor práctica cuando se trabaja con el sistema de reactividad de Vue es **utilizar exclusivamente las versiones proxy de tu estado**.

Para asegurar un acceso consistente al proxy, llamar a `reactive()` en el mismo objeto siempre devuelve el mismo proxy, y llamar a `reactive()` en un proxy existente también devuelve ese mismo proxy:

```js
// llamar a reactive () en el mismo objeto devuelve el mismo proxy
console.log(reactive(raw) === proxy) // true

// llamar a reactive() en un proxy devuelve ese mismo proxy
console.log(reactive(proxy) === proxy) // true
```

Esta regla también se aplica a los objetos anidados. Debido a la reactividad profunda, los objetos anidados dentro de un objeto reactivo también son proxies:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Limitaciones de `reactive()` \*\*

La API `reactive()` tiene dos limitaciones:

1. Esta Solo funciona para tipos de objetos (objetos, arrays y [objetos globales](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) como `Map` y `Set`). No puede contener [tipos primitivos](https://developer.mozilla.org/es/docs/Glossary/Primitive) como `string`, `number` o `boolean`.

2. Dado que el seguimiento de la reactividad de Vue funciona sobre el acceso a la propiedad, siempre debemos mantener la misma referencia al objeto reactivo. Esto significa que no podemos " reemplazar" fácilmente un objeto reactivo porque se pierde la conexión de la reactividad con la primera referencia:

   ```js
   let state = reactive({ count: 0 })

   // ¡Esto no funcionará!
   state = reactive({ count: 1 })
   ```

   También significa que cuando asignamos o desestructuramos la propiedad de un objeto reactivo en variables locales, o cuando pasamos esa propiedad a una función, perderemos la conexión de reactividad:

   ```js
   const state = reactive({ count: 0 })

   // n es una variable local que está desconectada
   // del state.count.
   let n = state.count
   // no afecta el estado original
   n++

   // count está también desconectado de state.count.
   let { count } = state
   // no afecta el estado original
   count++

   // la función recibe un número simple y no será capaz de
   // realizar un seguimiento de los cambios en state.count
   callSomeFunction(state.count)
   ```

## Variables Reactivas con `ref()` \*\*

Para abordar las limitaciones de `reactive()`, Vue también proporciona una función [`ref()`](/api/reactivity-core.html#ref) que nos permite crear **"refs"** reactivas que pueden mantener cualquier tipo de valor:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` toma el argumento y lo devuelve empaquetado en un objeto ref con una propiedad `.value`:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

Consulta también: [Escritura de ref()](/guide/typescript/composition-api.html#escritura-de-ref) <sup class="vt-badge ts" />

De forma similar a las propiedades de un objeto reactivo, la propiedad `.value` de un ref es reactiva. Además, cuando contiene tipos de objetos, ref convierte automáticamente su `.value` con `reactive()`.

Un ref que contiene un objeto value puede reemplazar reactivamente todo el objeto:

```js
const objectRef = ref({ count: 0 })

// esto funciona reactivamente
objectRef.value = { count: 1 }
```

Las refs también se pueden pasar a funciones o desestructurar a partir de objetos simples sin perder reactividad:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// la función recibe un ref
// necesita acceder al valor a través de .value pero
// retendrá la conexión de reactividad
callSomeFunction(obj.foo)

// aún reactivo
const { foo, bar } = obj
```

En otras palabras, `ref()` nos permite crear una "referencia" a cualquier valor y pasarla sin perder reactividad. Esta capacidad es bastante importante ya que se usa con frecuencia al extraer lógica en [Funciones Composables](/guide/reusability/composables.html).

### Desempaquetando Ref en Plantillas \*\*

Cuando se accede a las refs como propiedades de nivel superior en la plantilla, se "desempaquetan" automáticamente, por lo que no es necesario utilizar `.value`. Aquí está el ejemplo del contador anterior, utilizando `ref()` en su lugar:

```vue{13}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- no es necesario .value -->
  </button>
</template>
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Ten en cuenta que el desempaquetado sólo se aplica si la ref es una propiedad de nivel superior en el contexto del renderizado de la plantilla. Por ejemplo, `foo` es una propiedad de nivel superior, pero `objeto.foo` no lo es.

Así que dado el siguiente objeto:

```js
const object = { foo: ref(1) }
```

La siguiente expresión **NO** funcionará como se espera:

```vue-html
{{ object.foo + 1 }}
```

El resultado de la renderización será `[object Object]` porque `object.foo` es un objeto ref. Podemos arreglar esto haciendo que `foo` sea una propiedad de nivel superior:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

Ahora el resultado del renderizado será `2`.

Una cosa que hay que tener en cuenta es que una ref también se desempaquetará si es el valor final evaluado de una interpolación de texto (es decir, una etiqueta <code v-pre>{{ }}</code>), por lo que lo siguiente renderizará `1`:

```vue-html
{{ object.foo }}
```

Esto es sólo una característica de conveniencia de la interpolación de texto y es equivalente a <code v-pre>{{ object.foo.value }}</code>.

### Desempaquetando Ref en Objetos Reactivos \*\*

Cuando se accede a una `ref` o se muta como propiedad de un objeto reactivo, también se desempaqueta automáticamente para que se comporte como una propiedad normal:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

Si se asigna una nueva ref a una propiedad vinculada a una ref existente, ésta sustituirá a la antigua ref:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// la ref original está ahora desconectada de state.count
console.log(count.value) // 1
```

El desempaquetado de la ref sólo ocurre cuando se anida dentro de un objeto reactivo profundo. No se aplica cuando se accede como una propiedad de un [objeto reactivo superficial](/api/reactivity-advanced.html#shallowreactive).

#### Desempaquetando Ref en Arrays y Colecciones

A diferencia de los objetos reactivos, no se realiza ningún desempaquetado cuando se accede a la ref como elemento de un array reactivo o de un tipo de colección nativa como `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// necesita .value aquí
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// necesita .value aquí
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Métodos con Estado \*

En algunos casos, es posible que necesitemos crear dinámicamente un método, por ejemplo, creando un manejador de eventos desbordado:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Rebote con Lodash
    click: debounce(function () {
      // ... responder al clic ...
    }, 500)
  }
}
```

Sin embargo, este enfoque es problemático para los componentes que se reutilizan porque una función desbordada **tiene estado**: mantiene algún estado interno sobre el tiempo transcurrido. Si varias instancias de un componente comparten la misma función de desbordamiento, interferirán entre sí.

Para que la función de cada instancia de componente sea independiente de las demás, podemos crear la versión desbordada en el hook del ciclo de vida `created`:

```js
export default {
  created() {
    // cada instancia tiene ahora su propia copia del manejador de desbordamiento
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // también es una buena idea cancelar el temporizador
    // cuando el componente es removido
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... responder al clic ...
    }
  }
}
```

</div>

<div class="composition-api">

## Transformación de la Reactividad <sup class="vt-badge experimental" /> \*\*

Tener que utilizar `.value` con las refs es un inconveniente impuesto por las restricciones del lenguaje JavaScript. Sin embargo, con las transformaciones en tiempo de compilación podemos mejorar la ergonomía añadiendo automáticamente `.value` en los lugares adecuados. Vue proporciona una transformación en tiempo de compilación que nos permite escribir el ejemplo anterior del "counter" de esta manera:

```vue
<script setup>
let count = $ref(0)

function increment() {
  // no hay necesidad de .value
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

Puedes obtener más información sobre [Transformación de la Reactividad](/guide/extras/reactivity-transform.html) en su sección dedicada. Ten en cuenta que actualmente es todavía experimental y puede cambiar antes de ser finalizado.

</div>
