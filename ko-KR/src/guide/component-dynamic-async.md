# 동적 & 비동기 컴포넌트

> 이 페이지는 여러분이 이미 [컴포넌트 기초](component-basics.md)를 읽었다고 가정하고 쓴 내용입니다. 컴포넌트가 처음이라면 기초 문서를 먼저 읽으시기 바랍니다.

## `keep-alive`를 사용하는 동적 컴포넌트

과거에는 탭 인터페이스의 컴포넌트를 전환하기 위해서 `is` 속성을 사용하였습니다.

```vue-html
<component :is="currentTabComponent"></component>
```

하지만 컴포넌트를 전환할 때 컴포넌트의 상태를 유지하거나 혹은 성능상의 이유로 다시 렌더링되는 것을 방지하고 싶을 수 있습니다. 예를 들어, 탭 인터페이스를 조금만 확장할 때:

See the Pen <a href="https://codepen.io/team/Vue/pen/jOPjZOe">   Dynamic components: without keep-alive</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.

게시물을 선택하고 *Archive* 탭으로 갔다가 다시 *Posts* 탭으로 돌아오면 원래 보고 있던 게시물이 표시되지 않는 것을 알 수 있습니다. 이는 Vue가 새 탭으로 전환할 때마다 Vue가 `currentTabComponent`의 새로운 인스턴스를 생성하기 때문입니다.

동적 컴포넌트를 다시 만드는 것은 일반적으로 유용한 동작이지만, 이 경우 처음 생성된 탭 컴포넌트 인스턴스가 캐시되기를 원합니다. 이 문제를 해결하기 위해서 동적 컴포넌트를 `<keep-alive>` 엘리먼트로 래핑할 수 있습니다.

```vue-html
<!-- 비활성 컴포넌트가 캐시됩니다! -->
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

아래 결과를 확인 해 보세요:

See the Pen <a href="https://codepen.io/team/Vue/pen/VwLJQvP">   Dynamic components: with keep-alive</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.

이제 *Posts*탭은 렌더링되지 않은 경우에도 상태(선택된 게시물)를 유지합니다.

[API reference](../api/built-in-components.html#keep-alive) 문서에서 `<keep-alive>`에 대한 자세한 설명을 확인하세요.

## 비동기 컴포넌트

대규모 애플리케이션에서는 앱을 더 작은 청크로 나누고 필요할 때만 서버에서 컴포넌트를 로드하도록 할 수 있습니다. 이러한 작업을 위해서 Vue에는 `defineAsyncComponent`메소드가 있습니다:

```js
const app = Vue.createApp({})

const AsyncComp = Vue.defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: '<div>I am async!</div>'
      })
    })
)

app.component('async-example', AsyncComp)
```

보시다시피 이 메소드는 `Promise`를 반환하는 팩토리 함수를 받습니다. Promise의 `resolve` 콜백은 서버에서 컴포넌트 정의를 검색할 때 호출되어야 합니다. `reject(reason)`를 호출하여 로드가 실패했음을 나타낼 수도 있습니다.

팩토리 함수에서 `Promise`를 반환할 수 있으므로 Webpack 2 이상의 버전 및 ES2015 문법을 사용하여 다음을 수행할 수 있습니다:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)
```

[지역적으로 컴포넌트를 등록](component-registration.html#local-registration)하는 경우에도 `defineAsyncComponent` 를 사용할 수 있습니다:

```js
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```

### Suspense와 함께 사용하기

비동기 컴포넌트는 기본적으로 *suspensible*합니다. 즉, 상위 체인에 [`<Suspense>`](TODO)가 있는경우 해당 `<Suspense>`의 비동기 종속성으로 처리됩니다. 이 경우 로딩 상태는 `<Suspense>`에 의해 제어되며, 컴포넌트 자체의 loading, error, delay 및 timeout 옵션은 무시됩니다.

비동기 컴포넌트는 `suspensible: false` 옵션을 명시함으로써 `Suspense`에 의한 로딩 상태 제어를 해제하고 항상 컴포넌트 스스로 옵션을 제어하도록 할 수 있습니다.

[API Reference](../api/global-api.html#arguments-4)에서 가능한 옵션 목록을 확인할 수 있습니다.
