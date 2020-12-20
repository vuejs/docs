# Provide / inject

> 이 페이지는 여러분이 이미 [컴포넌트 기초](component-basics.md)를 읽었다고 가정하고 쓴 내용입니다. 컴포넌트가 처음이라면 기초 문서를 먼저 읽으시기 바랍니다.

일반적으로 데이터를 부모에서 자식 컴포넌트로 전달해야할 때 [props](component-props.md)를 사용합니다. 특정한 두 컴포넌트 사이에 깊이 중첩된 컴포넌트가 있는 구조의 경우 하위 컴포넌트에서 상위 컴포넌트의 무언가가 필요한 경우를 상상해보십시오. 이 경우에 두 컴포넌트 사이의 모든 컴포넌트에 prop를 전달해야하므로 굉장히 번거로울 것입니다.

이러한 경우 `provide`와 `inject` 쌍을 사용할 수 있습니다. 부모 컴포넌트는 컴포넌트 계층 구조의 깊이와 상관없이 모든 자식에 대한 종속성 제공자 역할을 할 수 있습니다. 이 기능은 2개의 부분으로 구성됩니다: 부모 컴포넌트는 데이터 제공을 위해 `provide` 옵션을 사용하며, 자식 요소는 데이터 사용을 위해 `inject` 옵션을 사용합니다.

![Provide/inject scheme](https://github.com/narusas/docs-next/blob/master/images/components_provide.png?raw=true)

예를, 들어, 아래와 같은 구조를 가지고 있는 경우:

```
Root
└─ TodoList
   ├─ TodoItem
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

`TodoListStatistics` 컴포넌트에 todo-items의 length를 전달하려고 하면 다음과 같은 구조를 따라 prop을 전달해야 합니다: `TodoList` -> `TodoListFooter` -> `TodoListStatistics`. Provide/inject 방식을 사용하면 다음과 같이 값을 직접적으로 전달할 수 있습니다:

```js
const app = Vue.createApp({})

app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide: {
    user: 'John Doe'
  },
  template: `
    <div>
      {{ todos.length }}
      <!-- 나머지 템플릿 -->
    </div>
  `
})

app.component('todo-list-statistics', {
  inject: ['user'],
  created() {
    console.log(`Injected property: ${this.user}`) // > Injected property: John Doe
  }
})
```

그러나 여기에 일부 컴포넌트 인스턴스 속성을 provide하려고하면 작동하지 않습니다.

```js
app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide: {
    todoLength: this.todos.length // 'Cannot read property 'length' of undefined`라는 오류가 발생합니다.
  },
  template: `
    ...
  `
})
```

컴포넌트 인스턴스 속성에 접근하려면 `provide`를 객체로 반환하는 함수로 변환해야 합니다.

```js
app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide() {
    return {
      todoLength: this.todos.length
    }
  },
  template: `
    ...
  `
})
```

이를 통해 하위 컴포넌트가 의존하는 것을 변경/제거할 수 있다는 두려움없이 해당 컴포넌트를 보다 안전하게 계속 개발할 수 있습니다. 이러한 컴포넌트 간의 인터페이스는 prop와 마찬가지로 명확하게 정의되어 있습니다.

사실 의존성 주입은 아래의 몇몇 요소를 제외하고는 "장거리 props"라고 생각할 수 있습니다:

- 부모 컴포넌트는 어떤 하위 컴포넌트가 provide된 속성을 사용하는지 알 필요가 없다.
- 자식 컴포넌트는 inject된 속성이 어디서 왔는지 알 필요가 없다.

## 반응형(reactive)으로 작업하기

위에 예시에서 `todos` 목록를 변경하면, 변경 사항은 inject된 `todoLength` 속성에 반영되지 않습니다. 이는 `provide/inject` 바인딩이 기본적으로 반응형이 *아니기* 때문입니다. `ref` 속성이나 `reactive` 객체를 `provide`에 전달하여 반응형으로 변경할 수 있습니다. 이 경우 상위 컴포넌트의 변경사항에 반응하려면 Composition API의 `computed` 속성을 provide된 `todoLength`에 할당해야 합니다.

```js
app.component('todo-list', {
  // ...
  provide() {
    return {
      todoLength: Vue.computed(() => this.todos.length)
    }
  }
})
```

여기에서 `todos.length`에 대한 모든 변경 사항은 `todoLength`이 inject된 컴포넌트에 올바르게 반영됩니다. [Composition API 섹션](composition-api-provide-inject.html#injection-reactivity)에서 `reactive` provide/inject에 대해 자세히 알아보십시오.
