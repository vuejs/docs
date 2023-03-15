# API рендерингу на стороні сервера {#server-side-rendering-api}

## renderToString() {#rendertostring}

- **Експортовано з `vue/server-renderer`**

- **Тип**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **Приклад**

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

  ### Контекст SSR {#ssr-context}

  Ви можете передати необов'язковий об'єкт контексту, який можна використовувати для запису додаткових даних під час візуалізації, наприклад [доступ до вмісту телепортів](/guide/scaling-up/ssr#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'телепортований вміст' }
  ```

  Більшість інших API SSR на цій сторінці також опціонально приймають контекстний об'єкт. Доступ до об'єкта контексту можна отримати в коді компонента за допомогою помічника [useSSRContext](#usessrcontext).

- **Дивіться також:** [Посібник - Рендеринг на стороні сервера](/guide/scaling-up/ssr)

## renderToNodeStream() {#rendertonodestream}

Рендеринг вхідних даних як [читабельного потоку Node.js](https://nodejs.org/api/stream.html#stream_class_stream_readable).

- **Експортовано з `vue/server-renderer`**

- **Тип**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **Приклад**

  ```js
  // всередині обробника http Node.js
  renderToNodeStream(app).pipe(res)
  ```

  :::tip Примітка
  Цей метод не підтримується в збірці ESM `vue/server-renderer`, яка відокремлена від середовища Node.js. Натомість використовуйте [`pipeToNodeWritable`](#pipetonodewritable).
  :::

## pipeToNodeWritable() {#pipetonodewritable}

Рендеринг та передавання в екземпляр [потоку Node.js з можливістю запису](https://nodejs.org/api/stream.html#stream_writable_streams).

- **Експортовано з `vue/server-renderer`**

- **Тип**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **Приклад**

  ```js
  // всередині обробника http Node.js
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream() {#rendertowebstream}

Рендеринг введення як [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

- **Експортовано з `vue/server-renderer`**

- **Тип**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **Приклад**

  ```js
  // всередині середовища з підтримкою ReadableStream
  return new Response(renderToWebStream(app))
  ```

  :::tip Примітка
  У середовищах, які не надають конструктора `ReadableStream` у глобальній області видимості, замість нього слід використовувати [`pipeToWebWritable()`](#pipetowebwritable).
  :::

## pipeToWebWritable() {#pipetowebwritable}

Рендерить та передавання в існуючий екземпляр [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream).

- **Експортовано з `vue/server-renderer`**

- **Тип**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **Приклад**

  Це зазвичай використовується в поєднанні з [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream):

  ```js
  // TransformStream доступний у таких середовищах, як робочі середовища CloudFlare.
  // у Node.js TransformStream потрібно явно імпортувати з 'stream/web'
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream() {#rendertosimplestream}

Рендеринг вхідних даних в потоковому режимі за допомогою простого читабельного інтерфейсу.

- **Експортовано з `vue/server-renderer`**

- **Тип**

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

- **Приклад**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // готово
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // сталася помилка
      }
    }
  )
  ```

## useSSRContext() {#usessrcontext}

API часу виконання, який використовується для отримання об'єкта контексту, переданого до `renderToString()` або іншого API відтворення сервера.

- **Тип**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **Приклад**

  Отриманий контекст можна використовувати для додавання інформації, необхідної для відтворення остаточного HTML (наприклад, метаданих заголовка).

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'

  // переконайтеся, що це викликається лише під час SSR
  // https://vitejs.dev/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...додати властивості до контексту
  }
  </script>
  ```
