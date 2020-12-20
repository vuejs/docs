# 인스턴스 메서드(Instance Methods)

## $watch

- **전달인자:**

    - `{string | Function} source`
    - `{Function | Object} callback`
    - `{Object} options (optional)`
        - `{boolean} deep`
        - `{boolean} immediate`
        - `{string} flush`

- **반환값:** `{Function} unwatch`

- **사용방법:**

    컴포넌트 인스턴스의 반응 속성(reactive property) 또는 계산 된 함수(computed function)에서 변경 사항을 확인합니다. 콜백은 주어진 속성에 대한 새 값과 이전 값으로 호출됩니다. 최상위 `data`, `prop` 또는 `computed` 속성 이름만 문자열로 전달할 수 있습니다. 더 복잡한 표현식이나 중첩 된 속성의 경우 함수를 사용하세요.

- **예시:**

    ```js
    const app = Vue.createApp({
      data() {
        return {
          a: 1,
          b: 2,
          c: {
            d: 3,
            e: 4
          }
        }
      },
      created() {
        // top-level property name
        this.$watch('a', (newVal, oldVal) => {
          // do something
        })

        // function for watching a single nested property
        this.$watch(
          () => this.c.d,
          (newVal, oldVal) => {
            // do something
          }
        )

        // function for watching a complex expression
        this.$watch(
          // every time the expression `this.a + this.b` yields a different result,
          // the handler will be called. It's as if we were watching a computed
          // property without defining the computed property itself
          () => this.a + this.b,
          (newVal, oldVal) => {
            // do something
          }
        )
      }
    })
    ```

    watch된 값이 객체 또는 배열인 경우, 속성 또는 요소에 대한 변경사항은 동일한 객체/배열을 참조하기 때문에 감시자(watcher)를 트리거하지 않습니다:

    ```js
    const app = Vue.createApp({
      data() {
        return {
          article: {
            text: 'Vue is awesome!'
          },
          comments: ['Indeed!', 'I agree']
        }
      },
      created() {
        this.$watch('article', () => {
          console.log('Article changed!')
        })

        this.$watch('comments', () => {
          console.log('Comments changed!')
        })
      },
      methods: {
        // These methods won't trigger a watcher because we changed only a property of Object/Array,
        // not the Object/Array itself
        changeArticleText() {
          this.article.text = 'Vue 3 is awesome'
        },
        addComment() {
          this.comments.push('New comment')
        },

        // These methods will trigger a watcher because we replaced Object/Array completely
        changeWholeArticle() {
          this.article = { text: 'Vue 3 is awesome' }
        },
        clearComments() {
          this.comments = []
        }
      }
    })
    ```

    `$watch`는 콜백을 호출하지 않는 unwatch 함수를 반환합니다:

    ```js
    const app = Vue.createApp({
      data() {
        return {
          a: 1
        }
      }
    })

    const vm = app.mount('#app')

    const unwatch = vm.$watch('a', cb)
    // later, teardown the watcher
    unwatch()
    ```

- **Option: deep**

    Objects 내부의 중첩된 값 변경을 감지하려면 options 인자에`deep: true`를 전달해야 합니다. Array 변이를 수신하기 위해 그렇게 할 필요는 없습니다.

    ```js
    vm.$watch('someObject', callback, {
      deep: true
    })
    vm.someObject.nestedValue = 123
    // callback is fired
    ```

- **Option: immediate**

    옵션에서 `immediate: true`를 전달하면 표현식의 현재 값으로 즉시 콜백을 호출합니다:

    ```js
    vm.$watch('a', callback, {
      immediate: true
    })
    // `callback` is fired immediately with current value of `a`
    ```

    옵션에서 `immediate`는 주어진 프로퍼티에서 콜백을 처음 호출할 때 unwatch함수를 사용할 수 없습니다.

    ```js
    // This will cause an error
    const unwatch = vm.$watch(
      'value',
      function() {
        doSomething()
        unwatch()
      },
      { immediate: true }
    )
    ```

    unwatch 함수를 콜백에 사용한다면, 유효성부터 체크하십시오:

    ```js
    let unwatch = null

    unwatch = vm.$watch(
      'value',
      function() {
        doSomething()
        if (unwatch) {
          unwatch()
        }
      },
      { immediate: true }
    )
    ```

