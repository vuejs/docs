# 컴포넌트 기초

## 기본 예제

뷰 컴포넌트 예제를 살펴봅시다:

```js
// Create a Vue application
const app = Vue.createApp({})

// Define a new global component called button-counter
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

::: info 여기에서는 간단한 예제를 보여줍니다만, 일반적인 Vue 응용 프로그램은 문자열 템플릿 대신 단일 파일 컴포넌트를 사용하고 있습니다. 단일 파일 컴포넌트에 대한  자세한 내용은 [ ](single-file-component.html) 섹션을 참조하십시오. :::

컴포넌트들은 하나의 이름을 가지는 재사용 가능한 인스턴스들입니다.  : 여기에서는  `<button-counter>`입니다.  루트 인스턴스 안에서 엘리먼트처럼  컴포넌트를 사용할수 있습니다:

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
app.mount('#components-demo')
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="js,result" data-user="Vue" data-slug-hash="abORVEJ" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/abORVEJ">   Component basics</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

컴포넌트가 재사용 가능한 인스턴스이기 때문에, 루트 인스턴스와 같은 옵션을 받게 됩니다. `data`, `computed`, `watch`, `methods` 와 라이프사이클 후킹등이죠 . 루트 인스턴스는 지원하지만 컴포넌트에서 지원하지 않는 옵션은 `el`이 대표적입니다.

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

버튼을 클릭하면, 각각 자신만의 독립된 `count` 를 가진다는것을 알수 있습니다. 컴포넌트를 사용할때마다, 새로운 **instance**가 만들어지기 때문이죠.

## 컴포넌트 구성하기

앱을 중첩된 트리 형태로 구성하는것은 흔한 일입니다.

![Component Tree](/images/components.png)

예를들자면, 앱을 헤더, 사이드바, 컨텐츠 영역으로 구분한후에 각 영역이 네비게이션 링크, 블로그 글등 또다른 컴포넌트를 가질것입니다.

이렇게 템플릿 안에서 다른 컴포넌트를 사용하기 위해서는, 해당 컴포넌트를 Vue가 알수 있게 등록해두어야 합니다. 컴포넌트를 등록 하는 방법은 두가지가 있습니다:  **전역(global) 등록** 과 **지역(local) 등록**. 지금까지는 생성된 앱의   `component` 메소드를 사용해서,  컴포넌트를 전역으로 등록했습니다.

```js
const app = Vue.createApp({})

app.component('my-component-name', {
  // ... options ...
})
```

전역적으로 등록된 컴포넌트는 `app` 인스턴스가 생성된 이후에는, 중첩된 하위 컴포넌트들에서도 사용할수 있게 됩니다.

등록에 대해서는 지금은 여기까지만 알아도 됩니다. 이 페이지를 모두 읽고 더 자세한 내용을 알고 싶다면 [컴포넌트 등록](component-registration.md) 을 읽는것을 추천합니다.

## Props를 이용해 자식 컴포넌트에게 데이터 전달하기

앞서서 블로그 포스팅을 위한 컴포넌트를 만드는 것에 대해서 이야기 했었습니다. 문제는 해당 컴포넌트로 특정 포스트의 제목, 본문등 화면에 보여줄 데이터를 넘길수 없다면 그다지 쓸모가 없다는것입니다. 이렇게 컴포넌트에 데이터를 넘기기 위해 props 가 등장합니다.

Props는 컴포넌트에 등록할수 있는 커스텀 속성입니다. 값이 prop 속성으로 넘겨진다면, 그 값은 해당 컴포넌트 인스턴스의 프로퍼티가 됩니다. 우리가 만든 블로그 컴포넌트에 제목을 넘기기 위해, `props` 옵션에 제목(title)을 추가하여 이 해 컴포넌트가 받아서 처리할수 있는 속성목록에 다른 개발자에게  알려줄 수 있습니다.

```js
const app = Vue.createApp({})

app.component('blog-post', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})

