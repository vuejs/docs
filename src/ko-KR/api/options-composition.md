# 컴포지션(Composition)

## mixins

- **타입:** `Array<Object>`

- **상세:**

  `mixins` 옵션은 믹스인 객체의 배열을 허용합니다. 이러한 믹스인 객체는 일반 인스턴스 객체와 같은 인스턴스 옵션을 포함 할수 있습니다. 또한, 특정 옵션 병합 로직을 사용하여 최종 옵션에 대해 병합됩니다. 예를 들어, 믹스인에 `created` 훅이 포함되어 있고 컴포넌트 자체에도 하나가 있는 경우 두 함수가 모두 호출됩니다.

  Mixin 훅은 제공된 순서대로 호출되며, 컴포넌트의 자체 훅보다 머저 호출됩니다.

- **예시:**

  ```js
  const mixin = {
    created: function() {
      console.log(1)
    }
  }

  Vue.createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

- **참고:** [Mixins](../guide/mixins.html)

## extends

- **타입:** `Object | Function`

- **상세:**

  다른 컴포넌트를 선언적으로 확장 할 수 있습니다 (일반 옵션 객체 또는 생성자 일 수 있음). extends는 주로 싱글파일 컴포넌트(SFC)간에 쉽게 확장하기 위해서 사용됩니다.	.

  `mixins`과 유사.

- **예시:**

  ```js
  const CompA = { ... }

  // `Vue.extend` 호출할 필요없이 CompA 를 확장
  const CompB = {
    extends: CompA,
    ...
  }
  ```

## provide / inject

- **타입:**

  - **provide:** `Object | () => Object`
  - **inject:** `Array<string> | { [key: string]: string | Symbol | Object }`

- **상세:**

  이 옵션 쌍은 상위 컴포넌트가 동일한 상위 체인에 있는동안, 컴포넌트 계층 구조의 깊이에 관계없이 모든 하위 항목에 대한 종속성 주입기(dependency injector) 역할을 할 수 있습니다. React에 익숙하다면 React의 `context` 기능과 매우 유사합니다.

  `provide` 옵션은 객체 또는 객체를 반환하는 함수여야합니다. 이 객체에는 하위 항목에 삽입 할 수 있는 속성이 포함되어 있습니다. 이 객체에서 ES2015 Symbol을 키로 사용할 수 있지만, 기본적으로 `Symbol` 및 `Reflect.ownKeys`를 지원하는 환경에서만 사용할 수 있습니다.
  `inject` 옵션은 다음 중 하나여야합니다:

  - 문자열의 배열, 또는
  - 키가 로컬 바인딩 이름이고 값이 다음 중 하나인 객체:
    - 사용 가능한 주입(injections)에서 검색할 키(문자열 또는 Symbol), 또는
    - 객체는 다음과 같습니다:
      - `from` 속성은 사용 가능한 주입(injections)에서 검색 할 키(문자열 또는 Symbol)입니다.
      - `default` 속성이 대체 값으로 사용됩니다.

  > Note: `provide` 및 `inject` 바인딩은 반응성이 없습니다. 이것은 의도적입니다. 그러나 반응성 객체를 전달하면, 해당 객체의 속성은 반응성을 유지합니다.

- **Example:**

  ```js
  // 'foo'를 provide하는 부모 컴포넌트
  const Provider = {
    provide: {
      foo: 'bar'
    }
    // ...
  }

  // 'foo'를 inject하는 자식 컴포넌트
  const Child = {
    inject: ['foo'],
    created() {
      console.log(this.foo) // => "bar"
    }
    // ...
  }
  ```

  ES2015 Symbols와 함께, 함수 `provide` 및 객체 `inject`:

  ```js
  const s = Symbol()

  const Provider = {
    provide() {
      return {
        [s]: 'foo'
      }
    }
  }

  const Child = {
    inject: { s }
    // ...
  }
  ```

  inject된 값을 prop 의 기본값으로 사용:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  inject된 값을 데이터 항목으로 사용:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  inject는 default 값을 선택적으로 사용할 수 있습니다.:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  다른 이름의 속성에서 inject해야하는 경우 `from`을 사용하여 소스 속성을 나타냅니다.:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  prop 기본값과 유사하게 원시값이 아닌(non-primitive values) 경우 팩토리 함수를 사용해야합니다:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **참고:** [Provide / Inject](../guide/component-provide-inject.html)

## setup

- **타입:** `Function`

`setup` 함수는 새로운 컴포넌트 옵션입니다. 컴포넌트 내에서 Composition API를 사용하기 위한 진입점 역할을 합니다..

- **호출 타이밍**

  `setup`은 컴포넌트 인스턴스가 생성 될 때 초기 props 확인 직후에 호출됩니다. 수명주기에 따라 [beforeCreate](./options-lifecycle-hooks.html#beforecreate) 훅 전에 호출됩니다.

- **Template과 사용**

  `setup`이 객체를 반환하면 객체의 속성이 컴포넌트 템플릿의 렌더링 컨텍스트에 병합됩니다:

  ```html
  <template>
    <div>{{ count }} {{ object.foo }}</div>
  </template>

  <script>
    import { ref, reactive } from 'vue'

    export default {
      setup() {
        const count = ref(0)
        const object = reactive({ foo: 'bar' })

        // expose to template
        return {
          count,
          object
        }
      }
    }
  </script>
  ```

  `setup` 에서 반환된 [refs](refs-api.html#ref)는 템플릿에서 접근할 때 자동으로 래핑 해제(unwrap)되므로 템플릿에서 `.value`가 필요하지 않습니다.

- **Render Functions / JSX와 사용**

  `setup`은 동일한 범위에서 선언된 반응성 상태를 직접 사용할 수 있는 렌더 함수를 반환 할 수도 있습니다:

  ```js
  import { h, ref, reactive } from 'vue'

  export default {
    setup() {
      const count = ref(0)
      const object = reactive({ foo: 'bar' })

      return () => h('div', [count.value, object.foo])
    }
  }
  ```

- **전달인자**

  이 함수는 resolve된 props를 첫 번째 전달인자로 받습니다.:

  ```js
  export default {
    props: {
      name: String
    },
    setup(props) {
      console.log(props.name)
    }
  }
  ```

  	이 `props` 객체는 반응적(reactive)입니다. 즉, 새 props가 전달 될 때 업데이트되며, `watchEffect` 또는 `watch`를 사용하여 관찰하고 반응 할 수 있습니다:

  ```js
  export default {
    props: {
      name: String
    },
    setup(props) {
      watchEffect(() => {
        console.log(`name is: ` + props.name)
      })
    }
  }
  ```

  	그러나, 구조화하지 마십시오. `props` 객체는 반응성을 잃게됩니다.:

  ```js
  export default {
    props: {
      name: String
    },
    setup({ name }) {
      watchEffect(() => {
        console.log(`name is: ` + name) // Will not be reactive!
      })
    }
  }
  ```

  `props` 객체는 개발 중에 사용자 영역 코드에 대해 변경이 불가능(immutable)합니다 (사용자 코드가 변경하려고하면 경고를 내보냄).

  두 번째 전달인자는 이전에 `this` 에 노출된 속성의 선택적인 목록을 노출하는 컨텍스트 객체를 제공합니다.:

  ```js
  const MyComponent = {
    setup(props, context) {
      context.attrs
      context.slots
      context.emit
    }
  }
  ```

  `attrs` 및 `slots` 은 내부 컴포넌트 인스턴스의 해당 값에 대한 프록시입니다. 이렇게하면 업데이트 후에도 항상 최신 값이 노출되므로 오래된 참조에 접근하지 않고도 구조를 해제 할 수 있습니다:

  ```js
  const MyComponent = {
    setup(props, { attrs }) {
      // a function that may get called at a later stage
      function onClick() {
        console.log(attrs.foo) // guaranteed to be the latest reference
      }
    }
  }
  ```

  컨텍스트에 포함하는 대신 `props` 를 별도의 첫 번째 인자로 배치하는 데는 여러 가지 이유가 있습니다.

  - 컴포넌트가 다른 속성보다 `props`를 사용하는 것이 훨씬 더 일반적이며, 컴포넌트는 `props`만 사용하는 경우가 매우 많습니다.

  - `props`를 별도의 전달인자로 사용하면 컨텍스트에서 다른 속성의 유형을 엉망으로 만들지 않고 개별적으로 쉽게 입력 할 수 있습니다. 또한, TSX 를 지원하는 `setup`, `render` 및 일반 기능 컴포넌트에서 일관된 특징을 유지할 수 있습니다.

- **참고:** [Composition API](composition-api.html)
