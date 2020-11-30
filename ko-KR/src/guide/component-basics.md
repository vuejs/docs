# 컴포넌트 기초

## 기본 예제

뷰 컴포넌트 예제를 살펴봅시다:

```js
// Vue 애플리케이션 생성
const app = Vue.createApp({})

// button-counter라는 새로운 전역 컴포넌트 정의
app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button>
      You clicked me {{ count }} times.
    </button>`
})
```

::: info 여기에서는 간단한 예제를 보여드리지만, 일반적인 Vue 애플리케이션은 문자열 템플릿 대신 단일 파일 컴포넌트를 사용하고 있습니다. 단일 파일 컴포넌트에 대한 자세한 내용은 [이 섹션](single-file-component.html)에서 확인할 수 있습니다. :::

컴포넌트는 이름이 있는 재사용 가능한 인스턴스입니다(이 경우에서는 `<button-counter>`). 이 컴포넌트를 루트 인스턴스 안에서 커스텀 엘리먼트처럼 사용할 수 있습니다:

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
app.mount('#components-demo')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="abORVEJ" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/abORVEJ">   Component basics</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

컴포넌트는 재사용 가능한 인스턴스이므로, `data`, `computed`, `watch`, `methods`와 라이프사이클 훅과 같은 루트 인스턴스와 같은 옵션을 허용합니다. 유일한 예외는 `el`과 같은 몇 가지 루트만의 옵션(root-specific options)입니다.

## 컴포넌트 재사용

컴포넌트는 얼마든지 반복해서 재사용할수 있습니다:

```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="rNVqYvM" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: reusing components">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/rNVqYvM">   Component basics: reusing components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

버튼을 클릭할 때 각 버튼은 별도의 `count`를 유지합니다. 컴포넌트를 사용할 때 마다 새로운 **인스턴스**가 만들어지기 때문입니다.

## 컴포넌트 구성하기

애플리케이션이 중첩된 컴포넌트 트리로 구성되는 것은 일반적입니다.

![Component Tree](/images/components.png)

예를 들어 헤더, 사이드바, 컨텐츠 영역에 대한 컴포넌트가 있을 수 있으며, 각각 일반적으로 네비게이션 링크, 블로그 글 등에 대한 다른 컴포넌트를 포함합니다.

템플릿에서 이러한 컴포넌트를 사용하려면, Vue가 해당 컴포넌트에 대해 알 수 있도록 등록해야 합니다. 컴포넌트 등록에는 **전역(global) 등록** 과 **지역(local) 등록**의 2가지 유형이 있습니다. 지금까지 생성된 앱의   `component` 메소드를 사용해서 컴포넌트를 전역으로만 등록했습니다.

```js
const app = Vue.createApp({})

app.component('my-component-name', {
  // ... 옵션들 ...
})
```

전역적으로 등록된 컴포넌트는 나중에 생성된 `app` 인스턴스의 템플릿에서 사용할 수 있으며, 해당 루트 인스턴스의 컴포넌트 트리의 모든 하위 컴포넌트에서도 사용할 수 있습니다.

지금은 등록에 대해 알아야할 모든 것이지만, 이 페이지를 읽고 내용에 익숙해지면 나중에 다시 돌아와 [Component Registration](component-registration.md)에 대한 전체 가이드를 읽어보는 것이 좋습니다.

## Props를 이용해 자식 컴포넌트에게 데이터 전달하기

앞서서 블로그 포스팅을 위한 컴포넌트 생성에 대해 언급했습니다. 문제는 화면에 보여줄 특정 게시문의 제목, 내용과 같은 데이터를 전달할 수 없으면, 해당 컴포넌트가 유용하지 않다는 것입니다. 이렇게 컴포넌트에 데이터를 넘기기 위해 props가 등장합니다.

Props는 컴포넌트에 등록할 수 있는 커스텀 속성입니다. 값이 prop 속성에 전달되면, 그 값은 해당 컴포넌트 인스턴스의 속성이 됩니다. blog-post 컴포넌트에 제목을 전달하기 위해 `props`옵션을 사용하여 이 컴포넌트가 허용하는 prop목록에 제목을 포함할 수 있습니다.

```js
const app = Vue.createApp({})

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-post-demo')
```

컴포넌트는 원하는 만큼 props를 가질 수 있으며 기본적으로는 어떤 종류의 값이라도 넘길 수 있습니다. `data` 속성과 마찬가지로 컴포넌트 인스턴스에서 prop 값에 접근할 수 있음을 할 수 있습니다.

