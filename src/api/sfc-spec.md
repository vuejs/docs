# Especificación de Sintaxis

## Descripción

Un componente de un solo archivo (SFC) de Vue, que normalmente usa la extensión de archivo `*.vue`, es un formato de archivo personalizado que usa una sintaxis similar a HTML para describir un componente de Vue. Un SFC de Vue es sintácticamente compatible con HTML.

Cada archivo `*.vue` consta de tres tipos de bloques de lenguaje de nivel superior: `<template>`, `<script>` y `<style>`, y opcionalmente bloques personalizados adicionales:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hola mundo!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  Esto puede ser, por ejemplo, la documentación del componente.
</custom1>
```

## Bloques de Lenguaje

### `<template>`

- Cada archivo `*.vue` puede contener como máximo un bloque `<template>` de nivel superior a la vez.

- El contenido se extraerá y se pasará a `@vue/compiler-dom`, se precompilará en funciones de renderizado de JavaScript, y se adjuntará al componente exportado como su opción `render`.

### `<script>`

- Cada archivo `*.vue` puede contener como máximo un bloque `<script>` a la vez (excluyendo [`<script setup>`](/api/sfc-script-setup.html)).

- El script se ejecuta como un Módulo ES.

- La **exportación por defecto** debe ser un objeto de opciones de componentes de Vue, ya sea como un objeto simple o como el valor de retorno de [defineComponent](/api/general.html#definecomponent).

### `<script setup>`

- Cada archivo `*.vue` puede contener como máximo un bloque `<script setup>` a la vez (excluyendo el `<script>` normal).

- El script se procesa previamente y se usa como la función `setup()` del componente, lo que significa que se ejecutará **para cada instancia del componente**. Los enlaces de nivel superior en `<script setup>` se exponen automáticamente a la plantilla. Para obtener más detalles, [consulta la documentación dedicada en `<script setup>`](/api/sfc-script-setup).

### `<style>`

- Un único archivo `*.vue` puede contener varias etiquetas `<style>`.

- Una etiqueta `<style>` puede tener atributos `scoped` o `module` (consulta [Características CSS del SFC](/api/sfc-css-features) para obtener más detalles) para ayudar a encapsular los estilos en el componente actual. Se pueden mezclar múltiples etiquetas `<style>` con diferentes modos de encapsulación en el mismo componente.

### Bloques Personalizados

Se pueden incluir bloques personalizados adicionales en un archivo `*.vue` para cualquier necesidad específica del proyecto, por ejemplo un bloque `<docs>`. Algunos ejemplos del mundo real de bloques personalizados incluyen:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n#i18n-custom-block)

El manejo de los bloques personalizados dependerá de las herramientas: si deseas crear tus propias integraciones de bloques personalizados, consulta [la sección de herramientas correspondiente](/guide/scaling-up/tooling.html#integraciones-de-bloques-personalizados-del-sfc) para obtener más detalles.

## Inferencia Automática de Nombres

Un SFC infiere automáticamente el nombre del componente a partir de su **nombre de archivo** en los siguientes casos:

- Formato de advertencia de desarrollo
- Inspección de DevTools
- Autorreferencia recursiva. Por ejemplo, un archivo llamado `FooBar.vue` puede referirse a sí mismo como `<FooBar/>` en su plantilla. Esto tiene menor prioridad que los componentes registrados/importados explícitamente.

## Preprocesadores

Los bloques pueden declarar lenguajes de preprocesamiento usando el atributo `lang`. El caso más común es usar TypeScript para el bloque `<script>`:

```vue-html
<script lang="ts">
  // utilice TypeScript
</script>
```

`lang` se puede aplicar a cualquier bloque; por ejemplo, podemos usar `<style>` con [SASS](https://sass-lang.com/) y `<template>` con [Pug](https://pugjs.org/api/getting-started.html):

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

Ten en cuenta que la integración con varios preprocesadores puede diferir según el tipo de herramientas. Consulta la documentación respectiva para ver ejemplos:

- [Vite](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## Importaciones Src

Si prefieres dividir tus componentes `*.vue` en varios archivos, puedes utilizar el atributo `src` para importar un archivo externo para un bloque de lenguaje:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

Ten en cuenta que las importaciones de `src` siguen las mismas reglas de resolución de rutas que las solicitudes de módulos de webpack, lo que significa que:

- Las rutas relativas deben comenzar con `./`
- Puedes importar recursos desde dependencias de npm:

```vue
<!-- importar un archivo del paquete npm "todomvc-app-css" instalado -->
<style src="todomvc-app-css/index.css" />
```

Las importaciones de `src` también funcionan con bloques personalizados, por ejemplo:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

## Comentarios

Dentro de cada bloque deberás utilizar la sintaxis de comentarios del lenguaje que se está utilizando (HTML, CSS, JavaScript, Pug, etc.). Para comentarios de nivel superior, utiliza la sintaxis de comentarios de HTML: `<!-- contenido del comentario aqui -->`
