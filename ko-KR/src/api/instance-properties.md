# 인스턴스 프로퍼티

## $data

- **타입** `Object`

- **상세:**

    컴포넌트 인스턴스의 데이터 객체는 감시됩니다. 컴포넌트 인스턴트 프록시는 데이터 객체안에 있는 프로퍼티에 접근할 수 있습니다.

- [Options / Data - data](./options-data.html#data-2)

## $props

- **타입** `Object`

- **상세:**

    객체는 컴포넌트가 받은 현재 props을 나타냅니다. vue 인스턴스 프록시는 props 객체의 속성에 접근할 수 있습니다.

## $el

- **타입:** `any`

- **읽기 전용**

- **상세:**

    Vue 인스턴스가 관리하는 루트 DOM 요소입니다.

## $options

- **타입:** `Object`

- **읽기 전용**

- **상세:**

    현재 Vue 인스턴스에 사용되는 인스턴스화 옵션입니다. 옵션에 사용자 정의 속성을 포함하려는 경우 유용합니다:

    ```js
    const app = Vue.createApp({
      customOption: 'foo',
      created() {
        console.log(this.$options.customOption) // => 'foo'
      }
    })
    ```

## $parent

- **타입:** `Component instance`

- **읽기 전용**

- **상세:**

    현재 인스턴스에 상위 인스턴스가 있는 경우, 부모 인스턴스 입니다.

## $root

- **타입:** `Component instance`

- **읽기 전용**

- **상세:**

    현재 컴포넌트 트리의 루트 Vue 인스턴스입니다. 인스턴스에 부모가 없다면 이 값이 그 자체로 사용됩니다.

## $slots

- **타입:** `{ [name: string]: (...args: any[]) => Array<VNode> | undefined }`

- **읽기 전용**

- **상세:**

    프로그래밍으로 접근이 가능한 [슬롯을 사용한 컨텐츠를 배포할 때](../guide/component-basics.html#content-distribution-with-slots) 사용합니다. 각  [명명된 슬롯](../guide/component-slots.html#named-slots)은 고유한 속성을 가지고 있습니다(예. `v-slot:foo`는 `this.$slots.foo()`에서 찾을 수 있습니다).`default` 속성은 명명된 슬롯에 포함되지 않은 노드, 또는 `v-slot:default`의 컨텐츠를 포함합니다.

    `this.$slots`에 접근하는 것은 [렌더 함수](../guide/render-function.html)로 컴포넌트를 작성할 때 가장 유용합니다.

- **예시:**

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

- **참고:**

    - `<a href="built-in-components.html#slot"data-md-type="link"><슬롯></a>` 컴포넌트
    - [슬롯을 사용한 컨텐츠 배포](../guide/component-basics.html#content-distribution-with-slots)
    - [렌더함수- 슬롯](../guide/render-function.html#slots)

## $refs

- **타입:** `Object`

- **읽기 전용**

- **상세:**

[`ref` 속성](../guide/component-template-refs.html)이 등록된 자식 컴포넌트와 DOM 엘리먼트 객체입니다.

- **참고:**
    - [Template refs](../guide/component-template-refs.html)
    - [특수 속성 - ref](./special-attributes.md#ref)

## $attrs

- **Type:** `Object`

- **읽기 전용**

- **상세:**

[props](./options-data.html#props) 또는 [custom events](./options-data.html#emits)로 인식(및 추출)되지 않는 부모 범위 속성 바인딩입니다. 컴포넌트에 선언된 props나 custom events가 없을 때, 모든 부모 범위 바인딩을 기본적으로 포함하며 `v-bind="$attrs"`를 통해 내부 컴포넌트로 전달할 수 있습니다 - 하이 오더 컴포넌트(HOC)를 작성할 때 유용합니다.

- **참고:**
    - [Non-Prop 속성](../guide/component-attrs.html)
