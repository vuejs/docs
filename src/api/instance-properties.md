# Instance Properties

## $data

- **Type:** `Object`

- **Details:**

  The data object that the Vue instance is observing. The Vue instance proxies access to the properties on its data object.

- **See also:** [Options / Data - data](./options-data.html#data-2)

## $props

- **Type:** `Object`

- **Details:**

  An object representing the current props a component has received. The Vue instance proxies access to the properties on its props object.

## $el

- **Type:** `any`

- **Read only**

- **Details:**

  The root DOM element that the Vue instance is managing.

## $options

- **Type:** `Object`

- **Read only**

- **Details:**

  The instantiation options used for the current Vue instance. This is useful when you want to include custom properties in the options:

  ```js
  const app = Vue.createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

## $parent

- **Type:** `Vue instance`

- **Read only**

- **Details:**

  The parent instance, if the current instance has one.

## $root

- **Type:** `Vue instance`

- **Read only**

- **Details:**

  The root Vue instance of the current component tree. If the current instance has no parents this value will be itself.

## $slots

- **Type:** `{ [name: string]: (...args: any[]) => Array<VNode> | undefined }`

- **Read only**

- **Details:**

  Used to programmatically access content [distributed by slots](../guide/component-basics.html#content-distribution-with-slots). Each [named slot](../guide/component-slots.html#named-slots) has its own corresponding property (e.g. the contents of `v-slot:foo` will be found at `this.$slots.foo()`). The `default` property contains either nodes not included in a named slot or contents of `v-slot:default`.

  Accessing `this.$slots` is most useful when writing a component with a [render function](../guide/render-function.html).

- **Example:**

  ```html
  <blog-post>
    <template v-slot:header>
      <h1>About Me</h1>
    </template>

    <template v-slot:default>
      <p>
        Here's some page content, which will be included in $slots.default.
      </p>
    </template>

    <template v-slot:footer>
      <p>Copyright 2020 Evan You</p>
    </template>
  </blog-post>
  ```

  ```js
  const app = Vue.createApp({})

  app.component('blog-post', {
    render() {
      return Vue.h('div', [
        Vue.h('header', this.$slots.header()),
        Vue.h('main', this.$slots.default()),
        Vue.h('footer', this.$slots.footer())
      ])
    }
  })
  ```

- **See also:**
  - [`<slot>` Component](built-in-components.html#slot)
  - [Content Distribution with Slots](../guide/component-basics.html#content-distribution-with-slots)
  - [Render Functions - Slots](../guide/render-function.html#slots)

## $refs

- **Type:** `Object`

- **Read only**

- **Details:**

An object of DOM elements and component instances, registered with [`ref` attributes](../guide/component-template-refs.html).

- **See also:**
  - [Template refs](../guide/component-template-refs.html)
  - [Special Attributes - ref](./special-attributes.md#ref)

## $attrs

- **Type:** `Object`

- **Read only**

- **Details:**

Contains parent-scope attribute bindings and events that are not recognized (and extracted) as component [props](./options-data.html#props) or [custom events](./options-data.html#emits). When a component doesn't have any declared props or custom events, this essentially contains all parent-scope bindings, and can be passed down to an inner component via `v-bind="$attrs"` - useful when creating higher-order components.

- **See also:**
  - [Non-Prop Attributes](../guide/component-props.html#non-prop-attributes)