일단 prop이 등록되면 다음과 같이 커스텀 속성으로 데이터를 전달할 수 있습니다:

```html
<div id="blog-post-demo" class="demo">
  <blog-post title="My journey with Vue"></blog-post>
  <blog-post title="Blogging with Vue"></blog-post>
  <blog-post title="Why Vue is so fun"></blog-post>
</div>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="PoqyOaX" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: passing props">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/PoqyOaX">   Component basics: passing props</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

그러나 일반적인 앱에서는 `data`에 posts 배열이 있을 수 있습니다.

```js
const App = {
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  }
}

const app = Vue.createApp(App)

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-posts-demo')
```

그런다음 각 컴포넌트를 렌더링하려고 합니다.

```html
<div id="blog-posts-demo">
  <blog-post
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
  ></blog-post>
</div>
```

위에서 `v-bind`를 사용해서 props를 동적으로 전달할 수 있음을 알 수 있습니다. 이는 미리 렌더링할 정확한 컨텐츠를 모르는 경우 특히 유용합니다.

지금까지 prop에 대해 알아야할 모든 것입니다. 하지만 이 페이지를 읽고 내용이 익숙해지만 나중에 다시 돌아와 [Props](component-props.html)에 대한 전체 가이드를 읽어보는 것이 좋습니다.

## 하위 컴포넌트 이벤트 수신

`<blog-post>` 컴포넌트를 개발할 때, 일부 기능은 상위와 다시 통신해야 할 수 있습니다. 예를 들어, 블로그 게시물의 텍스트를 확대하고 나머지 페이지는 기본 크기로 유지하는 접근성 기능을 포함할 수 있습니다.

상위 컴포넌트의 data 속성에 `postFontSize`를 추가하여 이 기능을 지원할 수 있습니다:

```js
const App = {
  data() {
    return {
      posts: [
        /* ... */
      ],
      postFontSize: 1
    }
  }
}
```

이 속성은 모든 블로그 포스트의 폰트 크기를 제어하기 위해 템플릿에서 사용할 수 있습니다:

```html
<div id="blog-posts-events-demo">
  <div v-bind:style="{ fontSize: postFontSize + 'em' }">
    <blog-post v-for="post in posts" :key="post.id" :title="title"></blog-post>
  </div>
</div>
```

이제 모든 포스트의 내용의 글자를 키우는 버튼을 추가해봅시다:

```js
app.component('blog-post', {
  props: ['title'],
  template: `
    <div class="blog-post">
      <h4>{{ title }}</h4>
      <button>
        Enlarge text
      </button>
    </div>
  `
})
```

문제는 이 버튼이 아무런 일울 하지 못한다는 거죠:

```html
<button>
  Enlarge text
</button>
```

버튼을 클릭할 때 부모 컴포넌트와 통신하여 모든 글자의 크기를 키워야 합니다. 다행히 컴포넌트 인스턴스는 이 문제를 해결하기위한 커스텀 이벤트 시스템을 제공합니다. 부모 컴포넌트는 기본 DOM 이벤트의 경우와 마찬가지로 `v-on` 또는 `@`을 사용하여 하위 컴포넌트 인스턴스의 모든 이벤트를 수신하도록 선택할 수 있습니다.

```html
<blog-post ... @enlarge-text="postFontSize += 0.1"></blog-post>
```

이렇게 하면 자식 컴포넌트는 내장된 [**`$emit`** 메소드](../api/instance-methods.html#emit)에 이벤트 이름을 넘겨서 이벤트를 발송할수 있습니다:

```html
<button @click="$emit('enlarge-text')">
  Enlarge text
</button>
```

`@enlarge-text="postFontSize += 0.1"` 리스너 덕분에, 부모는 이벤트를 받아 `postFontSize`의 값을 업데이트합니다.

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="KKpGyrp" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: emitting events">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/KKpGyrp">   Component basics: emitting events</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

컴포넌트의 `emits`옵션에서 생성된 이벤트를 나열할 수 있습니다.

```js
app.component('blog-post', {
  props: ['title'],
  emits: ['enlarge-text']
})
```

이렇게하면 컴포넌트에서 생성된 모든 이벤트를 확인하고, 선택적으로 그들을 [검증(validate)](component-custom-events.html#validate-emitted-events)할 수 있습니다

### 이벤트와 함께 값 emit하기

이벤트와 함께 특정 값을 emit하는 것이 유용할 때도 있습니다. 예를 들어, `<blog-post>` 컴포넌트가 글자 크기를 얼마나 확대할지를 담당하도록 할 수 있습니다. 이 경우 `$emit`의 두번째 파라미터를 사용하여, 이 값을 제공할 수 있습니다.

```html
<button @click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

