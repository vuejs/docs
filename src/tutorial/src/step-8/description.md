# Обчислювані властивості {#computed-property}

Давайте продовжимо роботу над списком завдань із попереднього кроку. Тут ми вже додали функцію перемикання до кожного завдання. Це робиться шляхом додавання властивості `done` до кожного об’єкта todo та використання `v-model`, щоб прив’язати до чекбокса:

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

Наступне покращення, яке ми можемо додати, це можливість сховати виконані завдання. У нас є кнопка, яка перемикає стан `hideCompleted`. Але як ми рендеримо різні елементи списку на основі цього стану?

<div class="options-api">

Зустрічайте <a target="_blank" href="/guide/essentials/computed.html">обчислювану властивість</a>. Ми можемо оголосити властивість, яка реактивно обчислюється на основі інших властивостей за допомогою параметра `computed`:

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // повертає відфільтровані завдання на основі `this.hideCompleted`
    }
  }
}
```

</div>
<div class="html">

```js
createApp({
  // ...
  computed: {
    filteredTodos() {
      // повертає відфільтровані завдання на основі `this.hideCompleted`
    }
  }
})
```

</div>

</div>
<div class="composition-api">

Зустрічайте <a target="_blank" href="/guide/essentials/computed.html">`computed()`</a>. Ми можемо створити обчислювану референцію, яка обчислює своє `.value` на основі інших реактивних джерел даних:

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // повертає відфільтровані завдання на основі
  // `todos.value` та `hideCompleted.value`
})
```

</div>
<div class="html">

```js{10-13}
import { createApp, ref, computed } from 'vue'

createApp({
  setup() {
    const hideCompleted = ref(false)
    const todos = ref([
      /* ... */
    ])

    const filteredTodos = computed(() => {
      // повертає відфільтровані завдання на основі
      // `todos.value` та `hideCompleted.value`
    })

    return {
      // ...
    }
  }
})
```

</div>

</div>

```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

Обчислювана властивість відстежує інший реактивний стан, який використовується для її обчислення як залежності. Він кешує результат і автоматично оновлює його, коли його залежності змінюються.

Тепер спробуйте додати обчислювану властивість `filteredTodos` і реалізувати її логіку! Якщо ви зробите все вірно, то відмітивши завдання як виконане, воно повинно бути миттєво схованим зі списку завдань.
