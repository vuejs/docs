# Renderowanie listy {#list-rendering}

Możemy użyć dyrektywy `v-for`, aby wyrenderować listę elementów na podstawie tablicy:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

Tutaj `todo` jest zmienną lokalną reprezentującą aktualnie iterowany element tablicy. Jest ona dostępna tylko na lub wewnątrz elementu `v-for`, podobnie jak zakres funkcji.

Zauważ, że każdemu obiektowi todo nadajemy unikalne `id` i wiążemy go z <a target="_blank" href="/api/built-in-special-attributes.html#key">specjalnym atrybutem `key`</a> dla każdego `<li>`. Atrybut `key` pozwala Vue na dokładne przesunięcie każdego `<li>`, aby dopasować go do pozycji odpowiadającego mu obiektu w tablicy.

Istnieją dwa sposoby aktualizacji listy:

1. Wywołanie [metody mutującej](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating) na tablicy źródłowej:

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

2. Zastąpienie tablicę nową tablicą:

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

Tutaj mamy prostą listę rzeczy do zrobienia - spróbuj zaimplementować logikę dla metod `addTodo()` i `removeTodo()`, aby działała!

Więcej informacji na temat `v-for`: <a target="_blank" href="/guide/essentials/list.html">Przewodnik - Renderowanie listy</a>
