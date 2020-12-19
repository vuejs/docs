# 사용자 지정 디렉티브

## 시작

Vue는 코어에 포함된 기본 디렉티브 (`v-model` 과`v-show`와 같은) 외에도 커스텀 디렉티브를 등록할 수 있습니다. Vue에서 코드 재사용 및 추상화의 기본 형식은 컴포넌트입니다. 그러나 일반 엘리먼트에 하위 수준의 DOM 액세스가 필요한 경우가 있을 수 있으며 이 경우 커스텀 디렉티브가 여전히 유용할 수 있습니다. 다음은 input 엘리먼트와 focusing에 대한 예제입니다.

<common-codepen-snippet title="Custom directives: basic example" slug="JjdxaJW" :preview="false"></common-codepen-snippet>

페이지가 로드되면 해당 엘리먼트는 포커스를 얻습니다. (참고: `autofocus`는 모바일 사파리에서 작동하지 않습니다.) 사실, 이 페이지를 방문한 이후, 다른것을 클릭하지 않았다면, 이 input 엘리먼트에 포커스가 되어 있어야 합니다. 또한, `Rerun` 버튼을 클릭하면 input 엘리먼트에 포커스가 됩니다.<br>이제 이 작업을 수행하는 디렉티브를 작성하겠습니다.

지금 이를 수행하는 지시문을 작성해 보겠습니다:

```js
const app = Vue.createApp({})
// 전역 사용자 정의 directive v-focus 등록
app.directive('focus', {
  // 바인딩 된 엘리먼트가 DOM에 마운트 될때
  mounted(el) {
    // 엘리먼트에 포커스를 줍니다.
    el.focus()
  }
})
```

디렉티브를 로컬에서 사용하려면 컴포넌트는 `directives` 속성을 사용하면 됩니다.

```js
directives: {
  focus: {
    // directive 정의
    mounted(el) {
      el.focus()
    }
  }
}
```

그런 다은 템플릿에서, 다음과 같이 모든 요소에서 새로운 `v-focus` 속성을 사용할 수 있습니다.

```html
<input v-focus>
```

## 훅 함수

디렉티브 정의 객체는 여러가지 훅 함수를 제공합니다.(모두 선택사항입니다.)

- `beforeMount`: 디렉티브가 처음 엘리먼트에 바인딩 되고 부모 컴포넌트가 마운트되기전에 호출합니다. 이곳에서 한번 실행되는 초기 세팅을 할 수 있습니다.

- `mounted`: 바인딩된 요소의 부모 컴포넌트가 마운트될때 호출됩니다.

- `beforeUpdate`: 포함된 컴포넌트의 VNode가 갱신되기 전에 호출이 됩니다.

