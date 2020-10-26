# Provide / inject

> 이 페이지는 여러분이 이미 [컴포넌트 기초](component-basics.md)를 읽었다고 가정하고 쓴 내용입니다. 컴포넌트가 처음이라면 기초 문서를 먼저 읽으시기 바랍니다.

일반적으로 데이터는 부모요소에서 자식요소로 [props](component-props.md)를 사용해 전달됩니다. 이 때, 여러 단계를 거쳐야 하는 자식 요소 하나가 부모 요소의 특정 값을 필요로 하는 상황을 상상해 봅시다. 이 경우, 특정 자식 요소에서만 해당 값을 필요로 함에도 불구하고 모든 연결된 컴포넌트들을 거쳐 값을 전달하는 일은 굉장히 번거로울 것입니다.

이런 경우에 `provide`와 `inject`를 상요할 수 있습니다. 부모 컴포넌트는 자식 요소의 계층 깊이와 무관하게 모든 자식 요소에게 의존성을 제공할 수 있습니다. 이 기능은 두 개의 부분으로 구성됩니다: 부모 컴포넌트는 데이터 제공을 위해 `provide` 옵션을 사용하며, 자식 요소는 데이터 사용을 위해 `inject` 옵션을 사용합니다.

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

`TodoListStatistics` 컴포넌트에 todo-items의 length를 전달하려고 하면 다음과 같은 구조를 따라 prop을 전달해야 합니다: `TodoList` -> `TodoListFooter` -> `TodoListStatistics`. Provide/inject 를 사용하면 아래와 같이 바로 전달할 수 있습니다:

```js
const app = Vue.createApp({})

app.component('todo-list', {
  data() {
    return {
      todos: ['고양이 밥주기', '티켓 구매']
    }
  },
  provide: {
    user: 'John Doe'
  },
  template: `
    <div>
      {{ todos.length }}
      <!-- rest of the template -->
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

이 때, provide에 컴포넌트 인스턴스의 프로퍼티를 사용하는 것은 동작하지 않습니다.

```js
app.component('todo-list', {
  data() {
    return {
      todos: ['고양이 밥 주기', '티켓 구매']
    }
  },
  provide: {
    todoLength: this.todos.length // 이 구문은 'Cannot read property 'length' of undefined` 라는 에러를 발생시킵니다.
  },
  template: `
    ...
  `
})
```

컴포넌트 인스턴스의 프로퍼티에 접근하고자 하는 경우,  `provide`를 object를 반환하는 함수로써 작성하여야 합니다.

```js
app.component('todo-list', {
  data() {
    return {
      todos: ['고양이 밥 주기', '티켓 구매']
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

이러한 방식은 자식 컴포넌트가 의존성을 갖는 무언가를 변경하거나 제거할 걱정 없이 컴포넌트를 안전하게 개발할 수 있도록 합니다. 컴포넌트 사이의 인터페이스는 props와 같이 명료하게 정의된 채로 남게 됩니다.

사실 의존성 주입은 아래의 몇몇 요소를 제외하고는 "장거리 props"라고 생각해도 무방합니다:

- 부모 컴포넌트는 어떤 후손 컴포넌트가 provide 된 속성을 사용하는지 알 필요가 없다.
- 자식 컴포넌트는 inject된 속성이 어디서 왔는지 알 필요가 없다

## 반응형(reactive)으로 작업하기

위에 작성한 예시에서는 `todos`의 리스트를 변경하더라도 inject된 `todoLength` 속성에 반녕되지 않습니다. 이는 `provide/inject` 바인딩은 기본적으로 반응형이 *아니기* 때문입니다. 이는 `ref` 속성을 전달하거나 `provide`에 `reactive` 객체를 전달하는 방식으로 변경할 수 있습니다. 위 예시의 경우와 같이 조상 컴포넌트에서의 변경에 반응하기 위해서는 컴포지션 API의 `computed` 속성을 provide된 `todoLength` 에 할당해야 합니다.

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

이 경우, `todoLength`가 inject 된 모든 컴포넌트에 `todos.length`의 변경사항이 제대로 적용됩니다. `반응형` provide/inject 에 대한 더 자세한 내용은 [Composition API section](composition-api-provide-inject.html#injection-reactivity)를 참고하세요.
