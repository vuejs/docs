# Función de renderizado

## h()

Crea nodos DOM virtuales (vnodes).

- **Tipo**

  ```ts
  // firma completa
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // omitiendo las props
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > Los tipos se han simplificado para facilitar la lectura.

- **Detalles**

  El primer argumento puede ser una cadena (para elementos nativos) o una definición de componente de Vue. El segundo argumento son las props que se van a pasar, y el tercer argumento son los hijos.

  Al crear un componente vnode, los hijos deben pasarse como funciones de slot. Se puede pasar una función de slot única si el componente espera solo el slot por defecto. De lo contrario, los slots deben pasarse como un objeto de funciones de slot.

  Por conveniencia, el argumento de props puede omitirse cuando los hijos no son un objeto de slots.

- **Ejemplo**

  Creando elementos nativos:

  ```js
  import { h } from 'vue'

  // todos los argumentos, excepto el tipo, son opcionales
  h('div')
  h('div', { id: 'foo' })

  // tanto los atributos como las propiedades se pueden utilizar en props
  // Vue elige automáticamente la forma correcta de asignarlo
  h('div', { class: 'bar', innerHTML: 'hello' })

  // la clase y el estilo tienen el mismo objeto / array
  // soporta valores como en las plantillas
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // los escuchadores de eventos deben ser pasados como onXxx
  h('div', { onClick: () => {} })

  // los hijos pueden ser una cadena
  h('div', { id: 'foo' }, 'hello')

  // los props se pueden omitir cuando no hay props
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // el array de hijos puede contener una mezcla de vnodes y cadenas
  h('div', ['hello', h('span', 'hello')])
  ```

  Creando componentes:

  ```js
  import Foo from './Foo.vue'

  // pasando props
  h(Foo, {
    // el equivalente a some-prop="hello"
    someProp: 'hello',
    // el equivalente a @update="() => {}"
    onUpdate: () => {}
  })

  // pasando un único slot por defecto
  h(Foo, () => 'default slot')

  // pasando slots nombrados
  // observa que el `null` es necesario para evitar que
  // el objeto slots sea tratado como props
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **Véase también:** [Guía - Funciones de renderizado - Creando VNodes](/guide/extras/render-function.html#creando-vnodos)

## mergeProps()

Combina múltiples objetos de props con un manejo especial para ciertos props.

- **Tipo**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **Detalles**

  `mergeProps()` admite fusionar múltiples objetos de props con un manejo especial para los siguientes props:

  - `class`
  - `style`
  - `onXxx` escuchador de evento - múltiples escuchadores con el mismo nombre se fusionarán en un array.

  Si no necesitas el comportamiento de fusión y deseas una simple sobreescritura, puedes usar la propagación de objetos nativos en su lugar.

- **Ejemplo**

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## cloneVNode()

Clona un vnode.

- **Tipo**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **Detalles**

  Devuelve un vnode clonado, opcionalmente con props adicionales para fusionarlas con el original.

  Los vnodes deben considerarse inmutables una vez creados, y no debes mutar las props de un vnode existente. En su lugar, clónalo con props diferentes/adicionales.

  Los vnodes tienen propiedades internas especiales, por lo que clonarlos no es tan simple como propagar un objeto. `cloneVNode()` maneja la mayor parte de la lógica interna.

- **Ejemplo**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode()

Comprueba si un valor es un vnode.

- **Tipo**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## resolveComponent()

Para resolver manualmente un componente registrado por su nombre.

- **Tipo**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **Detalles**

  **Nota: no necesitas esto si puedes importar el componente directamente.**

  `resolveComponent()` debe llamarse dentro de <span class="composition-api"> `setup()` o</span> la función de renderizado para resolver desde el contexto correcto del componente.

  Si no se encuentra el componente, se emitirá una advertencia en tiempo de ejecución y se devolverá una cadena de texto con el nombre.

- **Ejemplo**

  <div class="composition-api">

  ```js
  const { h, resolveComponent } = Vue

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  const { h, resolveComponent } = Vue

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

  </div>

- **Véase también:** [Guía - Funciones de Renderizado - Componentes](/guide/extras/render-function.html#componentes)

## resolveDirective()

Para resolver manualmente una directiva registrada por su nombre.

- **Tipo**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **Detalles**

  **Nota: no necesitas esto si puedes importar el componente directamente.**

  `resolveDirective()` debe llamarse dentro de <span class="composition-api"> `setup()` o</span> la función de renderizado para resolver desde el contexto correcto del componente.

  Si no se encuentra la directiva, se emitirá una advertencia en tiempo de ejecución y la función devolverá `undefined`.

- **Véase también:** [Guía - Funciones de Renderizado - Directivas Personalizadas](/guide/extras/render-function.html#directivas-personalizadas)

## withDirectives()

Para añadir directivas personalizadas a los vnodes.

- **Tipo**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **Detalles**

  Envuelve un vnode existente con directivas personalizadas. El segundo argumento es un array de directivas personalizadas. Cada directiva personalizada también se representa como un array en forma de `[Directive, value, argument, modifiers]`. Los elementos de seguimiento del array se pueden omitir si no se necesitan.

- **Ejemplo**

  ```js
  import { h, withDirectives } from 'vue'

  // una directiva personalizada
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **Véase también:** [Guía - Funciones de Renderizado - Directivas Personalizadas](/guide/extras/render-function.html#directivas-personalizadas)

## withModifiers()

Para agregar [modificadores `v-on`](/guide/essentials/event-handling.html#modificadores-de-eventos) incorporados a una función manejadora de eventos.

- **Tipo**

  ```ts
  function withModifiers(fn: Function, modifiers: string[]): Function
  ```

- **Ejemplo**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // equivalente a v-on.stop.prevent
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **Véase también:** [Guía - Funciones de Renderizado - Modificadores de Eventos](/guide/extras/render-function.html#modificadores-de-eventos)
