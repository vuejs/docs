---
footer: false
---

# Introducción {#introduccion}

:::info ¡Estás leyendo la documentación de Vue 3!

- El soporte de Vue 2 finalizará el 31 de diciembre de 2023. Más información sobre [Vue 2 LTS Extendida](https://v2.vuejs.org/lts/).
- La documentación de Vue 2 se ha movido a [v2.vuejs.org](https://v2.vuejs.org/).
- ¿Actualizando desde Vue 2? Consulta la [Guía de Migración](https://v3-migration.vuejs.org/).
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses-path/beginner" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Aprende Vue con tutoriales en video en <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## ¿Qué es Vue? {#que-es-vue}

Vue (pronunciado /vjuː/, como **view**) es un framework de JavaScript para crear interfaces de usuario. Está construido sobre los estándares de HTML, CSS y JavaScript, y proporciona un modelo de programación declarativo y basado en componentes que te ayuda a desarrollar interfaces de usuario de manera más eficiente, ya sean simples o complejas.

Aquí tienes un pequeño ejemplo:

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

```vue-html
<div id="app">
  <button @click="count++">
    El contador está en: {{ count }}
  </button>
</div>
```

**Resultado**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    El contador está en: {{ count }}
  </button>
</div>

El ejemplo anterior demuestra las dos características principales de Vue:

- **El Renderizado Declarativo**: Vue amplía el HTML estándar con una sintaxis de plantilla que nos permite describir de forma declarativa la salida HTML en función al estado de JavaScript.

- **Reactividad**: Vue rastrea automáticamente los cambios de estado de JavaScript y actualiza de manera eficiente el DOM cuando ocurren cambios.

Es posible que ya tengas preguntas; no te preocupes. Cubriremos cada pequeño detalle en el resto de la documentación. Por ahora, sigue leyendo para que puedas tener una comprensión de alto nivel de lo que ofrece Vue.

:::tip Prerrequisitos
El resto de la documentación supone una familiaridad básica con HTML, CSS y JavaScript. Si eres totalmente nuevo en el desarrollo frontend, puede que no sea la mejor idea saltar directamente a un framework como tu primer paso. ¡Aprende los conceptos básicos y luego regresa! Puedes comprobar tu nivel de conocimientos con [este resumen de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Language_Overview). La experiencia previa con otros frameworks ayuda, pero no es necesaria.
:::

## El Framework Progresivo {#el-framework-progresivo}

Vue es un framework y un ecosistema que cubre la mayoría de las características comunes necesarias en el desarrollo frontend. Pero la web es extremadamente diversa: las cosas que construimos en la web pueden variar drásticamente en forma y escala. Con eso en mente, Vue está diseñado para ser flexible y ser adoptado de forma incremental. Dependiendo de tu caso de uso, Vue se puede usar de diferentes maneras:

- Mejorar el HTML estático sin un paso de compilación
- Incrustar componentes web en cualquier página
- Aplicaciones de una sola página (SPA)
- Fullstack / Renderizado del lado del servidor (SSR)
- Jamstack / Generación de sitios estáticos (SSG)
- Orientación hacia aplicaciones de escritorio, móvil, WebGL o incluso de la terminal.

Si encuentras estos conceptos intimidantes, ¡no te preocupes! El tutorial y la guía solo requieren conocimientos básicos de HTML y JavaScript, y deberías poder seguirlos sin ser un experto en ninguno de estos.

Si eres un desarrollador experimentado interesado en cómo integrar mejor Vue a tu stack, o tienes curiosidad acerca de lo que significan estos términos, los discutimos con más detalle en [Maneras de Usar Vue](/guide/extras/ways-of-using-vue).

A pesar de su flexibilidad, el conocimiento central sobre cómo funciona Vue se comparte en todos estos casos de uso. Incluso si ahora eres solo un principiante, el conocimiento adquirido en el camino seguirá siendo útil a medida que crezcas para abordar metas más ambiciosas en el futuro. Si eres un veterano, puedes elegir la forma óptima de aprovechar Vue en función de los problemas que estás tratando de resolver mientras mantienes la misma productividad. Es por eso que llamamos a Vue "El Framework Progresivo": es un framework que puede crecer contigo y adaptarse a tus necesidades.

## Componentes de un Solo Archivo (SFC) {#componentes-de-un-solo-archivo-sfc}

En la mayoría de los proyectos de Vue habilitados para herramientas de compilación, creamos componentes de Vue utilizando un formato de archivo similar a HTML llamado **Componente de un Solo Archivo** (también conocido como archivos `*.vue`, abreviado como **SFC**). Un SFC de Vue, como sugiere el nombre, encapsula la lógica del componente (JavaScript), la plantilla (HTML) y los estilos (CSS) en un solo archivo. Aquí está el ejemplo anterior, escrito en formato SFC:

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">El contador está en: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC es una característica definitoria de Vue y es la forma recomendada de crear componentes de Vue **si** tu caso de uso justifica una configuración de compilación. Puedes aprender más sobre el [cómo y por qué de SFC](/guide/scaling-up/sfc) en su sección dedicada, pero por ahora entiende que Vue se encargará de configurar todas las herramientas de compilación por ti.

## Tipos de API {#tipos-de-api}

Los componentes de Vue se pueden crear con dos tipos de API diferentes: **Options API** y **Composition API**.

### Options API {#options-api}

Con la Options API, definimos la lógica de un componente usando un objeto de opciones tales como `data`, `methods` y `mounted`. Las propiedades definidas por las opciones se exponen en el `this` dentro de las funciones, el cual apunta a la instancia del componente:

```vue
<script>
export default {
  // Las propiedades retornadas desde data() pasan a un estado
  // reactivo y serán mostradas en el `this`.
  data() {
    return {
      count: 0
    }
  },

  // Los métodos son funciones que mutan el estado y disparan
  // actualizaciones. Estos pueden ser ligados como eventos de
  // escucha en las plantillas.
  methods: {
    increment() {
      this.count++
    }
  },

  // Los hooks del ciclos de vida son llamados en diferentes
  // etapas del ciclo de vida del componente.
  // Esta función será llamada cuando el componente sea montado.
  mounted() {
    console.log(`El conteo inicial es ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">El conteo es de: {{ count }}</button>
</template>
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPkNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

### Composition API {#composition-api}

Con la Composition API, definimos la lógica de un componente utilizando funciones importadas de la API. En un SFC, la Composition API se usa normalmente con [`<script setup>`](/api/sfc-script-setup). El atributo `setup` es una indicación que hace que Vue realice transformaciones en tiempo de compilación, lo que nos permiten usar la Composition API con menos repeticiones. Por ejemplo, las importaciones y las variables/funciones de nivel superior declaradas en un `<script setup>` se pueden usar directamente en la plantilla.

Aquí está el mismo componente, con exactamente la misma plantilla, pero usando la Composition API y `<script setup>` en su lugar:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// estado reactivo
const count = ref(0)

// funciones que mutan el estado y disparan actualizaciones
function increment() {
  count.value++
}

// hooks del ciclo de vida
onMounted(() => {
  console.log(`El conteo inicial es ${count.value}.`)
})
</script>

<template>
  <button @click="increment">El conteo es de: {{ count }}</button>
</template>
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Q291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

### ¿Cuál elegir? {#cual-elegir}

Ambos estilos de API son totalmente capaces de cubrir casos de uso comunes. Son interfaces diferentes impulsadas por exactamente el mismo sistema subyacente. De hecho, ¡la Options API es implementada sobre la Composition API! Los conceptos y conocimientos fundamentales sobre Vue se comparten entre los dos estilos.

La Options API se centra en el concepto de una "instancia de componente" (`this` como viste en el ejemplo), que generalmente se alinea mejor con un modelo mental basado en clases para usuarios que provienen de entornos de lenguajes de POO. También es más amigable para principiantes al abstraer los detalles de reactividad y hacer cumplir la organización del código a través de grupos de opciones.

La Composition API se centra en la declaración de variables de estado reactivas directamente en el ámbito de una función y en la composición del estado de múltiples funciones para manejar juntas la complejidad. Tiene una forma más libre y requiere una comprensión de cómo funciona la reactividad en Vue para ser utilizada de manera efectiva. A cambio, su flexibilidad permite patrones más poderosos para organizar y reutilizar la lógica.

Puedes obtener más información sobre la comparación entre los dos estilos y los posibles beneficios de la Composition API en [FAQ sobre la Composition API](/guide/extras/composition-api-faq).

Si eres nuevo en Vue, esta es nuestra recomendación general:

- Para propósitos de aprendizaje, elige el estilo que te parezca más fácil de entender. Una vez más, la mayoría de los conceptos básicos se comparten entre los dos estilos. Siempre puedes tomar el otro estilo en cualquier momento.

- Para uso en producción:

  - Elije la Options API si no estás utilizando herramientas de compilación o planeas usar Vue principalmente en escenarios de baja complejidad; por ejemplo, para mejoras progresivas.

  - Elije la Composition API + Componentes de un Solo Archivo si planeas crear aplicaciones completas con Vue.

No tienes que comprometerte con un solo estilo durante la fase de aprendizaje. El resto de la documentación proporcionará muestras de código en ambos estilos cuando corresponda y puedes alternar entre ellos en cualquier momento usando el interruptor de **Preferencia de API** en la parte superior de la barra lateral izquierda.

## ¿Aún tienes preguntas? {#aun-tienes-preguntas}

Echa un vistazo a nuestra [FAQ](/about/faq).

## Elije tu ruta de aprendizaje {#elije-tu-ruta-de-aprendizaje}

Los diferentes desarrolladores tienen diferentes estilos de aprendizaje. Siéntete libre de elegir una ruta de aprendizaje que se adapte a tus preferencias, ¡aunque recomendamos revisar todo el contenido de ser posible!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Prueba el Tutorial</p>
    <p class="next-steps-caption">Para aquellos que prefieren aprender las cosas de forma práctica.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Lee la Guía</p>
    <p class="next-steps-caption">La guía te lleva a través de cada aspecto del framework con todos sus detalles.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Mira los Ejemplos</p>
    <p class="next-steps-caption">Explora ejemplos de las principales características y las tareas comunes de la UI.</p>
  </a>
</div>
