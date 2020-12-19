# 리스트 렌더링

## `v-for`로 엘리먼트에 배열 매핑하기

`v-for` 디렉티브를 사용하여 배열을 기반으로 리스트를 렌더링 할 수 있습니다. `v-for` 디렉티브는 `item in items` 형태로 특별한 문법이 필요합니다. 여기서 `items`는 원본 데이터 배열이고 `item`은 반복되는 배열 엘리먼트의 **별칭**입니다.

```html
<ul id="array-rendering">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-rendering')
```

결과:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="VwLGbwa" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Array">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/VwLGbwa">   v-for with Array</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

`v-for` 블록 안에는 부모 범위 속성에 대한 모든 권한이 있습니다. `v-for`는 또한 현재 항목의 인덱스에 대한 두 번째 전달인자 옵션을 제공합니다.

```html
<ul id="array-with-index">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      parentMessage: 'Parent',
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}).mount('#array-with-index')
```

결과:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="wvaEdBP" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Array and index">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/wvaEdBP">   v-for with Array and index</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

`in` 대신에 `of`를 구분자로 사용할 수 있습니다. 이는 JavaScript의 이터레이터 구문과 유사합니다.

```html
<div v-for="item of items"></div>
```

## `v-for`와 객체

`v-for`를 사용하여 객체의 속성을 반복할 수도 있습니다.

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

```js
Vue.createApp({
  data() {
    return {
      myObject: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  }
}).mount('#v-for-object')
```

결과:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="NWqLjqy" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Object">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/NWqLjqy">   v-for with Object</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

키에 대한 두번째 전달 인자를 제공할 수도 있습니다.

```html
<li v-for="(value, name) in myObject">
  {{ name }}: {{ value }}
</li>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="poJOPjx" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Object and key">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/poJOPjx">   v-for with Object and key</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

그리고 인덱스도 제공합니다.

```html
<li v-for="(value, name, index) in myObject">
  {{ index }}. {{ name }}: {{ value }}
</li>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="abOaWdo" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with Object key and index">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/abOaWdo">   v-for with Object key and index</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

:::tip 객체를 반복할 때 순서는 `Object.keys()`의 키 나열 순서에 따라 결정됩니다. 이 순서는 JavaScript 엔진 구현간에 일관적이지는 않습니다. :::

## 상태 유지

Vue가 `v-for`에서 렌더링된 엘리먼트 목록을 갱신할 때 기본적으로 "in-place patch" 전략을 사용합니다. 데이터 항목의 순서가 변경된 경우 항목의 순서와 일치하도록 DOM 요소를 이동하는 대신 Vue는 각 요소를 적절한 위치에 패치하고 해당 인덱스에서 렌더링할 내용을 반영하는지 확인합니다.

이 기본 모드는 효율적이지만 **목록의 출력 결과가 하위 컴포넌트 상태 또는 임시 DOM 상태(예: 폼 input)에 의존하지 않는 경우**에 적합합니다.

각 노드의 id를 추적하여, 재사용하거나 순서를 변경하는등의 작업을 위해 각 아이템에 유일한 `key` 속성을 주어, vue에게 힌트를 줄수 있습니다.

