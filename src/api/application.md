# API de la aplicación

## createApp()

Crea una instancia de la aplicación.

- **Tipo**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **Detalles**

  El primer argumento es el componente base. El segundo argumento (opcional) son las propiedades de dicho componente.

- **Ejemplo**

  Con un componente raíz en línea:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* componente base */
  })
  ```

  Importando un componente:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **Ver también:** [Guía - Creando una Aplicación Vue](/guide/essentials/application.html)

## createSSRApp()

Crea una instancia de la aplicación en modo [Renderizado del Lado del Servidor (SSR)](/guide/scaling-up/ssr.html#client-hydration). Su uso es exactamente igual a `createApp()`.

## app.mount()

Monta la instancia de la aplicación en un elemento contenedor.

- **Tipo**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **Detalles**

  El argumento puede ser tanto un elemento del DOM como un selector de CSS (el primer elemento que coincida será utilizado). Devuelve la instancia del componente raíz.

  Si el componente tiene una plantilla o una función de renderizado definida, reemplazará cualquier nodo DOM existente dentro del contendor. De lo contrario, si el compilador en tiempo de ejecución está disponible, el `innerHTML` del contenedor será usado como plantilla.

  En el modo de renderizado del lado del servidor (SSR), hidratará los nodos DOM existentes dentro del contenedor. Si hay [desajustes](/guide/scaling-up/ssr.html#error-en-la-hidratacion), los nodos DOM existentes se transformarán para que coincidan con la salida esperada.

  Por cada instancia de la aplicación, `mount()` solo puede ser usado una vez.

- **Ejemplo**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  Puede incluso montarse directamente sobre un elemento del DOM:

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount()

Desmonta una instancia de una aplicación montada, activando el hook del ciclo de vida unmount para todos los componentes en el árbol de componentes de la aplicación.

- **Tipo**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.provide()

Provee un valor que puede ser inyectado en todos sus componentes hijos dentro de la aplicación.

- **Tipo**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **Detalles**

  Espera la key de inyección como el primer argumento, y el valor provisto como el segundo. Devuelve la propia instancia de la aplicación.

- **Ejemplo**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'hello')
  ```

  Dentro de un componente en la aplicación:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'hola'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'hola'
    }
  }
  ```

  </div>

- **Ver también:**
  - [Provide / Inject](/guide/components/provide-inject.html)
  - [Nivel de Aplicación de Provide](/guide/components/provide-inject.html#nivel-de-aplicacion-de-provide)

## app.component()

Registra un componente global si se le pasa tanto un nombre como la definición del componente, o recupera uno ya registrado si solo se pasa el nombre.

- **Tipo**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **Ejemplo**

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // registra un componente con su definición
  app.component('my-component', {
    /* ... */
  })

  // recupera un componente registrado previamente
  const MyComponent = app.component('my-component')
  ```

- **Ver también:** [Registro de Componentes](/guide/components/registration.html)

## app.directive()

Registra una directiva personalizada global si se le pasa tanto un nombre y la definición de la directiva, o recupera una ya registrada si solo se pasa el nombre.

- **Tipo**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **Ejemplo**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // registro (directiva de objeto)
  app.directive('my-directive', {
    /* hooks de directiva personalizada */
  })

  // registro (directiva de función abreviada)
  app.directive('my-directive', () => {
    /* ... */
  })

  // recupera una directiva registrada previamente
  const myDirective = app.directive('my-directive')
  ```

- **Ver también:** [Directivas Personalizadas](/guide/reusability/custom-directives.html)

## app.use()

Instala un [plugin](/guide/reusability/plugins.html).

- **Tipo**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **Detalles**

  Espera el plugin como el primer argumento, y las opciones del plugin (opcional) como segundo argumento.

  El plugin puede ser tanto un objeto con un método `install()`, o solamente una función que sera usada como el método `install()`. Las opciones (el segundo argumento de `app.use()`) será pasado a través del método `install()` del plugin.

  Cuando `app.use()` es llamado con el mismo plugin varias veces, el plugin será instalado solo una vez.

- **Ejemplo**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **Ver también:** [Plugins](/guide/reusability/plugins.html)

## app.mixin()

Aplica un mixin global (con alcance a la aplicación). Un mixin global aplica sus opciones incluidas a cada instancia de componente en la aplicación.

:::warning No Recomendado
Los mixins están soportados en Vue 3 solo para mantener la compatibilidad hacia atrás, debido a su uso extendido en las librerías del ecosistema. El uso de mixins, en especial los mixins globales, debería evitarse en el código de la aplicación.

Para la reutilización de lógica, usar preferentemente [Composables](/guide/reusability/composables.html) en su lugar.
:::

- **Tipo**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.version

Proporciona la versión de Vue con la que se creó la aplicación. Esto es útil dentro de [plugins](/guide/reusability/plugins.html), donde podrías necesitar lógica condicional basada en diferentes versiones de Vue.

- **Tipo**

  ```ts
  interface App {
    version: string
  }
  ```

- **Ejemplo**

  Realizando una comprobación de la versión dentro de un plugin:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('This plugin requires Vue 3')
      }
    }
  }
  ```

