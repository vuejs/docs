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

## ComponentInstance {#componentinstance}

Used to extract the instance type of a component (equivalent to the type of `this` in its options).

- **Example**

```vue
<script setup lang="ts">
import { ComponentInstance } from 'vue'
import Foo from './Foo.vue'

const fooEl = ref<null | ComponentInstance<typeof Foo>>(null)
</script>
<template>
  <Foo ref="fooEl" />
</template>
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

## DeclareComponent {#declarecomponent}

More user friendly way to generate or extend `DefineComponent` type.

:::warning
Note that you must define the properties, using `DeclareComponent` is just
typescript, it will fail at runtime.
:::

- **Validator Example**

```ts
type Validator<T> = { value: T; validate(): boolean }
declare function generateComponent<
  T extends Record<string, Validator<any>>
>(schema: T): DeclareComponent<{ [K in keyof T]: T[K]['value'] }>

generateComponent({
  test: {
    value: 'test',
    validate: () => true
  }
}).props.test // { type: String, required: true}
```

- **HoC Example**

```ts
declare function extendAsHTMLElement<T extends DefineComponent>(
  options: T
): T & DeclareComponent<HTMLAttributes>

extendAsHTMLElement(
  defineComponent({
    setup:
      (_, { attrs }) =>
      () =>
        h('input', attrs)
  })
).props.about // { type: String, required: false}
```

## ExtractComponentOptions\<T> {#extractcomponentoptions}

Extracts component declared options.

```ts
const Comp = defineComponent({
  props: {
    foo: String
  }
})
const options = {} as ExtractComponentOptions<typeof Comp>
options.props // { foo: StringConstructor }
```

## ExtractComponentPropOptions\<T> {#extractcomponentpropoptions}

Extracts the component props as the component was created, or the props from the ComponentPublicInstance.

```ts
const Comp = defineComponent({
  props: {
    foo: String
  }
})
const props = {} as ExtractComponentPropOptions<typeof Comp>
props.foo // StringConstructor
```

## ExtractComponentSlotOptions\<T> {#extractcomponentslotoptions}

Extracts the component slots as the component was created.

```ts
const Comp = defineComponent({
  slots: {} as SlotsType<{
    foo: (bar: string) => any
    baz: (bar: number) => any
  }>
})
const slots = {} as ExtractComponentSlotOptions<typeof Comp>
slots // SlotsType<{ foo: (bar: string) => any; baz: (bar: number) => any; }>
```

## ExtractComponentEmitOptions\<T> {#extractcomponentemitoptions}

Extracts the component emits as the component was created.

```ts
const Comp = defineComponent({
  emits: {
    foo: (test: string) => true
  }
})
const emits = {} as ExtractComponentEmitOptions<typeof Comp>
emits.foo // (test: string) => true
```

## ObjectToComponentProps\<T> {#objecttocomponentprops}

Converts an Record<string, any> into a props definition like object.

Useful for extending component props.

```ts

```

## ComponentEmitsAsProps\<T> {#componentemitsasprops}

Converts `Emit` declaration into `props` declaration.

```ts

```

## ComponentProps\<T> {#componentprops}

Returns runtime props for a component.

```ts
const Comp = defineComponent({
  props: {
    foo: String
  }
})
const props = {} as ComponentProps<typeof Comp>
props.foo // string | undefined
```

## ComponentSlots\<T> {#componentslots}

Returns runtime slots for a component.

```ts

```

## ComponentEmit\<T> {#componentemit}

Returns the `emit` function from options.

```ts

```

## ComponentData\<T> {#componentdata}

Returns the component bindings from `data` and `setup`.

```ts

```

## DeclareComponent {#declarecomponent}

More user friendly way to generate or extend `DefineComponent` type.

:::warning
This is only typescript, might fail at runtime, if you don't define the properties.
:::

```ts

```
