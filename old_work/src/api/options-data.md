# 데이터

## data

- **타입:** `Function`

- **세부설명:**

  컴포넌트 인스턴스에 데이터 객체를 반환하는 함수입니다. `data` 에서 브라우저 API 객체나 프로토타입 속성과 같이 자체적으로 상태를 저장하는 동작을 가진 객체를 관찰(observe)하지 않는 것이 좋습니다. 단지, 컴포넌트 데이터를 나타내는 일반 객체만 있는 것이 좋습니다.

  한번 관찰되면(observed), 더 이상 루트 데이터 객체에 반응형 속성을 추가할 수 없습니다. 따라서 인스턴스를 만들기 전에 모든 루트 레벨의 반응형 속성을 미리 선언하는 것이 좋습니다.

  인스턴스가 생성된 후 원본 데이터 객체는 `vm.$data` 로 접근할 수 있습니다. 또한 컴포넌트 인스턴스는 데이터 객체의 모든 속성을 연결(proxy)하므로  `vm.a` 와  `vm.$data.a` 는 동일합니다.

  `_` 나 `$` 로 시작하는 속성은 Vue의 내부 속성 및 API 메소드와 충돌할 수 있으므로 컴포넌트 인스턴스에 ***연결(proxy)하지 않습니다***. `vm.$data._property` 로 액세스해야 합니다.

- **예:**

  ```js
  // 인스턴스를 생성합니다.
  const data = { a: 1 }

  // 객체를 컴포넌트 인스턴스에 추가합니다.
  const vm = Vue.createApp({
    data() {
      return data
    }
  }).mount('#app')

  console.log(vm.a) // => 1
  ```

  `data` 속성에 화살표 함수로 사용한다면, `this` 는 컴포넌트 인스턴스가 아니지만 함수의 첫 번째 인자로 인스턴스에 접근할 수 있습니다.

  ```js
  data: vm => ({ a: vm.myProp })
  ```

- **See also:** [깊은 반응성(Reactivity in Depth)](../guide/reactivity.html)

## props

- **형:** `Array<string> | Object`