그런 다음 부모의 이벤트를 수신할 때, `$event`를 사용하여 emit한 이벤트의 값에 접근할 수 있습니다:

```html
<blog-post ... @enlarge-text="postFontSize += $event"></blog-post>
```

또는 이벤트 핸들러가 메소드인 경우:

```html
<blog-post ... @enlarge-text="onEnlargeText"></blog-post>
```

그런다음 값이 해당 메소드의 첫 번째 파라미터로 전달됩니다:

```js
methods: {
  onEnlargeText(enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### 컴포넌트에서 `v-model` 사용하기

커스텀 이벤트를 사용하여, `v-model`과 함께 작동되는 커스텀 입력(input)을 만들 수도 있습니다. 다음을 기억하십시오:

```html
<input v-model="searchText" />
```

위 코드는 다음 코드와 동일한 코드 입니다:

```html
<input :value="searchText" @input="searchText = $event.target.value" />
```

컴포넌트에서 사용되는 경우 `v-model` 대신에 다음과 같이 수행할 수 있습니다:

```html
<custom-input
  :model-value="searchText"
  @update:model-value="searchText = $event"
></custom-input>
```

::: warning in-DOM 템플릿으로 작업하고 있기 때문에, 여기서는 kebab-case와 함께 `model-value`를 사용했습니다. [DOM Template Parsing Caveats](#dom-template-parsing-caveats) 섹션에서 kebab-case와 camelCase 속성에 대한 자세한 설명을 볼 수 있습니다. :::

v-model이 실제로 작동하려면 컴포넌트 내의 `<input>`이 반드시 다음 규칙을 따라야 합니다:

- `value`라는 속성을 `modelValue` prop에 바인딩합니다.
- `input`에서 새로운 값과 `update:modelValue`이벤트를 emit해야 합니다.

다음과 같이 되어야 합니다:

```js
app.component('custom-input', {
  props: ['modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `
})
```

이제 `v-model`는 컴포넌트에서 완벽히 동작합니다.

```html
<custom-input v-model="searchText"></custom-input>
```

커스텀 컴포넌트에서 `v-model` 기능을 만드는 또 다른 방법은 `computed` 속성의 기능을 사용하여 getter와 setter를 정의하는 것입니다

다음 예제에서는 computed 속성을 사용하여 `custom-input` 컴포넌트를 리팩토링합니다.

`get` 메소드는 `modelValue` 속성 또는 바인딩에 사용 중인 속성을 반환해야 합니다. `set` 메소드는 해당 속성에 해당하는 `$emit`를 호출해야 합니다.

```js
app.component('custom-input', {
  props: ['modelValue'],
  template: `
    <input v-model="value">
  `,
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) { this.$emit('update:modelValue', value)
      }
    }
  }
})
```

지금은 커스텀 엘리먼트 이벤트에 대해 알아야할 모든 것입니다. 하지만 이 페이지를 읽고 컨텐츠에 익숙해지면 나중에 다시 돌아와 [Custom Events](component-custom-events.md)에 대한 전체 가이드를 읽어보는 것이 좋습니다.

## 슬롯(Slot)을 이용한 컨텐츠 제공

HTML 엘리먼트와 마찬가지로 다음과 같이 컨텐츠를 컴포넌트에 전달할 수 있으면 유용합니다.

```html
<alert-box>
  Something bad happened.
</alert-box>
```

다음처럼 렌더링 될겁니다:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="jOPeaob" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: slots">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/jOPeaob">   Component basics: slots</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

다행히 이 작업은 Vue의 커스텀 `<slot>` 엘리먼트로 매우 간단하게 만들 수 있습니다.

```js
app.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

위에서 볼 수 있듯이 원하는 위치에 slot을 추가하기만 하면 됩니다. 끝났습니다!

지금은 slot에 대해 알아야 할 모든 것이지만, 이 페이지를 다 읽고 내용에 익숙해지면 다시 돌아와 [Slots](component-slots.md)에 대한 전체 가이드를 읽어보는 것이 좋습니다.

