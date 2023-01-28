# Globales de la API: General

## version

Expone la versión actual de Vue.

- **Tipo** `string`

- **Ejemplo**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick()

Una utilidad para esperar la próxima actualización del DOM.

- **Tipo**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **Detalles**

  Cuando se muta el estado reactivo en Vue, las actualizaciones del DOM resultantes no son aplicadas de forma sincrónica.
  En su lugar, Vue las almacena en el búfer hasta el "siguiente _tick_" para garantizar que cada componente se actualice sólo una vez, sin importar cuántos cambios de estado hayas realizado.

  `nextTick()` puede utilizarse inmediatamente después de un cambio de estado para esperar a que se completen las actualizaciones del DOM. Puedes pasar una función como argumento para ejecutarla al finalizar, o esperar (con _await_) la Promesa (Promise) devuelta.

- **Ejemplo**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // El DOM aún no ha sido actualizado
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // El DOM ahora está actualizado
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // DOM not yet updated
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // DOM is now updated
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **Ver también:** [`this.$nextTick()`](/api/component-instance.html#nexttick)

## defineComponent()

Un ayudante de tipo para definir un componente Vue con inferencia de tipo.

- **Tipo**

  ```ts
  function defineComponent(
    component: ComponentOptions | ComponentOptions['setup']
  ): ComponentConstructor
  ```

  > El tipo está simplificado para facilitar la lectura.

- **Detalles**

  El primer argumento espera un objeto de opciones del componente. El valor de retorno será el mismo objeto de opciones, ya que la función es esencialmente un no-op en tiempo de ejecución para propósitos de inferencia de tipo solamente.

  Tenga en cuenta que el tipo de retorno es un poco especial: será un tipo de constructor cuyo tipo de instancia es el tipo de instancia del componente inferido en base a las opciones. Esto será usado para la inferencia de tipo cuando el tipo devuelto se utiliza como una etiqueta en TSX.

  Puede extraer el tipo de instancia de un componente (equivalente al tipo de `this` en sus opciones) del tipo de retorno de `defineComponent()` así:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### Nota sobre el Treeshaking de webpack {#nota-sobre-el-treeshaking-de-webpack}

  Dado que `defineComponent()` es una llamada a una función, podría parecer que produce efectos secundarios a algunas herramientas de compilación, por ejemplo, webpack. Esto evitará que se aplique tree-shaken al componente incluso cuando el componente nunca se utilice .

  Para indicarle a webpack que esta llamada a la función es segura para el tree-shaken, puedes añadir una anotación de comentario `/*#__PURE__*/` antes de la llamada a la función:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  Tenga en cuenta que esto no es necesario si está utilizando Vite, porque Rollup (el bundler de producción subyacente utilizado por Vite) es lo suficientemente inteligente como para determinar que `defineComponent()` está de hecho libre de efectos secundarios sin necesidad de anotaciones manuales.

- **Ver también:** [Guía - Usando Vue con TypeScript](/guide/typescript/overview.html#general-usage-notes)

## defineAsyncComponent()

Define un componente asíncrono que se carga dinámicamente sólo cuando se renderiza. El argumento puede ser una función de carga o un objeto de opciones para un control más avanzado del comportamiento de carga.

- **Tipo**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **Ver también:** [Guía - Componentes Asíncronos](/guide/components/async.html)

## defineCustomElement()

Este método acepta el mismo argumento que [`defineComponent`](#definecomponent), pero en su lugar devuelve un constructor nativo de la clase [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

- **Tipo**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & { styles?: string[] })
      | ComponentOptions['setup']
  ): {
    new (props?: object): HTMLElement
  }
  ```

  > Tipo es simplificado para facilitar la lectura.

- **Detalles**

  Además de las opciones normales de los componentes, `defineCustomElement()` también soporta una opción especial `styles`, que debe ser una matriz de cadenas de reglas CSS, para proporcionar el CSS que debe inyectarse en la raíz de la sombra (shadow root) del elemento.

  El valor de retorno es un constructor de elemento personalizado que puede ser registrado usando [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define).

- **Ejemplo**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* opciones del componente */
  })

  // Registra el elemento personalizado
  customElements.define('my-vue-element', MyVueElement)
  ```

- **Ver también:**

  - [Guía - Construyendo Elementos Personalizados con Vue](/guide/extras/web-components.html#building-custom-elements-with-vue)

  - Tenga en cuenta también que `defineCustomElement()` requiere [configuración especial](/guide/extras/web-components.html#sfc-as-custom-element) cuando se utiliza con componentes de un solo archivo.
