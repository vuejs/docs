# Provide / Inject

> 이 가이드는 [Composition API Introduction](composition-api-introduction.html) 와 [Reactivity Fundamentals](reactivity-fundamentals.html)를 이미 읽었다고 가정합니다. Composition API를 처음 사용하는 경우 먼저 읽어보세요.

Composition API와 함께 [provide / inject](component-provide-inject.html)를 사용할 수 있습니다. provide / inject는 현재 활성화된 인스턴스의 [`setup()`](composition-api-setup.html) 중에 호출 될 수 있습니다.

예를들어, 최상위 컴포넌트에 book name을 provide하고, 하위 컴포넌트에 inject하려는 경우:

```js
import { provide, inject } from 'vue'

const RootComponent = {
  setup() {
    provide('book', 'Vue 3 guide')
  }
}

const MyBook = {
  setup() {
    const book = inject(
      'book',
      'Eloquent Javascript' /* 선택적 기본 값 */
    )
    return {
      book
    }
  }
}
```

`inject`은 두번째 전달인자로서 선택적 기본 값을 허용합니다. 기본 값이 제공되지 않고 provide 컨텍스트에서 속성을 찾을 수 없는 경우, `inject`은 `undefined`를 반환합니다.

여러 값을 provide 또는 inject 하는 경우, 각각의 `provide` 나 `inject` 을 호출하여 수행할 수 있습니다:

```js{5-6,12-16}
import { provide, inject } from 'vue'

const RootComponent = {
  setup() {
    provide('book', 'Vue 3 guide')
    provide('year', '2020')
  }
}

const MyBook = {
  setup() {
    const book = inject(
      'book',
      'Eloquent Javascript' /* 선택적 기본 값 */
    )
    const year = inject('year')

    return {
      book,
      year
    }
  }
}
```

## 반응성 주입

provide된 값과 inject된 값 사이의 반응성을 유지하기 위해서, 값을 provide 할 때 [ref](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs)나 [reactive](reactivity-fundamentals.html#declaring-reactive-state)를 사용할 수 있습니다:

```js
import { ref, reactive } from 'vue'

// in provider
setup() {
  const book = reactive({
    title: 'Vue 3 Guide',
    author: 'Vue Team'
  })
  const year = ref('2020')

  provide('book', book)
  provide('year', year)
}

// in consumer
setup() {
  const book = inject('book')
  const year = inject('year')

  return { book, year }
}
```

이제, *provider* 컴포넌트에서 `book` 이나 `year` 가 변경되면, inject하는 컴포넌트에서 변경사항을 감지할 수 있습니다.

::: warning injected된 반응형 속성을 변경하는 것은 Vue의 단방향 데이터 흐름을 깨기 때문에 추천하지 않습니다. 대신, *provide된* 값을 변경하거나 변경하는 메소드를 provide하세요.

```js
import { ref, reactive } from 'vue'

// in provider
setup() {
  const book = reactive({
    title: 'Vue 3 Guide',
    author: 'Vue Team'
  })

  function changeBookName() {
    book.title = 'Vue 3 Advanced Guide'
  }

  provide('book', book)
  provide('changeBookName', changeBookName)
}

// in consumer
setup() {
  const book = inject('book')
  const changeBookName = inject('changeBookName')

  return { book, changeBookName }
}
```

:::
