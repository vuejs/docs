# Registro de Componentes

> Esta página supone que ya has leído los [Fundamentos de los Componentes](/guide/essentials/component-basics). Léelo primero si eres nuevo en el tema de componentes.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="Lección gratuita de Registro de Componentes de Vue.js"/>

Un componente de Vue necesita ser "registrado" para que Vue sepa dónde localizar su implementación cuando se encuentre en una plantilla. Hay dos maneras de registrar componentes: global y local.

## Registro Global

Podemos hacer que los componentes estén disponibles globalmente en la [aplicación Vue](/guide/essentials/application.html) actual usando el método `app.component()`:

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // el nombre registrado
  'MyComponent',
  // la implementación
  {
    /* ... */
  }
)
```

Si utilizas SFCs, registrarás los archivos `.vue` importados:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

El método `app.component()` puede ser encadenado:

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

Los componentes registrados globalmente pueden ser utilizados en la plantilla de cualquier componente dentro de esta aplicación:

```vue-html
<!-- esto funcionará en cualquier componente dentro de la aplicación -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

Esto se aplica incluso a todos los subcomponentes, lo que significa que estos tres componentes también estarán disponibles _dentro de cada uno_.

## Registro Local

Aunque es conveniente, el registro global tiene algunos puntos débiles:

1. El registro global impide que los sistemas de compilación eliminen los componentes no utilizados (también conocido como "tree-shaking"). Si registras globalmente un componente pero acabas por no utilizarlo en ninguna parte de tu aplicación, seguirá estando incluido en el bundle final.

2. El registro global hace que las relaciones de dependencia sean menos explícitas en aplicaciones grandes. Hace difícil localizar la implementación de un componente hijo desde un componente padre que lo utiliza. Esto puede afectar a la capacidad de mantenimiento a largo plazo de forma similar al uso de demasiadas variables globales.

El registro local limita la disponibilidad de los componentes registrados al componente actual. Hace que la relación de dependencia sea más explícita, y es más amigable con el árbol.

<div class="composition-api">

Cuando se utiliza SFC con `<script setup>`, los componentes importados pueden ser utilizados localmente sin necesidad de registro:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

En el caso de que no sea `<script setup>`, tendrás que utilizar la opción `components`:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

El registro local se realiza mediante la opción `components`:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

Para cada propiedad del objeto `components`, la clave será el nombre registrado del componente, mientras que el valor contendrá la implementación del componente. El ejemplo anterior utiliza la abreviatura de propiedades de ES2015 y es equivalente a:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

Ten en cuenta que **los componentes registrados localmente _no_ están disponibles también en los componentes descendientes**. En este caso, `ComponentA` estará disponible sólo para el componente actual, no para ninguno de sus componentes hijos o descendientes.

## Nomenclatura de los Componentes

A lo largo de la guía, utilizamos nombres PascalCase al registrar componentes. Esto se debe a que:

1. Los nombres PascalCase son identificadores válidos de JavaScript. Esto facilita la importación y el registro de componentes en JavaScript. También ayuda a los IDEs con el autocompletado.

2. `<PascalCase />` hace más obvio que se trata de un componente Vue en lugar de un elemento HTML nativo en las plantillas. También diferencia los componentes Vue de los elementos personalizados (componentes web).

Este es el estilo recomendado cuando se trabaja con plantillas SFC o de cadena. Sin embargo, como se discute en [Análisis de Advertencias de la Plantilla del DOM](/guide/essentials/component-basics.html#advertencias-sobre-el-procesamiento-de-las-plantillas-del-dom), las etiquetas PascalCase no son utilizables en las plantillas del DOM.

Por suerte, Vue soporta la resolución de etiquetas kebab-case a componentes registrados usando PascalCase. Esto significa que un componente registrado como `MyComponent` puede ser referenciado en la plantilla a través de `<MyComponent>` y `<my-component>`. Esto nos permite utilizar el mismo código de registro de componentes JavaScript independientemente de la fuente de la plantilla.
