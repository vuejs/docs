# Data 속성과 Methods

## Data 속성

컴포넌트의 `data` 옵션은 함수입니다. Vue는 새로운 컴포넌트 인스턴스 생성의 일환으로 data 함수를 호출합니다. 이 함수는 하나의 객체만을 반환하며, Vue는 반응형 시스템으로 객체를 감싸 컴포넌트 인스턴스에 `$data`로 저장합니다. 편의상 최상위 수준의 속성도 컴포넌트 인스턴스를 통해 바로 노출됩니다.

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.$data.count) // => 4
console.log(vm.count)       // => 4

// vm.count에 값을 할당하면 $data.count도 갱신됩니다.
vm.count = 5
console.log(vm.$data.count) // => 5

// 반대로도 마찬가지입니다.
vm.$data.count = 6
console.log(vm.count) // => 6
```

이러한 인스턴스 속성은 인스턴스가 처음 생성될 때만 추가되므로 `data` 함수가 반환한 객체에 모든 속성이 존재하는지 확인해야 합니다. 당장 원하는 값을 사용할 수 없는 속성에는 필요하다면, `null`, `undefined` 또는 다른 지정 값을 사용하도록 합니다.

새로운 속성을 `data`에 포함하지 않고 컴포넌트 인스턴스에 직접 추가할 수 있습니다. 하지만, 이렇게 추가한 속성은 반응형 `$data` 객체로 처리되지 않기 때문에 [Vue의 반응형 시스템](reactivity.html)에 의해 자동으로 추적되지 않습니다.

Vue는 컴포넌트 인스턴스를 통해 자체 내장 API를 노출할 때, `$`를 접두사로 사용합니다. 또한 내부 속성 정의를 위한 접두사로 `_`를 사용합니다. 그러므로 최상위 수준의 `data` 속성에 이 문자들로 시작하는 이름을 사용하지 않도록 합니다.

## Methods

컴포넌트 인스턴스에 메서드를 추가하려면 `methods` 옵션을 사용하세요. `methods` 옵션은 동작하기를 원하는 메서드들이 담긴 하나의 객체여야 합니다.

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  },
  methods: {
    increment() {
      // `this`는 컴포넌트 인스턴스를 참조합니다.
      this.count++
    }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4

vm.increment()

console.log(vm.count) // => 5
```

Vue는 `methods` 안에서 컴포넌트 인스턴스를 항상 참조할 수 있도록 `this` 값을 자동으로 바인딩합니다. 이렇게 하면 메서드가 이벤트 리스너나 콜백으로 사용될 때, 올바른 `this` 값을 유지하게 됩니다. 화살표 함수를 사용해서 `methods`를 정의하면 Vue가 적절한 `this` 값을 바인딩하지 못합니다. 따라서 `methods`를 정의할 때, 화살표 함수를 사용하지 않도록 합니다.

컴포넌트 인스턴스의 다른 속성들처럼 `methods` 또한 컴포넌트 템플릿 내부에서 접근할 수 있습니다. `methods`는 일반적으로 템플릿 내부에서 이벤트 리스너로 사용됩니다.

```html
<button @click="increment">Up vote</button>
```

위의 예제에서 `<button>`을 클릭하면 `increment` 메서드가 호출됩니다.

템플릿에서 메서드를 직접 호출할 수도 있습니다. 곧 알게 되겠지만, 대개 [computed 속성](computed.html)을 사용하는 편이 더 낫습니다. 그렇지만, computed 속성 실행이 불가능한 상황에서는 메서드를 사용하는 것이 유용할 수 있습니다. 여러분은 JavaScript 표현식을 지원하는 템플릿 어디서나 메서드를 호출할 수 있습니다.

```html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

`toTitleDate`나 `formatDate` 메서드가 반응형 데이터에 접근하면, 템플릿에서 메서드를 직접 사용한 것처럼 렌더링 종속성으로 추적됩니다.

템플릿으로부터 호출된 메서드는 데이터 변경 혹은 비동기 프로세스 유발과 같은 부작용이 없어야 합니다. 만약 여러분이 이와 같은 작업(부작용으로 여겨지는 작업)을 하고 싶다면 아마 [라이프사이클 훅](instance.html#lifecycle-hooks)을 대신 사용해야 할 것입니다.

### 디바운싱과 쓰로틀링(Debouncing and Throttling)

Vue는 디바운싱이나 쓰로틀링에 대한 지원을 자체적으로 제공하지 않습니다. 하지만, [Lodash](https://lodash.com/)와 같은 라이브러리를 사용하여 해당 부분을 구현할 수 있습니다.

컴포넌트가 한 번만 사용되는 경우, 다음과 같이 `methods`에 디바운싱을 직접 적용할 수 있습니다.

```html
<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"></script>
<script>
  Vue.createApp({
    methods: {
      // Lodash의 디바운싱 적용
      click: _.debounce(function() {
        // ... 클릭에 대한 응답 ...
      }, 500)
    }
  }).mount('#app')
</script>
```

그러나, 이런 접근 방식에서는 재사용되는 컴포넌트가 모두 동일한 디바운스 함수를 공유하기 때문에 잠재적인 문제가 발생할 수 있습니다. 컴포넌트 인스턴스를 서로 독립적으로 유지하기 위해 다음과 같이 `created` 라이프사이클 훅에 디바운스 함수를 추가할 수 있습니다.

```js
app.component('save-button', {
  created() {
    // Lodash의 디바운싱 적용
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 컴포넌트가 제거되면 타이머를 취소합니다.
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 클릭에 대한 응답 ...
    }
  },
  template: `
    <button @click="debouncedClick">
      Save
    </button>
  `
})
```
