# 애플리케이션 API (Application API)

Vue의 동작을 전역적으로 변경하는 API가 Vue3의 새로운 `createApp` 메소드에 의해 생성된 애플리케이션 인스턴스로 이동합니다. 또한, 특정 애플리케이션의 인스턴스 범위에서만 영향을 줍니다:

```js
import { createApp } from 'vue'

const app = createApp({})
```

`createApp`는 애플리케이션 인스턴스를 반환합니다. 이 인스턴스는 애플리케이션 컨텍스트를 제공합니다. 애플리케이션 인스턴스에 의해 마운트된 전체 컴포넌트 트리는 동일한 컨텍스트를 공유하며, 이전 Vue 2.x에서 "글로벌(global)" 이었던 구성(configurations)들을 제공합니다.

또한, `createApp` 메소드는 애플리케이션 인스턴스 자체를 반환하므로, 다음 섹션에서 확인할 수 있는 다른 메서드들을 인스턴스에 연결할 수 있습니다.

## component

- **전달인자:**

    - `{string} name`
    - `{Function | Object} definition (optional)`

- **반환값:**

    - `definition` 인자가 전달된 경우 애플리케이션 인스턴스 반환
    - `definition` 인자가 전달되지 않은 경우 컴포넌트 정의 반환

- **사용방법:**

    전역 컴포넌트를 등록하거나 검색합니다. 입력된 `name` 매개변수는 컴포넌트의 `name` 을 자동으로 설정하여 등록합니다.

- **예시:**

```js
import { createApp } from 'vue'

const app = createApp({})

// 옵션 객체(options object)를 등록
app.component('my-component', {
  /* ... */
})

// 등록된 컴포넌트를 검색
const MyComponent = app.component('my-component')
```

- **참고:**
    [컴포넌트(Components)](../guide/component-basics.html)

## config

- **사용방법:**

애플리케이션 구성(configuration)을 포함하는 객체 입니다.

- **예시:**

```js
import { createApp } from 'vue'
const app = createApp({})

app.config = {...}
```

- **참고:**
    [애플리케이션 구성(Application Config)](./application-config.html)

## directive

- **전달인자:**

    - `{string} name`
    - `{Function | Object} [definition]`

- **반환값:**

    - `definition` 인자가 전달된 경우 애플리케이션 인스턴스 반환
    - `definition` 인자가 전달되지 않은 경우 디렉티브 정의 반환

- **사용방법:**

    전역 디렉티브를 등록하거나 검색합니다.

- **예시:**

```js
import { createApp } from 'vue'
const app = createApp({})

// 등록
app.directive('my-directive', {
  // directive는 라이프사이클 훅 세트를 가집니다.
  // 바인딩 된 엘리먼트의 부모 컴포넌트가 마운트되기 전에 호출
  beforeMount() {},

  // 바인딩 된 엘리먼트의 부모 컴포넌트가 마운트 될 때 호출
  mounted() {},

  // 포함하고있는 컴포넌트의 VNode 가 업데이트되기 전에 호출
  beforeUpdate() {},

  // 포함하고있는 컴포넌트의 VNode 와 자식 VNode 가 업데이트 된 후 호출
  updated() {},

  // 바인딩된 엘리먼트의 부모 컴포넌트가 마운트 해제되기 전에 호출
  beforeUnmount() {},

  // 바인딩된 엘리먼트의 부모 컴포넌트가 마운트 해제 될 때 호출
  unmounted() {}
})

// 함수 디렉티브(function directive) 등록
app.directive('my-directive', () => {
  // 이 부분은 `mounted`와 `updated`로 호출
})

// 게터(getter), 등록된 경우 디렉티브 정의를 반환
const myDirective = app.directive('my-directive')
```

디렉티브 훅에는 다음과 같은 인자들이 전달됩니다:

#### el

디렉티브에 바인딩된 엘리먼트를 나타냅니다. 이 엘리먼트를 이용하여 DOM을 직접 조작(manipulate)하는데 사용할 수 있습니다.

#### binding

바인딩 객체는 다음과 같은 속성들을 포함하고 있습니다.

- `instance`: 디렉티브가 사용되는 컴포넌트의 인스턴스
- `value`: 디렉티브에 전달된 값. 예를 들어 `v-my-directive="1 + 1"`, 에서 전달된 값은 `2` 가 됩니다.
- `oldValue`: 이전 값이며,  `beforeUpdate` 와 `updated` 에서만 사용이 가능합니다. 값 변경에 관계없이 사용할 수 있습니다.
- `arg`: 디렉티브에 전달된 인자. 예를 들어 `v-my-directive:foo` 에서, 전달된 인자는 `"foo"` 가 됩니다.
- `modifiers`: 수식어를 포함하는 객체. 예를 들어 `v-my-directive.foo.bar` 에서, 수식어 객체는 `{ foo: true, bar: true }` 가 됩니다.
- `dir`: 디렉티브가 등록될 때 매개 변수로 전달되는 객체. 예를 들어, 아래 디렉티브에서

