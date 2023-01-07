# API del Renderizador Personalizado (Custom Renderer API)

## createRenderer()

Crea un renderizador personalizado. Al proporcionar APIs de creación y manipulación de nodos específicos de la plataforma, puedes aprovechar el tiempo de ejecución del núcleo de Vue para apuntar a entornos que no son de DOM.

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
      // el resto no se usa para la mayoría de los renderizadores personalizados
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

    // opcional, específico del DOM
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

- **Ejemplo**

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render` es la API de bajo nivel
  // `createApp` retorna una instancia de la aplicación
  export { render, createApp }

  // re-exporta las APIs del núcleo de Vue
  export * from '@vue/runtime-core'
  ```
  El propio `@vue/runtime-dom` de Vue está [implementado usando la misma API](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts). Para una implementación más sencilla, chequea [`@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts) que es un paquete privado para las pruebas unitarias Vue.
