# Server-Side Rendering API {#server-side-rendering-api}

## renderToString() {#rendertostring}

- **Экспортируется из `vue/server-renderer`**

- **Тип:**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **Пример:**

  ```js
  import { createSSRApp } from 'vue'
  import { renderToString } from 'vue/server-renderer'

  const app = createSSRApp({
    data: () => ({ msg: 'hello' }),
    template: `<div>{{ msg }}</div>`
  })

  ;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()
  ```

  ### SSR Context

  You can pass an optional context object, which can be used to record additional data during the render, for example [accessing content of Teleports](/guide/scaling-up/ssr.html#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'teleported content' }
  ```

  Most other SSR APIs on this page also optionally accept a context object. The context object can be accessed in component code via the [useSSRContext](#usessrcontext) helper.

- **См. также:** [Guide - Server-Side Rendering](/guide/scaling-up/ssr.html)

## renderToNodeStream() {#rendertonodestream}

Renders input as a [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable).

- **Экспортируется из `vue/server-renderer`**

- **Тип:**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **Пример:**

  ```js
  // inside a Node.js http handler
  renderToNodeStream(app).pipe(res)
  ```

  :::tip Примечание
  This method is not supported in the ESM build of `vue/server-renderer`, which is decoupled from Node.js environments. Use [`pipeToNodeWritable`](#pipetonodewritable) instead.
  :::

## pipeToNodeWritable() {#pipetonodewritable}

Render and pipe to an existing [Node.js Writable stream](https://nodejs.org/api/stream.html#stream_writable_streams) instance.

- **Экспортируется из `vue/server-renderer`**

- **Тип:**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **Пример:**

  ```js
  // inside a Node.js http handler
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream() {#rendertowebstream}

Renders input as a [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

- **Экспортируется из `vue/server-renderer`**

- **Тип:**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **Пример:**

  ```js
  // inside an environment with ReadableStream support
  return new Response(renderToWebStream(app))
  ```

  :::tip Примечание
  In environments that do not expose `ReadableStream` constructor in the global scope, [`pipeToWebWritable()`](#pipetowebwritable) should be used instead.
  :::

## pipeToWebWritable() {#pipetowebwritable}

Render and pipe to an existing [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) instance.

- **Экспортируется из `vue/server-renderer`**

- **Тип:**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **Пример:**

  This is typically used in combination with [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream):

  ```js
  // TransformStream is available in environments such as CloudFlare workers.
  // in Node.js, TransformStream needs to be explicitly imported from 'stream/web'
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream() {#rendertosimplestream}

Renders input in streaming mode using a simple readable interface.

- **Экспортируется из `vue/server-renderer`**

- **Тип:**

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

- **Пример:**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // done
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // error encountered
      }
    }
  )
  ```

## useSSRContext() {#usessrcontext}

A runtime API used to retrieve the context object passed to `renderToString()` or other server render APIs.

- **Тип:**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **Пример:**

  The retrieved context can be used to attach information that is needed for rendering the final HTML (e.g. head metadata).

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'

  // make sure to only call it during SSR
  // https://vitejs.dev/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...attach properties to the context
  }
  </script>
  ```
