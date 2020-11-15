# 시작하기

::: tip NOTE
이미 Vue 2를 알고 있고 Vue 3의 새로운 점을 배우고 싶으신가요? [Migration Guide](/guide/migration/introduction.html)를 확인하세요! 
:::

## Vue.js가 무엇인가요?


Vue(/vjuː/ 로 발음, ***view*** 와 발음이 같습니다.)는 사용자 인터페이스를 만들기 위한 ***프로그레시브 프레임워크*** 입니다. 다른 단일형 프레임워크와 달리 Vue는 점진적으로 채택할 수 있도록 설계하였습니다. 핵심 라이브러리는 뷰 레이어만 초점을 맞추어 다른 라이브러리나 기존 프로젝트와의 통합이 매우 쉽습니다. 그리고 Vue는  [현대적 도구](../guide/single-file-component.html) 및  [지원 라이브러리](https://github.com/vuejs/awesome-vue#components--libraries) 와 함께 사용한다면 정교한 단일 페이지 응용프로그램을 완벽하게 지원할 수 있습니다.

vue에 대해 깊게 들어가기전에, 여러분게제 주요 원칙과 샘플을 제공하는 <a id="modal-player" class="vuemastery-trigger"  href="#">비디오를 만들었으니</a> 한번 보시기 바랍니다. 

<common-vuemastery-video-modal/>

## 시작하기

<p>
  <ActionLink class="primary" url="installation.html">
    설치
  </ActionLink>
</p>

::: tip
공식 가이드는 HTML, CSS 및 JavaScript에 대한 중간 수준의 지식을 전제로 하고 있습니다. 이제 막 프론트 엔드 개발에 대해 배우기 시작했다면 첫 번째 단계로 프레임워크를 시작하는 것은 좋은 생각이 아닙니다. 기본을 파악한 다음 다시 해보세요! 다른 프레임워크에 대한 사전 경험이 도움될 수 있지만 반드시 필요한것은 아닙니다
:::


Vue.js를 사용해 볼 수 있는 가장 쉬운 방법은 [Hello World example](https://codepen.io/team/Vue/pen/KKpRVpx) 예제를 사용하는 것입니다. 브라우저의 새 탭에서 열어 본 후 몇 가지 기본 예제를 따라가십시오. 

[설치](installation.md) 페이지에는 Vue를 설치하기 위한 옵션이 추가로 제공됩니다. 특히 Node.js 기반 빌드 도구에 아직 익숙하지 않으면 `vue-cli` 로 시작하는 것을 권장하지 않습니다.

## 선언적 렌더링(Declarative Rendering)

Vue.js의 핵심에는 간단한 템플릿 구문을 사용하여 DOM에서 데이터를 선언적으로 렌더링 할 수있는 시스템이 있습니다: 

```html
<div id="counter">
  Counter: {{ counter }}
</div>
```

```js
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')
```

첫 Vue app을 만들었습니다! 이것은 문자열 템플릿을 렌더링하는 것과 매우 유사하지만, Vue.JS 내부에서는 더 많은 작업을 하고 있습니다. 이제 데이터와 DOM이 연결되었으며 모든 것이 ***반응형*** 이 되었습니다. 우리는 그것을 어떻게 확인할 수 있을까요? 아래 예제 코드에서 `counter` 속성은 매 초마다 증가하고 우리는 DOM이 변경될때 어떻게 렌더 되는지 볼 수 있습니다.


```js{8-10}
const CounterApp = {
  data() {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
```

<FirstExample />

텍스트 보간(text interpolation) 이외에도 다음과 같은 엘리먼트 속성을 바인딩할 수 있습니다.

```html
<div id="bind-attribute">
  <span v-bind:title="message">
    마우스를 내 위에 올리고 몇초 기다려서 제목고 내가 동적으로 연결된것을 확인해 보세요!
  </span>
</div>
```

```js
const AttributeBinding = {
  data() {
    return {
      message: '이페이지를 다음 시간에 읽어들였습니다: ' + new Date().toLocaleString()
    }
  }
}

Vue.createApp(AttributeBinding).mount('#bind-attribute')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="KKpRVvJ" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Attribute dynamic binding">
  <span>Pen에 작성된  Vue (<a href="https://codepen.io/Vue">@Vue</a>) 로 하는 <a href="https://codepen.io/team/Vue/pen/KKpRVvJ">속성 동적 바인딩(Attribute dynamic binding)</a> 예제를 확인하세요</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

여기서 우리는 새로운 것을 만났습니다. `v-bind` 속성은 ***디렉티브*** 이라고 합니다. 디렉티브는 Vue에서 제공하는 특수 속성임을 나타내는 `v-` 접두어가 붙어있으며 사용자가 짐작할 수 있듯 렌더링 된 DOM에 특수한 반응형 동작을 합니다. 기본적으로 “이 요소의 `title`  속성을 Vue 인스턴스의 `message` 프로퍼티로 최신 상태를 유지 합니다.”

## 사용자 입력 처리하기

사용자가 앱과 상호 작용할 수 있게 하기 위해 우리는 `v-on` 디렉티브를 사용하여 Vue 인스턴스에서 메소드를 호출하는 이벤트 리스너를 추가 할 수 있습니다 :

```html
<div id="event-handling">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```js
const EventHandling = {
  data() {
    return {
      message: 'Hello Vue.js!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message
        .split('')
        .reverse()
        .join('')
    }
  }
}

Vue.createApp(EventHandling).mount('#event-handling')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="dyoeGjW" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Event handling">
  <span>Pen에 작성된  Vue (<a href="https://codepen.io/Vue">@Vue</a>) 로 하는  <a href="https://codepen.io/team/Vue/pen/dyoeGjW"> 이벤트 처리(Event handling)</a> 예제를 확인하세요</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

이 방법은 직접적으로 DOM을 건드리지 않고 앱의 상태만을 업데이트합니다. 모든 DOM 조작은 Vue에 의해 처리되며 작성한 코드는 기본 로직에만 초점을 맞춥니다.

Vue는 또한 양식에 대한 입력과 앱 상태를 양방향으로 바인딩 쉽게 해주는 `v-model` 디렉티브를 제공합니다.

```html
<div id="two-way-binding">
  <p>{{ message }}</p>
  <input v-model="message" />
</div>
```

```js
const TwoWayBinding = {
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}

Vue.createApp(TwoWayBinding).mount('#two-way-binding')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="poJVgZm" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Two-way binding">
  <span>Pen에 작성된  Vue (<a href="https://codepen.io/Vue">@Vue</a>) 로 하는 <a href="https://codepen.io/team/Vue/pen/poJVgZm">양방향 바인딩(Two-way binding)</a> 예제를 확인하세요</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 조건문과 반복문

엘리먼트가 표시되는지에 대한 여부를 제어하는 것은 아주 간단합니다.

```html
<div id="conditional-rendering">
  <span v-if="seen">이제 나를 볼수 있어요</span>
</div>
```

```js
const ConditionalRendering = {
  data() {
    return {
      seen: true
    }
  }
}

Vue.createApp(ConditionalRendering).mount('#conditional-rendering')
```

이 예제는 텍스트와 속성뿐 아니라 DOM의 ***구조*** 에도 데이터를 바인딩 할 수 있음을 보여줍니다. 또한 Vue 엘리먼트가 Vue에 삽입/업데이트/제거될 때 자동으로 [전환 효과(transition effects)](transitions-enterleave.md) 를 적용되는 강력한 전환 효과 시스템을 제공합니다.

우리는 효과를 확인하기 위해서 위 코드 블록의 `seen` 을 `true`에서 `false`로 바꿀 수 있습니다.

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="oNXdbpB" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Conditional rendering">
  <span>Pen에 작성된  Vue (<a href="https://codepen.io/Vue">@Vue</a>) 로 하는  <a href="https://codepen.io/team/Vue/pen/oNXdbpB">조건에 따른 렌더링(Conditional rendering)</a> 예제를 확인하세요</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Vue에서 제공하는 특별한 기능을 제공하는 디렉티브들이 있습니다. 예를 들어 `v-for` 디렉티브는 배열에서 데이터를 가져와 아이템 목록을 표시하는데 사용할수 있습니다. 

```html
<div id="list-rendering">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
const ListRendering = {
  data() {
    return {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ]
    }
  }
}

Vue.createApp(ListRendering).mount('#list-rendering')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="mdJLVXq" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="List rendering">
  <span>Pen에 작성된  Vue (<a href="https://codepen.io/Vue">@Vue</a>) 로 하는 <a href="https://codepen.io/team/Vue/pen/mdJLVXq">목록 렌더링(List rendering)</a> 예제를 확인하세요</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 컴포넌트로 조립하기

컴포넌트 시스템은 Vue의 또 다른 중요한 개념입니다. 이는 작고 독립적이며 재사용할 수 있는 컴포넌트로 구성된 대규모 애플리케이션을 구축할 수 있게 해주는 추상적 개념입니다. 생각해보면 거의 모든 유형의 애플리케이션 인터페이스를 컴포넌트 트리로 추상화할 수 있습니다.

![컴포넌트 트리](/images/components.png)

Vue에서 컴포넌트는 미리 정의된 옵션을 가진 Vue 인스턴스 입니다. Vue에서 컴포넌트를 등록하는 방법은 간단합니다. `App` 객체에서 했던 것처럼 우리는 컴포넌트 객체를 만들고 부모 컴포넌트의 `components`  (마지막 복수형에 주의) 옵션에 정의할 수 있습니다.

```js
// 뷰 어플리케이션을 생성합니다. 
const app = Vue.createApp(...)

// todo-item 란 이름의 새로운 컴포넌트를 선언합니다. 
app.component('todo-item', {
  template: `<li>할일이 있어요</li>`
})

// 어플리케이션을 마운트 합니다. 
app.mount(...)
```

이제 다른 컴포넌트의 템플릿에서 이 컴포넌트을 이용해 조립할수 있습니다. 

```html
<ol>
  <!-- todo-item 컴포넌트의 인스턴스를 만듭니다.  -->
  <todo-item></todo-item>
</ol>
```

그러나 이것은 todo-item 컴포넌트를 사용할 때마다 똑같은 텍스트를 렌더링할뿐 무언가가 부족합니다. 부모 영역의 데이터를 자식 컴포넌트에 전달할 수 있어야 합니다. [prop](component-basics.html#passing-data-to-child-components-with-props) 을 전달받을 수 있도록 todo-item 컴포넌트의 정의를 수정해봅시다.

```js
app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})
```

Now we can pass the todo into each repeated component using `v-bind`:

이제 `v-bind` 를 사용하여 할일을 개별  todo-item 컴포넌트에 전달할 수 있습니다.

```html
<div id="todo-list-app">
  <ol>
    <!--
      이제 할일 todo-item 에 할일을 전달합니다. 
      콘텐츠는 동적으로 포현됩니다. 
      여기에서 "key"를 또 전달하고 있는데 
      이것에 대해서는 나중에 설명하겠습니다. 
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
const TodoList = {
  data() {
    return {
      groceryList: [
        { id: 0, text: '야채' },
        { id: 1, text: '치즈' },
        { id: 2, text: '사람이 먹을수 있는거라면 뭐든지' }
      ]
    }
  }
}

