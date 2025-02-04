# Server-Side Rendering API {#server-side-rendering-api}

## renderToString() {#rendertostring}

- **Eksportowano z `vue/server-renderer`**

- **Typ**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **Przykład**

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

  ### SSR Context {#ssr-context}

  Możesz przekazać opcjonalny obiekt kontekstu, który może zostać użyty do rejestrowania dodatkowych danych podczas renderowania, na przykład [dostęp do zawartości Teleportów](/guide/scaling-up/ssr#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'teleported content' }
  ```

  Większość innych interfejsów API SSR na tej stronie opcjonalnie akceptuje również obiekt kontekstu. Dostęp do obiektu kontekstu jest możliwy w kodzie komponentu za pomocą pomocnika [useSSRContext](#usessrcontext).

- **Zobacz także** [Przewodnik - Renderowanie po stronie serwera](/guide/scaling-up/ssr)

## renderToNodeStream() {#rendertonodestream}

Renderuje dane wejściowe jako [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable).

- **Eksportowano z `vue/server-renderer`**

- **Typ**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **Example**

  ```js
  // wewnątrz obsługi http Node.js
  renderToNodeStream(app).pipe(res)
  ```

  :::tip Note
  Ta metoda nie jest obsługiwana w kompilacji ESM `vue/server-renderer`, która jest oddzielona od środowisk Node.js. Zamiast tego użyj [`pipeToNodeWritable`](#pipetonodewritable).
  :::

## pipeToNodeWritable() {#pipetonodewritable}

Renderuj i przekieruj do istniejącej instancji [strumienia Node.js Writable](https://nodejs.org/api/stream.html#stream_writable_streams).

- **Eksportowano z `vue/server-renderer`**

- **Typ**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **Przykład**

  ```js
  // wewnątrz obsługi http Node.js
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream() {#rendertowebstream}

Renderuje dane wejściowe jako [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

- **Eksportowano z `vue/server-renderer`**

- **Typ**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **Example**

  ```js
  // w środowisku obsługującym ReadableStream
  return new Response(renderToWebStream(app))
  ```

  :::tip Notatka
  W środowiskach, które nie udostępniają konstruktora `ReadableStream` w zakresie globalnym, należy zamiast tego użyć [`pipeToWebWritable()`](#pipetowebwritable).
  :::

## pipeToWebWritable() {#pipetowebwritable}

Renderuj i przekieruj do istniejącej instancji [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream).

- **Eksportowano z `vue/server-renderer`**

- **Typ**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **Przykład**

  Zwykle jest używany w połączeniu z [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream):

  ```js
  // TransformStream jest dostępny w środowiskach takich jak pracownicy CloudFlare.
  // w Node.js TransformStream musi być jawnie importowany z 'stream/web'
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream() {#rendertosimplestream}

Renderuje dane wejściowe w trybie strumieniowym za pomocą prostego, czytelnego interfejsu.

- **Eksportowano z `vue/server-renderer`**

- **Typ**

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

- **Example**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // gotowe
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // napotkano błąd
      }
    }
  )
  ```

## useSSRContext() {#usessrcontext}

Interfejs API środowiska wykonawczego używany do pobierania obiektu kontekstu przekazanego do `renderToString()` lub innych interfejsów API renderowania serwera.

- **Typ**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **Przykład**

  Pobrany kontekst można wykorzystać do dołączenia informacji potrzebnych do renderowania ostatecznego kodu HTML (np. metadane nagłówka).

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'

  // pamiętaj, aby wywołać go tylko podczas SSR
  // https://vitejs.dev/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...dołącz właściwości do kontekstu
  }
  </script>
  ```
