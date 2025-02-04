# Custom Renderer API {#custom-renderer-api}

## createRenderer() {#createrenderer}

Tworzy niestandardowy renderer. Zapewniając specyficzne dla platformy interfejsy API do tworzenia i manipulowania węzłami, możesz wykorzystać podstawowe środowisko wykonawcze Vue do kierowania na środowiska inne niż DOM.

- **Typ**

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
      // reszta jest nieużywana w przypadku większości niestandardowych rendererów
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

    // opcjonalnie, specyficzne dla DOM
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

- **Przykład**

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render` to API niskiego poziomu
  // `createApp` zwraca instancję aplikacji
  export { render, createApp }

  // ponowny eksport podstawowych interfejsów API Vue
  export * from '@vue/runtime-core'
  ```

Własny `@vue/runtime-dom` Vue jest [implementowany przy użyciu tego samego API](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts). Aby uzyskać prostszą implementację, sprawdź [`@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts), który jest prywatnym pakietem do własnych testów jednostkowych Vue.