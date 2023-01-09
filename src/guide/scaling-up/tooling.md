# Herramientas

## Pruébalo en Línea

No necesitas instalar nada en tu máquina para probar los SFC de Vue: hay una zona de prácticas en línea que te permite hacerlo directamente en el navegador:

- [Zona de práctica de SFC de Vue](https://sfc.vuejs.org)
  - Siempre se despliega desde el último commit
  - Diseñada para inspeccionar los resultados de la compilación de los componentes
- [Vue + Vite en StackBlitz](https://vite.new/vue)
  - Entorno tipo IDE ejecutando el servidor de desarrollo de Vite en el navegador
  - Lo más parecido a la configuración local

También se recomienda utilizar estas zonas de práctica en línea para proveer reproducciones cuando se reporten errores.

## Andamiaje de Proyectos

### Vite

[Vite](https://vitejs.dev/) es una herramienta de construcción ligera y rápida con soporte de primera clase para los SFC de Vue. ¡Está creado por Evan You, quien también es el autor de Vue!

Para empezar con Vite + Vue, simplemente ejecuta:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">$</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

Este comando instalará y ejecutará [create-vue](https://github.com/vuejs/create-vue), la herramienta oficial de andamiaje de proyectos de Vue.

- Para saber más sobre Vite, consulta la [documentación de Vite](https://es.vitejs.dev/).
- Para configurar el comportamiento específico de Vue en un proyecto de Vite, por ejemplo, pasando opciones al compilador de Vue, consulta la documentación de [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#readme).

Las dos zonas de práctica mencionadas arriba, también soportan la descarga de archivos como un proyecto de Vite.

### Vue CLI

[Vue CLI](https://cli.vuejs.org/) es el conjunto de herramientas oficial basada en webpack para Vue. Ahora está en modo de mantenimiento y recomendamos comenzar los nuevos proyectos con Vite a menos que dependas de características específicas de webpack. Vite proporcionará una experiencia de desarrollo superior en la mayoría de los casos.

Para información sobre la migración de Vue CLI a Vite:

- [Vue CLI -> Guía de migración a Vite de VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Herramientas / Complementos que ayudan a la migración automática](https://github.com/vitejs/awesome-vite#vue-cli)

### Nota sobre la Compilación de Plantillas en el Navegador

Cuando se utiliza Vue sin un paso de compilación, las plantillas de los componentes se escriben directamente en el HTML de la página o como cadenas de texto de JavaScript en línea. En estos casos, Vue necesita enviar el compilador de plantillas al navegador para realizar la compilación de las plantillas sobre la marcha. Por otro lado, el compilador sería innecesario si compilamos previamente las plantillas con un paso de compilación. Para reducir el tamaño del paquete del cliente, Vue provee [diferentes "compilaciones"](https://unpkg.com/browse/vue@3/dist/) optimizadas para diferentes casos de uso.

- Los archivos de compilación que comienzan con `vue.runtime.*` son **compilaciones sólo en tiempo de ejecución**: no incluyen el compilador. Cuando se utilizan estas compilaciones, todas las plantillas deben ser precompiladas a través de un paso de compilación.

- Los archivos de compilación que no incluyen `.runtime` son **compilaciones completas**: incluyen el compilador y permiten compilar las pantillas directamente en el navegador. Sin embargo, aumentarán la carga útil en ~14kb.

Nuestras configuraciones de herramientas por defecto utilizan la compilación sólo en tiempo de ejecución, ya que todas las plantillas en los SFC están precompiladas. Si, por alguna razón, necesita la compilación de plantillas en el navegador, incluso con un paso de compilación, puedes hacerlo configurando la herramienta de compilación para que ponga el alias `vue` en `vue/dist/vue.esm-bundler.js` en su lugar.

Si estás buscando una alternativa más liviana para el uso sin pasos de compilación, consulta [petite-vue](https://github.com/vuejs/petite-vue).

## Soporte para IDE {#soporte-para-ide}

- La configuración recomendada del IDE es [VSCode](https://code.visualstudio.com/) + la extensión [Volar](https://github.com/johnsoncodehk/volar). Volar proporciona resaltado de sintaxis, soporte para TypeScript, intellisense para expresiones de plantillas y props de componentes.

  :::tip
  Volar sustituye a [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), nuestra anterior extensión oficial de VSCode para Vue 2. Si tiene Vetur instalado actualmente, asegúrate de desactivarlo en los proyectos de Vue 3.
  :::

- [WebStorm](https://www.jetbrains.com/webstorm/) también proporciona un gran soporte integrado para los SFC de Vue.

- Otros IDE que admiten el [Protocolo de Servicio de Lenguaje](https://microsoft.github.io/language-server-protocol/) (LSP) tambien pueden aprovechar las funcionalidades principales de Volar a través de LSP:

  - Soporte para Sublime Text a través de [LSP-Volar](https://github.com/sublimelsp/LSP-volar).

  - Soporte para vim / Neovim a través de [coc-volar](https://github.com/yaegassy/coc-volar).

  - Soporte para emacs a través de [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/)

## Devtools del Navegador

<VueSchoolLink href="https://vueschool.io/lessons/using-vue-dev-tools-with-vuejs-3" title="Lección gratuita de Devtools de Vue.js"/>

La extensión de herramientas de desarrollo del navegador (Devtools) de Vue le permite explorar el árbol de componentes de una aplicación de Vue, inspeccionar el estado de los componentes individuales, realizar un seguimiento de los eventos de gestión del estado y perfilar el rendimiento.

![Captura de pantalla de devtools](https://raw.githubusercontent.com/vuejs/devtools/main/media/screenshot-shadow.png)

- [Documentación](https://devtools.vuejs.org/)
- [Extensión para Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Complemento para Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Aplicación independiente de Electron](https://devtools.vuejs.org/guide/installation.html#standalone)

## TypeScript

Artículo principal: [Usando Vue con TypeScript](/guide/typescript/overview).

- [Volar](https://github.com/johnsoncodehk/volar) proporciona comprobación de tipos para SFC usando bloques `<script lang="ts">`, incluyendo expresiones de plantilla y validación de props entre componentes.

- Utiliza [`vue-tsc`](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) para realizar la misma comprobación de tipos desde la línea de comandos, o para generar archivos `d.ts` para SFC.

## Testing

Artículo principal: [Guía de Testing](/guide/scaling-up/testing).

- [Cypress](https://www.cypress.io/) es recomendado para las pruebas E2E. También se puede utilizar para pruebas de componentes para Vue SFC a través de [Ejecutor de Pruebas de Componentes de Cypress](https://docs.cypress.io/guides/component-testing/introduction).

- [Vitest](https://vitest.dev/) es un ejecutor de pruebas creado por los miembros del equipo de Vue / Vite que se centra en la velocidad. Está diseñado específicamente para aplicaciones basadas en Vite, para proporcionar el mismo ciclo de retroalimentación instantáneo para pruebas de unidades / componentes.

- [Jest](https://jestjs.io/) puede trabajar con Vite a través de [vite-jest](https://github.com/sodatea/vite-jest). Sin embargo, esto solo se recomienda si tienes suites de pruebas existentes basadas en Jest que necesitan migrar a una configuración basada en Vite, ya que Vitest proporciona funcionalidades similares con una integración mucho más eficiente.

## Limpieza (Linting)

El equipo de Vue mantiene [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue), un complemento de [ESLint](https://eslint.org/) que soporta reglas de linting específicas de SFC.

Los usuarios que anteriormente usaban Vue CLI pueden estar acostumbrados a tener linters configurados a través de cargadores de webpack. Sin embargo, cuando se utiliza una configuración de compilación basada en Vite, nuestra recomendación general es:

1. `npm install -D eslint eslint-plugin-vue`, luego sigue la [guía de configuración](https://eslint.vuejs.org/user-guide/#usage) de `eslint-plugin-vue`.

2. Configure las extensiones ESLint del IDE, por ejemplo [ESLint para VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), de modo que obtengas información de linter directamente en tu editor durante el desarrollo. Esto también evita el costo innecesario de linting al iniciar el servidor de desarrollo.

3. Ejecuta ESLint como parte del comando de compilación de producción, para obtener información completa del linter antes de enviarlo a producción.

4. (Opcional) Configura herramientas como [lint-staged](https://github.com/okonet/lint-staged) para que los archivos modificados por git commit sean automáticamente corregidos.

## Formateo (Formatting)

- La extensión [Volar](https://github.com/johnsoncodehk/volar) de VSCode permite formatear los SFC de Vue de forma inmediata.

- Alternativamente, [Prettier](https://prettier.io/) proporciona soporte de formato integrado para SFC de Vue.

## Integraciones de Bloques Personalizados del SFC

Los bloques personalizados se compilan en importaciones al mismo archivo de Vue con diferentes consultas de solicitudes de consulta. Depende de la herramienta de compilación subyacente manejar estas solicitudes de importación.

- Si estás usando Vite, se debe usar un complemento personalizado de Vite para transformar los bloques personalizados en JavaScript ejecutable. [Ejemplo](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- Si estás usando Vue CLI o webpack simple, se debe configurar un cargador de webpack para transformar los bloques coincidentes. [Ejemplo](https://vue-loader.vuejs.org/guide/custom-blocks.html)

## Paquetes de Bajo Nivel

### `@vue/compiler-sfc`

- [Documentación](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

Este paquete es parte del monorepo del núcleo de Vue y siempre se publica con la misma versión que el paquete principal de `vue`. Se incluye como una dependencia del paquete principal de `vue` y se envía por proxy a `vue/compiler-sfc` para que no necesites instalarlo individualmente.

El paquete en sí proporciona utilidades de bajo nivel para procesar los SFC de Vue y sólo está pensado para los autores de herramientas que necesitan soportar los SFC de Vue en herramientas personalizadas.

:::tip
Siempre es preferible usar este paquete a través de la importación profunda de `vue/compiler-sfc` ya que esto asegura que su versión está sincronizada con el tiempo de ejecución de Vue.
:::

### `@vitejs/plugin-vue`

- [Documentación](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)

Complemento oficial que proporciona soporte a los SFC de Vue en Vite.

### `vue-loader`

- [Documentación](https://vue-loader.vuejs.org/)

El cargador oficial que proporciona soporte a los SFC de Vue en webpack. Si estás usando Vue CLI, consulta también [los documentos sobre cómo modificar las opciones de `vue-loader` en Vue CLI](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader).

## Otras Zonas de Práctica en Línea

- [Zona de Práctica en VueUse](https://play.vueuse.org)
- [Vue + Vite en Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue en CodeSandbox](https://codesandbox.io/s/vue-3)
- [Vue en Codepen](https://codepen.io/pen/editor/vue)
- [Vue en Components.studio](https://components.studio/create/vue3)
- [Vue en WebComponents.dev](https://webcomponents.dev/create/cevue)

<!-- TODO ## Integraciones del Framework con el Backend -->