## 동적 컴포넌트

때로는 탭 인터페이스에서와 같이 컴포넌트 간의 동적으로 전환하는 것이 유용합니다:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="oNXaoKy" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: dynamic components">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/oNXaoKy">   Component basics: dynamic components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

위는 Vue의 `is`라는 특별한 속성을 가진 `<component>` 엘리먼트에 의해 만들 수 있습니다.

```html
<!-- currentTabComponent가 변하면 컴포넌트가 바뀝니다.  -->
<component :is="currentTabComponent"></component>
```

위 예제에서 `currentTabComponent`는 다음 중 하나를 포함할 수 있습니다:

- 이미 등록된 컴포넌트의 이름
- 컴포넌트의 옵션 객체

전체 코드를 실험하려면 [이 샌드박스](https://codepen.io/team/Vue/pen/oNXaoKy)를 참조하고, 등록된 컴포넌트명 대신에 컴포넌트의 옵션 객체에 바인딩하는 예제는 [이 버전](https://codepen.io/team/Vue/pen/oNXapXM)을 참조하세요.

이 속성은 일반 HTML 엘리먼트와 함께 사용할 수 있지만, 컴포넌트로 취급되므로 모든 속성이 **DOM 속성으로 바인딩됩니다**. <code>value</code>와 같이 일부 속성이 예상대로 작동하려면 [`.prop` 수식어](../api/directives.html#v-bind)를 사용하여 바인딩해야 합니다.

지금은 동적 컴포넌트에 대해 알아야할 전부입니다. 하지만 이 페이지를 읽고 내용이 익숙해지면 나중에 다시 돌아와 [Dynamic & Async Components](./component-dynamic-async.html)에 대한 전체 가이드를 읽어 보는 것이 좋습니다.

## DOM 템플릿 파싱 주의사항

`<ul>`, `<ol>`, `<table>` 및 `<select>`와 같은 일부 HTML 엘리먼트에는 내부에 표시할 수 있는 엘리먼트에 대한 제한 사항과 `<li>`, `<tr>`, `<option>`과 같은 일부 엘리먼트만 표시될 수 있습니다. 이러한 제한이 있는 엘리먼트가 있는 컴포넌트를 사용할 때 문제가 발생합니다. 예를 들면:

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

커스텀 컴포넌트 `<blog-post-row>`가 잘못된 컨텐츠로 표시되어 최종 렌더링된 출력에서 오류가 발생합니다. 다행히 `v-is` 특수 디렉티브를 사용하여 문제를 해결할 수 있습니다:

```html
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

:::warning `v-is` 값은 자바스크립트 문자열 리터럴이어야 합니다:

```html
<!-- 잘못됨. 아무것도 렌더링 되지 않음 -->
<tr v-is="blog-post-row"></tr>

<!-- 올바름-->
<tr v-is="'blog-post-row'"></tr>
```

::: 또한, HTML 속성명은 대소문자를 구분하지 않으므로, 브라우저는 모든 대문자를 소문자로 해석합니다. 즉, DOM내 템플릿을 사용할 때 camelCase된 prop명과 이벤트 핸들러 파라미터는 kebab-case(하이픈으로 구분)된 해당 항목을 사용해야 합니다:

```js
// 자바스크립트 내 camelCase

app.component('blog-post', {
  props: ['postTitle'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
})
```

```html
<!-- HTML 내 kebab-case -->

<blog-post post-title="hello!"></blog-post>
```

**다음 중 하나의 문자열 템플릿을 사용하는 경우 이러한 제한이 적용*되지 않는다***는 점에 유의해야 합니다:

- 문자열 템플릿 (예: `template: '...'`)
- [싱글 파일(`.vue`) 컴포넌트](single-file-component.html)
- `<script type="text/x-template">` 지금까지 DOM 템플릿 파싱 경고에 대해 알아야 할 모든 것입니다. 실제로 Vue의 *Essentials*의 끝입니다. 축하합니다! 아직 배울 것이 더 많지만 먼저 Vue를 직접 이용하고 재미있는 것을 구축하기 위해 휴식을 취하는 것이 좋습니다. 방금 소화한 지식에 익숙해지면 다시 돌아와서 [Dynamic & Async Components](component-dynamic-async.html)에 대한 전체 가이드와 사이드 바의 컴포넌트 심층 섹션에 있는 다른 페이지를 읽어보는 것이 좋습니다.
