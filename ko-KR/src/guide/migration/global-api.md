---
badges:
- breaking
---

# 글로벌 API(Global API) <migrationbadges badges="$frontmatter.badges"></migrationbadges>

Vue 2.x에는 Vue의 동작을 전체적으로 변경하는 여러 글로벌 API 및 구성이 있습니다. 예를들어 전역 컴포넌트를 만들려면, 다음과 같이 `Vue.component` API를 사용합니다:

```js
Vue.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})
```

다음은 전역 디렉티브가 선언되는 방법입니다:

```js
Vue.directive('focus', {
  inserted: el => el.focus()
})
```

이 접근방식은 편리하지만 몇 가지 문제가 발생합니다. 기술적으로 Vue 2에는 "앱(app)"이라는 개념이 없습니다. 앱으로 정의하는 것은 `new Vue()`를 통해 생성된 루트 Vue 인스턴스입니다. 동일한 Vue 생성자에서 생성된 모든 루트 인스턴스는 **동일한 전역 구성을 공유**합니다. 그 결과:

- 글로벌 구성을 사용하면 테스트 중에 실수로 다른 테스트 케이스를 쉽게 오염시킬 수 있습니다. 사용자는 원래 전역 구성을 신중하게 저장하고 각자 테스트 후에 복원해야 합니다(예: `Vue.config.errorHandler` 재설정). `Vue.use` 및`Vue.mixin`과 같은 일부 API에는 효과를 되돌릴 방법도 없습니다. 이로인해 플러그인과 관련된 테스트가 특히 까다로워집니다. 실제로 vue-test-utils는 이를 처리하기 위해 특수 API `createLocalVue`를 구현해야합니다:

```js
import { createLocalVue, mount } from '@vue/test-utils'

// 확장된 `Vue` 생성자 생성
const localVue = createLocalVue()

// "로컬" Vue 생성자에 "전역적으로" 플러그인 설치
localVue.use(MyPlugin)

// mount옵션에 `localVue` 전달
mount(Component, { localVue })
```

- 전역 구성은 동일한 페이지에 있는 여러 "앱들(apps)"간에 동일한 Vue 사본을 공유하기 어렵지만, 전역 구성은 다릅니다.

    ```js
    // 양쪽의 루트 인스턴스에 영향을 미칩니다
    Vue.mixin({
      /* ... */
    })

    const app1 = new Vue({ el: '#app-1' })
    const app2 = new Vue({ el: '#app-2' })
    ```

이러한 문제를 피하기 위해, Vue 3에서는 다음을 소개합니다…

## 새로운 글로벌 API(A New Global API): `createApp`

`createApp`을 호출하면, Vue 3의 새로운 개념인 *앱 인스턴스(app instance)*가 반환됩니다.

```js
import { createApp } from 'vue'

const app = createApp({})
```

앱 인스턴스는 현재 전역 API의 하위 집합을 노출합니다. 경험상 *Vue의 동작을 전역적으로 변경하는 모든 API가 이제 앱 인스턴스로 이동*된다는 것입니다. 다음은 현재 전역 API 및 해당 인스턴스 API의 표입니다:

