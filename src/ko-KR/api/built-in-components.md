# 내장 컴포넌트(Built-In Components)

## component

- **Props:**

    - `is` - `string | Component`

- **사용방법:**

    동적 컴포넌트를 렌더링 하기위한 "메타 컴포넌트" 입니다. 렌더링 할 실제 컴포넌트는 `is` prop에 의해 결정됩니다. 문자열로서의 <code>is</code> prop는 HTML 태그 이름 또는 컴포넌트 이름 일 수 있습니다.

- **예시:**

    ```html
    <!-- vm의 `componentId` 속성에 의해 제어되는 동적 컴포넌트 -->
    <component :is="componentId"></component>

    <!-- 동적 컴포넌트는 등록된 컴포넌트나 prop로 전달된 컴포넌트를 렌더링할 수도 있습니다. -->
    <component :is="$options.components.child"></component>

    <!-- 동적 컴포넌트는 문자열로 컴포넌트를 참조할 수 있습니다. -->
    <component :is="condition ? 'FooComponent' : 'BarComponent'"></component>

    <!-- 동적 컴포넌트는 네이티브 HTML 엘레멘트를 렌더링하는데 사용될 수 있습니다. -->
    <component :is="href ? 'a' : 'span'"></component>
    ```

- [동적 컴포넌트(Dynamic Components)](../guide/component-dynamic-async.html)

## transition

- **Props:**

    - `name` - `string` transition CSS 클래스 이름을 자동으로 생성하는데 사용합니다. 예. `name: 'fade'` 는 <code>.fade-enter</code>, <code>.fade-enter-active</code>, 등으로 자동으로 확장됩니다.
    - `appear` - `boolean`, 초기 렌더링에 transition을 적용여부에 사용합니다. 기본값은  `false`입니다.
    - `persisted` - `boolean`. 값이 true이면, 실제로 요소를 삽입(insert)/제거(remove)하는 대신에 표시(show)/숨김(hidden) 상태를 전환하는 transition 임을 나타냅니다. 트랜지션 훅(transition hooks)이 삽입되지만, 렌더러에서는 건너뜁니다. 대신, 커스텀 디렉티브에 삽입된 훅(예. <code>v-show</code>)을 호출하여 transition을 조작할 수 있습니다.
    - `css` - `boolean`. CSS transition 클래스를 적용할지 여부에 사용됩니다. 기본값은 `true`. `false` 로 설정하면, 컴포넌트 이벤트를 통해 등록된 자바스크립트 훅에만 작동됩니다.
    - `type` - `string`. transition 종료 타이밍을 결정하기 위해 대기할 이벤트 유형을 지정합니다. 사용 가능한 값은 `"transition"`와  `"animation"` 입니다.  기본적으로, 지속시간이 긴 유형을 자동으로 감지합니다.
    - `mode` - `string` transition의 이탈(leaving)/진입(entering)에 타이밍 순서를 제어합니다. 사용 가능한 모드는 `"out-in"` 및 `"in-out"` 입니다. 기본값은 동시 모드 입니다.
    - `duration` - `number | {`enter`: number,`leave`: number }`. transition 지속시간을 지정합니다. 기본적으로, Vue 는 최상위 transition 요소에서 첫번째 `transitionend` 또는 `animationend` 이벤트를 기다립니다.
    - `enter-from-class` - `string`
    - `leave-from-class` - `string`
    - `appear-class` - `string`
    - `enter-to-class` - `string`
    - `leave-to-class` - `string`
    - `appear-to-class` - `string`
    - `enter-active-class` - `string`
    - `leave-active-class` - `string`
    - `appear-active-class` - `string`

- **Events:**

    - `before-enter`
    - `before-leave`
    - `enter`
    - `leave`
    - `appear`
    - `after-enter`
    - `after-leave`
    - `after-appear`
    - `enter-cancelled`
    - `leave-cancelled` (`v-show` only)
    - `appear-cancelled`

