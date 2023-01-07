# Renderizado Condicional

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/conditional-rendering-in-vue-3" title="Lección gratuita de Renderizado Condicional en Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue" title="Lección gratuita de Renderizado Condicional en Vue.js"/>
</div>

<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

## `v-if`

La directiva `v-if` se utiliza para renderizar condicionalmente un bloque. El bloque sólo se renderizará si la expresión de la directiva devuelve un valor verdadero.

```vue-html
<h1 v-if="awesome" >¡Vue es increíble!</h1>
```

## `v-else`

Puedes usar la directiva `v-else` para indicar un "bloque else" para `v-if`:

```vue-html
<button @click="awesome = !awesome" >Alternar</button>

<h1 v-if="awesome" >¡Vue es increíble!</h1>
<h1 v-else>Oh no 😢</h1>
```

<div class="demo">
  <button @click="awesome = !awesome">Alternar</button>
  <h1 v-if="awesome">¡Vue es increíble!</h1>
  <h1 v-else>Oh no 😢</h1>
</div>

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXdlc29tZSA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgYXdlc29tZTogdHJ1ZVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Un elemento `v-else` debe seguir inmediatamente a un elemento `v-if` o a un elemento `v-else-if`; de lo contrario no será reconocido.

## `v-else-if`

El elemento `v-else-if`, como su nombre indica, sirve como un "bloque else if" para `v-if`. También se puede encadenar múltiples veces:

```vue-html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

Al igual que `v-else`, un elemento `v-else-if` debe seguir inmediatamente a un elemento `v-if` o `v-else-if`.

## `v-if` en `<template>`

Como `v-if` es una directiva, tiene que estar unida a un solo elemento. ¿Pero qué pasa si queremos activar más de un elemento? En este caso podemos usar `v-if` en un elemento `<template>`, que sirva de envoltura invisible. El resultado final del renderizado no incluirá el elemento `<template>`.

```vue-html
<template v-if="ok">
  <h1>Título</h1>
  <p>Párrafo 1</p>
  <p>Párrafo 2</p>
</template>
```

`v-else` y `v-else-if` también pueden utilizarse en `<template>`.

## `v-show`

Otra opción para mostrar condicionalmente un elemento es la directiva `v-show`. El uso es prácticamente el mismo:

```vue-html
<h1 v-show="ok">¡Hola!</h1>
```

La diferencia es que un elemento con `v-show` siempre se renderizará y permanecerá en el DOM; `v-show` sólo conmuta la propiedad CSS `display` del elemento.

`v-show` no soporta el elemento `<template>`, ni funciona con `v-else`.

## `v-if` vs `v-show`

El `v-if` es una representación condicional "real" porque asegura que los oyentes de eventos y los componentes hijos dentro del bloque condicional se destruyen y se vuelven a crear correctamente durante los toggles.

El `v-if` también es **perezoso**: si la condición es falsa en el renderizado inicial, no hará nada; el bloque condicional no se renderizará hasta que la condición se convierta en verdadera por primera vez.

En comparación, `v-show` es mucho más simple: el elemento siempre se muestra independientemente de la condición inicial, con una alternancia basada en CSS.

En general, `v-if` tiene mayores costes de conmutación mientras que `v-show` tiene mayores costes de renderización inicial. Así que prefiera `v-show` si necesita alternar algo muy a menudo, y prefiera `v-if` si es poco probable que la condición cambie en tiempo de ejecución.

## `v-if` con `v-for`

::: warning Nota
No se recomienda usar `v-if` y `v-for` en el mismo elemento debido a la precedencia implícita. Consulta la [guía de estilo](/style-guide/rules-essential.html#evitar-usar-v-if-con-v-for) para más detalles.
:::

Cuando se utilizan `v-if` y `v-for` en el mismo elemento, se evalúa primero `v-if`. Para más detalles, consulta la [guía de renderizado de listas](list#v-for-con-v-if).
