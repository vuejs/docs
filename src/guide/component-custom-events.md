# Custom Events

> This page assumes you've already read the [Components Basics](components.md). Read that first if you are new to components.

## Event Names

Unlike components and props, event names don't provide any automatic case transformation. Instead, the name of an emitted event must exactly match the name used to listen to that event. For example, if emitting a camelCased event name:

```js
this.$emit('myEvent')
```

Listening to the kebab-cased version will have no effect:

```html
<!-- Won't work -->
<my-component v-on:my-event="doSomething"></my-component>
```

Unlike components and props, event names will never be used as variable or property names in JavaScript, so there's no reason to use camelCase or PascalCase. Additionally, `v-on` event listeners inside DOM templates will be automatically transformed to lowercase (due to HTML's case-insensitivity), so `v-on:myEvent` would become `v-on:myevent` -- making `myEvent` impossible to listen to.

For these reasons, we recommend you **always use kebab-case for event names**.

## `v-model` arguments

By default, `v-model` on a component uses `modelValue` as the prop and `update:modelValue` as the event. We can modify these names passing an argument to `v-model`:

```html
<my-component v-model:foo="bar"></my-component>
```

In this case, child component will expect a `foo` prop and emits `update:foo` event to sync:

```js
const app = Vue.createApp({})

app.component('my-component', {
  props: ['foo'],
  template: `<input type="text" :value="foo" @input="$emit('update:foo', $event.target.value)">`
})
```

Note that this enables multiple v-model bindings on the same component, each syncing a different prop, without the need for extra options in the component:

```html
<my-component v-model:foo="bar" v-model:name="userName"></my-component>
```

## Handling `v-model` modifiers
