# Elementos Especiales Integrados

:::info No Son Componentes
`<component>` y `<slot>` tienen características similares a los componentes y forman parte de la sintaxis de la plantilla. No son verdaderos componentes y se compilan aparte durante la compilación de la plantilla. Como tales, se escriben convencionalmente con minúsculas.
:::

## `<component>`

Un "meta componente" para renderizar componentes dinámicos o elementos HTML.

- **Props**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **Detalles**

  El componente que se va a renderizar es determinado por la propiedad `is`.

  - Cuando la propiedad `is` es un string, puede ser tanto un tag de HTML como un componente.

  - Como alternativa, a `is` también se le puede pasar la definición de un compomente.

- **Ejemplo**

  Renderizando componentes con base en su nombre (Options API):

  ```vue
  <script>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: { Foo, Bar },
    data() {
      return {
        view: 'Foo'
      }
    }
  }
  </script>

  <template>
    <component :is="view" />
  </template>
  ```

  Renderizando componentes con base en su definición (Composition API con `<script setup>`):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  Renderizando elementos HTML:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  Los [componentes integrados](./built-in-components.html) pueden usarse con `is`, pero los tienes que registrar si quieres referenciarlos por el nombre. Por ejemplo:

  ```vue
  <script>
  import { Transition, TransitionGroup } from 'vue'

  export default {
    components: {
      Transition,
      TransitionGroup
    }
  }
  </script>

  <template>
    <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
      ...
    </component>
  </template>
  ```

  El registro no es necesario si pasas el componente directo a `is` en lugar de su nombre, por ejemplo, en `<script setup>`.

  Si `v-model` es usado en un tag `<component>`, el compilador de la plantilla lo transformará en la propiedad `modelValue` y en  `update:modelValue` para escuchar el evento, tal y como sucedería con cualquier otro componente. Sin embargo, esto no será compatible con elementos nativos de HTML, tales como `<input>` o `<select>`. Como resultado, usar `v-model` con un elemento nativo creado dinámicamente no funcionará: 

  ```vue
  <script setup>
  import { ref } from 'vue'
  
  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- Esto no funcionará ya que 'input' es un elemento de HTML nativo -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  En la práctica, este es un caso poco probable ya que los componentes de formluario nativos de HTML por lo general se usan dentro de componentes en una aplicación real. De ser necesario el uso de un elemento nativo puedes desglosar el `v-model` en un atributo y un evento de forma manual.

- **Ver también:** [Componentes Dinámicos](/guide/essentials/component-basics.html#componentes-dinamicos)

## `<slot>`

Denotes slot content outlets in templates.

- **Props**

  ```ts
  interface SlotProps {
    /**
     * Cualquier props pasada a <slot> pasará como argumento
     * para los slots con ámbito
     */
    [key: string]: any
    /**
     * Reservado para especificar el nombre del slot.
     */
    name?: string
  }
  ```

- **Detalles**

  El elemento `<slot>` puede usar el atributo `name` para especificar el nombre de un slot. Cuando no se especifica nada en el atributo `name`, el slot por defecto será renderizado. Atributos adicionales pasados al elemento slot serán pasados al como propiedades del slot al slot con ámbito definido en el padre.

  El propio elemento será sustituido por el contenido del slot correspondiente.

  Los elementos `<slot>` son compilados a Javascript en las plantillas de Vue, por eso no deben ser confundidos con [el elemento `<slot>` nativo0](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).

- **Ver también:** [Componentes - Slots](/guide/components/slots.html)
