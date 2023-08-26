# Renderer Personalizzato API {#custom-renderer-api}

## createRenderer() {#createrenderer}

Crea un renderer personalizzato. Fornendo API specifiche della piattaforma per la creazione e la manipolazione dei nodi, è possibile utilizzare il runtime core di Vue per indirizzare ambienti non basati su DOM.

- **Tipo**

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
      // il resto è inutilizzato per la maggior parte dei renderer personalizzati
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

    // opzionale, DOM-specific
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

- **Esempio**

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render` è l'API low-level
  // `createApp` ritorna un'istanza dell'app
  export { render, createApp }

  // ri-esporta i core API di Vue 
  export * from '@vue/runtime-core'
  ```

  Il modulo stesso `@vue/runtime-dom` di Vue è [implementato utilizzando la stessa API](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts). Per un'implementazione semplice, puoi dare un'occhiata a  [`@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts) che è un pacchetto privato utilizzato internamente da Vue per gli unit test.
