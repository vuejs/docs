# List Rendering {#list-rendering}

We can use the `v-for` directive to render a list of elements based on a source array:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

Here `todo` is a local variable representing the array element currently being iterated on. It's only accessible on or inside the `v-for` element, similar to a function scope.

Notice how we are also giving each todo object a unique `id`, and binding it as the <a target="_blank" href="/api/built-in-special-attributes.html#key">special `key` attribute</a> for each `<li>`. The `key` allows Vue to accurately move each `<li>` to match the position of its corresponding object in the array.

There are two ways to update the list:

1. Call [mutating methods](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating) on the source array:

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

2. Replace the array with a new one:

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

Here we have a simple todo list - try to implement the logic for `addTodo()` and `removeTodo()` methods to make it work!

More details on `v-for`: <a target="_blank" href="/guide/essentials/list.html">Guide - List Rendering</a>