- **사용방법:**

    `<transition>` 태그는 **단일(single)** 엘리먼트 및 컴포넌트에 transition 효과를 제공합니다. `<transition>` 내부에 감싸여진 컨텐츠에만 transition 동작이 적용합니다. 추가 DOM 엘리먼트를 렌더링하지 않거나, 검사된 컴포넌트 계층에 표시 할 수는 없습니다.

    ```html
    <!-- 간단한 엘레멘트 -->
    <transition>
      <div v-if="ok">toggled content</div>
    </transition>

    <!-- 동적 컴포넌트 -->
    <transition name="fade" mode="out-in" appear>
      <component :is="view"></component>
    </transition>

    <!-- 이벤트 후킹(event hooking) -->
    <div id="transition-demo">
      <transition @after-enter="transitionComplete">
        <div v-show="ok">toggled content</div>
      </transition>
    </div>
    ```

    ```js
    const app = Vue.createApp({
      ...
      methods: {
        transitionComplete (el) {
          // DOM 요소를 인자로 전달한 'el'에 대해 무언가를 합니다.
        }
      }
      ...
    })

    app.mount('#transition-demo')
    ```

- [진입&이탈 트랜지션(Enter & Leave Transitions)](/guide/transitions-enterleave.html#transitioning-single-elements-components)

## transition-group

- **Props:**

    - `tag` - `string`, 기본값  `span`.
    - `move-class` - transition 전환 중에 CSS 클래스를 덮어씁니다.
    - `mode` 를 제외하고, `<transition>`과 동일한 props를 노출합니다.

- **이벤트:**

    - `<transition>`과 동일한 이벤트를 노출합니다.

- **사용방법:**

    `<transition-group>`은 **여러** 엘리먼트/컴포넌트에 transition 효과를 줍니다. `<transition-group>`은 실제 DOM 엘리먼트를 렌더링 합니다. 기본적으로 `<span>`을 렌더링 하며, `tag` 속성을 통해 렌더링해야하는 엘리먼트를 구성할 수 있습니다.

    애니메이션이 제대로 동작하려면, `<transition-group>`의 모든 하위 항목에 [**고유한 키(uniquely keyed)**](./special-attributes.html#key)가 지정되어야 합니다.

    `<transition-group>`은 CSS transform을 통한 transition 이동을 지원합니다. 업데이트 후 화면에서 자식요소의 위치가 변경되면, 움직이는 CSS 클래스가 적용됩니다.(`name` 속성에서 자동 생성되거나 `move-class` 속성으로 구성됩니다). 움직이는 클래스(moving class)가 적용될 때 CSS `transform` 속성이 "전환 가능(transition-able)" 인 경우, 엘리먼트는 [FLIP technique](https://aerotwist.com/blog/flip-your-animations/)을 사용하여 대상으로 부드럽게 애니메이션됩니다.

    ```html
    <transition-group tag="ul" name="slide">
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </transition-group>
    ```

- [리스트 트랜지션(List Transitions)](/guide/transitions-list.html)

## keep-alive

- **Props:**

    - `include` - `string | RegExp | Array`. 이름이 일치하는 컴포넌트만 캐시됩니다.
    - `exclude` - `string | RegExp | Array`. 이름이 일치하는 컴포넌트를 캐시하지 않습니다.
    - `max` - `number | string`. 캐시할 최대 컴포넌트 인스턴스 수입니다.

- **사용방법:**

    동적 컴포넌트를 감싸면, `<keep-alive>`는 비활성 컴포넌트 인스턴스를 삭제하지 않고 캐시합니다. `<transition>`과 마찬가지로, `<keep-alive>`는 추상적인 컴포넌트입니다. DOM 엘리먼트 자체를 렌더링하지않고, 컴포넌트 상위 체인에 표시되지 않습니다.

    컴포넌트가 `<keep-alive>` 내에서 전환되면, `activated`와 `deactivated` 라이프사이클 훅이 호출이 됩니다.

    주로 컴포넌트 상태를 유지하거나 다시 렌더링하지 않는데 사용됩니다.

    ```html
    <!-- 기본 -->
    <keep-alive>
      <component :is="view"></component>
    </keep-alive>

    <!-- 여러 조건부 자식들 -->
    <keep-alive>
      <comp-a v-if="a > 1"></comp-a>
      <comp-b v-else></comp-b>
    </keep-alive>

    <!-- `<transition>`과 함께 사용 -->
    <transition>
      <keep-alive>
        <component :is="view"></component>
      </keep-alive>
    </transition>
    ```

    `<keep-alive>`는 토글되는 바로 아래의 자식 컴포넌트가 하나만 있는 경우를 위해 구현되었습니다. 내부에 `v-for`가 있으면 동작하지 않습니다. 위와 같이 조건부 자식이 여러 개가 있는경우, `<keep-alive>` 컴포넌트는 한번에 하나의 자식만 렌더링해야 합니다.

- **`include` 및 `exclude`**

    `include` 및 `exclude` props를 사용하면 컴포넌트를 조건부로 캐시할 수 있습니다. 두 props 모두 쉼표로 구분된 문자열, 정규표현식(RegExp) 또는 배열일 수 있습니다.

    ```html
    <!-- 쉼표로 구분된 문자열 -->
    <keep-alive include="a,b">
      <component :is="view"></component>
    </keep-alive>

    <!-- 정규표현식(regex) (`v-bind` 사용) -->
    <keep-alive :include="/a|b/">
      <component :is="view"></component>
    </keep-alive>

    <!-- 배열 (`v-bind` 사용) -->
    <keep-alive :include="['a', 'b']">
      <component :is="view"></component>
    </keep-alive>
    ```

    먼저, 컴포넌트의 자체 `name` 옵션에서 일치하는지 확인한 다음에 `name` 옵션을 사용할 수 없는 경우 로컬 등록 이름(상위 `컴포넌트(components)` 옵션의 키)을 확인합니다.<br>익명 컴포넌트는 일치시킬 수 없습니다.

- **`max`**

    캐시할 최대 컴포넌트 인스턴스 수 입니다. 최대 개수에 도달하면 가장 먼저 접근하여 캐시된 컴포넌트 인스턴스는 새 인스턴스를 만들기 전에 삭제됩니다.

    ```html
    <keep-alive :max="10">
      <component :is="view"></component>
    </keep-alive>
    ```

::: warning 
`<keep-alive>`는 캐시할 인스턴스가 없기 때문에, 함수형 컴포넌트와 함께 작동하지 않습니다. 
:::

- [동적 컴포넌트(Dynamic Components) - keep-alive](../guide/component-dynamic-async.html#dynamic-components-with-keep-alive)

## slot

- **Props:**

    - `name` - `string`, 이름있는 슬롯(named slot)에 사용됨.

- **사용방법:**

    `<slot>`은 컴포넌트 템플릿에서 컨텐츠 배포 아웃렛(컨텐츠를 배포해주는) 역할을 합니다. `<slot>` 자체가 컨텐츠로 교체됩니다.

    자세한 사용방법은, 아래 링크된 가이드 섹션을 참조해주세요.

- [슬롯을 사용한 컨텐츠 배포(Content Distribution with Slots)](../guide/component-basics.html#content-distribution-with-slots)

## teleport

- **Props:**

    - `to` - `string`. 필수 prop이며, 유효한 쿼리 선택기(query selector) 또는 HTMLElement(브라우저 환경에서 사용되는 경우)여야 합니다. `<teleport>`내용을 이동할 대상 엘레멘트를 지정합니다.

    ```html
    <comment></comment>
    <teleport to="#some-id"></teleport>
    <teleport to=".some-class"></teleport>
    <teleport to="[data-teleport]"></teleport>

    <comment></comment>
    <teleport to="h1"></teleport>
    <teleport to="some-string"></teleport>
    ```

    - `disabled` - `boolean`. 이 선택적 prop 은 `<teleport>`의 기능을 비활성화하는데 사용할 수 있습니다. 즉, 슬롯 내용은 어디로도 이동되지 않으며, 주변 상위 컴포넌트에서 `<teleport>`를 지정한 위치에 렌더링됩니다.

    ```html
    <teleport to="#popup" :disabled="displayVideoInline">
      <video src="./my-movie.mp4">
    </teleport>
    ```

    이렇게 하면 삭제 및 재생성되는 대신에 실제 DOM 노드가 이동하고 모든 컴포넌트 인스턴스도 유지됩니다. 모든 상태를 가진 HTML 엘리먼트(예 : 재생중인 비디오)들은 상태를 유지합니다.

- [텔레포트 컴포넌트(Teleport component)](../guide/teleport.html#teleport)