```html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

반복되는 DOM 내용이 단순한 경우나 의도적인 성능 향상을 위해 기본 동작에 의존하지 않는 경우를 제외하면, 가능하면 언제나 `v-for`에 `key`를 추가하는 것이 좋습니다.

<code>key</code>는 Vue가 노드를 식별하는 일반적인 메커니즘이기 때문에 <code>v-for</code>와 특별히 연관되지 않는 다른 용도로도 사용됩니다. 뒤에서 이와 관련된 내용이 나올 것입니다.

:::tip 객체나 배열처럼, 기본 타입(Primitive value)이 아닌 값을 `v-for`의 키로 사용해서는 안됩니다. 대신 문자열이나 숫자를 사용하세요. :::

`key` 속성에 대한 더 많은 사용법은 <a href="../api/special-attributes.html#key" data-md-type="link">`key` API documentation</a>를 참고하세요.

## 배열 변경 감지

### 변이 메소드

Vue는 감시중인 배열의 변이 메소드를 래핑하여 뷰 갱신을 트리거합니다. 래핑된 메소드는 다음과 같습니다.

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

콘솔을 열고 변형 메소드를 호출하여 이전의 예제의 `items` 배열로 사용할 수 있습니다.<br>예: `example1.items.push({ message: 'Baz' })`.

### 배열 교체

이름에서 알 수 있듯이 변이 메소드는 호출된 원래 배열을 변경합니다. 이에 비해 `filter()`, `concat()` and `slice()`와 같은 원래 배열을 변경하지는 않지만 **항상 새 배열을 반환**하는 비-변이 메소드도 있습니다. 비-변이 메소드로 작업할 때 이전 배열을 새 배열로 바꿀 수 있습니다:

```js
example1.items = example1.items.filter(item => item.message.match(/Foo/))
```

이로 인해 Vue가 기존 DOM을 버리고 전체 목록을 다시 렌더링할 것이라고 생각할 수 있습니다. 다행히도 그렇지 않습니다. Vue는 DOM 요소 재사용을 최대화하기 위해 몇 가지 smart heuristics(스마트 휴리스틱, 과학적인 조건보다는 경험이나 직관에 의해 똑똑하게 의사결정을 하는 방식)을 구현하므로, 배열을 겹치는 객체를 포함하는 다른 배열로 교체하는 것은 매우 효율적인 작업입니다.

## 필터링/졍렬된 결과 표시

때때로 우리는 원래 데이터를 실제로 변경하거나 재설정하지 않고, 배열의 필터링되거나 정렬된 버전을 표시하려고 합니다. 이 경우 필터링되거나 정렬된 배열을 반환하는 computed 속성을 만들 수 있습니다.

예시:

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```

```js
data() {
  return {
    numbers: [ 1, 2, 3, 4, 5 ]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(number => number % 2 === 0)
  }
}
```

computed 속성이 실행 가능하지 않은 상황 (예. 중접된 `v-for` 루프 내부)에서는 다음 메소드를 사용할 수 있습니다:

```html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

## 범위가 있는 `v-for`

`v-for`도 정수를 사용할 수 있습니다. 이 경우 템플릿을 여러 번 반복합니다.

```html
<div id="range" class="demo">
  <span v-for="n in 10">{{ n }} </span>
</div>
```

결과:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="NWqLjNY" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with a range">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/NWqLjNY">   v-for with a range</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

## `<template>`에서의 `v-for`

템플릿의 `v-if`와 마찬가지로, `v-for`와 함께 `<template>`태그를 사용하여 여러 요소의 블록을 렌더링 할 수도 있습니다. 예를들어:

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-if`가 있는 `v-for`

:::팁 `v-if`와 `v-for`를 함께 사용하는 것은 권장되지 **않습니다.** 자세한 내용은 [스타일 가이드](../style-guide/#avoid-v-if-with-v-for-essential)를 참조하세요. :::

동일한 노드에 있는 경우, `v-if`는 `v-for`보다 우선 순위가 높습니다. 즉, `v-if` 조건은 `v-for` 범위의 변수에 접근할 수 없습니다:

```html
<!-- This will throw an error because property "todo" is not defined on instance. -->

<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

`v-for`를 래핑(wrapping)하는 `<template>`태그를 사용하면 문제를 해결할 수 있습니다:

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo }}
  </li>
</template>
```

## 컴포넌트의 `v-for`

> 이 섹션에서는 [컴포넌트](component-basics.md)를 안다고 가정합니다. 부담없이 건너뛰어도 됩니다.

`v-for`를 사용자 정의 컴포넌트에 직접 사용할 수 있습니다.

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

그러나 컴포넌트에는 자체 범위가 분리되어있기 때문에 컴포넌트에 데이터를 자동으로 전달하지는 않습니다. 반복할 데이터를 컴포넌트로 전달하려면 props도 사용해야합니다.

```html
<my-component
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
></my-component>
```

`item`을 컴포넌트에 자동으로 삽입하지 않는 이유는 컴포넌트가 `v-for` 작동방식과 밀접하게 연결되어 있기 때문입니다. 데이터의 출처를 명시하면 다른 상황에서 컴포넌트를 재사용할 수 있습니다.

다음은 간단한 todo list의 완전한 예입니다:

```html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    />
    <button>Add</button>
  </form>
  <ul>
    <todo-item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :title="todo.title"
      @remove="todos.splice(index, 1)"
    ></todo-item>
  </ul>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      newTodoText: '',
      todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTodoId: 4
    }
  },
  methods: {
    addNewTodo() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})

app.component('todo-item', {
  template: `
    <li>
      {{ title }}
      <button @click="$emit('remove')">Remove</button>
    </li>
  `,
  props: ['title']
})

app.mount('#todo-list-example')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="abOaWpz" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="v-for with components">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/abOaWpz">   v-for with components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>
