# 전역 API

## createApp

컨텍스트를 제공하는 응용 프로그램 인스턴스를 반환합니다. 응용 프로그램 인스턴스에 의해 마운트 된 컴포넌트 트리 전체가 동일한 컨텍스트를 공유합니다.

```js
const app = Vue.createApp({})
```

You can chain other methods after `createApp`, they can be found in [Application API](./application-api.html)
`createApp` 이후에 다른 메서드를 연결할 수 있으며 [Application API](./application-api.html)에서 찾을 수 있습니다.

### 전달인자

이 함수는 첫 번째 매개변수로 루트 컴포넌트 옵션 개체를 받습니다.

```js
const app = Vue.createApp({
  data() {
    return {
      ...
    }
  },
  methods: {...},
  computed: {...}
  ...
})
```

두 번째 매개 변수를 사용하면 루트 props를 응용 프로그램에 전달할 수 있습니다.

```js
const app = Vue.createApp(
  {
    props: ['username']
  },
  { username: 'Evan' }
)
```


```html
<div id="app">
  <!-- 'Evan'이 표시됩니다. -->
  {{ username }}
</div>
```

### 작성법

```ts
interface Data {
  [key: string]: unknown
}

export type CreateAppFunction<HostElement> = (
  rootComponent: PublicAPIComponent,
  rootProps?: Data | null
) => App<HostElement>
```

## h

일반적으로 **VNode**로 축약되는 "가상 노드(virtual node)"를 반환합니다. 이는 모든 하위 노드에 대한 설명을 포함하여 페이지에서 어떤 종류의 노드를 렌더링해야 하는지 Vue에 설명하는 정보를 포함하는 일반 개체입니다. 수동으로 작성된 [렌더링 함수](../guide/render-function.md)를 대상으로하고 있습니다.

```js
render() {
  return Vue.h('h1', {}, 'Some title')
}
```

### 전달인자

허용된 세 가지 인자: `tag`, `props`, `children`

#### tag

- **Type:** `String | Object | Function`

- **Details:**

  HTML 태그 이름, 컴포넌트, 비동기 컴포넌트 또는 null입니다. null을 사용하면 주석이 표시됩니다. 이 매개변수는 필수입니다.

#### props

- **Type:** `Object`

- **Details:**

  템플릿에서 사용하는 attributes, props, events에 해당하는 개체입니다. (선택사항)

#### children

- **Type:** `String | Array | Object`

- **Details:**

  `h()`를 사용하여 빌드하거나 문자열을 사용하여 "text VNodes" 또는 슬롯이 있는 객체를 가져옵니다. (선택사항)

  ```js
  h('div', {}, [
    'Some text comes first.',
    h('h1', 'A headline'),
    h(MyComponent, {
      someProp: 'foobar'
    })
  ])
  ```

## defineComponent

구현 측면에서 `defineComponent`는 전달된 객체를 반환하는 것 외에는 아무것도 하지 않습니다. 그러나 입력 측에서 반환된 값에는 수동 렌더링 함수, TSX 및 IDE 도구의 지원을 위한 생성자의 합성 유형이 있습니다.

### 전달인자

컴포넌트 옵션이 있는 객체

```js
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  data() {
    return { count: 1 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
```

또는 `setup` function, function 이름이 component 이름으로 사용됩니다.

```js
import { defineComponent, ref } from 'vue'

const HelloWorld = defineComponent(function HelloWorld() {
  const count = ref(0)
  return { count }
})
```

## defineAsyncComponent

필요한 경우에만 로드되는 비동기 컴포넌트를 만듭니다.

### 전달인자

기본적인 사용법을 위해 `defineAsyncComponent`는 `Promise`를 반환하는 팩토리 함수를 받아들일 수 있습니다. Promise의 `resolve` 콜백은 서버에서 컴포넌트 정의를 검색할 때 호출되어야 합니다. 또한 `reject(reason)`를 호출하여 로드가 실패했음을 나타낼 수 있습니다.

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)
```

[로컬 등록](../guide/component-registration.html#local-registration)을 사용하는 경우 `Promise`를 반환하는 함수를 직접 제공 할 수 있습니다.

```js
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```

고급 사용을 위해 `defineAsyncComponent`는 객체를 허용할 수 있습니다.

`defineAsyncComponent` 메서드는 다음과 같은 형식의 개체를 반환할 수 있습니다.

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent({
  // 팩토리 함수
  loader: () => import('./Foo.vue')
  // 비동기 컴포넌트가 로드되는 동안 사용할 컴포넌트
  loadingComponent: LoadingComponent,
  // 로드가 실패 할 경우 사용할 컴포넌트
  errorComponent: ErrorComponent,
  // 로딩 컴포넌트 지연시간(기본값:200ms)
  delay: 200,
  // 지정된 시간이 초과한경우 오류 컴포넌트를 표시합니다.(기본값:무한정)
  timeout: 3000,
  // 컴포넌트가 사용 가능한지 지정. (기본값: true)
  suspensible: false,
  /**
   *
   * @param {*} error 에러메시지 오브젝트
   * @param {*} retry A로더 promise가 rejects 될 때 비동기 컴포넌트가 다시 시도 할지를 boolean 값으로 반환하는 함수
   * @param {*} fail  실패후 처리
   * @param {*} attempts 최대 재시도 횟수
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // fetch에러가 발생시 최대 3회 재시도
      retry()
    } else {
      // Note retry/fail은 resolve/reject와 같습니다.
      // 오류처리를 위해서 그 중 하나를 호출해야합니다.
      fail()
    }
  },
})
```

