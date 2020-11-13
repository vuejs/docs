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

- **Usage:**

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

    When watched value is an Object or Array, any changes to its properties or elements won't trigger the watcher because they reference the same Object/Array:

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

    `$watch` returns an unwatch function that stops firing the callback:

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

    To also detect nested value changes inside Objects, you need to pass in `deep: true` in the options argument. Note that you don't need to do so to listen for Array mutations.

    ```js
    vm.$watch('someObject', callback, {
      deep: true
    })
    vm.someObject.nestedValue = 123
    // callback is fired
    ```

- **Option: immediate**

    Passing in `immediate: true` in the option will trigger the callback immediately with the current value of the expression:

    ```js
    vm.$watch('a', callback, {
      immediate: true
    })
    // `callback` is fired immediately with current value of `a`
    ```

    Note that with `immediate` option you won't be able to unwatch the given property on the first callback call.

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

    If you still want to call an unwatch function inside the callback, you should check its availability first:

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

    The `flush` option allows for greater control over the timing of the callback. It can be set to `'pre'`, `'post'` or `'sync'`.

    The default value is `'pre'`, which specifies that the callback should be invoked before rendering. This allows the callback to update other values before the template runs.

    The value `'post'` can be used to defer the callback until after rendering. This should be used if the callback needs access to the updated DOM or child components via `$refs`.

    If `flush` is set to `'sync'`, the callback will be called synchronously, as soon as the value changes.

    For both `'pre'` and `'post'`, the callback is buffered using a queue. The callback will only be added to the queue once, even if the watched value changes multiple times. The interim values will be skipped and won't be passed to the callback.

    Buffering the callback not only improves performance but also helps to ensure data consistency. The watchers won't be triggered until the code performing the data updates has finished.

    `'sync'` watchers should be used sparingly, as they don't have these benefits.

    For more information about `flush` see [Effect Flush Timing](../guide/reactivity-computed-watchers.html#effect-flush-timing).

- [Watchers](../guide/computed.html#watchers)

## $emit

- **전달인자:**

    - `{string} eventName`
    - `...args (optional)`

    Trigger an event on the current instance. Any additional arguments will be passed into the listener's callback function.

- **Examples:**

    Using `$emit` with only an event name:

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

    Using `$emit` with additional arguments:

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

- **Example:**

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