- **세부사항:**

  부모 컴포넌트의 데이터를 얻기 위한(exposed to accept) 리스트/해쉬 속성입니다. 배열 기반의 단순한 문법과 형 검사, 사용자 정의 유효성 검사와 기본값 같은 고급 구성을 허용하는 객체 기반의 문법이 있습니다.

  객체 기반 문법을 사용한다면, 다음 옵션을 사용할 수 있습니다:

  - `type`: 다음 기본 생성자 중 하나가 될 수 있습니다: `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`, 커스텀 생성자 함수 또는 이들의 배열.  rops가 주어진 형인지 검사하고, 그렇지 않은 경우 경고를 표시합니다.  props에 대한 추가 정보는 [이곳](../guide/component-props.html#prop-types) 을 참고하세요
  - `default`: `any`
    prop의 기본값을 설정합니다. 만약 prop이 전달되지 않으면, 이 값이 사용됩니다. 객체나 배열의 기본 값은 반드시 팩토리 함수를 반환해야 합니다.
  - `required`: `Boolean`
    prop의 필수 여부를 정의합니다. 배포 환경이 아닌 경우에, 이 값이 참인데 전달되지 않으면 console 경고가 발생합니다.
  - `validator`: `Function`
    prop을 인자로 가지는 사용자 정의 유효성 검사 함수입니다. 배포 환경이 아닌 경우에, 잘못된 값을 반환하면, 즉 검사가 실패하면 console 경고가 발생합니다. 추가 정보는 [이곳](../guide/component-props.html#prop-validation) 을 참고하세요.

- **예:**

  ```js
  const app = Vue.createApp({})

  // 단순한 문법
  app.component('props-demo-simple', {
    props: ['size', 'myMessage']
  })

  // 검증기능을 포함하는 객체 문법
  app.component('props-demo-advanced', {
    props: {
      // 타입 체크
      height: Number,
      // 타입 체크 + 추가 검증
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: value => {
          return value >= 0
        }
      }
    }
  })
  ```


- **See also:** [Props](../guide/component-props.html)


## computed

- **형:** `{ [key: string]: Function | { get: Function, set: Function } }`

- **세부사항:**

  computed 속성은 컴포넌트 인스턴스에 혼합(mixed)됩니다. 모든getters와 setters의 `this` 문맥은 자동으로 컴포넌트 인스턴스에 바인딩 됩니다.

  computed 속성에 화살표 함수를 사용한다면, `this` 는 컴포넌트 인스턴스는 아니지만, 함수의 첫번째 인자로 인스턴스에 접근할 수 있습니다.

  ```js
  computed: {
    aDouble: vm => vm.a * 2
  }
  ```

  Computed 속성은 캐싱되고, 반응형 종속성(dependency)이 변경될 때에만 다시 계산됩니다. 반응형이 아닌것과 같이 특정 종속성(dependency)이 인스턴스의 범위(scope)를 벗어난 경우, computed 속성은 갱신되지 ***않습니다***.

- **예:**

  ```js
  const app = Vue.createApp({
    data() {
      return { a: 1 }
    },
    computed: {
      // 읽기만 가능합니다. 
      aDouble() {
        return this.a * 2
      },
      // 읽고 쓰기가 가능합니다. 
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    }
  })

  const vm = app.mount('#app')
  console.log(vm.aPlus) // => 2
  vm.aPlus = 3
  console.log(vm.a) // => 2
  console.log(vm.aDouble) // => 4
  ```

- **See also:** [Computed Properties](../guide/computed.html)

## methods

- **형:** `{ [key: string]: Function }`

- **세부사항:**

  Methods는 컴포넌트 인스턴스에 혼합(mixed)됩니다. 이러한 methods는 인스턴스에 직접 접근하거나, 지시문 표현식으로 사용할 수 있습니다. 모든 methods의 `this` 문맥은 자동으로 컴포넌트 인스턴스에 바인딩 됩니다.

  :::tip Note
  ***method를 정의할 때 화살표 함수를 사용하면 안됩니다***(e.g. `plus: () => this.a++`). 화살표 함수는 상위 컨텍스트에 바인딩되므로 `this`는 예상한 컴포넌트 인스턴트가 아닐 것이고, `this.a`는 undefined일 것입니다
  :::

- **예:**

  ```js
  const app = Vue.createApp({
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    }
  })

  const vm = app.mount('#app')

  vm.plus()
  console.log(vm.a) // => 2
  ```

- **See also:** [Event Handling](../guide/events.html)

## watch

- **형:** `{ [key: string]: string | Function | Object | Array}`

- **세부사항:**

  관찰할(watch) 표현식을 키(key)로, 해당하는 콜백을 값(value)으로 가지는 객체입니다. 이 값은 메소드 이름의 문자열이거나 추가 옵션이 포함된 객체일 수도 있습니다. 컴포넌트 인스턴스는 인스턴스화 할 때, 객체의 각 항목에 대해 `$watch()`를 호출합니다. `deep`, `immediate` 및 `flush` 옵션에 대한 자세한 내용은 [$watch](instance-methods.html#watch) 를 참조하세요.

- **예:**

  ```js
  const app = Vue.createApp({
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 'test',
        f: 5
      }
    },
    watch: {
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // 문자열 메소드명
      b: 'someMethod',
      // 지켜보는 객체의 모든 (깊이에 상관없이) 프로퍼티의 변경이 발생하면 콜백됩니다. 
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // 관측이 시작하자마자 우선 콜백이 호출됩니다. 
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // 콜백 목록을 줄수 있고, 하나하나 실행됩니다. 
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    }
  })

  const vm = app.mount('#app')

  vm.a = 3 // => new: 3, old: 1
  ```

  ::: tip Note
  감시자(watcher)를 정의할 때, 화살표 함수를 {em0}사용하면 안됩니다{/em0} (예. `searchQuery: newValue => this.updateAutocomplete(newValue)`).  화살표 함수는 상위 컨텍스트에 바인딩되므로 `this` 는 예상한 컴포넌트 인스턴트가 아닐 것이고, `this.updateAutocomplete` 는 undefined일 것입니다
  :::

- **See also:** [Watchers](../guide/computed.html#watchers)

## emits

- **형:** `Array<string> | Object`

- **세부사항:**

  컴포넌트에서 이벤트를 발생(emit)시킬 수 있는 사용자 지정 이벤트 목록/해시입니다. 배열 기반의 단순한 문법과 이벤트 유효성 검사를 구성할 수 있는 객체 기반의 문법이 있습니다.

  객체 기반 문법에서, 각 속성의 값은 `null` 이거나 유효성 검사 함수일 수 있습니다. 유효성 검사 함수는  `$emit` 호출에 전달된 추가 인자(arguments)를 받습니다. 예를 들어, `this.$emit('foo', 1)` 이 호출된 경우, `foo` 에 해당하는 유효성 검사는 인자 `1` 을 받을 것 입니다. 유효성 검사 함수는 이벤트 인자가 유효한지를 나타내는 불 값을 반환할 것 입니다.

- **사용법:**

  ```js
  const app = Vue.createApp({})

  // 배열기반 문법
  app.component('todo-item', {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  })

  // 객체기반 문법
  app.component('reply-form', {
    emits: {
      // 유효성 검사 없는 경우
      click: null,

      // 유효성 검사
      submit: payload => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`잘못 된 이벤트가 발생했습니다!`)
          return false
        }
      }
    }
  })
  ```

  ::: tip Note
  `emits` 에 나열된 이벤트는 컴포넌트의 루트 요소에 의해 ***상속되지 않으며***, `$attrs` 속성에서도 제외됩니다
  :::

- **See also:** [Attribute Inheritance](../guide/component-attrs.html#attribute-inheritance)
