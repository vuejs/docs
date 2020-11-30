# 애플리케이션 설정(Application Config)

`config` 는 Vue 애플리케이션 전역 설정을 포함하는 객체입니다. 애플리케이션을 마운트하기 전에 아래 나열된 속성을 수정할 수 있습니다:

```js
const app = Vue.createApp({})

app.config = {...}
```

## errorHandler

- **타입:** `Function`

- **기본값:** `undefined`

- **사용방법:**

```js
app.config.errorHandler = (err, vm, info) => {
  // 에러 처리
  // `info` 는 Vue 관련 에러 정보 입니다. 예) 라이프사이클 훅에 에러를 발견
  // 에러가 발견되었습니다.
}
```

컴포넌트 렌더 함수와 감시자(watcher) 중에 포착되지 않은 에러에 대한 핸들러를 할당합니다. 핸들러는 에러 및 애플리케이션 인스턴스와 함께 호출됩니다.

> 에러 추적 서비스 [Sentry](https://sentry.io/for/vue/) 및 [Bugsnag](https://docs.bugsnag.com/platforms/browsers/vue/)는 이 옵션을 사용하여 공식 통합을 제공합니다.

## warnHandler

- **타입:** `Function`

- **기본값:** `undefined`

- **사용방법:**

```js
app.config.warnHandler = function(msg, vm, trace) {
  // `trace` 는 컴포넌트 계층 추적입니다.
}
```

런타임 Vue 경고에 대한 커스텀 핸들러를 할당합니다. 이것은 개발 중에만 작동하며 프로덕션에서는 무시됩니다.

## globalProperties

- **타입:** `[key: string]: any`

- **기본값:** `undefined`

- **사용방법:**

```js
app.config.globalProperties.foo = 'bar'

app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})
```

애플리케이션 내의 모든 컴포넌트 인스턴스에서 접근할 수 있는 전역 속성을 추가합니다. 키가 충돌하는 경우 컴포넌트의 속성이 우선 적용됩니다.

이는 Vue 2.x의 `Vue.prototype` 확장을 대체 할 수 있습니다.

```js
// 전
Vue.prototype.$http = () => {}

// 후
const app = Vue.createApp({})
app.config.globalProperties.$http = () => {}
```

## isCustomElement

- **타입:** `(tag: string) => boolean`

- **기본값:** `undefined`

- **사용방법:**

```js
// 'ion-' 으로 시작하는 모든 엘리먼트는 커스텀 엘리먼트로 인식됩니다.
app.config.isCustomElement = tag => tag.startsWith('ion-')
```

Vue 외부에서 정의된 커스텀 엘리먼트를 인식하는 방법을 지정합니다(예 : 웹 컴포넌트 API 사용). 컴포넌트가 이 조건과 일치하면 로컬 또는 전역 등록이 필요하지 않으며, Vue 는 `알 수없는 커스텀 엘리먼트(Unknown custom element)`에 대한 경고를 표시하지 않습니다.

> 모든 네이티브 HTML 및 SVG 태그는 이 함수에서 일치할 필요가 없습니다. Vue 파서는 이 검사를 자동으로 수행합니다.

## optionMergeStrategies

- **타입:** `{ [key: string]: Function }`

- **기본값:** `{}`

- **사용방법:**

```js
const app = Vue.createApp({
  mounted() {
    console.log(this.$options.hello)
  }
})

app.config.optionMergeStrategies.hello = (parent, child, vm) => {
  return `Hello, ${child}`
}

app.mixin({
  hello: 'Vue'
})

// 'Hello, Vue
```

커스텀 옵션에 대한 병합 전략을 정의합니다.

병합 전략은 부모 및 자식 인스턴스에 정의된 해당 옵션의 값을 각각 첫 번째(parent)와 두 번째(child) 인수로 받습니다. 컨텍스트 애플리케이션 인스턴스는 세 번째(vm) 인수로 전달됩니다.

- **See also:**
    [커스텀 병합 전략(Custom Option Merging Strategies)](../guide/mixins.html#custom-option-merge-strategies)

## performance

- **타입:** `boolean`

- **기본값:** `false`

- **사용방법**:

브라우저 devtool의 performance / timeline 패널에서 컴포넌트 초기화, 컴파일, 렌더링 및 패치 성능 추적을 사용하려면 이 옵션 값을 `true` 로 설정하십시오. 개발 모드 및 [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API 를 지원하는 브라우저에서만 작동합니다.