- **Ver también:** [API Global - Versión](/api/general.html#version)

## app.config

Cada instancia de la aplicación expone un objeto `config` que contiene las opciones de configuración para esa aplicación. Puedes modificar sus propiedades (documentadas a continuación) antes de montar tu aplicación.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler

Asigna un manejador global para los errores no capturados que se propagan desde la aplicación.

- **Tipo**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` contiene información específica de errores de Vue,
      // ej. el hook del ciclo de vida donde se produjo el error
      info: string
    ) => void
  }
  ```

- **Detalles**

  El manejador de errores recibe tres argumentos: el error, la instancia del componente que disparó el error, y la información que especifica el tipo de fuente del error.

  Puede capturar errores de las siguientes fuentes:

  - Renderizado de los componentes
  - Manejadores de eventos
  - Hooks del ciclo de vida
  - La función `setup()`
  - Watchers
  - Hooks de directivas personalizadas
  - Hooks de transiciones

- **Ejemplo**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // manejo del error, ej. reportarlo a un servicio
  }
  ```

## app.config.warnHandler

Asigna un manejador personalizado para advertencias de vue en tiempo de ejecución.

- **Tipo**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **Detalles**

  El manejador de advertencias recibe el mensaje de advertencia como primer argumento, la instancia del componente como segundo argumento, y la cadena de componentes asociada en formato string como el tercero.

  Puede ser usado para filtrar advertencias específicas con el fin de reducir la verbosidad de la consola. Todas las advertencias de Vue deberían abordarse durante el desarrollo, por lo que sólo se recomienda durante las sesiones de depuración para centrarse en advertencias específicas entre muchas, y debe eliminarse una vez que la depuración haya terminado.

  :::tip
  Las advertencias solo aparecen durante el desarrollo, por lo que esta configuración es ignorada en el modo de producción.
  :::

- **Ejemplo**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` es la traza de jerarquía de los componentes
  }
  ```

## app.config.performance

Asigna este valor a `true` para activar el seguimiento del inicio del componente, compilación, renderizado y seguimiento de la performance en el panel rentimiento/tiempo de las herramientas del desarrollador en el navegador. Solo funciona en el modo desarrollo y en navegadores que soporten la API de [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark).

- **Tipo**: `boolean`

- **Ver también:** [Guía - Guía de Optimización del Rendimiento](/guide/best-practices/performance.html)

## app.config.compilerOptions

Configurar las opciones del compilador en tiempo de ejecución. Las opciones establecidas en este objeto se pasarán al compilador de plantillas del navegador y afectarán a todos los componentes de la aplicación configurada. Ten en cuenta que también puedes anular estas opciones por componente utilizando la opción [`compilerOptions`] (/api/options-rendering.html#compileroptions).

::: warning Importante
Esta opción de configuración solo es respetada cuando se usa la compilación completa (es decir, la compilación de `vue.js` que puede compilar plantillas en el navegador). Si estás usando la construcción en tiempo de ejecución con una configuración de construcción, las opciones del compilador deben ser pasadas a `@vue/compiler-dom` a través de las configuraciones de la herramienta de construcción.

- Para `vue-loader`: [Pasarlo a través de la opción `compilerOptions`](https://vue-loader.vuejs.org/options.html#compileroptions). Ver también [cómo configurarlo en `vue-cli`](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

- Para `vite`: [paralo a través de la opción `@vitejs/plugin-vue`](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#options).
  :::

### app.config.compilerOptions.isCustomElement

Especifica un método de comprobación para reconocer elementos nativos personalizados.

- **Type:** `(tag: string) => boolean`

- **Detalles**

  Debería devolver `true` si el tag debería ser tratado como un elemento nativo personalizado. Para el tag coincidente, Vue lo renderizará como un elemento nativo en lugar de intentar resolverlo como un componente Vue.

  Los tags nativos de HTML y SVG tags no necesitan ser tratados por esta función - El analizador sintáctivo de Vue los reconoce automáticamente.

- **Ejemplo**

  ```js
  // tratará todos los tags que empiecen con 'ion-' como elementos  personalizados
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **Ver también:** [Vue y Componentes Web](/guide/extras/web-components.html)

