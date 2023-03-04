---
outline: deep
---

# Основы реактивности {#reactivity-fundamentals}

:::tip Выбор API
Эта страница и многие другие главы в этом руководстве, содержат различный контент для Options API и Composition API. В настоящее время выбран <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. Можно переключаться между двумя API с помощью переключателя "Выбрать API" в верхней части левой боковой панели.
:::

## Объявление реактивного состояния {#declaring-reactive-state}

<div class="options-api">

В Options API используется опция `data` для объявления реактивного состояния компонента. Значение опции должно быть функцией, которая возвращает объект. Vue будет вызывать функцию при создании нового экземпляра компонента и обернет возвращаемый объект в свою систему реактивности. Любые свойства верхнего уровня этого объекта проксируются на экземпляр компонента (`this` в методах и хуках жизненного цикла):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` это хук жизненного цикла Vue, который объясним позже
  mounted() {
    // `this` ссылается на экземпляр компонента
    console.log(this.count) // => 1

    // данные также могут быть мутированы
    this.count = 2
  }
}
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gYG1vdW50ZWRgIGlzIGEgbGlmZWN5Y2xlIGhvb2sgd2hpY2ggd2Ugd2lsbCBleHBsYWluIGxhdGVyXG4gIG1vdW50ZWQoKSB7XG4gICAgLy8gYHRoaXNgIHJlZmVycyB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpIC8vID0+IDFcblxuICAgIC8vIGRhdGEgY2FuIGJlIG11dGF0ZWQgYXMgd2VsbFxuICAgIHRoaXMuY291bnQgPSAyXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIENvdW50IGlzOiB7eyBjb3VudCB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Эти свойства экземпляра добавляются только при первом создании экземпляра, поэтому необходимо убедиться, что все они присутствуют в объекте, возвращаемом функцией `data`. При необходимости используйте `null`, `undefined` или другое значение для свойств, где нужное значение еще недоступно.

Можно добавить новое свойство напрямую в `this`, не включая его в `data`. Однако свойства, добавленные таким образом, не будут реактивно обновляться.

Vue использует префикс `$`, когда предоставляет свои собственные встроенные API в экземпляре компонента. Vue также оставляет префикс `_` для внутренних свойств. Следует избегать использования имен для свойств верхнего уровня `data`, которые начинаются с любого из этих символов.

### Реактивный прокси и оригинальный объект \* {#reactive-proxy-vs-original}

В Vue 3 данные становятся реактивными благодаря использованию функционала [JavaScript Прокси](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Пользователи, перешедшие с Vue 2, должны знать о следующем поведении:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

При обращении к `this.someObject` после присвоения, значение является реактивным прокси, который оборачивает исходный `newObject`. **В отличие от Vue 2, исходный `newObject` остается нетронутым и не будет сделан реактивным: убедитесь, что всегда получаете доступ к реактивному состоянию как к свойству `this`.**.

</div>

<div class="composition-api">

Возможно создать реактивный объект или массив с помощью функции [`reactive()`](/api/reactivity-core.html#reactive):

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

Реактивные объекты это [JavaScript Прокси](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) и ведут себя так же, как обычные объекты. Разница в том, что Vue способен отслеживать доступ к свойствам и мутации реактивного объекта. Подробнее о том, как работает система реактивности Vue, объясняется в разделе [Реактивность в деталях](/guide/extras/reactivity-in-depth.html) - но лучше приступать к нему уже после того, как закончите изучать основное руководство.

См. также: [Типизированная реактивность](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

Чтобы использовать реактивное состояние в шаблоне компонента, объявите и верните его из функции компонента `setup()`:

```js{5,9-11}
import { reactive } from 'vue'

export default {
  // `setup` это специальный хук, предназначенный для composition API.
  setup() {
    const state = reactive({ count: 0 })

    // передайте состояние шаблону
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```

Аналогично, можно объявить функции, которые изменяют реактивное состояние, в той же области видимости и передать их в качестве методов вместе с состоянием:

```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // не забудьте также передать функцию.
    return {
      state,
      increment
    }
  }
}
```

Переданные методы обычно используются в качестве прослушивателей событий:

```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### `<script setup>` \*\* {#script-setup}

Описание всего состояния и всех методов через `setup()` может быть утомительным и усложнит код. К счастью, это необходимо только тогда, когда не используется шаг сборки. При использовании однофайловых компонентов, можно значительно упростить процесс с помощью `<script setup>`:

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBzdGF0ZS5jb3VudCsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPlxuICAgIHt7IHN0YXRlLmNvdW50IH19XG4gIDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Импорты верхнего уровня и переменные, объявленные в `<script setup>`, автоматически можно использовать в шаблоне того же компонента.

> В остальной части руководства в основном используется синтаксис однофайловых компонентов + `<script setup>` для примеров кода Composition API, так как это наиболее распространенный подход у разработчиков Vue.

</div>

<div class="options-api">

## Объявление методов \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Free Vue.js Methods Lesson"/>

