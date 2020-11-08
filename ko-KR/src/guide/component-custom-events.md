# 커스텀 이벤트

> 이 페이지는 여러분이 이미 [컴포넌트 기초](component-basics.md)를 읽었다고 가정하고 쓴 내용입니다. 컴포넌트가 처음이라면 기초 문서를 먼저 읽으시기 바랍니다.

## 이벤트 이름

컴포넌트 및 props와는 달리, 이벤트는 자동 대소문자 변환을 제공하지 않습니다. emit할 이벤트의 이름은 자동 대소문자 변환을 사용하는 것 대신 정확한 이름을 사용하여야 합니다. 예를 들어, 아래와 같이 camelCase로 작성된 이벤트를 emit하는 경우:

```js
this.$emit('myEvent')
```

아래와 같이 kebab-case로 이벤트를 청취하는 경우 아무런 일도 일어나지 않습니다:

```html
<!-- 작동안함 -->
<my-component @my-event="doSomething"></my-component>
```

컴포넌트 및 props와는 다르게 이벤트 이름은 자바스크립트 변수나 속성의 이름으로 사용되는 경우가 없으며, 따라서 camelCase나 PascalCase를 사용할 필요가 없습니다. 또한, (HTML이 대소문자를 구분하지 않는 특성 때문에) DOM 템플릿의  `v-on` 이벤트리스너는 항상 자동으로 소문자 변환되기 때문에 `@myEvent` 는 자동으로 `@myevent`로 변환됩니다. -- 즉, `myEvent`  이벤트를 들을 수 없습니다.

이러한 이유 때문에, 이벤트 이름에는 **&nbsp;항상 kebab-case를 사용하는것**이 권장됩니다.

## 커스텀 이벤트 정의하기

Vue School에서 사용자 지정 이벤트 정의에 대한 무료 비디오보기

Emit된 이벤트는 컴포넌트 상에서 `emits` 옵션을 통해 정의될 수 있습니다.

```js
app.component('custom-form', {
  emits: ['in-focus', 'submit']
})
```

만약 `emits` 옵션을 이용해 네이티브 이벤트(e.g., `click`)가 재정의 된 경우, 컴포넌트에 정의된 커스텀 이벤트가 네이티브 이벤트를 덮어씁니다.

::: 팁 컴포넌트가 어떻게 동작하는지를 좀더 잘 문서화하기 위해, 발생하는 모든 이벤트를 정의하는 것이 권장됩니다. :::

### Emit 된 이벤트 검사하기

prop 타입 검사와 비슷하게, emit된 이벤트 또한 배열 형식 대신 오브젝트 형식으로 선언함으로써 검사를 추가할 수 있습니다.

검사를 추가하기 위해서는 `$emit`의 전달인자를 받아 이벤트가 유효한지를 검증하여 boolean을 반환하는 함수를 이벤트에 할당합니다.

```js
app.component('custom-form', {
  emits: {
    // 검사 절차 없음
    click: null,

    // submit 이벤트 검사
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('잘못된 이벤트 페이로드입니다!')
        return false
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', { email, password })
    }
  }
})
```

## `v-model` 인자

기본적으로 컴포넌트 상의 `v-model`는 `modelValue`를 props처럼, `update:modelValue`를 이벤트처럼 사용합니다.<br>이 때, `v-model`에 전달인자를 넘겨줌으로써 이 이름(modalValue)을 변경할 수 있습니다:

```html
<my-component v-model:foo="bar"></my-component>
```

이 경우, 자식 컴포넌트는 `foo`를 prop으로, 동기화 이벤트에 대해서는 `update:foo`를 emit하도록 상정합니다:

```js
const app = Vue.createApp({})

app.component('my-component', {
  props: {
    foo: String
  },
  template: `
    <input
      type="text"
      :value="foo"
      @input="$emit('update:foo', $event.target.value)">
  `
})
```

```html
<my-component v-model:foo="bar"></my-component>
```

## 다중 `v-model` 바인딩

[`v-model` arguments](#v-model-arguments) 단락에서 다루었던 개별 prop과 이벤트를 타겟하는 능력을 극대화하기 위해, 단일 컴포넌트 인스턴스에 대해 다중 v-model 바인딩을 만들 수 있습니다.

각 v-model은 추가 컴포넌트 옵션 없이도 다른 prop을 동기화합니다:

```html
<user-name
  v-model:first-name="firstName"
  v-model:last-name="lastName"
></user-name>
```

```js
const app = Vue.createApp({})

app.component('user-name', {
  props: {
    firstName: String,
    lastName: String
  },
  template: `
    <input
      type="text"
      :value="firstName"
      @input="$emit('update:firstName', $event.target.value)">

    <input
      type="text"
      :value="lastName"
      @input="$emit('update:lastName', $event.target.value)">
  `
})
```

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="GRoPPrM" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Multiple v-models">   <span>아래 Pen을 참고하세요. <a href="https://codepen.io/team/Vue/pen/GRoPPrM">   Multiple v-models</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

## `v-model` 수식어 핸들링

폼 인풋 바인딩에서 보았던 것 처럼, `v-model`은<br>`.trim`, `.number`, `.lazy` 등의 [빌트인 수식어](/guide/forms.html#modifiers) 를 가지고 있습니다. 상황에 따라서 이러한 커스텀 수식어를 만들어 추가하는 것이 가능합니다.

예제로써, `v-model` 바인딩을 통해 전달된 문자열의 첫 글자를 대문자로 바꾸는 `capitalize`, 수식어를 만들어 봅시다.

컴포넌트의 `v-model`에 추가된 수식어는 `modelModifiers` prop을 통해 컴포넌트에 전달됩니다. 아래 예제에서는 빈 오브젝트를 기본값으로 설정하는 `modelModifiers` prop을 갖는 컴포넌트를 만들었습니다.

컴포넌트의 `created` 라이프사이클 훅이 호출되었을 때 --`v-model` 바인딩이 `v-model.capitalize="bar"`와 같이 선언되었기 때문에 -- `modelModifiers` prop이 `capitalize`를 포함하며 그 값이 `true`라는 것을 알아두세요.

```html
<my-component v-model.capitalize="bar"></my-component>
```

```js
app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  template: `
    <input type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
  `,
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
})
```

이제 우리의 prop이 셋업되었으며, `modelModifiers` 오브젝트의 키를 확인하고 emit된 값을 변경하기 위한 핸들러를 작성할 수 있습니다. 아래 예제는 `<input />` 엘리먼트가 `input` 이벤트를 발생시켰을 때 문자열을 대문자로 바꿉니다.

```html
<div id="app">
  <my-component v-model.capitalize="myText"></my-component>
  {{ myText }}
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      myText: ''
    }
  }
})

app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  },
  template: `<input
    type="text"
    :value="modelValue"
    @input="emitValue">`
})

app.mount('#app')
```

`v-model`에 전달인자를 바인딩하기 위해서, prop의 이름을 `arg + "Modifiers"` 형태로 작성하여야 합니다:

```html
<my-component v-model:foo.capitalize="bar"></my-component>
```

```js
app.component('my-component', {
  props: ['foo', 'fooModifiers'],
  template: `
    <input type="text"
      :value="foo"
      @input="$emit('update:foo', $event.target.value)">
  `,
  created() {
    console.log(this.fooModifiers) // { capitalize: true }
  }
})
```
