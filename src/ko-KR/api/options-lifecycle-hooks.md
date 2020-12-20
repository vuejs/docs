# 라이프사이클 훅

:::tip Note
모든 라이프사이클 훅은 자동으로 `this` 컨텍스트가 인스턴스에 바인딩되어 있으므로, data, computed 및 methods 속성에 접근할 수 있습니다. 즉, **화살표 함수를 사용해서 라이프사이클 메소드를 정의하면 안됩니다.** (예: `created: () => this.fetchTodos()`). 그 이유는 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에, `this`는 예상하는 바와 같은 컴포넌트 인스턴스가 아니며 `this.fetchTodos`는 정의되지 않습니다(undefined).
:::

## beforeCreate

- **타입:** `Function`

- **상세:**

  인스턴스가 초기화 된 직후, 데이터 관찰 및 이벤트/감시자(watcher) 설정 전에 동기적으로 호출됩니다.

- **참고:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## created

- **타입:** `Function`

- **상세:**

  인스턴스가 생성된 후 동기적으로 호출됩니다. 이 단계에서 인스턴스는 data 관찰, computed 속성, methods, watch/이벤트 콜백 등의 설정이 준비되었음을 의미하는 옵션 처리를 완료합니다. 그러나 마운트 단계가 시작되지 않았으며, `$el` 속성을 사용할 수 없습니다.

- **참고:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## beforeMount

- **타입:** `Function`

- **상세:**

  마운트가 시작되기 직전에 호출됩니다. `render` 함수가 처음으로 호출됩니다..

  **이 훅은 서버측 렌더링 중 호출되지 않습니다.**

- **참고:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## mounted

- **타입:** `Function`