Для добавления методов к экземпляру компонента, используется опция `methods`. Это должен быть объект, содержащий нужные методы:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // методы могут быть вызваны из хуков жизненного цикла
    // или из других методов
    this.increment()
  }
}
```

Vue автоматически привязывает значение `this` для методов из объекта `methods` так, чтобы оно всегда ссылалось на экземпляр компонента. Это гарантирует, что метод сохраняет правильное значение `this`, если он используется в качестве слушателя событий или колбэк-функции. Следует избегать использования стрелочных функций при определении методов, поскольку это не позволит Vue привязать соответствующее значение `this`:

```js
export default {
  methods: {
    increment: () => {
      // ПЛОХО: доступа к `this` компонента не будет!
    }
  }
}
```

Как и все остальные свойства экземпляра компонента, методы из объекта `methods` доступны из шаблона компонента. Внутри шаблона они чаще всего используются в качестве слушателей событий:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

В примере выше, метод `increment` будет вызван при клике на `<button>`.

</div>

### Обновление DOM {#dom-update-timing}

Когда изменяется реактивное состояние, DOM обновляется автоматически. Однако следует отметить, что обновления DOM не применяются синхронно. Вместо этого Vue буферизирует их до "следующего тика" в цикле обновления, чтобы гарантировать, что каждый компонент обновляется только один раз, независимо от того, сколько изменений состояния было сделано.

Чтобы дождаться завершения обновления DOM после изменения состояния, следует использовать функцию [nextTick()](/api/general.html#nexttick) глобального API:

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // доступ к обновленному DOM
  })
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // доступ к обновленному DOM
      })
    }
  }
}
```

</div>

### Подробнее о реактивности {#deep-reactivity}

В Vue состояние по умолчанию является глубоко реактивным. Это означает, что можно ожидать отслеживания изменений, даже если они затрагивают вложенные объекты или массивы:

<div class="options-api">

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // будут работать так, как ожидается.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

```js
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // будут работать так, как ожидается.
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

Также можно явно создать [неглубоко реактивные объекты](/api/reactivity-advanced.html#shallowreactive) где реактивность отслеживается только на корневом уровне, но они, как правило, нужны только в продвинутых случаях использования.

<div class="composition-api">

### Реактивный прокси и оригинальный объект \*\* {#reactive-proxy-vs-original-1}

Важно отметить, что возвращаемое значение от `reactive()` является [прокси](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) оригинального объекта, который не равен исходному объекту:

```js
const raw = {}
const proxy = reactive(raw)

// прокси НЕ РАВЕН оригиналу.
console.log(proxy === raw) // false
```

Только прокси является реактивным - изменение исходного объекта не вызовет обновлений. Поэтому лучшей практикой при работе с системой реактивности Vue является **исключительное использование проксированных версий состояния**.

Чтобы обеспечить последовательный доступ к прокси, вызов `reactive()` на одном и том же объекте будет всегда возвращать один и тот же прокси, а вызов `reactive()` на существующем прокси будет возвращать этот же прокси:

```js
// вызов reactive() на том же объекте, возвращает тот же прокси
console.log(reactive(raw) === proxy) // true

// вызов reactive() на прокси возвращает этот же прокси
console.log(reactive(proxy) === proxy) // true
```

Это правило распространяется и на вложенные объекты. Из-за глубокой реактивности, вложенные объекты внутри реактивного объекта также являются прокси:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Ограничения `reactive()` \*\* {#limitations-of-reactive}

API `reactive()` имеет два ограничения:

1. Он работает только для объектных типов (объекты, массивы, и другие [типы коллекций](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) такие `Map` и `Set`). Он не может хранить [примитивные типы](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) такие как `string`, `number` или `boolean`.

2. Поскольку отслеживание реактивности в Vue работает через доступ к свойствам, необходимо всегда сохранять одну и ту же ссылку на реактивный объект. Это означает, что нельзя легко "заменить" реактивный объект, поскольку связь реактивности с первой ссылкой теряется:

   ```js
   let state = reactive({ count: 0 })

   // вышеуказанная ссылка ({ count: 0 }) больше не отслеживается (реактивность потеряна!)
   state = reactive({ count: 1 })
   ```

   Это также означает, что когда происходит присваивание или деструктуризация свойства реактивного объекта в локальные переменные, или когда это свойство передается в функцию, тогда теряется связь с реактивностью:

   ```js
   const state = reactive({ count: 0 })

   // n локальная переменная, которая независима
   // от state.count.
   let n = state.count
   // не влияет на state.count
   n++

   // count после деструктуризации 
   // также независима от state.count.
   let { count } = state
   // не влияет на state.count
   count++

   // функция получает простое число и
   // не сможет отслеживать изменения в state.count
   callSomeFunction(state.count)
   ```

## Реактивные переменные `ref()` \*\* {#reactive-variables-with-ref}

Для устранения ограничений `reactive()`, Vue также предоставляет функцию [`ref()`](/api/reactivity-core.html#ref) которая позволяет создавать реактивные **"ref-ссылки"**, которые могут содержать значения любого типа:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` принимает аргумент и возвращает его завернутым в объект ref-ссылки со свойством `.value`:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

