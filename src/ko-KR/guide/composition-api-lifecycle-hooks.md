# 라이프사이클 훅

> 이 가이드는 이미 [Composition API Introduction](composition-api-introduction.html)와 [Reactivity Fundamentals](reactivity-fundamentals.html)를 읽었다고 가정합니다. Composition API를 처음 사용하는 경우 먼저 읽어보십시오.

라이프사이클 훅에 접두사 "on"을 추가함으로서 컴포넌트의 라이프사이클 훅에 접근할 수 있습니다.

다음 표에는 [setup()](composition-api-setup.html) 내에 라이프사이클 훅이 호출되는 방법이 포함되어 있습니다:

Options API | `setup` 내부의 훅
--- | ---
`beforeCreate` | 필요하지 않음*
`created` | 필요하지 않음*
`beforeMount` | `onBeforeMount`
`mounted` | `onMounted`
`beforeUpdate` | `onBeforeUpdate`
`updated` | `onUpdated`
`beforeUnmount` | `onBeforeUnmount`
`unmounted` | `onUnmounted`
`errorCaptured` | `onErrorCaptured`
`renderTracked` | `onRenderTracked`
`renderTriggered` | `onRenderTriggered`

:::tip `setup`은 `beforeCreate`, `created` 라이프사이클 훅 사이에 실행되는 시점이므로([역주]beforeCreate()가 setup() 직전에 호출되고 created()가 setup() 직후에 호출되는 타이밍을 가짐), 명시적으로 정의할 필요가 없습니다. 다시말해, 위 두 훅에서 작성되는 모든 코드는 `setup`펑션 내부에 직접 작성해야합니다. :::

이 펑션은 컴포넌트에 의해 훅이 호출될 때, 실행될 콜백을 받습니다:

```js
// MyBook.vue

export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('컴포넌트가 mounted 되었습니다!')
    })
  }
}
```
