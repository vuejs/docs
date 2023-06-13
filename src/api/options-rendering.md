# Options: Rendering {#options-rendering}

## template {#template}

A string template for the component.

- **Type**

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **Details**

  A template provided via the `template` option will be compiled on-the-fly at runtime. It is only supported when using a build of Vue that includes the template compiler. The template compiler is **NOT** included in Vue builds that have the word `runtime` in their names, e.g. `vue.runtime.esm-bundler.js`. Consult the [dist file guide](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) for more details about the different builds.

  If the string starts with `#` it will be used as a `querySelector` and use the selected element's `innerHTML` as the template string. This allows the source template to be authored using native `<template>` elements.

  If the `render` option is also present in the same component, `template` will be ignored.

  If the root component of your application doesn't have a `template` or `render` option specified, Vue will try to use the `innerHTML` of the mounted element as the template instead.

  :::warning Security Note
  Only use template sources that you can trust. Do not use user-provided content as your template. See [Security Guide](/guide/best-practices/security#rule-no-1-never-use-non-trusted-templates) for more details.
  :::

## render {#render}

A function that programmatically returns the virtual DOM tree of the component.

- **Type**

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **Details**

  `render` is an alternative to string templates that allows you to leverage the full programmatic power of JavaScript to declare the render output of the component.

  Pre-compiled templates, for example those in Single-File Components, are compiled into the `render` option at build time. If both `render` and `template` are present in a component, `render` will take higher priority.

- **See also**
  - [Rendering Mechanism](/guide/extras/rendering-mechanism)
  - [Render Functions](/guide/extras/render-function)

## compilerOptions {#compileroptions}

Configure runtime compiler options for the component's template.

- **Type**

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // default: 'condense'
      delimiters?: [string, string] // default: ['{{', '}}']
      comments?: boolean // default: false
    }
  }
  ```

- **Details**

  This config option is only respected when using the full build (i.e. the standalone `vue.js` that can compile templates in the browser). It supports the same options as the app-level [app.config.compilerOptions](/api/application#app-config-compileroptions), and has higher priority for the current component.

- **See also** [app.config.compilerOptions](/api/application#app-config-compileroptions)

## slots<sup class="vt-badge ts"/> {#slots}

An option to assist with type inference when using slots programmatically in render functions. Only supported in 3.3+.

- **Details**

  This option's runtime value is not used. The actual types should be declared via type casting using the `SlotsType` type helper:

  ```ts
  import { SlotsType } from 'vue'

  defineComponent({
    slots: Object as SlotsType<{
      default: { foo: string; bar: number }
      item: { data: number }
    }>,
    setup(props, { slots }) {
      expectType<
        undefined | ((scope: { foo: string; bar: number }) => any)
      >(slots.default)
      expectType<undefined | ((scope: { data: number }) => any)>(
        slots.item
      )
    }
  })
  ```
