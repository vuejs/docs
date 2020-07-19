# Provide / Inject

> This guide assumes that you have already read the [Composition API Introduction](composition-api-introduction.html) and [Reactivity Fundamentals](reactivity-fundamentals.html). Read that first if you are new to Composition API.

We can use [provide / inject](component-provide-inject.html) with the Composition API as well. Both can only be called during [`setup()`](composition-api-setup.html) with a current active instance.

For example, if we want to provide a book name on the root component and inject it on the child component:

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
      'Eloquent Javasctipt' /* optional default value */
    )
    return {
      book
    }
  }
}
```

`inject` accepts an optional default value as the 2nd argument. If a default value is not provided and the property is not found on the provide context, `inject` returns `undefined`.

If we need to provide or inject multiple values, we can do this with a subsequent call of `provide` or `inject` respectively:

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
      'Eloquent Javasctipt' /* optional default value */
    )
    const year = inject('year')

    return {
      book,
      year
    }
  }
}
```

## Injection Reactivity

To retain reactivity between provided and injected values, we can use a [ref](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs) or [reactive](reactivity-fundamentals.html#declaring-reactive-state) when providing a value:

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

Now, when either `book` or `year` are changed on the _provider_ component, we can observe them changing on the component where they are injected.

::: warning
We don't recommend mutating a reactive property where it's injected as it's breaking Vue one-direction data flow. Instead, try to either mutate values where they are _provided_ or provide a method to mutate them

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
