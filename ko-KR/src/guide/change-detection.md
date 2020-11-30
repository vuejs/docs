# Vue 2의 변경 감지 주의사항

> 이 페이지는 Vue 2.x 이하에만 해당하며, 여러분이 이미 [반응성 문서](reactivity.md)를 읽었다고 가정하고 쓴 내용입니다. 내용을 읽기에 앞서 반응성 관련 문서를 먼저 읽으시기 바랍니다.

JavaScript의 제한으로 Vue가 **감지할 수 없는** 변경 유형이 있습니다. 하지만, 반응성을 보존하기 위해 이를 우회하는 방법이 있습니다.

### 객체

Vue는 속성의 추가, 제거를 감지할 수 없습니다. Vue는 인스턴스 초기화 중에 getter/setter 변환 프로세스를 수행하므로 `data` 객체에 속성이 존재해야 Vue가 이를 변환하고 반응형으로 만들 수 있습니다. 다음 예를 살펴보세요.

```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 는 이제 반응형입니다.

vm.b = 2
// `vm.b` 는 반응형이 아닙니다.
```

Vue는 이미 생성된 인스턴스에 새로운 루트 수준의 반응형 속성을 동적으로 추가하는 것을 허용하지 않습니다. 그러나 `Vue.set(object, propertyName, value)` 메서드를 사용하여 중첩된 객체에 반응형 속성을 추가할 수 있습니다.

```js
Vue.set(vm.someObject, 'b', 2)
```

`vm.$set` 인스턴스 메서드를 사용할 수도 있습니다. 이 메서드는 전역 `Vue.set`에 대한 별칭입니다.

```js
this.$set(this.someObject, 'b', 2)
```

예를들어 `Object.assign()`이나 `_.extend()`를 이용해 기존 객체에 여러 속성을 할 수 있습니다. 그러나 객체에 추가된 새로운 속성은 변경사항을 발생시키지 않습니다. 이러한 경우, 원본 객체와 mixin 객체의 속성을 사용하여 새로운 객체를 만듭니다.

```js
// `Object.assign(this.someObject, { a: 1, b: 2 })` 대신 사용
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

### 배열

Vue는 다음과 같은 배열의 변화를 감지할 수 없습니다.

1. 배열 index로 항목을 직접 설정하는 경우<br>`vm.items[indexOfItem] = newValue`
2. 배열 길이를 수정하는 경우<br>`vm.items.length = newLength`

아래 예제를 봅시다.

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 반응형이 아닙니다
vm.items.length = 2 // 반응형이 아닙니다
```

주의사항 1을 극복하기 위해 다음 두 가지 방법 모두 `vm.items[indexOfItem] = newValue`와 동일하게 수행되지만, 반응성 시스템에서 상태 변경도 발생시키게 됩니다.

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
```

```js
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

전역 `Vue.set`에 대한 별칭인 [`vm.$set`](https://vuejs.org/v2/api/#vm-set) 인스턴스 메서드를 사용할 수도 있습니다.

```js
vm.$set(vm.items, indexOfItem, newValue)
```

주의사항 2를 처리하려면 `splice`를 사용할 수 있습니다.

```js
vm.items.splice(newLength)
```

## 반응형 속성 선언

Vue는 루트 수준의 반응형 속성을 동적으로 추가하는 것을 허용하지 않으므로, 빈 값을 사용하더라도 모든 루트 수준의 반응형 데이터 속성을 미리 선언하여 컴포넌트 인스턴스를 초기화해야 합니다.

```js
var vm = new Vue({
  data: {
    // 빈값으로 message를 선언합니다.
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// 그 후, `message`를 설정합니다.
vm.message = 'Hello!'
```

data 옵션에 `message`를 선언하지 않으면, Vue는 render 함수가 존재하지 않는 속성에 접근하려 한다는 경고를 합니다.

이러한 제한에는 기술적인 이유가 있습니다. 종속성 추적 시스템에서 발생하는 일련의 예외 사항을 없애고, 타입 체크 시스템에서 컴포넌트 인스턴스를 더 잘 작동하게 하기 때문입니다. 그러나 코드 유지 관리 측면에서도 중요한 고려 사항이 있습니다. <code>data</code> 객체는 컴포넌트 상태에 대한 스키마와 같습니다. 모든 반응형 속성을 미리 선언하면 나중에 다시 보거나 다른 개발자가 읽을 때 컴포넌트 코드를 더 쉽게 이해할 수 있습니다.

## 비동기 갱신 큐

눈치채셨는지 모르겠지만, Vue는 DOM 갱신을 **비동기로** 처리합니다. 데이터 변경을 감지할 때마다 큐를 열고 같은 이벤트 루프에서 발생하는 모든 데이터 변경 사항을 버퍼에 담습니다. 동일한 내용의 감지가 여러 번 발생하더라도 큐에는 한 번만 등록됩니다. 이처럼 중복이 제거된 버퍼는 불필요한 계산과 DOM 조작을 방지하는 데 있어 중요합니다. 그런 다음, Vue는 다음 이벤트 루프인 “tick”에서 큐를 비우고 실제(이미 중복이 제거된) 작업을 수행합니다. 내부적으로 Vue는 비동기 큐 처리를 위해 네이티브 `Promise.then`과 `MutationObserver`, 그리고 `setImmediate`를 시도한 후, `setTimeout(fn, 0)`으로 돌아갑니다.

예를 들어, 여러분이 `vm.someData = 'new value'` 처럼 어떤 데이터에 새로운 값을 설정한 경우, 컴포넌트는 바로 재 렌더링되지 않습니다. 다음 “tick”에서 큐가 비워지면 컴포넌트가 갱신됩니다. 대개 이런 흐름에 대해 신경 쓸 필요는 없지만, DOM 상태가 갱신된 후 이에 의존하는 작업을 하려면 까다로울 수 있습니다. Vue.js는 일반적으로 개발자가 “데이터 중심” 방식으로 생각하고 DOM을 직접 건드리지 않도록 권장하지만, 때로는 건드려야 하는 상황이 발생할 수도 있습니다. 데이터 변경 후에 Vue.js가 DOM 갱신을 마칠 때까지 기다리려면 데이터가 변경된 직후 `Vue.nextTick(callback)`을 사용하세요. 이 콜백은 다음과 같이 DOM이 업데이트된 후에 호출됩니다.

```html
<div id="example">{{ message }}</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // data 변경
vm.$el.textContent === 'new message' // false
Vue.nextTick(function() {
  vm.$el.textContent === 'new message' // true
})
```

또한 `vm.$nextTick()` 인스턴스 메서드도 있습니다. 이 메서드는 전역 `Vue`가 필요하지 않고 콜백의 `this` 컨텍스트가 자동으로 현재 컴포넌트 인스턴스에 바인딩 되기 때문에 다음과 같이 컴포넌트 내부에서 특히 유용합니다.

```js
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function() {
    return {
      message: 'not updated'
    }
  },
  methods: {
    updateMessage: function() {
      this.message = 'updated'
      console.log(this.$el.textContent) // => '변경안됨'
      this.$nextTick(function() {
        console.log(this.$el.textContent) // => '변경됨'
      })
    }
  }
})
```

`$nextTick()`은 promise를 반환하므로, [ES2017 async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) 문법을 사용하여 위와 동일한 결과를 얻을 수 있습니다.

```js
  methods: {
    updateMessage: async function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => '변경안됨'
      await this.$nextTick()
      console.log(this.$el.textContent) // => '변경됨'
    }
  }
```
