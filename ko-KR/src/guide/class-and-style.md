# 클래스와 스타일 바인딩

데이터 바인딩은 엘리먼트의 클래스 목록과 인라인 스타일을 조작하기 위해 일반적으로 사용됩니다. 이 두 속성은 `v-bind `를 사용하여 처리할 수 있습니다. 우리는 표현식으로 최종 문자열을 계산하면 됩니다. 그러나 문자열 연결에 간섭하는 것은 짜증나는 일이며 오류가 발생하기 쉽습니다. 이러한 이유로, Vue는 `class`와 `style`에 `v-bind `를 사용할 때 특별히 향상된 기능을 제공합니다. 표현식은 문자열 이외에 객체 또는 배열을 이용할 수 있습니다.

## HTML 클래스 바인딩

### 객체 구문

클래스를 동적으로 전환하기 위해 `v-bind:class` 대신 `:class`을 이용해 객체를 전달할 수 있습니다.

```html
<div :class="{ active: isActive }"></div>
```

위 구문은 `active` 클래스 의 존재 여부 는 `isActive` data 속성 의 [진실성](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) 에 의해 결정됨 을 의미합니다.

넘겨준 객체의 여러 필드들 통해 다수의 클래스들 토글할수 있습니다. 거기에 `:class` 지시자는 HTML 의 `class`  속성과 동시게 사용할수 있습니다. 다음과 같은 형식을 따르게 됩니다:

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

다음 데이터에 따라:

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

이렇게 렌더링 됩니다:

```html
<div class="static active"></div>
```

`isActive` 또는 `hasError` 가 변경되면 그에 따라 클래스 목록이 업데이트됩니다. 예를 들어, `hasError`가  `true`가되면 클래스 목록은 `"static active text-danger"`입니다.

바인딩 된 개체는 인라인 할 필요는 없습니다 :

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

이 같은 결과를 렌더링합니다. 또한 객체를 반환하는  [computed property](computed.md) 에 바인딩 할 수 있습니다. 이것은 일반적으로 강력한 패턴입니다.

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### 배열 구문

배열을 `:class` 에 전달하여 클래스의 목록을 적용 할 수 있습니다.

```html
<div :class="[activeClass, errorClass]"></div>
```

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

다음 처럼 렌더링됩니다:

```html
<div class="active text-danger"></div>
```

목록에있는 클래스도 조건부로 전환하려면 삼항식으로 할 수 있습니다.

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

이것은 항상 `errorClass`을 적용하지만 `isActive`가 true 인 경우에만 `activeClass`을 적용합니다.

그러나 여러 조건부 클래스가 있다면 이것은 약간 중복 될 수 있습니다. 따라서 배열 구문에서 개체 구문을 사용할 수 있습니다:

```html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### 컴포넌트에서 사용하기

> 이 섹션은 [Vue Components](component-basics.md)의 지식이있는 것을 전제로하고 있습니다.  일단 넘어가고 나중에 다시 보셔도 됩니다.

단일 루트 요소와 사용자 정의 구성 요소에 `class` 속성을 사용하면 그 클래스가이 요소에 추가됩니다. 이 요소의 기존 클래스는 덮어 쓰지 않습니다.

예를 들어,이 구성 요소를 선언하면 다음과 같이됩니다:

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `<p class="foo bar">Hi!</p>`
})
```

이걸 이용하면 클래들을 추가할수 있습니다:

```html
<div id="app">
  <my-component class="baz boo"></my-component>
</div>
```

렌더링된 HTML은 다음과 같습니다:

```html
<p class="foo bar baz boo">Hi</p>
```

클래스 바인딩을 이용해도 동일합니다:

```html
<my-component :class="{ active: isActive }"></my-component>
```

 `isActive` 가 참일때, 렌더링된 HTML은 다음과 같습니다:

```html
<p class="foo bar active">Hi</p>
```

컴포넌트에 여러 루트 요소가있는 경우는 어떤 컴포이 클래스를받는 구성 요소를 정의해야합니다. 컴포넌트 속성 `$attrs` 을 이용해 할수 있습니다:

```html
<div id="app">
  <my-component class="baz"></my-component>
</div>
```

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p>
    <span>This is a child component</span>
  `
})
```

컴포넌트 속성 상속에 대해서 더 알고 싶으시면 [Non-Prop Attributes](component-attrs.html) 섹션을 참고 하시면 됩니다.

## 인라인 스타일 바인딩하기

### 객체 구문

`:style` 객체 구문은 매우 간단합니다. JavaScript 객체임을 제외하고 CSS와 거의 같은 것 같습니다. CSS 속성 이름에는 카멜 케이스 또는 케밥 케이스 (케밥 경우에는 인용 부호를 사용)를 사용할 수 있습니다.

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

많은 경우 템플릿이 더 깨끗하게되도록 스타일 개체에 직접 바인딩하는 것이 좋습니다.

```html
<div :style="styleObject"></div>
```

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

이 경우에도 개체 구문은 객체를 반환 계산 된 속성과 함께 사용되는 경우가 많습니다.

### 배열 구문

`:style` 배열 구문을 사용하면 같은 요소에 여러 스타일 개체를 적용 할 수 있습니다.

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### 자동 접두어

`transform`  등 `:style`에서 [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)를 필요로하는 CSS 속성을 사용하면 Vue는 자동으로 적절한 접두사를 검색하고 배포 된 스타일에 추가합니다.

### 다중 값

(접두사가 붙는) 다중  값의 배열을 스타일 속성으로 사용 할 수 있습니다. 예를 들어:

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

이것은 브라우저가 지원하는 배열의 마지막 값 만 렌더링합니다. 이 예에서는 접두사없이 플렉스 박스를 지원하는 브라우저에서는  ` display: flex `을 렌더링합니다.
