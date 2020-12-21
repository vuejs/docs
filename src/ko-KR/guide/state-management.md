# 상태 관리

## 공식 Flux-유사 구현

대규모 애플리케이션은 여러 컴포넌트에 흩어져 있는 상태와 이들 사이의 상호 작용으로 인해 복잡해집니다. 이러한 문제를 해결하기 위해 Vue는 Elm에서 영감을 얻은 상태 관리 라이브러리인 [Vuex](https://github.com/vuejs/vuex)를 제공합니다. Vuex는 [vue-devtools](https://github.com/vuejs/vue-devtools)에 통합되어 별도의 설정이 필요 없이 [시간 여행 디버깅](https://raw.githubusercontent.com/vuejs/vue-devtools/master/media/demo.gif)을 할 수 있습니다.

### React 개발자를 위한 안내

만약 React 경험이 있다면 Vuex가 React 생태계에서 가장 인기 있는 Flux 구현인 [Redux](https://github.com/reactjs/redux)와 어떻게 비교되는지 궁금할 것입니다. Redux는 뷰 레이어(view-layer)에 구애받지 않습니다. 따라서 [간단한 바인딩](https://classic.yarnpkg.com/en/packages?q=redux%20vue&p=1)을 통해 Vue에서도 Redux를 쉽게 사용할 수 있습니다. 둘의 차이는 Vuex가 이미 Vue app을 *알고 있다*는 점입니다. 이로 인해 Vuex는 보다 효과적으로 Vue와 통합할 수 있어 더욱 직관적인 API와 향상된 개발 경험을 제공합니다.

## 간단한 상태 관리 시작하기

때때로 Vue 애플리케이션에서 가장 근본이 되는 것은 반응형 `data` 객체임을 지나치곤 합니다. 컴포넌트 인스턴스는 단지 해당 객체로의 접근을 프록시 처리할 뿐입니다. 그러므로 여러 인스턴스에서 상태를 공유해야 하는 경우, 아래와 같이 [reactive](/ko-KR/guide/reactivity-fundamentals.html#declaring-reactive-state) 메서드를 사용하여 객체를 반응형으로 만들 수 있습니다.

```js
const sourceOfTruth = Vue.reactive({
  message: 'Hello'
})

const appA = Vue.createApp({
  data() {
    return sourceOfTruth
  }
}).mount('#app-a')

const appB = Vue.createApp({
  data() {
    return sourceOfTruth
  }
}).mount('#app-b')
```

```html
<div id="app-a">App A: {{ message }}</div>

<div id="app-b">App B: {{ message }}</div>
```

이제 `sourceOfTruth`가 변경될 때마다 `appA`와 `appB` 모두 자동으로 화면을 갱신합니다. 우리는 지금 단일 소스를 갖고 있지만, 디버깅은 악몽 같을 것입니다. 언제든지 앱의 일부에서 흔적을 남기지 않은 채로 데이터를 변경할 수 있기 때문입니다.

```js
const appB = Vue.createApp({
  data() {
    return sourceOfTruth
  },
  mounted() {
    sourceOfTruth.message = 'Goodbye' // 이제 두 앱 모두 'Goodbye' 메시지를 렌더링할 것입니다.
  }
}).mount('#app-b')
```

간단한 **store 패턴**을 적용해 이 문제를 해결할 수 있습니다.

```js
const store = {
  debug: true,

  state: Vue.reactive({
    message: 'Hello!'
  }),

  setMessageAction(newValue) {
    if (this.debug) {
      console.log('setMessageAction triggered with', newValue)
    }

    this.state.message = newValue
  },

  clearMessageAction() {
    if (this.debug) {
      console.log('clearMessageAction triggered')
    }

    this.state.message = ''
  }
}
```

주목할 점은 store의 상태를 변경시키는 모든 조치가 store 내부에 들어 있다는 것입니다. 이처럼 중앙 집중식 상태 관리를 통해 어떤 유형의 변이가 발생하는지, 어떻게 이런 변이가 촉발되는지 쉽게 이해할 수 있습니다. 이제 문제가 생기면, 우리는 무엇이 버그를 유발하는지에 대해서도 로그를 갖게 됩니다.

또한 각 인스턴스, 컴포넌트는 여전히 자체적으로 비공개 상태를 가지고 관리할 수 있습니다.

```html
<div id="app-a">{{sharedState.message}}</div>

<div id="app-b">{{sharedState.message}}</div>
```

```js
const appA = Vue.createApp({
  data() {
    return {
      privateState: {},
      sharedState: store.state
    }
  },
  mounted() {
    store.setMessageAction('Goodbye!')
  }
}).mount('#app-a')

const appB = Vue.createApp({
  data() {
    return {
      privateState: {},
      sharedState: store.state
    }
  }
}).mount('#app-b')
```

![State Management](https://github.com/narusas/docs-next/blob/master/images/state.png?raw=true)

::: tip 
액션에서 원래 상태 객체를 절대 교체하면 안 된다는 점에 유의해야 합니다. 컴포넌트와 store는 변이를 관찰하기 위해 같은 객체에 대한 참조를 공유해야 합니다. 
:::

컴포넌트가 store에 속한 상태를 직접 변경하는 것은 허용되지 않습니다. 하지만, 상태 조작 액션을 수행하도록 store에 dispatch 이벤트를 보내는 방식으로 개발을 하다 보면, 결국 [Flux](https://facebook.github.io/flux/) 아키텍처에 다다르게 됩니다. 이런 개발 방식의 이점은 store에서 발생하는 모든 상태 변이를 기록하고 mutation 로그, 스냅 샷 및 히스토리 되돌리기 / 시간 여행과 같은 고급 디버깅 도우미를 구현할 수 있다는 것입니다.

이것은 우리를 [Vuex](https://github.com/vuejs/vuex)에 이르게 합니다. 그러므로 여기까지 읽었다면, Vuex를 시도해 볼 시간입니다!