app.mount('#blog-post-demo')
```

컴포넌트에 원하는 만큼 props를 지정할수 있고, 기본적으로는 어떤 종류의 값이라도 넘길수 있습니다. 이렇게 넘겨진 값은 컴포넌트 내에서 `data` 를 통해 접근할수 있습니다.

일단 prop이 등록되면 커스텀 속성을 통해 다음처럼 데이터를 넘겨줄수 있습니다:

```html
<div id="blog-post-demo" class="demo">
  <blog-post title="My journey with Vue"></blog-post>
  <blog-post title="Blogging with Vue"></blog-post>
  <blog-post title="Why Vue is so fun"></blog-post>
</div>
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="PoqyOaX" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: passing props">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/PoqyOaX">   Component basics: passing props</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

전형적인 앱에서는 다음과 같이 포스트 배열을 `data`로 넘겨주게 됩니다:

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

이렇게 넘겨진 각각의 데이터에 대해 렌더링 되길 원할겁니다:

```html
<div id="blog-posts-demo">
  <blog-post
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
  ></blog-post>
</div>
```

위에서 보듯,  `v-bind`를 이용해서 동적으로  props을 넘겨 줄수 있습니다.  이건 정확히 어떤 컨텐츠가 렌더링 되어야 하는지 모를때 쓸모 있습니다.

등록에 대해서는 지금은 여기까지만 알아도 됩니다. 이 페이지를 모두 읽고 더 자세한 내용을 알고 싶다면 [컴포넌트 등록](component-props.html) 을 읽는것을 추천합니다.

## 자식 컴포넌트의 이벤트 듣기

이렇게 우리는  `<blog-post>`  컴포넌트를 만들고 있는데,  부모 컴포넌트와 대화 할수 있는 기능이 필요하게 되었습니다. 예를 들면, 블로그 게시물의 텍스트를 확대하고 페이지의 나머지 부분은 디폴트 사이즈의 상태로 유지하기 위하여 접근성 기능을 포함 할 수 있습니다.

이 기능을 지원하기 위해 부모 컴포넌트에 `postFontSize` 데이터 속성을 추가할수 있습니다:

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

이 속성은 템플릿 에서 모든 블로그 포스트의 폰트 크기를 제어하는데 사용할수 있습니다:

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

이 버튼을 눌렀을때, 부모 컴포넌트와 통신하여 모든 글자의 크기를 키워야 합니다. 다행히 컴포넌트 인스턴스는이 문제를 해결하기위한 사용자 정의 이벤트 시스템을 제공합니다. 부모 컴포넌트는  기본 DOM 이벤트의 경우와 마찬가지로 `v-on` 또는 `@`을 사용하여 하위 컴포넌트 인스턴스의 이벤트를 수신하도록 선택할 수 있습니다.

```html
<blog-post ... @enlarge-text="postFontSize += 0.1"></blog-post>
```