**참조**: [동적 & 비동기 컴포넌트](../guide/component-dynamic-async.html)

## resolveComponent

:::warning
`resolveComponent`는 `render` 또는 `setup` 함수 내에서만 사용할 수 있습니다.
:::

현재 응용 프로그램 인스턴스에서 사용 가능한 경우 이름으로 `component`를 확인할 수 있습니다.

찾을 수 없는 경우 `Component` 또는 `undefined`를 반환합니다.

```js
const app = Vue.createApp({})
app.component('MyComponent', {
  /* ... */
})
```

```js
import { resolveComponent } from 'vue'
render() {
  const MyComponent = resolveComponent('MyComponent')
}
```

### 전달인자

허용되는 인자: `name`

#### name

- **Type:** `String`

- **Details:**

  로드된 component 이름입니다.

## resolveDynamicComponent

:::warning
`resolveDynamicComponent`는 `render` 또는 `setup` 함수 내에서만 사용할 수 있습니다.
:::

`<component :is="">`가 사용하는 것과 같은 메커니즘으로 `component`를 해결할 수 있습니다.

해결된 `Component` 또는 컴포넌트 이름을 노드 태그로 사용하여 새로 생성된 `VNode`를 반환합니다. `Component`를 찾을 수 없는 경우 경고를 발생시킵니다.

```js
import { resolveDynamicComponent } from 'vue'
render () {
  const MyComponent = resolveDynamicComponent('MyComponent')
}
```

### 전달인자

허용되는 인자: `component`

#### component

- **Type:** `String | Object (component’s options object)`

- **Details:**

  자세한 내용은 [동적 컴포넌트](../guide/component-dynamic-async.html) 문서를 참조하세요.

## resolveDirective

:::warning
`resolveDirective`는 `render` 또는 `setup` 함수 내에서만 사용할 수 있습니다.
:::

현재 애플리케이션 인스턴스에서 사용할 수 있는 경우 해당 이름으로 `directive`를 확인할 수 있습니다.

찾을 수 없는 경우 `Directive` 또는 `undefined`를 반환합니다.

```js
const app = Vue.createApp({})
app.directive('highlight', {})
```

```js
import { resolveDirective } from 'vue'
render () {
  const highlightDirective = resolveDirective('highlight')
}
```

### 전달인자

허용되는 인자: `name`

#### name

- **Type:** `String`

- **Details:**

  로드된 directive 이름입니다.

## withDirectives

:::warning
`withDirectives`는 `render` 또는 `setup` 함수 내에서만 사용할 수 있습니다.
:::

지시문(directives)을 **VNode**에 적용할 수 있습니다. 적용된 지시문(directives)을 가진 VNode를 돌려줍니다.

```js
import { withDirectives, resolveDirective } from 'vue'
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h('div'), [
  [foo, this.x],
  [bar, this.y]
])
```

### 전달인자

허용되는 인자: `vnode`, `directives`.

#### vnode

- **Type:** `vnode`

- **Details:** 

  일반적으로 `h()`로 생성되는 가상노드

#### directives

- **Type:** `Array`

- **Details:**

  지시문(directives)의 배열(Array)입니다. 

  각 지시문 자체는 배열이며, 다음의 예와 같이 최대 4 개의 인덱스를 정의 할 수 있습니다.

  - `[directive]` - 지시문 자체 (필수)

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [[MyDirective]])
  ```

  - `[directive, value]` - 지시문에 할당 할 `any` 유형의 값

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [[MyDirective, 100]])
  ```

  - `[directive, value, arg]` - 플러스 `String` 인수, `v-on:click`에서 `click`

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [
    [MyDirective, 100, 'click']
  ])
  ```

  - `[directive, value, arg, modifiers]` - `key: value` 쌍 `오브젝트(Object)`는 수정자를 정의합니다.

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [
    [MyDirective, 100, 'click', { prevent: true }]
  ])
  ```

## createRenderer

createRenderer 함수는 `HostNode`과 `HostElement` 두 가지 일반적인 인수를 받아들입니다. 
이 호스트 환경의 노드 유형과 요소 유형에 대응하고 있습니다. 
  
예를 들어, runtime-dom의 경우 HostNode는 DOM `Node` 인터페이스를 제공, HostElement는 DOM `Element` 인터페이스입니다.
  
커스텀 렌더러는 다음과 같은 플랫폼 특정 유형을 전달할 수 있습니다.
``` js
import { createRenderer } from 'vue'
const { render, createApp } = createRenderer<Node, Element>({
  patchProp,
  ...nodeOps
})
```

### 전달인자

허용되는 인자: `HostNode`, `HostElement`

#### HostNode

- **Type:** `Node`

- **Details:**

  호스트 환경의 노드입니다.

#### HostElement

- **Type:** `Element`

- **Details:**

  호스트 환경의 요소입니다.

## nextTick

다음 DOM 업데이트 주기 후에 콜백을 연기합니다. DOM 업데이트를 기다리는 데이터를 변경한 직후에 사용합니다.

```js
import { createApp, nextTick } from 'vue'

const app = createApp({
  setup() {
    const message = ref('Hello!')
    const changeMessage = async newMessage => {
      message.value = newMessage
      await nextTick()
      console.log('Now DOM is updated')
    }
  }
})
```

**참조**: [`$nextTick` 인스턴스 메서드](instance-methods.html#nexttick)