- **Option: flush**

    `flush`옵션을 사용하면, 콜백 타이밍을 더 잘 제어할 수 있습니다. `'pre'`, `'post'` 또는 `'sync'`로 설정할 수 있습니다.

    기본 값은 `'pre'`이며, 렌더링 전에 콜백을 호출해야 함을 지정합니다. 이렇게하면 템플릿이 실행되기 전에 콜백이 다른 값을 업데이트 할 수 있습니다.

    `'post'` 값은 렌더링이 끝날 때까지 콜백을 연기하는데 사용할 수 있습니다. 콜백이 `$refs`를 통해 업데이트 된 DOM 또는 하위 컴포넌트에 접근해야하는 경우에 사용해야 합니다.

    만약 `flush`가 `'sync'`로 설정되면, 콜백은 값이 변경되는 즉시 동기적으로 호출됩니다.

    `'pre'`와 `'post'`의 경우 콜백은 큐(queue)를 사용하여 버퍼링됩니다. watched된 값이 여러 번 변경되더라도 콜백은 큐에 한번만 추가됩니다. 중간 값은 건너뛰고 콜백으로 전달되지 않습니다.

    콜백을 버퍼링하면 성능이 향상될 뿐만 아니라 데이터 일관성을 보장하는데 도움이 됩니다. 감시자(watcher)는 데이터 업데이트를 수행하는 코드가 완료될 때까지 트리거되지 않습니다.

    `'sync'` 감시자(watcher)는 이러한 이점이 없으므로, 절약하여(sparingly) 사용해야합니다.

    `flush`에 대한 자세한 사항은 [Effect Flush Timing](../guide/reactivity-computed-watchers.html#effect-flush-timing)를 참조하세요.

- 감시자(Watchers)

## $emit

- **전달인자:**

    - `{string} eventName`
    - `...args (optional)`

    현재 인스턴스에서 이벤트를 트리거합니다. 부가적인 추가인자 리스너의 콜백함수로 전해집니다.

- **예시:**

    이벤트 이름으로 `$emit`이 사용될 때:

    ```html
    <div id="emit-example-simple">
      <welcome-button v-on:welcome="sayHi"></welcome-button>
    </div>
    ```

    ```js
    const app = Vue.createApp({
      methods: {
        sayHi() {
          console.log('Hi!')
        }
      }
    })

    app.component('welcome-button', {
      template: `
        <button v-on:click="$emit('welcome')">
          Click me to be welcomed
        </button>
      `
    })

    app.mount('#emit-example-simple')
    ```

    `$emit` 부가인자로 사용될 때:

    ```html
    <div id="emit-example-argument">
      <advice-component v-on:give-advice="showAdvice"></advice-component>
    </div>
    ```

    ```js
    const app = Vue.createApp({
      methods: {
        showAdvice(advice) {
          alert(advice)
        }
      }
    })

    app.component('advice-component', {
      data() {
        return {
          adviceText: 'Some advice'
        }
      },
      template: `
        <div>
          <input type="text" v-model="adviceText">
          <button v-on:click="$emit('give-advice', adviceText)">
            Click me for sending advice
          </button>
        </div>
      `
    })
    ```

- **참고:**

    - [`emits` option](./options-data.html#emits)
    - [값을 가진 이벤트 발신(emit)하기(Emitting a Value With an Event)](../guide/component-basics.html#emitting-a-value-with-an-event)

## $forceUpdate

- **사용방법:**

    컴포넌트 인스턴스를 강제로 재랜더링(re-render) 합니다. 모든 자식 컴포넌트가 아닌, 현재 인스턴스 그리고 슬롯 컨텐츠가 있는 자식 컴포넌트를 재랜더링(re-render) 합니다.

## $nextTick

- **전달인자:**

    - `{Function} callback (optional)`

- **사용방법:**

    다음 DOM 업데이트 사이클 이후 실행될 콜백을 연기합니다. DOM 업데이트를 기다리기 위해 일부 데이터를 변경한 직후 사용하십시오. 이것은 콜백의 `this` 컨텍스트가 이 메소드를 호출하는 인스턴스에 자동으로 바인딩 되는 점을 제외하고 전역 `nextTick`과 같습니다.

- **예시:**

    ```js
    Vue.createApp({
      // ...
      methods: {
        // ...
        example() {
          // data 수정
          this.message = 'changed'
          // DOM 은 아직 최신화되지 않았습니다.
          this.$nextTick(function() {
            // DOM 이 최신화 되었습니다.
            // `this` 는 현재 인스턴스에 바인딩됩니다.
            this.doSomethingElse()
          })
        }
      }
    })
    ```

- [nextTick](global-api.html#nexttick)
