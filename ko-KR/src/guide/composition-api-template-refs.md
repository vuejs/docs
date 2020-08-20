## 템플릿 Refs

> 이 섹션에서는 코드 예제에 [싱글파일 컴포넌트](single-file-component.html) 구문을 사용합니다.

> 이 가이드에서는 사용자가 이미 [Composition API Introduction](composition-api-introduction.html)와 [Reactivity Fundamentals](reactivity-fundamentals.html)를 이미 읽었다고 가정합니다. Composition API를 처음 사용하는 경우 먼저 읽어보세요.

Composition API를 사용할 때, [reactive refs API](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs)와 [template refs](component-template-refs.html)의 개념이 통합됩니다. 템플릿 내 요소 또는 컴포넌트 인스턴스에 대한 참조를 얻기 위해서, 평소와 같이 ref를 선언하고 [setup()](composition-api-setup.html)에서 반환할 수 있습니다:

```html
<template>
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      onMounted(() => {
        // DOM 요소는 초기 렌더링 후에 ref에 할당합니다.
        console.log(root.value) // <div>This is a root element</div>
      })

      return {
        root
      }
    }
  }
</script>
```

여기서 render context에 `root`를 노출하고 (root를) `ref="root"`를 통해 ref로 div에 바인딩합니다. 가상 DOM patch 알고리즘에서 VNode의 `ref` 키가 render context의 ref에 해당하면, VNode에 대응하는 요소나 컴포넌트 인스턴스는 해당 ref의 값에 할당됩니다. 이는 Virtual DOM mount / patch 과정 중에서 수행되므로, template refs는 초기 렌더링 이후에만 할당된 값을 받습니다.

templates refs로 사용되는 refs는 다른 refs와 동일하게 작동합니다. 반응적이며 composition function으로 전달 또는 반환될 수 있습니다.

### JSX와 함께 사용하기

```js
export default {
  setup() {
    const root = ref(null)

    return () =>
      h('div', {
        ref: root
      })

    // with JSX
    return () => <div ref={root} />
  }
}
```

### `v-for` 내부에서 사용하기

Composition API template refs는 `v-for` 내에서 사용될 때 특별한 처리를 하지 않습니다. 대신, function refs를 사용하여 커스텀 처리를 수행하세요:

```html
<template>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
  import { ref, reactive, onBeforeUpdate } from 'vue'

  export default {
    setup() {
      const list = reactive([1, 2, 3])
      const divs = ref([])

      // 각 업데이트 전에 refs를 재설정하세요
      onBeforeUpdate(() => {
        divs.value = []
      })

      return {
        list,
        divs
      }
    }
  }
</script>
```