const app = Vue.createApp(TodoList)

app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})

app.mount('#todo-list-app')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="VwLxeEz" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Intro-Components-1">
  <span>Pen에 작성된  Vue (<a href="https://codepen.io/Vue">@Vue</a>) 로 하는 <a href="https://codepen.io/team/Vue/pen/VwLxeEz">컴포넌트 소개 1(Intro-Components-1)</a> 예제를 확인하세요</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

이것은 인위적으로 만든 예시이지만, 우리는 앱을 두 개의 더 작은 단위로 나눌 수 있었고, 자식을 props 인터페이스를 통하여 부모로부터 합리적인 수준으로 분리할 수 있었습니다. 이제 앞으로는 부모 앱에 영향을 주지 않으면서  `<todo-item>` 컴포넌트를 더 복잡한 템플릿과 로직으로 더욱 향상시킬 수 있을 것입니다.

대규모 애플리케이션에서는 개발을 보다 쉽게 관리 할 수 있도록 전체 앱을 컴포넌트로 나누는 것이 필수적입니다. [나중에 나올 가이드](component-basics.md) 에서 컴포넌트에 대해 자세히 설명하겠지만 여기서는 컴포넌트를 사용한 앱의 모습이 어떻게 구성될지에 대한 (가상의) 예를 작성하겠습니다.

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

