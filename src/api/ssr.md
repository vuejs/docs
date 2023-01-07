# Renderizado del Lado del Servidor

## renderToString()

- **Exportado desde `vue/server-renderer`**

- **Tipo**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **Ejemplo**

  ```js
  import { createSSRApp } from 'vue'
  import { renderToString } from 'vue/server-renderer'

  const app = createSSRApp({
    data: () => ({ msg: 'hola' }),
    template: `<div>{{ msg }}</div>`
  })

  ;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()
  ```

  ### Contexto SSR

  Puedes pasar un objeto de contexto opcional, que se puede usar para registrar datos adicionales durante el renderizado, por ejemplo, [acceder al contenido de Teleports](/guide/scaling-up/ssr.html#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'contenido teletransportado' }
  ```

  La mayoría de las otras API de SSR en esta página también aceptan opcionalmente un objeto de contexto. Se puede acceder al objeto de contexto en el código del componente a través del ayudante [useSSRContext](#usessrcontext).

- **Véase también:** [Guía - Renderizado del Lado del Servidor (SSR)](/guide/scaling-up/ssr.html)

## renderToNodeStream()

Renderiza la entrada como una [secuencia legible de Node.js](https://nodejs.org/api/stream.html#stream_class_stream_readable).

- **Exportado desde `vue/server-renderer`**

- **Tipo**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **Ejemplo**

  ```js
  // dentro de un manejador http de Node.js
  renderToNodeStream(app).pipe(res)
  ```

  :::tip Nota
  Este método no está soportado en la compilación ESM de `vue/server-renderer`, que está desacoplado de los entornos de Node.js. Utiliza [`pipeToNodeWritable`](#pipetonodewritable) en su lugar.
  :::

## pipeToNodeWritable()

Renderiza y canaliza una instancia existente de [Node.js escribible](https://nodejs.org/api/stream.html#stream_writable_streams).

- **Exportado desde `vue/server-renderer`**

- **Tipo**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **Ejemplo**

  ```js
  // dentro de un manejador http de Node.js
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream()

Renderiza la entrada como un [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

- **Exportado desde `vue/server-renderer`**

- **Tipo**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **Ejemplo**

  ```js
  // dentro de un entorno con soporte de ReadableStream
  return new Response(renderToWebStream(app))
  ```

  :::tip Nota
  En entornos que no exponen el constructor `ReadableStream` en el ámbito global, se debe usar [`pipeToWebWritable()`](#pipetowebwritable) en su lugar.
  :::

## pipeToWebWritable()

Renderizar y canalizar a una instancia [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) existente.

- **Exportado desde `vue/server-renderer`**

- **Tipo**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **Ejemplo**

  Se suele utilizar en combinación con [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream):

  ```js
  // TransformStream está disponible en entornos como los workers de CloudFlare.
  // en Node.js, TransformStream necesita ser importado explícitamente desde 'stream/web'
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream()

Renderiza la entrada en modo streaming utilizando una interfaz sencilla de leer.

- **Exportado desde `vue/server-renderer`**

- **Tipo**

  ```ts
  function renderToSimpleStream(
    input: App | VNode,
    context: SSRContext,
    options: SimpleReadable
  ): SimpleReadable

  interface SimpleReadable {
    push(content: string | null): void
    destroy(err: any): void
  }
  ```

- **Ejemplo**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // hecho
          console(`renderizado completo: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // error encontrado
      }
    }
  )
  ```

## useSSRContext()

Una API en tiempo de ejecución utilizada para recuperar el objeto de contexto pasado a `renderToString()` u otras API de renderización del servidor.

- **Tipo**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **Ejemplo**

  El contexto recuperado se puede utilizar para adjuntar información necesaria para renderizar el HTML final (por ejemplo, metadatos de cabecera).

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'

  // asegúrate de llamarlo sólo durante el SSR
  // https://vitejs.dev/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...adjuntar propiedades al contexto
  }
  </script>
  ```
