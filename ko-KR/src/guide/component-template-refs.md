# 템플릿 refs

> 이 페이지는 여러분이 이미 [컴포넌트 기초](component-basics.md)를 읽었다고 가정하고 쓴 내용입니다. 컴포넌트가 처음이라면 기초 문서를 먼저 읽으시기 바랍니다.

비록 props와 이벤트가 존재하지만, 가끔은 자식 요소에 JavaScript를 이용해 직접 접근해야 하는 경우가 있습니다. 이 경우, `ref` 속성을 이용해 레퍼런스 ID를 자식 컴포넌트나 HTML 요소에 부여함으로써 직접 접근할 수 있습니다. 예를 들어:

```html
<input ref="input" />
```

이는 컴포넌트가 마운트 되었을 때 프로그래밍적으로 input에 focus 하고자 하는 경우 등에 유용할 수 있습니다:

```js
const app = Vue.createApp({})

app.component('base-input', {
  template: `
    <input ref="input" />
  `,
  methods: {
    focusInput() {
      this.$refs.input.focus()
    }
  },
  mounted() {
    this.focusInput()
  }
})
```

혹은, 다른 `ref`를 컴포넌트 자체에 선언하고 부모 요소로부터 `focusInput` 이벤트를 받기 위해 사용할 수도 있습니다:

```html
<base-input ref="usernameInput"></base-input>
```

```js
this.$refs.usernameInput.focusInput()
```

::: 주의 - `$refs`는 컴포넌트가 렌더링 된 후에 존재하게 됩니다. 해당 속성은 자식 요소에 직접 접근하기 위해서만 사용되어야 합니다. 즉, 템플릿이나 computed 속성에서 `$refs`에 접근해서는 안됩니다. :::

**참고 자료**: [Using template refs in Composition API](/guide/composition-api-template-refs.html#template-refs)
