# 특별한 속성들

## key

- **예상 타입:** `number | string`

  `key`라는 특수한 속성은 Vue의 가상 DOM 알고리즘이 새로운 노드 목록을 이전 목록과 비교할 때, VNode를 식별하기 위한 힌트로 사용됩니다. key가 없으면 Vue는 엘리먼트 이동을 최소화하고, 같은 유형의 엘리먼트를 제자리에서(in-place) 패치(patch)/재사용(reuse)하려는 알고리즘을 사용합니다. key를 사용하면, key의 순서 변경에 따라 엘리먼트를 재정렬하고, 더 이상 존재하지 않는 키가 있는 엘리먼트는 항상 제거(remove)/삭제(destroy)됩니다.

  동일한 부모의 자식 엘리먼트는 반드시 **고유 키**가 있어야 합니다. 키가 중복되면 렌더링 에러가 발생합니다.

  가장 일반적은 이용사례는 `v-for`입니다:

  ```html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  엘리먼트나 컴포넌트를 재사용하지 않고 강제로 대체할 때도 사용할 수 있습니다. 이는 다음과 같은 경우 유용합니다:

  - 컴포넌트의 라이프사이클 훅을 올바르게 발생시킬 때
  - transition 효과를 발생시킬 때

  예시:

  ```html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  `text`가 변경되면, `<span>`은 패치되는 대신에 항상 교체되므로 transition이 일어납니다.

## ref

- **예상 타입:** `string | Function`

  `ref`는 엘리먼트나 자식 컴포넌트에 대한 참조를 등록할 때 사용됩니다. ref 값은 부모 컴포넌트의 `$refs`객체 아래에 등록됩니다. 일반 DOM 엘리먼트에서 사용되는 경우 ref 값은 해당 엘리먼트가 됩니다. 하위 컴포넌트에서 사용되는 경우 ref 값은 컴포넌트 인스턴스가 됩니다:

  ```html
  <!-- vm.$refs.p은 DOM 노드가 됩니다. -->
  <p ref="p">hello</p>

  <!-- vm.$refs.child는 자식 컴포넌트 인스턴스가 됩니다 -->
  <child-component ref="child"></child-component>

  <!-- 동적으로 바인딩할 경우, ref를 엘리먼트나 컴포넌트 인스턴스를 명시적으로 전달하는 콜백 함수로 정의할 수 있습니다. -->
  <child-component :ref="(el) => child = el"></child-component>
  ```

  ref 등록 타이밍에 대한 중요한 참고 사항: ref는 자체는 렌더 함수의 결과로 생성되기 때문에, 초기 렌더링에서 접근할 수 없습니다. 아직 존재하지 않기 때문입니다! `$refs`도 반응형이 아니므로 데이터 바인딩을 위해 템플릿에서 사용해서는 안됩니다.

- **참고:** [Child Component Refs](../guide/component-template-refs.html)

## is

- **예상 타입:** `string | Object (컴포넌트의 option 객체)`

[동적 컴포넌트](../guide/component-dynamic-async.html)에 사용.

예시:

```html
<!-- currentView가 변할 때, component가 변경 -->
<component :is="currentView"></component>
```

- **참고:**
  - [동적 컴포넌트](../guide/component-dynamic-async.html)
  - [DOM 템플릿 파싱 주의사항](../guide/component-basics.html#dom-template-parsing-caveats)
