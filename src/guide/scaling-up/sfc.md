# Componentes de un Solo Archivo (SFC)

## Introducción

Los Componentes de un Solo Archivo de Vue (también conocidos como archivos `*.vue`, abreviado como **SFC**) son un formato de archivo especial que nos permite encapsular la plantilla, la lógica **y** el estilo de un componente Vue en un solo archivo. Aquí hay un ejemplo de SFC:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      greeting: '¡Hola Mundo!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

</div>

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const greeting = ref('¡Hola Mundo!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

</div>

Como podemos ver, el SFC de Vue es una extensión natural del trío clásico de HTML, CSS y JavaScript. Los bloques `<template>`, `<script>` y `<style>` encapsulan y colocan la vista, la lógica y el estilo de un componente en el mismo archivo. La sintaxis completa se define en la [Especificación de Sintaxis del SFC] (/api/sfc-spec).

## ¿Por qué el SFC?

Aunque los SFC requieren un paso de construcción, hay numerosos beneficios a cambio:

- Creación de componentes modulares utilizando la sintaxis familiar de HTML, CSS y JavaScript
- [Colocación de intereses intrínsecamente acoplados](#¿que-pasa-con-la-separacion-de-intereses)
- Plantillas precompiladas sin coste de compilación en tiempo de ejecución
- [CSS en el ámbito de los componentes](/api/sfc-css-features)
- [Sintaxis más ergonómica al trabajar con la Composition API](/api/sfc-script-setup)
- Más optimizaciones en tiempo de compilación mediante el análisis cruzado de plantillas y scripts
- [Soporte de IDE](/guide/scaling-up/tooling.html#soporte-para-ide) con autocompletado y verificación de tipado para las expresiones de la plantilla
- Soporte para el reemplazo de módulos en caliente (HMR)

El SFC es una característica que define a Vue como framework, y es el enfoque recomendado para utilizar Vue en los siguientes escenarios:

- Aplicaciones de una sola página (SPA)
- Generación de sitios estáticos (SSG)
- Cualquier frontend no trivial en el que se pueda justificar un paso de compilación para una mejor experiencia de desarrollo (DX).

Dicho esto, somos conscientes de que hay escenarios en los que los SFC pueden parecer excesivos. Por ello, Vue puede seguir utilizándose a través de JavaScript plano sin un paso de compilación. Si sólo busca mejorar el HTML estático con interacciones ligeras, también puede consultar [petite-vue](https://github.com/vuejs/petite-vue), un subconjunto de Vue de 6 kB optimizado para la mejora progresiva.

## Cómo Trabaja

El SFC de Vue es un formato de archivo específico del framework y debe ser precompilado por [@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) en JavaScript y CSS estándar. Un SFC compilado es un módulo estándar de JavaScript (ES); lo que significa que con una configuración de construcción adecuada puedes importar un SFC como un módulo:

```js
import MyComponent from './MyComponent.vue'

export default {
  components: {
    MyComponent
  }
}
```

Las etiquetas `<style>` dentro de los SFC se inyectan normalmente como etiquetas `<style>` nativas durante el desarrollo para soportar las actualizaciones en caliente. Para producción pueden ser extraídas y fusionadas en un único archivo CSS.

Puedes jugar con los SFCs y explorar cómo se compilan en el [Vue SFC Playground](https://sfc.vuejs.org/).

En los proyectos reales, solemos integrar el compilador de SFC con una herramienta de compilación como [Vite](https://vitejs.dev/) o [Vue CLI](http://cli.vuejs.org/) (que se basa en [webpack](https://webpack.js.org/)), y Vue proporciona herramientas oficiales de andamiaje para que puedas empezar a utilizar las SFC lo más rápido posible. Consulta más detalles en la sección [Herramientas](/guide/scaling-up/tooling).

## ¿Qué pasa con la Separación de Intereses?

Algunos usuarios que proceden de un entorno de desarrollo web tradicional pueden tener la preocupación de que los SFCs estén mezclando diferentes intereses en el mismo lugar; ¡y es que se supone que HTML/CSS/JS deben estar separados!

Para responder a esta pregunta, es importante que estemos de acuerdo en que **la separación de intereses no es igual a la separación de tipos de archivos**. El objetivo final de los principios de ingeniería es mejorar la capacidad de mantenimiento en los códigos. La separación de intereses, cuando se aplica dogmáticamente como separación de tipos de archivo, no nos ayuda a alcanzar ese objetivo en el contexto de aplicaciones de frontend cada vez más complejas.

En el desarrollo moderno de la IU, hemos descubierto que en lugar de dividir el código base en tres enormes capas que se entrecruzan entre sí, tiene mucho más sentido dividirlas en componentes vagamente acoplados y compaginarlos. Dentro de un componente, su plantilla, su lógica y sus estilos están inherentemente acoplados, y su ubicación hace que el componente sea más cohesivo y fácil de mantener.

Ten en cuenta que incluso si no te gusta la idea de los componentes de un solo archivo, puedes aprovechar sus características de recarga en caliente y precompilación al separar tu JavaScript y CSS en archivos independientes utilizando las [Importaciones Src](/api/sfc-spec.html#importaciones-src).
