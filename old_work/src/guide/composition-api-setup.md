# Setup

> 이 섹션에서는 코드 예제에 [싱글파일 컴포넌트](single-file-component.html) 구문을 사용합니다.

> 이 가이드에서는 사용자가 이미 [Composition API Introduction](composition-api-introduction.html)와 [Reactivity Fundamentals](reactivity-fundamentals.html)를 이미 읽었다고 가정합니다. Composition API를 처음 사용하는 경우 먼저 읽어보세요.

## 전달인자

`setup` 펑션은 2가지 전달인자를 가집니다:

1. `props`
2. `context`

각 전달인자가 어떻게 사용되는지 자세히 살펴보겠습니다.

### Props

`setup` 펑션의 첫번째 전달인자는 `props`입니다. 표준 컴포넌트에서 예상하는 것처럼 `setup` 내부의 `props`는 반응성이 있고, 새로운 props가 전달되면 업데이트됩니다.

```js
// MyBook.vue

export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

:::warning `props`는 반응성이 있습니다. 그러나 **ES6의 구조분해할당**을 사용한다면 props의 반응성이 제거됩니다. :::

props의 구조분해할당이 필요한 경우, `setup`펑션의 [toRefs](reactivity-fundamentals.html#destructuring-reactive-state)를 사용하여 반응성을 유지할 수 있습니다.

```js
// MyBook.vue

import { toRefs } from 'vue'

setup(props) {
	const { title } = toRefs(props)

	console.log(title.value)
}
```

### Context

`setup`펑션의 두번째 전달인자는 `context`입니다. `context`는 3가지 컴포넌트 프로퍼티를 가지는 일반 JavaScript 객체입니다:

```js
// MyBook.vue

export default {
  setup(props, context) {
    // Attributes (Non-reactive object)
    console.log(context.attrs)

    // Slots (Non-reactive object)
    console.log(context.slots)

    // Emit Events (Method)
    console.log(context.emit)
  }
}
```

`context` 객체는 일반적인 JavaScript 객체라서 반응성이 존재하지 않습니다. 즉, `context`에 ES6 구조분해할당을 안전하게 사용할 수 있습니다.

```js
// MyBook.vue
export default {
  setup(props, { attrs, slots, emit }) {
    ...
  }
}
```

`attrs`와 `slots`은 컴포넌트 자체가 업데이트될 때, 항상 업데이트되는 상태 저장 객체(*stateful object)입니다. 즉, attrs와 slots에 구조분해할당을 피하고, 항상 속성을 `attrs.x`와 `slots.x`의 형태로 참조해야합니다. 또한, `props`와 달리, `attrs` 와 `slots`는 반응성이 **없습니다**. `attrs`나 `slots`의 변경으로 인한 사이드이펙트를 의도하려면, `onUpdated` 라이프사이클 훅 안에서 수행해야합니다.

## 컴포넌트 속성에 접근하기

`setup`이 실행될 때, 컴포넌트 인스턴스는 아직 생성되지 않았습니다. 결과적으로 아래와 같은 속성에만 접근할 수 있습니다:

- `props`
- `attrs`
- `slots`
- `emit`

즉, 다음 컴포넌트 옵션에는 **접근할 수 없습니다**:

- `data`
- `computed`
- `methods`

## 템플릿에서의 사용법

만약 `setup`이 객체를 반환하면, 객체의 속성들은 컴포넌트의 템플릿에서 접근할 수 있으며, `setup`에 전달된 `props`속성도 접근할 수 있습니다:

```vue-html
<!-- MyBook.vue -->
<template>
  <div>{{ collectionName }}: {{ readersNumber }} {{ book.title }}</div>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    props: {
      collectionName: String
    },
    setup(props) {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })

      // expose to template
      return {
        readersNumber,
        book
      }
    }
  }
</script>
```

`setup`에서 반환된 [refs](../api/refs-api.html#ref) 값을 템플릿에서 사용할 때 [자동으로 언래핑](../api/refs-api.html#access-in-templates)됩니다. 그래서 템플릿에서는 `.value`를 사용하면 안됩니다.

## 렌더 펑션에서의 사용법

`setup`은 동일한 스코프에서 선언된 반응 상태를 직접적으로 사용할 수 있는 렌더 펑션을 반환할 수 있습니다:

```js
// MyBook.vue

import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // 여기서는 ref의 `value`를 명시적으로 써야합니다.
    return () => h('div', [readersNumber.value, book.title])
  }
}
```

## `this` 사용법

**`setup()` 내부의 `this`는 현재 활성화된 인스턴스에 대한 참조가 아닙니다.** 다른 컴포넌트 옵션들이 resolved가 되기 전에 `setup()`이 호출되었기 때문에, `setup()` 내부의 `this`는 다른 옵션 내부의 `this`와 다르게 동작합니다. 이로인해 다른 Options API와 함께 `setup()`를 사용할 때 혼동이 발생할 수 있습니다.
