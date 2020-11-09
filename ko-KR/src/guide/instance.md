# 어플리케이션 & 컴포넌트 인스턴스

## 어플리케이션 인스턴스 생성하기

모든 Vue 어플리케이션은 `createApp` 함수를 사용하여 새로운 **어플리케이션 인스턴스**를 생성하여 시작합니다 :

```js
const app = Vue.createApp({ /* options */ })
```

인스턴스가 생성되면, `mount` 메소드에 컨테이너를 전달하여 *mount* 할 수 있습니다. 예를들어, `<div id="app"></div>`에 Vue 어플리케이션을 마운트 시키고 싶다면, `#app`을 전달해야합니다:

```js
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```

어플리케이션 인스턴스에 의해 노출된 대부분의 메소드들은 동일한 인스턴스를 반환하여 연결(chaining)을 허용합니다:

```js
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
```

[API 참조](../api/application-api.html)에서 전체 어플리케이션 API를 찾아볼 수 있습니다.

## 최상위(Root) 컴포넌트

`createApp`에 전달된 옵션은 **루트 컴포넌트**를 구성하는데 사용됩니다. 이 컴포넌트는 어플리케이션을 **mount**할 때, 렌더링의 시작점으로 사용됩니다.

어플리케이션을 DOM 요소에 마운트되어야합니다. 예를들어, Vue 어플리케이션을 `<div id="app"></div>`에 마운트하려면 `#app`을 전달해야 합니다.

```js
const RootComponent = { /* options */ }
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```

대부분의 어플리케이션 메소드와 달리, `mount`는 어플리케이션을 반환하지 않습니다. 대신 루트 컴포넌트 인스턴스를 반환합니다.

[MVVM 패턴](https://en.wikipedia.org/wiki/Model_View_ViewModel)과 밀접하게 관련있지는 않지만, Vue의 디자인은 MVVM 패턴에 의해 부분적으로 영감을 받았습니다. 종종 인스턴스를 참조하기 위해서 변수 `vm` (ViewModel의 줄임말)를 종종 사용합니다 .

인스턴스를 생성할 때, **options 객체**를 전달합니다. 이 가이드의 대부분은 원하는 동작을 만드는 이러한 옵션들을 사용할 수 있는 방법에 대해 기술합니다. 참고로, [API 레퍼런스](../api/options-data.html)에서 전체 옵션 목록을 찾아볼 수 있습니다.

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

각 컴포넌트에는 고유한 컴포넌트 인스턴스 `vm{/code0이 있습니다. <code data-md-type="codespan">TodoItem`과 같은 일부 컴포넌트의 경우 한 번에 여러 인스턴스가 렌더링 될 수 있습니다. 이 어플리케이션의 모든 컴포넌트 인스턴스는 동일한 어플리케이션 인스턴스를 공유합니다.

[컴포넌트 시스템](component-basics.html)에 대해서는 나중에 자세히 설명하겠습니다. 지금은 루트 컴포넌트가 다른 컴포넌트와 실제로 다르지 않다는 점에 유의하십시오. 구성 옵션은 해당 컴포넌트 인스턴스의 동작과 동일합니다.

## 컴포넌트 인스턴스 속성들

가이드 앞부분에서 `data` 속성을 만났습니다. `data`에 정의된 속성은 컴포넌트 인스턴스를 통해 노출됩니다:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4
```

`methods`, `props`, `computed`, `inject` 및`setup`과 같은 사용자 정의 속성을 컴포넌트 인스턴스에 추가하는 다양한 다른 컴포넌트 옵션들이 있습니다. 가이드의 뒷부분에서 각각에 대해 자세히 설명하겠습니다. 컴포넌트 인스턴스의 모든 속성은 정의된 방법에 관계없이 컴포넌트의 템플릿에서 접근할 수 있습니다.

Vue는 또한 컴포넌트 인스턴스를 통해 `$attrs`와 `$emit`과 같은 몇몇 빌트인(built-in) 속성을 노출합니다. 이러한 속성을 모두 사용자 정의 속성명과 충돌하지 않도록 `$` 접두사(prefix)를 가지고 있습니다.

## 라이프사이클 훅

각 컴포넌트는 생성될 때 일련의 초기화 단계를 거칩니다. 예를들어 데이터 관찰, 템플릿 컴파일, 인스턴스를 DOM에 마운트, 데이터 변경 시 DOM을 업데이트해야합니다. 그 과정에서 **라이프사이클 훅**이라 불리우는 함수도 실행하여, 사용자가 특정 단계에서 자신의 코드를 추가할 수 있는 기회를 제공합니다.

예를들어, [created](../api/options-lifecycle-hooks.html#created) 훅은 인스턴스가 생성된 후에 코드를 실행하는데 사용됩니다:

```js
Vue.createApp({
  data() {
    return { count: 1 }
  },
  created() {
    // `this` points to the vm instance
    console.log('count is: ' + this.count) // => "count is: 1"
  }
})
```

인스턴스 라이프사이클에는 [mounted](../api/options-lifecycle-hooks.html#mounted), [updated](../api/options-lifecycle-hooks.html#updated), [unmounted](../api/options-lifecycle-hooks.html#unmounted) 과 같은 다른 훅도 존재합니다. 모든 라이프사이클 훅에서는 Vue인스턴스를 가리키는 `this` 컨텍스트와 함께 호출됩니다.

::: tip options 속성이나 콜백에서 `created: () => console.log(this.a)`이나 `vm.$watch('a', newValue => this.myMethod())` 과 같은 [화살표 함수](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)를 사용하지 마세요. 화살표함수는 `this`가 없기 때문에, `this`는 다른 변수로 취급되거나 호출한 변수를 발견할 때까지 부모 스코프에서 해당 변수를 찾을것입니다. 이 때문에 `Uncaught TypeError: Cannot read property of undefined` 또는 <br>`Uncaught TypeError: this.myMethod is not a function`와 같은 오류가 발생하게 됩니다. :::

## 라이프사이클 다이어그램

아래는 인스턴스 라이프사이클에 대한 다이어그램입니다. 지금 당장 모든 것을 완전히 이해할 필요는 없지만 다이어그램은 앞으로 도움이 될 것입니다.


<img width="840" height="auto" style="margin: 0px auto; display: block; max-width: 100%;" loading="lazy" alt="Instance lifecycle hooks" src="/images/lifecycle.png"> 
