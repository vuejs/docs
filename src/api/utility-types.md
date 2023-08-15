# Utility Types {#utility-types}

:::info
This page only lists a few commonly used utility types that may need explanation for their usage. For a full list of exported types, consult the [source code](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131).
:::

## PropType\<T> {#proptype-t}

Used to annotate a prop with more advanced types when using runtime props declarations.

- **Example**

  ```ts
  import type { PropType } from 'vue'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // provide more specific type to `Object`
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **See also** [Guide - Typing Component Props](/guide/typescript/options-api#typing-component-props)

## MaybeRef\<T> {#mayberef}

Alias for `T | Ref<T>`. Useful for annotating arguments of [Composables](/guide/reusability/composables.html).

- Only supported in 3.3+.

## MaybeRefOrGetter\<T> {#maybereforgetter}

Alias for `T | Ref<T> | (() => T)`. Useful for annotating arguments of [Composables](/guide/reusability/composables.html).

- Only supported in 3.3+.

## ExtractPropTypes\<T> {#extractproptypes}

Extract prop types from a runtime props options object. The extracted types are internal facing - i.e. the resolved props received by the component. This means boolean props and props with default values are always defined, even if they are not required.

To extract public facing props, i.e. props that the parent is allowed to pass, use [`ExtractPublicPropTypes`](#extractpublicproptypes).

- **Example**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar: boolean,
  //   baz: number,
  //   qux: number
  // }
  ```

## ExtractPublicPropTypes\<T> {#extractpublicproptypes}

Extract prop types from a runtime props options object. The extracted types are public facing - i.e. the props that the parent is allowed to pass.

- **Example**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPublicPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar?: boolean,
  //   baz: number,
  //   qux?: number
  // }
  ```

## ComponentCustomProperties {#componentcustomproperties}

Used to augment the component instance type to support custom global properties.

- **Example**

  ```ts
  import axios from 'axios'

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip
  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) for more details.
  :::

- **See also** [Guide - Augmenting Global Properties](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

Used to augment the component options type to support custom options.

- **Example**

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip
  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) for more details.
  :::

- **See also** [Guide - Augmenting Custom Options](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

Used to augment allowed TSX props in order to use non-declared props on TSX elements.

- **Example**

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // now works even if hello is not a declared prop
  <MyComponent hello="world" />
  ```

  :::tip
  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) for more details.
  :::

## CSSProperties {#cssproperties}

Used to augment allowed values in style property bindings.

- **Example**

  Allow any custom CSS property

  ```ts
  declare module 'vue' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```

  ```html
  <div :style="{ '--bg-color': 'blue' }"></div>
  ```

:::tip
Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) for more details.
:::

:::info See also
SFC `<style>` tags support linking CSS values to dynamic component state using the `v-bind` CSS function. This allows for custom properties without type augmentation.

- [v-bind() in CSS](/api/sfc-css-features#v-bind-in-css)
  :::