### app.config.compilerOptions.whitespace

Ajusta el comportamiento del manejo de los espacios en blanco de la plantilla.

- **Type:** `'condense' | 'preserve'`

- **Default:** `'condense'`

- **Detalles**

  Vue elimina / condensa los caracteres de espacios en blanco en las plantillas para producir una compilación más eficiente. La estrategia por defecto es "condense", con el siguiente comportamiento:

  1. Los espacios en blanco iniciales y finales dentro de un elemento se condensan en un solo espacio.
  2. Se eliminan los espacios en blanco entre los elementos que contienen nuevas líneas.
  3. Los espacios en blanco consecutivos en los nodos de texto se condensan en un solo espacio.

  Setear esta opción a `'preserve'` deshabilitará el punto (2) y el (3).

- **Ejemplo**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters

Ajusta los delimitadores utilizados para la interpolación del texto dentro de la plantilla.

- **Type:** `[string, string]`

- **Default:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **Detalles**

  Esto se utiliza normalmente para evitar conflictos con los frameworks del lado del servidor que también utilizan la sintaxis de "mostacho" o bigotes (doble llave).

- **Ejemplo**

  ```js
  // Delimitadores cambaidos al estilo de template strings de ES6
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments

Ajusta el tratamiento de los comentarios HTML en las plantillas.

- **Type:** `boolean`

- **Default:** `false`

- **Detalles**

  Por defecto, Vue eliminará los comentarios en producción. Si se establece esta opción como `true` se obligará a Vue a conservar los comentarios incluso en producción. Los comentarios siempre se conservan durante el desarrollo. Esta opción se utiliza normalmente cuando Vue se utiliza con otras bibliotecas que dependen de los comentarios HTML.

- **Ejemplo**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties

Un objeto que se puede utilizar para registrar propiedades globales a las que se puede acceder en cualquier instancia de componente dentro de la aplicación.

- **Tipo**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **Detalles**

  Este es un reemplazo de `Vue.prototype` de Vue 2 que ya no está presente en Vue 3. Al igual que con cualquier cosa global, esto debe ser utilizado con moderación.

  Si una propiedad global entra en conflicto con una propiedad privada de un componente, la propiedad privada del componente tendrá mayor prioridad.

- **Uso**

  ```js
  app.config.globalProperties.msg = 'hola'
  ```

  Esto hace que `msg` esté disponible dentro de cualquier plantilla de componente en la aplicación, y también en `this` de cualquier instancia de componente:

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'hola'
    }
  }
  ```

## app.config.optionMergeStrategies

Un objeto para definir las estrategias de mergeo para componentes personalizados.

- **Tipo**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **Detalles**

  Algunos plugins / bibliotecas añaden soporte para opciones de componentes personalizados (inyectando mixins globales). Estas opciones pueden requerir una lógica de mergeo especial cuando la misma opción necesita ser "mergeada" desde múltiples fuentes (por ejemplo, mixins o herencia de componentes).

  Se puede registrar una función de estrategia de mergeo para una opción personalizada asignándola al objeto `app.config.optionMergeStrategies` utilizando el nombre de la opción como clave.

  La función de estrategia de mergeo recibe el valor de esa opción definida en las instancias padre e hija como primer y segundo argumento, respectivamente.

- **Ejemplo**

  ```js
  const app = createApp({
    // propiedad interna
    msg: 'Vue',
    // propiedad de un mixin
    mixins: [
      {
        msg: 'Hola, '
      }
    ],
    mounted() {
      // propiedad mergeada expuesta en this.$options
      console.log(this.$options.msg)
    }
  })

  // define una estrategia de mergeo especial para `msg`
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // logs 'Hola, Vue'
  ```

- **Ver también:** [Instancia del componente - `$options`](/api/component-instance.html#options)
