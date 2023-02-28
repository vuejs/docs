# Ссылки на элементы шаблона {#template-refs}

Хотя декларативная модель рендеринга Vue абстрагирует от большинства прямых операций с DOM, все же могут быть случаи, когда нужен прямой доступ к базовым элементам DOM. Для этого можно использовать специальный атрибут `ref`:

```vue-html
<input ref="input">
```

`ref` - специальный атрибут, аналогичный атрибуту `key`, о котором говорилось в главе `v-for`. Он позволяет получить прямую ссылку на определенный элемент DOM или экземпляр дочернего компонента после его монтирования. Это может быть полезно, когда нужно, например, программно выставить фокус на поле ввода при монтировании компонента или инициализировать стороннюю библиотеку на элементе.

## Доступ к ссылкам {#accessing-the-refs}

<div class="composition-api">

Чтобы получить ссылку с помощью Composition API, нужно объявить ref с тем же именем:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// объявляем ref-ссылку на элемент
// имя должно совпадать со значением ref в шаблоне
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

Если не используется `<script setup>`, не забудьте также вернуть ссылку из `setup()`:

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</div>
<div class="options-api">

Полученная ссылка доступна через `this.$refs`:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

Обратите внимание, что доступ к ссылке возможен только **после того, как компонент будет смонтирован.** Если попытаться получить доступ к <span class="options-api">`$refs.input`</span><span class="composition-api">`input`</span> в выражении шаблона, то при первом рендере оно будет равно `null`. Это происходит потому, что элемент не существует до окончания первого рендеринга!

<div class="composition-api">

Если попытаться следить за изменениями ссылки на элемент шаблона, обязательно учитывать случай, когда ссылка имеет значение `null`:

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // еще не смонтирован, или элемент был демонтирован (например: v-if)
  }
})
```

См. также: [Типизированные ссылки на элементы шаблона](/guide/typescript/composition-api.html#typing-template-refs) <sup class="vt-badge ts" />

</div>

## Использование внутри `v-for` {#refs-inside-v-for}

> Требуется v3.2.25 или выше

<div class="composition-api">

Когда `ref` используется внутри `v-for`, соответствующая ссылка должна содержать массив, который будет заполнен элементами после монтирования:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ID0gcmVmKFsxLCAyLCAzXSlcblxuY29uc3QgaXRlbVJlZnMgPSByZWYoW10pXG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIGFsZXJ0KGl0ZW1SZWZzLnZhbHVlLm1hcChpID0+IGkudGV4dENvbnRlbnQpKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtUmVmc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

Когда `ref` используется внутри `v-for`, итоговым значением ссылки будет массив, содержащий соответствующие элементы:

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Попробовать в песочнице](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdDogWzEsIDIsIDNdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuJHJlZnMuaXRlbXMpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

Следует отметить, что массив ссылок **не гарантирует** тот же порядок, что и исходный массив.

## Ссылка на функцию {#function-refs}

Вместо строкового ключа атрибут `ref` может быть привязан к функции, которая будет вызываться при каждом обновлении компонента и дает полную свободу выбора места хранения ссылки на элемент. Функция получает ссылку на элемент в качестве первого аргумента:

```vue-html
<input :ref="(el) => { /* присвоить el свойству или ссылке */ }">
```

Обратите внимание, что используется динамическое связывание `:ref`, поэтому можно передать ему функцию вместо строки с названием ссылки. Когда элемент будет размонтирован, аргументом будет `null`. Конечно, можно использовать метод вместо встроенной функции.

## Ссылка на компонент {#ref-on-component}

> Этот раздел предполагает знание [Компонентов](/guide/essentials/component-basics). Не стесняйтесь пропустить его и вернуться позже.

`ref` можно также использовать для дочернего компонента. В этом случае ссылка будет принадлежать экземпляру компонента:

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value будет содержать экземпляр <Child />
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child будет содержать экземпляр <Child />
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">Если дочерний компонент использует Options API или не использует `<script setup>`, </span><span class="options-api">то экземпляр ссылки будет идентичен экземпляру дочернего компонента `this`, что означает, что родительский компонент будет иметь полный доступ к каждому свойству и методу дочернего компонента. Это позволяет легко создавать тесно связанные детали реализации между родительским и дочерним компонентами, поэтому ссылки на компонент следует использовать только в случае крайней необходимости - в большинстве случаев необходимо попытаться реализовать взаимодействие родителя и ребенка, используя стандартные интерфейсы props и emit.</span>

<div class="composition-api">

Исключением здесь является то, что компоненты, использующие `<script setup>`, являются **приватными по умолчанию**: родительский компонент, ссылающийся на дочерний компонент, использующий `<script setup>`, не сможет получить доступ ни к чему, пока дочерний компонент не решит раскрыть публичный интерфейс с помощью макроса `defineExpose`:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// Макросы компилятора, такие как defineExpose, не нужно импортировать
defineExpose({
  a,
  b
})
</script>
```

Когда родитель получает экземпляр этого компонента через ссылки шаблона, полученный экземпляр будет иметь вид `{ a: number, b: number }` (ссылки автоматически разворачиваются, как и для обычных экземпляров).

См. также: [Типизированные ссылки на шаблоны компонентов](/guide/typescript/composition-api.html#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Опция `expose` может быть использована для ограничения доступа к дочернему экземпляру:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

В приведенном выше примере родитель, ссылающийся на этот компонент через ссылку, сможет получить доступ только к `publicData` и `publicMethod`.

</div>
