---
outline: deep
---

# Mecanismo de Renderizado

¿Cómo toma Vue una plantilla y la convierte en verdaderos nodos del DOM? ¿Cómo actualiza Vue esos nodos del DOM de forma eficiente? Intentaremos arrojar algo de luz sobre estas preguntas aquí, sumergiéndonos en el mecanismo de renderizado interno de Vue.

## Virtual DOM

Probablemente hayas oído hablar del término virtual DOM, en el que se basa el sistema de renderizado de Vue.

El virtual DOM (VDOM) es un concepto de programación en el que una representación ideal, o "virtual", de una interfaz de usuario se mantiene en la memoria y se sincroniza con el DOM "real". El concepto fue introducido por [React](https://reactjs.org/), y ha sido adaptado en muchos otros frameworks con diferentes implementaciones, incluyendo Vue.

El virtual DOM es más un patrón que una tecnología específica, por lo que no hay una implementación canónica. Podemos ilustrar la idea con un ejemplo sencillo:

```js
const vnode = {
  type: 'div',
  props: {
    id: 'hola'
  },
  children: [
    /* más vnodes */
  ]
}
```

Aquí, `vnode` es un objeto JavaScript plano (un "nodo virtual") que representa un elemento `<div>`. Contiene toda la información que necesitamos para crear el elemento real. También contiene más vnodes hijos, lo que lo convierte en la raíz de un árbol del virtual DOM.

Un renderizador en tiempo de ejecución puede recorrer un árbol del virtual DOM y construir un árbol real del DOM a partir de él. Este proceso se llama **mount**.

Si tenemos dos copias de árboles virtuales del DOM, el renderizador también puede recorrer y comparar los dos árboles, determinando las diferencias, y aplicar esos cambios al DOM real. Este proceso se llama **patch**, también conocido como "diffing" o "reconciliación".

El principal beneficio del virtual DOM es que da al desarrollador la posibilidad de crear, inspeccionar y componer mediante programación las estructuras de UI deseadas de forma declarativa, mientras que deja la manipulación directa del DOM al renderizador.

## Proceso de Renderizado

A alto nivel, esto es lo que ocurre cuando se monta un componente Vue:

1. **Compile**: Las plantillas Vue se compilan en **funciones de renderizado**: funciones que devuelven árboles virtuales del DOM. Este paso se puede hacer antes de tiempo a través de un paso de compilación, o sobre la marcha utilizando el compilador en tiempo de ejecución.

2. **Mount**: El renderizador en tiempo de ejecución invoca las funciones de renderización, recorre el árbol del virtual DOM devuelto y crea nodos reales del DOM basados en él. Este paso se realiza como un [efecto reactivo](./reactivity-in-depth), por lo que mantiene un registro de todas las dependencias reactivas que se utilizaron.

3. **Patch**: Cuando una dependencia utilizada durante el montaje cambia, el efecto se vuelve a ejecutar. Esta vez, se crea un nuevo árbol del virtual DOM actualizado. El renderizador en tiempo de ejecución recorre el nuevo árbol, lo compara con el antiguo y aplica las actualizaciones necesarias al DOM real.

![línea de renderizado](./images/render-pipeline.png)

<!-- https://www.figma.com/file/elViLsnxGJ9lsQVsuhwqxM/Rendering-Mechanism -->

## Plantillas vs. Funciones de Renderizado

Las plantillas de Vue se compilan en funciones de renderizado del virtual DOM. Vue también proporciona APIs que nos permiten omitir el paso de compilación de plantillas y crear directamente funciones de renderizado. Las funciones de renderización son más flexibles que las plantillas cuando se trata de una lógica altamente dinámica, porque se puede trabajar con vnodos utilizando toda la potencia de JavaScript.

Entonces, ¿por qué Vue recomienda las plantillas por defecto? Hay varias razones:

1. Las plantillas están más cerca del HTML real. Esto facilita la reutilización de snippets de HTML existentes, la aplicación de las mejores prácticas de accesibilidad, estilos con CSS y la comprensión y modificación por parte de los diseñadores.

2. Las plantillas son más fáciles de analizar estáticamente debido a su sintaxis más determinista. Esto permite que el compilador de plantillas de Vue aplique muchas optimizaciones en tiempo de compilación para mejorar el rendimiento del virtual DOM (del que hablaremos más adelante).

En la práctica, las plantillas son suficientes para la mayoría de los casos de uso en las aplicaciones. Las funciones de renderizado se utilizan normalmente sólo en componentes reutilizables que necesitan tratar con una lógica de renderizado altamente dinámica. El uso de las funciones de renderizado se discute con más detalle en [Funciones de Renderizado y JSX](./render-function).

## El Virtual DOM Informado por el Compilador

La implementación del virtual DOM en React y la mayoría de las otras implementaciones del virtual DOM son puramente de tiempo de ejecución: el algoritmo de reconciliación no puede hacer ninguna suposición sobre el árbol del virtual DOM entrante, así que tiene que atravesar completamente el árbol y difundir las props de cada vnode para asegurar la corrección. Además, aunque una parte del árbol no cambie nunca, siempre se crean nuevos nodos virtuales para ellos en cada nueva renderización, lo que supone una carga de memoria innecesaria. Este es uno de los aspectos más criticados de los virtual DOM: el proceso de reconciliación, un tanto forzado, sacrifica la eficiencia a cambio de la declaratividad y la corrección.

Pero no tiene por qué ser así. En Vue, el framework controla tanto el compilador como el tiempo de ejecución. Esto nos permite implementar muchas optimizaciones en tiempo de compilación que sólo un renderizador estrechamente acoplado puede aprovechar. El compilador puede analizar estáticamente la plantilla y dejar pistas en el código generado para que el tiempo de ejecución pueda tomar atajos siempre que sea posible. Al mismo tiempo, conservamos la capacidad de que el usuario baje a la capa de funciones de renderizado para tener un control más directo en los casos extremos. Llamamos a este enfoque híbrido **Virtual DOM Informado por el Compilador**.

A continuación, discutiremos algunas de las principales optimizaciones realizadas por el compilador de plantillas de Vue para mejorar el rendimiento del virtual DOM en tiempo de ejecución.

### Hoisting Estático

A menudo habrá partes en una plantilla que no contengan ningún enlace dinámico:

```vue-html{2-3}
<div>
  <div>foo</div> <!-- elevado -->
  <div>bar</div> <!-- elevado -->
  <div>{{ dynamic }}</div>
</div>
```

[Inspeccionar en el Explorador de Plantillas](https://vue-next-template-explorer.netlify.app/#eyJzcmMiOiI8ZGl2PlxuICA8ZGl2PmZvbzwvZGl2PlxuICA8ZGl2PmJhcjwvZGl2PlxuICA8ZGl2Pnt7IGR5bmFtaWMgfX08L2Rpdj5cbjwvZGl2PiIsInNzciI6ZmFsc2UsIm9wdGlvbnMiOnsiaG9pc3RTdGF0aWMiOnRydWV9fQ==)

Los divs `foo` y `bar` son estáticos; no es necesario volver a crear los vnodes y diferenciarlos en cada renderización. El compilador de Vue eleva (hoists) automáticamente sus llamadas de creación de vnodos fuera de la función de renderizado, y reutiliza los mismos vnodos en cada renderizado. El renderizador también es capaz de omitir por completo la diferenciación de los vnodos cuando se da cuenta de que el antiguo y el nuevo vnodos son el mismo.

Además, cuando hay suficientes elementos estáticos consecutivos, se condensan en un único "vnode estático" que contiene la cadena HTML simple para todos estos nodos ([Ejemplo](https://vue-next-template-explorer.netlify.app/#eyJzcmMiOiI8ZGl2PlxuICA8ZGl2IGNsYXNzPVwiZm9vXCI+Zm9vPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb29cIj5mb288L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvb1wiPmZvbzwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZm9vXCI+Zm9vPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb29cIj5mb288L2Rpdj5cbiAgPGRpdj57eyBkeW5hbWljIH19PC9kaXY+XG48L2Rpdj4iLCJzc3IiOmZhbHNlLCJvcHRpb25zIjp7ImhvaXN0U3RhdGljIjp0cnVlfX0=)). Estos vnodos estáticos son montados directamente estableciendo `innerHTML`. También se almacenan en caché sus correspondientes nodos DOM en el montaje inicial; si la misma pieza de contenido se reutiliza en otra parte de la aplicación, los nuevos nodos del DOM se crean utilizando la función nativa `cloneNode()`, que es extremadamente eficiente.

### Banderas de Parches

Para un único elemento con enlaces dinámicos, también podemos inferir mucha información de él en tiempo de compilación:

```vue-html
<!-- solo vinculación de clases -->
<div :class="{ active }"></div>

<!-- solo vinculación de id y valor -->
<input :id="id" :value="value">

<!-- solo texto hijo -->
<div>{{ dynamic }}</div>
```

[Inspeccionar en el Explorador de Plantillas](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2IDpjbGFzcz1cInsgYWN0aXZlIH1cIj48L2Rpdj5cblxuPGlucHV0IDppZD1cImlkXCIgOnZhbHVlPVwidmFsdWVcIj5cblxuPGRpdj57eyBkeW5hbWljIH19PC9kaXY+Iiwib3B0aW9ucyI6e319)

Al generar el código de la función de renderizado para estos elementos, Vue codifica el tipo de actualización que necesita cada uno de ellos directamente en la llamada de creación del vnode:

```js{3}
createElementVNode("div", {
  class: _normalizeClass({ active: _ctx.active })
}, null, 2 /* CLASE */)
```

El último argumento, `2`, es una [bandera de parche (patch flag)](https://github.com/vuejs/core/blob/main/packages/shared/src/patchFlags.ts). Un elemento puede tener múltiples banderas de parche, que se fusionarán en un solo número. El renderizador en tiempo de ejecución puede entonces comprobar las banderas utilizando [operaciones de bitwise](https://en.wikipedia.org/wiki/Bitwise_operation) para determinar si es necesario hacer cierto trabajo:

```js
if (vnode.patchFlag & PatchFlags.CLASS /* 2 */) {
  // actualizar la clase del elemento
}
```

Las comprobaciones Bitwise son extremadamente rápidas. Con las banderas de parche, Vue es capaz de hacer la menor cantidad de trabajo necesario cuando se actualizan elementos con enlaces dinámicos.

Vue también codifica el tipo de hijos que tiene un vnode. Por ejemplo, una plantilla que tiene múltiples nodos raíz se representa como un fragmento. En la mayoría de los casos, sabemos con certeza que el orden de estos nodos raíz nunca cambiará, por lo que esta información también se puede proporcionar al tiempo de ejecución como una bandera de parche:

```js{4}
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* hijos */
  ], 64 /* FRAGMENTO_ESTABLE */))
}
```

De este modo, el tiempo de ejecución puede omitir por completo la reconciliación del orden de los hijos para el fragmento raíz.

### Aplanamiento de Árboles

Si volvemos a ver el código generado en el ejemplo anterior, nos daremos cuenta de que la raíz del árbol del virtual DOM devuelto se crea mediante una llamada especial `createElementBlock()`:

```js{2}
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* hijos */
  ], 64 /* FRAGMENTO_ESTABLE */))
}
```

Conceptualmente, un "bloque" es una parte de la plantilla que tiene una estructura interna estable. En este caso, toda la plantilla tiene un solo bloque porque no contiene directivas estructurales como `v-if` y `v-for`.

Cada bloque sigue los nodos descendientes (no sólo los hijos directos) que tienen banderas de parche. Por ejemplo:

```vue-html{3,5}
<div> <!-- bloque raíz -->
  <div>...</div>         <!-- no rastreado -->
  <div :id="id"></div>   <!-- rastreado -->
  <div>                  <!-- no rastreado -->
    <div>{{ bar }}</div> <!-- rastreado -->
  </div>
</div>
```

El resultado es un array aplanado que contiene sólo los nodos descendientes dinámicos:

```
div (bloque raíz)
- div con :id vinculado
- div con {{ bar }} vinculado
```

Cuando este componente necesita volver a renderizar, sólo necesita atravesar el árbol aplanado en lugar del árbol completo. Esto se denomina **Aplanamiento del Árbol**, y reduce en gran medida el número de nodos que hay que recorrer durante la reconciliación del virtual DOM. Cualquier parte estática de la plantilla se omite efectivamente.

Las directivas `v-if` y `v-for` crearán nuevos nodos de bloque:

```vue-html
<div> <!-- bloque raíz -->
  <div>
    <div v-if> <!-- bloque if -->
      ...
    <div>
  </div>
</div>
```

Un bloque hijo es rastreado dentro de la matriz de descendientes dinámicos del bloque padre. De este modo se mantiene una estructura estable para el bloque padre.

### Impacto sobre la Hidratación del SSR

Tanto las banderas de parche como el aplanamiento del árbol mejoran en gran medida el rendimiento la [Hidratación del SSR](/guide/scaling-up/ssr.html#hidratacion-del-cliente) de Vue:

- La hidratación de un solo elemento puede tomar rutas rápidas basadas en la bandera de parche del vnode correspondiente.

- Sólo los nodos de bloque y sus descendientes dinámicos necesitan ser atravesados durante la hidratación, logrando efectivamente una hidratación parcial a nivel de plantilla.
