# Custom Renderer API {#custom-renderer-api}

## createRenderer() {#createrenderer}

Creates a custom renderer. By providing platform-specific node creation and manipulation APIs, you can leverage Vue's core runtime to target non-DOM environments.

- **Type**

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
      // the rest is unused for most custom renderers
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

    // optional, DOM-specific
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

- **Example**

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render` is the low-level API
  // `createApp` returns an app instance
  export { render, createApp }

  // re-export Vue core APIs
  export * from '@vue/runtime-core'
  ```

  Vue's own `@vue/runtime-dom` is [implemented using the same API](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts). For a simpler implementation, check out [`@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts) which is a private package for Vue's own unit testing.