См. также: [Типизированные ref-ссылки](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

Аналогично свойствам реактивного объекта, свойство `.value` ref-ссылки является реактивным. В дополнение, при хранении объектных типов, функция ref автоматически преобразует его `.value` с помощью `reactive()`.

Ref-ссылка, содержащая значение объекта, позволяет реактивно заменить весь объект:

```js
const objectRef = ref({ count: 0 })

// это работает реактивно
objectRef.value = { count: 1 }
```

Ref-ссылки также могут быть переданы в функции или деструктурированы из простых объектов без потери реактивности:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// функция получает ссылку
// получает доступ к значению через .value
// но она сохранит реактивность с obj.foo
callSomeFunction(obj.foo)

// значения остаются реактивными
const { foo, bar } = obj
```

Другими словами, `ref()` позволяет создать "ref-ссылку" на любое значение и передать его дальше без потери реактивности. Эта очень важно, поскольку часто используется при извлечении логики в [функции композиции](/guide/reusability/composables.html).

### Ref-ссылки в шаблоне \*\* {#ref-unwrapping-in-templates}

Когда ref-ссылки используются как свойства верхнего уровня в шаблоне, они автоматически "разворачиваются", поэтому нет необходимости использовать `.value`. Вот предыдущий пример счетчика, использующий вместо этого `ref()`:

```vue{13}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- указывать .value больше не нужно -->
  </button>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Обратите внимание, что разворачивание применяется только в том случае, если ссылка является свойством верхнего уровня в контексте рендеринга шаблона. В качестве примера, `foo` является свойством верхнего уровня, а `object.foo` - нет.

Имеется объект:

```js
const object = { foo: ref(1) }
```

Следующее выражение **НЕ БУДЕТ работать** так, как ожидается:

```vue-html
{{ object.foo + 1 }}
```

Результат рендеринга будет `[object Object]`, потому что `object.foo` - это объект ref-ссылки. Можно исправить это, сделав `foo` свойством верхнего уровня:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

Теперь результат рендеринга будет `2`.

Следует отметить, что ref-ссылка также будет развернута, если это окончательное вычисленное значение текстовой интерполяции (т.е. тег <code v-pre>{{ }}</code>), поэтому следующее отобразит `1`:

```vue-html
{{ object.foo }}
```

Это всего лишь удобная функция интерполяции текста и эквивалентна <code v-pre>{{ object.foo.value }}</code>.

### Ref-ссылка в реактивном объекте \*\* {#ref-unwrapping-in-reactive-objects}

Когда к `ref-ссылке` обращаются или изменяют как свойство реактивного объекта, оно также автоматически разворачивается, чтобы вести себя как обычное свойство:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

Если новая ref-ссылка назначается свойству, связанному с существующей ref-ссылкой, она заменяет старую ref-ссылку:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// старая ref-ссылка теперь не влияет на state.count
console.log(count.value) // 1
```

Разворачивание ref-ссылки происходит только при вложении внутри глубокого реактивного объекта. Он не применяется, когда к нему обращаются как к свойству [неглубокого реактивного объекта](/api/reactivity-advanced.html#shallowreactive).

### Ref-ссылка в массивах и коллекциях {#ref-unwrapping-in-arrays-and-collections}

В отличие от реактивных объектов, не происходит разворачивания, когда ref-ссылка доступна как элемент реактивного массива или нативной коллекции, например `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// нужно обращаться к .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// нужно обращаться к .value
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Методы с сохранением состояния \* {#stateful-methods}

В некоторых случаях может потребоваться динамически создать метод, например, создать обработчик отложенного события:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // декорирование при помощи debounce
    click: debounce(function () {
      // ... реагировать на нажатие ...
    }, 500)
  }
}
```

Однако такой подход проблематичен для компонентов, которые используются повторно, поскольку функция debounce **сохраняет некоторое внутреннее состояние** о прошедшем времени. Если несколько экземпляров компонента используют одну и ту же функцию, которая была декорирована при помощи функции debounce, то они будут мешать друг другу.

Чтобы исправить проблему описанную выше, можно использовать функцию debounce в хуке жизненного цикла `created`:

```js
export default {
  created() {
    // каждый экземпляр теперь имеет свою собственную копию
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // также хорошая идея отменять таймер
    // когда компонент удаляется
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... реагировать на нажатие ...
    }
  }
}
```

</div>

<div class="composition-api">

## Трансформация реактивности <sup class="vt-badge experimental" /> \*\* {#reactivity-transform}

Необходимость использовать `.value` с ref-ссылками — недостаток, налагаемый ограничениями JavaScript. Однако, благодаря трансформации во время компиляции, можно улучшить эргономику, автоматически добавляя `.value` в соответствующих местах. Vue предоставляет возможность преобразования во время компиляции, что позволяет написать предыдущий пример "счетчика" следующим образом:

```vue
<script setup>
let count = $ref(0)

function increment() {
  // нет необходимости в .value
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

Подробнее о [трансформации реактивности](/guide/extras/reactivity-transform.html) вы можете узнать в специальном разделе. Обратите внимание, что в настоящее время он все еще является экспериментальным и может измениться.
</div>
