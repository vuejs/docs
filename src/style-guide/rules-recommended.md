# Reglas de Prioridad C: Recomendado

Cuando existen varias opciones igualmente buenas, se puede hacer una elección arbitraria para garantizar la coherencia. En estas reglas, describimos cada opción aceptable y sugerimos una elección por defecto. Esto significa que puedes sentirte libre de hacer una elección diferente en tu propia base de código, siempre y cuando seas coherente y tengas una buena razón. Pero por favor, ¡ten una buena razón! Al adaptarte al estándar de la comunidad, podrás

1. Entrenar a tu cerebro para analizar más fácilmente la mayor parte del código de la comunidad que encuentres
2. Ser capaz de copiar y pegar la mayoría de los ejemplos de código de la comunidad sin modificarlos
3. Encontrar a menudo que los nuevos empleados ya están acostumbrados a su estilo de codificación preferido, al menos en lo que respecta a Vue

## Orden de las opciones de los componentes/instancias

**Las opciones de componentes/instancias deberían estar ordenadas de forma consistente.**

Este es el orden por defecto que recomendamos para las opciones de los componentes. Están divididas en categorías, para que sepas dónde añadir las nuevas propiedades de los plugins.

1. **Conocimiento Global** (requiere conocimientos más allá del componente)

   - `name`

2. **Opciones del Compilador de Plantillas** (cambia la forma en que se compilan las plantillas)

   - `compilerOptions`

3. **Dependencias de la Plantilla** (recursos utilizados en la plantilla)

   - `components`
   - `directives`

4. **Composición** (combina las propiedades en las opciones)

   - `extends`
   - `mixins`
   - `provide`/`inject`

5. **Interfaz** (la interfaz para el componente)

   - `inheritAttrs`
   - `props`
   - `emits`

6. **Composition API** (el punto de entrada para utilizar la Composition API)

   - `setup`

7. **Estado local** (propiedades reactivas locales)

   - `data`
   - `computed`

8. **Eventos** (callbacks disparados por eventos reactivos)

   - `watch`
   - Eventos del ciclo de vida (en el orden en que son llamados)
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `activated`
     - `deactivated`
     - `beforeUnmount`
     - `unmounted`
     - `errorCaptured`
     - `renderTracked`
     - `renderTriggered`

9. **Propiedades no reactivas** (propiedades de instancia independientes del sistema de reactividad)

   - `methods`

10. **Renderización** (la descripción declarativa de la salida del componente)
    - `template`/`render`

## Orden de los atributos de los elementos

**Los atributos de los elementos (incluidos los componentes) deben estar ordenados de forma coherente.**

Este es el orden por defecto que recomendamos para las opciones de los componentes. Están divididos en categorías, para que sepas dónde añadir atributos y directivas personalizadas.

1. **Definición** (proporciona las opciones del componente)

   - `is`

2. **Renderizado de Listas** (crea múltiples variaciones del mismo elemento)

   - `v-for`

3. **Condicionales** (si el elemento se renderiza/muestra)

   - `v-if`
   - `v-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

4. **Modificadores de Renderizado** (cambian la forma en que se renderiza el elemento)

   - `v-pre`
   - `v-once`

5. **Conocimiento global** (requiere conocimiento más allá del componente)

   - `id`

6. **Atributos únicos** (atributos que requieren valores únicos)

   - `ref`
   - `key`

7. **Vinculación Bidireccional** (combinando la vinculación y los eventos)

   - `v-model`

8. **Otros atributos** (todos los atributos vinculados y no vinculados no especificados)

9. **Eventos** (escuchas de eventos de componentes)

   - `v-on`

10. **Contenido** (anula el contenido del elemento)
    - `v-html`
    - `v-text`

## Líneas vacías en las opciones del componente/instancia

**Es posible que quieras añadir una línea vacía entre las propiedades multilíneas, sobre todo si las opciones ya no caben en tu pantalla sin hacer scroll.**

Cuando los componentes empiezan a parecer apretujados o difíciles de leer, añadir espacios entre las propiedades de varias líneas puede hacer que sean más fáciles de recorrer de nuevo. En algunos editores, como Vim, este tipo de opciones de formato también pueden facilitar la navegación con el teclado.

<div class="style-example style-example-good">
<h3>Correcto</h3>

```js
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue() {
    // ...
  },

  inputClasses() {
    // ...
  }
}
```

```js
// No spaces are also fine, as long as the component
// is still easy to read and navigate.
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue() {
    // ...
  },
  inputClasses() {
    // ...
  }
}
```

</div>

## Orden de los elementos de nivel superior de los SFC

**Los [Componentes de un Solo Archivo](/guide/scaling-up/sfc.html) deben ordenar siempre las etiquetas `<script>`, `<template>` y `<style>` de forma consistente, con `<style>` en último lugar, porque al menos una de las otras dos es siempre necesaria.**

<div class="style-example style-example-bad">
<h3>Incorrecto</h3>

```vue-html
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>

<div class="style-example style-example-good">
<h3>Correcto</h3>

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

```vue-html
<!-- ComponentA.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>
