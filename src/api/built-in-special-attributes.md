# Built-in Special Attributes {#built-in-special-attributes}

## key {#key}

The `key` special attribute is primarily used as a hint for Vue's virtual DOM algorithm to identify vnodes when diffing the new list of nodes against the old list.

- **Expects:** `number | string | symbol`

- **Details**

  Without keys, Vue uses an algorithm that minimizes element movement and tries to patch/reuse elements of the same type in-place as much as possible. With keys, it will reorder elements based on the order change of keys, and elements with keys that are no longer present will always be removed / destroyed.

  Children of the same common parent must have **unique keys**. Duplicate keys will cause render errors.

  The most common use case is combined with `v-for`:

  ```vue-html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  It can also be used to force replacement of an element/component instead of reusing it. This can be useful when you want to:

  - Properly trigger lifecycle hooks of a component
  - Trigger transitions

  For example:

  ```vue-html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  When `text` changes, the `<span>` will always be replaced instead of patched, so a transition will be triggered.

- **See also** [Guide - List Rendering - Maintaining State with `key`](/guide/essentials/list#maintaining-state-with-key)

## ref {#ref}

Denotes a [template ref](/guide/essentials/template-refs).

- **Expects:** `string | Function`

- **Details**

  `ref` is used to register a reference to an element or a child component.

  In Options API, the reference will be registered under the component's `this.$refs` object:

  ```vue-html
  <!-- stored as this.$refs.p -->
  <p ref="p">hello</p>
  ```

  In Composition API, the reference will be stored in a ref with matching name:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const p = ref()
  </script>

  <template>
    <p ref="p">hello</p>
  </template>
  ```

  If used on a plain DOM element, the reference will be that element; if used on a child component, the reference will be the child component instance.

  Alternatively `ref` can accept a function value which provides full control over where to store the reference:

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```

  An important note about the ref registration timing: because the refs themselves are created as a result of the render function, you must wait until the component is mounted before accessing them.

  `this.$refs` is also non-reactive, therefore you should not attempt to use it in templates for data-binding.

- **See also**
  - [Guide - Template Refs](/guide/essentials/template-refs)
  - [Guide - Typing Template Refs](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [Guide - Typing Component Template Refs](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## is {#is}

Used for binding [dynamic components](/guide/essentials/component-basics#dynamic-components).

- **Expects:** `string | Component`

- **Usage on native elements** <sup class="vt-badge">3.1+</sup>

  When the `is` attribute is used on a native HTML element, it will be interpreted as a [Customized built-in element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example), which is a native web platform feature.

  There is, however, a use case where you may need Vue to replace a native element with a Vue component, as explained in [in-DOM Template Parsing Caveats](/guide/essentials/component-basics#in-dom-template-parsing-caveats). You can prefix the value of the `is` attribute with `vue:` so that Vue will render the element as a Vue component instead:

  ```vue-html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **See also**

  - [Built-in Special Element - `<component>`](/api/built-in-special-elements#component)
  - [Dynamic Components](/guide/essentials/component-basics#dynamic-components)
