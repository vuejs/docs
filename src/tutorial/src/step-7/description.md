# Рендеринг списків {#list-rendering}

Ми можемо використовувати дерективу `v-for` для рендерингу списка елементів, основаних на вихідному масиві:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

Тут `todo` — це локальна змінна, що представляє собою елемент масиву, над яким відбувається ітерація. Вона доступна лише в елементі `v-for` або всередині нього, подібно до області видимості функції.

Зверніть увагу, що ми також надаємо кожному об’єкту todo унікальний `id` і прив’язуємо його як <a target="_blank" href="/api/built-in-special-attributes.html#key">спеціальний атрибут `key`</a> для кожного `<li>`. `key` дозволяє Vue точно переміщувати кожен `<li>` відповідно до позиції його відповідного об’єкта в масиві.

Оновити список можна двома способами:

1. Викликати [методи мутації](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating) вихідного масиву:

   <div class="composition-api">

   ```js
   todos.value.push(newTodo)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos.push(newTodo)
   ```

   </div>

2. Замінити масив на новий:

   <div class="composition-api">

   ```js
   todos.value = todos.value.filter(/* ... */)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos = this.todos.filter(/* ... */)
   ```

   </div>

У нас є простий список завдань - спробуйте реалізувати логіку для методів `addTodo()` та `removeTodo()`, щоб він запрацював!

Більш детально про `v-for` в <a target="_blank" href="/guide/essentials/list.html">гіді про рендеринг списків</a>.
