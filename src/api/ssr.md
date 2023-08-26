# Rendering API lato server {#server-side-rendering-api}

## renderToString() {#rendertostring}

- **Esportato da `vue/server-renderer`**

- **Tipo**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **Esempio**

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

  ### Context del SSR {#ssr-context}

  Puoi passare un oggetto context opzionale, che può essere utilizzato per registrare dati aggiuntivi durante il rendering, ad esempio [l'accesso ai contenuti di Teleports](/guide/scaling-up/ssr#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'contenuto teletrasportato' }
  ```

  La maggior parte delle altre API SSR in questa pagina accettano anche opzionalmente un oggetto contesto. L'oggetto contesto può essere accessibile nel codice del componente tramite l'helper [useSSRContext](#usessrcontext).

- **Vedi anche** [Guida - Server-Side Rendering](/guide/scaling-up/ssr)

## renderToNodeStream() {#rendertonodestream}

Renderizza l'input come uno [stream leggibile di Node.js](https://nodejs.org/api/stream.html#stream_class_stream_readable).

- **Esportato da `vue/server-renderer`**

- **Tipo**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **Esempio**

  ```js
  // all'interno di un gestore http di Node.js 
  renderToNodeStream(app).pipe(res)
  ```

  :::tip Note
  Questo metodo non è supportato nella versione ESM di `vue/server-renderer`, che è disaccoppiata dagli ambienti Node.js. Usa invece [`pipeToNodeWritable`](#pipetonodewritable).
  :::

## pipeToNodeWritable() {#pipetonodewritable}

Renderizza e indirizza in un'istanza esistente di [stream scrivibile Node.js (Node.js Writable stream)](https://nodejs.org/api/stream.html#stream_writable_streams) instance.

- **Esportato da `vue/server-renderer`**

- **Tipo**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **Esempio**

  ```js
  // all'interno di un gestore http di Node.js
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream() {#rendertowebstream}

Renderizza l'input come uno [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

- **Esportato da `vue/server-renderer`**

- **Tipo**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **Esempio**

  ```js
  // all'interno di un ambiente con supporto per ReadableStream
  return new Response(renderToWebStream(app))
  ```

  :::tip Note
  Negli ambienti che non espongono il costruttore `ReadableStream` nello scope globale, dovrebbe essere usato [`pipeToWebWritable()`](#pipetowebwritable) al suo posto.
  :::

## pipeToWebWritable() {#pipetowebwritable}

Renderizza e indirizza in un'istanza esistente di [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream).

- **Esportato da `vue/server-renderer`**

- **Tipo**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **Esempio**

  Questo è tipicamente usato in combinazione con [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream):

  ```js
  // TransformStream è disponibile in ambienti come i workers di CloudFlare.
  // In Node.js, TransformStream deve essere esplicitamente importato da 'stream/web'
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream() {#rendertosimplestream}

Renderizza l'input in modalità streaming utilizzando un'interfaccia leggibile semplice.

- **Esportato da `vue/server-renderer`**

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

- **Esempio**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // completato
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // riscontrato errore
      }
    }
  )
  ```

## useSSRContext() {#usessrcontext}

Un'API di runtime utilizzata per recuperare l'oggetto di contesto passato a `renderToString()` o ad altre API di rendering lato server..

- **Tipo**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **Esempio**

  L'oggetto di contesto recuperato può essere utilizzato per allegare informazioni necessarie per il rendering dell'HTML finale (ad esempio, metadati dell'head).

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'

  // assicurati di chiamarlo solo durante l'SSR
  // https://vitejs.dev/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...allega proprietà al contesto
  }
  </script>
  ```
