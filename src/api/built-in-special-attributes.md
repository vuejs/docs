# Atributos especiales integrados

## key

El atributo especial `key` es usado primeramente por el algoritmo de DOM virtual de Vue como una marca para identificar vnodes para comparar la nueva lista de nodos contra la antigua lista.

- **Espera:** `number | string | symbol`

- **Detalles**

  Sin las keys, Vue usa un algoritmo para minimizar el movimiento de los elementos y intenta parchar/reutilizar los elementos del mismo tipo tanto como sea posible. Con las keys, reordenará los elementos basado en el cambio de orden de las keys, y los elementos con keys que no estén presentes serán removidos / destruidos.

  Los elementos hijos que tengan el mismo ancestro en común deberpan tener **keys únicas**. La duplicación de keys dará como resultado errores en el renderizado.

  El caso de uso más común es usar la key con un `v-for`:

  ```vue-html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  También puede ser usado para forzar el reemplado de un elemento/componente en lugar de reusarlo. Esto puede ser útil cuando necesitas hacer:

  - Correcta activación de los hooks del ciclo de vida de un componente
  - Disparar transiciones

  Por ejemplo:

  ```vue-html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  Cuando `text` cambia, el elemento `<span>` será reemplazado en lugar de ser parchado, de modo que se activará la transición.

- **Ver también:** [Guía - Renderizado de Listas - Manteniendo el estado con `key`](/guide/essentials/list.html#manteniendo-el-estado-con-key)

## ref

Evoca a una [ref de la plantilla](/guide/essentials/template-refs.html).

- **Espera:** `string | Function`

- **Detalles**

  `ref` es usado para registrar una referencia a un elemento o a un componente hijo.

  En la Options API, la referencia será registrada bajo el objeto  `this.$refs` del componente0:

  ```vue-html
  <!-- almacenado como this.$refs.p -->
  <p ref="p">hello</p>
  ```

  En la Composition API, la referencia será almacenada en una ref con el mismo nombre:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const p = ref()
  </script>

  <template>
    <p ref="p">hello</p>
  </template>
  ```

  Si se usa en un elemento plano del DOM, la referencia será ese elemento; si se usa en un componente hijo, la referencia será la instancia de ese componente hijo.

  De forma al ternativa, `ref` puede aceptar como valor a una función que tenga el control de donde se va a almacenar la referencia:

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```

  Una nota importante sobre el tiempo de registración de las ref: ya que las refs en si mismas son creadas como resultado de la función de renderizado, debes esperar hasta que el componente esté montado antes de acceder a ellas.

  `this.$refs` es un objeto no reactivo, por lo que no debes intentar usarlo en la plantilla para hacer data-binding.

- **Ver también:** [Refs de la Plantilla](/guide/essentials/template-refs.html)

## is

Usado para vincular [componentes dinámicos](/guide/essentials/component-basics.html#dynamic-components).

- **Espera:** `string | Component`

- **Uso con elementos nativos** <sup class="vt-badge">3.1+</sup>

  Cuando el atributo `is` es usado en un elemento nativo de HTML, será interpretado como un [Elemento integrado personalizado](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example), que es una funcionalidad nativa de la web.

  Existe, sin embargo, un escenario donde tal vez necesites que Vue reemplace al elemento nativo por un componente de Vue, como se explica en [Advertencias sobre el Procesamiento de las Plantillas del DOM ](/guide/essentials/component-basics.html#advertencias-sobre-el-procesamiento-de-las-plantillas-del-dom). Puedes agregarle el prefijo `vue:` al valor del atributo `is` así Vue renderizará el elemento como un componente Vue en su lugar:

  ```vue-html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **Ver también:**

  - [Elementos Especiales Integrados - `<component>`](/api/built-in-special-elements.html#component)
  - [Componentes Dinámicos](/guide/essentials/component-basics.html#dynamic-components)
