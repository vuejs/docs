# Opciones: Renderizado

## template

Un modelo de cadena para el componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **Detalles**

  Una plantilla proporcionada a través de la opción `template` será compilada sobre la marcha en tiempo de ejecución. Sólo se admite cuando se utiliza una compilación de Vue que incluya el compilador de plantillas. El compilador de plantillas **NO** está incluido en las versiones de Vue que tienen la palabra `runtime` en sus nombres, por ejemplo `vue.runtime.esm-bundler.js`. Consulta la [guía de distribución de archivos](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) para obtener más detalles sobre las diferentes compilaciones.

  Si la cadena empieza por `#` se utilizará como `querySelector` y utilizará el `innerHTML` del elemento seleccionado como cadena de la plantilla. Esto permite que la plantilla fuente sea creada usando elementos nativos `<template>`.

  Si la opción `render` también está presente en el mismo componente, `template` será ignorada.

  Si el componente raíz de tu aplicación no tiene una opción `template` o `render` especificada, Vue intentará utilizar el `innerHTML` del elemento montado como plantilla en su lugar.

  :::warning Nota de seguridad
  Utilice únicamente fuentes de plantillas en las que pueda confiar. No utilice contenido proporcionado por otros usuarios como tu plantilla. Consulte la [Guía de Seguridad](/guide/best-practices/security.html#rule-no-1-never-use-non-trusted-templates) para más detalles.
  :::

## render

Una función que devuelve mediante programación el árbol DOM virtual del componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **Detalles:**

  `render` es una alternativa a las plantillas de cadena que permite aprovechar toda la potencia programática de JavaScript para declarar la salida de renderización del componente.

  Las plantillas precompiladas, por ejemplo las de los componentes de un solo archivo, se compilan en la opción `render` en el momento de la compilación. Si tanto `render` como `template` están presentes en un componente, `render` tendrá mayor prioridad.

- **Ver también:**
  - [Mecanismo de Renderizado](/guide/extras/rendering-mechanism.html)
  - [Funciones de Renderizado y JSX](/guide/extras/render-function.html)

## compilerOptions

Configurar las opciones del compilador en tiempo de ejecución para la plantilla del componente.

- **Tipo**

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // valor por defecto: 'condense'
      delimiters?: [string, string] // valor por defecto: ['{{', '}}']
      comments?: boolean // default: false
    }
  }
  ```

- **Detalles**

  Esta opción de configuración sólo se respeta cuando se utiliza la compilación completa (es decir, el `vue.js` independiente que puede compilar plantillas en el navegador). Éste soporta las mismas opciones que aquellas en el nivel de la aplicación [app.config.compilerOptions] (/api/application.html#app-config-compileroptions), y tiene mayor prioridad para el componente actual.

- **Ver también:** [app.config.compilerOptions](/api/application.html#app-config-compileroptions)
