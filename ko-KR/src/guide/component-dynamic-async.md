# 동적 & 비동기 컴포넌트

> 이 페이지는 여러분이 이미 [컴포넌트 기초](component-basics.md)를 읽었다고 가정하고 쓴 내용입니다. 컴포넌트가 처음이라면 기초 문서를 먼저 읽으시기 바랍니다.

## `keep-alive`를 사용하는 동적 컴포넌트

과거에는 탭 인터페이스의 컴포넌트를 전환하기 위해서 `is` 속성을 사용하였습니다.

```vue-html
<component :is="currentTabComponent"></component>
```

컴포넌트를 전환할 때 컴포넌트의 상태를 유지하거나 위해서, 혹은 성능상의 이유로 다시 렌더링되는 것을 방지하고 싶을 수 있습니다. 예를 들어, 탭 인터페이스를 조금만 확장 해 보면:


<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="jOPjZOe" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Dynamic components: without keep-alive">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/jOPjZOe">   Dynamic components: without keep-alive</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p>

게시물을 선택한 뒤, *Archive*  탭으로 갔다가 다시 *Posts* 탭으로 돌아오면 원래 보고 있던 게시물이 표시되지 않는 것을 알 수 있습니다. 이는 Vue가 새 탭으로 전환할 때 마다 새로운 `currentTabComponent` 인스턴스를 생성하기 때문입니다.

일반적으로 컴포넌트의 동적 재생성은 유용한 동작이지만, 이 경우에는 처음 만들어진 컴포넌트 인스턴스가 캐시되어있는 쪽이 좀 더 바람직합니다. 이 경우, `<keep-alive>` 엘리먼트로 동적 컴포넌트를 감싸는 것으로 문제를 해결할 수 있습니다.

```vue-html
<!-- 컴포넌트가 비활성화되어도 캐시됩니다! -->
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

아래 결과를 확인 해 보세요:


<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="VwLJQvP" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Dynamic components: with keep-alive">   <span>See the Pen <a href="https://codepen.io/team/Vue/pen/VwLJQvP">   Dynamic components: with keep-alive</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p>

이제 *Posts* 탭은 렌더링 되지 않은 상태에서도 상태(선택된 게시물)를 유지합니다.

[API reference](../api/built-in-components.html#keep-alive) 문서에서 `<keep-alive>`에 대한 자세한 설명을 확인하세요.

## 비동기 컴포넌트

크기가 큰 어플리케이션의 경우, 어플리케이션을 작은 단위로 쪼개고 필요한 경우에만 컴포넌트를 로드하도록 할 수 있습니다. 이러한 작업을 위해서 Vue에는 `defineAsyncComponent` 메소드가 존재합니다:

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

메소드에서 볼 수 있는 것 처럼, 메소드는 `Promise`를 반환하는 팩토리 함수를 받을 수 있습니다. Promise의 `resolve` 콜백은 서버에서 컴포넌트를 가져와야 할 때 호출되어야 합니다. 컴포넌트 로드가 실패한 경우에는 `reject(reason)` 콜백을 호출하여 로드가 실패하였음을 표시할 수 있습니다.

또한, 팩토리 함수 내부에서`Promise`를 반환할 수 있습니다. 즉, Webpack 2 혹은 ES2015 이후의 자바스트립트 문법을 사용하는 경우에 아래와 같이 쓸 수 있습니다:

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

비동기 컴포넌트는 기본적으로 *suspensible* 합니다. 이는 부모 <br>체인 중에 [`<Suspense>`](TODO)가 있는 경우 해당 `<Suspense>`에 비동기 종속성이 존재하는 것으로 취급된다는 의미입니다. 이 경우 로딩 상태는 `<Suspense>`에 의해 제어되며, 컴포넌트 자체의 로딩, 오류, delay 및 timeout 옵션은 무시됩니다.

비동기 컴포넌트는 `suspensible: false` 옵션을 명시함으로써 `Suspense`에 의한 로딩 상태 제어를 해제하고 항상 컴포넌트 스스로 옵션을 제어하도록 할 수 있습니다.

[API Reference](../api/global-api.html#arguments-4)에서 가능한 옵션 목록을 확인할 수 있습니다.
