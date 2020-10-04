# Свойства экземпляра

## $data

- **Тип:** `Object`

- **Подробности:**

  The data object that the component instance is observing. The component instance proxies access to the properties on its data object.

- **См. также:** [Options / Data - data](./options-data.md#data-2)

## $props

- **Тип:** `Object`

- **Подробности:**

  An object representing the current props a component has received. The component instance proxies access to the properties on its props object.

## $el

- **Тип:** `any`

- **Только для чтения**

- **Подробности:**

  The root DOM element that the component instance is managing.

## $options

- **Тип:** `Object`

- **Только для чтения**

- **Подробности:**

  The instantiation options used for the current component instance. This is useful when you want to include custom properties in the options:

  ```js
  const app = Vue.createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

## $parent

- **Тип:** `Component instance`

- **Только для чтения**

- **Подробности:**

  The parent instance, if the current instance has one.

## $root

- **Тип:** `Component instance`

- **Только для чтения**

- **Подробности:**

  The root component instance of the current component tree. If the current instance has no parents this value will be itself.

## $slots

- **Тип:** `{ [name: string]: (...args: any[]) => Array<VNode> | undefined }`

- **Только для чтения**

- **Подробности:**

  Used to programmatically access content [distributed by slots](../guide/component-basics.md#content-distribution-with-slots). Each [named slot](../guide/component-slots.md#named-slots) has its own corresponding property (e.g. the contents of `v-slot:foo` will be found at `this.$slots.foo()`). The `default` property contains either nodes not included in a named slot or contents of `v-slot:default`.

  Accessing `this.$slots` is most useful when writing a component with a [render function](../guide/render-function.md).

- **Пример:**

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

- **См. также:**
  - [`<slot>` Component](built-in-components.md#slot)
  - [Content Distribution with Slots](../guide/component-basics.md#content-distribution-with-slots)
  - [Render Functions - Slots](../guide/render-function.md#slots)

## $refs

- **Тип:** `Object`

- **Только для чтения**

- **Подробности:**

An object of DOM elements and component instances, registered with [`ref` attributes](../guide/component-template-refs.md).

- **См. также:**
  - [Template refs](../guide/component-template-refs.md)
  - [Special Attributes - ref](./special-attributes.md#ref)

## $attrs

- **Тип:** `Object`

- **Только для чтения**

- **Подробности:**

Contains parent-scope attribute bindings and events that are not recognized (and extracted) as component [props](./options-data.md#props) or [custom events](./options-data.md#emits). When a component doesn't have any declared props or custom events, this essentially contains all parent-scope bindings, and can be passed down to an inner component via `v-bind="$attrs"` - useful when creating higher-order components.

- **См. также:**
  - [Non-Prop Attributes](../guide/component-attrs.md)
