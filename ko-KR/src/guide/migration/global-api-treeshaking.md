---
badges:
- breaking
---

# 전역 API 트리쉐이킹(*Global API Treeshaking) <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 2.x 구문

Vue에서 DOM을 수동으로 조작해야 했을 때, 다음과 같은 패턴을 본 적이 있을 겁니다.

```js
import Vue from 'vue'

Vue.nextTick(() => {
  // something DOM-related
})
```

혹은, [비동기 컴포넌트](/guide/component-dynamic-async.html)를 포함한 어플리케이션을 유닛테스트를 할 때, 다음과 같은 코드를 작성했을 수도 있습니다.

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)

  // execute some DOM-related tasks

  await wrapper.vm.$nextTick()

  // run your assertions
})
```

`Vue.nextTick()`는 단일 Vue 객체에서 직접 노출된(*exposed) 전역 API입니다. – 사실, 인스턴스 메서드 `$nextTick()`은 편리성을 위해 현재 인스턴스가 자동으로 callback의 `this` context에 바인딩된 `Vue.nextTick()`을 감싸는 편리한 래퍼일 뿐입니다.

그러나 수동 DOM 조작을 다룰 필요가 없었거나, 앱에서 비동기 구성요소를 사용하거나 테스트하지 않았다면 어떻게 해야할까요? 또는 어떤 이유로든 좋지만 오래된 `window.setTimeout()`을 대신 사용하는 것을 선호한다면 어떨까요? 이 경우 `nextTick()`의 코드는 작성되었지만, 사용되지 않은 코드인 죽은 코드(dead code)가 됩니다. 특히, 킬로바이트(kb)가 중요한 클라이언트 측 컨텐스트에서는 죽은 코드가 좋지 않습니다.

[webpack](https://webpack.js.org/)과 같은 모듈 번들러는 "죽은 코드 제거(dead code elimination)"에 대한 멋진 용어인 [트리 쉐이킹(tree-shaking)](https://webpack.js.org/guides/tree-shaking/)을 지원합니다. 불행히도, 이전 Vue 버전에서 코드가 작성되는 방식으로 인해 `Vue.nextTick()`과 같은 글로벌 API는 트리 쉐이킹이 불가능하며, 실제로 사용되는 위치에 관계없이 최종 번들에 포함됩니다.

## 3.x 구문

Vue 3에서는 트리 쉐이킹 지원을 염두에 두고 글로벌 및 내부 API가 재구성되었습니다. 결과적으로, 글로벌 API는 이제 ES 모듈 빌드에 대한 명명된 export로만 접근할 수 있습니다. 예를들어 이전 스니펫(previous snippet)은 이제 다음과 같아야 합니다:

```js
import { nextTick } from 'vue'

nextTick(() => {
  // DOM 관련된 일
})
```

그리고

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'
import { nextTick } from 'vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)

  // DOM 관련 작업 실행

  await nextTick()

  // 코드 실행
})
```

`Vue.nextTick()`을 직접 호출하면, 악명높은 `undefined is not a function` 에러가 발생합니다.

이러한 변경으로 모듈 번들러가 트리 쉐이킹을 지원하는 경우, Vue 애플리케이션에서 사용되지 않는 전역 API가 최종 번들에서 제거되어 최적의 파일 크기가 생성됩니다.

## 변경된 APIs

이번 변경으로 Vue 2.x에서 다음 전역 API들이 변경되었습니다.

- `Vue.nextTick`
- `Vue.observable` (`Vue.reactive`로 대체)
- `Vue.version`
- `Vue.compile` (전체 빌드에서만 사용 가능)
- `Vue.set` (compat 빌드에서만 사용 가능)
- `Vue.delete` (compat빌드에서만 사용 가능)

## 내부 도우미(Internal Helpers)

공용 API 외에도 많은 내부 컴포넌트/헬퍼가 이제 명명된 export로 내보내집니다. 이를 통해 컴파일러는 기능이 사용될 때만 import하는 코드를 출력할 수 있습니다. 다음 템플릿을 예로 보겠습니다:

```html
<transition>
  <div v-show="ok">hello</div>
</transition>
```

다음과 유사한 것으로 컴파일됩니다:

```js
import { h, Transition, withDirectives, vShow } from 'vue'

export function render() {
  return h(Transition, [withDirectives(h('div', 'hello'), [[vShow, this.ok]])])
}
```

이것은 본질적으로 `Transition` 컴포넌트가 애플리케이션이 실제로 사용하는 경우에만 import됨을 의미합니다. 즉, 애플리케이션에 `<transition>` 컴포넌트가 없으면, 이 기능을 지원하는 코드가 최종 번들에 표시되지 않습니다.

글로벌 트리 쉐이킹을 사용하면, 사용자는 실제로 사용하는 기능에 대해서만 "지불(pay)"합니다. 더 좋은 점은 사용하지 않는 선택적인 기능은 애플리케이션의 번들 크기를 늘리지 않는다는 사실을 알고 있기 때문에, 향후 추가 핵심 기능에 대한 프레임워크 크기의 우려가 훨씬 적어졌습니다.

::: warning 중요 위의 내용은 트리 쉐이킹 가능한 번들러와 함께 사용하기 위한 [ES 모듈 빌드(ES Modules builds)](/guide/installation.html#explanation-of-different-builds)에만 적용됩니다. UMD 빌드는 여전히 모든기능을 포함하고 Vue 전역 변수에 모든 것을 노출합니다. (컴파일러는 import 대신 전역에서 API를 사용하기 위한 적절한 출력을 생성합니다). :::

## 플러그인에서 사용법

플러그인이 영향받은 Vue 2.x 글로벌 API에 의존하는 경우, 예를 들어:

```js
const plugin = {
  install: Vue => {
    Vue.nextTick(() => {
      // ...
    })
  }
}
```

Vue 3에서는 명시적으로 import 해야합니다:

```js
import { nextTick } from 'vue'

const plugin = {
  install: app => {
    nextTick(() => {
      // ...
    })
  }
}
```

웹팩과 같은 모듈 번들을 사용하는 경우, Vue의 소스코드가 플러그인에 번들로 포함될 수 있으며, 예상치 못한 경우가 더 많습니다. 이를 방지하는 일반적인 방법은 최종 번들에서 Vue를 제외하도록 모듈 번들러를 구성하는 것입니다. 웹팩의 경우 [`externals`](https://webpack.js.org/configuration/externals/) 구성 옵션을 사용할 수 있습니다:

```js
// webpack.config.js
module.exports = {
  /*...*/
  externals: {
    vue: 'Vue'
  }
}
```

이것은 Vue 모듈을 번들이 아닌 외부 라이브러리로 취급하도록 웹팩에 지시합니다.

선택한 모듈 번들러가 [롤업(Rollup)](https://rollupjs.org/)인 경우, 기본적으로 롤업(Rollup)은 절대 모듈 ID(이 경우 `'vue'`)를 외부 종속성으로 취급하고 최종 번들에 포함하지 않으므로, 기본적으로 동일한 효과를 무료로 얻을 수 있습니다. 하지만 번들링 중에 [“외부 종속성으로 vue 처리 중(Treating vue as external dependency)”](https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency) 경고가 발생할 수 있으며, 이는 `external` 옵션으로 억제할 수 있습니다:

```js
// rollup.config.js
export default {
  /*...*/
  external: ['vue']
}
```