:::tip 
렌더링 함수(render fucntions)을 설명 할 때 [나중에](render-function.html#the-virtual-dom-tree) VNode에 대해 자세히 설명합니다.
:::

- `updated`: 포함된 컴포넌트의 VNode 그리고 **컴포넌트의 자식들의 VNodes들**이 업데이트 되고 난뒤에 호출됩니다.

- `beforeUnmount`: 바인딩된 요소의 부모 컴포넌트가 언마운티드되기 전에 호출됩니다.

- `unmounted`: 요소로부터 디렉티브가 언바인드 될때 그리고 부모 컴포넌트가 언마운트될때, 한번 호출됩니다.

[Custom Directive API](../api/application-api.html#directive)에서 이러한 훅들(i.e. `el`, `binding`, `vnode`, 그리고 `prevVnode`)에 전달된 인자들을 확인할 수 있습니다.

### 동적 디렉티브 전달인자들

디렉티브 전달인자들은 동적일 수 있습니다. 예를 들면, `v-mydirective:[argument]="value"`에서 `argument` 컴포넌트 인스턴스에 있는 데이터 프로퍼티 기반으로 업데이트 될 수 있습니다. 따라서 커스텀 디렉티브는 애플리케이션 전체에 걸쳐 유연하게 사용할 수 있습니다.

페이지에서 고정된 포지셔닝(fixed positioning)을 통해 엘리먼트를 고정시키는 커스텀 디렉티브를 만든다고 가정해봅시다. 다음과 같이 수직 위치 픽셀값을 업데이트하는 커스텀 디렉티브를 만들 수 있습니다.

```vue-html
<div id="dynamic-arguments-example" class="demo">
  <p>Scroll down the page</p>
  <p v-pin="200">Stick me 200px from the top of the page</p>
</div>
```

```js
const app = Vue.createApp({})

app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    // bindig.value는 디렉티브에게 전달한 값입니다.. 이 경우에는 200입니다.
    el.style.top = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
```

페이지의 상단으로부터 200px 떨어진 곳에 엘리먼트가 고정됩니다. 만약 우리가 상단이 아닌 좌측으로부터 떨어진 곳에 엘리먼트를 고정시키고 싶으면 어떻게 될까요? 동적 전달인자는 컴포넌트 인스터스 당 편리하게 업데이트 될 수 있습니다.

```vue-html
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:>I am pinned onto the page at 200px to the left.</p>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      direction: 'right'
    }
  }
})

app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    // binding.arg는 디렉티브에 전달되는 인자입니다.
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
```

결과:

<common-codepen-snippet title="Custom directives: dynamic arguments" slug="YzXgGmv" :preview="false" />

이제 커스텀 디렉티브는 몇 가지 다른 사용 사례를 지원할 수 있을 정도로 유연합니다. 조금 더 동적으로 만들려면, 바운드 값을 수정하는 것을 허락할 수 있습니다. 추가로 `pinPadding` 프로퍼티를 만들고 `<input type="range">`에 바인딩을 합니다.

```vue-html{4}
<div id="dynamicexample">
  <h2>Scroll down the page</h2>
  <input type="range" min="0" max="500" v-model="pinPadding">
  <p v-pin:[direction]="pinPadding">Stick me {{ pinPadding + 'px' }} from the {{ direction }} of the page</p>
</div>
```

```js{5}
const app = Vue.createApp({
  data() {
    return {
      direction: 'right',
      pinPadding: 200
    }
  }
})
```

이제 컴포넌트 업데이트시 고정 할 거리를 재 계산하는 디렉티브 로직을 확장해봅시다.

```js{7-10}
app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  },
  updated(el, binding) {
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})
```

결과:

<common-codepen-snippet title="Custom directives: dynamic arguments + dynamic binding" slug="rNOaZpj" :preview="false" />

## 함수 약어

위에 예제에서 `mounted`와 `updated` 두개의 훅에서 같은 동작을 하며, 다른 훅은 필요하지 않을때도 있습니다. 이럴때는 단순히 콜백을 디렉티브에 전달하여 해결 할 수 있습니다.

```js
app.directive('pin', (el, binding) => {
  el.style.position = 'fixed'
  const s = binding.arg || 'top'
  el.style[s] = binding.value + 'px'
})
```

## 객체 리터럴

디렉티브에 여러 값이 필요한 경우, JavaScript 객체 리터럴을 전달할 수도 있습니다. 디렉티브는 유효한 JavaScript 표현식을 사용할 수 있습니다.

```vue-html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

## 컴포넌트 사용

컴포넌트에서 사용되는 경우, 커스텀 디렉티브는 [non-prop 속성](component-attrs.html)과 유사하게 항상 컴포넌트의 루트 노드에 적용됩니다.

```vue-html
<my-component v-demo="test"></my-component>
```

```js
app.component('my-component', {
  template: `
    <div> // v-demo 디렉티브가 여기에 적용됩니다
      <span>My component content</span>
    </div>
  `
})
```

속성과 달리, 디렉티브는 `v-bind="$attrs"`를 사용하여 다른 엘리먼트에 전달할 수 없습니다.

[fragments](/guide/migration/fragments.html#overview) 지원을 통해, 컴포넌트는 잠재적으로 둘 이상의 루트 노드를 가질 수 있습니다. 다중 루트 컴포넌트에 적용되면 디렉티브가 무시되고 경고가 발생합니다.
