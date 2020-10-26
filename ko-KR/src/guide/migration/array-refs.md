---
title: v-for 배열 Refs
badges:
- breaking
---

# {{ $frontmatter.title }} <migrationbadges badges="$frontmatter.badges"></migrationbadges>

Vue 2에서 `v-for`에 `ref` 속성을 사용하면 해당 `$refs` 프로퍼티는 참조 배열을 갖게 됩니다. 중첩된 <code>v-for</code>가 있는 경우, 이 동작은 모호하고 비효율적입니다.

Vue 3에서는 더이상 Vue 2와 같이 `$refs`에 배열을 자동으로 생성하지 않습니다. 단일 바인딩에서 여러 참조를 다루려면, `ref`를 함수에 바인딩 하세요. 함수는 더 많은 유연성을 제공합니다. (이는 새로운 기능으로 아래 내용을 살펴 봅시다.)

```html
<div v-for="item in list" :ref="setItemRef"></div>
```

Options API:

```js
export default {
  data() {
    return {
      itemRefs: []
    }
  },
  methods: {
    setItemRef(el) {
      this.itemRefs.push(el)
    }
  },
  beforeUpdate() {
    this.itemRefs = []
  },
  updated() {
    console.log(this.itemRefs)
  }
}
```

Composition API:

```js
import { ref, onBeforeUpdate, onUpdated } from 'vue'

export default {
  setup() {
    let itemRefs = []
    const setItemRef = el => {
      itemRefs.push(el)
    }
    onBeforeUpdate(() => {
      itemRefs = []
    })
    onUpdated(() => {
      console.log(itemRefs)
    })
    return {
      itemRefs,
      setItemRef
    }
  }
}
```

유의 사항

- `itemRefs`는 꼭 배열이 아니어도 됩니다. 반복 key로 참조가 설정된 객체일 수도 있습니다.

- 필요한 경우, `itemRefs`를 반응형으로 만들고 변경을 감지할 수 있습니다.
