# Misc

## name

- **Тип:** `string`

- **Подробности:**

  Allow the component to recursively invoke itself in its template. Note that when a component is registered globally with `Vue.createApp({}).component({})`, the global ID is automatically set as its name.

  Another benefit of specifying a `name` option is debugging. Named components result in more helpful warning messages. Also, when inspecting an app in the [vue-devtools](https://github.com/vuejs/vue-devtools), unnamed components will show up as `<AnonymousComponent>`, which isn't very informative. By providing the `name` option, you will get a much more informative component tree.

## delimiters

- **Тип:** `Array<string>`

- **По умолчанию:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}` 

- **Ограничения:** This option is only available in the full build, with in-browser template compilation.

- **Подробности:**

  Sets the delimiters used for text interpolation within the template.

  Typically this is used to avoid conflicting with server-side frameworks that also use mustache syntax.

- **Пример:**

  ```js
  Vue.createApp({
    // Delimiters changed to ES6 template string style
    delimiters: ['${', '}']
  })
  ```

## inheritAttrs

- **Тип:** `boolean`

- **По умолчанию:** `true`

- **Подробности:**

  By default, parent scope attribute bindings that are not recognized as props will "fallthrough". This means that when we have a single-root component, these bindings will be applied to the root element of the child component as normal HTML attributes. When authoring a component that wraps a target element or another component, this may not always be the desired behavior. By setting `inheritAttrs` to `false`, this default behavior can be disabled. The attributes are available via the `$attrs` instance property and can be explicitly bound to a non-root element using `v-bind`.

- **Использование:**

  ```js
  app.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input'],
    template: `
      <label>
        {{ label }}
        <input
          v-bind="$attrs"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
        >
      </label>
    `
  })
  ```

- **См. также:** [Disabling Attribute Inheritance](../guide/component-props.md#disabling-attribute-inheritance)
