# API користувацького рендереру {#custom-renderer-api}

## createRenderer() {#createrenderer}

Створює користувацький рендерер. Надаючи API для створення та маніпулювання вузлами для конкретної платформи, ви можете використовувати основне середовище виконання Vue для вказування на середовища, відмінні від DOM.

- **Тип**

  ```ts
  function createRenderer<HostNode, HostElement>(
    options: RendererOptions<HostNode, HostElement>
  ): Renderer<HostElement>

  interface Renderer<HostElement> {
    render: RootRenderFunction<HostElement>
    createApp: CreateAppFunction<HostElement>
  }

  interface RendererOptions<HostNode, HostElement> {
    patchProp(
      el: HostElement,
      key: string,
      prevValue: any,
      nextValue: any,
      // решта не використовується для більшості користувальницьких рендерів
      isSVG?: boolean,
      prevChildren?: VNode<HostNode, HostElement>[],
      parentComponent?: ComponentInternalInstance | null,
      parentSuspense?: SuspenseBoundary | null,
      unmountChildren?: UnmountChildrenFn
    ): void
    insert(
      el: HostNode,
      parent: HostElement,
      anchor?: HostNode | null
    ): void
    remove(el: HostNode): void
    createElement(
      type: string,
      isSVG?: boolean,
      isCustomizedBuiltIn?: string,
      vnodeProps?: (VNodeProps & { [key: string]: any }) | null
    ): HostElement
    createText(text: string): HostNode
    createComment(text: string): HostNode
    setText(node: HostNode, text: string): void
    setElementText(node: HostElement, text: string): void
    parentNode(node: HostNode): HostElement | null
    nextSibling(node: HostNode): HostNode | null

    // необов'язковий, специфічний для DOM
    querySelector?(selector: string): HostElement | null
    setScopeId?(el: HostElement, id: string): void
    cloneNode?(node: HostNode): HostNode
    insertStaticContent?(
      content: string,
      parent: HostElement,
      anchor: HostNode | null,
      isSVG: boolean
    ): [HostNode, HostNode]
  }
  ```

- **Приклад**

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render` це API низького рівня
  // `createApp` повертає екземпляр застосунку
  export { render, createApp }

  // повторно експортовані Vue core APIs
  export * from '@vue/runtime-core'
  ```

  Власний `@vue/runtime-dom` Vue [реалізовано за допомогою того самого API](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts). Для простішої реалізації перегляньте [`@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts), який є приватним пакетом для власного модульного тестування Vue.
