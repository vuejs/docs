# 어플리케이션 인스턴스

## 인스턴스 생성하기

모든 Vue 어플리케이션은 `createApp` 함수를 사용하여 새로운 **어플리케이션 인스턴스**를 생성하여 시작합니다 :

```js
Vue.createApp(/* 옵션들 */)
```

인스턴스가 생성되면, `mount` 메소드에 컨테이너를 전달하여 *mount* 할 수 있습니다. 예를들어, `<div id="app"></div>`에 Vue 어플리케이션을 마운트 시키고 싶다면, `#app`을 전달해야합니다:

```js
Vue.createApp(/* 옵션들 */).mount('#app')
```

[MVVM 패턴](https://en.wikipedia.org/wiki/Model_View_ViewModel)과 밀접하게 관련있지는 않지만, Vue의 디자인은 MVVM 패턴에 의해 부분적으로 영감을 받았습니다. 종종 인스턴스를 참조하기 위해서 변수 `vm` (ViewModel의 줄임말)를 종종 사용합니다 .

인스턴스를 생성할 때, **options 객체**를 전달합니다. 이 가이드의 대부분은 원하는 동작을 만드는 이러한 옵션들을 사용할 수 있는 방법에 대해 기술합니다. 참고로, [API 레퍼런스](../api/options-data.html)에서 전체 옵션 목록을 찾아볼 수 있습니다.

Vue 어플리케이션은 `createApp`으로 생성되며, 필요에 따라 중첩될 수 있고 재사용가능한 컴포넌트로 구성된 **root instance**로 구성됩니다. 예를 들어, `todo` 앱의 컴포넌트 트리는 다음과 같습니다:

```
Root Instance
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

[컴포넌트 시스템](component-basics.html)에 대해서는 나중에 자세히 설명하겠습니다. 지금은 모든 Vue 컴포넌트들도 또한 인스턴스이므로 동일한 옵션 객체를 허용합니다.

## 데이터와 메소드

인스턴스가 생성될 때, `data`에서 발견된 모든 속성들을 [Vue의 **반응성 시스템**](reactivity.html)에 추가합니다. 이 속성의 값들이 변하는 경우, 화면이 "반응"하고 새 값과 일치하도록 갱신됩니다.

```js
// data 객체
const data = { a: 1 }

// 객체가 루트 인스턴스에 추가됩니다
const vm = Vue.createApp({
  data() {
    return data
  }
}).mount('#app')

// 인스턴스에서 속성을 가져오면
// 원래 데이터에서 속성을 반환합니다
vm.a === data.a // => true

// 인스턴스에서 속성을 설정하면
// 원래 데이터에도 영향을 미칩니다
vm.a = 2
data.a // => 2
```

데이터가 변경되면, 화면은 다시 렌더링됩니다. 인스턴스 생성 시 `data`의 속성이 존재하는 경우에만 **반응**한다는 점에 유의해야합니다. 즉, 다음과 같이 새로운 속성을 추가하는 경우에는:

```js
vm.b = 'hi'
```

`b`가 변경되어도 화면이 갱신되지 않습니다. 나중에 속성이 필요로 하지만, 빈 값이거나 존재하지 않은 상태로 시작한다면 아래와 같이 초기 값을 지정할 필요가 있습니다:

```js
data() {
  return {
    newTodoText: '',
    visitCount: 0,
    hideCompletedTodos: false,
    todos: [],
    error: null
  }
}
```

여기서 유일한 예외는 `Object.freeze()`를 사용하는 경우입니다. 이는 기존 속성이 변경되는 것을 막아 반응성 시스템이 변경사항을 *추적*할 수 없다는 것을 의미합니다.

```js
const obj = {
  foo: 'bar'
}

Object.freeze(obj)

const vm = Vue.createApp({
  data() {
    return obj
  }
}).mount('#app')
```

```html
<div id="app">
  <p>{{ foo }}</p>
  <!-- `foo`는 더이상 변하지 않습니다 ! -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```

Vue 인스턴스는 데이터 속성 이외에도 여러가지 유용한 인스턴스 속성 및 메소드를 제공합니다. 다른 사용자 정의 속성과 구분하기 위해 `$` 접두어를 붙였습니다. 예:

```js
const vm = Vue.createApp({
  data() {
    return {
      a: 1
    }
  }
}).mount('#example')

vm.$data.a // => 1
```

나중에 [API reference](../api/instance-properties.html)에서 인스턴스 속성 및 메소드의 전체 목록을 확인하세요.

## 인스턴스 라이프사이클 훅

각 Vue 인스턴스는 생성될 때, 일련의 초기화 단계를 거칩니다. 예를들어, 데이터 관찰을 설정하는 경우, 템플릿을 컴파일하는 경우, DOM에 인스턴스를 마운트하는 경우, 그리고 데이터가 변경되어 DOM을 업데이트하는 경우가 있습니다. 그 과정에서 **라이프사이클 훅**이라고 불리우는 기능을 실행하여 특정 단계에서 사용자 고유의 코드를 추가할 수 있는 기회를 제공합니다.

예를들어, [created](../api/options-lifecycle-hooks.html#created) 훅은 인스턴스가 생성된 후에 코드를 실행하는데 사용됩니다:

```js
Vue.createApp({
  data() {
    return {
      a: 1
    }
  },
  created() {
    // `this`는 vm instance을 가리킵니다
    console.log('a is: ' + this.a) // => "a is: 1"
  }
})
```

인스턴스 라이프사이클에는 [mounted](../api/options-lifecycle-hooks.html#mounted), [updated](../api/options-lifecycle-hooks.html#updated), [unmounted](../api/options-lifecycle-hooks.html#unmounted) 과 같은 다른 훅도 존재합니다. 모든 라이프사이클 훅에서는 Vue인스턴스를 가리키는 `this` 컨텍스트와 함께 호출됩니다.

::: tip options 속성이나 콜백에서 `created: () => console.log(this.a)`이나 `vm.$watch('a', newValue => this.myMethod())` 과 같은 [화살표 함수](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)를 사용하지 마세요. 화살표함수는 `this`가 없기 때문에, `this`는 다른 변수로 취급되거나 호출한 변수를 발견할 때까지 부모 스코프에서 해당 변수를 찾을것입니다. 이 때문에 `Uncaught TypeError: Cannot read property of undefined` 또는 <br>`Uncaught TypeError: this.myMethod is not a function`와 같은 오류가 발생하게 됩니다. :::

## 라이프사이클 다이어그램

아래는 인스턴스 라이프사이클에 대한 다이어그램입니다. 지금 당장 모든 것을 완전히 이해할 필요는 없지만 다이어그램은 앞으로 도움이 될 것입니다.

<img width="840" height="auto" style="margin: 0px auto; display: block; max-width: 100%;" loading="lazy" alt="Instance lifecycle hooks" src="/images/lifecycle.png">
