# Built-in Special Elements {#built-in-special-elements}

:::info Not Components
`<component>`, `<slot>` and `<template>` are component-like features and part of the template syntax. They are not true components and are compiled away during template compilation. As such, they are conventionally written with lowercase in templates.
:::

## `<component>` {#component}

A "meta component" for rendering dynamic components or elements.

- **Props**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **Details**

  The actual component to render is determined by the `is` prop.

  - When `is` is a string, it could be either an HTML tag name or a component's registered name.

  - Alternatively, `is` can also be directly bound to the definition of a component.

- **Example**

  Rendering components by registered name (Options API):

  ```vue
  <script>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: { Foo, Bar },
    data() {
      return {
        view: 'Foo'
      }
    }
  }
  </script>

  <template>
    <component :is="view" />
  </template>
  ```

  Rendering components by definition (Composition API with `<script setup>`):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  Rendering HTML elements:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  The [built-in components](./built-in-components) can all be passed to `is`, but you must register them if you want to pass them by name. For example:

  ```vue
  <script>
  import { Transition, TransitionGroup } from 'vue'

  export default {
    components: {
      Transition,
      TransitionGroup
    }
  }
  </script>

  <template>
    <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
      ...
    </component>
  </template>
  ```

  Registration is not required if you pass the component itself to `is` rather than its name, e.g. in `<script setup>`.

  If `v-model` is used on a `<component>` tag, the template compiler will expand it to a `modelValue` prop and `update:modelValue` event listener, much like it would for any other component. However, this won't be compatible with native HTML elements, such as `<input>` or `<select>`. As a result, using `v-model` with a dynamically created native element won't work:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- This won't work as 'input' is a native HTML element -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  In practice, this edge case isn't common as native form fields are typically wrapped in components in real applications. If you do need to use a native element directly then you can split the `v-model` into an attribute and event manually.

- **See also** [Dynamic Components](/guide/essentials/component-basics#dynamic-components)

## `<slot>` {#slot}

Denotes slot content outlets in templates.

- **Props**

  ```ts
  interface SlotProps {
    /**
     * Any props passed to <slot> to passed as arguments
     * for scoped slots
     */
    [key: string]: any
    /**
     * Reserved for specifying slot name.
     */
    name?: string
  }
  ```

- **Details**

  The `<slot>` element can use the `name` attribute to specify a slot name. When no `name` is specified, it will render the default slot. Additional attributes passed to the slot element will be passed as slot props to the scoped slot defined in the parent.

  The element itself will be replaced by its matched slot content.

  `<slot>` elements in Vue templates are compiled into JavaScript, so they are not to be confused with [native `<slot>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).

- **See also** [Component - Slots](/guide/components/slots)

## `<template>` {#template}

The `<template>` tag is used as a placeholder when we want to use a built-in directive without rendering an element in the DOM.

- **Details**

  The special handling for `<template>` is only triggered if it is used with one of these directives:

  - `v-if`, `v-else-if`, or `v-else`
  - `v-for`
  - `v-slot`

  If none of those directives are present then it will be rendered as a [native `<template>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) instead.

  A `<template>` with a `v-for` can also have a [`key` attribute](/api/built-in-special-attributes#key). All other attributes and directives will be discarded, as they aren't meaningful without a corresponding element.

  Single-file components use a [top-level `<template>` tag](/api/sfc-spec#language-blocks) to wrap the entire template. That usage is separate from the use of `<template>` described above. That top-level tag is not part of the template itself and doesn't support template syntax, such as directives.

- **See also**
  - [Guide - `v-if` on `<template>`](/guide/essentials/conditional#v-if-on-template)
  - [Guide - `v-for` on `<template>`](/guide/essentials/list#v-for-on-template)
  - [Guide - Named slots](/guide/components/slots#named-slots)