이렇게 하면 자식 컴포넌트는 내장된 [**`$emit`** 메소드](../api/instance-methods.html#emit)에 이벤트 이름을 넘겨서 이벤트를 발송할수 있습니다:

```html
<button @click="$emit('enlarge-text')">
  Enlarge text
</button>
```

`@enlarge-text="postFontSize += 0.1"` 리스너 덕분어, 부모는 이벤트를 받아 `postFontSize` 의 값을 갱신합니다.

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="KKpGyrp" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: emitting events">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/KKpGyrp">   Component basics: emitting events</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

컴포넌트의 옵션 `emits` 에 발신할수 있는 이벤트 목록을 나열 할수 있습니다.

```js
app.component('blog-post', {
  props: ['title'],
  emits: ['enlarge-text']
})
```

이렇게하면 컴포넌트가 발행하는 모든 이벤트를 확인하고 선택적으로 그들을 [검증](component-custom-events.html#validate-emitted-events)할 수 있습니다

### 값을 가진 이벤트 발신(emit)하기

이벤트가 값을 가지고 발신되는것이 유용할때가 있습니다. 예를 들자면, 우리가 만든 `$emit` 컴포넌트에서 글자 크기를 얼마만큼 크게 바꿀것인가를 들수 있습니다. 이 경우에 우리는 `$emit`메소드의 두번짹 값으로 값을 넘길수 있습니다.

```html
<button @click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

이렇게 하면 이벤트를 듣는 부모 컴포넌트에서는 `$event`를 이용해 넘겨진 값에 접근할수 있습니다:

```html
<blog-post ... @enlarge-text="postFontSize += $event"></blog-post>
```

또는 이벤트 핸들러가 메소드 일수도 있습니다:

```html
<blog-post ... @enlarge-text="onEnlargeText"></blog-post>
```

메소드의 첫번째 파라메터로 이벤트의 값이 넘어 옵니다:

```js
methods: {
  onEnlargeText(enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### 컴포넌트에서 `v-model` 사용하기

`v-model`을 이용해 커스텀 이벤트를 커스텀 input의 입력값으로 사용하기 위해 사용할수 있습니다. 다음을 기억하시죠:

```html
<input v-model="searchText" />
```

위 코드는 다음 코드와 동일한 코드 입니다:

```html
<input :value="searchText" @input="searchText = $event.target.value" />
```

`v-model`는 컴포넌트에서 조금 다르게 동작합니다:

```html
<custom-input
  :model-value="searchText"
  @update:model-value="searchText = $event"
></custom-input>
```

::: 경고  우리가 `model-value`에서 케밥 케이스(kebab-case)를 사용한 이유는 DOM 템플릿을 사용하고 있어서 입니다. 여기에 대해 더 자세히 알고 싶으시면   [DOM Template Parsing Caveats](#dom-template-parsing-caveats) 섹션을 참고 하시기 바랍니다.  :::

v-model이 정상적으로 동작 하기 위해서는 컴포넌트 내의 `<input>` 은 반드시 다음 규칙을 따라야 합니다:

- `value` 속성(attribute)을 `modelValue` prop에 바인딩 해야 합니다.
- `input`은 값을 가진 `update:modelValue` 이벤트를 발신해야 합니다.

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

커스텀 컴포넌트에 `v-model` 기능을 작성하는 또 다른 방법은 ` 계산 된 (computed)` 속성 기능을 사용하여 getter 및 setter를 정의하는 것입니다

다음 예제에서는 계산 된 속성을 사용하여 `custom-input` 컴포넌트를 리팩토링합니다.

`get` 메소드는 `modelValue` 속성을 반환해야 합니다. 그리고 바인딩에 사용되는 프로퍼티를 위한  `set` 메소드는 해당 프로퍼티에 해당하는  이벤트를 발행하는 `$ emit`를 호출해야 합니다.

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

지금은 커스텀 컴포넌트 이벤트에 대해 알아야 할 것은 이것뿐입니다 만,이 페이지를 읽은후 더 자세한 내용을 알고 싶다면 [Custom Events](component-custom-events.md)를 참고 하시기 바랍니다.

## 슬롯(Slot)을 이용한 컨텐츠 제공

HTML  앨리먼트처럼 컴포넌트에 컨텐츠를 제공할수 있으면 유용할 것입니다.

```html
<alert-box>
  Something bad happened.
</alert-box>
```

다음처럼 렌더링 될겁니다:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="jOPeaob" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: slots">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/jOPeaob">   Component basics: slots</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

다행이, vue에서는 `<slot>` 앨리먼트를 이용해 쉽게 만들수 있습니다:

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

위에서 보듯이, 그저 슬롯을 원하는 곳에 넣는 것만으로 해낼수 있습니다.

현재 슬롯에 ​​대해 알아야 할 것은 이것뿐입니다. 더 자세한 내용을 알고 싶으시면  [Slot{/ a0} 을 참고 하시면 됩니다.](component-slots.md)

## 동적 컴포넌트

탭기반 인터페이스처럼 컴포넌트를 동적으로 전환할수 있으면 유용합니다:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="result" data-user="Vue" data-slug-hash="oNXaoKy" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Component basics: dynamic components">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/oNXaoKy">   Component basics: dynamic components</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

Vue에서 제공하는 `is`  라는 특별한 속성을 이용해 `<component>` 를 전환할수 있습니다.

```html
<!-- currentTabComponent가 변하면 컴포넌트가 바뀝니다.  -->
<component :is="currentTabComponent"></component>
```

위 예제에서  `currentTabComponent` 는 다음을 포함할수 있습니다. :

- 이미 등록된 컴포넌트의 이름 이나
- 컴포넌트의 옵션 객체

여기 [샌드박스](https://codepen.io/team/Vue/pen/oNXaoKy) 를 통해서 전체 코드를 볼수 있습니다. 그리고이  [버전](https://codepen.io/team/Vue/pen/oNXapXM) 에서 이름대신 컴포넌트의 옵션 객체를 통해 바인딩된 예제를 볼수 있습니다.

주의 할것은 이 속성은 일반적인 HTML 엘리먼트에도 사용할수 있다는 것입니다. 이 속성이 사용되면 해당 엘리먼트는 컴포넌트로 취급 받게 되며 컴포넌트의 모든 속성이  **DOM 속성으로 바인딩 된다는 것입니다.** <br>몇몇 프로퍼티를 원하는대로 동작시키려면 [`.prop` 수정자를 사용해 바인딩해야 합니다.  ](../api/directives.html#v-bind).

지금은 커스텀 컴포넌트 이벤트에 대해 알아야 할 것은 이것뿐입니다 만,이 페이지를 읽은후 더 자세한 내용을 알고 싶다면 [Custom Events](./component-dynamic-async.html)를 참고 하시기 바랍니다.

## DOM 템플릿 파싱 규칙

`<ul>`, `<ol>`, `<table>` and `<select>`  같은 몇몇 앨리먼트는 HTML 앨리먼트는 안에 어떤 앨리먼트가 등장할지에 대한 제약을 가집니다. 반대로  `<li>`, `<tr>`, and `<option>` 같은 앨리먼트는 다른 특정 앨리먼트 안에서만 등장할수 있습니다.  <br>이런 제약에 해당하는 컴포넌트를 만들때 문제가 될수 있습니다. <br>예를 들면:

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

`<blog-post-row>` 커스텀 컴포넌트는 html 파싱단계에서 호이스팅되어 렌더링 오류로 나올 것입니다. 다행이도 `v-is`  디렉티브를 이용해 이 문제를 극복할수 있습니다:

```html
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

::주의: `v-is` 의 값은 자바스크립트 문자열 표기여야 합니다:

```html
<!-- 잘못됨. 아무것도 렌더링 되지 않음 -->
<tr v-is="blog-post-row"></tr>

<!-- 올바름-->
<tr v-is="'blog-post-row'"></tr>
```

::: HTML 어트리뷰트는 대소문자 구분이 없기 때문에 브라우저는 대문자를 소문자로 변경하여 읽습니다. 그렇기 때문에 카멜 케이스(대소문자 혼용)로 prop의 이름을 정한 경우에 DOM 템플릿 안에서는 케밥 케이스(하이픈으로-연결된-구조)를 사용하여야 올바르게 동작합니다.

```js
// camelCase in JavaScript

app.component('blog-post', {
  props: ['postTitle'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
})
```

```html
<!-- kebab-case in HTML -->

<blog-post post-title="hello!"></blog-post>
```

**이런 제약은 다음 소스에서 템플릿이 제공될때는 적용되지 *않*습니다. **:

- 문자열 템플릿 (e.g. `template: '...'`)
- [ 싱글파일(`.vue`) 컴포넌트](single-file-component.html)
- `<script type="text/x-template">` <br><br>여기까지가 DOM 템플릿에 대해 알아두어야 할 내용이였습니다. 그리고 Vue  *핵심*의 끝입니다. <br>측하드립니다. 여전히 배울게 많지만 일단 여기에서 잠깐 멈추고 뷰를 이용해서 놀아 보시기 바랍니다. 여기까지 배운내용을 소화 시키고 나면 다시 돌아와서 [동적 & 비동기 컴포넌트](component-dynamic-async.html)이나 사이드바에 나온 다른 내용들을 를 읽어 보세요.
