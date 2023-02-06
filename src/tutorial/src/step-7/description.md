# Рендеринг списков {#list-rendering}

Можно использовать директиву `v-for` для вывода списка элементов на основе исходного массива:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

Здесь `todo` - локальная переменная, представляющая элемент массива, по которому в данный момент выполняется итерация. Она доступна только в элементе `v-for` или внутри него, подобно области видимости функции.

Обратите внимание, что здесь также присваиваем каждому объекту todo уникальный `id` и связываем его как <a target="_blank" href="/api/built-in-special-attributes.html#key">специальный атрибут `key`</a> для каждого `<li>`. `key` позволяет Vue точно перемещать каждый `<li>`, чтобы он соответствовал положению соответствующего объекта в массиве.

Существует два способа обновления списка:

1. Вызов [мутирующих методов](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating) в исходном массиве:

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

2. Замена массива на новый:

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

Здесь у нас есть простой список todo - попробуйте реализовать логику для методов `addTodo()` и `removeTodo()`, чтобы заставить его работать!

Подробнее о `v-for`: <a target="_blank" href="/guide/essentials/list.html">Руководство - рендеринг списков</a>
