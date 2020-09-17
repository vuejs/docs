# 인스턴스 메소드

## $watch

- **인자:**

    - `{string | Function} source`
    - `{Function | Object} callback`
    - `{Object} options (optional)`
        - `{boolean} deep`
        - `{boolean} immediate`

- **Returns:** `{Function} unwatch`

- **사용방법:**

    변경을 위해 Vue 인스턴스에서 표현식이나 계산된 함수를 감시합니다. 콜백은 새 값과 이전 값을 인자로 호출됩니다. 상위-레벨 `데이터`, `프롭`, 또는 `계산된` 속성 이름을 문자열로 사용될 때 용납됩니다. 더 복잡한 표현식을 사용하려면 함수를 사용하세요.

- **Example:**

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

    감시된 벨류가 객체나 배열일 때, 같은 객체/배열을 기반으로 하기 때문에 프로퍼티나 엘리먼트에 변화를 주더라도 watcher를 트리거 할 수 없습니다:

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

    <code>$watch</code>는 콜백을 호출하지 않는 unwatch 함수를 반환합니다:

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
    // watcher속성의 분해도가 됩니다.
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
    const unwatch = vm.$watch(
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

- [Watchers](../guide/computed.html#watchers)

## $emit

- **인자:**

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

- **관련 자료:**

    - `<a href ="./options-data.html#emits" data-md-type="link"/>emits` option
    - [Emitting a Value With an Event](../guide/component-basics.html#emitting-a-value-with-an-event)

## $forceUpdate

- **사용용도:**

    컴포넌트 인스턴스를 강제로 재랜더링 합니다. 모든 자식 컴포넌트가 아닌, 현재 인스턴스 그리고 슬롯 컨텐트가 있는 자식 컴포넌트를 재랜더링 합니다.

## $nextTick

- **인자:**

    - `{Function} callback (optional)`

- **사용용도:**

    다음 DOM업데이트 사이클 이후 실행될 콜백을 연기합니다. DOM 업데이트를 기다리기 위해 일부 데이터를 변경한 직후 사용하십시오. 이것은 콜백의 `this` 컨텍스트가 이 메소드를  호출하는 인스턴스에 자동으로 바인딩 되는 점을 제외하고  전역 `nextTick`과 같습니다.

- **예시:**

    ```js
    Vue.createApp({
      // ...
      methods: {
        // ...
        example() {
          // modify data
          this.message = 'changed'
          // DOM is not updated yet
          this.$nextTick(function() {
            // DOM is now updated
            // `this` is bound to the current instance
            this.doSomethingElse()
          })
        }
      }
    })
    ```

- [nextTick](global-api.html#nexttick)