### 사용자 정의 엘리먼트와의 관계

Vue 컴포넌트는 [Web Components 표준](https://www.w3.org/wiki/WebComponents/) 의 일부인 ***Custom Elements*** 와 매우 유사하다는 것을 눈치 챘을 수 있습니다. Vue의 컴포넌트 구문은 스펙 이후 느슨하게 모델링 되었기 때문입니다. 예를 들어 Vue 컴포넌트는 [Slot API](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md) 와 `is` 특수 속성을 구현합니다. 그러나 몇가지 중요한 차이가 있습니다.

1. Web Components Spec은 최종안이 정해졌지만 모든 브라우저들이 기본적으로 구현되는 것은 아닙니다. 현재 사파리 10.1+, 크롬 54+ 그리고 파이어폭스 63+ 기본적으로 Web Components를 지원합니다. 이에 비해 Vue 컴포넌트는 지원되는 모든 브라우저 (IE11과 호환되거나 그 이상버젼)에서 일관되게 작동합니다. 필요한 경우 Vue 컴포넌트는 기본 사용자 정의 엘리먼트 내에 래핑할 수 있습니다



[//]: # 'TODO: link to compatibility build'

1. Vue 컴포넌트는 컴포넌트간 데이터의 흐름을 비롯해, 사용자 정의 이벤트와 통신, 빌드 도구와의 통합 등 기본 사용자 지정 엘리먼트에서 사용할 수 없었던 중요한 기능을 제공합니다.

Vue는 내부적으로 사용자 정의 엘리먼트를 사용하지 않지만, 사용자 정의 엘리먼트로 사용 또는 배포하는 경우에는 [뛰어난 상호운영성](https://custom-elements-everywhere.com/#vue)  을 가집니다. Vue CLI는 자기자신을 네이티브 커스텀 엘리먼트로서 등록하는 Vue 컴포넌트의 빌드도 지원하고 있습니다.


## 더 하실 준비가 되셨나요?

우리는 Vue.js 코어의 가장 기본적인 기능을 간략하게 소개했습니다. 이 가이드의 나머지 부분에서 더 자세한 세부 내용이 포함된 다른 고급 기능에 대해 다룰 예정이므로 꼭 읽어보시기 바랍니다.