```js
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

`dir` 객체는 다음과 같습니다:

```js
{
  mounted(el) {
    el.focus()
  }
}
```

#### vnode

위의 el 인자로 받은 실제 DOM 엘리먼트의 청사진입니다. vnode 는 가상 DOM 노드를 의미합니다.

#### prevNode

이전 가상 노드 입니다. `beforeUpdate` 와 `updated` 훅에서만 사용할 수 있습니다.

:::tip Note 
`el` 인자와는 별도로, 이러한 인자들은 읽기전용(read-only)이므로 절대 수정하지 마세요. 만약 훅 간에 정보를 공유해야 한다면, 엘리먼트의 [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) 을 이용하여 공유하는 것이 좋습니다. 
:::

- **참고:**
    [커스텀 디렉티브(Custom Directives)](../guide/custom-directive.html)

## mixin

- **전달인자:**

    - `{Object} mixin`

- **반환값:**

    - 애플리케이션 인스턴스 반환

- **사용방법:**

    애플리케이션 전역에 믹스인을 등록합니다. 일단 등록되면 믹스인은 현재 애플리케이션 내 모든 컴포넌트 템플릿에서 사용할 수 있습니다. 믹스인은 플러그인 작성자가 컴포넌트에 커스텀 기능을 주입하는 데 사용할 수 있습니다. **애플리케이션 코드에서 권장되지 않음.**

- [전역 믹스인(Global Mixin)](../guide/mixins.html#global-mixin)

## mount

- **전달인자:**

    - `{Element | string} rootContainer`
    - `{boolean} isHydrate (optional)`

- **반환값:**

    - 루트 컴포넌트 인스턴스 반환

- **사용방법:**

    제공된 DOM 엘리먼트에 애플리케이션 인스턴스의 루트 컴포넌트를 마운트합니다.

- **예시:**

```html
<body>
  <div id="my-app"></div>
</body>
```

```js
import { createApp } from 'vue'

const app = createApp({})
// 필요한 준비를 합니다.
app.mount('#my-app')
```

- **참고:**
    - [라이프사이클 다이어그램(Lifecycle Diagram)](../guide/instance.html#lifecycle-diagram)

## provide

- **전달인자:**

    - `{string | Symbol} key`
    - `value`

- **반환값:**

    - 애플리케이션 인스턴스 반환

- **사용방법:**

    애플리케이션 내의 모든 컴포넌트에 주입할 수 있는 값을 설정합니다. 컴포넌트는 제공된 값을 받기 위해 `inject`를 사용해야 합니다.

    `provide`/`inject` 관점에서, 애플리케이션은 루트 컴포넌트가 유일한 자식인 루트 수준 상위 항목으로 생각할 수 있습니다.

    이 메소드를 composition API 의 [provide component option](options-composition.html#provide-inject) 또는 [provide function](composition-api.html#provide-inject) 과 혼동해서는 안됩니다. 이들은 동일한 `provide`/`inject` 메커니즘의 일부이기도 하지만, 애플리케이션이 아닌 컴포넌트에서 제공하는 값을 구성하는데 사용됩니다.

    일반적으로 플러그인은 컴포넌트를 사용하여 값을 제공할 수 없기 때문에, 애플리케이션을 통해 값을 제공하는 것은 플러그인을 작성할 때 특히 유용합니다. [globalProperties](application-config.html#globalproperties) 대신에 사용할 수 있습니다.

    :::tip Note 
    `provides` 및 `inject` 바인딩은 반응성(reactive)이 없습니다. 이것은 의도적입니다. 그러나 관찰된 객체(observed object)를 전달하면 해당 객체의 속성은 반응성(reactive)은 유지됩니다. 
    :::

- **예시:**

    애플리케이션이 제공하는 값을 사용하여 루트 컴포넌트에 속성 주입:

```js
import { createApp } from 'vue'

const app = createApp({
  inject: ['user'],
  template: `
    <div>
      {{ user }}
    </div>
  `
})

app.provide('user', 'administrator')
```

- **참고:**
    - [Provide / Inject](../guide/component-provide-inject.md)

## unmount

- **전달인자:**

    - `{Element | string} rootContainer`

- **사용방법:**

    제공된 DOM 엘리먼트에서 애플리케이션 인스턴스의 루트 컴포넌트를 마운트 해제합니다.

- **예시:**

```html
<body>
  <div id="my-app"></div>
</body>
```

```js
import { createApp } from 'vue'

const app = createApp({})
// 필요한 준비를 합니다.
app.mount('#my-app')

// 마운트된 후 5초 후에 애플리케이션이 마운트 해제(unmount)됩니다.
setTimeout(() => app.unmount('#my-app'), 5000)
```

## use

- **전달인자:**

    - `{Object | Function} plugin`
    - `...options (optional)`

- **반환값:**

    - 애플리케이션 인스턴스 반환

- **사용방법:**

    Vue.js 플러그인을 설치하세요. 플러그인이 객체인 경우에는 `install` 메서드를 노출해야합니다. 함수인 경우, install 메소드로 처리됩니다.

    애플리케이션을 첫 번째 인자로 사용하여 install 메소드가 호출됩니다. `use` 에 전달된 모든 `options`는 후속 인자로 전달됩니다.

    동일한 플러그인에서 이 메소드를 여러번 호출되면 플러그인은 한 번만 설치됩니다.

- [플러그인(Plugins)](../guide/plugins.html)
