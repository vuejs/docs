---
outline: deep
---

# Usando Vue con TypeScript {#usando-vue-con-typescript}

Un sistema de tipos como TypeScript puede detectar muchos errores comunes a través del análisis estático en tiempo de desarrollo. Esto reduce la posibilidad de que se produzcan errores en tiempo de ejecución en producción, y también nos permite refactorizar con más confianza el código en aplicaciones a gran escala. TypeScript también mejora la ergonomía del desarrollador a través del autocompletado basado en tipos en los IDE.

Vue está escrito en TypeScript y proporciona soporte de primera clase para TypeScript. Todos los paquetes oficiales de Vue vienen con declaraciones de tipo incluidas que deberían funcionar desde el primer momento.

## Configuración del Proyecto

[`create-vue`](https://github.com/vuejs/create-vue), la herramienta oficial de creación de proyectos, ofrece las opciones para crear un proyecto Vue preparado para TypeScript.

### Generalidades

Con una configuración basada en Vite, el servidor de desarrollo y el bundler sólo transpilan y no realizan ninguna comprobación de tipo. Esto asegura que el servidor de desarrollo de Vite se mantenga muy rápido, incluso cuando se utiliza TypeScript.

- Durante el desarrollo, recomendamos confiar en una buena [configuración del IDE](#soporte-de-ide) para obtener retroalimentación instantánea sobre los errores de tipo.

- Si se utilizan SFCs, usa la utilidad [`vue-tsc`](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) para la comprobación de tipos en la línea de comandos y la generación de declaraciones de tipos. `vue-tsc` es una capa que envuelve a `tsc`, la propia interfaz de línea de comandos de TypeScript. Funciona en gran medida igual que `tsc` excepto que soporta los SFCs de Vue además de los archivos de TypeScript. Puedes ejecutar `vue-tsc` en modo watch en paralelo al servidor de desarrollo de Vite, o utilizar un plugin de Vite como [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) que ejecuta las comprobaciones en un hilo de trabajo separado.

- Vue CLI también proporciona soporte para TypeScript, pero ya no se recomienda. Ver [notas abajo](#note-on-vue-cli-and-ts-loader).

### Soporte de IDE

- Se recomienda encarecidamente [Visual Studio Code](https://code.visualstudio.com/) (VSCode) por su gran compatibilidad con TypeScript.

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) es la extensión oficial de VSCode que proporciona soporte para TypeScript dentro de las SFC de Vue, junto con muchas otras grandes características.

::: tip
Volar sustituye a [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), nuestra anterior extensión oficial de VSCode para Vue 2. Si tiene Vetur instalado actualmente, asegúrese de desactivarlo en los proyectos de Vue 3.
:::

- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) también es necesario para obtener soporte de tipo para las importaciones `*.vue` en los archivos TS.

- [WebStorm](https://www.jetbrains.com/webstorm/) también proporciona soporte inmediato para TypeScript y Vue. Otros IDEs de JetBrains también los soportan, ya sea de forma inmediata o a través de [un plugin gratuito](https://plugins.jetbrains.com/plugin/9442-vue-js).

### Configuración de `tsconfig.json`.

Los proyectos creados a través de `create-vue` incluyen `tsconfig.json` preconfigurado. La configuración base se abstrae en el paquete [`@vue/tsconfig`](https://github.com/vuejs/tsconfig). Dentro del proyecto, utilizamos [Referencias del Proyecto](https://www.typescriptlang.org/docs/handbook/project-references.html) para asegurar tipos correctos para el código que se ejecuta en diferentes entornos (por ejemplo, el código de la aplicación y el código de prueba deben tener diferentes variables globales).

Al configurar `tsconfig.json` manualmente, algunas opciones significativas son:

- [`compilerOptions.isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) se establece en `true` porque Vite utiliza [esbuild](https://esbuild.github.io/) para transpilar TypeScript y está sujeto a las limitaciones de transpilación de un solo archivo.

- Si estás usando la Options API, necesitas establecer [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) a `true` (o al menos activar [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis), que es una parte de la bandera `strict`) para aprovechar la comprobación de tipo de `this` en las opciones de los componentes. En caso contrario, `this` será tratado como `any`.

- Si has configurado alias de resolución en tu herramienta de construcción, por ejemplo el alias `@/*` configurado por defecto en un proyecto `create-vue`, necesitas configurarlo también para TypeScript a través de [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths).

Mira también:

- [Documentación oficial sobre las opciones del compilador de TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [Advertencias sobre la compilación de TypeScript en esbuild](https://esbuild.github.io/content-types/#typescript-caveats)

### Modo de Adquisición de Volar

> Esta sección sólo se aplica a VSCode + Volar.

Para conseguir que los SFCs de Vue y TypeScript funcionen juntos, Volar crea una instancia independiente del servicio de lenguaje TS modificada con soporte específico para Vue, y la utiliza en los SFCs de Vue. Al mismo tiempo, los archivos TS planos siguen siendo manejados por el servicio de lenguaje TS incorporado de VSCode, por lo que necesitamos [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) para soportar las importaciones de SFC de Vue en los archivos TS. Esta configuración por defecto funciona, pero para cada proyecto estamos ejecutando dos instancias del servicio de lenguaje TS: una de Volar, otra del servicio incorporado de VSCode. Esto es un poco ineficiente y puede conducir a problemas de rendimiento en proyectos grandes.

Volar proporciona una función llamada "Modo de Adquisición (Takeover Mode" para mejorar el rendimiento. En el modo Takeover, Volar proporciona soporte para archivos Vue y TS utilizando una única instancia de servicio de lenguaje TS.

Para habilitar el modo Takeover, debes desactivar el servicio de lenguaje TS incorporado en VSCode **sólo en el espacio de trabajo de tu proyecto** siguiendo estos pasos:

1. En el espacio de trabajo de tu proyecto, abre la paleta de comandos con `Ctrl + Shift + P` (macOS: `Cmd + Shift + P`).
2. Escribe `built` y selecciona "Extensiones: Mostrar Extensiones Integradas".
3. Escribe `typescript` en el cuadro de búsqueda de extensiones (no elimines el prefijo `@builtin`).
4. Haz clic en el pequeño icono del engranaje de "Características del Lenguaje TypeScript y JavaScript", y selecciona "Desactivar (espacio de trabajo)".
5. Vuelve a cargar el espacio de trabajo. El modo takeover se habilitará cuando abras un archivo Vue o TS.

<img src="./images/takeover-mode.png" width="590" height="426" style="margin:0px auto;border-radius:8px">

### Nota sobre Vue CLI y `ts-loader`

En las configuraciones basadas en webpack, como Vue CLI, es común realizar la comprobación de tipos como parte del proceso de transformación del módulo, por ejemplo con `ts-loader`. Esto, sin embargo, no es una solución limpia porque el sistema de tipos necesita conocer todo el esquema del módulo para realizar la comprobación de tipos. El paso de transformación de un módulo individual simplemente no es el lugar adecuado para la tarea. Esto lleva a los siguientes problemas:

- `ts-loader` sólo puede comprobar el tipo de código posterior a la transformación. Esto no se alinea con los errores que vemos en los IDEs o desde `vue-tsc`, que mapean directamente de vuelta al código fuente.

- La comprobación de tipos puede ser lenta. Cuando se realiza en el mismo hilo / proceso con las transformaciones de código, se afecta significativamente la velocidad de construcción de toda la aplicación.

- Ya tenemos la comprobación de tipos ejecutada en nuestro IDE en un proceso separado, por lo que el costo de la ralentización de la experiencia de desarrollo simplemente no es una buena compensación.

Si estás usando Vue 3 + TypeScript a través de Vue CLI, te recomendamos encarecidamente que migres a Vite. También estamos trabajando en las opciones de la CLI para habilitar el soporte de TS sólo transpilable, para que puedas cambiar a `vue-tsc` para la comprobación de tipos.

## Notas de Uso General

### `defineComponent()`

Para permitir que TypeScript infiera correctamente los tipos dentro de las opciones de los componentes, necesitamos definir los componentes con [`defineComponent()`](/api/general.html#definecomponent):

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // inferencia de tipo habilitada
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // type: string | undefined
    this.msg // type: string
    this.count // type: number
  }
})
```

`defineComponent()` también permite inferir las props pasadas a `setup()` cuando se utiliza la Composition API sin `<script setup>`:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // inferencia de tipo habilitada
  props: {
    message: String
  },
  setup(props) {
    props.message // type: string | undefined
  }
})
```

Mira también:

- [Nota sobre webpack Treeshaking](/api/general.html#note-on-webpack-treeshaking)
- [Pruebas de tipo para `defineComponent`](https://github.com/vuejs/core/blob/main/test-dts/defineComponent.test-d.tsx)

::: tip
`defineComponent()` también permite la inferencia de tipos para componentes definidos en JavaScript plano.
:::

### Uso en Componentes de un Solo Archivo

Para utilizar TypeScript en SFCs, añada el atributo `lang="ts"` a las etiquetas `<script>`. Cuando el atributo `lang="ts"` está presente, todas las expresiones de la plantilla también disfrutan de una comprobación de tipos más estricta.

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 1
    }
  }
})
</script>

<template>
  <!-- comprobación de tipo y autocompletado activados -->
  {{ count.toFixed(2) }}
</template>
```

`lang="ts"` también puede utilizarse con `<script setup>`:

```vue
<script setup lang="ts">
// TypeScript habilitado
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <!-- comprobación de tipo y autocompletado activados -->
  {{ count.toFixed(2) }}
</template>
```

### TypeScript en Plantillas

La `<template>` también soporta TypeScript en expresiones vinculadas cuando se utiliza `<script lang="ts">` o `<script setup lang="ts">`. Esto es útil en los casos en los que se necesita realizar un control de tipos en las expresiones de las plantillas.

He aquí un ejemplo ficticio:

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- error porque x podría ser una cadena de texto -->
  {{ x.toFixed(2) }}
</template>
```

Esto se puede solucionar con un control de tipos en línea:

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip
Si se utiliza Vue CLI o una configuración basada en webpack, TypeScript requiere `vue-loader@^16.8.0` en las expresiones de plantilla.
:::

## Recomendaciones Específicas de la API

- [TS con Composition API](./composition-api)
- [TS con Options API](./options-api)
