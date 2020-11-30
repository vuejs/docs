# 기타(Misc)

## name

- **유형:** `string`

- **상세:**

    Allow the component to recursively invoke itself in its template. Note that when a component is registered globally with `Vue.createApp({}).component({})`, the global ID is automatically set as its name.

    Another benefit of specifying a `name` option is debugging. Named components result in more helpful warning messages. Also, when inspecting an app in the [vue-devtools](https://github.com/vuejs/vue-devtools), unnamed components will show up as `<AnonymousComponent>`, which isn't very informative. By providing the `name` option, you will get a much more informative component tree.

## delimiters

- **유형:** `Array<string>`

- **기본값:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **Restrictions:** This option is only available in the full build, with in-browser template compilation.

- **상세:**

    템플릿 내에서 텍스트 보간에 사용되는 구분 기호를 설정합니다.

    일반적으로 머스태시 구문(mustache syntax)을 사용하는 서버측 프레임워크와의 충돌을 방지하기 위해 사용됩니다.

- **예시:**

    ```js
    Vue.createApp({
      // Delimiters changed to ES6 template string style
      delimiters: ['${', '}']
    })
    ```

## inheritAttrs

- **유형:** `boolean`

- **기본값:** `true`

- **상세:**

    By default, parent scope attribute bindings that are not recognized as props will "fallthrough". This means that when we have a single-root component, these bindings will be applied to the root element of the child component as normal HTML attributes. When authoring a component that wraps a target element or another component, this may not always be the desired behavior. By setting `inheritAttrs` to `false`, this default behavior can be disabled. The attributes are available via the `$attrs` instance property and can be explicitly bound to a non-root element using `v-bind`.

- **사용법:**

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

- [Disabling Attribute Inheritance](../guide/component-props.html#disabling-attribute-inheritance)
