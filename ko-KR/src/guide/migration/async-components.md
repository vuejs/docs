---
badges:
- new
---

# 비동기 컴포넌트

## 개요

변경내용:

- 비동기 컴포넌트를 명시적으로 정의하는 새로운 `defineAsyncComponent` 헬퍼 메소드
- `component` 옵션명을 `loader`로 변경
- Loader 함수는 `resolve` 및 `reject`를 인수를 받지 않으며 Promise를 반환합니다.

더 자세한 설명은 계속 읽으십시오!

## 서론

이전에는 다음과 같이 promise를 반환하는 함수로 컴포넌트를 정의하여 비동기 컴포넌트를 만들었습니다.

```js
const asyncPage = () => import('./NextPage.vue')
```

또는, 옵션을 통하여 컴포넌트 구문을 설정합니다.

```js
const asyncPage = {
  component: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}
```

## 3.x 구문

Vue 3의 함수형 컴포넌트는 순수 함수로 정의되어 있으므로 비동기 컴포넌트 정의는 새로운 `defineAsyncComponent` 헬퍼에서 래핑하여 명시적으로 정의해야 합니다.

```js
import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// 옵션이 없는 비동기 컴포넌트
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))

// 옵션이 있는 비동기 컴포넌트
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

2.x에서 추가된 또 하나의 변화는 컴포넌트(`component`)를 직접 제공 할 수 없는 것을 정확하게 전달하기 위해 컴포넌트 옵션의 이름이 로더(`loader`)로 변경된 것입니다.

```js{4}
import { defineAsyncComponent } from 'vue'

const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
})
```

또한, 2.x와 달리 로더 함수는 `resolve`와 `reject` 인수를 받지 않으며 항상 Promise를 반환해야 합니다.

```js
// 2.x 버전
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
}

// 3.x 버전
const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)
```

비동기 컴포넌트 사용에 대한 자세한 내용은 다음을 참조하십시오.

- [가이드 : 동적 & 비동기 컴포넌트](/guide/component-dynamic-async.html#dynamic-components-with-keep-alive)
