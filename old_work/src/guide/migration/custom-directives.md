---
badges:
- breaking
---

# 커스텀 디렉티브 <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

업데이트 되면서 무엇이 바뀌었는지 한눈에 보여줍니다:

- API는 컴포넌트 라이프사이클에 더 잘맞도록 이름이 변경되었습니다.
- 사용자 정의 디렉티브는 <br>`v-bind="$attrs"`를 통해 자식 컴포넌트에 의해 제어됩니다.

더 많은 정보를 알고 싶다면, 읽으십시오!

## 2.x 문법

Vue 2에서 커스텀 디렉티브는 아래에 나열된 훅을 사용하여, 엘리먼트의 라이프사이클을 대상으로 생성되었습니다. 이는 모두 선택사항입니다:

- **bind** - 디렉티브가 엘리먼트에 바인딩되면 발생합니다. 한번만 발생합니다.
- **inserted** - 엘리먼트가 부모 DOM에 삽입되면 발생합니다.
- **update** - 이 훅은 엘리먼트가 업데이트되었지만, 자식이 아직 업데이트되지 않은 경우 호출됩니다.
- **componentUpdated** - 이 훅은 컴포넌트와 자식이 업데이트되면 호출됩니다.
- **unbind** - 이 훅은 디렉티브가 제거되면 호출됩니다. bind처럼 한번만 호출됩니다.

위의 예시들 입니다:

```html
<p v-highlight="yellow">Highlight this text bright yellow</p>
```

```js
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

여기 이 엘리먼트의 초기 설정에서, 디렉티브는 애플리케이션을 통해 다른 값으로 변경할 수 있는 값을 전달하여 스타일을 바인딩합니다.

## 3.x 문법

그러나, Vue 3에서는 커스텀 디렉티브를 위해 더 응집력있는 API를 만들었습니다. 보시다시피 컴포넌트 라이프사이클 훅 메소드와 유사한 이벤트에 연결되지만, 크게 다릅니다. 이제 다음과 같이 통합되었습니다:

- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**: 새로운 기능입니다! 컴포넌트 라이프사이클 훅과 같이 엘리먼트 자체가 업데이트 되기 전에 호출됩니다.
- update → 없어진 기능입니다! updated와 유사하여 기능이 중복됩니다. 대신 updated를 사용하십시오.
- componentUpdated → **updated**
- **beforeUnmount** 새로운 기능입니다! 컴포넌트 라이프사이클 훅과 유사하며, 엘리먼트가 마운트 해제되기 직전에 호출됩니다.
- unbind -> **unmounted**

최종 API는 아래와 같습니다:

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // 신규
  unmounted() {}
}
```

결과 API는 이전 예제를 가져와 다음과 같이 사용할 수 있습니다:

```html
<p v-highlight="yellow">Highlight this text bright yellow</p>
```

```js
const app = Vue.createApp({})

app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

이제 커스텀 디렉티브 라이프사이클 훅이 컴포넌트 라이프사이클 훅과 비슷하므로, 사용자는 추론하고 기억하기가 더 쉬워졌습니다!

### 엣지 케이스(Edge Case): 컴포넌트 인스턴스 접근

일반적으로 우리가 사용하는 컴포넌트 인스턴스와 디렉티브를 독립적으로 유지하는 것이 좋습니다. 커스텀 디렉티브에서 인스턴스에 접근하는 것은 디렉티브가 컴포넌트 자체가 되어야 한다는 신호입니다. 그러나 이것이 실제로 의미가 있는 상황이 있습니다.

Vue 2에서 컴포넌트 인스턴스는 `vnode` 전달인자를 통해 접근해야 했습니다:

```javascript
bind(el, binding, vnode) {
  const vm = vnode.context
}
```

Vue 3에서 인스턴스는 이제 `binding`의 일부입니다:

```javascript
mounted(el, binding, vnode) {
  const vm = binding.instance
}
```

## 구현 세부사항

Vue 3에서 컴포넌트 당 하나 이상의 DOM 노드를 반환 할 수 있는 fragment를 지원합니다. 여러 `<li>` 엘리먼트나 테이블의 하위 엘리먼트가 있는 컴포넌트와 같은 경우 얼마나 편리한지를 상상할 수 있습니다.

```html
<template>
  <li>Hello</li>
  <li>Vue</li>
  <li>Devs!</li>
</template>
```

이처럼 놀랍도록 유연하기 때문에, 여러 개의 루트 노드를 가실수 있는 커스텀 디렉티브에 잠재적으로 문제가 발생할 수 있습니다.

결과적으로 커스텀 디렉티브는 가상 DOM노드 데이터의 일부로 포함됩니다. 커스텀 디렉티브가 컴포넌트에서 사용되면 훅이 외부의 props로 컴포넌트에 전달되어 `this.$attrs`에 저장됩니다.

이는 또한 템플릿에서 엘리먼트의 라이프사이클 훅에 직접 연결할 수 있음을 의미합니다. 이는 커스텀 디렉티브가 너무 관련되어있는 경우 편리할 수 있습니다.

```html
<div @vnodeMounted="myHook" />
```

이는 속성 폴스루(fallthrough) 동작과 일치하므로, 하위 컴포넌트가 내부 엘리먼트에서 `v-bind="$attrs"`를 사용하면, 여기에 사용된 모든 커스텀 디렉티브도 적용됩니다.