- **상세:**

  인스턴스가 마운트된 후 호출되며, 여기서 `Vue.createApp({}).mount()`로 전달된 엘리먼트는 새로 생성된 `vm.$el`로 대체됩니다. 루트 인스턴스가 문서 내의 엘리먼트에 마운트되어 있으면, `mounted`가 호출될 때 `vm.$el`도 문서에 포함(in-document)됩니다.

  `mounted`는 모든 자식 컴포넌트가 마운트되었음을 보장하지 **않습니다.** 전체 화면내용이 렌더링될 때까지 기다리려면, `mounted` 내에서 [vm.\$nextTick](../api/instance-methods.html#nexttick)를 사용합니다:

  ```js
  mounted() {
    this.$nextTick(function () {
      // 전체 화면내용이 렌더링된 후에 아래의 코드가 실행됩니다.
    })
  }
  ```

  **이 훅은 서버측 렌더링 중 호출되지 않습니다.**

- **참고:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## beforeUpdate

- **타입:** `Function`

- **상세:**

  DOM이 패치되기 전에 데이터가 변경될 때 호출됩니다. 이 훅은 업데이트 전에 기존 DOM에 접근 (예: 수동으로 추가된 이벤트 리스너를 제거)할 수 있는 좋습니다.

  **초기 렌더링만 서버측에서 수행되기 때문에, 이 훅은 서버측 렌더링 중 호출되지 않습니다.**

- **참고:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## updated

- **타입:** `Function`

- **상세:**

  데이터가 변경되어 가상 DOM이 다시 렌더링되고 패치된 후에 호출됩니다.

  updated가 호출될 때 컴포넌트의 DOM이 업데이트되므로, 여기에서 DOM의 종속적인 연산(DOM-dependent operations)을 할 수 있습니다. 그러나 대부분의 경우 훅 내부에서 상태를 변경하지 않아야 합니다. 상태 변경에 반응하기 위해, 일반적으로 [computed property](./options-data.html#computed) 속성이나 [watcher](./options-data.html#watch)를 사용하는 것이 더 좋습니다.

  `updated`는 모든 하위 컴포넌트가 다시 렌더링되었음을 보장하지 **않습니다.** 전체 화면이 재렌더링 될 때까지 기다리려면, `updated` 내부에서 [vm.\$nextTick](../api/instance-methods.html#nexttick)를 사용합니다:

  ```js
  updated() {
    this.$nextTick(function () {
      // 전체 화면내용이 다시 렌더링된 후에 아래의 코드가 실행됩니다. 
    })
  }
  ```

  **이 훅은 서버측 렌더링 중 호출되지 않습니다.**

- **참고:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## activated

- **타입:** `Function`

- **상세:**

  keep-alive 컴포넌트가 활성화될 때 호출됩니다.

  **이 훅은 서버측 렌더링 중 호출되지 않습니다.**

- **참고:**
  - [Dynamic Components - keep-alive](../guide/component-dynamic-async.html#dynamic-components-with-keep-alive)

## deactivated

- **타입:** `Function`

- **상세:**

  keep-alive 컴포넌트가 비활성화될 때 호출됩니다.

  **이 훅은 서버측 렌더링 중 호출되지 않습니다.**

- **참고:**
  - [Dynamic Components - keep-alive](../guide/component-dynamic-async.html#dynamic-components-with-keep-alive)

## beforeUnmount

- **타입:** `Function`

- **상세:**

  컴포넌트 인스턴스가 마운트 해제(unmounted) 되기 직전에 호출됩니다. 이 단계에서 인스턴스는 여전히 완전하게 작동합니다.

  **이 훅은 서버측 렌더링 중 호출되지 않습니다.**

- **참고:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## unmounted

- **타입:** `Function`

- **상세:**

  컴포넌트 인스턴스가 마운트 해제(unmounted)된 후 호출됩니다. 이 훅이 호출되면, 컴포넌트 인스턴스의 모든 디렉티브가 바인딩 해제되고, 모든 이벤트 리스너가 제거되며, 모든 자식 컴포넌트 컴포넌트도 마운트 해제(unmounted)됩니다.

  **이 훅은 서버측 렌더링 중 호출되지 않습니다.**

- **참고:** [Lifecycle Diagram](../guide/instance.html#lifecycle-diagram)

## errorCaptured

- **타입:** `(err: Error, instance: Component, info: string) => ?boolean`

- **상세:**

  자손 컴포넌트의 에러가 포착(capture)될 때 호출됩니다. 이 훅은 세 가지 전달인자(에러 자체(err), 에러를 발생시킨 컴포넌트 인스턴스(instance), 그리고 에러가 포착된 위치에 대한 정보가 들어있는 문자열(info))를 받습니다. 이 훅은 `false`를 반환하여 에러가 더 전파되지 않도록 할 수 있습니다.

  :::tip
  이 훅에서 컴포넌트 상태를 수정할 수 있습니다. 하지만 에러가 포착되었을 때, 템플릿이나 렌더 함수 안에서 다른 내용을 더 이상 실행시키지 않는 조건을 가지는 것이 중요합니다. 그렇지 않다면, 컴포넌트가 무한루프에 빠질 것입니다. 
  :::

  **에러 전파 규칙**

  - 기본적으로, 모든 에러는 정의된 경우에 전역 `config.errorHandler`로 보내지므로, 에러들은 계속 한 곳에서 분석 서비스에 보고될 수 있습니다.

  - 여러 개의 `errorCaptured` 훅들이 컴포넌트의 상속 체인이나 부모 체인에 존재하면, 모두 동일한 에러로 호출됩니다.

  - `errorCaptured` 훅 자체에서 에러가 발생하면, 이 에러와 원래 포착된 에러가 모두 전역 `config.errorHandler`로 보내집니다.

  - `errorCaptured` 훅은 에러가 더 전파되지 않도록 false를 반환할 수 있습니다. 이는 본질적으로 "이 에러는 처리되었으므로 무시해야 합니다."라는 의미입니다. 이 에러에 대해 어떠한 추가적인 `errorCaptured` 훅이나 전역 `config.errorHandler`가 호출되지 않도록 합니다.

## renderTracked

- **타입:** `(e: DebuggerEvent) => void`

- **상세:**

  가상 DOM의 재렌더링이 추적될 때 호출됩니다. 이 훅은 `debugger event`를 전달인자로 받습니다. 이 이벤트는 어떤 작업이 컴포넌트를 추적했는지와 해당 작업의 대상 객체 및 키를 알려줍니다.

- **사용법:**

  ```html
  <div id="app">
    <button v-on:click="addToCart">Add to cart</button>
    <p>Cart({{ cart }})</p>
  </div>
  ```

  ```js
  const app = Vue.createApp({
    data() {
      return {
        cart: 0
      }
    },
    renderTracked({ key, target, type }) {
      console.log({ key, target, type })
      /* 컴포넌트가 최초로 렌더링될 때 출력됩니다:
      {
        key: "cart",
        target: {
          cart: 0
        },
        type: "get"
      }
      */
    },
    methods: {
      addToCart() {
        this.cart += 1
      }
    }
  })

  app.mount('#app')
  ```

## renderTriggered

- **타입:** `(e: DebuggerEvent) => void`

- **상세:**

  가상 돔의 재렌더링이 트리거 될 때 호출됩니다. [`renderTracked`](#rendertracked)와 유사하게 `debugger event`를 전달인자로 받습니다. 이 이벤트는 어떤 작업이 재렌더링을 트리거한 작업과 해당 작업의 대상 객체 및 키를 알려줍니다.

- **사용법:**

  ```html
  <div id="app">
    <button v-on:click="addToCart">Add to cart</button>
    <p>Cart({{ cart }})</p>
  </div>
  ```

  ```js
  const app = Vue.createApp({
    data() {
      return {
        cart: 0
      }
    },
    renderTriggered({ key, target, type }) {
      console.log({ key, target, type })
    },
    methods: {
      addToCart() {
        this.cart += 1
        /* renderTriggered 호출이 발생합니다
          {
            key: "cart",
            target: {
              cart: 1
            },
            type: "set"
          }
        */
      }
    }
  })

  app.mount('#app')
  ```
