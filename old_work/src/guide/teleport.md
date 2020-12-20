# Teleport

<div class="vueschool"><a href="https://vueschool.io/lessons/vue-3-teleport?friend=vuejs" target="_blank" rel="sponsored noopener" title="Learn how to use teleport with Vue School">Vue School에서 무료로 teleport 사용법을 배워보세요.</a></div>

Vue는 UI 및 관련 동작을 컴포넌트로 캡슐화하여 UI를 구축하도록 권장합니다. 우리는 애플리케이션 UI 구성 트리를 만들기 위해 컴포넌트를 서로 중첩할 수 있습니다.

그러나, 논리적으로 컴포넌트에 속하는 템플릿의 일부라도 기술적인 관점에서 보면 Vue 앱 범위를 벗어나 DOM의 다른 곳으로 템플릿의 일부를 옮기는 게 더 바람직할 때도 있습니다.

이에 대한 일반적인 사례는 전체 화면 모달이 포함된 컴포넌트를 만드는 것입니다. 대부분의 경우 컴포넌트 내에 모달 로직이 존재하기를 원하지만, 모달의 신속한 위치 조정에 있어 CSS를 통한 해결이 어려워지거나 컴포넌트 구조를 변경해야 합니다.

다음 HTML 구조를 생각해 봅시다.

```html
<body>
  <div style="position: relative;">
    <h3>Tooltips with Vue 3 Teleport</h3>
    <div>
      <modal-button></modal-button>
    </div>
  </div>
</body>
```

`modal-button`을 살펴보겠습니다.

<code>modal-button</code> 컴포넌트는 모달 열기 기능을 작동시키는 `button` 엘리먼트와 `.modal` 클래스의 `div` 엘리먼트를 갖게 될 것입니다. `div` 엘리먼트는 모달 컨텐츠와 모달 닫기 버튼을 포함합니다.

```js
const app = Vue.createApp({});

app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
        Open full screen modal!
    </button>

    <div v-if="modalOpen" class="modal">
      <div>
        I'm a modal!
        <button @click="modalOpen = false">
          Close
        </button>
      </div>
    </div>
  `,
  data() {
    return {
      modalOpen: false
    }
  }
})
```

초기 HTML 구조에서 이 컴포넌트를 사용하면 모달이 깊게 중첩된 `div` 내부에 렌더링 되고, 모달의 `position: absolute` 속성은 상대적으로 배치된 부모 `div`를 기준으로 동작하는 문제를 볼 수 있습니다.

Teleport는 전역 상태에 의존하거나 <code>modal-button</code>을 두 개의 컴포넌트로 분리하지 않고도 DOM에서 HTML 조각을 렌더링할 부모 엘리먼트를 제어할 수 있는 깔끔한 방법을 제공합니다.

`modal-button`을 `<teleport>`를 사용하도록 수정하고 Vue에게 "이 HTML을 "**body**" 태그로 **teleport** 해라."라고 전합니다.

```js
app.component('modal-button', {
  template: `
    <button true>
        Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal!
          (My parent is "body")
          <button false>
            Close
          </button>
        </div>
      </div>
    </teleport>
  `,
  data() {
    return {
      modalOpen: false
    }
  }
})
```

결과적으로, 모달을 열기 위해 버튼을 클릭하면 Vue는 `body` 태그의 자식으로 모달 컨텐츠를 올바르게 렌더링할 것입니다.


<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="gOPNvjR" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Vue 3 Teleport">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/gOPNvjR">   Vue 3 Teleport</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p>

## Vue 컴포넌트와 함께 사용

`<teleport>`가 Vue 컴포넌트를 포함하는 경우, 해당 컴포넌트는 `<teleport>` 부모의 논리적 자식 컴포넌트로 유지됩니다.

```js
const app = Vue.createApp({
  template: `
    <h1>Root instance</h1>
    <parent-component />
  `
})

app.component('parent-component', {
  template: `
    <h2>This is a parent component</h2>
    <teleport to="#endofbody">
      <child-component name="John" />
    </teleport>
  `
})

app.component('child-component', {
  props: ['name'],
  template: `
    <div>Hello, {{ name }}</div>
  `
})
```

이처럼 `child-component`가 다른 위치에 렌더링 되더라도 `parent-component`의 자식으로 유지되고 `name` prop을 전달받습니다.

이는 부모 컴포넌트로부터의 주입이 예상대로 동작하며 Vue Devtools에서 자식 컴포넌트가 실제 내부 컨텐츠의 이동 위치 대신 부모 컴포넌트 아래에 중첩될 것임을 의미하기도 합니다.

## 동일한 대상에 다중 Teleport 사용

일반적인 사례는 동시에 여러 인스턴스가 활성화될 수 있는 재사용 가능 `<Modal>` 컴포넌트일 것입니다. 이런 상황에서는 복수의 `<teleport>` 컴포넌트가 각기 다른 내부 컨텐츠를 동일한 엘리먼트에 마운트할 수 있습니다. 순서는 단순히 추가하는 대로 정해집니다. 이후 마운트는 대상 엘리먼트 내 직전 마운트 바로 뒤에 위치할 것입니다.

```html
<teleport to="#modals">
  <div>A</div>
</teleport>
<teleport to="#modals">
  <div>B</div>
</teleport>

<!-- result-->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

[API reference](../api/built-in-components.html#teleport)에서 `<teleport>` 컴포넌트 옵션을 확인할 수 있습니다.
