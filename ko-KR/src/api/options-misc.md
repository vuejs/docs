# 기타(Misc)

## name

- **유형:** `string`

- **제약:** 컴포넌트 옵션으로 사용될 때만 평가됩니다.

- **설명:**

    컴포넌트가 해당 템플릿에서 반복적으로 호출할 수 있도록 허용. 컴포넌트가 `Vue.createApp({}).component({})`, 에 전역으로 등록되면 글로벌 ID가 자동으로 해당 이름으로 설정된다는 점에 주의하십시오.

    `name` 옵션을 지정할 때의 또 다른 이점은 디버깅에 있습니다. 명명된 컴포넌트는 더 유용한 경고 메시지를 제공합니다. 또한, [vue-devtools](https://github.com/vuejs/vue-devtools)의 앱을 검사할 때 이름 없는 컴포넌트가 `<AnonymousComponent>` 로 표시되는데, 이는 그다지 유용한 정보가 아닙니다. `name` 옵션을 제공하면 훨씬 더 유용한 컴포넌트 트리를 얻을 수 있습니다.

## inheritAttrs

- **유형:** `boolean`

- **기본값:** `true`

- **설명:**

    기본적으로, prop 으로 인식되지 않는 부모 범위 속성 바인딩은 "폴스루(fallthrough)" 됩니다. 이것은 우리가 단일 루트 컴포넌트를 가지고 있을 때, 이러한 바인딩이 정상적인 HTML 속성으로 하위 컴포넌트의 루트 엘리먼트에 적용된다는 것을 의미한다. 대상 엘리먼트나 다른 컴포넌트를 감싸는 컴포넌트를 작성할 때, 이것이 항상 원하는 동작은 아닐 수 있다. `initAttrs` 을 `false` 로 설정하면 이 기본 동작을 사용하지 않도록 설정할 수 있습니다. 속성은 `$attrs` 인스턴스 속성을 통해 사용할 수 있으며 `v-bind` 를 사용하여 비루트(non-root) 엘리먼트에 명시적으로 바인딩할 수 있습니다.

    참고: 이 옵션은 `class` 및 `style` 바인딩에 **영향을 주지 않습니다.**

- **사용방법:**

    ```js
    app.component('base-input', {
      inheritAttrs: false,
      props: ['label', 'value'],
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

- [속성 상속 비활성화(Disabling Attribute Inheritance)](../guide/component-props.html#disabling-attribute-inheritance)
