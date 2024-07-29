# Options: Misc {#options-misc}

## name {#name}

Explicitly declare a display name for the component.

- **Type**

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **Details**

  The name of a component is used for the following:

  - Recursive self-reference in the component's own template
  - Display in Vue DevTools' component inspection tree
  - Display in warning component traces

  When you use Single-File Components, the component already infers its own name from the filename. For example, a file named `MyComponent.vue` will have the inferred display name "MyComponent".

  Another case is that when a component is registered globally with [`app.component`](/api/application#app-component), the global ID is automatically set as its name.

  The `name` option allows you to override the inferred name, or to explicitly provide a name when no name can be inferred (e.g. when not using build tools, or an inlined non-SFC component).

  There is one case where `name` is explicitly necessary: when matching against cacheable components in [`<KeepAlive>`](/guide/built-ins/keep-alive) via its `include / exclude` props.

  :::tip
  Since version 3.2.34, a single-file component using `<script setup>` will automatically infer its `name` option based on the filename, removing the need to manually declare the name even when used with `<KeepAlive>`.
  :::

## inheritAttrs {#inheritattrs}

Controls whether the default component attribute fallthrough behavior should be enabled.

- **Type**

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // default: true
  }
  ```

- **Details**

  By default, parent scope attribute bindings that are not recognized as props will "fallthrough". This means that when we have a single-root component, these bindings will be applied to the root element of the child component as normal HTML attributes. When authoring a component that wraps a target element or another component, this may not always be the desired behavior. By setting `inheritAttrs` to `false`, this default behavior can be disabled. The attributes are available via the `$attrs` instance property and can be explicitly bound to a non-root element using `v-bind`.

- **Example**

  <div class="options-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input']
  }
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>
  <div class="composition-api">

  When declaring this option in a component that uses `<script setup>`, you can use the [`defineOptions`](/api/sfc-script-setup#defineoptions) macro:

  ```vue
  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  defineOptions({
    inheritAttrs: false
  })
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>

- **See also** [Fallthrough Attributes](/guide/components/attrs)

## components {#components}

An object that registers components to be made available to the component instance.

- **Type**

  ```ts
  interface ComponentOptions {
    components?: { [key: string]: Component }
  }
  ```

- **Example**

  ```js
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: {
      // shorthand
      Foo,
      // register under a different name
      RenamedBar: Bar
    }
  }
  ```

- **See also** [Component Registration](/guide/components/registration)

## directives {#directives}

An object that registers directives to be made available to the component instance.

- **Type**

  ```ts
  interface ComponentOptions {
    directives?: { [key: string]: Directive }
  }
  ```

- **Example**

  ```js
  export default {
    directives: {
      // enables v-focus in template
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }
  }
  ```

  ```vue-html
  <input v-focus>
  ```

- **See also** [Custom Directives](/guide/reusability/custom-directives)
