# 기타(Misc)

## name

- **유형:** `string`

- **상세:**

    컴포넌트가 템플릿에서 자신을 재귀적으로 호출할 수 있도록 합니다. 컴포넌트가 `Vue.createApp({}).component({})`를 사용하여 전역으로 등록되면, 전역 ID가 자동으로 이름으로 설정됩니다.

    `name` 옵션을 지정할 때의 또 다른 이점은 디버깅에 있습니다. 명명된 컴포넌트는 더 유용한 경고 메시지를 제공합니다. 또한, [vue-devtools](https://github.com/vuejs/vue-devtools)에서 앱을 검사할 때, 이름 없는 컴포넌트가 `<AnonymousComponent>` 로 표시되는데 이는 그다지 유용한 정보가 아닙니다. `name` 옵션을 제공하면 훨씬 더 유용한 컴포넌트 트리를 얻을 수 있습니다.

## delimiters

- **유형:** `Array<string>`

- **기본값:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **제약사항:** 이 옵션은 브라우저 내 템플릿 컴파일이 포함된 전체 빌드에서만 사용할 수 있습니다.

- **상세:**

    템플릿 내에서 텍스트 보간에 사용되는 구분 기호를 설정합니다.

    일반적으로 머스태시 구문(mustache syntax)을 사용하는 서버측 프레임워크와의 충돌을 방지하기 위해 사용됩니다.

- **예시:**

    ```js
    Vue.createApp({
      // delimiters가 ES6 템플릿 문자열 스타일로 변경
      delimiters: ['${', '}']
    })
    ```

## inheritAttrs

- **유형:** `boolean`

- **기본값:** `true`

- **상세:**

    기본적으로 props로 인식되지 않는 상위 스코프의 속성 바인딩은 "흘러 내려가게(fallthrough)" 됩니다. 즉, 하나의 루트 컴포넌트(single-root component)가 있는 경우, 이러한 바인딩이 일반적인 HTML 속성으로 하위 컴포넌트의 루트 엘리먼트에 적용됩니다. 대상 엘리먼트나 다른 컴포넌트를 감싸는 컴포넌트를 만들 때, 항상 원하는 동작을 하지않을 수 있습니다. `initAttrs`를 `false`로 설정하면 기본적인 동작이 중지됩니다. 이 속성은 `$attrs` 인스턴스 속성을 통해 사용할 수 있으며, `v-bind`를 사용하여 루트가 아닌(non-root) 엘리먼트에 명시적으로 바인딩할 수 있습니다.

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
