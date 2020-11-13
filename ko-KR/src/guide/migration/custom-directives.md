---
badges:
- breaking
---

# 사용자 지정 디렉티브 <migrationbadges badges="$frontmatter.badges"></migrationbadges>

## 개요

업데이트 되면서 무엇이 바뀌었는지 한눈에 보여줍니다:

- API는 컴포넌트 생명주기에 할당하여 더 효율적으로 사용하기 위해서 재정의 됩니다.
- 사용자 정의 디렉티브는 자식 컴포넌트에서  <br>`v-bind="$attrs"`를 다룹니다.

더 많은 정보를 알고 싶다면, 읽으십시오!

## 2.x 문법

Vue 2에서는, 사용자 지정 디렉티브는 선택적으로 엘리먼트의 생명주기에 리스트 된 후크를 사용하여 만듭니다:

- **bind** - 디렉티브가 처음 엘리먼트에 바인딩 될 때 한번만 발생합니다. 일회성으로 발생합니다.
- **inserted** - 엘리먼트가 부모 DOM에 삽입 될 때 발생합니다.
- **update** - 자식 요소가 아직 업데이트 되지 않았을 때, 훅은 엘리먼트가 업데이트 될 때 호출됩니다.
- **componentUpdated** - 이 훅은 컴포넌트와 자식이 업데이트 되었을 때 한번 호출됩니다.
- **unbind** - 이 훅은 디렉티브가 제거되었을 때 호출됩니다. 오직 한번만 호출됩니다.

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

엘리먼트를 처음 지정할 때, 디렉티브는 스타일이 가지고 있는 value를 묶고, 어플리케이션을 통해서 다른 value들을 업데이트 합니다.

## 3.x 문법

Vue 3에서, 사용자 지정 디렉티브에서 사용하는 더 견고한 API를 <br>다룹니다. 컴포넌트 생명주기 메소드에서 비슷한 이벤트를 다룰 때 훅을 다루는 것 처럼 달랐습니다.아래와 같이 통합하였습니다:

- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**: <br>새롭게 등장한 기능 입니다! 엘리먼트가 컴포넌트 생명주기 훅이 가진 대다수의 특징처럼 엘리먼트가 업데이트 되었을 때 호출됩니다.
- update → 없어진 기능입니다! 업데이트 된 새로운 기능들과 비슷한 점이 많아서 불필요한 기능입니다. 새로 생긴 기능을 사용해주십시오.
- componentUpdated → **updated**
- **beforeUnmount** 새로운 기능입니다!<br>컴포넌트 생명주기 훅과 비슷하며, 엘리먼트가 할당되지 않았을 때 올바르게 호출합니다.
- unbind -> **unmounted**

최종 API는 아래와 같습니다:

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // 아직 지정되지 않은 새로운 훅
  unmounted() {}
}
```

결과 API는 위와 같은 방식으로 사용되며, 기존에 있었던 예시들과 유사합니다:

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

이제 사용자 지정 디렉티브 라이프 사이클 훅은 더 쉽게 접근하고 기억할 수 있는 컴포넌트를 반영합니다!

### 엣지 케이스 :  컴포넌트 인스턴스에 접근하기

일반적으로 컴포넌트 인스턴스 안에서 사용된 디렉티브의 독립성을 지키는 것을 권고합니다. 커스텀 디렉티브에서 인스턴스에 접근하는 것은 디렉티브가 컴포넌트 자체의 역할을 맡고 있다는 표시로 나타납니다. 그러나 이것은 가정한 상황이라고 보는것이 타당합니다.

Vue 2에서, 컴포넌트 인스턴스는 `vnode`인자를 통해서 접근했습니다:

```javascript
bind(el, binding, vnode) {
  const vm = vnode.context
}
```

 Vue 3에서, 인스턴스는 `바인딩`의 한부분이 되었습니다:

```javascript
mounted(el, binding, vnode) {
  const vm = binding.instance
}
```

## 구현 세부사항

Vue 3에서, 이제 컴포넌트 당 하나 이상의 DOM을 반환 할 수 있는 fragment를 지원합니다. 컴포넌트에서 여러개의 `<li>` 엘리먼트 또는 테이블의 자식엘리먼트를 다루는 것 과 같이 간단진 것을 상상할 수있습니다:

```html
<template>
  <li>Hello</li>
  <li>Vue</li>
  <li>Devs!</li>
</template>
```

유연하게 사용되는 만큼, 강력한 여러개의 루트 노드들을 가지고 있는 커스텀 디렉티브가 가지고 있 문제점에 직면하였습니다.

그 결과, 커스텀 디렉티브는 이제 버튜얼 DOM노드의 데이터를 포함합니다. 커스텀 디렉티브를 컴포넌트에서 사용할 때, 후크는 컴포넌트외의 사용자 지정 속성부터 `this.$attrs` 까지 다룹니다.

template에서 커스텀 디렉티브가 연관되어 있으면 유용해지는 것과 마찬가지로 후크를 엘리먼트의 생명주기를 직접 다룬다는 것은 유용해지는 것을 뜻합니다:

```html
<div></div>
```

속성이 실현 될 수 없는 일관된 결과로 나타나는데, 자식 컴포넌트가  내부 엘리먼트에 `v-bind="$attrs"`를 사용할 때, 어떤 커스텀 디렉티브라도 적용이 될 것 입니다.