2.x Global API | 3.x Instance API (`app`)
--- | ---
Vue.config | app.config
Vue.config.productionTip | *제거됨* ([see below](#config-productiontip-removed))
Vue.config.ignoredElements | app.config.isCustomElement ([see below](#config-ignoredelements-is-now-config-iscustomelement))
Vue.component | app.component
Vue.directive | app.directive
Vue.mixin | app.mixin
Vue.use | app.use ([see below](#a-note-for-plugin-authors))

전역적으로 동작을 변경하지 않는 다른 모든 전역 API는 이제 [전역 API 트리 쉐이킹(Global API Treeshaking)](./global-api-treeshaking.html)에 설명된대로 export로 명명됩니다.

### `config.productionTip` 제거됨

Vue 3.x에서 "프로덕션 빌드 사용(use production build)"팁은 "dev + full build"(런타임 컴파일러를 포함하고 경고가 있는 빌드)를 사용할 때만 표시됩니다.

ES 모듈 빌드의 경우 번들러와 함께 사용되며, 대부분의 경우 CLI 또는 보일러플레이트가 프로덕션 환경을 올바르게 구성했으므로, 이 팁은 더이상 표시되지 않습니다.

### 이제 `config.ignoredElements`가 `config.isCustomElement`입니다.

이 구성옵션은 기본 사용자정의 요소를 지원하기위해 도입되었으므로, 이름을 바꾸면 수행하는 작업이 더 잘 전달됩니다. 새 옵션은 또한 이전 문자열/RegExp 접근 방식보다 더 많은 유연성을 제공하는 기능을 기대합니다:

```js
// 이전
Vue.config.ignoredElements = ['my-el', /^ion-/]

// 이후
const app = Vue.createApp({})
app.config.isCustomElement = tag => tag.startsWith('ion-')
```

::: tip 중요

3.0에서는 요소가 컴포넌트인지 아닌지 여부는 템플릿 컴파일 단계로 이동되었으므로, 이 구성 옵션은 런타임 컴파일러를 사용할 때만 적용됩니다. 런타임 전용 빌드를 사용하는 경우, 빌드 설정에서 `isCustomElement`를 `@vue/compiler-dom`으로 대신 전달해야 합니다. (예: [vue-loader의 `compilerOptions` 옵션을 통해](https://vue-loader.vuejs.org/options.html#compileroptions))

- 런타임 전용 빌드를 사용할 때 `config.isCustomElement`가 할당되면 사용자에게 빌드 설정에서 옵션을 대신 전달하도록 지시하는 경고가 표시됩니다.
- 이것은 Vue CLI 구성의 새로운 최상위 옵션입니다. :::

### 플러그인 작성자를 위한 참고사항(A Note for Plugin Authors)

플로그인 작성자는 `Vue.use`를 사용하여 UMD 빌드에 플러그인을 자동으로 설치하는 것이 일반적입니다. 예를들어 공식 `vue-router` 플러그인이 브라우저 환경에 설치되는 방법은 다음과 같습니다:

```js
var inBrowser = typeof window !== 'undefined'
/* … */
if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}
```

전역 API `use`는 Vue 3에서 더이상 사용할 수 없으므로, 이 메소드는 작동을 중단하고 `Vue.use()`를 호출하면 경고가 나타납니다. 대신 최종 사용자는 이제 앱 인스턴스에서 플러그인을 사용하여 명시적으로 지정해야 합니다:

```js
const app = createApp(MyApp)
app.use(VueRouter)
```

## 앱 인스턴스 마운트(Mounting App Instance)

`createApp(/* options */)`로 초기화된 후, 앱 인스턴스 `app`을 사용하여 `app.mount(domTarget)`로 Vue 루트 인스턴스를 마운트할 수 있습니다:

```js
import { createApp } from 'vue'
import MyApp from './MyApp.vue'

const app = createApp(MyApp)
app.mount('#app')
```

이러한 모든 변경사항으로 가이드 시작 부분에 있는 컴포넌트와 디렉티브는 다음과 같이 다시 작성됩니다:

```js
const app = createApp(MyApp)

app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

app.directive('focus', {
  mounted: el => el.focus()
})

// 이제 모든 애플리케이션 인스턴스가 app.mount()와 함께 마운트 됩니다.
// 컴포넌트 트리는 동일한 “button-counter” 컴포넌트를 갖습니다.
// 그리고 전역 환경을 오염시키지 않는 “focus” 디렉티브
app.mount('#app')
```

## Provide / Inject

2.x 루트 인스턴스에서 `provide`옵션을 사용하는 것과 유사하게, Vue 3 앱 인스턴스는 앱 내부의 모든 컴포넌트에서 inject될 수 있는 종속성도 제공할 수 있습니다:

```js
// 사용 시
app.provide('guide', 'Vue 3 Guide')

// 자식 컴포넌트 내
export default {
  inject: {
    book: {
      from: 'guide'
    }
  },
  template: `<div>{{ book }}</div>`
}
```

## 앱 간의 구성 공유(Share Configurations Among Apps)

앱 간의 컴포넌트 또는 디렉티브 간의 구성을 공유하는 한가지 방법은 다음과 같이 팩토리 함수(factory function)를 만드는 것입니다:

```js
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const createMyApp = options => {
  const app = createApp(options)
  app.directive('focus' /* ... */)

  return app
}

createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

이제 `focus` 디렉티브는 Foo 및 Bar 인스턴스와 그 자손 모두에서 사용할 수 있습니다.
