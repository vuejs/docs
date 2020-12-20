# 디렉티브(Directives)

## v-text

- **요구값:** `string`

- **설명:**

    엘리먼트의 [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) 를 업데이트합니다. `textContent` 의 일부를 업데이트해야하는 경우 [머스태시 보간법(mustache interpolations)](/guide/template-syntax.html#text)을 사용해야합니다.

- **예시:**

    ```html
    <span v-text="msg"></span>
    <!-- 같은 방법 -->
    <span>{{msg}}</span>
    ```

- [데이터 바인딩 구문(Data Binding Syntax) - 보간법(Interpolations)](../guide/template-syntax.html#text)

## v-html

- **요구값:** `string`

- **설명:**

    요소의 [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) 을 업데이트 합니다. **컨텐츠는 일반 HTML 로 삽입됩니다 - Vue 템플릿으로 컴파일 되지 않습니다.** `v-html` 을 사용하여 템플릿을 작성하려는 경우에, 컴포넌트를 사용하는 해결법으로 다시 생각해보세요.

    ::: 경고 웹 사이트에서 임의의 HTML 을 동적으로 렌더링 하면 [XSS 공격](https://en.wikipedia.org/wiki/Cross-site_scripting) 을 쉽게 발생시킬 수 있으므로 매우 위험합니다. 신뢰할 수 있는 컨텐츠에는 `v-html` 을 사용하고 사용자가 제공한 컨텐츠에는 **절대로 사용하지 마세요.** :::

    [싱글파일컴포넌트(SFC)](../guide/single-file-component.html) 에서, `scoped` 스타일은 `v-html` 내부의 컨텐츠에 적용되지 않습니다. 해당 HTML 은 Vue 의 템플릿 컴파일러에서 처리되지 않기 때문입니다. scoped CSS 를 사용하여 `v-html` 컨테츠를 대상으로 지정하려면, [CSS modeuls](https://vue-loader.vuejs.org/en/features/css-modules.html) 또는 BEM 과 같은 수동 범위 지정 전략과 함께 추가 글로벌 `<style>` 요소를 사용해야 합니다.

- **예시:**

    ```html
    <div v-html="html"></div>
    ```

- [데이터 바인딩 구문(Data Binding Syntax) - 보간법(Interpolations)](../guide/template-syntax.html#raw-html)

## v-show

- **요구값:** `any`

- **사용방법:**

    표현식 값의 참-거짓을 기반으로 엘리먼트의 `display` CSS 속성을 전환합니다.

    이 디렉티브는 조건이 변경 될 때 transition 을 전환합니다.

- [조건부 렌더링(Conditional Rendering) - v-show](../guide/conditional.html#v-show)

## v-if

- **요구값:** `any`

- **사용방법:**

    표현식 값의 참-거짓에 따라 엘리먼트를 조건부로 렌더링 합니다. 엘리먼트와 포함된 디렉티브 / 컴포넌트는 전환하는 동안 파괴되고 재구성 됩니다. 엘리먼트가 `<template>` 엘리먼트인 경우 해당 컨텐츠가 조건부 블록으로 추출됩니다.

    이 디렉티브는 조건이 변경 될 때 transition 을 전환합니다.

    `v-if` 와 함께 사용할 경우 `v-for`의 우선 순위가 v-if 보다 높습니다. 자세한 내용은 [list rendering guide](../guide/list.html#v-for-with-v-if) 를 참고해주세요.

- [조건부 렌더링(Conditional Rendering) - v-if](../guide/conditional.html#v-if)

## v-else

- **표현식을 요구하지 않습니다.**

- **제약조건:** 이전 형제 엘리먼트에는 `v-if` 또는 `v-else-if` 가 있어야 합니다.

- **사용방법:**

    `v-if` 또는 `v-if` / `v-else-if` 체인의 "else block"을 나타냅니다.

    ```html
    <div v-if="Math.random() > 0.5">
      Now you see me
    </div>
    <div v-else>
      Now you don't
    </div>
    ```

- [조건부 렌더링(Conditional Rendering) - v-else](../guide/conditional.html#v-else)

## v-else-if

- **요구값:** `any`

- **제약조건:** 이전 형제 엘리먼트에는 `v-if` 또는 `v-else-if` 가 있어야 합니다.

- **사용방법:**

    `v-if` 의 "else if block"을 나타냅니다. 연결될 수 있습니다.

    ```html
    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
    ```

- [조건부 렌더링(Conditional Rendering) - v-else-if](../guide/conditional.html#v-else-if)

## v-for

- **요구값:** `Array | Object | number | string | Iterable`

- **사용방법:**

    원본 데이터를 기준으로 엘리먼트 또는 템플릿 블록을 여러번 렌더링 합니다. 디렉티브의 값은 반복되는 현재 엘리먼트의 별칭을 제공하기 위해 특수 구문인 `alias in expression` 을 사용해야 합니다.

    ```html
    <div v-for="item in items">
      {{ item.text }}
    </div>
    ```

    또는, 인덱스의 별칭 (또는 객체에서 사용되는 경우 키)을 지정할 수도 있습니다:

    ```html
    <div v-for="(item, index) in items"></div>
    <div v-for="(value, key) in object"></div>
    <div v-for="(value, name, index) in object"></div>
    ```

    `v-for` 의 기본동작은 엘리먼트를 이동하지 않고 인플레이스(in-place) 패치를 시도합니다. 엘리먼트를 강제로 재정렬하면, `key` 특수 속성과 함께 정렬힌트를 제공해야 합니다.

    ```html
    <div v-for="item in items" :key="item.id">
      {{ item.text }}
    </div>
    ```

    `v-for` 는 기본 `Map` 및 `Set` 을 포함하여 [반복 가능한 프로토콜(Iterable Protocol)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)을 구현하는 값에서도 동작이 가능합니다.

    `v-for` 의 자세한 사용법은 아래 링크 된 가이드 섹션에 설명되어 있습니다.

- **참고:**

    - [리스트 렌더링(List Rendering)](../guide/list.html)

## v-on

- **약칭:** `@`

- **요구값:** `Function | Inline Statement | Object`

- **전달인자:** `event`

- **수식어:**

    - `.stop` - `event.stopPropagation()` 메서드를 호출.
    - `.prevent` - `event.preventDefault()` 메서드를 호출.
    - `.capture` - 이벤트 리스너에 캡쳐모드를 추가.
    - `.self` - 해당 엘리먼트에서 이벤트가 전달된 경우에만 동작.
    - `.{keyAlias}` - 특정 키에 대해서만 동작.
    - `.once` - 한번만 핸들러가 동작.
    - `.left` - 마우스 왼쪽 버튼 이벤트에만 핸들러 동작.
    - `.right` - 마우스 오른쪽 버튼 이벤트에만 핸들러 동작.
    - `.middle` - 마우스 가운데 버튼 이벤트에만 핸들러 동작.
    - `.passive` - `{ passive: true }` 속성을 DOM 이벤트에 추가.

- **사용방법:**

    엘리먼트에 이벤트 리스너를 연결합니다. 이벤트 유형은 인자로 표시됩니다. 표현식은 메서드명, 인라인 구문이거나 수식어가있는 경우 생략 될 수 있습니다.

    일반 엘리먼트에서 사용되는 경우 [**native DOM events**](https://developer.mozilla.org/en-US/docs/Web/Events) 만 수신합니다. 커스텀 엘리먼트 컴포넌트에서  사용되는 경우 해당 자식 컴포넌트에서 내보낸 **custom events** 를 수신합니다.

    네이티브 DOM 이벤트를 수신 할 때, 메서드는 유일한 인자로 네이티브 이벤트를 받습니다. 인라인 구문을 사용하는 경우, 구문은 특별한 `$event` 속성인 `v-on:click="handle('ok', $event)"` 에 접근 할 수 있습니다.

    `v-on` 은 인자없이 이벤트/리스너 쌍의 객체에 대한 바인딩도 지원합니다. 오브젝트 구문을 사용할 때 수식어를 지원하지 않습니다.

- **예시:**

    ```html
    <!-- 메서드 핸들러 -->
    <button v-on:click="doThis"></button>

    <!-- 동적 이벤트 -->
    <button v-on:[event]="doThis"></button>

    <!-- 인라인 구문 -->
    <button v-on:click="doThat('hello', $event)"></button>

    <!-- 약칭 -->
    <button @click="doThis"></button>

    <!-- 약칭 동적 이벤트 (2.6.0+) -->
    <button @[event]="doThis"></button>

    <!-- 전파 중지(stop propagation) -->
    <button @click.stop="doThis"></button>

    <!-- 전파 방지(prevent default) -->
    <button @click.prevent="doThis"></button>

    <!-- 표현식이 없는 전파 방지 -->
    <form @submit.prevent></form>

    <!-- 체이닝 수식어 -->
    <button @click.stop.prevent="doThis"></button>

    <!-- 키 수식어(키 별칭) -->
    <input @keyup.enter="onEnter" />

    <!-- 클릭 이벤트는 단 한번 동작 -->
    <button v-on:click.once="doThis"></button>

    <!-- 오브젝트 구문 -->
    <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
    ```

    자식 컴포넌트에서 커스텀 이벤트 수신 ( "my-event"가 자식 컴포넌트에서 내보낼 때 핸들러가 호출됨):

    ```html
    <my-component @my-event="handleThis"></my-component>

    <!-- 인라인 구문 -->
    <my-component @my-event="handleThis(123, $event)"></my-component>
    ```

- **참고:**

    - [이벤트 핸들링(Event Handling)](../guide/events.html)
    - [컴포넌트(Components) - 커스텀 이벤트(Custom Events)](../guide/component-basics.html#listening-to-child-components-events)

## v-bind

- **약칭:** `:`

- **요구값:** `any (with argument) | Object (without argument)`

- **전달인자:** `attrOrProp (optional)`

- **수식어:**

    - `.camel` - 케밥 케이스(kebab-case) 속성 이름을 카멜 케이스(camelCase) 로 변환.

- **사용방법:**

    하나 이상의 속성 또는 컴포넌트 prop을 표현식에 동적으로 바인딩합니다.

    `class` 또는 `style` 속성을 바인딩하는 데 사용되는 경우 Array 또는 Objects 와 같은 추가 값 유형을 지원합니다. 자세한 내용은 아래 링크된 가이드 섹션을 참조하세요.

    prop 바인딩에 사용되는 경우 prop 은 자식 컴포넌트에서 올바르게 선언 되어야합니다.

    인자없이 사용하면 속성 이름-값 쌍을 포함하는 객체를 바인딩하는 데 사용할 수 있습니다. 이 모드에서는 `class` 및 `style` 이 배열 또는 객체를 지원하지 않습니다.

- **예시:**

    ```html
    <!-- 속성 바인드 -->
    <img v-bind:src="imageSrc" />

    <!-- 동적 속성 이름 -->
    <button v-bind:[key]="value"></button>

    <!-- 약어 -->
    <img :src="imageSrc" />

    <!-- 약어를 적용한 동적 속성 이름 -->
    <button :[key]="value"></button>

    <!-- 인라인 문자열 연결 -->
    <img :src="'/path/to/images/' + fileName" />

    <!-- CSS 클래스 바인딩 -->
    <div :class="{ red: isRed }"></div>
    <div :class="[classA, classB]"></div>
    <div :class="[classA, { classB: isB, classC: isC }]">

    <!-- CSS 스타일 바인딩 -->
    <div :style="{ fontSize: size + 'px' }"></div>
    <div :style="[styleObjectA, styleObjectB]"></div>

    <!-- 속성 객체 바인딩 -->
    <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

    <!-- prop 바인딩. "prop" 은 my-component 에서 선언되어야 합니다. -->
    <my-component :prop="someThing"></my-component>

    <!-- 자식 컴포넌트와 공통으로 부모 props 전달 -->
    <child-component v-bind="$props"></child-component>

    <!-- XLink -->
    <svg><a :xlink:special="foo"></a></svg>
    </div>
    ```

    `.camel` 수식어를 사용하면 내부 DOM 템플릿을 사용할 때 `v-bind` 속성 이름을 camelizing 할 수 있습니다.(예: SVG `viewBox` 속성)

    ```html
    <svg :view-box.camel="viewBox"></svg>
    ```

    문자열 템플릿을 사용하거나 `vue-loader`/`vueify` 로 컴파일하는 경우 `.camel` 이 필요하지 않습니다.

- **참고:**

    - [클래스와 스타일 바인딩(Class and Style Binding)](../guide/class-and-style.html)
    - [컴포넌트(Components) - Props](../guide/component-basics.html#passing-data-to-child-components-with-props)

## v-model

- **요구값:** 폼 입력 엘리먼트의 값 또는 컴포넌트의 출력에 따라 다릅니다.

- **제약조건:**

    - `<input>`
    - `<select>`
    - `<textarea>`
    - components

- **수식어:**

    - [`.lazy`](../guide/forms.html#lazy) - `input` 대신에 `change` 이벤트를 수신
    - [`.number`](../guide/forms.html#number) - 유효한 입력 문자열을 숫자로 캐스팅
    - [`.trim`](../guide/forms.html#trim) - 입력값을 트림(trim)처리

- **사용방법:**

    폼 입력 엘리먼트 또는 컴포넌트에 양방향 바인딩을 생성합니다. 자세한 사용법 및 기타 참고사항은 아래 링크된 가이드 섹션을 참조하세요.

- **참고:**

    - [입력 폼 바인딩(Form Input Bindings)](../guide/forms.html)
    - [컴포넌트(Components) - 커스텀 이벤트를 사용한 폼 입력 컴포넌트(Form Input Components using Custom Events)](../guide/component-custom-events.html#v-model-arguments)

## v-slot

- **약칭:** `#`

- **요구값:** 함수 인자 위치에서 유효한 자바 스크립트 표현식입니다 ([supported environments](../guide/component-slots.html#destructuring-slot-props) 에서 구조분해지원). 선택사항-props 가 슬롯에 전달 될 것으로 예상하는 경우에만 필요합니다.

- **전달인자:** slot name (optional, defaults to `default`)

- **제약조건:**

    - `<template>`
    - [components](../guide/component-slots.html#abbreviated-syntax-for-lone-default-slots) (props 가 있는 단일 기본 슬롯)

- **사용방법:**

    props 를 받을것으로 예상되는 named slot 또는 slot 을 나타냅니다.

- **예시:**

    ```html
    <!-- 이름있는 슬롯(Named slots) -->
    <base-layout>
      <template v-slot:header>
        Header content
      </template>

      <template v-slot:default>
        Default slot content
      </template>

      <template v-slot:footer>
        Footer content
      </template>
    </base-layout>

    <!-- 이름있는 슬롯(Named slot) 에서 props 를 받는 경우 -->
    <infinite-scroll>
      <template v-slot:item="slotProps">
        <div class="item">
          {{ slotProps.item.text }}
        </div>
      </template>
    </infinite-scroll>

    <!-- 기본 슬롯(default slot) 에서 props 를 받는경우(구조분해할당) -->
    <mouse-position v-slot="{ x, y }">
      Mouse position: {{ x }}, {{ y }}
    </mouse-position>
    ```

    자세한 내용은 아래 링크를 참조해주세요.

- **참고:**

    - [컴포넌트(Components) - 슬롯(Slots)](../guide/component-slots.html)

## v-pre

- **표현식을 요구하지 않습니다.**

- **사용방법:**

    이 엘리먼트와 모든 하위 엘리먼트에 대한 컴파일을 건너 뜁니다. 원시 mustache 태그를 표시하는데 사용할 수 있습니다. 디렉티브가 없는 많은 노드를 건너 뛰면 컴파일 속도가 빨라질 수 있습니다.

- **예시:**

    ```html
    <span v-pre>{{ this will not be compiled }}</span>
    ```

## v-cloak

- **표현식을 요구하지 않습니다.**

- **사용방법:**

    이 디렉티브는 연결된 컴포넌트 인스턴스가 컴파일을 완료 할 때 까지 엘리먼트에 남아있습니다. `[v-cloak] { display: none }` 과 같은 CSS 규칙들이 합쳐진, 이 디렉티브는 컴포넌트 인스턴스가 준비될 때 까지 컴파일 되지 않은 mustache 바인딩을 숨기는데 사용할 수 있습니다.

- **예시:**

    ```css
    [v-cloak] {
      display: none;
    }
    ```

    ```html
    <div v-cloak>
      {{ message }}
    </div>
    ```

    `<div>`은 컴파일이 완료 될 때까지 표시되지 않습니다.

## v-once

- **표현식을 요구하지 않습니다.**

- **설명:**

    엘리먼트와 컴포넌트를 **한번(once)** 만 렌더링합니다. 이후에 재렌더링 할 때 엘러먼트/컴포넌트 및 모든 하위 엘리먼트는 정적 컨텐츠로 처리되고 건너 뜁니다. 업데이트 성능을 최적화하는데 사용할 수 있습니다.

    ```html
    <!-- 단일 엘리먼트 -->
    <span v-once>This will never change: {{msg}}</span>
    <!-- 엘리먼트가 자식 엘리먼트를 가진 경우 -->
    <div v-once>
      <h1>comment</h1>
      <p>{{msg}}</p>
    </div>
    <!-- 컴포넌트 -->
    <my-component v-once :comment="msg"></my-component>
    <!-- `v-for` 디렉티브 -->
    <ul>
      <li v-for="i in list" v-once>{{i}}</li>
    </ul>
    ```

- **참고:**

    - [데이터 바인딩 구문(Data Binding Syntax) - 보간법(Interpolations)](../guide/template-syntax.html#text)

## v-is

> 참고: 이 섹션은 Vue 템플릿이 페이지의 HTML 에 직접 작성된 경우에만 영향을줍니다.

- **요구값:** 문자열 리터럴

- **제약조건:** 기본 HTML 엘리먼트

- **사용방법:** When using in-DOM templates, the template is subject to native HTML parsing rules. Some HTML elements, such as `<ul>`, `<ol>`, `<table>` and `<select>` have restrictions on what elements can appear inside them, and some elements such as `<li>`, `<tr>`, and `<option>` can only appear inside certain other elements. As a workaround, we can use `v-is` directive on these elements:

```html
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

::: 경고 `v-is` 는 동적 2.x `:is` 바인딩과 같은 기능을 합니다. 따라서 등록된 이름으로 컴포넌트를 렌더링하려면 해당 값이 자바스크립트 문자열 리터럴이어야합니다. :

```html
<!-- 올바르지 않은 사용법, 아무것도 렌더링 되지 않습니다. -->
<tr v-is="blog-post-row"></tr>

<!-- 올바른 사용법 -->
<tr v-is="'blog-post-row'"></tr>
```

:::
