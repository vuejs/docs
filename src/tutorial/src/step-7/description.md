# Renderizado de Listas

Podemos utilizar la directiva `v-for` para renderizar una lista de elementos basada en un array fuente:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

Aquí `todo` es una variable local que representa el elemento de la matriz que se está iterando actualmente. Solo es accesible en o dentro del elemento `v-for`, similar al ámbito de una función.

Observa que también estamos dando a cada objeto `todo` un `id` único, y lo vinculamos como el <a target="_blank" href="/api/built-in-special-attributes.html#key">atributo especial `key`</a> para cada `<li>`. La `key` (_clave_, en español) permite a Vue mover con precisión cada `<li>` para que coincida con la posición de su correspondiente objeto en el array.

Hay dos maneras de actualizar la lista:

1. Llamar a los [métodos de mutación](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating) en el array fuente:

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

2. Reemplazar el array por uno nuevo:

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

Aquí tenemos una simple lista de tareas. Trata de implementar la lógica de los métodos `addTodo()` y `removeTodo()` para que funcione!

Más detalles sobre `v-for`: <a target="_blank" href="/guide/essentials/list.html" >Guía - Renderizado de Listas</a>
